"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout, type AuthUser } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";

export default function AdminEntryPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    getCurrentUser()
      .then((currentUser) => {
        if (mounted) {
          setUser(currentUser);
        }
      })
      .catch((fetchError) => {
        if (fetchError instanceof ApiClientError && fetchError.status === 401) {
          router.replace("/admin/login");
          return;
        }

        if (mounted) {
          setError(fetchError instanceof Error ? fetchError.message : "Errore caricamento utente");
        }
      });

    return () => {
      mounted = false;
    };
  }, [router]);

  async function handleLogout() {
    await logout();
    router.replace("/admin/login");
  }

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
      <h1 className="text-3xl font-semibold text-white">Area admin</h1>
      <p className="mt-3 max-w-2xl text-slate-300">Dashboard iniziale per gestione contenuti.</p>

      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

      {user ? (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-slate-300">
            Connesso come <span className="font-semibold text-white">{user.email}</span> ({user.role})
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/news" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">
              Gestisci news
            </Link>
            <Link href="/admin/faqs" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">
              Gestisci FAQ
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-slate-500 px-4 py-2 text-sm font-semibold text-slate-200"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-400">Caricamento profilo...</p>
      )}
    </section>
  );
}
