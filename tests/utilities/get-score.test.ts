import { getScore } from '@/utilities/index.js';

describe('getScore', () => {
  test('returns the score number based on age, monthly income and weather temperature', () => {
    const score = getScore({ age: 30, monthlyIncome: 1800, temperature: 30 });

    expect(score).toStrictEqual(201);
  });
});
