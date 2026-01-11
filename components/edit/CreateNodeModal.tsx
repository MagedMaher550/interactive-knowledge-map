"use client";

import { useEffect, useState } from "react";
import { KnowledgeCategory } from "@/lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: { label: string; category: KnowledgeCategory }) => void;
};

export function CreateNodeModal({ open, onClose, onCreate }: Props) {
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState<KnowledgeCategory>("concept");

  useEffect(() => {
    if (open) {
      setLabel("");
      setCategory("concept");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-neutral-900 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-semibold text-white">Create Node</h2>

        {/* Label */}
        <div className="mb-4">
          <label className="mb-1 block text-sm text-neutral-300">Label</label>
          <input
            autoFocus
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full rounded-lg bg-neutral-800 px-3 py-2 text-white outline-none ring-1 ring-neutral-700 focus:ring-2 focus:ring-indigo-500"
            placeholder="Node title"
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="mb-1 block text-sm text-neutral-300">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as KnowledgeCategory)}
            className="w-full rounded-lg bg-neutral-800 px-3 py-2 text-white outline-none ring-1 ring-neutral-700 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="concept">Concept</option>
            <option value="tool">Tool</option>
            <option value="framework">Framework</option>
            <option value="process">Process</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
          >
            Cancel
          </button>

          <button
            disabled={!label.trim()}
            onClick={() =>
              onCreate({
                label: label.trim(),
                category,
              })
            }
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
