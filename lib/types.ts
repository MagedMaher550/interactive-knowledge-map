export type KnowledgeCategory =
    | "concept"
    | "tool"
    | "framework"
    | "process"

export interface KnowledgeNode {
    id: string
    title: string
    description: string
    category: KnowledgeCategory
}


export type NodeData = {
    id: string
    label: string
    description: string
    category: KnowledgeCategory
    hasIncoming: boolean
    hasOutgoing: boolean
}

export type PresentationStep = {
    focusNodes: string[];
    focusEdges: string[];
};