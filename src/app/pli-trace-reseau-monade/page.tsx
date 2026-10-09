import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond } from "next/font/google";
import MonadenRaum from "@/components/MonadenRaum";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "pli · trace · réseau · monade",
  description:
    "Schwebende Monaden zum Hineinzoomen: Leibniz will eine Welt berechnen und synchronisieren, die sich weder berechnen noch synchronisieren lässt. Falte, Spur und Netzwerk antworten darauf.",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
};

export default async function PliTraceReseauMonade() {
  // Unter pli-trace-reseau-monade.vercel.app eigenständig: keine Links zur ABU-Seite
  const host = (await headers()).get("host") ?? "";
  const standalone =
    host.startsWith("pli-trace-reseau-monade") || process.env.NEXT_PUBLIC_SITE === "pli-trace-reseau-monade";

  return (
    <main className={cormorant.variable}>
      <MonadenRaum standalone={standalone} serif={cormorant.style.fontFamily} />
    </main>
  );
}
