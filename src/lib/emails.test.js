import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { routesMeta } from "../routes.jsx";

const DOSSIER = new URL("../../docs/emails/", import.meta.url);
const fichiers = readdirSync(DOSSIER).filter((f) => f.endsWith(".md"));
const chemins = new Set(routesMeta.map((r) => r.path));

describe("séquences email (docs/emails)", () => {
  for (const f of fichiers) {
    const texte = readFileSync(new URL(f, DOSSIER), "utf8");
    it(`${f} : liens internes existants`, () => {
      const liens = [...texte.matchAll(/https:\/\/www\.capitalretraite\.com(\/[^\s)]*)/g)].map((m) => m[1]);
      for (const l of liens) {
        if (l.endsWith(".pdf")) continue;
        expect(chemins.has(l), l).toBe(true);
      }
    });
    it(`${f} : sans marque ni personne, vouvoiement, désinscription`, () => {
      expect(texte).not.toMatch(/pollet|rempart/i);
      expect(texte).not.toMatch(/(?<![\p{L}\p{N}])(tu|ton|ta|tes|toi)(?![\p{L}\p{N}])/iu);
      expect(texte).toMatch(/unsubscribe/);
    });
  }
});
