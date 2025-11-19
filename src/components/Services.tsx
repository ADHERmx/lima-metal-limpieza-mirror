import { Layers } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import carrierLogoWebP from "@/assets/carrier-logo.webp";
import carrierLogoPNG from "@/assets/carrier-logo.png";
import goffLogoWebP from "@/assets/goff-logo.webp";
import goffLogoPNG from "@/assets/goff-logo.png";

// Import optimized gallery images (WebP with JPEG fallback)
const galleryImages = [
  { webp: new URL("@/assets/gallery/imagen-1.webp", import.meta.url).href, jpg: new URL("@/assets/gallery/imagen-1-optimized.jpg", import.meta.url).href },
  { webp: new URL("@/assets/gallery/imagen-2.webp", import.meta.url).href, jpg: new URL("@/assets/gallery/imagen-2-optimized.jpg", import.meta.url).href },
  { webp: new URL("@/assets/gallery/imagen-3.webp", import.meta.url).href, jpg: new URL("@/assets/gallery/imagen-3-optimized.jpg", import.meta.url).href },
  { webp: new URL("@/assets/gallery/imagen-4.webp", import.meta.url).href, jpg: new URL("@/assets/gallery/imagen-4-optimized.jpg", import.meta.url).href },
  { webp: new URL("@/assets/gallery/imagen-5.webp", import.meta.url).href, jpg: new URL("@/assets/gallery/imagen-5-optimized.jpg", import.meta.url).href },
  { webp: new URL("@/assets/gallery/imagen-6.webp", import.meta.url).href, jpg: new URL("@/assets/gallery/imagen-6-optimized.jpg", import.meta.url).href },
  { webp: new URL("@/assets/gallery/imagen-7.webp", import.meta.url).href, jpg: new URL("@/assets/gallery/imagen-7-optimized.jpg", import.meta.url).href },
  { webp: new URL("@/assets/gallery/imagen-8.webp", import.meta.url).href, jpg: new URL("@/assets/gallery/imagen-8-optimized.jpg", import.meta.url).href },
  { webp: new URL("@/assets/gallery/imagen-9.webp", import.meta.url).href, jpg: new URL("@/assets/gallery/imagen-9-optimized.jpg", import.meta.url).href },
  { webp: new URL("@/assets/gallery/imagen-10.webp", import.meta.url).href, jpg: new URL("@/assets/gallery/imagen-10-optimized.jpg", import.meta.url).href },
];

const Services = () => {
  const { ref, isVisible } = useScrollAnimation();

  const services = [
    {
      logoWebP: goffLogoWebP,
      logoPNG: goffLogoPNG,
      title: "Equipos de Granallado GOFF",
      description: (
        <>
          Granalladoras y equipos de sand blasteo de última generación{" "}
          <a
            href="https://www.goff-inc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            GOFF
          </a>
        </>
      ),
    },
    {
      logoWebP: carrierLogoWebP,
      logoPNG: carrierLogoPNG,
      title: "Equipos Vibratorios Carrier",
      description: (
        <>
          Transportadores de alimentadores y shakeouts{" "}
          <a
            href="https://carriervibrating.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            CARRIER
          </a>
        </>
      ),
    },
    {
      icon: Layers,
      title: "Otros",
      description: "Refacciones, insumos y servicio técnico para nuestras líneas de equipos",
    },
  ];

  return (
    <section
      ref={ref}
      id="servicios"
      className={`py-24 bg-background transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nuestros Productos
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6" />
          <p className="font-body text-lg text-muted-foreground">
            Soluciones integrales para la industria metal mecánica y fundición
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-card border border-border hover:border-accent transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors overflow-hidden">
                {service.logoWebP ? (
                  <picture>
                    <source srcSet={service.logoWebP} type="image/webp" />
                    <img
                      src={service.logoPNG}
                      alt={service.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </picture>
                ) : (
                  <service.icon className="w-8 h-8 text-accent" />
                )}
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <div className="font-body text-muted-foreground">{service.description}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-industrial-dark text-primary-foreground rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Más de 500 Equipos Instalados
            </h3>
            <p className="font-body text-primary-foreground/80 text-lg">
              Confían en nosotros las principales empresas de la industria metal mecánica en México
            </p>
          </div>
        </div>

        <div className="mt-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Galería de Equipos Manufacturados por LIMA
            </h2>
            <div className="h-1 w-24 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-card border border-border hover:border-accent transition-all duration-300 hover:shadow-xl aspect-[4/3]"
              >
                {/* SEO-optimized gallery images with WebP + JPEG fallback and lazy loading */}
                <picture>
                  <source srcSet={image.webp} type="image/webp" />
                  <img
                    src={image.jpg}
                    alt={`Equipo LIMA ${index + 1} - Maquinaria industrial manufacturada entre 1983-2008`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    width="800"
                    height="600"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
