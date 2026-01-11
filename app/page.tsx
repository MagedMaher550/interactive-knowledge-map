"use client";

import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/layouut/AppShell";
import { KnowledgeCanvas } from "@/components/canvas/KnowledgeCanvas";
import { NodePanel } from "@/components/panel/NodePanel";
import { SearchBar } from "@/components/search/SearchBar";
import { CreateNodeModal } from "@/components/edit/CreateNodeModal";

import { knowledgeNodes, knowledgeEdges } from "@/data/knowledge";
import { frontendWorkflowPresentation } from "@/data/presentations/frontend-workflow";
import { usePresentation } from "@/lib/presentation/usePresentation";

import type { KnowledgeGraph, KnowledgeNode } from "@/lib/types";
import { KnowledgeCategory } from "@/lib/types";
import { localGraphStorage } from "@/lib/storage/localStorageControl";

export default function Home() {
  const [graph, setGraph] = useState<KnowledgeGraph>({
    nodes: knowledgeNodes,
    edges: knowledgeEdges,
  });

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState<"explore" | "edit">("explore");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createPosition, setCreatePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const presentation = usePresentation(frontendWorkflowPresentation.steps);

  /* ---------- Persistence ---------- */

  useEffect(() => {
    localGraphStorage.load().then((saved) => {
      if (saved) setGraph(saved);
    });
  }, []);

  useEffect(() => {
    localGraphStorage.save(graph);
  }, [graph]);

  /* ---------- Mode / Presentation Guard ---------- */

  useEffect(() => {
    if (mode === "edit" && presentation.isActive) {
      presentation.exit();
    }
  }, [mode, presentation]);

  /* ---------- Search ---------- */

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const q = searchQuery.toLowerCase();
    return graph.nodes.filter((n) => n.title.toLowerCase().includes(q));
  }, [searchQuery, graph.nodes]);

  const selectedNode = graph.nodes.find((n) => n.id === selectedNodeId);

  /* ---------- Node Creation ---------- */

  const handleCreateNode = (data: {
    label: string;
    category: KnowledgeCategory;
  }) => {
    if (!createPosition) return;

    const newNode: KnowledgeNode = {
      id: crypto.randomUUID(),
      title: data.label,
      description: "random for now", 
      category: data.category, 
      
    };

    setGraph((prev) => ({
      ...prev,
      nodes: [...prev.nodes, newNode],
    }));

    // setSelectedNodeId(newNode.id);
    setIsCreateOpen(false);
    setCreatePosition(null);
  };

  return (
    <AppShell
      sidePanel={
        selectedNode ? (
          <NodePanel
            node={selectedNode}
            onClose={() => setSelectedNodeId(null)}
          />
        ) : null
      }
    >
      <KnowledgeCanvas
        nodes={graph.nodes}
        edges={graph.edges}
        searchQuery={searchQuery}
        selectedNodeId={selectedNodeId}
        onNodeSelect={setSelectedNodeId}
        presentation={presentation}
        mode={mode}
        onModeChange={setMode}
        onRequestCreateNode={(position) => {
          setCreatePosition(position);
          setIsCreateOpen(true);
        }}
      />

      <SearchBar
        query={searchQuery}
        results={searchResults}
        onChange={setSearchQuery}
        onSelect={(id) => {
          setSelectedNodeId(id);
          setSearchQuery("");
        }}
      />

      <CreateNodeModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateNode}
      />
    </AppShell>
  );
}
