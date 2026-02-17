"use client";

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
          w-full max-w-2xl
          rounded-3xl
          border border-neutral-800
          bg-gradient-to-b from-neutral-900 to-neutral-950
          p-10
          shadow-2xl
        "
            >
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-white">
                        Interactive Knowledge Map
                    </h1>

                    <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                        A visual system for organizing ideas, connecting concepts,
                        and presenting complex knowledge through structured flows.
                    </p>
                </div>

                {/* Feature Blocks */}
                <div className="grid gap-6 sm:grid-cols-2 mb-10">
                    <Feature
                        icon={<CanvasIcon />}
                        title="Explore & Inspect"
                        description="Click any node to open its details, view relationships, and navigate the structure."
                    />

                    <Feature
                        icon={<EditIcon />}
                        title="Create & Connect"
                        description="Switch to Edit mode to create new nodes and define meaningful connections."
                    />

                    <Feature
                        icon={<PresentationIcon />}
                        title="Presentation Mode"
                        description="Build guided walkthroughs to explain workflows or concepts step by step."
                    />

                    <Feature
                        icon={<SearchIcon />}
                        title="Search & Navigate"
                        description="Quickly locate nodes and pan or zoom across large knowledge maps."
                    />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <p className="text-xs text-neutral-500">
                        All data is stored locally in your browser.
                    </p>

                    <button
                        onClick={onClose}
                        className="
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

/* ---------- Feature Block ---------- */

function Feature({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5">
            <div className="flex items-center gap-2 mb-2 text-indigo-400">
                {icon}
                <h3 className="text-sm font-semibold text-white">
                    {title}
                </h3>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
                {description}
            </p>
        </div>
    );
}

/* ---------- Inline SVG Icons ---------- */

function CanvasIcon() {
    return (
        <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
        >
            <rect x="3" y="3" width="18" height="18" rx="3" />
        </svg>
    );
}

function EditIcon() {
    return (
        <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
        >
            <path d="M4 20h4l10-10-4-4L4 16v4z" />
        </svg>
    );
}

function PresentationIcon() {
    return (
        <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
        >
            <rect x="3" y="4" width="18" height="12" rx="2" />
            <path d="M8 20h8" />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
        >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3-3" />
        </svg>
    );
}
