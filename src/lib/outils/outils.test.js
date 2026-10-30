import { describe, expect, it } from "vitest";
import { REGIME_GENERAL } from "../../components/hypotheses.js";
import { calculerFrais, capitalFinal, comparerContrats } from "./frais.js";
import { estimerDecoteSurcote, scenariosDepart } from "./decote.js";

const base = { capitalInitial: 10000, versementMensuel: 300, dureeAnnees: 15, rendementBrutPct: 4 };

describe("frais", () => {
  it("sans frais ni rendement : somme des versements", () => {
    const c = capitalFinal({ ...base, rendementBrutPct: 0, fraisEntreePct: 0, fraisAnnuelsPct: 0 });
    expect(c).toBeCloseTo(10000 + 300 * 180, 5);
  });
  it("renvoie une fourchette cohérente (min <= max, coût positif)", () => {
    const r = calculerFrais(base, "contratBancaireTraditionnel");
    expect(r.coutTotal.min).toBeGreaterThan(0);
    expect(r.coutTotal.max).toBeGreaterThan(r.coutTotal.min);
    expect(r.capitalFinal.min).toBeLessThan(r.capitalFinal.max);
    expect(r.capitalFinal.max).toBeLessThan(r.sansFrais);
  });
  it("le contrat en ligne coûte moins cher que le traditionnel (grille FRAIS_TYPES)", () => {
    const { a, b } = comparerContrats(base);
    expect(b.coutTotal.max).toBeLessThan(a.coutTotal.min);
  });
  it("rejette un type inconnu", () => {
    expect(() => calculerFrais(base, "x")).toThrow();
  });
});

describe("décote / surcote", () => {
  const p = { ageActuel: 58, trimestresValides: 150, trimestresRequis: 172, ageLegal: 64, ageDepart: 62 };
  it("calcule les trimestres manquants et la décote", () => {
    const r = estimerDecoteSurcote(p);
    expect(r.trimestresAuDepart).toBe(166);
    expect(r.trimestresManquants).toBe(6);
    expect(r.decotePct).toBeCloseTo(6 * REGIME_GENERAL.decoteParTrimestre);
    expect(r.surcotePct).toBe(0);
    expect(r.variationPct).toBeLessThan(0);
  });
  it("plafonne la décote", () => {
    const r = estimerDecoteSurcote({ ...p, ageActuel: 40, trimestresValides: 0, trimestresRequis: 172, ageDepart: 41 });
    expect(r.trimestresDecote).toBeLessThanOrEqual(REGIME_GENERAL.decotePlafondTrimestres);
  });
  it("applique la surcote au-delà de la durée requise et de l'âge légal", () => {
    const r = estimerDecoteSurcote({ ageActuel: 62, trimestresValides: 170, trimestresRequis: 172, ageLegal: 64, ageDepart: 65 });
    expect(r.trimestresSurcote).toBe(4);
    expect(r.surcotePct).toBeCloseTo(4 * REGIME_GENERAL.surcoteParTrimestre);
    expect(r.decotePct).toBe(0);
  });
  it("rachat plafonné", () => {
    const r = estimerDecoteSurcote({ ...p, ageActuel: 40, trimestresValides: 0, ageDepart: 41 });
    expect(r.rachatPossibleMax).toBe(REGIME_GENERAL.rachatTrimestresPlafond);
  });
  it("valeurs invalides et scénarios", () => {
    expect(estimerDecoteSurcote({ ...p, ageDepart: NaN }).erreur).toBeDefined();
    expect(estimerDecoteSurcote({ ...p, ageDepart: 50 }).erreur).toBe("depart_avant_aujourdhui");
    expect(scenariosDepart(p)).toHaveLength(3);
  });
});
