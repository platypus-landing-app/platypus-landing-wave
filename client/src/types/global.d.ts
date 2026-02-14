import { RecaptchaVerifier } from 'firebase/auth';

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export {};
