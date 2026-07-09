// ============================================================
// Moteur pur du simulateur retraite — aucune dépendance React.
// Formules et hypothèses documentées dans
// docs/simulateur-retraite-moteur.md (hub rempartfinancier.fr) ;
// hypothèses chiffrées dans ./hypotheses.ts (aucun taux en dur ici).
// Porté tel quel depuis rempartfinancier/src/lib/simulateur-retraite/
// engine.ts — moteur pur, portable sans changement entre les deux sites.
// ============================================================

import {
  HORIZON_DECUMULATION_ANNEES,
  MAJORATION_SCENARIO_OPTIMISE_PTS,
  OBJECTIF_NIVEAU_VIE_RETRAITE,
  REND_OPTIMISE_PLAFOND_PCT,
  SCORE_RETRAITE_SEUILS,
  TAUX_REMPLACEMENT_PAR_STATUT,
  type StatutProfessionnel,
} from "./hypotheses";

export type { StatutProfessionnel };

export type NiveauScoreRetraite = "excellent" | "attention" | "critique";

export interface SimulationRetraiteInput {
  statut: StatutProfessionnel;
  ageActuel: number;
  ageDepart: number;
  revenuNetMensuel: number;
  patrimoineActuel: number;
  epargneMensuelle: number;
  rendementAnnuelPct: number;
  /** Optionnel — défaut : OBJECTIF_NIVEAU_VIE_RETRAITE.moyen (85 %). */
  objectifNiveauViePct?: number;
}

export interface PointTrajectoire {
  age: number;
  capitalActuel: number;
  capitalOptimise: number;
}

export interface PertesRevenus {
  /** Baisse brute de revenus à la retraite (revenu − pension), plancher 0. */
  mensuelle: number;
  annuelle: number;
  /** Cumul sur l'horizon de décumulation retenu. */
  surHorizon: number;
  horizonAnnees: number;
}

export interface ScoreRetraite {
  /** Taux de couverture capital projeté / capital nécessaire, plafonné à 100. */
  valeur: number;
  niveau: NiveauScoreRetraite;
}

export interface SimulationRetraiteResultat {
  pensionEstimeeMensuelle: number;
  tauxRemplacement: number;
  ecartMensuel: number;
  nbMoisAvantDepart: number;
  capitalNecessaire: number;
  capitalProjete: number;
  capitalManquant: number;
  effortMensuelSupplementaire: number;
  rendementOptimiseAnnuelPct: number;
  capitalProjeteOptimise: number;
  pertes: PertesRevenus;
  score: ScoreRetraite;
  trajectoire: PointTrajectoire[];
}

// Capitalisation d'un capital initial + versements mensuels constants, à
// taux mensuel constant. Convention : versements en fin de mois (pas de
// facteur (1+i) supplémentaire — cf. docs, §Conventions).
export function capitaliser(
  principal: number,
  versementMensuel: number,
  nbMois: number,
  tauxMensuel: number
): number {
  const n = Math.max(0, Math.round(nbMois));
  if (Math.abs(tauxMensuel) < 1e-12) return principal + versementMensuel * n;
  const facteur = Math.pow(1 + tauxMensuel, n);
  return principal * facteur + versementMensuel * ((facteur - 1) / tauxMensuel);
}

export function calculerPensionEstimee(
  revenuNetMensuel: number,
  statut: StatutProfessionnel
): number {
  return revenuNetMensuel * (TAUX_REMPLACEMENT_PAR_STATUT[statut] ?? 0.5);
}

export function calculerEcartMensuel(
  revenuNetMensuel: number,
  pensionEstimeeMensuelle: number,
  objectifNiveauViePct: number = OBJECTIF_NIVEAU_VIE_RETRAITE.moyen
): number {
  return Math.max(0, revenuNetMensuel * objectifNiveauViePct - pensionEstimeeMensuelle);
}

export function calculerCapitalNecessaire(
  ecartMensuel: number,
  horizonDecumulationAnnees: number = HORIZON_DECUMULATION_ANNEES
): number {
  return ecartMensuel * 12 * horizonDecumulationAnnees;
}

// Facteur d'accumulation utilisé pour résoudre l'effort mensuel requis :
// capital = versement × factor(nbMois, tauxMensuel).
function facteurAccumulation(nbMois: number, tauxMensuel: number): number {
  const n = Math.max(0, Math.round(nbMois));
  if (Math.abs(tauxMensuel) < 1e-12) return n;
  return (Math.pow(1 + tauxMensuel, n) - 1) / tauxMensuel;
}

export function calculerEffortMensuelSupplementaire(
  capitalManquant: number,
  nbMois: number,
  tauxMensuel: number
): number {
  const factor = facteurAccumulation(nbMois, tauxMensuel);
  return capitalManquant > 0 && factor > 0 ? capitalManquant / factor : 0;
}

export function calculerRendementOptimise(rendementAnnuelPct: number): number {
  return Math.min(rendementAnnuelPct + MAJORATION_SCENARIO_OPTIMISE_PTS, REND_OPTIMISE_PLAFOND_PCT);
}

// Baisse brute de revenus à la retraite (avant tout objectif de niveau de
// vie) : c'est le chiffre « choc » du diagnostic — mensuel, annuel, cumulé
// sur l'horizon de décumulation.
export function calculerPertes(
  revenuNetMensuel: number,
  pensionEstimeeMensuelle: number,
  horizonAnnees: number = HORIZON_DECUMULATION_ANNEES
): PertesRevenus {
  const mensuelle = Math.max(0, revenuNetMensuel - pensionEstimeeMensuelle);
  return {
    mensuelle,
    annuelle: mensuelle * 12,
    surHorizon: mensuelle * 12 * horizonAnnees,
    horizonAnnees,
  };
}

// Score retraite /100 : taux de couverture du capital nécessaire par le
// capital projeté, plafonné à 100. capitalNecessaire nul (pension déjà au
// niveau de l'objectif) → couverture totale, score 100.
export function calculerScoreRetraite(
  capitalProjete: number,
  capitalNecessaire: number
): ScoreRetraite {
  const couverture =
    capitalNecessaire > 0 ? Math.max(0, capitalProjete) / capitalNecessaire : 1;
  const valeur = Math.round(Math.min(1, couverture) * 100);
  const niveau: NiveauScoreRetraite =
    valeur >= SCORE_RETRAITE_SEUILS.excellent
      ? "excellent"
      : valeur >= SCORE_RETRAITE_SEUILS.attention
        ? "attention"
        : "critique";
  return { valeur, niveau };
}

export function simulerRetraite(input: SimulationRetraiteInput): SimulationRetraiteResultat {
  const {
    statut,
    ageActuel,
    ageDepart,
    revenuNetMensuel,
    patrimoineActuel,
    epargneMensuelle,
    rendementAnnuelPct,
    objectifNiveauViePct = OBJECTIF_NIVEAU_VIE_RETRAITE.moyen,
  } = input;

  const pensionEstimeeMensuelle = calculerPensionEstimee(revenuNetMensuel, statut);
  const tauxRemplacement =
    revenuNetMensuel > 0 ? pensionEstimeeMensuelle / revenuNetMensuel : 0;
  const ecartMensuel = calculerEcartMensuel(revenuNetMensuel, pensionEstimeeMensuelle, objectifNiveauViePct);
  const nbMoisAvantDepart = Math.max(0, (ageDepart - ageActuel) * 12);
  const tauxMensuel = rendementAnnuelPct / 100 / 12;

  const capitalProjete = capitaliser(patrimoineActuel, epargneMensuelle, nbMoisAvantDepart, tauxMensuel);
  const capitalNecessaire = calculerCapitalNecessaire(ecartMensuel);
  const capitalManquant = Math.max(0, capitalNecessaire - capitalProjete);
  const effortMensuelSupplementaire = calculerEffortMensuelSupplementaire(
    capitalManquant,
    nbMoisAvantDepart,
    tauxMensuel
  );

  const rendementOptimiseAnnuelPct = calculerRendementOptimise(rendementAnnuelPct);
  const tauxMensuelOptimise = rendementOptimiseAnnuelPct / 100 / 12;
  const capitalProjeteOptimise = capitaliser(
    patrimoineActuel,
    epargneMensuelle,
    nbMoisAvantDepart,
    tauxMensuelOptimise
  );

  const nbAnnees = Math.max(0, ageDepart - ageActuel);
  const trajectoire: PointTrajectoire[] = [];
  for (let y = 0; y <= nbAnnees; y++) {
    const mo = y * 12;
    trajectoire.push({
      age: ageActuel + y,
      capitalActuel: Math.round(capitaliser(patrimoineActuel, epargneMensuelle, mo, tauxMensuel)),
      capitalOptimise: Math.round(capitaliser(patrimoineActuel, epargneMensuelle, mo, tauxMensuelOptimise)),
    });
  }

  return {
    pensionEstimeeMensuelle,
    tauxRemplacement,
    ecartMensuel,
    nbMoisAvantDepart,
    capitalNecessaire,
    capitalProjete,
    capitalManquant,
    effortMensuelSupplementaire,
    rendementOptimiseAnnuelPct,
    capitalProjeteOptimise,
    pertes: calculerPertes(revenuNetMensuel, pensionEstimeeMensuelle),
    score: calculerScoreRetraite(capitalProjete, capitalNecessaire),
    trajectoire,
  };
}
