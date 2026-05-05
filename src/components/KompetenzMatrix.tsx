"use client";

import { useState } from "react";
import type { MatrixDaten, ZirkularZelle } from "@/lib/digitaleKompetenzen";
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

interface Hover {
  row: number;
  col: number;
  zelle: ZirkularZelle;
}

export default function KompetenzMatrix({ matrix }: Props) {
  const [hover, setHover] = useState<Hover | null>(null);
  const c = colorMap[matrix.farbe];

  return (
    <div className={`rounded-3xl glass border-2 ${c.border} p-4 sm:p-6 overflow-hidden`}>
      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl">{c.icon}</span>
        <h3 className={`text-xl font-bold ${c.accent}`}>{dimensionLabels[matrix.dimension]}</h3>
      </div>
      <p className="text-xs text-zinc-500 mb-1">
        Wiederholungs-Matrix · R1 = Einführung · R2/R3 = Vertiefung
      </p>
      <div className="flex flex-wrap gap-3 text-[10px] text-zinc-500 mb-5">
        <span className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${c.digitalDot}`} />
          digital
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 animate-pulse-glow" />
          KI explizit gefragt
        </span>
        <span className="text-zinc-600">→ Hovere über jede Zelle für Details</span>
      </div>

      <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
        <div className="min-w-[750px]">
          {/* Header */}
          <div
            className="grid gap-1 mb-2"
            style={{ gridTemplateColumns: "minmax(180px, 1.6fr) repeat(8, minmax(0, 1fr))" }}
          >
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
              >
                <div className="flex items-center gap-1.5 pr-2">
                  {item.istKI ? (
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 animate-pulse-glow shrink-0"
                      title="KI-relevant"
                    />
                  ) : item.istDigital ? (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${c.digitalDot} animate-pulse-glow shrink-0`}
                      title="Digital relevant"
                    />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-700 shrink-0" />
                  )}
                  <span
                    className={`text-[11px] leading-tight ${
                      item.istKI
                        ? "text-fuchsia-200 font-medium"
                        : item.istDigital
                        ? "text-zinc-200 font-medium"
                        : "text-zinc-500"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>

                {item.zellen.map((zelle, colIdx) => {
                  const empty = zelle.r === null;
                  const isKI = zelle.istKI === true;
                  const isHovered = hover?.row === rowIdx && hover?.col === colIdx;

                  return (
                    <div
                      key={colIdx}
                      onMouseEnter={() => !empty && setHover({ row: rowIdx, col: colIdx, zelle })}
                      onMouseLeave={() => setHover(null)}
                      className={`relative h-9 rounded-md flex items-center justify-center text-[10px] font-bold border transition-all ${
                        empty
                          ? "bg-white/[0.02] border-white/5 text-transparent"
                          : isKI
                          ? "bg-fuchsia-500/40 text-fuchsia-100 border-fuchsia-400/70 shadow-md shadow-fuchsia-500/40 cursor-help animate-pulse-glow"
                          : item.istDigital
                          ? `${c.cellDigital} shadow-md ${c.glow} cursor-help`
                          : `${c.cellNormal} cursor-help`
                      } ${isHovered ? "scale-110 z-10" : ""}`}
                    >
                      {zelle.r ?? "·"}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Hover-Detail */}
          {hover && hover.zelle.r && (
            <div
              className={`mt-4 rounded-xl border ${
                hover.zelle.istKI
                  ? "border-fuchsia-400/50 bg-fuchsia-500/10"
                  : `${c.border} bg-black/30`
              } p-3 animate-fade-in`}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wide ${
                    hover.zelle.istKI ? "text-fuchsia-300" : c.accent
                  }`}
                >
                  T{hover.col + 1} · {themenKurzNamen[hover.col]}
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                    hover.zelle.istKI
                      ? "bg-fuchsia-500/30 text-fuchsia-200 border border-fuchsia-400/50"
                      : "bg-white/10 text-zinc-300"
                  }`}
                >
                  {hover.zelle.r}
                </span>
                {hover.zelle.istKI && (
                  <span className="rounded px-1.5 py-0.5 text-[9px] font-bold bg-fuchsia-500/30 text-fuchsia-200 border border-fuchsia-400/50">
                    KI
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-200 mb-1">
                <span className="text-zinc-400">{matrix.items[hover.row].name}:</span>{" "}
                {hover.zelle.detail}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
