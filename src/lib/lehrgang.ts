/**
 * Der Lehrgang: Teil I, die Grundlagen.
 *
 * Jedes Kapitel ist eine Folge von Abschnitten, jeder Abschnitt eine Folge
 * von Blöcken (Absatz, Bild, Merksatz, Begriff, Beispiel, Zeittafel,
 * Frage, Zitat). Bilder sind Met-Objektnummern; ihr Nachweis steht in
 * src/lib/kunst.ts (LEHRGANG_BILDER) und im Impressum.
 */

export type Block =
  | { art: "absatz"; text: string }
  | { art: "bild"; metId: number; warum: string; ersatz?: number[] }
  | { art: "merksatz"; text: string }
  | { art: "begriff"; wort: string; text: string }
  | { art: "beispiel"; situation: string; anders: string }
  | { art: "liste"; punkte: string[] }
  | { art: "zeittafel"; eintraege: { jahr: string; text: string }[] }
  | { art: "frage"; text: string; hilfe?: string }
  | { art: "zitat"; text: string; ref: string };

export interface Abschnitt {
  titel: string;
  bloecke: Block[];
}

export interface Kapitel {
  slug: string;
  nummer: number;
  titel: string;
  untertitel: string;
  /** Drei Punkte: worum es in diesem Kapitel geht */
  worum: string[];
  abschnitte: Abschnitt[];
  /** Lesedauer in Minuten (grob) */
  minuten: number;
}

export const KAPITEL: Kapitel[] = [
  /* ================================================================ */
  {
    slug: "wozu-philosophie",
    nummer: 1,
    titel: "Wozu Philosophie?",
    untertitel: "Und wozu diese Philosophie",
    minuten: 9,
    worum: [
      "Was Philosophie leistet: ordnen, klären, Orientierung geben.",
      "Zwei Grundbilder davon, wie wir in der Welt sind: das handelnde Ich, oder das Zusammenspiel vieler.",
      "Warum dieser Lehrgang beim zweiten Bild ansetzt, und bei Leibniz beginnt.",
    ],
    abschnitte: [
      {
        titel: "Philosophie ist kein Fach, sondern eine Tätigkeit",
        bloecke: [
          {
            art: "absatz",
            text: "Philosophie beginnt dort, wo die üblichen Antworten nicht mehr reichen. Ein Beispiel: Jemand bricht die Lehre ab. Die praktische Frage lautet: Was mache ich jetzt? Dafür gibt es Beratung, Formulare, Fristen. Aber darunter liegt eine andere Frage: Was heisst es, dass ich das nicht geschafft habe? Bin ich das, oder ist mir das passiert? Diese zweite Frage ist eine philosophische. Niemand kann sie für dich beantworten, aber man kann sie besser oder schlechter stellen.",
          },
          {
            art: "absatz",
            text: "Philosophie löst die Lage nicht. Sie macht etwas anderes, und das ist nicht weniger wert:",
          },
          {
            art: "liste",
            punkte: [
              "Sie reduziert Komplexität: nicht alles auf einmal, sondern eine Unterscheidung, die trägt.",
              "Sie ordnet Ereignisse: Was gehört zusammen, was nicht? Was ist Ursache, was Folge, was Zufall?",
              "Sie klärt Wörter: damit man weiss, wovon man spricht, wenn man «frei», «schuld» oder «Ich» sagt.",
              "Sie gibt Verständnisanleitungen: ein Bild, mit dem man weiterdenken kann, auch wenn das Bild nicht ganz stimmt.",
              "Sie hilft zu leben: nicht durch Trost, sondern indem sie einen wieder handlungsfähig macht.",
            ],
          },
          {
            art: "merksatz",
            text: "Philosophie löst die Lage nicht. Sie gibt mir ein Bild, mit dem ich in der Lage handeln kann.",
          },
          {
            art: "bild",
            metId: 437394,
            warum:
              "Rembrandt malt 1653 den Philosophen Aristoteles. Seine Hand liegt auf dem Kopf des alten Dichters Homer; an seiner Brust hängt eine Goldkette mit dem Bild seines Schülers Alexander des Grossen, des mächtigsten Mannes seiner Zeit. Der Philosoph steht zwischen dem, was vor ihm war, und dem, was durch ihn möglich wurde. Denken geschieht nie allein.",
          },
        ],
      },
      {
        titel: "Zwei Bilder davon, wie wir in der Welt sind",
        bloecke: [
          {
            art: "absatz",
            text: "Das erste Bild stellt das Ich in die Mitte. René Descartes schreibt 1637: Ich denke, also bin ich. Immanuel Kant nennt 1784 den Ausgang aus der Unmündigkeit das Ziel der Aufklärung: Der Mensch soll sich seines eigenen Verstandes bedienen, selbst denken, selbst wählen. Daraus wird das moderne Subjekt: ein Ich, das von sich aus plant, entscheidet und die Welt gestaltet. Dieses Bild steckt heute überall. Im Bewerbungsschreiben («Ich bin zielstrebig und belastbar»), im Coaching («Du schaffst alles, wenn du willst»), in der Schulnote (die Leistung ist deine). Es hat uns viel gebracht: Rechte, Verantwortung, die Idee, dass niemand über mich verfügen darf.",
          },
          {
            art: "begriff",
            wort: "Subjektphilosophie",
            text: "Philosophien, die beim einzelnen, bewussten Ich ansetzen: Es erkennt die Welt, es handelt frei, es ist für sich verantwortlich. Die Welt ist das Gegenüber (das «Objekt»), das es erkennt und gestaltet.",
          },
          {
            art: "absatz",
            text: "Das zweite Bild beginnt mit einer Beobachtung. Wenn ich handle, spüre ich, dass ich nicht allein handle. Ich spreche eine Sprache, die ich nicht gewählt habe. Ich stehe auf, weil ein Wecker klingelt, den jemand programmiert hat. Meine Meinung ist aus Gesprächen, Feeds und Erfahrungen zusammengesetzt, von denen ich die meisten vergessen habe. Mein Körper ist müde oder wach, ohne dass ich das entscheide. Und wenn etwas gelingt, haben viele mitgewirkt, die im Zeugnis nicht stehen.",
          },
          {
            art: "absatz",
            text: "Die Philosophien in diesem Lehrgang gehen von dieser Erfahrung aus. Sie sagen: Die Welt ist kein Ort, an dem einzelne, unabhängige Ichs die Welt formen. Sie ist ein Zusammenspiel vieler Akteure: Menschen, Dinge, Körper, Gewohnheiten, Institutionen, Geschichten. Und wir selbst entstehen in diesem Zusammenspiel. Wer verstehen will, warum wir so in der Welt sind, wie wir es in unseren Handlungen spüren, muss dieses Zusammenspiel in einen Zusammenhang bringen. Genau das versuchen Leibniz, Tarde, Deleuze, Derrida, Latour und Sloterdijk, jeder auf seine Weise.",
          },
          {
            art: "begriff",
            wort: "Akteur",
            text: "Alles, was in einem Zusammenspiel einen Unterschied macht. Nicht nur Menschen: auch ein Wecker, ein Gesetz, eine Krankheit, ein Gerücht, eine Gewohnheit. Das Wort stammt aus dem Theater: Wer auf der Bühne etwas bewirkt, spielt mit.",
          },
          {
            art: "bild",
            metId: 437397,
            warum:
              "Rembrandt, Selbstbildnis, 1660. Das Ich, das sich selbst anschaut: das Bild des Subjekts schlechthin. Er ist 54, hat Frau und Kind verloren und Konkurs gemacht. In seinem Gesicht sieht man alles, was ihm zugestossen ist. Das Ich ist ein Ort, an dem sich vieles getroffen hat.",
          },
          {
            art: "absatz",
            text: "Was das zweite Bild nicht heisst: dass ich nichts kann und alles Schicksal ist. Es heisst: Ich bin ein Mitspieler, ein wichtiger, aber einer unter vielen. Handeln bedeutet dann nicht, die Welt von aussen zu gestalten, sondern Verbindungen zu knüpfen, zu lösen und zu pflegen. Das ist weniger heroisch, aber näher an dem, was man tatsächlich erlebt.",
          },
          {
            art: "beispiel",
            situation: "Du hast die Prüfung nicht bestanden. Das erste Bild sagt: Du hast zu wenig gelernt. Punkt.",
            anders:
              "Was hat mitgespielt? Der Schlaf, der Nebenjob, die Art der Prüfung, die Unterlagen, die Angst. Das nimmt dir die Verantwortung nicht ab. Es zeigt dir, wo du ansetzen kannst, und was nicht an dir allein liegt.",
          },
          {
            art: "beispiel",
            situation: "Jemand im Betrieb sagt: «Jeder ist seines Glückes Schmied.»",
            anders:
              "Dann müsste jeder dieselben Werkzeuge, dieselbe Werkstatt und dieselbe Zeit haben. Die Frage ist: Welche Werkzeuge, Menschen und Umstände haben bei dir mitgeschmiedet, und welche bei anderen gefehlt?",
          },
          {
            art: "beispiel",
            situation: "Klimafrage: «Was kann ich als Einzelner schon tun?»",
            anders:
              "Die Frage ist falsch gestellt, solange man sich als einzelnes Ich denkt. Als Mitspieler lautet sie: In welchen Verbindungen (Betrieb, Verein, Gemeinde, Familie) kann ich etwas stärken, das dann mehr bewegt als ich allein?",
          },
          {
            art: "merksatz",
            text: "Ich bin nicht der Autor meiner Welt, aber ich bin auch nicht ihr Opfer. Ich bin ein Mitspieler, und ich kann die Verbindungen verändern, in denen ich spiele.",
          },
        ],
      },
      {
        titel: "Warum dieser Lehrgang bei Leibniz beginnt",
        bloecke: [
          {
            art: "absatz",
            text: "Die Philosophen auf dieser Seite sind sehr verschieden. Deleuze schreibt über Falten, Derrida über Spuren, Latour über Netzwerke, Sloterdijk über Blasen. Aber sie teilen das zweite Bild, und sie haben einen gemeinsamen Urahn: die Monade von Gottfried Wilhelm Leibniz. Die Monade ist der erste grosse Versuch, die Welt als Zusammenspiel vieler Standpunkte zu denken, nicht als Werk eines Ich und auch nicht als Maschine ohne Innenleben.",
          },
          {
            art: "absatz",
            text: "Leibniz ist mit diesem Versuch gescheitert, aber auf eine Weise, die alle Späteren weitergedacht haben. Darum beginnen wir bei ihm. Zuerst mit der Welt, in der er lebte (Kapitel 2), denn ohne diese Welt versteht man nicht, warum er die Monade brauchte. Dann mit dem Begriff selbst, Schritt für Schritt (Kapitel 3). Kapitel 4 fragt dann, warum ausgerechnet dieses alte Bild unsere Zeit trifft: Gilles Deleuze hat die Monade im Barock wiedergefunden, und der Barock sieht unserer Gegenwart ähnlicher, als man denkt. Erst danach kommen die Antworten der anderen (Teil II).",
          },
          {
            art: "frage",
            text: "Wo in deinem Alltag spürst du, dass du nicht allein handelst?",
            hilfe: "Zum Beispiel beim Aufstehen, beim Reden, bei einer Entscheidung, die du «selbst» getroffen hast.",
          },
          {
            art: "frage",
            text: "Wann hat dir das Bild vom starken Ich geholfen, und wann hat es dich unter Druck gesetzt?",
          },
        ],
      },
    ],
  },

  /* ================================================================ */
  {
    slug: "die-welt-um-1700",
    nummer: 2,
    titel: "Die Welt um 1700",
    untertitel: "Die Zeit der Monaden",
    minuten: 12,
    worum: [
      "In welche Welt Leibniz 1646 hineingeboren wurde.",
      "Welche Erschütterungen diese Welt prägten: Krieg und Glaubensspaltung, die neue Wissenschaft, Fernrohr und Mikroskop, der barocke Hof.",
      "Warum die Monade eine Antwort auf genau diese Welt ist, und warum uns diese Welt bekannt vorkommt.",
    ],
    abschnitte: [
      {
        titel: "Ein Kind des Krieges",
        bloecke: [
          {
            art: "absatz",
            text: "Gottfried Wilhelm Leibniz wird am 1. Juli 1646 in Leipzig geboren, zwei Jahre vor dem Ende des Dreissigjährigen Krieges (1618–1648). Dieser Krieg hat Mitteleuropa verwüstet. In manchen Gegenden Deutschlands stirbt ein Drittel bis die Hälfte der Bevölkerung, durch Gewalt, Hunger und Seuchen. Es ist ein Krieg um Macht, aber auch ein Krieg um die Wahrheit: katholisch oder protestantisch. Seit Luther (1517) ist das Christentum gespalten, und jede Seite ist sicher, dass die andere irrt.",
          },
          {
            art: "bild",
            metId: 416025,
            ersatz: [420826, 420819],
            warum:
              "Jacques Callot, Die Hinrichtung (La Pendaison), 1633, aus der Folge «Die Elenden und Unglücke des Krieges». Callot zeigt den Krieg nicht als Heldentat, sondern als das, was er mit Menschen macht. In dieser Welt wächst Leibniz auf.",
          },
          {
            art: "absatz",
            text: "Der Westfälische Friede von 1648 beendet den Krieg mit einem Kompromiss: Jeder Fürst bestimmt die Konfession seines Landes. Die Wahrheitsfrage wird nicht gelöst, sondern aufgeteilt. Leibniz wird sein Leben lang versuchen, die Kirchen wieder zu vereinen, durch Briefe, Gespräche und Denkschriften. Vergeblich. Diese Erfahrung steckt in seiner Philosophie: Wie kann es eine Welt sein, wenn die Standpunkte unvereinbar scheinen?",
          },
          {
            art: "begriff",
            wort: "Konfession",
            text: "Ein Bekenntnis, eine Glaubensrichtung innerhalb des Christentums (katholisch, lutherisch, reformiert). Um 1650 bestimmt die Konfession, wo man leben, heiraten und arbeiten darf.",
          },
        ],
      },
      {
        titel: "Die Erde verliert ihre Mitte",
        bloecke: [
          {
            art: "absatz",
            text: "Zur gleichen Zeit zerbricht das alte Weltbild. Kopernikus hatte 1543 gezeigt, dass die Erde um die Sonne kreist. Galilei richtet 1609 ein Fernrohr zum Himmel und sieht Monde um den Jupiter; 1633 muss er vor der Inquisition widerrufen. Kepler berechnet die Bahnen der Planeten. René Descartes, der 1650 stirbt, erklärt die Natur als Maschine, die sich mit Mathematik beschreiben lässt. Isaac Newton veröffentlicht 1687 seine «Principia»: ein Gesetz für den fallenden Apfel und für den Mond.",
          },
          {
            art: "absatz",
            text: "Die Welt ist nun berechenbar, aber sie hat keine Mitte mehr. Der Mensch ist nicht mehr der Mittelpunkt, und Gott hat keinen festen Ort mehr im Weltgebäude. Blaise Pascal, ein Zeitgenosse von Leibniz, schreibt sinngemäss: Das ewige Schweigen dieser unendlichen Räume erschreckt mich.",
          },
          {
            art: "bild",
            metId: 207816,
            warum:
              "Willem Blaeu, Himmelsglobus, Amsterdam, nach 1621. Der Himmel als Kugel, die man auf den Tisch stellen und drehen kann. Die neue Wissenschaft macht die Welt handhabbar, und zugleich fremd.",
          },
          {
            art: "bild",
            metId: 193624,
            warum:
              "Astronomische Tischuhr, Augsburg, 17. Jahrhundert. Die Uhr ist das Lieblingsbild der Zeit: die Welt als Uhrwerk, das Gott aufgezogen hat und das seither von selbst läuft. Leibniz wird genau dieses Bild für seine Harmonie verwenden.",
          },
        ],
      },
      {
        titel: "Neue Augen: Fernrohr und Mikroskop",
        bloecke: [
          {
            art: "absatz",
            text: "Zwei Instrumente verändern, was man sehen kann. Das Fernrohr zeigt das unendlich Grosse. Das Mikroskop zeigt das unendlich Kleine. Robert Hooke veröffentlicht 1665 die «Micrographia», mit einem Floh, der über eine ganze Doppelseite reicht. Antoni van Leeuwenhoek sieht in den 1670er-Jahren in einem Tropfen Wasser «Tierchen», die vorher niemand gesehen hat. Leibniz kennt diese Entdeckungen und ist begeistert.",
          },
          {
            art: "zitat",
            text: "Daraus sieht man, dass es im kleinsten Teil der Materie eine Welt von Geschöpfen gibt, von Lebewesen, von Tieren, von Entelechien, von Seelen.",
            ref: "Leibniz, Monadologie §66 (sinngemäss übersetzt)",
          },
          {
            art: "bild",
            metId: 399922,
            warum:
              "Maria Sibylla Merian, Studie mit Kapern, Ginster und einem Käfer, 1693. Merian (1647–1717) lebt fast genau zur selben Zeit wie Leibniz. Sie zeichnet Insekten und ihre Verwandlungen so genau, dass ihre Blätter als Wissenschaft gelten. Das Kleine wird zur Welt.",
          },
          {
            art: "absatz",
            text: "Was das für das Denken heisst: Es gibt keine kleinste Einheit mehr, bei der man aufhören könnte. Wo man hinschaut, öffnet sich eine weitere Welt. Die Welt ist nicht nur gross, sie ist in jede Richtung unendlich. Leibniz' Bild vom Garten im Garten und vom Teich im Teich (Monadologie §67) stammt direkt aus dieser Erfahrung.",
          },
        ],
      },
      {
        titel: "Barock: der Hof, die Bühne, die Falte",
        bloecke: [
          {
            art: "absatz",
            text: "Die Kunst dieser Zeit heisst heute Barock. Sie liebt Bewegung, Falten, Licht und Schatten, Täuschung und Theater. Die Welt wird als Bühne gedacht, hinter der sich etwas anderes verbirgt. Zugleich entstehen die grossen Höfe. Ludwig XIV. baut ab 1661 Versailles: eine Ordnung aus Gärten, Achsen und Ritualen, in der jeder seinen Platz hat und alles auf den König ausgerichtet ist.",
          },
          {
            art: "bild",
            metId: 364922,
            warum:
              "Adam Perelle, Gesamtansicht des Schlosses von Versailles, 1680er-Jahre. Eine Welt, in der alles von einem Punkt aus geordnet ist. Leibniz kannte solche Höfe von innen: Er war Hofrat und Bibliothekar in Hannover.",
          },
          {
            art: "bild",
            metId: 435904,
            warum:
              "Pieter Claesz, Stillleben mit Schädel und Schreibfeder, 1628. Das Barock weiss auch, dass alles vergeht: Schädel, umgestürztes Glas, verlöschende Lampe. Hinter aller Ordnung die Vergänglichkeit.",
          },
          {
            art: "absatz",
            text: "Beides, Bühne und Hof, hinterlässt Spuren in der Monade: der Gedanke, dass jeder die Welt von seinem Platz aus sieht (die Perspektive), und der Gedanke, dass Ordnung von einem Zentrum ausgeht (die Harmonie). Dreihundert Jahre später wird Gilles Deleuze sagen: Die Falte ist der Grundbegriff des Barock, und die Monade ist seine Philosophie.",
          },
        ],
      },
      {
        titel: "Wer war Leibniz?",
        bloecke: [
          {
            art: "absatz",
            text: "Sohn eines Juraprofessors, mit zwanzig Doktor der Rechte, Diplomat im Dienst des Kurfürsten von Mainz. Vier Jahre in Paris (1672–1676), wo er die höhere Mathematik lernt und die Differentialrechnung erfindet, zur gleichen Zeit wie Newton in England; der Streit darüber, wer zuerst war, vergiftet sein Alter. Er baut eine Rechenmaschine, die multiplizieren kann, und entwickelt das binäre Zahlensystem aus 0 und 1, auf dem heute jeder Computer beruht.",
          },
          {
            art: "absatz",
            text: "Ab 1676 ist er Bibliothekar und Hofrat in Hannover. Er soll eine Geschichte des Welfenhauses schreiben und wird nie fertig. Er korrespondiert mit über tausend Menschen in ganz Europa; er lebt selbst in einem Netzwerk, lange bevor es das Wort gibt. 1710 erscheint die «Theodizee»: Gott hat die beste aller möglichen Welten geschaffen. 1714 schreibt er in Wien, für den Prinzen Eugen, die «Monadologie»: 90 Paragraphen, nie zu Lebzeiten gedruckt. 1716 stirbt er in Hannover, fast vergessen; der Hof ist nach London gezogen, wo sein Kurfürst König geworden ist.",
          },
          {
            art: "merksatz",
            text: "Leibniz' Welt ist zerstritten über die Wahrheit, ohne Mitte, in jede Richtung unendlich, und am Hof streng geordnet. Die Monade ist sein Versuch, diese Welt als eine zu denken.",
          },
          {
            art: "zeittafel",
            eintraege: [
              { jahr: "1517", text: "Luthers Thesen. Die Spaltung des Christentums beginnt." },
              { jahr: "1543", text: "Kopernikus: Die Erde kreist um die Sonne." },
              { jahr: "1609", text: "Galilei richtet das Fernrohr zum Himmel." },
              { jahr: "1618–1648", text: "Dreissigjähriger Krieg." },
              { jahr: "1637", text: "Descartes: «Ich denke, also bin ich.»" },
              { jahr: "1646", text: "Leibniz wird in Leipzig geboren." },
              { jahr: "1648", text: "Westfälischer Friede." },
              { jahr: "1661", text: "Ludwig XIV. beginnt den Ausbau von Versailles." },
              { jahr: "1665", text: "Hooke, «Micrographia»: die Welt unter dem Mikroskop." },
              { jahr: "1675", text: "Leibniz erfindet die Differentialrechnung." },
              { jahr: "1687", text: "Newton, «Principia»." },
              { jahr: "1710", text: "Leibniz, «Theodizee»." },
              { jahr: "1714", text: "Leibniz, «Monadologie»." },
              { jahr: "1716", text: "Leibniz stirbt in Hannover." },
              { jahr: "1755", text: "Erdbeben von Lissabon. Voltaire verspottet die «beste aller Welten»." },
            ],
          },
        ],
      },
      {
        titel: "Warum uns diese Welt bekannt vorkommt",
        bloecke: [
          {
            art: "absatz",
            text: "Man könnte meinen, das sei weit weg. Aber vier Züge dieser Welt kennen wir gut. Erstens der Streit um die Wahrheit: Damals Konfessionen, heute Lager, die sich gegenseitig für verblendet halten, mit je eigenen Quellen. Zweitens der Verlust der Mitte: Es gibt keine Instanz mehr, die alle anerkennen. Drittens Instrumente, die neue Unendlichkeiten zeigen: damals Fernrohr und Mikroskop, heute Datenmengen, Feeds, Genanalysen, die mehr zeigen, als man verarbeiten kann. Viertens Ordnungen, die alles auf einen Punkt ausrichten wollen: damals der Hof, heute Plattformen, die alle Verbindungen über sich laufen lassen.",
          },
          {
            art: "absatz",
            text: "Leibniz' Frage ist darum auch unsere: Wie kann das eine Welt sein? Und wie lebt man darin, ohne entweder alles zu wissen oder zu verzweifeln? Seine Antwort, die Monade, schauen wir im nächsten Kapitel an.",
          },
          {
            art: "frage",
            text: "Welche der vier Züge (Streit um Wahrheit, Verlust der Mitte, zu viel Sichtbares, Ordnung auf einen Punkt hin) spürst du in deinem Alltag am stärksten?",
          },
          {
            art: "frage",
            text: "Leibniz hat ein Leben lang versucht, Zerstrittene zu versöhnen, und ist gescheitert. War das vergeblich?",
          },
        ],
      },
    ],
  },

  /* ================================================================ */
  {
    slug: "was-ist-eine-monade",
    nummer: 3,
    titel: "Was ist eine Monade?",
    untertitel: "Der Begriff in fünf Schritten",
    minuten: 11,
    worum: [
      "Die Monade Schritt für Schritt: Standpunkt, keine Fenster, Spiegel, Perspektive, Harmonie.",
      "Zu jedem Schritt ein Beispiel aus dem Alltag.",
      "Wo das Bild scheitert, und was davon bleibt.",
    ],
    abschnitte: [
      {
        titel: "Schritt 1: Kein Baustein, sondern ein Standpunkt",
        bloecke: [
          {
            art: "zitat",
            text: "Die Monade, von der wir hier sprechen, ist nichts anderes als eine einfache Substanz, die in das Zusammengesetzte eingeht. Einfach heisst: ohne Teile.",
            ref: "Monadologie §1",
          },
          {
            art: "absatz",
            text: "Man denkt zuerst an Atome: kleine Bausteine, aus denen alles besteht. Aber ein Atom ist ein Stück Materie, und Materie lässt sich immer weiter teilen, das weiss Leibniz vom Mikroskop. Die Monade ist etwas anderes. Sie hat keine Teile, keine Ausdehnung, keine Form. Sie ist eher ein Punkt, von dem aus gesehen wird: ein Standpunkt, eine Innenseite. Die Welt besteht für Leibniz nicht aus Dingen, sondern aus Standpunkten.",
          },
          {
            art: "beispiel",
            situation: "Dein Platz im Klassenzimmer.",
            anders:
              "Niemand kann an deiner Stelle sitzen. Nicht weil der Stuhl besetzt ist, sondern weil niemand von genau dort aus sieht, was du siehst, mit deiner Geschichte, deiner Müdigkeit, deinem Streit von heute Morgen. Das ist eine Monade: nicht der Stuhl, sondern der Standpunkt.",
          },
        ],
      },
      {
        titel: "Schritt 2: Keine Fenster",
        bloecke: [
          {
            art: "zitat",
            text: "Die Monaden haben keine Fenster, durch die etwas hinein- oder hinausgehen könnte.",
            ref: "Monadologie §7",
          },
          {
            art: "absatz",
            text: "Das ist der berühmteste und der schwierigste Satz. Leibniz meint: Nichts kommt von aussen in eine Monade hinein, nichts geht hinaus. Was du erlebst, entsteht in dir. Das klingt zuerst nach Einsamkeit. Es ist aber auch eine Beobachtung: Deinen Zahnschmerz kann niemand fühlen. Deine Erinnerung an den ersten Schultag hat niemand sonst. Und umgekehrt: Niemand kann dir eine Erfahrung einpflanzen. Man kann dir etwas erzählen, aber was es in dir auslöst, ist deins.",
          },
          {
            art: "bild",
            metId: 437881,
            warum:
              "Johannes Vermeer, Junge Frau mit Wasserkrug, um 1662. Das Licht kommt durch ein Fenster herein, und die Frau öffnet es gerade. Leibniz sagt: Die Monade hat kein solches Fenster. Zweihundert Jahre später wird Gabriel Tarde widersprechen, und Latour wird ihm folgen. Merke dir das Fenster; es kommt wieder.",
          },
          {
            art: "beispiel",
            situation: "Du erklärst einer Freundin, warum dich etwas verletzt hat. Sie versteht es nicht.",
            anders:
              "Sie kann es nicht fühlen, nur hören und sich etwas Eigenes dazu vorstellen. Das ist kein Mangel an Liebe, sondern die Lage aller Monaden. Verständnis heisst nicht, dass das Fenster aufgeht, sondern dass zwei Innenseiten einander lange genug zuhören.",
          },
        ],
      },
      {
        titel: "Schritt 3: Spiegel des Universums",
        bloecke: [
          {
            art: "zitat",
            text: "Jede einfache Substanz hat Beziehungen, die alle anderen ausdrücken. Sie ist ein lebendiger, immerwährender Spiegel des Universums.",
            ref: "Monadologie §56",
          },
          {
            art: "absatz",
            text: "Hier wird es überraschend. Die Monade hat keine Fenster, und doch ist in ihr alles enthalten. Alles, was irgendwo geschieht, hinterlässt in jeder Monade eine Spur, aber verworren, undeutlich, unterhalb der Aufmerksamkeit. Leibniz nennt das «kleine Perzeptionen»: das Rauschen des Meeres, das aus unzähligen Wellen besteht, von denen man keine einzeln hört. Du bist mit allem verbunden, aber du merkst es kaum.",
          },
          {
            art: "beispiel",
            situation: "Ein Krieg in einem fernen Land.",
            anders:
              "Er verändert den Preis des Brotes, die Stimmung in den Nachrichten, die Sorgen deiner Eltern, den Ton in der Klasse. Du bist betroffen, ohne es deutlich zu wissen. Die Monade ist kein abgeschlossenes Zimmer, sondern ein Ort, an dem die ganze Welt leise mitschwingt.",
          },
        ],
      },
      {
        titel: "Schritt 4: Perspektive",
        bloecke: [
          {
            art: "zitat",
            text: "Wie dieselbe Stadt, von verschiedenen Seiten betrachtet, ganz anders erscheint, so gibt es durch die unendliche Menge der einfachen Substanzen gleichsam ebenso viele verschiedene Welten. Sie sind doch nur die Perspektiven einer einzigen, je nach dem Gesichtspunkt jeder Monade.",
            ref: "Monadologie §57",
          },
          {
            art: "absatz",
            text: "Jede Monade spiegelt dieselbe Welt, aber von ihrem Ort aus. Und sie sieht nur das Nahe deutlich; der Rest bleibt verworren (§60). Das ist Leibniz' Antwort auf den Streit um die Wahrheit, mit dem Kapitel 2 begann: Die Streitenden sehen nicht verschiedene Welten, sondern dieselbe Welt von verschiedenen Seiten, und jede Seite deutlich nur in ihrer Nähe. Perspektive heisst bei Leibniz nicht: Jeder hat seine Wahrheit. Es heisst: Die Wahrheit erscheint immer nur unter einer Bedingung, und keine Monade hat alle Bedingungen auf einmal.",
          },
          {
            art: "beispiel",
            situation: "Du und deine Berufsbildnerin seht denselben Betrieb.",
            anders:
              "Sie sieht Aufträge, Kosten, Kunden deutlich, deinen Alltag in der Werkstatt verworren. Du siehst den Alltag deutlich, die Zahlen verworren. Keiner von beiden sieht den Betrieb; beide sehen ihn von ihrem Ort aus. Wer das weiss, fragt nicht «Wer hat recht?», sondern «Was siehst du deutlich, das ich nicht sehe?»",
          },
          {
            art: "merksatz",
            text: "Dieselbe Welt, von unendlich vielen Orten aus gesehen, und von jedem Ort aus nur ein kleiner Teil deutlich. Das ist die Monade.",
          },
        ],
      },
      {
        titel: "Schritt 5: Die Harmonie",
        bloecke: [
          {
            art: "absatz",
            text: "Jetzt bleibt die schwierigste Frage. Wenn keine Monade ein Fenster hat, wie kommt es, dass alle dieselbe Welt spiegeln? Wie passt mein Zahnschmerz zu dem Zahn, den die Zahnärztin sieht? Leibniz' Antwort: Gott hat alle Monaden von Anfang an aufeinander abgestimmt, wie ein Uhrmacher, der zwei Uhren so baut, dass sie für immer gleich gehen, ohne einander je zu berühren. Er nennt das die prästabilierte Harmonie, die im Voraus eingerichtete Übereinstimmung.",
          },
          {
            art: "zitat",
            text: "Die Seele folgt ihren eigenen Gesetzen und der Körper den seinen. Sie treffen sich kraft der prästabilierten Harmonie aller Substanzen, denn sie sind alle Darstellungen desselben Universums.",
            ref: "Monadologie §78",
          },
          {
            art: "beispiel",
            situation: "Die Erwartung, dass das Leben «aufgeht»: dass der richtige Beruf, der richtige Mensch, der richtige Moment schon vorgesehen sind.",
            anders:
              "Das ist Leibniz' Harmonie im Alltag. Sie beruhigt, solange man an den Uhrmacher glaubt. Fällt er weg, bleibt die Frage: Wer stimmt dann ab? Und die Antwort der Späteren wird sein: niemand im Voraus, sondern wir, laufend, mit Arbeit.",
          },
        ],
      },
      {
        titel: "Wo das Bild scheitert, und was bleibt",
        bloecke: [
          {
            art: "absatz",
            text: "Das Bild scheitert an Schritt 5. Die Harmonie braucht einen Gott, der rechnet und synchronisiert; Leibniz träumt sogar davon, Streit durch Rechnen zu beenden («Calculemus!», lasst uns rechnen). 1755 zerstört ein Erdbeben Lissabon, Zehntausende sterben, und Voltaire verspottet die «beste aller möglichen Welten». Spätestens seit dann nimmt kaum jemand den Uhrmacher noch als Erklärung. Ohne ihn aber bleibt eine Welt aus geschlossenen Standpunkten, die sich nicht von selbst abstimmen.",
          },
          {
            art: "absatz",
            text: "Was bleibt, ist mehr, als man denkt. Erstens: Die Welt besteht aus Standpunkten, nicht aus Dingen, und ich bin einer davon. Zweitens: Niemand sieht alles, und niemand sieht nichts; jede Perspektive enthält die ganze Welt, verworren. Drittens: Die Monade ist kein Ich, das die Welt gestaltet, sondern ein Ort, an dem die Welt sich spiegelt. Das ist das zweite Bild aus Kapitel 1, dreihundert Jahre vor Latour. Und viertens die offene Frage, die alle Späteren beschäftigt: Wenn niemand im Voraus abstimmt, wie kommen die Standpunkte dann zusammen? Deleuze antwortet: durch Falten. Derrida: durch Spuren. Latour: durch Verbindungen. Sloterdijk: durch geteilte Wände.",
          },
          {
            art: "bild",
            metId: 435888,
            warum:
              "Jean Siméon Chardin, Seifenblasen, um 1733/34. Zwanzig Jahre nach Leibniz' Tod: eine Blase, zerbrechlich und für einen Moment eine eigene Welt. Sloterdijk wird die Monade später genau so lesen, als Blase, die schützt und nie allein ist.",
          },
          {
            art: "merksatz",
            text: "Leibniz hat ein Bild gebaut, das nur mit einem Uhrmacher funktioniert. Ohne ihn bleibt die Frage, die seither alle beschäftigt: Wie kommen Standpunkte zusammen, die keine Fenster haben?",
          },
          {
            art: "frage",
            text: "Welcher der fünf Schritte leuchtet dir am meisten ein, welcher am wenigsten? Warum?",
          },
          {
            art: "frage",
            text: "Gibt es in deinem Leben einen «Uhrmacher», auf den du dich verlässt, dass am Ende alles zusammenpasst?",
          },
        ],
      },
    ],
  },
  /* ================================================================ */
  {
    slug: "warum-die-monade",
    nummer: 4,
    titel: "Warum die Monade?",
    untertitel: "Barock, Neo-Barock und unsere Zeit",
    minuten: 14,
    worum: [
      "Fünf Gründe, warum dieser Lehrgang bei einem Bild beginnt, das gescheitert ist.",
      "Wie Gilles Deleuze die Monade im Barock wiederfindet: die Falte, das Haus mit zwei Stockwerken, die Bühne.",
      "Die These, dass der Barock unserer Zeit näher ist als die Moderne dazwischen, und was an ihr stimmt und was nicht.",
    ],
    abschnitte: [
      {
        titel: "Fünf Gründe",
        bloecke: [
          {
            art: "absatz",
            text: "Man könnte einwenden: Warum bei Leibniz beginnen, wenn sein System nicht funktioniert? Weil die Monade nicht trotz ihres Scheiterns der richtige Anfang ist, sondern wegen ihm. Fünf Gründe.",
          },
          {
            art: "liste",
            punkte: [
              "Die Monade ist die erste Philosophie ohne Mitte. Nach Kopernikus gibt es keinen bevorzugten Ort mehr, von dem aus die Welt gesehen wird. Leibniz macht daraus ein Prinzip: Jeder Standpunkt ist ein Zentrum, und darum ist es keiner.",
              "Die Monade ist kein Ich. Sie gestaltet die Welt nicht von aussen, sie ist ein Ort, an dem die Welt sich spiegelt und faltet. Das ist das zweite Bild aus Kapitel 1, dreihundert Jahre vor Latour.",
              "Sie ist in einer Krise entstanden, die uns bekannt vorkommt: Streit um die Wahrheit, Verlust der Mitte, Instrumente, die Unendlichkeiten zeigen, Ordnungen, die alles auf einen Punkt richten wollen (Kapitel 2).",
              "Sie ist produktiv gescheitert. Der Uhrmacher ist weg, die Frage bleibt. Jede Antwort in Teil II füllt dieselbe Lücke: mit Falten, Spuren, Fenstern oder geteilten Wänden. Die Monade macht die Antworten vergleichbar.",
              "Sie ist anschaulich. Die Stadt von verschiedenen Seiten, die Blase ohne Fenster, die Uhren: Bilder, die man aus dem Alltag kennt.",
            ],
          },
          {
            art: "merksatz",
            text: "Die Monade ist das Scharnier: der letzte Versuch, eine Welt ohne Mitte als eine zu denken, und der erste Begriff für eine Welt, die aus Standpunkten besteht.",
          },
        ],
      },
      {
        titel: "Deleuze findet die Monade im Barock",
        bloecke: [
          {
            art: "absatz",
            text: "1988 erscheint «Die Falte. Leibniz und der Barock» von Gilles Deleuze. Deleuze liest Leibniz nicht als Logiker, sondern als Philosophen einer Epoche, und die Epoche nicht als Stil, sondern als Tätigkeit: Der Barock ist für ihn keine Essenz, sondern eine Operation. Er produziert unablässig Falten, bis ins Unendliche. Ein Vorhang, eine Wolke, ein Kleid, Marmor, der wie Stoff fällt: Überall wird eine Fläche so gebogen, dass sie ein Innen bekommt, ohne dass ein Fenster nötig wäre.",
          },
          {
            art: "bild",
            metId: 206399,
            warum:
              "Gian Lorenzo Bernini, mit seinem Vater Pietro: Bacchanal, ein von Kindern geneckter Faun, um 1616/17. Bernini ist etwa achtzehn. Der Marmor tut, was Marmor nicht kann: Er faltet sich, windet sich, hat Innen und Aussen. Deleuzes Beispiele für die Falte stammen aus dieser Kunst, unter anderem Berninis Verzückung der heiligen Theresa, bei der die Figur fast ganz in Faltung aufgeht.",
          },
          {
            art: "begriff",
            wort: "Die Falte",
            text: "Deleuzes Grundbegriff für Leibniz und den Barock: Das Innen entsteht, indem das Aussen eingefaltet wird. Eine gefaltete Fläche braucht kein Fenster, um ein Inneres zu haben. Die Monade ist eine solche Falte.",
          },
          {
            art: "absatz",
            text: "Deleuzes zweites Bild ist das barocke Haus mit zwei Stockwerken. Unten die Materie mit ihren Falten und mit Fenstern: die Sinne, der Körper. Oben eine Kammer ohne Fenster, deren Wände mit Falten bespannt sind: die Seele, die Monade. Was unten geschieht, lässt oben die Falten schwingen, ohne dass etwas hindurchgeht. So löst Deleuze, was bei Leibniz ein Rätsel blieb: Wie kann etwas ohne Fenster die ganze Welt enthalten? Indem es gefaltet ist.",
          },
          {
            art: "absatz",
            text: "Und er sieht den Barock nicht nur um 1650. Er findet die Falte bei Mallarmé und in Boulez' Musik, in den gefalteten Leinwänden von Simon Hantaï, in moderner Architektur. Der Barock ist für ihn eine Möglichkeit, die wiederkehrt, immer dann, wenn eine Welt ihre Mitte verliert und trotzdem zusammenhalten soll.",
          },
        ],
      },
      {
        titel: "Was der Barock spürt: Das Sehen wird unsicher",
        bloecke: [
          {
            art: "absatz",
            text: "Warum gerade der Barock? Weil er die Krise, die Kapitel 2 beschrieben hat, nicht nur erlebt, sondern ausstellt. Die Kunst dieser Zeit spielt unablässig mit dem, was man sieht und was man zu sehen glaubt. Drei Beispiele.",
          },
          {
            art: "bild",
            metId: 393576,
            ersatz: [393007],
            warum:
              "Hans Troschel nach Simon Vouet, Satyrn bewundern die Anamorphose eines Elefanten, Titelblatt zu Nicerons «La Perspective curieuse», 1652. Auf dem Boden ein verzerrtes, unlesbares Gebilde; erst im zylindrischen Spiegel wird ein Elefant daraus. Die Anamorphose ist das barocke Bild schlechthin: Was man sieht, hängt davon ab, wo man steht und welches Instrument man benutzt.",
          },
          {
            art: "bild",
            metId: 838177,
            ersatz: [436347],
            warum:
              "Unbekannter Maler, Trompe-l'œil einer Radierung von Ferdinand Bol, um 1675. Ein gemaltes Blatt, mit gemaltem Siegelwachs auf ein gemaltes Brett geheftet, das sich scheinbar dem Betrachter entgegenrollt. Das Bild zeigt nichts als die Täuschung selbst und die Frage, was dann noch «echt» heisst.",
          },
          {
            art: "bild",
            metId: 341372,
            ersatz: [377854],
            warum:
              "Umkreis des Ferdinando Galli Bibiena, Bühnenentwurf mit Hof und Triumphbogen, um 1700. Die Bibiena bauen für die Höfe Europas Bühnen, die tiefer wirken als das Theater, in dem sie stehen. Theatrum mundi: Die Welt ist eine Bühne, und hinter der Kulisse steht die nächste Kulisse.",
          },
          {
            art: "begriff",
            wort: "Theatrum mundi",
            text: "Die Welt als Theater: ein Lieblingsgedanke des Barock, von Shakespeare («All the world's a stage») bis Calderón («Das Leben ein Traum», 1635). Jeder spielt eine Rolle, niemand hat sie sich ausgesucht, und ob hinter der Bühne etwas ist, bleibt offen.",
          },
          {
            art: "absatz",
            text: "Die Philosophin Christine Buci-Glucksmann hat das «die Verrücktheit des Sehens» genannt: Der barocke Blick weiss, dass er nie das Ganze sieht, nur Ausschnitte, Spiegelungen, Perspektiven. Das ist genau Leibniz' Monade, in Kunst übersetzt: dieselbe Welt, von jedem Ort aus anders, und von keinem Ort aus ganz.",
          },
        ],
      },
      {
        titel: "War der Barock schon postmodern?",
        bloecke: [
          {
            art: "absatz",
            text: "Die Frage klingt gewagt, ist aber ernst gemeint worden. Walter Benjamin fand 1928 im barocken Trauerspiel die Allegorie und die Ruine: eine Welt, in der die Dinge nicht mehr von selbst bedeuten, sondern Bedeutung ihnen zugeschrieben wird, mit Melancholie. 1980 definierte der Kunstkritiker Craig Owens die postmoderne Kunst genau über diese barocke Allegorie: Zitat, Collage, Aneignung. Der Semiotiker Omar Calabrese nannte unsere Zeit 1987 «das neobarocke Zeitalter»: Lust an Wiederholung mit kleinen Variationen, an Überfluss, Fragment und Virtuosität, von der Fernsehserie bis zur Wissenschaft.",
          },
          {
            art: "liste",
            punkte: [
              "Verlust der Mitte und Vervielfachung der Perspektiven: damals Anamorphose und Trompe-l'œil, heute Bilder, denen man nicht traut.",
              "Theatrum mundi: damals der Hofmann mit seiner Rolle, heute das Profil, das man pflegt.",
              "Allegorie und Fragment: damals Ruine und Sinnbild, heute Zitat, Remix, Meme.",
              "Erste Medienkultur: damals Druckgrafik in Serie, Jesuitentheater, Kirchen als Gesamtspektakel; heute Serien, Franchises, Dauerreiz.",
              "Erster globaler Stil: Barock in Lima, Goa, Manila, Peking; heute die Mischformen der Globalisierung.",
              "Unendlichkeiten: damals Infinitesimalrechnung und Mikroskop, heute Datenmengen, die niemand überblickt.",
              "Das Selbst als Rolle: Gracián schreibt 1647 ein Handbuch der Verstellung, Montaigne nennt den Menschen «wogend und vielfältig»; heute die Frage, wer man ohne seine Auftritte ist.",
            ],
          },
          {
            art: "absatz",
            text: "Und doch stimmt die Gleichung nicht ganz. Erstens liegt der Barock vor der Aufklärung; «postmodern» setzt die Moderne voraus. Zweitens war die barocke Antwort das Gegenteil der postmodernen: Versailles, Gegenreformation, Leibniz' Harmonie sind grosse Ordnungen, grosse Erzählungen. Jean-François Lyotard hat die Postmoderne 1979 gerade als Unglauben gegenüber den grossen Erzählungen bestimmt. Deleuze trennt darum selbst: Der Barock rettet die Harmonie noch, der Neo-Barock lässt die Dissonanz stehen.",
          },
          {
            art: "absatz",
            text: "Lyotard selbst liefert aber den Ausweg. Das Postmoderne, schreibt er sinngemäss, sei nicht das Ende des Modernen, sondern das Moderne im Zustand seines Entstehens, und dieser Zustand sei beständig. Dann ist der Barock die Moderne im Entstehen: der Moment, in dem die Krise schon da ist und die Antwort noch nicht erstarrt.",
          },
          {
            art: "merksatz",
            text: "Der Barock ist postmodern in seiner Lage und vormodern in seiner Lösung. Er spürt die Welt ohne Mitte und antwortet mit dem grössten Versuch einer Gesamtordnung, den es je gab.",
          },
          {
            art: "begriff",
            wort: "Postmoderne",
            text: "Sammelname für Denkweisen seit etwa 1970, die der Moderne nicht mehr trauen: keinem Fortschritt, der alle mitnimmt, keiner Vernunft, die für alle spricht, keiner grossen Erzählung. Dafür Vielheit, Perspektiven, Zitate. Der Name ist umstritten; viele der hier versammelten Denker haben ihn für sich abgelehnt.",
          },
        ],
      },
      {
        titel: "Neo-Barock: das Unvereinbare in derselben Welt",
        bloecke: [
          {
            art: "absatz",
            text: "Deleuzes Wort für unsere Zeit ist Neo-Barock. Der Unterschied zu Leibniz liegt in einem einzigen Punkt. Leibniz verteilt alles, was sich widerspricht, auf getrennte mögliche Welten; Gott wählt die beste, und in ihr passt alles zusammen. Im Neo-Barock gibt es diese Verteilung nicht mehr: Das Unvereinbare lebt in derselben Welt.",
          },
          {
            art: "absatz",
            text: "Deleuzes Beispiel ist eine Erzählung von Jorge Luis Borges, «Der Garten der Pfade, die sich verzweigen» (1941). Darin gibt es ein Buch, in dem alle möglichen Fortsetzungen einer Geschichte gleichzeitig wahr sind: Der Held stirbt, der Held überlebt, der Held wird zum Verräter, alles zugleich. Leibniz hätte das nie zugelassen. Borges tut es, und Deleuze sagt: So ist unsere Welt. Nicht ein Kosmos, sondern ein «Chaosmos». Die Harmonie wird nicht abgeschafft, aber sie hat keinen Uhrmacher mehr; sie muss aus den Dissonanzen selbst entstehen.",
          },
          {
            art: "bild",
            metId: 344561,
            ersatz: [387871],
            warum:
              "Sébastien Leclerc, Labyrinte de Versailles, 1677, mit Versen von Isaac de Benserade und einem Text von Charles Perrault. Das Labyrinth im Garten des Sonnenkönigs: ein geordneter Irrgarten mit 39 Brunnen nach Äsops Fabeln. Der Barock baut das Labyrinth, Borges lässt es sich verzweigen.",
          },
          {
            art: "bild",
            metId: 888078,
            warum:
              "Miguel González zugeschrieben, Anbetung der Könige, Mexiko-Stadt, um 1695–1700. Öl auf Holz, eingelegt mit Perlmutt und Gold: eine Technik, die Werkstätten in Mexiko aus asiatischen Lackarbeiten entwickelten, für ein europäisches Bildthema. Der Barock ist der erste Stil, der um die ganze Erde geht und sich dabei überall verwandelt. Der kubanische Schriftsteller Severo Sarduy nannte das 1974 den «Neobarroco» Lateinamerikas.",
          },
          {
            art: "absatz",
            text: "Bruno Latour würde hier einwenden: Die Moderne hat behauptet, Natur und Gesellschaft, Fakten und Werte sauber zu trennen, und hat dabei immer Mischwesen produziert. «Wir sind nie modern gewesen», heisst sein Buch von 1991. Von da aus gesehen ist der Barock die Zeit vor der grossen Säuberung, in der die Mischungen noch sichtbar waren, und der Neo-Barock die Zeit, in der sie es wieder sind.",
          },
        ],
      },
      {
        titel: "Die letzte Kugel",
        bloecke: [
          {
            art: "absatz",
            text: "Peter Sloterdijk erzählt in «Globen» (1999), dem zweiten Band seiner Sphären-Trilogie, die Geschichte der einen grossen Kugel: des Kosmos, der alles umschliesst, von den Griechen über das Christentum bis zu den Globen auf den Tischen der Fürsten. Das Kapitel zur Globalisierung durch Schiffe, Karten und Kapital heisst «Die letzte Kugel». Der Barock mit seinen Himmelsgloben, Spiegelsälen und Sonnenkönigen ist der Moment, in dem die Kugel am prächtigsten ist, kurz bevor sie zerbricht. Was danach kommt, nennt Sloterdijk Schäume: viele kleine Blasen, die Wände teilen. Ob er den Barock selbst so beschreibt, konnte ich nicht prüfen; die Lesart ist meine.",
          },
          {
            art: "bild",
            metId: 699672,
            ersatz: [387871],
            warum:
              "Sébastien Leclerc, Blick in die Spiegelgalerie von Versailles, 1684. Siebzehn Fenster, siebzehn Spiegel: Der Saal verdoppelt den Garten und den Himmel und stellt den König in die Mitte von allem. Die letzte Kugel, aus Glas.",
          },
          {
            art: "merksatz",
            text: "Leibniz' Harmonie, Versailles' Spiegelsaal und die Kugel auf dem Tisch sind dasselbe Bild: eine Welt, die von einem Punkt aus ganz ist. Wir leben in dem, was davon übrig ist, und das ist nicht nichts.",
          },
        ],
      },
      {
        titel: "Im Leben",
        bloecke: [
          {
            art: "beispiel",
            situation: "Dein Profil ist eine Bühne. Du weisst es, und es ist dir manchmal peinlich.",
            anders:
              "Der Barock wusste das auch; Gracián schrieb 1647 ein Handbuch dafür. Nicht die Bühne ist das Problem, sondern der Glaube, dahinter sei nichts, oder alles. Frag: Für wen spiele ich, wer spielt mit mir, und wo brauche ich keine Bühne?",
          },
          {
            art: "beispiel",
            situation: "Du schaust die zwölfte Staffel, obwohl du längst weisst, wie es geht.",
            anders:
              "Das ist Neo-Barock: Lust an der Wiederholung mit kleiner Variation (Calabrese). Kein Grund zur Scham, aber ein Grund, es zu bemerken: Wo suche ich Wiederholung, und wo suche ich etwas, das ich noch nicht kenne?",
          },
          {
            art: "beispiel",
            situation: "Zwei Freunde streiten über ein Thema; jeder hat seine Quellen, jeder lebt in «seiner Welt».",
            anders:
              "Leibniz hätte die beiden auf zwei mögliche Welten verteilt. Im Neo-Barock leben beide in derselben. Die Frage ist darum nicht, wer die wahre Welt hat, sondern wie zwei unvereinbare Sichten in einer Welt nebeneinander bestehen können, ohne dass eine die andere auslöscht.",
          },
          {
            art: "beispiel",
            situation: "Eine Nachricht ergibt nur Sinn, wenn man sie von einem bestimmten Punkt aus liest; von einem anderen wirkt sie verzerrt.",
            anders:
              "Das ist eine Anamorphose. Frag nicht nur, was sie zeigt, sondern wo man stehen muss, damit sie etwas zeigt, und wer dich dorthin gestellt hat.",
          },
          {
            art: "frage",
            text: "Wo in deinem Alltag ist etwas barock: übervoll, inszeniert, gefaltet, ohne Mitte? Und stört dich das, oder trägt es dich?",
          },
          {
            art: "frage",
            text: "Leibniz baut die letzte Kugel, Borges lässt den Garten sich verzweigen. Welches Bild beschreibt deine Woche besser?",
          },
          {
            art: "absatz",
            text: "Damit ist der Anfang gemacht. Die Monade steht, ihre Welt steht, und ihr Scheitern ist verstanden. Was jetzt kommt, sind die Antworten: Wie lebt man in der Welt ohne Uhrmacher? Deleuze sagt: falten. Derrida: Spuren lesen. Latour: verbinden. Sloterdijk: Wände teilen. Teil II.",
          },
        ],
      },
    ],
  },
];

export function kapitelNachSlug(slug: string): Kapitel | undefined {
  return KAPITEL.find((k) => k.slug === slug);
}

export type BildBlock = Extract<Block, { art: "bild" }>;

/** Alle Bild-Blöcke eines Kapitels (oder aller Kapitel) */
export function bildBloecke(kapitel: Kapitel[] = KAPITEL): BildBlock[] {
  const out: BildBlock[] = [];
  for (const k of kapitel) for (const a of k.abschnitte) for (const b of a.bloecke) if (b.art === "bild") out.push(b);
  return out;
}

/** Kandidaten eines Bild-Blocks: das Werk, dann die Ersatzabzüge */
export function kandidaten(b: BildBlock): number[] {
  return [b.metId, ...(b.ersatz ?? [])];
}

/** Alle Met-Nummern, die ein Kapitel laden muss */
export function bilderVon(k: Kapitel): number[] {
  return bildBloecke([k]).flatMap(kandidaten);
}
