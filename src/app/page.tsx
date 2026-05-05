import {
  dimensionen,
  themenDigital,
  matrixSprachmodi,
  matrixKompetenzen,
  matrixAspekte,
} from "@/lib/digitaleKompetenzen";
import FloatingParticles from "@/components/FloatingParticles";
import DimensionCard from "@/components/DimensionCard";
import ThemenIntensitaet from "@/components/ThemenIntensitaet";
import KompetenzMatrix from "@/components/KompetenzMatrix";

export default function Home() {
  return (
    <div className="relative min-h-screen text-white">
      <FloatingParticles />

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-mono text-indigo-300 mb-6 animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse-glow" />
            ABU AKO 0101 · SLP EBA 2030
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-slide-up">
            <span className="gradient-text">Digitale</span>
            <br />
            <span className="text-white">Kompetenzen</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.3s" }}>
            Wie der <strong className="text-white">Schullehrplan ABU EBA</strong> digitale Fähigkeiten in
            <span className="text-amber-300"> Sprachmodi</span>,
            <span className="text-blue-300"> Schlüsselkompetenzen</span> und
            <span className="text-emerald-300"> gesellschaftlichen Inhalten</span> einfordert.
          </p>

          <div className="mt-10 flex justify-center gap-3 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <a
              href="#dimensionen"
              className="rounded-full glass px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Drei Dimensionen entdecken ↓
            </a>
          </div>
        </div>

        {/* Animierte Code-Linien */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 -z-10 opacity-20 font-mono text-xs text-indigo-400 select-none pointer-events-none">
          <pre className="text-center animate-fade-in" style={{ animationDelay: "1s" }}>
{`  01010100 01100101 01100011 01101000 01101110 01101111 01101100 01101111 01100111 01101001 01100101  `}
          </pre>
        </div>
      </section>

      {/* Statistik-Banner */}
      <section className="px-6 mb-16">
        <div className="mx-auto max-w-5xl grid grid-cols-3 gap-3 sm:gap-6">
          {[
            { wert: "8", label: "Themen" },
            { wert: "3", label: "Dimensionen" },
            { wert: "11+", label: "Digitale Anforderungen" },
          ].map((s, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 text-center animate-slide-up"
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            >
              <div className="text-4xl sm:text-5xl font-bold gradient-text mb-1">{s.wert}</div>
              <div className="text-xs sm:text-sm text-zinc-400 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Drei Dimensionen */}
      <section id="dimensionen" className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-slide-up">
              Die drei <span className="gradient-text">Kompetenzdimensionen</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Digitale Kompetenzen sind nicht ein eigenes Thema — sie werden in jeder der drei
              Dimensionen des Lehrplans eingefordert. Klicke auf eine Dimension, um die konkreten
              Anforderungen zu sehen.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {dimensionen.map((dim, i) => (
              <DimensionCard key={dim.id} dim={dim} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Wiederholungs-Matrizen */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-slide-up">
              <span className="gradient-text">Zirkularität</span> & digitale Anforderungen
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Pro Kompetenzdimension siehst du, in welchem Thema ein Bereich eingeführt (R1)
              und wo er wiederholt/vertieft (R2/R3) wird. Zellen mit Farbglühen markieren,
              wo digitale Kompetenzen explizit gefragt sind.
            </p>
          </div>

          <div className="space-y-8">
            <KompetenzMatrix matrix={matrixSprachmodi} />
            <KompetenzMatrix matrix={matrixKompetenzen} />
            <KompetenzMatrix matrix={matrixAspekte} />
          </div>
        </div>
      </section>

      {/* Themen-Intensität */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-slide-up">
              <span className="gradient-text">Digitale Intensität</span> pro Thema
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Wie stark wird in jedem der 8 EBA-Themen mit digitalen Werkzeugen, KI und
              Online-Räumen gearbeitet? Hovere für Details.
            </p>
          </div>

          <ThemenIntensitaet themen={themenDigital} />

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="h-3 w-2 rounded-sm bg-fuchsia-400 animate-pulse-glow" />
              Sehr digital
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-2 rounded-sm bg-indigo-400" />
              Stark digital
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-2 rounded-sm bg-blue-400" />
              Mittel
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-2 rounded-sm bg-zinc-500" />
              Wenig digital
            </span>
          </div>
        </div>
      </section>

      {/* Fokus-Quote */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="glass rounded-3xl p-12 animate-slide-up">
            <div className="text-6xl text-indigo-400/40 mb-4">«</div>
            <p className="text-xl sm:text-2xl text-zinc-200 leading-relaxed font-light italic">
              Digitale Kompetenz ist nicht nur Werkzeug-Bedienung — sie ist
              <span className="gradient-text font-medium"> Kommunikation</span>,
              <span className="gradient-text font-medium"> Reflexion</span> und
              <span className="gradient-text font-medium"> Gestaltung</span> in einer
              vernetzten Welt.
            </p>
          </div>
        </div>
      </section>

      {/* Mini-Connector zu abu-ako */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="glass rounded-3xl p-8 text-center">
            <p className="text-sm text-zinc-400 mb-3">
              Diese Infoseite ist Teil des grösseren Lehrmittels:
            </p>
            <a
              href="https://abu-ako2030.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              ABU AKO 2030 →
            </a>
            <p className="mt-2 text-xs text-zinc-500">
              Die interaktive Lernumgebung mit Ressourcen, Quittungen und Fortschritts-Tracking
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-xs text-zinc-600">
        ABU AKO 0101 · Schullehrplan EBA 2030 · Kanton Zürich
      </footer>
    </div>
  );
}
