"use client";

import { useMemo, useState } from "react";
import { faqCategories } from "@/content/faqs";
import type { UpsertFaqPayload } from "@/lib/api/faqs";

type FaqEditorFormProps = {
  initialValue?: Partial<UpsertFaqPayload>;
  submitLabel: string;
  onSubmit: (value: UpsertFaqPayload) => Promise<void>;
};

const defaultValue: UpsertFaqPayload = {
  slug: "",
  question: "",
  answer: "",
  category: faqCategories[0]?.id ?? "",
  sortOrder: 0,
  isFeatured: false,
  status: "DRAFT",
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function FaqEditorForm({ initialValue, submitLabel, onSubmit }: FaqEditorFormProps) {
  const base = useMemo(() => ({ ...defaultValue, ...initialValue }), [initialValue]);
  const [value, setValue] = useState<UpsertFaqPayload>(base);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(value);
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Errore durante il salvataggio";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-700 bg-slate-900 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-200">
          Domanda
          <input
            type="text"
            value={value.question}
            onChange={(event) =>
              setValue((previous) => ({
                ...previous,
                question: event.target.value,
              }))
            }
            className="mt-1 w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
            required
          />
        </label>

        <label className="text-sm text-slate-200">
          Slug
          <div className="mt-1 flex gap-2">
            <input
              type="text"
              value={value.slug}
              onChange={(event) => setValue((previous) => ({ ...previous, slug: event.target.value }))}
              className="w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
              required
            />
            <button
              type="button"
              onClick={() => setValue((previous) => ({ ...previous, slug: slugify(previous.question) }))}
              className="rounded-md border border-slate-500 px-3 py-2 text-xs text-slate-200"
            >
              Genera
            </button>
          </div>
        </label>
      </div>

      <label className="block text-sm text-slate-200">
        Risposta
        <textarea
          rows={12}
          value={value.answer}
          onChange={(event) => setValue((previous) => ({ ...previous, answer: event.target.value }))}
          className="mt-1 w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
          required
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm text-slate-200">
          Categoria
          <select
            value={value.category}
            onChange={(event) => setValue((previous) => ({ ...previous, category: event.target.value }))}
            className="mt-1 w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
            required
          >
            {faqCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-slate-200">
          Ordine
          <input
            type="number"
            min={0}
            value={value.sortOrder}
            onChange={(event) =>
              setValue((previous) => ({
                ...previous,
                sortOrder: Number(event.target.value),
              }))
            }
            className="mt-1 w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
            required
          />
        </label>

        <label className="text-sm text-slate-200">
          Stato
          <select
            value={value.status}
            onChange={(event) =>
              setValue((previous) => ({
                ...previous,
                status: event.target.value as UpsertFaqPayload["status"],
              }))
            }
            className="mt-1 w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
          >
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
          </select>
        </label>
      </div>

      <label className="flex items-center gap-3 text-sm text-slate-200">
        <input
          type="checkbox"
          checked={value.isFeatured}
          onChange={(event) => setValue((previous) => ({ ...previous, isFeatured: event.target.checked }))}
          className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-emerald-500"
        />
        In evidenza
      </label>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 disabled:opacity-60"
      >
        {isSubmitting ? "Salvataggio..." : submitLabel}
      </button>
    </form>
  );
}
