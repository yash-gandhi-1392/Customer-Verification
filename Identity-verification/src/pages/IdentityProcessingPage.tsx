import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, alpha } from '@mui/material';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { pollIdentityProcessing } from '../api/kycService';
import { useKYC } from '../hooks/useKYCContext';
import StepLayout from '../components/StepLayout';
import ProcessingLoader from '../components/ProcessingLoader';

type Status = 'processing' | 'done' | 'error';

const IdentityProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setVerificationResult } = useKYC();
  const [status, setStatus] = useState<Status>('processing');

  const run = async () => {
    setStatus('processing');
    try {
      const result = await pollIdentityProcessing();
      setVerificationResult(result.result);
      setStatus('done');
      setTimeout(() => navigate('/result'), 800);
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const STEPS = [
    'Matching document to face',
    'Running fraud checks',
    'Verifying against registry',
    'Finalizing identity score',
  ];

  return (
    <StepLayout currentStep={5} showStepper>
      {status === 'processing' && (
        <ProcessingLoader
          title="Verifying your identity…"
          steps={STEPS}
          color="teal"
        />
      )}

      {status === 'done' && (
        <Box sx={{ textAlign: 'center', py: { xs: 4, md: 6 } }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: alpha('#00E5CC', 0.12),
              border: `2px solid ${alpha('#00E5CC', 0.4)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <Typography sx={{ fontSize: '2.5rem' }}>✅</Typography>
          </Box>
          <Typography
            sx={{ fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: '1.3rem', color: '#00E5CC', mb: 1 }}
          >
            Identity Confirmed
          </Typography>
          <Typography variant="body2" sx={{ color: '#8A9BB8' }}>
            Preparing your result…
          </Typography>
        </Box>
      )}

      {status === 'error' && (
        <Box sx={{ textAlign: 'center', py: { xs: 4, md: 6 } }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: alpha('#FF4D6A', 0.1),
              border: `2px solid ${alpha('#FF4D6A', 0.3)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <ErrorOutlineRoundedIcon sx={{ fontSize: 36, color: '#FF4D6A' }} />
          </Box>
          <Typography
            sx={{ fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: '1.3rem', color: '#FF4D6A', mb: 1 }}
          >
            Processing Error
          </Typography>
          <Typography variant="body2" sx={{ color: '#8A9BB8', mb: 4 }}>
            Something went wrong during identity verification. Please try again.
          </Typography>
          <Button
            variant="contained"
            onClick={run}
            startIcon={<RefreshRoundedIcon />}
            sx={{ fontWeight: 700 }}
          >
            Retry
          </Button>
        </Box>
      )}
    </StepLayout>
  );
};

export default IdentityProcessingPage;
