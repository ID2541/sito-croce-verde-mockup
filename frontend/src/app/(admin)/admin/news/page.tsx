"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deletePost, fetchAdminPosts } from "@/lib/api/posts";
import type { ApiPost } from "@/lib/api/types";
import { ApiClientError } from "@/lib/api/client";

export default function AdminNewsPage() {
  const router = useRouter();
  const [items, setItems] = useState<ApiPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetchAdminPosts()
      .then((posts) => {
        if (mounted) {
          setItems(posts);
        }
      })
      .catch((fetchError) => {
        if (fetchError instanceof ApiClientError && fetchError.status === 401) {
          router.replace("/admin/login");
          return;
        }

        if (mounted) {
          setError(fetchError instanceof Error ? fetchError.message : "Errore caricamento news");
        }
      });

    return () => {
      mounted = false;
    };
  }, [router]);

  async function handleDelete(id: string) {
    if (!confirm("Eliminare questo articolo?")) {
      return;
    }

    try {
      await deletePost(id);
      setItems((previous) => previous.filter((item) => item.id !== id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Errore eliminazione");
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold text-white">News</h1>
        <Link href="/admin/news/new" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">
          Nuovo articolo
        </Link>
      </div>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-4 py-3">Titolo</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Stato</th>
              <th className="px-4 py-3">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-slate-800 text-slate-100">
                <td className="px-4 py-3">{item.title}</td>
                <td className="px-4 py-3 text-slate-400">{item.slug}</td>
                <td className="px-4 py-3">{item.status}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link href={`/admin/news/${item.id}/edit`} className="text-emerald-300 hover:text-emerald-200">
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
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  Nessun articolo disponibile.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}