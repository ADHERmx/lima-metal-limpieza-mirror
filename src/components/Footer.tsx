const Footer = () => {
  return (
    <footer className="bg-industrial-dark text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4">LIMA</h3>
            <p className="font-body text-primary-foreground/70 text-sm">
              Dedicados a servir la industria metal mecánica y fundición desde 1981
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 font-body text-sm">
              <li>
                <button
                  onClick={() =>
                    document.getElementById("nosotros")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  Nosotros
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-center font-body text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} LIMA - Limpieza de Metales. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
