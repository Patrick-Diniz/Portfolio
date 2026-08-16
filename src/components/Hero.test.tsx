import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

/**
 * Regressão: o h1 do hero carregava a classe `hero-text`, que é
 * `bg-gradient-to-r ... bg-clip-text text-transparent`. Como cada letra vive num
 * filho `display: inline-block` (necessário para animá-la), `background-clip: text`
 * não recorta esses glifos — as letras só herdavam `color: transparent` e o nome
 * "Patrick Diniz" ficava invisível em produção, no desktop e no mobile.
 *
 * A cor passou a ser aplicada letra a letra, via style inline.
 */
describe("Hero", () => {
  it("pinta cada letra do título com cor própria em vez de depender de bg-clip-text", () => {
    const { container } = render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.className).not.toContain("hero-text");

    const letters = Array.from(heading.querySelectorAll("span"));
    expect(letters.length).toBeGreaterThan(0);

    for (const letter of letters) {
      expect(letter.style.color).not.toBe("");
      expect(letter.style.color).not.toBe("transparent");
    }

    // O espaço entre as palavras vira U+00A0 para não colapsar entre os spans
    // inline-block, então normaliza antes de comparar.
    const text = container.textContent?.replace(/\u00A0/g, " ");
    expect(text).toContain("Patrick Diniz");
  });
});
