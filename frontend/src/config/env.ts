function normalizeBasePath(value: string | undefined): string {
  if (!value || value === "/") {
    return "";
  }

  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

const fallbackApiBaseUrl = "";
const staticDemo = process.env.NEXT_PUBLIC_STATIC_DEMO === "true";

export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? fallbackApiBaseUrl,
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH),
  staticDemo,
} as const;

export function withBasePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) {
    return path;
  }

  return env.basePath ? `${env.basePath}${path}` : path;
}
