import type { FaqSection } from "@/content/faqs";
import { FAQItem } from "./FAQItem";

type FAQListProps = {
  section: FaqSection;
};

export function FAQList({ section }: FAQListProps) {
  return (
    <section id={section.id} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-site-accent">{section.eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold">{section.title}</h2>
        <p className="mt-3 text-sm text-site-muted">{section.description}</p>
      </div>

      <div className="mt-6 grid gap-3">
        {section.items.map((item, index) => (
          <FAQItem key={item.id} item={item} index={index + 1} />
        ))}
      </div>
    </section>
  );
}
