"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { AuthShell } from '@/components/auth/AuthShell';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [email, setEmail] = useState('');
  const [validCode, setValidCode] = useState(false);

  const oobCode = searchParams.get('oobCode');
  const mode = searchParams.get('mode');

  useEffect(() => {
    const verifyCode = async () => {
      if (!oobCode || mode !== 'resetPassword') {
        setError('Invalid or expired password reset link.');
        setVerifying(false);
        return;
      }

      try {
        const userEmail = await verifyPasswordResetCode(auth, oobCode);
        setEmail(userEmail);
        setValidCode(true);
      } catch {
        setError('This password reset link is invalid or has expired.');
      } finally {
        setVerifying(false);
      }
    };

    verifyCode();
  }, [oobCode, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!oobCode) {
      setError('Invalid reset code.');
      return;
    }

    setLoading(true);

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === 'auth/expired-action-code') {
        setError('This password reset link has expired. Please request a new one.');
      } else if (error.code === 'auth/invalid-action-code') {
        setError('This password reset link is invalid. Please request a new one.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <AuthShell>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Verifying...</h2>
          <p className="text-sm text-gray-600 mt-1">Please wait while we verify your reset link</p>
        </div>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AuthShell>
    );
  }

  if (!validCode) {
    return (
      <AuthShell>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Invalid Link</h2>
          <p className="text-sm text-gray-600 mt-1">This password reset link is invalid or has expired</p>
        </div>
        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}
          <AuthButton onClick={() => router.push('/forgot-password')}>
            Request New Reset Link
          </AuthButton>
          <button
            onClick={() => router.push('/login')}
            className="w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Back to Login
          </button>
        </div>
      </AuthShell>
    );
  }

  if (success) {
    return (
      <AuthShell>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Password Reset Successful!</h2>
          <p className="text-sm text-gray-600 mt-1">Your password has been successfully reset</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm text-center">
          Redirecting to login page...
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reset Your Password</h2>
        <p className="text-sm text-gray-600 mt-1">for {email}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <AuthInput
          label="New Password"
          icon={Lock}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
          required
          minLength={6}
        />

        <AuthInput
          label="Confirm Password"
          icon={Lock}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your new password"
          required
          minLength={6}
        />

        <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
          Password must be at least 6 characters long
        </div>

        <AuthButton type="submit" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </AuthButton>

        <button
          type="button"
          onClick={() => router.push('/login')}
          className="w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Back to Login
        </button>
      </form>
    </AuthShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <AuthShell>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Loading...</h2>
          <p className="text-sm text-gray-600 mt-1">Please wait</p>
        </div>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AuthShell>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
