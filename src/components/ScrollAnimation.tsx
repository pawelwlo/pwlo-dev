import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  getFrameIndexForProgress,
  loadSequenceFrames,
  SEQUENCE_FRAME_COUNT,
} from "@/lib/sequenceLoader";
import {
  DESKTOP_FADE_END,
  getScrollProgress as getScrollProgressFromMetrics,
  getScrollVisualState,
  type ScrollVisualState,
} from "@/lib/scrollProgress";

export type ScrollAnimationHandle = {
  scrollToDesktop: () => void;
  revealDesktop: () => void;
};

type ScrollAnimationProps = {
  hero: ReactNode;
  desktop: ReactNode;
  workspaceUnlocked?: boolean;
  onProgressChange?: (progress: number) => void;
};

function getScrollProgress(container: HTMLElement): number {
  const rect = container.getBoundingClientRect();
  return getScrollProgressFromMetrics(rect.top, rect.height, window.innerHeight || 1);
}

function applyVisualState(
  sticky: HTMLElement,
  visualState: ScrollVisualState,
  isReady: boolean,
) {
  sticky.style.setProperty("--scroll-progress", visualState.progress.toFixed(4));
  sticky.style.setProperty("--hero-opacity", visualState.heroOpacity.toFixed(4));
  sticky.style.setProperty("--hero-translate-y", `${visualState.heroTranslateY.toFixed(2)}px`);
  sticky.style.setProperty("--desktop-opacity", visualState.desktopOpacity.toFixed(4));
  sticky.style.setProperty("--desktop-blur", `${visualState.desktopBlur.toFixed(2)}px`);
  sticky.style.setProperty("--desktop-scale", visualState.desktopScale.toFixed(4));
  sticky.style.setProperty("--desktop-translate-y", `${visualState.desktopTranslateY.toFixed(2)}px`);
  sticky.style.setProperty("--sequence-layer-opacity", visualState.layerOpacity.toFixed(4));
  sticky.style.setProperty(
    "--sequence-layers-opacity",
    Math.max(visualState.layerOpacity, 1 - visualState.desktopOpacity).toFixed(4),
  );
  sticky.style.setProperty("--hero-pointer-events", visualState.heroHidden ? "none" : "auto");
  sticky.style.setProperty("--desktop-pointer-events", visualState.desktopInteractive ? "auto" : "none");
  sticky.dataset.sequenceFrame = String(visualState.frameIndex);
  sticky.dataset.sequenceReady = isReady ? "true" : "false";
  sticky.dataset.desktopRevealed = visualState.desktopOpacity >= 0.95 ? "true" : "false";
}

export const ScrollAnimation = forwardRef<ScrollAnimationHandle, ScrollAnimationProps>(function ScrollAnimation(
  { hero, desktop, workspaceUnlocked = false, onProgressChange },
  ref,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const parallaxRef = useRef({ x: 0, y: 0 });
  const drawFrameIdRef = useRef(0);
  const scrollFrameIdRef = useRef(0);
  const layerFloatRef = useRef(0);
  const isReadyRef = useRef(false);
  const workspaceUnlockedRef = useRef(workspaceUnlocked);
  const onProgressChangeRef = useRef(onProgressChange);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  onProgressChangeRef.current = onProgressChange;
  workspaceUnlockedRef.current = workspaceUnlocked;

  const requestDraw = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas || !isReadyRef.current) {
      return;
    }

    if (drawFrameIdRef.current) {
      return;
    }

    drawFrameIdRef.current = window.requestAnimationFrame(() => {
      drawFrameIdRef.current = 0;
      const frame = framesRef.current[frameIndexRef.current];

      if (!frame) {
        return;
      }

      const context = canvas.getContext("2d");

      if (!context) {
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (width === 0 || height === 0) {
        return;
      }

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const scale = Math.max(width / frame.naturalWidth, height / frame.naturalHeight);
      const drawWidth = frame.naturalWidth * scale;
      const drawHeight = frame.naturalHeight * scale;
      const offsetX = (width - drawWidth) / 2;
      const offsetY = (height - drawHeight) / 2;

      context.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight);
    });
  }, []);

  const applyProgress = useCallback(
    (nextProgress: number) => {
      const sticky = stickyRef.current;

      if (!sticky) {
        return;
      }

      const nextFrameIndex = getFrameIndexForProgress(nextProgress);
      const visualState = getScrollVisualState(nextProgress, nextFrameIndex);

      frameIndexRef.current = nextFrameIndex;
      applyVisualState(sticky, visualState, isReadyRef.current);
      setProgress((current) => (Math.abs(current - nextProgress) > 0.002 ? nextProgress : current));
      onProgressChangeRef.current?.(nextProgress);
      requestDraw();
    },
    [requestDraw],
  );

  const revealDesktop = useCallback(() => {
    applyProgress(DESKTOP_FADE_END);
  }, [applyProgress]);

  useImperativeHandle(
    ref,
    () => ({
      revealDesktop,
      scrollToDesktop: () => {
        const element = containerRef.current;

        if (!element) {
          revealDesktop();
          return;
        }

        const rect = element.getBoundingClientRect();
        const absoluteTop = window.scrollY + rect.top;
        const targetTop = absoluteTop + rect.height * DESKTOP_FADE_END;

        window.scrollTo({ top: targetTop, behavior: "auto" });
        revealDesktop();
      },
    }),
    [revealDesktop],
  );

  useEffect(() => {
    let isMounted = true;

    if (import.meta.env.VITEST) {
      isReadyRef.current = true;
      setIsReady(true);
      return () => {
        isMounted = false;
      };
    }

    void loadSequenceFrames()
      .then((frames) => {
        if (!isMounted) {
          return;
        }

        framesRef.current = frames;
        isReadyRef.current = true;
        setIsReady(true);
        requestDraw();
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        framesRef.current = [];
        isReadyRef.current = true;
        setIsReady(true);
      });

    return () => {
      isMounted = false;
    };
  }, [requestDraw]);

  useEffect(() => {
    const updateScrollState = () => {
      scrollFrameIdRef.current = 0;
      const container = containerRef.current;

      if (!container) {
        return;
      }

      let nextProgress = getScrollProgress(container);

      if (workspaceUnlockedRef.current) {
        nextProgress = Math.max(nextProgress, DESKTOP_FADE_END);
      }

      applyProgress(nextProgress);
    };

    const requestScrollUpdate = () => {
      if (scrollFrameIdRef.current) {
        window.cancelAnimationFrame(scrollFrameIdRef.current);
      }

      scrollFrameIdRef.current = window.requestAnimationFrame(updateScrollState);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const viewportWidth = window.innerWidth || 1;
      const viewportHeight = window.innerHeight || 1;
      parallaxRef.current = {
        x: (event.clientX / viewportWidth - 0.5) * window.innerWidth * 0.02,
        y: (event.clientY / viewportHeight - 0.5) * window.innerHeight * 0.02,
      };

      const sticky = stickyRef.current;

      if (sticky) {
        sticky.style.setProperty("--sequence-parallax-x", `${parallaxRef.current.x.toFixed(2)}px`);
        sticky.style.setProperty("--sequence-parallax-y", `${parallaxRef.current.y.toFixed(2)}px`);
      }

      requestScrollUpdate();
    };

    const handlePointerLeave = () => {
      parallaxRef.current = { x: 0, y: 0 };

      const sticky = stickyRef.current;

      if (sticky) {
        sticky.style.setProperty("--sequence-parallax-x", "0px");
        sticky.style.setProperty("--sequence-parallax-y", "0px");
      }

      requestScrollUpdate();
    };

    let isFloatCancelled = false;
    let floatFrameId = 0;
    const animateFloat = () => {
      if (isFloatCancelled) {
        return;
      }

      layerFloatRef.current = Math.sin(performance.now() / 1800) * 3;

      const sticky = stickyRef.current;

      if (sticky) {
        sticky.style.setProperty("--sequence-layer-c-float", `${layerFloatRef.current.toFixed(2)}px`);
      }

      requestScrollUpdate();
      floatFrameId = window.requestAnimationFrame(animateFloat);
    };

    updateScrollState();
    floatFrameId = window.requestAnimationFrame(animateFloat);
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      isFloatCancelled = true;

      if (scrollFrameIdRef.current) {
        window.cancelAnimationFrame(scrollFrameIdRef.current);
      }

      if (drawFrameIdRef.current) {
        window.cancelAnimationFrame(drawFrameIdRef.current);
      }

      if (floatFrameId) {
        window.cancelAnimationFrame(floatFrameId);
      }

      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [applyProgress]);

  useEffect(() => {
    if (!workspaceUnlocked) {
      return;
    }

    revealDesktop();
    const timeoutId = window.setTimeout(revealDesktop, 160);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [workspaceUnlocked, revealDesktop]);

  useEffect(() => {
    if (!workspaceUnlocked) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      requestDraw();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [workspaceUnlocked, isReady, requestDraw]);

  const heroHidden = getScrollVisualState(progress, 0).heroHidden;

  return (
    <div className="scroll-animation" ref={containerRef}>
      <div
        className="scroll-animation-sticky"
        ref={stickyRef}
        data-sequence-frame-count={SEQUENCE_FRAME_COUNT}
        data-workspace-unlocked={workspaceUnlocked ? "true" : "false"}
      >
        <div className="scroll-animation-layers" aria-hidden="true">
          <div className="scroll-animation-layer scroll-animation-layer-a">
            <div className="scroll-animation-layer-drift scroll-animation-layer-drift-a" />
          </div>
          <div className="scroll-animation-layer scroll-animation-layer-b">
            <canvas ref={canvasRef} className="scroll-animation-layer-b-canvas" />
          </div>
          <div className="scroll-animation-layer scroll-animation-layer-c">
            <div className="scroll-animation-layer-drift scroll-animation-layer-drift-c" />
          </div>
        </div>

        <div className="scroll-animation-hero" data-hidden={heroHidden ? "true" : "false"}>
          {hero}
        </div>

        <div className="scroll-animation-desktop">{desktop}</div>
      </div>
    </div>
  );
});
