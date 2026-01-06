import { FirebaseError } from 'firebase/app';

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'The email or password you entered is incorrect.',
  'auth/wrong-password': 'The email or password you entered is incorrect.',
  'auth/user-not-found': 'No account exists for that email address.',
  'auth/user-disabled': 'This account has been disabled. Please contact support.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/email-already-in-use': 'An account already exists with this email address.',
  'auth/weak-password': 'Please choose a stronger password.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/network-request-failed': 'Network issue detected. Check your connection and try again.',
};

export function getAuthErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.') {
  if (error instanceof FirebaseError) {
    return AUTH_ERROR_MESSAGES[error.code] || fallback;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}
