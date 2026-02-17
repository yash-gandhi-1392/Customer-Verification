import React, { createContext, useContext, useState } from "react";
import type { EmployerInput, Doctrine2Result } from "../types";
import { runDoctrine2 } from "../engine/doctrine2Engine";
import { mockFetchBankDeposit } from "../mock/mockBank";

type DemoCase = "PASS" | "FAIL";

interface ContextType {
  input: EmployerInput;
  setInput: (input: EmployerInput) => void;
  result?: Doctrine2Result;
  runCheck: () => void;
  demoCase: DemoCase;
  setDemoCase: (c: DemoCase) => void;
  loadStaticCase: (c: DemoCase) => void;
}

const Doctrine2Context = createContext<ContextType | undefined>(undefined);

export const Doctrine2Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [demoCase, setDemoCase] = useState<DemoCase>("PASS");

  const [input, setInput] = useState<EmployerInput>({
    employerName: "",
    employerAddress: "",
    employerPhone: "",
    applicantHomeAddress: "",
    jobTitle: "",
    isRemote: false,
  });

  const [result, setResult] = useState<Doctrine2Result>();

  /**
   * Pre-loads realistic static demo scenarios
   */
  const loadStaticCase = (c: DemoCase) => {
    setDemoCase(c);

    if (c === "PASS") {
      setInput({
        employerName: "ACME Construction Ltd",
        employerAddress: "100 King St, Toronto",
        employerPhone: "4161234567",
        applicantHomeAddress: "12 Maple Ave, Toronto",
        jobTitle: "Software Engineer",
        isRemote: false,
      });
    }

    if (c === "FAIL") {
      setInput({
        employerName: "ACME Construction Ltd",
        employerAddress: "500 Industrial Rd, Calgary",
        employerPhone: "4161234567",
        applicantHomeAddress: "12 Maple Ave, Toronto",
        jobTitle: "Warehouse Operator",
        isRemote: false,
      });
    }

    setResult(undefined);
  };

  /**
   * Runs Doctrine 2 using static bank ingestion
   */
  const runCheck = () => {
    const bankTransactionString = mockFetchBankDeposit(demoCase);

    const res = runDoctrine2(input, bankTransactionString);
    setResult(res);
  };

  return (
    <Doctrine2Context.Provider
      value={{
        input,
        setInput,
        result,
        runCheck,
        demoCase,
        setDemoCase,
        loadStaticCase,
      }}
    >
      {children}
    </Doctrine2Context.Provider>
  );
};

export const useDoctrine2 = () => {
  const ctx = useContext(Doctrine2Context);
  if (!ctx) throw new Error("Doctrine2Context missing");
  return ctx;
};
