/**
 * Site-wide constants for LIMA company information
 * All user-facing content in Spanish (es-MX)
 */

export const SITE_INFO = {
  brand: {
    name: "LIMA",
    fullName: "LIMA - Limpieza de Metales",
    tagline: "Dedicados a servir la industria metal mecánica y fundición desde 1981",
    foundedYear: 1981,
  },

  company: {
    legalName: "LIMA",
    founder: "Adrián Hermosillo",
    partners: ["BCP", "GOFF"],
    description: {
      short: "Dedicados a servir la industria metal mecánica y fundición desde 1981.",
      long: `LIMA fue fundada en 1981 por Adrián Hermosillo en asociación con BCP y GOFF.
Desde entonces, ha servido a la industria metal mecánica y de fundición en México, con distribución exclusiva
de granalladoras GOFF y equipos vibratorios CARRIER para fundición. Con más de 500 equipos vendidos,
LIMA es referente nacional en soluciones de granallado, sand blasteo, colectores de polvo,
transportadores vibratorios, alimentadores y shakeouts.`,
    },
    milestones: {
      founded: 1981,
      equipmentSold: "500+",
      goffDistributor: 1981,
      carrierDistributor: true,
    },
  },

  contact: {
    email: "info@lima.com.mx",
    phones: [
      { type: "office", number: "+52 (81) 8351-0648", display: "+52 (81) 8351-0648" },
      { type: "office", number: "+52 (81) 8351-4881", display: "+52 (81) 8351-4881" },
    ],
    whatsapp: {
      number: "+528119103216",
      display: "+52 (81) 1910-3216",
    },
  },

  location: {
    city: "Monterrey",
    state: "Nuevo León",
    stateCode: "NL",
    postalCode: "64410",
    country: "México",
    countryCode: "MX",
    region: "MX-NLE",
    // Note: Full street address not available in current codebase
    // Add when available: address: "Calle Example 123, Col. Example"
  },

  social: {
    twitter: {
      handle: "@lima_metales",
      url: "https://twitter.com/lima_metales",
    },
    // Add other social media when available:
    // facebook: "",
    // instagram: "",
    // linkedin: "",
  },

  services: [
    {
      id: "granallado",
      name: "Equipos de Granallado",
      description: "Granalladoras GOFF - distribución exclusiva en México desde 1981",
    },
    {
      id: "colectores",
      name: "Colectores de Polvo",
      description: "Sistemas de recolección y filtrado de polvo industrial",
    },
    {
      id: "vibratorios",
      name: "Equipos Vibratorios",
      description: "Equipos CARRIER para la industria de fundición - distribución exclusiva",
    },
    {
      id: "goff",
      name: "Distribución GOFF",
      description: "Distribuidor exclusivo de equipos GOFF en México",
    },
  ],

  urls: {
    // Production URL
    production: "https://limpiezademetales.com.mx",
    // Lovable project URL
    development: "https://lovable.dev/projects/eabf5d60-e2cf-4ebd-b861-aab2ffcd1931",
  },
} as const;

export type SiteInfo = typeof SITE_INFO;
