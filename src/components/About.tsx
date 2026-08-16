import SectionHeading from "@/components/SectionHeading";
import {
  education,
  experiences,
  loves,
  stackGroups,
} from "@/lib/portfolio-data";

/**
 * Sobre — statement e "E EU AMO" à esquerda; experiência, educação e stack
 * à direita. A antiga seção Skills não existe mais: a stack vive aqui.
 */
const About = () => (
  <section
    id="sobre"
    className="scroll-mt-10 border-t border-[rgba(242,239,232,.12)] bg-void-deep px-[22px] py-[100px] md:px-11"
  >
    <div className="mb-11">
      <SectionHeading num="02" title="Sobre" tail="mim" />
    </div>

    <div className="grid grid-cols-1 items-start gap-11 md:grid-cols-[1.2fr_1fr] md:gap-16">
      <div>
        <p
          data-reveal
          className="m-0 font-display text-[clamp(24px,2.4vw,32px)] font-bold leading-[1.3] tracking-[-.01em] text-ink"
        >
          Sou o Patrick — 3+ anos convertendo trabalho repetitivo em código e
          dados dispersos em decisões, com Python, Power BI e Power Automate.
        </p>
        <p
          data-reveal
          className="mb-0 mt-[22px] max-w-[56ch] text-[15px] leading-[1.75] text-[rgba(242,239,232,.6)]"
        >
          Cursando Licenciatura em Computação no IFRJ. Procuro os problemas que
          ninguém quer fazer duas vezes na mão — e construo a ferramenta que faz
          por nós.
        </p>

        <div data-reveal className="mt-12">
          <div className="mb-[14px] font-mono text-[11px] tracking-[.14em] text-[rgba(242,239,232,.45)]">
            E EU AMO
          </div>
          {loves.map((lv) => (
            <div
              key={lv}
              className="cursor-default font-display text-[clamp(40px,4.6vw,60px)] font-black uppercase leading-[1.12] tracking-[-.03em] text-[rgba(242,239,232,.35)] transition-[color,padding-left] duration-[300ms] hover:pl-[18px] hover:text-violet"
            >
              {lv}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-11">
        <div data-reveal>
          <Label>EXPERIÊNCIA</Label>
          {experiences.map((ex) => (
            <Row
              key={ex.role}
              period={ex.period}
              title={ex.role}
              sub={ex.company}
            />
          ))}
        </div>

        <div data-reveal>
          <Label>EDUCAÇÃO</Label>
          {education.map((ed) => (
            <Row
              key={ed.degree}
              period={ed.period}
              title={ed.degree}
              sub={ed.institution}
            />
          ))}
        </div>

        <div data-reveal>
          <Label>STACK</Label>
          <div className="mt-4 grid grid-cols-2 gap-x-7 gap-y-5">
            {stackGroups.map((sg) => (
              <div key={sg.label}>
                <div className="mb-2 font-mono text-[10px] tracking-[.14em] text-violet">
                  {sg.label}
                </div>
                <div className="text-[14.5px] leading-[1.9] text-[rgba(242,239,232,.75)]">
                  {sg.items}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-1.5 font-mono text-[11px] tracking-[.14em] text-[rgba(242,239,232,.45)]">
    {children}
  </div>
);

const Row = ({
  period,
  title,
  sub,
}: {
  period: string;
  title: string;
  sub: string;
}) => (
  <div className="flex items-baseline gap-[22px] border-b border-[rgba(242,239,232,.1)] py-4">
    <span className="w-[86px] flex-none whitespace-nowrap font-mono text-[11px] text-[rgba(242,239,232,.4)]">
      {period}
    </span>
    <div>
      <div className="text-base font-bold">{title}</div>
      <div className="mt-0.5 text-[13px] text-[rgba(242,239,232,.55)]">{sub}</div>
    </div>
  </div>
);

export default About;
