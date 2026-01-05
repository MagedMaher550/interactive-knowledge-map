"use client";

import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/layouut/AppShell";
import { KnowledgeCanvas } from "@/components/canvas/KnowledgeCanvas";
import { NodePanel } from "@/components/panel/NodePanel";
import { SearchBar } from "@/components/search/SearchBar";

import { knowledgeNodes, knowledgeEdges } from "@/data/knowledge";
import { frontendWorkflowPresentation } from "@/data/presentations/frontend-workflow";
import { usePresentation } from "@/lib/presentation/usePresentation";

import type { KnowledgeGraph } from "@/lib/types";
import { localGraphStorage } from "@/lib/storage/localStorageControl";

export default function Home() {
  const [graph, setGraph] = useState<KnowledgeGraph>({
    nodes: knowledgeNodes,
    edges: knowledgeEdges,
  });

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState<"explore" | "edit">("explore");

  const presentation = usePresentation(frontendWorkflowPresentation.steps);

  useEffect(() => {
    localGraphStorage.load().then((saved) => {
      if (saved) setGraph(saved);
    });
  }, []);

  useEffect(() => {
    localGraphStorage.save(graph);
  }, [graph]);

  useEffect(() => {
    if (mode === "edit" && presentation.isActive) {
      presentation.exit();
    }
  }, [mode, presentation]);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const q = searchQuery.toLowerCase();
    return graph.nodes.filter((n) => n.title.toLowerCase().includes(q));
  }, [searchQuery, graph.nodes]);

  const selectedNode = graph.nodes.find((n) => n.id === selectedNodeId);

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
    </AppShell>
  );
}
