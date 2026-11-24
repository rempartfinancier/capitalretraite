import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  AGIRC_ARRCO,
  AGIRC_ARRCO_EXEMPLES,
  CADRE_FONCTIONNAIRE,
  RETRAIT_CAPITAL,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const A = AGIRC_ARRCO;
const CF = CADRE_FONCTIONNAIRE;

const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + " %";

// ---- Cadre du privé : base (50 % du salaire annuel moyen plafonné) + points Agirc-Arrco ----
const S = CF.remunerationTotaleAnnuelleExemple;
const annees = AGIRC_ARRCO_EXEMPLES.dureeCarriereAnnees;
const salaireT1 = Math.min(S, A.pass2026);
const salaireT2 = Math.max(S - A.pass2026, 0);
const pensionBase = (A.tauxPleinRetraiteDeBase / 100) * salaireT1;
const cotisationPointsT1 = (salaireT1 * A.tauxCalculPointsT1) / 100;
const cotisationPointsT2 = (salaireT2 * A.tauxCalculPointsT2) / 100;
const pointsParAn = (cotisationPointsT1 + cotisationPointsT2) / A.valeurAchatPoint2026;
const pointsCarriere = pointsParAn * annees;
const pensionComplementaire = pointsCarriere * A.valeurServicePoint;
const pensionCadre = pensionBase + pensionComplementaire;
const tauxCadre = (pensionCadre / S) * 100;

// ---- Fonctionnaire : taux de liquidation × traitement indiciaire (hors primes) ----
const traitementPourPrimes = (partPrimes) => S / (1 + partPrimes / 100);
const pensionFonctionnaire = (partPrimes) =>
  (CF.tauxLiquidationMaxFonctionnaire / 100) * traitementPourPrimes(partPrimes);
const tauxFonctionnaire = (partPrimes) => (pensionFonctionnaire(partPrimes) / S) * 100;
const traitementExemple = traitementPourPrimes(CF.partPrimesExemple);
const primesExemple = S - traitementExemple;
const pensionFonctExemple = pensionFonctionnaire(CF.partPrimesExemple);
const tauxFonctExemple = tauxFonctionnaire(CF.partPrimesExemple);

// ---- Écart au taux de remplacement visé, et capital correspondant (règle des 4 %) ----
const objectif = (S * CF.tauxRemplacementCible) / 100;
const ecartAnnuel = (pension) => Math.max(objectif - pension, 0);
const capitalPourEcart = (ecart) => (ecart * 100) / RETRAIT_CAPITAL.tauxRegle4Pct;

const sources = [
  {
    label: "Service-Public.gouv.fr — Retraite du salarié du privé : montant de la pension (rubrique Retraite)",
    url: "https://www.service-public.gouv.fr",
  },
  {
    label: "Service-Public.gouv.fr — À partir de quel âge un salarié peut-il partir en retraite ?, fiche F14043",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14043",
  },
  {
    label: "Service-Public.gouv.fr — Retraite de l'agent public : fonction publique (rubrique Retraite)",
    url: "https://www.service-public.gouv.fr",
  },
  {
    label: "Agirc-Arrco — Retraite complémentaire : calcul de la retraite en points, valeurs du point",
    url: "https://www.agirc-arrco.fr",
  },
  {
    label: "L'Assurance retraite — Calcul de la pension du régime général",
    url: "https://www.lassuranceretraite.fr",
  },
  {
    label: "RAFP — Retraite additionnelle de la fonction publique",
    url: "https://www.rafp.fr",
  },
  {
    label: "info-retraite.fr — Relevé de carrière et estimation indicative globale",
    url: "https://www.info-retraite.fr",
  },
  {
    label: "Légifrance — Code de la sécurité sociale ; code des pensions civiles et militaires de retraite",
    url: "https://www.legifrance.gouv.fr",
  },
];

export default function GuideRetraiteCadreOuFonctionnaire() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Comparaison · profils</span>
          <h1>Retraite de cadre ou de fonctionnaire : quelles différences de calcul ?</h1>
          <p className="sub">
            Deux logiques de calcul, deux taux de remplacement, deux besoins d'épargne. Mis à jour
            en {CF.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> un cadre du privé cumule une pension de base (taux de{" "}
              {A.tauxPleinRetraiteDeBase} % d'un salaire annuel moyen plafonné) et une retraite
              complémentaire Agirc-Arrco calculée en points, sur toute la carrière. Un fonctionnaire
              reçoit une pension fondée sur son traitement indiciaire des {CF.moisReferenceFonctionnaire}{" "}
              derniers mois, au taux maximal de {CF.tauxLiquidationMaxFonctionnaire} %, sans les
              primes, qui ne sont couvertes qu'en petite partie par la retraite additionnelle (RAFP).
              Les deux pensions ne se comparent pas directement : le taux de remplacement, c'est-à-dire
              la pension rapportée à la rémunération d'activité, dépend de la structure de la
              rémunération et non du statut seul.
            </p>
          </div>

          <p>
            Prenons deux situations illustratives et composites, qui ne correspondent à aucun cas
            réel : Sophie, cadre dans une entreprise privée, et Julien, ingénieur territorial. Tous
            deux gagnent, en brut, {euros(S)} par an en incluant les primes, tous deux ont une
            carrière complète. Leur retraite sera pourtant calculée de façon très différente, et leur
            besoin d'épargne complémentaire aussi.
          </p>
          <p>
            Cet article compare les mécanismes de calcul, avec un exemple chiffré à partir
            de formules lisibles. Il ne détaille pas le fonctionnement des points Agirc-Arrco (voir{" "}
            <a href="/guide/retraite-complementaire-agirc-arrco-cadres-calcul">le guide du calcul
            de la retraite complémentaire des cadres</a>) ni les spécificités de la fonction
            publique et les solutions d'épargne (voir{" "}
            <a href="/guide/retraite-fonctionnaires-completer">compléter sa retraite de
            fonctionnaire</a>).
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#cadre">Comment se calcule la retraite d'un cadre du privé ?</a></li>
              <li><a href="#fonctionnaire">Comment se calcule la pension d'un fonctionnaire ?</a></li>
              <li><a href="#tableau">Cadre ou fonctionnaire : le tableau comparatif</a></li>
              <li><a href="#taux">Quel taux de remplacement dans chaque cas ?</a></li>
              <li><a href="#epargne">Quelles conséquences sur le besoin d'épargne complémentaire ?</a></li>
              <li><a href="#limites">Quelles sont les limites de cette comparaison ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#plus-loin">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="cadre">Comment se calcule la retraite d'un cadre du privé ?</h2>
          <p>
            Elle repose sur deux étages obligatoires. Le régime général verse une pension de base :
            au taux plein de {A.tauxPleinRetraiteDeBase} %, appliqué au salaire annuel moyen, qui
            retient les meilleures années dans la limite du plafond annuel de la sécurité sociale
            ({euros(A.pass2026)} en 2026). Elle est ajustée par la durée d'assurance : une décote en
            cas de trimestres manquants, une surcote au-delà (voir{" "}
            <a href="/guide/surcote-decote-retraite">surcote et décote</a>).
          </p>
          <p>
            L'Agirc-Arrco verse ensuite une retraite complémentaire, calculée en points sur toute la
            carrière : chaque année, une partie du salaire (jusqu'à {A.multiplePassTranche2} fois le
            plafond) est convertie en points au prix d'un « salaire de référence », puis ces points
            sont multipliés par la valeur de service du point au départ. Le cadre dont le salaire
            dépasse le plafond voit donc une part importante de sa retraite portée par ce second
            étage, qui comprend la tranche 2 de rémunération.
          </p>
          <p>
            Exemple avec un salaire annuel brut constant de {euros(S)}, supposé stable sur{" "}
            {annees} ans (donc en euros constants, sans évolution de carrière) :
          </p>
          <ol>
            <li>
              Pension de base : {A.tauxPleinRetraiteDeBase} % × {euros(salaireT1)} (salaire plafonné)
              = <strong>{euros(pensionBase)}</strong> par an.
            </li>
            <li>
              Points par an : ({euros(salaireT1)} × {A.tauxCalculPointsT1} % + {euros(salaireT2)} ×{" "}
              {A.tauxCalculPointsT2} %) ÷ {A.valeurAchatPoint2026.toLocaleString("fr-FR")} €
              ={" "}
              {pointsParAn.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} points.
            </li>
            <li>
              Points sur {annees} ans : {pointsCarriere.toLocaleString("fr-FR", { maximumFractionDigits: 0 })}{" "}
              points ; pension complémentaire : × {A.valeurServicePoint.toLocaleString("fr-FR")} € ={" "}
              <strong>{euros(pensionComplementaire)}</strong> par an.
            </li>
            <li>
              Total brut : <strong>{euros(pensionCadre)}</strong> par an, soit{" "}
              <strong>{pct1(tauxCadre)}</strong> du salaire de {euros(S)}.
            </li>
          </ol>
          <div className="note">
            <p>
              Ordre de grandeur théorique, qui suppose une carrière complète au taux plein, un
              salaire constant, des valeurs de point de 2026 et aucune décote ni majoration. En
              pratique, les salaires évoluent, la valeur d'achat du point aussi, et la pension réelle
              dépend de l'âge de départ et des trimestres validés. Montants bruts, avant prélèvements
              sociaux et impôt.
            </p>
          </div>

          <h2 id="fonctionnaire">Comment se calcule la pension d'un fonctionnaire ?</h2>
          <p>
            La pension d'un fonctionnaire (régime de la fonction publique d'État, ou CNRACL pour les
            fonctions publiques territoriale et hospitalière) se fonde sur le dernier traitement
            indiciaire détenu depuis au moins {CF.moisReferenceFonctionnaire} mois, multiplié par un
            taux de liquidation qui atteint {CF.tauxLiquidationMaxFonctionnaire} % au maximum, lorsque
            la durée de services et de bonifications requise est atteinte. Le traitement indiciaire
            correspond à l'indice du poste : il exclut en principe les primes et indemnités.
          </p>
          <p>
            Les primes entrent en partie dans un second régime, le RAFP (retraite additionnelle de la
            fonction publique), obligatoire, par points et alimenté par des cotisations assises sur
            les primes dans une certaine limite. Nous n'en chiffrons pas les paramètres, qui sont
            révisés : le site <a href="https://www.rafp.fr" target="_blank" rel="noopener noreferrer">rafp.fr</a>{" "}
            les publie, et le guide{" "}
            <a href="/guide/retraite-fonctionnaires-completer">retraite des fonctionnaires</a>{" "}
            en explique la logique.
          </p>
          <p>
            Exemple pour une rémunération brute totale de {euros(S)} par an dont {CF.partPrimesExemple} %
            de primes rapportées au traitement indiciaire :
          </p>
          <ol>
            <li>
              Traitement indiciaire : {euros(S)} ÷ (1 + {CF.partPrimesExemple} %) ={" "}
              <strong>{euros(traitementExemple)}</strong> par an, soit {euros(primesExemple)} de
              primes.
            </li>
            <li>
              Pension : {CF.tauxLiquidationMaxFonctionnaire} % × {euros(traitementExemple)} ={" "}
              <strong>{euros(pensionFonctExemple)}</strong> par an, soit{" "}
              <strong>{pct1(tauxFonctExemple)}</strong> de la rémunération totale.
            </li>
          </ol>
          <p>
            Cette pension ne comprend pas la rente RAFP, qui s'y ajouterait et dont le montant
            dépend des points accumulés. Elle ne tient pas compte non plus d'éventuelles bonifications
            ou d'une catégorie active.
          </p>

          <h2 id="tableau">Cadre ou fonctionnaire : le tableau comparatif</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Cadre du privé</th>
                  <th>Fonctionnaire</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Base de calcul</td>
                  <td>Salaire annuel moyen plafonné (meilleures années) pour la base ; points acquis sur toute la carrière pour la complémentaire</td>
                  <td>Traitement indiciaire des {CF.moisReferenceFonctionnaire} derniers mois</td>
                </tr>
                <tr>
                  <td>Taux maximal</td>
                  <td>{A.tauxPleinRetraiteDeBase} % pour la base, plus les points Agirc-Arrco</td>
                  <td>{CF.tauxLiquidationMaxFonctionnaire} % du traitement indiciaire</td>
                </tr>
                <tr>
                  <td>Primes et variable</td>
                  <td>Intégrées dans le salaire soumis à cotisations, donc dans les points</td>
                  <td>Hors assiette de la pension ; partiellement couvertes par le RAFP</td>
                </tr>
                <tr>
                  <td>Durée requise</td>
                  <td>{annees} ans (172 trimestres) pour les générations nées à partir de 1966, régime général</td>
                  <td>Durée de services et bonifications ; règles par corps</td>
                </tr>
                <tr>
                  <td>Évolution de carrière</td>
                  <td>Toute la carrière compte, via les points</td>
                  <td>Les dernières années comptent beaucoup</td>
                </tr>
                <tr>
                  <td>Complément obligatoire</td>
                  <td>Agirc-Arrco (par points)</td>
                  <td>RAFP (par points, sur les primes)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Source des paramètres : Agirc-Arrco, Service-Public, Légifrance ; les règles propres à
            chaque corps ou génération sont à vérifier auprès de la caisse.
          </p>

          <h2 id="taux">Quel taux de remplacement dans chaque cas ?</h2>
          <p>
            Le taux de remplacement est le rapport entre la pension brute et la rémunération brute
            d'activité. Le tableau applique la formule du fonctionnaire (hors RAFP) à plusieurs parts
            de primes, pour une rémunération totale constante de {euros(S)} :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Primes (en % du traitement)</th>
                  <th>Traitement indiciaire annuel</th>
                  <th>Pension (hors RAFP)</th>
                  <th>Taux de remplacement</th>
                </tr>
              </thead>
              <tbody>
                {CF.partPrimesGrille.map((part) => (
                  <tr key={part}>
                    <td>{pct(part)}</td>
                    <td>{euros(traitementPourPrimes(part))}</td>
                    <td>{euros(pensionFonctionnaire(part))}</td>
                    <td>{pct1(tauxFonctionnaire(part))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Le constat est mécanique : plus la part de primes est élevée, plus le taux de remplacement
            baisse, pour une même rémunération totale. À l'inverse, pour le cadre, le taux dépend
            surtout du niveau du salaire par rapport au plafond, puisque la base est plafonnée et que
            la complémentaire est proportionnelle. Les résultats ci-dessus sont des formules
            appliquées à des hypothèses, pas des prévisions de pension. Pour estimer votre propre
            taux, voir <a href="/guide/estimer-sa-pension-retraite-taux-de-remplacement">comment
            estimer sa pension et son taux de remplacement</a>.
          </p>

          <h2 id="epargne">Quelles conséquences sur le besoin d'épargne complémentaire ?</h2>
          <p>
            Pour illustrer, fixons un taux de remplacement visé de {CF.tauxRemplacementCible} % de la
            rémunération brute, soit {euros(objectif)} par an. L'écart avec chaque pension se
            convertit en capital avec la règle dite des {RETRAIT_CAPITAL.tauxRegle4Pct} %, un
            repère de discussion non garanti (voir{" "}
            <a href="/guide/combien-retirer-par-mois-capital-retraite">combien retirer de son
            capital retraite</a>) :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Profil de l'exemple</th>
                  <th>Pension brute annuelle</th>
                  <th>Écart avec l'objectif</th>
                  <th>Capital correspondant ({RETRAIT_CAPITAL.tauxRegle4Pct} %)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cadre du privé</td>
                  <td>{euros(pensionCadre)}</td>
                  <td>{euros(ecartAnnuel(pensionCadre))}</td>
                  <td>{euros(capitalPourEcart(ecartAnnuel(pensionCadre)))}</td>
                </tr>
                <tr>
                  <td>Fonctionnaire ({CF.partPrimesExemple} % de primes, hors RAFP)</td>
                  <td>{euros(pensionFonctExemple)}</td>
                  <td>{euros(ecartAnnuel(pensionFonctExemple))}</td>
                  <td>{euros(capitalPourEcart(ecartAnnuel(pensionFonctExemple)))}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Lecture : dans cet exemple, l'écart est plus grand pour le profil fonctionnaire, dont la
            rente RAFP viendrait en déduction, dans une proportion à vérifier sur son relevé. Cet
            écart ne désigne ni un statut meilleur ni un statut moins bon : il reflète une structure
            de rémunération. Selon la situation, ce besoin peut être couvert par un PER, une
            assurance-vie, un PEA ou de l'immobilier ; voir{" "}
            <a href="/guide/combien-epargner-par-mois-pour-la-retraite-selon-age">combien épargner
            par mois selon l'âge</a>, <a href="/strategies/per">la stratégie PER</a> et{" "}
            <a href="/guide/per-ou-assurance-vie-selon-age-et-tmi">PER ou assurance-vie selon l'âge
            et la TMI</a>. Chaque placement comporte un risque de perte en capital.
          </p>

          <h2 id="limites">Quelles sont les limites de cette comparaison ?</h2>
          <ul>
            <li>
              <strong>Les carrières réelles sont rarement linéaires.</strong> Salaires variables,
              temps partiels, mobilités entre public et privé : les pensions se calculent alors
              régime par régime.
            </li>
            <li>
              <strong>Le brut n'est pas le net.</strong> Cotisations, CSG et impôt diffèrent selon les
              statuts ; une comparaison en net peut donner un écart différent.
            </li>
            <li>
              <strong>Les règles évoluent.</strong> Âge légal, durée requise, valeur du point : les
              paramètres sont révisés (voir{" "}
              <a href="/guide/age-de-depart-retraite-trimestres-duree-assurance">l'âge de départ et la
              durée d'assurance</a>).
            </li>
            <li>
              <strong>Les carrières mixtes.</strong> Un polypensionné reçoit des pensions
              distinctes, selon des règles propres à chaque régime.
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Un fonctionnaire a-t-il une meilleure retraite qu'un cadre du privé ?</h3>
          <p>
            Pas de réponse générale. Le calcul diffère : taux et assiette ne sont pas les mêmes.
            L'écart observé dépend de la part de primes, du niveau de salaire et de la carrière.
          </p>
          <h3>Sur quoi la retraite d'un fonctionnaire est-elle calculée ?</h3>
          <p>
            Sur le traitement indiciaire détenu depuis au moins {CF.moisReferenceFonctionnaire} mois
            avant le départ, au taux de liquidation, plafonné à {CF.tauxLiquidationMaxFonctionnaire} %.
            Les primes n'y entrent pas.
          </p>
          <h3>Les primes comptent-elles pour la retraite d'un fonctionnaire ?</h3>
          <p>
            Pas pour la pension principale. Elles ouvrent des droits dans le RAFP, dans une certaine
            limite. Le relevé de points est consultable sur info-retraite.fr.
          </p>
          <h3>Comment est calculée la retraite complémentaire d'un cadre ?</h3>
          <p>
            En points : une part du salaire est convertie chaque année, puis les points sont
            multipliés par la valeur de service du point ({A.valeurServicePoint.toLocaleString("fr-FR")}{" "}
            € depuis le 1er novembre 2026). Détails dans{" "}
            <a href="/guide/retraite-complementaire-agirc-arrco-cadres-calcul">notre guide
            Agirc-Arrco</a>.
          </p>
          <h3>Qui a le plus besoin d'épargner pour sa retraite ?</h3>
          <p>
            Celui dont la pension attendue est la plus éloignée du revenu visé. Un fonctionnaire
            avec beaucoup de primes ou un cadre à fort salaire au-dessus du plafond peuvent être
            concernés ; le simulateur donne un ordre de grandeur.
          </p>
          <h3>Un fonctionnaire peut-il ouvrir un PER ?</h3>
          <p>
            Oui, le PER est ouvert à tous. Le plafond de déduction dépend des revenus. Voir{" "}
            <a href="/guide/plafond-per-versement-avant-31-decembre-2026">le plafond de versement
            du PER</a>.
          </p>
          <h3>Quel taux de remplacement faut-il viser ?</h3>
          <p>
            Il n'existe pas de taux universel. La cible dépend des charges à la retraite, du
            patrimoine et du mode de vie ; {CF.tauxRemplacementCible} % n'est ici qu'un repère
            d'illustration.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Cadre et fonctionnaire n'ont pas la même mécanique : points sur toute la carrière d'un
            côté, traitement indiciaire de fin de carrière de l'autre, avec des primes traitées
            différemment. Sur des hypothèses identiques, le fonctionnaire à fortes primes affiche un
            taux de remplacement inférieur à celui d'un fonctionnaire sans primes, et le cadre à fort
            salaire voit sa pension portée par la complémentaire.
          </p>
          <p>
            La bonne démarche consiste à calculer son propre taux à partir de son relevé de carrière
            et de son estimation officielle, puis à mesurer l'écart avec le revenu visé. Notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> donne un premier ordre de
            grandeur, et le <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> aide à
            poser ce cadre. Les exemples ne sont pas des projections, et les performances passées ne
            préjugent pas des performances futures.
          </p>

          <h2 id="plus-loin">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/retraite-complementaire-agirc-arrco-cadres-calcul">Retraite complémentaire Agirc-Arrco des cadres : le calcul</a></li>
            <li><a href="/guide/retraite-fonctionnaires-completer">Retraite des fonctionnaires : comment la compléter ?</a></li>
            <li><a href="/guide/capital-necessaire-completer-pension-retraite-65-ans">Quel capital pour compléter sa pension à 65 ans ?</a></li>
            <li><a href="/guide/verifier-releve-de-carriere-retraite">Vérifier son relevé de carrière</a></li>
            <li><a href="/guide/combien-faut-il-epargner-pour-la-retraite">Combien faut-il épargner pour la retraite ?</a></li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en novembre 2026 :</p>
          <ul>
            {sources.map((src) => (
              <li key={src.url + src.label}>
                <a href={src.url} target="_blank" rel="noopener noreferrer">
                  {src.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seules vos
              caisses de retraite peuvent confirmer vos droits et le montant de vos pensions. Les
              règles citées sont celles publiées en {CF.maj} ; les exemples chiffrés sont des
              illustrations pédagogiques en montants bruts, établies sur des hypothèses affichées, qui
              ne préjugent ni de votre situation ni des règles futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Connaître son taux de remplacement réel, c'est mesurer l'épargne à prévoir." />
    </>
  );
}
