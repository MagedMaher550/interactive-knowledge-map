import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Interactive Knowledge Map",
        short_name: "Knowledge Map",
        description:
            "A visual, interactive knowledge map for exploring frontend concepts, tools, frameworks, and processes.",
        start_url: "/",
        display: "standalone",
        background_color: "#0b0b0b",
        theme_color: "#0b0b0b",
        icons: [
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    }
}
