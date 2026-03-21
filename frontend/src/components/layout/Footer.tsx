import Link from "next/link";
import { siteConfig } from "@/config/site";
import { footerActionLinks, footerInstitutionalLinks } from "@/content/site";
import { legalNav } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-white/90">
      <div className="border-b border-emerald-100 bg-emerald-950 px-4 py-4 text-emerald-50">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:px-2 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">Assistenza & orientamento</p>
            <p className="mt-1 text-sm">Per richieste ordinarie usa i canali ufficiali o la pagina prenotazioni.</p>
          </div>
          <div className="flex flex-nowrap items-center justify-end gap-2 self-start sm:self-end lg:self-auto">
            <Link
              href="/prenota-servizi"
              className="link-focus inline-flex whitespace-nowrap rounded-full border border-emerald-300 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Prenota Servizi
            </Link>
            <Link
              href="/donazioni"
              className="link-focus inline-flex whitespace-nowrap rounded-full bg-site-warm px-4 py-2 text-sm font-semibold text-white transition hover-site-warm-strong"
            >
              Dona Ora
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <section aria-labelledby="footer-contatti">
          <h2 id="footer-contatti" className="text-base font-semibold text-site-ink">
            Contatti istituzionali
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-site-muted">
            <li>{siteConfig.contactAddress}</li>
            <li>
              <a href={`tel:${siteConfig.contactPhone}`} className="link-focus hover:text-site-ink">
                {siteConfig.contactPhone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.contactEmail}`} className="link-focus hover:text-site-ink">
                {siteConfig.contactEmail}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.pecEmail}`} className="link-focus hover:text-site-ink">
                PEC: {siteConfig.pecEmail}
              </a>
            </li>
          </ul>
        </section>

        <section aria-labelledby="footer-istituzionale">
          <h2 id="footer-istituzionale" className="text-base font-semibold text-site-ink">
            Sezioni principali
          </h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {footerInstitutionalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-focus text-site-muted transition hover:text-site-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="footer-azioni">
          <h2 id="footer-azioni" className="text-base font-semibold text-site-ink">
            Accessi rapidi
          </h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {footerActionLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-focus text-site-muted transition hover:text-site-ink">
                  {item.label}
                </Link>
              </li>
            ))}
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-focus text-site-muted transition hover:text-site-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="border-t border-emerald-100 px-4 py-4 text-center text-xs text-site-muted">
        © {new Date().getFullYear()} {siteConfig.organizationLegalName} · CF {siteConfig.taxCode} · P.IVA {siteConfig.vatNumber}
      </div>
    </footer>
  );
}
