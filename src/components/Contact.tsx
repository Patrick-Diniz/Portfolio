import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, useTransform, useInView, type Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax effect for background text
  const scrollY = useMotionValue(0);
  const parallaxY = useSpring(useTransform(scrollY, [0, 1000], [0, -100]), {
    stiffness: 120,
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

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "patricksdiniz@gmail.com",
      href: "mailto:patricksdiniz@gmail.com",
      color: "text-red-400",
      glowColor: "#ef4444"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "diniz-patrick",
      href: "https://www.linkedin.com/in/diniz-patrick/",
      color: "text-blue-400",
      glowColor: "#3b82f6"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "patrick-diniz",
      href: "https://github.com/patrick-diniz",
      color: "text-gray-400",
      glowColor: "#9ca3af"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="min-h-screen flex items-center justify-center section-padding bg-background relative overflow-hidden py-20"
    >
      {/* Background Layer - Giant "CONNECT" text with parallax */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none"
      >
        <h1 className="text-[12rem] font-bold whitespace-nowrap">CONNECT</h1>
      </motion.div>

      <div className="container-width relative z-10">
        {/* Title with Square Atari */}
        <TitleWithSquare />

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Contact Information Column */}
            <ContactInfoColumn contactInfo={contactInfo} />

            {/* Call to Action Column */}
            <CallToActionColumn />

          </div>
        </div>
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
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
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
          Vamos Conversar!
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
        Estou aberto a novas oportunidades e desafios. Entre em contato para discutirmos como minhas habilidades podem agregar valor à sua equipe.
      </p>
    </motion.div>
  );
};

// Contact Info Column with 3D Tilt
const ContactInfoColumn = ({ contactInfo }: { contactInfo: any[] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // 3D Tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), {
    stiffness: 120,
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

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div ref={ref} className="space-y-6">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="glass-card backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
      >
        <h3 className="text-2xl font-bold text-foreground mb-8">
          Informações de Contato
        </h3>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-4"
        >
          {contactInfo.map((contact) => (
            <ContactItem key={contact.label} contact={contact} />
          ))}
        </motion.div>
      </motion.div>

      {/* Availability Card */}
      <AvailabilityCard isInView={isInView} />
    </div>
  );
};

// Individual Contact Item with Glow Effect
interface ContactItemProps {
  contact: {
    icon: any;
    label: string;
    value: string;
    href: string;
    color: string;
    glowColor: string;
  };
}

const ContactItem = ({ contact }: ContactItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const itemVariant: Variants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 20,
      },
    },
  };

  return (
    <motion.a
      variants={itemVariant}
      href={contact.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-4 p-4 rounded-xl hover:bg-card-hover transition-all duration-300 group cursor-pointer relative overflow-hidden"
    >
      {/* Glow effect on hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.2 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle, ${contact.glowColor}60 0%, transparent 70%)`,
        }}
        className="absolute inset-0 blur-xl"
      />

      <motion.div
        animate={{
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative p-3 rounded-xl bg-primary/10 ${contact.color}`}
      >
        <contact.icon className="h-6 w-6" />
      </motion.div>

      <div className="relative">
        <div className="text-sm text-foreground-muted font-medium">
          {contact.label}
        </div>
        <motion.div
          animate={{
            color: isHovered ? "#ffffff" : "rgb(var(--foreground))",
          }}
          transition={{ duration: 0.2 }}
          className="font-semibold"
        >
          {contact.value}
        </motion.div>
      </div>
    </motion.a>
  );
};

// Availability Card with Floating Icons
const AvailabilityCard = ({ isInView }: { isInView: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
      className="glass-card backdrop-blur-xl p-6 rounded-2xl border border-white/10"
    >
      <h4 className="text-lg font-bold text-foreground mb-4">
        Disponibilidade
      </h4>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {/* Organic pulsing indicator */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-3 h-3 bg-green-400 rounded-full"
          />
          <span className="text-foreground-muted">Disponível para projetos</span>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <MapPin className="h-4 w-4 text-primary" />
          </motion.div>
          <span className="text-foreground-muted">Rio de Janeiro, RJ</span>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Phone className="h-4 w-4 text-primary" />
          </motion.div>
          <span className="text-foreground-muted">Remoto/Híbrido</span>
        </div>
      </div>
    </motion.div>
  );
};

// Call to Action Column with Interactive Gradient
const CallToActionColumn = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // 3D Tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), {
    stiffness: 120,
    damping: 20,
  });

  // Interactive gradient position
  const gradientX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), {
    stiffness: 120,
    damping: 20,
  });
  const gradientY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), {
    stiffness: 120,
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
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
        className="glass-card backdrop-blur-xl p-8 rounded-2xl h-full flex flex-col justify-center border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
      >
        {/* Interactive gradient background */}
        <motion.div
          style={{
            background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
          }}
          className="absolute inset-0 pointer-events-none"
        />

        <div className="relative text-center space-y-6">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20"
          >
            <Mail className="h-10 w-10 text-primary" />
          </motion.div>

          <h3 className="text-2xl font-bold text-foreground">
            Pronto para Colaborar?
          </h3>

          <p className="text-foreground-muted">
            Seja para uma oportunidade de trabalho, consultoria ou simplesmente uma conversa sobre tecnologia, estou sempre interessado em novas conexões.
          </p>

          <div className="space-y-4 pt-4">
            <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold py-3 transition-all duration-300 hover:shadow-purple hover:-translate-y-1"
                asChild
              >
                <a href="mailto:patricksdiniz@gmail.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Enviar Email
                </a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold py-3 transition-all duration-300"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/diniz-patrick/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  Conectar no LinkedIn
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;