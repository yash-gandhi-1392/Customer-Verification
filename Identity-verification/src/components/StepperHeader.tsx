import React from 'react';
import {
  Box,
  LinearProgress,
  Typography,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export interface StepInfo {
  id: string;
  label: string;
  shortLabel: string;
}

export const STEPS: StepInfo[] = [
  { id: 'consent', label: 'Consent', shortLabel: 'Consent' },
  { id: 'personal-info', label: 'Personal Info', shortLabel: 'Info' },
  { id: 'select-id', label: 'Select ID', shortLabel: 'ID' },
  { id: 'upload', label: 'Upload', shortLabel: 'Upload' },
  { id: 'liveness', label: 'Liveness', shortLabel: 'Selfie' },
  { id: 'result', label: 'Complete', shortLabel: 'Done' },
];

interface StepperHeaderProps {
  currentStep: number; // 0-indexed, out of STEPS.length
  totalSteps?: number;
}

const StepperHeader: React.FC<StepperHeaderProps> = ({
  currentStep,
  totalSteps = STEPS.length,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  return (
    <Box sx={{ width: '100%', mb: { xs: 3, md: 5 } }}>
      {/* Top bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2.5,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #00E5CC 0%, #5B8AF5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 800,
                fontSize: '0.85rem',
                color: '#0A1628',
              }}
            >
              V
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: '"Syne", sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#F0F4FF',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            VerifyID
          </Typography>
        </Box>

        {/* Step counter */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography
            variant="caption"
            sx={{ color: '#8A9BB8', fontSize: '0.8rem' }}
          >
            Step{' '}
            <Box component="span" sx={{ color: '#00E5CC', fontWeight: 700 }}>
              {Math.min(currentStep + 1, totalSteps)}
            </Box>{' '}
            of {totalSteps}
          </Typography>
          <Box
            sx={{
              px: 1.5,
              py: 0.4,
              borderRadius: 6,
              backgroundColor: alpha('#00E5CC', 0.12),
              border: `1px solid ${alpha('#00E5CC', 0.2)}`,
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 700,
                fontSize: '0.7rem',
                color: '#00E5CC',
                letterSpacing: '0.05em',
              }}
            >
              {STEPS[Math.min(currentStep, totalSteps - 1)]?.shortLabel?.toUpperCase()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Progress bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ mb: 2.5, height: 5 }}
      />

      {/* Step dots (desktop only) */}
      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {STEPS.map((step, index) => {
            const isDone = index < currentStep;
            const isCurrent = index === currentStep;
            return (
              <Box
                key={step.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.5,
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isDone
                      ? '#00E5CC'
                      : isCurrent
                      ? alpha('#00E5CC', 0.15)
                      : alpha('#5B8AF5', 0.1),
                    border: `2px solid ${
                      isDone
                        ? '#00E5CC'
                        : isCurrent
                        ? '#00E5CC'
                        : alpha('#5B8AF5', 0.2)
                    }`,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isDone ? (
                    <CheckCircleRoundedIcon sx={{ fontSize: 16, color: '#0A1628' }} />
                  ) : (
                    <Typography
                      sx={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: isCurrent ? '#00E5CC' : '#8A9BB8',
                        fontFamily: '"Syne", sans-serif',
                      }}
                    >
                      {index + 1}
                    </Typography>
                  )}
                </Box>
                <Typography
                  sx={{
                    fontSize: '0.65rem',
                    color: isDone ? '#00E5CC' : isCurrent ? '#F0F4FF' : '#8A9BB8',
                    fontWeight: isCurrent ? 600 : 400,
                    transition: 'color 0.3s ease',
                    textAlign: 'center',
                  }}
                >
                  {step.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default StepperHeader;
