import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  FISCALITE,
  PER_PLAFOND,
  PER_PLAFOND_EXEMPLES,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Mécanique du plafond (CGI, art. 163 quatervicies) ----
// Tous les montants affichés sont recalculés depuis hypotheses.js.
const plancher = (pass) => (pass * PER_PLAFOND.tauxPlancherPass) / 100;
const plafondMax = (pass) =>
  (pass * PER_PLAFOND.multiplePassMaximum * PER_PLAFOND.tauxRevenusActivite) / 100;
const revenuMaxRetenu = (pass) => pass * PER_PLAFOND.multiplePassMaximum;

// Salaire net imposable → revenu d'activité net de frais (abattement forfaitaire).
const netDeFrais = (salaire) =>
  salaire * (1 - PER_PLAFOND.tauxAbattementFraisProfessionnels / 100);

// Plafond de l'année pour des versements 2026 (revenus 2025, PASS 2025),
// avant éventuelles sommes à retrancher.
const plafondAnnuel2026 = (revenuNet) =>
  Math.min(
    Math.max((revenuNet * PER_PLAFOND.tauxRevenusActivite) / 100, plancher(PER_PLAFOND.pass2025)),
    plafondMax(PER_PLAFOND.pass2025),
  );

const plancher2026 = plancher(PER_PLAFOND.pass2025);
const plafond2026 = plafondMax(PER_PLAFOND.pass2025);
const plancher2027 = plancher(PER_PLAFOND.pass2026);
const plafond2027 = plafondMax(PER_PLAFOND.pass2026);

// ---- Profils illustratifs ----
const { profilA, profilB, profilC, versementUnitaire } = PER_PLAFOND_EXEMPLES;

const netA = netDeFrais(profilA.salaireNetImposable2025);
const dixPourCentA = (netA * PER_PLAFOND.tauxRevenusActivite) / 100;
const plafondA = plafondAnnuel2026(netA);

const netB = netDeFrais(profilB.salaireNetImposable2025);
const plafondB = plafondAnnuel2026(netB);
const reportsB = profilB.nonUtilise2023 + profilB.nonUtilise2024 + profilB.nonUtilise2025;
const totalB = plafondB + reportsB;
// Ordre d'imputation : plafond de l'année d'abord, puis reliquats du plus ancien au plus récent.
const surPlafondAnneeB = Math.min(profilB.versementIllustratif2026, plafondB);
const sur2023B = Math.min(profilB.versementIllustratif2026 - surPlafondAnneeB, profilB.nonUtilise2023);
const perdu2023B = profilB.nonUtilise2023 - sur2023B;

const netC = netDeFrais(profilC.salaireNetImposable2025);
const plafondBrutC = plafondAnnuel2026(netC);
const aRetrancherC =
  profilC.cotisationsRetraiteObligatoiresEntreprise + profilC.abondementEmployeurPereco;
const plafondC = plafondBrutC - aRetrancherC;

const tmiImposables = FISCALITE.tmiOptions.filter((t) => t > 0);

const sources = [
  {
    label:
      "Légifrance — Code général des impôts, article 163 quatervicies (version en vigueur depuis le 21 février 2026)",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038836248/",
  },
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : cotisations d'épargne retraite (déduction), fiche F14709, vérifiée le 15 avril 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14709",
  },
  {
    label:
      "Service-Public.gouv.fr — Plan d'épargne retraite (PER) individuel, fiche F34982, vérifiée le 12 octobre 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34982",
  },
  {
    label:
      "impots.gouv.fr — Que signifie la somme imprimée dans la rubrique « Plafond épargne retraite » de mon avis d'impôt sur le revenu ?",
    url: "https://www.impots.gouv.fr/portail/particulier/questions/que-signifie-la-somme-imprimee-dans-la-rubrique-plafond-epargne-retraite-de",
  },
  {
    label:
      "impots.gouv.fr — Brochure pratique 2026 (déclaration des revenus de 2025), chapitre « Charges à déduire du revenu », rubrique Épargne retraite",
    url: "https://www.impots.gouv.fr/www2/fichiers/documentation/brochure/ir_2026/pdf_som/12-charges_ded_rev_225a236.pdf",
  },
  {
    label:
      "Service-Public.gouv.fr — Plafond de la sécurité sociale pour 2026 (arrêté du 22 décembre 2025)",
    url: "https://www.service-public.gouv.fr/particuliers/actualites/A15386",
  },
];

export default function GuidePlafondPerVersement2026() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide prix · PER et impôt 2026</span>
          <h1>PER : jusqu'à quand verser en 2026, et dans quelle limite déduire ?</h1>
          <p className="sub">
            Date limite, plafond, lecture de l'avis d'imposition et reports. Mis à jour le{" "}
            {PER_PLAFOND.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> pour être déduit des revenus de 2026, un versement
              volontaire sur un PER doit être effectué au plus tard le 31 décembre 2026. Pour un
              salarié, la déduction est limitée à {pct(PER_PLAFOND.tauxRevenusActivite)} des
              revenus d'activité de 2025 nets de frais, avec un minimum de {euros(plancher2026)} et
              un maximum de {euros(plafond2026)}, auxquels s'ajoutent les plafonds non utilisés de
              2023, 2024 et 2025. Le montant exact figure sur l'avis d'impôt reçu en 2026, ligne
              « Plafond pour les cotisations versées en 2026 ».
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#date-limite">Jusqu'à quelle date verser sur un PER pour l'impôt sur les revenus de 2026 ?</a></li>
              <li><a href="#plafond">Quel est le plafond de déduction du PER pour un versement en 2026 ?</a></li>
              <li><a href="#avis">Où trouver son plafond PER sur l'avis d'imposition ?</a></li>
              <li><a href="#exemples">Combien peut-on déduire ? Trois profils illustratifs</a></li>
              <li><a href="#reports">Comment fonctionne le report des plafonds PER non utilisés ?</a></li>
              <li><a href="#economie">Quelle économie d'impôt pour 1 000 € versés sur un PER ?</a></li>
              <li><a href="#erreurs">Quelles erreurs éviter avant un versement de fin d'année ?</a></li>
              <li><a href="#2027">Le plafond PER changera-t-il en 2027 ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Chaque année, la même scène se répète entre la mi-novembre et Noël : on sait qu'un
            versement sur un plan d'épargne retraite « fait baisser l'impôt », on a une somme de
            côté, et l'on bute sur deux questions très concrètes. Jusqu'à quand ? Et jusqu'à
            combien ? Verser trop tard, c'est décaler la déduction d'un an. Verser au-delà de son
            plafond, c'est immobiliser de l'épargne jusqu'à la retraite sans l'avantage fiscal
            attendu. Verser sans avoir regardé ses reports, c'est parfois laisser s'éteindre un
            droit qui ne reviendra pas.
          </p>
          <p>
            Le plafond de déduction du PER est la limite annuelle, propre à chaque contribuable,
            dans laquelle les versements volontaires sur un plan d'épargne retraite sont retranchés
            du revenu imposable. Ce guide explique la règle en vigueur au {PER_PLAFOND.maj}, la
            façon de lire la ligne qui vous concerne sur votre avis d'impôt, et le mécanisme des
            reports, avec trois profils chiffrés. Il ne dit pas s'il faut verser, ni combien :
            cela dépend de votre situation d'ensemble.
          </p>

          <h2 id="date-limite">
            Jusqu'à quelle date verser sur un PER pour l'impôt sur les revenus de 2026 ?
          </h2>
          <p>
            <strong>
              Un versement volontaire est déduit des revenus de 2026 s'il est effectué en 2026,
              donc au plus tard le 31 décembre 2026.
            </strong>{" "}
            Il se déclare au printemps 2027, dans la déclaration des revenus de 2026, et l'économie
            d'impôt apparaît sur l'avis d'impôt établi à l'été 2027.
          </p>
          <p>
            En pratique, le 31 décembre est une date fiscale, pas une date de guichet. Chaque
            gestionnaire de plan (assureur, banque, société de gestion) fixe sa propre date limite
            de réception des versements pour qu'ils soient comptabilisés sur l'année en cours,
            souvent plusieurs jours avant la fin du mois de décembre, et les délais d'un virement
            ou d'un prélèvement s'y ajoutent. La date à retenir est donc celle que communique le
            gestionnaire de votre plan, à lui demander par écrit si elle n'est pas affichée.
          </p>
          <p>
            Après le versement, le gestionnaire adresse un justificatif fiscal (l'imprimé n° 2561
            ter, d'après la brochure pratique 2026 de l'administration fiscale) indiquant le
            montant à reporter dans la rubrique « Charges déductibles » de la déclaration. Pour les
            versements faits en 2025, il s'agissait des cases 6NS, 6NT et 6NU ; les intitulés de
            cases sont à vérifier chaque année sur la déclaration elle-même.
          </p>

          <h2 id="plafond">Quel est le plafond de déduction du PER pour un versement en 2026 ?</h2>
          <p>
            <strong>
              Pour un salarié, le plafond de déduction des versements effectués en 2026 est égal à{" "}
              {pct(PER_PLAFOND.tauxRevenusActivite)} des revenus d'activité professionnelle de 2025,
              nets de frais professionnels, retenus dans la limite de{" "}
              {euros(revenuMaxRetenu(PER_PLAFOND.pass2025))}, soit {euros(plafond2026)} au maximum,
              ou à {euros(plancher2026)} si ce montant est plus élevé.
            </strong>{" "}
            Ces deux bornes découlent du plafond annuel de la sécurité sociale (PASS) de 2025, fixé
            à {euros(PER_PLAFOND.pass2025)} : le minimum vaut {pct(PER_PLAFOND.tauxPlancherPass)} du
            PASS, le maximum {pct(PER_PLAFOND.tauxRevenusActivite)} de{" "}
            {PER_PLAFOND.multiplePassMaximum} fois le PASS (article 163 quatervicies du Code général
            des impôts, fiche Service-Public F14709).
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Situation en 2025</th>
                  <th>Plafond de l'année pour les versements de 2026</th>
                  <th>Comment il se calcule</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Revenus d'activité nets de frais inférieurs à {euros(PER_PLAFOND.pass2025)}, ou
                    pas de revenu professionnel
                  </td>
                  <td>{euros(plancher2026)} (plancher)</td>
                  <td>
                    {pct(PER_PLAFOND.tauxPlancherPass)} du PASS 2025 ({euros(PER_PLAFOND.pass2025)})
                  </td>
                </tr>
                <tr>
                  <td>
                    Revenus d'activité nets de frais compris entre {euros(PER_PLAFOND.pass2025)} et{" "}
                    {euros(revenuMaxRetenu(PER_PLAFOND.pass2025))}
                  </td>
                  <td>
                    De {euros(plancher2026)} à {euros(plafond2026)}
                  </td>
                  <td>{pct(PER_PLAFOND.tauxRevenusActivite)} des revenus d'activité nets de frais</td>
                </tr>
                <tr>
                  <td>
                    Revenus d'activité nets de frais supérieurs à{" "}
                    {euros(revenuMaxRetenu(PER_PLAFOND.pass2025))}
                  </td>
                  <td>{euros(plafond2026)} (maximum)</td>
                  <td>
                    {pct(PER_PLAFOND.tauxRevenusActivite)} de {PER_PLAFOND.multiplePassMaximum} fois
                    le PASS 2025
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Trois précisions changent souvent le résultat. D'abord, « nets de frais » signifie
            après l'abattement forfaitaire de{" "}
            {pct(PER_PLAFOND.tauxAbattementFraisProfessionnels)} (lui-même plafonné) ou après
            déduction des frais réels : la base n'est ni le salaire brut, ni le net versé sur le
            compte. Ensuite, le plafond est individuel : chaque membre du foyer fiscal a le sien.
            Enfin, ce plafond de l'année est diminué de l'épargne retraite déjà constituée par
            l'entreprise l'année précédente :
          </p>
          <ul>
            <li>
              les cotisations aux régimes de retraite supplémentaire obligatoires de l'entreprise
              (« article 83 », PER obligatoire), part patronale et part salariale déduite du
              salaire ;
            </li>
            <li>
              l'abondement de l'employeur à un Perco ou à un PER d'entreprise collectif, pour sa
              fraction exonérée d'impôt sur le revenu ;
            </li>
            <li>
              les droits du compte épargne-temps ou les jours de repos monétisés affectés à
              l'épargne retraite d'entreprise et exonérés (dans la limite de dix jours par an).
            </li>
          </ul>
          <div className="note">
            <p>
              Deux cas sortent de cette règle générale. Les travailleurs indépendants disposent
              d'un mode de calcul propre, que nous détaillons dans{" "}
              <a href="/guide/retraite-independants-per-ou-madelin">
                notre guide sur le PER et le Madelin des indépendants
              </a>
              , utile si vos revenus sont des bénéfices plutôt que des salaires. Et depuis le 1er
              janvier 2026, les versements effectués à partir de{" "}
              {PER_PLAFOND.ageFinDeduction} ans restent possibles mais ne sont plus déductibles
              (fiches Service-Public F34982 et F14709).
            </p>
          </div>

          <h2 id="avis">Où trouver son plafond PER sur l'avis d'imposition ?</h2>
          <p>
            <strong>
              Le plafond personnel figure sur l'avis d'impôt sur le revenu reçu en 2026 (revenus de
              2025), dans la rubrique « Plafond épargne retraite », à la ligne « Plafond pour les
              cotisations versées en 2026 ».
            </strong>{" "}
            Selon l'administration fiscale, ce montant additionne le plafond calculé sur les
            revenus de 2025 et les plafonds non utilisés des trois années précédentes. C'est donc
            lui, et non la formule théorique, qui fait foi.
          </p>
          <p>La lecture se fait en cinq étapes, avis en main :</p>
          <ol>
            <li>
              <strong>Prendre le bon document.</strong> L'avis d'impôt établi à l'été 2026 sur les
              revenus de 2025, disponible dans l'espace particulier du site impots.gouv.fr
              (rubrique « Documents »). L'avis de l'année précédente donne un plafond périmé.
            </li>
            <li>
              <strong>Repérer la rubrique « Plafond épargne retraite ».</strong> Elle se trouve en
              fin d'avis et comporte une colonne par déclarant : dans un couple, les deux plafonds
              sont distincts.
            </li>
            <li>
              <strong>Lire la ligne « Plafond pour les cotisations versées en 2026 ».</strong>{" "}
              C'est le total disponible pour les versements de l'année, reports compris.
            </li>
            <li>
              <strong>Regarder le détail des lignes de plafond non utilisé.</strong> Elles
              indiquent, année par année, ce qu'il reste des plafonds antérieurs. La plus ancienne
              est celle qui s'éteint en premier.
            </li>
            <li>
              <strong>Retrancher ce qui a déjà été versé en 2026.</strong> Les versements
              programmés ou ponctuels faits depuis janvier sur un PER individuel, ainsi que les
              versements volontaires déductibles faits sur un PER d'entreprise, consomment le même
              plafond. L'avis ne les connaît pas encore.
            </li>
          </ol>
          <div className="note">
            <p>
              <strong>Check-list avant de verser :</strong> avis 2026 sur les revenus de 2025
              retrouvé ; ligne « Plafond pour les cotisations versées en 2026 » relevée pour chaque
              déclarant ; versements 2026 déjà effectués additionnés ; montant du plafond non
              utilisé le plus ancien noté ; date limite de réception demandée au gestionnaire du
              plan ; tranche marginale d'imposition du foyer connue.
            </p>
          </div>

          <h2 id="exemples">Combien peut-on déduire ? Trois profils illustratifs</h2>
          <p>
            <strong>
              À salaire différent, plafond différent : de {euros(plancher2026)} pour un revenu
              d'activité modeste à plusieurs milliers d'euros de plus dès que l'on dépasse le PASS,
              avant prise en compte des reports et de l'épargne retraite d'entreprise.
            </strong>{" "}
            Les trois profils ci-dessous sont des composites pédagogiques, sans lien avec des
            personnes réelles. Hypothèses communes : salariés, abattement forfaitaire de{" "}
            {pct(PER_PLAFOND.tauxAbattementFraisProfessionnels)} pour frais professionnels, salaire
            net imposable de 2025 pris comme seul revenu d'activité. Ces chiffres sont fournis à
            titre illustratif et ne remplacent pas la ligne de votre avis d'impôt.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Profil illustratif</th>
                  <th>Salaire net imposable 2025</th>
                  <th>Revenu net de frais</th>
                  <th>Plafond de l'année (versements 2026)</th>
                  <th>Total disponible en 2026</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A. Salariée, aucune épargne retraite d'entreprise, pas de report</td>
                  <td>{euros(profilA.salaireNetImposable2025)}</td>
                  <td>{euros(netA)}</td>
                  <td>
                    {euros(plafondA)} (le plancher, car {pct(PER_PLAFOND.tauxRevenusActivite)} ={" "}
                    {euros(dixPourCentA)})
                  </td>
                  <td>{euros(plafondA)}</td>
                </tr>
                <tr>
                  <td>B. Cadre, plafonds partiellement inutilisés de 2023 à 2025</td>
                  <td>{euros(profilB.salaireNetImposable2025)}</td>
                  <td>{euros(netB)}</td>
                  <td>{euros(plafondB)}</td>
                  <td>
                    {euros(totalB)} ({euros(plafondB)} + {euros(reportsB)} de reports)
                  </td>
                </tr>
                <tr>
                  <td>C. Cadre supérieur avec PER obligatoire et abondement de l'employeur</td>
                  <td>{euros(profilC.salaireNetImposable2025)}</td>
                  <td>{euros(netC)}</td>
                  <td>
                    {euros(plafondC)} ({euros(plafondBrutC)} moins {euros(aRetrancherC)} déjà
                    constitués via l'entreprise)
                  </td>
                  <td>{euros(plafondC)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Le profil A montre l'effet du plancher : avec {euros(netA)} de revenu net de frais, la
            règle des {pct(PER_PLAFOND.tauxRevenusActivite)} donnerait {euros(dixPourCentA)}, mais
            le minimum légal de {euros(plancher2026)} s'applique. Le profil C montre l'effet
            inverse : un salaire élevé ne garantit pas un plafond élevé lorsque l'entreprise
            cotise déjà à un régime de retraite supplémentaire (
            {euros(profilC.cotisationsRetraiteObligatoiresEntreprise)} de cotisations obligatoires
            et {euros(profilC.abondementEmployeurPereco)} d'abondement dans cette illustration). Le
            profil B, lui, dépend entièrement de ses reports, ce qui amène à la question suivante.
          </p>

          <h2 id="reports">Comment fonctionne le report des plafonds PER non utilisés ?</h2>
          <p>
            <strong>
              La part du plafond qui n'a pas été utilisée une année reste utilisable les années
              suivantes : pendant {PER_PLAFOND.reportAnneesPlafondsJusqua2025} ans pour les
              plafonds de 2023, 2024 et 2025, et pendant{" "}
              {PER_PLAFOND.reportAnneesPlafondsDepuis2026} ans à partir du plafond de 2026.
            </strong>{" "}
            L'allongement à cinq ans vient de la loi de finances pour 2026 (loi n° 2026-103 du 19
            février 2026, article 10) et n'est pas rétroactif : d'après la fiche Service-Public
            F14709, la part non utilisée du plafond de 2024 reste utilisable jusqu'en 2027, celle
            de 2025 jusqu'en 2028.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Plafond non utilisé de l'année</th>
                  <th>Durée de report</th>
                  <th>Dernière année de versement pour l'utiliser</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023</td>
                  <td>{PER_PLAFOND.reportAnneesPlafondsJusqua2025} ans</td>
                  <td>2026 (versement au plus tard le 31 décembre 2026)</td>
                </tr>
                <tr>
                  <td>2024</td>
                  <td>{PER_PLAFOND.reportAnneesPlafondsJusqua2025} ans</td>
                  <td>2027</td>
                </tr>
                <tr>
                  <td>2025</td>
                  <td>{PER_PLAFOND.reportAnneesPlafondsJusqua2025} ans</td>
                  <td>2028</td>
                </tr>
                <tr>
                  <td>2026</td>
                  <td>{PER_PLAFOND.reportAnneesPlafondsDepuis2026} ans</td>
                  <td>2031</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            L'ordre d'utilisation est fixé par l'administration et ne se choisit pas : les
            versements de 2026 s'imputent d'abord sur le plafond de l'année 2026, puis sur les
            reliquats, du plus ancien au plus récent. Conséquence peu intuitive : tant que les
            versements de l'année ne dépassent pas le plafond de l'année, aucun reliquat ancien
            n'est consommé, et le plus ancien s'éteint.
          </p>
          <p>
            Reprenons le profil B, à titre purement illustratif. Son plafond de l'année est de{" "}
            {euros(plafondB)} et ses reliquats sont de {euros(profilB.nonUtilise2023)} (2023),{" "}
            {euros(profilB.nonUtilise2024)} (2024) et {euros(profilB.nonUtilise2025)} (2025). Dans
            l'hypothèse d'un versement de {euros(profilB.versementIllustratif2026)} en 2026,{" "}
            {euros(surPlafondAnneeB)} s'imputent sur le plafond de 2026, puis {euros(sur2023B)} sur
            le reliquat de 2023. Les {euros(perdu2023B)} restants du reliquat de 2023 ne sont plus
            utilisables après le 31 décembre 2026 ; les reliquats de 2024 et de 2025 restent
            intacts pour 2027 et 2028. Ce calcul décrit une mécanique, pas un montant à verser.
          </p>
          <p>
            Pour un couple marié ou pacsé soumis à imposition commune, une option supplémentaire
            existe : la mutualisation des plafonds, demandée dans la déclaration de revenus (case
            6QR). Elle permet, lorsque l'un des deux a épuisé son plafond, d'utiliser la part
            disponible de l'autre.
          </p>

          <h2 id="economie">Quelle économie d'impôt pour 1 000 € versés sur un PER ?</h2>
          <p>
            <strong>
              L'économie d'impôt est égale au montant déduit multiplié par la tranche marginale
              d'imposition (TMI) du foyer : pour {euros(versementUnitaire)} déduits, de{" "}
              {euros((versementUnitaire * tmiImposables[0]) / 100)} à{" "}
              {euros((versementUnitaire * tmiImposables[tmiImposables.length - 1]) / 100)} selon la
              tranche.
            </strong>{" "}
            Hypothèse du tableau : la totalité du versement est déduite dans une seule et même
            tranche du barème. Si la déduction fait passer une partie du revenu dans la tranche
            inférieure, l'économie réelle est plus faible.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Tranche marginale d'imposition</th>
                  <th>Économie d'impôt pour {euros(versementUnitaire)} déduits</th>
                  <th>Effort d'épargne net de l'année</th>
                </tr>
              </thead>
              <tbody>
                {tmiImposables.map((tmi) => (
                  <tr key={tmi}>
                    <td>{pct(tmi)}</td>
                    <td>{euros((versementUnitaire * tmi) / 100)}</td>
                    <td>{euros(versementUnitaire - (versementUnitaire * tmi) / 100)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Cette économie n'est pas un gain définitif. En contrepartie de la déduction à l'entrée,
            les sommes sont en principe bloquées jusqu'à la retraite et les versements déduits sont
            imposés à la sortie. L'avantage dépend donc de l'écart entre la tranche d'imposition
            d'aujourd'hui et celle de la retraite, que personne ne connaît avec certitude. Pour
            mesurer cette seconde moitié de l'équation,{" "}
            <a href="/guide/fiscalite-sortie-per">
              notre guide sur la fiscalité de sortie du PER
            </a>{" "}
            détaille l'imposition du capital et de la rente. Et parce qu'une déduction ne compense
            pas un contrat coûteux,{" "}
            <a href="/guide/combien-coute-un-per">notre grille des frais d'un PER</a> permet de
            vérifier ce que le plan prélève chaque année sur l'épargne versée.
          </p>

          <h2 id="erreurs">Quelles erreurs éviter avant un versement de fin d'année ?</h2>
          <p>
            <strong>
              Les erreurs les plus fréquentes tiennent à la lecture du plafond et au calendrier,
              pas au choix du contrat.
            </strong>
          </p>
          <ul>
            <li>
              <strong>Calculer son plafond sur le salaire de 2026.</strong> Le plafond des
              versements de 2026 dépend des revenus de 2025. Une hausse de salaire en 2026 ne
              produira son effet que sur le plafond de 2027.
            </li>
            <li>
              <strong>Oublier l'épargne retraite d'entreprise.</strong> Cotisations obligatoires et
              abondement ont déjà réduit le plafond ; les versements volontaires déductibles faits
              sur le PER de l'entreprise le consomment aussi.
            </li>
            <li>
              <strong>Croire qu'un report ancien s'utilise en priorité.</strong> Le plafond de
              l'année passe toujours en premier.
            </li>
            <li>
              <strong>Attendre les derniers jours de décembre.</strong> Les dates limites des
              gestionnaires sont antérieures au 31 décembre.
            </li>
            <li>
              <strong>Verser au-delà du plafond disponible.</strong> La fraction excédentaire
              n'est pas déduite, alors que l'épargne reste soumise aux règles de blocage du PER,
              détaillées dans{" "}
              <a href="/guide/deblocage-anticipe-per">
                notre guide sur les cas de déblocage anticipé
              </a>
              , à lire avant d'immobiliser une somme dont vous pourriez avoir besoin.
            </li>
            <li>
              <strong>Raisonner sur la seule déduction.</strong> Horizon de placement, épargne de
              précaution, tranche d'imposition attendue à la retraite : ces questions précèdent
              celle du montant, comme l'explique{" "}
              <a href="/guide/faut-il-ouvrir-un-per">
                notre guide sur les cas où le PER n'est pas adapté
              </a>
              .
            </li>
          </ul>

          <h2 id="2027">Le plafond PER changera-t-il en 2027 ?</h2>
          <p>
            <strong>
              À législation constante, le plafond des versements de 2027 sera calculé sur les
              revenus de 2026 et sur le PASS de 2026, fixé à {euros(PER_PLAFOND.pass2026)} par
              l'arrêté du 22 décembre 2025 : le minimum passerait à {euros(plancher2027)} et le
              maximum à {euros(plafond2027)}.
            </strong>{" "}
            Ces deux montants résultent de l'application de la formule actuelle ; ils ne figurent
            pas encore sur un avis d'impôt.
          </p>
          <p>
            La réserve est importante : au {PER_PLAFOND.maj}, le projet de loi de finances pour
            2027 est encore en discussion au Parlement et n'est pas voté. Les règles applicables
            aux versements de 2027 ne peuvent donc pas être tenues pour acquises. Les règles
            décrites dans ce guide pour les versements de 2026 sont celles du texte en vigueur à
            cette date.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Je n'ai jamais eu de PER : ai-je quand même un plafond et des reports ?</h3>
          <p>
            Oui. Le plafond d'épargne retraite est calculé chaque année par l'administration
            fiscale pour chaque membre du foyer, que vous déteniez un plan ou non. Une personne qui
            ouvre son premier PER en 2026 peut donc disposer du plafond de l'année et des reliquats
            de 2023, 2024 et 2025 indiqués sur son avis d'impôt.
          </p>
          <h3>Que se passe-t-il si je verse plus que mon plafond ?</h3>
          <p>
            La part qui dépasse le plafond disponible (plafond de l'année, reports et, le cas
            échéant, plafond mutualisé du conjoint) n'est pas déduite du revenu imposable. Avant un
            versement important, le plus sûr est de rapprocher le montant envisagé de la ligne
            « Plafond pour les cotisations versées en 2026 » et des versements déjà faits dans
            l'année.
          </p>
          <h3>Puis-je utiliser le plafond de mon conjoint ?</h3>
          <p>
            Oui, si vous êtes mariés ou pacsés et soumis à une imposition commune : la
            mutualisation des plafonds se demande dans la déclaration de revenus (case 6QR). Elle
            ne s'applique pas aux concubins, qui déposent deux déclarations distinctes.
          </p>
          <h3>Le plafond de 10 000 € des niches fiscales limite-t-il la déduction du PER ?</h3>
          <p>
            Non. Les versements sur un PER sont une charge déduite du revenu, et non une réduction
            ou un crédit d'impôt : ils obéissent à leur propre plafond, celui décrit dans ce guide,
            et ne sont pas compris dans le plafonnement global des avantages fiscaux.
          </p>
          <h3>Un versement de décembre 2026 réduit-il mon prélèvement à la source tout de suite ?</h3>
          <p>
            Non. La déduction est prise en compte lors du calcul de l'impôt sur les revenus de
            2026, après la déclaration du printemps 2027. Elle se traduit en principe par un solde
            d'impôt plus faible ou une restitution à l'été 2027, puis par un taux de prélèvement
            ajusté.
          </p>
          <h3>Suis-je obligé de déduire mes versements ?</h3>
          <p>
            Non. Il est possible de renoncer à la déduction au moment du versement ; la fiscalité à
            la sortie est alors différente pour la part correspondante. Ce choix se fait versement
            par versement auprès du gestionnaire et mérite d'être examiné lorsque la tranche
            d'imposition est basse.
          </p>
          <h3>Je suis retraité ou sans activité : ai-je droit à un plafond ?</h3>
          <p>
            Oui : en l'absence de revenu professionnel, le plafond de l'année est égal au minimum,
            soit {euros(plancher2026)} pour les versements de 2026. La limite d'âge de{" "}
            {PER_PLAFOND.ageFinDeduction} ans pour la déduction s'applique toutefois depuis le 1er
            janvier 2026.
          </p>
          <h3>Mon plafond non utilisé de 2023 est-il vraiment perdu après le 31 décembre 2026 ?</h3>
          <p>
            Oui : un plafond de 2023 se reporte sur les trois années suivantes, soit jusqu'aux
            versements de 2026. Il n'est toutefois consommé que si les versements de 2026 dépassent
            d'abord le plafond propre à 2026. Laisser s'éteindre un reliquat n'est pas une faute en
            soi : un droit à déduction n'a de valeur que si le versement a du sens par ailleurs.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La réponse tient en trois repères : la date (31 décembre 2026, et plus tôt chez la
            plupart des gestionnaires), la formule ({pct(PER_PLAFOND.tauxRevenusActivite)} des
            revenus d'activité de 2025 nets de frais, entre {euros(plancher2026)} et{" "}
            {euros(plafond2026)}, plus les reports), et le document qui fait foi (la ligne
            « Plafond pour les cotisations versées en 2026 » de votre avis d'impôt). Avec ces trois
            éléments, la question « combien puis-je déduire ? » a une réponse exacte.
          </p>
          <p>
            Ne pas s'y pencher avant la fin de l'année a un coût précis : le reliquat de 2023
            s'éteint, et une année de déduction à votre tranche actuelle ne se rattrape pas. À
            l'inverse, verser dans la précipitation pour « ne pas perdre » un plafond peut bloquer
            une épargne dont vous aurez besoin avant la retraite. La prochaine étape utile est donc
            de replacer ce plafond dans l'ensemble :{" "}
            <a href="/strategies/per">notre page consacrée à la stratégie PER</a> présente la place
            de cette enveloppe aux côtés de l'assurance-vie et du PEA, et{" "}
            <a href="/guide/a-quel-age-commencer-per">notre guide sur l'âge d'ouverture d'un PER</a>{" "}
            éclaire l'arbitrage entre horizon de placement et déduction.
          </p>
          <p>
            Si vous souhaitez situer ces chiffres dans votre trajectoire de retraite (pension
            attendue, épargne existante, fiscalité probable à la sortie), le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à poser ce
            cadre général avant toute décision de versement.
          </p>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées le {PER_PLAFOND.maj} :</p>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seul le
              montant porté sur votre avis d'impôt fait foi pour votre plafond. Les règles et
              montants cités sont ceux en vigueur au {PER_PLAFOND.maj} ; les profils chiffrés sont
              des illustrations pédagogiques. Les supports d'un PER investis en unités de compte
              présentent un risque de perte en capital.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Votre plafond est sur votre avis d'impôt. Sa place dans votre retraite se construit." />
    </>
  );
}
