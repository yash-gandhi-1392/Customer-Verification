import React from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";

interface Props {
  steps: string[];
  activeStep: number;
}

const MainStepper: React.FC<Props> = ({ steps, activeStep }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default MainStepper;
