import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from './config';
import { getAuthErrorMessage } from './errorMessages';

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignInResult {
  credential: UserCredential | null;
  errorMessage?: string;
}

/**
 * Sign up a new user with email and password
 */
export async function signUp(data: SignUpData): Promise<UserCredential> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    // Update the user's display name
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: data.fullName,
      });
    }

    return userCredential;
  } catch (error) {
    throw new Error(getAuthErrorMessage(error, 'Failed to create account. Please try again.'));
  }
}

/**
 * Sign in an existing user with email and password
 */
export async function signIn(data: SignInData): Promise<SignInResult> {
  try {
    const credential = await signInWithEmailAndPassword(auth, data.email, data.password);

    if (!credential.user.emailVerified) {
      await firebaseSignOut(auth);
      return {
        credential: null,
        errorMessage: 'Please verify your email before signing in. Check your inbox for the verification link.',
      };
    }

    return { credential };
  } catch (error) {
    return {
      credential: null,
      errorMessage: getAuthErrorMessage(error, 'Failed to sign in. Please check your credentials.'),
    };
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
  return await sendPasswordResetEmail(auth, email);
}

/**
 * Get the current Firebase ID token
 */
export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
}

/**
 * Get the current Firebase user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Send email verification to the user
 */
export async function sendVerificationEmail(targetUser?: User): Promise<void> {
  const user = targetUser ?? auth.currentUser;
  if (!user) {
    throw new Error('No authenticated user found to verify.');
  }

  try {
    await sendEmailVerification(user);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error, 'Failed to send verification email. Please try again.'));
  }
}
