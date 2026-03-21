import Link from "next/link";
import type { FaqSection } from "@/content/faqs";

type FAQCategoryNavProps = {
  sections: FaqSection[];
};

export function FAQCategoryNav({ sections }: FAQCategoryNavProps) {
  return (
    <aside className="lg:sticky lg:top-24">
      <nav aria-label="Categorie FAQ" className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Indice rapido</p>
        <h2 className="mt-2 text-xl font-semibold">Vai subito alla categoria giusta</h2>
        <p className="mt-3 text-sm text-site-muted">
          Ogni gruppo di domande e organizzato per percorso. Usa questi collegamenti per saltare direttamente alla sezione utile.
        </p>

        <ul className="mt-5 grid gap-2">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                href={`#${section.id}`}
                className="link-focus group flex items-center justify-between gap-4 rounded-xl border border-emerald-100 px-4 py-3 text-sm transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="font-semibold text-site-ink">{section.title}</span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-site-accent">
                  {section.items.length}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
