import { motion, useMotionValue, useSpring, useTransform, useInView, type Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Database,
  FileSpreadsheet,
  PanelTop,
  Code2,
  Braces,
  Palette,
  Settings,
  Cloud,
  GitBranch,
  Terminal,
  Workflow,
  Box
} from "lucide-react";

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax effect for background text
  const scrollY = useMotionValue(0);
  const parallaxY = useSpring(useTransform(scrollY, [0, 1000], [0, -150]), {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / rect.height));
        scrollY.set(scrollProgress * 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <section
      ref={sectionRef}
      id="habilidades"
      className="min-h-screen flex items-center justify-center section-padding bg-background relative overflow-hidden py-20"
    >
      {/* Background Layer - Giant "SKILLS" text with parallax */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none"
      >
        <h1 className="text-[15rem] font-bold whitespace-nowrap">SKILLS</h1>
      </motion.div>

      <div className="container-width relative z-10">
        {/* Title with Square Atari */}
        <TitleWithSquare />

        {/* Tech Icons Grid */}
        <TechIconsGrid />

        {/* Other Skills - Floating Pills */}
        <OtherSkillsPills />
      </div>
    </section>
  );
};

// Title with Square Atari
const TitleWithSquare = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="text-center mb-16"
    >
      <div className="flex items-center justify-center gap-4 mb-6">
        {/* Square Atari */}
        <motion.div
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-4 h-4 bg-primary/50 rounded-sm"
        />

        <h2 className="text-4xl md:text-5xl font-bold hero-text">
          Habilidades Técnicas
        </h2>

        <motion.div
          animate={{
            rotate: [360, 270, 180, 90, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-4 h-4 bg-primary/50 rounded-sm"
        />
      </div>

      <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
        Tecnologias e ferramentas que uso para criar soluções inovadoras
      </p>
    </motion.div>
  );
};

// Tech Icons Grid with 3D Tilt
const TechIconsGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const technologies = [
    { name: "Python", icon: Code2, color: "#3776AB", emoji: "🐍" },
    { name: "Power BI", icon: PanelTop, color: "#F2C811", emoji: "📊" },
    { name: "SQL", icon: Database, color: "#00758F", emoji: "🗄️" },
    { name: "Excel", icon: FileSpreadsheet, color: "#217346", emoji: "📈" },
    { name: "Vue.js", icon: Braces, color: "#42B883", emoji: "💚" },
    { name: "JavaScript", icon: Code2, color: "#F7DF1E", emoji: "⚡" },
    { name: "Tailwind", icon: Palette, color: "#06B6D4", emoji: "🎨" },
    { name: "GLPI", icon: Settings, color: "#9C5CA4", emoji: "🎫" },
    { name: "Automate", icon: Workflow, color: "#0066FF", emoji: "⚙️" },
    { name: "Git", icon: GitBranch, color: "#F05032", emoji: "🔀" },
    { name: "Linux", icon: Terminal, color: "#FCC624", emoji: "🐧" },
    { name: "M365", icon: Cloud, color: "#0078D4", emoji: "☁️" },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16"
    >
      {technologies.map((tech, index) => (
        <TechIconCard key={tech.name} {...tech} />
      ))}
    </motion.div>
  );
};

// Individual Tech Icon Card with 3D Tilt
interface TechIconCardProps {
  name: string;
  icon: any;
  color: string;
  emoji: string;
}

const TechIconCard = ({ name, icon: Icon, color, emoji }: TechIconCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 100,
    damping: 20,
  });

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const cardVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariant}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative group cursor-pointer"
    >
      <div className="glass-card backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 relative overflow-hidden">
        {/* Colored glow on hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
          }}
          className="absolute inset-0 blur-xl"
        />

        {/* Icon/Emoji + Name (inside 3D tilt container) */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <motion.div
            animate={{
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-4xl"
          >
            {emoji}
          </motion.div>

          {/* Tech Name - Always visible, changes color on hover */}
          <motion.div
            animate={{
              color: isHovered ? "#ffffff" : "rgb(156 163 175)",
            }}
            transition={{ duration: 0.2 }}
            className="text-[10px] font-semibold tracking-wider uppercase text-center leading-tight"
          >
            {name}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Other Skills - Floating Pills
const OtherSkillsPills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const otherSkills = [
    "Análise Estatística",
    "Dashboard Design",
    "Automação de Processos",
    "Gestão de Banco de Dados",
    "Metodologias Ágeis",
    "DevOps Básico",
    "API Integration",
    "Troubleshooting",
    "Documentação Técnica",
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mt-20 text-center"
    >
      <h3 className="text-2xl font-bold text-foreground mb-8">
        Outras Competências
      </h3>

      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {otherSkills.map((skill, index) => (
          <FloatingPill key={skill} skill={skill} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

// Floating Pill Component
interface FloatingPillProps {
  skill: string;
  index: number;
}

const FloatingPill = ({ skill, index }: FloatingPillProps) => {
  const pillVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <motion.span
      variants={pillVariant}
      whileHover={{ scale: 1.1, rotate: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      animate={{
        y: [0, -5, 0],
      }}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      className="skill-tag px-5 py-2.5 rounded-full text-sm font-medium bg-primary/10 text-foreground border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer"
    >
      {skill}
    </motion.span>
  );
};

export default Skills;