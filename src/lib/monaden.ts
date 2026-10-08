/**
 * Inhaltsverzeichnis als Monaden.
 *
 * Jede Monade ist ein Philosoph, ein Begriff oder ein Werk. Monaden enthalten
 * Monaden. Wer eine neue Position aufnehmen will, fügt hier ein Objekt hinzu —
 * die Seite platziert sie automatisch in allen fünf Ansichten
 * (Monade, Ebene, Netzwerk, Spur, Falte).
 *
 * `jahr` ordnet die Spur. `verbindungen` zeichnet das Netzwerk.
 * `status` markiert, was noch ausgearbeitet werden soll.
 */

export type Status = "ausgearbeitet" | "skizze" | "offen";

export interface Monade {
  id: string;
  titel: string;
  untertitel?: string;
  autor?: string;
  jahr?: number;
  hue: number;
  these?: string;
  text?: string[];
  literatur?: string[];
  verbindungen?: string[];
  status?: Status;
  kinder?: Monade[];
}

export const welt: Monade = {
  id: "welt",
  titel: "Die neue Unübersichtlichkeit",
  untertitel: "Positionen, die auf eine Welt antworten, die sich nicht berechnen lässt",
  hue: 250,
  these:
    "Leibniz versucht, eine Welt logisch zu ordnen, die sich logisch nicht ordnen lässt. Eine Welt kann nicht berechnet und nicht synchronisiert werden. Die Monaden hier sind Antworten darauf.",
  text: [
    "Jede Monade enthält Monaden. Klicke hinein, um eine Position, ein Werk oder einen Begriff zu lesen. Oben kannst du die Ansicht wechseln: Dann werden die Monaden zu Ebenen, zu einem Netzwerk, zu Spurenlinien oder zu Falten.",
    "Das Verzeichnis ist offen. Weitere Positionen lassen sich jederzeit aufnehmen.",
  ],
  kinder: [
    /* ---------------- Leibniz ---------------- */
    {
      id: "leibniz",
      titel: "Monade",
      untertitel: "la monade",
      autor: "Gottfried Wilhelm Leibniz",
      jahr: 1714,
      hue: 270,
      status: "ausgearbeitet",
      these:
        "Eine einfache Substanz ohne Teile, geschlossen in ihre eigene Welt, ohne Fenster — und doch Spiegel des ganzen Universums, von ihrem Standpunkt her.",
      text: [
        "Die Monade ist Leibniz' Antwort auf eine Krise: Die alte, geordnete Welt mit festem Zentrum zerfällt. Leibniz rettet sie, indem er die Unordnung zur Perspektive erklärt. Jede Monade drückt dieselbe Welt aus, aber jede von ihrem Ort.",
        "Damit das aufgeht, braucht er drei Rechenoperationen: Gott wählt unter allen möglichen Welten die beste (Theodizee). Gott stimmt alle Monaden vorab aufeinander ab (prästabilierte Harmonie). Und im vollständigen Begriff jeder Monade steht schon, was ihr zustossen wird (Discours de métaphysique).",
        "Das ist der Punkt: Das System hält nur, solange ein Dritter von aussen rechnet und synchronisiert. Nimmt man ihn weg, bleibt eine Welt aus geschlossenen Standpunkten, die sich nicht aufeinander abstimmen lassen.",
      ],
      literatur: [
        "Leibniz, Monadologie (1714), bes. §7, §56–57, §67, §78–81.",
        "Leibniz, Discours de métaphysique (1686), §8, §13.",
        "Leibniz, Système nouveau de la nature (1695) — das Bild der zwei Uhren.",
        "Leibniz, Essais de Théodicée (1710).",
      ],
      verbindungen: ["deleuze", "derrida", "tarde"],
      kinder: [
        {
          id: "monadologie",
          titel: "Monadologie",
          autor: "Leibniz",
          jahr: 1714,
          hue: 275,
          status: "ausgearbeitet",
          these: "Neunzig Paragraphen, die eine ganze Welt aus fensterlosen Punkten bauen.",
          text: [
            "§7: Die Monaden haben keine Fenster, durch die etwas hinein- oder hinausgehen könnte.",
            "§57: Wie dieselbe Stadt, von verschiedenen Seiten betrachtet, jeweils ganz anders erscheint, so gibt es ebenso viele Welten, wie es Monaden gibt — und doch sind es nur Perspektiven der einen Welt.",
            "§67: Jeder Teil der Materie ist wie ein Garten voller Pflanzen oder ein Teich voller Fische. Aber jeder Zweig, jedes Glied, jeder Tropfen ist wieder ein solcher Garten, ein solcher Teich.",
            "§78–81: Seele und Körper folgen je ihren eigenen Gesetzen und stimmen doch überein, kraft der prästabilierten Harmonie aller Substanzen.",
            "Die Stellen sind sinngemäss wiedergegeben, nicht wörtlich übersetzt.",
          ],
        },
        {
          id: "discours",
          titel: "Discours de métaphysique",
          autor: "Leibniz",
          jahr: 1686,
          hue: 265,
          status: "skizze",
          these: "Im vollständigen Begriff von Caesar steht schon, dass er den Rubikon überschreitet.",
          text: [
            "§8 führt den vollständigen Begriff ein: Jede individuelle Substanz enthält ein für alle Mal alles, was ihr je zustossen wird. §13 wehrt den Einwand ab, dass damit die Freiheit verschwinde.",
            "Hier liegt der Traum, die Welt zu lesen wie einen Text, in dem alles schon steht. Derrida setzt genau hier an.",
          ],
        },
        {
          id: "calculemus",
          titel: "Calculemus",
          untertitel: "Characteristica universalis",
          autor: "Leibniz",
          jahr: 1685,
          hue: 280,
          status: "skizze",
          these: "Wenn Streit entsteht, sagen zwei Philosophen einander: Lasst uns rechnen!",
          text: [
            "Leibniz entwirft eine universale Zeichenschrift, in der jeder Begriff vollständig ausgedrückt ist. Wer sie beherrscht, kann Streit durch Rechnen beilegen. Die Idee kehrt wieder in Logik, Informatik und in jeder Hoffnung, Gesellschaft über Daten zu steuern.",
          ],
        },
      ],
    },

    /* ---------------- Deleuze ---------------- */
    {
      id: "deleuze",
      titel: "Falte",
      untertitel: "le pli",
      autor: "Gilles Deleuze",
      jahr: 1988,
      hue: 40,
      status: "ausgearbeitet",
      these: "Nicht synchronisieren, sondern falten.",
      text: [
        "Deleuze behält die fensterlose Monade und streicht die Garantie. Die Monade ist kein Spiegel der einen Welt, sondern eine Faltung: Das Aussen wird nach innen gebogen, und so entsteht ein Standpunkt.",
        "Perspektive heisst nicht, dass jeder seine eigene Wahrheit hat. Sie heisst, dass Wahrheit nur unter einer Bedingung erscheint, nämlich gefaltet. Was sich bei Leibniz ausschliesst (das Inkompossible), existiert heute in derselben Welt: Chaosmos statt Kosmos. Die Dissonanz wird nicht mehr aufgelöst.",
        "Gegen Leibniz: Die Berechnung scheitert nicht an zu wenig Rechenkraft. Sie scheitert daran, dass die Welt keine Summe von Standpunkten ist, sondern das, was zwischen ihnen passiert: das Ereignis.",
      ],
      literatur: [
        "Deleuze, Die Falte. Leibniz und der Barock (1988; dt. 1995).",
        "Deleuze, Foucault (1986; dt. 1987), Kap. «Die Faltungen».",
        "Deleuze, «Postskriptum über die Kontrollgesellschaften» (1990), in: Unterhandlungen.",
      ],
      verbindungen: ["leibniz", "foucault", "latour"],
      kinder: [
        {
          id: "die-falte",
          titel: "Die Falte",
          untertitel: "Leibniz und der Barock",
          autor: "Deleuze",
          jahr: 1988,
          hue: 45,
          status: "ausgearbeitet",
          these: "Das barocke Haus: unten die Falten der Materie, oben die Falten der Seele.",
          text: [
            "Kap. 2 «Die Falten in der Seele»: Die Monade wird zur Falte. Kap. 5 «Inkompossibilität, Individualität, Freiheit»: Was Leibniz in getrennte Welten verbannt, lebt heute in derselben. Kap. 6 «Was ist ein Ereignis?». Schluss: «falten, entfalten, wieder falten».",
            "Dazu das Bild des Tableaus als Informationstafel: kein Fenster zur Welt mehr, sondern eine undurchsichtige Fläche, auf der die fensterlose Monade die Welt liest.",
          ],
        },
        {
          id: "foucault-buch",
          titel: "Foucault",
          untertitel: "Die Faltungen",
          autor: "Deleuze",
          jahr: 1986,
          hue: 35,
          status: "ausgearbeitet",
          these: "Das Innen ist eine Faltung des Aussen. Subjektivierung heisst: die Kräfte auf sich selbst zurückbiegen.",
          text: [
            "Woher kommt Widerstand, wenn Macht überall ist und Subjekte erst hervorbringt? Antwort: Das Subjekt entsteht als Faltung. Dieses Innen hängt von Macht und Wissen ab, ist aber nicht mit ihnen identisch.",
            "Anhang: Entfaltung (Klassik, Tableau) — Faltung (19. Jh., Form-Mensch) — Überfaltung (Silizium, genetischer Code). Die letzte ist zweideutig: Befreiung oder tiefere Kontrolle.",
          ],
        },
        {
          id: "kontrollgesellschaft",
          titel: "Postskriptum",
          untertitel: "über die Kontrollgesellschaften",
          autor: "Deleuze",
          jahr: 1990,
          hue: 50,
          status: "skizze",
          these: "Aus Individuen werden Dividuen: Datensätze, Codes, Passwörter.",
          text: [
            "Die Disziplin (Schule, Fabrik, Kaserne) wird abgelöst von der Kontrolle: ständige Weiterbildung, Scores, Profile. Schlussformel sinngemäss: kein Grund zur Furcht oder zur Hoffnung, es geht darum, neue Waffen zu suchen.",
          ],
        },
      ],
    },

    /* ---------------- Derrida ---------------- */
    {
      id: "derrida",
      titel: "Spur",
      untertitel: "la trace",
      autor: "Jacques Derrida",
      jahr: 1967,
      hue: 210,
      status: "ausgearbeitet",
      these: "Nicht berechnen, sondern aufschieben.",
      text: [
        "Leibniz träumt von einer Schrift, in der jeder Begriff vollständig ausgedrückt ist, sodass man Streit durch Rechnen beilegt. Derrida nimmt genau diesen Traum auseinander.",
        "Ein Zeichen ist nie ganz da. Es verweist auf andere Zeichen, und das ohne Ende. Was Leibniz «vollständiger Begriff» nennt, wäre eine Präsenz ohne Verweis, und die gibt es nicht. Was die Monade spiegelt, ist immer schon Spur: aufgeschoben (différance), nachträglich, von einem Aussen gezeichnet, das sich nie ganz einholen lässt.",
        "Gegen Leibniz: Die Welt lässt sich nicht berechnen, weil kein Begriff je abgeschlossen ist. Es gibt keine letzte Lesung, nur weitere Lesungen.",
      ],
      literatur: [
        "Derrida, Grammatologie (1967; dt. 1974), Teil I, Kap. 1 und 3 — dort ausdrücklich zu Leibniz' universaler Charakteristik.",
        "Derrida, «Die différance» (1968), in: Randgänge der Philosophie (dt. 1988).",
      ],
      verbindungen: ["leibniz"],
      kinder: [
        {
          id: "grammatologie",
          titel: "Grammatologie",
          autor: "Derrida",
          jahr: 1967,
          hue: 215,
          status: "ausgearbeitet",
          these: "Die Spur geht der Präsenz voraus.",
          text: [
            "Teil I diskutiert Leibniz' Characteristica universalis als Traum einer nicht-phonetischen, universalen Schrift. Derrida zeigt: Jede Schrift lebt vom Verweis, kein Zeichen ist je bei sich.",
          ],
        },
        {
          id: "differance",
          titel: "Die différance",
          autor: "Derrida",
          jahr: 1968,
          hue: 205,
          status: "skizze",
          these: "Aufschub und Unterschied in einem Wort, das man nur schreiben, nicht hören kann.",
          text: [
            "Bedeutung entsteht aus Unterschieden und wird zugleich aufgeschoben. Ein Selbst, das sich «findet», findet Spuren: das Tagebuch, die Erzählungen anderer, das alte Foto.",
          ],
        },
      ],
    },

    /* ---------------- Latour ---------------- */
    {
      id: "latour",
      titel: "Netzwerk",
      untertitel: "le réseau",
      autor: "Bruno Latour · Akteur-Netzwerk-Theorie",
      jahr: 1984,
      hue: 150,
      status: "ausgearbeitet",
      these: "Nicht synchronisieren, sondern übersetzen.",
      text: [
        "Leibniz' Monaden haben keine Fenster, deshalb muss die Übereinstimmung von oben kommen. Latour übernimmt Tardes offene Monaden gegen Leibniz'.",
        "In der ANT gibt es keine vorab eingestellte Harmonie. Nichts ist von sich aus auf etwas anderes reduzierbar. Was zusammenpasst, wurde übersetzt: durch Mittler, Instrumente, Verträge, Kabel, Formulare. Synchronisation ist nie ein Zustand der Welt, sondern eine lokale Leistung, die etwas kostet und wieder zerfallen kann.",
        "Berechnen gibt es, aber nur in «Zentren der Kalkulation», die Spuren sammeln. Die Welt selbst wird nicht berechnet, sie wird komponiert. Das Ganze ist immer kleiner als seine Teile.",
      ],
      literatur: [
        "Latour, Irréductions, in: Les microbes: guerre et paix (1984; engl. The Pasteurization of France, 1988), Teil II.",
        "Latour, Jensen, Venturini, Grauwin, Boullier, «The whole is always smaller than its parts», British Journal of Sociology 63/4 (2012).",
        "Latour, Eine neue Soziologie für eine neue Gesellschaft (2005; dt. 2007).",
        "Latour, Existenzweisen (2012; dt. 2014).",
      ],
      verbindungen: ["tarde", "deleuze", "foucault"],
      kinder: [
        {
          id: "irreductions",
          titel: "Irréductions",
          autor: "Latour",
          jahr: 1984,
          hue: 155,
          status: "skizze",
          these: "Nichts ist von sich aus auf etwas anderes reduzierbar oder irreduzibel.",
          text: [
            "Anhang zu «Les microbes». Kein Prinzip ordnet die Welt vorab; es gibt nur Kraftproben und Übersetzungen. Das ist Leibniz ohne Harmonie.",
          ],
        },
        {
          id: "whole-smaller",
          titel: "The whole is always smaller",
          untertitel: "than its parts",
          autor: "Latour u. a.",
          jahr: 2012,
          hue: 145,
          status: "skizze",
          these: "Ein digitaler Test von Tardes Monaden.",
          text: [
            "Mit Netzwerkdaten zeigen Latour und Kollegen: Jede Monade enthält mehr, als das Netz der Verbindungen je abbildet. Darum gibt es keine Übersicht, nur Spuren, denen man folgt.",
          ],
        },
        {
          id: "neue-soziologie",
          titel: "Eine neue Soziologie",
          untertitel: "für eine neue Gesellschaft",
          autor: "Latour",
          jahr: 2005,
          hue: 160,
          status: "ausgearbeitet",
          these: "Den Akteuren folgen. Das Soziale ist kein Stoff, sondern eine Bewegung des Verknüpfens.",
          text: [
            "Handlung ist verteilt auf Menschen und Dinge. Was wie ein stabiles Ganzes aussieht, ist das Ergebnis von Arbeit, die weitergehen muss.",
          ],
        },
      ],
    },

    /* ---------------- Tarde ---------------- */
    {
      id: "tarde",
      titel: "Monaden mit Fenstern",
      untertitel: "Monadologie et sociologie",
      autor: "Gabriel Tarde",
      jahr: 1893,
      hue: 180,
      status: "skizze",
      these: "Die Monaden sind offen, sie durchdringen einander. Jedes Ding ist eine Gesellschaft.",
      text: [
        "Tarde kehrt Leibniz um. Keine Harmonie von oben, sondern Nachahmung, Ansteckung, gegenseitiges Durchdringen. Latour hat Tarde als Vorläufer der ANT wiederentdeckt.",
      ],
      literatur: [
        "Tarde, Monadologie et sociologie (1893; dt. Monadologie und Soziologie, 2009).",
        "Latour, «Gabriel Tarde and the End of the Social» (2002).",
      ],
      verbindungen: ["leibniz", "latour"],
    },

    /* ---------------- Foucault ---------------- */
    {
      id: "foucault",
      titel: "Tableau",
      untertitel: "le tableau",
      autor: "Michel Foucault",
      jahr: 1966,
      hue: 320,
      status: "ausgearbeitet",
      these: "Ordnung als Fläche: Alles bekommt seinen Platz nach Identität und Differenz.",
      text: [
        "Im klassischen Zeitalter wird Wissen als Tableau organisiert: Naturgeschichte, allgemeine Grammatik, Analyse der Reichtümer. Alles liegt ausgebreitet auf einer Fläche, ohne Tiefe. Die Disziplin macht daraus «lebende Tableaus»: Sitzordnung, Rangliste, Krankenbett.",
        "Das Tableau ist hier Gegenstand der Kritik, nicht ihr Mittel: Es individualisiert, klassifiziert und weist eine Identität zu. Die Falte ist Deleuzes Gegenbegriff dazu.",
      ],
      literatur: [
        "Foucault, Die Ordnung der Dinge (1966; dt. 1971), Kap. 5 «Klassifizieren».",
        "Foucault, Überwachen und Strafen (1975; dt. 1976), Teil III «Die Kunst der Verteilungen».",
        "Foucault, «Andere Räume» (1967) — das Museum als Heterotopie.",
      ],
      verbindungen: ["deleuze", "latour"],
      kinder: [
        {
          id: "ordnung-der-dinge",
          titel: "Die Ordnung der Dinge",
          autor: "Foucault",
          jahr: 1966,
          hue: 325,
          status: "skizze",
          these: "Die Episteme der Klassik: das Tableau.",
        },
        {
          id: "ueberwachen",
          titel: "Überwachen und Strafen",
          autor: "Foucault",
          jahr: 1975,
          hue: 315,
          status: "skizze",
          these: "Lebende Tableaus: Aus einer ungeordneten Menge wird eine geordnete Vielheit.",
        },
      ],
    },

    /* ---------------- Habermas ---------------- */
    {
      id: "habermas",
      titel: "Die neue Unübersichtlichkeit",
      autor: "Jürgen Habermas",
      jahr: 1985,
      hue: 0,
      status: "offen",
      these: "Der Name des Problems: Die utopischen Energien sind erschöpft, die Gesellschaft wird für sich selbst undurchschaubar.",
      text: [
        "Habermas' Titel von 1985 benennt, worauf die anderen Monaden antworten. Seine eigene Antwort (kommunikative Vernunft, Verständigung) steht quer zu Deleuze, Derrida und Latour. Noch auszuarbeiten.",
      ],
      literatur: ["Habermas, Die neue Unübersichtlichkeit (1985)."],
      verbindungen: ["deleuze", "derrida", "latour"],
    },

    /* ---------------- Offen ---------------- */
    {
      id: "offen",
      titel: "Weitere Monaden",
      untertitel: "noch aufzunehmen",
      hue: 60,
      status: "offen",
      these: "Positionen, die hier noch Platz finden sollen.",
      text: [
        "Die Liste ist ein Vorschlag. Jede neue Position wird eine eigene Monade mit eigenen Werken.",
      ],
      kinder: [
        {
          id: "serres",
          titel: "Serres",
          untertitel: "Die zerknitterte Zeit",
          autor: "Michel Serres",
          jahr: 1990,
          hue: 70,
          status: "offen",
          these: "Zeit wie ein Taschentuch: Weit Entferntes rückt zusammen. Latours Quelle für die Falte in der Technik.",
        },
        {
          id: "sloterdijk",
          titel: "Sloterdijk",
          untertitel: "Sphären",
          autor: "Peter Sloterdijk",
          jahr: 1998,
          hue: 80,
          status: "offen",
          these: "Blasen, Globen, Schäume: Monaden als bewohnte Innenräume.",
        },
        {
          id: "haraway",
          titel: "Haraway",
          untertitel: "Situiertes Wissen",
          autor: "Donna Haraway",
          jahr: 1988,
          hue: 90,
          status: "offen",
          these: "Kein Blick von nirgendwo. Jede Perspektive ist verkörpert und verantwortlich.",
        },
        {
          id: "simondon",
          titel: "Simondon",
          untertitel: "Individuation",
          autor: "Gilbert Simondon",
          jahr: 1958,
          hue: 100,
          status: "offen",
          these: "Das Individuum ist nie fertig. Es individuiert sich aus einem Feld von Spannungen.",
        },
      ],
    },
  ],
};

/** Flache Liste aller Monaden mit Elternverweis */
export function alleMonaden(
  m: Monade = welt,
  eltern: Monade | null = null,
  acc: { m: Monade; eltern: Monade | null; tiefe: number }[] = [],
  tiefe = 0
) {
  acc.push({ m, eltern, tiefe });
  for (const k of m.kinder ?? []) alleMonaden(k, m, acc, tiefe + 1);
  return acc;
}
