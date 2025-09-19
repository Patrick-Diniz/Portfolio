import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown } from "lucide-react";
import profilePhoto from "@/assets/profile_linkedin.webp";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 40; // altura aproximada do header/menu fixo
      const elementPosition = element.offsetTop - navOffset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  const scrollToProjects = () => scrollToSection("projetos");

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
        <div className="min-h-screen flex items-center -my-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* Image Column */}
            <div className="flex justify-center lg:justify-end animate-slide-in-right order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl transform rotate-6"></div>
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
                  <img
                    src={profilePhoto}
                    alt="Patrick Diniz - Analista de Dados e Desenvolvedor Web" loading="lazy"
                    className="w-full h-full object-cover shadow-2xl transition-transform duration-300 hover:scale-105 rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-3xl"></div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="space-y-8 animate-slide-in-left order-2 lg:order-1 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold hero-text leading-tight">
                  Patrick Diniz
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl text-primary font-semibold">
                  Analista de Dados &amp; Automação T.I
                </h2>
                <p className="text-base sm:text-lg text-foreground-muted max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Transformando dados em insights e automatizando processos com
                  soluções de tecnologia inovadoras e eficientes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
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
                    href="https://drive.google.com/file/d/1YgNbnXKP43306sia4YMR7_wA9-rMpM8d/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Meu Currículo
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - centralizado */}
      <div className="absolute bottom-12 inset-x-0 flex justify-center animate-bounce">
        <ChevronDown className="h-8 w-8 text-primary" />
      </div>
    </section>
  );
};

export default Hero;
