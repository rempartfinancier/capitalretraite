// Source de vérité unique : routes, métadonnées SEO, fils d'Ariane.
// Utilisée par l'app (client + SSR) ET par scripts/prerender.mjs.

export const SITE_URL = "https://www.capitalretraite.com";

export const routesMeta = [
  {
    path: "/",
    title: "Capital Retraite — Construisez votre capital retraite avec méthode",
    description:
      "Conseil retraite sur mesure pour cadres et fonctionnaires de 45 à 60 ans : PER, assurance-vie, PEA, décumulation, immobilier. Bilan retraite gratuit en 15 minutes.",
    breadcrumb: null,
  },
  {
    path: "/bilan-retraite",
    title: "Bilan retraite personnalisé gratuit — Capital Retraite",
    description:
      "Un audit de votre situation retraite en 15 minutes par visio : lacune de revenus projetée, enveloppes sous-utilisées, optimisations immédiates. Gratuit, sans engagement.",
    breadcrumb: [["Accueil", "/"], ["Bilan retraite", "/bilan-retraite"]],
  },
  {
    path: "/guide-audit-assurance-vie",
    title: "Grille d'audit assurance-vie en 20 points (PDF gratuit) — Capital Retraite",
    description:
      "Le guide PDF gratuit pour savoir en 20 minutes si votre assurance-vie vous coûte cher : checklist notée en 4 blocs (frais, supports, fiscalité, clause bénéficiaire), barème de référence et score sur 20 points.",
    breadcrumb: [["Accueil", "/"], ["Guide gratuit : grille d'audit assurance-vie", "/guide-audit-assurance-vie"]],
  },
  {
    path: "/simulateur-retraite",
    title: "Simulateur retraite gratuit : votre score retraite sur 100 en 3 minutes",
    description:
      "Diagnostic retraite en 6 étapes : votre score sur 100, la baisse de revenus qui vous attend, le capital nécessaire et l'effort d'épargne pour combler l'écart. Gratuit, sans compte, hypothèses affichées.",
    breadcrumb: [["Accueil", "/"], ["Simulateur retraite", "/simulateur-retraite"]],
  },
  {
    path: "/strategies",
    title: "5 stratégies pour construire votre capital retraite",
    description:
      "PER, assurance-vie, PEA, décumulation, immobilier : cinq stratégies retraite expliquées sans jargon. Le bon choix dépend de votre âge, de votre TMI et de votre horizon.",
    breadcrumb: [["Accueil", "/"], ["Stratégies", "/strategies"]],
  },
  {
    path: "/guides",
    title: "Tous nos guides retraite — PER, assurance-vie, PEA, immobilier",
    description:
      "La bibliothèque complète de nos guides retraite, classés par enveloppe : PER, assurance-vie, PEA, immobilier, décumulation. Comparatifs, coûts et pièges à éviter.",
    breadcrumb: [["Accueil", "/"], ["Guides", "/guides"]],
  },
  {
    path: "/strategies/per",
    title: "Le PER : fonctionnement, fiscalité, pièges — Capital Retraite",
    description:
      "Plan Épargne Retraite : avantage fiscal à l'entrée, modes de sortie en capital ou en rente, fiscalité à la sortie, pour qui c'est adapté et les pièges à éviter.",
    breadcrumb: [["Accueil", "/"], ["Stratégies", "/strategies"], ["PER", "/strategies/per"]],
  },
  {
    path: "/strategies/assurance-vie-retraite",
    title: "L'assurance-vie comme outil retraite — Capital Retraite",
    description:
      "Rachats programmés, fiscalité après 8 ans, avantages successoraux, rente viagère optionnelle : comment l'assurance-vie s'intègre dans une stratégie retraite.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Stratégies", "/strategies"],
      ["Assurance-vie retraite", "/strategies/assurance-vie-retraite"],
    ],
  },
  {
    path: "/strategies/pea-retraite",
    title: "Le PEA dans une optique retraite — Capital Retraite",
    description:
      "Capitalisation longue durée, exonération des plus-values après 5 ans, rente viagère défiscalisée : le PEA comme brique retraite, ses atouts et ses limites.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Stratégies", "/strategies"],
      ["PEA retraite", "/strategies/pea-retraite"],
    ],
  },
  {
    path: "/strategies/decumulation",
    title: "La décumulation : convertir son capital en revenus — Capital Retraite",
    description:
      "Rente viagère, rachats progressifs, ordre de sortie des enveloppes, fiscalité comparative, risque de longévité : la décumulation expliquée simplement.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Stratégies", "/strategies"],
      ["Décumulation", "/strategies/decumulation"],
    ],
  },
  {
    path: "/strategies/immobilier-retraite",
    title: "L'immobilier dans la stratégie retraite — Capital Retraite",
    description:
      "SCPI à crédit, LMNP, usufruit temporaire, démembrement : la place de l'immobilier dans une stratégie retraite, et quand il vaut mieux comparer avant de souscrire.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Stratégies", "/strategies"],
      ["Immobilier retraite", "/strategies/immobilier-retraite"],
    ],
  },
  {
    path: "/guide/combien-faut-il-epargner-pour-la-retraite",
    title: "Combien épargner pour sa retraite ? Par mois, selon l'âge",
    description:
      "Combien épargner par mois pour sa retraite selon l'âge et le revenu ? Tableaux chiffrés, capital cible, effet des frais et de l'inflation.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Combien épargner pour la retraite", "/guide/combien-faut-il-epargner-pour-la-retraite"],
    ],
  },
  {
    path: "/guide/per-vs-assurance-vie-retraite",
    title: "PER ou assurance-vie pour la retraite : que choisir ?",
    description:
      "PER ou assurance-vie selon votre TMI et votre horizon : tableau chiffré, plafond de déduction, profils types et FAQ.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["PER vs assurance-vie", "/guide/per-vs-assurance-vie-retraite"],
    ],
  },
  {
    path: "/guide/fiscalite-sortie-per",
    title: "Fiscalité de sortie du PER : capital ou rente ?",
    description:
      "Sortie en capital ou en rente : impôt sur le revenu, prélèvements sociaux, fractionnement et timing de sortie. Un sujet technique expliqué pédagogiquement.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Fiscalité de sortie du PER", "/guide/fiscalite-sortie-per"],
    ],
  },
  {
    path: "/guide/a-quel-age-commencer-per",
    title: "À quel âge ouvrir un PER ? Une réponse franche",
    description:
      "Le plus tôt possible — mais pas pour tout le monde. TMI, horizon, liquidité : à quel âge le PER devient pertinent, et pourquoi il n'est pas trop tard à 50 ans.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["À quel âge commencer un PER", "/guide/a-quel-age-commencer-per"],
    ],
  },
  {
    path: "/guide/deblocage-anticipe-per",
    title: "Déblocage anticipé du PER : les 6 cas, la fiscalité et les pièges",
    description:
      "Les six cas légaux de déblocage d'un PER avant la retraite, leur fiscalité réelle et les deux pièges les plus coûteux : les compartiments non débloquables et l'effet du retrait sur votre tranche marginale.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Déblocage anticipé du PER", "/guide/deblocage-anticipe-per"],
    ],
  },
  {
    path: "/guide/pourquoi-votre-assurance-vie-rapporte-peu",
    title: "Pourquoi votre assurance-vie rapporte si peu — et comment le vérifier",
    description:
      "Fonds euros, fonds maison, frais d'entrée et de gestion, gestion pilotée : les mécanismes qui rognent le rendement d'une assurance-vie bancaire — et la méthode pour auditer la vôtre.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Pourquoi votre assurance-vie rapporte peu", "/guide/pourquoi-votre-assurance-vie-rapporte-peu"],
    ],
  },
  {
    path: "/guide/per-bancaire-frais-gestion-horizon",
    title: "PER bancaire : frais, gestion à horizon, supports maison — ce qu'il faut vérifier",
    description:
      "Un PER peut être fiscalement brillant et financièrement décevant : frais sur versements, gestion pilotée à horizon par défaut, fonds maison. La grille de lecture pour auditer votre plan.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["PER bancaire : ce qu'il faut vérifier", "/guide/per-bancaire-frais-gestion-horizon"],
    ],
  },
  {
    path: "/guide/pea-banque-ou-courtier",
    title: "PEA en ligne ou banque : frais comparés et mode d'emploi",
    description:
      "PEA en ligne ou en banque : comparatif des frais, mode d'emploi pour ouvrir et alimenter, fiscalité à 18,6 % et rôle pour la retraite.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["PEA : banque ou courtier", "/guide/pea-banque-ou-courtier"],
    ],
  },
  {
    path: "/guide/meilleure-enveloppe-retraite",
    title: "Quelle est la meilleure enveloppe pour préparer sa retraite ?",
    description:
      "PER, PEA, assurance-vie : notre classement honnête des enveloppes retraite — et pourquoi le PER n'est pas la solution magique qu'on vous vend. Analyse par profil et par objectif.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["La meilleure enveloppe retraite", "/guide/meilleure-enveloppe-retraite"],
    ],
  },
  {
    path: "/guide/faut-il-ouvrir-un-per",
    title: "Faut-il ouvrir un PER ? Les cas où la réponse est non",
    description:
      "Le PER n'est pas fait pour tout le monde : TMI basse, besoin de liquidité, mauvais contrat, mauvaise raison. Les situations où ouvrir un PER est une erreur — et celles où il excelle.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Faut-il ouvrir un PER", "/guide/faut-il-ouvrir-un-per"],
    ],
  },
  {
    path: "/guide/pea-ou-per-pour-la-retraite",
    title: "PEA ou PER pour préparer sa retraite ? Le vrai match",
    description:
      "Fiscalité, disponibilité, sortie, succession : le comparatif complet PEA vs PER pour la retraite. Deux enveloppes que tout oppose — à commencer par ce qu'il en reste au décès.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["PEA ou PER", "/guide/pea-ou-per-pour-la-retraite"],
    ],
  },
  {
    path: "/guide/pea-ou-assurance-vie",
    title: "PEA ou assurance-vie : lequel choisir pour la retraite ?",
    description:
      "Plafonds, fiscalité, souplesse, transmission : le comparatif PEA / assurance-vie — et pourquoi les opposer est souvent la mauvaise question. Complémentaires plus que concurrents.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["PEA ou assurance-vie", "/guide/pea-ou-assurance-vie"],
    ],
  },
  {
    path: "/guide/inconvenients-du-pea",
    title: "Les inconvénients du PEA : plafond, rigidité, succession",
    description:
      "Plafond de 150 000 €, univers restreint aux actions, clôture au décès : les vraies limites du PEA, expliquées sans détour — et pourquoi il reste central dans une stratégie retraite.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Les inconvénients du PEA", "/guide/inconvenients-du-pea"],
    ],
  },
  {
    path: "/guide/risques-assurance-vie",
    title: "Les risques réels de l'assurance-vie, expliqués sans tabou",
    description:
      "Loi Sapin 2, solidité de l'assureur, unités de compte, délais de rachat : les vrais risques de l'assurance-vie, leur probabilité réelle et comment s'en protéger. Sans catastrophisme.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Les risques de l'assurance-vie", "/guide/risques-assurance-vie"],
    ],
  },
  {
    path: "/guide/combien-coute-une-assurance-vie",
    title: "Combien coûte une assurance-vie ? La grille poste par poste",
    description:
      "Frais d'entrée, de gestion, d'arbitrage, frais des supports, coût de la gestion pilotée : tous les frais d'une assurance-vie décodés poste par poste, avec les fourchettes du marché.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Combien coûte une assurance-vie", "/guide/combien-coute-une-assurance-vie"],
    ],
  },
  {
    path: "/guide/combien-coute-un-conseiller-en-gestion-de-patrimoine",
    title: "Combien coûte un conseiller en gestion de patrimoine ?",
    description:
      "Rétrocessions, honoraires, frais cachés : comment un conseiller en gestion de patrimoine est rémunéré, ce que cela change pour vous, et les questions à poser avant de signer.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Le coût d'un conseiller", "/guide/combien-coute-un-conseiller-en-gestion-de-patrimoine"],
    ],
  },
  {
    path: "/guide/quel-est-le-meilleur-per",
    title: "Quel est le meilleur PER ? Pourquoi nous ne publions pas de classement",
    description:
      "Les classements « meilleur PER » sont presque tous biaisés par l'affiliation. Notre réponse : pas de palmarès, mais la grille de critères pour juger n'importe quel contrat vous-même.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Quel est le meilleur PER", "/guide/quel-est-le-meilleur-per"],
    ],
  },
  {
    path: "/guide/etf-ou-fonds-actifs",
    title: "ETF ou fonds de gestion active : le vrai match, sans caricature",
    description:
      "93 % des gérants battus par les indices ? La réalité est plus nuancée. ETF et gestion active comparés honnêtement : frais, performance, biais des études — et ce qui compte vraiment.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["ETF ou fonds actifs", "/guide/etf-ou-fonds-actifs"],
    ],
  },
  {
    path: "/guide/lmnp-risques",
    title: "LMNP : les risques que l'on vous cache",
    description:
      "Amortissement, réforme fiscale, dépendance à l'exploitant en résidence gérée : les vrais risques du statut LMNP, au-delà de l'argument de vente.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Les risques du LMNP", "/guide/lmnp-risques"],
    ],
  },
  {
    path: "/guide/lmnp-ou-locatif-nu",
    title: "LMNP ou locatif nu : lequel choisir pour la retraite ?",
    description:
      "Deux régimes fiscaux, deux niveaux de gestion : le comparatif entre location meublée (LMNP) et location nue pour préparer sa retraite.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["LMNP ou locatif nu", "/guide/lmnp-ou-locatif-nu"],
    ],
  },
  {
    path: "/guide/combien-coute-un-investissement-locatif",
    title: "Combien coûte réellement un investissement locatif ?",
    description:
      "Frais de notaire, gestion locative, vacance, fiscalité : la grille de coûts complète d'un bien locatif, du rendement brut affiché au rendement net réel.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Le coût d'un investissement locatif", "/guide/combien-coute-un-investissement-locatif"],
    ],
  },
  {
    path: "/guide/cinq-erreurs-investissement-locatif-retraite",
    title: "Les 5 erreurs les plus coûteuses de l'investissement locatif retraite",
    description:
      "Prix au m², cash-flow positif à tout prix, gestion sous-estimée : les fausses boussoles qui plombent un projet immobilier pensé pour la retraite.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["5 erreurs de l'investissement locatif", "/guide/cinq-erreurs-investissement-locatif-retraite"],
    ],
  },
  {
    path: "/guide/immobilier-locatif-ou-assurance-vie",
    title: "Immobilier locatif ou assurance-vie pour préparer sa retraite ?",
    description:
      "Effet de levier du crédit contre polyvalence fiscale : le comparatif entre investissement locatif direct et assurance-vie pour se constituer un capital retraite.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Immobilier ou assurance-vie", "/guide/immobilier-locatif-ou-assurance-vie"],
    ],
  },
  {
    path: "/guide/per-ou-immobilier-locatif",
    title: "PER ou immobilier locatif : lequel privilégier pour transmettre ?",
    description:
      "Abattement successoral du PER assurantiel contre démembrement immobilier : deux façons de protéger sa famille, comparées sans parti pris.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["PER ou immobilier locatif", "/guide/per-ou-immobilier-locatif"],
    ],
  },
  {
    path: "/guide/combien-coute-un-per",
    title: "Combien coûte un PER, vraiment ?",
    description:
      "Frais sur versements, gestion annuelle, supports, gestion pilotée : la grille des frais d'un PER poste par poste, réseau traditionnel contre contrat en ligne.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Combien coûte un PER", "/guide/combien-coute-un-per"],
    ],
  },
  {
    path: "/guide/inconvenients-rente-viagere",
    title: "Rente viagère : les inconvénients qu'on ne vous dit jamais",
    description:
      "Aliénation définitive du capital, taux de conversion figé, absence de transmission : ce qu'implique vraiment le choix de la rente viagère.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Les inconvénients de la rente viagère", "/guide/inconvenients-rente-viagere"],
    ],
  },
  {
    path: "/guide/rente-viagere-ou-retraits-programmes",
    title: "Rente viagère ou retraits programmés : comment choisir ?",
    description:
      "Sécurité du revenu à vie contre capital transmissible : le comparatif chiffré entre rente viagère et retraits programmés selon votre longévité.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Rente ou retraits programmés", "/guide/rente-viagere-ou-retraits-programmes"],
    ],
  },
  {
    path: "/guide/ordre-de-decaissement-retraite",
    title: "L'ordre de décaissement : l'erreur qui coûte cher à la retraite",
    description:
      "Par quelle enveloppe commencer à la retraite : l'ordre dans lequel puiser dans son épargne pèse autant que l'ordre dans lequel on l'a constituée.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["L'ordre de décaissement", "/guide/ordre-de-decaissement-retraite"],
    ],
  },
  {
    path: "/guide/meilleure-assurance-vie-retraite",
    title: "Assurance-vie pour la retraite : laquelle choisir ?",
    description:
      "Assurance-vie et retraite : constituer, retirer, fiscalité 2026, critères de choix et erreurs à éviter. Comparatif par profil.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["La meilleure assurance-vie", "/guide/meilleure-assurance-vie-retraite"],
    ],
  },
  {
    path: "/guide/retraite-independants-per-ou-madelin",
    title: "Retraite des indépendants : PER ou contrat Madelin ?",
    description:
      "TNS, professions libérales, gérants majoritaires : PER individuel ou contrat Madelin pour préparer sa retraite ? Plafonds de déduction, sortie en rente ou en capital, ce qui a changé depuis la loi PACTE.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["PER ou Madelin (indépendants)", "/guide/retraite-independants-per-ou-madelin"],
    ],
  },
  {
    path: "/guide/combien-coute-rachat-trimestres-retraite",
    title: "Combien coûte le rachat de trimestres pour la retraite ?",
    description:
      "Versement pour la retraite (ex-rachat Fillon) : ce qui détermine le prix d'un trimestre racheté, comment l'estimer avec le simulateur officiel, et quand l'opération est réellement rentable.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Le coût du rachat de trimestres", "/guide/combien-coute-rachat-trimestres-retraite"],
    ],
  },
  {
    path: "/guide/cumul-emploi-retraite-comment-ca-marche",
    title: "Cumul emploi-retraite : comment ça marche et quelles limites ?",
    description:
      "Cumul intégral ou plafonné, cotisations qui ne créent plus de droits, règles propres à chaque régime : le cumul emploi-retraite expliqué simplement, et les erreurs qui coûtent une pension.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Le cumul emploi-retraite", "/guide/cumul-emploi-retraite-comment-ca-marche"],
    ],
  },
  {
    path: "/guide/surcote-decote-retraite",
    title: "Surcote ou décote à la retraite : comment ça se calcule ?",
    description:
      "1,25 % par trimestre de surcote, autant en décote plafonnée à 20 trimestres : le mécanisme qui peut faire gagner ou perdre plusieurs centaines d'euros par mois de pension, et comment l'anticiper.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Surcote et décote", "/guide/surcote-decote-retraite"],
    ],
  },
  {
    path: "/guide/verifier-releve-de-carriere-retraite",
    title: "Relevé de carrière : comment le vérifier et corriger les erreurs",
    description:
      "Trimestres oubliés, employeurs disparus, périodes à l'étranger : où trouver son relevé de carrière, quelles anomalies y chercher, et comment les faire rectifier sur justificatifs — gratuitement.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Vérifier son relevé de carrière", "/guide/verifier-releve-de-carriere-retraite"],
    ],
  },
  {
    path: "/guide/gestion-pilotee-ou-gestion-libre",
    title: "Gestion pilotée ou gestion libre : que choisir pour son épargne retraite ?",
    description:
      "Sur un PER ou une assurance-vie, déléguer les choix d'investissement ou les garder en main : le comparatif entre gestion pilotée et gestion libre, coûts et rigidité compris.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Gestion pilotée ou libre", "/guide/gestion-pilotee-ou-gestion-libre"],
    ],
  },
  {
    path: "/guide/conseiller-ou-gerer-seul-sa-retraite",
    title: "Faut-il un conseiller en gestion de patrimoine, ou peut-on tout gérer seul ?",
    description:
      "Ouvrir ses enveloppes seul sur un courtier en ligne ou se faire accompagner par un professionnel : ce que l'accompagnement change réellement, et comment trancher selon votre situation.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Conseiller ou gérer seul", "/guide/conseiller-ou-gerer-seul-sa-retraite"],
    ],
  },
  {
    path: "/guide/assurance-vie-luxembourgeoise",
    title: "Assurance-vie luxembourgeoise : pour qui, et quels avantages réels ?",
    description:
      "Triangle de sécurité, neutralité fiscale, multidevises : ce que l'assurance-vie luxembourgeoise apporte réellement par rapport à un contrat français, et pour quels patrimoines cela change la donne.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["L'assurance-vie luxembourgeoise", "/guide/assurance-vie-luxembourgeoise"],
    ],
  },
  {
    path: "/guide/donation-ou-assurance-vie-transmission",
    title: "Donation ou assurance-vie : comment transmettre à ses enfants ?",
    description:
      "Abattement de 100 000 € par parent et par enfant tous les 15 ans, ou clause bénéficiaire d'assurance-vie hors succession : deux logiques de transmission comparées, souvent complémentaires.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Donation ou assurance-vie", "/guide/donation-ou-assurance-vie-transmission"],
    ],
  },
  {
    path: "/guide/retraite-fonctionnaires-completer",
    title: "Retraite des fonctionnaires : spécificités et comment la compléter",
    description:
      "Calcul sur les six derniers mois de traitement, RAFP, catégorie active : ce qui distingue la retraite des fonctionnaires du régime général, et les enveloppes pour compléter une pension souvent inférieure aux attentes.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["La retraite des fonctionnaires", "/guide/retraite-fonctionnaires-completer"],
    ],
  },
  {
    path: "/guide/plafond-per-versement-avant-31-decembre-2026",
    title: "Plafond PER 2026 : verser avant le 31 décembre",
    description:
      "Date limite, plafond de déduction (4 710 € à 37 680 €), ligne à lire sur l'avis d'impôt et reports sur 3 ou 5 ans : le PER en fin d'année 2026.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Plafond PER 2026", "/guide/plafond-per-versement-avant-31-decembre-2026"],
    ],
  },
  {
    path: "/guide/retraite-complementaire-agirc-arrco-cadres-calcul",
    title: "Retraite Agirc-Arrco des cadres : le calcul en 2026",
    description:
      "Salaire, points, pension : le calcul de la retraite complémentaire Agirc-Arrco d'un cadre, avec la valeur du point (1,4587 €) et les paramètres 2026.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Agirc-Arrco des cadres", "/guide/retraite-complementaire-agirc-arrco-cadres-calcul"],
    ],
  },
  {
    path: "/guide/rachat-partiel-assurance-vie-imposition",
    title: "Rachat partiel d'assurance-vie : quelle imposition ?",
    description:
      "Part de gains, taux avant et après 8 ans, abattement de 4 600 € ou 9 200 €, prélèvements sociaux de 17,2 % : le calcul et trois exemples chiffrés.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Rachat partiel d'assurance-vie", "/guide/rachat-partiel-assurance-vie-imposition"],
    ],
  },
  {
    path: "/guide/retraite-progressive-ou-cumul-emploi-retraite",
    title: "Retraite progressive ou cumul emploi-retraite ?",
    description:
      "Âge, trimestres, pension versée, droits, employeur : retraite progressive (dès 60 ans) et cumul emploi-retraite comparés, avec les règles 2026 et 2027.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Retraite progressive ou cumul", "/guide/retraite-progressive-ou-cumul-emploi-retraite"],
    ],
  },
  {
    path: "/guide/combien-retirer-par-mois-capital-retraite",
    title: "Combien retirer par mois d'un capital retraite ?",
    description:
      "Règle des 4 %, taux de retrait, risque de séquence : combien retirer chaque mois d'un capital sans l'épuiser, avec des exemples chiffrés.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Combien retirer par mois d'un capital", "/guide/combien-retirer-par-mois-capital-retraite"],
    ],
  },
  {
    path: "/guide/capital-necessaire-completer-pension-retraite-65-ans",
    title: "Retraite à 65 ans : quel capital pour compléter sa pension ?",
    description:
      "Écart entre revenu visé et pension, capital nécessaire selon trois méthodes (rente, règle des 4 %, retraits sur 25 ans) : exemple chiffré.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Capital pour compléter sa pension", "/guide/capital-necessaire-completer-pension-retraite-65-ans"],
    ],
  },
  {
    path: "/guide/rente-viagere-calcul-montant-taux-de-conversion",
    title: "Rente viagère : calcul du montant et taux de conversion",
    description:
      "Comment un capital devient une rente : taux de conversion, âge, options de réversion, érosion par l'inflation et exemple chiffré.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Rente viagère : calcul du montant", "/guide/rente-viagere-calcul-montant-taux-de-conversion"],
    ],
  },
  {
    path: "/guide/fiscalite-rente-viagere-titre-onereux",
    title: "Fiscalité de la rente viagère à titre onéreux",
    description:
      "Fraction imposable selon l'âge (70 %, 50 %, 40 %, 30 %), prélèvements sociaux, revenu fiscal de référence : le calcul et un exemple chiffré.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Fiscalité de la rente viagère", "/guide/fiscalite-rente-viagere-titre-onereux"],
    ],
  },
  {
    path: "/guide/rachats-programmes-assurance-vie-retraite",
    title: "Rachats programmés d'assurance-vie : un revenu régulier",
    description:
      "Mettre en place des rachats programmés d'assurance-vie à la retraite : fréquence, montant, supports vendus, fiscalité et exemple chiffré.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Rachats programmés d'assurance-vie", "/guide/rachats-programmes-assurance-vie-retraite"],
    ],
  },
  {
    path: "/guide/a-quel-age-recuperer-son-capital-retraite",
    title: "À quel âge récupérer son capital retraite (PER, AV, PEA) ?",
    description:
      "PER, assurance-vie, PEA : à quel moment et comment récupérer son capital, avec le calendrier de chaque enveloppe et les démarches.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["À quel âge récupérer son capital", "/guide/a-quel-age-recuperer-son-capital-retraite"],
    ],
  },
  {
    path: "/guide/per-ou-assurance-vie-selon-age-et-tmi",
    title: "PER ou assurance-vie : le choix selon l'âge et la TMI",
    description:
      "Selon votre âge et votre tranche d'imposition, quel versement vaut quoi ? Économie d'impôt à l'entrée et fiscalité à la sortie, calculées.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["PER ou assurance-vie selon l'âge et la TMI", "/guide/per-ou-assurance-vie-selon-age-et-tmi"],
    ],
  },
  {
    path: "/guide/combien-epargner-par-mois-pour-la-retraite-selon-age",
    title: "Combien épargner par mois pour sa retraite selon l'âge ?",
    description:
      "Épargne mensuelle à 30, 40 et 50 ans pour viser un complément de 500 à 1 500 € par mois à la retraite : tableau, méthode et hypothèses.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Épargne mensuelle selon l'âge", "/guide/combien-epargner-par-mois-pour-la-retraite-selon-age"],
    ],
  },
  {
    path: "/guide/pea-en-ligne-comment-choisir-pour-la-retraite",
    title: "PEA en ligne : comment choisir et l'utiliser pour la retraite",
    description:
      "PEA en ligne : critères de choix, frais, ouverture, place du PEA dans la préparation de la retraite. Sans conseil personnalisé.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["PEA en ligne pour la retraite", "/guide/pea-en-ligne-comment-choisir-pour-la-retraite"],
    ],
  },
  {
    path: "/guide/assurance-vie-apres-8-ans-fiscalite-et-rente",
    title: "Assurance-vie après 8 ans : fiscalité, abattement et rente",
    description:
      "Après 8 ans : taux de 7,5 %, abattement de 4 600 € ou 9 200 €, prélèvements sociaux, et fiscalité de la rente viagère, avec exemples chiffrés.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Assurance-vie après 8 ans et rente", "/guide/assurance-vie-apres-8-ans-fiscalite-et-rente"],
    ],
  },
  {
    path: "/guide/capital-retraite-objectif-et-construction",
    title: "Capital retraite : quel objectif viser et comment le construire",
    description:
      "Quel capital pour compléter vos pensions ? Grille capital → revenu mensuel, règle des 4 %, et construction avec PER, assurance-vie et PEA.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Capital retraite : objectif et construction", "/guide/capital-retraite-objectif-et-construction"],
    ],
  },
  {
    path: "/guide/scpi-preparer-sa-retraite",
    title: "SCPI et retraite : revenus, frais, risques de liquidité",
    description:
      "Taux de distribution, frais, parts en attente de retrait, risques : ce que l'on peut attendre d'une SCPI pour compléter ses revenus de retraite, chiffres de marché 2025 et 2026.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["SCPI et retraite", "/guide/scpi-preparer-sa-retraite"],
    ],
  },
  {
    path: "/guide/scpi-a-credit-ou-comptant",
    title: "SCPI à crédit ou au comptant : le calcul et les risques",
    description:
      "Mensualité, intérêts déductibles, effort d'épargne réel, scénario de baisse du prix de part : comparer l'achat de SCPI à crédit et comptant avec un exemple chiffré.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["SCPI à crédit ou comptant", "/guide/scpi-a-credit-ou-comptant"],
    ],
  },
  {
    path: "/guide/scpi-assurance-vie-ou-per",
    title: "SCPI en direct, en assurance-vie ou dans un PER ?",
    description:
      "Fiscalité, frais du contrat, liquidité, transmission : ce qui change quand on détient des SCPI en direct, en unités de compte d'assurance-vie ou via un PER.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["SCPI en direct, assurance-vie ou PER", "/guide/scpi-assurance-vie-ou-per"],
    ],
  },
  {
    path: "/guide/scpi-fiscalite-revenus-plus-values",
    title: "Fiscalité des SCPI : revenus fonciers, étrangers, plus-values, IFI",
    description:
      "Revenus fonciers, revenus de source étrangère, plus-value à la revente, IFI : ce qui se déclare quand on détient des SCPI en direct, avec un exemple chiffré.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Fiscalité des SCPI", "/guide/scpi-fiscalite-revenus-plus-values"],
    ],
  },
  {
    path: "/guide/lmnp-residence-geree-retraite",
    title: "LMNP en résidence gérée : senior, EHPAD, étudiante",
    description:
      "Bail commercial, loyers, fiscalité, questions à poser à l'exploitant : ce que vaut un LMNP en résidence gérée comme revenu de retraite, scénario de baisse de loyer chiffré.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["LMNP en résidence gérée", "/guide/lmnp-residence-geree-retraite"],
    ],
  },
  {
    path: "/guide/lmnp-reforme-amortissement-plus-value",
    title: "LMNP : amortissement et plus-value à la revente",
    description:
      "Réintégration des amortissements dans la plus-value depuis 2025, exceptions, exemple chiffré avant et après, et débat en cours sur l'amortissement en meublé.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["LMNP : amortissement et plus-value", "/guide/lmnp-reforme-amortissement-plus-value"],
    ],
  },
  {
    path: "/guide/demembrement-nue-propriete-retraite",
    title: "Démembrement et nue-propriété pour préparer sa retraite",
    description:
      "Barème de l'article 669, usufruit temporaire, nue-propriété de SCPI, donation avec réserve d'usufruit : le démembrement expliqué avec un exemple chiffré.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Démembrement et nue-propriété", "/guide/demembrement-nue-propriete-retraite"],
    ],
  },
  {
    path: "/guide/immobilier-a-la-retraite-revenus-transmission",
    title: "Immobilier à la retraite : revenus, vente et transmission",
    description:
      "Loyers et CSG des pensions, plus-value à la vente, viager, donation : que faire de son immobilier une fois à la retraite, avec un exemple chiffré.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Immobilier à la retraite", "/guide/immobilier-a-la-retraite-revenus-transmission"],
    ],
  },
  {
    path: "/guide/estimer-sa-pension-retraite-taux-de-remplacement",
    title: "Estimer sa pension de retraite et son taux de remplacement",
    description:
      "Calculer sa pension : retraite de base, points Agirc-Arrco, taux de remplacement cadre et non-cadre, puis estimation officielle sur info-retraite.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Estimer sa pension", "/guide/estimer-sa-pension-retraite-taux-de-remplacement"],
    ],
  },
  {
    path: "/guide/age-de-depart-retraite-trimestres-duree-assurance",
    title: "Âge de départ retraite, trimestres et durée d'assurance",
    description:
      "Âge légal par génération, 172 trimestres, taux plein à 67 ans : trimestres cotisés, assimilés et majorations enfants, expliqués simplement.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Âge de départ et trimestres", "/guide/age-de-depart-retraite-trimestres-duree-assurance"],
    ],
  },
  {
    path: "/guide/preparer-sa-retraite-a-40-ans",
    title: "Préparer sa retraite à 40 ans : le plan d'action",
    description:
      "Relevé de carrière, objectif de revenu, effort d'épargne, PER, PEA, assurance-vie : le plan en six étapes pour préparer sa retraite à 40 ans.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Préparer sa retraite à 40 ans", "/guide/preparer-sa-retraite-a-40-ans"],
    ],
  },
  {
    path: "/guide/preparer-sa-retraite-a-50-ans",
    title: "Préparer sa retraite à 50 ans : rattraper et sécuriser",
    description:
      "À 50 ans, il reste 10 à 15 ans : bilan des trimestres, rattrapage, prudence progressive et anticipation de la décumulation. Repères et limites.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Préparer sa retraite à 50 ans", "/guide/preparer-sa-retraite-a-50-ans"],
    ],
  },
  {
    path: "/guide/assurance-vie-fonds-euros-ou-uc-a-55-ans",
    title: "Assurance-vie à 55 ans : fonds euros ou UC ?",
    description:
      "Garantie du capital, risque de perte, horizon de 30 ans, gestion pilotée, frais, fiscalité : raisonner par poche d'épargne avant la retraite.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Assurance-vie à 55 ans : fonds euros ou UC", "/guide/assurance-vie-fonds-euros-ou-uc-a-55-ans"],
    ],
  },
  {
    path: "/guide/completer-sa-retraite-sans-per",
    title: "Compléter sa retraite sans PER : les alternatives",
    description:
      "AV, PEA, CTO, immobilier, épargne salariale, cumul, surcote : comparer liquidité, fiscalité de sortie et succession, sans écarter le PER.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Compléter sa retraite sans PER", "/guide/completer-sa-retraite-sans-per"],
    ],
  },
  {
    path: "/guide/epargne-retraite-en-couple-et-transmission",
    title: "Épargne retraite en couple et transmission : guide",
    description:
      "Deux retraites, deux TMI : répartir PER et assurance-vie entre conjoints, clause bénéficiaire, réversion et donation. Repères et limites, cas par cas.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Épargne retraite en couple", "/guide/epargne-retraite-en-couple-et-transmission"],
    ],
  },
  {
    path: "/guide/retraite-cadre-ou-fonctionnaire-comparaison",
    title: "Retraite de cadre ou de fonctionnaire : le calcul comparé",
    description:
      "Points Agirc-Arrco ou pension sur 6 mois de traitement indiciaire ? Formules, taux de remplacement illustré et impact sur l'épargne complémentaire.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Cadre ou fonctionnaire : le calcul comparé", "/guide/retraite-cadre-ou-fonctionnaire-comparaison"],
    ],
  },
  {
    path: "/guide/preparer-sa-retraite-guide-complet",
    title: "Préparer sa retraite : le guide complet",
    description:
      "Droits, estimation, objectif, enveloppes, épargne, décaissement, transmission : les 7 étapes pour préparer sa retraite, avec tous nos guides.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Préparer sa retraite : le guide complet", "/guide/preparer-sa-retraite-guide-complet"],
    ],
  },
  {
    path: "/guide/immobilier-et-retraite-guide-complet",
    title: "Immobilier et retraite : le guide complet",
    description:
      "Location directe, LMNP, SCPI, démembrement, crédit, fiscalité, risques, revenus à la retraite : la carte complète pour investir en immobilier.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Immobilier et retraite : le guide complet", "/guide/immobilier-et-retraite-guide-complet"],
    ],
  },
  {
    path: "/guide/ouvrir-un-per-etapes-documents-delais",
    title: "Ouvrir un PER : étapes, documents, délais, frais",
    description:
      "Ouvrir un PER en ligne, à 60 ans ou à la retraite : conditions, pièces à fournir, délais, frais d'entrée, PER assurantiel ou compte-titres.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Ouvrir un PER", "/guide/ouvrir-un-per-etapes-documents-delais"],
    ],
  },
  {
    path: "/guide/transferer-son-per-frais-demarche",
    title: "Transférer son PER : frais, délais, démarche",
    description:
      "Transférer un PER ou un PERP, Madelin, article 83, PERCO vers un PER : démarche, frais plafonnés, délais, ce qui est conservé ou perdu.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Transférer son PER", "/guide/transferer-son-per-frais-demarche"],
    ],
  },
  {
    path: "/guide/declarer-versements-per-impots-case-6ns",
    title: "Déclarer ses versements PER aux impôts (case 6NS)",
    description:
      "Où déclarer ses versements PER, lire son plafond sur l'avis d'impôt, versements d'employeur, non-déduction, pièces à conserver.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Déclarer ses versements PER", "/guide/declarer-versements-per-impots-case-6ns"],
    ],
  },
  {
    path: "/guide/liquider-son-per-a-la-retraite-demarche",
    title: "Liquider son PER à la retraite : démarche",
    description:
      "Liquider son PER : demande, documents, capital, rente, mixte ou fractionné, fiscalité selon les versements, délais et pièges.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Liquider son PER", "/guide/liquider-son-per-a-la-retraite-demarche"],
    ],
  },
  {
    path: "/guide/comment-ouvrir-une-assurance-vie-etapes",
    title: "Comment ouvrir une assurance-vie : étapes, documents, frais",
    description:
      "Conditions, documents, versement minimum, frais à comparer, clause bénéficiaire et renonciation de 30 jours : la démarche pas à pas.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Ouvrir une assurance-vie", "/guide/comment-ouvrir-une-assurance-vie-etapes"],
    ],
  },
  {
    path: "/guide/transferer-assurance-vie-sans-perdre-anteriorite",
    title: "Transférer son assurance-vie sans perdre l'antériorité ?",
    description:
      "Changer d'assureur fait perdre l'antériorité fiscale : ce qui reste possible chez le même assureur, alternatives et coût chiffré.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Transférer son assurance-vie", "/guide/transferer-assurance-vie-sans-perdre-anteriorite"],
    ],
  },
  {
    path: "/guide/clause-beneficiaire-assurance-vie-comment-la-rediger",
    title: "Clause bénéficiaire d'assurance-vie : comment la rédiger",
    description:
      "Clause standard, nominative ou démembrée, ordre, mineur, acceptation et fiscalité 990 I / 757 B : comment rédiger la vôtre.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Clause bénéficiaire", "/guide/clause-beneficiaire-assurance-vie-comment-la-rediger"],
    ],
  },
  {
    path: "/guide/assurance-vie-garantie-repartir-plusieurs-contrats",
    title: "Assurance-vie : garantie et répartition entre contrats",
    description:
      "Garantie des assurances de personnes (FGAP), différence avec la garantie des dépôts, exemple de 100 000 € à répartir.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Garantie et répartition entre contrats", "/guide/assurance-vie-garantie-repartir-plusieurs-contrats"],
    ],
  },
  {
    path: "/guide/assurance-vie-a-60-ans-ou-a-la-retraite",
    title: "Assurance-vie à 60 ans ou à la retraite : ouvrir ou garder ?",
    description:
      "Ouvrir, garder, racheter ou alimenter une assurance-vie à 60 ans : horizon, fiscalité avant et après 8 ans, transmission, frais et démarche.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Assurance-vie à 60 ans", "/guide/assurance-vie-a-60-ans-ou-a-la-retraite"],
    ],
  },
  {
    path: "/guide/assurance-vie-apres-70-ans-fiscalite-succession",
    title: "Assurance-vie après 70 ans : fiscalité et succession (757 B)",
    description:
      "Primes versées après 70 ans : abattement global de 30 500 €, intérêts exonérés, clause bénéficiaire, déclaration et exemple chiffré.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Assurance-vie après 70 ans", "/guide/assurance-vie-apres-70-ans-fiscalite-succession"],
    ],
  },
  {
    path: "/guide/declarer-rachat-assurance-vie-sortie-per",
    title: "Déclarer un rachat d'assurance-vie ou une sortie de PER",
    description:
      "IFU, acompte, option pour le barème, cases de report, pièces à conserver : déclarer un rachat d'assurance-vie ou une sortie de PER, avec exemples.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Déclarer un rachat ou une sortie de PER", "/guide/declarer-rachat-assurance-vie-sortie-per"],
    ],
  },
  {
    path: "/guide/investir-100000-euros-pour-la-retraite",
    title: "Investir 100 000 € pour la retraite : démarche selon l'âge",
    description:
      "Fonds de sécurité, horizon, TMI, répartition PER, assurance-vie, PEA et immobilier : méthode en 7 étapes et 3 profils chiffrés, sans promesse.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Investir 100 000 € pour la retraite", "/guide/investir-100000-euros-pour-la-retraite"],
    ],
  },
  {
    path: "/guide/transferer-son-pea-procedure-frais",
    title: "Transférer son PEA : procédure, délais et frais à comparer",
    description:
      "Transférer son PEA sans le clôturer ni perdre son ancienneté : étapes, documents, frais de transfert plafonnés et calcul pour savoir si ça vaut le coup.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Transférer son PEA", "/guide/transferer-son-pea-procedure-frais"],
    ],
  },
  {
    path: "/guide/sortir-du-pea-a-la-retraite-retrait-rente",
    title: "Sortir du PEA à la retraite : retraits, rente et fiscalité",
    description:
      "Retraits partiels après 5 ans sans clôture, rente viagère, retrait avant 5 ans : procédure, fiscalité et deux cas chiffrés pour le PEA.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Sortir du PEA à la retraite", "/guide/sortir-du-pea-a-la-retraite-retrait-rente"],
    ],
  },
  {
    path: "/guide/scpi-ou-lmnp-pour-completer-sa-retraite",
    title: "SCPI ou LMNP pour compléter sa retraite : comment choisir ?",
    description:
      "Gestion, ticket, liquidité, fiscalité et risques : comparatif décisionnel SCPI ou LMNP en résidence gérée, avec un exemple chiffré sans promesse.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["SCPI ou LMNP", "/guide/scpi-ou-lmnp-pour-completer-sa-retraite"],
    ],
  },
  {
    path: "/guide/comment-choisir-une-scpi-checklist",
    title: "Comment choisir une SCPI : la check-list avant de souscrire",
    description:
      "Pas de meilleure SCPI, mais une méthode : DIC, SRI, taux de distribution et TOF, frais, endettement, liquidité. Check-list et exemple chiffré.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Choisir une SCPI", "/guide/comment-choisir-une-scpi-checklist"],
    ],
  },
  {
    path: "/guide/revenus-locatifs-et-retraite-cumul-impots-cotisations",
    title: "Revenus locatifs et retraite : cumul, impôts, cotisations",
    description:
      "Peut-on cumuler pension et loyers ? Impôts, prélèvements sociaux, effet sur le revenu fiscal de référence : un cas chiffré.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Revenus locatifs et retraite", "/guide/revenus-locatifs-et-retraite-cumul-impots-cotisations"],
    ],
  },
  {
    path: "/guide/demande-de-retraite-demarches-calendrier",
    title: "Demande de retraite : démarches et calendrier mois par mois",
    description:
      "Quand déposer sa demande de retraite, quels documents, date d'effet et premier versement : le calendrier mois par mois avant le départ.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Demande de retraite", "/guide/demande-de-retraite-demarches-calendrier"],
    ],
  },
  {
    path: "/guide/retraite-anticipee-carriere-longue-conditions",
    title: "Retraite anticipée carrière longue : conditions et démarche",
    description:
      "Début d'activité, trimestres cotisés, attestation, pièges : les conditions de la retraite anticipée pour carrière longue, et son effet sur l'épargne.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Carrière longue", "/guide/retraite-anticipee-carriere-longue-conditions"],
    ],
  },
  {
    path: "/guide/pension-de-reversion-conditions-demarche",
    title: "Pension de réversion : conditions, plafond et démarche",
    description:
      "Qui y a droit, quel taux, quel plafond de ressources, quels documents : la pension de réversion expliquée, avec un exemple chiffré.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Pension de réversion", "/guide/pension-de-reversion-conditions-demarche"],
    ],
  },
  {
    path: "/contact",
    title: "Contact — Parlons de votre retraite | Capital Retraite",
    description:
      "Un entretien de 15 minutes pour faire le point sur votre retraite — sans engagement, sans jargon. Prenez rendez-vous ou écrivez-nous.",
    breadcrumb: [["Accueil", "/"], ["Contact", "/contact"]],
  },
  {
    path: "/mentions-legales",
    title: "Mentions légales — Capital Retraite",
    description:
      "Mentions légales du site capitalretraite.com, édité par EXP Capital, SASU au capital de 1 000 €, RCS Versailles 987 986 247, ORIAS n° 25005915.",
    breadcrumb: [["Accueil", "/"], ["Mentions légales", "/mentions-legales"]],
  },
  {
    path: "/confidentialite",
    title: "Politique de confidentialité — Capital Retraite",
    description:
      "Comment capitalretraite.com collecte, utilise et protège vos données personnelles. Vos droits RGPD et nos engagements de confidentialité.",
    breadcrumb: [["Accueil", "/"], ["Confidentialité", "/confidentialite"]],
  },
];

export function getMeta(pathname) {
  return routesMeta.find((r) => r.path === pathname) || routesMeta[0];
}
