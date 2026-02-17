import React, { useState } from "react";
import { Doctrine2Provider } from "../state/Doctrine2Context";
import { Container, Paper } from "@mui/material";
import MainStepper from "../shared/components/MainStepper";
import EmploymentTypeStep from "./steps/EmploymentTypeStep";
import EmployerDetailsStep from "./steps/EmployerDetailsStep";
import EmployerCheckStep from "./steps/EmployerCheckStep";
import EmployerResultStep from "./steps/EmployerResultStep";

const steps = [
  "Employment Type",
  "Employer Details",
  "Employer Check",
  "Result",
];

const Doctrine2Flow = () => {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return (
    <Doctrine2Provider>
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Paper sx={{ p: 4 }}>
          <MainStepper steps={steps} activeStep={step} />

          {step === 0 && <EmploymentTypeStep next={next} />}
          {step === 1 && <EmployerDetailsStep next={next} back={back} />}
          {step === 2 && <EmployerCheckStep next={next} back={back} />}
          {step === 3 && <EmployerResultStep back={back} />}
        </Paper>
      </Container>
    </Doctrine2Provider>
  );
};

export default Doctrine2Flow;
