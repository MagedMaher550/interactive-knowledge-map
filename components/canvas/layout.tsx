import { KnowledgeNode } from "@/lib/types";

export const COLUMN_X: Record<KnowledgeNode["category"], number> = {
  process: 0,
  concept: 320,
  framework: 640,
  tool: 960,
};

const VERTICAL_GAP = 120;

export function layoutKnowledgeNodes(
  nodes: KnowledgeNode[],
  connectedNodeIds: Set<string>
) {
  const grouped = nodes.reduce<Record<string, KnowledgeNode[]>>((acc, node) => {
    acc[node.category] ??= [];
    acc[node.category].push(node);
    return acc;
  }, {});

  return Object.entries(grouped).flatMap(([category, columnNodes]) => {
    const sorted = [...columnNodes].sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    const totalHeight = (sorted.length - 1) * VERTICAL_GAP;
    const startY = -totalHeight / 2;

    return sorted.map((node, index) => ({
      id: node.id,
      type: "knowledge",
      position: {
        x: COLUMN_X[node.category],
        y: startY + index * VERTICAL_GAP,
      },
      data: {
        id: node.id,
        label: node.title,
        description: node.description,
        category: node.category,
        hasIncoming: connectedNodeIds.has(node.id),
        hasOutgoing: connectedNodeIds.has(node.id),
      },
    }));
  });
}
