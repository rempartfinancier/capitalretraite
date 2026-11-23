import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  TRANSMISSION,
  V3_AVA_CLAUSE,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const abatt990 = TRANSMISSION.abattementSuccessionAvParBeneficiaire; // 152 500 €
const abatt757 = TRANSMISSION.abattementSuccessionAvApres70Collectif; // 30 500 €
const taux1 = V3_AVA_CLAUSE.prelevement990ITaux1; // 20 %
const seuil = V3_AVA_CLAUSE.prelevement990ISeuil; // 700 000 €
const taux2 = V3_AVA_CLAUSE.prelevement990ITaux2; // 31,25 %
const capital = V3_AVA_CLAUSE.capitalExempleAvant70;
const nb = V3_AVA_CLAUSE.nombreBeneficiairesExemple;
const primes70 = V3_AVA_CLAUSE.primesApres70Exemple;

// ---- Exemple 990 I : capital réparti à parts égales entre nb bénéficiaires ----
const part = capital / nb;
const taxable = Math.max(part - abatt990, 0);
const prelevementParBenef = Math.round((Math.min(taxable, seuil) * taux1) / 100 + (Math.max(taxable - seuil, 0) * taux2) / 100);
const prelevementTotal = prelevementParBenef * nb;
// Sans abattement par bénéficiaire (un seul bénéficiaire désigné pour tout le capital)
const taxableUnique = Math.max(capital - abatt990, 0);
const prelevementUnique = Math.round((Math.min(taxableUnique, seuil) * taux1) / 100 + (Math.max(taxableUnique - seuil, 0) * taux2) / 100);

// ---- Exemple 757 B : primes versées après 70 ans ----
const reintegre = Math.max(primes70 - abatt757, 0); // ajouté à la succession, les gains restent exonérés

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Contrat d'assurance-vie : fonctionnement (fiche F15274) : désignation et modification du bénéficiaire",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F15274",
  },
  {
    label:
      "BOFiP — Régime fiscal des contrats d'assurance-vie, rubrique impôt sur le revenu (BOI-RPPM-RCM-20-10-20-50)",
    url: "https://bofip.impots.gouv.fr/bofip/3951-PGP.html",
  },
  {
    label:
      "Légifrance — Code des assurances, art. L132-8 (désignation du bénéficiaire) et L132-9 (acceptation) ; Code général des impôts, art. 990 I, 757 B et 796-0 bis",
    url: "https://www.legifrance.gouv.fr",
  },
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : revenus d'un contrat d'assurance-vie (fiche F22414)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22414",
  },
];

export default function GuideClauseBeneficiaireAv() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · Assurance-vie et transmission</span>
          <h1>Clause bénéficiaire d'assurance-vie : comment la rédiger</h1>
          <p className="sub">
            Clause standard, nominative, démembrée, ordre des bénéficiaires, mineur, mise à jour :
            les étapes et les erreurs à éviter. Mis à jour en {V3_AVA_CLAUSE.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> la clause bénéficiaire décide de qui recevra le
              capital de votre assurance-vie. Rédigée avec soin, elle est précise, à jour et
              adaptée à votre situation familiale ; mal rédigée ou oubliée, elle peut aboutir à un
              résultat contraire à vos souhaits. Côté fiscalité, un abattement de{" "}
              {euros(abatt990)} par bénéficiaire s'applique en principe aux capitaux issus de
              primes versées avant 70 ans ; après 70 ans, la règle diffère (abattement global de{" "}
              {euros(abatt757)}). Les cas complexes méritent l'avis d'un notaire.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#role">À quoi sert la clause bénéficiaire ?</a></li>
              <li><a href="#types">Clause standard, nominative ou démembrée : laquelle choisir ?</a></li>
              <li><a href="#ordre">Comment organiser l'ordre des bénéficiaires ?</a></li>
              <li><a href="#cas">Mineur, conjoint, partenaire de Pacs : quelles précautions ?</a></li>
              <li><a href="#etapes">Comment rédiger et déposer sa clause ? Étapes</a></li>
              <li><a href="#acceptation">Acceptation du bénéficiaire : ce que ça change</a></li>
              <li><a href="#fiscalite">Quelle fiscalité sur le capital transmis ?</a></li>
              <li><a href="#exemple">Exemple chiffré : le capital réparti entre {nb} bénéficiaires</a></li>
              <li><a href="#erreurs">Quelles erreurs fréquentes éviter ?</a></li>
              <li><a href="#tableau">Quand une clause simple suffit, quand consulter un notaire</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#lire-aussi">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Imaginons Nadine, 61 ans, remariée, mère de deux enfants d'un premier mariage, qui a
            ouvert son contrat il y a quinze ans. La clause, choisie à l'époque, mentionne
            « mon conjoint ». Depuis, elle a divorcé puis s'est remariée : le sens de ces trois
            mots a changé sans qu'elle s'en aperçoive. Ce profil composite, sans lien avec un cas
            réel, illustre pourquoi une clause se relit régulièrement.
          </p>
          <p>
            Ce guide présente le mécanisme, les types de clauses, les étapes pour la rédiger et
            les écueils les plus courants. Il donne des repères généraux et ne constitue pas un
            conseil personnalisé : la rédaction d'une clause dépend de votre famille, de votre
            régime matrimonial et de votre patrimoine ; dès que la situation est complexe,
            adressez-vous à un notaire.
          </p>

          <h2 id="role">À quoi sert la clause bénéficiaire ?</h2>
          <p>
            La clause bénéficiaire désigne la ou les personnes qui percevront le capital au
            décès de l'assuré. C'est ce qui permet à l'assurance-vie de se transmettre
            en principe hors de la succession, selon des règles fiscales propres (voir plus
            bas). Sans clause valable, ou si les bénéficiaires désignés ne peuvent pas la
            recueillir, le capital peut tomber dans la succession, avec des conséquences
            fiscales et civiles différentes.
          </p>
          <p>
            Pour comparer l'assurance-vie à une donation, voyez notre guide{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">donation ou assurance-vie</a>.
          </p>

          <h2 id="types">Clause standard, nominative ou démembrée : laquelle choisir ?</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Type de clause</th>
                  <th>Exemple de formulation générale</th>
                  <th>Atouts et limites</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Clause standard</td>
                  <td>« Mon conjoint, à défaut mes enfants nés ou à naître, vivants ou représentés, à défaut mes héritiers »</td>
                  <td>Simple et fréquemment proposée par défaut ; peut ne pas correspondre à votre situation (famille recomposée, concubin, volonté de favoriser un proche)</td>
                </tr>
                <tr>
                  <td>Clause nominative</td>
                  <td>Les bénéficiaires sont désignés par leurs nom, prénoms, date et lieu de naissance, avec leur part</td>
                  <td>Précise, évite les ambiguïtés ; à mettre à jour après chaque changement (décès, divorce, naissance)</td>
                </tr>
                <tr>
                  <td>Clause démembrée</td>
                  <td>L'usufruit du capital à un bénéficiaire (souvent le conjoint), la nue-propriété à un autre (souvent les enfants)</td>
                  <td>Organise la transmission en deux temps ; technique, à faire rédiger avec un notaire pour en maîtriser les effets civils et fiscaux (voir notre guide sur le{" "}
                    <a href="/guide/demembrement-nue-propriete-retraite">démembrement</a>)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Il n'existe pas de modèle universel. La clause standard convient souvent à une
            situation familiale simple et stable ; la clause nominative devient utile dès qu'on
            veut désigner précisément ou écarter quelqu'un ; la clause démembrée répond à un
            besoin particulier de protection du conjoint, avec un cadre à valider.
          </p>

          <h2 id="ordre">Comment organiser l'ordre des bénéficiaires ?</h2>
          <p>
            Une clause fonctionne en cascade : on désigne un premier bénéficiaire, puis,
            « à défaut », un deuxième, puis un troisième. Cette hiérarchie évite que le capital
            tombe dans la succession si le premier bénéficiaire est décédé ou renonce.
          </p>
          <ul>
            <li>
              Prévoyez au moins deux niveaux : un bénéficiaire principal et un « à défaut ».
            </li>
            <li>
              Précisez les parts (« par parts égales », ou en pourcentages) lorsqu'il y a
              plusieurs bénéficiaires de même rang.
            </li>
            <li>
              Pour la représentation, indiquez si les descendants d'un enfant prédécédé
              recueillent sa part (« vivants ou représentés »).
            </li>
            <li>
              Attention aux formulations vagues (« ma famille », « mes proches ») : elles
              laissent place à l'interprétation, voire au contentieux.
            </li>
          </ul>

          <h2 id="cas">Mineur, conjoint, partenaire de Pacs : quelles précautions ?</h2>
          <p>
            <strong>Un mineur bénéficiaire.</strong> Un enfant mineur peut être désigné, mais le
            capital sera géré par son représentant légal (en principe ses parents) jusqu'à sa
            majorité. Il est possible de prévoir une clause à terme ou une gestion encadrée pour
            éviter que l'enfant reçoive seul un capital important à 18 ans. La rédaction
            demande de la précision : un notaire peut la sécuriser.
          </p>
          <p>
            <strong>Conjoint et partenaire de Pacs.</strong> Le conjoint survivant et le
            partenaire de Pacs sont exonérés de droits de succession, y compris sur les capitaux
            d'assurance-vie, selon les règles en vigueur (CGI, art. 796-0 bis et 990 I). Le mot
            « conjoint » désignant la personne mariée au jour du décès, vérifiez qu'il
            correspond toujours à votre intention après un divorce ou un remariage. Un concubin
            n'a pas ce statut : il doit être désigné nominativement et supporte une fiscalité
            plus lourde.
          </p>
          <p>
            <strong>Un enfant d'un premier lit, un proche non parent, une association.</strong>
            Ces choix se prévoient par une clause nominative. Les conséquences fiscales et
            civiles dépendent du lien de parenté et de la situation : consultez un
            professionnel.
          </p>

          <h2 id="etapes">Comment rédiger et déposer sa clause ? Étapes</h2>
          <ol>
            <li>
              <strong>Dresser la liste des personnes à protéger</strong> et des intentions
              (protéger un conjoint, favoriser un enfant, léguer à une association).
            </li>
            <li>
              <strong>Vérifier les contraintes civiles</strong> : régime matrimonial,
              enfants d'une autre union, éventuelle donation antérieure.
            </li>
            <li>
              <strong>Choisir le type de clause</strong> (standard, nominative, démembrée).
            </li>
            <li>
              <strong>Rédiger précisément</strong> : identité complète des bénéficiaires, ordre,
              parts, représentation.
            </li>
            <li>
              <strong>Déposer la clause auprès de l'assureur</strong> : formulaire de l'assureur,
              avenant ou courrier selon le contrat. Gardez une copie datée.
            </li>
            <li>
              <strong>Faire vérifier si le cas est complexe</strong> (famille recomposée,
              démembrement, mineur, patrimoine important) par un notaire.
            </li>
            <li>
              <strong>Mettre à jour</strong> après chaque événement (mariage, divorce, naissance,
              décès, changement de situation) et relire la clause tous les quelques ans.
            </li>
          </ol>
          <p>
            La clause peut aussi être rédigée devant notaire (acte authentique) ou sous seing
            privé ; un acte notarié apporte une preuve de la date et du contenu, utile quand la
            situation est sensible. Dans tous les cas, l'assureur doit en avoir connaissance
            pour la mettre en œuvre.
          </p>

          <h2 id="acceptation">Acceptation du bénéficiaire : ce que ça change</h2>
          <p>
            Tant qu'un bénéficiaire n'a pas accepté la désignation, vous pouvez en principe
            modifier la clause librement. Si le bénéficiaire accepte (de son vivant, selon des
            formes prévues par le code des assurances), la désignation devient plus difficile à
            révoquer : elle suppose alors son accord. L'acceptation limite donc votre liberté
            de modifier la clause, et peut aussi restreindre les opérations sur le contrat
            (rachat, avance). Elle se décide en connaissance de cause, de préférence avec un
            conseil, et n'est pas à encourager sans raison précise.
          </p>

          <h2 id="fiscalite">Quelle fiscalité sur le capital transmis ?</h2>
          <p>
            Deux régimes coexistent selon l'âge auquel les primes ont été versées. Les chiffres
            ci-dessous sont des règles générales, à vérifier selon votre situation.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Primes versées avant 70 ans (art. 990 I)</th>
                  <th>Primes versées après 70 ans (art. 757 B)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Abattement</td>
                  <td>{euros(abatt990)} par bénéficiaire, tous contrats confondus du défunt</td>
                  <td>{euros(abatt757)} au total, pour l'ensemble des bénéficiaires</td>
                </tr>
                <tr>
                  <td>Ce qui est taxé</td>
                  <td>
                    Capital (primes et gains) au-delà de l'abattement : {pct(taux1)} jusqu'à{" "}
                    {euros(seuil)} de part taxable par bénéficiaire, puis {pct(taux2)} au-delà
                  </td>
                  <td>Les primes versées au-delà de l'abattement, ajoutées à la succession et taxées aux droits de succession ; les gains sont exonérés</td>
                </tr>
                <tr>
                  <td>Conjoint / partenaire de Pacs</td>
                  <td>Exonéré</td>
                  <td>Exonéré</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Pour approfondir le cas d'un contrat alimenté après 70 ans, voyez{" "}
            <a href="/guide/assurance-vie-apres-70-ans-fiscalite-succession">notre guide dédié</a>.
            Ces taux et seuils sont issus du code général des impôts et peuvent être modifiés par
            les lois de finances ; ils sont à confirmer à la date de votre décès, qui seule
            détermine les règles applicables.
          </p>

          <h2 id="exemple">Exemple chiffré : le capital réparti entre {nb} bénéficiaires</h2>
          <p>
            Exemple illustratif, sans lien avec un cas réel : un contrat de {euros(capital)}{" "}
            alimenté entièrement avant 70 ans, avec {nb} enfants bénéficiaires à parts égales,
            chacun reçoit {euros(part)}. Après l'abattement de {euros(abatt990)} par
            bénéficiaire, la part taxable est de {euros(taxable)}, taxée à {pct(taux1)} : soit{" "}
            {euros(prelevementParBenef)} par bénéficiaire et {euros(prelevementTotal)} au total.
          </p>
          <p>
            Si le même capital était attribué à un seul bénéficiaire, un seul abattement
            s'appliquerait : la part taxable serait de {euros(taxableUnique)} et le prélèvement de{" "}
            {euros(prelevementUnique)}. La clause n'est donc pas neutre : répartir entre
            plusieurs bénéficiaires permet de multiplier l'abattement, mais ce choix doit
            avant tout correspondre à votre volonté de transmettre.
          </p>
          <p>
            Pour un contrat alimenté par {euros(primes70)} de primes après 70 ans (hors
            gains), l'abattement global de {euros(abatt757)} laisse {euros(reintegre)} ajoutés à la
            succession : ce montant est taxé selon le lien de parenté, et les gains restent
            exonérés. Cette comparaison est indicative et ne tient pas compte de vos autres
            biens ni de votre situation familiale.
          </p>

          <h2 id="erreurs">Quelles erreurs fréquentes éviter ?</h2>
          <ul>
            <li>
              <strong>Garder la clause standard par défaut</strong> sans la relire.
            </li>
            <li>
              <strong>Ne pas la mettre à jour</strong> après un divorce, un remariage, une
              naissance ou un décès.
            </li>
            <li>
              <strong>Oublier l'« à défaut »</strong>, qui expose le capital à la succession.
            </li>
            <li>
              <strong>Utiliser des termes imprécis</strong> (« mes proches », « ma famille »).
            </li>
            <li>
              <strong>Désigner un mineur sans prévoir qui gère le capital.</strong>
            </li>
            <li>
              <strong>Accepter ou faire accepter la clause sans en mesurer les effets</strong> sur
              votre liberté de modifier ou de racheter.
            </li>
            <li>
              <strong>Croire que l'assurance-vie échappe à toute règle civile.</strong> Des
              primes manifestement exagérées au regard de votre situation peuvent être
              contestées ; les règles dépendent des faits et doivent être appréciées au cas par
              cas.
            </li>
            <li>
              <strong>Avoir plusieurs contrats avec des clauses incohérentes</strong> entre
              elles.
            </li>
          </ul>

          <h2 id="tableau">Quand une clause simple suffit, quand consulter un notaire</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Une clause simple peut suffire si…</th>
                  <th>Un avis notarial est recommandé si…</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Votre situation familiale est stable et simple</td>
                  <td>Famille recomposée, enfants de plusieurs unions</td>
                </tr>
                <tr>
                  <td>Les bénéficiaires sont majeurs et clairement identifiés</td>
                  <td>Bénéficiaire mineur ou protégé</td>
                </tr>
                <tr>
                  <td>Le capital est modeste au regard de votre patrimoine</td>
                  <td>Capital important ou transmission combinant donation, démembrement et assurance-vie</td>
                </tr>
                <tr>
                  <td>Vous n'envisagez ni démembrement ni clause à terme</td>
                  <td>Clause démembrée, à terme ou avec charge</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Comment rédiger une clause bénéficiaire d'assurance-vie ?</h3>
          <p>
            En désignant clairement les bénéficiaires, leur ordre et leurs parts, puis en la
            déposant auprès de l'assureur. Une clause nominative, précise, est généralement plus
            sûre qu'une formule vague. Voir les étapes ci-dessus.
          </p>

          <h3>Peut-on modifier la clause bénéficiaire à tout moment ?</h3>
          <p>
            En principe oui, tant qu'aucun bénéficiaire n'a accepté la désignation. Après
            acceptation, la modification suppose son accord. Vérifiez les modalités dans votre
            contrat.
          </p>

          <h3>Que se passe-t-il si le bénéficiaire est mineur ?</h3>
          <p>
            Le capital est géré par son représentant légal jusqu'à la majorité. Une clause
            adaptée peut encadrer cette gestion ; faites-la préciser par un notaire.
          </p>

          <h3>Mon conjoint paie-t-il des droits sur mon assurance-vie ?</h3>
          <p>
            En principe non : le conjoint survivant et le partenaire de Pacs sont exonérés (CGI,
            art. 796-0 bis, 990 I), selon les règles en vigueur.
          </p>

          <h3>Comment fonctionne la clause démembrée ?</h3>
          <p>
            L'usufruit du capital va à un bénéficiaire (par exemple le conjoint) et la
            nue-propriété à d'autres (par exemple les enfants). Elle suppose de préciser les
            droits de chacun, notamment sur l'usage du capital ; un notaire sécurise la
            rédaction.
          </p>

          <h3>Que devient le capital si aucune clause n'est valable ?</h3>
          <p>
            Il peut revenir à la succession, avec des règles de partage et de fiscalité
            différentes. C'est la raison pour laquelle on prévoit toujours un bénéficiaire « à
            défaut ».
          </p>

          <h3>Quelle fiscalité pour les bénéficiaires ?</h3>
          <p>
            Pour les primes versées avant 70 ans, un abattement de {euros(abatt990)} par
            bénéficiaire, puis {pct(taux1)} jusqu'à {euros(seuil)} de part taxable et{" "}
            {pct(taux2)} au-delà. Pour les primes versées après 70 ans, un abattement global de{" "}
            {euros(abatt757)}, le surplus étant soumis aux droits de succession.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La clause bénéficiaire est la partie du contrat dont l'effet est le plus durable et
            la plus facile à oublier. Une clause précise, avec un « à défaut », relue après chaque
            événement familial, évite l'essentiel des mauvaises surprises. Sur le plan fiscal,
            l'abattement de {euros(abatt990)} par bénéficiaire pour les primes versées avant 70
            ans rend utile de réfléchir à la répartition ; l'exemple de ce guide montre que la
            différence se compte en milliers d'euros, mais la volonté de transmettre doit
            guider le choix avant l'optimisation.
          </p>
          <p>
            Pour replacer la clause dans une stratégie de transmission d'ensemble, voyez{" "}
            <a href="/guide/epargne-retraite-en-couple-et-transmission">épargne retraite en couple et transmission</a>{" "}
            et{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">donation ou assurance-vie</a>.
            Si vous ouvrez un contrat, la clause se rédige dès le départ (
            <a href="/guide/comment-ouvrir-une-assurance-vie-etapes">comment ouvrir une assurance-vie</a>
            ). Le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> peut aider à
            situer ces choix dans votre projet global.
          </p>

          <h2 id="lire-aussi">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/assurance-vie-apres-70-ans-fiscalite-succession">Assurance-vie après 70 ans : fiscalité et succession</a></li>
            <li><a href="/guide/donation-ou-assurance-vie-transmission">Donation ou assurance-vie : quelle transmission ?</a></li>
            <li><a href="/guide/demembrement-nue-propriete-retraite">Démembrement et nue-propriété</a></li>
            <li><a href="/guide/epargne-retraite-en-couple-et-transmission">Épargne retraite en couple et transmission</a></li>
            <li><a href="/guide/assurance-vie-garantie-repartir-plusieurs-contrats">Garantie et répartition entre plusieurs contrats</a></li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en novembre 2026 :</p>
          <ul>
            {sources.map((s) => (
              <li key={s.url + s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue ni un conseil juridique ni un conseil
              personnalisé : la rédaction d'une clause dépend de votre situation, et les cas
              complexes relèvent d'un notaire. Les montants, taux et seuils cités sont ceux en
              vigueur en {V3_AVA_CLAUSE.maj} et peuvent évoluer. Le profil de Nadine et les
              montants des exemples sont des illustrations pédagogiques.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Une clause se rédige une fois. Elle se relit à chaque changement de vie." />
    </>
  );
}
