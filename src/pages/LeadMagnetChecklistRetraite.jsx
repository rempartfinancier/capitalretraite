import { useState } from "react";
import { Link } from "react-router-dom";
import { FormEmailOutil } from "../components/Forms.jsx";
import { CtaBanner, RiskNotice } from "../components/Layout.jsx";

// Contenu de la checklist : aucune donnée chiffrée ici (les chiffres sont dans les
// outils et guides liés, qui s'appuient sur hypotheses.js).
const BLOCS = [
  {
    titre: "Il reste 5 ans : poser les bases",
    items: [
      ["Télécharger votre relevé de carrière et vérifier chaque année travaillée.", "/guide/verifier-releve-de-carriere-retraite", "Comment vérifier son relevé"],
      ["Noter votre durée d'assurance requise et votre âge légal de départ (selon votre année de naissance).", null],
      ["Estimer votre pension avec le simulateur officiel de votre caisse, puis votre trajectoire globale.", "/simulateur-retraite", "Notre simulateur retraite"],
    ],
  },
  {
    titre: "Il reste 4 à 3 ans : combler les écarts",
    items: [
      ["Mesurer vos trimestres manquants et l'effet d'un départ plus tôt ou plus tard.", "/outils/decote-surcote-trimestres", "Estimateur décote et surcote"],
      ["Comparer, si besoin, avec le coût d'un versement pour la retraite.", "/guide/combien-coute-rachat-trimestres-retraite", "Coût d'un rachat de trimestres"],
      ["Chiffrer l'écart entre votre revenu actuel et votre pension attendue.", "/guide/combien-faut-il-epargner-pour-la-retraite", "Combien épargner pour la retraite"],
    ],
  },
  {
    titre: "Il reste 3 à 2 ans : faire le point sur votre épargne",
    items: [
      ["Lister vos enveloppes (PER, assurance-vie, PEA, immobilier) avec leur ancienneté et leur valeur.", "/guide/meilleure-enveloppe-retraite", "Quelle enveloppe pour la retraite"],
      ["Relever les frais réels de chaque contrat.", "/outils/frais-per-assurance-vie", "Calculateur de frais"],
      ["Vérifier les clauses bénéficiaires et la cohérence avec votre situation familiale.", "/guide/donation-ou-assurance-vie-transmission", "Donation ou assurance-vie"],
    ],
  },
  {
    titre: "Il reste 2 à 1 an : préparer la sortie",
    items: [
      ["Comparer les modes de sortie : capital, rente ou retraits programmés.", "/guide/rente-viagere-ou-retraits-programmes", "Rente ou retraits programmés"],
      ["Anticiper la fiscalité de sortie de votre PER.", "/guide/fiscalite-sortie-per", "Fiscalité de sortie du PER"],
      ["Définir l'ordre dans lequel vous mobiliserez vos enveloppes.", "/guide/ordre-de-decaissement-retraite", "Ordre de décaissement"],
      ["Étudier un éventuel cumul emploi-retraite.", "/guide/cumul-emploi-retraite-comment-ca-marche", "Cumul emploi-retraite"],
    ],
  },
  {
    titre: "Dans la dernière année : les démarches",
    items: [
      ["Déposer votre demande de retraite : l'Assurance retraite indique 5 mois avant la date de départ souhaitée (à confirmer auprès de chaque caisse complémentaire ou spéciale).", null],
      ["Rassembler les justificatifs demandés par vos caisses (identité, relevés, situation familiale).", null],
      ["Faire relire l'ensemble par un tiers si un doute subsiste.", "/bilan-retraite", "Demander un bilan retraite gratuit"],
    ],
  },
];

const TOTAL = BLOCS.reduce((n, b) => n + b.items.length, 0);

export default function LeadMagnetChecklistRetraite() {
  const [coches, setCoches] = useState({});
  const nb = Object.values(coches).filter(Boolean).length;

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Checklist gratuite</span>
          <h1>Préparer sa retraite à 5 ans de l'échéance : la checklist</h1>
          <p className="sub">
            {TOTAL} points à cocher, dans l'ordre, de cinq ans avant le départ jusqu'aux
            démarches. Elle est affichée en entier, sans email : l'email sert seulement à la
            retrouver et à recevoir des rappels.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <p className="sim-note" aria-live="polite">
            Progression : {nb} / {TOTAL} points cochés.
          </p>
          {BLOCS.map((bloc, b) => (
            <div key={bloc.titre}>
              <h2>{bloc.titre}</h2>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {bloc.items.map(([texte, lien, libelleLien], i) => {
                  const id = `c-${b}-${i}`;
                  return (
                    <li key={id} style={{ marginBottom: "0.8rem" }}>
                      <label htmlFor={id} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                        <input
                          id={id}
                          type="checkbox"
                          checked={!!coches[id]}
                          onChange={(e) => setCoches((c) => ({ ...c, [id]: e.target.checked }))}
                          style={{ marginTop: "0.35rem" }}
                        />
                        <span>
                          {texte}
                          {lien && (
                            <>
                              {" "}
                              <Link to={lien}>{libelleLien}</Link>
                            </>
                          )}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="container" style={{ maxWidth: "560px" }}>
          <h2 style={{ marginTop: "2.5rem" }}>Retrouver la checklist par email</h2>
          <FormEmailOutil
            source="lead_magnet_checklist"
            leadMagnet
            texteBouton="Recevoir la checklist par email"
          />
        </div>

        <div className="container prose">
          <RiskNotice />
        </div>
      </section>

      <section className="section section-ivoire">
        <div className="container prose">
          <h2>Questions fréquentes</h2>
          <h3>Cette checklist remplace-t-elle un conseil personnalisé ?</h3>
          <p>
            Non. C'est une liste de points de contrôle générale. Les délais et règles dépendent de
            votre régime, de votre année de naissance et de votre situation : les points marqués
            « à vérifier » sont à confirmer auprès de vos caisses de retraite.
          </p>
          <h3>Suis-je obligé de laisser mon email ?</h3>
          <p>
            Non, la checklist s'affiche en entier ci-dessus. L'email permet de la retrouver et
            de recevoir quelques articles utiles ; vous pouvez vous désinscrire à tout moment.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Des points restent flous ? Faisons-les relire en 15 minutes."
        button="Bilan retraite gratuit (15 min)"
        to="/bilan-retraite"
      />
    </>
  );
}
