"use client";

import { KnowledgeNode } from "@/lib/types";

interface SearchBarProps {
  query: string;
  results: KnowledgeNode[];
  onChange: (value: string) => void;
  onSelect: (id: string) => void;
}

export function SearchBar({
  query,
  results = [],
  onChange,
  onSelect,
}: SearchBarProps) {
  return (
    <div className="absolute top-4 left-4 z-20 w-[280px]">
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search knowledge…"
        className="
          w-full rounded-xl px-4 py-2 text-sm
          bg-neutral-900 text-white
          border border-neutral-700
          placeholder-neutral-500
          focus:outline-none focus:ring-2 focus:ring-white/20
        "
      />

      {query && results.length > 0 && (
        <div className="mt-2 rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden">
          {results.map((node) => (
            <button
              key={node.id}
              onClick={() => onSelect(node.id)}
              className="
                w-full text-left px-4 py-2 text-sm
                hover:bg-neutral-800
              "
            >
              {node.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
