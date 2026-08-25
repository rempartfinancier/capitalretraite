import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  REGIME_GENERAL,
  ILLUSTRATIF,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

// Coût illustratif d'un trimestre manquant par le seul canal de la décote,
// calculé depuis les hypothèses centralisées (jamais de taux écrit en dur).
// N'intègre volontairement pas l'effet de proratisation, décrit en texte :
// il dépend de la durée d'assurance requise, propre à chaque génération.
const pensionMensuelle = ILLUSTRATIF.pensionMensuelleIllustrative;
const perteMensuelleUnTrimestre = Math.round(
  pensionMensuelle * (REGIME_GENERAL.decoteParTrimestre / 100)
);
const perteAnnuelleUnTrimestre = perteMensuelleUnTrimestre * 12;
const perteMensuelleQuatreTrimestres = pensionMensuelle * ((4 * REGIME_GENERAL.decoteParTrimestre) / 100);
const decoteMaximalePct = REGIME_GENERAL.decotePlafondTrimestres * REGIME_GENERAL.decoteParTrimestre;

export default function GuideVerifierReleveCarriere() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique</span>
          <h1>Relevé de carrière : comment le vérifier et faire corriger les erreurs</h1>
          <p className="sub">
            C'est le document sur lequel repose tout le reste — le montant de votre pension, la
            date de votre taux plein, l'intérêt d'un rachat de trimestres. Et c'est celui que
            presque personne n'ouvre avant 60 ans.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> votre relevé de carrière recense les trimestres et les
              rémunérations retenus par chacun de vos régimes de retraite. Il est constitué à
              partir des déclarations de vos employeurs successifs, sur quarante ans — donc il peut
              comporter des oublis, et c'est à vous de les repérer. Un trimestre manquant à tort
              se répare sur justificatifs, gratuitement, tant que les pièces existent encore. Le
              même trimestre découvert le jour de la liquidation ne se répare parfois plus, ou se
              rachète — au prix fort. Le bon moment pour ouvrir ce document, c'est aujourd'hui,
              pas à 62 ans.
            </p>
          </div>

          <p>
            Dans presque toutes les décisions de préparation retraite — faut-il racheter des
            trimestres, partir à 63 ou à 65 ans, viser la surcote, prolonger en cumul
            emploi-retraite — le point de départ est le même : le nombre de trimestres réellement
            enregistrés à votre nom. Ce chiffre ne se devine pas, il se lit. Et l'expérience du
            terrain est constante : une part non négligeable des relevés comporte au moins une
            anomalie, presque toujours sur les mêmes périodes — les débuts de carrière, les
            changements de statut, les employeurs disparus. Notre analyse : la vérification du
            relevé de carrière est l'action de préparation retraite au meilleur rapport
            effort/enjeu qui existe, et c'est aussi la plus repoussée.
          </p>
          <p>
            Cet article ne refait pas le calcul de la décote et de la surcote, développé dans{" "}
            <a href="/guide/surcote-decote-retraite">notre guide dédié</a> : il traite du document
            lui-même — où le trouver, comment le lire, ce qu'il faut y chercher, et comment faire
            corriger ce qui est faux.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#quoi">1. Ce qu'est le relevé de carrière — et ce qu'il n'est pas</a></li>
              <li><a href="#quand">2. Quand le vérifier : pourquoi 45-55 ans, pas 62</a></li>
              <li><a href="#erreurs">3. Les six périodes où les oublis se concentrent</a></li>
              <li><a href="#cout">4. Ce que coûte un trimestre manquant</a></li>
              <li><a href="#corriger">5. La procédure de rectification, étape par étape</a></li>
              <li><a href="#fonctionnaires">6. Le cas des fonctionnaires</a></li>
              <li><a href="#checklist">Check-list : votre vérification en une heure</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
            </ol>
          </div>

          <h2 id="quoi">1. Ce qu'est le relevé de carrière — et ce qu'il n'est pas</h2>
          <p>
            Le relevé de carrière est le récapitulatif, année par année, des droits enregistrés à
            votre nom : les trimestres validés et les rémunérations portées au compte pour la
            retraite de base, les points acquis pour les régimes complémentaires. Il est alimenté
            par les déclarations sociales de vos employeurs successifs, auxquelles s'ajoutent les
            périodes assimilées transmises par d'autres organismes (chômage indemnisé, maladie,
            maternité). Il se consulte en ligne sur{" "}
            <a href="https://www.info-retraite.fr" target="_blank" rel="noopener noreferrer">
              info-retraite.fr
            </a>
            , le portail inter-régimes qui agrège les droits de l'ensemble des régimes auxquels
            vous avez cotisé — c'est le point d'entrée à privilégier quand une carrière a traversé
            plusieurs statuts.
          </p>
          <p>
            Trois précisions utiles, parce qu'elles corrigent des malentendus fréquents. D'abord,
            un relevé de carrière n'est pas une estimation de pension : il recense des droits, il
            n'en calcule pas le montant final. Ensuite, un trimestre de retraite n'est pas une
            durée de présence dans l'entreprise mais un montant de rémunération soumise à
            cotisation : on peut valider quatre trimestres en travaillant une partie de l'année, et
            à l'inverse ne valider qu'un ou deux trimestres sur une année entière de temps très
            partiel. Enfin, un relevé « vide » sur une période donnée ne signifie pas toujours une
            erreur : certaines périodes n'ouvrent effectivement aucun droit. La vérification
            consiste précisément à distinguer les deux.
          </p>
          <p>
            Deux documents plus complets circulent par ailleurs à intervalles réguliers : un relevé
            de situation individuelle, adressé périodiquement à partir du milieu de carrière, et
            une estimation indicative globale, envoyée à l'approche de l'âge de départ, qui ajoute
            au relevé une projection de pension selon plusieurs âges de liquidation. Ces envois
            sont utiles, mais ils arrivent à leur rythme, pas au vôtre : rien n'oblige à les
            attendre pour consulter son compte en ligne.
          </p>

          <h2 id="quand">2. Quand le vérifier : pourquoi 45-55 ans, pas 62</h2>
          <p>
            La réponse est arithmétique, pas psychologique. Corriger un relevé suppose de produire
            des justificatifs — bulletins de salaire, contrats, attestations d'employeur,
            attestations d'organismes sociaux. Or ces pièces se perdent, les entreprises
            disparaissent, les archives se dispersent, et la mémoire des dates s'efface. Chaque
            année qui passe rend la reconstitution d'une période ancienne un peu plus difficile.
          </p>
          <p>
            À cela s'ajoute une seconde raison, moins évidente : une anomalie détectée à 50 ans
            laisse encore des options ouvertes. Il reste du temps pour cotiser, pour arbitrer un
            rachat de trimestres, pour décaler une date de départ de quelques mois, pour ajuster
            l'effort d'épargne. La même anomalie découverte au dépôt du dossier de liquidation ne
            laisse presque plus rien : la date est là, le dossier est en cours, et la marge de
            manœuvre se limite à repousser le départ. C'est la différence entre une correction
            administrative et une décision subie.
          </p>
          <p>
            Notre analyse : entre 45 et 55 ans, la vérification du relevé devrait être un réflexe
            au même titre qu'une déclaration de revenus — une fois, sérieusement, puis un contrôle
            rapide tous les trois à cinq ans, et systématiquement après un changement de statut
            (passage du privé au public, création d'entreprise, expatriation, longue interruption).
            Notre <a href="/guide/combien-faut-il-epargner-pour-la-retraite">guide sur le montant à
            épargner pour la retraite</a> part d'ailleurs de ce chiffre : sans trimestres vérifiés,
            l'estimation du besoin d'épargne repose sur du sable.
          </p>

          <h2 id="erreurs">3. Les six périodes où les oublis se concentrent</h2>
          <p>
            Les anomalies ne sont pas réparties au hasard sur une carrière. Elles se concentrent
            sur les moments où la chaîne déclarative a été la plus fragile.
          </p>
          <ol>
            <li>
              <strong>Les débuts de carrière.</strong> Jobs d'été, contrats courts, apprentissage,
              stages rémunérés, premiers emplois chez un employeur qui n'existe plus : c'est de
              loin la zone la plus accidentée des relevés, et la plus ancienne — donc celle dont
              les justificatifs sont les plus difficiles à retrouver.
            </li>
            <li>
              <strong>Les périodes non travaillées assimilées.</strong> Chômage indemnisé, arrêts
              maladie longs, congé maternité, invalidité : ces périodes peuvent ouvrir des droits
              sans cotisation, à condition d'avoir été correctement transmises par l'organisme
              payeur au régime de retraite. La transmission n'est pas toujours allée jusqu'au bout.
            </li>
            <li>
              <strong>Les changements de régime.</strong> Passage du privé au public ou l'inverse,
              installation à son compte, statut de conjoint collaborateur, périodes en tant que
              travailleur indépendant : chaque bascule crée une jointure, et les jointures sont
              l'endroit naturel des pertes d'information.
            </li>
            <li>
              <strong>Les années à l'étranger.</strong> Expatriation, détachement, carrière partielle
              dans un autre pays de l'Union européenne ou dans un pays lié par une convention : ces
              droits existent mais ne remontent pas spontanément sur un relevé français. Ils se
              déclarent et se justifient.
            </li>
            <li>
              <strong>Le service national, pour les générations concernées.</strong> Régulièrement
              absent des relevés alors qu'il ouvre des droits.
            </li>
            <li>
              <strong>Les majorations liées aux enfants.</strong> Trimestres au titre de la
              maternité, de l'éducation ou de l'adoption, périodes de congé parental : leur
              attribution obéit à des règles précises et leur absence sur un relevé passe d'autant
              plus inaperçue qu'on ne pense pas à les chercher.
            </li>
          </ol>
          <p>
            À cette liste s'ajoute un cas particulier, plus rare mais lourd : l'employeur qui a
            prélevé les cotisations sur le bulletin de salaire sans jamais les reverser. Le
            bulletin de salaire fait foi — c'est exactement pour ce type de situation qu'il faut le
            conserver, sans limite de durée, jusqu'à la liquidation de la pension.
          </p>

          <h2 id="cout">4. Ce que coûte un trimestre manquant</h2>
          <p>
            Un trimestre absent du relevé produit deux effets distincts, qui se cumulent. Le
            premier est la décote : si le départ intervient sans la durée d'assurance requise et
            avant l'âge du taux plein automatique ({REGIME_GENERAL.ageTauxPleinAutomatique} ans au
            régime général), chaque trimestre manquant minore définitivement la pension de base
            de {pct(REGIME_GENERAL.decoteParTrimestre)}, dans la limite de{" "}
            {REGIME_GENERAL.decotePlafondTrimestres} trimestres pris en compte — soit une
            minoration maximale de {pct(decoteMaximalePct)}. Le second est la proratisation : la
            pension de base est calculée au prorata de la durée d'assurance effectivement validée
            rapportée à la durée requise, si bien qu'un trimestre manquant pèse une seconde fois,
            indépendamment de la décote. Le détail de ce premier mécanisme est développé dans{" "}
            <a href="/guide/surcote-decote-retraite">notre guide sur la surcote et la décote</a>.
          </p>
          <div className="note">
            <p>
              <strong>Avertissement :</strong> l'illustration qui suit est purement pédagogique.
              Elle isole le seul effet de la décote sur une pension de base mensuelle
              conventionnelle de {euros(pensionMensuelle)} (valeur d'illustration du site, révisée
              en {HYPOTHESES_MAJ}, sans lien avec un cas réel), à l'exclusion de l'effet de
              proratisation et des règles propres aux régimes complémentaires. Ce n'est ni une
              projection ni une estimation de votre situation : seul un relevé individuel permet un
              chiffrage personnel.
            </p>
          </div>
          <p>
            Sur cette base, un seul trimestre manquant à tort représenterait de l'ordre de{" "}
            {euros(perteMensuelleUnTrimestre)} de pension mensuelle en moins, soit environ{" "}
            {euros(perteAnnuelleUnTrimestre)} par an — non pas une fois, mais chaque année, pendant
            toute la durée de la retraite. Une année entière oubliée, soit quatre trimestres, porte
            l'écart à environ {euros(perteMensuelleQuatreTrimestres)} par mois. C'est ce qui rend
            la disproportion frappante : la correction, elle, coûte le temps de retrouver des
            bulletins de salaire et d'envoyer un courrier.
          </p>
          <p>
            La comparaison avec le rachat éclaire le même point. Racheter des trimestres est
            possible, dans la limite de {REGIME_GENERAL.rachatTrimestresPlafond} trimestres, mais
            se paie — parfois plusieurs milliers d'euros l'unité selon l'âge et les revenus, comme
            le détaille{" "}
            <a href="/guide/combien-coute-rachat-trimestres-retraite">
              notre guide sur le coût du rachat de trimestres
            </a>
            . Or un trimestre manquant à tort n'a pas à être racheté : il doit être rétabli, ce qui
            est gratuit. Vérifier son relevé avant d'envisager un rachat, c'est éviter de payer
            pour un droit qu'on possède déjà.
          </p>

          <h2 id="corriger">5. La procédure de rectification, étape par étape</h2>
          <ol>
            <li>
              <strong>Rassemblez le relevé complet.</strong> Connectez-vous à votre compte sur{" "}
              <a href="https://www.info-retraite.fr" target="_blank" rel="noopener noreferrer">
                info-retraite.fr
              </a>{" "}
              et téléchargez le relevé tous régimes. Travaillez sur le document intégral, pas sur
              l'écran de synthèse.
            </li>
            <li>
              <strong>Reconstituez votre chronologie en parallèle.</strong> Sur une feuille, listez
              vos années d'activité, employeur par employeur, avec les dates de début et de fin —
              y compris les contrats courts et les périodes non travaillées. Cette liste est votre
              référence ; le relevé est ce que l'administration en sait.
            </li>
            <li>
              <strong>Comparez ligne à ligne et marquez les écarts.</strong> Année manquante,
              nombre de trimestres inférieur à ce que la période justifie, employeur absent,
              rémunération manifestement erronée, période à l'étranger non reprise.
            </li>
            <li>
              <strong>Réunissez les justificatifs de chaque écart.</strong> Bulletins de salaire
              (les plus probants), contrat de travail, certificat de travail, attestation
              d'employeur, attestations de l'organisme d'indemnisation pour les périodes de chômage
              ou de maladie, livret militaire, actes de naissance pour les majorations liées aux
              enfants.
            </li>
            <li>
              <strong>Adressez la demande de rectification au régime concerné</strong>, en
              privilégiant la messagerie sécurisée de votre compte retraite, qui conserve une trace
              horodatée. Une demande par anomalie, avec les pièces correspondantes : les dossiers
              groupés et non documentés se traitent mal.
            </li>
            <li>
              <strong>Conservez tout et relancez.</strong> Gardez copie des envois et des accusés
              de réception, et vérifiez sur le relevé actualisé que la correction a bien été
              intégrée. Une correction annoncée n'est acquise qu'une fois visible sur le relevé.
            </li>
          </ol>
          <p>
            Quand une pièce est définitivement introuvable — employeur liquidé, archives détruites
            —, tout n'est pas nécessairement perdu : des voies de régularisation existent selon la
            situation, et c'est précisément le type de dossier où l'accompagnement d'un
            professionnel de la retraite ou du régime lui-même fait gagner du temps. La règle
            pratique reste la même : plus le dossier est ancien, plus il faut s'y prendre tôt.
          </p>

          <h2 id="fonctionnaires">6. Le cas des fonctionnaires</h2>
          <p>
            Pour un agent public, la logique est identique mais les documents et les interlocuteurs
            diffèrent : la carrière est suivie par le régime de retraite de l'employeur public
            concerné, et les éléments à contrôler ne sont pas tout à fait les mêmes qu'au régime
            général. Deux points méritent une attention particulière. D'une part, les périodes
            passées hors de la fonction publique — contrats de droit privé avant titularisation,
            vacations, années comme agent contractuel — sont une source classique d'écarts, parce
            qu'elles relèvent d'un autre régime et doivent être reprises correctement. D'autre
            part, les primes et indemnités ouvrent des droits dans le régime additionnel de la
            fonction publique, distinct de la pension principale, et c'est un volet que beaucoup
            d'agents découvrent tardivement.
          </p>
          <p>
            Ces spécificités, et ce qu'elles impliquent pour la constitution d'un complément de
            revenus, sont développées dans{" "}
            <a href="/guide/retraite-fonctionnaires-completer">
              notre guide sur la retraite des fonctionnaires
            </a>
            . Le portail inter-régimes reste, là aussi, le point d'entrée le plus simple pour
            obtenir une vue consolidée quand la carrière a mêlé public et privé.
          </p>

          <h2 id="checklist">Check-list : votre vérification en une heure</h2>
          <ol>
            <li>
              <strong>Créez ou retrouvez votre accès</strong> au compte retraite sur le portail
              inter-régimes, et téléchargez le relevé tous régimes en PDF.
            </li>
            <li>
              <strong>Écrivez votre chronologie de carrière de mémoire</strong>, avant de lire le
              relevé en détail — c'est ce décalage qui fait apparaître les oublis.
            </li>
            <li>
              <strong>Contrôlez en priorité les cinq premières années</strong> de votre vie active :
              statistiquement, c'est là que se trouvent les anomalies.
            </li>
            <li>
              <strong>Vérifiez chaque période non travaillée</strong> (chômage, maladie, maternité,
              service national) et chaque changement d'employeur ou de statut.
            </li>
            <li>
              <strong>Comptez les majorations liées aux enfants</strong> si vous êtes concerné.
            </li>
            <li>
              <strong>Notez le total de trimestres validés</strong> et confrontez-le à la durée
              requise pour votre génération : c'est ce chiffre qui conditionne votre date de taux
              plein.
            </li>
            <li>
              <strong>Ouvrez un dossier de justificatifs</strong> pour chaque écart constaté, et
              lancez la demande de rectification sans attendre l'envoi automatique suivant.
            </li>
          </ol>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>À partir de quel âge peut-on consulter son relevé de carrière ?</h3>
          <p>
            Dès l'entrée dans la vie active : le compte retraite en ligne est accessible à tout
            assuré ayant cotisé, sans condition d'âge. Les envois automatiques de documents de
            synthèse interviennent, eux, à partir du milieu de carrière, puis à intervalles
            réguliers — mais rien n'empêche de consulter son relevé bien avant.
          </p>
          <h3>Un trimestre manquant est-il toujours une erreur ?</h3>
          <p>
            Non. Une période peut légitimement n'ouvrir aucun droit — rémunération trop faible sur
            l'année, période non déclarée parce que non cotisable. C'est la comparaison avec vos
            propres justificatifs qui permet de trancher, pas l'impression que « l'année devrait
            compter ».
          </p>
          <h3>Combien de temps faut-il conserver ses bulletins de salaire ?</h3>
          <p>
            Sans limite de durée, jusqu'à la liquidation de la retraite et même au-delà. C'est la
            pièce la plus probante en cas de contestation, notamment lorsqu'un employeur a
            disparu.
          </p>
          <h3>La correction d'un relevé est-elle payante ?</h3>
          <p>
            Non. Faire rectifier une anomalie sur justificatifs relève du fonctionnement normal du
            régime et ne se paie pas. C'est ce qui distingue radicalement une correction d'un
            rachat de trimestres, lequel consiste à acquérir des droits qu'on n'a pas.
          </p>
          <h3>Faut-il attendre l'estimation indicative globale pour agir ?</h3>
          <p>
            Notre analyse : non. Ce document arrive à l'approche de l'âge de départ, à un moment où
            la marge de manœuvre s'est déjà considérablement réduite. Le vérifier alors reste
            utile, mais l'essentiel du bénéfice d'une vérification se joue une décennie plus tôt.
          </p>
          <h3>Mon relevé est correct : que faire ensuite ?</h3>
          <p>
            C'est le point de départ, pas la conclusion. Une fois les trimestres fiabilisés, la
            question devient celle de l'écart entre la pension attendue et le niveau de vie
            souhaité, puis celle des enveloppes à mobiliser pour le combler — c'est l'objet de{" "}
            <a href="/guide/combien-faut-il-epargner-pour-la-retraite">
              notre guide sur le montant à épargner
            </a>{" "}
            et de notre <a href="/simulateur-retraite">simulateur retraite</a>. Si vous envisagez de
            prolonger une activité après la liquidation, notre guide sur le{" "}
            <a href="/guide/cumul-emploi-retraite-comment-ca-marche">cumul emploi-retraite</a>{" "}
            détaille les règles à connaître avant de s'engager.
          </p>

          <p>
            Vérifier son relevé de carrière ne rapporte rien de spectaculaire et ne se raconte pas
            en dîner. C'est pourtant, à notre sens, l'un des rares gestes de préparation retraite
            dont le bénéfice est certain, immédiatement chiffrable, et entièrement sous votre
            contrôle — contrairement au rendement d'un placement. Une heure aujourd'hui, des
            justificatifs encore accessibles, et la certitude de ne pas racheter au prix fort un
            droit que vous possédez déjà.
          </p>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les règles de
              validation des trimestres, les majorations et les procédures de régularisation varient
              selon la génération, le régime d'affiliation et la situation individuelle : elles
              doivent être vérifiées auprès de vos régimes et sur les sources officielles —{" "}
              <a href="https://www.info-retraite.fr" target="_blank" rel="noopener noreferrer">
                info-retraite.fr
              </a>{" "}
              et{" "}
              <a href="https://www.service-public.fr" target="_blank" rel="noopener noreferrer">
                service-public.fr
              </a>
              . Les paramètres du régime général cités ici (décote de{" "}
              {pct(REGIME_GENERAL.decoteParTrimestre)} par trimestre, plafond de{" "}
              {REGIME_GENERAL.decotePlafondTrimestres} trimestres, âge du taux plein automatique à{" "}
              {REGIME_GENERAL.ageTauxPleinAutomatique} ans) sont ceux retenus par nos hypothèses,
              révisées en {HYPOTHESES_MAJ} et susceptibles d'évoluer par la loi.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Relevé vérifié : reste à savoir ce qu'il faut construire à côté. Parlons-en." />
    </>
  );
}
