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
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> il n'y a pas d'âge « trop tard » pour ouvrir un PER —
              y compris passé 50 ou 60 ans, à condition que la tranche marginale d'imposition
              actuelle rende la déduction significative et qu'une épargne de précaution soit déjà
              constituée, puisque les sommes versées restent bloquées jusqu'au départ à la
              retraite (sauf cas de déblocage anticipé). Avant 35 ans, le PER vient généralement
              après ces fondations. Entre 50 et 60 ans, il devient souvent particulièrement
              pertinent. Au-delà de 60 ans, l'ouverture reste possible mais se calcule au cas par
              cas. Dans tous les cas, la question qui compte n'est pas l'âge en tant que tel, mais
              le triplet TMI actuelle / TMI anticipée à la retraite / besoin de liquidité.
            </p>
          </div>

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
              <strong>Cela peut souvent correspondre à l'âge de la TMI la plus élevée de la
              carrière.</strong> Entre 50 et 62 ans, les revenus atteignent fréquemment leur
              sommet — enfants partis, carrière au plateau — même si ce n'est ni systématique ni
              universel : cela dépend entièrement de votre propre trajectoire de revenus, pas d'un
              seuil d'âge générique. Quand c'est le cas, chaque euro versé est déduit à la tranche
              la plus haute de toute votre vie professionnelle : mécaniquement, c'est là que la
              déduction rapporte le plus.
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

          <h2>Le PER selon votre tranche d'âge, en un coup d'œil</h2>
          <p>
            Cette synthèse reprend, tranche par tranche, ce qui vient d'être détaillé plus haut —
            à lire comme une grille de repères, pas comme un verdict définitif : votre TMI et votre
            besoin de liquidité pèsent toujours plus que votre âge en tant que tel.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Tranche d'âge</th>
                  <th>Avantages</th>
                  <th>Limites</th>
                  <th>Urgence relative</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Moins de 35 ans</td>
                  <td>Maximum d'années de capitalisation ; prend date tôt si la TMI est déjà élevée</td>
                  <td>
                    TMI souvent encore modeste en début de carrière ; blocage long jusqu'à la
                    retraite ; d'autres priorités passent généralement avant (épargne de
                    précaution, projet immobilier, PEA)
                  </td>
                  <td>Faible, sauf TMI déjà élevée dès cet âge</td>
                </tr>
                <tr>
                  <td>35-50 ans</td>
                  <td>
                    La TMI progresse souvent avec la carrière ; encore de nombreuses années de
                    déduction et de capitalisation avant la retraite
                  </td>
                  <td>
                    Le blocage reste long ; l'épargne de précaution et les projets familiaux
                    (immobilier, études des enfants) doivent rester prioritaires
                  </td>
                  <td>Modérée à élevée si la TMI atteint déjà 30 % et au-delà</td>
                </tr>
                <tr>
                  <td>50-60 ans</td>
                  <td>
                    Peut souvent correspondre au pic de TMI de la carrière ; l'horizon avant et
                    pendant la retraite reste substantiel (potentiellement 20 ans en comptant la
                    phase de sortie fractionnée) ; le blocage devient un faux problème à mesure que
                    l'échéance de déblocage approche
                  </td>
                  <td>
                    Moins d'années restantes pour lisser d'éventuels à-coups de marché avant la
                    retraite
                  </td>
                  <td>Élevée si TMI d'au moins 30 % et pas encore de PER</td>
                </tr>
                <tr>
                  <td>Plus de 60 ans</td>
                  <td>
                    Reste possible et parfois pertinent : verser pour déduire, puis sortir de
                    manière fractionnée quelques années plus tard
                  </td>
                  <td>
                    Fenêtre de calcul plus étroite ; la fiscalité de sortie doit être vérifiée
                    finement avant de verser ; pertinent surtout à TMI élevée
                  </td>
                  <td>À évaluer au cas par cas, avec un calcul dédié</td>
                </tr>
              </tbody>
            </table>
          </div>

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

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Puis-je ouvrir un PER après 60 ans ?</h3>
          <p>
            Oui, rien ne l'interdit. La question n'est pas de savoir si c'est possible, mais si
            c'est pertinent dans votre cas : cela dépend surtout de votre TMI actuelle, du nombre
            d'années restantes avant la liquidation de vos droits, et de la fiscalité de sortie
            applicable au moment où vous récupérerez les sommes. Un calcul dédié est recommandé
            plutôt qu'une décision par défaut.
          </p>
          <h3>Le PER est-il bloqué jusqu'à quel âge ?</h3>
          <p>
            Par principe, les sommes versées sur un PER sont bloquées jusqu'au départ à la
            retraite, sauf cas de déblocage anticipé prévus par la loi (achat de la résidence
            principale, invalidité, décès du conjoint, surendettement, expiration des droits au
            chômage, cessation d'activité non salariée à la suite d'une liquidation judiciaire).
            Plus le PER est ouvert tard, plus cette échéance de déblocage se rapproche
            mécaniquement.
          </p>
          <h3>Est-il trop tard à 55 ans pour ouvrir un PER ?</h3>
          <p>
            Non. À 55 ans, l'horizon avant la retraite reste généralement suffisant pour profiter
            de plusieurs années de déduction fiscale, et l'échéance de déblocage est suffisamment
            proche pour que la contrainte de liquidité pèse peu. C'est souvent, au contraire, l'un
            des moments où le calcul est le plus favorable — à condition que la TMI actuelle
            justifie la déduction.
          </p>
          <h3>Faut-il attendre d'avoir une TMI élevée pour ouvrir un PER ?</h3>
          <p>
            Pas nécessairement attendre, mais c'est un facteur déterminant : à TMI faible (autour
            de 11 %), la déduction rapporte peu et d'autres enveloppes offrent davantage de
            souplesse pour un résultat comparable. Le PER redevient pertinent dès que la TMI
            progresse, quel que soit l'âge auquel cela se produit.
          </p>
          <h3>Un PER ouvert tardivement a-t-il le temps de produire des intérêts ?</h3>
          <p>
            Oui : au-delà de la phase de versement, un PER continue généralement à se valoriser
            pendant la phase de sortie, surtout si celle-ci est fractionnée sur plusieurs années
            plutôt que soldée en une fois. La durée totale de vie du contrat dépasse donc souvent
            le seul nombre d'années avant le départ à la retraite.
          </p>
          <h3>Puis-je ouvrir plusieurs PER à des âges différents ?</h3>
          <p>
            Oui, rien n'empêche de détenir plusieurs PER (individuel, voire d'anciens PER
            d'entreprise transférés), et il est possible d'en ouvrir un nouveau à tout âge tant que
            les conditions de versement et de plafond sont respectées. La consolidation ou non de
            ces contrats se raisonne au cas par cas.
          </p>
          <h3>À quel âge dois-je commencer à réfléchir à la sortie du PER, plutôt qu'à son ouverture ?</h3>
          <p>
            Dès que le départ à la retraite se rapproche à quelques années, généralement. La
            question de la sortie (capital, rente, ou sortie fractionnée) a des conséquences
            fiscales différentes selon l'option choisie et mérite d'être anticipée avant la date de
            liquidation, pas seulement au moment d'y arriver.
          </p>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="Le PER a-t-il (encore, ou déjà) du sens pour vous ?" />
    </>
  );
}
