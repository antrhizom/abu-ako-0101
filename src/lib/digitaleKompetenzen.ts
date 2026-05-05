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
    untertitel: "Wie kommunizierst du?",
    beschreibung:
      "Alle 9 Sprachmodi werden im SLP gefordert. Sechs davon sind digital geprägt — drei davon erfordern aktive KI-Kompetenzen.",
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
// Pro Item: Wo wird es eingeführt (R1) bzw. wiederholt (R2/R3) und ob digital/KI gefragt
export type RKennung = "R1" | "R2" | "R3" | null;

export interface ZirkularZelle {
  r: RKennung;
  detail?: string; // Was wird in diesem Thema konkret gefordert?
  istKI?: boolean; // Speziell KI-relevant in diesem Thema?
}

export interface MatrixItem {
  name: string;
  istDigital: boolean; // Ob dieser Bereich allgemein digitale Kompetenzen einfordert
  istKI: boolean; // Ob KI-Kompetenzen explizit gefragt sind
  digitalNote?: string;
  zellen: ZirkularZelle[]; // Index 0-7 für Themen 1-8
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

// Hilfsfunktion: leere Zelle
const e = (): ZirkularZelle => ({ r: null });

// Sprachmodi-Matrix (9 × 8)
export const matrixSprachmodi: MatrixDaten = {
  dimension: "sprachmodi",
  farbe: "amber",
  items: [
    {
      name: "Rezeption mündlich",
      istDigital: false,
      istKI: false,
      zellen: [
        e(), e(),
        { r: "R1", detail: "Gespräche zu Gesundheit verstehen" },
        e(),
        { r: "R2", detail: "Politische Beiträge und Diskussionen verstehen" },
        e(), e(), e(),
      ],
    },
    {
      name: "Rezeption audiovisuell",
      istDigital: true,
      istKI: true,
      digitalNote: "Videos, Podcasts, KI-generierte Medien — Künstliche von echten Inhalten unterscheiden",
      zellen: [
        e(),
        { r: "R1", detail: "Audiovisuelle Werbung verstehen", istKI: false },
        e(),
        { r: "R2", detail: "KI-Inhalte erkennen, Videos kritisch prüfen", istKI: true },
        e(), e(),
        { r: "R3", detail: "Trends in der Arbeitswelt verstehen" },
        e(),
      ],
    },
    {
      name: "Rezeption schriftlich und bildlich",
      istDigital: true,
      istKI: false,
      digitalNote: "Digitale Texte, Websites, Infografiken, Recherche",
      zellen: [
        { r: "R1", detail: "Lehrvertrag, Berufsbildungs-Infos lesen" },
        e(), e(),
        { r: "R2", detail: "Recherchefunktionen (inkl. KI), Quellenarchive nutzen", istKI: true },
        e(), e(), e(),
        { r: "R3", detail: "Künstlerische digitale Texte einordnen" },
      ],
    },
    {
      name: "Produktion mündlich",
      istDigital: false,
      istKI: false,
      zellen: [
        e(), e(), e(), e(),
        { r: "R1", detail: "Eigene Meinung mündlich vertreten" },
        { r: "R2", detail: "Reklamationsgespräche, Verhandlungen" },
        e(), e(),
      ],
    },
    {
      name: "Produktion schriftlich und bildlich",
      istDigital: true,
      istKI: true,
      digitalNote: "Digitale Dokumente, Bewerbungen, KI-unterstützt verfassen",
      zellen: [
        e(), e(),
        { r: "R1", detail: "Digitale Notizen, Übersichten erstellen" },
        e(),
        { r: "R2", detail: "Politische Texte, Kommentare verfassen" },
        e(),
        { r: "R3", detail: "Bewerbungen mit KI-Unterstützung", istKI: true },
        e(),
      ],
    },
    {
      name: "Produktion multimedial",
      istDigital: true,
      istKI: true,
      digitalNote: "Videos, Präsentationen, KI-Bilder erstellen",
      zellen: [
        e(), e(), e(), e(),
        { r: "R1", detail: "Politische Inhalte multimedial aufbereiten", istKI: true },
        e(), e(),
        { r: "R2", detail: "Künstlerische digitale Produkte erstellen", istKI: true },
      ],
    },
    {
      name: "Interaktion und Kollaboration mündlich",
      istDigital: false,
      istKI: false,
      zellen: [
        { r: "R1", detail: "Gespräche im Betrieb, Konfliktlösung" },
        e(), e(), e(),
        { r: "R2", detail: "Diskussionen, Aushandlungsprozesse" },
        e(), e(), e(),
      ],
    },
    {
      name: "Interaktion und Kollaboration schriftlich",
      istDigital: true,
      istKI: false,
      digitalNote: "E-Mail, Chat, schriftliche Reklamation",
      zellen: [
        e(), e(), e(),
        { r: "R1", detail: "Digital schriftlich kommunizieren (E-Mail, Chat)" },
        e(),
        { r: "R2", detail: "Schriftliche Reklamation, Beschwerde" },
        { r: "R3", detail: "Bewerbungsschreiben digital" },
        e(),
      ],
    },
    {
      name: "Interaktion und Kollaboration digital",
      istDigital: true,
      istKI: true,
      digitalNote: "Videokonferenz, KI-Tools, digitale Teamarbeit",
      zellen: [
        { r: "R1", detail: "Videokonferenz, KI-Tools im Team", istKI: true },
        e(), e(),
        { r: "R2", detail: "KI-Interaktion vertieft, digitale Projekte", istKI: true },
        e(), e(), e(), e(),
      ],
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
      istKI: false,
      digitalNote: "Digitale Planung, Reflexion mit Tools",
      zellen: [
        { r: "R1", detail: "Lernziele in der Ausbildung digital festhalten" },
        e(), e(), e(), e(), e(),
        { r: "R2", detail: "Berufliche Ziele anpassen, Bewerbungen planen" },
        e(),
      ],
    },
    {
      name: "Verständnis fördern",
      istDigital: false,
      istKI: false,
      zellen: [
        { r: "R1", detail: "System der Berufsbildung verstehen" },
        e(),
        { r: "R2", detail: "Sicherheits- und Gesundheitsthemen verstehen" },
        e(), e(),
        { r: "R3", detail: "Vertragsrecht verstehen" },
        e(), e(),
      ],
    },
    {
      name: "Anpassung",
      istDigital: true,
      istKI: true,
      digitalNote: "Neue Tools, KI-Anwendungen, sich verändernde Plattformen",
      zellen: [
        e(), e(), e(),
        { r: "R1", detail: "Sich in digitalen Räumen orientieren", istKI: true },
        e(), e(),
        { r: "R2", detail: "An sich verändernde Arbeitswelt anpassen", istKI: true },
        e(),
      ],
    },
    {
      name: "Nachhaltigkeit",
      istDigital: false,
      istKI: false,
      zellen: [
        e(),
        { r: "R1", detail: "Nachhaltig konsumieren" },
        e(), e(), e(), e(), e(),
        { r: "R2", detail: "Kulturelle Vielfalt wertschätzen" },
      ],
    },
    {
      name: "Innovation und Problemlösung",
      istDigital: true,
      istKI: true,
      digitalNote: "Digitale Werkzeuge zum Lösen, KI-gestützte Recherche",
      zellen: [
        e(), e(), e(),
        { r: "R1", detail: "Digitale Werkzeuge gezielt einsetzen", istKI: true },
        e(), e(),
        { r: "R2", detail: "KI-Unterstützung für Bewerbung, Aufgaben", istKI: true },
        e(),
      ],
    },
    {
      name: "Quellen unterscheiden",
      istDigital: true,
      istKI: true,
      digitalNote: "KI-Inhalte, Fake News, Filterblasen erkennen",
      zellen: [
        e(), e(), e(),
        { r: "R1", detail: "Verlässliche Quellen finden, KI-Inhalte erkennen", istKI: true },
        { r: "R2", detail: "Politische Quellen kritisch prüfen" },
        e(), e(), e(),
      ],
    },
    {
      name: "Standpunkte begründen",
      istDigital: false,
      istKI: false,
      zellen: [
        e(), e(), e(), e(),
        { r: "R1", detail: "Eigene Meinung begründet vertreten" },
        { r: "R2", detail: "In Konflikten Standpunkt vertreten" },
        e(), e(),
      ],
    },
    {
      name: "Werthaltungen reflektieren",
      istDigital: true,
      istKI: false,
      digitalNote: "Mediennutzung, Datenschutz hinterfragen",
      zellen: [
        e(),
        { r: "R1", detail: "Eigenes Konsumverhalten reflektieren" },
        e(),
        { r: "R2", detail: "Mediennutzung & digitale Spuren reflektieren" },
        e(), e(), e(),
        { r: "R3", detail: "Künstlerische Werthaltungen reflektieren" },
      ],
    },
    {
      name: "Teamarbeit",
      istDigital: true,
      istKI: false,
      digitalNote: "Digitale Zusammenarbeit, kollaborative Tools",
      zellen: [
        { r: "R1", detail: "Im Team arbeiten, auch digital" },
        e(), e(), e(), e(), e(),
        { r: "R2", detail: "Digitale Projekte im Team durchführen" },
        e(),
      ],
    },
    {
      name: "Partizipation",
      istDigital: true,
      istKI: false,
      digitalNote: "Digitale Teilhabe, Online-Beteiligung",
      zellen: [
        e(), e(), e(), e(),
        { r: "R1", detail: "An politischen Prozessen teilhaben (auch digital)" },
        e(), e(),
        { r: "R2", detail: "Kulturelle Teilhabe, eigene Beiträge" },
      ],
    },
    {
      name: "Lebensphasen planen",
      istDigital: false,
      istKI: false,
      zellen: [
        { r: "R1", detail: "Ausbildungs-Lebensphase planen" },
        e(), e(), e(), e(), e(),
        { r: "R2", detail: "Berufliche Zukunft planen" },
        e(),
      ],
    },
    {
      name: "Mehrdeutigkeit",
      istDigital: true,
      istKI: true,
      digitalNote: "Mit KI-Unsicherheit, mehrdeutigen Inhalten umgehen",
      zellen: [
        e(), e(), e(),
        { r: "R1", detail: "KI-Inhalte sind mehrdeutig — damit umgehen", istKI: true },
        { r: "R2", detail: "Politische Mehrdeutigkeit aushalten" },
        e(), e(), e(),
      ],
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
      istKI: true,
      digitalNote: "Digitalethik, KI-Verantwortung",
      zellen: [
        e(),
        { r: "R1", detail: "Konsumethik, faire Entscheidungen" },
        e(),
        { r: "R2", detail: "Ethik im digitalen Raum, KI-Verantwortung", istKI: true },
        e(), e(), e(),
        { r: "R3", detail: "Kulturelle Ethik" },
      ],
    },
    {
      name: "Identität und Sozialisation",
      istDigital: true,
      istKI: false,
      digitalNote: "Digitale Identität, Online-Rollen",
      zellen: [
        { r: "R1", detail: "Rolle in der Arbeitswelt finden" },
        e(), e(),
        { r: "R2", detail: "Digitale Identität & Online-Rollen reflektieren" },
        e(), e(),
        { r: "R3", detail: "Berufliche Identität entwickeln" },
        e(),
      ],
    },
    {
      name: "Kultur",
      istDigital: true,
      istKI: false,
      digitalNote: "Digitale Kunst, Online-Kultur, Memes",
      zellen: [
        e(), e(), e(), e(), e(), e(), e(),
        { r: "R1", detail: "Künstlerische Ausdrucksformen, auch digital" },
      ],
    },
    {
      name: "Ökologie",
      istDigital: false,
      istKI: false,
      zellen: [
        e(),
        { r: "R1", detail: "Nachhaltiger Konsum, Umweltbelastung" },
        e(), e(), e(), e(), e(), e(),
      ],
    },
    {
      name: "Politik",
      istDigital: true,
      istKI: false,
      digitalNote: "Digitale Demokratie, Online-Meinungsbildung",
      zellen: [
        e(), e(), e(), e(),
        { r: "R1", detail: "Politische Beteiligung, auch digital" },
        e(), e(), e(),
      ],
    },
    {
      name: "Recht",
      istDigital: true,
      istKI: false,
      digitalNote: "Datenschutz, Urheberrecht, digitale Verträge",
      zellen: [
        e(), e(), e(), e(), e(),
        { r: "R1", detail: "Vertragsrecht, Datenschutz" },
        e(), e(),
      ],
    },
    {
      name: "Technologische und digitale Transformation",
      istDigital: true,
      istKI: true,
      digitalNote: "Hauptaspekt — KI, digitale Werkzeuge, Transformation",
      zellen: [
        e(), e(), e(),
        { r: "R1", detail: "Werkzeugkasten: Smartphone, Office, KI", istKI: true },
        e(), e(),
        { r: "R2", detail: "Trends in der digitalen Arbeitswelt, KI", istKI: true },
        e(),
      ],
    },
    {
      name: "Wirtschaft",
      istDigital: false,
      istKI: false,
      zellen: [
        e(),
        { r: "R1", detail: "Konsum, Preisbildung, Märkte" },
        e(), e(), e(), e(),
        { r: "R2", detail: "Arbeitsmarkt, Lohn" },
        e(),
      ],
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
