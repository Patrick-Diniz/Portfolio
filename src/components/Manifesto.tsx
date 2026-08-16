import sticker from "@/assets/patrick-sticker.png";

/**
 * Manifesto — bloco central de tipografia cinética, alternando display
 * uppercase e serifada itálica. Fecha com o sticker sobre círculo violeta.
 */
const Manifesto = () => (
  <section className="relative overflow-hidden border-t border-[rgba(242,239,232,.12)] px-[22px] py-[140px] text-center md:px-11">
    <div
      data-reveal
      className="mb-9 font-mono text-xs text-[rgba(242,239,232,.45)]"
    >
      ENTÃO…
    </div>
    <div
      data-reveal
      className="font-display text-[clamp(40px,5.2vw,68px)] font-black uppercase leading-[1.08] tracking-[-.035em] text-ink"
    >
      Conheça seu próximo
    </div>
    <div
      data-reveal
      className="font-display text-[clamp(40px,5.2vw,68px)] font-black uppercase leading-[1.08] tracking-[-.035em] text-violet"
    >
      analista de dados<span className="text-ink">.</span>
    </div>
    <div
      data-reveal
      className="mt-[18px] font-serif text-[clamp(26px,3vw,40px)] italic text-[rgba(242,239,232,.8)]"
    >
      perfeccionista do pixel à pipeline,
    </div>
    <div
      data-reveal
      className="mt-[18px] font-display text-[clamp(40px,5.2vw,68px)] font-black uppercase leading-[1.08] tracking-[-.035em] text-ink"
    >
      do dado bruto{" "}
      <span className="font-serif font-normal normal-case italic text-violet">
        à decisão.
      </span>
    </div>

    <div data-reveal className="mt-14 flex justify-center">
      <div className="relative h-[200px] w-[190px]">
        <div className="absolute inset-x-1.5 bottom-0 top-[14px] rotate-[3deg] rounded-full bg-violet" />
        <img
          src={sticker}
          alt="Patrick Diniz"
          width={190}
          height={200}
          className="absolute inset-0 h-auto w-full [filter:drop-shadow(0_12px_22px_rgba(0,0,0,.4))]"
        />
      </div>
    </div>
    <div
      data-reveal
      className="mt-[18px] font-mono text-xs text-[rgba(242,239,232,.5)]"
    >
      @patrick-diniz
    </div>
  </section>
);

export default Manifesto;
