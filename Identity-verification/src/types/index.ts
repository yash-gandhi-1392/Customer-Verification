// ============================================
// TYPES — KYC Verification App
// ============================================

export type StepId =
  | 'consent'
  | 'personal-info'
  | 'select-id'
  | 'upload-document'
  | 'document-processing'
  | 'liveness'
  | 'identity-processing'
  | 'result';

export type DocumentType =
  | 'passport'
  | 'drivers-license'
  | 'pr-card'
  | 'provincial-id'
  | 'citizenship-card';

export type VerificationResult =
  | 'verified'
  | 'step-up'
  | 'under-review'
  | 'failed';

export interface ConsentFormValues {
  privacyPolicy: boolean;
  termsOfService: boolean;
  biometricConsent: boolean;
}

export interface PersonalInfoFormValues {
  fullLegalName: string;
  dateOfBirth: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
}

export interface DocumentUploadFiles {
  front: File | null;
  back: File | null;
}

export interface KYCState {
  sessionId: string | null;
  selectedDocumentType: DocumentType | null;
  personalInfo: PersonalInfoFormValues | null;
  uploadedFiles: DocumentUploadFiles;
  verificationResult: VerificationResult | null;
}

export interface DocumentTypeOption {
  id: DocumentType;
  title: string;
  description: string;
  requiresBack: boolean;
  emoji: string;
}

export interface Province {
  code: string;
  name: string;
}

export interface UploadProgress {
  front: number;
  back: number;
}
