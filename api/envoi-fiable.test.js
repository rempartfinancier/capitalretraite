import { afterEach, describe, expect, it, vi } from "vitest";
import handler from "./subscribe.js";

function res() {
  const r = { code: 0, body: null, setHeader() {}, status(c) { r.code = c; return r; }, json(b) { r.body = b; return r; }, end() { return r; } };
  return r;
}
const body = { EMAIL: "a@b.fr", PRENOM: "Léa", source: "bilan", _elapsed: 9000 };

afterEach(() => { vi.restoreAllMocks(); delete process.env.BREVO_API_KEY; delete process.env.INGEST_TOKEN; });

describe("subscribe : aucune perte si un canal tient", () => {
  it("200 si Brevo échoue mais le CRM confirme", async () => {
    process.env.BREVO_API_KEY = "k"; process.env.INGEST_TOKEN = "t";
    vi.stubGlobal("fetch", vi.fn(async (u) => ({ ok: u.includes("rempart-crm"), status: u.includes("rempart-crm") ? 200 : 500, text: async () => "" })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const r = res(); await handler({ method: "POST", body }, r);
    expect(r.code).toBe(200); expect(r.body.crm).toBe(true); expect(r.body.brevo).toBe(false);
  });
  it("502 si tous les canaux échouent", async () => {
    process.env.BREVO_API_KEY = "k"; process.env.INGEST_TOKEN = "t";
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 500, text: async () => "" })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const r = res(); await handler({ method: "POST", body }, r);
    expect(r.code).toBe(502);
  });
});
