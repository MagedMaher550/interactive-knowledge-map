import { KnowledgeGraph } from "../types";

export interface KnowledgeStorage {
    load(): Promise<KnowledgeGraph>;
    save(graph: KnowledgeGraph): Promise<void>;
}
