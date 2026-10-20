import { afterEach, describe, expect, it } from "vitest";
import { pushEvent } from "./tracking.js";

afterEach(() => {
  delete globalThis.window;
});

describe("pushEvent", () => {
  it("ne plante pas sans window (SSR)", () => {
    expect(() => pushEvent("generate_lead", { lead_source: "bilan" })).not.toThrow();
  });
  it("pousse l'événement dans dataLayer, sans donnée personnelle", () => {
    globalThis.window = {};
    pushEvent("generate_lead", { lead_source: "lead_magnet_av" });
    pushEvent("rdv_click");
    expect(globalThis.window.dataLayer).toEqual([
      { event: "generate_lead", lead_source: "lead_magnet_av" },
      { event: "rdv_click" },
    ]);
  });
});
