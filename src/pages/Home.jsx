import { Link } from "react-router-dom";
import { CtaBanner } from "../components/Layout.jsx";
import { CALENDLY_URL } from "../components/config.js";

const strategies = [
  {
    to: "/strategies/per",
    kicker: "Stratégie 01",
    title: "PER",
    text: "Déduire aujourd'hui, percevoir demain : l'avantage fiscal à l'entrée, ses conditions et ses contreparties.",
  },
  {
    to: "/strategies/assurance-vie-retraite",
    kicker: "Stratégie 02",
    title: "Assurance-vie retraite",
    text: "Souplesse, fiscalité après 8 ans, rachats programmés : l'enveloppe polyvalente au service de la retraite.",
  },
  {
    to: "/strategies/pea-retraite",
    kicker: "Stratégie 03",
    title: "PEA retraite",
    text: "Capitaliser en actions sur longue durée, puis sortir en rente défiscalisée : un levier souvent sous-estimé.",
  },
  {
    to: "/strategies/decumulation",
    kicker: "Stratégie 04",
    title: "Décumulation",
    text: "Convertir un capital en revenus sans se tromper d'ordre, de timing ni de fiscalité. Le sujet oublié.",
  },
  {
    to: "/strategies/immobilier-retraite",
    kicker: "Stratégie 05",
    title: "Immobilier retraite",
    text: "SCPI à crédit, LMNP, démembrement : la place de la pierre dans une stratégie retraite équilibrée.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <span className="eyebrow">Conseil retraite sur mesure</span>
          <h1>Construisez votre capital retraite avec méthode.</h1>
          <p className="sub">
            Vous avez travaillé dur. Votre retraite mérite une stratégie — pas un produit vendu à
            la va-vite.
          </p>
          <div className="hero-ctas">
            <Link to="/bilan-retraite" className="btn btn-primary">
              Faire mon bilan retraite gratuit
            </Link>
            <a href={CALENDLY_URL} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              Prendre rendez-vous
            </a>
          </div>
          <p style={{ marginTop: "1rem" }}>
            <Link to="/simulateur-retraite">Ou estimez votre écart de revenus en 3 minutes →</Link>
          </p>
          <div className="lifeline" aria-hidden="true">
            <div className="mark" style={{ left: "8%" }}>
              <strong>45 ans</strong>
              <span>constituer</span>
            </div>
            <div className="mark" style={{ left: "45%" }}>
              <strong>58 ans</strong>
              <span>sécuriser</span>
            </div>
            <div className="mark accent" style={{ left: "72%" }}>
              <strong>64 ans</strong>
              <span>décaisser</span>
            </div>
            <div className="mark accent" style={{ left: "94%" }}>
              <strong>90 ans +</strong>
              <span>durer</span>
            </div>
          </div>
        </div>
      </section>

      {/* À LA UNE — articles phares */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">À la une</span>
          <h2>Votre épargne actuelle travaille-t-elle vraiment pour vous ?</h2>
          <p style={{ maxWidth: "640px" }}>
            Trois enquêtes pédagogiques sur ce que coûtent réellement les contrats standards —
            frais, supports imposés, gestion packagée. À lire avant tout rendez-vous, ici ou
            ailleurs.
          </p>
          <div className="card-grid">
            <Link to="/guide/pourquoi-votre-assurance-vie-rapporte-peu" className="card">
              <span className="card-kicker">Article phare — assurance-vie</span>
              <h3>Pourquoi votre assurance-vie rapporte si peu</h3>
              <p>
                Fonds euros, fonds maison, frais d'entrée et de gestion, gestion pilotée : les
                mécanismes qui rognent votre rendement — et comment auditer votre contrat.
              </p>
              <span className="card-more">Lire l'enquête →</span>
            </Link>
            <Link to="/guide/per-bancaire-frais-gestion-horizon" className="card">
              <span className="card-kicker">Article phare — PER</span>
              <h3>PER bancaire : ce qu'il faut vérifier</h3>
              <p>
                Un PER peut être fiscalement brillant et financièrement décevant. Frais, gestion à
                horizon par défaut, supports maison : la grille de lecture complète.
              </p>
              <span className="card-more">Lire l'enquête →</span>
            </Link>
            <Link to="/guide/pea-banque-ou-courtier" className="card">
              <span className="card-kicker">Article phare — PEA</span>
              <h3>PEA : banque ou courtier en ligne ?</h3>
              <p>
                Le même PEA peut coûter dix fois plus cher selon l'établissement. Droits de garde,
                courtage, fonds maison : le comparatif pour choisir — ou transférer.
              </p>
              <span className="card-more">Lire l'enquête →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLÈME — 3 réalités */}
      <section className="section section-ivoire">
        <div className="container">
          <span className="eyebrow">Trois réalités à regarder en face</span>
          <h2>Ce que votre banque ne prend pas le temps de vous expliquer</h2>
          <div className="realites">
            <div className="realite">
              <span className="num">1</span>
              <h3>Le taux de remplacement réel d'un cadre du privé</h3>
              <p>
                Plus vos revenus d'activité sont élevés, plus la part couverte par les régimes
                obligatoires diminue. Pour un cadre, la pension représente souvent une fraction
                nettement inférieure au dernier salaire — et l'écart, c'est à vous de le financer.
              </p>
            </div>
            <div className="realite">
              <span className="num">2</span>
              <h3>L'impact fiscal selon l'enveloppe choisie</h3>
              <p>
                À effort d'épargne identique, un PER, une assurance-vie et un PEA ne produisent pas
                le même résultat net. La fiscalité à l'entrée, pendant la vie du contrat et à la
                sortie change la donne — parfois du simple au double sur le revenu réellement perçu.
              </p>
            </div>
            <div className="realite">
              <span className="num">3</span>
              <h3>Capitaliser n'est pas décapitaliser</h3>
              <p>
                Construire un capital et le transformer en revenus sont deux disciplines
                différentes. L'ordre dans lequel on puise dans ses enveloppes, le rythme et le
                timing fiscal des retraits pèsent autant que des années d'épargne.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LES 5 STRATÉGIES */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">La méthode avant le produit</span>
          <h2>Cinq stratégies, un seul bon ordre : le vôtre</h2>
          <p style={{ maxWidth: "640px" }}>
            Aucune de ces briques n'est bonne ou mauvaise en soi. Ce qui compte, c'est leur
            articulation avec votre âge, votre tranche d'imposition, votre horizon et votre besoin
            de liquidité.
          </p>
          <div className="card-grid">
            {strategies.map((s) => (
              <Link key={s.to} to={s.to} className="card">
                <span className="card-kicker">{s.kicker}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="card-more">Comprendre cette stratégie →</span>
              </Link>
            ))}
            <Link to="/strategies" className="card">
              <span className="card-kicker">Vue d'ensemble</span>
              <h3>Les 5 stratégies comparées</h3>
              <p>Comment ces briques s'articulent selon votre profil — et par où commencer.</p>
              <span className="card-more">Voir le panorama →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* RÉASSURANCE */}
      <section className="section section-ivoire">
        <div className="container">
          <span className="eyebrow">Pourquoi nous faire confiance</span>
          <h2>Un conseil qui montre son travail</h2>
          <ul className="reassurance-list">
            <li>Aucun produit maison, aucune gamme à écouler.</li>
            <li>EXP Capital, SASU au capital de 1 000 €, RCS Versailles 987 986 247, ORIAS n° 25005915.</li>
          </ul>
          <p style={{ marginTop: "1.5rem" }}>
            Notre cabinet de conseil patrimonial global :{" "}
            <a href="https://lerempartfinancier.fr" target="_blank" rel="noopener noreferrer">
              Le Rempart Financier
            </a>
            .
          </p>
        </div>
      </section>

      {/* ASSIGNMENT SELLING */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">Avant notre rendez-vous, lisez ça</span>
          <h2>Trois lectures pour arriver préparé</h2>
          <p style={{ maxWidth: "640px" }}>
            Un bon entretien commence par un client informé. Ces trois guides répondent aux
            questions qu'on nous pose le plus souvent — franchement, chiffres datés et limites
            comprises.
          </p>
          <div className="card-grid">
            <Link to="/guide/combien-faut-il-epargner-pour-la-retraite" className="card">
              <span className="card-kicker">Guide</span>
              <h3>Combien faut-il vraiment épargner pour la retraite ?</h3>
              <p>La question n°1 — avec des ordres de grandeur honnêtes, pas un chiffre magique.</p>
              <span className="card-more">Lire le guide →</span>
            </Link>
            <Link to="/guide/per-vs-assurance-vie-retraite" className="card">
              <span className="card-kicker">Guide</span>
              <h3>PER ou assurance-vie : le vrai comparatif</h3>
              <p>Fiscalité à l'entrée contre fiscalité à la sortie — et pourquoi votre TMI décide.</p>
              <span className="card-more">Lire le guide →</span>
            </Link>
            <Link to="/strategies/decumulation" className="card">
              <span className="card-kicker">Guide</span>
              <h3>La décumulation expliquée simplement</h3>
              <p>Convertir son capital en revenus : l'étape que presque personne ne prépare.</p>
              <span className="card-more">Lire le guide →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <CtaBanner />
    </>
  );
}
