import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  alpha,
  CircularProgress,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { DocumentType, DocumentTypeOption } from '../types';
import { submitDocumentType } from '../api/kycService';
import { useKYC } from '../hooks/useKYCContext';
import StepLayout from '../components/StepLayout';
import AppSnackbar, { SnackbarState } from '../components/AppSnackbar';

const DOCUMENT_OPTIONS: DocumentTypeOption[] = [
  {
    id: 'passport',
    title: 'Canadian Passport',
    description: 'Valid Canadian passport — front page only required',
    requiresBack: false,
    emoji: '🛂',
  },
  {
    id: 'drivers-license',
    title: "Driver's License",
    description: 'Provincial or territorial driver\'s license — front and back required',
    requiresBack: true,
    emoji: '🪪',
  },
  {
    id: 'pr-card',
    title: 'Permanent Resident Card',
    description: 'IRCC issued PR card — front and back required',
    requiresBack: true,
    emoji: '🏠',
  },
  {
    id: 'provincial-id',
    title: 'Provincial / Territorial ID',
    description: 'Government-issued photo ID card — front and back required',
    requiresBack: true,
    emoji: '🆔',
  },
  {
    id: 'citizenship-card',
    title: 'Citizenship Card',
    description: 'Canadian citizenship card — front and back required',
    requiresBack: true,
    emoji: '🍁',
  },
];

const SelectIDPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedDocumentType } = useKYC();
  const [selected, setSelected] = useState<DocumentType | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false, message: '', severity: 'error' });

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await submitDocumentType(selected);
      setSelectedDocumentType(selected);
      navigate('/upload-document');
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message || 'Failed to save selection.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepLayout currentStep={2}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#F0F4FF', mb: 1, fontSize: { xs: '1.3rem', md: '1.375rem' } }}>
          Select Your Government ID
        </Typography>
        <Typography variant="body2" sx={{ color: '#8A9BB8' }}>
          Choose one of the accepted Canadian government-issued identification documents below.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {DOCUMENT_OPTIONS.map((option) => {
          const isSelected = selected === option.id;

          return (
            <Box
              key={option.id}
              onClick={() => setSelected(option.id)}
              role="button"
              aria-pressed={isSelected}
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && setSelected(option.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
                p: { xs: 2, sm: 2.5 },
                borderRadius: 3,
                cursor: 'pointer',
                border: `2px solid ${
                  isSelected ? '#00E5CC' : alpha('#5B8AF5', 0.18)
                }`,
                backgroundColor: isSelected
                  ? alpha('#00E5CC', 0.06)
                  : alpha('#1A3060', 0.35),
                transition: 'all 0.22s ease',
                position: 'relative',
                '&:hover': {
                  borderColor: isSelected ? '#00E5CC' : alpha('#5B8AF5', 0.5),
                  backgroundColor: isSelected
                    ? alpha('#00E5CC', 0.08)
                    : alpha('#1A3060', 0.55),
                  transform: 'translateY(-1px)',
                  boxShadow: `0 6px 24px ${alpha('#000', 0.3)}`,
                },
                '&:focus-visible': {
                  outline: `2px solid #00E5CC`,
                  outlineOffset: 2,
                },
              }}
            >
              {/* Emoji icon */}
              <Box
                sx={{
                  width: { xs: 44, sm: 52 },
                  height: { xs: 44, sm: 52 },
                  borderRadius: 2,
                  backgroundColor: isSelected
                    ? alpha('#00E5CC', 0.15)
                    : alpha('#5B8AF5', 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: '1.4rem', sm: '1.6rem' },
                  flexShrink: 0,
                  transition: 'all 0.22s ease',
                  border: `1px solid ${isSelected ? alpha('#00E5CC', 0.3) : 'transparent'}`,
                }}
              >
                {option.emoji}
              </Box>

              {/* Text */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: isSelected ? '#F0F4FF' : '#D0D8F0',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', sm: '0.95rem' },
                    mb: 0.3,
                  }}
                >
                  {option.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: isSelected ? alpha('#F0F4FF', 0.7) : '#8A9BB8',
                    fontSize: '0.75rem',
                    lineHeight: 1.4,
                  }}
                >
                  {option.description}
                </Typography>
                {option.requiresBack && (
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      mt: 0.75,
                      px: 1,
                      py: 0.2,
                      borderRadius: 1,
                      backgroundColor: alpha('#5B8AF5', 0.12),
                      border: `1px solid ${alpha('#5B8AF5', 0.2)}`,
                    }}
                  >
                    <Typography sx={{ fontSize: '0.62rem', color: '#5B8AF5', fontWeight: 600 }}>
                      FRONT + BACK
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Selection indicator */}
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  flexShrink: 0,
                  border: `2px solid ${isSelected ? '#00E5CC' : alpha('#5B8AF5', 0.3)}`,
                  backgroundColor: isSelected ? '#00E5CC' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.22s ease',
                }}
              >
                {isSelected && <CheckCircleRoundedIcon sx={{ fontSize: 16, color: '#0A1628' }} />}
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/personal-info')}
          sx={{ borderColor: alpha('#5B8AF5', 0.3), color: '#8A9BB8' }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={!selected || loading}
          onClick={handleContinue}
          endIcon={
            loading ? (
              <CircularProgress size={16} sx={{ color: 'inherit' }} />
            ) : (
              <ArrowForwardRoundedIcon />
            )
          }
          sx={{ py: 1.75, fontWeight: 700 }}
        >
          {loading ? 'Saving…' : 'Continue with Selected ID'}
        </Button>
      </Box>

      <AppSnackbar state={snackbar} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} />
    </StepLayout>
  );
};

export default SelectIDPage;
