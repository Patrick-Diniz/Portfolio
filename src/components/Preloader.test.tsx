import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import Preloader from "./Preloader";

const matchMediaOriginal = window.matchMedia;

function setReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduce,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

beforeEach(() => {
  sessionStorage.clear();
  document.documentElement.style.removeProperty("--seq");
  setReducedMotion(false);
});

afterEach(() => {
  window.matchMedia = matchMediaOriginal;
});

describe("Preloader", () => {
  it("roda ao montar e mantém a sequência ligada", () => {
    const { container } = render(<Preloader />);

    expect(container.textContent).toContain("TÉDIO");
    expect(document.documentElement.style.getPropertyValue("--seq")).toBe("");
  });

  it("roda de novo a cada carregamento, inclusive na mesma sessão", () => {
    const primeira = render(<Preloader />);
    expect(primeira.container.textContent).toContain("TÉDIO");
    primeira.unmount();

    const { container } = render(<Preloader />);

    expect(container.textContent).toContain("TÉDIO");
    expect(document.documentElement.style.getPropertyValue("--seq")).toBe("");
  });

  it("não guarda nada em sessionStorage", () => {
    render(<Preloader />).unmount();
    render(<Preloader />);

    expect(sessionStorage.length).toBe(0);
  });

  it("pula sob movimento reduzido e zera a sequência", () => {
    setReducedMotion(true);

    const { container } = render(<Preloader />);

    expect(container.textContent).toBe("");
    expect(document.documentElement.style.getPropertyValue("--seq")).toBe("0");
  });
});
