import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";

export default function StrategiePea() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Stratégie 03</span>
          <h1>Le PEA dans une optique retraite : le levier sous-estimé</h1>
          <p className="sub">
            On présente rarement le PEA comme un outil retraite. C'est pourtant l'une des
            enveloppes les plus efficaces fiscalement pour capitaliser sur longue durée.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>La capitalisation longue durée</h2>
          <p>
            Le PEA permet d'investir en actions européennes (en direct ou via des fonds et ETF
            éligibles) dans une enveloppe où les gains se capitalisent sans frottement fiscal tant
            qu'aucun retrait n'est effectué. Sur un horizon de 10 à 20 ans — précisément l'horizon
            d'une préparation retraite entamée à 45-50 ans — cette capitalisation sans imposition
            intermédiaire est un moteur puissant.
          </p>

          <h2>L'exonération après 5 ans</h2>
          <p>
            Passé le cinquième anniversaire du plan, les retraits sont exonérés d'impôt sur le
            revenu sur les plus-values ; seuls les prélèvements sociaux restent dus. Autrement dit,
            un PEA ouvert à 47 ans est fiscalement mûr bien avant la retraite — et chaque année qui
            passe renforce l'intérêt de l'avoir ouvert tôt, ne serait-ce que pour « prendre date ».
          </p>

          <h2>La rente viagère défiscalisée : l'option méconnue</h2>
          <p>
            C'est le point que presque personne ne connaît : après 5 ans, un PEA peut être converti
            en rente viagère <strong>exonérée d'impôt sur le revenu</strong> (les prélèvements
            sociaux s'appliquent sur une fraction de la rente, dégressive avec l'âge). Pour qui
            recherche un revenu à vie fiscalement optimisé, c'est une des sorties les plus
            efficaces du droit français — à mettre en regard de la perte du capital transmissible.
          </p>

          <h2>Le plafond</h2>
          <p>
            Les versements sur un PEA sont plafonnés à 150 000 € par personne (300 000 € pour un
            couple avec deux plans, et davantage via le PEA-PME). Le capital, lui, peut croître
            au-delà sans limite : le plafond porte sur les versements, pas sur la valeur du plan.
          </p>

          <h2>Pour qui est-ce pertinent ?</h2>
          <ul>
            <li>Épargnants à horizon long (8 ans et plus), capables de tolérer les fluctuations ;</li>
            <li>Profils déjà dotés d'une épargne de précaution et d'une base sécurisée ;</li>
            <li>
              Contribuables dont la TMI rend la déduction PER peu intéressante, et qui cherchent
              une alternative fiscalement efficace.
            </li>
          </ul>

          <h2>Les limites — et elles sont réelles</h2>
          <ul>
            <li>
              <strong>Aucune garantie du capital</strong> : un PEA est investi en actions ; sa
              valeur fluctue, parfois fortement, et peut être en baisse au moment où vous auriez
              besoin des fonds ;
            </li>
            <li>
              <strong>La volatilité impose une discipline de sortie</strong> : sécuriser
              progressivement à l'approche de la retraite, plutôt que vendre en urgence au pire moment ;
            </li>
            <li>L'univers d'investissement est restreint aux titres européens éligibles ;</li>
            <li>Un retrait avant 5 ans entraîne en principe la clôture du plan.</li>
          </ul>

          <div className="note">
            Piste de réflexion : le PEA se pense rarement seul. Sa place dépend de ce que vos
            autres enveloppes couvrent déjà — c'est une question d'architecture globale, pas de
            produit isolé.
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="Le PEA a-t-il sa place dans votre architecture retraite ?" button="Prendre rendez-vous" />
    </>
  );
}
