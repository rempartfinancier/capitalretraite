import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RENDEMENTS,
  FRAIS_TYPES,
  FISCALITE,
  TRANSMISSION,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

// Moyenne d'une fourchette { min, max } de hypotheses.js.
const moy = (fourchette) => (fourchette.min + fourchette.max) / 2;

// Capitalisation d'une somme unique à taux constant (hypothèse illustrative).
const croissance = (capital, tauxPct, annees) =>
  capital * Math.pow(1 + tauxPct / 100, annees);

// Coût d'opportunité illustratif d'une sortie paniquée puis d'un retour tardif
// sur le marché : on immobilise le capital pendant quelques années pendant que
// le support dynamique continue de progresser au taux bas de la fourchette
// actions long terme (hypothèse pédagogique, pas une prévision).
const capitalAvantChute = 50000;
const chuteMarche = 30; // recul illustratif d'un marché actions, en %
const capitalApresChute = capitalAvantChute * (1 - chuteMarche / 100);
const anneesHorsMarche = 3;
const capitalRestéInvesti = croissance(
  capitalApresChute,
  RENDEMENTS.ucActionsLongTerme.min,
  anneesHorsMarche
);
const capitalSortiPuisRentre = capitalApresChute; // reste en liquide, ne profite pas du rebond

export default function GuideConseillerOuSeul() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">La question avant toutes les autres</span>
          <h1>Faut-il un conseiller en gestion de patrimoine, ou peut-on tout gérer seul ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le « faire seul » fonctionne très bien pour des
              situations simples, quand on a le temps et un minimum d'intérêt pour le sujet — ouvrir
              un PEA (plan d'épargne en actions) ou un PER (plan d'épargne retraite) en ligne, choisir
              des ETF (des fonds cotés en bourse qui répliquent un indice à frais réduits) et verser
              chaque mois n'a jamais été aussi accessible. L'accompagnement gagne en valeur quand la
              situation se complexifie : plusieurs enveloppes à coordonner entre elles, des enjeux de
              transmission, ou simplement la difficulté à garder la tête froide quand les marchés
              baissent. Ce n'est pas un principe universel — « il faut » ou « il ne faut pas » un
              conseiller — mais un arbitrage à reposer à chaque étape de la vie patrimoniale, à mesure
              que le patrimoine et la situation familiale se complexifient.
            </p>
          </div>
          <p>
            Vous avez ouvert une assurance-vie il y a quelques années, peut-être un PEA, et vous
            versez avec régularité. Jusqu'ici, tout va bien : les plateformes en ligne sont simples,
            les frais sont lisibles, et une recherche de dix minutes suffit à comparer deux contrats.
            Puis la situation se complique — un heritage à intégrer, un changement de statut
            professionnel, l'approche de la retraite qui impose de transformer un capital en revenu —
            et la question surgit, sans réponse évidente : est-ce que je continue seul, ou est-ce que
            je me fais accompagner ?
          </p>
          <p>
            C'est une question que nous recevons à peu près à chaque premier échange, formulée
            différemment : « est-ce que j'ai vraiment besoin de vous ? ». La réponse honnête n'est ni
            « oui, toujours » — ce serait intéressé et faux — ni « non, jamais » — ce serait ignorer ce
            que la discipline émotionnelle et l'ingénierie patrimoniale changent sur la durée. La
            réponse dépend de la complexité de votre situation, du temps que vous êtes prêt à y
            consacrer, et de la manière dont vous réagissez, concrètement, quand un placement perd
            20 % en trois mois. Cet article détaille les deux côtés de cet arbitrage, sans a priori.
          </p>
          <p>
            Une précision avant de commencer : cet article ne traite pas des modèles de rémunération
            d'un conseiller (rétrocessions, honoraires, ou un mélange des deux) — ce sujet, essentiel
            mais distinct, est couvert en détail dans notre guide{" "}
            <a href="/guide/combien-coute-un-conseiller-en-gestion-de-patrimoine">
              combien coûte un conseiller en gestion de patrimoine
            </a>
            . Ici, la question posée est en amont : à partir de quand cette dépense — quelle que soit
            sa forme — a-t-elle des chances de valoir le coup ?
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#faire-seul">Ce qu'on peut réellement faire seul aujourd'hui</a></li>
              <li><a href="#difficile-seul">Ce qui devient difficile à faire seul</a></li>
              <li><a href="#cout-erreur">Quel est le vrai coût d'une erreur en solo ?</a></li>
              <li><a href="#signaux">Les signaux qui indiquent qu'il est temps de se faire accompagner</a></li>
              <li><a href="#combien-coute">Combien coûte réellement l'accompagnement ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="faire-seul">Ce qu'on peut réellement faire seul aujourd'hui</h2>
          <p>
            Commençons par ce qui est devenu vrai et qu'il serait malhonnête de nier : le « faire
            soi-même » n'a jamais été aussi simple, ni aussi peu coûteux. Ouvrir un PEA, une
            assurance-vie ou un PER se fait aujourd'hui en ligne en une vingtaine de minutes, sans
            rendez-vous ni justificatif papier. Les contrats internet affichent des frais de gestion
            annuels de l'ordre de {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.min)} à{" "}
            {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.max)}, sans frais d'entrée, contre{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)} de frais de gestion
            plus {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.max)} de frais d'entrée dans un
            réseau bancaire traditionnel — un ordre de grandeur qui vaut d'être vérifié sur votre
            propre contrat.
          </p>
          <p>
            Sur ces contrats, les ETF (des fonds indiciels cotés qui se contentent de répliquer un
            marché, comme les grands indices actions mondiaux) sont accessibles pour des frais
            courants de {pct(FRAIS_TYPES.etf.fraisCourants.min)} à{" "}
            {pct(FRAIS_TYPES.etf.fraisCourants.max)} par an, très loin des{" "}
            {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.min)} à{" "}
            {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.max)} des fonds actions de gestion
            active classiques. Construire seul un portefeuille diversifié à base d'ETF, verser chaque
            mois par prélèvement automatique, et laisser le temps faire son travail : c'est une
            stratégie parfaitement raisonnable, documentée, et à la portée de quiconque consacre
            quelques heures à s'informer. Les simulateurs gratuits disponibles en ligne — dont les
            nôtres — permettent de projeter un capital, de comparer deux niveaux de frais ou d'estimer
            une future pension, sans qu'un rendez-vous soit nécessaire pour ce niveau de calcul.
          </p>
          <p>
            Pour qui ce chemin est-il suffisant ? Concrètement, une situation qui coche la plupart des
            cases suivantes s'accommode très bien du pilotage en autonomie : une seule enveloppe
            principale ou deux au plus, pas de projet de transmission complexe à court terme, un
            revenu stable, un horizon de placement long, et — condition la plus souvent négligée — un
            réel intérêt pour le sujet qui permet de tenir la discipline dans la durée, versement après
            versement, y compris quand l'actualité économique est anxiogène. Rien dans cette
            description n'appelle un accompagnement : le vouloir quand même reste un choix légitime,
            mais ce n'est pas une nécessité.
          </p>

          <h2 id="difficile-seul">Ce qui devient difficile à faire seul</h2>
          <p>
            Le pilotage en autonomie tient bien tant que la situation reste simple. Trois difficultés
            apparaissent, en général dans cet ordre, à mesure qu'elle se complexifie.
          </p>
          <p>
            La première est la coordination fiscale entre plusieurs enveloppes. Un PEA, une
            assurance-vie, un PER, un compte-titres ordinaire (CTO) et, parfois, un investissement
            locatif ne se pilotent pas indépendamment les uns des autres : chacun a sa propre
            fiscalité de sortie, son propre horizon optimal, et ses propres règles de déblocage. Le
            PER, par exemple, se dénoue en général à la retraite, avec une fiscalité qui dépend du
            mode de sortie choisi (rente ou capital) et des versements effectués — déductibles ou non
            à l'entrée. L'assurance-vie profite d'un abattement annuel sur les gains rachetés au-delà
            de huit ans ({euros(FISCALITE.avAbattementAnnuelSeul)} pour une personne seule,{" "}
            {euros(FISCALITE.avAbattementAnnuelCouple)} pour un couple soumis à imposition commune,
            barème en vigueur en {HYPOTHESES_MAJ}). Le PEA exonère les plus-values d'impôt sur le
            revenu après {FISCALITE.peaExonerationIRApres} ans de détention, prélèvements sociaux
            restant dus. Décider dans quel ordre retirer, et depuis quelle enveloppe, pour minimiser la
            facture fiscale globale à un instant donné suppose de comparer ces règles entre elles — un
            exercice qui devient vite complexe dès que trois ou quatre enveloppes coexistent.
          </p>
          <p>
            La deuxième est l'ingénierie de transmission. Rédiger une clause bénéficiaire
            d'assurance-vie (la clause qui désigne qui recevra le capital au décès du souscripteur) qui
            reflète réellement une situation familiale — recomposée, avec des enfants de plusieurs
            unions, ou avec un souhait de protéger un conjoint sans léser des enfants — ne s'improvise
            pas à partir d'un modèle générique. De même, arbitrer entre une donation (avec un
            abattement de {euros(TRANSMISSION.abattementDonationParEnfant)} par enfant et par
            parent, renouvelable tous les {TRANSMISSION.renouvellementDonationAnnees} ans) et le
            maintien de capital en assurance-vie (avec son propre abattement successoral de{" "}
            {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} par bénéficiaire pour les
            versements avant 70 ans) engage
            des choix aux conséquences décalées de plusieurs décennies, difficiles à corriger a
            posteriori. Notre guide{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">donation ou assurance-vie pour
            transmettre</a> détaille cet arbitrage plus en profondeur.
          </p>
          <p>
            La troisième difficulté est la plus contre-intuitive, et sans doute la plus coûteuse dans
            la durée : la discipline émotionnelle face aux baisses de marché. Sur le papier,
            n'importe qui comprend qu'il ne faut pas vendre au plus bas. Dans les faits, quand un
            portefeuille recule de 20 ou 30 % en quelques semaines — un scénario qui s'est produit
            plusieurs fois au cours des dernières décennies sur les marchés actions — la tentation de
            « sécuriser ce qu'il reste » est une réaction humaine, pas un signe de manque de
            connaissances. Même des investisseurs expérimentés, y compris des professionnels de la
            gestion de patrimoine pour leur propre épargne, reconnaissent qu'il est plus difficile de
            garder son sang-froid avec son propre argent qu'avec celui d'un client. Un conseiller ne
            supprime pas la baisse — aucun accompagnement ne protège du risque de marché, et les
            performances passées ne préjugent jamais des performances futures — mais il joue un rôle
            de tiers qui n'a pas, au même degré, la charge émotionnelle du moment, et qui peut rappeler
            l'horizon de placement initial plutôt que la variation de la semaine.
          </p>
          <div className="note">
            <p>
              Ce constat n'est pas un argument commercial déguisé : la littérature sur la finance
              comportementale documente depuis longtemps l'écart entre la performance d'un placement
              et la performance réellement perçue par l'épargnant qui le détient, cet écart provenant
              en grande partie du mauvais timing des entrées et sorties. Un accompagnement qui se
              contente de choisir des supports sans jamais aborder ce sujet ne traite qu'une partie du
              problème.
            </p>
          </div>

          <h2 id="cout-erreur">Quel est le vrai coût d'une erreur en solo ?</h2>
          <p>
            Il est utile de mettre des ordres de grandeur sur ces risques, à travers des situations
            composites et illustratives — inspirées de cas fréquemment rencontrés, mais qui ne
            décrivent aucune personne réelle.
          </p>
          <p>
            Premier scénario : une clause bénéficiaire obsolète. Un contrat d'assurance-vie ouvert
            avant un remariage, jamais mis à jour, qui désigne encore « mon conjoint » sans précision
            de nom — une formulation qui, en cas de séparation puis de remariage non suivi d'une mise
            à jour, peut désigner une personne qui n'est plus celle voulue, ou déclencher un litige
            entre héritiers. La correction prend quelques minutes une fois identifiée ; le problème est
            que, dans un pilotage en autonomie sans point de contrôle régulier, elle n'est souvent
            identifiée qu'au moment du décès — soit trop tard.
          </p>
          <p>
            Deuxième scénario, chiffré à titre pédagogique : un épargnant qui, après un recul de
            marché de l'ordre de {chuteMarche} % sur un support dynamique, vend l'intégralité de sa
            position pour « arrêter l'hémorragie », puis reste en liquide plusieurs années par crainte
            de rentrer trop tôt. Prenons {euros(capitalAvantChute)} investis en actions avant la
            chute : après un recul de {chuteMarche} %, la position vaut{" "}
            {euros(capitalApresChute)}. Si ce capital reste en liquide pendant{" "}
            {anneesHorsMarche} ans le temps que la confiance revienne, il stagne autour de{" "}
            {euros(capitalSortiPuisRentre)}. S'il était resté investi et avait simplement suivi, sur
            cette période, le bas de la fourchette historique des marchés actions mondiaux (
            {pct(RENDEMENTS.ucActionsLongTerme.min)} annualisés, une moyenne de très long terme qui
            n'est en rien une garantie), il vaudrait plutôt environ{" "}
            {euros(capitalRestéInvesti)}. L'écart entre les deux scénarios, de l'ordre de{" "}
            {euros(capitalRestéInvesti - capitalSortiPuisRentre)} sur cette seule séquence, illustre
            un point simple : ce n'est presque jamais la baisse elle-même qui détruit le plus de
            valeur, c'est la décision prise en réaction à la baisse. Ce calcul est une hypothèse
            illustrative à taux constant, pas une prévision — un marché peut tout aussi bien continuer
            de baisser après un premier recul.
          </p>
          <p>
            Troisième scénario : un déblocage anticipé mal utilisé. Le PER autorise un déblocage
            anticipé dans des cas limités (achat de la résidence principale, invalidité, décès du
            conjoint, surendettement, notamment), mais un déblocage précipité, mal articulé avec la
            fiscalité applicable ou avec le reste du patrimoine, peut coûter plus cher en impôt qu'il
            ne rapporte en liquidités immédiates. Là encore, l'erreur n'est pas de manquer de
            compétence financière au sens large : c'est de prendre une décision ponctuelle, sous
            contrainte de temps, sans avoir vérifié son interaction avec le reste de la situation.
          </p>
          <p>
            Le point commun de ces trois scénarios : aucun ne relève d'un manque d'intelligence ou
            d'effort de la part de l'épargnant. Ce sont des angles morts structurels du pilotage en
            solo — on ne vérifie pas ce qu'on ne sait pas qu'il faut vérifier, et on décide sous le
            coup de l'émotion précisément dans les moments où la décision compte le plus.
          </p>

          <h2 id="signaux">Les signaux qui indiquent qu'il est temps de se faire accompagner</h2>
          <p>
            Il n'existe pas de seuil de patrimoine magique à partir duquel un accompagnement
            s'impose — ce serait aussi arbitraire qu'un seuil de tranche marginale d'imposition
            « idéal » pour un PER, une idée reçue que nous récusons par ailleurs. En revanche, certains
            signaux, pris ensemble plutôt qu'isolément, indiquent que la situation a dépassé ce que le
            pilotage en autonomie gère bien.
          </p>
          <ul>
            <li>
              <strong>Plusieurs enveloppes actives simultanément</strong> — PEA, assurance-vie, PER,
              CTO, immobilier locatif — dont les règles de sortie commencent à interagir entre elles
              plutôt qu'à fonctionner chacune isolément.
            </li>
            <li>
              <strong>Un changement de situation familiale</strong> — mariage, séparation,
              recomposition familiale, naissance, décès d'un proche — qui rend caduques des clauses
              bénéficiaires ou des choix d'allocation pensés dans un contexte différent.
            </li>
            <li>
              <strong>L'approche de la retraite</strong>, à l'horizon de cinq à dix ans, quand la
              question change de nature : il ne s'agit plus seulement de faire croître un capital,
              mais de décider comment et quand le transformer en revenu régulier — un exercice de
              décumulation qui appelle des arbitrages différents de la phase d'épargne.
            </li>
            <li>
              <strong>Un patrimoine qui se complexifie</strong> — héritage reçu, vente d'entreprise,
              cumul emploi-retraite envisagé, changement de statut professionnel (passage en
              indépendant, par exemple) — qui introduit des règles nouvelles que l'épargnant n'a
              jamais eu à manier auparavant.
            </li>
            <li>
              <strong>Une difficulté avérée à tenir le cap</strong> en période de baisse : si les
              précédents replis de marché se sont traduits par des arbitrages précipités regrettés
              ensuite, c'est un signal comportemental au moins aussi solide que n'importe quel critère
              de montant.
            </li>
          </ul>
          <p>
            Aucun signal isolé n'impose un accompagnement — c'est leur cumul, et la vitesse à laquelle
            la situation se complexifie, qui doivent guider la décision. Une personne avec un seul
            contrat, un revenu stable et vingt ans devant elle n'a probablement pas besoin d'un
            conseiller aujourd'hui ; la même personne, dix ans plus tard, avec un héritage à intégrer
            et une retraite qui approche, peut avoir intérêt à revoir cet arbitrage.
          </p>

          <h2 id="combien-coute">Combien coûte réellement l'accompagnement ?</h2>
          <p>
            C'est la question qui suit logiquement, et nous ne la contournons pas — nous la traitons
            en détail ailleurs pour ne pas alourdir cet article. Pour résumer le principe : un
            conseiller en gestion de patrimoine (CGP) est rémunéré soit par rétrocessions (une part
            des frais du produit reversée par son fournisseur), soit par honoraires facturés
            directement, soit par un mélange des deux — aucun modèle n'étant en soi plus vertueux que
            les autres, la transparence sur ce qui est effectivement perçu important davantage que le
            modèle choisi. Pour le détail chiffré de chaque modèle, les questions à poser avant de
            signer, et notre analyse de ce que vaut réellement un bon conseil, notre guide{" "}
            <a href="/guide/combien-coute-un-conseiller-en-gestion-de-patrimoine">
              combien coûte un conseiller en gestion de patrimoine
            </a>{" "}
            couvre ce point en profondeur.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Ai-je besoin d'un conseiller si je n'ai qu'une seule assurance-vie ?</h3>
          <p>
            Le plus souvent, non — une seule enveloppe, un profil de risque stable et un horizon
            long se pilotent bien en autonomie, à condition de vérifier périodiquement les frais et le
            taux de rendement de son fonds en euros par rapport à la moyenne de marché. L'accompagnement
            prend davantage de sens quand une deuxième ou une troisième enveloppe s'ajoute, ou quand un
            projet de transmission apparaît.
          </p>
          <h3>Est-ce que gérer seul revient toujours moins cher ?</h3>
          <p>
            En frais directs, oui, presque toujours : aucun honoraire ni rétrocession ne s'ajoute à la
            structure de frais du contrat. Mais le coût total d'une décision mal calibrée — une clause
            bénéficiaire obsolète, une vente de panique, un déblocage anticipé mal articulé avec le
            reste de la situation — peut largement dépasser le coût d'un accompagnement, sans que cela
            apparaisse sur aucun relevé de frais. La comparaison honnête se fait sur le coût net d'une
            situation donnée, pas sur le seul montant facturé.
          </p>
          <h3>Un simulateur en ligne peut-il remplacer un conseiller ?</h3>
          <p>
            Il peut remplacer une partie du travail — projeter un capital, comparer deux niveaux de
            frais, estimer une pension future — mais un simulateur ne connaît ni votre situation
            familiale, ni vos autres enveloppes, ni votre tolérance réelle au risque telle qu'elle se
            révèle dans une vraie baisse de marché. C'est un outil de calcul, pas un diagnostic
            personnalisé.
          </p>
          <h3>Comment savoir si mon conseiller actuel m'apporte vraiment de la valeur ?</h3>
          <p>
            Posez-vous la question de ce qu'il a concrètement changé dans votre situation : allocation
            revue selon vos projets, clause bénéficiaire mise à jour, arbitrage fiscal entre enveloppes
            documenté, contact proposé lors des phases de marché difficiles. Un accompagnement qui se
            limite à une souscription initiale, jamais revue depuis, ne remplit qu'une partie de ce
            rôle.
          </p>
          <h3>Existe-t-il un entre-deux entre le tout-seul et l'accompagnement complet ?</h3>
          <p>
            Oui, et c'est même la situation la plus fréquente en pratique : un pilotage
            majoritairement autonome, avec un point de contrôle ponctuel — au moment d'un changement de
            statut, d'un héritage, ou à l'approche de la retraite — plutôt qu'un suivi permanent. Notre
            guide{" "}
            <a href="/guide/gestion-pilotee-ou-gestion-libre">gestion pilotée ou gestion libre</a>{" "}
            détaille cet arbitrage à un niveau plus opérationnel, produit par produit.
          </p>
          <h3>La gestion pilotée d'un contrat suffit-elle à remplacer un conseiller ?</h3>
          <p>
            Elle délègue les choix de supports à l'intérieur d'un contrat, moyennant un surcoût de
            l'ordre de {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à{" "}
            {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)} par an, mais elle ne coordonne rien entre
            enveloppes différentes et ne s'occupe ni de transmission ni de discipline comportementale
            au sens large : c'est un outil utile, pas un substitut complet à un accompagnement
            patrimonial global.
          </p>
          <h3>À quel âge ou quel montant de patrimoine devient-il pertinent de consulter ?</h3>
          <p>
            Il n'existe pas de seuil universel, ni d'âge ni de montant — nous nous refusons
            d'ailleurs à en fixer un, de la même manière qu'il n'existe pas de tranche d'imposition
            « magique » qui justifierait automatiquement un PER. Le signal pertinent est la
            complexité de la situation (nombre d'enveloppes, enjeux de transmission, approche de la
            retraite), pas un chiffre rond.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le pilotage en autonomie n'est pas un pis-aller : pour une situation simple, avec une ou
            deux enveloppes, un horizon long et un minimum d'appétence pour le sujet, c'est souvent le
            choix le plus rationnel — les outils existent, les frais sont bas, et rien ne remplace le
            fait de comprendre soi-même ce que l'on détient. Notre analyse ne cherche pas à convaincre
            qui que ce soit qu'un accompagnement serait toujours supérieur : ce serait aussi faux que
            l'inverse.
          </p>
          <p>
            Ce qui change la donne, ce n'est ni l'âge ni un seuil de patrimoine, mais la complexité
            réelle de la situation et la capacité à garder la tête froide dans les moments difficiles.
            Plusieurs enveloppes à coordonner fiscalement, une transmission à organiser, un passage à
            la retraite qui approche, ou simplement la conscience honnête que les baisses de marché
            passées ont déjà entraîné des décisions regrettées : chacun de ces signaux, pris seul, ne
            justifie pas nécessairement un accompagnement — leur cumul, en revanche, mérite qu'on repose
            la question. Pour aller plus loin sur des produits précis, nos guides détaillent{" "}
            <a href="/guide/meilleure-assurance-vie-retraite">la meilleure assurance-vie pour la
            retraite</a>, qui distingue déjà les pistes autonomes des pistes accompagnées pour cette
            enveloppe précise, et{" "}
            <a href="/guide/quel-est-le-meilleur-per">quel est le meilleur PER</a> selon votre
            situation.
          </p>
          <p>
            Si vous hésitez encore, la manière la plus simple de trancher n'est pas de lire un
            article de plus, mais de mettre votre situation, concrètement, face à un regard extérieur
            une fois — ne serait-ce que pour objectiver ce qui relève du confort et ce qui relève d'un
            réel besoin. C'est l'objet de notre{" "}
            <a href="/bilan-retraite">bilan retraite gratuit</a> : quinze minutes pour poser un
            diagnostic, sans que cela n'engage à rien ensuite.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle. Les
              scénarios chiffrés de cet article sont des hypothèses illustratives et pédagogiques, pas
              des cas réels ni des prévisions ; les performances passées ne préjugent pas des
              performances futures. Les barèmes fiscaux cités sont ceux en vigueur à la date de
              révision de cet article ({HYPOTHESES_MAJ}) et doivent être vérifiés au moment de toute
              décision.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Objectivez votre situation en 15 minutes, sans engagement."
        button="Bilan retraite gratuit (15 min)"
        to="/bilan-retraite"
      />
    </>
  );
}
