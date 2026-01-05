// src/components/canvas/ControlButton.tsx
"use client";

export function ControlButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="
        w-9 h-9
        flex items-center justify-center
        rounded-xl
        text-sm font-medium
        text-neutral-200
        bg-neutral-800
        hover:bg-neutral-700
        transition-colors
      "
    >
      {label}
    </button>
  );
}
