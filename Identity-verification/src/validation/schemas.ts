import * as Yup from 'yup';

// ── Consent ────────────────────────────────────────────
export const consentSchema = Yup.object({
  privacyPolicy: Yup.boolean()
    .oneOf([true], 'You must accept the Privacy Policy to continue')
    .required(),
  termsOfService: Yup.boolean()
    .oneOf([true], 'You must accept the Terms of Service to continue')
    .required(),
  biometricConsent: Yup.boolean()
    .oneOf([true], 'Biometric consent is required to verify your identity')
    .required(),
});

// ── Personal Info ──────────────────────────────────────
const today = new Date();
const minAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const maxAge = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());

const CANADIAN_POSTAL_CODE = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
const CANADIAN_PHONE = /^(\+?1)?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

export const personalInfoSchema = Yup.object({
  fullLegalName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
    .required('Full legal name is required'),

  dateOfBirth: Yup.date()
    .max(minAge, 'You must be at least 18 years old')
    .min(maxAge, 'Please enter a valid date of birth')
    .required('Date of birth is required')
    .typeError('Please enter a valid date'),

  streetAddress: Yup.string()
    .min(5, 'Please enter a valid street address')
    .max(200, 'Address must be under 200 characters')
    .required('Street address is required'),

  city: Yup.string()
    .min(2, 'Please enter a valid city name')
    .max(100, 'City must be under 100 characters')
    .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-']+$/, 'Please enter a valid city name')
    .required('City is required'),

  province: Yup.string()
    .required('Province or territory is required'),

  postalCode: Yup.string()
    .matches(CANADIAN_POSTAL_CODE, 'Enter a valid Canadian postal code (e.g. M5V 3A8)')
    .required('Postal code is required'),

  phoneNumber: Yup.string()
    .matches(CANADIAN_PHONE, 'Enter a valid Canadian phone number')
    .required('Phone number is required'),

  email: Yup.string()
    .email('Enter a valid email address')
    .max(254, 'Email must be under 254 characters')
    .required('Email address is required'),
});

// ── OTP ────────────────────────────────────────────────
export const otpSchema = Yup.object({
  code: Yup.string()
    .length(6, 'Code must be exactly 6 digits')
    .matches(/^\d+$/, 'Code must contain only numbers')
    .required('Verification code is required'),
});
