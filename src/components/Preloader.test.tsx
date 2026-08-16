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
  it("roda na primeira visita da sessão e mantém a sequência ligada", () => {
    const { container } = render(<Preloader />);

    expect(container.textContent).toContain("TÉDIO");
    expect(document.documentElement.style.getPropertyValue("--seq")).toBe("");
    expect(sessionStorage.getItem("pd-preloader-seen")).toBe("1");
  });

  it("pula na segunda montagem da mesma sessão e zera a sequência", () => {
    const primeira = render(<Preloader />);
    primeira.unmount();

    const { container } = render(<Preloader />);

    expect(container.textContent).toBe("");
    expect(document.documentElement.style.getPropertyValue("--seq")).toBe("0");
  });

  it("pula sob movimento reduzido, mesmo na primeira visita", () => {
    setReducedMotion(true);

    const { container } = render(<Preloader />);

    expect(container.textContent).toBe("");
    expect(document.documentElement.style.getPropertyValue("--seq")).toBe("0");
  });
});
