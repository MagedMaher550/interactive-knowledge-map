import React from "react";

type ControlsWrapperProps = {
  children: React.ReactNode;
};

export default function ControlsWrapper({ children }: ControlsWrapperProps) {
  return (
    <div
      className="
        z-20
        fixed md:absolute
        left-1/2 -translate-x-1/2
        bottom-[calc(env(safe-area-inset-bottom)+0.75rem)]
        bg-neutral-900/90 backdrop-blur
        border border-neutral-800
        shadow-lg
        rounded-2xl
        flex justify-center
        w-fit
        touch-manipulation
        md:max-w-none
      "
    >
      {children}
    </div>
  );
}
