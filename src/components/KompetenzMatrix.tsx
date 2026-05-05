"use client";

import { useState } from "react";
import type { MatrixDaten } from "@/lib/digitaleKompetenzen";
import { themenKurzNamen } from "@/lib/digitaleKompetenzen";

interface Props {
  matrix: MatrixDaten;
}

const colorMap = {
  amber: {
    border: "border-amber-400/30",
    cellDigital: "bg-amber-400/30 text-amber-200 border-amber-400/60",
    cellNormal: "bg-amber-400/10 text-amber-300/70 border-amber-400/20",
    icon: "💬",
    digitalDot: "bg-amber-400",
    accent: "text-amber-300",
    glow: "shadow-amber-400/40",
  },
  blue: {
    border: "border-blue-400/30",
    cellDigital: "bg-blue-400/30 text-blue-200 border-blue-400/60",
    cellNormal: "bg-blue-400/10 text-blue-300/70 border-blue-400/20",
    icon: "🎯",
    digitalDot: "bg-blue-400",
    accent: "text-blue-300",
    glow: "shadow-blue-400/40",
  },
  emerald: {
    border: "border-emerald-400/30",
    cellDigital: "bg-emerald-400/30 text-emerald-200 border-emerald-400/60",
    cellNormal: "bg-emerald-400/10 text-emerald-300/70 border-emerald-400/20",
    icon: "🌐",
    digitalDot: "bg-emerald-400",
    accent: "text-emerald-300",
    glow: "shadow-emerald-400/40",
  },
};

const dimensionLabels = {
  sprachmodi: "Sprachmodi",
  schluesselkompetenzen: "Schlüsselkompetenzen",
  "gesellschaftliche-inhalte": "Gesellschaftliche Inhalte",
};

export default function KompetenzMatrix({ matrix }: Props) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const c = colorMap[matrix.farbe];

  return (
    <div className={`rounded-3xl glass border-2 ${c.border} p-4 sm:p-6 overflow-hidden`}>
      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl">{c.icon}</span>
        <h3 className={`text-xl font-bold ${c.accent}`}>{dimensionLabels[matrix.dimension]}</h3>
      </div>
      <p className="text-xs text-zinc-500 mb-5">
        Wiederholungs-Matrix · R1 = Einführung · R2/R3 = Vertiefung · <span className="text-white">●</span> = digital relevant
      </p>

      <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
        <div className="min-w-[700px]">
          {/* Header: Themen-Nummern */}
          <div className="grid gap-1 mb-2" style={{ gridTemplateColumns: "minmax(180px, 1.6fr) repeat(8, minmax(0, 1fr))" }}>
            <div />
            {themenKurzNamen.map((tn, i) => (
              <div key={i} className="text-center">
                <div className="text-[10px] font-bold text-zinc-400">T{i + 1}</div>
                <div className="text-[9px] text-zinc-600 truncate" title={tn}>
                  {tn}
                </div>
              </div>
            ))}
          </div>

          {/* Zeilen */}
          <div className="space-y-1">
            {matrix.items.map((item, rowIdx) => (
              <div
                key={rowIdx}
                className="grid gap-1 items-center animate-slide-up"
                style={{
                  gridTemplateColumns: "minmax(180px, 1.6fr) repeat(8, minmax(0, 1fr))",
                  animationDelay: `${rowIdx * 0.04}s`,
                }}
                onMouseEnter={() => setHoveredItem(rowIdx)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Item-Name */}
                <div className="flex items-center gap-1.5 pr-2">
                  {item.istDigital && (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${c.digitalDot} animate-pulse-glow shrink-0`}
                      title="Digital relevant"
                    />
                  )}
                  <span
                    className={`text-[11px] leading-tight ${
                      item.istDigital ? "text-zinc-200 font-medium" : "text-zinc-500"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>

                {/* 8 Themen-Zellen */}
                {item.zirkular.map((r, colIdx) => (
                  <div
                    key={colIdx}
                    className={`h-9 rounded-md flex items-center justify-center text-[10px] font-bold border transition-all ${
                      r === null
                        ? "bg-white/[0.02] border-white/5 text-transparent"
                        : item.istDigital
                        ? `${c.cellDigital} shadow-md ${c.glow}`
                        : c.cellNormal
                    }`}
                  >
                    {r ?? "·"}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Hover-Detail */}
          {hoveredItem !== null && matrix.items[hoveredItem].istDigital && matrix.items[hoveredItem].digitalNote && (
            <div className={`mt-4 rounded-xl border ${c.border} bg-black/30 p-3 animate-fade-in`}>
              <p className="text-[11px] text-zinc-400">
                <span className={`${c.accent} font-medium`}>{matrix.items[hoveredItem].name}:</span>{" "}
                {matrix.items[hoveredItem].digitalNote}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Legende */}
      <div className="mt-5 flex flex-wrap items-center gap-3 text-[10px] text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${c.digitalDot}`} />
          digital relevant
        </span>
        <span className={`px-2 py-0.5 rounded ${c.cellDigital} border text-[10px]`}>R1 digital</span>
        <span className={`px-2 py-0.5 rounded ${c.cellNormal} border text-[10px]`}>R1 nicht digital</span>
      </div>
    </div>
  );
}
