/**
 * Das Kabinett: die Startseite.
 *
 * Bilder aus der Zeit der Monaden, jedes mit einer Frage statt einer
 * Erklärung. Über die Motive wandert man von Bild zu Bild, ohne Ziel.
 * Die Erklärungen stehen im Lehrgang. Alle Bilder sind gemeinfrei (Met, CC0);
 * ihr Nachweis steht im Impressum.
 */

export interface KabinettBild {
  metId: number;
  /** Weitere Abzüge desselben Blatts, falls das Museum zum ersten kein Bild liefert */
  ersatz?: number[];
  frage: string;
  motive: string[];
  /** Grösse an der Wand */
  gross?: boolean;
}

export const KABINETT: KabinettBild[] = [
  { metId: 207816, frage: "Wo ist die Mitte?", motive: ["Mitte", "Ordnung", "Kugel"], gross: true },
  { metId: 437397, frage: "Wer schaut hier wen an?", motive: ["Ich", "Innen", "Zeit"] },
  { metId: 193624, frage: "Wer hat sie aufgezogen?", motive: ["Ordnung", "Zeit", "Harmonie"] },
  { metId: 436576, frage: "Wo hört der Stoff auf, wo beginnt die Wolke?", motive: ["Falte", "Himmel"], gross: true },
  { metId: 437881, frage: "Was kommt durch das Fenster?", motive: ["Fenster", "Innen"] },
  { metId: 416025, ersatz: [420826, 420819], frage: "Wer hat recht?", motive: ["Wahrheit", "Mitte"] },
  { metId: 435888, frage: "Wie lange hält sie?", motive: ["Kugel", "Innen", "Zeit"] },
  { metId: 388792, frage: "Wo ist der Anfang?", motive: ["Verbindung", "Unendlich"] },
  { metId: 364922, frage: "Von wo aus ist alles geordnet?", motive: ["Mitte", "Ordnung", "Perspektive"], gross: true },
  { metId: 399922, frage: "Wie klein ist eine Welt?", motive: ["Unendlich", "Innen"] },
  { metId: 337060, frage: "Wo ist der Ausgang?", motive: ["Ordnung", "Unübersicht"] },
  { metId: 437394, frage: "Wessen Hand liegt auf wessen Kopf?", motive: ["Verbindung", "Zeit", "Ich"] },
  { metId: 354633, frage: "Was war hier, bevor du hingeschaut hast?", motive: ["Spur", "Zeit"], gross: true },
  { metId: 437877, frage: "Was hängt da von der Decke?", motive: ["Kugel", "Himmel", "Wahrheit"] },
  { metId: 336228, frage: "Was fehlt ihr?", motive: ["Ordnung", "Unendlich", "Ich"] },
  { metId: 362729, frage: "Von welcher Seite siehst du die Stadt?", motive: ["Perspektive", "Mitte"] },
  { metId: 435904, frage: "Was bleibt?", motive: ["Zeit", "Spur"] },
  { metId: 435809, frage: "Wer arbeitet hier alles mit?", motive: ["Verbindung", "Zeit", "Perspektive"], gross: true },
  { metId: 362671, frage: "Wer hat das gebaut, und wofür?", motive: ["Unübersicht", "Ordnung"] },
];

export function kabinettIds(): number[] {
  return KABINETT.flatMap((b) => [b.metId, ...(b.ersatz ?? [])]);
}
