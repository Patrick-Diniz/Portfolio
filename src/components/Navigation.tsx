const links = [
  { href: "#trabalhos", label: "TRABALHOS" },
  { href: "#sobre", label: "SOBRE" },
  { href: "#contato", label: "CONTATO" },
];

/**
 * Nav fixa. Entra depois do preloader — o delay acompanha `--seq`, que vai a 0
 * quando o preloader é pulado.
 */
const Navigation = () => (
  <nav
    className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-[22px] py-5 backdrop-blur-lg md:px-11"
    style={{
      background:
        "linear-gradient(180deg,rgba(18,16,13,.92),rgba(18,16,13,.75) 70%,transparent)",
      animation: "fadeUp .8s cubic-bezier(.22,1,.36,1) both",
      animationDelay: "calc(var(--seq) * 1.48s)",
    }}
  >
    <a
      href="#topo"
      className="font-display text-[17px] font-black tracking-[-.02em] text-ink no-underline"
    >
      PD<span className="text-violet">®</span>
    </a>

    <div className="hidden items-center gap-8 font-display text-xs font-bold tracking-[.12em] md:flex">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="text-[rgba(242,239,232,.65)] no-underline transition-colors hover:text-violet"
        >
          {l.label}
        </a>
      ))}
      <span className="flex items-center gap-2 text-[11.5px] text-violet">
        <i
          className="h-[7px] w-[7px] rounded-full bg-violet"
          style={{ animation: "blinkDot 2s ease-in-out infinite" }}
        />
        DISPONÍVEL
      </span>
    </div>
  </nav>
);

export default Navigation;
