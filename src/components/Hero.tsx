import sticker from "@/assets/patrick-sticker.png";
import { CV_URL } from "@/lib/portfolio-data";

/**
 * Hero — duas linhas display sob máscara de overflow, frase serifada, dois CTAs
 * e a figura fig. 01.
 *
 * Todos os delays multiplicam `--seq`: quando o preloader não roda, a entrada é
 * imediata em vez de esperar por uma sequência que não tocou. E todos são
 * calibrados para a duração do preloader — encurtar um lado sem o outro deixa a
 * tela vazia no intervalo. `sequence.test.tsx` trava essa relação.
 */
const Hero = () => (
  <section
    id="topo"
    className="relative box-border flex min-h-screen scroll-mt-10 flex-col justify-center overflow-hidden px-[22px] pt-24 md:px-11"
  >
    <div className="relative z-[1] flex flex-1 flex-col justify-center">
      <div
        className="mb-8 font-mono text-[12.5px] text-[rgba(242,239,232,.5)]"
        style={{
          animation: "fadeUp .7s cubic-bezier(.22,1,.36,1) both",
          animationDelay: "calc(var(--seq) * 1.35s)",
        }}
      >
        RIO DE JANEIRO, BR — ANALISTA DE DADOS &amp; AUTOMAÇÃO T.I
      </div>

      <h1 className="m-0 font-display font-black uppercase leading-[.9] tracking-[-.045em] text-ink">
        <span className="block overflow-hidden">
          <span
            className="block text-[min(8.6vw,120px,14vh)]"
            style={{
              animation: "heroLine .85s cubic-bezier(.22,1,.36,1) both",
              animationDelay: "calc(var(--seq) * 1.38s)",
            }}
          >
            Automatizando
          </span>
        </span>
        <span className="block overflow-hidden">
          <span
            className="mt-6 block text-[min(9.8vw,136px,15.5vh)]"
            style={{
              animation: "heroLine .85s cubic-bezier(.22,1,.36,1) both",
              animationDelay: "calc(var(--seq) * 1.44s)",
            }}
          >
            o tédio<span className="text-violet">.</span>
          </span>
        </span>
      </h1>

      <div className="mt-2 grid grid-cols-1 items-end gap-12 pb-7 md:grid-cols-[1fr_auto]">
        <div>
          <p
            className="m-0 max-w-[24ch] font-serif text-[clamp(20px,2.1vw,29px)] italic leading-[1.25] text-[rgba(242,239,232,.85)]"
            style={{
              animation: "fadeUp .8s cubic-bezier(.22,1,.36,1) both",
              animationDelay: "calc(var(--seq) * 1.56s)",
            }}
          >
            …e transformando dados <br />
            em decisões que a sua equipe consegue defender.
          </p>

          <div
            className="mt-[26px] flex flex-wrap gap-4"
            style={{
              animation: "fadeUp .8s cubic-bezier(.22,1,.36,1) both",
              animationDelay: "calc(var(--seq) * 1.64s)",
            }}
          >
            <a
              href="#trabalhos"
              className="rounded-full bg-ink px-[34px] py-[17px] font-display text-[13px] font-extrabold tracking-[.06em] text-void no-underline transition-colors duration-[250ms] hover:bg-violet hover:text-ink"
            >
              VER TRABALHOS ↓
            </a>
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[rgba(242,239,232,.3)] px-[34px] py-[17px] font-display text-[13px] font-semibold tracking-[.06em] text-ink no-underline transition-colors duration-[250ms] hover:border-violet hover:text-violet"
            >
              CURRÍCULO ↗
            </a>
          </div>
        </div>

        {/* fig. 01 — sticker sobre placa violeta rotacionada */}
        <div
          className="relative mx-auto h-[274px] w-[250px] flex-none md:mx-0"
          style={{
            animation: "fadeUp .9s cubic-bezier(.22,1,.36,1) both",
            animationDelay: "calc(var(--seq) * 1.59s)",
          }}
        >
          <div className="absolute inset-x-0 bottom-0 top-[18px] rotate-[3deg] rounded-[2px] bg-violet" />
          <div
            className="absolute inset-0 flex items-end justify-center"
            style={{ animation: "floatY2 5.5s ease-in-out infinite" }}
          >
            <img
              src={sticker}
              alt="Patrick Diniz"
              width={264}
              height={272}
              className="h-[272px] w-[264px] [filter:drop-shadow(0_18px_30px_rgba(0,0,0,.45))]"
            />
          </div>
          <div className="absolute -bottom-4 -left-5 -rotate-2 border border-[rgba(242,239,232,.25)] bg-void px-[14px] py-2 font-mono text-[11px] text-ink">
            fig. 01 — o autor
          </div>
          <div
            className="absolute -right-[26px] -top-[26px] h-[76px] w-[76px]"
            style={{ animation: "spinSlow 14s linear infinite" }}
          >
            <svg viewBox="0 0 100 100" width="76" height="76" aria-hidden="true">
              <defs>
                <path
                  id="hero-circ"
                  d="M 50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0"
                />
              </defs>
              <text className="font-mono text-[11.5px] tracking-[.22em] [fill:rgba(242,239,232,.5)]">
                <textPath href="#hero-circ">DADOS · AUTOMAÇÃO · CÓDIGO ·</textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div
      className="absolute bottom-[26px] left-[22px] flex items-center gap-[10px] font-mono text-[11px] text-[rgba(242,239,232,.45)] md:left-11"
      style={{
        animation: "fadeUp .8s cubic-bezier(.22,1,.36,1) both",
        animationDelay: "calc(var(--seq) * 1.74s)",
      }}
    >
      <span style={{ animation: "scrollNudge 1.8s ease-in-out infinite" }}>↓</span>{" "}
      SCROLL
    </div>
  </section>
);

export default Hero;
