import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  AV55_FONDS_EUROS_UC,
  AV_RACHAT,
  EPARGNE_RETRAITE_EXEMPLES,
  FISCALITE,
  FRAIS_TYPES,
  GARANTIES,
  RENDEMENTS,
  RETRAIT_CAPITAL,
  TRANSMISSION,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const A = AV55_FONDS_EUROS_UC;
const E = EPARGNE_RETRAITE_EXEMPLES;
const RC = RETRAIT_CAPITAL;

const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + " %";

// ---- Horizon : constitution jusqu'au départ, puis décaissement ----
const horizonConstitution = E.ageDepart - A.ageActuel;
const horizonTotal = horizonConstitution + E.dureeRetraiteAnnees;
const ageFinHorizon = E.ageDepart + E.dureeRetraiteAnnees;

// ---- Fonds euros face à l'inflation : valeur nominale puis en euros d'aujourd'hui ----
const inflation = RENDEMENTS.inflationLongTerme.moyen;
const valeurNominale = (taux, annees) => A.capitalIllustratif * Math.pow(1 + taux / 100, annees);
const valeurReelle = (taux, annees) => valeurNominale(taux, annees) / Math.pow(1 + inflation / 100, annees);
const lignesFondsEuros = [
  { libelle: "bas de fourchette", taux: RENDEMENTS.fondsEuros.min },
  { libelle: "milieu de fourchette", taux: RENDEMENTS.fondsEuros.moyen },
  { libelle: "haut de fourchette", taux: RENDEMENTS.fondsEuros.max },
];

// ---- Risque de séquence : mêmes rendements annuels, ordre inversé, retrait annuel fixe ----
const simuler = (rendements) =>
  rendements.reduce((capital, r) => Math.max(capital - RC.retraitAnnuelSequence, 0) * (1 + r / 100), RC.capitalIllustratif);
const finDefavorable = simuler(RC.sequenceDefavorable);
const finFavorable = simuler(RC.sequenceFavorable);

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Assurance-vie : rubrique fiscalité (fiche à confirmer)",
    url: "https://www.service-public.gouv.fr/",
  },
  {
    label: "Service-Public.gouv.fr — Âge légal de départ à la retraite, fiche F14043, vérifiée le 14 août 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14043",
  },
  {
    label: "Autorité des marchés financiers (AMF) — Épargnants : assurance-vie et unités de compte",
    url: "https://www.amf-france.org/fr",
  },
  {
    label: "Bulletin officiel des finances publiques (BOFiP) — Revenus de capitaux mobiliers, contrats d'assurance-vie",
    url: "https://bofip.impots.gouv.fr/",
  },
  {
    label: "impots.gouv.fr — Les revenus mobiliers, mise à jour du 8 avril 2026",
    url: "https://www.impots.gouv.fr/",
  },
  {
    label: "Légifrance — Code des assurances (garantie des assurances de personnes) et Code général des impôts, art. 990 I",
    url: "https://www.legifrance.gouv.fr/",
  },
  {
    label: "Info-retraite.fr — Relevé de situation individuelle et estimations de pension",
    url: "https://www.info-retraite.fr/",
  },
];

export default function GuideAvFondsEurosUc55Ans() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Assurance-vie · dix ans avant la retraite</span>
          <h1>Assurance-vie à 55 ans : fonds euros ou unités de compte ?</h1>
          <p className="sub">
            Garantie du capital, risque de perte, horizon réel : comment raisonner quand la retraite
            approche mais que l'argent devra durer trente ans. Mis à jour en novembre 2026.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> à 55 ans, l'horizon d'un contrat d'assurance-vie n'est pas
              celui des {horizonConstitution} ans qui séparent d'un départ à {E.ageDepart} ans, mais celui de
              la dernière somme qui sera retirée, parfois {horizonTotal} ans plus tard. Le fonds en euros
              garantit le capital (net de frais) mais pas son rendement, et son rendement passé n'a
              pas toujours suffi à compenser l'inflation. Les unités de compte n'offrent aucune
              garantie en capital. La question utile n'est donc pas « fonds euros ou unités de compte »
              pour tout le contrat, mais « à quel horizon chaque somme sera-t-elle utilisée ».
            </p>
          </div>

          <p>
            Passé la cinquantaine, deux réflexes s'opposent. Le premier consiste à tout sécuriser
            « puisque la retraite approche ». Le second à rester investi comme à 40 ans. Aucun des deux
            ne répond à la bonne question, parce que la retraite n'est pas la fin de l'horizon de
            placement : c'est le début de la période pendant laquelle l'épargne est consommée.
          </p>
          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel :
            Hélène, {A.ageActuel} ans, a placé presque tout son contrat d'assurance-vie sur le fonds en euros
            depuis des années, par prudence. Elle envisage de partir vers {E.ageDepart} ans et se demande s'il est
            trop tard pour introduire des unités de compte, ou s'il faut au contraire en retirer le peu
            qu'elle détient. Cet article donne des repères de raisonnement, sans proposer d'allocation chiffrée :
            celle-ci dépend de votre situation, de votre tolérance au risque et de vos autres revenus.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#garantie">Garantie en capital ou risque de perte : que change vraiment le choix ?</a></li>
              <li><a href="#horizon">Quel est le véritable horizon d'un contrat à 55 ans ?</a></li>
              <li><a href="#inflation">Un fonds en euros suffit-il à préserver le pouvoir d'achat ?</a></li>
              <li><a href="#sequence">Pourquoi le risque se concentre-t-il autour du départ en retraite ?</a></li>
              <li><a href="#repartition">Comment répartir par horizon, sans allocation toute faite ?</a></li>
              <li><a href="#pilotee">La gestion pilotée à horizon est-elle une réponse ?</a></li>
              <li><a href="#frais">Quels frais comparer avant d'arbitrer ?</a></li>
              <li><a href="#fiscalite">Quelle fiscalité à 8 ans de contrat ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#plus-loin">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="garantie">Garantie en capital ou risque de perte : que change vraiment le choix ?</h2>
          <p>
            Sur le fonds en euros, l'assureur s'engage sur le capital : les sommes versées, nettes des
            frais de gestion du contrat, ne baissent pas, et les intérêts de chaque année sont en principe
            acquis ensuite (les modalités se lisent dans la notice du contrat). Ce qui n'est pas garanti,
            c'est le rendement futur : il est annoncé après coup, chaque année, et peut varier d'un
            exercice à l'autre. Les fourchettes retenues sur ce site pour le fonds en euros vont de{" "}
            {pct1(RENDEMENTS.fondsEuros.min)} à {pct1(RENDEMENTS.fondsEuros.max)} par an (rendement constaté sur la
            période {RENDEMENTS.fondsEuros.periode}) : ce sont des constats passés, pas des promesses.
          </p>
          <p>
            Cette garantie repose sur la solidité de l'assureur. En cas de défaillance, le fonds de
            garantie des assurances de personnes intervient, dans la limite de{" "}
            {euros(GARANTIES.fgapPlafondParAssureParAssureur)} par assuré et par assureur ; le plafond en
            vigueur se vérifie auprès du fonds de garantie. Sur de grosses sommes, la diversification des
            assureurs fait donc partie de la réflexion.
          </p>
          <p>
            Sur les unités de compte, l'assureur ne garantit que le nombre de parts, pas leur valeur : le
            capital peut être inférieur au montant versé, y compris à l'approche de la retraite. En
            contrepartie, les supports investis en actions ont, sur de très longues périodes passées, donné
            des résultats supérieurs, mais avec des années négatives. Le tableau ci-dessous compare les deux
            logiques ; il ne désigne pas un gagnant.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Fonds en euros</th>
                  <th>Unités de compte</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Capital</td>
                  <td>Garanti par l'assureur, net de frais de gestion du contrat</td>
                  <td>Non garanti : perte en capital possible</td>
                </tr>
                <tr>
                  <td>Rendement</td>
                  <td>Variable d'une année à l'autre, annoncé après coup</td>
                  <td>Dépend des marchés ; rendements passés ne préjugent pas des rendements futurs</td>
                </tr>
                <tr>
                  <td>Volatilité</td>
                  <td>Faible (valeur lissée par l'assureur)</td>
                  <td>Élevée pour les supports actions, plus modérée pour les supports obligataires</td>
                </tr>
                <tr>
                  <td>Risque principal</td>
                  <td>Rendement inférieur à l'inflation sur longue période, solidité de l'assureur</td>
                  <td>Moins-value au moment où l'on a besoin des fonds</td>
                </tr>
                <tr>
                  <td>Liquidité</td>
                  <td>Rachat possible à tout moment, selon les conditions du contrat</td>
                  <td>Idem, mais à la valeur du jour : vendre après une baisse fige la perte</td>
                </tr>
                <tr>
                  <td>Plus adapté à</td>
                  <td>Sommes qui seront utilisées à court ou moyen terme</td>
                  <td>Sommes qui ne seront utilisées que dans de nombreuses années</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="horizon">Quel est le véritable horizon d'un contrat à 55 ans ?</h2>
          <p>
            L'erreur la plus répandue est de confondre la date de départ à la retraite avec la fin de
            l'horizon de placement. Avec un départ à {E.ageDepart} ans, la phase de constitution dure{" "}
            {horizonConstitution} ans. Mais si l'on retient, comme dans nos exemples, une retraite de{" "}
            {E.dureeRetraiteAnnees} ans, les derniers euros du contrat ne seront consommés que vers{" "}
            {ageFinHorizon} ans, soit dans {horizonTotal} ans. Selon l'âge légal de votre génération (rappelé
            dans <a href="/guide/age-de-depart-retraite-trimestres-duree-assurance">notre article sur l'âge de
            départ et la durée d'assurance</a>), le départ peut se situer un peu avant ou après cet âge.
          </p>
          <p>
            En pratique, un contrat de {A.ageActuel} ans ne finance pas un seul besoin, mais une suite de
            besoins étalés dans le temps : les premières années de retraite, les dépenses de milieu de
            retraite, puis les dépenses de fin de vie et la transmission éventuelle. Chacun a son propre
            horizon. C'est cette lecture « par poches » qui permet de dépasser l'alternative binaire.
          </p>

          <h2 id="inflation">Un fonds en euros suffit-il à préserver le pouvoir d'achat ?</h2>
          <p>
            Le capital est garanti en euros courants, pas en pouvoir d'achat. Pour mesurer l'écart,
            appliquons à {euros(A.capitalIllustratif)} sur {horizonTotal} ans, sans retrait, les trois points de la
            fourchette retenue pour le fonds en euros, puis déflatons par une inflation de {pct1(inflation)} par an
            (cible de la Banque centrale européenne). Les montants sont avant prélèvements sociaux et impôt.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Hypothèse de rendement annuel net de frais de gestion</th>
                  <th>Valeur après {horizonTotal} ans (euros courants)</th>
                  <th>Valeur après {horizonTotal} ans (euros d'aujourd'hui)</th>
                </tr>
              </thead>
              <tbody>
                {lignesFondsEuros.map((l) => (
                  <tr key={l.libelle}>
                    <td>{pct1(l.taux)} ({l.libelle})</td>
                    <td>{euros(valeurNominale(l.taux, horizonTotal))}</td>
                    <td>{euros(valeurReelle(l.taux, horizonTotal))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="note">
            <p>
              Illustration purement pédagogique, qui ne correspond à aucun cas réel et ne constitue pas
              une prévision : un même taux est supposé constant pendant {horizonTotal} ans, ce qui n'arrive
              jamais. Elle montre seulement qu'un rendement proche ou inférieur à l'inflation laisse le
              pouvoir d'achat stable ou en baisse, tandis qu'un rendement supérieur le fait progresser
              modérément. Le capital en euros reste garanti dans tous les cas.
            </p>
          </div>

          <h2 id="sequence">Pourquoi le risque se concentre-t-il autour du départ en retraite ?</h2>
          <p>
            Tant qu'on verse, une baisse de marché peut même être digérée, puisque les versements suivants
            achètent à bas prix. Une fois qu'on retire, le calcul s'inverse : vendre des parts après une baisse
            consomme davantage de parts, qui ne profiteront pas du rebond. C'est le « risque de séquence » :
            à rendements annuels identiques, l'ordre dans lequel ils surviennent change le capital final.
          </p>
          <p>
            Illustration sur {euros(RC.capitalIllustratif)} avec un retrait annuel fixe de{" "}
            {euros(RC.retraitAnnuelSequence)} pendant {RC.sequenceDefavorable.length} ans. Les deux séries
            de rendements sont les mêmes, mais inversées : la première débute par les mauvaises années, la
            seconde les subit à la fin.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Séquence de rendements annuels (supposée, non historique)</th>
                  <th>Capital restant après {RC.sequenceDefavorable.length} ans</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mauvaises années au début : {RC.sequenceDefavorable.map((r) => pct(r)).join(" ; ")}</td>
                  <td>{euros(finDefavorable)}</td>
                </tr>
                <tr>
                  <td>Mêmes années, ordre inversé : {RC.sequenceFavorable.map((r) => pct(r)).join(" ; ")}</td>
                  <td>{euros(finFavorable)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            L'écart entre les deux lignes, obtenu sans changer le moindre rendement moyen, explique pourquoi
            la réflexion sur la répartition se concentre sur les années qui précèdent et suivent le départ.
            Ce n'est pas un argument pour tout sécuriser : c'est un argument pour que les sommes que l'on
            retirera dans les premières années ne dépendent pas de l'état des marchés ce jour-là.
          </p>

          <h2 id="repartition">Comment répartir par horizon, sans allocation toute faite ?</h2>
          <p>
            Il n'existe pas de proportion qui convienne à tous, et nous n'en recommandons aucune. En revanche, la
            logique par horizon est un cadre de réflexion : on associe chaque poche d'épargne à la date à laquelle
            elle sera probablement utilisée, puis on se demande quel niveau de fluctuation cette poche peut
            supporter à cette date.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Usage prévu de la poche</th>
                  <th>Horizon</th>
                  <th>Logique de principe</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Premières années de retraite, imprévus, projets proches</td>
                  <td>Court (quelques années)</td>
                  <td>Privilégier la stabilité de la valeur : fonds en euros ou supports peu volatils</td>
                </tr>
                <tr>
                  <td>Complément de revenu en milieu de retraite</td>
                  <td>Moyen</td>
                  <td>Mélange possible, avec des supports diversifiés et une exposition aux marchés limitée</td>
                </tr>
                <tr>
                  <td>Dépenses de fin de vie, transmission aux proches</td>
                  <td>Long ({horizonTotal} ans et davantage pour les derniers euros)</td>
                  <td>Les fluctuations ont le temps d'être absorbées ; le risque de perte en capital reste réel</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Ce tableau décrit un raisonnement, pas une allocation. Une personne qui dispose d'une pension
            confortable et d'autres actifs n'aura pas la même capacité à encaisser une baisse que quelqu'un
            dont l'assurance-vie constitue l'essentiel du complément. Pour traduire ces poches en revenus, voir
            notre guide sur{" "}
            <a href="/guide/combien-retirer-par-mois-capital-retraite">combien retirer par mois d'un capital de retraite</a>{" "}
            et celui sur{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement des enveloppes</a>.
          </p>

          <h2 id="pilotee">La gestion pilotée à horizon est-elle une réponse ?</h2>
          <p>
            La gestion pilotée, ou gestion à horizon, confie à un gérant le soin de faire évoluer
            l'allocation du contrat. Dans sa version « horizon », la part exposée aux marchés est en principe
            réduite à mesure que la date cible approche. C'est une façon automatique d'appliquer la logique par
            horizon décrite plus haut. Elle présente deux limites : l'horizon du mandat est choisi à la
            souscription et peut ne pas coïncider avec votre horizon réel de décaissement ; et le mandat a un
            coût propre, qui s'ajoute aux frais du contrat et des supports.
          </p>
          <p>
            Comparer un mandat et un contrat géré seul suppose de lire l'allocation cible à chaque étape, pas
            seulement la dénomination commerciale du profil. Notre comparatif{" "}
            <a href="/guide/gestion-pilotee-ou-gestion-libre">gestion pilotée ou gestion libre</a>{" "}
            détaille les critères de choix.
          </p>

          <h2 id="frais">Quels frais comparer avant d'arbitrer ?</h2>
          <p>
            Les frais pèsent d'autant plus que l'horizon est long. Les ordres de grandeur observés, à vérifier
            contrat par contrat, sont les suivants : frais de gestion annuels de {pct1(FRAIS_TYPES.contratInternet.gestionAnnuelle.min)} à{" "}
            {pct1(FRAIS_TYPES.contratInternet.gestionAnnuelle.max)} pour les contrats en ligne, de{" "}
            {pct1(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min)} à{" "}
            {pct1(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)} pour les contrats de réseaux
            bancaires traditionnels, avec parfois des frais d'entrée de{" "}
            {pct1(FRAIS_TYPES.contratBancaireTraditionnel.entree.min)} à {pct1(FRAIS_TYPES.contratBancaireTraditionnel.entree.max)}.
            S'y ajoutent les frais courants des supports et, en gestion pilotée, un surcoût de mandat de{" "}
            {pct1(FRAIS_TYPES.gestionPiloteeSurcout.min)} à {pct1(FRAIS_TYPES.gestionPiloteeSurcout.max)} par an
            environ. Sur le fonds en euros, les frais de gestion sont déjà déduits du rendement annoncé.
            Avant de transférer ou d'arbitrer, regardez aussi les frais d'arbitrage et la
            transférabilité du contrat ; notre article{" "}
            <a href="/guide/combien-coute-une-assurance-vie">combien coûte une assurance-vie</a> en donne le détail.
          </p>

          <h2 id="fiscalite">Quelle fiscalité à 8 ans de contrat ?</h2>
          <p>
            L'ancienneté du contrat, comptée depuis la souscription, compte autant que le choix des supports. Au-delà de{" "}
            {AV_RACHAT.dureeTauxReduitAnnees} ans, les gains inclus dans un rachat bénéficient d'un abattement annuel de{" "}
            {euros(FISCALITE.avAbattementAnnuelSeul)} pour une personne seule, ou {euros(FISCALITE.avAbattementAnnuelCouple)} pour
            un couple soumis à imposition commune. L'impôt sur le revenu porte ensuite sur la part de gains
            excédant cet abattement, au taux de {pct1(FISCALITE.avTauxReduitApres8Ans)} lorsque les primes non remboursées du
            titulaire n'excèdent pas {euros(AV_RACHAT.seuilPrimesTauxReduit)}, à {pct1(FISCALITE.pfuIR)} au-delà pour la fraction
            concernée (barème progressif possible sur option dans certains cas). Les prélèvements sociaux, au taux de{" "}
            {pct1(FISCALITE.prelevementsSociaux.assuranceVie)} pour l'assurance-vie selon les hypothèses du site, sont dus sur
            les gains.
          </p>
          <p>
            Ces règles ont une conséquence sur la répartition : arbitrer entre fonds en euros et unités de compte à
            l'intérieur du contrat ne déclenche pas d'impôt, alors qu'un rachat suivi d'un réinvestissement hors
            contrat en déclenche. Pour la transmission, les capitaux versés avant 70 ans bénéficient en principe d'un
            abattement de {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} par bénéficiaire (art. 990 I du code
            général des impôts), à vérifier selon les clauses bénéficiaires. Le détail, avec exemples, est dans notre
            guide <a href="/guide/assurance-vie-apres-8-ans-fiscalite-et-rente">assurance-vie après 8 ans : fiscalité et rente</a>.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Faut-il passer son assurance-vie en fonds euros à 55 ans ?</h3>
          <p>
            Pas systématiquement. Tout dépend de la date à laquelle chaque somme sera utilisée. Les sommes
            qui financeront les premières années de retraite justifient plutôt de la stabilité ; celles qui ne
            serviront que dans vingt ou trente ans peuvent supporter des fluctuations. Un passage intégral en
            fonds en euros supprime le risque de perte en capital, mais expose à un rendement potentiellement
            inférieur à l'inflation.
          </p>
          <h3>Peut-on perdre de l'argent sur une assurance-vie à 55 ans ?</h3>
          <p>
            Oui sur les unités de compte, dont la valeur peut baisser, y compris à l'approche de la retraite.
            Sur le fonds en euros, le capital versé est garanti net de frais de gestion, dans les limites du
            contrat et de la garantie des assureurs. Notre article sur{" "}
            <a href="/guide/risques-assurance-vie">les risques de l'assurance-vie</a> détaille chaque cas.
          </p>
          <h3>Quelle part d'unités de compte à 55 ans ?</h3>
          <p>
            Il n'existe pas de pourcentage valable pour tous, et nous n'en indiquons pas. La part dépend de
            l'horizon d'utilisation de chaque poche, de vos autres revenus à la retraite, de votre capacité à
            subir une baisse sans devoir vendre, et de votre tolérance au risque. Un échange avec un
            professionnel agréé permet de la déterminer cas par cas.
          </p>
          <h3>Un fonds en euros bat-il l'inflation ?</h3>
          <p>
            Cela dépend des années. Avec les fourchettes observées retenues sur ce site (de{" "}
            {pct1(RENDEMENTS.fondsEuros.min)} à {pct1(RENDEMENTS.fondsEuros.max)} par an) et une inflation de{" "}
            {pct1(inflation)}, le pouvoir d'achat peut baisser, rester stable ou progresser. Les rendements passés
            ne préjugent pas des rendements futurs.
          </p>
          <h3>La gestion pilotée à horizon est-elle adaptée à 55 ans ?</h3>
          <p>
            Elle automatise la réduction progressive du risque, ce qui peut convenir si l'on ne souhaite pas
            arbitrer soi-même. Elle a un coût et un horizon fixé à l'avance. Regardez l'allocation réelle à chaque
            étape et les frais cumulés avant de signer le mandat.
          </p>
          <h3>Faut-il attendre 8 ans de contrat avant de modifier la répartition ?</h3>
          <p>
            Non : les arbitrages à l'intérieur du contrat ne sont pas imposés. L'ancienneté compte pour les
            rachats, pas pour les arbitrages. Un nouveau contrat, en revanche, repart de zéro pour le calcul des
            huit ans : transférer ou ouvrir un autre contrat n'est pas neutre.
          </p>
          <h3>Que faire si le contrat a moins de 8 ans à 55 ans ?</h3>
          <p>
            Les gains éventuellement retirés avant huit ans sont imposés selon le régime applicable à l'ancienneté
            du contrat, sans l'abattement annuel. Il est souvent utile de planifier les rachats après la huitième
            année quand c'est possible, sans que cela doive primer sur un besoin réel de liquidités.
          </p>
          <h3>Comment l'assurance-vie s'articule-t-elle avec les autres enveloppes à la retraite ?</h3>
          <p>
            Elle sert souvent de réserve de liquidités et d'outil de transmission, à côté du PER et du PEA.
            Voir notre comparatif de <a href="/guide/meilleure-enveloppe-retraite">la meilleure enveloppe pour la retraite</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            À {A.ageActuel} ans, le choix entre fonds en euros et unités de compte n'est pas un choix de
            contrat, mais un choix par poche : chaque somme est associée à la date où elle sera utilisée.
            La garantie du capital protège de la baisse nominale, pas de l'érosion monétaire ; les unités de compte
            peuvent corriger cette érosion sur le long terme, au prix d'une perte en capital possible et d'un
            risque particulier au moment des premiers retraits.
          </p>
          <p>
            Le plus utile est de poser trois données : le montant que vous voulez pouvoir retirer dans les
            premières années, les autres ressources qui existeront à ce moment, et le niveau de baisse que vous
            supporteriez sans changer vos dépenses. Notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> aide à chiffrer l'écart à combler, et le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> permet de replacer l'assurance-vie dans
            l'ensemble de vos actifs. Notre page{" "}
            <a href="/strategies/assurance-vie-retraite">stratégie assurance-vie pour la retraite</a> complète ce cadre.
          </p>

          <h2 id="plus-loin">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/risques-assurance-vie">Les risques de l'assurance-vie</a></li>
            <li><a href="/guide/gestion-pilotee-ou-gestion-libre">Gestion pilotée ou gestion libre</a></li>
            <li><a href="/guide/assurance-vie-apres-8-ans-fiscalite-et-rente">Assurance-vie après 8 ans : fiscalité et rente</a></li>
            <li><a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">Pourquoi votre assurance-vie rapporte peu</a></li>
            <li><a href="/guide/capital-retraite-objectif-et-construction">Capital retraite : objectif et construction</a></li>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : aucune allocation n'est
              recommandée, et seule une étude de votre situation peut déterminer la répartition adaptée. Les unités
              de compte supportent un risque de perte en capital ; les performances passées ne préjugent pas des
              performances futures. Les exemples chiffrés sont des illustrations pédagogiques établies sur des
              hypothèses affichées, qui ne préjugent ni de votre situation ni des règles futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Fonds euros ou unités de compte : replacez votre contrat dans un bilan retraite global." />
    </>
  );
}
