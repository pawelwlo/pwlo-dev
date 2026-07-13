import { useEffect, useRef, useState, type AnimationEvent } from "react";

const BOOT_DURATION_MS = 2000;
const HOLD_AT_100_MS = 280;
const EXIT_ANIMATION_MS = 680;

type BootSequenceProps = {
  message: string;
  onExitStart?: () => void;
  onComplete: () => void;
};

export function BootSequence({ message, onExitStart, onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const onExitStartRef = useRef(onExitStart);
  const hasStartedExitRef = useRef(false);
  const hasCompletedRef = useRef(false);

  const finishBootSequence = () => {
    if (hasCompletedRef.current) {
      return;
    }

    hasCompletedRef.current = true;
    onCompleteRef.current();
  };

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    onExitStartRef.current = onExitStart;
  }, [onExitStart]);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrameId = 0;
    let holdTimeoutId = 0;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(100, Math.floor((elapsed / BOOT_DURATION_MS) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      holdTimeoutId = window.setTimeout(() => {
        if (hasStartedExitRef.current) {
          return;
        }

        hasStartedExitRef.current = true;
        onExitStartRef.current?.();
        setIsExiting(true);
      }, HOLD_AT_100_MS);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(holdTimeoutId);
    };
  }, []);

  useEffect(() => {
    if (!isExiting) {
      return;
    }

    const timeoutId = window.setTimeout(finishBootSequence, EXIT_ANIMATION_MS + 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isExiting]);

  const handleExitAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (!isExiting || event.target !== event.currentTarget || event.animationName !== "boot-screen-exit") {
      return;
    }

    finishBootSequence();
  };

  return (
    <div
      className={`os-boot-screen${isExiting ? " os-boot-screen--exiting" : ""}`}
      onAnimationEnd={handleExitAnimationEnd}
      style={isExiting ? { animationDuration: `${EXIT_ANIMATION_MS}ms` } : undefined}
    >
      <div className="boot-content">
        <div className="boot-logo">
          <img
            src="/logo.png"
            alt=""
            width={100}
            height={100}
            style={{ objectFit: "contain", opacity: 0.9 }}
            aria-hidden="true"
          />
        </div>
        <div className="boot-text">{message}</div>
        <div className="boot-percentage">{progress}%</div>
      </div>
    </div>
  );
}
