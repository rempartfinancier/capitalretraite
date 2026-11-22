import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  AV_RACHAT,
  CAPITAL_RETRAITE_NOV2026,
  DECUMULATION,
  EPARGNE_RETRAITE_EXEMPLES,
  FISCALITE,
  RENDEMENTS,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const EX = EPARGNE_RETRAITE_EXEMPLES;
const grilleCapitaux = EX.capitauxCiblesGrille;
const duree = EX.dureeRetraiteAnnees;
const tauxRetrait = EX.regleRetraitAnnuel;
const rendDecaissement = EX.rendementDecaissementNet;
const inflation = EX.inflationAnnuelle;
const ageDepart = EX.ageDepart;
const convMin = DECUMULATION.tauxConversionRente65.min;
const convMax = DECUMULATION.tauxConversionRente65.max;
const horizons = CAPITAL_RETRAITE_NOV2026.horizonsTrajectoireAnnees;
const rendements = EX.rendementsEpargneNets;
const psPer = FISCALITE.prelevementsSociaux.per;
const psAv = FISCALITE.prelevementsSociaux.assuranceVie;

// Montant mensuel arrondi à l'euro.
const mensuel = (annuel) => Math.round(annuel / 12);

// Annuité constante sur `n` années à un taux annuel `t` (%) : A = C × t / (1 − (1 + t)^−n).
const annuite = (capital, t, n) => {
  const i = t / 100;
  return i === 0 ? capital / n : (capital * i) / (1 - Math.pow(1 + i, -n));
};

// Taux réel de décaissement (rendement net corrigé de l'inflation), en %.
const tauxReel = ((1 + rendDecaissement / 100) / (1 + inflation / 100) - 1) * 100;

// Versement mensuel pour atteindre `capital` en `n` années à un rendement net annuel `t` (%),
// versements en fin de mois, rendement mensuel équivalent.
const versementMensuel = (capital, t, n) => {
  const m = n * 12;
  const i = Math.pow(1 + t / 100, 1 / 12) - 1;
  return i === 0 ? capital / m : (capital * i) / (Math.pow(1 + i, m) - 1);
};

// Grille « capital → complément mensuel ».
const grille = grilleCapitaux.map((capital) => ({
  capital,
  regle: mensuel((capital * tauxRetrait) / 100),
  annuiteFixe: mensuel(annuite(capital, rendDecaissement, duree)),
  annuiteIndexee: mensuel(annuite(capital, tauxReel, duree)),
  renteMin: mensuel((capital * convMin) / 100),
  renteMax: mensuel((capital * convMax) / 100),
}));
const capitalRef = grilleCapitaux[2];
const gRef = grille[2];

// Capital restant après `duree` ans de retraits d'abord égaux à tauxRetrait % du capital,
// indexés sur l'inflation, le solde rendant `rendDecaissement` % net par an.
const soldeApresRetraitsIndexes = (() => {
  let solde = capitalRef;
  let retrait = (capitalRef * tauxRetrait) / 100;
  for (let a = 0; a < duree; a++) {
    solde = (solde - retrait) * (1 + rendDecaissement / 100);
    retrait *= 1 + inflation / 100;
  }
  return Math.round(solde);
})();

// Trajectoire : versement mensuel pour constituer le plus petit capital de la grille.
const capitalTraj = grilleCapitaux[0];
const trajectoire = horizons.map((h) => ({
  h,
  parRendement: rendements.map((t) => Math.round(versementMensuel(capitalTraj, t, h))),
}));

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : comment sont imposés les revenus d'un contrat d'assurance-vie ? Fiche F22414, vérifiée le 15 avril 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22414",
  },
  {
    label:
      "impots.gouv.fr — Les revenus mobiliers (mise à jour du 8 avril 2026) : prélèvements sociaux à 18,6 % depuis le 1er janvier 2026, produits d'assurance-vie restant à 17,2 %",
    url: "https://www.impots.gouv.fr/particulier/les-revenus-mobiliers",
  },
  {
    label: "Service-Public.gouv.fr — Plan d'épargne en actions (PEA), fiche F2385",
    url: "https://www.service-public.fr/particuliers/vosdroits/F2385",
  },
  {
    label:
      "ACPR (Banque de France) — autorité de contrôle prudentiel et de résolution, contrôle des assureurs et des banques",
    url: "https://acpr.banque-france.fr/",
  },
];

export default function GuideCapitalRetraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide · Objectif et construction du capital</span>
          <h1>Capital retraite : quel objectif viser et comment le construire ?</h1>
          <p className="sub">
            Ce que « capital retraite » veut dire, ce que {euros(capitalRef)} financent
            réellement chaque mois, et comment PER, assurance-vie et PEA se partagent
            la construction. Hypothèses de {EX.maj}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le capital retraite est le patrimoine financier qui
              complète vos pensions. Pour une durée de retraits de {duree} ans, un capital de{" "}
              {euros(capitalRef)} finance, selon la méthode retenue, entre{" "}
              {euros(Math.min(gRef.regle, gRef.annuiteFixe, gRef.annuiteIndexee))} et{" "}
              {euros(Math.max(gRef.regle, gRef.annuiteFixe, gRef.annuiteIndexee))} par mois
              (repère des {pct(tauxRetrait)} ou annuité), et de l'ordre de {euros(gRef.renteMin)} à{" "}
              {euros(gRef.renteMax)} par mois si on le convertit en rente viagère à 65 ans.
              Ces ordres de grandeur ne sont garantis par personne : ils dépendent des marchés, de
              l'inflation, de la durée de vie et de la fiscalité.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#definition">Qu'appelle-t-on capital retraite ?</a></li>
              <li><a href="#grille">Quel complément mensuel pour quel capital ?</a></li>
              <li><a href="#regle-4">La règle des {pct(tauxRetrait)} : un repère, pas une promesse</a></li>
              <li><a href="#rente">Et si l'on convertit le capital en rente viagère ?</a></li>
              <li><a href="#enveloppes">Comment construire ce capital : PER, assurance-vie, PEA</a></li>
              <li><a href="#trajectoire">Quelle trajectoire pour y arriver ?</a></li>
              <li><a href="#erreurs">Les erreurs qui faussent l'objectif</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources</a></li>
            </ol>
          </div>

          <p>
            « Combien me faut-il de capital pour ma retraite ? » est la question que l'on pose
            quand on commence à regarder son relevé de carrière. La réponse commence presque
            toujours par un chiffre rond, 300 000 € ou 500 000 €, repris de forum en forum. Or un
            capital seul ne veut rien dire : ce qui compte, c'est le revenu mensuel qu'il peut
            soutenir, pendant combien de temps, et dans quelle enveloppe il est détenu. Ce guide
            part donc du capital pour aller vers le revenu, puis remonte vers la façon de le
            construire.
          </p>
          <p>
            Il ne remplace pas la démarche de fond, qui part de votre revenu cible et de vos
            pensions estimées :{" "}
            <a href="/guide/combien-faut-il-epargner-pour-la-retraite">
              combien faut-il épargner pour la retraite
            </a>{" "}
            en détaille la méthode. Ici, nous prenons le chemin inverse : à partir d'un capital,
            que peut-on espérer en tirer ?
          </p>

          <h2 id="definition">Qu'appelle-t-on capital retraite ?</h2>
          <p>
            Le capital retraite désigne l'ensemble du patrimoine financier que vous affectez à
            votre retraite, en plus des pensions des régimes obligatoires (base et
            complémentaires). Il peut être logé dans un plan d'épargne retraite (PER), un contrat
            d'assurance-vie, un plan d'épargne en actions (PEA), parfois un compte-titres ou de
            l'immobilier locatif. Il ne comprend ni la résidence principale que vous occupez, ni
            l'épargne de précaution, qui répondent à d'autres besoins.
          </p>
          <p>
            Ce capital a un rôle précis : combler l'écart entre le revenu que vous souhaitez et
            les pensions que vous toucherez. Plus cet écart est large et plus la retraite est
            longue, plus le capital nécessaire est élevé. Il ne s'agit donc pas d'atteindre un
            montant symbolique, mais de financer un flux.
          </p>

          <h2 id="grille">Quel complément mensuel pour quel capital ?</h2>
          <p>
            Le tableau ci-dessous convertit quatre capitaux en complément mensuel, en euros
            d'aujourd'hui, selon trois lectures. La première applique le repère des{" "}
            {pct(tauxRetrait)} (retrait initial annuel, voir plus bas). Les deux autres
            transforment le capital en versements réguliers sur {duree} ans, avec un capital
            consommé à zéro au terme, pour un rendement net pendant les retraits de{" "}
            {pct(rendDecaissement)} par an : soit un montant fixe en euros courants, soit un
            montant qui suit l'inflation de {pct(inflation)} par an (calculé au taux réel de{" "}
            {pct(Math.round(tauxReel * 100) / 100)}).
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Capital</th>
                  <th>Repère des {pct(tauxRetrait)}</th>
                  <th>Annuité fixe sur {duree} ans</th>
                  <th>Annuité indexée sur l'inflation</th>
                </tr>
              </thead>
              <tbody>
                {grille.map((g) => (
                  <tr key={g.capital}>
                    <td>{euros(g.capital)}</td>
                    <td>{euros(g.regle)} / mois</td>
                    <td>{euros(g.annuiteFixe)} / mois</td>
                    <td>{euros(g.annuiteIndexee)} / mois</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Lecture : avec {euros(capitalRef)}, on se situe entre {euros(gRef.annuiteIndexee)} et{" "}
            {euros(gRef.annuiteFixe)} par mois selon que l'on exige un revenu qui suit l'inflation
            ou non, le repère des {pct(tauxRetrait)} donnant {euros(gRef.regle)}. Les montants
            sont bruts : ils ne tiennent compte ni de l'impôt sur le revenu ni des prélèvements
            sociaux à la sortie, qui varient selon l'enveloppe (voir plus bas). Ils sont
            proportionnels au capital : doubler le capital double le complément.
          </p>
          <div className="note">
            <p>
              Ces chiffres sont des illustrations pédagogiques ({EX.maj}) fondées sur des
              hypothèses constantes. Aucun rendement n'est garanti ; les supports en unités de
              compte ou en actions présentent un risque de perte en capital, et les marchés ne
              rapportent jamais {pct(rendDecaissement)} par an en ligne droite.
            </p>
          </div>

          <h2 id="regle-4">La règle des {pct(tauxRetrait)} : un repère, pas une promesse</h2>
          <p>
            La règle dite des {pct(tauxRetrait)} suggère de retirer chaque année{" "}
            {pct(tauxRetrait)} du capital initial, puis de revaloriser ce montant de l'inflation.
            Elle est née d'études de marchés américains sur de longues périodes ; elle n'a pas la
            valeur d'une loi, et sa transposition à votre situation demande de la prudence.
          </p>
          <p>
            Avec les hypothèses de ce guide ({pct(rendDecaissement)} net, inflation de{" "}
            {pct(inflation)}, {duree} ans), des retraits de {pct(tauxRetrait)} du capital initial,
            indexés chaque année, laisseraient environ {euros(soldeApresRetraitsIndexes)} sur{" "}
            {euros(capitalRef)} au bout de {duree} ans : le capital n'est pas épuisé, la marge
            existe. Mais elle repose sur un rendement régulier. Quatre limites à garder en tête :
          </p>
          <ul>
            <li>
              <strong>La durée.</strong> Partir à {ageDepart} ans, c'est parfois financer plus de{" "}
              {duree} ans : l'espérance de vie à 65 ans est de l'ordre de{" "}
              {DECUMULATION.esperanceVie65.hommes} ans pour les hommes et{" "}
              {DECUMULATION.esperanceVie65.femmes} ans pour les femmes, avec une forte dispersion.
            </li>
            <li>
              <strong>La séquence des rendements.</strong> Une forte baisse des marchés dans les
              premières années de retraits pèse bien plus que la même baisse vingt ans plus tard.
            </li>
            <li>
              <strong>L'inflation.</strong> Elle ronge un revenu fixe ; l'indexer coûte du capital.
            </li>
            <li>
              <strong>La fiscalité.</strong> Le repère s'applique à un montant brut ; selon
              l'enveloppe, une part des retraits repart en impôt et en prélèvements sociaux.
            </li>
          </ul>
          <p>
            À {pct(tauxRetrait)}, un capital de {euros(capitalRef)} soutient donc environ{" "}
            {euros(gRef.regle)} par mois en brut. C'est un point de départ pour dimensionner un
            objectif, non un revenu à budgéter les yeux fermés.
          </p>

          <h2 id="rente">Et si l'on convertit le capital en rente viagère ?</h2>
          <p>
            La rente viagère répond à une autre question : non plus « combien puis-je retirer
            sans épuiser mon capital ? » mais « combien vais-je percevoir tant que je vis ? ». À
            65 ans, les barèmes de conversion des assureurs se situent grosso modo entre{" "}
            {pct(convMin)} et {pct(convMax)} du capital par an, sans réversion (ordre de grandeur,
            variable selon le contrat, l'âge et les options).
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Capital converti</th>
                  <th>Rente mensuelle à {pct(convMin)}</th>
                  <th>Rente mensuelle à {pct(convMax)}</th>
                </tr>
              </thead>
              <tbody>
                {grille.map((g) => (
                  <tr key={g.capital}>
                    <td>{euros(g.capital)}</td>
                    <td>{euros(g.renteMin)} / mois</td>
                    <td>{euros(g.renteMax)} / mois</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Ces montants atteignent ou dépassent ceux du repère des {pct(tauxRetrait)} parce que la rente
            mutualise le risque de longévité : l'assureur garantit un revenu à vie, mais le capital
            converti est en principe perdu pour les héritiers, et la rente n'est pas toujours
            revalorisée. Le choix entre rente et retraits est détaillé dans notre comparatif{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">
              rente viagère ou retraits programmés
            </a>
            .
          </p>

          <h2 id="enveloppes">Comment construire ce capital : PER, assurance-vie, PEA</h2>
          <p>
            Il n'existe pas de « meilleure » enveloppe dans l'absolu : chacune joue un rôle
            différent dans la construction, et la plupart des patrimoines équilibrés en combinent
            au moins deux. Notre guide{" "}
            <a href="/guide/meilleure-enveloppe-retraite">quelle est la meilleure enveloppe pour préparer sa retraite</a>{" "}
            compare les trois en détail ; voici leur rôle dans la construction d'un capital.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Enveloppe</th>
                  <th>Rôle dans la construction</th>
                  <th>Point d'attention</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PER</td>
                  <td>
                    Discipline d'épargne et déduction possible des versements du revenu imposable
                    (pour qui est imposable) ; capital bloqué jusqu'à la retraite, sauf cas de
                    déblocage anticipé
                  </td>
                  <td>
                    Sortie imposée (capital ou rente) ; prélèvements sociaux de {pct(psPer)} sur les
                    gains. Voir <a href="/strategies/per">la stratégie PER</a>
                  </td>
                </tr>
                <tr>
                  <td>Assurance-vie</td>
                  <td>
                    Enveloppe polyvalente et disponible : fonds en euros pour la part sécurisée,
                    unités de compte pour la part dynamique ; cadre successoral favorable
                  </td>
                  <td>
                    Fiscalité des gains à la sortie, plus douce après {AV_RACHAT.dureeTauxReduitAnnees}{" "}
                    ans ; prélèvements sociaux de {pct(psAv)}. Voir{" "}
                    <a href="/strategies/assurance-vie-retraite">l'assurance-vie pour la retraite</a>
                  </td>
                </tr>
                <tr>
                  <td>PEA</td>
                  <td>
                    Capital investi en actions européennes, bien adapté à la phase de constitution
                    sur longue durée ; exonération d'impôt sur le revenu des gains après{" "}
                    {FISCALITE.peaExonerationIRApres} ans (prélèvements sociaux dus)
                  </td>
                  <td>
                    Pas de déduction à l'entrée, risque de perte en capital. Voir{" "}
                    <a href="/strategies/pea-retraite">le PEA pour la retraite</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Le choix de la répartition dépend de votre tranche d'imposition, de votre horizon, de
            votre tolérance au risque et de vos objectifs de transmission : ce n'est pas un
            réglage universel. Ce qui est universel, c'est que la phase de construction prépare
            la phase de retrait : un capital réparti entre enveloppes offre plus de souplesse pour
            piloter l'impôt à la sortie. L'ordre dans lequel puiser est traité dans{" "}
            <a href="/guide/ordre-de-decaissement-retraite">
              dans quel ordre retirer son épargne à la retraite
            </a>
            , et la mécanique globale dans notre page{" "}
            <a href="/strategies/decumulation">décumulation</a>.
          </p>

          <h2 id="trajectoire">Quelle trajectoire pour y arriver ?</h2>
          <p>
            Pour mesurer l'effet du temps, prenons un objectif volontairement modeste, un capital
            de {euros(capitalTraj)}, et voyons le versement mensuel qui l'atteindrait selon la
            durée de constitution et un rendement net annuel constant, scénario illustratif et
            non une prévision.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Durée de constitution</th>
                  {rendements.map((t) => (
                    <th key={t}>Rendement net {pct(t)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trajectoire.map((l) => (
                  <tr key={l.h}>
                    <td>{l.h} ans</td>
                    {l.parRendement.map((v, i) => (
                      <td key={rendements[i]}>{euros(v)} / mois</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Deux enseignements. D'abord, la durée pèse plus lourd que le rendement : allonger la
            constitution de {horizons[0]} à {horizons[1]} ans divise presque l'effort par deux, à
            rendement égal. Ensuite, les écarts entre scénarios de rendement sont réels mais moins
            décisifs que l'on ne le croit, alors que la fourchette de long terme que l'on observe
            sur les actions ({pct(RENDEMENTS.ucActionsLongTerme.min)} à{" "}
            {pct(RENDEMENTS.ucActionsLongTerme.max)} par an en moyenne historique, avant frais et
            fiscalité) s'accompagne d'années négatives. Pour un objectif plus élevé, multipliez
            simplement : les montants sont proportionnels au capital visé. L'effort mensuel selon
            votre âge est traité dans notre guide{" "}
            <a href="/guide/combien-epargner-par-mois-pour-la-retraite-selon-age">
              combien épargner par mois selon l'âge
            </a>
            , et le <a href="/simulateur-retraite">simulateur de retraite</a> permet de tester vos
            propres paramètres.
          </p>

          <h2 id="erreurs">Les erreurs qui faussent l'objectif</h2>
          <ul>
            <li>
              <strong>Viser un capital sans revenu cible.</strong> Un montant rond ne dit pas si
              votre écart de pension sera couvert.
            </li>
            <li>
              <strong>Oublier la fiscalité de sortie.</strong> {euros(capitalRef)} dans un PER, une
              assurance-vie ou un PEA ne donnent pas le même revenu net.
            </li>
            <li>
              <strong>Confondre capital et épargne de précaution.</strong> L'argent qui doit
              rester disponible pour les imprévus n'appartient pas au capital retraite.
            </li>
            <li>
              <strong>Tout miser sur un rendement moyen.</strong> Une moyenne ne protège pas d'une
              mauvaise séquence au moment du départ.
            </li>
            <li>
              <strong>Attendre la certitude.</strong> Le calcul est imparfait par nature ; un
              objectif approximatif révisé chaque année vaut mieux qu'un calcul parfait jamais fait.
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Quel capital faut-il avoir à la retraite ?</h3>
          <p>
            Il n'y a pas de montant universel. Un repère consiste à multiplier le complément
            annuel visé par un facteur lié à la durée et au mode de sortie : environ{" "}
            {Math.round(100 / tauxRetrait)} fois le complément annuel avec le repère des{" "}
            {pct(tauxRetrait)}, et {Math.round(100 / convMax)} à {Math.round(100 / convMin)} fois
            avec une rente viagère. À titre d'exemple, un complément de{" "}
            {euros(EX.complementsMensuelsCibles[1])} par mois, soit{" "}
            {euros(EX.complementsMensuelsCibles[1] * 12)} par an, appelle de l'ordre de{" "}
            {euros(EX.complementsMensuelsCibles[1] * 12 * Math.round(100 / tauxRetrait))} avec le
            repère des {pct(tauxRetrait)}. Ce n'est pas un conseil personnalisé.
          </p>

          <h3>La règle des {pct(tauxRetrait)} est-elle fiable en France ?</h3>
          <p>
            Elle reste un repère, pas une garantie. Elle a été construite sur des marchés
            américains ; la fiscalité française, l'inflation, la durée de la retraite et le
            niveau de frais modifient le résultat. Utilisez-la pour dimensionner un ordre de
            grandeur, puis vérifiez-la avec vos propres hypothèses.
          </p>

          <h3>Vaut-il mieux une rente ou des retraits sur le capital ?</h3>
          <p>
            La rente sécurise un revenu à vie mais fige le capital ; les retraits conservent la
            souplesse et la transmission, au prix d'un risque de marché et de longévité. Beaucoup de
            situations combinent les deux. Le détail est dans{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">notre comparatif</a>.
          </p>

          <h3>Dans quelle enveloppe commencer à construire son capital ?</h3>
          <p>
            Cela dépend de votre imposition, de votre horizon et de votre besoin de disponibilité.
            Le PER est surtout utile pour qui est imposé ; l'assurance-vie et le PEA offrent plus
            de souplesse. Voir{" "}
            <a href="/guide/meilleure-enveloppe-retraite">notre comparatif des enveloppes</a>.
          </p>

          <h3>Le capital retraite est-il imposé quand je le retire ?</h3>
          <p>
            Oui, selon l'enveloppe : sortie du PER soumise à l'impôt sur le revenu (sur le capital
            versé déduit) et aux prélèvements sociaux sur les gains ; gains d'assurance-vie imposés
            selon l'ancienneté du contrat ; gains du PEA exonérés d'impôt sur le revenu après{" "}
            {FISCALITE.peaExonerationIRApres} ans mais soumis aux prélèvements sociaux. Les taux
            sont rappelés dans les sources ci-dessous.
          </p>

          <h3>À partir de quand ajuster son objectif ?</h3>
          <p>
            Au moins une fois par an, et à chaque changement de situation (revenu, famille,
            projet immobilier, réforme). Plus le départ approche, plus l'écart entre objectif et
            réalité doit être surveillé et la part sécurisée du capital réexaminée.
          </p>

          <h3>Le logement compte-t-il dans le capital retraite ?</h3>
          <p>
            La résidence principale occupée ne produit pas de revenu : elle réduit vos dépenses
            (pas de loyer), mais elle n'est pas un capital de complément de revenu. Un bien
            locatif, lui, peut en faire partie, avec ses risques propres (vacance, travaux,
            fiscalité). Voir <a href="/strategies/immobilier-retraite">immobilier et retraite</a>.
          </p>

          <h3>Que faire si mon capital cible paraît hors de portée ?</h3>
          <p>
            Agir sur les trois leviers : durée (décaler le départ), effort (augmenter le versement
            quand le budget le permet) et objectif (ajuster le revenu visé). Un objectif réduit mais
            atteint vaut mieux qu'un objectif ambitieux abandonné.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Un capital retraite se pense à l'envers : on part du revenu que l'on veut financer, on
            en déduit un ordre de grandeur de capital avec une marge de prudence, puis on construit
            ce capital par étapes, dans plusieurs enveloppes, en laissant au temps le rôle
            principal. Avec les hypothèses de ce guide, {euros(capitalRef)} financent de l'ordre de{" "}
            {euros(Math.min(gRef.regle, gRef.annuiteFixe, gRef.annuiteIndexee))} à{" "}
            {euros(Math.max(gRef.regle, gRef.annuiteFixe, gRef.annuiteIndexee))} par mois pendant{" "}
            {duree} ans : un complément, pas un salaire de remplacement. Pour chiffrer votre
            propre objectif à partir de vos droits réels, commencez par la méthode de{" "}
            <a href="/guide/combien-faut-il-epargner-pour-la-retraite">combien faut-il épargner</a>, testez
            vos paramètres dans le <a href="/simulateur-retraite">simulateur de retraite</a>, puis
            faites le point lors d'un <a href="/bilan-retraite">bilan retraite gratuit</a>.
          </p>

          <h2 id="sources">Sources</h2>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les
              montants sont des illustrations pédagogiques ({EX.maj}) : ils ne garantissent
              aucun rendement, et les placements en unités de compte ou en actions présentent un
              risque de perte en capital. Les règles fiscales citées sont celles en vigueur à
              cette date et peuvent évoluer.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Votre objectif de capital se calcule à partir de vos chiffres, pas de moyennes." />
    </>
  );
}
