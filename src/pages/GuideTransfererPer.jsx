import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  FRAIS_TYPES,
  V3_PER_TRANSFERT,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const maj = V3_PER_TRANSFERT.maj;
const encours = V3_PER_TRANSFERT.encoursExemple;
const fraisMaxPct = V3_PER_TRANSFERT.fraisMaxPctAvantAnnees;
const anneesNuls = V3_PER_TRANSFERT.anneesFraisNuls;
const delaiMois = V3_PER_TRANSFERT.delaiLegalMois;
const gestionActuelle = FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max;
const gestionCible = FRAIS_TYPES.contratInternet.gestionAnnuelle.min;

const r2 = (n) => Math.round(n * 100) / 100;
const part = (base, taux) => r2((base * taux) / 100);

// Exemple : transfert d'un PER bancaire de moins de 5 ans vers une offre moins chère
const fraisTransfert = part(encours, fraisMaxPct);
const gestionAnnuelleActuelle = part(encours, gestionActuelle);
const gestionAnnuelleCible = part(encours, gestionCible);
const economieAnnuelle = r2(gestionAnnuelleActuelle - gestionAnnuelleCible);
const pointMortAnnees = r2(fraisTransfert / economieAnnuelle);
const economie10Ans = r2(economieAnnuelle * 10 - fraisTransfert);

const sources = [
  {
    label: "Service-Public.gouv.fr — Plan d'épargne retraite (PER), fiche F34982",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34982",
  },
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : cotisations d'épargne retraite (déduction), fiche F14709",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14709",
  },
  {
    label: "AMF — Autorité des marchés financiers : épargne et placements, mises en garde",
    url: "https://www.amf-france.org",
  },
  {
    label: "Légifrance — Code monétaire et financier, articles L. 224-1 et suivants (plan d'épargne retraite)",
    url: "https://www.legifrance.gouv.fr",
  },
  {
    label: "info-retraite.fr — Le droit à l'information sur la retraite (GIP Union Retraite)",
    url: "https://www.info-retraite.fr",
  },
];

export default function GuideTransfererPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · PER</span>
          <h1>Transférer son PER : frais, délais et démarche</h1>
          <p className="sub">
            PER vers PER, ou PERP, Madelin, article 83 et PERCO vers PER : qui fait quoi, ce qui est
            conservé, ce qui peut être perdu. Mis à jour en {maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> transférer un PER ne passe pas par un retrait : c'est
              l'organisme d'accueil qui engage la démarche et l'organisme d'origine qui transfère
              l'épargne, sans fiscalité si la règle de la nature des sommes est respectée. La loi
              plafonne les frais de transfert à {pct(fraisMaxPct)} des droits acquis et les
              supprime {anneesNuls} ans après le premier versement ; pour un PER individuel, le
              délai est de {delaiMois} mois au plus une fois la demande complète (chiffres à vérifier selon votre
              contrat). Exemple illustratif : sur {euros(encours)}, le transfert coûte au plus{" "}
              {euros(fraisTransfert)} et peut se rentabiliser en environ{" "}
              {String(pointMortAnnees).replace(".", ",")} ans si les frais de gestion baissent.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#quand">Quand transférer son PER a-t-il un sens ?</a></li>
              <li><a href="#etapes">Comment transférer son PER, étape par étape ?</a></li>
              <li><a href="#anciens">Peut-on transférer un PERP, un Madelin, un article 83 ou un PERCO vers un PER ?</a></li>
              <li><a href="#frais-delais">Quels frais et quels délais prévoit la loi ?</a></li>
              <li><a href="#conserve">Qu'est-ce qui est conservé, qu'est-ce qui peut être perdu ?</a></li>
              <li><a href="#exemple">Un transfert vaut-il le coût ? Un exemple chiffré</a></li>
              <li><a href="#impossible">Peut-on transférer son PER vers une assurance-vie ?</a></li>
              <li><a href="#pieges">Quels pièges éviter ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Il arrive que l'on réalise, quelques années après l'ouverture, que son PER coûte
            plus cher qu'on ne le pensait. Un relevé annuel qui détaille enfin les frais, une
            offre concurrente aperçue au détour d'un article, et la question devient pratique :
            peut-on partir ailleurs sans tout casser ? La réponse est oui, mais dans un cadre
            précis, avec une démarche qui n'est pas celle que l'on croit.
          </p>
          <p>
            Prenons un profil illustratif, sans lien avec un cas réel : une salariée de 49 ans
            qui détient un PER ouvert en agence il y a trois ans, investi en grande partie sur
            des supports aux frais élevés. Elle voudrait le déplacer vers une offre en ligne, mais
            craint de perdre l'économie d'impôt déjà obtenue. Ce guide explique comment faire et
            quand cela vaut la peine ; pour comprendre les coûts d'un PER en général, voyez{" "}
            <a href="/guide/combien-coute-un-per">notre guide sur le coût d'un PER</a> et{" "}
            <a href="/guide/per-bancaire-frais-gestion-horizon">celui sur les PER bancaires</a>.
          </p>

          <h2 id="quand">Quand transférer son PER a-t-il un sens ?</h2>
          <p>
            Un transfert a du sens lorsque l'économie annuelle de frais, ou l'amélioration des
            supports, dépasse durablement le coût du transfert. Il a rarement de sens si le PER
            est proche de la sortie, si les frais de transfert sont élevés ou si le contrat
            actuel comporte une garantie que l'on ne retrouverait pas ailleurs.
          </p>

          <h2 id="etapes">Comment transférer son PER, étape par étape ?</h2>
          <p>
            La règle essentielle est simple : on ne s'adresse jamais d'abord à son organisme
            actuel pour « sortir » l'argent, mais à l'organisme d'accueil pour qu'il le
            réclame.
          </p>
          <ol>
            <li>
              <strong>Faire le point sur le contrat actuel</strong> : date d'ouverture, encours,
              frais de gestion et de supports, compartiments (versements volontaires,
              épargne salariale, cotisations obligatoires), garanties éventuelles.
            </li>
            <li>
              <strong>Comparer l'offre d'accueil</strong> : frais d'entrée sur le transfert (en
              principe nuls), frais de gestion, supports, gestion pilotée ou libre.
            </li>
            <li>
              <strong>Ouvrir le PER d'accueil</strong> (voir{" "}
              <a href="/guide/ouvrir-un-per-etapes-documents-delais">notre guide sur l'ouverture</a>
              ), sans versement ou avec un montant minimal.
            </li>
            <li>
              <strong>Remplir la demande de transfert</strong> auprès de l'organisme d'accueil :
              il vous demande les références de l'ancien plan et vous fait signer un mandat.
            </li>
            <li>
              <strong>L'organisme d'accueil contacte l'organisme d'origine</strong>, qui
              confirme l'encours, ses frais éventuels et les compartiments à transférer.
            </li>
            <li>
              <strong>L'organisme d'origine transfère l'épargne</strong> dans le délai légal ; le
              plan d'origine est en général clôturé.
            </li>
            <li>
              <strong>Contrôler la ventilation reçue</strong> : l'encours, la répartition par
              compartiment et la date de départ du plan d'origine doivent être reportés à
              l'identique.
            </li>
          </ol>

          <h2 id="anciens">Peut-on transférer un PERP, un Madelin, un article 83 ou un PERCO vers un PER ?</h2>
          <p>
            Oui : le PER a été conçu pour absorber les anciens produits d'épargne retraite. Un
            PERP, un contrat Madelin, un contrat « article 83 » ou un PERCO peut être transféré
            vers un PER, individuel ou d'entreprise selon l'origine des sommes. Les modalités
            diffèrent d'un produit à l'autre : pour un PERP ou un Madelin, les frais de transfert
            sont eux aussi plafonnés à {pct(fraisMaxPct)}, mais ne deviennent nuls qu'après dix
            ans, et le délai peut aller jusqu'à quatre mois. À vérifier au cas par cas.
            {/* À VÉRIFIER : plafond de 1 % pour PERP/Madelin depuis le 24/10/2024 (loi Industrie verte du 23/10/2023), nuls après 10 ans à compter du premier versement ; service-public F34982 mentionne encore « 5 % » avant 10 ans — délai de 4 mois pour les anciens contrats (F34982) */}
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Produit d'origine</th>
                  <th>Destination possible</th>
                  <th>À contrôler avant de transférer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PER individuel</td>
                  <td>Un autre PER individuel</td>
                  <td>Ancienneté du plan, frais de transfert, fonds en euros</td>
                </tr>
                <tr>
                  <td>PERP</td>
                  <td>PER individuel</td>
                  <td>Garanties anciennes (taux de rente, décès), frais éventuels</td>
                </tr>
                <tr>
                  <td>Contrat Madelin (indépendants)</td>
                  <td>PER individuel</td>
                  <td>Règles propres aux indépendants, garanties de prévoyance éventuelles</td>
                </tr>
                <tr>
                  <td>Article 83 (cotisations obligatoires d'entreprise)</td>
                  <td>PER d'entreprise ou individuel, selon le compartiment</td>
                  <td>Conditions de transfert à la rupture du contrat de travail</td>
                </tr>
                <tr>
                  <td>PERCO</td>
                  <td>PER d'entreprise collectif ou PER individuel</td>
                  <td>Nature des sommes (abondement, participation), frais</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les indépendants trouveront des précisions dans{" "}
            <a href="/guide/retraite-independants-per-ou-madelin">le guide PER ou Madelin</a>.
          </p>

          <h2 id="frais-delais">Quels frais et quels délais prévoit la loi ?</h2>
          <p>
            Les frais de transfert d'un PER vers un autre PER sont plafonnés à{" "}
            {pct(fraisMaxPct)} des droits acquis, puis nuls {anneesNuls} ans après le premier
            versement dans le plan, ou dès l'âge légal de départ à la retraite. Pour un PER
            individuel, l'organisme d'origine doit transférer l'épargne dans un délai maximal de{" "}
            {delaiMois} mois après la réception de la demande complète ; ce délai est de trois
            mois pour un PER d'entreprise et peut aller jusqu'à quatre mois pour les anciens
            produits. Un PER d'entreprise collectif ne se transfère, tant que l'on reste dans
            l'entreprise, qu'une fois tous les trois ans ; un PER obligatoire, seulement après
            l'avoir quitté. Ces références générales sont à confirmer sur votre contrat et
            auprès de l'organisme.
          </p>
          <ul>
            <li>
              <strong>Frais</strong> : demandez le montant exact par écrit avant de lancer la
              demande, il peut être inférieur au plafond.
            </li>
            <li>
              <strong>Délai</strong> : il court à partir d'une demande complète ; un document
              manquant le repousse.
            </li>
            <li>
              <strong>Pendant le transfert</strong> : l'épargne peut rester investie ou être
              désinvestie selon l'organisme, avec un risque de marché dans un cas comme dans
              l'autre ; renseignez-vous avant de signer.
            </li>
          </ul>

          <h2 id="conserve">Qu'est-ce qui est conservé, qu'est-ce qui peut être perdu ?</h2>
          <p>
            Le transfert conserve la nature fiscale des sommes : les versements déduits restent
            déduits, ceux qui ne l'ont pas été restent non déduits, et l'épargne salariale
            garde son régime. Aucun impôt n'est dû au moment du transfert. En revanche, certains
            avantages attachés au contrat d'origine peuvent ne pas suivre.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Conservé</th>
                  <th>À vérifier, risque de perte</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nature fiscale des versements (déduits ou non, épargne salariale)</td>
                  <td>Taux de rente garanti d'un ancien contrat</td>
                </tr>
                <tr>
                  <td>Capital transféré, hors frais éventuels</td>
                  <td>Garanties décès ou prévoyance attachées au contrat d'origine</td>
                </tr>
                <tr>
                  <td>Cas de déblocage anticipé prévus par la loi</td>
                  <td>Fonds en euros ou supports fermés à la souscription</td>
                </tr>
                <tr>
                  <td>Plafonds de déduction et reports, qui relèvent de votre foyer fiscal</td>
                  <td>Désinvestissement temporaire pendant l'opération</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Dans l'autre sens, certains anciens produits ne permettaient que la sortie en rente :
            après transfert vers un PER, la sortie en capital peut devenir possible pour les
            sommes qui s'y prêtent, ce qui peut changer la fiscalité de sortie. Le détail est
            dans{" "}
            <a href="/guide/fiscalite-sortie-per">notre guide sur la fiscalité de la sortie</a>.
          </p>

          <h2 id="exemple">Un transfert vaut-il le coût ? Un exemple chiffré</h2>
          <div className="note">
            <p>
              Exemple illustratif, sans lien avec une offre réelle : un PER de {euros(encours)}{" "}
              détenu depuis moins de {anneesNuls} ans, transféré vers une offre moins chère. Les
              frais de gestion sont pris dans les fourchettes du site, à titre d'ordre de
              grandeur, et ne tiennent pas compte des frais de supports ni de l'évolution des
              marchés.
            </p>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Poste</th>
                  <th>Calcul</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frais de transfert maximaux</td>
                  <td>{euros(encours)} × {pct(fraisMaxPct)}</td>
                  <td>{euros(fraisTransfert)}</td>
                </tr>
                <tr>
                  <td>Gestion annuelle actuelle</td>
                  <td>{euros(encours)} × {pct(gestionActuelle)}</td>
                  <td>{euros(gestionAnnuelleActuelle)} par an</td>
                </tr>
                <tr>
                  <td>Gestion annuelle de l'offre d'accueil</td>
                  <td>{euros(encours)} × {pct(gestionCible)}</td>
                  <td>{euros(gestionAnnuelleCible)} par an</td>
                </tr>
                <tr>
                  <td>Économie annuelle</td>
                  <td>{euros(gestionAnnuelleActuelle)} − {euros(gestionAnnuelleCible)}</td>
                  <td>{euros(economieAnnuelle)} par an</td>
                </tr>
                <tr>
                  <td>Point mort</td>
                  <td>{euros(fraisTransfert)} ÷ {euros(economieAnnuelle)}</td>
                  <td>{String(pointMortAnnees).replace(".", ",")} ans</td>
                </tr>
                <tr>
                  <td>Solde après 10 ans, à encours constant</td>
                  <td>{euros(economieAnnuelle)} × 10 − {euros(fraisTransfert)}</td>
                  <td>{euros(economie10Ans)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Ce solde suppose un encours constant et des frais de supports identiques : il ne
            s'agit ni d'une projection ni d'une promesse. Avec un encours plus faible ou un
            écart de frais plus mince, le point mort s'éloigne ; avec un PER de plus de{" "}
            {anneesNuls} ans, il disparaît puisque le transfert est alors sans frais.
          </p>

          <h2 id="quand-ou-eviter">Quand transférer vaut-il le coup, et quand éviter ?</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Plutôt utile</th>
                  <th>À éviter ou à reporter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Écart de frais annuels important et encours significatif</td>
                  <td>Écart faible ou encours modeste</td>
                </tr>
                <tr>
                  <td>Plan détenu depuis plus de {anneesNuls} ans (transfert gratuit)</td>
                  <td>Plan récent avec frais de transfert au plafond</td>
                </tr>
                <tr>
                  <td>Anciens produits à supports peu performants ou fermés</td>
                  <td>Contrat avec garantie ancienne difficile à retrouver</td>
                </tr>
                <tr>
                  <td>Horizon de sortie encore éloigné</td>
                  <td>Sortie proche, quelques mois à peine de gestion à gagner</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="impossible">Peut-on transférer son PER vers une assurance-vie ?</h2>
          <p>
            Non : un PER ne peut être transféré que vers un autre plan d'épargne retraite. Sortir
            les sommes pour les placer sur une assurance-vie suppose une sortie du PER, donc un
            cas de déblocage anticipé ou la retraite, avec la fiscalité correspondante. C'est
            la contrepartie de la déduction. Le transfert inverse, d'une assurance-vie vers un
            PER, n'existe pas non plus comme transfert : il faut racheter, puis verser. Voyez{" "}
            <a href="/guide/per-vs-assurance-vie-retraite">notre comparatif PER et assurance-vie</a>{" "}
            et, pour déplacer une assurance-vie sans perdre son ancienneté,{" "}
            <a href="/guide/transferer-assurance-vie-sans-perdre-anteriorite">notre guide dédié</a>.
          </p>

          <h2 id="pieges">Quels pièges éviter ?</h2>
          <ul>
            <li>
              <strong>Demander un rachat à l'ancien organisme</strong> au lieu d'un transfert :
              la sortie est alors impossible sauf cas de déblocage, ou fiscalisée.
            </li>
            <li>
              <strong>Ignorer l'ancienneté du plan</strong> : un transfert avant l'échéance des{" "}
              {anneesNuls} ans peut coûter jusqu'à {pct(fraisMaxPct)} ; attendre quelques mois
              peut le rendre gratuit.
            </li>
            <li>
              <strong>Perdre une garantie sans le savoir</strong> : taux de rente, garanties
              décès ou invalidité des anciens contrats.
            </li>
            <li>
              <strong>Comparer seulement les frais de gestion</strong> en oubliant les frais de
              supports, souvent plus lourds que les frais du contrat.
            </li>
            <li>
              <strong>Mélanger les compartiments</strong> : vérifier que la ventilation reçue
              est celle d'origine, car elle détermine la fiscalité à la sortie.
            </li>
            <li>
              <strong>Oublier le suivi après transfert</strong> : conservez les relevés de
              l'ancien et du nouveau plan, notamment pour prouver la nature des versements.
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Comment transférer son PER vers un autre organisme ?</h3>
          <p>
            Ouvrez un PER chez l'organisme d'accueil, puis signez la demande de transfert : c'est
            lui qui contacte votre ancien organisme et organise le transfert. Vous n'avez pas à
            demander le rachat.
          </p>

          <h3>Quels sont les frais de transfert d'un PER ?</h3>
          <p>
            Ils sont plafonnés à {pct(fraisMaxPct)} des droits acquis et nuls {anneesNuls} ans
            après le premier versement dans le plan (dix ans pour un PERP ou un Madelin).
            Vérifiez le montant exact avant de lancer la demande.
          </p>

          <h3>Quel est le délai pour transférer un PER ?</h3>
          <p>
            Pour un PER individuel, {delaiMois} mois au plus à compter de la réception de la
            demande complète par l'organisme d'origine (trois mois pour un PER d'entreprise,
            jusqu'à quatre mois pour un ancien contrat). Un dossier incomplet repousse la date de
            départ du délai.
          </p>

          <h3>Peut-on transférer un PERP ou un Madelin vers un PER ?</h3>
          <p>
            Oui, vers un PER individuel. Vérifiez au préalable les garanties du contrat d'origine
            et les éventuels frais.
          </p>

          <h3>Peut-on transférer un PERCO ou un article 83 vers un PER ?</h3>
          <p>
            Oui, vers un PER d'entreprise ou un PER individuel selon la nature des sommes et la
            situation du salarié (en poste ou ayant quitté l'entreprise).
          </p>

          <h3>Un transfert de PER est-il imposé ?</h3>
          <p>
            Non, un transfert ne déclenche ni impôt ni prélèvements sociaux : il ne s'agit pas
            d'une sortie. La nature fiscale des sommes est conservée.
          </p>

          <h3>Peut-on transférer un PER vers une assurance-vie ?</h3>
          <p>
            Non. Les sommes ne sortent du PER qu'à la retraite ou dans un cas de déblocage
            anticipé ; elles ne peuvent pas être transférées sur une assurance-vie.
          </p>

          <h3>Perd-on l'économie d'impôt en transférant son PER ?</h3>
          <p>
            Non. L'économie d'impôt déjà obtenue reste acquise ; ce sont les versements déduits
            qui seront imposés à la sortie, quel que soit l'organisme qui détient le plan.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Transférer un PER est un acte de gestion, pas une sortie. Il se juge sur trois
            lignes : le coût du transfert, l'économie de frais qu'il permet et ce que l'on perd
            éventuellement dans l'ancien contrat. Dans l'exemple de ce guide, le point mort tombe
            à environ {String(pointMortAnnees).replace(".", ",")} ans pour {euros(encours)} ; un
            encours plus faible ou un écart de frais plus mince le repousse, et une ancienneté de
            plus de {anneesNuls} ans le supprime.
          </p>
          <p>
            Pour approfondir : le{" "}
            <a href="/guide/quel-est-le-meilleur-per">guide sur le choix d'un PER</a> donne les
            critères de comparaison, la{" "}
            <a href="/strategies/per">page stratégie PER</a> la vue d'ensemble, et si vous
            souhaitez ouvrir un nouveau plan,{" "}
            <a href="/guide/ouvrir-un-per-etapes-documents-delais">le guide d'ouverture</a>{" "}
            détaille la démarche. Pour replacer ce choix dans l'ensemble de votre épargne,{" "}
            <a href="/bilan-retraite">le bilan retraite gratuit de 15 minutes</a> sert à poser le
            cadre.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/combien-coute-un-per">Combien coûte un PER ?</a></li>
            <li><a href="/guide/per-bancaire-frais-gestion-horizon">PER bancaire : frais, gestion, horizon</a></li>
            <li><a href="/guide/fiscalite-sortie-per">Fiscalité de la sortie du PER</a></li>
            <li><a href="/guide/deblocage-anticipe-per">Déblocage anticipé du PER</a></li>
            <li><a href="/guide/preparer-sa-retraite-guide-complet">Préparer sa retraite : le guide complet</a></li>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : elle se
              limite à une piste de réflexion à examiner cas par cas. Les plafonds de frais, les
              délais et les règles propres aux anciens produits sont à confirmer auprès de votre
              organisme et dans les textes en vigueur en {maj}, et peuvent évoluer. Les exemples
              chiffrés sont des illustrations composites, sans promesse de rendement ni de gain
              garanti. Les supports en unités de compte présentent un risque de perte en capital,
              et les performances passées ne préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Un transfert se calcule. Le bon moment, lui, dépend de l'ensemble de votre épargne." />
    </>
  );
}
