'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const ToastContext = createContext<(message: string) => void>(() => {});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const notify = useCallback((text: string) => {
    setMessage(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(''), 5000);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={
          message
            ? 'fixed z-[90] bottom-5 right-5 max-w-[340px] bg-sageDeep text-white p-5 shadow-soft text-[13px] leading-relaxed'
            : 'sr-only'
        }
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}
