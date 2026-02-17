import { resolveCEID } from "./ceidResolver";
import { runExistenceGate } from "./existenceGate";
import { runLinkageGate } from "./linkageGate";
import { runSanityGate } from "./sanityGate";
import type { EmployerInput, Doctrine2Result } from "../types";

/**
 * bankTransactionString must come from simulated bank fetch,
 * NOT from user input.
 */
export const runDoctrine2 = (
  input: EmployerInput,
  bankTransactionString: string,
): Doctrine2Result => {
  const ceid = resolveCEID(input.employerName, input.employerAddress);

  const existence = runExistenceGate(input);
  if (existence === "FAIL") {
    return {
      ceid,
      existence,
      linkage: "REVIEW",
      sanity: "REVIEW",
      finalStatus: "FAIL",
      failedGate: "Existence",
    };
  }

  const linkage = runLinkageGate(input.employerName, bankTransactionString);
  if (linkage === "FAIL") {
    return {
      ceid,
      existence,
      linkage,
      sanity: "REVIEW",
      finalStatus: "FAIL",
      failedGate: "Linkage",
    };
  }

  const sanity = runSanityGate(input);
  if (sanity === "FAIL") {
    return {
      ceid,
      existence,
      linkage,
      sanity,
      finalStatus: "FAIL",
      failedGate: "Sanity",
    };
  }

  return {
    ceid,
    existence,
    linkage,
    sanity,
    finalStatus: "PASS",
  };
};
