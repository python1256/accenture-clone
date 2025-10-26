"use client";

import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";

/* Tell TS about the global injected by the Vanta script */
declare global {
  interface Window {
    VANTA?: any;
    p5?: any; // Allow p5 to be globally defined by the script
  }
}

export default function VantaTrunkPanel() {
  const elRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<any>(null);

  // Safe initializer we can call from anywhere (onLoad, effects, etc.)
  const tryInit = useCallback(() => {
    if (!effectRef.current && window.VANTA && window.p5 && elRef.current) {
      effectRef.current = window.VANTA.TRUNK({
        el: elRef.current,
        // Options (same look as your screenshot)
        backgroundColor: 0x000000,
        color: 0x98465f,
        chaos: 1.0,
        spacing: 0.0,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
      });
    }
  }, []);

  useEffect(() => {
    // Try immediately in case scripts are already cached/loaded
    tryInit();

    return () => {
      // Clean up the Vanta instance if it exists
      try {
        effectRef.current?.destroy?.();
      } catch {}
      effectRef.current = null;
    };
  }, [tryInit]);

  return (
    <>
      {/* Load p5.js and Vanta TRUNK scripts */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          if (elRef.current && window.VANTA?.TRUNK) {
            tryInit();
          }
        }}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.trunk.min.js"
        strategy="beforeInteractive"
        onLoad={tryInit}
      />

      <div
        ref={elRef}
        className="vantaPanel"
        aria-hidden
        style={{ height: "100vh", width: "100%" }} // Ensure the container has dimensions
      />
    </>
  );
}