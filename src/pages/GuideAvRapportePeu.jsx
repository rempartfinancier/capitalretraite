import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { SimulateurCapitalisation } from "../components/Simulateurs.jsx";
import {
  RENDEMENTS,
  FRAIS_TYPES,
  FISCALITE,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

// Moyenne d'une fourchette { min, max } de hypotheses.js.
const moy = (fourchette) => (fourchette.min + fourchette.max) / 2;

// Frais annuels cumulés typiques (frais du contrat + frais des supports),
// milieu de fourchette — recalculés automatiquement depuis hypotheses.js.
const fraisBancaireAnnuel =
  moy(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle) +
  moy(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports);
const fraisInternetAnnuel =
  moy(FRAIS_TYPES.contratInternet.gestionAnnuelle) +
  moy(FRAIS_TYPES.contratInternet.fraisSupports);

// Capitalisation d'une somme unique à taux constant (hypothèse illustrative).
const croissance = (capital, tauxPct, annees) =>
  capital * Math.pow(1 + tauxPct / 100, annees);

// Rendement du fonds en euros après prélèvements sociaux annuels (taux
// assurance-vie, non concerné par la hausse LFSS 2026 réservée à d'autres
// enveloppes).
const fondsEurosNetPS =
  RENDEMENTS.fondsEuros.moyen * (1 - FISCALITE.prelevementsSociaux.assuranceVie / 100);

export default function GuideAvRapportePeu() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Article phare</span>
          <h1>Pourquoi votre assurance-vie rapporte si peu — et comment le vérifier</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <p>
            Votre contrat d'assurance-vie a peut-être dix ans, quinze ans. Vous avez versé avec
            régularité, sans jamais rien faire d'imprudent — et pourtant, le relevé annuel affiche
            une progression à peine perceptible. Première chose à savoir : ce n'est ni une
            fatalité, ni, le plus souvent, une exception. C'est mécanique. Et ce qui est mécanique
            s'explique, se vérifie et se corrige.
          </p>
          <p>
            Cet article a été conçu pour être lu avant un rendez-vous, sans aucun prérequis : en
            une vingtaine de minutes, il explique où va votre argent, pourquoi tant de contrats
            produisent si peu, et comment auditer le vôtre pièce par pièce. Chaque terme technique
            est défini au passage. Si vous arrivez au bout, vous aurez déjà fait l'essentiel du
            diagnostic vous-même.
          </p>
          <p>
            Une précision d'emblée, car elle conditionne toute la suite : quand un contrat déçoit,
            ce n'est presque jamais l'assurance-vie elle-même qui est en cause — c'est ce qu'on a
            mis dedans, et ce qu'on prélève dessus. L'enveloppe reste l'une des plus polyvalentes
            du paysage français ; son contenu, lui, peut être remarquable ou médiocre. Toute la
            nuance de cet article tient dans cette distinction.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#mecanique">Où va votre argent quand vous versez sur une assurance-vie ?</a></li>
              <li><a href="#fonds-euros">Le fonds en euros : pourquoi la sécurité coûte-t-elle si cher sur vingt ans ?</a></li>
              <li><a href="#supports">Fonds actions, fonds obligataires : que propose vraiment votre contrat ?</a></li>
              <li><a href="#frais">Combien d'étages de frais votre contrat empile-t-il ?</a></li>
              <li><a href="#gestion-pilotee">La gestion pilotée tient-elle sa promesse du « clé en main » ?</a></li>
              <li><a href="#simulateur">Faites le test vous-même : mêmes versements, frais différents</a></li>
              <li><a href="#audit">Comment auditer votre contrat en 20 minutes ?</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="mecanique">Où va votre argent quand vous versez sur une assurance-vie ?</h2>
          <p>
            L'assurance-vie n'est pas un placement : c'est une enveloppe (un cadre fiscal et
            juridique qui contient des placements, au même titre qu'un PEA — plan d'épargne en
            actions — ou un PER — plan d'épargne retraite). Quand vous
            versez 1 000 €, l'assureur les répartit — selon vos instructions, ou celles du profil
            qu'on vous a attribué — entre deux grandes familles de supports.
          </p>
          <p>
            Le fonds en euros, d'abord. C'est le support historique des contrats français :
            l'assureur y investit votre argent principalement en obligations (des prêts consentis
            à des États et à de grandes entreprises, rémunérés par un intérêt) et vous garantit le
            capital. Cette garantie est réelle, mais elle a ses bornes : elle est portée par
            l'assureur lui-même, donc valable hors faillite de celui-ci. Les intérêts crédités
            chaque année sont définitivement acquis — c'est ce qu'on appelle l'« effet cliquet ».
            En contrepartie de cette sécurité, le rendement est modeste ; nous y revenons en
            détail juste après.
          </p>
          <p>
            Les unités de compte (UC), ensuite : des supports d'investissement — fonds actions,
            fonds obligataires, fonds immobiliers, ETF (des fonds cotés en bourse qui se
            contentent de répliquer un indice, c'est-à-dire un panier représentatif d'un marché,
            à frais réduits) — dont la valeur fluctue à la
            hausse comme à la baisse. Ici, le capital n'est pas garanti : c'est la contrepartie
            d'une espérance de rendement supérieure sur la durée. L'assureur garantit seulement le
            nombre de parts que vous détenez, jamais leur valeur.
          </p>
          <p>
            Balayons au passage une idée reçue tenace : l'argent d'une assurance-vie serait
            « bloqué huit ans ». C'est inexact. Un rachat (un retrait, partiel ou total) reste
            possible à tout moment, sauf supports illiquides ; le cap des huit ans ne conditionne
            que la fiscalité applicable aux gains, jamais la disponibilité des fonds. Pour situer
            cette enveloppe dans une stratégie retraite d'ensemble, notre page{" "}
            <a href="/strategies/assurance-vie-retraite">l'assurance-vie comme outil retraite</a>{" "}
            complète utilement cet article.
          </p>

          <h2 id="fonds-euros">Le fonds en euros : pourquoi la sécurité coûte-t-elle si cher sur vingt ans ?</h2>
          <p>
            En {RENDEMENTS.fondsEuros.periode}, le rendement moyen des fonds en euros s'est établi
            autour de {pct(RENDEMENTS.fondsEuros.moyen)} net de frais de gestion, avant
            prélèvements sociaux, avec de grands écarts d'un contrat à l'autre (de{" "}
            {pct(RENDEMENTS.fondsEuros.min)} à {pct(RENDEMENTS.fondsEuros.max)} — moyenne de
            marché, données France Assureurs / ACPR). C'est un constat passé, qui ne préjuge en
            rien des taux futurs. Deux repères pour le mettre en perspective : l'objectif
            d'inflation de la Banque centrale européenne, {pct(RENDEMENTS.inflationLongTerme.moyen)}{" "}
            par an, et les {pct(RENDEMENTS.ucActionsLongTerme.min)} à{" "}
            {pct(RENDEMENTS.ucActionsLongTerme.max)} annualisés qu'ont historiquement délivrés les
            grands indices actions mondiaux (type MSCI World) sur 20 à 30 ans, dividendes
            réinvestis et avant frais
            — une moyenne de très long terme, obtenue au prix d'années fortement négatives, et que
            rien ne garantit pour l'avenir.
          </p>
          <p>
            S'ajoute une particularité fiscale méconnue : sur le fonds en euros, les prélèvements
            sociaux (l'ensemble CSG-CRDS appliqué aux revenus du capital, soit{" "}
            {pct(FISCALITE.prelevementsSociaux.assuranceVie)} en assurance-vie — un taux propre à
            cette enveloppe, non concerné par la hausse à 18,6 % introduite par la LFSS 2026 pour
            d'autres enveloppes) sont ponctionnés chaque année sur les intérêts
            crédités, même si vous ne retirez rien. Le taux affiché n'est donc pas celui qui
            capitalise réellement pour vous.
          </p>
          <p>
            Posons le calcul pas à pas, en hypothèses illustratives à taux constants : 10 000 €
            placés d'un côté au taux moyen des fonds en euros constaté en{" "}
            {RENDEMENTS.fondsEuros.periode}, de l'autre à {pct(RENDEMENTS.ucActionsLongTerme.min)}{" "}
            — le bas de la fourchette historique des actions mondiales sur longue période.
          </p>
          <table>
            <thead>
              <tr>
                <th>Hypothèse illustrative (10 000 € au départ)</th>
                <th>Après 10 ans</th>
                <th>Après 15 ans</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fonds en euros à {pct(RENDEMENTS.fondsEuros.moyen)} (taux moyen {RENDEMENTS.fondsEuros.periode}), avant prélèvements sociaux</td>
                <td>{euros(croissance(10000, RENDEMENTS.fondsEuros.moyen, 10))}</td>
                <td>{euros(croissance(10000, RENDEMENTS.fondsEuros.moyen, 15))}</td>
              </tr>
              <tr>
                <td>Le même fonds en euros, après les {pct(FISCALITE.prelevementsSociaux.assuranceVie)} de prélèvements sociaux annuels</td>
                <td>{euros(croissance(10000, fondsEurosNetPS, 10))}</td>
                <td>{euros(croissance(10000, fondsEurosNetPS, 15))}</td>
              </tr>
              <tr>
                <td>Support dynamique à {pct(RENDEMENTS.ucActionsLongTerme.min)} (capital non garanti, avant frais et fiscalité de rachat)</td>
                <td>{euros(croissance(10000, RENDEMENTS.ucActionsLongTerme.min, 10))}</td>
                <td>{euros(croissance(10000, RENDEMENTS.ucActionsLongTerme.min, 15))}</td>
              </tr>
            </tbody>
          </table>
          <p>
            À quinze ans, l'écart approche{" "}
            {euros(
              croissance(10000, RENDEMENTS.ucActionsLongTerme.min, 15) -
                croissance(10000, fondsEurosNetPS, 15)
            )}
            , soit environ{" "}
            {Math.round(
              ((croissance(10000, RENDEMENTS.ucActionsLongTerme.min, 15) -
                croissance(10000, fondsEurosNetPS, 15)) /
                10000) *
                100
            )}{" "}
            % de la somme de départ. Ces projections sont purement théoriques —
            aucun rendement réel n'est linéaire, le support dynamique peut connaître des années de
            forte baisse, et les performances passées ne préjugent pas des performances futures.
            Mais l'ordre de grandeur du coût d'opportunité (ce que l'argent aurait pu produire
            ailleurs) est posé.
          </p>
          <p>
            Dernier point souvent ignoré : le fonds en euros n'est pas non plus une épargne
            instantanément disponible. Un rachat prend en pratique plusieurs jours à deux
            semaines, l'assureur disposant d'un délai légal pouvant aller jusqu'à deux mois — rien
            de comparable à un livret réglementé.
          </p>
          <p>
            Notre analyse : le fonds en euros n'est pas un mauvais produit — il est très souvent
            mal employé. Comme poche de sécurité pour un besoin certain et daté (des travaux dans
            deux ans, un apport dans trois), il joue parfaitement son rôle. Comme moteur d'un
            contrat censé préparer une retraite à quinze ou vingt ans d'horizon, il condamne
            l'épargne à courir derrière l'inflation. Les profils standardisés dits « prudents » ou
            « équilibrés », qui laissent l'essentiel d'un contrat en fonds en euros pendant des
            décennies, relèvent davantage du confort commercial que de la construction
            patrimoniale. Précision utile : fonds en euros et obligations ne sont pas synonymes —
            le fonds en euros est la déclinaison la plus sécurisée, et la moins rémunératrice, de
            l'univers obligataire. De vrais fonds obligataires peuvent viser davantage, au prix
            d'un capital non garanti ; c'est justement l'objet de la section suivante.
          </p>

          <h2 id="supports">Fonds actions, fonds obligataires : que propose vraiment votre contrat ?</h2>
          <p>
            Au-delà du fonds en euros, votre contrat héberge des unités de compte, et deux grandes
            catégories dominent. Les fonds obligataires (des paniers d'obligations gérés
            collectivement) : sur {RENDEMENTS.fondsObligataires.periode}, les rendements à
            l'échéance se situaient, en ordre de grandeur, entre {pct(RENDEMENTS.fondsObligataires.min)}{" "}
            et {pct(RENDEMENTS.fondsObligataires.max)} (fonds obligataires investment grade euro —
            de qualité dite d'investissement) — sans garantie du capital, la valeur d'un
            fonds obligataire pouvant baisser quand les taux d'intérêt montent. Les fonds actions
            (des paniers d'actions d'entreprises) : sur 20 à 30 ans, les indices mondiaux (type
            MSCI World, dividendes réinvestis) ont
            délivré des moyennes annualisées de l'ordre de {pct(RENDEMENTS.ucActionsLongTerme.min)}{" "}
            à {pct(RENDEMENTS.ucActionsLongTerme.max)}, avant frais — une
            moyenne de long terme qui inclut des chutes de 30 à 50 % certaines années, et que rien
            ne garantit pour l'avenir.
          </p>
          <p>
            Mais la vraie question n'est pas la catégorie : c'est la qualité et le coût des fonds
            précis que votre contrat référence. Un contrat bancaire met généralement en avant des
            fonds « maison », gérés par la société de gestion du même groupe. Leurs frais annuels
            — de {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)} par an — s'empilent
            sur les frais du contrat lui-même. Et une partie de ces fonds pratique ce que le
            jargon nomme le closet indexing (littéralement « gestion indicielle déguisée ») : le
            fonds facture le tarif d'une gestion active — un gérant censé sélectionner les titres
            et s'écarter de l'indice — tout en suivant en réalité son indice de référence de très
            près. Vous payez une expertise, vous recevez une copie. En face, un ETF assume de
            répliquer l'indice et facture ce travail de {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)}{" "}
            à {pct(FRAIS_TYPES.contratInternet.fraisSupports.max)} par an.
          </p>
          <p>
            Faut-il en conclure que tout fonds chargé en frais est à proscrire ? Non — et c'est un
            point où notre analyse s'écarte d'un discours répandu sur les réseaux. Ce qui compte
            n'est pas le niveau de frais isolé, mais la performance nette de frais effectivement
            délivrée : il existe des fonds coûteux qui créent durablement de la valeur après
            frais. Ils sont simplement minoritaires, et la très grande majorité des fonds maison
            ont des concurrents qui font mieux pour moins cher. Le bon réflexe n'est donc pas
            « fuir tous les frais », mais « vérifier ce que chaque euro de frais rapporte en
            face ».
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Support</th>
                  <th>Capital garanti ?</th>
                  <th>Ordre de grandeur constaté (daté)</th>
                  <th>Frais annuels typiques</th>
                  <th>Rôle dans une stratégie retraite</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fonds en euros</td>
                  <td>Oui, par l'assureur (hors faillite de celui-ci)</td>
                  <td>{pct(RENDEMENTS.fondsEuros.moyen)} en moyenne en {RENDEMENTS.fondsEuros.periode}, avant prélèvements sociaux</td>
                  <td>Inclus dans le taux servi (net de frais de gestion)</td>
                  <td>Poche de sécurité pour un besoin certain à 3-4 ans</td>
                </tr>
                <tr>
                  <td>Fonds obligataires</td>
                  <td>Non — la valeur fluctue</td>
                  <td>{pct(RENDEMENTS.fondsObligataires.min)} à {pct(RENDEMENTS.fondsObligataires.max)} à l'échéance ({RENDEMENTS.fondsObligataires.periode})</td>
                  <td>Variable selon le fonds — lire le DIC (le document d'informations clés du fonds — détaillé plus bas)</td>
                  <td>Étage intermédiaire entre sécurité et rendement</td>
                </tr>
                <tr>
                  <td>Fonds actions « maison »</td>
                  <td>Non — capital non garanti</td>
                  <td>Marché actions : {pct(RENDEMENTS.ucActionsLongTerme.min)} à {pct(RENDEMENTS.ucActionsLongTerme.max)} annualisés sur 20-30 ans, avant frais</td>
                  <td>{pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min)} à {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)}</td>
                  <td>Moteur de long terme — à condition de vérifier la performance nette</td>
                </tr>
                <tr>
                  <td>ETF actions</td>
                  <td>Non — capital non garanti</td>
                  <td>Même moteur, mêmes indices</td>
                  <td>{pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} à {pct(FRAIS_TYPES.contratInternet.fraisSupports.max)}</td>
                  <td>Moteur de long terme à coût réduit (tous les contrats n'en référencent pas)</td>
                </tr>
                <tr>
                  <td>Gestion pilotée (délégation des choix à un gérant)</td>
                  <td>Selon les supports sous-jacents</td>
                  <td>Dépend du profil retenu</td>
                  <td>Surcoût de {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)}, en plus des frais des fonds</td>
                  <td>Délégation « clé en main » — lire la section dédiée ci-dessous</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les rendements de ce tableau sont des constats passés datés ou des moyennes
            historiques, jamais des promesses : les performances passées ne préjugent pas des
            performances futures.
          </p>

          <h2 id="frais">Combien d'étages de frais votre contrat empile-t-il ?</h2>
          <p>
            Trois, le plus souvent — comme trois péages successifs sur la même route. Aucun n'est
            spectaculaire pris isolément ; c'est leur addition, répétée chaque année pendant
            vingt ans, qui change la destination.
          </p>
          <ul>
            <li>
              <strong>Les frais d'entrée</strong> (ou frais sur versement) : prélevés une fois,
              sur chaque versement. De {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.min)} à{" "}
              {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.max)} dans les réseaux bancaires
              traditionnels, contre {pct(FRAIS_TYPES.contratInternet.entree.min)} sur les contrats
              internet. Verser 10 000 € avec{" "}
              {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.max)} de frais d'entrée, c'est
              n'investir que{" "}
              {euros(10000 * (1 - FRAIS_TYPES.contratBancaireTraditionnel.entree.max / 100))}.
            </li>
            <li>
              <strong>Les frais de gestion annuels du contrat</strong> : prélevés chaque année par
              l'assureur sur l'encours (le capital présent sur le contrat). De{" "}
              {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min)} à{" "}
              {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)} dans les contrats
              bancaires traditionnels, contre {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.min)}{" "}
              à {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.max)} sur les contrats internet.
            </li>
            <li>
              <strong>Les frais des supports</strong> : prélevés chaque année à l'intérieur de
              chaque fonds, avant même le calcul de sa performance. C'est l'étage invisible : il
              ne figure pas dans la grille tarifaire de votre contrat, mais dans le DIC de chaque
              fonds (document d'informations clés, parfois appelé KID : la fiche standardisée
              européenne de deux ou trois pages que tout fonds doit publier — la ligne à chercher
              s'appelle « frais courants »). De{" "}
              {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min)} à{" "}
              {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)} pour des fonds
              maison classiques, {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} à{" "}
              {pct(FRAIS_TYPES.contratInternet.fraisSupports.max)} pour des ETF.
            </li>
          </ul>
          <p>
            S'y ajoutent parfois des frais d'arbitrage — de{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.arbitrage.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.arbitrage.max)} du montant déplacé quand
            vous changez de support (l'arbitrage), souvent gratuits en ligne.
          </p>
          <p>
            Additionnons, en milieu de fourchette : un contrat bancaire traditionnel investi en
            fonds maison cumule couramment de l'ordre de {pct(fraisBancaireAnnuel)} de frais
            annuels (contrat + supports), là où un contrat internet en ETF revient autour de{" "}
            {pct(fraisInternetAnnuel)}. À hypothèse de rendement brut strictement identique —
            prenons {pct(RENDEMENTS.ucActionsLongTerme.moyen)}, la moyenne annualisée historique
            des marchés actions mondiaux, jamais garantie —, 50 000 € sur 15 ans deviendraient
            environ{" "}
            {euros(croissance(50000, RENDEMENTS.ucActionsLongTerme.moyen - fraisBancaireAnnuel, 15))}{" "}
            dans le premier cas, contre{" "}
            {euros(croissance(50000, RENDEMENTS.ucActionsLongTerme.moyen - fraisInternetAnnuel, 15))}{" "}
            dans le second : près de{" "}
            {euros(
              croissance(50000, RENDEMENTS.ucActionsLongTerme.moyen - fraisInternetAnnuel, 15) -
                croissance(50000, RENDEMENTS.ucActionsLongTerme.moyen - fraisBancaireAnnuel, 15)
            )}{" "}
            d'écart, sans un centime de risque supplémentaire. Hypothèse illustrative, à taux
            constant — le simulateur plus bas vous permet de refaire ce calcul avec vos propres
            chiffres.
          </p>
          <p>
            Précisons, car la nuance compte : ces frais ne sont pas une escroquerie. Ils financent
            un modèle — des agences, des équipes, des services — et la gratuité affichée se paie
            généralement ailleurs : en service absent, ou en coûts déplacés là où on ne les voit
            pas. Notre analyse : le problème n'est pas de payer, c'est de
            payer trois étages sans savoir ce qu'on reçoit en échange. Des frais se justifient
            quand un accompagnement réel — allocation construite, ajustements dans le temps,
            optimisation fiscale et successorale — rapporte davantage qu'il ne coûte. Ils se
            justifient beaucoup moins pour un contrat souscrit il y a quinze ans et jamais revu
            depuis.
          </p>

          <h2 id="gestion-pilotee">La gestion pilotée tient-elle sa promesse du « clé en main » ?</h2>
          <p>
            La gestion pilotée (on parle aussi de gestion profilée ou sous mandat) consiste à
            déléguer les choix d'investissement : vous répondez à un questionnaire, on vous classe
            dans un profil — prudent, équilibré, dynamique — et l'assureur ou une société de
            gestion répartit et ajuste vos supports à votre place.
          </p>
          <p>
            Disons-le clairement : vouloir déléguer est parfaitement légitime. Personne n'a
            l'obligation de se passionner pour l'allocation d'actifs (la répartition de l'épargne
            entre les grandes familles de placements), et confier ce travail est,
            sur le principe, une idée saine. Les réserves de notre analyse ne portent pas sur la
            délégation — elles portent sur la forme que ce produit standardisé lui donne.
          </p>
          <p>
            Premier point : le coût. La gestion pilotée ajoute sa propre couche de frais — un
            surcoût de mandat de l'ordre de {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à{" "}
            {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)} par an — au-dessus des frais du contrat
            et des frais des fonds qu'elle sélectionne, souvent des fonds maison. C'est
            typiquement dans cette configuration que le total annuel dépasse les{" "}
            {pct(fraisBancaireAnnuel)} évoqués plus haut pour atteindre, en milieu de fourchette,
            de l'ordre de{" "}
            {pct(fraisBancaireAnnuel + moy(FRAIS_TYPES.gestionPiloteeSurcout))} par an.
          </p>
          <p>
            Second point, plus structurel et rarement expliqué : la rigidité. Un profil piloté
            fonctionne comme un bloc : chaque retrait est prélevé proportionnellement sur
            l'ensemble des lignes du profil. Avec un profil composé de 70 % d'actions, chaque
            rachat liquide mécaniquement 70 % d'actions — que la Bourse soit au plus haut ou en
            plein repli. Impossible de puiser d'abord dans la poche prudente et de laisser la
            poche actions se reconstituer. Le piège n'est pas que les gérants « se
            trompent » : c'est que la construction même du produit peut institutionnaliser la
            vente au mauvais moment. S'y ajoutent des profils figés, calés une fois pour toutes
            sur un questionnaire, qui évoluent rarement avec vos projets réels — un défaut
            particulièrement coûteux à l'approche de la retraite, quand le calendrier des retraits
            devient précis.
          </p>
          <p>
            En résumé : déléguer, oui. Déléguer à un produit rigide qui empile les couches de
            frais et cède vos actions au prorata les années de baisse, voilà ce qui mérite au
            minimum une vérification — la check-list plus bas vous donne la méthode.
          </p>

          <h2 id="simulateur">Faites le test vous-même : mêmes versements, jouez seulement sur les frais</h2>
          <p>
            Le simulateur ci-dessous reproduit une capitalisation en assurance-vie, fiscalité de
            sortie après huit ans comprise. Faites une première simulation avec les frais annuels
            totaux de votre contrat actuel (les étages additionnés lors de l'audit ci-dessous),
            puis une seconde en ne changeant que ce paramètre, versements et durée identiques.
            L'écart entre les deux résultats, c'est le coût de la structure de frais — le vôtre.
          </p>
          <SimulateurCapitalisation enveloppe="av" />

          <h2 id="audit">Comment auditer votre contrat en 20 minutes ?</h2>
          <p>
            Munissez-vous de votre dernier relevé annuel et des conditions générales du contrat
            (tout est aussi dans votre espace client en ligne), puis déroulez ces cinq étapes.
          </p>
          <ol>
            <li>
              <strong>Retrouvez le relevé annuel de situation.</strong> L'assureur l'envoie chaque
              année ; c'est la pièce centrale : valeur du contrat, répartition par support,
              mouvements de l'année.
            </li>
            <li>
              <strong>Lisez le taux servi par votre fonds en euros l'an dernier.</strong>{" "}
              Comparez-le à la moyenne de marché ({pct(RENDEMENTS.fondsEuros.moyen)} en{" "}
              {RENDEMENTS.fondsEuros.periode}) : nettement au-dessus, dans la moyenne, ou en
              dessous ?
            </li>
            <li>
              <strong>Additionnez les trois étages de frais.</strong> Frais sur versement, frais
              de gestion annuels et frais d'arbitrage figurent dans la grille tarifaire ; les
              « frais courants » de chaque fonds, dans son DIC. Le total annuel obtenu est le
              chiffre à entrer dans le simulateur ci-dessus.
            </li>
            <li>
              <strong>Identifiez ce que vous détenez.</strong> Quelle part en fonds en euros,
              quelle part en unités de compte ? Des fonds maison ou des supports externes ? Une
              gestion libre ou pilotée ? Cette photographie explique, à elle seule, l'essentiel de
              la performance passée de votre contrat.
            </li>
            <li>
              <strong>Vérifiez la clause bénéficiaire au passage.</strong> C'est la clause qui
              désigne qui recevra le capital en cas de décès. Assurez-vous qu'elle correspond à
              votre situation familiale actuelle, et privilégiez une rédaction en pourcentages
              plutôt qu'en montants fixes — un montant figé vieillit mal sur un contrat dont la
              valeur évolue.
            </li>
          </ol>
          <div className="note">
            <p>
              Un réflexe avant toute décision : si votre contrat a plus de huit ans, ne le
              clôturez pas sur un coup de tête. L'antériorité fiscale a de la valeur — après huit
              ans, les gains rachetés bénéficient d'un abattement annuel (une fraction de gains
              exonérée d'impôt chaque année) de {euros(FISCALITE.avAbattementAnnuelSeul)} pour une
              personne seule ou {euros(FISCALITE.avAbattementAnnuelCouple)} pour un couple soumis
              à imposition commune, et d'un taux réduit de {pct(FISCALITE.avTauxReduitApres8Ans)}{" "}
              sous conditions (barème en vigueur en {HYPOTHESES_MAJ}). Dans bien des cas, on
              réoriente les versements et les supports au sein du contrat existant — ou l'on
              ouvre un second contrat à côté — plutôt que de fermer le premier. Comme toujours,
              cela s'apprécie au cas par cas.
            </p>
          </div>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Reprenons le fil. Si votre assurance-vie a peu rapporté, la cause est rarement
            mystérieuse : un fonds en euros employé comme moteur de long terme alors qu'il est
            conçu pour la sécurité de court terme ({pct(RENDEMENTS.fondsEuros.moyen)} en moyenne
            en {RENDEMENTS.fondsEuros.periode}, avant prélèvements sociaux annuels) ; des fonds
            maison facturés {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)} là où des supports
            indiciels font un travail comparable pour{" "}
            {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} à{" "}
            {pct(FRAIS_TYPES.contratInternet.fraisSupports.max)} ; trois étages de frais qui
            totalisent couramment {pct(fraisBancaireAnnuel)} par an ; et, souvent, une gestion
            pilotée qui ajoute sa couche et fige l'ensemble. Aucun de ces éléments n'est une
            fatalité : ce sont des paramètres — et des paramètres se vérifient, se renégocient ou
            se remplacent.
          </p>
          <p>
            L'enveloppe, elle, reste l'une des plus complètes pour préparer une retraite :
            fiscalité adoucie après huit ans, rachats libres, atouts successoraux. Encore faut-il
            décider de ce qu'on y loge et comment on en sortira — c'est l'objet de notre page{" "}
            <a href="/strategies/assurance-vie-retraite">assurance-vie et retraite</a>, du
            comparatif{" "}
            <a href="/guide/per-vs-assurance-vie-retraite">PER ou assurance-vie</a> et, pour la
            phase où le capital doit devenir un revenu, de notre guide sur{" "}
            <a href="/strategies/decumulation">la décumulation</a>.
          </p>
          <div className="note">
            <p>
              Ce diagnostic est volontairement général : il décrit des mécanismes de marché, pas
              votre contrat. Le vôtre mérite un examen ligne à ligne — taux servi, frais réels,
              supports détenus, clause bénéficiaire — au regard de votre horizon, de votre
              fiscalité et de vos projets. C'est précisément l'objet du{" "}
              <a href="/bilan-retraite">bilan retraite gratuit</a> : vous venez avec votre relevé
              annuel, le diagnostic se pose ensemble. Cette analyse ne constitue pas un conseil en
              investissement personnalisé ; les chiffres cités sont des constats passés datés ou
              des hypothèses illustratives, et les performances passées ne préjugent pas des
              performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
