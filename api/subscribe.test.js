import { describe, expect, it } from "vitest";
import { preparerContact, SOURCES } from "./subscribe.js";

const env = { BREVO_LIST_ID_LEAD_MAGNET_AV: "12", BREVO_LIST_ID_OUTILS: "7" };

describe("preparerContact", () => {
  it("prépare un contact avec sa liste", () => {
    const r = preparerContact({ EMAIL: " a@b.fr ", PRENOM: "Léa", source: "lead_magnet_av" }, env);
    expect(r.charge).toEqual({ email: "a@b.fr", updateEnabled: true, attributes: { PRENOM: "Léa" }, listIds: [12] });
  });
  it("rejette un email invalide ou une source inconnue", () => {
    expect(preparerContact({ EMAIL: "x", source: "bilan" }, env).erreur).toBe("email_invalide");
    expect(preparerContact({ EMAIL: "a@b.fr", source: "__proto__" }, env).erreur).toBe("source_inconnue");
  });
  it("signale une liste non configurée sans bloquer", () => {
    const r = preparerContact({ EMAIL: "a@b.fr", source: "bilan" }, env);
    expect(r.listeConfiguree).toBe(false);
    expect(r.charge.listIds).toBeUndefined();
  });
  it("mappe toutes les sources sur une variable BREVO_LIST_ID_*", () => {
    for (const v of Object.values(SOURCES)) expect(v).toMatch(/^BREVO_LIST_ID_/);
  });
});
