import { describe, expect, it } from "vitest";
import { PETITS_PAS, petitPasPour } from "../../components/petitsPas.js";
import { routesMeta } from "../../routes.jsx";

describe("petits pas contextuels", () => {
  it("pointent vers des routes existantes", () => {
    const chemins = new Set(routesMeta.map((r) => r.path));
    for (const p of Object.values(PETITS_PAS)) expect(chemins.has(p.to), p.to).toBe(true);
  });
  it("choisissent le petit pas selon le thème, avec un défaut", () => {
    expect(petitPasPour({ title: "Combien coûte un PEA ?" }).to).toBe("/outils/frais-per-assurance-vie");
    expect(petitPasPour({ categorie: "trimestres" }).to).toBe("/outils/decote-surcote-trimestres");
    expect(petitPasPour({ title: "Revalorisation des pensions" }).to).toBe("/outils/decote-surcote-trimestres");
    expect(petitPasPour({ title: "Autre sujet" }).to).toBe("/checklist-retraite-5-ans");
    expect(petitPasPour().to).toBe("/checklist-retraite-5-ans");
  });
});
