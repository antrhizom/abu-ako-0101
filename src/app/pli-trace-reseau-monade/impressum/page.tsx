import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { KUNST, ladeWerke, type Kunstwerk } from "@/lib/kunst";
import { KAPITEL, bildBloecke, kandidaten } from "@/lib/lehrgang";
import { KABINETT, kabinettIds } from "@/lib/kabinett";
import { cormorant } from "../schrift";
import { standort } from "../standort";

export const metadata: Metadata = {
  title: "Impressum · pli · trace · réseau · monade",
  description: "Verantwortung, Bildnachweise, Rechte und Datenschutz.",
};

export const viewport: Viewport = {
  themeColor: "#f1ece3",
};

/**
 * Verantwortliche Person oder Stelle. Bitte ergänzen: Name, Institution,
 * Postadresse, E-Mail. Solange die Liste leer ist, erscheint ein Hinweis.
 */
const VERANTWORTLICH: string[] = [];

const LINK = "underline decoration-black/20 underline-offset-2 hover:decoration-black/60";

function Abschnitt({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#857d71]">{titel}</h2>
      <div className="mt-3 space-y-3 text-[1.05rem] leading-[1.65] text-[#3a352f]">{children}</div>
    </section>
  );
}

function Nachweis({ metId, bezug, k }: { metId: number; bezug: string; k: Kunstwerk | undefined }) {
  return (
    <li className="border-l border-black/10 pl-4">
      {k ? (
        <>
          <div>
            {k.kuenstler && <span>{k.kuenstler}, </span>}
            <em>{k.titel}</em>
            {k.datum && <span>, {k.datum}</span>}
          </div>
          <div className="text-[0.88rem] text-[#7a7368]">
            The Metropolitan Museum of Art{k.credit ? `, ${k.credit}` : ""}. Gemeinfrei, CC0.{" "}
            <a href={k.url} target="_blank" rel="noopener noreferrer" className={LINK}>
              Zum Werk
            </a>
          </div>
        </>
      ) : (
        <div className="text-[0.95rem] text-[#7a7368]">
          The Metropolitan Museum of Art, Objekt {metId} (Angaben zurzeit nicht abrufbar, Bild wird nicht angezeigt).{" "}
          <a
            href={`https://www.metmuseum.org/art/collection/search/${metId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            Zum Werk
          </a>
        </div>
      )}
      <div className="mt-1 text-[0.88rem] italic text-[#857d71]">{bezug}</div>
    </li>
  );
}

export default async function Impressum() {
  const { basis } = await standort();
  const bloecke = bildBloecke();
  const werke = await ladeWerke([...KUNST.map((e) => e.metId), ...bloecke.flatMap(kandidaten), ...kabinettIds()]);
  const kabinett = KABINETT.map((b) => {
    const id = [b.metId, ...(b.ersatz ?? [])].find((c) => werke.has(c)) ?? b.metId;
    return { metId: id, bezug: `Startseite, Frage: «${b.frage}»`, k: werke.get(id) };
  });
  // Pro Bild-Block das Werk, das tatsächlich gezeigt wird, mit Kapitelangabe
  const lehrgang = KAPITEL.flatMap((k) =>
    bildBloecke([k]).map((b) => {
      const id = kandidaten(b).find((c) => werke.has(c)) ?? b.metId;
      return { metId: id, bezug: `Kapitel ${k.nummer}: ${b.warum}`, k: werke.get(id) };
    })
  );

  return (
    <main
      className={`${cormorant.variable} font-monade min-h-screen bg-[#f1ece3] px-6 pb-24 pt-10 text-[#2b2723] sm:px-10`}
    >
      <div className="mx-auto max-w-[40rem]">
        <Link
          href={`${basis}/`}
          className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#857d71] transition-colors hover:text-[#2b2723]"
        >
          ← zum Kabinett
        </Link>

        <h1 className="mt-10 text-[2.6rem] font-light leading-tight text-[#1f1c19]">Impressum</h1>
        <p className="mt-2 text-[1.1rem] italic text-[#7a7368]">pli · trace · réseau · monade</p>

        <Abschnitt titel="Verantwortlich">
          {VERANTWORTLICH.length > 0 ? (
            VERANTWORTLICH.map((z) => <p key={z}>{z}</p>)
          ) : (
            <p className="italic text-[#7a7368]">Die Kontaktangaben werden ergänzt.</p>
          )}
        </Abschnitt>

        <Abschnitt titel="Zweck">
          <p>
            Ein nichtkommerzielles Bildungsangebot. Ein Lehrgang über Philosophien, die die Welt nicht als Werk
            einzelner Ichs verstehen, sondern als Zusammenspiel vieler: Leibniz, Deleuze, Derrida, Latour, Foucault,
            Tarde, Sloterdijk und andere. Es gibt keine Werbung, keine Anmeldung und keine Bezahlfunktion.
          </p>
        </Abschnitt>

        <Abschnitt titel="Bildnachweise">
          <p>
            Alle Bilder stammen aus der Open-Access-Sammlung des Metropolitan Museum of Art, New York. Es sind Werke,
            deren Urheber seit weit über 70 Jahren verstorben sind; ihr urheberrechtlicher Schutz ist abgelaufen. Das
            Museum stellt die Fotografien dieser Werke unter{" "}
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/deed.de"
              target="_blank"
              rel="noopener noreferrer"
              className={LINK}
            >
              Creative Commons Zero (CC0)
            </a>{" "}
            zur Verfügung und verzichtet damit auch auf allfällige Rechte an den Aufnahmen selbst. Jede Nutzung ist
            erlaubt, auch ohne Namensnennung. Wir nennen die Werke trotzdem, aus Respekt und zur Nachvollziehbarkeit.
          </p>
          <p>
            Beim Aufruf prüft die Seite über die offizielle Schnittstelle des Museums, ob ein Werk dort als gemeinfrei
            geführt wird. Nur dann wird es angezeigt.
          </p>
          <h3 className="pt-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#9a9286]">Im Kabinett (Startseite)</h3>
          <ul className="space-y-4">
            {kabinett.map((e) => (
              <Nachweis key={"k" + e.metId} metId={e.metId} bezug={e.bezug} k={e.k} />
            ))}
          </ul>
          <h3 className="pt-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#9a9286]">Im Lehrgang</h3>
          <ul className="space-y-4">
            {lehrgang.map((e) => (
              <Nachweis key={e.metId} metId={e.metId} bezug={e.bezug} k={e.k} />
            ))}
          </ul>
          <h3 className="pt-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#9a9286]">
            Im Raum, als Hintergrund der Monaden
          </h3>
          <ul className="space-y-4">
            {KUNST.map((e) => (
              <Nachweis key={e.metId} metId={e.metId} bezug={e.bezug} k={werke.get(e.metId)} />
            ))}
          </ul>
        </Abschnitt>

        <Abschnitt titel="Texte und Zitate">
          <p>
            Die Zitate aus der Monadologie (1714) von Gottfried Wilhelm Leibniz sind gemeinfrei. Das französische
            Original wird wörtlich wiedergegeben, die deutschen Fassungen sind eigene, sinngemässe Übersetzungen.
          </p>
          <p>
            Die Darstellungen zu Deleuze, Derrida, Latour, Foucault, Tarde, Sloterdijk und Habermas sind eigene
            Zusammenfassungen, ebenso die historischen Kapitel und die Beispiele aus dem Leben. Die Werke dieser
            Autoren sind urheberrechtlich geschützt; sie werden hier nicht abgedruckt, sondern beschrieben und mit
            Quellenangabe nachgewiesen. Wenige kurze Wendungen sind als Zitat gekennzeichnet (Art. 25 URG). Die
            Literaturangaben sind ohne Gewähr; massgeblich sind die Originalausgaben.
          </p>
        </Abschnitt>

        <Abschnitt titel="Schrift">
          <p>
            Cormorant Garamond von Christian Thalmann, lizenziert unter der SIL Open Font License 1.1. Die Schrift wird
            von dieser Seite selbst ausgeliefert; beim Aufruf entsteht keine Verbindung zu Google.
          </p>
        </Abschnitt>

        <Abschnitt titel="Datenschutz">
          <p>
            Die Seite setzt keine Cookies, verwendet kein Tracking und keine Analysewerkzeuge und erhebt keine
            Personendaten über Formulare. Notizen im Raum (Station «Für mich») bleiben ausschliesslich im Browser des
            eigenen Geräts.
          </p>
          <p>
            Sie wird bei Vercel Inc. (USA) betrieben. Beim Aufruf verarbeitet Vercel technisch notwendige Daten wie
            IP-Adresse, Zeitpunkt und aufgerufene Seite, um die Seite auszuliefern und den Betrieb zu sichern. Dabei
            können Daten in den USA bearbeitet werden. Einzelheiten:{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={LINK}>
              Datenschutzerklärung von Vercel
            </a>
            .
          </p>
          <p>
            Die Kunstwerke werden über die eigene Domain ausgeliefert. Ihr Browser baut dafür keine Verbindung zum
            Museum auf.
          </p>
        </Abschnitt>

        <Abschnitt titel="Haftung">
          <p>
            Die Inhalte wurden sorgfältig erstellt; für Richtigkeit, Vollständigkeit und Aktualität wird keine Gewähr
            übernommen. Für die Inhalte verlinkter Seiten sind ausschliesslich deren Betreiber verantwortlich.
          </p>
        </Abschnitt>
      </div>
    </main>
  );
}
