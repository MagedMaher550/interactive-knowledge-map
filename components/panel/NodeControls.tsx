import { Dispatch, SetStateAction } from "react";

interface NodeControlsProps {
    onEdit: () => void;
    onDelete: () => void;
}

export default function NodeControls({
    onEdit,
    onDelete,
}: NodeControlsProps) {
    return (
        <div className="flex gap-3 w-full">
            <button
                onClick={onEdit}
                className="flex-1 rounded-lg bg-neutral-800 px-3 py-2 text-sm text-white hover:bg-neutral-700"
            >
                Edit node
            </button>

            <button
                onClick={onDelete}
                className="flex-1 rounded-lg bg-red-600/20 px-3 py-2 text-sm text-red-400 hover:bg-red-600/30"
            >
                Delete node
            </button>
        </div>
    );
}
