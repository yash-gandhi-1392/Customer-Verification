import React from "react";
import { useDoctrine2 } from "../../state/Doctrine2Context";
import { Button, Stack, Typography } from "@mui/material";

interface Props {
  next: () => void;
}

const EmploymentTypeStep: React.FC<Props> = ({ next }) => {
  const { input, setInput } = useDoctrine2();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        What is your employment situation?
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={() => {
            setInput({ ...input, isRemote: false });
            next();
          }}
        >
          On-Site Employee
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            setInput({ ...input, isRemote: true });
            next();
          }}
        >
          Remote Employee
        </Button>
      </Stack>
    </>
  );
};

export default EmploymentTypeStep;
