import type { NextConfig } from "next";

/**
 * Die Monaden-Seite läuft zusätzlich eigenständig unter
 * pli-trace-reseau-monade.vercel.app (gleiches Projekt, gleiches Deployment).
 * Für diesen Host wird / auf die Seite umgeschrieben; die ABU-Startseite
 * bleibt für alle anderen Hosts unverändert.
 */
export const STANDALONE_HOST = "pli-trace-reseau-monade";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: `${STANDALONE_HOST}(\\..*)?` }],
          destination: "/pli-trace-reseau-monade",
        },
      ],
    };
  },
};

export default nextConfig;
