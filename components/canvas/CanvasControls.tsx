// src/components/canvas/CanvasControls.tsx
"use client";

import { useReactFlow } from "reactflow";
import { ControlButton } from "./ControlButton";
import { usePresentation } from "@/lib/presentation/usePresentation";

type PresentationController = ReturnType<typeof usePresentation>;

type Props = {
  presentation: PresentationController;
};

export function CanvasControls({ presentation }: Props) {
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
      {!presentation.isActive ? (
        <>
          {/* Explore controls */}
          <ControlButton onClick={zoomOut}>−</ControlButton>

          <ControlButton onClick={() => fitView({ padding: 0.4 })}>
            ⤢
          </ControlButton>

          <ControlButton onClick={zoomIn}>+</ControlButton>

          {/* Divider */}
          <div className="w-px h-6 bg-neutral-700 mx-1" />

          {/* Styled Present button */}
          <button
            onClick={presentation.start}
            className="
              h-10 px-3
              flex items-center
              rounded-xl
              text-sm font-medium
              text-neutral-100
              bg-indigo-600/90
              hover:bg-indigo-500
              transition-colors
            "
          >
            Present
          </button>
        </>
      ) : (
        <>
          {/* Back */}
          <button
            onClick={presentation.prev}
            disabled={!presentation.canPrev}
            className="
      px-2 py-1
      text-sm
      text-neutral-300
      hover:text-white
      disabled:opacity-40
      disabled:cursor-not-allowed
      transition-colors
    "
          >
            Back
          </button>

          {/* Next */}
          <button
            onClick={presentation.next}
            disabled={!presentation.canNext}
            className="
      px-2 py-1
      text-sm
      text-neutral-300
      hover:text-white
      disabled:opacity-40
      disabled:cursor-not-allowed
      transition-colors
    "
          >
            Next
          </button>

          {/* Exit stays strong */}
          <ControlButton onClick={presentation.exit}>✕</ControlButton>
        </>
      )}
    </div>
  );
}
