// src/components/canvas/CanvasControls.tsx
"use client";

import { useReactFlow } from "reactflow";
import { ControlButton } from "./ControlButton";

export function CanvasControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div
      className="
        absolute left-1/2 -translate-x-1/2
        z-20
        flex items-center gap-2
        rounded-2xl
        bg-neutral-900/90 backdrop-blur
        border border-neutral-800
        px-2 py-2
        shadow-lg
      "
      style={{
        bottom: "calc(1.5rem + env(safe-area-inset-bottom))",
      }}
    >
      {/* Zoom Out */}
      <ControlButton onClick={() => zoomOut()}>
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            d="M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </ControlButton>

      {/* Fit View */}
      <ControlButton onClick={() => fitView({ padding: 0.4 })}>
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            d="M4 4h6v2H6v4H4V4zm10 0h6v6h-2V6h-4V4zm6 10v6h-6v-2h4v-4h2zM4 14h2v4h4v2H4v-6z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ControlButton>

      {/* Zoom In */}
      <ControlButton onClick={() => zoomIn()}>
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </ControlButton>
    </div>
  );
}
