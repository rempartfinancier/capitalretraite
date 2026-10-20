// Suivi GTM : pousse un événement dans window.dataLayer (sans effet côté SSR).
// Événements utilisés : generate_lead (lead_source), simulateur_start,
// simulateur_complete, lead_magnet_download, rdv_click.
// Aucune donnée personnelle (email, nom) ne doit jamais être poussée ici.
export function pushEvent(event, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
