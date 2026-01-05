"use client";

import { useState, useMemo } from "react";
import { AppShell } from "@/components/layouut/AppShell";
import { KnowledgeCanvas } from "@/components/canvas/KnowledgeCanvas";
import { NodePanel } from "@/components/panel/NodePanel";
import { SearchBar } from "@/components/search/SearchBar";
import { knowledgeNodes } from "@/data/knowledge";
import { frontendWorkflowPresentation } from "@/data/presentations/frontend-workflow";
import { usePresentation } from "@/lib/presentation/usePresentation";

export default function Home() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const presentation = usePresentation(frontendWorkflowPresentation.steps);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const q = searchQuery.toLowerCase();
    return knowledgeNodes.filter((n) => n.title.toLowerCase().includes(q));
  }, [searchQuery]);

  const selectedNode = knowledgeNodes.find(
    (node) => node.id === selectedNodeId
  );

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
        searchQuery={searchQuery}
        selectedNodeId={selectedNodeId}
        onNodeSelect={setSelectedNodeId}
        presentation={presentation}
      />

      {/* {presentationIndex !== null && (
        <PresentationControls
          onNext={() =>
            setPresentationIndex((i) =>
              i !== null
                ? Math.min(i + 1, frontendWorkflowPresentation.steps.length - 1)
                : i
            )
          }
          onPrev={() =>
            setPresentationIndex((i) => (i !== null ? Math.max(i - 1, 0) : i))
          }
          onExit={() => setPresentationIndex(null)}
          canNext={
            presentationIndex < frontendWorkflowPresentation.steps.length - 1
          }
          canPrev={presentationIndex > 0}
        />
      )}

      {presentationIndex === null && (
        <button
          onClick={() => setPresentationIndex(0)}
          className="
      fixed top-4 left-4 z-30
      px-4 py-2 rounded-xl
      bg-indigo-600 text-white
      hover:bg-indigo-500 transition-colors
    "
        >
          Start Presentation
        </button>
      )} */}

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
