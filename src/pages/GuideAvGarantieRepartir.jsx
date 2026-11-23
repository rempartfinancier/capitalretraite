import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  GARANTIES,
  TRANSMISSION,
  V3_AVA_GARANTIE,
  V3_AVA_GARANTIE_DEPOTS,
  euros,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const plafond = GARANTIES.fgapPlafondParAssureParAssureur; // 70 000 €
const depots = V3_AVA_GARANTIE_DEPOTS.plafondDepotsParDeposantParEtablissement; // 100 000 €
const abatt990 = TRANSMISSION.abattementSuccessionAvParBeneficiaire; // 152 500 €
const somme = V3_AVA_GARANTIE.montantAPlacer; // 100 000 €
const nb = V3_AVA_GARANTIE.nombreAssureursExemple; // 3

// ---- Exemple : somme placée chez un seul assureur ou répartie ----
const auDessusUnSeul = Math.max(somme - plafond, 0);
const couvertUnSeul = Math.min(somme, plafond);
const partParAssureur = Math.round(somme / nb);
const auDessusReparti = Math.max(partParAssureur - plafond, 0);
// Somme à partir de laquelle un seul assureur dépasse le plafond, et nombre minimal d'assureurs pour tout couvrir.
const assureursMini = Math.ceil(somme / plafond);

const sources = [
  {
    label:
      "FGAP — Fonds de garantie des assurances de personnes : rôle, plafonds et conditions de la garantie en cas de défaillance d'un assureur",
    url: "https://www.fgap.fr",
  },
  {
    label:
      "FGDR — Fonds de garantie des dépôts et de résolution : garantie des dépôts bancaires (mécanisme distinct de celui des assurances de personnes)",
    url: "https://www.garantiedesdepots.fr",
  },
  {
    label:
      "Service-Public.gouv.fr — Contrat d'assurance-vie : fonctionnement (fiche F15274)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F15274",
  },
  {
    label:
      "AMF — Autorité des marchés financiers : épargner et investir, risque de perte en capital sur les unités de compte",
    url: "https://www.amf-france.org",
  },
  {
    label:
      "Légifrance — Code des assurances, art. L423-1 et suivants (garantie des assurés) ; Code général des impôts, art. 990 I (abattement par bénéficiaire)",
    url: "https://www.legifrance.gouv.fr",
  },
];

export default function GuideAvGarantieRepartir() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · Assurance-vie et sécurité</span>
          <h1>Assurance-vie : garantie et répartition entre contrats</h1>
          <p className="sub">
            Le plafond de la garantie en cas de défaillance de l'assureur, ce qu'il couvre (et ne
            couvre pas), et l'exemple de {euros(somme)} à placer. Mis à jour en{" "}
            {V3_AVA_GARANTIE.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> si un assureur vie fait défaut, le fonds de garantie
              des assurances de personnes (FGAP) intervient jusqu'à {euros(plafond)} par assuré et
              par assureur, tous contrats confondus. Ce plafond est différent des {euros(depots)}{" "}
              de la garantie des dépôts bancaires, et ne protège pas contre la baisse des marchés
              sur les unités de compte. Répartir une somme importante entre plusieurs assureurs
              peut réduire la part exposée à ce risque, mais multiplie les contrats, les frais et
              les formalités. Le montant exact du plafond est à vérifier sur le site du FGAP.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#fgap">Que garantit exactement le FGAP en assurance-vie ?</a></li>
              <li><a href="#depots">Garantie des assurances ou garantie des dépôts : ne pas confondre</a></li>
              <li><a href="#risques">Fonds euros, unités de compte : quels risques sont couverts ?</a></li>
              <li><a href="#exemple">Exemple : {euros(somme)} à placer en assurance-vie</a></li>
              <li><a href="#etapes">Comment répartir ses contrats ? Étapes</a></li>
              <li><a href="#frais">Nombre de contrats et frais : le vrai coût de la répartition</a></li>
              <li><a href="#transmission">Et la transmission ? L'abattement de {euros(abatt990)} par bénéficiaire</a></li>
              <li><a href="#tableau">Répartir ou concentrer : quand ça vaut le coup</a></li>
              <li><a href="#pieges">Quels pièges éviter ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#lire-aussi">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Prenons Hélène, 64 ans, qui vient de toucher le prix de la vente d'un bien et dispose
            de {euros(somme)} à placer. Elle entend parler de « garantie à {euros(plafond)} » et de
            « garantie à {euros(depots)} » sans savoir lesquelles s'appliquent à l'assurance-vie.
            Faut-il ouvrir plusieurs contrats chez des assureurs différents ? Profil composite,
            sans lien avec une personne réelle : sa question est classique, et ce guide y répond
            en séparant ce qui est protégé de ce qui ne l'est pas.
          </p>
          <p>
            Il s'agit d'informations générales et non d'un conseil personnalisé : la répartition
            adaptée dépend de votre situation. Pour la vue d'ensemble des risques d'un contrat,
            voyez aussi{" "}
            <a href="/guide/risques-assurance-vie">notre guide sur les risques de l'assurance-vie</a>.
          </p>

          <h2 id="fgap">Que garantit exactement le FGAP en assurance-vie ?</h2>
          <p>
            Le FGAP est un fonds de garantie qui indemnise les souscripteurs si leur assureur de
            personnes devient défaillant. Il couvre jusqu'à {euros(plafond)} par assuré et par
            assureur, tous contrats confondus : posséder trois contrats chez le même assureur
            n'ouvre pas trois plafonds. Des règles distinctes peuvent s'appliquer à certains
            produits (rentes, par exemple) ; ces points sont à vérifier sur le site du FGAP
            (Code des assurances, art. L423-1 et suivants).
          </p>
          <p>
            Ce mécanisme joue en cas de défaillance de l'assureur, événement exceptionnel que
            les autorités de contrôle cherchent d'abord à traiter autrement (reprise du
            portefeuille, par exemple). Il faut donc le voir comme un filet de sécurité, pas
            comme le critère principal de choix d'un contrat. Un contrat ne vaut pas mieux
            parce qu'il a un plafond ; la solidité de l'assureur reste le premier garde-fou.
          </p>

          <h2 id="depots">Garantie des assurances ou garantie des dépôts : ne pas confondre</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Assurance-vie (FGAP)</th>
                  <th>Dépôts bancaires (FGDR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Plafond indicatif</td>
                  <td>{euros(plafond)} par assuré et par assureur</td>
                  <td>{euros(depots)} par déposant et par établissement</td>
                </tr>
                <tr>
                  <td>Ce que protège la garantie</td>
                  <td>La défaillance de l'assureur</td>
                  <td>La défaillance de la banque (comptes, livrets)</td>
                </tr>
                <tr>
                  <td>Ce qu'elle ne couvre pas</td>
                  <td>La baisse de valeur des unités de compte</td>
                  <td>Les placements financiers et contrats d'assurance-vie</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Un contrat d'assurance-vie souscrit auprès d'une banque est un produit d'assurance :
            la protection qui s'applique est celle des assurances de personnes, pas celle des
            dépôts. Les plafonds, leur périmètre et leurs conditions sont fixés par les textes
            et peuvent évoluer ; vérifiez-les sur les sites du FGAP et du FGDR avant toute
            décision.
          </p>

          <h2 id="risques">Fonds euros, unités de compte : quels risques sont couverts ?</h2>
          <p>
            Sur un contrat, deux risques sont à distinguer : le risque de défaillance de
            l'assureur, que le FGAP couvre jusqu'au plafond, et le risque de marché, que personne
            ne garantit.
          </p>
          <ul>
            <li>
              <strong>Fonds en euros.</strong> Le capital est en principe garanti par
              l'assureur (hors frais de gestion), mais cette garantie vaut ce que vaut l'assureur.
              Le FGAP joue en cas de défaillance.
            </li>
            <li>
              <strong>Unités de compte.</strong> Leur valeur fluctue et peut baisser : le
              capital n'est pas garanti, la perte en capital est possible, et les performances
              passées ne préjugent pas des performances futures. Le FGAP ne compense pas une
              baisse de marché. Voir{" "}
              <a href="/guide/assurance-vie-fonds-euros-ou-uc-a-55-ans">fonds euros ou unités de compte</a>.
            </li>
          </ul>
          <p>
            Répartir entre assureurs ne réduit donc que le risque de défaillance de l'un d'eux,
            pas celui des marchés : pour ce dernier, la diversification se fait au sein des
            supports, pas entre les contrats.
          </p>

          <h2 id="exemple">Exemple : {euros(somme)} à placer en assurance-vie</h2>
          <p>
            Exemple illustratif : {euros(somme)} placés sur un contrat unique auprès d'un seul
            assureur. Le plafond de {euros(plafond)} couvre {euros(couvertUnSeul)} ; le solde de{" "}
            {euros(auDessusUnSeul)} dépasse le plafond en cas de défaillance. Les mêmes{" "}
            {euros(somme)} répartis entre {nb} assureurs à parts égales représentent{" "}
            {euros(partParAssureur)} par assureur, sous le plafond de {euros(plafond)} : soit{" "}
            {euros(auDessusReparti)} au-dessus du plafond.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Hypothèse</th>
                  <th>Montant par assureur</th>
                  <th>Part au-dessus du plafond de {euros(plafond)}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 assureur</td>
                  <td>{euros(somme)}</td>
                  <td>{euros(auDessusUnSeul)}</td>
                </tr>
                <tr>
                  <td>{nb} assureurs à parts égales</td>
                  <td>{euros(partParAssureur)}</td>
                  <td>{euros(auDessusReparti)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Il faut au minimum {assureursMini} assureurs pour que chaque part reste sous le
            plafond pour {euros(somme)}. Cet exemple est une illustration arithmétique : il ne
            dit pas qu'il faut répartir, ni qu'un risque de défaillance existe pour un assureur
            donné. Il montre seulement ce qu'un plafond signifie en pratique.
          </p>

          <h2 id="etapes">Comment répartir ses contrats ? Étapes</h2>
          <ol>
            <li>
              <strong>Faire l'inventaire</strong> : contrats déjà détenus, assureurs, encours par
              assureur. Le plafond s'apprécie par assureur, tous contrats confondus.
            </li>
            <li>
              <strong>Vérifier l'assureur derrière chaque contrat.</strong> Deux contrats
              distribués par des banques ou courtiers différents peuvent dépendre du même assureur.
            </li>
            <li>
              <strong>Définir ce que l'on cherche à protéger</strong> : la part en fonds en euros
              est celle qui bénéficie de la garantie de l'assureur ; les unités de compte
              relèvent d'un autre risque.
            </li>
            <li>
              <strong>Comparer les frais totaux</strong> de chaque contrat avant de multiplier
              les ouvertures (voir <a href="/guide/combien-coute-une-assurance-vie">le prix d'une assurance-vie</a>
              ).
            </li>
            <li>
              <strong>Ouvrir les contrats</strong> selon la démarche décrite dans{" "}
              <a href="/guide/comment-ouvrir-une-assurance-vie-etapes">comment ouvrir une assurance-vie</a>.
            </li>
            <li>
              <strong>Rédiger une clause bénéficiaire pour chaque contrat</strong> (voir{" "}
              <a href="/guide/clause-beneficiaire-assurance-vie-comment-la-rediger">comment la rédiger</a>
              ).
            </li>
            <li>
              <strong>Réviser régulièrement</strong> : l'encours par assureur évolue avec les
              gains et les versements.
            </li>
          </ol>

          <h2 id="frais">Nombre de contrats et frais : le vrai coût de la répartition</h2>
          <p>
            Multiplier les contrats n'augmente pas forcément les frais proportionnels (les
            pourcentages restent les mêmes), mais ajoute des coûts indirects : plusieurs notices
            à lire, des clauses à tenir à jour, des déclarations à vérifier, parfois des frais
            fixes ou des versements minimaux par contrat. Un contrat de plus est aussi un
            contrat de plus à surveiller et à transmettre : un bénéficiaire qui découvre
            plusieurs contrats doit les retrouver et les réclamer un à un.
          </p>
          <p>
            Par ailleurs, répartir entre assureurs dilue l'ancienneté : chaque contrat
            démarre à sa date de souscription, ce qui compte pour le délai d'ancienneté fiscale et l'abattement
            (voir{" "}
            <a href="/guide/assurance-vie-apres-8-ans-fiscalite-et-rente">l'assurance-vie après 8 ans</a>
            ). Il faut donc arbitrer entre la sécurité apportée par la diversification des
            assureurs et la simplicité de gestion.
          </p>

          <h2 id="transmission">Et la transmission ? L'abattement de {euros(abatt990)} par bénéficiaire</h2>
          <p>
            Pour les primes versées avant 70 ans, un abattement de {euros(abatt990)} s'applique en
            principe par bénéficiaire sur l'ensemble des capitaux décès qu'il reçoit des contrats
            du défunt (CGI, art. 990 I, à vérifier). Cet abattement est donc lié au nombre de
            bénéficiaires, et non au nombre de contrats : ouvrir plusieurs contrats ne multiplie
            pas l'abattement pour un même bénéficiaire. Pour le détail, voyez{" "}
            <a href="/guide/clause-beneficiaire-assurance-vie-comment-la-rediger">notre guide sur la clause bénéficiaire</a>{" "}
            et{" "}
            <a href="/guide/assurance-vie-apres-70-ans-fiscalite-succession">celui sur l'assurance-vie après 70 ans</a>.
          </p>

          <h2 id="tableau">Répartir ou concentrer : quand ça vaut le coup</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Répartir entre assureurs peut se justifier si…</th>
                  <th>Concentrer peut suffire si…</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Votre encours en fonds en euros dépasse nettement {euros(plafond)} chez un même assureur</td>
                  <td>Votre encours reste sous {euros(plafond)} chez chaque assureur</td>
                </tr>
                <tr>
                  <td>La tranquillité face au risque de défaillance est prioritaire pour vous</td>
                  <td>Vous privilégiez la simplicité et le suivi d'un seul contrat</td>
                </tr>
                <tr>
                  <td>Les contrats retenus ont des frais comparables</td>
                  <td>Chaque contrat supplémentaire ajouterait des frais fixes ou des minimums</td>
                </tr>
                <tr>
                  <td>Vous gérez des clauses bénéficiaires à jour sur chaque contrat</td>
                  <td>Votre situation familiale est complexe et gagne à rester lisible</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="pieges">Quels pièges éviter ?</h2>
          <ul>
            <li>
              <strong>Confondre {euros(plafond)} et {euros(depots)}.</strong> Ce sont deux
              garanties différentes, pour deux types de produits.
            </li>
            <li>
              <strong>Croire que le plafond couvre la perte de marché</strong> sur les unités de
              compte.
            </li>
            <li>
              <strong>Ouvrir plusieurs contrats chez le même assureur</strong> en pensant
              multiplier le plafond.
            </li>
            <li>
              <strong>Choisir un contrat uniquement pour sa « garantie »</strong>, sans regarder
              les frais, les supports et la solidité de l'assureur.
            </li>
            <li>
              <strong>Éparpiller sans suivi</strong> : des contrats oubliés, des clauses
              obsolètes.
            </li>
            <li>
              <strong>Ne plus vérifier le plafond</strong> : il peut évoluer, d'où l'intérêt de
              consulter le site du FGAP.
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Mon assurance-vie est-elle garantie à {euros(plafond)} ?</h3>
          <p>
            Elle est couverte par le FGAP jusqu'à {euros(plafond)} par assuré et par assureur en
            cas de défaillance de l'assureur, selon le plafond en vigueur à vérifier sur le site
            du fonds. Cette garantie ne couvre pas la baisse de valeur des unités de compte.
          </p>

          <h3>La garantie de {euros(depots)} s'applique-t-elle à l'assurance-vie ?</h3>
          <p>
            Non. Les {euros(depots)} correspondent à la garantie des dépôts bancaires (comptes,
            livrets). L'assurance-vie relève d'un mécanisme distinct, celui des assurances de
            personnes.
          </p>

          <h3>Que faire pour {euros(somme)} à placer en assurance-vie ?</h3>
          <p>
            Il n'y a pas de réponse unique. Sur cette somme, un seul assureur dépasserait le
            plafond de {euros(plafond)} d'environ {euros(auDessusUnSeul)} ; répartir sur {nb}{" "}
            assureurs reste sous ce plafond mais ajoute des contrats à suivre. La décision
            dépend de l'objectif, de l'horizon, des frais et de votre goût pour la simplicité.
          </p>

          <h3>Deux contrats chez le même assureur ouvrent-ils deux plafonds ?</h3>
          <p>
            Non : le plafond s'apprécie par assuré et par assureur, tous contrats confondus.
          </p>

          <h3>Les unités de compte sont-elles protégées ?</h3>
          <p>
            Pas contre les marchés : leur valeur peut baisser et le capital n'est pas garanti.
            La garantie intervient seulement si l'assureur est défaillant, dans les limites du
            plafond et des règles du FGAP.
          </p>

          <h3>Faut-il plusieurs contrats pour réduire le risque ?</h3>
          <p>
            Cela réduit l'exposition à un assureur donné mais pas aux marchés. Le gain de
            sécurité doit être comparé aux frais et à la charge de gestion supplémentaires.
          </p>

          <h3>Combien de contrats d'assurance-vie peut-on avoir ?</h3>
          <p>
            Aucune limite légale. Veillez toutefois à garder un suivi clair : clauses à jour,
            relevés, frais, assureur de chaque contrat.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La garantie à {euros(plafond)} répond à un risque précis et rare : la défaillance de
            l'assureur. Elle ne protège ni des marchés, ni d'un mauvais choix de contrat, et ne
            doit pas être confondue avec les {euros(depots)} des dépôts bancaires. Pour{" "}
            {euros(somme)} à placer, l'arithmétique montre que répartir réduit la part au-dessus
            du plafond, mais ce gain a un prix en simplicité et en suivi. Beaucoup d'épargnants
            jugent préférable de vérifier d'abord la solidité de l'assureur et les frais,
            puis de répartir s'ils estiment le jeu en valoir la chandelle.
          </p>
          <p>
            Pour poursuivre : la question des frais est traitée dans{" "}
            <a href="/guide/combien-coute-une-assurance-vie">le prix d'une assurance-vie</a>, celle
            du transfert dans{" "}
            <a href="/guide/transferer-assurance-vie-sans-perdre-anteriorite">transférer son assurance-vie</a>
            , et celle de l'intérêt d'un contrat de droit luxembourgeois dans{" "}
            <a href="/guide/assurance-vie-luxembourgeoise">notre présentation neutre</a> (site
            partenaire du réseau :{" "}
            <a href="https://assurancevie.lu" target="_blank" rel="noopener noreferrer">assurancevie.lu</a>
            ). Le <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> permet de
            situer cette question dans votre stratégie globale, et le guide{" "}
            <a href="/guide/investir-100000-euros-pour-la-retraite">investir 100 000 € pour la retraite</a>{" "}
            traite l'allocation entre enveloppes.
          </p>

          <h2 id="lire-aussi">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/risques-assurance-vie">Les risques de l'assurance-vie</a></li>
            <li><a href="/guide/comment-ouvrir-une-assurance-vie-etapes">Comment ouvrir une assurance-vie</a></li>
            <li><a href="/guide/investir-100000-euros-pour-la-retraite">Investir 100 000 € pour la retraite</a></li>
            <li><a href="/guide/assurance-vie-a-60-ans-ou-a-la-retraite">Assurance-vie à 60 ans ou à la retraite</a></li>
            <li><a href="/strategies/assurance-vie-retraite">L'assurance-vie pour la retraite : vue d'ensemble</a></li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en novembre 2026 :</p>
          <ul>
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les
              plafonds de garantie sont cités en l'état des textes en {V3_AVA_GARANTIE.maj} et
              peuvent évoluer : seuls les sites du FGAP et du FGDR font foi. Le profil d'Hélène et
              les montants de l'exemple sont des illustrations pédagogiques. Les supports en
              unités de compte présentent un risque de perte en capital.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="La garantie protège d'une défaillance, pas d'un mauvais choix de contrat." />
    </>
  );
}
