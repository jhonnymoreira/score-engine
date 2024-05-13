import { parseArgs } from 'node:util';
import { cliInputSchema } from '@/schemas/index.js';
import { fetchTemperature, getScore, showHelp } from '@/utilities/index.js';

const { schema, mapper } = cliInputSchema;

export async function cli(args: string[]) {
  try {
    const { values } = parseArgs({
      args,
      options: {
        idade: {
          type: 'string',
        },
        cidade: {
          type: 'string',
        },
        'renda-mensal': {
          type: 'string',
        },
      },
    });

    const inputValidation = schema.safeParse(values);

    if (!inputValidation.success) {
      return showHelp();
    }

    const { age, city, monthlyIncome } = mapper(inputValidation.data);

    const temperature = await fetchTemperature(city);

    const score = getScore({
      age,
      monthlyIncome,
      temperature,
    });

    const formattedScore = score.toFixed();

    const approvedMessage = `Crédito aprovado. Seu score é ${formattedScore}.`;
    const deniedMessage = `Crédito negado. Seu score é menor que 200 (${formattedScore}).`;

    return score < 200 ? deniedMessage : approvedMessage;
  } catch (err) {
    const error = err as Error;
    return error.message;
  }
}
