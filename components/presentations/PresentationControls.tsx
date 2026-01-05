"use client";

type Props = {
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
  canNext: boolean;
  canPrev: boolean;
};

export function PresentationControls({
  onNext,
  onPrev,
  onExit,
  canNext,
  canPrev,
}: Props) {
  return (
    <div
      className="
        fixed top-4 right-4 z-30
        flex items-center gap-2
        rounded-2xl
        bg-neutral-900/90 backdrop-blur
        border border-neutral-800
        px-2 py-2
        shadow-lg
      "
    >
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className="
          px-3 py-2 rounded-lg text-sm
          bg-neutral-800 text-neutral-200
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-neutral-700 transition-colors
        "
      >
        Back
      </button>

      <button
        onClick={onNext}
        disabled={!canNext}
        className="
          px-3 py-2 rounded-lg text-sm
          bg-neutral-800 text-neutral-200
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-neutral-700 transition-colors
        "
      >
        Next
      </button>

      <button
        onClick={onExit}
        className="
          px-3 py-2 rounded-lg text-sm
          bg-neutral-800 text-neutral-200
          hover:bg-red-600 hover:text-white
          transition-colors
        "
      >
        Exit
      </button>
    </div>
  );
}
