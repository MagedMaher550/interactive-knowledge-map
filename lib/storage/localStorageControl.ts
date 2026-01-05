import { KnowledgeStorage } from "./storage";

const KEY = "interactive-knowledge-map";

export const localGraphStorage: KnowledgeStorage = {
    async load() {
        const raw = localStorage.getItem(KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    },

    async save(graph) {
        localStorage.setItem(KEY, JSON.stringify(graph));
    },
};
