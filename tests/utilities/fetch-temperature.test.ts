import { fetchTemperature } from '@/utilities/index.js';

globalThis.fetch = vitest.fn();

const fetch = vitest.mocked(globalThis.fetch);

beforeEach(() => {
  process.env['OPENWEATHER_API_KEY'] = crypto.randomUUID().replaceAll('-', '');
  fetch.mockClear();
});

describe('fetchTemperature', () => {
  test('returns the city temperature in Celsius', async () => {
    fetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ main: { temp: 30 } }), { status: 200 })
    );

    const temperature = await fetchTemperature('São Carlos');

    expect(temperature).toStrictEqual(30);
  });

  describe('when the "OPENWEATHER_API_KEY" environment variable is not set', () => {
    test('throws an error indicating the environment variable is missing', async () => {
      delete process.env['OPENWEATHER_API_KEY'];

      await expect(fetchTemperature('São Carlos')).rejects.toThrow(
        'Missing "OPENWEATHER_API_KEY" environment variable'
      );
    });
  });

  describe('when the provided API KEY is invalid', () => {
    test('throws an error indicating the API key is invalid', async () => {
      process.env['OPENWEATHER_API_KEY'] = 'invalid-api-key';

      fetch.mockResolvedValueOnce(new Response('', { status: 401 }));

      await expect(fetchTemperature('São Carlos')).rejects.toThrow(
        'Chave de API inválida'
      );
    });
  });

  describe('when the city is not found', () => {
    test("throws an error indicating the city wasn't found", async () => {
      fetch.mockResolvedValueOnce(new Response('', { status: 404 }));

      await expect(fetchTemperature('random-city')).rejects.toThrow(
        'Cidade não encontrada'
      );
    });
  });

  describe('when the API returns a 5xx error', () => {
    test('throws an error indicating the API returned an error', async () => {
      fetch.mockResolvedValueOnce(new Response('', { status: 500 }));

      await expect(fetchTemperature('São Carlos')).rejects.toThrow(
        'Erro interno de API. Tente novamente mais tarde.'
      );
    });
  });
});
