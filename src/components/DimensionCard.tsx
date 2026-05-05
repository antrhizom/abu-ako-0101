"use client";

import { useState } from "react";
import type { KompetenzDimension } from "@/lib/digitaleKompetenzen";

interface Props {
  dim: KompetenzDimension;
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

export default function DimensionCard({ dim, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const c = colorMap[dim.farbe];

  return (
    <div
      className={`relative rounded-3xl ${c.glass} ${c.glow} p-8 transition-all duration-500 hover:scale-[1.02] animate-slide-up`}
      style={{ animationDelay: `${0.2 + index * 0.15}s` }}
    >
      {/* Schwebendes Emoji */}
      <div className="text-5xl mb-4 animate-float-slow inline-block">{dim.emoji}</div>

      <h3 className={`text-3xl font-bold ${c.text} mb-2`}>{dim.titel}</h3>
      <p className={`text-sm ${c.accent} font-medium mb-4`}>{dim.untertitel}</p>
      <p className="text-sm text-zinc-400 leading-relaxed mb-6">{dim.beschreibung}</p>

      <button
        onClick={() => setExpanded(!expanded)}
        className={`text-xs font-medium ${c.accent} hover:opacity-80 transition-opacity`}
      >
        {expanded ? "↑ Weniger zeigen" : `↓ ${dim.anforderungen.length} digitale Anforderungen`}
      </button>

      {expanded && (
        <div className="mt-6 space-y-4 animate-fade-in">
          {dim.anforderungen.map((a, i) => (
            <div
              key={i}
              className={`rounded-2xl border ${c.border} bg-black/20 p-4 backdrop-blur`}
            >
              <h4 className={`text-sm font-bold ${c.accent} mb-1.5`}>{a.bereich}</h4>
              <p className="text-xs text-zinc-300 leading-relaxed mb-2">{a.beschreibung}</p>
              <div className="flex flex-wrap gap-1">
                {a.themen.map((t, j) => (
                  <span
                    key={j}
                    className={`rounded-full border ${c.border} px-2 py-0.5 text-[10px] text-zinc-400`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
