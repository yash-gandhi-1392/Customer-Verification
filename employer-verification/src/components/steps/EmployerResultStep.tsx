import React from "react";
import { useDoctrine2 } from "../../state/Doctrine2Context";
import { Typography, Alert, Button, Stack } from "@mui/material";

interface Props {
  back: () => void;
}

const EmployerResultStep: React.FC<Props> = ({ back }) => {
  const { result } = useDoctrine2();
  if (!result) return null;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Employer Verification Result
      </Typography>

      {result.finalStatus === "PASS" ? (
        <Alert severity="success">
          Employer Reality Verified Successfully.
        </Alert>
      ) : (
        <Alert severity="error">
          Employer Reality Failed at {result.failedGate} Gate.
        </Alert>
      )}

      <Stack sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={back}>
          Back
        </Button>
      </Stack>
    </>
  );
};

export default EmployerResultStep;
