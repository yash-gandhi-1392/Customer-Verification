import React, { useEffect, useState } from 'react';
import { Box, Typography, alpha } from '@mui/material';

interface ProcessingLoaderProps {
  title: string;
  steps?: string[];
  color?: 'teal' | 'blue';
}

const ProcessingLoader: React.FC<ProcessingLoaderProps> = ({
  title,
  steps = [],
  color = 'teal',
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const mainColor = color === 'teal' ? '#00E5CC' : '#5B8AF5';
  const secondaryColor = color === 'teal' ? '#5B8AF5' : '#00E5CC';

  useEffect(() => {
    if (steps.length === 0) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: { xs: 4, md: 6 },
        gap: 4,
      }}
    >
      {/* Animated orb */}
      <Box sx={{ position: 'relative', width: 100, height: 100 }}>
        {/* Outer ring */}
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `2px solid ${alpha(mainColor, 0.3 - i * 0.08)}`,
              animation: `pulse-ring ${1.5 + i * 0.4}s ease-out infinite`,
              animationDelay: `${i * 0.3}s`,
              '@keyframes pulse-ring': {
                '0%': { transform: 'scale(1)', opacity: 0.8 },
                '100%': { transform: `scale(${1.3 + i * 0.15})`, opacity: 0 },
              },
            }}
          />
        ))}

        {/* Core */}
        <Box
          sx={{
            position: 'absolute',
            inset: 16,
            borderRadius: '50%',
            background: `conic-gradient(from 0deg, ${mainColor}, ${secondaryColor}, ${mainColor})`,
            animation: 'spin 2s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        />

        {/* Inner mask */}
        <Box
          sx={{
            position: 'absolute',
            inset: 20,
            borderRadius: '50%',
            backgroundColor: '#0F2040',
          }}
        />
      </Box>

      {/* Title */}
      <Typography
        sx={{
          fontFamily: '"Syne", sans-serif',
          fontWeight: 700,
          fontSize: { xs: '1.2rem', md: '1.4rem' },
          color: '#F0F4FF',
          textAlign: 'center',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </Typography>

      {/* Steps checklist */}
      {steps.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            width: '100%',
            maxWidth: 320,
          }}
        >
          {steps.map((step, i) => {
            const done = i < activeStep;
            const active = i === activeStep;
            return (
              <Box
                key={step}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  px: 2.5,
                  py: 1.5,
                  borderRadius: 2.5,
                  backgroundColor: done
                    ? alpha('#00E5CC', 0.08)
                    : active
                    ? alpha('#5B8AF5', 0.08)
                    : 'transparent',
                  border: `1px solid ${
                    done
                      ? alpha('#00E5CC', 0.2)
                      : active
                      ? alpha('#5B8AF5', 0.2)
                      : 'transparent'
                  }`,
                  transition: 'all 0.4s ease',
                  opacity: i > activeStep ? 0.35 : 1,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    flexShrink: 0,
                    backgroundColor: done ? '#00E5CC' : active ? '#5B8AF5' : '#8A9BB8',
                    animation: active ? 'blink 1s ease-in-out infinite' : 'none',
                    transition: 'background-color 0.4s ease',
                    '@keyframes blink': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.2 },
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: done ? '#00E5CC' : active ? '#F0F4FF' : '#8A9BB8',
                    fontWeight: active ? 600 : 400,
                    fontSize: '0.875rem',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {step}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}

      <Typography
        variant="caption"
        sx={{ color: '#8A9BB8', textAlign: 'center', mt: -1 }}
      >
        Please do not close this window
      </Typography>
    </Box>
  );
};

export default ProcessingLoader;
