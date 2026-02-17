import React from 'react';
import { Snackbar, Alert, AlertColor, Slide, SlideProps } from '@mui/material';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

interface AppSnackbarProps {
  state: SnackbarState;
  onClose: () => void;
}

const AppSnackbar: React.FC<AppSnackbarProps> = ({ state, onClose }) => {
  return (
    <Snackbar
      open={state.open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={onClose}
        severity={state.severity}
        variant="filled"
        sx={{
          minWidth: 300,
          maxWidth: 480,
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          borderRadius: 3,
          fontSize: '0.9rem',
          fontWeight: 500,
        }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
