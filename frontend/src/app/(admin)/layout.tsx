export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Perimetro CMS in demo</p>
        {children}
      </div>
    </div>
  );
}
