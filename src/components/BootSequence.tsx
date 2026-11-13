import { useEffect, useRef, useState, type AnimationEvent } from "react";

const BOOT_DURATION_MS = 480;
const EXIT_ANIMATION_MS = 520;

type BootSequenceProps = {
  message: string;
  onExitStart?: () => void;
  onComplete: () => void;
};

/** Brief blank boot veil — brand animation lives on the desktop itself. */
export function BootSequence({ message: _message, onExitStart, onComplete }: BootSequenceProps) {
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
    const timeoutId = window.setTimeout(() => {
      if (hasStartedExitRef.current) {
        return;
      }

      hasStartedExitRef.current = true;
      onExitStartRef.current?.();
      setIsExiting(true);
    }, BOOT_DURATION_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!isExiting) {
      return;
    }

    const timeoutId = window.setTimeout(finishBootSequence, EXIT_ANIMATION_MS + 80);

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
      role="status"
      aria-live="polite"
      aria-label="Loading"
    />
  );
}
