"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Lock, Mail, User } from 'lucide-react';
import { AuthShell } from './AuthShell';
import { AuthInput } from './AuthInput';
import { AuthButton } from './AuthButton';
import { signUp, sendVerificationEmail } from '@/lib/firebase/auth';
import { getAuthErrorMessage } from '@/lib/firebase/errorMessages';
import { createMe } from '@/services/UserService';
import { useToast } from '@/components/ui/ToastProvider';

export function SignupView() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      showToast({
        title: 'Password mismatch',
        description: 'Your password and confirmation do not match.',
        variant: 'error',
      });
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      showToast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters.',
        variant: 'error',
      });
      setLoading(false);
      return;
    }

    if (!agreedToTerms) {
      showToast({
        title: 'Agreement required',
        description: 'Please accept the Terms of Service and Privacy Policy.',
        variant: 'error',
      });
      setLoading(false);
      return;
    }

    try {
      // Create Firebase user
      const credential = await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
      });

      await sendVerificationEmail(credential.user);

      // Create user in backend
      await createMe({
        fullName: formData.fullName,
      });

      showToast({
        title: 'Verify your email',
        description: `We sent a verification link to ${formData.email}. Please verify before signing in.`,
        variant: 'success',
      });

      // Redirect to login so they verify then sign in
      router.push('/login');
    } catch (err: unknown) {
      console.error('Signup error:', err);
      const message = getAuthErrorMessage(err, 'Failed to create account. Please try again.');
      showToast({
        title: 'Sign up failed',
        description: message,
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, label: '', color: '' },
      { strength: 1, label: 'Weak', color: 'bg-red-500' },
      { strength: 2, label: 'Fair', color: 'bg-orange-500' },
      { strength: 3, label: 'Good', color: 'bg-yellow-500' },
      { strength: 4, label: 'Strong', color: 'bg-green-500' },
      { strength: 5, label: 'Very Strong', color: 'bg-green-600' },
    ];

    return levels[Math.min(strength, 5)];
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const isFormValid = 
    formData.fullName && 
    formData.email && 
    formData.password && 
    formData.confirmPassword;

  return (
    <AuthShell>
      <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <AuthInput
          label="Full Name"
          icon={User}
          placeholder="Jane Doe"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />

        <AuthInput
          label="Email address"
          type="email"
          icon={Mail}
          placeholder="student@university.edu"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <AuthInput
          label="Password"
          type="password"
          icon={Lock}
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        {formData.password && (
          <div className="flex gap-1 px-1 items-center">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= passwordStrength.strength ? passwordStrength.color : 'bg-gray-200'
                }`}
              />
            ))}
            {passwordStrength.label && (
              <span className="text-xs font-medium ml-2 text-gray-600">
                {passwordStrength.label}
              </span>
            )}
          </div>
        )}

        <AuthInput
          label="Confirm Password"
          type="password"
          icon={CheckCircle2}
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />

        <label className="flex items-start gap-2 cursor-pointer group pt-1">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <span className="text-xs text-gray-500 leading-tight">
            I agree to the{' '}
            <Link href="/terms" className="text-indigo-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-indigo-600 hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        <AuthButton type="submit" disabled={!isFormValid || loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </AuthButton>

        <div className="text-center pt-2">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </AuthShell>
  );
}
