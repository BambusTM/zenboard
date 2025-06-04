"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Toast = { title: string; description: string };
type ToastContextType = {
  toast: Toast | null;
  setToast: (toast: Toast | null) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-red-500 text-white px-4 py-2 rounded shadow-lg">
            <strong>{toast.title}</strong>
            <div>{toast.description}</div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
