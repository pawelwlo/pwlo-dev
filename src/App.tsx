import { lazy, Suspense, useEffect, useState } from "react";

import Home from "@/pages/Home";
import { redirectToGeoLocaleIfNeeded } from "@/lib/geoLocale";
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
    void redirectToGeoLocaleIfNeeded();
  }, []);

  useEffect(() => {
    if (!import.meta.env.PROD) {
      return;
    }

    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://cloud.umami.is/script.js";
    script.dataset.websiteId = "b0983bb4-2d3c-4034-bdb6-9d85280959d6";
    script.dataset.domains = "pwlo.dev,www.pwlo.dev";
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

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
