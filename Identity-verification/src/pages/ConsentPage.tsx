import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  alpha,
  CircularProgress,
  Link,
} from '@mui/material';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import FingerprintRoundedIcon from '@mui/icons-material/FingerprintRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import { consentSchema } from '../validation/schemas';
import { startSession } from '../api/kycService';
import { useKYC } from '../hooks/useKYCContext';
import StepLayout from '../components/StepLayout';
import AppSnackbar, { SnackbarState } from '../components/AppSnackbar';
import { ConsentFormValues } from '../types';

const initialValues: ConsentFormValues = {
  privacyPolicy: false,
  termsOfService: false,
  biometricConsent: false,
};

const ConsentPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSessionId } = useKYC();
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'error',
  });

  const handleSubmit = async (_values: ConsentFormValues) => {
    try {
      const res = await startSession();
      setSessionId(res.sessionId);
      navigate('/personal-info');
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to start session. Please try again.',
        severity: 'error',
      });
    }
  };

  const features = [
    {
      icon: <ShieldRoundedIcon sx={{ fontSize: 22, color: '#00E5CC' }} />,
      title: 'Bank-Level Security',
      desc: '256-bit encryption protects all your data',
    },
    {
      icon: <VerifiedUserRoundedIcon sx={{ fontSize: 22, color: '#5B8AF5' }} />,
      title: 'Canadian Compliant',
      desc: 'PIPEDA and FINTRAC compliant process',
    },
    {
      icon: <FingerprintRoundedIcon sx={{ fontSize: 22, color: '#00E5CC' }} />,
      title: 'Biometric Verification',
      desc: 'Liveness detection to prevent fraud',
    },
  ];

  return (
    <StepLayout currentStep={0}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(0,229,204,0.2) 0%, rgba(91,138,245,0.2) 100%)',
            border: `1px solid ${alpha('#00E5CC', 0.3)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2.5,
          }}
        >
          <ShieldRoundedIcon sx={{ fontSize: 36, color: '#00E5CC' }} />
        </Box>

        <Typography
          variant="h3"
          sx={{ color: '#F0F4FF', mb: 1, fontSize: { xs: '1.6rem', md: '1.75rem' } }}
        >
          Identity Verification
        </Typography>
        <Typography variant="body2" sx={{ color: '#8A9BB8', maxWidth: 380, mx: 'auto' }}>
          We need to verify your identity to comply with Canadian financial regulations. 
          This takes about <Box component="span" sx={{ color: '#00E5CC', fontWeight: 600 }}>3–5 minutes</Box>.
        </Typography>
      </Box>

      {/* Trust features */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
          gap: 2,
          mb: 4,
        }}
      >
        {features.map((f) => (
          <Box
            key={f.title}
            sx={{
              p: 2,
              borderRadius: 2.5,
              backgroundColor: alpha('#1A3060', 0.4),
              border: `1px solid ${alpha('#5B8AF5', 0.12)}`,
              textAlign: 'center',
            }}
          >
            <Box sx={{ mb: 1 }}>{f.icon}</Box>
            <Typography variant="caption" sx={{ color: '#F0F4FF', fontWeight: 600, display: 'block', mb: 0.3, fontSize: '0.75rem' }}>
              {f.title}
            </Typography>
            <Typography variant="caption" sx={{ color: '#8A9BB8', fontSize: '0.7rem' }}>
              {f.desc}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={consentSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, isSubmitting, setFieldValue }) => {
          const allChecked = values.privacyPolicy && values.termsOfService && values.biometricConsent;

          return (
            <Form>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: alpha('#1A3060', 0.35),
                  border: `1px solid ${alpha('#5B8AF5', 0.12)}`,
                  mb: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {/* Privacy Policy */}
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.privacyPolicy}
                        onChange={(e) => setFieldValue('privacyPolicy', e.target.checked)}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: '#F0F4FF', fontSize: '0.875rem' }}>
                        I have read and agree to the{' '}
                        <Link href="#" sx={{ color: '#00E5CC', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
                    sx={{ alignItems: 'flex-start', ml: 0 }}
                  />
                  {touched.privacyPolicy && errors.privacyPolicy && (
                    <FormHelperText error sx={{ ml: 4 }}>{errors.privacyPolicy}</FormHelperText>
                  )}
                </Box>

                {/* Terms */}
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.termsOfService}
                        onChange={(e) => setFieldValue('termsOfService', e.target.checked)}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: '#F0F4FF', fontSize: '0.875rem' }}>
                        I accept the{' '}
                        <Link href="#" sx={{ color: '#00E5CC', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="#" sx={{ color: '#5B8AF5', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                          End User Agreement
                        </Link>
                      </Typography>
                    }
                    sx={{ alignItems: 'flex-start', ml: 0 }}
                  />
                  {touched.termsOfService && errors.termsOfService && (
                    <FormHelperText error sx={{ ml: 4 }}>{errors.termsOfService}</FormHelperText>
                  )}
                </Box>

                {/* Biometric */}
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.biometricConsent}
                        onChange={(e) => setFieldValue('biometricConsent', e.target.checked)}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: '#F0F4FF', fontSize: '0.875rem' }}>
                        I consent to the collection and processing of my{' '}
                        <Box component="span" sx={{ color: '#00E5CC', fontWeight: 600 }}>
                          biometric data
                        </Box>{' '}
                        (facial recognition and liveness detection) for identity verification
                      </Typography>
                    }
                    sx={{ alignItems: 'flex-start', ml: 0 }}
                  />
                  {touched.biometricConsent && errors.biometricConsent && (
                    <FormHelperText error sx={{ ml: 4 }}>{errors.biometricConsent}</FormHelperText>
                  )}
                </Box>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={!allChecked || isSubmitting}
                sx={{
                  py: 1.75,
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}
                startIcon={
                  isSubmitting ? (
                    <CircularProgress size={18} sx={{ color: 'inherit' }} />
                  ) : (
                    <ShieldRoundedIcon />
                  )
                }
              >
                {isSubmitting ? 'Starting verification…' : 'Start Verification'}
              </Button>

              <Typography
                variant="caption"
                sx={{ color: '#8A9BB8', textAlign: 'center', display: 'block', mt: 2, fontSize: '0.72rem' }}
              >
                🇨🇦 Your data is protected under Canadian privacy law (PIPEDA)
              </Typography>
            </Form>
          );
        }}
      </Formik>

      <AppSnackbar state={snackbar} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} />
    </StepLayout>
  );
};

export default ConsentPage;
