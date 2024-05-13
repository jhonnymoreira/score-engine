export function getScore({
  age,
  monthlyIncome,
  temperature,
}: {
  age: number;
  monthlyIncome: number;
  temperature: number;
}) {
  const ageComponent = age * 0.5;
  const incomeComponent = (monthlyIncome / 100) * 2;
  const weatherComponent = temperature * 5;

  return ageComponent + incomeComponent + weatherComponent;
}
