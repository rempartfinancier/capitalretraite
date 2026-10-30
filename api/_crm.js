// Relais serveur vers le CRM interne (rempart-crm, /api/ingest/lead) avec INGEST_TOKEN.
// Partagé par send-lead-email et subscribe : le CRM est un canal de réception à part
// entière — un lead n'est perdu que si TOUS les canaux (Brevo + CRM) échouent.
// Retourne true seulement si le CRM a confirmé (2xx).

const URL_CRM = "https://rempart-crm.vercel.app/api/ingest/lead";

export async function envoyerAuCrm({ email, prenom, telephone, message, source, pageUrl }, essais = 3) {
  const token = process.env.INGEST_TOKEN;
  if (!token) {
    console.error("[crm] INGEST_TOKEN absent sur Vercel — lead non transmis au CRM.");
    return false;
  }
  for (let i = 1; i <= essais; i++) {
    try {
      const r = await fetch(URL_CRM, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ sourceSite: "capitalretraite", source: source || "site", email, prenom, telephone, message, pageUrl }),
      });
      if (r.ok) return true;
      console.error(`[crm] refus ${r.status} (essai ${i}/${essais}):`, await r.text());
      if (r.status >= 400 && r.status < 500 && r.status !== 429) return false; // inutile de réessayer
    } catch (e) {
      console.error(`[crm] erreur réseau (essai ${i}/${essais}):`, e);
    }
    if (i < essais) await new Promise((ok) => setTimeout(ok, 400 * i));
  }
  return false;
}
