import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { IMMO, IMMO_EXEMPLES, FISCALITE, TRANSMISSION, euros, pct } from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const D = IMMO.demembrement;
const F = IMMO.scpiFiscalite;
const R = IMMO_EXEMPLES.retraiteImmobilier;
const S = D.csgPensionSeuilsRfr2026;
const PS_FONCIER = FISCALITE.prelevementsSociaux.immobilier;

const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " %";

// ---- Effet des loyers sur le RFR et le taux de CSG des pensions (seuils pour une part) ----
const rfrAvecLoyers = R.rfrHorsLoyers + R.loyersFonciersAnnuels;
const bande = (rfr) => {
  if (rfr <= S.zero) return { nom: "exonération de CSG", taux: 0 };
  if (rfr <= S.reduit) return { nom: "taux réduit", taux: null };
  if (rfr <= S.median) return { nom: "taux médian", taux: D.csgPensionTauxMedian };
  return { nom: "taux normal", taux: D.csgPensionTauxNormal };
};
const bandeSans = bande(R.rfrHorsLoyers);
const bandeAvec = bande(rfrAvecLoyers);
const csgSans = (R.pensionAnnuelleBrute * bandeSans.taux) / 100;
const csgAvec = (R.pensionAnnuelleBrute * bandeAvec.taux) / 100;
const ecartCsg = csgAvec - csgSans;
const depassement = rfrAvecLoyers - S.median;
const marge = S.median - R.rfrHorsLoyers;

// ---- Prélèvements sociaux sur les loyers nets imposables ----
const psLoyers = (R.loyersFonciersAnnuels * PS_FONCIER) / 100;
const csgDeductibleLoyers = (R.loyersFonciersAnnuels * F.csgDeductibleFoncier) / 100;

// ---- Plus-value immobilière des particuliers : abattements cumulés selon la durée de détention ----
const abattIR = (annees) => {
  if (annees >= F.pvExonerationIRAnnees) return 100;
  const n = Math.max(Math.min(annees, F.pvExonerationIRAnnees - 1) - F.pvAnneesSansAbattement, 0);
  return n * F.pvAbattementIRParAn;
};
const abattPS = (annees) => {
  if (annees >= F.pvExonerationPSAnnees) return 100;
  const jusqua21 =
    Math.max(Math.min(annees, F.pvExonerationIRAnnees - 1) - F.pvAnneesSansAbattement, 0) *
    F.pvAbattementPSParAn;
  const a22 = annees >= F.pvExonerationIRAnnees ? F.pvAbattementPS22e : 0;
  const a23 = Math.max(annees - F.pvExonerationIRAnnees, 0) * F.pvAbattementPSParAn23a30;
  return Math.min(jusqua21 + a22 + a23, 100);
};
const durees = [5, 10, 15, F.pvExonerationIRAnnees - 1, F.pvExonerationIRAnnees, F.pvExonerationPSAnnees];

const sources = [
  {
    label: "Service-Public.gouv.fr — Prélèvements sociaux sur les revenus du patrimoine, fiche F2329",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2329",
  },
  {
    label: "Service-Public.gouv.fr — CSG sur les pensions de retraite, fiche F2971",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2971",
  },
  {
    label: "Service-Public.gouv.fr — Plus-values immobilières, fiche F10864, vérifiée le 15 avril 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F10864",
  },
  {
    label: "Service-Public.gouv.fr — Vente en viager, fiche F2762",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2762",
  },
  {
    label: "Service-Public.gouv.fr — Abattements applicables aux donations, fiche F14203",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14203",
  },
  {
    label: "Service-Public.gouv.fr — Dispositif Jeanbrun, fiche F39735",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F39735",
  },
  {
    label: "impots.gouv.fr — Calcul de l'IFI",
    url: "https://www.impots.gouv.fr/particulier/calcul-de-lifi",
  },
  {
    label: "impots.gouv.fr — Les régimes d'imposition",
    url: "https://www.impots.gouv.fr/particulier/les-regimes-dimposition",
  },
  {
    label: "Légifrance — Loi de financement de la sécurité sociale pour 2026 (JORF)",
    url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053226384",
  },
  {
    label: "Légifrance — Code des assurances, article L. 113-2-1 (loi Lemoine)",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045271000/2026-08-15",
  },
  {
    label: "Économie.gouv.fr — Assurance emprunteur : le questionnaire de santé, quand est-il obligatoire ?",
    url: "https://www.economie.gouv.fr/particuliers/gerer-mon-argent/emprunter-et-sassurer/assurance-emprunteur-questionnaire-de-sante-quand-est-ce-obligatoire",
  },
  {
    label: "BOFiP — BOI-RFPI-BASE-30-20 (plus-values immobilières), version du 16 septembre 2025",
    url: "https://bofip.impots.gouv.fr/bofip/4142-PGP.html/identifiant=BOI-RFPI-BASE-30-20-20250916",
  },
];

export default function GuideImmobilierALaRetraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Immobilier · retraite</span>
          <h1>Immobilier à la retraite : revenus complémentaires, vente et transmission</h1>
          <p className="sub">
            Loyers, fiscalité des pensions, vente d'un bien locatif, transmission : les questions
            qui se posent une fois la retraite engagée. Mis à jour le {IMMO.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> à la retraite, des loyers fonciers s'ajoutent à la
              pension mais ont des effets souvent oubliés : ils entrent dans le revenu fiscal de
              référence, qui commande le taux de CSG sur les pensions, et supportent {pct1(PS_FONCIER)}{" "}
              de prélèvements sociaux. Dans l'exemple de cette page, {euros(R.loyersFonciersAnnuels)}{" "}
              de loyers font passer le revenu fiscal de référence de {euros(R.rfrHorsLoyers)} à{" "}
              {euros(rfrAvecLoyers)} et la CSG sur une pension de {euros(R.pensionAnnuelleBrute)} de{" "}
              {euros(csgSans)} à {euros(csgAvec)}. Plus tard viennent les arbitrages entre garder,
              déléguer, vendre et transmettre.
            </p>
          </div>

          <p>
            Beaucoup de lecteurs de 60 ans et plus possèdent un ou deux biens locatifs, achetés
            pendant la vie active pour compléter la retraite. Une fois à la retraite, la question n'est
            plus « faut-il investir ? » mais « que faire de ce bien ? ». Les loyers rapportent-ils
            vraiment ce qu'on croit, une fois la fiscalité passée ? Faudra-t-il encore gérer à 75 ans ?
            Vendre déclenche-t-il un impôt ? Comment transmettre sans se priver ?
          </p>
          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel :
            Françoise, retraitée, perçoit {euros(R.pensionAnnuelleBrute)} de pensions par an et
            encaisse {euros(R.loyersFonciersAnnuels)} de loyers nets imposables d'un petit
            appartement. Elle découvre qu'une partie de ses loyers sert en réalité à payer des
            prélèvements qu'elle n'avait pas anticipés. Cet article parcourt les cinq temps de
            sa réflexion : le budget, la fiscalité des pensions, la gestion, la vente, la
            transmission.
          </p>
          <p>
            Il ne reprend pas l'analyse de l'investissement locatif lui-même (voir{" "}
            <a href="/guide/combien-coute-un-investissement-locatif">
              combien coûte un investissement locatif
            </a>{" "}
            et <a href="/strategies/immobilier-retraite">immobilier et retraite</a>). Le dispositif
            Jeanbrun, créé par la loi de finances pour 2026, vise l'achat d'un logement à louer
            nu, pas la gestion d'un patrimoine déjà constitué ; il n'est pas traité ici.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#budget">Que valent vraiment les loyers dans un budget de retraité ?</a></li>
              <li><a href="#csg">Les loyers font-ils augmenter la CSG sur ma pension ?</a></li>
              <li><a href="#ps">Quels prélèvements sociaux sur les loyers ?</a></li>
              <li><a href="#emprunt">Et si un crédit court encore : quelle assurance emprunteur ?</a></li>
              <li><a href="#gestion">Gérer à 75 ans : déléguer ou vendre ?</a></li>
              <li><a href="#vente">Vendre un bien locatif : quelle plus-value, quel impôt ?</a></li>
              <li><a href="#viager">Le viager est-il une option ?</a></li>
              <li><a href="#transmission">Comment transmettre un bien locatif ?</a></li>
              <li><a href="#arbre">Garder, déléguer, vendre ou transmettre : quatre questions</a></li>
              <li><a href="#erreurs">Quelles erreurs éviter ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="budget">Que valent vraiment les loyers dans un budget de retraité ?</h2>
          <p>
            Il faut distinguer trois montants : le loyer <em>brut</em> encaissé, le loyer{" "}
            <em>net de charges</em> (taxe foncière, copropriété, entretien, assurance, vacance,
            gestion), et ce qui reste <em>après impôt et prélèvements sociaux</em>. Seul ce dernier
            entre dans votre budget. Pour un bien acheté à crédit, il faut encore retrancher les
            mensualités tant qu'elles courent.
          </p>
          <p>
            Dans votre budget de retraite, un loyer est un revenu <strong>non garanti</strong> :
            vacance entre deux locataires, impayés, travaux. Il peut s'interrompre ou baisser sans
            préavis, à la différence d'une pension. Notre guide{" "}
            <a href="/guide/combien-coute-un-investissement-locatif">
              combien coûte un investissement locatif
            </a>{" "}
            détaille les postes de coûts ; l'article{" "}
            <a href="/guide/cinq-erreurs-investissement-locatif-retraite">
              cinq erreurs de l'investissement locatif pour la retraite
            </a>{" "}
            revient sur les pièges de la rentabilité affichée.
          </p>

          <h2 id="csg">Les loyers font-ils augmenter la CSG sur ma pension ?</h2>
          <p>
            Le taux de CSG appliqué à une pension de retraite dépend du <strong>revenu fiscal de
            référence</strong> (RFR) du foyer : exonération, taux réduit, taux médian ou taux normal
            selon des seuils publiés chaque année (fiche F2971 de Service-Public). Or les revenus
            fonciers entrent, en principe, dans le RFR : des loyers peuvent donc faire franchir un
            seuil et relever la CSG sur la pension elle-même. C'est une conséquence logique des règles
            publiées, qu'il faut confirmer sur son propre avis d'impôt.
          </p>
          <div className="note">
            <p>
              Exemple purement illustratif, composite, sans lien avec un cas réel. Hypothèses : une
              part fiscale ; pension annuelle brute de {euros(R.pensionAnnuelleBrute)} ; RFR avant
              loyers de {euros(R.rfrHorsLoyers)} ; loyers fonciers nets imposables de{" "}
              {euros(R.loyersFonciersAnnuels)} par an, ajoutés au RFR ; seuils de RFR pour une part
              publiés dans la fiche F2971 pour 2026 : {euros(S.zero)} (exonération), {euros(S.reduit)}{" "}
              (taux réduit) et {euros(S.median)} (taux médian). Au-delà de ce dernier seuil, le taux
              normal s'applique : {pct1(D.csgPensionTauxNormal)}, contre {pct1(D.csgPensionTauxMedian)}{" "}
              au taux médian.
            </p>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Sans les loyers</th>
                  <th>Avec les loyers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Revenu fiscal de référence</td>
                  <td>{euros(R.rfrHorsLoyers)}</td>
                  <td>{euros(rfrAvecLoyers)}</td>
                </tr>
                <tr>
                  <td>Seuil du taux médian</td>
                  <td>{euros(S.median)}</td>
                  <td>{euros(S.median)}</td>
                </tr>
                <tr>
                  <td>Position par rapport au seuil</td>
                  <td>{euros(marge)} en dessous</td>
                  <td>{euros(depassement)} au-dessus</td>
                </tr>
                <tr>
                  <td>Taux de CSG sur la pension</td>
                  <td>{bandeSans.nom} : {pct1(bandeSans.taux)}</td>
                  <td>{bandeAvec.nom} : {pct1(bandeAvec.taux)}</td>
                </tr>
                <tr>
                  <td>CSG sur {euros(R.pensionAnnuelleBrute)} de pension</td>
                  <td>{euros(csgSans)}</td>
                  <td>{euros(csgAvec)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Dans cet exemple, le franchissement du seuil coûte <strong>{euros(ecartCsg)}</strong> de
            CSG supplémentaire par an, en plus des prélèvements sur les loyers eux-mêmes. Il s'agit
            d'un effet de seuil : un euro de loyer de plus ou de moins autour de la limite peut
            changer le taux appliqué à toute la pension.
          </p>
          <div className="note">
            <p>
              Nuances importantes. Selon la fiche F2971 de Service-Public, le passage à un taux
              supérieur n'intervient en principe que si le plafond est dépassé{" "}
              <strong>deux années consécutives</strong> ; un dépassement isolé n'a donc pas
              nécessairement d'effet immédiat. Les seuils varient chaque année, se rapportent à une
              part (ils augmentent avec le nombre de parts) et s'appliquent à un revenu fiscal de
              référence d'une année antérieure. Seuls votre avis d'impôt et votre caisse de retraite font
              foi pour le taux qui vous est réellement appliqué.
            </p>
          </div>

          <h2 id="ps">Quels prélèvements sociaux sur les loyers ?</h2>
          <p>
            Les revenus fonciers supportent, en plus de l'impôt sur le revenu, des prélèvements
            sociaux au taux de {pct1(PS_FONCIER)} (fiche F2329 de Service-Public). La loi de
            financement de la sécurité sociale pour 2026 a relevé le taux appliqué à de nombreux
            revenus du capital, mais, selon les sources consultées, les revenus fonciers n'en font pas
            partie : leur taux reste {pct1(PS_FONCIER)}. Une fraction de la CSG, de{" "}
            {pct1(F.csgDeductibleFoncier)}, est déductible du revenu de l'année suivante.
          </p>
          <p>
            Sur {euros(R.loyersFonciersAnnuels)} de loyers nets imposables, les prélèvements sociaux
            représentent {euros(psLoyers)} par an, auxquels s'ajoute l'impôt sur le revenu selon votre
            tranche. À la différence de l'impôt, ils sont dus même si le foyer est non imposable à l'impôt
            sur le revenu. Au titre de la CSG déductible, la fraction déductible de l'année suivante
            représente environ {euros(csgDeductibleLoyers)} dans cet exemple.
          </p>

          <h2 id="emprunt">Et si un crédit court encore : quelle assurance emprunteur ?</h2>
          <p>
            Un crédit contracté pour acheter un bien locatif peut courir bien après le départ à la
            retraite. L'assurance emprunteur coûte plus cher avec l'âge. La loi Lemoine (article
            L. 113-2-1 du code des assurances) supprime le questionnaire de santé sous certaines
            conditions : montant assuré inférieur ou égal à {euros(D.lemoineMontantMax)} par
            assuré, tous crédits cumulés, et fin du remboursement avant les {D.lemoineAgeFinRemboursement}{" "}
            ans de l'assuré. À l'âge de la retraite, un crédit se termine donc souvent après cet âge, et
            l'exemption ne joue alors pas : le questionnaire de santé peut être demandé. Vérifiez les
            conditions exactes sur la page du ministère de l'Économie.
          </p>
          <p>
            Dans ce cas, demander une comparaison d'assurance est possible (délégation, changement
            en cours de contrat), mais l'accord de l'assureur dépend de votre état de santé. Les
            mensualités restent à rembourser quel que soit le loyer encaissé : un loyer qui baisse
            ne baisse pas la dette.
          </p>

          <h2 id="gestion">Gérer à 75 ans : déléguer ou vendre ?</h2>
          <p>
            Gérer soi-même un bien locatif suppose du temps, de la disponibilité et une certaine
            énergie : locataires, états des lieux, travaux, contentieux. À 75 ans, certains
            propriétaires y trouvent encore leur compte ; d'autres le vivent comme une charge. Deux voies
            existent, qui ne s'excluent pas dans le temps.
          </p>
          <ul>
            <li>
              <strong>Déléguer à un professionnel</strong> (agence ou administrateur de biens). Les
              honoraires de gestion réduisent le loyer net : à intégrer au calcul. Cela soulage
              l'organisation sans supprimer les risques de vacance, d'impayés et de travaux.
            </li>
            <li>
              <strong>Vendre</strong> convertit un bien en capital, que vous pouvez replacer ou
              consommer (voir notre{" "}
              <a href="/strategies/decumulation">stratégie de décumulation</a> et l'
              <a href="/guide/ordre-de-decaissement-retraite">ordre de décaissement</a>). Il faut
              alors accepter l'impôt éventuel sur la plus-value, la perte du revenu locatif et le
              risque de prix de vente.
            </li>
          </ul>
          <p>
            Une troisième voie, intermédiaire : remplacer un bien en direct par des parts de société
            immobilière (voir <a href="/guide/scpi-preparer-sa-retraite">SCPI pour préparer sa retraite</a>),
            qui supprime la gestion mais pas le risque de capital ni d'illiquidité. Le LMNP en résidence
            gérée est un autre exemple, avec ses propres risques (
            <a href="/guide/lmnp-risques">risques du LMNP</a>).
          </p>

          <h2 id="vente">Vendre un bien locatif : quelle plus-value, quel impôt ?</h2>
          <p>
            La vente d'un bien locatif (hors résidence principale) génère une plus-value imposable à
            l'impôt sur le revenu au taux de {pct1(F.pvIR)} et aux prélèvements sociaux de{" "}
            {pct1(PS_FONCIER)}, après des abattements qui augmentent avec la durée de détention. Les
            taux et abattements ci-dessous sont ceux des fiches F10864 de Service-Public et du BOFiP :
            vérifiez-les avant toute vente.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Années de détention</th>
                  <th>Abattement cumulé pour l'impôt sur le revenu</th>
                  <th>Abattement cumulé pour les prélèvements sociaux</th>
                </tr>
              </thead>
              <tbody>
                {durees.map((a) => (
                  <tr key={a}>
                    <td>{a} ans</td>
                    <td>{pct1(abattIR(a))}</td>
                    <td>{pct1(abattPS(a))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            En clair : aucune réduction pendant les {F.pvAnneesSansAbattement} premières années ; ensuite {pct1(F.pvAbattementIRParAn)}{" "}
            par an pour l'impôt (jusqu'à l'exonération complète à {F.pvExonerationIRAnnees} ans) et{" "}
            {pct1(F.pvAbattementPSParAn)} par an pour les prélèvements sociaux (exonération complète à{" "}
            {F.pvExonerationPSAnnees} ans). Une cession dont le prix est inférieur ou égal à{" "}
            {euros(F.pvExonerationPrixCession)} est exonérée. Au-delà de {euros(F.pvSurtaxeSeuil)} de
            plus-value imposable, une surtaxe dont le taux dépend du montant s'ajoute (détail dans
            la fiche F10864). Les frais d'acquisition et certains travaux peuvent être pris en compte
            dans le calcul ; leur régime se vérifie dans le BOFiP.
          </p>
          <div className="note">
            <p>
              <strong>Exonération des retraités de condition modeste.</strong> Selon les sources
              consultées, certains retraités peuvent être exonérés de plus-value immobilière sous
              conditions de ressources (revenu fiscal de référence inférieur à un plafond, qui
              s'élève à {euros(D.plusValueRetraiteRfr1Part)} pour une part et croît de {euros(D.plusValueRetraiteRfrDemiPart)} par demi-part
              supplémentaire selon nos sources, montants à confirmer sur la fiche F10864) et de
              non-assujettissement à l'IFI. D'autres conditions peuvent s'ajouter. Elle ne profite donc
              qu'à une minorité de ménages ; ne comptez pas dessus sans vérification
              auprès de l'administration fiscale ou d'un notaire.
            </p>
          </div>
          <p>
            Le notaire calcule la plus-value et prélève l'impôt à la signature. Avant de vendre,
            demandez-lui une simulation : l'écart entre prix de vente et impôt net est ce qui
            compte pour votre budget.
          </p>

          <h2 id="viager">Le viager est-il une option ?</h2>
          <p>
            Dans une vente en viager, le vendeur reçoit généralement un capital initial (le « bouquet
            ») et une rente versée à vie. Le prix dépend de l'âge du vendeur et de sa
            situation ; la fiche F2762 de Service-Public en décrit le principe. Le viager transforme un
            bien en revenu viager, mais le vendeur renonce au bien (sauf viager occupé : il garde le
            droit d'y habiter) et à toute hausse de sa valeur ; la rente a une fiscalité spécifique.
            Nous ne chiffrons pas ce mécanisme, qui mérite l'avis d'un notaire.
          </p>

          <h2 id="transmission">Comment transmettre un bien locatif ?</h2>
          <p>
            Quatre outils reviennent, à combiner selon vos objectifs. Chacun est détaillé dans un
            autre guide ; voici ce qu'il faut en retenir.
          </p>
          <ul>
            <li>
              <strong>La donation</strong> en pleine propriété : abattement de{" "}
              {euros(TRANSMISSION.abattementDonationParEnfant)} par parent et par enfant, renouvelable
              tous les {TRANSMISSION.renouvellementDonationAnnees} ans. Elle est irrévocable, et les
              loyers futurs reviennent au donataire. Voir{" "}
              <a href="/guide/donation-ou-assurance-vie-transmission">
                donation ou assurance-vie
              </a>.
            </li>
            <li>
              <strong>Le démembrement</strong> (donation de la nue-propriété avec réserve d'usufruit) :
              vous gardez les loyers, les droits se calculent sur la seule nue-propriété. Voir{" "}
              <a href="/guide/demembrement-nue-propriete-retraite">
                démembrement et nue-propriété
              </a>.
            </li>
            <li>
              <strong>L'assurance-vie</strong> : en cas de vente du bien, replacer le produit en
              assurance-vie ouvre un régime de transmission distinct (abattement de{" "}
              {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} par bénéficiaire pour les
              versements avant 70 ans, selon l'article 990 I du CGI ; pour les versements après
              70 ans, le régime est moins favorable, avec un abattement global de{" "}
              {euros(TRANSMISSION.abattementSuccessionAvApres70Collectif)} pour l'ensemble des
              bénéficiaires, à confirmer). Voir{" "}
              <a href="/guide/meilleure-assurance-vie-retraite">notre guide de l'assurance-vie</a> et{" "}
              <a href="/guide/immobilier-locatif-ou-assurance-vie">
                immobilier locatif ou assurance-vie
              </a>.
            </li>
            <li>
              <strong>L'IFI</strong> : l'impôt sur la fortune immobilière concerne les foyers dont le
              patrimoine immobilier net taxable dépasse {euros(F.ifiSeuilAssujettissement)} au 1er
              janvier ; le barème commence au-delà de {euros(F.ifiSeuilBareme)}. En dessous, il ne
              concerne pas le foyer.
            </li>
          </ul>
          <p>
            Pour mesurer l'effet de ces choix sur votre retraite d'ensemble, voir aussi{" "}
            <a href="/guide/per-ou-immobilier-locatif">PER ou immobilier locatif</a>.
          </p>

          <h2 id="arbre">Garder, déléguer, vendre ou transmettre : quatre questions</h2>
          <p>
            Ces questions orientent la réflexion ; elles ne désignent pas une solution, qui dépend de
            votre situation globale.
          </p>
          <ol>
            <li>
              <strong>Ce bien est-il nécessaire à votre revenu de retraite ?</strong>
              <br />
              Oui : vendre ou donner sans compensation affaiblit votre budget ; déléguer ou garder
              est à examiner. Non : toutes les options restent ouvertes, passez à la question 2.
            </li>
            <li>
              <strong>Pouvez-vous (et voulez-vous) encore le gérer ?</strong>
              <br />
              Oui : garder. Non : déléguer à un professionnel, en intégrant ses honoraires, ou
              envisager de vendre.
            </li>
            <li>
              <strong>La vente est-elle fiscalement raisonnable ?</strong>
              <br />
              Regardez la durée de détention (tableau ci-dessus), la plus-value probable, et si vous
              relevez des exonérations (retraité de condition modeste, cession de faible montant).
              Une durée proche d'un seuil d'exonération ({F.pvExonerationIRAnnees} ou{" "}
              {F.pvExonerationPSAnnees} ans) peut justifier d'attendre. Si l'impôt est
              élevé, la transmission en nature devient une piste.
            </li>
            <li>
              <strong>Voulez-vous le transmettre de votre vivant ?</strong>
              <br />
              Oui, sans renoncer aux loyers : donation avec réserve d'usufruit, à voir avec un notaire.
              Oui, sans le bien : vente, puis donation d'une somme d'argent ou assurance-vie. Non :
              garder, et organiser la succession.
            </li>
          </ol>

          <h2 id="erreurs">Quelles erreurs éviter ?</h2>
          <ul>
            <li>
              <strong>Compter les loyers bruts dans son budget</strong> sans retrancher charges,
              impôt et prélèvements sociaux.
            </li>
            <li>
              <strong>Ne pas anticiper l'effet sur la CSG des pensions</strong> d'un revenu foncier qui
              franchit un seuil.
            </li>
            <li>
              <strong>Vendre un an trop tôt</strong>, juste avant un seuil d'exonération de
              plus-value ({F.pvExonerationIRAnnees} ou {F.pvExonerationPSAnnees} ans de détention).
            </li>
            <li>
              <strong>Garder un crédit long à l'âge de la retraite</strong> sans avoir vérifié
              l'assurance emprunteur ni la capacité à rembourser si les loyers baissent.
            </li>
            <li>
              <strong>Croire que l'exonération des retraités s'applique automatiquement</strong> :
              elle suppose des conditions de ressources et d'IFI.
            </li>
            <li>
              <strong>Donner trop tôt un bien dont on aura besoin</strong> : une donation est
              irrévocable.
            </li>
            <li>
              <strong>Oublier l'IFI</strong> quand le patrimoine immobilier approche le seuil.
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Les loyers sont-ils imposés comme ma pension ?</h3>
          <p>
            Ils sont imposés dans la catégorie des revenus fonciers, au barème de l'impôt sur le
            revenu, avec des prélèvements sociaux de {pct1(PS_FONCIER)}. Selon le régime, une
            part de frais est déduite (micro-foncier) ou les charges réelles (régime réel). Voir
            la page « régimes d'imposition » d'impots.gouv.fr.
          </p>
          <h3>Un loyer peut-il me faire changer de tranche de CSG sur ma pension ?</h3>
          <p>
            Oui, par le revenu fiscal de référence, dans les conditions décrites plus haut, avec la
            nuance des deux années consécutives. Votre avis d'impôt indique votre situation.
          </p>
          <h3>Vendre mon bien locatif à la retraite est-il exonéré d'impôt ?</h3>
          <p>
            Pas en général. Une exonération existe après les durées de détention indiquées (
            {F.pvExonerationIRAnnees} ans pour l'impôt, {F.pvExonerationPSAnnees} ans pour les
            prélèvements sociaux), pour de faibles montants de cession, ou pour certains retraités
            sous conditions de ressources et d'IFI.
          </p>
          <h3>Le viager convient-il à un retraité propriétaire ?</h3>
          <p>
            Il peut apporter un revenu viager, au prix de l'abandon du bien. Les conditions
            varient fortement ; renseignez-vous auprès d'un notaire.
          </p>
          <h3>Peut-on donner un bien locatif à ses enfants et garder les loyers ?</h3>
          <p>
            Oui, par une donation avec réserve d'usufruit. Voir notre guide sur le démembrement.
          </p>
          <h3>À partir de quand l'IFI s'applique-t-il ?</h3>
          <p>
            Lorsque le patrimoine immobilier net taxable du foyer dépasse {euros(F.ifiSeuilAssujettissement)}{" "}
            au 1er janvier, avec un barème qui démarre au-delà de {euros(F.ifiSeuilBareme)}.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            À la retraite, l'immobilier locatif cesse d'être un projet pour devenir un arbitrage. Les
            loyers rapportent moins que leur montant brut, parce que les prélèvements sociaux, l'impôt et
            parfois la CSG sur la pension grignotent le revenu ; la gestion pèse avec l'âge ; la vente a
            un coût fiscal qui diminue avec la durée de détention ; la transmission peut se préparer de
            plusieurs façons.
          </p>
          <p>
            Il n'y a pas de bonne réponse unique. La démarche utile consiste à calculer ce que le bien
            rapporte réellement après impôt, à lire son avis d'impôt pour repérer les effets de seuil, puis
            à comparer garder, déléguer, vendre et transmettre avec un notaire. Notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> aide à mesurer le revenu
            nécessaire ; le <a href="/bilan-retraite">bilan retraite gratuit</a> permet de replacer
            l'immobilier parmi les autres leviers.
          </p>

          <h2 id="lire-aussi">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/immobilier-et-retraite-guide-complet">Immobilier et retraite : le guide complet</a></li>
          </ul>

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
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les règles
              citées sont celles publiées au {IMMO.maj} et peuvent évoluer ; les montants et seuils sont
              ceux des sources officielles consultées, à confirmer sur votre avis d'impôt, auprès de
              votre caisse de retraite ou d'un notaire. Les exemples chiffrés sont des illustrations
              pédagogiques, composites, sans lien avec un cas réel. Les loyers ne sont pas garantis.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Garder, vendre ou transmettre un bien à la retraite se décide avec une vue d'ensemble." />
    </>
  );
}
