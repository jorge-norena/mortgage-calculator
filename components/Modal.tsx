"use client";

import { useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, title, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  // CLose on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Close on backdrop click
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === ref.current) onClose();
  };

  if (!open) return null;

  return (
    <div
      ref={ref}
      onMouseDown={onBackdropClick}
      className="fixed inset-0 z-50 grid place-items-center bg-black/50"
      aria-hidden={!open}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-lg rounded-2xl bg-white text-black shadow-2xl ring-1 ring-black/10"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm hover:bg-black/5"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
