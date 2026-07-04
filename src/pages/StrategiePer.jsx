import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { SimulateurCapitalisation } from "../components/Simulateurs.jsx";
import {
  RENDEMENTS,
  FRAIS_TYPES,
  FISCALITE,
  ILLUSTRATIF,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

// Illustration pédagogique : 10 000 € placés 10 ans, taux illustratif
// (ILLUSTRATIF.tauxDynamique) vs rendement moyen des fonds en euros —
// toutes les valeurs proviennent de hypotheses.js.
const TAUX_ILLUSTRATIF = ILLUSTRATIF.tauxDynamique; // % par an — hypothèse purement illustrative
const CAPITAL_ILLUSTRATIF = 10000 * Math.pow(1 + TAUX_ILLUSTRATIF / 100, 10);
const CAPITAL_FONDS_EUROS = 10000 * Math.pow(1 + RENDEMENTS.fondsEuros.moyen / 100, 10);

export default function StrategiePer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Stratégie 01</span>
          <h1>Le Plan Épargne Retraite : puissant, mais pas pour tout le monde</h1>
          <p className="sub">
            Le PER est l'enveloppe explicitement conçue pour la retraite. Son avantage fiscal est
            réel — ses contreparties aussi.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Comment fonctionne un PER</h2>
          <p>
            Le PER individuel est une enveloppe d'épargne bloquée jusqu'à la retraite (hors cas de
            déblocage anticipé prévus par la loi, dont l'achat de la résidence principale et les
            accidents de la vie). Vous y versez librement ; les sommes sont investies sur des
            supports allant du fonds en euros aux unités de compte, souvent via une gestion pilotée
            « à horizon » qui sécurise progressivement le capital à l'approche de la retraite.
          </p>
          <p>
            Fonds en euros, unités de compte, gestion pilotée : ces trois termes recouvrent des
            réalités très différentes. Et lorsqu'un épargnant décrit son PER comme une déception,
            la cause est rarement l'enveloppe elle-même — c'est presque toujours son contenu. D'où
            le détour qui suit, avant même de parler fiscalité.
          </p>

          <h2>Ce qu'il y a à l'intérieur d'un PER : les trois supports</h2>
          <p>
            Un PER n'est qu'un contenant fiscal. À l'intérieur, votre épargne est répartie entre
            des supports d'investissement, et c'est cette répartition — bien plus que l'avantage
            fiscal — qui déterminera le capital réellement disponible à la retraite. Trois grandes
            familles cohabitent.
          </p>

          <h3>Le fonds en euros : la sécurité, à sa juste place</h3>
          <p>
            Le fonds en euros est un support dont le capital est garanti par l'assureur : les
            intérêts crédités chaque année sont définitivement acquis (c'est l'« effet cliquet »)
            et la valeur ne baisse pas au gré des marchés. Cette garantie doit toutefois être
            immédiatement bornée : elle vaut hors faillite de l'assureur, et elle s'entend le plus
            souvent avant déduction des frais de gestion du contrat — une année où les frais
            dépassent les intérêts servis, la valeur peut donc légèrement reculer.
          </p>
          <p>
            Notre analyse : la sécurité n'est pas un défaut, et le fonds en euros a une place
            légitime dans un PER — une seule. Sécuriser les sommes dont on aura besoin dans les
            trois ou quatre prochaines années, typiquement à l'approche de la liquidation du plan
            (le moment où vous débloquez votre épargne à la retraite), relève de la bonne gestion.
            En revanche, y loger durablement son épargne à quinze ou vingt ans de l'échéance est
            l'erreur classique des épargnants prudents : avec une inflation (la hausse générale
            des prix) autour de la cible de {pct(RENDEMENTS.inflationLongTerme.moyen)} de la Banque
            centrale européenne, un rendement de l'ordre de {pct(RENDEMENTS.fondsEuros.moyen)} fait
            à peine mieux que maintenir le pouvoir d'achat — alors qu'un horizon long est
            précisément la situation où la prise de risque a historiquement été la mieux
            rémunérée, sans garantie qu'elle le reste.
          </p>
          <p>
            Côté chiffres : en {RENDEMENTS.fondsEuros.periode}, le rendement moyen servi par les
            fonds en euros s'est établi autour de {pct(RENDEMENTS.fondsEuros.moyen)}, dans une
            fourchette d'environ {pct(RENDEMENTS.fondsEuros.min)} à{" "}
            {pct(RENDEMENTS.fondsEuros.max)} selon les contrats (moyenne de marché publiée par
            France Assureurs / ACPR pour {RENDEMENTS.fondsEuros.periode}, nette de frais de
            gestion, avant prélèvements sociaux). C'est un constat passé : il ne préjuge en rien des rendements
            futurs. À titre d'illustration purement théorique : 10 000 € placés dix ans à une
            hypothèse de {pct(TAUX_ILLUSTRATIF)} par an atteindraient {euros(CAPITAL_ILLUSTRATIF)},
            contre {euros(CAPITAL_FONDS_EUROS)} au rendement moyen constaté en{" "}
            {RENDEMENTS.fondsEuros.periode} — soit {euros(CAPITAL_ILLUSTRATIF - CAPITAL_FONDS_EUROS)}{" "}
            d'écart avant toute fiscalité. Ces projections sont des hypothèses de travail, en
            aucun cas des promesses.
          </p>
          <p>
            Un point technique méconnu mérite d'être signalé, car il joue plutôt en faveur du
            PER : dans une assurance-vie, les prélèvements sociaux
            ({pct(FISCALITE.prelevementsSociaux.assuranceVie)}) sont prélevés chaque année sur les
            intérêts du fonds en euros, ce qui ampute la capitalisation au fil de l'eau ; sur un
            PER assurantiel, ils ne sont en principe prélevés qu'à la sortie — au taux applicable
            au PER ({pct(FISCALITE.prelevementsSociaux.per)}) —, laissant les intérêts bruts se
            recapitaliser dans l'intervalle. Cette différence de calendrier adoucit la
            critique — elle n'en change pas la conclusion : sur un horizon long, c'est le niveau
            du rendement qui pose problème, pas la date du prélèvement.
          </p>

          <h3>Les unités de compte : le moteur de la capitalisation longue</h3>
          <p>
            Les unités de compte (UC) désignent tous les supports dont le capital n'est pas
            garanti : fonds investis en actions, fonds obligataires (des paniers de dette d'États
            ou d'entreprises), ou supports immobiliers collectifs comme les SCPI (sociétés civiles
            de placement immobilier — un univers à part entière, que nous ne faisons qu'effleurer
            ici : le site spécialisé{" "}
            <a href="https://scpirentable.fr" target="_blank" rel="noopener noreferrer">
              scpirentable.fr
            </a>{" "}
            lui est consacré). L'assureur garantit le nombre de parts détenues, jamais leur
            valeur : le capital fluctue à la hausse comme à la baisse, et une perte, y compris
            importante, est possible.
          </p>
          <p>
            Notre analyse : c'est pourtant là, et nulle part ailleurs, que se joue une
            capitalisation de quinze ou vingt ans. Sur la durée d'un PER, la part investie en
            actions est le moteur du capital final — à condition d'accepter la volatilité
            (l'ampleur des variations) en chemin et de ne jamais y exposer des sommes dont on aura
            besoin à court terme. Les ETF (fonds indiciels cotés, qui répliquent un indice
            boursier pour des frais réduits) sont à nos yeux un outil parfaitement recevable dans
            un PER, n'en déplaise aux caricatures dans les deux sens. Mais passif ne veut pas dire
            irréfléchi : un ETF achète tout un indice sans discernement, les entreprises qui
            créent de la valeur comme celles qui déclinent. Le choix de l'indice, la cohérence
            avec le reste de votre patrimoine et la discipline dans les baisses restent
            entièrement à votre charge — ou à celle de la personne qui vous accompagne.
          </p>
          <p>
            Côté chiffres : sur les grands indices d'actions mondiales (type MSCI World,
            dividendes réinvestis, en euros), les moyennes annualisées constatées sur 20 à 30 ans se situent dans une
            fourchette de l'ordre de {pct(RENDEMENTS.ucActionsLongTerme.min)} à{" "}
            {pct(RENDEMENTS.ucActionsLongTerme.max)} par an, avant frais et fiscalité. Une moyenne
            n'est pas une régularité : ces mêmes marchés ont connu des baisses de 30 à 50 %
            (éclatement de la bulle Internet en 2000-2002, crise financière de 2008), parfois
            longues à résorber. Les performances passées ne préjugent pas des performances
            futures, et rien ne garantit que ces fourchettes se reproduisent.
          </p>

          <h3>La gestion pilotée à horizon : le pilote automatique et ses angles morts</h3>
          <p>
            La gestion pilotée à horizon est le mode de gestion appliqué par défaut à tout PER
            depuis la loi PACTE de 2019 (la réforme qui a créé le PER) : sauf choix contraire de votre part, votre épargne y est investie
            automatiquement. Le principe : une grille — prudente, équilibrée (le profil retenu par
            défaut) ou dynamique — fixe la part d'actifs risqués en fonction du nombre d'années
            restant avant votre retraite, puis la réduit progressivement à l'approche de
            l'échéance au profit de supports moins volatils : c'est la « désensibilisation ». Sur
            le principe, sécuriser graduellement ce qui approche de son terme est une logique
            saine — c'est d'ailleurs ce qu'un épargnant averti organiserait par lui-même.
          </p>
          <p>
            Notre analyse porte moins sur le principe que sur l'emballage. La gestion pilotée est
            une gestion packagée : elle ajoute une couche de frais (un surcoût de mandat de
            l'ordre de {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à{" "}
            {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)} par an selon les contrats, auquel
            s'ajoutent les frais des fonds logés dans la grille), et elle applique un profil
            standardisé à un épargnant dont elle ignore tout — patrimoine hors PER, projets,
            autres enveloppes, situation familiale. Le vrai piège, toutefois, n'est pas celui
            qu'on croit : ce ne sont pas des « arbitrages ratés » de gérants. C'est la rigidité
            mécanique de l'ensemble. Dans une gestion packagée, on ne choisit pas ce que l'on
            vend : chaque rachat (retrait) ou arbitrage (déplacement d'un support vers un autre)
            est réparti proportionnellement entre toutes les lignes du profil, sans possibilité de
            cibler un support plutôt qu'un autre. Si vous devez sortir
            des fonds pendant un marché baissier, la poche actions est donc vendue au plus bas, en
            même temps que le reste — et une baisse passagère devient une perte définitivement
            matérialisée.
          </p>
          <p>
            L'alternative est la gestion libre : choisir soi-même ses supports et le moment de ses
            arbitrages, pour qui accepte de s'en occuper — ou de se faire accompagner. Aucun mode
            de gestion n'est bon ou mauvais dans l'absolu ; c'est son adéquation à votre
            situation, appréciée au cas par cas, qui tranche. Notre guide{" "}
            <a href="/guide/gestion-pilotee-ou-gestion-libre">
              gestion pilotée ou gestion libre
            </a>{" "}
            détaille cet arbitrage au-delà du seul PER.
          </p>

          <h3>Mesurez l'effet réel : effort d'épargne, frais et fiscalité de sortie</h3>
          <p>
            Le simulateur ci-dessous met des chiffres sur tout ce qui précède. Il montre les deux
            faces que les discours commerciaux dissocient rarement : l'effort d'épargne réel après
            déduction — pour 100 € versés, un contribuable dont la TMI (tranche marginale
            d'imposition : le taux d'impôt appliqué à la dernière tranche de ses revenus) est de
            30 % ne décaisse en réalité que 70 € — et le capital net estimé après la fiscalité de
            sortie en capital : la part des versements est réintégrée au barème de l'impôt sur le
            revenu, les gains sont soumis au prélèvement forfaitaire (un impôt à taux fixe). Le
            détail figure dans notre guide sur{" "}
            <a href="/guide/fiscalite-sortie-per">la fiscalité de sortie du PER</a>. Faites varier
            le rendement et les frais selon le support envisagé, ainsi que vos TMI actuelle et
            anticipée : c'est l'écart entre ces paramètres qui fait ou défait l'intérêt d'un PER.
          </p>
          <SimulateurCapitalisation enveloppe="per" />

          <h3>Les trois supports du PER en un coup d'œil</h3>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Support</th>
                  <th>Garantie du capital</th>
                  <th>Rendement indicatif</th>
                  <th>Risque</th>
                  <th>Pour quel profil</th>
                  <th>Frais typiques</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fonds en euros</td>
                  <td>
                    Oui, par l'assureur — hors faillite de celui-ci, le plus souvent avant frais du
                    contrat
                  </td>
                  <td>
                    {pct(RENDEMENTS.fondsEuros.min)} à {pct(RENDEMENTS.fondsEuros.max)} en{" "}
                    {RENDEMENTS.fondsEuros.periode}, net de frais de gestion
                  </td>
                  <td>
                    Très faible sur le capital ; érosion possible du pouvoir d'achat face à
                    l'inflation
                  </td>
                  <td>
                    Sécurisation des sommes nécessaires sous 3-4 ans, à l'approche de la
                    liquidation
                  </td>
                  <td>
                    Frais de gestion du contrat : {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)} par an selon
                    les contrats
                  </td>
                </tr>
                <tr>
                  <td>Unités de compte</td>
                  <td>Non — le capital fluctue à la hausse comme à la baisse</td>
                  <td>
                    {pct(RENDEMENTS.ucActionsLongTerme.min)} à{" "}
                    {pct(RENDEMENTS.ucActionsLongTerme.max)} par an en moyenne annualisée sur
                    20-30 ans (actions mondiales, avant frais et fiscalité)
                  </td>
                  <td>Élevé à court terme : baisses de 30 à 50 % déjà observées (2000-2002, 2008)</td>
                  <td>La phase de capitalisation, tant que l'échéance reste lointaine</td>
                  <td>
                    Frais du contrat + frais propres à chaque support :{" "}
                    {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)} par an selon
                    supports et contrats
                  </td>
                </tr>
                <tr>
                  <td>Gestion pilotée à horizon</td>
                  <td>Dépend de la grille : mélange évolutif des deux familles ci-dessus</td>
                  <td>Fonction de la grille et des fonds retenus — pas de fourchette unique</td>
                  <td>Dégressif à l'approche de la retraite ; rigidité des sorties au prorata</td>
                  <td>
                    Épargnant qui ne veut pas s'en occuper du tout et en accepte le coût et la
                    standardisation
                  </td>
                  <td>
                    Surcoût de mandat : {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à{" "}
                    {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)} par an, en plus des frais des
                    fonds sous-jacents
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Fourchettes indicatives, hypothèses révisées en {HYPOTHESES_MAJ} ; les performances
            passées ne préjugent pas des performances futures. Les frais exacts figurent dans
            votre contrat et dans le document d'informations clés (DIC) de chaque fonds — c'est
            là, et pas seulement dans la plaquette commerciale, qu'il faut aller les lire. Frais
            réels, qualité des supports, grille à horizon : votre PER actuel est-il au niveau ?
            Nous y consacrons une analyse détaillée :{" "}
            <a href="/guide/per-bancaire-frais-gestion-horizon">
              PER bancaire, frais et gestion à horizon
            </a>. Pour la grille de frais complète poste par poste, voir{" "}
            <a href="/guide/combien-coute-un-per">combien coûte un PER</a> ; et pour savoir
            comment juger n'importe quel contrat sans se fier à un classement affilié,{" "}
            <a href="/guide/quel-est-le-meilleur-per">quel est le meilleur PER</a>.
          </p>

          <h2>L'avantage fiscal à l'entrée</h2>
          <p>
            Les versements volontaires sont déductibles de votre revenu imposable, dans la limite
            d'un plafond annuel indiqué sur votre avis d'imposition. Concrètement, l'économie
            d'impôt est proportionnelle à votre tranche marginale d'imposition : plus votre TMI est
            élevée, plus l'effort d'épargne réel est réduit — et inversement, plus elle est basse,
            moins la déduction pèse. Ce paramètre arithmétique explique que la question du PER se
            pose différemment selon les niveaux d'imposition, mais il ne constitue jamais à lui
            seul un critère de décision : notre analyse est que l'enveloppe se juge sur la
            stratégie patrimoniale d'ensemble, au cas par cas.
          </p>

          <h2>Les modes de sortie</h2>
          <p>À la retraite, trois options s'offrent à vous :</p>
          <ul>
            <li><strong>Sortie en capital</strong> — en une fois ou de manière fractionnée sur plusieurs années ;</li>
            <li><strong>Sortie en rente viagère</strong> — un revenu versé à vie par l'assureur (garantie portée par celui-ci, hors faillite), en contrepartie de l'aliénation du capital (vous renoncez définitivement à celui-ci) ;</li>
            <li><strong>Sortie mixte</strong> — une partie en capital, une partie en rente.</li>
          </ul>
          <p>
            Le choix n'est pas anodin : il détermine la fiscalité applicable et la souplesse dont
            vous disposerez. Nous y consacrons un guide entier :{" "}
            <a href="/guide/fiscalite-sortie-per">la fiscalité de sortie du PER</a>.
          </p>

          <h2>La fiscalité à la sortie : la contrepartie de la déduction</h2>
          <p>
            Ce que le fisc vous accorde à l'entrée, il le reprend en partie à la sortie. Si vous
            avez déduit vos versements, le capital retiré est imposé au barème de l'impôt sur le
            revenu (pour la part correspondant aux versements) et les gains subissent le
            prélèvement forfaitaire. Le PER n'est donc pas une niche fiscale : c'est un
            <em> report</em> d'imposition. Il devient gagnant lorsque votre TMI à la retraite est
            inférieure à votre TMI pendant la vie active — ce qui est fréquent, mais pas
            systématique.
          </p>

          <h2>Pour qui le PER est-il adapté ?</h2>
          <ul>
            <li>Contribuables dont la tranche marginale rend la déduction significative — un paramètre parmi d'autres, jamais suffisant à lui seul —, avec un horizon d'au moins 5 à 10 ans ;</li>
            <li>Épargnants disposant déjà d'une réserve liquide (le PER ne doit jamais être la seule épargne) ;</li>
            <li>Profils qui anticipent une baisse de leur TMI à la retraite.</li>
          </ul>
          <p>
            Sur la déduction, l'arithmétique est simplement proportionnelle : plus la tranche
            marginale est élevée, plus chaque euro versé allège l'impôt de l'année. Mais ce
            paramètre ne suffit jamais à lui seul : l'intérêt du PER se juge sur la stratégie
            patrimoniale d'ensemble — liquidités disponibles, TMI anticipée à la retraite,
            objectifs de transmission — et s'apprécie au cas par cas. Réduire le PER à un
            placement de défiscalisation, c'est d'ailleurs passer à côté de ce qui, dans notre
            analyse, en fait un outil réellement singulier. Notre guide{" "}
            <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER ?</a> détaille les cas où
            la réponse est non, et{" "}
            <a href="/guide/meilleure-enveloppe-retraite">
              quelle est la meilleure enveloppe pour préparer sa retraite
            </a>{" "}
            replace ce choix face au PEA et à l'assurance-vie. Les travailleurs indépendants
            trouveront dans{" "}
            <a href="/guide/retraite-independants-per-ou-madelin">
              PER ou Madelin pour les indépendants
            </a>{" "}
            les spécificités propres à leur statut.
          </p>

          <h3>La face méconnue du PER : protection familiale et transmission</h3>
          <p>
            Un discours répandu présente le PER comme « l'enveloppe pour payer moins d'impôts ».
            Notre analyse inverse la perspective : le PER se juge d'abord comme un outil
            patrimonial global — protéger sa famille, capitaliser à long terme, transmettre — et
            seulement ensuite comme une source d'économie d'impôt. C'est en matière de
            transmission que l'enveloppe révèle sa vraie puissance, à une condition : qu'il
            s'agisse d'un PER assurantiel (souscrit auprès d'un assureur, le cas de la grande
            majorité des PER individuels), et non d'un PER bancaire — un simple compte-titres
            (compte d'instruments financiers, sans enveloppe d'assurance) dépourvu de ces
            avantages.
          </p>
          <p>
            En cas de décès avant 70 ans, les capitaux d'un PER assurantiel sont transmis aux
            bénéficiaires désignés avec un abattement de 152 500 € par bénéficiaire (barème en
            vigueur en juillet 2026) ; en cas de décès après 70 ans, l'abattement est de 30 500 €
            pour l'ensemble des bénéficiaires. Différence notable avec l'assurance-vie : c'est
            l'âge atteint au moment du décès qui détermine le régime applicable, et non la date à
            laquelle les versements ont été effectués.
          </p>
          <p>
            La déduction à l'entrée prend alors un tout autre relief. La formule qui résume notre
            analyse : la déduction n'est pas un cadeau, c'est un report d'imposition — sauf en cas
            de décès avant la liquidation du plan, où elle devient définitivement acquise. Les
            sommes déduites ne sont alors jamais réintégrées à l'impôt sur le revenu. À titre
            d'illustration, à barème constant : un épargnant qui aurait versé et déduit 300 000 €
            au fil des années aurait définitivement écarté, selon sa TMI, de l'ordre de 90 000 €
            (TMI 30 %) à 135 000 € (TMI 45 %) d'impôt si le décès survient avant tout retrait.
            S'y ajoute un point que peu d'épargnants connaissent : les gains constatés sur le plan
            sont transmis sans prélèvements sociaux, que le décès intervienne avant ou après
            70 ans — en l'état des textes en vigueur en juillet 2026.
          </p>
          <p>
            Concrètement, pour un cadre ou un fonctionnaire de 45 à 60 ans : si vous êtes
            raisonnablement certain de ne pas avoir besoin de ce capital à la retraite, le PER
            change de nature — d'épargne retraite bloquée, il devient l'un des vecteurs les plus
            efficaces fiscalement pour transmettre un capital. Si, au contraire, ce capital devra
            financer votre train de vie, l'arbitrage avec les autres enveloppes se calcule au cas
            par cas. Aucune enveloppe ne réunit à la fois liquidité immédiate, rendement net
            maximal et transmission avantageuse : construire une stratégie, c'est décider en
            connaissance de cause de ce que l'on privilégie — et de ce que l'on accepte de céder.
          </p>
          <div className="note">
            Assurantiel ou bancaire ? Le point se vérifie en quelques minutes : regardez auprès de
            qui votre plan a été souscrit — un assureur (éventuellement via un courtier) ou une
            banque teneuse de compte-titres. Ce simple détail conditionne tous les avantages
            successoraux décrits ci-dessus.
          </div>
          <p>
            Reste la question du calendrier — faut-il ouvrir tôt, et le PER garde-t-il un intérêt
            à quelques années de la retraite ? Nous y répondons dans un guide dédié :{" "}
            <a href="/guide/a-quel-age-commencer-per">à quel âge commencer un PER</a>.
          </p>

          <h2>Les pièges à connaître</h2>
          <ul>
            <li>
              <strong>Le blocage</strong> — hors cas légaux, les fonds sont indisponibles jusqu'à
              la retraite. Verser au-delà de sa capacité d'épargne longue est l'erreur la plus courante.
            </li>
            <li>
              <strong>La fiscalité de sortie sous-estimée</strong> — une sortie en capital en une
              seule fois peut faire bondir votre TMI l'année du retrait.
            </li>
            <li>
              <strong>Le mauvais contrat</strong> — frais sur versements élevés, supports pauvres,
              gestion pilotée opaque : d'un contrat à l'autre, l'écart de résultat sur 15 ans peut
              être considérable.
            </li>
          </ul>

          <div className="note">
            Piste de réflexion, pas recommandation : l'intérêt du PER dépend entièrement de votre
            TMI actuelle, de votre TMI anticipée à la retraite et de votre besoin de liquidité.
            Votre situation mérite une analyse.
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="Votre situation mérite une analyse — pas une réponse générique." button="Prendre rendez-vous" />
    </>
  );
}
