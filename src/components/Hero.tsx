import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => scrollToSection('projetos');

  return (
    <section className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-glow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full animate-ping opacity-20"></div>
          <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-primary-light rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-ping opacity-30"></div>
        </div>
      </div>

      <div className="container-width section-padding relative z-10">
        <div className="min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* Content Column */}
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold hero-text leading-tight">
                  Patrick Diniz
                </h1>
                <h2 className="text-2xl md:text-3xl text-primary font-semibold">
                  Analista de Dados | Desenvolvedor Web
                </h2>
                <p className="text-lg text-foreground-muted max-w-lg leading-relaxed">
                  Transformando dados em insights e automatizando processos com soluções de tecnologia inovadoras e eficientes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-8 py-3 transition-all duration-300 hover:shadow-purple hover:-translate-y-1"
                  onClick={scrollToProjects}
                >
                  Ver Projetos
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-3 transition-all duration-300"
                  asChild
                >
                  <a 
                    href="https://www.linkedin.com/in/diniz-patrick/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Meu LinkedIn
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Image Column */}
            <div className="flex justify-center lg:justify-end animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl transform rotate-6"></div>
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                  <img
                    src={profilePhoto}
                    alt="Patrick Diniz - Analista de Dados e Desenvolvedor Web"
                    className="w-full h-full object-cover rounded-2xl border-2 border-primary/30 shadow-2xl transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;