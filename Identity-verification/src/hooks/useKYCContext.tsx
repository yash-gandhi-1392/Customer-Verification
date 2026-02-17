import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { KYCState, DocumentType, PersonalInfoFormValues, VerificationResult } from '../types';

interface KYCContextValue extends KYCState {
  setSessionId: (id: string) => void;
  setSelectedDocumentType: (type: DocumentType | null) => void;
  setPersonalInfo: (info: PersonalInfoFormValues) => void;
  setFrontFile: (file: File | null) => void;
  setBackFile: (file: File | null) => void;
  setVerificationResult: (result: VerificationResult) => void;
  resetState: () => void;
}

const defaultState: KYCState = {
  sessionId: null,
  selectedDocumentType: null,
  personalInfo: null,
  uploadedFiles: { front: null, back: null },
  verificationResult: null,
};

const KYCContext = createContext<KYCContextValue | null>(null);

export const KYCProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<KYCState>(defaultState);

  const setSessionId = useCallback((id: string) => {
    setState((s) => ({ ...s, sessionId: id }));
  }, []);

  const setSelectedDocumentType = useCallback((type: DocumentType | null) => {
    setState((s) => ({ ...s, selectedDocumentType: type }));
  }, []);

  const setPersonalInfo = useCallback((info: PersonalInfoFormValues) => {
    setState((s) => ({ ...s, personalInfo: info }));
  }, []);

  const setFrontFile = useCallback((file: File | null) => {
    setState((s) => ({ ...s, uploadedFiles: { ...s.uploadedFiles, front: file } }));
  }, []);

  const setBackFile = useCallback((file: File | null) => {
    setState((s) => ({ ...s, uploadedFiles: { ...s.uploadedFiles, back: file } }));
  }, []);

  const setVerificationResult = useCallback((result: VerificationResult) => {
    setState((s) => ({ ...s, verificationResult: result }));
  }, []);

  const resetState = useCallback(() => {
    setState(defaultState);
    sessionStorage.removeItem('kyc_session_token');
  }, []);

  return (
    <KYCContext.Provider
      value={{
        ...state,
        setSessionId,
        setSelectedDocumentType,
        setPersonalInfo,
        setFrontFile,
        setBackFile,
        setVerificationResult,
        resetState,
      }}
    >
      {children}
    </KYCContext.Provider>
  );
};

export const useKYC = (): KYCContextValue => {
  const ctx = useContext(KYCContext);
  if (!ctx) throw new Error('useKYC must be used within KYCProvider');
  return ctx;
};
