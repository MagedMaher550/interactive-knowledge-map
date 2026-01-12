"use client";

import { useEffect, useMemo, useState } from "react";
import { KnowledgeCategory } from "@/lib/types";
import { MultiSelect } from "@/components/ui/MultiSelect";

type ExistingNode = {
  id: string;
  title: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: {
    title: string;
    description: string;
    category: KnowledgeCategory;
    connectTo: string[];
  }) => void;
  existingNodes: ExistingNode[];
};

export function CreateNodeModal({
  open,
  onClose,
  onCreate,
  existingNodes,
}: Props) {
  /* ---------- State (always run) ---------- */

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<KnowledgeCategory>("concept");
  const [connectTo, setConnectTo] = useState<string[]>([]);

  /* ---------- Reset on open ---------- */

  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
      setCategory("concept");
      setConnectTo([]);
    }
  }, [open]);

  /* ---------- Derived ---------- */

  const canCreate = title.trim().length > 0;

  const nodeOptions = useMemo(
    () =>
      existingNodes.map((n) => ({
        value: n.id,
        label: n.title,
      })),
    [existingNodes]
  );

  /* ---------- Early return AFTER hooks ---------- */

  if (!open) return null;

  /* ---------- Submit ---------- */

  const submit = () => {
    if (!canCreate) return;

    onCreate({
      title: title.trim(),
      description: description.trim(),
      category,
      connectTo,
    });
  };

  /* ---------- UI ---------- */

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
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) submit();
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
            className="
              w-full rounded-lg bg-neutral-800
              px-3 py-2 text-white
              outline-none ring-1 ring-neutral-700
              focus:ring-2 focus:ring-indigo-500
            "
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="mb-1 block text-sm text-neutral-300">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="
              w-full resize-none rounded-lg
              bg-neutral-800 px-3 py-2
              text-white outline-none
              ring-1 ring-neutral-700
              focus:ring-2 focus:ring-indigo-500
            "
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
            className="
              w-full rounded-lg bg-neutral-800
              px-3 py-2 text-white
              ring-1 ring-neutral-700
            "
          >
            <option value="concept">Concept</option>
            <option value="tool">Tool</option>
            <option value="framework">Framework</option>
            <option value="process">Process</option>
          </select>
        </div>

        {/* Connections */}
        {existingNodes.length > 0 && (
          <div className="mb-6">
            <label className="mb-1 block text-sm text-neutral-300">
              Connect this node to (optional)
            </label>

            <MultiSelect
              value={connectTo}
              options={nodeOptions}
              placeholder="Select nodes…"
              onChange={setConnectTo}
            />

            <p className="mt-2 text-xs text-neutral-500">
              Connections will go <strong>from this node</strong> to selected
              nodes.
            </p>
          </div>
        )}

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
            className="
              rounded-lg bg-indigo-600
              px-4 py-2 text-sm font-medium
              text-white disabled:opacity-40
            "
          >
            Create
          </button>
        </div>

        <p className="mt-3 text-xs text-neutral-500">
          Tip: Ctrl / ⌘ + Enter to create
        </p>
      </div>
    </div>
  );
}
