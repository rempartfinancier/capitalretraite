import { Link } from "react-router-dom";
import { REGIME_GENERAL } from "../../components/hypotheses.js";

export const meta = {
  slug: "age-legal-retraite-suspension-reforme-generations-1964-1969",
  type: "actualite",
  big5: "actu",
  categorie: "actu",
  title: "Âge légal de départ : suspension de la réforme, tableau 1964-1969",
  description:
    "La loi de financement de la Sécurité sociale pour 2026 décale la montée en charge de la réforme de 2023. Âge légal et trimestres par génération, sourcés.",
  h1: "Âge légal de départ à la retraite : que change la suspension de la réforme de 2023 pour les générations 1964 à 1969 ?",
  resume:
    "La loi de financement de la Sécurité sociale pour 2026 (30 décembre 2025) a décalé d'une génération la montée en charge de la réforme de 2023 : l'âge légal reste à 62 ans et 9 mois pour la génération 1964 et la durée requise passe à 170 trimestres, avec des effets sur les générations suivantes, jusqu'à 64 ans pour les nés à partir de 1969.",
  datePublication: "2025-12-30",
  dateMiseAJour: "2026-10-20",
  faq: [
    {
      q: "Quel est l'âge légal de départ pour les générations 1966, 1967 et 1968 ?",
      a: "Pour les salariés du secteur privé, selon le tableau de service-public.gouv.fr vérifié le 1er janvier 2026 : 63 ans et 3 mois pour 1966, 63 ans et 6 mois pour 1967, 63 ans et 9 mois pour 1968, avec 172 trimestres requis pour le taux plein. À partir de la génération 1969, l'âge légal est de 64 ans.",
    },
    {
      q: "Ces règles valent-elles pour les fonctionnaires ?",
      a: "Les tableaux consultés concernent les salariés du secteur privé. Les régimes de la fonction publique et les régimes spéciaux ont leurs propres paramètres : vérifiez-les auprès de votre caisse ou sur info-retraite.fr, car nous ne les avons pas détaillés ici.",
    },
    {
      q: "Peut-on partir avant 67 ans sans décote si l'on n'a pas tous ses trimestres ?",
      a: "Non, un départ avant 67 ans sans le nombre de trimestres requis entraîne une décote. À 67 ans, le taux plein est acquis automatiquement dans le régime général, selon service-public.gouv.fr.",
    },
    {
      q: "La suspension de 2023 est-elle définitive ?",
      a: "Les sources consultées décrivent un décalage de la montée en charge : elle reprend ensuite pour les générations suivantes (le COR parle d'une suspension pour la génération 1964 et les assurés nés du 1er janvier au 31 mars 1965).",
    },
  ],
  sources: [
    {
      label: "Assurance retraite : mesures retraite de la loi de financement de la Sécurité sociale pour 2026",
      url: "https://www.lassuranceretraite.fr/portail-info/hors-menu/actualites-nationales/actif/2025/projet-de-loi-les-mesures-envisa.html",
    },
    {
      label: "service-public.gouv.fr : nombre de trimestres et âge de départ selon l'année de naissance (vérifié le 1er janvier 2026)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1761",
    },
    {
      label: "Assurance retraite : carrière longue, quels changements avec la suspension",
      url: "https://www.lassuranceretraite.fr/portail-info/hors-menu/actualites-nationales/actif/2026/carriere-longue-quels-changement.html",
    },
    {
      label: "COR : rapport annuel de juin 2026",
      url: "https://www.cor-retraites.fr/rapports-du-cor/rapport-annuel-cor-juin-2026-evolutions-perspectives-retraites-france",
    },
  ],
  liens: [
    "/guide/surcote-decote-retraite",
    "/guide/combien-coute-rachat-trimestres-retraite",
    "/guide/verifier-releve-de-carriere-retraite",
    "/simulateur-retraite",
    "/bilan-retraite",
  ],
};

export default function ActuAgeLegalSuspension2026() {
  return (
    <>
      <h2>1. Ce qui change</h2>
      <p>
        La loi de financement de la Sécurité sociale pour 2026 (loi n° 2025-1403 du 30 décembre 2025)
        suspend la montée en charge de la réforme des retraites de 2023, en la décalant d'une
        génération. Selon l'Assurance retraite, les nouveaux paramètres s'appliquent depuis le 1er
        septembre 2026. Concrètement, l'âge légal de la génération 1964 reste à 62 ans et 9 mois au
        lieu de 63 ans, et la durée d'assurance requise pour le taux plein est de 170 trimestres au
        lieu de 171.
      </p>

      <h2>2. Pour qui</h2>
      <p>
        Les générations nées de 1964 à 1968 voient leur âge légal abaissé d'un à deux trimestres par
        rapport au calendrier de 2023 ; les générations nées à partir de 1969 restent à 64 ans. Si vous avez
        entre 45 et 60 ans en 2026, vous êtes né entre 1966 et 1981 : les générations 1966 à 1968 sont
        directement concernées par le décalage, les suivantes par le plafond de 64 ans.
      </p>
      <p>
        Les tableaux ci-dessous valent pour les salariés du secteur privé. Si vous relevez de la
        fonction publique, d'un régime spécial ou d'un régime d'indépendant, consultez votre caisse :
        les paramètres peuvent différer et n'ont pas été vérifiés dans cet article.
      </p>

      <h2>3. Chiffres sourcés et datés</h2>
      <p>
        Âge légal et durée d'assurance pour le taux plein, salariés du secteur privé (service-public.gouv.fr,
        page vérifiée le 1er janvier 2026, et Assurance retraite, 2026) :
      </p>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Année de naissance</th>
              <th>Âge légal</th>
              <th>Trimestres pour le taux plein</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1964</td>
              <td>62 ans et 9 mois (au lieu de 63 ans)</td>
              <td>170 (au lieu de 171)</td>
            </tr>
            <tr>
              <td>1966</td>
              <td>63 ans et 3 mois (au lieu de 63 ans et 6 mois)</td>
              <td>172</td>
            </tr>
            <tr>
              <td>1967</td>
              <td>63 ans et 6 mois (au lieu de 63 ans et 9 mois)</td>
              <td>172</td>
            </tr>
            <tr>
              <td>1968</td>
              <td>63 ans et 9 mois (au lieu de 64 ans)</td>
              <td>172</td>
            </tr>
            <tr>
              <td>À partir de 1969</td>
              <td>64 ans</td>
              <td>172</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Pour les assurés nés en 1965, l'Assurance retraite distingue deux cas : du 1er janvier au 31
        mars 1965, 62 ans et 9 mois et 170 trimestres ; du 1er avril au 31 décembre 1965, 63 ans et
        171 trimestres.
      </p>
      <p>
        Au niveau d'ensemble, le COR (rapport annuel du 11 juin 2026) projette un âge moyen de départ
        à la retraite de 63,1 ans en 2025, passant à 64,6 ans en 2070, en tenant compte de la
        suspension, et estime son coût à 1,8 milliard d'euros en moyenne en année pleine jusqu'en 2032.
      </p>

      <h2>4. Ce que cela ne change pas</h2>
      <ul>
        <li>
          <strong>L'âge du taux plein automatique</strong> : il reste fixé à {REGIME_GENERAL.ageTauxPleinAutomatique} ans
          dans le régime général ; avant cet âge, un départ sans la durée requise entraîne une décote de{" "}
          {REGIME_GENERAL.decoteParTrimestre.toLocaleString("fr-FR")} % par trimestre manquant, dans
          la limite de {REGIME_GENERAL.decotePlafondTrimestres} trimestres (paramètres légaux, voir{" "}
          <Link to="/guide/surcote-decote-retraite">surcote et décote</Link>).
        </li>
        <li>
          <strong>La durée de 172 trimestres</strong> reste requise pour les générations nées à partir
          de 1966.
        </li>
        <li>
          <strong>Votre droit individuel</strong> : seuls votre relevé de carrière et votre régime
          permettent de connaître votre date de départ précise. Un cas particulier (carrière longue, par
          exemple) suit d'autres règles.
        </li>
      </ul>

      <h2>5. Pour aller plus loin</h2>
      <ul>
        <li>
          <Link to="/guide/verifier-releve-de-carriere-retraite">Vérifier votre relevé de carrière</Link> :
          nombre de trimestres déjà validés.
        </li>
        <li>
          <Link to="/guide/surcote-decote-retraite">Surcote et décote</Link> : ce que coûte ou rapporte
          un départ plus tôt ou plus tard.
        </li>
        <li>
          <Link to="/guide/combien-coute-rachat-trimestres-retraite">Rachat de trimestres</Link> : ce
          qu'il coûte, et ses limites.
        </li>
      </ul>

      <h2>En résumé</h2>
      <p>
        La suspension de la réforme de 2023 abaisse l'âge légal de plusieurs
        générations d'un à deux trimestres ; elle ne supprime ni la durée de 172 trimestres pour les générations 1966 et
        suivantes, ni la décote avant 67 ans. Un petit pas utile : vérifier votre relevé de carrière
        et comparer avec le tableau de votre génération, puis estimer avec{" "}
        <Link to="/simulateur-retraite">le simulateur retraite</Link> l'écart éventuel de revenu à
        couvrir. Si vous souhaitez ensuite un regard extérieur, un{" "}
        <Link to="/bilan-retraite">bilan retraite gratuit de 15 minutes</Link> est possible. Cette
        page est informative et ne constitue pas un conseil personnalisé.
      </p>
    </>
  );
}
