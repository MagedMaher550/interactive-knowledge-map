"use client";
import React from "react";
import Feature from "./Feature";
import { CanvasIcon, EditIcon, PresentationIcon, SearchIcon } from "./icons";

interface OnboardingModalProps {
    open: boolean;
    onClose: () => void;
}

export function OnboardingModal({
    open,
    onClose,
}: OnboardingModalProps) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
          w-full max-w-2xl
          max-h-[90vh]
          flex flex-col
          rounded-3xl
          border border-neutral-800
          bg-gradient-to-b from-neutral-900 to-neutral-950
          shadow-2xl
        "
            >
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-10">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-semibold text-white">
                            Interactive Knowledge Map
                        </h1>

                        <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                            A visual system for organizing ideas, connecting concepts,
                            and presenting complex knowledge through structured flows.
                        </p>
                    </div>

                    {/* Feature Blocks */}
                    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 mb-10">
                        <Feature
                            icon={<CanvasIcon />}
                            title="Explore & Inspect"
                            description="Click any node to open its details, view relationships, and navigate the structure."
                        />

                        <Feature
                            icon={<EditIcon />}
                            title="Create & Connect"
                            description="Create new nodes and define meaningful connections."
                        />

                        <Feature
                            icon={<PresentationIcon />}
                            title="Presentation Mode"
                            description="Build guided walkthroughs to explain workflows step by step."
                        />

                        <Feature
                            icon={<SearchIcon />}
                            title="Search & Navigate"
                            description="Quickly locate nodes and pan or zoom across large knowledge maps."
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="shrink-0 border-t border-neutral-800 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-xs text-neutral-500 text-center sm:text-left">
                        All data is stored locally in your browser.
                    </p>

                    <button
                        onClick={onClose}
                        className="
              w-full sm:w-auto
              rounded-xl
              bg-indigo-600
              px-6 py-3
              text-sm font-medium text-white
              transition
              hover:bg-indigo-500
              active:scale-[0.98]
            "
                    >
                        Start Exploring
                    </button>
                </div>
            </div>
        </div>
    );
}