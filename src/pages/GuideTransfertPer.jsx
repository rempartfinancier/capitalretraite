import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { HYPOTHESES_MAJ } from "../components/hypotheses.js";

export default function GuideTransfertPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Changer de contrat sans changer d'enveloppe</span>
          <h1>Transfert de PER : frais, délais et ce qu'il faut vérifier avant de bouger</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> transférer un PER vers un autre PER est un droit, et ce
              n'est pas un événement fiscal : les sommes ne sont ni imposées ni réintégrées à votre
              revenu, et leur nature (versements déduits, non déduits, obligatoires) est conservée
              dans le contrat d'arrivée. Les frais de transfert sont plafonnés par la loi et
              disparaissent après cinq ans de détention du plan. La vraie question n'est donc pas
              « combien coûte le transfert », mais « que perd-on, ou que gagne-t-on, en changeant de
              contrat » : frais courants, supports accessibles, mode de gestion, garanties attachées
              à un ancien contrat. Le transfert se prépare comme une comparaison de grilles, pas
              comme une démarche administrative.
            </p>
          </div>

          <p>
            Beaucoup de détenteurs de PER découvrent, plusieurs années après la souscription, que le
            contrat ouvert au guichet de leur banque n'est pas celui qu'ils choisiraient aujourd'hui.
            Frais de gestion élevés, supports limités à la gamme maison, gestion pilotée à horizon
            appliquée par défaut : les motifs d'insatisfaction ne manquent pas. Reste une inquiétude
            tenace — « si je change, je perds mon antériorité, je paie des frais, je déclenche un
            impôt ». Elle est en grande partie infondée, mais pas entièrement.
          </p>
          <p>
            Notre analyse : le transfert est un outil d'arbitrage, pas un réflexe. Il vaut la peine
            quand l'écart de coût et de qualité de supports est durable et se cumule sur de
            nombreuses années ; il ne vaut pas la peine quand il est déclenché par une publicité ou
            par un conseiller dont la rémunération dépend de la nouvelle souscription. Cet article
            décrit ce que la loi garantit, ce que le transfert coûte réellement, et la liste de
            vérifications à faire avant de signer.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#principe">Ce que le transfert est, et ce qu'il n'est pas</a></li>
              <li><a href="#frais">Les frais de transfert : un plafond légal, une gratuité après cinq ans</a></li>
              <li><a href="#delais">Les délais et le déroulé de la démarche</a></li>
              <li><a href="#anciens">Les anciens contrats : PERP, Madelin, article 83</a></li>
              <li><a href="#verifier">Avant de transférer : sept vérifications</a></li>
              <li><a href="#quand">Quand le transfert vaut la peine, et quand il ne vaut pas la peine</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="principe">Ce que le transfert est, et ce qu'il n'est pas</h2>
          <p>
            Un transfert de PER consiste à demander à votre gestionnaire actuel de verser
            l'intégralité de votre épargne à un autre gestionnaire, qui l'accueille dans un nouveau
            contrat PER. Vous restez titulaire d'un plan d'épargne retraite : l'enveloppe ne change
            pas, seul le contrat qui la porte change.
          </p>
          <p>Trois conséquences à connaître :</p>
          <ul>
            <li>
              <strong>Aucune imposition au moment du transfert.</strong> Il ne s'agit pas d'un
              rachat suivi d'une nouvelle souscription : les sommes ne passent jamais par votre
              compte et ne sont pas réintégrées à votre revenu imposable.
            </li>
            <li>
              <strong>Les compartiments sont conservés.</strong> Vos versements volontaires déduits,
              non déduits et les sommes issues de l'épargne salariale ou des versements obligatoires
              restent distingués dans le contrat d'arrivée, car c'est cette ventilation qui
              détermine la fiscalité de sortie (voir notre guide sur la{" "}
              <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a>). Le{" "}
              <a href="/guide/deblocage-anticipe-per">déblocage anticipé</a> reste lui aussi
              possible dans les mêmes cas après le transfert.
            </li>
            <li>
              <strong>Vous changez de contrat, donc de conditions.</strong> Les frais, les supports,
              le fonds en euros éventuel et ses conditions d'accès, le mode de gestion : tout cela
              relève du nouveau contrat. C'est précisément l'intérêt de l'opération, et son risque.
            </li>
          </ul>

          <h2 id="frais">Les frais de transfert : un plafond légal, une gratuité après cinq ans</h2>
          <p>
            Le législateur a encadré la sortie d'un PER vers un autre PER pour que le changement de
            contrat reste possible. Les frais de transfert sont plafonnés par la loi tant que le plan
            a moins de cinq ans, et ne peuvent plus être facturés au-delà de cinq ans de détention.
            Les conditions précises (assiette, plafond exact, calcul de l'ancienneté) figurent dans
            les conditions générales de votre contrat : demandez-les par écrit plutôt que de vous
            fier à une estimation orale du conseiller.
          </p>
          <p>
            Un point trompe souvent : le plafond légal ne concerne que les frais de transfert
            proprement dits. Il ne couvre pas les frais que le contrat d'arrivée peut facturer sur
            les versements ultérieurs, ni les frais de gestion annuels, ni les frais des supports.
            Pour une comparaison complète, reportez-vous à notre guide sur{" "}
            <a href="/guide/combien-coute-un-per">le coût réel d'un PER</a>, qui détaille la grille
            poste par poste.
          </p>
          <div className="note">
            <p>
              Un transfert gratuit ne signifie pas un transfert sans coût caché. Si vos supports
              actuels sont vendus pour être remplacés par d'autres, les arbitrages se font aux
              valeurs du jour : sur des unités de compte, le moment choisi pour la bascule peut
              figer une moins-value ou, à l'inverse, vous exposer aux marchés à un moment défavorable.
            </p>
          </div>

          <h2 id="delais">Les délais et le déroulé de la démarche</h2>
          <p>
            La démarche s'effectue à l'initiative du gestionnaire d'arrivée : vous signez une
            demande de transfert, il la transmet au gestionnaire de départ, qui dispose d'un délai
            légal limité — de l'ordre de deux mois à compter de la réception de la demande — pour
            verser les fonds. Ce délai court sous réserve d'un dossier complet ; une pièce manquante
            ou un support difficile à liquider (certains fonds immobiliers par exemple) peut
            l'allonger en pratique.
          </p>
          <ol>
            <li>Demandez à votre gestionnaire actuel un relevé détaillé : encours par compartiment, ancienneté du plan, supports détenus, garanties éventuelles.</li>
            <li>Comparez avec la proposition du contrat d'arrivée, grille de frais complète à l'appui.</li>
            <li>Signez la demande de transfert chez le gestionnaire d'arrivée, qui se charge du reste.</li>
            <li>Vérifiez à réception des fonds que la ventilation par compartiment est reproduite à l'identique.</li>
          </ol>
          <p>
            Pendant la durée du transfert, votre épargne n'est généralement pas investie sur les
            marchés : prévoyez cette période d'immobilisation dans votre réflexion.
          </p>

          <h2 id="anciens">Les anciens contrats : PERP, Madelin, article 83</h2>
          <p>
            Les contrats retraite antérieurs à la loi Pacte (PERP, contrats Madelin, contrats
            « article 83 ») peuvent eux aussi être transférés vers un PER, mais la prudence est ici
            plus grande : certains contiennent des garanties difficiles à reproduire — taux minimum
            garanti historique, conditions de rente particulières, régime fiscal propre. Avant tout
            transfert, il faut savoir précisément ce que l'ancien contrat promet encore, car une
            fois le transfert effectué, ces conditions ne se retrouvent pas.
          </p>
          <p>
            Pour les indépendants, notre guide{" "}
            <a href="/guide/retraite-independants-per-ou-madelin">PER ou Madelin</a> détaille cet
            arbitrage : rien n'oblige à fermer un contrat existant, et conserver un ancien contrat
            tout en ouvrant un PER pour les nouveaux versements est une option légitime.
          </p>

          <h2 id="verifier">Avant de transférer : sept vérifications</h2>
          <ol>
            <li><strong>L'ancienneté du plan.</strong> À cinq ans ou plus, aucun frais de transfert ; en dessous, le coût est à chiffrer.</li>
            <li><strong>Le total des frais courants</strong> des deux contrats, supports compris, comparé sur la même base.</li>
            <li><strong>Les supports effectivement accessibles</strong> : un choix large sur le papier peut cacher des frais d'arbitrage ou des fonds réservés à certains profils.</li>
            <li><strong>Le mode de gestion</strong> du contrat d'arrivée : la gestion pilotée à horizon est souvent appliquée par défaut, avec sa propre couche de frais (voir notre guide sur le <a href="/guide/per-bancaire-frais-gestion-horizon">PER bancaire</a>).</li>
            <li><strong>Les garanties de l'ancien contrat</strong> (fonds en euros, rente, clauses spécifiques) qui seraient perdues.</li>
            <li><strong>La ventilation par compartiment</strong> après transfert, à contrôler sur le premier relevé.</li>
            <li><strong>Les clauses bénéficiaires</strong> : elles ne suivent pas automatiquement et doivent être redéfinies sur le nouveau contrat, faute de quoi la clause par défaut s'applique en cas de décès.</li>
          </ol>

          <h2 id="quand">Quand le transfert vaut la peine, et quand il ne vaut pas la peine</h2>
          <p>
            Piste de réflexion, à adapter à votre situation : le transfert est le plus justifié
            lorsque trois conditions se cumulent — un plan de plus de cinq ans (donc sans frais de
            transfert), un écart de frais courants net et durable en faveur du nouveau contrat, et
            un horizon encore long avant la sortie, pendant lequel cet écart se capitalise. À
            l'inverse, il l'est peu quand l'écart de frais est faible, quand l'horizon de sortie est
            proche, ou quand l'ancien contrat porte une garantie que le nouveau ne reproduit pas.
          </p>
          <p>
            Un contre-argument à garder en tête : une économie de frais n'a de valeur que si elle
            n'est pas compensée par une moins bonne gestion de votre allocation. Changer de contrat
            pour de meilleurs supports n'a d'intérêt que si vous êtes capable de les utiliser de
            façon cohérente avec votre horizon et votre tolérance au risque — sinon, le gain de
            frais se perd en erreurs d'allocation.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Un transfert de PER déclenche-t-il de l'impôt ?</h3>
          <p>
            Non, le transfert entre deux PER n'est pas un fait générateur d'impôt : les sommes ne
            sont ni réintégrées au revenu imposable, ni soumises aux prélèvements sociaux au moment
            du transfert. La fiscalité s'appliquera à la sortie, selon la nature des compartiments.
          </p>
          <h3>Mon ancienneté est-elle conservée ?</h3>
          <p>
            Pour la fiscalité, c'est la nature des versements qui compte et elle est conservée.
            L'ancienneté du plan, elle, sert surtout à apprécier les frais de transfert ; elle ne
            conditionne pas la fiscalité de sortie du PER de la même manière que dans une
            assurance-vie.
          </p>
          <h3>Puis-je transférer une partie seulement de mon PER ?</h3>
          <p>
            En règle générale, le transfert porte sur la totalité de l'épargne du plan. La
            possibilité de transférer partiellement dépend des conditions du contrat et doit être
            confirmée par écrit auprès du gestionnaire.
          </p>
          <h3>Peut-on transférer une assurance-vie vers un PER ?</h3>
          <p>
            Non, ce sont deux enveloppes distinctes aux régimes fiscaux différents : le transfert
            prévu par la loi concerne les produits d'épargne retraite. Pour comparer les deux
            enveloppes, voir notre{" "}
            <a href="/guide/per-vs-assurance-vie-retraite">comparatif PER et assurance-vie</a>.
          </p>
          <h3>Le conseiller qui me propose un transfert est-il neutre ?</h3>
          <p>
            Pas nécessairement : une nouvelle souscription génère des frais et des commissions pour
            celui qui la vend. Demandez-lui de comparer par écrit les deux grilles de frais, supports
            compris, et ce que vous perdez éventuellement en quittant l'ancien contrat. Notre guide{" "}
            <a href="/guide/quel-est-le-meilleur-per">quel est le meilleur PER</a> propose une grille
            de lecture applicable à n'importe quel contrat.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le transfert de PER est un droit réel, encadré, sans imposition immédiate et gratuit
            après cinq ans de détention. Il neutralise l'argument selon lequel un mauvais contrat
            serait une prison. Mais il ne dispense pas du travail de fond : comparer des frais
            totaux sur la même base, mesurer ce que l'on abandonne (garanties, supports, clauses),
            et s'assurer que le gain attendu ne dépend pas d'une allocation que l'on ne saurait pas
            tenir. C'est ce que nous regardons dans un <a href="/bilan-retraite">bilan retraite</a> :
            la grille de frais de votre contrat actuel, l'ancienneté et la ventilation de votre plan,
            et l'écart réel avec les alternatives.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle, et les
              modalités du transfert (frais, délais, transfert partiel) varient d'un contrat à
              l'autre. Les règles décrites sont celles connues en {HYPOTHESES_MAJ}, susceptibles
              d'évoluer, et à vérifier avant toute décision. Ne confondez pas supports garantis et
              unités de compte : sur ces dernières, la valeur de l'épargne dépend des marchés, et les
              performances passées ne préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Votre PER est-il au bon endroit ?"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
