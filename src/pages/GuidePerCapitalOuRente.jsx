import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { DECUMULATION, FISCALITE, SIMU_DEFAUTS, SORTIE_PER, euros, pct } from "../components/hypotheses.js";

export default function GuidePerCapitalOuRente() {
  const d = DECUMULATION;
  const s = SORTIE_PER;
  const capital = SIMU_DEFAUTS.capitalDecumulation;
  const age = s.ageDepartIllustratif;
  const taux = [d.tauxConversionRente65.min, d.tauxConversionRente65.defaut, d.tauxConversionRente65.max];
  const lignes = taux.map((t) => {
    const renteAnnuelle = (capital * t) / 100;
    const anneesRecuperation = 100 / t;
    return { t, renteAnnuelle, anneesRecuperation, ageRecuperation: age + anneesRecuperation };
  });
  const ageHommes = age + d.esperanceVie65.hommes;
  const ageFemmes = age + d.esperanceVie65.femmes;

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Notre avis — décision de sortie du PER</span>
          <h1>Sortir son PER en capital ou en rente : notre avis tranché</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> notre position de principe est qu'il ne faut ni tout
              sortir en capital, ni tout convertir en rente. La rente a une vraie utilité — couvrir
              à vie un socle de dépenses que les pensions ne couvrent pas — mais elle est
              irréversible, mal indexée en général, et son « prix » (un taux de conversion de
              l'ordre de {d.tauxConversionRente65.min} % à {d.tauxConversionRente65.max} % du
              capital par an à {age} ans) vous fait récupérer votre capital en {Math.round(100 / d.tauxConversionRente65.max)} à {Math.round(100 / d.tauxConversionRente65.min)} ans, sans
              rendement. Le capital, lui, reste souple, transmissible et fractionnable, mais il
              vous laisse seul face au risque de longévité et à la tentation de dépenser. D'où
              l'approche que nous défendons : calculer d'abord le « trou » entre vos pensions et vos
              dépenses incompressibles, ne rentiser que ce qu'il faut pour le combler, et sortir le
              reste en capital, de façon fractionnée. Ce guide est un cadre de décision générique,
              pas un conseil personnalisé.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#ce-qui-est-possible">Ce que vous avez réellement le droit de choisir</a></li>
              <li><a href="#fiscalite">La fiscalité de chaque option (et ce qui change selon que vous avez déduit ou non)</a></li>
              <li><a href="#prix-rente">Le prix réel d'une rente : combien d'années pour récupérer son capital ?</a></li>
              <li><a href="#notre-avis">Notre avis : pourquoi le « tout capital » et le « tout rente » sont rarement les bons choix</a></li>
              <li><a href="#profils">Quatre profils-types et la pente naturelle de chacun</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#a-faire">Comment préparer la décision</a></li>
            </ol>
          </div>

          <h2 id="ce-qui-est-possible">Ce que vous avez réellement le droit de choisir</h2>
          <p>
            À l'âge de la retraite (ou à l'âge légal d'ouverture des droits), l'épargne d'un PER peut
            en principe être récupérée en capital, en rente viagère, ou en un mélange des deux, le
            capital pouvant lui-même être versé en une fois ou en plusieurs fois (source :
            service-public.gouv.fr). Trois restrictions à connaître avant de raisonner sur le « bon »
            choix :
          </p>
          <ul>
            <li>
              <strong>Les versements obligatoires de l'employeur</strong> (compartiment « PER
              obligatoire », ex-article 83) ne sortent en principe qu'en rente, sauf si la rente
              mensuelle serait inférieure à {euros(s.seuilConversionRenteObligatoireMensuel)} :
              dans ce cas, un versement en capital est possible. Pour une transformation d'un ancien
              contrat, voir notre guide sur le{" "}
              <a href="/guide/transfert-per-article-83">transfert d'un article 83 vers un PER</a>.
            </li>
            <li>
              <strong>Un contrat qui impose la rente</strong> : certains contrats prévoient une
              option irrévocable en faveur de la rente dès l'ouverture. Relisez vos conditions
              générales.
            </li>
            <li>
              <strong>Une fois la rente liquidée, c'est définitif</strong> : on ne revient pas en
              arrière, contrairement à un capital dont on peut retirer une partie seulement.
            </li>
          </ul>

          <h2 id="fiscalite">La fiscalité de chaque option</h2>
          <p>
            Tout dépend d'une question posée il y a des années : avez-vous déduit vos versements de
            votre revenu imposable à l'entrée ? Le régime est différent dans les deux cas
            (service-public.gouv.fr, fiche mise à jour en juin 2026).
          </p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Versements déduits</th>
                <th>Versements non déduits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Sortie en capital</strong></td>
                <td>
                  Les versements sont imposés au barème de l'impôt sur le revenu, sans l'abattement
                  de 10 % des pensions ; les gains sont soumis au prélèvement forfaitaire unique
                  ({pct(FISCALITE.pfuIR)} d'impôt + {pct(FISCALITE.prelevementsSociaux.per)} de
                  prélèvements sociaux en 2026).
                </td>
                <td>
                  Les versements ressortent sans impôt ; seuls les gains sont soumis au PFU.
                </td>
              </tr>
              <tr>
                <td><strong>Sortie en rente</strong></td>
                <td>
                  La rente est imposée comme une pension de retraite, après l'abattement de 10 %
                  (avec son plafond, voir l'encadré ci-dessous) ; des prélèvements sociaux
                  s'appliquent sur une fraction qui dépend de l'âge au premier versement.
                </td>
                <td>
                  La rente est taxée comme une rente viagère à titre onéreux : seule une fraction est
                  imposable, selon l'âge au premier versement (voir tableau ci-dessous).
                </td>
              </tr>
            </tbody>
          </table>
          <p>Fraction imposable d'une rente viagère à titre onéreux selon l'âge au premier versement :</p>
          <table>
            <thead>
              <tr><th>Âge au premier versement</th><th>Fraction imposable</th></tr>
            </thead>
            <tbody>
              {s.fractionRenteOnereuxParAge.map((l) => (
                <tr key={l.age}>
                  <td>{l.age}</td>
                  <td>{pct(l.fraction)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="note">
            <p>
              <strong>Un point à surveiller :</strong> l'abattement de 10 % sur les pensions est
              plafonné par foyer, et le projet de loi de finances pour 2027 propose de réduire ce
              plafond. Une rente de PER à versements déduits entre dans l'assiette de cet abattement,
              avec vos pensions. Le texte n'est pas voté : nous l'analysons dans{" "}
              <a href="/guide/abattement-10-pourcent-retraites-plf-2027">notre guide dédié</a>. Pour
              le détail de la mécanique d'imposition du capital et du fractionnement, voir{" "}
              <a href="/guide/fiscalite-sortie-per">la fiscalité de sortie du PER</a>.
            </p>
          </div>

          <h2 id="prix-rente">Le prix réel d'une rente : combien d'années pour récupérer son capital ?</h2>
          <p>
            Une rente viagère, c'est un échange : vous abandonnez un capital (qui disparaît, sauf
            option de réversion ou de garantie) contre un revenu versé tant que vous vivez. Le taux
            de conversion fixe le prix de cet échange. Illustration pour un capital de{" "}
            {euros(capital)} converti à {age} ans, sans option de réversion, avec l'ordre de grandeur
            des barèmes d'assureurs retenu sur ce site ({d.tauxConversionRente65.source}) :
          </p>
          <table>
            <thead>
              <tr>
                <th>Taux de conversion</th>
                <th>Rente annuelle brute</th>
                <th>Années pour « récupérer » le capital</th>
                <th>Âge atteint à ce moment-là</th>
              </tr>
            </thead>
            <tbody>
              {lignes.map((l) => (
                <tr key={l.t}>
                  <td>{pct(l.t)}</td>
                  <td>{euros(l.renteAnnuelle)}</td>
                  <td>{Math.round(l.anneesRecuperation)} ans</td>
                  <td>{Math.round(l.ageRecuperation)} ans</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Cette lecture est volontairement simple : elle ignore le rendement que le capital aurait
            pu produire s'il était resté investi (hypothèse de départ de ce site : {pct(d.rendementCapitalPendantRetraits)} pendant les retraits), l'impôt et
            l'inflation. Elle donne néanmoins un repère utile. L'espérance de vie moyenne à {age} ans
            est de l'ordre de {d.esperanceVie65.hommes} ans pour un homme et {d.esperanceVie65.femmes}{" "}
            ans pour une femme ({d.esperanceVie65.source}), soit des âges moyens d'environ{" "}
            {ageHommes} et {ageFemmes} ans. Autrement dit : en moyenne, la rente rembourse son prix
            autour de l'espérance de vie, et ne devient franchement « gagnante » qu'au-delà. Elle ne
            vaut donc pas par son rendement, mais comme <strong>assurance contre le fait de vivre
            très vieux</strong>. Si elle n'est pas indexée sur l'inflation, son pouvoir d'achat
            s'érode d'année en année — c'est le principal défaut à vérifier dans un contrat.
          </p>
          <p>
            Pour la comparaison avec des retraits programmés, nous avons un guide dédié :{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">rente viagère ou retraits programmés</a>,
            et pour les défauts de la rente en elle-même :{" "}
            <a href="/guide/inconvenients-rente-viagere">les inconvénients de la rente viagère</a>.
          </p>

          <h2 id="notre-avis">Notre avis : pourquoi le « tout capital » et le « tout rente » sont rarement les bons choix</h2>
          <p>
            Soyons directs sur ce que nous pensons, en restant dans le registre général.
          </p>
          <h3>Le « tout rente » sacrifie trop de souplesse</h3>
          <p>
            Rentiser la totalité de son PER revient à figer, à un instant T, un taux de conversion
            que vous ne pourrez jamais renégocier, à lier sa décision à l'état de santé du moment, et
            à renoncer à tout capital transmissible (sauf réversion, qui réduit encore la rente). Dans
            un système où les pensions de base et complémentaires sont déjà des rentes à vie,
            ajouter une seconde couche de rente sur la totalité de l'épargne n'est utile que si
            celle-ci sert un besoin précis.
          </p>
          <h3>Le « tout capital » expose à trois risques que l'on sous-estime</h3>
          <ul>
            <li>
              <strong>Le risque de longévité</strong> : un capital bien géré peut s'épuiser si l'on
              vit longtemps ou si les marchés déçoivent tôt dans la retraite ;
            </li>
            <li>
              <strong>Le risque fiscal</strong> : un retrait massif dans une seule année peut vous
              faire changer de tranche (voir notre guide sur la{" "}
              <a href="/guide/fiscalite-sortie-per">fiscalité de sortie</a>), alors que la rente
              lisse l'impôt dans le temps ;
            </li>
            <li>
              <strong>Le risque comportemental</strong> : un gros capital disponible se dépense plus
              facilement qu'une rente mensuelle. Ce n'est pas un jugement, c'est une régularité
              documentée en finance comportementale.
            </li>
          </ul>
          <h3>Notre position : rentiser un plancher, laisser le reste en capital</h3>
          <p>
            La logique que nous défendons tient en trois étapes, applicables à tous :
          </p>
          <ol>
            <li>
              <strong>Calculez le « trou »</strong> : vos dépenses incompressibles (logement, santé,
              alimentation, impôts) moins vos pensions nettes et autres revenus récurrents.
            </li>
            <li>
              <strong>Rentisez seulement ce qui comble ce trou</strong>, éventuellement en partie,
              avec une option d'indexation et de réversion si le conjoint en dépend — en acceptant
              que cela baisse la rente initiale.
            </li>
            <li>
              <strong>Sortez le reste en capital, fractionné</strong> sur plusieurs années pour
              lisser l'impôt, en coordination avec vos autres enveloppes (voir{" "}
              <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a>).
            </li>
          </ol>
          <p>
            Nous ne prétendons pas que cette approche soit optimale pour tout le monde : elle
            échoue, par exemple, quand le « trou » est supérieur à ce que l'épargne peut financer
            (la rente ne crée pas de ressources), ou quand l'état de santé rend la rente peu
            attractive. C'est un point de départ à tester, pas une règle.
          </p>

          <h2 id="profils">Quatre profils-types et la pente naturelle de chacun</h2>
          <table>
            <thead>
              <tr>
                <th>Profil</th>
                <th>Pente naturelle</th>
                <th>Point d'attention</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pensions qui couvrent largement les dépenses</td>
                <td>Capital, fractionné</td>
                <td>La rente n'apporte pas grand-chose ; l'enjeu est surtout fiscal et successoral.</td>
              </tr>
              <tr>
                <td>Pensions inférieures aux dépenses incompressibles</td>
                <td>Rente partielle pour combler le trou</td>
                <td>Vérifier l'indexation et la réversion ; ne pas rentiser plus que nécessaire.</td>
              </tr>
              <tr>
                <td>Conjoint dépendant du revenu du ménage</td>
                <td>Rente avec réversion, ou capital réservé</td>
                <td>La réversion réduit la rente initiale ; comparer au maintien d'un capital.</td>
              </tr>
              <tr>
                <td>Volonté de transmettre</td>
                <td>Capital, avec arbitrage vers l'assurance-vie</td>
                <td>Le capital restant à la fin de la vie n'est pas transmis par une rente classique.</td>
              </tr>
            </tbody>
          </table>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on panacher capital et rente sur un même PER ?</h3>
          <p>
            Oui, dans la plupart des contrats : une partie de l'épargne est convertie en rente, le
            reste est retiré en capital (en une ou plusieurs fois). Les règles précises dépendent du
            contrat et de la nature des versements (volontaires, obligatoires, épargne salariale).
          </p>
          <h3>Mon employeur a versé sur un PER obligatoire : puis-je tout sortir en capital ?</h3>
          <p>
            En principe non : cette part ne sort qu'en rente, sauf si la rente mensuelle serait
            inférieure à {euros(s.seuilConversionRenteObligatoireMensuel)}. Vos versements volontaires
            et ceux d'épargne salariale suivent des règles plus souples. Vérifiez le détail de vos
            compartiments sur votre relevé annuel.
          </p>
          <h3>La rente de PER est-elle indexée sur l'inflation ?</h3>
          <p>
            Pas automatiquement. Certains contrats proposent une rente indexée ou à progression
            programmée, avec en contrepartie une rente de départ plus basse. C'est une option à
            chiffrer avant de signer, car elle ne peut pas être ajoutée après coup.
          </p>
          <h3>Les prélèvements sociaux sur la rente sont-ils les mêmes que sur le capital ?</h3>
          <p>
            Pas exactement : sur la rente, ils portent sur une fraction qui dépend de l'âge au
            premier versement, alors que sur le capital ils portent sur la part de gains (dans le
            cadre du PFU). Le taux applicable dépend de la nature des sommes et de la date de
            paiement ; les taux ayant évolué en 2026 (hausse de la CSG sur les revenus du capital),
            vérifiez le taux en vigueur sur service-public.gouv.fr avant tout calcul.
          </p>
          <h3>Que devient la rente au décès ?</h3>
          <p>
            Sans option, elle s'éteint avec vous et aucun capital n'est transmis. Avec une option de
            réversion, une fraction continue d'être versée au bénéficiaire désigné ; avec une
            garantie de durée minimale, le versement se poursuit pendant la période prévue. Ces
            options baissent la rente initiale.
          </p>
          <h3>Est-il pertinent de retarder la sortie ?</h3>
          <p>
            Cela dépend de vos besoins de revenus, de votre fiscalité et du contrat. Retarder permet
            souvent de laisser l'épargne investie et, pour la rente, de bénéficier d'un taux de
            conversion plus favorable à un âge plus élevé ; mais le PER n'est pas un outil
            d'épargne illimité dans le temps pour qui souhaite transmettre. À examiner au cas par cas.
          </p>

          <h2 id="a-faire">Comment préparer la décision</h2>
          <ol>
            <li>
              <strong>Identifiez vos compartiments</strong> (versements volontaires déduits ou non,
              épargne salariale, versements obligatoires) : ils ne sortent pas tous de la même
              façon.
            </li>
            <li>
              <strong>Demandez à votre assureur une simulation de rente</strong> avec et sans
              réversion, avec et sans indexation, et comparez les taux de conversion entre
              contrats.
            </li>
            <li>
              <strong>Chiffrez le « trou »</strong> entre vos pensions (relevé de carrière et
              estimation de pension à jour) et vos dépenses incompressibles.
            </li>
            <li>
              <strong>Simulez la fiscalité de trois scénarios</strong> : tout en capital en une fois,
              capital fractionné, mixte capital-rente.
            </li>
          </ol>
          <div className="note">
            <p>
              Ces éléments sont généraux et ne constituent pas un conseil personnalisé. Les règles
              fiscales citées sont celles en vigueur en 2026 selon service-public.gouv.fr ; les taux
              de conversion sont des ordres de grandeur. Pour mesurer ce que cela donne dans votre
              situation, un <a href="/bilan-retraite">bilan retraite gratuit</a> permet de comparer
              les scénarios. Sources : {s.source}
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="PER : capital, rente ou les deux ? Chiffrons vos scénarios"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
