import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  AV_RACHAT,
  FISCALITE,
  FRAIS_TYPES,
  V3_AVA_OUVRIR,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const duree = AV_RACHAT.dureeTauxReduitAnnees; // 8 ans
const abattementSeul = FISCALITE.avAbattementAnnuelSeul;
const abattementCouple = FISCALITE.avAbattementAnnuelCouple;
const renonciation = V3_AVA_OUVRIR.delaiRenonciationJours; // 30 jours
const minMin = V3_AVA_OUVRIR.versementInitialOrdreGrandeur.min;
const minMax = V3_AVA_OUVRIR.versementInitialOrdreGrandeur.max;
const versement = V3_AVA_OUVRIR.versementExemple;
const annees = V3_AVA_OUVRIR.dureeExempleAnnees;

// ---- Exemple chiffré : coût des frais sur un versement (encours supposé constant) ----
// Frais annuels en % = frais de gestion du contrat + frais courants des supports.
const bq = FRAIS_TYPES.contratBancaireTraditionnel;
const net = FRAIS_TYPES.contratInternet;
const r2 = (n) => Math.round(n * 100) / 100;
const annuelBqMin = r2(bq.gestionAnnuelle.min + bq.fraisSupports.min); // 2,1 %
const annuelBqMax = r2(bq.gestionAnnuelle.max + bq.fraisSupports.max); // 3,2 %
const annuelNetMin = r2(net.gestionAnnuelle.min + net.fraisSupports.min); // 0,7 %
const annuelNetMax = r2(net.gestionAnnuelle.max + net.fraisSupports.max); // 1 %
const euroDe = (base, taux) => Math.round((base * taux) / 100);
const entreeBqMin = euroDe(versement, bq.entree.min);
const entreeBqMax = euroDe(versement, bq.entree.max);
const anBqMin = euroDe(versement, annuelBqMin);
const anBqMax = euroDe(versement, annuelBqMax);
const anNetMin = euroDe(versement, annuelNetMin);
const anNetMax = euroDe(versement, annuelNetMax);
const totBqMin = entreeBqMin + anBqMin * annees;
const totBqMax = entreeBqMax + anBqMax * annees;
const totNetMin = anNetMin * annees;
const totNetMax = anNetMax * annees;

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Contrat d'assurance-vie : fonctionnement (fiche F15274) : souscription, versements, clause bénéficiaire, renonciation",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F15274",
  },
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : comment sont imposés les revenus d'un contrat d'assurance-vie ? (fiche F22414)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22414",
  },
  {
    label:
      "BOFiP — BOI-RPPM-RCM-20-10-20-50 : produits des contrats d'assurance-vie, ancienneté du contrat, abattement annuel",
    url: "https://bofip.impots.gouv.fr/bofip/3951-PGP.html",
  },
  {
    label:
      "AMF — Autorité des marchés financiers : épargner et investir, unités de compte et risque de perte en capital",
    url: "https://www.amf-france.org",
  },
  {
    label:
      "FGAP — Fonds de garantie des assurances de personnes : protection des souscripteurs en cas de défaillance de l'assureur",
    url: "https://www.fgap.fr",
  },
  {
    label:
      "Légifrance — Code des assurances, art. L132-5-1 (renonciation) et L132-8 (clause bénéficiaire) ; Code général des impôts, art. 125-0 A",
    url: "https://www.legifrance.gouv.fr",
  },
];

export default function GuideOuvrirAssuranceVie() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · Assurance-vie</span>
          <h1>Comment ouvrir une assurance-vie : les étapes, de A à Z</h1>
          <p className="sub">
            Conditions, documents, versement minimum, frais à comparer, clause bénéficiaire et
            délai de renonciation de {renonciation} jours : la démarche pas à pas. Mis à jour en{" "}
            {V3_AVA_OUVRIR.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> ouvrir une assurance-vie prend en pratique quelques
              minutes en ligne ou un rendez-vous en agence, mais les choix faits ce jour-là (type
              de contrat, frais, mode de gestion, clause bénéficiaire) engagent souvent pour des
              années. Le contrat s'ouvre à partir de la majorité avec un versement initial de
              l'ordre de {euros(minMin)} à {euros(minMax)} selon les contrats, quelques pièces
              justificatives et un questionnaire sur votre profil. Vous disposez ensuite de{" "}
              {renonciation} jours pour renoncer, et l'ancienneté fiscale ({duree} ans) court
              dès la souscription.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#conditions">Qui peut ouvrir une assurance-vie et à quelles conditions ?</a></li>
              <li><a href="#etapes">Quelles sont les étapes pour ouvrir une assurance-vie ?</a></li>
              <li><a href="#documents">Quels documents fournir ?</a></li>
              <li><a href="#minimum">Quel versement minimum pour ouvrir un contrat ?</a></li>
              <li><a href="#choix">Comment choisir son contrat et comparer les frais ?</a></li>
              <li><a href="#exemple">Que changent les frais sur {euros(versement)} versés ?</a></li>
              <li><a href="#gestion">Gestion libre ou gestion pilotée ?</a></li>
              <li><a href="#clause">Pourquoi soigner la clause bénéficiaire dès l'ouverture ?</a></li>
              <li><a href="#renonciation">Quel délai de renonciation de {renonciation} jours ?</a></li>
              <li><a href="#pieges">Quels pièges éviter ?</a></li>
              <li><a href="#tableau">Ouvrir maintenant ou attendre : quand ça vaut le coup</a></li>
              <li><a href="#checklist">Check-list avant de signer</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#lire-aussi">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Imaginons Claire, 52 ans, cadre salariée, qui garde 30 000 € sur des comptes
            rémunérés presque à zéro et entend parler d'assurance-vie par ses collègues. Elle ouvre
            un onglet, tombe sur une dizaine de contrats aux noms similaires, et se demande
            surtout par où commencer. Ce cas est un profil composite, sans lien avec une personne
            réelle ; il illustre la question que ce guide traite : quelle est la démarche
            concrète, dans quel ordre, et sur quoi faut-il être attentif avant de signer.
          </p>
          <p>
            Ce guide est une démarche d'action, pas un classement de contrats. Pour comparer le
            marché, voyez{" "}
            <a href="/guide/meilleure-assurance-vie-retraite">notre guide sur le choix d'un contrat</a>{" "}
            ; pour le détail des coûts,{" "}
            <a href="/guide/combien-coute-une-assurance-vie">celui sur le prix d'une assurance-vie</a>.
            Ici, nous déroulons les étapes d'une souscription, en gardant à l'esprit qu'il s'agit
            d'informations générales et non d'un conseil personnalisé.
          </p>

          <h2 id="conditions">Qui peut ouvrir une assurance-vie et à quelles conditions ?</h2>
          <p>
            Toute personne majeure et juridiquement capable peut ouvrir une assurance-vie, sans
            condition de revenu ni de plafond de versement. Il n'y a pas d'âge maximum légal
            pour souscrire, même si l'âge du souscripteur influence la fiscalité à la
            transmission (voir notre page sur{" "}
            <a href="/guide/assurance-vie-apres-70-ans-fiscalite-succession">l'assurance-vie après 70 ans</a>
            ). Un mineur peut être titulaire dans certaines conditions, avec l'accord de son
            représentant légal ; une personne sous tutelle ou curatelle suit des règles
            particulières, à voir avec l'assureur.
          </p>
          <p>
            La plupart des contrats grand public sont proposés aux résidents fiscaux français.
            Un résident hors de France, ou un contrat souscrit dans un autre pays de l'Union
            européenne, relève de conditions différentes. Pour un contrat de droit luxembourgeois,
            le cadre et la fiscalité sont distincts de ceux d'un contrat français : le site
            partenaire du réseau{" "}
            <a href="https://assurancevie.lu" target="_blank" rel="noopener noreferrer">assurancevie.lu</a>{" "}
            lui est consacré (lien vers un site partenaire du réseau), et nous le présentons de
            façon neutre dans{" "}
            <a href="/guide/assurance-vie-luxembourgeoise">notre guide sur l'assurance-vie luxembourgeoise</a>.
          </p>

          <h2 id="etapes">Quelles sont les étapes pour ouvrir une assurance-vie ?</h2>
          <p>
            Ouvrir une assurance-vie suit toujours le même enchaînement, que le contrat soit
            souscrit en agence, chez un courtier ou en ligne : définir son besoin, choisir le
            contrat, remplir le dossier, signer, verser, puis vérifier les documents reçus.
          </p>
          <ol>
            <li>
              <strong>Définir l'objectif et l'horizon.</strong> Compléter la retraite, préparer
              une transmission, garder une épargne disponible : l'objectif détermine la part de
              fonds en euros, la tolérance à la fluctuation et le niveau de frais acceptable.
              Comptez en années, pas en mois : l'ancienneté de {duree} ans est un repère fiscal.
            </li>
            <li>
              <strong>Choisir un distributeur et un contrat.</strong> Banque, assureur, courtier
              ou plateforme en ligne : le même assureur peut être derrière plusieurs contrats
              commercialisés à des conditions différentes. Lisez la notice et le document
              d'informations clés avant de vous engager.
            </li>
            <li>
              <strong>Répondre au questionnaire de profil.</strong> Connaissance des marchés,
              situation financière, objectifs, tolérance au risque : ces réponses servent à
              vérifier l'adéquation du contrat à votre situation. Répondez sincèrement ; il ne
              s'agit pas d'un examen.
            </li>
            <li>
              <strong>Fournir les pièces justificatives</strong> (voir plus bas) et déclarer votre
              résidence fiscale, obligation courante pour les établissements financiers.
            </li>
            <li>
              <strong>Choisir la répartition initiale et le mode de gestion :</strong> part de
              fonds en euros et d'unités de compte, gestion libre ou pilotée.
            </li>
            <li>
              <strong>Rédiger la clause bénéficiaire.</strong> Elle est modifiable, mais mieux vaut
              ne pas la laisser vide ni standard par défaut sans l'avoir lue.
            </li>
            <li>
              <strong>Signer et effectuer le premier versement.</strong> La signature est souvent
              électronique ; le versement se fait par virement ou prélèvement depuis un compte à
              votre nom.
            </li>
            <li>
              <strong>Conserver les documents et vérifier.</strong> Relisez les conditions
              générales, vérifiez la clause enregistrée et notez la date d'effet du contrat. Le
              délai de renonciation court à partir de la conclusion du contrat.
            </li>
          </ol>
          <p>
            Compter de quelques jours à quelques semaines entre la demande et la mise en place
            effective du contrat est courant, surtout si des pièces manquent ou si le premier
            versement est un chèque. Ces délais varient selon les établissements.
          </p>

          <h2 id="documents">Quels documents fournir pour ouvrir une assurance-vie ?</h2>
          <p>
            Les pièces demandées relèvent des obligations de connaissance du client : l'assureur
            doit vérifier votre identité, votre domicile et, au-delà de certains montants,
            l'origine des fonds.
          </p>
          <ul>
            <li>Une pièce d'identité en cours de validité (carte d'identité ou passeport).</li>
            <li>Un justificatif de domicile récent.</li>
            <li>Un relevé d'identité bancaire d'un compte à votre nom, d'où partira le versement.</li>
            <li>
              Pour un versement important : un justificatif de l'origine des fonds (relevé
              bancaire, acte de vente, attestation de donation ou d'héritage, par exemple).
            </li>
            <li>
              Parfois, votre dernier avis d'imposition ou une déclaration de résidence fiscale
              (formulaire d'auto-certification).
            </li>
            <li>Les coordonnées de la ou des personnes que vous désignez comme bénéficiaires.</li>
          </ul>
          <p>
            Ces exigences sont les mêmes pour un contrat de petit montant et pour un contrat
            plus important ; seul le niveau de justification de l'origine des fonds varie.
          </p>

          <h2 id="minimum">Quel versement minimum pour ouvrir un contrat d'assurance-vie ?</h2>
          <p>
            Le versement initial minimum se situe, selon les contrats, de l'ordre de{" "}
            {euros(minMin)} à {euros(minMax)} ; certains contrats en ligne l'abaissent, certains
            contrats de gestion plus sur-mesure le relèvent. Ce montant est fixé par chaque
            assureur dans ses conditions générales : vérifiez-le dans la notice, il peut
            évoluer.
          </p>
          <p>
            Deux nuances utiles. D'abord, un faible minimum à l'ouverture ne dit rien du coût du
            contrat : regardez les frais. Ensuite, ouvrir tôt avec un petit versement permet de
            faire courir l'ancienneté fiscale ({duree} ans), sans engager une grosse somme dans un
            contrat que l'on n'a pas encore comparé aux autres. Ce raisonnement ne vaut que si le
            contrat choisi reste adapté à long terme : on ne change pas d'assureur facilement
            sans perdre cette ancienneté (voir{" "}
            <a href="/guide/transferer-assurance-vie-sans-perdre-anteriorite">notre guide sur le transfert</a>
            ).
          </p>

          <h2 id="choix">Comment choisir son contrat et comparer les frais ?</h2>
          <p>
            Quatre familles de frais composent le coût d'une assurance-vie, et le tableau des
            frais d'entrée ne suffit pas à comparer : il faut les additionner.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Type de frais</th>
                  <th>Ce que c'est</th>
                  <th>Ordre de grandeur constaté</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frais sur versement</td>
                  <td>Prélevés à chaque versement</td>
                  <td>
                    {pct(net.entree.min)} sur contrats en ligne de référence ; {pct(bq.entree.min)} à{" "}
                    {pct(bq.entree.max)} sur contrats bancaires traditionnels
                  </td>
                </tr>
                <tr>
                  <td>Frais de gestion du contrat</td>
                  <td>Annuels, en % de l'encours</td>
                  <td>
                    {pct(net.gestionAnnuelle.min)} à {pct(net.gestionAnnuelle.max)} (en ligne) ;{" "}
                    {pct(bq.gestionAnnuelle.min)} à {pct(bq.gestionAnnuelle.max)} (bancaire)
                  </td>
                </tr>
                <tr>
                  <td>Frais des supports (unités de compte)</td>
                  <td>Frais courants des fonds ou ETF choisis</td>
                  <td>
                    {pct(net.fraisSupports.min)} à {pct(net.fraisSupports.max)} (supports peu
                    chargés) ; {pct(bq.fraisSupports.min)} à {pct(bq.fraisSupports.max)} (fonds
                    classiques)
                  </td>
                </tr>
                <tr>
                  <td>Frais d'arbitrage</td>
                  <td>Changement de supports</td>
                  <td>
                    {pct(net.arbitrage.min)} sur contrats en ligne ; {pct(bq.arbitrage.min)} à{" "}
                    {pct(bq.arbitrage.max)} sur contrats bancaires
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Ces fourchettes sont des ordres de grandeur issus de grilles tarifaires publiques,
            à vérifier contrat par contrat : seule la notice du contrat fait foi. Au-delà des
            frais, comparez la solidité de l'assureur, la gamme de supports, la qualité du fonds
            en euros (rendement net de frais, ne le comparez que sur plusieurs années) et la
            possibilité de racheter à tout moment, sans pénalité de sortie.
          </p>

          <h2 id="exemple">Que changent les frais sur {euros(versement)} versés ?</h2>
          <p>
            Les frais ne se voient pas, mais ils se cumulent d'année en année. Sur{" "}
            {euros(versement)} versés une seule fois, avec un encours supposé constant pour
            simplifier (sans gain ni perte), les ordres de grandeur ci-dessus donnent, pour un
            exemple illustratif sur {annees} ans :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Hypothèse de frais</th>
                  <th>Frais d'entrée</th>
                  <th>Frais annuels cumulés (gestion + supports)</th>
                  <th>Total sur {annees} ans</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Contrat bancaire traditionnel ({pct(annuelBqMin)} à {pct(annuelBqMax)} par an)</td>
                  <td>{euros(entreeBqMin)} à {euros(entreeBqMax)}</td>
                  <td>
                    {euros(anBqMin)} à {euros(anBqMax)} par an
                  </td>
                  <td>{euros(totBqMin)} à {euros(totBqMax)}</td>
                </tr>
                <tr>
                  <td>Contrat en ligne, supports peu chargés ({pct(annuelNetMin)} à {pct(annuelNetMax)} par an)</td>
                  <td>{euros(0)}</td>
                  <td>
                    {euros(anNetMin)} à {euros(anNetMax)} par an
                  </td>
                  <td>{euros(totNetMin)} à {euros(totNetMax)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            L'écart se compte en milliers d'euros sur la durée, sans qu'aucun des deux ne soit
            « bon » ou « mauvais » en soi : un contrat plus cher peut offrir un conseil ou un
            service que l'on valorise. Mais ce coût mérite d'être décidé en connaissance de
            cause. Cet exemple est une illustration pédagogique, pas une prévision de
            rendement : les unités de compte peuvent perdre de la valeur et les performances
            passées ne préjugent pas des performances futures.
          </p>

          <h2 id="gestion">Gestion libre ou gestion pilotée ?</h2>
          <p>
            En gestion libre, vous choisissez vous-même la répartition entre fonds en euros et
            unités de compte et vous l'ajustez ; en gestion pilotée, vous confiez cette
            répartition à un gérant selon un profil de risque (prudent, équilibré, dynamique),
            moyennant des frais de mandat supplémentaires, de l'ordre de{" "}
            {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à{" "}
            {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)} par an en plus des frais des fonds. Aucun des
            deux modes ne supprime le risque de perte en capital sur les unités de compte.
          </p>
          <p>
            La gestion pilotée peut convenir à qui veut déléguer, la gestion libre à qui accepte
            d'y consacrer du temps. Notre comparatif{" "}
            <a href="/guide/gestion-pilotee-ou-gestion-libre">gestion pilotée ou gestion libre</a>{" "}
            détaille cette décision, et{" "}
            <a href="/guide/risques-assurance-vie">le guide sur les risques de l'assurance-vie</a>{" "}
            rappelle ce que l'on peut perdre.
          </p>

          <h2 id="clause">Pourquoi soigner la clause bénéficiaire dès l'ouverture ?</h2>
          <p>
            La clause bénéficiaire désigne qui recevra le capital en cas de décès. C'est
            l'élément du contrat dont les conséquences sont les plus lourdes en cas d'oubli : une
            clause absente, obsolète ou ambiguë peut conduire à un résultat contraire à vos
            souhaits. Vous pouvez la modifier librement tant que le bénéficiaire n'a pas
            accepté, mais vérifiez-la dès l'ouverture, puis à chaque événement de vie. Le guide{" "}
            <a href="/guide/clause-beneficiaire-assurance-vie-comment-la-rediger">
              comment rédiger la clause bénéficiaire
            </a>{" "}
            en détaille les formulations et les pièges.
          </p>

          <h2 id="renonciation">Quel délai de renonciation de {renonciation} jours ?</h2>
          <p>
            Après la souscription, vous disposez en principe de {renonciation} jours calendaires
            pour renoncer au contrat, sans motif ni pénalité, par lettre recommandée adressée à
            l'assureur ou au courtier selon les modalités prévues dans la notice (Code des
            assurances, art. L132-5-1). L'assureur doit alors vous rembourser les sommes
            versées. Le délai court à compter de la date à laquelle vous êtes informé de la
            conclusion du contrat ; les conditions précises figurent dans votre notice. Si vous
            doutez après avoir signé, ne laissez pas passer ce délai, et relisez la notice
            avant de décider.
          </p>

          <h2 id="pieges">Quels pièges éviter à l'ouverture ?</h2>
          <ul>
            <li>
              <strong>Choisir sur la seule promesse de rendement.</strong> Le rendement passé d'un
              fonds en euros ne garantit rien pour l'avenir, et il se lit net de frais.
            </li>
            <li>
              <strong>Ignorer les frais d'entrée et de gestion.</strong> Ils pèsent plus que la
              plupart des écarts de performance sur longue durée.
            </li>
            <li>
              <strong>Laisser la clause standard sans la lire</strong>, ou omettre de la mettre à
              jour après un divorce, une naissance ou un décès.
            </li>
            <li>
              <strong>Confondre disponibilité et absence de risque.</strong> Le capital est
              rachetable à tout moment, mais une unité de compte peut valoir moins que votre
              versement le jour du rachat.
            </li>
            <li>
              <strong>Choisir un contrat uniquement parce qu'un conseiller le propose</strong>{" "}
              sans demander ses frais totaux par écrit.
            </li>
            <li>
              <strong>Verser toute la somme d'un coup dans un seul contrat</strong> sans réfléchir
              à la garantie en cas de défaillance de l'assureur (voir notre guide sur{" "}
              <a href="/guide/assurance-vie-garantie-repartir-plusieurs-contrats">la garantie et la répartition entre contrats</a>
              ).
            </li>
            <li>
              <strong>Oublier que changer d'assureur fait perdre l'ancienneté.</strong> Le point
              de départ des {duree} ans est la date de souscription du contrat, pas la vôtre.
            </li>
          </ul>

          <h2 id="tableau">Ouvrir maintenant ou attendre : quand ça vaut le coup</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Quand ouvrir a du sens</th>
                  <th>Quand mieux vaut attendre ou comparer davantage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Votre horizon dépasse plusieurs années et vous voulez faire courir l'ancienneté fiscale de {duree} ans</td>
                  <td>Vous aurez besoin de la somme à court terme</td>
                </tr>
                <tr>
                  <td>Vous avez comparé frais totaux, assureur et supports sur plusieurs contrats</td>
                  <td>Vous n'avez pas lu la notice ni demandé la grille complète des frais</td>
                </tr>
                <tr>
                  <td>Vous voulez organiser la transmission hors succession avec une clause rédigée</td>
                  <td>Votre situation familiale est complexe : mieux vaut un avis notarial avant de rédiger</td>
                </tr>
                <tr>
                  <td>Vous complétez un PER ou un PEA pour diversifier vos enveloppes</td>
                  <td>Vous n'avez pas encore d'épargne de précaution disponible</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="checklist">Check-list avant de signer</h2>
          <ol>
            <li>J'ai identifié mon objectif et mon horizon.</li>
            <li>J'ai comparé au moins deux ou trois contrats, frais totaux compris.</li>
            <li>J'ai lu la notice et le document d'informations clés.</li>
            <li>Je connais le versement minimum initial et les versements ultérieurs.</li>
            <li>J'ai choisi la gestion (libre ou pilotée) en connaissance de ses coûts.</li>
            <li>J'ai rédigé la clause bénéficiaire et gardé une copie.</li>
            <li>J'ai noté la date d'effet et les {renonciation} jours de renonciation.</li>
            <li>J'ai conservé mes documents et mes identifiants d'accès.</li>
          </ol>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Comment ouvrir une assurance-vie en ligne ?</h3>
          <p>
            En ligne, la démarche suit les mêmes étapes qu'en agence : création d'un espace
            client, questionnaire de profil, envoi des pièces justificatives, signature
            électronique, puis premier versement par virement. Elle prend en général peu de
            temps, mais le contrat n'est actif qu'une fois le dossier validé et les fonds reçus.
          </p>

          <h3>Quel est le montant minimum pour ouvrir une assurance-vie ?</h3>
          <p>
            Il se situe, selon les contrats, de l'ordre de {euros(minMin)} à {euros(minMax)} ;
            il est précisé dans la notice du contrat et peut évoluer. Un faible minimum ne
            signifie pas de faibles frais : comparez-les séparément.
          </p>

          <h3>Faut-il aller en agence ou passer par un courtier ?</h3>
          <p>
            Cela dépend du besoin de conseil. L'agence ou le conseiller peut accompagner mais
            les frais sont souvent plus élevés ; un courtier ou un contrat en ligne propose
            parfois des frais plus bas avec moins d'accompagnement. Dans tous les cas, c'est
            vous qui signez et le contrat engage vos choix.
          </p>

          <h3>Peut-on ouvrir une assurance-vie à plusieurs ?</h3>
          <p>
            Un contrat individuel est ouvert au nom d'une seule personne. Un contrat peut être
            souscrit conjointement par deux personnes, notamment des conjoints, avec un
            dénouement qui obéit à des règles particulières ; les modalités dépendent du contrat
            et de la situation de chacun, et il peut être utile de prendre l'avis d'un notaire.
          </p>

          <h3>Peut-on ouvrir plusieurs assurances-vie ?</h3>
          <p>
            Oui, rien ne l'interdit, et c'est parfois utile pour répartir les risques entre
            assureurs. Chaque contrat a toutefois ses propres frais et sa propre comptabilité.
            L'abattement annuel de {euros(abattementSeul)} ou {euros(abattementCouple)} après{" "}
            {duree} ans s'apprécie, lui, tous contrats confondus.
          </p>

          <h3>Que se passe-t-il si je change d'avis après avoir signé ?</h3>
          <p>
            Vous pouvez renoncer dans un délai de {renonciation} jours, par lettre recommandée,
            et obtenir le remboursement des sommes versées. Au-delà, vous pouvez toujours
            racheter votre contrat, avec la fiscalité qui s'applique à ce moment-là.
          </p>

          <h3>L'assurance-vie convient-elle à la retraite ?</h3>
          <p>
            Elle fait partie des enveloppes couramment utilisées pour compléter ses revenus ou
            préparer sa transmission, mais elle n'est ni la seule ni toujours la mieux adaptée.
            Selon votre âge et votre situation fiscale, un PER ou un PEA peut mieux répondre à
            certains besoins ; voyez notre comparatif{" "}
            <a href="/guide/per-ou-assurance-vie-selon-age-et-tmi">PER ou assurance-vie selon l'âge et la tranche</a>{" "}
            et notre guide sur{" "}
            <a href="/guide/assurance-vie-a-60-ans-ou-a-la-retraite">l'assurance-vie à 60 ans ou à la retraite</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Ouvrir une assurance-vie est simple ; bien l'ouvrir demande de poser trois décisions
            avant de signer : un contrat dont on connaît les frais totaux, un mode de gestion
            qu'on peut tenir, et une clause bénéficiaire lue et à jour. Les frais et le choix de
            l'assureur sont ceux qui coûtent le plus cher à corriger, car changer de contrat
            fait en principe repartir l'ancienneté fiscale de zéro.
          </p>
          <p>
            Une assurance-vie peut compléter vos autres enveloppes sans les remplacer : la
            comparaison avec un PER (voir{" "}
            <a href="/guide/ouvrir-un-per-etapes-documents-delais">notre guide sur l'ouverture d'un PER</a>
            ) ou un PEA se fait selon votre horizon, votre fiscalité et votre besoin de
            disponibilité. Pour situer l'assurance-vie dans une stratégie d'ensemble, voyez{" "}
            <a href="/strategies/assurance-vie-retraite">notre page sur l'assurance-vie pour la retraite</a>{" "}
            et <a href="/guide/preparer-sa-retraite-guide-complet">le guide complet pour préparer sa retraite</a>.
            Vous pouvez aussi tester vos hypothèses avec notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a>.
          </p>

          <h2 id="lire-aussi">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/meilleure-assurance-vie-retraite">Choisir son assurance-vie pour la retraite</a></li>
            <li><a href="/guide/combien-coute-une-assurance-vie">Combien coûte une assurance-vie ?</a></li>
            <li><a href="/guide/transferer-assurance-vie-sans-perdre-anteriorite">Transférer son assurance-vie sans perdre l'antériorité</a></li>
            <li><a href="/guide/clause-beneficiaire-assurance-vie-comment-la-rediger">Clause bénéficiaire : comment la rédiger</a></li>
            <li><a href="/guide/assurance-vie-garantie-repartir-plusieurs-contrats">Garantie et répartition entre contrats</a></li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en novembre 2026 :</p>
          <ul>
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seuls les
              documents contractuels de l'assureur font foi. Les règles et ordres de grandeur
              cités sont ceux en vigueur en {V3_AVA_OUVRIR.maj} et peuvent évoluer. Le profil
              de Claire et les chiffres de l'exemple sont des illustrations pédagogiques. Les
              supports en unités de compte présentent un risque de perte en capital ; les
              performances passées ne préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Ouvrir un contrat se fait en une heure. Le choisir mérite un cadre." />
    </>
  );
}
