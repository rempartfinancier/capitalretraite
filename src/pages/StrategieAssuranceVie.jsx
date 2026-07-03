import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { RENDEMENTS, FRAIS_TYPES, FISCALITE, HYPOTHESES_MAJ, euros, pct } from "../components/hypotheses.js";
import { SimulateurCapitalisation } from "../components/Simulateurs.jsx";

export default function StrategieAssuranceVie() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Stratégie 02</span>
          <h1>L'assurance-vie comme outil retraite : la souplesse d'abord</h1>
          <p className="sub">
            Moins « fléchée retraite » que le PER (Plan d'épargne retraite), l'assurance-vie est pourtant la colonne
            vertébrale de nombreuses stratégies — précisément parce qu'elle n'enferme pas.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Pourquoi l'assurance-vie a sa place dans une stratégie retraite</h2>
          <p>
            Contrairement au PER, l'assurance-vie reste disponible à tout moment : un rachat
            partiel (un retrait, dans le vocabulaire de l'assurance) est possible sans condition d'âge. Cette liquidité a un prix — pas de déduction
            fiscale à l'entrée — mais elle offre une liberté précieuse quand la vie ne suit pas le
            plan prévu.
          </p>

          <h2>Ce qu'il y a à l'intérieur d'un contrat : les supports</h2>
          <p>
            Un discours répandu sur les réseaux sociaux affirme que « l'assurance-vie ne rapporte
            rien ». Cet argument est exact sur un point : beaucoup de contrats déçoivent. Il se
            trompe en revanche de coupable. L'assurance-vie n'est qu'une enveloppe — un cadre
            fiscal et juridique — et une enveloppe ne rapporte rien par elle-même : tout dépend
            des supports qu'on y loge et de la façon dont ils sont pilotés. Avant de juger votre
            contrat, la première question à se poser est donc : qu'y a-t-il dedans ?
          </p>

          <h3>Le fonds en euros : une garantie réelle, une promesse étroite</h3>
          <p>
            Le fonds en euros est le support sécurisé du contrat. L'assureur y garantit le capital
            versé — garantie portée par l'assureur lui-même, donc valable hors faillite de
            celui-ci — et les intérêts crédités chaque année sont définitivement acquis : c'est ce
            qu'on appelle l'effet cliquet, qui interdit tout retour en arrière. Pour tenir cette
            garantie, l'assureur investit très majoritairement en obligations (des prêts consentis
            aux États et aux grandes entreprises), ce qui borne mécaniquement le rendement. Détail
            souvent découvert trop tard : les prélèvements sociaux (la part des prélèvements sur
            les revenus du capital qui finance la protection sociale, {pct(FISCALITE.prelevementsSociaux.assuranceVie)}
            en assurance-vie — un taux propre à cette enveloppe, non concerné par la hausse à
            18,6 % appliquée par la LFSS 2026 à d'autres enveloppes) sont retenus chaque année sur
            les intérêts du fonds en euros, que vous retiriez l'argent ou non.
          </p>
          <p>
            Notre analyse : le fonds en euros tient sa promesse — le capital ne baisse jamais en
            valeur affichée — et ce confort est réel. En revanche, la promesse est plus étroite
            qu'il n'y paraît. Un rendement durablement proche de la cible d'inflation de{" "}
            {pct(RENDEMENTS.inflationLongTerme.moyen)} de la Banque centrale européenne ne laisse
            presque aucun gain réel — et il passe nettement en dessous dès que les prix
            accélèrent, comme en 2022-2023. La moyenne de marché, autour de{" "}
            {pct(RENDEMENTS.fondsEuros.moyen)} en {RENDEMENTS.fondsEuros.periode} avant
            prélèvements sociaux (France Assureurs / ACPR), relève du constat passé, qui ne
            présage pas des taux futurs. Un capital garanti qui progresse moins vite que les prix perd du pouvoir
            d'achat sans jamais afficher de moins-value — une érosion silencieuse, invisible sur
            le relevé annuel. S'y ajoute une liquidité imparfaite : un rachat prend en pratique de
            quelques jours à deux semaines, le délai légal pouvant atteindre deux mois — un
            mauvais substitut, donc, à l'épargne de précaution. Le cas d'usage que notre analyse
            juge pleinement légitime est précis : l'argent dont vous aurez besoin avec certitude à
            horizon court, moins de trois à quatre ans, ou la poche de sécurisation d'un capital à
            l'approche d'un projet ou de la retraite. Pour un horizon de dix ou vingt ans, il y a
            généralement mieux à faire.
          </p>
          <p>
            En chiffres : de {pct(RENDEMENTS.fondsEuros.min)} à {pct(RENDEMENTS.fondsEuros.max)}{" "}
            selon les contrats en {RENDEMENTS.fondsEuros.periode}, pour une moyenne de marché
            autour de {pct(RENDEMENTS.fondsEuros.moyen)} (rendement net de frais de gestion, avant
            prélèvements sociaux). Il s'agit d'un constat passé : le taux est fixé chaque année
            par l'assureur, n'est jamais connu d'avance, et les rendements passés ne préjugent pas
            des rendements futurs.
          </p>
          <div className="note">
            À connaître, sans dramatiser : depuis 2016, la loi Sapin 2 permet aux autorités
            financières de limiter temporairement les rachats sur les contrats d'assurance-vie en
            cas de crise grave menaçant la stabilité du secteur. Ce dispositif n'a, à notre
            connaissance, jamais été activé ; s'il l'était un jour, ce serait précisément pour
            protéger collectivement les épargnants. Il rappelle simplement qu'aucun placement,
            même garanti, ne vit hors de son environnement.
          </div>

          <h3>Les unités de compte : le moteur, sans la garantie</h3>
          <p>
            Les unités de compte (UC) désignent tous les autres supports du contrat : fonds
            investis en actions, en obligations d'entreprises, en immobilier collectif… Leur
            valeur suit celle des marchés : le capital n'est pas garanti et fluctue à la hausse
            comme à la baisse. L'assureur s'engage sur le nombre d'unités que vous détenez, jamais
            sur leur prix.
          </p>
          <p>
            Notre analyse : historiquement, c'est des unités de compte — et singulièrement des
            supports actions — qu'est venue la performance de long terme des contrats ; le fonds
            en euros protège, il ne construit pas. Deux précisions s'imposent. La première : la
            qualité des supports retenus est décisive. Entre un ETF (fonds indiciel coté, qui
            réplique un indice de marché pour quelques dixièmes de point de frais par an) et
            certains fonds « maison » nettement plus chargés pour un résultat souvent inférieur,
            l'écart capitalisé sur quinze ou vingt ans devient considérable — nous y consacrons
            une enquête entière :{" "}
            <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">
              pourquoi votre assurance-vie rapporte peu
            </a>
            . La seconde : un fonds obligataire n'est pas un fonds en euros — il n'offre aucune
            garantie en capital, mais peut viser en contrepartie un rendement supérieur. Enfin, le
            débat « unités de compte ou pas » nous paraît mal posé : la vraie question n'est pas
            d'en avoir ou non, mais d'en calibrer la dose — quelle part de votre contrat peut
            fluctuer sans compromettre vos projets, compte tenu de votre horizon et de votre
            tolérance aux variations ? Une allocation ne se copie pas, elle se construit.
          </p>
          <p>
            En chiffres, deux ordres de grandeur à lire comme des constats passés, jamais comme
            des promesses : les grands indices actions mondiaux ont dégagé des performances de
            l'ordre de {pct(RENDEMENTS.ucActionsLongTerme.min)} à{" "}
            {pct(RENDEMENTS.ucActionsLongTerme.max)} par an ({RENDEMENTS.ucActionsLongTerme.periode},
            dividendes réinvestis, avant frais et fiscalité), au prix de fortes variations et
            d'années négatives parfois sévères ; les fonds obligataires de qualité affichaient en{" "}
            {RENDEMENTS.fondsObligataires.periode} des rendements à l'échéance (le rendement
            obtenu si les obligations sont conservées jusqu'à leur terme) de l'ordre de{" "}
            {pct(RENDEMENTS.fondsObligataires.min)} à {pct(RENDEMENTS.fondsObligataires.max)},
            sans garantie du capital. Risque élevé pour les actions, modéré pour l'obligataire :
            dans les deux cas, les performances passées ne préjugent pas des performances futures.
          </p>

          <h3>Gestion libre ou gestion pilotée : qui décide, et à quel prix ?</h3>
          <p>
            Deux modes de fonctionnement coexistent dans la plupart des contrats. En gestion
            libre, vous choisissez vous-même les supports et décidez des arbitrages (les
            transferts d'un support vers un autre, réalisés au sein du contrat sans déclencher
            d'imposition). En gestion pilotée — dite aussi profilée ou sous mandat —, vous
            déléguez ces décisions à un gérant, qui applique un profil type : « prudent »,
            « équilibré », « dynamique ».
          </p>
          <p>
            Notre analyse : l'envie de déléguer se comprend parfaitement — personne n'a
            l'obligation de devenir son propre gérant pour préparer sa retraite. En revanche, la
            gestion pilotée standardisée, telle qu'elle est distribuée à grande échelle, cumule
            deux faiblesses. La première est tarifaire : au surcoût du mandat — de l'ordre de{" "}
            {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)}{" "}
            par an selon nos hypothèses, à vérifier contrat par contrat — s'ajoutent les frais des
            fonds sous-jacents, rarement les moins chers du marché. La seconde est structurelle :
            un profil type ignore tout de votre situation réelle — votre horizon, vos autres
            avoirs, votre fiscalité. Et le danger le plus documenté n'est pas celui qu'on
            imagine : ce ne sont pas tant des arbitrages malheureux du gérant que la mécanique de
            sortie. Dans un profil packagé, tout retrait s'effectue au prorata de l'ensemble des
            supports : pour récupérer une somme, vous vendez simultanément vos actions et vos
            obligations — y compris lorsque la poche actions traverse un creux, alors qu'il aurait
            suffi de puiser dans la poche prudente. Cette rigidité peut transformer un simple
            besoin de liquidité en vente au pire moment. La gestion libre évite cet écueil, mais
            exige une méthode — définir son allocation, la tenir, la sécuriser progressivement —
            ou un accompagnement : c'est précisément le rôle d'un conseil indépendant, qui
            construit l'allocation avec vous sans la figer dans un profil standard.
          </p>

          <h3>Mesurez vous-même : le poids des frais sur 15 ans</h3>
          <p>
            Ces ordres de grandeur restent abstraits tant qu'ils ne sont pas appliqués à votre
            propre effort d'épargne. Le simulateur ci-dessous capitalise un versement mensuel sur
            la durée de votre choix, puis applique la fiscalité d'un rachat après 8 ans. Une
            expérience vaut toutes les démonstrations : gardez le même rendement hypothétique,
            puis faites passer les frais annuels de {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.max)}{" "}
            (contrat en ligne économe) à{" "}
            {pct(
              FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min +
                FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min
            )}{" "}
            (ordre de grandeur d'un contrat bancaire traditionnel, frais des supports inclus), et
            comparez le capital à 15 ans. Gardez toutefois notre grille de lecture : les frais
            sont un point de vigilance majeur, pas une obsession — ce qui compte in fine est la
            performance nette de frais et de fiscalité, et la valeur du service rendu en face. Un
            contrat un peu plus cher adossé à un vrai conseil peut se défendre ; un contrat chargé
            sans service en face, difficilement.
          </p>
          <SimulateurCapitalisation enveloppe="av" />

          <h3>Les supports d'un contrat en un coup d'œil</h3>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Support</th>
                  <th>Garantie du capital</th>
                  <th>Rendement indicatif (constat daté)</th>
                  <th>Niveau de risque</th>
                  <th>Horizon indicatif</th>
                  <th>Frais typiques</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fonds en euros</td>
                  <td>Oui, par l'assureur (hors faillite de celui-ci), avec effet cliquet</td>
                  <td>
                    {pct(RENDEMENTS.fondsEuros.moyen)} en moyenne en {RENDEMENTS.fondsEuros.periode},
                    avant prélèvements sociaux
                  </td>
                  <td>Faible sur le capital ; risque réel : l'inflation</td>
                  <td>Besoin certain à moins de 3-4 ans, poche de sécurisation</td>
                  <td>Frais de gestion du contrat (rendement affiché déjà net de ces frais)</td>
                </tr>
                <tr>
                  <td>UC obligataires</td>
                  <td>Non — capital non garanti</td>
                  <td>
                    {pct(RENDEMENTS.fondsObligataires.min)} à {pct(RENDEMENTS.fondsObligataires.max)}{" "}
                    à l'échéance ({RENDEMENTS.fondsObligataires.periode})
                  </td>
                  <td>Modéré — le capital peut baisser</td>
                  <td>3 à 8 ans</td>
                  <td>Frais du fonds + frais de gestion du contrat</td>
                </tr>
                <tr>
                  <td>UC actions (fonds et ETF)</td>
                  <td>Non — fluctue à la hausse comme à la baisse</td>
                  <td>
                    {pct(RENDEMENTS.ucActionsLongTerme.min)} à {pct(RENDEMENTS.ucActionsLongTerme.max)}{" "}
                    par an ({RENDEMENTS.ucActionsLongTerme.periode}, avant frais)
                  </td>
                  <td>Élevé — baisses marquées possibles</td>
                  <td>8 ans et plus</td>
                  <td>
                    ETF : {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} à{" "}
                    {pct(FRAIS_TYPES.contratInternet.fraisSupports.max)} par an ; fonds
                    classiques : {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)}
                  </td>
                </tr>
                <tr>
                  <td>Gestion pilotée</td>
                  <td>Non, sauf part logée en fonds en euros</td>
                  <td>Selon profil — pas de référence unique</td>
                  <td>Selon profil ; sorties au prorata de tous les supports</td>
                  <td>Tous horizons en théorie ; rigidité en pratique</td>
                  <td>
                    Surcoût de mandat de {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à{" "}
                    {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)} par an, en sus des frais des
                    fonds sous-jacents
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Rendements indicatifs constatés sur les périodes mentionnées, issus des hypothèses du
            site révisées en {HYPOTHESES_MAJ} — ni promesse, ni prévision. Les unités de compte
            présentent un risque de perte en capital ; la garantie du fonds en euros est portée
            par l'assureur, hors faillite de celui-ci. Les performances passées ne préjugent pas
            des performances futures.
          </p>

          <div className="note">
            <strong>Votre contrat actuel rapporte-t-il ce qu'il devrait ?</strong> Frais empilés,
            fonds « maison », gestion pilotée par défaut : notre enquête pédagogique détaille,
            poste par poste, pourquoi tant de contrats déçoivent — et comment lire les documents
            du vôtre. À lire avant tout rendez-vous :{" "}
            <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">
              pourquoi votre assurance-vie rapporte peu
            </a>
            .
          </div>

          <p>
            Une fois l'intérieur du contrat correctement construit, reste à en tirer un revenu au
            moment voulu : c'est là que l'enveloppe révèle sa souplesse.
          </p>

          <h2>Les rachats programmés : transformer un contrat en revenu</h2>
          <p>
            À la retraite, l'assurance-vie peut verser un complément de revenu régulier via des
            rachats partiels programmés : vous définissez un montant et une fréquence, l'assureur
            exécute. Chaque rachat n'est imposé que sur sa part de gains — la part de capital
            retiré n'est pas taxée. C'est l'un des mécanismes de décumulation (la phase où l'on
            consomme le capital accumulé) les plus souples qui existent, et il se combine bien
            avec d'autres sources de revenus.
          </p>

          <h2>La fiscalité après 8 ans</h2>
          <p>
            Passé le huitième anniversaire du contrat, les rachats bénéficient d'un abattement
            annuel sur les gains ({euros(FISCALITE.avAbattementAnnuelSeul)} pour une personne
            seule, {euros(FISCALITE.avAbattementAnnuelCouple)} pour un couple soumis à imposition
            commune, barème en vigueur à la date de rédaction — {HYPOTHESES_MAJ}). Bien
            calibrés, des rachats programmés peuvent ainsi générer un revenu dont la part imposable
            est faible, voire nulle certaines années.
          </p>

          <h2>Les avantages successoraux</h2>
          <p>
            L'assurance-vie est aussi un outil de transmission : les capitaux versés avant 70 ans
            bénéficient d'un cadre successoral spécifique, avec un abattement par bénéficiaire
            désigné. Pour un patrimoine constitué, cette dimension pèse dans l'arbitrage entre
            enveloppes — un PER liquidé n'offre pas les mêmes possibilités.
          </p>

          <h2>La rente viagère optionnelle</h2>
          <p>
            Un contrat d'assurance-vie peut être converti en rente viagère : un revenu versé à
            vie par l'assureur (garantie portée par l'assureur, hors faillite de celui-ci), en
            contrepartie de l'abandon définitif du capital. L'avantage : un revenu qui tombe tant
            que l'on vit, quel que soit l'âge atteint. Les contreparties : le capital n'est plus
            transmissible aux héritiers, et le montant de la rente est figé à la conversion par
            les tables de mortalité de l'assureur. L'arbitrage se fait au cas par cas. Nous en
            parlons en détail dans la page <a href="/strategies/decumulation">décumulation</a>.
          </p>

          <h2>Et l'assurance-vie luxembourgeoise ?</h2>
          <p>
            Pour la grande majorité des épargnants, un très bon contrat français reste plus
            efficace et moins chargé en frais. Le contrat luxembourgeois s'étudie surtout pour
            les expatriés, certaines situations internationales ou patrimoniales spécifiques, et
            des encours élevés — souvent plusieurs centaines de milliers d'euros. Ses atouts
            propres : une protection renforcée du souscripteur, via le « triangle de sécurité »
            (mécanisme luxembourgeois de ségrégation des actifs auprès d'une banque dépositaire,
            sous le contrôle du régulateur) et le « super-privilège » (rang de créancier
            prioritaire accordé au souscripteur en cas de défaillance de l'assureur), un univers
            d'investissement élargi et une neutralité fiscale pour un résident français. C'est un
            sujet à part entière, que nous traitons sur notre site dédié :{" "}
            <a href="https://assurancevie.lu" target="_blank" rel="noopener noreferrer">
              assurancevie.lu
            </a>
            .
          </p>

          <h2>Les limites à garder en tête</h2>
          <ul>
            <li>Pas de déduction fiscale à l'entrée — le PER garde cet avantage pour les TMI (tranches marginales d'imposition) élevées ;</li>
            <li>
              Le rendement des fonds en euros varie chaque année et n'est jamais garanti par
              avance — nous ne publions aucune projection de rendement ;
            </li>
            <li>Les unités de compte exposent le capital aux fluctuations des marchés ;</li>
            <li>Les frais (versement, gestion, arbitrage) diffèrent fortement d'un contrat à l'autre.</li>
          </ul>

          <div className="note">
            Piste de réflexion : pour beaucoup de profils, la vraie question n'est pas « PER ou
            assurance-vie ? » mais « quelle dose de chaque ? ». Voir notre comparatif complet :{" "}
            <a href="/guide/per-vs-assurance-vie-retraite">PER vs assurance-vie retraite</a>.
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="Votre contrat actuel travaille-t-il vraiment pour votre retraite ?" button="Prendre rendez-vous" />
    </>
  );
}
