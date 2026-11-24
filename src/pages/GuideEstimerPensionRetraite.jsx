import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  AGIRC_ARRCO,
  AGIRC_ARRCO_EXEMPLES,
  ESTIMATION_PENSION_NOV2026,
  REGIME_GENERAL,
  euros,
} from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const A = AGIRC_ARRCO;
const G = REGIME_GENERAL;
const P = ESTIMATION_PENSION_NOV2026;
const pass = A.pass2026;
const plafondT2 = pass * A.multiplePassTranche2;

const nb = (n, d = 1) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });
const pct1 = (n) => nb(n, 0) + " %";
const eurosPrecis = (n) => nb(n, 2) + " €";

// ---- Retraite de base : SAM plafonné au PASS × taux × proratisation ----
const salaireMoyenPlafonne = (salaire) => Math.min(salaire, pass);
const proratisation = (trimestres) => Math.min(trimestres / P.dureeReferenceTrimestres, 1);
const pensionBase = (salaire, trimestres) =>
  (salaireMoyenPlafonne(salaire) * A.tauxPleinRetraiteDeBase) / 100 * proratisation(trimestres);
const pensionBaseMaximale = (pass * A.tauxPleinRetraiteDeBase) / 100;

// ---- Retraite complémentaire : points acquis chaque année ----
const arrondi2 = (n) => Math.round(n * 100) / 100;
const pointsAnnee = (salaire) => {
  const t1 = Math.min(salaire, pass);
  const t2 = Math.max(Math.min(salaire, plafondT2) - pass, 0);
  return (
    arrondi2((t1 * A.tauxCalculPointsT1) / 100 / A.valeurAchatPoint2026) +
    arrondi2((t2 * A.tauxCalculPointsT2) / 100 / A.valeurAchatPoint2026)
  );
};
const pensionComplementaire = (salaire, trimestres) =>
  pointsAnnee(salaire) * (trimestres / P.trimestresMaxParAn) * A.valeurServicePoint;

const pensionTotale = (salaire, trimestres) =>
  pensionBase(salaire, trimestres) + pensionComplementaire(salaire, trimestres);
const tauxRemplacement = (salaire, trimestres) => (pensionTotale(salaire, trimestres) / salaire) * 100;

const trimestresComplets = P.dureeReferenceTrimestres;
const trimestresIncomplets = P.exempleTrimestresCarriereIncomplete;
const profils = [
  { label: "Non-cadre", salaire: P.exempleSalaireNonCadre },
  { label: "Cadre", salaire: P.exempleSalaireCadre },
];
const nonCadre = P.exempleSalaireNonCadre;
const cadre = P.exempleSalaireCadre;
const anneesCarriere = AGIRC_ARRCO_EXEMPLES.dureeCarriereAnnees;

const sources = [
  {
    label: "Info-retraite.fr — Groupement d'intérêt public Union Retraite : relevé de carrière et estimation indicative globale",
    url: "https://www.info-retraite.fr",
  },
  {
    label: "L'Assurance retraite — Calcul de la retraite de base du régime général (salaire annuel moyen, taux, durée d'assurance)",
    url: "https://www.lassuranceretraite.fr",
  },
  {
    label:
      "Service-Public.gouv.fr — Retraite complémentaire du salarié du secteur privé (Agirc-Arrco), fiche F15396, vérifiée le 1er novembre 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F15396",
  },
  {
    label:
      "Service-Public.gouv.fr — À partir de quel âge un salarié peut-il partir en retraite ?, fiche F14043, vérifiée le 14 août 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14043",
  },
  {
    label: "Agirc-Arrco — Retraite complémentaire : points, valeur d'achat et valeur de service du point",
    url: "https://www.agirc-arrco.fr",
  },
];

export default function GuideEstimerPensionRetraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Estimation · taux de remplacement</span>
          <h1>Estimer sa pension de retraite et son taux de remplacement</h1>
          <p className="sub">
            Retraite de base, points Agirc-Arrco, ratio pension/salaire : la méthode pour obtenir
            un ordre de grandeur, puis une estimation officielle. Mis à jour le {A.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> une pension de salarié du privé se compose de deux
              étages. La retraite de base vaut {A.tauxPleinRetraiteDeBase} % du salaire annuel
              moyen des {P.nombreMeilleuresAnnees} meilleures années, plafonné au plafond de la
              sécurité sociale, réduite si la carrière est incomplète. La complémentaire
              Agirc-Arrco se calcule en points. Le taux de remplacement, c'est-à-dire le rapport
              entre pension et dernier salaire, baisse mécaniquement quand le salaire dépasse le
              plafond : c'est pourquoi les cadres sont souvent les plus surpris. Seules vos
              caisses peuvent fournir un montant officiel.
            </p>
          </div>

          <p>
            Savoir combien l'on touchera à la retraite est la première question de toute
            préparation. Prenons un cas illustratif et composite, sans lien avec une situation
            réelle : Nadia, cadre dans le secteur privé, se demande si sa pension suffira à
            maintenir son niveau de vie. Elle a entendu parler de « 50 % du salaire », de « 25
            meilleures années » et de « points », sans savoir comment ces éléments s'assemblent.
          </p>
          <p>
            Cet article reconstitue la mécanique, étage par étage, avec des exemples calculés à
            partir des paramètres 2026 du site. Il ne remplace pas votre relevé de carrière : les
            chiffres obtenus sont des ordres de grandeur pédagogiques, pas une estimation de vos
            droits.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#formule-base">Comment se calcule la retraite de base du régime général ?</a></li>
              <li><a href="#complementaire">Comment se calcule la retraite complémentaire Agirc-Arrco ?</a></li>
              <li><a href="#exemple">Quel taux de remplacement pour un non-cadre et pour un cadre ?</a></li>
              <li><a href="#carriere-incomplete">Que change une carrière incomplète ?</a></li>
              <li><a href="#limites">Quelles sont les limites d'un calcul maison ?</a></li>
              <li><a href="#estimation-officielle">Comment obtenir une estimation officielle ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#aller-plus-loin">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="formule-base">Comment se calcule la retraite de base du régime général ?</h2>
          <p>
            La retraite de base d'un salarié du privé repose sur une formule en trois facteurs :
            le salaire annuel moyen (SAM), le taux, et la proratisation par la durée d'assurance.
          </p>
          <ul>
            <li>
              <strong>Le SAM</strong> est la moyenne des salaires des {P.nombreMeilleuresAnnees}{" "}
              meilleures années de la carrière. Chaque salaire n'est retenu que dans la limite du
              plafond annuel de la sécurité sociale ({euros(pass)} en 2026), après revalorisation
              des anciens salaires.
            </li>
            <li>
              <strong>Le taux plein</strong> est de {A.tauxPleinRetraiteDeBase} %. Il s'applique
              si vous avez la durée d'assurance requise ou si vous partez à l'âge du taux plein
              automatique ({G.ageTauxPleinAutomatique} ans).
            </li>
            <li>
              <strong>La proratisation</strong> multiplie le résultat par le rapport entre vos
              trimestres validés et la durée de référence ({P.dureeReferenceTrimestres} trimestres
              pour les générations nées à partir de 1966), dans la limite de 1.
            </li>
          </ul>
          <p>
            Pension annuelle de base = SAM × taux × (trimestres validés ÷ durée requise).
            Conséquence directe du plafonnement : la retraite de base ne peut pas dépasser{" "}
            {A.tauxPleinRetraiteDeBase} % du plafond, soit {euros(pensionBaseMaximale)} bruts par
            an dans le cadre des paramètres 2026 retenus ici. Au-delà de ce niveau de salaire,
            chaque euro gagné en plus ne produit plus de retraite de base.
          </p>
          <p>
            Les départs avant le taux plein ou après la durée requise ajoutent une décote ou une
            surcote ({G.decoteParTrimestre.toLocaleString("fr-FR")} % par trimestre dans les
            paramètres du site) ; leur calcul détaillé est traité dans notre guide{" "}
            <a href="/guide/surcote-decote-retraite">surcote et décote</a>, que nous ne
            reprenons pas ici.
          </p>

          <h2 id="complementaire">Comment se calcule la retraite complémentaire Agirc-Arrco ?</h2>
          <p>
            Chaque année, une partie de votre salaire est transformée en points : la cotisation
            de référence (taux de calcul de {nb(A.tauxCalculPointsT1)} % jusqu'au plafond, puis{" "}
            {nb(A.tauxCalculPointsT2, 0)} % entre 1 et {A.multiplePassTranche2} plafonds) est
            divisée par la valeur d'achat du point ({eurosPrecis(A.valeurAchatPoint2026)} en
            2026). À la retraite, le total des points est multiplié par la valeur de service du
            point ({nb(A.valeurServicePoint, 4)} € depuis le 1er novembre 2026).
          </p>
          <p>
            Les cotisations dites d'équilibre n'ouvrent aucun point, ce qui explique que les
            cotisations prélevées dépassent la cotisation de référence. Le détail pas à pas, avec
            la grille de points pour différents salaires, figure dans notre guide sur{" "}
            <a href="/guide/retraite-complementaire-agirc-arrco-cadres-calcul">
              la retraite complémentaire Agirc-Arrco des cadres
            </a>
            .
          </p>

          <h2 id="exemple">Quel taux de remplacement pour un non-cadre et pour un cadre ?</h2>
          <div className="note">
            <p>
              Exemple purement illustratif, qui ne correspond à aucun cas réel. Hypothèses : un
              salarié dont le salaire brut annuel reste constant en euros de 2026 pendant{" "}
              {anneesCarriere} ans ({trimestresComplets} trimestres), un départ au taux plein,
              les paramètres 2026 appliqués à toute la carrière (donc sans prise en compte de
              l'évolution future du point), ni points gratuits ni majorations. Montants bruts :
              la pension nette est plus faible après prélèvements sociaux.
            </p>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Profil illustratif</th>
                  <th>Salaire brut annuel</th>
                  <th>Retraite de base</th>
                  <th>Points par an</th>
                  <th>Complémentaire</th>
                  <th>Pension totale</th>
                  <th>Taux de remplacement</th>
                </tr>
              </thead>
              <tbody>
                {profils.map((p) => (
                  <tr key={p.label}>
                    <td>{p.label}</td>
                    <td>{euros(p.salaire)}</td>
                    <td>{euros(pensionBase(p.salaire, trimestresComplets))}</td>
                    <td>{nb(pointsAnnee(p.salaire), 2)}</td>
                    <td>{euros(pensionComplementaire(p.salaire, trimestresComplets))}</td>
                    <td>{euros(pensionTotale(p.salaire, trimestresComplets))}</td>
                    <td>{pct1(tauxRemplacement(p.salaire, trimestresComplets))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Lecture du calcul pour le profil non-cadre ({euros(nonCadre)} par an, sous le
            plafond) : retraite de base = {euros(nonCadre)} × {A.tauxPleinRetraiteDeBase} % ={" "}
            {euros(pensionBase(nonCadre, trimestresComplets))} ; points annuels ={" "}
            {euros(nonCadre)} × {nb(A.tauxCalculPointsT1)} % ÷ {eurosPrecis(A.valeurAchatPoint2026)}{" "}
            ≈ {nb(pointsAnnee(nonCadre), 2)}, soit environ{" "}
            {nb(pointsAnnee(nonCadre) * anneesCarriere, 0)} points sur {anneesCarriere} ans,
            qui valent {euros(pensionComplementaire(nonCadre, trimestresComplets))} par an.
          </p>
          <p>
            Pour le profil cadre ({euros(cadre)} par an), la retraite de base est plafonnée à{" "}
            {euros(pensionBaseMaximale)} : le SAM plafonné ne retient que {euros(pass)} sur{" "}
            {euros(cadre)}. La complémentaire compense en partie grâce à la tranche 2, mais le
            ratio final est plus faible : {pct1(tauxRemplacement(cadre, trimestresComplets))} du
            salaire contre {pct1(tauxRemplacement(nonCadre, trimestresComplets))} pour le
            non-cadre. Plus le salaire s'éloigne du plafond, plus le taux de remplacement
            diminue ; c'est un effet de structure, non une anomalie de votre dossier.
          </p>
          <p>
            Ces ratios sont des ordres de grandeur sur une carrière stable. Une carrière avec
            des salaires croissants, des interruptions ou plusieurs régimes donnera un résultat
            différent, parfois sensiblement.
          </p>

          <h2 id="carriere-incomplete">Que change une carrière incomplète ?</h2>
          <p>
            Avec {trimestresIncomplets} trimestres au lieu de {trimestresComplets}, le
            coefficient de proratisation de la retraite de base est de{" "}
            {trimestresIncomplets} ÷ {trimestresComplets} ≈ {nb(proratisation(trimestresIncomplets), 3)}.
            Les points complémentaires, eux, ne s'acquièrent que sur les périodes cotisées, ce qui
            réduit aussi le second étage. Pour le même salaire que le profil non-cadre :
          </p>
          <ul>
            <li>
              retraite de base : {euros(pensionBase(nonCadre, trimestresIncomplets))} par an
              (contre {euros(pensionBase(nonCadre, trimestresComplets))}) ;
            </li>
            <li>
              complémentaire : {euros(pensionComplementaire(nonCadre, trimestresIncomplets))} par
              an ;
            </li>
            <li>
              pension totale : {euros(pensionTotale(nonCadre, trimestresIncomplets))}, soit un
              taux de remplacement de {pct1(tauxRemplacement(nonCadre, trimestresIncomplets))}.
            </li>
          </ul>
          <p>
            L'exemple suppose un départ à l'âge du taux plein automatique ou sans décote. Un
            départ plus précoce avec des trimestres manquants ajoute une décote, et peut aussi
            entraîner une minoration de la complémentaire (voir{" "}
            <a href="/guide/surcote-decote-retraite">notre guide dédié</a>). Combler des
            trimestres manquants est parfois possible : le coût et l'intérêt du{" "}
            <a href="/guide/combien-coute-rachat-trimestres-retraite">rachat de trimestres</a>{" "}
            font l'objet d'un autre article.
          </p>

          <h2 id="limites">Quelles sont les limites d'un calcul maison ?</h2>
          <p>
            Reconstituer sa pension à la main sert à comprendre, pas à décider. Plusieurs
            éléments échappent au calcul simplifié :
          </p>
          <ul>
            <li>
              les salaires réellement reportés au compte, souvent irréguliers, et les années de
              référence effectivement retenues pour le SAM ;
            </li>
            <li>
              les périodes validées dans d'autres régimes (fonction publique, indépendants,
              étranger), pour lesquelles la règle de calcul diffère ;
            </li>
            <li>
              l'évolution future de la valeur du point, de l'âge légal ou de la réglementation ;
            </li>
            <li>
              les majorations (enfants, notamment) et les points attribués pour certaines
              périodes ;
            </li>
            <li>
              le passage du brut au net, qui dépend de la situation fiscale et sociale du
              retraité.
            </li>
          </ul>
          <p>
            Pour les carrières mixtes ou le secteur public, voir notre guide{" "}
            <a href="/guide/retraite-fonctionnaires-completer">retraite des fonctionnaires</a> et
            celui consacré aux{" "}
            <a href="/guide/retraite-independants-per-ou-madelin">indépendants</a>.
          </p>

          <h2 id="estimation-officielle">Comment obtenir une estimation officielle ?</h2>
          <p>
            La démarche passe par le portail interrégimes{" "}
            <a href="https://www.info-retraite.fr" target="_blank" rel="noopener noreferrer">
              info-retraite.fr
            </a>
            , qui réunit les informations de l'ensemble de vos régimes. Vous y trouvez votre
            relevé de carrière (les trimestres et les salaires reportés) et, selon l'âge, une
            estimation indicative globale de votre future pension. Cette estimation est
            produite par les caisses sur la base de votre dossier ; elle reste indicative et
            n'engage pas leur décision de liquidation.
          </p>
          <ol>
            <li>Connectez-vous à info-retraite.fr, en général avec FranceConnect ou vos identifiants.</li>
            <li>Téléchargez le relevé de carrière et contrôlez les années, les employeurs et les périodes assimilées.</li>
            <li>Si une période manque, rassemblez les justificatifs (bulletins de paie, contrats, attestations) et faites rectifier auprès de la caisse concernée.</li>
            <li>Consultez l'estimation indicative globale quand elle est disponible et comparez-la à vos propres ordres de grandeur.</li>
          </ol>
          <p>
            Notre guide{" "}
            <a href="/guide/verifier-releve-de-carriere-retraite">
              vérifier son relevé de carrière
            </a>{" "}
            détaille la procédure de rectification. Pour une première projection chiffrée avant
            de rassembler ces documents, notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> propose un ordre de
            grandeur à partir d'hypothèses affichées et modifiables.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Comment calculer sa retraite de base au régime général ?</h3>
          <p>
            Multipliez le salaire annuel moyen des {P.nombreMeilleuresAnnees} meilleures années
            (chaque salaire étant plafonné) par le taux de {A.tauxPleinRetraiteDeBase} %, puis par
            le rapport entre vos trimestres et la durée requise. En cas de départ avant le taux
            plein, une décote s'applique en plus.
          </p>
          <h3>Quel est le taux de remplacement moyen d'un retraité ?</h3>
          <p>
            Il n'existe pas de chiffre unique : il dépend du niveau de salaire, de la carrière et
            du régime. Dans nos exemples composites, il est de {pct1(tauxRemplacement(nonCadre, trimestresComplets))}{" "}
            pour un salaire inférieur au plafond et de {pct1(tauxRemplacement(cadre, trimestresComplets))}{" "}
            pour un salaire de {euros(cadre)}, en brut et sur une carrière complète. Ce sont des
            illustrations, pas des moyennes statistiques.
          </p>
          <h3>Pourquoi les cadres ont-ils un taux de remplacement plus faible ?</h3>
          <p>
            La retraite de base est calculée sur un salaire plafonné à {euros(pass)} : la part du
            salaire au-dessus du plafond n'y compte pas. La complémentaire n'en rattrape qu'une
            partie. L'écart entre dernier salaire et pension est donc plus marqué quand le
            salaire est élevé.
          </p>
          <h3>Le calcul porte-t-il sur les 25 dernières années ou sur les 25 meilleures ?</h3>
          <p>
            Sur les {P.nombreMeilleuresAnnees} meilleures années, qui ne sont pas forcément les
            dernières, pour le régime général des salariés du privé. D'autres régimes (la
            fonction publique, par exemple) utilisent d'autres bases de calcul.
          </p>
          <h3>Où trouver mon estimation de pension ?</h3>
          <p>
            Sur info-retraite.fr, avec votre relevé de carrière et, selon votre âge, l'estimation
            indicative globale. Vos caisses peuvent aussi vous renseigner. Seul le calcul de la
            caisse au moment de la demande fait foi.
          </p>
          <h3>Mon salaire brut ou net sert-il de référence ?</h3>
          <p>
            Les droits se calculent sur les salaires bruts reportés à votre compte, dans la limite
            du plafond pour la retraite de base. Les pensions affichées par les simulateurs sont
            en général brutes : le montant net versé est inférieur.
          </p>
          <h3>Les trimestres manquants réduisent-ils aussi la complémentaire ?</h3>
          <p>
            Les points s'acquièrent sur les périodes cotisées, donc une carrière courte en réduit
            mécaniquement le nombre. Un départ avant {A.ageSansMinoration} ans sans durée
            suffisante peut en outre entraîner une minoration de la complémentaire ; voir le
            détail dans nos guides sur la décote et sur la complémentaire.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Estimer sa pension consiste à assembler deux mécaniques distinctes : une formule
            plafonnée et proratisée pour la base, un cumul de points pour la complémentaire. Le
            taux de remplacement qui en résulte est plus élevé pour les salaires proches du
            plafond que pour les salaires supérieurs, et il se dégrade vite quand la carrière est
            incomplète.
          </p>
          <p>
            La bonne séquence est simple : vérifier le relevé de carrière, obtenir l'estimation
            officielle, puis mesurer l'écart avec le revenu souhaité. L'éventuel complément
            d'épargne se dimensionne ensuite, au cas par cas, à partir de cet écart. Notre{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> permet de poser
            ces éléments, et la page{" "}
            <a href="/strategies/decumulation">stratégies de décumulation</a> présente les pistes
            pour transformer l'épargne en revenus. Les placements comportent un risque de perte
            en capital, et les performances passées ne préjugent pas des performances futures.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/age-de-depart-retraite-trimestres-duree-assurance">Âge de départ, trimestres et durée d'assurance : les repères</a></li>
            <li><a href="/guide/combien-faut-il-epargner-pour-la-retraite">Combien faut-il épargner pour la retraite ?</a></li>
            <li><a href="/guide/capital-necessaire-completer-pension-retraite-65-ans">Quel capital pour compléter sa pension ?</a></li>
            <li><a href="/guide/retraite-complementaire-agirc-arrco-cadres-calcul">Retraite complémentaire Agirc-Arrco : calcul pour les cadres</a></li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en novembre 2026 :</p>
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
              caisses de retraite peuvent confirmer vos droits et le montant de vos pensions. Les
              règles citées sont celles publiées en novembre 2026 ; les exemples chiffrés sont
              des illustrations pédagogiques en montants bruts, établies sur des hypothèses
              affichées, qui ne préjugent ni de votre situation ni des règles futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Connaître sa pension future, c'est savoir quel complément construire." />
    </>
  );
}
