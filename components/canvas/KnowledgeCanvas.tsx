"use client";

import ReactFlow, { Background, Node, Edge, NodeMouseHandler } from "reactflow";
import "reactflow/dist/style.css";

import { knowledgeNodes, knowledgeEdges } from "@/data/knowledge";
import { nodeTypes } from "./nodeTypes";
import { columnX } from "./layout";
import { CanvasCameraController } from "./CanvasCameraController";
import { CanvasControls } from "./CanvasControls";

interface KnowledgeCanvasProps {
  selectedNodeId: string | null;
  onSelectNode: (id: string | null) => void;
  searchQuery: string;
}

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
