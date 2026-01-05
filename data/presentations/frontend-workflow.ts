export const frontendWorkflowPresentation = {
    id: "frontend-workflow",
    title: "Frontend Workflow",
    steps: [
        {
            id: "intro",
            focusNodes: ["component-driven-development"],
            focusEdges: [],
            panel: {
                title: "Component-Driven Development",
                content:
                    "Modern frontend development starts by building isolated, reusable components.",
            },
        },
        {
            id: "design-systems",
            focusNodes: ["design-systems", "storybook"],
            focusEdges: ["storybook-to-design-systems"],
            panel: {
                title: "Design Systems",
                content:
                    "Design systems ensure consistency and scale across teams and products.",
            },
        },
        {
            id: "frameworks",
            focusNodes: ["react", "nextjs"],
            focusEdges: ["react-to-nextjs"],
            panel: {
                title: "Frameworks",
                content:
                    "React and Next.js form the foundation of many production frontend apps.",
            },
        },
        {
            id: "quality",
            focusNodes: ["eslint", "prettier", "testing-strategy"],
            focusEdges: [],
            panel: {
                title: "Quality & Standards",
                content:
                    "Tooling and testing ensure maintainability and reliability.",
            },
        },
        {
            id: "delivery",
            focusNodes: ["ci-cd", "monitoring"],
            focusEdges: ["ci-cd-to-monitoring"],
            panel: {
                title: "Delivery & Monitoring",
                content:
                    "CI/CD pipelines and monitoring close the loop in production.",
            },
        },
    ],
};
