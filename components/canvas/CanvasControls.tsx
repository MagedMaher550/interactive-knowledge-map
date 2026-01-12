"use client";

import { useState, useRef, useEffect } from "react";
import { useReactFlow } from "reactflow";
import { ControlButton } from "./ControlButton";
import { usePresentation } from "@/lib/presentation/usePresentation";

type PresentationController = ReturnType<typeof usePresentation>;

type Props = {
  presentation: PresentationController;
  mode: "explore" | "edit";
  onModeChange: (mode: "explore" | "edit") => void;
  onCreateNode: () => void;
};

export function CanvasControls({
  presentation,
  mode,
  onModeChange,
  onCreateNode,
}: Props) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const isPresenting = presentation.isActive;

  const [cameraOpen, setCameraOpen] = useState(false);
  const cameraGroupRef = useRef<HTMLDivElement | null>(null);

  /* ---------- Outside click (desktop + mobile) ---------- */
  useEffect(() => {
    if (!cameraOpen) return;

    const handler = (e: PointerEvent) => {
      if (
        cameraGroupRef.current &&
        !cameraGroupRef.current.contains(e.target as Node)
      ) {
        setCameraOpen(false);
      }
    };

    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [cameraOpen]);

  return (
    <div
      className={`
        z-20
        bg-neutral-900/90 backdrop-blur
        border border-neutral-800
        shadow-lg
        rounded-2xl

        /* Mobile: centered, constrained width */
        fixed left-1/2 -translate-x-1/2
        w-[calc(100%-2rem)] max-w-[420px]
        bottom-[calc(env(safe-area-inset-bottom)+0.75rem)]

        /* Desktop: floating centered */
        md:absolute md:left-1/2 md:-translate-x-1/2
        md:w-auto md:max-w-none
      `}
      style={{ touchAction: "manipulation" }}
    >
      {/* ================= PRESENTATION MODE ================= */}
      {isPresenting && (
        <div className="flex items-center justify-between gap-2 px-3 py-2">
          <button
            onClick={presentation.prev}
            disabled={!presentation.canPrev}
            className="px-2 py-1 text-sm text-neutral-300 hover:text-white disabled:opacity-40"
          >
            Back
          </button>

          <div className="text-xs text-neutral-400 tabular-nums">
            {presentation.currentStep} / {presentation.totalSteps}
          </div>

          <button
            onClick={presentation.next}
            disabled={!presentation.canNext}
            className="px-2 py-1 text-sm text-neutral-300 hover:text-white disabled:opacity-40"
          >
            Next
          </button>

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

      {/* ================= NORMAL MODE ================= */}
      {!isPresenting && (
        <div className="flex items-center gap-2 px-3 py-2">
          {/* ================= CAMERA GROUP ================= */}
          <div ref={cameraGroupRef} className="relative flex items-center">
            {/* Expanded camera controls */}
            <div
              className={`
                absolute
                flex
                rounded-xl
                bg-neutral-800/90
                border border-neutral-700
                shadow-md
                transition-all duration-200 ease-out
                ${
                  cameraOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }

                /* Mobile: vertical above */
                flex-col bottom-full mb-1
                md:bottom-auto md:mb-0

                /* Desktop: horizontal left */
                md:flex-row md:right-full md:mr-1
              `}
            >
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
            </div>

            {/* Camera anchor */}
            <ControlButton onClick={() => setCameraOpen((v) => !v)}>
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
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </ControlButton>
          </div>

          <div className="w-px h-6 bg-neutral-700 mx-1" />

          {/* CREATE */}
          {mode === "explore" && (
            <ControlButton onClick={onCreateNode}>
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
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </ControlButton>
          )}

          {/* EDIT */}
          <button
            onClick={() =>
              onModeChange(mode === "explore" ? "edit" : "explore")
            }
            className={`
              h-9 px-3 rounded-xl
              flex items-center gap-2
              text-sm font-medium border transition-colors
              ${
                mode === "edit"
                  ? "bg-indigo-600/90 border-indigo-600/90 text-white"
                  : "bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white"
              }
            `}
          >
            {mode === "edit" ? "Explore" : "Edit"}
          </button>

          {/* PRESENT */}
          {mode === "explore" && (
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
          )}
        </div>
      )}
    </div>
  );
}
