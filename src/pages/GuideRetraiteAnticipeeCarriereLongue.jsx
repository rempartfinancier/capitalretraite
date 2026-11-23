import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RETRAITE_PROGRESSIVE_CUMUL,
  V3_REG_CARRIERE_LONGUE,
  euros,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const C = V3_REG_CARRIERE_LONGUE;
const seuils = C.seuilsDebutActivite; // 16, 18, 20, 21
const agesAnticipes = C.agesDepartAnticipe; // 58, 60, 62, 63
const generations = RETRAITE_PROGRESSIVE_CUMUL.ageLegalParGeneration;

// "62 ans et 9 mois" -> 753 mois
const enMois = (txt) => {
  const a = /(\d+)\s*ans/.exec(txt);
  const m = /(\d+)\s*mois/.exec(txt);
  return (a ? parseInt(a[1], 10) * 12 : 0) + (m ? parseInt(m[1], 10) : 0);
};
const formatEcart = (mois) => {
  if (mois <= 0) return "aucun gain";
  const a = Math.floor(mois / 12);
  const m = mois % 12;
  const partA = a > 0 ? `${a} an${a > 1 ? "s" : ""}` : "";
  const partM = m > 0 ? `${m} mois` : "";
  return [partA, partM].filter(Boolean).join(" et ");
};
const ecarts = generations.map((g) => ({
  ...g,
  mois: enMois(g.age),
  gains: agesAnticipes.map((a) => formatEcart(enMois(g.age) - a * 12)),
}));

// ---- Exemple : impact sur l'épargne à constituer (arithmétique simple, sans rendement) ----
const ageLegalExemple = ecarts[ecarts.length - 1]; // génération 1969 et suivantes
const anneesGagnees = (ageLegalExemple.mois - C.ageDepartExemple * 12) / 12;
const besoinCapital = C.complementMensuelExemple * 12 * anneesGagnees;
const anneesEpargne = C.ageDepartExemple - C.ageActuelExemple;
const effortMensuel = Math.round((besoinCapital / (anneesEpargne * 12)) * 100) / 100;
const eur2 = (n) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Retraite anticipée pour carrière longue du salarié. Fiche F13845, vérifiée le 1er septembre 2026 : seuils de début d'activité, trimestres de début d'activité, attestation, simulateur",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F13845",
  },
  {
    label:
      "Service-Public.gouv.fr — À partir de quel âge un salarié peut-il partir en retraite ? Fiche F14043, vérifiée le 14 août 2026 : âge légal par génération",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14043",
  },
  {
    label:
      "Service-Public.gouv.fr — Durée d'assurance retraite du salarié du secteur privé. Fiche F1761",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1761",
  },
  {
    label:
      "Service-Public.gouv.fr — Retraite du salarié dans le secteur privé : rachat de trimestres. Fiche F15675",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F15675",
  },
  {
    label:
      "Info Retraite — compte retraite, relevé de carrière et service « Obtenir mon âge de départ à la retraite »",
    url: "https://www.info-retraite.fr",
  },
  {
    label:
      "L'Assurance retraite — informations sur la retraite anticipée pour carrière longue",
    url: "https://www.lassuranceretraite.fr",
  },
];

export default function GuideRetraiteAnticipeeCarriereLongue() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · Départ anticipé</span>
          <h1>Retraite anticipée pour carrière longue : conditions et démarche</h1>
          <p className="sub">
            Début d'activité, trimestres cotisés, attestation, pièges et effet sur l'épargne à
            constituer : le dispositif pas à pas. Mis à jour le {C.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> la retraite anticipée pour carrière longue permet de
              partir avant l'âge légal si vous avez commencé à travailler avant {seuils[0]},{" "}
              {seuils[1]}, {seuils[2]} ou {seuils[3]} ans et justifié d'une durée d'assurance
              cotisée suffisante, tous régimes confondus. Il faut aussi avoir validé{" "}
              {C.trimestresDebutActivite} trimestres en tout début d'activité ({C.trimestresDebutActiviteNesT4}{" "}
              si vous êtes né entre le 1er octobre et le 31 décembre). La durée cotisée exigée
              dépend de votre génération : lisez-la sur le simulateur officiel, car elle ne se
              devine pas. L'attestation se télécharge sur le compte retraite, une fois le relevé de
              carrière à jour.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#conditions">Quelles sont les conditions de la retraite anticipée carrière longue ?</a></li>
              <li><a href="#age">À quel âge partir selon la date de début d'activité ?</a></li>
              <li><a href="#cotises">Quels trimestres comptent comme « cotisés » ?</a></li>
              <li><a href="#demarche">Comment demander sa retraite anticipée, étape par étape ?</a></li>
              <li><a href="#rachat">Peut-on racheter des trimestres pour y accéder ?</a></li>
              <li><a href="#epargne">Quel impact sur l'épargne à constituer ?</a></li>
              <li><a href="#exemple">Exemple chiffré : un départ à {C.ageDepartExemple} ans</a></li>
              <li><a href="#pieges">Quels pièges éviter ?</a></li>
              <li><a href="#quand">Partir plus tôt : quand ça vaut le coup, quand éviter</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Prenons Karim, 58 ans (cas composite, sans lien avec une situation réelle). Il a
            commencé comme apprenti à 17 ans, n'a presque jamais interrompu sa carrière, et entend
            dire qu'il pourrait partir à 60 ans. Il veut savoir ce qui est exact, à quelles
            conditions, et ce que cela change pour l'épargne qu'il doit encore constituer.
          </p>
          <p>
            Le dispositif de carrière longue est l'une des rares exceptions à l'âge légal de départ.
            Il est réservé à ceux qui ont commencé tôt et cotisé longtemps ; il ne se confond ni
            avec le rachat de trimestres, ni avec la retraite progressive. Ce guide expose les
            conditions, la démarche et ses limites. Il ne chiffre volontairement pas la durée
            cotisée exigée : le tableau officiel dépend de la génération et de l'âge de départ, et
            doit se lire sur{" "}
            <a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F13845" target="_blank" rel="noopener noreferrer">service-public.gouv.fr</a>{" "}
            ou sur <a href="https://www.info-retraite.fr" target="_blank" rel="noopener noreferrer">info-retraite.fr</a>.
          </p>

          <h2 id="conditions">Quelles sont les conditions de la retraite anticipée carrière longue ?</h2>
          <p>
            Trois conditions se cumulent : un début d'activité précoce, un nombre minimal de
            trimestres validés en tout début de carrière, et une durée d'assurance cotisée
            suffisante, tous régimes confondus (service-public.gouv.fr, F13845).
          </p>
          <ol>
            <li>
              <strong>Début d'activité avant {seuils[0]}, {seuils[1]}, {seuils[2]} ou {seuils[3]} ans.</strong>{" "}
              Plus le début est précoce, plus l'âge de départ possible est bas.
            </li>
            <li>
              <strong>{C.trimestresDebutActivite} trimestres en tout début d'activité</strong>,
              ou {C.trimestresDebutActiviteNesT4} si vous êtes né entre le 1er octobre et le 31
              décembre. La fiche officielle précise la période concernée.
            </li>
            <li>
              <strong>Une durée d'assurance cotisée</strong> (tous régimes) au moins égale à celle
              qu'exige votre génération, parfois majorée selon l'âge de départ visé : à lire sur le
              simulateur officiel, sans la deviner.
            </li>
          </ol>
          <p>
            Les barèmes, seuils et trimestres cités ici sont ceux affichés par service-public.gouv.fr
            en novembre 2026 ; ils ont été modifiés plusieurs fois ces dernières années. Un contrôle sur votre compte
            retraite reste indispensable.
          </p>

          <h2 id="age">À quel âge partir selon la date de début d'activité ?</h2>
          <p>
            L'âge de départ possible dépend de la tranche de début d'activité : les repères de ce
            guide sont {agesAnticipes.join(", ")} ans, pour des débuts avant {seuils.join(", ")} ans
            respectivement. Ces âges sont à comparer à l'âge légal de votre génération, qui reste la
            référence du régime normal. Le tableau ci-dessous calcule le gain théorique par rapport
            à l'âge légal ; il ne dit rien de votre éligibilité.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Génération</th>
                  <th>Âge légal</th>
                  {agesAnticipes.map((a, i) => (
                    <th key={a}>
                      Départ à {a} ans (début avant {seuils[i]} ans) : gain par rapport à l'âge légal
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ecarts.map((g) => (
                  <tr key={g.generation}>
                    <td>{g.generation}</td>
                    <td>{g.age}</td>
                    {g.gains.map((gain, i) => (
                      <td key={i}>{gain}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Source de l'âge légal : service-public.gouv.fr, fiche F14043 (vérifiée le 14 août 2026).
            Ce tableau ne donne que l'écart d'âge. La durée cotisée à justifier pour chaque
            tranche figure dans la fiche F13845 et sur le simulateur de service-public.gouv.fr ; nous
            ne la recopions pas, car elle varie avec la génération.
          </p>

          <h2 id="cotises">Quels trimestres comptent comme « cotisés » ?</h2>
          <p>
            La condition de durée porte sur la durée cotisée, pas sur la durée d'assurance totale :
            certaines périodes, comme le chômage indemnisé ou la maladie, valident des trimestres
            pour la retraite sans toujours compter comme cotisés pour la carrière longue. Seule la
            règle en vigueur, lue sur votre compte, fait foi.
          </p>
          <ul>
            <li>
              Les trimestres de travail salarié ou non salarié avec cotisation comptent comme
              cotisés.
            </li>
            <li>
              Certaines périodes assimilées (service national, maternité, certaines périodes de
              chômage ou de maladie) sont retenues dans des limites fixées par les textes.
            </li>
            <li>
              Les trimestres obtenus par rachat n'ont pas la même valeur selon la condition visée :
              voir plus bas.
            </li>
          </ul>
          <p>
            D'où l'importance d'un relevé de carrière irréprochable :{" "}
            <a href="/guide/verifier-releve-de-carriere-retraite">notre guide sur la vérification du relevé</a>{" "}
            détaille les périodes les plus souvent oubliées, notamment celles du tout début de
            carrière.
          </p>

          <h2 id="demarche">Comment demander sa retraite anticipée, étape par étape ?</h2>
          <ol>
            <li>
              <strong>Faire corriger le relevé de carrière.</strong> Une période de début
              d'activité manquante peut vous faire échouer à la condition des {C.trimestresDebutActivite}{" "}
              trimestres.
            </li>
            <li>
              <strong>Tester son éligibilité.</strong> Le service en ligne « Obtenir mon âge de
              départ à la retraite » du compte retraite indique si vous remplissez les conditions.
            </li>
            <li>
              <strong>Télécharger l'attestation.</strong> Selon la date de départ, vous obtenez une
              attestation provisoire ou définitive (service-public.gouv.fr, F13845).
            </li>
            <li>
              <strong>Déposer la demande de retraite.</strong> Elle suit le circuit habituel :{" "}
              <a href="/guide/demande-de-retraite-demarches-calendrier">notre guide sur la demande de retraite</a>{" "}
              détaille le calendrier et les justificatifs.
            </li>
            <li>
              <strong>Informer l'employeur et respecter le préavis.</strong>
            </li>
            <li>
              <strong>Contrôler la notification de pension</strong> de chaque régime : la
              retraite complémentaire a ses propres règles d'anticipation.
            </li>
          </ol>

          <h2 id="rachat">Peut-on racheter des trimestres pour y accéder ?</h2>
          <p>
            Le rachat de trimestres, ou « versement pour la retraite », sert à compléter la durée
            d'assurance. Mais, en principe, il ne remplace pas la durée cotisée exigée par le
            dispositif de carrière longue : les trimestres rachetés peuvent compter pour le taux
            plein sans valoir comme cotisés pour cette condition. Cette règle est à vérifier auprès
            de votre caisse avant tout versement, car l'erreur coûte cher.
          </p>
          <p>
            Pour mesurer ce qu'un rachat apporte réellement, voir{" "}
            <a href="/guide/combien-coute-rachat-trimestres-retraite">combien coûte le rachat de trimestres</a>{" "}
            et <a href="/guide/surcote-decote-retraite">comment fonctionnent surcote et décote</a>.
          </p>

          <h2 id="epargne">Quel impact sur l'épargne à constituer ?</h2>
          <p>
            Partir plus tôt réduit la durée de cotisation et d'épargne, et allonge la durée pendant
            laquelle il faut vivre de sa retraite. Deux effets s'ajoutent : moins d'années pour
            alimenter un PER ou une assurance-vie, et plus d'années à financer avec la pension et
            l'épargne. La retraite complémentaire peut, selon la situation, être touchée
            différemment de la retraite de base : consultez la notification de chaque régime.
          </p>
          <p>
            Il n'existe pas de règle générale : l'écart dépend du complément de revenu recherché,
            des produits d'épargne détenus et de l'âge de départ. Notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> permet de tester différents
            âges et niveaux d'effort.
          </p>

          <h2 id="exemple">Exemple chiffré : un départ à {C.ageDepartExemple} ans</h2>
          <div className="note">
            <p>
              Hypothèses d'illustration, sans lien avec un cas réel : pas de rendement, pas
              d'inflation, aucune prévision.
            </p>
          </div>
          <p>
            Karim, génération {C.generationExemple} (âge légal : {ageLegalExemple.age}), vise un
            départ à {C.ageDepartExemple} ans, soit {anneesGagnees} ans avant l'âge légal. Il
            souhaite compenser, pendant ces {anneesGagnees} années, un écart de revenu de{" "}
            {euros(C.complementMensuelExemple)} par mois. Il lui reste {anneesEpargne} ans pour
            épargner (de {C.ageActuelExemple} à {C.ageDepartExemple} ans).
          </p>
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
                  <td>Années gagnées sur l'âge légal</td>
                  <td>{ageLegalExemple.age} − {C.ageDepartExemple} ans</td>
                  <td>{anneesGagnees} ans</td>
                </tr>
                <tr>
                  <td>Capital à réunir pour ces années</td>
                  <td>
                    {euros(C.complementMensuelExemple)} × 12 × {anneesGagnees}
                  </td>
                  <td>{euros(besoinCapital)}</td>
                </tr>
                <tr>
                  <td>Effort mensuel sur {anneesEpargne} ans, sans rendement</td>
                  <td>
                    {euros(besoinCapital)} ÷ ({anneesEpargne} × 12)
                  </td>
                  <td>{eur2(effortMensuel)} par mois</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Ce chiffrage est une borne simple : un rendement positif réduirait l'effort, un
            rendement négatif l'augmenterait, et l'inflation en élèverait le montant réel. Il
            montre surtout que quelques années gagnées sur l'âge légal se paient avec une épargne
            régulière, d'où l'intérêt de commencer avant 50 ans (voir{" "}
            <a href="/guide/preparer-sa-retraite-a-50-ans">préparer sa retraite à 50 ans</a>).
          </p>

          <h2 id="pieges">Quels pièges éviter ?</h2>
          <ul>
            <li>
              <strong>Se fier aux « on dit ».</strong> Les seuils et les durées changent : ne vous
              fiez qu'au simulateur officiel et à votre attestation.
            </li>
            <li>
              <strong>Oublier un trimestre de début d'activité.</strong> Un job d'été ou un
              apprentissage non reporté peut faire manquer la condition de départ.
            </li>
            <li>
              <strong>Confondre durée d'assurance et durée cotisée.</strong> Tous les trimestres
              ne comptent pas de la même manière.
            </li>
            <li>
              <strong>Racheter des trimestres sans vérifier leur effet</strong> sur la condition de
              carrière longue.
            </li>
            <li>
              <strong>Sous-estimer la complémentaire</strong> : vérifier les coefficients appliqués
              à l'âge de départ visé.
            </li>
            <li>
              <strong>Oublier le préavis</strong> et les règles de rupture du contrat de travail.
            </li>
          </ul>

          <h2 id="quand">Partir plus tôt : quand ça vaut le coup, quand éviter</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Ça vaut le coup quand…</th>
                  <th>À éviter quand…</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>L'attestation est obtenue et la pension estimée couvre les besoins de base</td>
                  <td>Le départ repose sur une simple impression d'éligibilité, sans attestation</td>
                </tr>
                <tr>
                  <td>L'épargne privée est constituée pour financer les années gagnées</td>
                  <td>Le capital à constituer est loin d'être atteint et l'effort mensuel est irréaliste</td>
                </tr>
                <tr>
                  <td>La carrière est pénible ou l'état de santé justifie un départ rapide</td>
                  <td>Le gain d'âge est faible : un départ légèrement plus tardif peut valoir la peine</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Quelles sont les conditions pour partir en retraite anticipée carrière longue ?</h3>
          <p>
            Avoir commencé à travailler avant {seuils[0]}, {seuils[1]}, {seuils[2]} ou {seuils[3]}{" "}
            ans, avoir validé {C.trimestresDebutActivite} trimestres en début d'activité (
            {C.trimestresDebutActiviteNesT4} si né au dernier trimestre), et justifier de la durée
            d'assurance cotisée exigée pour votre génération, tous régimes confondus.
          </p>

          <h3>À quel âge peut-on partir en carrière longue ?</h3>
          <p>
            Les âges de départ possibles sont de {agesAnticipes.join(", ")} ans selon la tranche de
            début d'activité, à confirmer sur le simulateur officiel. L'âge légal de votre
            génération reste la référence du régime normal.
          </p>

          <h3>Combien de trimestres faut-il pour la retraite anticipée carrière longue ?</h3>
          <p>
            La durée cotisée exigée dépend de votre génération et de l'âge de départ visé. Nous ne
            la chiffrons pas ici : consultez le simulateur de service-public.gouv.fr (fiche
            F13845) ou votre compte sur info-retraite.fr.
          </p>

          <h3>Comment obtenir son attestation de carrière longue ?</h3>
          <p>
            En ligne, depuis votre compte retraite, avec le service « Obtenir mon âge de départ à la
            retraite », une fois le relevé de carrière à jour. L'attestation est provisoire ou
            définitive selon la date de départ.
          </p>

          <h3>Les trimestres de chômage comptent-ils pour la carrière longue ?</h3>
          <p>
            Certains oui, dans des limites fixées par les textes, d'autres non : tout dépend du
            type de période. Vérifiez la règle actuelle sur la fiche F13845 ou auprès de votre
            caisse.
          </p>

          <h3>Peut-on cumuler carrière longue et rachat de trimestres ?</h3>
          <p>
            Le rachat sert à compléter la durée d'assurance, mais il ne remplace pas en principe la
            durée cotisée exigée par la carrière longue. Faites confirmer la règle par votre caisse
            avant de racheter.
          </p>

          <h3>La retraite de carrière longue est-elle au taux plein ?</h3>
          <p>
            Le dispositif permet de partir avant l'âge légal ; l'effet sur le taux de la retraite de
            base est à lire sur votre notification et sur la fiche F13845. La retraite complémentaire a ses propres
            coefficients : lisez la notification de l'Agirc-Arrco.
          </p>

          <h3>Faut-il continuer à épargner si l'on part en carrière longue ?</h3>
          <p>
            Oui, d'autant plus que la retraite durera plus longtemps. L'effort se calcule avec le
            complément de revenu visé et l'horizon restant, comme dans l'exemple ci-dessus.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La carrière longue est un droit précieux, mais conditionnel : début d'activité précoce,
            trimestres de début de carrière, durée cotisée. La première décision utile n'est donc pas
            de choisir un âge de départ, mais de vérifier si on y a droit, avec un relevé de carrière
            à jour et l'outil officiel.
          </p>
          <p>
            Ensuite, l'enjeu devient financier : les années gagnées doivent être financées. Une
            mesure simple, comme celle de l'exemple, aide à calibrer l'effort. Pour replacer cette
            décision dans une stratégie d'ensemble, voir{" "}
            <a href="/guide/preparer-sa-retraite-guide-complet">notre guide complet pour préparer sa retraite</a>{" "}
            et notre page sur <a href="/strategies/per">le PER</a>.
          </p>
          <p>
            Si vous voulez savoir ce qu'un départ anticipé change pour votre épargne, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à poser ce cadre
            avant toute décision.
          </p>

          <h2 id="lire-aussi">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/age-de-depart-retraite-trimestres-duree-assurance">Âge de départ, trimestres et durée d'assurance</a></li>
            <li><a href="/guide/demande-de-retraite-demarches-calendrier">Demande de retraite : démarches et calendrier</a></li>
            <li><a href="/guide/combien-coute-rachat-trimestres-retraite">Combien coûte le rachat de trimestres ?</a></li>
            <li><a href="/guide/verifier-releve-de-carriere-retraite">Relevé de carrière : le vérifier et le corriger</a></li>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seule votre
              caisse de retraite peut confirmer votre éligibilité. Les seuils, âges et trimestres
              cités sont ceux affichés par les sources officielles en novembre 2026 et peuvent
              évoluer. Le cas chiffré est une illustration pédagogique, sans rendement ni
              inflation. Les placements en unités de compte présentent un risque de perte en
              capital ; les performances passées ne préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Partir plus tôt se prépare. L'épargne qui finance les années gagnées aussi." />
    </>
  );
}
