import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { V3_REG_REVERSION, euros, pct } from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const R = V3_REG_REVERSION;
const tauxBase = R.tauxRegimeGeneral; // 54 %
const tauxCompl = R.tauxAgircArrco; // 60 %
const ageMin = R.ageMinimum; // 55 ans
const plafondSeul = R.plafondRessourcesSeul;
const plafondCouple = R.plafondRessourcesCouple;

// Arrondi au centime pour éviter les artefacts de virgule flottante.
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

// ---- Exemple chiffré : les deux pensions de réversion, avant tout plafond de ressources ----
const reversionBaseMensuelle = r2((R.pensionBaseMensuelleDefuntExemple * tauxBase) / 100);
const reversionBaseAnnuelle = r2(reversionBaseMensuelle * 12);
const reversionComplAnnuelle = r2((R.complementaireAnnuelleDefuntExemple * tauxCompl) / 100);
const reversionComplMensuelle = r2(reversionComplAnnuelle / 12);
const totalMensuel = r2(reversionBaseMensuelle + reversionComplMensuelle);
const totalAnnuel = r2(reversionBaseAnnuelle + reversionComplAnnuelle);
const perteMensuelleEntreDeux = r2(
  R.pensionBaseMensuelleDefuntExemple + R.complementaireAnnuelleDefuntExemple / 12 - totalMensuel
);

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Pension de réversion de l'Assurance retraite. Fiche F13104, vérifiée le 1er janvier 2026 : mariage, âge, plafond de ressources, taux, partage entre ex-conjoints, date d'effet",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F13104",
  },
  {
    label:
      "L'Assurance retraite — pension de réversion du régime général : conditions, plafond de ressources, demande",
    url: "https://www.lassuranceretraite.fr",
  },
  {
    label:
      "Agirc-Arrco — Réglementation, fiche « Réversion des conjoints » : taux, âge, absence de condition de ressources, remariage",
    url: "https://reglementation.agirc-arrco.fr/home/liste-fiche-reglementaires/listes-area/liste-de-fiches-reglementaires/reversion-des-conjoints.html",
  },
  {
    label:
      "Info Retraite — portail officiel inter-régimes : demande de réversion, liste des justificatifs, compte retraite",
    url: "https://www.info-retraite.fr",
  },
  {
    label:
      "Service-Public.gouv.fr — Un proche est décédé : démarches et droits du conjoint survivant. Fiche F16507",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F16507",
  },
  {
    label:
      "Service-Public.gouv.fr — Capital décès versé pour le décès d'un salarié du secteur privé. Fiche F3005",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F3005",
  },
  {
    label:
      "Service-Public.gouv.fr — Comment est calculée la retraite quand on a cotisé à plusieurs régimes de retraite ? Fiche F31666",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31666",
  },
];

export default function GuidePensionReversion() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · Retraite et couple</span>
          <h1>Pension de réversion : conditions, plafond et démarche</h1>
          <p className="sub">
            Qui y a droit, quel taux, quel plafond de ressources, quels documents, et comment
            préparer l'épargne du conjoint qui restera. Mis à jour le {R.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> la pension de réversion verse au conjoint survivant
              une partie de la retraite du défunt. Au régime général, elle est de {pct(tauxBase)} de
              la retraite de base, sous conditions d'âge ({ageMin} ans) et de ressources. À
              l'Agirc-Arrco, elle est de {pct(tauxCompl)} de la retraite complémentaire, sans
              condition de ressources, mais elle prend fin en cas de remariage. Seuls les conjoints mariés et,
              selon les cas, les ex-conjoints sont concernés : le partenaire de Pacs et le
              concubin ne le sont pas. La demande n'est pas automatique.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#qui">Qui a droit à une pension de réversion ?</a></li>
              <li><a href="#regime-general">Quelles conditions au régime général ?</a></li>
              <li><a href="#agirc-arrco">Et à l'Agirc-Arrco ?</a></li>
              <li><a href="#cumul">Peut-on cumuler réversion et pension personnelle ?</a></li>
              <li><a href="#ex-conjoint">Que se passe-t-il pour un ex-conjoint ?</a></li>
              <li><a href="#demarche">Comment faire sa demande, étape par étape ?</a></li>
              <li><a href="#exemple">Exemple chiffré : ce que représente une réversion</a></li>
              <li><a href="#epargne">Quel impact pour l'épargne du couple ?</a></li>
              <li><a href="#pieges">Quels pièges éviter ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Prenons Odile, 63 ans (cas composite, sans lien avec une situation réelle). Son mari,
            retraité, vient de décéder. Elle perçoit sa propre pension, mais le foyer vivait aussi
            sur celle de son mari, et elle se demande quelle part lui reviendra, à quelles conditions
            et si elle doit en faire la demande.
          </p>
          <p>
            Ce guide s'adresse à ceux qui veulent comprendre la réversion avant d'avoir à la demander,
            ou qui y sont confrontés. Il distingue le régime général (retraite de base des salariés
            du privé) et l'Agirc-Arrco (retraite complémentaire), car leurs règles diffèrent. Le
            plafond de ressources du régime général cité est celui publié pour 2026 ; il est
            revalorisé chaque année et se vérifie sur{" "}
            <a href="https://www.lassuranceretraite.fr" target="_blank" rel="noopener noreferrer">lassuranceretraite.fr</a>.
            Les fonctionnaires, indépendants et autres régimes ont leurs propres règles, non
            traitées ici.
          </p>

          <h2 id="qui">Qui a droit à une pension de réversion ?</h2>
          <p>
            La pension de réversion est réservée aux personnes qui étaient mariées avec le défunt. Le
            partenaire de Pacs et le concubin n'y ont pas droit, quelle que soit la durée de la
            vie commune. Cette différence a des conséquences concrètes pour les couples non mariés :
            elle doit se compenser par d'autres outils.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Situation du survivant</th>
                  <th>Droit à une réversion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Marié(e) avec le défunt</td>
                  <td>Oui, sous conditions du régime</td>
                </tr>
                <tr>
                  <td>Divorcé(e) du défunt</td>
                  <td>Possible selon les règles de chaque régime, souvent au prorata de la durée du mariage</td>
                </tr>
                <tr>
                  <td>Partenaire de Pacs</td>
                  <td>Non</td>
                </tr>
                <tr>
                  <td>Concubin(e)</td>
                  <td>Non</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="regime-general">Quelles conditions au régime général ?</h2>
          <p>
            Au régime général, la pension de réversion représente {pct(tauxBase)} de la retraite de
            base du défunt, sous réserve de remplir une condition d'âge et de ne pas dépasser un
            plafond de ressources (lassuranceretraite.fr, à vérifier au moment de la demande).
          </p>
          <ul>
            <li>
              <strong>Âge minimal :</strong> {ageMin} ans pour le conjoint survivant.
            </li>
            <li>
              <strong>Plafond de ressources :</strong> les ressources brutes annuelles du survivant
              (et, le cas échéant, de son nouveau couple) doivent rester inférieures à{" "}
              {eur(plafondSeul)} pour une personne seule et {eur(plafondCouple)} pour un couple
              (service-public.gouv.fr, fiche F13104, vérifiée le 1er janvier 2026). Les revenus
              d'activité ne sont retenus qu'à 70 %. Le montant est revalorisé chaque année :
              vérifiez-le au moment de la demande.
            </li>
            <li>
              <strong>Calcul :</strong> {pct(tauxBase)} de la retraite de base du défunt. Si les
              ressources dépassent le plafond, la pension est réduite d'un montant égal au
              dépassement, et peut être supprimée.
            </li>
          </ul>
          <p>
            Ces règles sont celles que nous avons relevées en novembre 2026. Elles ont évolué par
            le passé : confirmez-les sur le site officiel avant de décider.
          </p>

          <h2 id="agirc-arrco">Et à l'Agirc-Arrco ?</h2>
          <p>
            La retraite complémentaire du secteur privé fonctionne différemment : la pension de
            réversion de l'Agirc-Arrco représente {pct(tauxCompl)} des points du défunt, et elle
            est attribuée sans condition de ressources. Elle est versée à partir de {ageMin} ans,
            sans condition d'âge si le survivant a au moins deux enfants à charge au moment du
            décès ou s'il est invalide. Le remariage y met fin définitivement ; le Pacs et le
            concubinage n'y ouvrent pas droit (réglementation Agirc-Arrco, fiche « Réversion des
            conjoints »).
          </p>
          <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Critère</th>
                <th>Régime général (base)</th>
                <th>Agirc-Arrco (complémentaire)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Taux</td>
                <td>{pct(tauxBase)} de la retraite de base du défunt</td>
                <td>{pct(tauxCompl)} de la retraite complémentaire du défunt</td>
              </tr>
              <tr>
                <td>Âge du survivant</td>
                <td>{ageMin} ans minimum</td>
                <td>{ageMin} ans minimum, sauf deux enfants à charge ou invalidité</td>
              </tr>
              <tr>
                <td>Condition de ressources</td>
                <td>Oui : {eur(plafondSeul)} par an seul, {eur(plafondCouple)} en couple (2026)</td>
                <td>Non</td>
              </tr>
              <tr>
                <td>Remariage du survivant</td>
                <td>Les ressources du nouveau couple entrent dans le plafond</td>
                <td>Fin définitive du droit</td>
              </tr>
              <tr>
                <td>Demande</td>
                <td colSpan={2}>
                  Une seule demande en ligne via info-retraite.fr, transmise aux régimes concernés
                </td>
              </tr>
            </tbody>
          </table>
          </div>

          <h2 id="cumul">Peut-on cumuler réversion et pension personnelle ?</h2>
          <p>
            Oui : la pension de réversion s'ajoute à votre propre retraite. C'est même la situation
            la plus courante. La seule limite concerne le régime général : la condition de
            ressources prend en compte vos revenus personnels, dont votre retraite, ce qui peut
            réduire ou supprimer la réversion de base.
          </p>
          <p>
            La pension de réversion est imposable comme une pension de retraite. Si le décès change
            votre situation fiscale (veuvage, nombre de parts), l'effet sur l'impôt dépend de votre
            situation et mérite un examen : voir{" "}
            <a href="/guide/estimer-sa-pension-retraite-taux-de-remplacement">notre guide sur l'estimation de la pension</a>{" "}
            pour les ordres de grandeur.
          </p>

          <h2 id="ex-conjoint">Que se passe-t-il pour un ex-conjoint ?</h2>
          <p>
            Les ex-conjoints divorcés peuvent y avoir droit. Au régime général, l'ex-conjoint est
            traité comme un conjoint survivant, même s'il vit en couple ; à l'Agirc-Arrco, seul
            l'ex-conjoint non remarié peut y prétendre. Quand le défunt a connu plusieurs mariages,
            la pension est partagée entre les conjoints successifs, au prorata de la durée de
            chaque mariage. Si vous êtes dans ce cas, demandez à chaque caisse la règle qui s'applique à
            votre situation et conservez les actes d'état civil.
          </p>

          <h2 id="demarche">Comment faire sa demande, étape par étape ?</h2>
          <p>
            La demande de réversion n'est pas automatique : elle se dépose à l'initiative du
            survivant, en principe à partir du portail Info Retraite, qui la transmet aux régimes
            concernés.
          </p>
          <ol>
            <li>
              <strong>Informer les caisses du décès.</strong> L'acte de décès est généralement
              transmis par l'état civil, mais vérifiez que les régimes l'ont bien reçu.
            </li>
            <li>
              <strong>Rassembler les pièces</strong> (voir ci-dessous) avec l'outil « Mes
              justificatifs » du portail.
            </li>
            <li>
              <strong>Déposer la demande en ligne</strong> depuis le compte retraite, rubrique
              dédiée à la réversion.
            </li>
            <li>
              <strong>Déclarer ses ressources</strong> au régime général, avec les justificatifs
              de revenus demandés.
            </li>
            <li>
              <strong>Suivre le dossier</strong> et répondre aux demandes de pièces.
            </li>
            <li>
              <strong>Contrôler les notifications</strong> de chaque régime et conserver les
              justificatifs.
            </li>
          </ol>
          <p>Pièces fréquemment demandées :</p>
          <ul>
            <li>Acte de décès et livret de famille ou acte de mariage.</li>
            <li>Pièce d'identité du demandeur et relevé d'identité bancaire.</li>
            <li>Justificatifs de ressources (avis d'imposition, bulletins, relevés de pensions).</li>
            <li>Éléments sur la carrière ou la retraite du défunt, si la caisse les demande.</li>
          </ul>
          <p>
            Le capital décès, versé dans certains cas aux proches, est une démarche distincte :
            voir la fiche F3005 de service-public.gouv.fr.
          </p>

          <h2 id="exemple">Exemple chiffré : ce que représente une réversion</h2>
          <div className="note">
            <p>
              Les montants sont des hypothèses d'illustration, sans lien avec un cas réel. Ils
              s'appliquent avant toute application du plafond de ressources du régime général ; la
              pension de base effectivement versée peut donc être plus faible.
            </p>
          </div>
          <p>
            Le mari d'Odile percevait {euros(R.pensionBaseMensuelleDefuntExemple)} par mois de
            retraite de base et {euros(R.complementaireAnnuelleDefuntExemple)} par an de retraite
            complémentaire.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Régime</th>
                  <th>Calcul</th>
                  <th>Réversion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Régime général (base)</td>
                  <td>
                    {euros(R.pensionBaseMensuelleDefuntExemple)} × {pct(tauxBase)}
                  </td>
                  <td>
                    {eur(reversionBaseMensuelle)} par mois ({eur(reversionBaseAnnuelle)} par an)
                  </td>
                </tr>
                <tr>
                  <td>Agirc-Arrco (complémentaire)</td>
                  <td>
                    {euros(R.complementaireAnnuelleDefuntExemple)} × {pct(tauxCompl)}
                  </td>
                  <td>
                    {eur(reversionComplAnnuelle)} par an ({eur(reversionComplMensuelle)} par mois)
                  </td>
                </tr>
                <tr>
                  <td>Total avant plafond de ressources</td>
                  <td>Somme des deux lignes</td>
                  <td>
                    {eur(totalMensuel)} par mois ({eur(totalAnnuel)} par an)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Le foyer perdait donc, avant ses autres ajustements, environ{" "}
            {eur(perteMensuelleEntreDeux)} par mois par rapport aux pensions du défunt, soit la
            part non reversée. Cette perte est le montant qu'une épargne privée, ou une
            organisation différente des dépenses, doit couvrir. Pour un revenu élevé du survivant,
            la réversion de base peut être réduite par le plafond de ressources ; l'écart
            s'élargit alors.
          </p>

          <h2 id="epargne">Quel impact pour l'épargne du couple ?</h2>
          <p>
            La réversion ne couvre jamais l'intégralité de la pension du défunt, et elle n'existe pas
            pour les couples non mariés. Dans un couple, l'épargne privée sert donc aussi de filet
            de sécurité pour le survivant : répartition des versements entre conjoints, clause
            bénéficiaire des contrats d'assurance-vie, protection d'un PER. Notre guide sur{" "}
            <a href="/guide/epargne-retraite-en-couple-et-transmission">l'épargne retraite en couple et la transmission</a>{" "}
            détaille ces arbitrages, et celui sur{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">donation ou assurance-vie</a>{" "}
            les outils de transmission.
          </p>

          <h2 id="pieges">Quels pièges éviter ?</h2>
          <ul>
            <li>
              <strong>Attendre que la caisse agisse.</strong> La réversion se demande. Au régime
              général, une demande déposée dans l'année du décès peut prendre effet le mois suivant
              le décès ; au-delà, pas avant la date de la demande (F13104).
            </li>
            <li>
              <strong>Oublier un régime.</strong> Une demande par le portail couvre en principe
              tous les régimes, mais vérifiez chaque accusé de réception.
            </li>
            <li>
              <strong>Ignorer le plafond de ressources</strong> du régime général au moment de la
              demande, et ne pas déclarer un changement de situation.
            </li>
            <li>
              <strong>Compter sur la réversion en cas de Pacs ou de concubinage</strong> : elle
              n'existe pas.
            </li>
            <li>
              <strong>Confondre capital décès et réversion</strong> : ce sont deux démarches
              distinctes.
            </li>
            <li>
              <strong>Ne pas anticiper la baisse de revenu</strong> du foyer après le décès.
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Quelles sont les conditions pour toucher la pension de réversion ?</h3>
          <p>
            Avoir été marié(e) avec le défunt, et, au régime général, avoir au moins {ageMin} ans
            et des ressources inférieures à un plafond. À l'Agirc-Arrco, il n'y a pas de condition
            de ressources : il faut avoir {ageMin} ans (sauf deux enfants à charge ou invalidité)
            et ne pas s'être remarié(e).
          </p>

          <h3>Quel est le montant de la pension de réversion ?</h3>
          <p>
            {pct(tauxBase)} de la retraite de base du défunt au régime général, {pct(tauxCompl)} de la
            retraite complémentaire à l'Agirc-Arrco. Dans l'exemple de ce guide, cela représente{" "}
            {eur(totalMensuel)} par mois au total avant plafond de ressources.
          </p>

          <h3>Quel est le plafond de ressources de la pension de réversion ?</h3>
          <p>
            Au régime général, les ressources brutes annuelles doivent rester inférieures à{" "}
            {eur(plafondSeul)} pour une personne seule et {eur(plafondCouple)} pour un couple
            (montants publiés pour 2026, revalorisés chaque année). Au-delà, la réversion est
            réduite du dépassement. L'Agirc-Arrco n'applique pas de plafond.
          </p>

          <h3>Le PACS ou le concubinage ouvrent-ils droit à la réversion ?</h3>
          <p>
            Non. Seuls les conjoints mariés, et selon les régimes les ex-conjoints, sont concernés.
            Pour les couples non mariés, d'autres outils existent (clause bénéficiaire, épargne
            personnelle).
          </p>

          <h3>Comment demander la pension de réversion ?</h3>
          <p>
            En ligne, depuis le compte retraite sur info-retraite.fr, avec les justificatifs
            demandés. La demande est transmise aux régimes concernés. Elle n'est pas automatique.
          </p>

          <h3>La pension de réversion est-elle imposable ?</h3>
          <p>
            Oui, elle est imposable comme une pension de retraite. L'effet sur votre impôt dépend de
            votre situation après le décès.
          </p>

          <h3>Un ex-conjoint peut-il percevoir une pension de réversion ?</h3>
          <p>
            Oui, selon les régimes, souvent au prorata de la durée de mariage lorsque le défunt a
            eu plusieurs conjoints. Renseignez-vous auprès de chaque caisse.
          </p>

          <h3>La réversion s'arrête-t-elle en cas de remariage ?</h3>
          <p>
            À l'Agirc-Arrco, oui : le remariage met fin définitivement à la réversion. Au régime
            général, il ne la supprime pas en tant que tel, mais les ressources du nouveau couple
            sont prises en compte dans le plafond. Vérifiez votre cas auprès de chaque caisse.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La pension de réversion est un filet partiel : elle ne remplace qu'une part de la
            pension du défunt, ne concerne que les couples mariés et, au régime général, dépend
            des ressources du survivant. Elle est cumulable avec la pension personnelle, mais la
            condition de ressources peut en réduire l'effet.
          </p>
          <p>
            Pour un couple, la question utile en amont est donc moins « quelle réversion ? » que «
            quel revenu restera au survivant ? ». Réponse qui se construit avec l'épargne privée et
            la transmission, comme l'explique notre guide{" "}
            <a href="/guide/epargne-retraite-en-couple-et-transmission">épargne retraite en couple</a>.
            Pour une vue d'ensemble, voir <a href="/guide/preparer-sa-retraite-guide-complet">notre guide complet pour préparer sa retraite</a>.
          </p>
          <p>
            Si vous souhaitez mesurer ce que vos pensions et votre épargne laisseraient à un
            conjoint survivant, le <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a>{" "}
            permet d'en discuter, sans engagement.
          </p>

          <h2 id="lire-aussi">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/epargne-retraite-en-couple-et-transmission">Épargne retraite en couple et transmission</a></li>
            <li><a href="/guide/donation-ou-assurance-vie-transmission">Donation ou assurance-vie : quelle transmission ?</a></li>
            <li><a href="/guide/estimer-sa-pension-retraite-taux-de-remplacement">Estimer sa pension et son taux de remplacement</a></li>
            <li><a href="/guide/demande-de-retraite-demarches-calendrier">Demande de retraite : démarches et calendrier</a></li>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seuls les
              régimes de retraite peuvent confirmer vos droits. Les taux, âges et conditions cités
              sont ceux relevés en novembre 2026 et peuvent évoluer ; le plafond de ressources cité
              est celui de 2026 et sera revalorisé. Le cas chiffré est une illustration pédagogique. Les
              placements en unités de compte présentent un risque de perte en capital ; les
              performances passées ne préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="La réversion couvre une partie du revenu. Le reste se prépare à deux." />
    </>
  );
}
