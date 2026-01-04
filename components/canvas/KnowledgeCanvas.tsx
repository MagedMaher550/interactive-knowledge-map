"use client";

import { useEffect } from "react";
import ReactFlow, {
  Background,
  Node,
  Edge,
  NodeMouseHandler,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import { knowledgeNodes, knowledgeEdges } from "@/data/knowledge";
import { nodeTypes } from "./nodeTypes";

interface KnowledgeCanvasProps {
  selectedNodeId: string | null;
  onSelectNode: (id: string | null) => void;
  searchQuery: string;
}

/**
 * Fixed column-based layout.
 * X axis = meaning
 * Y axis = spacing only
 */
const columnX: Record<string, number> = {
  framework: 0,
  tool: 360,
  concept: 720,
  process: 1080,
};

export function KnowledgeCanvas({
  selectedNodeId,
  onSelectNode,
  searchQuery,
}: KnowledgeCanvasProps) {
  const nodes: Node[] = knowledgeNodes.map((node, index) => {
    const matchesSearch =
      !searchQuery ||
      node.title.toLowerCase().includes(searchQuery.toLowerCase());

    return {
      id: node.id,
      type: "knowledge",
      position: {
        x: columnX[node.category],
        y: index * 140,
      },
      data: {
        label: node.title,
        category: node.category,
      },
      selected: node.id === selectedNodeId,
      className: !matchesSearch
        ? "opacity-20"
        : selectedNodeId && node.id !== selectedNodeId
        ? "opacity-40"
        : "",
    };
  });

  const edges: Edge[] = knowledgeEdges.map((edge) => ({
    ...edge,
    type: "step",
    style: {
      stroke: selectedNodeId
        ? edge.source === selectedNodeId || edge.target === selectedNodeId
          ? "#71717a"
          : "#27272a"
        : "#3f3f46",
      strokeWidth: 1.5,
    },
  }));

  const handleNodeClick: NodeMouseHandler = (_, node) => {
    onSelectNode(node.id);
  };

  return (
    <div className="w-full h-full bg-neutral-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        onPaneClick={() => onSelectNode(null)}
        fitView
        fitViewOptions={{ padding: 0.4 }}
      >
        <CanvasCameraController selectedNodeId={selectedNodeId} />

        <Background variant="dots" gap={32} size={1} color="#2a2a2a" />
      </ReactFlow>
    </div>
  );
}

/**
 * Handles viewport centering.
 * MUST be rendered inside <ReactFlow />.
 */
function CanvasCameraController({
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
