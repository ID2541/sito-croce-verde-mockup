import { env } from "./env";

function stripTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

const fallbackSiteUrl = env.staticDemo ? "https://example.com" : "http://localhost:3000";

export const siteConfig = {
  siteUrl: stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl),
  basePath: env.basePath,
  isStaticDemo: env.staticDemo,
  organizationName: process.env.NEXT_PUBLIC_ORGANIZATION_NAME ?? "Croce Verde",
  organizationLegalName:
    process.env.NEXT_PUBLIC_ORGANIZATION_LEGAL_NAME ?? "Croce Verde Pubblica Assistenza",
  organizationDescription:
    process.env.NEXT_PUBLIC_ORGANIZATION_DESCRIPTION ??
    "Servizi territoriali, supporto sanitario, attivita sociali, protezione civile e percorsi di volontariato per cittadini e famiglie.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "segreteria@croceverde.local",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+39 0583 000000",
  contactAddress: process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? "Via principale 1, Lucca",
  pecEmail: process.env.NEXT_PUBLIC_PEC_EMAIL ?? "protocollo@pec.croceverde.local",
  servedArea: process.env.NEXT_PUBLIC_SERVED_AREA ?? "Lucca, Capannori, Media Valle e territorio limitrofo",
  taxCode: process.env.NEXT_PUBLIC_TAX_CODE ?? "00000000000",
  vatNumber: process.env.NEXT_PUBLIC_VAT_NUMBER ?? "00000000000",
  serviceHours: process.env.NEXT_PUBLIC_SERVICE_HOURS ?? "Lun-Sab 08:00-20:00",
  emergencyNote:
    process.env.NEXT_PUBLIC_EMERGENCY_NOTE ??
    "Per urgenze sanitarie fare sempre riferimento ai canali di emergenza ufficiali.",
} as const;
