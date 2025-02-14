/// <reference types="vite/client" />

// WebAssembly module types
declare module '/scripts/*.js' {
  export function initWasm(): Promise<{
    instance: WebAssembly.Instance;
    worker: Worker;
  }>;
}

// Settings module types
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
