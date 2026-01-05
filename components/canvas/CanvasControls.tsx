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
      <ControlButton onClick={() => zoomOut()} label="−" />
      <ControlButton onClick={() => fitView({ padding: 0.4 })} label="⤢" />
      <ControlButton onClick={() => zoomIn()} label="+" />
    </div>
  );
}
