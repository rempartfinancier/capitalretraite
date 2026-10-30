// Moteur pur du calculateur « combien coûtent vraiment mes frais ».
// Aucun chiffre en dur : les grilles de frais viennent de FRAIS_TYPES
// (src/components/hypotheses.js) ; le rendement brut est une hypothèse saisie
// par le visiteur (valeur par défaut : SIMU_DEFAUTS). Le résultat est toujours
// une fourchette (frais minimaux / frais maximaux de la grille), jamais un
// chiffre unique.
//
// À VÉRIFIER : FRAIS_TYPES décrit des contrats d'assurance-vie. Les grilles
// propres aux PER ne sont pas distinguées dans hypotheses.js ; l'outil les
// applique par analogie et le dit à l'écran.

import { FRAIS_TYPES } from "../../components/hypotheses.js";

export const TYPES_CONTRAT = {
  contratBancaireTraditionnel: "Contrat bancaire ou d'assureur traditionnel",
  contratInternet: "Contrat en ligne (supports ETF)",
};

// Capital final : capital initial + versements mensuels en début de mois,
// capitalisation mensuelle équivalente, frais d'entrée prélevés sur chaque
// versement, frais annuels déduits du rendement. Frais d'arbitrage ignorés.
export function capitalFinal({ capitalInitial, versementMensuel, dureeAnnees, rendementBrutPct, fraisEntreePct, fraisAnnuelsPct }) {
  const n = Math.max(0, Math.round(dureeAnnees * 12));
  const net = (rendementBrutPct - fraisAnnuelsPct) / 100;
  const i = Math.pow(1 + Math.max(net, -0.99), 1 / 12) - 1;
  const entree = 1 - fraisEntreePct / 100;
  let capital = capitalInitial * entree;
  for (let m = 0; m < n; m++) {
    capital += versementMensuel * entree;
    capital *= 1 + i;
  }
  return capital;
}

function scenario(params, bornes) {
  const fraisAnnuelsPct = bornes.gestionAnnuelle + bornes.fraisSupports;
  const fraisEntreePct = bornes.entree;
  const avecFrais = capitalFinal({ ...params, fraisEntreePct, fraisAnnuelsPct });
  return { fraisAnnuelsPct, fraisEntreePct, avecFrais };
}

// Renvoie, pour un type de contrat, la fourchette du coût total des frais sur la durée.
export function calculerFrais(params, typeContrat) {
  const grille = FRAIS_TYPES[typeContrat];
  if (!grille) throw new Error("type de contrat inconnu : " + typeContrat);
  const sansFrais = capitalFinal({ ...params, fraisEntreePct: 0, fraisAnnuelsPct: 0 });
  const bas = scenario(params, {
    entree: grille.entree.min,
    gestionAnnuelle: grille.gestionAnnuelle.min,
    fraisSupports: grille.fraisSupports.min,
  });
  const haut = scenario(params, {
    entree: grille.entree.max,
    gestionAnnuelle: grille.gestionAnnuelle.max,
    fraisSupports: grille.fraisSupports.max,
  });
  const versements = params.capitalInitial + params.versementMensuel * Math.round(params.dureeAnnees * 12);
  return {
    typeContrat,
    source: grille.source,
    sansFrais,
    versements,
    fraisAnnuelsPct: { min: bas.fraisAnnuelsPct, max: haut.fraisAnnuelsPct },
    fraisEntreePct: { min: bas.fraisEntreePct, max: haut.fraisEntreePct },
    capitalFinal: { min: haut.avecFrais, max: bas.avecFrais }, // frais max => capital min
    coutTotal: { min: sansFrais - bas.avecFrais, max: sansFrais - haut.avecFrais },
  };
}

// Compare les deux types de contrat de la grille.
export function comparerContrats(params) {
  const a = calculerFrais(params, "contratBancaireTraditionnel");
  const b = calculerFrais(params, "contratInternet");
  return { a, b };
}
