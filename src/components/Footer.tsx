import { Heart, Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background-secondary border-t border-border py-8">
      <div className="container-width">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-foreground-muted">
            <p>Desenvolvido com</p>
            <Heart className="h-4 w-4 text-red-400 animate-pulse" />
            <p>por Patrick Diniz</p>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-foreground-muted">
            <div className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <span>React</span>
            </div>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Tailwind CSS</span>
          </div>
          
          <p className="text-sm text-foreground-muted">
            © {new Date().getFullYear()} Patrick Diniz. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;