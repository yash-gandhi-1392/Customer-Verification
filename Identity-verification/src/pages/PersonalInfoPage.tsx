import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, FieldProps } from 'formik';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  alpha,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
  Chip,
} from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { personalInfoSchema } from '../validation/schemas';
import { submitPersonalInfo, sendPhoneOTP, verifyPhoneOTP } from '../api/kycService';
import { useKYC } from '../hooks/useKYCContext';
import StepLayout from '../components/StepLayout';
import AppSnackbar, { SnackbarState } from '../components/AppSnackbar';
import { PersonalInfoFormValues } from '../types';

const PROVINCES = [
  { code: 'AB', name: 'Alberta' },
  { code: 'BC', name: 'British Columbia' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'NL', name: 'Newfoundland and Labrador' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'NT', name: 'Northwest Territories' },
  { code: 'NU', name: 'Nunavut' },
  { code: 'ON', name: 'Ontario' },
  { code: 'PE', name: 'Prince Edward Island' },
  { code: 'QC', name: 'Quebec' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'YT', name: 'Yukon' },
];

const initialValues: PersonalInfoFormValues = {
  fullLegalName: '',
  dateOfBirth: '',
  streetAddress: '',
  city: '',
  province: '',
  postalCode: '',
  phoneNumber: '',
  email: '',
};

const PersonalInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const { setPersonalInfo } = useKYC();
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [pendingPhone, setPendingPhone] = useState('');
  const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false, message: '', severity: 'error' });

  const showSnack = (message: string, severity: SnackbarState['severity'] = 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSendOTP = async (phone: string) => {
    if (!phone || phone.length < 10) {
      showSnack('Please enter a valid phone number first.', 'warning');
      return;
    }
    setOtpSending(true);
    try {
      await sendPhoneOTP(phone);
      setPendingPhone(phone);
      setOtpDialogOpen(true);
      showSnack('Verification code sent!', 'success');
    } catch (err: any) {
      showSnack(err.message || 'Failed to send OTP');
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) {
      showSnack('Please enter the 6-digit code.');
      return;
    }
    setOtpVerifying(true);
    try {
      await verifyPhoneOTP(pendingPhone, otpCode);
      setPhoneVerified(true);
      setOtpDialogOpen(false);
      setOtpCode('');
      showSnack('Phone number verified!', 'success');
    } catch (err: any) {
      showSnack(err.message || 'Invalid code. Please try again.');
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleSubmit = async (values: PersonalInfoFormValues) => {
    try {
      await submitPersonalInfo(values);
      setPersonalInfo(values);
      navigate('/select-id');
    } catch (err: any) {
      showSnack(err.message || 'Failed to save information. Please try again.');
    }
  };

  return (
    <StepLayout currentStep={1} maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <PersonRoundedIcon sx={{ color: '#00E5CC', fontSize: 22 }} />
          <Typography variant="h4" sx={{ color: '#F0F4FF', fontSize: { xs: '1.3rem', md: '1.375rem' } }}>
            Personal Information
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#8A9BB8' }}>
          Please enter your information exactly as it appears on your government-issued ID.
        </Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={personalInfoSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, isSubmitting, getFieldProps, setFieldValue }) => (
          <Form>
            <Grid container spacing={2.5}>
              {/* Full Legal Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Legal Name"
                  placeholder="e.g. Jean-Pierre Tremblay"
                  {...getFieldProps('fullLegalName')}
                  error={touched.fullLegalName && Boolean(errors.fullLegalName)}
                  helperText={touched.fullLegalName && errors.fullLegalName}
                />
              </Grid>

              {/* Date of Birth */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  {...getFieldProps('dateOfBirth')}
                  error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                  helperText={touched.dateOfBirth && errors.dateOfBirth as string}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ max: new Date().toISOString().split('T')[0] }}
                />
              </Grid>

              {/* Phone */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  placeholder="e.g. +1 (416) 555-0123"
                  {...getFieldProps('phoneNumber')}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {phoneVerified ? (
                          <Chip
                            icon={<CheckCircleRoundedIcon sx={{ fontSize: 14 }} />}
                            label="Verified"
                            size="small"
                            sx={{
                              backgroundColor: alpha('#00E5CC', 0.15),
                              color: '#00E5CC',
                              height: 24,
                              fontSize: '0.7rem',
                              '& .MuiChip-icon': { color: '#00E5CC' },
                            }}
                          />
                        ) : (
                          <Button
                            size="small"
                            onClick={() => handleSendOTP(values.phoneNumber)}
                            disabled={otpSending || !values.phoneNumber}
                            sx={{
                              fontSize: '0.7rem',
                              py: 0.4,
                              px: 1,
                              minWidth: 'auto',
                              color: '#5B8AF5',
                              '&:hover': { backgroundColor: alpha('#5B8AF5', 0.1) },
                            }}
                          >
                            {otpSending ? <CircularProgress size={12} /> : 'Verify'}
                          </Button>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Street Address */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  placeholder="e.g. 123 Maple Street, Suite 4B"
                  {...getFieldProps('streetAddress')}
                  error={touched.streetAddress && Boolean(errors.streetAddress)}
                  helperText={touched.streetAddress && errors.streetAddress}
                />
              </Grid>

              {/* City */}
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="City"
                  placeholder="e.g. Toronto"
                  {...getFieldProps('city')}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                />
              </Grid>

              {/* Province */}
              <Grid item xs={12} sm={4}>
                <FormControl
                  fullWidth
                  error={touched.province && Boolean(errors.province)}
                >
                  <InputLabel>Province / Territory</InputLabel>
                  <Select
                    label="Province / Territory"
                    value={values.province}
                    onChange={(e) => setFieldValue('province', e.target.value)}
                    sx={{ borderRadius: 3 }}
                  >
                    {PROVINCES.map((p) => (
                      <MenuItem key={p.code} value={p.code}>
                        {p.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.province && errors.province && (
                    <FormHelperText>{errors.province}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Postal Code */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  placeholder="M5V 3A8"
                  {...getFieldProps('postalCode')}
                  error={touched.postalCode && Boolean(errors.postalCode)}
                  helperText={touched.postalCode && errors.postalCode}
                  inputProps={{ style: { textTransform: 'uppercase' } }}
                  onChange={(e) =>
                    setFieldValue('postalCode', e.target.value.toUpperCase())
                  }
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  placeholder="e.g. jean.tremblay@example.ca"
                  {...getFieldProps('email')}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{ borderColor: alpha('#5B8AF5', 0.3), color: '#8A9BB8', flex: { sm: '0 0 auto' } }}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={isSubmitting}
                endIcon={
                  isSubmitting ? (
                    <CircularProgress size={16} sx={{ color: 'inherit' }} />
                  ) : (
                    <ArrowForwardRoundedIcon />
                  )
                }
                sx={{ py: 1.75, fontWeight: 700 }}
              >
                {isSubmitting ? 'Saving…' : 'Continue'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {/* OTP Dialog */}
      <Dialog
        open={otpDialogOpen}
        onClose={() => setOtpDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#0F2040',
            border: `1px solid ${alpha('#5B8AF5', 0.2)}`,
            borderRadius: 3,
            width: '100%',
            maxWidth: 400,
          },
        }}
      >
        <DialogTitle sx={{ fontFamily: '"Syne", sans-serif', fontWeight: 700, color: '#F0F4FF' }}>
          <PhoneRoundedIcon sx={{ color: '#00E5CC', mr: 1, verticalAlign: 'middle', fontSize: 20 }} />
          Verify Phone Number
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: '#8A9BB8', mb: 3 }}>
            We sent a 6-digit code to{' '}
            <Box component="span" sx={{ color: '#F0F4FF', fontWeight: 600 }}>
              {pendingPhone}
            </Box>
          </Typography>
          <TextField
            fullWidth
            label="Verification Code"
            placeholder="000000"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            inputProps={{
              maxLength: 6,
              style: {
                letterSpacing: '0.4em',
                fontSize: '1.3rem',
                fontWeight: 700,
                textAlign: 'center',
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setOtpDialogOpen(false)} sx={{ color: '#8A9BB8' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleVerifyOTP}
            disabled={otpVerifying || otpCode.length < 6}
            startIcon={otpVerifying ? <CircularProgress size={14} sx={{ color: 'inherit' }} /> : <CheckCircleRoundedIcon />}
          >
            {otpVerifying ? 'Verifying…' : 'Verify'}
          </Button>
        </DialogActions>
      </Dialog>

      <AppSnackbar state={snackbar} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} />
    </StepLayout>
  );
};

export default PersonalInfoPage;
