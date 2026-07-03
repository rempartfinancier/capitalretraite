import { Link } from "react-router-dom";
import { CtaBanner } from "../components/Layout.jsx";

// Chaque guide n'apparaît qu'une fois, classé dans sa catégorie la plus utile
// pour un visiteur qui découvre le site. Nouveau guide → ajouter une ligne ici.
const categories = [
  {
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
    ],
  },
  {
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
    ],
  },
  {
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
        to: "/guide/a-quel-age-commencer-per",
        title: "À quel âge ouvrir un PER ?",
        text: "Le plus tôt possible — mais pas pour tout le monde. Pourquoi il n'est pas trop tard à 50 ans.",
      },
    ],
  },
  {
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
    ],
  },
  {
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
    ],
  },
  {
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
    ],
  },
];

export default function Guides() {
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

      <section className="section">
        <div className="container prose">
          <p>
            Chaque guide traite une seule question, en profondeur. Si vous préférez une vue
            d'ensemble par stratégie plutôt que par question, notre page{" "}
            <Link to="/strategies">5 stratégies pour construire votre capital retraite</Link>{" "}
            est le meilleur point de départ.
          </p>
        </div>
        {categories.map((cat) => (
          <div className="container" key={cat.name}>
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
