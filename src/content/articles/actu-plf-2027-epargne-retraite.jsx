import { Link } from "react-router-dom";
import { FISCALITE, TRANSMISSION, pct } from "../../components/hypotheses.js";

export const meta = {
  slug: "plf-2027-assurance-vie-abattement-pensions-donations",
  type: "actualite",
  big5: "actu",
  categorie: "actu",
  title: "PLF 2027 : assurance-vie, abattement sur pensions et dons",
  description:
    "Le projet de loi de finances 2027, non adopté, vise l'assurance-vie, l'abattement de 10 % sur les pensions et les dons. Ce qui est prévu, ce qui reste inchangé.",
  h1: "Projet de loi de finances 2027 : ce qui est prévu pour l'assurance-vie, l'abattement de 10 % sur les pensions et les dons",
  resume:
    "Le projet de loi de finances pour 2027, enregistré le 1er octobre 2026 et non adopté à la date de rédaction, propose de conditionner le régime fiscal de l'assurance-vie, de plafonner à 3 000 euros l'abattement de 10 % sur les pensions de retraite et de créer un régime temporaire pour les dons de sommes d'argent.",
  datePublication: "2026-10-01",
  dateMiseAJour: "2026-10-20",
  faq: [
    {
      q: "Un contrat d'assurance-vie classique est-il visé par l'article 6 ?",
      a: "Selon l'exposé des motifs du projet, les critères prévus (primes versées en numéraire, supports aux caractéristiques équivalentes à celles du code des assurances, pas de titres émis par le souscripteur, l'assuré, le bénéficiaire ou leur entourage dans un fonds dédié) sont déjà respectés par l'immense majorité des contrats. Seuls les termes de votre contrat et le texte final permettent de savoir s'il est concerné.",
    },
    {
      q: "L'abattement de 10 % sur les pensions va-t-il vraiment passer à 3 000 euros ?",
      a: "C'est ce que propose l'article 3 du projet de loi de finances pour 2027, qui ajouterait un sous-plafond de 3 000 euros au plafond actuel de 4 439 euros pour les pensions de retraite. Le texte n'est pas adopté : il peut être modifié ou supprimé.",
    },
    {
      q: "Le projet change-t-il les règles du PER ou du PEA ?",
      a: "Les articles que nous avons relus dans le projet de loi déposé ne portent ni sur le plafond de déduction du PER ni sur le PEA. Nous n'avons pas vérifié d'éventuels amendements en cours de discussion.",
    },
    {
      q: "La réduction à 6 % des droits sur les dons est-elle permanente ?",
      a: "Non, selon le projet, elle serait temporaire : dons de sommes d'argent consentis entre le 1er janvier 2027 et le 30 juin 2027.",
    },
  ],
  sources: [
    {
      label: "Assemblée nationale : projet de loi de finances pour 2027 (n° 3210), articles 2, 3, 4 et 6 et exposés des motifs",
      url: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3210_projet-loi",
    },
    {
      label: "Assemblée nationale : projet de loi de finances pour 2027 (n° 3210), texte intégral en PDF",
      url: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3210_projet-loi.pdf",
    },
  ],
  liens: [
    "/strategies/assurance-vie-retraite",
    "/guide/risques-assurance-vie",
    "/guide/donation-ou-assurance-vie-transmission",
    "/guide/assurance-vie-luxembourgeoise",
    "/bilan-retraite",
  ],
};

export default function ActuPlf2027EpargneRetraite() {
  return (
    <>
      <p>
        <em>Situation au 20 octobre 2026. Toutes les dispositions décrites ci-dessous figurent dans le
        projet de loi de finances (PLF) pour 2027 : projet, non adopté à la date de rédaction.</em>
      </p>

      <h2>1. Ce qui change (dans le projet)</h2>
      <p>
        Le PLF pour 2027 a été déposé le 1er octobre 2026 (projet n° 3210). Quatre mesures intéressent
        directement l'épargne et la retraite.
      </p>
      <h3>Assurance-vie (article 6)</h3>
      <p>
        L'article 6, intitulé « Protection du modèle de l'assurance-vie », conditionne les avantages
        fiscaux de l'assurance-vie à trois critères : les primes doivent être versées en numéraire
        (pour les primes versées à compter du 1er octobre 2026) ; les actifs de référence doivent
        présenter des caractéristiques équivalentes à celles exigées par le code des assurances ; le
        contrat ne doit pas comporter, dans un fonds dédié, de titres émis par le souscripteur,
        l'assuré ou le bénéficiaire, leur cercle familial ou les entités qu'ils contrôlent. Les
        contrats étrangers devraient présenter des caractéristiques similaires. À défaut, le taux
        réduit d'impôt sur le revenu des contrats de plus de huit ans ne s'appliquerait pas, et les
        capitaux au décès seraient soumis aux droits de mutation par décès selon le degré de parenté
        avec l'assuré.
      </p>
      <h3>Abattement de 10 % sur les pensions de retraite (article 3)</h3>
      <p>
        Le projet ajouterait un sous-plafond de 3 000 euros, spécifique aux pensions de retraite, au
        plafond actuel de l'abattement de 10 % (4 439 euros selon l'exposé des motifs). Les règles
        applicables aux pensions alimentaires et d'invalidité ne seraient pas modifiées.
      </p>
      <h3>Barème de l'impôt sur le revenu (article 2)</h3>
      <p>
        Le projet indexe les tranches du barème sur la prévision d'inflation hors tabac de 2026 par
        rapport à 2025, soit 2,1 %, pour les revenus perçus à compter du 1er janvier 2027.
      </p>
      <h3>Dons de sommes d'argent (article 4)</h3>
      <p>
        À titre temporaire, les dons de sommes d'argent en pleine propriété consentis entre le 1er
        janvier et le 30 juin 2027 à un enfant, petit-enfant, arrière-petit-enfant (ou, à défaut,
        neveu, nièce ou petit-neveu et petite-nièce) de 18 ans révolus et de moins de 50 ans seraient
        taxés à un taux unique de 6 %, dans la limite de 100 000 euros par donateur et par donataire,
        ramené à 5 % en cas de versement d'au moins 1,1 % des sommes reçues à certains organismes. La
        limite d'exonération des dons de sommes d'argent serait portée à 50 000 euros, contre
        31 865 euros tous les quinze ans aujourd'hui selon l'exposé des motifs.
      </p>

      <h2>2. Pour qui</h2>
      <ul>
        <li>
          Article 6 : les titulaires de contrats d'assurance-vie, français ou étrangers, notamment
          ceux dont le contrat comporte un fonds dédié ; les contrats souscrits à compter du 1er
          octobre 2026 sont visés en premier, des dates différentes (notamment le 1er juillet 2027
          pour certaines dispositions) étant prévues pour les contrats antérieurs.
        </li>
        <li>Article 3 : les foyers percevant des pensions de retraite.</li>
        <li>Article 4 : les donateurs en capacité de donner une somme d'argent, et leurs descendants de moins de 50 ans.</li>
      </ul>

      <h2>3. Chiffres sourcés et datés</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Donnée</th>
              <th>Valeur</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Plafond actuel de l'abattement de 10 % sur les pensions</td>
              <td>4 439 € ; sous-plafond proposé : 3 000 €</td>
              <td>PLF 2027, art. 3 et exposé des motifs (1er octobre 2026)</td>
            </tr>
            <tr>
              <td>Indexation du barème de l'impôt sur le revenu</td>
              <td>2,1 % (inflation hors tabac prévue, 2026 vs 2025)</td>
              <td>PLF 2027, art. 2 et exposé des motifs</td>
            </tr>
            <tr>
              <td>Encours d'assurance-vie cité par le Gouvernement</td>
              <td>Près de 2 200 Md€</td>
              <td>PLF 2027, art. 6, exposé des motifs</td>
            </tr>
            <tr>
              <td>Dons de sommes d'argent (1er janvier au 30 juin 2027)</td>
              <td>Taux unique de 6 % jusqu'à 100 000 € ; 5 % sous condition de reversement de 1,1 %</td>
              <td>PLF 2027, art. 4</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Pour mémoire, les paramètres fiscaux de l'assurance-vie actuellement en vigueur utilisés sur ce
        site (à la date de révision des hypothèses) sont : taux réduit de {pct(FISCALITE.avTauxReduitApres8Ans)}
        sur les gains des contrats de plus de huit ans, abattement annuel de{" "}
        {FISCALITE.avAbattementAnnuelSeul.toLocaleString("fr-FR")} euros pour une personne seule ({FISCALITE.avAbattementAnnuelCouple.toLocaleString("fr-FR")}{" "}
        euros pour un couple), et, pour les donations, un abattement de{" "}
        {TRANSMISSION.abattementDonationParEnfant.toLocaleString("fr-FR")} euros par parent et par
        enfant, renouvelable tous les {TRANSMISSION.renouvellementDonationAnnees} ans.
      </p>

      <h2>4. Ce que cela ne change pas</h2>
      <ul>
        <li>
          <strong>Rien n'est adopté.</strong> Le texte sera discuté, amendé, éventuellement
          censuré, avant toute application ; seule la loi promulguée fait foi.
        </li>
        <li>
          <strong>L'assurance-vie reste un contrat d'épargne</strong> dont les supports en unités de
          compte comportent un risque de perte en capital ; le projet ne modifie pas cette nature.
        </li>
        <li>
          <strong>Le PER et le PEA</strong> ne sont pas l'objet des articles relus ici.
        </li>
        <li>
          <strong>Les règles successorales et les abattements en vigueur</strong> ne sont pas
          modifiés par le projet, les mesures sur les dons étant décrites comme indépendantes des règles
          existantes.
        </li>
      </ul>

      <h2>5. Pour aller plus loin</h2>
      <ul>
        <li>
          <Link to="/strategies/assurance-vie-retraite">L'assurance-vie pour la retraite</Link> et ses{" "}
          <Link to="/guide/risques-assurance-vie">risques</Link>.
        </li>
        <li>
          <Link to="/guide/donation-ou-assurance-vie-transmission">Donation ou assurance-vie pour transmettre</Link>.
        </li>
        <li>
          <Link to="/guide/assurance-vie-luxembourgeoise">L'assurance-vie luxembourgeoise</Link> :
          fonctionnement et points d'attention.
        </li>
      </ul>

      <h2>En résumé</h2>
      <p>
        Le projet de loi de finances pour 2027 comporte des mesures qui pourraient toucher
        l'assurance-vie, l'abattement sur les pensions et les dons ; aucune n'est adoptée à ce jour.
        Un petit pas utile : relire les conditions de vos propres contrats (nature des primes, supports,
        fonds dédié éventuel) à la lumière de ce que le texte final retiendra, en commençant par{" "}
        <Link to="/strategies/assurance-vie-retraite">la page assurance-vie</Link>. Si vous
        souhaitez ensuite un regard extérieur, un{" "}
        <Link to="/bilan-retraite">bilan retraite gratuit de 15 minutes</Link> est possible. Cette
        page est informative et ne constitue pas un conseil personnalisé.
      </p>
    </>
  );
}
