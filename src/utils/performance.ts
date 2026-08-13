import { useLayoutEffect, useRef } from "react";

declare const performance: { now: () => number };

// Rough render time estimate from hook call to the next available animation frame
export const useLogMountToNextFrame = (componentLabel: string) => {
  const t0 = useRef(performance.now()).current;

  useLayoutEffect(() => {
    if (!__DEV__) return;

    // The layout effect means React has committed
    // stop timer on next animation frame
    const frame = requestAnimationFrame(() =>
      console.log(
        `🚀 ~ ${componentLabel} ${(performance.now() - t0).toFixed(1)}ms`,
      ),
    );

    return () => cancelAnimationFrame(frame);
  }, [componentLabel, t0]);
};
