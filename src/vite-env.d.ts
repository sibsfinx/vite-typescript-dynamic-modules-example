/// <reference types="vite/client" />

declare module '/scripts/example-wasm.js' {
  export function initWasm(): Promise<{
    instance: WebAssembly.Instance;
    worker: Worker;
  }>;
}

declare module '/settings/*.js' {
  const config: {
    apiUrl: string;
    debug: boolean;
    features: {
      experimentalFeatures: boolean;
      betaAccess: boolean;
    };
    analytics: {
      enabled: boolean;
      trackingId?: string;
    };
  };
  export default config;
}
