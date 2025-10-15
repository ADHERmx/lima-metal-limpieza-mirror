import { Wrench, Zap, Package, Layers } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Wrench,
      title: "Equipos de Granallado",
      description: "Granalladoras y equipos de sand blasteo de última generación",
    },
    {
      icon: Zap,
      title: "Colectores de Polvo",
      description: "Sistemas de recolección y filtración industrial",
    },
    {
      icon: Package,
      title: "Equipos Vibratorios",
      description: "Transportadores, alimentadores y shakeouts CARRIER",
    },
    {
      icon: Layers,
      title: "Distribución GOFF",
      description: "Representante exclusivo de granalladoras GOFF desde 1981",
    },
  ];

  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nuestros Servicios
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6" />
          <p className="font-body text-lg text-muted-foreground">
            Soluciones integrales para la industria metal mecánica y fundición
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-card border border-border hover:border-accent transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="font-body text-muted-foreground">
                {service.description}
              </p>
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
      </div>
    </section>
  );
};

export default Services;
