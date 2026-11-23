import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  IMMO,
  IMMO_EXEMPLES,
  FISCALITE,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const L = IMMO.lmnp;
const F = IMMO.scpiFiscalite;
const E = IMMO_EXEMPLES.lmnpReforme;
const PS_PV = FISCALITE.prelevementsSociaux.immobilier;

const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " %";

// ---- Abattements pour durée de détention (plus-values immobilières des particuliers) ----
// IR : par an de la 6e à la 21e année, puis taux de la 22e année ; exonération à 22 ans.
const abattementIR = (annees) => {
  if (annees >= F.pvExonerationIRAnnees) return 100;
  const pleines = Math.max(Math.min(annees, F.pvExonerationIRAnnees - 1) - F.pvAnneesSansAbattement, 0);
  return pleines * F.pvAbattementIRParAn;
};
// PS : 1,65 % par an de la 6e à la 21e année, 1,6 % la 22e, 9 % par an de la 23e à la 30e ; exonération à 30 ans.
const abattementPS = (annees) => {
  if (annees >= F.pvExonerationPSAnnees) return 100;
  const an22 = F.pvExonerationIRAnnees;
  const jusque21 = Math.max(Math.min(annees, an22 - 1) - F.pvAnneesSansAbattement, 0) * F.pvAbattementPSParAn;
  const a22 = annees >= an22 ? F.pvAbattementPS22e : 0;
  const de23a30 = Math.max(annees - an22, 0) * F.pvAbattementPSParAn23a30;
  return jusque21 + a22 + de23a30;
};

const impotsPlusValue = (plusValue, annees) => {
  const baseIR = plusValue * (1 - abattementIR(annees) / 100);
  const basePS = plusValue * (1 - abattementPS(annees) / 100);
  const ir = (baseIR * F.pvIR) / 100;
  const ps = (basePS * PS_PV) / 100;
  return { plusValue, baseIR, basePS, ir, ps, total: ir + ps };
};

// ---- Exemple simplifié : amortissement linéaire sur la part amortissable ----
const amortissementCumule =
  ((E.prixAcquisition * E.partAmortissable) / 100 / E.dureeAmortissementAnnees) *
  E.dureeDetentionAnnees;
const prixAcquisitionCorrige = E.prixAcquisition - amortissementCumule;

const sans = impotsPlusValue(E.prixCession - E.prixAcquisition, E.dureeDetentionAnnees);
const avec = impotsPlusValue(E.prixCession - prixAcquisitionCorrige, E.dureeDetentionAnnees);
const ecart = avec.total - sans.total;
const surtaxeSans = sans.baseIR > F.pvSurtaxeSeuil;
const surtaxeAvec = avec.baseIR > F.pvSurtaxeSeuil;
const surtaxeEnJeu = surtaxeSans || surtaxeAvec;

const sources = [
  {
    label:
      "Légifrance — Loi n° 2025-127 du 14 février 2025 de finances pour 2025, article 84 (réintégration des amortissements dans le calcul de la plus-value)",
    url: "https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000051168884",
  },
  {
    label:
      "Assemblée nationale — Réponse ministérielle à la question écrite n° 10097 (JO du 24 mars 2026)",
    url: "https://questions.assemblee-nationale.fr/q17/17-10097QE.htm",
  },
  {
    label:
      "Service-Public.gouv.fr — Plus-values immobilières, fiche F10864, vérifiée le 15 avril 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F10864",
  },
  {
    label:
      "Service-Public.gouv.fr — Prélèvements sociaux sur les revenus du patrimoine, fiche F2329",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2329",
  },
  {
    label: "Service-Public.gouv.fr — Location meublée : régime fiscal, fiche F32744",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F32744",
  },
  {
    label:
      "impots.gouv.fr — FAQ sur le régime fiscal des locations meublées (mars 2026)",
    url: "https://www.impots.gouv.fr/sites/default/files/media/1_metier/5_international/actualite/faq-lmnp-03_2026.pdf",
  },
  {
    label:
      "BOFiP — Bénéfices industriels et commerciaux : champ d'application, location meublée (BOI-BIC-CHAMP-40-20, version du 19 août 2026)",
    url: "https://bofip.impots.gouv.fr/bofip/3610-PGP.html/identifiant=BOI-BIC-CHAMP-40-20-20260819",
  },
  {
    label:
      "Service-Public.gouv.fr — Dispositif Jeanbrun, fiche F39735",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F39735",
  },
  {
    label:
      "Légifrance — Loi de finances pour 2026 (loi n° 2026-103 du 19 février 2026), article 47 (dispositif Jeanbrun)",
    url: "https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000053508409",
  },
];

export default function GuideLmnpReforme() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Immobilier meublé · fiscalité de la revente</span>
          <h1>LMNP : amortissement et plus-value, ce que change la réintégration à la revente</h1>
          <p className="sub">
            L'amortissement allège l'impôt pendant la détention, mais il peut le renchérir à la
            sortie. Un exemple chiffré et simplifié pour comprendre le mécanisme. Mis à jour le{" "}
            {IMMO.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> pour les cessions de logements meublés à compter de
              la mi-février 2025, les amortissements déduits pendant la détention sont, sauf
              exceptions, réintégrés dans le calcul de la plus-value : le prix d'acquisition est
              diminué d'autant. Dans l'exemple simplifié de cet article, un amortissement cumulé
              de {euros(amortissementCumule)} fait passer la plus-value de{" "}
              {euros(sans.plusValue)} à {euros(avec.plusValue)}, et l'impôt total de{" "}
              {euros(sans.total)} à {euros(avec.total)}, soit {euros(ecart)} de plus. L'effet
              diminue avec la durée de détention, et le cadre reste en discussion.
            </p>
          </div>

          <p>
            L'argument phare du LMNP au régime réel est l'amortissement : il réduit, voire annule,
            l'impôt sur les loyers pendant des années. Longtemps, il n'avait pas de contrepartie
            à la revente. Depuis la loi de finances pour 2025, il en a une. Pour un futur retraité
            qui comptait sur la revente ou sur la transmission du bien, la question est donc de
            savoir ce que cette réintégration change.
          </p>
          <p>
            Nous ne redéveloppons pas ici l'ensemble des risques du LMNP, traités dans{" "}
            <a href="/guide/lmnp-risques">LMNP : les risques que l'on vous cache</a>, ni la
            logique d'une résidence gérée, expliquée dans{" "}
            <a href="/guide/lmnp-residence-geree-retraite">
              LMNP en résidence gérée : que vaut ce revenu pour la retraite ?
            </a>
            . Nous posons ici un calcul, que les deux autres articles ne donnent pas.
          </p>
          <p>
            Prenons une situation illustrative et composite, sans lien avec un cas réel :
            Marc, 61 ans, a acheté il y a quelques années un logement meublé en résidence gérée,
            amorti au régime réel. Il envisage de le revendre autour de la retraite pour financer
            un projet, et se demande si l'impôt sur la plus-value lui réserve une surprise.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#logique">Qu'a changé la loi de finances pour 2025 ?</a></li>
              <li><a href="#exceptions">Quelles résidences échappent à la réintégration ?</a></li>
              <li><a href="#exemple">Que donne la réintégration sur un exemple chiffré ?</a></li>
              <li><a href="#duree">Que change la durée de détention ({F.pvExonerationIRAnnees} ans, {F.pvExonerationPSAnnees} ans) ?</a></li>
              <li><a href="#arbitrage">Garder jusqu'à la transmission ou vendre : quelles questions se poser ?</a></li>
              <li><a href="#debat">Où en est le débat sur l'amortissement en meublé ?</a></li>
              <li><a href="#jeanbrun">Le dispositif Jeanbrun : une autre voie, en location nue</a></li>
              <li><a href="#chronologie">Chronologie : de 2024 à fin 2026</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="logique">Qu'a changé la loi de finances pour 2025 ?</h2>
          <p>
            Le texte à l'origine de la réforme est l'{L.texteReintegration}. Sa logique est
            simple : un amortissement est une charge comptable qui a réduit votre bénéfice
            imposable chaque année, parce que le logement est supposé s'user. Le législateur a
            choisi d'en tenir compte à la revente : l'avantage obtenu pendant la détention est
            en partie repris au moment de la plus-value.
          </p>
          <p>
            Techniquement, le prix d'acquisition retenu pour calculer la plus-value est diminué
            des amortissements déduits. Le prix d'acquisition « corrigé » est plus bas, donc la
            plus-value est plus haute, donc l'impôt aussi. Selon les sources consultées, la mesure
            s'applique aux cessions réalisées à compter de la mi-février 2025 (la date exacte, {L.dateReintegrationAmortissements}, est à confirmer sur le texte). Selon la
            réponse ministérielle du 24 mars 2026, elle s'applique quelle que soit la date de mise
            en location du bien : un logement acheté et loué avant 2025 est concerné.
          </p>
          <p>
            Autre précision : la réintégration concerne les amortissements effectivement déduits.
            Si vous avez été au micro-BIC, dont l'abattement forfaitaire n'est pas un amortissement
            déduit, la question se pose différemment : faites vérifier votre cas. Le sort des
            amortissements non déduits (en report) et du mobilier est également à confirmer auprès
            d'un professionnel.
          </p>

          <h2 id="exceptions">Quelles résidences échappent à la réintégration ?</h2>
          <p>
            L'article 84 prévoit des exceptions pour certaines catégories. D'après son texte, il
            s'agit notamment :
          </p>
          <ul>
            <li>des résidences ou établissements pour étudiants, réservés à ce public ;</li>
            <li>
              des établissements et services sociaux et médico-sociaux, dont les EHPAD ;
            </li>
            <li>
              des résidences-services pour personnes âgées ou handicapées, agréées ou autorisées ;
            </li>
            <li>de l'accueil familial salarié géré par un groupement de coopération sociale et médico-sociale ;</li>
            <li>des établissements de soins de longue durée.</li>
          </ul>
          <p>
            Les résidences de tourisme et d'affaires paraissent, a priori, concernées par la
            réintégration : à confirmer par un professionnel ou sur le texte consolidé. Quant aux
            résidences seniors non médicalisées, les conditions de l'exception se vérifient au
            cas par cas dans le texte : nous n'affirmons ni qu'elles en bénéficient ni qu'elles en
            sont exclues. Demandez au vendeur une réponse écrite, et faites-la relire par un
            conseil indépendant.
          </p>

          <h2 id="exemple">Que donne la réintégration sur un exemple chiffré ?</h2>
          <p>
            Reprenons un exemple composite, volontairement simplifié. Hypothèses : un logement
            acheté {euros(E.prixAcquisition)}, dont {E.partAmortissable} % sont amortissables
            (hors terrain), amorti de façon linéaire sur {E.dureeAmortissementAnnees} ans, détenu{" "}
            {E.dureeDetentionAnnees} ans et revendu {euros(E.prixCession)}.
          </p>
          <ul>
            <li>
              Amortissement cumulé : {euros(E.prixAcquisition)} × {E.partAmortissable} % ÷{" "}
              {E.dureeAmortissementAnnees} ans × {E.dureeDetentionAnnees} ans ={" "}
              <strong>{euros(amortissementCumule)}</strong>.
            </li>
            <li>
              Prix d'acquisition corrigé : {euros(E.prixAcquisition)} −{" "}
              {euros(amortissementCumule)} = {euros(prixAcquisitionCorrige)}.
            </li>
            <li>
              Abattements pour durée de détention à {E.dureeDetentionAnnees} ans :{" "}
              {pct1(abattementIR(E.dureeDetentionAnnees))} pour l'impôt sur le revenu et{" "}
              {pct1(abattementPS(E.dureeDetentionAnnees))} pour les prélèvements sociaux.
            </li>
          </ul>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Élément</th>
                  <th>Sans réintégration</th>
                  <th>Avec réintégration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Plus-value brute</td>
                  <td>{euros(sans.plusValue)}</td>
                  <td>{euros(avec.plusValue)}</td>
                </tr>
                <tr>
                  <td>Impôt sur le revenu à {pct(F.pvIR)} (après abattement)</td>
                  <td>{euros(sans.ir)}</td>
                  <td>{euros(avec.ir)}</td>
                </tr>
                <tr>
                  <td>Prélèvements sociaux à {pct(PS_PV)} (après abattement)</td>
                  <td>{euros(sans.ps)}</td>
                  <td>{euros(avec.ps)}</td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>{euros(sans.total)}</strong></td>
                  <td><strong>{euros(avec.total)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            L'écart est de {euros(ecart)}. {surtaxeEnJeu
              ? `Dans ce cas, la plus-value imposable à l'impôt sur le revenu dépasse le seuil de ${euros(F.pvSurtaxeSeuil)} au-delà duquel une surtaxe s'ajoute : elle n'est pas calculée ici, ce qui sous-estime l'impôt.`
              : `Dans cet exemple, la plus-value imposable à l'impôt sur le revenu reste sous le seuil de ${euros(F.pvSurtaxeSeuil)} au-delà duquel une surtaxe s'ajoute : elle n'intervient donc pas ici. Une plus-value plus élevée la ferait entrer en jeu.`}
          </p>
          <div className="note">
            <p>
              <strong>Un exemple volontairement simplifié.</strong> Il ignore les frais
              d'acquisition, les travaux, les forfaits éventuels, le mobilier, la part de
              terrain réelle, l'exonération pour cession d'un faible montant et toute situation
              particulière. Un amortissement réel est rarement parfaitement linéaire. Ce
              calcul sert à comprendre l'ordre de grandeur du mécanisme, pas à estimer votre
              impôt.
            </p>
          </div>

          <h2 id="duree">Que change la durée de détention ({F.pvExonerationIRAnnees} ans, {F.pvExonerationPSAnnees} ans) ?</h2>
          <p>
            Les abattements pour durée de détention s'appliquent à la plus-value ainsi
            recalculée. Pour l'impôt sur le revenu, l'exonération est complète à partir de{" "}
            {F.pvExonerationIRAnnees} ans de détention ; pour les prélèvements sociaux, à
            partir de {F.pvExonerationPSAnnees} ans. Entre les deux, une part de la plus-value
            reste soumise aux prélèvements sociaux seulement.
          </p>
          <ul>
            <li>
              <strong>Revente avant {F.pvExonerationIRAnnees} ans :</strong> la réintégration augmente la base
              imposable à l'impôt sur le revenu et aux prélèvements sociaux. L'effet est le plus
              marqué pour les reventes précoces, où les abattements sont encore faibles : au bout
              de {E.dureeDetentionAnnees} ans, ils sont de {pct1(abattementIR(E.dureeDetentionAnnees))} pour l'impôt sur le revenu.
            </li>
            <li>
              <strong>Revente après {F.pvExonerationIRAnnees} ans, avant {F.pvExonerationPSAnnees} ans :</strong> l'impôt sur le revenu
              disparaît, mais la plus-value reste imposable aux prélèvements sociaux,
              progressivement réduits.
            </li>
            <li>
              <strong>Revente après {F.pvExonerationPSAnnees} ans :</strong> la plus-value est exonérée d'impôt et de
              prélèvements sociaux, sous réserve des règles en vigueur à ce moment-là.
            </li>
          </ul>
          <p>
            Un détail utile : un investisseur qui garderait son bien plus de{" "}
            {F.pvExonerationPSAnnees} ans sortirait, selon les règles actuelles, du champ de
            l'impôt sur la plus-value : la réintégration ne coûterait alors rien en impôt sur la
            plus-value. C'est
            une durée très longue, qui suppose de rester propriétaire bien au-delà de la retraite.
          </p>

          <h2 id="arbitrage">Garder jusqu'à la transmission ou vendre : quelles questions se poser ?</h2>
          <p>
            Il ne s'agit pas de dire ce qu'il faut faire, mais de poser les bonnes questions.
          </p>
          <ul>
            <li>
              <strong>De quoi ai-je besoin, et quand ?</strong> Un capital à date fixe (projet,
              dépendance, aide aux enfants) ne se pilote pas comme un patrimoine destiné à rester
              dans la famille.
            </li>
            <li>
              <strong>Où en est mon horizon de détention ?</strong> L'écart de fiscalité entre
              une vente après {E.dureeDetentionAnnees} ans et une vente après {F.pvExonerationIRAnnees} ans, ou{" "}
              {F.pvExonerationPSAnnees} ans, peut peser
              plus lourd que l'avantage fiscal annuel de l'amortissement.
            </li>
            <li>
              <strong>Quelle est la solidité du revenu ?</strong> Si le loyer venait à baisser,
              le bien perdrait de l'intérêt avant d'avoir atteint l'horizon d'exonération.
            </li>
            <li>
              <strong>Et la transmission ?</strong> La fiscalité d'une transmission ne se
              confond pas avec celle d'une vente : elle relève d'autres règles, que notre guide{" "}
              <a href="/guide/donation-ou-assurance-vie-transmission">
                donation ou assurance-vie
              </a>{" "}
              aborde, et que notre guide sur{" "}
              <a href="/strategies/decumulation">la décumulation</a> replace dans une stratégie
              d'ensemble.
            </li>
          </ul>
          <p>
            Pour situer la vente dans votre ordre de retraits, voir{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement à la retraite</a>
            . Ces questions se traitent avec un expert-comptable ou un notaire, qui connaissent
            votre situation.
          </p>

          <h2 id="debat">Où en est le débat sur l'amortissement en meublé ?</h2>
          <p>
            La fiscalité du meublé n'est pas stabilisée. Le projet de loi de finances pour 2027
            (projet n° 3210, déposé le 1er octobre 2026) contient, à son article 7, des
            dispositions sur l'amortissement en meublé. Elles sont en discussion au {IMMO.maj} et
            ne sont pas adoptées ; leur contenu et leur calendrier peuvent évoluer. Nous ne
            chiffrons rien à ce stade, et nous vous conseillons de vérifier le texte final
            publié avant toute décision.
          </p>
          <div className="note">
            <p>
              Pour un investisseur qui n'a pas encore acheté, l'incertitude change la manière de
              bâtir le calcul : mieux vaut un projet qui reste cohérent sans l'avantage de
              l'amortissement que celui qui en dépend. Pour un propriétaire en place, les
              règles qui s'appliqueront sont celles en vigueur à la date de la cession, et non
              celles du jour de l'achat.
            </p>
          </div>

          <h2 id="jeanbrun">Le dispositif Jeanbrun : une autre voie, en location nue</h2>
          <p>
            La loi de finances pour 2026 (loi n° 2026-103 du 19 février 2026), à son article 47, a
            créé le dispositif dit « Jeanbrun » : un amortissement en location <em>nue</em>, avec
            un engagement de location de {IMMO.demembrement.jeanbrunDureeEngagementAnnees} ans, pour des acquisitions jusqu'au{" "}
            {IMMO.demembrement.jeanbrunDateLimite}, et un plafond annuel d'amortissement de{" "}
            {euros(IMMO.demembrement.jeanbrunPlafondAmortissement)}. Il ne concerne pas la location
            meublée. Nous ne le détaillons pas : les conditions (type de bien, zone, travaux)
            sont techniques et se lisent sur la fiche officielle de Service-Public (F39735).
            C'est une voie alternative, pas une équivalence : une comparaison avec le meublé se
            lit dans notre guide <a href="/guide/lmnp-ou-locatif-nu">LMNP ou locatif nu</a>.
          </p>

          <h2 id="chronologie">Chronologie : de 2024 à fin 2026</h2>
          <ul>
            <li>
              <strong>2024.</strong> Loi n° 2024-1039 du 19 novembre 2024 (loi dite « Le Meur »),
              qui touche le régime des locations meublées de courte durée (micro-BIC du tourisme
              notamment).
            </li>
            <li>
              <strong>2025.</strong> Loi de finances pour 2025 (loi n° 2025-127 du 14 février 2025),
              article 84 : réintégration des amortissements dans le calcul de la plus-value, avec
              les exceptions listées ci-dessus.
            </li>
            <li>
              <strong>2026.</strong> Loi de finances pour 2026 (loi n° 2026-103 du 19 février
              2026) : nous n'avons pas retrouvé de modification du régime LMNP dans les sources
              consultées ; son article 47 crée le dispositif Jeanbrun en location nue.
              Précisions administratives (réponse ministérielle du 24 mars 2026, FAQ de mars
              2026).
            </li>
            <li>
              <strong>Fin 2026.</strong> Projet de loi de finances pour 2027 : dispositions sur
              l'amortissement en meublé en discussion, non adoptées ; à suivre sur les sites
              officiels.
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>La réintégration s'applique-t-elle à tous les logements meublés ?</h3>
          <p>
            Non : l'article 84 prévoit des exceptions (étudiantes, médico-sociales, certaines
            résidences-services). Les résidences de tourisme et d'affaires paraissent a priori
            concernées, mais le point est à confirmer pour chaque situation.
          </p>
          <h3>Mon bien a été acheté avant 2025 : suis-je concerné ?</h3>
          <p>
            Selon la réponse ministérielle du 24 mars 2026, la règle s'applique quelle que soit la
            date de mise en location, pour les cessions à compter de la mi-février 2025.
          </p>
          <h3>Peut-on éviter la réintégration en n'amortissant pas ?</h3>
          <p>
            Ne pas déduire d'amortissement réduit l'effet de la réintégration, mais prive d'un
            avantage fiscal pendant la détention. Le choix se calcule avec un expert-comptable,
            sur votre situation.
          </p>
          <h3>La réforme est-elle définitive ?</h3>
          <p>
            Le texte de 2025 est en vigueur. D'autres évolutions sont en discussion : vérifiez
            le texte final de la loi de finances pour 2027 une fois publié.
          </p>
          <h3>Où trouver une aide pour estimer mon cas ?</h3>
          <p>
            Un expert-comptable ou un notaire peuvent faire le calcul avec vos chiffres réels. Pour
            replacer la vente dans votre retraite, le{" "}
            <a href="/simulateur-retraite">simulateur retraite</a> et le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> servent de point de
            départ.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La réintégration déplace une partie de l'avantage fiscal du LMNP : moins d'impôt
            pendant la détention, plus d'impôt à la revente. Dans notre exemple simplifié, l'impôt
            sur la plus-value passe de {euros(sans.total)} à {euros(avec.total)} pour une revente
            après {E.dureeDetentionAnnees} ans. L'effet diminue avec la durée de détention et
            disparaît, pour la plus-value, après {F.pvExonerationPSAnnees} ans, mais le cadre reste
            évolutif.
          </p>
          <p>
            Trois repères de lecture : savoir si votre résidence relève ou non des exceptions ;
            situer votre horizon de revente par rapport aux seuils de {F.pvExonerationIRAnnees} et{" "}
            {F.pvExonerationPSAnnees} ans ; suivre le
            texte final de la loi de finances pour 2027. Pour la place d'un bien meublé dans
            l'ensemble de votre stratégie, voir{" "}
            <a href="/strategies/immobilier-retraite">l'immobilier dans la stratégie retraite</a>{" "}
            et{" "}
            <a href="/guide/cinq-erreurs-investissement-locatif-retraite">
              les cinq erreurs de l'investissement locatif
            </a>
            .
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les règles
              citées sont celles publiées au {IMMO.maj} et peuvent évoluer. L'exemple chiffré est
              une illustration pédagogique, composite et sans lien avec un cas réel, établie sur
              des hypothèses affichées et simplifiées ; il ne préjuge ni de votre situation, ni
              des règles futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Avant de vendre ou de garder un bien meublé, chiffrez l'horizon avec vos vrais chiffres." />
    </>
  );
}
