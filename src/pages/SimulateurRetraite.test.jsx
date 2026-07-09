/**
 * Test de fumée du diagnostic retraite : chaque étape du parcours doit se
 * rendre côté serveur sans erreur (le prerender SSG ne couvre que l'étape 1,
 * ce test couvre les cinq autres chemins de rendu).
 */

import { describe, expect, test } from "vitest";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import SimulateurRetraite from "./SimulateurRetraite.jsx";

const rendre = (etape) =>
  renderToString(
    <StaticRouter location="/simulateur-retraite">
      <SimulateurRetraite etapeInitiale={etape} />
    </StaticRouter>
  );

describe("SimulateurRetraite — rendu de chaque étape", () => {
  const attendus = {
    1: "Étape 1 — Votre situation",
    2: "Baisse de revenus estimée",
    3: "Quel niveau de vie voulez-vous conserver ?",
    4: "Votre score retraite",
    5: "Les pistes pour combler l&#x27;écart",
    6: "Votre feuille de route",
  };

  for (const [etape, marqueur] of Object.entries(attendus)) {
    test(`étape ${etape} : rend « ${marqueur} » sans erreur`, () => {
      const html = rendre(Number(etape));
      expect(html).toContain(marqueur);
      expect(html).toContain("Hypothèses de simulation");
    });
  }

  test("étape 4 : la jauge affiche le score et les cinq scénarios", () => {
    const html = rendre(4);
    expect(html).toContain("sim-score-jauge");
    expect(html).toContain("Marchés prudents");
    expect(html).toContain("Marchés porteurs");
    expect(html).toContain("plus tôt");
    expect(html).toContain("plus tard");
  });
});
