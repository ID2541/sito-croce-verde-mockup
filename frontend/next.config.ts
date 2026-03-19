import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/contatti", destination: "/sedi-contatti", permanent: true },
      { source: "/sezioni", destination: "/sedi-contatti", permanent: true },
      { source: "/formazione", destination: "/volontariato-formazione", permanent: true },
      { source: "/news", destination: "/news-eventi", permanent: true },
      { source: "/news/:slug", destination: "/news-eventi/:slug", permanent: true },
      { source: "/servizi/:slug", destination: "/servizi", permanent: true },
    ];
  },
};

export default nextConfig;
