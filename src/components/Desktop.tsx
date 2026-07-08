import type { CSSProperties, MouseEvent, ReactNode, RefObject } from "react";

type DesktopProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  surfaceRef?: RefObject<HTMLDivElement | null>;
  onSurfaceMouseMove?: (event: MouseEvent<HTMLDivElement>) => void;
};

export function Desktop({
  children,
  className = "",
  style,
  surfaceRef,
  onSurfaceMouseMove,
}: DesktopProps) {
  return (
    <div className={`desktop-transition-shell ${className}`.trim()} style={style}>
      <div
        className="desktop-surface desktop-transition-surface"
        ref={surfaceRef}
        onMouseMove={onSurfaceMouseMove}
      >
        {children}
      </div>
    </div>
  );
}
