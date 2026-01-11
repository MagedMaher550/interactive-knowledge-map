"use client";

import { useEffect, useState } from "react";
import { KnowledgeCategory } from "@/lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: {
    title: string;
    description: string;
    category: KnowledgeCategory;
  }) => void;
};

export function CreateNodeModal({ open, onClose, onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<KnowledgeCategory>("concept");

  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
      setCategory("concept");
    }
  }, [open]);

  if (!open) return null;

  const canCreate = title.trim().length > 0;

  const submit = () => {
    if (!canCreate) return;
    onCreate({
      title: title.trim(),
      description: description.trim(),
      category,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-neutral-900 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
        }}
      >
        <h2 className="mb-4 text-lg font-semibold text-white">Create Node</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="mb-1 block text-sm text-neutral-300">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg bg-neutral-800 px-3 py-2 text-white outline-none ring-1 ring-neutral-700 focus:ring-2 focus:ring-indigo-500"
            placeholder="Node title"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="mb-1 block text-sm text-neutral-300">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-lg bg-neutral-800 px-3 py-2 text-white outline-none ring-1 ring-neutral-700 focus:ring-2 focus:ring-indigo-500"
            placeholder="Optional explanation or notes"
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
            disabled={!canCreate}
            onClick={submit}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            Create
          </button>
        </div>

        <p className="mt-3 text-xs text-neutral-500">
          Tip: <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>Enter</kbd> to create
        </p>
      </div>
    </div>
  );
}
