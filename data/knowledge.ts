import { KnowledgeNode } from "@/lib/types"

export const knowledgeNodes: KnowledgeNode[] = [
    // Concepts
    {
        id: "component-driven-development",
        title: "Component-Driven Development",
        description:
            "An approach where UIs are built as isolated, reusable components first.",
        category: "concept",
    },
    {
        id: "design-systems",
        title: "Design Systems",
        description:
            "A collection of reusable components, guidelines, and tokens that ensure UI consistency.",
        category: "concept",
    },
    {
        id: "performance-optimization",
        title: "Performance Optimization",
        description:
            "Techniques to improve loading speed, responsiveness, and runtime efficiency.",
        category: "concept",
    },
    {
        id: "accessibility",
        title: "Accessibility (a11y)",
        description:
            "Practices that make web applications usable by people with disabilities.",
        category: "concept",
    },

    // Frameworks
    {
        id: "react",
        title: "React",
        description:
            "A JavaScript library for building component-based user interfaces.",
        category: "framework",
    },
    {
        id: "nextjs",
        title: "Next.js",
        description:
            "A React framework that enables server rendering, routing, and production optimizations.",
        category: "framework",
    },

    // Tools
    {
        id: "storybook",
        title: "Storybook",
        description:
            "A tool for developing and documenting UI components in isolation.",
        category: "tool",
    },
    {
        id: "eslint",
        title: "ESLint",
        description:
            "A static analysis tool for identifying problematic patterns in JavaScript.",
        category: "tool",
    },
    {
        id: "prettier",
        title: "Prettier",
        description:
            "An opinionated code formatter that enforces consistent style.",
        category: "tool",
    },
    {
        id: "lighthouse",
        title: "Lighthouse",
        description:
            "An automated tool for auditing performance, accessibility, and best practices.",
        category: "tool",
    },

    // Processes
    {
        id: "code-review",
        title: "Code Review",
        description:
            "A collaborative process where code changes are reviewed before being merged.",
        category: "process",
    },
    {
        id: "testing-strategy",
        title: "Testing Strategy",
        description:
            "A structured approach to unit, integration, and end-to-end testing.",
        category: "process",
    },
    {
        id: "ci-cd",
        title: "CI / CD",
        description:
            "Continuous Integration and Continuous Deployment pipelines for automated delivery.",
        category: "process",
    },
    {
        id: "monitoring",
        title: "Monitoring",
        description:
            "Tracking application health, errors, and performance in production.",
        category: "process",
    },
]
export const knowledgeEdges = [
    // Architecture & concepts
    {
        id: "component-dd-to-design-systems",
        source: "component-driven-development",
        target: "design-systems",
    },
    {
        id: "design-systems-to-accessibility",
        source: "design-systems",
        target: "accessibility",
    },
    {
        id: "performance-to-nextjs",
        source: "performance-optimization",
        target: "nextjs",
    },

    // Framework usage
    {
        id: "react-to-nextjs",
        source: "react",
        target: "nextjs",
    },
    {
        id: "react-to-storybook",
        source: "react",
        target: "storybook",
    },

    // Tooling supporting concepts
    {
        id: "storybook-to-design-systems",
        source: "storybook",
        target: "design-systems",
    },
    {
        id: "eslint-to-code-review",
        source: "eslint",
        target: "code-review",
    },
    {
        id: "prettier-to-code-review",
        source: "prettier",
        target: "code-review",
    },
    {
        id: "lighthouse-to-performance",
        source: "lighthouse",
        target: "performance-optimization",
    },
    {
        id: "lighthouse-to-accessibility",
        source: "lighthouse",
        target: "accessibility",
    },

    // Process flow
    {
        id: "testing-to-ci-cd",
        source: "testing-strategy",
        target: "ci-cd",
    },
    {
        id: "code-review-to-ci-cd",
        source: "code-review",
        target: "ci-cd",
    },
    {
        id: "ci-cd-to-monitoring",
        source: "ci-cd",
        target: "monitoring",
    },

    // Process ↔ framework feedback loop
    {
        id: "monitoring-to-performance",
        source: "monitoring",
        target: "performance-optimization",
    },
]
