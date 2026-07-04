import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RENDEMENTS,
  FISCALITE,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

export default function GuideRetraiteFonctionnaires() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Profils spécifiques</span>
          <h1>Retraite des fonctionnaires : quelles spécificités, et comment la compléter ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> la pension d'un fonctionnaire se calcule, pour
              l'essentiel, sur le traitement indiciaire (le salaire de base lié à l'indice du
              poste, hors primes) des six derniers mois de carrière — et non sur l'ensemble des
              rémunérations perçues durant la vie professionnelle. Les primes, qui représentent
              souvent une part significative de la rémunération réelle selon les corps, n'entrent
              que très partiellement dans ce calcul, via un régime distinct, le RAFP (retraite
              additionnelle de la fonction publique). C'est cet écart entre rémunération vécue au
              quotidien et rémunération retenue pour la pension qui explique pourquoi tant
              d'agents publics découvrent, au moment du départ, un montant inférieur à ce qu'ils
              anticipaient — et pourquoi compléter avec des enveloppes d'épargne comme le PER
              (plan d'épargne retraite), l'assurance-vie ou le PEA (plan d'épargne en actions) a,
              pour ce profil aussi, tout son sens.
            </p>
          </div>
          <p>
            Vous êtes enseignant, agent hospitalier, cadre territorial ou fonctionnaire d'État,
            et vous avez fait une simulation sur votre compte retraite en ligne. Le chiffre
            affiché vous a surpris — en mal. Vous touchez pourtant des primes chaque mois, parfois
            conséquentes, et elles ne semblent peser que marginalement dans l'estimation. Vous
            vous demandez si vous avez mal lu, si le simulateur est incomplet, ou si c'est
            vraiment ainsi que ça fonctionne.
          </p>
          <p>
            C'est bien ainsi que ça fonctionne, et ce n'est pas une anomalie : c'est la logique
            même du régime de retraite des fonctionnaires, hérité d'une architecture pensée à une
            époque où les primes étaient marginales dans la rémunération publique. Cette
            architecture n'a pas suivi, dans les mêmes proportions, l'évolution réelle des
            grilles salariales — d'où l'écart que beaucoup d'agents découvrent aujourd'hui.
          </p>
          <p>
            Cet article ne remplace en rien une simulation personnalisée sur votre compte
            individuel retraite (accessible sur info-retraite.fr) ni les informations officielles
            de votre service RH, de votre caisse de retraite (SRE pour la fonction publique
            d'État, CNRACL pour les fonctions publiques territoriale et hospitalière) ou du site
            rafp.fr. Le calcul précis d'une pension — taux de liquidation, durée de services,
            bonifications éventuelles — dépend de paramètres légaux techniques et évolutifs,
            propres à chaque corps et à chaque génération : nous ne les detaillerons pas ici en
            pourcentages ou en âges précis. Notre objectif est de vous donner la mécanique
            d'ensemble, pour que vous compreniez ce qui se joue et que vous puissiez, avec ces
            repères en tête, construire une stratégie d'épargne cohérente.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#calcul-pension">Comment se calcule la pension d'un fonctionnaire ?</a></li>
              <li><a href="#rafp">Le RAFP : la retraite additionnelle qui couvre (un peu) les primes</a></li>
              <li><a href="#categorie-active">Catégorie active, catégorie sédentaire : une différence d'âge de départ</a></li>
              <li><a href="#decoit">Pourquoi la pension réelle déçoit-elle souvent les attentes ?</a></li>
              <li><a href="#completer">PER, assurance-vie, PEA : comment un fonctionnaire peut-il compléter sa retraite ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="calcul-pension">Comment se calcule la pension d'un fonctionnaire ?</h2>
          <p>
            Le régime de retraite de la fonction publique repose sur une logique différente de
            celle du secteur privé. Dans le régime général (salariés du privé), la pension se
            calcule sur les 25 meilleures années de salaire, primes comprises, dans la limite du
            plafond de la Sécurité sociale. Dans la fonction publique, la base de calcul est tout
            autre : c'est le traitement indiciaire (le salaire de base, déterminé par l'indice
            correspondant au grade et à l'échelon détenus, hors primes et indemnités) des six
            derniers mois d'activité qui sert de référence.
          </p>
          <p>
            Sur cette base, la pension est ensuite calculée en fonction d'un taux de liquidation
            (le pourcentage du traitement de référence retenu pour la pension), qui dépend
            lui-même de la durée de services et de bonifications effectivement accomplie par
            rapport à une durée de référence — cette durée de référence augmentant progressivement
            selon la génération de naissance, comme pour l'ensemble des régimes de retraite
            français. Un mécanisme de décote (minoration si la durée requise n'est pas atteinte)
            ou de surcote (majoration en cas de trimestres supplémentaires au-delà du taux plein)
            s'applique par ailleurs, selon une logique proche — mais pas identique dans ses
            paramètres précis — de celle du régime général. Notre guide sur{" "}
            <a href="/guide/surcote-decote-retraite">la surcote et la décote</a> détaille cette
            mécanique commune ; gardez en tête que les paramètres spécifiques à la fonction
            publique (durées, plafonds, âges pivots) ne sont pas strictement identiques à ceux du
            régime général qui y sont décrits.
          </p>
          <p>
            Nous ne donnerons volontairement aucun taux de liquidation ni aucune durée de
            services en pourcentage ou en trimestres dans cet article : ces paramètres sont
            fixés par des textes réglementaires qui évoluent au fil des réformes et diffèrent
            parfois selon le corps d'appartenance et l'année de naissance. Le seul point stable
            et de notoriété publique que l'on peut affirmer avec certitude, c'est le principe du
            calcul sur les six derniers mois de traitement indiciaire, hors primes. Pour les
            paramètres précis applicables à votre situation, votre service des ressources
            humaines, votre espace personnel sur info-retraite.fr, ou le site service-public.fr
            restent les sources à consulter — et à revérifier à intervalles réguliers, la
            réglementation retraite ayant montré, ces dernières années, qu'elle pouvait évoluer
            rapidement.
          </p>
          <div className="note">
            <p>
              Ce que nous décrivons ici sont des mécanismes, pas des simulations chiffrées de
              votre pension. Toute estimation personnelle doit se fonder sur votre relevé de
              carrière individuel et les simulateurs officiels (info-retraite.fr), jamais sur des
              moyennes générales.
            </p>
          </div>

          <h2 id="rafp">Le RAFP : la retraite additionnelle qui couvre (un peu) les primes</h2>
          <p>
            Conscient que les primes échappent largement au calcul de la pension principale, le
            législateur a créé en 2005 un régime spécifique : le RAFP, retraite additionnelle de
            la fonction publique. Il s'agit d'un régime obligatoire, par points, financé par des
            cotisations assises justement sur les primes et indemnités (dans une certaine limite),
            que l'agent et son employeur versent chaque année. Ces cotisations sont converties en
            points, eux-mêmes convertis en rente (ou, sous certaines conditions de faible montant,
            en capital) au moment du départ à la retraite.
          </p>
          <p>
            L'idée est donc bonne : faire contribuer une part de la rémunération indemnitaire à un
            complément de retraite, là où elle est absente du calcul principal. Dans la pratique,
            le RAFP reste un régime additionnel au sens strict du terme — un complément, pas un
            substitut. Le taux de cotisation appliqué et le plafond de primes pris en compte sont
            fixés réglementairement et peuvent évoluer ; nous ne les indiquons pas ici pour éviter
            de diffuser un chiffre daté ou obsolète. Le site rafp.fr publie les paramètres à jour,
            votre relevé de points RAFP (consultable sur info-retraite.fr) et une estimation de
            rente en fonction des points accumulés.
          </p>
          <p>
            Notre analyse : le RAFP est une brique utile, mais elle n'est structurellement pas
            calibrée pour combler l'écart entre rémunération totale perçue durant la carrière et
            base de calcul de la pension principale — d'abord parce que les cotisations ne portent
            que sur une fraction plafonnée des primes, ensuite parce que les rentes RAFP,
            rapportées au nombre d'années de carrière, restent en général d'un montant modeste
            comparées à l'écart de traitement en jeu. C'est précisément l'espace que peut occuper
            une épargne retraite personnelle, sur laquelle nous revenons plus bas.
          </p>

          <h2 id="categorie-active">Catégorie active, catégorie sédentaire : une différence d'âge de départ</h2>
          <p>
            Autre spécificité de la fonction publique : tous les corps ne partent pas au même
            âge. La distinction se fait entre catégorie sédentaire (la majorité des emplois
            administratifs et de bureau) et catégorie active (des emplois classés ainsi en raison
            de risques particuliers ou de fatigue exceptionnelle — certains corps de la police, de
            l'administration pénitentiaire, des sapeurs-pompiers professionnels, ou une partie des
            personnels soignants et paramédicaux, par exemple). Les agents relevant d'une
            catégorie active bénéficient, en principe, d'un âge d'ouverture des droits à la
            retraite plus précoce, en contrepartie de la pénibilité ou de la spécificité de leurs
            fonctions.
          </p>
          <p>
            Nous ne donnons volontairement aucun âge précis dans cet article : les âges d'ouverture
            des droits diffèrent selon la catégorie, le corps d'appartenance, et surtout la
            génération de naissance, puisque les réformes successives des retraites ont
            progressivement relevé ces bornes d'âge, y compris pour la catégorie active. Le
            classement d'un corps ou d'un emploi en catégorie active répond par ailleurs à des
            critères réglementaires précis, fixés statut par statut — un même métier peut, selon
            l'employeur ou le statut, ne pas être classé de la même façon. Si votre situation
            professionnelle vous semble relever d'une catégorie active, la vérification se fait
            auprès de votre service RH ou sur service-public.fr, jamais par analogie avec le cas
            d'un collègue ou d'un autre corps.
          </p>
          <p>
            Ce que l'on peut affirmer sans risque d'erreur, en revanche, c'est le principe : plus
            un départ est anticipé, plus le nombre d'années de cotisation susceptibles d'être
            atteintes au moment du départ est mécaniquement réduit — sauf carrière commencée tôt —,
            ce qui peut jouer sur le taux de liquidation final selon les règles en vigueur pour la
            génération concernée. Un départ anticipé au titre de la catégorie active n'est donc
            pas systématiquement synonyme de pension pleine ; c'est un paramètre parmi d'autres,
            à intégrer dans la réflexion patrimoniale globale plutôt qu'à isoler.
          </p>

          <h2 id="decoit">Pourquoi la pension réelle déçoit-elle souvent les attentes ?</h2>
          <p>
            Reprenons les deux mécanismes ci-dessus et mettons-les en perspective avec le
            quotidien d'un agent public. Dans de nombreux corps de la fonction publique — enseignement,
            filière administrative, filière technique territoriale, certains corps hospitaliers —
            les primes et indemnités (prime de fonctions et de résultats, indemnités de sujétions,
            heures supplémentaires, NBI, régimes indemnitaires divers selon l'employeur) peuvent
            représenter une part non négligeable de la rémunération mensuelle nette, avec de très
            fortes disparités selon les corps, les grades et les employeurs. Cette part-là,
            vécue au quotidien comme faisant pleinement partie du niveau de vie, n'entre que très
            partiellement dans le calcul de la pension principale — et seulement de façon indirecte
            et plafonnée via le RAFP.
          </p>
          <p>
            Le contraste est net avec un salarié du secteur privé : dans le régime général, la
            totalité du salaire brut (dans la limite du plafond de la Sécurité sociale, primes
            comprises) entre en compte dans le calcul des 25 meilleures années. Un cadre du privé
            qui perçoit une part variable importante la voit, pour l'essentiel, refléter dans sa
            future pension. Un agent public dans une situation de rémunération comparable, primes
            incluses, ne retrouvera qu'une fraction de cet écart dans sa pension, la référence
            restant le traitement indiciaire des six derniers mois.
          </p>
          <p>
            D'où le sentiment de décalage, souvent découvert tardivement, au moment de la première
            simulation sérieuse : le niveau de vie construit durant la carrière, primes comprises,
            ne se retrouve pas dans la même proportion au moment de la retraite. Ce n'est un
            défaut de calcul de personne — ni de l'administration, ni de l'agent : c'est la
            conséquence directe et prévisible d'une architecture de calcul construite sur une
            assiette partielle de la rémunération. La bonne nouvelle, si l'on peut dire, est que
            ce décalage est connu, documenté, et anticipable des années à l'avance — à condition
            de s'y intéresser suffisamment tôt, ce qui est précisément l'objet du reste de cet
            article.
          </p>

          <h2 id="completer">PER, assurance-vie, PEA : comment un fonctionnaire peut-il compléter sa retraite ?</h2>
          <p>
            Face à cet écart structurel, la question n'est pas différente, dans son principe,
            de celle que se pose n'importe quel actif du privé ou indépendant : quelle épargne
            personnelle construire pour combler la différence entre le niveau de vie souhaité à la
            retraite et la pension attendue ? Les enveloppes disponibles sont les mêmes pour tous
            les Français, fonctionnaires compris ; ce qui change, c'est la manière de les doser
            compte tenu de ce profil particulier.
          </p>
          <p>
            Le PER (plan d'épargne retraite), d'abord. Il permet de déduire les versements
            volontaires du revenu imposable, dans une certaine limite annuelle, avec un
            avantage d'autant plus net que la tranche marginale d'imposition (TMI, le taux
            d'imposition qui s'applique à la dernière tranche de revenu) est élevée au moment du
            versement. Il n'existe pas de seuil de TMI universellement « idéal » à partir duquel le
            PER devient automatiquement pertinent : c'est un arbitrage propre à chaque situation,
            qui dépend aussi de la TMI anticipée à la retraite, du besoin de liquidité avant cet
            âge (l'épargne PER est bloquée, sauf cas de déblocage anticipé prévus par la loi, dont
            l'achat de la résidence principale) et de la fiscalité à la sortie, en rente ou en
            capital. Pour un agent public bénéficiant d'une pension de base stable mais dont la
            TMI baissera sensiblement à la retraite, le mécanisme peut avoir du sens ; il n'a
            rien d'une martingale automatique. Notre guide{" "}
            <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER ?</a> détaille les
            arbitrages à mener avant de se décider.
          </p>
          <p>
            L'assurance-vie, ensuite. Enveloppe la plus polyvalente du paysage français : pas de
            plafond de versement, disponibilité à tout moment (voir notre article sur{" "}
            <a href="/guide/meilleure-assurance-vie-retraite">la meilleure assurance-vie pour
            préparer sa retraite</a>), fiscalité allégée après huit ans de détention, avec un
            abattement annuel sur les gains rachetés de {euros(FISCALITE.avAbattementAnnuelSeul)}{" "}
            pour une personne seule ou {euros(FISCALITE.avAbattementAnnuelCouple)} pour un couple
            soumis à imposition commune, et un taux réduit de{" "}
            {pct(FISCALITE.avTauxReduitApres8Ans)} sous conditions (barème en vigueur en{" "}
            {HYPOTHESES_MAJ} — à vérifier lors de votre versement). Sa souplesse en fait un
            complément naturel au PER, moins contraignant, pour tout objectif intermédiaire avant
            la retraite (financement des études des enfants, projet immobilier) tout en restant
            mobilisable à long terme.
          </p>
          <p>
            Le PEA (plan d'épargne en actions), enfin, souvent sous-utilisé alors qu'il reste,
            après cinq ans de détention, l'une des enveloppes les plus efficaces pour loger des
            actions ou des ETF actions (fonds cotés en bourse répliquant un indice) : les
            plus-values sont exonérées d'impôt sur le revenu au-delà de ce délai (seuls les
            prélèvements sociaux restent dus). Sur un horizon long — celui d'un fonctionnaire à
            15 ou 20 ans de la retraite — les grands indices actions mondiaux ont historiquement
            délivré des moyennes annualisées de l'ordre de{" "}
            {pct(RENDEMENTS.ucActionsLongTerme.min)} à {pct(RENDEMENTS.ucActionsLongTerme.max)}{" "}
            sur {RENDEMENTS.ucActionsLongTerme.periode} (indices type MSCI World, dividendes
            réinvestis, en euros, avant frais et fiscalité), une moyenne de très long terme,
            obtenue au prix d'années fortement négatives, et que les performances passées ne
            préjugent en rien des performances futures. Le PEA n'a pas
            vocation à porter une épargne de sécurité : c'est un outil de capitalisation de long
            terme, dont la volatilité (l'amplitude des variations de valeur) doit être acceptée en
            amont.
          </p>
          <p>
            La bonne répartition entre ces trois enveloppes dépend de votre horizon avant le
            départ, de votre TMI actuelle et anticipée, de votre besoin de liquidité et de votre
            tolérance au risque — pas d'une recette universelle applicable à tous les
            fonctionnaires. C'est le fil directeur que nous développons dans notre guide{" "}
            <a href="/guide/meilleure-enveloppe-retraite">quelle est la meilleure enveloppe pour
            préparer sa retraite</a> : le PER n'a rien d'automatiquement magique, le PEA est
            largement sous-employé par rapport à son potentiel, et l'assurance-vie reste la brique
            de flexibilité. Un raisonnement en tout point transposable, à quelques nuances liées
            au calcul de la pension, au cas d'un indépendant : voyez à ce titre notre article
            symétrique{" "}
            <a href="/guide/retraite-independants-per-ou-madelin">PER ou Madelin pour les
            indépendants</a>, qui traite d'un profil professionnel différent confronté, pour des
            raisons distinctes, au même besoin de compléter une retraite obligatoire par une
            épargne personnelle.
          </p>
          <p>
            Deux réflexes, propres au calendrier d'un fonctionnaire, méritent d'être ajoutés à ce
            triptyque. D'abord, le rachat de trimestres (années d'études ou années incomplètes),
            qui peut, selon les cas, avoir un effet sur la décote ou permettre un départ plus tôt
            — un dispositif technique dont le coût et l'intérêt se calculent au cas par cas, détaillé
            dans notre guide{" "}
            <a href="/guide/combien-coute-rachat-trimestres-retraite">combien coûte le rachat de
            trimestres</a>. Ensuite, pour ceux qui souhaitent continuer à exercer après la
            liquidation de leur pension, le cumul emploi-retraite obéit, dans la fonction publique
            comme dans le privé, à des règles spécifiques que notre article{" "}
            <a href="/guide/cumul-emploi-retraite-comment-ca-marche">cumul emploi-retraite,
            comment ça marche</a> explique pas à pas.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Les primes comptent-elles vraiment pour zéro dans le calcul de la pension ?</h3>
          <p>
            Pas totalement pour zéro, mais très partiellement. Elles restent hors du calcul de la
            pension principale, fondée sur le traitement indiciaire des six derniers mois ; elles
            alimentent en revanche, dans une certaine limite et à un taux fixé réglementairement,
            le régime additionnel RAFP, qui verse un complément de retraite sous forme de points
            convertis en rente (ou en capital pour de faibles montants). L'écart entre la
            contribution réelle des primes au niveau de vie et leur poids dans la pension totale
            reste néanmoins significatif pour la plupart des corps concernés.
          </p>
          <h3>Comment savoir si mon corps relève de la catégorie active ?</h3>
          <p>
            Le classement en catégorie active répond à des critères réglementaires précis,
            statut par statut, et ne se déduit pas du seul intitulé du métier. Votre service des
            ressources humaines et votre relevé de carrière individuel (accessible sur
            info-retraite.fr) sont les sources à consulter ; le site service-public.fr recense par
            ailleurs les grandes familles de corps concernées, mais toute vérification définitive
            doit se faire auprès de votre employeur.
          </p>
          <h3>Le RAFP suffit-il à compenser la faible prise en compte des primes ?</h3>
          <p>
            En général, non, ou seulement de façon partielle : les cotisations RAFP portent sur
            une fraction plafonnée des primes, et la rente qui en résulte, rapportée à une carrière
            complète, reste le plus souvent d'un montant modeste au regard de l'écart de
            rémunération en jeu. C'est un complément réel, mais rarement suffisant à lui seul pour
            combler l'écart ressenti au moment du départ — d'où l'intérêt d'une épargne
            personnelle en complément.
          </p>
          <h3>Un fonctionnaire a-t-il intérêt à ouvrir un PER plutôt qu'une assurance-vie ?</h3>
          <p>
            Cela dépend de sa tranche marginale d'imposition actuelle et anticipée à la retraite,
            de son besoin de liquidité avant le départ et de ses objectifs intermédiaires. Le PER
            offre un avantage fiscal à l'entrée mais bloque l'épargne jusqu'à la retraite, sauf cas
            de déblocage prévus par la loi ; l'assurance-vie reste disponible à tout moment et
            offre une fiscalité allégée après huit ans. Les deux enveloppes sont souvent
            complémentaires plutôt que concurrentes ; notre guide{" "}
            <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER ?</a> détaille les
            critères de décision.
          </p>
          <h3>La réforme des retraites a-t-elle changé les règles pour la fonction publique ?</h3>
          <p>
            Les réformes successives ont, de façon générale, relevé progressivement les bornes
            d'âge et les durées de services requises pour l'ensemble des régimes de retraite
            français, fonction publique comprise, y compris pour la catégorie active. Les
            paramètres précis applicables dépendent de votre génération de naissance et de votre
            situation individuelle : ils évoluent régulièrement et doivent être vérifiés sur
            info-retraite.fr ou auprès de votre service RH plutôt que déduits d'un article
            généraliste.
          </p>
          <h3>Est-il utile de faire un bilan retraite quand on est fonctionnaire ?</h3>
          <p>
            Oui, sans doute même davantage que pour d'autres profils, précisément parce que le
            décalage entre rémunération vécue et pension calculée est structurel et rarement
            anticipé à sa juste mesure. Un bilan retraite permet de croiser votre relevé de
            carrière individuel, votre situation RAFP, votre fiscalité et vos objectifs personnels
            pour déterminer, au cas par cas, quelle épargne construire et selon quel calendrier.
          </p>
          <h3>Faut-il se méfier des simulateurs en ligne génériques ?</h3>
          <p>
            Les simulateurs officiels (info-retraite.fr) restent la référence la plus fiable, car
            ils s'appuient sur votre relevé de carrière réel. Les simulateurs génériques que l'on
            trouve par ailleurs, construits sur des hypothèses moyennes, peuvent donner une
            première idée d'ordre de grandeur mais ne remplacent en rien une estimation
            personnalisée, en particulier pour un régime aussi spécifique que celui de la fonction
            publique.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Reprenons le fil. La pension d'un fonctionnaire n'est pas calculée comme celle d'un
            salarié du privé : elle repose sur le traitement indiciaire des six derniers mois,
            hors primes pour l'essentiel, complété très partiellement par le RAFP. Cette
            architecture, stable dans son principe depuis des décennies, explique pourquoi tant
            d'agents publics, notamment ceux dont la part indemnitaire est significative, découvrent
            au moment de leur simulation un montant en retrait par rapport à leur niveau de vie
            construit durant la carrière. L'âge de départ, par ailleurs, varie selon que le corps
            relève de la catégorie active ou sédentaire, sans que l'on puisse généraliser un âge
            précis applicable à tous.
          </p>
          <p>
            Face à ce constat, la réponse n'est pas différente, dans sa nature, de celle que nous
            recommandons à tout profil : construire, en parallèle de la retraite obligatoire, une
            épargne personnelle dosée selon l'horizon, la fiscalité et les objectifs de chacun,
            en s'appuyant sur les enveloppes disponibles — PER, assurance-vie, PEA — sans céder à
            l'idée qu'une seule d'entre elles suffirait à tout résoudre. Pour aller plus loin sur
            la construction de cette épargne, nos guides{" "}
            <a href="/guide/combien-faut-il-epargner-pour-la-retraite">combien faut-il épargner
            pour la retraite</a> et{" "}
            <a href="/guide/gestion-pilotee-ou-gestion-libre">gestion pilotée ou gestion libre</a>{" "}
            complètent utilement cet article.
          </p>
          <div className="note">
            <p>
              Cet article décrit des mécanismes généraux du régime de retraite de la fonction
              publique ; il ne constitue ni une simulation de votre pension, ni un conseil en
              investissement personnalisé. Les paramètres précis (taux de liquidation, durées de
              services, âges d'ouverture des droits, taux de cotisation RAFP) dépendent de votre
              corps, de votre génération et de votre carrière individuelle : ils doivent être
              vérifiés auprès de votre service des ressources humaines, sur info-retraite.fr ou
              sur rafp.fr avant toute décision. Les chiffres de marché cités sont des constats
              passés ou des hypothèses illustratives ; les performances passées ne préjugent pas
              des performances futures. C'est précisément l'objet de notre{" "}
              <a href="/bilan-retraite">bilan retraite gratuit</a> : faire le point sur votre
              situation réelle, chiffres officiels à l'appui, avant de bâtir une stratégie
              d'épargne adaptée.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Fonctionnaire, et vous voulez y voir clair sur votre retraite ?"
        button="Bilan retraite gratuit (15 min)"
        to="/bilan-retraite"
      />
    </>
  );
}
