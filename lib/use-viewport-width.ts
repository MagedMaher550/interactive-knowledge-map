import { useState, useEffect } from "react";

export function useViewportWidth() {
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        const update = () => setWidth(window.innerWidth);

        update(); // set initial value on client
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return width;
}
