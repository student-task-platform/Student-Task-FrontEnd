"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ShieldCheck, Undo2 } from 'lucide-react';
import { AuthShell } from './AuthShell';
import { AuthInput } from './AuthInput';
import { AuthButton } from './AuthButton';
import { resetPassword } from '@/lib/firebase/auth';
import { getAuthErrorMessage } from '@/lib/firebase/errorMessages';
import { useToast } from '@/components/ui/ToastProvider';

export function ForgotPasswordView() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      const message = 'Please enter your email address.';
      setError(message);
      showToast({ title: 'Email required', description: message, variant: 'error' });
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email);
      showToast({
        title: 'Reset link sent',
        description: 'Check your inbox for password reset instructions.',
        variant: 'success',
      });
      router.push('/login');
    } catch (err: unknown) {
      const message = getAuthErrorMessage(err, 'Failed to send reset email. Please try again.');
      setError(message);
      showToast({ title: 'Reset failed', description: message, variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = !!email;

  return (
    <AuthShell>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            Secure reset
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-slate-900">Reset your password</h1>
            <p className="text-sm text-slate-600">
              Enter the email linked to your account and we&apos;ll email you a reset link.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        <AuthInput
          label="Email address"
          type="email"
          icon={Mail}
          placeholder="student@university.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthButton type="submit" disabled={!isFormValid || loading}>
          {loading ? 'Sending reset link...' : 'Send reset link'}
        </AuthButton>

        <div className="pt-2 text-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            <Undo2 className="h-4 w-4" aria-hidden />
            Back to login
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
