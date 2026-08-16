import { describe, expect, it } from "vitest";
import * as data from "./portfolio-data";

/** Coleta recursivamente toda string exportada pelo módulo. */
function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object")
    Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

describe("portfolio-data", () => {
  it("não contém nenhum placeholder entre colchetes", () => {
    for (const text of collectStrings(data)) {
      expect(text).not.toMatch(/[[\]]/);
    }
  });

  it("expõe exatamente os 3 casos, numerados em sequência", () => {
    expect(data.cases.map((c) => c.num)).toEqual(["001", "002", "003"]);
  });

  it("dá a todo caso um resultado não vazio", () => {
    for (const c of data.cases) {
      expect(c.result.trim().length).toBeGreaterThan(0);
    }
  });

  it("aponta todo link de contato para um destino utilizável", () => {
    for (const link of data.contactLinks) {
      expect(link.href).toMatch(/^(https:\/\/|mailto:)/);
    }
  });
});
