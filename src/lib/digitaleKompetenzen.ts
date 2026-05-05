// Digitale Kompetenzen im SLP ABU EBA 2030
// Wie digitale Kompetenzen in den 3 Kompetenzdimensionen eingefordert werden

export interface DigitaleAnforderung {
  bereich: string;
  beschreibung: string;
  themen: string[];
}

export interface KompetenzDimension {
  id: string;
  titel: string;
  untertitel: string;
  beschreibung: string;
  farbe: string; // Tailwind-Klasse
  emoji: string;
  anforderungen: DigitaleAnforderung[];
}

export const dimensionen: KompetenzDimension[] = [
  {
    id: "sprachmodi",
    titel: "Sprachmodi",
    untertitel: "Wie kommunizierst du digital?",
    beschreibung:
      "Zwei der neun Sprachmodi sind explizit digital ausgerichtet. Sie verlangen, dass du dich in digitalen Kommunikationsräumen sicher bewegst.",
    farbe: "amber",
    emoji: "💬",
    anforderungen: [
      {
        bereich: "Interaktion und Kollaboration digital",
        beschreibung:
          "An digitalen Austauschsituationen aktiv teilnehmen (z.B. Videokonferenz), mit KI-basierten Tools interagieren und deren Beiträge reflektieren, digitale Projekte im Team durchführen.",
        themen: ["T1: Berufseinstieg (R1)", "T4: Medien & digitale Welt (R2)"],
      },
      {
        bereich: "Produktion multimedial",
        beschreibung:
          "Eigene digitale Produkte erstellen — von politischen Beiträgen bis zu künstlerischen Werken. Inhalte zielgruppengerecht in unterschiedlichen Medien aufbereiten.",
        themen: ["T5: Meinung bilden (R1)", "T8: Kultur und Kunst (R2)"],
      },
      {
        bereich: "Rezeption audiovisuell",
        beschreibung:
          "Audiovisuelle digitale Medien verstehen, einordnen und kritisch hinterfragen — Videos, Podcasts, Kurzformate und algorithmisch kuratierte Inhalte.",
        themen: ["T2, T4, T5, T7"],
      },
    ],
  },
  {
    id: "schluesselkompetenzen",
    titel: "Schlüsselkompetenzen",
    untertitel: "Welche Fähigkeiten werden trainiert?",
    beschreibung:
      "Mehrere der 12 Schlüsselkompetenzen werden gezielt durch digitale Anwendungen aufgebaut — sie wirken über alle Themen hinweg.",
    farbe: "blue",
    emoji: "🎯",
    anforderungen: [
      {
        bereich: "Quellen unterscheiden",
        beschreibung:
          "Verlässliche von unverlässlichen digitalen Quellen unterscheiden, Recherchefunktionen (inklusive KI) richtig einsetzen, Quellenarchive nutzen und Quellen dokumentieren.",
        themen: ["T4: Medien & digitale Welt"],
      },
      {
        bereich: "Innovation und Problemlösung",
        beschreibung:
          "Digitale Werkzeuge gezielt einsetzen, um Probleme zu lösen — von der Suche nach Informationen bis zur Erstellung eigener Lösungen.",
        themen: ["T4, T7"],
      },
      {
        bereich: "Anpassung",
        beschreibung:
          "Sich in einer sich rasch verändernden digitalen Welt orientieren — neue Tools, Plattformen und KI-Anwendungen verstehen und sinnvoll integrieren.",
        themen: ["T4, T7"],
      },
      {
        bereich: "Werthaltungen reflektieren",
        beschreibung:
          "Den eigenen Umgang mit digitalen Medien und KI hinterfragen — was teile ich, was glaube ich, wie schütze ich meine Daten?",
        themen: ["T4, T2"],
      },
    ],
  },
  {
    id: "gesellschaftliche-inhalte",
    titel: "Gesellschaftliche Inhalte",
    untertitel: "Worüber lernst du?",
    beschreibung:
      "Einer der acht Aspekte ist explizit der Technologischen und digitalen Transformation gewidmet — und durchzieht zentrale Themen.",
    farbe: "emerald",
    emoji: "🌐",
    anforderungen: [
      {
        bereich: "Technologische und digitale Transformation (R1)",
        beschreibung:
          "Funktionen von Ordnerstrukturen, Kommunikationsmitteln, Kalender- und Notizverwaltung, Smartphone-Werkzeuge — der digitale Werkzeugkasten für Schule und Beruf.",
        themen: ["T4: Medien & digitale Welt"],
      },
      {
        bereich: "Technologische und digitale Transformation (R2)",
        beschreibung:
          "Trends in der digitalen Arbeitswelt verstehen, KI-Unterstützung für Bewerbungen, digitale Einreichwege für amtliche Dokumente nutzen.",
        themen: ["T7: Arbeit und Zukunft"],
      },
      {
        bereich: "Künstliche Intelligenz",
        beschreibung:
          "Mit KI-Tools arbeiten: Prompts formulieren, Bilder erzeugen, Inhalte prüfen. Künstliche von echten Inhalten unterscheiden. Die Grenzen von KI verstehen.",
        themen: ["T3, T4, T7"],
      },
      {
        bereich: "Datenschutz & digitale Spuren",
        beschreibung:
          "Verantwortungsvoll mit Social Media umgehen, eigene digitale Spuren reflektieren, Datenschutz im Alltag einordnen.",
        themen: ["T4: Medien & digitale Welt"],
      },
    ],
  },
];

// Die 8 Themen mit ihrem digitalen Bezug
export interface ThemaDigital {
  nr: number;
  titel: string;
  digitalIntensitaet: 1 | 2 | 3 | 4 | 5; // 1 = wenig, 5 = sehr digital
  digitalKurz: string;
}

// === MATRIX-DATEN ===
// Pro Item: Wo wird es eingeführt (R1) bzw. wiederholt (R2/R3) und ob digital gefragt
export type RKennung = "R1" | "R2" | "R3" | null;

export interface MatrixItem {
  name: string;
  istDigital: boolean; // Ob dieser Bereich digitale Kompetenzen einfordert
  digitalNote?: string; // Kurzhinweis warum digital
  zirkular: RKennung[]; // Index 0-7 für Themen 1-8
}

export interface MatrixDaten {
  dimension: "sprachmodi" | "schluesselkompetenzen" | "gesellschaftliche-inhalte";
  farbe: "amber" | "blue" | "emerald";
  items: MatrixItem[];
}

// Themenkürzel für die Matrix-Header
export const themenKurzNamen = [
  "Berufseinstieg",
  "Konsum",
  "Gesundheit",
  "Medien",
  "Meinung",
  "Verträge",
  "Arbeit",
  "Kultur",
];

// Sprachmodi-Matrix (9 Sprachmodi × 8 Themen)
export const matrixSprachmodi: MatrixDaten = {
  dimension: "sprachmodi",
  farbe: "amber",
  items: [
    {
      name: "Rezeption mündlich",
      istDigital: false,
      zirkular: [null, null, "R1", null, "R2", null, null, null],
    },
    {
      name: "Rezeption audiovisuell",
      istDigital: true,
      digitalNote: "Videos, Podcasts, KI-generierte Medien",
      zirkular: [null, "R1", null, "R2", null, null, "R3", null],
    },
    {
      name: "Rezeption schriftlich und bildlich",
      istDigital: true,
      digitalNote: "Digitale Texte, Websites, Infografiken",
      zirkular: ["R1", null, null, "R2", null, null, null, "R3"],
    },
    {
      name: "Produktion mündlich",
      istDigital: false,
      zirkular: [null, null, null, null, "R1", "R2", null, null],
    },
    {
      name: "Produktion schriftlich und bildlich",
      istDigital: true,
      digitalNote: "Digitale Dokumente, Bewerbungen, Inhalte",
      zirkular: [null, null, "R1", null, "R2", null, "R3", null],
    },
    {
      name: "Produktion multimedial",
      istDigital: true,
      digitalNote: "Videos, Präsentationen, KI-Bilder",
      zirkular: [null, null, null, null, "R1", null, null, "R2"],
    },
    {
      name: "Interaktion und Kollaboration mündlich",
      istDigital: false,
      zirkular: ["R1", null, null, null, "R2", null, null, null],
    },
    {
      name: "Interaktion und Kollaboration schriftlich",
      istDigital: true,
      digitalNote: "E-Mail, Chat, schriftliche Beschwerden",
      zirkular: [null, null, null, "R1", null, "R2", "R3", null],
    },
    {
      name: "Interaktion und Kollaboration digital",
      istDigital: true,
      digitalNote: "Videokonferenz, KI-Tools, digitale Teamarbeit",
      zirkular: ["R1", null, null, "R2", null, null, null, null],
    },
  ],
};

// Schlüsselkompetenzen-Matrix (12 × 8)
export const matrixKompetenzen: MatrixDaten = {
  dimension: "schluesselkompetenzen",
  farbe: "blue",
  items: [
    {
      name: "Ziele setzen und anpassen",
      istDigital: true,
      digitalNote: "Digitale Planung, KI-gestützte Reflexion",
      zirkular: ["R1", null, null, null, null, null, "R2", null],
    },
    {
      name: "Verständnis fördern",
      istDigital: false,
      zirkular: ["R1", null, "R2", null, null, "R3", null, null],
    },
    {
      name: "Anpassung",
      istDigital: true,
      digitalNote: "Neue Tools, KI, sich verändernde Plattformen",
      zirkular: [null, null, null, "R1", null, null, "R2", null],
    },
    {
      name: "Nachhaltigkeit",
      istDigital: false,
      zirkular: [null, "R1", null, null, null, null, null, "R2"],
    },
    {
      name: "Innovation und Problemlösung",
      istDigital: true,
      digitalNote: "Digitale Werkzeuge zum Lösen von Aufgaben",
      zirkular: [null, null, null, "R1", null, null, "R2", null],
    },
    {
      name: "Quellen unterscheiden",
      istDigital: true,
      digitalNote: "KI-Inhalte, Fake News, Filterblasen erkennen",
      zirkular: [null, null, null, "R1", "R2", null, null, null],
    },
    {
      name: "Standpunkte begründen",
      istDigital: false,
      zirkular: [null, null, null, null, "R1", "R2", null, null],
    },
    {
      name: "Werthaltungen reflektieren",
      istDigital: true,
      digitalNote: "Eigene Mediennutzung, Datenschutz hinterfragen",
      zirkular: [null, "R1", null, "R2", null, null, null, "R3"],
    },
    {
      name: "Teamarbeit",
      istDigital: true,
      digitalNote: "Digitale Zusammenarbeit, kollaborative Tools",
      zirkular: ["R1", null, null, null, null, null, "R2", null],
    },
    {
      name: "Partizipation",
      istDigital: true,
      digitalNote: "Digitale Teilhabe, Online-Beteiligung",
      zirkular: [null, null, null, null, "R1", null, null, "R2"],
    },
    {
      name: "Lebensphasen planen",
      istDigital: false,
      zirkular: ["R1", null, null, null, null, null, "R2", null],
    },
    {
      name: "Mehrdeutigkeit",
      istDigital: true,
      digitalNote: "Mit KI-Unsicherheit umgehen",
      zirkular: [null, null, null, "R1", "R2", null, null, null],
    },
  ],
};

// Gesellschaftliche Inhalte (Aspekte)-Matrix (8 × 8)
export const matrixAspekte: MatrixDaten = {
  dimension: "gesellschaftliche-inhalte",
  farbe: "emerald",
  items: [
    {
      name: "Ethik",
      istDigital: true,
      digitalNote: "Digitalethik, KI-Verantwortung",
      zirkular: [null, "R1", null, "R2", null, null, null, "R3"],
    },
    {
      name: "Identität und Sozialisation",
      istDigital: true,
      digitalNote: "Digitale Identität, Online-Rollen",
      zirkular: ["R1", null, null, "R2", null, null, "R3", null],
    },
    {
      name: "Kultur",
      istDigital: true,
      digitalNote: "Digitale Kunst, Memes, Online-Kultur",
      zirkular: [null, null, null, null, null, null, null, "R1"],
    },
    {
      name: "Ökologie",
      istDigital: false,
      zirkular: [null, "R1", null, null, null, null, null, null],
    },
    {
      name: "Politik",
      istDigital: true,
      digitalNote: "Digitale Demokratie, politische Meinungsbildung online",
      zirkular: [null, null, null, null, "R1", null, null, null],
    },
    {
      name: "Recht",
      istDigital: true,
      digitalNote: "Datenschutz, Urheberrecht, digitale Verträge",
      zirkular: [null, null, null, null, null, "R1", null, null],
    },
    {
      name: "Technologische und digitale Transformation",
      istDigital: true,
      digitalNote: "Hauptaspekt — KI, digitale Werkzeuge, Transformation",
      zirkular: [null, null, null, "R1", null, null, "R2", null],
    },
    {
      name: "Wirtschaft",
      istDigital: false,
      zirkular: [null, "R1", null, null, null, null, "R2", null],
    },
  ],
};

export const themenDigital: ThemaDigital[] = [
  { nr: 1, titel: "Ins Berufsleben einsteigen", digitalIntensitaet: 4, digitalKurz: "Digitaler Lern- und Arbeitsplatz, Videokonferenz, KI-Tools im Team" },
  { nr: 2, titel: "Bewusst konsumieren und handeln", digitalIntensitaet: 3, digitalKurz: "Digitale Angebote, Werbung im digitalen Raum" },
  { nr: 3, titel: "Sicherheit und Gesundheit", digitalIntensitaet: 3, digitalKurz: "Sicherheit in der digitalen Welt, KI für Übersichten, Prompts formulieren" },
  { nr: 4, titel: "Medien und digitale Welt", digitalIntensitaet: 5, digitalKurz: "Hauptthema — KI, Recherche, Social Media, Datenschutz" },
  { nr: 5, titel: "Meinung bilden und mitgestalten", digitalIntensitaet: 4, digitalKurz: "Multimediale Produktion, digitale Partizipation" },
  { nr: 6, titel: "Verträge verstehen — fair handeln", digitalIntensitaet: 1, digitalKurz: "Geringer digitaler Bezug" },
  { nr: 7, titel: "Arbeit und Zukunft", digitalIntensitaet: 5, digitalKurz: "Digitale Bewerbung, KI-Unterstützung, digitale Arbeitswelt" },
  { nr: 8, titel: "Kultur und Kunst", digitalIntensitaet: 3, digitalKurz: "Künstlerische digitale Produkte, multimediale Darstellung" },
];
