// src/components/canvas/ControlButton.tsx
"use client";

import type { ReactNode } from "react";

type Props = {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
};

export function ControlButton({ onClick, children, disabled = false }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        w-10 h-10
        flex items-center justify-center
        rounded-xl
        bg-neutral-800 text-neutral-200
        transition-colors
        hover:bg-neutral-700
        disabled:opacity-40
        disabled:cursor-not-allowed
        active:scale-95
      "
      style={{
        transform: "translateZ(0)",
      }}
    >
      {children}
    </button>
  );
}
