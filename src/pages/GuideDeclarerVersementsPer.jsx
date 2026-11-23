import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  FISCALITE,
  PER_PLAFOND,
  V3_PER_DECLARATION,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const maj = V3_PER_DECLARATION.maj;
const tmi = FISCALITE.tmiOptions[2]; // 30 % : TMI illustrative
const versement = V3_PER_DECLARATION.versementExemple;
const revenu = V3_PER_DECLARATION.revenuActiviteExemple;
const report = V3_PER_DECLARATION.plafondReportExemple;
const ageFin = PER_PLAFOND.ageFinDeduction;
const dureeReport = PER_PLAFOND.reportAnneesPlafondsDepuis2026;

const r2 = (n) => Math.round(n * 100) / 100;
const part = (base, taux) => r2((base * taux) / 100);

// Plancher et plafond maximal pour les versements de 2026 (PASS 2025)
const plancher = part(PER_PLAFOND.pass2025, PER_PLAFOND.tauxPlancherPass);
const plafondMax = part(PER_PLAFOND.pass2025 * PER_PLAFOND.multiplePassMaximum, PER_PLAFOND.tauxRevenusActivite);

// Plafond de l'année de l'exemple
const plafondAnnee = Math.min(Math.max(part(revenu, PER_PLAFOND.tauxRevenusActivite), plancher), plafondMax);

// Cas A : avec plafond reporté ; cas B : sans report
const dispoA = r2(plafondAnnee + report);
const deduitA = Math.min(versement, dispoA);
const economieA = part(deduitA, tmi);
const excedentA = r2(versement - deduitA);
const resteReportA = r2(dispoA - deduitA);
const deduitB = Math.min(versement, plafondAnnee);
const economieB = part(deduitB, tmi);
const excedentB = r2(versement - deduitB);

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : cotisations d'épargne retraite (déduction), fiche F14709",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14709",
  },
  {
    label: "Service-Public.gouv.fr — Plan d'épargne retraite (PER), fiche F34982",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34982",
  },
  {
    label: "impots.gouv.fr — Déclaration de revenus et notice de la déclaration 2042",
    url: "https://www.impots.gouv.fr/formulaire/2042/declaration-des-revenus",
  },
  {
    label: "impots.gouv.fr — Espace particulier : se connecter, déclarer, consulter son avis",
    url: "https://www.impots.gouv.fr/particulier",
  },
  {
    label: "Légifrance — Code général des impôts, article 163 quatervicies (déduction des versements sur un PER)",
    url: "https://www.legifrance.gouv.fr",
  },
];

export default function GuideDeclarerVersementsPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · PER et impôts</span>
          <h1>Déclarer ses versements PER aux impôts : case 6NS et plafond</h1>
          <p className="sub">
            Où reporter ses versements, comment lire son plafond sur l'avis d'impôt, que faire
            des versements d'employeur et de l'option de non-déduction. Mis à jour en {maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> un versement volontaire sur un PER ne réduit votre
              impôt que si vous le reportez dans la déclaration de revenus de l'année du
              versement, dans la case prévue pour les cotisations d'épargne retraite (souvent
              citée sous le nom « case 6NS » pour le déclarant ; la numérotation est à vérifier
              chaque année sur la notice de impots.gouv.fr). La déduction est limitée par votre
              plafond, qui figure sur votre avis d'impôt. Exemple illustratif : {euros(versement)}{" "}
              versés avec un plafond de {euros(plafondAnnee)} et {euros(report)} de plafond
              reporté sont déduits en totalité, soit environ {euros(economieA)} d'impôt en
              moins à la TMI de {pct(tmi)}.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#principe">Comment déclarer un versement sur un PER ?</a></li>
              <li><a href="#etapes">Que faire, étape par étape, au moment de la déclaration ?</a></li>
              <li><a href="#plafond">Comment lire son plafond sur l'avis d'impôt ?</a></li>
              <li><a href="#exemple">Quelle économie d'impôt ? Un exemple chiffré</a></li>
              <li><a href="#employeur">Et les versements faits par l'employeur ?</a></li>
              <li><a href="#non-deduction">Peut-on renoncer à la déduction ?</a></li>
              <li><a href="#pieces">Quelles pièces conserver, et combien de temps ?</a></li>
              <li><a href="#pieges">Quels pièges éviter ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Il arrive que l'on verse sur un PER en décembre, pour réduire son impôt, puis qu'on
            découvre à l'avis d'imposition d'août que rien n'a bougé. La déduction n'est pas
            automatique : elle suppose un report, dans la bonne case, d'un montant que l'on ne
            connaît pas toujours à l'euro près. Ce guide décrit le geste, puis les points sur
            lesquels on se trompe le plus.
          </p>
          <p>
            Prenons un profil illustratif, sans lien avec un cas réel : un salarié imposé dans la
            tranche à {pct(tmi)}, qui a versé {euros(versement)} sur son PER pendant l'année et
            hésite entre reporter la totalité ou seulement ce que son plafond semble autoriser.
            Pour calculer le plafond lui-même et connaître les échéances, voyez{" "}
            <a href="/guide/plafond-per-versement-avant-31-decembre-2026">
              notre guide sur le plafond de déduction
            </a>
            ; ici, on s'intéresse à la déclaration.
          </p>

          <h2 id="principe">Comment déclarer un versement sur un PER ?</h2>
          <p>
            Les versements volontaires effectués sur un PER pendant l'année sont déclarés au
            printemps de l'année suivante, dans la déclaration de revenus (formulaire 2042),
            dans les cases consacrées aux cotisations d'épargne retraite. Pour un salarié, la
            case du déclarant est couramment désignée « 6NS », celles du conjoint ou partenaire
            de Pacs et d'une personne à charge suivant la même série ; d'autres cases existent
            pour d'autres situations (indépendants, plafonds mutualisés). La numérotation évolue
            : fiez-vous toujours à la notice de la déclaration disponible sur impots.gouv.fr.
          </p>
          <p>
            Le montant à reporter est celui des versements volontaires de l'année, tel qu'il
            figure sur l'attestation fiscale envoyée par votre organisme au début de l'année. Le
            montant effectivement déduit est ensuite plafonné par l'administration.
          </p>

          <h2 id="etapes">Que faire, étape par étape, au moment de la déclaration ?</h2>
          <ol>
            <li>
              <strong>Réunir l'attestation fiscale</strong> de votre PER (versements de l'année
              civile précédente, par compartiment).
            </li>
            <li>
              <strong>Ouvrir la déclaration en ligne</strong> et chercher la rubrique des
              cotisations d'épargne retraite ; l'assistant en ligne guide vers la bonne case.
            </li>
            <li>
              <strong>Vérifier le plafond affiché</strong> : il est en principe pré-renseigné,
              d'après votre avis d'impôt de l'année précédente.
            </li>
            <li>
              <strong>Reporter le montant versé</strong> dans la case du déclarant, puis celle du
              conjoint ou de la personne à charge si elle a aussi versé.
            </li>
            <li>
              <strong>Choisir, si besoin, la mutualisation du plafond</strong> entre conjoints ou
              partenaires soumis à imposition commune.
            </li>
            <li>
              <strong>Valider la simulation</strong> : l'économie d'impôt apparaît dans le
              résultat avant l'envoi.
            </li>
            <li>
              <strong>Archiver la déclaration et l'attestation</strong>, puis vérifier la
              cohérence avec l'avis d'impôt reçu à l'été.
            </li>
          </ol>

          <h2 id="plafond">Comment lire son plafond sur l'avis d'impôt ?</h2>
          <p>
            Votre avis d'impôt mentionne votre plafond d'épargne retraite pour l'année suivante,
            ainsi que la part de plafond non utilisée des années précédentes, reportable
            pendant {dureeReport} ans pour les plafonds à partir de 2026 (trois ans pour ceux de
            2023 à 2025). Le plafond de l'année est égal à 10 % de vos revenus d'activité nets de
            frais de l'année précédente, avec un plancher de {euros(plancher)} et un plafond de{" "}
            {euros(plafondMax)} pour les versements de 2026. À partir de {ageFin} ans, les
            versements volontaires ne sont plus déductibles.
          </p>
          <ul>
            <li>
              <strong>Plafond de l'année</strong> : il s'impute en premier.
            </li>
            <li>
              <strong>Plafonds non utilisés</strong> : ils s'imputent ensuite, en commençant par
              les plus anciens.
            </li>
            <li>
              <strong>Plafond du conjoint</strong> : mutualisable sur option si vous êtes soumis
              à imposition commune.
            </li>
            <li>
              <strong>Cotisations de l'employeur</strong> : elles peuvent réduire votre plafond ;
              voir plus bas.
            </li>
          </ul>

          <h2 id="exemple">Quelle économie d'impôt ? Un exemple chiffré</h2>
          <div className="note">
            <p>
              Exemple illustratif, composite pédagogique : un salarié a perçu {euros(revenu)} de
              revenus d'activité nets de frais l'année précédente et verse {euros(versement)}. Sa
              TMI est supposée à {pct(tmi)}. Le plafond de l'année est de 10 % de ses revenus
              (soit {euros(part(revenu, PER_PLAFOND.tauxRevenusActivite))}), et {euros(plancher)}
              {" "}au minimum ; il est de {euros(plafondAnnee)}.
            </p>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Poste</th>
                  <th>Avec {euros(report)} de plafond reporté</th>
                  <th>Sans plafond reporté</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Versement de l'année</td>
                  <td>{euros(versement)}</td>
                  <td>{euros(versement)}</td>
                </tr>
                <tr>
                  <td>Plafond disponible</td>
                  <td>{euros(plafondAnnee)} + {euros(report)} = {euros(dispoA)}</td>
                  <td>{euros(plafondAnnee)}</td>
                </tr>
                <tr>
                  <td>Montant déduit</td>
                  <td>{euros(deduitA)}</td>
                  <td>{euros(deduitB)}</td>
                </tr>
                <tr>
                  <td>Économie d'impôt à {pct(tmi)}</td>
                  <td>{euros(economieA)}</td>
                  <td>{euros(economieB)}</td>
                </tr>
                <tr>
                  <td>Versement non déductible</td>
                  <td>{euros(excedentA)}</td>
                  <td>{euros(excedentB)}</td>
                </tr>
                <tr>
                  <td>Plafond restant pour les années suivantes</td>
                  <td>{euros(resteReportA)}</td>
                  <td>0 €</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Dans le second cas, {euros(excedentB)} ont été versés sans déduction : ils ne
            seront donc pas imposés à la sortie, à condition de pouvoir justifier qu'ils n'ont
            pas été déduits (seuls leurs gains le seront), mais ils n'ont
            rien rapporté à l'entrée. Ce calcul est une simplification : la TMI réelle dépend de
            l'ensemble de votre foyer et l'économie ne vaut que si le versement fait baisser la
            tranche marginale. À la sortie, les sommes déduites seront imposées : voir{" "}
            <a href="/guide/fiscalite-sortie-per">la fiscalité de la sortie</a>.
          </p>

          <h2 id="employeur">Et les versements faits par l'employeur ?</h2>
          <p>
            Les versements d'un employeur (abondement sur un PER d'entreprise, cotisations
            obligatoires) ne se déclarent pas comme vos versements volontaires : ils sont
            traités par l'entreprise et ne donnent pas lieu à une déduction de votre part. Ils
            peuvent en revanche réduire votre plafond de déduction. Les sommes de participation
            et d'intéressement affectées au compartiment d'épargne salariale ne sont pas
            déductibles non plus : elles sont déjà exonérées d'impôt sur le revenu à l'entrée. La situation est détaillée dans votre fiche de paie, votre
            attestation d'épargne salariale et votre avis d'impôt ; en cas de doute, demandez
            une attestation à l'établissement teneur du plan.
          </p>

          <h2 id="non-deduction">Peut-on renoncer à la déduction ?</h2>
          <p>
            Oui : vous pouvez ne pas déduire un versement, par exemple si votre TMI actuelle est
            basse ou nulle. Dans ce cas, la part de capital correspondante n'est pas imposée à la
            sortie ; seuls les gains le sont. L'option doit être exercée auprès de l'organisme
            au plus tard lors du versement, et elle est irrévocable (Code monétaire et
            financier, art. L. 224-20) : à défaut, le versement relève du régime déductible. Le
            versement non déduit n'est alors pas reporté dans la case de la déclaration.
            Conservez les pièces prouvant la nature non déduite des versements jusqu'à la
            liquidation.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Plutôt déduire</th>
                  <th>Plutôt renoncer à la déduction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TMI actuelle plus élevée que celle attendue à la retraite</td>
                  <td>TMI actuelle nulle ou basse</td>
                </tr>
                <tr>
                  <td>Plafond disponible suffisant</td>
                  <td>Plafond déjà épuisé ou versement exceptionnel</td>
                </tr>
                <tr>
                  <td>Besoin de réduire l'impôt de l'année</td>
                  <td>Souhait de sortir plus tard sans imposer le capital</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="pieces">Quelles pièces conserver, et combien de temps ?</h2>
          <ul>
            <li>L'attestation fiscale annuelle de versements, remise par l'organisme.</li>
            <li>Les relevés de compte et avis de virement des versements.</li>
            <li>La copie de la déclaration de revenus et de l'avis d'impôt correspondant.</li>
            <li>
              Le justificatif de l'option de non-déduction, le cas échéant : conservez-le
              jusqu'à la sortie, car il fonde le régime fiscal de la liquidation.
            </li>
          </ul>
          <p>
            Pour la déduction elle-même, l'administration peut revenir sur une déclaration
            pendant plusieurs années ; gardez les pièces au moins le temps du délai de
            reprise, soit trois ans en général. Pour les versements non déduits, conservez-les
            beaucoup plus longtemps.
          </p>

          <h2 id="pieges">Quels pièges éviter ?</h2>
          <ul>
            <li>
              <strong>Verser sans déclarer</strong> : sans report dans la bonne case, l'économie
              d'impôt n'a pas lieu, et l'administration ne le corrige pas toujours d'office.
            </li>
            <li>
              <strong>Reporter plus que le plafond</strong> : l'excédent est refusé, ce qui peut
              générer une rectification.
            </li>
            <li>
              <strong>Se tromper de case</strong> (déclarant, conjoint, personne à charge) ou de
              ligne (versements volontaires contre épargne salariale).
            </li>
            <li>
              <strong>Oublier l'effet sur le revenu fiscal de référence</strong>, qui conditionne
              d'autres avantages ; la déduction le réduit, sa remise en cause l'augmente.
            </li>
            <li>
              <strong>Ne pas garder la preuve d'un versement non déduit</strong>, avec le risque
              de le voir imposer deux fois à la sortie.
            </li>
            <li>
              <strong>Compter sur le versement de décembre</strong> : c'est la date d'encaissement
              qui détermine l'année de déduction.
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Dans quelle case déclarer ses versements PER ?</h3>
          <p>
            Dans les cases des cotisations d'épargne retraite de la déclaration 2042, souvent
            citées sous le nom « 6NS » pour le déclarant. La numérotation étant révisée, vérifiez
            la notice officielle de l'année.
          </p>

          <h3>Que mettre dans la case 6NS ?</h3>
          <p>
            Le montant des versements volontaires de l'année sur votre PER, tel qu'il figure sur
            l'attestation fiscale de votre organisme. L'administration le plafonne ensuite.
          </p>

          <h3>Où trouver mon plafond de déduction PER ?</h3>
          <p>
            Sur votre dernier avis d'impôt, qui indique le plafond de l'année et les plafonds non
            utilisés encore reportables. Il est généralement pré-renseigné dans la déclaration
            en ligne.
          </p>

          <h3>Que se passe-t-il si je dépasse mon plafond ?</h3>
          <p>
            L'excédent n'est pas déductible. Dans l'exemple de ce guide, {euros(excedentB)} sont
            non déductibles lorsque le plafond de {euros(plafondAnnee)} est dépassé et qu'aucun
            report n'est disponible.
          </p>

          <h3>Les versements de mon employeur se déclarent-ils ?</h3>
          <p>
            Non, pas comme des versements volontaires. Ils peuvent réduire votre plafond ; leur
            traitement figure sur votre attestation d'épargne salariale.
          </p>

          <h3>Peut-on déclarer un versement PER après la date limite ?</h3>
          <p>
            Il est possible de corriger une déclaration déjà envoyée, sur le site des impôts,
            dans les délais prévus. Au-delà, une réclamation reste possible dans le cadre du
            délai de réclamation ; renseignez-vous auprès de l'administration.
          </p>

          <h3>Comment renoncer à la déduction d'un versement PER ?</h3>
          <p>
            En exerçant l'option de non-déduction auprès de votre organisme au plus tard au
            moment du versement (elle est irrévocable), puis en ne reportant pas ce versement
            dans la déclaration. Les versements non déduits ne seront pas imposés à la sortie,
            seuls leurs gains le seront. Conservez les justificatifs.
          </p>

          <h3>Combien de temps garder les justificatifs ?</h3>
          <p>
            Au moins trois ans pour les versements déduits, et jusqu'à la liquidation du plan
            pour ceux qui ne l'ont pas été.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La déclaration d'un versement sur un PER tient en quelques minutes, mais elle conditionne
            toute l'économie d'impôt : sans report, aucune déduction. Les erreurs ne se jouent
            pas sur le calcul, mais sur le plafond, la case et la preuve conservée. Dans l'exemple,
            la différence entre un plafond reporté et son absence est de{" "}
            {euros(r2(economieA - economieB))} d'impôt pour un même versement de {euros(versement)}.
          </p>
          <p>
            Pour poursuivre : si vous préparez la suite, le{" "}
            <a href="/guide/ouvrir-un-per-etapes-documents-delais">guide d'ouverture</a> et celui
            sur la{" "}
            <a href="/guide/liquider-son-per-a-la-retraite-demarche">liquidation à la retraite</a>{" "}
            complètent la démarche ; une fois la sortie venue, le{" "}
            <a href="/guide/declarer-rachat-assurance-vie-sortie-per">guide sur la déclaration d'un rachat ou d'une sortie de PER</a>{" "}
            prend le relais. La <a href="/strategies/per">page stratégie PER</a> donne la vue
            d'ensemble, et le <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a>{" "}
            aide à situer ces versements dans votre plan global.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/plafond-per-versement-avant-31-decembre-2026">Plafond PER et versement avant le 31 décembre</a></li>
            <li><a href="/guide/fiscalite-sortie-per">Fiscalité de la sortie du PER</a></li>
            <li><a href="/guide/per-ou-assurance-vie-selon-age-et-tmi">PER ou assurance-vie selon l'âge et la TMI</a></li>
            <li><a href="/simulateur-retraite">Simulateur de retraite</a></li>
            <li><a href="/guide/preparer-sa-retraite-guide-complet">Préparer sa retraite : le guide complet</a></li>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seuls
              votre avis d'impôt, la notice officielle de la déclaration et votre organisme font
              foi, cas par cas. La numérotation des cases et les règles de plafond sont celles
              connues en {maj} ; elles peuvent évoluer avec les lois de finances. Les exemples
              chiffrés sont des illustrations composites, sans promesse de rendement ni
              d'économie garantie. Les supports en unités de compte présentent un risque de perte
              en capital, et les performances passées ne préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Une déduction se déclare. Une stratégie d'épargne retraite se construit." />
    </>
  );
}
