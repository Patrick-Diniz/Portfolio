import { useEffect } from "react";

const TRANSITION =
  "opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)";

/** Tempo após o qual qualquer elemento ainda escondido é revelado à força. */
const FAILSAFE_MS = 3000;

/**
 * Reveal on scroll para todo [data-reveal] do documento. Um observer só,
 * montado uma vez pela página — chame em Index.tsx, não em cada componente.
 *
 * O hook esconde o conteúdo para poder animá-lo, o que significa que uma falha
 * aqui deixa a página em branco. Três defesas contra isso:
 *   1. não esconde nada sem IntersectionObserver;
 *   2. não esconde nada sob prefers-reduced-motion;
 *   3. revela à força o que sobrar depois de FAILSAFE_MS.
 */
export function useReveal(): void {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (els.length === 0) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const supported = typeof IntersectionObserver === "function";

    // Sem animação, o conteúdo simplesmente já está visível.
    if (prefersReduced || !supported) return;

    const show = (el: HTMLElement) => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    };

    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = TRANSITION;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          window.setTimeout(() => show(el), 80 * (idx % 4));
          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));

    const failsafe = window.setTimeout(() => els.forEach(show), FAILSAFE_MS);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);
}
