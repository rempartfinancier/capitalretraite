import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  AV_RACHAT,
  FISCALITE,
  V3_AVB_DECL,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const tauxIR = FISCALITE.pfuIR; // 12,8 %
const tauxReduit = FISCALITE.avTauxReduitApres8Ans; // 7,5 %
const psAv = FISCALITE.prelevementsSociaux.assuranceVie; // 17,2 %
const psPer = FISCALITE.prelevementsSociaux.per; // 18,6 %
const abattementSeul = FISCALITE.avAbattementAnnuelSeul;
const abattementCouple = FISCALITE.avAbattementAnnuelCouple;
const duree = AV_RACHAT.dureeTauxReduitAnnees;
const rfrSeul = AV_RACHAT.rfrDispenseAcompteSeul;
const rfrCouple = AV_RACHAT.rfrDispenseAcompteCouple;
const dateDispense = AV_RACHAT.dateLimiteDemandeDispense;
const maj = V3_AVB_DECL.maj;

const r2 = (n) => Math.round(n * 100) / 100;
const de = (base, taux) => r2((base * taux) / 100);
const eur = (n) =>
  Number.isInteger(r2(n))
    ? euros(n)
    : new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(r2(n));

// ---- Exemple 1 : rachat d'assurance-vie, contrat de plus de 8 ans, personne seule ----
const gainsAv = V3_AVB_DECL.avGainsRachat; // 6 000 €
const acompteApres8 = de(gainsAv, tauxReduit); // 450 €
const psRachat = de(gainsAv, psAv); // 1 032 €
const baseIR = Math.max(gainsAv - abattementSeul, 0); // 1 400 €
const irDu = de(baseIR, tauxReduit); // 105 €
const restitution = r2(acompteApres8 - irDu); // 345 €
const totalDefinitif = r2(psRachat + irDu); // 1 137 €
const partTotalGains = r2((totalDefinitif / gainsAv) * 100);
// Même gains sur un contrat de moins de 8 ans
const acompteAvant8 = de(gainsAv, tauxIR); // 768 €
const totalAvant8 = r2(acompteAvant8 + psRachat);

// ---- Exemple 2 : sortie en capital d'un PER, versements déduits ----
const versementsDeduits = V3_AVB_DECL.perVersementsDeduits; // 40 000 €
const gainsPer = V3_AVB_DECL.perGains; // 10 000 €
const tmi = V3_AVB_DECL.tmiExemple; // 30 %
const capitalPer = versementsDeduits + gainsPer;
const impotVersements = de(versementsDeduits, tmi); // 12 000 € (TMI appliquée en bloc : simplification)
const impotGainsIR = de(gainsPer, tauxIR); // 1 280 €
const impotGainsPS = de(gainsPer, psPer); // 1 860 €
const impotGains = r2(impotGainsIR + impotGainsPS); // 3 140 €
const totalPer = r2(impotVersements + impotGains);
const partTotalPer = r2((totalPer / capitalPer) * 100);

const sources = [
  {
    label:
      "Service-Public.gouv.fr, fiche F22414 : comment sont imposés les revenus d'un contrat d'assurance-vie ? (vérifiée le 15 avril 2026)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22414",
  },
  {
    label:
      "Service-Public.gouv.fr, fiche F34982 : plan d'épargne retraite (PER), versements, sortie et fiscalité",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34982",
  },
  {
    label:
      "impots.gouv.fr, « Les revenus mobiliers » (mise à jour du 8 avril 2026) : option pour le barème, prélèvements sociaux",
    url: "https://www.impots.gouv.fr/particulier/les-revenus-mobiliers",
  },
  {
    label:
      "BOFiP, BOI-RPPM-RCM-20-15 : modalités d'imposition à l'impôt sur le revenu (taux de 12,8 % et de 7,5 %)",
    url: "https://bofip.impots.gouv.fr/bofip/11224-PGP.html",
  },
  {
    label:
      "BOFiP, BOI-RPPM-RCM-20-10-20-50 : produit imposable d'un rachat, abattement annuel",
    url: "https://bofip.impots.gouv.fr/bofip/3951-PGP.html",
  },
  {
    label:
      "impots.gouv.fr, espace particulier : déclaration de revenus et notice de la déclaration en vigueur (à lire chaque année pour les numéros de cases)",
    url: "https://www.impots.gouv.fr/particulier",
  },
  {
    label:
      "Légifrance, Code général des impôts : accès par la racine du site",
    url: "https://www.legifrance.gouv.fr",
  },
];

export default function GuideDeclarerRachatAvSortiePer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · Déclaration de revenus</span>
          <h1>Déclarer un rachat d'assurance-vie ou une sortie de PER</h1>
          <p className="sub">
            IFU, prélèvement à la source, option pour le barème, cases de report, pièces à
            conserver, erreurs fréquentes : la marche à suivre, avec deux exemples calculés. Mis à
            jour en {maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> vous n'avez en général pas à calculer vous-même ce que
              vous déclarez : l'assureur ou l'établissement qui gère votre PER transmet les montants à
              l'administration et vous remet un imprimé fiscal unique (IFU) début d'année suivante,
              dont les chiffres sont préremplis dans votre déclaration. Votre travail est de les
              vérifier, de choisir entre le taux forfaitaire et le barème, et de conserver les
              justificatifs. Dans l'exemple de ce guide, un rachat contenant {euros(gainsAv)} de
              gains subit {eur(acompteApres8)} d'acompte, mais l'impôt réel est de {eur(irDu)} :
              l'administration restitue {eur(restitution)}.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#qui">Qui déclare quoi, l'assureur ou vous ?</a></li>
              <li><a href="#ifu">Que contient l'IFU et quand l'attendre ?</a></li>
              <li><a href="#acompte">Prélèvement à {pct(tauxIR)}, puis option pour le barème : comment ça marche ?</a></li>
              <li><a href="#exemple-av">Exemple chiffré : un rachat d'assurance-vie, de l'acompte à la restitution</a></li>
              <li><a href="#cases">Où reporter les montants ? Cases et notice officielle</a></li>
              <li><a href="#per-capital">Comment déclarer une sortie de PER en capital ?</a></li>
              <li><a href="#per-rente">Et une sortie en rente ?</a></li>
              <li><a href="#etapes">Démarche en étapes, de la demande à l'avis d'impôt</a></li>
              <li><a href="#pieces">Quelles pièces conserver ?</a></li>
              <li><a href="#checklist">Check-list</a></li>
              <li><a href="#tableau">Option barème : quand ça vaut le coup, quand éviter</a></li>
              <li><a href="#erreurs">Erreurs fréquentes</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Prenons un cas composite, sans lien avec une personne réelle : un retraité qui a
            racheté une partie de son assurance-vie au printemps, puis liquidé une partie de son
            PER en capital à l'automne. En mars suivant, il découvre un IFU, un acompte déjà
            prélevé, plusieurs cases préremplies et un choix à faire entre deux modes
            d'imposition. Rien n'est compliqué, mais la première fois, on ne sait pas par où
            commencer.
          </p>
          <p>
            Ce guide traite la déclaration, pas le calcul de fond. Pour savoir comment se calcule
            la part de gains d'un rachat, reportez-vous à{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">
              notre guide du rachat partiel
            </a>{" "}
            ; pour l'imposition d'une sortie de PER (capital, rente, fractionnement),{" "}
            <a href="/guide/fiscalite-sortie-per">le guide de la fiscalité de sortie du PER</a>.
          </p>

          <h2 id="qui">Qui déclare quoi, l'assureur ou vous ?</h2>
          <p>
            L'assureur ou l'organisme gestionnaire du PER informe l'administration des sommes
            versées ; le contribuable, lui, doit vérifier et valider sa déclaration de revenus.
            Les montants sont en principe préremplis, mais le préremplissage n'est pas une
            garantie : en cas d'erreur ou d'omission, c'est vous qui devez corriger.
          </p>
          <p>
            Deux situations demandent plus d'attention : lorsque vous détenez plusieurs contrats
            (chaque établissement émet son propre IFU, et l'abattement annuel est unique pour tous
            vos contrats), et lorsque vous avez changé d'établissement dans l'année.
          </p>

          <h2 id="ifu">Que contient l'IFU et quand l'attendre ?</h2>
          <p>
            L'imprimé fiscal unique récapitule, pour l'année civile écoulée, les revenus de
            capitaux mobiliers et les opérations de l'établissement : montant des rachats, part de
            gains, prélèvements opérés, prélèvements sociaux. Il arrive en général au début de
            l'année suivante, avant l'ouverture de la déclaration en ligne ; il est souvent
            consultable dans l'espace client de l'assureur.
          </p>
          <p>
            Pour un rachat d'assurance-vie, repérez surtout : le montant brut racheté, la part de
            gains, l'acompte d'impôt prélevé, les prélèvements sociaux, et la ventilation entre
            primes versées avant et depuis le {AV_RACHAT.datePivotPrimes}. Pour une sortie de PER,
            repérez la ventilation entre versements déduits, versements non déduits et gains.
          </p>

          <h2 id="acompte">Prélèvement à {pct(tauxIR)}, puis option pour le barème : comment ça marche ?</h2>
          <p>
            Lors d'un rachat, l'assureur retient un acompte sur la part de gains : {pct(tauxIR)} si
            le contrat a moins de {duree} ans, {pct(tauxReduit)} à partir de {duree} ans, sans tenir
            compte de l'abattement annuel. Ce prélèvement n'est pas définitif : l'impôt final est
            calculé lors de votre déclaration de revenus, et l'acompte vient en déduction.
          </p>
          <p>
            À ce moment, vous pouvez conserver le taux forfaitaire ou opter pour le barème
            progressif. L'option, qui se coche sur la déclaration (case 2OP selon impots.gouv.fr),
            est globale : elle s'applique à tous les revenus mobiliers et plus-values de l'année,
            pas seulement au rachat. Elle peut avantager un foyer peu imposé ; elle pénalise un
            foyer dont le taux marginal est élevé.
          </p>
          <p>
            Il est possible de demander une dispense d'acompte si le revenu fiscal de référence de
            l'avant-dernière année est inférieur à {euros(rfrSeul)} (personne seule) ou{" "}
            {euros(rfrCouple)} (couple soumis à imposition commune). La demande doit parvenir à
            l'établissement au plus tard le {dateDispense} de l'année précédant le rachat. La
            dispense ne supprime pas l'impôt : elle évite seulement de l'avancer.
          </p>

          <h2 id="exemple-av">Exemple chiffré : un rachat d'assurance-vie, de l'acompte à la restitution</h2>
          <div className="note">
            <p>
              Exemple illustratif, sans lien avec un cas réel : un contribuable seul rachète une
              partie d'un contrat de plus de {duree} ans, dont la part de gains est de{" "}
              {euros(gainsAv)}. Les versements sont postérieurs au {AV_RACHAT.datePivotPrimes},
              aucun prélèvement social n'a déjà été acquitté, il n'y a pas d'autre rachat dans
              l'année, et le taux forfaitaire est conservé.
            </p>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Étape</th>
                  <th>Calcul</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Au rachat : acompte retenu par l'assureur</td>
                  <td>{euros(gainsAv)} × {pct(tauxReduit)}</td>
                  <td>{eur(acompteApres8)}</td>
                </tr>
                <tr>
                  <td>Au rachat : prélèvements sociaux</td>
                  <td>{euros(gainsAv)} × {pct(psAv)}</td>
                  <td>{eur(psRachat)}</td>
                </tr>
                <tr>
                  <td>À la déclaration : gains après abattement</td>
                  <td>{euros(gainsAv)} − {euros(abattementSeul)}</td>
                  <td>{eur(baseIR)}</td>
                </tr>
                <tr>
                  <td>À la déclaration : impôt réellement dû</td>
                  <td>{eur(baseIR)} × {pct(tauxReduit)}</td>
                  <td>{eur(irDu)}</td>
                </tr>
                <tr>
                  <td>À l'avis d'impôt : restitution</td>
                  <td>{eur(acompteApres8)} − {eur(irDu)}</td>
                  <td>{eur(restitution)}</td>
                </tr>
                <tr>
                  <td>Total définitif</td>
                  <td>{eur(psRachat)} + {eur(irDu)}</td>
                  <td>
                    {eur(totalDefinitif)}, soit {pct(partTotalGains)} des gains
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Sur un contrat de moins de {duree} ans, les mêmes gains supporteraient un acompte de{" "}
            {eur(acompteAvant8)} (à {pct(tauxIR)}) et un total de {eur(totalAvant8)} avec les
            prélèvements sociaux, sans abattement. Pour un couple soumis à imposition commune,
            l'abattement est de {euros(abattementCouple)} au lieu de {euros(abattementSeul)}. Si
            l'abattement absorbait tous les gains, l'acompte serait entièrement restitué.
          </p>

          <h2 id="cases">Où reporter les montants ? Cases et notice officielle</h2>
          <p>
            Les numéros de cases de la déclaration de revenus changent d'une année à l'autre et
            selon le type de revenu : nous ne les listons pas ici pour ne pas vous induire en
            erreur. La marche à suivre est la suivante :
          </p>
          <ul>
            <li>
              ouvrez la notice officielle de la déclaration de l'année en cours sur impots.gouv.fr
              et repérez la rubrique « revenus des valeurs et capitaux mobiliers » ;
            </li>
            <li>
              comparez chaque montant prérempli au montant de votre IFU ; en cas d'écart, corrigez
              la case et conservez l'IFU ;
            </li>
            <li>
              si un revenu n'apparaît pas (assureur étranger, contrat sans transmission automatique),
              reportez-le dans la case de la notice qui lui correspond ;
            </li>
            <li>
              reportez, le cas échéant, la ligne de report indiquée sur la notice pour les montants
              déjà soumis à un prélèvement ;
            </li>
            <li>
              décidez de l'option pour le barème avant de valider, puisqu'elle porte sur
              l'ensemble de vos revenus mobiliers.
            </li>
          </ul>

          <h2 id="per-capital">Comment déclarer une sortie de PER en capital ?</h2>
          <p>
            Une sortie en capital d'un PER se compose de plusieurs blocs, imposés différemment : les
            versements volontaires déduits (imposés au barème progressif), les versements non
            déduits (non imposés), et les gains (prélèvement forfaitaire unique de {pct(tauxIR)} et
            prélèvements sociaux de {pct(psPer)}). L'organisme gestionnaire transmet la
            ventilation ; selon le contrat, il peut aussi retenir un acompte, indiqué sur
            l'attestation fiscale ou l'IFU.
          </p>
          <div className="note">
            <p>
              Exemple illustratif, sans lien avec un cas réel : un capital de {euros(capitalPer)}{" "}
              est retiré en une fois, dont {euros(versementsDeduits)} de versements déduits et{" "}
              {euros(gainsPer)} de gains. Par simplification, on applique une tranche marginale de{" "}
              {tmi} % à l'ensemble des versements déduits (le barème est en réalité progressif).
            </p>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Bloc</th>
                  <th>Régime</th>
                  <th>Impôt estimé</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Versements déduits : {euros(versementsDeduits)}</td>
                  <td>Barème, tranche de {tmi} %</td>
                  <td>{eur(impotVersements)}</td>
                </tr>
                <tr>
                  <td>Gains : {euros(gainsPer)}, impôt sur le revenu</td>
                  <td>{pct(tauxIR)}</td>
                  <td>{eur(impotGainsIR)}</td>
                </tr>
                <tr>
                  <td>Gains : {euros(gainsPer)}, prélèvements sociaux</td>
                  <td>{pct(psPer)}</td>
                  <td>{eur(impotGainsPS)}</td>
                </tr>
                <tr>
                  <td>Total estimé</td>
                  <td></td>
                  <td>
                    {eur(totalPer)}, soit {pct(partTotalPer)} du capital
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Cette sortie unique concentre {euros(versementsDeduits)} de revenu imposable sur une
            seule année, ce qui peut faire monter le taux. Fractionner les retraits sur plusieurs
            années, lorsque le contrat le permet, est l'un des leviers présentés dans{" "}
            <a href="/guide/fiscalite-sortie-per">notre guide de la fiscalité de sortie du PER</a>.
            Pour la démarche de liquidation auprès de l'organisme, voir{" "}
            <a href="/guide/liquider-son-per-a-la-retraite-demarche">
              liquider son PER à la retraite
            </a>
            .
          </p>

          <h2 id="per-rente">Et une sortie en rente ?</h2>
          <p>
            Une rente issue de versements déduits d'un PER est imposée comme une rente viagère à
            titre gratuit (barème, après l'abattement applicable aux pensions), les prélèvements
            sociaux portant sur une fraction qui dépend de l'âge à la première échéance ; la part
            issue de versements non déduits suit le régime à titre onéreux (voir{" "}
            <a href="/guide/fiscalite-sortie-per">le guide de la fiscalité de sortie du PER</a>).
            Elle s'ajoute aux pensions dans la déclaration, et fait partie de votre revenu fiscal de
            référence. Une rente d'assurance-vie, elle, suit le régime de la rente viagère à titre
            onéreux (voir{" "}
            <a href="/guide/fiscalite-rente-viagere-titre-onereux">ce guide</a>). Dans les deux cas,
            l'organisme transmet les montants ; vérifiez la nature de la rente indiquée sur le
            document fiscal.
          </p>

          <h2 id="etapes">Démarche en étapes, de la demande à l'avis d'impôt</h2>
          <ol>
            <li>
              <strong>Simuler avant de demander.</strong> Demandez à l'assureur ou à l'organisme
              une simulation fiscale : part de gains, acompte et prélèvements attendus.
            </li>
            <li>
              <strong>Faire la demande de rachat ou de liquidation.</strong> Formulaire ou espace
              client, avec pièce d'identité et RIB.
            </li>
            <li>
              <strong>Conserver l'avis d'opération.</strong> Il détaille le montant brut, la part de
              gains, les prélèvements.
            </li>
            <li>
              <strong>Attendre l'IFU</strong> en début d'année suivante, puis le comparer à
              l'avis d'opération.
            </li>
            <li>
              <strong>Remplir la déclaration</strong> au printemps : vérifier les montants
              préremplis, corriger, décider de l'option pour le barème.
            </li>
            <li>
              <strong>Vérifier l'avis d'impôt</strong> en été : l'impôt définitif, l'acompte déduit,
              le solde à payer ou à recevoir.
            </li>
            <li>
              <strong>Archiver le dossier</strong> : IFU, avis d'opération, déclaration, avis
              d'impôt.
            </li>
          </ol>

          <h2 id="pieces">Quelles pièces conserver ?</h2>
          <p>
            Conservez l'avis d'opération de chaque rachat ou retrait, l'IFU, le relevé de situation
            avec le détail des primes versées (avant et depuis le {AV_RACHAT.datePivotPrimes}), la
            copie de votre déclaration et l'avis d'imposition. Pour un PER, ajoutez l'attestation
            fiscale qui ventile versements déduits, non déduits et gains, ainsi que les
            justificatifs de vos déductions antérieures. L'administration peut demander ces pièces
            plusieurs années après : gardez-les au moins tant que la reprise est possible, durée que
            précise l'administration fiscale.
          </p>

          <h2 id="checklist">Check-list</h2>
          <ul>
            <li>L'IFU de chaque établissement est reçu et comparé à l'avis d'opération.</li>
            <li>Les montants préremplis sont conformes ; les écarts sont corrigés.</li>
            <li>L'abattement annuel de {euros(abattementSeul)} ou {euros(abattementCouple)} n'est pas compté deux fois.</li>
            <li>Les rachats de tous les contrats de l'année sont additionnés.</li>
            <li>L'option pour le barème a été simulée sur l'ensemble de la déclaration.</li>
            <li>Les pièces sont archivées, avec la notice de l'année.</li>
          </ul>

          <h2 id="tableau">Option barème : quand ça vaut le coup, quand éviter</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>L'option pour le barème peut valoir le coup si…</th>
                  <th>Le taux forfaitaire est plutôt préférable si…</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>le foyer est non imposable ou faiblement imposé</td>
                  <td>la tranche marginale dépasse {pct(tauxIR)}</td>
                </tr>
                <tr>
                  <td>les revenus mobiliers de l'année sont faibles</td>
                  <td>d'autres revenus mobiliers ou plus-values importants sont à déclarer</td>
                </tr>
                <tr>
                  <td>la CSG déductible (une partie des prélèvements sociaux), réservée à l'option pour le barème, réduit le revenu imposable de l'année suivante</td>
                  <td>le revenu fiscal de référence est proche d'un seuil sensible</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Comparez les deux options sur l'ensemble de votre déclaration, par exemple en la simulant une première fois avec chaque choix avant de valider.
          </p>

          <h2 id="erreurs">Erreurs fréquentes</h2>
          <ul>
            <li>
              <strong>Croire que l'acompte est l'impôt final :</strong> après {duree} ans, il est
              calculé avant abattement et peut être restitué.
            </li>
            <li>
              <strong>Oublier de déclarer un rachat parce que l'abattement annule l'impôt :</strong>{" "}
              le rachat doit figurer dans la déclaration.
            </li>
            <li>
              <strong>Compter l'abattement par contrat :</strong> il est annuel et global.
            </li>
            <li>
              <strong>Cocher l'option barème sans simuler :</strong> elle est globale.
            </li>
            <li>
              <strong>Confondre versements déduits et gains pour un PER :</strong> ils n'ont pas le
              même régime.
            </li>
            <li>
              <strong>Ignorer l'effet sur le revenu fiscal de référence :</strong> les gains
              imposables y entrent et peuvent influer sur d'autres seuils.
            </li>
            <li>
              <strong>Ne pas conserver les pièces :</strong> en cas de contrôle, elles sont
              indispensables.
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Comment déclarer un rachat d'assurance-vie aux impôts ?</h3>
          <p>
            Vérifiez les montants préremplis à partir de l'IFU, corrigez-les si nécessaire, puis
            choisissez entre taux forfaitaire et barème. Les cases à utiliser sont précisées par la
            notice officielle de l'année.
          </p>

          <h3>Faut-il déclarer un rachat d'assurance-vie si les gains sont sous l'abattement ?</h3>
          <p>
            Oui. L'abattement de {euros(abattementSeul)} ou {euros(abattementCouple)} s'applique à
            l'impôt dû, pas à l'obligation de déclarer. Les prélèvements sociaux restent dus de
            toute façon.
          </p>

          <h3>Qu'est-ce que l'IFU et quand le reçoit-on ?</h3>
          <p>
            L'imprimé fiscal unique est le document par lequel l'établissement récapitule les
            revenus et opérations de l'année. Il est généralement disponible en début d'année
            suivante, avant la déclaration de revenus.
          </p>

          <h3>Comment déclarer une sortie en capital d'un PER ?</h3>
          <p>
            L'organisme gestionnaire transmet la ventilation entre versements déduits, versements
            non déduits et gains. Vous vérifiez les montants préremplis, et les reportez dans les
            cases prévues par la notice si elles sont incomplètes.
          </p>

          <h3>Que faire si le montant prérempli est faux ?</h3>
          <p>
            Corrigez la case et conservez l'IFU ou l'avis d'opération comme justificatif. Si
            l'erreur vient de l'établissement, demandez-lui un IFU rectificatif.
          </p>

          <h3>Le taux de {pct(tauxIR)} est-il définitif ?</h3>
          <p>
            Non. C'est un acompte, ou un taux par défaut, que vous pouvez remplacer par le barème
            progressif en cochant l'option sur la déclaration. L'option vaut pour tous les revenus
            mobiliers de l'année.
          </p>

          <h3>Un contrat d'assurance-vie souscrit à l'étranger se déclare-t-il aussi ?</h3>
          <p>
            Oui, y compris pour un contrat souscrit auprès d'un assureur étranger, qui peut ne pas
            transmettre automatiquement les montants. Les obligations déclaratives sur les
            comptes et contrats détenus hors de France relèvent de formalités propres : voir la
            notice officielle ou un conseil fiscal.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Déclarer un rachat ou une sortie de PER est surtout une affaire de vérification : le
            fisc connaît les montants, vous restez responsable de leur exactitude et de l'option
            que vous cochez. Dans nos exemples, l'acompte est loin de l'impôt réellement dû ({eur(
              acompteApres8
            )} retenus pour {eur(irDu)} dus), et une sortie en capital de PER concentre en une année
            un impôt de {eur(totalPer)}.
          </p>
          <p>
            Pour préparer ces opérations, simulez avant de demander ; pour les décisions de fond,
            voir{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a> et{" "}
            <a href="/strategies/decumulation">la stratégie de décumulation</a>. Si vous voulez
            situer ces retraits dans votre trajectoire,{" "}
            <a href="/bilan-retraite">le bilan retraite gratuit de 15 minutes</a> permet de poser
            le cadre avant de signer.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li>
              <a href="/guide/rachat-partiel-assurance-vie-imposition">
                Rachat partiel d'assurance-vie : comment est-il imposé ?
              </a>
            </li>
            <li>
              <a href="/guide/fiscalite-sortie-per">Fiscalité de sortie du PER : capital ou rente ?</a>
            </li>
            <li>
              <a href="/guide/liquider-son-per-a-la-retraite-demarche">
                Liquider son PER à la retraite : la démarche
              </a>
            </li>
            <li>
              <a href="/guide/rachats-programmes-assurance-vie-retraite">
                Rachats programmés d'assurance-vie à la retraite
              </a>
            </li>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seuls vos
              documents fiscaux et la notice officielle de l'année font foi. Les règles et taux
              cités sont ceux en vigueur en novembre 2026 et peuvent évoluer. Les exemples chiffrés
              sont des illustrations pédagogiques sans lien avec un cas réel. Les supports en
              unités de compte d'un contrat d'assurance-vie ou d'un PER présentent un risque de perte
              en capital.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Un retrait se déclare en quelques cases. Il se prépare bien avant." />
    </>
  );
}
