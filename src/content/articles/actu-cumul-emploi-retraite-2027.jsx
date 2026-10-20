import { Link } from "react-router-dom";
import { REGIME_GENERAL } from "../../components/hypotheses.js";

export const meta = {
  slug: "cumul-emploi-retraite-nouvelles-regles-2027",
  type: "actualite",
  big5: "actu",
  categorie: "actu",
  title: "Cumul emploi-retraite 2027 : les nouvelles règles selon l'âge",
  description:
    "À partir du 1er janvier 2027, le cumul emploi-retraite dépend de l'âge : déduction intégrale avant l'âge légal, seuil puis 50 % jusqu'à 67 ans. Décret attendu.",
  h1: "Cumul emploi-retraite en 2027 : ce que changent les nouvelles règles pour ceux qui partent à partir du 1er janvier 2027",
  resume:
    "Pour les premières retraites prenant effet à partir du 1er janvier 2027, la distinction entre cumul intégral et cumul plafonné disparaît : seul l'âge compte, avec un seuil de revenus d'environ 7 000 euros bruts par an entre l'âge légal et 67 ans, à confirmer par un décret non publié à la date de rédaction.",
  datePublication: "2026-05-22",
  dateMiseAJour: "2026-10-20",
  faq: [
    {
      q: "Les règles de 2027 s'appliquent-elles aux personnes déjà retraitées ?",
      a: "Non. Selon l'Assurance retraite, les personnes parties à la retraite avant 2027 conservent les règles actuelles, même si elles reprennent une activité plus tard. Les nouvelles règles concernent les premières retraites prenant effet à partir du 1er janvier 2027.",
    },
    {
      q: "Le seuil de 7 000 euros est-il définitif ?",
      a: "Pas à la date de rédaction. Service-public.gouv.fr et l'Assurance retraite indiquent que le seuil sera fixé par décret ; la somme de 7 000 euros bruts par an est présentée comme possible. Les modalités de récupération des sommes au-delà du seuil relèveront aussi du décret.",
    },
    {
      q: "Les périodes travaillées peuvent-elles donner droit à une seconde retraite ?",
      a: "Selon l'Assurance retraite, pas avant 67 ans : avant l'âge légal comme entre l'âge légal et 67 ans, ces périodes ne donnent pas lieu à une seconde retraite. À partir de 67 ans, le cumul est sans limite et l'activité ouvre droit à une seconde pension.",
    },
    {
      q: "Existe-t-il un simulateur officiel ?",
      a: "L'Assurance retraite annonce un simulateur pour estimer une éventuelle réduction de pension, disponible dans le courant du premier trimestre 2027.",
    },
  ],
  sources: [
    {
      label: "service-public.gouv.fr : nouvelles règles de cumul emploi-retraite à partir de 2027 (22 mai 2026)",
      url: "https://www.service-public.gouv.fr/particuliers/actualites/A18914",
    },
    {
      label: "Assurance retraite : cumuler emploi et retraite (2026)",
      url: "https://www.lassuranceretraite.fr/portail-info/hors-menu/actualites-nationales/actif/2026/cumuler-emploi-et-retraite.html",
    },
    {
      label: "Assurance retraite : mesures retraite de la loi de financement de la Sécurité sociale pour 2026",
      url: "https://www.lassuranceretraite.fr/portail-info/hors-menu/actualites-nationales/actif/2025/projet-de-loi-les-mesures-envisa.html",
    },
  ],
  liens: [
    "/guide/cumul-emploi-retraite-comment-ca-marche",
    "/guide/surcote-decote-retraite",
    "/guide/verifier-releve-de-carriere-retraite",
    "/simulateur-retraite",
    "/bilan-retraite",
  ],
};

export default function ActuCumulEmploiRetraite2027() {
  return (
    <>
      <h2>1. Ce qui change</h2>
      <p>
        La loi de financement de la Sécurité sociale pour 2026 réforme le cumul emploi-retraite à
        compter du 1er janvier 2027. Selon service-public.gouv.fr (actualité du 22 mai 2026), la
        distinction entre « cumul intégral » et « cumul plafonné » disparaît : seul l'âge compte.
      </p>
      <ul>
        <li>
          <strong>Avant l'âge légal</strong> (par exemple en carrière longue) : tous les revenus
          d'activité et de remplacement sont déduits de la pension, dès le premier euro.
        </li>
        <li>
          <strong>Entre l'âge légal et {REGIME_GENERAL.ageTauxPleinAutomatique} ans</strong> : vous
          conservez la totalité de votre pension si vos revenus d'activité et de remplacement restent
          à 7 000 euros bruts par an ou moins ; au-delà, la pension est réduite de 50 % du
          dépassement. Ce seuil est donné comme attendu par décret, non publié à la date de
          rédaction.
        </li>
        <li>
          <strong>À partir de {REGIME_GENERAL.ageTauxPleinAutomatique} ans</strong> : cumul sans
          plafond, et l'activité ouvre droit à une seconde pension.
        </li>
      </ul>
      <p>
        L'Assurance retraite ajoute que le délai de carence de six mois en cas de reprise chez le même
        employeur est supprimé.
      </p>

      <h2>2. Pour qui</h2>
      <p>
        Les règles concernent les assurés dont la première retraite prend effet à partir du 1er
        janvier 2027. Les retraités partis avant cette date gardent les règles actuelles. Pour un
        cadre ou un fonctionnaire de 55 à 60 ans qui envisage un départ progressif ou un complément
        d'activité, la date d'effet de la première pension est donc déterminante. Les pages officielles
        consultées décrivent la situation du régime général : si vous relevez d'un autre régime
        (fonction publique, régimes spéciaux, indépendants), renseignez-vous auprès de votre caisse.
      </p>

      <h2>3. Chiffres sourcés et datés</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Situation</th>
              <th>Règle à partir du 1er janvier 2027</th>
              <th>Seconde retraite ?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Avant l'âge légal</td>
              <td>Revenus déduits de la pension dès le premier euro</td>
              <td>Non</td>
            </tr>
            <tr>
              <td>De l'âge légal à {REGIME_GENERAL.ageTauxPleinAutomatique} ans</td>
              <td>Pension intacte jusqu'à un seuil de 7 000 € bruts par an (à confirmer par décret) ; au-delà, réduction de 50 % du dépassement</td>
              <td>Non</td>
            </tr>
            <tr>
              <td>À partir de {REGIME_GENERAL.ageTauxPleinAutomatique} ans</td>
              <td>Cumul sans plafond</td>
              <td>Oui</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Exemple de l'Assurance retraite, avec un seuil de 7 000 euros : pour 10 000 euros de revenus,
        soit 3 000 euros au-dessus du seuil, la pension diminue de 1 500 euros (50 % de 3 000 euros).
      </p>

      <h2>4. Ce que cela ne change pas</h2>
      <ul>
        <li>
          <strong>Les retraités déjà partis</strong> conservent les règles actuelles.
        </li>
        <li>
          <strong>Le montant du seuil et les modalités de récupération</strong> ne sont pas arrêtés :
          ils dépendent d'un décret dont la parution est annoncée, mais qui n'était pas publié à la
          date de rédaction.
        </li>
        <li>
          <strong>Les autres dispositifs de fin de carrière</strong> (retraite progressive, surcote)
          restent possibles : voir <Link to="/guide/surcote-decote-retraite">surcote et décote</Link>.
        </li>
      </ul>

      <h2>5. Pour aller plus loin</h2>
      <ul>
        <li>
          <Link to="/guide/cumul-emploi-retraite-comment-ca-marche">Cumul emploi-retraite : comment
          ça marche ?</Link> (le guide de fond ; il décrit le mécanisme avant la réforme, à lire avec la
          date d'effet en tête).
        </li>
        <li>
          <Link to="/guide/surcote-decote-retraite">Surcote et décote</Link> : l'alternative consistant
          à travailler plus longtemps.
        </li>
        <li>
          <Link to="/guide/verifier-releve-de-carriere-retraite">Vérifier votre relevé de carrière</Link>.
        </li>
      </ul>

      <h2>En résumé</h2>
      <p>
        À partir du 1er janvier 2027, le cumul emploi-retraite dépend de l'âge : tout est déduit avant
        l'âge légal, un seuil puis 50 % du dépassement ensuite, et plus de limite à partir de{" "}
        {REGIME_GENERAL.ageTauxPleinAutomatique} ans. Tant que le décret n'est pas publié, les montants
        restent provisoires. Un petit pas utile : identifier la date d'effet possible de votre première
        pension, avec <Link to="/simulateur-retraite">le simulateur retraite</Link>, avant de
        considérer un complément d'activité. Si vous souhaitez ensuite un regard extérieur, un{" "}
        <Link to="/bilan-retraite">bilan retraite gratuit de 15 minutes</Link> est possible. Cette
        page est informative et ne constitue pas un conseil personnalisé.
      </p>
    </>
  );
}
