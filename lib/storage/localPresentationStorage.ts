import type { Presentation } from "@/lib/types";

const KEY = "knowledge-presentations";

export const localPresentationStorage = {
    async load(): Promise<Presentation[] | null> {
        try {
            const raw = localStorage.getItem(KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch {
            return null;
        }
    },

    async save(presentations: Presentation[]) {
        localStorage.setItem(KEY, JSON.stringify(presentations));
    },
};
