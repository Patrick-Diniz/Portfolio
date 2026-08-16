import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Works from "@/components/Works";
import About from "@/components/About";
import Manifesto from "@/components/Manifesto";
import Contact from "@/components/Contact";
import { useReveal } from "@/hooks/useReveal";

/**
 * Ordem definitiva da página. O design novo não tem seção Skills separada — a
 * stack vive dentro de Sobre — nem Footer separado: a barra final é do Contato.
 * ScrollToTop saiu; a nav fixa resolve.
 */
const Index = () => {
  useReveal();

  return (
    <div className="dark relative bg-void text-ink [overflow-x:clip]">
      <Preloader />
      <Navigation />
      <Hero />
      <Marquee />
      <Works />
      <About />
      <Manifesto />
      <Contact />
    </div>
  );
};

export default Index;
