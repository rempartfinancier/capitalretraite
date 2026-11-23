import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { IMMO, IMMO_EXEMPLES, FISCALITE, euros, pct } from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const F = IMMO.scpiFiscalite;
const E = IMMO_EXEMPLES.scpiFiscalite;
const PS_FONCIER = FISCALITE.prelevementsSociaux.immobilier;

const eurosPrecis = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const pct2 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " %";

// ---- (a) Revenu foncier France : barème (TMI) + prélèvements sociaux ----
const irFoncier = (E.revenuFoncierFrance * E.tmi) / 100;
const psFoncier = (E.revenuFoncierFrance * PS_FONCIER) / 100;
const totalFoncier = irFoncier + psFoncier;
const csgDeductible = (E.revenuFoncierFrance * F.csgDeductibleFoncier) / 100;
const economieCsg = (csgDeductible * E.tmi) / 100;
const partFiscaleFonciere = (totalFoncier / E.revenuFoncierFrance) * 100;

// Revenu de source étrangère : impôt français « théorique » au TMI (illustration du crédit d'impôt)
const impotTheoriqueEtranger = (E.revenuFoncierEtranger * E.tmi) / 100;

// ---- (b) Plus-value sur parts, simplifiée ----
// Les 5 premières années de détention n'ouvrent aucun abattement : années d'abattement = durée − 5.
const ANNEES_SANS_ABATTEMENT = F.pvAnneesSansAbattement;
const abattementIR = (duree) => {
  if (duree >= F.pvExonerationIRAnnees) return 100;
  const annees = Math.max(duree - ANNEES_SANS_ABATTEMENT, 0);
  return annees * F.pvAbattementIRParAn;
};
const abattementPS = (duree) => {
  if (duree >= F.pvExonerationPSAnnees) return 100;
  const annees = Math.max(duree - ANNEES_SANS_ABATTEMENT, 0);
  const derniereAnneeLineaire = F.pvExonerationIRAnnees - 1;
  if (duree <= derniereAnneeLineaire) return annees * F.pvAbattementPSParAn;
  const cumul21 = (derniereAnneeLineaire - ANNEES_SANS_ABATTEMENT) * F.pvAbattementPSParAn;
  if (duree === F.pvExonerationIRAnnees) return cumul21 + F.pvAbattementPS22e;
  return cumul21 + F.pvAbattementPS22e + (duree - F.pvExonerationIRAnnees) * F.pvAbattementPSParAn23a30;
};

const pv = E.plusValue;
const gainBrut = pv.prixCession - pv.prixAcquisition;
const anneesAbattement = pv.anneesDetention - ANNEES_SANS_ABATTEMENT;
const tauxAbattIR = abattementIR(pv.anneesDetention);
const tauxAbattPS = abattementPS(pv.anneesDetention);
const baseIR = gainBrut * (1 - tauxAbattIR / 100);
const basePS = gainBrut * (1 - tauxAbattPS / 100);
const impotPV = (baseIR * F.pvIR) / 100;
const psPV = (basePS * PS_FONCIER) / 100;
const totalPV = impotPV + psPV;
const netPV = gainBrut - totalPV;
const sousSeuilSurtaxe = baseIR <= F.pvSurtaxeSeuil;

const derniereAnneeLineaire = F.pvExonerationIRAnnees - 1;

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Prélèvements sociaux sur les revenus du patrimoine, fiche F2329 (taux 2026)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2329",
  },
  {
    label:
      "Service-Public.gouv.fr — Plus-values immobilières, fiche F10864, vérifiée le 15 avril 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F10864",
  },
  {
    label: "impots.gouv.fr — Imposition des revenus de source étrangère",
    url: "https://www.impots.gouv.fr/international-particulier/imposition-des-revenus-de-source-etrangere",
  },
  {
    label: "impots.gouv.fr — Calcul de l'IFI",
    url: "https://www.impots.gouv.fr/particulier/calcul-de-lifi",
  },
  {
    label: "impots.gouv.fr — Les revenus mobiliers",
    url: "https://www.impots.gouv.fr/particulier/les-revenus-mobiliers",
  },
  {
    label: "impots.gouv.fr — Les régimes d'imposition",
    url: "https://www.impots.gouv.fr/particulier/les-regimes-dimposition",
  },
  {
    label:
      "BOFiP — Revenus fonciers, déficits et charges (BOI-RFPI-BASE-30-20, version du 16 septembre 2025)",
    url: "https://bofip.impots.gouv.fr/bofip/4142-PGP.html/identifiant=BOI-RFPI-BASE-30-20-20250916",
  },
  {
    label:
      "BOFiP — IFI, actif imposable : valorisation des parts de sociétés (BOI-PAT-IFI-20-20-30-10, version du 8 juin 2018)",
    url: "https://bofip.impots.gouv.fr/bofip/11310-PGP.html/identifiant=BOI-PAT-IFI-20-20-30-10-20180608",
  },
  {
    label: "Légifrance — Loi de financement de la sécurité sociale pour 2026",
    url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053226384",
  },
  {
    label: "AMF — Guide « Investir dans une SCPI » (2023)",
    url: "https://www.amf-france.org/sites/institutionnel/files/private/2023-12/2023_investir_dans_une_scpi.pdf",
  },
];

export default function GuideScpiFiscalite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Immobilier · SCPI · fiscalité</span>
          <h1>Fiscalité des SCPI : revenus fonciers, revenus étrangers, plus-values et IFI</h1>
          <p className="sub">
            Ce qui se déclare, à quel taux et à quel moment quand on détient des parts de SCPI en
            direct. Mis à jour le {IMMO.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> les loyers distribués par une SCPI détenue en direct
              s'ajoutent à vos autres revenus, imposés au barème de l'impôt sur le revenu, avec{" "}
              {pct(PS_FONCIER)} de prélèvements sociaux ; en pratique, ces revenus relèvent du
              régime réel (déclaration 2044). Une partie peut venir de l'étranger (formulaire 2047),
              et la trésorerie de la SCPI produit parfois des revenus financiers, taxés à part. À
              la revente, la plus-value suit le régime des plus-values immobilières :{" "}
              {pct(F.pvIR)} d'impôt, moins des abattements qui conduisent à l'exonération d'impôt
              après {F.pvExonerationIRAnnees} ans et de prélèvements sociaux après{" "}
              {F.pvExonerationPSAnnees} ans. Enfin, les parts entrent dans l'IFI au-delà d'un
              seuil de patrimoine immobilier net de {euros(F.ifiSeuilAssujettissement)}.
            </p>
          </div>

          <p>
            Beaucoup de souscripteurs découvrent la fiscalité de leurs SCPI au moment de remplir
            leur première déclaration : un relevé de plusieurs pages, des lignes « France » et «
            étranger », des cases à reporter. Rien d'insurmontable, mais mieux vaut en connaître la
            logique avant de souscrire, car c'est elle qui sépare le revenu brut annoncé du revenu
            réellement disponible.
          </p>
          <p>
            Prenons une situation illustrative et composite, sans lien avec un cas réel : Marc et
            Hélène, 58 ans, imposés dans la tranche à {E.tmi} %, détiennent des parts de SCPI en
            direct, achetées il y a plusieurs années. Leur société de gestion leur envoie chaque
            printemps un relevé fiscal. Que doivent-ils en faire ? Quelle part du revenu reste après
            impôt ? Et si un jour ils revendent ?
          </p>
          <p>
            Cet article répond uniquement à la question fiscale. Le fonctionnement des SCPI, leurs
            frais et leurs risques sont traités dans notre guide{" "}
            <a href="/guide/scpi-preparer-sa-retraite">SCPI pour préparer sa retraite</a> ; le choix
            entre détention directe, assurance-vie et PER dans{" "}
            <a href="/guide/scpi-assurance-vie-ou-per">SCPI en direct, en assurance-vie ou en PER</a>.
            Les règles décrites sont celles publiées au {IMMO.maj} ; la fiscalité personnelle varie
            d'un foyer à l'autre.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#revenus-fonciers">Comment sont imposés les revenus fonciers d'une SCPI ?</a></li>
              <li><a href="#deficit">Peut-on créer un déficit foncier avec des parts de SCPI ?</a></li>
              <li><a href="#etranger">Et les revenus de source étrangère ?</a></li>
              <li><a href="#tresorerie">Que deviennent les produits financiers de la trésorerie ?</a></li>
              <li><a href="#exemple-revenus">Combien reste-t-il d'un revenu foncier de {euros(E.revenuFoncierFrance)} ?</a></li>
              <li><a href="#plus-value">Comment est imposée la plus-value à la revente des parts ?</a></li>
              <li><a href="#exemple-pv">Quel impôt sur une plus-value après {pv.anneesDetention} ans ?</a></li>
              <li><a href="#ifi">Les SCPI entrent-elles dans l'IFI ?</a></li>
              <li><a href="#declaration">Que déclarer, quand et sur quels formulaires ?</a></li>
              <li><a href="#synthese-tableau">Tableau de synthèse : type de revenu, régime, taux</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="revenus-fonciers">Comment sont imposés les revenus fonciers d'une SCPI ?</h2>
          <p>
            Une SCPI (société civile de placement immobilier) est une société transparente : ce
            sont les associés, c'est-à-dire vous, qui sont imposés sur la quote-part de revenus
            correspondant à leurs parts, qu'elle soit ou non distribuée en totalité. La partie
            issue des loyers français est un revenu foncier. Elle s'ajoute à vos autres revenus
            et suit le barème progressif de l'impôt sur le revenu ; s'y ajoutent les prélèvements
            sociaux, au taux de {pct(PS_FONCIER)} d'après la fiche F2329 de Service-Public.
          </p>
          <p>
            Côté régime, le micro-foncier (abattement forfaitaire de {pct(F.microFoncierAbattement)}{" "}
            pour des recettes inférieures à {euros(F.microFoncierPlafond)}) est écarté par le
            simulateur officiel lorsque les seuls revenus fonciers proviennent de sociétés
            immobilières. En pratique, une SCPI relève donc du régime réel : le revenu net est
            calculé par la société de gestion et reporté sur la déclaration 2044. Si vous louez
            aussi un bien en direct, la situation est mixte : à faire confirmer par l'administration.
          </p>
          <p>
            Deux points valent d'être connus. D'abord, la CSG sur les revenus du patrimoine a été
            relevée en 2026 pour la plupart des produits de placement, mais la loi de financement de
            la sécurité sociale pour 2026 en exclut les revenus fonciers : le taux global reste
            {" "}{pct(PS_FONCIER)}. Ensuite, une fraction de cette CSG est déductible du revenu de
            l'année suivante ({pct(F.csgDeductibleFoncier)} selon les sources consultées), ce qui
            allège un peu la charge réelle.
          </p>
          <p>
            Enfin, ces revenus entrent dans le revenu fiscal de référence, qui sert à de nombreux
            seuils : CSG sur pension de retraite, exonérations diverses. Leurs conséquences sur
            un avis d'impôt se lisent sur ce document, pas dans une règle générale. Notre guide{" "}
            <a href="/guide/immobilier-a-la-retraite-revenus-transmission">
              immobilier à la retraite : revenus et transmission
            </a>{" "}
            revient sur cet effet.
          </p>

          <h2 id="deficit">Peut-on créer un déficit foncier avec des parts de SCPI ?</h2>
          <p>
            En règle générale, un déficit foncier apparaît lorsque les charges déductibles
            (travaux, intérêts d'emprunt, taxes) dépassent les loyers. Il est imputable sur le
            revenu global dans la limite de {euros(F.deficitFoncierPlafondRevenuGlobal)} par an
            pour les charges hors intérêts d'emprunt. Les intérêts d'emprunt ne s'imputent jamais
            sur le revenu global : ils se reportent sur les revenus fonciers des {F.deficitFoncierReportAnnees}{" "}
            années suivantes.
          </p>
          <p>
            Avec une SCPI, ce mécanisme est limité : c'est la société qui engage les travaux, et
            ce que vous déclarez est votre quote-part du résultat. Il arrive qu'un relevé fasse
            apparaître un déficit selon la politique de travaux de la SCPI, mais ce n'est pas une
            stratégie que l'on peut programmer. Le cas particulier du crédit est étudié dans{" "}
            <a href="/guide/scpi-a-credit-ou-comptant">SCPI à crédit ou comptant</a>.
          </p>

          <h2 id="etranger">Et les revenus de source étrangère ?</h2>
          <p>
            Certaines SCPI détiennent des immeubles hors de France. La part de revenu
            correspondante est de source étrangère et se déclare sur le formulaire 2047, puis se
            reporte sur la déclaration de revenus. Le traitement dépend de la convention fiscale
            conclue entre la France et le pays concerné. Selon les sources consultées, deux
            mécanismes principaux existent :
          </p>
          <ul>
            <li>
              <strong>Imposition en France avec crédit d'impôt</strong> : le revenu est imposé en
              France, mais un crédit d'impôt égal à l'impôt français correspondant évite la
              double imposition ; l'impôt supporté sur place est alors en principe l'impôt
              définitif.
            </li>
            <li>
              <strong>Exonération avec taux effectif</strong> : le revenu n'est pas imposé en
              France mais il est pris en compte pour déterminer le taux appliqué à vos autres
              revenus, ce qui peut relever le taux d'imposition de l'ensemble.
            </li>
          </ul>
          <p>
            Les prélèvements sociaux sont en principe dus sur ces revenus, à un taux à confirmer
            auprès de l'administration. Le détail par pays figure sur le relevé fiscal annuel de la
            société de gestion, et se confirme auprès du centre des impôts. Notre exemple chiffré
            plus bas illustre uniquement le mécanisme du crédit d'impôt, pas un cas réel : chaque
            pays, chaque convention et chaque type de revenu peut conduire à un résultat différent.
          </p>

          <h2 id="tresorerie">Que deviennent les produits financiers de la trésorerie ?</h2>
          <p>
            Une SCPI place parfois sa trésorerie disponible. Les intérêts qui en résultent ne sont
            pas des loyers : ce sont des revenus de capitaux mobiliers, en principe taxés au
            prélèvement forfaitaire unique, soit {pct(FISCALITE.pfuIR)} d'impôt et{" "}
            {pct(F.psProduitsPlacement)} de prélèvements sociaux, {pct(F.pfuTotal)} au total
            (règle générale, à confirmer pour les SCPI sur votre relevé). Ces montants sont
            généralement faibles, mais ils apparaissent sur une ligne distincte du relevé fiscal :
            c'est l'une des raisons pour lesquelles il ne faut pas tout reporter en revenus
            fonciers.
          </p>

          <h2 id="exemple-revenus">Combien reste-t-il d'un revenu foncier de {euros(E.revenuFoncierFrance)} ?</h2>
          <p>
            Hypothèses illustratives (composites, sans lien avec un cas réel) : revenu foncier net
            imposable en France de {euros(E.revenuFoncierFrance)}, tranche marginale d'imposition de{" "}
            {E.tmi} %, prélèvements sociaux à {pct(PS_FONCIER)}.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Élément</th>
                  <th>Calcul</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Revenu foncier France</td>
                  <td>donnée de l'exemple</td>
                  <td>{euros(E.revenuFoncierFrance)}</td>
                </tr>
                <tr>
                  <td>Impôt sur le revenu</td>
                  <td>
                    {euros(E.revenuFoncierFrance)} × {E.tmi} %
                  </td>
                  <td>{euros(irFoncier)}</td>
                </tr>
                <tr>
                  <td>Prélèvements sociaux</td>
                  <td>
                    {euros(E.revenuFoncierFrance)} × {pct(PS_FONCIER)}
                  </td>
                  <td>{euros(psFoncier)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total prélevé</strong>
                  </td>
                  <td>soit {pct2(partFiscaleFonciere)} du revenu</td>
                  <td>
                    <strong>{euros(totalFoncier)}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Reste après impôt et prélèvements</strong>
                  </td>
                  <td>avant éventuelle économie de CSG déductible</td>
                  <td>
                    <strong>{euros(E.revenuFoncierFrance - totalFoncier)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            La CSG déductible n'est pas retranchée ici : elle réduit le revenu imposable de l'année
            suivante et, au taux marginal de l'exemple, l'économie correspondante est modeste (de
            l'ordre de {euros(economieCsg)} sur cette base). Ce calcul suppose que les {euros(E.revenuFoncierFrance)}
            soient imposés en totalité à la tranche indiquée, ce qui dépend du reste du foyer.
          </p>
          <p>
            Pour les revenus étrangers de l'exemple ({euros(E.revenuFoncierEtranger)}), le seul
            enseignement du mécanisme du crédit d'impôt est le suivant : au même taux marginal,
            l'impôt français correspondant serait de {euros(impotTheoriqueEtranger)}, mais un crédit
            d'impôt équivalent le neutralise lorsque la convention le prévoit. Dans le cas de
            l'exonération avec taux effectif, aucun impôt n'est dû sur ce revenu, mais il peut
            majorer le taux appliqué aux autres. Les prélèvements sociaux, eux, se calculent
            séparément, au taux à confirmer.
          </p>
          <div className="note">
            <p>
              Ce calcul est simplifié : il ignore les autres revenus, le quotient familial, les
              charges déductibles et la décote éventuelle. Un revenu brut annoncé et un revenu net
              d'impôt ne s'additionnent pas de la même façon dans tous les foyers. Pour comparer
              la SCPI à d'autres placements sur une base nette, voir{" "}
              <a href="/guide/immobilier-locatif-ou-assurance-vie">
                immobilier locatif ou assurance-vie
              </a>
              .
            </p>
          </div>

          <h2 id="plus-value">Comment est imposée la plus-value à la revente des parts ?</h2>
          <p>
            La revente de parts de SCPI relève du régime des plus-values immobilières des
            particuliers. La plus-value est la différence entre le prix de cession et le prix
            d'acquisition (avant les ajustements propres à chaque dossier). Elle est taxée à{" "}
            {pct(F.pvIR)} d'impôt sur le revenu, auxquels s'ajoutent {pct(PS_FONCIER)} de
            prélèvements sociaux. Des abattements pour durée de détention réduisent la base :
          </p>
          <ul>
            <li>
              <strong>Impôt sur le revenu</strong> : pas d'abattement les cinq premières années ;
              ensuite {pct(F.pvAbattementIRParAn)} par an jusqu'à la {derniereAnneeLineaire}e
              année, {pct(F.pvAbattementIR22e)} la {F.pvExonerationIRAnnees}e année, d'où
              l'exonération totale d'impôt après {F.pvExonerationIRAnnees} ans de détention.
            </li>
            <li>
              <strong>Prélèvements sociaux</strong> : {pct2(F.pvAbattementPSParAn)} par an jusqu'à
              la {derniereAnneeLineaire}e année, {pct2(F.pvAbattementPS22e)} la {F.pvExonerationIRAnnees}e,
              puis {pct(F.pvAbattementPSParAn23a30)} par an jusqu'à la {F.pvExonerationPSAnnees}e :
              l'exonération totale n'est acquise qu'après {F.pvExonerationPSAnnees} ans.
            </li>
          </ul>
          <p>
            Une surtaxe progressive s'ajoute lorsque la plus-value imposable à l'impôt sur le revenu
            dépasse {euros(F.pvSurtaxeSeuil)}. Une cession dont le prix est inférieur ou égal à{" "}
            {euros(F.pvExonerationPrixCession)} est exonérée. Des exonérations existent aussi,
            notamment pour certains retraités sous conditions de revenu et de non-assujettissement à
            l'IFI : voir la fiche F10864 de Service-Public.
          </p>
          <p>
            Pour une SCPI, le calcul est en pratique réalisé par la société de gestion ou le notaire,
            à confirmer auprès d'eux ; la durée de détention se compte depuis la souscription. Il
            faut aussi garder à l'esprit que la revente n'est pas toujours possible au prix
            espéré : voir{" "}
            <a href="/guide/scpi-preparer-sa-retraite">les risques de liquidité des SCPI</a>.
          </p>

          <h2 id="exemple-pv">Quel impôt sur une plus-value après {pv.anneesDetention} ans ?</h2>
          <p>
            Hypothèses illustratives : parts achetées {euros(pv.prixAcquisition)}, revendues{" "}
            {euros(pv.prixCession)} après {pv.anneesDetention} ans, soit {anneesAbattement} années
            d'abattement ({pv.anneesDetention} − {F.pvAnneesSansAbattement}).
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Étape</th>
                  <th>Impôt sur le revenu</th>
                  <th>Prélèvements sociaux</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Plus-value brute</td>
                  <td>{euros(gainBrut)}</td>
                  <td>{euros(gainBrut)}</td>
                </tr>
                <tr>
                  <td>Abattement ({anneesAbattement} années)</td>
                  <td>
                    {anneesAbattement} × {pct(F.pvAbattementIRParAn)} = {pct2(tauxAbattIR)}
                  </td>
                  <td>
                    {anneesAbattement} × {pct2(F.pvAbattementPSParAn)} = {pct2(tauxAbattPS)}
                  </td>
                </tr>
                <tr>
                  <td>Plus-value imposable</td>
                  <td>{euros(baseIR)}</td>
                  <td>{euros(basePS)}</td>
                </tr>
                <tr>
                  <td>Taux</td>
                  <td>{pct(F.pvIR)}</td>
                  <td>{pct(PS_FONCIER)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Impôt et prélèvements</strong>
                  </td>
                  <td>
                    <strong>{eurosPrecis(impotPV)}</strong>
                  </td>
                  <td>
                    <strong>{eurosPrecis(psPV)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Total à payer : {eurosPrecis(totalPV)}. Plus-value nette : {eurosPrecis(netPV)} sur{" "}
            {euros(gainBrut)} de plus-value brute. La plus-value imposable à l'impôt sur le revenu
            ({euros(baseIR)}) {sousSeuilSurtaxe ? "reste" : "ne reste pas"} en dessous du seuil de
            surtaxe de {euros(F.pvSurtaxeSeuil)} : aucune surtaxe n'entre donc dans ce calcul.
          </p>
          <div className="note">
            <p>
              Calcul simplifié, hors frais d'acquisition et forfaits : il ignore le forfait de
              frais d'acquisition, les éventuels forfaits de travaux et les règles propres à chaque
              cession. Le résultat réel dépend de ces éléments et des conditions de la revente (prix
              obtenu, délai, frais). Une plus-value n'est de toute façon qu'une hypothèse : le prix
              d'une part peut aussi baisser, auquel cas il n'y a ni gain ni impôt, mais une perte en
              capital.
            </p>
          </div>

          <h2 id="ifi">Les SCPI entrent-elles dans l'IFI ?</h2>
          <p>
            L'impôt sur la fortune immobilière (IFI) concerne les foyers dont le patrimoine
            immobilier net taxable dépasse {euros(F.ifiSeuilAssujettissement)} au 1er janvier. Le
            barème commence à {pct(F.ifiTauxPremiereTranche)} entre {euros(F.ifiSeuilBareme)} et ce
            seuil. Les parts de SCPI relèvent de l'IFI, pour la fraction de leur valeur qui
            représente des immeubles ; le mode de valorisation (prix de retrait, valeur de
            réalisation ou autre) est à confirmer auprès de la société de gestion et de
            l'administration. Les dettes liées à l'acquisition sont, sous conditions, déductibles.
          </p>
          <p>
            Pour la plupart des épargnants, l'IFI ne se pose pas : il faut déjà un patrimoine
            immobilier élevé. Mais le calcul inclut la résidence principale (avec abattement), les
            biens locatifs et les parts de sociétés immobilières, ce qui peut surprendre. Si
            vous approchez du seuil, un professionnel du patrimoine saura valoriser chaque ligne.
          </p>

          <h2 id="declaration">Que déclarer, quand et sur quels formulaires ?</h2>
          <p>
            La société de gestion envoie chaque année un relevé fiscal ou un document équivalent,
            généralement au printemps, avant l'échéance de la déclaration de revenus. Il distingue
            les revenus fonciers français, les revenus de source étrangère, les produits
            financiers et, le cas échéant, la valeur des parts pour l'IFI. Vérifiez le
            rapprochement avec vos relevés bancaires, et conservez-le avec vos justificatifs.
          </p>
          <ul>
            <li>
              <strong>Formulaire 2044</strong> : revenus fonciers au régime réel, dont ceux des
              SCPI. Le total se reporte ensuite sur la déclaration principale (2042).
            </li>
            <li>
              <strong>Formulaire 2047</strong> : revenus de source étrangère, avec les montants
              par pays, reportés ensuite sur la déclaration de revenus.
            </li>
            <li>
              <strong>Déclaration principale (2042)</strong> : report des totaux issus des
              annexes, et des produits financiers de la trésorerie le cas échéant. Les numéros
              de cases changent d'une année à l'autre et le service en ligne guide le report : se
              référer à la notice de l'année.
            </li>
            <li>
              <strong>IFI</strong> : déclaration spécifique, ou ligne de la déclaration de revenus
              selon la valeur du patrimoine imposable.
            </li>
          </ul>
          <p>
            Pour la logique d'ensemble de l'épargne, voir la{" "}
            <a href="/guide/ordre-de-decaissement-retraite">règle d'ordre de décaissement</a>.
            L'écart entre revenu brut annoncé et net d'impôt entre aussi dans l'analyse des coûts :
            notre guide <a href="/guide/combien-coute-un-investissement-locatif">
              combien coûte un investissement locatif</a> le détaille pour l'immobilier en direct.
          </p>

          <h2 id="synthese-tableau">Tableau de synthèse : type de revenu, régime, taux</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Type de revenu</th>
                  <th>Régime et formulaire</th>
                  <th>Taux (règle générale)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Loyers français distribués</td>
                  <td>Revenus fonciers, régime réel, 2044</td>
                  <td>Barème de l'IR + {pct(PS_FONCIER)} de prélèvements sociaux</td>
                </tr>
                <tr>
                  <td>Revenus de source étrangère</td>
                  <td>Formulaire 2047 ; selon la convention : crédit d'impôt ou taux effectif</td>
                  <td>Selon la convention ; prélèvements sociaux en principe dus (taux à confirmer)</td>
                </tr>
                <tr>
                  <td>Produits financiers de la trésorerie</td>
                  <td>Revenus de capitaux mobiliers, 2042</td>
                  <td>
                    {pct(FISCALITE.pfuIR)} + {pct(F.psProduitsPlacement)} = {pct(F.pfuTotal)}{" "}
                    (à confirmer pour les SCPI)
                  </td>
                </tr>
                <tr>
                  <td>Plus-value à la revente</td>
                  <td>Plus-values immobilières des particuliers</td>
                  <td>
                    {pct(F.pvIR)} + {pct(PS_FONCIER)}, après abattements ; surtaxe au-delà de{" "}
                    {euros(F.pvSurtaxeSeuil)} de plus-value imposable
                  </td>
                </tr>
                <tr>
                  <td>Patrimoine immobilier (parts)</td>
                  <td>IFI, au 1er janvier</td>
                  <td>
                    Au-delà de {euros(F.ifiSeuilAssujettissement)} ; barème dès {pct(F.ifiTauxPremiereTranche)}{" "}
                    au-dessus de {euros(F.ifiSeuilBareme)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Ce tableau fixe les ordres de grandeur ; ni les situations particulières ni les
            décisions de l'administration n'y figurent. Pour confronter ce régime à celui d'une
            assurance-vie ou d'un PER, voir{" "}
            <a href="/guide/scpi-assurance-vie-ou-per">SCPI en direct, en assurance-vie ou en PER</a>{" "}
            et <a href="/guide/fiscalite-sortie-per">la fiscalité de sortie du PER</a>.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Les revenus de SCPI relèvent-ils du micro-foncier ?</h3>
          <p>
            Le simulateur officiel indique que le micro-foncier ne s'applique pas lorsque les seuls
            revenus fonciers viennent de sociétés immobilières. En pratique, une SCPI relève donc du
            régime réel (déclaration 2044). Cas mixte (SCPI et bien en direct) : à confirmer auprès de
            l'administration.
          </p>
          <h3>Les prélèvements sociaux des SCPI ont-ils augmenté en 2026 ?</h3>
          <p>
            Pour les revenus fonciers, le taux global reste {pct(PS_FONCIER)} selon la fiche F2329 : la
            hausse de CSG de la loi de financement de la sécurité sociale pour 2026 vise d'autres
            revenus du capital et exclut les revenus fonciers, les plus-values immobilières et
            l'assurance-vie.
          </p>
          <h3>Dois-je déclarer les revenus de SCPI étrangères moi-même ?</h3>
          <p>
            Oui, si une partie de vos revenus est de source étrangère : le relevé de la société de
            gestion indique les montants, le formulaire 2047 sert à les déclarer. Le traitement
            (crédit d'impôt ou taux effectif) dépend de la convention fiscale et se confirme auprès du
            centre des impôts.
          </p>
          <h3>Après combien d'années la plus-value sur parts est-elle exonérée ?</h3>
          <p>
            D'impôt sur le revenu après {F.pvExonerationIRAnnees} ans de détention, des prélèvements
            sociaux après {F.pvExonerationPSAnnees} ans. Entre les deux, l'abattement est progressif.
          </p>
          <h3>Une moins-value est-elle déductible ?</h3>
          <p>
            Les règles d'imputation d'une moins-value immobilière des particuliers sont restrictives
            et ne sont pas détaillées ici : à vérifier sur la fiche F10864 de Service-Public ou
            auprès d'un conseiller.
          </p>
          <h3>La SCPI en assurance-vie ou en PER change-t-elle ces règles ?</h3>
          <p>
            Oui, largement : à l'intérieur du contrat, la fiscalité est celle de l'enveloppe et les
            revenus ne sont pas déclarés chaque année. C'est l'objet de notre guide{" "}
            <a href="/guide/scpi-assurance-vie-ou-per">SCPI en direct, en assurance-vie ou en PER</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Détenir des SCPI en direct, c'est accepter une fiscalité à plusieurs étages : le barème
            et les prélèvements sociaux sur les revenus, une déclaration annuelle sur des
            formulaires spécifiques selon l'origine des revenus, une plus-value taxée à la
            revente, et un éventuel IFI pour les patrimoines élevés. Rien n'est caché, mais rien
            n'est automatique : le revenu net que l'on perçoit réellement dépend de la tranche
            d'imposition du foyer, de l'origine géographique des loyers et de la durée de
            détention.
          </p>
          <p>
            Sur l'exemple de cet article, un revenu foncier de {euros(E.revenuFoncierFrance)} en
            laisse {euros(E.revenuFoncierFrance - totalFoncier)} après impôt et prélèvements
            sociaux ; une plus-value de {euros(gainBrut)} après {pv.anneesDetention} ans en laisse{" "}
            {euros(netPV)}. Ce sont des illustrations simplifiées, pas des prévisions. Le choix
            d'une SCPI relève d'abord de sa qualité et de son risque de liquidité ; la fiscalité
            n'en est qu'un élément. La stratégie d'ensemble est traitée dans notre page{" "}
            <a href="/strategies/immobilier-retraite">immobilier et retraite</a>.
          </p>
          <p>
            Pour sélectionner une SCPI avec un accompagnement dédié, on peut consulter{" "}
            <a href="https://scpirentable.fr" target="_blank" rel="noopener noreferrer">
              scpirentable.fr
            </a>
            , ou comparer des offres sur{" "}
            <a href="https://immobilierpassif.com" target="_blank" rel="noopener noreferrer">
              immobilierpassif.com
            </a>
            . Un investissement en SCPI comporte des risques : le capital n'est pas garanti, les
            revenus ne sont pas assurés, la liquidité peut être réduite, et les performances
            passées ne préjugent pas des performances futures. Le document d'informations clés (DIC)
            remis avant toute souscription en détaille les risques.
          </p>
          <p>
            Pour replacer cette fiscalité dans votre situation globale, notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> donne un premier ordre de
            grandeur, et le <a href="/bilan-retraite">bilan retraite gratuit</a> permet d'examiner
            l'ensemble avec votre avis d'impôt en main.
          </p>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées le {IMMO.maj} :</p>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : la
              fiscalité varie selon la situation de chaque foyer, et l'administration fiscale ou un
              professionnel qualifié peut seul confirmer votre cas. Les règles citées sont celles
              publiées au {IMMO.maj} et peuvent évoluer ; les exemples chiffrés sont des
              illustrations pédagogiques, composites et sans lien avec un cas réel, établies sur
              des hypothèses affichées.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="La fiscalité des SCPI se mesure sur votre avis d'impôt, pas sur une moyenne." />
    </>
  );
}
