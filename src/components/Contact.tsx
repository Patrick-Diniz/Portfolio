import { contactLinks } from "@/lib/portfolio-data";

/**
 * Contato + rodapé numa seção só: a barra final é desta seção, não há
 * componente Footer separado. Sem formulário — os canais são linhas de
 * largura inteira.
 */
const Contact = () => (
  <section
    id="contato"
    className="scroll-mt-10 border-t border-[rgba(242,239,232,.12)] bg-void-deep px-[22px] pb-[60px] pt-[110px] md:px-11"
  >
    <div
      data-reveal
      className="mb-5 font-mono text-xs text-[rgba(242,239,232,.45)]"
    >
      03 — OBRIGADO PELA VISITA
    </div>
    <h2
      data-reveal
      className="m-0 font-display text-[clamp(64px,10vw,150px)] font-black uppercase leading-[.92] tracking-[-.045em] text-ink"
    >
      Vamos
      <br />
      conversar<span className="text-violet">?</span>
    </h2>
    <p
      data-reveal
      className="mb-0 mt-7 max-w-[30ch] font-serif text-[clamp(20px,2.2vw,28px)] italic text-[rgba(242,239,232,.75)]"
    >
      Tem um processo manual custando horas da sua equipe? Fala comigo.
    </p>

    <div data-reveal className="mt-14 max-w-[760px]">
      {contactLinks.map((lk) => {
        const external = lk.href.startsWith("http");
        return (
          <a
            key={lk.meta}
            href={lk.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="flex items-center gap-5 border-t border-[rgba(242,239,232,.15)] px-2.5 py-[22px] text-ink no-underline transition-[background,padding-left] duration-[300ms] hover:bg-[rgba(154,107,255,.08)] hover:pl-6"
          >
            <span className="w-[70px] flex-none font-mono text-[11px] text-[rgba(242,239,232,.4)]">
              {lk.meta}
            </span>
            <span className="font-display text-[clamp(20px,2.4vw,30px)] font-extrabold uppercase tracking-[-.015em]">
              {lk.label}
            </span>
            <span aria-hidden="true" className="ml-auto text-[22px] text-violet">
              ↗
            </span>
          </a>
        );
      })}
      <div className="border-t border-[rgba(242,239,232,.15)]" />
    </div>

    <div className="mt-[90px] flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(242,239,232,.12)] pt-6 font-mono text-[11px] text-[rgba(242,239,232,.4)]">
      <span>© 2026 PATRICK DINIZ — RIO DE JANEIRO, BR</span>
      <span className="font-display text-sm font-black text-[rgba(242,239,232,.6)]">
        PD<span className="text-violet">®</span>
      </span>
      <span>REACT · TYPESCRIPT · TAILWIND</span>
    </div>
  </section>
);

export default Contact;
