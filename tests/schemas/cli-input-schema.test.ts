import get from 'lodash.get';
import { z } from 'zod';
import { cliInputSchema } from '@/schemas/index.js';

const { mapper, schema } = cliInputSchema;

describe('cliInputSchema', () => {
  describe('schema', () => {
    describe('cidade', () => {
      const cidadeSchema = schema.shape.cidade;

      test('has a description', () => {
        expect(cidadeSchema.description).toStrictEqual(
          'Sua cidade atual. (Somente letras e espaços)'
        );
      });

      test('is a string', () => {
        const validation = cidadeSchema.safeParse(1);
        const errorMessage = get(validation, 'error.errors[0].message');

        expect(validation.success).toBeFalsy();
        expect(errorMessage).toStrictEqual(
          'Sua cidade deve ser composta por letras e espaços.'
        );
      });

      test('is a string with only letters and spaces', () => {
        const validation = cidadeSchema.safeParse('1337 city');
        const errorMessage = get(validation, 'error.errors[0].message');

        expect(validation.success).toBeFalsy();
        expect(errorMessage).toStrictEqual(
          'Sua cidade deve ser composta por letras e espaços.'
        );
      });

      test('string with accents is supported', () => {
        const validation = cidadeSchema.safeParse('São Paulo');

        console.log(validation.error);

        expect(validation.success).toBeTruthy();
      });
    });

    describe('idade', () => {
      const idadeSchema = schema.shape.idade;

      test('has a description', () => {
        expect(idadeSchema.description).toStrictEqual('Sua idade em anos.');
      });

      test('is a number', () => {
        const validation = idadeSchema.safeParse('not-a-number');
        const errorMessage = get(validation, 'error.errors[0].message');

        expect(validation.success).toBeFalsy();
        expect(errorMessage).toStrictEqual('Sua idade deve ser um número.');
      });

      test('is a positive number', () => {
        const validation = idadeSchema.safeParse(-1);
        const errorMessage = get(validation, 'error.errors[0].message');

        expect(validation.success).toBeFalsy();
        expect(errorMessage).toStrictEqual(
          'Você ainda não nasceu. Espere até ter 18 anos.'
        );
      });
    });

    describe('renda-mensal', () => {
      const rendaMensalSchema = schema.shape['renda-mensal'];

      test('has a description', () => {
        expect(rendaMensalSchema.description).toStrictEqual(
          'Renda mensal em reais. (Somente números)'
        );
      });

      test('is a number', () => {
        const validation = rendaMensalSchema.safeParse('not-a-number');
        const errorMessage = get(validation, 'error.errors[0].message');

        expect(validation.success).toBeFalsy();
        expect(errorMessage).toStrictEqual(
          'Sua renda mensal deve ser um número em reais.'
        );
      });

      test('is a positive number', () => {
        const validation = rendaMensalSchema.safeParse(-1);
        const errorMessage = get(validation, 'error.errors[0].message');

        expect(validation.success).toBeFalsy();
        expect(errorMessage).toStrictEqual(
          'Sua renda não pode ser menor que 0 reais.'
        );
      });
    });
  });

  describe('mapper', () => {
    test('returns a mapped object containing the parsed values', () => {
      const values = {
        idade: 18,
        cidade: 'São Paulo',
        'renda-mensal': 1000,
      } satisfies z.input<typeof schema>;

      const data = mapper(values);

      expect(data).toStrictEqual({
        age: 18,
        city: 'São Paulo',
        monthlyIncome: 1000,
      });
    });
  });
});
