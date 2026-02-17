import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  alpha,
  CircularProgress,
  Chip,
} from '@mui/material';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import CenterFocusWeakRoundedIcon from '@mui/icons-material/CenterFocusWeakRounded';
import { submitBiometricCapture } from '../api/kycService';
import StepLayout from '../components/StepLayout';
import AppSnackbar, { SnackbarState } from '../components/AppSnackbar';

type CaptureState = 'ready' | 'recording' | 'captured' | 'submitting' | 'success' | 'error';

const tips = [
  { icon: <WbSunnyRoundedIcon sx={{ fontSize: 16 }} />, text: 'Ensure good lighting' },
  { icon: <VisibilityOffRoundedIcon sx={{ fontSize: 16 }} />, text: 'Remove glasses' },
  { icon: <CenterFocusWeakRoundedIcon sx={{ fontSize: 16 }} />, text: 'Center your face in the oval' },
];

const LivenessPage: React.FC = () => {
  const navigate = useNavigate();
  const [captureState, setCaptureState] = useState<CaptureState>('ready');
  const [countdown, setCountdown] = useState(3);
  const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false, message: '', severity: 'error' });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startCapture = () => {
    setCaptureState('recording');
    setCountdown(3);

    let count = 3;
    timerRef.current = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(timerRef.current!);
        setCaptureState('captured');
      }
    }, 1000);
  };

  const handleSubmit = async () => {
    setCaptureState('submitting');
    try {
      // Simulate biometric blob (UI only)
      const mockBlob = new Blob(['[biometric-data]'], { type: 'application/octet-stream' });
      await submitBiometricCapture(mockBlob);
      setCaptureState('success');
      setTimeout(() => navigate('/identity-processing'), 1000);
    } catch (err: any) {
      setCaptureState('error');
      setSnackbar({ open: true, message: err.message || 'Liveness check failed.', severity: 'error' });
    }
  };

  const handleRetry = () => {
    setCaptureState('ready');
    setCountdown(3);
  };

  const isRecording = captureState === 'recording';
  const isCaptured = captureState === 'captured';
  const isSubmitting = captureState === 'submitting';
  const isSuccess = captureState === 'success';
  const isError = captureState === 'error';

  return (
    <StepLayout currentStep={4}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <FaceRoundedIcon sx={{ color: '#00E5CC', fontSize: 22 }} />
          <Typography variant="h4" sx={{ color: '#F0F4FF', fontSize: { xs: '1.3rem', md: '1.375rem' } }}>
            Liveness Check
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#8A9BB8' }}>
          We need to verify that you're physically present. Position your face in the oval below.
        </Typography>
      </Box>

      {/* Camera viewport simulation */}
      <Box sx={{ position: 'relative', mx: 'auto', maxWidth: 320, mb: 3 }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingBottom: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            border: `3px solid ${
              isSuccess
                ? '#00E5CC'
                : isError
                ? '#FF4D6A'
                : isRecording
                ? '#FFB547'
                : alpha('#5B8AF5', 0.5)
            }`,
            boxShadow: `0 0 0 6px ${alpha(
              isSuccess ? '#00E5CC' : isRecording ? '#FFB547' : '#5B8AF5',
              0.1
            )}`,
            transition: 'all 0.4s ease',
            animation: isRecording ? 'ring-pulse 1s ease-in-out infinite' : 'none',
            '@keyframes ring-pulse': {
              '0%, 100%': {
                boxShadow: `0 0 0 6px ${alpha('#FFB547', 0.1)}`,
              },
              '50%': {
                boxShadow: `0 0 0 14px ${alpha('#FFB547', 0.02)}`,
              },
            },
          }}
        >
          {/* Simulated camera background */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(ellipse at 50% 35%, ${alpha('#1A3060', 0.8)}, #0A1628)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {isSuccess ? (
              <>
                <CheckCircleRoundedIcon sx={{ fontSize: 56, color: '#00E5CC' }} />
                <Typography sx={{ fontFamily: '"Syne", sans-serif', fontWeight: 700, color: '#00E5CC', fontSize: '0.9rem' }}>
                  Verified
                </Typography>
              </>
            ) : isRecording ? (
              <>
                <Typography
                  sx={{
                    fontFamily: '"Syne", sans-serif',
                    fontWeight: 800,
                    fontSize: '3.5rem',
                    color: '#FFB547',
                    lineHeight: 1,
                  }}
                >
                  {countdown > 0 ? countdown : '📸'}
                </Typography>
                <Typography sx={{ color: '#FFB547', fontSize: '0.8rem', fontWeight: 600 }}>
                  Hold still…
                </Typography>
              </>
            ) : isCaptured ? (
              <>
                <Typography sx={{ fontSize: '2.5rem' }}>📸</Typography>
                <Typography sx={{ color: '#00E5CC', fontSize: '0.85rem', fontWeight: 600 }}>
                  Captured!
                </Typography>
              </>
            ) : (
              <>
                {/* Face guide outline */}
                <Box
                  sx={{
                    width: '55%',
                    height: '70%',
                    borderRadius: '50%',
                    border: `2px dashed ${alpha('#5B8AF5', 0.5)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FaceRoundedIcon sx={{ fontSize: 48, color: alpha('#5B8AF5', 0.3) }} />
                </Box>
              </>
            )}
          </Box>

          {/* Recording indicator */}
          {isRecording && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                py: 0.3,
                borderRadius: 1,
                backgroundColor: alpha('#FF4D6A', 0.9),
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  animation: 'blink 0.8s ease-in-out infinite',
                  '@keyframes blink': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0 } },
                }}
              />
              <Typography sx={{ fontSize: '0.62rem', color: '#fff', fontWeight: 700 }}>REC</Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Status chip */}
      {(captureState === 'ready' || isRecording) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Chip
            label={isRecording ? `Capturing in ${countdown}s…` : 'Position your face'}
            size="small"
            sx={{
              backgroundColor: alpha(isRecording ? '#FFB547' : '#5B8AF5', 0.12),
              color: isRecording ? '#FFB547' : '#5B8AF5',
              border: `1px solid ${alpha(isRecording ? '#FFB547' : '#5B8AF5', 0.25)}`,
              fontWeight: 600,
            }}
          />
        </Box>
      )}

      {/* Tips */}
      {captureState === 'ready' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1.5,
            mb: 4,
          }}
        >
          {tips.map((tip) => (
            <Box
              key={tip.text}
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1.5,
                borderRadius: 2,
                backgroundColor: alpha('#1A3060', 0.4),
                border: `1px solid ${alpha('#5B8AF5', 0.1)}`,
              }}
            >
              <Box sx={{ color: '#5B8AF5', flexShrink: 0 }}>{tip.icon}</Box>
              <Typography variant="caption" sx={{ color: '#8A9BB8', fontSize: '0.75rem' }}>
                {tip.text}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        {captureState === 'ready' && (
          <>
            <Button
              variant="outlined"
              onClick={() => navigate('/upload-document')}
              sx={{ borderColor: alpha('#5B8AF5', 0.3), color: '#8A9BB8' }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={startCapture}
              startIcon={<CameraAltRoundedIcon />}
              sx={{ py: 1.75, fontWeight: 700 }}
            >
              Start Capture
            </Button>
          </>
        )}

        {isCaptured && (
          <>
            <Button
              variant="outlined"
              onClick={handleRetry}
              startIcon={<RefreshRoundedIcon />}
              sx={{ borderColor: alpha('#5B8AF5', 0.3), color: '#8A9BB8' }}
            >
              Retake
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSubmit}
              startIcon={<CheckCircleRoundedIcon />}
              sx={{ py: 1.75, fontWeight: 700 }}
            >
              Use This Photo
            </Button>
          </>
        )}

        {isSubmitting && (
          <Box sx={{ textAlign: 'center', width: '100%', py: 2 }}>
            <CircularProgress sx={{ color: '#00E5CC' }} size={32} />
            <Typography variant="body2" sx={{ color: '#8A9BB8', mt: 2 }}>
              Analyzing liveness…
            </Typography>
          </Box>
        )}

        {isError && (
          <>
            <Button
              variant="outlined"
              onClick={handleRetry}
              startIcon={<RefreshRoundedIcon />}
              sx={{ borderColor: alpha('#FF4D6A', 0.4), color: '#FF4D6A' }}
            >
              Try Again
            </Button>
          </>
        )}
      </Box>

      <AppSnackbar state={snackbar} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} />
    </StepLayout>
  );
};

export default LivenessPage;
