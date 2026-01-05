import { useState, useEffect } from "react";
import type { PresentationStep } from "@/lib/types";

export function usePresentation(steps: PresentationStep[]) {
    const [index, setIndex] = useState<number | null>(null);

    const step = index !== null ? steps[index] : undefined;

    const isActive = index !== null;
    const canNext = index !== null && index < steps.length - 1;
    const canPrev = index !== null && index > 0;

    // Keyboard navigation (active only during presentation)
    useEffect(() => {
        if (!isActive) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" && canNext) {
                setIndex((i) => (i !== null ? i + 1 : i));
            }

            if (e.key === "ArrowLeft" && canPrev) {
                setIndex((i) => (i !== null ? i - 1 : i));
            }

            if (e.key === "Escape") {
                setIndex(null);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isActive, canNext, canPrev]);

    return {
        // state
        isActive,
        index,
        step,

        // derived (for UI)
        currentStep: index !== null ? index + 1 : null,
        totalSteps: steps.length,

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
