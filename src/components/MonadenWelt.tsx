"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { welt, alleMonaden, type Monade, type Status } from "@/lib/monaden";

/**
 * Die Monade als Design und Navigation.
 *
 * Jede Position ist eine Monade, die ihre Werke als Monaden enthält. Man klickt
 * hinein und liest. Die Ansicht lässt sich verwandeln: Dieselben Monaden werden
 * zu Ebenen (Tableau), zu einem Netzwerk, zu Spurenlinien oder zu Falten.
 * Blätter ohne eigene Kinder enthalten prozedural erzeugte Monaden —
 * man kann hineinzoomen, ohne je ein Ende zu finden (Monadologie §67).
 */

export type Modus = "monade" | "ebene" | "reseau" | "spur" | "falte";

interface Frame {
  x: number;
  y: number;
  r: number;
}

interface Treffer {
  x: number;
  y: number;
  r: number;
  m: Monade | null; // null = prozedurale Monade ohne Inhalt
  welt: Frame; // Lage in Weltkoordinaten (für den Zoom)
}

export const MODI: { id: Modus; label: string; text: string }[] = [
  {
    id: "monade",
    label: "Monade",
    text: "Leibniz: geschlossen, ohne Fenster, jede mit eigener Perspektive. Garten im Garten, ohne Ende.",
  },
  {
    id: "ebene",
    label: "Ebene",
    text: "Foucault: das Tableau. Alles ausgebreitet auf einer Fläche, jedes Ding an seinem Platz.",
  },
  {
    id: "reseau",
    label: "Netzwerk",
    text: "Latour: Monaden mit Fenstern. Was zusammenhängt, wurde verbunden — und kann sich wieder lösen.",
  },
  {
    id: "spur",
    label: "Spur",
    text: "Derrida: eine Linie durch die Zeit. Jede Position verweist auf frühere und wird von späteren gelesen.",
  },
  {
    id: "falte",
    label: "Falte",
    text: "Deleuze: dieselbe Fläche, gefaltet. Was weit auseinanderliegt, berührt sich im Knick.",
  },
];

const STATUS_LABEL: Record<Status, string> = {
  ausgearbeitet: "ausgearbeitet",
  skizze: "Skizze",
  offen: "offen",
};

/* ---------- Hilfsfunktionen ---------- */

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// mulberry32 — deterministischer Zufall für die prozeduralen Monaden
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

interface Kind {
  x: number;
  y: number;
  r: number;
  seed: number;
}

const kinderCache = new Map<number, Kind[]>();

function prozeduraleKinder(seed: number): Kind[] {
  const hit = kinderCache.get(seed);
  if (hit) return hit;
  const rand = rng(seed);
  const anzahl = 4 + Math.floor(rand() * 4);
  // Im Zentrum sitzt immer eine Monade: Wer hineinzoomt, findet kein Ende.
  const kinder: Kind[] = [{ x: 0, y: 0, r: 0.28 + rand() * 0.08, seed: (seed * 31 + 1) >>> 0 }];
  let versuche = 0;
  while (kinder.length < anzahl && versuche < 60) {
    versuche++;
    const r = 0.16 + rand() * 0.2;
    const winkel = rand() * Math.PI * 2;
    const abstand = rand() * (1 - r - 0.04);
    const x = Math.cos(winkel) * abstand;
    const y = Math.sin(winkel) * abstand;
    if (!kinder.some((k) => Math.hypot(k.x - x, k.y - y) < k.r + r + 0.02)) {
      kinder.push({ x, y, r, seed: (seed * 31 + kinder.length * 7919 + 2) >>> 0 });
    }
  }
  if (kinderCache.size > 5000) kinderCache.clear();
  kinderCache.set(seed, kinder);
  return kinder;
}

/* ---------- Layouts ---------- */

function layoutRing(m: Monade, kinder: Monade[], f: Frame): Frame[] {
  const n = kinder.length;
  if (n === 1) return [{ x: f.x, y: f.y, r: f.r * 0.55 }];
  const s = Math.sin(Math.PI / n);
  const r = (f.r * s) / (1 + s) * 0.9;
  const d = f.r - r - f.r * 0.06;
  const offset = (hash(m.id) % 360) * (Math.PI / 180);
  return kinder.map((_, i) => {
    const a = offset + (i * Math.PI * 2) / n;
    return { x: f.x + Math.cos(a) * d, y: f.y + Math.sin(a) * d, r };
  });
}

function layoutGrid(kinder: Monade[], f: Frame): Frame[] {
  const n = kinder.length;
  const side = f.r * Math.SQRT2 * 0.9;
  const cols = Math.ceil(Math.sqrt(n));
  const rows = Math.ceil(n / cols);
  const cell = side / cols;
  const r = (cell / 2) * 0.82;
  const x0 = f.x - side / 2 + cell / 2;
  const y0 = f.y - (rows * cell) / 2 + cell / 2;
  return kinder.map((_, i) => ({
    x: x0 + (i % cols) * cell,
    y: y0 + Math.floor(i / cols) * cell,
    r,
  }));
}

function reihenfolgeNachJahr(kinder: Monade[]) {
  return kinder
    .map((k, i) => ({ i, jahr: k.jahr ?? 9999 }))
    .sort((a, b) => a.jahr - b.jahr)
    .map((e) => e.i);
}

function layoutOben(modus: Modus, kinder: Monade[], f: Frame): Frame[] {
  const n = kinder.length;
  const out: Frame[] = new Array(n);

  if (modus === "reseau") {
    kinder.forEach((k, i) => {
      const h = hash(k.id);
      const jitter = ((h % 1000) / 1000 - 0.5) * 0.6;
      const a = (i * Math.PI * 2) / n + jitter;
      const d = f.r * (0.5 + ((h >> 10) % 1000) / 1000 * 0.25);
      out[i] = { x: f.x + Math.cos(a) * d, y: f.y + Math.sin(a) * d, r: f.r * 0.15 };
    });
    return out;
  }

  const order = reihenfolgeNachJahr(kinder);
  order.forEach((idx, k) => {
    const t = n === 1 ? 0.5 : k / (n - 1);
    const x = f.x + (-0.82 + 1.64 * t) * f.r;
    if (modus === "spur") {
      out[idx] = { x, y: f.y + Math.sin(k * 1.9) * 0.22 * f.r, r: f.r * 0.12 };
    } else {
      // falte: Zickzack, die Monaden sitzen auf den Knicken
      out[idx] = { x, y: f.y + (k % 2 === 0 ? -0.3 : 0.3) * f.r, r: f.r * 0.13 };
    }
  });
  return out;
}

function zielFrames(modus: Modus): Map<string, Frame> {
  const out = new Map<string, Frame>();
  const rec = (m: Monade, f: Frame, tiefe: number) => {
    out.set(m.id, f);
    const kinder = m.kinder ?? [];
    if (!kinder.length) return;
    let frames: Frame[];
    if (modus === "ebene") frames = layoutGrid(kinder, f);
    else if (modus !== "monade" && tiefe === 0) frames = layoutOben(modus, kinder, f);
    else frames = layoutRing(m, kinder, f);
    kinder.forEach((k, i) => rec(k, frames[i], tiefe + 1));
  };
  rec(welt, { x: 0, y: 0, r: 1 }, 0);
  return out;
}

/* ---------- Komponente ---------- */

export default function MonadenWelt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modus, setModus] = useState<Modus>("monade");
  const [aktivId, setAktivId] = useState<string>("welt");
  const [hinweis, setHinweis] = useState(true);

  const flach = useMemo(() => alleMonaden(), []);
  const byId = useMemo(() => new Map(flach.map((e) => [e.m.id, e])), [flach]);
  const aktiv = byId.get(aktivId) ?? byId.get("welt")!;

  const modusRef = useRef<Modus>("monade");
  const aktivRef = useRef<string>("welt");
  const view = useRef({ cx: 0, cy: 0, zoom: 1 });
  const viewZiel = useRef<{ cx: number; cy: number; zoom: number } | null>(null);
  const frames = useRef<Map<string, Frame>>(zielFrames("monade"));
  const gewicht = useRef<Record<Modus, number>>({ monade: 1, ebene: 0, reseau: 0, spur: 0, falte: 0 });
  const treffer = useRef<Treffer[]>([]);
  const drag = useRef<{ x: number; y: number; bewegt: boolean } | null>(null);
  const pinch = useRef<{ dist: number; mx: number; my: number } | null>(null);
  const zoomAuf = useRef<(id: string) => void>(() => {});

  useEffect(() => {
    modusRef.current = modus;
  }, [modus]);
  useEffect(() => {
    aktivRef.current = aktivId;
  }, [aktivId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let zeit = 0;

    const basisVon = (W: number, H: number) => Math.min(W, H) * 0.41;

    // Schrift so verkleinern, dass der Text in die Monade passt
    const passendeSchrift = (text: string, size: number, maxBreite: number, gewichtung = "600") => {
      ctx.font = `${gewichtung} ${size}px system-ui, sans-serif`;
      const b = ctx.measureText(text).width;
      if (b > maxBreite) {
        size = Math.max(7, (size * maxBreite) / b);
        ctx.font = `${gewichtung} ${size}px system-ui, sans-serif`;
      }
      return size;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    zoomAuf.current = (id: string) => {
      const f = frames.current.get(id);
      if (!f) return;
      const zoom = id === "welt" ? 1 : Math.min(60, 0.36 / (0.44 * f.r));
      viewZiel.current = { cx: f.x, cy: f.y, zoom };
    };

    const rundeck = (x: number, y: number, r: number, eck: number) => {
      // Quadrat mit Seitenlänge 2r, Eckenradius eck (= r → Kreis)
      const e = Math.min(eck, r);
      ctx.beginPath();
      ctx.moveTo(x - r + e, y - r);
      ctx.lineTo(x + r - e, y - r);
      ctx.arcTo(x + r, y - r, x + r, y - r + e, e);
      ctx.lineTo(x + r, y + r - e);
      ctx.arcTo(x + r, y + r, x + r - e, y + r, e);
      ctx.lineTo(x - r + e, y + r);
      ctx.arcTo(x - r, y + r, x - r, y + r - e, e);
      ctx.lineTo(x - r, y - r + e);
      ctx.arcTo(x - r, y - r, x - r + e, y - r, e);
      ctx.closePath();
    };

    const zeichne = () => {
      zeit += 0.004;
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      // Gewichte der Ansichten angleichen (für Morph + Dekorationen)
      const g = gewicht.current;
      (Object.keys(g) as Modus[]).forEach((k) => {
        const ziel = k === modusRef.current ? 1 : 0;
        g[k] += (ziel - g[k]) * 0.08;
      });

      // Frames Richtung Ziel-Layout bewegen
      const ziel = zielFrames(modusRef.current);
      ziel.forEach((zf, id) => {
        const cf = frames.current.get(id);
        if (!cf) frames.current.set(id, { ...zf });
        else {
          cf.x += (zf.x - cf.x) * 0.1;
          cf.y += (zf.y - cf.y) * 0.1;
          cf.r += (zf.r - cf.r) * 0.1;
        }
      });

      // Kamera
      if (viewZiel.current) {
        const v = view.current;
        const z = viewZiel.current;
        v.cx += (z.cx - v.cx) * 0.1;
        v.cy += (z.cy - v.cy) * 0.1;
        v.zoom += (z.zoom - v.zoom) * 0.1;
        if (Math.abs(z.zoom - v.zoom) < 0.002 && Math.hypot(z.cx - v.cx, z.cy - v.cy) < 0.0005) {
          viewZiel.current = null;
        }
      }
      const { cx, cy, zoom } = view.current;
      const scale = basisVon(W, H) * zoom;
      const sx = (wx: number) => W / 2 + (wx - cx) * scale;
      const sy = (wy: number) => H / 2 + (wy - cy) * scale;

      ctx.clearRect(0, 0, W, H);
      treffer.current = [];

      /* --- Dekorationen der oberen Ebene --- */
      const oben = welt.kinder ?? [];
      const of = (m: Monade) => frames.current.get(m.id)!;

      // Ebene: Raster
      if (g.ebene > 0.01) {
        const side = Math.SQRT2 * 0.9 * scale;
        const cols = Math.ceil(Math.sqrt(oben.length));
        const cell = side / cols;
        ctx.strokeStyle = `rgba(255,255,255,${0.08 * g.ebene})`;
        ctx.lineWidth = 1;
        for (let i = 0; i <= cols; i++) {
          const x = sx(0) - side / 2 + i * cell;
          ctx.beginPath();
          ctx.moveTo(x, sy(0) - side / 2);
          ctx.lineTo(x, sy(0) + side / 2);
          ctx.stroke();
          const y = sy(0) - side / 2 + i * cell;
          ctx.beginPath();
          ctx.moveTo(sx(0) - side / 2, y);
          ctx.lineTo(sx(0) + side / 2, y);
          ctx.stroke();
        }
      }

      // Netzwerk: Verbindungen
      if (g.reseau > 0.01) {
        ctx.lineWidth = 1.2;
        for (const m of oben) {
          for (const vid of m.verbindungen ?? []) {
            const z = byId.get(vid)?.m;
            if (!z) continue;
            const a = of(m);
            const b = of(z);
            const puls = 0.5 + 0.5 * Math.sin(zeit * 6 + hash(m.id + vid) % 7);
            ctx.strokeStyle = `hsla(${m.hue}, 70%, 70%, ${(0.15 + 0.2 * puls) * g.reseau})`;
            ctx.beginPath();
            ctx.moveTo(sx(a.x), sy(a.y));
            ctx.lineTo(sx(b.x), sy(b.y));
            ctx.stroke();
          }
        }
      }

      // Spur: Linie durch die Zeit
      if (g.spur > 0.01) {
        const order = reihenfolgeNachJahr(oben).map((i) => oben[i]);
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.lineDashOffset = -zeit * 200;
        ctx.strokeStyle = `rgba(147, 197, 253, ${0.45 * g.spur})`;
        ctx.beginPath();
        order.forEach((m, i) => {
          const f = of(m);
          if (i === 0) ctx.moveTo(sx(f.x), sy(f.y));
          else ctx.lineTo(sx(f.x), sy(f.y));
        });
        ctx.stroke();
        ctx.setLineDash([]);
        // Jahreszahlen
        ctx.fillStyle = `rgba(147, 197, 253, ${0.7 * g.spur})`;
        ctx.font = `${Math.max(9, Math.min(12, scale * 0.025))}px ui-monospace, monospace`;
        ctx.textAlign = "center";
        for (const m of order) {
          if (!m.jahr) continue;
          const f = of(m);
          ctx.fillText(String(m.jahr), sx(f.x), sy(f.y) + f.r * scale + 14);
        }
      }

      // Falte: gefaltetes Band durch die Knicke
      if (g.falte > 0.01) {
        const order = reihenfolgeNachJahr(oben).map((i) => oben[i]);
        const pts = order.map((m) => of(m));
        ctx.lineJoin = "round";
        ctx.lineWidth = Math.max(2, 0.34 * scale);
        ctx.strokeStyle = `rgba(251, 191, 36, ${0.07 * g.falte})`;
        ctx.beginPath();
        pts.forEach((f, i) => (i === 0 ? ctx.moveTo(sx(f.x), sy(f.y)) : ctx.lineTo(sx(f.x), sy(f.y))));
        ctx.stroke();
        // Knicklinien
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(251, 191, 36, ${0.45 * g.falte})`;
        ctx.beginPath();
        pts.forEach((f, i) => (i === 0 ? ctx.moveTo(sx(f.x), sy(f.y)) : ctx.lineTo(sx(f.x), sy(f.y))));
        ctx.stroke();
      }

      /* --- Monaden rekursiv --- */
      const zeichneProzedural = (wx: number, wy: number, wr: number, seed: number, hue: number) => {
        const px = sx(wx);
        const py = sy(wy);
        const pr = wr * scale;
        if (px + pr < -50 || px - pr > W + 50 || py + pr < -50 || py - pr > H + 50) return;
        if (pr < 1.5) return;
        const alpha = Math.min(1, pr / 40);
        const h = (hue + (seed % 40) - 20 + 360) % 360;
        const dreh = zeit * (seed % 7 === 0 ? -1 : 1) * (0.3 + (seed % 5) * 0.15);
        if (pr >= 10) treffer.current.push({ x: px, y: py, r: pr, m: null, welt: { x: wx, y: wy, r: wr } });
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        if (pr < 1500) {
          ctx.fillStyle = `hsla(${h}, 70%, 55%, ${0.05 * alpha})`;
          ctx.fill();
        }
        ctx.lineWidth = Math.max(0.6, Math.min(2, pr * 0.012));
        ctx.strokeStyle = `hsla(${h}, 80%, 70%, ${0.6 * alpha})`;
        ctx.stroke();
        if (pr > 12) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + Math.cos(dreh) * pr * 0.9, py + Math.sin(dreh) * pr * 0.9);
          ctx.strokeStyle = `hsla(${h}, 90%, 80%, ${0.3 * alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        if (pr > 6) {
          for (const k of prozeduraleKinder(seed)) {
            zeichneProzedural(wx + k.x * wr, wy + k.y * wr, k.r * wr, k.seed, hue);
          }
        }
      };

      const zeichneMonade = (m: Monade, tiefe: number) => {
        const f = frames.current.get(m.id);
        if (!f) return;
        const px = sx(f.x);
        const py = sy(f.y);
        const pr = f.r * scale;
        if (px + pr < -80 || px - pr > W + 80 || py + pr < -80 || py - pr > H + 80) return;
        if (pr < 1.5) return;

        const istAktiv = m.id === aktivRef.current;
        const alpha = Math.min(1, pr / 30);
        const eck = pr * (1 - 0.8 * g.ebene);
        const hue = m.hue;

        rundeck(px, py, pr, eck);
        ctx.fillStyle = `hsla(${hue}, 70%, 55%, ${(tiefe === 0 ? 0.02 : 0.06) * alpha})`;
        ctx.fill();
        if (m.status === "offen") ctx.setLineDash([4, 5]);
        else if (m.status === "skizze") ctx.setLineDash([10, 4]);
        ctx.lineWidth = istAktiv ? 2.2 : Math.max(0.8, Math.min(2, pr * 0.012));
        ctx.strokeStyle = `hsla(${hue}, 80%, ${istAktiv ? 85 : 70}%, ${(istAktiv ? 0.95 : 0.7) * alpha})`;
        ctx.stroke();
        ctx.setLineDash([]);

        if (istAktiv && tiefe > 0) {
          ctx.shadowColor = `hsla(${hue}, 90%, 70%, 0.8)`;
          ctx.shadowBlur = 24;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        if (tiefe > 0 && pr >= 10) treffer.current.push({ x: px, y: py, r: pr, m, welt: { ...f } });

        // Beschriftung
        if (pr > 36) {
          const kinder = m.kinder ?? [];
          const amRand = kinder.length > 0 && pr > 80;
          const size = passendeSchrift(
            m.titel,
            Math.max(9, Math.min(24, pr * 0.16)),
            amRand ? pr * 1.5 : pr * 1.7
          );
          ctx.fillStyle = `hsla(${hue}, 60%, 90%, ${alpha})`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          // Beschriftung am oberen Rand, wenn Kinder im Innern sichtbar sind
          const y = amRand ? py - pr + size * 1.4 : py;
          ctx.fillText(m.titel, px, y);
          if (pr > 90 && m.autor) {
            const autor = m.autor.split(" ·")[0];
            passendeSchrift(autor, size * 0.6, pr * 1.5, "400");
            ctx.fillStyle = `hsla(${hue}, 40%, 85%, ${0.7 * alpha})`;
            ctx.fillText(autor, px, y + size * 0.95);
          }
        }

        const kinder = m.kinder ?? [];
        if (kinder.length) {
          for (const k of kinder) zeichneMonade(k, tiefe + 1);
        } else if (pr > 6) {
          // Blatt: die eigene Welt der Monade, ohne Ende
          for (const k of prozeduraleKinder(hash(m.id))) {
            zeichneProzedural(f.x + k.x * f.r, f.y + k.y * f.r, k.r * f.r, k.seed, hue);
          }
        }
      };

      zeichneMonade(welt, 0);
      raf = requestAnimationFrame(zeichne);
    };
    raf = requestAnimationFrame(zeichne);

    /* --- Interaktion --- */
    const zoomUm = (faktor: number, mx: number, my: number) => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const v = view.current;
      const basis = basisVon(W, H);
      const scale = basis * v.zoom;
      const wx = v.cx + (mx - W / 2) / scale;
      const wy = v.cy + (my - H / 2) / scale;
      const neuZoom = Math.max(0.6, v.zoom * faktor);
      const neuScale = basis * neuZoom;
      v.cx = wx - (mx - W / 2) / neuScale;
      v.cy = wy - (my - H / 2) / neuScale;
      v.zoom = neuZoom;
      viewZiel.current = null;
      setHinweis(false);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      zoomUm(Math.exp(-e.deltaY * 0.0015), e.clientX - rect.left, e.clientY - rect.top);
    };
    const onPointerDown = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId);
      drag.current = { x: e.clientX, y: e.clientY, bewegt: false };
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!drag.current || pinch.current) return;
      const dx = e.clientX - drag.current.x;
      const dy = e.clientY - drag.current.y;
      if (Math.hypot(dx, dy) > 4) drag.current.bewegt = true;
      if (!drag.current.bewegt) return;
      const rect = canvas.getBoundingClientRect();
      const scale = basisVon(rect.width, rect.height) * view.current.zoom;
      view.current.cx -= dx / scale;
      view.current.cy -= dy / scale;
      viewZiel.current = null;
      drag.current.x = e.clientX;
      drag.current.y = e.clientY;
      setHinweis(false);
    };
    const onPointerUp = (e: PointerEvent) => {
      const d = drag.current;
      drag.current = null;
      if (!d || d.bewegt) return;
      // Klick: kleinste getroffene Monade wählen
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let best: Treffer | null = null;
      for (const t of treffer.current) {
        if (Math.hypot(t.x - mx, t.y - my) <= t.r && (!best || t.r < best.r)) best = t;
      }
      if (best) {
        if (best.m) {
          setAktivId(best.m.id);
          zoomAuf.current(best.m.id);
        } else {
          // Eine Monade ohne Inhalt: hinein, und wieder hinein — ohne Ende
          const f = best.welt;
          viewZiel.current = { cx: f.x, cy: f.y, zoom: 0.36 / (0.41 * f.r) };
        }
        setHinweis(false);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const [a, b] = [e.touches[0], e.touches[1]];
        const rect = canvas.getBoundingClientRect();
        pinch.current = {
          dist: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
          mx: (a.clientX + b.clientX) / 2 - rect.left,
          my: (a.clientY + b.clientY) / 2 - rect.top,
        };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinch.current) {
        e.preventDefault();
        const [a, b] = [e.touches[0], e.touches[1]];
        const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
        zoomUm(dist / pinch.current.dist, pinch.current.mx, pinch.current.my);
        pinch.current.dist = dist;
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) pinch.current = null;
    };

    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [byId]);

  const waehle = (id: string) => {
    setAktivId(id);
    zoomAuf.current(id);
    setHinweis(false);
  };

  const m = aktiv.m;
  const eltern = aktiv.eltern;
  const modusInfo = MODI.find((x) => x.id === modus)!;

  return (
    <div className="space-y-4">
      {/* Ansicht wählen */}
      <div className="flex flex-wrap items-center gap-2">
        {MODI.map((x) => (
          <button
            key={x.id}
            onClick={() => setModus(x.id)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              modus === x.id ? "bg-white/15 text-white" : "glass text-zinc-300 hover:bg-white/10"
            }`}
          >
            {x.label}
          </button>
        ))}
        <span className="text-xs text-zinc-500 ml-1 hidden sm:inline">{modusInfo.text}</span>
      </div>
      <p className="text-xs text-zinc-500 sm:hidden">{modusInfo.text}</p>

      <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
        {/* Canvas */}
        <div className="relative h-[62vh] min-h-[420px] rounded-3xl overflow-hidden glass">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
            aria-label="Monaden: Philosophen und Werke, ineinander verschachtelt"
          />
          {hinweis && (
            <div className="absolute inset-x-0 bottom-14 flex justify-center pointer-events-none">
              <div className="glass rounded-full px-5 py-2 text-xs sm:text-sm text-zinc-200 animate-pulse-glow">
                Monade anklicken · Scrollen oder Pinch zum Zoomen · Ziehen zum Verschieben
              </div>
            </div>
          )}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-mono text-zinc-300">
            <button
              onClick={() => waehle("welt")}
              className="glass rounded-full px-3 py-1 hover:bg-white/10 transition-colors"
            >
              Ganze Welt
            </button>
            {eltern && (
              <button
                onClick={() => waehle(eltern.id)}
                className="glass rounded-full px-3 py-1 hover:bg-white/10 transition-colors"
              >
                ↑ {eltern.titel}
              </button>
            )}
          </div>
        </div>

        {/* Lesefenster */}
        <aside
          className="glass rounded-3xl p-5 sm:p-6 lg:h-[62vh] lg:min-h-[420px] lg:overflow-y-auto"
          style={{ borderColor: `hsla(${m.hue}, 70%, 60%, 0.35)` }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: `hsl(${m.hue}, 80%, 65%)` }}
            />
            {m.status && (
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                {STATUS_LABEL[m.status]}
              </span>
            )}
            {m.jahr && <span className="text-[10px] font-mono text-zinc-500">· {m.jahr}</span>}
          </div>

          <h3 className="text-2xl font-bold leading-tight" style={{ color: `hsl(${m.hue}, 70%, 80%)` }}>
            {m.titel}
          </h3>
          {m.untertitel && <div className="text-sm text-zinc-400 mt-0.5">{m.untertitel}</div>}
          {m.autor && <div className="text-sm text-zinc-300 mt-1">{m.autor}</div>}

          {m.these && (
            <p className="mt-4 text-base font-medium text-white leading-snug">{m.these}</p>
          )}

          {m.text?.map((p, i) => (
            <p key={i} className="mt-3 text-sm text-zinc-300 leading-relaxed">
              {p}
            </p>
          ))}

          {m.literatur && m.literatur.length > 0 && (
            <details className="mt-4">
              <summary className="cursor-pointer text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-zinc-300">
                Literatur
              </summary>
              <ul className="mt-2 space-y-1 text-xs text-zinc-400">
                {m.literatur.map((b) => (
                  <li key={b}>— {b}</li>
                ))}
              </ul>
            </details>
          )}

          {m.kinder && m.kinder.length > 0 && (
            <div className="mt-5">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                Enthält
              </div>
              <div className="flex flex-wrap gap-2">
                {m.kinder.map((k) => (
                  <button
                    key={k.id}
                    onClick={() => waehle(k.id)}
                    className="glass rounded-full px-3 py-1 text-xs hover:bg-white/10 transition-colors"
                    style={{ color: `hsl(${k.hue}, 70%, 80%)` }}
                  >
                    {k.titel}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
