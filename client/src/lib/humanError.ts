/**
 * Maps internal / provider error objects to user-facing copy.
 *
 * Never surface a raw Firebase / network / Prisma error string to the user —
 * it leaks implementation detail and reads like the app is broken even when
 * the situation is routine (rate limit, offline, bad code, etc.).
 *
 * Log the original via `console.error` for ops; hand the returned string to
 * the toast / snackbar for the user.
 */

type ErrorLike = {
  code?: unknown;
  message?: unknown;
  name?: unknown;
};

const FALLBACK =
  "Something went wrong. Please try again, or call us at +91 84518 80963.";

const FIREBASE_AUTH_MAP: Record<string, string> = {
  'auth/captcha-check-failed':
    "We couldn't verify your browser. Refresh the page and try again, or call us at +91 84518 80963.",
  'auth/invalid-phone-number':
    "That phone number doesn't look right. Please enter a 10-digit Indian mobile number.",
  'auth/missing-phone-number':
    "Please enter your phone number to receive the OTP.",
  'auth/quota-exceeded':
    "We've hit our OTP send limit for the moment. Please wait a minute and try again.",
  'auth/too-many-requests':
    "Too many OTP attempts from this device. Please wait a few minutes before trying again.",
  'auth/invalid-verification-code':
    "That OTP doesn't match. Please check the 6-digit code and try again.",
  'auth/code-expired':
    "That OTP has expired. Please request a new code.",
  'auth/network-request-failed':
    "Network hiccup. Please check your connection and try again.",
  'auth/operation-not-allowed':
    "Phone sign-in isn't available right now. Please call us at +91 84518 80963.",
  'auth/argument-error':
    "We couldn't send the OTP. Please refresh the page and try again.",
  'auth/internal-error':
    "We hit a temporary issue. Please try again in a moment.",
};

export function humanError(
  err: unknown,
  opts: { fallback?: string } = {}
): string {
  const fallback = opts.fallback ?? FALLBACK;

  if (!err) return fallback;

  const e = err as ErrorLike;
  const code = typeof e.code === 'string' ? e.code : undefined;
  const message = typeof e.message === 'string' ? e.message : undefined;

  // Firebase auth/* family
  if (code && code.startsWith('auth/')) {
    return FIREBASE_AUTH_MAP[code] ?? fallback;
  }

  // Network-ish messages
  if (message && /network|offline|failed to fetch|timeout/i.test(message)) {
    return "Network hiccup. Please check your connection and try again.";
  }

  return fallback;
}
