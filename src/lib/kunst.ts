import { getImageProps } from "next/image";

/**
 * Hintergrundbilder: gemeinfreie Werke aus der Open-Access-Sammlung des
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
    monade: "offen",
    metId: 435809,
    bezug: "Eine Welt voller Geschöpfe im Kleinsten — Monadologie §66.",
  },
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
  /** Über die eigene Domain optimierte Bildquelle */
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
    const { props } = getImageProps({ src: quelle, alt: o.title, width: 1920, height: 1280, quality: 75 });
    return {
      monade: e.monade,
      metId: e.metId,
      bezug: e.bezug,
      titel: o.title,
      kuenstler: o.artistDisplayName,
      datum: o.objectDate,
      credit: o.creditLine,
      url: o.objectURL || `https://www.metmuseum.org/art/collection/search/${e.metId}`,
      src: props.src,
    };
  } catch {
    return null;
  }
}

/** Alle geprüften, gemeinfreien Werke (fehlende werden still weggelassen) */
export async function ladeKunst(): Promise<Kunstwerk[]> {
  const alle = await Promise.all(KUNST.map(ladeEintrag));
  return alle.filter((k): k is Kunstwerk => k !== null);
}
