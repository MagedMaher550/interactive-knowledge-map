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

export interface KnowledgeEdge {
    id: string
    source: string
    target: string
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

export type KnowledgeGraph = {
    nodes: KnowledgeNode[];
    edges: KnowledgeEdge[];
};


export type Presentation = {
    id: string;
    title: string;
    steps: PresentationStep[];
};

