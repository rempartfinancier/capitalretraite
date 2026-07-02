import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";

export default function GuideAgeCommencerPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide — réponse franche</span>
          <h1>À quel âge ouvrir un PER ? Le plus tôt possible — mais pas n'importe comment</h1>
          <p className="sub">
            Et non, ce n'est pas « trop tard » à 50 ans. C'est même souvent l'âge où le PER devient
            le plus rentable. Explications.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>La réponse courte</h2>
          <p>
            Le plus tôt possible <em>dès que deux conditions sont réunies</em> : une tranche
            marginale d'imposition qui rend la déduction significative (30 % et au-delà, la
            question se pose sérieusement), et une épargne de précaution déjà constituée, car les
            sommes versées seront bloquées. Avant cela, un PER ouvert « pour faire bien » est
            souvent un PEA ou une assurance-vie qui s'ignore.
          </p>

          <h2>Pourquoi le temps joue double</h2>
          <p>
            Ouvrir tôt cumule deux effets : davantage d'années de capitalisation, et davantage
            d'années de déduction fiscale — chaque exercice fiscal apporte son plafond de
            déduction, et les plafonds non utilisés des trois années précédentes restent
            mobilisables. Commencer à 40 ans plutôt qu'à 50, c'est dix plafonds annuels de plus,
            indépendamment de toute performance des marchés.
          </p>

          <h2>Déconstruisons le « c'est trop tard à 50 ans »</h2>
          <p>
            C'est l'idée reçue la plus coûteuse sur le sujet, et elle est fausse pour trois raisons :
          </p>
          <ul>
            <li>
              <strong>C'est souvent l'âge de la TMI maximale.</strong> Entre 50 et 62 ans, les
              revenus atteignent fréquemment leur sommet — enfants partis, carrière au plateau.
              Chaque euro versé est déduit à la tranche la plus haute de toute votre vie
              professionnelle : mécaniquement, c'est là que la déduction rapporte le plus.
            </li>
            <li>
              <strong>L'horizon n'est pas si court.</strong> Un PER ouvert à 52 ans peut vivre 12
              ans avant la retraite, puis continuer à se valoriser pendant la phase de sortie
              fractionnée — soit potentiellement 20 ans d'existence.
            </li>
            <li>
              <strong>Le blocage devient un faux problème.</strong> À 55 ans, l'échéance de
              déblocage est proche : la contrainte de liquidité, principal défaut du PER, s'efface
              d'elle-même.
            </li>
          </ul>

          <h2>Les nuances qui comptent</h2>
          <h3>À TMI 11 %, l'urgence n'existe pas</h3>
          <p>
            La déduction rapporte peu, et la fiscalité de sortie peut la neutraliser. À ce niveau
            d'imposition, d'autres enveloppes offrent plus de souplesse pour un résultat net
            comparable — le PER redeviendra pertinent si vos revenus progressent.
          </p>
          <h3>Très tôt (moins de 35 ans) : oui, mais après le reste</h3>
          <p>
            Épargne de précaution, projet immobilier, PEA pour prendre date : le PER vient
            généralement après ces fondations, sauf TMI déjà élevée.
          </p>
          <h3>Très tard (au-delà de 60 ans) : au cas par cas</h3>
          <p>
            Verser à 61 ans pour déduire, puis sortir de manière fractionnée à partir de 64, peut
            rester pertinent à TMI élevée — mais la fenêtre se calcule finement, notamment au
            regard de la fiscalité de sortie.
          </p>

          <h2>La vraie question n'est pas l'âge</h2>
          <p>
            C'est le triplet TMI actuelle / TMI anticipée à la retraite / besoin de liquidité. Un
            PER se justifie quand la première est élevée, la deuxième plus faible, et la troisième
            couverte par ailleurs. À 38, 50 ou 58 ans, ce raisonnement ne change pas — seuls vos
            paramètres changent.
          </p>

          <div className="note">
            Piste de réflexion : si vous avez plus de 45 ans, une TMI d'au moins 30 % et pas encore
            de PER, le sujet mérite au minimum un calcul sérieux. C'est typiquement l'objet d'un
            bilan de 15 minutes.
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="Le PER a-t-il (encore, ou déjà) du sens pour vous ?" />
    </>
  );
}
