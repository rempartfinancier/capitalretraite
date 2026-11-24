import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  AGIRC_ARRCO_EXEMPLES,
  AV_RACHAT,
  ENRICH_EPPEA_EPARGNE,
  ENVELOPPES_NOV2026,
  EPARGNE_RETRAITE_EXEMPLES,
  FISCALITE,
  PER_PLAFOND,
  PER_PLAFOND_EXEMPLES,
  RETRAITE_PROGRESSIVE_CUMUL,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const X = EPARGNE_RETRAITE_EXEMPLES;
const AGE = X.agesActuels[1]; // âge de l'exemple : 40 ans
const AGE_COMPARAISON = X.agesActuels[2]; // départ tardif de l'illustration : 50 ans
const ageDepart = X.ageDepart;
const duree = X.dureeRetraiteAnnees;
const rendements = X.rendementsEpargneNets;
const rdMed = rendements[Math.floor(rendements.length / 2)];
const rdNet = X.rendementDecaissementNet;
const inflation = X.inflationAnnuelle;
const complements = X.complementsMensuelsCibles;
const complementRef = complements[Math.floor(complements.length / 2)];
const revenuRef = ENRICH_EPPEA_EPARGNE.revenuNetMensuelIllustratif;
const anneesRestantes = ageDepart - AGE;
const AV_ANS = AV_RACHAT.dureeTauxReduitAnnees;
const VERSEMENT = PER_PLAFOND_EXEMPLES.versementUnitaire;
const TRIMESTRES = AGIRC_ARRCO_EXEMPLES.dureeCarriereAnnees * 4;
const MOIS = 12; // mois par an (constante de calendrier)
const tmiImposables = FISCALITE.tmiOptions.filter((t) => t > 0);
const A = RETRAITE_PROGRESSIVE_CUMUL.ageLegalParGeneration;
const ageLegalRecent = A[A.length - 1].age; // génération 1969 et suivantes

// Taux réel = (1 + taux nominal) / (1 + inflation) − 1, en fraction.
const reel = (nominalPct) => (1 + nominalPct / 100) / (1 + inflation / 100) - 1;
const annuite = (r, n) => (r === 0 ? n : (1 - (1 + r) ** -n) / r);
const valeurAcquise = (r, n) => (r === 0 ? n : ((1 + r) ** n - 1) / r);
const capitalCible = (complementMensuel) =>
  complementMensuel * MOIS * annuite(reel(rdNet), duree);
const epargneMensuelle = (capital, age, rendementNetPct) => {
  const n = (ageDepart - age) * MOIS;
  const rm = (1 + reel(rendementNetPct)) ** (1 / MOIS) - 1;
  return capital / valeurAcquise(rm, n);
};
const effort = (complement, age, rd) => epargneMensuelle(capitalCible(complement), age, rd);
const partRevenu = (montant) => (montant / revenuRef) * 100;
const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + " %";
const fois = (n) => n.toLocaleString("fr-FR", { maximumFractionDigits: 1 });

const sources = [
  {
    label: "Info Retraite — Relevé de situation individuelle, estimation indicative globale et simulateur de la retraite tous régimes",
    url: "https://www.info-retraite.fr",
  },
  {
    label: "L'Assurance retraite — Relevé de carrière, âge légal et durée d'assurance",
    url: "https://www.lassuranceretraite.fr",
  },
  {
    label: "Agirc-Arrco — Retraite complémentaire : relevé de points",
    url: "https://www.agirc-arrco.fr",
  },
  {
    label: "Service-Public.gouv.fr — Plan d'épargne retraite (PER) et plafond de déduction",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34982",
  },
  {
    label: "Impots.gouv.fr — Épargne retraite, assurance-vie et PEA : fiscalité des particuliers",
    url: "https://www.impots.gouv.fr",
  },
  {
    label: "Autorité des marchés financiers (AMF) — Épargner et investir : horizon de placement et risques",
    url: "https://www.amf-france.org",
  },
];

export default function GuidePreparerRetraite40Ans() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide · Préparer sa retraite par étapes</span>
          <h1>Préparer sa retraite à {AGE} ans : un plan d'action en six étapes</h1>
          <p className="sub">
            Relevé de carrière, objectif de revenu, effort d'épargne, enveloppes, PER, PEA,
            assurance-vie et résidence principale : dans quel ordre s'y prendre, avec {anneesRestantes} ans
            d'horizon. Mis à jour en {X.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> à {AGE} ans, il reste de l'ordre de {anneesRestantes} ans
              avant un départ à {ageDepart} ans dans nos exemples : assez pour qu'un effort modéré
              suffise, à condition de le structurer. Pour viser {euros(complementRef)} par mois de
              complément, il faut dans notre illustration environ{" "}
              {euros(effort(complementRef, AGE, rdMed))} d'épargne mensuelle, soit{" "}
              {pct1(partRevenu(effort(complementRef, AGE, rdMed)))} d'un revenu net de{" "}
              {euros(revenuRef)}. Le même objectif demande environ{" "}
              {fois(effort(complementRef, AGE_COMPARAISON, rdMed) / effort(complementRef, AGE, rdMed))} fois
              plus d'effort si l'on démarre à {AGE_COMPARAISON} ans. Ces ordres de grandeur sont
              des illustrations, pas des projections.
            </p>
          </div>

          <p>
            À {AGE} ans, la retraite paraît encore lointaine et les priorités ne manquent pas :
            enfants, crédit, évolution de carrière. C'est pourtant à cet âge que les décisions ont
            le meilleur rapport entre effort et effet, parce que le temps joue pour vous et que les
            erreurs se corrigent encore. Mieux vaut un plan simple, tenu dans la durée, qu'un
            dispositif sophistiqué ouvert puis oublié.
          </p>
          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel :
            Claire, {AGE} ans, salariée du privé, n'a jamais regardé son relevé de carrière et
            épargne « quand il reste de l'argent ». Elle ne sait pas quel revenu elle pourra
            espérer ni quelle part elle devra financer elle-même. Cet article suit les étapes que
            nous lui proposerions comme piste de réflexion, sans qu'elles remplacent un conseil
            personnalisé.
          </p>
          <p>
            Ce guide est un plan d'action. Pour les montants d'épargne mensuelle selon l'âge, voir
            plutôt <a href="/guide/combien-epargner-par-mois-pour-la-retraite-selon-age">notre guide
            sur l'épargne mensuelle selon l'âge</a> ; pour la vue d'ensemble, voir{" "}
            <a href="/guide/preparer-sa-retraite-guide-complet">notre guide complet pour préparer sa retraite</a>.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#releve">Étape 1 : que dit réellement votre relevé de carrière ?</a></li>
              <li><a href="#objectif">Étape 2 : quel revenu viser, et quel capital cela représente-t-il ?</a></li>
              <li><a href="#effort">Étape 3 : quel effort d'épargne, et que coûte l'attente ?</a></li>
              <li><a href="#enveloppes">Étape 4 : quelles enveloppes choisir, et dans quel ordre ?</a></li>
              <li><a href="#per">Étape 5 : le PER vaut-il le coup selon votre TMI ?</a></li>
              <li><a href="#pea-av-rp">Étape 6 : quelle place pour le PEA, l'assurance-vie et la résidence principale ?</a></li>
              <li><a href="#horizon">Comment tenir un horizon de {anneesRestantes} ans ?</a></li>
              <li><a href="#erreurs">Quelles sont les erreurs fréquentes à {AGE} ans ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#aller-plus-loin">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="releve">Étape 1 : que dit réellement votre relevé de carrière ?</h2>
          <p>
            Avant tout calcul d'épargne, il faut connaître ses droits acquis. Le relevé de
            carrière, accessible gratuitement sur le portail Info Retraite, regroupe les trimestres
            validés dans chaque régime et les points de retraite complémentaire. À {AGE} ans, on
            y repère encore facilement les années oubliées : premiers emplois, stages, périodes
            de chômage ou d'activité à l'étranger.
          </p>
          <p>
            Deux repères à noter dès maintenant. L'âge légal de départ dépend de l'année de
            naissance : pour les générations nées à partir de 1969, il est de {ageLegalRecent}{" "}
            dans la législation actuelle. Et la durée d'assurance requise pour une retraite à taux
            plein est, pour ces générations, de {TRIMESTRES} trimestres. Ces règles peuvent évoluer d'ici
            votre départ : elles servent de base de travail, pas de certitude. La méthode de
            vérification est détaillée dans <a href="/guide/verifier-releve-de-carriere-retraite">notre guide sur
            le relevé de carrière</a>.
          </p>

          <h2 id="objectif">Étape 2 : quel revenu viser, et quel capital cela représente-t-il ?</h2>
          <p>
            Deuxième étape : fixer un objectif en euros par mois, et non en pourcentage abstrait.
            On part de ses dépenses réelles, on estime la pension grâce au simulateur officiel,
            puis on mesure l'écart. C'est cet écart que l'épargne doit financer. Notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> donne un premier ordre de
            grandeur ; le calcul détaillé de l'écart est expliqué dans{" "}
            <a href="/guide/capital-necessaire-completer-pension-retraite-65-ans">notre guide du capital à constituer</a>.
          </p>
          <p>
            Pour un complément mensuel donné (en euros d'aujourd'hui), le capital à réunir au
            départ dépend de la durée pendant laquelle on le consomme : nous retenons {duree} ans,
            un rendement net de {pct1(rdNet)} pendant les retraits et une inflation de {pct1(inflation)}.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Complément mensuel visé</th>
                  <th>Soit par an</th>
                  <th>Capital à réunir à {ageDepart} ans</th>
                </tr>
              </thead>
              <tbody>
                {complements.map((c) => (
                  <tr key={c}>
                    <td>{euros(c)}</td>
                    <td>{euros(c * MOIS)}</td>
                    <td>{euros(capitalCible(c))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="note">
            <p>
              Illustration avant fiscalité et avant frais, qui suppose que le capital est
              entièrement consommé au bout de {duree} ans. Un capital qui doit durer plus
              longtemps, ou être transmis, doit être plus élevé. Voir{" "}
              <a href="/guide/combien-retirer-par-mois-capital-retraite">le montant à retirer chaque mois d'un capital</a>.
            </p>
          </div>

          <h2 id="effort">Étape 3 : quel effort d'épargne, et que coûte l'attente ?</h2>
          <p>
            Reste à traduire le capital en effort mensuel. Avec {anneesRestantes} ans devant soi et un
            objectif de {euros(complementRef)} de complément par mois (capital de{" "}
            {euros(capitalCible(complementRef))}), voici l'épargne mensuelle correspondante selon
            trois rendements nets de frais, volontairement écartés pour montrer l'incertitude, et
            sa part dans un revenu net illustratif de {euros(revenuRef)} par mois :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Rendement net annuel supposé</th>
                  <th>Épargne mensuelle à {AGE} ans</th>
                  <th>Part du revenu net</th>
                  <th>Même objectif en démarrant à {AGE_COMPARAISON} ans</th>
                </tr>
              </thead>
              <tbody>
                {rendements.map((rd) => (
                  <tr key={rd}>
                    <td>{pct1(rd)}</td>
                    <td>{euros(effort(complementRef, AGE, rd))}</td>
                    <td>{pct1(partRevenu(effort(complementRef, AGE, rd)))}</td>
                    <td>{euros(effort(complementRef, AGE_COMPARAISON, rd))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Deux enseignements. D'abord, l'écart entre les colonnes montre ce que pèse l'hypothèse
            de rendement, que personne ne maîtrise : un rendement élevé suppose une exposition aux
            marchés, donc un risque de perte en capital, et les rendements passés ne préjugent pas
            des rendements futurs. Ensuite, attendre {AGE_COMPARAISON - AGE} ans n'est pas neutre : à rendement égal, l'effort
            mensuel est à peu près multiplié par {fois(effort(complementRef, AGE_COMPARAISON, rdMed) / effort(complementRef, AGE, rdMed))}.
            Les montants sont exprimés en euros d'aujourd'hui, c'est-à-dire corrigés de l'inflation.
          </p>
          <p>
            Piste de réflexion : automatiser un virement mensuel le jour de la paie, puis
            relever le montant à chaque augmentation, plutôt que d'attendre un « reste » qui
            n'arrive pas. Si l'objectif paraît hors de portée, on peut jouer sur trois leviers :
            le montant du complément visé, l'âge de départ ou l'effort lui-même.
          </p>

          <h2 id="enveloppes">Étape 4 : quelles enveloppes choisir, et dans quel ordre ?</h2>
          <p>
            Chaque enveloppe répond à un besoin différent. Il ne s'agit pas de toutes les ouvrir,
            mais de comprendre ce que chacune apporte à votre plan.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Enveloppe</th>
                  <th>Atout principal</th>
                  <th>Contrainte principale</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PER</td>
                  <td>Déduction des versements du revenu imposable (sous plafond)</td>
                  <td>Capital bloqué jusqu'à la retraite, sauf cas de déblocage anticipé</td>
                </tr>
                <tr>
                  <td>Assurance-vie</td>
                  <td>Souplesse, fiscalité allégée après {AV_ANS} ans, transmission</td>
                  <td>Frais variables ; supports en UC exposés au risque de perte en capital</td>
                </tr>
                <tr>
                  <td>PEA</td>
                  <td>Exonération d'impôt sur le revenu des gains après {FISCALITE.peaExonerationIRApres} ans (prélèvements sociaux dus)</td>
                  <td>Plafond de versements de {euros(ENVELOPPES_NOV2026.peaPlafondVersements)} ; titres éligibles</td>
                </tr>
                <tr>
                  <td>Résidence principale</td>
                  <td>Réduit les dépenses à la retraite ; pas d'impôt sur la plus-value à la revente</td>
                  <td>Capital peu liquide ; ne produit pas de revenu</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Pour choisir entre ces options, voir <a href="/guide/meilleure-enveloppe-retraite">notre comparaison
            des enveloppes</a> et <a href="/guide/per-ou-assurance-vie-selon-age-et-tmi">le choix entre PER
            et assurance-vie selon l'âge et la tranche d'imposition</a>. Un ordre souvent évoqué à titre de
            piste : un matelas de précaution d'abord, puis le PER si la tranche marginale
            d'imposition le justifie, puis le PEA et l'assurance-vie pour la flexibilité.
          </p>

          <h2 id="per">Étape 5 : le PER vaut-il le coup selon votre TMI ?</h2>
          <p>
            L'avantage du PER est fiscal : les versements volontaires sont déductibles du revenu
            imposable, dans la limite d'un plafond égal en général à {PER_PLAFOND.tauxRevenusActivite} %
            des revenus d'activité de l'année précédente (avec un plancher et un maximum). Mais
            la sortie en capital est, pour la part correspondant aux versements, imposée au barème de
            l'impôt sur le revenu ; la déduction est donc un différé d'imposition, avantageux surtout
            si votre tranche marginale à la sortie est plus basse qu'à l'entrée. Pour {euros(VERSEMENT)} versés
            (hors plafond atteint), l'économie d'impôt immédiate vaut :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Tranche marginale d'imposition</th>
                  <th>Économie d'impôt sur {euros(VERSEMENT)} versés</th>
                  <th>Coût net du versement</th>
                </tr>
              </thead>
              <tbody>
                {tmiImposables.map((t) => (
                  <tr key={t}>
                    <td>{pct(t)}</td>
                    <td>{euros(VERSEMENT * (t / 100))}</td>
                    <td>{euros(VERSEMENT - VERSEMENT * (t / 100))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Lecture : à {pct(tmiImposables[0])}, l'intérêt du PER est faible ; à partir de la tranche
            à {pct(tmiImposables[1])}, il devient une piste à étudier, en tenant compte du blocage
            des fonds. Le plafond individuel est calculé chaque année, et les plafonds non utilisés
            des années passées peuvent se reporter (voir{" "}
            <a href="/guide/plafond-per-versement-avant-31-decembre-2026">notre guide sur le plafond PER</a>).
            Pour la fiscalité de la sortie, voir <a href="/guide/fiscalite-sortie-per">ce guide</a> ; pour décider,{" "}
            <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER ?</a>
          </p>

          <h2 id="pea-av-rp">Étape 6 : quelle place pour le PEA, l'assurance-vie et la résidence principale ?</h2>
          <p>
            <strong>PEA et assurance-vie</strong> servent de poche souple. Le PEA convient à un
            horizon long : au-delà de {FISCALITE.peaExonerationIRApres} ans, les gains échappent à l'impôt sur le revenu, les
            prélèvements sociaux restant dus. L'assurance-vie offre, après {AV_ANS} ans, un cadre fiscal
            allégé sur les rachats et des avantages en cas de transmission. Les deux peuvent
            contenir des supports exposés aux marchés actions : le capital n'est alors pas garanti.
            Comparatifs : <a href="/guide/pea-ou-assurance-vie">PEA ou assurance-vie</a> et{" "}
            <a href="/guide/pea-ou-per-pour-la-retraite">PEA ou PER</a>.
          </p>
          <p>
            <strong>La résidence principale</strong> pèse lourd dans un plan retraite, pour une
            raison simple : être propriétaire sans crédit en fin de carrière supprime la dépense
            de loyer, souvent le premier poste du budget. Rembourser un crédit immobilier plus vite
            peut donc être, selon les cas, une manière de préparer sa retraite, mais au prix d'une
            moindre liquidité. L'immobilier locatif est un autre sujet, avec ses propres
            risques : voir <a href="/guide/immobilier-et-retraite-guide-complet">notre guide immobilier et retraite</a>,
            ou nos sites partenaires <a href="https://www.immobilierpassif.com">immobilierpassif.com</a> et{" "}
            <a href="https://scpirentable.fr">scpirentable.fr</a> pour la pierre-papier.
          </p>

          <h2 id="horizon">Comment tenir un horizon de {anneesRestantes} ans ?</h2>
          <p>
            Le plan ne se joue pas sur une seule décision mais sur une discipline. Quelques
            principes, à adapter à votre situation :
          </p>
          <ul>
            <li>Revoir le plan tous les deux ou trois ans, et à chaque événement (naissance, séparation, changement d'emploi).</li>
            <li>Garder une allocation cohérente avec l'horizon : à {AGE} ans, la part de supports exposés aux marchés peut être plus élevée qu'à l'approche du départ, avec les risques que cela comporte.</li>
            <li>Surveiller les frais, qui s'accumulent sur la durée : voir <a href="/guide/combien-coute-une-assurance-vie">le coût d'une assurance-vie</a> et <a href="/guide/combien-coute-un-per">celui d'un PER</a>.</li>
            <li>Ne pas arrêter les versements lors d'une baisse de marché : c'est souvent là que se commet l'erreur la plus coûteuse.</li>
          </ul>

          <h2 id="erreurs">Quelles sont les erreurs fréquentes à {AGE} ans ?</h2>
          <ul>
            <li><strong>Ne pas regarder son relevé de carrière</strong> et découvrir trop tard des trimestres manquants.</li>
            <li><strong>Épargner « au reste »</strong> au lieu d'automatiser.</li>
            <li><strong>Ouvrir un PER uniquement pour la déduction</strong> sans vérifier le blocage ni les frais.</li>
            <li><strong>Négliger la résidence principale</strong> dans l'arbitrage entre crédit et épargne.</li>
            <li><strong>Choisir un support sans regarder les frais</strong> ni le niveau de risque.</li>
            <li><strong>Raisonner en rendement garanti</strong> : aucun rendement futur ne l'est, hormis pour une part des fonds en euros, dans les conditions du contrat.</li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Est-il trop tôt pour préparer sa retraite à 40 ans ?</h3>
          <p>
            Non : c'est plutôt un bon moment, car l'horizon est long et les erreurs encore
            rattrapables. Commencer par un relevé de carrière et un objectif chiffré coûte peu
            et évite de décider à l'aveugle.
          </p>
          <h3>Combien épargner par mois à 40 ans pour la retraite ?</h3>
          <p>
            Dans notre illustration, environ {euros(effort(complementRef, AGE, rdMed))} par mois pour
            viser {euros(complementRef)} de complément avec un rendement net supposé de {pct1(rdMed)}.
            Le résultat dépend de l'objectif, du rendement et de l'âge de départ : voir{" "}
            <a href="/guide/combien-faut-il-epargner-pour-la-retraite">notre guide sur le montant à épargner</a>.
          </p>
          <h3>Faut-il ouvrir un PER à 40 ans ?</h3>
          <p>
            C'est à étudier surtout si votre tranche marginale d'imposition est élevée, car la
            déduction a alors le plus d'effet. Les fonds restent bloqués jusqu'à la retraite,
            sauf exceptions : voir <a href="/guide/deblocage-anticipe-per">le déblocage anticipé</a>.
          </p>
          <h3>PER ou assurance-vie à 40 ans ?</h3>
          <p>
            Le PER privilégie l'avantage fiscal à l'entrée et le blocage ; l'assurance-vie
            privilégie la souplesse. Beaucoup de plans combinent les deux. Voir{" "}
            <a href="/guide/per-vs-assurance-vie-retraite">PER vs assurance-vie</a>.
          </p>
          <h3>Vaut-il mieux rembourser son crédit immobilier ou épargner pour la retraite ?</h3>
          <p>
            Cela dépend du taux du crédit, de la liquidité souhaitée et de la fiscalité de
            l'épargne alternative. Rembourser offre un gain certain mais bloque du capital ;
            épargner offre de la flexibilité mais un rendement incertain. C'est un arbitrage
            à examiner cas par cas.
          </p>
          <h3>Comment connaître le montant de ma future pension ?</h3>
          <p>
            Grâce au relevé de carrière et à l'estimation indicative globale sur Info Retraite,
            qui regroupent les régimes de base et complémentaires. Le montant n'est connu avec
            précision que quelques années avant le départ.
          </p>
          <h3>À quel âge pourrai-je partir à la retraite ?</h3>
          <p>
            Pour les générations nées à partir de 1969, l'âge légal est de {ageLegalRecent} dans
            la législation actuelle, sous réserve de réformes. Le départ à taux plein dépend aussi
            de la durée d'assurance : voir <a href="/guide/surcote-decote-retraite">la surcote et la décote</a>.
          </p>
          <h3>Que faire si je ne peux pas épargner beaucoup ?</h3>
          <p>
            Mieux vaut un petit versement régulier que rien, puis l'augmenter avec les revenus.
            On peut aussi jouer sur le complément visé ou sur l'âge de départ.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            À {AGE} ans, le plus utile n'est pas de choisir le « meilleur » produit, mais de
            poser un cadre : connaître ses droits, chiffrer un objectif, fixer un effort
            automatique et choisir des enveloppes cohérentes avec sa fiscalité. Dans notre
            illustration, démarrer à {AGE} ans plutôt qu'à {AGE_COMPARAISON} ans divise l'effort mensuel
            d'environ {fois(effort(complementRef, AGE_COMPARAISON, rdMed) / effort(complementRef, AGE, rdMed))}
            : c'est le principal argument pour s'y prendre maintenant, sans promettre aucun
            résultat.
          </p>
          <p>
            Pour un premier ordre de grandeur, utilisez notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> ; pour poser le cadre avec un
            regard extérieur, le <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a>
            permet de partir de votre relevé de carrière.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/preparer-sa-retraite-guide-complet">Préparer sa retraite : le guide complet</a></li>
            <li><a href="/guide/combien-epargner-par-mois-pour-la-retraite-selon-age">Combien épargner par mois selon l'âge</a></li>
            <li><a href="/guide/preparer-sa-retraite-a-50-ans">Préparer sa retraite à 50 ans</a></li>
            <li><a href="/strategies/per">Notre stratégie PER</a></li>
            <li><a href="/strategies/assurance-vie-retraite">Notre stratégie assurance-vie</a></li>
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
              (complément visé, rendement, inflation, âge de départ), qui ne préjugent ni de votre
              situation ni des règles futures. Les rendements passés ne préjugent pas des
              rendements futurs ; les supports en unités de compte présentent un risque de perte en
              capital. Seuls vos caisses de retraite, votre établissement financier et un
              professionnel peuvent confirmer ce qui s'applique à votre cas.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Un plan retraite à 40 ans commence par un relevé de carrière et un objectif chiffré." />
    </>
  );
}
