import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  FISCALITE,
  IMMO,
  TRANSMISSION,
  V3_AVB_70,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const agePivot = V3_AVB_70.agePivot; // 70 ans
const abattementGlobal = TRANSMISSION.abattementSuccessionAvApres70Collectif; // 30 500 €
const abattement990I = TRANSMISSION.abattementSuccessionAvParBeneficiaire; // 152 500 €
const abattementEnfant = TRANSMISSION.abattementDonationParEnfant; // 100 000 €
const bareme = IMMO.demembrement.baremeLigneDirecte;
const tauxPS = FISCALITE.prelevementsSociaux.assuranceVie; // 17,2 %
const maj = V3_AVB_70.maj;

const r2 = (n) => Math.round(n * 100) / 100;
const eur = (n) =>
  Number.isInteger(r2(n))
    ? euros(n)
    : new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(r2(n));

// Droits de succession en ligne directe : application du barème par tranches.
const droitsLigneDirecte = (base) => {
  let reste = Math.max(base, 0);
  let precedent = 0;
  let total = 0;
  for (const t of bareme) {
    const tranche = Math.min(reste, t.jusqua - precedent);
    if (tranche <= 0) break;
    total += (tranche * t.taux) / 100;
    reste -= tranche;
    precedent = t.jusqua;
  }
  return r2(total);
};

// ---- Exemple chiffré ----
const primes = V3_AVB_70.primesApres70; // 80 000 €
const valeurDeces = V3_AVB_70.valeurAuDeces; // 100 000 €
const nbEnfants = V3_AVB_70.nombreEnfants; // 2
const interets = valeurDeces - primes; // 20 000 € exonérés
const baseReintegree = Math.max(primes - abattementGlobal, 0); // 49 500 €
const parEnfant = r2(baseReintegree / nbEnfants); // 24 750 €
const droitsParEnfant = droitsLigneDirecte(parEnfant);
const droitsTotal = r2(droitsParEnfant * nbEnfants);
// Comparaison : même capital hors assurance-vie, intégralement dans la succession
const capitalParEnfantHorsAv = r2(valeurDeces / nbEnfants); // 50 000 €
const droitsHorsAvParEnfant = droitsLigneDirecte(capitalParEnfantHorsAv);
const droitsHorsAvTotal = r2(droitsHorsAvParEnfant * nbEnfants);
const differenceTotale = r2(droitsHorsAvTotal - droitsTotal);
// Comparaison : mêmes primes versées avant 70 ans
const parEnfantAvant70 = r2(valeurDeces / nbEnfants);
const sousAbattement990I = parEnfantAvant70 <= abattement990I;
// Part de l'abattement global dans les primes
const partAbattementPct = r2((abattementGlobal / primes) * 100);

const sources = [
  {
    label:
      "Service-Public.gouv.fr, fiche F14198 : droits de succession, évaluation de la succession et calcul des droits",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14198",
  },
  {
    label:
      "BOFiP : doctrine administrative sur les droits de mutation à titre gratuit et la taxation des capitaux d'assurance-vie (recherche par article du CGI : 757 B et 990 I)",
    url: "https://bofip.impots.gouv.fr",
  },
  {
    label:
      "Légifrance, Code général des impôts : articles 757 B (primes versées après 70 ans) et 990 I (primes versées avant 70 ans), accès par la racine du site",
    url: "https://www.legifrance.gouv.fr",
  },
  {
    label:
      "Service-Public.gouv.fr, fiche F22414 : fiscalité des revenus d'un contrat d'assurance-vie",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22414",
  },
  {
    label: "impots.gouv.fr, espace particulier : succession et déclarations",
    url: "https://www.impots.gouv.fr/particulier",
  },
  {
    label:
      "AMF, espace épargnants : comprendre les risques et les frais des placements financiers",
    url: "https://www.amf-france.org/fr/espace-epargnants",
  },
];

export default function GuideAvApres70Ans() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · Assurance-vie et transmission</span>
          <h1>Assurance-vie après 70 ans : fiscalité et succession</h1>
          <p className="sub">
            Article 757 B, abattement global de {euros(abattementGlobal)}, intérêts exonérés,
            clause bénéficiaire, déclaration : ce qui change vraiment, avec un exemple calculé.
            Mis à jour en {maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> les primes versées après {agePivot} ans ne profitent
              plus de l'abattement de {euros(abattement990I)} par bénéficiaire. Elles relèvent de
              l'article 757 B du Code général des impôts : un abattement global de{" "}
              {euros(abattementGlobal)}, partagé entre tous les bénéficiaires et tous les
              contrats ; au-delà, les primes sont ajoutées à la succession et soumises aux droits
              habituels. En revanche, les intérêts et gains produits par ces primes ne sont pas
              réintégrés. Dans l'exemple de ce guide, {euros(primes)} versés après {agePivot} ans
              et {euros(valeurDeces)} transmis donnent {eur(droitsTotal)} de droits au total pour
              deux enfants, contre {eur(droitsHorsAvTotal)} si le même capital était resté hors
              assurance-vie.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#seuil">Que change le cap des {agePivot} ans ?</a></li>
              <li><a href="#abattement">Comment fonctionne l'abattement global de {euros(abattementGlobal)} ?</a></li>
              <li><a href="#interets">Les intérêts sont-ils vraiment exonérés ?</a></li>
              <li><a href="#exemple">Combien de droits ? Un exemple chiffré</a></li>
              <li><a href="#interet-reel">Quel est l'intérêt réel d'une assurance-vie après {agePivot} ans ?</a></li>
              <li><a href="#clause">Comment rédiger la clause bénéficiaire ?</a></li>
              <li><a href="#declaration">Comment déclarer, étape par étape ?</a></li>
              <li><a href="#documents">Documents, délais et coûts</a></li>
              <li><a href="#checklist">Check-list</a></li>
              <li><a href="#tableau">Quand ça vaut le coup, quand éviter</a></li>
              <li><a href="#pieges">Pièges fréquents</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Prenons un cas composite, sans lien avec une personne réelle : une retraitée de{" "}
            {agePivot + 3} ans, veuve, deux enfants. Elle a touché un héritage et se demande si elle
            doit placer {euros(primes)} sur une assurance-vie « pour ses enfants », comme on le lui
            a conseillé. Elle a entendu parler d'un « abattement de {euros(abattement990I)} »,
            sans savoir que celui-ci disparaît pour les versements faits après ses {agePivot} ans.
            Ce guide explique ce qui change, ce qui ne change pas, et comment s'organiser.
          </p>
          <p>
            Il traite la fiscalité en cas de décès. Pour les rachats effectués de votre vivant,
            reportez-vous à{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">
              notre guide du rachat partiel
            </a>{" "}
            ; pour le contrat de plus de huit ans en général,{" "}
            <a href="/guide/assurance-vie-apres-8-ans-fiscalite-et-rente">
              le guide dédié
            </a>
            .
          </p>

          <h2 id="seuil">Que change le cap des {agePivot} ans ?</h2>
          <p>
            Ce qui compte est l'âge de l'assuré au moment de chaque versement, et non l'âge à
            l'ouverture du contrat : un contrat ouvert à 55 ans peut contenir des primes des deux
            régimes. Chaque prime est classée selon la date à laquelle elle a été versée, et
            l'assureur tient cette comptabilité.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Primes versées avant {agePivot} ans</th>
                  <th>Primes versées après {agePivot} ans</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Texte de référence</td>
                  <td>Article 990 I du CGI</td>
                  <td>Article 757 B du CGI</td>
                </tr>
                <tr>
                  <td>Abattement</td>
                  <td>{euros(abattement990I)} par bénéficiaire</td>
                  <td>{euros(abattementGlobal)}, global, tous bénéficiaires et tous contrats</td>
                </tr>
                <tr>
                  <td>Capital taxé</td>
                  <td>Capital décès, y compris les gains, au-delà de l'abattement</td>
                  <td>Les primes seulement, au-delà de l'abattement</td>
                </tr>
                <tr>
                  <td>Taxation</td>
                  <td>Prélèvement spécifique, hors succession</td>
                  <td>Droits de succession, selon le lien de parenté</td>
                </tr>
                <tr>
                  <td>Conjoint ou partenaire de Pacs</td>
                  <td>Exonéré</td>
                  <td>Exonéré</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les contrats très anciens obéissent à des règles particulières, que l'assureur ou un
            notaire peut préciser. Les montants ci-dessus sont ceux en vigueur en novembre 2026 ; ils
            peuvent être modifiés par la loi.
          </p>

          <h2 id="abattement">Comment fonctionne l'abattement global de {euros(abattementGlobal)} ?</h2>
          <p>
            L'abattement de {euros(abattementGlobal)} s'applique une seule fois par assuré, quel que
            soit le nombre de contrats et de bénéficiaires. Il porte sur les primes versées après{" "}
            {agePivot} ans, et se répartit entre les bénéficiaires au prorata de leurs parts dans
            ces primes. Le surplus est ajouté à l'actif de la succession et taxé comme n'importe quel
            autre bien, en fonction du lien de parenté et après les abattements personnels de chaque
            héritier.
          </p>
          <p>
            L'abattement n'est donc pas un seuil par bénéficiaire. Si vous versez {euros(primes)}{" "}
            après {agePivot} ans, il couvre {pct(partAbattementPct)} de ces primes et le reste, soit{" "}
            {euros(baseReintegree)}, est réintégré. Verser la même somme sur trois contrats ne
            multiplie pas l'abattement par trois.
          </p>

          <h2 id="interets">Les intérêts sont-ils vraiment exonérés ?</h2>
          <p>
            Oui : selon le régime de l'article 757 B, les intérêts et gains produits par les primes
            versées après {agePivot} ans ne sont pas soumis aux droits de succession. Seules les
            primes comptent, quelle que soit la valeur du contrat au décès. C'est l'intérêt
            principal de ce régime : sur un contrat qui a progressé, la différence peut être
            significative. Elle joue en sens inverse si le contrat a perdu de la valeur : les
            primes sont réintégrées même si le capital transmis est plus faible.
          </p>
          <p>
            Dans le même temps, les gains restent soumis, de votre vivant, à la fiscalité des
            rachats, dont les prélèvements sociaux de {pct(tauxPS)} : l'exonération ne concerne que
            les droits de succession. Les prélèvements sociaux annuels sur les fonds en euros
            continuent de s'appliquer.
          </p>

          <h2 id="exemple">Combien de droits ? Un exemple chiffré</h2>
          <div className="note">
            <p>
              Exemple illustratif, sans lien avec un cas réel. Une veuve verse {euros(primes)}{" "}
              après {agePivot} ans. Au décès, le contrat vaut {euros(valeurDeces)}, soit{" "}
              {euros(interets)} d'intérêts et de gains (hypothèse de calcul, pas un rendement
              attendu). Les {nbEnfants} enfants sont bénéficiaires à parts égales. On suppose que
              l'abattement de {euros(abattementEnfant)} de chaque enfant est déjà consommé par le
              reste de la succession, et on applique le barème de la ligne directe.
            </p>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Étape</th>
                  <th>Calcul</th>
                  <th>Résultat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1. Primes versées après {agePivot} ans</td>
                  <td>Donnée</td>
                  <td>{euros(primes)}</td>
                </tr>
                <tr>
                  <td>2. Abattement global</td>
                  <td>{euros(primes)} − {euros(abattementGlobal)}</td>
                  <td>{euros(baseReintegree)} réintégrés</td>
                </tr>
                <tr>
                  <td>3. Gains du contrat</td>
                  <td>{euros(valeurDeces)} − {euros(primes)}</td>
                  <td>{euros(interets)}, non réintégrés</td>
                </tr>
                <tr>
                  <td>4. Part taxable par enfant</td>
                  <td>{euros(baseReintegree)} ÷ {nbEnfants}</td>
                  <td>{eur(parEnfant)}</td>
                </tr>
                <tr>
                  <td>5. Droits par enfant (barème ligne directe)</td>
                  <td>Application des tranches</td>
                  <td>{eur(droitsParEnfant)}</td>
                </tr>
                <tr>
                  <td>6. Droits pour l'ensemble</td>
                  <td>{eur(droitsParEnfant)} × {nbEnfants}</td>
                  <td>{eur(droitsTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Pour mesurer ce que cela représente, deux comparaisons, avec la même hypothèse d'un
            abattement personnel déjà épuisé :
          </p>
          <ul>
            <li>
              <strong>Même capital resté hors assurance-vie.</strong> Les {euros(valeurDeces)} sont
              intégralement dans la succession : {euros(capitalParEnfantHorsAv)} par enfant, soit{" "}
              {eur(droitsHorsAvParEnfant)} de droits chacun et {eur(droitsHorsAvTotal)} au total.
              L'assurance-vie après {agePivot} ans économise {eur(differenceTotale)} dans cet
              exemple.
            </li>
            <li>
              <strong>Mêmes versements faits avant {agePivot} ans.</strong> Chaque enfant recevrait{" "}
              {euros(parEnfantAvant70)}, {sousAbattement990I ? "inférieur" : "supérieur"} à l'abattement
              de {euros(abattement990I)} : {sousAbattement990I ? "aucune taxation spécifique à ce niveau de capital" : "une taxation spécifique s'appliquerait sur l'excédent"}.
              C'est l'écart entre les deux régimes, et la raison pour laquelle l'âge du versement
              compte.
            </li>
          </ul>
          <p>
            Dans la réalité, l'abattement de chaque enfant n'est pas toujours épuisé : lorsqu'il
            reste de la place, les primes réintégrées peuvent être absorbées sans droits. Le
            résultat dépend de l'ensemble de la succession, pas du seul contrat. Un notaire peut
            en faire la simulation.
          </p>

          <h2 id="interet-reel">Quel est l'intérêt réel d'une assurance-vie après {agePivot} ans ?</h2>
          <p>
            L'intérêt n'est plus l'abattement par bénéficiaire, mais trois avantages moins
            spectaculaires. D'abord, l'exonération des gains pour la transmission : plus l'espérance
            de gains est élevée, plus l'économie potentielle l'est aussi (sans qu'aucun résultat
            soit garanti). Ensuite, la libre désignation des bénéficiaires, hors réserve héréditaire
            sous réserve des règles sur les primes manifestement exagérées. Enfin, la
            disponibilité : l'argent reste accessible par rachat de votre vivant.
          </p>
          <p>
            En contrepartie, des frais de contrat peuvent absorber l'avantage si le capital est
            modeste ou la durée courte. Et si la priorité est de transmettre, d'autres outils
            existent : la{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">
              donation, comparée à l'assurance-vie
            </a>
            , ou le{" "}
            <a href="/guide/demembrement-nue-propriete-retraite">démembrement</a> pour un bien
            immobilier. Pour un couple, voir aussi{" "}
            <a href="/guide/epargne-retraite-en-couple-et-transmission">
              épargne retraite en couple et transmission
            </a>
            .
          </p>

          <h2 id="clause">Comment rédiger la clause bénéficiaire ?</h2>
          <p>
            La clause bénéficiaire désigne qui reçoit le capital ; une rédaction approximative peut
            créer des litiges ou une répartition inattendue. Quelques principes :
          </p>
          <ul>
            <li>
              désigner nominativement les bénéficiaires, avec leur date de naissance, plutôt qu'une
              formule vague ;
            </li>
            <li>
              prévoir un bénéficiaire de second rang, en cas de décès avant vous ou de renonciation ;
            </li>
            <li>
              préciser les parts si elles sont inégales, car la formule « mes enfants nés ou à
              naître » les répartit à parts égales ;
            </li>
            <li>
              relire la clause à chaque événement de vie (décès, divorce, naissance, remariage).
            </li>
          </ul>
          <p>
            Pour les modèles et les cas particuliers (enfant mineur, démembrement), voir{" "}
            <a href="/guide/clause-beneficiaire-assurance-vie-comment-la-rediger">
              notre guide de la clause bénéficiaire
            </a>
            .
          </p>

          <h2 id="declaration">Comment déclarer, étape par étape ?</h2>
          <p>
            Après le décès, ce sont les bénéficiaires, le notaire et l'assureur qui agissent, selon les cas.
            Le déroulé habituel est le suivant :
          </p>
          <ol>
            <li>
              <strong>Informer l'assureur.</strong> Les bénéficiaires doivent déclarer le décès à
              l'assureur avec un acte de décès et une pièce d'identité. L'assureur peut aussi être
              alerté par les dispositifs de recherche de contrats.
            </li>
            <li>
              <strong>Identifier les contrats.</strong> L'assureur confirme la valeur du contrat au
              décès, les bénéficiaires, et la ventilation entre primes avant et après {agePivot}{" "}
              ans, dont dépend le régime.
            </li>
            <li>
              <strong>Informer le notaire.</strong> Il intègre les primes réintégrées à l'actif
              successoral et déclare les contrats concernés dans la déclaration de succession,
              lorsque celle-ci est obligatoire.
            </li>
            <li>
              <strong>Déposer la déclaration si elle est due.</strong> Une succession ouverte en
              France se déclare en principe dans les six mois du décès (à vérifier selon votre
              situation). L'administration indique le formulaire à utiliser.
            </li>
            <li>
              <strong>Régler les droits.</strong> Les droits dus sont payés au moment du dépôt de
              la déclaration ; le capital est versé aux bénéficiaires par l'assureur.
            </li>
          </ol>

          <h2 id="documents">Documents, délais et coûts</h2>
          <p>
            Les pièces demandées sont l'acte de décès, les pièces d'identité des bénéficiaires, un
            RIB, et parfois un certificat d'hérédité ou un justificatif de qualité de bénéficiaire.
            L'assureur règle le capital dans un délai encadré par la loi (en principe un mois après réception du
            dossier complet, à vérifier dans votre contrat) ; au-delà, des intérêts de retard sont
            dus. Les droits de succession sont payés avec la déclaration. Les frais du notaire,
            lorsqu'il intervient, s'ajoutent aux droits.
          </p>

          <h2 id="checklist">Check-list</h2>
          <ul>
            <li>Les primes versées avant et après {agePivot} ans sont distinguées sur le relevé.</li>
            <li>L'abattement de {euros(abattementGlobal)} n'est pas compté par bénéficiaire ni par contrat.</li>
            <li>La clause bénéficiaire est nominative, avec un bénéficiaire de second rang.</li>
            <li>Le notaire connaît l'existence des contrats.</li>
            <li>Les liquidités nécessaires à votre propre retraite sont conservées hors contrat.</li>
            <li>Une alternative (donation, démembrement) a été comparée.</li>
          </ul>

          <h2 id="tableau">Quand ça vaut le coup, quand éviter</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>L'assurance-vie après {agePivot} ans peut valoir le coup si…</th>
                  <th>Mieux vaut y réfléchir à deux fois si…</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>vous visez une transmission et un capital qui peut progresser sur plusieurs années</td>
                  <td>le capital est modeste et les frais du contrat sont élevés</td>
                </tr>
                <tr>
                  <td>vos héritiers ne sont pas déjà sous leur abattement personnel</td>
                  <td>ils sont exonérés de toute façon (conjoint, partenaire de Pacs)</td>
                </tr>
                <tr>
                  <td>vous gardez des liquidités suffisantes pour votre propre retraite</td>
                  <td>vous verseriez la quasi-totalité de votre épargne disponible</td>
                </tr>
                <tr>
                  <td>vous voulez désigner librement vos bénéficiaires</td>
                  <td>une donation, bénéficiant d'abattements propres, serait plus adaptée</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="pieges">Pièges fréquents</h2>
          <ul>
            <li>
              <strong>Croire à un abattement de {euros(abattement990I)} après {agePivot} ans :</strong>{" "}
              il ne vaut que pour les primes versées avant cet âge.
            </li>
            <li>
              <strong>Multiplier les contrats pour multiplier l'abattement :</strong> il est
              global.
            </li>
            <li>
              <strong>Oublier que les primes sont taxées même en cas de perte :</strong> la valeur
              de transmission peut être inférieure à la base réintégrée.
            </li>
            <li>
              <strong>Laisser une clause floue ou périmée :</strong> source de litiges.
            </li>
            <li>
              <strong>Verser sans regarder les frais :</strong> l'économie de droits peut être
              absorbée par des frais élevés.
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Que se passe-t-il pour une assurance-vie après 70 ans ?</h3>
          <p>
            Elle reste utilisable : vous pouvez continuer à verser et racheter. Ce qui change est
            la fiscalité du décès : les primes versées après {agePivot} ans sont taxées selon
            l'article 757 B, avec un abattement global de {euros(abattementGlobal)}, et non selon
            l'article 990 I.
          </p>

          <h3>Les intérêts d'une assurance-vie après 70 ans sont-ils taxés au décès ?</h3>
          <p>
            Non, les intérêts et gains produits par les primes versées après {agePivot} ans sont
            exonérés de droits de succession. Seules les primes dépassant {euros(abattementGlobal)}{" "}
            sont réintégrées.
          </p>

          <h3>Quel est l'intérêt d'une assurance-vie après 70 ans ?</h3>
          <p>
            L'exonération des gains pour la transmission, la libre désignation des bénéficiaires et
            la disponibilité de l'épargne. L'avantage dépend de la valeur finale du contrat et des
            frais ; il n'est jamais garanti, puisque les unités de compte peuvent perdre de la
            valeur.
          </p>

          <h3>Faut-il déclarer l'assurance-vie au notaire ?</h3>
          <p>
            Oui, il est prudent de l'informer : même si le capital est versé hors succession, les
            primes versées après {agePivot} ans au-delà de l'abattement entrent dans l'actif
            successoral, et le notaire doit en tenir compte dans la déclaration.
          </p>

          <h3>Mon conjoint paie-t-il des droits sur mon assurance-vie ?</h3>
          <p>
            Non. Le conjoint survivant et le partenaire de Pacs sont exonérés, sur les deux
            régimes.
          </p>

          <h3>Peut-on encore ouvrir une assurance-vie après 70 ans ?</h3>
          <p>
            Oui, il n'y a pas d'âge limite légal, même si certains assureurs fixent leurs propres
            plafonds d'âge. Les primes versées seront alors, dès l'ouverture, soumises au régime
            de l'article 757 B.
          </p>

          <h3>Vaut-il mieux donner de son vivant que verser sur une assurance-vie ?</h3>
          <p>
            Cela dépend. La donation transfère la propriété immédiatement et bénéficie d'un
            abattement renouvelable de {euros(abattementEnfant)} par parent et par enfant, mais
            elle est irrévocable. L'assurance-vie reste disponible. Voir{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">notre comparatif</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Après {agePivot} ans, l'assurance-vie change de nature fiscale : elle n'est plus
            l'outil à abattement généreux que l'on décrit souvent, mais un contrat dont les primes
            bénéficient d'un petit abattement global et dont les gains échappent aux droits. Dans
            notre exemple, la différence avec un placement ordinaire est de {eur(differenceTotale)},
            réelle mais très dépendante de la valeur finale du contrat et des abattements restants
            des héritiers.
          </p>
          <p>
            Avant de verser, la bonne démarche est de faire le point sur les abattements de vos
            héritiers, de comparer avec une donation, de soigner la clause et de garder vos
            liquidités. Pour la vue d'ensemble, voir{" "}
            <a href="/strategies/assurance-vie-retraite">
              la page assurance-vie pour la retraite
            </a>{" "}
            et{" "}
            <a href="/guide/preparer-sa-retraite-guide-complet">
              le guide complet pour préparer sa retraite
            </a>
            . Pour situer cette décision dans votre patrimoine, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> peut servir de
            point de départ.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li>
              <a href="/guide/assurance-vie-a-60-ans-ou-a-la-retraite">
                Assurance-vie à 60 ans ou à la retraite : ouvrir, garder ou racheter ?
              </a>
            </li>
            <li>
              <a href="/guide/clause-beneficiaire-assurance-vie-comment-la-rediger">
                Clause bénéficiaire : comment la rédiger
              </a>
            </li>
            <li>
              <a href="/guide/assurance-vie-garantie-repartir-plusieurs-contrats">
                Garantie des contrats : répartir plusieurs assurances-vie
              </a>
            </li>
            <li>
              <a href="/guide/donation-ou-assurance-vie-transmission">
                Donation ou assurance-vie pour transmettre
              </a>
            </li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en novembre 2026 :</p>
          <ul>
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé ; en matière
              de succession, un notaire peut examiner votre situation cas par cas. Les règles,
              abattements et barèmes cités sont ceux en vigueur en novembre 2026 et peuvent être
              modifiés. L'exemple chiffré est une illustration pédagogique sans lien avec un cas
              réel : la valeur finale du contrat est une hypothèse et non un rendement attendu.
              Les supports en unités de compte présentent un risque de perte en capital.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Transmettre se prépare avant 70 ans, et se vérifie après." />
    </>
  );
}
