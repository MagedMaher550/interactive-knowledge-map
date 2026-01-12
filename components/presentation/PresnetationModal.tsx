"use client";

import { useState, useMemo } from "react";
import type {
  Presentation,
  PresentationStep,
  KnowledgeNode,
  KnowledgeEdge,
} from "@/lib/types";
import { MultiSelect } from "@/components/ui/MultiSelect";

type Props = {
  open: boolean;
  onClose: () => void;

  presentation: Presentation;
  allNodes?: KnowledgeNode[];
  allEdges?: KnowledgeEdge[];

  onCreateStep: (step: PresentationStep) => void;
  onReorderSteps: (from: number, to: number) => void;
  onRenameStep: (stepId: string, title: string) => void;
  onDeleteStep: (stepId: string) => void;

  onStartPresentation: () => void;
};

export function PresentationModal({
  open,
  onClose,
  presentation,
  allNodes = [],
  allEdges = [],
  onCreateStep,
  onReorderSteps,
  onRenameStep,
  onDeleteStep,
  onStartPresentation,
}: Props) {
  /* ---------- State ---------- */

  const [draftTitle, setDraftTitle] = useState("");
  const [draftNodes, setDraftNodes] = useState<string[]>([]);

  const canCreate = draftTitle.trim().length > 0 && draftNodes.length > 0;

  /* ---------- Derived ---------- */

  const derivedEdges = useMemo(() => {
    if (!allEdges.length) return [];
    return allEdges
      .filter(
        (e) => draftNodes.includes(e.source) && draftNodes.includes(e.target)
      )
      .map((e) => e.id);
  }, [allEdges, draftNodes]);

  const nodeOptions = useMemo(
    () =>
      allNodes.map((n) => ({
        value: n.id,
        label: n.title,
      })),
    [allNodes]
  );

  /* ---------- Render guard ---------- */

  if (!open) return null;

  /* ---------- UI ---------- */

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="
          w-full max-w-xl
          max-h-[85dvh]
          rounded-2xl bg-neutral-900
          flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-lg font-semibold text-white">
            Presentation: {presentation.title}
          </h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Steps */}
          <div className="space-y-2">
            {presentation.steps.map((step, index) => (
              <div
                key={step.id}
                className="
                  flex items-center gap-2
                  rounded-xl bg-neutral-800/70 px-3 py-2
                  border border-neutral-700/60
                "
              >
                {/* Reorder */}
                <div className="flex flex-col">
                  <button
                    disabled={index === 0}
                    onClick={() => onReorderSteps(index, index - 1)}
                    className="text-xs text-neutral-400 disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    disabled={index === presentation.steps.length - 1}
                    onClick={() => onReorderSteps(index, index + 1)}
                    className="text-xs text-neutral-400 disabled:opacity-30"
                  >
                    ↓
                  </button>
                </div>

                {/* Title */}
                <input
                  value={step.title}
                  onChange={(e) => onRenameStep(step.id, e.target.value)}
                  className="
                    flex-1 bg-transparent
                    text-sm text-white outline-none
                  "
                />

                {/* Delete */}
                <button
                  onClick={() => onDeleteStep(step.id)}
                  className="text-neutral-400 hover:text-red-400"
                  title="Delete step"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* New Step */}
          <div className="border-t border-neutral-800 pt-4 space-y-4">
            <h3 className="text-sm font-medium text-neutral-300">New Step</h3>

            {/* Title */}
            <input
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              placeholder="Step title"
              className="
                w-full rounded-lg
                bg-neutral-800 px-3 py-2
                text-sm text-white outline-none
              "
            />

            {/* Focus nodes */}
            <div>
              <label className="mb-1 block text-xs text-neutral-400">
                Focus nodes
              </label>

              <MultiSelect
                value={draftNodes}
                options={nodeOptions}
                placeholder="Select nodes…"
                onChange={setDraftNodes}
              />
            </div>

            {/* Create */}
            <button
              disabled={!canCreate}
              onClick={() => {
                onCreateStep({
                  id: crypto.randomUUID(),
                  title: draftTitle.trim(),
                  focusNodes: draftNodes,
                  focusEdges: derivedEdges,
                });

                setDraftTitle("");
                setDraftNodes([]);
              }}
              className="
                w-full rounded-xl bg-indigo-600 py-2
                text-sm font-medium text-white
                disabled:opacity-40
              "
            >
              Create Step
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-800 flex justify-end gap-2">
          <button onClick={onClose} className="text-sm text-neutral-400">
            Close
          </button>

          <button
            onClick={() => {
              onStartPresentation();
              onClose();
            }}
            className="
              rounded-xl bg-indigo-600
              px-4 py-2 text-sm font-medium text-white
            "
          >
            Start Presentation
          </button>
        </div>
      </div>
    </div>
  );
}
