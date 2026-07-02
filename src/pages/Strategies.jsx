import { Link } from "react-router-dom";
import { CtaBanner } from "../components/Layout.jsx";

const cards = [
  {
    to: "/strategies/per",
    title: "Le PER",
    text: "L'enveloppe dédiée retraite : déduction fiscale à l'entrée, blocage jusqu'à la retraite, sortie en capital ou en rente. Pertinent surtout à TMI élevée — à condition d'en accepter les contreparties.",
  },
  {
    to: "/strategies/assurance-vie-retraite",
    title: "L'assurance-vie retraite",
    text: "L'enveloppe polyvalente : disponible à tout moment, fiscalité adoucie après 8 ans, rachats programmés pour créer un revenu, atouts successoraux. La colonne vertébrale de nombreuses stratégies.",
  },
  {
    to: "/strategies/pea-retraite",
    title: "Le PEA retraite",
    text: "Capitaliser en actions européennes sur 10 à 20 ans, puis sortir en capital exonéré d'impôt sur les plus-values ou en rente viagère défiscalisée. Puissant, mais exposé à la volatilité des marchés.",
  },
  {
    to: "/strategies/decumulation",
    title: "La décumulation",
    text: "L'étape que presque personne ne prépare : dans quel ordre puiser dans ses enveloppes, à quel rythme, avec quelle fiscalité — et comment ne pas épuiser son capital trop tôt.",
  },
  {
    to: "/strategies/immobilier-retraite",
    title: "L'immobilier retraite",
    text: "SCPI à crédit, LMNP, usufruit temporaire, démembrement : la pierre comme source de revenus complémentaires — avec ses délais, sa fiscalité et ses risques propres.",
  },
];

export default function Strategies() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Panorama</span>
          <h1>5 stratégies pour construire votre capital retraite</h1>
          <p className="sub">
            Il n'existe pas de « meilleur placement retraite » dans l'absolu. Il existe une bonne
            articulation pour votre situation.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <p>
            Le bon choix dépend de quatre paramètres : votre <strong>âge</strong> (et donc votre
            horizon avant la retraite), votre <strong>tranche marginale d'imposition</strong>,
            votre <strong>patrimoine existant</strong> et votre <strong>besoin de liquidité</strong>.
            Deux personnes du même âge, avec le même revenu, peuvent légitimement suivre des
            stratégies opposées.
          </p>
          <p>
            C'est pourquoi vous ne trouverez ici aucune recommandation générique. Chaque page
            explique le fonctionnement d'une stratégie, à qui elle convient, et surtout ses
            contreparties — car chacune en a.
          </p>
        </div>
        <div className="container">
          <div className="card-grid">
            {cards.map((c, i) => (
              <Link key={c.to} to={c.to} className="card">
                <span className="card-kicker">Stratégie 0{i + 1}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="card-more">Lire la page complète →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Vous hésitez entre plusieurs stratégies ? C'est exactement l'objet du bilan." />
    </>
  );
}
