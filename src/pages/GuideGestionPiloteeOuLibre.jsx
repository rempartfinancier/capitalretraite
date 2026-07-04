import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
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

// Capitalisation d'une somme unique à taux constant (hypothèse illustrative).
const croissance = (capital, tauxPct, annees) =>
  capital * Math.pow(1 + tauxPct / 100, annees);

// Frais annuels cumulés typiques d'un contrat internet en gestion libre
// (contrat + supports ETF), milieu de fourchette.
const fraisLibreInternet =
  moy(FRAIS_TYPES.contratInternet.gestionAnnuelle) +
  moy(FRAIS_TYPES.contratInternet.fraisSupports);

// Même contrat, en gestion pilotée : on ajoute le surcoût de mandat.
const fraisPiloteeInternet = fraisLibreInternet + moy(FRAIS_TYPES.gestionPiloteeSurcout);

// Frais annuels cumulés typiques d'un contrat bancaire traditionnel
// (contrat + fonds maison), milieu de fourchette.
const fraisLibreBancaire =
  moy(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle) +
  moy(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports);

const fraisPiloteeBancaire = fraisLibreBancaire + moy(FRAIS_TYPES.gestionPiloteeSurcout);

export default function GuideGestionPiloteeOuLibre() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Comparatif de référence</span>
          <h1>Gestion pilotée ou gestion libre : que choisir pour son PER ou son assurance-vie ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> la gestion pilotée délègue les choix
              d'investissement à un gérant moyennant un surcoût de mandat, avec une allocation
              standardisée qui se sécurise automatiquement à l'approche de la retraite ; la
              gestion libre laisse la main à l'épargnant, sans ce surcoût, mais demande du temps
              et des connaissances pour construire et suivre une allocation. Sur un plan d'épargne
              retraite (PER), la gestion pilotée à horizon est le mode de gestion par défaut
              depuis la loi PACTE — vous devez agir activement pour en sortir. Sur une
              assurance-vie classique, c'est l'inverse : la gestion libre reste la norme, et la
              gestion pilotée doit être choisie et souscrite via un mandat. Cette asymétrie entre
              les deux enveloppes inverse la question à se poser selon le produit détenu.
            </p>
          </div>
          <p>
            Un épargnant qui ouvre un PER chez son assureur ou sa banque coche rarement de case
            « gestion ». Il répond à un questionnaire de risque, signe, et son épargne se retrouve
            gérée selon un profil — sans qu'il ait vraiment choisi ce mode de gestion, ni même
            toujours compris qu'un autre existait. À l'inverse, un épargnant qui détient une
            assurance-vie depuis plusieurs années peut avoir laissé son capital dormir sur un ou
            deux supports choisis au moment de la souscription, sans jamais avoir entendu parler
            de gestion pilotée. Ces deux situations, à front renversé, illustrent une confusion
            fréquente : beaucoup d'épargnants ignorent quel mode de gestion s'applique par défaut
            à chacun de leurs contrats, et pourquoi.
          </p>
          <p>
            La gestion pilotée (aussi appelée gestion profilée ou gestion sous mandat) et la
            gestion libre sont les deux façons dont un contrat d'épargne — PER, assurance-vie,
            voire compte-titres — peut être piloté au quotidien : soit vous confiez les décisions
            d'allocation (la répartition entre grandes familles de placements) à un professionnel,
            soit vous les prenez vous-même, support par support. Aucune des deux n'est
            « meilleure » dans l'absolu : chacune a un coût, une mécanique et un public plus
            adapté que l'autre.
          </p>
          <p>
            Cet article détaille comment fonctionne chaque mode de gestion, pourquoi le PER et
            l'assurance-vie inversent leur réglage par défaut, ce que coûte réellement un mandat de
            gestion pilotée, un point de rigidité rarement expliqué, et un tableau comparatif pour
            trancher selon votre profil.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#definitions">Gestion pilotée ou gestion libre : de quoi parle-t-on exactement ?</a></li>
              <li><a href="#per-defaut">Sur un PER, pourquoi la gestion pilotée à horizon est-elle le mode par défaut ?</a></li>
              <li><a href="#av-defaut">Sur une assurance-vie, pourquoi est-ce l'inverse ?</a></li>
              <li><a href="#cout">Combien coûte réellement la gestion pilotée ?</a></li>
              <li><a href="#rigidite">Quel est le point de rigidité que l'on explique rarement ?</a></li>
              <li><a href="#tableau">Gestion pilotée ou gestion libre : le tableau comparatif</a></li>
              <li><a href="#choisir">Comment choisir selon votre profil ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="definitions">Gestion pilotée ou gestion libre : de quoi parle-t-on exactement ?</h2>
          <p>
            La gestion libre consiste à choisir vous-même, au sein de la liste des supports
            proposés par votre contrat, où placer votre épargne et dans quelles proportions : fonds
            en euros (le support garanti en capital des contrats français), unités de compte (des
            supports d'investissement dont la valeur fluctue, non garantis), fonds actions, fonds
            obligataires, ETF (des fonds cotés en bourse qui répliquent un indice à frais réduits).
            Vous décidez seul de l'allocation initiale et de ses ajustements dans le temps —
            personne n'intervient à votre place, et personne ne facture de frais supplémentaire
            pour ce service.
          </p>
          <p>
            La gestion pilotée, elle, délègue cette responsabilité. Vous répondez à un
            questionnaire de profil de risque (horizon de placement, tolérance aux pertes,
            objectifs), on vous classe dans un profil type — prudent, équilibré, dynamique, parfois
            décliné en cinq ou six paliers plus fins — et un gérant ou un algorithme réalloue votre
            épargne entre les supports du contrat selon des règles définies à l'avance. Ce service
            est encadré par un mandat de gestion (le contrat qui autorise le gérant à arbitrer votre
            épargne sans vous demander votre accord à chaque mouvement) et rémunéré par un frais
            spécifique, en plus des frais déjà présents dans le contrat et dans les fonds
            sous-jacents.
          </p>
          <p>
            Une variante mérite d'être distinguée : la gestion pilotée « à horizon ». Elle ne se
            contente pas d'appliquer un profil fixe, elle le fait évoluer automatiquement à mesure
            que la date de départ à la retraite (ou l'échéance visée) se rapproche : la part
            d'actifs risqués (actions, immobilier) diminue progressivement au profit d'actifs
            sécurisés (fonds en euros, obligations), sans intervention de l'épargnant. C'est ce
            mécanisme précis, imposé par défaut sur les PER depuis la loi PACTE de 2019, que la
            section suivante détaille.
          </p>

          <h2 id="per-defaut">Sur un PER, pourquoi la gestion pilotée à horizon est-elle le mode par défaut ?</h2>
          <p>
            C'est un fait peu connu, mais central pour comprendre son propre contrat : depuis la
            loi PACTE, la gestion pilotée à horizon est le mode de gestion appliqué par défaut à
            tout PER (plan d'épargne retraite), sauf si l'épargnant demande explicitement à
            basculer en gestion libre. Concrètement, à l'ouverture d'un PER, si vous ne cochez
            aucune case particulière, votre épargne est automatiquement gérée selon un profil «
            équilibré » (ou parfois « prudent horizon retraite ») qui se désensibilise avec le
            temps.
          </p>
          <p>
            Le mécanisme de sécurisation progressive fonctionne par paliers, généralement définis
            par le nombre d'années restant avant l'âge de départ déclaré : tant que l'échéance est
            lointaine (plus de dix ans, par exemple), l'allocation reste largement investie en
            supports dynamiques, actions notamment, pour viser un rendement de long terme — l'ordre
            de grandeur historique des grands indices actions mondiaux se situe entre{" "}
            {pct(RENDEMENTS.ucActionsLongTerme.min)} et {pct(RENDEMENTS.ucActionsLongTerme.max)}{" "}
            annualisés sur 20 à 30 ans, dividendes réinvestis, avant frais — une moyenne de très
            long terme obtenue au prix d'années fortement négatives, et les performances passées ne
            préjugent jamais des performances futures. À mesure que l'échéance se rapproche, la
            part actions est vendue par tranches au profit du fonds en euros ou de fonds
            obligataires, jusqu'à atteindre, dans la dernière ligne droite avant la retraite, une
            allocation très majoritairement sécurisée.
          </p>
          <p>
            Le raisonnement du législateur est cohérent : un PER est, par construction, une épargne
            bloquée jusqu'à la retraite (sauf cas de déblocage anticipé prévus par la loi). Il est
            donc logique de protéger mécaniquement l'épargnant contre le risque de subir une chute
            de marché l'année précédant son départ, moment où il n'a plus le temps de laisser le
            capital se reconstituer. La gestion pilotée à horizon répond à un vrai problème :
            l'inertie et le manque de vigilance de la majorité des épargnants, qui ne rééquilibrent
            jamais spontanément leur allocation avec l'âge.
          </p>
          <p>
            Ce mode par défaut n'est cependant pas une fatalité. Rien n'empêche un épargnant qui
            souhaite garder la main — ou qui juge le calendrier de désensibilisation trop prudent,
            ou au contraire trop tardif, au regard de sa propre situation — de demander le passage
            en gestion libre, généralement en quelques clics dans l'espace client ou par un
            courrier au gestionnaire. Notre page sur{" "}
            <a href="/guide/per-bancaire-frais-gestion-horizon">
              le PER bancaire et sa gestion pilotée à horizon
            </a>{" "}
            détaille plus précisément les paliers d'âge et les frais observés sur ce type de
            contrat.
          </p>

          <h2 id="av-defaut">Sur une assurance-vie, pourquoi est-ce l'inverse ?</h2>
          <p>
            Sur une assurance-vie classique, aucune loi n'impose de mode de gestion par défaut : la
            gestion libre reste la norme. À la souscription, l'épargnant répartit lui-même son
            versement entre fonds en euros et unités de compte, et cette répartition ne change que
            s'il en donne l'instruction — l'assureur n'arbitre jamais spontanément un contrat en
            gestion libre. Pour bénéficier d'une gestion pilotée sur une assurance-vie, il faut au
            contraire une démarche active : signer un mandat de gestion dédié, en plus du contrat
            lui-même, ce qui matérialise le caractère optionnel — et facturé à part — de cette
            délégation.
          </p>
          <p>
            Cette asymétrie entre les deux enveloppes n'est pas un détail administratif : elle
            inverse complètement la question que doit se poser l'épargnant. Sur un PER, la question
            est « dois-je sortir du mode par défaut pour reprendre la main ? ». Sur une
            assurance-vie, elle est « ai-je intérêt à activer une délégation que je n'ai pas
            aujourd'hui ? ». Beaucoup d'épargnants, faute de le savoir, se retrouvent dans une
            situation qu'ils n'ont jamais choisie consciemment : gérés sans l'avoir demandé sur leur
            PER, livrés à eux-mêmes sans l'avoir décidé sur leur assurance-vie. Notre article sur{" "}
            <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">
              pourquoi une assurance-vie rapporte parfois si peu
            </a>{" "}
            détaille, à ce sujet, les pièges spécifiques de la gestion pilotée facultative en
            assurance-vie ; nous n'y revenons pas ici en détail, mais la section suivante en
            généralise le raisonnement aux deux enveloppes.
          </p>

          <h2 id="cout">Combien coûte réellement la gestion pilotée ?</h2>
          <p>
            La gestion pilotée n'est jamais gratuite. Elle ajoute une couche de frais spécifique —
            le surcoût de mandat — au-dessus de deux étages déjà présents dans tout contrat : les
            frais du contrat lui-même (frais de gestion annuels prélevés par l'assureur) et les
            frais courants de chaque fonds sous-jacent (ceux que le gérant sélectionne pour
            construire l'allocation du profil). Ce surcoût se situe, en ordre de grandeur, entre{" "}
            {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} et {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)}{" "}
            par an de l'encours géré.
          </p>
          <p>
            Pour donner une échelle concrète, prenons deux configurations typiques, en milieu de
            fourchette et hypothèses illustratives à taux constants. Sur un contrat internet en
            supports indiciels (ETF), les frais cumulés de contrat et de supports tournent autour
            de {pct(fraisLibreInternet)} par an en gestion libre ; ajoutez le surcoût de mandat, et
            le total en gestion pilotée grimpe à environ {pct(fraisPiloteeInternet)} par an. Sur un
            contrat bancaire traditionnel investi en fonds « maison », la gestion libre revient déjà
            à environ {pct(fraisLibreBancaire)} par an ; avec un mandat de gestion pilotée, le total
            approche {pct(fraisPiloteeBancaire)} par an.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Configuration (hypothèse illustrative)</th>
                  <th>Frais annuels cumulés en gestion libre</th>
                  <th>Frais annuels cumulés en gestion pilotée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Contrat internet, supports ETF</td>
                  <td>{pct(fraisLibreInternet)}</td>
                  <td>{pct(fraisPiloteeInternet)}</td>
                </tr>
                <tr>
                  <td>Contrat bancaire traditionnel, fonds « maison »</td>
                  <td>{pct(fraisLibreBancaire)}</td>
                  <td>{pct(fraisPiloteeBancaire)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Sur la durée, cet écart de frais annuels se cumule. À titre purement illustratif, à
            hypothèse de rendement brut strictement identique — prenons{" "}
            {pct(RENDEMENTS.ucActionsLongTerme.moyen)}, la moyenne annualisée historique des grands
            indices actions mondiaux, qui n'est en aucun cas garantie pour l'avenir — 30 000 €
            placés 15 ans sur un contrat internet en gestion libre à {pct(fraisLibreInternet)} de
            frais deviendraient environ{" "}
            {euros(croissance(30000, RENDEMENTS.ucActionsLongTerme.moyen - fraisLibreInternet, 15))}
            , contre environ{" "}
            {euros(
              croissance(30000, RENDEMENTS.ucActionsLongTerme.moyen - fraisPiloteeInternet, 15)
            )}{" "}
            avec un mandat de gestion pilotée sur le même contrat — soit près de{" "}
            {euros(
              croissance(30000, RENDEMENTS.ucActionsLongTerme.moyen - fraisLibreInternet, 15) -
                croissance(30000, RENDEMENTS.ucActionsLongTerme.moyen - fraisPiloteeInternet, 15)
            )}{" "}
            d'écart. Ce calcul est une projection théorique à taux constant, pas une promesse :
            aucun rendement réel n'est linéaire, et les performances passées ne préjugent pas des
            performances futures. Il illustre simplement le prix de la délégation, à comparer au
            temps et aux connaissances qu'elle permet d'économiser.
          </p>
          <p>
            Notre analyse : ce surcoût n'est pas condamnable en soi. Il se justifie pleinement pour
            un épargnant qui, livré à lui-même, laisserait son épargne dormir en fonds en euros
            pendant vingt ans faute de temps ou d'appétence pour la gestion financière — la
            recherche montre que l'inertie coûte souvent bien plus cher qu'un mandat de gestion. Il
            se justifie beaucoup moins pour un épargnant déjà à l'aise avec les grandes catégories
            de supports et disposé à consacrer quelques dizaines de minutes par an à son allocation.
          </p>

          <h2 id="rigidite">Quel est le point de rigidité que l'on explique rarement ?</h2>
          <p>
            Au-delà du coût, la gestion pilotée a une caractéristique structurelle que peu
            d'épargnants découvrent avant d'en avoir besoin : elle fonctionne comme un bloc. Un
            profil piloté n'est pas une collection de lignes que vous pouvez piocher
            individuellement ; c'est une allocation globale, et chaque mouvement — versement,
            retrait, arbitrage automatique du gérant — s'applique proportionnellement à l'ensemble
            des supports du profil.
          </p>
          <p>
            Concrètement, sur un profil composé par exemple de 70 % d'actions et 30 % de fonds en
            euros, un retrait liquide mécaniquement 70 % d'actions et 30 % de fonds en euros — quel
            que soit le contexte de marché au moment du retrait. Si les marchés actions traversent
            une phase de baisse au moment précis où vous avez besoin de récupérer une somme
            (une dépense imprévue, le début de la retraite, un projet), la gestion pilotée ne vous
            permet pas de choisir de puiser d'abord dans la poche sécurisée et de laisser la poche
            actions se reconstituer. Ce choix, pourtant élémentaire en gestion libre — vendre en
            priorité ce qui n'a pas baissé — est structurellement impossible dans un mandat qui
            traite le profil comme un tout indivisible.
          </p>
          <p>
            Ce point est particulièrement sensible pendant la phase de décumulation (le moment où
            l'épargne accumulée devient un revenu régulier), typiquement au moment du départ à la
            retraite ou pendant les retraits programmés qui suivent. C'est précisément la période où
            le calendrier des retraits devient rigide — une pension à compléter chaque mois — et où
            la capacité d'arbitrer finement entre les poches sécurisée et dynamique prend le plus de
            valeur. Un profil piloté figé sur des règles génériques, calées une fois pour toutes sur
            un questionnaire répondu des années plus tôt, s'adapte mal à ce moment précis du cycle
            de vie de l'épargne.
          </p>
          <p>
            En gestion libre, à l'inverse, rien n'empêche de construire une politique de retrait
            asymétrique : consommer d'abord le fonds en euros ou les obligations les années de
            baisse des marchés actions, et inversement puiser dans la poche actions les années où
            elle a bien performé. Cette liberté a un prix : elle suppose de suivre soi-même ses
            supports et de prendre ces décisions au bon moment, ce qui demande du temps, des
            connaissances, et une certaine discipline émotionnelle — l'appétit de vendre au pire
            moment, en pleine panique de marché, n'épargne pas non plus les gestionnaires en libre.
          </p>

          <h2 id="tableau">Gestion pilotée ou gestion libre : le tableau comparatif</h2>
          <p>
            Pour synthétiser les critères qui différencient réellement les deux modes de gestion,
            au-delà des arguments commerciaux :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Gestion pilotée</th>
                  <th>Gestion libre</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Coût</td>
                  <td>
                    Surcoût de mandat de {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à{" "}
                    {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)} par an, en plus des frais du
                    contrat et des fonds sous-jacents
                  </td>
                  <td>Aucun frais de délégation — seuls les frais du contrat et des fonds</td>
                </tr>
                <tr>
                  <td>Temps requis</td>
                  <td>Minimal : questionnaire initial, puis suivi passif</td>
                  <td>Régulier : choix initial, suivi et rééquilibrages à faire soi-même</td>
                </tr>
                <tr>
                  <td>Connaissances nécessaires</td>
                  <td>Faibles — le gérant prend les décisions techniques</td>
                  <td>Réelles — comprendre les grandes classes d'actifs et leurs risques</td>
                </tr>
                <tr>
                  <td>Flexibilité des retraits</td>
                  <td>
                    Faible — retrait proportionnel sur l'ensemble des lignes du profil, quel que
                    soit le contexte de marché
                  </td>
                  <td>Totale — possibilité de choisir quel support liquider en priorité</td>
                </tr>
                <tr>
                  <td>Sécurisation à l'approche de l'échéance</td>
                  <td>
                    Automatique sur les profils « à horizon » — désensibilisation progressive sans
                    intervention
                  </td>
                  <td>Manuelle — à l'épargnant de l'anticiper et de l'exécuter lui-même</td>
                </tr>
                <tr>
                  <td>Mode par défaut sur un PER</td>
                  <td>Oui, depuis la loi PACTE (gestion pilotée à horizon)</td>
                  <td>Non — à demander explicitement</td>
                </tr>
                <tr>
                  <td>Mode par défaut sur une assurance-vie classique</td>
                  <td>Non — nécessite un mandat de gestion dédié</td>
                  <td>Oui — norme par défaut</td>
                </tr>
                <tr>
                  <td>Adapté à qui</td>
                  <td>
                    Épargnants sans temps ni appétence pour le suivi financier, ou souhaitant une
                    sécurisation automatique avant la retraite
                  </td>
                  <td>
                    Épargnants disposés à suivre leur allocation, à l'aise avec les grandes classes
                    d'actifs, ou accompagnés par un conseiller pour les arbitrages
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="choisir">Comment choisir selon votre profil ?</h2>
          <p>
            Trois questions permettent de trancher, dans la pratique. Premièrement, avez-vous
            réellement le temps et l'envie de suivre votre allocation au moins une à deux fois par
            an, de comprendre pourquoi un fonds obligataire baisse quand les taux montent, et de
            décider vous-même quand alléger une ligne actions ? Si la réponse est non — ce qui est
            parfaitement légitime, personne n'a l'obligation de se passionner pour la finance —, la
            gestion pilotée rend un service réel, à condition d'en connaître le coût.
          </p>
          <p>
            Deuxièmement, à quelle distance êtes-vous de l'échéance qui compte — la retraite, le
            plus souvent ? Plus l'horizon est court, plus la mécanique de sécurisation automatique
            d'un profil piloté à horizon prend de valeur, sauf si vous êtes vous-même rigoureux pour
            désensibiliser votre allocation en gestion libre au moment voulu.
          </p>
          <p>
            Troisièmement, cette question rejoint un arbitrage plus large que celui du seul mode de
            gestion : être accompagné par un professionnel, ou piloter seul l'ensemble de sa
            stratégie retraite. La gestion pilotée n'est, au fond, qu'une version automatisée et
            standardisée de cet accompagnement, sans le sur-mesure d'un conseil personnalisé. Notre
            article{" "}
            <a href="/guide/conseiller-ou-gerer-seul-sa-retraite">
              faut-il un conseiller, ou peut-on gérer seul sa retraite
            </a>{" "}
            approfondit cet arbitrage au-delà du seul choix technique traité ici.
          </p>
          <p>
            Une option intermédiaire existe et mérite d'être mentionnée : rien n'empêche de
            panacher, en gérant une partie de son épargne en libre — les convictions fortes, les
            supports que l'on comprend bien — et en confiant le reste à un mandat pour la partie
            que l'on souhaite déléguer. Sur un contrat qui le permet, cette approche hybride évite
            de choisir un mode « tout ou rien ».
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on changer de mode de gestion en cours de contrat ?</h3>
          <p>
            Oui, dans l'immense majorité des cas. Passer de la gestion libre à la gestion pilotée
            suppose de signer un mandat de gestion ; passer de la gestion pilotée à la gestion
            libre suppose généralement une simple demande de résiliation du mandat, sans frais de
            sortie particuliers la plupart du temps. Vérifiez toutefois les conditions générales de
            votre contrat, certains établissements imposant un délai de préavis.
          </p>
          <h3>La gestion pilotée garantit-elle un meilleur rendement que la gestion libre ?</h3>
          <p>
            Non, aucune des deux formules ne garantit un rendement supérieur à l'autre. La gestion
            pilotée garantit une méthode — une allocation professionnelle et, sur un profil à
            horizon, une désensibilisation automatique — pas une performance. Les performances
            passées, quel que soit le mode de gestion, ne préjugent jamais des performances futures.
          </p>
          <h3>Sur un PER, dois-je obligatoirement accepter la gestion pilotée à horizon ?</h3>
          <p>
            Non. C'est le mode appliqué par défaut depuis la loi PACTE si vous ne faites aucune
            démarche particulière, mais vous pouvez demander à tout moment le passage en gestion
            libre auprès du gestionnaire de votre PER, sans justification à fournir.
          </p>
          <h3>Une gestion pilotée à horizon convient-elle à tous les profils de PER ?</h3>
          <p>
            Elle convient bien à un profil standard qui n'a pas de contrainte particulière de
            calendrier. Elle convient moins bien à un épargnant qui prévoit, par exemple, un
            cumul emploi-retraite (continuer à travailler après la liquidation) et donc un besoin
            de capital décalé dans le temps par rapport à l'échéance générique retenue par le
            profil ; notre guide sur{" "}
            <a href="/guide/cumul-emploi-retraite-comment-ca-marche">
              le cumul emploi-retraite
            </a>{" "}
            détaille ce cas de figure.
          </p>
          <h3>La gestion pilotée coûte-t-elle le même prix sur tous les contrats ?</h3>
          <p>
            Non, le surcoût de mandat varie sensiblement d'un établissement à l'autre, à l'intérieur
            d'une fourchette de {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à{" "}
            {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)} par an en ordre de grandeur. Il s'ajoute
            toujours aux frais du contrat et des fonds sous-jacents, jamais à la place.
          </p>
          <h3>Peut-on avoir une gestion pilotée sur un PEA ou un compte-titres ?</h3>
          <p>
            Certains établissements proposent des offres de gestion sous mandat sur PEA (plan
            d'épargne en actions) ou compte-titres, mais c'est moins répandu et moins standardisé
            que sur le PER ou l'assurance-vie. La question du mode de gestion par défaut, elle, ne
            se pose pas dans les mêmes termes que pour ces deux enveloppes.
          </p>
          <h3>La gestion pilotée protège-t-elle vraiment contre une baisse des marchés juste avant la retraite ?</h3>
          <p>
            Elle réduit ce risque en diminuant mécaniquement la part d'actifs risqués à l'approche
            de l'échéance déclarée, ce qui est son objectif premier. Elle ne l'élimine pas
            totalement : le calendrier de désensibilisation est générique, calé sur une échéance
            théorique, et peut être plus ou moins bien ajusté à votre situation réelle qu'un suivi
            manuel attentif en gestion libre.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La gestion pilotée et la gestion libre répondent à un même besoin — faire fructifier une
            épargne retraite — par deux chemins opposés : déléguer moyennant un surcoût de{" "}
            {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)}{" "}
            par an, ou garder la main sans ce coût mais avec le temps et les connaissances que cela
            suppose. Aucune des deux n'est intrinsèquement supérieure ; le bon choix dépend de votre
            disponibilité, de votre aisance avec les grandes classes d'actifs, et de la distance qui
            vous sépare de l'échéance que vous visez.
          </p>
          <p>
            Ce qui mérite en revanche d'être clarifié, quel que soit votre choix, c'est de savoir
            dans quel mode vous vous trouvez réellement aujourd'hui — car PER et assurance-vie
            partent de réglages par défaut opposés, et beaucoup d'épargnants n'ont jamais vérifié
            lequel s'applique à leurs contrats. Un PER ouvert sans démarche particulière est, par
            défaut, en gestion pilotée à horizon ; une assurance-vie classique est, par défaut, en
            gestion libre. Vérifier ce point sur chacun de vos contrats est un préalable simple à
            toute décision plus fine.
          </p>
          <p>
            Une fois ce diagnostic posé, la vraie question devient stratégique : faut-il rester
            dans le mode par défaut, en basculer, ou panacher les deux selon les enveloppes ? Cette
            décision s'articule naturellement avec d'autres choix structurants de votre stratégie
            retraite — le type d'enveloppe à privilégier, détaillé dans notre page{" "}
            <a href="/strategies/per">stratégie PER</a> et notre comparatif{" "}
            <a href="/guide/quel-est-le-meilleur-per">quel est le meilleur PER</a>, ou encore le
            choix plus large d'être accompagné, traité dans notre article{" "}
            <a href="/guide/conseiller-ou-gerer-seul-sa-retraite">
              conseiller ou gérer seul sa retraite
            </a>
            . Sur le terrain de l'assurance-vie, notre guide{" "}
            <a href="/strategies/assurance-vie-retraite">assurance-vie et retraite</a> replace ce
            choix de gestion dans une vision d'ensemble de l'enveloppe.
          </p>
          <div className="note">
            <p>
              Cette analyse est volontairement générale : elle décrit des mécanismes communs à la
              plupart des contrats du marché, pas les spécificités du vôtre. Les frais de mandat, les
              paliers de désensibilisation et les supports disponibles varient d'un établissement à
              l'autre et doivent être vérifiés dans les conditions générales de votre contrat. Les
              chiffres cités dans cet article sont des ordres de grandeur de marché ou des hypothèses
              illustratives datées ({HYPOTHESES_MAJ}), jamais des promesses : les performances
              passées ne préjugent pas des performances futures. Cette page ne constitue pas un
              conseil en investissement personnalisé ; un{" "}
              <a href="/bilan-retraite">bilan retraite gratuit</a> permet d'examiner vos contrats
              réels et le mode de gestion qui s'y applique.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Vérifions ensemble le mode de gestion de vos contrats retraite"
        button="Demander mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
