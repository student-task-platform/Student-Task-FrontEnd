"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { AuthShell } from './AuthShell';
import { AuthInput } from './AuthInput';
import { AuthButton } from './AuthButton';
import { signIn, signOut } from '@/lib/firebase/auth';
import { getMe } from '@/services/UserService';
import { useToast } from '@/components/ui/ToastProvider';
import { getAuthErrorMessage } from '@/lib/firebase/errorMessages';

export function LoginView() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { credential, errorMessage } = await signIn({
      email: formData.email,
      password: formData.password,
    });

    if (!credential || errorMessage) {
      showToast({
        title: 'Sign in failed',
        description: errorMessage ?? 'Failed to sign in. Please check your credentials.',
        variant: 'error',
      });
      setLoading(false);
      return;
    }

    if (!credential.user.emailVerified) {
      await signOut();
      const verifyMsg = 'Please verify your email before signing in. Check your inbox for the verification link.';
      showToast({
        title: 'Email verification required',
        description: verifyMsg,
        variant: 'error',
      });
      setLoading(false);
      return;
    }

    const { errorMessage: meError } = await getMe().then(() => ({ errorMessage: undefined })).catch((err) => ({
      errorMessage: getAuthErrorMessage(err, 'Failed to fetch your profile.'),
    }));

    if (meError) {
      await signOut();
      showToast({
        title: 'Sign in failed',
        description: meError,
        variant: 'error',
      });
      setLoading(false);
      return;
    }

    showToast({
      title: 'Welcome back',
      description: 'Signed in successfully. Loading your tasks...',
      variant: 'success',
    });

    router.push('/tasks');
    setLoading(false);
  };

  const isFormValid = formData.email && formData.password;

  return (
    <AuthShell>
      <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <AuthInput
          label="Email address"
          type="email"
          icon={Mail}
          placeholder="student@university.edu"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <div className="space-y-1">
          <AuthInput
            label="Password"
            type="password"
            icon={Lock}
            placeholder="********"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="peer h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="pt-2">
          <AuthButton type="submit" disabled={!isFormValid || loading}>
            {loading ? 'Signing in...' : 'Sign In'}
            {!loading && <ArrowRight size={16} />}
          </AuthButton>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </AuthShell>
  );
}
