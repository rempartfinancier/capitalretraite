import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  COUPLE_TRANSMISSION,
  FISCALITE,
  PER_PLAFOND,
  TRANSMISSION,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const C = COUPLE_TRANSMISSION;
const F = FISCALITE;
const T = TRANSMISSION;
const P = PER_PLAFOND;

// ---- PER : plafond individuel et effet de la TMI ----
const plafondPlancher = (P.pass2025 * P.tauxPlancherPass) / 100;
const plafondMaximum = (P.pass2025 * P.multiplePassMaximum * P.tauxRevenusActivite) / 100;
const economieImpot = (versement, tmi) => (versement * tmi) / 100;
const ecartTmi =
  economieImpot(C.versementPerExemple, C.tmiConjointHaut) -
  economieImpot(C.versementPerExemple, C.tmiConjointBas);

// ---- Assurance-vie : abattement annuel sur les gains, contrats de plus de 8 ans ----
const gainsImposablesIR = (gains, abattement) => Math.max(gains - abattement, 0);
const irSurGains = (gains, abattement) =>
  (gainsImposablesIR(gains, abattement) * F.avTauxReduitApres8Ans) / 100;
const irSeul = irSurGains(C.gainsAnnuelsAvExemple, F.avAbattementAnnuelSeul);
const irCouple = irSurGains(C.gainsAnnuelsAvExemple, F.avAbattementAnnuelCouple);
const psSurGains = (C.gainsAnnuelsAvExemple * F.prelevementsSociaux.assuranceVie) / 100;

// ---- Transmission : deux contrats, deux parents ----
const avParEnfantDeuxContrats = 2 * T.abattementSuccessionAvParBeneficiaire;
const avTotalEnfants = C.nombreEnfantsExemple * avParEnfantDeuxContrats;
const donationParEnfantDeuxParents = 2 * T.abattementDonationParEnfant;
const donationTotal = C.nombreEnfantsExemple * donationParEnfantDeuxParents;

const sources = [
  {
    label: "Service-Public.gouv.fr — rubrique Retraite (pension de réversion, âge de départ, droits des conjoints)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits",
  },
  {
    label: "Service-Public.gouv.fr — Plan d'épargne retraite (PER) : plafond de déduction, fiche F34982",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34982",
  },
  {
    label: "Légifrance — Code général des impôts, articles 125-0 A (fiscalité des produits d'assurance-vie), 163 quatervicies (PER), 779 (abattements de donation), 796-0 bis (exonération du conjoint et du partenaire de Pacs) et 990 I (assurance-vie en cas de décès)",
    url: "https://www.legifrance.gouv.fr",
  },
  {
    label: "BOFiP-Impôts — Doctrine fiscale : assurance-vie, successions et donations",
    url: "https://bofip.impots.gouv.fr",
  },
  {
    label: "impots.gouv.fr — Particulier : imposition commune, déclaration de revenus, succession",
    url: "https://www.impots.gouv.fr",
  },
  {
    label: "L'Assurance retraite — Réversion et droits du conjoint survivant (régime général)",
    url: "https://www.lassuranceretraite.fr",
  },
  {
    label: "Agirc-Arrco — Retraite complémentaire : pension de réversion",
    url: "https://www.agirc-arrco.fr",
  },
  {
    label: "info-retraite.fr — Espace commun des régimes de retraite (relevé de carrière, estimation)",
    url: "https://www.info-retraite.fr",
  },
  {
    label: "AMF — Épargner et investir : assurance-vie, risques et frais",
    url: "https://www.amf-france.org",
  },
];

export default function GuideRetraiteCoupleTransmission() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Couple · transmission</span>
          <h1>Épargne retraite en couple : comment l'organiser et la transmettre ?</h1>
          <p className="sub">
            Deux retraites, deux tranches d'impôt, deux contrats : ce qui change quand on prépare sa
            retraite à deux. Mis à jour le {C.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> en couple, l'épargne retraite se pilote à deux niveaux.
              Pendant la vie active, les versements sur un PER gagnent à être pensés selon la tranche
              marginale d'imposition de chacun, les plafonds pouvant être mutualisés entre conjoints
              soumis à imposition commune. À la retraite, l'abattement annuel sur les gains d'une
              assurance-vie de plus de huit ans passe de {euros(F.avAbattementAnnuelSeul)} à{" "}
              {euros(F.avAbattementAnnuelCouple)} pour un couple. Au décès, ce sont la clause
              bénéficiaire, le régime matrimonial et la pension de réversion qui décident de qui
              reçoit quoi. Aucune de ces briques n'est universelle : tout se vérifie cas par cas.
            </p>
          </div>

          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel :
            Hélène et Marc, mariés, ont une cinquantaine d'années. Elle est cadre et se situe dans
            une tranche d'imposition élevée ; il travaille à temps partiel et se situe dans une
            tranche plus basse. Ils ont deux enfants, un PER ouvert au nom d'Hélène, une
            assurance-vie à chacun, et une question simple : qui doit épargner où, et que devient
            tout cela si l'un des deux disparaît avant l'autre ?
          </p>
          <p>
            Les guides généraux traitent souvent l'épargnant comme une personne seule. Or un foyer
            fiscal à deux, c'est deux pensions de retraite, deux espérances de vie différentes, un
            barème d'impôt commun et, souvent, un survivant qui devra vivre avec une seule pension et
            parfois un seul niveau de ressources. Cet article ne détaille pas chaque enveloppe : il
            montre ce qui change à deux, et renvoie vers les pages dédiées pour le reste.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#deux-retraites">Deux retraites, deux tranches d'impôt : pourquoi raisonner à deux ?</a></li>
              <li><a href="#repartition">Comment répartir les versements PER et assurance-vie entre conjoints ?</a></li>
              <li><a href="#abattement">L'abattement de l'assurance-vie double-t-il vraiment en couple ?</a></li>
              <li><a href="#clause">Comment rédiger la clause bénéficiaire d'un couple ?</a></li>
              <li><a href="#reversion">Que devient la retraite au décès du premier conjoint ?</a></li>
              <li><a href="#donation">Donation ou assurance-vie : que changent deux parents ?</a></li>
              <li><a href="#regime">Quel rôle joue le régime matrimonial ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#plus-loin">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="deux-retraites">Deux retraites, deux tranches d'impôt : pourquoi raisonner à deux ?</h2>
          <p>
            Chaque conjoint acquiert ses propres droits : un relevé de carrière, des points
            Agirc-Arrco s'il a été salarié du privé, une pension de fonctionnaire le cas échéant. Ces
            droits ne s'additionnent pas automatiquement et ne sont pas égaux : carrières
            inégales, temps partiels, interruptions pour les enfants, écart de salaires. À la
            retraite, le couple dispose de deux pensions, mais le niveau de vie de chacun dépend
            aussi de ce qui reste si l'autre disparaît.
          </p>
          <p>
            L'impôt, lui, se calcule au niveau du foyer, avec une tranche marginale d'imposition
            (TMI) commune au couple pour la part de revenu qui s'y rattache, et des mécanismes
            individuels ou communs selon les enveloppes. Deux conséquences pratiques : l'intérêt
            fiscal d'un versement déductible dépend de la TMI du foyer au moment où l'on verse, et
            l'imposition à la sortie dépend de la situation de chacun au moment du retrait. Notre
            guide{" "}
            <a href="/guide/per-ou-assurance-vie-selon-age-et-tmi">PER ou assurance-vie selon l'âge
            et la TMI</a> détaille ce raisonnement pour une personne seule ; la suite l'adapte au
            couple.
          </p>
          <p>
            Une première étape, avant tout arbitrage : récupérer ses deux relevés de carrière et
            ses deux estimations sur{" "}
            <a href="https://www.info-retraite.fr" target="_blank" rel="noopener noreferrer">info-retraite.fr</a>,
            puis{" "}
            <a href="/guide/verifier-releve-de-carriere-retraite">vérifier chaque relevé</a>.
            Combien épargner dépend d'abord de l'écart entre le revenu visé à deux et la somme des
            deux pensions ; notre page{" "}
            <a href="/guide/combien-faut-il-epargner-pour-la-retraite">combien faut-il épargner pour
            la retraite</a> détaille la méthode.
          </p>

          <h2 id="repartition">Comment répartir les versements PER et assurance-vie entre conjoints ?</h2>
          <p>
            Le plafond de déduction du PER est individuel : il correspond à {P.tauxRevenusActivite} %
            des revenus d'activité de l'année précédente, dans la limite de {P.multiplePassMaximum}{" "}
            fois le plafond de la sécurité sociale, avec un plancher de {P.tauxPlancherPass} % de ce
            plafond. Avec le plafond de la sécurité sociale de {euros(P.pass2025)} (versements de
            2026), cela donne un plancher de {euros(plafondPlancher)} et un maximum de{" "}
            {euros(plafondMaximum)} par personne, hors reports des années antérieures. Les couples
            mariés ou pacsés soumis à imposition commune peuvent, selon la rédaction du code général
            des impôts, mutualiser leurs plafonds : un conjoint peu imposé laisse alors
            une partie de son plafond à l'autre. L'option se vérifie sur l'avis d'impôt et à la
            déclaration.
          </p>
          <p>
            L'avantage fiscal à l'entrée est proportionnel à la TMI de celui qui déduit. Illustration
            avec un versement de {euros(C.versementPerExemple)} :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Qui déduit le versement ?</th>
                  <th>TMI retenue</th>
                  <th>Réduction d'impôt à l'entrée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Conjoint le mieux rémunéré</td>
                  <td>{pct(C.tmiConjointHaut)}</td>
                  <td>{euros(economieImpot(C.versementPerExemple, C.tmiConjointHaut))}</td>
                </tr>
                <tr>
                  <td>Conjoint le moins bien rémunéré</td>
                  <td>{pct(C.tmiConjointBas)}</td>
                  <td>{euros(economieImpot(C.versementPerExemple, C.tmiConjointBas))}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            L'écart est de {euros(ecartTmi)} pour {euros(C.versementPerExemple)} versés. Mais ce
            n'est qu'une face du calcul : l'économie d'impôt est un report de fiscalité, car la
            sortie, en capital comme en rente, est imposée selon les règles propres au PER (voir{" "}
            <a href="/guide/fiscalite-sortie-per">la fiscalité à la sortie du PER</a>). Le PER ouvert
            au nom du conjoint le moins imposé peut paraître moins avantageux à l'entrée ; il peut
            l'être davantage si ce même conjoint a une retraite plus faible et sortira donc, plus
            tard, dans une tranche plus basse. Ce raisonnement est conditionnel : il suppose des
            hypothèses sur les revenus futurs, impossibles à garantir.
          </p>
          <p>
            Pour l'assurance-vie, le raisonnement est plus souple : il n'y a pas de déduction à
            l'entrée, mais une fiscalité allégée sur les gains après huit ans et un régime
            successoral favorable. Deux contrats, un par conjoint, donnent plus de souplesse pour les
            rachats comme pour la transmission, à condition de respecter les frais et la
            diversification de chaque contrat (voir{" "}
            <a href="/strategies/assurance-vie-retraite">la stratégie assurance-vie</a> et{" "}
            <a href="/strategies/per">la stratégie PER</a>).
          </p>
          <div className="note">
            <p>
              Précision importante : ces chiffres sont des illustrations de mécanisme. Le choix entre
              versements de l'un ou de l'autre dépend aussi de la liquidité souhaitée, de la durée
              d'investissement, des frais et des cas de déblocage (voir{" "}
              <a href="/guide/deblocage-anticipe-per">le déblocage anticipé du PER</a>). Il se discute
              avec un professionnel, cas par cas.
            </p>
          </div>

          <h2 id="abattement">L'abattement de l'assurance-vie double-t-il vraiment en couple ?</h2>
          <p>
            Pour les rachats sur un contrat de plus de huit ans, les gains bénéficient d'un abattement
            annuel pour l'impôt sur le revenu : {euros(F.avAbattementAnnuelSeul)} pour une personne
            seule, {euros(F.avAbattementAnnuelCouple)} pour un couple soumis à imposition commune.
            Ce point est souvent mal compris : l'abattement du couple est une enveloppe commune au
            foyer fiscal, pas un montant à répartir « un contrat par conjoint ». Un seul des deux
            contrats peut suffire à l'utiliser entièrement. Les prélèvements sociaux, eux, portent
            sur la totalité des gains.
          </p>
          <p>
            Exemple chiffré, avec {euros(C.gainsAnnuelsAvExemple)} de gains rachetés dans l'année sur
            des contrats de plus de huit ans, et l'hypothèse que le taux réduit de{" "}
            {pct(F.avTauxReduitApres8Ans)} s'applique (ce qui dépend du montant des primes versées,
            à vérifier) :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Situation</th>
                  <th>Abattement</th>
                  <th>Gains soumis à l'IR</th>
                  <th>Impôt sur le revenu</th>
                  <th>Prélèvements sociaux ({pct(F.prelevementsSociaux.assuranceVie)})</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Personne seule</td>
                  <td>{euros(F.avAbattementAnnuelSeul)}</td>
                  <td>{euros(gainsImposablesIR(C.gainsAnnuelsAvExemple, F.avAbattementAnnuelSeul))}</td>
                  <td>{euros(irSeul)}</td>
                  <td>{euros(psSurGains)}</td>
                </tr>
                <tr>
                  <td>Couple (imposition commune)</td>
                  <td>{euros(F.avAbattementAnnuelCouple)}</td>
                  <td>{euros(gainsImposablesIR(C.gainsAnnuelsAvExemple, F.avAbattementAnnuelCouple))}</td>
                  <td>{euros(irCouple)}</td>
                  <td>{euros(psSurGains)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Cet écart d'impôt de {euros(irSeul - irCouple)} est modeste ; il n'est que
            l'application d'une formule. Pour étaler les rachats dans le temps et optimiser leur
            fiscalité, notre guide sur{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">le rachat partiel d'une
            assurance-vie</a> et celui sur{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a> donnent la
            méthode. Un point de vigilance : un contrat ouvert depuis moins de huit ans ne donne pas
            droit à cet abattement, d'où l'intérêt d'avoir ouvert tôt au moins un contrat.
          </p>

          <h2 id="clause">Comment rédiger la clause bénéficiaire d'un couple ?</h2>
          <p>
            La clause bénéficiaire désigne qui reçoit le capital d'une assurance-vie au décès de
            l'assuré. Le conjoint survivant, marié ou pacsé, est exonéré de droits de succession ; la
            clause standard « mon conjoint, à défaut mes enfants » est donc fréquente. Elle
            soulève toutefois plusieurs questions, que seule votre situation permet de trancher.
          </p>
          <ul>
            <li>
              <strong>Le conjoint a-t-il besoin du capital ?</strong> S'il dispose de revenus et d'un
              patrimoine suffisants, désigner directement les enfants peut utiliser leurs
              abattements, au lieu de faire passer le capital par le conjoint puis par sa
              succession.
            </li>
            <li>
              <strong>Chaque contrat a sa propre clause.</strong> Les deux conjoints ne sont pas
              obligés de choisir les mêmes bénéficiaires ; la cohérence d'ensemble se construit
              contrat par contrat.
            </li>
            <li>
              <strong>Les héritiers à protéger.</strong> Enfants d'une première union, beaux-enfants,
              concubin ou partenaire de Pacs : leurs droits ne sont pas ceux d'un conjoint marié.
            </li>
            <li>
              <strong>La rédaction elle-même.</strong> Une clause trop vague (« mes héritiers ») peut
              produire un résultat non voulu. Elle se met à jour après un mariage, un divorce, une
              naissance ou un décès.
            </li>
          </ul>
          <p>
            Pour les versements effectués avant 70 ans, l'abattement prévu à l'article 990 I du
            code général des impôts est de {euros(T.abattementSuccessionAvParBeneficiaire)} par
            bénéficiaire et par assuré ; pour les versements après 70 ans, un abattement global de{" "}
            {euros(T.abattementSuccessionAvApres70Collectif)} s'applique à l'ensemble des
            bénéficiaires, sur les primes. Avec deux parents titulaires chacun d'un contrat et{" "}
            {C.nombreEnfantsExemple} enfants désignés, cela représente jusqu'à{" "}
            {euros(avParEnfantDeuxContrats)} par enfant ({euros(avTotalEnfants)} au total), sous
            réserve que les primes aient été versées avant 70 ans et que chaque contrat atteigne ce
            montant. Au-delà de ces seuils, un prélèvement spécifique s'applique ; ce barème est
            détaillé dans{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">notre guide donation ou
            assurance-vie</a>.
          </p>

          <h2 id="reversion">Que devient la retraite au décès du premier conjoint ?</h2>
          <p>
            Au décès du premier conjoint, deux flux changent : les pensions de l'intéressé
            cessent, et le survivant peut, sous conditions, percevoir une pension de réversion. En
            principe, cette pension est liée au mariage ; les concubins et, en règle générale, les
            partenaires de Pacs n'y ont pas droit. Chaque régime (régime général, Agirc-Arrco,
            fonction publique, régimes d'indépendants) a ses propres règles : condition d'âge,
            plafond de ressources dans certains cas, part de la pension du défunt reversée au
            survivant. Nous ne chiffrons volontairement aucune de ces règles : elles diffèrent d'un
            régime à l'autre et sont révisées. La réponse fiable vient des caisses concernées, via{" "}
            <a href="https://www.lassuranceretraite.fr" target="_blank" rel="noopener noreferrer">l'Assurance retraite</a>,{" "}
            <a href="https://www.agirc-arrco.fr" target="_blank" rel="noopener noreferrer">l'Agirc-Arrco</a>{" "}
            ou la caisse de la fonction publique.
          </p>
          <p>
            Dans un plan à deux, le réflexe utile consiste à poser une question de survivant : si
            l'un de nous disparaissait demain, de quelles ressources disposerait l'autre ? La
            réponse dépend de la réversion, de l'épargne disponible, des charges fixes qui ne
            baissent pas de moitié (logement notamment) et de la présence ou non de rentes
            viagères avec option de réversion (voir{" "}
            <a href="/guide/inconvenients-rente-viagere">les inconvénients de la rente viagère</a>).
          </p>
          <p>
            Côté épargne, le traitement d'un PER ou d'une assurance-vie au décès dépend du type de
            contrat, de la clause bénéficiaire, de l'âge au décès et, pour la fiscalité, des règles
            en vigueur. Les PER assurantiels et les assurances-vie suivent des règles voisines mais
            non identiques ; le détail se confirme auprès de l'assureur et d'un notaire.
          </p>

          <h2 id="donation">Donation ou assurance-vie : que changent deux parents ?</h2>
          <p>
            Deux parents disposent, chacun, d'un abattement de donation de{" "}
            {euros(T.abattementDonationParEnfant)} par enfant, renouvelable tous les{" "}
            {T.renouvellementDonationAnnees} ans. Pour {C.nombreEnfantsExemple} enfants, cela donne
            jusqu'à {euros(donationParEnfantDeuxParents)} par enfant et {euros(donationTotal)} au
            total, sans droits de donation, sous réserve de ne pas avoir déjà utilisé ces
            abattements au cours des {T.renouvellementDonationAnnees} dernières années.
          </p>
          <p>
            Le choix entre donner de son vivant et laisser un capital par assurance-vie n'est pas
            symétrique. La donation est irrévocable en principe et prive le donateur du capital ;
            l'assurance-vie reste disponible jusqu'au décès, ce qui compte pour qui finance sa
            retraite. Les deux voies se combinent parfois. Pour une retraite à deux, la liquidité du
            survivant pèse lourd dans l'arbitrage ; le guide{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">donation ou assurance-vie</a>{" "}
            détaille les avantages et limites de chaque voie.
          </p>

          <h2 id="regime">Quel rôle joue le régime matrimonial ?</h2>
          <p>
            Le régime matrimonial (communauté réduite aux acquêts, séparation de biens, communauté
            universelle, participation aux acquêts) détermine ce qui appartient à qui, et donc ce qui
            entre dans la succession. Il peut modifier le traitement d'un contrat d'assurance-vie ou
            d'un PER, par exemple selon l'origine des fonds versés. Il peut être aménagé
            (changement de régime, avantages entre époux, donation entre époux), avec des
            conséquences civiles et fiscales qui relèvent du notaire. Nous ne les détaillons donc
            pas : cette page ne remplace ni l'examen de votre contrat de mariage ni le conseil
            d'un notaire.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Faut-il un PER pour chaque conjoint ?</h3>
          <p>
            Pas nécessairement. Chaque conjoint a un plafond individuel, mutualisable entre époux
            ou partenaires de Pacs imposés ensemble ; un PER pour chacun permet d'utiliser les deux
            plafonds et de garder la maîtrise individuelle des fonds. Le choix dépend de vos revenus,
            des frais et de vos objectifs.
          </p>
          <h3>L'abattement de {euros(F.avAbattementAnnuelCouple)} s'applique-t-il à chaque contrat ?</h3>
          <p>
            Non. Il s'applique au foyer fiscal pour l'ensemble des gains rachetés dans l'année sur des
            contrats de plus de huit ans, quel que soit le nombre de contrats.
          </p>
          <h3>Le conjoint survivant paie-t-il des droits sur l'assurance-vie ?</h3>
          <p>
            Le conjoint marié ou le partenaire de Pacs est exonéré de droits de succession, y compris
            sur les capitaux d'assurance-vie qui lui sont attribués. Les autres bénéficiaires relèvent
            des abattements de l'article 990 I.
          </p>
          <h3>Un concubin a-t-il droit à une pension de réversion ?</h3>
          <p>
            En principe, non : la réversion suppose un mariage. Les partenaires de Pacs sont en
            règle générale exclus du dispositif. Les règles précises de chaque régime sont à confirmer
            auprès des caisses.
          </p>
          <h3>Peut-on désigner ses enfants plutôt que son conjoint dans la clause ?</h3>
          <p>
            Oui, la clause est libre dans le respect de la loi. Le choix a des effets sur la fiscalité
            et sur les ressources du survivant ; il doit être pesé avec un notaire ou un conseiller.
          </p>
          <h3>Que devient mon PER si je décède avant la retraite ?</h3>
          <p>
            Le capital est généralement transmis aux bénéficiaires désignés dans le contrat, avec une
            fiscalité qui dépend du type de PER et de l'âge au décès. Vérifier la clause et les
            conditions générales est indispensable.
          </p>
          <h3>Qui doit épargner le plus pour la retraite dans un couple ?</h3>
          <p>
            Il n'existe pas de règle générale. L'effort se répartit selon les écarts de pension
            attendus, les TMI, les capacités d'épargne et le besoin de protéger le survivant. Notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> permet de tester des ordres de
            grandeur.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Préparer sa retraite en couple, c'est d'abord ajouter une question à toutes les autres :
            que se passe-t-il pour celui qui reste ? Les mécanismes fiscaux (plafonds de PER
            mutualisables, abattement commun de l'assurance-vie, abattements de succession par
            parent) existent, mais leur gain réel dépend de revenus futurs que personne ne maîtrise
            et d'un cadre légal révisable.
          </p>
          <p>
            Trois vérifications donnent le cadre : les deux relevés de carrière et les droits de
            réversion auprès des caisses, les clauses bénéficiaires de chaque contrat, et le régime
            matrimonial avec un notaire. Les placements comportent des risques de perte en capital, et
            les performances passées ne préjugent pas des performances futures.
          </p>
          <p>
            Si vous souhaitez poser ce cadre à deux, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à réunir les
            données et à identifier les points à vérifier ; il ne remplace pas l'avis d'un notaire
            pour les questions civiles.
          </p>

          <h2 id="plus-loin">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/donation-ou-assurance-vie-transmission">Donation ou assurance-vie : que choisir pour transmettre ?</a></li>
            <li><a href="/guide/per-ou-assurance-vie-selon-age-et-tmi">PER ou assurance-vie selon l'âge et la TMI</a></li>
            <li><a href="/guide/plafond-per-versement-avant-31-decembre-2026">Plafond de versement du PER avant le 31 décembre 2026</a></li>
            <li><a href="/guide/ordre-de-decaissement-retraite">Dans quel ordre décaisser ses placements à la retraite ?</a></li>
            <li><a href="/strategies/decumulation">Stratégie de décumulation</a></li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en novembre 2026 :</p>
          <ul>
            {sources.map((src) => (
              <li key={src.url + src.label}>
                <a href={src.url} target="_blank" rel="noopener noreferrer">
                  {src.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé, ni un conseil
              juridique ou fiscal : seuls vos caisses de retraite, votre assureur et un notaire peuvent
              confirmer vos droits. Les règles citées sont celles publiées en {C.maj} et peuvent
              évoluer. Les exemples chiffrés sont des illustrations pédagogiques, établies sur des
              hypothèses affichées, qui ne préjugent ni de votre situation ni des règles futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Préparer sa retraite à deux se fait avec les deux relevés de carrière en main." />
    </>
  );
}
