import { Link } from "react-router-dom";
import { REGIME_GENERAL, euros } from "../../components/hypotheses.js";

export const meta = {
  slug: "pourquoi-pension-retraite-plus-basse-que-prevu",
  type: "guide",
  big5: "problemes",
  categorie: "mecanique-retraite",
  title: "Pourquoi ma pension de retraite est-elle plus basse que prévu ?",
  description:
    "Décote, carrière à trous, 25 meilleures années, salaire plafonné : causes d'une pension plus basse qu'attendu, exemple chiffré, vérifications.",
  h1: "Pourquoi ma pension de retraite est-elle plus basse que prévu ?",
  resume:
    "Dans le régime général, une pension plus basse qu'attendu vient le plus souvent d'un taux réduit par la décote, de trimestres manquants, d'un salaire de référence (moyenne des 25 meilleures années) inférieur au dernier salaire, ou de revenus au-dessus du plafond de la Sécurité sociale qui ne comptent pas.",
  datePublication: "2026-10-20",
  dateMiseAJour: "2026-10-20",
  faq: [
    {
      q: "Pourquoi ma pension n'est-elle pas calculée sur mon dernier salaire ?",
      a: "Dans le régime général, la pension de base repose sur le salaire annuel moyen des 25 meilleures années, revalorisées et plafonnées. Un dernier salaire élevé pèse donc peu si les autres années sont plus basses.",
    },
    {
      q: "La décote s'applique-t-elle à tous les régimes ?",
      a: "Non, les règles diffèrent selon le régime d'affiliation (fonction publique, indépendants, régimes spéciaux). Cet article décrit le régime général de salariés ; vérifiez votre régime sur info-retraite.fr.",
    },
    {
      q: "Mon relevé de carrière peut-il contenir des erreurs ?",
      a: "Oui, des périodes ou des salaires peuvent manquer. Le relevé se consulte sur info-retraite.fr et se corrige auprès de la caisse concernée, pièces justificatives à l'appui.",
    },
    {
      q: "Peut-on améliorer sa pension avant de partir ?",
      a: "Selon la situation : racheter certains trimestres, décaler le départ, ou compléter par de l'épargne personnelle. Chaque levier a un coût et un effet différents, à chiffrer avant toute décision.",
    },
    {
      q: "La retraite complémentaire explique-t-elle aussi la baisse ?",
      a: "Elle suit un calcul distinct, en points, et peut aussi comporter des minorations en cas de départ anticipé. Les deux niveaux de pension se lisent séparément sur l'estimation de votre compte retraite.",
    },
  ],
  sources: [
    {
      label: "Service-public.gouv.fr : Préparer sa retraite (fiche vérifiée le 1er janvier 2026)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F17904",
    },
    {
      label: "Service-public.gouv.fr : Retraite du salarié, qu'est-ce que la décote ? (fiche vérifiée le 1er janvier 2026)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F19666",
    },
    {
      label: "Info Retraite : service public d'information sur la retraite",
      url: "https://www.info-retraite.fr/portail-services/",
    },
  ],
  liens: [
    "/guide/surcote-decote-retraite",
    "/guide/verifier-releve-de-carriere-retraite",
    "/guide/combien-coute-rachat-trimestres-retraite",
    "/simulateur-retraite",
  ],
};

// Barème officiel (service-public F19666) : taux plein 50 %, décote de 0,625 point
// par trimestre manquant, plafonnée à 20 trimestres. Ces trois valeurs sont des
// paramètres légaux vérifiés sur la source, distincts de hypotheses.js.
const TAUX_PLEIN = 50;
const DECOTE_POINT = 0.625;
const SAM = 30000; // salaire annuel moyen purement illustratif
const REQUIS = 170;
const VALIDES = 159;
const MANQUANTS = REQUIS - VALIDES;
const tauxDecote = TAUX_PLEIN - DECOTE_POINT * MANQUANTS;
const pensionPleine = SAM * (TAUX_PLEIN / 100);
const pensionReduite = SAM * (tauxDecote / 100) * (VALIDES / REQUIS);

export default function PourquoiPensionPlusBasse() {
  return (
    <>
      <p>
        L'écart entre la pension imaginée et la pension annoncée surprend beaucoup d'assurés, et il
        s'explique rarement par une seule cause. Cet article décrit les mécanismes du régime
        général de salariés ; chaque régime a ses propres règles.
      </p>

      <h2>Sur quoi la pension de base est-elle calculée ?</h2>
      <p>
        <strong>
          Sur le salaire annuel moyen des 25 meilleures années, multiplié par un taux ({TAUX_PLEIN} %
          au maximum) et proportionné aux trimestres validés.
        </strong>
      </p>
      <p>
        Selon service-public (fiche vérifiée le 1er janvier 2026), le salaire de référence est
        plafonné au plafond de la Sécurité sociale et moyenné sur 25 années : un dernier salaire
        élevé ne suffit pas à tirer la moyenne. Beaucoup d'assurés comparent leur pension à leur
        dernier salaire, alors que la formule ne le fait pas.
      </p>

      <h2>Comment la décote réduit-elle le taux ?</h2>
      <p>
        <strong>
          Chaque trimestre manquant retire {DECOTE_POINT.toLocaleString("fr-FR")} point au taux de{" "}
          {TAUX_PLEIN} %, dans la limite de {REGIME_GENERAL.decotePlafondTrimestres} trimestres.
        </strong>
      </p>
      <p>
        La décote ne s'applique plus à {REGIME_GENERAL.ageTauxPleinAutomatique} ans, âge auquel le
        taux plein est acquis quel que soit le nombre de trimestres (service-public, fiche sur la
        décote). Exemple purement illustratif, qui ne correspond à aucun cas réel :
      </p>
      <table>
        <thead>
          <tr>
            <th>Hypothèse ou résultat</th>
            <th>Valeur</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Salaire annuel moyen</td>
            <td>{euros(SAM)} brut</td>
          </tr>
          <tr>
            <td>Trimestres requis / validés</td>
            <td>
              {REQUIS} / {VALIDES}
            </td>
          </tr>
          <tr>
            <td>Pension si la durée requise était atteinte (taux plein)</td>
            <td>{euros(pensionPleine)} brut par an</td>
          </tr>
          <tr>
            <td>
              Pension avec {MANQUANTS} trimestres manquants (taux {tauxDecote.toLocaleString("fr-FR")} %)
            </td>
            <td>{euros(pensionReduite)} brut par an</td>
          </tr>
        </tbody>
      </table>
      <p>
        Formule : salaire annuel moyen × taux × trimestres validés / trimestres requis. Le détail
        des deux mécanismes figure dans{" "}
        <Link to="/guide/surcote-decote-retraite">notre guide sur la surcote et la décote</Link>.
      </p>

      <h2>Une carrière incomplète pèse-t-elle seule ?</h2>
      <p>
        <strong>
          Non, mais chaque période sans validation réduit à la fois le nombre de trimestres et la
          qualité de la moyenne.
        </strong>
      </p>
      <p>
        Études, années à temps partiel, chômage non indemnisé ou expatriation laissent des trous.
        Certains peuvent être rachetés, d'autres corrigés. Avant d'en tirer une conclusion,
        assurez-vous que votre relevé est complet : notre guide{" "}
        <Link to="/guide/verifier-releve-de-carriere-retraite">pour vérifier le relevé de carrière</Link>{" "}
        propose la démarche, et le coût d'un rachat est traité dans{" "}
        <Link to="/guide/combien-coute-rachat-trimestres-retraite">cet article dédié</Link>.
      </p>

      <h2>Pourquoi les hauts revenus sont-ils souvent les plus surpris ?</h2>
      <p>
        <strong>
          Parce que la base de calcul est plafonnée : la part des revenus au-delà du plafond de la
          Sécurité sociale ne nourrit pas la pension de base.
        </strong>
      </p>
      <p>
        Le taux de remplacement d'un salarié bien au-dessus du plafond est donc plus bas que celui
        d'un salarié proche du plafond, et la retraite complémentaire ne compense qu'en partie.
        Mesurez l'écart avec le <Link to="/simulateur-retraite">simulateur retraite</Link> avant
        d'envisager un complément d'épargne.
      </p>

      <h2>Quelles vérifications faire en premier ?</h2>
      <p>
        <strong>
          Consulter le relevé de carrière et l'estimation sur info-retraite.fr, puis comparer ligne
          à ligne aux causes ci-dessus.
        </strong>
      </p>
      <ol>
        <li>Relevé de carrière : toutes les années et tous les employeurs apparaissent-ils ?</li>
        <li>Trimestres requis pour votre année de naissance, comparés aux trimestres validés.</li>
        <li>Âge de départ envisagé par rapport à l'âge du taux plein.</li>
        <li>Estimation du régime général et des régimes complémentaires, lues séparément.</li>
      </ol>

      <h2>En résumé</h2>
      <p>
        Une pension plus basse que prévu s'explique d'abord par la formule : moyenne sur 25 ans,
        plafonnement, décote, trimestres manquants. Douter de ce que l'on lit sur une estimation est
        sain ; la réponse est de vérifier chaque ligne, pas de s'en remettre à un chiffre global.
        Notre rédaction publie ces mécanismes avec leurs sources pour que le diagnostic vous
        appartienne. Pour chiffrer l'écart, commencez par le{" "}
        <Link to="/simulateur-retraite">simulateur retraite</Link>, puis, si besoin, par le{" "}
        <Link to="/bilan-retraite">bilan retraite</Link>.
      </p>
    </>
  );
}
