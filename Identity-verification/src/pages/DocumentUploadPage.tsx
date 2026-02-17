import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  alpha,
  CircularProgress,
  Alert,
} from '@mui/material';
import DocumentScannerRoundedIcon from '@mui/icons-material/DocumentScannerRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { uploadDocument } from '../api/kycService';
import { useKYC } from '../hooks/useKYCContext';
import StepLayout from '../components/StepLayout';
import FileUploadZone from '../components/FileUploadZone';
import AppSnackbar, { SnackbarState } from '../components/AppSnackbar';

const REQUIRES_BACK = ['drivers-license', 'pr-card', 'provincial-id', 'citizenship-card'];

const DOC_LABELS: Record<string, string> = {
  passport: 'Canadian Passport',
  'drivers-license': "Driver's License",
  'pr-card': 'Permanent Resident Card',
  'provincial-id': 'Provincial / Territorial ID',
  'citizenship-card': 'Citizenship Card',
};

const DocumentUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedDocumentType, setFrontFile, setBackFile, uploadedFiles } = useKYC();

  const [frontFile, setLocalFrontFile] = useState<File | null>(uploadedFiles.front);
  const [backFile, setLocalBackFile] = useState<File | null>(uploadedFiles.back);
  const [frontProgress, setFrontProgress] = useState<number>(0);
  const [backProgress, setBackProgress] = useState<number>(0);
  const [frontError, setFrontError] = useState<string>('');
  const [backError, setBackError] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false, message: '', severity: 'error' });

  const requiresBack = selectedDocumentType ? REQUIRES_BACK.includes(selectedDocumentType) : false;
  const docLabel = selectedDocumentType ? DOC_LABELS[selectedDocumentType] || 'Document' : 'Document';

  const canContinue = frontFile && (requiresBack ? !!backFile : true);

  const handleUpload = async () => {
    if (!frontFile) return;
    setUploading(true);
    setFrontError('');
    setBackError('');

    try {
      // Upload front
      setFrontProgress(0);
      await uploadDocument(frontFile, 'front', (p) => setFrontProgress(p));
      setFrontFile(frontFile);

      // Upload back (if required)
      if (requiresBack && backFile) {
        setBackProgress(0);
        await uploadDocument(backFile, 'back', (p) => setBackProgress(p));
        setBackFile(backFile);
      }

      setSnackbar({ open: true, message: 'Documents uploaded successfully!', severity: 'success' });
      setTimeout(() => navigate('/document-processing'), 800);
    } catch (err: any) {
      const msg = err.message || 'Upload failed. Please try again.';
      setSnackbar({ open: true, message: msg, severity: 'error' });
      setFrontProgress(0);
      setBackProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const handleFrontAccepted = (file: File) => {
    setLocalFrontFile(file);
    setFrontProgress(0);
    setFrontError('');
  };

  const handleBackAccepted = (file: File) => {
    setLocalBackFile(file);
    setBackProgress(0);
    setBackError('');
  };

  return (
    <StepLayout currentStep={3}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <DocumentScannerRoundedIcon sx={{ color: '#00E5CC', fontSize: 22 }} />
          <Typography variant="h4" sx={{ color: '#F0F4FF', fontSize: { xs: '1.3rem', md: '1.375rem' } }}>
            Upload Document
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#8A9BB8' }}>
          Upload a clear photo of your{' '}
          <Box component="span" sx={{ color: '#00E5CC', fontWeight: 600 }}>{docLabel}</Box>.
          {requiresBack ? ' Both front and back are required.' : ' Front side only required.'}
        </Typography>
      </Box>

      {/* Guidelines */}
      <Alert
        icon={<InfoOutlinedIcon sx={{ fontSize: 18, color: '#5B8AF5' }} />}
        sx={{
          mb: 3,
          backgroundColor: alpha('#5B8AF5', 0.08),
          border: `1px solid ${alpha('#5B8AF5', 0.2)}`,
          borderRadius: 2.5,
          color: '#8A9BB8',
          '& .MuiAlert-message': { fontSize: '0.8rem' },
        }}
      >
        Ensure the document is fully visible, well-lit, and all text is legible. Avoid glare, shadows, and cut-off edges.
      </Alert>

      {/* Upload zones */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
        <FileUploadZone
          label="Front Side"
          sublabel={!requiresBack ? ' (only side required)' : undefined}
          file={frontFile}
          onFileAccepted={handleFrontAccepted}
          onFileRemoved={() => {
            setLocalFrontFile(null);
            setFrontProgress(0);
            setFrontFile(null);
          }}
          progress={frontProgress}
          error={frontError}
          disabled={uploading}
        />

        {requiresBack && (
          <FileUploadZone
            label="Back Side"
            file={backFile}
            onFileAccepted={handleBackAccepted}
            onFileRemoved={() => {
              setLocalBackFile(null);
              setBackProgress(0);
              setBackFile(null);
            }}
            progress={backProgress}
            error={backError}
            disabled={uploading}
          />
        )}
      </Box>

      {/* Tips */}
      <Box
        sx={{
          p: 2.5,
          borderRadius: 2.5,
          backgroundColor: alpha('#1A3060', 0.4),
          border: `1px solid ${alpha('#5B8AF5', 0.1)}`,
          mb: 4,
        }}
      >
        <Typography variant="caption" sx={{ color: '#8A9BB8', fontWeight: 600, display: 'block', mb: 1 }}>
          📋 Photo Tips
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {[
            'Place ID on a flat, dark surface',
            'All 4 corners must be visible',
            'No glare or flash reflections',
            'Text must be sharp and readable',
          ].map((tip) => (
            <Box component="li" key={tip}>
              <Typography variant="caption" sx={{ color: '#8A9BB8', fontSize: '0.78rem' }}>
                {tip}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/select-id')}
          disabled={uploading}
          sx={{ borderColor: alpha('#5B8AF5', 0.3), color: '#8A9BB8' }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={!canContinue || uploading}
          onClick={handleUpload}
          endIcon={
            uploading ? (
              <CircularProgress size={16} sx={{ color: 'inherit' }} />
            ) : (
              <ArrowForwardRoundedIcon />
            )
          }
          sx={{ py: 1.75, fontWeight: 700 }}
        >
          {uploading ? 'Uploading…' : 'Upload & Continue'}
        </Button>
      </Box>

      <AppSnackbar state={snackbar} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} />
    </StepLayout>
  );
};

export default DocumentUploadPage;
