"use client";

import { useMemo, useState } from "react";
import type { UpsertPostPayload } from "@/lib/api/posts";

type PostEditorFormProps = {
  initialValue?: UpsertPostPayload;
  submitLabel: string;
  onSubmit: (value: UpsertPostPayload) => Promise<void>;
};

const defaultValue: UpsertPostPayload = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  status: "DRAFT",
  category: "news",
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function PostEditorForm({ initialValue, submitLabel, onSubmit }: PostEditorFormProps) {
  const base = useMemo(() => ({ ...defaultValue, ...initialValue }), [initialValue]);
  const [value, setValue] = useState<UpsertPostPayload>(base);
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
          Titolo
          <input
            type="text"
            value={value.title}
            onChange={(event) =>
              setValue((previous) => ({
                ...previous,
                title: event.target.value,
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
              onClick={() => setValue((previous) => ({ ...previous, slug: slugify(previous.title) }))}
              className="rounded-md border border-slate-500 px-3 py-2 text-xs text-slate-200"
            >
              Genera
            </button>
          </div>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-200">
          Stato
          <select
            value={value.status}
            onChange={(event) =>
              setValue((previous) => ({
                ...previous,
                status: event.target.value as UpsertPostPayload["status"],
              }))
            }
            className="mt-1 w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
          >
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
          </select>
        </label>

        <label className="text-sm text-slate-200">
          Categoria
          <input
            type="text"
            value={value.category ?? ""}
            onChange={(event) => setValue((previous) => ({ ...previous, category: event.target.value }))}
            className="mt-1 w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
          />
        </label>
      </div>

      <label className="block text-sm text-slate-200">
        Excerpt
        <textarea
          rows={3}
          value={value.excerpt}
          onChange={(event) => setValue((previous) => ({ ...previous, excerpt: event.target.value }))}
          className="mt-1 w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
          required
        />
      </label>

      <label className="block text-sm text-slate-200">
        Contenuto
        <textarea
          rows={10}
          value={value.content}
          onChange={(event) => setValue((previous) => ({ ...previous, content: event.target.value }))}
          className="mt-1 w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
          required
        />
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