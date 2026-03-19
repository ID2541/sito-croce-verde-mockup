import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionImage } from "@/components/media/SectionImage";
import { placeholderImages } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "Informazioni sull'uso dei cookie e delle tecnologie analoghe.",
};

export default function CookiePolicyPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Cookie policy"
        description="Informazioni sintetiche sull'uso di cookie tecnici e strumenti analoghi."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cookie policy" }]}
      />
      <SectionImage
        src={placeholderImages.legal}
        alt="Informazioni cookie"
        ratioClassName="aspect-[21/8]"
      />
      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm text-site-muted">
        <div className="space-y-4">
          <p>
            Il sito utilizza cookie tecnici strettamente necessari al funzionamento delle sessioni e alla sicurezza di accesso.
          </p>
          <p>
            Eventuali strumenti di misurazione, personalizzazione o contenuti di terze parti dovranno essere documentati in modo puntuale prima della pubblicazione definitiva.
          </p>
          <p>
            Se la tua installazione prevede ulteriori categorie di cookie, completa questa pagina con elenco, finalita, durata e modalita di gestione del consenso.
          </p>
        </div>
      </section>
    </div>
  );
}
