import { getImageProps } from "next/image";

/**
 * Bilder: gemeinfreie Werke aus der Open-Access-Sammlung des
 * Metropolitan Museum of Art, New York.
 *
 * Das Met stellt Bilder gemeinfreier Werke unter Creative Commons Zero (CC0)
 * zur Verfügung und verzichtet damit auch auf allfällige Rechte an den
 * Fotografien selbst. Die Seite holt die Angaben beim Ausliefern über die
 * offizielle Met-API und zeigt ein Bild nur, wenn die API es als
 * gemeinfrei («isPublicDomain») führt. Ausgeliefert wird es über die
 * Bildoptimierung der eigenen Domain, damit Besucher keine Verbindung
 * zum Museum aufbauen.
 */

export interface KunstEintrag {
  /** Schlüssel der Monade in src/lib/monaden.ts */
  monade: string;
  metId: number;
  /** Warum gerade dieses Werk */
  bezug: string;
}

/** Hintergrundbilder im Monaden-Raum */
export const KUNST: KunstEintrag[] = [
  {
    monade: "welt",
    metId: 362729,
    bezug: "Eine Stadt, von einem Standpunkt aus gesehen — Monadologie §57.",
  },
  {
    monade: "leibniz",
    metId: 336228,
    bezug: "Der Versuch, die Welt mit Mass, Zahl und Polyeder zu ordnen.",
  },
  {
    monade: "deleuze",
    metId: 436576,
    bezug: "El Grecos Falten aus Stoff und Wolken: Deleuze zieht ihn in Die Falte heran.",
  },
  {
    monade: "derrida",
    metId: 354633,
    bezug: "Eine Landschaft aus Spuren: geätzte, gekratzte, verwischte Linien.",
  },
  {
    monade: "latour",
    metId: 388792,
    bezug: "Ein Knoten aus Verbindungen, ohne Anfang und Ende.",
  },
  {
    monade: "tarde",
    metId: 437881,
    bezug: "Eine Monade mit Fenster: Das Licht kommt von aussen herein.",
  },
  {
    monade: "foucault",
    metId: 337060,
    bezug: "Piranesis Gefängnisse: Ordnung, Treppen, Galerien — und kein Ausgang.",
  },
  {
    monade: "habermas",
    metId: 362671,
    bezug: "Unübersichtlichkeit: Räume, die sich nicht überblicken lassen.",
  },
  {
    monade: "sloterdijk",
    metId: 435888,
    bezug: "Eine Seifenblase: zerbrechlich, schützend, für einen Moment eine eigene Welt.",
  },
  {
    monade: "offen",
    metId: 435809,
    bezug: "Eine Welt voller Geschöpfe im Kleinsten — Monadologie §66.",
  },
];

/** Bilder im Lehrgang (Kapitelseiten), mit Begründung für das Impressum */
export const LEHRGANG_BILDER: { metId: number; bezug: string }[] = [
  { metId: 437394, bezug: "Kapitel 1: Der Philosoph zwischen dem alten Dichter und dem mächtigen Schüler." },
  { metId: 437397, bezug: "Kapitel 1: Das Ich, das sich selbst anschaut, mit allem, was ihm zugestossen ist." },
  { metId: 416025, bezug: "Kapitel 2: Der Dreissigjährige Krieg, in dessen letzten Jahren Leibniz geboren wird." },
  { metId: 207816, bezug: "Kapitel 2: Der Himmel als Kugel auf dem Tisch — die neue Wissenschaft." },
  { metId: 193624, bezug: "Kapitel 2: Die Welt als Uhrwerk, das Lieblingsbild der Zeit." },
  { metId: 399922, bezug: "Kapitel 2: Das Kleine wird zur Welt — Merian, Leibniz' Zeitgenossin." },
  { metId: 364922, bezug: "Kapitel 2: Versailles, eine Welt, die von einem Punkt aus geordnet ist." },
  { metId: 435904, bezug: "Kapitel 2: Vanitas — hinter aller Ordnung die Vergänglichkeit." },
  { metId: 437881, bezug: "Kapitel 3: Das Fenster, das die Monade nicht hat." },
  { metId: 435888, bezug: "Kapitel 3: Die Monade als Blase — ein Vorgriff auf Sloterdijk." },
];

export interface Kunstwerk {
  monade: string;
  metId: number;
  bezug: string;
  titel: string;
  kuenstler: string;
  datum: string;
  credit: string;
  url: string;
  /** Originalbild beim Museum (für next/image) */
  quelle: string;
  /** Über die eigene Domain optimierte Bildquelle (für Canvas) */
  src: string;
}

interface MetObjekt {
  objectID: number;
  isPublicDomain: boolean;
  primaryImage: string;
  primaryImageSmall: string;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  creditLine: string;
  objectURL: string;
}

const API = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

async function ladeEintrag(e: KunstEintrag): Promise<Kunstwerk | null> {
  try {
    const res = await fetch(API + e.metId, { next: { revalidate: 60 * 60 * 24 * 7 } });
    if (!res.ok) return null;
    const o = (await res.json()) as MetObjekt;
    const quelle = o.primaryImageSmall || o.primaryImage;
    if (!o.isPublicDomain || !quelle) return null;
    // 960 px bei doppelter Dichte → Bild mit 1920 px Breite
    const { props } = getImageProps({ src: quelle, alt: o.title, width: 960, height: 640, quality: 75 });
    return {
      monade: e.monade,
      metId: e.metId,
      bezug: e.bezug,
      titel: o.title,
      kuenstler: o.artistDisplayName,
      datum: o.objectDate,
      credit: o.creditLine,
      url: o.objectURL || `https://www.metmuseum.org/art/collection/search/${e.metId}`,
      quelle,
      src: props.src,
    };
  } catch {
    return null;
  }
}

/** Alle geprüften, gemeinfreien Werke des Raums (fehlende werden still weggelassen) */
export async function ladeKunst(): Promise<Kunstwerk[]> {
  const alle = await Promise.all(KUNST.map(ladeEintrag));
  return alle.filter((k): k is Kunstwerk => k !== null);
}

/** Werke nach Met-Nummer, als Map (fehlende bleiben weg) */
export async function ladeWerke(ids: number[]): Promise<Map<number, Kunstwerk>> {
  const eindeutig = [...new Set(ids)];
  const alle = await Promise.all(eindeutig.map((metId) => ladeEintrag({ monade: "", metId, bezug: "" })));
  const out = new Map<number, Kunstwerk>();
  alle.forEach((k) => {
    if (k) out.set(k.metId, k);
  });
  return out;
}
