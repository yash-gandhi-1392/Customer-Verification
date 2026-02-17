import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  LinearProgress,
  IconButton,
  alpha,
  Chip,
} from '@mui/material';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

const ACCEPTED_TYPES: Record<string, string[]> = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'application/pdf': ['.pdf'],
};
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

interface FileUploadZoneProps {
  label: string;
  sublabel?: string;
  file: File | null;
  onFileAccepted: (file: File) => void;
  onFileRemoved: () => void;
  progress?: number;
  error?: string;
  disabled?: boolean;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  label,
  sublabel,
  file,
  onFileAccepted,
  onFileRemoved,
  progress,
  error,
  disabled = false,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [rejectionError, setRejectionError] = useState<string | null>(null);

  const onDrop = useCallback(
    (accepted: File[], rejected: any[]) => {
      setRejectionError(null);

      if (rejected.length > 0) {
        const code = rejected[0]?.errors[0]?.code;
        if (code === 'file-too-large') {
          setRejectionError('File is too large. Maximum size is 5MB.');
        } else if (code === 'file-invalid-type') {
          setRejectionError('Invalid file type. Please upload JPG, PNG, or PDF.');
        } else {
          setRejectionError('File could not be accepted. Please try again.');
        }
        return;
      }

      if (accepted.length > 0) {
        const f = accepted[0];
        onFileAccepted(f);
        if (f.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => setPreview(e.target?.result as string);
          reader.readAsDataURL(f);
        } else {
          setPreview(null);
        }
      }
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE,
    multiple: false,
    disabled: disabled || !!file,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setRejectionError(null);
    onFileRemoved();
  };

  const displayError = error || rejectionError;
  const isUploading = progress !== undefined && progress > 0 && progress < 100;
  const isComplete = progress === 100;

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Box>
      <Typography
        variant="body2"
        sx={{ color: '#8A9BB8', mb: 1, fontWeight: 500, fontSize: '0.85rem' }}
      >
        {label}
        {sublabel && (
          <Box component="span" sx={{ color: '#5B8AF5', ml: 0.5 }}>
            {sublabel}
          </Box>
        )}
      </Typography>

      {file ? (
        // File preview state
        <Box
          sx={{
            border: `2px solid ${isComplete ? '#00E5CC' : displayError ? '#FF4D6A' : alpha('#5B8AF5', 0.3)}`,
            borderRadius: 3,
            p: 2,
            backgroundColor: alpha(isComplete ? '#00E5CC' : displayError ? '#FF4D6A' : '#1A3060', 0.08),
            transition: 'all 0.3s ease',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Preview or icon */}
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                overflow: 'hidden',
                flexShrink: 0,
                backgroundColor: alpha('#1A3060', 0.8),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <InsertDriveFileRoundedIcon sx={{ color: '#5B8AF5', fontSize: 28 }} />
              )}
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#F0F4FF',
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: '0.85rem',
                }}
              >
                {file.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: '#8A9BB8', display: 'block', mt: 0.3 }}
              >
                {formatBytes(file.size)}
              </Typography>

              {isUploading && (
                <Box sx={{ mt: 1 }}>
                  <LinearProgress variant="determinate" value={progress} sx={{ height: 4 }} />
                  <Typography variant="caption" sx={{ color: '#00E5CC', mt: 0.5, display: 'block' }}>
                    Uploading… {progress}%
                  </Typography>
                </Box>
              )}

              {isComplete && (
                <Chip
                  icon={<CheckCircleRoundedIcon sx={{ fontSize: 14 }} />}
                  label="Uploaded"
                  size="small"
                  sx={{
                    mt: 0.5,
                    height: 20,
                    fontSize: '0.7rem',
                    backgroundColor: alpha('#00E5CC', 0.15),
                    color: '#00E5CC',
                    '& .MuiChip-icon': { color: '#00E5CC' },
                  }}
                />
              )}
            </Box>

            {!isUploading && (
              <IconButton
                onClick={handleRemove}
                size="small"
                sx={{
                  color: '#FF4D6A',
                  '&:hover': { backgroundColor: alpha('#FF4D6A', 0.12) },
                }}
              >
                <DeleteRoundedIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
      ) : (
        // Dropzone
        <Box
          {...getRootProps()}
          sx={{
            border: `2px dashed ${
              displayError
                ? '#FF4D6A'
                : isDragActive
                ? '#00E5CC'
                : alpha('#5B8AF5', 0.3)
            }`,
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
            textAlign: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.25s ease',
            backgroundColor: isDragActive
              ? alpha('#00E5CC', 0.05)
              : alpha('#1A3060', 0.3),
            '&:hover': !disabled
              ? {
                  borderColor: '#5B8AF5',
                  backgroundColor: alpha('#5B8AF5', 0.05),
                }
              : {},
          }}
        >
          <input {...getInputProps()} />
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: alpha(isDragActive ? '#00E5CC' : '#5B8AF5', 0.15),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              transition: 'all 0.25s ease',
            }}
          >
            <CloudUploadRoundedIcon
              sx={{
                fontSize: 26,
                color: isDragActive ? '#00E5CC' : '#5B8AF5',
                transition: 'color 0.25s ease',
              }}
            />
          </Box>

          <Typography
            variant="body2"
            sx={{ color: isDragActive ? '#00E5CC' : '#F0F4FF', fontWeight: 600, mb: 0.5 }}
          >
            {isDragActive ? 'Drop file here' : 'Drag & drop or click to upload'}
          </Typography>
          <Typography variant="caption" sx={{ color: '#8A9BB8' }}>
            JPG, PNG, or PDF — max 5MB
          </Typography>
        </Box>
      )}

      {displayError && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.75 }}>
          <ErrorRoundedIcon sx={{ fontSize: 14, color: '#FF4D6A' }} />
          <Typography variant="caption" sx={{ color: '#FF4D6A' }}>
            {displayError}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FileUploadZone;
