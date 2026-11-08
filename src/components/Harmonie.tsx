"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Die zwei Uhren von Leibniz (Système nouveau, 1695), erweitert auf viele.
 *
 * «harmonie»: ein einziges Gesetz treibt alle Zeiger — die prästabilierte
 * Harmonie. «welt»: jede Uhr folgt ihrem eigenen Gang, nichts synchronisiert
 * sie. «übersetzung» (Latour): Die Uhren gleichen sich nur lokal, verzögert
 * und mit Verlust an ihre Nachbarn an — Synchronisation als Arbeit.
 */

type Modus = "harmonie" | "welt" | "uebersetzung";

const ANZAHL = 12;
const SPALTEN = 6;

const MODI: { id: Modus; label: string; text: string }[] = [
  { id: "harmonie", label: "harmonie", text: "Ein Gesetz, eine Zeit — vom Uhrmacher eingestellt." },
  { id: "welt", label: "welt", text: "Ohne Uhrmacher: Jede Uhr geht ihren eigenen Gang." },
  { id: "uebersetzung", label: "übersetzung", text: "Latour: nur lokale Angleichung, verzögert, mit Verlust." },
];

export default function Harmonie() {
  const [modus, setModus] = useState<Modus>("harmonie");
  const modusRef = useRef<Modus>("harmonie");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    modusRef.current = modus;
  }, [modus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const winkel = new Float64Array(ANZAHL);
    const gang = new Float64Array(ANZAHL);
    for (let i = 0; i < ANZAHL; i++) {
      gang[i] = 1 + (((Math.sin(i * 12.9898) * 43758.5453) % 1) * 0.5 - 0.25);
    }
    let leit = 0;
    let raf = 0;
    let letzte = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const schritt = (jetzt: number) => {
      const dt = Math.min(0.05, (jetzt - letzte) / 1000);
      letzte = jetzt;
      const m = modusRef.current;
      const omega = 1.1;
      leit += omega * dt;
      for (let i = 0; i < ANZAHL; i++) {
        if (m === "harmonie") winkel[i] += (leit - winkel[i]) * 0.2;
        else if (m === "welt") winkel[i] += omega * gang[i] * dt;
        else {
          const nb = (winkel[(i - 1 + ANZAHL) % ANZAHL] + winkel[(i + 1) % ANZAHL]) / 2;
          winkel[i] += omega * gang[i] * dt + (nb - winkel[i]) * 0.04;
        }
      }

      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      ctx.clearRect(0, 0, W, H);
      const zeilen = Math.ceil(ANZAHL / SPALTEN);
      const zelle = Math.min(W / SPALTEN, H / zeilen);
      const r = zelle * 0.34;
      const ox = (W - SPALTEN * zelle) / 2;
      const oy = (H - zeilen * zelle) / 2;

      let ss = 0;
      let sc = 0;
      for (let i = 0; i < ANZAHL; i++) {
        ss += Math.sin(winkel[i]);
        sc += Math.cos(winkel[i]);
      }
      const mittel = Math.atan2(ss, sc);

      for (let i = 0; i < ANZAHL; i++) {
        const cx = ox + (i % SPALTEN) * zelle + zelle / 2;
        const cy = oy + Math.floor(i / SPALTEN) * zelle + zelle / 2;
        const diff = Math.min(1, Math.abs(((winkel[i] - mittel + Math.PI * 3) % (Math.PI * 2)) - Math.PI) / Math.PI);

        if (m === "uebersetzung" && i % SPALTEN !== SPALTEN - 1) {
          ctx.beginPath();
          ctx.moveTo(cx + r * 1.15, cy);
          ctx.lineTo(cx + zelle - r * 1.15, cy);
          ctx.strokeStyle = "rgba(43,39,35,0.15)";
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(43,39,35,0.28)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(winkel[i]) * r * 0.82, cy + Math.sin(winkel[i]) * r * 0.82);
        ctx.strokeStyle = `hsl(${30 - diff * 16}, ${15 + diff * 40}%, ${20 + diff * 24}%)`;
        ctx.lineWidth = 1.4;
        ctx.lineCap = "round";
        ctx.stroke();
      }
      raf = requestAnimationFrame(schritt);
    };
    raf = requestAnimationFrame(schritt);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="h-[130px] w-full"
        aria-label="Zwölf Uhren: synchronisiert, frei laufend oder lokal übersetzt"
      />
      <div className="mt-2 flex gap-4 text-[0.98rem] italic">
        {MODI.map((k) => (
          <button
            key={k.id}
            onClick={() => setModus(k.id)}
            className={`transition-colors ${
              modus === k.id ? "text-[#1f1c19]" : "text-[#9a9286] hover:text-[#3a352f]"
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>
      <p className="mt-1 font-sans text-[10px] tracking-[0.06em] text-[#9a9286]">
        {MODI.find((k) => k.id === modus)?.text}
      </p>
    </div>
  );
}
