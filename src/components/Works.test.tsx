import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Works from "./Works";
import { cases } from "@/lib/portfolio-data";

const linhas = () => screen.getAllByRole("button");

describe("Works", () => {
  it("abre o primeiro caso por padrão e mantém os outros fechados", () => {
    render(<Works />);

    const [primeira, ...resto] = linhas();
    expect(primeira).toHaveAttribute("aria-expanded", "true");
    for (const linha of resto) {
      expect(linha).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("abre um caso no clique — o caminho que o toque usa", () => {
    render(<Works />);

    fireEvent.click(linhas()[2]);

    expect(linhas()[2]).toHaveAttribute("aria-expanded", "true");
    expect(linhas()[0]).toHaveAttribute("aria-expanded", "false");
  });

  it("abre um caso com Enter — focar sozinho não abre", () => {
    render(<Works />);

    linhas()[1].focus();
    // Um div com role="button" não dispara click no Enter como um <button>
    // nativo dispararia. Se focar já abrisse, este teste não provaria que o
    // handler de teclado existe.
    expect(linhas()[1]).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(linhas()[1], { key: "Enter" });

    expect(linhas()[1]).toHaveAttribute("aria-expanded", "true");
  });

  it("abre um caso com Espaço", () => {
    render(<Works />);

    fireEvent.keyDown(linhas()[1], { key: " " });

    expect(linhas()[1]).toHaveAttribute("aria-expanded", "true");
  });

  it("tira o painel fechado da árvore de acessibilidade", () => {
    render(<Works />);

    const paineis = screen.getAllByTestId("case-panel");
    expect(paineis[0]).toHaveAttribute("aria-hidden", "false");
    expect(paineis[1]).toHaveAttribute("aria-hidden", "true");
    expect(paineis[1].style.visibility).toBe("hidden");
  });

  it("mostra o preview do caso ativo com rótulo acessível", () => {
    render(<Works />);

    fireEvent.click(linhas()[1]);

    expect(
      screen.getByRole("img", { name: `Preview do projeto ${cases[1].title}` })
    ).toBeInTheDocument();
  });
});
