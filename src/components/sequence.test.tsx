import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import Preloader from "./Preloader";
import Hero from "./Hero";
import Navigation from "./Navigation";

/**
 * A entrada da página é uma coreografia entre três componentes: o Preloader
 * roda por N segundos e o resto entra com `animation-delay` calibrado para
 * cair logo depois. Os números vivem em arquivos diferentes, então encurtar um
 * lado sem o outro é fácil — e o sintoma é tela vazia, que nenhum outro teste
 * deste projeto detecta.
 *
 * Este arquivo trava a relação, não os valores absolutos: mudar a duração
 * continua permitido, desde que os delays acompanhem.
 */

/** Lê a duração da sequência do preloader direto do atributo style. */
function duracaoDoPreloader(): number {
  const { container } = render(<Preloader />);
  const alvo = [...container.querySelectorAll<HTMLElement>("[style]")]
    .map((el) => el.getAttribute("style") ?? "")
    .find((s) => s.includes("preTedioSeq"));

  const achado = alvo?.match(/preTedioSeq\s+([\d.]+)s/);
  if (!achado) throw new Error("não achei a duração de preTedioSeq");
  return Number(achado[1]);
}

/** Todos os delays de entrada que multiplicam --seq, em segundos. */
function delaysDeEntrada(): number[] {
  const alvos = [render(<Hero />), render(<Navigation />)];

  return alvos
    .flatMap(({ container }) => [
      ...container.querySelectorAll<HTMLElement>("[style]"),
    ])
    .map((el) => el.getAttribute("style") ?? "")
    .map((s) => s.match(/--seq\)\s*\*\s*([\d.]+)s/))
    .filter((m): m is RegExpMatchArray => m !== null)
    .map((m) => Number(m[1]));
}

describe("sequência de entrada", () => {
  it("dura 1,2s no preloader", () => {
    expect(duracaoDoPreloader()).toBe(1.2);
  });

  it("não deixa buraco entre o preloader sair e o conteúdo entrar", () => {
    const preloader = duracaoDoPreloader();
    const delays = delaysDeEntrada();

    expect(delays.length).toBeGreaterThan(0);

    // O primeiro elemento entra depois do fim da sequência, mas dentro de
    // 0,4s dela — mais que isso é tela vazia esperando.
    const primeiro = Math.min(...delays);
    expect(primeiro).toBeGreaterThanOrEqual(preloader);
    expect(primeiro - preloader).toBeLessThanOrEqual(0.4);
  });

  it("termina de entrar em até 0,6s depois do primeiro elemento", () => {
    const delays = delaysDeEntrada();
    const primeiro = Math.min(...delays);
    const ultimo = Math.max(...delays);

    expect(ultimo - primeiro).toBeLessThanOrEqual(0.6);
  });
});
