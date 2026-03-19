"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(email, password);
      router.replace("/admin");
    } catch (submitError) {
      if (submitError instanceof ApiClientError) {
        setError(submitError.message);
      } else {
        setError("Errore durante il login");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
      <h1 className="text-2xl font-semibold text-white">Login admin</h1>
      <p className="mt-2 text-sm text-slate-300">Accesso all'area redazionale.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-sm text-slate-200">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
            required
          />
        </label>

        <label className="block text-sm text-slate-200">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
            required
          />
        </label>

        {error ? <p className="text-sm text-rose-300">{error}</p> : null}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 disabled:opacity-60"
        >
          {isLoading ? "Accesso..." : "Accedi"}
        </button>
      </form>
    </section>
  );
}
