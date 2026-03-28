import { siteConfig } from "@/config/site";

export function DemoBanner() {
  if (!siteConfig.isStaticDemo) {
    return null;
  }

  return (
    <div className="border-b border-amber-200 bg-amber-50">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm text-amber-950 sm:px-6 lg:px-8">
        <div>
          <p className="font-semibold uppercase tracking-[0.16em] text-amber-700">Demo GitHub Pages</p>
          <p className="mt-1">
            Mock statico per handoff progettuale. Backend, autenticazione, CMS e download protetti non sono inclusi in questa versione.
          </p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Solo navigazione pubblica</p>
      </div>
    </div>
  );
}
