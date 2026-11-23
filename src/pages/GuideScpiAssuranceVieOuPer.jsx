import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  IMMO,
  IMMO_EXEMPLES,
  FISCALITE,
  AV_RACHAT,
  FRAIS_TYPES,
  TRANSMISSION,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const E = IMMO_EXEMPLES.scpiAvDirect;
const M = IMMO.scpiMarche;
const F = IMMO.scpiFiscalite;

const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + " %";
const ANNEES = 10; // horizon de lecture des frais cumulés (années), sans projection de rendement

// ---- Frais de gestion du contrat : base supposée constante, aucun rendement projeté ----
const fraisAnnuels = (montant, tauxPct) => (montant * tauxPct) / 100;
const fraisCumules = (montant, tauxPct, annees) => fraisAnnuels(montant, tauxPct) * annees;
const distributionAnnuelle = (montant, tauxPct) => (montant * tauxPct) / 100;
const partDistribution = (montant, tauxDistribution, tauxFrais) =>
  (fraisAnnuels(montant, tauxFrais) / distributionAnnuelle(montant, tauxDistribution)) * 100;

// Taux de frais de gestion de contrat servant de grille de lecture.
const grilleFrais = [
  { libelle: "Bas de la fourchette d'un contrat en ligne", taux: FRAIS_TYPES.contratInternet.gestionAnnuelle.min },
  { libelle: "Hypothèse de l'exemple (haut de la fourchette d'un contrat en ligne)", taux: E.fraisGestionContratAnnuel },
  { libelle: "Haut de la fourchette d'un contrat bancaire traditionnel", taux: FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max },
];

// ---- Contraste fiscalité courante : détention directe, sur la distribution brute supposée ----
const tauxMarginalDirect = E.tmi + FISCALITE.prelevementsSociaux.immobilier;
const prelevementDirect = (montant, tauxDistribution) =>
  (distributionAnnuelle(montant, tauxDistribution) * tauxMarginalDirect) / 100;

const sources = [
  {
    label:
      "Légifrance — Décret n° 2026-341 du 30 avril 2026 renforçant l'encadrement de l'univers d'investissement de l'assurance vie et du plan d'épargne retraite (JORF du 5 mai 2026)",
    url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054027062",
  },
  {
    label: "Légifrance — Code des assurances, article R131-1 (actifs pouvant servir d'unités de compte)",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000043560691",
  },
  {
    label: "Légifrance — Code des assurances, article R131-4 (substitution d'une unité de compte)",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054031126",
  },
  {
    label:
      "BOFiP — BOI-PAT-IFI-20-20-30-30 : IFI, contrats d'assurance-vie et de capitalisation en unités de compte (version du 8 juin 2018)",
    url: "https://bofip.impots.gouv.fr/bofip/11314-PGP.html/identifiant=BOI-PAT-IFI-20-20-30-30-20180608",
  },
  {
    label: "Service-Public.gouv.fr — Assurance-vie : imposition des rachats, fiche F22414",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22414",
  },
  {
    label: "Impots.gouv.fr — Calcul de l'IFI (seuils et barème)",
    url: "https://www.impots.gouv.fr/particulier/calcul-de-lifi",
  },
  {
    label: "AMF — Investir dans une SCPI (2023)",
    url: "https://www.amf-france.org/sites/institutionnel/files/private/2023-12/2023_investir_dans_une_scpi.pdf",
  },
  {
    label: "ASPIM — Communiqué du 1er semestre 2026",
    url: "https://www.aspim.fr/content/uploads/2026/08/ASPIM_CP-1S-2026_V7-def.pdf",
  },
];

export default function GuideScpiAssuranceVieOuPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Comparaison · immobilier et enveloppes</span>
          <h1>SCPI en direct, en assurance-vie ou dans un PER : quelle différence ?</h1>
          <p className="sub">
            Une même SCPI, trois manières de la détenir, et des conséquences très différentes sur
            les frais, l'impôt, la liquidité et la transmission. Mis à jour le {IMMO.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> détenir des parts de SCPI dans un contrat
              d'assurance-vie ou un PER ne change pas ce que la SCPI possède, mais change presque
              tout le reste. En direct, vous touchez des loyers imposés en revenus fonciers. En
              contrat, les revenus sont en principe réinvestis dans le contrat et l'impôt
              n'intervient qu'à la sortie, mais des frais de contrat s'ajoutent. Dans un PER, les
              sommes restent bloquées jusqu'à la retraite, sauf cas de déblocage prévus par la
              loi. Les parts de SCPI ne sont pas garanties : le capital peut baisser, les revenus
              ne sont pas assurés et les parts peuvent être difficiles à revendre.
            </p>
          </div>

          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel :
            Michel, 57 ans, a mis de côté {euros(E.montant)} qu'il aimerait placer en SCPI. Son
            conseiller en agence lui dit « on peut le faire via votre assurance-vie », un site en
            ligne lui parle d'un PER, un ami lui recommande les parts en direct. Les trois
            solutions détiennent le même type d'immeubles. Pourquoi les comparer ?
          </p>
          <p>
            Parce que l'enveloppe décide de ce qui est imposé et quand, de ce que coûte
            l'opération chaque année, de la façon dont on récupère son argent et de ce que
            deviennent les parts au décès. Cet article compare ces trois cadres. Il ne détaille pas
            le fonctionnement d'une SCPI : pour cela, voir notre{" "}
            <a href="/strategies/immobilier-retraite">stratégie immobilier et retraite</a>, notre
            guide sur{" "}
            <a href="/guide/scpi-preparer-sa-retraite">les SCPI pour préparer sa retraite</a> et
            celui sur{" "}
            <a href="/guide/scpi-fiscalite-revenus-plus-values">la fiscalité des SCPI en détention directe</a>.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#trois-facons">Quelles sont les trois façons de détenir une SCPI ?</a></li>
              <li><a href="#comment">Comment une SCPI entre-t-elle dans un contrat d'assurance-vie ou un PER ?</a></li>
              <li><a href="#frais">Combien coûtent les frais supplémentaires du contrat ?</a></li>
              <li><a href="#fiscalite">Que change l'enveloppe pour l'impôt courant ?</a></li>
              <li><a href="#liquidite">Peut-on récupérer son argent plus facilement ?</a></li>
              <li><a href="#transmission-ifi">Et pour la transmission et l'IFI ?</a></li>
              <li><a href="#per">Pourquoi le PER est-il un cas à part ?</a></li>
              <li><a href="#questions">Quelles questions poser avant de choisir ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="trois-facons">Quelles sont les trois façons de détenir une SCPI ?</h2>
          <p>
            Une SCPI (société civile de placement immobilier) collecte l'argent de nombreux
            épargnants pour acheter et louer des immeubles. Vous pouvez détenir ses parts de trois
            façons principales, plus une quatrième, la détention par une société, qui relève d'un
            montage à faire examiner par un professionnel.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>En direct</th>
                  <th>En unité de compte d'assurance-vie</th>
                  <th>Dans un PER</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Qui détient les parts</td>
                  <td>Vous, associé de la SCPI</td>
                  <td>En pratique l'assureur ; vous détenez des unités de compte du contrat</td>
                  <td>En pratique le gestionnaire du plan, selon le même principe d'unités de compte</td>
                </tr>
                <tr>
                  <td>Revenus courants</td>
                  <td>Versés, imposés en revenus fonciers (barème + prélèvements sociaux de {pct1(FISCALITE.prelevementsSociaux.immobilier)})</td>
                  <td>En principe capitalisés dans le contrat, selon le contrat ; pas de revenu foncier à déclarer chaque année</td>
                  <td>En principe capitalisés dans le plan</td>
                </tr>
                <tr>
                  <td>Impôt</td>
                  <td>Chaque année, sur les loyers ; plus-value à la revente</td>
                  <td>Au rachat, sur la part de gains (barème de l'assurance-vie)</td>
                  <td>À la sortie, selon le choix capital ou rente et l'origine des sommes</td>
                </tr>
                <tr>
                  <td>Frais</td>
                  <td>Frais de la SCPI (souscription, gestion)</td>
                  <td>Frais de la SCPI + frais de gestion du contrat + éventuels frais d'entrée ou d'arbitrage</td>
                  <td>Frais de la SCPI + frais de gestion du plan, selon le contrat</td>
                </tr>
                <tr>
                  <td>Choix de SCPI</td>
                  <td>Toute SCPI commercialisée</td>
                  <td>Seulement celles référencées par l'assureur</td>
                  <td>Seulement celles référencées par le plan</td>
                </tr>
                <tr>
                  <td>Sortie</td>
                  <td>Retrait ou revente de parts</td>
                  <td>Demande de rachat au contrat</td>
                  <td>Pas avant la retraite, sauf déblocage anticipé prévu par la loi</td>
                </tr>
                <tr>
                  <td>Transmission</td>
                  <td>Parts dans la succession</td>
                  <td>Clause bénéficiaire, régime propre à l'assurance-vie</td>
                  <td>Selon le plan et la clause désignée, à confirmer dans la notice</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Ce tableau décrit des principes généraux. Chaque contrat a ses conditions, d'où la
            fréquence des mentions « selon le contrat » : la notice d'information remise avant la
            souscription fait foi.
          </p>

          <h2 id="comment">Comment une SCPI entre-t-elle dans un contrat d'assurance-vie ou un PER ?</h2>
          <p>
            Un contrat en unités de compte (UC) n'est pas lié à un fonds en euros : sa valeur suit
            celle des supports choisis. Le code des assurances (article R. 131-1) liste les actifs
            qui peuvent servir d'unités de compte. Les SCPI sont proposées en UC par certains
            assureurs, mais les textes consultés ne permettent pas d'affirmer que tous les
            contrats les proposent : l'offre dépend du contrat et de l'assureur.
          </p>
          <p>
            Concrètement, vous ne devenez pas associé de la SCPI : la propriété des parts reste à
            l'assureur, qui vous crédite d'unités de compte. Plusieurs conséquences en découlent :
            les revenus sont versés à l'assureur, qui les reverse dans le contrat selon des
            modalités qui varient (certains contrats en retiennent une partie) ; vous ne votez pas
            aux assemblées de la SCPI ; et, si l'assureur doit remplacer un support, le code des
            assurances encadre cette substitution (article R. 131-4), à condition que le contrat
            la prévoie.
          </p>
          <div className="note">
            <p>
              <strong>Un encadrement en évolution.</strong> Le décret n° 2026-341 du 30 avril 2026
              (publié au Journal officiel du 5 mai 2026) renforce l'encadrement des supports en
              assurance-vie et en PER : il ferme le référencement de nouveaux « autres FIA » et
              fixe des conditions pour les sociétés immobilières non cotées servant d'unités de
              compte. Les textes consultés ne citent pas expressément les SCPI et visent
              notamment des sociétés à actifs désignés de façon limitative ; la portée exacte pour
              chaque support se confirme auprès de l'assureur. Ce point montre surtout que les
              règles de l'immobilier en contrat peuvent changer : à relire dans la notice à
              jour, pas dans une brochure ancienne.
            </p>
          </div>
          <p>
            Des plafonds de proportion existent dans le code des assurances pour certaines
            catégories d'actifs, et certains assureurs fixent leurs propres limites par support
            (montant minimum, plafond par contrat, versements libres uniquement). Ces limites
            varient selon le contrat : aucun chiffre ne peut être retenu pour tous. Elles figurent
            dans l'annexe de souscription du support.
          </p>

          <h2 id="frais">Combien coûtent les frais supplémentaires du contrat ?</h2>
          <p>
            En direct, vous supportez les frais de la SCPI : frais de souscription (la fourchette
            citée par l'AMF va de {pct1(M.fraisSouscriptionAmfMin)} à {pct1(M.fraisSouscriptionAmfMax)} du
            prix) et frais de gestion, déjà déduits des revenus distribués. Dans un contrat, ces frais
            restent dus, et s'ajoutent ceux du contrat : frais de gestion annuels prélevés sur la
            valeur du contrat, parfois des frais d'entrée ou d'arbitrage, parfois des frais propres au
            support. Les ordres de grandeur ci-dessous, tirés de grilles tarifaires publiques de
            contrats, sont à confirmer contrat par contrat.
          </p>
          <div className="note">
            <p>
              Exemple purement illustratif, qui ne correspond à aucun cas réel et ne projette
              aucun rendement. Hypothèses : {euros(E.montant)} investis en parts de SCPI dans un
              contrat, taux de distribution brut supposé de {pct1(E.tauxDistribution)} par an,
              frais de gestion du contrat de {pct1(E.fraisGestionContratAnnuel)} par an, appliqués
              à une valeur supposée constante pour garder le calcul lisible. Les frais de la SCPI
              elle-même, déjà intégrés au taux de distribution, ne sont pas comptés ici.
            </p>
          </div>
          <p>
            Sur {euros(E.montant)}, les frais de gestion du contrat représentent{" "}
            {euros(fraisAnnuels(E.montant, E.fraisGestionContratAnnuel))} par an, soit{" "}
            <strong>{euros(fraisCumules(E.montant, E.fraisGestionContratAnnuel, ANNEES))}</strong>{" "}
            sur {ANNEES} ans. Rapporté à une distribution brute supposée de{" "}
            {euros(distributionAnnuelle(E.montant, E.tauxDistribution))} par an, c'est{" "}
            {pct1(partDistribution(E.montant, E.tauxDistribution, E.fraisGestionContratAnnuel))} de cette
            distribution. La même mécanique, pour d'autres niveaux de frais de contrat :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Niveau de frais de gestion du contrat</th>
                  <th>Taux annuel</th>
                  <th>Frais par an</th>
                  <th>Frais sur {ANNEES} ans</th>
                  <th>Part de la distribution brute supposée</th>
                </tr>
              </thead>
              <tbody>
                {grilleFrais.map((ligne) => (
                  <tr key={ligne.libelle}>
                    <td>{ligne.libelle}</td>
                    <td>{pct1(ligne.taux)}</td>
                    <td>{euros(fraisAnnuels(E.montant, ligne.taux))}</td>
                    <td>{euros(fraisCumules(E.montant, ligne.taux, ANNEES))}</td>
                    <td>{pct1(partDistribution(E.montant, E.tauxDistribution, ligne.taux))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Ce surcoût peut se justifier par d'autres avantages de l'enveloppe, notamment fiscaux
            (voir plus bas), mais il se paie chaque année, qu'il y ait ou non des revenus. Notre
            guide sur{" "}
            <a href="/guide/combien-coute-un-investissement-locatif">le coût d'un investissement locatif</a>{" "}
            replace ces frais dans l'ensemble des coûts de l'immobilier, et celui sur{" "}
            <a href="/guide/meilleure-assurance-vie-retraite">le choix d'une assurance-vie pour la retraite</a>{" "}
            explique comment lire les frais d'un contrat.
          </p>

          <h2 id="fiscalite">Que change l'enveloppe pour l'impôt courant ?</h2>
          <p>
            <strong>En direct.</strong> Les loyers distribués sont imposés en revenus fonciers : au
            barème de l'impôt sur le revenu, avec prélèvements sociaux de{" "}
            {pct1(FISCALITE.prelevementsSociaux.immobilier)}. Avec l'hypothèse d'une tranche
            marginale à {E.tmi} %, le prélèvement global est de {pct1(tauxMarginalDirect)} de la
            distribution brute, soit {euros(prelevementDirect(E.montant, E.tauxDistribution))} par an sur{" "}
            {euros(distributionAnnuelle(E.montant, E.tauxDistribution))} (calcul simplifié, hors
            CSG déductible et hors revenus de source étrangère). Le détail figure dans{" "}
            <a href="/guide/scpi-fiscalite-revenus-plus-values">notre guide sur la fiscalité des SCPI</a>.
          </p>
          <p>
            <strong>En assurance-vie.</strong> Les revenus ne sont pas versés au souscripteur ;
            ils restent dans le contrat. L'imposition porte sur la part de gains incluse dans les
            rachats. Selon la fiche F22414 de Service-Public, des prélèvements sociaux
            ({pct1(FISCALITE.prelevementsSociaux.assuranceVie)} en principe) s'appliquent aux
            gains ; l'impôt sur le revenu dépend de l'ancienneté du contrat : pour un contrat de{" "}
            {AV_RACHAT.dureeTauxReduitAnnees} ans ou plus, un abattement annuel de {euros(FISCALITE.avAbattementAnnuelSeul)} (personne seule) ou{" "}
            {euros(FISCALITE.avAbattementAnnuelCouple)} (couple) s'applique aux gains. Le mécanisme est
            expliqué dans notre guide sur le{" "}
            <a href="/guide/immobilier-locatif-ou-assurance-vie">choix entre immobilier locatif et assurance-vie</a>.
            L'enveloppe ne supprime pas l'impôt : elle le décale et le calcule autrement.
          </p>
          <p>
            <strong>Dans un PER.</strong> Il n'y a pas d'impôt courant sur les revenus
            capitalisés. En contrepartie, la fiscalité se joue à l'entrée (déductibilité
            éventuelle des versements) et surtout à la sortie. Notre guide sur la{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a> détaille cette
            partie, et celui sur le{" "}
            <a href="/guide/per-ou-immobilier-locatif">choix entre PER et immobilier locatif</a>{" "}
            compare les deux logiques.
          </p>
          <div className="note">
            <p>
              Un revenu qui n'est pas versé n'est pas un revenu inexistant : un taux de
              distribution est un taux brut, non garanti, et une SCPI peut baisser sa distribution
              ou voir son prix de part reculer (au premier semestre 2026, le prix de part moyen
              pondéré a varié de {pct1(M.variationPrixPartS12026)} selon l'ASPIM). Dans un contrat, ces
              mouvements se retrouvent dans la valeur de vos unités de compte.
            </p>
          </div>

          <h2 id="liquidite">Peut-on récupérer son argent plus facilement ?</h2>
          <p>
            Pas forcément. La liquidité d'une SCPI en direct passe par le retrait de parts (auprès
            de la société de gestion, quand il est possible) ou la revente sur un marché de gré à
            gré. À la fin du premier semestre 2026, l'ASPIM a recensé {euros(M.partsEnAttenteS12026Md * 1e9)}{" "}
            de parts en attente de retrait ({pct1(M.partsEnAttenteS12026Pct)} de la capitalisation) :
            la sortie n'est jamais garantie.
          </p>
          <p>
            En contrat, vous demandez un rachat à l'assureur, ce qui ressemble à une opération
            simple, mais l'assureur reste tributaire de la valeur et de la liquidité de la SCPI
            sous-jacente. Le délai de paiement d'un rachat peut être plus long pour une unité de
            compte immobilière que pour un fonds en euros ; le délai applicable est à lire dans
            la notice. Surtout, l'assureur peut
            appliquer ses propres règles (rachat partiel d'une UC, valeur retenue, éventuel gel en
            cas de difficulté). Pour l'effet fiscal d'un rachat, voir notre guide sur le{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">rachat partiel d'assurance-vie</a>{" "}
            et celui sur{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a>.
          </p>
          <p>
            Dans un PER, la question ne se pose pas avant la retraite : les sommes y sont
            bloquées, sauf cas de déblocage anticipé prévus par la loi. La liquidité est donc
            volontairement limitée.
          </p>

          <h2 id="transmission-ifi">Et pour la transmission et l'IFI ?</h2>
          <p>
            <strong>Transmission.</strong> En direct, les parts entrent dans la succession. En
            assurance-vie, les capitaux sont transmis selon la clause bénéficiaire, avec un régime
            fiscal propre : abattement de {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)}{" "}
            par bénéficiaire pour les versements avant 70 ans (selon les règles de l'article 990 I du
            CGI, à confirmer). Les détails figurent dans notre guide{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">donation ou assurance-vie pour transmettre</a>.
            Pour le PER, le sort des capitaux au décès dépend du plan et des bénéficiaires
            désignés : à confirmer dans la notice.
          </p>
          <p>
            <strong>IFI.</strong> L'impôt sur la fortune immobilière concerne les patrimoines
            immobiliers nets supérieurs à {euros(F.ifiSeuilAssujettissement)}, le barème démarrant au-delà de{" "}
            {euros(F.ifiSeuilBareme)} (impots.gouv.fr). Pour un contrat d'assurance-vie en unités de
            compte, le BOFiP indique que la valeur de rachat entre dans le patrimoine imposable
            seulement à hauteur de la fraction représentative d'actifs immobiliers imposables, la
            part en fonds en euros n'étant pas concernée. Pour les parts de SCPI, détenues en direct ou
            en contrat, la fraction immobilière est donc à examiner ; les modalités d'évaluation
            se confirment auprès de l'assureur, de la société de gestion ou d'un
            professionnel. Pour un PER, un traitement comparable est évoqué dans les sources
            secondaires, à confirmer selon le type de plan.
          </p>

          <h2 id="per">Pourquoi le PER est-il un cas à part ?</h2>
          <p>
            Le PER est avant tout une enveloppe retraite : on y verse pour une sortie à l'âge de
            la retraite, en capital ou en rente selon les cas. Détenir des SCPI dans un PER, quand
            le plan les propose, signifie que les sommes ne donneront aucun revenu disponible
            avant la sortie : les distributions sont réinvesties dans le plan. Pour quelqu'un qui
            cherche un complément de revenus pendant la retraite, c'est un décalage à mesurer :
            les revenus de la SCPI ne se retrouveront dans le budget qu'au moment de retirer de
            l'argent du plan.
          </p>
          <p>
            Autre point à vérifier : la déductibilité des versements, qui dépend de la situation
            fiscale et du plafond personnel, et la fiscalité de la sortie, qui peut être
            défavorable ou favorable selon le revenu de l'époque. Ces calculs sont traités dans
            nos guides sur le{" "}
            <a href="/guide/fiscalite-sortie-per">PER à la sortie</a> et sur le{" "}
            <a href="/guide/per-ou-immobilier-locatif">PER face à l'immobilier locatif</a>. La
            détention par une société (SCI à l'IS, par exemple) relève d'une autre logique
            fiscale et patrimoniale, à examiner avec un notaire ou un conseiller.
          </p>

          <h2 id="questions">Quelles questions poser avant de choisir ?</h2>
          <ol>
            <li>
              <strong>Ai-je besoin de revenus maintenant ou plus tard ?</strong> Des revenus
              versés conviennent à un besoin immédiat ; des revenus capitalisés à un horizon
              long.
            </li>
            <li>
              <strong>Quelle est ma tranche d'imposition aujourd'hui, et laquelle sera-t-elle à la
              sortie ?</strong> C'est ce qui fait varier l'intérêt des enveloppes.
            </li>
            <li>
              <strong>Quels frais cumulés, et quel impact sur {ANNEES} ans ?</strong> Demandez le
              total des frais de la SCPI et du contrat, exprimé en euros sur la durée prévue.
            </li>
            <li>
              <strong>Quelles SCPI sont accessibles, et quelles règles de sortie ?</strong> La
              notice indique les supports, leurs limites, le délai de rachat.
            </li>
            <li>
              <strong>À qui reviennent les sommes au décès, et sous quelles conditions ?</strong>{" "}
              Clause bénéficiaire ou succession, à vérifier avec un notaire.
            </li>
          </ol>
          <p>
            Pour comparer des SCPI accessibles avec une aide à la souscription, des plateformes
            spécialisées existent, par exemple{" "}
            <a href="https://scpirentable.fr" target="_blank" rel="noopener noreferrer">scpirentable.fr</a>{" "}
            (sélection et souscription accompagnée) et{" "}
            <a href="https://immobilierpassif.com" target="_blank" rel="noopener noreferrer">immobilierpassif.com</a>{" "}
            (comparaison). Le document d'informations clés (DIC) de chaque SCPI, avec son
            indicateur de risque sur une échelle de 1 à {M.dicIndicateurRisqueEchelle}, doit être lu avant
            toute souscription, en direct comme en contrat.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Les SCPI en assurance-vie sont-elles plus sûres qu'en direct ?</h3>
          <p>
            Non. L'enveloppe change la fiscalité et la façon de sortir, pas le risque de la SCPI :
            le capital n'est pas garanti, les revenus non plus, et la liquidité peut être limitée.
            Une valeur de rachat peut être inférieure à la somme investie.
          </p>
          <h3>Peut-on déduire les intérêts d'un crédit pour acheter des SCPI en assurance-vie ?</h3>
          <p>
            Cette question dépend du montage et de la fiscalité de chaque cas ; elle ne se
            tranche pas ici. Voir notre guide sur les{" "}
            <a href="/guide/scpi-a-credit-ou-comptant">SCPI à crédit ou comptant</a> et vérifier
            avec un professionnel.
          </p>
          <h3>Les revenus de ma SCPI en contrat sont-ils imposés chaque année ?</h3>
          <p>
            En principe, pas sous forme de revenus fonciers : ils sont capitalisés, et l'impôt
            intervient lors des rachats, sur la part de gains. Les modalités exactes dépendent du
            contrat.
          </p>
          <h3>Un PER permet-il de toucher les revenus d'une SCPI pendant la retraite ?</h3>
          <p>
            Les sommes sont disponibles à la sortie, en capital ou en rente selon votre choix et
            les règles du plan ; ce n'est pas un revenu régulier automatique. À confirmer dans la
            notice.
          </p>
          <h3>Peut-on racheter ses unités de compte SCPI à tout moment ?</h3>
          <p>
            Le contrat permet en principe de demander un rachat, mais le délai et les conditions
            dépendent de l'assureur et de la liquidité de la SCPI. Rien n'est garanti.
          </p>
          <h3>Quelle est la meilleure solution pour préparer sa retraite ?</h3>
          <p>
            Il n'existe pas de réponse universelle. Elle dépend de votre horizon, de votre
            fiscalité, de vos besoins de revenus et de votre tolérance au risque. Notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> et notre{" "}
            <a href="/bilan-retraite">bilan retraite</a> aident à poser le cadre.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La même SCPI peut se détenir en direct, en contrat d'assurance-vie ou, quand le plan
            le propose, dans un PER. Ce choix ne change pas les risques de la SCPI, mais change
            la fiscalité (loyers imposés chaque année ou revenus capitalisés), les frais (des
            frais de contrat qui s'ajoutent), la liquidité, la transmission et l'offre de SCPI
            accessibles.
          </p>
          <p>
            Sur {euros(E.montant)}, des frais de contrat de {pct1(E.fraisGestionContratAnnuel)} par an
            représentent {euros(fraisCumules(E.montant, E.fraisGestionContratAnnuel, ANNEES))} sur {ANNEES} ans, hors
            frais de la SCPI. Ce coût se compare à ce que l'enveloppe peut apporter, mais il est
            certain, alors que les revenus de la SCPI ne le sont pas. Les règles en contrat
            évoluent : un décret de 2026 encadre les supports immobiliers référencés.
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
              fiscalité dépend de chaque foyer et les conditions d'un contrat figurent dans sa
              notice d'information, à faire confirmer par un professionnel. Les règles citées sont
              celles publiées au {IMMO.maj} et peuvent évoluer. Les exemples chiffrés sont des
              illustrations pédagogiques sur des hypothèses affichées ; ils ne projettent aucun
              rendement. Les performances passées ne préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Choisir l'enveloppe se décide après avoir posé son budget retraite." />
    </>
  );
}
