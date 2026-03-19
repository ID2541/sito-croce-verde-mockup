"use client";

import { useEffect, useState } from "react";
import type { TrainingSection } from "@/content/mock/training";
import { ApiClientError } from "@/lib/api/client";
import {
  getTrainingAccess,
  getTrainingMaterialDownloadUrl,
  lockTrainingAccess,
  unlockTrainingAccess,
  type TrainingAccess,
} from "@/lib/api/training";

type TrainingMaterialsGateProps = {
  sections: TrainingSection[];
};

const ACCESS_CODE_REGEX = /^[A-Z0-9]{16}$/;

function getLockedAccessState(current: TrainingAccess | null): TrainingAccess {
  return {
    granted: false,
    grantId: current?.grantId ?? null,
    grantLabel: current?.grantLabel ?? null,
    validUntil: null,
  };
}

export function TrainingMaterialsGate({ sections }: TrainingMaterialsGateProps) {
  const [access, setAccess] = useState<TrainingAccess | null>(null);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadAccess() {
      try {
        const status = await getTrainingAccess();
        if (active) {
          setAccess(status);
        }
      } catch {
        if (active) {
          setAccess(getLockedAccessState(null));
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadAccess();

    return () => {
      active = false;
    };
  }, []);

  async function handleUnlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const normalizedCode = code.trim().toUpperCase();

    if (!ACCESS_CODE_REGEX.test(normalizedCode)) {
      setError("Il codice deve contenere 16 caratteri alfanumerici.");
      return;
    }

    setIsSubmitting(true);

    try {
      const status = await unlockTrainingAccess(normalizedCode);
      setAccess(status);
      setCode("");
    } catch (submitError) {
      if (submitError instanceof ApiClientError) {
        setError(submitError.message);
      } else {
        setError("Impossibile verificare il codice in questo momento.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLock() {
    setIsSubmitting(true);
    setError(null);

    try {
      await lockTrainingAccess();
      setAccess((current) => getLockedAccessState(current));
    } catch {
      setError("Impossibile revocare l'accesso al momento.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const hasAccess = Boolean(access?.granted);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold">Accesso materiali</h2>
        <p className="mt-2 text-sm text-site-muted">
          I download sono riservati ai volontari autorizzati. Inserisci il codice di accesso fornito dal team formazione.
        </p>

        {isLoading ? <p className="mt-4 text-sm text-site-muted">Verifica accesso in corso...</p> : null}

        {!isLoading && hasAccess ? (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-site-ink">Accesso abilitato</p>
            <p className="mt-1 text-xs text-site-muted">
              Profilo attivo: {access?.grantLabel ?? "accesso autorizzato"}
              {access?.validUntil ? ` · valido fino al ${new Date(access.validUntil).toLocaleDateString("it-IT")}` : ""}
            </p>
            <button
              type="button"
              onClick={handleLock}
              disabled={isSubmitting}
              className="link-focus mt-3 rounded-full border border-emerald-300 px-4 py-2 text-xs font-semibold text-site-ink transition hover:bg-white disabled:opacity-60"
            >
              Disattiva accesso
            </button>
          </div>
        ) : null}

        {!isLoading && !hasAccess ? (
          <form onSubmit={handleUnlock} className="mt-4 grid gap-3 sm:max-w-md">
            <label className="text-sm font-medium text-site-ink">
              Codice di accesso
              <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value.toUpperCase())}
                className="mt-1 w-full rounded-md border border-emerald-200 px-3 py-2 uppercase tracking-[0.2em]"
                placeholder="AB12CD34EF56GH78"
                maxLength={16}
                autoComplete="off"
                required
              />
            </label>
            {error ? <p className="text-sm text-rose-700">{error}</p> : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="link-focus inline-flex w-fit rounded-full bg-site-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
            >
              {isSubmitting ? "Verifica..." : "Sblocca download"}
            </button>
          </form>
        ) : null}
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {sections.map((section) => (
          <article key={section.id} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <header>
              <p className="text-xs font-semibold uppercase tracking-wide text-site-accent">{section.audience}</p>
              <h3 className="mt-2 text-2xl font-semibold" id={`section-${section.slug}`}>
                {section.title}
              </h3>
              <p className="mt-2 text-sm text-site-muted">{section.summary}</p>
            </header>

            <ul className="mt-5 space-y-3" aria-labelledby={`section-${section.slug}`}>
              {section.materials.map((material) => (
                <li key={material.id} className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-site-ink">{material.title}</p>
                      <p className="mt-1 text-xs text-site-muted">
                        {material.lesson} · {new Date(material.updatedAt).toLocaleDateString("it-IT")} · {material.format} · {material.size}
                      </p>
                    </div>
                    <a
                      href={hasAccess ? getTrainingMaterialDownloadUrl(material.id) : "#"}
                      download={hasAccess}
                      onClick={(event) => {
                        if (!hasAccess) {
                          event.preventDefault();
                        }
                      }}
                      aria-disabled={!hasAccess}
                      className={
                        hasAccess
                          ? "link-focus inline-flex rounded-full bg-site-accent px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                          : "inline-flex cursor-not-allowed rounded-full bg-slate-300 px-4 py-2 text-xs font-semibold text-slate-600"
                      }
                    >
                      Scarica
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
