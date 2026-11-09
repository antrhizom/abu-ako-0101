import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { KAPITEL } from "@/lib/lehrgang";
import { cormorant } from "./schrift";
import { standort } from "./standort";

export const metadata: Metadata = {
  title: "pli · trace · réseau · monade",
  description:
    "Ein Lehrgang: Wozu Philosophie? Die Welt um 1700, die Monade, und die Antworten auf ihr Scheitern — Falte, Spur, Netzwerk, Schaum.",
};

export const viewport: Viewport = {
  themeColor: "#f1ece3",
};

const TEIL_II = [
  { wort: "pli", de: "die Falte", autor: "Deleuze" },
  { wort: "trace", de: "die Spur", autor: "Derrida" },
  { wort: "réseau", de: "das Netzwerk", autor: "Latour, Tarde" },
  { wort: "schaum", de: "Blasen, Globen, Schäume", autor: "Sloterdijk" },
  { wort: "tableau", de: "die Ordnung der Fläche", autor: "Foucault" },
];

export default async function Start() {
  const { standalone, basis } = await standort();

  return (
    <main
      className={`${cormorant.variable} font-monade min-h-screen bg-[#f1ece3] px-6 pb-24 pt-10 text-[#2b2723] sm:px-10`}
    >
      <div className="mx-auto max-w-[40rem]">
        <header className="flex items-baseline justify-between gap-4">
          <span className="text-[15px] tracking-[0.22em] text-[#5c564d]">pli · trace · réseau · monade</span>
          {!standalone && (
            <Link
              href="/"
              className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#9a9286] transition-colors hover:text-[#3a352f]"
            >
              abu ako
            </Link>
          )}
        </header>

        <h1 className="mt-14 text-[2.6rem] font-light leading-[1.05] text-[#1f1c19] sm:text-[3.4rem]">
          Wie wir in der Welt sind
        </h1>
        <p className="mt-4 text-[1.2rem] italic leading-[1.5] text-[#6d665c]">
          Ein Lehrgang über Philosophien, die die Welt nicht als Werk einzelner Ichs verstehen, sondern als
          Zusammenspiel vieler.
        </p>
        <p className="mt-6 text-[1.08rem] leading-[1.65] text-[#3a352f]">
          Niemand überblickt die Welt, und trotzdem leben wir in ihr, handeln, entscheiden. Dieser Lehrgang führt zu
          Denkerinnen und Denkern, die dafür Bilder gefunden haben. Er beginnt ganz vorne: bei der Frage, wozu
          Philosophie überhaupt gut ist, bei der Welt um 1700 und bei einem Bild, das gescheitert ist und uns
          trotzdem bis heute zu denken gibt, der Monade von Leibniz. Erst darauf bauen die Antworten der Späteren
          auf.
        </p>

        {/* Teil I */}
        <section className="mt-14">
          <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#857d71]">Teil I · Grundlagen</div>
          <ol className="mt-4 space-y-4">
            {KAPITEL.map((k) => (
              <li key={k.slug}>
                <Link
                  href={`${basis}/lehrgang/${k.slug}`}
                  className="group block rounded-sm border border-black/10 bg-white/40 px-5 py-4 transition-colors hover:border-black/30 hover:bg-white/60"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#857d71]">
                      Kapitel {k.nummer} · {k.minuten} Min.
                    </div>
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#9a9286] transition-colors group-hover:text-[#1f1c19]">
                      lesen →
                    </span>
                  </div>
                  <div className="mt-1.5 text-[1.7rem] font-light leading-[1.1] text-[#1f1c19]">{k.titel}</div>
                  <div className="mt-0.5 text-[1.05rem] italic text-[#7a7368]">{k.untertitel}</div>
                  <ul className="mt-3 space-y-1 text-[0.95rem] leading-[1.5] text-[#4a443d]">
                    {k.worum.map((w) => (
                      <li key={w} className="flex gap-2">
                        <span className="text-[#9a9286]">·</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* Teil II */}
        <section className="mt-14">
          <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#857d71]">
            Teil II · Die Antworten
          </div>
          <p className="mt-3 text-[1.02rem] leading-[1.6] text-[#4a443d]">
            Wenn der Uhrmacher fehlt: Wie kommen Standpunkte zusammen, die keine Fenster haben? Vier Antworten,
            je ein Kapitel. In Arbeit; sie folgen, sobald Teil I steht.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {TEIL_II.map((t) => (
              <li key={t.wort} className="rounded-sm border border-dashed border-black/15 px-4 py-3">
                <span className="text-[1.25rem] italic text-[#6d665c]">{t.wort}</span>
                <span className="text-[1rem] text-[#857d71]"> · {t.de}</span>
                <div className="mt-0.5 font-sans text-[10px] uppercase tracking-[0.18em] text-[#9a9286]">
                  {t.autor} · folgt
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Teil III */}
        <section className="mt-14">
          <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#857d71]">Teil III · Der Raum</div>
          <Link
            href={`${basis}/raum`}
            className="group mt-4 block rounded-sm border border-black/10 bg-white/40 px-5 py-4 transition-colors hover:border-black/30 hover:bg-white/60"
          >
            <div className="flex items-baseline justify-between gap-4">
              <div className="text-[1.7rem] font-light leading-[1.1] text-[#1f1c19]">Monaden zum Hineinzoomen</div>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#9a9286] transition-colors group-hover:text-[#1f1c19]">
                öffnen →
              </span>
            </div>
            <p className="mt-2 text-[0.95rem] leading-[1.5] text-[#4a443d]">
              Der interaktive Teil: Jede Position ist eine schwebende Monade mit eigener Welt. Ein Rundgang in sieben
              Stationen, mit Beispielen aus dem Leben. Am besten nach Teil I.
            </p>
          </Link>
        </section>

        <footer className="mt-20 flex gap-6 font-sans text-[10px] uppercase tracking-[0.2em] text-[#9a9286]">
          <Link href={`${basis}/impressum`} className="transition-colors hover:text-[#3a352f]">
            Impressum
          </Link>
        </footer>
      </div>
    </main>
  );
}
