import { Box, Button, Typography } from "@mui/material";
import type { IncomeResultType } from "../types/income.types";

interface Props {
  result: IncomeResultType;
}

export default function IncomeResult({ result }: Props) {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">Computed Income</Typography>
      <Typography>
        Monthly Income Range: ${result.monthlyMin} - ${result.monthlyMax}
      </Typography>
      <Typography>Pay Frequency: {result.payFrequency}</Typography>
      <Typography>Employment Type: {result.employmentType}</Typography>
      <Button variant="contained">Yes, Continue</Button>
    </Box>
  );
}
