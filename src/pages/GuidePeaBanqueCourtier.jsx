import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { SimulateurCapitalisation } from "../components/Simulateurs.jsx";
import {
  RENDEMENTS,
  FRAIS_TYPES,
  FISCALITE,
  ILLUSTRATIF,
  SIMU_DEFAUTS,
  ENVELOPPES_NOV2026,
  ENRICH_EPPEA_PEA,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

// ------------------------------------------------------------------
// Exemple chiffré de la section 3 — calculé au build à partir des
// hypothèses centralisées (même formule que Simulateurs.jsx :
// versements en début de mois, taux annuel net constant).
// Hypothèses illustratives, jamais des projections promises.
// ------------------------------------------------------------------
function capitalise(versementMensuel, dureeAnnees, tauxAnnuelPct) {
  const n = Math.round(dureeAnnees * 12);
  const taux = tauxAnnuelPct / 100;
  if (Math.abs(taux) < 1e-9) return versementMensuel * n;
  const i = Math.pow(1 + taux, 1 / 12) - 1;
  return versementMensuel * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

const EX = (() => {
  const versement = SIMU_DEFAUTS.versementMensuel;
  const duree = SIMU_DEFAUTS.dureeAnnees;
  const brut = RENDEMENTS.ucActionsLongTerme.moyen; // hypothèse illustrative
  const fraisMaison = ILLUSTRATIF.fraisSupportMaison; // dans la fourchette FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports
  const fraisEtf = ILLUSTRATIF.fraisSupportEtf; // dans la fourchette FRAIS_TYPES.contratInternet.fraisSupports
  const arrondiCent = (n) => Math.round(n / 100) * 100;
  const versements = versement * duree * 12;
  const capMaison = arrondiCent(capitalise(versement, duree, brut - fraisMaison));
  const capEtf = arrondiCent(capitalise(versement, duree, brut - fraisEtf));
  return {
    versement,
    duree,
    brut,
    fraisMaison,
    fraisEtf,
    versements,
    capMaison,
    capEtf,
    gainsMaison: capMaison - versements,
    gainsEtf: capEtf - versements,
    ecart: capEtf - capMaison,
    ecartPct: Math.round(((capEtf - capMaison) / versements) * 100),
  };
})();

// ------------------------------------------------------------------
// Exemple « PEA et retraite » : sortie en capital après le délai de
// cinq ans. Montants illustratifs lus dans hypotheses.js.
// ------------------------------------------------------------------
const PR = (() => {
  const capital = ENRICH_EPPEA_PEA.capitalExemple;
  const versements = ENRICH_EPPEA_PEA.versementsCumulesExemple;
  const gains = capital - versements;
  const psPea = Math.round((gains * FISCALITE.prelevementsSociaux.pea) / 100);
  const pfuCto = Math.round((gains * (FISCALITE.pfuIR + FISCALITE.prelevementsSociaux.cto)) / 100);
  return {
    capital,
    versements,
    gains,
    psPea,
    netPea: capital - psPea,
    pfuCto,
    netCto: capital - pfuCto,
    economie: pfuCto - psPea,
    pfuTotal: FISCALITE.pfuIR + FISCALITE.prelevementsSociaux.cto,
  };
})();
const PLAFOND = ENVELOPPES_NOV2026.peaPlafondVersements;
const MAJ = ENRICH_EPPEA_PEA.maj;

export default function GuidePeaBanqueCourtier() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Article phare · Mis à jour {MAJ}</span>
          <h1>PEA en ligne ou en banque : comment choisir, frais comparés et mode d'emploi</h1>
          <p className="sub">
            Un PEA en ligne (courtier ou banque en ligne) coûte en général moins cher qu'un PEA en
            agence, pour un avantage fiscal strictement identique : plafond de{" "}
            {euros(PLAFOND)}, mêmes règles partout. Ce qui change d'un établissement à l'autre,
            c'est ce qu'il vous coûte — et ce qu'on y loge.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> un PEA ouvert en banque ou chez un courtier en ligne
              donne accès au même avantage fiscal et au même plafond légal — la loi ne fait aucune
              différence. Ce qui varie, c'est le coût : frais de tenue de compte et de courtage
              plafonnés par la loi Pacte, mais surtout frais des fonds logés dans le plan, qui
              peuvent aller de moins de {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} pour
              un ETF à plus de {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)}{" "}
              pour un fonds maison. Le courtier en ligne gagne presque toujours le match des coûts
              ; la banque, celui de l'accompagnement de proximité. Ce guide ajoute le mode
              d'emploi pour ouvrir et alimenter un PEA en ligne, un tableau des frais à comparer et
              le rôle du PEA dans la préparation de la retraite.
            </p>
          </div>
          <p>
            Ouvrir un PEA dans votre agence bancaire ou chez un courtier en ligne donne accès à
            exactement le même avantage fiscal. Beaucoup d'épargnants en concluent que le choix de
            l'établissement est un détail. Notre analyse : c'est presque l'inverse. L'enveloppe est
            identique partout, mais son coût de fonctionnement et surtout le coût des supports
            qu'on y place peuvent varier de quelques dixièmes de pour cent à plus de 2 % par an —
            et cet écart représente plus de dix mille euros dans notre exemple, davantage encore
            pour des versements supérieurs ou une durée plus longue. Voici comment
            lire les lignes de frais, ce que dit la loi, et un exemple chiffré pas à pas.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#definition">Le PEA en deux phrases</a></li>
              <li><a href="#frais">Les frais d'un PEA : ce que la loi encadre, ce qui reste variable</a></li>
              <li><a href="#exemple">{euros(EX.versement)} par mois pendant {EX.duree} ans : l'écart chiffré</a></li>
              <li><a href="#banque-ou-courtier">Banque ou courtier en ligne : le vrai match</a></li>
              <li><a href="#mode-emploi">PEA en ligne : mode d'emploi pour ouvrir et alimenter</a></li>
              <li><a href="#frais-comparer">Quels frais comparer avant d'ouvrir un PEA en ligne ?</a></li>
              <li><a href="#contenu">Ce que vous y mettez compte plus que l'endroit où vous l'ouvrez</a></li>
              <li><a href="#pea-retraite">PEA et retraite : sortie en capital, rente et fiscalité</a></li>
              <li><a href="#checklist">La check-list d'audit de votre PEA</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#retenir">Ce qu'il faut retenir</a></li>
            </ol>
          </div>

          <h2 id="definition">Le PEA en deux phrases</h2>
          <p>
            Le PEA (plan d'épargne en actions) est une enveloppe fiscale : un cadre juridique dans
            lequel vous achetez des actions européennes, en direct ou via des fonds éligibles, et
            où les gains ne sont pas imposés tant qu'ils restent à l'intérieur du plan. Passé le
            cinquième anniversaire ({FISCALITE.peaExonerationIRApres} ans), les retraits sont
            exonérés d'impôt sur le revenu sur les plus-values ; seuls les prélèvements sociaux
            (contributions prélevées sur les revenus du capital, {pct(FISCALITE.prelevementsSociaux.pea)}{" "}
            pour le PEA depuis la LFSS 2026, au barème en vigueur en {HYPOTHESES_MAJ}) restent dus
            sur les gains.
          </p>
          <p>
            Les versements sont plafonnés à {euros(PLAFOND)} par personne (plafond légal en vigueur en{" "}
            {ENVELOPPES_NOV2026.maj}, publié par l'
            <a
              href="https://www.amf-france.org/fr/espace-epargnants/comprendre-les-produits-financiers/les-enveloppes-fiscales-et-sociales/le-plan-depargne-en-actions-pea"
              target="_blank"
              rel="noopener noreferrer"
            >
              AMF
            </a>
            ), et ce plafond ne se recharge pas après un retrait : c'est ce qui fait du
            PEA une enveloppe de long terme, pertinente d'abord pour la retraite — nous détaillons
            cette logique dans notre page <a href="/strategies/pea-retraite">le PEA dans une
            optique retraite</a>. Le point essentiel de cet article tient en une phrase : la loi
            définit l'enveloppe, pas son prix. Le « produit » que vous achetez réellement, c'est ce
            que votre établissement met autour du cadre (ses frais) et dedans (ses supports).
          </p>

          <h2 id="frais">Les frais d'un PEA : ce que la loi encadre, ce qui reste variable</h2>
          <h3>Les frais plafonnés depuis la loi Pacte</h3>
          <p>
            Trois familles de frais rythment la vie d'un PEA : les frais de tenue de compte et
            droits de garde (facturés pour la conservation de vos titres), les frais de courtage
            (prélevés à chaque ordre d'achat ou de vente en bourse) et les frais de transfert.
            Depuis un{" "}
            <a
              href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000041660867/"
              target="_blank"
              rel="noopener noreferrer"
            >
              décret d'application de la loi Pacte
            </a>{" "}
            entré en vigueur en 2020, ils sont
            plafonnés — sous réserve des barèmes en vigueur en {MAJ}, à vérifier auprès de
            votre établissement : environ {euros(ENRICH_EPPEA_PEA.fraisOuvertureMax)} pour
            l'ouverture, {pct(ENRICH_EPPEA_PEA.fraisTenueCompteMaxPct)} par an de la valeur du plan
            pour la tenue de compte et les droits de garde (plus un petit forfait par ligne
            détenue), {pct(ENRICH_EPPEA_PEA.fraisOrdreEnLignePct)} du montant par ordre passé en
            ligne ({pct(ENRICH_EPPEA_PEA.fraisOrdreAutreCanalPct)} par un autre canal), et{" "}
            {euros(ENVELOPPES_NOV2026.peaFraisTransfertMax.parLigne)} par ligne transférée dans la
            limite de {euros(ENVELOPPES_NOV2026.peaFraisTransfertMax.total)} au total. Ces plafonds ont assaini
            les excès historiques — mais un plan peut rester nettement plus cher qu'un autre tout
            en respectant la loi.
          </p>
          <h3>Le coût des supports : là où tout se joue</h3>
          <p>
            Le vrai poste de coût est ailleurs, et il n'apparaît sur aucun relevé bancaire : ce
            sont les frais courants des fonds logés dans le plan, prélevés chaque année à
            l'intérieur du fonds lui-même. Les fonds actions « maison » (gérés par la société de
            gestion du groupe bancaire, souvent proposés par défaut) affichent des frais courants
            constatés de l'ordre de {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)} par an. Un ETF (fonds
            indiciel coté : un fonds qui se contente de répliquer un indice boursier, comme le CAC
            40 ou le STOXX Europe 600) éligible au PEA coûte de l'ordre de{" "}
            {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} à{" "}
            {pct(FRAIS_TYPES.contratInternet.fraisSupports.max)} par an — ordres de grandeur
            constatés sur les grilles publiques, révisés en {HYPOTHESES_MAJ}, à vérifier fonds par
            fonds dans le DIC (document d'informations clés).
          </p>
          <p>
            Notre analyse, en deux temps. Le discours anti-frais très répandu sur les réseaux a
            raison sur l'arithmétique : à rendement brut identique, un écart de 3 points de frais
            annuels réduit le capital final d'environ 50 % au bout de 25 ans, mais ce résultat ne
            vaut que dans un cas précis — un versement initial unique, sans apport ultérieur, avec
            un rendement brut constant chaque année (aucune trajectoire réelle n'est linéaire).
            Exemple de calcul : à {pct(RENDEMENTS.ucActionsLongTerme.moyen)} brut par an, un
            capital initial croît d'un facteur{" "}
            {Math.round(Math.pow(1 + RENDEMENTS.ucActionsLongTerme.moyen / 100, 25) * 10) / 10}{" "}
            sur 25 ans ; au même rendement brut diminué de 3 points de frais, il ne croît plus que
            d'un facteur{" "}
            {Math.round(Math.pow(1 + (RENDEMENTS.ucActionsLongTerme.moyen - 3) / 100, 25) * 10) /
              10}
            , soit environ la moitié. Sur des versements réguliers (le cas le plus fréquent),
            l'effet est réel mais moindre, car chaque versement n'est exposé aux frais que sur sa
            propre durée restante — c'est précisément ce que simule l'outil ci-dessous avec vos
            propres montants et durée, plutôt que sur un cas type. En revanche, faire du niveau de
            frais l'unique critère est l'erreur symétrique : la
            seule variable qui compte est la performance nette de frais et de fiscalité. Il existe
            des fonds de conviction (fonds gérés activement, dont le portefeuille s'écarte
            volontairement de l'indice) chargés à près de 2 % qui ont historiquement battu leur
            indice net de frais — rares, mais documentés, et il s'agit d'un constat passé, qui ne
            préjuge en rien de leurs performances futures —, et un support bon marché mal choisi
            coûte plus cher qu'il n'économise. Ce que notre analyse condamne sans nuance, c'est le
            cas le plus fréquent : environ 2 % par an pour une gestion qui suit peu ou prou son
            indice, sans aucun conseil en face. C'est régler l'addition d'un menu gastronomique
            pour un plat réchauffé au micro-ondes : l'étiquette promet un savoir-faire, l'assiette
            raconte autre chose.
          </p>

          <h2 id="exemple">{euros(EX.versement)} par mois pendant {EX.duree} ans : l'écart chiffré, pas à pas</h2>
          <p>Posons le calcul avec des hypothèses explicites, purement illustratives :</p>
          <ul>
            <li>
              versement de {euros(EX.versement)} par mois pendant {EX.duree} ans, soit{" "}
              {euros(EX.versements)} versés au total ;
            </li>
            <li>
              même indice sous-jacent dans les deux cas, avec un rendement brut hypothétique de{" "}
              {pct(EX.brut)} par an ({RENDEMENTS.ucActionsLongTerme.periode} des grands indices
              actions mondiaux, type MSCI World, dividendes réinvestis, avant frais — les performances passées ne
              préjugent pas des performances futures, et aucune trajectoire réelle n'est linéaire) ;
            </li>
            <li>
              une seule différence : {pct(EX.fraisMaison)} de frais annuels de support (fonds
              maison) contre {pct(EX.fraisEtf)} (ETF indiciel).
            </li>
          </ul>
          <p>
            À {pct(EX.fraisMaison)} de frais, le rendement net tombe à {pct(EX.brut - EX.fraisMaison)}{" "}
            par an : le plan atteindrait environ {euros(EX.capMaison)}, dont {euros(EX.gainsMaison)}{" "}
            de gains. À {pct(EX.fraisEtf)} de frais, le rendement net ressort à{" "}
            {pct(EX.brut - EX.fraisEtf)} : environ {euros(EX.capEtf)}, dont {euros(EX.gainsEtf)} de
            gains. L'écart final approche {euros(EX.ecart)}, soit environ {EX.ecartPct} % de la
            totalité des sommes versées — pour le même indice, le même effort d'épargne, la même
            enveloppe. Autrement dit, les gains sont environ une fois et demie plus élevés dans le
            second scénario. Montants bruts, avant prélèvements sociaux au retrait ; un PEA est
            investi en actions et le capital n'est pas garanti : il fluctue à la hausse comme à la
            baisse, et peut être en perte au moment où vous avez besoin des fonds.
          </p>
          <SimulateurCapitalisation enveloppe="pea" />

          <h2 id="banque-ou-courtier">Banque ou courtier en ligne : le vrai match</h2>
          <p>
            Rappelons l'essentiel : l'avantage fiscal est rigoureusement le même partout. Ce qui
            diffère, c'est le modèle. La banque traditionnelle offre un interlocuteur physique et
            la simplicité de tout centraliser, mais son catalogue oriente naturellement vers les
            fonds du groupe et ses frais de fonctionnement se situent historiquement en haut des
            plafonds. Le courtier en ligne casse les coûts et ouvre un large accès aux ETF, mais en
            libre-service intégral : personne ne vous rappellera qu'un ordre passé dans la panique
            d'une baisse de 30 % peut ruiner quinze ans de discipline.
          </p>
          <p>
            Notre analyse suit sa structure habituelle : concession d'abord. Sur le seul terrain
            des frais, le courtier en ligne gagne le match, souvent nettement — le nier serait
            malhonnête. Deux nuances ensuite. La première : la « gratuité » mise en avant par
            certaines plateformes récentes est un argument marketing, pas une réalité économique.
            Ces acteurs se rémunèrent autrement — écart entre prix d'achat et prix de vente (le
            spread), frais de change sur les titres cotés en devise étrangère, services annexes
            facturés à l'acte. Un tarif bas, lisible et affiché vaut mieux qu'un « zéro frais »
            opaque. La seconde : le libre-service, c'est la logique de la station-service —
            moins cher au litre, mais personne ne vérifie votre niveau d'huile : l'économie est
            réelle, le service en moins aussi. Sélection des supports, discipline dans les baisses, sécurisation progressive à
            l'approche de la retraite : si personne ne s'en charge, ce n'est pas économisé, c'est
            simplement non fait. La vraie question n'est donc pas « qui est le moins cher ? » mais
            « suis-je prêt à faire seul ce travail, durablement ? ». Il n'y a pas de bonne réponse
            universelle — cela s'évalue au cas par cas.
          </p>
          <div className="note">
            Bon à savoir : un PEA se transfère d'un établissement à l'autre en conservant son
            antériorité fiscale — la date d'ouverture du plan, qui commande le délai de cinq ans,
            est préservée. Les frais de transfert sont plafonnés par la loi Pacte (de l'ordre de{" "}
            {euros(ENVELOPPES_NOV2026.peaFraisTransfertMax.parLigne)} par ligne,{" "}
            {euros(ENVELOPPES_NOV2026.peaFraisTransfertMax.total)} au maximum — barème en vigueur en{" "}
            {MAJ}, à vérifier).
            Ne clôturez jamais un PEA pour en rouvrir un ailleurs : la clôture remet le compteur
            fiscal à zéro. Prévoyez en revanche un délai de plusieurs semaines, pendant lequel les
            arbitrages — les ventes et achats de supports à l'intérieur du plan — sont
            généralement gelés.
          </div>

          <h2 id="mode-emploi">PEA en ligne : mode d'emploi pour ouvrir et alimenter</h2>
          <p>
            Ouvrir un PEA en ligne se fait en quelques étapes, sans passer en agence. Voici l'ordre
            logique, avec ce qu'il faut vérifier à chaque étape.
          </p>
          <ol>
            <li>
              <strong>Vérifier que vous pouvez ouvrir un PEA.</strong> Il faut être majeur (
              {ENVELOPPES_NOV2026.peaAgeMinimumOuverture} ans minimum), fiscalement domicilié en
              France, et ne détenir qu'un seul PEA : un deuxième PEA classique est interdit. Un
              PEA-PME peut s'y ajouter, dans la limite d'un plafond cumulé de{" "}
              {euros(ENVELOPPES_NOV2026.peaPmePlafondCumule)} pour les deux plans.
            </li>
            <li>
              <strong>Comparer les établissements.</strong> Relevez les frais d'ouverture, de tenue
              de compte, de courtage et de transfert (tableau ci-dessous), la gamme d'ETF éligibles
              et la qualité de l'application. Le tarif doit être publié et lisible.
            </li>
            <li>
              <strong>Constituer le dossier en ligne.</strong> Pièce d'identité, justificatif de
              domicile, avis d'imposition et IBAN d'un compte à votre nom ; l'établissement
              vérifie votre identité et vous fait signer la convention en ligne. Gardez une copie
              de la convention et de la grille tarifaire.
            </li>
            <li>
              <strong>Effectuer le premier versement.</strong> Le PEA doit être alimenté par un
              virement depuis un compte à votre nom ; la date de ce premier versement fixe
              l'ouverture du plan, donc le point de départ du délai de{" "}
              {FISCALITE.peaExonerationIRApres} ans. Rien n'oblige à verser un montant élevé : un
              versement modeste suffit pour démarrer le compteur.
            </li>
            <li>
              <strong>Mettre en place des versements réguliers.</strong> Un virement permanent
              mensuel automatise l'effort ; les versements peuvent être libres, dans la limite du
              plafond de {euros(PLAFOND)} de versements cumulés. Les retraits ne rechargent pas ce
              plafond.
            </li>
            <li>
              <strong>Choisir les supports et passer les ordres.</strong> Les liquidités d'un PEA ne
              produisent rien tant qu'elles ne sont pas investies : une fois le plan alimenté, il
              reste à acheter les ETF ou titres choisis. Vérifiez dans le DIC les frais courants et
              l'éligibilité au PEA de chaque fonds.
            </li>
            <li>
              <strong>Suivre le plan chaque année.</strong> Relisez le récapitulatif annuel des
              frais, vérifiez que l'allocation correspond toujours à votre horizon, et ne retirez pas
              avant le délai de {FISCALITE.peaExonerationIRApres} ans sans en mesurer les
              conséquences fiscales.
            </li>
          </ol>
          <p>
            Pour comparer plus en détail les offres en ligne dans une optique retraite, voyez notre
            guide{" "}
            <a href="/guide/pea-en-ligne-comment-choisir-pour-la-retraite">
              PEA en ligne : comment choisir pour la retraite
            </a>
            .
          </p>

          <h2 id="frais-comparer">Quels frais comparer avant d'ouvrir un PEA en ligne ?</h2>
          <p>
            Ce tableau liste les postes de coût à comparer d'un établissement à l'autre, avec les
            plafonds légaux quand ils existent et les ordres de grandeur constatés sinon. Ce sont
            des repères révisés en {MAJ}, à vérifier sur la grille tarifaire de chaque
            établissement.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Poste de frais</th>
                  <th>Repère</th>
                  <th>Où le trouver</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ouverture du plan</td>
                  <td>Plafonné, de l'ordre de {euros(ENRICH_EPPEA_PEA.fraisOuvertureMax)}</td>
                  <td>Grille tarifaire</td>
                </tr>
                <tr>
                  <td>Tenue de compte et droits de garde</td>
                  <td>Plafonné à {pct(ENRICH_EPPEA_PEA.fraisTenueCompteMaxPct)} par an de la valeur du plan</td>
                  <td>Grille tarifaire, récapitulatif annuel</td>
                </tr>
                <tr>
                  <td>Courtage par ordre</td>
                  <td>
                    Plafonné à {pct(ENRICH_EPPEA_PEA.fraisOrdreEnLignePct)} du montant en ligne,{" "}
                    {pct(ENRICH_EPPEA_PEA.fraisOrdreAutreCanalPct)} autre canal
                  </td>
                  <td>Grille tarifaire (comparer les minimums par ordre)</td>
                </tr>
                <tr>
                  <td>Transfert vers un autre établissement</td>
                  <td>
                    {euros(ENVELOPPES_NOV2026.peaFraisTransfertMax.parLigne)} par ligne,{" "}
                    {euros(ENVELOPPES_NOV2026.peaFraisTransfertMax.total)} au plus
                  </td>
                  <td>Grille tarifaire, avant d'ouvrir</td>
                </tr>
                <tr>
                  <td>ETF éligible</td>
                  <td>
                    {pct(FRAIS_TYPES.etf.fraisCourants.min)} à {pct(FRAIS_TYPES.etf.fraisCourants.max)}{" "}
                    par an
                  </td>
                  <td>DIC du fonds (frais courants)</td>
                </tr>
                <tr>
                  <td>Fonds actions de gestion active</td>
                  <td>
                    {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.min)} à{" "}
                    {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.max)} par an
                  </td>
                  <td>DIC du fonds (frais courants)</td>
                </tr>
                <tr>
                  <td>Gestion sous mandat</td>
                  <td>
                    Surcoût de {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à{" "}
                    {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)} par an
                  </td>
                  <td>Convention de mandat</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Pour juger du poids relatif de ces frais, voyez aussi notre analyse{" "}
            <a href="/guide/etf-ou-fonds-actifs">ETF ou fonds actifs</a> et les limites de
            l'enveloppe dans <a href="/guide/inconvenients-du-pea">les inconvénients du PEA</a>.
          </p>

          <h2 id="contenu">Ce que vous y mettez compte plus que l'endroit où vous l'ouvrez</h2>
          <p>
            Le choix de l'établissement optimise le contenant. La performance, elle, viendra du
            contenu — l'allocation, c'est-à-dire la répartition de votre épargne entre les
            supports — et de votre comportement dans la durée. Une architecture fréquente et
            robuste consiste à bâtir un cœur de portefeuille en ETF largement diversifié, complété
            le cas échéant par une poche « satellite » plus ciblée (fonds de conviction, titres en
            direct) selon votre profil et le temps que vous pouvez y consacrer. Notre analyse
            invite toutefois à ne pas confondre ETF et absence de réflexion : un fonds indiciel
            achète tout son indice, les réussites comme les entreprises en déclin, et le choix de
            l'indice répliqué reste la décision la plus structurante. Un point de vigilance
            spécifique au PEA : les ETF dits synthétiques, qui répliquent un indice mondial ou
            américain via un contrat d'échange avec une banque plutôt qu'en détenant les titres,
            rendent ces indices accessibles dans le plan — mais ils reposent sur une tolérance
            réglementaire qui pourrait évoluer. Bâtir toute sa stratégie sur ce mécanisme expose à
            devoir la défaire au mauvais moment. Enfin, la gestion sous mandat proposée sur
            certains PEA (vous déléguez les décisions à l'établissement, moyennant un surcoût
            annuel de l'ordre de {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à{" "}
            {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)}, qui s'ajoute aux frais des fonds) cumule
            des couches de frais que notre analyse juge rarement justifiées au regard du service
            rendu.
          </p>
          <p>
            Pour cadrer les attentes : les grands indices actions mondiaux (type MSCI World,
            dividendes réinvestis) ont dégagé des{" "}
            {RENDEMENTS.ucActionsLongTerme.periode} de l'ordre de{" "}
            {pct(RENDEMENTS.ucActionsLongTerme.min)} à {pct(RENDEMENTS.ucActionsLongTerme.max)} par
            an (avant frais et fiscalité — constat passé, révisé en{" "}
            {HYPOTHESES_MAJ}). Ces moyennes masquent de fortes variations annuelles, années
            négatives comprises : le niveau de risque est élevé, le capital n'est jamais garanti,
            et les performances passées ne préjugent pas des performances futures. La place du PEA
            dans votre stratégie d'ensemble — et ce qu'il doit contenir compte tenu de vos autres
            enveloppes — se raisonne globalement : voyez notre page{" "}
            <a href="/strategies/pea-retraite">PEA et retraite</a>, et pour la même grille de
            lecture appliquée à l'assurance-vie,{" "}
            <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">pourquoi votre
            assurance-vie rapporte si peu</a>.
          </p>
          <table>
            <thead>
              <tr>
                <th>Support logeable dans un PEA</th>
                <th>Frais annuels constatés</th>
                <th>Points de vigilance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Actions européennes en direct</td>
                <td>Pas de frais de support (courtage à chaque ordre)</td>
                <td>Concentration du risque, temps et compétence exigés ; dividendes de sociétés à siège étranger amputés d'une retenue à la source</td>
              </tr>
              <tr>
                <td>Fonds actions « maison »</td>
                <td>
                  {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min)} à{" "}
                  {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)}
                </td>
                <td>Comparer la performance nette de frais à celle de l'indice de référence, sur longue durée</td>
              </tr>
              <tr>
                <td>ETF éligibles (fonds indiciels)</td>
                <td>
                  {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} à{" "}
                  {pct(FRAIS_TYPES.contratInternet.fraisSupports.max)}
                </td>
                <td>Choix de l'indice déterminant ; réplication synthétique = dépendance à une tolérance réglementaire</td>
              </tr>
              <tr>
                <td>Gestion sous mandat</td>
                <td>
                  Surcoût de {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à{" "}
                  {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)} + frais des fonds sous-jacents
                </td>
                <td>Cumul de couches de frais ; rigidité des profils packagés</td>
              </tr>
            </tbody>
          </table>
          <p>
            Fourchettes de frais : ordres de grandeur constatés sur les grilles publiques, révisés
            en {HYPOTHESES_MAJ}, à vérifier support par support. Dans tous les cas, capital investi
            en actions, non garanti.
          </p>

          <h2 id="pea-retraite">PEA et retraite : sortie en capital, rente et fiscalité</h2>
          <p>
            Le PEA se prête à la préparation de la retraite parce qu'au-delà de{" "}
            {FISCALITE.peaExonerationIRApres} ans, les gains ne supportent plus d'impôt sur le
            revenu : il reste les prélèvements sociaux, à {pct(FISCALITE.prelevementsSociaux.pea)}{" "}
            en {HYPOTHESES_MAJ} depuis la LFSS 2026 (taux à vérifier selon la date d'acquisition des
            gains). Deux modes de sortie existent après ce délai : des retraits partiels, qui ne
            ferment pas le plan et laissent la possibilité de continuer à le faire fructifier, ou
            une rente viagère, issue de la conversion du capital et exonérée d'impôt sur le revenu
            (régime social de la rente à vérifier). Le plafond de {euros(PLAFOND)} de versements ne
            limite que ce que vous y versez, pas la valeur que le plan peut atteindre.
          </p>
          <p>
            Exemple illustratif, hors cas réel : un PEA de plus de {FISCALITE.peaExonerationIRApres}{" "}
            ans, valant {euros(PR.capital)} pour {euros(PR.versements)} versés (donc{" "}
            {euros(PR.gains)} de gains), retiré en totalité. Ce plan ne supporte que{" "}
            {pct(FISCALITE.prelevementsSociaux.pea)} de prélèvements sociaux sur les gains, soit{" "}
            {euros(PR.psPea)}, pour un net de {euros(PR.netPea)}. Les mêmes gains sur un
            compte-titres ordinaire supporteraient le prélèvement forfaitaire unique de{" "}
            {pct(PR.pfuTotal)} (impôt et prélèvements sociaux), soit {euros(PR.pfuCto)}, pour un net de{" "}
            {euros(PR.netCto)}.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Sortie à partir de {FISCALITE.peaExonerationIRApres} ans</th>
                  <th>PEA</th>
                  <th>Compte-titres ordinaire</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gains imposables ({euros(PR.capital)} − {euros(PR.versements)})</td>
                  <td>{euros(PR.gains)}</td>
                  <td>{euros(PR.gains)}</td>
                </tr>
                <tr>
                  <td>Impôt sur le revenu</td>
                  <td>Exonéré</td>
                  <td>{pct(FISCALITE.pfuIR)} (PFU)</td>
                </tr>
                <tr>
                  <td>Prélèvements sociaux</td>
                  <td>{pct(FISCALITE.prelevementsSociaux.pea)}</td>
                  <td>{pct(FISCALITE.prelevementsSociaux.cto)}</td>
                </tr>
                <tr>
                  <td>Total prélevé</td>
                  <td>{euros(PR.psPea)}</td>
                  <td>{euros(PR.pfuCto)}</td>
                </tr>
                <tr>
                  <td>Net perçu</td>
                  <td>{euros(PR.netPea)}</td>
                  <td>{euros(PR.netCto)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Écart de {euros(PR.economie)} dans cet exemple. Un PEA investi en actions n'offre aucune
            garantie de capital, et l'hypothèse de plus-value est illustrative. Pour situer le PEA
            face aux autres enveloppes, voyez{" "}
            <a href="/guide/pea-ou-per-pour-la-retraite">PEA ou PER pour la retraite</a>,{" "}
            <a href="/guide/pea-ou-assurance-vie">PEA ou assurance-vie</a> et{" "}
            <a href="/guide/meilleure-enveloppe-retraite">la meilleure enveloppe retraite</a> ; pour
            chiffrer l'objectif, le <a href="/simulateur-retraite">simulateur de retraite</a> ou un{" "}
            <a href="/bilan-retraite">bilan retraite</a>. Le détail stratégique est dans{" "}
            <a href="/strategies/pea-retraite">PEA et retraite</a>.
          </p>

          <h2 id="checklist">La check-list d'audit de votre PEA</h2>
          <p>Une heure suffit, relevés en main :</p>
          <ol>
            <li>
              <strong>Sortez le récapitulatif annuel des frais.</strong> Votre établissement a
              l'obligation réglementaire (issue des règles européennes d'information des
              investisseurs) de vous adresser chaque année le total des frais prélevés, en euros.
              C'est le document le plus honnête de votre dossier — commencez par lui.
            </li>
            <li>
              <strong>Listez vos lignes.</strong> Actions en direct, fonds, ETF : identifiez qui
              gère chaque fonds. Une majorité de fonds du groupe bancaire mérite un examen serré.
            </li>
            <li>
              <strong>Lisez les « frais courants » dans le DIC de chaque fonds.</strong> C'est là,
              et non sur votre relevé, que se cache le principal poste de coût.
            </li>
            <li>
              <strong>Regardez l'activité du compte.</strong> Des ordres fréquents empilent du
              courtage ; à l'inverse, des liquidités durablement non investies ne produisent rien
              dans une enveloppe conçue pour capitaliser.
            </li>
            <li>
              <strong>Additionnez le tout</strong> (tenue de compte + courtage annuel + frais
              courants pondérés par ligne) et rapportez-le à la valeur du plan. Si les frais
              cumulés de votre plan se rapprochent des niveaux bancaires décrits plus haut sans
              aucun service identifiable en contrepartie, la question du transfert mérite d'être
              posée — notre grille de lecture tient en une question : à quel service,
              concrètement, ces frais correspondent-ils ?
            </li>
          </ol>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Quel est le plafond de versements d'un PEA ?</h3>
          <p>
            {euros(PLAFOND)} pour le PEA classique, et {euros(ENVELOPPES_NOV2026.peaPmePlafondCumule)}{" "}
            pour l'ensemble PEA et PEA-PME (plafonds légaux à vérifier, révisés en {MAJ}). Le
            plafond porte sur les versements cumulés et ne se recharge pas après un retrait.
          </p>
          <h3>Comment ouvrir un PEA en ligne, et en combien de temps ?</h3>
          <p>
            Il faut être majeur, fournir ses pièces justificatives et signer la convention en
            ligne ; le délai dépend de l'établissement. Le plan est réellement ouvert à la date du
            premier versement. Voir le mode d'emploi plus haut dans cette page.
          </p>
          <h3>Peut-on retirer de l'argent d'un PEA après {FISCALITE.peaExonerationIRApres} ans sans le fermer ?</h3>
          <p>
            Oui : passé ce délai, des retraits partiels sont possibles sans clôturer le plan, et
            les gains retirés ne supportent plus que les prélèvements sociaux
            ({pct(FISCALITE.prelevementsSociaux.pea)} en {HYPOTHESES_MAJ}, à vérifier selon la date
            d'acquisition des gains).
          </p>
          <h3>Un PEA peut-il servir à se constituer une rente à la retraite ?</h3>
          <p>
            Oui, par conversion du capital en rente viagère après le délai de{" "}
            {FISCALITE.peaExonerationIRApres} ans. La rente est exonérée d'impôt sur le revenu ;
            son régime social et les conditions de conversion dépendent de l'établissement, à
            vérifier avant de choisir cette option. Le capital peut aussi être retiré par étapes.
          </p>
          <h3>PEA ou PER : lequel pour préparer sa retraite ?</h3>
          <p>
            Le PER offre un avantage fiscal à l'entrée mais bloque l'épargne jusqu'à la retraite ;
            le PEA est plus souple et son avantage se trouve à la sortie. Tout dépend de votre
            tranche d'imposition et de votre besoin de liquidité : voir{" "}
            <a href="/guide/pea-ou-per-pour-la-retraite">PEA ou PER pour la retraite</a>.
          </p>
          <h3>Un PEA en ligne est-il sûr ?</h3>
          <p>
            Vérifiez que l'établissement est agréé en France ; vos titres sont conservés
            séparément de son patrimoine. En revanche, le contenu du PEA reste exposé aux marchés
            actions : le capital n'est pas garanti, quel que soit l'établissement.
          </p>
          <h3>Peut-on ouvrir un PEA à la fois en banque et chez un courtier en ligne ?</h3>
          <p>
            Non : un même contribuable ne peut détenir qu'un seul PEA (et, le cas échéant, un PEA-PME
            en complément). Il faut donc choisir un établissement, quitte à en changer plus tard
            par un transfert conservant l'antériorité fiscale.
          </p>
          <h3>Le PEA en ligne est-il vraiment gratuit ?</h3>
          <p>
            Rarement totalement. Un tarif affiché à 0 € se rémunère généralement ailleurs — écart
            entre prix d'achat et de vente, frais de change sur les titres en devise étrangère, ou
            services annexes facturés à l'acte. Un tarif bas et lisible vaut mieux qu'un « gratuit »
            opaque.
          </p>
          <h3>Que se passe-t-il si je retire de l'argent avant 5 ans ?</h3>
          <p>
            Un retrait avant le cinquième anniversaire du plan entraîne, sauf exception légale
            (comme la création d'entreprise), la clôture du PEA et la perte de l'antériorité
            fiscale acquise.
          </p>
          <h3>Puis-je transférer mon PEA sans perdre son ancienneté ?</h3>
          <p>
            Oui : le transfert d'un établissement à l'autre conserve la date d'ouverture initiale,
            qui commande le délai de cinq ans. Seuls des frais de transfert plafonnés par la loi
            Pacte s'appliquent.
          </p>
          <h3>Dois-je choisir uniquement des ETF pour mon PEA ?</h3>
          <p>
            Ce n'est pas une obligation, mais les ETF (fonds indiciels à bas coût) constituent
            souvent un socle robuste et peu coûteux. Une poche satellite en fonds de conviction ou
            titres en direct peut compléter ce socle selon votre profil et le temps que vous
            pouvez y consacrer.
          </p>
          <h3>La gestion sous mandat sur un PEA vaut-elle le coût qu'elle facture ?</h3>
          <p>
            Cela dépend du service réellement rendu derrière le surcoût annuel facturé. Notre
            analyse invite à vérifier ce que cette délégation apporte concrètement — allocation
            réellement suivie et ajustée dans le temps — plutôt que de la retenir par défaut.
          </p>

          <h2 id="retenir">Ce qu'il faut retenir</h2>
          <p>
            Le PEA est la même enveloppe fiscale partout — mais pas le même produit. Les frais de
            fonctionnement sont désormais plafonnés par la loi ; le coût des supports, lui, reste
            libre et peut varier de {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} à plus de{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)} par an, avec un impact
            de plus de dix mille euros dans notre exemple — davantage encore pour des versements
            supérieurs ou une durée plus longue. Le courtier en ligne
            gagne le match des coûts, la banque celui de l'accompagnement de proximité — et aucun
            des deux ne répond à la seule question qui crée la performance : que mettre dans le
            plan, et comment s'y tenir. Un PEA existant ne se clôture pas, il s'audite — et, le
            cas échéant, se transfère en conservant son antériorité fiscale.
          </p>
          <div className="note">
            Cette analyse est générale et ne constitue pas un conseil en investissement
            personnalisé ; chaque situation doit faire l'objet d'une étude individuelle. Un PEA est
            investi en actions : le capital n'est pas garanti et sa valeur fluctue à la hausse
            comme à la baisse. Les chiffres cités sont des constats passés ou des hypothèses
            illustratives, datés et révisés en {HYPOTHESES_MAJ} ; les performances passées ne
            préjugent pas des performances futures.
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Un doute sur ce que votre PEA vous coûte vraiment ? Apportez votre récapitulatif de frais au bilan retraite gratuit."
        button="Prendre rendez-vous"
      />
    </>
  );
}
