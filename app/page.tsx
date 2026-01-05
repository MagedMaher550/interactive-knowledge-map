"use client";

import { useState, useMemo } from "react";
import { AppShell } from "@/components/layouut/AppShell";
import { KnowledgeCanvas } from "@/components/canvas/KnowledgeCanvas";
import { NodePanel } from "@/components/panel/NodePanel";
import { SearchBar } from "@/components/search/SearchBar";
import { knowledgeNodes } from "@/data/knowledge";

export default function Home() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
        onNodeSelect={setSelectedNodeId} // ✅ THIS WAS MISSING
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
