export const mockFetchBankDeposit = (caseType: "PASS" | "FAIL") => {
  if (caseType === "PASS") {
    return "ADP PAYROLL SERVICES";
  }

  return "John Michael";
};
