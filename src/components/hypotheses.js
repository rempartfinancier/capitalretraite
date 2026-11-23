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
