import { headers } from "next/headers";

/**
 * Unter pli-trace-reseau-monade.vercel.app läuft die Seite eigenständig,
 * mit kurzen Adressen (/, /lehrgang/…, /raum, /impressum). Innerhalb der
 * ABU-Seite liegt alles unter /pli-trace-reseau-monade.
 */
export async function standort() {
  const host = (await headers()).get("host") ?? "";
  const standalone =
    host.startsWith("pli-trace-reseau-monade") || process.env.NEXT_PUBLIC_SITE === "pli-trace-reseau-monade";
  return { standalone, basis: standalone ? "" : "/pli-trace-reseau-monade" };
}
