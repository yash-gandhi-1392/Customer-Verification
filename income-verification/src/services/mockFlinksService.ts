import type { Transaction } from "../types/income.types";

export const fetchMockTransactions = async (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { date: "2024-09-01", amount: 2500, description: "ACME PAYROLL", type: "credit" },
        { date: "2024-09-15", amount: 2500, description: "ACME PAYROLL", type: "credit" },
        { date: "2024-10-01", amount: 2500, description: "ACME PAYROLL", type: "credit" },
        { date: "2024-10-15", amount: 2500, description: "ACME PAYROLL", type: "credit" },
        { date: "2024-11-01", amount: 2500, description: "ACME PAYROLL", type: "credit" },
        { date: "2024-11-15", amount: 2500, description: "ACME PAYROLL", type: "credit" },
      ]);
    }, 2000);
  });
};
