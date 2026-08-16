import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "./Contact";
import { contactLinks } from "@/lib/portfolio-data";

describe("Contact", () => {
  it("expõe um link por canal, apontando para o destino dos dados", () => {
    render(<Contact />);

    for (const canal of contactLinks) {
      expect(
        screen.getByRole("link", { name: new RegExp(canal.label, "i") })
      ).toHaveAttribute("href", canal.href);
    }
  });

  it("abre só os canais externos em nova aba, e sem vazar referrer", () => {
    render(<Contact />);

    const email = screen.getByRole("link", { name: /patricksdiniz/i });
    expect(email).not.toHaveAttribute("target");

    const linkedin = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
  });

  it("não oferece formulário — o design novo não tem nenhum", () => {
    const { container } = render(<Contact />);

    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelector("input")).toBeNull();
  });
});
