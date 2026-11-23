import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  IMMO,
  V3_IMM_CHOISIR_SCPI,
  euros,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const M = IMMO.scpiMarche;
const E = V3_IMM_CHOISIR_SCPI;

const r2 = (n) => Math.round(n * 100) / 100;
const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " %";
const eur = (n) =>
  Number.isInteger(r2(n))
    ? euros(n)
    : new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(r2(n));

// ---- Exemple d'une part fictive ----
const tauxDistribution = r2((E.distributionParPart / E.prixPart) * 100);
const fraisEuros = r2((E.prixPart * E.fraisSouscriptionPct) / 100);
const valeurHorsFrais = r2(E.prixPart - fraisEuros);
const anneesPourCouvrirFrais = r2(fraisEuros / E.distributionParPart);
const distributionReport = r2((E.distributionParPart * E.partIssueDuReportANouveauPct) / 100);
const distributionRecurrente = r2(E.distributionParPart - distributionReport);
const tauxRecurrent = r2((distributionRecurrente / E.prixPart) * 100);
// Même part, prix de part en baisse du pourcentage moyen observé en 2025 (ASPIM).
const baisse2025 = Math.abs(M.variationPrixPart2025);
const prixApresBaisse = r2(E.prixPart * (1 - baisse2025 / 100));
const rendementGlobalIllustratif = r2(
  ((E.distributionParPart + (prixApresBaisse - E.prixPart)) / E.prixPart) * 100
);

const sources = [
  {
    label:
      "AMF — Guide « Investir dans une SCPI » (décembre 2023) : fonctionnement, document d'informations clés, frais, risques, liquidité",
    url: "https://www.amf-france.org/sites/institutionnel/files/private/2023-12/2023_investir_dans_une_scpi.pdf",
  },
  {
    label:
      "AMF — Espace épargnants : informations pour les épargnants, réclamation et médiation",
    url: "https://www.amf-france.org/fr/espace-epargnants",
  },
  {
    label:
      "ASPIM — Communiqué du 1er semestre 2026 (5 août 2026) : taux de distribution, prix de part, capitalisation, parts en attente de retrait",
    url: "https://www.aspim.fr/content/uploads/2026/08/ASPIM_CP-1S-2026_V7-def.pdf",
  },
  {
    label:
      "ASPIM — Communiqué du 4e trimestre 2025 (10 février 2026) : résultats annuels 2025 du marché des SCPI",
    url: "https://www.aspim.fr/content/uploads/2026/02/ASPIM_CP-4T-2025_V4.pdf",
  },
  {
    label:
      "Service-Public.gouv.fr — Prélèvements sociaux (CSG, CRDS) sur les revenus du patrimoine et de placements, fiche F2329",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2329",
  },
  {
    label:
      "impots.gouv.fr — Les régimes d'imposition : revenus fonciers et déclaration",
    url: "https://www.impots.gouv.fr/particulier/les-regimes-dimposition",
  },
];

export default function GuideChoisirScpi() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide action · SCPI et retraite</span>
          <h1>Comment choisir une SCPI : la check-list avant de souscrire</h1>
          <p className="sub">
            Il n'existe pas de « meilleure SCPI » valable pour tous : il existe une méthode pour
            juger celle qu'on vous propose. Dix points à vérifier, un exemple chiffré, les pièges.
            Mis à jour en novembre 2026.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> avant de souscrire une SCPI, lisez le document
              d'informations clés et vérifiez dix points : indicateur de risque, taux de
              distribution et taux d'occupation, frais, stratégie, endettement, délai de
              jouissance, prix de part, liquidité, label. Ne comparez jamais un taux de
              distribution isolé : en 2025, le taux de distribution moyen du marché était de{" "}
              {pct1(M.tauxDistribution2025)}, mais le prix de part moyen reculait de{" "}
              {pct1(Math.abs(M.variationPrixPart2025))} (ASPIM). Ce guide ne classe aucune SCPI et
              ne désigne aucun produit.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#meilleure">Existe-t-il une « meilleure SCPI » ?</a></li>
              <li><a href="#checklist">Les dix points à vérifier avant de souscrire</a></li>
              <li><a href="#distribution">Taux de distribution, TOF, performance : que comparer vraiment ?</a></li>
              <li><a href="#exemple">Un exemple chiffré : une part fictive pas à pas</a></li>
              <li><a href="#frais">Comment lire les frais de souscription et de gestion ?</a></li>
              <li><a href="#souscription">Comment souscrire : étapes, documents, délais</a></li>
              <li><a href="#pieges">Quels pièges éviter ?</a></li>
              <li><a href="#tableau">Quand souscrire, quand attendre</a></li>
              <li><a href="#prudence">Pourquoi rester prudent en 2026 ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#aller-plus-loin">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            La requête « meilleure SCPI » est l'une des plus tapées par les épargnants qui préparent
            leur retraite. Elle appelle un classement : trois ou cinq noms, un taux, une étoile.
            C'est précisément ce que ce guide ne fera pas, parce que ce classement n'existe pas de
            façon honnête : un taux passé ne prédit rien, et la SCPI qui convient à un investisseur
            peut ne pas convenir à un autre.
          </p>
          <p>
            Prenons un profil illustratif, sans lien avec un cas réel : un salarié de 59 ans
            hésite à placer une partie de son capital en SCPI. Il a reçu trois plaquettes, chacune
            avec un taux différent, et ne sait pas lesquelles comparer. Ce qu'il lui faut n'est pas
            un nom, mais une grille de lecture. Pour comprendre le placement lui-même, voyez d'abord{" "}
            <a href="/guide/scpi-preparer-sa-retraite">notre guide sur les SCPI pour la retraite</a>.
          </p>

          <h2 id="meilleure">Existe-t-il une « meilleure SCPI » ?</h2>
          <p>
            Non : il n'existe pas de meilleure SCPI en soi, seulement des SCPI plus ou moins
            adaptées à un objectif, un horizon, une fiscalité et une tolérance au risque. Les
            performances passées ne préjugent pas des performances futures, et une SCPI en tête
            d'un classement une année peut reculer l'année suivante.
          </p>
          <p>
            Ce que l'on peut faire, c'est une méthode : définir ce que l'on attend (revenu, capital,
            fiscalité), lire les documents réglementaires, vérifier dix points précis, puis comparer
            deux ou trois SCPI sur ces points, jamais sur le taux seul. C'est l'objet de la
            check-list qui suit. Elle ne remplace pas l'avis d'un conseiller en investissements
            financiers, qui peut adapter l'analyse à votre situation.
          </p>

          <h2 id="checklist">Les dix points à vérifier avant de souscrire</h2>
          <ol>
            <li>
              <strong>Le document d'informations clés (DIC ou KID).</strong> Document réglementaire
              de quelques pages : objectifs, risques, coûts, durée de placement recommandée (
              {E.dureePlacementRecommandee} selon les cas). Demandez-le avant toute souscription et
              lisez-le avant la plaquette commerciale.
            </li>
            <li>
              <strong>L'indicateur synthétique de risque (SRI).</strong> Échelle de 1 à{" "}
              {M.dicIndicateurRisqueEchelle}. Une SCPI n'est pas un livret : même au bas de
              l'échelle, le capital n'est pas garanti.
            </li>
            <li>
              <strong>Le taux de distribution.</strong> Revenu distribué rapporté au prix de part.
              Comparez-le avec le taux d'occupation et le prix de part, pas seul (voir plus bas).
            </li>
            <li>
              <strong>Le taux d'occupation financier (TOF).</strong> Part des loyers effectivement
              encaissés par rapport aux loyers potentiels : un TOF bas annonce des distributions
              plus faibles.
            </li>
            <li>
              <strong>Les frais de souscription.</strong> Fourchette citée par l'AMF : de{" "}
              {M.fraisSouscriptionAmfMin} à {M.fraisSouscriptionAmfMax} % du prix de part, à
              vérifier SCPI par SCPI. Ils pèsent dès le premier jour.
            </li>
            <li>
              <strong>Les frais de gestion.</strong> Prélevés chaque année sur les loyers : ils
              expliquent une partie de l'écart entre loyers bruts et distribution.
            </li>
            <li>
              <strong>La stratégie.</strong> Bureaux, commerces, santé, logistique, résidentiel,
              Europe ou France : chaque segment réagit différemment au cycle. Une SCPI diversifiée
              n'est pas forcément plus sûre, mais son risque est différent.
            </li>
            <li>
              <strong>L'endettement.</strong> Certaines SCPI empruntent pour acheter. Vérifiez le
              niveau autorisé par l'assemblée générale et le niveau réel : l'effet de levier amplifie
              les gains comme les pertes.
            </li>
            <li>
              <strong>Le délai de jouissance.</strong> Les parts souscrites ne rapportent qu'après
              un délai (de l'ordre de quelques mois, variable selon la SCPI) : pendant ce temps, le
              capital est immobilisé sans revenu.
            </li>
            <li>
              <strong>La liquidité et le label.</strong> Fonctionnement du retrait ou du marché
              secondaire, parts en attente, et, si cela compte pour vous, le label ISR (qui ne
              garantit pas la performance financière).
            </li>
          </ol>

          <h2 id="distribution">Taux de distribution, TOF, performance : que comparer vraiment ?</h2>
          <p>
            Trois notions voisines sont souvent confondues. Le taux de distribution mesure le revenu
            versé ; le taux d'occupation, la santé locative ; la performance globale, l'ensemble
            des gains et pertes, prix de part compris.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Indicateur</th>
                  <th>Ce qu'il mesure</th>
                  <th>Ce qu'il ne dit pas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Taux de distribution</td>
                  <td>Revenu distribué ÷ prix de souscription</td>
                  <td>L'évolution du prix de part, ni la part prise sur les réserves</td>
                </tr>
                <tr>
                  <td>Taux d'occupation financier</td>
                  <td>Loyers encaissés ÷ loyers possibles</td>
                  <td>La valeur du patrimoine ni la dette</td>
                </tr>
                <tr>
                  <td>Performance globale</td>
                  <td>Distribution + variation du prix de part</td>
                  <td>Les frais d'entrée si l'on achète au prix de souscription</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Ordre de grandeur de marché, repris des communiqués de l'ASPIM : en 2025, taux de
            distribution moyen pondéré de {pct1(M.tauxDistribution2025)}, variation du prix de part
            moyen de {pct1(M.variationPrixPart2025)}, taux de rendement global de{" "}
            {pct1(M.performanceGlobale2025)}. Ce sont des moyennes de marché, pas la situation d'une
            SCPI donnée : l'écart entre le taux de distribution et la performance globale illustre
            simplement pourquoi un taux affiché ne suffit pas.
          </p>

          <h2 id="exemple">Un exemple chiffré : une part fictive pas à pas</h2>
          <div className="note">
            <p>
              Part purement fictive, sans lien avec une SCPI réelle ni projection. La part
              prélevée sur les réserves est une hypothèse d'école, utilisée pour montrer l'effet
              possible d'une distribution non entièrement issue des loyers.
            </p>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Étape</th>
                  <th>Calcul</th>
                  <th>Résultat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Prix de souscription</td>
                  <td>Donnée de la plaquette</td>
                  <td>{euros(E.prixPart)}</td>
                </tr>
                <tr>
                  <td>Taux de distribution affiché</td>
                  <td>{euros(E.distributionParPart)} ÷ {euros(E.prixPart)}</td>
                  <td>{pct1(tauxDistribution)}</td>
                </tr>
                <tr>
                  <td>Frais de souscription</td>
                  <td>{euros(E.prixPart)} × {pct1(E.fraisSouscriptionPct)}</td>
                  <td>{eur(fraisEuros)}, soit {eur(valeurHorsFrais)} réellement investis</td>
                </tr>
                <tr>
                  <td>Années de distribution pour couvrir ces frais</td>
                  <td>{eur(fraisEuros)} ÷ {euros(E.distributionParPart)}</td>
                  <td>Environ {anneesPourCouvrirFrais.toLocaleString("fr-FR")} ans</td>
                </tr>
                <tr>
                  <td>Si {pct1(E.partIssueDuReportANouveauPct)} de la distribution vient des réserves</td>
                  <td>{euros(E.distributionParPart)} − {eur(distributionReport)}</td>
                  <td>
                    {eur(distributionRecurrente)} issus des loyers, soit un taux « récurrent » de{" "}
                    {pct1(tauxRecurrent)}
                  </td>
                </tr>
                <tr>
                  <td>Si le prix de part recule de {pct1(baisse2025)} (moyenne 2025)</td>
                  <td>{euros(E.prixPart)} × (1 − {pct1(baisse2025)})</td>
                  <td>
                    Part à {eur(prixApresBaisse)} ; performance de l'année : {pct1(rendementGlobalIllustratif)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Trois enseignements, sans qu'aucun ne soit une prévision. Le taux affiché inclut les
            frais d'entrée dans son dénominateur, donc la base réellement investie est plus
            petite. La qualité d'un taux dépend de la part issue des loyers, ce que le bulletin
            trimestriel et le rapport annuel permettent de vérifier. Et le prix de part peut faire
            plus que contrebalancer la distribution une année donnée.
          </p>

          <h2 id="frais">Comment lire les frais de souscription et de gestion ?</h2>
          <p>
            Les frais se lisent en deux temps : ceux de l'entrée, payés une fois, et ceux de la vie
            de la part, prélevés chaque année. Les premiers pèsent sur l'horizon court, les seconds
            sur le long terme.
          </p>
          <ul>
            <li>
              <strong>Frais de souscription.</strong> Ils réduisent d'emblée la valeur de retrait.
              Certaines SCPI récentes n'en affichent pas à l'entrée, mais prélèvent davantage à la
              gestion ou à la sortie : comparez le coût total sur votre durée de détention, pas
              une ligne isolée.
            </li>
            <li>
              <strong>Frais de gestion.</strong> Exprimés en pourcentage des loyers, ils figurent
              dans le DIC. Plus ils sont élevés, plus la distribution est réduite pour un même
              parc.
            </li>
            <li>
              <strong>Frais de cession.</strong> Au retrait ou en cas de vente sur le marché
              secondaire, des frais peuvent s'ajouter.
            </li>
          </ul>
          <p>
            Si vous envisagez une détention via un contrat d'assurance-vie ou un PER, les frais du
            contrat s'ajoutent : voir <a href="/guide/scpi-assurance-vie-ou-per">SCPI en assurance-vie ou PER</a>.
          </p>

          <h2 id="souscription">Comment souscrire : étapes, documents, délais</h2>
          <ol>
            <li>
              <strong>Cadrer votre projet.</strong> Montant, horizon, mode de détention (direct,
              assurance-vie, PER), fiscalité, tolérance à une baisse de capital.
            </li>
            <li>
              <strong>Demander les documents.</strong> DIC, statuts, note d'information, dernier
              bulletin trimestriel et rapport annuel de chaque SCPI envisagée.
            </li>
            <li>
              <strong>Remplir le questionnaire d'adéquation.</strong> Le distributeur doit
              apprécier si le produit correspond à votre profil ; répondez avec exactitude.
            </li>
            <li>
              <strong>Souscrire.</strong> Bulletin de souscription, pièce d'identité, justificatif
              de domicile et virement ; en direct, un justificatif d'origine des fonds peut être
              demandé.
            </li>
            <li>
              <strong>Suivre le délai de jouissance.</strong> Les revenus ne commencent qu'après un
              délai, en général de quelques mois : notez la date exacte.
            </li>
            <li>
              <strong>Déclarer les revenus.</strong> L'administration fiscale est informée des
              revenus ; vérifiez le préremplissage de la déclaration (revenus fonciers).
            </li>
          </ol>
          <p>
            Pour approfondir une souscription accompagnée, vous pouvez consulter{" "}
            <a href="https://scpirentable.fr" target="_blank" rel="noopener noreferrer">scpirentable.fr</a>
            , lien vers un site partenaire du réseau auquel est affilié notre site : cette mention
            n'est ni un classement ni une recommandation d'achat, et n'a pas d'incidence sur le contenu
            de ce guide. L'adéquation d'un produit à votre situation relève d'un conseil
            personnalisé.
          </p>

          <h2 id="pieges">Quels pièges éviter ?</h2>
          <ul>
            <li>
              <strong>Choisir sur le taux le plus élevé.</strong> Un taux élevé peut refléter un
              risque plus grand, des réserves consommées ou un prix de part déjà en baisse.
            </li>
            <li>
              <strong>Ignorer le prix de part.</strong> Il peut baisser : le capital n'est pas
              garanti.
            </li>
            <li>
              <strong>Confondre TOF et taux de distribution.</strong> Le premier mesure la santé
              locative, le second le revenu versé.
            </li>
            <li>
              <strong>Sous-estimer la liquidité.</strong> Un retrait n'est pas garanti : en 2026,
              l'ASPIM relevait {M.partsEnAttenteS12026Pct.toLocaleString("fr-FR")} % de la capitalisation
              en attente de retrait au 30 juin.
            </li>
            <li>
              <strong>Mettre tout son capital dans une seule SCPI.</strong> Un portefeuille
              concentré expose à un seul gestionnaire et à une seule stratégie.
            </li>
            <li>
              <strong>Emprunter sans test de résistance.</strong> Voir{" "}
              <a href="/guide/scpi-a-credit-ou-comptant">SCPI à crédit ou comptant</a>.
            </li>
            <li>
              <strong>Oublier la fiscalité.</strong> Les revenus sont imposés à votre tranche
              marginale : <a href="/guide/scpi-fiscalite-revenus-plus-values">fiscalité des SCPI</a>.
            </li>
          </ul>

          <h2 id="tableau">Quand souscrire, quand attendre</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Situation</th>
                  <th>Piste de réflexion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Horizon long, capital qui n'est pas nécessaire à court terme, réserve déjà constituée</td>
                  <td>Une souscription progressive peut se discuter, après lecture du DIC.</td>
                </tr>
                <tr>
                  <td>Besoin possible du capital dans les prochaines années</td>
                  <td>Attendre : la sortie n'est pas garantie.</td>
                </tr>
                <tr>
                  <td>Le seul argument est un taux de distribution élevé</td>
                  <td>Attendre et comparer les dix points de la check-list.</td>
                </tr>
                <tr>
                  <td>Déjà beaucoup d'immobilier dans le patrimoine</td>
                  <td>Réfléchir à la diversification avant d'en ajouter.</td>
                </tr>
                <tr>
                  <td>Imposition élevée</td>
                  <td>Étudier la détention en assurance-vie ou PER, qui change la fiscalité.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="prudence">Pourquoi rester prudent en 2026 ?</h2>
          <p>
            Le marché des SCPI a traversé une phase de tension : selon l'ASPIM, le prix de part
            moyen a reculé de {pct1(Math.abs(M.variationPrixPart2025))} en 2025 et de{" "}
            {pct1(Math.abs(M.variationPrixPartS12026))} au premier semestre 2026, et{" "}
            {M.partsEnAttenteS12026Pct.toLocaleString("fr-FR")} % de la capitalisation attendait un
            retrait au 30 juin 2026 ({M.partsEnAttenteS12026Md.toLocaleString("fr-FR")} milliards
            d'euros). Ces données évoluent à chaque communiqué ; elles ne disent rien de l'avenir.
            Le projet de loi de finances pour 2027 n'étant pas adopté à la date de rédaction, la
            fiscalité peut aussi évoluer.
          </p>
          <p>
            Prudence ne veut pas dire abstention : elle veut dire ne pas souscrire sous la pression,
            lire les documents et mesurer ce que l'on peut perdre.
          </p>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Quelle est la meilleure SCPI en 2026 ?</h3>
          <p>
            Aucune réponse honnête ne peut désigner un nom : la meilleure SCPI dépend de votre
            objectif, de votre horizon et de votre fiscalité, et les performances passées ne
            préjugent pas des performances futures. Utilisez la check-list ci-dessus pour comparer
            deux ou trois SCPI sur des critères objectifs.
          </p>

          <h3>Quelle est la SCPI la plus rentable ?</h3>
          <p>
            Le rendement d'une année ne dit rien de la suivante, et un taux élevé peut cacher un
            risque plus grand. Comparez la performance globale sur plusieurs années, le TOF, le
            prix de part et la part de distribution issue des loyers.
          </p>

          <h3>Quels sont les risques d'une SCPI ?</h3>
          <p>
            Perte en capital (baisse du prix de part), revenus variables, liquidité limitée, risque
            lié à la stratégie et à l'endettement éventuel. Le DIC les décrit : lisez-le avant
            souscription.
          </p>

          <h3>Quel est le montant minimum pour investir en SCPI ?</h3>
          <p>
            Il varie selon la SCPI, le plus souvent le prix d'une part ou d'un petit nombre de
            parts, avec parfois un minimum de souscription. L'information figure dans la note
            d'information.
          </p>

          <h3>Qu'est-ce que le délai de jouissance ?</h3>
          <p>
            Période entre la souscription et le début de perception des revenus, généralement de
            quelques mois et propre à chaque SCPI. Elle réduit le rendement la première année.
          </p>

          <h3>Que signifie le label ISR pour une SCPI ?</h3>
          <p>
            Il atteste une démarche d'investissement socialement responsable, définie par un
            cahier des charges. Il ne garantit ni un meilleur rendement ni une moindre
            volatilité : c'est un critère de choix parmi d'autres.
          </p>

          <h3>Peut-on vendre ses parts de SCPI quand on veut ?</h3>
          <p>
            Non : selon le type de SCPI, la sortie passe par le retrait ou par le marché
            secondaire, sans garantie de délai ni de prix. Voir la section « Pourquoi rester
            prudent en 2026 ? ».
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Choisir une SCPI revient moins à désigner la gagnante qu'à éliminer les mauvaises
            raisons de souscrire : un taux isolé, une plaquette, la pression d'un conseiller. La
            check-list de ce guide force à regarder le risque, les frais, la liquidité et ce que
            contient réellement la distribution.
          </p>
          <p>
            Ne pas faire ce travail a un coût précis : des frais d'entrée absorbés pendant des
            années, un capital bloqué au mauvais moment, ou une distribution qui baisse quand on
            comptait dessus.
          </p>
          <p>
            Si vous hésitez encore entre SCPI et un bien meublé, voyez{" "}
            <a href="/guide/scpi-ou-lmnp-pour-completer-sa-retraite">SCPI ou LMNP pour compléter sa retraite</a>.
            Pour replacer l'immobilier dans votre trajectoire globale, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à poser le
            cadre.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li>
              <a href="/guide/scpi-preparer-sa-retraite">SCPI pour préparer sa retraite</a>
            </li>
            <li>
              <a href="/guide/scpi-a-credit-ou-comptant">SCPI à crédit ou comptant</a>
            </li>
            <li>
              <a href="/guide/scpi-fiscalite-revenus-plus-values">Fiscalité des SCPI : revenus et plus-values</a>
            </li>
            <li>
              <a href="/guide/scpi-ou-lmnp-pour-completer-sa-retraite">SCPI ou LMNP pour compléter sa retraite</a>
            </li>
            <li>
              <a href="/guide/investir-100000-euros-pour-la-retraite">Investir 100 000 € pour la retraite</a>
            </li>
            <li>
              <a href="/guide/immobilier-et-retraite-guide-complet">Immobilier et retraite : le guide complet</a>
            </li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en novembre 2026, sauf date contraire indiquée :</p>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé ni une
              recommandation d'investissement. Les données de marché citées proviennent de
              communiqués de l'ASPIM et peuvent évoluer. L'exemple chiffré est une illustration
              pédagogique sans valeur de promesse. Un investissement en SCPI présente un risque de
              perte en capital et une liquidité limitée ; les performances passées ne préjugent pas
              des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Une SCPI se vérifie. Sa place dans votre retraite se construit." />
    </>
  );
}
