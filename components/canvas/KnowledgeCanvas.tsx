"use client";

import { useMemo } from "react";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";

import { knowledgeNodes, knowledgeEdges } from "@/data/knowledge";
import { layoutKnowledgeNodes } from "./layout";
import { nodeTypes } from "./nodeTypes";
import { CanvasCameraController } from "./CanvasCameraController";
import { CanvasControls } from "./CanvasControls";
import { usePresentation } from "@/lib/presentation/usePresentation";

type PresentationController = ReturnType<typeof usePresentation>;

interface KnowledgeCanvasProps {
  searchQuery: string;
  selectedNodeId: string | null;
  onNodeSelect: (id: string | null) => void;
  presentation: PresentationController;
}

export function KnowledgeCanvas({
  searchQuery,
  selectedNodeId,
  onNodeSelect,
  presentation,
}: KnowledgeCanvasProps) {
  const connectedNodeIds = useMemo(() => {
    const ids = new Set<string>();
    knowledgeEdges.forEach((edge) => {
      ids.add(edge.source);
      ids.add(edge.target);
    });
    return ids;
  }, []);

  const allNodes = useMemo(
    () => layoutKnowledgeNodes(knowledgeNodes, connectedNodeIds),
    [connectedNodeIds]
  );

  const visibleNodes = useMemo(() => {
    if (!searchQuery) return allNodes;

    const q = searchQuery.toLowerCase();

    return allNodes.map((node) => ({
      ...node,
      hidden: !node.data.label.toLowerCase().includes(q),
    }));
  }, [allNodes, searchQuery]);

  const presentationNodes = useMemo(() => {
    if (!presentation.step) return visibleNodes;

    const focusSet = new Set(presentation.step.focusNodes);

    return visibleNodes.map((node) => ({
      ...node,
      style: focusSet.has(node.id) ? { opacity: 1 } : { opacity: 0.15 },
      selectable: focusSet.has(node.id),
    }));
  }, [visibleNodes, presentation.step]);

  const presentationEdges = useMemo(() => {
    if (!presentation.step) return knowledgeEdges;

    const focusSet = new Set(presentation.step.focusEdges);

    return knowledgeEdges.map((edge) => ({
      ...edge,
      style: focusSet.has(edge.id)
        ? { strokeWidth: 2, opacity: 1 }
        : { opacity: 0.1 },
    }));
  }, [presentation.step]);

  return (
    <div className="relative w-full" style={{ height: "100dvh" }}>
      <ReactFlow
        nodes={presentationNodes}
        edges={presentationEdges}
        nodeTypes={nodeTypes}
        fitView
        onNodeClick={(_, node) => onNodeSelect(node.id)}
        onPaneClick={() => onNodeSelect(null)}
        nodesDraggable={!presentation.isActive}
        nodesConnectable={false}
        elementsSelectable={!presentation.isActive}
      >
        <Background gap={24} size={1} />

        <CanvasCameraController
          selectedNodeId={selectedNodeId}
          presentationStep={presentation.step}
        />

        <CanvasControls presentation={presentation} />
      </ReactFlow>
    </div>
  );
}
