// Vercel Function : crée ou met à jour un contact Brevo et l'inscrit à la liste
// correspondant à la source du lead (POST /v3/contacts, updateEnabled).
// BREVO_API_KEY reste côté serveur (jamais en VITE_*). Le code HTTP renvoyé
// reflète un vrai succès/échec Brevo.

import { estSpam } from "./_antispam.js";

// source -> variable d'environnement contenant l'identifiant numérique de la liste Brevo.
export const SOURCES = {
  lead_magnet_av: "BREVO_LIST_ID_LEAD_MAGNET_AV",
  lead_magnet_checklist: "BREVO_LIST_ID_LEAD_MAGNET_CHECKLIST",
  simulateur: "BREVO_LIST_ID_SIMULATEUR",
  outil_frais: "BREVO_LIST_ID_OUTILS",
  outil_decote: "BREVO_LIST_ID_OUTILS",
  bilan: "BREVO_LIST_ID_BILAN",
  newsletter: "BREVO_LIST_ID_NEWSLETTER",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Fonction pure (testée) : valide le corps et prépare la charge utile Brevo.
export function preparerContact(body, env = process.env) {
  const b = body || {};
  const brut = b.EMAIL ?? b.email;
  const email = typeof brut === "string" ? brut.trim() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) return { erreur: "email_invalide" };
  const source = b.source;
  if (typeof source !== "string" || !Object.prototype.hasOwnProperty.call(SOURCES, source)) {
    return { erreur: "source_inconnue" };
  }
  const listId = Number.parseInt(env[SOURCES[source]], 10);
  const listeConfiguree = Number.isInteger(listId) && listId > 0;
  const p = b.PRENOM ?? b.prenom;
  const prenom = typeof p === "string" ? p.trim().slice(0, 100) : "";
  const charge = { email, updateEnabled: true };
  if (prenom) charge.attributes = { PRENOM: prenom };
  if (listeConfiguree) charge.listIds = [listId];
  return { charge, source, listeConfiguree };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://www.capitalretraite.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("[subscribe] BREVO_API_KEY absente — contact non enregistré.");
    res.status(500).json({ error: "brevo_non_configure" });
    return;
  }

  const prep = preparerContact(req.body);
  if (prep.erreur) {
    res.status(400).json({ error: prep.erreur });
    return;
  }

  if (estSpam(req.body)) {
    console.warn("[subscribe] Lead rejeté (anti-spam).");
    res.status(200).json({ ok: true }); // le bot ne doit pas savoir qu'il est repéré
    return;
  }

  if (!prep.listeConfiguree) {
    // Le contact est tout de même créé, mais la séquence email ne démarrera pas.
    console.error(`[subscribe] ${SOURCES[prep.source]} absente ou invalide : contact créé sans liste.`);
  }

  try {
    const r = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", "api-key": apiKey },
      body: JSON.stringify(prep.charge),
    });
    if (!r.ok) {
      console.error("[subscribe] Brevo a refusé le contact:", r.status, await r.text());
      res.status(502).json({ error: "brevo_echec" });
      return;
    }
  } catch (e) {
    console.error("[subscribe] Erreur réseau vers Brevo:", e);
    res.status(502).json({ error: "brevo_erreur_reseau" });
    return;
  }

  res.status(200).json({ ok: true });
}
