import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring, type MotionValue, type Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import profilePhoto from "@/assets/profile_linkedin.webp";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 40;
      const elementPosition = element.offsetTop - navOffset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  const scrollToProjects = () => scrollToSection("projects");

  // Mouse tracking for interactive background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize to -1 to 1 range
      mouseX.set((clientX / innerWidth) * 2 - 1);
      mouseY.set((clientY / innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background">
      {/* Interactive Data Mesh Background - Reduced on mobile */}
      <DataMeshBackground mouseX={mouseX} mouseY={mouseY} />

      {/* Animated Mesh Gradient - Reduced on mobile */}
      <AnimatedMeshGradient />

      <div className="container-width section-padding relative z-10 px-4 sm:px-6">
        <div className="min-h-screen flex items-center py-12 sm:py-8 md:-my-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center w-full">

            {/* Image Column with 3D Tilt & Floating - Tilt disabled on touch devices */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <ProfilePhoto />
            </div>

            {/* Content Column with Kinetic Typography */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 md:space-y-8 order-2 lg:order-1 text-center lg:text-left"
            >
              <div className="space-y-3 md:space-y-4">
                {/* Split Text Animation - Name - Responsive sizing */}
                <SplitTextHeading text="Patrick Diniz" />

                {/* Subtitle with blur-in effect - Responsive sizing */}
                <motion.h2
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                    delay: 1.2
                  }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary font-semibold"
                >
                  Analista de Dados & Automação T.I
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                    delay: 1.4
                  }}
                  className="text-sm sm:text-base md:text-lg text-foreground-muted max-w-lg mx-auto lg:mx-0 leading-relaxed"
                >
                  Transformando dados em insights e automatizando processos com
                  soluções de tecnologia inovadoras e eficientes.
                </motion.p>
              </div>

              {/* Buttons - Full width on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  delay: 1.6
                }}
                className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-8 py-3 transition-all duration-300 hover:shadow-purple hover:-translate-y-1"
                  onClick={scrollToProjects}
                >
                  Ver Projetos
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-3 transition-all duration-300"
                  asChild
                >
                  <a
                    href="https://drive.google.com/file/d/1YgNbnXKP43306sia4YMR7_wA9-rMpM8d/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    Meu Currículo
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Refined Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};

// Interactive Data Mesh Background Component - With mobile optimization
interface DataMeshBackgroundProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const DataMeshBackground = ({ mouseX, mouseY }: DataMeshBackgroundProps) => {
  const offsetX = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), { stiffness: 120, damping: 20 });
  const offsetY = useSpring(useTransform(mouseY, [-1, 1], [-20, 20]), { stiffness: 120, damping: 20 });

  return (
    <motion.div
      style={{ x: offsetX, y: offsetY }}
      className="absolute inset-0 opacity-20 md:opacity-30"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary/20"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </motion.div>
  );
};

// Animated Mesh Gradient - Reduced intensity on mobile
const AnimatedMeshGradient = () => {
  return (
    <div className="absolute inset-0 opacity-30 md:opacity-40">
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 60% 40%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute inset-0"
      />
    </div>
  );
};

// Split Text Heading with Stagger Animation - Mobile optimized
const SplitTextHeading = ({ text }: { text: string }) => {
  const letters = text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.3,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold hero-text leading-tight"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={child}
          className="inline-block"
          style={{ display: letter === " " ? "inline" : "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

// Profile Photo with 3D Tilt & Floating Animation - Touch device detection
const ProfilePhoto = () => {
  const photoRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();
  }, []);

  // 3D Tilt - Only active on non-touch devices
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoRef.current || isTouchDevice) return;

    const rect = photoRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={photoRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: 0.5
      }}
      className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
    >
      {/* Pulsing Glow - Circular */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-primary/40 rounded-full blur-3xl"
      />

      {/* Photo Container with 3D Tilt - Circular with purple background */}
      <motion.div
        style={isTouchDevice ? {} : {
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 w-full h-full rounded-full overflow-hidden bg-primary shadow-2xl shadow-primary/50"
      >
        <img
          src={profilePhoto}
          alt="Patrick Diniz"
          className="w-full h-full object-cover object-center scale-110"
          loading="eager"
        />
      </motion.div>
    </motion.div>
  );
};

// Scroll Indicator - Adjusted position for mobile
const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
    >
      {/* SCROLL text */}
      <motion.span
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-xs tracking-widest text-foreground-muted uppercase font-semibold"
      >
        Scroll
      </motion.span>

      {/* Vertical line with sliding diamond */}
      <div className="relative h-16 md:h-20 w-[2px] bg-gradient-to-b from-transparent via-primary/50 to-transparent">
        <motion.div
          animate={{
            y: [0, 40, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45"
        />
      </div>
    </motion.div>
  );
};

export default Hero;
