import { normalizeName } from "../shared/utils/stringUtils";
import { payrollProviders } from "../mock/payrollProviders";
import type { GateStatus } from "../types";

export const runLinkageGate = (
  employerName: string,
  bankTransactionString: string,
): GateStatus => {
  if (!bankTransactionString) return "REVIEW";

  const employer = normalizeName(employerName);
  const payor = normalizeName(bankTransactionString);

  // Direct match
  if (employer === payor) return "PASS";

  // Payroll provider match (ADP, Ceridian, etc.)
  const payrollMatch = payrollProviders.some((p) => payor.includes(p));

  if (payrollMatch) return "PASS";

  // Detect personal-name-like payor
  const looksLikePerson =
    payor.split(" ").length <= 2 &&
    !payor.includes("inc") &&
    !payor.includes("ltd") &&
    !payor.includes("corp");

  if (looksLikePerson) return "FAIL";

  return "REVIEW";
};
