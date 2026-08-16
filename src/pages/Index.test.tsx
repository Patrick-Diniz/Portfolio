import { beforeEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import Index from "./Index";

beforeEach(() => {
  sessionStorage.clear();
  document.documentElement.style.removeProperty("--seq");
});

describe("Index", () => {
  it("expõe as 4 âncoras que a navegação usa, cada uma na seção certa", () => {
    const { container } = render(<Index />);

    const ancora = (id: string) => container.querySelector(`#${id}`);

    for (const id of ["topo", "trabalhos", "sobre", "contato"]) {
      expect(ancora(id)).not.toBeNull();
    }

    // Existir não basta. Um id no elemento errado — #sobre no Works, digamos —
    // resolveria os quatro seletores e passaria verde, enquanto todo link da
    // nav levaria à seção errada. Amarrar cada id ao conteúdo da sua seção é o
    // que torna esta verificação capaz de falhar pelo motivo certo.
    expect(ancora("topo")?.textContent).toContain("Automatizando");
    expect(ancora("trabalhos")?.textContent).toContain("Trabalhos");
    expect(ancora("sobre")?.textContent).toContain("Sobre");
    expect(ancora("contato")?.textContent).toContain("conversar");
  });

  it("monta os blocos do design na ordem especificada", () => {
    const { container } = render(<Index />);

    const texto = container.textContent ?? "";
    const ordem = [
      "Automatizando",
      "Trabalhos",
      "Sobre",
      "Conheça seu próximo",
      "conversar",
    ];

    const posicoes = ordem.map((t) => texto.indexOf(t));
    expect(posicoes.every((p) => p >= 0)).toBe(true);
    expect([...posicoes].sort((a, b) => a - b)).toEqual(posicoes);
  });

  it("não deixa resquício do design antigo", () => {
    const { container } = render(<Index />);

    expect(container.innerHTML).not.toContain("glass-card");
    expect(container.innerHTML).not.toContain("hero-text");
    expect(container.innerHTML).not.toContain("project-card");
    expect(container.innerHTML).not.toContain("skill-tag");
  });
});
