"use client";

import { useState } from "react";
import type { KompetenzDimension, MatrixDaten } from "@/lib/digitaleKompetenzen";

interface Props {
  dim: KompetenzDimension;
  matrix: MatrixDaten;
  index: number;
}

const colorMap: Record<string, { glass: string; glow: string; text: string; accent: string; border: string; ring: string }> = {
  amber: {
    glass: "glass-amber",
    glow: "glow-amber",
    text: "gradient-text-amber",
    accent: "text-amber-300",
    border: "border-amber-400/30",
    ring: "ring-amber-400/40",
  },
  blue: {
    glass: "glass-blue",
    glow: "glow-blue",
    text: "gradient-text-blue",
    accent: "text-blue-300",
    border: "border-blue-400/30",
    ring: "ring-blue-400/40",
  },
  emerald: {
    glass: "glass-emerald",
    glow: "glow-emerald",
    text: "gradient-text-emerald",
    accent: "text-emerald-300",
    border: "border-emerald-400/30",
    ring: "ring-emerald-400/40",
  },
};

export default function DimensionCard({ dim, matrix, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const c = colorMap[dim.farbe];

  const digitalCount = matrix.items.filter((i) => i.istDigital).length;
  const kiCount = matrix.items.filter((i) => i.istKI).length;

  return (
    <div
      className={`relative rounded-3xl ${c.glass} ${c.glow} p-8 transition-all duration-500 hover:scale-[1.02] animate-slide-up`}
      style={{ animationDelay: `${0.2 + index * 0.15}s` }}
    >
      <div className="text-5xl mb-4 animate-float-slow inline-block">{dim.emoji}</div>

      <h3 className={`text-3xl font-bold ${c.text} mb-2`}>{dim.titel}</h3>
      <p className={`text-sm ${c.accent} font-medium mb-4`}>{dim.untertitel}</p>
      <p className="text-sm text-zinc-400 leading-relaxed mb-5">{dim.beschreibung}</p>

      {/* Stats */}
      <div className="flex gap-3 mb-5">
        <div className="rounded-lg bg-black/30 px-3 py-2 text-center flex-1">
          <div className="text-xl font-bold text-white">{matrix.items.length}</div>
          <div className="text-[9px] text-zinc-500 uppercase tracking-wide">Total</div>
        </div>
        <div className={`rounded-lg ${c.glass} px-3 py-2 text-center flex-1`}>
          <div className={`text-xl font-bold ${c.accent}`}>{digitalCount}</div>
          <div className="text-[9px] text-zinc-500 uppercase tracking-wide">digital</div>
        </div>
        <div className="rounded-lg bg-fuchsia-500/10 border border-fuchsia-400/30 px-3 py-2 text-center flex-1">
          <div className="text-xl font-bold text-fuchsia-300">{kiCount}</div>
          <div className="text-[9px] text-zinc-500 uppercase tracking-wide">KI</div>
        </div>
      </div>

      {/* Liste aller Items mit Markierung */}
      <div className="space-y-1.5 mb-4">
        {matrix.items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-md bg-black/20 px-2.5 py-1.5"
          >
            <div className="flex gap-1 shrink-0">
              {item.istKI && (
                <span
                  className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 animate-pulse-glow"
                  title="KI-relevant"
                />
              )}
              {item.istDigital && !item.istKI && (
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    dim.farbe === "amber"
                      ? "bg-amber-400"
                      : dim.farbe === "blue"
                      ? "bg-blue-400"
                      : "bg-emerald-400"
                  } animate-pulse-glow`}
                  title="Digital relevant"
                />
              )}
              {!item.istDigital && !item.istKI && (
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
              )}
            </div>
            <span
              className={`text-[11px] leading-tight ${
                item.istKI
                  ? "text-fuchsia-200 font-medium"
                  : item.istDigital
                  ? "text-zinc-200"
                  : "text-zinc-500"
              }`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className={`text-xs font-medium ${c.accent} hover:opacity-80 transition-opacity`}
      >
        {expanded ? "↑ Weniger zeigen" : `↓ Digital-Details zeigen`}
      </button>

      {expanded && (
        <div className="mt-5 space-y-3 animate-fade-in">
          {matrix.items
            .filter((i) => i.istDigital)
            .map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl border ${
                  item.istKI ? "border-fuchsia-400/40 bg-fuchsia-500/5" : `${c.border} bg-black/20`
                } p-3 backdrop-blur`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {item.istKI && (
                    <span className="rounded-full bg-fuchsia-500/20 border border-fuchsia-400/40 px-1.5 py-0.5 text-[8px] font-bold text-fuchsia-300 uppercase tracking-wide">
                      KI
                    </span>
                  )}
                  <h4
                    className={`text-xs font-bold ${
                      item.istKI ? "text-fuchsia-200" : c.accent
                    }`}
                  >
                    {item.name}
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {item.digitalNote}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
