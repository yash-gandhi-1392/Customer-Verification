import React, { useEffect } from "react";
import { useDoctrine2 } from "../../state/Doctrine2Context";
import { staticAddressRegistry } from "../../mock/staticAddressRegistry";

import {
  Typography,
  Button,
  Stack,
  Alert,
  Divider,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface Props {
  next: () => void;
  back: () => void;
}

const EmployerCheckStep: React.FC<Props> = ({ next, back }) => {
  const { runCheck, result, input } = useDoctrine2();

  useEffect(() => {
    runCheck();
  }, []);

  if (!result) {
    return (
      <Stack alignItems="center" spacing={2}>
        <CircularProgress />
        <Typography>Verifying Employer Reality...</Typography>
      </Stack>
    );
  }

  const isSuccess = result.finalStatus === "PASS";

  const addressData = staticAddressRegistry.find(
    (a) => a.formatted === input.employerAddress,
  );

  const mapUrl =
    addressData &&
    `https://www.google.com/maps?q=${addressData.lat},${addressData.lng}&z=15&output=embed`;

  return (
    <>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Employer Reality Check
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        {/* Address Verification */}
        <Alert severity={result.existence === "PASS" ? "success" : "error"}>
          Employer address verified: <strong>{input.employerAddress}</strong>
        </Alert>

        {/* Google Maps Evidence */}
        {addressData && (
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOnIcon color="primary" />
                  <Typography variant="subtitle1" fontWeight={600}>
                    Location Evidence (Google Maps)
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <Chip
                    label={`Zoning: ${addressData.zoning}`}
                    color={
                      addressData.zoning === "COMMERCIAL"
                        ? "success"
                        : "warning"
                    }
                  />
                  <Chip
                    label={`City: ${addressData.city}`}
                    variant="outlined"
                  />
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  Coordinates: {addressData.lat}, {addressData.lng}
                </Typography>

                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    height: 250,
                    border: "1px solid #ddd",
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={mapUrl}
                  ></iframe>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* Phone Verification */}
        <Alert severity={result.existence === "PASS" ? "success" : "error"}>
          Employer phone validated: <strong>{input.employerPhone}</strong>
        </Alert>

        {/* Payroll / Linkage */}
        <Alert severity={result.linkage === "PASS" ? "success" : "error"}>
          Payroll source verified against employer
        </Alert>

        {/* Role Plausibility */}
        <Alert severity={result.sanity === "PASS" ? "success" : "error"}>
          Role compatible with employer location
        </Alert>
      </Stack>

      {/* Final Decision */}
      <Box sx={{ mt: 4 }}>
        {isSuccess ? (
          <Alert severity="success">
            Employer verification successful. No inconsistencies detected.
          </Alert>
        ) : (
          <Alert severity="error">
            Employer verification failed at {result.failedGate} validation.
          </Alert>
        )}
      </Box>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="outlined" onClick={back}>
          Back
        </Button>

        <Button variant="contained" disabled={!isSuccess} onClick={next}>
          Continue
        </Button>
      </Stack>
    </>
  );
};

export default EmployerCheckStep;
