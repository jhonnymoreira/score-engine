import { z } from 'zod';
import { normalizeString } from '@/utilities/normalize-string.js';

export const schema = z.object({
  cidade: z
    .string({
      required_error: 'Você deve informar sua cidade.',
      invalid_type_error: 'Sua cidade deve ser composta por letras e espaços.',
    })
    .trim()
    .min(1, 'Sua cidade deve ter pelo menos 1 caractere não vazio.')
    .refine((value) => {
      /**
       * Strings with accents are supported when used in query
       * parameters, but to ensure that the value has only letters and
       * spaces, we normalize it before validating it.
       */
      return /^([a-z]|\s)+$/i.test(normalizeString(value));
    }, 'Sua cidade deve ser composta por letras e espaços.')
    .describe('Sua cidade atual. (Somente letras e espaços)'),
  idade: z.coerce
    .number({
      required_error: 'Você deve informar sua idade.',
      invalid_type_error: 'Sua idade deve ser um número.',
    })
    .positive('Você ainda não nasceu. Espere até ter 18 anos.')
    .gte(18, 'Você deve ser maior de 18 anos.')
    .describe('Sua idade em anos.'),
  'renda-mensal': z.coerce
    .number({
      required_error: 'Você deve informar sua renda mensal.',
      invalid_type_error: 'Sua renda mensal deve ser um número em reais.',
    })
    .gte(0, 'Sua renda não pode ser menor que 0 reais.')
    .describe('Renda mensal em reais. (Somente números)'),
});

export function mapper(data: z.infer<typeof schema>) {
  return {
    age: data.idade,
    city: data.cidade,
    monthlyIncome: data['renda-mensal'],
  };
}
