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
    title: "Combien faut-il vraiment épargner pour la retraite ?",
    description:
      "Taux de remplacement, niveau de vie cible, ordres de grandeur honnêtes selon votre situation : une réponse structurée à la question retraite n°1 — sans chiffre magique.",
    breadcrumb: [
      ["Accueil", "/"],
      ["Guides", "/guides"],
      ["Combien épargner pour la retraite", "/guide/combien-faut-il-epargner-pour-la-retraite"],
    ],
  },
  {
    path: "/guide/per-vs-assurance-vie-retraite",
    title: "PER ou assurance-vie pour la retraite : le vrai comparatif",
    description:
      "Fiscalité à l'entrée vs à la sortie, liquidité, succession, cas d'usage : le comparatif structuré PER / assurance-vie pour préparer sa retraite, sans réponse toute faite.",
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
    title: "PEA : banque ou courtier en ligne ? Frais, fonds maison et vraie diversification",
    description:
      "Droits de garde, frais de courtage, fonds actions maison à 2 % : le même PEA peut coûter dix fois plus cher selon l'établissement. Le comparatif pour choisir — ou transférer.",
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
    title: "Quelle est la meilleure assurance-vie pour la retraite ? Le comparatif par profil",
    description:
      "Contrat bancaire, courtier en ligne, gestion conseillée par un CGP : la meilleure assurance-vie n'est pas un nom, c'est un profil. La grille pour choisir selon que vous voulez tout faire seul ou être accompagné.",
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
