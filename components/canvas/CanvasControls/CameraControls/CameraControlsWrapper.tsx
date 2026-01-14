import React, { ReactNode, Ref } from "react";

export default function CameraControlsWrapper({
  children,
  cameraGroupRef,
}: {
  children: ReactNode;
  cameraGroupRef: Ref<HTMLDivElement> | undefined;
}) {
  return (
    <div ref={cameraGroupRef} className="relative flex items-center">
      {children}
    </div>
  );
}
