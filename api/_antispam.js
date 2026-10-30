// Filtre anti-spam partagé par les fonctions /api (le préfixe "_" empêche Vercel
// d'en faire une route). Un lead détecté comme spam reçoit quand même un 200
// côté appelant : le bot ne doit pas savoir qu'il a été repéré.

const DELAI_MIN_MS = 3000; // un humain met plus de 3 s à remplir un formulaire

function prenomIllisible(s) {
  if (typeof s !== "string") return false;
  const t = s.trim();
  // Chaîne aléatoire du type « ltijWFwXgpypUnWx » : longue, sans espace/tiret,
  // avec plusieurs majuscules au milieu du mot.
  const majusculesInternes = (t.slice(1).match(/[A-Z]/g) || []).length;
  return t.length >= 10 && !/[\s'-]/.test(t) && majusculesInternes >= 3;
}

function messageIllisible(s) {
  if (typeof s !== "string") return false;
  const t = s.trim();
  return t.length >= 10 && !/\s/.test(t);
}

function emailSuspect(s) {
  if (typeof s !== "string") return false;
  const local = s.split("@")[0] || "";
  // Astuce des points Gmail : b.e.w.o.x.o.q.i.0.80@gmail.com
  return (local.match(/\./g) || []).length >= 4;
}

export function estSpam(body) {
  const b = body || {};
  if (typeof b.SITE_WEB === "string" && b.SITE_WEB.trim() !== "") return true; // honeypot
  const ecoule = Number(b._elapsed);
  if (!Number.isFinite(ecoule) || ecoule < DELAI_MIN_MS) return true;
  const email = b.EMAIL ?? b.email;
  const prenom = b.PRENOM ?? b.prenom;
  const message = b.MESSAGE ?? b.message;
  if (emailSuspect(email)) return true;
  if (prenomIllisible(prenom)) return true;
  if (messageIllisible(message)) return true;
  return false;
}
