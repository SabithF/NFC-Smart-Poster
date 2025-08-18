import React from "react";

const VARIANTS = {
  success: "bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-900/20 dark:text-emerald-100 dark:border-emerald-700",
  error:   "bg-rose-50 text-rose-900 border-rose-300 dark:bg-rose-900/20 dark:text-rose-100 dark:border-rose-700",
  warning: "bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-900/20 dark:text-amber-100 dark:border-amber-700",
  info:    "bg-sky-50 text-sky-900 border-sky-300 dark:bg-sky-900/20 dark:text-sky-100 dark:border-sky-700",
};

const ICON = {
  success: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.34 3.94 1.94 12.34a2.25 2.25 0 0 0 0 3.18l8.4 8.4a2.25 2.25 0 0 0 3.18 0l8.4-8.4a2.25 2.25 0 0 0 0-3.18l-8.4-8.4a2.25 2.25 0 0 0-3.18 0z" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18.14A2 2 0 0 0 3.54 21h16.92a2 2 0 0 0 1.72-2.86L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
    </svg>
  ),
};

export default function Alert({
  variant = "info",
  title,
  children,
  onClose,
  className = "",
  role = "alert",
}) {
  return (
    <div
      role={role}
      aria-live="polite"
      className={`border rounded-xl px-4 py-3 flex items-start gap-3 shadow-sm ${VARIANTS[variant]} ${className}`}
    >
      <div className="mt-0.5 shrink-0">{ICON[variant]}</div>
      <div className="flex-1">
        {title && <p className="font-semibold leading-6">{title}</p>}
        {children && <p className="text-sm leading-6 opacity-90">{children}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-md/50 hover:bg-black/5 dark:hover:bg-white/10 transition"
          aria-label="Close alert"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
