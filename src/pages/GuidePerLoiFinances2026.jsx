import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { FISCALITE, HYPOTHESES_MAJ, SIMU_DEFAUTS, euros, pct } from "../components/hypotheses.js";

export default function GuidePerLoiFinances2026() {
  const ageLimite = FISCALITE.perAgeLimiteDeductibiliteVersements;
  const exempleGains = 20000;
  const surcoutPrelevementsSociaux =
    (exempleGains * (FISCALITE.prelevementsSociaux.per - FISCALITE.prelevementsSociaux.assuranceVie)) /
    100;
  const exempleVersement = 5000;
  const economieAvant =
    (exempleVersement * SIMU_DEFAUTS.tmiActuelle) / 100;

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide coûts</span>
          <h1>
            PER : prélèvements sociaux à {pct(FISCALITE.prelevementsSociaux.per)} et fin de la déduction
            après {ageLimite} ans, ce qui change depuis 2026
          </h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> deux lois distinctes ont modifié le PER avec effet au 1er
              janvier 2026. La loi de financement de la Sécurité sociale (LFSS) 2026 — loi n° 2025-1403
              du 30 décembre 2025, article 12 — a relevé le taux des prélèvements sociaux applicable aux
              gains du PER de 17,2 % à{" "}
              {pct(FISCALITE.prelevementsSociaux.per)}, tout en excluant explicitement l'assurance-vie et
              l'immobilier de cette hausse, qui restent à {pct(FISCALITE.prelevementsSociaux.assuranceVie)}
              . Séparément, la loi de finances pour 2026 — promulguée plus tard, le 19 février 2026 — a
              supprimé la déductibilité fiscale des versements
              volontaires effectués sur un PER par un souscripteur de {ageLimite} ans ou plus — les versements
              restent possibles, mais ils ne réduisent plus le revenu imposable. Aucune de ces deux
              mesures ne remet en cause l'intérêt du PER pour la majorité des épargnants qui versent
              avant {ageLimite} ans en phase d'activité, mais elles change le calcul pour deux profils précis :
              ceux qui arbitrent PER contre assurance-vie sur le seul critère fiscal, et ceux qui
              envisageraient d'ouvrir ou d'alimenter un PER après {ageLimite} ans dans un objectif de
              transmission (barème {HYPOTHESES_MAJ}, à vérifier au moment de votre opération).
            </p>
          </div>

          <p>
            Le PER reste, comme tout produit d'épargne réglementé sur le temps long, exposé à des
            ajustements de règles entre l'ouverture et la sortie — un risque déjà évoqué dans notre
            guide sur{" "}
            <a href="/guide/inconvenients-du-per">les inconvénients du PER</a>. Ce guide détaille les
            deux changements entrés en vigueur en 2026, à qui ils s'appliquent réellement, et ce qui,
            à l'inverse, ne change pas.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#lfss-2026">Deux lois, deux mesures, un même 1er janvier 2026</a></li>
              <li><a href="#prelevements-sociaux">La hausse des prélèvements sociaux à {pct(FISCALITE.prelevementsSociaux.per)} sur le PER</a></li>
              <li><a href="#tableau-comparatif">Le nouveau taux par enveloppe, en un tableau</a></li>
              <li><a href="#deduction-70-ans">La fin de la déduction des versements après {ageLimite} ans</a></li>
              <li><a href="#qui-est-concerne">Qui est vraiment concerné par ces deux mesures</a></li>
              <li><a href="#ce-qui-ne-change-pas">Ce qui ne change pas</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#a-verifier">Ce qu'il faut vérifier avant d'agir</a></li>
            </ol>
          </div>

          <h2 id="lfss-2026">Deux lois, deux mesures, un même 1er janvier 2026</h2>
          <p>
            Deux textes distincts touchent chacun un aspect différent du PER, avec un même point de
            départ : le 1er janvier 2026. La loi de financement de la Sécurité sociale (LFSS) 2026 — loi
            n° 2025-1403 du 30 décembre 2025, publiée au Journal officiel le 31 décembre 2025 — relève,
            à son article 12, le taux global des prélèvements sociaux sur les revenus du capital, avec
            un effet direct sur le PER, le PEA et le compte-titres ordinaire. La loi de finances pour
            2026 — loi n° 2026-103, promulguée plus tardivement, le 19 février 2026 — modifie de son
            côté les règles de déduction fiscale des versements volontaires selon l'âge du souscripteur,
            avec un effet rétroactif au 1er janvier 2026 pour cette mesure. Les deux textes sont
            indépendants l'un de l'autre : un même épargnant peut n'être concerné que par l'un, par les
            deux, ou par aucun, selon son âge et le type de retrait envisagé.
          </p>

          <h2 id="prelevements-sociaux">
            La hausse des prélèvements sociaux à {pct(FISCALITE.prelevementsSociaux.per)} sur le PER
          </h2>
          <p>
            Jusqu'au 31 décembre 2025, les gains réalisés sur un PER — comme sur la plupart des produits
            financiers — supportaient des prélèvements sociaux (CSG, CRDS et contributions annexes) au
            taux de 17,2 %. La LFSS 2026 relève ce taux à{" "}
            {pct(FISCALITE.prelevementsSociaux.per)} pour le PER, le PEA et le compte-titres ordinaire,
            via l'ajout d'une nouvelle contribution assise sur les mêmes revenus. Concrètement, à la
            sortie en capital d'un PER alimenté par des versements déductibles, la part imposable des
            gains est désormais taxée au prélèvement forfaitaire unique (PFU) de{" "}
            {pct(FISCALITE.pfuIR + FISCALITE.prelevementsSociaux.per)} (12,8 % d'impôt sur le revenu +{" "}
            {pct(FISCALITE.prelevementsSociaux.per)} de prélèvements sociaux), contre 30 % avant le 1er
            janvier 2026.
          </p>
          <p>
            Sur un exemple purement illustratif : un souscripteur qui réalise {euros(exempleGains)} de
            plus-values à la sortie de son PER paiera, avec le nouveau taux, environ{" "}
            {euros(surcoutPrelevementsSociaux)} de prélèvements sociaux de plus que si le taux était
            resté à 17,2 % — un écart réel, mais qui ne remet pas en cause l'intérêt du PER pour un
            épargnant fortement imposé au moment du versement (voir notre guide sur{" "}
            <a href="/guide/fiscalite-sortie-per">la fiscalité de sortie du PER</a> pour le détail
            complet du calcul selon le mode de sortie).
          </p>

          <h2 id="tableau-comparatif">Le nouveau taux par enveloppe, en un tableau</h2>
          <p>
            Point central de cette réforme : la hausse ne s'applique pas uniformément. L'assurance-vie
            et les revenus fonciers/immobiliers ont été explicitement exclus du texte voté et restent
            au taux antérieur.
          </p>
          <table>
            <thead>
              <tr>
                <th>Enveloppe</th>
                <th>Taux avant le 1er janvier 2026</th>
                <th>Taux depuis le 1er janvier 2026</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PER (tous types)</td>
                <td>17,2 %</td>
                <td>{pct(FISCALITE.prelevementsSociaux.per)}</td>
              </tr>
              <tr>
                <td>PEA</td>
                <td>17,2 %</td>
                <td>{pct(FISCALITE.prelevementsSociaux.pea)}</td>
              </tr>
              <tr>
                <td>Compte-titres ordinaire (CTO)</td>
                <td>17,2 %</td>
                <td>{pct(FISCALITE.prelevementsSociaux.cto)}</td>
              </tr>
              <tr>
                <td>Assurance-vie</td>
                <td>17,2 %</td>
                <td>{pct(FISCALITE.prelevementsSociaux.assuranceVie)} (inchangé)</td>
              </tr>
              <tr>
                <td>Revenus fonciers / immobilier</td>
                <td>17,2 %</td>
                <td>{pct(FISCALITE.prelevementsSociaux.immobilier)} (inchangé)</td>
              </tr>
            </tbody>
          </table>
          <p>
            Cet écart de {pct(FISCALITE.prelevementsSociaux.per - FISCALITE.prelevementsSociaux.assuranceVie)}{" "}
            entre le PER et l'assurance-vie ne suffit pas, à lui seul, à trancher entre les deux
            enveloppes — la déductibilité à l'entrée du PER reste un avantage souvent plus déterminant
            que l'écart de fiscalité à la sortie, comme le détaille notre comparatif{" "}
            <a href="/guide/per-vs-assurance-vie-retraite">PER ou assurance-vie pour la retraite</a>. Il
            justifie en revanche de revérifier le calcul plutôt que de le supposer inchangé depuis
            l'ouverture du contrat.
          </p>

          <h2 id="deduction-70-ans">La fin de la déduction des versements après {ageLimite} ans</h2>
          <p>
            Depuis le 1er janvier 2026, tout versement volontaire effectué sur un PER par un
            souscripteur ayant atteint {ageLimite} ans au jour du versement perd sa déductibilité du revenu
            imposable — pour tous les types de PER (individuel, PER d'entreprise collectif, PER
            d'entreprise obligatoire). Le compte reste ouvert et peut continuer à recevoir des
            versements après cet âge, mais ces versements ne réduisent plus l'impôt sur le revenu de
            l'année, contrairement au régime applicable avant {ageLimite} ans.
          </p>
          <p>
            En contrepartie, la loi de finances 2026 prévoit qu'un versement effectué après {ageLimite} ans et
            non déduit bénéficie d'un traitement favorable à la sortie : le capital correspondant à ces
            versements non déduits est exonéré d'impôt sur le revenu et de prélèvements sociaux, seules
            les plus-values générées restant soumises au PFU. Sur un exemple purement illustratif : un
            versement de {euros(exempleVersement)} effectué avant {ageLimite} ans par un souscripteur à la
            tranche marginale de {SIMU_DEFAUTS.tmiActuelle} % générait une économie d'impôt immédiate
            d'environ {euros(economieAvant)} ; le même versement effectué après {ageLimite} ans ne génère plus
            aucune économie d'impôt à l'entrée.
          </p>
          <p>
            Cette mesure vise en priorité les stratégies consistant à verser tardivement sur un PER dans
            un but principalement successoral, pour profiter à la fois de la déduction fiscale et des
            abattements de transmission — un usage distinct de l'objectif initial du PER, qui reste
            avant tout un outil de préparation de la retraite pendant la vie active.
          </p>

          <h2 id="qui-est-concerne">Qui est vraiment concerné par ces deux mesures</h2>
          <p>
            Pour la grande majorité des épargnants de 45 à 65 ans qui versent sur leur PER en cours de
            vie active, l'impact direct de ces deux mesures reste limité : la hausse des prélèvements
            sociaux ne s'applique qu'aux plus-values réalisées à la sortie, pas au capital versé, et la
            fin de la déduction après {ageLimite} ans ne concerne que les versements effectués après cet âge.
            Deux profils sont en revanche directement touchés : un souscripteur qui approche ou dépasse
            {ageLimite} ans et envisageait encore des versements déductibles sur son PER, et un épargnant qui
            arbitre entre PER et assurance-vie en s'appuyant sur un écart de fiscalité de sortie qui
            vient de se creuser de {pct(FISCALITE.prelevementsSociaux.per - FISCALITE.prelevementsSociaux.assuranceVie)}.
          </p>

          <h2 id="ce-qui-ne-change-pas">Ce qui ne change pas</h2>
          <p>
            Ni la LFSS 2026 ni la loi de finances 2026 ne modifient les autres règles structurantes du
            PER : le capital ou les versements restent bloqués jusqu'à la retraite (hors cas de
            déblocage anticipé prévus par la loi, comme l'achat de la résidence principale), la
            déductibilité des versements avant {ageLimite} ans reste inchangée dans son principe et son plafond,
            et le choix entre sortie en capital, en rente ou en mix reste identique à celui décrit dans
            notre guide{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a>. L'assurance-vie,
            elle, ne connaît aucun changement de fiscalité au 1er janvier 2026.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Ces changements sont-ils rétroactifs sur les versements déjà effectués ?</h3>
          <p>
            Non. La hausse des prélèvements sociaux s'applique aux gains constatés à la sortie à compter
            du 1er janvier 2026, quelle que soit la date des versements d'origine. La fin de la
            déductibilité après {ageLimite} ans ne s'applique qu'aux versements effectués à compter de cette
            date par un souscripteur déjà âgé de {ageLimite} ans ou plus — les versements antérieurs, déjà
            déduits, ne sont pas remis en cause.
          </p>
          <h3>Le PER reste-t-il intéressant après ces changements ?</h3>
          <p>
            Pour un épargnant en activité qui verse avant {ageLimite} ans, oui dans la plupart des cas : l'avantage
            principal du PER — la déduction immédiate des versements du revenu imposable — n'est pas
            modifié. L'arbitrage à revoir concerne surtout les stratégies de versement tardif après 70
            ans à visée successorale, et le calcul fin entre PER et assurance-vie pour un profil
            hésitant entre les deux enveloppes.
          </p>
          <h3>Le PER bancaire et le PER assurantiel sont-ils traités différemment ?</h3>
          <p>
            Ces deux mesures s'appliquent au PER dans son ensemble, sans distinction entre PER
            bancaire (compte-titres) et PER assurantiel — contrairement à d'autres règles où la nature
            du contrat a une incidence, décrites dans notre guide{" "}
            <a href="/guide/per-bancaire-frais-gestion-horizon">PER bancaire</a>. Ce point mérite
            toutefois d'être reconfirmé au cas par cas auprès de votre gestionnaire, la doctrine
            d'application pouvant encore évoluer.
          </p>
          <h3>Peut-on encore ouvrir un PER après {ageLimite} ans ?</h3>
          <p>
            Oui, rien n'interdit l'ouverture ou l'alimentation d'un PER après {ageLimite} ans. Seul l'avantage de
            déduction fiscale à l'entrée disparaît pour les versements effectués à partir de cet âge ;
            les autres caractéristiques du contrat restent identiques.
          </p>

          <h2 id="a-verifier">Ce qu'il faut vérifier avant d'agir</h2>
          <ol>
            <li>
              <strong>Si vous avez 65 ans ou plus</strong> et envisagez encore des versements
              volontaires déductibles sur votre PER, vérifiez votre âge exact au moment prévu du
              versement : la règle s'apprécie au jour du versement, pas au 1er janvier de l'année.
            </li>
            <li>
              <strong>Si vous arbitrez entre PER et assurance-vie</strong> à l'approche de la sortie,
              recalculez le PFU applicable avec le nouveau taux avant de trancher — l'écart s'est
              creusé mais reste souvent secondaire face à l'avantage de déduction à l'entrée.
            </li>
            <li>
              <strong>Confirmez ces taux au moment de votre opération</strong> auprès de votre
              gestionnaire ou d'un professionnel : les barèmes réglementaires peuvent encore évoluer par
              décret d'application.
            </li>
          </ol>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les taux de
              prélèvements sociaux cités sont ceux de l'article 12 de la LFSS 2026 (loi n° 2025-1403 du
              30 décembre 2025), vérifié sur Légifrance. La règle sur la fin de la déduction après{" "}
              {ageLimite} ans provient de la loi de finances pour 2026 (loi n° 2026-103 du 19 février
              2026) ; son mécanisme est confirmé par plusieurs sources spécialisées concordantes, mais
              l'article exact du Code général des impôts qu'elle modifie n'a pas pu être confirmé
              directement sur Légifrance et reste à vérifier. Barème {HYPOTHESES_MAJ} — à reconfirmer
              avant toute opération, la publication de décrets d'application pouvant encore préciser
              certains points. Pour un point complet sur votre situation, un{" "}
              <a href="/bilan-retraite">bilan retraite gratuit</a> permet de recalculer l'impact réel de
              ces changements sur votre contrat.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Votre PER a été ouvert avant ces changements : faisons le point ensemble"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
