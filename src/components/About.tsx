const About = () => {
  return (
    <section id="sobre" className="min-h-screen flex items-center justify-center section-padding bg-background-secondary">
      <div className="container-width">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8 animate-fade-in relative -top-20">
            <h2 className="text-4xl md:text-5xl font-bold hero-text mb-8">
              Sobre Mim
            </h2>
            
            <div className="glass-card p-8 md:p-12 rounded-2xl">
              <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">
                Profissional de TI com mais de <span className="text-primary font-semibold">3 anos de experiência</span>, cursando Licenciatura em Computação no IFRJ. Minha paixão é utilizar a tecnologia para resolver problemas complexos, seja analisando dados para extrair valor, automatizando tarefas repetitivas ou desenvolvendo interfaces web.
              </p>
              
              <p className="text-lg md:text-xl text-foreground-muted leading-relaxed mt-6">
                Busco constantemente por desafios que me permitam crescer e contribuir para o sucesso de projetos inovadores, sempre focado em <span className="text-primary font-semibold">soluções eficientes e impactantes</span>.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="glass-card p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary mb-2">3+</div>
                <div className="text-foreground-muted">Anos de Experiência</div>
              </div>
              
              <div className="glass-card p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary mb-2">10+</div>
                <div className="text-foreground-muted">Projetos Concluídos</div>
              </div>
              
              <div className="glass-card p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-foreground-muted">Dedicação</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;