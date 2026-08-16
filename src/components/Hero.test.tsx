import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";
import { CV_URL } from "@/lib/portfolio-data";

describe("Hero", () => {
  it("anuncia o título em um h1 e o expõe como texto legível", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Automatizando");
    expect(heading.textContent).toContain("o tédio");
  });

  it("aponta o CTA de currículo para a URL do portfolio-data, em nova aba e sem vazar referrer", () => {
    render(<Hero />);

    const cv = screen.getByRole("link", { name: /currículo/i });
    expect(cv).toHaveAttribute("href", CV_URL);
    expect(cv).toHaveAttribute("target", "_blank");
    expect(cv).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
  });

  it("liga o CTA principal à âncora de trabalhos", () => {
    render(<Hero />);

    expect(screen.getByRole("link", { name: /ver trabalhos/i })).toHaveAttribute(
      "href",
      "#trabalhos"
    );
  });

  it("descreve a figura do autor para leitor de tela", () => {
    render(<Hero />);

    expect(screen.getByAltText("Patrick Diniz")).toBeInTheDocument();
  });
});
