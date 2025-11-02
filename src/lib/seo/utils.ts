/**
 * SEO utility functions
 * Helpers for canonical URLs, metadata mapping, and URL normalization
 */

import { SITE_INFO } from "@/constants/site";
import { PAGE_METADATA, DEFAULT_SEO, type PageMetadata } from "@/constants/seo";

/**
 * Get the base URL for the site
 * Uses production URL in production, development URL in development
 */
export function getBaseUrl(): string {
  // In production, use the production URL
  if (import.meta.env.PROD) {
    return SITE_INFO.urls.production;
  }

  // In development, try to use window.location or fall back to localhost
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // Fallback for SSR/build time
  return SITE_INFO.urls.production;
}

/**
 * Generate absolute canonical URL for a given path
 * Ensures consistent URL format (no trailing slash for root, slash for other paths)
 *
 * @param path - The path to generate canonical URL for (e.g., "/", "/about")
 * @returns Absolute canonical URL
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = getBaseUrl();
  const normalizedPath = path === "/" ? "" : path.replace(/\/$/, ""); // Remove trailing slash except root
  return `${baseUrl}${normalizedPath}`;
}

/**
 * Convert relative image URL to absolute URL for Open Graph and Twitter Cards
 *
 * @param imagePath - Relative or absolute image path
 * @returns Absolute image URL
 */
export function getAbsoluteImageUrl(imagePath: string): string {
  // If already absolute, return as-is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Convert relative to absolute
  const baseUrl = getBaseUrl();
  const normalizedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${baseUrl}${normalizedPath}`;
}

/**
 * Get page metadata by route key
 * Falls back to default SEO if route not found
 *
 * @param routeKey - Key from PAGE_METADATA (e.g., "home", "notFound")
 * @returns PageMetadata object
 */
export function getPageMetadata(routeKey: string): PageMetadata {
  return PAGE_METADATA[routeKey] || DEFAULT_SEO;
}

/**
 * Map route path to metadata key
 * Useful for dynamic route-based SEO
 *
 * @param path - Current route path (e.g., "/", "/contact")
 * @returns Metadata key
 */
export function getRouteMetadataKey(path: string): string {
  // Normalize path
  const normalizedPath = path === "/" ? "/" : path.replace(/\/$/, "");

  // Map paths to metadata keys
  const pathToKeyMap: Record<string, string> = {
    "/": "home",
    // Add more routes as they are created
  };

  return pathToKeyMap[normalizedPath] || "home";
}

/**
 * Format robots meta content based on noindex/nofollow flags
 *
 * @param noindex - Whether to prevent indexing
 * @param nofollow - Whether to prevent following links
 * @returns Formatted robots meta content
 */
export function getRobotsContent(noindex?: boolean, nofollow?: boolean): string {
  const indexDirective = noindex ? "noindex" : "index";
  const followDirective = nofollow ? "nofollow" : "follow";
  return `${indexDirective},${followDirective}`;
}

/**
 * Truncate description to optimal length for meta tags
 * Google typically displays 150-160 characters
 *
 * @param description - Full description text
 * @param maxLength - Maximum character length (default: 160)
 * @returns Truncated description
 */
export function truncateDescription(description: string, maxLength = 160): string {
  if (description.length <= maxLength) {
    return description;
  }

  // Truncate at word boundary
  const truncated = description.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  return lastSpace > 0 ? truncated.substring(0, lastSpace) + "..." : truncated + "...";
}

/**
 * Generate breadcrumb trail for a given path
 * Used for breadcrumb structured data
 *
 * @param path - Current route path
 * @returns Array of breadcrumb items
 */
export function generateBreadcrumbs(path: string): Array<{ name: string; url: string }> {
  const baseUrl = getBaseUrl();

  // Root path only
  if (path === "/" || !path) {
    return [
      {
        name: "Inicio",
        url: baseUrl,
      },
    ];
  }

  // Build breadcrumb trail
  const breadcrumbs = [
    {
      name: "Inicio",
      url: baseUrl,
    },
  ];

  // For future multi-page expansion
  // Split path and build hierarchical breadcrumbs
  const pathSegments = path.split("/").filter(Boolean);
  let accumulatedPath = "";

  pathSegments.forEach((segment, index) => {
    accumulatedPath += `/${segment}`;
    breadcrumbs.push({
      name: capitalizeSegment(segment),
      url: `${baseUrl}${accumulatedPath}`,
    });
  });

  return breadcrumbs;
}

/**
 * Helper to capitalize and format path segment for breadcrumb display
 *
 * @param segment - Path segment (e.g., "about-us")
 * @returns Formatted segment (e.g., "About Us")
 */
function capitalizeSegment(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
