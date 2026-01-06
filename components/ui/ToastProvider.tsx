  "use client";

import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface Toast extends ToastOptions {
  id: string;
  variant: ToastVariant;
  duration: number;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const VARIANT_STYLES: Record<ToastVariant, { container: string; icon: ReactNode }> = {
  success: {
    container: 'bg-emerald-50 text-emerald-900 border-emerald-100',
    icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden />,
  },
  error: {
    container: 'bg-red-50 text-red-900 border-red-100',
    icon: <XCircle className="h-5 w-5 text-red-600" aria-hidden />,
  },
  info: {
    container: 'bg-slate-50 text-slate-900 border-slate-200',
    icon: <Info className="h-5 w-5 text-slate-600" aria-hidden />,
  },
};

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ variant = 'info', duration = 4500, ...options }: ToastOptions) => {
      const id = createId();
      const toast: Toast = { id, variant, duration, ...options };

      setToasts((current) => [...current, toast]);

      if (duration > 0) {
        window.setTimeout(() => dismissToast(id), duration);
      }

      return id;
    },
    [dismissToast]
  );

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-20 right-4 z-[60] w-96 max-w-[calc(100%-1rem)] space-y-3 pointer-events-none">
        {toasts.map((toast) => {
          const styles = VARIANT_STYLES[toast.variant];
          return (
            <div
              key={toast.id}
              role="status"
              className={`pointer-events-auto relative overflow-hidden flex items-start gap-3 rounded-2xl border p-4 shadow-xl shadow-slate-300/50 backdrop-blur-sm animate-toast-in hover:-translate-y-0.5 transition-transform duration-200 ${styles.container}`}
            >
              <div className="mt-0.5">{styles.icon}</div>
              <div className="flex-1 space-y-0.5">
                <p className="font-semibold leading-tight">{toast.title}</p>
                {toast.description && (
                  <p className="text-sm leading-snug text-slate-600">{toast.description}</p>
                )}
              </div>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => dismissToast(toast.id)}
                className="rounded-full p-1 text-slate-500 hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
              <div
                className="absolute bottom-0 left-0 h-0.5 bg-indigo-500/70 toast-progress"
                style={{ animationDuration: `${toast.duration}ms` }}
                aria-hidden
              />
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes toast-in {
          0% { opacity: 0; transform: translateY(-12px) scale(0.96); }
          60% { opacity: 1; transform: translateY(2px) scale(1.01); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes toast-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-toast-in { animation: toast-in 260ms cubic-bezier(0.22, 1, 0.36, 1); }
        .toast-progress { animation-name: toast-progress; animation-timing-function: linear; animation-fill-mode: forwards; }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
