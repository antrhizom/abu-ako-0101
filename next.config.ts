import type { NextConfig } from "next";

/**
 * Die Monaden-Seite läuft zusätzlich eigenständig unter
 * pli-trace-reseau-monade.vercel.app (gleiches Projekt, gleiches Deployment).
 * Für diesen Host werden die kurzen Adressen auf die Seite umgeschrieben; die
 * ABU-Startseite bleibt für alle anderen Hosts unverändert.
 */
export const STANDALONE_HOST = "pli-trace-reseau-monade";

const host = [{ type: "host" as const, value: `${STANDALONE_HOST}(\\..*)?` }];
const ziel = "/pli-trace-reseau-monade";

const nextConfig: NextConfig = {
  images: {
    // Gemeinfreie Werke aus der Open-Access-Sammlung des Metropolitan Museum (CC0)
    remotePatterns: [new URL("https://images.metmuseum.org/CRDImages/**")],
    qualities: [75],
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", has: host, destination: ziel },
        { source: "/lehrgang/:kapitel", has: host, destination: `${ziel}/lehrgang/:kapitel` },
        { source: "/raum", has: host, destination: `${ziel}/raum` },
        { source: "/impressum", has: host, destination: `${ziel}/impressum` },
      ],
    };
  },
};

export default nextConfig;
