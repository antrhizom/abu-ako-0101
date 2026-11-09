"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Kunstwerk } from "@/lib/kunst";

/**
 * Die Wand: Bilder mit Fragen, keine Erklärungen. Ein Klick öffnet das Bild
 * gross; über die Motive wandert man weiter, ohne Ziel.
 */

export interface Exponat {
  frage: string;
  motive: string[];
  gross?: boolean;
  werk?: Kunstwerk;
}

const KLEIN = "font-sans text-[10px] uppercase tracking-[0.2em]";

// Leichte Schieflage wie an einer alten Bilderwand, pro Bild gleichbleibend
function neigung(i: number) {
  const r = ((i * 9301 + 49297) % 233280) / 233280;
  return (r - 0.5) * 3.2;
}

export default function Kabinett({ exponate, lehrgang }: { exponate: Exponat[]; lehrgang: string }) {
  const [offen, setOffen] = useState<number | null>(null);
  const [wer, setWer] = useState(false);
  const [gesehen, setGesehen] = useState<Set<number>>(new Set());

  const oeffne = useCallback((i: number) => {
    setOffen(i);
    setWer(false);
    setGesehen((g) => new Set(g).add(i));
  }, []);

  useEffect(() => {
    if (offen === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOffen(null);
      if (e.key === "ArrowRight") oeffne((offen + 1) % exponate.length);
      if (e.key === "ArrowLeft") oeffne((offen - 1 + exponate.length) % exponate.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [offen, exponate.length, oeffne]);

  const aktuell = offen !== null ? exponate[offen] : null;

  // Irgendein anderes Bild, bevorzugt eines, das man noch nicht gesehen hat
  const zufaellig = useCallback(() => {
    if (offen === null) return;
    const alle = exponate.map((_, i) => i).filter((i) => i !== offen);
    const neu = alle.filter((i) => !gesehen.has(i));
    const pool = neu.length ? neu : alle;
    oeffne(pool[Math.floor(Math.random() * pool.length)]);
  }, [offen, exponate, gesehen, oeffne]);

  // Verwandte: andere Bilder, die ein Motiv teilen
  const verwandte = useMemo(() => {
    if (!aktuell) return [];
    const m = new Map<string, number[]>();
    for (const motiv of aktuell.motive) {
      m.set(
        motiv,
        exponate
          .map((e, i) => ({ e, i }))
          .filter(({ e, i }) => i !== offen && e.motive.includes(motiv))
          .map(({ i }) => i)
      );
    }
    return [...m.entries()];
  }, [aktuell, exponate, offen]);

  return (
    <div className="font-monade min-h-screen bg-[#f1ece3] text-[#2b2723]">
      {/* Kopf */}
      <header className="flex items-baseline justify-between px-5 pt-5 sm:px-8 sm:pt-7">
        <span className="text-[15px] tracking-[0.22em] text-[#5c564d]">pli · trace · réseau · monade</span>
        <span className={`${KLEIN} text-[#9a9286]`}>
          {gesehen.size} / {exponate.length}
        </span>
      </header>

      <p className="mx-auto mt-10 max-w-[30rem] px-6 text-center text-[1.25rem] font-light italic leading-[1.5] text-[#6d665c] sm:mt-14">
        Es gibt hier nichts zu gewinnen. Schau die Bilder an, rate, und folge den Wörtern. Erklärt wird später.
      </p>

      {/* Die Wand */}
      <div className="mx-auto mt-10 max-w-[76rem] columns-2 gap-4 px-4 sm:mt-14 sm:gap-6 sm:px-8 md:columns-3 lg:columns-4">
        {exponate.map((e, i) => (
          <button
            key={i}
            onClick={() => oeffne(i)}
            className="group mb-4 block w-full break-inside-avoid text-left sm:mb-6"
            style={{ transform: `rotate(${neigung(i)}deg)` }}
            aria-label={e.frage}
          >
            <div
              className="relative overflow-hidden border border-black/15 bg-[#e6e0d4] shadow-[0_1px_2px_rgba(43,39,35,0.15),0_12px_30px_-12px_rgba(43,39,35,0.35)] transition-transform duration-500 group-hover:scale-[1.015]"
            >
              {e.werk ? (
                <Image
                  src={e.werk.quelle}
                  alt=""
                  width={e.gross ? 1200 : 800}
                  height={e.gross ? 900 : 600}
                  sizes="(min-width: 1024px) 19rem, (min-width: 768px) 30vw, 50vw"
                  style={{ width: "100%", height: "auto" }}
                  className={`block transition-all duration-700 ${gesehen.has(i) ? "" : "sepia-[.2] saturate-[.85]"} group-hover:sepia-0 group-hover:saturate-100`}
                />
              ) : (
                <div className={`${e.gross ? "aspect-[4/3]" : "aspect-[3/4]"} w-full bg-[#e6e0d4]`} />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f1c19]/70 to-transparent px-3 pb-2.5 pt-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-[1.05rem] italic leading-[1.3] text-[#f1ece3]">{e.frage}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Fuss: der einzige Hinweis auf das, was dahinter liegt */}
      <footer className="mx-auto mt-16 flex max-w-[76rem] flex-col items-center gap-6 px-6 pb-16 sm:mt-24">
        <Link
          href={lehrgang}
          className="text-[1.15rem] italic text-[#6d665c] underline decoration-black/15 underline-offset-4 transition-colors hover:text-[#1f1c19] hover:decoration-black/50"
        >
          Was das alles soll → der Lehrgang
        </Link>
        <Link href={`${lehrgang.replace(/\/lehrgang$/, "")}/impressum`} className={`${KLEIN} text-[#9a9286] hover:text-[#3a352f]`}>
          Impressum
        </Link>
      </footer>

      {/* Das geöffnete Bild */}
      {aktuell && offen !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={aktuell.frage}
          className="fixed inset-0 z-50 flex flex-col bg-[#f1ece3]/96 backdrop-blur-sm"
          onClick={() => setOffen(null)}
        >
          <div className="flex items-baseline justify-between px-5 pt-5 sm:px-8 sm:pt-7" onClick={(ev) => ev.stopPropagation()}>
            <button onClick={zufaellig} className={`${KLEIN} text-[#857d71] hover:text-[#1f1c19]`}>
              irgendwohin →
            </button>
            <button onClick={() => setOffen(null)} className={`${KLEIN} text-[#857d71] hover:text-[#1f1c19]`}>
              schliessen ×
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 px-5 pb-6 sm:gap-7" onClick={(ev) => ev.stopPropagation()}>
            <div className="relative h-[46vh] w-full max-w-[64rem] sm:h-[54vh]">
              {aktuell.werk ? (
                <Image
                  src={aktuell.werk.quelle}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 64rem, 100vw"
                  className="object-contain drop-shadow-[0_18px_40px_rgba(43,39,35,0.3)]"
                />
              ) : (
                <div className="mx-auto h-full w-2/3 border border-dashed border-black/20" />
              )}
            </div>

            <p className="max-w-[36rem] text-center text-[1.7rem] font-light italic leading-[1.25] text-[#1f1c19] sm:text-[2.2rem]">
              {aktuell.frage}
            </p>

            <div className="flex max-w-[44rem] flex-wrap justify-center gap-x-5 gap-y-2">
              {verwandte.map(([motiv, ziele]) => (
                <span key={motiv} className="flex items-baseline gap-2">
                  <span className="text-[1.1rem] italic text-[#6d665c]">{motiv}</span>
                  {ziele.slice(0, 3).map((z) => (
                    <button
                      key={z}
                      onClick={() => oeffne(z)}
                      className="h-2.5 w-2.5 rounded-full border border-[#2b2723]/40 bg-white/60 transition-colors hover:bg-[#2b2723]"
                      aria-label={`weiter zu: ${exponate[z].frage}`}
                      title={exponate[z].frage}
                    />
                  ))}
                </span>
              ))}
            </div>

            <div className="flex items-baseline gap-4">
              <button onClick={() => setWer((v) => !v)} className={`${KLEIN} text-[#9a9286] hover:text-[#3a352f]`}>
                {wer ? "– Bild" : "+ Bild?"}
              </button>
              {wer && aktuell.werk && (
                <a
                  href={aktuell.werk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[11px] tracking-[0.03em] text-[#857d71] underline-offset-2 hover:underline"
                >
                  {aktuell.werk.kuenstler ? `${aktuell.werk.kuenstler}, ` : ""}
                  {aktuell.werk.titel}
                  {aktuell.werk.datum ? ` (${aktuell.werk.datum})` : ""} · The Met, CC0
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
