import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  AGIRC_ARRCO_EXEMPLES,
  ENRICH_AVPER_NOV2026,
  EPARGNE_RETRAITE_EXEMPLES,
  PER_PLAFOND,
  PER_PLAFOND_EXEMPLES,
  PREPARER_RETRAITE_50_ANS,
  REGIME_GENERAL,
  RETRAITE_PROGRESSIVE_CUMUL,
  euros,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const X = EPARGNE_RETRAITE_EXEMPLES;
const P = PREPARER_RETRAITE_50_ANS;
const G = REGIME_GENERAL;
const AGE = X.agesActuels[2]; // 50 ans
const AGE_AUTRE = X.agesActuels[1]; // 40 ans, pour comparaison
const ageDepart = X.ageDepart;
const anneesRestantes = ageDepart - AGE;
const duree = X.dureeRetraiteAnnees;
const rendements = X.rendementsEpargneNets;
const rdMed = rendements[Math.floor(rendements.length / 2)];
const rdNet = X.rendementDecaissementNet;
const inflation = X.inflationAnnuelle;
const complements = X.complementsMensuelsCibles;
const complementRef = complements[Math.floor(complements.length / 2)];
const TRIMESTRES = AGIRC_ARRCO_EXEMPLES.dureeCarriereAnnees * 4;
const A = RETRAITE_PROGRESSIVE_CUMUL.ageLegalParGeneration;
const ageLegalRecent = A[A.length - 1].age;
const MOIS = 12; // mois par an (constante de calendrier)

// Taux réel = (1 + taux nominal) / (1 + inflation) − 1, en fraction.
const reel = (nominalPct) => (1 + nominalPct / 100) / (1 + inflation / 100) - 1;
const annuite = (r, n) => (r === 0 ? n : (1 - (1 + r) ** -n) / r);
const valeurAcquise = (r, n) => (r === 0 ? n : ((1 + r) ** n - 1) / r);
const capitalCible = (complementMensuel) =>
  complementMensuel * MOIS * annuite(reel(rdNet), duree);
const epargneMensuelle = (capital, age, depart, rendementNetPct) => {
  const n = (depart - age) * MOIS;
  const rm = (1 + reel(rendementNetPct)) ** (1 / MOIS) - 1;
  return capital / valeurAcquise(rm, n);
};
const effort = (age, depart, rd) => epargneMensuelle(capitalCible(complementRef), age, depart, rd);

// ---- Décote potentielle : trimestres manquants × taux par trimestre, plafonnée ----
const decote = (manquants) => Math.min(manquants, G.decotePlafondTrimestres) * G.decoteParTrimestre;

// ---- Plafond PER avec reports (profil B de PER_PLAFOND_EXEMPLES) ----
const B = PER_PLAFOND_EXEMPLES.profilB;
const plafondAnnee = Math.max(
  (Math.min(B.salaireNetImposable2025, PER_PLAFOND.multiplePassMaximum * PER_PLAFOND.pass2025) *
    PER_PLAFOND.tauxRevenusActivite) / 100,
  (PER_PLAFOND.pass2025 * PER_PLAFOND.tauxPlancherPass) / 100,
);
const reports = B.nonUtilise2023 + B.nonUtilise2024 + B.nonUtilise2025;
const plafondTotal = plafondAnnee + reports;
const tmiB = ENRICH_AVPER_NOV2026.tmiProfilsPlafond.profilB;
const economie = (versement) => (versement * tmiB) / 100;

const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " %";
const fois = (n) => n.toLocaleString("fr-FR", { maximumFractionDigits: 1 });
const departRef = P.ageDepartScenarios[0];
const departTard = P.ageDepartScenarios[P.ageDepartScenarios.length - 1];

const sources = [
  {
    label: "Info Retraite — Relevé de situation individuelle, estimation indicative globale et simulateur de la retraite tous régimes",
    url: "https://www.info-retraite.fr",
  },
  {
    label: "L'Assurance retraite — Relevé de carrière, durée d'assurance, décote et surcote, versement pour la retraite",
    url: "https://www.lassuranceretraite.fr",
  },
  {
    label: "Agirc-Arrco — Retraite complémentaire : relevé de points et coefficients d'anticipation",
    url: "https://www.agirc-arrco.fr",
  },
  {
    label: "Service-Public.gouv.fr — Plan d'épargne retraite (PER) : plafond de déduction et reports",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34982",
  },
  {
    label: "Impots.gouv.fr — Déduction des versements sur un PER et fiscalité de l'épargne retraite",
    url: "https://www.impots.gouv.fr",
  },
  {
    label: "Autorité des marchés financiers (AMF) — Épargner et investir : horizon de placement et risques",
    url: "https://www.amf-france.org",
  },
];

export default function GuidePreparerRetraite50Ans() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide · Préparer sa retraite à mi-parcours</span>
          <h1>Préparer sa retraite à {AGE} ans : faire le point, rattraper, sécuriser</h1>
          <p className="sub">
            Bilan des trimestres, rattrapage, arbitrage sur l'âge de départ et prudence
            progressive : que faire avec environ {anneesRestantes} ans devant soi. Mis à jour en {P.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> à {AGE} ans, l'horizon se compte en dizaines de
              trimestres, plus en décennies : l'effort est plus lourd, mais plusieurs leviers
              restent ouverts. Dans notre illustration, viser {euros(complementRef)} de complément
              par mois à {departRef} ans suppose environ {euros(effort(AGE, departRef, rdMed))} d'épargne
              mensuelle, contre {euros(effort(AGE, departTard, rdMed))} en repoussant le départ à {departTard} ans. Entre les deux, on peut aussi
              agir sur les trimestres (rachat), sur le PER (plafond avec reports) et sur le
              niveau de risque. Ces chiffres sont des illustrations, pas des projections.
            </p>
          </div>

          <p>
            Cinquante ans : la retraite cesse d'être une abstraction. Les enfants quittent
            parfois la maison, les revenus sont souvent à leur sommet, et l'on réalise que le
            temps restant est limité. C'est un bon moment pour faire un vrai bilan, puis choisir
            entre trois grandes manières de combler un éventuel manque : épargner davantage,
            travailler un peu plus longtemps, ou accepter un niveau de vie plus modeste.
          </p>
          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel :
            Thomas, {AGE} ans, cadre, a connu quelques années de travail à l'étranger et un
            temps partiel. Il constate qu'il lui manque {P.trimestresManquantsRachat} trimestres à l'âge légal, et il n'a épargné que
            de façon irrégulière. Les étapes ci-dessous sont des pistes de réflexion, à examiner
            cas par cas.
          </p>
          <p>
            Cette page est distincte de <a href="/guide/preparer-sa-retraite-a-40-ans">celle sur la préparation à 40 ans</a> et
            du guide{" "}
            <a href="/guide/combien-epargner-par-mois-pour-la-retraite-selon-age">épargne mensuelle selon l'âge</a>{" "}
            : elle se concentre sur le rattrapage et la sécurisation. Pour la vue d'ensemble,
            voir <a href="/guide/preparer-sa-retraite-guide-complet">notre guide complet</a>.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#trimestres">Où en êtes-vous : le bilan des trimestres et de la pension</a></li>
              <li><a href="#decote">Que coûte un manque de trimestres ?</a></li>
              <li><a href="#rachat">Faut-il racheter des trimestres ?</a></li>
              <li><a href="#per">Le PER avec reports : un levier de rattrapage ?</a></li>
              <li><a href="#horizon">Quel arbitrage sur l'âge de départ et l'effort ?</a></li>
              <li><a href="#risque">Comment réduire le risque progressivement ?</a></li>
              <li><a href="#decumulation">Pourquoi anticiper la décumulation dès maintenant ?</a></li>
              <li><a href="#immo">Et l'immobilier, et la transmission ?</a></li>
              <li><a href="#erreurs">Quelles erreurs éviter à {AGE} ans ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#aller-plus-loin">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="trimestres">Où en êtes-vous : le bilan des trimestres et de la pension</h2>
          <p>
            Première démarche : récupérer son relevé de carrière et son estimation indicative
            globale sur Info Retraite. À {AGE} ans, il est encore temps de faire corriger des
            erreurs, de faire valider des périodes oubliées et de comprendre ce qui manquera au
            moment du départ. Notre guide sur{" "}
            <a href="/guide/verifier-releve-de-carriere-retraite">la vérification du relevé de carrière</a> détaille la méthode.
          </p>
          <p>
            Deux repères. Pour les générations nées à partir de 1969, l'âge légal est de {ageLegalRecent}{" "}
            dans la législation actuelle et la durée d'assurance requise pour le taux plein est de{" "}
            {TRIMESTRES} trimestres : ce sont des règles susceptibles d'évoluer. Si vous avez travaillé à
            temps plein sans interruption depuis la fin des études, la question se pose
            peu ; sinon, le relevé dira combien de trimestres pourraient manquer.
          </p>

          <h2 id="decote">Que coûte un manque de trimestres ?</h2>
          <p>
            Dans le régime général, la pension de base est minorée par une décote de{" "}
            {pct1(G.decoteParTrimestre)} par trimestre manquant, dans la limite de {G.decotePlafondTrimestres} trimestres.
            La décote est définitive. Elle s'efface si l'on attend l'âge de {G.ageTauxPleinAutomatique} ans, où le taux plein est
            accordé quelle que soit la durée d'assurance. Voici la décote potentielle sur la
            pension de base selon le nombre de trimestres manquants :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Trimestres manquants</th>
                  <th>Calcul</th>
                  <th>Minoration de la pension de base</th>
                </tr>
              </thead>
              <tbody>
                {P.trimestresManquantsGrille.map((n) => (
                  <tr key={n}>
                    <td>{n}</td>
                    <td>{Math.min(n, G.decotePlafondTrimestres)} × {pct1(G.decoteParTrimestre)}</td>
                    <td>{pct1(decote(n))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="note">
            <p>
              Le tableau ne concerne que la pension de base du régime général, selon la règle
              simplifiée (le calcul exact retient le plus favorable de deux décomptes, durée
              d'assurance et âge du taux plein). La retraite complémentaire Agirc-Arrco obéit à
              ses propres coefficients d'anticipation. Voir{" "}
              <a href="/guide/surcote-decote-retraite">la surcote et la décote</a>. Les fonctionnaires
              et les indépendants relèvent d'autres règles.
            </p>
          </div>

          <h2 id="rachat">Faut-il racheter des trimestres ?</h2>
          <p>
            Le versement pour la retraite, dit « rachat de trimestres », permet de racheter, sous
            conditions, jusqu'à {G.rachatTrimestresPlafond} trimestres, par exemple au titre d'années d'études ou d'années incomplètes. Dans
            l'exemple de Thomas, {P.trimestresManquantsRachat} trimestres manquent, soit {pct1(decote(P.trimestresManquantsRachat))} de
            décote potentielle sur la base. Racheter peut réduire ou supprimer cette décote,
            mais le coût est élevé et dépend de l'âge et des revenus. Il peut aussi être déductible
            sous conditions.
          </p>
          <p>
            L'intérêt n'est pas automatique : tout dépend du nombre de trimestres réellement utiles
            pour le taux plein, du coût et de l'alternative (partir plus tard, ou placer la même
            somme). Le raisonnement est détaillé dans{" "}
            <a href="/guide/combien-coute-rachat-trimestres-retraite">notre guide sur le coût du rachat de trimestres</a>.
            Mieux vaut obtenir un devis officiel avant toute décision.
          </p>

          <h2 id="per">Le PER avec reports : un levier de rattrapage ?</h2>
          <p>
            Le PER est souvent évoqué à cet âge, car la tranche marginale d'imposition est en
            général élevée. Le plafond de déduction de l'année est de {PER_PLAFOND.tauxRevenusActivite} % des
            revenus d'activité de l'année précédente (avec plancher et maximum), et les plafonds
            non utilisés des années précédentes peuvent être reportés ({PER_PLAFOND.reportAnneesPlafondsJusqua2025} ans pour
            ceux de 2023 à 2025, {PER_PLAFOND.reportAnneesPlafondsDepuis2026} ans à partir de 2026). Illustration pour un salarié aux
            revenus nets imposables de {euros(B.salaireNetImposable2025)}, avec des plafonds non
            utilisés sur trois ans :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Élément</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Plafond de l'année</td><td>{euros(plafondAnnee)}</td></tr>
                <tr><td>Reports (2023 + 2024 + 2025)</td><td>{euros(reports)}</td></tr>
                <tr><td>Capacité de versement déductible</td><td>{euros(plafondTotal)}</td></tr>
                <tr><td>Économie d'impôt si tout était versé (TMI de {tmiB} %)</td><td>{euros(economie(plafondTotal))}</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Cette capacité est théorique : il faut avoir la trésorerie, accepter le blocage
            jusqu'à la retraite, et se souvenir que la sortie en capital est imposée au barème pour
            la part correspondant aux versements. La déduction n'est plus possible à partir de{" "}
            {PER_PLAFOND.ageFinDeduction} ans. Les modalités sont dans{" "}
            <a href="/guide/plafond-per-versement-avant-31-decembre-2026">notre guide du plafond PER</a>, et{" "}
            <a href="/guide/per-ou-assurance-vie-selon-age-et-tmi">le choix entre PER et assurance-vie selon l'âge et la TMI</a>.
            Un versement lissé sur plusieurs années peut être plus pertinent qu'un versement massif.
          </p>

          <h2 id="horizon">Quel arbitrage sur l'âge de départ et l'effort ?</h2>
          <p>
            À {AGE} ans, trois variables s'ajustent les unes aux autres : le complément visé,
            l'effort d'épargne et l'âge de départ. Repousser le départ raccourcit la phase de
            décaissement, allonge celle d'épargne, et peut relever la pension (surcote, ou
            suppression de la décote). Pour un complément de {euros(complementRef)} par mois (capital de{" "}
            {euros(capitalCible(complementRef))}) :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Âge de départ</th>
                  <th>Années pour épargner</th>
                  {rendements.map((rd) => (
                    <th key={rd}>Épargne mensuelle à {pct1(rd)} net</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {P.ageDepartScenarios.map((d) => (
                  <tr key={d}>
                    <td>{d} ans</td>
                    <td>{d - AGE}</td>
                    {rendements.map((rd) => (
                      <td key={rd}>{euros(effort(AGE, d, rd))}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Dans cet exemple, partir à {departTard} ans au lieu de {departRef} ans réduit l'effort mensuel
            d'environ {fois((1 - effort(AGE, departTard, rdMed) / effort(AGE, departRef, rdMed)) * 100)} %
            à rendement médian, mais cela suppose d'être en état et en situation de travailler
            plus longtemps, ce qui n'est pas toujours le cas. À titre de comparaison, démarrer à{" "}
            {AGE_AUTRE} ans le même plan pour un départ à {departRef} ans aurait demandé environ{" "}
            {euros(effort(AGE_AUTRE, departRef, rdMed))} par mois. Des solutions
            intermédiaires existent : <a href="/guide/retraite-progressive-ou-cumul-emploi-retraite">retraite progressive ou cumul</a>,
            décrits aussi dans <a href="/guide/cumul-emploi-retraite-comment-ca-marche">notre guide du cumul emploi-retraite</a>.
          </p>

          <h2 id="risque">Comment réduire le risque progressivement ?</h2>
          <p>
            Plus la date de départ approche, moins un épargnant a le temps de se remettre d'une
            forte baisse des marchés, surtout s'il va bientôt commencer à retirer. Une piste est de
            réduire progressivement la part des supports exposés (actions) au profit de supports
            plus stables à mesure que l'on approche du départ, plutôt que de tout basculer à la
            dernière minute. C'est le principe de la gestion pilotée à horizon, dont les frais et
            les limites sont discutés dans{" "}
            <a href="/guide/gestion-pilotee-ou-gestion-libre">gestion pilotée ou libre</a>.
          </p>
          <p>
            Aucun niveau n'est « le bon » : il dépend de la tolérance au risque, de la part de
            l'épargne dans les ressources futures et de la présence d'autres revenus. Les supports
            en unités de compte comportent un risque de perte en capital, et une allocation prudente
            ne garantit pas non plus le résultat. Voir aussi{" "}
            <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">pourquoi une assurance-vie peut rapporter peu</a>.
          </p>

          <h2 id="decumulation">Pourquoi anticiper la décumulation dès maintenant ?</h2>
          <p>
            Préparer la retraite, ce n'est pas seulement épargner, c'est aussi savoir dans quel
            ordre et sous quelle forme on retirera. À {anneesRestantes} ans du départ, trois choix se
            préparent déjà : sortir du PER en rente ou en capital, répartir les retraits entre
            enveloppes pour limiter l'impôt, et décider si une partie des fonds sera convertie en
            rente. Voir <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a>,{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">rente ou retraits programmés</a> et{" "}
            <a href="/strategies/decumulation">notre stratégie de décumulation</a>.
          </p>

          <h2 id="immo">Et l'immobilier, et la transmission ?</h2>
          <p>
            L'immobilier peut compléter un plan, mais il demande de l'emprunter, de gérer et de
            supporter des risques propres ; notre <a href="/guide/immobilier-et-retraite-guide-complet">guide immobilier et retraite</a> en détaille
            les arbitrages, et nos sites partenaires <a href="https://www.immobilierpassif.com">immobilierpassif.com</a> et{" "}
            <a href="https://scpirentable.fr">scpirentable.fr</a> traitent la pierre-papier.
            Pour la transmission et la retraite en couple, voir{" "}
            <a href="/guide/epargne-retraite-en-couple-et-transmission">notre guide dédié</a> et{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">donation ou assurance-vie</a>.
          </p>

          <h2 id="erreurs">Quelles erreurs éviter à {AGE} ans ?</h2>
          <ul>
            <li><strong>Attendre un hypothétique « coup de rattrapage »</strong> : l'effort régulier reste plus fiable.</li>
            <li><strong>Racheter des trimestres sans devis ni calcul de rentabilité.</strong></li>
            <li><strong>Verser massivement sur un PER</strong> sans vérifier le blocage, la TMI à la sortie ni la trésorerie.</li>
            <li><strong>Prendre plus de risque pour « rattraper »</strong> : cela peut aggraver la situation en cas de baisse.</li>
            <li><strong>Ignorer l'impôt de la sortie</strong> et l'ordre de retrait.</li>
            <li><strong>Oublier le conjoint</strong> : réversion, transmission, contrats croisés.</li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Est-il trop tard pour préparer sa retraite à 50 ans ?</h3>
          <p>
            Non. Il reste du temps pour agir sur plusieurs leviers : trimestres, épargne, PER,
            âge de départ. L'effort est plus élevé qu'à 40 ans, mais un plan reste possible.
          </p>
          <h3>Combien épargner par mois à 50 ans pour la retraite ?</h3>
          <p>
            Dans notre illustration, environ {euros(effort(AGE, departRef, rdMed))} par mois pour
            {" "}{euros(complementRef)} de complément avec un départ à {departRef} ans et un rendement net
            supposé de {pct1(rdMed)}. Le montant varie fortement selon l'objectif et le rendement :
            voir <a href="/guide/combien-faut-il-epargner-pour-la-retraite">combien épargner pour la retraite</a>.
          </p>
          <h3>Peut-on racheter des trimestres à 50 ans ?</h3>
          <p>
            Oui, sous conditions et dans la limite de {G.rachatTrimestresPlafond} trimestres. Le coût
            est à calculer avec un devis : voir{" "}
            <a href="/guide/combien-coute-rachat-trimestres-retraite">le coût du rachat de trimestres</a>.
          </p>
          <h3>Quel plafond de versement sur un PER à 50 ans ?</h3>
          <p>
            Il dépend de vos revenus d'activité, avec un plancher et un maximum, et des plafonds
            non utilisés reportables. Dans notre illustration, la capacité atteint {euros(plafondTotal)}.
            Voir <a href="/guide/plafond-per-versement-avant-31-decembre-2026">le guide du plafond PER</a>.
          </p>
          <h3>Faut-il passer à des placements plus prudents à 50 ans ?</h3>
          <p>
            Pas forcément d'un coup : une réduction progressive du risque à l'approche du départ
            est une piste, à adapter à votre profil. Un placement prudent n'est pas non plus sans
            risque, notamment face à l'inflation.
          </p>
          <h3>Vaut-il mieux travailler plus longtemps ou épargner plus ?</h3>
          <p>
            Les deux réduisent le manque, de façon différente : travailler plus longtemps
            raccourcit la phase de retraite et peut majorer la pension, épargner plus demande un
            effort immédiat. Le choix dépend de la santé, de la pénibilité et des envies.
          </p>
          <h3>Que faire de l'épargne existante à 50 ans ?</h3>
          <p>
            La première démarche est de dresser l'inventaire des enveloppes, de leurs frais et de
            leur niveau de risque : voir <a href="/guide/meilleure-enveloppe-retraite">la comparaison des enveloppes</a>.
          </p>
          <h3>Un bilan patrimonial est-il utile à 50 ans ?</h3>
          <p>
            Il permet de regrouper trimestres, épargne, immobilier et fiscalité dans un même
            cadre. Notre <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> propose un premier tour d'horizon.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            À {AGE} ans, la préparation se joue sur trois fronts : connaître précisément ses
            trimestres, calibrer l'effort d'épargne selon l'âge de départ, et commencer à
            sécuriser. Dans notre illustration, l'effort mensuel recule d'environ{" "}
            {fois((1 - effort(AGE, departTard, rdMed) / effort(AGE, departRef, rdMed)) * 100)} % si l'on part à {departTard} ans
            plutôt qu'à {departRef} ans : l'âge de départ est le levier le plus puissant, mais pas toujours disponible.
          </p>
          <p>
            Aucune solution n'est universelle, et les rendements passés ne préjugent pas des
            rendements futurs. Pour un premier ordre de grandeur, utilisez notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a>.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/preparer-sa-retraite-guide-complet">Préparer sa retraite : le guide complet</a></li>
            <li><a href="/guide/preparer-sa-retraite-a-40-ans">Préparer sa retraite à 40 ans</a></li>
            <li><a href="/guide/age-de-depart-retraite-trimestres-duree-assurance">Âge de départ et durée d'assurance</a></li>
            <li><a href="/strategies/per">Notre stratégie PER</a></li>
            <li><a href="/strategies/decumulation">Notre stratégie de décumulation</a></li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources et références consultées en novembre 2026 :</p>
          <ul>
            {sources.map((src) => (
              <li key={src.label}>
                <a href={src.url} target="_blank" rel="noopener noreferrer">
                  {src.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les exemples
              chiffrés sont des illustrations pédagogiques établies sur des hypothèses affichées
              (complément visé, rendement, inflation, âge de départ, revenus), qui ne préjugent ni
              de votre situation ni des règles futures. Les rendements passés ne préjugent pas des
              rendements futurs ; les supports en unités de compte présentent un risque de perte en
              capital. Seuls vos caisses de retraite, votre établissement financier et un
              professionnel peuvent confirmer ce qui s'applique à votre cas.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="À 50 ans, un bilan des trimestres et un âge de départ réaliste valent mieux qu'un rattrapage hâtif." />
    </>
  );
}
