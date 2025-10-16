import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import limaLogo from "@/assets/lima-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img 
              src={limaLogo} 
              alt="LIMA - Limpieza de Metales" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("nosotros")}
              className="text-foreground hover:text-accent transition-colors font-body"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-foreground hover:text-accent transition-colors font-body"
            >
              Servicios
            </button>
            <Button
              onClick={() => scrollToSection("contacto")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading"
            >
              Contacto
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <button
              onClick={() => scrollToSection("nosotros")}
              className="block w-full text-left text-foreground hover:text-accent transition-colors font-body py-2"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("servicios")}
              className="block w-full text-left text-foreground hover:text-accent transition-colors font-body py-2"
            >
              Servicios
            </button>
            <Button
              onClick={() => scrollToSection("contacto")}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-heading"
            >
              Contacto
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
