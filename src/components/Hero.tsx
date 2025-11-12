import heroImageWebP from "@/assets/hero-goff.webp";
import heroImageJPEG from "@/assets/hero-goff-optimized.jpg";
import limaLogoWhiteWebP from "@/assets/lima-logo-white.webp";
import limaLogoWhitePNG from "@/assets/lima-logo-white-optimized.png";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* SEO-optimized hero background with WebP + JPEG fallback */}
      <picture className="absolute inset-0">
        <source srcSet={heroImageWebP} type="image/webp" />
        <img
          src={heroImageJPEG}
          alt="Maquinaria industrial GOFF - Equipos de granallado y limpieza de metales"
          className="absolute inset-0 w-full h-full object-cover"
          width="1920"
          height="1080"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-r from-industrial-dark/90 to-industrial-dark/70" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* SEO-optimized logo with WebP + PNG fallback, larger size from server design */}
          <picture>
            <source srcSet={limaLogoWhiteWebP} type="image/webp" />
            <img
              src={limaLogoWhitePNG}
              alt="LIMA - Limpieza de Metales"
              className="h-48 md:h-64 lg:h-72 w-auto mb-4 drop-shadow-2xl animate-fade-in"
              width="240"
              height="96"
            />
          </picture>
          <h1 className="sr-only">LIMA - Limpieza de Metales | Industria Metal Mecánica desde 1981</h1>
          <div className="h-1 w-24 bg-accent mb-6" />
          <p className="font-body text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Dedicados a servir la industria metal mecánica y fundición desde 1981
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() =>
                document.getElementById("nosotros")?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label="Navegar a la sección Acerca de nosotros"
              className="px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold transition-all transform hover:scale-105"
            >
              Conocer Más
            </button>
            <button
              onClick={() =>
                document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label="Navegar a la sección de contacto"
              className="px-8 py-4 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-industrial-dark font-heading font-semibold transition-all"
            >
              Contacto
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
