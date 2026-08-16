import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { useReveal } from "./useReveal";

const Probe = () => {
  useReveal();
  return <div data-reveal data-testid="alvo">conteúdo</div>;
};

/** Substitui matchMedia para simular a preferência de movimento. */
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

const matchMediaOriginal = window.matchMedia;

/** Observer que nunca dispara — o cenário que a rede de segurança cobre. */
class ObserverInerte {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

beforeEach(() => {
  vi.useFakeTimers();
  setReducedMotion(false);
  // Este arquivo é dono da própria fixture de IntersectionObserver.
  // `vi.unstubAllGlobals()` no afterEach derrubaria também o stub que
  // src/test/setup.ts instala uma vez por arquivo, deixando os testes
  // seguintes sem observer nenhum — e eles passariam pelo motivo errado,
  // caindo na defesa "sem IntersectionObserver" em vez de exercitar o
  // caminho que pretendem testar.
  vi.stubGlobal("IntersectionObserver", ObserverInerte);
});

afterEach(() => {
  vi.useRealTimers();
  window.matchMedia = matchMediaOriginal;
});

describe("useReveal", () => {
  it("não esconde nada quando o usuário pede movimento reduzido", () => {
    setReducedMotion(true);
    const { getByTestId } = render(<Probe />);
    expect(getByTestId("alvo").style.opacity).toBe("");
  });

  it("não esconde nada quando não há IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { getByTestId } = render(<Probe />);
    expect(getByTestId("alvo").style.opacity).toBe("");
  });

  it("esconde para revelar depois quando há suporte e movimento normal", () => {
    const { getByTestId } = render(<Probe />);
    expect(getByTestId("alvo").style.opacity).toBe("0");
  });

  it("revela pela rede de segurança se o observer nunca disparar", () => {
    const { getByTestId } = render(<Probe />);
    expect(getByTestId("alvo").style.opacity).toBe("0");
    vi.advanceTimersByTime(3000);
    expect(getByTestId("alvo").style.opacity).toBe("1");
  });
});
