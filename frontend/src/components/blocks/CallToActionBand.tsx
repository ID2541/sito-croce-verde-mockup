import Link from "next/link";

type CallToActionBandProps = {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
};

export function CallToActionBand({ title, description, actionLabel, actionHref }: CallToActionBandProps) {
  return (
    <section className="cta-sheen animate-reveal relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600 px-6 py-8 text-white shadow-[0_24px_34px_-26px_rgba(11,90,42,0.9)] sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div aria-hidden="true" className="animate-float-slow absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/20 blur-xl" />
      <div aria-hidden="true" className="animate-float-fast absolute -left-12 bottom-0 h-28 w-28 rounded-full bg-emerald-200/30 blur-xl" />
      <div className="relative z-10">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-emerald-50">{description}</p>
      </div>
      <Link
        href={actionHref}
        className="link-focus relative z-10 mt-4 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-site-accent transition hover:-translate-y-0.5 hover:bg-emerald-50 sm:mt-0"
      >
        {actionLabel}
      </Link>
    </section>
  );
}
