import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import MonadenWelt from "@/components/MonadenWelt";
import Harmonie from "@/components/Harmonie";

export const metadata: Metadata = {
  title: "pli · trace · réseau · monade",
  description:
    "Leibniz' Monade will eine Welt berechnen und synchronisieren, die sich weder berechnen noch synchronisieren lässt. Falte, Spur und Netzwerk antworten darauf.",
};

export default async function PliTraceReseauMonade() {
  // Unter pli-trace-reseau-monade.vercel.app eigenständig: keine Links zur ABU-Seite
  const host = (await headers()).get("host") ?? "";
  const standalone =
    host.startsWith("pli-trace-reseau-monade") || process.env.NEXT_PUBLIC_SITE === "pli-trace-reseau-monade";

  return (
    <div className="relative min-h-screen text-white">
      {/* Hero */}
      <section className="relative pt-16 pb-8 px-6">
        <div className="mx-auto max-w-6xl text-center">
          {standalone ? (
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-mono text-indigo-300 mb-6">
              <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse-glow" />
              Monaden zum Hineinzoomen
            </div>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-mono text-indigo-300 mb-6 hover:bg-white/10 transition-colors"
            >
              ← ABU AKO 0101
            </Link>
          )}

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-5 animate-slide-up">
            <span className="text-amber-300">pli</span>
            <span className="text-zinc-600"> · </span>
            <span className="text-blue-300">trace</span>
            <span className="text-zinc-600"> · </span>
            <span className="text-emerald-300">réseau</span>
            <span className="text-zinc-600"> · </span>
            <span className="gradient-text">monade</span>
          </h1>

          <p
            className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Leibniz versucht, eine Welt logisch zu ordnen, die sich logisch nicht ordnen lässt.
            Eine Welt kann nicht berechnet und nicht synchronisiert werden.
            Hier sind die Positionen, die darauf antworten — als Monaden, in die man hineingeht.
          </p>
        </div>
      </section>

      {/* Monadenwelt */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-6xl">
          <MonadenWelt />
        </div>
      </section>

      {/* Der Punkt */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 animate-slide-up">
            Der <span className="gradient-text">Punkt</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mb-8">
            Wenn keine Monade ein Fenster hat, wie kommt es, dass alle dieselbe Welt sehen?
            Die Antwort von Leibniz ist das Bild der zwei Uhren: Sie gehen gleich, weil sie von
            Anfang an so gebaut wurden. Nimm den Uhrmacher weg und schau, was passiert.
          </p>

          <Harmonie />

          <div className="mt-10 glass rounded-3xl p-8">
            <p className="text-lg sm:text-xl text-zinc-200 leading-relaxed">
              Leibniz baut mit unglaublicher Genauigkeit ein System, in dem Streit durch Rechnen
              endet und alle Uhren von selbst gleich gehen. Das System hält nur, solange einer
              von aussen rechnet und synchronisiert. Nimmt man diesen Dritten weg, bleibt eine
              Welt aus geschlossenen Standpunkten, die sich nicht aufeinander abstimmen lassen.
            </p>
            <p className="mt-4 text-sm text-zinc-400">
              Voltaire hat das 1759 in <em>Candide</em> verspottet. Deleuze nimmt es ernst: Der
              Barock ist für ihn die Antwort auf eine Krise, in der die alte Ordnung zerfällt,
              und Leibniz rettet sie ein letztes Mal, mit der Harmonie. Heute, im «Neo-Barock»,
              ist diese Rettung nicht mehr möglich. Das Inkompossible lebt in derselben Welt.
            </p>
          </div>
        </div>
      </section>

      {/* Auf einen Blick */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 animate-slide-up">
            Auf einen <span className="gradient-text">Blick</span>
          </h2>

          <div className="glass rounded-3xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-mono uppercase tracking-wider text-zinc-500">
                  <th className="p-4">Leibniz braucht</th>
                  <th className="p-4 text-amber-300">Pli</th>
                  <th className="p-4 text-blue-300">Trace</th>
                  <th className="p-4 text-emerald-300">Réseau</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                {[
                  [
                    "Einen Rechner, der die beste Welt wählt",
                    "Das Ereignis, das zwischen den Standpunkten passiert",
                    "Das Aufschieben: kein Begriff ist je vollständig",
                    "Zentren der Kalkulation, die nur Spuren sammeln",
                  ],
                  [
                    "Eine Harmonie, die alle Uhren gleichstellt",
                    "Dissonanz, die nicht aufgelöst wird",
                    "Nachträglichkeit: Übereinstimmung erst im Rückblick",
                    "Übersetzung: lokal, mit Verzögerung und Verlust",
                  ],
                  [
                    "Monaden ohne Fenster",
                    "Monaden als Falten des Aussen",
                    "Monaden als Spuren, die auf anderes verweisen",
                    "Monaden mit Fenstern (Tarde)",
                  ],
                  [
                    "Eine Welt",
                    "Chaosmos: Inkompossibles in derselben Welt",
                    "Text ohne letzte Lesung",
                    "Eine Welt, die komponiert wird und zerfallen kann",
                  ],
                ].map((zeile, i) => (
                  <tr key={i} className="border-t border-white/5">
                    {zeile.map((z, j) => (
                      <td
                        key={j}
                        className={`p-4 align-top leading-relaxed ${j === 0 ? "text-zinc-400" : ""}`}
                      >
                        {z}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 glass rounded-3xl p-8 text-center">
            <p className="text-xl sm:text-2xl text-zinc-200 leading-relaxed font-light italic">
              Die Monade bleibt. Was geht, ist der Dritte, der rechnet und synchronisiert.
              Zurück bleibt eine Welt, in die man hineinzoomen kann,
              <span className="gradient-text font-medium"> ohne je ans Ende zu kommen</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Für den Unterricht */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="glass rounded-3xl p-8">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-300 mb-3">
              Für den Unterricht
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Ein Lehrplan, eine Kompetenzmatrix, ein Dashboard: Das sind Versuche, Lernende
              zu berechnen und zu synchronisieren. Die Seite zeigt, warum das nie ganz aufgeht,
              und was man stattdessen tun kann: falten (sich anders zu sich verhalten),
              Spuren lesen (nichts ist abgeschlossen), übersetzen (Verbindungen pflegen,
              statt Gleichschritt zu erwarten).
            </p>
            {!standalone && (
              <Link
                href="/"
                className="mt-4 inline-block text-sm gradient-text font-medium hover:opacity-80 transition-opacity"
              >
                Zur Kompetenzmatrix →
              </Link>
            )}
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-xs text-zinc-600">
        pli · trace · réseau · monade{standalone ? "" : " — ABU AKO 0101"}
      </footer>
    </div>
  );
}
