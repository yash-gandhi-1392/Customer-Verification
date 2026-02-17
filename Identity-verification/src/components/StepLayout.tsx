import React, { ReactNode } from 'react';
import { Box, Container, Paper, alpha } from '@mui/material';
import StepperHeader from './StepperHeader';

interface StepLayoutProps {
  currentStep: number;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
  showStepper?: boolean;
}

const StepLayout: React.FC<StepLayoutProps> = ({
  currentStep,
  children,
  maxWidth = 'sm',
  showStepper = true,
}) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'center' },
        py: { xs: 2, md: 4 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glows */}
      <Box
        sx={{
          position: 'fixed',
          top: '-20%',
          left: '-10%',
          width: '60vw',
          height: '60vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,204,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: '-20%',
          right: '-10%',
          width: '60vw',
          height: '60vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(91,138,245,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth={maxWidth} sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
        {showStepper && <StepperHeader currentStep={currentStep} />}

        <Paper
          elevation={0}
          sx={{
            backgroundColor: alpha('#0F2040', 0.95),
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha('#5B8AF5', 0.15)}`,
            borderRadius: { xs: 3, md: 4 },
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Top accent line */}
          <Box
            sx={{
              height: 3,
              background: 'linear-gradient(90deg, #00E5CC, #5B8AF5, #00E5CC)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s ease-in-out infinite',
              '@keyframes shimmer': {
                '0%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
                '100%': { backgroundPosition: '0% 50%' },
              },
            }}
          />

          <Box sx={{ p: { xs: 3, sm: 4, md: 5 } }}>{children}</Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StepLayout;
