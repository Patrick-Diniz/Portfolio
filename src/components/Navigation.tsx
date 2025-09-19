import { useState, useEffect } from "react";
import { Menu, X, Home, User, Code, Briefcase, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { id: "hero", label: "Início", icon: Home },
    { id: "sobre", label: "Sobre", icon: User },
    { id: "habilidades", label: "Habilidades", icon: Code },
    { id: "projetos", label: "Projetos", icon: Briefcase },
    { id: "contato", label: "Contato", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 5, behavior: "smooth" });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const navOffset = 40; // antes era 40 → ajustado
        const elementPosition = element.offsetTop - navOffset;
        window.scrollTo({ top: elementPosition, behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <div className="glass-card px-6 py-3 rounded-full">
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground-muted hover:text-foreground hover:bg-primary/10"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Menu Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-6 right-6 z-50 bg-primary hover:bg-primary-dark text-primary-foreground p-3 rounded-full shadow-lg"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground-muted hover:text-foreground hover:bg-primary/10"
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="text-xl font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;
