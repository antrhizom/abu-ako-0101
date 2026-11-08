import type { NextConfig } from "next";

/**
 * Die Monaden-Seite läuft zusätzlich eigenständig unter
 * pli-trace-reseau-monade.vercel.app (gleiches Projekt, gleiches Deployment).
 * Für diesen Host werden / und /impressum auf die Seite umgeschrieben; die
 * ABU-Startseite bleibt für alle anderen Hosts unverändert.
 */
export const STANDALONE_HOST = "pli-trace-reseau-monade";

const host = [{ type: "host" as const, value: `${STANDALONE_HOST}(\\..*)?` }];

const nextConfig: NextConfig = {
  images: {
    // Gemeinfreie Werke aus der Open-Access-Sammlung des Metropolitan Museum (CC0)
    remotePatterns: [new URL("https://images.metmuseum.org/CRDImages/**")],
    qualities: [75],
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", has: host, destination: "/pli-trace-reseau-monade" },
        { source: "/impressum", has: host, destination: "/pli-trace-reseau-monade/impressum" },
      ],
    };
  },
};

export default nextConfig;
