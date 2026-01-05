"use client";

import { ReactNode } from "react";

export function ControlButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="
        w-9 h-9
        flex items-center justify-center
        rounded-xl
        text-neutral-200
        bg-neutral-800
        hover:bg-neutral-700
        transition-colors
        shrink-0
      "
    >
      {children}
    </button>
  );
}
