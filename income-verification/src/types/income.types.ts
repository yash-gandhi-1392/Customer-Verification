export interface Transaction {
  date: string;
  amount: number;
  description: string;
  type: "credit" | "debit";
}

export interface IncomeResultType {
  monthlyMin: number;
  monthlyMax: number;
  payFrequency: string;
  employmentType: string;
}
