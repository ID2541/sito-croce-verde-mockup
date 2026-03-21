import Link from "next/link";
import type { FaqItem } from "@/content/faqs";

type FAQItemProps = {
  item: FaqItem;
  index: number;
};

export function FAQItem({ item, index }: FAQItemProps) {
  return (
    <details
      id={item.id}
      open={item.featured}
      className="group rounded-2xl border border-emerald-100 bg-white shadow-sm transition hover:border-emerald-200"
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">Q{String(index).padStart(2, "0")}</p>
          <h3 className="mt-1 text-lg font-semibold text-site-ink">{item.question}</h3>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-site-accent transition duration-200 group-open:rotate-45"
        >
          +
        </span>
      </summary>

      <div className="px-5 pb-5 pt-1 text-sm text-site-muted">
        <div className="space-y-3">
          {item.answer.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {item.links?.length ? (
          <div className="mt-4 flex flex-wrap gap-3">
            {item.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-focus inline-flex items-center rounded-full border border-emerald-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-site-ink transition hover:bg-emerald-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </details>
  );
}
