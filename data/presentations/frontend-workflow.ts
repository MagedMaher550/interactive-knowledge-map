export const frontendWorkflowPresentation = {
    id: "frontend-workflow",
    title: "Frontend Workflow",
    steps: [
        {
            id: "component-driven-development",
            title: "Component-Driven Development",
            description:
                "Modern frontend development starts by building isolated, reusable components.",
            focusNodes: ["component-driven-development"],
            focusEdges: [],
        },
        {
            id: "design-systems",
            title: "Design Systems",
            description:
                "Design systems ensure consistency and scalability across teams and products.",
            focusNodes: ["design-systems", "storybook"],
            focusEdges: ["storybook-to-design-systems"],
        },
        {
            id: "frameworks",
            title: "Frameworks",
            description:
                "React and Next.js form the foundation of many production frontend applications.",
            focusNodes: ["react", "nextjs", "performance-optimization"],
            focusEdges: ["react-to-nextjs"],
        },
        {
            id: "quality-standards",
            title: "Quality & Standards",
            description:
                "Linting, formatting, and testing ensure maintainability and reliability.",
            focusNodes: ["eslint", "prettier", "testing-strategy"],
            focusEdges: [],
        },
        {
            id: "delivery-monitoring",
            title: "Delivery & Monitoring",
            description:
                "CI/CD pipelines and monitoring close the feedback loop in production.",
            focusNodes: ["ci-cd", "monitoring"],
            focusEdges: ["ci-cd-to-monitoring"],
        },
    ],
};
