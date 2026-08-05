// Vercel Function (zéro-config) : reçoit un lead Contact ou Bilan et envoie un
// email de notification via l'API transactionnelle Brevo (POST /v3/smtp/email),
// avec BREVO_API_KEY côté serveur uniquement (jamais dans le bundle client).
//
// Remplace, pour FormContact et FormBilan UNIQUEMENT, l'ancien postToBrevo()
// en mode no-cors vers une "URL d'action" de formulaire Brevo : VITE_BREVO_
// FORM_ACTION_CONTACT et VITE_BREVO_FORM_ACTION_BILAN n'ont jamais été
// configurées sur Vercel (seule VITE_BREVO_FORM_ACTION_GUIDE existe, encore
// utilisée par FormLeadMagnet — voir src/components/Forms.jsx). Contrairement
// à /api/notifier-crm.js (CRM interne, toujours en plus, fire-and-forget,
// toujours 200), ici le code HTTP renvoyé DOIT refléter un vrai succès/échec
// Brevo : c'est le seul canal d'envoi pour ces deux formulaires.

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
    console.error("[send-lead-email] BREVO_API_KEY absente sur Vercel — email non envoyé.");
    res.status(500).json({ error: "brevo_non_configure" });
    return;
  }

  // Mêmes noms de champs que ceux déjà postés à Brevo/notifierCrmInterne
  // depuis Forms.jsx (attributs de formulaire Brevo, en majuscules) :
  // EMAIL/PRENOM/SMS/MESSAGE pour Contact, + TRANCHE_AGE/TRANCHE_PATRIMOINE/
  // SITUATION pour Bilan. `formulaire` est ajouté par Forms.jsx ("contact" ou
  // "bilan") pour distinguer l'origine du lead ici.
  const {
    formulaire,
    EMAIL: email,
    PRENOM: prenom,
    SMS: telephone,
    MESSAGE: message,
    TRANCHE_AGE: trancheAge,
    TRANCHE_PATRIMOINE: tranchePatrimoine,
    SITUATION: situation,
  } = req.body || {};

  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "email_requis" });
    return;
  }

  const estBilan = formulaire === "bilan";
  const sujet = estBilan
    ? "Nouveau lead Bilan — Capital Retraite"
    : "Nouveau lead Contact — Capital Retraite";

  // Corps texte : reprend toutes les informations soumises par le prospect.
  const lignes = [
    `Formulaire : ${estBilan ? "Bilan retraite gratuit" : "Contact"}`,
    `Prénom : ${prenom || "(non renseigné)"}`,
    `Email : ${email}`,
    telephone ? `Téléphone : ${telephone}` : null,
    estBilan ? `Âge : ${trancheAge || "(non renseigné)"}` : null,
    estBilan ? `Patrimoine financier estimé : ${tranchePatrimoine || "(non renseigné)"}` : null,
    estBilan ? `Situation : ${situation || "(non renseigné)"}` : null,
    message ? `Message :\n${message}` : null,
  ].filter(Boolean);

  try {
    const r = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": apiKey },
      body: JSON.stringify({
        sender: { name: "Capital Retraite", email: "contact@capitalretraite.com" },
        to: [{ email: "contact@capitalretraite.com" }, { email: "alexandre.pollet@uptimi.fr" }],
        replyTo: { email, name: prenom || undefined },
        subject: sujet,
        textContent: lignes.join("\n"),
      }),
    });
    if (!r.ok) {
      console.error("[send-lead-email] Brevo a refusé l'envoi:", r.status, await r.text());
      res.status(502).json({ error: "brevo_echec" });
      return;
    }
  } catch (e) {
    console.error("[send-lead-email] Erreur réseau vers Brevo:", e);
    res.status(502).json({ error: "brevo_erreur_reseau" });
    return;
  }

  res.status(200).json({ ok: true });
}
