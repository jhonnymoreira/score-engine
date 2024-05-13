import { normalizeString } from '@/utilities/index.js';

describe('normalizeString', () => {
  test('removes diacritics', () => {
    const value = 'São Paulo';

    expect(normalizeString(value)).toStrictEqual('Sao Paulo');
  });
});
