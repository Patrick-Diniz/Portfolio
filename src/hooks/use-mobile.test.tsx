import { describe, expect, it, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "./use-mobile";

function setInnerWidth(width: number) {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
}

function stubMatchMedia() {
  const listeners = new Set<() => void>();
  window.matchMedia = vi.fn().mockImplementation(() => ({
    addEventListener: (_event: string, cb: () => void) => listeners.add(cb),
    removeEventListener: (_event: string, cb: () => void) => listeners.delete(cb),
  })) as unknown as typeof window.matchMedia;
  return () => listeners.forEach((cb) => cb());
}

describe("useIsMobile", () => {
  beforeEach(() => {
    stubMatchMedia();
  });

  it("returns true when the viewport is narrower than the breakpoint", () => {
    setInnerWidth(500);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("returns false when the viewport is at or above the breakpoint", () => {
    setInnerWidth(1024);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("updates when the viewport crosses the breakpoint", () => {
    setInnerWidth(1024);
    const triggerChange = stubMatchMedia();
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    setInnerWidth(500);
    act(() => triggerChange());
    expect(result.current).toBe(true);
  });
});
