import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Horizontal parallax effect for background text
  const scrollY = useMotionValue(0);
  const parallaxX = useSpring(useTransform(scrollY, [0, 1000], [0, 200]), {
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
      id="sobre"
      className="min-h-screen flex items-center justify-center section-padding bg-background-secondary scroll-mt-4 relative overflow-hidden py-20"
    >
      {/* Background Layer - Giant "ABOUT" text with horizontal parallax */}
      <motion.div
        style={{ x: parallaxX }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none"
      >
        <h1 className="text-[10rem] font-bold whitespace-nowrap">ABOUT ME</h1>
      </motion.div>

      {/* Subtle mesh gradient background */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="container-width relative z-10">
        {/* Title with Square Atari */}
        <TitleWithSquare />

        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Column 1: Resume (4 cols) */}
          <ResumeColumn />

          {/* Column 2: Experience (4 cols) */}
          <ExperienceColumn />

          {/* Column 3: Education (4 cols) */}
          <EducationColumn />
        </div>



        {/* Stats Cards at Bottom */}
        <StatsSection />
      </div>
    </section>
  );
};

// Title with Square Atari Animation
const TitleWithSquare = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="flex items-center justify-center gap-4 mb-12"
    >
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

      <h2 className="text-4xl md:text-5xl font-bold hero-text text-center">
        Sobre Mim
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
    </motion.div>
  );
};

// Resume Column
const ResumeColumn = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="lg:col-span-4"
    >
      <h6 className="uppercase text-xs tracking-widest text-foreground-muted mb-4 font-semibold">
        Resumo
      </h6>

      <div className="space-y-4">
        <h5 className="text-xl font-semibold text-foreground leading-relaxed">
          Analista de Dados & Automação T.I com 3+ anos de experiência em
          desenvolvimento de soluções tecnológicas inovadoras.
        </h5>

        <p className="text-foreground-muted leading-relaxed">
          Profissional especializado em análise de dados, automação de processos
          e desenvolvimento web. Cursando Licenciatura em Computação no IFRJ,
          sempre buscando desafios que combinem tecnologia, criatividade e impacto
          real.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            Análise de Dados
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            Automação
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            Dev Web
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Experience Column with Interactive Rows
const ExperienceColumn = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const experiences = [
    {
      period: "2021-Atual",
      role: "Analista de Dados",
      company: "Setor de TI",
    },
    {
      period: "2021-Atual",
      role: "Desenvolvedor de Automações",
      company: "Power Automate & Python",
    },
    {
      period: "2022-2024",
      role: "Desenvolvedor Web",
      company: "Projetos Institucionais",
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
      className="lg:col-span-4"
    >
      <h6 className="uppercase text-xs tracking-widest text-foreground-muted mb-4 font-semibold">
        Experiência
      </h6>

      <div className="space-y-0">
        {experiences.map((exp, index) => (
          <ExperienceRow key={index} {...exp} delay={index * 0.1} />
        ))}
      </div>
    </motion.div>
  );
};

// Interactive Experience Row
interface ExperienceRowProps {
  period: string;
  role: string;
  company: string;
  delay: number;
}

const ExperienceRow = ({ period, role, company, delay }: ExperienceRowProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-4 border-b border-white/5 hover:border-primary/30 transition-all duration-300 cursor-pointer"
    >
      <motion.div
        animate={{
          paddingLeft: isHovered ? "1rem" : "0rem",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="flex justify-between items-start mb-1">
          <h6 className="font-semibold text-foreground">{role}</h6>
          <span className="text-xs uppercase tracking-wider text-foreground-muted">
            {period}
          </span>
        </div>
        <p className="text-sm text-foreground-muted">{company}</p>
      </motion.div>
    </motion.div>
  );
};

// Education Column
const EducationColumn = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const education = [
    {
      period: "2023-2027",
      degree: "Licenciatura em Computação",
      institution: "IFRJ (Instituto Federal do Rio de Janeiro)",
    },
    {
      period: "2019-2021",
      degree: "Técnico em Informática",
      institution: "Ensino Técnico",
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      className="lg:col-span-4"
    >
      <h6 className="uppercase text-xs tracking-widest text-foreground-muted mb-4 font-semibold">
        Educação
      </h6>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
          >
            <div className="flex gap-4">
              <span className="text-xs uppercase tracking-wider text-foreground-muted/60 whitespace-nowrap pt-1">
                {edu.period}
              </span>
              <div>
                <h6 className="font-semibold text-foreground mb-1">{edu.degree}</h6>
                <p className="text-sm text-foreground-muted">{edu.institution}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};



// Stats Section at Bottom
const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
    >
      <AnimatedStatCard value={3} suffix="+" label="Anos de Experiência" delay={0} />
      <AnimatedStatCard value={10} suffix="+" label="Projetos Concluídos" delay={0.1} />
      <AnimatedStatCard value={100} suffix="%" label="Dedicação" delay={0.2} />
    </motion.div>
  );
};

// Animated Stat Card (reused from previous version)
interface AnimatedStatCardProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const AnimatedStatCard = ({ value, suffix, label, delay }: AnimatedStatCardProps) => {
  const ref = useRef(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  // 3D Tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), {
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
  };

  // Animated counter
  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="glass-card p-8 rounded-xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <motion.div
            className="text-4xl font-bold text-primary mb-2"
            initial={{ scale: 0.5 }}
            animate={isInView ? { scale: 1 } : { scale: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: delay + 0.2,
            }}
          >
            {count}
            {suffix}
          </motion.div>
          <div className="text-foreground-muted">{label}</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
