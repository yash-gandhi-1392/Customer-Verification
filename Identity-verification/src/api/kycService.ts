// ============================================
// API SERVICE — Axios placeholders
// ============================================
import axios, { AxiosInstance } from 'axios';
import { PersonalInfoFormValues, DocumentType, VerificationResult } from '../types';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://api.verifyid.ca/v1';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Version': '1.0.0',
  },
});

// Request interceptor — attach auth token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('kyc_session_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — generic error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

// ── Session ───────────────────────────────────────────
export interface StartSessionResponse {
  sessionId: string;
  expiresAt: string;
  token: string;
}

export const startSession = async (): Promise<StartSessionResponse> => {
  // PLACEHOLDER — POST /identity/session/start
  await delay(1200);
  const mock: StartSessionResponse = {
    sessionId: `sess_${Math.random().toString(36).substr(2, 12)}`,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    token: `tok_${Math.random().toString(36).substr(2, 24)}`,
  };
  sessionStorage.setItem('kyc_session_token', mock.token);
  return mock;
};

// ── Personal Info ─────────────────────────────────────
export interface SubmitPersonalInfoResponse {
  success: boolean;
  profileId: string;
}

export const submitPersonalInfo = async (
  data: PersonalInfoFormValues
): Promise<SubmitPersonalInfoResponse> => {
  // PLACEHOLDER — POST /identity/personal-info
  await delay(1500);
  console.info('[API] POST /identity/personal-info', data);
  return { success: true, profileId: `prof_${Math.random().toString(36).substr(2, 10)}` };
};

export const sendPhoneOTP = async (phone: string): Promise<{ success: boolean }> => {
  // PLACEHOLDER — POST /identity/phone/otp/send
  await delay(800);
  console.info('[API] POST /identity/phone/otp/send', { phone });
  return { success: true };
};

export const verifyPhoneOTP = async (
  phone: string,
  code: string
): Promise<{ success: boolean }> => {
  // PLACEHOLDER — POST /identity/phone/otp/verify
  await delay(800);
  console.info('[API] POST /identity/phone/otp/verify', { phone, code });
  return { success: true };
};

// ── Document Type ─────────────────────────────────────
export interface SubmitDocumentTypeResponse {
  success: boolean;
  documentId: string;
}

export const submitDocumentType = async (
  docType: DocumentType
): Promise<SubmitDocumentTypeResponse> => {
  // PLACEHOLDER — POST /identity/document/type
  await delay(600);
  console.info('[API] POST /identity/document/type', { docType });
  return { success: true, documentId: `doc_${Math.random().toString(36).substr(2, 10)}` };
};

// ── Document Upload ───────────────────────────────────
export interface UploadDocumentResponse {
  success: boolean;
  fileId: string;
  side: 'front' | 'back';
}

export const uploadDocument = async (
  file: File,
  side: 'front' | 'back',
  onProgress?: (progress: number) => void
): Promise<UploadDocumentResponse> => {
  // PLACEHOLDER — POST /identity/document/upload (multipart/form-data)
  const formData = new FormData();
  formData.append('file', file);
  formData.append('side', side);

  // Simulate upload progress
  await simulateProgress(onProgress);

  console.info(`[API] POST /identity/document/upload (${side})`, { fileName: file.name });
  return {
    success: true,
    fileId: `file_${Math.random().toString(36).substr(2, 10)}`,
    side,
  };
};

// ── Document Processing ───────────────────────────────
export interface DocumentProcessingResponse {
  status: 'success' | 'failed';
  confidence: number;
  reason?: string;
}

export const pollDocumentProcessing = async (): Promise<DocumentProcessingResponse> => {
  // PLACEHOLDER — GET /identity/document/status
  await delay(3500);
  return { status: 'success', confidence: 0.97 };
};

// ── Biometric / Liveness ──────────────────────────────
export interface BiometricVerifyResponse {
  success: boolean;
  livenessScore: number;
  matchScore: number;
}

export const submitBiometricCapture = async (
  blob: Blob
): Promise<BiometricVerifyResponse> => {
  // PLACEHOLDER — POST /identity/biometric/verify
  await delay(2000);
  console.info('[API] POST /identity/biometric/verify', { size: blob.size });
  return { success: true, livenessScore: 0.98, matchScore: 0.95 };
};

// ── Identity Processing ───────────────────────────────
export interface IdentityProcessingResponse {
  result: VerificationResult;
  referenceId: string;
  message?: string;
}

export const pollIdentityProcessing = async (): Promise<IdentityProcessingResponse> => {
  // PLACEHOLDER — GET /identity/status
  await delay(4000);
  return {
    result: 'verified',
    referenceId: `REF-${Date.now()}`,
    message: 'Identity successfully verified.',
  };
};

// ── Helpers ───────────────────────────────────────────
const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const simulateProgress = async (onProgress?: (progress: number) => void) => {
  if (!onProgress) {
    await delay(2000);
    return;
  }
  const steps = [10, 25, 40, 60, 75, 88, 95, 100];
  for (const step of steps) {
    await delay(220);
    onProgress(step);
  }
};

export default apiClient;
