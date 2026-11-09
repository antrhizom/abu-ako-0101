import type { Metadata, Viewport } from "next";
import Kabinett, { type Exponat } from "@/components/Kabinett";
import { KABINETT, kabinettIds } from "@/lib/kabinett";
import { ladeWerke } from "@/lib/kunst";
import { cormorant } from "./schrift";
import { standort } from "./standort";

export const metadata: Metadata = {
  title: "pli · trace · réseau · monade",
  description:
    "Ein Kabinett aus Bildern der Zeit um 1700, jedes mit einer Frage. Schau, rate, wandere. Die Erklärungen folgen im Lehrgang.",
};

export const viewport: Viewport = {
  themeColor: "#f1ece3",
};

export default async function Start() {
  const { basis } = await standort();
  const werke = await ladeWerke(kabinettIds());
  const exponate: Exponat[] = KABINETT.map((b) => ({
    frage: b.frage,
    motive: b.motive,
    gross: b.gross,
    werk: [b.metId, ...(b.ersatz ?? [])].map((id) => werke.get(id)).find(Boolean),
  }));

  return (
    <main className={cormorant.variable}>
      <Kabinett exponate={exponate} lehrgang={`${basis}/lehrgang`} />
    </main>
  );
}
