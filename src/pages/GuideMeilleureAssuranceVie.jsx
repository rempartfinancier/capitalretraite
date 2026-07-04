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

// Frais annuels cumulés typiques (frais du contrat + frais des supports),
// milieu de fourchette — recalculés automatiquement depuis hypotheses.js.
const fraisBancaireAnnuel =
  moy(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle) +
  moy(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports);
const fraisInternetAnnuel =
  moy(FRAIS_TYPES.contratInternet.gestionAnnuelle) +
  moy(FRAIS_TYPES.contratInternet.fraisSupports);
const fraisConseilleAnnuel = fraisInternetAnnuel + moy(FRAIS_TYPES.gestionPiloteeSurcout);

export default function GuideMeilleureAssuranceVie() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Comparatif de référence</span>
          <h1>Quelle est la meilleure assurance-vie pour préparer sa retraite ? Le comparatif par profil</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> il n'existe pas de « meilleure assurance-vie » universelle
              — trois grands archétypes de contrat coexistent sur le marché français, et le bon choix
              dépend de votre profil, pas d'un nom de marque. Le contrat bancaire traditionnel offre de
              la simplicité au prix de frais plus élevés. Le contrat en ligne en gestion libre convient à
              qui veut piloter seul son épargne, à frais réduits, en échange d'une autonomie totale et
              d'aucun accompagnement en cas de doute. Le contrat conseillé, en gestion pilotée ou
              conseillée par un professionnel, convient à qui préfère être accompagné, moyennant un
              surcoût mesurable. Aucun des trois n'est « meilleur » dans l'absolu ; l'un des trois est
              probablement mieux adapté à vous.
            </p>
          </div>

          <p>
            Vous avez tapé « meilleure assurance-vie » dans un moteur de recherche, et vous êtes tombé
            sur une demi-douzaine de classements qui ne se ressemblent pas : celui-ci place tel contrat
            en tête, celui-là un autre, un troisième change d'avis d'une année sur l'autre sans que rien
            n'ait vraiment changé sur le marché. De quoi douter de la fiabilité de l'exercice — et à
            raison.
          </p>
          <p>
            Prenons une situation illustrative, composite, qui ne décrit aucun cas réel documenté mais
            qui revient très souvent sous une forme ou une autre : quelqu'un a 40 ans, veut ouvrir une
            assurance-vie pour préparer sa retraite, et hésite entre le contrat que lui propose sa banque
            depuis des années, un contrat en ligne repéré sur un forum, et l'idée de se faire accompagner
            par un professionnel. Chercher « la meilleure assurance-vie » revient, dans ce cas, à poser
            la mauvaise question. L'assurance-vie est une enveloppe (un cadre fiscal et juridique qui
            contient des placements) : ce qui varie d'un contrat à l'autre, ce n'est pas la nature de
            l'enveloppe — globalement identique d'un assureur à l'autre — mais son coût, l'étendue des
            supports proposés, et surtout le niveau d'accompagnement qui va avec.
          </p>
          <p>
            Cet article ne désigne aucun contrat par son nom — nous expliquons pourquoi plus bas — et
            compare à la place trois catégories de contrats sur des critères vérifiables : frais,
            autonomie requise, accompagnement disponible. À la fin, vous devriez savoir non pas quel
            contrat souscrire, mais quel type de contrat correspond à votre situation, et quelles
            questions poser avant de signer.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#nexiste-pas">Existe-t-il vraiment une « meilleure » assurance-vie ?</a></li>
              <li><a href="#bancaire">Le contrat bancaire traditionnel : la simplicité a un prix</a></li>
              <li><a href="#internet">Le contrat en ligne en gestion libre : pour qui veut tout faire seul</a></li>
              <li><a href="#conseille">Le contrat conseillé, en gestion pilotée ou conseillée : pour qui veut être accompagné</a></li>
              <li><a href="#comparatif">Le tableau comparatif des trois profils</a></li>
              <li><a href="#choisir">Comment choisir entre gérer seul et être accompagné ?</a></li>
              <li><a href="#luxembourg">Et l'assurance-vie luxembourgeoise, dans tout ça ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="nexiste-pas">Existe-t-il vraiment une « meilleure » assurance-vie ?</h2>
          <p>
            Avant de comparer les catégories de contrats, il faut comprendre pourquoi les classements
            « meilleure assurance-vie » que vous avez déjà consultés se contredisent aussi souvent. La
            plupart des palmarès gratuits, accessibles sans email ni rendez-vous, se financent par un
            lien d'affiliation : le site touche une commission quand vous souscrivez via son lien. Ce
            n'est pas nécessairement malhonnête — un travail sérieux peut coexister avec ce modèle — mais
            cela oriente mécaniquement le résultat vers les contrats qui rémunèrent le mieux l'éditeur du
            classement, pas nécessairement vers ceux qui conviennent le mieux à votre situation. D'autres
            classements reposent sur un partenariat commercial direct, moins visible, avec un ou
            plusieurs distributeurs de contrats.
          </p>
          <p>
            Un troisième biais, plus subtil, tient à la méthode elle-même : beaucoup de comparatifs
            réduisent l'analyse aux seuls frais affichés — parfois seulement les frais de gestion
            annuels — en ignorant la qualité et la profondeur de l'univers de supports proposé, la
            rigidité ou non de la gestion pilotée, le régime successoral du contrat, ou la disponibilité
            d'un interlocuteur en cas de question complexe. Deux contrats peuvent afficher des frais très
            proches et offrir, à l'usage, des expériences radicalement différentes.
          </p>
          <p>
            Nous ne visons aucun éditeur de classement en particulier : ce mécanisme est général et
            documenté, pas propre à tel ou tel site. Mais il justifie une règle de lecture simple pour
            tout comparatif trouvé en ligne : demandez-vous toujours comment il est financé et sur quels
            critères il est construit, avant de lui accorder votre confiance. C'est la même logique
            éditoriale que nous appliquons de notre côté sur le PER, détaillée dans{" "}
            <a href="/guide/quel-est-le-meilleur-per">pourquoi nous ne publions pas de classement de PER</a>.
          </p>
          <p>
            Il y a aussi une raison plus structurelle à l'absence de vainqueur universel : le bon contrat
            dépend de vous, pas d'un score agrégé. Votre appétence — ou votre réticence — à gérer
            vous-même une allocation d'actifs (la répartition de l'épargne entre grandes familles de
            placements), votre horizon avant la retraite, le montant que vous comptez y loger, et votre
            besoin ou non d'être accompagné en cas de coup dur ou de question fiscale pointent vers des
            catégories de contrats structurellement différentes. Un classement unique, qui désigne un
            vainqueur toutes situations confondues, répond nécessairement à une question qui n'est pas
            tout à fait la vôtre. S'ajoute une raison qui nous concerne directement : recommander un
            contrat nommé à une personne précise relève d'un conseil personnalisé, adossé à l'étude de sa
            situation patrimoniale et fiscale complète — pas d'un article public dans lequel nous
            ignorons tout de votre situation. C'est pour cela que cet article compare des catégories de
            contrats, jamais des marques.
          </p>
          <div className="note">
            <p>
              Un repère utile avant de comparer les catégories de contrats : certains paramètres de
              l'assurance-vie sont fixés par la loi et par les conditions de marché, pas par le
              distributeur. Le rendement du fonds en euros (le support qui garantit le capital, porté par
              l'assureur, hors faillite de celui-ci) s'est établi en moyenne autour de{" "}
              {pct(RENDEMENTS.fondsEuros.moyen)} en {RENDEMENTS.fondsEuros.periode}, avec des écarts
              sensibles d'un assureur à l'autre — un constat passé qui ne préjuge pas des taux futurs. De
              même, la fiscalité après huit ans de détention (abattement annuel sur les gains rachetés de{" "}
              {euros(FISCALITE.avAbattementAnnuelSeul)} pour une personne seule ou{" "}
              {euros(FISCALITE.avAbattementAnnuelCouple)} pour un couple, taux réduit de{" "}
              {pct(FISCALITE.avTauxReduitApres8Ans)} au-delà sous conditions, barèmes en vigueur en{" "}
              {HYPOTHESES_MAJ}) s'applique quel que soit le type de contrat choisi. Ce sont les frais,
              l'univers de supports et l'accompagnement qui différencient réellement les catégories de
              contrats — pas ces paramètres communs à toute assurance-vie.
            </p>
          </div>

          <h2 id="bancaire">Le contrat bancaire traditionnel : la simplicité a un prix</h2>
          <p>
            C'est le contrat que propose votre conseiller bancaire habituel, dans l'agence où vous avez
            déjà vos comptes courants. Son principal atout est la simplicité : un seul interlocuteur pour
            l'ensemble de vos finances, une ouverture rapide, un rendez-vous physique possible, et une
            marque que vous connaissez déjà.
          </p>
          <p>
            Cette simplicité a une contrepartie mesurable. Les grilles tarifaires publiques des grands
            réseaux bancaires affichent couramment des frais sur versement de{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.max)}, des frais de gestion annuels de{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)}, et des frais de supports
            (les « frais courants » de chaque fonds, prélevés à l'intérieur du fonds lui-même) de{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)} par an — ordres de grandeur
            à vérifier contrat par contrat, révisés en {HYPOTHESES_MAJ}. Les fonds proposés sont
            généralement des fonds « maison », gérés par la société de gestion du même groupe bancaire,
            ce qui limite l'univers de supports accessibles.
          </p>
          <p>
            Faut-il en conclure que ces contrats sont à éviter ? Non — et c'est un point où notre analyse
            s'écarte d'un discours parfois trop tranché sur les réseaux sociaux. Ces frais ne sont pas
            une escroquerie : ils financent un modèle économique réel — un réseau d'agences, des équipes,
            un conseiller joignable — et une assurance-vie bancaire, même onéreuse, reste dans la
            plupart des cas largement préférable à ne rien épargner du tout. Pour quelqu'un qui n'est pas
            à l'aise avec les outils financiers, ne veut prendre aucun risque d'erreur de gestion, et
            valorise avant tout la relation avec un interlocuteur physique connu, ce type de contrat peut
            rester un choix cohérent — à condition d'avoir conscience de son coût et de vérifier
            régulièrement ce qu'il produit net de frais. Notre guide{" "}
            <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">pourquoi votre assurance-vie
            rapporte peu</a> détaille la mécanique exacte de ces frais et comment l'auditer.
          </p>

          <h2 id="internet">Le contrat en ligne en gestion libre : pour qui veut tout faire seul</h2>
          <p>
            Le contrat en ligne (souscrit auprès d'un courtier ou d'un assureur direct, sans passage en
            agence) fonctionne à l'opposé sur l'axe du coût. Les grilles tarifaires des contrats en ligne
            de référence affichent le plus souvent {pct(FRAIS_TYPES.contratInternet.entree.min)} de
            frais sur versement, des frais de gestion annuels de{" "}
            {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.min)} à{" "}
            {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.max)}, et un accès à des supports en ETF
            (des fonds cotés en bourse qui répliquent un indice à bas coût) facturés{" "}
            {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} à{" "}
            {pct(FRAIS_TYPES.contratInternet.fraisSupports.max)} de frais courants par an — ordres de
            grandeur à vérifier, révisés en {HYPOTHESES_MAJ}. Au global, un contrat en ligne investi en
            ETF revient couramment autour de {pct(fraisInternetAnnuel)} de frais annuels cumulés, contre
            de l'ordre de {pct(fraisBancaireAnnuel)} pour un contrat bancaire investi en fonds maison —
            un écart qui, capitalisé sur quinze ou vingt ans, pèse significativement sur le capital
            final.
          </p>
          <p>
            Ce type de contrat convient à un profil précis : quelqu'un qui a le temps et l'envie de
            s'informer, sait déjà ce qu'est une allocation d'actifs et un ordre d'arbitrage, et préfère
            piloter seul plutôt que déléguer. C'est une autonomie totale, avec ses deux faces. Le revers,
            rarement mis en avant par les comparatifs qui vantent uniquement les frais bas : en cas de
            question complexe — clause bénéficiaire à adapter après un changement de situation
            familiale, arbitrage à faire au pire moment d'un marché baissier, articulation avec d'autres
            enveloppes ou avec une problématique de transmission — il n'y a personne à appeler. Le
            support client d'un contrat en ligne répond à des questions techniques sur l'outil, pas à des
            questions de stratégie patrimoniale.
          </p>
          <p>
            Notre analyse : les frais bas ne sont pas gratuits. Ce que vous ne payez pas en frais, vous
            le payez en temps passé à vous former, en risque de rester investi trop prudemment par excès
            de précaution, ou en risque inverse de céder à la panique lors d'une baisse faute d'un tiers
            pour objectiver la décision. Pour un profil autonome et discipliné, c'est un excellent choix.
            Pour quelqu'un qui doute de sa propre discipline face aux marchés, le calcul est moins
            évident qu'il n'y paraît. Le même arbitrage se pose, presque à l'identique, sur le PEA (plan
            d'épargne en actions) : notre comparatif{" "}
            <a href="/guide/pea-banque-ou-courtier">PEA banque ou courtier</a> creuse la question sous un
            angle très proche.
          </p>

          <h2 id="conseille">Le contrat conseillé, en gestion pilotée ou conseillée : pour qui veut être accompagné</h2>
          <p>
            La troisième catégorie regroupe les contrats souscrits avec l'accompagnement d'un
            professionnel — conseiller en gestion de patrimoine ou conseiller en investissement financier
            (CIF, un statut réglementé par l'ORIAS) — en gestion pilotée (les choix d'investissement sont
            délégués à un gérant, selon un profil de risque) ou en gestion conseillée (le professionnel
            propose, vous décidez). Le point commun : un interlocuteur identifié, capable de répondre à
            une question fiscale, d'ajuster l'allocation quand votre situation change, et d'articuler
            l'assurance-vie avec le reste de votre patrimoine.
          </p>
          <p>
            Ce service a un coût mesurable : la gestion pilotée ajoute un surcoût de mandat de l'ordre de{" "}
            {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)}{" "}
            par an, en plus des frais du contrat et des fonds sous-jacents — ordre de grandeur à
            vérifier, révisé en {HYPOTHESES_MAJ}. Sur un contrat par ailleurs proche d'un contrat en
            ligne pour le reste de sa tarification, cela porte le total annuel autour de{" "}
            {pct(fraisConseilleAnnuel)}, soit un niveau intermédiaire entre un contrat internet pur et un
            contrat bancaire traditionnel. Le surcoût se justifie quand l'accompagnement qu'il finance —
            allocation construite et revue dans le temps, optimisation fiscale et successorale, présence
            au moment où une décision compte — rapporte davantage qu'il ne coûte. Il se justifie beaucoup
            moins pour un contrat mis en gestion pilotée puis jamais revu.
          </p>
          <p>
            Deux nuances à connaître avant de choisir cette voie. D'abord, toute gestion pilotée n'est
            pas identique : certaines restent rigides — un profil figé sur un questionnaire initial, un
            rachat qui liquide proportionnellement toutes les lignes quel que soit le contexte de marché
            — quand d'autres sont réellement revues au fil du temps. Ensuite, l'accompagnement n'implique
            pas nécessairement une délégation totale : la gestion conseillée laisse la décision finale à
            l'épargnant, avec un avis professionnel en amont. Notre guide{" "}
            <a href="/guide/gestion-pilotee-ou-gestion-libre">gestion pilotée ou gestion libre</a>{" "}
            détaille ces nuances pour le PER comme pour l'assurance-vie, et notre article{" "}
            <a href="/guide/conseiller-ou-gerer-seul-sa-retraite">faut-il un conseiller, ou peut-on tout
            gérer seul</a> pose la question de fond, au-delà du seul choix de contrat. Pour situer ce que
            coûte réellement un accompagnement humain, indépendamment du contrat choisi,{" "}
            <a href="/guide/combien-coute-un-conseiller-en-gestion-de-patrimoine">combien coûte un
            conseiller en gestion de patrimoine</a> répond à la question en détail.
          </p>

          <h2 id="comparatif">Le tableau comparatif des trois profils</h2>
          <p>
            Voici la synthèse, à conserver comme grille de lecture plutôt que comme verdict — aucune
            colonne n'est « la bonne », chacune décrit un profil d'épargnant différent.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Profil de contrat</th>
                  <th>Frais typiques (contrat + supports)</th>
                  <th>Autonomie requise</th>
                  <th>Accompagnement disponible</th>
                  <th>Pour qui c'est fait</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Contrat bancaire traditionnel</td>
                  <td>
                    De l'ordre de {pct(fraisBancaireAnnuel)} par an, frais sur versement de{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.max)} en plus
                  </td>
                  <td>Faible — le conseiller propose, guide et exécute</td>
                  <td>Un conseiller en agence, généralement polyvalent sur l'ensemble de vos comptes</td>
                  <td>Qui privilégie la simplicité et un interlocuteur physique connu, sans viser le coût le plus bas</td>
                </tr>
                <tr>
                  <td>Contrat en ligne, gestion libre</td>
                  <td>De l'ordre de {pct(fraisInternetAnnuel)} par an, {pct(FRAIS_TYPES.contratInternet.entree.min)} à l'entrée</td>
                  <td>Élevée — allocation, arbitrages et suivi à la charge de l'épargnant</td>
                  <td>Support technique sur l'outil ; pas de conseil patrimonial personnalisé</td>
                  <td>Qui est autonome, discipliné face aux marchés, et veut minimiser les frais</td>
                </tr>
                <tr>
                  <td>Contrat conseillé, gestion pilotée ou conseillée</td>
                  <td>
                    De l'ordre de {pct(fraisConseilleAnnuel)} par an, surcoût de mandat de{" "}
                    {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)}{" "}
                    inclus
                  </td>
                  <td>Faible à modérée selon la formule (pilotée ou conseillée)</td>
                  <td>Un professionnel identifié, joignable pour les décisions et les ajustements</td>
                  <td>Qui veut déléguer ou être conseillé, avec un suivi dans la durée</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les frais indiqués sont des ordres de grandeur constatés sur le marché, à vérifier contrat
            par contrat et révisés en {HYPOTHESES_MAJ} ; ils ne préjugent en rien de la performance nette
            réellement délivrée, qui dépend avant tout des supports choisis et non du seul niveau de
            frais.
          </p>

          <h2 id="choisir">Comment choisir entre gérer seul et être accompagné ?</h2>
          <p>
            Derrière « quelle est la meilleure assurance-vie » se cache en réalité une question plus
            simple à trancher : préférez-vous gérer seul, ou être accompagné ? Une fois cette question
            réglée, le choix de catégorie de contrat découle presque naturellement.
          </p>
          <p>
            Quelques repères pour vous situer. Le montant en jeu compte : sur une petite épargne
            régulière, l'écart de frais entre les catégories reste limité en valeur absolue, et le
            confort peut primer ; sur un capital important ou des versements réguliers sur quinze ou
            vingt ans, l'écart de frais capitalisé devient significatif, ce qui pousse à regarder de
            près le coût de chaque option. La complexité de votre situation compte aussi : plusieurs
            enveloppes à articuler, un projet de transmission, une expatriation passée ou à venir, une
            activité d'indépendant — chacun de ces éléments plaide pour un accompagnement, quelle que
            soit par ailleurs votre aisance avec les outils financiers. Enfin, votre rapport aux marchés
            compte davantage qu'on ne le pense : si un mouvement de baisse vous pousse historiquement à
            arbitrer dans la précipitation, un accompagnement peut valoir son coût rien que pour cette
            fonction de garde-fou.
          </p>
          <p>
            Il n'y a pas de réponse honteuse. Gérer seul n'est pas plus vertueux qu'être accompagné, et
            l'inverse non plus — ce sont deux façons différentes de payer pour un résultat : en temps et
            en risque d'un côté, en frais de l'autre. Notre article{" "}
            <a href="/guide/conseiller-ou-gerer-seul-sa-retraite">faut-il un conseiller, ou peut-on tout
            gérer seul</a> détaille cette grille de décision au-delà du seul cas de l'assurance-vie.
          </p>

          <h2 id="luxembourg">Et l'assurance-vie luxembourgeoise, dans tout ça ?</h2>
          <p>
            Pour des patrimoines importants, il existe une quatrième famille de contrats, souscrits
            auprès d'assureurs luxembourgeois : elle répond à des besoins spécifiques (sécurité
            juridique renforcée dite « triangle de sécurité », neutralité fiscale en cas de mobilité
            internationale, accès à des supports plus larges) qui dépassent le cadre de cet article.
            Notre guide dédié, <a href="/guide/assurance-vie-luxembourgeoise">l'assurance-vie
            luxembourgeoise</a>, explique à qui elle s'adresse et dans quels cas elle mérite d'être
            étudiée.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on changer de type de contrat en cours de route, par exemple passer d'un contrat bancaire à un contrat en ligne ?</h3>
          <p>
            Pas directement par un simple transfert : il n'existe pas, à ce jour, de portabilité totale
            entre deux contrats d'assurance-vie chez deux assureurs différents sans perdre l'antériorité
            fiscale. En pratique, on ouvre un nouveau contrat à côté de l'ancien et l'on redirige les
            futurs versements, plutôt que de clôturer le premier — sauf situation particulière à étudier
            au cas par cas.
          </p>
          <h3>Un contrat plus cher est-il toujours moins performant ?</h3>
          <p>
            Non, et c'est un point que les comparatifs focalisés sur les seuls frais affichés
            occultent : ce qui compte, c'est la performance nette de frais réellement délivrée dans la
            durée, pas le niveau de frais isolé. Il existe des contrats plus coûteux qui créent de la
            valeur après frais, notamment grâce à l'accompagnement qu'ils financent. Ils restent
            minoritaires, ce qui justifie de vérifier plutôt que de présumer.
          </p>
          <h3>Faut-il se méfier d'un contrat qui affiche « 0 % de frais » partout ?</h3>
          <p>
            Il faut surtout comprendre où se loge le coût réel. Un contrat à frais d'entrée et de gestion
            nuls facture presque toujours autre chose : les frais courants des supports proposés, un
            écart de spread sur certaines transactions, ou simplement l'absence de tout service
            d'accompagnement. Ce n'est pas un défaut en soi, mais cela mérite d'être identifié avant de
            comparer deux offres sur le seul critère du « gratuit ».
          </p>
          <h3>La gestion pilotée est-elle réservée aux gros patrimoines ?</h3>
          <p>
            Non, elle est aujourd'hui accessible dès les premiers versements sur la plupart des
            contrats, bancaires comme en ligne. Ce qui varie avec le montant du patrimoine, c'est plutôt
            l'accès à une gestion conseillée personnalisée par un professionnel identifié, davantage
            qu'à la gestion pilotée standardisée elle-même.
          </p>
          <h3>Combien de temps l'argent reste-t-il bloqué sur une assurance-vie ?</h3>
          <p>
            Contrairement à une idée répandue, l'argent n'est jamais bloqué : un rachat (un retrait,
            partiel ou total) reste possible à tout moment, quel que soit le type de contrat. Le cap des
            huit ans, souvent confondu avec un blocage, ne conditionne que la fiscalité applicable aux
            gains retirés — pas leur disponibilité.
          </p>
          <h3>Peut-on avoir plusieurs assurances-vie de catégories différentes en même temps ?</h3>
          <p>
            Oui, sans aucune limite de nombre. Il est même courant de conserver un ancien contrat
            bancaire pour son antériorité fiscale tout en ouvrant un contrat en ligne ou conseillé pour
            les nouveaux versements — une pratique à évaluer selon votre situation plutôt qu'à appliquer
            par principe.
          </p>
          <h3>Un conseiller en gestion de patrimoine peut-il proposer n'importe quel contrat du marché ?</h3>
          <p>
            Cela dépend de son statut et des accords de distribution qu'il a mis en place. Un conseiller
            en investissement financier (CIF), statut réglementé par l'ORIAS, doit motiver ses
            recommandations par l'intérêt du client, mais son offre de contrats reste par nature limitée
            à ceux avec lesquels il a noué un partenariat de distribution — demander la liste des
            contrats accessibles fait partie des questions légitimes à poser avant de s'engager.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Revenons à la question de départ. Il n'existe pas de meilleure assurance-vie dans l'absolu,
            et se méfier de tout classement qui en désigne une devrait désormais être un réflexe : la
            bonne question n'est pas « quel contrat est le meilleur », mais « quel profil de contrat
            correspond à ma situation ». Un contrat bancaire traditionnel, un contrat en ligne en
            gestion libre, un contrat conseillé en gestion pilotée ou conseillée : chacun répond à un
            arbitrage différent entre coût, autonomie requise et accompagnement disponible, et aucun
            n'est structurellement supérieur aux deux autres.
          </p>
          <p>
            Ne pas trancher cette question a un coût, lui bien réel : rester par défaut sur un contrat
            mal adapté à son profil — trop cher pour qui pourrait gérer seul, ou trop isolé pour qui
            aurait besoin d'être accompagné — pèse chaque année sur le capital constitué, silencieusement,
            sans qu'aucun relevé annuel ne le signale explicitement. Pour comprendre comment ce
            phénomène se manifeste concrètement sur un contrat existant, notre guide{" "}
            <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">pourquoi votre assurance-vie
            rapporte peu</a> et notre article{" "}
            <a href="/guide/combien-coute-une-assurance-vie">combien coûte une assurance-vie</a>{" "}
            prolongent utilement cette analyse, tout comme{" "}
            <a href="/guide/risques-assurance-vie">les risques d'une assurance-vie</a> à connaître avant
            d'arbitrer vers des supports plus dynamiques.
          </p>
          <p>
            Notre rôle n'est pas de vous orienter vers un contrat plutôt qu'un autre
            en fonction d'un partenariat commercial, mais d'appliquer cette grille de lecture à votre
            situation réelle — vos versements, votre horizon, votre besoin ou non d'accompagnement — pour
            déterminer quelle catégorie de contrat vous convient, et comment l'articuler avec le reste de
            votre stratégie retraite. C'est ce que nous faisons lors d'un{" "}
            <a href="/bilan-retraite">bilan retraite gratuit</a> : vous venez avec votre contrat actuel,
            ou vos questions sur celui qu'on vous propose, et nous reprenons ensemble chaque critère de
            cet article, point par point.
          </p>

          <div className="note">
            <p>
              Cet article compare des catégories de contrats, pas des marques commerciales précises : en
              tant que conseil en investissement financier, nous ne publions pas de classement nommé, et
              cette analyse ne constitue pas un conseil en investissement personnalisé. Les montants,
              abattements et taux cités sont les barèmes en vigueur en {HYPOTHESES_MAJ}, susceptibles
              d'évoluer à chaque loi de finances ; les frais indiqués sont des ordres de grandeur
              constatés sur le marché, à vérifier contrat par contrat, et les performances passées ne
              préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Quel type de contrat correspond vraiment à votre profil ?"
        button="Bilan retraite gratuit (15 min)"
        to="/bilan-retraite"
      />
    </>
  );
}
