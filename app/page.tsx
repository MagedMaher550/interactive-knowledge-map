"use client";

import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/layouut/AppShell";
import { KnowledgeCanvas } from "@/components/canvas/KnowledgeCanvas";
import { NodePanel } from "@/components/panel/NodePanel";
import { SearchBar } from "@/components/search/SearchBar";
import { CreateNodeModal } from "@/components/edit/CreateNodeModal";
import { PresentationModal } from "@/components/presentation/PresnetationModal";
import { ConfirmDeleteDialogue } from "@/components/panel/ConfirmDeleteDialogue";

import { knowledgeNodes, knowledgeEdges } from "@/data/knowledge";
import { frontendWorkflowPresentation } from "@/data/presentations/frontend-workflow";

import { usePresentation } from "@/lib/presentation/usePresentation";
import { localGraphStorage } from "@/lib/storage/localStorageControl";

import type {
  KnowledgeGraph,
  KnowledgeNode,
  KnowledgeEdge,
  Presentation,
  PresentationStep,
} from "@/lib/types";
import { KnowledgeCategory } from "@/lib/types";

type DeleteStep = "initial" | "presentation" | null;

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

  /* ---------- Delete state ---------- */

  const [deleteState, setDeleteState] = useState<{
    step: DeleteStep;
    nodeId: string | null;
  }>({
    step: null,
    nodeId: null,
  });

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

  const selectedNode =
    graph.nodes.find((n) => n.id === selectedNodeId) ?? null;

  /* ---------- Derived ---------- */

  const existingNodes = graph.nodes.map((n) => ({
    id: n.id,
    title: n.title,
  }));

  const currentOutgoing = selectedNode
    ? graph.edges
      .filter((e) => e.source === selectedNode.id)
      .map((e) => e.target)
    : [];

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

  /* ---------- Node update ---------- */

  const handleUpdateNode = (data: {
    id: string;
    title: string;
    description: string;
    category: KnowledgeCategory;
    connectTo: string[];
  }) => {
    setGraph((prev) => {
      const nodes = prev.nodes.map((n) =>
        n.id === data.id
          ? {
            ...n,
            title: data.title,
            description: data.description,
            category: data.category,
          }
          : n
      );

      const existingOutgoing = prev.edges.filter(
        (e) => e.source === data.id
      );

      const keepEdges = existingOutgoing.filter((e) =>
        data.connectTo.includes(e.target)
      );

      const keepTargets = new Set(keepEdges.map((e) => e.target));

      const newEdges: KnowledgeEdge[] = data.connectTo
        .filter((t) => !keepTargets.has(t))
        .map((target) => ({
          id: crypto.randomUUID(),
          source: data.id,
          target,
        }));

      const edges = [
        ...prev.edges.filter((e) => e.source !== data.id),
        ...keepEdges,
        ...newEdges,
      ];

      return { nodes, edges };
    });
  };

  /* ---------- Presentation usage detection ---------- */

  const getAffectedPresentationSteps = (nodeId: string) => {
    return presentation.steps.filter((step) => {
      if (step.focusNodes.includes(nodeId)) return true;

      return step.focusEdges.some((edgeId) => {
        const edge = graph.edges.find((e) => e.id === edgeId);
        return edge?.source === nodeId || edge?.target === nodeId;
      });
    });
  };

  /* ---------- Final delete executor ---------- */

  const executeDeleteNode = (nodeId: string) => {
    setGraph((prev) => ({
      nodes: prev.nodes.filter((n) => n.id !== nodeId),
      edges: prev.edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      ),
    }));

    setPresentation((prev) => ({
      ...prev,
      steps: prev.steps.map((step) => ({
        ...step,
        focusNodes: step.focusNodes.filter((id) => id !== nodeId),
        focusEdges: step.focusEdges.filter((edgeId) => {
          const edge = graph.edges.find((e) => e.id === edgeId);
          return edge && edge.source !== nodeId && edge.target !== nodeId;
        }),
      })),
    }));

    setSelectedNodeId(null);
    setDeleteState({ step: null, nodeId: null });
  };

  /* ---------- Render ---------- */

  return (
    <>
      <AppShell
        sidePanel={
          selectedNode ? (
            <NodePanel
              node={selectedNode}
              existingNodes={existingNodes}
              currentOutgoing={currentOutgoing}
              onClose={() => setSelectedNodeId(null)}
              onUpdateNode={handleUpdateNode}
              onRequestDelete={(id) =>
                setDeleteState({ step: "initial", nodeId: id })
              }
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
          onOpenPresentation={() => setIsPresentationOpen(true)}
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
          existingNodes={existingNodes}
        />

        <PresentationModal
          open={isPresentationOpen}
          onClose={() => setIsPresentationOpen(false)}
          presentation={presentation}
          allNodes={graph.nodes}
          allEdges={graph.edges}
          onCreateStep={(step: PresentationStep) =>
            setPresentation((p) => ({ ...p, steps: [...p.steps, step] }))
          }
          onRenameStep={(id, title) =>
            setPresentation((p) => ({
              ...p,
              steps: p.steps.map((s) =>
                s.id === id ? { ...s, title } : s
              ),
            }))
          }
          onReorderSteps={(from, to) =>
            setPresentation((p) => {
              const steps = [...p.steps];
              const [moved] = steps.splice(from, 1);
              steps.splice(to, 0, moved);
              return { ...p, steps };
            })
          }
          onDeleteStep={(id) =>
            setPresentation((p) => ({
              ...p,
              steps: p.steps.filter((s) => s.id !== id),
            }))
          }
          onStartPresentation={presentationController.start}
        />
      </AppShell>

      {/* ---------- Delete confirmation dialogs ---------- */}

      <ConfirmDeleteDialogue
        open={deleteState.step === "initial"}
        title="Delete node"
        message="This action cannot be undone. The node and all its connections will be permanently removed."
        onCancel={() => setDeleteState({ step: null, nodeId: null })}
        onConfirm={() => {
          if (!deleteState.nodeId) return;

          const affected = getAffectedPresentationSteps(deleteState.nodeId);

          if (affected.length > 0) {
            setDeleteState({
              step: "presentation",
              nodeId: deleteState.nodeId,
            });
          } else {
            executeDeleteNode(deleteState.nodeId);
          }
        }}
      />

      <ConfirmDeleteDialogue
        open={deleteState.step === "presentation"}
        title="Node used in presentation"
        message={`This node is used in ${deleteState.nodeId
          ? getAffectedPresentationSteps(deleteState.nodeId).length
          : 0
          } presentation step(s). Deleting it will remove it from those steps.`}
        onCancel={() => setDeleteState({ step: null, nodeId: null })}
        onConfirm={() => {
          if (deleteState.nodeId) {
            executeDeleteNode(deleteState.nodeId);
          }
        }}
      />
    </>
  );
}
