import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  REGIME_GENERAL,
  ILLUSTRATIF,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

// Gain de pension mensuelle illustratif pour un trimestre validé : on part
// d'une pension mensuelle illustrative (ILLUSTRATIF.pensionMensuelleIllustrative)
// et on applique le taux de décote/surcote par trimestre du régime général.
// Purement pédagogique — aucun lien avec un prix de rachat réel.
const gainMensuelIllustratifParTrimestre =
  (ILLUSTRATIF.pensionMensuelleIllustrative * REGIME_GENERAL.decoteParTrimestre) / 100;

export default function GuideCoutRachatTrimestres() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Le coût que personne ne détaille</span>
          <h1>Combien coûte le rachat de trimestres pour la retraite ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> il n'existe pas de prix fixe pour un trimestre
              racheté (le nom officiel est « versement pour la retraite », parfois encore appelé
              « rachat Fillon » par habitude). Le montant dépend de trois paramètres propres à
              votre situation — l'âge que vous avez au moment de la demande, votre revenu des
              trois dernières années, et l'option choisie (taux seul, ou taux et durée
              d'assurance) — et il évolue chaque année selon un barème publié par l'administration.
              Seul le simulateur officiel sur{" "}
              <a href="https://www.info-retraite.fr" target="_blank" rel="noopener noreferrer">
                info-retraite.fr
              </a>{" "}
              ou{" "}
              <a href="https://www.service-public.fr" target="_blank" rel="noopener noreferrer">
                service-public.fr
              </a>{" "}
              peut vous donner un montant réel. Ce que l'on peut en revanche établir sans
              simulateur : vous ne pouvez pas racheter plus de{" "}
              {REGIME_GENERAL.rachatTrimestresPlafond} trimestres au total, et la rentabilité de
              l'opération se juge en comparant ce que vous payez au gain de pension mensuelle que
              vous toucherez ensuite, multiplié par le nombre d'années où vous percevrez cette
              pension.
            </p>
          </div>

          <p>
            « Combien ça va me coûter, racheter mes trimestres manquants ? » C'est la première
            question que pose presque tout le monde en découvrant ce dispositif — et c'est
            précisément la question à laquelle aucun article sérieux ne peut répondre par un
            chiffre unique, malgré ce que laissent parfois entendre certains titres racoleurs en
            ligne. Prenons une situation composite, illustrative, construite à partir de profils
            que nous croisons régulièrement en rendez-vous : un cadre de 58 ans découvre, en
            consultant son relevé de carrière, qu'il lui manque six trimestres pour partir à taux
            plein à 64 ans. Il cherche un prix. Il tombe sur des exemples chiffrés très différents
            les uns des autres, sans comprendre pourquoi le rachat d'un collègue du même âge
            coûterait un montant totalement différent du sien.
          </p>
          <p>
            La réponse tient en une phrase, et elle mérite d'être comprise avant d'aller plus
            loin : le prix d'un trimestre n'est pas un tarif catalogue, c'est le résultat d'un
            calcul actuariel (une évaluation financière qui tient compte de la probabilité et de
            la durée du versement futur d'une pension) mené par la Caisse nationale d'assurance
            vieillesse, individuellement, pour chaque demandeur. Deux personnes du même âge peuvent
            payer des montants très différents parce que leurs revenus, et donc leurs futures
            pensions, ne sont pas les mêmes.
          </p>
          <p>
            Cet article ne vous donnera donc aucun prix en euros — ce serait vous induire en
            erreur, et nous nous l'interdisons. Il vous donnera en revanche ce qu'aucun simulateur
            ne fait à votre place : comprendre le mécanisme, savoir quels facteurs font varier la
            facture, connaître le plafond légal de trimestres rachetables, et disposer d'une
            méthode pour juger, une fois le devis officiel en main, si l'opération est rentable
            pour vous.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#definition">Qu'est-ce que le rachat de trimestres (versement pour la retraite) ?</a></li>
              <li><a href="#options">Les deux options de rachat : taux seul, ou taux et durée d'assurance</a></li>
              <li><a href="#facteurs">Qu'est-ce qui fait varier le prix d'un trimestre racheté ?</a></li>
              <li><a href="#plafond">Combien de trimestres peut-on racheter au maximum ?</a></li>
              <li><a href="#rentabilite">Le rachat de trimestres est-il rentable ? La méthode du seuil de rentabilité</a></li>
              <li><a href="#per-ou-rachat">Rachat de trimestres ou épargne sur un PER : lequel privilégier ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="definition">Qu'est-ce que le rachat de trimestres (versement pour la retraite) ?</h2>
          <p>
            Le rachat de trimestres, dont le nom administratif exact est « versement pour la
            retraite » (VPLR), est une démarche volontaire qui consiste à payer une somme d'argent
            à votre régime de retraite de base pour faire valider des trimestres qui, sans ce
            versement, ne compteraient pas — ou compteraient moins — dans le calcul de votre
            pension. On l'appelle encore souvent « rachat Fillon », du nom de la loi de 2003 qui a
            créé ce dispositif ; l'appellation officielle a changé depuis, pas le principe.
          </p>
          <p>
            Deux catégories de périodes peuvent faire l'objet d'un rachat. D'une part, les années
            d'études supérieures validées par un diplôme (dans la limite de 12 trimestres, tous
            régimes confondus). D'autre part, dans certaines conditions, des années
            incomplètes — typiquement des années où vous avez travaillé, mais où le nombre de
            trimestres validés au titre de vos revenus (un trimestre est validé dès qu'un salaire
            plancher a été cotisé, indépendamment du nombre de mois réellement travaillés) est
            resté inférieur à quatre.
          </p>
          <p>
            Le principe reste toujours le même : vous payez aujourd'hui pour combler, plus tard,
            un manque de trimestres qui, sinon, se traduirait par une décote (une réduction
            définitive de votre pension si vous partez avant d'avoir la durée d'assurance requise
            ou l'âge du taux plein automatique) ou par un départ plus tardif que souhaité. Le
            rachat ne rapporte jamais de trimestres « en plus » de ce qui vous manque réellement :
            il ne fait que combler un vide identifié sur votre relevé de carrière.
          </p>

          <h2 id="options">Les deux options de rachat : taux seul, ou taux et durée d'assurance</h2>
          <p>
            C'est le premier choix à faire, et il a un impact direct sur le prix : la Caisse
            nationale d'assurance vieillesse propose deux options, qui ne rachètent pas tout à fait
            la même chose.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Ce qu'elle améliore</th>
                  <th>Effet concret</th>
                  <th>Coût relatif</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Taux seul</strong></td>
                  <td>Le taux de liquidation de la pension (le pourcentage appliqué à votre salaire annuel moyen)</td>
                  <td>Réduit ou supprime la décote, mais ne change rien au nombre de trimestres retenu pour le calcul de la durée de cotisation dans les autres régimes (complémentaires notamment)</td>
                  <td>Moins coûteuse</td>
                </tr>
                <tr>
                  <td><strong>Taux et durée d'assurance</strong></td>
                  <td>Le taux de liquidation <em>et</em> le nombre de trimestres comptés dans la durée d'assurance totale</td>
                  <td>Améliore aussi le calcul de la retraite complémentaire (Agirc-Arrco) et peut rapprocher d'un départ anticipé pour carrière longue</td>
                  <td>Plus coûteuse</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Concrètement : si votre seul objectif est d'éviter une décote au régime général sans
            chercher à jouer sur la durée d'assurance globale, l'option « taux seul » suffit et
            coûte moins cher. Si vous visez aussi une amélioration de votre retraite
            complémentaire, ou un départ avant l'âge légal au titre d'une carrière longue,
            l'option « taux et durée d'assurance » est nécessaire — mais elle a un prix plus
            élevé, car elle achète davantage de droits. Le simulateur officiel demande de préciser
            l'option choisie avant de calculer un montant : c'est la première décision à
            trancher, avant même de simuler quoi que ce soit.
          </p>

          <h2 id="facteurs">Qu'est-ce qui fait varier le prix d'un trimestre racheté ?</h2>
          <p>
            Voici le cœur du sujet, et la raison pour laquelle aucun article — y compris
            celui-ci — ne peut légitimement vous donner un montant en euros. Le prix est recalculé
            individuellement pour chaque demande, en fonction de trois facteurs principaux.
          </p>
          <ul>
            <li>
              <strong>Votre âge au moment du rachat.</strong> Plus vous rachetez tôt, moins le
              trimestre coûte cher. La logique est actuarielle : racheter à 30 ans revient moins
              cher qu'à 58 ans, parce que la caisse de retraite capitalise implicitement votre
              versement sur une durée plus longue avant de vous verser la pension correspondante.
              C'est souvent l'inverse de l'intuition : on pense au rachat de trimestres en fin de
              carrière, au moment où le manque devient visible sur le relevé, alors que le
              rachat aurait été nettement moins coûteux quinze ou vingt ans plus tôt.
            </li>
            <li>
              <strong>Votre revenu professionnel des trois dernières années.</strong> Le barème
              officiel utilise vos revenus d'activité récents pour estimer le montant. Plus vos
              revenus sont élevés, plus le trimestre racheté est cher — car la future pension que
              ce trimestre contribue à financer sera elle-même plus élevée.
            </li>
            <li>
              <strong>L'option choisie</strong> (taux seul, ou taux et durée d'assurance) — détaillée
              plus haut, elle fait varier le prix pour un même âge et un même revenu.
            </li>
          </ul>
          <p>
            À cela s'ajoute un paramètre collectif : le barème est révisé chaque année par arrêté
            ministériel. Le montant obtenu aujourd'hui pour un trimestre ne sera pas
            nécessairement identique à celui obtenu l'an prochain, pour une situation en apparence
            comparable.
          </p>
          <div className="note">
            <p>
              Conséquence pratique : ignorez tout article, forum ou vidéo qui affiche un prix « au
              trimestre » sans préciser l'âge, le revenu et l'option retenus — ce chiffre ne vous
              concerne pas. La seule démarche fiable consiste à demander une évaluation
              personnalisée sur{" "}
              <a href="https://www.info-retraite.fr" target="_blank" rel="noopener noreferrer">
                info-retraite.fr
              </a>{" "}
              (espace personnel, rubrique dédiée au rachat de trimestres) ou auprès de votre
              caisse de retraite, en précisant votre situation exacte. Cette évaluation est
              gratuite et sans engagement ; elle seule vaut un montant réel, valable pour l'année
              en cours.
            </p>
          </div>

          <h2 id="plafond">Combien de trimestres peut-on racheter au maximum ?</h2>
          <p>
            C'est l'un des rares chiffres stables du dispositif, fixé par la loi et non par un
            barème annuel : vous pouvez racheter au maximum{" "}
            <strong>{REGIME_GENERAL.rachatTrimestresPlafond} trimestres</strong>, soit l'équivalent
            de trois années, tous régimes d'affiliation confondus. Ce plafond s'applique
            globalement, que vous rachetiez des trimestres d'études, des années incomplètes, ou
            un mélange des deux.
          </p>
          <p>
            Douze trimestres, c'est significatif mais cela reste borné : si votre relevé de
            carrière affiche vingt trimestres manquants pour le taux plein, le rachat ne pourra
            en combler qu'une partie. Les autres devront s'obtenir autrement — en travaillant plus
            longtemps, en jouant sur l'âge de départ, ou en acceptant une décote partielle. C'est
            pourquoi la première étape, avant même de songer au rachat, consiste à obtenir un
            relevé de situation individuelle précis et à identifier l'écart réel entre votre durée
            d'assurance actuelle et celle exigée pour votre génération.
          </p>
          <p>
            Ce plafond de {REGIME_GENERAL.rachatTrimestresPlafond} trimestres est aussi une bonne
            raison de ne pas attendre le dernier moment pour se poser la question : plus l'écart à
            combler est identifié tôt, plus vous avez de marge pour arbitrer entre rachat partiel,
            poursuite d'activité, ou{" "}
            <a href="/guide/cumul-emploi-retraite-comment-ca-marche">cumul emploi-retraite</a>{" "}
            si le rachat total ne suffit pas à atteindre le taux plein.
          </p>

          <h2 id="rentabilite">Le rachat de trimestres est-il rentable ? La méthode du seuil de rentabilité</h2>
          <p>
            Une fois le devis officiel obtenu, la vraie question devient : cette somme
            vaut-elle le coup ? La méthode de raisonnement est simple dans son principe, même si
            le montant à y injecter (le prix réel du rachat) ne peut venir que du simulateur
            officiel. Il s'agit de comparer :
          </p>
          <ul>
            <li>ce que vous payez aujourd'hui (le prix du rachat, donné par info-retraite.fr) ;</li>
            <li>
              au gain de pension mensuelle que ce rachat vous procure une fois à la retraite,
              multiplié par le nombre d'années pendant lesquelles vous percevrez cette pension.
            </li>
          </ul>
          <p>
            Le nombre d'années pendant lequel une pension est perçue détermine directement combien
            de temps il faut pour que le gain cumulé dépasse le prix payé — c'est ce qu'on appelle
            le seuil de rentabilité, ou point mort.
          </p>
          <div className="note">
            <p>
              <strong>Avertissement avant les chiffres qui suivent :</strong> l'exemple ci-dessous
              est entièrement illustratif. Il utilise une pension mensuelle hypothétique
              ({euros(ILLUSTRATIF.pensionMensuelleIllustrative)} par mois) et un taux de
              décote/surcote par trimestre issu du barème légal du régime général
              ({pct(REGIME_GENERAL.decoteParTrimestre)} par trimestre manquant ou excédentaire),
              uniquement pour illustrer la méthode de calcul. Il n'a strictement aucun lien avec un
              tarif de rachat réel, qui dépend de votre âge, de votre revenu et de l'option
              choisie, et que seul le simulateur officiel peut établir.
            </p>
          </div>
          <p>
            Reprenons notre cadre fictif de 58 ans, avec une pension de base illustrative de{" "}
            {euros(ILLUSTRATIF.pensionMensuelleIllustrative)} par mois à taux plein. Un trimestre
            manquant qui resterait non racheté entraînerait, dans cet exemple, une décote de{" "}
            {pct(REGIME_GENERAL.decoteParTrimestre)} appliquée à cette pension — soit, à l'inverse,
            un gain d'environ{" "}
            {euros(gainMensuelIllustratifParTrimestre)} par mois si ce trimestre est racheté et
            validé, dans la limite du plafond de {REGIME_GENERAL.decotePlafondTrimestres}{" "}
            trimestres de décote maximale prévu par le régime général. Ce gain mensuel, une fois
            connu, se compare ensuite au prix réel du rachat obtenu via le simulateur : divisez ce
            prix par le gain mensuel pour obtenir, en mois, le délai à partir duquel l'opération
            devient rentable. Si ce délai est très inférieur à votre espérance de perception de la
            pension, l'opération tend à être rentable ; s'il l'approche ou le dépasse, la prudence
            s'impose.
          </p>
          <p>
            Notre analyse : cette logique de seuil de rentabilité doit systématiquement intégrer
            deux nuances. D'abord, la déductibilité fiscale : les sommes versées au titre du
            rachat de trimestres sont déductibles du revenu imposable de l'année du versement,
            ce qui réduit le coût réel pour les foyers fortement imposés — un avantage à intégrer
            au calcul, en parallèle du prix affiché par le simulateur. Ensuite, l'incertitude sur
            la durée de perception : personne ne connaît sa propre espérance de vie, et le
            rachat de trimestres a, de ce point de vue, la nature d'un pari sur la longévité —
            un pari qui devient d'autant plus favorable que la pension est perçue longtemps. Ce
            n'est jamais une certitude absolue, contrairement à ce qu'affichent certains
            comparatifs simplistes.
          </p>

          <h2 id="per-ou-rachat">Rachat de trimestres ou épargne sur un PER : lequel privilégier ?</h2>
          <p>
            La question revient souvent, car les deux dispositifs partagent un point commun : une
            déduction fiscale à l'entrée. Le versement pour la retraite comme les versements
            volontaires sur un{" "}
            <a href="/strategies/per">PER (plan d'épargne retraite)</a> viennent réduire le revenu
            imposable de l'année, dans des plafonds différents. Au-delà de ce point commun, leur
            nature est très différente.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Rachat de trimestres</th>
                  <th>Versements volontaires sur un PER</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Déduction fiscale</td>
                  <td>Oui, du revenu imposable de l'année du versement</td>
                  <td>Oui, dans la limite du plafond annuel de déduction</td>
                </tr>
                <tr>
                  <td>Nature du gain futur</td>
                  <td>
                    Une pension viagère (versée jusqu'au décès) garantie par le régime général,
                    revalorisée selon les règles du régime
                  </td>
                  <td>
                    Un capital ou une rente dont le montant dépend des supports choisis et de leur
                    performance — sans garantie sur les supports en unités de compte
                  </td>
                </tr>
                <tr>
                  <td>Réversibilité</td>
                  <td>
                    Aucune. Un rachat de trimestres est définitif : impossible de se rétracter ou
                    de récupérer la somme versée
                  </td>
                  <td>
                    Relative : les supports peuvent être arbitrés, et l'épargne reste identifiable
                    jusqu'à la liquidation (hors cas de déblocage anticipé)
                  </td>
                </tr>
                <tr>
                  <td>Certitude du gain</td>
                  <td>
                    Élevée sur le principe (le gain de pension est défini par un barème légal
                    stable), mais dépend de la durée de vie effective
                  </td>
                  <td>
                    Variable selon les supports ; les performances passées ne préjugent pas des
                    performances futures
                  </td>
                </tr>
                <tr>
                  <td>Transmission en cas de décès</td>
                  <td>Aucun capital transmis aux héritiers au titre du rachat lui-même</td>
                  <td>
                    Capital transmissible aux bénéficiaires désignés, selon les règles propres au
                    PER (assurantiel ou compte-titres)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Notre analyse : les deux ne sont pas substituables, ils répondent à des besoins
            différents. Le rachat de trimestres a du sens quand l'objectif est précis et daté —
            atteindre le taux plein à un âge donné, éviter une décote identifiée, se rapprocher
            d'un départ en carrière longue — et que le calcul de seuil de rentabilité, une fois le
            devis officiel obtenu, se révèle favorable compte tenu de votre situation personnelle
            et familiale. Le PER a davantage vocation à constituer un complément de revenu
            disponible et piloté, avec plus de souplesse mais sans la garantie viagère d'une
            pension de régime général. Nombre de situations gagnent d'ailleurs à combiner les
            deux plutôt qu'à choisir l'un contre l'autre — c'est un arbitrage qui mérite d'être
            posé avec un{" "}
            <a href="/guide/conseiller-ou-gerer-seul-sa-retraite">regard extérieur</a>, tant les
            paramètres (âge, carrière, fiscalité, situation familiale) sont propres à chacun. Pour
            les indépendants, la question se pose différemment compte tenu de l'existence du{" "}
            <a href="/guide/retraite-independants-per-ou-madelin">PER ou Madelin</a>, avec ses
            propres règles de déduction.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Le rachat de trimestres est-il remboursable si je change d'avis ?</h3>
          <p>
            Non. Une fois le versement effectué et les trimestres validés, l'opération est
            définitive. Il n'existe pas de droit de rétractation ni de remboursement, y compris si
            votre situation professionnelle ou personnelle change ensuite. C'est précisément
            pourquoi le calcul de seuil de rentabilité doit être fait avant de payer, jamais après.
          </p>
          <h3>Peut-on payer le rachat de trimestres en plusieurs fois ?</h3>
          <p>
            Un paiement échelonné est possible dans certains cas, sur une durée qui dépend du
            nombre de trimestres rachetés, mais les modalités précises (durée, majoration
            éventuelle en cas d'étalement) doivent être vérifiées directement auprès de votre
            caisse de retraite ou sur info-retraite.fr au moment de la demande, car elles peuvent
            évoluer.
          </p>
          <h3>Le rachat de trimestres d'études coûte-t-il le même prix que le rachat d'années incomplètes ?</h3>
          <p>
            Le mode de calcul du prix repose sur les mêmes facteurs (âge, revenu, option), que le
            trimestre racheté corresponde à une année d'études ou à une année incomplète. En
            revanche, certains dispositifs de rachat à tarif réduit existent pour les rachats
            d'études supérieures effectués dans les dix ans suivant la fin des études — un point à
            vérifier explicitement lors de la simulation, car il peut réduire sensiblement le
            montant.
          </p>
          <h3>Le rachat de trimestres améliore-t-il aussi ma retraite complémentaire Agirc-Arrco ?</h3>
          <p>
            Seule l'option « taux et durée d'assurance » a un effet sur le calcul de la retraite
            complémentaire, en augmentant le nombre de trimestres retenus dans la durée
            d'assurance totale. L'option « taux seul » agit uniquement sur le taux de liquidation
            du régime général et n'améliore pas la complémentaire.
          </p>
          <h3>À quel âge faut-il envisager un rachat de trimestres ?</h3>
          <p>
            Il n'y a pas d'âge unique, mais un principe : plus vous rachetez tôt, moins le
            trimestre coûte cher, car le calcul actuariel est plus favorable à distance de la
            retraite. Dans la pratique, la plupart des demandes se concentrent entre 50 et 60 ans,
            au moment où l'écart de trimestres devient visible et où le projet de départ se
            précise — mais rien n'empêche, sur le plan des règles, une demande plus précoce si le
            manque est déjà identifié.
          </p>
          <h3>Le rachat de trimestres évite-t-il automatiquement toute décote ?</h3>
          <p>
            Non, seulement à hauteur des trimestres effectivement rachetés, dans la limite de{" "}
            {REGIME_GENERAL.rachatTrimestresPlafond} trimestres. Si l'écart entre votre durée
            d'assurance et celle exigée dépasse ce plafond, une décote partielle peut subsister
            malgré le rachat maximal. Voir notre guide sur{" "}
            <a href="/guide/surcote-decote-retraite">le calcul de la surcote et de la décote</a>{" "}
            pour le détail du mécanisme.
          </p>
          <h3>Un fonctionnaire peut-il aussi racheter des trimestres ?</h3>
          <p>
            Oui, un dispositif de rachat existe également dans la fonction publique, avec ses
            propres règles de calcul et sa propre caisse de gestion (la CNRACL notamment). Les
            grands principes — âge, revenu, option, plafond de trimestres — restent comparables,
            mais les montants et certaines conditions diffèrent du régime général des salariés du
            privé. Voir notre guide dédié à{" "}
            <a href="/guide/retraite-fonctionnaires-completer">la retraite des fonctionnaires</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Reprenons le fil. Le rachat de trimestres n'a pas de prix universel, et c'est
            précisément ce qui en fait un sujet mal traité en ligne : on cherche un tarif, on ne
            trouve que des exemples qui ne correspondent jamais tout à fait à sa propre situation.
            Ce que l'on peut établir sans simulateur, en revanche, structure déjà une bonne partie
            de la décision : le prix dépend de l'âge, du revenu et de l'option choisie ; le
            plafond légal est de {REGIME_GENERAL.rachatTrimestresPlafond} trimestres ; et la
            rentabilité se juge en comparant le prix payé (une fois connu) au gain de pension
            mensuelle, multiplié par la durée probable de perception.
          </p>
          <p>
            La démarche que nous recommandons, dans l'ordre : obtenir d'abord un relevé de
            situation individuelle précis pour quantifier l'écart réel de trimestres ; demander
            ensuite une évaluation chiffrée personnalisée sur info-retraite.fr, pour les deux
            options si le doute persiste ; appliquer alors la méthode de seuil de rentabilité à ce
            montant réel, en tenant compte de la déduction fiscale et de votre situation
            familiale ; et enfin, si l'écart dépasse ce que le rachat peut combler, explorer les
            compléments — décalage du départ, <a href="/guide/cumul-emploi-retraite-comment-ca-marche">cumul emploi-retraite</a>,
            ou renforcement de l'épargne via un{" "}
            <a href="/guide/faut-il-ouvrir-un-per">PER</a>. Le mécanisme de décote lui-même, et la
            façon dont il s'articule avec l'âge du taux plein automatique
            ({REGIME_GENERAL.ageTauxPleinAutomatique} ans), fait l'objet de notre guide sur{" "}
            <a href="/guide/surcote-decote-retraite">la surcote et la décote</a>, complémentaire de
            celui-ci.
          </p>
          <p>
            Cette décision engage une somme définitive et non récupérable : elle mérite d'être
            posée avec l'ensemble de votre relevé de carrière sous les yeux, pas isolément. C'est
            exactement l'objet de notre{" "}
            <a href="/bilan-retraite">bilan retraite gratuit</a> : nous reprenons avec vous votre
            relevé de situation individuelle, le devis officiel une fois obtenu, et le comparons
            aux autres leviers disponibles pour votre horizon de départ.
          </p>
          <div className="note">
            <p>
              Cet article décrit un mécanisme légal et ses facteurs de variation ; il ne constitue
              ni un devis ni un conseil personnalisé. Aucun montant en euros cité ici ne
              correspond à un prix de rachat réel — seuls le simulateur officiel d'info-retraite.fr
              et votre caisse de retraite peuvent établir un chiffre valable pour votre situation,
              à la date de votre demande. Les exemples chiffrés de cet article reposent sur des
              hypothèses illustratives et sur les barèmes légaux en vigueur en {HYPOTHESES_MAJ},
              susceptibles d'évoluer.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Un rachat de trimestres à évaluer avant de vous décider ?"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
