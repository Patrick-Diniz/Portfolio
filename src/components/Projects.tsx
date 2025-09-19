import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardImage from "@/assets/project-dashboard.webp";
import automationImage from "@/assets/project-automation.webp";
import portalImage from "@/assets/project-portal.webp";

const Projects = () => {
  const projects = [
    {
      title: "Dashboard de Análise Contratual",
      description: "Dashboard interativo em Power BI para análise de métricas e KPIs de contratos, permitindo a identificação de oportunidades e a geração de relatórios estratégicos.",
      technologies: ["Power BI", "SQL", "Python", "Excel"],
      image: dashboardImage,
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Automação de Fluxos de Trabalho em TI",
      description: "Solução implementada com Power Automate e scripts Python para automatizar a geração de relatórios e a gestão de tarefas, otimizando o fluxo de trabalho da equipe e reduzindo o trabalho manual.",
      technologies: ["Power Automate", "Python", "Microsoft 365"],
      image: automationImage, 
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Portal de Gestão de Chamados",
      description: "Interface web desenvolvida com Vue.js para abertura e acompanhamento de tickets de TI, integrada a um backend customizado do GLPI 10 para otimizar a experiência do usuário.",
      technologies: ["Vue.js 3", "JavaScript", "GLPI 10", "Tailwind CSS"],
      image: portalImage,
      gradient: "from-purple-500/20 to-pink-500/20"
    }
  ];

  return (
    <section id="projetos" className="min-h-screen flex items-center justify-center section-padding bg-background-secondary">
      <div className="container-width">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold hero-text mb-6">
            Projetos em Destaque
          </h2>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Seleção dos meus trabalhos mais impactantes e inovadores
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="project-card p-6 rounded-2xl animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Project Image */}
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`}></div>
                <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]"></div>
              </div>

              {/* Project Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground leading-tight">
                  {project.title}
                </h3>
                
                <p className="text-foreground-muted leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="skill-tag px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-foreground-muted text-foreground-muted hover:bg-foreground-muted hover:text-background"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Código
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        
      </div>
    </section>
  );
};

export default Projects;