// // "use client";

// // import { useEffect, useRef, useState } from "react";
// // import * as THREE from "three";
// // import GLOBE from "vanta/dist/vanta.globe.min";

// // export default function VantaBackground() {
// //   const containerRef = useRef<HTMLDivElement | null>(null);
// //   const [vantaEffect, setVantaEffect] = useState<any>(null);

// //   useEffect(() => {
// //     if (!vantaEffect && containerRef.current) {
// //       const effect = GLOBE({
// //         el: containerRef.current,
// //         THREE,
// //         mouseControls: true,
// //         touchControls: true,
// //         gyroControls: false,
// //         minHeight: 200.0,
// //         minWidth: 500.0,
// //         scale: 1.0,
// //         scaleMobile: 1.0,
// //         backgroundColor: 0x000000,
// //         color: 0x434343,
// //         color2: 0x555555,
// //         size: 1.0,
// //       });
// //       setVantaEffect(effect);
// //     }
// //     return () => {
// //       if (vantaEffect) vantaEffect.destroy();
// //     };
// //   }, [vantaEffect]);

// //   return (
// //     <div
// //       ref={containerRef}
// //       className="absolute inset-0 -z-10 h-full w-full"
// //     />
// //   );
// // }


// "use client";

// import { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import GLOBE from "vanta/dist/vanta.globe.min";

// export default function VantaBackground() {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [vanta, setVanta] = useState<any>(null);

//   useEffect(() => {
//     if (!vanta && containerRef.current) {
//       const effect = GLOBE({
//         el: containerRef.current,
//         THREE,
//         mouseControls: true,
//         touchControls: true,
//         gyroControls: false,
//         minHeight: 200.0,
//         minWidth: 500.0,
//         scale: 1.0,
//         scaleMobile: 1.0,
//         backgroundColor: 0x000000,
//         color: 0xff3f81,
//         color2: 0xffffff,
//         size: 1.0,
//       });
//       setVanta(effect);
//     }
//     return () => {
//       if (vanta) vanta.destroy();
//     };
//   }, [vanta]);

//   return (
//     <div
//       ref={containerRef}
//       className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
//     />
//   );
// }



// "use client";

// import { useEffect, useRef, useState } from "react";
// import Script from "next/script";

// export default function VantaBackground() {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [vantaEffect, setVantaEffect] = useState<any>(null);

//   useEffect(() => {
//     const initVanta = () => {
//       if (window.VANTA && !vantaEffect && containerRef.current) {
//         const effect = window.VANTA.DOTS({
//           el: containerRef.current,
//           mouseControls: true,
//           touchControls: true,
//           gyroControls: false,
//           minHeight: 200.0,
//           minWidth: 200.0,
//           scale: 1.0,
//           scaleMobile: 1.0,
//           backgroundColor: 0x000000,
//           color: 0xbba797,
//           color2: 0xbba797,
//           size: 3.0,
//           spacing: 35,
//           showLines: true,
//         });
//         setVantaEffect(effect);
//       }
//     };

//     initVanta();

//     // Mimic the event subscription pattern from the script
//     const handlePageEvent = () => initVanta();
//     if (window.edit_page?.Event) {
//       window.edit_page.Event.subscribe("Page.beforeNewOneFadeIn", handlePageEvent);
//     }

//     return () => {
//       if (vantaEffect && typeof vantaEffect.destroy === "function") {
//         vantaEffect.destroy();
//       }
//       if (window.edit_page?.Event) {
//         window.edit_page.Event.unsubscribe("Page.beforeNewOneFadeIn", handlePageEvent);
//       }
//     };
//   }, [vantaEffect]);

//   return (
//     <>
//       {/* Load Three.js and Vanta.js scripts */}
//       <Script
//         src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
//         strategy="beforeInteractive"
//       />
//       <Script
//         src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js"
//         strategy="beforeInteractive"
//         onLoad={ () => {
//           if (containerRef.current) {
//             initVanta();
//           }
//         }}
//       />
//       <div
//         ref={containerRef}
//         className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
//       />
//     </>
//   );
// }

"use client";

import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";

/* Tell TS about the global injected by the Vanta script */
declare global {
  interface Window {
    VANTA?: any;
    edit_page?: {
      Event?: {
        subscribe?: (name: string, cb: () => void) => void;
        unsubscribe?: (name: string, cb: () => void) => void;
      };
    };
  }
}

export default function VantaBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<any>(null);

  // Safe initializer we can call from anywhere (onLoad, effects, etc.)
  const tryInit = useCallback(() => {
    if (!effectRef.current && window.VANTA && containerRef.current) {
      effectRef.current = window.VANTA.DOTS({
        el: containerRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: 0x000000,
        color: 0xdc6c1a,
        color2: 0xbba797,
        size: 3.0,
        spacing: 35,
        showLines: true,
      });
    }
  }, []);

  useEffect(() => {
    // Try immediately in case scripts are already cached/loaded
    tryInit();

    const handle = () => tryInit();
    // Guard these calls since that object is optional in your code
    window.edit_page?.Event?.subscribe?.("Page.beforeNewOneFadeIn", handle);

    return () => {
      // Clean up the Vanta instance if it exists
      try {
        effectRef.current?.destroy?.();
      } catch {}
      effectRef.current = null;

      window.edit_page?.Event?.unsubscribe?.("Page.beforeNewOneFadeIn", handle);
    };
  }, [tryInit]);

  return (
    <>
      {/* Load Three.js and Vanta globally (your current approach) */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js"
        strategy="beforeInteractive"
        onLoad={tryInit}
      />

      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        aria-hidden
      />
    </>
  );
}
