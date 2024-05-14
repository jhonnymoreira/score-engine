import { cliInputSchema } from '@/schemas/index.js';

const { schema } = cliInputSchema;

export const showHelp = () =>
  `
USO:
  @score-engine/cli --cidade <cidade> --idade <idade> --renda-mensal <renda-mensal>

PARÂMETROS:
  --cidade <cidade> - ${schema.shape.cidade.description}
  --idade <idade> - ${schema.shape.idade.description}
  --renda-mensal <renda-mensal> - ${schema.shape['renda-mensal'].description}
`.trim();
