import { createTheme, alpha } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    navy: Palette['primary'];
    teal: Palette['primary'];
  }
  interface PaletteOptions {
    navy?: PaletteOptions['primary'];
    teal?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00E5CC',
      light: '#4DFFF0',
      dark: '#00B3A0',
      contrastText: '#0A1628',
    },
    secondary: {
      main: '#5B8AF5',
      light: '#8AACFF',
      dark: '#3A65D4',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0A1628',
      paper: '#0F2040',
    },
    text: {
      primary: '#F0F4FF',
      secondary: '#8A9BB8',
    },
    error: {
      main: '#FF4D6A',
      light: '#FF7A91',
      dark: '#CC2945',
    },
    warning: {
      main: '#FFB547',
      light: '#FFD080',
      dark: '#E09020',
    },
    success: {
      main: '#00E5CC',
      light: '#4DFFF0',
      dark: '#00B3A0',
    },
    divider: alpha('#5B8AF5', 0.12),
    navy: {
      main: '#0A1628',
      light: '#0F2040',
      dark: '#060E1A',
      contrastText: '#F0F4FF',
    },
    teal: {
      main: '#00E5CC',
      light: '#4DFFF0',
      dark: '#00B3A0',
      contrastText: '#0A1628',
    },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: {
      fontFamily: '"Syne", sans-serif',
      fontWeight: 800,
      fontSize: '3rem',
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
    },
    h2: {
      fontFamily: '"Syne", sans-serif',
      fontWeight: 700,
      fontSize: '2.25rem',
      letterSpacing: '-0.025em',
      lineHeight: 1.15,
    },
    h3: {
      fontFamily: '"Syne", sans-serif',
      fontWeight: 700,
      fontSize: '1.75rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: '"Syne", sans-serif',
      fontWeight: 600,
      fontSize: '1.375rem',
      letterSpacing: '-0.015em',
    },
    h5: {
      fontFamily: '"Syne", sans-serif',
      fontWeight: 600,
      fontSize: '1.125rem',
      letterSpacing: '-0.01em',
    },
    h6: {
      fontFamily: '"Syne", sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.55,
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    button: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.01em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 14,
  },
  shadows: [
    'none',
    '0 2px 8px rgba(0,0,0,0.3)',
    '0 4px 16px rgba(0,0,0,0.35)',
    '0 8px 24px rgba(0,0,0,0.4)',
    '0 12px 32px rgba(0,0,0,0.45)',
    '0 16px 40px rgba(0,0,0,0.5)',
    '0 20px 48px rgba(0,0,0,0.55)',
    '0 24px 56px rgba(0,0,0,0.6)',
    '0 28px 64px rgba(0,0,0,0.6)',
    '0 32px 72px rgba(0,0,0,0.65)',
    '0 36px 80px rgba(0,0,0,0.65)',
    '0 40px 88px rgba(0,0,0,0.7)',
    '0 44px 96px rgba(0,0,0,0.7)',
    '0 48px 104px rgba(0,0,0,0.7)',
    '0 52px 112px rgba(0,0,0,0.75)',
    '0 56px 120px rgba(0,0,0,0.75)',
    '0 60px 128px rgba(0,0,0,0.75)',
    '0 64px 136px rgba(0,0,0,0.8)',
    '0 68px 144px rgba(0,0,0,0.8)',
    '0 72px 152px rgba(0,0,0,0.8)',
    '0 76px 160px rgba(0,0,0,0.8)',
    '0 80px 168px rgba(0,0,0,0.85)',
    '0 84px 176px rgba(0,0,0,0.85)',
    '0 88px 184px rgba(0,0,0,0.85)',
    '0 92px 192px rgba(0,0,0,0.85)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0A1628',
          backgroundImage: `
            radial-gradient(ellipse at 20% 0%, rgba(0, 229, 204, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(91, 138, 245, 0.08) 0%, transparent 50%)
          `,
          minHeight: '100vh',
          scrollbarWidth: 'thin',
          scrollbarColor: '#1A3060 #0A1628',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 28px',
          fontSize: '0.95rem',
          fontWeight: 600,
          transition: 'all 0.2s ease',
        },
        contained: {
          boxShadow: '0 4px 20px rgba(0, 229, 204, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 28px rgba(0, 229, 204, 0.45)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&.Mui-disabled': {
            backgroundColor: alpha('#00E5CC', 0.15),
            color: alpha('#F0F4FF', 0.3),
          },
        },
        outlined: {
          borderColor: alpha('#5B8AF5', 0.3),
          '&:hover': {
            borderColor: '#5B8AF5',
            backgroundColor: alpha('#5B8AF5', 0.08),
          },
        },
        text: {
          '&:hover': {
            backgroundColor: alpha('#00E5CC', 0.08),
          },
        },
        sizeLarge: {
          padding: '14px 36px',
          fontSize: '1rem',
          borderRadius: 14,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: alpha('#1A3060', 0.5),
            transition: 'all 0.2s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha('#5B8AF5', 0.5),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00E5CC',
              borderWidth: 2,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha('#5B8AF5', 0.2),
            },
          },
          '& .MuiInputLabel-root': {
            color: '#8A9BB8',
            '&.Mui-focused': {
              color: '#00E5CC',
            },
          },
          '& .MuiInputBase-input': {
            color: '#F0F4FF',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#0F2040',
          backgroundImage: 'none',
          border: `1px solid ${alpha('#5B8AF5', 0.12)}`,
          borderRadius: 18,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          transition: 'all 0.25s ease',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: alpha('#5B8AF5', 0.5),
          '&.Mui-checked': {
            color: '#00E5CC',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: alpha('#5B8AF5', 0.15),
          height: 6,
        },
        bar: {
          borderRadius: 4,
          background: 'linear-gradient(90deg, #00E5CC, #5B8AF5)',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        colorPrimary: {
          color: '#00E5CC',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiAlert-root': {
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: alpha('#1A3060', 0.5),
        },
      },
    },
  },
});

export default theme;
