import { useState, useEffect } from "react"

export function useViewportWidth() {
    const [width, setWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        /**
         * Handles window resize events and updates width state
         */
        const handleResize = () => setWidth(window.innerWidth)

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return width
}
