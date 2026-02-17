"use client";

import { useState, useEffect } from "react";
import { KnowledgeNode } from "@/lib/types";
import { EditNodeModal } from "../edit/NodeEditPanel";
import NodeControls from "./NodeControls";

interface NodePanelProps {
  node: KnowledgeNode;
  existingNodes: { id: string; title: string }[];
  currentOutgoing: string[];
  onClose: () => void;
  onUpdateNode: (data: {
    id: string;
    title: string;
    description: string;
    category: KnowledgeNode["category"];
    connectTo: string[];
  }) => void;
  onRequestDelete: (id: string) => void;
}

export function NodePanel({
  node,
  existingNodes,
  currentOutgoing,
  onClose,
  onUpdateNode,
  onRequestDelete,
}: NodePanelProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ---------- Detect ≤ 425px ---------- */

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 425);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ---------- Lock scroll only on mobile ---------- */

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMobile]);

  return (
    <>
      <div
        className={`
          z-40 bg-neutral-950 flex flex-col
          ${isMobile
            ? "fixed inset-0"
            : "absolute right-0 top-0 h-full w-[420px] border-l border-neutral-800"}
        `}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-neutral-800 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-white leading-tight">
                {node.title}
              </h2>

              <span className="inline-block rounded-md bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300">
                {node.category}
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 px-6 py-6 space-y-6 flex flex-col overflow-hidden">
          {/* Description */}
          <section className="shrink-0">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Description
            </h3>

            <div className="rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
              {node.description || (
                <span className="italic text-neutral-500">
                  No description provided.
                </span>
              )}
            </div>
          </section>

          {/* Outgoing Connections (only scrollable area) */}
          <section className="flex flex-col flex-1 min-h-0">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 shrink-0">
              Outgoing Connections
            </h3>

            <div className="rounded-lg bg-neutral-900 p-3 flex-1 overflow-y-auto">
              {currentOutgoing.length > 0 ? (
                <ul className="space-y-2 text-sm text-neutral-300">
                  {currentOutgoing.map((id) => {
                    const target = existingNodes.find((n) => n.id === id);
                    return (
                      <li
                        key={id}
                        className="flex items-center gap-2 rounded-md bg-neutral-800 px-3 py-2"
                      >
                        <span className="text-neutral-500">→</span>
                        <span>{target?.title ?? "Unknown node"}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-neutral-500 italic">
                  No outgoing connections.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Actions */}
        <div className="border-t border-neutral-800 bg-neutral-950 px-6 py-4 shrink-0">
          <NodeControls
            onEdit={() => setEditOpen(true)}
            onDelete={() => onRequestDelete(node.id)}
          />
        </div>
      </div>

      <EditNodeModal
        open={editOpen}
        node={node}
        existingNodes={existingNodes}
        currentOutgoing={currentOutgoing}
        onClose={() => setEditOpen(false)}
        onUpdate={(data) => {
          onUpdateNode(data);
          setEditOpen(false);
        }}
      />
    </>
  );
}
