// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* custom config here if needed */
// };

// export default nextConfig;


// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const config: NextConfig = {
  // Silence the “inferred workspace root” warnings (build & start)
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingRoot: path.resolve(__dirname),
 
};

export default config;
