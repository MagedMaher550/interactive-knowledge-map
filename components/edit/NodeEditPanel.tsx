"use client";

import { useEffect, useMemo, useState } from "react";
import { KnowledgeCategory, KnowledgeNode } from "@/lib/types";
import { MultiSelect } from "@/components/ui/MultiSelect";

type ExistingNode = {
    id: string;
    title: string;
};

type Props = {
    open: boolean;
    node: KnowledgeNode | null;
    existingNodes: ExistingNode[];
    currentOutgoing: string[];
    onClose: () => void;
    onUpdate: (data: {
        id: string;
        title: string;
        description: string;
        category: KnowledgeCategory;
        connectTo: string[];
    }) => void;
};

export function EditNodeModal({
    open,
    node,
    existingNodes,
    currentOutgoing,
    onClose,
    onUpdate,
}: Props) {
    /* ---------- State (always run) ---------- */

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<KnowledgeCategory>("concept");
    const [connectTo, setConnectTo] = useState<string[]>([]);

    /* ---------- Sync on open ---------- */

    useEffect(() => {
        if (!open || !node) return;

        setTitle(node.title);
        setDescription(node.description ?? "");
        setCategory(node.category);
        setConnectTo(currentOutgoing);
    }, [open, node, currentOutgoing]);

    /* ---------- Derived ---------- */

    const canSave = title.trim().length > 0 && !!node;

    const nodeOptions = useMemo(() => {
        if (!existingNodes || !node) return [];
      
        return existingNodes
          .filter((n) => n.id !== node.id)
          .map((n) => ({
            value: n.id,
            label: n.title,
          }));
      }, [existingNodes, node]);
      

    /* ---------- Early return AFTER hooks ---------- */

    if (!open || !node) return null;

    /* ---------- Submit ---------- */

    const submit = () => {
        if (!canSave) return;

        onUpdate({
            id: node.id,
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
                <h2 className="mb-4 text-lg font-semibold text-white">
                    Edit Node
                </h2>

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
                <div className="mb-4">
                    <label className="mb-1 block text-sm text-neutral-300">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value as KnowledgeCategory)
                        }
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

                {/* Relations */}
                {nodeOptions.length > 0 && (
                    <div className="mb-6">
                        <label className="mb-1 block text-sm text-neutral-300">
                            Connect this node to
                        </label>

                        <MultiSelect
                            value={connectTo}
                            options={nodeOptions}
                            placeholder="Select nodes…"
                            onChange={setConnectTo}
                        />

                        <p className="mt-2 text-xs text-neutral-500">
                            Connections go <strong>from this node</strong> to selected nodes.
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
                        disabled={!canSave}
                        onClick={submit}
                        className="
              rounded-lg bg-indigo-600
              px-4 py-2 text-sm font-medium
              text-white disabled:opacity-40
            "
                    >
                        Save
                    </button>
                </div>

                <p className="mt-3 text-xs text-neutral-500">
                    Tip: Ctrl / ⌘ + Enter to save
                </p>
            </div>
        </div>
    );
}
