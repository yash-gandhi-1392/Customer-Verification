import type { GateStatus, EmployerInput } from "../types";
import { staticAddressRegistry } from ".././mock/staticAddressRegistry";

export const runExistenceGate = (input: EmployerInput): GateStatus => {
  const address = staticAddressRegistry.find(
    (a) => a.formatted === input.employerAddress,
  );

  if (!address) return "FAIL";

  if (!input.employerPhone || input.employerPhone.length < 10) return "FAIL";

  return "PASS";
};
