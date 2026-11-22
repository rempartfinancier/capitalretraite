import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  DECUMULATION,
  HYPOTHESES_MAJ,
  RENTE_VIAGERE,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Exemples chiffrés : tout est calculé depuis hypotheses.js ----
const TAUX = DECUMULATION.tauxConversionRente65;
const capitalExemple = RENTE_VIAGERE.capitalIllustratif;
const renteAnnuelleDefaut = (capitalExemple * TAUX.defaut) / 100;
const renteMensuelleDefaut = renteAnnuelleDefaut / 12;
const anneesPourRecupererCapital = 100 / TAUX.defaut; // non actualisé, avant impôt
const infl = RENTE_VIAGERE.tauxInflationIllustratif;
const pouvoirAchat = (annees) => 1 / Math.pow(1 + infl / 100, annees);
const renteEnPouvoirAchat = (annees) => renteAnnuelleDefaut * pouvoirAchat(annees);

export default function GuideInconvenientsRenteViagere() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Transparence sur un mécanisme mal connu</span>
          <h1>Rente viagère : les inconvénients qu'on ne vous dit jamais</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> convertir un capital en rente viagère signifie en céder
              définitivement la propriété à l'assureur — impossible de récupérer le capital, quelle
              que soit la raison, et rien à transmettre aux héritiers par défaut en cas de décès. Le
              taux de conversion est figé le jour de la signature et ne bénéficie d'aucune remontée
              ultérieure des taux de marché. Des options existent (réversion, annuités garanties)
              mais elles ont un coût direct sur le montant perçu. Ces inconvénients sont le prix
              d'une protection réelle contre le risque de vivre plus longtemps que prévu — ni un
              piège, ni une solution universelle.
            </p>
          </div>
          <p>
            La rente viagère a bonne presse : « un revenu garanti à vie » résume l'argument en
            une phrase, et l'argument est vrai. Mais une phrase ne fait pas un contrat. Derrière
            cette garantie se cachent quatre mécaniques rarement expliquées avant la signature —
            et qui, une fois la conversion faite, ne se négocient plus. Notre analyse détaille
            ici ce mécanisme dans sa généralité, quelle que soit l'enveloppe d'origine (PER,
            assurance-vie, capital personnel), avant de traiter à part le cas du PER, où notre
            cabinet défend une position plus tranchée.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#alienation">Peut-on récupérer l'argent d'une rente viagère ?</a></li>
              <li><a href="#taux-fige">Le taux de conversion, figé au jour J</a></li>
              <li><a href="#transmission">Que devient une rente viagère en cas de décès ?</a></li>
              <li><a href="#irreversible">Pas de retour en arrière</a></li>
              <li><a href="#comparatif-options">Sans option, avec réversion, avec annuités garanties : que choisir ?</a></li>
              <li><a href="#chiffres">Combien verse une rente viagère ? Un exemple chiffré</a></li>
              <li><a href="#inflation">Une rente non indexée perd-elle de la valeur ?</a></li>
              <li><a href="#longevite">Un outil contre un seul risque : la longévité</a></li>
              <li><a href="#fiscalite">Une rente viagère est-elle imposable ?</a></li>
              <li><a href="#per">Le cas particulier du PER</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="alienation">Peut-on récupérer l'argent d'une rente viagère ?</h2>
          <p>
            Convertir un capital en rente viagère, c'est l'<strong>aliéner</strong> — c'est-à-dire
            en céder définitivement la propriété à l'assureur, en échange d'un revenu. Ce n'est
            pas une nuance juridique : dès la conversion, l'argent ne vous appartient plus, et il
            n'existe aucun mécanisme pour le récupérer sous forme de capital, quelle que soit la
            raison (un besoin ponctuel, un projet, un changement de situation). Ce que vous
            recevez en échange, c'est un revenu versé par l'assureur jusqu'à votre décès, quelle
            que soit la durée de votre vie — dix ans ou quarante ans, le montant périodique ne
            change pas.
          </p>
          <p>
            Cette garantie mérite d'être bornée avec précision : elle est due par l'assureur, pas
            par un fonds public ni par une caisse mutualisée abstraite. Le versement continue
            hors défaillance de cet assureur — un événement rare pour les acteurs établis, mais
            qui rappelle que la « garantie à vie » est une garantie contractuelle, portée par un
            débiteur identifié, et non une certitude absolue déconnectée de tout risque de
            contrepartie.
          </p>

          <h2 id="taux-fige">Le taux de conversion, figé au jour J</h2>
          <p>
            Le montant de la rente se calcule à partir d'un <strong>taux de conversion</strong> :
            le pourcentage du capital cédé que l'assureur s'engage à reverser chaque année.
            Autrement dit, combien de rente annuelle pour 100 € confiés. À 65 ans, sans option,
            l'ordre de grandeur constaté va de {pct(DECUMULATION.tauxConversionRente65.min)} à{" "}
            {pct(DECUMULATION.tauxConversionRente65.max)} selon les contrats — barèmes de
            conversion des assureurs, hypothèses révisées en {HYPOTHESES_MAJ}, à vérifier contrat
            par contrat, car ils diffèrent d'un assureur à l'autre.
          </p>
          <p>
            Ce taux dépend de trois éléments réunis au moment précis de la conversion : l'âge du
            souscripteur (plus la conversion intervient tard, plus le taux est élevé, l'assureur
            s'attendant à verser moins longtemps), les tables de mortalité retenues par le
            contrat — les statistiques réglementaires de durée de vie que l'assureur utilise pour
            estimer combien de temps il devra vous verser un revenu — et les options choisies
            (détaillées plus bas). Une fois ces trois paramètres arrêtés et le capital converti,
            le taux ne bouge plus. Il reste identique pendant toute la durée de la rente, même si
            les taux de marché remontent nettement dans les années qui suivent : contrairement à
            un placement resté investi, la rente ne profite d'aucune hausse ultérieure des
            rendements.
          </p>

          <h2 id="transmission">Que devient une rente viagère en cas de décès ?</h2>
          <p>
            Conséquence directe de l'aliénation : au décès du rentier, il ne reste, par défaut,
            rien à transmettre aux héritiers. Le capital a été consommé par l'assureur au fil des
            versements, et cette consommation ne s'arrête pas à la hauteur des sommes déjà
            perçues — même un décès précoce, un an après la conversion, ne restitue rien.
          </p>
          <p>
            Deux options viennent atténuer ce trait, moyennant un coût. La{" "}
            <strong>réversion</strong> : vous désignez un bénéficiaire, le conjoint le plus
            souvent, à qui une part de la rente continuera d'être versée après votre décès. Les{" "}
            <strong>annuités garanties</strong> : l'assureur s'engage à verser la rente pendant
            une durée minimale, à vos bénéficiaires si vous décédez avant ce terme. Dans les deux
            cas, la logique est la même : ces protections ne sont pas gratuites — à capital
            identique, elles abaissent le taux de conversion de départ, donc le montant de la
            rente perçue de votre vivant. Ce que l'une des deux options vous rend d'un côté, elle
            le reprend de l'autre.
          </p>

          <h2 id="irreversible">Pas de retour en arrière</h2>
          <p>
            La conversion en rente viagère est une décision irréversible. Une fois signée, elle
            ne se défait pas, ne se suspend pas et ne se module pas : le montant est fixé pour le
            reste de la vie du rentier. C'est là que la rente se distingue le plus nettement des{" "}
            retraits programmés — le fait de conserver son capital investi et d'en retirer
            régulièrement une fraction — qui, eux, restent pilotables à tout moment : monter,
            baisser, suspendre un retrait ne pose aucune difficulté, puisque le capital reste
            votre propriété. Notre page{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">
              rente viagère ou retraits programmés
            </a>{" "}
            détaille cet arbitrage entre sécurité et souplesse.
          </p>

          <h2 id="comparatif-options">Sans option, avec réversion, avec annuités garanties : que choisir ?</h2>
          <p>
            Les trois configurations possibles d'une rente viagère se distinguent par leur effet sur
            le taux de conversion de départ — donc sur le montant perçu de votre vivant — et sur ce
            qui reste transmissible à vos proches. Le tableau ci-dessous synthétise ces arbitrages ;
            il se lit comme une grille de lecture, pas comme un verdict, puisque le bon choix dépend
            de votre situation familiale et de votre besoin de transmission.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Configuration</th>
                  <th>Effet sur le taux de conversion</th>
                  <th>Transmission au décès</th>
                  <th>Pour qui c'est adapté</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sans option</td>
                  <td>
                    Taux le plus élevé de la fourchette, de l'ordre de{" "}
                    {pct(DECUMULATION.tauxConversionRente65.min)} à{" "}
                    {pct(DECUMULATION.tauxConversionRente65.max)} à 65 ans selon les contrats
                  </td>
                  <td>Rien par défaut : le capital restant est conservé par l'assureur</td>
                  <td>Qui n'a pas de conjoint ou d'héritier à protéger par ce biais, et privilégie le revenu maximal de son vivant</td>
                </tr>
                <tr>
                  <td>Avec réversion</td>
                  <td>Taux abaissé par rapport à la même rente sans option, l'ampleur de la baisse dépendant du taux de réversion choisi et de l'écart d'âge entre les conjoints</td>
                  <td>Une part de la rente continue d'être versée au bénéficiaire désigné jusqu'à son propre décès</td>
                  <td>Qui a un conjoint ou un proche financièrement dépendant à protéger après son décès</td>
                </tr>
                <tr>
                  <td>Avec annuités garanties</td>
                  <td>Taux abaissé également, dans une proportion qui dépend de la durée de garantie retenue</td>
                  <td>La rente continue d'être versée aux bénéficiaires jusqu'au terme de la durée garantie, si le décès survient avant celle-ci</td>
                  <td>Qui veut se prémunir contre le scénario d'un décès précoce, sans viser une protection à vie du bénéficiaire</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les taux de conversion sans option cités sont des ordres de grandeur à 65 ans, hypothèses
            révisées en {HYPOTHESES_MAJ}, à vérifier contrat par contrat — les barèmes de réversion et
            d'annuités garanties varient sensiblement d'un assureur à l'autre et ne sont pas
            centralisés dans une fourchette unique fiable.
          </p>

          <h2 id="chiffres">Combien verse une rente viagère ? Un exemple chiffré</h2>
          <p>
            Prenons un capital illustratif de {euros(capitalExemple)} converti à 65 ans, sans
            option, au taux médian de {pct(TAUX.defaut)} (hypothèse révisée en {HYPOTHESES_MAJ},
            purement illustrative). La rente s'élèverait à environ {euros(renteAnnuelleDefaut)} par
            an, soit {euros(renteMensuelleDefaut)} par mois, avant impôt. Dans la fourchette de{" "}
            {pct(TAUX.min)} à {pct(TAUX.max)}, le même capital donnerait de{" "}
            {euros((capitalExemple * TAUX.min) / 100)} à {euros((capitalExemple * TAUX.max) / 100)}{" "}
            par an : l'écart entre deux offres peut donc représenter plusieurs centaines d'euros par
            an pour un même capital.
          </p>
          <p>
            Autre lecture, à manier avec prudence : à ce taux, les versements cumulés égalent le
            capital converti au bout d'environ {Math.round(anneesPourRecupererCapital)} ans
            (100 ÷ {pct(TAUX.defaut).replace(" %", "")}), sans tenir compte ni de l'actualisation
            ni de l'impôt. C'est un peu plus que l'espérance de vie moyenne à 65 ans d'un homme (
            {DECUMULATION.esperanceVie65.hommes} ans) et un peu moins que celle d'une femme (
            {DECUMULATION.esperanceVie65.femmes} ans) — ce qui ne dit rien de votre propre
            longévité : la rente est une assurance mutualisée, qui paie davantage à ceux qui vivent
            longtemps et moins à ceux qui décèdent tôt. Notre guide sur{" "}
            <a href="/guide/rente-viagere-calcul-montant-taux-de-conversion">
              le calcul du montant d'une rente viagère
            </a>{" "}
            détaille ce qui fait varier le taux.
          </p>

          <h2 id="inflation">Une rente non indexée perd-elle de la valeur ?</h2>
          <p>
            Oui, en pouvoir d'achat, si le contrat n'est pas indexé. Avec l'hypothèse d'une inflation
            de {pct(infl)} par an (cible de la Banque centrale européenne, simple hypothèse
            d'illustration), la rente de {euros(renteAnnuelleDefaut)} de l'exemple précédent
            conserverait, en euros d'aujourd'hui, une valeur d'environ{" "}
            {euros(renteEnPouvoirAchat(RENTE_VIAGERE.horizonsErosion[0]))} par an après{" "}
            {RENTE_VIAGERE.horizonsErosion[0]} ans, {euros(renteEnPouvoirAchat(RENTE_VIAGERE.horizonsErosion[1]))}{" "}
            après {RENTE_VIAGERE.horizonsErosion[1]} ans et{" "}
            {euros(renteEnPouvoirAchat(RENTE_VIAGERE.horizonsErosion[2]))} après{" "}
            {RENTE_VIAGERE.horizonsErosion[2]} ans. L'inflation réelle sera différente de
            cette hypothèse ; le mécanisme, lui, vaut pour toute rente à montant fixe. Une
            indexation contractuelle ou une rente à capital croissant atténue cet effet, mais
            abaisse le montant de départ : c'est un arbitrage de plus à chiffrer avant de signer.
          </p>

          <h2 id="longevite">Un outil contre un seul risque : la longévité</h2>
          <p>
            Ces inconvénients ne signifient pas que la rente est mal conçue : ils sont le prix
            d'une protection précise contre un risque précis, le{" "}
            <strong>risque de longévité</strong> — le risque de vivre plus longtemps que ce pour
            quoi votre capital a été dimensionné, et donc de survivre à votre épargne. C'est un
            risque réel : à 65 ans, un homme a encore {DECUMULATION.esperanceVie65.hommes} ans
            d'espérance de vie en moyenne, une femme {DECUMULATION.esperanceVie65.femmes} ans
            (espérance de vie à 65 ans, INSEE, données 2023-2024) — et ce sont des moyennes,
            qu'une partie des retraités dépassera largement. Dimensionner un capital sur quinze
            ans quand l'espérance de vie moyenne à 65 ans en dépasse déjà dix-neuf revient à
            parier contre la statistique.
          </p>
          <p>
            Face à ce risque précis, la rente offre une réponse précise : un revenu qui ne peut
            pas s'épuiser, quelle que soit la longévité effective du rentier. Mais elle ne protège
            que de ce risque-là. Elle ne protège pas contre un besoin de capital imprévu, ne
            protège pas les héritiers, et ne profite pas d'une remontée des taux de marché après
            la conversion. Confondre « la rente sécurise le revenu » et « la rente est la solution
            à tout » est l'erreur la plus fréquente que nous rencontrons sur ce sujet.
          </p>

          <h2 id="fiscalite">Une rente viagère est-elle imposable ?</h2>
          <p>
            Oui, mais la règle dépend de l'origine de la rente. Pour une rente viagère « à titre
            onéreux » (issue d'un capital que l'on a cédé à un assureur), seule une fraction de la
            rente est soumise à l'impôt sur le revenu : de {RENTE_VIAGERE.fractionImposableRvto[0].partImposable} % avant 50 ans à{" "}
            {RENTE_VIAGERE.fractionImposableRvto[3].partImposable} % à partir de 70 ans, fixée une fois pour
            toutes selon l'âge au premier versement. Les prélèvements sociaux s'appliquent sur cette
            même fraction. Le régime d'une rente issue d'un PER est distinct. Notre guide{" "}
            <a href="/guide/fiscalite-rente-viagere-titre-onereux">
              la fiscalité de la rente viagère à titre onéreux
            </a>{" "}
            détaille le calcul avec un exemple ; la rente de PER est abordée dans la page{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a>.
          </p>

          <h2 id="per">Le cas particulier du PER</h2>
          <p>
            Tout ce qui précède décrit le mécanisme général de la rente viagère, quelle que soit
            son origine. Sur un point précis, toutefois, notre analyse va plus loin : dans le cas
            particulier du plan d'épargne retraite (PER), la sortie en rente est, selon notre
            cabinet, rarement le choix le plus adapté, par comparaison avec une sortie en capital
            ou une sortie mixte (une partie en capital, une partie en rente).
          </p>
          <p>
            La raison tient à la fiscalité propre au PER, et non aux seuls inconvénients
            structurels détaillés plus haut. Les versements volontaires déduits à l'entrée sont
            réintégrés au barème de l'impôt sur le revenu à la sortie — que cette sortie prenne la
            forme d'une rente ou d'un capital, l'un comme l'autre restent imposés à ce titre. La
            sortie en rente n'efface donc pas cette fiscalité ; elle y ajoute, en plus, la perte
            de flexibilité propre au capital : impossibilité d'ajuster le montant perçu, de
            transmettre le solde ou de faire face à un besoin ponctuel avec les sommes converties.
            Notre page <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a>{" "}
            détaille ce calcul.
          </p>
          <div className="note">
            <p>
              Précision importante : cette position plus tranchée concerne spécifiquement le PER.
              Sur l'assurance-vie ou un capital personnel, notre analyse reste celle exposée plus
              haut — un arbitrage entre sécurité du revenu et souplesse du capital, qui se pèse au
              cas par cas et ne débouche sur aucun verdict général. Notre page{" "}
              <a href="/strategies/decumulation">la décumulation</a> replace cet arbitrage dans
              l'ensemble des enveloppes et présente l'ordre de décaissement que nous recommandons
              généralement ; notre guide{" "}
              <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a>{" "}
              l'approfondit.
            </p>
          </div>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on annuler une rente viagère une fois signée ?</h3>
          <p>
            Non. La conversion en rente viagère est irrévocable : il n'existe pas de délai de
            rétractation propre à cette opération une fois le contrat de rente mis en place, ni de
            procédure pour « annuler » la conversion et récupérer le capital, quelle que soit la
            raison invoquée. C'est précisément ce qui distingue la rente d'un placement resté
            investi, où un changement d'avis reste toujours possible.
          </p>
          <h3>Que devient l'argent si je meurs un an après la conversion ?</h3>
          <p>
            Sans option de protection, rien n'est reversé à vos héritiers : le capital a été cédé à
            l'assureur au moment de la conversion, indépendamment de la durée pendant laquelle la
            rente a ensuite été versée. Avec une option de réversion ou d'annuités garanties,
            souscrite dès l'origine, une part de la rente ou sa totalité continue d'être versée
            selon les modalités prévues au contrat — d'où l'intérêt d'étudier ces options avant la
            conversion, et non après.
          </p>
          <h3>Puis-je récupérer mon capital si j'ai besoin d'argent plus tard ?</h3>
          <p>
            Non, et c'est le point le plus souvent mal anticipé. Une fois la conversion faite,
            aucun rachat, même partiel, n'est possible pour faire face à un besoin ponctuel — un
            projet, des travaux, un imprévu de santé. C'est la raison pour laquelle nous
            recommandons généralement de ne pas convertir la totalité d'un capital en rente, et de
            conserver une réserve disponible sous une autre forme avant de s'engager.
          </p>
          <h3>Le montant de la rente peut-il baisser dans le temps ?</h3>
          <p>
            Sur une rente viagère classique à montant fixe, non : le montant déterminé à la
            conversion reste identique jusqu'au décès, ni à la baisse ni à la hausse. Certains
            contrats proposent une indexation contractuelle (une revalorisation annuelle prévue à
            l'avance), mais elle n'est pas systématique et doit être vérifiée contrat par contrat
            avant la signature — une rente non indexée perd mécaniquement en pouvoir d'achat avec
            l'inflation au fil des années.
          </p>
          <h3>La rente viagère est-elle plus intéressante en cas de mauvaise santé ?</h3>
          <p>
            En général, non : le calcul repose sur une espérance de vie statistique moyenne, pas sur
            un état de santé individuel. Une personne dont l'espérance de vie personnelle serait
            réduite verse le même capital pour le même taux de conversion qu'une personne en bonne
            santé, ce qui rend la rente structurellement moins avantageuse pour elle en espérance.
            Certains contrats dits « à espérance de vie réduite » existent sur le marché mais restent
            marginaux et à étudier au cas par cas.
          </p>
          <h3>Quel capital faut-il pour une rente viagère de 1 000 € par mois ?</h3>
          <p>
            Il suffit d'inverser la formule : capital = rente annuelle ÷ taux de conversion. Pour
            une rente de {euros(12000)} par an, il faudrait environ{" "}
            {euros((12000 * 100) / TAUX.max)} au taux de {pct(TAUX.max)} et{" "}
            {euros((12000 * 100) / TAUX.min)} au taux de {pct(TAUX.min)} — les bornes de l'ordre de
            grandeur retenu à 65 ans, hypothèses {HYPOTHESES_MAJ} à vérifier contrat par contrat.
          </p>
          <h3>Rente viagère ou assurance-vie : que choisir ?</h3>
          <p>
            Ce n'est pas le même objet : l'assurance-vie laisse le capital disponible et
            transmissible, la rente le transforme en revenu à vie. Beaucoup de situations
            combinent les deux. Notre comparatif{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">
              rente viagère ou retraits programmés
            </a>{" "}
            chiffre l'arbitrage, et les{" "}
            <a href="/guide/rachats-programmes-assurance-vie-retraite">rachats programmés</a> en
            décrivent l'alternative concrète.
          </p>
          <h3>Une rente viagère est-elle réversible au conjoint ?</h3>
          <p>
            Seulement si l'option de réversion a été choisie à la conversion, avec un taux de
            réversion fixé au contrat. Elle abaisse la rente de départ ; son niveau exact dépend de
            l'assureur et de l'écart d'âge entre les deux personnes.
          </p>
          <h3>Peut-on convertir seulement une partie de son capital en rente ?</h3>
          <p>
            Oui, la sortie mixte (une partie en rente, une partie conservée en capital ou en
            retraits programmés) est possible sur la plupart des enveloppes, y compris le PER. Elle
            permet de sécuriser une base de revenu incompressible tout en conservant une part de
            souplesse et de transmissibilité sur le solde — un compromis que nous recommandons
            souvent d'étudier avant de trancher entre tout l'un ou tout l'autre.
          </p>
          <h3>Qui verse la rente si l'assureur fait faillite ?</h3>
          <p>
            La garantie de versement est due par l'assureur qui a reçu le capital, pas par un fonds
            public illimité. En cas de défaillance d'un assureur, un mécanisme de garantie des
            assurés (encadré par le Code des assurances, plafonné par bénéficiaire) peut intervenir,
            mais ce n'est pas une certitude équivalente à une garantie d'État sans plafond. C'est un
            événement rare pour les acteurs établis, mais qui justifie de s'informer sur la solidité
            financière de l'assureur avant de convertir un capital important.
          </p>
          <h3>Existe-t-il un âge minimum ou maximum pour convertir un capital en rente viagère ?</h3>
          <p>
            Cela dépend du contrat et de l'enveloppe d'origine plutôt que d'une règle unique : un PER
            ou un contrat d'assurance-vie fixe généralement ses propres conditions d'âge à la sortie.
            En pratique, la conversion intervient le plus souvent au moment du départ à la retraite,
            mais elle reste théoriquement possible plus tôt ou plus tard selon les clauses du
            contrat — à vérifier au cas par cas avant toute décision.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La rente viagère n'est ni un piège ni une martingale. C'est un outil d'assurance
            contre un risque précis — vivre plus longtemps que prévu — et comme toute assurance,
            elle se paie : ici, par l'irréversibilité de la décision et la perte définitive du
            capital converti. Cette mécanique doit se mettre en balance avec les retraits
            programmés selon ce qui compte le plus dans votre situation : le besoin de sécurité
            d'un revenu à vie, ou le besoin de souplesse et de transmission d'un capital qui reste
            le vôtre.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle. Les
              taux de conversion et données d'espérance de vie cités sont des ordres de grandeur
              en vigueur en {HYPOTHESES_MAJ}, à vérifier contrat par contrat ; ils ne préjugent en
              rien des taux ou barèmes qui s'appliqueront à votre conversion.
            </p>
          </div>
          <p>
            Pour aller plus loin :{" "}
            <a href="/strategies/decumulation">la décumulation, vue d'ensemble</a>,{" "}
            <a href="/guide/combien-retirer-par-mois-capital-retraite">combien retirer par mois d'un capital</a>,{" "}
            <a href="/guide/capital-necessaire-completer-pension-retraite-65-ans">le capital nécessaire pour compléter sa pension</a>{" "}
            et <a href="/guide/a-quel-age-recuperer-son-capital-retraite">à quel âge récupérer son capital retraite</a>.
          </p>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Rente, retraits programmés ou combinaison des deux ?" button="Bilan retraite gratuit (15 min)" />
    </>
  );
}
