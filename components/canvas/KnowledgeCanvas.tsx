"use client";

import { useMemo } from "react";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";
import { useRef, useState } from "react";

import { layoutKnowledgeNodes } from "./layout";
import { nodeTypes } from "./nodeTypes";
import { CanvasCameraController } from "./CanvasCameraController";
import { CanvasControls } from "./CanvasControls";
import { usePresentation } from "@/lib/presentation/usePresentation";

import type { KnowledgeNode, KnowledgeEdge } from "@/lib/types";

type PresentationController = ReturnType<typeof usePresentation>;

interface KnowledgeCanvasProps {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
  searchQuery: string;
  selectedNodeId: string | null;
  onNodeSelect: (id: string | null) => void;
  presentation: PresentationController;
  mode: "explore" | "edit";
  onModeChange: (mode: "explore" | "edit") => void;
}

export function KnowledgeCanvas({
  nodes,
  edges,
  searchQuery,
  selectedNodeId,
  onNodeSelect,
  presentation,
  mode,
  onModeChange,
}: KnowledgeCanvasProps) {
  const [isReady, setIsReady] = useState(false);
  const hasInitialFit = useRef(false);

  const connectedNodeIds = useMemo(() => {
    const ids = new Set<string>();
    edges.forEach((e) => {
      ids.add(e.source);
      ids.add(e.target);
    });
    return ids;
  }, [edges]);

  const allNodes = useMemo(
    () => layoutKnowledgeNodes(nodes, connectedNodeIds),
    [nodes, connectedNodeIds]
  );

  const visibleNodes = useMemo(() => {
    if (!searchQuery) return allNodes;
    const q = searchQuery.toLowerCase();

    return allNodes.map((n) => ({
      ...n,
      hidden: !n.data.label.toLowerCase().includes(q),
    }));
  }, [allNodes, searchQuery]);

  const presentationNodes = useMemo(() => {
    if (!presentation.step) return visibleNodes;

    const focus = new Set(presentation.step.focusNodes);

    return visibleNodes.map((n) => ({
      ...n,
      style: focus.has(n.id) ? { opacity: 1 } : { opacity: 0.15 },
      selectable: focus.has(n.id),
    }));
  }, [visibleNodes, presentation.step]);

  const presentationEdges = useMemo(() => {
    if (!presentation.step) return edges;

    const focus = new Set(presentation.step.focusEdges);

    return edges.map((e) => ({
      ...e,
      style: focus.has(e.id)
        ? { strokeWidth: 2, opacity: 1 }
        : { opacity: 0.1 },
    }));
  }, [edges, presentation.step]);

  return (
    <div className="relative w-full h-[100dvh]">
      {!isReady && (
        <div
          className="
      absolute inset-0 z-30
      flex items-center justify-center
      bg-neutral-950
    "
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-neutral-700 border-t-white rounded-full animate-spin" />
            <span className="text-sm text-neutral-400">
              Loading knowledge map…
            </span>
          </div>
        </div>
      )}
      <ReactFlow
        nodes={presentationNodes}
        edges={presentationEdges}
        nodeTypes={nodeTypes}
        onInit={(instance) => {
          if (hasInitialFit.current) return;
          hasInitialFit.current = true;

          instance.fitView({ padding: 0.4, duration: 0 });
          // Allow one paint after fit
          requestAnimationFrame(() => {
            setIsReady(true);
          });
        }}
        onNodeClick={(_, node) => onNodeSelect(node.id)}
        onPaneClick={() => onNodeSelect(null)}
        nodesDraggable={mode === "edit"}
        nodesConnectable={false}
        elementsSelectable
      >
        <Background gap={24} size={1} />

        <CanvasCameraController
          selectedNodeId={selectedNodeId}
          presentationStep={presentation.step}
        />

        <CanvasControls
          presentation={presentation}
          mode={mode}
          onModeChange={onModeChange}
        />
      </ReactFlow>
    </div>
  );
}
