/**
 * Cabeçalho de seção: número mono violeta + título display + palavra
 * serifada itálica. Usado por Trabalhos (01) e Sobre (02).
 */
const SectionHeading = ({
  num,
  title,
  tail,
}: {
  num: string;
  title: string;
  tail: string;
}) => (
  <div data-reveal className="mb-[10px] flex flex-wrap items-baseline gap-5">
    <span className="font-mono text-xs text-violet">{num}</span>
    <h2 className="m-0 font-display text-[clamp(44px,5.5vw,72px)] font-black uppercase tracking-[-.03em]">
      {title}
    </h2>
    <span className="font-serif text-[26px] italic text-violet">{tail}</span>
  </div>
);

export default SectionHeading;
