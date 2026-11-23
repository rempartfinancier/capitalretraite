import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { DECUMULATION, RENTE_VIAGERE, euros } from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const D = DECUMULATION;
const R = RENTE_VIAGERE;
const T = D.tauxConversionRente65;
const CAPITAL = R.capitalIllustratif;
const INFLATION = R.tauxInflationIllustratif;

const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + " %";
const nombre1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const eurosPrecis = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

// ---- Rente = capital × taux de conversion ----
const renteAnnuelle = (capital, taux) => (capital * taux) / 100;
const renteMensuelle = (capital, taux) => renteAnnuelle(capital, taux) / 12;
// Années pour récupérer le capital, sans actualisation : 100 / taux.
const anneesRecuperation = (taux) => 100 / taux;
// Pouvoir d'achat d'une rente non indexée après n années : 1 / (1 + i)^n.
const pouvoirAchat = (n) => 1 / Math.pow(1 + INFLATION / 100, n);

const scenarios = [
  { cle: "min", libelle: "Taux bas", taux: T.min },
  { cle: "defaut", libelle: "Taux central", taux: T.defaut },
  { cle: "max", libelle: "Taux haut", taux: T.max },
];

const rente = renteAnnuelle(CAPITAL, T.defaut);
const horizonCentral = R.horizonsErosion[R.horizonsErosion.length - 1];

const sources = [
  {
    label: "Service-Public.gouv.fr — Particuliers, rubrique Retraite (rente viagère, épargne retraite)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits",
  },
  {
    label: "Légifrance — Code des assurances (dispositions relatives aux opérations viagères et aux tables de mortalité)",
    url: "https://www.legifrance.gouv.fr/",
  },
  {
    label: "AMF — Épargnants : assurance-vie et produits d'épargne (Autorité des marchés financiers)",
    url: "https://www.amf-france.org/fr/espace-epargnants",
  },
  {
    label: "INSEE — Espérance de vie, séries démographiques",
    url: "https://www.insee.fr/",
  },
  {
    label: "Impots.gouv.fr — Particuliers, rentes viagères et épargne retraite",
    url: "https://www.impots.gouv.fr/particulier",
  },
];

export default function GuideRenteViagereCalcul() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Décumulation · rente viagère</span>
          <h1>Rente viagère : comment est calculé le montant ? Le taux de conversion</h1>
          <p className="sub">
            Une rente, c'est un capital multiplié par un taux. Reste à comprendre ce qui fait varier
            ce taux. Mis à jour en {R.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le montant d'une rente viagère se calcule par une
              formule simple : <em>capital converti × taux de conversion</em>. Le taux dépend de
              l'âge au moment de la conversion, des tables de mortalité, du taux technique, des
              frais du contrat et des options choisies. À titre d'ordre de grandeur, les barèmes
              à {R.ageConversionIllustratif} ans sans option se situent autour de {T.min} % à{" "}
              {T.max} % (à vérifier auprès de l'assureur). Sur {euros(CAPITAL)}, cela donne de{" "}
              {euros(renteAnnuelle(CAPITAL, T.min))} à {euros(renteAnnuelle(CAPITAL, T.max))} par
              an. Une rente non indexée perd mécaniquement du pouvoir d'achat avec le temps.
            </p>
          </div>

          <p>
            Martine, 64 ans, retraitée composite et illustrative qui ne correspond à aucun cas
            réel, a reçu deux courriers de deux assureurs. L'un lui propose une rente de{" "}
            {euros(renteAnnuelle(CAPITAL, T.min))} par an pour un capital de {euros(CAPITAL)}, l'autre
            {" "}
            {euros(renteAnnuelle(CAPITAL, T.max))}. Même capital, même âge, des montants qui ne
            sont pas comparables tels quels : l'un prévoit peut-être une réversion, l'autre non ;
            l'un indexe la rente, l'autre pas ; les frais ne sont pas les mêmes.
          </p>
          <p>
            Cet article explique comment lire ces chiffres : la mécanique du calcul, les facteurs
            qui font bouger le taux, le nombre d'années nécessaires pour « récupérer » son capital,
            l'érosion d'une rente non indexée, et une méthode pour comparer deux offres. Les
            inconvénients et les limites de la rente, notamment son caractère irréversible, sont
            traités dans notre guide sur{" "}
            <a href="/guide/inconvenients-rente-viagere">les inconvénients de la rente viagère</a> :
            nous ne les reprenons pas ici.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#formule">Comment calcule-t-on le montant d'une rente viagère ?</a></li>
              <li><a href="#facteurs">Qu'est-ce qui fait varier le taux de conversion ?</a></li>
              <li><a href="#exemple">Quelle rente pour {euros(CAPITAL)} converti à {R.ageConversionIllustratif} ans ?</a></li>
              <li><a href="#annees">En combien d'années récupère-t-on son capital ?</a></li>
              <li><a href="#erosion">Que devient une rente non indexée au fil des années ?</a></li>
              <li><a href="#comparer">Comment comparer deux offres de rente ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="formule">Comment calcule-t-on le montant d'une rente viagère ?</h2>
          <p>
            Le calcul tient en une ligne : rente annuelle = capital converti × taux de conversion.
            Un taux de {T.defaut} % appliqué à {euros(CAPITAL)} donne {euros(rente)} par an, soit{" "}
            {eurosPrecis(renteMensuelle(CAPITAL, T.defaut))} par mois. Le capital est le montant
            que vous transformez en rente ; le taux est fixé par l'assureur au jour de la
            conversion, selon un barème propre à chaque contrat.
          </p>
          <p>
            Ce taux n'est pas un rendement. Il mélange deux choses : la restitution progressive du
            capital et une rémunération de ce capital, le tout réparti sur une durée inconnue, celle
            de votre vie. L'assureur mutualise ce risque entre tous les crédirentiers : ceux qui
            vivent longtemps sont en partie financés par ceux qui vivent moins longtemps. C'est ce
            qui rend possible une rente garantie à vie, et c'est aussi ce qui explique qu'un décès
            précoce n'est pas compensé, sauf option prévue au contrat.
          </p>
          <div className="note">
            <p>
              Les taux de cette page sont des ordres de grandeur pédagogiques à {R.ageConversionIllustratif}{" "}
              ans, sans option de réversion. Les barèmes réels varient selon l'assureur, le contrat,
              l'âge et les options : seule l'offre chiffrée que vous recevez fait foi.
            </p>
          </div>

          <h2 id="facteurs">Qu'est-ce qui fait varier le taux de conversion ?</h2>
          <p>
            Plusieurs paramètres entrent dans le barème. Les comprendre permet de savoir pourquoi
            deux offres affichent des montants différents pour un même capital.
          </p>
          <ul>
            <li>
              <strong>L'âge à la conversion.</strong> Plus on convertit tard, plus la durée de
              versement attendue est courte, et plus le taux est élevé. Convertir plus tôt donne
              un taux plus bas, mais une rente servie plus longtemps en moyenne.
            </li>
            <li>
              <strong>Le sexe et les tables de mortalité.</strong> L'assureur s'appuie sur des
              tables de mortalité réglementaires. Les femmes ayant en moyenne une espérance de vie
              plus longue, leur durée de versement attendue l'est aussi : à capital et âge égaux, le
              taux appliqué peut donc différer selon les barèmes et les contrats. Les règles
              applicables à ces distinctions sont à vérifier sur chaque offre.
            </li>
            <li>
              <strong>Le taux technique.</strong> C'est le rendement que l'assureur suppose pour
              placer le capital converti. Plus il est élevé, plus la rente de départ est élevée, et
              réciproquement. Il dépend en partie des taux d'intérêt de long terme au moment de la
              conversion.
            </li>
            <li>
              <strong>Les frais.</strong> Frais de gestion de la rente, frais à la conversion,
              marge de l'assureur : ils réduisent le taux net. Ils figurent dans les conditions
              générales et se demandent par écrit.
            </li>
            <li>
              <strong>Les options.</strong> Réversion au profit d'un conjoint, annuités garanties
              (le versement est maintenu pendant une durée minimale même en cas de décès précoce),
              indexation de la rente : chacune a un coût, qui se traduit par un taux de départ plus
              bas. Notre guide sur{" "}
              <a href="/guide/inconvenients-rente-viagere">les inconvénients de la rente viagère</a>{" "}
              compare ces options sous l'angle de leurs limites.
            </li>
          </ul>

          <h2 id="exemple">Quelle rente pour {euros(CAPITAL)} converti à {R.ageConversionIllustratif} ans ?</h2>
          <p>
            Prenons un capital de {euros(CAPITAL)} converti à {R.ageConversionIllustratif} ans, sans
            réversion. Trois taux illustrent la fourchette des barèmes évoqués plus haut :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Scénario</th>
                  <th>Taux de conversion</th>
                  <th>Rente annuelle</th>
                  <th>Rente mensuelle</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((s) => (
                  <tr key={s.cle}>
                    <td>{s.libelle}</td>
                    <td>{pct1(s.taux)}</td>
                    <td>{euros(renteAnnuelle(CAPITAL, s.taux))}</td>
                    <td>{eurosPrecis(renteMensuelle(CAPITAL, s.taux))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Ces montants sont bruts, avant impôt et prélèvements sociaux. Entre le taux bas et le
            taux haut, l'écart est de {euros(renteAnnuelle(CAPITAL, T.max) - renteAnnuelle(CAPITAL, T.min))}{" "}
            par an pour le même capital : c'est dire l'importance de faire chiffrer plusieurs offres.
            Le traitement fiscal de la rente est détaillé dans notre guide sur{" "}
            <a href="/guide/fiscalite-rente-viagere-titre-onereux">
              la fiscalité de la rente viagère à titre onéreux
            </a>
            .
          </p>

          <h2 id="annees">En combien d'années récupère-t-on son capital ?</h2>
          <p>
            Un repère simple : en divisant 100 par le taux de conversion, on obtient le nombre
            d'années de rente nécessaires pour percevoir un total égal au capital converti. À{" "}
            {pct1(T.defaut)}, il faut 100 ÷ {T.defaut} = {nombre1(anneesRecuperation(T.defaut))} ans.
            Ce calcul est « non actualisé » : il ignore l'inflation et le rendement que le capital
            aurait pu produire ailleurs. Il donne un ordre de grandeur, pas une valeur économique.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Taux de conversion</th>
                  <th>Années pour égaler le capital</th>
                  <th>Âge atteint (conversion à {R.ageConversionIllustratif} ans)</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((s) => (
                  <tr key={s.cle}>
                    <td>{pct1(s.taux)}</td>
                    <td>{nombre1(anneesRecuperation(s.taux))} ans</td>
                    <td>{nombre1(R.ageConversionIllustratif + anneesRecuperation(s.taux))} ans</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Pour situer ces durées, l'espérance de vie à {R.ageConversionIllustratif} ans est
            d'environ {D.esperanceVie65.femmes} ans pour les femmes et {D.esperanceVie65.hommes} ans
            pour les hommes (INSEE, données 2023-2024, à vérifier). Avec le taux central, le seuil
            des {nombre1(anneesRecuperation(T.defaut))} ans se situe entre ces deux repères : en
            moyenne, une femme le dépasse et un homme s'en approche. Ce sont des moyennes : une
            personne en particulier peut vivre bien moins ou bien plus longtemps, et c'est
            précisément le risque que la rente mutualise. Ce n'est donc pas un « point mort » à
            atteindre, mais un moyen de mesurer ce que l'on échange : la disponibilité du capital
            contre un revenu garanti à vie.
          </p>

          <h2 id="erosion">Que devient une rente non indexée au fil des années ?</h2>
          <p>
            Une rente non indexée est versée pour le même montant nominal jusqu'au bout. Son pouvoir
            d'achat, lui, baisse avec la hausse des prix : après n années, il vaut 1 ÷ (1 + i)
            <sup>n</sup>, où i est le taux d'inflation annuel moyen. Avec une inflation illustrative
            de {pct1(INFLATION)} par an (hypothèse, non une prévision), la rente de {euros(rente)}{" "}
            par an à taux central évolue ainsi :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Horizon</th>
                  <th>Pouvoir d'achat restant</th>
                  <th>Rente de {euros(rente)} équivalant à, en euros d'aujourd'hui</th>
                </tr>
              </thead>
              <tbody>
                {R.horizonsErosion.map((n) => (
                  <tr key={n}>
                    <td>{n} ans</td>
                    <td>{pct1(pouvoirAchat(n) * 100)}</td>
                    <td>{euros(rente * pouvoirAchat(n))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Au bout de {horizonCentral} ans, la même somme nominale n'achète plus que{" "}
            {pct1(pouvoirAchat(horizonCentral) * 100)} de ce qu'elle achetait au départ. Cette
            érosion n'a rien d'une certitude : le rythme réel de l'inflation est inconnu. Mais elle
            explique pourquoi certains contrats proposent une rente indexée, avec un taux de départ
            plus bas, et pourquoi l'indexation est une option à chiffrer plutôt qu'à écarter ou
            retenir par principe.
          </p>

          <h2 id="comparer">Comment comparer deux offres de rente ?</h2>
          <p>
            Comparer deux taux bruts revient souvent à comparer des produits différents. Voici une
            grille de lecture, à appliquer offre par offre. Elle sert à poser les bonnes questions,
            non à désigner la meilleure offre, ce qui dépend de votre situation.
          </p>
          <ol>
            <li>
              <strong>À options égales.</strong> Même capital, même âge, même réversion, mêmes
              annuités garanties, même indexation. Sans cela, l'écart reflète les options, pas la
              qualité de l'offre.
            </li>
            <li>
              <strong>Le montant net de frais.</strong> Demandez le détail des frais de conversion
              et de gestion, et le taux technique retenu.
            </li>
            <li>
              <strong>La rente de départ et son évolution.</strong> Un taux plus bas avec indexation
              peut, selon l'inflation, rattraper une rente plus élevée non indexée ; la comparaison
              dépend de l'horizon retenu, comme le montre le tableau d'érosion ci-dessus.
            </li>
            <li>
              <strong>La solidité de l'assureur et la nature du contrat.</strong> Se renseigner
              sur l'organisme, ses garanties et les conditions générales avant de signer.
            </li>
            <li>
              <strong>La part du patrimoine concernée.</strong> Convertir tout ou partie du
              capital ne produit pas le même arbitrage. Notre comparatif{" "}
              <a href="/guide/rente-viagere-ou-retraits-programmes">rente viagère ou retraits programmés</a>{" "}
              met en regard les deux logiques, et la page{" "}
              <a href="/strategies/decumulation">décumulation</a> replace ce choix dans l'ordre global
              des sorties.
            </li>
          </ol>
          <p>
            Pour situer la rente dans l'ensemble de vos revenus, on peut partir d'un premier ordre de
            grandeur avec le <a href="/simulateur-retraite">simulateur de retraite</a>, puis faire
            chiffrer les offres réelles.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Comment calculer le montant d'une rente viagère à partir d'un capital ?</h3>
          <p>
            Multipliez le capital converti par le taux de conversion proposé par l'assureur. Avec un
            taux de {pct1(T.defaut)}, {euros(CAPITAL)} donnent {euros(rente)} par an. Le taux exact
            figure dans l'offre ou la simulation du contrat.
          </p>
          <h3>Quel est le taux de conversion d'une rente viagère à 65 ans ?</h3>
          <p>
            À titre d'ordre de grandeur, les barèmes à {R.ageConversionIllustratif} ans sans option se
            situent entre {pct1(T.min)} et {pct1(T.max)}, selon l'assureur, le contrat et les options
            (à vérifier). Ce n'est pas un taux garanti : seule l'offre chiffrée vous engage.
          </p>
          <h3>Pourquoi la rente d'une femme est-elle parfois différente de celle d'un homme ?</h3>
          <p>
            Parce que les barèmes reposent sur des tables de mortalité et que la durée de versement
            attendue diffère selon les populations. Les pratiques précises varient selon les
            contrats ; il convient de les faire confirmer sur l'offre.
          </p>
          <h3>La réversion fait-elle baisser la rente ?</h3>
          <p>
            Oui, en général : prévoir qu'une partie de la rente continuera d'être versée au
            conjoint survivant rend le versement attendu plus long, donc le taux de départ plus bas.
            Le pourcentage de réversion et l'écart exact se lisent dans l'offre.
          </p>
          <h3>Une rente viagère est-elle indexée sur l'inflation ?</h3>
          <p>
            Pas systématiquement. Beaucoup de rentes sont servies pour un montant nominal fixe ;
            l'indexation, lorsqu'elle existe, est une option prévue au contrat, avec un taux de
            départ plus bas. Pour mesurer ce que l'absence d'indexation change, voir la section sur
            l'érosion.
          </p>
          <h3>Au bout de combien de temps récupère-t-on son capital en rente viagère ?</h3>
          <p>
            La division 100 ÷ taux donne un repère non actualisé : {nombre1(anneesRecuperation(T.defaut))}{" "}
            ans à {pct1(T.defaut)}. Ce calcul ne tient compte ni de l'inflation ni du rendement
            alternatif du capital ; il ne dit pas si la rente est « rentable », seulement combien
            d'années il faut pour recevoir l'équivalent du capital converti.
          </p>
          <h3>Peut-on obtenir une rente plus élevée en attendant ?</h3>
          <p>
            Convertir plus tard donne en général un taux plus élevé, puisque la durée de versement
            attendue est plus courte. Cela suppose toutefois de disposer d'autres revenus entre-temps
            et ne préjuge pas des taux d'intérêt futurs, qui influencent le barème. Voir aussi{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le calcul d'une rente est simple ; ce qui est difficile, c'est de comparer des offres qui
            ne contiennent pas les mêmes options. Le taux de conversion résume l'âge, la mortalité,
            le taux technique, les frais et les options. Ramené à {nombre1(anneesRecuperation(T.defaut))}{" "}
            ans d'équivalence au taux central, il montre que la rente échange une disponibilité
            contre un revenu viager, avec une érosion réelle si elle n'est pas indexée.
          </p>
          <p>
            La démarche prudente consiste à demander plusieurs offres à options identiques, à lire
            les frais, et à décider de la part du capital convertie en fonction de vos besoins et de
            votre horizon. Pour poser cette réflexion à plat avec vos chiffres, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> en offre le cadre.
            Les limites de la rente sont à lire dans{" "}
            <a href="/guide/inconvenients-rente-viagere">notre guide dédié</a>.
          </p>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en {R.maj} :</p>
          <ul>
            {sources.map((src) => (
              <li key={src.url}>
                <a href={src.url} target="_blank" rel="noopener noreferrer">
                  {src.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les taux, les
              espérances de vie et les montants cités sont des ordres de grandeur pédagogiques, à
              vérifier auprès de l'assureur ; les exemples sont des illustrations composites, établies
              sur des hypothèses affichées, qui ne préjugent ni d'un rendement ni de votre situation.
              L'inflation retenue est une hypothèse, non une prévision.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Comparer des offres de rente se fait avec vos chiffres, pas avec un taux moyen." />
    </>
  );
}
