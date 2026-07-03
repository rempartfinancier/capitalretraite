// Source de vérité unique : routes, métadonnées SEO, fils d'Ariane.
// Utilisée par l'app (client + SSR) ET par scripts/prerender.mjs.

export const SITE_URL = "https://capitalretraite.fr";

export const routesMeta = [
  {
    path: "/",
    title: "Capital Retraite — Construisez votre capital retraite avec méthode",
    description:
      "Conseil retraite indépendant pour cadres et fonctionnaires de 45 à 60 ans : PER, assurance-vie, PEA, décumulation, immobilier. Bilan retraite gratuit en 15 minutes.",
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
    path: "/strategies",
    title: "5 stratégies pour construire votre capital retraite",
    description:
      "PER, assurance-vie, PEA, décumulation, immobilier : cinq stratégies retraite expliquées sans jargon. Le bon choix dépend de votre âge, de votre TMI et de votre horizon.",
    breadcrumb: [["Accueil", "/"], ["Stratégies", "/strategies"]],
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
      ["Guides", "/strategies"],
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
      ["Guides", "/strategies"],
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
      ["Guides", "/strategies"],
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
      ["Guides", "/strategies"],
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
      ["Guides", "/strategies"],
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
      ["Guides", "/strategies"],
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
      ["Guides", "/strategies"],
      ["PEA : banque ou courtier", "/guide/pea-banque-ou-courtier"],
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
      "Mentions légales du site capitalretraite.fr, édité par EXP Capital (ORIAS 25005915), conseil en investissement financier sous Épargne Plurielle (ORIAS 16003696).",
    breadcrumb: [["Accueil", "/"], ["Mentions légales", "/mentions-legales"]],
  },
  {
    path: "/confidentialite",
    title: "Politique de confidentialité — Capital Retraite",
    description:
      "Comment capitalretraite.fr collecte, utilise et protège vos données personnelles. Vos droits RGPD et nos engagements de confidentialité.",
    breadcrumb: [["Accueil", "/"], ["Confidentialité", "/confidentialite"]],
  },
];

export function getMeta(pathname) {
  return routesMeta.find((r) => r.path === pathname) || routesMeta[0];
}
