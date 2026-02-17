export type GateStatus = "PASS" | "FAIL" | "REVIEW";

export interface EmployerInput {
  employerName: string;
  employerAddress: string;
  employerPhone: string;
  applicantHomeAddress: string;
  jobTitle: string;
  isRemote?: boolean;
}

export interface Doctrine2Result {
  ceid: string;
  existence: GateStatus;
  linkage: GateStatus;
  sanity: GateStatus;
  finalStatus: GateStatus;
  failedGate?: string;
}
