type OrgNode = {
  title: string;
  label: string;
  description: string;
  accent: "emerald" | "warm";
};

const chairNode: OrgNode = {
  title: "Presidente",
  label: "Coordinamento istituzionale",
  description: "Presidia l'indirizzo associativo, rappresenta l'ente e assicura continuita tra governance, servizi e territorio.",
  accent: "warm",
};

const deputyNode: OrgNode = {
  title: "Vicepresidente",
  label: "Supporto esecutivo",
  description: "Affianca la presidenza, facilita il raccordo operativo e garantisce presidio nelle attivita di rappresentanza e continuita.",
  accent: "emerald",
};

const bodyNodes: OrgNode[] = [
  {
    title: "Consiglio direttivo",
    label: "Indirizzo e decisioni",
    description: "Definisce le priorita annuali, supervisiona l'organizzazione e coordina le principali scelte di gestione.",
    accent: "emerald",
  },
  {
    title: "Organo di controllo",
    label: "Vigilanza",
    description: "Monitora correttezza gestionale, adeguatezza organizzativa e coerenza dei processi rispetto agli obblighi dell'ente.",
    accent: "emerald",
  },
  {
    title: "Revisore legale",
    label: "Verifica contabile",
    description: "Presidia la lettura economico-contabile e rafforza la trasparenza sui documenti di rendicontazione e bilancio.",
    accent: "warm",
  },
];

function nodePalette(accent: OrgNode["accent"]) {
  if (accent === "warm") {
    return {
      border: "border-orange-200",
      badge: "bg-orange-100 text-site-warm-strong",
      glow: "from-orange-200/50 via-white to-transparent",
    };
  }

  return {
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-site-accent-strong",
    glow: "from-emerald-200/50 via-white to-transparent",
  };
}

function OrgNodeCard({ node, priority = false }: { node: OrgNode; priority?: boolean }) {
  const palette = nodePalette(node.accent);

  return (
    <article
      className={[
        "relative overflow-hidden rounded-[1.75rem] border bg-white/95 p-5 shadow-[0_24px_34px_-26px_rgba(19,81,44,0.32)] backdrop-blur",
        palette.border,
        priority ? "md:p-6" : "",
      ].join(" ")}
    >
      <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b ${palette.glow}`} />
      <p className={`relative inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${palette.badge}`}>
        {node.label}
      </p>
      <h3 className="relative mt-4 text-2xl font-semibold text-site-ink">{node.title}</h3>
      <p className="relative mt-3 text-sm leading-6 text-site-muted">{node.description}</p>
    </article>
  );
}

export function OrganiSocialiChart() {
  return (
    <section className="rounded-[2rem] border border-emerald-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(238,247,239,0.92))] p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Schema grafico</p>
        <h2 className="mt-3 text-3xl font-semibold text-site-ink">Organigramma istituzionale 2026</h2>
        <p className="mt-3 text-sm leading-6 text-site-muted">
          Visualizzazione sintetica delle funzioni indicate nel documento pubblico. Lo schema evidenzia rapporti di presidio e controllo senza
          sostituire il documento ufficiale, che resta la fonte da consultare per formulazioni complete e aggiornamenti formali.
        </p>
      </div>

      <div className="mt-8 space-y-5 md:hidden">
        <OrgNodeCard node={chairNode} priority />
        <div className="mx-auto h-10 w-px bg-emerald-200" />
        <OrgNodeCard node={deputyNode} />
        {bodyNodes.map((node) => (
          <div key={node.title}>
            <div className="mx-auto h-8 w-px bg-emerald-200" />
            <OrgNodeCard node={node} />
          </div>
        ))}
      </div>

      <div className="relative mt-10 hidden md:block">
        <div className="mx-auto max-w-md">
          <OrgNodeCard node={chairNode} priority />
        </div>

        <div className="mx-auto h-12 w-px bg-emerald-200" />

        <div className="mx-auto max-w-md">
          <OrgNodeCard node={deputyNode} />
        </div>

        <div className="relative mx-auto mt-8 max-w-6xl pt-10">
          <div aria-hidden="true" className="absolute left-1/2 top-0 h-10 w-px -translate-x-1/2 bg-emerald-200" />
          <div aria-hidden="true" className="absolute left-[16.66%] right-[16.66%] top-10 h-px bg-emerald-200" />

          <div className="grid gap-5 lg:grid-cols-3">
            {bodyNodes.map((node) => (
              <div key={node.title} className="relative pt-8">
                <div aria-hidden="true" className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-emerald-200" />
                <OrgNodeCard node={node} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
