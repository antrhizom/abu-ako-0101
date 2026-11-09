import type { Metadata, Viewport } from "next";
import MonadenRaum from "@/components/MonadenRaum";
import { ladeKunst } from "@/lib/kunst";
import { cormorant } from "../schrift";
import { standort } from "../standort";

export const metadata: Metadata = {
  title: "Der Raum · pli · trace · réseau · monade",
  description:
    "Schwebende Monaden zum Hineinzoomen: ein Rundgang in sieben Stationen, vom Scheitern der Monade zu Falte, Spur, Netzwerk und Schaum.",
};

export const viewport: Viewport = {
  themeColor: "#f1ece3",
};

export default async function Raum() {
  const { standalone } = await standort();
  const kunst = await ladeKunst();

  return (
    <main className={cormorant.variable}>
      <MonadenRaum standalone={standalone} serif={cormorant.style.fontFamily} kunst={kunst} />
    </main>
  );
}
