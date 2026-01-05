import { useState } from "react";

export function usePresentation(steps: any[]) {
    const [active, setActive] = useState(false);
    const [index, setIndex] = useState(0);

    const start = () => {
        setActive(true);
        setIndex(0);
    };

    const next = () => setIndex((i) => Math.min(i + 1, steps.length - 1));
    const prev = () => setIndex((i) => Math.max(i - 1, 0));
    const exit = () => setActive(false);

    return {
        active,
        step: steps[index],
        index,
        start,
        next,
        prev,
        exit,
    };
}
