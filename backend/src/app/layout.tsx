import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Croce Verde Backend",
  description: "API and business logic service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
