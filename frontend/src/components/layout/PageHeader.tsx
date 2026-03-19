import Link from "next/link";

type Breadcrumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
};

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <header className="rounded-2xl border border-emerald-100 bg-white/80 px-6 py-8 shadow-sm backdrop-blur sm:px-8">
      {breadcrumbs?.length ? (
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-site-muted">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={`${crumb.label}-${index}`} className="inline-flex items-center gap-2">
                  {crumb.href && !isLast ? (
                    <Link href={crumb.href} className="link-focus hover:text-site-ink">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current={isLast ? "page" : undefined}>{crumb.label}</span>
                  )}
                  {!isLast ? <span aria-hidden="true">/</span> : null}
                </li>
              );
            })}
          </ol>
        </nav>
      ) : null}
      <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
      {description ? <p className="mt-3 max-w-3xl text-site-muted">{description}</p> : null}
    </header>
  );
}
