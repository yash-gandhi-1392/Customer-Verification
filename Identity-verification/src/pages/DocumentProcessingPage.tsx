import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, alpha } from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { pollDocumentProcessing } from '../api/kycService';
import StepLayout from '../components/StepLayout';
import ProcessingLoader from '../components/ProcessingLoader';

type Status = 'processing' | 'success' | 'failed';

const DocumentProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>('processing');
  const [retrying, setRetrying] = useState(false);

  const runProcessing = async () => {
    setStatus('processing');
    try {
      const result = await pollDocumentProcessing();
      if (result.status === 'success') {
        setStatus('success');
        setTimeout(() => navigate('/liveness'), 1200);
      } else {
        setStatus('failed');
      }
    } catch {
      setStatus('failed');
    }
  };

  useEffect(() => {
    runProcessing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRetry = async () => {
    setRetrying(true);
    await runProcessing();
    setRetrying(false);
  };

  const STEPS = [
    'Scanning document edges',
    'Extracting information',
    'Validating security features',
    'Cross-checking data',
  ];

  return (
    <StepLayout currentStep={3} showStepper>
      {status === 'processing' && (
        <ProcessingLoader
          title="Verifying your document…"
          steps={STEPS}
          color="blue"
        />
      )}

      {status === 'success' && (
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
              animation: 'pop 0.4s ease',
              '@keyframes pop': {
                '0%': { transform: 'scale(0.6)', opacity: 0 },
                '80%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            }}
          >
            <Typography sx={{ fontSize: '2.5rem' }}>✅</Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 700,
              fontSize: '1.3rem',
              color: '#00E5CC',
              mb: 1,
            }}
          >
            Document Verified
          </Typography>
          <Typography variant="body2" sx={{ color: '#8A9BB8' }}>
            Redirecting to liveness check…
          </Typography>
        </Box>
      )}

      {status === 'failed' && (
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
            sx={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 700,
              fontSize: '1.3rem',
              color: '#FF4D6A',
              mb: 1,
            }}
          >
            Verification Failed
          </Typography>
          <Typography variant="body2" sx={{ color: '#8A9BB8', mb: 4, maxWidth: 320, mx: 'auto' }}>
            We couldn't verify your document. Please ensure the image is clear and try again.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/upload-document')}
              sx={{ borderColor: alpha('#5B8AF5', 0.3), color: '#8A9BB8' }}
            >
              Re-upload Document
            </Button>
            <Button
              variant="contained"
              onClick={handleRetry}
              disabled={retrying}
              startIcon={<RefreshRoundedIcon />}
              sx={{ fontWeight: 700 }}
            >
              {retrying ? 'Retrying…' : 'Try Again'}
            </Button>
          </Box>
        </Box>
      )}
    </StepLayout>
  );
};

export default DocumentProcessingPage;
