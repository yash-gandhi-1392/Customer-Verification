import { Box, CircularProgress, Typography } from "@mui/material";

export default function Processing() {
  return (
    <Box textAlign="center">
      <Typography variant="h6">Connecting to your bank...</Typography>
      <CircularProgress sx={{ mt: 2 }} />
    </Box>
  );
}
