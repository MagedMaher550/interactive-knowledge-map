import React from "react";
import { PresentationController } from "./types";
import { ControlButton } from "./ControlButton";
import { useReactFlow } from "reactflow";

interface PresnetationControlsProps {
  presentation: PresentationController;
}

export default function PresnetationControls({
  presentation,
}: PresnetationControlsProps) {
  const { fitView } = useReactFlow();

  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2">
      <button
        onClick={presentation.prev}
        disabled={!presentation.canPrev}
        className="px-2 py-1 text-sm text-neutral-300 hover:text-white disabled:opacity-40 cursor-pointer"
      >
        Back
      </button>

      <div className="text-xs text-neutral-400 tabular-nums cursor-pointer">
        {presentation.currentStep} / {presentation.totalSteps}
      </div>

      <button
        onClick={presentation.next}
        disabled={!presentation.canNext}
        className="px-2 py-1 text-sm text-neutral-300 hover:text-white disabled:opacity-40 cursor-pointer"
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
  );
}
