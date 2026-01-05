import { useState } from "react";
import type { PresentationStep } from "@/lib/types";

export function usePresentation(steps: PresentationStep[]) {
    const [index, setIndex] = useState<number | null>(null);

    const step = index !== null ? steps[index] : undefined;

    const canNext = index !== null && index < steps.length - 1;
    const canPrev = index !== null && index > 0;

    return {
        // state
        isActive: index !== null,
        index,
        step,

        // capabilities
        canNext,
        canPrev,

        // actions
        start: () => setIndex(0),
        next: () => canNext && setIndex((i) => (i !== null ? i + 1 : i)),
        prev: () => canPrev && setIndex((i) => (i !== null ? i - 1 : i)),
        exit: () => setIndex(null),
    };
}
