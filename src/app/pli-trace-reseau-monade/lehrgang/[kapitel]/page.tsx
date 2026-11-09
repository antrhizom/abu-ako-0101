import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KAPITEL, kapitelNachSlug, bilderVon, type Block } from "@/lib/lehrgang";
import { ladeWerke, type Kunstwerk } from "@/lib/kunst";
import { cormorant } from "../../schrift";
import { standort } from "../../standort";

type Props = { params: Promise<{ kapitel: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kapitel } = await params;
  const k = kapitelNachSlug(kapitel);
  if (!k) return { title: "Kapitel nicht gefunden" };
  return {
    title: `${k.nummer} · ${k.titel} · pli · trace · réseau · monade`,
    description: k.worum.join(" "),
  };
}

export const viewport: Viewport = {
  themeColor: "#f1ece3",
};

const KLEIN = "font-sans text-[10px] uppercase tracking-[0.2em] text-[#857d71]";

function Bild({ k, warum }: { k: Kunstwerk | undefined; warum: string }) {
  if (!k) {
    // Museumsschnittstelle nicht erreichbar oder Werk nicht gemeinfrei: nur der Text
    return (
      <figure className="my-8 rounded-sm border border-dashed border-black/15 px-4 py-3">
        <figcaption className="text-[0.95rem] leading-[1.5] text-[#6d665c]">{warum}</figcaption>
        <div className={`${KLEIN} mt-2`}>Bild zurzeit nicht abrufbar</div>
      </figure>
    );
  }
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-sm bg-[#e6e0d4]">
        <Image
          src={k.quelle}
          alt={`${k.kuenstler ? k.kuenstler + ", " : ""}${k.titel}`}
          width={1200}
          height={800}
          sizes="(min-width: 768px) 40rem, 100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <figcaption className="mt-3 text-[0.95rem] leading-[1.5] text-[#4a443d]">{warum}</figcaption>
      <div className={`${KLEIN} mt-1.5 normal-case tracking-[0.04em]`}>
        <a href={k.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
          {k.kuenstler ? `${k.kuenstler}, ` : ""}
          {k.titel}
          {k.datum ? ` (${k.datum})` : ""}
        </a>
        . The Met, Open Access, gemeinfrei (CC0).
      </div>
    </figure>
  );
}

function BlockAnsicht({ b, werke }: { b: Block; werke: Map<number, Kunstwerk> }) {
  switch (b.art) {
    case "absatz":
      return <p className="mt-4 text-[1.08rem] leading-[1.65] text-[#3a352f]">{b.text}</p>;
    case "bild":
      return <Bild k={werke.get(b.metId)} warum={b.warum} />;
    case "merksatz":
      return (
        <p className="my-7 border-l-2 border-[#2b2723]/40 pl-4 text-[1.3rem] font-light leading-[1.4] text-[#1f1c19]">
          {b.text}
        </p>
      );
    case "begriff":
      return (
        <div className="my-5 rounded-sm border border-black/10 bg-white/40 px-4 py-3">
          <div className={KLEIN}>Begriff</div>
          <div className="mt-1 text-[1.2rem] italic text-[#1f1c19]">{b.wort}</div>
          <p className="mt-1 text-[0.98rem] leading-[1.55] text-[#4a443d]">{b.text}</p>
        </div>
      );
    case "beispiel":
      return (
        <div className="my-5 rounded-sm border border-black/10 px-4 py-3">
          <div className={KLEIN}>Im Leben</div>
          <p className="mt-1.5 text-[1rem] leading-[1.5] text-[#6d665c]">{b.situation}</p>
          <p className="mt-2 text-[1rem] leading-[1.5] text-[#2b2723]">
            <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#857d71]">anders · </span>
            {b.anders}
          </p>
        </div>
      );
    case "liste":
      return (
        <ul className="mt-4 space-y-2 text-[1.05rem] leading-[1.55] text-[#3a352f]">
          {b.punkte.map((p) => (
            <li key={p} className="flex gap-3">
              <span className="text-[#9a9286]">—</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      );
    case "zeittafel":
      return (
        <dl className="my-6 border-t border-black/10">
          {b.eintraege.map((e) => (
            <div key={e.jahr + e.text} className="flex gap-4 border-b border-black/10 py-2">
              <dt className="w-24 shrink-0 font-sans text-[12px] tracking-[0.06em] text-[#857d71]">{e.jahr}</dt>
              <dd className="text-[1rem] leading-[1.5] text-[#3a352f]">{e.text}</dd>
            </div>
          ))}
        </dl>
      );
    case "frage":
      return (
        <div className="my-5">
          <div className={KLEIN}>Zum Nachdenken</div>
          <p className="mt-1 text-[1.15rem] leading-[1.4] text-[#1f1c19]">{b.text}</p>
          {b.hilfe && <p className="mt-1 text-[0.95rem] italic text-[#857d71]">{b.hilfe}</p>}
        </div>
      );
    case "zitat":
      return (
        <figure className="my-6 border-l border-black/15 pl-4">
          <blockquote className="text-[1.15rem] font-light italic leading-[1.5] text-[#2b2723]/90">
            «{b.text}»
          </blockquote>
          <figcaption className={`${KLEIN} mt-2`}>{b.ref}</figcaption>
        </figure>
      );
  }
}

export default async function KapitelSeite({ params }: Props) {
  const { kapitel } = await params;
  const k = kapitelNachSlug(kapitel);
  if (!k) notFound();
  const { basis } = await standort();
  const werke = await ladeWerke(bilderVon(k));
  const i = KAPITEL.indexOf(k);
  const vorher = KAPITEL[i - 1];
  const nachher = KAPITEL[i + 1];

  return (
    <main
      className={`${cormorant.variable} font-monade min-h-screen bg-[#f1ece3] px-6 pb-24 pt-10 text-[#2b2723] sm:px-10`}
    >
      <article className="mx-auto max-w-[40rem]">
        <nav className="flex items-baseline justify-between gap-4">
          <Link href={`${basis}/`} className={`${KLEIN} transition-colors hover:text-[#1f1c19]`}>
            ← Lehrgang
          </Link>
          <span className={KLEIN}>
            Kapitel {k.nummer} von {KAPITEL.length} · {k.minuten} Min.
          </span>
        </nav>

        <h1 className="mt-10 text-[2.4rem] font-light leading-[1.05] text-[#1f1c19] sm:text-[3rem]">{k.titel}</h1>
        <p className="mt-2 text-[1.2rem] italic text-[#7a7368]">{k.untertitel}</p>

        <div className="mt-8 rounded-sm border border-black/10 bg-white/40 px-5 py-4">
          <div className={KLEIN}>Worum es geht</div>
          <ul className="mt-2 space-y-1.5 text-[1rem] leading-[1.5] text-[#3a352f]">
            {k.worum.map((w) => (
              <li key={w} className="flex gap-2">
                <span className="text-[#9a9286]">·</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>

        {k.abschnitte.map((a, n) => (
          <section key={a.titel} className="mt-12">
            <div className={KLEIN}>
              {k.nummer}.{n + 1}
            </div>
            <h2 className="mt-1 text-[1.75rem] font-light leading-[1.15] text-[#1f1c19]">{a.titel}</h2>
            {a.bloecke.map((b, j) => (
              <BlockAnsicht key={j} b={b} werke={werke} />
            ))}
          </section>
        ))}

        <nav className="mt-16 flex flex-col gap-3 border-t border-black/10 pt-5 sm:flex-row sm:items-baseline sm:justify-between">
          {vorher ? (
            <Link href={`${basis}/lehrgang/${vorher.slug}`} className={`${KLEIN} transition-colors hover:text-[#1f1c19]`}>
              ← {vorher.nummer} · {vorher.titel}
            </Link>
          ) : (
            <Link href={`${basis}/`} className={`${KLEIN} transition-colors hover:text-[#1f1c19]`}>
              ← Übersicht
            </Link>
          )}
          {nachher ? (
            <Link
              href={`${basis}/lehrgang/${nachher.slug}`}
              className="text-right text-[1.2rem] text-[#1f1c19] transition-opacity hover:opacity-70"
            >
              weiter: {nachher.titel} →
            </Link>
          ) : (
            <Link href={`${basis}/raum`} className="text-right text-[1.2rem] text-[#1f1c19] transition-opacity hover:opacity-70">
              jetzt in den Raum →
            </Link>
          )}
        </nav>
        {!nachher && (
          <p className="mt-4 text-[0.95rem] italic text-[#857d71]">
            Teil II, die Antworten (pli, trace, réseau, schaum), folgt als Nächstes.
          </p>
        )}
      </article>
    </main>
  );
}
