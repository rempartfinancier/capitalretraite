import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { RENDEMENTS, HYPOTHESES_MAJ, pct } from "../components/hypotheses.js";

export default function GuideCinqErreursLocatif() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Pièges à éviter</span>
          <h1>Les 5 erreurs les plus coûteuses de l'investissement locatif retraite</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <p>
            L'investissement locatif reste, dans notre analyse, l'un des rares outils accessibles
            au grand public pour préparer sa retraite avec l'argent de la banque plutôt qu'avec le
            sien. Mais c'est aussi le placement où les repères intuitifs trompent le plus souvent :
            un chiffre affiché sur une annonce ou un raisonnement qui semble frappé au coin du bon
            sens peuvent conduire à un projet structurellement mal engagé, et ce dès l'achat. Voici
            les cinq erreurs que nous observons le plus fréquemment en rendez-vous, chacune avec
            son mécanisme, son coût réel et la manière de la contourner.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#prix-m2">1. Se fier au prix au m² pour juger un investissement</a></li>
              <li><a href="#cash-flow">2. Viser le « cash-flow positif » à tout prix</a></li>
              <li><a href="#gestion">3. Sous-estimer la gestion et la vacance locative</a></li>
              <li><a href="#endettement">4. Ignorer les règles d'endettement et empiler les crédits</a></li>
              <li><a href="#sortie">5. Négliger la sortie et la transmission</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="prix-m2">1. Se fier au prix au m² pour juger un investissement</h2>
          <p>
            Le réflexe est presque universel : comparer deux biens par leur prix au mètre carré,
            et considérer le moins cher comme la meilleure affaire. Ce raisonnement n'est pas
            absurde — à surface et quartier identiques, il donne un premier repère. Le problème
            survient dès qu'on l'utilise pour trancher entre deux opportunités différentes, ce qui
            est presque toujours le cas en pratique.
          </p>
          <p>
            Le prix au m² ne dit strictement rien du loyer que le bien peut générer, ni des charges
            qui viendront le grever : copropriété, taxe foncière, travaux à prévoir, qualité du
            diagnostic de performance énergétique. Deux appartements achetés au même prix au m²
            dans la même ville peuvent afficher des rendements nets du simple au double une fois
            ces éléments intégrés — l'un loué sans discontinuer à un loyer de marché, l'autre grevé
            de charges de copropriété élevées et d'une vacance locative récurrente faute
            d'attractivité du quartier. Notre analyse : le prix au m² est un indicateur d'entrée de
            gamme, utile pour repérer une anomalie de marché, jamais suffisant pour juger la
            rentabilité d'un projet. Le bon calcul part du loyer net réellement encaissable — après
            charges, vacance et fiscalité —, rapporté au prix total de revient, notaire et travaux
            compris.
          </p>

          <h2 id="cash-flow">2. Viser le « cash-flow positif » à tout prix</h2>
          <p>
            Le cash-flow (la différence, chaque mois, entre les loyers encaissés et l'ensemble des
            charges et de la mensualité de crédit) est devenu, sur les réseaux et dans certains
            contenus de vulgarisation, une sorte d'objectif en soi : exiger que le loyer couvre
            l'intégralité de la mensualité dès le premier jour, pour ne « rien sortir de sa poche ».
            L'idée séduit — qui n'aimerait pas un bien qui s'autofinance ? — mais elle inverse la
            hiérarchie des critères.
          </p>
          <p>
            Un cash-flow positif dès l'achat s'obtient presque toujours de deux manières : viser un
            rendement brut élevé, ce qui oriente mécaniquement vers des biens moins chers dans des
            villes ou des quartiers où le risque locatif (impayés, vacance, dégradation) est plus
            élevé ; ou allonger la durée de crédit au maximum pour réduire la mensualité, ce qui est
            en soi une bonne pratique mais ne doit pas être le seul levier actionné. Rechercher ce
            confort de trésorerie en négligeant l'emplacement ou la qualité du bien revient à
            optimiser un chiffre au détriment du projet dans son ensemble. Le cash-flow est un
            critère parmi d'autres — la disponibilité mensuelle de trésorerie que le foyer peut
            tolérer —, jamais l'objectif premier d'une acquisition locative. Notre analyse : mieux
            vaut un bien bien situé, correctement loué, avec un effort d'épargne mensuel modéré et
            assumé, qu'un bien médiocre choisi uniquement parce qu'il s'autofinance sur le papier.
          </p>

          <h2 id="gestion">3. Sous-estimer la gestion et la vacance locative</h2>
          <p>
            Beaucoup d'acquéreurs raisonnent sur un scénario implicite où le bien est loué en
            continu, sans incident, du jour de l'achat au jour de la revente. C'est rarement ce qui
            se produit. Changement de locataire, période de recherche, impayé isolé, dégradation à
            réparer entre deux baux : la vacance locative et les impayés ne sont jamais nuls sur la
            durée de détention d'un bien, même dans les marchés locatifs tendus.
          </p>
          <p>
            Le rendement brut affiché sur une annonce — les rendements locatifs bruts nus se situent
            en ordre de grandeur entre {pct(RENDEMENTS.locatifDirect.min)} et{" "}
            {pct(RENDEMENTS.locatifDirect.max)} selon les villes ({RENDEMENTS.locatifDirect.periode},
            constat passé qui ne préjuge pas des loyers futurs) — ne tient compte d'aucun de ces
            aléas. Le rendement net réel, une fois déduits la vacance, les impayés éventuels, les
            frais de gestion ou d'agence et les travaux d'entretien, est structurellement inférieur,
            parfois de plusieurs points. Un bien géré soi-même n'échappe pas à la règle : il demande
            du temps, une disponibilité réelle en cas d'incident, et une certaine tolérance au
            risque locatif — ce n'est pas un revenu qui se génère sans y consacrer d'attention.
            Notre grille de coûts complète, avec les ordres de grandeur poste par poste, est
            détaillée dans notre guide{" "}
            <a href="/guide/combien-coute-un-investissement-locatif">
              combien coûte réellement un investissement locatif
            </a>
            .
          </p>

          <h2 id="endettement">4. Ignorer les règles d'endettement et empiler les crédits sans vision d'ensemble</h2>
          <p>
            Accumuler les biens locatifs les uns après les autres, en réempruntant à chaque
            nouvelle acquisition, a longtemps été présenté comme LA méthode pour se constituer un
            patrimoine avec l'argent de la banque. Cette stratégie existe toujours, mais elle est
            aujourd'hui nettement plus contrainte qu'elle ne l'a été pour l'épargnant qui ne vit pas
            de l'immobilier comme métier.
          </p>
          <p>
            Le Haut Conseil de stabilité financière (HCSF — l'autorité chargée de la stabilité du
            système financier français) encadre depuis plusieurs années les conditions d'octroi des
            crédits immobiliers : le taux d'effort (la part des revenus mensuels consacrée au
            remboursement de l'ensemble des crédits) est plafonné à 35 % des revenus, et les loyers
            perçus ne sont retenus qu'à hauteur d'une fraction — généralement entre 70 et 90 % selon
            les établissements — dans le calcul de ce ratio. Résultat concret : un investisseur déjà
            engagé sur plusieurs crédits atteint plus vite qu'auparavant le plafond au-delà duquel
            aucune banque ne prêtera davantage, quelle que soit la qualité de l'opération proposée.
            Empiler les crédits sans vision d'ensemble — sans anticiper ce plafond, sans consolider
            sa capacité d'emprunt globale avant chaque nouveau projet — expose à se retrouver bloqué
            au milieu d'une stratégie, avec un bien identifié mais aucun financement disponible pour
            le concrétiser. Notre analyse : la règle du HCSF n'interdit pas de détenir plusieurs
            biens, mais elle impose de raisonner sa capacité d'endettement comme une ressource
            globale et rare, à allouer projet par projet, plutôt que comme un guichet qui se
            renouvelle indéfiniment.
          </p>

          <h2 id="sortie">5. Négliger la sortie et la transmission</h2>
          <p>
            La dernière erreur se joue paradoxalement au moment de l'achat, même si ses
            conséquences n'apparaissent que des années plus tard. Beaucoup de projets locatifs sont
            construits en pensant uniquement à l'acquisition et au remboursement du crédit, sans
            jamais se demander ce que deviendra le bien une fois la retraite venue : le garder, le
            vendre, le démembrer, le transmettre ?
          </p>
          <p>
            Un bien qui a pleinement sa place pendant la vie active — parce qu'il bénéficie de
            l'effet de levier du crédit et que les loyers en remboursent une partie — change de
            nature une fois le prêt soldé. À la retraite, le levier a disparu, la gestion demeure
            (locataires, travaux, déclarations), et la fiscalité des loyers s'ajoute à une pension
            déjà imposée. Vendre à ce moment-là déclenche une fiscalité de plus-value immobilière
            qu'il faut avoir anticipée ; conserver le bien pour le transmettre suppose d'avoir
            envisagé, en amont, des outils comme le démembrement (la séparation entre la
            nue-propriété — la propriété du bien sans en percevoir les revenus — et l'usufruit — le
            droit d'en percevoir les revenus ou d'en jouir), qui s'organise idéalement des années
            avant la succession, pas au moment où elle s'ouvre. Notre analyse : un bien locatif
            devrait toujours être acheté avec une hypothèse de sortie déjà esquissée, même
            approximative — parce que la question ne se posera pas moins fort en ne l'anticipant
            pas, elle se posera simplement plus tard, avec moins d'options disponibles. C'est tout
            l'objet de notre page sur{" "}
            <a href="/strategies/decumulation">la décumulation</a>, qui traite justement de
            l'organisation des retraits et de la consommation du patrimoine à la retraite.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Aucune de ces cinq erreurs ne remet en cause l'immobilier locatif comme pilier légitime
            de préparation retraite : l'effet de levier du crédit, couplé aux assurances
            décès-invalidité qui l'accompagnent, reste l'un des rares mécanismes qui permettent à la
            fois de construire un patrimoine et de protéger sa famille en cas de coup dur pendant
            le remboursement. Ce que ces cinq points ont en commun, c'est qu'ils invitent tous à la
            même discipline : penser le projet en flux net et sur toute sa durée — de l'achat à la
            sortie —, plutôt que sur un chiffre isolé regardé au moment de la signature. Un prix au
            m², un cash-flow du premier mois ou un rendement brut affiché ne racontent qu'un
            fragment de l'histoire ; c'est la suite qui détermine si l'opération aura été, sur
            vingt ou trente ans, une bonne décision patrimoniale.
          </p>
          <p>
            Pour resituer ces cinq erreurs dans une vision plus large de la place de l'immobilier
            dans votre stratégie retraite, notre page{" "}
            <a href="/strategies/immobilier-retraite">l'immobilier dans la stratégie retraite</a>{" "}
            détaille les différents véhicules disponibles, et notre guide{" "}
            <a href="/guide/lmnp-ou-locatif-nu">LMNP ou locatif nu</a> compare les deux régimes
            fiscaux les plus courants pour qui investit en direct.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque projet immobilier doit faire l'objet d'une étude individuelle,
              intégrant votre capacité d'endettement réelle, votre horizon et vos objectifs de
              transmission. Les rendements mentionnés sont des ordres de grandeur constatés,
              actualisés en {HYPOTHESES_MAJ} ; les performances et loyers passés ne préjugent pas
              des performances futures, et aucun investissement locatif ne garantit ni le revenu ni
              le capital.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Un projet locatif en tête ? Vérifions ensemble qu'il tient la route." button="Bilan retraite gratuit (15 min)" />
    </>
  );
}
