import { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
  sidePanel?: ReactNode;
}

export function AppShell({ children, sidePanel }: AppShellProps) {
  return (
    <div className="w-screen h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="flex h-full">
        {/* Main canvas area */}
        <div className="flex-1 relative">{children}</div>

        {/* Side panel slot */}
        {sidePanel && (
          <div className="w-[420px] bg-neutral-900 shadow-[-8px_0_24px_rgba(0,0,0,0.4)] border-l border-neutral-800 bg-neutral-900">
            {sidePanel}
          </div>
        )}
      </div>
    </div>
  );
}
