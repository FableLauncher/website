import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface NoticeContextValue {
  showNotice: (message: string) => void;
}

const NoticeContext = createContext<NoticeContextValue | null>(null);

export const useNotice = () => {
  const context = useContext(NoticeContext);
  if (!context) throw new Error("useNotice must be used inside NoticeProvider");
  return context;
};

export const NoticeProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");

  const showNotice = useCallback((nextMessage: string) => {
    setMessage(nextMessage);
  }, []);

  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(""), 4000);
    return () => window.clearTimeout(timeout);
  }, [message]);

  return (
    <NoticeContext.Provider value={{ showNotice }}>
      {children}
      <div
        className={`fixed bottom-4 left-1/2 z-[250] w-[min(92vw,28rem)] -translate-x-1/2 rounded-xl border border-[var(--divider)] bg-[var(--bg-raised)] px-4 py-3 text-sm text-[var(--text-1)] shadow-xl transition-[opacity,transform] duration-200 sm:bottom-6 ${
          message ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </div>
    </NoticeContext.Provider>
  );
};
