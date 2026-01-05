import { Handle, Position, NodeProps } from "reactflow";
import { categoryStyles } from "@/style/theme";
import { KnowledgeCategory, NodeData } from "@/lib/types";

export function KnowledgeNode({ data, selected }: NodeProps<NodeData>) {
  const styles = categoryStyles[data.category];

  return (
    <div
      className={`
        rounded-2xl px-4 py-2
        ${
          selected ? "ring-2 ring-white/40 scale-[1.02]" : "hover:scale-[1.02]"
        } min-w-[160px] border text-sm font-medium
        transition-colors
        ${styles.bg} ${styles.border} ${styles.text}
        ${selected ? "ring-2 ring-white/30" : "hover:brightness-110"}
      `}
    >
      <div className="text-center text-xs font-semibold tracking-wide">
        {data.label}
      </div>

      {data.hasIncoming && (
        <Handle
          type="target"
          position={Position.Left}
          className="!bg-neutral-500/60 !w-2 !h-2 !border-none"
        />
      )}

      {data.hasOutgoing && (
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-neutral-500/60 !w-2 !h-2 !border-none"
        />
      )}
    </div>
  );
}
