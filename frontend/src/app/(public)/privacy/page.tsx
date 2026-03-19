import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionImage } from "@/components/media/SectionImage";
import { siteConfig } from "@/config/site";
import { placeholderImages } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Informativa sul trattamento dei dati personali.",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Privacy"
        description="Informazioni di base sul trattamento dei dati personali e sui canali di contatto."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />
      <SectionImage src={placeholderImages.legal} alt="Informativa privacy" ratioClassName="aspect-[21/8]" />
      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-5 text-site-muted">
          <p>
            Questa pagina riassume le informazioni essenziali sul trattamento dei dati raccolti tramite moduli, email, telefono e richieste
            inviate attraverso il sito.
          </p>
          <p>
            Titolare del trattamento: <span className="font-semibold text-site-ink">{siteConfig.organizationLegalName}</span>. Recapiti
            principali: <span className="font-semibold text-site-ink">{siteConfig.contactEmail}</span> e{" "}
            <span className="font-semibold text-site-ink">{siteConfig.pecEmail}</span>.
          </p>
          <p>
            I dati vengono trattati per rispondere alle richieste degli utenti, organizzare servizi e prenotazioni, gestire i contatti con i
            cittadini e adempiere agli obblighi amministrativi connessi.
          </p>
          <p>
            Prima della pubblicazione definitiva e necessario integrare questa informativa con basi giuridiche, tempi di conservazione,
            soggetti autorizzati, eventuali responsabili esterni e modalita di esercizio dei diritti dell'interessato.
          </p>
        </div>
      </section>
    </div>
  );
}
