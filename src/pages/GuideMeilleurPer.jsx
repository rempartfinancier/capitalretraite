import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { FRAIS_TYPES, FISCALITE, HYPOTHESES_MAJ, pct } from "../components/hypotheses.js";

export default function GuideMeilleurPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Notre position</span>
          <h1>Quel est le meilleur PER ? Pourquoi nous ne publions pas de classement</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <p>
            Vous cherchez « meilleur PER 2026 », ou une variante proche. C'est une recherche légitime :
            le PER (plan d'épargne retraite) engage votre épargne pour des années, et personne n'a envie
            de choisir au hasard. Voici ce que la plupart des classements en ligne ne vous diront pas — à
            commencer par la façon dont ils sont fabriqués. Et voici, à la place d'un nom de contrat, la
            grille qui permet de juger n'importe lequel par vous-même.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#fabrication">Comment naissent les classements « meilleur PER »</a></li>
              <li><a href="#nexiste-pas">Pourquoi « le meilleur PER » n'existe pas dans l'absolu</a></li>
              <li><a href="#grille">La grille : 8 critères pour juger n'importe quel PER vous-même</a></li>
              <li><a href="#position">Notre position assumée</a></li>
            </ol>
          </div>

          <h2 id="fabrication">1. Comment naissent les classements « meilleur PER »</h2>
          <p>
            Un classement gratuit, accessible en deux clics, sans email ni rendez-vous, se finance
            rarement tout seul. Le modèle économique le plus répandu est le lien d'affiliation : le site
            qui publie le palmarès touche une commission lorsque vous souscrivez un contrat via son lien.
            Ce n'est pas nécessairement malhonnête — cela peut coexister avec un travail sérieux — mais
            cela oriente mécaniquement le résultat vers les contrats qui rémunèrent le mieux le site, pas
            nécessairement vers ceux qui conviennent le mieux à votre situation.
          </p>
          <p>
            Un deuxième mécanisme, moins visible, est le partenariat commercial direct entre l'éditeur du
            classement et un ou plusieurs distributeurs de PER : mise en avant contractuelle, encart
            sponsorisé présenté comme un article, place garantie dans le « top 3 ». Un troisième biais,
            plus subtil encore, tient à la méthode elle-même : beaucoup de classements réduisent la
            comparaison aux seuls frais affichés — souvent les frais de gestion annuels, parfois les
            frais sur versement — en ignorant la qualité des supports, la rigidité de la gestion pilotée
            par défaut, ou le régime successoral du contrat. Deux PER peuvent afficher les mêmes frais de
            gestion et produire, à l'arrivée, des résultats très différents.
          </p>
          <p>
            Nous ne visons personne nommément : ce mécanisme est général et documenté, pas propre à tel
            ou tel éditeur. Mais il justifie une règle de lecture simple, valable pour n'importe quel
            classement trouvé en ligne : demandez toujours comment il est financé et sur quels critères
            il est construit, avant de lui accorder votre confiance.
          </p>

          <h2 id="nexiste-pas">2. Pourquoi « le meilleur PER » n'existe pas dans l'absolu</h2>
          <p>
            Même construit sans le moindre conflit d'intérêts, un classement se heurterait à un obstacle
            plus fondamental : le bon contrat dépend de votre situation, pas d'un score agrégé. Votre TMI
            (tranche marginale d'imposition — le taux qui frappe vos derniers euros de revenu) détermine
            l'ampleur réelle de l'avantage fiscal à l'entrée. Votre horizon avant la retraite conditionne
            le niveau de risque que vous pouvez raisonnablement prendre sur les supports. Et votre
            objectif — transmettre un capital à vos proches, ou au contraire consommer cette épargne vous-
            même le moment venu — pointe souvent vers des contrats structurellement différents. Notre page{" "}
            <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER ?</a> aide à clarifier ce premier
            arbitrage, en amont même du choix d'un contrat.
          </p>
          <p>
            Un excellent PER pour transmettre — assurantiel, doté d'une clause bénéficiaire (la clause qui
            désigne qui recevra le capital en cas de décès) rédigée avec soin — n'est pas le même contrat
            qu'un excellent PER pour capitaliser à frais minimaux en vue d'une consommation personnelle à
            la retraite. Un classement unique, qui attribue une note globale et désigne un vainqueur,
            gomme nécessairement cette différence d'objectif. Il répond à une question qui n'est pas la
            vôtre.
          </p>
          <p>
            S'ajoute une raison qui nous concerne directement : nous exerçons un métier réglementé.
            Recommander un contrat précis à une personne précise relève d'un conseil personnalisé,
            adossé à l'analyse de sa situation patrimoniale et fiscale complète — pas d'un article
            accessible à tous, dans lequel nous ignorons tout de votre TMI, de votre âge, de votre
            patrimoine existant ou de vos objectifs de transmission. Publier malgré tout un palmarès
            reviendrait à donner un conseil sans connaître son destinataire.
          </p>

          <h2 id="grille">3. La grille : 8 critères pour juger n'importe quel PER vous-même</h2>
          <p>
            Voici, dans l'ordre où nous les vérifions lors d'un audit, les huit critères qui permettent de
            juger sérieusement un PER — le vôtre, ou celui qu'on vous propose — sans avoir besoin d'un
            nom de contrat pour trancher.
          </p>
          <ol>
            <li>
              <strong>Assurantiel ou bancaire ?</strong> C'est le critère qui conditionne tout le reste
              du régime successoral. Un PER assurantiel, souscrit auprès d'un assureur, ouvre droit — en
              cas de décès avant 70 ans — à un abattement de 152 500 € par bénéficiaire désigné (barème
              en vigueur en {HYPOTHESES_MAJ}), le même principe qu'en assurance-vie. Un PER bancaire
              fonctionne comme un compte-titres : au décès, l'épargne intègre la succession sans
              abattement propre à l'enveloppe. Un doute ? Il suffit de vérifier auprès de qui le contrat
              est ouvert.
            </li>
            <li>
              <strong>Les frais sur versements.</strong> Dans un réseau traditionnel, ils s'élèvent
              couramment de {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.min)} à{" "}
              {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.max)} de chaque somme versée ; en
              ligne, ils tombent le plus souvent à {pct(FRAIS_TYPES.contratInternet.entree.max)}. Ordres
              de grandeur constatés sur les grilles tarifaires publiques, à vérifier contrat par contrat
              et révisés en {HYPOTHESES_MAJ}. Point souvent ignoré : dans un réseau, ces frais sont
              fréquemment négociables — encore faut-il le demander.
            </li>
            <li>
              <strong>Les frais de gestion annuels.</strong> Ils prélèvent chaque année une fraction de
              l'encours total, qu'il progresse ou non. La fourchette constatée va d'environ{" "}
              {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.min)} à{" "}
              {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.max)} sur un contrat en ligne compétitif,
              jusqu'à {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min)} à{" "}
              {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)} sur un contrat de réseau
              traditionnel (ordres de grandeur révisés en {HYPOTHESES_MAJ}). Sur des versements étalés
              sur quinze ou vingt ans, l'écart entre ces deux bornes pèse sur le capital final bien plus
              que la plupart des épargnants ne l'imaginent.
            </li>
            <li>
              <strong>Les frais et la qualité des supports.</strong> Un fonds indiciel (ETF, qui réplique
              un indice à bas coût) affiche des frais courants de l'ordre de{" "}
              {pct(FRAIS_TYPES.etf.fraisCourants.min)} à {pct(FRAIS_TYPES.etf.fraisCourants.max)} par an,
              contre {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.min)} à{" "}
              {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.max)} pour un fonds actions classique
              de gestion active (données à vérifier, révisées en {HYPOTHESES_MAJ}). Un PER dont l'univers
              de supports se limite à quelques fonds « maison » chargés, sans accès à des ETF ou à des
              fonds tiers, ferme la porte à une part importante de l'optimisation possible.
            </li>
            <li>
              <strong>La grille de gestion pilotée par défaut, et la liberté d'en sortir.</strong> Sauf
              choix contraire, un PER est investi en gestion pilotée à horizon (une répartition standard
              qui se sécurise progressivement à l'approche de la retraite). Cette gestion ajoute
              généralement un surcoût de mandat de l'ordre de {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)}{" "}
              à {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)} par an (ordre de grandeur révisé en{" "}
              {HYPOTHESES_MAJ}), au-dessus des frais des fonds sous-jacents. Ce n'est pas la
              sécurisation progressive elle-même qui pose question — c'est sa standardisation, son coût,
              et la facilité — ou non — d'en sortir pour reprendre la main sur son allocation.
            </li>
            <li>
              <strong>Les modalités de sortie.</strong> Le contrat permet-il une sortie en capital,
              en une fois ou fractionnée sur plusieurs années, ou impose-t-il de fait la rente viagère
              (un revenu versé à vie par l'assureur, en contrepartie de l'abandon définitif du capital) ?
              Cette liberté conditionne directement votre marge de manœuvre fiscale au moment du
              déblocage.
            </li>
            <li>
              <strong>La clause bénéficiaire.</strong> Sur un PER assurantiel, sa rédaction est-elle
              libre, ou enfermée dans une formule type imposée par le contrat ? Une clause figée, jamais
              adaptée à l'évolution de votre situation familiale, peut neutraliser une partie de
              l'avantage successoral décrit au premier critère.
            </li>
            <li>
              <strong>La solidité et le service de l'assureur.</strong> Solidité financière de
              l'organisme qui porte l'engagement, qualité du service en ligne, réactivité en cas de
              question ou de sinistre : ce dernier critère ne se lit sur aucune grille tarifaire, mais il
              conditionne l'expérience réelle du contrat sur plusieurs décennies.
            </li>
          </ol>
          <p>
            Cette grille est aussi celle que nous appliquons dans notre analyse détaillée des frais et de
            la gestion pilotée d'un PER, à lire sur{" "}
            <a href="/guide/per-bancaire-frais-gestion-horizon">PER bancaire : frais, gestion à horizon, supports maison</a>,
            et elle prolonge la réflexion posée dans notre page{" "}
            <a href="/strategies/per">la stratégie PER</a>.
          </p>

          <div className="note">
            <p>
              Un dernier repère utile, valable pour tout type d'enveloppe et pas seulement le PER : les
              prélèvements sociaux (CSG, CRDS et contributions annexes appliqués aux revenus du capital)
              s'élèvent à {pct(FISCALITE.prelevementsSociaux.per)} sur les gains d'un PER depuis la LFSS
              2026 (barème en vigueur en {HYPOTHESES_MAJ}). Ce taux s'applique quel que soit le contrat
              choisi : il ne fait donc partie d'aucun critère de comparaison entre PER, mais il doit
              entrer dans tout calcul de rendement net.
            </p>
          </div>

          <h2 id="position">4. Notre position assumée</h2>
          <p>
            Nous ne publions pas de palmarès « meilleur PER ». Non par manque d'avis — nous analysons des
            contrats de PER chaque semaine — mais parce qu'un classement générique répondrait à une
            question que vous ne posez pas tout à fait : la vôtre porte sur le contrat qui convient à
            votre TMI, à votre horizon et à votre objectif de transmission ou de consommation, pas sur un
            score moyen valable pour tout le monde et personne en particulier.
          </p>
          <p>
            Ce que nous faisons à la place : nous analysons votre contrat existant, ou celui qu'on vous
            propose, critère par critère, à l'aide de la grille ci-dessus — et nous la confrontons à votre
            situation réelle. C'est exactement l'objet du{" "}
            <a href="/bilan-retraite">bilan retraite</a> que nous proposons : reprendre votre PER actuel
            (ou le projet de contrat qu'on vous soumet), point par point, plutôt que de vous renvoyer vers
            un nom tiré d'un classement dont vous ne connaîtrez jamais vraiment le mode de financement.
          </p>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement personnalisé :
              chaque situation (TMI, horizon, objectifs de transmission ou de consommation) doit faire
              l'objet d'une étude individuelle. Les montants, abattements et taux cités sont les barèmes
              en vigueur en {HYPOTHESES_MAJ}, susceptibles d'évoluer à chaque loi de finances ; les frais
              indiqués sont des ordres de grandeur constatés sur le marché, à vérifier contrat par contrat.
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
