import { showHelp } from '@/utilities/index.js';

describe('showHelp', () => {
  test('shows the help message', () => {
    const helpMessage = showHelp();

    expect(helpMessage).toMatchInlineSnapshot(`
      "USO:
        score-engine --cidade <cidade> --idade <idade> --renda-mensal <renda-mensal>

      PARÂMETROS:
        --cidade <cidade> - Sua cidade atual. (Somente letras e espaços)
        --idade <idade> - Sua idade em anos.
        --renda-mensal <renda-mensal> - Renda mensal em reais. (Somente números)"
    `);
  });
});
