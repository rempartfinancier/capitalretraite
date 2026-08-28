import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { HYPOTHESES_MAJ, ILLUSTRATIF, pct } from "../components/hypotheses.js";

export default function GuidePeePercol() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Épargne salariale</span>
          <h1>PEE, PERCOL : faut-il vraiment les utiliser pour préparer sa retraite ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le PEE (plan d'épargne entreprise) et le PERCOL (plan
              d'épargne retraite collectif, ex-Perco) sont deux dispositifs distincts, souvent
              confondus, alimentés par l'intéressement, la participation et un éventuel abondement de
              l'employeur — un abondement qui est, dans la quasi-totalité des cas, le placement le
              plus rentable auquel un salarié a accès, puisqu'il s'agit d'argent gratuit versé par
              l'entreprise. Le PEE reste bloqué 5 ans (avec 13 cas de déblocage anticipé), le PERCOL
              reste bloqué jusqu'à la retraite (avec 6 cas de déblocage anticipé, dont l'achat de la
              résidence principale). Beaucoup de cadres laissent cet abondement sur la table faute de
              comprendre le mécanisme — c'est souvent la première case à cocher avant même d'envisager
              un PER individuel.
            </p>
          </div>

          <p>
            Dans les bilans retraite que nous menons, un même constat revient chez de nombreux cadres
            en poste depuis plusieurs années : ils ont un PEE et parfois un PERCOL ouverts par leur
            employeur, alimentés automatiquement par l'intéressement ou la participation, et n'ont
            jamais vraiment regardé ce qui s'y trouve — ni si l'entreprise abonde des versements
            volontaires qu'ils ne font pas. Contrairement au PER individuel ou à l'assurance-vie, ces
            deux dispositifs ne se choisissent pas : ils existent parce que l'employeur les propose, ce
            qui explique pourquoi ils sont souvent moins bien connus que les enveloppes qu'on ouvre
            soi-même.
          </p>
          <p>
            Ce guide explique ce que sont réellement le PEE et le PERCOL, ce qui les distingue, l'
            abondement — le levier le plus important et le plus sous-utilisé —, les cas de déblocage
            anticipé, et comment ces deux dispositifs s'articulent avec un PER individuel ou une
            assurance-vie dans une stratégie retraite d'ensemble.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#definitions">PEE et PERCOL : deux dispositifs distincts</a></li>
              <li><a href="#alimentation">Comment ces plans sont-ils alimentés ?</a></li>
              <li><a href="#abondement">L'abondement : le placement le plus rentable auquel vous avez accès</a></li>
              <li><a href="#blocage">Disponibilité et cas de déblocage anticipé</a></li>
              <li><a href="#fiscalite">La fiscalité, à l'entrée et à la sortie</a></li>
              <li><a href="#tableau">PEE ou PERCOL : le comparatif</a></li>
              <li><a href="#articulation">Comment articuler PEE/PERCOL avec un PER individuel ?</a></li>
              <li><a href="#limites">Les limites à connaître</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#checklist">Check-list : ce qu'il faut vérifier dans votre entreprise</a></li>
            </ol>
          </div>

          <h2 id="definitions">PEE et PERCOL : deux dispositifs distincts</h2>
          <p>
            Le PEE (plan d'épargne entreprise) est un plan d'épargne collectif proposé par
            l'entreprise, qui permet aux salariés d'investir dans des supports financiers (fonds
            actions, fonds diversifiés, parfois actionnariat salarié) avec un horizon de blocage
            court comparé aux autres enveloppes retraite : cinq ans par défaut. Ce n'est donc pas, à
            l'origine, un produit pensé pour la seule retraite — il sert aussi à des projets à moyen
            terme.
          </p>
          <p>
            Le PERCOL (plan d'épargne retraite collectif, qui a remplacé l'ancien Perco depuis la loi
            PACTE) est lui explicitement un dispositif de retraite d'entreprise : les sommes versées
            restent bloquées jusqu'à la liquidation des droits à la retraite, sauf cas de déblocage
            anticipé prévus par la loi. Sur le plan fiscal et sur le plan de la logique d'horizon, le
            PERCOL se rapproche donc davantage du PER individuel que du PEE — les trois dispositifs
            appartiennent d'ailleurs à la même famille réglementaire issue de la loi PACTE.
          </p>

          <h2 id="alimentation">Comment ces plans sont-ils alimentés ?</h2>
          <p>
            Quatre sources peuvent alimenter un PEE ou un PERCOL, souvent combinées : la
            participation (redistribution obligatoire d'une partie des bénéfices dans les entreprises
            concernées), l'intéressement (prime collective liée à la performance de l'entreprise,
            quand un accord existe), les versements volontaires du salarié lui-même, et le transfert
            de jours de congé non pris via un compte épargne-temps quand ce dispositif existe. Un
            salarié peut choisir de percevoir sa participation et son intéressement immédiatement, en
            net d'impôt sur le revenu, ou de les placer sur son PEE/PERCOL — un choix qui a des
            conséquences fiscales et d'immobilisation très différentes.
          </p>

          <h2 id="abondement">L'abondement : le placement le plus rentable auquel vous avez accès</h2>
          <p>
            L'abondement est le versement complémentaire que l'employeur ajoute, selon les règles
            fixées par l'accord d'entreprise, à chaque euro versé volontairement par le salarié sur
            son PEE ou son PERCOL — dans une certaine limite, plafonnée à la fois en pourcentage du
            versement du salarié et en valeur absolue. Concrètement, un employeur qui abonde à 50 %
            transforme chaque euro versé volontairement en 1,50 € investi, avant même que le support
            financier ne produise le moindre rendement. Aucun placement financier classique — fonds
            euros, ETF, immobilier — n'offre un rendement immédiat comparable, puisqu'il s'agit
            d'argent que l'entreprise verse en plus, sans contrepartie de performance.
          </p>
          <p>
            C'est pourtant l'angle mort le plus fréquent que nous constatons : des salariés qui
            perçoivent leur intéressement en net plutôt que de le placer, alors qu'un versement
            volontaire équivalent aurait déclenché un abondement, ou qui ignorent simplement que leur
            entreprise abonde. La première vérification à faire, avant toute réflexion sur un PER
            individuel ou une assurance-vie, est donc de consulter le règlement du PEE/PERCOL de son
            entreprise (accessible auprès du service RH ou du teneur de compte du plan) pour connaître
            le taux d'abondement exact et le plafond applicable.
          </p>

          <h2 id="blocage">Disponibilité et cas de déblocage anticipé</h2>
          <p>
            Sur un PEE, chaque versement est bloqué pendant cinq années glissantes à compter de sa
            date, et non cinq ans à compter de l'ouverture du plan. Treize cas de déblocage anticipé
            permettent néanmoins d'y accéder plus tôt, parmi lesquels le mariage ou le Pacs, la
            naissance d'un troisième enfant, l'achat de la résidence principale, le divorce avec
            conservation de la garde d'au moins un enfant, la cessation du contrat de travail, ou le
            surendettement.
          </p>
          <p>
            Sur un PERCOL, la logique est différente : les sommes sont bloquées jusqu'à la retraite,
            avec seulement six cas de déblocage anticipé prévus par la loi, dont l'achat de la
            résidence principale (le cas le plus fréquemment utilisé), l'invalidité, le décès du
            conjoint ou partenaire de PACS, le surendettement, la fin des droits au chômage et la
            cessation d'activité non salariée à la suite d'une liquidation judiciaire. Notez que
            l'achat de la résidence principale, possible sur les deux plans, ne l'est pas sur un PER
            individuel classique dans les mêmes conditions selon les versements concernés — un point
            de différenciation à vérifier au cas par cas.
          </p>

          <h2 id="fiscalite">La fiscalité, à l'entrée et à la sortie</h2>
          <p>
            Contrairement au PER individuel, les sommes versées sur un PEE ou un PERCOL au titre de
            la participation, de l'intéressement ou de l'abondement de l'employeur ne sont, dans la
            généralité des cas, pas imposables à l'entrée dans la limite des plafonds légaux — l'
            avantage fiscal se situe donc à l'entrée par exonération, et non par déduction du revenu
            comme sur un PER. Les gains générés pendant la phase d'épargne échappent à l'impôt sur le
            revenu à la sortie, mais restent soumis aux prélèvements sociaux sur les plus-values.
          </p>
          <p>
            Sur le PERCOL, un versement volontaire du salarié peut, sur option expresse (le régime par
            défaut diffère), être déduit du revenu imposable comme un versement PER classique — mais
            dans ce cas, la sortie du capital correspondant redevient imposable, exactement selon la
            même mécanique qu'un PER individuel. Ce choix « déduire à l'entrée ou pas » se fait au
            moment du versement et a des conséquences directes sur la fiscalité de sortie : notre
            guide sur la{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a> décrit ce même
            mécanisme, transposable au PERCOL sur cette option.
          </p>

          <h2 id="tableau">PEE ou PERCOL : le comparatif</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>PEE</th>
                  <th>PERCOL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Horizon de blocage</td>
                  <td>5 ans glissants par versement</td>
                  <td>Jusqu'à la retraite</td>
                </tr>
                <tr>
                  <td>Nombre de cas de déblocage anticipé</td>
                  <td>13</td>
                  <td>6</td>
                </tr>
                <tr>
                  <td>Vocation principale</td>
                  <td>Épargne collective à moyen terme</td>
                  <td>Retraite</td>
                </tr>
                <tr>
                  <td>Alimentation</td>
                  <td>Participation, intéressement, versements volontaires, abondement</td>
                  <td>Identique, plus transferts depuis un PEE ou un ancien Perco</td>
                </tr>
                <tr>
                  <td>Déduction du revenu imposable</td>
                  <td>Non, sauf régime propre à la participation/l'intéressement</td>
                  <td>Possible sur option pour les versements volontaires</td>
                </tr>
                <tr>
                  <td>Achat résidence principale</td>
                  <td>Cas de déblocage anticipé</td>
                  <td>Cas de déblocage anticipé</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="articulation">Comment articuler PEE/PERCOL avec un PER individuel ?</h2>
          <p>
            La hiérarchie que nous recommandons, dans la grande majorité des situations, suit un ordre
            logique : d'abord vérifier et maximiser l'abondement disponible sur le PEE/PERCOL de
            l'entreprise (c'est le rendement immédiat le plus élevé, sans risque de marché sur le
            montant abondé lui-même), puis seulement ensuite arbitrer entre un versement volontaire
            supplémentaire sur le PERCOL et un versement sur un PER individuel, selon les supports
            disponibles et les frais respectifs de chaque plan. Notre guide{" "}
            <a href="/guide/combien-coute-un-per">combien coûte un PER</a> permet cette comparaison de
            frais, à transposer à la grille tarifaire de votre PERCOL d'entreprise.
          </p>
          <p>
            Un point pratique utile pour un cadre qui change d'employeur : les sommes détenues sur un
            PEE ou un PERCOL restent acquises même après le départ de l'entreprise (elles ne sont pas
            perdues), et un PERCOL peut être transféré vers un autre PERCOL ou vers un PER individuel
            dans le cadre de transfert prévu par la loi PACTE. Le PEE, lui, cesse en général de
            recevoir de nouveaux abondements après le départ, mais les sommes déjà placées continuent
            de fructifier jusqu'à leur échéance de blocage.
          </p>

          <h2 id="limites">Les limites à connaître</h2>
          <p>
            Deux limites méritent d'être signalées sans être exagérées. D'abord, la gamme de supports
            d'un PEE ou d'un PERCOL est fixée par l'accord d'entreprise et le teneur de compte choisi
            par l'employeur : elle est souvent plus restreinte que celle d'un PER individuel ou d'une
            assurance-vie ouverts librement, avec des frais des supports (fonds diversifiés
            d'entreprise) qui peuvent atteindre en ordre de grandeur {pct(ILLUSTRATIF.fraisFondsEpargneSalariale)}{" "}
            par an sur certains fonds — un niveau à comparer à celui d'un ETF (voir notre guide{" "}
            <a href="/guide/etf-ou-fonds-actifs">ETF ou fonds actifs</a>), données {HYPOTHESES_MAJ}, à
            vérifier contrat par contrat.
          </p>
          <p>
            Ensuite, l'actionnariat salarié — quand le PEE permet d'investir dans les titres de
            l'entreprise elle-même — concentre le risque : en cas de difficulté de l'entreprise,
            l'épargne retraite et le revenu professionnel du salarié dépendent tous deux du même
            employeur, ce qui va à l'encontre du principe de diversification. Ce n'est pas une raison
            d'écarter systématiquement cette option, mais une raison de la doser avec prudence, sans y
            concentrer l'essentiel de l'épargne salariale.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Que se passe-t-il si je change d'employeur ?</h3>
          <p>
            Les sommes déjà placées sur le PEE ou le PERCOL restent acquises et continuent de
            fructifier. Le PERCOL peut être transféré vers celui du nouvel employeur ou vers un PER
            individuel ; le PEE cesse en général de recevoir de nouveaux abondements mais reste
            disponible selon son propre calendrier de déblocage.
          </p>
          <h3>Puis-je cumuler un PEE, un PERCOL et un PER individuel ?</h3>
          <p>
            Oui, les trois dispositifs sont cumulables. Le plafond de déduction fiscale des versements
            volontaires déductibles (PERCOL sur option, PER individuel) est en revanche mutualisé
            selon des règles à vérifier auprès de l'administration fiscale ou d'un professionnel.
          </p>
          <h3>Vaut-il mieux verser sur un PERCOL ou sur un PER individuel ?</h3>
          <p>
            Cela dépend d'abord de l'abondement disponible : s'il existe un abondement sur le PERCOL,
            il faut généralement le maximiser en priorité avant d'ouvrir un PER individuel, car
            aucun rendement de marché ne compense un abondement laissé sur la table. Au-delà de
            l'abondement, la comparaison se fait sur les frais et la gamme de supports respectifs.
          </p>
          <h3>Comment savoir si mon entreprise abonde mes versements ?</h3>
          <p>
            Le taux et le plafond d'abondement figurent dans l'accord de participation ou
            d'intéressement, ou dans le règlement du PEE/PERCOL, généralement accessibles auprès du
            service RH ou sur l'espace personnel du teneur de compte (Amundi, Natixis, Eres et autres
            gestionnaires d'épargne salariale selon l'entreprise).
          </p>
          <h3>La sortie du PERCOL se fait-elle uniquement en capital ?</h3>
          <p>
            Comme pour un PER individuel, la sortie du PERCOL peut se faire en capital, en rente
            viagère, ou en un mélange des deux, au choix du titulaire au moment de la retraite — sauf
            pour les sommes issues de la participation et de l'intéressement obligatoires antérieures à
            certaines réformes, dont le mode de sortie peut différer selon l'ancienneté du plan.
          </p>

          <h2 id="checklist">Check-list : ce qu'il faut vérifier dans votre entreprise</h2>
          <ol>
            <li>
              <strong>Consultez le règlement du PEE/PERCOL</strong> auprès du service RH ou du teneur
              de compte pour connaître le taux et le plafond d'abondement.
            </li>
            <li>
              <strong>Vérifiez si vous placez ou percevez votre intéressement et votre participation</strong> —
              percevoir en net fait perdre l'accès à un éventuel abondement.
            </li>
            <li>
              <strong>Comparez les frais des fonds proposés</strong> à ceux d'un PER individuel ou
              d'une assurance-vie ouverts librement.
            </li>
            <li>
              <strong>Limitez la part investie en actionnariat salarié</strong> pour ne pas concentrer
              le risque sur votre propre employeur.
            </li>
            <li>
              <strong>En cas de changement d'employeur</strong>, vérifiez les conditions de transfert
              du PERCOL avant de laisser les sommes dormir sur un ancien plan aux frais non revus.
            </li>
          </ol>
          <div className="note">
            <p>
              Cette analyse est générale et de nature pédagogique ; elle ne constitue pas un conseil
              en investissement personnalisé. Les taux d'abondement, plafonds et cas de déblocage
              anticipé exacts dépendent de l'accord en vigueur dans votre entreprise et de la
              réglementation applicable à la date de votre versement, à vérifier auprès de votre
              service RH ou d'un professionnel. Pour resituer ces dispositifs dans une stratégie
              retraite d'ensemble, voir notre guide{" "}
              <a href="/guide/meilleure-enveloppe-retraite">la meilleure enveloppe retraite</a>.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Vérifions ensemble si vous exploitez pleinement votre épargne salariale"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
