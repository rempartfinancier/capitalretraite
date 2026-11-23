import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  AV_RACHAT,
  ENVELOPPES_NOV2026,
  FISCALITE,
  FRAIS_TYPES,
  IMMO,
  PER_PLAFOND,
  V3_AVB_100K,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const capital = V3_AVB_100K.capital; // 100 000 €
const depense = V3_AVB_100K.depenseMensuelleReference; // 2 500 €
const moisSecurite = V3_AVB_100K.moisFondsSecurite; // 6
const ageDepart = V3_AVB_100K.ageDepart; // 64
const dureeAv = AV_RACHAT.dureeTauxReduitAnnees; // 8
const dureePea = FISCALITE.peaExonerationIRApres; // 5
const pass = PER_PLAFOND.pass2025;
const fraisScpi = FRAIS_TYPES.scpiEntree;
const plafondPeaVersements = ENVELOPPES_NOV2026.peaPlafondVersements;
const maj = V3_AVB_100K.maj;

const r2 = (n) => Math.round(n * 100) / 100;
const part = (n, total) => r2((n / total) * 100);

// Plafond annuel de déduction PER d'un salarié : 10 % des revenus d'activité nets de frais
// (salaire net imposable après l'abattement forfaitaire de 10 %, comme dans le guide du plafond PER),
// limités à 8 PASS, plancher 10 % du PASS.
const abattementFrais = PER_PLAFOND.tauxAbattementFraisProfessionnels;
const plafondPer = (revenu) => {
  const plancher = (pass * PER_PLAFOND.tauxPlancherPass) / 100;
  const maxRevenus = pass * PER_PLAFOND.multiplePassMaximum;
  const revenuNetDeFrais = revenu * (1 - abattementFrais / 100);
  const plafond = (Math.min(revenuNetDeFrais, maxRevenus) * PER_PLAFOND.tauxRevenusActivite) / 100;
  return Math.round(Math.max(plafond, plancher));
};

const profils = V3_AVB_100K.profils.map((p) => {
  const investi = p.per + p.av + p.pea + p.immo;
  const securite = capital - investi;
  const horizon = Math.max(ageDepart - p.age, 0);
  const plafond = plafondPer(p.revenuNetImposable);
  const anneesPer = p.per > 0 ? Math.ceil(p.per / plafond) : 0;
  return {
    ...p,
    securite,
    moisSecurite: r2(securite / depense),
    horizon,
    plafond,
    anneesPer,
    economiePer: r2((p.per * p.tmi) / 100),
    ageAv8Ans: p.age + dureeAv,
    ageAvPea: p.age + dureePea,
    av8AvantDepart: p.age + dureeAv <= ageDepart,
  };
});
const [pA, pB, pC] = profils;
const noms = {
  construction: "Profil 1 · phase de constitution",
  approche: "Profil 2 · approche de la retraite",
  decaissement: "Profil 3 · entrée en retraite",
};

const fondsSecuriteBase = moisSecurite * depense; // 15 000 €
const montantSCPI = pA.immo;
const fraisScpiMinP = r2((montantSCPI * fraisScpi.min) / 100);
const fraisScpiMaxP = r2((montantSCPI * fraisScpi.max) / 100);
const variationPrixPart = IMMO.scpiMarche.variationPrixPart2025;

const sources = [
  {
    label:
      "Service-Public.gouv.fr, fiche F34982 : plan d'épargne retraite (PER), versements, déduction, sortie",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34982",
  },
  {
    label:
      "Service-Public.gouv.fr, fiche F14709 : cotisations d'épargne retraite (déduction), vérifiée le 15 avril 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14709",
  },
  {
    label:
      "Service-Public.gouv.fr, fiche F22414 : fiscalité des revenus d'un contrat d'assurance-vie",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22414",
  },
  {
    label:
      "impots.gouv.fr, « Les revenus mobiliers » (mise à jour du 8 avril 2026) : prélèvements sociaux, PEA, assurance-vie",
    url: "https://www.impots.gouv.fr/particulier/les-revenus-mobiliers",
  },
  {
    label:
      "AMF, espace épargnants : risques, frais et documents d'information des placements (assurance-vie, PEA, SCPI)",
    url: "https://www.amf-france.org/fr/espace-epargnants",
  },
  {
    label:
      "info-retraite.fr : estimer ses droits à la retraite avant de dimensionner son épargne",
    url: "https://www.info-retraite.fr",
  },
  {
    label: "Légifrance, Code monétaire et financier et Code général des impôts : accès par la racine du site",
    url: "https://www.legifrance.gouv.fr",
  },
];

export default function GuideInvestir100000Retraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · Construire son capital retraite</span>
          <h1>Investir {euros(capital)} pour la retraite : la démarche, selon l'âge</h1>
          <p className="sub">
            Fonds de sécurité, horizon, tranche d'imposition, répartition entre PER, assurance-vie,
            PEA et immobilier : sept étapes et trois profils composites chiffrés, sans promesse de
            rendement. Mis à jour en {maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> il n'existe pas de « meilleur placement » pour{" "}
              {euros(capital)}, parce que la bonne répartition dépend de votre âge, de la date des
              retraits et de votre tranche d'imposition. Une démarche en sept étapes évite les
              erreurs les plus coûteuses : d'abord un fonds de sécurité (par exemple{" "}
              {moisSecurite} mois de dépenses, soit {euros(fondsSecuriteBase)} pour{" "}
              {euros(depense)} par mois), ensuite l'horizon de chaque poche, puis seulement le choix
              des enveloppes. Les trois profils de ce guide, à {pA.age}, {pB.age} et {pC.age} ans,
              illustrent comment la répartition change avec l'âge et l'horizon, sans qu'aucun
              rendement ne soit promis ni qu'aucune de ces répartitions soit une recommandation.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#avant">Que faut-il décider avant de choisir un placement ?</a></li>
              <li><a href="#etapes">Quelle démarche suivre, en sept étapes ?</a></li>
              <li><a href="#enveloppes">À quoi sert chaque enveloppe, et que change l'âge ?</a></li>
              <li><a href="#calendrier">Quel calendrier selon votre âge ? Les seuils de 5 et {dureeAv} ans</a></li>
              <li><a href="#profils">Trois profils composites chiffrés</a></li>
              <li><a href="#per">Peut-on vraiment verser {euros(pA.per)} sur un PER ?</a></li>
              <li><a href="#immo">Quelle place pour l'immobilier ?</a></li>
              <li><a href="#documents">Documents, délais et frais</a></li>
              <li><a href="#checklist">Check-list</a></li>
              <li><a href="#tableau">Quand ça vaut le coup, quand éviter</a></li>
              <li><a href="#pieges">Pièges fréquents</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Prenons un cas composite, sans lien avec une personne réelle : un couple qui vient de
            percevoir {euros(capital)} (héritage, vente, prime de départ) et se demande ce qu'il
            en fera « pour la retraite ». Les articles et les démarchages leur proposent chacun une
            réponse : tout sur un PER pour payer moins d'impôt, tout sur l'assurance-vie parce que
            c'est souple, tout dans la pierre parce que c'est du concret. Chacune de ces réponses
            est défendable pour quelqu'un, et fausse pour quelqu'un d'autre.
          </p>
          <p>
            Ce guide propose une méthode, pas un produit. Pour comparer les enveloppes une à une,
            voir{" "}
            <a href="/guide/meilleure-enveloppe-retraite">
              notre comparatif des enveloppes retraite
            </a>{" "}
            ; pour le choix PER ou assurance-vie selon votre tranche d'imposition,{" "}
            <a href="/guide/per-ou-assurance-vie-selon-age-et-tmi">
              le guide dédié
            </a>
            .
          </p>

          <h2 id="avant">Que faut-il décider avant de choisir un placement ?</h2>
          <p>
            Trois décisions précèdent le choix des enveloppes : la réserve de précaution, le
            calendrier de chaque somme, et le rôle de l'impôt dans votre situation. Elles pèsent
            davantage sur le résultat que le choix d'un support.
          </p>
          <ul>
            <li>
              <strong>La réserve de précaution.</strong> Elle couvre les imprévus sans vous
              obliger à vendre à un mauvais moment. Un repère fréquent est de quelques mois de
              dépenses ; il se module selon la stabilité de vos revenus.
            </li>
            <li>
              <strong>L'horizon de chaque poche.</strong> L'argent qui servira dans moins de cinq
              ans ne se place pas comme celui destiné à vos quinze ou vingt dernières années de
              retraite.
            </li>
            <li>
              <strong>La tranche marginale d'imposition (TMI).</strong> Elle détermine la valeur de
              la déduction d'un PER à l'entrée et le coût de l'impôt à la sortie.
            </li>
          </ul>

          <h2 id="etapes">Quelle démarche suivre, en sept étapes ?</h2>
          <ol>
            <li>
              <strong>Constituer le fonds de sécurité.</strong> {moisSecurite} mois de dépenses,
              soit {euros(fondsSecuriteBase)} avec {euros(depense)} de dépenses mensuelles, sur des
              supports disponibles et sans risque de perte en capital. Cette somme ne fait pas
              partie de l'investissement retraite.
            </li>
            <li>
              <strong>Estimer le besoin.</strong> Consultez votre relevé de carrière sur
              info-retraite.fr pour connaître la pension attendue, puis le{" "}
              <a href="/simulateur-retraite">simulateur de retraite</a> pour situer l'écart avec
              vos dépenses.
            </li>
            <li>
              <strong>Fixer l'horizon par poche.</strong> Partagez le reste en sommes qui serviront
              à court terme (moins de {dureePea} ans), à moyen terme, et beaucoup plus tard, plus
              une éventuelle poche de transmission.
            </li>
            <li>
              <strong>Identifier votre TMI</strong> sur l'avis d'imposition, et estimer celle de la
              retraite (souvent plus basse, sans que ce soit une règle).
            </li>
            <li>
              <strong>Choisir les enveloppes</strong> en fonction de l'horizon, de la liquidité
              voulue et de la fiscalité : PER, assurance-vie, PEA, immobilier (voir ci-dessous).
            </li>
            <li>
              <strong>Mettre en place progressivement.</strong> Un investissement échelonné sur
              plusieurs mois ou plusieurs années limite le risque d'entrer au pire moment, sans
              l'annuler.
            </li>
            <li>
              <strong>Réviser chaque année.</strong> Répartition, frais, plafonds disponibles,
              clause bénéficiaire : une revue annuelle de trente minutes évite l'essentiel des
              dérives.
            </li>
          </ol>

          <h2 id="enveloppes">À quoi sert chaque enveloppe, et que change l'âge ?</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Enveloppe</th>
                  <th>Points forts</th>
                  <th>Limites</th>
                  <th>Plutôt adaptée quand…</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PER</td>
                  <td>Déduction des versements du revenu imposable, dans la limite d'un plafond</td>
                  <td>Épargne bloquée jusqu'à la retraite (sauf cas de déblocage), impôt à la sortie</td>
                  <td>la TMI est élevée aujourd'hui et plus basse à la retraite, l'horizon est long</td>
                </tr>
                <tr>
                  <td>Assurance-vie</td>
                  <td>Disponibilité, fiscalité allégée après {dureeAv} ans, transmission</td>
                  <td>Frais de contrat, perte en capital sur les unités de compte</td>
                  <td>vous voulez de la souplesse et une transmission organisée</td>
                </tr>
                <tr>
                  <td>PEA</td>
                  <td>Exonération d'impôt sur le revenu des gains après {dureePea} ans, prélèvements sociaux dus</td>
                  <td>Plafond de versements de {euros(plafondPeaVersements)}, actions uniquement, risque de perte</td>
                  <td>l'horizon dépasse {dureePea} ans et vous acceptez les variations</td>
                </tr>
                <tr>
                  <td>Immobilier (SCPI, locatif)</td>
                  <td>Revenus potentiels, diversification</td>
                  <td>Frais d'entrée élevés, faible liquidité, loyers et prix non garantis</td>
                  <td>l'horizon est long et le reste du patrimoine est liquide</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Cette grille ne classe pas les enveloppes : elle ne dit pas laquelle est « la
            meilleure », car cela dépend de ce que vous attendez d'elle. Pour la comparaison
            détaillée, voir{" "}
            <a href="/guide/per-vs-assurance-vie-retraite">PER ou assurance-vie</a> et{" "}
            <a href="/guide/pea-ou-assurance-vie">PEA ou assurance-vie</a>.
          </p>

          <h2 id="calendrier">Quel calendrier selon votre âge ? Les seuils de {dureePea} et {dureeAv} ans</h2>
          <p>
            Les enveloppes ont des seuils d'ancienneté : {dureePea} ans pour l'exonération d'impôt
            sur le revenu des gains du PEA, {dureeAv} ans pour le taux réduit et l'abattement de
            l'assurance-vie. En ouvrant aujourd'hui, ces seuils tombent à un âge qui dépend du
            vôtre, et qui peut se situer avant ou après votre départ.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Profil</th>
                  <th>Horizon avant {ageDepart} ans</th>
                  <th>PEA ouvert aujourd'hui : {dureePea} ans à</th>
                  <th>Assurance-vie ouverte aujourd'hui : {dureeAv} ans à</th>
                </tr>
              </thead>
              <tbody>
                {profils.map((p) => (
                  <tr key={p.id}>
                    <td>{noms[p.id]} ({p.age} ans)</td>
                    <td>{p.horizon} ans</td>
                    <td>{p.ageAvPea} ans</td>
                    <td>
                      {p.ageAv8Ans} ans, {p.av8AvantDepart ? "avant" : "après"} le départ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Lecture : à {pA.age} ans, le contrat atteint {dureeAv} ans bien avant la retraite ;
            à {pC.age} ans, il y parvient à {pC.ageAv8Ans} ans, donc bien après le départ.
            Cela ne rend pas l'assurance-vie inutile pour le profil 3 (des contrats anciens
            peuvent déjà exister, et la transmission reste un sujet), mais déplace son rôle.
          </p>

          <h2 id="profils">Trois profils composites chiffrés</h2>
          <div className="note">
            <p>
              Les trois profils sont des composites pédagogiques, sans lien avec une personne
              réelle. Les répartitions ne sont ni des recommandations ni des projections : elles
              illustrent l'effet de l'âge et de l'horizon. Aucun rendement n'est supposé, et chaque
              enveloppe peut perdre de la valeur ou, pour le PER, voir ses sommes bloquées. Le fonds
              de sécurité correspond au reliquat des {euros(capital)}.
            </p>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>{euros(capital)} répartis</th>
                  {profils.map((p) => (
                    <th key={p.id}>
                      {noms[p.id]}
                      <br />
                      {p.age} ans, TMI {pct(p.tmi)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fonds de sécurité</td>
                  {profils.map((p) => (
                    <td key={p.id}>
                      {euros(p.securite)} ({pct(part(p.securite, capital))}), soit {p.moisSecurite} mois
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>PER</td>
                  {profils.map((p) => (
                    <td key={p.id}>
                      {p.per > 0 ? `${euros(p.per)} (${pct(part(p.per, capital))})` : "aucun"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Assurance-vie</td>
                  {profils.map((p) => (
                    <td key={p.id}>
                      {euros(p.av)} ({pct(part(p.av, capital))})
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>PEA</td>
                  {profils.map((p) => (
                    <td key={p.id}>
                      {euros(p.pea)} ({pct(part(p.pea, capital))})
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Immobilier (SCPI)</td>
                  {profils.map((p) => (
                    <td key={p.id}>
                      {euros(p.immo)} ({pct(part(p.immo, capital))})
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Économie d'impôt PER à l'entrée</td>
                  {profils.map((p) => (
                    <td key={p.id}>
                      {p.per > 0 ? `${euros(p.per)} × ${pct(p.tmi)} = ${euros(p.economiePer)}` : "sans objet"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Profil 1, {pA.age} ans : l'horizon est long</h3>
          <p>
            Avec {pA.horizon} ans avant le départ, le temps joue en faveur d'une part plus
            importante de supports exposés aux marchés (PEA, unités de compte), à condition de
            supporter les baisses. Le PER peut se justifier à cette TMI de {pct(pA.tmi)} : {euros(pA.per)}{" "}
            déduits économisent {euros(pA.economiePer)} d'impôt à l'entrée, mais seront imposés à
            la sortie. L'assurance-vie atteindra les {dureeAv} ans à {pA.ageAv8Ans} ans, avant le
            départ.
          </p>
          <h3>Profil 2, {pB.age} ans : l'horizon se raccourcit</h3>
          <p>
            Avec {pB.horizon} ans avant le départ, on réduit la part des supports les plus
            volatils, on augmente la part des supports disponibles, et on regarde de près le
            calendrier des seuils : l'assurance-vie ouverte maintenant atteint {dureeAv} ans à{" "}
            {pB.ageAv8Ans} ans, juste {pB.av8AvantDepart ? "avant" : "après"} le départ. Le PER
            reste utile à cette TMI de {pct(pB.tmi)}, avec une économie de {euros(pB.economiePer)}.
          </p>
          <h3>Profil 3, {pC.age} ans : l'entrée en retraite</h3>
          <p>
            Avec {pC.horizon} ans avant le départ et une TMI de {pct(pC.tmi)}, la déduction d'un PER
            ne rapporterait que {euros(r2((pA.per * pC.tmi) / 100))} sur {euros(pA.per)} (contre{" "}
            {euros(pA.economiePer)} à {pct(pA.tmi)}) : il n'est pas retenu. La priorité va à la
            disponibilité : un fonds de sécurité plus large ({euros(pC.securite)},{" "}
            {pC.moisSecurite} mois) et une assurance-vie, qui sert aussi à organiser la
            transmission.
          </p>

          <h2 id="per">Peut-on vraiment verser {euros(pA.per)} sur un PER ?</h2>
          <p>
            Pas forcément en une seule année : la déduction est limitée à {PER_PLAFOND.tauxRevenusActivite} % des revenus
            d'activité nets de frais de l'année précédente (dans la limite de {PER_PLAFOND.multiplePassMaximum} fois le plafond de la
            sécurité sociale), avec un plancher de {PER_PLAFOND.tauxPlancherPass} % de ce plafond. Avec{" "}
            {euros(pA.revenuNetImposable)} de salaire net imposable, soit{" "}
            {euros(pA.revenuNetImposable * (1 - abattementFrais / 100))} après l'abattement de{" "}
            {abattementFrais} % pour frais professionnels, le plafond annuel est de{" "}
            {euros(pA.plafond)} : il faudrait {pA.anneesPer} ans pour déduire {euros(pA.per)}, sauf
            plafonds non utilisés des années précédentes, reportables. Pour le profil 2 (
            {euros(pB.revenuNetImposable)}), le plafond est de {euros(pB.plafond)} : {pB.anneesPer}{" "}
            ans pour {euros(pB.per)}. Voir{" "}
            <a href="/guide/plafond-per-versement-avant-31-decembre-2026">
              le guide du plafond PER
            </a>{" "}
            et{" "}
            <a href="/guide/ouvrir-un-per-etapes-documents-delais">
              la démarche d'ouverture d'un PER
            </a>
            .
          </p>

          <h2 id="immo">Quelle place pour l'immobilier ?</h2>
          <p>
            Une poche immobilière ajoute de la diversification, pas de la sécurité. Les parts de
            SCPI supportent des frais de souscription de {fraisScpi.min} % à {fraisScpi.max} % :{" "}
            {euros(montantSCPI)} placés coûtent donc de {euros(fraisScpiMinP)} à{" "}
            {euros(fraisScpiMaxP)} dès l'entrée, d'où l'intérêt d'un horizon long. La revente peut
            prendre du temps, et le prix de part moyen a évolué de {pct(variationPrixPart)} en 2025
            selon l'ASPIM : ni les revenus ni le capital ne sont garantis. Voir{" "}
            <a href="/guide/comment-choisir-une-scpi-checklist">
              la check-list pour choisir une SCPI
            </a>{" "}
            et{" "}
            <a href="/guide/immobilier-et-retraite-guide-complet">
              le guide complet immobilier et retraite
            </a>
            . Le lien vers un site partenaire du réseau, scpirentable.fr, est proposé à titre
            d'information :{" "}
            <a href="https://scpirentable.fr" target="_blank" rel="noopener">
              lien vers un site partenaire du réseau
            </a>
            .
          </p>

          <h2 id="documents">Documents, délais et frais</h2>
          <p>
            Pour chaque enveloppe, comptez une pièce d'identité, un justificatif de domicile, un
            RIB, et un justificatif d'origine des fonds pour les montants importants (acte de
            vente, attestation notariale). Un PER ou une assurance-vie en ligne se met en place en
            quelques jours à quelques semaines ; un PEA aussi. L'immobilier demande plus de temps.
            Côté coûts, comparez les frais d'entrée, de gestion et des supports, enveloppe par
            enveloppe : sur {euros(capital)}, quelques dixièmes de point de frais annuels pèsent
            sur vingt ans plus qu'on ne le croit.
          </p>

          <h2 id="checklist">Check-list</h2>
          <ul>
            <li>Le fonds de sécurité est constitué avant d'investir quoi que ce soit.</li>
            <li>Chaque poche a un horizon et une date d'usage.</li>
            <li>La TMI actuelle et celle de la retraite ont été estimées.</li>
            <li>Les plafonds du PER ont été vérifiés avant de décider d'un montant.</li>
            <li>Les frais de chaque enveloppe ont été chiffrés pour {euros(capital)}.</li>
            <li>La mise en place est échelonnée, si le montant est important.</li>
            <li>Le risque de perte en capital a été compris, enveloppe par enveloppe.</li>
          </ul>

          <h2 id="tableau">Quand ça vaut le coup, quand éviter</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Cette démarche vaut le coup si…</th>
                  <th>Mieux vaut éviter ou différer si…</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>vous avez un fonds de sécurité et pas de dette coûteuse</td>
                  <td>vous avez des crédits à taux élevé à rembourser en priorité</td>
                </tr>
                <tr>
                  <td>l'horizon de la poche dépasse plusieurs années</td>
                  <td>vous aurez besoin de l'argent dans moins de deux ou trois ans</td>
                </tr>
                <tr>
                  <td>vous pouvez accepter des variations de valeur</td>
                  <td>une forte baisse temporaire vous ferait vendre dans la panique</td>
                </tr>
                <tr>
                  <td>vous comparez au moins deux offres par enveloppe</td>
                  <td>une offre vous promet un rendement ou une défiscalisation garantis</td>
                </tr>
                <tr>
                  <td>vous répartissez entre plusieurs enveloppes selon l'horizon</td>
                  <td>tout le capital est placé sur une seule enveloppe, ou un seul bien</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="pieges">Pièges fréquents</h2>
          <ul>
            <li>
              <strong>Investir le fonds de sécurité :</strong> on est alors contraint de vendre au
              pire moment.
            </li>
            <li>
              <strong>Choisir une enveloppe pour son seul avantage fiscal :</strong> l'économie
              d'impôt d'un PER est un report, pas un gain garanti.
            </li>
            <li>
              <strong>Ignorer les plafonds :</strong> le PER ne se verse pas en une fois sans limite
              de déduction.
            </li>
            <li>
              <strong>Tout placer sur l'immobilier :</strong> frais d'entrée, illiquidité et
              concentration.
            </li>
            <li>
              <strong>Se fier à un rendement passé :</strong> les performances passées ne préjugent
              pas des performances futures.
            </li>
            <li>
              <strong>Signer sous la pression d'un démarchage :</strong> prenez le temps de
              comparer.
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Où placer 100 000 euros pour la retraite ?</h3>
          <p>
            Il n'existe pas de réponse unique. La répartition dépend de votre âge, de l'horizon de
            chaque somme, de votre TMI et de votre tolérance au risque. Commencez par un fonds de
            sécurité, puis répartissez le reste selon l'horizon entre PER, assurance-vie, PEA et,
            le cas échéant, immobilier.
          </p>

          <h3>Quel est le meilleur placement pour 100 000 euros ?</h3>
          <p>
            Aucun placement n'est le meilleur dans l'absolu. Le meilleur choix est celui qui
            correspond à votre horizon, à votre fiscalité et à votre capacité à supporter les
            variations. Se méfier de tout classement qui ne tient pas compte de ces éléments.
          </p>

          <h3>Faut-il tout mettre sur un PER ?</h3>
          <p>
            Rarement. La déduction est plafonnée, l'épargne est bloquée jusqu'à la retraite (sauf
            cas de déblocage anticipé) et la sortie est imposée. Voir{" "}
            <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER ?</a>
          </p>

          <h3>Comment investir 100 000 euros à 50 ans, à 55 ans ou à 60 ans ?</h3>
          <p>
            Plus l'âge avance, plus l'horizon se raccourcit et plus la part de disponibilités
            augmente. Le tableau des trois profils montre l'effet de l'âge, sans constituer une
            recommandation individuelle.
          </p>

          <h3>Vaut-il mieux investir 100 000 euros en une seule fois ou progressivement ?</h3>
          <p>
            L'investissement progressif limite le risque d'entrer sur les marchés au plus haut,
            sans l'éliminer et sans garantir un meilleur résultat. Il est surtout rassurant pour les
            montants importants.
          </p>

          <h3>Peut-on investir 100 000 euros dans l'immobilier pour la retraite ?</h3>
          <p>
            Oui, mais avec des frais d'entrée, une liquidité réduite et une concentration sur un
            seul marché. Une poche partielle, dans le cadre d'un patrimoine par ailleurs liquide,
            est souvent préférée. Voir{" "}
            <a href="/guide/scpi-preparer-sa-retraite">SCPI et retraite</a>.
          </p>

          <h3>Combien de rente peut-on espérer de 100 000 euros ?</h3>
          <p>
            Aucune promesse ne peut être faite : cela dépend des rendements futurs, de la durée et
            du mode de sortie (rente ou retraits). Pour des ordres de grandeur, voir{" "}
            <a href="/guide/combien-retirer-par-mois-capital-retraite">
              combien retirer par mois d'un capital
            </a>
            .
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Investir {euros(capital)} pour la retraite est avant tout un exercice de calendrier :
            quelle somme servira quand, avec quelle sécurité, et quel rôle donner à l'impôt. Les
            trois profils montrent que, selon l'âge et l'horizon, les mêmes enveloppes n'ont pas le
            même rôle : le PER perd de l'intérêt quand la TMI baisse et que le départ approche,
            l'assurance-vie prend de la place avec la transmission, le PEA suppose un horizon
            supérieur à {dureePea} ans.
          </p>
          <p>
            Avant de signer, chiffrez les frais, vérifiez les plafonds, gardez votre fonds de
            sécurité et lisez les risques. Pour la vue d'ensemble, voir{" "}
            <a href="/guide/preparer-sa-retraite-guide-complet">
              le guide complet pour préparer sa retraite
            </a>{" "}
            et{" "}
            <a href="/strategies/per">la stratégie PER</a>. Pour confronter ces pistes à votre
            situation, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à poser le
            cadre avant de décider.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li>
              <a href="/guide/meilleure-enveloppe-retraite">
                Quelle enveloppe pour sa retraite : comparatif
              </a>
            </li>
            <li>
              <a href="/guide/comment-ouvrir-une-assurance-vie-etapes">
                Comment ouvrir une assurance-vie, étape par étape
              </a>
            </li>
            <li>
              <a href="/guide/ouvrir-un-per-etapes-documents-delais">
                Ouvrir un PER : étapes, documents et délais
              </a>
            </li>
            <li>
              <a href="/guide/capital-retraite-objectif-et-construction">
                Capital retraite : objectif et construction
              </a>
            </li>
            <li>
              <a href="/guide/assurance-vie-a-60-ans-ou-a-la-retraite">
                Assurance-vie à 60 ans ou à la retraite
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : la
              répartition adaptée dépend de votre situation complète. Les règles et plafonds cités
              sont ceux en vigueur en novembre 2026 et peuvent évoluer. Les profils sont des
              composites pédagogiques, sans lien avec un cas réel, et aucun rendement n'est promis.
              Tout investissement comporte un risque de perte en capital ; les performances passées
              ne préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="La répartition de 100 000 € se décide selon votre âge, votre horizon et votre fiscalité." />
    </>
  );
}
