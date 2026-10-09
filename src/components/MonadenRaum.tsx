"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { welt, type Monade } from "@/lib/monaden";
import { zitatFuer } from "@/lib/zitate";
import Harmonie from "@/components/Harmonie";
import type { Kunstwerk } from "@/lib/kunst";

/**
 * Der Monaden-Raum.
 *
 * Von aussen ist jede Monade eine geschlossene, schwebende Kugel — ohne
 * Fenster (Monadologie §7). Zoomt man hinein, öffnet sie sich: Innen liegt
 * dieselbe Welt wie im Hintergrund, aber aus ihrem Blickwinkel und nur in
 * ihrer Nähe deutlich (§57, §60). Darin schweben wieder Monaden, ohne Ende
 * (§67). Die Kamera wird laufend auf die innerste Monade umgerechnet, die den
 * Bildschirm füllt; so bleibt der Zoom beliebig tief rechengenau.
 */

export type Modus = "monade" | "ebene" | "reseau" | "trace" | "pli";

const MODI: { id: Modus; label: string; text: string }[] = [
  { id: "monade", label: "monade", text: "Leibniz — geschlossen, ohne Fenster, jede mit eigener Perspektive" },
  { id: "ebene", label: "ebene", text: "Foucault — das Tableau: jedes Ding an seinem Platz, nichts schwebt mehr" },
  { id: "reseau", label: "réseau", text: "Latour — Monaden mit Fenstern: was zusammenhängt, wurde verbunden" },
  { id: "trace", label: "trace", text: "Derrida — eine Linie durch die Zeit: jede Position verweist auf andere" },
  { id: "pli", label: "pli", text: "Deleuze — dieselbe Fläche, gefaltet: was fern ist, berührt sich im Knick" },
];

interface Knoten {
  key: string;
  m?: Monade;
  seed: number;
  hue: number;
  jahr?: number;
}

interface Kreis {
  x: number;
  y: number;
  r: number;
}

interface Box {
  hx: number;
  hy: number;
  ox: number;
  oy: number;
}

interface Treffer extends Kreis {
  rel: Knoten[]; // Pfad relativ zur Render-Wurzel
  o: number;
}

/* ---------------- Hilfen ---------------- */

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const glatt01 = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const sig = (p: Knoten[]) => p.map((k) => k.key).join("/");

function ausMonade(m: Monade): Knoten {
  return { key: m.id, m, seed: hash(m.id), hue: m.hue, jahr: m.jahr };
}

const WURZEL = ausMonade(welt);
const BG = "#f1ece3";
const FUELLE = 0.84; // Radius einer fokussierten Monade, relativ zur halben Bildschirmkante

/* ---------------- Die eine Welt ---------------- */

// Dieselbe Punktwolke für alle Monaden — jede sieht sie von ihrem Standpunkt.
const WELT = (() => {
  const rand = rng(1714);
  const gauss = () => (rand() + rand() + rand() + rand() - 2) / 0.577;
  const pts: number[] = [];
  const cluster: number[] = [];
  const zentren: [number, number, number][] = [];
  for (let c = 0; c < 6; c++) {
    const u = rand() * 2 - 1;
    const a = rand() * Math.PI * 2;
    const rr = 0.42 + rand() * 0.36;
    const s = Math.sqrt(1 - u * u);
    zentren.push([Math.cos(a) * s * rr, u * rr, Math.sin(a) * s * rr]);
  }
  zentren.forEach(([cx, cy, cz], ci) => {
    for (let i = 0; i < 34; i++) {
      pts.push(cx + gauss() * 0.12, cy + gauss() * 0.12, cz + gauss() * 0.12);
      cluster.push(ci);
    }
  });
  for (let i = 0; i < 110; i++) {
    let x, y, z;
    do {
      x = rand() * 2 - 1;
      y = rand() * 2 - 1;
      z = rand() * 2 - 1;
    } while (x * x + y * y + z * z > 1);
    pts.push(x, y, z);
    cluster.push(-1);
  }
  const n = pts.length / 3;
  const kanten: number[] = [];
  for (let i = 0; i < n; i++) {
    if (cluster[i] < 0) continue;
    let b1 = -1;
    let d1 = Infinity;
    let b2 = -1;
    let d2 = Infinity;
    for (let j = 0; j < n; j++) {
      if (j === i || cluster[j] !== cluster[i]) continue;
      const d =
        (pts[i * 3] - pts[j * 3]) ** 2 +
        (pts[i * 3 + 1] - pts[j * 3 + 1]) ** 2 +
        (pts[i * 3 + 2] - pts[j * 3 + 2]) ** 2;
      if (d < d1) {
        d2 = d1;
        b2 = b1;
        d1 = d;
        b1 = j;
      } else if (d < d2) {
        d2 = d;
        b2 = j;
      }
    }
    if (b1 > i) kanten.push(i, b1);
    if (b2 >= 0 && i % 2 === 0) kanten.push(i, b2);
  }
  return { pts: Float32Array.from(pts), n, kanten: Uint16Array.from(kanten), zentren };
})();

const PX = new Float32Array(WELT.n);
const PY = new Float32Array(WELT.n);
const PS = new Float32Array(WELT.n);
const PD = new Float32Array(WELT.n);

interface Blick {
  yaw: number;
  pitch: number;
  spin: number;
  dist: number;
  f: [number, number, number];
  rho: number;
}

const blickCache = new Map<number, Blick>();
function blickVon(seed: number): Blick {
  const hit = blickCache.get(seed);
  if (hit) return hit;
  const r = rng(seed ^ 0x51ed27);
  const b: Blick = {
    yaw: r() * Math.PI * 2,
    pitch: (r() - 0.5) * 1.3,
    spin: (0.01 + r() * 0.028) * (r() < 0.5 ? -1 : 1),
    dist: 2.1 + r() * 0.9,
    f: WELT.zentren[Math.floor(r() * WELT.zentren.length)],
    rho: 0.3 + r() * 0.45,
  };
  if (blickCache.size > 4000) blickCache.clear();
  blickCache.set(seed, b);
  return b;
}

interface Phasen {
  a1: number;
  a2: number;
  b1: number;
  b2: number;
  p: number[];
  tiefe: number;
}

const phasenCache = new Map<number, Phasen>();
function phasenVon(seed: number): Phasen {
  const hit = phasenCache.get(seed);
  if (hit) return hit;
  const r = rng(seed ^ 0x3c6ef372);
  const ph: Phasen = {
    a1: 0.11 + r() * 0.12,
    a2: 0.05 + r() * 0.07,
    b1: 0.09 + r() * 0.12,
    b2: 0.04 + r() * 0.08,
    p: [r(), r(), r(), r(), r()].map((v) => v * Math.PI * 2),
    tiefe: 0.5 + r(),
  };
  if (phasenCache.size > 4000) phasenCache.clear();
  phasenCache.set(seed, ph);
  return ph;
}

/* ---------------- Komponente ---------------- */

export default function MonadenRaum({
  standalone,
  serif,
  kunst,
}: {
  standalone: boolean;
  serif: string;
  kunst: Kunstwerk[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modus, setModus] = useState<Modus>("monade");
  const modusRef = useRef<Modus>("monade");
  const [fokus, setFokus] = useState<Knoten[]>([WURZEL]);
  const [lesen, setLesen] = useState(false);
  const [hinweis, setHinweis] = useState(true);
  const steuer = useRef<{ fliegeZu: (abs: Knoten[]) => void }>({ fliegeZu: () => {} });

  useEffect(() => {
    modusRef.current = modus;
  }, [modus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ctxLs = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
    const bilder = new Map<string, HTMLImageElement>();
    for (const k of kunst) {
      const img = new Image();
      img.decoding = "async";
      img.src = k.src;
      bilder.set(k.monade, img);
    }
    const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    /* --- Zustand der Kamera --- */
    let pfad: Knoten[] = [WURZEL]; // Weg von der Welt zur Render-Wurzel
    const cam = { x: 0, y: 0, z: 0 }; // in Koordinaten der Render-Wurzel (Radius 1)
    let flug: Knoten[] | null = [WURZEL]; // absoluter Zielpfad, dem die Kamera folgt
    let fokusAbs: Knoten[] = [WURZEL];
    let fokusSig = "welt";
    let hoverSig = "";
    let treffer: Treffer[] = [];
    const glatt = new Map<string, Kreis>();
    let memo = new Map<string, Kreis[]>();
    let fLerp = 0.05;
    const maus = { x: 0, y: 0, nx: 0, ny: 0, drin: false };
    let t = 0;
    let letzte = performance.now();
    let raf = 0;

    const basis = () => 0.5 * Math.min(W, H);
    const zMin = () => (Math.hypot(W, H) / 2 / basis()) * 1.002;

    const deckt = (c: Kreis) =>
      Math.hypot(c.x, c.y) <= c.r &&
      Math.hypot(W - c.x, c.y) <= c.r &&
      Math.hypot(c.x, H - c.y) <= c.r &&
      Math.hypot(W - c.x, H - c.y) <= c.r;

    // Freie Fläche für die Monaden der Welt (Pixel): neben Lesespalte und Bedienung
    const nutzflaeche = () =>
      W < 640 ? { l: 40, r: W - 40, o: 72, u: H - 235 } : { l: 40, r: W - 420, o: 90, u: H - 120 };

    const boxVon = (k: Knoten): Box => {
      if (k.key === "welt") {
        const S = basis() * zMin();
        const n = nutzflaeche();
        return {
          hx: (n.r - n.l) / (2 * S),
          hy: (n.u - n.o) / (2 * S),
          ox: ((n.l + n.r) / 2 - W / 2) / S,
          oy: ((n.o + n.u) / 2 - H / 2) / S,
        };
      }
      return { hx: 0.6, hy: 0.6, ox: 0, oy: 0 };
    };

    /* --- Kinder und ihre Lagen --- */
    const kinderCache = new Map<string, Knoten[]>();
    const kinderVon = (k: Knoten): Knoten[] => {
      const hit = kinderCache.get(k.key);
      if (hit) return hit;
      let c: Knoten[];
      if (k.m?.kinder?.length) {
        c = k.m.kinder.map(ausMonade);
      } else {
        const r = rng(k.seed ^ 0x2545f491);
        const n = 4 + Math.floor(r() * 3);
        c = [];
        for (let i = 0; i < n; i++) {
          const s = (Math.imul(k.seed, 31) + i * 7919 + 1) >>> 0;
          c.push({ key: "p" + s, seed: s, hue: (k.hue + (r() - 0.5) * 60 + 360) % 360 });
        }
      }
      if (kinderCache.size > 4000) kinderCache.clear();
      kinderCache.set(k.key, c);
      return c;
    };

    const prozCache = new Map<number, Kreis[]>();
    const prozedural = (seed: number, n: number): Kreis[] => {
      const hit = prozCache.get(seed);
      if (hit) return hit;
      const r = rng(seed ^ 0x7f4a7c15);
      const out: Kreis[] = [{ x: (r() - 0.5) * 0.12, y: (r() - 0.5) * 0.12, r: 0.24 + r() * 0.08 }];
      let versuche = 0;
      while (out.length < n && versuche < 300) {
        versuche++;
        const rr = 0.09 + r() * 0.12;
        const a = r() * Math.PI * 2;
        const d = Math.sqrt(r()) * (0.84 - rr);
        const x = Math.cos(a) * d;
        const y = Math.sin(a) * d;
        if (!out.some((q) => Math.hypot(q.x - x, q.y - y) < q.r + rr + 0.05)) out.push({ x, y, r: rr });
      }
      while (out.length < n) out.push({ x: 0, y: 0, r: 0 });
      if (prozCache.size > 4000) prozCache.clear();
      prozCache.set(seed, out);
      return out;
    };

    const lagenMonade = (k: Knoten, kinder: Knoten[], box: Box): Kreis[] => {
      if (!k.m?.kinder?.length) return prozedural(k.seed, kinder.length);
      const n = kinder.length;
      const mn = Math.min(box.hx, box.hy);
      if (n === 1) return [{ x: box.ox, y: box.oy, r: mn * 0.5 }];
      const mitte = k.key === "welt";
      const out: Kreis[] = [];
      let ringN = n;
      let start = 0;
      if (mitte) {
        out.push({ x: box.ox, y: box.oy, r: mn * 0.3 });
        ringN = n - 1;
        start = 1;
      }
      const rx = box.hx * (mitte ? 0.7 : 0.62);
      const ry = box.hy * (mitte ? 0.64 : 0.62);
      const P = 2 * Math.PI * Math.sqrt((rx * rx + ry * ry) / 2);
      const r = Math.min(mn * (mitte ? 0.21 : 0.4), (0.36 * P) / ringN);
      const off = mitte ? -Math.PI / 2 : ((hash(k.key) % 360) * Math.PI) / 180;
      for (let i = 0; i < ringN; i++) {
        const a = off + (i * 2 * Math.PI) / ringN;
        const v = 0.9 + 0.2 * ((hash(kinder[start + i].key) % 100) / 100);
        out.push({ x: box.ox + Math.cos(a) * rx, y: box.oy + Math.sin(a) * ry, r: r * v });
      }
      return out;
    };

    const reseauCache = new Map<string, Kreis[]>();
    const nachJahr = (kinder: Knoten[]) =>
      kinder
        .map((k, i) => ({ i, j: k.jahr ?? 3000 + i }))
        .sort((a, b) => a.j - b.j)
        .map((e) => e.i);

    const lagenModus = (m: Modus, k: Knoten, kinder: Knoten[], box: Box): Kreis[] => {
      const n = kinder.length;
      const mn = Math.min(box.hx, box.hy);
      if (m === "ebene") {
        const cols = Math.max(1, Math.round(Math.sqrt((n * box.hx) / box.hy)));
        const rows = Math.ceil(n / cols);
        const cell = Math.min((2 * box.hx * 0.88) / cols, (2 * box.hy * 0.8) / rows);
        return kinder.map((_, i) => ({
          x: box.ox + ((i % cols) - (cols - 1) / 2) * cell,
          y: box.oy + (Math.floor(i / cols) - (rows - 1) / 2) * cell,
          r: cell * 0.3,
        }));
      }
      if (m === "trace" || m === "pli") {
        const out = new Array<Kreis>(n);
        const w = box.hx * 0.84;
        const r = Math.min(((2 * w) / Math.max(1, n - 1)) * 0.3, mn * 0.2);
        nachJahr(kinder).forEach((idx, j) => {
          const tt = n === 1 ? 0.5 : j / (n - 1);
          const x = -w + 2 * w * tt;
          const y = m === "trace" ? Math.sin(j * 1.7 + 0.4) * box.hy * 0.26 : (j % 2 === 0 ? -1 : 1) * box.hy * 0.3;
          out[idx] = { x: box.ox + x, y: box.oy + y, r };
        });
        return out;
      }
      // réseau: verstreut und auseinandergedrückt
      const id = `${k.key}:${n}:${box.hx.toFixed(2)}:${box.hy.toFixed(2)}:${box.ox.toFixed(2)}:${box.oy.toFixed(2)}`;
      const hit = reseauCache.get(id);
      if (hit) return hit;
      const r0 = mn * 0.13 * Math.sqrt(Math.min(1, 7 / n));
      const rand = rng(k.seed ^ 0x1b873593);
      const out = kinder.map((_, i) => {
        const a = i * 2.39996 + (rand() - 0.5) * 0.8;
        const rad = Math.sqrt((i + 0.5) / n);
        return { x: Math.cos(a) * rad * box.hx * 0.78, y: Math.sin(a) * rad * box.hy * 0.78, r: r0 };
      });
      for (let it = 0; it < 80; it++) {
        for (let i = 0; i < n; i++)
          for (let j = i + 1; j < n; j++) {
            const dx = out[j].x - out[i].x;
            const dy = out[j].y - out[i].y;
            const d = Math.hypot(dx, dy) || 0.001;
            const soll = r0 * 3.2;
            if (d < soll) {
              const f = ((soll - d) / d) * 0.25;
              out[i].x -= dx * f;
              out[i].y -= dy * f;
              out[j].x += dx * f;
              out[j].y += dy * f;
            }
          }
        for (const p of out) {
          p.x = Math.max(-box.hx * 0.85, Math.min(box.hx * 0.85, p.x));
          p.y = Math.max(-box.hy * 0.8, Math.min(box.hy * 0.8, p.y));
        }
      }
      for (const p of out) {
        p.x += box.ox;
        p.y += box.oy;
      }
      reseauCache.set(id, out);
      return out;
    };

    const istFokusKnoten = (k: Knoten) => k.key === fokusAbs[fokusAbs.length - 1].key;

    // Lagen der Kinder (relativ zur Mutter, in Einheiten ihres Radius), geglättet und schwebend
    const kinderLagen = (k: Knoten): Kreis[] => {
      const hit = memo.get(k.key);
      if (hit) return hit;
      const kinder = kinderVon(k);
      const fokussiert = istFokusKnoten(k);
      const m: Modus = fokussiert ? modusRef.current : "monade";
      const box = boxVon(k);
      const ziele = m === "monade" ? lagenMonade(k, kinder, box) : lagenModus(m, k, kinder, box);
      const mn = Math.min(box.hx, box.hy);
      const amp =
        (m === "ebene" ? 0 : m === "trace" || m === "pli" ? 0.006 : 0.03) * (mn / 0.6) * (ruhig ? 0.25 : 1);
      const out = kinder.map((c, i) => {
        const id = k.key + ">" + c.key;
        const z = ziele[i];
        let g = glatt.get(id);
        if (!g) {
          g = { ...z };
          glatt.set(id, g);
        } else {
          g.x += (z.x - g.x) * fLerp;
          g.y += (z.y - g.y) * fLerp;
          g.r += (z.r - g.r) * fLerp;
        }
        const ph = phasenVon(c.seed);
        let dx = amp * (0.65 * Math.sin(t * ph.a1 + ph.p[0]) + 0.35 * Math.sin(t * ph.a2 + ph.p[1]));
        let dy = amp * (0.65 * Math.cos(t * ph.b1 + ph.p[2]) + 0.35 * Math.sin(t * ph.b2 + ph.p[3]));
        if (fokussiert && !ruhig) {
          dx -= maus.nx * 0.012 * ph.tiefe;
          dy -= maus.ny * 0.012 * ph.tiefe;
        }
        const s = 1 + (ruhig ? 0 : 0.012 * Math.sin(t * 0.35 + ph.p[4]));
        return { x: g.x + dx, y: g.y + dy, r: g.r * s };
      });
      if (glatt.size > 6000) glatt.clear();
      memo.set(k.key, out);
      return out;
    };

    const rahmenRel = (rel: Knoten[]): Kreis => {
      let f: Kreis = { x: 0, y: 0, r: 1 };
      let mutter = pfad[pfad.length - 1];
      for (const c of rel) {
        const i = kinderVon(mutter).findIndex((q) => q.key === c.key);
        if (i < 0) break;
        const L = kinderLagen(mutter)[i];
        f = { x: f.x + L.x * f.r, y: f.y + L.y * f.r, r: L.r * f.r };
        mutter = c;
      }
      return f;
    };

    // Rahmen eines Vorfahren (Index a im Pfad) in Koordinaten der Render-Wurzel
    const vorfahrRahmen = (a: number): Kreis => {
      let g: Kreis = { x: 0, y: 0, r: 1 };
      for (let j = a; j < pfad.length - 1; j++) {
        const i = kinderVon(pfad[j]).findIndex((q) => q.key === pfad[j + 1].key);
        const L = kinderLagen(pfad[j])[i];
        g = { x: g.x + L.x * g.r, y: g.y + L.y * g.r, r: L.r * g.r };
      }
      return { x: -g.x / g.r, y: -g.y / g.r, r: 1 / g.r };
    };

    const zielRahmen = (abs: Knoten[]): { f: Kreis; istWelt: boolean } => {
      let cp = 0;
      while (cp < abs.length && cp < pfad.length && abs[cp].key === pfad[cp].key) cp++;
      if (cp === pfad.length) {
        const rel = abs.slice(cp);
        return { f: rahmenRel(rel), istWelt: abs.length === 1 };
      }
      return { f: vorfahrRahmen(cp - 1), istWelt: cp - 1 === 0 };
    };

    steuer.current.fliegeZu = (abs: Knoten[]) => {
      flug = abs;
      setHinweis(false);
    };

    /* --- Zeichnen --- */
    const zeichneWelt = (k: Knoten, cx: number, cy: number, R: number, alpha: number, istWelt: boolean) => {
      const b = blickVon(k.seed);
      const yaw = b.yaw + t * b.spin * (ruhig ? 0.2 : 1);
      const cyw = Math.cos(yaw);
      const syw = Math.sin(yaw);
      const cp = Math.cos(b.pitch);
      const sp = Math.sin(b.pitch);
      const P = WELT.pts;
      const sk = R * 0.62;
      for (let i = 0; i < WELT.n; i++) {
        const x = P[i * 3];
        const y = P[i * 3 + 1];
        const z = P[i * 3 + 2];
        const x1 = x * cyw - z * syw;
        const z1 = x * syw + z * cyw;
        const y2 = y * cp - z1 * sp;
        const z2 = y * sp + z1 * cp;
        const s = 1.7 / Math.max(0.35, b.dist - z2);
        PX[i] = cx + x1 * s * sk;
        PY[i] = cy + y2 * s * sk;
        PS[i] = s;
        if (istWelt) PD[i] = 0.45;
        else {
          const d2 = (x - b.f[0]) ** 2 + (y - b.f[1]) ** 2 + (z - b.f[2]) ** 2;
          PD[i] = Math.exp(-d2 / (b.rho * b.rho));
        }
      }
      const h = istWelt ? 40 : k.hue;
      const sat = istWelt ? 8 : 18;
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = `hsla(${h}, ${sat}%, 24%, ${(istWelt ? 0.07 : 0.16) * alpha})`;
      ctx.beginPath();
      const K = WELT.kanten;
      for (let e = 0; e < K.length; e += 2) {
        ctx.moveTo(PX[K[e]], PY[K[e]]);
        ctx.lineTo(PX[K[e + 1]], PY[K[e + 1]]);
      }
      ctx.stroke();
      const groesse = Math.min(1.5, R / 320);
      for (let i = 0; i < WELT.n; i++) {
        const deut = PD[i];
        const a = (0.14 + 0.86 * deut) * Math.min(1, PS[i] * 1.1) * alpha;
        if (a < 0.012) continue;
        const sz = Math.max(0.5, (0.5 + 1.7 * deut) * PS[i] * groesse);
        ctx.fillStyle = `hsla(${h}, ${sat}%, 20%, ${a})`;
        ctx.beginPath();
        ctx.arc(PX[i], PY[i], sz, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const zeichneHuelle = (c: Knoten, s: Kreis, a: number, hover: boolean) => {
      const h = c.hue;
      const offen = c.m?.status === "offen";
      // Schatten: die Monade schwebt über dem Papier
      const sx = s.x + s.r * 0.18;
      const sy = s.y + s.r * 0.34;
      const schatten = ctx.createRadialGradient(sx, sy, s.r * 0.2, sx, sy, s.r * 1.35);
      schatten.addColorStop(0, `rgba(70, 55, 40, ${(hover ? 0.22 : 0.15) * a})`);
      schatten.addColorStop(1, "rgba(70, 55, 40, 0)");
      ctx.fillStyle = schatten;
      ctx.beginPath();
      ctx.arc(sx, sy, s.r * 1.35, 0, Math.PI * 2);
      ctx.fill();
      // Körper, von links oben beleuchtet
      const ka = offen ? a * 0.6 : a;
      const body = ctx.createRadialGradient(s.x - s.r * 0.35, s.y - s.r * 0.42, s.r * 0.04, s.x, s.y, s.r * 1.04);
      body.addColorStop(0, `hsla(${h}, 35%, 99%, ${ka})`);
      body.addColorStop(0.5, `hsla(${h}, 24%, 87%, ${ka})`);
      body.addColorStop(1, `hsla(${h}, 22%, 68%, ${ka})`);
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      // Rand
      if (offen) ctx.setLineDash([2, 4]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `hsla(${h}, 22%, 30%, ${(hover ? 0.5 : 0.22) * a})`;
      ctx.stroke();
      ctx.setLineDash([]);
      // Glanzlicht
      if (s.r > 6) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 0.88, Math.PI * 1.08, Math.PI * 1.42);
        ctx.lineWidth = Math.min(2.4, s.r * 0.035);
        ctx.lineCap = "round";
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.75 * a})`;
        ctx.stroke();
      }
    };

    // Kunstwerk, randfüllend in den Kreis der Monade gelegt
    const zeichneBild = (img: HTMLImageElement, cx: number, cy: number, R: number, a: number) => {
      if (!img.complete || !img.naturalWidth || a < 0.005) return;
      const gross = 4 * Math.max(W, H);
      const ausblenden = R > gross ? Math.max(0, 2 - R / gross) : 1;
      if (ausblenden <= 0) return;
      const k = Math.max((2 * R) / img.naturalWidth, (2 * R) / img.naturalHeight);
      const w = img.naturalWidth * k;
      const h = img.naturalHeight * k;
      ctx.globalAlpha = a * ausblenden;
      ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h);
      ctx.globalAlpha = 1;
    };

    const zeichneDeko = (k: Knoten, kinder: Knoten[], scr: Kreis[], a: number) => {
      const m = modusRef.current;
      const h = k.key === "welt" ? 40 : k.hue;
      if (m === "ebene") {
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = `hsla(${h}, 12%, 30%, ${0.16 * a})`;
        for (const s of scr) {
          const half = (s.r / 0.3) * 0.46;
          ctx.strokeRect(s.x - half, s.y - half, half * 2, half * 2);
        }
      } else if (m === "reseau") {
        const paare: [number, number][] = [];
        kinder.forEach((c, i) => {
          for (const v of c.m?.verbindungen ?? []) {
            const j = kinder.findIndex((q) => q.key === v);
            if (j > i || (j >= 0 && !(kinder[j].m?.verbindungen ?? []).includes(c.key))) paare.push([i, j]);
          }
        });
        if (paare.length === 0) {
          scr.forEach((s, i) => {
            const nahe = scr
              .map((q, j) => ({ j, d: Math.hypot(q.x - s.x, q.y - s.y) }))
              .filter((e) => e.j !== i)
              .sort((p, q) => p.d - q.d)
              .slice(0, 2);
            for (const e of nahe) if (e.j > i) paare.push([i, e.j]);
          });
        }
        for (const [i, j] of paare) {
          const A = scr[i];
          const B = scr[j];
          const d = Math.hypot(B.x - A.x, B.y - A.y);
          if (d < A.r + B.r) continue;
          const ux = (B.x - A.x) / d;
          const uy = (B.y - A.y) / d;
          const x0 = A.x + ux * A.r * 1.15;
          const y0 = A.y + uy * A.r * 1.15;
          const x1 = B.x - ux * B.r * 1.15;
          const y1 = B.y - uy * B.r * 1.15;
          ctx.lineWidth = 0.7;
          ctx.strokeStyle = `hsla(${kinder[i].hue}, 18%, 28%, ${0.32 * a})`;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
          // Übersetzung: ein Punkt wandert über die Verbindung
          const q = (t * 0.09 + (hash(kinder[i].key + kinder[j].key) % 100) / 100) % 1;
          ctx.fillStyle = `hsla(${kinder[i].hue}, 30%, 25%, ${0.7 * a})`;
          ctx.beginPath();
          ctx.arc(x0 + (x1 - x0) * q, y0 + (y1 - y0) * q, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (m === "trace") {
        const ord = nachJahr(kinder);
        ctx.lineWidth = 0.7;
        ctx.setLineDash([3, 5]);
        ctx.lineDashOffset = -t * 6;
        ctx.strokeStyle = `hsla(${h}, 15%, 28%, ${0.42 * a})`;
        for (let e = 0; e < ord.length - 1; e++) {
          const A = scr[ord[e]];
          const B = scr[ord[e + 1]];
          const d = Math.hypot(B.x - A.x, B.y - A.y);
          if (d < A.r + B.r) continue;
          const ux = (B.x - A.x) / d;
          const uy = (B.y - A.y) / d;
          ctx.beginPath();
          ctx.moveTo(A.x + ux * A.r * 1.2, A.y + uy * A.r * 1.2);
          ctx.lineTo(B.x - ux * B.r * 1.2, B.y - uy * B.r * 1.2);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      } else if (m === "pli") {
        const ord = nachJahr(kinder);
        const pts = ord.map((i) => scr[i]);
        if (pts.length < 2) return;
        const w = Math.max(...pts.map((p) => p.r)) * 1.25;
        const erst = pts[0];
        const letzt = pts[pts.length - 1];
        const randL = { x: erst.x - (pts[1].x - erst.x) * 0.6, y: erst.y };
        const zweitL = pts[pts.length - 2];
        const randR = { x: letzt.x + (letzt.x - zweitL.x) * 0.6, y: letzt.y };
        const kette = [randL, ...pts, randR];
        for (let i = 0; i < kette.length - 1; i++) {
          const A = kette[i];
          const B = kette[i + 1];
          const hell = B.y < A.y;
          ctx.fillStyle = hell ? `hsla(${h}, 20%, 99%, ${0.5 * a})` : `hsla(${h}, 15%, 40%, ${0.09 * a})`;
          ctx.beginPath();
          ctx.moveTo(A.x, A.y - w);
          ctx.lineTo(B.x, B.y - w);
          ctx.lineTo(B.x, B.y + w);
          ctx.lineTo(A.x, A.y + w);
          ctx.closePath();
          ctx.fill();
        }
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = `hsla(${h}, 12%, 30%, ${0.28 * a})`;
        for (const p of pts) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - w);
          ctx.lineTo(p.x, p.y + w);
          ctx.stroke();
        }
      }
    };

    interface Label {
      c: Knoten;
      s: Kreis;
      a: number;
      hover: boolean;
    }

    const zeichneInneres = (
      k: Knoten,
      f: Kreis,
      alpha: number,
      rel: Knoten[],
      istWurzel: boolean,
      labels: Label[],
      minDim: number
    ) => {
      const istWelt = k.key === "welt";
      if (istWurzel) {
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, W, H);
      } else {
        ctx.fillStyle = `hsla(${k.hue}, 26%, 94%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      const tieferFokus = fokusSig.startsWith(sig([...pfad, ...rel]) + "/");
      const bild = bilder.get(k.key);
      if (bild) zeichneBild(bild, f.x, f.y, f.r, alpha * (istWelt ? 0.3 : 0.4) * (tieferFokus ? 0.45 : 1));
      zeichneWelt(k, f.x, f.y, f.r, alpha * (istWelt ? 0.8 : 1) * (tieferFokus && !istWelt ? 0.35 : 1), istWelt);

      const kinder = kinderVon(k);
      const lagen = kinderLagen(k);
      const scr = lagen.map((L) => ({ x: f.x + L.x * f.r, y: f.y + L.y * f.r, r: L.r * f.r }));
      const fokussiert = istFokusKnoten(k);
      if (fokussiert && modusRef.current !== "monade") zeichneDeko(k, kinder, scr, alpha);

      if (!istWurzel) {
        // Innenseite der Kugel: zum Rand hin dunkler
        const v = ctx.createRadialGradient(f.x, f.y, f.r * 0.55, f.x, f.y, f.r);
        v.addColorStop(0, `hsla(${k.hue}, 22%, 70%, 0)`);
        v.addColorStop(1, `hsla(${k.hue}, 22%, 66%, ${0.55 * alpha})`);
        ctx.fillStyle = v;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }

      kinder.forEach((c, i) => {
        const s = scr[i];
        if (s.r < 1.2) return;
        if (s.x + s.r * 1.8 < 0 || s.x - s.r * 1.8 > W || s.y + s.r * 1.8 < 0 || s.y - s.r * 1.8 > H) return;
        const o = glatt01(0.1, 0.3, s.r / minDim);
        const relC = [...rel, c];
        const hover = hoverSig === sig(relC);
        if (o > 0.01) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.clip();
          zeichneInneres(c, s, o * alpha, relC, false, labels, minDim);
          ctx.restore();
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.lineWidth = 1;
          ctx.strokeStyle = `hsla(${c.hue}, 20%, 32%, ${0.24 * o * alpha})`;
          ctx.stroke();
        }
        if (o < 0.99) zeichneHuelle(c, s, (1 - o) * alpha, hover);
        if (alpha > 0.25) treffer.push({ ...s, rel: relC, o });
        if (fokussiert && c.m && o < 0.6 && s.r > 5) labels.push({ c, s, a: (1 - o) * alpha, hover });
      });
    };

    const zeichneLabels = (labels: Label[]) => {
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      for (const { c, s, a, hover } of labels) {
        const fs = Math.max(W < 640 ? 10.5 : 12, Math.min(17, s.r * 0.22));
        ctx.font = `400 ${fs}px ${serif}`;
        ctxLs.letterSpacing = "0px";
        ctx.fillStyle = `hsla(30, 15%, 16%, ${(hover ? 0.95 : 0.8) * a})`;
        const y = s.y + s.r + 9;
        ctx.fillText(c.m!.titel, s.x, y);
        const zweite = modusRef.current === "trace" && c.jahr ? String(c.jahr) : c.m!.autor?.split(" ·")[0];
        if (zweite && (W >= 640 || hover)) {
          ctx.font = `500 9px ui-sans-serif, system-ui, sans-serif`;
          ctxLs.letterSpacing = "1.6px";
          ctx.fillStyle = `hsla(30, 10%, 36%, ${(hover ? 0.85 : 0.6) * a})`;
          ctx.fillText(zweite.toUpperCase(), s.x, y + fs * 1.15);
          ctxLs.letterSpacing = "0px";
        }
      }
    };

    /* --- Schleife --- */
    const schritt = (jetzt: number) => {
      const dt = Math.min(0.05, (jetzt - letzte) / 1000);
      letzte = jetzt;
      t += dt;
      fLerp = 1 - Math.exp(-dt * 3.2);
      memo = new Map();
      const minDim = Math.min(W, H);

      if (cam.z === 0) cam.z = zMin() * 1.6;

      // Flug: die Kamera folgt dem Ziel
      if (flug) {
        const { f, istWelt } = zielRahmen(flug);
        const tz = istWelt ? zMin() / f.r : FUELLE / f.r;
        const versatz = !istWelt && W >= 1100 ? 90 / (basis() * tz) : 0;
        const kk = 1 - Math.exp(-dt * 2.6);
        cam.x += (f.x + versatz - cam.x) * kk;
        cam.y += (f.y - cam.y) * kk;
        cam.z = Math.exp(Math.log(cam.z) + (Math.log(tz) - Math.log(cam.z)) * kk);
      }

      // Hinein: ein Kind deckt den ganzen Bildschirm → wird Render-Wurzel
      for (let guard = 0; guard < 8; guard++) {
        const S = basis() * cam.z;
        const wurzel = pfad[pfad.length - 1];
        const kinder = kinderVon(wurzel);
        const lagen = kinderLagen(wurzel);
        let gewechselt = false;
        for (let i = 0; i < kinder.length; i++) {
          const L = lagen[i];
          if (L.r * S < Math.hypot(W, H) / 2) continue;
          const sc = { x: W / 2 + (L.x - cam.x) * S, y: H / 2 + (L.y - cam.y) * S, r: L.r * S };
          if (!deckt(sc)) continue;
          if (flug && !(flug.length > pfad.length && flug[pfad.length].key === kinder[i].key)) continue;
          pfad = [...pfad, kinder[i]];
          cam.x = (cam.x - L.x) / L.r;
          cam.y = (cam.y - L.y) / L.r;
          cam.z = cam.z * L.r;
          memo = new Map();
          gewechselt = true;
          break;
        }
        if (!gewechselt) break;
      }
      // Hinaus: die Render-Wurzel deckt nicht mehr → eine Stufe zurück
      for (let guard = 0; guard < 8 && pfad.length > 1; guard++) {
        const S = basis() * cam.z;
        if (deckt({ x: W / 2 - cam.x * S, y: H / 2 - cam.y * S, r: S })) break;
        const mutter = pfad[pfad.length - 2];
        const kind = pfad[pfad.length - 1];
        const i = kinderVon(mutter).findIndex((q) => q.key === kind.key);
        const L = kinderLagen(mutter)[i];
        cam.x = L.x + cam.x * L.r;
        cam.y = L.y + cam.y * L.r;
        cam.z = cam.z / L.r;
        pfad = pfad.slice(0, -1);
        memo = new Map();
      }
      // In der Welt: nicht hinauszoomen
      if (pfad.length === 1) {
        cam.z = Math.max(cam.z, zMin());
        const S = basis() * cam.z;
        const maxOff = 1 - Math.hypot(W, H) / (2 * S);
        const off = Math.hypot(cam.x, cam.y);
        if (maxOff <= 0) {
          cam.x = 0;
          cam.y = 0;
        } else if (off > maxOff) {
          cam.x *= maxOff / off;
          cam.y *= maxOff / off;
        }
      }

      // Zeichnen
      const S = basis() * cam.z;
      treffer = [];
      const labels: Label[] = [];
      zeichneInneres(
        pfad[pfad.length - 1],
        { x: W / 2 - cam.x * S, y: H / 2 - cam.y * S, r: S },
        1,
        [],
        true,
        labels,
        minDim
      );
      zeichneLabels(labels);

      // Fokus: die innerste Monade, die die Mitte hält und gross genug ist
      let besterRel: Knoten[] = [];
      for (const tr of treffer) {
        if (tr.r >= 0.36 * minDim && Math.hypot(tr.x - W / 2, tr.y - H / 2) < tr.r && tr.rel.length > besterRel.length)
          besterRel = tr.rel;
      }
      const neu = [...pfad, ...besterRel];
      const neuSig = sig(neu);
      if (neuSig !== fokusSig) {
        fokusSig = neuSig;
        fokusAbs = neu;
        setFokus(neu);
        setLesen(false);
      }

      // Hover
      let hov = "";
      if (maus.drin) {
        let best: Treffer | null = null;
        for (const tr of treffer) {
          const abs = sig([...pfad, ...tr.rel]);
          if (fokusSig === abs || fokusSig.startsWith(abs + "/")) continue;
          if (Math.hypot(tr.x - maus.x, tr.y - maus.y) <= tr.r && (!best || tr.r < best.r)) best = tr;
        }
        if (best) hov = sig(best.rel);
      }
      hoverSig = hov;
      canvas.style.cursor = hov ? "pointer" : zeiger.size ? "grabbing" : "default";

      raf = requestAnimationFrame(schritt);
    };
    raf = requestAnimationFrame(schritt);

    /* --- Bedienung --- */
    const zoomUm = (faktor: number, mx: number, my: number) => {
      flug = null;
      const S = basis() * cam.z;
      const wx = cam.x + (mx - W / 2) / S;
      const wy = cam.y + (my - H / 2) / S;
      cam.z *= faktor;
      const S2 = basis() * cam.z;
      cam.x = wx - (mx - W / 2) / S2;
      cam.y = wy - (my - H / 2) / S2;
      setHinweis(false);
    };

    const zeiger = new Map<number, { x: number; y: number }>();
    let druck: { x: number; y: number; bewegt: boolean } | null = null;
    let pinch: { d: number } | null = null;

    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const p = canvas.getBoundingClientRect();
      zoomUm(Math.exp(-e.deltaY * 0.0014), e.clientX - p.left, e.clientY - p.top);
    };
    const onDown = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId);
      const p = pos(e);
      zeiger.set(e.pointerId, p);
      if (zeiger.size === 1) druck = { ...p, bewegt: false };
      else {
        if (druck) druck.bewegt = true;
        const [a, b] = [...zeiger.values()];
        pinch = { d: Math.hypot(a.x - b.x, a.y - b.y) };
      }
    };
    const onMove = (e: PointerEvent) => {
      const p = pos(e);
      maus.x = p.x;
      maus.y = p.y;
      maus.nx = (p.x / W) * 2 - 1;
      maus.ny = (p.y / H) * 2 - 1;
      maus.drin = true;
      const vorher = zeiger.get(e.pointerId);
      if (!vorher) return;
      zeiger.set(e.pointerId, p);
      if (zeiger.size === 2 && pinch) {
        const [a, b] = [...zeiger.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        zoomUm(d / pinch.d, (a.x + b.x) / 2, (a.y + b.y) / 2);
        pinch.d = d;
        return;
      }
      if (zeiger.size === 1 && druck) {
        if (!druck.bewegt && Math.hypot(p.x - druck.x, p.y - druck.y) > 5) druck.bewegt = true;
        if (druck.bewegt) {
          flug = null;
          const S = basis() * cam.z;
          cam.x -= (p.x - vorher.x) / S;
          cam.y -= (p.y - vorher.y) / S;
          setHinweis(false);
        }
      }
    };
    const onUp = (e: PointerEvent) => {
      const p = pos(e);
      zeiger.delete(e.pointerId);
      if (zeiger.size < 2) pinch = null;
      if (druck && !druck.bewegt && zeiger.size === 0) {
        let best: Treffer | null = null;
        for (const tr of treffer) {
          const abs = sig([...pfad, ...tr.rel]);
          if (fokusSig === abs || fokusSig.startsWith(abs + "/")) continue;
          if (Math.hypot(tr.x - p.x, tr.y - p.y) <= tr.r && (!best || tr.r < best.r)) best = tr;
        }
        if (best) {
          flug = [...pfad, ...best.rel];
          setHinweis(false);
        }
      }
      if (zeiger.size === 0) druck = null;
    };
    const onLeave = () => {
      maus.drin = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && fokusAbs.length > 1) flug = fokusAbs.slice(0, -1);
    };

    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("keydown", onKey);
    };
  }, [serif, kunst]);

  /* ---------------- Lesefeld ---------------- */

  const knoten = fokus[fokus.length - 1];
  const m = knoten.m;
  const tiefe = fokus.length - 1;
  const zitat = zitatFuer(m?.zitat, knoten.seed);
  const kicker = m
    ? [m.autor?.split(" ·")[0], m.jahr].filter(Boolean).join(" · ")
    : `Tiefe ${tiefe}`;
  const titel = m ? m.titel : "Monade ohne Namen";
  const these = m
    ? m.these
    : "Dieselbe Welt, von hier aus. Deutlich nur in ihrer Nähe, verworren im Rest.";
  const text = m
    ? m.text
    : [
        "Jede Monade drückt das ganze Universum aus, aber nur einen kleinen Teil davon deutlich (Monadologie §60). Darum sieht ihre Welt anders aus als die der anderen, obwohl es dieselbe ist.",
        "Auch in ihr schweben wieder Monaden. Es gibt kein Ende, nur weitere Standpunkte.",
      ];

  const fliege = (abs: Knoten[]) => steuer.current.fliegeZu(abs);
  const bild = kunst.find((b) => b.monade === knoten.key);
  const impressum = standalone ? "/impressum" : "/pli-trace-reseau-monade/impressum";

  return (
    <div className="font-monade fixed inset-0 overflow-hidden bg-[#f1ece3] text-[#2b2723]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none"
        aria-label="Schwebende Monaden. Klicken oder hineinzoomen, um ihre Welt zu sehen."
      />

      {/* Abdunklung für die Schrift */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#f1ece3]/90 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#f1ece3]/80 to-transparent sm:hidden" />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 hidden w-[34rem] bg-gradient-to-l from-[#f1ece3] via-[#f1ece3]/90 to-transparent transition-opacity duration-700 sm:block ${
          lesen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Kopf */}
      <header className="absolute left-5 top-5 flex items-baseline gap-4 sm:left-8 sm:top-7">
        <h1 className="text-[15px] tracking-[0.22em] text-[#5c564d]">pli · trace · réseau · monade</h1>
        {!standalone && (
          <Link
            href="/"
            className="hidden font-sans text-[10px] uppercase tracking-[0.18em] text-[#9a9286] transition-colors hover:text-[#3a352f] sm:inline"
          >
            abu ako
          </Link>
        )}
      </header>

      {/* Zitat */}
      {tiefe > 0 && (
        <figure
          key={"z" + knoten.key}
          className="mr-fade group absolute left-5 right-5 top-14 sm:bottom-24 sm:left-8 sm:right-auto sm:top-auto sm:max-w-[30rem]"
        >
          <blockquote className="line-clamp-4 text-[0.98rem] font-light italic leading-[1.5] text-[#2b2723]/90 sm:line-clamp-none sm:text-[1.22rem] sm:leading-[1.55]">
            «{zitat.de}»
          </blockquote>
          <p className="mt-2 hidden max-h-0 overflow-hidden text-[0.85rem] italic leading-[1.45] text-[#857d71] opacity-0 transition-all duration-700 group-hover:max-h-60 group-hover:opacity-100 sm:block">
            {zitat.fr}
          </p>
          <figcaption className="mt-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#9a9286]">
            Leibniz, {zitat.ref}
            <span className="hidden sm:inline"> · fr ↑</span>
          </figcaption>
        </figure>
      )}

      {/* Lesefeld */}
      <aside
        key={"a" + knoten.key}
        className="mr-fade absolute inset-x-4 bottom-[4.25rem] max-h-[60vh] overflow-y-auto rounded-sm border-t border-black/5 bg-[#f1ece3]/92 px-4 py-3 sm:inset-x-auto sm:bottom-auto sm:right-8 sm:top-7 sm:max-h-[calc(100vh-9rem)] sm:w-[22rem] sm:border-0 sm:bg-transparent sm:p-0"
      >
        <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#857d71]">{kicker}</div>
        <h2 className="mt-1.5 text-[1.5rem] font-light leading-[1.1] text-[#1f1c19] sm:mt-2 sm:text-[2.3rem]">{titel}</h2>
        {m?.untertitel && (
          <div className="mt-1 hidden text-[1.05rem] italic text-[#7a7368] sm:block">{m.untertitel}</div>
        )}
        {these && (
          <p
            className={`mt-2 text-[1rem] leading-[1.5] text-[#3a352f] sm:mt-4 sm:line-clamp-none sm:text-[1.08rem] ${
              lesen ? "" : "line-clamp-2"
            }`}
          >
            {these}
          </p>
        )}

        {tiefe === 0 && (
          <figure className={`group mt-6 border-l border-black/10 pl-4 sm:block ${lesen ? "block" : "hidden"}`}>
            <blockquote className="text-[1.02rem] font-light italic leading-[1.55] text-[#2b2723]/85">
              «{zitat.de}»
            </blockquote>
            <p className="mt-2 hidden max-h-0 overflow-hidden text-[0.82rem] italic leading-[1.45] text-[#857d71] opacity-0 transition-all duration-700 group-hover:max-h-60 group-hover:opacity-100 sm:block">
              {zitat.fr}
            </p>
            <figcaption className="mt-2 font-sans text-[10px] uppercase tracking-[0.2em] text-[#9a9286]">
              Leibniz, {zitat.ref}
              <span className="hidden sm:inline"> · fr ↑</span>
            </figcaption>
          </figure>
        )}

        <button
          onClick={() => setLesen((v) => !v)}
          className="mt-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#857d71] transition-colors hover:text-[#1f1c19] sm:mt-4"
        >
          {lesen ? "– weniger" : "+ lesen"}
        </button>

        {lesen && (
          <div className="mr-fade mt-4 space-y-3 pb-2">
            {text?.map((p, i) => (
              <p key={i} className="text-[1rem] leading-[1.6] text-[#4a443d]">
                {p}
              </p>
            ))}
            {m?.extra === "harmonie" && (
              <div className="pt-2">
                <Harmonie />
              </div>
            )}
            {m?.literatur && m.literatur.length > 0 && (
              <div className="pt-3">
                <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#9a9286]">Literatur</div>
                <ul className="mt-2 space-y-1.5 text-[0.85rem] leading-[1.45] text-[#857d71]">
                  {m.literatur.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {m?.kinder && m.kinder.length > 0 && (
          <div className="mt-5 hidden sm:block">
            <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#9a9286]">enthält</div>
            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[0.98rem] italic">
              {m.kinder.map((k) => (
                <button
                  key={k.id}
                  onClick={() => fliege([...fokus, ausMonade(k)])}
                  className="text-[#6d665c] transition-colors hover:text-[#1f1c19]"
                >
                  {k.titel}
                </button>
              ))}
            </div>
          </div>
        )}
        {bild && (
          <p className="mt-5 font-sans text-[10px] leading-[1.5] tracking-[0.04em] text-[#9a9286]">
            Bild:{" "}
            <a href={bild.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
              {bild.kuenstler ? `${bild.kuenstler}, ` : ""}
              {bild.titel}
              {bild.datum ? ` (${bild.datum})` : ""}
            </a>
            . The Met, Open Access, gemeinfrei (CC0).
          </p>
        )}
        <Link
          href={impressum}
          className="mt-3 block font-sans text-[10px] uppercase tracking-[0.2em] text-[#9a9286] sm:hidden"
        >
          Impressum
        </Link>
      </aside>

      <Link
        href={impressum}
        className="absolute bottom-7 right-8 hidden font-sans text-[10px] uppercase tracking-[0.2em] text-[#9a9286] transition-colors hover:text-[#3a352f] sm:block"
      >
        Impressum
      </Link>

      {/* Weg zurück */}
      <nav className="absolute bottom-7 left-8 hidden items-center gap-2 font-sans text-[10px] uppercase tracking-[0.18em] text-[#9a9286] sm:flex">
        {fokus.map((k, i) => (
          <span key={k.key + i} className="flex items-center gap-2">
            {i > 0 && <span className="text-[#c3bbae]">/</span>}
            {i < fokus.length - 1 ? (
              <button onClick={() => fliege(fokus.slice(0, i + 1))} className="transition-colors hover:text-[#1f1c19]">
                {k.m ? (i === 0 ? "Welt" : k.m.titel) : "·"}
              </button>
            ) : (
              <span className="text-[#6d665c]">{k.m ? (i === 0 ? "Welt" : k.m.titel) : "·"}</span>
            )}
          </span>
        ))}
      </nav>
      {tiefe > 0 && (
        <button
          onClick={() => fliege(fokus.slice(0, -1))}
          className="absolute right-5 top-5 font-sans text-[10px] uppercase tracking-[0.2em] text-[#857d71] sm:hidden"
        >
          ‹ zurück
        </button>
      )}

      {/* Verwandlungen */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 sm:bottom-6">
        {hinweis && (
          <div className="mr-fade mb-2 hidden font-sans text-[10px] uppercase tracking-[0.2em] text-[#857d71] sm:block">
            eine Monade wählen — oder hineinzoomen
          </div>
        )}
        <div className="flex items-baseline gap-4 text-[1.05rem] italic sm:gap-6 sm:text-[1.15rem]">
          {MODI.map((x) => (
            <button
              key={x.id}
              onClick={() => setModus(x.id)}
              className={`transition-colors ${
                modus === x.id ? "text-[#1f1c19]" : "text-[#9a9286] hover:text-[#3a352f]"
              }`}
            >
              {x.label}
            </button>
          ))}
        </div>
        <div className="hidden font-sans text-[10px] tracking-[0.08em] text-[#9a9286] sm:block">
          {MODI.find((x) => x.id === modus)?.text}
        </div>
      </div>
    </div>
  );
}
