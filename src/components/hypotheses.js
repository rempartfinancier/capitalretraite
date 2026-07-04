// ============================================================
// HYPOTHÈSES CHIFFRÉES CENTRALISÉES — source de vérité unique
// ------------------------------------------------------------
// Règle du site : aucun taux, rendement, barème ou frais n'est
// écrit en dur dans un composant ou une page. Tout chiffre
// affiché ou utilisé par un simulateur vient de ce fichier.
// Chaque bloc est daté et sourcé. TOUTES les valeurs doivent
// être vérifiées par Fabienne avant publication, puis révisées
// à chaque millésime (rendements fonds euros, taux SCPI,
// barèmes fiscaux, plafonds).
// ============================================================

// Date de dernière révision — affichée à l'écran partout où une
// hypothèse par défaut est utilisée.
export const HYPOTHESES_MAJ = "juillet 2026";

// ---- Fourchettes de rendement indicatives (jamais des promesses) ----
// « source » = référence à afficher ou à vérifier ; « periode » = millésime.
export const RENDEMENTS = {
  fondsEuros: {
    min: 1.5,
    moyen: 2.6,
    max: 4.0,
    periode: "2024",
    source: "moyenne de marché France Assureurs / ACPR, rendement 2024 net de frais de gestion, avant prélèvements sociaux — À VÉRIFIER",
  },
  fondsObligataires: {
    min: 2.0,
    moyen: 3.0,
    max: 4.5,
    periode: "2024-2025",
    source: "rendements à l'échéance des fonds obligataires investment grade euro — ordre de grandeur, À VÉRIFIER",
  },
  ucActionsLongTerme: {
    min: 5.0,
    moyen: 6.5,
    max: 8.0,
    periode: "moyennes annualisées sur 20-30 ans",
    source: "performance historique long terme des indices actions mondiaux (type MSCI World, dividendes réinvestis, en euros, avant frais et fiscalité) — À VÉRIFIER ; fortes variations annuelles, années négatives incluses",
  },
  scpi: {
    min: 4.0,
    moyen: 4.7,
    max: 6.0,
    periode: "2024",
    source: "taux de distribution moyen des SCPI publié par l'ASPIM/IEIF pour 2024 — À VÉRIFIER ; ni le revenu ni le capital ne sont garantis",
  },
  lmnp: {
    min: 3.0,
    moyen: 4.5,
    max: 6.0,
    periode: "2024-2025",
    source: "rendement locatif brut constaté selon les villes (observatoires des loyers) — ordre de grandeur, À VÉRIFIER ; hors vacance, travaux et fiscalité",
  },
  locatifDirect: {
    min: 2.5,
    moyen: 4.0,
    max: 6.5,
    periode: "2024-2025",
    source: "rendement locatif brut nu selon les villes — ordre de grandeur, À VÉRIFIER ; hors vacance, travaux et fiscalité",
  },
  inflationLongTerme: {
    min: 1.5,
    moyen: 2.0,
    max: 2.5,
    periode: "cible BCE",
    source: "objectif d'inflation de la Banque centrale européenne",
  },
};

// ---- Frais constatés selon le type de contrat (ordres de grandeur) ----
export const FRAIS_TYPES = {
  contratBancaireTraditionnel: {
    entree: { min: 1.0, max: 3.0 },
    gestionAnnuelle: { min: 0.6, max: 1.0 },
    fraisSupports: { min: 1.5, max: 2.2 },
    arbitrage: { min: 0.5, max: 1.0 },
    source: "grilles tarifaires publiques des grands réseaux bancaires — ordres de grandeur, À VÉRIFIER contrat par contrat",
  },
  contratInternet: {
    entree: { min: 0, max: 0 },
    gestionAnnuelle: { min: 0.5, max: 0.6 },
    fraisSupports: { min: 0.2, max: 0.4 },
    arbitrage: { min: 0, max: 0 },
    source: "grilles tarifaires des contrats en ligne de référence (supports ETF) — À VÉRIFIER",
  },
  gestionPiloteeSurcout: {
    min: 0.2,
    max: 1.0,
    source: "surcoût annuel de mandat constaté, auquel s'ajoutent les frais des fonds sous-jacents — À VÉRIFIER",
  },
  scpiEntree: {
    min: 8.0,
    max: 12.0,
    source: "fourchette historique des frais de souscription des SCPI classiques — À VÉRIFIER ; certaines SCPI récentes affichent 0 % à l'entrée avec des frais de gestion plus élevés",
  },
  etf: {
    fraisCourants: { min: 0.2, max: 0.4 },
    source: "TER (frais courants) usuels des ETF actions UCITS de grande taille — À VÉRIFIER",
  },
  fondsActionsClassiques: {
    fraisCourants: { min: 1.5, max: 2.2 },
    source: "frais courants des fonds actions de gestion active distribués en France (données AMF/ESMA) — À VÉRIFIER",
  },
  immobilierLocatif: {
    fraisNotaireAncien: { min: 7.0, max: 8.0 },
    fraisGestionLocative: { min: 6.0, max: 8.0 },
    source: "ordres de grandeur usuels du marché (frais de notaire dans l'ancien, frais d'une gestion locative déléguée en % des loyers) — À VÉRIFIER",
  },
};

// ---- Valeurs purement illustratives des exemples pédagogiques ----
// Choisies à l'intérieur des fourchettes ci-dessus ; révisées avec le
// même millésime. Jamais présentées comme des projections.
export const ILLUSTRATIF = {
  tauxDynamique: 5.0, // « portefeuille dynamique » type dans les illustrations chiffrées (%/an)
  fraisSupportMaison: 2.0, // frais courants d'un fonds « maison » type (%/an)
  fraisSupportEtf: 0.3, // frais courants d'un ETF type (%/an)
  fraisFondsEpargneSalariale: 3.0, // ordre de grandeur corpus des frais des fonds d'épargne salariale (%/an) — À VÉRIFIER
  pensionMensuelleIllustrative: 1800, // pension mensuelle type utilisée dans les exemples de calcul de surcote/décote (€) — purement pédagogique, sans lien avec un cas réel
  source: "hypothèses d'illustration pédagogique, à réviser avec les autres — À VÉRIFIER",
};

// ---- Garanties en cas de défaillance d'un établissement ----
export const GARANTIES = {
  fgapPlafondParAssureParAssureur: 70000, // FGAP, plafond par assuré et par assureur (€)
  source: "Fonds de garantie des assurances de personnes (FGAP), Code des assurances art. L423-1 et R423-1 — plafond en vigueur en vérification — À VÉRIFIER",
};

// ---- Transmission (donation et abattements successoraux) ----
export const TRANSMISSION = {
  abattementDonationParEnfant: 100000, // abattement donation en ligne directe, par parent et par enfant (€)
  renouvellementDonationAnnees: 15, // délai de renouvellement de l'abattement de donation (années)
  abattementSuccessionAvParBeneficiaire: 152500, // abattement assurance-vie, versements avant 70 ans, par bénéficiaire (€)
  abattementSuccessionAvApres70Collectif: 30500, // abattement assurance-vie, versements après 70 ans, pour l'ensemble des bénéficiaires (€)
  source: "Code général des impôts, art. 779 (donations) et 990 I (assurance-vie) — barèmes en vigueur à la date de révision — À VÉRIFIER",
};

// ---- Fiscalité (barèmes en vigueur à la date de révision) ----
export const FISCALITE = {
  pfuIR: 12.8, // prélèvement forfaitaire unique, part impôt sur le revenu (%)
  // Prélèvements sociaux (CSG, CRDS et contributions annexes) : la LFSS 2026
  // relève le taux de 17,2 % à 18,6 % pour le PER, le PEA, le compte-titres
  // ordinaire et les revenus du capital en général (art. 12 LFSS 2026), mais
  // EXCLUT explicitement l'assurance-vie et les revenus fonciers/immobiliers,
  // qui restent à 17,2 %. Taux différenciés par enveloppe — À VÉRIFIER avant
  // publication (source à confirmer par Fabienne).
  prelevementsSociaux: {
    per: 18.6,
    pea: 18.6,
    cto: 18.6,
    assuranceVie: 17.2,
    immobilier: 17.2,
    source: "LFSS 2026, art. 12 — hausse de 17,2 % à 18,6 % au 1er janvier 2026, à l'exclusion de l'assurance-vie et des revenus fonciers/immobiliers (maintenus à 17,2 %) — À VÉRIFIER",
  },
  avTauxReduitApres8Ans: 7.5, // taux IR réduit sur gains, contrats > 8 ans, versements < 150 000 € (%)
  avAbattementAnnuelSeul: 4600, // abattement annuel sur gains après 8 ans, personne seule (€)
  avAbattementAnnuelCouple: 9200, // idem, couple soumis à imposition commune (€)
  peaExonerationIRApres: 5, // années avant exonération d'IR des plus-values du PEA
  tmiOptions: [0, 11, 30, 41, 45], // tranches marginales du barème IR (%)
  source: "barèmes en vigueur à la date de révision des hypothèses — À VÉRIFIER avant publication",
};

// ---- Décumulation ----
export const DECUMULATION = {
  // Taux de conversion indicatif d'un capital en rente viagère à 65 ans,
  // sans option de réversion (rente annuelle = capital × taux / 100).
  tauxConversionRente65: {
    min: 4.0,
    defaut: 4.5,
    max: 5.5,
    source: "ordre de grandeur des barèmes de conversion des assureurs à 65 ans (tables de mortalité réglementaires) — varie selon contrat, âge et options ; À VÉRIFIER",
  },
  rendementCapitalPendantRetraits: 3.0, // hypothèse par défaut, capital resté investi prudemment (%)
  esperanceVie65: {
    femmes: 23,
    hommes: 19,
    source: "espérance de vie à 65 ans, INSEE, données 2023-2024 — À VÉRIFIER",
  },
};

// ---- Mécanique du régime général : surcote, décote, rachat de trimestres ----
// Paramètres légaux du Code de la sécurité sociale — plus stables dans le temps
// que les rendements de marché ci-dessus, mais à revérifier tout de même selon
// la génération et le régime d'affiliation avant publication.
export const REGIME_GENERAL = {
  surcoteParTrimestre: 1.25, // majoration du taux plein par trimestre cotisé au-delà de la durée requise et de l'âge légal (%)
  decoteParTrimestre: 1.25, // minoration par trimestre manquant par rapport à la durée requise, régime général (%)
  decotePlafondTrimestres: 20, // nombre maximal de trimestres de décote pris en compte
  ageTauxPleinAutomatique: 67, // âge d'annulation automatique de la décote, régime général
  rachatTrimestresPlafond: 12, // nombre maximal de trimestres rachetables (versement pour la retraite, ex « rachat Fillon »)
  source: "Code de la sécurité sociale, régime général — service-public.fr / info-retraite.fr — À VÉRIFIER selon la génération et le régime d'affiliation",
};

// ---- Valeurs par défaut des simulateurs (modifiables à l'écran) ----
export const SIMU_DEFAUTS = {
  versementMensuel: 300,
  dureeAnnees: 15,
  rendementAnnuel: 4.0, // hypothèse médiane d'un portefeuille diversifié, avant frais
  fraisAnnuels: 0.8,
  tmiActuelle: 30,
  tmiRetraite: 11,
  capitalDecumulation: 200000,
  ageDepart: 65,
};

// Format € sans décimales, style français.
export const euros = (n) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

// Format pourcentage à la française (2.6 → « 2,6 % »).
export const pct = (n) => n.toLocaleString("fr-FR") + " %";
