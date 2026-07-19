"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface ToastType {
  id: number;
  isError: boolean;
  isbig: boolean;
  message: string;
  submessage: string;
  show: boolean;
}

interface ToastContextType {
  toasts: ToastType[];
  setToasts: React.Dispatch<React.SetStateAction<ToastType[]>>;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({children,}: {children: ReactNode;}) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}