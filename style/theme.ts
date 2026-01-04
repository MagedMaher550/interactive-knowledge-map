import { KnowledgeCategory } from "@/lib/types"

export const categoryStyles: Record<
    KnowledgeCategory,
    { bg: string; border: string; text: string }
> = {
    framework: {
        bg: "bg-blue-950",
        border: "border-blue-500",
        text: "text-blue-300",
    },
    tool: {
        bg: "bg-emerald-950",
        border: "border-emerald-500",
        text: "text-emerald-300",
    },
    concept: {
        bg: "bg-purple-950",
        border: "border-purple-500",
        text: "text-purple-300",
    },
    process: {
        bg: "bg-amber-950",
        border: "border-amber-500",
        text: "text-amber-300",
    },
}
