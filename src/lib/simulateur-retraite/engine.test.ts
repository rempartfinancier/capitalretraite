/**
 * Tests du moteur de simulation retraite — `npx vitest run src/lib/simulateur-retraite`
 *
 * Les valeurs attendues sont calculées à la main à partir des formules
 * documentées dans docs/simulateur-retraite-moteur.md (hub rempartfinancier.fr).
 * Porté depuis rempartfinancier/src/lib/simulateur-retraite/engine.test.ts
 * (bun:test → vitest, mêmes cas et mêmes vecteurs).
 */

import { describe, expect, test } from "vitest";
import {
  calculerCapitalNecessaire,
  calculerEcartMensuel,
  calculerEffortMensuelSupplementaire,
  calculerPensionEstimee,
  calculerPertes,
  calculerRendementOptimise,
  calculerScoreRetraite,
  capitaliser,
  simulerRetraite,
} from "./engine";
import {
  HORIZON_DECUMULATION_ANNEES,
  OBJECTIF_NIVEAU_VIE_RETRAITE,
  SCORE_RETRAITE_SEUILS,
} from "./hypotheses";

describe("capitaliser", () => {
  test("taux mensuel nul : somme simple principal + versements", () => {
    expect(capitaliser(1000, 200, 10, 0)).toBe(3000);
  });

  test("taux mensuel non nul : 0 € de départ, 1000 €/mois sur 12 mois à 1 %/mois", () => {
    expect(capitaliser(0, 1000, 12, 0.01)).toBeCloseTo(12682.5, 1);
  });

  test("0 mois restant : le capital projeté vaut le patrimoine de départ, quel que soit le taux", () => {
    expect(capitaliser(50000, 300, 0, 0.05 / 12)).toBe(50000);
  });
});

describe("calculerPensionEstimee", () => {
  test("salarié : 4 500 × 0,55 = 2 475", () => {
    expect(calculerPensionEstimee(4500, "salarie")).toBe(2475);
  });

  test("fonctionnaire : 4 500 × 0,75 = 3 375", () => {
    expect(calculerPensionEstimee(4500, "fonctionnaire")).toBe(3375);
  });

  test("TNS : 3 000 × 0,42 = 1 260", () => {
    expect(calculerPensionEstimee(3000, "tns")).toBe(1260);
  });
});

describe("calculerEcartMensuel", () => {
  test("écart positif : 4 500 × 0,85 − 2 475 = 1 350", () => {
    expect(calculerEcartMensuel(4500, 2475, 0.85)).toBe(1350);
  });

  test("pension déjà au-dessus de l'objectif : écart plafonné à 0 (jamais négatif)", () => {
    expect(calculerEcartMensuel(4500, 4000, 0.85)).toBe(0);
  });

  test("objectif par défaut = OBJECTIF_NIVEAU_VIE_RETRAITE.moyen quand non précisé", () => {
    expect(calculerEcartMensuel(4500, 2475)).toBe(calculerEcartMensuel(4500, 2475, OBJECTIF_NIVEAU_VIE_RETRAITE.moyen));
  });
});

describe("calculerCapitalNecessaire", () => {
  test("1 350 €/mois sur l'horizon par défaut (21 ans = moyenne INSEE 23/19 ans) : 340 200 €", () => {
    expect(HORIZON_DECUMULATION_ANNEES).toBe(21);
    expect(calculerCapitalNecessaire(1350)).toBe(1350 * 12 * 21);
  });

  test("horizon explicite : 1 290 €/mois sur 20 ans = 309 600 €", () => {
    expect(calculerCapitalNecessaire(1290, 20)).toBe(309600);
  });
});

describe("calculerEffortMensuelSupplementaire", () => {
  test("pas de manque : effort nul, quels que soient nbMois et taux", () => {
    expect(calculerEffortMensuelSupplementaire(0, 120, 0.004)).toBe(0);
  });

  test("taux mensuel nul : effort = manque / nbMois (60 000 € sur 120 mois = 500 €)", () => {
    expect(calculerEffortMensuelSupplementaire(60000, 120, 0)).toBe(500);
  });

  test("manque négatif (ne devrait pas arriver en pratique) : effort nul", () => {
    expect(calculerEffortMensuelSupplementaire(-100, 120, 0.004)).toBe(0);
  });
});

describe("calculerPertes", () => {
  test("3 800 € de revenu, 2 050 € de pension : 1 750 €/mois, 21 000 €/an, cumul sur l'horizon", () => {
    const p = calculerPertes(3800, 2050, 25);
    expect(p.mensuelle).toBe(1750);
    expect(p.annuelle).toBe(21000);
    expect(p.surHorizon).toBe(525000);
    expect(p.horizonAnnees).toBe(25);
  });

  test("horizon par défaut = HORIZON_DECUMULATION_ANNEES", () => {
    const p = calculerPertes(4000, 2200);
    expect(p.horizonAnnees).toBe(HORIZON_DECUMULATION_ANNEES);
    expect(p.surHorizon).toBe(1800 * 12 * HORIZON_DECUMULATION_ANNEES);
  });

  test("pension supérieure au revenu : perte plancher à 0", () => {
    const p = calculerPertes(3000, 3200);
    expect(p.mensuelle).toBe(0);
    expect(p.annuelle).toBe(0);
    expect(p.surHorizon).toBe(0);
  });
});

describe("calculerScoreRetraite", () => {
  test("couverture totale : score 100, niveau excellent", () => {
    const s = calculerScoreRetraite(400000, 300000);
    expect(s.valeur).toBe(100);
    expect(s.niveau).toBe("excellent");
  });

  test("capital nécessaire nul (pension au niveau de l'objectif) : score 100", () => {
    expect(calculerScoreRetraite(0, 0)).toEqual({ valeur: 100, niveau: "excellent" });
  });

  test("couverture partielle : 174 000 / 300 000 = 58/100, niveau attention", () => {
    const s = calculerScoreRetraite(174000, 300000);
    expect(s.valeur).toBe(58);
    expect(s.niveau).toBe("attention");
  });

  test("couverture faible : 60 000 / 300 000 = 20/100, niveau critique", () => {
    const s = calculerScoreRetraite(60000, 300000);
    expect(s.valeur).toBe(20);
    expect(s.niveau).toBe("critique");
  });

  test("les seuils de hypotheses.ts bornent exactement les niveaux", () => {
    expect(calculerScoreRetraite(SCORE_RETRAITE_SEUILS.excellent, 100).niveau).toBe("excellent");
    expect(calculerScoreRetraite(SCORE_RETRAITE_SEUILS.excellent - 1, 100).niveau).toBe("attention");
    expect(calculerScoreRetraite(SCORE_RETRAITE_SEUILS.attention, 100).niveau).toBe("attention");
    expect(calculerScoreRetraite(SCORE_RETRAITE_SEUILS.attention - 1, 100).niveau).toBe("critique");
  });

  test("capital projeté négatif (garde-fou) : score 0, niveau critique", () => {
    expect(calculerScoreRetraite(-5000, 300000)).toEqual({ valeur: 0, niveau: "critique" });
  });
});

describe("calculerRendementOptimise", () => {
  test("5 % + 1,5 pt = 6,5 % (sous le plafond)", () => {
    expect(calculerRendementOptimise(5)).toBe(6.5);
  });

  test("8 % + 1,5 pt = 9,5 %, plafonné à 9 %", () => {
    expect(calculerRendementOptimise(8)).toBe(9);
  });
});

describe("simulerRetraite", () => {
  test("scénario avec écart couvert : TNS 3 000 €/mois, 45→65 ans, 0 € de départ, 100 €/mois à 4 %", () => {
    const r = simulerRetraite({
      statut: "tns",
      ageActuel: 45,
      ageDepart: 65,
      revenuNetMensuel: 3000,
      patrimoineActuel: 0,
      epargneMensuelle: 100,
      rendementAnnuelPct: 4,
    });
    expect(r.pensionEstimeeMensuelle).toBe(1260);
    expect(r.ecartMensuel).toBe(1290);
    expect(r.nbMoisAvantDepart).toBe(240);
    expect(r.capitalNecessaire).toBe(325080);
    expect(r.capitalProjete).toBeCloseTo(36677.46, 1);
    expect(r.capitalManquant).toBeCloseTo(325080 - 36677.46, 1);
    expect(r.effortMensuelSupplementaire).toBeCloseTo(786.32, 1);
    expect(r.rendementOptimiseAnnuelPct).toBe(5.5);
    expect(r.capitalProjeteOptimise).toBeCloseTo(43562.74, 1);
    expect(r.trajectoire.length).toBe(21);
    expect(r.trajectoire[0]).toEqual({ age: 45, capitalActuel: 0, capitalOptimise: 0 });
    expect(r.tauxRemplacement).toBeCloseTo(0.42, 10);
    expect(r.pertes.mensuelle).toBe(1740);
    expect(r.pertes.annuelle).toBe(20880);
    expect(r.pertes.surHorizon).toBe(1740 * 12 * HORIZON_DECUMULATION_ANNEES);
    expect(r.score.valeur).toBe(Math.round((r.capitalProjete / r.capitalNecessaire) * 100));
    expect(r.score.niveau).toBe("critique");
  });

  test("scénario où le capital projeté couvre déjà le besoin : manque et effort nuls", () => {
    const r = simulerRetraite({
      statut: "salarie",
      ageActuel: 40,
      ageDepart: 63,
      revenuNetMensuel: 4500,
      patrimoineActuel: 50000,
      epargneMensuelle: 400,
      rendementAnnuelPct: 5,
    });
    expect(r.capitalNecessaire).toBe(340200);
    expect(r.capitalProjete).toBeGreaterThan(r.capitalNecessaire);
    expect(r.capitalManquant).toBe(0);
    expect(r.effortMensuelSupplementaire).toBe(0);
    expect(r.score).toEqual({ valeur: 100, niveau: "excellent" });
  });

  test("départ immédiat (ageDepart = ageActuel) : trajectoire réduite à un seul point, capital projeté = patrimoine actuel", () => {
    const r = simulerRetraite({
      statut: "salarie",
      ageActuel: 63,
      ageDepart: 63,
      revenuNetMensuel: 4000,
      patrimoineActuel: 200000,
      epargneMensuelle: 500,
      rendementAnnuelPct: 5,
    });
    expect(r.nbMoisAvantDepart).toBe(0);
    expect(r.capitalProjete).toBe(200000);
    expect(r.trajectoire).toEqual([{ age: 63, capitalActuel: 200000, capitalOptimise: 200000 }]);
  });

  test("objectifNiveauViePct explicite écrase le défaut de hypotheses.ts", () => {
    const r = simulerRetraite({
      statut: "salarie",
      ageActuel: 50,
      ageDepart: 65,
      revenuNetMensuel: 5000,
      patrimoineActuel: 0,
      epargneMensuelle: 0,
      rendementAnnuelPct: 5,
      objectifNiveauViePct: 0.7,
    });
    expect(r.ecartMensuel).toBe(750);
  });
});
