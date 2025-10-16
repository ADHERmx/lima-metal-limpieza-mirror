import heroImage from "@/assets/hero-goff.jpg";
import limaLogoWhite from "@/assets/lima-logo-white.png";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-dark/90 to-industrial-dark/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <img 
            src={limaLogoWhite} 
            alt="LIMA - Limpieza de Metales" 
            className="h-24 md:h-32 w-auto mb-8"
          />
          <div className="h-1 w-24 bg-accent mb-6" />
          <p className="font-body text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Dedicados a servir la industria metal mecánica y fundición desde 1981
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() =>
                document.getElementById("nosotros")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold transition-all transform hover:scale-105"
            >
              Conocer Más
            </button>
            <button
              onClick={() =>
                document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
              }
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
