// src/components/canvas/CanvasCameraController.tsx
"use client";

import { useEffect } from "react";
import { useReactFlow } from "reactflow";

export function CanvasCameraController({
  selectedNodeId,
}: {
  selectedNodeId: string | null;
}) {
  const { setCenter, getNode } = useReactFlow();

  useEffect(() => {
    if (!selectedNodeId) return;

    const node = getNode(selectedNodeId);
    if (!node || !node.width || !node.height) return;

    setCenter(
      node.position.x + node.width / 2,
      node.position.y + node.height / 2,
      {
        zoom: 1.1,
        duration: 400,
      }
    );
  }, [selectedNodeId, getNode, setCenter]);

  return null;
}
