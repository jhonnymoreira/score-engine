import { cli } from '@/cli.js';
import { fetchTemperature, getScore, showHelp } from '@/utilities/index.js';

vitest.mock('@/utilities/fetch-temperature.js');
vitest.mock('@/utilities/get-score.js');

const fetchTemperatureMock = vitest.mocked(fetchTemperature);
const getScoreMock = vitest.mocked(getScore);

beforeEach(() => {
  vitest.clearAllMocks();
});

describe('cli', () => {
  describe('when the --help (or -h) flag is provided', () => {
    test('shows the help message', async () => {
      const message = await cli(['--help']);
      expect(message).toStrictEqual(showHelp());

      const message2 = await cli(['-h']);
      expect(message2).toStrictEqual(showHelp());
    });
  });

  describe('when the score is higher than 200', () => {
    test('shows a message saying the credit is approved', async () => {
      getScoreMock.mockReturnValueOnce(200);

      const message = await cli([
        '--idade',
        '20',
        '--cidade',
        'São Paulo',
        '--renda-mensal',
        '1000',
      ]);

      expect(message).toStrictEqual('Crédito aprovado. Seu score é 200.');
    });
  });

  describe('when the score is lower than 200', () => {
    test('shows a message saying the credit is denied', async () => {
      getScoreMock.mockReturnValueOnce(199);

      const message = await cli([
        '--idade',
        '20',
        '--cidade',
        'São Paulo',
        '--renda-mensal',
        '1000',
      ]);

      expect(message).toStrictEqual(
        'Crédito negado. Seu score é menor que 200 (199).'
      );
    });
  });

  describe('when the user provides invalid arguments', () => {
    test('shows the help message with the validation errors', async () => {
      const message = await cli([]);

      expect(message).toMatchInlineSnapshot(`
        "Você deve informar sua cidade.
        Sua idade deve ser um número.
        Sua renda mensal deve ser um número em reais.
        ---
        USO:
          score-engine --cidade <cidade> --idade <idade> --renda-mensal <renda-mensal>

        PARÂMETROS:
          --cidade <cidade> - Sua cidade atual. (Somente letras e espaços)
          --idade <idade> - Sua idade em anos.
          --renda-mensal <renda-mensal> - Renda mensal em reais. (Somente números)"
      `);
    });
  });

  describe('when something goes wrong', () => {
    test('shows the error message', async () => {
      const error = new Error('Something went wrong');

      fetchTemperatureMock.mockRejectedValueOnce(error);

      const message = await cli([
        '--idade',
        '20',
        '--cidade',
        'São Paulo',
        '--renda-mensal',
        '1000',
      ]);

      expect(message).toStrictEqual(error.message);
    });
  });
});
