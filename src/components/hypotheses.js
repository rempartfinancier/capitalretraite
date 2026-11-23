// ============================================================
// HYPOTHÈSES CHIFFRÉES CENTRALISÉES — source de vérité unique
// ------------------------------------------------------------
// Règle du site : aucun taux, rendement, barème ou frais n'est
// écrit en dur dans un composant ou une page. Tout chiffre
// affiché ou utilisé par un simulateur vient de ce fichier.
// Chaque bloc est daté et sourcé. TOUTES les valeurs doivent
// être vérifiées par Alexandre avant publication, puis révisées
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
  // publication (source à confirmer par Alexandre).
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
  // Plafond de déduction propre à un enfant majeur rattaché ouvrant son propre PER
  // (10 % de 8 fois le PASS de l'année précédente, plafond spécifique bas du barème
  // PER individuel) — À VÉRIFIER, ce plafond est révisé chaque année.
  perPlafondEnfantRattache: 4710,
  source: "barèmes en vigueur à la date de révision des hypothèses — À VÉRIFIER avant publication",
};

// ---- Plafond de déduction des versements volontaires sur un PER (salariés) ----
// Vérifié le 14 novembre 2026. Règle : 10 % des revenus d'activité professionnelle
// de l'année précédente (nets de frais), retenus dans la limite de 8 PASS de cette
// même année, avec un plancher de 10 % du PASS (CGI, art. 163 quatervicies).
// Les montants plancher/plafond se calculent depuis ces paramètres, jamais en dur.
export const PER_PLAFOND = {
  tauxRevenusActivite: 10, // % des revenus d'activité nets de frais de l'année précédente
  multiplePassMaximum: 8, // revenus retenus dans la limite de 8 fois le PASS
  tauxPlancherPass: 10, // plancher : 10 % du PASS de l'année précédente
  pass2025: 47100, // PASS 2025 → plafonds des versements effectués en 2026 (€)
  pass2026: 48060, // PASS 2026 (arrêté du 22 décembre 2025) → versements 2027, à législation constante (€)
  reportAnneesPlafondsJusqua2025: 3, // durée de report des plafonds non utilisés de 2023, 2024 et 2025 (années)
  reportAnneesPlafondsDepuis2026: 5, // durée de report des plafonds non utilisés à partir de celui de 2026 (années)
  ageFinDeduction: 70, // âge à partir duquel les versements ne sont plus déductibles (depuis le 1er janvier 2026)
  tauxAbattementFraisProfessionnels: 10, // abattement forfaitaire pour frais professionnels sur les salaires (%)
  maj: "14 novembre 2026",
  source:
    "CGI, art. 163 quatervicies (version en vigueur depuis le 21 février 2026, loi n° 2026-103 du 19 février 2026 de finances pour 2026, art. 10) ; service-public.gouv.fr, fiches F34982 (vérifiée le 12 octobre 2026) et F14709 (vérifiée le 15 avril 2026) ; arrêté du 22 décembre 2025 fixant le plafond de la sécurité sociale pour 2026",
};

// Profils purement illustratifs du guide « plafond PER 2026 » (composites
// pédagogiques, sans lien avec un cas réel). Salaires = nets imposables 2025.
export const PER_PLAFOND_EXEMPLES = {
  profilA: { salaireNetImposable2025: 38000 },
  profilB: {
    salaireNetImposable2025: 72000,
    nonUtilise2023: 3000,
    nonUtilise2024: 4200,
    nonUtilise2025: 4600,
    versementIllustratif2026: 9000,
  },
  profilC: {
    salaireNetImposable2025: 130000,
    cotisationsRetraiteObligatoiresEntreprise: 3000,
    abondementEmployeurPereco: 1500,
  },
  versementUnitaire: 1000, // base de l'illustration « économie d'impôt pour 1 000 € versés »
  source: "hypothèses d'illustration pédagogique (14 novembre 2026)",
};

// ---- Rachat (partiel ou total) d'un contrat d'assurance-vie : impôt sur la part de gains ----
// Vérifié le 15 novembre 2026. Part de gains d'un rachat partiel = rachat − primes non
// remboursées × (rachat ÷ valeur de rachat du contrat) (BOI-RPPM-RCM-20-10-20-50, § 80).
// Les taux 12,8 % / 7,5 %, l'abattement et les prélèvements sociaux de l'assurance-vie
// restent lus dans FISCALITE ; ce bloc n'ajoute que les paramètres propres au rachat.
export const AV_RACHAT = {
  dureeTauxReduitAnnees: 8, // ancienneté du contrat (depuis la souscription) ouvrant le taux réduit et l'abattement
  seuilPrimesTauxReduit: 150000, // primes non remboursées, tous contrats, par personne, au 31/12 de l'année précédente (€)
  datePivotPrimes: "27 septembre 2017", // primes versées avant / à compter de cette date : deux régimes
  pflAvant2017Moins4Ans: 35, // prélèvement forfaitaire libératoire sur option, primes avant le 27/09/2017, contrat < 4 ans (%)
  pflAvant2017De4A8Ans: 15, // idem, contrat de 4 à 8 ans (%)
  rfrDispenseAcompteSeul: 25000, // revenu fiscal de référence N-2 sous lequel on peut demander la dispense d'acompte, personne seule (€)
  rfrDispenseAcompteCouple: 50000, // idem, couple soumis à imposition commune (€)
  dateLimiteDemandeDispense: "30 novembre", // de l'année précédant celle du rachat
  maj: "15 novembre 2026",
  source:
    "service-public.gouv.fr, fiche F22414 (vérifiée le 15 avril 2026) ; BOFiP, BOI-RPPM-RCM-20-10-20-50 (version du 30 juin 2022) et BOI-RPPM-RCM-20-15 (version du 21 juin 2021) ; impots.gouv.fr, « Les revenus mobiliers » (mise à jour du 8 avril 2026) ; taux de 35 % / 15 % : impots.gouv.fr, question « Comment sont imposés les produits des contrats d'assurance-vie depuis le 1er janvier 2018 ? » (modifiée le 20 mars 2026, consultée le 16 novembre 2026) ; prélèvements sociaux de 17,2 % : CSS art. L. 136-8, IV, 4° (version en vigueur depuis le 27 juin 2026, lue le 16 novembre 2026)",
};

// Cas purement illustratifs du guide « rachat partiel d'assurance-vie » (composites
// pédagogiques, sans lien avec un cas réel). Toutes les primes sont supposées versées
// à compter du 27 septembre 2017 ; les prélèvements sociaux sont supposés non encore prélevés.
export const AV_RACHAT_EXEMPLES = {
  cas1: { valeurContrat: 50000, primesNonRemboursees: 40000, rachat: 8000 },
  cas2: { valeurContrat: 200000, primesNonRemboursees: 120000, rachat: 30000 },
  cas3: { valeurContrat: 400000, primesNonRemboursees: 300000, rachat: 40000 },
  partsDeGainsGrille: [10, 20, 30, 50], // parts de gains dans le contrat, pour la grille de lecture (%)
  source: "hypothèses d'illustration pédagogique (15 novembre 2026)",
};

// ---- Retraite complémentaire Agirc-Arrco (salariés du privé, cadres et non-cadres) ----
// Vérifié le 14 novembre 2026. Points acquis = salaire de la tranche × taux de calcul
// des points ÷ valeur d'achat du point ; pension annuelle brute = points × valeur de
// service du point. Aucun de ces montants n'est écrit en dur dans les pages.
export const AGIRC_ARRCO = {
  pass2026: 48060, // plafond annuel de la sécurité sociale 2026 = limite supérieure de la tranche 1 (€)
  multiplePassTranche2: 8, // la tranche 2 va de 1 à 8 PASS
  tauxCalculPointsT1: 6.2, // taux de calcul des points, tranche 1 (%)
  tauxCalculPointsT2: 17, // taux de calcul des points, tranche 2 (%)
  tauxAppel: 127, // taux d'appel : cotisation prélevée = 127 % du taux de calcul des points
  tauxCotisationT1: { global: 7.87, patronale: 4.72, salariale: 3.15 }, // cotisation de retraite tranche 1 (%)
  tauxCotisationT2: { global: 21.59, patronale: 12.95, salariale: 8.64 }, // cotisation de retraite tranche 2 (%)
  cegT1: { global: 2.15, patronale: 1.29, salariale: 0.86 }, // contribution d'équilibre général, tranche 1 (%) — sans points
  cegT2: { global: 2.7, patronale: 1.62, salariale: 1.08 }, // contribution d'équilibre général, tranche 2 (%) — sans points
  cet: { global: 0.35, patronale: 0.21, salariale: 0.14 }, // contribution d'équilibre technique, tranches 1 + 2 si le salaire dépasse le PASS (%) — sans points
  apec: { global: 0.06, patronale: 0.036, salariale: 0.024, multiplePassAssiette: 4 }, // cotisation Apec des cadres, dans la limite de 4 PASS (%) — sans points
  valeurAchatPoint2026: 20.1877, // valeur d'achat du point (« salaire de référence ») à compter du 1er janvier 2026 (€)
  valeurServicePoint: 1.4587, // valeur de service du point à compter du 1er novembre 2026 (€)
  valeurServicePointPrecedente: 1.4386, // valeur de service du 1er novembre 2024 au 31 octobre 2026 (€)
  tauxRevalorisationNovembre2026: 1.4, // revalorisation décidée le 14 octobre 2026 (%)
  ageSansMinoration: 67, // âge auquel la retraite complémentaire est versée sans minoration quelle que soit la durée d'assurance
  ageMinimumAnticipation: 57, // âge le plus précoce de liquidation, avec minoration définitive
  // Coefficients d'anticipation « carrière courte » : retraite de base obtenue à taux minoré,
  // moins de 20 trimestres manquants (extrait du barème Agirc-Arrco, édition de septembre 2026).
  minorationTrimestresManquants: [
    { trimestres: 4, coefficient: 0.96 },
    { trimestres: 8, coefficient: 0.92 },
    { trimestres: 12, coefficient: 0.88 },
    { trimestres: 16, coefficient: 0.83 },
    { trimestres: 20, coefficient: 0.78 },
  ],
  coefficientAnticipation62Ans: 0.78, // coefficient d'anticipation pour âge à 62 ans, sans retraite de base à taux plein
  majorationTroisEnfants: 10, // majoration des points obtenus depuis 2012 pour 3 enfants ou plus (%)
  majorationEnfantACharge: 5, // majoration par enfant à charge au moment du départ (%)
  plafondMajorationTroisEnfantsNov2025: 2367.48, // plafond annuel brut de la majoration pour 3 enfants ou plus, au 1er novembre 2025 (€)
  seuilVersementUnique: 100, // jusqu'à 100 points : versement en une seule fois
  seuilVersementAnnuel: 200, // de 101 à 200 points : versement annuel
  tauxPleinRetraiteDeBase: 50, // taux plein de la retraite de base, appliqué au salaire annuel moyen plafonné au PASS (%)
  maj: "14 novembre 2026",
  source:
    "Agirc-Arrco, circulaire 2025-16-SG-DRJ du 30 octobre 2025 (paramètres 2026) et communiqué du 14 octobre 2026 ; barème des coefficients de minoration (édition de septembre 2026) ; service-public.gouv.fr, fiches F15396 (vérifiée le 1er novembre 2026) et F21552 (vérifiée le 1er septembre 2026)",
};

// Hypothèses purement illustratives du guide « retraite complémentaire des cadres »
// (composites pédagogiques, sans lien avec un cas réel). Salaires = bruts annuels 2026.
export const AGIRC_ARRCO_EXEMPLES = {
  salaireBrutPasAPas: 80000, // salaire de l'exemple pas à pas
  salairesComparaison: [40000, 60000, 80000, 120000], // grille « une année de travail »
  pointsCarriere: [5000, 8000, 12000, 15000], // grille « nombre de points → pension »
  dureeCarriereAnnees: 43, // 172 trimestres, durée d'assurance requise pour les générations nées à partir de 1966
  source: "hypothèses d'illustration pédagogique (14 novembre 2026)",
};

// ---- Retraite progressive et cumul emploi-retraite (comparaison) ----
// Vérifié le 18 novembre 2026. Retraite progressive : fraction de pension versée =
// 100 % − quotité de travail. Cumul emploi-retraite, pensions prenant effet à partir du
// 1er janvier 2027, entre l'âge légal et 67 ans : réduction = 50 % × (revenus − seuil).
// Aucun de ces paramètres n'est écrit en dur dans la page.
export const RETRAITE_PROGRESSIVE_CUMUL = {
  // Retraite progressive (salariés du privé)
  ageRetraiteProgressive: 60, // âge d'ouverture pour les pensions prenant effet depuis le 1er septembre 2025
  trimestresRetraiteProgressive: 150, // durée d'assurance et périodes reconnues équivalentes, tous régimes de base
  quotiteMin: 40, // durée de travail minimale, en % d'un temps complet
  quotiteMax: 80, // durée de travail maximale, en % d'un temps complet
  forfaitJoursMin: 87, // équivalent en jours pour un forfait de 218 jours (Assurance retraite)
  forfaitJoursMax: 174,
  forfaitJoursReference: 218,
  delaiReponseEmployeurMois: 2, // sans réponse écrite et motivée dans ce délai, l'accord est réputé acquis
  delaiDemandeCaisseMois: 5, // demande à la caisse : au plus tôt 5 mois avant la date souhaitée (F12842)
  // Retraite progressive (fonctionnaires)
  quotiteMinFonctionPublique: 50,
  quotiteMaxFonctionPublique: 90,
  // Cumul emploi-retraite, pensions prenant effet avant le 1er janvier 2027
  plafondCumulPlafonneMensuel: 2916.85, // 160 % du Smic, brut par mois (ou dernier salaire si plus élevé)
  tauxSmicCumulPlafonne: 160,
  delaiMemeEmployeurMois: 6, // reprise chez le dernier employeur
  tauxPassSecondePension: 5, // la seconde pension ne peut pas dépasser 5 % du PASS par an
  pass2026: 48060, // plafond annuel de la sécurité sociale 2026 (€)
  // Cumul emploi-retraite, pensions prenant effet à partir du 1er janvier 2027
  seuilCumul2027: 7000, // revenus d'activité et de remplacement par année civile, montant fixé pour 2027 (€)
  tauxReductionAuDela: 50, // la pension est réduite de 50 % du dépassement, entre l'âge légal et 67 ans
  ageCumulLibre: 67, // à partir de 67 ans : cumul sans réduction, avec nouveaux droits
  limiteRetenueMensuelle: "un tiers", // la retenue ne peut pas réduire une échéance de pension de plus d'un tiers
  // Âge légal de départ par génération (fiche F14043, vérifiée le 14 août 2026)
  ageLegalParGeneration: [
    { generation: "1964", age: "62 ans et 9 mois" },
    { generation: "1965 (janvier à mars)", age: "62 ans et 9 mois" },
    { generation: "1965 (avril à décembre)", age: "63 ans" },
    { generation: "1966", age: "63 ans et 3 mois" },
    { generation: "1967", age: "63 ans et 6 mois" },
    { generation: "1968", age: "63 ans et 9 mois" },
    { generation: "1969 et suivantes", age: "64 ans" },
  ],
  maj: "18 novembre 2026",
  source:
    "service-public.gouv.fr, fiches F12842 (retraite progressive du salarié, vérifiée le 17 novembre 2025), F37400 (agent public, vérifiée le 1er septembre 2025), F13243 (cumul emploi-retraite, vérifiée le 12 novembre 2026), F14043 (âge légal, vérifiée le 14 août 2026) et actualité A18914 (mise à jour le 10 novembre 2026) ; CSS art. L. 161-22-1-5 (version du 26 octobre 2025) et D. 161-2-24 (décret n° 2025-681 du 15 juillet 2025) ; code du travail art. L. 3123-4-1 ; décrets n° 2026-1016 et n° 2026-1017 du 2 novembre 2026 ; lassuranceretraite.fr",
};

// Hypothèses purement illustratives du guide « retraite progressive ou cumul emploi-retraite »
// (composite pédagogique, sans lien avec un cas réel). Montants bruts mensuels ou annuels.
export const RETRAITE_PROGRESSIVE_CUMUL_EXEMPLES = {
  salaireBrutMensuelTempsPlein: 4000, // salaire brut à temps complet avant la retraite progressive (€)
  pensionProvisoireMensuelle: 2200, // retraite provisoire entière (base + complémentaire) telle qu'estimée par les caisses : donnée posée, non calculée (€)
  quotiteExemple: 60, // quotité de travail de l'exemple pas à pas (%)
  quotitesGrille: [40, 50, 60, 70, 80], // grille « quotité de travail → salaire + fraction de pension »
  revenusAnnuelsCumul: [7000, 12000, 20000, 28800], // revenus d'activité annuels bruts pour la grille « écrêtement 2027 » (€)
  source: "hypothèses d'illustration pédagogique (18 novembre 2026)",
};

// ---- Enveloppes retraite : paramètres complémentaires (lot SEO « enveloppes ») ----
// Bloc daté novembre 2026 — TOUTES les valeurs sont À VÉRIFIER avant publication.
export const ENVELOPPES_NOV2026 = {
  // PEA (CMF, art. L. 221-30 et suivants)
  peaPlafondVersements: 150000, // plafond de versements du PEA classique (€)
  peaPmePlafondCumule: 225000, // plafond cumulé PEA + PEA-PME (€)
  peaAgeMinimumOuverture: 18, // majeur, un seul PEA par personne
  peaFraisTransfertMax: { parLigne: 15, total: 150 }, // plafonds des frais de transfert de titres loi Pacte (€) — À VÉRIFIER
  // Assurance-vie : rente viagère à titre onéreux (CGI, art. 158, 6) — fraction imposable
  // de la rente selon l'âge du crédirentier à la date d'entrée en jouissance (%)
  avRenteFractionImposable: [
    { ages: "moins de 50 ans", pct: 70 },
    { ages: "50 à 59 ans", pct: 50 },
    { ages: "60 à 69 ans", pct: 40 },
    { ages: "70 ans et plus", pct: 30 },
  ],
  // Assurance-vie : transmission (rappel pour les articles ; valeurs détaillées dans TRANSMISSION)
  avPrimesAvant70Ans: true,
  // Âge de référence pour les simulations « selon l'âge »
  ageDepartReference: 64, // âge de départ de la génération 1969 et suivantes (cf. RETRAITE_PROGRESSIVE_CUMUL)
  maj: "novembre 2026",
  source:
    "Code monétaire et financier art. L. 221-30 et s. (PEA) ; CGI art. 158, 6 (rente viagère à titre onéreux) ; service-public.gouv.fr (fiches PEA, assurance-vie) — À VÉRIFIER avant publication",
};

// Hypothèses purement illustratives des guides « combien épargner » et « capital retraite »
// (composites pédagogiques, jamais des projections). Novembre 2026 — À VÉRIFIER.
export const EPARGNE_RETRAITE_EXEMPLES = {
  agesActuels: [30, 40, 50], // âges de départ de la grille d'épargne mensuelle
  ageDepart: 64, // âge de liquidation retenu dans les exemples
  complementsMensuelsCibles: [500, 1000, 1500], // complément de revenu visé en plus des pensions (€/mois, en euros d'aujourd'hui)
  dureeRetraiteAnnees: 25, // durée de décaissement retenue pour dimensionner le capital
  rendementsEpargneNets: [2, 4, 6], // rendements annuels nets de frais, scénarios illustratifs (%)
  rendementDecaissementNet: 3, // rendement net du capital pendant la phase de retraits (%)
  inflationAnnuelle: 2, // inflation retenue pour exprimer les montants en euros d'aujourd'hui (%)
  regleRetraitAnnuel: 4, // règle dite des 4 % : retrait annuel initial en % du capital — ordre de grandeur, non garanti
  capitauxCiblesGrille: [100000, 200000, 300000, 500000], // capitaux de la grille « capital → complément mensuel » (€)
  maj: "novembre 2026",
  source: "hypothèses d'illustration pédagogique (novembre 2026), à réviser avec les autres — À VÉRIFIER",
};

// ---- Guide « PEA en ligne » : hypothèses de l'exemple de frais cumulés ----
// Bloc daté novembre 2026 — TOUTES les valeurs sont À VÉRIFIER avant publication.
// Purement illustratif : deux grilles tarifaires fictives, jamais celles d'un établissement.
export const PEA_LIGNE_NOV2026 = {
  versementMensuel: 300, // versement mensuel de l'exemple (€)
  dureeAnnees: 20, // durée de l'exemple (années)
  ordresParAn: 12, // un ordre d'achat par mois (versement programmé)
  grilleHaute: { courtagePct: 0.5, droitsGardePct: 0.4 }, // proche des plafonds loi Pacte (% par ordre en ligne ; % annuel de la valeur du plan) — À VÉRIFIER
  grilleBasse: { courtagePct: 0.1, droitsGardePct: 0 }, // grille fictive d'un acteur à tarif réduit — À VÉRIFIER
  maj: "novembre 2026",
  source: "plafonds de frais du décret d'application de la loi Pacte (PEA) et grilles publiques — hypothèses d'illustration, À VÉRIFIER avant publication",
};

// Guide « capital retraite : objectif et construction » — paramètres de la trajectoire.
// Bloc daté novembre 2026 — À VÉRIFIER. Illustration pédagogique, jamais une projection.
export const CAPITAL_RETRAITE_NOV2026 = {
  horizonsTrajectoireAnnees: [15, 25], // durées de constitution comparées dans l'ordre de grandeur de la trajectoire (années)
  maj: "novembre 2026",
  source: "hypothèses d'illustration pédagogique (novembre 2026) — À VÉRIFIER",
};

// ---- Assurance-vie après 8 ans : exemple rente viagère à titre onéreux vs rachats (novembre 2026) ----
// Cas purement illustratif (composite pédagogique, sans lien avec un cas réel). La fraction
// imposable est lue dans ENVELOPPES_NOV2026.avRenteFractionImposable (tranche d'âge ci-dessous),
// le taux de conversion dans DECUMULATION. Base et taux des prélèvements sociaux sur une rente
// viagère à titre onéreux : hypothèse retenue = fraction imposable × 17,2 % — À VÉRIFIER.
export const AV_8ANS_NOV2026 = {
  capitalConverti: 200000, // valeur du contrat converti en rente (€)
  primesNonRemboursees: 140000, // versements non remboursés du même contrat, pour l'exemple des rachats (€)
  ageEntreeRente: 65, // âge du crédirentier à l'entrée en jouissance (ans)
  trancheAge: "60 à 69 ans", // tranche correspondante de avRenteFractionImposable
  tmisExemple: [11, 30], // tranches marginales d'imposition illustrées (%) — doivent figurer dans FISCALITE.tmiOptions
  maj: "novembre 2026",
  source:
    "CGI, art. 158, 6 (rente viagère à titre onéreux) ; BOFiP, BOI-RPPM-RCM-20-10-20-50 ; hypothèse de base des prélèvements sociaux sur la rente — À VÉRIFIER avant publication",
};

// ---- Guide « PER ou assurance-vie selon l'âge et la TMI » (novembre 2026) ----
// Bloc daté novembre 2026 — TOUTES les valeurs sont À VÉRIFIER avant publication.
// Hypothèses purement illustratives (composites pédagogiques, jamais des projections).
export const PER_AV_AGE_TMI = {
  agesProfils: [35, 45, 55, 60], // âges d'ouverture des profils illustratifs (ans)
  gainsIllustratifsPct: 50, // gains supposés à la sortie, en % du versement : hypothèse de calcul, non un rendement attendu
  maj: "novembre 2026",
  source: "hypothèses d'illustration pédagogique (novembre 2026) — À VÉRIFIER",
};

// ---- Enrichissement guides « assurance-vie retraite » et « PER ou assurance-vie » ----
// Bloc daté novembre 2026 — paramètres purement illustratifs (composites pédagogiques,
// sans lien avec un cas réel, jamais des projections) — TOUT est À VÉRIFIER.
// Les TMI sont des hypothèses de profil, pas des calculs d'impôt réels.
export const ENRICH_AVPER_NOV2026 = {
  versementPerBrut: 10000, // versement brut sur le PER de l'illustration « selon la TMI et l'horizon » (€)
  // Couples (TMI à l'entrée, TMI à la sortie) comparés, en %
  couplesTmi: [
    { entree: 11, sortie: 11 },
    { entree: 30, sortie: 11 },
    { entree: 30, sortie: 30 },
    { entree: 41, sortie: 30 },
    { entree: 41, sortie: 41 },
  ],
  horizonsAnnees: [10, 20, 30], // horizons de la grille (années)
  horizonReference: 20, // horizon du tableau principal (années)
  indexRendement: 1, // indice dans EPARGNE_RETRAITE_EXEMPLES.rendementsEpargneNets (scénario médian)
  // TMI supposées des profils de salaire de PER_PLAFOND_EXEMPLES (hypothèse, célibataire sans autre revenu) — À VÉRIFIER
  tmiProfilsPlafond: { profilA: 30, profilB: 30, profilC: 41 },
  gainsRachatExemple: 10000, // gains inclus dans un rachat après 8 ans, exemple de taux effectif (€)
  // Profils illustratifs « qui choisit quoi » (âge, TMI actuelle, TMI de retraite supposée)
  profils: [
    { id: "jeune", age: 32, tmi: 11, tmiRetraite: 11 },
    { id: "cadre", age: 45, tmi: 30, tmiRetraite: 11 },
    { id: "cadreSup", age: 50, tmi: 41, tmiRetraite: 30 },
    { id: "procheRetraite", age: 60, tmi: 30, tmiRetraite: 30 },
  ],
  maj: "novembre 2026",
  source:
    "hypothèses d'illustration pédagogique (novembre 2026) ; calculs réalisés à partir de FISCALITE, PER_PLAFOND, AV_RACHAT et EPARGNE_RETRAITE_EXEMPLES — À VÉRIFIER",
};

// ---- Enrichissement pages « combien épargner » et « PEA banque ou courtier » ----
// Bloc daté novembre 2026 — TOUTES les valeurs sont À VÉRIFIER avant publication.
export const ENRICH_EPPEA_EPARGNE = {
  revenuNetMensuelIllustratif: 3000, // revenu net mensuel type pour exprimer l'effort d'épargne en % du revenu (€) — purement pédagogique
  horizonFraisAnnees: 20, // horizon de l'illustration frais + inflation (années)
  maj: "novembre 2026",
  source: "hypothèses d'illustration pédagogique (novembre 2026) — À VÉRIFIER",
};
export const ENRICH_EPPEA_PEA = {
  // Plafonds légaux des frais d'un PEA (décret d'application de la loi Pacte) — À VÉRIFIER auprès de l'établissement
  fraisOuvertureMax: 10, // frais d'ouverture, ordre de grandeur (€)
  fraisTenueCompteMaxPct: 0.4, // tenue de compte et droits de garde, % annuel de la valeur du plan
  fraisOrdreEnLignePct: 0.5, // courtage par ordre passé en ligne (% du montant)
  fraisOrdreAutreCanalPct: 1.2, // courtage par un autre canal (% du montant)
  versementsCumulesExemple: 120000, // versements cumulés d'un PEA type, doit rester < plafond de versements (€) — illustratif
  capitalExemple: 200000, // valeur du plan à la sortie dans l'exemple de fiscalité (€) — illustratif
  maj: "novembre 2026",
  source: "décret d'application de la loi Pacte (frais PEA) ; CMF art. L. 221-30 et s. ; hypothèses d'illustration — À VÉRIFIER avant publication",
};

// ---- Immobilier pour la retraite : SCPI, LMNP, démembrement (cluster « immobilier ») ----
// Vérifié le 22 novembre 2026. Tous les chiffres des guides SCPI / LMNP / démembrement
// viennent d'ici. Les points marqués À VÉRIFIER n'ont pas pu être confirmés sur le texte
// officiel lui-même (page consultée indirectement, sources divergentes) : à relire avant
// toute révision du millésime. Les taux de prélèvements sociaux des revenus fonciers et
// des plus-values immobilières restent lus dans FISCALITE.prelevementsSociaux.immobilier.
export const IMMO = {
  maj: "22 novembre 2026",

  // Marché des SCPI (ASPIM / IEIF, communiqués du 10 février 2026 et du 5 août 2026)
  scpiMarche: {
    tauxDistribution2025: 4.91, // taux de distribution moyen pondéré 2025 (%)
    tauxDistribution2024: 4.72, // déduit du communiqué 2025 (+0,19 point) (%) — À VÉRIFIER
    tauxDistributionStrategieMin: 4.2, // résidentiel (%), 2025
    tauxDistributionStrategieMax: 6.0, // diversifiée (%), 2025
    variationPrixPart2025: -3.45, // variation du prix de part moyen pondéré en 2025 (%)
    performanceGlobale2025: 1.46, // taux de rendement global 2025 (%)
    collecteNette2025Md: 4.6, // milliards d'euros
    capitalisation2025Md: 89, // milliards d'euros au 31/12/2025
    partsEnAttente2025Md: 2.8, // parts en attente de retrait au 31/12/2025 (milliards d'euros)
    partsEnAttente2025Pct: 3.1, // en % de la capitalisation
    capitalisationS12026Md: 86, // milliards d'euros au 30/06/2026
    partsEnAttenteS12026Md: 1.9, // au 30/06/2026 (milliards d'euros)
    partsEnAttenteS12026Pct: 2.2, // en % de la capitalisation
    variationPrixPartS12026: -2.4, // premier semestre 2026, prix de part moyen pondéré (%)
    fraisSouscriptionAmfMin: 5, // fourchette citée par l'AMF (%) — À VÉRIFIER SCPI par SCPI
    fraisSouscriptionAmfMax: 12,
    dicIndicateurRisqueEchelle: 7, // indicateur de risque de 1 à 7 du document d'informations clés
    source:
      "ASPIM, communiqué du 4T 2025 (10 février 2026) et du 1S 2026 (5 août 2026) ; AMF, guide « Investir dans une SCPI » (2023) et « Comprendre le DIC » (2023) — À VÉRIFIER : documents AMF possiblement antérieurs à la version en vigueur",
  },

  // Fiscalité de la détention directe de parts de SCPI
  scpiFiscalite: {
    microFoncierPlafond: 15000, // recettes brutes (€) — CGI art. 32 ; les SCPI relèvent en pratique du réel (2044) — À VÉRIFIER si bien en direct en plus
    microFoncierAbattement: 30, // %
    deficitFoncierPlafondRevenuGlobal: 10700, // € par an, charges hors intérêts d'emprunt
    deficitFoncierReportAnnees: 10, // report sur les revenus fonciers
    csgDeductibleFoncier: 6.8, // % de CSG déductible l'année suivante
    csgRevenusPatrimoineCasGeneral: 10.6, // % (LFSS 2026) — produits de placement hors foncier et assurance-vie
    psProduitsPlacement: 18.6, // % : PS sur produits de placement (trésorerie de la SCPI, par exemple)
    pfuTotal: 31.4, // 12,8 + 18,6 (%) — À VÉRIFIER pour la trésorerie de SCPI
    pvIR: 19, // % impôt sur la plus-value immobilière des particuliers
    pvAnneesSansAbattement: 5, // aucun abattement avant la 6e année de détention
    pvSurtaxeTaux: "de 2 % à 6 %", // surtaxe progressive au-delà du seuil
    pvAbattementIRParAn: 6, // % par an de la 6e à la 21e année
    pvAbattementIR22e: 4, // % la 22e année
    pvExonerationIRAnnees: 22,
    pvAbattementPSParAn: 1.65, // % par an de la 6e à la 21e année
    pvAbattementPS22e: 1.6, // %
    pvAbattementPSParAn23a30: 9, // % par an de la 23e à la 30e année
    pvExonerationPSAnnees: 30,
    pvSurtaxeSeuil: 50000, // plus-value imposable au-delà de laquelle une surtaxe de 2 % à 6 % s'ajoute (€)
    pvExonerationPrixCession: 15000, // cession inférieure ou égale à ce montant exonérée (€)
    ifiSeuilAssujettissement: 1300000, // patrimoine immobilier net taxable au 1er janvier (€)
    ifiSeuilBareme: 800000, // le barème commence à 0,50 % au-delà de ce montant (€)
    ifiTauxPremiereTranche: 0.5, // % entre 800 000 et 1 300 000 €
    hcsfTauxEffortMax: 35, // % assurance comprise — À VÉRIFIER pour un crédit finançant des parts de SCPI
    hcsfDureeMaxAnnees: 25, // À VÉRIFIER (texte de la recommandation non lu)
    source:
      "BOFiP BOI-RFPI-DECLA-10 (06/03/2025) et BOI-RFPI-BASE-30-20 (16/09/2025) ; service-public.gouv.fr, fiches F2329 (prélèvements sociaux 2026) et F10864 (plus-values immobilières, vérifiée le 15 avril 2026) ; impots.gouv.fr, brochure IR 2026 (nouveautés ; IFI pp. 337-340) ; LFSS 2026 (loi n° 2025-1403 du 30 décembre 2025) — article exact non lu, À VÉRIFIER ; HCSF : économie.gouv.fr/hcsf (sources secondaires pour le détail) — À VÉRIFIER",
  },

  // LMNP, location meublée, résidences gérées
  lmnp: {
    seuilRecettesLmp: 23000, // recettes annuelles (€) : LMP si > ce seuil ET > autres revenus d'activité du foyer
    microBicLongueDuree: 77700, // € de recettes, revenus 2025 (longue durée, tourisme classé)
    microBicLongueDureeAbattement: 50, // %
    microBicTourismeNonClasse: 15000, // €
    microBicTourismeNonClasseAbattement: 30, // %
    abattementMinimumMicroBic: 305, // €
    deficitReportAnnees: 10, // déficit LMNP imputable seulement sur les revenus meublés non professionnels
    psMeuble: 18.6, // % prélèvements sociaux sur revenus de location meublée (CSG 10,6 %) — À VÉRIFIER article de loi
    dateReintegrationAmortissements: "15 ou 16 février 2025", // cessions à compter du lendemain de la promulgation — À VÉRIFIER le jour précis
    texteReintegration: "article 84 de la loi n° 2025-127 du 14 février 2025 de finances pour 2025 (CGI, art. 150 VB, III)",
    censiBouvardFin: "31 décembre 2022", // dernière année d'acquisition ouvrant droit à la réduction
    notaireNeufMin: 2, // % du prix, ordre de grandeur notaires.fr
    notaireNeufMax: 3,
    tvaServicesHoteliersMin: 3, // services para-hôteliers requis pour la TVA à 10 % en meublé
    plfAmortissementArticle: "article 7 du projet de loi de finances pour 2027 (projet n° 3210), en discussion au 22 novembre 2026, non adopté — À VÉRIFIER sur assemblee-nationale.fr et senat.fr",
    source:
      "impots.gouv.fr, FAQ « régime des locations meublées » (mars 2026) et page « régimes d'imposition » ; BOFiP BOI-BIC-CHAMP-40-20 (19/08/2026) ; loi n° 2024-1039 du 19 novembre 2024 ; loi n° 2025-127 du 14 février 2025, art. 84 ; réponse ministérielle à la question écrite n° 10097 (JO du 24/03/2026) ; BOFiP BOI-IR-RICI-220 ; impots.gouv.fr « Je donne un bien en location, dois-je payer des prélèvements sociaux ? » — micro-BIC 2026 (83 600 € vu une seule fois) : À VÉRIFIER, non retenu",
  },

  // Démembrement, donation, transmission
  demembrement: {
    // Barème de l'article 669 I du CGI : valeur de l'usufruit selon l'âge de l'usufruitier (% de la pleine propriété)
    bareme669: [
      { age: "moins de 21 ans", usufruit: 90, nuePropriete: 10 },
      { age: "21 à 30 ans", usufruit: 80, nuePropriete: 20 },
      { age: "31 à 40 ans", usufruit: 70, nuePropriete: 30 },
      { age: "41 à 50 ans", usufruit: 60, nuePropriete: 40 },
      { age: "51 à 60 ans", usufruit: 50, nuePropriete: 50 },
      { age: "61 à 70 ans", usufruit: 40, nuePropriete: 60 },
      { age: "71 à 80 ans", usufruit: 30, nuePropriete: 70 },
      { age: "81 à 90 ans", usufruit: 20, nuePropriete: 80 },
      { age: "91 ans et plus", usufruit: 10, nuePropriete: 90 },
    ],
    usufruitTemporairePar10Ans: 23, // % de la pleine propriété par période de 10 ans, sans fraction (art. 669 II)
    usufruitPersonneMoraleMaxAnnees: 30, // art. 619 du code civil
    abattementEnfant: 100000, // € par parent et par enfant, renouvelable tous les 15 ans (art. 779)
    abattementPetitEnfant: 31865, // €
    abattementArrierePetitEnfant: 5310, // €
    don790G: 31865, // € don familial de sommes d'argent, donateur de moins de 80 ans, donataire majeur
    renouvellementAnnees: 15,
    baremeLigneDirecte: [
      { jusqua: 8072, taux: 5 },
      { jusqua: 12109, taux: 10 },
      { jusqua: 15932, taux: 15 },
      { jusqua: 552324, taux: 20 },
      { jusqua: 902838, taux: 30 },
      { jusqua: 1805677, taux: 40 },
      { jusqua: Infinity, taux: 45 },
    ],
    delaiPresomptionFictiviteMois: 3, // art. 751 CGI — À VÉRIFIER dans le texte
    articleExtinctionUsufruit: "article 1133 du CGI",
    // Retraités : revenus du patrimoine et pensions
    csgPensionSeuilsRfr2026: { zero: 13048, reduit: 17057, median: 26472 }, // RFR 2024, 1 part (€) — fiche F2971
    csgPensionTauxMedian: 6.6, // %
    csgPensionTauxNormal: 8.3, // %
    plusValueRetraiteRfr1Part: 12793, // € — À VÉRIFIER (F10864, valeur non lue directement)
    plusValueRetraiteRfrDemiPart: 3428, // € — À VÉRIFIER
    lemoineMontantMax: 200000, // € par assuré, tous crédits cumulés
    lemoineAgeFinRemboursement: 60, // ans — pas de questionnaire de santé si le crédit s'achève avant cet âge
    // Dispositif Jeanbrun (location nue, amortissement) — LF 2026, art. 47
    jeanbrunPlafondAmortissement: 8000, // € par an et par foyer
    jeanbrunDureeEngagementAnnees: 9,
    jeanbrunDateLimite: "31 décembre 2028",
    jeanbrunTauxNeufIntermediaire: 3.5, // %
    source:
      "CGI art. 669 (Légifrance), 779, 784, 790 G, 968, 1133 ; BOFiP BOI-ENR-DMTG-10-40-10, BOI-PAT-IFI-20-20-30-10, BOI-RFPI-BASE-20-80 ; service-public.gouv.fr, fiches F14203, F14205, F36656, F2971, F2329, F10864, F2762 ; code des assurances art. L113-2-1 ; loi de finances pour 2026 (loi n° 2026-103 du 19 février 2026), art. 47 — seuil de travaux de la voie « ancien » non retenu (sources divergentes) ; plafond RFR de l'exonération de plus-value des retraités — À VÉRIFIER",
  },
};

// Hypothèses purement illustratives des guides du cluster immobilier (composites pédagogiques,
// sans lien avec un cas réel). Choisies à l'intérieur des fourchettes ci-dessus.
export const IMMO_EXEMPLES = {
  scpiCredit: {
    montant: 100000, // prix de souscription, frais inclus (€)
    tauxDistribution: 4.5, // taux de distribution brut supposé constant (%)
    tauxCredit: 3.5, // taux nominal du crédit, hors assurance (%) — hypothèse
    dureeAnnees: 15,
    tmi: 30, // tranche marginale d'imposition (%)
    fraisSouscriptionPct: 10, // part du prix de souscription absorbée par les frais (%)
    baissePrixPart: 15, // baisse du prix de part dans le scénario défavorable (%)
  },
  scpiAvDirect: {
    montant: 50000,
    tauxDistribution: 4.5, // %
    fraisGestionContratAnnuel: 0.6, // % — haut de la fourchette des contrats en ligne, FRAIS_TYPES.contratInternet
    tmi: 30,
  },
  scpiFiscalite: {
    revenuFoncierFrance: 4000, // loyers nets imposables en France (€)
    revenuFoncierEtranger: 1000, // revenus de source étrangère (€) — illustration du report en 2047
    plusValue: { prixAcquisition: 100000, prixCession: 120000, anneesDetention: 12 }, // simplifié, hors frais d'acquisition
    tmi: 30,
  },
  lmnpGere: {
    prixAcquisitionHT: 150000, // € hors taxes, résidence gérée neuve
    rendementBrutSuppose: 4.5, // % = RENDEMENTS.lmnp.moyen
    baisseLoyer: 20, // % imposé lors d'une renégociation, scénario défavorable
  },
  lmnpReforme: {
    prixAcquisition: 200000, // € (frais et travaux ignorés pour la lisibilité)
    partAmortissable: 80, // % du prix (hors terrain), hypothèse
    dureeAmortissementAnnees: 30, // hypothèse simplifiée d'un amortissement linéaire unique
    dureeDetentionAnnees: 15,
    prixCession: 240000,
  },
  demembrement: {
    valeurBien: 300000, // € pleine propriété
    ageDonateur: 66,
    nombreEnfants: 2,
    prixUsufruitTemporaire: 100000, // valeur en pleine propriété pour l'illustration de l'usufruit temporaire (€)
    dureeUsufruitTemporaire: 15, // ans
  },
  retraiteImmobilier: {
    pensionAnnuelleBrute: 24000, // €
    loyersFonciersAnnuels: 6000, // € loyers nets imposables
    rfrHorsLoyers: 22000, // € revenu fiscal de référence avant loyers, 1 part
  },
  source: "hypothèses d'illustration pédagogique (22 novembre 2026)",
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

// ---- Cluster décumulation : rente viagère, retraits, capital à constituer ----
// Vérifié le 22 novembre 2026 — TOUS ces blocs sont À VÉRIFIER avant publication.
// Fiscalité de la rente viagère à titre onéreux (RVTO) : seule une fraction de la rente
// est imposable à l'impôt sur le revenu, fixée une fois pour toutes selon l'âge du
// crédirentier au premier versement (CGI art. 158, 6 ; BOI-RSA-PENS-30-20).
export const RENTE_VIAGERE = {
  fractionImposableRvto: [
    { ageMin: 0, ageMax: 49, partImposable: 70, libelle: "moins de 50 ans" },
    { ageMin: 50, ageMax: 59, partImposable: 50, libelle: "de 50 à 59 ans" },
    { ageMin: 60, ageMax: 69, partImposable: 40, libelle: "de 60 à 69 ans" },
    { ageMin: 70, ageMax: 200, partImposable: 30, libelle: "70 ans et plus" },
  ],
  // Prélèvements sociaux sur la fraction imposable de la RVTO. Sources consultées en
  // novembre 2026 : 18,6 % depuis la LFSS 2026 — À VÉRIFIER (le taux de 17,2 % a pu
  // être maintenu pour certains revenus, texte à confirmer).
  prelevementsSociauxRvto: 18.6,
  rvtoDansRfr: true, // la rente entre dans le revenu fiscal de référence
  ageConversionIllustratif: 65,
  tauxInflationIllustratif: 2.0, // cible BCE, pour illustrer l'érosion d'une rente non indexée (%)
  horizonsErosion: [10, 20, 30], // années
  tauxMarginalIllustratif: 30, // TMI de l'exemple d'imposition de la rente (%)
  capitalIllustratif: 100000, // capital converti dans l'exemple (€)
  maj: "novembre 2026",
  source:
    "CGI art. 158, 6 ; BOFiP BOI-RSA-PENS-30-20 ; service-public.gouv.fr / justice.fr, « Impôt sur le revenu - Déclarer les rentes viagères » (mise à jour d'avril 2026) ; taux des prélèvements sociaux à confirmer (LFSS 2026, art. 12) — À VÉRIFIER",
};

// Retraits réguliers d'un capital : repères d'illustration (jamais des promesses).
export const RETRAIT_CAPITAL = {
  // « Règle des 4 % » : retrait initial de 4 % du capital la première année, puis
  // montant revalorisé de l'inflation. Issue d'études historiques américaines
  // (Bengen, 1994 ; étude dite « Trinity », 1998) sur des horizons de l'ordre de 30 ans.
  // Repère de discussion, non transposable tel quel à la France ni à l'avenir.
  tauxRegle4Pct: 4,
  horizonRegleAnnees: 30,
  tauxRetraitGrille: [3, 3.5, 4, 5], // taux de retrait initial testés (%)
  capitalIllustratif: 300000, // capital de départ de l'exemple (€)
  rendementIllustratif: 3.0, // lu dans DECUMULATION.rendementCapitalPendantRetraits (%)
  // Séquence de rendements annuels purement illustrative (10 ans), non historique :
  // mêmes rendements, ordre inversé. Moyenne arithmétique identique.
  sequenceDefavorable: [-20, -10, 5, 8, 10, 12, 8, 6, 10, 12],
  sequenceFavorable: [12, 10, 6, 8, 12, 10, 8, 5, -10, -20],
  retraitAnnuelSequence: 15000, // retrait annuel fixe de l'exemple de séquence (€)
  horizonsAnnees: [20, 25, 30], // durées de retraite testées
  maj: "novembre 2026",
  source:
    "W. Bengen, « Determining Withdrawal Rates Using Historical Data », Journal of Financial Planning, 1994 ; Cooley, Hubbard et Walz, étude « Trinity », 1998 ; hypothèses d'illustration pédagogique — À VÉRIFIER",
};

// Capital à constituer pour compléter une pension (guide « retraite à 65 ans »).
export const CAPITAL_COMPLEMENT = {
  revenuCibleMensuelNet: 2500, // revenu mensuel visé (€), purement illustratif
  pensionMensuelleNette: 1800, // pension nette estimée (€), lue dans ILLUSTRATIF.pensionMensuelleIllustrative
  ageDepart: 65,
  dureeRetraiteAnnees: 25, // horizon de planification de l'exemple (années)
  revenusCiblesGrille: [2000, 2500, 3000, 3500], // revenus visés testés (€/mois)
  maj: "novembre 2026",
  source: "hypothèses d'illustration pédagogique (novembre 2026) — À VÉRIFIER",
};

// Rachats programmés d'assurance-vie.
export const RACHATS_PROGRAMMES = {
  montantMensuelIllustratif: 1000, // rachat programmé mensuel de l'exemple (€)
  valeurContratIllustrative: 250000, // valeur du contrat (€)
  primesNonRembourseesIllustratives: 180000, // primes non remboursées (€)
  frequencesCourantes: ["mensuelle", "trimestrielle", "semestrielle", "annuelle"],
  maj: "novembre 2026",
  source: "hypothèses d'illustration pédagogique ; modalités variables selon les contrats (conditions générales) — À VÉRIFIER",
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

// ---- Rémunération du conseil en gestion de patrimoine ----
export const CONSEIL = {
  retrocessionAnnuelleTypique: { min: 0.5, max: 1.0 },
  honorairesBilanPatrimonial: { min: 500, max: 3000 },
  source: "ordres de grandeur usuels constatés sur le marché du conseil en gestion de patrimoine en France — À VÉRIFIER",
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

// ---- Estimation de pension et âge de départ (vague 2 SEO, pages « estimer sa pension » et « âge de départ / trimestres ») ----
// Bloc daté novembre 2026 — TOUTES les valeurs sont À VÉRIFIER avant publication.
export const ESTIMATION_PENSION_NOV2026 = {
  nombreMeilleuresAnnees: 25, // années de salaire retenues pour le salaire annuel moyen (régime général) — À VÉRIFIER
  dureeReferenceTrimestres: 172, // durée d'assurance requise, générations nées à partir de 1966 (cohérent avec AGIRC_ARRCO_EXEMPLES.dureeCarriereAnnees) — À VÉRIFIER
  trimestresMaxParAn: 4, // un an d'activité valide au plus 4 trimestres — À VÉRIFIER
  heuresSmicParTrimestre: 150, // rémunération équivalente à 150 heures de Smic pour valider un trimestre — À VÉRIFIER
  majorationEnfantTrimestres: { maternite: 4, education: 4 }, // majorations de durée d'assurance par enfant (selon la situation et le partage) — À VÉRIFIER
  // Exemples purement illustratifs (composites pédagogiques) : salaire brut annuel constant, en euros de 2026
  exempleSalaireNonCadre: 30000,
  exempleSalaireCadre: 80000,
  exempleTrimestresCarriereIncomplete: 150, // carrière incomplète de l'exemple de proratisation
  maj: "novembre 2026",
  source:
    "Code de la sécurité sociale (calcul de la pension de base, durée d'assurance) ; service-public.gouv.fr, fiche F14043 (âge légal) ; info-retraite.fr ; lassuranceretraite.fr — À VÉRIFIER avant publication ; exemples = hypothèses d'illustration pédagogique (novembre 2026)",
};

// ---- Guide « épargne retraite en couple et transmission » ----
// Bloc daté novembre 2026 — paramètres purement illustratifs (composites pédagogiques,
// sans lien avec un cas réel, jamais des projections) — TOUT est À VÉRIFIER.
// Les abattements, taux et plafonds légaux sont lus dans FISCALITE, TRANSMISSION et PER_PLAFOND.
export const COUPLE_TRANSMISSION = {
  versementPerExemple: 5000, // versement annuel sur un PER dans l'exemple de répartition entre conjoints (€)
  tmiConjointHaut: 41, // TMI du conjoint le mieux rémunéré dans l'exemple (%) — hypothèse de profil
  tmiConjointBas: 11, // TMI du conjoint le moins bien rémunéré dans l'exemple (%) — hypothèse de profil
  gainsAnnuelsAvExemple: 12000, // gains annuels réalisés par rachats sur des contrats de plus de 8 ans (€)
  nombreEnfantsExemple: 2, // nombre d'enfants bénéficiaires dans l'exemple de clause et de donation
  maj: "novembre 2026",
  source: "hypothèses d'illustration pédagogique (novembre 2026) ; CGI, art. 125-0 A, 779, 990 I et 796-0 bis pour les règles citées — À VÉRIFIER",
};

// ---- Guide « retraite de cadre ou de fonctionnaire : comparaison » ----
// Bloc daté novembre 2026 — TOUT est À VÉRIFIER. Les paramètres Agirc-Arrco et le taux plein
// du régime de base sont lus dans AGIRC_ARRCO ; le seuil de 4 % dans RETRAIT_CAPITAL.
// Fonctionnaire : pension civile = taux de liquidation × traitement indiciaire brut détenu
// depuis au moins 6 mois (code des pensions civiles et militaires de retraite), au taux
// maximal lorsque la durée de services et bonifications est atteinte. Primes hors assiette
// (hors RAFP, dont les paramètres ne sont volontairement pas chiffrés).
export const CADRE_FONCTIONNAIRE = {
  tauxLiquidationMaxFonctionnaire: 75, // taux de liquidation maximal de la pension civile (%)
  moisReferenceFonctionnaire: 6, // durée de détention du dernier traitement indiciaire retenu (mois)
  remunerationTotaleAnnuelleExemple: 60000, // rémunération brute annuelle totale de l'exemple, cadre comme fonctionnaire (€)
  partPrimesExemple: 25, // primes en % du traitement indiciaire dans l'exemple fonctionnaire
  partPrimesGrille: [0, 10, 20, 30], // parts de primes testées (% du traitement indiciaire)
  tauxRemplacementCible: 70, // taux de remplacement visé dans l'exemple d'écart (% de la rémunération totale) — repère d'illustration
  maj: "novembre 2026",
  source: "code des pensions civiles et militaires de retraite ; service-public.gouv.fr ; hypothèses d'illustration pédagogique (novembre 2026) — À VÉRIFIER",
};

// ---- Guide « assurance-vie : fonds euros ou unités de compte à 55 ans » (vague 2) ----
// Bloc daté novembre 2026 — À VÉRIFIER. Hypothèses purement illustratives (composites
// pédagogiques, jamais des projections ni des recommandations d'allocation).
// L'âge de départ et la durée de décaissement sont lus dans EPARGNE_RETRAITE_EXEMPLES ;
// les rendements dans RENDEMENTS ; l'inflation dans RENDEMENTS.inflationLongTerme.
export const AV55_FONDS_EUROS_UC = {
  ageActuel: 55, // âge du profil composite de l'article (ans)
  capitalIllustratif: 100000, // capital de l'illustration « fonds euros face à l'inflation » (€)
  maj: "novembre 2026",
  source: "hypothèses d'illustration pédagogique (novembre 2026) — À VÉRIFIER",
};

// ---- Guide « compléter sa retraite sans PER » (vague 2) ----
// Bloc daté novembre 2026 — À VÉRIFIER. Illustrations pédagogiques (composites),
// jamais des projections. Les taux sont lus dans FISCALITE, la surcote dans REGIME_GENERAL,
// la pension de l'exemple dans ILLUSTRATIF.pensionMensuelleIllustrative.
export const COMPLETER_SANS_PER_NOV2026 = {
  gainRetireIllustratif: 20000, // part de gains comprise dans un retrait, pour comparer la fiscalité AV (> 8 ans) / PEA (> 5 ans) / CTO (€)
  trimestresSurcoteExemple: 4, // trimestres cotisés au-delà de l'âge légal et de la durée requise, exemple de report de départ
  maj: "novembre 2026",
  source: "hypothèses d'illustration pédagogique (novembre 2026) ; taux lus dans FISCALITE — À VÉRIFIER",
};

// ---- Exemple illustratif « âge de départ et trimestres » (vague 2 SEO) — novembre 2026, À VÉRIFIER ----
// Composite pédagogique sans lien avec un cas réel : décompte de trimestres d'une carrière type.
export const AGE_DEPART_TRIMESTRES_EXEMPLE_NOV2026 = {
  anneesCotisees: 38, // années d'activité à 4 trimestres cotisés
  trimestresAssimiles: 6, // périodes assimilées (chômage indemnisé, maladie…) de l'exemple
  nombreEnfants: 1, // pour l'application des majorations de durée d'assurance de ESTIMATION_PENSION_NOV2026
  maj: "novembre 2026",
  source: "hypothèses d'illustration pédagogique (novembre 2026) — À VÉRIFIER ; règles : service-public.gouv.fr, lassuranceretraite.fr, info-retraite.fr",
};

// ---- Guide « Préparer sa retraite à 50 ans » (novembre 2026) ----
// Bloc daté novembre 2026 — TOUTES les valeurs sont À VÉRIFIER avant publication.
// Scénarios purement illustratifs (composites pédagogiques, jamais des projections).
// Les décotes et efforts d'épargne se calculent depuis REGIME_GENERAL, PER_PLAFOND,
// PER_PLAFOND_EXEMPLES et EPARGNE_RETRAITE_EXEMPLES : rien n'est écrit en dur dans la page.
export const PREPARER_RETRAITE_50_ANS = {
  ageDepartScenarios: [64, 65, 67], // âges de départ comparés pour l'effort d'épargne (64 = âge légal génération 1969+, 67 = âge du taux plein automatique)
  trimestresManquantsGrille: [4, 8, 12, 20], // trimestres manquants à l'âge légal, pour la grille de décote potentielle
  trimestresManquantsRachat: 8, // trimestres manquants de l'exemple de rattrapage
  maj: "novembre 2026",
  source: "hypothèses d'illustration pédagogique (novembre 2026) ; CSS (décote, durée d'assurance) via REGIME_GENERAL — À VÉRIFIER",
};

// ---- Vague 3 : guides d'action assurance-vie (ouvrir, transférer, clause, garantie) ----
// Bloc daté novembre 2026 — TOUT est À VÉRIFIER (par Fabienne) avant publication.
export const V3_AVA_OUVRIR = {
  delaiRenonciationJours: 30, // délai de renonciation à un contrat d'assurance-vie (jours calendaires) — Code des assurances, art. L132-5-1 — À VÉRIFIER
  versementInitialOrdreGrandeur: { min: 100, max: 1000 }, // versement initial minimum usuel des contrats grand public (€) — ordre de grandeur, À VÉRIFIER contrat par contrat
  versementExemple: 20000, // versement initial de l'exemple de comparaison de frais (€) — illustratif
  dureeExempleAnnees: 15, // durée de l'exemple de comparaison de frais (années) — illustratif
  maj: "novembre 2026",
  source: "Code des assurances, art. L132-5-1 (renonciation) ; service-public.gouv.fr, fiche F15274 ; frais lus dans FRAIS_TYPES — À VÉRIFIER",
};

export const V3_AVA_TRANSFERT = {
  valeurContrat: 60000, // valeur de rachat du contrat de l'exemple (€) — illustratif
  primesNonRemboursees: 40000, // versements non remboursés du contrat de l'exemple (€) — illustratif
  ancienneteAvantAnnees: 6, // ancienneté du contrat dans le cas « avant 8 ans » (années) — illustratif
  ancienneteApresAnnees: 10, // ancienneté du contrat dans le cas « après 8 ans » (années) — illustratif
  maj: "novembre 2026",
  source: "hypothèses d'illustration pédagogique ; CGI, art. 125-0 A (rachat, transfert Fourgous et transfert « Pacte ») ; taux lus dans FISCALITE — À VÉRIFIER",
};

export const V3_AVA_CLAUSE = {
  prelevement990ITaux1: 20, // prélèvement sur la part taxable des capitaux décès (primes avant 70 ans) jusqu'au seuil (%) — CGI art. 990 I — À VÉRIFIER
  prelevement990ISeuil: 700000, // seuil de la part taxable par bénéficiaire au-delà duquel s'applique le second taux (€) — À VÉRIFIER
  prelevement990ITaux2: 31.25, // taux au-delà du seuil (%) — À VÉRIFIER
  capitalExempleAvant70: 400000, // capital décès de l'exemple, primes versées avant 70 ans (€) — illustratif
  nombreBeneficiairesExemple: 2, // bénéficiaires à parts égales dans l'exemple — illustratif
  primesApres70Exemple: 80000, // primes versées après 70 ans dans l'exemple 757 B (€) — illustratif
  maj: "novembre 2026",
  source: "CGI, art. 990 I (prélèvement, abattement de 152 500 € lu dans TRANSMISSION) et 757 B (primes après 70 ans, abattement de 30 500 € lu dans TRANSMISSION) ; art. 796-0 bis (exonération conjoint/partenaire de Pacs) — À VÉRIFIER",
};

export const V3_AVA_GARANTIE = {
  montantAPlacer: 100000, // somme de l'exemple « 100 000 € à placer » (€) — illustratif
  nombreAssureursExemple: 3, // nombre d'assureurs dans l'exemple de répartition — illustratif
  maj: "novembre 2026",
  source: "FGAP (fgap.fr) ; Code des assurances, art. L423-1 et R423-1 ; plafond lu dans GARANTIES (70 000 € par assuré et par assureur, tous contrats confondus ; 90 000 € pour certaines rentes de prévoyance selon des sources secondaires, non chiffré dans la page) ; la garantie des dépôts bancaires de 100 000 € relève d'un autre mécanisme (Code monétaire et financier) — À VÉRIFIER",
};

// ---- Vague 3 « intention d'action » : guides PER (ouvrir, transférer, déclarer, liquider) ----
// Blocs datés novembre 2026 — TOUTES les valeurs sont À VÉRIFIER avant publication.
// Exemples purement illustratifs (composites pédagogiques, sans lien avec un cas réel).
export const V3_PER_OUVERTURE = {
  versementInitial: 5000, // versement initial de l'exemple (€)
  fraisEntreeHautePct: 3, // frais sur versement de l'exemple « grille haute », dans la fourchette FRAIS_TYPES.contratBancaireTraditionnel.entree (%)
  renonciationJoursMin: 14, // PER compte-titres souscrit par démarchage (CMF L. 341-16) (jours calendaires) — À VÉRIFIER
  renonciationJoursMax: 30, // PER assurantiel (Code des assurances, L. 132-5-1) (jours calendaires) — À VÉRIFIER
  maj: "novembre 2026",
  source: "CMF art. L. 224-1 et s. ; service-public.gouv.fr, fiche F34982 ; délais de renonciation à confirmer contrat par contrat — À VÉRIFIER",
};

export const V3_PER_TRANSFERT = {
  encoursExemple: 40000, // encours du PER transféré dans l'exemple (€)
  fraisMaxPctAvantAnnees: 1, // plafond légal des frais de transfert PER → PER, en % des droits acquis (CMF L. 224-6) ; 1 % aussi pour PERP/Madelin depuis le 24/10/2024 — À VÉRIFIER
  anneesFraisNuls: 5, // frais nuls 5 ans après le premier versement dans le plan, ou à l'âge légal de départ (CMF L. 224-6) ; 10 ans pour PERP/Madelin — À VÉRIFIER
  delaiLegalMois: 2, // délai maximal PER individuel → PER une fois la demande complète reçue (F34982) ; 3 mois PER d'entreprise, 4 mois anciens contrats
  maj: "novembre 2026",
  source: "CMF art. L. 224-6 (frais) et L. 224-40 (anciens produits, transfert tous les 3 ans en entreprise) ; délais : service-public.gouv.fr, fiche F34982 (consultée en novembre 2026) — article réglementaire des délais non identifié, À VÉRIFIER ; F34982 cite encore 5 % pour PERP/Madelin avant 10 ans",
};

export const V3_PER_DECLARATION = {
  versementExemple: 6000, // versement de l'année dans l'exemple (€)
  revenuActiviteExemple: 48000, // revenu d'activité net de frais de l'année précédente (€) — illustratif
  plafondReportExemple: 1500, // plafond non utilisé des années antérieures encore reportable (€) — illustratif
  maj: "novembre 2026",
  source: "CGI art. 163 quatervicies ; service-public.gouv.fr, fiche F14709 ; notice de la déclaration 2042 sur impots.gouv.fr — numérotation des cases À VÉRIFIER chaque année",
};

export const V3_PER_LIQUIDATION = {
  versementsExemple: 40000, // versements du PER dans l'exemple de sortie en capital (€)
  gainsExemple: 10000, // gains du PER dans l'exemple (€)
  anneesFractionnement: 4, // nombre d'années du scénario de capital fractionné
  maj: "novembre 2026",
  source: "CGI art. 163 quatervicies et 158, 5-b bis ; BOFiP BOI-RSA-PERS ; service-public.gouv.fr, fiche F34982 — À VÉRIFIER",
};

// ---- Vague 3 « intention d'action » : guides assurance-vie à 60 ans, après 70 ans, déclaration, 100 000 € ----
// Blocs datés novembre 2026 — TOUTES les valeurs sont À VÉRIFIER avant publication. Hypothèses
// purement illustratives (composites pédagogiques, jamais des projections ni des rendements attendus).
// Les taux, abattements, plafonds et barèmes sont lus dans FISCALITE, TRANSMISSION, AV_RACHAT,
// PER_PLAFOND, FRAIS_TYPES, GARANTIES et IMMO.demembrement.baremeLigneDirecte.

// Guide « assurance-vie à 60 ans ou à la retraite : ouvrir, garder, racheter, alimenter »
export const V3_AVB_60 = {
  ageOuverture: 60, // âge d'ouverture du contrat de l'exemple (ans)
  versementInitial: 100000, // versement initial (€)
  gainsPctDuVersement: 30, // gains supposés au moment du rachat, en % du versement : hypothèse de calcul, non un rendement attendu
  rachatExemple: 15000, // montant du rachat de l'exemple (€)
  ageRachatAvant8Ans: 63, // âge de l'assuré lors d'un rachat avant les 8 ans du contrat (ans)
  ageLimitePrimesAvantage: 70, // âge au-delà duquel les primes quittent l'abattement par bénéficiaire de l'art. 990 I
  horizonsAnnees: [5, 10], // seuils d'horizon de la grille « sécurité / équilibre / croissance » (années)
  maj: "novembre 2026",
  source:
    "hypothèses d'illustration pédagogique (novembre 2026) ; règles : service-public.gouv.fr, fiche F22414 ; BOFiP BOI-RPPM-RCM-20-10-20-50 ; CGI art. 990 I — À VÉRIFIER",
};

// Guide « assurance-vie après 70 ans : fiscalité et succession » (CGI art. 757 B et 990 I)
export const V3_AVB_70 = {
  agePivot: 70, // âge du souscripteur au versement qui sépare l'art. 990 I (avant) de l'art. 757 B (après)
  primesApres70: 80000, // primes versées après 70 ans dans l'exemple (€)
  valeurAuDeces: 100000, // valeur du contrat au décès dans l'exemple : l'écart avec les primes = intérêts et gains (€)
  nombreEnfants: 2, // bénéficiaires à parts égales dans l'exemple
  hypotheseAbattementEnfantEpuise: true, // l'abattement de 100 000 € de chaque enfant est supposé déjà consommé par le reste de la succession
  maj: "novembre 2026",
  source:
    "CGI art. 757 B (primes versées après 70 ans) et 990 I (primes avant 70 ans) ; CGI art. 779 et barème de l'art. 777 (ligne directe) lu dans IMMO.demembrement ; hypothèses d'illustration pédagogique — À VÉRIFIER",
};

// Guide « déclarer un rachat d'assurance-vie ou une sortie de PER »
export const V3_AVB_DECL = {
  avGainsRachat: 6000, // part de gains d'un rachat sur contrat de plus de 8 ans, personne seule (€)
  perVersementsDeduits: 40000, // part du capital PER correspondant à des versements déduits (€)
  perGains: 10000, // part du capital PER correspondant aux gains (€)
  tmiExemple: 30, // TMI supposée du foyer à la sortie du PER (%) : simplification, le barème est progressif
  maj: "novembre 2026",
  source:
    "service-public.gouv.fr, fiches F22414 et F34982 ; impots.gouv.fr, « Les revenus mobiliers » ; numéros de cases volontairement non chiffrés (à lire sur la notice annuelle) ; hypothèses d'illustration pédagogique — À VÉRIFIER",
};

// Guide « investir 100 000 € pour la retraite » : trois profils composites, sans rendement
export const V3_AVB_100K = {
  capital: 100000, // capital à placer (€)
  depenseMensuelleReference: 2500, // dépenses courantes mensuelles du foyer, pour dimensionner le fonds de sécurité (€)
  moisFondsSecurite: 6, // mois de dépenses conservés en liquidités
  ageDepart: 64, // âge de départ retenu (cf. ENVELOPPES_NOV2026.ageDepartReference)
  profils: [
    // revenuNetImposable = salaire net imposable 2025, avant l'abattement de 10 % pour frais (appliqué dans la page)
    { id: "construction", age: 45, tmi: 30, revenuNetImposable: 60000, per: 25000, av: 20000, pea: 30000, immo: 10000 },
    { id: "approche", age: 55, tmi: 30, revenuNetImposable: 72000, per: 20000, av: 35000, pea: 20000, immo: 10000 },
    { id: "decaissement", age: 62, tmi: 11, revenuNetImposable: 32000, per: 0, av: 50000, pea: 20000, immo: 10000 },
  ], // répartitions en € du solde après fonds de sécurité (le fonds de sécurité est calculé) — illustratives, non des recommandations
  maj: "novembre 2026",
  source:
    "hypothèses d'illustration pédagogique (novembre 2026) ; plafond de versement PER lu dans PER_PLAFOND ; fiscalité lue dans FISCALITE — À VÉRIFIER ; aucune projection de rendement",
};

// ---- Vague 3 — guide « transférer son PEA » (novembre 2026) ----
// Cas purement illustratif (composite pédagogique, grilles fictives lues dans PEA_LIGNE_NOV2026).
// Plafonds de frais de transfert : ENVELOPPES_NOV2026.peaFraisTransfertMax (15 € par ligne de titres
// cotés, 150 € au total) — confirmés le 23 novembre 2026 sur la fiche AMF « Plafonnement des frais pour
// le PEA » (décret n° 2020-95 du 5 février 2020) ; les mêmes plafonds valent pour les frais de clôture.
export const V3_PEA_TRANSFERT = {
  valeurPlan: 60000, // valeur du PEA transféré (€)
  nombreLignes: 8, // nombre de lignes de titres transférées
  versementMensuel: 300, // versement mensuel poursuivi après le transfert (€), lu dans PEA_LIGNE_NOV2026.versementMensuel
  fraisTransfertParLigneNonCote: 50, // plafond des frais de transfert/clôture par ligne de titres non cotés (€) — AMF, décret 2020-95
  droitsGardeMajorationParLigneCote: 5, // majoration annuelle possible des droits de garde par ligne de titres cotés, en plus de 0,4 % (€) — AMF
  delaiIndicatifSemaines: "2 à 6", // ordre de grandeur courant, aucun délai légal identifié, variable selon les établissements — À VÉRIFIER
  maj: "novembre 2026",
  source:
    "décret n° 2020-95 du 5 février 2020 (plafonnement des frais du PEA) ; AMF, « Plafonnement des frais pour le PEA : que faut-il retenir ? » (10 juillet 2020, consultée le 23 novembre 2026) ; CMF art. L. 221-30 et s. ; service-public.gouv.fr, fiche F2385 (vérifiée le 22 mai 2026) ; hypothèses d'illustration — délai indicatif À VÉRIFIER",
};

// ---- Vague 3 — guide « sortir du PEA à la retraite » (novembre 2026) ----
// Cas purement illustratifs (composites pédagogiques). Prélèvements sociaux : FISCALITE.prelevementsSociaux.pea
// (18,6 %, taux applicable selon la date d'acquisition des gains — À VÉRIFIER). Taux IR avant 5 ans : FISCALITE.pfuIR.
export const V3_PEA_RETRAITE = {
  planApres5Ans: { valeur: 180000, versements: 120000, retraitAnnuel: 12000 }, // € (versements < plafond de 150 000 €)
  planAvant5Ans: { valeur: 40000, versements: 30000 }, // € — clôture totale avant 5 ans
  maj: "novembre 2026",
  source:
    "service-public.gouv.fr, fiches F2385 (PEA, vérifiée le 22 mai 2026) et F22449 (imposition du PEA, vérifiée le 15 avril 2026) ; CGI art. 150-0 A, 157 ; BOI-RPPM-RCM-40-50 ; hypothèses d'illustration — À VÉRIFIER (taux de prélèvements sociaux selon la date d'acquisition des gains, régime social de la rente viagère)",
};

// ---- Vague 3 — guide « SCPI ou LMNP pour compléter sa retraite » (novembre 2026) ----
// Cas composite purement illustratif, SANS promesse de rendement. Fiscalité : FISCALITE, IMMO.lmnp, IMMO_EXEMPLES.
export const V3_IMM_COMPARATIF = {
  capitalEngage: 150000, // € engagés dans chaque solution, frais d'acquisition compris (simplification)
  scpi: { tauxDistribution: 4.5, fraisSouscriptionPct: 10, baissePrixPartPct: 15 }, // %, scénario défavorable = baisse du prix de part
  lmnp: { rendementBrut: 4.5, chargesNonRecuperablesPct: 15, baisseLoyerPct: 20 }, // % des loyers ; micro-BIC supposé applicable
  tmi: 30, // tranche marginale d'imposition supposée (%)
  maj: "novembre 2026",
  source:
    "hypothèses d'illustration pédagogique (novembre 2026), dans les fourchettes de RENDEMENTS et IMMO_EXEMPLES ; micro-BIC et prélèvements sociaux : IMMO.lmnp ; foncier : FISCALITE — À VÉRIFIER (statut micro-BIC d'une résidence gérée, charges réelles) ; PLF 2027, art. 7 (plafonnement de l'amortissement LMNP) : volet supprimé par les députés fin octobre 2026 (legifiscal.fr, 31/10/2026), texte toujours en discussion et non adopté au 23 novembre 2026",
};

// ---- Vague 3 — guide « comment choisir une SCPI » (novembre 2026) ----
// Exemples purement illustratifs d'une part fictive. Chiffres de marché : IMMO.scpiMarche (ASPIM).
export const V3_IMM_CHOISIR_SCPI = {
  prixPart: 200, // € prix de souscription d'une part fictive
  distributionParPart: 9, // € distribués par part sur l'année (taux de distribution = 4,5 %)
  fraisSouscriptionPct: 10, // % du prix de souscription — À VÉRIFIER SCPI par SCPI
  partIssueDuReportANouveauPct: 15, // % de la distribution prélevée sur des réserves, hypothèse d'école
  dureePlacementRecommandee: "huit à dix ans", // mention usuelle des DIC — À VÉRIFIER SCPI par SCPI
  maj: "novembre 2026",
  source:
    "AMF, guide « Investir dans une SCPI » (2023) et « Comprendre le DIC » ; ASPIM, communiqués du 10 février et du 5 août 2026 ; hypothèses d'illustration — À VÉRIFIER",
};

// ---- Vague 3 « intention d'action » : guides retraite régime général (novembre 2026) ----
// Blocs préfixés V3_REG_. Bloc daté novembre 2026 — TOUTES les valeurs sont À VÉRIFIER avant publication.
// Exemples = composites pédagogiques, jamais des projections ni des cas réels.

// Guide « demande de retraite : démarches et calendrier »
export const V3_REG_DEMANDE = {
  delaiDemandeMinMois: 4, // délai conseillé de dépôt de la demande, borne basse (mois avant la date de départ) — service-public F13941 : « en général entre 4 et 6 mois » — À VÉRIFIER auprès de la caisse
  delaiDemandeMaxMois: 6, // borne haute (mois)
  delaiDemandeConseilleMois: 5, // service-public F13941 : faire la demande « au moins 5 mois avant la date de départ souhaitée » (vérifié en ligne le 23 novembre 2026)
  moisReleveEtSimulation: 24, // vérification du relevé de carrière et simulation : repère pédagogique, pas une règle (mois avant) — À VÉRIFIER
  dateDepartExemple: { annee: 2028, mois: 10 }, // départ au 1er octobre 2028 (mois 1 = janvier) — exemple composite
  depensesMensuellesExemple: 2400, // dépenses courantes mensuelles du ménage (€) — hypothèse
  moisSansRevenuExemple: 2, // mois à couvrir entre la fin du salaire et le premier versement, pensions payées à terme échu (hypothèse prudente)
  maj: "novembre 2026",
  source: "service-public.gouv.fr, fiche F13941 (demande de retraite du salarié, vérifiée le 1er septembre 2025) ; info-retraite.fr ; lassuranceretraite.fr ; agirc-arrco.fr — À VÉRIFIER",
};

// Guide « retraite anticipée pour carrière longue »
export const V3_REG_CARRIERE_LONGUE = {
  seuilsDebutActivite: [16, 18, 20, 21], // âges avant lesquels le début d'activité ouvre droit au dispositif (service-public F13845, vérifiée le 1er septembre 2026 ; circulaire Cnav n° 2026-29 du 4 septembre 2026)
  agesDepartAnticipe: [58, 60, 62, 63], // âges de départ des assurés nés à compter de 1971, dans l'ordre des seuils (circulaire Cnav n° 2026-29, § 1.1.1)
  generationBaremeComplet: 1971, // première génération à laquelle s'appliquent les quatre âges ci-dessus
  // Barème par génération, départs à compter du 1er septembre 2026 (circulaire Cnav n° 2026-29, annexe 2, après la LFSS 2026 et le décret n° 2026-345).
  // ages : âge minimum de départ pour un début avant 16, 18, 20, 21 ans ; null = pas de borne propre à cette génération dans l'annexe.
  // trimestresCotises : durée d'assurance cotisée exigée (durée du taux plein de la génération).
  baremeParGeneration: [
    { generation: "1964", ages: [null, null, "60 ans et 6 mois", null], trimestresCotises: 170 },
    { generation: "1965 (janvier à mars)", ages: [null, null, "60 ans et 9 mois", null], trimestresCotises: 170 },
    { generation: "1965 (avril à novembre)", ages: [null, null, "60 ans et 9 mois", null], trimestresCotises: 171 },
    { generation: "1965 (décembre)", ages: [null, null, "60 ans et 8 mois", null], trimestresCotises: 171 },
    { generation: "1966", ages: [null, "60 ans", "60 ans et 9 mois", "63 ans"], trimestresCotises: 172 },
    { generation: "1967", ages: ["58 ans", "60 ans", "61 ans", "63 ans"], trimestresCotises: 172 },
    { generation: "1968", ages: ["58 ans", "60 ans", "61 ans et 3 mois", "63 ans"], trimestresCotises: 172 },
    { generation: "1969", ages: ["58 ans", "60 ans", "61 ans et 6 mois", "63 ans"], trimestresCotises: 172 },
    { generation: "1970", ages: ["58 ans", "60 ans", "61 ans et 9 mois", "63 ans"], trimestresCotises: 172 },
    { generation: "1971 et suivantes", ages: ["58 ans", "60 ans", "62 ans", "63 ans"], trimestresCotises: 172 },
  ],
  trimestresDebutActivite: 5, // trimestres à valider en tout début d'activité (service-public F13845)
  trimestresDebutActiviteNesT4: 4, // si né entre le 1er octobre et le 31 décembre
  complementMensuelExemple: 500, // complément mensuel recherché pendant les années gagnées (€) — hypothèse
  ageDepartExemple: 60, // âge de départ anticipé de l'exemple
  generationExemple: "1969 et suivantes", // génération de l'exemple (âge légal : voir RETRAITE_PROGRESSIVE_CUMUL.ageLegalParGeneration)
  ageActuelExemple: 45, // âge auquel commence l'effort d'épargne de l'exemple
  maj: "novembre 2026",
  source: "service-public.gouv.fr, fiches F13845 (carrière longue, vérifiée le 1er septembre 2026) et F14043 (âge légal) ; circulaire Cnav n° 2026-29 du 4 septembre 2026 (retraite anticipée pour carrière longue à compter du 1er septembre 2026 : âges, durée cotisée, rachats et versements pour la retraite) ; lassuranceretraite.fr ; info-retraite.fr",
};

// Guide « pension de réversion »
export const V3_REG_REVERSION = {
  tauxRegimeGeneral: 54, // % de la pension de retraite de base du conjoint décédé (régime général) — service-public F13104, vérifiée le 1er janvier 2026
  tauxAgircArrco: 60, // % des points de retraite complémentaire du conjoint décédé (Agirc-Arrco, décès depuis le 1er janvier 2019) — reglementation.agirc-arrco.fr
  ageMinimum: 55, // âge minimal du conjoint survivant, régime général (F13104) ; aussi 55 ans à l'Agirc-Arrco, sauf 2 enfants à charge ou invalidité
  plafondRessourcesSeul: 25001.6, // plafond annuel de ressources brutes, personne seule (€) — F13104, vérifiée le 1er janvier 2026 ; revalorisé chaque année
  plafondRessourcesCouple: 40002.56, // plafond annuel de ressources brutes, en couple (€) — F13104, vérifiée le 1er janvier 2026
  pensionBaseMensuelleDefuntExemple: 1400, // pension de base mensuelle du conjoint décédé (€) — exemple composite
  complementaireAnnuelleDefuntExemple: 6000, // retraite complémentaire annuelle du conjoint décédé (€) — exemple composite
  maj: "novembre 2026",
  source: "service-public.gouv.fr, fiche F13104 (pension de réversion de l'Assurance retraite, vérifiée le 1er janvier 2026) ; reglementation.agirc-arrco.fr, fiche « Réversion des conjoints » ; lassuranceretraite.fr — plafond de ressources revalorisé chaque 1er janvier : À VÉRIFIER pour 2027",
};

// Guide « revenus locatifs et retraite : cumul, impôts, cotisations »
export const V3_REG_LOCATIFS = {
  loyersBrutsAnnuelsExemple: 9000, // loyers annuels bruts encaissés (€) — hypothèse
  tmiScenarios: [11, 30], // deux TMI comparées (%), voir FISCALITE.tmiOptions
  pensionAnnuelleExemple: 22000, // pensions de retraite annuelles imposables, avant loyers (€) — hypothèse
  microBicLongueDureeRevenus2026: 83600, // seuil micro-BIC meublé longue durée et tourisme classé, revenus 2026 (€) — service-public F32744 vérifiée le 15/04/2026 (77 700 € pour les revenus 2025 : IMMO.lmnp)
  maj: "novembre 2026",
  source: "service-public.gouv.fr, fiches F1991 (revenus locatifs, location non meublée), F32744 (location meublée, vérifiée le 15 avril 2026) et F2329 (prélèvements sociaux, vérifiée le 30 juin 2026 : 18,6 % sur la location meublée non professionnelle, 17,2 % sur les revenus fonciers) ; BOFiP BOI-BIC-CHAMP-40-10 § 150 (pensions comprises dans les revenus comparés aux recettes pour le statut LMP) ; taux et plafonds lus dans IMMO et FISCALITE ; cotisations d'un loueur meublé professionnel retraité : non chiffrées, À VÉRIFIER",
};

export const V3_AVA_GARANTIE_DEPOTS = {
  plafondDepotsParDeposantParEtablissement: 100000, // garantie des dépôts bancaires (FGDR), par déposant et par établissement (€) — distincte du FGAP — À VÉRIFIER
  source: "FGDR (garantiedesdepots.fr) ; Code monétaire et financier, art. L312-4 et suivants — À VÉRIFIER",
};
