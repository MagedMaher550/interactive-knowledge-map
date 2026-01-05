// src/components/canvas/ControlButton.tsx
"use client";

export function ControlButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="
        w-10 h-10
        flex items-center justify-center
        rounded-xl
        text-neutral-200
        bg-neutral-800
        hover:bg-neutral-700
        transition-colors
        touch-manipulation
      "
      style={{
        transform: "translateZ(0)",
      }}
    >
      {children}
    </button>
  );
}
