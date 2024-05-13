import get from 'lodash.get';
import process from 'node:process';
import { z } from 'zod';

export async function fetchTemperature(city: string) {
  const OPENWEATHER_ENDPOINT =
    'https://api.openweathermap.org/data/2.5/weather';

  const environmentValidation = z
    .object({
      OPENWEATHER_API_KEY: z.string(),
    })
    .safeParse(process.env);

  if (!environmentValidation.success) {
    throw new Error('Missing "OPENWEATHER_API_KEY" environment variable');
  }

  const endpoint = new URL(OPENWEATHER_ENDPOINT);
  endpoint.searchParams.set('q', city);
  endpoint.searchParams.set(
    'appid',
    environmentValidation.data.OPENWEATHER_API_KEY
  );
  endpoint.searchParams.set('units', 'metric');

  const response = await fetch(endpoint.toString());

  if (!response.ok) {
    const messageByStatusCode: Record<number, string> = {
      401: 'Chave de API inválida',
      404: 'Cidade não encontrada',
    };

    const defaultMessage = 'Erro interno de API. Tente novamente mais tarde.';

    throw new Error(messageByStatusCode[response.status] ?? defaultMessage);
  }

  const weather = (await response.json()) as { main: { temp: number } };

  return get(weather, 'main.temp');
}
