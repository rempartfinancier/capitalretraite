import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { FISCALITE, HYPOTHESES_MAJ } from "../components/hypotheses.js";

export default function GuideCumulEmploiRetraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Comprendre le système de retraite</span>
          <h1>Cumul emploi-retraite : comment ça marche et quelles limites ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le cumul emploi-retraite permet de percevoir sa
              pension tout en continuant — ou en reprenant — une activité rémunérée, sous deux
              formes bien distinctes : le cumul intégral, sans limite de revenu mais réservé à
              qui a atteint le taux plein, et le cumul plafonné, ouvert plus tôt mais dans une
              limite de revenu. Depuis la réforme des retraites de 2023, reprendre une activité
              après avoir liquidé sa pension ne crée, en principe, plus de nouveaux droits à
              pension dans la plupart des régimes — une bascule qui change la donne par rapport à
              ce que beaucoup d'actifs croient encore, et qu'il faut vérifier au cas par cas
              auprès de sa caisse.
            </p>
          </div>
          <p>
            « Je vais liquider ma retraite, et je continuerai à travailler à côté, ça
            m'augmentera ma pension plus tard. » C'est l'une des idées reçues les plus répandues
            que nous entendons en rendez-vous — et, depuis 2023, elle est en grande partie
            fausse. Pas par mauvaise foi : pendant des décennies, cotiser en cumul emploi-retraite
            ouvrait bien droit à une seconde pension, minime mais réelle, calculée sur cette
            activité reprise. La loi a changé la règle du jeu, et beaucoup de futurs retraités
            raisonnent encore avec l'ancien mode d'emploi.
          </p>
          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel
            précis : un cadre qui approche de l'âge de la retraite envisage de liquider sa
            pension de régime général tout en poursuivant une mission de conseil à temps partiel
            chez son ancien employeur. Il se demande s'il a intérêt à attendre son taux plein,
            combien il peut gagner en plus de sa pension, si les cotisations qu'il continuera de
            payer serviront encore à quelque chose, et comment cela s'articule avec l'épargne
            qu'il a mise de côté par ailleurs. Ce sont exactement les questions que cet article
            traite dans l'ordre.
          </p>
          <p>
            Le cumul emploi-retraite (le fait de percevoir une pension de retraite tout en
            exerçant une activité professionnelle rémunérée) est un dispositif légal, encadré et
            aujourd'hui très répandu — mais ses règles sont techniques, dépendent du régime de
            retraite concerné, et ont été substantiellement modifiées par la réforme de 2023.
            Notre objectif ici n'est pas de vous donner un chiffre magique, mais de vous expliquer
            le mécanisme avec suffisamment de rigueur pour que vous posiez les bonnes questions à
            votre caisse de retraite ou à un conseiller avant de prendre une décision.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#definition">Qu'est-ce que le cumul emploi-retraite ?</a></li>
              <li><a href="#integral-plafonne">Cumul intégral ou cumul plafonné : quelle différence ?</a></li>
              <li><a href="#nouveaux-droits">Le cumul emploi-retraite crée-t-il encore des droits à la retraite ?</a></li>
              <li><a href="#conditions">Quelles conditions pour cumuler emploi et retraite ?</a></li>
              <li><a href="#fiscalite">Le cumul emploi-retraite est-il intéressant fiscalement ?</a></li>
              <li><a href="#epargne">Cumul emploi-retraite et épargne (PER, assurance-vie) : une combinaison à anticiper</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="definition">Qu'est-ce que le cumul emploi-retraite ?</h2>
          <p>
            Le cumul emploi-retraite désigne la situation d'un assuré qui perçoit une pension de
            retraite (de base et/ou complémentaire) tout en exerçant, en parallèle, une activité
            professionnelle rémunérée — salariée, indépendante ou libérale. Ce n'est pas un
            dispositif marginal : reprendre une activité après (ou sans jamais vraiment arrêter)
            son activité principale, que ce soit par choix personnel, par nécessité financière ou
            parce qu'une opportunité se présente, concerne chaque année plusieurs centaines de
            milliers de retraités en France.
          </p>
          <p>
            Deux logiques bien différentes coexistent sous ce même terme, et la confusion entre
            les deux est à l'origine de la plupart des erreurs de calcul que nous observons :
          </p>
          <ul>
            <li>
              <strong>La poursuite d'activité sans liquidation</strong> : vous continuez de
              travailler sans avoir demandé votre pension. Vous continuez à cotiser normalement et
              à acquérir des droits, exactement comme n'importe quel actif. Ce n'est pas, à
              proprement parler, du cumul emploi-retraite — mais c'est souvent l'étape qui précède
              la décision.
            </li>
            <li>
              <strong>Le cumul emploi-retraite au sens strict</strong> : vous avez liquidé votre
              pension (demandé et obtenu son versement) et vous reprenez ou poursuivez une
              activité rémunérée après cette date. C'est cette situation, et ses règles propres,
              que couvre cet article.
            </li>
          </ul>
          <p>
            Point de vigilance immédiat, car il conditionne tout le reste : le cumul emploi-retraite
            suppose d'avoir liquidé <em>l'ensemble</em> de ses pensions de retraite obligatoires,
            de base comme complémentaires, dans tous les régimes auxquels vous avez cotisé au
            cours de votre carrière. Un ancien salarié devenu indépendant en fin de carrière, par
            exemple, doit liquider à la fois son régime général et son régime de retraite
            complémentaire des indépendants — liquider un seul régime en poursuivant une activité
            relevant d'un autre régime ne suffit pas à ouvrir le cumul emploi-retraite dans les
            règles.
          </p>

          <h2 id="integral-plafonne">Cumul intégral ou cumul plafonné : quelle différence ?</h2>
          <p>
            C'est la distinction la plus structurante du dispositif, et celle qui détermine si
            vous pouvez gagner ce que vous voulez ou si vos revenus d'activité sont bridés.
          </p>
          <p>
            <strong>Le cumul intégral</strong> s'applique lorsque vous avez atteint le taux plein
            (le taux de calcul maximal de votre pension de base, obtenu soit en réunissant le
            nombre de trimestres requis pour votre génération, soit en atteignant l'âge du taux
            plein automatique) et que vous avez liquidé l'ensemble de vos pensions obligatoires.
            Dans ce cas, en principe, aucune limite de revenu ne s'applique : vous pouvez cumuler
            votre pension et vos revenus d'activité sans plafond, quel que soit le montant de
            cette activité. C'est la situation la plus favorable, et celle vers laquelle la
            plupart des actifs qui envisagent de reprendre une activité ont intérêt à se diriger —
            ce qui explique pourquoi la question du <a href="/guide/surcote-decote-retraite">taux
            plein, de la surcote et de la décote</a> se pose en amont de toute décision de cumul.
          </p>
          <p>
            <strong>Le cumul plafonné</strong> s'applique lorsque vous liquidez votre pension
            avant d'avoir atteint le taux plein (ce qui reste possible dès l'âge légal de départ,
            mais avec une décote). Dans ce cas, le total de vos revenus d'activité et de vos
            pensions ne doit pas dépasser un plafond — plafond qui dépend, selon les régimes, soit
            de votre dernier salaire d'activité, soit d'un montant de référence de la sécurité
            sociale. Nous ne donnons volontairement aucun chiffre ici : ce plafond varie selon le
            régime de retraite concerné (général, complémentaire, indépendants, professions
            libérales) et évolue chaque année. Le mécanisme à retenir est le suivant : en cas de
            dépassement, c'est la pension qui est réduite, à due proportion du dépassement, voire
            suspendue si l'écart est important.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Situation</th>
                  <th>Condition d'accès</th>
                  <th>Limite de revenu</th>
                  <th>Conséquence en cas de dépassement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cumul intégral</td>
                  <td>Taux plein atteint (trimestres ou âge) et liquidation de tous les régimes</td>
                  <td>En principe aucune, à vérifier selon le régime</td>
                  <td>Sans objet</td>
                </tr>
                <tr>
                  <td>Cumul plafonné</td>
                  <td>Liquidation avant le taux plein</td>
                  <td>Plafond dépendant du régime (dernier salaire ou plafond de sécurité sociale) — à vérifier auprès de sa caisse</td>
                  <td>Réduction, voire suspension temporaire de la pension</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Notre analyse : cette distinction est probablement le paramètre le plus sous-estimé
            par les actifs qui planifient leur fin de carrière. Beaucoup découvrent après coup
            qu'ils sont en cumul plafonné faute d'avoir vérifié leur situation vis-à-vis du taux
            plein, et voient leur pension amputée le mois suivant la reprise d'activité. Vérifier
            son relevé de carrière et sa date de taux plein avant toute négociation avec un futur
            employeur ou tout choix de statut indépendant n'est pas une précaution superflue :
            c'est un préalable.
          </p>

          <h2 id="nouveaux-droits">Le cumul emploi-retraite crée-t-il encore des droits à la retraite ?</h2>
          <p>
            C'est le point sur lequel la loi a le plus changé récemment, et celui sur lequel nous
            appelons à la plus grande prudence dans cet article : les règles évoluent, les
            situations par régime sont nuancées, et seule votre caisse de retraite peut vous
            confirmer votre cas précis.
          </p>
          <p>
            Avant la réforme des retraites de 2023, l'activité reprise en cumul emploi-retraite
            donnait lieu à des cotisations retraite classiques — mais celles-ci ne généraient, la
            plupart du temps déjà, aucun droit nouveau : elles étaient qualifiées de « cotisations
            de solidarité », prélevées sans contrepartie en droits. Une exception notable
            existait toutefois pour le régime général : sous certaines conditions, une activité
            poursuivie en cumul emploi-retraite pouvait ouvrir droit à une seconde pension,
            calculée sur cette période et versée en plus de la première.
          </p>
          <p>
            La loi du 14 avril 2023 (réforme des retraites) a modifié ce principe : selon les
            informations disponibles à ce jour, elle a mis fin à la génération de cette seconde
            pension de régime général pour les activités reprises en cumul emploi-retraite après
            le 1er septembre 2023. En clair, et sous réserve de nuances propres à certains régimes
            spécifiques (professions libérales, certains régimes complémentaires) : reprendre une
            activité après avoir liquidé sa retraite ne crée, en principe, plus de nouveaux droits
            à pension dans la majorité des cas. Les cotisations continuent d'être prélevées sur les
            revenus d'activité — retraite et maladie notamment — mais sans contrepartie en
            trimestres ou en points supplémentaires.
          </p>
          <p>
            Nous insistons sur la nuance, car ce sujet est légal et évolutif : la règle n'est ni
            uniforme entre tous les régimes de retraite (base, complémentaire, indépendants,
            fonction publique, professions libérales), ni figée dans le temps — de nouveaux
            aménagements réglementaires peuvent intervenir. Avant toute décision, vérifiez
            systématiquement votre situation précise sur{" "}
            <a href="https://www.service-public.fr" target="_blank" rel="noopener noreferrer">
              service-public.fr
            </a>{" "}
            ou directement auprès de{" "}
            <a href="https://www.info-retraite.fr" target="_blank" rel="noopener noreferrer">
              l'Assurance retraite
            </a>{" "}
            (ou de votre caisse complémentaire et de votre caisse professionnelle le cas échéant).
            Ce que nous pouvons affirmer sans réserve : ne comptez pas, par défaut, sur une
            seconde pension pour justifier économiquement la reprise d'une activité. Le cumul
            emploi-retraite doit se décider pour ce qu'il apporte immédiatement — un revenu
            d'activité en plus de la pension — et non pour un hypothétique complément de pension
            futur qui, dans la plupart des cas désormais, ne se matérialisera pas.
          </p>
          <div className="note">
            <p>
              Ce point est le cœur de cet article et le plus susceptible d'évoluer. Les
              informations ci-dessus reflètent l'état du droit tel que nous le comprenons à la
              date de révision de cet article ({HYPOTHESES_MAJ}), mais elles doivent être
              vérifiées auprès de service-public.fr, de l'Assurance retraite ou de votre caisse de
              retraite avant toute décision, notamment si vous relevez d'un régime spécifique
              (fonction publique, professions libérales, régimes spéciaux).
            </p>
          </div>

          <h2 id="conditions">Quelles conditions pour cumuler emploi et retraite ?</h2>
          <p>
            Trois conditions cumulatives (qui doivent toutes être réunies, sans exception) ouvrent
            l'accès au cumul emploi-retraite, quelle que soit sa forme :
          </p>
          <ol>
            <li>
              <strong>Avoir liquidé l'ensemble de ses pensions de retraite obligatoires</strong>,
              de base et complémentaires, dans tous les régimes de retraite auxquels vous avez été
              affilié au cours de votre carrière — et pas seulement le régime de votre dernière
              activité.
            </li>
            <li>
              <strong>Respecter un délai de latence en cas de reprise chez le même employeur</strong> :
              lorsque l'on reprend une activité chez son dernier employeur (ou dans le même
              groupe), un délai minimal doit en général être respecté entre la date de liquidation
              et la date de reprise. Ce délai, ses exceptions et les activités qui y échappent
              (activités juridictionnelles, missions ponctuelles de faible ampleur, par exemple)
              sont précisés par votre caisse — un point à valider avant toute signature de
              nouveau contrat.
            </li>
            <li>
              <strong>Déclarer la reprise d'activité</strong> à sa caisse de retraite de base et à
              sa caisse complémentaire. Le silence n'est jamais une option : une reprise
              d'activité non déclarée expose à un rappel de cotisations et, en cas de cumul
              plafonné dépassé sans le savoir, à un indu (une pension versée à tort qu'il faudra
              rembourser).
            </li>
          </ol>
          <p>
            À ces trois conditions s'ajoute, en toile de fond, la question du taux plein évoquée
            plus haut : elle ne conditionne pas l'accès au cumul emploi-retraite lui-même (on peut
            cumuler avant le taux plein, en version plafonnée), mais elle détermine laquelle des
            deux formes — intégrale ou plafonnée — s'applique à vous. C'est pourquoi la
            question du cumul emploi-retraite se pose rarement seule : elle est indissociable de
            celle de la <a href="/guide/surcote-decote-retraite">surcote et de la décote</a>, et,
            pour les actifs qui approchent du taux plein sans l'avoir encore atteint, de celle du{" "}
            <a href="/guide/combien-coute-rachat-trimestres-retraite">rachat de trimestres</a>,
            qui peut permettre d'accéder plus tôt au cumul intégral.
          </p>
          <p>
            Enfin, pour les indépendants et professions libérales qui envisagent de poursuivre ou
            de reprendre une activité après la liquidation de leur retraite, les règles de calcul
            de la pension de base et les dispositifs complémentaires propres à leur régime
            méritent d'être vérifiés en amont — voir notre guide{" "}
            <a href="/guide/retraite-independants-per-ou-madelin">retraite des indépendants : PER
            ou Madelin</a> pour la partie épargne retraite propre à ce statut.
          </p>

          <h2 id="fiscalite">Le cumul emploi-retraite est-il intéressant fiscalement ?</h2>
          <p>
            Sur le plan fiscal, il n'existe pas de régime particulier pour le cumul
            emploi-retraite : votre pension de retraite et vos revenus d'activité sont chacun
            imposés selon leurs règles habituelles, puis additionnés dans votre revenu global et
            soumis au barème progressif de l'impôt sur le revenu (un barème par tranches, où
            chaque tranche de revenu supplémentaire est imposée à un taux plus élevé que la
            précédente — c'est le principe de progressivité). Le barème français comporte
            plusieurs tranches, dont les taux marginaux (le taux appliqué à la dernière tranche de
            revenu, pas à l'ensemble du revenu) s'échelonnent en France entre{" "}
            {FISCALITE.tmiOptions[0]} % et {FISCALITE.tmiOptions[FISCALITE.tmiOptions.length - 1]} %
            selon le niveau de revenu total du foyer.
          </p>
          <p>
            Ce qu'il faut comprendre, sans qu'aucun seuil précis ne puisse être donné ici (les
            tranches et leurs bornes évoluent chaque année et dépendent de la situation familiale
            — nombre de parts fiscales) : additionner une pension et un salaire peut faire
            basculer une partie de vos revenus dans une tranche marginale d'imposition supérieure
            à celle que vous connaissiez pendant votre seule activité professionnelle, ou à celle
            que vous auriez connue à la retraite sans reprise d'activité. Ce n'est ni un piège ni
            un frein en soi — le revenu net supplémentaire reste, presque toujours, positif — mais
            c'est un paramètre à anticiper dans le calcul de rentabilité de la reprise d'activité,
            en particulier si votre pension seule vous plaçait déjà dans une tranche intermédiaire.
          </p>
          <p>
            S'y ajoutent les cotisations sociales, qui restent dues sur les revenus d'activité
            selon le statut (salarié, indépendant, libéral) exactement comme avant la liquidation
            — la réforme de 2023 n'a pas supprimé les cotisations, elle a supprimé, dans la
            plupart des cas, leur contrepartie en droits nouveaux, comme expliqué plus haut. Le
            calcul à faire avant de reprendre une activité est donc : revenu d'activité net de
            cotisations sociales et net d'impôt sur le revenu au barème progressif, comparé à la
            pension seule. C'est un calcul qui se fait au cas par cas, avec votre taux marginal
            d'imposition réel — un point que nous approfondissons systématiquement lors d'un{" "}
            <a href="/bilan-retraite">bilan retraite</a>.
          </p>

          <h2 id="epargne">Cumul emploi-retraite et épargne (PER, assurance-vie) : une combinaison à anticiper</h2>
          <p>
            Une question revient souvent : puisque le cumul emploi-retraite génère un revenu
            d'activité en plus de la pension, peut-on continuer à alimenter un PER (plan
            d'épargne retraite, une enveloppe qui permet de déduire les versements volontaires du
            revenu imposable, dans une certaine limite) pendant cette période ?
          </p>
          <p>
            La réponse est oui, avec une nuance importante à anticiper. Rien n'interdit
            juridiquement de continuer à verser sur un PER tant que vous percevez un revenu
            d'activité — le PER n'est pas réservé aux actifs qui n'ont pas encore liquidé leur
            retraite. Et l'avantage fiscal associé aux versements volontaires (leur déductibilité
            du revenu imposable, dans la limite d'un plafond annuel propre à chaque foyer) reste
            actif tant qu'il existe un revenu professionnel sur lequel s'imputer. C'est même,
            dans certaines configurations, une période où cette déduction peut avoir un intérêt
            renforcé : si l'addition de votre pension et de votre salaire vous fait basculer, même
            partiellement, dans une tranche marginale d'imposition plus élevée que d'habitude
            (voir la section précédente), déduire une partie de ce revenu supplémentaire vient
            précisément atténuer ce basculement.
          </p>
          <p>
            La nuance à anticiper porte sur la sortie, pas sur l'entrée : un PER alimenté pendant
            une période de cumul emploi-retraite reste soumis aux mêmes règles de sortie que tout
            autre PER — sortie en rente, en capital ou en mixte, selon les cas, et fiscalité de
            sortie qui dépend de la nature des versements (déduits ou non) et de leur origine
            (versements volontaires, épargne salariale, cotisations obligatoires). Notre page{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a> détaille ce point,
            qui mérite d'être posé avant de verser, pas après.
          </p>
          <p>
            L'assurance-vie, de son côté, ne pose aucune question spécifique liée au cumul
            emploi-retraite : elle continue de fonctionner exactement comme avant la liquidation,
            sans lien avec le statut d'activité de son titulaire. C'est d'ailleurs souvent
            l'enveloppe privilégiée pour recevoir l'épargne de précaution constituée grâce au
            supplément de revenu que procure le cumul, en complément — pas en remplacement — d'un
            PER déjà alimenté. Notre guide{" "}
            <a href="/guide/meilleure-assurance-vie-retraite">quelle assurance-vie pour préparer
            sa retraite</a> et notre page sur la{" "}
            <a href="/strategies/per">stratégie PER</a> détaillent chacune de ces deux enveloppes.
          </p>
          <p>
            Aucune simulation de performance ni aucune projection de gain ne peut être associée à
            un placement pendant cette période sans un avertissement explicite : toute
            illustration de croissance d'un PER ou d'une assurance-vie repose sur des hypothèses
            de rendement futures, jamais garanties, et les performances passées ne préjugent en
            rien des performances futures. C'est un point sur lequel nous ne transigeons jamais,
            cumul emploi-retraite ou non.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on cumuler emploi et retraite dès l'âge légal de départ ?</h3>
          <p>
            Oui, mais uniquement en version plafonnée si le taux plein n'est pas encore atteint à
            cet âge. Le cumul intégral, sans limite de revenu, suppose d'avoir atteint le taux
            plein — soit par la durée de cotisation, soit par l'âge du taux plein automatique.
          </p>
          <h3>Que se passe-t-il si mes revenus dépassent le plafond du cumul plafonné ?</h3>
          <p>
            Votre pension est réduite à due proportion du dépassement constaté par votre caisse,
            et peut être suspendue si l'écart est important. Le montant exact du plafond dépend du
            régime concerné et doit être vérifié auprès de votre caisse ou sur service-public.fr,
            car il varie selon les cas (dernier salaire d'activité ou plafond de la sécurité
            sociale).
          </p>
          <h3>Dois-je attendre mon taux plein avant de reprendre une activité ?</h3>
          <p>
            Ce n'est pas une obligation, mais c'est souvent la stratégie la plus simple : atteindre
            le taux plein ouvre le cumul intégral, sans plafond de revenu à surveiller ni risque
            de réduction de pension. Si le taux plein est proche, un rachat de trimestres peut
            parfois être envisagé pour y accéder plus tôt — un calcul qui se fait au cas par cas.
          </p>
          <h3>Le cumul emploi-retraite fonctionne-t-il pareil pour un fonctionnaire ?</h3>
          <p>
            Les grands principes (liquidation préalable, cumul intégral ou plafonné selon le taux
            plein) s'appliquent, mais certaines règles diffèrent selon les régimes de la fonction
            publique. Voir notre guide{" "}
            <a href="/guide/retraite-fonctionnaires-completer">compléter sa retraite de
            fonctionnaire</a> et vérifier son cas précis auprès de sa caisse de retraite (par
            exemple la CNRACL ou le SRE selon le statut).
          </p>
          <h3>Puis-je cumuler ma retraite avec une activité d'indépendant après avoir été salarié ?</h3>
          <p>
            Oui, mais vous devez avoir liquidé l'ensemble de vos pensions obligatoires — y compris
            celle de votre ancien statut de salarié — avant de démarrer cette nouvelle activité en
            cumul. Voir notre guide{" "}
            <a href="/guide/retraite-independants-per-ou-madelin">retraite des indépendants</a>{" "}
            pour la partie épargne propre à ce statut.
          </p>
          <h3>Le cumul emploi-retraite augmente-t-il ma pension une fois que j'arrête définitivement de travailler ?</h3>
          <p>
            En principe, non, dans la majorité des cas depuis la réforme de 2023 : les
            cotisations versées pendant le cumul emploi-retraite ne génèrent plus de nouveaux
            droits à pension pour la plupart des régimes. Des nuances subsistent selon les
            régimes et les situations — à vérifier impérativement auprès de votre caisse avant
            toute décision fondée sur cette hypothèse.
          </p>
          <h3>Puis-je continuer à verser sur mon PER pendant le cumul emploi-retraite ?</h3>
          <p>
            Oui. L'avantage fiscal de la déduction des versements volontaires reste actif tant que
            vous percevez un revenu d'activité imposable, y compris pendant une période de cumul
            emploi-retraite. La question à anticiper porte davantage sur la stratégie de sortie du
            PER que sur l'entrée.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le cumul emploi-retraite reste un outil précieux pour qui souhaite ou doit prolonger
            un revenu d'activité au-delà de la liquidation de sa pension — mais c'est un outil aux
            règles précises, et la principale évolution récente change une hypothèse que beaucoup
            d'actifs tiennent encore pour acquise : reprendre une activité après liquidation ne
            construit plus, dans la plupart des cas, une seconde pension future. Il faut donc
            juger le cumul emploi-retraite pour ce qu'il apporte tout de suite — un complément de
            revenu net, taxé au barème progressif comme n'importe quel autre revenu — et non pour
            un hypothétique gain de pension à venir.
          </p>
          <p>
            La deuxième idée à retenir est que la forme du cumul (intégral ou plafonné) dépend
            entièrement de votre situation vis-à-vis du taux plein au moment de la liquidation.
            C'est pourquoi cette question ne se traite jamais isolément : elle s'articule avec
            celle de la <a href="/guide/surcote-decote-retraite">surcote et de la décote</a>, et,
            pour ceux qui envisagent d'accélérer l'accès au taux plein, avec celle du{" "}
            <a href="/guide/combien-coute-rachat-trimestres-retraite">rachat de trimestres</a>. Une
            fois la décision de cumuler prise, la question devient patrimoniale : où placer le
            surplus de revenu, comment continuer à faire fructifier une épargne déjà construite, et
            comment préparer la suite — c'est l'objet de nos pages sur la{" "}
            <a href="/strategies/per">stratégie PER</a> et sur la{" "}
            <a href="/strategies/decumulation">décumulation</a> (la phase où l'épargne accumulée
            devient un revenu régulier).
          </p>
          <p>
            Enfin, parce que ce sujet mélange droit de la sécurité sociale, fiscalité et stratégie
            patrimoniale, et parce que la réglementation continue d'évoluer, une vérification
            individuelle reste indispensable avant toute décision engageante : relevé de carrière,
            simulation de pension par votre caisse, et calcul du revenu net réel une fois
            cotisations et impôt déduits. C'est précisément la démarche que nous engageons lors
            d'un <a href="/bilan-retraite">bilan retraite gratuit</a>.
          </p>
          <div className="note">
            <p>
              Cet article décrit des mécanismes généraux du cumul emploi-retraite, encadrés par le
              Code de la sécurité sociale et récemment modifiés par la réforme des retraites de
              2023 ; il ne constitue pas un conseil personnalisé et ne remplace pas une
              vérification auprès de service-public.fr, de l'Assurance retraite (info-retraite.fr)
              ou de votre caisse de retraite, seules habilitées à confirmer votre situation
              individuelle. Les informations réglementaires sont données à titre indicatif à la
              date de révision de cet article ({HYPOTHESES_MAJ}) et sont susceptibles d'évoluer.
              Cette analyse ne constitue pas un conseil en investissement personnalisé ; les
              chiffres et taux cités, lorsqu'ils concernent l'épargne, sont des hypothèses
              illustratives ou des barèmes en vigueur à vérifier, et les performances passées ne
              préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Vous envisagez un cumul emploi-retraite ? Faites vérifier votre situation avant de décider"
        button="Demander mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
