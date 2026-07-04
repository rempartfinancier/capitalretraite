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
  TAUX_REMPLACEMENT_PAR_STATUT,
  type StatutProfessionnel,
} from "./hypotheses";

export type { StatutProfessionnel };

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

export interface SimulationRetraiteResultat {
  pensionEstimeeMensuelle: number;
  ecartMensuel: number;
  nbMoisAvantDepart: number;
  capitalNecessaire: number;
  capitalProjete: number;
  capitalManquant: number;
  effortMensuelSupplementaire: number;
  rendementOptimiseAnnuelPct: number;
  capitalProjeteOptimise: number;
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
    ecartMensuel,
    nbMoisAvantDepart,
    capitalNecessaire,
    capitalProjete,
    capitalManquant,
    effortMensuelSupplementaire,
    rendementOptimiseAnnuelPct,
    capitalProjeteOptimise,
    trajectoire,
  };
}
