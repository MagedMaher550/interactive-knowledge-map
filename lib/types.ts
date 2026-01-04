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
