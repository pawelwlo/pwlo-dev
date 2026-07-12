import type { CSSProperties, MouseEvent, ReactNode, RefObject } from "react";

type DesktopProps = {
  children: ReactNode;
  dock?: ReactNode;
  className?: string;
  style?: CSSProperties;
  surfaceRef?: RefObject<HTMLDivElement | null>;
  onSurfaceMouseMove?: (event: MouseEvent<HTMLDivElement>) => void;
};

export function Desktop({
  children,
  dock,
  className = "",
  style,
  surfaceRef,
  onSurfaceMouseMove,
}: DesktopProps) {
  return (
    <div className={`desktop-transition-shell desktop-transition-shell--bare ${className}`.trim()} style={style}>
      <div
        className="desktop-workspace desktop-transition-workspace"
        ref={surfaceRef}
        onMouseMove={onSurfaceMouseMove}
      >
        {children}
      </div>
      {dock}
    </div>
  );
}
