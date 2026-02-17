"use client";

import { useState, useRef, useEffect } from "react";
import { CanvasControlsProps } from "./types";
import ControlsWrapper from "./ControlsWrapper";
import PresnetationControls from "./PresnetationControls";
import CameraControlsWrapper from "./CameraControls/CameraControlsWrapper";
import CameraControls from "./CameraControls";
import CameraControlsAnchor from "./CameraControls/CameraControlsAnchor";
import {
  CreateBtn,
  PresentationBtn,
  PresentBtn,
} from "./CameraControls/buttons";
import { useViewportWidth } from "@/lib/use-viewport-width";

export function CanvasControls({
  presentation,
  onCreateNode,
  onOpenPresentation,
}: CanvasControlsProps) {
  const width = useViewportWidth();
  const isPresenting = presentation.isActive;

  const [cameraOpen, setCameraOpen] = useState(false);
  const cameraGroupRef = useRef<HTMLDivElement | null>(null);

  /* ---------- Outside click ---------- */
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
    <ControlsWrapper>
      {/* ================= PRESENTATION MODE ================= */}
      {isPresenting && (
        <PresnetationControls presentation={presentation} />
      )}

      {/* ================= NORMAL MODE ================= */}
      {!isPresenting && (
        <div className="flex items-center gap-2 px-3 py-2">
          {/* CAMERA GROUP */}
          <CameraControlsWrapper cameraGroupRef={cameraGroupRef}>
            <CameraControls cameraOpen={cameraOpen} />
            <CameraControlsAnchor setCameraOpen={setCameraOpen} />
          </CameraControlsWrapper>

          <div className="w-px h-6 bg-neutral-700 mx-1" />

          {/* CREATE */}
          <CreateBtn onClick={onCreateNode} />

          {/* PRESENT (desktop only) */}
          {width > 640 && (
            <PresentBtn onClick={presentation.start} />
          )}

          {/* PRESENTATION BUILDER */}
          <PresentationBtn onClick={onOpenPresentation} />
        </div>
      )}
    </ControlsWrapper>
  );
}
