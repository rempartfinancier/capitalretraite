import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  DECUMULATION,
  HYPOTHESES_MAJ,
  pct,
} from "../components/hypotheses.js";

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
              <li><a href="#alienation">L'aliénation définitive du capital</a></li>
              <li><a href="#taux-fige">Le taux de conversion, figé au jour J</a></li>
              <li><a href="#transmission">Rien à transmettre, sauf options payantes</a></li>
              <li><a href="#irreversible">Pas de retour en arrière</a></li>
              <li><a href="#longevite">Un outil contre un seul risque : la longévité</a></li>
              <li><a href="#per">Le cas particulier du PER</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="alienation">L'aliénation définitive du capital</h2>
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

          <h2 id="transmission">Rien à transmettre, sauf options payantes</h2>
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
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Rente, retraits programmés ou combinaison des deux ?" button="Bilan retraite gratuit (15 min)" />
    </>
  );
}
