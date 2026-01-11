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

import type {
  KnowledgeGraph,
  KnowledgeNode,
  KnowledgeEdge,
  Presentation,
} from "@/lib/types";
import { KnowledgeCategory } from "@/lib/types";

import { localGraphStorage } from "@/lib/storage/localStorageControl";
import { localPresentationStorage } from "@/lib/storage/localPresentationStorage";

export default function Home() {
  /* ---------- Graph ---------- */

  const [graph, setGraph] = useState<KnowledgeGraph>({
    nodes: knowledgeNodes,
    edges: knowledgeEdges,
  });

  /* ---------- Presentation ---------- */

  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [activePresentationId, setActivePresentationId] = useState<
    string | null
  >(null);

  const activePresentation = presentations.find(
    (p) => p.id === activePresentationId
  );

  const presentation = usePresentation(activePresentation?.steps ?? []);

  /* ---------- UI State ---------- */

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState<"explore" | "edit">("explore");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createPosition, setCreatePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  /* ---------- Persistence: Graph ---------- */

  useEffect(() => {
    localGraphStorage.load().then((saved) => {
      if (saved) setGraph(saved);
    });
  }, []);

  useEffect(() => {
    localGraphStorage.save(graph);
  }, [graph]);

  /* ---------- Persistence: Presentation ---------- */

  useEffect(() => {
    localPresentationStorage.load().then((saved) => {
      if (saved && saved.length > 0) {
        setPresentations(saved);
        setActivePresentationId(saved[0].id);
      } else {
        // Seed from code once
        setPresentations([frontendWorkflowPresentation]);
        setActivePresentationId(frontendWorkflowPresentation.id);
      }
    });
  }, []);

  useEffect(() => {
    if (presentations.length > 0) {
      localPresentationStorage.save(presentations);
    }
  }, [presentations]);

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

  /* ---------- Create Node + Edges ---------- */

  const handleCreateNode = (data: {
    title: string;
    description: string;
    category: KnowledgeCategory;
    connectTo: string[];
  }) => {
    if (!createPosition) return;

    const nodeId = crypto.randomUUID();

    const newNode: KnowledgeNode = {
      id: nodeId,
      title: data.title,
      description: data.description,
      category: data.category,
    };

    const newEdges: KnowledgeEdge[] = data.connectTo.map((targetId) => ({
      id: crypto.randomUUID(),
      source: nodeId,
      target: targetId,
    }));

    setGraph((prev) => ({
      nodes: [...prev.nodes, newNode],
      edges: [...prev.edges, ...newEdges],
    }));

    setIsCreateOpen(false);
    setCreatePosition(null);
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
        existingNodes={graph.nodes.map((n) => ({
          id: n.id,
          title: n.title,
        }))}
      />
    </AppShell>
  );
}
