import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Seo } from "@/lib/seo";
import { PAGE_METADATA } from "@/constants/seo";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import limaLogo from "@/assets/lima-logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Seo
        title={PAGE_METADATA.notFound.title}
        description={PAGE_METADATA.notFound.description}
        canonical={location.pathname}
        noindex={true}
        nofollow={false}
      />

      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          {/* LIMA Logo */}
          <img
            src={limaLogo}
            alt="LIMA"
            className="h-20 w-auto mx-auto mb-8"
          />

          {/* 404 Error Message */}
          <div className="mb-8">
            <h1 className="font-heading text-8xl md:text-9xl font-bold text-industrial-dark mb-4">
              404
            </h1>
            <div className="h-1 w-24 bg-accent mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-industrial-dark mb-4">
              Página no encontrada
            </h2>
            <p className="font-body text-lg text-industrial-gray max-w-md mx-auto">
              La página que buscas no existe o fue movida. Regresa al inicio para explorar nuestros
              servicios de granallado y equipos industriales.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold"
            >
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Volver al inicio
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-heading font-semibold"
              onClick={() => window.history.back()}
            >
              <button>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Página anterior
              </button>
            </Button>
          </div>

          {/* Additional Help */}
          <div className="mt-12 pt-8 border-t border-industrial-light-gray">
            <p className="font-body text-sm text-industrial-gray mb-4">
              ¿Necesitas ayuda? Contáctanos:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
              <a
                href="mailto:info@lima.com.mx"
                className="text-accent hover:text-accent/80 font-semibold transition-colors"
              >
                info@lima.com.mx
              </a>
              <span className="hidden sm:inline text-industrial-gray">|</span>
              <a
                href="tel:+528183510648"
                className="text-accent hover:text-accent/80 font-semibold transition-colors"
              >
                +52 (81) 8351-0648
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
