import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contacto" className="py-24 bg-industrial-light-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contacto
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6" />
          <p className="font-body text-lg text-muted-foreground">
            Estamos aquí para ayudarte con tus necesidades industriales
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground mb-1">
                      Email
                    </p>
                    <p className="font-body text-muted-foreground">
                      info@lima.com.mx
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground mb-1">
                      Teléfono
                    </p>
                    <p className="font-body text-muted-foreground">
                      (81) 8351-0648
                    </p>
                    <p className="font-body text-muted-foreground">
                      (81) 8351-4881
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground mb-1">
                      WhatsApp
                    </p>
                    <p className="font-body text-muted-foreground">
                      (81) 1910-3216
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground mb-1">
                      Ubicación
                    </p>
                    <p className="font-body text-muted-foreground">
                      Monterrey, NL, 64410
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-industrial-dark text-primary-foreground rounded-lg">
              <h4 className="font-heading text-xl font-semibold mb-3">
                Horario de Atención
              </h4>
              <p className="font-body text-primary-foreground/80">
                Lunes a Viernes: 8:00 AM - 6:00 PM
              </p>
              <p className="font-body text-primary-foreground/80">
                Sábado: 9:00 AM - 2:00 PM
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg border border-border">
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">
              Envíanos un Mensaje
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">
                  Nombre
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="font-body"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="font-body"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">
                  Teléfono
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="font-body"
                  placeholder="(33) 1234-5678"
                />
              </div>

              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">
                  Mensaje
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="font-body min-h-32"
                  placeholder="¿Cómo podemos ayudarte?"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold"
              >
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
