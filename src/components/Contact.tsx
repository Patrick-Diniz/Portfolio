import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "patricksdiniz@gmail.com",
      href: "mailto:patricksdiniz@gmail.com",
      color: "text-red-400"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "diniz-patrick",
      href: "https://www.linkedin.com/in/diniz-patrick/",
      color: "text-blue-400"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "patrick-diniz",
      href: "https://github.com/patrick-diniz",
      color: "text-gray-400"
    }
  ];

  return (
    <section id="contato" className="section-padding bg-background">
      <div className="container-width">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold hero-text mb-6">
            Vamos Conversar!
          </h2>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Estou aberto a novas oportunidades e desafios. Entre em contato para discutirmos como minhas habilidades podem agregar valor à sua equipe.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8 animate-slide-in-left">
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-foreground mb-8">
                  Informações de Contato
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((contact) => (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-card-hover transition-all duration-300 hover:shadow-md group"
                    >
                      <div className={`p-3 rounded-xl bg-primary/10 ${contact.color} group-hover:scale-110 transition-transform duration-300`}>
                        <contact.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-sm text-foreground-muted font-medium">
                          {contact.label}
                        </div>
                        <div className="text-foreground font-semibold">
                          {contact.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="glass-card p-6 rounded-2xl">
                <h4 className="text-lg font-bold text-foreground mb-4">
                  Disponibilidade
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-foreground-muted">Disponível para projetos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-foreground-muted">Rio de Janeiro, RJ</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-foreground-muted">Remoto/Híbrido</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="animate-slide-in-right">
              <div className="glass-card p-8 rounded-2xl h-full flex flex-col justify-center">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="h-10 w-10 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground">
                    Pronto para Colaborar?
                  </h3>
                  
                  <p className="text-foreground-muted">
                    Seja para uma oportunidade de trabalho, consultoria ou simplesmente uma conversa sobre tecnologia, estou sempre interessado em novas conexões.
                  </p>

                  <div className="space-y-4">
                    <Button 
                      className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold py-3 transition-all duration-300 hover:shadow-purple"
                      asChild
                    >
                      <a href="mailto:patricksdiniz@gmail.com">
                        <Mail className="mr-2 h-5 w-5" />
                        Enviar Email
                      </a>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold py-3"
                      asChild
                    >
                      <a 
                        href="https://www.linkedin.com/in/diniz-patrick/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="mr-2 h-5 w-5" />
                        Conectar no LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;