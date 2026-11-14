import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { AGIRC_ARRCO, AGIRC_ARRCO_EXEMPLES, euros, pct } from "../components/hypotheses.js";

// ---- Formats locaux (points et valeurs de point : décimales nécessaires) ----
const nb = (n, decimales = 2) =>
  n.toLocaleString("fr-FR", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
const eurosPrecis = (n, decimales = 2) => nb(n, decimales) + " €";
const pct1 = (n) => nb(n, 1) + " %";
const arrondi2 = (n) => Math.round(n * 100) / 100;

// ---- Mécanique Agirc-Arrco : tout est recalculé depuis hypotheses.js ----
const A = AGIRC_ARRCO;
const pass = A.pass2026;
const plafondT2 = pass * A.multiplePassTranche2;

const assietteT1 = (salaire) => Math.min(salaire, pass);
const assietteT2 = (salaire) => Math.max(Math.min(salaire, plafondT2) - pass, 0);
const cotisationReferenceT1 = (salaire) => (assietteT1(salaire) * A.tauxCalculPointsT1) / 100;
const cotisationReferenceT2 = (salaire) => (assietteT2(salaire) * A.tauxCalculPointsT2) / 100;
const pointsT1 = (salaire) => arrondi2(cotisationReferenceT1(salaire) / A.valeurAchatPoint2026);
const pointsT2 = (salaire) => arrondi2(cotisationReferenceT2(salaire) / A.valeurAchatPoint2026);
const pointsAnnee = (salaire) => pointsT1(salaire) + pointsT2(salaire);
const pensionAnnuelle = (points) => points * A.valeurServicePoint;

// Cotisations réellement prélevées (parts salariale et patronale réunies).
const cotisationsPrelevees = (salaire) =>
  (assietteT1(salaire) * (A.tauxCotisationT1.global + A.cegT1.global)) / 100 +
  (assietteT2(salaire) * (A.tauxCotisationT2.global + A.cegT2.global)) / 100 +
  (salaire > pass ? (Math.min(salaire, plafondT2) * A.cet.global) / 100 : 0);

// ---- Exemple pas à pas ----
const E = AGIRC_ARRCO_EXEMPLES;
const s = E.salaireBrutPasAPas;
const exPointsT1 = pointsT1(s);
const exPointsT2 = pointsT2(s);
const exPoints = exPointsT1 + exPointsT2;
const exPension = pensionAnnuelle(exPoints);
const exCotisationsReference = cotisationReferenceT1(s) + cotisationReferenceT2(s);
const exCotisationsPrelevees = cotisationsPrelevees(s);

// Pension annuelle acquise pour 100 € de cotisation de référence, puis pour 100 € prélevés
// au titre de la seule cotisation de retraite (taux d'appel de 127 %).
const pensionPour100Reference = (100 / A.valeurAchatPoint2026) * A.valeurServicePoint;
const pensionPour100Appeles = pensionPour100Reference / (A.tauxAppel / 100);

// ---- Ordre de grandeur théorique sur une carrière complète à salaire constant ----
const retraiteDeBaseTheorique = (salaire) =>
  (Math.min(salaire, pass) * A.tauxPleinRetraiteDeBase) / 100;
const complementaireTheorique = (salaire) =>
  pensionAnnuelle(pointsAnnee(salaire)) * E.dureeCarriereAnnees;
const retraiteDeBaseMaximale = (pass * A.tauxPleinRetraiteDeBase) / 100;

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Retraite complémentaire du salarié du secteur privé (Agirc-Arrco), fiche F15396, vérifiée le 1er novembre 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F15396",
  },
  {
    label:
      "Agirc-Arrco — Circulaire 2025-16-SG-DRJ du 30 octobre 2025, « Paramètres 2026 » (tranches, taux, valeur d'achat du point)",
    url: "https://www.agirc-arrco.fr/storage/CirculaireAgircArrco2025-16sg-drj.pdf",
  },
  {
    label:
      "Agirc-Arrco — Communiqué du 14 octobre 2026 : revalorisation de 1,4 % des retraites complémentaires au 1er novembre 2026",
    url: "https://www.agirc-arrco.fr/nous-connaitre/nos-actualites/retraites-complementaires-agirc-arrco-une-revalorisation-de-14-au-1er-novembre-2026/",
  },
  {
    label:
      "Agirc-Arrco — Les coefficients de minoration applicables à la retraite complémentaire (édition de septembre 2026)",
    url: "https://www.agirc-arrco.fr/storage/2024/10/Coefficients-de-minorations-AA.pdf",
  },
  {
    label: "Agirc-Arrco — Décrypter : la majoration pour enfants (édition 2025)",
    url: "https://www.agirc-arrco.fr/storage/2025/03/Decrypter_Majoration-pour-enfants.pdf",
  },
  {
    label:
      "Service-Public.gouv.fr — Retraite du salarié du secteur privé : montant de la pension de base, fiche F21552, vérifiée le 1er septembre 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F21552",
  },
  {
    label:
      "La finance pour tous (Institut pour l'éducation financière du public) — Retraite complémentaire : fin du bonus-malus Agirc-Arrco, 12 avril 2024",
    url: "https://www.lafinancepourtous.com/2024/04/12/retraite-complementaire-fin-du-bonus-malus-agirc-arrco/",
  },
];

export default function GuideAgircArrcoCadres() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide problème · Retraite des cadres</span>
          <h1>Retraite complémentaire Agirc-Arrco des cadres : comment est-elle calculée ?</h1>
          <p className="sub">
            Du salaire aux points, des points à la pension : le calcul pas à pas, avec les
            paramètres 2026. Mis à jour le {A.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> la retraite complémentaire Agirc-Arrco est égale au
              nombre de points acquis pendant la carrière multiplié par la valeur de service du
              point, soit {eurosPrecis(A.valeurServicePoint, 4)} depuis le 1er novembre 2026.
              Chaque année, les points s'obtiennent en appliquant{" "}
              {pct(A.tauxCalculPointsT1)} au salaire jusqu'à {euros(pass)} et{" "}
              {pct(A.tauxCalculPointsT2)} au-delà, puis en divisant par la valeur d'achat du point
              ({eurosPrecis(A.valeurAchatPoint2026, 4)} en 2026). À titre d'illustration, une année
              à {euros(s)} bruts rapporte environ {nb(exPoints, 0)} points, soit{" "}
              {euros(exPension)} de pension brute par an.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#formule">Comment est calculée la retraite complémentaire Agirc-Arrco ?</a></li>
              <li><a href="#parametres">Quels sont les paramètres Agirc-Arrco en 2026 ?</a></li>
              <li><a href="#exemple">Combien de points pour un salaire de cadre ? L'exemple pas à pas</a></li>
              <li><a href="#pension">Combien rapportent 5 000, 8 000 ou 12 000 points Agirc-Arrco ?</a></li>
              <li><a href="#cotisations">Pourquoi toutes les cotisations ne donnent-elles pas des points ?</a></li>
              <li><a href="#decevant">Pourquoi la retraite d'un cadre remplace-t-elle moins bien son salaire ?</a></li>
              <li><a href="#minoration">Quand la retraite complémentaire est-elle minorée ?</a></li>
              <li><a href="#verifier">Comment vérifier son nombre de points Agirc-Arrco ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Beaucoup de cadres découvrent le sujet tard, en ouvrant leur première estimation de
            retraite : la pension annoncée paraît faible au regard du dernier salaire, et la ligne
            « Agirc-Arrco » affiche un nombre de points dont on ne sait pas quoi faire. Est-ce
            beaucoup, 9 000 points ? Pourquoi des cotisations si lourdes sur la fiche de paie
            pour ce résultat ? Et que se passe-t-il si l'on part avant d'avoir tous ses
            trimestres ?
          </p>
          <p>
            L'Agirc-Arrco est le régime de retraite complémentaire obligatoire des salariés du
            secteur privé, cadres et non-cadres. Il fonctionne par points : les cotisations d'une
            année sont converties en points, et les points accumulés sont convertis en pension au
            moment du départ. Pour un cadre, il pèse particulièrement lourd, parce que la retraite
            de base ne tient compte du salaire que jusqu'au plafond de la sécurité sociale. Ce
            guide déroule le calcul avec les paramètres en vigueur au {A.maj}, sur un exemple
            chiffré, puis explique pourquoi le résultat déçoit souvent et où vérifier ses propres
            chiffres. Il décrit une mécanique générale, pas votre situation.
          </p>

          <h2 id="formule">Comment est calculée la retraite complémentaire Agirc-Arrco ?</h2>
          <p>
            <strong>
              La pension annuelle brute Agirc-Arrco est égale au nombre total de points acquis
              multiplié par la valeur de service du point à la date du versement, soit{" "}
              {eurosPrecis(A.valeurServicePoint, 4)} depuis le 1er novembre 2026.
            </strong>{" "}
            Aucune référence aux « meilleures années » ni au dernier salaire : chaque année de
            carrière compte, y compris les années de début à faible salaire.
          </p>
          <p>Le calcul tient en quatre étapes, que nous résumons ainsi : Salaire → Tranches → Points → Pension.</p>
          <ol>
            <li>
              <strong>Découper le salaire brut de l'année en deux tranches.</strong> La tranche 1
              va de 0 à 1 plafond annuel de la sécurité sociale (PASS), soit {euros(pass)} en
              2026. La tranche 2 va de 1 à {A.multiplePassTranche2} PASS, soit de {euros(pass)} à{" "}
              {euros(plafondT2)}.
            </li>
            <li>
              <strong>Appliquer le taux de calcul des points à chaque tranche :</strong>{" "}
              {pct(A.tauxCalculPointsT1)} sur la tranche 1, {pct(A.tauxCalculPointsT2)} sur la
              tranche 2 (parts salariale et patronale réunies).
            </li>
            <li>
              <strong>Diviser par la valeur d'achat du point</strong> (aussi appelée salaire de
              référence), fixée à {eurosPrecis(A.valeurAchatPoint2026, 4)} depuis le 1er janvier
              2026. Le résultat est le nombre de points de l'année.
            </li>
            <li>
              <strong>Au départ en retraite, multiplier le total des points par la valeur de
              service du point.</strong>{" "}
              Le produit est la pension annuelle brute, versée par mensualités.
            </li>
          </ol>
          <p>
            Depuis la fusion de l'Agirc et de l'Arrco au 1er janvier 2019, ces règles sont les
            mêmes pour tous les salariés du privé. Ce qui distingue un cadre n'est donc plus son
            statut mais son niveau de salaire : dès que la rémunération dépasse le PASS, une part
            croissante des droits se constitue sur la tranche 2. Les points acquis avant 2019
            auprès des anciens régimes ont été repris dans le compte de points unique.
          </p>

          <h2 id="parametres">Quels sont les paramètres Agirc-Arrco en 2026 ?</h2>
          <p>
            <strong>
              En 2026, un point Agirc-Arrco s'achète {eurosPrecis(A.valeurAchatPoint2026, 4)} et
              rapporte {eurosPrecis(A.valeurServicePoint, 4)} de pension brute par an ; les points
              se calculent à {pct(A.tauxCalculPointsT1)} du salaire jusqu'à {euros(pass)} et à{" "}
              {pct(A.tauxCalculPointsT2)} entre {euros(pass)} et {euros(plafondT2)}.
            </strong>{" "}
            Ces valeurs proviennent de la circulaire Agirc-Arrco 2025-16 du 30 octobre 2025
            (paramètres 2026) et, pour la valeur de service, de la décision du conseil
            d'administration du 14 octobre 2026, reprise par la fiche Service-Public F15396.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Paramètre</th>
                  <th>Valeur</th>
                  <th>Date d'effet de la valeur citée</th>
                  <th>À quoi il sert</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Plafond annuel de la sécurité sociale (PASS)</td>
                  <td>{euros(pass)} ({euros(pass / 12)} par mois)</td>
                  <td>1er janvier 2026</td>
                  <td>Sépare la tranche 1 de la tranche 2</td>
                </tr>
                <tr>
                  <td>Limite supérieure de la tranche 2</td>
                  <td>{euros(plafondT2)} ({A.multiplePassTranche2} PASS)</td>
                  <td>1er janvier 2026</td>
                  <td>Au-delà, le salaire ne donne plus de points</td>
                </tr>
                <tr>
                  <td>Taux de calcul des points, tranche 1</td>
                  <td>{pct(A.tauxCalculPointsT1)}</td>
                  <td>Paramètres au 1er janvier 2026</td>
                  <td>Part du salaire convertie en points</td>
                </tr>
                <tr>
                  <td>Taux de calcul des points, tranche 2</td>
                  <td>{pct(A.tauxCalculPointsT2)}</td>
                  <td>Paramètres au 1er janvier 2026</td>
                  <td>Part du salaire convertie en points</td>
                </tr>
                <tr>
                  <td>Taux d'appel</td>
                  <td>{pct(A.tauxAppel)}</td>
                  <td>Paramètres au 1er janvier 2026</td>
                  <td>Écart entre la cotisation prélevée et celle qui donne des points</td>
                </tr>
                <tr>
                  <td>Cotisation de retraite prélevée, tranche 1</td>
                  <td>
                    {pct(A.tauxCotisationT1.global)} (salarié {pct(A.tauxCotisationT1.salariale)},
                    employeur {pct(A.tauxCotisationT1.patronale)})
                  </td>
                  <td>Paramètres au 1er janvier 2026</td>
                  <td>Ligne « retraite complémentaire T1 » de la fiche de paie</td>
                </tr>
                <tr>
                  <td>Cotisation de retraite prélevée, tranche 2</td>
                  <td>
                    {pct(A.tauxCotisationT2.global)} (salarié {pct(A.tauxCotisationT2.salariale)},
                    employeur {pct(A.tauxCotisationT2.patronale)})
                  </td>
                  <td>Paramètres au 1er janvier 2026</td>
                  <td>Ligne « retraite complémentaire T2 » de la fiche de paie</td>
                </tr>
                <tr>
                  <td>Valeur d'achat du point (salaire de référence)</td>
                  <td>{eurosPrecis(A.valeurAchatPoint2026, 4)}</td>
                  <td>1er janvier 2026</td>
                  <td>Prix d'un point pour les salaires de 2026</td>
                </tr>
                <tr>
                  <td>Valeur de service du point</td>
                  <td>{eurosPrecis(A.valeurServicePoint, 4)}</td>
                  <td>1er novembre 2026</td>
                  <td>Pension annuelle brute versée pour un point</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Deux précisions de lecture. Les taux de cotisation indiqués sont ceux du cas général :
            certaines entreprises appliquent des taux ou une répartition différents en vertu
            d'obligations anciennes, ce qui modifie le nombre de points obtenus. Et la valeur de
            service a été relevée de {pct(A.tauxRevalorisationNovembre2026)} au 1er novembre 2026
            (elle était de {eurosPrecis(A.valeurServicePointPrecedente, 4)} auparavant) ; la
            valeur d'achat applicable aux salaires de 2027 n'était pas reprise dans les documents
            que nous avons consultés au {A.maj}.
          </p>

          <h2 id="exemple">Combien de points pour un salaire de cadre ? L'exemple pas à pas</h2>
          <p>
            <strong>
              Avec les paramètres 2026, une année de travail à {euros(s)} bruts donne{" "}
              {nb(exPoints)} points Agirc-Arrco, qui représentent {euros(exPension)} de pension
              complémentaire brute par an, soit environ {euros(exPension / 12)} par mois.
            </strong>{" "}
            Ce profil est une illustration pédagogique sans lien avec une personne réelle :
            salarié cadre, taux du cas général, année complète, salaire brut soumis à cotisations
            de {euros(s)}. Le montant a été choisi parce qu'il dépasse nettement le PASS et fait
            donc jouer les deux tranches.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Étape</th>
                  <th>Tranche 1</th>
                  <th>Tranche 2</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1. Salaire par tranche</td>
                  <td>{euros(assietteT1(s))}</td>
                  <td>{euros(assietteT2(s))}</td>
                  <td>{euros(s)}</td>
                </tr>
                <tr>
                  <td>2. Taux de calcul des points</td>
                  <td>{pct(A.tauxCalculPointsT1)}</td>
                  <td>{pct(A.tauxCalculPointsT2)}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Cotisation de référence (salaire × taux)</td>
                  <td>{eurosPrecis(cotisationReferenceT1(s))}</td>
                  <td>{eurosPrecis(cotisationReferenceT2(s))}</td>
                  <td>{eurosPrecis(exCotisationsReference)}</td>
                </tr>
                <tr>
                  <td>3. Points (÷ {eurosPrecis(A.valeurAchatPoint2026, 4)})</td>
                  <td>{nb(exPointsT1)}</td>
                  <td>{nb(exPointsT2)}</td>
                  <td>{nb(exPoints)}</td>
                </tr>
                <tr>
                  <td>4. Pension annuelle brute (× {eurosPrecis(A.valeurServicePoint, 4)})</td>
                  <td>{eurosPrecis(pensionAnnuelle(exPointsT1))}</td>
                  <td>{eurosPrecis(pensionAnnuelle(exPointsT2))}</td>
                  <td>{eurosPrecis(exPension)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Dans cet exemple, près des deux tiers des points de l'année viennent de la tranche 2,
            alors qu'elle ne représente que {pct1((assietteT2(s) / s) * 100)} du salaire : c'est
            l'effet du taux de {pct(A.tauxCalculPointsT2)}. Le même calcul, répété sur d'autres
            niveaux de salaire, donne la grille suivante (mêmes hypothèses illustratives).
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Salaire brut annuel 2026</th>
                  <th>Points tranche 1</th>
                  <th>Points tranche 2</th>
                  <th>Points de l'année</th>
                  <th>Pension brute annuelle acquise</th>
                </tr>
              </thead>
              <tbody>
                {E.salairesComparaison.map((salaire) => (
                  <tr key={salaire}>
                    <td>{euros(salaire)}</td>
                    <td>{nb(pointsT1(salaire))}</td>
                    <td>{nb(pointsT2(salaire))}</td>
                    <td>{nb(pointsAnnee(salaire))}</td>
                    <td>{euros(pensionAnnuelle(pointsAnnee(salaire)))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="note">
            <p>
              Ces montants sont fournis à titre illustratif. Ils supposent que la valeur de
              service du point reste celle du 1er novembre 2026 : elle est révisée chaque année,
              et la pension réellement versée dépendra de la valeur en vigueur à ce moment-là. Ils
              sont exprimés en brut, avant prélèvements sociaux et impôt sur le revenu.
            </p>
          </div>

          <h2 id="pension">Combien rapportent 5 000, 8 000 ou 12 000 points Agirc-Arrco ?</h2>
          <p>
            <strong>
              Chaque tranche de 1 000 points Agirc-Arrco correspond à{" "}
              {euros(pensionAnnuelle(1000))} de pension brute par an, soit environ{" "}
              {euros(pensionAnnuelle(1000) / 12)} par mois, à la valeur de service du 1er novembre
              2026 ({eurosPrecis(A.valeurServicePoint, 4)}).
            </strong>{" "}
            Il suffit donc de multiplier le total de points de son relevé par cette valeur pour
            obtenir un ordre de grandeur de la pension complémentaire à taux plein, hors
            majorations.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Points acquis sur la carrière</th>
                  <th>Pension brute par an</th>
                  <th>Pension brute par mois</th>
                </tr>
              </thead>
              <tbody>
                {E.pointsCarriere.map((points) => (
                  <tr key={points}>
                    <td>{nb(points, 0)} points</td>
                    <td>{euros(pensionAnnuelle(points))}</td>
                    <td>{euros(pensionAnnuelle(points) / 12)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Les totaux de ce tableau sont de simples repères de lecture, pas des profils types. La
            pension est versée chaque mois, d'avance. Deux exceptions concernent les très petits
            comptes, d'après la fiche Service-Public F15396 : jusqu'à {A.seuilVersementUnique}{" "}
            points, le versement se fait en une seule fois ; de {A.seuilVersementUnique + 1} à{" "}
            {A.seuilVersementAnnuel} points, il est annuel.
          </p>

          <h2 id="cotisations">Pourquoi toutes les cotisations ne donnent-elles pas des points ?</h2>
          <p>
            <strong>
              Parce que la cotisation prélevée est égale à {pct(A.tauxAppel)} de celle qui sert à
              calculer les points, et que deux contributions supplémentaires, la CEG et la CET,
              financent l'équilibre du régime sans ouvrir aucun droit.
            </strong>{" "}
            Sur la tranche 1, on prélève {pct(A.tauxCotisationT1.global)} mais seuls{" "}
            {pct(A.tauxCalculPointsT1)} sont convertis en points ; sur la tranche 2,{" "}
            {pct(A.tauxCotisationT2.global)} sont prélevés pour {pct(A.tauxCalculPointsT2)}{" "}
            convertis.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Prélèvement Agirc-Arrco (2026)</th>
                  <th>Assiette</th>
                  <th>Taux global</th>
                  <th>Part salariale</th>
                  <th>Part patronale</th>
                  <th>Donne des points ?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cotisation de retraite T1</td>
                  <td>Tranche 1</td>
                  <td>{pct(A.tauxCotisationT1.global)}</td>
                  <td>{pct(A.tauxCotisationT1.salariale)}</td>
                  <td>{pct(A.tauxCotisationT1.patronale)}</td>
                  <td>Oui, à hauteur de {pct(A.tauxCalculPointsT1)}</td>
                </tr>
                <tr>
                  <td>Cotisation de retraite T2</td>
                  <td>Tranche 2</td>
                  <td>{pct(A.tauxCotisationT2.global)}</td>
                  <td>{pct(A.tauxCotisationT2.salariale)}</td>
                  <td>{pct(A.tauxCotisationT2.patronale)}</td>
                  <td>Oui, à hauteur de {pct(A.tauxCalculPointsT2)}</td>
                </tr>
                <tr>
                  <td>Contribution d'équilibre général (CEG) T1</td>
                  <td>Tranche 1</td>
                  <td>{pct(A.cegT1.global)}</td>
                  <td>{pct(A.cegT1.salariale)}</td>
                  <td>{pct(A.cegT1.patronale)}</td>
                  <td>Non</td>
                </tr>
                <tr>
                  <td>Contribution d'équilibre général (CEG) T2</td>
                  <td>Tranche 2</td>
                  <td>{pct(A.cegT2.global)}</td>
                  <td>{pct(A.cegT2.salariale)}</td>
                  <td>{pct(A.cegT2.patronale)}</td>
                  <td>Non</td>
                </tr>
                <tr>
                  <td>Contribution d'équilibre technique (CET)</td>
                  <td>Tranches 1 et 2, si le salaire dépasse le PASS</td>
                  <td>{pct(A.cet.global)}</td>
                  <td>{pct(A.cet.salariale)}</td>
                  <td>{pct(A.cet.patronale)}</td>
                  <td>Non</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Reprenons l'exemple illustratif à {euros(s)} bruts. Cotisation de retraite, CEG et CET
            réunies, salarié et employeur versent environ {euros(exCotisationsPrelevees)} à
            l'Agirc-Arrco dans l'année, dont {euros(exCotisationsReference)} servent au calcul des
            points. Autre façon de le lire : 100 € de cotisation de référence achètent{" "}
            {nb(100 / A.valeurAchatPoint2026)} points, soit{" "}
            {eurosPrecis(pensionPour100Reference)} de pension brute par an ; rapportés aux {A.tauxAppel} €
            réellement prélevés pour les obtenir, cela fait {eurosPrecis(pensionPour100Appeles)}{" "}
            pour 100 € de cotisation de retraite. Les cadres acquittent en outre une cotisation à
            l'Apec ({pct(A.apec.global)} du salaire dans la limite de{" "}
            {A.apec.multiplePassAssiette} PASS), sans lien avec la retraite.
          </p>
          <p>
            Ce n'est pas une anomalie : l'Agirc-Arrco est un régime par répartition, dans lequel
            les cotisations de l'année paient les pensions de l'année. Mais c'est la première
            raison pour laquelle le montant des cotisations lu sur une fiche de paie ne permet pas
            d'estimer directement ses droits.
          </p>

          <h2 id="decevant">Pourquoi la retraite d'un cadre remplace-t-elle moins bien son salaire ?</h2>
          <p>
            <strong>
              Parce que la retraite de base ignore la partie du salaire située au-dessus du PASS :
              à taux plein, elle ne peut pas dépasser {pct(A.tauxPleinRetraiteDeBase)} du plafond,
              soit {euros(retraiteDeBaseMaximale)} par an en 2026 ({eurosPrecis(retraiteDeBaseMaximale / 12)}{" "}
              bruts par mois, hors surcote), quel que soit le salaire.
            </strong>{" "}
            Au-dessus du plafond, seuls les points Agirc-Arrco de la tranche 2 constituent des
            droits, et ils ne compensent qu'en partie.
          </p>
          <p>
            Le tableau ci-dessous donne un ordre de grandeur volontairement théorique. Hypothèses,
            choisies pour isoler l'effet du plafond : carrière complète de{" "}
            {E.dureeCarriereAnnees} ans ({E.dureeCarriereAnnees * 4} trimestres, la durée d'assurance requise pour les
            générations nées à partir de 1966), salaire constant sur toute la carrière, exprimé en
            euros de 2026, paramètres 2026 figés, retraite de base à taux plein calculée sur un
            salaire annuel moyen égal au salaire dans la limite du PASS, aucune majoration. Aucune
            carrière réelle ne ressemble à cela ; l'intérêt est la comparaison entre les lignes.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Salaire brut annuel constant</th>
                  <th>Retraite de base théorique</th>
                  <th>Complémentaire théorique ({E.dureeCarriereAnnees} ans)</th>
                  <th>Total brut par an</th>
                  <th>En part du salaire brut</th>
                </tr>
              </thead>
              <tbody>
                {E.salairesComparaison.map((salaire) => {
                  const base = retraiteDeBaseTheorique(salaire);
                  const compl = complementaireTheorique(salaire);
                  return (
                    <tr key={salaire}>
                      <td>{euros(salaire)}</td>
                      <td>
                        {euros(base)} ({pct1((base / salaire) * 100)})
                      </td>
                      <td>
                        {euros(compl)} ({pct1((compl / salaire) * 100)})
                      </td>
                      <td>{euros(base + compl)}</td>
                      <td>{pct1(((base + compl) / salaire) * 100)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p>
            La lecture est nette : plus le salaire s'élève au-dessus du PASS, plus la part de la
            retraite de base s'effondre, et la complémentaire, bien qu'en hausse, ne rattrape pas
            l'écart. Dans la réalité, quatre facteurs creusent encore la différence entre la
            pension et le dernier salaire d'un cadre :
          </p>
          <ul>
            <li>
              <strong>La progression de carrière.</strong> Les points des premières années ont été
              acquis sur des salaires bien plus bas que le dernier. La pension complémentaire
              reflète la moyenne de la carrière, pas son sommet.
            </li>
            <li>
              <strong>Les éléments de rémunération sans cotisations de retraite.</strong>{" "}
              Intéressement, participation et abondement versés sur un plan d'épargne salariale ne
              donnent pas de points.
            </li>
            <li>
              <strong>L'évolution de la valeur du point.</strong> Elle est fixée chaque année par
              les partenaires sociaux qui pilotent le régime. Elle n'a pas été revalorisée au 1er
              novembre 2025, puis a augmenté de {pct(A.tauxRevalorisationNovembre2026)} au 1er
              novembre 2026.
            </li>
            <li>
              <strong>Le passage du brut au net.</strong> Les pensions supportent des prélèvements
              sociaux, puis l'impôt sur le revenu.
            </li>
          </ul>
          <p>
            C'est cet écart, et non un rendement de placement, qui dimensionne l'effort d'épargne
            d'un cadre. Pour le traduire en capital à constituer,{" "}
            <a href="/guide/combien-faut-il-epargner-pour-la-retraite">
              notre guide « Combien faut-il épargner pour la retraite ? »
            </a>{" "}
            part précisément du taux de remplacement et déroule la méthode de calcul.
          </p>

          <h2 id="minoration">Quand la retraite complémentaire est-elle minorée ?</h2>
          <p>
            <strong>
              La retraite Agirc-Arrco est versée sans minoration si la retraite de base est
              obtenue à taux plein, ou à partir de {A.ageSansMinoration} ans quelle que soit la
              durée d'assurance ; dans les autres cas, un coefficient de minoration définitif
              s'applique.
            </strong>{" "}
            D'après le barème publié par l'Agirc-Arrco (édition de septembre 2026), ce coefficient
            dépend soit de l'âge, soit du nombre de trimestres manquants, et la solution la moins
            pénalisante est retenue lorsque la retraite de base est liquidée à taux minoré avec
            moins de 20 trimestres manquants.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Trimestres manquants pour le taux plein de la retraite de base</th>
                  <th>Coefficient appliqué</th>
                  <th>Part de la pension complémentaire versée</th>
                </tr>
              </thead>
              <tbody>
                {A.minorationTrimestresManquants.map((ligne) => (
                  <tr key={ligne.trimestres}>
                    <td>{ligne.trimestres} trimestres</td>
                    <td>{nb(ligne.coefficient, 2)}</td>
                    <td>{pct(arrondi2(ligne.coefficient * 100))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Trois points évitent les confusions les plus courantes. D'abord, cette minoration est
            définitive, contrairement à l'ancien « malus » temporaire de 10 % (le coefficient de
            solidarité), supprimé pour les retraites prenant effet à partir du 1er décembre 2023,
            puis au 1er avril 2024 pour les retraités qui le subissaient encore. Ensuite, il est
            possible de demander sa retraite complémentaire dès {A.ageMinimumAnticipation} ans
            sans avoir liquidé sa retraite de base, mais avec une minoration forte : à 62 ans, par
            exemple, le coefficient d'anticipation pour âge est de{" "}
            {nb(A.coefficientAnticipation62Ans, 2)}. Enfin, ces règles sont distinctes de la
            décote du régime de base, que détaille{" "}
            <a href="/guide/surcote-decote-retraite">
              notre guide sur la surcote et la décote
            </a>
            , à lire en parallèle puisque c'est le taux de la retraite de base qui déclenche ou non
            la minoration de la complémentaire.
          </p>
          <p>
            À l'inverse, deux majorations pour enfants existent, d'après la fiche de l'Agirc-Arrco
            consacrée au sujet : {pct(A.majorationTroisEnfants)} sur les points obtenus depuis
            2012 pour les assurés ayant eu ou élevé au moins trois enfants (avec des taux
            différents pour les périodes antérieures et un plafond annuel, de{" "}
            {eurosPrecis(A.plafondMajorationTroisEnfantsNov2025)} bruts dans les paramètres publiés
            pour 2026), ou {pct(A.majorationEnfantACharge)} par enfant encore à charge au moment
            du départ. Les deux ne se cumulent pas : la plus élevée est versée.
          </p>

          <h2 id="verifier">Comment vérifier son nombre de points Agirc-Arrco ?</h2>
          <p>
            <strong>
              Le total de points figure sur le relevé de carrière, consultable gratuitement dans
              le compte retraite du site info-retraite.fr et dans l'espace personnel du site
              agirc-arrco.fr, avec le détail année par année.
            </strong>{" "}
            C'est ce total, et non une estimation tirée du salaire actuel, qui permet d'appliquer
            la formule de ce guide.
          </p>
          <p>Avec le relevé sous les yeux, cinq vérifications suffisent :</p>
          <ol>
            <li>
              <strong>Une ligne par année travaillée dans le privé.</strong> Une année sans points
              alors que vous étiez salarié signale une déclaration manquante.
            </li>
            <li>
              <strong>Des points cohérents avec le salaire de l'année.</strong> Pour 2026, le
              calcul de la section précédente donne le nombre attendu, à quelques unités près
              selon les taux propres à l'entreprise.
            </li>
            <li>
              <strong>Des points de tranche 2 les années où le salaire a dépassé le PASS.</strong>{" "}
              Leur absence est l'anomalie la plus coûteuse pour un cadre.
            </li>
            <li>
              <strong>Les périodes particulières.</strong> Chômage indemnisé, arrêts longs,
              activité à l'étranger, changements d'employeur ou de statut : ce sont les périodes où
              les oublis se concentrent.
            </li>
            <li>
              <strong>Les justificatifs.</strong> Bulletins de paie de décembre et attestations
              permettent de demander une régularisation à sa caisse de retraite complémentaire.
            </li>
          </ol>
          <p>
            Pour la méthode complète de contrôle, base et complémentaire réunies,{" "}
            <a href="/guide/verifier-releve-de-carriere-retraite">
              notre guide pour vérifier son relevé de carrière
            </a>{" "}
            liste les anomalies à chercher et la marche à suivre pour les faire corriger. Et pour
            situer le résultat par rapport à vos besoins, le{" "}
            <a href="/simulateur-retraite">simulateur retraite de ce site</a> met en regard
            pension estimée, épargne existante et revenu souhaité : c'est la suite logique une
            fois votre nombre de points connu.
          </p>
          <div className="note">
            <p>
              <strong>Erreurs fréquentes :</strong> estimer sa pension à partir du montant des
              cotisations plutôt que du nombre de points ; confondre valeur d'achat (
              {eurosPrecis(A.valeurAchatPoint2026, 4)}) et valeur de service (
              {eurosPrecis(A.valeurServicePoint, 4)}) du point ; raisonner sur le dernier salaire
              alors que toute la carrière compte ; oublier que la complémentaire est minorée quand
              la retraite de base n'est pas obtenue à taux plein ; lire un montant brut comme un
              montant net.
            </p>
          </div>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Combien vaut un point Agirc-Arrco en 2026 ?</h3>
          <p>
            Depuis le 1er novembre 2026, un point vaut {eurosPrecis(A.valeurServicePoint, 4)} de
            pension brute par an (valeur de service), contre{" "}
            {eurosPrecis(A.valeurServicePointPrecedente, 4)} auparavant. À ne pas confondre avec la
            valeur d'achat, {eurosPrecis(A.valeurAchatPoint2026, 4)} en 2026, qui sert à convertir
            les cotisations en points.
          </p>
          <h3>Un cadre cotise-t-il plus qu'un non-cadre à l'Agirc-Arrco ?</h3>
          <p>
            À salaire égal, non : depuis 2019, les taux sont les mêmes pour tous les salariés
            du privé. Un cadre cotise davantage parce que son salaire dépasse plus souvent le
            PASS, ce qui fait entrer la tranche 2 ({pct(A.tauxCotisationT2.global)} de cotisation
            de retraite) et la CET. S'y ajoute la cotisation Apec, propre aux cadres.
          </p>
          <h3>Mes points acquis comme cadre avant 2019 sont-ils perdus ?</h3>
          <p>
            Non. Lors de la fusion des deux régimes au 1er janvier 2019, les points Arrco et les
            points Agirc ont été repris dans un compte unique de points Agirc-Arrco, de façon à
            conserver les droits acquis. Le relevé de carrière affiche le total converti.
          </p>
          <h3>Le malus de 10 % sur la retraite complémentaire existe-t-il encore ?</h3>
          <p>
            Non. Le coefficient de solidarité, qui réduisait la pension de 10 % pendant trois ans
            pour un départ dès le taux plein, ne s'applique plus aux retraites prenant effet depuis
            le 1er décembre 2023 et a cessé au 1er avril 2024 pour les retraités concernés. La
            minoration définitive pour départ sans taux plein, elle, existe toujours.
          </p>
          <h3>Peut-on toucher sa retraite complémentaire avant sa retraite de base ?</h3>
          <p>
            Oui, à partir de {A.ageMinimumAnticipation} ans, mais avec un coefficient
            d'anticipation définitif qui dépend de l'âge. Le barème de l'Agirc-Arrco donne par
            exemple {nb(A.coefficientAnticipation62Ans, 2)} à 62 ans, soit{" "}
            {pct(arrondi2(A.coefficientAnticipation62Ans * 100))} de la pension.
          </p>
          <h3>La retraite complémentaire est-elle calculée sur les 25 meilleures années ?</h3>
          <p>
            Non. Les 25 meilleures années concernent la retraite de base. L'Agirc-Arrco additionne
            les points de toutes les années de carrière, bonnes ou moins bonnes, et les multiplie
            par la valeur de service du point.
          </p>
          <h3>Le montant calculé est-il celui que je toucherai sur mon compte ?</h3>
          <p>
            Non, c'est un montant brut. Des prélèvements sociaux sont retenus sur la pension, dont
            le taux dépend du revenu fiscal du foyer, et la pension est ensuite soumise à l'impôt
            sur le revenu. Le montant net figure sur les estimations personnalisées des régimes.
          </p>
          <h3>Avoir eu trois enfants augmente-t-il la retraite complémentaire ?</h3>
          <p>
            Oui : les points obtenus depuis 2012 sont majorés de {pct(A.majorationTroisEnfants)}{" "}
            pour les assurés ayant eu ou élevé au moins trois enfants, dans la limite d'un plafond
            annuel, avec des taux différents pour les périodes plus anciennes. Cette majoration ne
            se cumule pas avec celle de {pct(A.majorationEnfantACharge)} par enfant à charge.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La retraite complémentaire d'un cadre n'a rien d'opaque une fois la formule posée : un
            nombre de points, multiplié par {eurosPrecis(A.valeurServicePoint, 4)}. Les points de
            l'année se déduisent du salaire ({pct(A.tauxCalculPointsT1)} jusqu'à {euros(pass)},{" "}
            {pct(A.tauxCalculPointsT2)} au-delà, divisés par{" "}
            {eurosPrecis(A.valeurAchatPoint2026, 4)}), et le total se lit sur le relevé de
            carrière. Avec ces trois chiffres, chacun peut reconstituer l'ordre de grandeur de sa
            pension complémentaire et comprendre d'où vient l'écart avec son salaire.
          </p>
          <p>
            Ne pas faire ce calcul a un coût concret : une année de points de tranche 2 oubliée
            sur un relevé ne se voit pas tant qu'on ne l'a pas cherchée, et se corrige plus
            difficilement à mesure que les justificatifs vieillissent. Surtout, découvrir à
            quelques années du départ que la pension couvrira une part réduite du dernier salaire
            laisse peu de temps pour s'y préparer. La prochaine étape utile consiste à relever
            votre total de points, puis à regarder comment une épargne peut compléter l'ensemble :{" "}
            <a href="/guide/meilleure-enveloppe-retraite">
              notre comparaison des enveloppes pour préparer sa retraite
            </a>{" "}
            présente le rôle respectif du PER, de l'assurance-vie et du PEA, et, si vos revenus
            vous placent dans une tranche d'imposition élevée,{" "}
            <a href="/guide/plafond-per-versement-avant-31-decembre-2026">
              notre guide sur le plafond de déduction du PER en 2026
            </a>{" "}
            explique la limite dans laquelle des versements peuvent être déduits.
          </p>
          <p>
            Si vous souhaitez replacer ces chiffres dans une vue d'ensemble (pension de base,
            complémentaire, épargne existante, revenu visé), le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à poser ce
            cadre général, relevé de carrière en main.
          </p>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées le {A.maj} :</p>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seuls le
              relevé de carrière et les estimations délivrés par les régimes de retraite font foi
              pour vos droits. Les paramètres cités sont ceux en vigueur au {A.maj} ; les exemples
              chiffrés sont des illustrations pédagogiques établies à paramètres constants, qui ne
              préjugent ni de l'évolution de la valeur du point ni des règles futures du régime.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Vos points sont sur votre relevé de carrière. L'écart avec votre salaire se prépare." />
    </>
  );
}
