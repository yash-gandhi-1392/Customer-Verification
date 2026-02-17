import { type Transaction, type IncomeResultType } from "../types/income.types";

export const processIncome = (
  transactions: Transaction[]
): IncomeResultType => {
  const credits = transactions.filter((t) => t.type === "credit");

  const total = credits.reduce((sum, t) => sum + t.amount, 0);

  const monthlyAverage = total / 3;

  return {
    monthlyMin: Math.round(monthlyAverage * 0.9),
    monthlyMax: Math.round(monthlyAverage),
    payFrequency: "Bi-Weekly",
    employmentType: "Salaried",
  };
};
