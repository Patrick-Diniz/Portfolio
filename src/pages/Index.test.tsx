import { beforeEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import Index from "./Index";

beforeEach(() => {
  sessionStorage.clear();
  document.documentElement.style.removeProperty("--seq");
});

describe("Index", () => {
  it("expõe as 4 âncoras que a navegação usa", () => {
    const { container } = render(<Index />);

    for (const id of ["topo", "trabalhos", "sobre", "contato"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
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
