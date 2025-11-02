/**
 * SEO Library Barrel Export
 * Centralized exports for easy imports
 */

// Main SEO component
export { Seo, createSeoProps, type SeoProps } from "./Seo";

// Structured data generators
export {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  schemaToJsonLd,
  combineSchemas,
  type OrganizationSchema,
  type LocalBusinessSchema,
  type BreadcrumbSchema,
} from "./structuredData";

// Utility functions
export {
  getBaseUrl,
  getCanonicalUrl,
  getAbsoluteImageUrl,
  getPageMetadata,
  getRouteMetadataKey,
  getRobotsContent,
  truncateDescription,
  generateBreadcrumbs,
} from "./utils";
