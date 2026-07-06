import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("./pages/Index", () => ({
  default: () => <div>Home Page Content</div>,
}));

vi.mock("./pages/NotFound", () => ({
  default: () => <div>Not Found Page Content</div>,
}));

describe("App", () => {
  it("shows the loading fallback and then renders the routed page", async () => {
    render(<App />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();

    const home = await screen.findByText("Home Page Content");
    expect(home).toBeInTheDocument();
  });
});
