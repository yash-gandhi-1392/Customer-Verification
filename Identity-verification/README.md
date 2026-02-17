# VerifyID — Canadian KYC Identity Verification UI

A production-grade, fully responsive identity verification (KYC) frontend built with React, TypeScript, and Material UI v5.

---

## ✨ Features

- **8-step verification wizard** with smooth transitions
- **Fully responsive** — mobile, tablet, and desktop
- **Dark, premium fintech design** with animated accents
- **Formik + Yup validation** on all forms
- **Dynamic document upload** (front-only for passport, front+back for all others)
- **Drag-and-drop file upload** with previews and progress indicators
- **Phone OTP dialog** (UI placeholder)
- **Liveness/face capture simulation** (UI only — no camera required)
- **4 verification result states** — Verified, Step-Up, Under Review, Failed
- **Axios API service layer** with placeholder calls ready to connect to a real backend
- **Snackbar error/success notifications**
- **Accessible** — ARIA labels, focus management, keyboard navigation

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v16 or higher ([download](https://nodejs.org))
- **npm** v8 or higher (comes with Node.js)

### 1. Install dependencies

```bash
cd kyc-app
npm install
```

### 2. Start the development server

```bash
npm start
```

The app will open at **http://localhost:3000**

### 3. Build for production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── api/
│   └── kycService.ts          # Axios API placeholders
├── components/
│   ├── AppSnackbar.tsx        # Error/success notifications
│   ├── FileUploadZone.tsx     # Drag-and-drop upload with preview
│   ├── ProcessingLoader.tsx   # Animated processing screen
│   ├── StepLayout.tsx         # Wrapper with card + accent line
│   └── StepperHeader.tsx      # Progress stepper (dots + bar)
├── hooks/
│   └── useKYCContext.tsx      # Global KYC state (React Context)
├── pages/
│   ├── ConsentPage.tsx        # Step 1 — Consent & start
│   ├── PersonalInfoPage.tsx   # Step 2 — Personal information form
│   ├── SelectIDPage.tsx       # Step 3 — Choose government ID
│   ├── DocumentUploadPage.tsx # Step 4 — Upload front/back
│   ├── DocumentProcessingPage.tsx  # Step 5 — Processing loader
│   ├── LivenessPage.tsx       # Step 6 — Face/liveness simulation
│   ├── IdentityProcessingPage.tsx  # Step 7 — Identity check loader
│   └── ResultPage.tsx         # Step 8 — Verified/failed/review/step-up
├── theme/
│   └── index.ts               # MUI dark fintech theme
├── types/
│   └── index.ts               # TypeScript interfaces
├── validation/
│   └── schemas.ts             # Yup validation schemas
├── App.tsx                    # Router + providers
└── index.tsx                  # Entry point
```

---

## 🔌 API Integration

All API calls are in `src/api/kycService.ts`. Each function includes:
- The intended endpoint (as a comment)
- A simulated delay to mimic real network latency
- Mock response data

To connect to a real backend:
1. Set `REACT_APP_API_URL` in your `.env` file
2. Replace the mock responses in each function with actual `apiClient.post(...)` / `apiClient.get(...)` calls

### Endpoints (Placeholders)

| Function | Method | Endpoint |
|---|---|---|
| `startSession` | POST | `/identity/session/start` |
| `submitPersonalInfo` | POST | `/identity/personal-info` |
| `sendPhoneOTP` | POST | `/identity/phone/otp/send` |
| `verifyPhoneOTP` | POST | `/identity/phone/otp/verify` |
| `submitDocumentType` | POST | `/identity/document/type` |
| `uploadDocument` | POST | `/identity/document/upload` |
| `pollDocumentProcessing` | GET | `/identity/document/status` |
| `submitBiometricCapture` | POST | `/identity/biometric/verify` |
| `pollIdentityProcessing` | GET | `/identity/status` |

---

## 🧩 Accepted Canadian IDs

| Document | Upload Required |
|---|---|
| Canadian Passport | Front only |
| Driver's License (Provincial) | Front + Back |
| Permanent Resident Card | Front + Back |
| Provincial / Territorial ID | Front + Back |
| Canadian Citizenship Card | Front + Back |

---

## 🎨 Design System

The app uses a custom MUI dark theme (`src/theme/index.ts`):

- **Primary color**: `#00E5CC` (teal/cyan)
- **Secondary color**: `#5B8AF5` (blue)
- **Background**: `#0A1628` (deep navy)
- **Card surface**: `#0F2040`
- **Fonts**: Syne (headings), DM Sans (body)
- Animated gradient accent on each card
- Soft radial glows in the background

---

## 📋 Form Validation (Yup)

| Field | Validation |
|---|---|
| Full Legal Name | Required, 2–100 chars, letters/spaces/hyphens/apostrophes only |
| Date of Birth | Required, must be 18+, max 120 years old |
| Street Address | Required, 5–200 chars |
| City | Required, 2–100 chars |
| Province | Required, select from list |
| Postal Code | Required, Canadian format (e.g. M5V 3A8) |
| Phone Number | Required, Canadian format (+1 optional) |
| Email | Required, valid email format |

---

## 🔒 Security Notes

- Session token stored in `sessionStorage` (not `localStorage`)
- All checkboxes required before starting verification
- File validation: JPG, PNG, PDF only; max 5MB per file
- No real biometric data captured (UI simulation only)

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| `@mui/material` | 5.x | UI component library |
| `@mui/icons-material` | 5.x | Icons |
| `@emotion/react` | 11.x | MUI styling engine |
| `formik` | 2.x | Form state management |
| `yup` | 1.x | Validation schemas |
| `react-router-dom` | 6.x | Client-side routing |
| `react-dropzone` | 14.x | Drag-and-drop file upload |
| `axios` | 1.x | HTTP client (API placeholders) |

---

## 🇨🇦 Canadian Compliance

This UI is designed to support:
- **PIPEDA** — Personal Information Protection and Electronic Documents Act
- **FINTRAC** — Financial Transactions and Reports Analysis Centre of Canada
- All 13 Canadian provinces and territories in the address form

---

## 📝 License

MIT — free for commercial and personal use.
