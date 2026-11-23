import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CtaBanner } from "../components/Layout.jsx";

// Chaque guide n'apparaît qu'une fois, classé dans sa catégorie la plus utile
// pour un visiteur qui découvre le site. Nouveau guide → ajouter une ligne ici.
const categories = [
  {
    id: "vue-ensemble",
    name: "Vue d'ensemble",
    items: [
      {
        to: "/guide/meilleure-enveloppe-retraite",
        title: "Quelle est la meilleure enveloppe pour préparer sa retraite ?",
        text: "Notre classement par objectif — consommer, transmettre, garder la main — plutôt qu'un vainqueur unique.",
      },
      {
        to: "/guide/combien-faut-il-epargner-pour-la-retraite",
        title: "Combien faut-il vraiment épargner pour la retraite ?",
        text: "Taux de remplacement, niveau de vie cible : une réponse structurée, sans chiffre magique.",
      },
      {
        to: "/guide/combien-coute-un-conseiller-en-gestion-de-patrimoine",
        title: "Combien coûte un conseiller en gestion de patrimoine ?",
        text: "Rétrocessions, honoraires, conflits d'intérêts : la question que la profession esquive.",
      },
      {
        to: "/guide/conseiller-ou-gerer-seul-sa-retraite",
        title: "Faut-il un conseiller en gestion de patrimoine, ou peut-on tout gérer seul ?",
        text: "Ce qu'on peut vraiment faire seul aujourd'hui, et ce qui devient difficile sans accompagnement.",
      },
    ],
  },
  {
    id: "comparatifs",
    name: "Comparatifs entre enveloppes",
    items: [
      {
        to: "/guide/per-vs-assurance-vie-retraite",
        title: "PER ou assurance-vie pour la retraite : le vrai comparatif",
        text: "Fiscalité à l'entrée vs à la sortie, liquidité, succession : sans réponse toute faite.",
      },
      {
        to: "/guide/pea-ou-per-pour-la-retraite",
        title: "PEA ou PER pour préparer sa retraite ?",
        text: "Deux enveloppes que tout oppose : consommer de son vivant, ou transmettre.",
      },
      {
        to: "/guide/pea-ou-assurance-vie",
        title: "PEA ou assurance-vie : lequel choisir pour la retraite ?",
        text: "La machine à capitaliser en actions contre le couteau suisse patrimonial.",
      },
      {
        to: "/guide/etf-ou-fonds-actifs",
        title: "ETF ou fonds de gestion active : le vrai match",
        text: "Le débat sans caricature — ni culte de l'indiciel, ni défense corporatiste des fonds chargés.",
      },
      {
        to: "/guide/immobilier-locatif-ou-assurance-vie",
        title: "Immobilier locatif ou assurance-vie pour préparer sa retraite ?",
        text: "Effet de levier du crédit contre polyvalence fiscale : deux logiques de constitution de capital.",
      },
      {
        to: "/guide/per-ou-immobilier-locatif",
        title: "PER ou immobilier locatif : lequel privilégier pour transmettre ?",
        text: "Deux façons de protéger sa famille — l'abattement successoral du PER face au démembrement immobilier.",
      },
      {
        to: "/guide/gestion-pilotee-ou-gestion-libre",
        title: "Gestion pilotée ou gestion libre : que choisir ?",
        text: "Sur un PER ou une assurance-vie, déléguer les choix d'investissement ou les garder en main.",
      },
      {
        to: "/guide/donation-ou-assurance-vie-transmission",
        title: "Donation ou assurance-vie : comment transmettre à ses enfants ?",
        text: "Deux logiques de transmission différentes, souvent complémentaires plutôt que concurrentes.",
      },
    ],
  },
  {
    id: "per",
    name: "PER",
    items: [
      {
        to: "/guide/faut-il-ouvrir-un-per",
        title: "Faut-il ouvrir un PER ? Les cas où la réponse est non",
        text: "Le PER n'est pas la solution magique pour la retraite — voici quand l'ouvrir est une erreur.",
      },
      {
        to: "/guide/per-bancaire-frais-gestion-horizon",
        title: "PER bancaire : frais, gestion à horizon, supports maison",
        text: "Ce qu'il faut vérifier sur votre PER actuel avant de le juger.",
      },
      {
        to: "/guide/combien-coute-un-per",
        title: "Combien coûte un PER, vraiment ?",
        text: "La grille des frais poste par poste, du versement à la sortie.",
      },
      {
        to: "/guide/plafond-per-versement-avant-31-decembre-2026",
        title: "Plafond PER 2026 : jusqu'à quand verser, et combien déduire ?",
        text: "Date limite du 31 décembre, plancher et plafond, ligne à lire sur l'avis d'impôt, reports sur 3 ou 5 ans.",
      },
      {
        to: "/guide/quel-est-le-meilleur-per",
        title: "Quel est le meilleur PER ?",
        text: "Pourquoi nous ne publions pas de classement — et la grille pour juger n'importe quel contrat.",
      },
      {
        to: "/guide/fiscalite-sortie-per",
        title: "Fiscalité de sortie du PER : capital ou rente ?",
        text: "Impôt sur le revenu, prélèvements sociaux, fractionnement : un sujet technique rendu lisible.",
      },
      {
        to: "/guide/deblocage-anticipe-per",
        title: "Déblocage anticipé du PER : les 6 cas et leur fiscalité",
        text: "Accidents de la vie ou achat de la résidence principale : deux régimes fiscaux très différents, et deux pièges coûteux.",
      },
      {
        to: "/guide/a-quel-age-commencer-per",
        title: "À quel âge ouvrir un PER ?",
        text: "Le plus tôt possible — mais pas pour tout le monde. Pourquoi il n'est pas trop tard à 50 ans.",
      },
    ],
  },
  {
    id: "assurance-vie",
    name: "Assurance-vie",
    items: [
      {
        to: "/guide/pourquoi-votre-assurance-vie-rapporte-peu",
        title: "Pourquoi votre assurance-vie rapporte si peu",
        text: "Fonds euros, frais, gestion pilotée : les mécanismes qui rognent le rendement — et comment auditer le vôtre.",
      },
      {
        to: "/guide/risques-assurance-vie",
        title: "Les risques réels de l'assurance-vie",
        text: "Créance sur l'assureur, loi Sapin 2, unités de compte : sans tabou ni catastrophisme.",
      },
      {
        to: "/guide/combien-coute-une-assurance-vie",
        title: "Combien coûte une assurance-vie ?",
        text: "La grille poste par poste : entrée, gestion, supports, arbitrage, gestion pilotée.",
      },
      {
        to: "/guide/meilleure-assurance-vie-retraite",
        title: "Quelle est la meilleure assurance-vie pour la retraite ?",
        text: "Le comparatif par profil : tout faire seul, ou être accompagné.",
      },
      {
        to: "/guide/assurance-vie-luxembourgeoise",
        title: "Assurance-vie luxembourgeoise : pour qui ?",
        text: "Triangle de sécurité, neutralité fiscale : ce que ça change vraiment, et pour quels patrimoines.",
      },
    ],
  },
  {
    id: "pea",
    name: "PEA",
    items: [
      {
        to: "/guide/pea-banque-ou-courtier",
        title: "PEA : banque ou courtier en ligne ?",
        text: "Le même PEA peut coûter plusieurs fois plus cher selon l'établissement.",
      },
      {
        to: "/guide/inconvenients-du-pea",
        title: "Les inconvénients du PEA",
        text: "Plafond, rigidité, succession : pourquoi il reste central dans une stratégie retraite malgré tout.",
      },
    ],
  },
  {
    id: "immobilier",
    name: "Immobilier",
    items: [
      {
        to: "/guide/lmnp-risques",
        title: "LMNP : les risques que l'on vous cache",
        text: "Amortissement, réforme fiscale, dépendance à l'exploitant : au-delà de l'argument de vente.",
      },
      {
        to: "/guide/lmnp-ou-locatif-nu",
        title: "LMNP ou locatif nu : lequel choisir pour la retraite ?",
        text: "Deux régimes fiscaux, deux niveaux de gestion — le comparatif sans jargon.",
      },
      {
        to: "/guide/combien-coute-un-investissement-locatif",
        title: "Combien coûte réellement un investissement locatif ?",
        text: "Notaire, gestion, vacance, fiscalité : le rendement brut n'est jamais le rendement net.",
      },
      {
        to: "/guide/cinq-erreurs-investissement-locatif-retraite",
        title: "Les 5 erreurs les plus coûteuses de l'investissement locatif retraite",
        text: "Les fausses boussoles qui plombent un projet immobilier — et comment les éviter.",
      },
      {
        to: "/guide/scpi-preparer-sa-retraite",
        title: "SCPI et retraite : revenus, frais et risques de liquidité",
        text: "Taux de distribution 2025, parts en attente de retrait, huit questions à poser avant de souscrire.",
      },
      {
        to: "/guide/scpi-a-credit-ou-comptant",
        title: "SCPI à crédit ou au comptant : le calcul et les risques",
        text: "Mensualité, intérêts déductibles, effort réel et scénario de baisse du prix de part.",
      },
      {
        to: "/guide/scpi-assurance-vie-ou-per",
        title: "SCPI en direct, en assurance-vie ou dans un PER ?",
        text: "Fiscalité, frais du contrat, liquidité et transmission selon l'enveloppe qui détient les parts.",
      },
      {
        to: "/guide/scpi-fiscalite-revenus-plus-values",
        title: "Fiscalité des SCPI : revenus, plus-values et IFI",
        text: "Revenus fonciers, revenus étrangers, plus-value à la revente : ce qui se déclare, exemple chiffré.",
      },
      {
        to: "/guide/lmnp-residence-geree-retraite",
        title: "LMNP en résidence gérée : senior, EHPAD, étudiante",
        text: "Bail commercial, loyers, exploitant : ce que vaut ce revenu pour la retraite.",
      },
      {
        to: "/guide/lmnp-reforme-amortissement-plus-value",
        title: "LMNP : l'amortissement réintégré dans la plus-value",
        text: "Ce que change la loi de finances 2025 à la revente, exceptions et exemple avant/après.",
      },
      {
        to: "/guide/demembrement-nue-propriete-retraite",
        title: "Démembrement et nue-propriété pour préparer sa retraite",
        text: "Barème de l'usufruit, usufruit temporaire, donation avec réserve d'usufruit.",
      },
      {
        to: "/guide/immobilier-a-la-retraite-revenus-transmission",
        title: "Immobilier à la retraite : revenus, vente et transmission",
        text: "Loyers et CSG des pensions, plus-value, viager, donation : garder, déléguer, vendre ou transmettre.",
      },
    ],
  },
  {
    id: "decumulation",
    name: "Décumulation",
    items: [
      {
        to: "/guide/inconvenients-rente-viagere",
        title: "Rente viagère : les inconvénients qu'on ne vous dit jamais",
        text: "Aliénation définitive du capital, taux figé : ce qu'implique vraiment ce choix irréversible.",
      },
      {
        to: "/guide/rente-viagere-ou-retraits-programmes",
        title: "Rente viagère ou retraits programmés : comment choisir ?",
        text: "Sécurité du revenu à vie contre capital transmissible — simulateur à l'appui.",
      },
      {
        to: "/guide/ordre-de-decaissement-retraite",
        title: "L'ordre de décaissement : l'erreur qui coûte cher à la retraite",
        text: "Par quelle enveloppe commencer quand vient le moment de consommer son capital.",
      },
      {
        to: "/guide/rachat-partiel-assurance-vie-imposition",
        title: "Rachat partiel d'assurance-vie : comment est-il imposé ?",
        text: "Part de gains, avant et après 8 ans, abattement, prélèvements sociaux : la formule et trois cas chiffrés.",
      },
    ],
  },
  {
    id: "mecanique-retraite",
    name: "Comprendre le système de retraite",
    items: [
      {
        to: "/guide/retraite-complementaire-agirc-arrco-cadres-calcul",
        title: "Retraite Agirc-Arrco des cadres : comment est-elle calculée ?",
        text: "Du salaire aux points, des points à la pension : le calcul pas à pas avec les paramètres 2026.",
      },
      {
        to: "/guide/verifier-releve-de-carriere-retraite",
        title: "Relevé de carrière : comment le vérifier et corriger les erreurs",
        text: "Le document qui conditionne tout le reste — et les six périodes où les oublis se concentrent.",
      },
      {
        to: "/guide/combien-coute-rachat-trimestres-retraite",
        title: "Combien coûte le rachat de trimestres pour la retraite ?",
        text: "Ce qui détermine le prix d'un trimestre racheté, et quand l'opération est vraiment rentable.",
      },
      {
        to: "/guide/cumul-emploi-retraite-comment-ca-marche",
        title: "Cumul emploi-retraite : comment ça marche ?",
        text: "Cumul intégral ou plafonné, droits à la retraite : les règles expliquées simplement.",
      },
      {
        to: "/guide/retraite-progressive-ou-cumul-emploi-retraite",
        title: "Retraite progressive ou cumul emploi-retraite : quelle différence ?",
        text: "Âge, trimestres, pension versée, employeur, règles 2027 : le tableau comparatif et un exemple à 60 %.",
      },
      {
        to: "/guide/surcote-decote-retraite",
        title: "Surcote ou décote : comment ça se calcule ?",
        text: "1,25 % par trimestre, dans un sens ou dans l'autre — un mécanisme à anticiper, pas à subir.",
      },
    ],
  },
  {
    id: "profils-specifiques",
    name: "Profils spécifiques",
    items: [
      {
        to: "/guide/retraite-independants-per-ou-madelin",
        title: "Retraite des indépendants : PER ou contrat Madelin ?",
        text: "Ce qui a changé depuis la loi PACTE, et ce qu'il reste des anciens contrats Madelin.",
      },
      {
        to: "/guide/retraite-fonctionnaires-completer",
        title: "Retraite des fonctionnaires : comment la compléter ?",
        text: "Calcul sur les 6 derniers mois, RAFP : ce qui distingue la fonction publique du régime général.",
      },
    ],
  },
];

const CATEGORY_IDS = categories.map((c) => c.id);

// Un article par enveloppe : le meilleur point d'entrée pour un visiteur qui
// découvre le site et n'a pas encore de question précise en tête.
const featured = [
  {
    to: "/guide/meilleure-enveloppe-retraite",
    badge: "Vue d'ensemble",
    title: "Quelle est la meilleure enveloppe pour préparer sa retraite ?",
    text: "Notre classement par objectif — consommer, transmettre, garder la main — plutôt qu'un vainqueur unique.",
  },
  {
    to: "/guide/faut-il-ouvrir-un-per",
    badge: "PER",
    title: "Faut-il ouvrir un PER ? Les cas où la réponse est non",
    text: "Le PER n'est pas la solution magique pour la retraite — voici quand l'ouvrir est une erreur.",
  },
  {
    to: "/guide/pourquoi-votre-assurance-vie-rapporte-peu",
    badge: "Assurance-vie",
    title: "Pourquoi votre assurance-vie rapporte si peu",
    text: "Fonds euros, frais, gestion pilotée : les mécanismes qui rognent le rendement — et comment auditer le vôtre.",
  },
  {
    to: "/guide/pea-banque-ou-courtier",
    badge: "PEA",
    title: "PEA : banque ou courtier en ligne ?",
    text: "Le même PEA peut coûter plusieurs fois plus cher selon l'établissement.",
  },
  {
    to: "/guide/combien-coute-un-investissement-locatif",
    badge: "Immobilier",
    title: "Combien coûte réellement un investissement locatif ?",
    text: "Notaire, gestion, vacance, fiscalité : le rendement brut n'est jamais le rendement net.",
  },
  {
    to: "/guide/ordre-de-decaissement-retraite",
    badge: "Décumulation",
    title: "L'ordre de décaissement : l'erreur qui coûte cher à la retraite",
    text: "Par quelle enveloppe commencer quand vient le moment de consommer son capital.",
  },
];

export default function Guides() {
  const [active, setActive] = useState(CATEGORY_IDS[0]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-140px 0px -70% 0px" }
    );
    const sections = CATEGORY_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Bibliothèque</span>
          <h1>Tous nos guides retraite</h1>
          <p className="sub">
            {categories.reduce((n, c) => n + c.items.length, 0)} guides pratiques, classés par
            enveloppe et par question — sans jargon, avec des chiffres datés et sourcés.
          </p>
        </div>
      </section>

      <nav className="guides-nav" aria-label="Aller à une catégorie de guides">
        <div className="container guides-nav-inner">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={`guides-pill${active === cat.id ? " active" : ""}`}
            >
              {cat.name}
              <span className="guides-pill-count">{cat.items.length}</span>
            </a>
          ))}
        </div>
      </nav>

      <section className="section">
        <div className="container prose">
          <p>
            Commencez par les articles à la une ci-dessous, ou cliquez sur une enveloppe dans le
            menu pour aller directement à la section qui vous intéresse. Si vous préférez une vue
            d'ensemble par stratégie plutôt que par question, notre page{" "}
            <Link to="/strategies">5 stratégies pour construire votre capital retraite</Link>{" "}
            est le meilleur point de départ.
          </p>
        </div>

        <div className="container">
          <h2 className="guides-section-title">À la une</h2>
          <div className="featured-grid">
            {featured.map((item) => (
              <Link key={item.to} to={item.to} className="featured-card">
                <span className="featured-badge">{item.badge}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="card-more">Lire le guide →</span>
              </Link>
            ))}
          </div>
        </div>

        {categories.map((cat) => (
          <div className="container guides-category" key={cat.id} id={cat.id}>
            <h2>{cat.name}</h2>
            <div className="card-grid">
              {cat.items.map((item) => (
                <Link key={item.to} to={item.to} className="card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className="card-more">Lire le guide →</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <CtaBanner title="Vous ne trouvez pas la réponse à votre question ? Parlons-en directement." />
    </>
  );
}
