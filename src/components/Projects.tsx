import { ExternalLink, Github } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
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
      gradient: "from-blue-500/20 via-cyan-500/10 to-transparent"
    },
    {
      title: "Automação de Fluxos de Trabalho em TI",
      description: "Solução implementada com Power Automate e scripts Python para automatizar a geração de relatórios e a gestão de tarefas, otimizando o fluxo de trabalho da equipe e reduzindo o trabalho manual.",
      technologies: ["Power Automate", "Python", "Microsoft 365"],
      image: automationImage,
      gradient: "from-green-500/20 via-emerald-500/10 to-transparent"
    },
    {
      title: "Portal de Gestão de Chamados",
      description: "Interface web desenvolvida com Vue.js para abertura e acompanhamento de tickets de TI, integrada a um backend customizado do GLPI 10 para otimizar a experiência do usuário.",
      technologies: ["Vue.js 3", "JavaScript", "GLPI 10", "Tailwind CSS"],
      image: portalImage,
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent"
    }
  ];

  return (
    <section id="projetos" className="min-h-screen flex items-center justify-center section-padding bg-background-secondary">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold hero-text mb-6">
            Projetos em Destaque
          </h2>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Seleção dos meus trabalhos mais impactantes e inovadores
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Project Card Component - Nasser Ali Style: Clean, Centered, Always Visible
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring physics for smooth transformations
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
        delay: index * 0.15
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group h-full"
    >
      {/* Card Container with fixed height - Nasser Style */}
      <div className="relative bg-background/5 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:border-white/15 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-[520px]">

        {/* Image Section - ~60% of card height */}
        <div className="relative h-[60%] overflow-hidden flex items-center justify-center p-6">
          {/* Background image - blurred */}
          <div className="absolute inset-0">
            <img
              src={project.image}
              alt=""
              className="w-full h-full object-cover blur-sm opacity-40"
            />
            {/* Color Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`}></div>
            <div className="absolute inset-0 bg-background/60"></div>
          </div>

          {/* Main image - centered and elevated */}
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
              y: isHovered ? -10 : 0
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="relative z-10 w-[85%] h-[85%] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Category Label - Top Center */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0.7,
              y: isHovered ? 0 : 5
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="absolute top-6 left-0 right-0 flex justify-center z-20"
          >

          </motion.div>
        </div>

        {/* Content Section - ~40% of card, always visible */}
        <div className="relative flex-1 p-6 flex flex-col justify-between bg-gradient-to-t from-background via-background/95 to-background/80">
          <div>
            {/* Title - Always visible */}
            <h3 className="text-xl font-bold text-foreground leading-tight tracking-wide mb-2">
              {project.title}
            </h3>

            {/* Description - Fades in on hover */}
            <motion.p
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? "auto" : 0
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="text-foreground-muted text-xs leading-relaxed overflow-hidden mb-3"
            >
              {project.description}
            </motion.p>
          </div>

          {/* Technologies Tags - Always partially visible */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies.slice(0, 3).map((tech: string) => (
              <motion.span
                key={tech}
                animate={{
                  opacity: isHovered ? 1 : 0.6,
                  scale: isHovered ? 1 : 0.95
                }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Buttons - Fade in on hover */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.05 }}
            className="flex gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative group/btn p-3 rounded-full bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all duration-300"
              aria-label="Ver Demo"
            >
              <ExternalLink className="h-4 w-4 text-primary" />
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 -z-10"></div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative group/btn p-3 rounded-full bg-foreground/5 border border-foreground/20 hover:bg-foreground/10 transition-all duration-300"
              aria-label="Ver Código"
            >
              <Github className="h-4 w-4 text-foreground" />
              <div className="absolute inset-0 rounded-full bg-foreground/20 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 -z-10"></div>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Subtle outer glow on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl"></div>
    </motion.article>
  );
};

export default Projects;