"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Die zwei Uhren von Leibniz (Système nouveau, 1695), erweitert auf viele.
 *
 * Modus «Harmonie»: ein einziges Gesetz treibt alle Zeiger — die prästabilierte
 * Harmonie, in der Gott alle Monaden von Anfang an aufeinander abgestimmt hat.
 * Modus «Welt»: jede Uhr folgt ihrem eigenen Gang. Nichts synchronisiert sie.
 * Modus «Übersetzung» (Latour): die Uhren gleichen sich nur lokal, mit
 * Verzögerung und Verlust an ihre Nachbarn an — Synchronisation als Arbeit,
 * nie als Zustand.
 */

type Modus = "harmonie" | "welt" | "uebersetzung";

const ANZAHL = 24;

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

    // Jede Uhr: Winkel + eigener Gang (leicht verschieden)
    const winkel = new Float64Array(ANZAHL);
    const gang = new Float64Array(ANZAHL);
    for (let i = 0; i < ANZAHL; i++) {
      winkel[i] = 0;
      gang[i] = 1 + (Math.sin(i * 12.9898) * 43758.5453 % 1) * 0.5 - 0.25; // ±25 %
    }
    let leitWinkel = 0;
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
      const omega = 1.2; // rad/s Grundgeschwindigkeit
      leitWinkel += omega * dt;

      for (let i = 0; i < ANZAHL; i++) {
        if (m === "harmonie") {
          // Ein Gesetz für alle: der Zeiger wird vom Leitwinkel geführt
          winkel[i] += (leitWinkel - winkel[i]) * 0.2;
        } else if (m === "welt") {
          winkel[i] += omega * gang[i] * dt;
        } else {
          // Lokale Angleichung an die Nachbarn, verzögert und unvollständig
          const links = winkel[(i - 1 + ANZAHL) % ANZAHL];
          const rechts = winkel[(i + 1) % ANZAHL];
          const mittel = (links + rechts) / 2;
          winkel[i] += omega * gang[i] * dt + (mittel - winkel[i]) * 0.04;
        }
      }

      // Zeichnen
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      ctx.clearRect(0, 0, W, H);

      const spalten = W < 500 ? 6 : 8;
      const zeilen = Math.ceil(ANZAHL / spalten);
      const zelle = Math.min(W / spalten, H / zeilen);
      const r = zelle * 0.36;
      const offX = (W - spalten * zelle) / 2;
      const offY = (H - zeilen * zelle) / 2;

      // Abweichung vom Mittel → Farbe
      let sumSin = 0;
      let sumCos = 0;
      for (let i = 0; i < ANZAHL; i++) {
        sumSin += Math.sin(winkel[i]);
        sumCos += Math.cos(winkel[i]);
      }
      const mittelWinkel = Math.atan2(sumSin, sumCos);

      for (let i = 0; i < ANZAHL; i++) {
        const cx = offX + (i % spalten) * zelle + zelle / 2;
        const cy = offY + Math.floor(i / spalten) * zelle + zelle / 2;
        let diff = Math.abs(((winkel[i] - mittelWinkel + Math.PI) % (2 * Math.PI)) - Math.PI);
        diff = Math.min(1, diff / Math.PI);
        const hue = 240 - diff * 200; // blau = synchron, rot = abweichend

        // Verbindung zum Nachbarn im Übersetzungsmodus
        if (m === "uebersetzung" && i % spalten !== spalten - 1 && i + 1 < ANZAHL) {
          ctx.beginPath();
          ctx.moveTo(cx + r, cy);
          ctx.lineTo(cx + zelle - r, cy);
          ctx.strokeStyle = "rgba(255,255,255,0.12)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${hue}, 80%, 70%, 0.6)`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(winkel[i]) * r * 0.85, cy + Math.sin(winkel[i]) * r * 0.85);
        ctx.strokeStyle = `hsla(${hue}, 90%, 80%, 0.95)`;
        ctx.lineWidth = 2;
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

  const knoepfe: { id: Modus; label: string; text: string }[] = [
    {
      id: "harmonie",
      label: "Harmonie",
      text: "Leibniz: Gott hat alle Uhren von Anfang an aufeinander abgestimmt. Ein Gesetz, eine Zeit.",
    },
    {
      id: "welt",
      label: "Welt",
      text: "Ohne das eine Gesetz: Jede Uhr geht nach ihrem eigenen Gang. Nichts synchronisiert sie.",
    },
    {
      id: "uebersetzung",
      label: "Übersetzung",
      text: "Latour: Uhren gleichen sich nur an ihre Nachbarn an — lokal, verzögert, mit Verlust. Synchronisation ist Arbeit, nie Zustand.",
    },
  ];

  return (
    <div className="glass rounded-3xl p-4 sm:p-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {knoepfe.map((k) => (
          <button
            key={k.id}
            onClick={() => setModus(k.id)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              modus === k.id
                ? "bg-white/15 text-white"
                : "glass text-zinc-300 hover:bg-white/10"
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-[260px] sm:h-[320px]"
        aria-label="Viele Uhren: synchronisiert, frei laufend oder lokal übersetzt"
      />
      <p className="mt-4 text-sm text-zinc-400">
        {knoepfe.find((k) => k.id === modus)?.text}
      </p>
    </div>
  );
}
