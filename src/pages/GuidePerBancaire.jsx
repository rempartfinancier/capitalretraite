import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { SimulateurCapitalisation } from "../components/Simulateurs.jsx";
import {
  RENDEMENTS,
  FRAIS_TYPES,
  FISCALITE,
  ILLUSTRATIF,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

// Somme de deux pourcentages de frais, arrondie à une décimale (évite les
// artefacts de virgule flottante à l'affichage).
const sommeFrais = (a, b) => Math.round((a + b) * 10) / 10;

// Valeur future de versements annuels constants (en début d'année), à taux
// net constant — calcul purement illustratif, aucun rendement n'est linéaire.
const valeurFuture = (versementAnnuel, annees, tauxPct) => {
  const t = tauxPct / 100;
  if (t === 0) return versementAnnuel * annees;
  return versementAnnuel * ((Math.pow(1 + t, annees) - 1) / t) * (1 + t);
};

// Hypothèses de la simulation illustrative « épargne salariale vs PER
// individuel » (section frais) — explicites et recalculables.
const ILLU = {
  versementAnnuel: 5000,
  dureeAnnees: 20,
  tauxNetBas: 5,
  tauxNetHaut: RENDEMENTS.ucActionsLongTerme.max,
};

export default function GuidePerBancaire() {
  const tmi = FISCALITE.tmiOptions;
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Article phare</span>
          <h1>PER bancaire : frais, gestion à horizon, supports maison — ce qu'il faut vérifier</h1>
          <p className="sub">
            Un PER peut être fiscalement excellent et financièrement décevant. La déduction est la
            même partout ; le contenant, lui, change tout. Voici la grille de lecture pour auditer
            le vôtre.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> un PER bancaire (tenu en compte-titres, sans fonds en
              euros ni abattement successoral) n'est ni meilleur ni pire par nature qu'un PER
              assurantiel — mais il change les supports accessibles, la gestion par défaut et ce
              qui arrive au capital en cas de décès. Avant de vous fier à la seule déduction
              fiscale à l'entrée, vérifiez trois choses : la famille exacte de votre plan, les
              frais empilés sur chaque étage, et le mode de gestion appliqué par défaut (souvent
              une gestion pilotée à horizon que personne n'a explicitement choisie).
            </p>
          </div>
          <p>
            Le PER (Plan Épargne Retraite) — l'enveloppe créée en 2019 pour regrouper l'épargne
            retraite des Français — est devenu l'argument vedette des campagnes de défiscalisation
            de fin d'année. La promesse tient en une ligne : versez, déduisez, payez moins d'impôt.
            Elle est exacte. Et elle est très incomplète.
          </p>
          <p>
            Car deux PER identiques sur le papier fiscal peuvent produire, à effort d'épargne égal,
            des capitaux nettement différents à l'arrivée. La déduction est la même partout ; ce qui
            diffère, c'est le contenant : les frais, les supports accessibles, le mode de gestion
            appliqué par défaut, et le sort du capital en cas de décès. Juger un PER à sa seule
            déduction fiscale, c'est un peu choisir une voiture pour sa prime à l'achat sans jamais
            regarder sa consommation.
          </p>
          <p>
            Cet article vous donne la grille complète : les trois familles de PER, la gestion
            pilotée à horizon (le mode de gestion par défaut du PER, détaillé plus bas),
            l'empilement des frais — et la check-list pour auditer votre propre plan en un quart
            d'heure.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#per-en-deux-phrases">Comment fonctionne un PER, concrètement ?</a></li>
              <li><a href="#trois-familles">Tous les PER ne se valent pas : les trois familles</a></li>
              <li><a href="#gestion-pilotee">La gestion pilotée à horizon : le réglage par défaut</a></li>
              <li><a href="#empilement-frais">Quels sont les frais réels d'un PER bancaire ?</a></li>
              <li><a href="#strategie">PER et succession : que devient l'argent en cas de décès ?</a></li>
              <li><a href="#audit">Comment vérifier si mon PER est un bon contrat ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#conclusion">En conclusion</a></li>
            </ol>
          </div>

          <h2 id="per-en-deux-phrases">1. Comment fonctionne un PER, concrètement ?</h2>
          <p>
            Première phrase : le PER est une enveloppe bloquée jusqu'à la retraite (hors cas de
            déblocage anticipé prévus par la loi, dont l'achat de la résidence principale et les
            accidents de la vie), sur laquelle les versements volontaires sont déductibles de votre
            revenu imposable, dans la limite d'un plafond indiqué sur votre avis d'imposition.
          </p>
          <p>
            Deuxième phrase : cette déduction n'est pas un cadeau, c'est un report d'imposition —
            les sommes déduites à l'entrée seront réimposées à la sortie, au barème de l'impôt sur
            le revenu. L'économie immédiate dépend de votre TMI (tranche marginale d'imposition :
            le taux du barème qui s'applique à la dernière tranche de vos revenus —{" "}
            {tmi.slice(0, -1).join(", ")} ou {tmi[tmi.length - 1]} %, barème en vigueur en
            juillet 2026). Un discours répandu sur les réseaux résume l'opération à un « gain »
            égal à cette TMI. C'est exact l'année du versement ; c'est indémontrable sur la durée
            de vie du plan, puisque personne ne connaît ni ses revenus futurs, ni le barème fiscal
            qui s'appliquera dans quinze ou vingt ans.
          </p>
          <p>
            Notre analyse : le report n'en reste pas moins puissant, pour une raison que ce même
            discours mentionne rarement — l'impôt non payé aujourd'hui travaille pendant des
            décennies en intérêts composés (les gains produisent à leur tour des gains). Mais ce
            moteur ne tourne que si le contenant suit. Le fonctionnement complet de l'enveloppe
            (plafonds, cas de déblocage, modes de sortie) est détaillé dans{" "}
            <a href="/strategies/per">notre page dédiée au PER</a>, et la question du bon âge pour
            en ouvrir un a <a href="/guide/a-quel-age-commencer-per">sa réponse dédiée</a>.
          </p>

          <h2 id="trois-familles">2. Tous les PER ne se valent pas : les trois familles</h2>
          <p>
            Sous une étiquette unique, le marché vend en réalité trois véhicules différents. La
            différence n'est pas cosmétique : elle change les supports accessibles, les frais et —
            surtout — ce qui arrive au capital en cas de décès.
          </p>
          <p>
            Le <strong>PER assurantiel</strong> est souscrit auprès d'un assureur — c'est le cas de
            la majorité des PER individuels. Il donne accès au fonds en euros (le support dont le
            capital est garanti par l'assureur — garantie valable hors faillite de celui-ci — en
            contrepartie d'un rendement modeste : {pct(RENDEMENTS.fondsEuros.moyen)} en moyenne en{" "}
            {RENDEMENTS.fondsEuros.periode} — moyenne de marché France Assureurs / ACPR, nette de
            frais de gestion et avant prélèvements sociaux, les contributions prélevées sur les
            revenus du capital ; un constat passé, qui ne préjuge pas des taux futurs) et aux
            unités de compte (les
            supports investis en fonds, actions ou immobilier, dont le capital n'est pas garanti et
            fluctue à la hausse comme à la baisse). Surtout, il bénéficie d'un régime successoral
            proche de celui de l'assurance-vie : en cas de décès avant 70 ans, chaque bénéficiaire
            désigné profite d'un abattement de 152 500 € ; après 70 ans, l'abattement tombe à
            30 500 € pour l'ensemble des bénéficiaires (barèmes en vigueur en juillet 2026).
            Particularité souvent ignorée : sur un PER, c'est l'âge atteint au moment du décès qui
            détermine le régime applicable — pas la date des versements, comme en assurance-vie.
          </p>
          <p>
            Le <strong>PER bancaire</strong> est tenu par une banque ou un courtier sous forme de
            compte-titres (un compte qui détient directement des titres financiers). Pas de fonds
            en euros, mais souvent des frais plus bas et un large choix de titres. Contrepartie
            majeure : aucun abattement successoral spécifique — au décès, l'épargne intègre la
            succession et suit le barème des droits communs.
          </p>
          <p>
            Le <strong>PER d'entreprise collectif</strong> (successeur du PERCO, l'ancien plan
            d'épargne retraite mis en place par l'employeur) est celui dont vous héritez parfois
            sans l'avoir choisi. Son vrai atout est l'abondement (le versement complémentaire de
            l'employeur qui s'ajoute aux vôtres). Ses limites : une gamme souvent réduite à une
            poignée de fonds, et, dans la plupart des cas, une structure de type compte-titres —
            donc sans les abattements du PER assurantiel.
          </p>
          <p>
            Un doute sur la nature de votre plan ? Vérifiez simplement auprès de qui il est ouvert :
            un assureur ou une banque. Notre analyse : en cas de décès, cette différence de régime
            successoral peut peser bien plus lourd que quelques dixièmes de point de frais — c'est
            l'un des angles morts les plus fréquents des plans souscrits « pour l'impôt ».
          </p>

          <table>
            <thead>
              <tr>
                <th>Critère</th>
                <th>PER assurantiel</th>
                <th>PER bancaire (compte-titres)</th>
                <th>PER d'entreprise (ex-PERCO)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Souscrit auprès de</td>
                <td>Un assureur (souvent via un conseiller ou un courtier)</td>
                <td>Une banque ou un courtier</td>
                <td>L'employeur</td>
              </tr>
              <tr>
                <td>Fonds en euros</td>
                <td>Oui</td>
                <td>Non</td>
                <td>Rarement</td>
              </tr>
              <tr>
                <td>Choix de supports</td>
                <td>Large (unités de compte, parfois titres)</td>
                <td>Large (titres, fonds indiciels)</td>
                <td>Limité (souvent une poignée de fonds)</td>
              </tr>
              <tr>
                <td>Succession</td>
                <td>Abattements type assurance-vie (152 500 € par bénéficiaire avant 70 ans)</td>
                <td>Intègre la succession, sans abattement spécifique</td>
                <td>Intègre le plus souvent la succession</td>
              </tr>
              <tr>
                <td>Vigilance principale</td>
                <td>Frais très variables selon le distributeur</td>
                <td>Pas de protection successorale</td>
                <td>Frais et qualité des fonds proposés</td>
              </tr>
            </tbody>
          </table>

          <h2 id="gestion-pilotee">3. La gestion pilotée à horizon : le réglage par défaut que personne ne remet en question</h2>
          <p>
            Sauf choix explicite de votre part, la réglementation prévoit qu'un PER est investi en
            gestion pilotée à horizon : un mécanisme automatique qui répartit votre épargne selon
            une grille standard (prudente, équilibrée ou dynamique), puis la « désensibilise » à
            l'approche de la retraite — la part investie en actions diminue par paliers, au profit
            de supports prudents (fonds en euros, obligations). C'est le réglage d'usine de
            l'immense majorité des plans, et presque personne ne le questionne.
          </p>
          <p>
            Notre analyse rejoint ici un constat récurrent de nos audits : la gestion pilotée est
            une formule packagée. Une grille standard ne sait rien de vous — ni votre TMI, ni vos
            autres enveloppes (assurance-vie, PEA, immobilier), ni vos projets, ni la date réelle à
            laquelle vous toucherez à cet argent. Elle applique le même calendrier de sécurisation
            à un cadre de 52 ans qui détient par ailleurs trois contrats d'assurance-vie et à un
            épargnant dont le PER est l'unique actif. Elle ajoute sa propre couche de frais : un
            surcoût de mandat de l'ordre de {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à{" "}
            {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)} par an selon les contrats (ordre de
            grandeur révisé en {HYPOTHESES_MAJ}), auquel s'ajoutent les frais des fonds logés dans
            la grille. Et elle est rigide : impossible d'arbitrer (déplacer l'épargne d'un support
            vers un autre) de façon sélective — les mouvements suivent la grille, au prorata de
            tous les supports.
          </p>
          <div className="note">
            <p>
              Précision importante : réduire progressivement le risque à l'approche de la retraite
              est, en soi, une précaution défendable. Ce n'est pas la sécurisation qui pose
              question, c'est sa standardisation et son coût. Notre réserve porte sur la formule
              « par défaut, pour tout le monde, au même rythme » — pas sur le principe d'une
              désensibilisation réfléchie, qui se construit au cas par cas.
            </p>
          </div>

          <h2 id="empilement-frais">4. Quels sont les frais réels d'un PER bancaire ? L'empilement, et le cas de l'épargne salariale</h2>
          <p>
            Un PER peut facturer jusqu'à quatre étages de frais : sur chaque versement, sur
            l'encours (le total de votre épargne, via les frais de gestion annuels du contrat), à
            l'intérieur de chaque support (les frais courants du fonds, à lire dans son DIC —
            document d'informations clés, la fiche réglementaire de chaque fonds), et lors des
            arbitrages. Ordres de grandeur constatés sur les grilles tarifaires publiques, révisés
            en {HYPOTHESES_MAJ} et à vérifier contrat par contrat :
          </p>
          <ul>
            <li>
              <strong>PER de réseau traditionnel :</strong>{" "}
              {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.min)} à{" "}
              {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.max)} prélevés sur chaque
              versement, {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min)} à{" "}
              {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)} de gestion
              annuelle, {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min)} à{" "}
              {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)} de frais courants
              sur les fonds « maison », {pct(FRAIS_TYPES.contratBancaireTraditionnel.arbitrage.min)}{" "}
              à {pct(FRAIS_TYPES.contratBancaireTraditionnel.arbitrage.max)} par arbitrage — soit
              fréquemment{" "}
              {pct(
                sommeFrais(
                  FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min,
                  FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min
                )
              )}{" "}
              à{" "}
              {pct(
                sommeFrais(
                  FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max,
                  FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max
                )
              )}{" "}
              par an sur l'encours, avant même les frais d'entrée.
            </li>
            <li>
              <strong>PER individuel en ligne compétitif :</strong>{" "}
              {pct(FRAIS_TYPES.contratInternet.entree.min)} sur les versements,{" "}
              {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.min)} à{" "}
              {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.max)} de gestion annuelle,{" "}
              {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} à{" "}
              {pct(FRAIS_TYPES.contratInternet.fraisSupports.max)} sur des supports indiciels
              (ETF : fonds cotés en bourse qui répliquent un indice à bas coût) — un total annuel
              de l'ordre de{" "}
              {pct(
                sommeFrais(
                  FRAIS_TYPES.contratInternet.gestionAnnuelle.min,
                  FRAIS_TYPES.contratInternet.fraisSupports.min
                )
              )}{" "}
              à{" "}
              {pct(
                sommeFrais(
                  FRAIS_TYPES.contratInternet.gestionAnnuelle.max,
                  FRAIS_TYPES.contratInternet.fraisSupports.max
                )
              )}
              .
            </li>
          </ul>
          <p>
            Précisons notre position, car elle n'est pas « zéro frais à tout prix » : ce qui compte
            est la performance nette de frais et de fiscalité, pas le niveau de frais pris
            isolément — des frais peuvent se justifier lorsqu'un véritable travail de stratégie
            patrimoniale est fourni en face. Ce qui ne se justifie pas, c'est l'empilement sans
            service : des frais de réseau, plus une gestion standardisée, plus des fonds maison
            chargés.
          </p>
          <p>
            Le cas le plus trompeur est celui de l'épargne salariale. Un PERCO paraît gratuit —
            les frais de tenue de compte sont souvent pris en charge par l'employeur — mais le coût
            se loge dans les fonds : sur les plans que nous auditons, les frais courants des fonds
            proposés atteignent fréquemment l'ordre de{" "}
            {pct(ILLUSTRATIF.fraisFondsEpargneSalariale)} par an (constat de terrain, à vérifier
            dans le DIC de vos propres supports), pour une gamme limitée à quelques choix.
            Simulation illustrative, à hypothèses explicites : 5 000 € versés chaque année pendant
            20 ans atteindraient environ{" "}
            {euros(valeurFuture(ILLU.versementAnnuel, ILLU.dureeAnnees, ILLU.tauxNetBas))} avec un
            rendement net de frais de {pct(ILLU.tauxNetBas)} par an, contre environ{" "}
            {euros(valeurFuture(ILLU.versementAnnuel, ILLU.dureeAnnees, ILLU.tauxNetHaut))} à{" "}
            {pct(ILLU.tauxNetHaut)} nets — soit{" "}
            {euros(
              valeurFuture(ILLU.versementAnnuel, ILLU.dureeAnnees, ILLU.tauxNetHaut) -
                valeurFuture(ILLU.versementAnnuel, ILLU.dureeAnnees, ILLU.tauxNetBas)
            )}{" "}
            d'écart. Ces deux taux sont des hypothèses purement illustratives : l'écart combine
            l'effet des frais et celui de supports plus performants, et un rendement net de{" "}
            {pct(ILLU.tauxNetHaut)} par an est une hypothèse haute, nullement garantie — les
            performances passées ne préjugent pas des performances futures. Mais l'ordre de
            grandeur est le message : sur vingt ans, le contenant peut peser davantage que
            l'avantage fiscal qui a motivé l'ouverture.
          </p>
          <div className="note">
            <p>
              À savoir : un PERCO/PER collectif peut être transféré vers un PER individuel tous les
              trois ans, même lorsque vous êtes toujours en poste. Les frais de transfert sont
              plafonnés à 1 % de l'encours si le plan a moins de cinq ans, et nuls au-delà (règles
              en vigueur en juillet 2026 — à vérifier avant toute opération). Une piste de
              réflexion fréquente en audit : ne verser sur le plan collectif que le montant qui
              déclenche l'abondement maximal de l'employeur — de l'argent qu'il serait dommage de
              laisser filer — et loger le reste de l'effort d'épargne ailleurs, sur un plan
              individuel mieux équipé.
            </p>
          </div>
          <p>
            Testez vos propres chiffres : le simulateur ci-dessous compare versements, capital brut
            et capital net estimé selon vos frais, votre TMI actuelle et votre TMI anticipée à la
            retraite.
          </p>

          <SimulateurCapitalisation enveloppe="per" />

          <p>
            Le même mécanisme d'empilement existe en assurance-vie — nous l'avons documenté dans{" "}
            <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">un article dédié</a>.
          </p>

          <h3>Les grands supports d'un PER en un tableau</h3>
          <table>
            <thead>
              <tr>
                <th>Support</th>
                <th>Nature</th>
                <th>Rendement indicatif, daté (non garanti)</th>
                <th>Risque sur le capital</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fonds en euros</td>
                <td>Capital garanti par l'assureur (hors faillite de celui-ci) — PER assurantiels uniquement</td>
                <td>
                  {pct(RENDEMENTS.fondsEuros.moyen)} en moyenne en {RENDEMENTS.fondsEuros.periode},
                  avant prélèvements sociaux
                </td>
                <td>Très faible sur le capital, mais rendement pouvant rester sous l'inflation</td>
              </tr>
              <tr>
                <td>Fonds obligataires</td>
                <td>Unité de compte investie en obligations</td>
                <td>
                  {pct(RENDEMENTS.fondsObligataires.min)} à {pct(RENDEMENTS.fondsObligataires.max)}{" "}
                  ({RENDEMENTS.fondsObligataires.periode})
                </td>
                <td>Modéré — capital non garanti</td>
              </tr>
              <tr>
                <td>Unités de compte actions (fonds, ETF)</td>
                <td>Actions cotées, en direct ou via fonds</td>
                <td>
                  {pct(RENDEMENTS.ucActionsLongTerme.min)} à {pct(RENDEMENTS.ucActionsLongTerme.max)}{" "}
                  par an ({RENDEMENTS.ucActionsLongTerme.periode}, avant frais)
                </td>
                <td>Élevé — fortes fluctuations, années négatives incluses</td>
              </tr>
              <tr>
                <td>Immobilier collectif (SCPI et assimilés)</td>
                <td>
                  Pierre-papier logée en unité de compte — notre analyse détaillée sur{" "}
                  <a href="https://scpirentable.fr" target="_blank" rel="noopener noreferrer">
                    scpirentable.fr
                  </a>
                </td>
                <td>
                  {pct(RENDEMENTS.scpi.min)} à {pct(RENDEMENTS.scpi.max)} de taux de distribution
                  en {RENDEMENTS.scpi.periode}
                </td>
                <td>Modéré à élevé — ni le revenu ni le capital ne sont garantis</td>
              </tr>
            </tbody>
          </table>
          <p>
            Rendements passés ou indicatifs, datés et non garantis : les performances passées ne
            préjugent pas des performances futures. Sources : France Assureurs / ACPR (fonds en
            euros, 2024), rendements à l'échéance des fonds obligataires investment grade euro
            (2024-2025), indices actions mondiaux type MSCI World (moyennes annualisées
            20-30 ans), ASPIM/IEIF (SCPI, 2024) — hypothèses du site révisées en {HYPOTHESES_MAJ}.
          </p>

          <h2 id="strategie">5. PER et succession : que devient l'argent en cas de décès ?</h2>
          <p>
            Un discours répandu range le PER dans la case « gadget fiscal » ; le discours inverse
            en fait l'enveloppe retraite ultime. Les deux ratent l'essentiel. Notre analyse,
            constante : le PER se juge comme un outil patrimonial global, et son atout le plus
            solide n'est pas la déduction — c'est la protection de la famille.
          </p>
          <p>
            En cas de décès avant la liquidation du plan (le moment où vous le débloquez), les
            sommes déduites à l'entrée ne sont jamais réintégrées à l'impôt sur le revenu :
            l'économie d'impôt devient alors définitive. Sur un PER assurantiel s'ajoutent les
            abattements successoraux vus plus haut et — point largement méconnu — l'absence de
            prélèvements sociaux sur les gains transmis, quel que soit l'âge au décès (règles en
            vigueur en juillet 2026).
          </p>
          <p>
            À l'autre bout, la sortie se prépare : capital ou rente viagère (un revenu versé à vie
            par l'assureur, en contrepartie de l'abandon définitif du capital), en une fois ou de
            façon fractionnée — les écarts de fiscalité sont substantiels et se calculent avant,
            pas après. Nous y consacrons{" "}
            <a href="/guide/fiscalite-sortie-per">un guide complet sur la fiscalité de sortie</a>,
            ainsi qu'un <a href="/guide/per-vs-assurance-vie-retraite">comparatif PER / assurance-vie</a>{" "}
            et une page sur <a href="/strategies/decumulation">l'ordre de décaissement des enveloppes</a>{" "}
            à la retraite. Le fil conducteur ne varie pas : les enveloppes sont complémentaires,
            jamais concurrentes, et il n'existe pas de bonne ou de mauvaise enveloppe dans l'absolu
            — seulement des stratégies cohérentes, ou non, avec une situation donnée.
          </p>

          <h2 id="audit">6. Comment vérifier si mon PER est un bon contrat ? La check-list en 15 minutes</h2>
          <ol>
            <li>
              <strong>Identifiez la famille de votre plan.</strong> Ouvert auprès d'un assureur :
              PER assurantiel, avec ses abattements successoraux. Auprès d'une banque ou d'un
              courtier en compte-titres : pas d'abattement. Via votre employeur : plan collectif,
              regardez d'abord l'abondement et les fonds proposés.
            </li>
            <li>
              <strong>Retrouvez les frais sur versement.</strong> Ils figurent dans les conditions
              générales et sur votre relevé annuel. Dans les réseaux, le conseiller dispose
              souvent d'une marge de négociation réelle sur ces frais — encore faut-il la
              demander. Des frais d'entrée jamais discutés sont un signal d'inertie, pas une
              fatalité.
            </li>
            <li>
              <strong>Vérifiez votre mode de gestion.</strong> Êtes-vous en gestion pilotée à
              horizon sans l'avoir choisie ? Quelle grille (prudente, équilibrée, dynamique) ? Quel
              surcoût de mandat ? La réponse figure sur votre relevé ou dans votre espace en ligne.
            </li>
            <li>
              <strong>Ouvrez le DIC de chaque support.</strong> La ligne « frais courants » de
              chaque fonds s'ajoute aux frais du contrat. Comparez-la aux fourchettes de la section
              précédente : c'est là que se cachent les écarts les plus coûteux.
            </li>
            <li>
              <strong>Relisez la clause bénéficiaire (PER assurantiel).</strong> C'est la clause
              qui désigne qui recevra le capital en cas de décès. Une clause standard jamais
              relue depuis l'ouverture peut être en décalage complet avec votre situation
              familiale actuelle.
            </li>
            <li>
              <strong>Recensez les plans oubliés.</strong> L'onglet « Mon épargne retraite » du
              site officiel{" "}
              <a href="https://www.info-retraite.fr" target="_blank" rel="noopener noreferrer">
                info-retraite.fr
              </a>{" "}
              liste les vieux PERCO et contrats d'anciens employeurs — il est fréquent d'y
              retrouver de l'épargne qui dort.
            </li>
          </ol>
          <p>
            Quinze minutes suffisent pour savoir si votre plan mérite d'être conservé tel quel,
            renégocié ou transféré. La décision, elle, se prend au regard de l'ensemble — fiscalité,
            succession, autres enveloppes — jamais sur un critère isolé.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Un PER bancaire est-il moins bon qu'un PER assurantiel ?</h3>
          <p>
            Ni meilleur ni moins bon par nature : il est différent. Le PER bancaire donne souvent
            accès à des frais plus bas et à un large choix de titres, mais il ne bénéficie
            d'aucun abattement successoral spécifique, contrairement au PER assurantiel. Le bon
            choix dépend de votre priorité : coût de gestion ou protection en cas de décès.
          </p>
          <h3>Comment savoir si mon PER est bancaire ou assurantiel ?</h3>
          <p>
            Regardez auprès de qui il est ouvert. Un contrat souscrit auprès d'un assureur, avec
            accès à un fonds en euros, est assurantiel. Un compte tenu par une banque ou un
            courtier, sous forme de compte-titres, sans fonds en euros, est bancaire.
          </p>
          <h3>Puis-je changer de gestion pilotée à horizon si je ne l'ai pas choisie ?</h3>
          <p>
            Oui, dans la plupart des contrats : vous pouvez généralement basculer vers une gestion
            libre ou choisir une autre grille de pilotage (prudente, équilibrée, dynamique) sur
            simple demande auprès de votre gestionnaire.
          </p>
          <h3>Que devient mon PER bancaire si je change d'établissement ?</h3>
          <p>
            Un PER se transfère d'un établissement à l'autre, y compris entre un PER bancaire et
            un PER assurantiel, moyennant des frais de transfert plafonnés par la loi et nuls
            au-delà de cinq ans de détention (règles en vigueur en {HYPOTHESES_MAJ}, à vérifier).
          </p>
          <h3>Un PER bancaire donne-t-il droit à la même déduction fiscale qu'un PER assurantiel ?</h3>
          <p>
            Oui. La déduction des versements volontaires du revenu imposable, dans la limite du
            plafond, s'applique de la même façon quelle que soit la famille de PER : c'est la
            partie la plus standardisée de l'enveloppe, identique partout.
          </p>
          <h3>Faut-il transférer un vieux PERCO vers un PER bancaire en ligne pour réduire les frais ?</h3>
          <p>
            Cela mérite d'être étudié, mais pas de façon automatique : vérifiez d'abord si un
            abondement de l'employeur est encore en jeu sur le plan collectif, et si un transfert
            vous ferait perdre un accès au fonds en euros dont vous auriez besoin. La réponse
            dépend de votre situation, pas d'une règle générale.
          </p>

          <h2 id="conclusion">7. En conclusion</h2>
          <p>
            <strong>Rappel :</strong> le PER est un outil sérieux, desservi par la façon dont on
            le vend. La déduction à l'entrée est réelle, mais c'est la partie la plus standardisée
            de l'enveloppe : tout ce qui fera la différence à l'arrivée — famille de plan, frais,
            supports, mode de gestion, clause bénéficiaire — se joue contrat par contrat.
          </p>
          <p>
            <strong>Coût de l'inaction :</strong> un PER bancaire ou assurantiel logé dans des
            fonds coûteux, jamais audité, peut coûter cher sur la durée sans qu'aucun relevé ne le
            signale explicitement. Reprenons l'ordre de grandeur calculé plus haut sur l'épargne
            salariale : à effort d'épargne identique ({euros(ILLU.versementAnnuel)} par an pendant{" "}
            {ILLU.dureeAnnees} ans), l'écart entre un rendement net de {pct(ILLU.tauxNetBas)} et un
            rendement net de {pct(ILLU.tauxNetHaut)} atteint environ{" "}
            {euros(
              valeurFuture(ILLU.versementAnnuel, ILLU.dureeAnnees, ILLU.tauxNetHaut) -
                valeurFuture(ILLU.versementAnnuel, ILLU.dureeAnnees, ILLU.tauxNetBas)
            )}{" "}
            — un ordre de grandeur illustratif, mais qui donne la mesure de ce qu'un contrat non
            vérifié peut faire perdre, sans qu'aucune décision explicite n'ait jamais été prise.
          </p>
          <p>
            <strong>Réintroduction du service :</strong> c'est précisément ce que la souscription
            « pour l'impôt » ne regarde jamais, et ce qu'un audit de quinze minutes suffit déjà à
            éclairer. Notre <a href="/bilan-retraite">bilan retraite gratuit</a> reprend avec vous
            la famille de votre plan, ses frais réels et son mode de gestion, sans engagement.
          </p>
          <p>
            <strong>Prochaine lecture priorisée :</strong> pour aller plus loin, notre guide{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a> détaille comment
            préparer la sortie en capital ou en rente, et notre comparatif{" "}
            <a href="/guide/per-vs-assurance-vie-retraite">PER ou assurance-vie</a> aide à
            arbitrer entre les deux enveloppes selon votre objectif.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation (TMI, patrimoine, objectifs, transmission) doit faire
              l'objet d'une étude individuelle. Les chiffres cités sont datés et révisés en{" "}
              {HYPOTHESES_MAJ} ; les hypothèses de rendement sont illustratives, et les
              performances passées ne préjugent pas des performances futures. Les unités de compte
              présentent un risque de perte en capital ; la garantie du fonds en euros est celle de
              l'assureur, hors faillite de celui-ci.
            </p>
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
