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

// Project Card Component with Nasser Ali inspired Motion Design
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring physics for smooth transformations
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);

  // Parallax for image (opposite direction)
  const imageX = useSpring(useTransform(mouseX, [0, 1], [15, -15]), springConfig);
  const imageY = useSpring(useTransform(mouseY, [0, 1], [15, -15]), springConfig);

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

  // Stagger delay for content reveal
  const getStaggerDelay = (itemIndex: number) => itemIndex * 0.08;

  return (
    <motion.div
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
      className="relative group perspective-1000"
    >
      {/* Enhanced Glassmorphism Card */}
      <div className="relative bg-background/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden h-full transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-primary/5">

        {/* Image Container with Parallax */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            style={{
              x: imageX,
              y: imageY,
            }}
            className="w-full h-full"
          >
            {/* Image with scale(1.2) base */}
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ scale: 1.2 }}
              animate={{
                filter: isHovered ? "brightness(1.15) saturate(1.2)" : "brightness(1) saturate(0.95)"
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            />
          </motion.div>

          {/* Subtle gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="relative p-6 space-y-4">
          {/* Title - Always visible, moves up on hover */}
          <motion.h3
            animate={{
              y: isHovered ? -8 : 0
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="text-2xl font-bold text-foreground leading-tight relative z-10"
          >
            {project.title}
          </motion.h3>

          {/* Description - Hidden by default, revealed on hover */}
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
              y: isHovered ? 0 : 10
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              delay: getStaggerDelay(0)
            }}
            className="text-foreground-muted leading-relaxed text-sm overflow-hidden"
          >
            {project.description}
          </motion.p>

          {/* Technologies - Hidden by default, revealed on hover with stagger */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              delay: getStaggerDelay(1)
            }}
            className="flex flex-wrap gap-2 overflow-hidden"
          >
            {project.technologies.map((tech: string, idx: number) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.8
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  delay: getStaggerDelay(1) + (idx * 0.05)
                }}
                className="skill-tag px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Buttons - Hidden by default, revealed on hover */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
              y: isHovered ? 0 : 10
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              delay: getStaggerDelay(2)
            }}
            className="flex gap-4 pt-2 overflow-hidden"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative group/btn p-3 rounded-full bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all duration-300"
              aria-label="Ver Demo"
            >
              <ExternalLink className="h-5 w-5 text-primary" />
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 -z-10"></div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative group/btn p-3 rounded-full bg-foreground/5 border border-foreground/20 hover:bg-foreground/10 transition-all duration-300"
              aria-label="Ver Código"
            >
              <Github className="h-5 w-5 text-foreground" />
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 rounded-full bg-foreground/20 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 -z-10"></div>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Subtle outer glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl"></div>
    </motion.div>
  );
};

export default Projects;