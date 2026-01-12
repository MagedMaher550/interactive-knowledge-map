"use client";

import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/layouut/AppShell";
import { KnowledgeCanvas } from "@/components/canvas/KnowledgeCanvas";
import { NodePanel } from "@/components/panel/NodePanel";
import { SearchBar } from "@/components/search/SearchBar";
import { CreateNodeModal } from "@/components/edit/CreateNodeModal";
import { PresentationModal } from "@/components/presentation/PresnetationModal";

import { knowledgeNodes, knowledgeEdges } from "@/data/knowledge";
import { frontendWorkflowPresentation } from "@/data/presentations/frontend-workflow";

import { usePresentation } from "@/lib/presentation/usePresentation";

import type {
  KnowledgeGraph,
  KnowledgeNode,
  KnowledgeEdge,
  Presentation,
  PresentationStep,
} from "@/lib/types";
import { KnowledgeCategory } from "@/lib/types";

import { localGraphStorage } from "@/lib/storage/localStorageControl";

export default function Home() {
  /* ---------- Graph ---------- */

  const [graph, setGraph] = useState<KnowledgeGraph>({
    nodes: knowledgeNodes,
    edges: knowledgeEdges,
  });

  /* ---------- Presentation ---------- */

  const [presentation, setPresentation] = useState<Presentation>(
    frontendWorkflowPresentation
  );

  const presentationController = usePresentation(presentation.steps);

  /* ---------- UI ---------- */

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState<"explore" | "edit">("explore");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createPosition, setCreatePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  /* ---------- Persistence ---------- */

  useEffect(() => {
    localGraphStorage.load().then((saved) => {
      if (saved) setGraph(saved);
    });
  }, []);

  useEffect(() => {
    localGraphStorage.save(graph);
  }, [graph]);

  /* ---------- Search ---------- */

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const q = searchQuery.toLowerCase();
    return graph.nodes.filter((n) => n.title.toLowerCase().includes(q));
  }, [searchQuery, graph.nodes]);

  const selectedNode = graph.nodes.find((n) => n.id === selectedNodeId) ?? null;

  /* ---------- Node creation ---------- */

  const handleCreateNode = (data: {
    title: string;
    description: string;
    category: KnowledgeCategory;
    connectTo: string[];
  }) => {
    if (!createPosition) return;

    const id = crypto.randomUUID();

    const newNode: KnowledgeNode = {
      id,
      title: data.title,
      description: data.description,
      category: data.category,
    };

    const newEdges: KnowledgeEdge[] = data.connectTo.map((target) => ({
      id: crypto.randomUUID(),
      source: id,
      target,
    }));

    setGraph((prev) => ({
      nodes: [...prev.nodes, newNode],
      edges: [...prev.edges, ...newEdges],
    }));

    setIsCreateOpen(false);
    setCreatePosition(null);
  };

  /* ---------- Presentation handlers ---------- */

  const handleCreateStep = (step: PresentationStep) => {
    setPresentation((prev) => ({
      ...prev,
      steps: [...prev.steps, step],
    }));
  };

  const handleRenameStep = (stepId: string, title: string) => {
    setPresentation((prev) => ({
      ...prev,
      steps: prev.steps.map((s) => (s.id === stepId ? { ...s, title } : s)),
    }));
  };

  const handleReorderSteps = (from: number, to: number) => {
    setPresentation((prev) => {
      const steps = [...prev.steps];
      const [moved] = steps.splice(from, 1);
      steps.splice(to, 0, moved);
      return { ...prev, steps };
    });
  };

  const handleDeleteStep = (stepId: string) => {
    setPresentation((prev) => ({
      ...prev,
      steps: prev.steps.filter((s) => s.id !== stepId),
    }));
  };

  /* ---------- Render ---------- */

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
        presentation={presentationController}
        mode={mode}
        onModeChange={setMode}
        onRequestCreateNode={(pos) => {
          setCreatePosition(pos);
          setIsCreateOpen(true);
        }}
        // onOpenPresentation={() => setIsPresentationOpen(true)}
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
        existingNodes={graph.nodes.map((n) => ({
          id: n.id,
          title: n.title,
        }))}
      />

      <PresentationModal
        open={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        presentation={presentation}
        allNodes={graph.nodes}
        allEdges={graph.edges}
        onCreateStep={handleCreateStep}
        onRenameStep={handleRenameStep}
        onReorderSteps={handleReorderSteps}
        onDeleteStep={handleDeleteStep}
        onStartPresentation={presentationController.start}
      />
    </AppShell>
  );
}
