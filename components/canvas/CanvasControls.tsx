"use client";

import { useReactFlow } from "reactflow";
import { ControlButton } from "./ControlButton";
import { usePresentation } from "@/lib/presentation/usePresentation";

type PresentationController = ReturnType<typeof usePresentation>;

type Props = {
  presentation: PresentationController;
  mode: "explore" | "edit";
  onModeChange: (mode: "explore" | "edit") => void;
};

export function CanvasControls({ presentation, mode, onModeChange }: Props) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const isPresenting = presentation.isActive;

  return (
    <div
      className="
        absolute left-1/2 -translate-x-1/2
        z-20
        flex items-center gap-2
        rounded-2xl
        bg-neutral-900/90 backdrop-blur
        border border-neutral-800
        px-3 py-2
        shadow-lg
        whitespace-nowrap
      "
      style={{
        bottom: "calc(1.5rem + env(safe-area-inset-bottom))",
      }}
    >
      {/* =========================
          MOBILE: PRESENTATION MODE
          ========================= */}
      {isPresenting && (
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={presentation.prev}
            disabled={!presentation.canPrev}
            className="px-2 py-1 text-sm text-neutral-300 hover:text-white disabled:opacity-40"
          >
            Back
          </button>

          <button
            onClick={presentation.next}
            disabled={!presentation.canNext}
            className="px-2 py-1 text-sm text-neutral-300 hover:text-white disabled:opacity-40"
          >
            Next
          </button>

          <div className="px-2 text-xs text-neutral-400 tabular-nums">
            {presentation.currentStep} / {presentation.totalSteps}
          </div>

          <ControlButton
            onClick={() => {
              presentation.exit();
              fitView({ padding: 0.4 });
            }}
          >
            ✕
          </ControlButton>
        </div>
      )}

      {/* =========================
          NORMAL CONTROLS
          (desktop always, mobile when not presenting)
          ========================= */}
      {!isPresenting && (
        <>
          {/* CAMERA — always visible when not presenting */}
          <ControlButton onClick={zoomOut}>−</ControlButton>

          <ControlButton onClick={() => fitView({ padding: 0.4 })}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </ControlButton>

          <ControlButton onClick={zoomIn}>+</ControlButton>

          <div className="w-px h-6 bg-neutral-700 mx-1" />

          {/* MODE TOGGLE */}
          <button
            onClick={() =>
              onModeChange(mode === "explore" ? "edit" : "explore")
            }
            className={`
              h-9 px-3 rounded-xl text-sm font-medium border transition-colors
              ${
                mode === "edit"
                  ? "bg-indigo-600/90 border-indigo-600/90 text-white"
                  : "bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white"
              }
            `}
          >
            {mode === "edit" ? "Explore" : "Edit"}
          </button>

          {/* PRESENT — hidden in edit mode on mobile */}
          {mode === "explore" && (
            <>
              <div className="w-px h-6 bg-neutral-700 mx-1 md:block hidden" />

              <button
                onClick={presentation.start}
                className="
                  h-9 px-3 rounded-xl
                  text-sm font-medium
                  text-white bg-indigo-600/90
                  hover:bg-indigo-500 transition-colors
                "
              >
                Present
              </button>
            </>
          )}
        </>
      )}

      {/* =========================
          DESKTOP: PRESENTATION CONTROLS
          ========================= */}
      {isPresenting && (
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={presentation.prev}
            disabled={!presentation.canPrev}
            className="px-2 py-1 text-sm text-neutral-300 hover:text-white disabled:opacity-40"
          >
            Back
          </button>

          <button
            onClick={presentation.next}
            disabled={!presentation.canNext}
            className="px-2 py-1 text-sm text-neutral-300 hover:text-white disabled:opacity-40"
          >
            Next
          </button>

          <div className="px-2 text-xs text-neutral-400 tabular-nums">
            {presentation.currentStep} / {presentation.totalSteps}
          </div>

          <ControlButton
            onClick={() => {
              presentation.exit();
              fitView({ padding: 0.4 });
            }}
          >
            ✕
          </ControlButton>
        </div>
      )}
    </div>
  );
}
