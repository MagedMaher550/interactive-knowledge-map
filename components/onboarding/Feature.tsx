export default function Feature({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5">
            <div className="flex items-center gap-2 mb-2 text-indigo-400">
                {icon}
                <h3 className="text-sm font-semibold text-white">{title}</h3>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
                {description}
            </p>
        </div>
    );
}