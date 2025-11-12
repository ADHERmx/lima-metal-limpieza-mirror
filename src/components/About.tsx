import { Factory, TrendingUp, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref, isVisible } = useScrollAnimation();
  const milestones = [
    {
      year: "1981",
      title: "Fundación",
      description:
        "LIMA es fundada en Monterrey en asociación con GOFF y BCP, para satisfacer la creciente demanda de granallado (shot blast) en el país.",
      icon: Factory,
    },
    {
      year: "500+",
      title: "Equipos Vendidos",
      description:
        "Desde su fundación en 1981, LIMA ha vendido más de quinientos equipos para la industria metal mecánica en México, principalmente equipos de granallado, sand blasteo, colectores de polvo, transportadores vibratorios, alimentadores, shakeouts, entre otros.",
      icon: TrendingUp,
    },
    {
      year: "Presente",
      title: "Distribución Exclusiva",
      description:
        "Distribución de equipos e insumos para la industria de fundición y metal mecánica en México.",
      icon: Award,
    },
  ];

  return (
    <section 
      ref={ref}
      id="nosotros" 
      className={`py-24 bg-industrial-light-gray transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nuestra Historia
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6" />
          <p className="font-body text-lg text-muted-foreground">
            Más de 40 años de excelencia en la industria metal mecánica
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {milestones.map((milestone, index) => (
            <Card
              key={index}
              className="p-8 bg-card hover:shadow-xl transition-all duration-300 border-l-4 border-l-accent"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <milestone.icon className="w-6 h-6 text-accent" />
                </div>
                <span className="font-heading text-2xl font-bold text-accent">
                  {milestone.year}
                </span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {milestone.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {milestone.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
