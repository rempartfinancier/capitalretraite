import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { TRANSMISSION, HYPOTHESES_MAJ, euros } from "../components/hypotheses.js";

// Abattement cumulé donation (un parent, un enfant) sur deux générations de
// renouvellement, pour situer un ordre de grandeur sur trente ans.
const abattementDonationDeuxCycles = TRANSMISSION.abattementDonationParEnfant * 2;

// Abattement cumulé assurance-vie pour un couple de parents vers un même
// enfant (deux contrats, un par parent, versements avant 70 ans).
const abattementAvDeuxParents = TRANSMISSION.abattementSuccessionAvParBeneficiaire * 2;

export default function GuideDonationOuAssuranceVie() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Transmission</span>
          <h1>Donation ou assurance-vie : comment transmettre à ses enfants ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> donation et assurance-vie ne sont pas deux options
              concurrentes, mais deux canaux juridiques différents et souvent complémentaires. La
              donation ouvre un abattement de {euros(TRANSMISSION.abattementDonationParEnfant)}{" "}
              par parent et par enfant, renouvelable tous les{" "}
              {TRANSMISSION.renouvellementDonationAnnees} ans, mais elle transfère la propriété
              immédiatement et irrévocablement. L'assurance-vie ouvre un abattement de{" "}
              {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} par bénéficiaire pour les
              versements effectués avant 70 ans, reste hors succession, et demeure modifiable
              jusqu'au décès via la clause bénéficiaire. Le bon choix n'oppose pas les deux outils :
              il dose l'un et l'autre selon ce que vous voulez transmettre, et selon le degré de
              contrôle que vous souhaitez garder de votre vivant.
            </p>
          </div>

          <p>
            La question revient presque toujours de la même façon en rendez-vous : « J'aimerais
            aider mes enfants maintenant, ou préparer leur héritage — faut-il faire une donation, ou
            plutôt ouvrir une assurance-vie à leur profit ? » Elle part d'une bonne intuition : les
            deux outils permettent effectivement de faire passer un capital à la génération suivante
            en dehors — ou en marge — du droit commun des successions. Mais elle mélange souvent deux
            logiques qui n'ont ni le même moment d'effet, ni le même degré de réversibilité, ni le
            même véhicule juridique.
          </p>
          <p>
            Une donation est un acte civil : elle transfère la propriété d'un bien ou d'une somme
            d'argent de votre vivant, et ce transfert est en principe définitif. Une assurance-vie,
            elle, reste une enveloppe d'épargne dont vous restez seul maître tant que vous êtes en
            vie ; ce n'est qu'à votre décès qu'elle produit son effet de transmission, via la clause
            bénéficiaire que vous pouvez modifier autant de fois que vous le souhaitez d'ici là. Deux
            outils, deux moments, deux niveaux d'engagement — et c'est précisément cette différence
            qui, une fois comprise, permet de les faire travailler ensemble plutôt que de choisir
            l'un contre l'autre.
          </p>
          <p>
            Ce guide déroule les deux mécaniques en détail, les compare point par point dans un
            tableau récapitulatif, revient sur la question du cumul des deux abattements, puis
            propose des repères qualitatifs pour orienter votre réflexion — sans jamais se substituer
            à l'accompagnement d'un notaire ou d'un conseiller pour la mise en œuvre concrète, qui
            reste indispensable sur un sujet aussi structurant que le droit civil de la transmission.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#deux-logiques">Donation et assurance-vie : deux logiques de transmission différentes</a></li>
              <li><a href="#donation">La donation : un abattement de {euros(TRANSMISSION.abattementDonationParEnfant)} tous les {TRANSMISSION.renouvellementDonationAnnees} ans, mais un geste irrévocable</a></li>
              <li><a href="#assurance-vie">L'assurance-vie : un outil hors succession, mais révocable jusqu'au décès</a></li>
              <li><a href="#cumul">Peut-on cumuler les deux abattements ?</a></li>
              <li><a href="#tableau">Le comparatif donation / assurance-vie en un tableau</a></li>
              <li><a href="#dosage">Quel dosage retenir selon votre situation ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="deux-logiques">Donation et assurance-vie : deux logiques de transmission différentes</h2>
          <p>
            Avant de comparer les chiffres, il faut comparer les natures. La donation relève du droit
            civil : c'est un contrat entre le donateur (celui qui donne) et le donataire (celui qui
            reçoit), qui doit en principe être accepté par ce dernier, et qui produit un effet
            immédiat sur la propriété du bien ou de la somme donnée. Une fois l'acte passé — parfois
            devant notaire, parfois par un simple don manuel selon la nature du bien — le donateur ne
            peut plus, sauf exceptions très encadrées par la loi (comme l'ingratitude du donataire ou
            certaines clauses de retour), reprendre ce qu'il a donné.
          </p>
          <p>
            L'assurance-vie, elle, relève du droit des assurances et du droit des contrats. Le
            souscripteur (celui qui ouvre et alimente le contrat) reste juridiquement propriétaire de
            son épargne de son vivant : il peut retirer son argent, changer de supports, et surtout
            modifier la clause bénéficiaire (la clause qui désigne qui recevra le capital au décès) à
            tout moment, sans avoir à en informer ni à en justifier auprès des bénéficiaires
            pressentis. Ce n'est qu'au décès du souscripteur que le capital quitte réellement son
            patrimoine pour rejoindre celui du ou des bénéficiaires désignés — et il le fait alors en
            dehors du cadre classique de la succession, avec une fiscalité qui lui est propre.
          </p>
          <p>
            Cette différence de nature a une conséquence directe sur l'usage de chaque outil. La
            donation s'adresse à qui veut aider concrètement, maintenant : financer des études, un
            premier achat immobilier, un projet professionnel. Elle a un coût réel et immédiat pour le
            donateur, qui se dessaisit véritablement du bien. L'assurance-vie s'adresse davantage à
            une logique de constitution d'un capital que l'on garde sous contrôle de son vivant, tout
            en préparant sa transmission — un outil de prévoyance autant que de transmission, qui ne
            demande aucun renoncement immédiat à la disponibilité de l'épargne.
          </p>

          <h2 id="donation">La donation : un abattement de {euros(TRANSMISSION.abattementDonationParEnfant)} tous les {TRANSMISSION.renouvellementDonationAnnees} ans, mais un geste irrévocable</h2>
          <p>
            En ligne directe — c'est-à-dire d'un parent vers un enfant — chaque parent peut donner
            jusqu'à {euros(TRANSMISSION.abattementDonationParEnfant)} à chacun de ses enfants sans
            aucun droit de donation à payer. Ce montant s'apprécie par parent et par enfant : un
            couple avec deux enfants dispose ainsi, en théorie, de quatre abattements distincts
            (chaque parent vers chaque enfant), ce qui peut permettre de transmettre des sommes
            substantielles en franchise de droits lorsque la situation familiale et patrimoniale s'y
            prête. Au-delà de cet abattement, la donation reste possible, mais elle est alors soumise
            au barème progressif des droits de donation en ligne directe.
          </p>
          <p>
            Point central, souvent mal connu : cet abattement n'est pas un capital qui s'épuise une
            fois pour toutes. Il se reconstitue intégralement tous les{" "}
            {TRANSMISSION.renouvellementDonationAnnees} ans. Concrètement, un parent qui donne{" "}
            {euros(TRANSMISSION.abattementDonationParEnfant)} à son enfant aujourd'hui pourra, une
            fois ce délai écoulé, lui donner à nouveau jusqu'à{" "}
            {euros(TRANSMISSION.abattementDonationParEnfant)} en franchise de droits — soit, sur deux
            cycles, un potentiel cumulé de l'ordre de{" "}
            {euros(abattementDonationDeuxCycles)} par parent et par enfant. C'est ce mécanisme de
            renouvellement qui transforme la donation en un outil de planification patrimoniale sur
            la durée, et non en un geste isolé : plus tôt on commence à en profiter, plus on a de
            chances de pouvoir renouveler l'opération avant que la succession ne s'ouvre.
          </p>
          <p>
            Mais ce même mécanisme a un revers qu'aucun abattement ne compense : l'irrévocabilité.
            Une fois la donation faite, le bien ou la somme donnée sort définitivement du patrimoine
            du donateur — c'est même l'un des principes cardinaux du droit des donations, résumé par
            l'adage « donner et retenir ne vaut ». Concrètement, cela signifie qu'un parent qui donne
            une somme importante à un enfant ne peut pas, si sa propre situation financière se
            dégrade par la suite (perte de revenus, dépenses de santé, allongement de l'espérance de
            vie et donc des besoins de financement de la fin de vie), revenir sur ce choix. La
            donation exige donc, avant tout acte, de s'assurer que ce que l'on transmet ne
            correspond pas à une réserve dont on pourrait avoir besoin plus tard.
          </p>
          <p>
            Une nuance mérite d'être signalée sans être développée ici : il existe des montages qui
            permettent de donner un bien tout en conservant certains droits dessus — c'est le cas du
            démembrement de propriété, qui sépare la nue-propriété (le droit de disposer du bien) de
            l'usufruit (le droit d'en percevoir les revenus ou de l'occuper). Cette technique peut
            atténuer, pour certains actifs, le caractère absolu de la perte de contrôle. Sa mécanique
            précise — barème de l'usufruit selon l'âge du donateur, articulation avec les abattements
            de donation — dépend de nombreux paramètres propres à chaque situation ; elle s'étudie au
            cas par cas avec un notaire, et nous ne détaillerons pas son calcul ici.
          </p>
          <div className="note">
            <p>
              La donation reste un acte de droit civil aux conséquences durables. Les formes qu'elle
              peut prendre (don manuel, donation notariée, donation-partage entre plusieurs enfants,
              avec ou sans démembrement) répondent à des règles précises qui dépassent le cadre de cet
              article : seul un notaire peut sécuriser la forme adaptée à votre situation familiale et
              patrimoniale.
            </p>
          </div>

          <h2 id="assurance-vie">L'assurance-vie : un outil hors succession, mais révocable jusqu'au décès</h2>
          <p>
            L'assurance-vie fonctionne sur une mécanique fiscale distincte, fixée par l'article 990 I
            du Code général des impôts. Pour les sommes versées sur le contrat avant les 70 ans du
            souscripteur, chaque bénéficiaire désigné dans la clause bénéficiaire profite d'un
            abattement de {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} sur les capitaux
            qu'il reçoit au décès — un abattement qui s'apprécie par bénéficiaire, et qui s'ajoute,
            sans lien de dépendance directe, aux abattements de droit commun applicables en matière
            de succession. Au-delà de ce seuil, une taxation forfaitaire s'applique sur la fraction
            excédentaire, à un taux qui reste, dans la plupart des configurations familiales,
            nettement plus favorable que le barème progressif des droits de succession.
          </p>
          <p>
            Pour les sommes versées après les 70 ans du souscripteur, le régime change : l'abattement
            tombe à {euros(TRANSMISSION.abattementSuccessionAvApres70Collectif)}, et surtout, il n'est
            plus apprécié par bénéficiaire mais globalement, pour l'ensemble des bénéficiaires du
            contrat. Les intérêts et plus-values générés par ces versements tardifs échappent en
            revanche aux droits de succession, seul le capital versé étant concerné par cet
            abattement réduit — une nuance qui explique pourquoi verser tôt sur une assurance-vie,
            avant 70 ans, reste généralement plus efficace du point de vue de la transmission.
          </p>
          <p>
            Ce qui distingue fondamentalement l'assurance-vie de la donation, c'est le moment où le
            transfert devient réel et le degré de contrôle conservé jusque-là. Tant que le
            souscripteur est vivant, l'argent placé sur le contrat lui appartient pleinement : il peut
            en disposer, le retirer, l'arbitrer entre différents supports, et surtout revoir la clause
            bénéficiaire à tout moment — ajouter un bénéficiaire, en retirer un, modifier la
            répartition entre plusieurs enfants — sans qu'aucun des bénéficiaires pressentis n'ait à y
            consentir ni même à en être informé. C'est seulement au décès que le capital quitte
            véritablement le patrimoine du souscripteur pour rejoindre celui des bénéficiaires
            désignés, en dehors de la masse successorale classique. Notre page{" "}
            <a href="/strategies/assurance-vie-retraite">l'assurance-vie comme outil retraite</a>{" "}
            détaille par ailleurs son fonctionnement d'ensemble, transmission comprise.
          </p>
          <p>
            Cette réversibilité a un prix : contrairement à la donation, l'assurance-vie n'offre
            aucune garantie au bénéficiaire pressenti. Un enfant que l'on pense favoriser dans la
            clause bénéficiaire peut, légalement, en être retiré du jour au lendemain sans recours
            possible de sa part de son vivant. C'est un outil de transmission qui reste, jusqu'au bout,
            entièrement entre les mains du souscripteur — ce qui en fait à la fois sa souplesse et sa
            limite pour qui cherche une garantie ferme donnée à un proche.
          </p>
          <p>
            Bon à savoir également : la rédaction précise de la clause bénéficiaire mérite une
            attention particulière, indépendamment du sujet de cet article — une clause mal rédigée ou
            jamais mise à jour après un changement de situation familiale peut produire des effets
            très éloignés de l'intention réelle du souscripteur. Notre guide sur les{" "}
            <a href="/guide/risques-assurance-vie">risques de l'assurance-vie</a> revient sur ce point
            de vigilance.
          </p>

          <h2 id="cumul">Peut-on cumuler les deux abattements ?</h2>
          <p>
            C'est la question qui revient le plus souvent une fois les deux mécaniques comprises : un
            parent qui a déjà utilisé son abattement de donation envers un enfant peut-il, en plus,
            lui laisser un capital via une assurance-vie en franchise de l'abattement de{" "}
            {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} ? La réponse, dans les grandes
            lignes, est oui : donation et assurance-vie empruntent deux canaux juridiques distincts,
            régis par des articles différents du Code général des impôts, et l'utilisation de l'un
            n'entame en rien le plafond de l'autre. Un même parent peut, en théorie, transmettre à un
            même enfant jusqu'à {euros(TRANSMISSION.abattementDonationParEnfant)} par la donation et
            jusqu'à {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} par l'assurance-vie,
            sans qu'aucun des deux montants ne vienne réduire l'autre. Pour un enfant recevant de ses
            deux parents via deux contrats distincts, le potentiel cumulé de l'abattement
            assurance-vie peut ainsi atteindre, en ordre de grandeur, {euros(abattementAvDeuxParents)}.
          </p>
          <p>
            Cette complémentarité explique pourquoi, dans les patrimoines que nous accompagnons, les
            deux outils sont très souvent utilisés en parallèle plutôt que l'un à la place de l'autre :
            la donation pour transmettre une somme définie, maintenant, avec l'irrévocabilité qui
            l'accompagne ; l'assurance-vie pour continuer à constituer et faire fructifier un capital
            dont la transmission ne deviendra effective qu'au décès, tout en gardant la main dessus
            jusque-là.
          </p>
          <p>
            Une réserve s'impose cependant, et elle est de taille : cette complémentarité suppose que
            chaque outil soit utilisé pour ce qu'il est. L'administration fiscale peut requalifier une
            opération en abus de droit fiscal lorsqu'elle estime qu'un contrat d'assurance-vie a été
            souscrit dans le seul but de déguiser une donation — par exemple un versement massif
            réalisé par une personne très âgée ou gravement malade au moment du versement, sur un
            contrat dont elle ne peut plus, dans les faits, espérer profiter de son vivant. Dans une
            telle configuration, l'administration peut requalifier les sommes versées en donation
            indirecte, avec application des droits de donation ou de succession de droit commun. Ce
            risque ne doit pas être vu comme une case à cocher que l'on évite mécaniquement, mais
            comme une raison supplémentaire de ne jamais construire seul une stratégie de cumul des
            deux abattements sans un accompagnement professionnel qui pourra apprécier, au cas par
            cas, l'âge, l'état de santé et l'ensemble de la situation patrimoniale au moment de
            l'opération.
          </p>

          <h2 id="tableau">Le comparatif donation / assurance-vie en un tableau</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Donation</th>
                  <th>Assurance-vie</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Moment du transfert</td>
                  <td>Immédiat, dès l'acte de donation</td>
                  <td>Différé au décès du souscripteur</td>
                </tr>
                <tr>
                  <td>Irrévocabilité</td>
                  <td>Définitive une fois l'acte passé (« donner et retenir ne vaut »)</td>
                  <td>Aucune — clause bénéficiaire modifiable à tout moment du vivant</td>
                </tr>
                <tr>
                  <td>Montant de l'abattement</td>
                  <td>{euros(TRANSMISSION.abattementDonationParEnfant)} par parent et par enfant</td>
                  <td>
                    {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} par bénéficiaire
                    (versements avant 70 ans) ; {euros(TRANSMISSION.abattementSuccessionAvApres70Collectif)}{" "}
                    collectif au-delà (barème en vigueur en {HYPOTHESES_MAJ})
                  </td>
                </tr>
                <tr>
                  <td>Renouvellement de l'abattement</td>
                  <td>Tous les {TRANSMISSION.renouvellementDonationAnnees} ans</td>
                  <td>Non applicable — l'abattement s'apprécie au décès, une seule fois</td>
                </tr>
                <tr>
                  <td>Contrôle conservé par le donateur / souscripteur</td>
                  <td>Aucun après l'acte — le bien quitte définitivement son patrimoine</td>
                  <td>Total de son vivant : retraits, arbitrages, changement de bénéficiaire possibles</td>
                </tr>
                <tr>
                  <td>Consentement du bénéficiaire</td>
                  <td>En principe requis (acceptation de la donation)</td>
                  <td>Aucun — le bénéficiaire n'a pas à être informé de son vivant</td>
                </tr>
                <tr>
                  <td>Utilité principale</td>
                  <td>Aider concrètement maintenant (études, achat, projet)</td>
                  <td>Préparer une transmission future tout en gardant l'épargne disponible</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les montants et délais de ce tableau sont ceux en vigueur en {HYPOTHESES_MAJ} ; chaque loi
            de finances peut faire évoluer les abattements et les seuils, et il convient de les
            revérifier avant toute décision.
          </p>

          <h2 id="dosage">Quel dosage retenir selon votre situation ?</h2>
          <p>
            Il n'existe pas de règle universelle de répartition entre donation et assurance-vie —
            et se méfier de quiconque en propose une sans connaître votre situation est un réflexe
            sain. Quelques repères qualitatifs peuvent néanmoins orienter la réflexion. Si l'objectif
            est d'aider un enfant à financer un projet précis et daté (des études, un premier achat
            immobilier), la donation répond directement au besoin, à condition que la somme donnée ne
            prive pas le donateur d'une réserve dont il pourrait avoir besoin plus tard — un point
            d'autant plus sensible que l'espérance de vie à la retraite s'allonge et que les besoins
            de financement d'une éventuelle dépendance restent difficiles à anticiper.
          </p>
          <p>
            Si l'objectif est davantage de préparer une transmission progressive tout en gardant la
            main sur son épargne de son vivant — pour faire face à un imprévu, ajuster ses choix selon
            l'évolution de la situation familiale, ou simplement ne pas se dessaisir prématurément —
            l'assurance-vie offre une souplesse que la donation ne permet pas. Beaucoup de foyers
            combinent d'ailleurs les deux dans le temps : une donation ponctuelle à un moment clé
            (installation professionnelle d'un enfant, par exemple), et des versements réguliers sur
            une ou plusieurs assurances-vie en parallèle, avec des bénéficiaires ajustés au fil des
            années.
          </p>
          <p>
            Le nombre d'enfants, l'écart d'âge entre eux, l'existence d'un patrimoine immobilier à
            transmettre en plus des capitaux financiers, la situation matrimoniale du donateur, et
            l'anticipation d'une éventuelle mésentente entre héritiers sont autant de paramètres qui
            peuvent faire pencher la balance différemment d'une famille à l'autre. C'est précisément
            pour cette raison qu'une transmission bien construite se fait presque toujours
            accompagnée : notre guide{" "}
            <a href="/guide/conseiller-ou-gerer-seul-sa-retraite">
              faut-il se faire accompagner ou gérer seul sa retraite ?
            </a>{" "}
            aborde cette question de l'accompagnement sous un angle plus large, mais la conclusion
            vaut tout autant pour la transmission : plus les enjeux sont irréversibles, comme c'est le
            cas d'une donation, plus l'avis d'un professionnel — notaire pour l'acte, conseiller pour
            la vision d'ensemble du patrimoine — devient utile en amont de la décision.
          </p>
          <p>
            Pour resituer ces deux outils dans une réflexion patrimoniale plus large, notre guide{" "}
            <a href="/guide/per-ou-immobilier-locatif">
              PER ou immobilier locatif : lequel privilégier pour transmettre ?
            </a>{" "}
            traite la même question de la transmission sous un angle différent, celui de l'arbitrage
            entre plan d'épargne retraite et immobilier locatif — un complément utile si votre
            patrimoine dépasse le seul cadre donation / assurance-vie.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Faut-il l'accord de mes enfants pour ouvrir une assurance-vie à leur profit ?</h3>
          <p>
            Non. Vous pouvez désigner un enfant comme bénéficiaire d'une assurance-vie, et modifier
            cette désignation par la suite, sans avoir à l'en informer ni à recueillir son accord. Le
            bénéficiaire n'acquiert un droit sur le capital qu'au moment du décès du souscripteur.
          </p>
          <h3>Une donation faite il y a plus de {TRANSMISSION.renouvellementDonationAnnees} ans compte-t-elle encore lors de la succession ?</h3>
          <p>
            Non, sous réserve des règles en vigueur au moment des faits : une fois le délai de{" "}
            {TRANSMISSION.renouvellementDonationAnnees} ans écoulé depuis une donation, un nouvel
            abattement de {euros(TRANSMISSION.abattementDonationParEnfant)} redevient disponible entre
            le même donateur et le même donataire, sans tenir compte de la donation antérieure pour le
            calcul des droits.
          </p>
          <h3>Puis-je désigner mes petits-enfants comme bénéficiaires d'une assurance-vie ?</h3>
          <p>
            Oui, rien n'impose que les bénéficiaires soient des enfants directs : petits-enfants,
            neveux, concubin, ou toute autre personne peuvent être désignés dans la clause
            bénéficiaire. L'abattement de {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)}{" "}
            s'apprécie par bénéficiaire, quel que soit son lien de parenté avec le souscripteur, ce qui
            distingue nettement l'assurance-vie du régime de la donation, plus favorable en ligne
            directe.
          </p>
          <h3>Que se passe-t-il si je ne désigne aucun bénéficiaire particulier sur mon assurance-vie ?</h3>
          <p>
            En l'absence de clause bénéficiaire ou si celle-ci est jugée invalide, le capital réintègre
            en principe la succession classique du souscripteur, avec application des droits de
            succession de droit commun et perte de l'abattement dédié à l'assurance-vie. Vérifier la
            rédaction et l'actualité de sa clause bénéficiaire est donc une étape à ne jamais négliger.
          </p>
          <h3>La donation d'un bien immobilier fonctionne-t-elle comme celle d'une somme d'argent ?</h3>
          <p>
            Les grands principes de l'abattement sont identiques, mais la donation d'un bien
            immobilier implique en pratique un acte notarié et peut s'accompagner de mécanismes
            spécifiques, comme le démembrement de propriété évoqué plus haut. Ces aspects, propres au
            droit civil de l'immobilier, s'étudient au cas par cas avec un notaire.
          </p>
          <h3>Donner de son vivant est-il toujours plus avantageux fiscalement qu'attendre la succession ?</h3>
          <p>
            C'est souvent le cas, notamment parce que la donation permet de profiter plusieurs fois de
            l'abattement grâce à son renouvellement tous les {TRANSMISSION.renouvellementDonationAnnees}{" "}
            ans, ce qu'une succession unique ne permet pas. Mais l'avantage fiscal ne doit jamais
            primer sur la sécurité financière du donateur : donner de son vivant n'a de sens que si la
            somme donnée n'est pas nécessaire à son propre train de vie ou à ses projets futurs.
          </p>
          <h3>L'assurance-vie permet-elle d'avantager un enfant par rapport à un autre ?</h3>
          <p>
            Sur le plan fiscal et contractuel, oui : la clause bénéficiaire peut répartir le capital de
            façon inégale entre plusieurs enfants. Sur le plan civil, en revanche, des règles
            protectrices existent en matière de succession (la réserve héréditaire, qui garantit à
            chaque enfant une part minimale du patrimoine du défunt) et peuvent, dans certaines
            configurations, être invoquées si les sommes versées apparaissent manifestement excessives
            au regard du patrimoine du souscripteur. Ce point de vigilance justifie, une fois encore,
            un avis notarial avant toute stratégie de répartition inégale.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Reprenons le fil. Donation et assurance-vie ne se disputent pas la même place dans une
            stratégie de transmission : la première agit maintenant, de façon définitive, avec un
            abattement de {euros(TRANSMISSION.abattementDonationParEnfant)} par parent et par enfant
            qui se renouvelle tous les {TRANSMISSION.renouvellementDonationAnnees} ans ; la seconde
            agit au décès, tout en laissant le souscripteur entièrement maître de son épargne jusque-là,
            avec un abattement de {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} par
            bénéficiaire pour les versements réalisés avant 70 ans. Dans la plupart des situations que
            nous rencontrons, la question n'est donc pas « lequel choisir », mais « comment doser les
            deux dans le temps », en tenant compte du besoin réel des enfants aujourd'hui, de la
            réserve de sécurité que le donateur souhaite conserver, et du degré de contrôle qu'il veut
            garder sur son épargne.
          </p>
          <p>
            Le cumul des deux abattements est en général possible, car ce sont deux canaux juridiques
            distincts — mais il ne doit jamais être manié comme une simple case à cocher : la vigilance
            sur l'abus de droit fiscal, la rédaction précise de la clause bénéficiaire, et l'équilibre
            entre les enfants sont autant de points qui gagnent à être vérifiés avec un professionnel
            avant toute opération significative. Notre page{" "}
            <a href="/strategies/assurance-vie-retraite">assurance-vie et retraite</a> et notre guide{" "}
            <a href="/guide/per-ou-immobilier-locatif">
              PER ou immobilier locatif pour transmettre
            </a>{" "}
            complètent utilement cette réflexion si votre patrimoine dépasse le seul couple
            donation / assurance-vie. C'est aussi l'un des sujets que nous abordons systématiquement
            lors d'un {" "}
            <a href="/bilan-retraite">bilan retraite gratuit</a> : la transmission ne se prépare
            jamais isolément, elle s'articule avec vos propres besoins de revenus à la retraite.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et de nature pédagogique ; elle ne constitue pas un conseil
              juridique, fiscal ou notarial personnalisé. Le droit civil de la donation et les
              mécanismes de démembrement de propriété évoqués ici dépendent de règles précises et de
              paramètres propres à chaque situation familiale et patrimoniale : ils doivent
              impérativement être validés avec un notaire avant toute mise en œuvre. Les montants et
              abattements cités sont les barèmes en vigueur en {HYPOTHESES_MAJ}, susceptibles d'évoluer
              à chaque loi de finances.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Parlons de votre stratégie de transmission dans le cadre plus large de votre retraite"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
