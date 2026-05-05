"use client";

import { useState } from "react";
import type { ThemaDigital } from "@/lib/digitaleKompetenzen";

interface Props {
  themen: ThemaDigital[];
}

export default function ThemenIntensitaet({ themen }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {themen.map((t, idx) => {
        const intensitaet = t.digitalIntensitaet;
        const balken = Array.from({ length: 5 }, (_, i) => i < intensitaet);

        return (
          <div
            key={t.nr}
            className="relative rounded-xl glass p-4 transition-all hover:scale-[1.01] animate-slide-up"
            style={{ animationDelay: `${0.5 + idx * 0.06}s` }}
            onMouseEnter={() => setHovered(t.nr)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-zinc-500 w-8 shrink-0">
                {String(t.nr).padStart(2, "0")}
              </span>
              <span className="flex-1 text-sm font-medium text-zinc-200">{t.titel}</span>
              <div className="flex gap-1 shrink-0">
                {balken.map((aktiv, i) => (
                  <div
                    key={i}
                    className={`h-5 w-2 rounded-sm transition-all ${
                      aktiv
                        ? intensitaet >= 5
                          ? "bg-fuchsia-400 animate-pulse-glow"
                          : intensitaet >= 4
                          ? "bg-indigo-400"
                          : intensitaet >= 3
                          ? "bg-blue-400"
                          : intensitaet >= 2
                          ? "bg-cyan-400"
                          : "bg-zinc-500"
                        : "bg-zinc-800"
                    }`}
                    style={{
                      boxShadow: aktiv ? `0 0 8px currentColor` : "none",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
            {hovered === t.nr && (
              <p className="mt-3 text-xs text-zinc-400 italic animate-fade-in">
                → {t.digitalKurz}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
