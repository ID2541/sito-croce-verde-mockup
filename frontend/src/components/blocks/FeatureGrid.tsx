import Link from "next/link";
import { SectionImage } from "@/components/media/SectionImage";

type FeatureItem = {
  title: string;
  description: string;
  href?: string;
  badge?: string;
  imageSrc?: string;
  imageAlt?: string;
};

type FeatureGridProps = {
  title?: string;
  items: FeatureItem[];
};

export function FeatureGrid({ title, items }: FeatureGridProps) {
  return (
    <section className="animate-reveal space-y-5">
      {title ? (
        <h2 className="inline-flex items-center gap-3 text-2xl font-semibold">
          <span className="inline-block h-1.5 w-8 rounded-full bg-site-accent" />
          {title}
        </h2>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="card-lift animate-reveal group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white/90 shadow-sm"
            style={{ animationDelay: `${index * 85}ms` }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-emerald-100/45 to-transparent" />
            {item.imageSrc ? (
              <SectionImage
                src={item.imageSrc}
                alt={item.imageAlt ?? item.title}
                ratioClassName="aspect-[16/10]"
                className="rounded-none border-0 shadow-none"
              />
            ) : null}
            <div className="relative z-10 p-5">
              {item.badge ? (
                <p className="inline-flex rounded-full border border-emerald-200 bg-site-accent-soft px-2.5 py-1 text-xs font-medium text-site-accent">
                  {item.badge}
                </p>
              ) : null}
              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-site-muted">{item.description}</p>
              {item.href ? (
                <Link
                  href={item.href}
                  className="link-focus mt-4 inline-flex items-center gap-2 text-sm font-semibold text-site-accent transition hover:gap-3 hover:text-emerald-700"
                >
                  Approfondisci
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
