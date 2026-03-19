import { SectionImage } from "@/components/media/SectionImage";

type InfoSectionProps = {
  title: string;
  description: string;
  points: string[];
  sideTitle: string;
  sideText: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function InfoSection({
  title,
  description,
  points,
  sideTitle,
  sideText,
  imageSrc,
  imageAlt,
}: InfoSectionProps) {
  return (
    <section className="animate-reveal relative grid gap-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm lg:grid-cols-[1.4fr_1fr] lg:p-8">
      <div aria-hidden="true" className="animate-pulse-soft absolute -right-10 -top-10 h-44 w-44 rounded-full bg-emerald-100/80 blur-2xl" />
      <div className="relative z-10">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-3 text-site-muted">{description}</p>
        <ul className="mt-4 space-y-2 text-sm text-site-muted">
          {points.map((point) => (
            <li key={point} className="glass-panel flex items-start gap-2 rounded-md border border-emerald-100 px-3 py-2">
              <span aria-hidden="true" className="mt-1 h-2 w-2 flex-none rounded-full bg-site-accent" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <aside className="glass-panel relative z-10 space-y-4 rounded-xl border border-emerald-100 p-5 shadow-[0_22px_28px_-26px_rgba(11,90,42,0.6)]">
        {imageSrc ? (
          <SectionImage
            src={imageSrc}
            alt={imageAlt ?? sideTitle}
            ratioClassName="aspect-[4/3]"
            className="border-emerald-200 bg-white ring-1 ring-emerald-100/70"
          />
        ) : null}
        <div>
          <h3 className="text-lg font-semibold">{sideTitle}</h3>
          <p className="mt-2 text-sm text-site-muted">{sideText}</p>
        </div>
      </aside>
    </section>
  );
}
