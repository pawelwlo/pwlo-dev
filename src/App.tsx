import { lazy, Suspense, useEffect, useState } from "react";

import Home from "@/pages/Home";
import "@/styles/background.css";
import "@/styles/icons.css";
import "@/styles/mobile.css";
import "@/styles/scrollAnimation.css";

const Analytics = lazy(async () => {
  const module = await import("@vercel/analytics/react");

  return { default: module.Analytics };
});

export default function App() {
  const [shouldLoadAnalytics, setShouldLoadAnalytics] = useState(false);

  useEffect(() => {
    const requestIdle = window.requestIdleCallback?.bind(window);

    if (requestIdle) {
      const idleId = requestIdle(() => setShouldLoadAnalytics(true));

      return () => {
        window.cancelIdleCallback?.(idleId);
      };
    }

    const timeoutId = window.setTimeout(() => {
      setShouldLoadAnalytics(true);
    }, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <Home />
      {shouldLoadAnalytics ? (
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      ) : null}
    </>
  );
}
