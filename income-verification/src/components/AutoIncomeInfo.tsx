import { Box, Button, Typography } from "@mui/material";

interface Props {
  onConnect: () => void;
}

export default function AutoIncomeInfo({ onConnect }: Props) {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">Automatic Income Calculation</Typography>
      <Typography>
        We calculate your income automatically using bank data. This helps
        avoid manual work and paper review.
      </Typography>
      <Button variant="contained" onClick={onConnect}>
        Connect Bank
      </Button>
    </Box>
  );
}
