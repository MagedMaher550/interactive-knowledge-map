"use client";

import { useMemo } from "react";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";

import { knowledgeNodes, knowledgeEdges } from "@/data/knowledge";
import { layoutKnowledgeNodes } from "./layout";
import { nodeTypes } from "./nodeTypes";
import { CanvasCameraController } from "./CanvasCameraController";
import { CanvasControls } from "./CanvasControls";

type Props = {
  searchQuery: string;
  selectedNodeId: string | null;
  onNodeSelect: (id: string | null) => void;
};

export function KnowledgeCanvas({
  searchQuery,
  selectedNodeId,
  onNodeSelect,
}: Props) {
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

  return (
    <ReactFlow
      nodes={visibleNodes}
      edges={knowledgeEdges}
      nodeTypes={nodeTypes}
      fitView
      onNodeClick={(_, node) => onNodeSelect(node.id)}
      onPaneClick={() => onNodeSelect(null)}
    >
      <Background gap={24} size={1} />
      <CanvasCameraController selectedNodeId={selectedNodeId} />
      <CanvasControls />
    </ReactFlow>
  );
}
