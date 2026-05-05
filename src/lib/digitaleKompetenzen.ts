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
