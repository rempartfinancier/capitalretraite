import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { RENDEMENTS, FRAIS_TYPES, HYPOTHESES_MAJ, pct } from "../components/hypotheses.js";

export default function GuideEtfOuFondsActifs() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Comparaison de supports</span>
          <h1>ETF ou fonds de gestion active : le vrai match, sans caricature</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <p>
            Deux camps s'affrontent sur les réseaux sociaux, et les deux caricaturent. Le premier
            décrète que la gestion active est morte, que seuls les ETF (des fonds cotés qui
            répliquent un indice boursier plutôt que de chercher à le battre) méritent d'exister.
            Le second défend les fonds actifs comme un bloc, en minimisant leurs frais et leurs
            échecs. Notre analyse : aucun des deux discours ne résiste à un examen rigoureux. Il
            existe de bons ETF, de mauvais ETF, de bons fonds actifs et des fonds actifs qui ne
            justifient pas leur prix — et le distinguer demande de sortir du slogan.
          </p>
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> pour la plupart des épargnants, l'ETF à bas coût est
              difficile à battre sur le cœur d'un portefeuille actions destiné à la retraite, une
              fois les frais réellement déduits — l'écart de frais avec la gestion active agit
              chaque année, qu'il y ait ou non surperformance en face. La gestion active garde
              cependant des arguments réels sur des poches spécifiques (l'obligataire notamment)
              ou via de rares fonds de conviction assumés. La bonne question n'est donc pas « ETF
              ou gestion active » de façon exclusive, mais quel rôle chaque support joue dans votre
              allocation, à quel prix, et pour quel objectif.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#definitions">ETF et gestion active : deux logiques, deux prix</a></li>
              <li><a href="#chiffre-choc">Le chiffre-choc de la sous-performance des gérants actifs, et ses angles morts</a></li>
              <li><a href="#limites-etf">Les limites réelles de l'ETF : concentration, baisses de marché, absence de stratégie</a></li>
              <li><a href="#gestion-active">Où la gestion active garde des arguments</a></li>
              <li><a href="#comment-choisir">ETF ou gestion active : comment trancher pour son propre portefeuille ?</a></li>
              <li><a href="#tableau">Le comparatif en un tableau</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
            </ol>
          </div>

          <h2 id="definitions">ETF et gestion active : deux logiques, deux prix</h2>
          <p>
            Un ETF (exchange-traded fund, ou fonds coté) réplique un indice (un panier prédéfini
            de titres censé représenter un marché, comme le CAC 40 ou le MSCI World) : il achète
            mécaniquement les mêmes valeurs, dans les mêmes proportions, sans chercher à en
            écarter aucune. Cette absence de sélection a un coût très bas : des frais courants de
            l'ordre de {pct(FRAIS_TYPES.etf.fraisCourants.min)} à{" "}
            {pct(FRAIS_TYPES.etf.fraisCourants.max)} par an pour les grands ETF actions (ordre de
            grandeur en {HYPOTHESES_MAJ}, à vérifier fonds par fonds dans le document
            d'informations clés).
          </p>
          <p>
            Un fonds de gestion active fonctionne à l'inverse : une équipe de gestion sélectionne
            les titres qu'elle juge les plus prometteurs et en écarte d'autres, dans l'espoir de
            faire mieux que l'indice de référence après ses propres frais. Ce travail de sélection
            se facture : les frais courants des fonds actions de gestion active distribués en
            France s'échelonnent le plus souvent entre{" "}
            {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.min)} et{" "}
            {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.max)} par an (ordre de grandeur
            en {HYPOTHESES_MAJ}). L'écart de coût entre les deux familles est donc structurel,
            avant même de parler de performance : il faut qu'un fonds actif produise nettement
            plus de valeur pour simplement compenser ce qu'il facture en plus.
          </p>

          <h2 id="chiffre-choc">Le chiffre-choc de la sous-performance des gérants actifs, et ses angles morts</h2>
          <p>
            Un chiffre revient sans cesse dans le débat : une écrasante majorité des gérants
            actifs feraient moins bien que leur indice de référence sur longue période. Ce constat
            provient des études{" "}
            <a href="https://www.spglobal.com/spdji/en/research-insights/spiva/" target="_blank" rel="noopener noreferrer">
              SPIVA (S&amp;P Indices Versus Active, publiées par S&amp;P Dow Jones Indices)
            </a>
            , qui font référence sur le sujet — <strong>le pourcentage exact varie selon la zone
            géographique, la classe d'actifs et le millésime du rapport, et doit être vérifié dans
            l'édition SPIVA la plus récente avant toute citation précise</strong>. La tendance de
            fond, elle, est constante depuis que ces études existent : la majorité des fonds
            actifs, en moyenne et dans la durée, ne battent effectivement pas leur indice net de
            frais.
          </p>
          <p>
            Mais un chiffre juste peut être mal interprété, et celui-ci mérite trois réserves.
            D'abord, la méthode de comparaison elle-même : ces études opposent souvent des fonds
            actifs mesurés nets de frais à des indices bruts, qui eux ne supportent aucun coût de
            gestion, de transaction ni de distribution — un écart de mesure qui gonfle
            mécaniquement le nombre de fonds classés perdants. Ensuite, le biais de survie : les
            fonds qui ferment ou fusionnent en cours d'étude, souvent parce qu'ils ont mal
            performé, sortent de l'échantillon final et n'apparaissent plus comme des échecs — ce
            qui améliore artificiellement le bilan apparent des survivants. Enfin, une partie de
            ce qu'on appelle « gestion active » n'en est pas vraiment : le closet indexing
            (gestion faussement active, qui réplique l'indice de très près tout en facturant le
            tarif d'une vraie sélection de titres) cumule les deux inconvénients sans en avoir les
            avantages — les frais d'un fonds actif, la performance d'un indice moins ces frais.
            C'est cette catégorie hybride qui pèse le plus lourd dans les statistiques défavorables
            à la gestion active, alors qu'elle ne représente ni l'un ni l'autre modèle dans sa
            forme aboutie.
          </p>
          <p>
            Notre analyse : le constat statistique global reste valable et ne doit pas être nié —
            en moyenne, battre son indice net de frais est difficile. Mais une moyenne qui mélange
            de la gestion réellement active et du closet indexing déguisé ne dit rien sur la
            performance des fonds de conviction véritables, ceux qui s'écartent réellement de leur
            indice. Ce constat porte, comme toujours, sur des données passées : les performances
            passées ne préjugent jamais des performances futures.
          </p>
          <div className="note">
            <p>
              <strong>Chiffres à vérifier avant publication :</strong> le pourcentage précis de
              gérants sous-performants selon les rapports{" "}
              <a href="https://www.spglobal.com/spdji/en/research-insights/spiva/" target="_blank" rel="noopener noreferrer">
                SPIVA
              </a>{" "}
              (S&amp;P Dow Jones Indices) n'est volontairement pas cité en valeur exacte dans cet
              article — il varie selon la zone géographique, la classe d'actifs et le millésime du
              rapport, et doit être confirmé à la source avant toute publication d'un chiffre
              précis.
            </p>
          </div>

          <h2 id="limites-etf">Les limites réelles de l'ETF : concentration, baisses de marché, absence de stratégie</h2>
          <p>
            Répliquer un indice, c'est acheter tout l'indice sans discernement : les entreprises
            en forte croissance comme celles en déclin, dans les proportions que l'indice leur
            attribue. Un ETF ne trie pas. Cette absence de tri a une conséquence concrète sur la
            diversification réelle obtenue : les grands indices actions mondiales sont aujourd'hui
            concentrés à hauteur d'environ 70 % sur les États-Unis (composition constatée en{" "}
            {HYPOTHESES_MAJ}, à vérifier et à dater précisément selon le fournisseur d'indice).
            Acheter « le monde » via un seul ETF revient donc, dans les faits, à parier
            massivement sur une seule zone économique.
          </p>
          <p>
            Un ETF ne se protège pas non plus des baisses de marché : il suit l'indice à la
            hausse comme à la baisse, sans marge de manœuvre pour réduire l'exposition ou
            sécuriser des gains. C'est un peu comme un pilote automatique réglé sur une seule
            route : il tient parfaitement le cap tant que la route est dégagée, mais il ne freine
            pas devant un obstacle — freiner n'est simplement pas sa fonction. Un gérant actif, en
            théorie, le peut ; encore faut-il qu'il le fasse à propos, ce qui n'a rien d'automatique
            non plus.
          </p>
          <p>
            Gestion passive ne veut pas dire gestion irréfléchie. Choisir un indice plutôt qu'un
            autre, décider de la part qu'il occupera dans un portefeuille, discipliner ses
            versements et ses arbitrages dans la durée : tout cela reste entièrement à la charge
            de l'épargnant ou de son conseiller. L'ETF exécute une stratégie, il n'en fournit pas
            une.
          </p>

          <h2 id="gestion-active">Où la gestion active garde des arguments</h2>
          <p>
            Le terrain le plus souvent cité en faveur de la gestion active est l'obligataire (les
            fonds investis en obligations, ces titres de dette émis par des États ou des
            entreprises) : le marché obligataire est moins uniforme que les grands indices actions,
            et la sélection des émetteurs, des échéances et des niveaux de risque de crédit peut y
            faire une différence plus marquée qu'en actions.
          </p>
          <p>
            Il existe par ailleurs, en actions comme ailleurs, ce qu'on peut appeler des fonds de
            conviction : des équipes de gestion qui s'écartent nettement de leur indice de
            référence, assument des choix tranchés et publient un historique cohérent avec cette
            prise de risque assumée. Ces fonds sont rares, souvent plus chers que la moyenne, et
            exigent une sélection au moins aussi rigoureuse que celle qu'ils prétendent appliquer
            aux titres qu'ils détiennent : un historique flatteur sur quelques années ne garantit
            rien pour la décennie suivante. Ce constat, comme les autres cités dans cet article,
            porte sur des données passées et ne préjuge pas de l'avenir — un rappel que{" "}
            <a
              href="https://www.amf-france.org/fr/espace-epargnants/comprendre-les-produits-financiers/les-performances-passees-ne-prejugent-pas-des-performances-futures"
              target="_blank"
              rel="noopener noreferrer"
            >
              l'Autorité des marchés financiers impose à juste titre
            </a>{" "}
            sur toute communication de performance.
          </p>

          <h2 id="comment-choisir">ETF ou gestion active : comment trancher pour son propre portefeuille ?</h2>
          <p>
            Pour le cœur d'un portefeuille actions destiné à préparer sa retraite, l'ETF à bas
            coût est difficile à surpasser une fois les frais réellement déduits : l'écart de
            frais constaté plus haut agit chaque année, qu'il y ait ou non surperformance en face,
            et il se compose avec le temps. Ce n'est pas un verdict idéologique, c'est une
            question d'arithmétique répétée sur plusieurs décennies.
          </p>
          <p>
            Ce qui compte, au fond, n'est ni l'étiquette « passif » ni l'étiquette « actif » :
            c'est la cohérence entre le support choisi, l'objectif poursuivi et le prix payé pour
            l'atteindre. Un ETF mal choisi ou mal dosé dans une allocation ne vaut pas mieux qu'un
            fonds actif cher qui ne fait que suivre son indice de loin. La question à se poser
            avant tout achat n'est donc pas « ETF ou gestion active ? » mais « qu'est-ce que ce
            support fait réellement, à quel prix, et pour quel rôle dans ma stratégie globale ? ».
          </p>

          <h2 id="tableau">Le comparatif en un tableau</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>ETF (gestion passive)</th>
                  <th>Fonds de gestion active</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frais courants annuels</td>
                  <td>
                    Environ {pct(FRAIS_TYPES.etf.fraisCourants.min)} à{" "}
                    {pct(FRAIS_TYPES.etf.fraisCourants.max)} ({HYPOTHESES_MAJ})
                  </td>
                  <td>
                    Le plus souvent {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.min)} à{" "}
                    {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.max)} ({HYPOTHESES_MAJ})
                  </td>
                </tr>
                <tr>
                  <td>Objectif affiché</td>
                  <td>Répliquer la performance d'un indice, à la hausse comme à la baisse</td>
                  <td>Faire mieux que son indice de référence après ses propres frais</td>
                </tr>
                <tr>
                  <td>Risque spécifique</td>
                  <td>Concentration subie de l'indice répliqué ; aucune protection en baisse de marché</td>
                  <td>Risque que la gestion ne soit active que de nom (closet indexing) pour le prix d'une vraie sélection</td>
                </tr>
                <tr>
                  <td>Transparence</td>
                  <td>Composition et méthode connues et publiées en continu</td>
                  <td>Stratégie et choix du gérant à examiner fonds par fonds, sur la durée</td>
                </tr>
                <tr>
                  <td>Pour quel usage</td>
                  <td>Cœur de portefeuille actions, exposition large et peu coûteuse</td>
                  <td>Poches spécifiques (dont l'obligataire) ou fonds de conviction sélectionnés avec exigence</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Pour aller plus loin sur les enveloppes qui logent ces supports, notre page{" "}
            <a href="/strategies/pea-retraite">le PEA comme outil retraite</a> détaille comment
            loger des ETF ou des fonds actions dans un cadre fiscal avantageux, et le guide{" "}
            <a href="/guide/pea-banque-ou-courtier">PEA : banque ou courtier</a> explique pourquoi
            le même support peut coûter très différemment selon l'établissement qui le distribue.
            Le mécanisme des frais qui rongent silencieusement un contrat est aussi celui que nous
            décortiquons dans{" "}
            <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">
              pourquoi votre assurance-vie rapporte si peu
            </a>
            , et la question plus large du choix d'une enveloppe est traitée dans notre{" "}
            <a href="/guide/meilleure-enveloppe-retraite">
              comparatif des enveloppes retraite
            </a>
            .
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Un ETF protège-t-il des baisses de marché ?</h3>
          <p>
            Non. Un ETF réplique son indice à la hausse comme à la baisse, sans marge de manœuvre
            pour réduire l'exposition ou sécuriser des gains avant un repli : ce n'est pas sa
            fonction. Se protéger d'une baisse suppose soit un arbitrage décidé en amont (par
            l'épargnant ou un professionnel), soit un support construit pour amortir les
            mouvements de marché, ce qu'un ETF indiciel classique n'est pas conçu pour faire.
          </p>
          <h3>ETF ou gestion active, que choisir pour son PER ?</h3>
          <p>
            La logique est la même que pour toute autre enveloppe : l'ETF à bas coût est un choix
            pertinent pour le cœur d'un portefeuille actions sur un horizon long, celui typique
            d'un plan d'épargne retraite (PER). La gestion active garde un intérêt sur des poches
            spécifiques, notamment obligataires, ou via un nombre restreint de fonds de conviction
            sélectionnés avec exigence. Le choix du support est distinct du choix de l'enveloppe :
            notre <a href="/guide/quel-est-le-meilleur-per">comparatif sur le PER</a> détaille les
            critères propres à cette enveloppe.
          </p>
          <h3>Un fonds actif plus cher est-il toujours moins performant qu'un ETF ?</h3>
          <p>
            Pas toujours, mais c'est l'exception plutôt que la règle une fois les frais réellement
            déduits et sur longue période. Certains fonds de conviction véritables surperforment
            durablement leur indice après frais ; le problème est qu'il est difficile d'identifier
            à l'avance lesquels, et qu'un historique flatteur sur quelques années ne garantit rien
            pour la décennie suivante. D'où l'exigence d'une sélection rigoureuse plutôt qu'un pari
            sur la réputation d'une marque ou d'un gérant.
          </p>
          <h3>Le closet indexing, c'est grave ?</h3>
          <p>
            C'est surtout une mauvaise affaire pour l'épargnant qui le paie sans le savoir : un
            fonds en closet indexing facture le tarif d'une gestion active alors qu'il réplique
            son indice de très près, sans réel effort de sélection. Le signal à vérifier avant de
            souscrire est l'écart de comportement du fonds par rapport à son indice de référence
            dans la durée (parfois mesuré par un indicateur appelé « active share ») : plus cet
            écart est faible, moins les frais facturés se justifient.
          </p>
          <h3>Faut-il tout mettre en ETF et ne jamais toucher à la gestion active ?</h3>
          <p>
            Non, ce serait retomber dans la caricature inverse de celle que cet article dénonce en
            introduction. Le cœur actions d'un portefeuille retraite gagne, dans la plupart des
            cas, à être construit autour d'ETF à bas coût. Mais certaines poches — l'obligataire en
            particulier, ou une allocation ponctuelle vers un fonds de conviction sélectionné avec
            exigence — peuvent justifier un recours ciblé à la gestion active, sans que cela
            contredise le constat général sur le cœur du portefeuille.
          </p>
          <h3>Comment vérifier si un fonds actif justifie vraiment ses frais ?</h3>
          <p>
            En comparant sa performance nette de frais à celle de son indice de référence sur
            plusieurs cycles de marché (au moins cinq à dix ans), pas sur une seule bonne année, et
            en vérifiant que le fonds s'écarte réellement de son indice plutôt que de le suivre de
            près pour le prix d'une vraie sélection. Le document d'informations clés (DIC) du fonds
            et son prospectus indiquent l'indice de référence retenu et les frais courants
            réellement prélevés.
          </p>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle. Les
              ordres de grandeur de frais et de composition d'indices cités sont ceux observés en{" "}
              {HYPOTHESES_MAJ} et doivent être vérifiés support par support avant toute décision ;
              les performances passées, y compris celles des fonds actifs évoqués, ne préjugent
              pas des performances futures.
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
