import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  CAPITAL_COMPLEMENT,
  DECUMULATION,
  RENDEMENTS,
  RETRAIT_CAPITAL,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const K = CAPITAL_COMPLEMENT;
const taux = DECUMULATION.tauxConversionRente65; // { min, defaut, max } en %
const rendement = DECUMULATION.rendementCapitalPendantRetraits; // % par an
const inflation = RENDEMENTS.inflationLongTerme.moyen; // % par an
const regle4 = RETRAIT_CAPITAL.tauxRegle4Pct;
const duree = K.dureeRetraiteAnnees;
const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + " %";

// ---- Écart à combler ----
const ecartMensuel = (revenuCible) => Math.max(revenuCible - K.pensionMensuelleNette, 0);
const ecartAnnuel = (revenuCible) => ecartMensuel(revenuCible) * 12;

// ---- Méthode 1 : capital pour une rente viagère (rente = capital × taux / 100) ----
const capitalRente = (revenuCible, tauxConversion) =>
  (ecartAnnuel(revenuCible) * 100) / tauxConversion;

// ---- Méthode 2 : règle des 4 % (capital = écart annuel / taux) ----
const capitalRegle4 = (revenuCible) => (ecartAnnuel(revenuCible) * 100) / regle4;

// ---- Méthode 3 : amortissement sur la durée, retraits annuels en fin d'année ----
// Valeur actuelle d'une annuité constante : A × (1 − (1 + r)^−n) / r
const capitalAmortissement = (revenuCible) => {
  const r = rendement / 100;
  return (ecartAnnuel(revenuCible) * (1 - Math.pow(1 + r, -duree))) / r;
};

// ---- Effet de l'inflation : écart indexé chaque année, annuité croissante ----
// Valeur actuelle : A × (1 − ((1 + g)/(1 + r))^n) / (r − g)
const capitalAmortissementIndexe = (revenuCible) => {
  const r = rendement / 100;
  const g = inflation / 100;
  return (ecartAnnuel(revenuCible) * (1 - Math.pow((1 + g) / (1 + r), duree))) / (r - g);
};
const pouvoirAchat = (montant, annees) => montant / Math.pow(1 + inflation / 100, annees);
const horizonsInflation = [10, 20, duree];

const COMPLEMENT_FAQ = 500; // € par mois, exemple de la FAQ
const e = ecartMensuel(K.revenuCibleMensuelNet);
const ea = ecartAnnuel(K.revenuCibleMensuelNet);
const rateMax = ecartMensuel(K.revenusCiblesGrille[K.revenusCiblesGrille.length - 1]);

const sources = [
  {
    label: "L'Assurance retraite — Relevé de carrière et estimation du montant de votre retraite",
    url: "https://www.lassuranceretraite.fr",
  },
  {
    label: "Info Retraite — Relevé de situation individuelle, estimation indicative globale et simulateur de la retraite tous régimes",
    url: "https://www.info-retraite.fr",
  },
  {
    label: "Agirc-Arrco — Retraite complémentaire : relevé de points et estimation",
    url: "https://www.agirc-arrco.fr",
  },
  {
    label: "INSEE — Espérance de vie à 65 ans, statistiques démographiques",
    url: "https://www.insee.fr",
  },
  {
    label: "Autorité des marchés financiers (AMF) — Épargner et investir : risques et horizon de placement",
    url: "https://www.amf-france.org",
  },
  {
    label: "Service-Public.gouv.fr — Retraite, rubrique Travail et retraite",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits",
  },
  {
    label: "W. Bengen, « Determining Withdrawal Rates Using Historical Data », Journal of Financial Planning, octobre 1994 (origine de la « règle des 4 % »)",
  },
];

export default function GuideCapitalCompleterPension() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Décumulation · capital à constituer</span>
          <h1>Retraite à {K.ageDepart} ans : de quel capital a-t-on besoin pour compléter sa pension ?</h1>
          <p className="sub">
            Trois méthodes de calcul, trois ordres de grandeur : comment passer d'un écart de
            revenu mensuel à un capital cible. Mis à jour le {K.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le capital nécessaire dépend d'abord de l'écart
              entre le revenu visé et la pension. Dans notre exemple, {euros(K.revenuCibleMensuelNet)}{" "}
              visés pour {euros(K.pensionMensuelleNette)} de pension, soit {euros(e)} à trouver
              par mois. Selon la méthode, il faut de l'ordre de {euros(capitalAmortissement(K.revenuCibleMensuelNet))}{" "}
              (capital consommé sur {duree} ans) à {euros(capitalRente(K.revenuCibleMensuelNet, taux.min))}{" "}
              (rente viagère à taux de conversion bas). Ces écarts ne sont pas des erreurs : chaque
              méthode répond à une question différente.
            </p>
          </div>

          <p>
            « De combien ai-je besoin pour vivre correctement à la retraite ? » La question se pose
            en général à quelques années du départ, quand le relevé de carrière donne enfin un
            ordre de grandeur de la pension. Et la réponse n'est jamais un chiffre unique : elle
            dépend de ce que l'on attend du capital, un revenu à vie, un revenu pendant un nombre
            d'années donné, ou la préservation d'un patrimoine.
          </p>
          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel :
            Marc, {K.ageDepart} ans, vise {euros(K.revenuCibleMensuelNet)} nets par mois. Son
            estimation de pension, tous régimes confondus, s'élève à {euros(K.pensionMensuelleNette)}{" "}
            nets par mois. L'écart de {euros(e)} par mois doit venir de son épargne. Cet article
            montre comment le convertir en capital, selon trois approches, et pourquoi les
            résultats diffèrent.
          </p>
          <p>
            Pour approfondir le choix entre revenu garanti à vie et retraits, voir{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">notre comparaison</a> ; pour le
            détail de la règle des {regle4} % et de ses limites,{" "}
            <a href="/guide/combien-retirer-par-mois-capital-retraite">
              notre guide sur le montant à retirer chaque mois
            </a>
            .
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#ecart">Quel est l'écart à combler entre revenu visé et pension ?</a></li>
              <li><a href="#methode-rente">De quel capital a-t-on besoin pour une rente viagère ?</a></li>
              <li><a href="#methode-4">Que donne la règle des 4 % appliquée à l'écart ?</a></li>
              <li><a href="#methode-amortissement">Et si l'on consomme le capital sur la durée de la retraite ?</a></li>
              <li><a href="#comparaison">Que retenir de ces trois méthodes ?</a></li>
              <li><a href="#grille">Quel capital selon le revenu visé ?</a></li>
              <li><a href="#inflation">Comment l'inflation change-t-elle le calcul ?</a></li>
              <li><a href="#pension">D'où vient le montant de la pension ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="ecart">Quel est l'écart à combler entre revenu visé et pension ?</h2>
          <p>
            Le point de départ est une soustraction : écart mensuel = revenu mensuel visé − pension
            mensuelle estimée. Dans l'exemple : {euros(K.revenuCibleMensuelNet)} −{" "}
            {euros(K.pensionMensuelleNette)} = <strong>{euros(e)}</strong> par mois, soit{" "}
            <strong>{euros(ea)}</strong> par an. Les deux montants doivent être comparés dans la même
            unité (ici, des montants nets) et au même horizon.
          </p>
          <p>
            Ce chiffre est le seul qui compte pour la suite : le capital sert à financer l'écart,
            pas le revenu total. Une pension plus élevée de 100 € par mois réduit mécaniquement le
            capital à constituer, ce qui explique l'intérêt de vérifier ses droits avant de
            raisonner épargne.
          </p>
          <div className="note">
            <p>
              Hypothèses de l'exemple : revenu visé de {euros(K.revenuCibleMensuelNet)}, pension de{" "}
              {euros(K.pensionMensuelleNette)}, départ à {K.ageDepart} ans, horizon de {duree} ans
              pour la méthode par amortissement. Ces montants sont illustratifs et ne s'appliquent
              à aucun cas réel. Les calculs ignorent la fiscalité des retraits, les frais, et la
              revalorisation de la pension.
            </p>
          </div>

          <h2 id="methode-rente">De quel capital a-t-on besoin pour une rente viagère ?</h2>
          <p>
            Première approche : convertir le capital en rente viagère, c'est-à-dire en revenu
            versé à vie par un assureur. Le montant de la rente est égal au capital multiplié par un
            taux de conversion, qui dépend de l'âge, des tables de mortalité, des taux d'intérêt et
            des options choisies (réversion, par exemple). À {K.ageDepart} ans, les barèmes
            observés se situent dans une fourchette indicative de {pct1(taux.min)} à {pct1(taux.max)}{" "}
            du capital par an, sans option de réversion.
          </p>
          <p>
            On en déduit le capital nécessaire : capital = écart annuel × 100 ÷ taux de
            conversion. Avec un écart de {euros(ea)} par an :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Taux de conversion à {K.ageDepart} ans</th>
                  <th>Calcul</th>
                  <th>Capital nécessaire</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Bas", taux.min],
                  ["Intermédiaire", taux.defaut],
                  ["Haut", taux.max],
                ].map(([nom, t]) => (
                  <tr key={nom}>
                    <td>{nom} : {pct1(t)}</td>
                    <td>{euros(ea)} × 100 ÷ {pct1(t).replace(" %", "")}</td>
                    <td>{euros(capitalRente(K.revenuCibleMensuelNet, t))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Cette méthode couvre le risque de longévité : la rente est versée aussi longtemps que
            l'on vit. Elle a une contrepartie : le capital converti n'est plus disponible, et une
            rente non indexée perd du pouvoir d'achat. Ces points sont détaillés dans{" "}
            <a href="/guide/inconvenients-rente-viagere">les inconvénients de la rente viagère</a>.
            Les taux ci-dessus sont des ordres de grandeur ; seuls les barèmes des assureurs
            fournissent des chiffres engageants.
          </p>

          <h2 id="methode-4">Que donne la règle des 4 % appliquée à l'écart ?</h2>
          <p>
            Deuxième approche : garder le capital investi et retirer chaque année un pourcentage
            donné. Avec la règle des {regle4} %, issue d'études américaines (Bengen, 1994), le
            capital se calcule ainsi : écart annuel ÷ {pct1(regle4)}. Ici : {euros(ea)} ÷{" "}
            {pct1(regle4)} = <strong>{euros(capitalRegle4(K.revenuCibleMensuelNet))}</strong>.
          </p>
          <p>
            On retrouve la logique inverse du tableau des taux : un taux de retrait plus bas exige
            plus de capital. Mais cette règle est un repère, non une garantie : elle suppose une
            allocation diversifiée, un horizon d'environ {RETRAIT_CAPITAL.horizonRegleAnnees} ans et
            ne tient compte ni de la fiscalité ni du risque de séquence des rendements. Notre guide
            sur{" "}
            <a href="/guide/combien-retirer-par-mois-capital-retraite">
              le montant à retirer chaque mois d'un capital
            </a>{" "}
            détaille ces limites.
          </p>

          <h2 id="methode-amortissement">Et si l'on consomme le capital sur la durée de la retraite ?</h2>
          <p>
            Troisième approche : accepter de consommer le capital sur un nombre d'années donné.
            C'est le calcul de l'amortissement d'un emprunt à l'envers : on cherche la somme dont
            les retraits annuels, augmentés des intérêts de la partie non encore retirée, s'éteignent
            exactement au bout de {duree} ans. Avec un rendement d'hypothèse de {pct1(rendement)} par
            an et des retraits versés en fin d'année :
          </p>
          <p>
            capital = écart annuel × (1 − (1 + r)<sup>−n</sup>) ÷ r, avec r = {pct1(rendement)} et
            n = {duree}, soit ici <strong>{euros(capitalAmortissement(K.revenuCibleMensuelNet))}</strong>.
          </p>
          <p>
            C'est le montant le plus faible des trois, parce que le capital s'épuise à la fin de
            l'horizon choisi. Si l'on vit plus longtemps, ou si le rendement réel est inférieur à
            l'hypothèse, il n'y a plus rien. À {K.ageDepart} ans, l'INSEE indique une espérance de
            vie d'environ {DECUMULATION.esperanceVie65.hommes} ans pour les hommes et{" "}
            {DECUMULATION.esperanceVie65.femmes} ans pour les femmes : ce sont des moyennes, et une
            partie des retraités dépasse largement l'horizon de {duree} ans retenu ici.
          </p>
          <div className="note">
            <p>
              Le rendement de {pct1(rendement)} est une hypothèse d'illustration (capital resté investi
              de façon prudente), pas une prévision ni une performance passée. Un rendement plus
              faible augmente le capital nécessaire ; un rendement plus fort le réduit, avec un
              risque de perte en capital sur les supports non garantis.
            </p>
          </div>

          <h2 id="comparaison">Que retenir de ces trois méthodes ?</h2>
          <p>
            Les trois méthodes ne mesurent pas la même chose. Pour le même écart de {euros(e)} par
            mois :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Méthode</th>
                  <th>Capital nécessaire</th>
                  <th>Ce que le capital finance</th>
                  <th>Point de vigilance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rente viagère, taux {pct1(taux.defaut)}</td>
                  <td>{euros(capitalRente(K.revenuCibleMensuelNet, taux.defaut))}</td>
                  <td>Un revenu à vie, quelle que soit la durée de vie</td>
                  <td>Capital non récupérable ; rente souvent non indexée</td>
                </tr>
                <tr>
                  <td>Règle des {regle4} %</td>
                  <td>{euros(capitalRegle4(K.revenuCibleMensuelNet))}</td>
                  <td>Un revenu indexé, capital resté en grande partie investi</td>
                  <td>Repère issu d'études américaines ; risque de marché</td>
                </tr>
                <tr>
                  <td>Amortissement sur {duree} ans</td>
                  <td>{euros(capitalAmortissement(K.revenuCibleMensuelNet))}</td>
                  <td>Un revenu pendant {duree} ans, capital épuisé à l'issue</td>
                  <td>Aucun filet au-delà de l'horizon choisi</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Le choix revient à arbitrer entre sécurité, transmission et capital mobilisé. Plus le
            capital préservé est important (règle des {regle4} %), plus il faut en mettre de côté ;
            plus on accepte de l'entamer, moins il en faut, mais plus on s'expose à l'épuiser. En
            pratique, beaucoup de situations combinent ces approches, par exemple une rente pour
            les dépenses courantes et un capital investi pour le reste : voir{" "}
            <a href="/strategies/decumulation">notre page sur la décumulation</a>.
          </p>

          <h2 id="grille">Quel capital selon le revenu visé ?</h2>
          <p>
            Le tableau applique les trois méthodes à plusieurs revenus visés, avec la même pension de{" "}
            {euros(K.pensionMensuelleNette)} par mois. La rente est calculée avec le taux
            intermédiaire de {pct1(taux.defaut)}.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Revenu mensuel visé</th>
                  <th>Écart mensuel</th>
                  <th>Rente viagère ({pct1(taux.defaut)})</th>
                  <th>Règle des {regle4} %</th>
                  <th>Amortissement sur {duree} ans</th>
                </tr>
              </thead>
              <tbody>
                {K.revenusCiblesGrille.map((revenu) => (
                  <tr key={revenu}>
                    <td>{euros(revenu)}</td>
                    <td>{euros(ecartMensuel(revenu))}</td>
                    <td>{euros(capitalRente(revenu, taux.defaut))}</td>
                    <td>{euros(capitalRegle4(revenu))}</td>
                    <td>{euros(capitalAmortissement(revenu))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Le capital croît proportionnellement à l'écart : passer d'un écart de {euros(ecartMensuel(K.revenusCiblesGrille[0]))}{" "}
            à {euros(rateMax)} par mois multiplie le capital nécessaire par{" "}
            {(rateMax / ecartMensuel(K.revenusCiblesGrille[0])).toLocaleString("fr-FR", { maximumFractionDigits: 1 })},
            quelle que soit la méthode. Chaque tranche de revenu supplémentaire a un coût en capital
            qu'il vaut mieux mesurer avant de fixer l'objectif.
          </p>

          <h2 id="inflation">Comment l'inflation change-t-elle le calcul ?</h2>
          <p>
            Les calculs précédents supposent un écart constant en euros. Or les prix évoluent. Avec
            une inflation d'hypothèse de {pct1(inflation)} par an (objectif de la Banque centrale
            européenne), un revenu complémentaire de {euros(e)} par mois a le pouvoir d'achat suivant
            en euros d'aujourd'hui :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Au bout de</th>
                  <th>Pouvoir d'achat de {euros(e)} par mois</th>
                  <th>Perte de pouvoir d'achat</th>
                </tr>
              </thead>
              <tbody>
                {horizonsInflation.map((n) => (
                  <tr key={n}>
                    <td>{n} ans</td>
                    <td>{euros(pouvoirAchat(e, n))}</td>
                    <td>{pct1((1 - pouvoirAchat(e, n) / e) * 100)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Maintenir le pouvoir d'achat suppose d'augmenter l'écart chaque année. En reprenant la
            méthode par amortissement avec un écart revalorisé de {pct1(inflation)} par an, le
            capital nécessaire passe de {euros(capitalAmortissement(K.revenuCibleMensuelNet))} à{" "}
            <strong>{euros(capitalAmortissementIndexe(K.revenuCibleMensuelNet))}</strong>, soit{" "}
            {euros(capitalAmortissementIndexe(K.revenuCibleMensuelNet) - capitalAmortissement(K.revenuCibleMensuelNet))}{" "}
            de plus. La pension de base est en principe revalorisée, ce qui compense en partie la
            hausse des prix ; la règle de revalorisation des pensions complémentaires est fixée
            par l'Agirc-Arrco, et celle des rentes viagères par le contrat. Ces règles sont à
            vérifier. Le calcul présenté est un cas simple, qui n'intègre pas non plus la
            fiscalité.
          </p>

          <h2 id="pension">D'où vient le montant de la pension ?</h2>
          <p>
            Tout ce qui précède repose sur un chiffre que le capital ne peut pas déterminer : la
            pension. Elle vient des caisses de retraite, régime de base et complémentaire, et se
            lit sur votre relevé de carrière et vos estimations officielles, pas sur un simulateur
            d'épargne. Une erreur de 200 € par mois sur la pension déplace le capital cible de
            plusieurs dizaines de milliers d'euros.
          </p>
          <p>
            Avant de calculer un capital, mieux vaut donc{" "}
            <a href="/guide/verifier-releve-de-carriere-retraite">vérifier son relevé de carrière</a>,
            repérer les trimestres manquants et comprendre l'effet d'un départ plus ou moins tôt :
            voir <a href="/guide/surcote-decote-retraite">la surcote et la décote</a>, et le
            fonctionnement de{" "}
            <a href="/guide/retraite-complementaire-agirc-arrco-cadres-calcul">
              la retraite complémentaire Agirc-Arrco
            </a>
            . Les montants de l'exemple (pension de {euros(K.pensionMensuelleNette)}) sont fictifs.
          </p>
          <p>
            Une fois l'écart connu, le capital peut provenir de plusieurs enveloppes :{" "}
            <a href="/strategies/per">PER</a>,{" "}
            <a href="/strategies/assurance-vie-retraite">assurance-vie</a> ou{" "}
            <a href="/strategies/pea-retraite">PEA</a>. L'ordre dans lequel on les mobilise pèse
            sur le revenu net : voir{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a>.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>De quel capital ai-je besoin pour avoir 500 € de plus par mois à la retraite ?</h3>
          <p>
            Pour un complément de 500 € par mois, soit {euros(COMPLEMENT_FAQ * 12)} par an, il faut le diviser par le
            taux retenu : avec la règle des {regle4} %, {euros((COMPLEMENT_FAQ * 12 * 100) / regle4)} ; avec une
            rente viagère au taux de {pct1(taux.defaut)}, {euros((COMPLEMENT_FAQ * 12 * 100) / taux.defaut)}. Ces
            chiffres sont des ordres de grandeur, avant fiscalité.
          </p>
          <h3>Quel capital pour compléter une pension de 1 800 € à la retraite ?</h3>
          <p>
            La pension seule ne détermine pas le capital : il faut connaître le revenu visé. Avec
            une pension de {euros(K.pensionMensuelleNette)} et un revenu visé de{" "}
            {euros(K.revenuCibleMensuelNet)}, l'écart est de {euros(e)} par mois et le capital va de{" "}
            {euros(capitalAmortissement(K.revenuCibleMensuelNet))} à{" "}
            {euros(capitalRente(K.revenuCibleMensuelNet, taux.min))} selon la méthode.
          </p>
          <h3>Quel revenu faut-il pour vivre correctement à la retraite ?</h3>
          <p>
            Il n'existe pas de montant type : le niveau de vie souhaité, le logement (propriétaire
            ou locataire), la santé et la situation familiale changent tout. Mieux vaut partir de
            ses dépenses réelles que d'un pourcentage du dernier salaire.
          </p>
          <h3>Vaut-il mieux une rente ou garder son capital ?</h3>
          <p>
            Cela dépend de ce que l'on cherche à couvrir : la rente protège de la longévité mais
            immobilise le capital ; garder le capital préserve la souplesse et la transmission mais
            expose aux marchés. Voir{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">
              la comparaison entre rente et retraits programmés
            </a>
            .
          </p>
          <h3>Le capital doit-il durer jusqu'à quel âge ?</h3>
          <p>
            L'horizon de planification est un choix. Notre exemple retient {duree} ans, soit jusqu'à{" "}
            {K.ageDepart + duree} ans. L'espérance de vie moyenne à {K.ageDepart} ans est inférieure,
            mais une partie des retraités vivra plus longtemps : un horizon trop court est le
            risque principal de la méthode par amortissement.
          </p>
          <h3>Pourquoi les trois méthodes donnent-elles des résultats si différents ?</h3>
          <p>
            Parce qu'elles répondent à des questions différentes : un revenu à vie sans capital
            restant, un revenu avec capital largement préservé, ou un revenu pendant un nombre
            d'années donné avec capital épuisé à la fin.
          </p>
          <h3>Ces calculs tiennent-ils compte des impôts ?</h3>
          <p>
            Non. Les montants sont bruts de fiscalité et de frais. L'imposition des retraits dépend
            de l'enveloppe : voir par exemple{" "}
            <a href="/guide/fiscalite-sortie-per">la fiscalité de sortie du PER</a> et{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">le rachat partiel d'assurance-vie</a>.
          </p>
          <h3>Peut-on cumuler un travail et une pension pour réduire le capital nécessaire ?</h3>
          <p>
            Oui, un revenu d'activité réduit l'écart à financer, sous réserve des règles propres au
            cumul emploi-retraite : voir{" "}
            <a href="/guide/cumul-emploi-retraite-comment-ca-marche">notre guide dédié</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Pour compléter une pension, le capital à constituer découle d'un écart de revenu, pas
            d'un montant « magique ». Sur le même écart de {euros(e)} par mois, nos trois méthodes
            donnent des capitaux allant d'environ {euros(capitalAmortissement(K.revenuCibleMensuelNet))} à{" "}
            {euros(capitalRente(K.revenuCibleMensuelNet, taux.min))} : la différence mesure ce que
            l'on demande au capital (durée, indexation, capital laissé à la fin).
          </p>
          <p>
            Trois réflexes éviteront les mauvaises surprises : partir d'une pension vérifiée auprès
            des caisses, choisir l'horizon et le degré de sécurité avant de choisir la formule, et
            tester le résultat avec une hypothèse de rendement prudente et de l'inflation.
          </p>
          <p>
            Pour obtenir un premier ordre de grandeur de votre propre pension et de l'écart avec
            votre revenu visé, utilisez notre <a href="/simulateur-retraite">simulateur de retraite</a>.
            Pour replacer ce capital dans l'ensemble de votre patrimoine, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> permet de poser le
            cadre, relevé de carrière en main.
          </p>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources et références consultées en {K.maj} :</p>
          <ul>
            {sources.map((src) => (
              <li key={src.label}>
                {src.url ? (
                  <a href={src.url} target="_blank" rel="noopener noreferrer">
                    {src.label}
                  </a>
                ) : (
                  src.label
                )}
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les exemples
              chiffrés sont des illustrations pédagogiques établies sur des hypothèses affichées
              (revenu visé, pension, rendement, inflation, taux de conversion), qui ne préjugent ni
              de votre situation ni des règles futures. Les rendements passés ne préjugent pas des
              rendements futurs ; les supports en unités de compte présentent un risque de perte en
              capital. Seuls vos caisses de retraite, votre assureur et un professionnel peuvent
              confirmer les montants applicables à votre cas.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Un capital cible se calcule à partir d'une pension vérifiée, pas d'un chiffre au hasard." />
    </>
  );
}
