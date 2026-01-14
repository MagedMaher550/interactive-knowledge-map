import { ControlButton } from "../ControlButton";
import { useReactFlow } from "reactflow";

interface CameraControlsProps {
  cameraOpen: boolean;
}

export default function CameraControls({ cameraOpen }: CameraControlsProps) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div
      className={`
      cursor-pointer
      absolute
      flex
      rounded-xl
      bg-neutral-800/90
      border border-neutral-700
      shadow-md
      transition-all duration-200 ease-out
      ${
        cameraOpen
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }

      /* Mobile: vertical above */
      flex-col bottom-full mb-1
      md:bottom-auto md:mb-0

      /* Desktop: horizontal left */
      md:flex-row md:right-full md:mr-1
    `}
    >
      <ControlButton onClick={zoomOut}>−</ControlButton>

      <ControlButton onClick={() => fitView({ padding: 0.4 })}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      </ControlButton>

      <ControlButton onClick={zoomIn}>+</ControlButton>
    </div>
  );
}
