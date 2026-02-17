import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";

interface Props {
  onNext: () => void;
}

export default function SoftDeclaration({ onNext }: Props) {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">Soft Income Declaration</Typography>

      <TextField select label="Employment Type" fullWidth>
        <MenuItem value="salaried">Salaried</MenuItem>
        <MenuItem value="self-employed">Self Employed</MenuItem>
        <MenuItem value="gig">Gig Worker</MenuItem>
      </TextField>

      <TextField select label="Income Range" fullWidth>
        <MenuItem value="2000-3000">$2000 - $3000</MenuItem>
        <MenuItem value="3000-5000">$3000 - $5000</MenuItem>
        <MenuItem value="5000+">$5000+</MenuItem>
      </TextField>

      <TextField select label="Pay Frequency" fullWidth>
        <MenuItem value="weekly">Weekly</MenuItem>
        <MenuItem value="biweekly">Bi-Weekly</MenuItem>
        <MenuItem value="monthly">Monthly</MenuItem>
      </TextField>

      <Button variant="contained" onClick={onNext}>
        Continue
      </Button>
    </Box>
  );
}
