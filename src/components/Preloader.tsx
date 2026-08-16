import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * "TÉDIO" entra, é riscado por uma barra violeta e sai; "AUTOMATIZADO." sobe
 * no lugar. Sequência de 2,3s, depois o painel inteiro sobe.
 *
 * Roda a cada carregamento da página, inclusive num F5 — é a primeira
 * impressão do portfólio e vale repetir. Não guarda estado em sessão.
 *
 * A única condição que o pula é `prefers-reduced-motion`, que não é
 * preferência estética: quem pediu menos movimento não deve encarar 2,3s de
 * animação bloqueando a tela. Nesse caso grava `--seq: 0`, colapsando os
 * delays de entrada do resto da página — sem isso, a página ficaria ~2,5s em
 * branco esperando delays calibrados para um preloader que não rodou.
 */
const Preloader = () => {
  // A decisão sai no primeiro render, não num efeito: `matchMedia` responde de
  // forma síncrona e não muda durante a vida do componente. Resolver aqui evita
  // um render extra e satisfaz a regra `react-hooks/set-state-in-effect` sem
  // precisar suprimi-la — a regra está certa, o `setState` dentro do efeito é
  // que era desnecessário.
  const [skip] = useState(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  );
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const progressRef = useRef(0);

  // useLayoutEffect: grava antes do primeiro quadro, para não existir um
  // instante com a sequência errada. Só escreve — não chama setState.
  useLayoutEffect(() => {
    if (skip) {
      document.documentElement.style.setProperty("--seq", "0");
    }
  }, [skip]);

  useEffect(() => {
    if (skip) return;

    const id = setInterval(() => {
      const next = Math.min(
        100,
        progressRef.current + 1.5 + Math.random() * 3.5
      );
      progressRef.current = next;
      setProgress(next);
      if (next >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 300);
      }
    }, 75);

    return () => clearInterval(id);
  }, [skip]);

  if (skip) return null;

  const pct = Math.round(progress);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-void-deep transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(.76,0,.24,1)]"
      style={{
        transform: done ? "translateY(-100%)" : "translateY(0)",
        pointerEvents: done ? "none" : "auto",
      }}
    >
      <div className="relative flex h-[180px] w-full items-center justify-center overflow-hidden">
        <div
          className="absolute font-display text-[clamp(56px,10vw,110px)] font-black tracking-[-.04em] text-ink"
          style={{ animation: "preTedioSeq 2.3s cubic-bezier(.22,1,.36,1) both" }}
        >
          TÉDIO
          <div
            className="absolute -left-[4%] -right-[4%] top-[52%] h-2 origin-left bg-violet"
            style={{
              animation: "preStrikeSeq 2.3s cubic-bezier(.4,0,.2,1) both",
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div
            className="whitespace-nowrap font-display text-[clamp(34px,6vw,64px)] font-black tracking-[-.03em] text-violet"
            style={{
              animation: "preAutoSeq 2.3s cubic-bezier(.22,1,.36,1) both",
            }}
          >
            AUTOMATIZADO<span className="text-ink">.</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-9 left-[22px] font-mono text-[11px] tracking-[.16em] text-[rgba(242,239,232,.45)] md:left-11">
        PD<span className="text-violet">®</span> — PORTFÓLIO 2026
      </div>
      <div className="absolute bottom-9 right-[22px] font-mono text-[15px] text-violet md:right-11">
        {pct}%
      </div>
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-violet transition-[width] duration-[120ms] ease-linear"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

export default Preloader;
