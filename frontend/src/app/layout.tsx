import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.organizationName,
    template: `%s | ${siteConfig.organizationName}`,
  },
  description: siteConfig.organizationDescription,
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteConfig.siteUrl,
    siteName: siteConfig.organizationName,
    title: siteConfig.organizationName,
    description: siteConfig.organizationDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.organizationName,
    description: siteConfig.organizationDescription,
  },
  category: "health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${sans.variable} ${serif.variable} bg-site text-site-ink`}>{children}</body>
    </html>
  );
}
