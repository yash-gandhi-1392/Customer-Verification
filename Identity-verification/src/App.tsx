import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { KYCProvider } from './hooks/useKYCContext';

// Pages
import ConsentPage from './pages/ConsentPage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import SelectIDPage from './pages/SelectIDPage';
import DocumentUploadPage from './pages/DocumentUploadPage';
import DocumentProcessingPage from './pages/DocumentProcessingPage';
import LivenessPage from './pages/LivenessPage';
import IdentityProcessingPage from './pages/IdentityProcessingPage';
import ResultPage from './pages/ResultPage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <KYCProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ConsentPage />} />
            <Route path="/personal-info" element={<PersonalInfoPage />} />
            <Route path="/select-id" element={<SelectIDPage />} />
            <Route path="/upload-document" element={<DocumentUploadPage />} />
            <Route path="/document-processing" element={<DocumentProcessingPage />} />
            <Route path="/liveness" element={<LivenessPage />} />
            <Route path="/identity-processing" element={<IdentityProcessingPage />} />
            <Route path="/result" element={<ResultPage />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </KYCProvider>
    </ThemeProvider>
  );
};

export default App;
