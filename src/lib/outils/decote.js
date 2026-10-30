// Moteur pur de l'estimateur décote / surcote / trimestres manquants (régime
// général). Les paramètres légaux viennent de REGIME_GENERAL
// (src/components/hypotheses.js). Rien n'est inventé :
//  - la durée d'assurance requise et l'âge légal dépendent de la génération :
//    ils sont SAISIS par le visiteur (à lire sur son relevé info-retraite.fr) ;
//  - le coût d'un rachat de trimestres, le minimum contributif et le malus
//    Agirc-Arrco ne figurent pas dans hypotheses.js : ils sont listés dans
//    DONNEES_A_VERIFIER et AUCUN chiffre n'est affiché pour eux.

import { REGIME_GENERAL } from "../../components/hypotheses.js";

export const DONNEES_A_VERIFIER = [
  "Durée d'assurance requise et âge légal selon la génération : à saisir depuis votre relevé (à vérifier, non intégrés ici)",
  "Coût d'un rachat de trimestres (dépend de l'âge, des revenus et de l'option choisie) : à vérifier, aucun chiffre affiché",
  "Minimum contributif et coefficients de solidarité Agirc-Arrco : à vérifier, non pris en compte",
  "Régimes spéciaux, fonction publique, carrières longues, invalidité, inaptitude : hors périmètre de l'outil",
];

// Hypothèse de calcul (affichée à l'écran) : les trimestres sont validés au
// rythme de 4 par année d'activité jusqu'à la date de départ.
export const TRIMESTRES_PAR_AN = 4;

export function estimerDecoteSurcote({ ageActuel, trimestresValides, trimestresRequis, ageLegal, ageDepart }) {
  const entrees = [ageActuel, trimestresValides, trimestresRequis, ageLegal, ageDepart];
  if (entrees.some((v) => !Number.isFinite(v) || v < 0)) return { erreur: "valeurs_invalides" };
  if (ageDepart < ageActuel) return { erreur: "depart_avant_aujourdhui" };

  const anneesActivite = ageDepart - ageActuel;
  const trimestresAuDepart = trimestresValides + anneesActivite * TRIMESTRES_PAR_AN;
  const trimestresManquants = Math.max(0, trimestresRequis - trimestresAuDepart);

  // Décote : plus petit de (trimestres manquants, trimestres entre le départ et
  // l'âge d'annulation automatique de la décote, plafond réglementaire).
  const trimestresAvantAgeAuto = Math.max(0, (REGIME_GENERAL.ageTauxPleinAutomatique - ageDepart) * TRIMESTRES_PAR_AN);
  const trimestresDecote = Math.min(trimestresManquants, trimestresAvantAgeAuto, REGIME_GENERAL.decotePlafondTrimestres);
  const decotePct = trimestresDecote * REGIME_GENERAL.decoteParTrimestre;

  // Surcote : trimestres au-delà de la durée requise ET après l'âge légal.
  const trimestresExcedentaires = Math.max(0, trimestresAuDepart - trimestresRequis);
  const trimestresApresAgeLegal = Math.max(0, (ageDepart - ageLegal) * TRIMESTRES_PAR_AN);
  const trimestresSurcote = Math.min(trimestresExcedentaires, trimestresApresAgeLegal);
  const surcotePct = trimestresSurcote * REGIME_GENERAL.surcoteParTrimestre;

  return {
    trimestresAuDepart,
    trimestresManquants,
    trimestresDecote,
    decotePct,
    trimestresSurcote,
    surcotePct,
    // coefficient appliqué à la pension de base : négatif = décote
    variationPct: surcotePct - decotePct,
    rachatPossibleMax: Math.min(trimestresManquants, REGIME_GENERAL.rachatTrimestresPlafond),
    plafondRachat: REGIME_GENERAL.rachatTrimestresPlafond,
  };
}

// Variation selon l'âge de départ : trois scénarios (un an plus tôt, l'âge choisi, un an plus tard).
export function scenariosDepart(params) {
  return [-1, 0, 1]
    .map((delta) => ({ ageDepart: params.ageDepart + delta }))
    .filter((s) => s.ageDepart >= params.ageActuel)
    .map((s) => ({ ageDepart: s.ageDepart, ...estimerDecoteSurcote({ ...params, ageDepart: s.ageDepart }) }));
}

// Applique la variation à une pension de base saisie (€/mois) : fourchette entre le
// scénario le plus défavorable et le plus favorable parmi ceux étudiés.
export function pensionAjustee(pensionBase, variationPct) {
  return pensionBase * (1 + variationPct / 100);
}
