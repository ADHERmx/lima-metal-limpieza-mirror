#!/usr/bin/env node
// Simple sitemap generator based on React Router routes in src/App.tsx
// Reads production URL from src/constants/site.ts

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const appPath = path.join(ROOT, 'src', 'App.tsx');
const siteConstPath = path.join(ROOT, 'src', 'constants', 'site.ts');
const outPath = path.join(ROOT, 'public', 'sitemap.xml');

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function extractProductionUrl(src) {
  // Matches: production: "https://example.com"
  const m = src.match(/production:\s*"([^"]+)"/);
  if (!m) throw new Error('Could not find production URL in src/constants/site.ts');
  return m[1].replace(/\/$/, '');
}

function extractRoutes(src) {
  // Find <Route path="..." element=...> and capture paths, skip wildcard "*"
  const routes = new Set();
  const re = /<Route\s+path=\"([^\"]+)\"/g;
  let match;
  while ((match = re.exec(src)) !== null) {
    const p = match[1];
    if (p && p !== '*') routes.add(p);
  }
  // Normalize: ensure root is '/'; remove trailing slash except root
  return Array.from(routes).map((p) => (p === '/' ? '/' : p.replace(/\/$/, '')));
}

function formatLoc(base, route) {
  if (route === '/') return base + '/';
  return base + (route.startsWith('/') ? route : '/' + route);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function buildXml(baseUrl, routes) {
  const d = today();
  const entries = routes
    .map((r) => {
      const loc = formatLoc(baseUrl, r);
      const changefreq = r === '/' ? 'monthly' : 'monthly';
      const priority = r === '/' ? '1.0' : '0.8';
      return `  <url>\n` +
        `    <loc>${loc}</loc>\n` +
        `    <lastmod>${d}</lastmod>\n` +
        `    <changefreq>${changefreq}</changefreq>\n` +
        `    <priority>${priority}</priority>\n` +
        `    <xhtml:link rel="alternate" hreflang="es-MX" href="${loc}" />\n` +
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />\n` +
        `  </url>`;
    })
    .join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    `  <!-- Auto-generated ${d} from src/App.tsx routes -->\n\n` +
    `${entries}\n\n` +
    `</urlset>\n`;
}

function main() {
  const appSrc = read(appPath);
  const siteSrc = read(siteConstPath);
  const baseUrl = extractProductionUrl(siteSrc);
  const routes = extractRoutes(appSrc);
  if (routes.length === 0) throw new Error('No routes found in src/App.tsx');
  const xml = buildXml(baseUrl, routes);
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log(`Sitemap generated with ${routes.length} route(s) at public/sitemap.xml`);
}

main();

