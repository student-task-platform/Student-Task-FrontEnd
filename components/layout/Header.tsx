"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { BookOpen, Database, LogOut } from 'lucide-react';
import { signOut } from '@/lib/firebase/auth';
import { useToast } from '@/components/ui/ToastProvider';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { showToast } = useToast();
  const [dbStatus, setDbStatus] = useState<'healthy' | 'checking'>('healthy');
  const [signingOut, setSigningOut] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
        setDbStatus('checking');
        setTimeout(() => setDbStatus('healthy'), 1500);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await signOut();
      showToast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
        variant: 'success',
      });
      router.push('/login');
    } catch {
      showToast({
        title: 'Sign out failed',
        description: 'Failed to sign out. Please try again.',
        variant: 'error',
      });
    } finally {
      // Reset the signing out state after a brief delay
      setTimeout(() => setSigningOut(false), 500);
    }
  };

  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password';

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-sm">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight tracking-tight">Student Task</h1>
            <p className="text-xs text-slate-500 font-medium">Organize your academic work</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors duration-500 ${
            dbStatus === 'healthy' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-100'
          }`}>
            <Database className={`w-3 h-3 ${dbStatus === 'healthy' ? '' : 'animate-pulse'}`} />
            <span>{dbStatus === 'healthy' ? 'System Online' : 'Checking...'}</span>
          </div>
          
          {!isAuthPage && (
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Sign out"
            >
              <LogOut className="w-3 h-3" />
              <span>{signingOut ? 'Signing out...' : 'Sign out'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
