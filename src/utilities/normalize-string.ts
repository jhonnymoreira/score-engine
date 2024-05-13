/**
 * @see https://stackoverflow.com/a/37511463
 */
export function normalizeString(value: string) {
  return value.normalize('NFKD').replaceAll(/\p{Diacritic}/gu, '');
}
