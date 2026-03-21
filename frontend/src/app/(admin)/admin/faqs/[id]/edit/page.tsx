"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaqEditorForm } from "@/components/admin/FaqEditorForm";
import { fetchFaqById, updateFaq, type UpsertFaqPayload } from "@/lib/api/faqs";
import type { ApiFaq } from "@/lib/api/types";
import { ApiClientError } from "@/lib/api/client";

function toFormValue(faq: ApiFaq): UpsertFaqPayload {
  return {
    slug: faq.slug,
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
    sortOrder: faq.sortOrder,
    isFeatured: faq.isFeatured,
    status: faq.status,
  };
}

export default function AdminFaqsEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = useMemo(() => params.id, [params.id]);
  const [faq, setFaq] = useState<ApiFaq | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetchFaqById(id)
      .then((data) => {
        if (mounted) {
          setFaq(data);
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
  }, [id, router]);

  async function handleUpdate(payload: UpsertFaqPayload) {
    try {
      await updateFaq(id, payload);
    } catch (updateError) {
      if (updateError instanceof ApiClientError && updateError.status === 401) {
        router.replace("/admin/login");
        return;
      }

      throw updateError;
    }
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-white">Modifica FAQ</h1>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      {faq ? (
        <FaqEditorForm initialValue={toFormValue(faq)} submitLabel="Salva modifiche" onSubmit={handleUpdate} />
      ) : (
        <p className="text-sm text-slate-400">Caricamento FAQ...</p>
      )}
    </section>
  );
}
