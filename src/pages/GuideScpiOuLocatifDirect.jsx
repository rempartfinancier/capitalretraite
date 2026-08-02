import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { RENDEMENTS, FRAIS_TYPES, HYPOTHESES_MAJ, pct } from "../components/hypotheses.js";

export default function GuideScpiOuLocatifDirect() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Comparatif</span>
          <h1>SCPI ou investissement locatif direct : lequel choisir pour la retraite ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> les SCPI (sociétés civiles de placement immobilier)
              offrent un accès à l'immobilier sans gestion locative, avec une mutualisation du risque
              sur des centaines de biens, contre des frais de souscription élevés — souvent{" "}
              {pct(FRAIS_TYPES.scpiEntree.min)} à {pct(FRAIS_TYPES.scpiEntree.max)} — et un risque de
              liquidité réel qu'il faut prendre au sérieux : depuis 2023-2025, plusieurs grandes SCPI
              historiques ont suspendu la variabilité de leur capital, et le marché secondaire affiche
              des décotes qui atteignent, sur certains véhicules, plusieurs dizaines de pour cent en
              2025. L'investissement locatif direct offre un effet de levier du crédit plus puissant
              et un contrôle total sur le bien, contre une gestion active et une concentration du
              risque sur un actif unique. Le bon choix dépend surtout de votre tolérance à
              l'implication de gestion et de votre horizon de sortie.
            </p>
          </div>

          <p>
            Les deux options répondent à la même envie — se constituer un revenu complémentaire adossé
            à l'immobilier pour la retraite — mais avec des mécaniques de fonctionnement, de risque et
            de liquidité très différentes. Ce guide compare les deux sans faire de l'une la solution
            par défaut : notre analyse a évolué ces dernières années à mesure que le marché des SCPI a
            traversé sa crise de liquidité la plus sérieuse depuis sa création, un point que nous
            détaillons plus bas car il change la lecture du risque par rapport à ce qu'affichaient les
            brochures commerciales d'il y a cinq ans.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#scpi">La SCPI : mutualisation et délégation, contre frais et liquidité</a></li>
              <li><a href="#liquidite">Le point de vigilance 2025-2026 : la crise de liquidité des SCPI</a></li>
              <li><a href="#locatif">Le locatif direct : effet de levier et contrôle, contre gestion active</a></li>
              <li><a href="#tableau">Le comparatif</a></li>
              <li><a href="#fiscalite">La fiscalité : deux régimes différents</a></li>
              <li><a href="#profils">Quel profil pour quelle option ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="scpi">La SCPI : mutualisation et délégation, contre frais et liquidité</h2>
          <p>
            Une SCPI collecte l'épargne de nombreux investisseurs pour acquérir et gérer un parc
            immobilier diversifié (bureaux, commerces, santé, logistique selon les SCPI), et
            redistribue les loyers perçus, nets de frais de gestion, sous forme de dividendes
            trimestriels. L'investisseur ne gère rien — ni la recherche de locataire, ni les travaux,
            ni les impayés — et son risque est mutualisé sur des centaines de biens et de locataires
            plutôt que concentré sur un seul. Le taux de distribution moyen constaté en 2024 s'établit
            en ordre de grandeur autour de {pct(RENDEMENTS.scpi.moyen)}, dans une fourchette de{" "}
            {pct(RENDEMENTS.scpi.min)} à {pct(RENDEMENTS.scpi.max)} selon les véhicules (données{" "}
            {RENDEMENTS.scpi.periode}, à vérifier — ni le revenu ni le capital ne sont garantis).
          </p>
          <p>
            Le prix d'entrée de cette simplicité est double. D'abord des frais de souscription
            historiquement élevés, en ordre de grandeur {pct(FRAIS_TYPES.scpiEntree.min)} à{" "}
            {pct(FRAIS_TYPES.scpiEntree.max)} du montant investi, intégrés dans le prix de la part et
            amortis sur plusieurs années de détention — certaines SCPI plus récentes affichent des
            frais d'entrée réduits en contrepartie de frais de gestion annuels plus élevés, un arbitrage
            à comparer véhicule par véhicule. Ensuite, une liquidité qui n'a rien d'automatique : une
            part de SCPI n'est ni cotée en continu ni rachetable à prix garanti, contrairement à ce que
            le discours commercial laisse parfois entendre.
          </p>

          <h2 id="liquidite">Le point de vigilance 2025-2026 : la crise de liquidité des SCPI</h2>
          <p>
            C'est le point que cet article traite avec le plus de rigueur, car il a changé
            significativement depuis 2023. Le marché des SCPI traverse depuis lors sa crise de
            liquidité la plus sérieuse depuis sa création : plusieurs milliards d'euros de parts
            attendaient un acquéreur fin 2025, et un nombre significatif de SCPI, y compris parmi les
            plus anciennes et les plus connues du marché, ont suspendu la variabilité de leur capital
            — c'est-à-dire qu'elles ne rachètent plus automatiquement les parts des associés
            souhaitant sortir, renvoyant ces derniers vers un marché secondaire où l'acheteur fixe le
            prix. Sur ce marché secondaire, les décotes observées se situent le plus souvent entre 20
            % et 30 % du prix officiel de la part, avec des cas extrêmes dépassant 50 % sur certains
            véhicules particulièrement affectés (données 2025, à vérifier — la situation évolue
            rapidement et diffère fortement d'une SCPI à l'autre).
          </p>
          <p>
            Ce risque n'est ni nouveau dans son principe (une SCPI a toujours pu, en théorie, limiter
            ses rachats) ni généralisé à l'ensemble du marché — certaines SCPI, notamment les plus
            récentes et les mieux diversifiées géographiquement et sectoriellement, continuent de
            fonctionner normalement. Mais il doit désormais être intégré à toute décision
            d'investissement en SCPI comme un scénario réel, et non comme une hypothèse d'école : avant
            de souscrire, il faut regarder la taille de la SCPI, son taux de rotation du capital, son
            historique de collecte récente, et éviter de concentrer une épargne retraite sur une seule
            SCPI ou une seule société de gestion.
          </p>

          <h2 id="locatif">Le locatif direct : effet de levier et contrôle, contre gestion active</h2>
          <p>
            L'investissement locatif direct — l'achat d'un bien immobilier en nom propre, financé
            totalement ou partiellement à crédit — offre un avantage que la SCPI ne réplique pas de la
            même façon : un effet de levier maîtrisé et négocié par l'investisseur lui-même, avec un
            bien identifié, choisi et contrôlé de bout en bout. Le rendement locatif brut se situe en
            ordre de grandeur entre {pct(RENDEMENTS.locatifDirect.min)} et {pct(RENDEMENTS.locatifDirect.max)}{" "}
            selon les villes (données {RENDEMENTS.locatifDirect.periode}, hors vacance, travaux et
            fiscalité), un chiffre brut qu'il faut toujours ramener au net une fois les charges
            déduites. Notre guide{" "}
            <a href="/guide/combien-coute-un-investissement-locatif">
              combien coûte réellement un investissement locatif
            </a>{" "}
            détaille ce passage du brut au net.
          </p>
          <p>
            Le revers de cette maîtrise est la gestion active : recherche du bien, financement,
            travaux éventuels, recherche de locataire ou délégation à une agence (dont les frais de
            gestion locative se situent en ordre de grandeur entre{" "}
            {pct(FRAIS_TYPES.immobilierLocatif.fraisGestionLocative.min)} et{" "}
            {pct(FRAIS_TYPES.immobilierLocatif.fraisGestionLocative.max)} des loyers), gestion des
            impayés et de la vacance locative, entretien du bien dans la durée. Le risque n'est pas
            mutualisé : il repose sur un actif unique, dans une ville et un quartier uniques, avec une
            exposition directe à la conjoncture locale du marché locatif et à la solvabilité d'un
            nombre restreint de locataires successifs. Nos guides{" "}
            <a href="/guide/lmnp-risques">LMNP : les risques que l'on vous cache</a> et{" "}
            <a href="/guide/cinq-erreurs-investissement-locatif-retraite">
              les 5 erreurs de l'investissement locatif retraite
            </a>{" "}
            détaillent ces risques opérationnels.
          </p>

          <h2 id="tableau">Le comparatif</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>SCPI</th>
                  <th>Locatif direct</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ticket d'entrée</td>
                  <td>Quelques centaines à quelques milliers d'euros par part</td>
                  <td>Prix d'un bien entier, souvent financé à crédit</td>
                </tr>
                <tr>
                  <td>Gestion</td>
                  <td>Déléguée à la société de gestion</td>
                  <td>Active (recherche, travaux, locataire, entretien) ou déléguée à une agence</td>
                </tr>
                <tr>
                  <td>Diversification du risque</td>
                  <td>Mutualisée sur des centaines de biens et locataires</td>
                  <td>Concentrée sur un bien et un nombre restreint de locataires</td>
                </tr>
                <tr>
                  <td>Frais d'entrée</td>
                  <td>
                    {pct(FRAIS_TYPES.scpiEntree.min)} à {pct(FRAIS_TYPES.scpiEntree.max)}
                  </td>
                  <td>
                    {pct(FRAIS_TYPES.immobilierLocatif.fraisNotaireAncien.min)} à{" "}
                    {pct(FRAIS_TYPES.immobilierLocatif.fraisNotaireAncien.max)} (notaire, ancien)
                  </td>
                </tr>
                <tr>
                  <td>Effet de levier du crédit</td>
                  <td>Possible mais moins courant, conditions bancaires spécifiques</td>
                  <td>Standard, largement pratiqué et négociable</td>
                </tr>
                <tr>
                  <td>Liquidité de sortie</td>
                  <td>Variable selon la SCPI ; marché secondaire avec décote possible depuis 2023-2025</td>
                  <td>Délai de vente d'un bien (plusieurs mois), négociation au cas par cas</td>
                </tr>
                <tr>
                  <td>Rendement (ordre de grandeur)</td>
                  <td>
                    {pct(RENDEMENTS.scpi.min)} à {pct(RENDEMENTS.scpi.max)}
                  </td>
                  <td>
                    {pct(RENDEMENTS.locatifDirect.min)} à {pct(RENDEMENTS.locatifDirect.max)} brut
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="fiscalite">La fiscalité : deux régimes différents</h2>
          <p>
            Les revenus de SCPI relèvent, sauf montage spécifique (SCPI logée en assurance-vie ou en
            PER par exemple, avec une fiscalité différente de celle des parts détenues en direct), du
            régime des revenus fonciers, avec les prélèvements sociaux applicables à l'immobilier (voir
            notre tableau des taux dans notre guide{" "}
            <a href="/guide/combien-coute-un-investissement-locatif">
              combien coûte un investissement locatif
            </a>
            ). Le locatif direct relève, selon le régime choisi et la nature de la location
            (meublée ou nue), soit du régime des revenus fonciers, soit du régime des BIC pour le LMNP
            — deux régimes aux mécaniques d'amortissement très différentes, détaillées dans notre
            comparatif{" "}
            <a href="/guide/lmnp-ou-locatif-nu">LMNP ou locatif nu</a>.
          </p>
          <p>
            Loger des parts de SCPI dans une assurance-vie ou un PER change la donne fiscale — les
            revenus suivent alors le régime de l'enveloppe et non celui des revenus fonciers classiques
            — mais implique en général des frais de gestion supplémentaires prélevés par l'assureur, à
            comparer soigneusement au gain fiscal espéré avant de choisir ce montage.
          </p>

          <h2 id="profils">Quel profil pour quelle option ?</h2>
          <p>
            La SCPI convient davantage à qui cherche un revenu immobilier sans implication de gestion,
            souhaite diversifier une épargne déjà investie ailleurs sans mobiliser un temps de gestion
            actif, ou dispose d'un capital insuffisant pour l'apport d'un bien entier. Le locatif
            direct convient davantage à qui veut maximiser l'effet de levier du crédit, accepte de
            gérer activement ou de déléguer à une agence, et souhaite garder un contrôle total sur le
            choix du bien, son emplacement et sa stratégie de valorisation.
          </p>
          <p>
            Dans les patrimoines que nous accompagnons, les deux options sont rarement exclusives :
            un investisseur peut démarrer par des SCPI pour tester l'exposition immobilière sans
            engagement de gestion, puis se tourner vers du locatif direct une fois un capital plus
            important disponible et un goût confirmé pour la gestion active — ou l'inverse, alléger
            progressivement un parc locatif direct devenu contraignant à gérer au profit de SCPI plus
            passives à l'approche de la retraite. Notre guide{" "}
            <a href="/guide/immobilier-locatif-ou-assurance-vie">
              immobilier locatif ou assurance-vie
            </a>{" "}
            élargit la comparaison à une troisième option, moins contraignante encore.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Les SCPI sont-elles risquées aujourd'hui ?</h3>
          <p>
            Comme tout investissement immobilier, elles comportent un risque de perte en capital et,
            depuis 2023-2025, un risque de liquidité avéré sur une partie du marché : plusieurs SCPI
            ont suspendu la variabilité de leur capital et le marché secondaire affiche des décotes
            significatives sur certains véhicules. Ce risque varie fortement d'une SCPI à l'autre selon
            sa taille, sa diversification et sa collecte récente — il ne se généralise pas à l'ensemble
            du marché.
          </p>
          <h3>Peut-on financer des parts de SCPI à crédit ?</h3>
          <p>
            Oui, c'est possible auprès de certains établissements, mais les conditions d'octroi et les
            taux sont en général moins favorables que pour un crédit immobilier classique adossé à un
            bien en direct, car la banque dispose d'une garantie différente sur un actif financier
            plutôt qu'un bien immobilier physique.
          </p>
          <h3>Le locatif direct est-il toujours plus rentable que la SCPI ?</h3>
          <p>
            Pas nécessairement : l'effet de levier du crédit peut amplifier le rendement du locatif
            direct, mais il amplifie également le risque et immobilise un temps de gestion que la SCPI
            évite. Le rendement net réel du locatif direct dépend fortement de la ville, du type de
            bien et de la qualité de la gestion — un écart qui peut être bien plus large que celui
            observé entre SCPI.
          </p>
          <h3>Comment limiter le risque de liquidité d'une SCPI ?</h3>
          <p>
            En diversifiant sur plusieurs SCPI et plusieurs sociétés de gestion plutôt que de
            concentrer l'épargne sur un seul véhicule, en vérifiant la taille et le taux de collecte
            récent avant de souscrire, et en considérant la SCPI comme un placement de long terme, non
            comme une réserve de liquidité disponible à court terme.
          </p>
          <h3>Peut-on revendre facilement des parts de SCPI ?</h3>
          <p>
            Cela dépend entièrement de la SCPI : certaines rachètent régulièrement les parts au prix
            officiel quand la collecte le permet, d'autres, en tension de liquidité, renvoient les
            vendeurs vers un marché secondaire où le prix se négocie, parfois avec une décote
            importante et un délai de cession non garanti.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La SCPI et le locatif direct répondent à la même intention — un revenu immobilier
            complémentaire pour la retraite — avec des compromis opposés : simplicité et mutualisation
            du risque contre frais d'entrée élevés et liquidité incertaine d'un côté ; effet de levier
            et contrôle total contre gestion active et concentration du risque de l'autre. La crise de
            liquidité qui traverse une partie du marché des SCPI depuis 2023-2025 doit être prise au
            sérieux dans le choix d'un véhicule précis, sans pour autant disqualifier la classe d'actif
            dans son ensemble. Le bon dosage dépend de votre capital disponible, de votre appétence
            pour la gestion active, et de l'horizon auquel vous pensez avoir besoin de liquider tout ou
            partie de cet investissement — un arbitrage que nous détaillons systématiquement lors d'un{" "}
            <a href="/bilan-retraite">bilan retraite gratuit</a>.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement personnalisé.
              Les rendements cités sont des constats passés ou des ordres de grandeur de marché,
              révisés en {HYPOTHESES_MAJ}, à vérifier véhicule par véhicule et bien par bien avant toute
              décision. Ni le revenu ni le capital ne sont garantis, que ce soit en SCPI ou en
              investissement locatif direct ; la situation de liquidité du marché des SCPI évolue
              rapidement et doit être vérifiée SCPI par SCPI au moment de la souscription.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="SCPI, locatif direct, ou un dosage des deux : parlons de votre stratégie immobilière retraite"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
