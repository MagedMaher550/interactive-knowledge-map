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
    <div className="relative w-full h-full bg-neutral-950 dark:bg-neutral-950 bg-neutral-50">
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
        <CanvasControls />
        <Background gap={32} size={1} color="#2a2a2a" />
      </ReactFlow>
    </div>
  );
}

/**
 * Bottom-center custom controls.
 * Product-grade replacement for React Flow Controls.
 */
function CanvasControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div
      className="
        absolute bottom-6 left-1/2 -translate-x-1/2
        z-20
        flex items-center gap-2
        rounded-2xl
        bg-neutral-900/90 backdrop-blur
        border border-neutral-800
        px-2 py-2
        shadow-lg
      "
    >
      <ControlButton onClick={() => zoomOut()} label="−" />
      <ControlButton onClick={() => fitView({ padding: 0.4 })} label="⤢" />
      <ControlButton onClick={() => zoomIn()} label="+" />
    </div>
  );
}

function ControlButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="
        w-9 h-9
        flex items-center justify-center
        rounded-xl
        text-sm font-medium
        text-neutral-200
        bg-neutral-800
        hover:bg-neutral-700
        transition-colors
      "
    >
      {label}
    </button>
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
