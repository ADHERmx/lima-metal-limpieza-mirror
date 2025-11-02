/**
 * SEO metadata configurations for each route
 * All metadata in Spanish (es-MX)
 */

import { SITE_INFO } from "./site";

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export const DEFAULT_SEO: PageMetadata = {
  title: `${SITE_INFO.brand.fullName} | Industria Metal Mecánica desde 1981`,
  description: `${SITE_INFO.company.description.short} Especialistas en equipos de granallado GOFF, colectores de polvo y equipos vibratorios CARRIER. Más de 500 equipos vendidos en México.`,
  keywords: [
    "granallado",
    "shot blasting",
    "colectores de polvo",
    "equipos vibratorios",
    "GOFF",
    "CARRIER",
    "industria metal mecánica",
    "fundición",
    "Monterrey",
    "México",
  ],
  // Temporary social preview image placeholder (replace with /og-image.jpg when available)
  image: "https://storage.googleapis.com/gpt-engineer-file-uploads/N5gAM4D3SIOmmhwQDjFqXxAsqkl2/social-images/social-1760630917858-LIMA color.png",
};

export const PAGE_METADATA: Record<string, PageMetadata> = {
  home: {
    title: `${SITE_INFO.brand.fullName} | Industria Metal Mecánica desde 1981`,
    description: `${SITE_INFO.company.description.short} Distribuidores exclusivos de granalladoras GOFF y equipos vibratorios CARRIER. Más de 500 equipos vendidos desde 1981 en Monterrey, México.`,
    keywords: [
      "LIMA",
      "limpieza de metales",
      "granallado Monterrey",
      "granalladoras GOFF",
      "equipos CARRIER",
      "colectores de polvo industrial",
      "equipos vibratorios fundición",
      "industria metal mecánica Monterrey",
      "sand blasteo México",
      "shakeouts",
      "transportadores vibratorios",
    ],
    image: "/lima-logo.png",
  },

  notFound: {
    title: "Página no encontrada | LIMA",
    description: "La página que buscas no existe o fue movida. Vuelve al inicio para explorar nuestros servicios de granallado y equipos industriales.",
    noindex: true,
    nofollow: false, // Allow following links on 404 page
  },
};

// Geo-targeting metadata for Monterrey, Nuevo León, Mexico
export const GEO_META = {
  "geo.region": SITE_INFO.location.region, // MX-NLE
  "geo.placename": SITE_INFO.location.city, // Monterrey
  "geo.position": "", // Add coordinates when available: "25.6866;-100.3161"
  ICBM: "", // Add coordinates when available: "25.6866, -100.3161"
};

// Theme color for browser UI
export const THEME_COLOR = "#F25430"; // Industrial orange from index.css (HSL 18 100% 60%)

// Supported languages and hreflang configuration
export const LANGUAGES = {
  primary: "es-MX",
  supported: ["es-MX"], // Add "en-US" when English version available
  default: "es-MX", // x-default hreflang
};

// Open Graph defaults
export const OG_DEFAULTS = {
  type: "website",
  locale: "es_MX",
  siteName: SITE_INFO.brand.fullName,
};

// Twitter Card defaults
export const TWITTER_DEFAULTS = {
  card: "summary_large_image" as const,
  site: SITE_INFO.social.twitter.handle,
  creator: SITE_INFO.social.twitter.handle,
};

// Robots meta defaults
export const ROBOTS_DEFAULT = "index,follow";
export const ROBOTS_NOINDEX = "noindex,follow";
