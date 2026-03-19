export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
