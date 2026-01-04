import { KnowledgeNode } from "@/lib/types"

export const knowledgeNodes: KnowledgeNode[] = [
    {
        id: "react",
        title: "React",
        description: "A JavaScript library for building component-based user interfaces.",
        category: "framework",
    },
    {
        id: "nextjs",
        title: "Next.js",
        description: "A React framework for production-grade web applications.",
        category: "framework",
    },
    {
        id: "react-flow",
        title: "React Flow",
        description: "A library for building interactive node-based diagrams in React.",
        category: "tool",
    },
    {
        id: "state-management",
        title: "State Management",
        description: "Patterns and tools for managing application state predictably.",
        category: "concept",
    },
]

export const knowledgeEdges = [
    { id: "react-next", source: "react", target: "nextjs" },
    { id: "react-reactflow", source: "react", target: "react-flow" },
    { id: "concept-react", source: "state-management", target: "react" },
]

