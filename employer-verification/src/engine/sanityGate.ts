import type { GateStatus, EmployerInput } from "../types";
import { staticAddressRegistry } from ".././mock/staticAddressRegistry";
import { calculateDistanceKm } from "../shared/utils/distanceUtils";
import { highInfrastructureRoles } from "../mock/industryRoleMatrix";

export const runSanityGate = (input: EmployerInput): GateStatus => {
  const employer = staticAddressRegistry.find(
    (a) => a.formatted === input.employerAddress,
  );

  const applicant = staticAddressRegistry.find(
    (a) => a.formatted === input.applicantHomeAddress,
  );

  if (!employer || !applicant) return "REVIEW";

  // Commute check (max 150 km for non-remote)
  const distance = calculateDistanceKm(
    applicant.lat,
    applicant.lng,
    employer.lat,
    employer.lng,
  );

  if (!input.isRemote && distance > 150) {
    return "FAIL";
  }

  // Residential + heavy infra role = impossible
  const requiresInfra = highInfrastructureRoles.some((r) =>
    input.jobTitle.toLowerCase().includes(r),
  );

  if (employer.zoning === "RESIDENTIAL" && requiresInfra) {
    return "FAIL";
  }

  return "PASS";
};
