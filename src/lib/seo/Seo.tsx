/**
 * SEO Component
 * Manages document head meta tags using react-helmet-async
 * Supports: title, description, canonical, OG, Twitter Cards, hreflang, geo tags
 */

import { Helmet } from "react-helmet-async";
import { SITE_INFO } from "@/constants/site";
import {
  DEFAULT_SEO,
  GEO_META,
  THEME_COLOR,
  LANGUAGES,
  OG_DEFAULTS,
  TWITTER_DEFAULTS,
  type PageMetadata,
} from "@/constants/seo";
import { getCanonicalUrl, getAbsoluteImageUrl, getRobotsContent } from "./utils";

export interface SeoProps {
  /**
   * Page title (will be used as-is, no template)
   * If not provided, uses DEFAULT_SEO.title
   */
  title?: string;

  /**
   * Meta description
   * If not provided, uses DEFAULT_SEO.description
   */
  description?: string;

  /**
   * Canonical URL path (e.g., "/", "/about")
   * Will be converted to absolute URL
   */
  canonical?: string;

  /**
   * Open Graph image path (relative or absolute)
   * Will be converted to absolute URL for OG and Twitter
   */
  image?: string;

  /**
   * Open Graph type (default: "website")
   */
  type?: string;

  /**
   * Prevent search engines from indexing this page
   */
  noindex?: boolean;

  /**
   * Prevent search engines from following links on this page
   */
  nofollow?: boolean;

  /**
   * Additional meta tags as key-value pairs
   */
  additionalMeta?: Array<{ name: string; content: string }>;

  /**
   * JSON-LD structured data scripts
   * Pass pre-generated JSON strings from structuredData helpers
   */
  structuredData?: string[];

  /**
   * Override default keywords
   */
  keywords?: string[];
}

export function Seo({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  canonical = "/",
  image = DEFAULT_SEO.image,
  type = OG_DEFAULTS.type,
  noindex = false,
  nofollow = false,
  additionalMeta = [],
  structuredData = [],
  keywords = DEFAULT_SEO.keywords,
}: SeoProps) {
  // Generate absolute URLs
  const canonicalUrl = getCanonicalUrl(canonical);
  const imageUrl = image ? getAbsoluteImageUrl(image) : getAbsoluteImageUrl(DEFAULT_SEO.image!);

  // Format robots content
  const robotsContent = getRobotsContent(noindex, nofollow);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      {/* Robots */}
      <meta name="robots" content={robotsContent} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Geo Tags */}
      <meta name="geo.region" content={GEO_META["geo.region"]} />
      <meta name="geo.placename" content={GEO_META["geo.placename"]} />
      {GEO_META["geo.position"] && (
        <meta name="geo.position" content={GEO_META["geo.position"]} />
      )}
      {GEO_META.ICBM && <meta name="ICBM" content={GEO_META.ICBM} />}

      {/* Theme Color */}
      <meta name="theme-color" content={THEME_COLOR} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={OG_DEFAULTS.siteName} />
      <meta property="og:locale" content={OG_DEFAULTS.locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={TWITTER_DEFAULTS.card} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content={TWITTER_DEFAULTS.site} />
      <meta name="twitter:creator" content={TWITTER_DEFAULTS.creator} />

      {/* hreflang Tags */}
      {/* Primary language */}
      <link rel="alternate" hrefLang={LANGUAGES.primary} href={canonicalUrl} />

      {/* x-default for international targeting */}
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Add additional supported languages when available */}
      {LANGUAGES.supported
        .filter((lang) => lang !== LANGUAGES.primary)
        .map((lang) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={canonicalUrl} />
        ))}

      {/* Additional Meta Tags */}
      {additionalMeta.map((meta, index) => (
        <meta key={`additional-${index}`} name={meta.name} content={meta.content} />
      ))}

      {/* JSON-LD Structured Data */}
      {structuredData.map((jsonLd, index) => (
        <script key={`jsonld-${index}`} type="application/ld+json">
          {jsonLd}
        </script>
      ))}
    </Helmet>
  );
}

/**
 * Helper hook to create SEO props from PageMetadata
 * Simplifies usage: const seoProps = useSeoFromMetadata(PAGE_METADATA.home, "/")
 */
export function createSeoProps(
  metadata: PageMetadata,
  canonical: string = "/"
): Omit<SeoProps, "structuredData"> {
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    image: metadata.image,
    canonical,
    noindex: metadata.noindex,
    nofollow: metadata.nofollow,
  };
}
