import { KnowledgeNode } from "@/lib/types";

interface NodePanelProps {
  node: KnowledgeNode;
  onClose: () => void;
}

export function NodePanel({ node, onClose }: NodePanelProps) {
  return (
    <div className="h-full p-6 flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-lg font-semibold">{node.title}</h2>
        <button onClick={onClose} className="text-neutral-400 hover:text-white cursor-pointer">
          ✕
        </button>
      </div>

      <div className="text-sm text-neutral-300 leading-relaxed">
        {node.description}
      </div>

      <div className="mt-auto pt-6 text-xs text-neutral-500">
        Category: {node.category}
      </div>
    </div>
  );
}
