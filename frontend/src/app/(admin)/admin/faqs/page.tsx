"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { faqCategories } from "@/content/faqs";
import { deleteFaq, fetchAdminFaqs } from "@/lib/api/faqs";
import type { ApiFaq } from "@/lib/api/types";
import { ApiClientError } from "@/lib/api/client";

const categoryLabelById = new Map<string, string>(faqCategories.map((category) => [category.id, category.title]));

export default function AdminFaqsPage() {
  const router = useRouter();
  const [items, setItems] = useState<ApiFaq[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetchAdminFaqs()
      .then((faqs) => {
        if (mounted) {
          setItems(faqs);
        }
      })
      .catch((fetchError) => {
        if (fetchError instanceof ApiClientError && fetchError.status === 401) {
          router.replace("/admin/login");
          return;
        }

        if (mounted) {
          setError(fetchError instanceof Error ? fetchError.message : "Errore caricamento FAQ");
        }
      });

    return () => {
      mounted = false;
    };
  }, [router]);

  async function handleDelete(id: string) {
    if (!confirm("Eliminare questa FAQ?")) {
      return;
    }

    try {
      await deleteFaq(id);
      setItems((previous) => previous.filter((item) => item.id !== id));
    } catch (deleteError) {
      if (deleteError instanceof ApiClientError && deleteError.status === 401) {
        router.replace("/admin/login");
        return;
      }

      setError(deleteError instanceof Error ? deleteError.message : "Errore eliminazione");
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold text-white">FAQ</h1>
        <Link href="/admin/faqs/new" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">
          Nuova FAQ
        </Link>
      </div>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-4 py-3">Domanda</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Stato</th>
              <th className="px-4 py-3">Ordine</th>
              <th className="px-4 py-3">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-slate-800 text-slate-100">
                <td className="px-4 py-3">{item.question}</td>
                <td className="px-4 py-3 text-slate-400">{item.slug}</td>
                <td className="px-4 py-3 text-slate-300">{categoryLabelById.get(item.category) ?? item.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      item.status === "PUBLISHED"
                        ? "rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300"
                        : "rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-300"
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-300">{item.sortOrder}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link href={`/admin/faqs/${item.id}/edit`} className="text-emerald-300 hover:text-emerald-200">
                      Modifica
                    </Link>
                    <button type="button" onClick={() => handleDelete(item.id)} className="text-rose-300 hover:text-rose-200">
                      Elimina
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  Nessuna FAQ disponibile.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
