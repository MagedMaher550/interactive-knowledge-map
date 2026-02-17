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
  const [draftTitle, setDraftTitle] = useState("");
  const [draftNodes, setDraftNodes] = useState<string[]>([]);

  const canCreate =
    draftTitle.trim().length > 0 && draftNodes.length > 0;

  const derivedEdges = useMemo(() => {
    if (!allEdges.length) return [];
    return allEdges
      .filter(
        (e) =>
          draftNodes.includes(e.source) &&
          draftNodes.includes(e.target)
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

  if (!open) return null;

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
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
          {/* Steps */}
          <div className="space-y-2">
            {presentation.steps.length === 0 && (
              <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-400">
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="4" width="18" height="12" rx="2" />
                    <path d="M8 20h8" />
                  </svg>
                </div>

                <h3 className="text-lg font-semibold text-white">
                  No presentation steps yet
                </h3>

                <p className="mt-2 text-sm text-neutral-400 leading-relaxed max-w-md mx-auto">
                  Create your first step to highlight specific nodes and build
                  a guided walkthrough of your knowledge map.
                </p>

                <div className="mt-6 text-xs text-neutral-500">
                  Use the form below to add a step title and select focus nodes.
                </div>
              </div>
            )}

            {presentation.steps.length > 0 &&
              presentation.steps.map((step, index) => (
                <div
                  key={step.id}
                  className="
                    flex items-center gap-2
                    rounded-xl bg-neutral-800/70 px-3 py-2
                    border border-neutral-700/60
                  "
                >
                  <div className="flex flex-col">
                    <button
                      disabled={index === 0}
                      onClick={() => onReorderSteps(index, index - 1)}
                      className="text-xs text-neutral-400 disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      disabled={
                        index === presentation.steps.length - 1
                      }
                      onClick={() => onReorderSteps(index, index + 1)}
                      className="text-xs text-neutral-400 disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>

                  <input
                    value={step.title}
                    onChange={(e) =>
                      onRenameStep(step.id, e.target.value)
                    }
                    className="
                      flex-1 bg-transparent
                      text-sm text-white outline-none
                    "
                  />

                  <button
                    onClick={() => onDeleteStep(step.id)}
                    className="text-neutral-400 hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>

          {/* New Step */}
          <div className="border-t border-neutral-800 pt-4 space-y-4">
            <h3 className="text-sm font-medium text-neutral-300">
              New Step
            </h3>

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
        <div className="p-6 border-t border-neutral-800 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          {presentation.steps.length === 0 && (
            <p className="text-xs text-neutral-500 sm:mr-auto">
              Add at least one step before starting the presentation.
            </p>
          )}

          <div className="flex gap-2 sm:ml-auto">
            <button
              onClick={onClose}
              className="text-sm text-neutral-400 cursor-pointer"
            >
              Close
            </button>

            <button
              disabled={presentation.steps.length === 0}
              onClick={() => {
                onStartPresentation();
                onClose();
              }}
              className={`
        rounded-xl px-4 py-2 text-sm font-medium text-white
        transition
        ${presentation.steps.length === 0
                  ? "bg-neutral-700 cursor-not-allowed opacity-50"
                  : "bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
                }
      `}
            >
              Start Presentation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
