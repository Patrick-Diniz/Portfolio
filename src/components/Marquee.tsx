import { marqueeItems } from "@/lib/portfolio-data";

/**
 * Faixa de stack em rolagem infinita. A lista é duplicada e o translate vai
 * até -50%, por isso o loop é contínuo. Não remover a duplicação: sem ela o
 * laço salta ao reiniciar.
 */
const Marquee = () => (
  <div className="overflow-hidden border-y border-[rgba(242,239,232,.12)] bg-void-deep">
    <div
      className="flex w-max"
      style={{ animation: "marqueeX 24s linear infinite" }}
    >
      {[...marqueeItems, ...marqueeItems].map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="inline-flex items-center gap-[26px] whitespace-nowrap px-[13px] py-[17px] font-display text-sm font-bold tracking-[.14em] text-[rgba(242,239,232,.55)]"
        >
          {item}
          <span className="text-violet">✦</span>
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
