import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  DECUMULATION,
  ENVELOPPES_NOV2026,
  FISCALITE,
  V3_PEA_RETRAITE,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const R = V3_PEA_RETRAITE;
const tauxPS = FISCALITE.prelevementsSociaux.pea; // 18,6 %
const tauxIR = FISCALITE.pfuIR; // 12,8 % avant 5 ans
const delai = FISCALITE.peaExonerationIRApres; // 5 ans
const plafond = ENVELOPPES_NOV2026.peaPlafondVersements;
const tauxConversion = DECUMULATION.tauxConversionRente65.defaut;
const rendement = DECUMULATION.rendementCapitalPendantRetraits;

const r2 = (n) => Math.round(n * 100) / 100;
const de = (base, taux) => r2((base * taux) / 100);
const eur = (n) =>
  Number.isInteger(r2(n))
    ? euros(n)
    : new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(r2(n));

// ---- Cas A : plan de plus de 5 ans, retrait partiel ----
const A = R.planApres5Ans;
const aGainsTotaux = A.valeur - A.versements;
const aPartGainsPct = r2((aGainsTotaux / A.valeur) * 100);
const aGainsRetrait = r2((A.retraitAnnuel * aGainsTotaux) / A.valeur);
const aCapitalRetrait = r2(A.retraitAnnuel - aGainsRetrait);
const aPS = de(aGainsRetrait, tauxPS);
const aNet = r2(A.retraitAnnuel - aPS);
const aPoidsPct = r2((aPS / A.retraitAnnuel) * 100);

// Durée indicative d'un capital soumis à ce retrait annuel (retrait en début d'année,
// rendement net constant) : illustration, pas une prévision.
const dureeCapital = (() => {
  let k = A.valeur;
  let ans = 0;
  while (k > 0 && ans < 60) {
    k = (k - A.retraitAnnuel) * (1 + rendement / 100);
    ans += 1;
    if (k <= 0) break;
  }
  return ans;
})();

// ---- Cas B : retrait avant 5 ans (clôture totale) ----
const B = R.planAvant5Ans;
const bGains = B.valeur - B.versements;
const bIR = de(bGains, tauxIR);
const bPS = de(bGains, tauxPS);
const bTotal = r2(bIR + bPS);
const bNet = r2(B.valeur - bTotal);

// ---- Cas C : conversion du capital en rente ----
const renteAnnuelle = r2((A.valeur * tauxConversion) / 100);
const renteMensuelle = r2(renteAnnuelle / 12);

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : comment sont imposés les revenus d'un PEA ? Fiche F22449, vérifiée le 15 avril 2026 : retrait avant et après 5 ans, retrait partiel, rente viagère, cas où le plan n'est pas clôturé",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22449",
  },
  {
    label:
      "Service-Public.gouv.fr — Plan d'épargne en actions (PEA), fiche F2385, vérifiée le 22 mai 2026 : plafond de versements, date d'ouverture, titres éligibles",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2385",
  },
  {
    label:
      "Service-Public.gouv.fr — Prélèvements sociaux (CSG, CRDS) sur les revenus du patrimoine et de placements, fiche F2329",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2329",
  },
  {
    label:
      "impots.gouv.fr — Les revenus mobiliers (mise à jour du 8 avril 2026) : déclaration des gains issus de retraits, imprimé fiscal unique",
    url: "https://www.impots.gouv.fr/particulier/les-revenus-mobiliers",
  },
  {
    label:
      "Légifrance — Code général des impôts, art. 150-0 A et 157 (imposition et exonération des gains du PEA)",
    url: "https://www.legifrance.gouv.fr/",
  },
];

export default function GuideSortirPeaRetraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide action · PEA et décaissement</span>
          <h1>Sortir du PEA à la retraite : retraits, rente et fiscalité</h1>
          <p className="sub">
            Retrait partiel sans clôturer, rente viagère, retrait avant {delai} ans : la
            procédure, la fiscalité et deux cas chiffrés. Mis à jour en novembre 2026.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> après {delai} ans, vous pouvez retirer de l'argent de
              votre PEA par petits montants sans le clôturer, ou le convertir en rente viagère.
              Dans les deux cas, plus d'impôt sur le revenu sur les gains ; seuls restent les
              prélèvements sociaux ({pct(tauxPS)} retenu ici, à confirmer selon la date
              d'acquisition des gains). Avant {delai} ans, tout retrait clôture le plan et les gains
              sont imposés à {pct(tauxIR)}. Exemple illustratif : un retrait de {euros(A.retraitAnnuel)}{" "}
              sur un plan de {euros(A.valeur)} ne contient que {eur(aGainsRetrait)} de gains et
              supporte {eur(aPS)} de prélèvements sociaux.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#options">Quelles sont les façons de sortir d'un PEA à la retraite ?</a></li>
              <li><a href="#retrait-partiel">Comment faire un retrait partiel après {delai} ans, étape par étape ?</a></li>
              <li><a href="#exemple">Combien d'impôt sur un retrait partiel ? Un exemple chiffré</a></li>
              <li><a href="#avant-5-ans">Que se passe-t-il si l'on retire avant {delai} ans ?</a></li>
              <li><a href="#rente">Comment fonctionne la rente viagère du PEA ?</a></li>
              <li><a href="#choix">Retraits ou rente : quand préférer l'un ou l'autre ?</a></li>
              <li><a href="#pieges">Quels pièges éviter ?</a></li>
              <li><a href="#checklist">Check-list, documents et délais</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#aller-plus-loin">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Le PEA est souvent présenté comme une enveloppe de constitution du capital. Quand vient
            le moment de s'en servir, les questions pratiques surgissent : puis-je retirer sans tout
            fermer, que devient mon plan si je retire un peu, existe-t-il vraiment une rente ?
          </p>
          <p>
            Prenons un profil illustratif, sans lien avec un cas réel : une retraitée de 64 ans,
            PEA ouvert il y a plus de douze ans, valant {euros(A.valeur)} pour {euros(A.versements)}{" "}
            versés. Elle cherche à compléter sa pension par un retrait d'environ {euros(A.retraitAnnuel / 12)}{" "}
            par mois, sans solder son plan. Ce guide décrit ce qui est possible, ce que cela coûte, et les
            erreurs à éviter. Il ne dit pas combien retirer : cela dépend de vos besoins, de vos
            autres revenus et de la durée à couvrir.
          </p>

          <h2 id="options">Quelles sont les façons de sortir d'un PEA à la retraite ?</h2>
          <p>
            Trois sorties existent après {delai} ans (retrait partiel, retrait total, rente viagère),
            et une seule avant. Le choix détermine à la fois l'imposition et ce qu'il reste de
            l'enveloppe.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Sortie</th>
                  <th>Le plan est-il clôturé ?</th>
                  <th>Impôt sur le revenu</th>
                  <th>Prélèvements sociaux</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Retrait partiel, plan de plus de {delai} ans</td>
                  <td>Non, il reste ouvert (fiche F22449)</td>
                  <td>Exonéré sur les gains</td>
                  <td>{pct(tauxPS)} sur la part de gains retirée (taux à confirmer)</td>
                </tr>
                <tr>
                  <td>Retrait total, plan de plus de {delai} ans</td>
                  <td>Oui</td>
                  <td>Exonéré sur les gains</td>
                  <td>{pct(tauxPS)} sur l'ensemble des gains</td>
                </tr>
                <tr>
                  <td>Rente viagère, plan de plus de {delai} ans</td>
                  <td>Le plan est dénoué</td>
                  <td>Exonérée</td>
                  {/* À VÉRIFIER : assiette des prélèvements sociaux sur la rente viagère issue d'un PEA (fraction selon l'âge, comme une RVTO ?) et taux applicable — F22449 dit seulement « soumise aux prélèvements sociaux » */}
                  <td>Dues, selon des règles propres à confirmer auprès de l'organisme</td>
                </tr>
                <tr>
                  <td>Retrait, plan de moins de {delai} ans</td>
                  <td>Oui, sauf cas particuliers</td>
                  <td>{pct(tauxIR)} sur le gain net depuis l'ouverture, ou barème sur option</td>
                  <td>{pct(tauxPS)} sur les gains</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            L'âge à retenir est celui du plan, pas le vôtre : le délai de {delai} ans court depuis le
            premier versement. Un PEA ouvert il y a quatre ans par une personne de 66 ans reste un
            plan de moins de {delai} ans.
          </p>

          <h2 id="retrait-partiel">Comment faire un retrait partiel après {delai} ans, étape par étape ?</h2>
          <ol>
            <li>
              <strong>Vérifier la date d'ouverture.</strong> Elle correspond au premier versement
              (fiche F2385) ; elle figure sur votre relevé ou sur l'avis d'ouverture.
            </li>
            <li>
              <strong>Calculer la part de gains de votre plan.</strong> Gains = valeur du plan −
              versements cumulés. Dans le cas illustratif, {euros(A.valeur)} − {euros(A.versements)}{" "}
              = {euros(aGainsTotaux)}, soit {pct(aPartGainsPct)} de la valeur.
            </li>
            <li>
              <strong>Prévoir les espèces nécessaires.</strong> Un retrait se paie sur le compte
              espèces du PEA : si vos liquidités sont insuffisantes, il faut vendre des lignes, ce
              qui peut cristalliser une baisse. Gardez une réserve d'espèces pour plusieurs retraits.
            </li>
            <li>
              <strong>Faire la demande à l'établissement.</strong> En ligne ou par courrier, en
              précisant « retrait partiel » : si vous demandez la clôture, le plan disparaît.
            </li>
            <li>
              <strong>Conserver l'imprimé fiscal unique.</strong> L'établissement transmet les gains
              à l'administration ; vérifiez le montant prérempli dans votre déclaration au
              printemps suivant.
            </li>
            <li>
              <strong>Continuer à gérer le plan restant.</strong> Après {delai} ans, un retrait
              partiel n'empêche pas de verser de nouveau, dans la limite du plafond de{" "}
              {euros(plafond)} de versements cumulés (vérifier auprès de l'établissement).
            </li>
          </ol>
          <p>
            Délai habituel : quelques jours ouvrés entre la demande et l'arrivée des fonds, plus
            si des ventes de titres sont nécessaires. Frais : en principe aucun frais de retrait
            partiel, mais des frais de courtage si vous vendez des lignes (vérifier votre grille).
          </p>

          <h2 id="exemple">Combien d'impôt sur un retrait partiel ? Un exemple chiffré</h2>
          <div className="note">
            <p>
              Cas purement illustratif. Il suppose un plan de plus de {delai} ans, un taux de
              prélèvements sociaux de {pct(tauxPS)} sur toute la part de gains (le taux exact peut
              dépendre de la date d'acquisition des gains) et un calcul de la part de gains au
              prorata du retrait. Ce n'est pas une préconisation de montant.
            </p>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Retrait annuel de {euros(A.retraitAnnuel)}</th>
                  <th>Calcul</th>
                  <th>Résultat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gains du plan</td>
                  <td>{euros(A.valeur)} − {euros(A.versements)}</td>
                  <td>{euros(aGainsTotaux)} ({pct(aPartGainsPct)} de la valeur)</td>
                </tr>
                <tr>
                  <td>Part de gains du retrait</td>
                  <td>{euros(A.retraitAnnuel)} × {pct(aPartGainsPct)}</td>
                  <td>{eur(aGainsRetrait)}</td>
                </tr>
                <tr>
                  <td>Part de capital du retrait</td>
                  <td>{euros(A.retraitAnnuel)} − {eur(aGainsRetrait)}</td>
                  <td>{eur(aCapitalRetrait)}, non imposé</td>
                </tr>
                <tr>
                  <td>Impôt sur le revenu</td>
                  <td>Plan de plus de {delai} ans</td>
                  <td>0 €</td>
                </tr>
                <tr>
                  <td>Prélèvements sociaux</td>
                  <td>{eur(aGainsRetrait)} × {pct(tauxPS)}</td>
                  <td>{eur(aPS)}</td>
                </tr>
                <tr>
                  <td>Somme nette perçue</td>
                  <td>{euros(A.retraitAnnuel)} − {eur(aPS)}</td>
                  <td>{eur(aNet)}, soit {pct(aPoidsPct)} de fiscalité</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Comme pour une assurance-vie, c'est la part de gains du plan qui détermine le poids de
            la fiscalité : plus le plan a progressé, plus chaque euro retiré en contient. Pour
            situer cet ordre de grandeur, le même retrait sur un contrat d'assurance-vie obéit à une
            autre mécanique, décrite dans{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">notre guide sur le rachat partiel</a>.
          </p>
          <p>
            Sur la durée : à {euros(A.retraitAnnuel)} par an, avec une hypothèse de rendement net
            de {pct(rendement)} par an, ce capital de {euros(A.valeur)} durerait environ{" "}
            {dureeCapital} ans. L'hypothèse de rendement n'est pas une prévision : un PEA investi en
            actions peut perdre de la valeur, et une baisse en début de retraits raccourcit
            nettement cette durée.
          </p>

          <h2 id="avant-5-ans">Que se passe-t-il si l'on retire avant {delai} ans ?</h2>
          <p>
            Un retrait avant {delai} ans entraîne en principe la clôture du plan, et le gain net
            réalisé depuis l'ouverture est imposé à {pct(tauxIR)}, ou au barème sur option
            (fiche F22449). Les prélèvements sociaux s'y ajoutent.
          </p>
          <p>
            Exemple illustratif : un plan de {euros(B.valeur)} pour {euros(B.versements)} de
            versements, soit {euros(bGains)} de gains. Impôt de {pct(tauxIR)} :{" "}
            {eur(bIR)} ; prélèvements sociaux de {pct(tauxPS)} : {eur(bPS)} ; total {eur(bTotal)} ;
            somme nette {eur(bNet)}, soit {pct(r2((bTotal / B.valeur) * 100))} de la valeur du plan et{" "}
            {pct(r2((bTotal / bGains) * 100))} des gains. Le plan, lui, n'existe plus.
          </p>
          <p>
            Des exceptions existent : la fiche F22449 cite notamment le décès du titulaire et le
            financement de la création ou de la reprise d'une entreprise pour l'exonération d'impôt
            sur le revenu, et le licenciement, l'invalidité (2<sup>e</sup> ou 3<sup>e</sup>
            catégorie) ou la mise à la retraite pour l'absence de clôture du plan, concernant le
            titulaire ou son conjoint. Elles s'apprécient au cas par cas, sur justificatif.
          </p>

          <h2 id="rente">Comment fonctionne la rente viagère du PEA ?</h2>
          <p>
            Après {delai} ans, le plan peut se dénouer par une rente viagère : le capital est
            converti en revenu versé jusqu'au décès. Cette rente est exonérée d'impôt sur le
            revenu, mais soumise aux prélèvements sociaux (fiche F22449).
          </p>
          <p>
            En pratique, la rente est un produit d'assurance : elle suppose un contrat avec un
            assureur, et peu d'établissements la proposent directement. Avant de l'envisager,
            vérifiez qu'elle est offerte, à quelles conditions, et avec quelle option (réversion,
            indexation). Les règles précises de prélèvements sociaux sur cette rente sont à
            vérifier auprès de l'organisme ; ce guide ne les chiffre pas.
          </p>
          <p>
            Ordre de grandeur illustratif : à un taux de conversion de {pct(tauxConversion)} à 65
            ans, un capital de {euros(A.valeur)} donnerait une rente brute d'environ{" "}
            {euros(renteAnnuelle)} par an, soit {eur(renteMensuelle)} par mois. Ce taux varie
            selon l'âge, le sexe, les options et l'assureur ; la rente d'un contrat standard n'est
            en général pas indexée sur l'inflation. La conversion est définitive et le capital
            n'est plus disponible : comparez avec{" "}
            <a href="/guide/rente-viagere-calcul-montant-taux-de-conversion">notre guide sur le calcul d'une rente viagère</a>{" "}
            et <a href="/guide/inconvenients-rente-viagere">ses inconvénients</a>.
          </p>

          <h2 id="choix">Retraits ou rente : quand préférer l'un ou l'autre ?</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Retraits partiels</th>
                  <th>Rente viagère</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Capital disponible</td>
                  <td>Oui, modulable chaque année</td>
                  <td>Non, converti</td>
                </tr>
                <tr>
                  <td>Revenu garanti à vie</td>
                  <td>Non : dépend de la durée de vie et des marchés</td>
                  <td>Oui, tant que l'assureur tient ses engagements</td>
                </tr>
                <tr>
                  <td>Risque de marché</td>
                  <td>Supporté par vous</td>
                  <td>Supporté par l'assureur</td>
                </tr>
                <tr>
                  <td>Transmission du solde</td>
                  <td>Le solde du plan se transmet à la succession</td>
                  <td>Pas de capital à transmettre, sauf option de réversion</td>
                </tr>
                <tr>
                  <td>Quand y penser</td>
                  <td>Besoin de souplesse, capital que l'on veut laisser ou garder disponible</td>
                  <td>Souhait de sécuriser une part des dépenses fixes, peu d'appétence pour le risque</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Beaucoup de retraités n'ont pas à choisir l'un ou l'autre : une part du capital peut
            sécuriser le socle des dépenses, le reste rester disponible en retraits. Cette
            répartition relève d'une analyse d'ensemble, par exemple dans{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">le comparatif rente ou retraits programmés</a>.
            Quant à la place du PEA dans l'ordre de retrait de vos enveloppes, elle fait l'objet de
            notre guide sur{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a>.
          </p>

          <h2 id="pieges">Quels pièges éviter ?</h2>
          <ul>
            <li>
              <strong>Demander la clôture au lieu d'un retrait partiel.</strong> Vous perdriez
              l'enveloppe et son régime de faveur pour les gains à venir.
            </li>
            <li>
              <strong>Compter l'âge du plan comme votre âge.</strong> C'est la date du premier
              versement qui compte, pas votre date de naissance.
            </li>
            <li>
              <strong>Vendre des actions en baisse pour financer un retrait.</strong> Conserver
              quelques mois d'espèces dans le plan évite de figer une perte.
            </li>
            <li>
              <strong>Croire que « exonéré » veut dire « sans prélèvements ».</strong> Les
              prélèvements sociaux restent dus après {delai} ans.
            </li>
            <li>
              <strong>Oublier l'effet sur le revenu fiscal de référence.</strong> Les gains retirés
              d'un PEA y entrent en principe, ce qui peut jouer sur certains seuils (vérifier votre
              situation).
            </li>
            <li>
              <strong>Convertir en rente sans comparer.</strong> L'opération est irréversible ; un
              taux de conversion se compare entre assureurs et selon les options.
            </li>
          </ul>

          <h2 id="checklist">Check-list, documents et délais</h2>
          <ol>
            <li>Date d'ouverture du plan (premier versement) : plus ou moins de {delai} ans ?</li>
            <li>Valeur du plan, versements cumulés et espèces disponibles sur le compte.</li>
            <li>Besoin annuel visé, et durée sur laquelle le capital doit tenir.</li>
            <li>Grille des frais de courtage si des ventes de titres sont nécessaires.</li>
            <li>Demande de « retrait partiel » (et non de clôture), à conserver par écrit.</li>
            <li>Imprimé fiscal unique de l'année suivante, à vérifier dans la déclaration.</li>
            <li>Si la rente est envisagée : conditions, options, taux et fiscalité écrits.</li>
          </ol>
          <p>
            Pièces : pièce d'identité, relevé récent du plan et RIB de réception. Pour une rente,
            l'assureur demande en plus des justificatifs d'état civil.
          </p>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Peut-on retirer de l'argent de son PEA sans le clôturer ?</h3>
          <p>
            Oui, à condition que le plan ait plus de {delai} ans. Un retrait partiel ne le clôture
            pas ; seul un retrait total des actifs le ferme (fiche F22449).
          </p>

          <h3>Que se passe-t-il si je retire de l'argent de mon PEA avant 5 ans ?</h3>
          <p>
            Le plan est en principe clos, et le gain net depuis l'ouverture est imposé à{" "}
            {pct(tauxIR)}, plus les prélèvements sociaux. Quelques cas particuliers évitent la
            clôture ou l'impôt (décès, licenciement, invalidité, mise à la retraite, création
            d'entreprise, selon le cas).
          </p>

          <h3>Y a-t-il une rente viagère sur un PEA ?</h3>
          <p>
            Oui, après {delai} ans : le plan peut se dénouer en rente exonérée d'impôt sur le
            revenu et soumise aux prélèvements sociaux. Elle suppose un organisme qui la propose,
            ce qui n'est pas le cas de tous les établissements.
          </p>

          <h3>Quels impôts après 5 ans sur un PEA ?</h3>
          <p>
            Pas d'impôt sur le revenu sur les gains, mais des prélèvements sociaux ({pct(tauxPS)}{" "}
            retenu dans ce guide). Les revenus de titres non cotés dépassant la limite annuelle de
            10 % de leur valeur d'acquisition font exception (fiche F22449).
          </p>

          <h3>Faut-il déclarer un retrait de PEA aux impôts ?</h3>
          <p>
            Oui, pour la part de gains : l'établissement la transmet à l'administration et vous
            adresse un imprimé fiscal unique. Les montants sont en principe préremplis, à vérifier
            lors de la déclaration.
          </p>

          <h3>Peut-on continuer à verser sur un PEA après un retrait ?</h3>
          <p>
            Après {delai} ans et un retrait partiel, c'est en principe possible, dans la limite du
            plafond de {euros(plafond)} de versements cumulés. Vérifiez la règle applicable à votre
            situation auprès de l'établissement.
          </p>

          <h3>Que devient mon PEA au décès ?</h3>
          <p>
            Le plan est clôturé au décès du titulaire et son contenu entre dans la succession. Les
            gains ne sont alors pas imposés à l'impôt sur le revenu dans le cas général, mais la
            transmission obéit aux règles successorales : voir notre guide sur{" "}
            <a href="/guide/epargne-retraite-en-couple-et-transmission">la retraite en couple et la transmission</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            À la retraite, un PEA de plus de {delai} ans offre un levier simple : retirer ce dont
            on a besoin, sans fermer le plan, et ne supporter que les prélèvements sociaux sur la
            part de gains. Dans le cas illustratif de ce guide, cela représente {pct(aPoidsPct)} du
            montant retiré. Avant {delai} ans, la mécanique est radicalement différente : clôture et
            imposition à {pct(tauxIR)}.
          </p>
          <p>
            Ne pas anticiper ces règles a un coût concret : demander la mauvaise opération, vendre
            au mauvais moment, ou convertir en rente un capital dont on aurait voulu garder la
            disponibilité.
          </p>
          <p>
            Le PEA n'est qu'une enveloppe parmi d'autres : pour décider laquelle utiliser en premier
            et dans quelle proportion, voyez{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a>. Et pour
            replacer ces retraits dans votre trajectoire globale, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> est un point de
            départ.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li>
              <a href="/guide/ordre-de-decaissement-retraite">Dans quel ordre retirer ses enveloppes à la retraite</a>
            </li>
            <li>
              <a href="/guide/inconvenients-du-pea">Les inconvénients du PEA</a>
            </li>
            <li>
              <a href="/guide/pea-ou-assurance-vie">PEA ou assurance-vie</a>
            </li>
            <li>
              <a href="/guide/transferer-son-pea-procedure-frais">Transférer son PEA : procédure et frais</a>
            </li>
            <li>
              <a href="/guide/investir-100000-euros-pour-la-retraite">Investir 100 000 € pour la retraite</a>
            </li>
            <li>
              <a href="/strategies/decumulation">Notre page stratégie : la décumulation</a>
            </li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en novembre 2026, sauf date contraire indiquée :</p>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seuls les
              montants communiqués par votre établissement et votre avis d'impôt font foi. Les règles
              et taux cités sont ceux en vigueur en novembre 2026, et peuvent évoluer avec les lois
              de finances et de financement de la sécurité sociale pour 2027, non adoptées à cette
              date. Les cas chiffrés sont des illustrations pédagogiques. Un PEA investi en actions
              présente un risque de perte en capital, et les performances passées ne préjugent pas
              des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Retirer du PEA se calcule. Le bon rythme de décaissement se construit." />
    </>
  );
}
