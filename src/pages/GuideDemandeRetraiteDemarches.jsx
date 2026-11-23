import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { V3_REG_DEMANDE, euros } from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const D = V3_REG_DEMANDE;
const delaiMin = D.delaiDemandeMinMois; // 4
const delaiMax = D.delaiDemandeMaxMois; // 6
const moisReleve = D.moisReleveEtSimulation; // 24

// ---- Calendrier de l'exemple : tout est calculé depuis la date de départ ----
const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];
const dateDepart = new Date(D.dateDepartExemple.annee, D.dateDepartExemple.mois - 1, 1);
const moisAvant = (n) => {
  const d = new Date(dateDepart.getFullYear(), dateDepart.getMonth() - n, 1);
  return `${MOIS[d.getMonth()]} ${d.getFullYear()}`;
};
const moisApres = (n) => moisAvant(-n);
const departTexte = `1er ${MOIS[dateDepart.getMonth()]} ${dateDepart.getFullYear()}`;

// ---- Trésorerie de transition : pensions payées à terme échu ----
const matelas = D.depensesMensuellesExemple * D.moisSansRevenuExemple;

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Comment faire sa demande de retraite lorsqu'on est salarié ? Fiche F13941, vérifiée le 1er septembre 2025 : date de départ, demande en ligne unique, information de l'employeur, paiement à terme échu",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F13941",
  },
  {
    label:
      "Service-Public.gouv.fr — À partir de quel âge un salarié peut-il partir en retraite ? Fiche F14043, vérifiée le 14 août 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14043",
  },
  {
    label:
      "Service-Public.gouv.fr — Comment est calculée la retraite quand on a cotisé à plusieurs régimes de retraite ? Fiche F31666",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31666",
  },
  {
    label:
      "Service-Public.gouv.fr — Comment connaître ses caisses de retraite ? Fiche F2504",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2504",
  },
  {
    label:
      "Info Retraite — portail officiel inter-régimes : compte retraite, relevé de carrière, service « Demander ma retraite »",
    url: "https://www.info-retraite.fr",
  },
  {
    label:
      "L'Assurance retraite — retraite de base du régime général : démarches et justificatifs",
    url: "https://www.lassuranceretraite.fr",
  },
  {
    label:
      "Agirc-Arrco — Demander sa retraite complémentaire",
    url: "https://www.agirc-arrco.fr/particuliers/demander-sa-retraite/",
  },
];

export default function GuideDemandeRetraiteDemarches() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · Démarches de départ</span>
          <h1>Demande de retraite : démarches et calendrier, mois par mois</h1>
          <p className="sub">
            Quand déposer sa demande, quels documents réunir, à partir de quand la pension est
            versée, et comment organiser l'épargne privée en parallèle. Mis à jour le{" "}
            {D.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> la demande de retraite se fait en ligne, en une seule
              fois, depuis votre compte sur info-retraite.fr : elle est transmise à vos régimes
              de base et complémentaires. Les sources officielles conseillent de la déposer en
              général entre {delaiMin} et {delaiMax} mois avant la date de départ souhaitée.
              Le point de départ de la pension est le premier jour d'un mois, et les pensions sont
              le plus souvent versées à terme échu : il faut donc prévoir un mois ou deux de
              trésorerie entre le dernier salaire et le premier versement. Le travail commence
              bien plus tôt, avec la vérification du relevé de carrière.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#calendrier">Quel calendrier suivre avant le départ ?</a></li>
              <li><a href="#etapes">Comment faire sa demande de retraite, étape par étape ?</a></li>
              <li><a href="#regimes">Faut-il une demande par régime ?</a></li>
              <li><a href="#documents">Quels documents préparer ?</a></li>
              <li><a href="#date-effet">Quelle date d'effet et quand tombe le premier versement ?</a></li>
              <li><a href="#epargne">Que faire de son épargne privée au moment du départ ?</a></li>
              <li><a href="#exemple">Exemple chiffré : un départ au {departTexte}</a></li>
              <li><a href="#pieges">Quels pièges éviter ?</a></li>
              <li><a href="#quand">Départ immédiat ou différé : comment choisir ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Imaginons une salariée de 62 ans, que nous appellerons Hélène (cas composite, sans lien
            avec une situation réelle). Elle sait qu'elle veut partir à l'automne, mais elle ne sait
            ni quand faire sa demande, ni auprès de qui, ni ce qui se passera entre son dernier
            bulletin de paie et la première pension. Elle craint surtout d'oublier une étape qui
            retarderait le versement.
          </p>
          <p>
            Ce guide décrit les démarches dans l'ordre où on les rencontre, pour un salarié du
            secteur privé affilié au régime général et à l'Agirc-Arrco. Les autres statuts
            (fonctionnaires, indépendants, professions libérales, agriculteurs) ont des caisses
            différentes, mais le principe de la demande unique en ligne s'applique à la plupart
            des régimes. Il ne traite ni du montant de la pension, vu dans nos guides sur{" "}
            <a href="/guide/estimer-sa-pension-retraite-taux-de-remplacement">l'estimation de la pension</a>{" "}
            et sur <a href="/guide/age-de-depart-retraite-trimestres-duree-assurance">l'âge de départ et les trimestres</a>,
            ni de la décision de partir ou non.
          </p>

          <h2 id="calendrier">Quel calendrier suivre avant le départ ?</h2>
          <p>
            Le calendrier le plus sûr s'étale sur environ deux ans : la vérification du relevé de
            carrière demande du temps, alors que la demande elle-même se dépose quelques mois avant
            le départ. Les échéances ci-dessous s'appuient sur un départ au {departTexte}, à titre
            d'illustration ; seul le délai de dépôt vient d'une source officielle, les autres étapes
            sont des repères pratiques.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Échéance</th>
                  <th>Exemple (départ au {departTexte})</th>
                  <th>Ce qu'il y a à faire</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Environ {moisReleve} mois avant</td>
                  <td>{moisAvant(moisReleve)}</td>
                  <td>
                    Consulter et corriger le relevé de carrière, simuler le montant de la pension,
                    commencer à retrouver les justificatifs manquants
                  </td>
                </tr>
                <tr>
                  <td>Environ 12 mois avant</td>
                  <td>{moisAvant(12)}</td>
                  <td>
                    Arrêter la date de départ envisagée, recenser l'épargne privée à mobiliser
                    (PER, assurance-vie, PEA), préparer le calendrier des sorties
                  </td>
                </tr>
                <tr>
                  <td>Selon le préavis (contrat, convention collective)</td>
                  <td>{moisAvant(delaiMax)} ou avant</td>
                  <td>
                    Informer l'employeur de la volonté de partir, en respectant le préavis prévu
                  </td>
                </tr>
                <tr>
                  <td>Entre {delaiMax} et {delaiMin} mois avant</td>
                  <td>Entre {moisAvant(delaiMax)} et {moisAvant(delaiMin)}</td>
                  <td>Déposer la demande de retraite en ligne, avec les justificatifs</td>
                </tr>
                <tr>
                  <td>Quelques semaines après</td>
                  <td>Suivant le dépôt</td>
                  <td>
                    Répondre aux demandes de pièces complémentaires, vérifier les accusés de
                    réception et, ensuite, la notification de pension
                  </td>
                </tr>
                <tr>
                  <td>Jour du départ</td>
                  <td>{departTexte}</td>
                  <td>Date d'effet de la pension (premier jour du mois)</td>
                </tr>
                <tr>
                  <td>Fin du premier mois, ou début du suivant</td>
                  <td>{moisApres(1)}</td>
                  <td>Premier versement attendu, en principe à terme échu</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Le délai de dépôt est une recommandation, pas un couperet : les caisses indiquent en
            général entre {delaiMin} et {delaiMax} mois, et certaines mentionnent un minimum de
            cinq mois. Vérifiez la consigne exacte dans votre espace personnel avant de fixer votre
            propre échéance.
          </p>

          <h2 id="etapes">Comment faire sa demande de retraite, étape par étape ?</h2>
          <p>
            La demande se dépose en ligne sur le portail officiel Info Retraite, depuis le compte
            retraite, dans « Mes démarches », service « Demander ma retraite ». Elle est transmise
            automatiquement à l'ensemble de vos caisses de base et complémentaires (service-public.gouv.fr,
            fiche F13941).
          </p>
          <ol>
            <li>
              <strong>Créer ou ouvrir son compte retraite.</strong> L'identification passe en
              général par FranceConnect ou par un identifiant de l'espace personnel d'un régime.
            </li>
            <li>
              <strong>Vérifier le relevé de carrière.</strong> Une période oubliée à ce stade
              coûte du temps plus tard : notre guide sur{" "}
              <a href="/guide/verifier-releve-de-carriere-retraite">la vérification du relevé de carrière</a>{" "}
              détaille la procédure de correction.
            </li>
            <li>
              <strong>Utiliser l'outil « Mes justificatifs ».</strong> Il dresse la liste des
              pièces à joindre selon votre situation, avant d'entamer la demande.
            </li>
            <li>
              <strong>Choisir la date de départ.</strong> Le point de départ est le premier jour
              d'un mois ; la date la plus précoce dépend de l'âge légal de votre génération
              (<a href="/guide/age-de-depart-retraite-trimestres-duree-assurance">voir nos repères sur l'âge de départ</a>).
            </li>
            <li>
              <strong>Compléter le formulaire.</strong> Situation familiale, enfants, périodes
              particulières (chômage, maladie, service national), coordonnées bancaires.
            </li>
            <li>
              <strong>Joindre les justificatifs et valider.</strong> Conservez l'accusé de
              réception et les identifiants de suivi.
            </li>
            <li>
              <strong>Suivre le dossier.</strong> Les caisses peuvent demander des pièces
              supplémentaires ; une réponse rapide évite un décalage du premier paiement.
            </li>
            <li>
              <strong>Contrôler les notifications.</strong> Chaque régime envoie la sienne :
              comparez le montant à votre simulation et contestez-le sans attendre en cas d'écart.
            </li>
          </ol>

          <h2 id="regimes">Faut-il une demande par régime ?</h2>
          <p>
            Non, dans la plupart des cas : le service en ligne permet de faire une seule demande
            auprès de tous vos régimes de base et complémentaire (service-public.gouv.fr, F13941).
            Les cas particuliers existent : certains régimes demandent des pièces spécifiques, et
            les personnes dont la carrière relève de régimes à l'étranger doivent souvent contacter
            les organismes concernés. Pour savoir qui vous paiera, la fiche F2504 de
            service-public.gouv.fr explique comment identifier ses caisses.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Régime</th>
                  <th>Ce qu'il verse</th>
                  <th>Où se fait la démarche</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Régime général (Assurance retraite)</td>
                  <td>Retraite de base des salariés du privé</td>
                  <td>Demande unique sur info-retraite.fr, suivi sur lassuranceretraite.fr</td>
                </tr>
                <tr>
                  <td>Agirc-Arrco</td>
                  <td>Retraite complémentaire des salariés du privé</td>
                  <td>Demande unique sur info-retraite.fr, suivi sur agirc-arrco.fr</td>
                </tr>
                <tr>
                  <td>Autres régimes (fonction publique, indépendants, professions libérales, agricole)</td>
                  <td>Retraites de base ou complémentaires selon les périodes d'affiliation</td>
                  <td>
                    Demande unique sur info-retraite.fr dans la plupart des cas ; pièces propres à
                    chaque régime, à vérifier
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Si vous avez cotisé à plusieurs régimes, la retraite est calculée régime par régime
            (fiche F31666). Chaque caisse a ses propres règles ; la demande unique évite surtout
            d'avoir à répéter les informations, pas de vérifier chaque notification.
          </p>

          <h2 id="documents">Quels documents préparer ?</h2>
          <p>
            La liste exacte dépend de votre situation : l'outil « Mes justificatifs » du portail la
            génère. Voici les pièces qui reviennent le plus souvent, à rassembler avant de déposer
            la demande.
          </p>
          <ul>
            <li>Pièce d'identité en cours de validité, et livret de famille si nécessaire.</li>
            <li>Relevé d'identité bancaire (RIB) au nom du bénéficiaire.</li>
            <li>
              Dernier avis d'imposition ou justificatifs de ressources, si votre situation les
              demande.
            </li>
            <li>
              Pièces concernant les périodes particulières : attestations de service national,
              de chômage, de maladie ou d'invalidité, de congé parental, selon votre carrière.
            </li>
            <li>
              Justificatifs de la situation familiale pour les majorations liées aux enfants.
            </li>
            <li>
              Pour un départ anticipé : l'attestation correspondante (par exemple carrière longue,
              voir <a href="/guide/retraite-anticipee-carriere-longue-conditions">notre guide dédié</a>).
            </li>
          </ul>
          <p>
            Beaucoup de documents sont déjà connus des caisses ; ne joignez que ce que la
            plateforme réclame, mais gardez les autres sous la main au cas où.
          </p>

          <h2 id="date-effet">Quelle date d'effet et quand tombe le premier versement ?</h2>
          <p>
            La pension prend effet le premier jour du mois choisi, et les pensions de la plupart des
            régimes sont payées à terme échu, c'est-à-dire à la fin de la période pour laquelle elles
            sont dues (service-public.gouv.fr, F13941). Concrètement, la pension du premier mois
            arrive à la fin de ce mois ou au début du suivant, selon le calendrier du régime.
          </p>
          <p>
            Deux conséquences pratiques. D'abord, votre dernier salaire et la première pension ne se
            suivent pas immédiatement : le délai varie selon les caisses, et le versement initial
            peut être décalé si le dossier est incomplet. Ensuite, un régime peut payer en retard
            par rapport à l'autre : la retraite de base et la complémentaire ont chacune leur
            propre calendrier de paiement.
          </p>

          <h2 id="epargne">Que faire de son épargne privée au moment du départ ?</h2>
          <p>
            La demande de retraite ouvre aussi le moment de décider quelle épargne privée mobiliser,
            dans quel ordre et à quel rythme. Ces démarches se mènent en parallèle, auprès des
            établissements gestionnaires, et suivent leurs propres délais.
          </p>
          <ul>
            <li>
              <strong>PER :</strong> la liquidation (capital, rente ou mixte) se demande à
              l'assureur ou au gestionnaire, avec justificatif de départ à la retraite. La fiscalité
              dépend des versements déduits ou non :{" "}
              <a href="/guide/liquider-son-per-a-la-retraite-demarche">notre guide sur la liquidation du PER</a>{" "}
              et celui sur <a href="/guide/fiscalite-sortie-per">la fiscalité de sortie</a>.
            </li>
            <li>
              <strong>Assurance-vie :</strong> les rachats se programment sans lien avec la
              demande de retraite ; voir{" "}
              <a href="/guide/assurance-vie-a-60-ans-ou-a-la-retraite">assurance-vie à 60 ans ou à la retraite</a>.
            </li>
            <li>
              <strong>Ordre des retraits :</strong> notre guide sur{" "}
              <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a> donne les
              critères pour choisir l'enveloppe à entamer en premier.
            </li>
          </ul>

          <h2 id="exemple">Exemple chiffré : un départ au {departTexte}</h2>
          <div className="note">
            <p>
              Les montants ci-dessous sont des hypothèses d'illustration, sans lien avec un cas
              réel. Ils ne constituent ni une prévision ni un conseil personnalisé.
            </p>
          </div>
          <p>
            Hélène prévoit un départ au {departTexte}. Elle dépose sa demande entre{" "}
            {moisAvant(delaiMax)} et {moisAvant(delaiMin)}, soit entre {delaiMax} et {delaiMin} mois
            avant. Ses dépenses courantes s'élèvent à {euros(D.depensesMensuellesExemple)} par
            mois. Par prudence, elle prévoit de couvrir {D.moisSansRevenuExemple} mois sans revenu,
            le temps que le premier versement arrive après son dernier salaire.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Poste</th>
                  <th>Calcul</th>
                  <th>Résultat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Trésorerie de transition à prévoir</td>
                  <td>
                    {euros(D.depensesMensuellesExemple)} × {D.moisSansRevenuExemple} mois
                  </td>
                  <td>{euros(matelas)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Cette réserve est un repère de prudence, pas une règle : le délai réel dépend des
            caisses, de la complétude du dossier et de l'éventuel solde de congés ou indemnité de
            départ (à vérifier auprès de l'employeur). L'intérêt de la calculer est de ne pas
            avoir à racheter en urgence un contrat d'assurance-vie ou à débloquer un PER dans de
            mauvaises conditions.
          </p>

          <h2 id="pieges">Quels pièges éviter ?</h2>
          <ul>
            <li>
              <strong>Attendre le dernier moment.</strong> Une demande déposée trop près de la date
              souhaitée peut décaler le premier versement ; respectez le délai conseillé.
            </li>
            <li>
              <strong>Négliger le préavis.</strong> L'employeur doit être informé avec un préavis
              qui suit les règles applicables au licenciement ; un oubli peut compliquer la date de
              départ.
            </li>
            <li>
              <strong>Croire que tout est automatique.</strong> Les caisses ne déclenchent pas la
              retraite à votre place : sans demande, aucune pension n'est versée.
            </li>
            <li>
              <strong>Oublier une période de carrière.</strong> Un trimestre manquant peut changer
              la décote ; voir <a href="/guide/surcote-decote-retraite">surcote et décote</a> et{" "}
              <a href="/guide/combien-coute-rachat-trimestres-retraite">le rachat de trimestres</a>.
            </li>
            <li>
              <strong>Ne pas anticiper la trésorerie.</strong> Le décalage entre dernier salaire et
              première pension se prépare en amont.
            </li>
            <li>
              <strong>Lancer la liquidation de l'épargne privée sans plan.</strong> Une sortie en
              capital mal calibrée peut relever votre tranche d'imposition l'année du départ.
            </li>
          </ul>

          <h2 id="quand">Départ immédiat ou différé : comment choisir ?</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Ça vaut le coup quand…</th>
                  <th>À éviter quand…</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Votre relevé est vérifié, la durée d'assurance est atteinte et la trésorerie de
                    transition est prévue
                  </td>
                  <td>
                    Des trimestres manquent encore, et un rachat ou quelques mois de plus
                    changeraient nettement la pension
                  </td>
                </tr>
                <tr>
                  <td>
                    L'épargne privée est organisée (ordre des retraits, fiscalité estimée)
                  </td>
                  <td>
                    Vous comptez vous reposer sur un capital qui n'est pas encore disponible ou dont
                    la sortie n'est pas planifiée
                  </td>
                </tr>
                <tr>
                  <td>
                    Vous préférez une transition progressive :{" "}
                    <a href="/guide/retraite-progressive-ou-cumul-emploi-retraite">retraite progressive ou cumul</a>
                  </td>
                  <td>Vous n'avez pas comparé les options de transition avec votre employeur</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Quand faire sa demande de retraite ?</h3>
          <p>
            Les sources officielles la conseillent en général entre {delaiMin} et {delaiMax} mois
            avant la date de départ souhaitée. Ce délai est indicatif : le dépôt trop tardif retarde
            surtout le premier versement. Vérifiez la consigne dans votre espace personnel.
          </p>

          <h3>Comment faire sa demande de retraite en ligne ?</h3>
          <p>
            Depuis le compte sur info-retraite.fr, rubrique « Mes démarches », service « Demander ma
            retraite ». La demande est unique et transmise à tous vos régimes de base et
            complémentaires.
          </p>

          <h3>Faut-il faire une demande pour l'Agirc-Arrco séparément ?</h3>
          <p>
            Dans la plupart des cas, non : la demande en ligne couvre l'ensemble des régimes. Si
            votre dossier présente une particularité, l'Agirc-Arrco précise sur son site comment
            demander sa retraite complémentaire.
          </p>

          <h3>Quand est versée la première pension de retraite ?</h3>
          <p>
            Les pensions sont en général payées à terme échu, donc à la fin du mois de la date
            d'effet ou au début du suivant, selon le régime. Prévoyez une trésorerie de transition
            pour couvrir ce décalage.
          </p>

          <h3>Peut-on demander sa retraite si l'on travaille encore ?</h3>
          <p>
            Oui, à condition de cesser l'activité concernée, sauf cas de cumul emploi-retraite ou
            de retraite progressive. Nos guides sur{" "}
            <a href="/guide/cumul-emploi-retraite-comment-ca-marche">le cumul emploi-retraite</a>{" "}
            et la <a href="/guide/retraite-progressive-ou-cumul-emploi-retraite">retraite progressive</a>{" "}
            détaillent ces cas.
          </p>

          <h3>Quelles démarches faire auprès de son employeur ?</h3>
          <p>
            L'employeur doit être informé du souhait de partir à la retraite, avec un préavis dont la
            durée est celle prévue en cas de licenciement (service-public.gouv.fr, F13941). Les
            droits à indemnité de départ dépendent du contrat et de la convention collective.
          </p>

          <h3>Que faire si l'on a travaillé dans plusieurs régimes ?</h3>
          <p>
            La demande unique en ligne est transmise à chacun d'eux. Contrôlez ensuite chaque
            notification : les pensions sont calculées régime par régime.
          </p>

          <h3>Peut-on changer la date de départ après le dépôt ?</h3>
          <p>
            Les règles de modification ou d'annulation varient selon les régimes et l'avancement
            du dossier : renseignez-vous auprès de votre caisse avant de déposer si vous hésitez
            entre deux dates.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La demande de retraite est une formalité simple, mais elle s'inscrit dans un calendrier
            qui, lui, ne l'est pas : un relevé de carrière à vérifier longtemps avant, un préavis à
            respecter, un dépôt quelques mois avant le départ, et un décalage de trésorerie au
            moment du premier versement. L'essentiel du travail se joue donc en amont du dépôt.
          </p>
          <p>
            En parallèle, la retraite d'un épargnant se décide aussi côté privé : quelle enveloppe
            entamer, à quel rythme, avec quelle fiscalité. Le{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> aide à situer l'écart entre la
            pension attendue et le niveau de vie souhaité, et{" "}
            <a href="/guide/preparer-sa-retraite-guide-complet">notre guide complet pour préparer sa retraite</a>{" "}
            replace chaque étape dans une stratégie d'ensemble.
          </p>
          <p>
            Si vous souhaitez caler votre calendrier de départ avec votre épargne existante, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> permet de poser ce
            cadre avant de déposer la demande.
          </p>

          <h2 id="lire-aussi">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/verifier-releve-de-carriere-retraite">Relevé de carrière : comment le vérifier et le corriger</a></li>
            <li><a href="/guide/age-de-depart-retraite-trimestres-duree-assurance">Âge de départ, trimestres et durée d'assurance</a></li>
            <li><a href="/guide/liquider-son-per-a-la-retraite-demarche">Liquider son PER à la retraite : la démarche</a></li>
            <li><a href="/guide/retraite-anticipee-carriere-longue-conditions">Retraite anticipée pour carrière longue : conditions</a></li>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : votre caisse
              de retraite est seule compétente pour fixer vos droits et vos délais. Les règles
              citées sont celles en vigueur en novembre 2026 et peuvent évoluer ; les délais de
              dépôt et la liste des pièces sont à confirmer sur votre espace personnel. Le cas
              chiffré est une illustration pédagogique. Les placements en unités de compte
              présentent un risque de perte en capital ; les performances passées ne préjugent pas
              des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="La demande de retraite se dépose en ligne. L'épargne qui l'accompagne se prépare avant." />
    </>
  );
}
