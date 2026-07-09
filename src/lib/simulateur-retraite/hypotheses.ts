// ============================================================
// HYPOTHÈSES CHIFFRÉES DU SIMULATEUR RETRAITE — source de vérité
// ------------------------------------------------------------
// Règle du site (cf. src/components/hypotheses.js) : aucun taux ou
// horizon n'est écrit en dur dans le moteur (engine.ts) ou dans le
// composant UI. Tout chiffre vient d'ici, daté et sourcé. Marqué
// « À VÉRIFIER » quand la source précise reste à confirmer par
// Alexandre avant publication.
//
// Ce fichier duplique volontairement (plutôt que d'importer)
// DECUMULATION.esperanceVie65 de src/components/hypotheses.js et son
// équivalent dans le moteur du hub rempartfinancier.fr
// (src/lib/simulateur-retraite/hypotheses.ts) : le moteur doit rester
// portable et autonome (même logique que loimalraux/src/lib/simulateur/
// fiscal.ts et presets.ts, qui n'importent rien d'un fichier partagé).
// Les trois fichiers doivent être révisés ensemble à chaque millésime.
// ============================================================

export const HYPOTHESES_MAJ = "juillet 2026";

export type StatutProfessionnel = "salarie" | "tns" | "fonctionnaire" | "expatrie";

// ---- Taux de remplacement net par catégorie professionnelle ----
// Ordres de grandeur pédagogiques inspirés des publications annuelles
// du Conseil d'Orientation des Retraites (COR), qui suivent le taux de
// remplacement net moyen par génération et catégorie socio-professionnelle.
// CE NE SONT PAS DES TAUX GARANTIS : la pension réelle dépend du régime
// d'affiliation, de la carrière complète et de la génération de l'assuré.
// Valeurs à actualiser sur le dernier rapport annuel du COR — À VÉRIFIER.
export const TAUX_REMPLACEMENT_PAR_STATUT: Record<StatutProfessionnel, number> = {
  salarie: 0.55,
  tns: 0.42,
  fonctionnaire: 0.75,
  expatrie: 0.5,
};
export const TAUX_REMPLACEMENT_SOURCE =
  "Ordre de grandeur pédagogique inspiré des publications annuelles du COR (Conseil d'Orientation des Retraites) sur le taux de remplacement net par catégorie — non garanti, dépend du régime, de la carrière et de la génération. À VÉRIFIER sur le dernier rapport COR.";

// ---- Objectif de niveau de vie visé à la retraite ----
// Fourchette usuelle retenue en conseil patrimonial (maintenir un train
// de vie proche de l'activité, sans coûts professionnels ni épargne à
// financer) — présentée en UI comme hypothèse indicative, pas une norme.
// `options` : paliers proposés à l'utilisateur à l'étape « Votre objectif »
// du diagnostic (choix pédagogique, dans la fourchette min–max).
export const OBJECTIF_NIVEAU_VIE_RETRAITE = {
  min: 0.7,
  moyen: 0.85,
  max: 1.0,
  options: [0.7, 0.8, 0.9, 1.0],
  source:
    "Fourchette usuelle de conseil patrimonial pour maintenir son niveau de vie à la retraite — hypothèse indicative, à ajuster selon la situation réelle (charges, fiscalité, statut du logement). À VÉRIFIER.",
};

// ---- Rendement annuel du portefeuille (hypothèse, pas une promesse) ----
export const RENDEMENT_PORTEFEUILLE = {
  min: 2,
  moyen: 5,
  max: 8,
  source:
    "Fourchette indicative d'un portefeuille diversifié selon le profil de risque (prudent à dynamique) — hypothèse de simulation, pas une performance promise. Les performances passées ne préjugent pas des performances futures. À VÉRIFIER.",
};

// Majoration du scénario « optimisé » présenté à titre de comparaison
// (allocation mieux diversifiée), plafonnée pour rester dans une fourchette
// crédible de portefeuille dynamique.
export const MAJORATION_SCENARIO_OPTIMISE_PTS = 1.5;
export const REND_OPTIMISE_PLAFOND_PCT = 9;

// ---- Score retraite (indicateur pédagogique, pas un audit) ----
// Score /100 = taux de couverture du capital nécessaire par le capital
// projeté, plafonné à 100. Les seuils de lecture sont un choix éditorial
// (pas une norme réglementaire) : ils servent uniquement à traduire le
// score en trois niveaux immédiatement compréhensibles.
export const SCORE_RETRAITE_SEUILS = {
  excellent: 80, // score ≥ 80 → 🟢 trajectoire solide
  attention: 45, // 45 ≤ score < 80 → 🟠 écart à surveiller ; en dessous → 🔴 écart important
  source:
    "Seuils de lecture pédagogiques (choix éditorial Capital Retraite) appliqués au taux de couverture capital projeté / capital nécessaire — pas une norme, pas un conseil personnalisé.",
};

// ---- Scénarios comparatifs affichés dans le diagnostic ----
// Décalages d'âge de départ testés (« et si je partais plus tôt / plus
// tard ? ») — valeurs pédagogiques usuelles des exercices de projection.
export const SCENARIO_DEPART_AVANCE_ANS = 2;
export const SCENARIO_DEPART_RETARDE_ANS = 3;

// Incrément d'épargne du module « Et si vous épargniez un peu plus ? » —
// pas mensuel arbitraire mais parlant, aligné sur le step du champ épargne.
export const INCREMENT_EPARGNE_WHATIF = 100;

// ---- Espérance de vie à 65 ans (mêmes valeurs et source que
// src/components/hypotheses.js → DECUMULATION.esperanceVie65) ----
export const ESPERANCE_VIE_65 = {
  femmes: 23,
  hommes: 19,
  source: "espérance de vie à 65 ans, INSEE, données 2023-2024 — À VÉRIFIER",
};

// Horizon de décumulation retenu par le moteur : moyenne femmes/hommes de
// l'espérance de vie à 65 ans ci-dessus, faute de champ « sexe » dans le
// simulateur. Approximation documentée dans docs/simulateur-retraite-moteur.md
// (§ limites, hub rempartfinancier.fr).
export const HORIZON_DECUMULATION_ANNEES = Math.round(
  (ESPERANCE_VIE_65.femmes + ESPERANCE_VIE_65.hommes) / 2
);
