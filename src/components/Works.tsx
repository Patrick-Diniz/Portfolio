import { useState } from "react";
import { cases } from "@/lib/portfolio-data";
import SectionHeading from "@/components/SectionHeading";

const PANEL_TRANSITION = "max-height .45s cubic-bezier(.4,0,.2,1), opacity .35s";

/**
 * Trabalhos — lista editorial. A linha ativa acende e expande o painel
 * Problema/Solução/Resultado; o preview sticky troca de imagem.
 *
 * A linha responde a mouse, clique e teclado. O código de referência só tinha
 * onMouseEnter, o que deixava dois dos três casos inalcançáveis em toque.
 *
 * Sem `onFocus`: um div com role="button" não ativa no Enter como um <button>
 * nativo, então o handler de teclado é o que de fato faz o teclado funcionar.
 * Ativar no foco mascararia isso — tabular abriria o caso e o handler poderia
 * estar quebrado sem ninguém notar.
 *
 * O painel fechado usa `visibility: hidden` — não `display: none`, que mataria
 * a transição de max-height — para sair da ordem de tabulação e da árvore de
 * acessibilidade. O delay de visibility espera o fecho terminar.
 */
const Works = () => {
  const [active, setActive] = useState(0);
  const current = cases[active];

  return (
    <section
      id="trabalhos"
      className="scroll-mt-10 px-[22px] pb-[90px] pt-[110px] md:px-11"
    >
      <SectionHeading num="01" title="Trabalhos" tail="selecionados" />
      <p
        data-reveal
        className="mb-10 mt-0 max-w-[60ch] text-sm leading-[1.6] text-[rgba(242,239,232,.55)]"
      >
        Cada caso conta o que importa: o problema real, a solução construída e o
        que mudou.
      </p>

      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_400px]">
        <div data-reveal>
          {cases.map((cs, i) => {
            const on = active === i;
            return (
              <div
                key={cs.num}
                className="border-t border-[rgba(242,239,232,.15)]"
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={on}
                  aria-controls={`case-panel-${cs.num}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                  className="flex cursor-pointer flex-wrap items-baseline gap-[22px] px-1 pb-6 pt-7 outline-none focus-visible:ring-1 focus-visible:ring-violet"
                >
                  <span
                    className="font-mono text-[13px] transition-colors"
                    style={{ color: on ? "#9a6bff" : "rgba(242,239,232,.4)" }}
                  >
                    {cs.num}
                  </span>
                  <h3
                    className="m-0 font-display text-[clamp(26px,3vw,38px)] font-extrabold uppercase tracking-[-.02em] transition-colors duration-[250ms]"
                    style={{ color: on ? "#f2efe8" : "rgba(242,239,232,.45)" }}
                  >
                    {cs.title}
                  </h3>
                  <span className="ml-auto whitespace-nowrap text-right font-mono text-[11px] text-[rgba(242,239,232,.45)]">
                    {cs.type}
                    <br />
                    {cs.stack}
                  </span>
                </div>

                <div
                  id={`case-panel-${cs.num}`}
                  data-testid="case-panel"
                  aria-hidden={!on}
                  className="overflow-hidden"
                  style={{
                    maxHeight: on ? 560 : 0,
                    opacity: on ? 1 : 0,
                    visibility: on ? "visible" : "hidden",
                    transition: on
                      ? `${PANEL_TRANSITION}, visibility 0s`
                      : `${PANEL_TRANSITION}, visibility 0s .45s`,
                  }}
                >
                  {/*
                    As três colunas entram em `lg` (1024px), não em `md` (900px).
                    Entre 900 e 1023px a coluna esquerda tem ~364–488px: dividida
                    em três com o recuo de 57px, cada campo fica com ~90px e a
                    palavra mais longa do texto ("automaticamente.") precisa de
                    105px, transbordando para a calha. A partir de 1024px cada
                    coluna tem ~126px e o texto cabe.
                  */}
                  <div className="grid grid-cols-1 gap-[26px] pb-8 pl-1 pr-1 pt-0.5 lg:grid-cols-3 lg:pl-[57px]">
                    <Field label="PROBLEMA" text={cs.problem} />
                    <Field label="SOLUÇÃO" text={cs.solution} />
                    <Field label="RESULTADO" text={cs.result} accent />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="border-t border-[rgba(242,239,232,.15)]" />
        </div>

        <div
          data-reveal
          className="sticky top-[110px] hidden h-[440px] overflow-hidden rounded border border-[rgba(242,239,232,.15)] md:block"
        >
          <div
            role="img"
            aria-label={`Preview do projeto ${current.title}`}
            className="absolute inset-0 bg-cover bg-center [filter:saturate(.85)]"
            style={{ backgroundImage: `url(${current.image})` }}
          />
          <div
            className="absolute inset-x-0 bottom-0 p-4 font-mono text-[11px] text-ink"
            style={{
              background: "linear-gradient(0deg,rgba(13,11,9,.92),transparent)",
            }}
          >
            fig. 0{active + 1} — {current.title}
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  label,
  text,
  accent,
}: {
  label: string;
  text: string;
  accent?: boolean;
}) => (
  <div>
    <div
      className="mb-2 font-mono text-[10px] tracking-[.14em]"
      style={{ color: accent ? "#9a6bff" : "rgba(242,239,232,.45)" }}
    >
      {label}
    </div>
    <p className="m-0 text-[13px] leading-[1.65] text-[rgba(242,239,232,.75)]">
      {text}
    </p>
  </div>
);

export default Works;
