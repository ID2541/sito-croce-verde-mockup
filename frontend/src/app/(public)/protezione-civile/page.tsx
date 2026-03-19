import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionImage } from "@/components/media/SectionImage";
import { fetchPageBySlug } from "@/lib/api/pages";
import { placeholderImages } from "@/lib/placeholders";

const units = [
  {
    title: "Squadre territoriali",
    description: "Presidio locale per supporto logistico e interventi coordinati.",
    badge: "Operativo",
    imageSrc: "/images/generated/protezione-fuoristrada.png",
    imageAlt: "Squadre territoriali di protezione civile in azione",
  },
  {
    title: "Modulo idrogeologico",
    description: "Attivazione in scenari meteo critici e tutela aree vulnerabili.",
    badge: "Emergenza",
    imageSrc: "/images/generated/protezione-fuoristrada.png",
    imageAlt: "Intervento idrogeologico con mezzi fuoristrada",
  },
  {
    title: "Unita specialistiche",
    description: "Gruppi dedicati a scenari specifici con equipaggiamento dedicato.",
    badge: "Specialita",
    imageSrc: "/images/generated/protezione-fuoristrada.png",
    imageAlt: "Unita specialistiche di protezione civile",
  },
];

export default async function ProtezioneCivilePage() {
  const page = await fetchPageBySlug("protezione-civile");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Protezione civile"
        description="Sezione dedicata alle attivita operative, mezzi e ambiti di intervento sul territorio."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Protezione civile" },
        ]}
      />

      <SectionImage
        src={placeholderImages.protezioneCivile}
        alt="Placeholder operativo protezione civile"
        ratioClassName="aspect-[21/8]"
      />

      <FeatureGrid title="Aree di intervento" items={units} />

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold">Coordinamento e prontezza</h2>
        <p className="mt-3 text-site-muted">
          {page?.content ??
            "Questa pagina e predisposta per integrare stati operativi, disponibilita mezzi e aggiornamenti emergenziali in tempo reale."}
        </p>
      </section>
    </div>
  );
}
