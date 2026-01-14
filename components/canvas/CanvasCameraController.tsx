"use client";

import { useEffect } from "react";
import { useReactFlow } from "reactflow";
import type { PresentationStep } from "@/lib/types";

type Props = {
  selectedNodeId: string | null;
  presentationStep?: PresentationStep;
};

export function CanvasCameraController({
  selectedNodeId,
  presentationStep,
}: Props) {
  const { getNodes, setCenter } = useReactFlow();

  /**
   * EXPLORE MODE
   * Center camera on manually selected node
   * Disabled when presentation mode is active
   */
  useEffect(() => {
    if (!selectedNodeId) return;
    if (presentationStep) return;

    const node = getNodes().find((n) => n.id === selectedNodeId);
    if (!node || !node.width || !node.height) return;

    setCenter(
      node.position.x + node.width / 2,
      node.position.y + node.height / 2,
      {
        zoom: 1.1,
        duration: 300,
      }
    );
  }, [selectedNodeId, presentationStep, getNodes, setCenter]);

  /**
   * PRESENTATION MODE
   * Fit camera to focused nodes
   */
  useEffect(() => {
    if (!presentationStep) return;

    const nodes = getNodes().filter((n) =>
      presentationStep.focusNodes.includes(n.id)
    );

    if (nodes.length === 0) return;

    const minX = Math.min(...nodes.map((n) => n.position.x));
    const maxX = Math.max(...nodes.map((n) => n.position.x + (n.width ?? 0)));
    const minY = Math.min(...nodes.map((n) => n.position.y));
    const maxY = Math.max(...nodes.map((n) => n.position.y + (n.height ?? 0)));

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    // Viewport size (in graph units)
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const boundsWidth = maxX - minX;
    const boundsHeight = maxY - minY;

    // Required zoom to fit bounds
    const zoomX = viewportWidth / boundsWidth;
    const zoomY = viewportHeight / boundsHeight;

    const requiredZoom = Math.min(zoomX, zoomY) * 0.8; // padding

    requestAnimationFrame(() => {
      setCenter(centerX, centerY, {
        zoom: Math.min(1, requiredZoom), // only zoom OUT
        duration: 600,
      });
    });
  }, [presentationStep, getNodes, setCenter]);

  return null;
}
