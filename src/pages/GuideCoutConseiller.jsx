import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { CONSEIL, HYPOTHESES_MAJ, euros, pct } from "../components/hypotheses.js";

export default function GuideCoutConseiller() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">La question qu'on esquive rarement ici</span>
          <h1>Combien coûte un conseiller en gestion de patrimoine ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> un conseiller en gestion de patrimoine se rémunère
              par rétrocessions (une part des frais du produit souscrit, de l'ordre de{" "}
              {pct(CONSEIL.retrocessionAnnuelleTypique.min)} à{" "}
              {pct(CONSEIL.retrocessionAnnuelleTypique.max)} par an sur l'encours), par
              honoraires (souvent de {euros(CONSEIL.honorairesBilanPatrimonial.min)} à{" "}
              {euros(CONSEIL.honorairesBilanPatrimonial.max)} pour un bilan patrimonial), ou par
              un mélange des deux — données {HYPOTHESES_MAJ}, à vérifier auprès de chaque
              cabinet. Aucun modèle n'est en soi plus vertueux : ce qui doit vous alerter, c'est
              l'absence de réponse claire à la question « combien touchez-vous exactement ? ».
            </p>
          </div>

          <p>
            C'est une question légitime, posée par presque tous nos clients au premier
            rendez-vous, et à laquelle il est rarement répondu clairement. Non pas qu'elle soit
            compliquée à traiter : c'est simplement que la rémunération du conseil est le sujet
            que la profession préfère éviter. Trois modèles coexistent, chacun avec ses propres
            conflits d'intérêts — y compris celui qui semble le plus vertueux sur le papier. Notre
            parti pris : les nommer honnêtement, plutôt que d'en cacher un pour mieux vendre les
            deux autres.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#modeles">Les trois modèles de rémunération, expliqués simplement</a></li>
              <li><a href="#retrocessions">Les rétrocessions : le coût invisible dans les produits</a></li>
              <li><a href="#honoraires">Les honoraires : plus lisibles, pas plus vertueux</a></li>
              <li><a href="#mixte">Le modèle mixte : la transparence plutôt que le dogme</a></li>
              <li><a href="#comparatif">Le comparatif des trois modèles</a></li>
              <li><a href="#bancaire">Le conseiller bancaire n'est pas un CGP</a></li>
              <li><a href="#valeur">Ce que vaut un bon conseil</a></li>
              <li><a href="#questions">Les 5 questions à poser avant de signer</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="modeles">Les trois modèles de rémunération, expliqués simplement</h2>
          <p>
            Un conseiller en gestion de patrimoine (CGP) ne travaille jamais gratuitement — la
            question n'est donc pas « est-ce que je paie ? » mais « comment, et à travers quoi ? ».
            Trois modèles se rencontrent sur le marché français, parfois combinés au sein d'un
            même cabinet : les rétrocessions, les honoraires, et un mélange des deux. Aucun n'est
            en soi vertueux ou condamnable ; chacun déplace simplement l'endroit où se loge le
            conflit d'intérêts. Le détailler n'est pas un exercice de transparence gratuite : c'est
            un préalable pour poser les bonnes questions, ce que nous verrons plus bas.
          </p>

          <h2 id="retrocessions">Les rétrocessions : le coût invisible dans les produits</h2>
          <p>
            Une rétrocession, c'est la part des frais d'un produit financier (assurance-vie, PER,
            fonds, produit structuré) que son fournisseur — assureur, société de gestion,
            promoteur — reverse au conseiller qui l'a fait souscrire. Concrètement, le client ne
            règle aucune facture séparée : les frais sont déjà intégrés dans le contrat, et une
            partie en repart vers le conseiller. C'est le modèle le plus répandu en France, et il
            explique une phrase qu'on entend souvent : « mon conseiller ne me coûte rien ». Elle
            est fausse. Le coût existe ; il est simplement logé dans les frais du produit plutôt
            que sur une facture à part. Sur une assurance-vie ou un PER, cette rétrocession
            annuelle se situe en ordre de grandeur entre{" "}
            {pct(CONSEIL.retrocessionAnnuelleTypique.min)} et{" "}
            {pct(CONSEIL.retrocessionAnnuelleTypique.max)} de l'encours géré par an — {CONSEIL.source}.
            Ce taux s'ajoute aux autres frais du contrat déjà détaillés dans notre guide{" "}
            <a href="/guide/combien-coute-une-assurance-vie">combien coûte une assurance-vie</a>,
            il ne s'y substitue pas.
          </p>
          <p>
            Le conflit d'intérêts qui en découle est évident et nous le disons sans détour :
            un conseiller rémunéré par rétrocessions peut être tenté de privilégier les produits
            qui le rémunèrent le mieux, plutôt que ceux qui servent le mieux l'intérêt du client.
            Ce risque ne se neutralise pas en le passant sous silence ; il se gère par la
            transparence sur ce que le conseiller touche exactement — nous y revenons dans la
            check-list plus bas — et par l'obligation réglementaire d'information sur les frais
            (document d'informations clés, ou DIC, remis avant toute souscription), qui doit
            permettre au client de les identifier.
          </p>

          <h2 id="honoraires">Les honoraires : plus lisibles, pas plus vertueux</h2>
          <p>
            Le second modèle facture le conseil directement, au forfait ou au temps passé,
            indépendamment des produits souscrits ensuite. C'est un modèle plus lisible : la
            facture est explicite, elle ne se déduit pas des frais d'un contrat. Un conseiller
            rémunéré exclusivement en conseiller en investissements financiers (CIF — statut
            réglementé qui encadre l'activité de conseil sur les produits financiers) au forfait
            d'honoraires n'a, en théorie, aucun intérêt direct à recommander un produit plutôt
            qu'un autre. En ordre de grandeur, un bilan patrimonial facturé à l'acte se situe
            entre {euros(CONSEIL.honorairesBilanPatrimonial.min)} et{" "}
            {euros(CONSEIL.honorairesBilanPatrimonial.max)} selon la complexité du dossier et le
            cabinet — {CONSEIL.source} ; un suivi annuel, quand il est facturé séparément, obéit
            à une logique de forfait ou de taux sur encours propre à chaque structure.
          </p>
          <p>
            Mais soyons clairs sur un point que le discours dominant du « tout honoraires, donc
            tout indépendant » a tendance à passer sous silence : les honoraires n'éliminent pas
            les conflits d'intérêts, ils en changent seulement la nature. Un conseiller facturé au
            temps passé peut être tenté d'allonger le nombre de rendez-vous ou la complexité perçue
            d'un dossier. Un forfait fixe peut, à l'inverse, inciter à minimiser le temps consacré
            à un client une fois le forfait encaissé. Payer quelqu'un directement ne garantit pas,
            à soi seul, un alignement parfait des intérêts — c'est vrai pour un conseiller en
            gestion de patrimoine comme pour n'importe quelle profession fondée sur le conseil.
            L'angélisme n'est pas plus de mise ici que pour les rétrocessions.
          </p>

          <h2 id="mixte">Le modèle mixte : la transparence plutôt que le dogme</h2>
          <p>
            De nombreux cabinets, dans les faits, combinent les deux : des honoraires sur certaines
            missions (bilan patrimonial, ingénierie de transmission) et des rétrocessions sur les
            produits mis en place ensuite. Ce n'est ni une anomalie ni un tour de passe-passe :
            c'est simplement la manière dont s'organise une partie du marché.
          </p>
          <p>
            Notre analyse rejoint ici une conviction que nous assumons pleinement : l'important
            n'est pas le modèle de rémunération en tant que tel, c'est la transparence qui
            l'accompagne. Un conseiller — quel que soit son mode de facturation — doit être capable
            de répondre avec précision à une question simple : combien touchez-vous si je souscris
            ce contrat ? S'il élude, hésite ou reste vague, le problème n'est pas le modèle qu'il
            pratique, c'est l'absence de transparence sur ce modèle. La réglementation impose
            justement cette information : le document d'informations clés de chaque produit détaille
            les frais prélevés, et le conseiller doit pouvoir préciser, en complément, ce qui lui
            en revient.
          </p>

          <h2 id="comparatif">Le comparatif des trois modèles</h2>
          <p>
            Une synthèse à garder sous les yeux avant tout premier rendez-vous — aucune colonne
            n'est « la bonne » dans l'absolu, chacune déplace simplement l'endroit où se loge le
            conflit d'intérêts.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Modèle</th>
                  <th>Comment ça marche</th>
                  <th>Ordre de grandeur</th>
                  <th>Conflit d'intérêt typique</th>
                  <th>Ce qu'il faut demander</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rétrocessions</td>
                  <td>
                    Une part des frais du produit souscrit (assurance-vie, PER, fonds) est
                    reversée au conseiller par l'assureur ou la société de gestion
                  </td>
                  <td>
                    De l'ordre de {pct(CONSEIL.retrocessionAnnuelleTypique.min)} à{" "}
                    {pct(CONSEIL.retrocessionAnnuelleTypique.max)} de l'encours par an — À VÉRIFIER
                  </td>
                  <td>Tentation de privilégier les produits les mieux rémunérés plutôt que les plus adaptés</td>
                  <td>Le détail des rétrocessions perçues sur le contrat proposé (visible dans le DIC)</td>
                </tr>
                <tr>
                  <td>Honoraires</td>
                  <td>Le conseil est facturé directement, au forfait ou au temps passé, indépendamment des produits souscrits</td>
                  <td>
                    De l'ordre de {euros(CONSEIL.honorairesBilanPatrimonial.min)} à{" "}
                    {euros(CONSEIL.honorairesBilanPatrimonial.max)} pour un bilan patrimonial — À VÉRIFIER
                  </td>
                  <td>Tentation d'allonger le temps facturé, ou à l'inverse de minimiser le suivi une fois le forfait encaissé</td>
                  <td>Le périmètre exact couvert par le forfait, et ce qui est facturé en plus</td>
                </tr>
                <tr>
                  <td>Modèle mixte</td>
                  <td>Honoraires sur certaines missions (bilan, ingénierie) combinés à des rétrocessions sur les produits mis en place ensuite</td>
                  <td>Combinaison des deux fourchettes ci-dessus, dans des proportions propres à chaque cabinet — À VÉRIFIER</td>
                  <td>Les deux conflits précédents peuvent coexister si la répartition n'est pas explicite</td>
                  <td>La part exacte d'honoraires et de rétrocessions sur votre dossier précis</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Ces ordres de grandeur sont des repères de marché, {CONSEIL.source}, à vérifier
            auprès de chaque cabinet et à ne jamais présumer sans confirmation écrite.
          </p>

          <h2 id="bancaire">Le conseiller bancaire n'est pas un CGP</h2>
          <p>
            Une confusion fréquente mérite d'être clarifiée, sans procès d'intention : le
            conseiller de votre agence bancaire n'est pas un conseiller en gestion de patrimoine
            indépendant. C'est un salarié de son établissement, souvent soumis à des objectifs
            commerciaux définis par sa direction, et qui ne peut distribuer que la gamme de
            produits — contrats d'assurance-vie, fonds, PER — proposée par sa propre banque ou son
            propre groupe. Ce n'est pas une critique de la personne ni de la compétence : c'est une
            description factuelle du cadre dans lequel elle exerce, structurellement plus étroit
            que celui d'un cabinet ayant accès à plusieurs partenaires.
          </p>
          <p>
            Cette différence de cadre a une conséquence directe sur le conseil : un interlocuteur
            qui ne peut proposer qu'une gamme fermée ne peut, par construction, comparer cette
            gamme à ce qui existe ailleurs sur le marché. Cela ne rend pas systématiquement le
            produit inadapté — mais cela justifie de poser les mêmes questions de rémunération et
            de périmètre qu'à n'importe quel conseiller, bancaire ou indépendant.
          </p>

          <h2 id="valeur">Ce que vaut un bon conseil</h2>
          <p>
            Il existe un discours inverse, tout aussi réducteur que celui du conseil gratuit :
            l'idée que tout conseil facturé serait par nature une mauvaise affaire face au
            bricolage en autonomie. Notre analyse s'y oppose aussi fermement qu'à l'angélisme
            évoqué plus haut. Les frais d'un accompagnement ne se jugent jamais dans l'absolu ; ils
            se jugent face à la valeur nette qu'ils permettent d'obtenir.
          </p>
          <p>
            Cette valeur se loge à trois endroits. D'abord la gestion du risque : un bon conseil
            vise autant à limiter les pertes dans les phases difficiles qu'à maximiser les gains
            dans les phases favorables. Ensuite la tenue émotionnelle dans les baisses de marché :
            un investisseur seul qui cède à la panique et vend au plus bas peut détruire, en une
            décision, davantage de valeur que dix années d'honoraires cumulés — c'est précisément
            ce que le conseil doit prévenir. Enfin l'ingénierie patrimoniale : le choix des
            enveloppes fiscales, la rédaction d'une clause bénéficiaire d'assurance-vie adaptée à
            la situation familiale, ou l'anticipation d'une transmission ne s'improvisent pas seul
            et engagent des conséquences sur plusieurs décennies. Un bon conseiller ne coûte pas ;
            il rapporte, dans la mesure où ce qu'il apporte dépasse ce qu'il facture — et cette
            mesure, précisément, dépend de chaque situation, jamais d'une moyenne de marché.
          </p>
          <div className="note">
            <p>
              Cette analyse ne signifie pas que tous les frais se valent, ni que le montant payé
              est indifférent : un cabinet incapable d'expliquer sa rémunération, ou dont le
              conseil se limite à la vente d'un produit sans stratégie globale derrière, ne mérite
              pas ces frais. La différence ne tient pas au modèle de rémunération, mais à la
              qualité et à la transparence du conseil qui l'accompagne.
            </p>
          </div>

          <h2 id="questions">Les 5 questions à poser avant de signer</h2>
          <p>
            Ces questions ne sont pas un interrogatoire : elles font partie des obligations
            réglementaires d'information de tout conseiller, et un professionnel sérieux s'attend
            à ce qu'on les lui pose.
          </p>
          <ol>
            <li>
              <strong>Comment êtes-vous rémunéré, exactement ?</strong> Par rétrocessions, par
              honoraires, ou par un mélange des deux — et dans quelles proportions sur votre
              dossier précis.
            </li>
            <li>
              <strong>Les rétrocessions sont-elles incluses, et sur quels produits ?</strong> Si
              oui, à combien s'élèvent-elles sur le contrat qui vous est proposé — l'information
              figure dans le document d'informations clés du produit.
            </li>
            <li>
              <strong>Êtes-vous indépendant au sens réglementaire, ou non ?</strong> Le statut de
              CIF, le nombre de partenaires avec lesquels le cabinet travaille et l'éventuelle
              appartenance à un réseau bancaire ou assurantiel conditionnent l'étendue réelle des
              produits pouvant vous être proposés.
            </li>
            <li>
              <strong>Qu'est-ce qui est précisément compris dans vos honoraires ?</strong> Un
              bilan patrimonial ponctuel, un suivi annuel, un accompagnement illimité — les
              périmètres varient fortement d'un cabinet à l'autre et doivent être écrits noir sur
              blanc.
            </li>
            <li>
              <strong>Quel suivi assurez-vous une fois le contrat signé ?</strong> Fréquence des
              points de situation, réactivité en cas de changement personnel ou de marché
              défavorable, et ce qui est inclus ou facturé en plus à ce stade.
            </li>
          </ol>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Un conseiller rémunéré par rétrocessions coûte-t-il plus cher qu'un conseiller à honoraires ?</h3>
          <p>
            Pas nécessairement : dans le modèle par rétrocessions, le coût est intégré aux frais
            du produit plutôt que facturé à part, ce qui rend la comparaison directe difficile.
            Le seul moyen de comparer réellement les deux, c'est de demander le montant exact des
            rétrocessions perçues sur le contrat proposé et de le mettre en face d'un devis
            d'honoraires équivalent.
          </p>
          <h3>Le conseil est-il gratuit si mon conseiller ne me facture rien directement ?</h3>
          <p>
            Non. Si aucune facture ne vous est adressée, c'est presque toujours parce que le
            conseiller est rémunéré par rétrocessions, prélevées sur les frais du produit que
            vous payez indirectement. Le coût existe, il est simplement moins visible.
          </p>
          <h3>Peut-on négocier les honoraires d'un bilan patrimonial ?</h3>
          <p>
            Cela dépend des cabinets : certains pratiquent un tarif fixe, d'autres ajustent selon
            la complexité du dossier ou la relation dans la durée. Rien n'empêche de demander un
            devis détaillé avant de s'engager, comme pour toute prestation de conseil.
          </p>
          <h3>Un CIF peut-il être rémunéré par rétrocessions ?</h3>
          <p>
            Oui, le statut de conseiller en investissements financiers (CIF) n'impose pas un
            modèle de rémunération unique : un CIF peut percevoir des rétrocessions, des
            honoraires, ou combiner les deux, sous réserve de respecter ses obligations
            d'information et d'agir dans l'intérêt du client.
          </p>
          <h3>Comment vérifier ce qu'un conseiller touche réellement sur mon contrat ?</h3>
          <p>
            Le document d'informations clés (DIC) remis avant toute souscription détaille les
            frais du produit, dont une partie peut revenir au distributeur. Le conseiller doit
            par ailleurs pouvoir préciser, sur demande, le montant ou le taux qui lui revient
            personnellement sur le contrat proposé.
          </p>
          <h3>Faut-il se méfier d'un conseiller qui refuse de détailler sa rémunération ?</h3>
          <p>
            Oui. La rémunération, quel que soit le modèle, fait partie des informations qu'un
            professionnel sérieux communique sans détour. Une réponse évasive ou éludée est un
            signal d'alerte plus fiable que le modèle de rémunération lui-même.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Rétrocessions, honoraires ou modèle mixte : aucun de ces trois modes de rémunération
            n'est, en soi, un gage de qualité ou un motif d'écarter un conseiller. Ce qui doit
            réellement vous alerter, c'est l'absence de réponse claire à ces cinq questions — pas
            le modèle lui-même. Ces mêmes questions, nous vous invitons à nous les poser
            directement : c'est précisément l'objet d'un premier échange, sans engagement, où nous
            détaillons notre mode de fonctionnement avant toute recommandation.
          </p>
          <p>
            Pour aller plus loin sur des sujets connexes, nos guides détaillent{" "}
            <a href="/guide/combien-coute-une-assurance-vie">combien coûte une assurance-vie</a>{" "}
            poste par poste, expliquent{" "}
            <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">pourquoi une assurance-vie
            peut rapporter peu</a>, et vous aident à identifier{" "}
            <a href="/guide/quel-est-le-meilleur-per">quel est le meilleur PER</a> selon votre
            situation.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle. Les
              obligations d'information mentionnées (document d'informations clés, statut de CIF)
              sont des cadres réglementaires génériques ; les conditions précises d'un contrat ou
              d'un mandat de conseil doivent toujours être vérifiées auprès du professionnel
              concerné avant toute décision.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Cette transparence, vivez-la dès le premier échange."
        button="Bilan retraite gratuit (15 min)"
        to="/bilan-retraite"
      />
    </>
  );
}
