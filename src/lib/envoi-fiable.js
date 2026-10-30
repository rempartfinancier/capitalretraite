// Envoi « fiable » côté navigateur : la demande est écrite dans le localStorage avant
// l'appel, et n'est retirée qu'après confirmation du serveur (2xx). Les envois restés
// en attente sont rejoués au chargement, au retour de la connexion et toutes les minutes.
// Un doublon vaut mieux qu'un lead perdu.
const CLE = "cr-envois-en-attente";
const AGE_MAX_MS = 7 * 24 * 3600 * 1000;
const TENTATIVES_MAX = 15;

function lire() {
  try {
    const l = JSON.parse(window.localStorage.getItem(CLE) || "[]");
    return Array.isArray(l) ? l : [];
  } catch {
    return [];
  }
}
function ecrire(liste) {
  try {
    if (liste.length === 0) window.localStorage.removeItem(CLE);
    else window.localStorage.setItem(CLE, JSON.stringify(liste));
  } catch {
    /* stockage indisponible : pas de rejeu possible */
  }
}
const retirer = (id) => ecrire(lire().filter((e) => e.id !== id));

async function poster(url, corps) {
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corps),
  });
  return r.ok;
}

// POST avec 3 essais (réseau ou 5xx/429), 4xx définitifs sans nouvel essai.
async function posterAvecReprises(url, corps) {
  for (let i = 1; i <= 3; i++) {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corps),
      });
      if (r.ok) return true;
      if (r.status >= 400 && r.status < 500 && r.status !== 429) return false;
    } catch {
      /* réseau : on retente */
    }
    if (i < 3) await new Promise((ok) => setTimeout(ok, 600 * i));
  }
  return false;
}

/** Envoie `corps` vers `url` ; renvoie true si confirmé, false sinon (reste alors en attente, rejoué plus tard). */
export async function envoyerFiable(url, corps) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  ecrire([...lire(), { id, url, corps, creeLe: Date.now(), tentatives: 1 }]);
  const ok = await posterAvecReprises(url, corps);
  if (ok) retirer(id);
  return ok;
}

let rejeuEnCours = false;
export async function rejouerEnvoisEnAttente() {
  if (typeof window === "undefined" || rejeuEnCours) return;
  rejeuEnCours = true;
  try {
    for (const e of lire()) {
      if (Date.now() - e.creeLe > AGE_MAX_MS || e.tentatives >= TENTATIVES_MAX) {
        console.error("[envoi-fiable] Abandon après tentatives/âge dépassés :", e.url);
        retirer(e.id);
        continue;
      }
      ecrire(lire().map((x) => (x.id === e.id ? { ...x, tentatives: x.tentatives + 1 } : x)));
      try {
        if (await poster(e.url, e.corps)) retirer(e.id);
      } catch {
        /* toujours hors ligne : conservé */
      }
    }
  } finally {
    rejeuEnCours = false;
  }
}

export function demarrerRejeu() {
  if (typeof window === "undefined") return;
  rejouerEnvoisEnAttente();
  window.addEventListener("online", rejouerEnvoisEnAttente);
  setInterval(rejouerEnvoisEnAttente, 60000);
}
