import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RETRAITE_PROGRESSIVE_CUMUL,
  RETRAITE_PROGRESSIVE_CUMUL_EXEMPLES,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const R = RETRAITE_PROGRESSIVE_CUMUL;
const E = RETRAITE_PROGRESSIVE_CUMUL_EXEMPLES;

const eurosPrecis = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + " %";

// ---- Retraite progressive : fraction de pension = 100 % − quotité de travail ----
const fractionPension = (quotite) => 100 - quotite;
const salaireTempsPartiel = (quotite) => (E.salaireBrutMensuelTempsPlein * quotite) / 100;
const pensionVersee = (quotite) => (E.pensionProvisoireMensuelle * fractionPension(quotite)) / 100;
const totalMensuel = (quotite) => salaireTempsPartiel(quotite) + pensionVersee(quotite);
const partDuSalaireInitial = (quotite) =>
  (totalMensuel(quotite) / E.salaireBrutMensuelTempsPlein) * 100;

const q = E.quotiteExemple;

// ---- Cumul emploi-retraite 2027, entre l'âge légal et 67 ans ----
const reductionAnnuelle = (revenus) =>
  (Math.max(revenus - R.seuilCumul2027, 0) * R.tauxReductionAuDela) / 100;
const revenuActiviteExemple = salaireTempsPartiel(q) * 12;

// Plafond annuel de la seconde pension (cumul intégral, pensions d'avant 2027).
const plafondSecondePension = (R.pass2026 * R.tauxPassSecondePension) / 100;

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Retraite progressive du salarié, fiche F12842, vérifiée le 17 novembre 2025",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F12842",
  },
  {
    label:
      "Service-Public.gouv.fr — Cumul emploi-retraite du salarié, fiche F13243, vérifiée le 12 novembre 2026 (règles avant et à partir du 1er janvier 2027)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F13243",
  },
  {
    label:
      "Service-Public.gouv.fr — « Des nouvelles règles pour le cumul emploi-retraite à partir de 2027 », actualité A18914, mise à jour le 10 novembre 2026",
    url: "https://www.service-public.gouv.fr/particuliers/actualites/A18914",
  },
  {
    label:
      "Légifrance — Décret n° 2026-1017 du 2 novembre 2026 relatif au cumul emploi retraite (JORF du 3 novembre 2026)",
    url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000055047344",
  },
  {
    label:
      "Légifrance — Décret n° 2025-681 du 15 juillet 2025 fixant l'âge d'ouverture du droit à la retraite progressive à soixante ans (JORF du 23 juillet 2025)",
    url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000051942071",
  },
  {
    label:
      "Légifrance — Code de la sécurité sociale, article L. 161-22-1-5 (version en vigueur depuis le 26 octobre 2025)",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048697292",
  },
  {
    label:
      "Code du travail numérique (ministère du Travail) — Article L. 3123-4-1 : demande de temps partiel pour une retraite progressive",
    url: "https://code.travail.gouv.fr/code-du-travail/l3123-4-1",
  },
  {
    label: "L'Assurance retraite — Retraite progressive",
    url: "https://www.lassuranceretraite.fr/portail-info/home/actif/je-souhaite-partir-plus-tot/retraite-progressive.html",
  },
  {
    label: "L'Assurance retraite — Cumuler emploi et retraite",
    url: "https://www.lassuranceretraite.fr/portail-info/home/actif/montant-retraite/cumuler-emploi-retraite.html",
  },
  {
    label:
      "Service-Public.gouv.fr — Retraite progressive de l'agent public, fiche F37400, vérifiée le 1er septembre 2025",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F37400",
  },
  {
    label:
      "Service-Public.gouv.fr — À partir de quel âge un salarié peut-il partir en retraite ?, fiche F14043, vérifiée le 14 août 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14043",
  },
  {
    label:
      "Agirc-Arrco — Circulaire 2025-14-SG-DRJ du 25 août 2025, « Abaissement de l'âge d'ouverture du droit à retraite progressive à 60 ans - Barème 2025 »",
    url: "https://www.agirc-arrco.fr/storage/2025/03/Circulaire_Agirc-Arrco_2025_14_SG-DRJ.pdf",
  },
];

export default function GuideRetraiteProgressiveOuCumul() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Comparaison · fin de carrière</span>
          <h1>Retraite progressive ou cumul emploi-retraite : quelle différence à 60 ans ?</h1>
          <p className="sub">
            Deux façons de toucher une pension en travaillant encore, deux logiques opposées. Mis à
            jour le {R.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> la retraite progressive se demande{" "}
              <em>avant</em> la retraite : dès {R.ageRetraiteProgressive} ans, avec{" "}
              {R.trimestresRetraiteProgressive} trimestres, vous travaillez entre{" "}
              {R.quotiteMin} % et {R.quotiteMax} % d'un temps complet et recevez la fraction
              complémentaire d'une pension provisoire, recalculée à l'arrêt définitif. Le cumul
              emploi-retraite vient <em>après</em> : il suppose d'avoir pris sa retraite, donc en
              général d'avoir atteint l'âge légal. Pour les pensions prenant effet à partir du 1er
              janvier 2027, les revenus d'activité au-delà de {euros(R.seuilCumul2027)} par an
              réduisent la pension de {R.tauxReductionAuDela} % du dépassement jusqu'à{" "}
              {R.ageCumulLibre} ans.
            </p>
          </div>

          <p>
            À l'approche de la soixantaine, beaucoup de salariés veulent lever le pied sans tout
            arrêter, et se heurtent à deux expressions qui semblent désigner la même chose :
            « retraite progressive » et « cumul emploi-retraite ». La confusion coûte cher quand
            elle conduit à demander sa retraite définitive trop tôt, ou à attendre un dispositif
            auquel on avait déjà droit.
          </p>
          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel :
            Claire, née en 1966, cadre dans le secteur privé, a {R.ageRetraiteProgressive} ans en
            2026 et un peu plus de {R.trimestresRetraiteProgressive} trimestres sur son relevé de
            carrière. Elle voudrait travailler trois jours par semaine. Peut-elle déjà toucher
            une partie de sa pension ? Doit-elle attendre son âge légal ? Que devient sa retraite
            ensuite ?
          </p>
          <p>
            La retraite progressive est un aménagement de fin de carrière : un temps partiel
            complété par une fraction de pension, la pension définitive restant à calculer. Le
            cumul emploi-retraite est la situation d'un retraité qui retravaille : sa pension est
            déjà liquidée, c'est-à-dire calculée et versée. Cet article compare les deux, critère
            par critère, avec les règles en vigueur au {R.maj} et celles qui s'appliqueront aux
            retraites prenant effet en 2027.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#difference">Quelle est la différence entre retraite progressive et cumul emploi-retraite ?</a></li>
              <li><a href="#tableau">Retraite progressive ou cumul emploi-retraite : le tableau comparatif</a></li>
              <li><a href="#conditions-progressive">Quelles conditions pour une retraite progressive à 60 ans ?</a></li>
              <li><a href="#exemple">Combien touche-t-on en retraite progressive à 60 % ?</a></li>
              <li><a href="#cumul-2027">Cumul emploi-retraite : que changent les règles de 2027 ?</a></li>
              <li><a href="#arbre">Comment s'orienter ? Trois questions à se poser</a></li>
              <li><a href="#erreurs">Quelles erreurs éviter ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="difference">Quelle est la différence entre retraite progressive et cumul emploi-retraite ?</h2>
          <p>
            La différence tient au moment où la pension est calculée. En retraite progressive, la
            pension n'est liquidée qu'à titre provisoire et sera recalculée à l'arrêt complet de
            l'activité. En cumul emploi-retraite, la pension est déjà définitive : l'activité
            reprise s'y ajoute, dans des limites qui dépendent de la date de départ et de l'âge.
          </p>
          <p>
            Le code de la sécurité sociale (article L. 161-22-1-5) décrit la retraite progressive
            comme « la liquidation provisoire et le service d'une même fraction de pension dans
            tous les régimes de retraite de base légalement obligatoires ». La fiche F12842 de
            Service-Public précise que vous continuez à cotiser pendant cette période et qu'à la
            cessation totale d'activité, la retraite définitive est recalculée en tenant compte de
            la période à temps partiel ; elle ajoute que cette pension complète « ne peut pas être
            inférieure au montant provisoire ».
          </p>
          <p>
            Le cumul emploi-retraite suit l'ordre inverse. La même fiche F12842 le dit en une
            phrase : toute activité poursuivie ou reprise <em>après</em> la retraite définitive
            relève des règles du cumul emploi-retraite. Les deux dispositifs ne sont donc pas
            concurrents au même instant : l'un précède la retraite, l'autre la suit. Notre guide
            sur{" "}
            <a href="/guide/cumul-emploi-retraite-comment-ca-marche">
              le fonctionnement du cumul emploi-retraite
            </a>{" "}
            détaille ce second dispositif ; la présente page se concentre sur ce qui les
            distingue.
          </p>
          <div className="note">
            <p>
              Conséquence pratique à {R.ageRetraiteProgressive} ans : pour un salarié qui ne
              bénéficie d'aucun départ anticipé (carrière longue, par exemple), le cumul
              emploi-retraite n'est pas encore accessible, puisqu'il faut d'abord avoir obtenu sa
              retraite. Selon la fiche F14043 de Service-Public (vérifiée le 14 août 2026), l'âge
              légal est par exemple de 63 ans et 3 mois pour une personne née en 1966. À cet âge
              de la vie, la question « progressive ou cumul » est donc souvent, en réalité, une
              question de calendrier : l'une maintenant, l'autre éventuellement plus tard.
            </p>
          </div>

          <h2 id="tableau">Retraite progressive ou cumul emploi-retraite : le tableau comparatif</h2>
          <p>
            Le tableau ci-dessous résume les règles applicables aux salariés du secteur privé,
            telles que les présentent Service-Public (fiches F12842 et F13243) et l'Assurance
            retraite au {R.maj}. Pour le cumul, deux régimes coexistent selon la date d'effet de
            la première pension.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Retraite progressive</th>
                  <th>Cumul emploi-retraite, pension prenant effet avant le 1er janvier 2027</th>
                  <th>Cumul emploi-retraite, pension prenant effet à partir du 1er janvier 2027</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Âge d'ouverture</td>
                  <td>{R.ageRetraiteProgressive} ans (retraites progressives prenant effet depuis le 1er septembre 2025)</td>
                  <td>Âge auquel la retraite a été obtenue : âge légal, ou avant en cas de départ anticipé</td>
                  <td>Idem ; les règles varient ensuite selon l'âge (avant l'âge légal, de l'âge légal à {R.ageCumulLibre} ans, à partir de {R.ageCumulLibre} ans)</td>
                </tr>
                <tr>
                  <td>Trimestres requis</td>
                  <td>{R.trimestresRetraiteProgressive} trimestres, tous régimes de base confondus</td>
                  <td>Aucun seuil propre ; le taux plein conditionne le cumul intégral</td>
                  <td>Aucun seuil propre ; seul l'âge est pris en compte</td>
                </tr>
                <tr>
                  <td>Activité</td>
                  <td>Temps partiel ou réduit de {R.quotiteMin} % à {R.quotiteMax} % d'un temps complet</td>
                  <td>Libre ; délai de {R.delaiMemeEmployeurMois} mois pour reprendre chez le dernier employeur</td>
                  <td>Libre, sous réserve de la réduction de pension ci-dessous ; les sources consultées ne disent pas si le délai de {R.delaiMemeEmployeurMois} mois chez le dernier employeur est maintenu</td>
                </tr>
                <tr>
                  <td>Pension versée</td>
                  <td>Fraction d'une pension provisoire : 100 % moins la quotité de travail</td>
                  <td>Pension entière si cumul intégral ; sinon total pensions + revenus plafonné à {R.tauxSmicCumulPlafonne} % du Smic ({eurosPrecis(R.plafondCumulPlafonneMensuel)} bruts par mois) ou au dernier salaire s'il est plus élevé</td>
                  <td>Entre l'âge légal et {R.ageCumulLibre} ans : pension réduite de {R.tauxReductionAuDela} % des revenus dépassant {euros(R.seuilCumul2027)} par an ; avant l'âge légal : réduite du montant des revenus ; à partir de {R.ageCumulLibre} ans : entière</td>
                </tr>
                <tr>
                  <td>Droits supplémentaires</td>
                  <td>Oui : la retraite définitive est recalculée avec la période à temps partiel cotisée</td>
                  <td>Cumul intégral : seconde pension, limitée à {euros(plafondSecondePension)} bruts par an ; cumul plafonné : aucun</td>
                  <td>Nouveaux droits seulement pour l'activité exercée à partir de {R.ageCumulLibre} ans</td>
                </tr>
                <tr>
                  <td>Accord de l'employeur</td>
                  <td>Demande de temps partiel ; sans réponse écrite et motivée sous {R.delaiReponseEmployeurMois} mois, l'accord est réputé acquis</td>
                  <td>Sans objet (nouveau contrat ou nouvelle activité)</td>
                  <td>Sans objet</td>
                </tr>
                <tr>
                  <td>Cotisations</td>
                  <td>Sur le salaire à temps partiel ; possibilité de cotiser sur la base d'un temps complet</td>
                  <td>Dues sur les revenus d'activité</td>
                  <td>Dues sur les revenus d'activité</td>
                </tr>
                <tr>
                  <td>Démarche</td>
                  <td>Demande à la caisse au plus tôt {R.delaiDemandeCaisseMois} mois avant la date souhaitée, avec attestation de l'employeur</td>
                  <td>Déclaration écrite à la caisse dans le mois suivant la reprise</td>
                  <td>Déclaration dans le mois suivant le début ou la poursuite de l'activité (avant {R.ageCumulLibre} ans)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Sources du tableau : Service-Public, fiches F12842 (vérifiée le 17 novembre 2025) et
            F13243 (vérifiée le 12 novembre 2026) ; actualité A18914 (mise à jour le 10 novembre
            2026) ; code du travail, article L. 3123-4-1. Les fonctionnaires, les indépendants et
            les régimes spéciaux relèvent de règles propres, évoquées plus bas.
          </p>

          <h2 id="conditions-progressive">Quelles conditions pour une retraite progressive à 60 ans ?</h2>
          <p>
            Trois conditions sont à réunir selon la fiche F12842 de Service-Public : avoir au
            moins {R.ageRetraiteProgressive} ans, justifier de {R.trimestresRetraiteProgressive}{" "}
            trimestres d'assurance et de périodes reconnues équivalentes, et exercer une activité
            à temps partiel ou réduit comprise entre {R.quotiteMin} % et {R.quotiteMax} % d'un
            temps complet.
          </p>
          <p>
            <strong>L'âge.</strong> Le décret n° 2025-681 du 15 juillet 2025 a fixé l'âge
            d'ouverture à soixante ans, pour les pensions prenant effet à compter du 1er septembre
            2025. Auparavant, cet âge correspondait à l'âge légal abaissé de deux ans, soit de 60
            à 62 ans selon l'année de naissance.
          </p>
          <p>
            <strong>Les trimestres.</strong> L'Assurance retraite indique que sont retenus les
            trimestres cotisés, assimilés (chômage, maladie), rachetés, validés dans d'autres
            régimes ou à l'étranger, ainsi que les majorations, pour enfants notamment. Le
            décompte se fait sur l'ensemble des régimes de base : c'est une raison de plus de{" "}
            <a href="/guide/verifier-releve-de-carriere-retraite">
              vérifier son relevé de carrière
            </a>{" "}
            avant toute demande, puisque quelques trimestres oubliés peuvent faire passer sous le
            seuil.
          </p>
          <p>
            <strong>Le temps de travail.</strong> La quotité s'apprécie par rapport à la durée
            légale ou conventionnelle du travail. Pour un salarié au forfait jours, l'Assurance
            retraite donne l'équivalence de {R.forfaitJoursMin} à {R.forfaitJoursMax} jours pour
            un forfait de {R.forfaitJoursReference} jours.
          </p>
          <p>
            <strong>L'accord de l'employeur.</strong> C'est le point sur lequel les présentations
            divergent le plus, parce que la règle a changé. Une actualité de Service-Public de
            juillet 2025 (A18399) rangeait encore l'accord de l'employeur parmi les conditions à
            remplir, sans autre précision. Dans sa rédaction
            actuelle, l'article L. 3123-4-1 du code du travail prévoit qu'à défaut de réponse
            écrite et motivée dans les {R.delaiReponseEmployeurMois} mois suivant la réception de
            la demande, l'accord est réputé acquis, et que le refus doit être justifié par
            l'incompatibilité de la durée de travail demandée avec l'activité économique de
            l'entreprise. La fiche F12842 décrit la même procédure : lettre recommandée avec
            accusé de réception, au moins {R.delaiReponseEmployeurMois} mois avant la date
            souhaitée. L'employeur conserve donc la possibilité de refuser, à condition de
            motiver ce refus ; un accord n'est pas un droit automatique.
          </p>
          <p>
            <strong>Ce qui met fin au dispositif.</strong> La fiche F12842 indique que le
            versement est suspendu si la durée de travail sort de la fourchette, et supprimé
            définitivement en cas de reprise à temps plein ou si le revenu du temps partiel
            atteint ou dépasse le revenu perçu avant la retraite progressive. L'Assurance retraite
            ajoute qu'un salarié ne peut pas exercer en parallèle une activité indépendante, et
            que la retraite progressive ne se transforme pas automatiquement en retraite
            définitive : celle-ci fait l'objet d'une demande distincte.
          </p>
          <p>
            <strong>Fonctionnaires et indépendants.</strong> Pour les fonctionnaires, la fiche
            F37400 de Service-Public (vérifiée le 1er septembre 2025) retient les mêmes seuils
            d'âge et de trimestres, mais une quotité de {R.quotiteMinFonctionPublique} % à{" "}
            {R.quotiteMaxFonctionPublique} % et une activité exercée à titre exclusif dans la
            fonction publique ; notre guide pour{" "}
            <a href="/guide/retraite-fonctionnaires-completer">
              compléter sa retraite de fonctionnaire
            </a>{" "}
            replace ce point dans l'ensemble du régime. Pour les indépendants, l'Assurance
            retraite raisonne sur la baisse des revenus professionnels et non sur un temps de
            travail. Les chiffres de cette page concernent les salariés du secteur privé.
          </p>

          <h2 id="exemple">Combien touche-t-on en retraite progressive à 60 % ?</h2>
          <p>
            Avec un temps partiel à {q} %, vous recevez {fractionPension(q)} % de votre retraite
            provisoire : la fraction versée est égale à 100 % moins la quotité de travail (fiche
            F12842). Le montant en euros dépend donc de deux données personnelles : votre salaire
            à temps partiel et la pension provisoire calculée par vos caisses.
          </p>
          <div className="note">
            <p>
              Exemple purement illustratif, qui ne correspond à aucun cas réel. Hypothèses
              posées : salaire brut à temps complet de {euros(E.salaireBrutMensuelTempsPlein)} par
              mois, réduit en proportion du temps de travail ; retraite provisoire entière (base
              et complémentaire) estimée par les caisses à {euros(E.pensionProvisoireMensuelle)}{" "}
              bruts par mois. Ce second montant est une donnée d'entrée, pas un résultat : il ne
              se déduit pas du salaire et varie fortement d'une carrière à l'autre. Les montants
              sont bruts ; salaire et pension ne supportent pas les mêmes prélèvements.
            </p>
          </div>
          <p>Le calcul, pour une quotité de {q} % :</p>
          <ol>
            <li>
              Salaire à temps partiel : {euros(E.salaireBrutMensuelTempsPlein)} × {q} % ={" "}
              <strong>{euros(salaireTempsPartiel(q))}</strong> bruts par mois.
            </li>
            <li>
              Fraction de pension : 100 % − {q} % = {fractionPension(q)} %, soit{" "}
              {euros(E.pensionProvisoireMensuelle)} × {fractionPension(q)} % ={" "}
              <strong>{euros(pensionVersee(q))}</strong> bruts par mois.
            </li>
            <li>
              Total : <strong>{euros(totalMensuel(q))}</strong> bruts par mois, soit{" "}
              {pct1(partDuSalaireInitial(q))} du salaire brut à temps complet de départ.
            </li>
          </ol>
          <p>La même mécanique, pour les autres quotités autorisées :</p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Temps de travail</th>
                  <th>Salaire brut mensuel</th>
                  <th>Fraction de pension</th>
                  <th>Pension brute versée</th>
                  <th>Total brut mensuel</th>
                  <th>En part du salaire à temps complet</th>
                </tr>
              </thead>
              <tbody>
                {E.quotitesGrille.map((quotite) => (
                  <tr key={quotite}>
                    <td>{pct(quotite)}</td>
                    <td>{euros(salaireTempsPartiel(quotite))}</td>
                    <td>{pct(fractionPension(quotite))}</td>
                    <td>{euros(pensionVersee(quotite))}</td>
                    <td>{euros(totalMensuel(quotite))}</td>
                    <td>{pct1(partDuSalaireInitial(quotite))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Deux précisions empêchent de lire ce tableau trop vite. D'abord, la pension
            provisoire est calculée « selon les droits acquis à la date de la demande » (fiche
            F12842) ; les fiches consultées ne détaillent pas le taux retenu lorsque la durée
            d'assurance requise pour le taux plein n'est pas encore atteinte. Ce point se vérifie
            auprès de sa caisse ou avec le service « Mon estimation retraite », avant de
            s'engager ; notre guide sur{" "}
            <a href="/guide/surcote-decote-retraite">la décote et la surcote</a> explique ce que
            ce taux change au montant d'une pension. Ensuite, côté complémentaire, la circulaire
            Agirc-Arrco 2025-14-SG-DRJ du 25 août 2025 indique que, lorsque le salarié ne réunit
            pas la durée d'assurance du taux plein au régime de base, la retraite complémentaire
            versée pendant la retraite progressive est affectée d'un « coefficient d'anticipation
            spécifique temporaire » qui tient compte du nombre de trimestres acquis ; le barème
            joint à cette circulaire vise les retraites progressives prenant effet de septembre
            à décembre 2025, et les coefficients applicables ensuite sont à demander à
            l'Agirc-Arrco. Le fonctionnement des points est décrit dans notre
            guide sur{" "}
            <a href="/guide/retraite-complementaire-agirc-arrco-cadres-calcul">
              le calcul de la retraite complémentaire Agirc-Arrco
            </a>
            .
          </p>
          <p>
            Reste la question des droits futurs. Travailler à {q} % signifie cotiser sur un
            salaire réduit. Service-Public et l'Assurance retraite indiquent qu'il est possible de
            cotiser sur la base d'un salaire à temps complet ; l'Assurance retraite précise que
            cela suppose l'accord de l'employeur. Le coût de cette option et son effet sur la
            pension définitive se chiffrent au cas par cas.
          </p>

          <h2 id="cumul-2027">Cumul emploi-retraite : que changent les règles de 2027 ?</h2>
          <p>
            Pour les assurés dont la première pension prend effet à partir du 1er janvier 2027,
            la distinction entre cumul intégral et cumul plafonné disparaît : selon Service-Public
            (actualité A18914), « seul l'âge est pris en compte ». Les personnes déjà retraitées
            avant cette date restent soumises aux anciennes règles, y compris si elles reprennent
            une activité en 2027.
          </p>
          <p>
            Cette réforme résulte de l'article 102 de la loi de financement de la sécurité
            sociale pour 2026 (loi n° 2025-1403 du 30 décembre 2025) et de deux décrets du 2
            novembre 2026, n° 2026-1016 et n° 2026-1017, publiés au Journal officiel du 3
            novembre 2026. La fiche F13243 distingue trois situations :
          </p>
          <ul>
            <li>
              <strong>Avant l'âge légal de départ</strong> (retraite anticipée) : la pension est
              réduite du montant des revenus professionnels et de remplacement.
            </li>
            <li>
              <strong>Entre l'âge légal et {R.ageCumulLibre} ans</strong> : aucune réduction tant
              que ces revenus ne dépassent pas {euros(R.seuilCumul2027)} par an ; au-delà, la
              pension est réduite de la moitié du dépassement.
            </li>
            <li>
              <strong>À partir de {R.ageCumulLibre} ans</strong> : cumul entier, et l'activité
              ouvre de nouveaux droits à retraite.
            </li>
          </ul>
          <p>
            Application illustrative de cette règle à la deuxième situation, pour différents
            niveaux de revenus d'activité bruts annuels (le dernier correspond au salaire à{" "}
            {q} % de l'exemple précédent, soit {euros(revenuActiviteExemple)} par an) :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Revenus d'activité sur l'année</th>
                  <th>Part au-delà de {euros(R.seuilCumul2027)}</th>
                  <th>Réduction de pension sur l'année</th>
                  <th>Soit, en moyenne par mois</th>
                </tr>
              </thead>
              <tbody>
                {E.revenusAnnuelsCumul.map((revenus) => (
                  <tr key={revenus}>
                    <td>{euros(revenus)}</td>
                    <td>{euros(Math.max(revenus - R.seuilCumul2027, 0))}</td>
                    <td>{euros(reductionAnnuelle(revenus))}</td>
                    <td>{euros(reductionAnnuelle(revenus) / 12)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Ce tableau applique la formule publiée, rien de plus ; les revenus bruts y servent
            d'approximation de l'assiette réellement retenue. Le décret n° 2026-1017 en
            précise les modalités : les revenus retenus pour un salarié sont ceux soumis à la
            CSG, ils sont proratisés si l'activité ne couvre pas toute l'année civile, la
            réduction ne peut pas dépasser le montant des pensions de la période, et elle est
            retenue par fractions sur les douze mois suivants sans pouvoir réduire une échéance
            de plus d'{R.limiteRetenueMensuelle}, le solde étant reporté. Elle s'impute d'abord
            sur les pensions de base, puis sur les complémentaires. Certaines activités échappent
            à la réduction ; la liste figure dans la fiche F13243.
          </p>
          <div className="note">
            <p>
              Deux sources officielles ne sont pas alignées à la date de cette page. Le décret n°
              2026-1017 fixe le seuil à sept mille euros « pour l'année 2027 », revalorisé
              ensuite chaque 1er janvier comme le plafond de la sécurité sociale ; la page
              « Cumuler emploi et retraite » de l'Assurance retraite présente encore ce montant au
              conditionnel, comme un seuil à fixer par décret. Le décret publié au Journal officiel
              fait foi. Par ailleurs, le projet de loi de financement de la sécurité sociale pour
              2027 n'est pas adopté au {R.maj} : rien n'interdit au législateur de retoucher ces
              règles avant ou après leur entrée en vigueur.
            </p>
          </div>
          <p>
            <strong>Et pour une retraite prise avant le 1er janvier 2027 ?</strong> La fiche
            F13243 maintient les deux formes actuelles. Le cumul intégral suppose une pension de
            base à taux plein et la liquidation de toutes ses retraites ; il ouvre, depuis le 1er
            janvier 2023, de nouveaux droits, dans la limite de {euros(plafondSecondePension)}{" "}
            bruts par an ({R.tauxPassSecondePension} % du plafond annuel de la sécurité sociale
            selon l'Assurance retraite). Le cumul plafonné s'applique sinon : le total des
            pensions et des revenus d'activité ne doit pas dépasser le plus élevé de deux
            montants, {R.tauxSmicCumulPlafonne} % du Smic ({eurosPrecis(R.plafondCumulPlafonneMensuel)}{" "}
            bruts par mois) ou le dernier salaire ; il ne crée aucun droit nouveau.
          </p>

          <h2 id="arbre">Comment s'orienter ? Trois questions à se poser</h2>
          <p>
            Trois questions suffisent à savoir quel dispositif est ouvert et sur quels critères
            les comparer. Elles orientent vers les bons points à vérifier ; elles ne désignent
            pas une solution, qui dépend de données que seuls vos relevés et vos caisses
            détiennent.
          </p>
          <ol>
            <li>
              <strong>Avez-vous déjà le droit de prendre votre retraite ?</strong>
              <br />
              Non (âge légal non atteint, pas de départ anticipé) : le cumul emploi-retraite
              n'est pas ouvert. La retraite progressive l'est si vous avez{" "}
              {R.ageRetraiteProgressive} ans, {R.trimestresRetraiteProgressive} trimestres et un
              temps partiel de {R.quotiteMin} % à {R.quotiteMax} %. Oui : les deux voies existent,
              passez à la question 2.
            </li>
            <li>
              <strong>Votre pension est-elle arrivée au niveau que vous visez ?</strong>
              <br />
              Si des trimestres manquent encore pour le taux plein, ou si vos dernières années
              pèsent sur le calcul, le critère est l'acquisition de droits : la retraite
              progressive laisse la pension ouverte à un recalcul, alors qu'une pension liquidée
              ne bouge plus (hors nouveaux droits du cumul, limités comme indiqué plus haut). Si
              la pension est déjà au niveau visé, ce critère pèse moins.
            </li>
            <li>
              <strong>Quel volume d'activité, et chez qui ?</strong>
              <br />
              La retraite progressive suppose un temps partiel encadré et la réponse de
              l'employeur. Le cumul laisse libre le choix de l'activité, mais la date d'effet de
              la pension décide de la règle : plafond ou taux plein avant le 1er janvier 2027,
              seuil de {euros(R.seuilCumul2027)} et réduction de {R.tauxReductionAuDela} % entre
              l'âge légal et {R.ageCumulLibre} ans à partir de cette date. Une activité ponctuelle
              et une activité à mi-temps ne conduisent pas au même résultat.
            </li>
          </ol>

          <h2 id="erreurs">Quelles erreurs éviter ?</h2>
          <p>
            Les erreurs les plus coûteuses viennent de la confusion entre les deux dispositifs,
            parce qu'une retraite définitive ne se défait pas.
          </p>
          <ul>
            <li>
              <strong>Croire que le cumul emploi-retraite est possible dès{" "}
              {R.ageRetraiteProgressive} ans.</strong> Il suppose une retraite déjà obtenue ;
              sans départ anticipé, cela renvoie à l'âge légal de sa génération.
            </li>
            <li>
              <strong>Demander sa retraite définitive pour « retravailler ensuite » sans regarder
              la date d'effet.</strong> Avant ou après le 1er janvier 2027, les règles du cumul
              ne sont pas les mêmes, et elles s'attachent à la date de la première pension.
            </li>
            <li>
              <strong>Considérer l'accord de l'employeur comme acquis d'avance, ou son refus
              comme libre.</strong> Le silence de {R.delaiReponseEmployeurMois} mois vaut accord,
              mais un refus écrit et motivé reste possible.
            </li>
            <li>
              <strong>Sortir de la fourchette de temps de travail.</strong> En dessous de{" "}
              {R.quotiteMin} % ou au-dessus de {R.quotiteMax} %, le versement est suspendu ; le
              retour à temps plein y met fin définitivement.
            </li>
            <li>
              <strong>Oublier que la retraite définitive se demande.</strong> La fin de la
              retraite progressive ne déclenche pas automatiquement la pension complète.
            </li>
            <li>
              <strong>Ne pas déclarer une reprise d'activité.</strong> Dans les deux régimes du
              cumul, la déclaration est attendue dans le mois ; à partir de 2027, la fiche F13243
              prévoit une suspension du paiement à titre conservatoire en l'absence de
              déclaration.
            </li>
            <li>
              <strong>Raisonner en brut sans regarder le net.</strong> Salaire et pension
              s'additionnent dans le revenu imposable ; l'effet sur l'impôt dépend de chaque
              foyer.
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on être en retraite progressive et en cumul emploi-retraite en même temps ?</h3>
          <p>
            Non, les deux se succèdent. La retraite progressive précède la retraite définitive ;
            selon la fiche F12842 de Service-Public, l'activité poursuivie ou reprise après la
            retraite définitive relève du cumul emploi-retraite.
          </p>
          <h3>Mon employeur peut-il refuser ma retraite progressive ?</h3>
          <p>
            Il peut refuser le passage à temps partiel, par écrit et en le motivant par
            l'incompatibilité de la durée demandée avec l'activité économique de l'entreprise
            (code du travail, article L. 3123-4-1). Sans réponse écrite et motivée dans les{" "}
            {R.delaiReponseEmployeurMois} mois, l'accord est réputé acquis.
          </p>
          <h3>Je suis déjà à temps partiel : dois-je changer quelque chose ?</h3>
          <p>
            Pas nécessairement. La fiche F12842 indique que la retraite progressive peut être
            demandée par un salarié déjà à temps partiel, si sa durée de travail est comprise
            entre {R.quotiteMin} % et {R.quotiteMax} % et que les conditions d'âge et de
            trimestres sont remplies.
          </p>
          <h3>La retraite progressive fait-elle baisser ma retraite définitive ?</h3>
          <p>
            La fiche F12842 indique que la pension complète ne peut pas être inférieure au
            montant provisoire calculé au départ. En revanche, cotiser sur un salaire réduit
            produit moins de droits qu'un temps complet, sauf cotisation sur la base d'un temps
            complet avec l'accord de l'employeur.
          </p>
          <h3>Combien peut-on gagner en cumul emploi-retraite sans perdre de pension en 2027 ?</h3>
          <p>
            Pour une première pension prenant effet à partir du 1er janvier 2027, entre l'âge
            légal et {R.ageCumulLibre} ans : {euros(R.seuilCumul2027)} de revenus d'activité et
            de remplacement par année civile. Au-delà, la pension est réduite de{" "}
            {R.tauxReductionAuDela} % du dépassement. À partir de {R.ageCumulLibre} ans, il n'y a
            plus de réduction.
          </p>
          <h3>Je prends ma retraite fin 2026 : quelles règles de cumul s'appliquent ?</h3>
          <p>
            Selon Service-Public (actualité A18914), les retraités ayant obtenu leur pension
            avant le 1er janvier 2027 restent soumis aux anciennes règles, même s'ils reprennent
            une activité en 2027. C'est la date d'effet de la première pension qui compte, à
            faire confirmer par sa caisse.
          </p>
          <h3>Les fonctionnaires ont-ils droit à la retraite progressive ?</h3>
          <p>
            Oui. La fiche F37400 de Service-Public retient {R.ageRetraiteProgressive} ans et{" "}
            {R.trimestresRetraiteProgressive} trimestres, avec un temps partiel de{" "}
            {R.quotiteMinFonctionPublique} % à {R.quotiteMaxFonctionPublique} % et une activité
            exercée à titre exclusif. Les agents contractuels suivent les conditions des salariés
            du privé pour la retraite, et celles de la fonction publique pour le temps partiel.
          </p>
          <h3>Quand faut-il déposer la demande de retraite progressive ?</h3>
          <p>
            La demande à l'employeur se fait au moins {R.delaiReponseEmployeurMois} mois avant
            la date souhaitée ; la demande aux caisses, via le service en ligne « Demander ma
            retraite progressive », au plus tôt {R.delaiDemandeCaisseMois} mois avant (fiche
            F12842), avec l'attestation
            complétée par l'employeur. Une seule demande vaut pour toutes les caisses.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Retraite progressive et cumul emploi-retraite ne répondent pas à la même question.
            La première aménage la fin de carrière et laisse la pension ouverte à un recalcul ;
            le second ajoute une activité à une pension définitive. À{" "}
            {R.ageRetraiteProgressive} ans, pour la plupart des salariés, seule la première est
            accessible.
          </p>
          <p>
            Ne pas faire cette distinction a un coût : une retraite liquidée trop tôt est
            définitive, et les règles applicables aux pensions prenant effet en 2027 réduisent la
            pension au-delà de {euros(R.seuilCumul2027)} de revenus annuels jusqu'à {R.ageCumulLibre}{" "}
            ans. À l'inverse, ignorer la retraite progressive peut conduire à travailler à temps
            partiel plusieurs années sans la fraction de pension à laquelle on avait droit.
          </p>
          <p>
            La suite logique consiste à rassembler les trois données qui commandent tout le
            reste : le nombre de trimestres validés, l'âge légal et l'âge du taux plein de votre
            génération, et l'estimation de pension de vos caisses. Notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> donne un premier ordre de
            grandeur de la pension et de l'écart avec le salaire, avant de solliciter les
            estimations officielles.
          </p>
          <p>
            Si vous souhaitez replacer cette transition dans une vue d'ensemble (pensions,
            épargne déjà constituée, revenu visé pendant et après la période à temps partiel),
            le <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à poser ce
            cadre général, relevé de carrière en main.
          </p>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées le {R.maj} :</p>
          <ul>
            {sources.map((src) => (
              <li key={src.url}>
                <a href={src.url} target="_blank" rel="noopener noreferrer">
                  {src.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seules vos
              caisses de retraite peuvent confirmer vos droits, votre date d'ouverture et le
              montant de vos pensions. Les règles citées sont celles publiées au {R.maj} ; les
              exemples chiffrés sont des illustrations pédagogiques en montants bruts, établies
              sur des hypothèses affichées, qui ne préjugent ni de votre situation ni des règles
              futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Lever le pied avant la retraite se prépare relevé de carrière en main." />
    </>
  );
}
