import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { FISCALITE, HYPOTHESES_MAJ, RENDEMENTS, pct } from "../components/hypotheses.js";

export default function GuideInconvenientsPea() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Transparence sur l'enveloppe</span>
          <h1>Les inconvénients du PEA — et pourquoi il reste central dans une stratégie retraite</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le PEA cumule six limites réelles — plafond de
              versements, clôture du plan en cas de retrait avant {FISCALITE.peaExonerationIRApres}{" "}
              ans, univers restreint aux actions européennes, clôture automatique et absence
              d'abattement successoral au décès, frais variables selon l'établissement, et une
              discipline de gestion qui ne va pas de soi. Aucune de ces limites n'est rédhibitoire
              une fois connue et anticipée, et c'est précisément la raison pour laquelle le PEA
              demeure, malgré elles, l'une des enveloppes les plus efficaces pour préparer des
              revenus de retraite consommés par son titulaire.
            </p>
          </div>
          <p>
            Le PEA (plan d'épargne en actions) revient constamment dans nos recommandations pour
            préparer la retraite. Cela ne dispense pas de nommer ses limites. Une enveloppe fiscale
            n'est jamais parfaite : elle fait des compromis, et les comprendre est la condition pour
            l'utiliser correctement plutôt que de la découvrir à ses dépens. Voici, sans détour, les
            six inconvénients réels du PEA — et la façon dont chacun se gère.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#plafond">Un plafond de versements strict</a></li>
              <li><a href="#cinq-ans">Avant 5 ans, un retrait clôture le plan</a></li>
              <li><a href="#univers">Un univers d'investissement restreint</a></li>
              <li><a href="#deces">Le sort au décès : une enveloppe qui ne transmet pas</a></li>
              <li><a href="#frais">Des frais qui varient fortement selon l'établissement</a></li>
              <li><a href="#discipline">La discipline requise : l'enveloppe n'est pas la stratégie</a></li>
              <li><a href="#tableau">Le tableau de synthèse des six inconvénients</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Malgré tout cela, pourquoi le PEA reste central</a></li>
            </ol>
          </div>

          <h2 id="plafond">Un plafond de versements strict</h2>
          <p>
            Le PEA est plafonné à 150 000 € de versements par personne (plafond légal en vigueur en{" "}
            {HYPOTHESES_MAJ}). Un couple peut donc verser jusqu'à 300 000 € en ouvrant chacun son
            propre plan. Point important à comprendre : ce plafond porte sur les versements, pas sur
            la valeur du plan. Les gains accumulés par les placements logés dans le PEA peuvent
            dépasser ce montant sans aucune limite — seul l'argent que vous y injectez est compté.
            Un PEA ouvert tôt et alimenté jusqu'au plafond peut donc valoir, des années plus tard,
            largement plus que 150 000 € grâce à la performance des supports détenus, qui reste par
            nature non garantie. Les épargnants qui souhaitent aller plus loin peuvent ouvrir en
            complément un PEA-PME, dédié aux petites et moyennes entreprises, qui dispose de son
            propre plafond distinct.
          </p>

          <h2 id="cinq-ans">Avant 5 ans, un retrait clôture le plan</h2>
          <p>
            Deuxième contrainte : effectuer un retrait avant les {FISCALITE.peaExonerationIRApres}{" "}
            ans du plan entraîne, sauf exceptions légales (licenciement, invalidité ou mise à la
            retraite anticipée du titulaire, notamment), la clôture pure et simple du PEA et la
            perte de l'avantage fiscal attaché à l'ancienneté. La parade est connue et simple à
            mettre en œuvre : « prendre date » le plus tôt possible, c'est-à-dire ouvrir le plan dès
            que la situation le permet, même avec un versement modeste, pour faire courir ce délai
            de {FISCALITE.peaExonerationIRApres} ans pendant qu'on a le temps devant soi. Une fois ce
            cap franchi, les retraits n'entraînent plus la fermeture du plan.
          </p>

          <h2 id="univers">Un univers d'investissement restreint</h2>
          <p>
            Le PEA n'accueille que des actions européennes et des fonds éligibles à ce cadre. Il n'y
            a pas de fonds en euros logeable dans un PEA, pas de poche obligataire sécurisée, pas de
            support à capital garanti : un PEA est exposé aux actions par nature, du premier au
            dernier euro. Contrairement à une assurance-vie, il n'existe aucune façon d'y sécuriser
            une partie de l'épargne à l'approche d'un besoin de liquidité : soit l'argent reste
            investi en actions, soit il en sort.
          </p>
          <p>
            Cela signifie qu'un PEA peut traverser des phases de baisse marquée : les grands indices
            actions européens et mondiaux ont déjà connu, à plusieurs reprises au cours de leur
            histoire, des replis de grande ampleur — pouvant représenter plusieurs dizaines de
            pourcents de la valeur du portefeuille — avant de se redresser sur la durée. Ce n'est pas
            une prédiction, mais un ordre de grandeur qu'il ne faut jamais perdre de vue en y logeant
            son épargne : les rendements moyens de long terme évoqués plus haut pour les supports
            actions ({pct(RENDEMENTS.ucActionsLongTerme.min)} à {pct(RENDEMENTS.ucActionsLongTerme.max)}{" "}
            par an sur {RENDEMENTS.ucActionsLongTerme.periode}) s'obtiennent en acceptant de traverser
            ce type d'épisode sans céder à la panique. Un PEA détenu sur un horizon court, ou destiné
            à financer un besoin daté avec précision, expose donc à un risque de devoir vendre au
            mauvais moment. Les performances passées ne préjugent en rien des performances futures :
            ce rappel vaut à chaque fois qu'un rendement ou une évolution de marché est mentionné
            dans cet article.
          </p>
          <p>
            Une conséquence pratique de cette restriction géographique : les indices mondiaux ou
            américains (type S&amp;P 500 ou MSCI World) ne sont pas directement éligibles au PEA,
            faute d'être composés d'actions européennes. Ils n'y sont accessibles qu'au travers
            d'ETF à réplication synthétique — des fonds cotés qui cherchent à reproduire la
            performance d'un indice sans en détenir les titres. Concrètement, le fonds détient un
            panier d'actions européennes (ce qui respecte la règle d'éligibilité du PEA) et échange
            sa performance, par un contrat conclu avec une contrepartie financière, contre celle de
            l'indice visé. Le mécanisme fonctionne, mais il mérite un point d'attention : il expose à
            un risque de contrepartie (la solidité de l'établissement avec lequel le contrat
            d'échange est conclu) et repose sur une tolérance réglementaire que les textes encadrant
            le PEA n'ont pas conçue à l'origine pour cet usage. Ni alarmisme ni naïveté ne sont de
            mise ici : c'est un point technique à connaître avant de construire toute une stratégie
            sur ce type de support.
          </p>

          <h2 id="deces">Le sort au décès : une enveloppe qui ne transmet pas</h2>
          <p>
            C'est la limite la plus structurante du PEA, et la moins connue. Au décès du titulaire,
            le plan est automatiquement clôturé — il ne peut ni continuer, ni être transféré au nom
            d'un héritier. Les prélèvements sociaux restent exigibles sur l'ensemble des plus-values
            accumulées depuis l'origine du plan, au taux applicable au PEA, soit{" "}
            {pct(FISCALITE.prelevementsSociaux.pea)} depuis la hausse introduite par la LFSS 2026
            (barème en vigueur en {HYPOTHESES_MAJ}). Les titres qu'il contenait rejoignent ensuite le
            compte-titres ordinaire du défunt et entrent dans la masse successorale au même titre que
            n'importe quel autre actif, sans bénéficier d'un abattement propre à l'enveloppe — à la
            différence de l'assurance-vie ou du PER assurantiel.
          </p>
          <p>
            Notre analyse : le PEA se consomme du vivant de son titulaire, il ne transmet pas. C'est
            une caractéristique à intégrer dans la construction de la stratégie, pas une anomalie à
            corriger — cela oriente simplement l'ordre dans lequel on utilise ses enveloppes à la
            retraite. Le comparatif{" "}
            <a href="/guide/pea-ou-per-pour-la-retraite">PEA ou PER pour la retraite</a> détaille
            cette différence de vocation.
          </p>

          <h2 id="frais">Des frais qui varient fortement selon l'établissement</h2>
          <p>
            Les frais de tenue de compte, de courtage et d'arbitrage d'un PEA ne sont pas fixés par
            la loi : ils dépendent entièrement de l'établissement choisi, et les écarts constatés
            d'un acteur à l'autre peuvent peser significativement sur la performance nette sur le
            long terme, surtout cumulés sur les dix ou vingt ans que suppose une stratégie retraite.
            Le PEA lui-même ne coûte rien de plus qu'un autre support ; c'est l'endroit où on
            l'ouvre qui fait la différence. Notre guide{" "}
            <a href="/guide/pea-banque-ou-courtier">PEA banque ou courtier</a> détaille ces écarts et
            les critères à comparer avant d'ouvrir un plan.
          </p>

          <h2 id="discipline">La discipline requise : l'enveloppe n'est pas la stratégie</h2>
          <p>
            Dernier point, souvent sous-estimé : le PEA est un contenant fiscal, pas une méthode de
            gestion. L'avantage fiscal qu'il procure après {FISCALITE.peaExonerationIRApres} ans ne
            corrige ni une allocation mal diversifiée, ni un comportement qui consiste à revendre au
            pire moment lors d'une baisse de marché. Un PEA rempli de quelques lignes concentrées, ou
            vidé sous le coup de la panique pendant une correction, produira un résultat décevant
            malgré une fiscalité favorable. La discipline — diversifier les supports, tenir sa
            position dans les phases de baisse, ne pas chercher à deviner le point d'entrée idéal —
            reste la condition de l'efficacité de l'enveloppe, pas une option annexe. Une enveloppe
            fiscale avantageuse appliquée à une gestion approximative ne produit pas un bon résultat
            approximatif : elle produit, la plupart du temps, un résultat décevant à fiscalité
            allégée.
          </p>

          <h2 id="tableau">Le tableau de synthèse des six inconvénients</h2>
          <p>
            Pour une vue d'ensemble rapide, voici les six limites détaillées plus haut, avec leur
            impact concret et la parade à connaître pour chacune.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Inconvénient</th>
                  <th>Impact</th>
                  <th>Parade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Plafond de versements strict</td>
                  <td>150 000 € par personne, au-delà impossible de continuer à verser sur ce PEA</td>
                  <td>Ouvrir un PEA-PME en complément, ou un second PEA au nom du conjoint</td>
                </tr>
                <tr>
                  <td>Clôture en cas de retrait avant {FISCALITE.peaExonerationIRApres} ans</td>
                  <td>Perte de l'avantage fiscal attaché à l'ancienneté, sauf exceptions légales</td>
                  <td>« Prendre date » tôt : ouvrir le plan dès que possible, même avec un petit versement</td>
                </tr>
                <tr>
                  <td>Univers d'investissement restreint</td>
                  <td>Exposition aux seules actions européennes, aucune poche sécurisée possible</td>
                  <td>Compléter avec une assurance-vie ou un PER pour la partie prudente de l'épargne</td>
                </tr>
                <tr>
                  <td>Clôture automatique au décès</td>
                  <td>Le plan ne se transmet pas ; les titres rejoignent la succession sans abattement propre</td>
                  <td>Articuler le PEA avec une assurance-vie ou un PER pour la stratégie de transmission</td>
                </tr>
                <tr>
                  <td>Frais variables selon l'établissement</td>
                  <td>Écarts significatifs sur la performance nette, cumulés sur dix ou vingt ans</td>
                  <td>Comparer les grilles tarifaires avant l'ouverture (voir notre guide banque ou courtier)</td>
                </tr>
                <tr>
                  <td>Discipline de gestion exigeante</td>
                  <td>Une allocation mal diversifiée ou des retraits paniques en baisse annulent l'avantage fiscal</td>
                  <td>Diversifier les supports, tenir sa position en phase de baisse, être accompagné en cas de doute</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Puis-je éviter la clôture du PEA au décès du titulaire ?</h3>
          <p>
            Non : la clôture au décès est une règle légale attachée à l'enveloppe elle-même, pas une
            option contractuelle sur laquelle on pourrait revenir. Ce qui se prépare, en revanche,
            c'est la stratégie autour de cette règle — par exemple en équilibrant le PEA avec une
            assurance-vie ou un PER, enveloppes qui offrent chacune un traitement successoral plus
            favorable, pour que la transmission ne repose pas sur le PEA.
          </p>
          <h3>Le PEA-PME présente-t-il les mêmes inconvénients que le PEA classique ?</h3>
          <p>
            Oui, pour l'essentiel : même contrainte de durée de {FISCALITE.peaExonerationIRApres}{" "}
            ans avant retrait sans clôture, même sort au décès, même exposition aux seules actions
            (ici des petites et moyennes entreprises européennes, par nature plus volatiles que les
            grandes capitalisations). Son plafond de versements est distinct de celui du PEA
            classique, ce qui permet de les cumuler, mais il n'échappe à aucune des autres limites
            décrites dans cet article.
          </p>
          <h3>Que deviennent les titres d'un PEA après la clôture au décès ?</h3>
          <p>
            Ils rejoignent le compte-titres ordinaire du défunt et entrent dans la masse successorale
            au même titre que n'importe quel autre actif financier, sans abattement propre à
            l'enveloppe. Les héritiers reçoivent des titres en compte-titres ordinaire, pas un PEA
            qu'ils pourraient continuer à faire fructifier sous ce régime.
          </p>
          <h3>Un retrait après {FISCALITE.peaExonerationIRApres} ans a-t-il des conséquences sur le plan ?</h3>
          <p>
            Non : une fois ce cap franchi, les retraits, partiels ou totaux, n'entraînent plus la
            fermeture du plan et ne sont plus soumis à l'impôt sur le revenu sur la part de gains
            retirée — seuls les prélèvements sociaux restent dus. C'est précisément ce qui rend le
            PEA flexible une fois l'ancienneté acquise.
          </p>
          <h3>Le plafond de versements inclut-il les gains accumulés ?</h3>
          <p>
            Non : le plafond de 150 000 € porte uniquement sur les sommes versées, pas sur la valeur
            atteinte par le plan. Un PEA alimenté jusqu'au plafond peut valoir, des années plus tard,
            bien davantage grâce à la performance des supports détenus — performance qui reste par
            nature non garantie.
          </p>
          <h3>Faut-il renoncer au PEA à cause de ces inconvénients ?</h3>
          <p>
            Pas dans le cas général. Chacune de ces limites se gère une fois connue : elles
            n'empêchent pas le PEA de rester, pour la plupart des épargnants, l'enveloppe la plus
            efficace pour se constituer des revenus de retraite consommés de son vivant. La bonne
            question n'est pas « faut-il un PEA », mais « comment l'articuler avec les autres
            enveloppes » pour compenser ce qu'il ne fait pas — transmettre notamment.
          </p>
          <h3>Le risque de perte en capital du PEA est-il différent de celui d'un compte-titres ordinaire ?</h3>
          <p>
            Non, le risque de marché est identique à exposition égale : le PEA est une enveloppe
            fiscale, pas un mécanisme de protection du capital. Sa seule différence avec un
            compte-titres ordinaire porte sur la fiscalité et l'éligibilité des titres, pas sur le
            niveau de risque des placements qu'il contient.
          </p>

          <h2 id="synthese">Malgré tout cela, pourquoi le PEA reste central</h2>
          <p>
            Ces six limites sont réelles, et il serait malhonnête de les minimiser. Elles n'empêchent
            pourtant pas notre analyse d'aboutir à une conclusion claire : pour se constituer des
            revenus de retraite destinés à être consommés par son titulaire, le PEA demeure
            l'enveloppe la plus efficace dans le cas général. Deux raisons à cela, qui découlent
            directement des règles décrites plus haut : l'exonération d'impôt sur le revenu sur les
            gains retirés après {FISCALITE.peaExonerationIRApres} ans, et la liberté totale des
            retraits une fois ce cap franchi, qui n'entraînent alors ni fermeture du plan ni
            imposition supplémentaire au titre de l'impôt sur le revenu. Un PEA ouvert tôt, alimenté
            avec régularité et conservé sans y toucher pendant la vie active devient, à la retraite,
            une source de revenus complémentaires particulièrement souple à activer. Notre page{" "}
            <a href="/strategies/pea-retraite">le PEA comme outil retraite</a> détaille cette
            mécanique, et le comparatif{" "}
            <a href="/guide/meilleure-enveloppe-retraite">quelle est la meilleure enveloppe pour la
            retraite ?</a> replace le PEA dans l'ensemble des solutions disponibles.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle. Les
              montants, plafonds et taux cités sont les barèmes en vigueur en {HYPOTHESES_MAJ},
              susceptibles d'évoluer à chaque loi de finances ; les éléments de marché mentionnés
              sont des constats passés datés, et les performances passées ne préjugent pas des
              performances futures.
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
