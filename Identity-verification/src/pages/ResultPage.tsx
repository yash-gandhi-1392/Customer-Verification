import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  alpha,
  Divider,
  Chip,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useKYC } from '../hooks/useKYCContext';
import StepLayout from '../components/StepLayout';
import { VerificationResult } from '../types';

interface ResultConfig {
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  heading: string;
  subheading: string;
  badge: string;
  badgeColor: string;
  description: string;
}

const RESULT_CONFIG: Record<VerificationResult, ResultConfig> = {
  verified: {
    icon: <CheckCircleRoundedIcon sx={{ fontSize: 48, color: '#00E5CC' }} />,
    color: '#00E5CC',
    bgColor: alpha('#00E5CC', 0.08),
    borderColor: alpha('#00E5CC', 0.3),
    heading: 'Identity Verified',
    subheading: 'You have been successfully verified.',
    badge: 'VERIFIED',
    badgeColor: '#00E5CC',
    description:
      'Your identity has been confirmed. You can now access all services that require identity verification.',
  },
  'step-up': {
    icon: <SecurityRoundedIcon sx={{ fontSize: 48, color: '#FFB547' }} />,
    color: '#FFB547',
    bgColor: alpha('#FFB547', 0.08),
    borderColor: alpha('#FFB547', 0.3),
    heading: 'Additional Verification Required',
    subheading: 'A higher level of verification is needed.',
    badge: 'STEP-UP REQUIRED',
    badgeColor: '#FFB547',
    description:
      'Your account requires an additional verification step. Please complete the enhanced verification process to continue.',
  },
  'under-review': {
    icon: <HourglassTopRoundedIcon sx={{ fontSize: 48, color: '#5B8AF5' }} />,
    color: '#5B8AF5',
    bgColor: alpha('#5B8AF5', 0.08),
    borderColor: alpha('#5B8AF5', 0.3),
    heading: 'Under Review',
    subheading: 'Your verification is being reviewed.',
    badge: 'UNDER REVIEW',
    badgeColor: '#5B8AF5',
    description:
      'Our team is reviewing your submission. This typically takes 1–2 business days. You will receive an email once the review is complete.',
  },
  failed: {
    icon: <HighlightOffRoundedIcon sx={{ fontSize: 48, color: '#FF4D6A' }} />,
    color: '#FF4D6A',
    bgColor: alpha('#FF4D6A', 0.08),
    borderColor: alpha('#FF4D6A', 0.3),
    heading: 'Verification Failed',
    subheading: 'We were unable to verify your identity.',
    badge: 'FAILED',
    badgeColor: '#FF4D6A',
    description:
      'We could not verify your identity with the provided information. Please review your documents and try again, or contact support for assistance.',
  },
};

const ResultDetails: React.FC<{ result: VerificationResult; refId?: string }> = ({
  result,
  refId,
}) => {
  const navigate = useNavigate();
  const { resetState } = useKYC();
  const config = RESULT_CONFIG[result];

  const handleRestart = () => {
    resetState();
    navigate('/');
  };

  return (
    <Box>
      {/* Result card */}
      <Box
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          backgroundColor: config.bgColor,
          border: `2px solid ${config.borderColor}`,
          textAlign: 'center',
          mb: 4,
          animation: 'fadeUp 0.5s ease',
          '@keyframes fadeUp': {
            '0%': { opacity: 0, transform: 'translateY(16px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Box
          sx={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            backgroundColor: alpha(config.color, 0.12),
            border: `2px solid ${alpha(config.color, 0.3)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2.5,
            animation: 'pop 0.5s ease 0.2s both',
            '@keyframes pop': {
              '0%': { transform: 'scale(0.7)', opacity: 0 },
              '80%': { transform: 'scale(1.08)' },
              '100%': { transform: 'scale(1)', opacity: 1 },
            },
          }}
        >
          {config.icon}
        </Box>

        <Chip
          label={config.badge}
          size="small"
          sx={{
            mb: 2,
            fontFamily: '"Syne", sans-serif',
            fontWeight: 700,
            fontSize: '0.68rem',
            letterSpacing: '0.08em',
            backgroundColor: alpha(config.color, 0.15),
            color: config.color,
            border: `1px solid ${alpha(config.color, 0.3)}`,
          }}
        />

        <Typography
          sx={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 700,
            fontSize: { xs: '1.4rem', sm: '1.6rem' },
            color: '#F0F4FF',
            mb: 0.75,
          }}
        >
          {config.heading}
        </Typography>
        <Typography variant="body2" sx={{ color: config.color, fontWeight: 500, mb: 2 }}>
          {config.subheading}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#8A9BB8', maxWidth: 380, mx: 'auto', lineHeight: 1.65 }}
        >
          {config.description}
        </Typography>
      </Box>

      {/* Reference ID */}
      {refId && (
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: alpha('#1A3060', 0.5),
            border: `1px solid ${alpha('#5B8AF5', 0.1)}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Typography variant="caption" sx={{ color: '#8A9BB8' }}>
            Reference ID
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#F0F4FF',
              fontWeight: 600,
              fontFamily: 'monospace',
              fontSize: '0.8rem',
            }}
          >
            {refId}
          </Typography>
        </Box>
      )}

      <Divider sx={{ mb: 3, borderColor: alpha('#5B8AF5', 0.1) }} />

      {/* CTAs */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {result === 'verified' && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            endIcon={<ArrowForwardRoundedIcon />}
            onClick={() => alert('Redirecting to your application…')}
            sx={{ py: 1.75, fontWeight: 700 }}
          >
            Continue to Dashboard
          </Button>
        )}

        {result === 'step-up' && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            endIcon={<SecurityRoundedIcon />}
            onClick={handleRestart}
            sx={{ py: 1.75, fontWeight: 700 }}
          >
            Complete Enhanced Verification
          </Button>
        )}

        {result === 'under-review' && (
          <Box
            sx={{
              p: 2.5,
              borderRadius: 2.5,
              backgroundColor: alpha('#5B8AF5', 0.08),
              border: `1px solid ${alpha('#5B8AF5', 0.2)}`,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" sx={{ color: '#8A9BB8' }}>
              📧 A confirmation email has been sent. You'll be notified within{' '}
              <Box component="span" sx={{ color: '#5B8AF5', fontWeight: 600 }}>
                1–2 business days
              </Box>
              .
            </Typography>
          </Box>
        )}

        {result === 'failed' && (
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button
              variant="outlined"
              onClick={handleRestart}
              startIcon={<RefreshRoundedIcon />}
              sx={{
                flex: 1,
                borderColor: alpha('#FF4D6A', 0.3),
                color: '#FF4D6A',
                py: 1.5,
              }}
            >
              Try Again
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => alert('Opening support…')}
              startIcon={<SupportAgentRoundedIcon />}
              sx={{ flex: 1, py: 1.5, fontWeight: 700 }}
            >
              Contact Support
            </Button>
          </Box>
        )}

        {result !== 'verified' && (
          <Button
            variant="text"
            size="small"
            onClick={handleRestart}
            sx={{ color: '#8A9BB8', fontSize: '0.82rem' }}
          >
            Start over
          </Button>
        )}
      </Box>
    </Box>
  );
};

const ResultPage: React.FC = () => {
  const { verificationResult } = useKYC();

  // Demo: allow switching result state for preview purposes
  const [demoResult, setDemoResult] = React.useState<VerificationResult | null>(null);
  const displayResult = demoResult || verificationResult || 'verified';

  return (
    <StepLayout currentStep={5}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ color: '#F0F4FF', mb: 1, fontSize: { xs: '1.3rem', md: '1.375rem' } }}
        >
          Verification Complete
        </Typography>
        <Typography variant="body2" sx={{ color: '#8A9BB8' }}>
          Here is the result of your identity verification.
        </Typography>
      </Box>

      <ResultDetails result={displayResult} refId={`REF-${Date.now().toString(36).toUpperCase()}`} />

      {/* Demo switcher for preview */}
      <Box
        sx={{
          mt: 4,
          pt: 3,
          borderTop: `1px dashed ${alpha('#5B8AF5', 0.2)}`,
        }}
      >
        <Typography variant="caption" sx={{ color: alpha('#8A9BB8', 0.6), display: 'block', mb: 1.5, textAlign: 'center' }}>
          Preview different result states:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          {(['verified', 'step-up', 'under-review', 'failed'] as VerificationResult[]).map((r) => (
            <Chip
              key={r}
              label={r}
              size="small"
              onClick={() => setDemoResult(r)}
              sx={{
                cursor: 'pointer',
                fontSize: '0.7rem',
                fontWeight: 600,
                backgroundColor: demoResult === r ? alpha('#5B8AF5', 0.2) : alpha('#1A3060', 0.5),
                color: demoResult === r ? '#5B8AF5' : '#8A9BB8',
                border: `1px solid ${demoResult === r ? alpha('#5B8AF5', 0.4) : alpha('#5B8AF5', 0.1)}`,
                textTransform: 'capitalize',
              }}
            />
          ))}
        </Box>
      </Box>
    </StepLayout>
  );
};

export default ResultPage;
