import { describe, it, expect } from "vitest";
import { articles } from "./articles.js";

// Cohérence SEO/éditoriale de chaque article publié. Vide tant qu'aucun article
// n'existe : le test passe, et se durcit automatiquement à chaque ajout.
const INTERDIT_MARQUE = /pollet|rempart/i;
const TUTOIEMENT = /(?<![\p{L}])(tu|ton|ta|tes|toi|te)(?![\p{L}])/iu;
const slugs = new Set();

describe.each(articles.map((a) => [a.meta.slug, a]))("article %s", (slug, { meta }) => {
  it("a des métadonnées valides", () => {
    expect(slugs.has(slug)).toBe(false);
    slugs.add(slug);
    expect(["guide", "actualite"]).toContain(meta.type);
    expect(meta.title.length).toBeLessThanOrEqual(70);
    expect(meta.description.length).toBeLessThanOrEqual(160);
    expect(meta.resume?.length).toBeGreaterThan(20);
    expect(meta.datePublication).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(meta.dateMiseAJour).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(meta.sources?.length).toBeGreaterThan(0);
    expect(meta.liens?.length).toBeGreaterThanOrEqual(3);
  });
  it("ne cite ni la marque personnelle ni le tutoiement", () => {
    const texte = JSON.stringify(meta);
    expect(texte).not.toMatch(INTERDIT_MARQUE);
    expect(texte).not.toMatch(TUTOIEMENT);
  });
});

it("registre chargé", () => {
  expect(Array.isArray(articles)).toBe(true);
});
