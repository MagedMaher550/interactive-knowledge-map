import { usePresentation } from "@/lib/presentation/usePresentation";

export type PresentationController = ReturnType<typeof usePresentation>;

export type CanvasControlsProps = {
  presentation: PresentationController;
  mode: "explore" | "edit";
  onModeChange: (mode: "explore" | "edit") => void;
  onCreateNode: () => void;
  onOpenPresentation: () => void
};