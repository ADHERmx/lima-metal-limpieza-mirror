# Documentación SEO - LIMA

Guía completa de la implementación SEO para el sitio web de LIMA - Limpieza de Metales.

## 📋 Tabla de Contenidos

1. [Resumen](#resumen)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Uso del Componente SEO](#uso-del-componente-seo)
4. [Datos Estructurados (JSON-LD)](#datos-estructurados-json-ld)
5. [Agregar Nuevas Páginas](#agregar-nuevas-páginas)
6. [Página 404](#página-404)
7. [Sitemap y Robots.txt](#sitemap-y-robotstxt)
8. [Validación SEO](#validación-seo)
9. [Tareas Pendientes](#tareas-pendientes)
10. [Buenas Prácticas](#buenas-prácticas)

---

## Resumen

Este proyecto incluye una implementación completa de SEO para aplicaciones SPA (Single Page Application) construidas con Vite + React + TypeScript.

### Características Implementadas

✅ **Meta Tags Dinámicos**
- Títulos y descripciones personalizados por página
- Open Graph para Facebook, LinkedIn, etc.
- Twitter Cards para compartir en Twitter
- Canonical URLs absolutos

✅ **Internacionalización**
- Etiquetas `hreflang` para es-MX (idioma principal)
- Etiqueta `x-default` para alcance internacional
- Configuración lista para agregar inglés (en-US)

✅ **Geo-Targeting**
- Meta tags de ubicación (Monterrey, Nuevo León, México)
- Optimizado para búsquedas locales

✅ **Datos Estructurados**
- Schema.org JSON-LD para Organization/LocalBusiness
- BreadcrumbList para navegación
- Validado para Google Rich Results

✅ **Optimización Técnica**
- robots.txt configurado
- sitemap.xml generado
- Favicons referenciados
- Theme color para navegadores móviles
- H1 en cada página

✅ **Página 404 Optimizada**
- Diseño consistente con la marca
- Meta tag `noindex,follow` correcto
- Contenido en español con CTAs claros
- Información de contacto incluida

---

## Estructura de Archivos

```
src/
├── constants/
│   ├── site.ts          # Información de la empresa (contacto, servicios, etc.)
│   └── seo.ts           # Configuraciones de metadata por página
├── lib/
│   └── seo/
│       ├── index.ts            # Barrel export
│       ├── Seo.tsx             # Componente React principal
│       ├── structuredData.ts   # Generadores de JSON-LD
│       └── utils.ts            # Funciones auxiliares (URLs, breadcrumbs)
├── pages/
│   ├── Index.tsx        # Página de inicio (con SEO)
│   └── NotFound.tsx     # Página 404 (con SEO)
└── components/
    └── Hero.tsx         # Incluye H1 para SEO

public/
├── robots.txt           # Configuración de crawlers
├── sitemap.xml          # Mapa del sitio
├── favicon.ico          # Favicon principal
├── favicon-16x16.png    # (Por generar)
├── favicon-32x32.png    # (Por generar)
└── apple-touch-icon.png # (Por generar)
```

---

## Uso del Componente SEO

### Importación Básica

```tsx
import { Seo } from "@/lib/seo";
import { PAGE_METADATA } from "@/constants/seo";
```

### Ejemplo: Página Simple

```tsx
import { Seo } from "@/lib/seo";
import { PAGE_METADATA } from "@/constants/seo";

const MiPagina = () => {
  return (
    <div>
      <Seo
        title={PAGE_METADATA.home.title}
        description={PAGE_METADATA.home.description}
        canonical="/"
      />
      <main>
        <h1>Contenido de la página</h1>
        {/* ... */}
      </main>
    </div>
  );
};
```

### Ejemplo: Con Datos Estructurados

```tsx
import { Seo, generateLocalBusinessSchema, schemaToJsonLd } from "@/lib/seo";
import { PAGE_METADATA } from "@/constants/seo";

const PaginaConSchema = () => {
  const businessSchema = schemaToJsonLd(generateLocalBusinessSchema());

  return (
    <div>
      <Seo
        title={PAGE_METADATA.home.title}
        description={PAGE_METADATA.home.description}
        canonical="/"
        structuredData={[businessSchema]}
      />
      <main>
        {/* Contenido */}
      </main>
    </div>
  );
};
```

### Propiedades del Componente `<Seo />`

| Propiedad | Tipo | Descripción | Requerido |
|-----------|------|-------------|-----------|
| `title` | `string` | Título de la página (se usa tal cual, sin plantilla) | No* |
| `description` | `string` | Meta descripción (150-160 caracteres ideales) | No* |
| `canonical` | `string` | Path relativo (ej: "/", "/servicios") | No |
| `image` | `string` | Path relativo o URL absoluta de imagen OG | No |
| `noindex` | `boolean` | Evitar indexación (usar solo en 404, admin, etc.) | No |
| `nofollow` | `boolean` | Evitar seguimiento de enlaces | No |
| `keywords` | `string[]` | Array de palabras clave | No |
| `structuredData` | `string[]` | Array de JSON-LD strings | No |
| `additionalMeta` | `Array<{name, content}>` | Meta tags adicionales | No |

\* Si no se proporciona, se usa el valor por defecto de `DEFAULT_SEO` en `/src/constants/seo.ts`.

---

## Datos Estructurados (JSON-LD)

### Tipos de Schema Disponibles

#### 1. Organization Schema

Representa a LIMA como organización.

```tsx
import { generateOrganizationSchema, schemaToJsonLd } from "@/lib/seo";

const orgSchema = schemaToJsonLd(generateOrganizationSchema());
```

#### 2. LocalBusiness Schema

Extiende Organization con información de negocio local (ubicación, horarios, etc.).

```tsx
import { generateLocalBusinessSchema, schemaToJsonLd } from "@/lib/seo";

const businessSchema = schemaToJsonLd(generateLocalBusinessSchema());
```

**Recomendación:** Usar `LocalBusiness` en la página de inicio o contacto.

#### 3. BreadcrumbList Schema

Crea migas de pan para navegación jerárquica.

```tsx
import { generateBreadcrumbSchema, generateBreadcrumbs, schemaToJsonLd } from "@/lib/seo";

const breadcrumbs = generateBreadcrumbs("/servicios/granallado");
const breadcrumbSchema = schemaToJsonLd(generateBreadcrumbSchema(breadcrumbs));
```

### Combinar Múltiples Schemas

```tsx
import {
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateBreadcrumbs,
  schemaToJsonLd,
} from "@/lib/seo";

const MiPagina = () => {
  const businessSchema = schemaToJsonLd(generateLocalBusinessSchema());
  const breadcrumbSchema = schemaToJsonLd(
    generateBreadcrumbSchema(generateBreadcrumbs("/"))
  );

  return (
    <Seo
      title="Mi Página"
      description="Descripción"
      canonical="/"
      structuredData={[businessSchema, breadcrumbSchema]}
    />
  );
};
```

---

## Agregar Nuevas Páginas

### Paso 1: Definir Metadata

Edita `/src/constants/seo.ts` y agrega una nueva entrada en `PAGE_METADATA`:

```typescript
export const PAGE_METADATA: Record<string, PageMetadata> = {
  home: { /* ... */ },
  notFound: { /* ... */ },

  // Nueva página
  servicios: {
    title: "Nuestros Servicios | LIMA",
    description: "Equipos de granallado, colectores de polvo y más. Distribuidor exclusivo GOFF y CARRIER en México.",
    keywords: ["granallado", "colectores de polvo", "equipos vibratorios", "GOFF", "CARRIER"],
    image: "/servicios-og.jpg",
  },
};
```

### Paso 2: Crear el Componente de Página

```tsx
// src/pages/Servicios.tsx
import { Seo } from "@/lib/seo";
import { PAGE_METADATA } from "@/constants/seo";

const Servicios = () => {
  return (
    <div>
      <Seo
        title={PAGE_METADATA.servicios.title}
        description={PAGE_METADATA.servicios.description}
        keywords={PAGE_METADATA.servicios.keywords}
        canonical="/servicios"
        image={PAGE_METADATA.servicios.image}
      />
      <main>
        <h1>Nuestros Servicios</h1>
        {/* Contenido */}
      </main>
    </div>
  );
};

export default Servicios;
```

### Paso 3: Agregar Ruta en App.tsx

```tsx
// src/App.tsx
import Servicios from "./pages/Servicios";

<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/servicios" element={<Servicios />} />
  {/* ... */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Paso 4: Actualizar sitemap.xml

Edita `/public/sitemap.xml` y agrega la nueva URL:

```xml
<url>
  <loc>https://www.lima.com.mx/servicios</loc>
  <lastmod>2025-11-02</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
  <xhtml:link rel="alternate" hreflang="es-MX" href="https://www.lima.com.mx/servicios" />
  <xhtml:link rel="alternate" hreflang="x-default" href="https://www.lima.com.mx/servicios" />
</url>
```

### Paso 5: Actualizar Mapa de Rutas (Opcional)

Si usas breadcrumbs personalizados, edita la función `getRouteMetadataKey()` en `/src/lib/seo/utils.ts`:

```typescript
const pathToKeyMap: Record<string, string> = {
  "/": "home",
  "/servicios": "servicios",
  // ...
};
```

---

## Página 404

La página 404 (`/src/pages/NotFound.tsx`) está completamente optimizada:

### Características SEO

- **Meta tag `noindex,follow`:** Evita indexación pero permite seguir enlaces
- **Canonical URL:** Apunta a la ruta intentada (registra el error)
- **Contenido en español:** Mensajes claros y CTAs útiles
- **Información de contacto:** Email y teléfono incluidos

### Características UX

- **Diseño consistente:** Usa logo LIMA, colores y tipografías del sitio
- **Botones de acción:**
  - "Volver al inicio" (Link a `/`)
  - "Página anterior" (window.history.back)
- **Accesibilidad:** Semántica HTML correcta, enlaces focusables
- **Responsive:** Mobile-first design

### Personalizar la Página 404

Edita `/src/constants/seo.ts`:

```typescript
notFound: {
  title: "Página no encontrada | LIMA",
  description: "La página que buscas no existe o fue movida. Vuelve al inicio para explorar nuestros servicios.",
  noindex: true,
  nofollow: false,
},
```

Y `/src/pages/NotFound.tsx` para cambiar el diseño o mensajes.

---

## Sitemap y Robots.txt

### Sitemap.xml

**Ubicación:** `/public/sitemap.xml`

**Formato:** XML siguiendo el protocolo Sitemaps 0.9

**Contenido actual:**
- Homepage (`/`)
- Excluye 404 y páginas noindex

**Actualización:**
- **Manual:** Edita el archivo XML directamente
- **Automático (futuro):** Considera usar `vite-plugin-sitemap` o generar durante el build

**Campos importantes:**
- `<loc>`: URL completa (https://www.lima.com.mx/ruta)
- `<lastmod>`: Fecha de última modificación (YYYY-MM-DD)
- `<changefreq>`: Frecuencia de cambio (monthly recomendado para B2B)
- `<priority>`: Importancia relativa (1.0 = máxima, 0.8 = alta, 0.5 = media)
- `<xhtml:link>`: Alternativas de idioma (hreflang)

### Robots.txt

**Ubicación:** `/public/robots.txt`

**Configuración actual:**
- Permite todos los bots (`User-agent: *`, `Allow: /`)
- Referencia sitemap: `Sitemap: https://www.lima.com.mx/sitemap.xml`
- Configuraciones específicas para Googlebot, Bingbot, Twitterbot, Facebook

**Bloquear secciones (ejemplo):**

```
User-agent: *
Disallow: /admin/
Disallow: /privado/
Allow: /
```

---

## Validación SEO

### 1. Google Search Console

1. **Agregar propiedad:** https://search.google.com/search-console
2. **Verificar dominio:** Subir archivo HTML o agregar DNS TXT record
3. **Enviar sitemap:** `https://www.lima.com.mx/sitemap.xml`
4. **Monitorear:**
   - Cobertura de índice
   - Errores de rastreo
   - Mejoras (Core Web Vitals, usabilidad móvil)

### 2. Validar Datos Estructurados

**Google Rich Results Test:**
- URL: https://search.google.com/test/rich-results
- Ingresa la URL de tu página o pega el HTML
- Verifica que Organization/LocalBusiness sea válido

**Schema Markup Validator:**
- URL: https://validator.schema.org/
- Valida sintaxis JSON-LD

### 3. Validar Open Graph

**Facebook Sharing Debugger:**
- URL: https://developers.facebook.com/tools/debug/
- Ingresa tu URL y verifica preview
- Usa "Scrape Again" para refrescar caché

**Twitter Card Validator:**
- URL: https://cards-dev.twitter.com/validator
- Verifica que la tarjeta se vea correctamente

### 4. Lighthouse (Chrome DevTools)

1. Abre Chrome DevTools (F12)
2. Ve a la pestaña "Lighthouse"
3. Selecciona "SEO" + "Performance" + "Accessibility"
4. Ejecuta auditoría (modo Desktop o Mobile)

**Objetivo:** SEO score ≥ 95

**Problemas comunes:**
- Falta H1 ✅ (Resuelto: agregado en Hero.tsx:21)
- Meta description muy larga/corta (ideal: 150-160 caracteres)
- Links sin texto descriptivo
- Imágenes sin atributo `alt`

### 5. Validar Sitemap

**XML Sitemap Validator:**
- URL: https://www.xml-sitemaps.com/validate-xml-sitemap.html
- Verifica sintaxis y URLs accesibles

**Google Search Console:**
- Sección "Sitemaps" → ingresar `/sitemap.xml`
- Verificar URLs descubiertas vs. enviadas

### 6. Herramientas Adicionales

- **Screaming Frog SEO Spider** (Desktop app): Auditoría completa de crawling
- **Ahrefs Site Audit** (Pago): Análisis profundo SEO
- **SEMrush** (Pago): Keywords, backlinks, competencia
- **Google PageSpeed Insights**: Performance + Core Web Vitals

---

## Tareas Pendientes

### 🔧 Antes de Lanzar a Producción

- [ ] **Actualizar URL de producción**
  - Editar `/src/constants/site.ts` → `urls.production` (actualmente: `https://www.lima.com.mx`)
  - Editar `/public/sitemap.xml` → reemplazar todas las URLs
  - Editar `/public/robots.txt` → verificar URL del sitemap

- [ ] **Generar favicons en múltiples tamaños**
  - Herramienta recomendada: [RealFaviconGenerator](https://realfavicongenerator.net/)
  - Subir logo LIMA (src/assets/lima-logo.png)
  - Descargar paquete completo y reemplazar en `/public/`:
    - `favicon.ico` (16x16, 32x32, 48x48)
    - `favicon-16x16.png`
    - `favicon-32x32.png`
    - `apple-touch-icon.png` (180x180)
    - `manifest.json` (opcional, para PWA)

- [ ] **Crear imagen Open Graph optimizada**
  - Tamaño recomendado: 1200x630 px
  - Formato: JPG o PNG
  - Incluir: Logo LIMA, tagline, fondo industrial
  - Guardar en: `/public/og-image.jpg`
  - Actualizar `/src/constants/seo.ts` → `DEFAULT_SEO.image = "/og-image.jpg"`

- [ ] **Completar información de empresa** (si disponible)
  - Dirección completa en `/src/constants/site.ts` → `location.address`
  - Coordenadas GPS para LocalBusiness schema
    - Editar `/src/lib/seo/structuredData.ts` → descomentar sección `geo`
    - Obtener coordenadas: [Google Maps](https://www.google.com/maps)
  - Redes sociales (Facebook, Instagram, LinkedIn) en `site.ts` → `social`

- [ ] **Configurar Google Analytics / Google Tag Manager**
  - Crear cuenta en [Google Analytics](https://analytics.google.com/)
  - Obtener ID de medición (G-XXXXXXXXXX)
  - Instalar: `npm install react-ga4`
  - Integrar en `App.tsx` o usar GTM con custom hook

- [ ] **Registrar en Google Search Console**
  - Verificar propiedad del sitio
  - Enviar sitemap.xml
  - Configurar alertas de errores de rastreo

- [ ] **Probar en dispositivos reales**
  - iOS Safari (iPhone)
  - Android Chrome
  - Desktop (Chrome, Firefox, Safari)
  - Verificar meta tags, favicons, y performance

### 🌍 Expansión Internacional (Opcional)

Si en el futuro se agrega versión en inglés:

1. **Agregar rutas en inglés**
   - Estrategia recomendada: subdirectorio (`/en/about`)
   - Alternativa: parámetro de query (`?lang=en`)

2. **Actualizar configuración de idiomas**
   ```typescript
   // src/constants/seo.ts
   export const LANGUAGES = {
     primary: "es-MX",
     supported: ["es-MX", "en-US"],
     default: "es-MX",
   };
   ```

3. **Actualizar componente SEO**
   - Componente `<Seo />` ya genera hreflang automáticamente
   - Solo agregar rutas alternativas en el sitemap

4. **Crear metadata en inglés**
   ```typescript
   // src/constants/seo.ts
   homeEN: {
     title: "LIMA - Metal Cleaning | Metal Mechanical Industry since 1981",
     description: "Exclusive distributor of GOFF shot blasting equipment and CARRIER vibratory equipment in Mexico.",
     // ...
   },
   ```

---

## Buenas Prácticas

### SEO On-Page

1. **Un H1 por página**
   - ✅ Homepage tiene H1 en `/src/components/Hero.tsx:21` (sr-only para accesibilidad)
   - Asegúrate de que nuevas páginas tengan exactamente un H1 visible o sr-only

2. **Jerarquía de encabezados**
   - Usar H2 para secciones principales
   - H3 para subsecciones
   - No saltar niveles (H1 → H3 ❌)

3. **Meta descriptions únicas**
   - Longitud ideal: 150-160 caracteres
   - Incluir llamado a la acción (CTA)
   - Usar palabras clave naturalmente

4. **URLs limpias y descriptivas**
   - ✅ Bueno: `/servicios/granallado`
   - ❌ Malo: `/page?id=123&cat=2`

5. **Imágenes optimizadas**
   - Atributo `alt` descriptivo en TODAS las imágenes
   - Formato WebP para mejor compresión (fallback JPG/PNG)
   - Lazy loading: `<img loading="lazy" />`
   - Tamaño adecuado (evitar imágenes de 5MB)

6. **Enlaces internos**
   - Usar texto descriptivo (evitar "click aquí")
   - Mantener estructura lógica de enlaces
   - Verificar que no haya enlaces rotos (404)

### SEO Técnico

1. **Performance**
   - Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
   - Minificar CSS/JS (Vite lo hace automáticamente)
   - Comprimir imágenes (TinyPNG, Squoosh)
   - Usar CDN para assets estáticos

2. **Mobile-First**
   - Diseño responsive (Bootstrap/Tailwind)
   - Touch targets ≥ 48x48 px
   - Fuentes legibles (≥ 16px en mobile)

3. **Seguridad**
   - HTTPS siempre (certificado SSL)
   - Headers de seguridad (CSP, X-Frame-Options)
   - Actualizar dependencias regularmente

4. **Canonical URLs**
   - Siempre usar URLs absolutas en canonical
   - ✅ Correcto: `https://www.lima.com.mx/servicios`
   - ❌ Incorrecto: `/servicios` (relativo)

### Contenido

1. **Palabras clave**
   - Investigar con Google Keyword Planner o Ubersuggest
   - Enfocarse en long-tail keywords (ej: "granalladoras GOFF Monterrey")
   - Incluir naturalmente en título, H1, primer párrafo

2. **Contenido de calidad**
   - Mínimo 300 palabras por página (ideal: 500-1000)
   - Responder preguntas de usuarios (FAQ)
   - Actualizar contenido regularmente

3. **Localización**
   - Incluir ciudad/región en metadata (Monterrey, Nuevo León)
   - Google My Business para SEO local
   - Obtener backlinks de directorios locales

---

## Recursos Adicionales

### Documentación Oficial

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Guide](https://developer.twitter.com/en/docs/twitter-for-websites/cards)

### Herramientas

- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### Librerías Utilizadas

- [react-helmet-async](https://www.npmjs.com/package/react-helmet-async) - Gestión de meta tags

---

## Soporte

Para preguntas o problemas relacionados con esta implementación SEO:

1. **Revisar esta documentación primero**
2. **Verificar la configuración en:**
   - `/src/constants/site.ts` (datos de empresa)
   - `/src/constants/seo.ts` (metadata de páginas)
3. **Consultar el código fuente en:**
   - `/src/lib/seo/Seo.tsx` (componente principal)
   - `/src/lib/seo/structuredData.ts` (JSON-LD)

---

**Última actualización:** 2 de noviembre de 2025
**Versión:** 1.0.0
**Autor:** Implementación SEO para LIMA - Limpieza de Metales
