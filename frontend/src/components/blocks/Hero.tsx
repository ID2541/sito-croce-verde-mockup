import Link from "next/link";
import { SectionImage } from "@/components/media/SectionImage";

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "warm";
};

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: HeroAction[];
  meta?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
};

export function Hero({
  eyebrow,
  title,
  description,
  actions = [],
  meta,
  imageSrc,
  imageAlt,
  imageCaption,
}: HeroProps) {
  return (
    <section className="mesh-surface animate-reveal relative overflow-hidden rounded-[2rem] border border-emerald-100/90 px-6 py-10 shadow-[0_18px_50px_-32px_rgba(19,81,44,0.55)] sm:px-10">
      <div aria-hidden="true" className="animate-float-slow absolute -left-14 top-10 h-32 w-32 rounded-full bg-emerald-200/45 blur-2xl" />
      <div aria-hidden="true" className="animate-float-fast absolute -right-10 bottom-6 h-40 w-40 rounded-full bg-sky-200/45 blur-2xl" />

      <div className={imageSrc ? "relative z-10 grid items-center gap-8 xl:grid-cols-[1.2fr_0.8fr]" : "relative z-10"}>
        <div className="animate-reveal animate-reveal-delay-1">
          <p className="inline-flex rounded-full border border-emerald-200 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base text-site-muted sm:text-lg">{description}</p>

          {actions.length ? (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={
                    action.variant === "secondary"
                      ? "link-focus inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-site-ink transition hover:-translate-y-0.5 hover:bg-white"
                      : action.variant === "warm"
                        ? "link-focus inline-flex items-center rounded-full bg-site-warm px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_-16px_rgba(234,113,49,0.48)] transition hover:-translate-y-0.5 hover-site-warm-strong"
                      : "link-focus inline-flex items-center rounded-full bg-site-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_-16px_rgba(19,81,44,0.72)] transition hover:-translate-y-0.5 hover:bg-emerald-700"
                  }
                >
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}

          {meta ? (
            <p className="glass-panel mt-5 inline-flex rounded-full border border-emerald-100 px-3 py-1 text-sm text-site-muted">
              {meta}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-site-muted">
            <span className="rounded-full border border-emerald-100 bg-white/80 px-3 py-1">Prenotazioni rapide</span>
            <span className="rounded-full border border-emerald-100 bg-white/80 px-3 py-1">News operative</span>
            <span className="rounded-full border border-emerald-100 bg-white/80 px-3 py-1">Contatti diretti</span>
          </div>
        </div>

        {imageSrc ? (
          <div className="animate-reveal animate-reveal-delay-2">
            <SectionImage
              src={imageSrc}
              alt={imageAlt ?? title}
              caption={imageCaption}
              priority
              ratioClassName="aspect-[5/4] sm:aspect-[16/11]"
              className="ring-1 ring-emerald-100/80"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
