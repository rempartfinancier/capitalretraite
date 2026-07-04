import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { SimulateurCapitalisation } from "../components/Simulateurs.jsx";
import {
  FRAIS_TYPES,
  HYPOTHESES_MAJ,
  pct,
} from "../components/hypotheses.js";

// Moyenne d'une fourchette { min, max } de hypotheses.js.
const moy = (fourchette) => (fourchette.min + fourchette.max) / 2;

// Total annuel « tout compris » (frais de gestion + frais des supports),
// milieu de fourchette — recalculé automatiquement depuis hypotheses.js.
const totalBancairePilote =
  moy(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle) +
  moy(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports) +
  moy(FRAIS_TYPES.gestionPiloteeSurcout);
const totalInternetEtf =
  moy(FRAIS_TYPES.contratInternet.gestionAnnuelle) +
  moy(FRAIS_TYPES.contratInternet.fraisSupports);

export default function GuideCoutAssuranceVie() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide prix</span>
          <h1>Combien coûte une assurance-vie ? La grille poste par poste</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> une assurance-vie coûte entre presque rien et près
              de {pct(totalBancairePilote)} par an, pour exactement le même produit — une
              assurance-vie investie en actions. L'écart se joue dans cinq postes de frais
              distincts (entrée, gestion annuelle du contrat, frais des supports, arbitrage,
              surcoût de gestion pilotée), dont le plus lourd — les frais des supports — ne
              figure jamais dans la grille tarifaire du contrat mais dans le document
              d'informations clés (DIC) de chaque fonds. Ce qui compte n'est jamais le niveau de
              frais isolé, mais la valeur nette reçue en échange.
            </p>
          </div>

          <p>
            La réponse honnête tient en une phrase : entre presque rien et près de{" "}
            {pct(totalBancairePilote)} par an, pour exactement le même produit — une assurance-vie
            investie en actions. Tout l'écart se joue dans des étages de frais que presque personne
            ne lit en entier. Cet article ne revient pas sur les mécanismes qui font qu'un contrat
            sous-performe (c'est l'objet de notre article{" "}
            <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">
              pourquoi votre assurance-vie rapporte peu
            </a>
            ) : il pose la seule grille de prix, poste par poste, chiffres à l'appui, pour que vous
            puissiez vérifier le vôtre en dix minutes.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#entree">1. Les frais d'entrée, ou frais sur versement</a></li>
              <li><a href="#gestion">2. Les frais de gestion annuels du contrat</a></li>
              <li><a href="#supports">3. Les frais des supports, les plus invisibles</a></li>
              <li><a href="#arbitrage">4. Les frais d'arbitrage</a></li>
              <li><a href="#pilotee">5. Le surcoût de la gestion pilotée</a></li>
              <li><a href="#tableau">La grille récapitulative</a></li>
              <li><a href="#cumul">Le cumul : ce que 2 points d'écart font sur 15 ans</a></li>
              <li><a href="#nuance">Frais élevés et frais justifiés : la vraie question</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#checklist">Check-list : retrouver ses frais en 10 minutes</a></li>
            </ol>
          </div>

          <h2 id="entree">1. Les frais d'entrée, ou frais sur versement</h2>
          <p>
            C'est le premier prélèvement, et le plus visible : un pourcentage retenu sur chaque
            versement, avant même que l'argent ne soit investi. Il est prélevé par l'assureur ou
            par l'intermédiaire qui distribue le contrat (banque, réseau de conseillers). Dans les
            réseaux bancaires traditionnels, il se situe en ordre de grandeur entre{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.min)} et{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.max)} du montant versé (données{" "}
            {HYPOTHESES_MAJ}, à vérifier contrat par contrat) ; sur les contrats distribués en
            ligne, il est le plus souvent nul.
          </p>
          <p>
            Un point que peu d'épargnants savent : en agence, ces frais sont fréquemment
            négociables, surtout à partir de quelques dizaines de milliers d'euros versés. Ils ne
            figurent presque jamais comme un prix fixe et non discutable — ne pas demander revient
            à les payer plein tarif par défaut.
          </p>

          <h2 id="gestion">2. Les frais de gestion annuels du contrat</h2>
          <p>
            Ceux-là sont prélevés chaque année par l'assureur, sur l'encours total du contrat (le
            capital présent, gains compris) — qu'il progresse, stagne ou recule, et que vous
            versiez ou non dans l'année. C'est un prix payé pour la tenue de compte, l'accès à la
            plateforme et l'administration du contrat. En réseau bancaire traditionnel, l'ordre de
            grandeur constaté est de {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min)}{" "}
            à {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)} par an ; sur un
            contrat internet, il descend à{" "}
            {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.min)} à{" "}
            {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.max)} (grilles tarifaires{" "}
            {HYPOTHESES_MAJ}, à vérifier).
          </p>

          <h2 id="supports">3. Les frais des supports : les plus invisibles</h2>
          <p>
            C'est l'étage que la grande majorité des épargnants ne voient jamais, parce qu'il ne
            figure pas dans la grille tarifaire du contrat, mais dans un document séparé : le DIC
            (document d'informations clés, la fiche standardisée européenne de deux ou trois pages
            que chaque fonds doit publier — cherchez la ligne « frais courants »). Ces frais sont
            prélevés à l'intérieur même du fonds, avant le calcul de sa performance affichée. Ce
            document est imposé par la réglementation européenne PRIIPs ; l'
            <a href="https://www.amf-france.org/fr/espace-epargnants/comprendre-nos-alertes/les-documents-dinformation-cles-dic" target="_blank" rel="noopener noreferrer">
              AMF publie un guide de lecture du document d'informations clés
            </a>{" "}
            à destination des épargnants.
          </p>
          <p>
            Un fonds « maison » classique, proposé par la société de gestion du même groupe que
            votre banque, facture en ordre de grandeur{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)} par an. Un ETF (un
            fonds coté en bourse qui réplique un indice plutôt que de tenter de le battre) facture
            un travail comparable pour {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} à{" "}
            {pct(FRAIS_TYPES.contratInternet.fraisSupports.max)}. L'écart ne se lit nulle part
            dans les documents commerciaux du contrat : il faut ouvrir le DIC de chaque support,
            un par un.
          </p>

          <h2 id="arbitrage">4. Les frais d'arbitrage</h2>
          <p>
            L'arbitrage, c'est le fait de déplacer une partie de votre épargne d'un support vers
            un autre à l'intérieur du même contrat — sans avoir à le racheter ni à payer d'impôt
            au passage. En réseau bancaire traditionnel, ce mouvement coûte encore parfois de{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.arbitrage.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.arbitrage.max)} du montant déplacé ; sur
            un contrat en ligne, il est le plus souvent gratuit et illimité. Un frais de{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.arbitrage.max)} par mouvement peut sembler
            anodin, mais il dissuade de rééquilibrer un contrat au bon moment — un frein
            comportemental autant que financier.
          </p>

          <h2 id="pilotee">5. Le surcoût de la gestion pilotée</h2>
          <p>
            La gestion pilotée (déléguer les choix d'allocation à un gérant, contre un
            questionnaire de profil) ajoute sa propre couche par-dessus les frais des supports
            qu'elle sélectionne. Ce surcoût de mandat se situe en ordre de grandeur entre{" "}
            {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} et {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)}{" "}
            par an, données {HYPOTHESES_MAJ} à vérifier — un chiffre qui s'ajoute à celui de la
            ligne 3, il ne le remplace pas.
          </p>

          <h2 id="tableau">La grille récapitulative</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Poste de frais</th>
                  <th>Réseau bancaire traditionnel</th>
                  <th>Contrat en ligne (ETF)</th>
                  <th>Où le vérifier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frais d'entrée / versement</td>
                  <td>
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.max)} (souvent négociables)
                  </td>
                  <td>{pct(FRAIS_TYPES.contratInternet.entree.max)}</td>
                  <td>Conditions générales, bulletin de versement</td>
                </tr>
                <tr>
                  <td>Frais de gestion annuels du contrat</td>
                  <td>
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)}
                  </td>
                  <td>
                    {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.min)} à{" "}
                    {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.max)}
                  </td>
                  <td>Grille tarifaire du contrat, relevé annuel</td>
                </tr>
                <tr>
                  <td>Frais des supports (fonds / ETF)</td>
                  <td>
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)}
                  </td>
                  <td>
                    {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} à{" "}
                    {pct(FRAIS_TYPES.contratInternet.fraisSupports.max)}
                  </td>
                  <td>DIC de chaque fonds, ligne « frais courants »</td>
                </tr>
                <tr>
                  <td>Frais d'arbitrage (par mouvement)</td>
                  <td>
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.arbitrage.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.arbitrage.max)}
                  </td>
                  <td>{pct(FRAIS_TYPES.contratInternet.arbitrage.max)}</td>
                  <td>Grille tarifaire du contrat</td>
                </tr>
                <tr>
                  <td>Surcoût de gestion pilotée (en plus des frais des fonds)</td>
                  <td>
                    {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)}
                  </td>
                  <td>Généralement sans objet en gestion libre</td>
                  <td>Convention de gestion pilotée, notice du mandat</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Toutes ces fourchettes sont des ordres de grandeur de marché, révisés en{" "}
            {HYPOTHESES_MAJ} — à vérifier contrat par contrat, chaque assureur et chaque
            distributeur pratiquant sa propre grille.
          </p>

          <h2 id="cumul">Le cumul : ce que 2 points d'écart font sur 15 ans</h2>
          <p>
            Additionnez les postes 2 et 3, ajoutez le surcoût du poste 5 quand il s'applique : un
            contrat bancaire traditionnel investi en fonds maison et en gestion pilotée cumule
            couramment de l'ordre de {pct(totalBancairePilote)} de frais annuels tout compris,
            quand un contrat en ligne investi en ETF, en gestion libre, revient autour de{" "}
            {pct(totalInternetEtf)}. L'écart — de l'ordre de deux points de pourcentage par an — ne
            change rien au risque pris ni à la qualité de l'allocation ; il change uniquement ce
            qui reste dans votre poche chaque année.
          </p>
          <p>
            Un point de frais en moins n'est pas un point de rendement en plus ponctuel : c'est un
            point de rendement en plus chaque année, qui se compose avec tous les précédents.
            Plutôt que d'illustrer ce mécanisme avec un exemple générique, faites le calcul avec
            vos propres chiffres : le simulateur ci-dessous permet de comparer deux niveaux de
            frais, sur votre horizon et vos versements.
          </p>
          <SimulateurCapitalisation enveloppe="av" />

          <h2 id="nuance">Frais élevés et frais justifiés : la vraie question</h2>
          <p>
            À ce stade, la tentation est de conclure que les frais sont l'ennemi et qu'il faut les
            réduire à zéro. Notre analyse s'écarte volontairement de ce raccourci. Les frais sont
            un point de vigilance réel — pas une obsession. Ce qui compte n'est jamais le niveau de
            frais isolé, mais la valeur nette reçue en échange : rendement net de frais, fiscalité
            optimisée, allocation ajustée à votre situation, accompagnement dans les moments où une
            décision seule coûte cher (un rachat mal placé, une clause bénéficiaire mal rédigée, un
            arbitrage fait au pire moment).
          </p>
          <p>
            Payer des honoraires ou des frais de gestion pour une véritable ingénierie
            patrimoniale — une stratégie construite, revue et ajustée dans le temps — peut être le
            meilleur calcul, même à frais plus élevés que la moyenne du marché. À l'inverse, un
            contrat à frais réduits mais jamais revu, jamais ajusté à mesure que votre situation
            évolue, peut coûter davantage en occasions manquées que ce qu'il économise en frais
            affichés. Le vrai problème n'est donc pas de payer des frais : c'est de payer des frais
            élevés sans aucun service en face. Notre guide sur{" "}
            <a href="/guide/combien-coute-un-conseiller-en-gestion-de-patrimoine">
              le coût d'un conseiller en gestion de patrimoine
            </a>{" "}
            détaille comment distinguer les deux, et ce qu'un accompagnement rémunéré doit
            concrètement vous apporter pour justifier son prix.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Les frais d'une assurance-vie sont-ils prélevés même si le contrat ne rapporte rien ?</h3>
          <p>
            Oui, pour la plupart des postes. Les frais de gestion annuels du contrat et les frais
            des supports sont prélevés sur l'encours, qu'il progresse, stagne ou recule dans
            l'année. Seuls les frais d'entrée et d'arbitrage dépendent d'un mouvement que vous
            déclenchez vous-même.
          </p>
          <h3>Comment savoir si les frais de mon contrat sont dans la moyenne du marché ?</h3>
          <p>
            En comparant chaque poste — entrée, gestion annuelle, frais des supports, arbitrage,
            éventuel surcoût de gestion pilotée — à la grille récapitulative de cet article, puis
            en confrontant le total à celui d'un contrat en ligne équivalent. Un écart important
            sur un seul poste mérite d'être questionné auprès de l'assureur ou du distributeur.
          </p>
          <h3>Le document d'informations clés (DIC) est-il obligatoire pour tous les supports ?</h3>
          <p>
            Oui, la réglementation européenne PRIIPs impose ce document standardisé pour
            l'ensemble des produits d'investissement packagés proposés aux particuliers, dont les
            unités de compte logées en assurance-vie. Il doit être remis avant toute souscription.
          </p>
          <h3>Un contrat sans frais d'entrée est-il automatiquement le moins cher ?</h3>
          <p>
            Non : l'absence de frais d'entrée ne dit rien des frais de gestion annuels ni des
            frais des supports, qui pèsent davantage dans la durée. C'est le cumul des cinq
            postes de cet article, pas un seul d'entre eux, qui détermine le coût réel d'un
            contrat.
          </p>
          <h3>Les frais de gestion pilotée sont-ils toujours justifiés ?</h3>
          <p>
            Non, pas systématiquement. Ils se justifient quand l'allocation est réellement
            construite et revue dans le temps ; ils le sont beaucoup moins pour un mandat mis en
            place une fois puis jamais ajusté, alors que son coût, lui, continue d'être prélevé
            chaque année.
          </p>
          <h3>Peut-on faire baisser les frais d'un contrat déjà ouvert ?</h3>
          <p>
            Directement, rarement : les frais de gestion annuels sont fixés par les conditions
            générales du contrat et ne se renégocient pas facilement une fois signés. En
            revanche, il est souvent possible d'arbitrer vers des supports moins coûteux
            (ETF plutôt que fonds actifs, par exemple) à l'intérieur du même contrat.
          </p>

          <h2 id="checklist">Check-list : retrouver ses frais en 10 minutes</h2>
          <ol>
            <li>
              <strong>Sortez votre relevé annuel de situation.</strong> L'assureur est tenu de vous
              l'adresser chaque année ; il détaille en principe les frais prélevés sur la période.
            </li>
            <li>
              <strong>Ouvrez les conditions générales du contrat.</strong> Les frais d'entrée, de
              gestion annuelle et d'arbitrage y figurent noir sur blanc, dans un tableau dédié.
            </li>
            <li>
              <strong>Ouvrez le DIC de chaque support détenu.</strong> C'est le seul endroit où
              trouver les « frais courants » du poste 3 — celui que la grille du contrat ne montre
              jamais.
            </li>
            <li>
              <strong>Vérifiez si vous êtes en gestion pilotée ou en gestion libre.</strong> La
              convention de gestion pilotée, si elle existe, mentionne son surcoût séparément.
            </li>
            <li>
              <strong>Additionnez les cinq postes</strong> et comparez le total à la grille
              ci-dessus : c'est ce chiffre, et lui seul, qu'il faut mettre en face du service reçu.
            </li>
          </ol>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque contrat doit être vérifié individuellement. Les fourchettes de
              frais citées sont des ordres de grandeur de marché, révisés en {HYPOTHESES_MAJ}, à
              confirmer poste par poste sur vos propres documents contractuels. Pour aller plus
              loin sur les mécanismes qui expliquent une sous-performance,{" "}
              <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">
                notre article dédié
              </a>{" "}
              complète cette grille ; pour resituer l'assurance-vie dans une stratégie de retraite
              d'ensemble, voir{" "}
              <a href="/strategies/assurance-vie-retraite">assurance-vie et retraite</a> et notre
              panorama des <a href="/guide/risques-assurance-vie">risques de l'assurance-vie</a>.
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
