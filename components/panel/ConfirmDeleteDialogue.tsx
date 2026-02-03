"use client";

interface ConfirmDeleteDialogueProps {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmDeleteDialogue({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}: ConfirmDeleteDialogueProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-neutral-900 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-3 text-lg font-semibold text-white">
          {title}
        </h2>

        <p className="mb-6 text-sm text-neutral-300 leading-relaxed">
          {message}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg bg-neutral-800 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-700"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-600/30"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
