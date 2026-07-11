// Proxy serverless minimal (Vercel Functions, zéro-config) : reçoit un lead
// depuis le navigateur et le relaie vers le CRM interne (rempart-crm) avec
// INGEST_TOKEN, qui ne doit JAMAIS être exposé côté client sur ce site
// statique — voir src/components/config.js, "à défaut, passer par un petit
// proxy serverless qui détient la clé". Tourne EN PLUS de Brevo (postToBrevo
// dans Forms.jsx), jamais à sa place : toujours 200, jamais bloquant pour le
// visiteur, erreur avalée et loguée côté serveur.

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

  const token = process.env.INGEST_TOKEN;
  if (!token) {
    res.status(200).json({ ok: true });
    return;
  }

  const { email, prenom, telephone, message } = req.body || {};
  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "email_requis" });
    return;
  }

  try {
    const r = await fetch("https://rempart-crm.vercel.app/api/ingest/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ sourceSite: "capitalretraite", email, prenom, telephone, message }),
    });
    if (!r.ok) {
      console.error("[notifier-crm] CRM interne a refusé le lead:", r.status, await r.text());
    }
  } catch (e) {
    console.error("[notifier-crm] Erreur notification CRM interne:", e);
  }

  res.status(200).json({ ok: true });
}
