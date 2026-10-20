import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { routesMeta } from "../../routes.jsx";

const NOUVELLES = {
  "/checklist-retraite-5-ans": "LeadMagnetChecklistRetraite.jsx",
  "/outils/frais-per-assurance-vie": "OutilFrais.jsx",
  "/outils/decote-surcote-trimestres": "OutilDecoteSurcote.jsx",
};

describe("pages d'entonnoir (outils et checklist)", () => {
  for (const [chemin, fichier] of Object.entries(NOUVELLES)) {
    const meta = routesMeta.find((r) => r.path === chemin);
    it(`${chemin} : métadonnées`, () => {
      expect(meta).toBeDefined();
      expect(meta.title.length).toBeLessThanOrEqual(70);
      expect(meta.description.length).toBeLessThanOrEqual(160);
      expect(`${meta.title} ${meta.description}`).not.toMatch(/pollet|rempart/i);
    });
    it(`${chemin} : vouvoiement, pas de marque, RiskNotice ou CTA`, () => {
      const src = readFileSync(new URL(`../../pages/${fichier}`, import.meta.url), "utf8");
      expect(src).not.toMatch(/pollet|rempart/i);
      expect(src).not.toMatch(/(?<![\p{L}\p{N}])(tu|ton|ta|tes|toi)(?![\p{L}\p{N}])/iu);
      expect(src).toMatch(/RiskNotice/);
    });
  }
});
