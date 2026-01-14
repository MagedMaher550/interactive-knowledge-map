import React from "react";
import { ControlButton } from "../ControlButton";

interface ButtonProp {
  onClick: () => void;
}

export function CreateBtn({ onClick }: ButtonProp) {
  return (
    <ControlButton onClick={onClick}>
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
  );
}

export function EditBtn({
  onClick,
  mode,
}: ButtonProp & {
  mode: "explore" | "edit";
}) {
  return (
    <button
      onClick={onClick}
      className={`
      cursor-pointer
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
  );
}

export function PresentBtn({ onClick }: ButtonProp) {
  return (
    <button
      onClick={onClick}
      className="
    cursor-pointer
    h-9 px-3 rounded-xl
    text-sm font-medium
    text-white bg-indigo-600/90
    hover:bg-indigo-500 transition-colors
  "
    >
      Present
    </button>
  );
}

export function PresentationBtn({ onClick }: ButtonProp) {
  return (
    <button
      onClick={onClick}
      className="
      cursor-pointer
      h-9 px-3 rounded-xl
      flex items-center gap-2
      text-sm font-medium border transition-colors
      bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white
    "
    >
      Presentation
    </button>
  );
}
