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
    test('shows the help message', async () => {
      const message = await cli([]);

      expect(message).toStrictEqual(showHelp());
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
