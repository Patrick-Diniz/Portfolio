import { Database, Code, Settings, BarChart3, Globe, Terminal } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Análise de Dados",
      icon: BarChart3,
      skills: ["Python", "Power BI", "SQL", "Excel"],
      color: "text-blue-400"
    },
    {
      title: "Desenvolvimento",
      icon: Code,
      skills: ["Vue.js 3", "JavaScript", "HTML5", "CSS3", "Sass", "Tailwind CSS"],
      color: "text-green-400"
    },
    {
      title: "Ferramentas e Sistemas",
      icon: Settings,
      skills: ["Microsoft 365 Admin", "GLPI 10", "Power Automate", "Git", "Linux"],
      color: "text-orange-400"
    }
  ];

  return (
    <section id="habilidades" className="min-h-screen flex items-center justify-center section-padding bg-background ">
      <div className="container-width relative -top-5">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold hero-text mb-6">
            Habilidades Técnicas
          </h2>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Tecnologias e ferramentas que uso para criar soluções inovadoras
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={category.title}
              className="glass-card p-8 rounded-2xl animate-scale-in hover:shadow-purple transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-xl bg-primary/10 ${category.color} mr-4`}>
                  <category.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="skill-tag px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Section */}
        <div className="mt-16 text-center animate-fade-in">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            Outras Competências
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              "Análise Estatística", "Dashboard Design", "Automação de Processos", 
              "Gestão de Banco de Dados", "Metodologias Ágeis", "DevOps Básico",
              "API Integration", "Troubleshooting", "Documentação Técnica"
            ].map((skill) => (
              <span 
                key={skill}
                className="skill-tag px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary/20 hover:scale-105"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;