import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { RETRAIT_CAPITAL, RENDEMENTS, DECUMULATION, euros, pct } from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const R = RETRAIT_CAPITAL;
const C = R.capitalIllustratif;
const rendement = DECUMULATION.rendementCapitalPendantRetraits; // % par an
const inflation = RENDEMENTS.inflationLongTerme.moyen; // % par an
const fondsEuros = RENDEMENTS.fondsEuros;
const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + " %";

// ---- Grille taux de retrait -> revenu ----
const retraitAnnuel = (taux) => (C * taux) / 100;
const retraitMensuel = (taux) => retraitAnnuel(taux) / 12;

// Nombre d'années pendant lesquelles le retrait annuel complet peut être versé
// (retrait en début d'année, puis capital restant placé au rendement d'hypothèse).
// Plafonné à 60 ans pour la lecture.
const PLAFOND_ANNEES = 60;
const anneesDeTenue = (taux, indexe) => {
  let capital = C;
  let retrait = retraitAnnuel(taux);
  let n = 0;
  while (n < PLAFOND_ANNEES && capital >= retrait) {
    capital = (capital - retrait) * (1 + rendement / 100);
    if (indexe) retrait *= 1 + inflation / 100;
    n += 1;
  }
  return n;
};
const libelleAnnees = (n) => (n >= PLAFOND_ANNEES ? `plus de ${PLAFOND_ANNEES} ans` : `${n} ans`);

// ---- Risque de séquence : mêmes rendements, ordre inversé ----
const W = R.retraitAnnuelSequence;
const evolution = (sequence, reductionApresBaisse = 0) => {
  let capital = C;
  let baissePrecedente = false;
  return sequence.map((r) => {
    const retrait = baissePrecedente ? W * (1 - reductionApresBaisse / 100) : W;
    capital = Math.max(capital - retrait, 0) * (1 + r / 100);
    baissePrecedente = r < 0;
    return capital;
  });
};
const moyenne = (s) => s.reduce((a, b) => a + b, 0) / s.length;
const evolDefavorable = evolution(R.sequenceDefavorable);
const evolFavorable = evolution(R.sequenceFavorable);
const dernier = (t) => t[t.length - 1];
const ecartFinal = dernier(evolFavorable) - dernier(evolDefavorable);
const tauxSequence = (W / C) * 100;
const nbAnnees = R.sequenceDefavorable.length;

// ---- Retrait ajusté : réduction l'année qui suit une année négative ----
const REDUCTION_AJUSTEMENT = 10; // % — paramètre pédagogique de l'exemple
const evolDefavorableAjustee = evolution(R.sequenceDefavorable, REDUCTION_AJUSTEMENT);
const gainAjustement = dernier(evolDefavorableAjustee) - dernier(evolDefavorable);
const retraitReduit = (W * (100 - REDUCTION_AJUSTEMENT)) / 100;

// ---- Poche de sécurité : n années de retraits tenues en fonds euros ----
const pocheAnnees = [1, 2, 3];
const poche = (n) => n * W;

const sources = [
  {
    label: "W. Bengen, « Determining Withdrawal Rates Using Historical Data », Journal of Financial Planning, octobre 1994 (étude à l'origine de la « règle des 4 % »)",
  },
  {
    label: "P. Cooley, C. Hubbard et D. Walz, étude dite « Trinity » sur les taux de retrait soutenables, 1998",
  },
  {
    label: "Autorité des marchés financiers (AMF) — Épargner et investir : risques, horizon de placement et diversification",
    url: "https://www.amf-france.org",
  },
  {
    label: "INSEE — Espérance de vie à 65 ans, statistiques démographiques",
    url: "https://www.insee.fr",
  },
  {
    label: "France Assureurs — Rendement des fonds en euros des contrats d'assurance-vie",
    url: "https://www.franceassureurs.fr",
  },
  {
    label: "Service-Public.gouv.fr — Assurance-vie : rachat partiel et fiscalité, rubrique Argent",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits",
  },
];

export default function GuideCombienRetirerCapital() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Décumulation · retraits sur capital</span>
          <h1>Combien retirer par mois d'un capital retraite ?</h1>
          <p className="sub">
            Règle des 4 %, risque de séquence, poche de sécurité : comment un taux de retrait se
            transforme en revenu mensuel, et ce qui peut le faire dérailler. Mis à jour le{" "}
            {R.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> sur un capital de {euros(C)}, un retrait initial de{" "}
              {pct(R.tauxRegle4Pct)} par an représente {euros(retraitMensuel(R.tauxRegle4Pct))} par
              mois. Cette « règle des {R.tauxRegle4Pct} % » est un repère issu d'études
              américaines sur des horizons d'environ {R.horizonRegleAnnees} ans ; elle ne se
              transpose pas telle quelle à une épargne française ni à l'avenir. Le vrai danger
              n'est pas la moyenne des rendements mais leur ordre : de mauvaises années en début de
              retraite pèsent beaucoup plus que les mêmes années à la fin.
            </p>
          </div>

          <p>
            Vous avez constitué un capital, par un PER, une assurance-vie ou un PEA, et la
            question change de nature : il ne s'agit plus d'épargner, mais de vivre de cette
            épargne sans la voir s'épuiser trop vite. Combien retirer chaque mois ? Trop peu, et
            l'on se prive inutilement ; trop, et le capital fond avant la fin de la retraite.
          </p>
          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel :
            Hélène, 65 ans, dispose d'un capital de {euros(C)} réparti entre une assurance-vie et
            un PER. Elle voudrait un complément régulier à sa pension, sans savoir quel montant
            est « raisonnable ». Cet article donne des repères de calcul pour poser la question
            correctement ; il ne dit pas quel montant retenir, ce qui dépend de sa situation
            d'ensemble.
          </p>
          <p>
            Pour comparer avec une rente à vie, nous renvoyons vers{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">
              notre comparaison entre rente viagère et retraits programmés
            </a>
            . Ici, nous nous concentrons sur le capital qui reste investi et sur le taux de
            retrait.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#regle-4">D'où vient la règle des 4 % et que dit-elle vraiment ?</a></li>
              <li><a href="#limites">Pourquoi la règle des 4 % n'est-elle pas transposable telle quelle ?</a></li>
              <li><a href="#grille">Quel revenu mensuel pour chaque taux de retrait ?</a></li>
              <li><a href="#sequence">Qu'est-ce que le risque de séquence des rendements ?</a></li>
              <li><a href="#poche">À quoi sert une poche de sécurité en fonds euros ?</a></li>
              <li><a href="#ajustes">Pourquoi ajuster ses retraits plutôt que les figer ?</a></li>
              <li><a href="#programmes">Comment organiser concrètement des retraits réguliers ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="regle-4">D'où vient la règle des 4 % et que dit-elle vraiment ?</h2>
          <p>
            La règle des {R.tauxRegle4Pct} % remonte aux travaux de l'ingénieur-conseil américain
            William Bengen (1994), prolongés par l'étude dite « Trinity » (Cooley, Hubbard et
            Walz, 1998). Ces recherches ont testé, sur des séries historiques de rendements
            américains, quel retrait initial un portefeuille mêlant actions et obligations aurait
            pu soutenir pendant environ {R.horizonRegleAnnees} ans.
          </p>
          <p>
            L'énoncé est précis : la première année, on retire {pct(R.tauxRegle4Pct)} du capital
            de départ ; les années suivantes, on revalorise ce montant en fonction de l'inflation,
            sans tenir compte de la valeur du portefeuille. Sur un capital de {euros(C)}, cela donne{" "}
            {euros(retraitAnnuel(R.tauxRegle4Pct))} la première année, soit{" "}
            {euros(retraitMensuel(R.tauxRegle4Pct))} par mois, puis davantage chaque année si les
            prix montent.
          </p>
          <p>
            Ce que la règle ne dit pas est tout aussi important. Elle décrit ce qui a fonctionné
            dans un passé donné sur un marché donné ; elle ne garantit rien pour la suite, et
            encore moins pour un portefeuille composé autrement.
          </p>

          <h2 id="limites">Pourquoi la règle des 4 % n'est-elle pas transposable telle quelle ?</h2>
          <p>
            Plusieurs différences invitent à la prudence avant d'appliquer ce chiffre à une
            retraite française :
          </p>
          <ul>
            <li>
              <strong>Un marché particulier.</strong> Les séries utilisées sont américaines,
              dans une période où les actions américaines ont été très favorables. Rien n'assure
              que les rendements futurs, en France ou ailleurs, les reproduisent.
            </li>
            <li>
              <strong>Un portefeuille type.</strong> Les études supposent une allocation
              diversifiée avec une part significative d'actions. Une épargne placée surtout en
              fonds euros n'a ni le même potentiel ni le même profil de risque.
            </li>
            <li>
              <strong>Un horizon de {R.horizonRegleAnnees} ans.</strong> Selon l'âge de départ,
              l'horizon réel peut être plus court ou plus long. À titre de repère, l'INSEE publie
              une espérance de vie à 65 ans d'environ {DECUMULATION.esperanceVie65.hommes} ans
              pour les hommes et {DECUMULATION.esperanceVie65.femmes} ans pour les femmes ; il
              s'agit de moyennes, et une partie des retraités vivra bien au-delà.
            </li>
            <li>
              <strong>Des frais et une fiscalité ignorés.</strong> Les frais de gestion, la
              fiscalité des retraits et les prélèvements sociaux réduisent le revenu disponible.
              Ils dépendent de l'enveloppe : voir{" "}
              <a href="/guide/ordre-de-decaissement-retraite">
                l'ordre de décaissement entre PER, assurance-vie et PEA
              </a>
              .
            </li>
            <li>
              <strong>Un comportement idéalisé.</strong> La règle suppose de ne jamais modifier
              ses retraits, même après une chute des marchés, ce qui est psychologiquement
              difficile.
            </li>
          </ul>
          <div className="note">
            <p>
              À retenir : {pct(R.tauxRegle4Pct)} est un point de repère pour discuter, pas un
              taux « sûr ». Selon l'âge, l'horizon, l'allocation et la tolérance au risque, le
              taux soutenable peut être sensiblement plus bas ou plus haut. L'évaluer se fait au
              cas par cas.
            </p>
          </div>

          <h2 id="grille">Quel revenu mensuel pour chaque taux de retrait ?</h2>
          <p>
            Le calcul de base est simple : revenu annuel = capital × taux de retrait, et revenu
            mensuel = revenu annuel ÷ 12. Le tableau ci-dessous l'applique à un capital de{" "}
            {euros(C)}. Les deux dernières colonnes estiment, avec une hypothèse de rendement de{" "}
            {pct1(rendement)} par an sur le capital restant (illustrative, sans lien avec une
            performance passée ou à venir), pendant combien d'années le retrait complet pourrait
            être versé, d'abord avec un montant fixe, puis avec un montant revalorisé de{" "}
            {pct1(inflation)} par an (inflation d'hypothèse, correspondant à l'objectif de la
            Banque centrale européenne).
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Taux de retrait initial</th>
                  <th>Retrait annuel</th>
                  <th>Revenu mensuel</th>
                  <th>Durée de tenue, montant fixe</th>
                  <th>Durée de tenue, montant indexé</th>
                </tr>
              </thead>
              <tbody>
                {R.tauxRetraitGrille.map((taux) => (
                  <tr key={taux}>
                    <td>{pct(taux)}</td>
                    <td>{euros(retraitAnnuel(taux))}</td>
                    <td>{euros(retraitMensuel(taux))}</td>
                    <td>{libelleAnnees(anneesDeTenue(taux, false))}</td>
                    <td>{libelleAnnees(anneesDeTenue(taux, true))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Deux lectures s'imposent. D'abord, la revalorisation du montant raccourcit nettement
            la durée de tenue : un revenu qui suit les prix demande davantage au capital qu'un
            revenu figé, dont le pouvoir d'achat s'érode. Ensuite, ces durées reposent sur un
            rendement constant, qui n'existe pas : l'étape suivante montre ce que change une
            évolution irrégulière. Les montants sont bruts de prélèvements ; la fiscalité
            applicable aux retraits dépend de l'enveloppe, comme l'explique notre guide sur{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">
              le rachat partiel d'assurance-vie
            </a>
            .
          </p>

          <h2 id="sequence">Qu'est-ce que le risque de séquence des rendements ?</h2>
          <p>
            Le risque de séquence désigne l'effet de l'ordre des rendements quand on retire de
            l'argent. Pendant la phase d'épargne, l'ordre n'a pas d'importance : la même suite de
            rendements, mélangée autrement, donne le même capital final. Pendant les retraits, c'est
            faux : retirer des sommes fixes d'un capital qui vient de baisser force à vendre des
            parts à bas prix, et ces parts ne participent plus au rebond.
          </p>
          <p>
            Illustrons-le sur {nbAnnees} ans. Capital de départ : {euros(C)}. Retrait annuel fixe
            : {euros(W)} en début d'année, soit {pct1(tauxSequence)} du capital initial. Deux
            séries de rendements purement illustratives, non historiques : les mêmes {nbAnnees}{" "}
            rendements annuels (moyenne arithmétique de{" "}
            {pct1(moyenne(R.sequenceDefavorable))}), dans un cas avec les années négatives en
            premier, dans l'autre avec les années négatives à la fin.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Année</th>
                  <th>Rendement, séquence défavorable</th>
                  <th>Capital en fin d'année</th>
                  <th>Rendement, séquence favorable</th>
                  <th>Capital en fin d'année</th>
                </tr>
              </thead>
              <tbody>
                {R.sequenceDefavorable.map((rd, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{pct(rd)}</td>
                    <td>{euros(evolDefavorable[i])}</td>
                    <td>{pct(R.sequenceFavorable[i])}</td>
                    <td>{euros(evolFavorable[i])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Au bout de {nbAnnees} ans, le capital atteint {euros(dernier(evolFavorable))} dans la
            séquence favorable et {euros(dernier(evolDefavorable))} dans la séquence défavorable,
            soit un écart de {euros(ecartFinal)} avec exactement les mêmes rendements annuels. Les
            retraits cumulés sont identiques ({euros(W * nbAnnees)}) : seul l'ordre diffère. Avec
            la séquence favorable, le capital est même au plus haut avant les deux dernières
            années ; avec la défavorable, le capital tombe à {euros(evolDefavorable[0])} dès la
            première année et ne retrouve jamais son niveau de départ.
          </p>
          <div className="note">
            <p>
              Exemple pédagogique : les rendements annuels ci-dessus sont inventés pour illustrer
              le mécanisme et ne représentent ni une prévision ni une performance passée. Ils
              rappellent surtout que les rendements passés ne préjugent pas des rendements futurs,
              et que la valeur d'un placement en unités de compte peut baisser comme monter, avec
              un risque de perte en capital.
            </p>
          </div>
          <p>
            La leçon pratique est que les premières années de retraite comptent plus que les
            suivantes. D'où l'intérêt de ne pas dépendre entièrement des marchés au moment où
            l'on commence à retirer.
          </p>

          <h2 id="poche">À quoi sert une poche de sécurité en fonds euros ?</h2>
          <p>
            Une réponse classique au risque de séquence consiste à isoler une « poche de sécurité »
            : une réserve placée sur un support peu volatil, comme le fonds en euros d'un contrat
            d'assurance-vie, qui sert à financer les retraits pendant que la partie investie en
            actifs plus risqués se redresse. On évite ainsi de vendre au plus bas.
          </p>
          <p>
            Cette réserve se dimensionne en années de retraits. Avec le retrait annuel de{" "}
            {euros(W)} de l'exemple :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Poche exprimée en</th>
                  <th>Montant à mettre de côté</th>
                  <th>En part du capital de {euros(C)}</th>
                </tr>
              </thead>
              <tbody>
                {pocheAnnees.map((n) => (
                  <tr key={n}>
                    <td>{n} an{n > 1 ? "s" : ""} de retraits</td>
                    <td>{euros(poche(n))}</td>
                    <td>{pct1((poche(n) / C) * 100)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Cette poche a un coût : à titre de repère, le rendement moyen des fonds en euros a été
            de {pct1(fondsEuros.moyen)} en {fondsEuros.periode} (moyenne de marché, net de frais de
            gestion, avant prélèvements sociaux ; les écarts entre contrats sont importants, de{" "}
            {pct1(fondsEuros.min)} à {pct1(fondsEuros.max)} selon les cas), et ce rendement passé
            ne préjuge pas de l'avenir. Elle limite aussi le potentiel de la partie investie. La
            bonne taille dépend de l'horizon, de la tolérance au risque et des autres revenus ; il
            n'existe pas de proportion universelle. Cette stratégie en deux poches est
            développée dans nos pages sur{" "}
            <a href="/strategies/decumulation">la décumulation</a> et sur{" "}
            <a href="/strategies/assurance-vie-retraite">l'assurance-vie pour la retraite</a>.
          </p>

          <h2 id="ajustes">Pourquoi ajuster ses retraits plutôt que les figer ?</h2>
          <p>
            La règle des {R.tauxRegle4Pct} % repose sur un retrait mécanique. Dans la réalité,
            beaucoup de retraités peuvent faire varier leur dépense : réduire un peu l'année qui
            suit une forte baisse, ne pas revaloriser un exercice, puis reprendre quand la situation
            se redresse. Ces « retraits ajustés » réduisent le risque de séquence, au prix d'un
            revenu moins prévisible.
          </p>
          <p>
            Dans la séquence défavorable de l'exemple, supposons que le retrait soit réduit de{" "}
            {REDUCTION_AJUSTEMENT} % (soit {euros(retraitReduit)} au lieu de {euros(W)}) l'année qui
            suit une année négative. Le capital final passe de {euros(dernier(evolDefavorable))} à{" "}
            {euros(dernier(evolDefavorableAjustee))}, soit {euros(gainAjustement)} de plus. L'effet
            reste limité sur cet exemple, mais il s'amplifie quand la période difficile se
            prolonge, et la réduction est d'autant plus facile à absorber que les dépenses
            contraintes sont couvertes par des revenus stables, comme la pension. Le niveau
            d'ajustement acceptable est une décision personnelle.
          </p>

          <h2 id="programmes">Comment organiser concrètement des retraits réguliers ?</h2>
          <p>
            Sur une assurance-vie, les retraits réguliers prennent la forme de rachats programmés
            : le contrat verse automatiquement un montant à la fréquence choisie. Le revenu est
            alors versé selon le rythme prévu, mais la valeur du contrat varie avec les supports.
            Notre guide sur{" "}
            <a href="/guide/rachats-programmes-assurance-vie-retraite">les rachats programmés d'assurance-vie</a>{" "}
            en détaille le fonctionnement ; la fiscalité de chaque retrait, qui
            combine part de capital et part de gains, est décrite dans notre page sur{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">
              l'imposition du rachat partiel
            </a>
            .
          </p>
          <p>
            Pour les sommes détenues sur un PER, la sortie obéit à d'autres règles, qu'expose notre
            guide sur{" "}
            <a href="/guide/fiscalite-sortie-per">la fiscalité de la sortie du PER</a> ; sur un
            PEA, voir <a href="/strategies/pea-retraite">le PEA pour la retraite</a>. Enfin, si
            vous cherchez un revenu garanti à vie plutôt qu'un capital à gérer, la contrepartie
            est exposée dans{" "}
            <a href="/guide/inconvenients-rente-viagere">les inconvénients de la rente viagère</a>.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Combien puis-je retirer par mois avec 300 000 € ?</h3>
          <p>
            Cela dépend du taux de retrait retenu : avec la grille ci-dessus, de{" "}
            {euros(retraitMensuel(R.tauxRetraitGrille[0]))} par mois à{" "}
            {pct(R.tauxRetraitGrille[0])} à{" "}
            {euros(retraitMensuel(R.tauxRetraitGrille[R.tauxRetraitGrille.length - 1]))} à{" "}
            {pct(R.tauxRetraitGrille[R.tauxRetraitGrille.length - 1])}. Plus le taux est élevé,
            plus le capital s'épuise vite. Le niveau adapté se détermine au cas par cas.
          </p>
          <h3>La règle des 4 % est-elle fiable en France ?</h3>
          <p>
            Elle n'a pas été établie sur des données françaises et ne constitue pas une garantie.
            C'est un repère de discussion, à confronter à votre horizon, à votre allocation et à vos
            autres revenus.
          </p>
          <h3>Quel taux de retrait pour une retraite de 30 ans ?</h3>
          <p>
            L'horizon de {R.horizonRegleAnnees} ans est celui des études à l'origine de la règle
            des {R.tauxRegle4Pct} %. Les taux soutenables varient selon la période étudiée et
            l'allocation. Plus l'horizon est long, plus le taux prudent est bas.
          </p>
          <h3>Qu'est-ce que le risque de séquence ?</h3>
          <p>
            C'est le risque que de mauvais rendements surviennent au début de la période de
            retraits. Les mêmes rendements dans un ordre différent donnent des capitaux finaux
            différents quand on retire régulièrement de l'argent.
          </p>
          <h3>Faut-il garder une partie en fonds euros à la retraite ?</h3>
          <p>
            Une poche en fonds euros peut financer les retraits quelques années et éviter de vendre
            des supports risqués après une baisse. Sa taille dépend de chacun ; elle réduit aussi le
            rendement potentiel de l'ensemble.
          </p>
          <h3>Un retrait indexé sur l'inflation est-il préférable à un retrait fixe ?</h3>
          <p>
            Un montant indexé protège le pouvoir d'achat, mais consomme le capital plus vite, comme
            le montre la grille. Un montant fixe dure plus longtemps mais perd en pouvoir d'achat
            avec l'inflation.
          </p>
          <h3>Mon capital peut-il être épuisé avant la fin de ma retraite ?</h3>
          <p>
            Oui, notamment si le taux de retrait est élevé, si les marchés baissent au début de la
            période ou si l'horizon dépasse l'espérance de vie moyenne. C'est le risque de longévité
            : il se pilote par le niveau de retrait, des ajustements ou une partie du capital
            convertie en rente.
          </p>
          <h3>Vaut-il mieux une rente viagère ou des retraits ?</h3>
          <p>
            Ce n'est pas la même promesse : la rente couvre la durée de vie mais immobilise le
            capital, les retraits gardent la souplesse mais portent le risque. Notre{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">comparaison détaillée</a> en
            expose les critères.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Passer d'un capital à un revenu mensuel est un calcul simple ; le rendre soutenable
            sur toute la retraite ne l'est pas. La règle des {R.tauxRegle4Pct} % offre un ordre de
            grandeur utile pour commencer, mais elle vient d'un contexte précis et ne remplace
            pas une analyse personnelle.
          </p>
          <p>
            Trois leviers atténuent le risque : un taux de retrait prudent, une réserve de sécurité
            pour ne pas vendre au plus bas, et la souplesse d'ajuster ses retraits quand les marchés
            baissent. À l'inverse, un retrait élevé, figé et entièrement exposé aux marchés réunit
            les conditions du risque de séquence.
          </p>
          <p>
            Pour situer votre propre cas, notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> estime le revenu que peut
            produire un capital selon plusieurs hypothèses ; le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> permet de replacer
            cette réflexion dans l'ensemble de vos revenus et de votre patrimoine.
          </p>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources et références consultées en {R.maj} :</p>
          <ul>
            {sources.map((src) => (
              <li key={src.label}>
                {src.url ? (
                  <a href={src.url} target="_blank" rel="noopener noreferrer">
                    {src.label}
                  </a>
                ) : (
                  src.label
                )}
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les exemples
              chiffrés sont des illustrations pédagogiques établies sur des hypothèses affichées
              (capital, rendements, retraits), qui ne préjugent ni de votre situation ni des
              résultats futurs. Les rendements passés ne préjugent pas des rendements futurs ; les
              supports en unités de compte présentent un risque de perte en capital. Les montants
              sont bruts de fiscalité. Pour toute décision, faites confirmer votre situation par un
              professionnel.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Transformer un capital en revenu se calcule avant de commencer à retirer." />
    </>
  );
}
