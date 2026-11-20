import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { HYPOTHESES_MAJ } from "../components/hypotheses.js";

// Exemple purement arithmétique : aucun taux de frais n'est sourcé ici.
// Il montre seulement l'ordre de grandeur d'un écart de frais annuels.
const ENCOURS_EXEMPLE = 50000;
const ECART_FRAIS_EXEMPLE_PT = 0.5;
const ECART_ANNUEL_EXEMPLE = Math.round((ENCOURS_EXEMPLE * ECART_FRAIS_EXEMPLE_PT) / 100);

export default function GuideTransfertPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique</span>
          <h1>Transfert de PER : frais, délais et quand le changement en vaut la peine</h1>
          <p className="sub">
            Votre PER vous coûte plus cher qu'il ne devrait, ou il ne suit plus la gestion que vous
            attendiez. Vous pouvez le transférer. Encore faut-il savoir ce que vous y gagnez, et ce
            que vous risquez de perdre au passage.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> un PER peut être transféré vers un autre PER, sans
              fiscalité et sans sortir de l'épargne retraite. Le transfert n'ouvre pas le contrat :
              les sommes restent bloquées jusqu'à la retraite, dans les mêmes conditions. Il peut
              être soumis à des frais encadrés par la loi, dont le montant dépend de l'ancienneté
              et des conditions du contrat. Le changement n'en vaut la peine que si l'économie
              attendue sur plusieurs années dépasse ce coût ponctuel, et si l'on ne perd rien
              d'important au passage. Ce sont deux calculs distincts, à faire avant de signer.
            </p>
          </div>

          <p>
            Le transfert est souvent présenté comme un geste administratif. Il engage pourtant un
            contrat qui peut courir sur vingt ou trente ans. Notre analyse : la décision mérite le
            même soin qu'un premier choix, parce que le coût d'un mauvais transfert est
            généralement plus difficile à récupérer que celui d'un contrat mal géré pendant
            quelques années.
          </p>
          <p>
            Ce guide traite du transfert entre deux PER. Il ne couvre ni la sortie du PER ni son
            déblocage anticipé, traités dans notre{" "}
            <a href="/guide/fiscalite-sortie-per">guide sur la fiscalité de sortie</a> et notre{" "}
            <a href="/guide/deblocage-anticipe-per">guide sur le déblocage anticipé</a>. Pour le
            coût global d'un PER, voir <a href="/guide/combien-coute-un-per">combien coûte un PER</a>.

          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#quoi">1. Ce qu'est un transfert — et ce qu'il n'est pas</a></li>
              <li><a href="#pourquoi">2. Les raisons légitimes de transférer</a></li>
              <li><a href="#pieges">3. Ce qu'on peut perdre au passage</a></li>
              <li><a href="#frais">4. Frais de transfert : comment les comparer à l'économie</a></li>
              <li><a href="#procedure">5. La procédure, étape par étape</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
            </ol>
          </div>

          <h2 id="quoi">1. Ce qu'est un transfert — et ce qu'il n'est pas</h2>
          <p>
            Transférer un PER consiste à faire racheter les avoirs de votre contrat actuel par un
            nouveau contrat, qui les reçoit. Vous ne retirez rien : l'argent passe d'un contrat à
            l'autre. C'est la différence essentielle avec un rachat ou une sortie, qui sont des
            événements fiscaux. Un transfert n'en est pas un, et il ne vous fait ni payer l'impôt
            sur la plus-value ni perdre la déduction accordée à vos versements.
          </p>
          <p>
            En revanche, le transfert ne modifie pas la nature de l'épargne. Les sommes restent
            affectées à la retraite, bloquées jusqu'à la liquidation sauf cas de déblocage anticipé
            prévus par la loi. Un transfert ne permet donc pas de sortir plus tôt de son PER, et il
            ne transforme pas un contrat peu adapté en épargne disponible.
          </p>

          <h2 id="pourquoi">2. Les raisons légitimes de transférer</h2>
          <p>
            Quatre situations reviennent souvent, et elles n'ont pas le même poids.
          </p>
          <p>
            <strong>Des frais de gestion trop élevés.</strong> C'est le motif le plus fréquent.
            Les frais se cumulent : frais de gestion du contrat, frais des supports, et le cas
            échéant surcoût de gestion pilotée. Un écart de quelques dixièmes de point par an,
            répété sur des décennies, pèse lourd. Notre analyse : c'est le seul motif qui se
            chiffre à l'avance avec certitude, à condition de comparer les frais tout compris et
            non le seul « frais de gestion » affiché en tête de plaquette.
          </p>
          <p>
            <strong>Une gestion qui ne correspond plus à votre horizon.</strong> Un PER ouvert à
            40 ans avec une gestion pilotée peut devenir inadapté à 55 ans, quand l'horizon de
            sortie se rapproche et que la part des actions doit être révisée. Vérifier comment le
            contrat réduit le risque à l'approche de la retraite est une question légitime. Notre{" "}
            <a href="/guide/gestion-pilotee-ou-gestion-libre">guide sur la gestion pilotée ou libre</a>{" "}
            détaille les deux approches.
          </p>
          <p>
            <strong>Une offre de supports trop restreinte.</strong> Certains contrats n'offrent
            qu'une poignée de supports, souvent chers, et aucun support indiciel à faible frais.
            Un contrat qui ne permet pas de diversifier à coût raisonnable limite ce que vous
            pouvez construire, quel que soit votre profil.
          </p>
          <p>
            <strong>Un changement de situation professionnelle.</strong> Un PER ouvert chez un
            employeur, un PER individuel souscrit en indépendant, ou un contrat devenu orphelin
            après un changement de distributeur, n'obéissent pas aux mêmes contraintes. Dans ces
            cas, le transfert peut surtout servir à reprendre la main sur une épargne qui n'était
            plus pilotée.
          </p>

          <h2 id="pieges">3. Ce qu'on peut perdre au passage</h2>
          <p>
            Le transfert est souvent jugé uniquement sur ses frais. Trois éléments méritent
            pourtant d'être examinés avant de se décider.
          </p>
          <p>
            <strong>Les garanties et conditions attachées à certains supports.</strong> Un fonds
            en euros ancien peut porter un taux servi différent de celui des fonds récents, et ce
            point ne se transfère pas forcément. Avant de transférer, demandez au distributeur
            quelles conditions de votre contrat actuel ne seront pas reprises, et dans quelles
            conditions le nouveau contrat les remplace.
          </p>
          <p>
            <strong>La part abondée par l'employeur.</strong> Les versements de l'entreprise
            restent en principe rattachés au plan collectif de l'employeur. Un transfert concerne
            en général les versements personnels et le contrat individuel, pas l'abondement. Le
            service des ressources humaines doit confirmer la situation exacte avant toute
            démarche, car une erreur sur ce point peut faire disparaître une somme qui n'était pas
            la vôtre à prendre.
          </p>
          <p>
            <strong>Le temps perdu pendant le transfert.</strong> Pendant la période de transfert,
            l'épargne peut être temporairement non investie ou investie sur un support de
            transition, selon les pratiques du contrat. Le délai dépend des deux établissements.
            Ce n'est pas un coût comptable, mais une période où vous ne pilotez pas votre
            allocation : évitez de la faire coïncider avec un marché agité si vous pouvez.
          </p>

          <h2 id="frais">4. Frais de transfert : comment les comparer à l'économie</h2>
          <p>
            Les frais de transfert sont encadrés par la loi : ils ont un plafond, et les conditions
            de gratuité ou de dégressivité varient selon le contrat et son ancienneté. Le montant
            exact figure dans les conditions générales du contrat que vous quittez, et il doit être
            confirmé par écrit par votre distributeur. Ne vous fiez pas à une approximation orale.
          </p>
          <p>
            La comparaison est simple dans son principe, à condition de séparer deux choses qui ne
            se produisent pas au même rythme. Les frais de transfert sont un coût ponctuel. L'économie
            visée est un coût récurrent. Le bon raisonnement est donc :
          </p>
          <ul>
            <li>
              écart de frais annuels entre l'ancien et le nouveau contrat, tout compris, rapporté à
              l'encours concerné ;
            </li>
            <li>
              multiplié par la durée restante jusqu'à la retraite, pour obtenir l'économie totale
              attendue ;
            </li>
            <li>
              comparé au coût ponctuel du transfert, puis corrigé des éléments perdus identifiés
              dans la section précédente.
            </li>
          </ul>
          <p>
            Exemple purement arithmétique, sans taux sourcé : sur un encours de{" "}
            {ENCOURS_EXEMPLE.toLocaleString("fr-FR")} €, un écart de{" "}
            {ECART_FRAIS_EXEMPLE_PT.toLocaleString("fr-FR")} point de frais annuels représente{" "}
            {ECART_ANNUEL_EXEMPLE.toLocaleString("fr-FR")} € par an, soit de l'ordre de{" "}
            {(ECART_ANNUEL_EXEMPLE * 10).toLocaleString("fr-FR")} € sur dix ans. Ce calcul ignore
            les rendements et les intérêts composés, qui modifient le résultat réel à la hausse
            comme à la baisse. Il sert seulement à savoir si l'enjeu justifie d'aller plus loin.
          </p>
          <p>
            Un transfert dont l'économie est inférieure aux frais ponctuels, ou dont le gain se
            limite à un écart de frais sur les dernières années de vie du contrat, ne se justifie
            généralement pas. À l'inverse, un écart important sur un encours conséquent et une
            durée longue peut rendre le transfert nettement rentable.
          </p>

          <h2 id="procedure">5. La procédure, étape par étape</h2>
          <p>
            La démarche se fait en général auprès de l'établissement qui reçoit le contrat, qui
            engage les démarches auprès de l'ancien. Vous n'avez pas à demander le transfert
            vous-même auprès de votre ancien contrat.
          </p>
          <ol>
            <li>
              <strong>Obtenir le détail des frais</strong> de l'ancien contrat et des supports
              actuels, par écrit.
            </li>
            <li>
              <strong>Vérifier les conditions de transfert</strong> : les supports équivalents
              disponibles, les garanties éventuellement perdues, le traitement de l'abondement.
            </li>
            <li>
              <strong>Faire le calcul de rentabilité</strong> décrit ci-dessus, avec les frais réels.
            </li>
            <li>
              <strong>Signer la demande de transfert</strong> auprès du nouvel établissement, qui
              se charge de la transmission. Les délais sont encadrés, mais peuvent se compter en
              semaines.
            </li>
            <li>
              <strong>Contrôler le résultat</strong> : montant transféré, supports, date d'effet,
              et mise à jour de la gestion choisie.
            </li>
          </ol>
          <p>
            Pour replacer le transfert dans la stratégie d'ensemble, notre{" "}
            <a href="/strategies/per">page stratégie PER</a> présente les autres leviers à
            activer en parallèle, et notre guide{" "}
            <a href="/guide/quel-est-le-meilleur-per">quel est le meilleur PER ?</a> explique
            pourquoi nous ne publions pas de classement de contrats.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Un transfert de PER est-il imposable ?</h3>
          <p>
            Non, en principe. Le transfert n'est pas une sortie : il ne déclenche ni impôt sur le
            revenu ni prélèvements sociaux sur les gains. La fiscalité s'appliquera au moment de la
            sortie, dans les conditions du nouveau contrat.
          </p>
          <h3>Puis-je transférer une partie seulement de mon PER ?</h3>
          <p>
            Cela dépend des contrats et des établissements. Certains acceptent un transfert partiel,
            d'autres exigent la totalité des avoirs. Posez la question avant de lancer la démarche,
            car elle conditionne le calcul de rentabilité.
          </p>
          <h3>Le transfert allonge-t-il le blocage de mon épargne ?</h3>
          <p>
            Non. Les sommes restent soumises aux mêmes règles de blocage jusqu'à la retraite. Le
            transfert ne rouvre ni ne prolonge une période de sortie : il déplace le contrat, pas
            la date à laquelle vous pourrez disposer de l'argent.
          </p>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les frais de
              transfert, leurs plafonds et leurs conditions de gratuité varient selon le contrat,
              son ancienneté et son distributeur : ils doivent être confirmés dans les conditions
              générales de votre contrat. Les paramètres fiscaux cités sont ceux de nos hypothèses,
              révisées en {HYPOTHESES_MAJ}, et susceptibles d'évoluer par la loi. Les performances
              passées ne préjugent pas des performances futures, et le capital investi sur des
              supports en unités de compte peut baisser.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Transfert envisagé : faisons le calcul avec vos frais réels." />
    </>
  );
}
