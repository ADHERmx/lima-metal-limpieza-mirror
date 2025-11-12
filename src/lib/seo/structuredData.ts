/**
 * JSON-LD Structured Data Generators
 * Creates Schema.org structured data for SEO
 */

import { SITE_INFO } from "@/constants/site";
import { getBaseUrl, getAbsoluteImageUrl } from "./utils";

/**
 * Organization Schema (base schema for the company)
 * https://schema.org/Organization
 */
export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  alternateName?: string;
  url: string;
  logo: string;
  description: string;
  foundingDate: string;
  founder: {
    "@type": string;
    name: string;
  };
  contactPoint: Array<{
    "@type": string;
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
  }>;
  address?: {
    "@type": string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs?: string[];
}

/**
 * LocalBusiness Schema (extends Organization for local presence)
 * https://schema.org/LocalBusiness
 */
export interface LocalBusinessSchema extends Omit<OrganizationSchema, "@type"> {
  "@type": "LocalBusiness";
  priceRange?: string;
  openingHours?: string[];
  geo?: {
    "@type": string;
    latitude?: number;
    longitude?: number;
  };
}

/**
 * BreadcrumbList Schema
 * https://schema.org/BreadcrumbList
 */
export interface BreadcrumbSchema {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Generate Organization structured data
 * Base schema representing LIMA as an organization
 */
export function generateOrganizationSchema(): OrganizationSchema {
  const baseUrl = getBaseUrl();
  const logoUrl = getAbsoluteImageUrl("/lima-logo.png");

  // Collect social media URLs
  const sameAs: string[] = [];
  if (SITE_INFO.social.twitter.url) {
    sameAs.push(SITE_INFO.social.twitter.url);
  }

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_INFO.brand.fullName,
    alternateName: SITE_INFO.brand.name,
    url: baseUrl,
    logo: logoUrl,
    description: SITE_INFO.company.description.long,
    foundingDate: `${SITE_INFO.brand.foundedYear}-01-01`,
    founder: {
      "@type": "Person",
      name: SITE_INFO.company.founder,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_INFO.contact.phones[0].number,
        contactType: "ventas",
        areaServed: "MX",
        availableLanguage: ["Spanish", "Español"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_INFO.location.city,
      addressRegion: SITE_INFO.location.state,
      postalCode: SITE_INFO.location.postalCode,
      addressCountry: SITE_INFO.location.countryCode,
    },
    ...(sameAs.length > 0 && { sameAs }),
  };
}

/**
 * Generate LocalBusiness structured data
 * Extends Organization schema with local business information
 */
export function generateLocalBusinessSchema(): LocalBusinessSchema {
  const baseUrl = getBaseUrl();
  const logoUrl = getAbsoluteImageUrl("/lima-logo.png");

  // Collect social media URLs
  const sameAs: string[] = [];
  if (SITE_INFO.social.twitter.url) {
    sameAs.push(SITE_INFO.social.twitter.url);
  }

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_INFO.brand.fullName,
    alternateName: SITE_INFO.brand.name,
    url: baseUrl,
    logo: logoUrl,
    description: SITE_INFO.company.description.long,
    foundingDate: `${SITE_INFO.brand.foundedYear}-01-01`,
    founder: {
      "@type": "Person",
      name: SITE_INFO.company.founder,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_INFO.contact.phones[0].number,
        contactType: "ventas",
        areaServed: "MX",
        availableLanguage: ["Spanish", "Español"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_INFO.location.city,
      addressRegion: SITE_INFO.location.state,
      postalCode: SITE_INFO.location.postalCode,
      addressCountry: SITE_INFO.location.countryCode,
    },
    // Geo-coordinates for Monterrey, Nuevo León
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.6866,
      longitude: -100.3161,
    },
    ...(sameAs.length > 0 && { sameAs }),
  };
}

/**
 * Generate BreadcrumbList structured data
 * Creates hierarchical breadcrumb navigation for search engines
 *
 * @param breadcrumbs - Array of breadcrumb items with name and url
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Convert schema object to JSON-LD script tag content
 * Use this to embed structured data in <script type="application/ld+json">
 *
 * @param schema - Schema object (Organization, LocalBusiness, BreadcrumbList, etc.)
 * @returns JSON string for script tag
 */
export function schemaToJsonLd(schema: Record<string, unknown>): string {
  return JSON.stringify(schema, null, 0); // Compact JSON for production
}

/**
 * Helper to create multiple schemas at once
 * Useful for pages that need Organization + BreadcrumbList, etc.
 *
 * @param schemas - Array of schema objects
 * @returns Array of JSON-LD strings
 */
export function combineSchemas(schemas: Array<Record<string, unknown>>): string[] {
  return schemas.map((schema) => schemaToJsonLd(schema));
}
