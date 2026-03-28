import Link from "next/link";

type AdminDemoNoticeProps = {
  title: string;
  description: string;
};

const previewCapabilities = [
  "Dashboard editoriale e gestione contenuti",
  "Workflow pubblicazione news e FAQ",
  "Accessi protetti con ruoli e sessioni",
];

export function AdminDemoNotice({ title, description }: AdminDemoNoticeProps) {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">Area interna non operativa</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-300">{description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {previewCapabilities.map((capability) => (
          <article key={capability} className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
            <p className="text-sm text-slate-200">{capability}</p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-100">
        Questa versione GitHub Pages mostra solo il perimetro informativo. CMS, autenticazione, sessioni, API e operazioni CRUD restano
        demandati all'implementazione applicativa finale.
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/" className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-300">
          Torna al sito pubblico
        </Link>
        <Link
          href="/area-riservata"
          className="rounded-full border border-slate-500 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-800"
        >
          Vedi il perimetro funzionale
        </Link>
      </div>
    </section>
  );
}
