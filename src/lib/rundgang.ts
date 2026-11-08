/**
 * Der Rundgang: sieben Stationen, die Orientierung geben.
 *
 * Jede Station folgt demselben Raster: eine Frage, eine Klärung in einem Satz,
 * eine kurze Erklärung und Beispiele aus dem Leben, die mit dieser Sicht anders
 * angegangen werden können. `pfad` nennt die Monade (als Kette von IDs aus
 * src/lib/monaden.ts), zu der die Kamera fliegt; `modus` die Verwandlung.
 */

export type Modus = "monade" | "ebene" | "reseau" | "trace" | "pli" | "schaum";

export interface Beispiel {
  /** Die Lage, wie man sie kennt */
  situation: string;
  /** Wie man sie mit dieser Sicht anders angehen kann */
  anders: string;
}

export interface Antwort {
  modus: Modus;
  wort: string;
  autor: string;
  satz: string;
  beispiel: Beispiel;
}

export interface Station {
  id: string;
  titel: string;
  frage: string;
  klaerung: string;
  text: string[];
  beispiele: Beispiel[];
  pfad: string[];
  modus?: Modus;
  extra?: "harmonie";
  antworten?: Antwort[];
  fragen?: { frage: string; hilfe: string }[];
  /** Zusätzlicher Sprung, z.B. in eine Monade hinein */
  sprung?: { label: string; pfad: string[] };
}

export const STATIONEN: Station[] = [
  {
    id: "fall",
    titel: "Der Fall",
    frage: "Wie lebt man in einer Welt, die niemand mehr überblickt?",
    klaerung:
      "Das Gefühl, den Überblick zu verlieren, ist kein persönliches Versagen. Es ist die Lage aller.",
    text: [
      "Jürgen Habermas hat 1985 von der «neuen Unübersichtlichkeit» gesprochen. Heute ist sie Alltag: Krieg, Klima, KI und Klatsch laufen im selben Feed, gleich laut, ohne Ordnung.",
      "Die Philosophie kann diese Welt nicht übersichtlich machen. Aber sie kann helfen, anders in ihr zu stehen. Darum geht es auf diesem Rundgang.",
    ],
    beispiele: [
      {
        situation: "Du scrollst durch Nachrichten und hast danach das Gefühl, alles sei schlimm und nichts verständlich.",
        anders:
          "Statt «Ich müsste das alles verstehen»: «Ich sehe von meinem Ort aus. Was davon betrifft mich, und wo kann ich etwas tun?»",
      },
      {
        situation: "Bei der Berufswahl gibt es Hunderte Möglichkeiten. Niemand weiss, wie der Arbeitsmarkt 2035 aussieht.",
        anders:
          "Es gibt keinen Masterplan, den man nur finden müsste. Es gibt den nächsten Schritt, den man von hier aus sieht.",
      },
    ],
    pfad: ["welt", "habermas"],
  },
  {
    id: "bild",
    titel: "Leibniz' Bild",
    frage: "Wenn alle die Welt anders sehen: Sehen wir dann überhaupt dieselbe Welt?",
    klaerung:
      "Leibniz sagt: ja. Es ist dieselbe Welt, aber jede Monade sieht sie von ihrem eigenen Ort aus, wie eine Stadt von verschiedenen Seiten.",
    text: [
      "Gottfried Wilhelm Leibniz (1646–1716) nennt diese Standpunkte Monaden. Jede ist in sich geschlossen, «ohne Fenster». Und doch spiegelt jede das ganze Universum, nur aus ihrer Perspektive.",
      "Klick die Monaden an: Von aussen sind sie geschlossene Kugeln. Innen siehst du die Welt, die auch im Hintergrund liegt, aber aus ihrem Blickwinkel.",
    ],
    beispiele: [
      {
        situation: "In der WG oder Familie streitet ihr, wer mehr im Haushalt macht. Alle haben das Gefühl, recht zu haben.",
        anders:
          "Alle haben recht, von ihrem Ort aus. Statt «Wer hat recht?» lautet die Frage: «Was siehst du, das ich von hier aus nicht sehe?»",
      },
      {
        situation: "Im Lehrbetrieb geht ein Auftrag schief. Lernende, Berufsbildnerin und Kunde erzählen drei verschiedene Geschichten.",
        anders:
          "Das sind keine Lügen, sondern drei Perspektiven auf dieselbe Sache. Erst wer sie zusammenträgt, sieht mehr.",
      },
    ],
    pfad: ["welt", "leibniz"],
  },
  {
    id: "scheitern",
    titel: "Warum das Bild scheitert",
    frage: "Was hält all die geschlossenen Perspektiven zusammen?",
    klaerung:
      "Bei Leibniz ein Gott, der alle Uhren von Anfang an gleich gestellt hat. Ohne diesen Uhrmacher geht keine Uhr mit der anderen, und die Welt lässt sich nicht ausrechnen.",
    text: [
      "Weil die Monaden keine Fenster haben, können sie sich nicht absprechen. Leibniz rettet sein System mit der «prästabilierten Harmonie»: Alles ist im Voraus aufeinander abgestimmt. Und er träumt davon, Streit durch Rechnen zu beenden: «Calculemus!»",
      "Probier es unten aus: Nimm den Uhrmacher weg, und die Uhren laufen auseinander. Dürers Melencolia im Hintergrund zeigt dazu passend eine Figur, um die alle Werkzeuge des Messens und Ordnens herumliegen, und die trotzdem nicht weiterkommt.",
      "Der Traum vom grossen Rechner ist nicht verschwunden. Er kehrt wieder, wo Algorithmen versprechen, Menschen und Zukünfte vollständig zu berechnen.",
    ],
    beispiele: [
      {
        situation: "Der Projekt- oder Stundenplan ist perfekt synchronisiert, bis eine Person krank wird. Dann fällt alles zusammen.",
        anders:
          "Kein Plan ersetzt Absprache. Plane Puffer und kurze Wege zum Reden ein, statt auf den perfekten Gleichschritt zu setzen.",
      },
      {
        situation: "Eine App oder ein Score sagt voraus, wie gut du in der Prüfung abschneidest oder ob du kreditwürdig bist.",
        anders:
          "Wer dem Score blind glaubt, glaubt an Leibniz' Uhrmacher. Frag: Wer hat hier gerechnet, mit welchen Daten, und was fehlt?",
      },
    ],
    pfad: ["welt", "leibniz", "harmonie"],
    extra: "harmonie",
  },
  {
    id: "bleibt",
    titel: "Was bleibt",
    frage: "Was lernen wir von einem Bild, das gescheitert ist?",
    klaerung:
      "Jede Sicht ist begrenzt und enthält doch die ganze Welt, nur unscharf. Deutlich sieht man immer nur einen kleinen Ausschnitt.",
    text: [
      "Leibniz selbst schreibt (Monadologie §61): Eine Seele kann nicht alle ihre Falten auf einmal entfalten, denn sie gehen ins Unendliche. Darum schweben in jeder Monade weitere Monaden. Du kannst hineinzoomen, ohne je ans Ende zu kommen.",
      "Das gescheiterte Bild ist trotzdem ein gutes Werkzeug: Es erinnert daran, dass niemand alles sieht, auch du nicht, und auch keine Expertin und keine Maschine.",
    ],
    beispiele: [
      {
        situation: "Die Ärztin sieht deine Blutwerte sehr genau, aber nicht, wie dein Alltag aussieht.",
        anders:
          "Ihre Sicht ist deutlich in einem Bereich und unscharf im Rest. Erzähl ihr, was ausserhalb ihres scharfen Ausschnitts liegt.",
      },
      {
        situation: "Dein Feed zeigt dir eine Welt, die vollständig wirkt.",
        anders:
          "Er ist scharf in deinem Ausschnitt und blind für den Rest. Wer weiss, wo die eigene Schärfe endet, sucht bewusst andere Blickwinkel.",
      },
    ],
    pfad: ["welt", "leibniz", "monadologie"],
  },
  {
    id: "antworten",
    titel: "Drei Antworten",
    frage: "Wie lebt man ohne Uhrmacher?",
    klaerung:
      "Statt die Welt zu synchronisieren, kann man sich anders zu ihr verhalten: falten, Spuren lesen, verbinden.",
    text: [
      "Drei Philosophen haben auf das Scheitern geantwortet. Jede Antwort ist auch eine Verwandlung der Monaden. Wähle sie unten aus und schau, was mit den Monaden passiert.",
    ],
    beispiele: [],
    antworten: [
      {
        modus: "pli",
        wort: "falten",
        autor: "Gilles Deleuze",
        satz: "Was von aussen kommt, kann man anders nach innen falten. Das Innen ist gefaltetes Aussen.",
        beispiel: {
          situation: "Eine schlechte Note in Mathe wird zu «Ich bin halt schlecht in Mathe».",
          anders: "Dieselbe Note anders gefaltet: «Ich lerne anders, ich brauche einen anderen Zugang.»",
        },
      },
      {
        modus: "trace",
        wort: "Spuren lesen",
        autor: "Jacques Derrida",
        satz: "Nichts ist je ganz da. Alles verweist auf anderes, das fehlt.",
        beispiel: {
          situation: "Ein Screenshot ohne Zusammenhang geht im Klassenchat herum und alle regen sich auf.",
          anders: "Der Spur folgen: Wer hat das wann, wo und zu wem gesagt, und was ist abgeschnitten?",
        },
      },
      {
        modus: "reseau",
        wort: "verbinden",
        autor: "Bruno Latour",
        satz: "Handeln ist verteilt auf Menschen und Dinge. Was zusammenhält, wurde verbunden und muss gepflegt werden.",
        beispiel: {
          situation: "«Die Bewerbung schaffe ich allein.»",
          anders:
            "Tatsächlich arbeiten Berufsberatung, Vorlage, Eltern, KI und Lehrstellenbörse mit. Gute Verbindungen pflegen statt Unabhängigkeit vorzuspielen.",
        },
      },
    ],
    pfad: ["welt"],
    modus: "pli",
  },
  {
    id: "schaum",
    titel: "Blase und Schaum",
    frage: "Wenn sich die Monaden nicht synchronisieren lassen: Wozu sind sie dann gut?",
    klaerung:
      "Sie schützen. Mit Peter Sloterdijk: Monaden sind Blasen, und Blasen sind Immunsysteme. Niemand lebt allein in seiner Blase. Heute bilden sie einen Schaum, viele Blasen, die Wände miteinander teilen.",
    text: [
      "Sloterdijk beschreibt in seiner Trilogie «Sphären» (1998–2004), dass Menschen nie ungeschützt im Freien leben, sondern in geteilten Innenräumen: zuerst zu zweit (Blasen), dann in der einen grossen Weltkugel, die alle umfasst (Globen). Diese grosse Kugel ist zerbrochen, so wie Leibniz' Harmonie. Was bleibt, ist ein Schaum (Schäume): viele kleine Blasen, die aneinanderstossen.",
      "Er nennt das «Ko-Isolation»: Jede Blase ist für sich und doch mit den Nachbarn verbunden, über gemeinsame Wände. So gelesen ist die Monade eine Hilfestellung gegen den reinen Fall: Wer keine Blase hat, fällt ungeschützt in die Unübersichtlichkeit.",
      "Aber eine Blase, die keine Wände mehr mit anderen teilt, wird zur Isolation. Ein Immunsystem schützt, ohne abzuschotten.",
    ],
    beispiele: [
      {
        situation: "Lehrbeginn: neue Firma, neue Leute, neue Regeln. Alles stürzt auf einmal herein.",
        anders:
          "Zuerst eine kleine Blase bauen: die Pausengruppe, eine Ansprechperson, ein Ritual am Morgen. Von dort aus wird der Rest übersichtlicher.",
      },
      {
        situation: "Eine Krise: Trennung, Lehrabbruch, Krankheit. Man fällt.",
        anders:
          "Wer fällt, braucht zuerst keinen Masterplan, sondern eine Blase: eine Freundin, eine Beratungsstelle, die Hausärztin. Hilfe holen heisst eine Wand teilen.",
      },
      {
        situation: "Im Chat und im Feed bestätigen sich alle gegenseitig, Andersdenkende kommen nicht mehr vor.",
        anders:
          "Die Blase ist zur Isolation geworden. Gute Wände sind durchlässig: bewusst eine Wand mit einer anderen Blase teilen.",
      },
    ],
    pfad: ["welt"],
    modus: "schaum",
    sprung: { label: "In Sloterdijks Monade", pfad: ["welt", "sloterdijk"] },
  },
  {
    id: "ich",
    titel: "Für mich",
    frage: "Was heisst das für mein Leben?",
    klaerung: "Man kann die Welt nicht überblicken. Aber man kann gut in ihr wohnen.",
    text: [
      "Drei Fragen zum Mitnehmen. Du kannst deine Antworten hier notieren; sie bleiben nur auf diesem Gerät gespeichert.",
    ],
    beispiele: [],
    fragen: [
      {
        frage: "Welche Blasen schützen mich?",
        hilfe: "Menschen, Orte, Rituale, Routinen, die mich halten.",
      },
      {
        frage: "Mit wem teile ich Wände, und sind sie zu dicht oder zu dünn?",
        hilfe: "Wo bin ich abgeschottet, wo fehlt mir Schutz?",
      },
      {
        frage: "Wo brauche ich ein Fenster?",
        hilfe: "Eine Perspektive, die ich von meinem Ort aus nicht habe.",
      },
    ],
    pfad: ["welt"],
    modus: "monade",
  },
];
