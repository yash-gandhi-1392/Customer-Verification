import React from "react";
import { useDoctrine2 } from "../../state/Doctrine2Context";
import {
  TextField,
  Button,
  Stack,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
  Box,
} from "@mui/material";

interface Props {
  next: () => void;
  back: () => void;
}

const EmployerDetailsStep: React.FC<Props> = ({ next, back }) => {
  const { input, setInput, loadStaticCase } = useDoctrine2();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Employer Details
      </Typography>

      {/* Demo Case Loader */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Load Static Demo Case:
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="success"
            onClick={() => loadStaticCase("PASS")}
          >
            Load Success Case
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() => loadStaticCase("FAIL")}
          >
            Load Failure Case
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        <TextField
          label="Employer Name"
          value={input.employerName}
          onChange={(e) => setInput({ ...input, employerName: e.target.value })}
          fullWidth
        />

        {/* Employer Address Dropdown (Static Google Map Registry) */}
        <FormControl fullWidth>
          <InputLabel>Employer Address</InputLabel>
          <Select
            value={input.employerAddress}
            label="Employer Address"
            onChange={(e) =>
              setInput({ ...input, employerAddress: e.target.value })
            }
          >
            <MenuItem value="100 King St, Toronto">
              100 King St, Toronto (Commercial)
            </MenuItem>
            <MenuItem value="500 Industrial Rd, Calgary">
              500 Industrial Rd, Calgary (Commercial)
            </MenuItem>
            <MenuItem value="12 Maple Ave, Toronto">
              12 Maple Ave, Toronto (Residential)
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Employer Phone"
          value={input.employerPhone}
          onChange={(e) =>
            setInput({ ...input, employerPhone: e.target.value })
          }
          fullWidth
        />

        {/* Applicant Address Dropdown */}
        <FormControl fullWidth>
          <InputLabel>Your Home Address</InputLabel>
          <Select
            value={input.applicantHomeAddress}
            label="Your Home Address"
            onChange={(e) =>
              setInput({
                ...input,
                applicantHomeAddress: e.target.value,
              })
            }
          >
            <MenuItem value="12 Maple Ave, Toronto">
              12 Maple Ave, Toronto
            </MenuItem>
            <MenuItem value="100 King St, Toronto">
              100 King St, Toronto
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Job Title"
          value={input.jobTitle}
          onChange={(e) => setInput({ ...input, jobTitle: e.target.value })}
          fullWidth
        />
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="outlined" onClick={back}>
          Back
        </Button>

        <Button
          variant="contained"
          onClick={next}
          disabled={
            !input.employerName ||
            !input.employerAddress ||
            !input.employerPhone ||
            !input.applicantHomeAddress ||
            !input.jobTitle
          }
        >
          Continue
        </Button>
      </Stack>
    </>
  );
};

export default EmployerDetailsStep;
