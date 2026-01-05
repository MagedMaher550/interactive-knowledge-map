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

  // className="
  //   absolute left-1/2 -translate-x-1/2
  //   z-20
  //   flex items-center gap-2 justify-center
  //   min-w-[260px]
  //   whitespace-nowrap
  //   rounded-2xl
  //   bg-neutral-900/90 backdrop-blur
  //   border border-neutral-800
  //   px-3 py-2
  //   shadow-lg
  // "

  return (
    <div
      className="
    absolute left-1/2 -translate-x-1/2
    z-20
    flex items-center gap-2 justify-center
    whitespace-nowrap
    min-w-[260px] md:min-w-0
    rounded-2xl
    bg-neutral-900/90 backdrop-blur
    border border-neutral-800
    px-3 py-2
    shadow-lg
  "
      style={{
        bottom: "calc(1.5rem + env(safe-area-inset-bottom))",
      }}
    >
      {/* MODE TOGGLE
      <button
        onClick={() => onModeChange(mode === "explore" ? "edit" : "explore")}
        className={`
          h-10 px-3 rounded-xl text-sm font-medium border transition-colors
          ${
            mode === "edit"
              ? "bg-amber-600/90 border-amber-500 text-white"
              : "bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white"
          }
        `}
      >
        {mode === "edit" ? "Edit" : "Explore"}
      </button> */}

      {/* EXPLORE CONTROLS */}
      {mode === "explore" && !presentation.isActive && (
        <>
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

          <button
            onClick={presentation.start}
            className="
              h-10 px-3 rounded-xl
              text-sm font-medium
              text-white bg-indigo-600/90
              hover:bg-indigo-500 transition-colors
            "
          >
            Present
          </button>
        </>
      )}

      {/* PRESENTATION CONTROLS */}
      {presentation.isActive && (
        <>
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
        </>
      )}
    </div>
  );
}
