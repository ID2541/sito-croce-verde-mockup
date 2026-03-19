import Link from "next/link";
import { siteConfig } from "@/config/site";
import { utilityLinks } from "@/content/site";
import { publicNav } from "@/lib/navigation";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/95 backdrop-blur">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-white focus:px-3 focus:py-2"
      >
        Salta al contenuto
      </a>

      <div className="border-b border-emerald-100 bg-emerald-950 text-emerald-50">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <a href={`tel:${siteConfig.contactPhone}`} className="link-focus font-semibold hover:text-white">
              Centralino {siteConfig.contactPhone}
            </a>
            <span className="hidden text-emerald-200 sm:inline">{siteConfig.serviceHours}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {utilityLinks.map((item) =>
              "external" in item && item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-focus hover:text-white"
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className="link-focus hover:text-white">
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <Link href="/" className="link-focus text-xl font-semibold text-site-accent">
            {siteConfig.organizationName}
          </Link>
          <p className="mt-1 hidden text-xs text-site-muted md:block">{siteConfig.organizationLegalName}</p>
        </div>

        <nav aria-label="Navigazione principale" className="hidden items-center gap-2 md:flex">
          {publicNav.map((item) => {
            if (!item.children?.length) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="link-focus rounded-md px-3 py-2 text-sm font-medium text-site-ink transition hover:bg-site-accent-soft"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="link-focus inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-site-ink transition hover:bg-site-accent-soft"
                >
                  {item.label}
                  <span aria-hidden="true" className="ml-1 text-xs">
                    v
                  </span>
                </Link>
                <div className="pointer-events-none absolute left-0 top-full mt-2 w-72 rounded-xl border border-emerald-100 bg-white p-2 opacity-0 shadow-lg transition duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="link-focus block rounded-md px-3 py-2 text-sm text-site-muted transition hover:bg-site-accent-soft hover:text-site-ink"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-3">
          <Link
            href="/prenota-servizi"
            className="link-focus inline-flex rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-site-ink transition hover:bg-site-accent-soft"
          >
            Prenota
          </Link>
          <Link
            href="/donazioni"
            className="link-focus inline-flex rounded-full bg-site-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Dona Ora
          </Link>
        </div>

        <details className="md:hidden">
          <summary className="link-focus cursor-pointer list-none rounded-md border border-emerald-200 px-3 py-2 text-sm font-medium text-site-ink">
            Menu
          </summary>
          <nav
            aria-label="Navigazione mobile"
            className="absolute left-0 right-0 top-full border-b border-emerald-100 bg-white p-4 shadow-lg"
          >
            <ul className="space-y-2">
              {publicNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-focus block rounded-md px-3 py-2 text-sm font-medium text-site-ink hover:bg-site-accent-soft"
                  >
                    {item.label}
                  </Link>
                  {item.children?.length ? (
                    <ul className="mt-1 space-y-1 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="link-focus block rounded-md px-3 py-2 text-sm text-site-muted hover:bg-site-accent-soft"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
              <li className="grid gap-2 pt-2">
                <Link
                  href="/prenota-servizi"
                  className="link-focus block rounded-full border border-emerald-200 px-4 py-2 text-center text-sm font-semibold text-site-ink"
                >
                  Prenota Servizi
                </Link>
                <Link
                  href="/donazioni"
                  className="link-focus block rounded-full bg-site-accent px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  Dona Ora
                </Link>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
