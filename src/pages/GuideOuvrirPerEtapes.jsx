import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  FISCALITE,
  FRAIS_TYPES,
  PER_PLAFOND,
  V3_PER_OUVERTURE,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const maj = V3_PER_OUVERTURE.maj;
const tmi = FISCALITE.tmiOptions[2]; // 30 % : TMI illustrative
const tmiBasse = FISCALITE.tmiOptions[1]; // 11 %
const V = V3_PER_OUVERTURE.versementInitial;
const fraisEntreeHaute = V3_PER_OUVERTURE.fraisEntreeHautePct;
const fraisEntreeBasse = FRAIS_TYPES.contratInternet.entree.max;
const ageFinDeduction = PER_PLAFOND.ageFinDeduction;
const renMin = V3_PER_OUVERTURE.renonciationJoursMin;
const renMax = V3_PER_OUVERTURE.renonciationJoursMax;

const r2 = (n) => Math.round(n * 100) / 100;
const part = (base, taux) => r2((base * taux) / 100);

// Plancher et plafond de déduction pour les versements de 2026 (PASS 2025)
const plancher = part(PER_PLAFOND.pass2025, PER_PLAFOND.tauxPlancherPass);
const plafondMax = part(PER_PLAFOND.pass2025 * PER_PLAFOND.multiplePassMaximum, PER_PLAFOND.tauxRevenusActivite);

// Exemple : versement initial, économie d'impôt et frais d'entrée
const economie = part(V, tmi);
const effortNet = r2(V - economie);
const fraisHaute = part(V, fraisEntreeHaute);
const fraisBasse = part(V, fraisEntreeBasse);
const investiHaute = r2(V - fraisHaute);
const investiBasse = r2(V - fraisBasse);

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
    label: "Service-Public.gouv.fr — Barème de l'impôt sur le revenu, fiche F1419",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1419",
  },
  {
    label: "impots.gouv.fr — Espace particulier : déclaration de revenus et notice de la déclaration 2042",
    url: "https://www.impots.gouv.fr/formulaire/2042/declaration-des-revenus",
  },
  {
    label: "AMF — Autorité des marchés financiers : épargne et placements, mises en garde",
    url: "https://www.amf-france.org",
  },
  {
    label: "Légifrance — Code monétaire et financier, articles L. 224-1 et suivants (plan d'épargne retraite)",
    url: "https://www.legifrance.gouv.fr",
  },
];

export default function GuideOuvrirPerEtapes() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · PER</span>
          <h1>Ouvrir un PER : étapes, documents, délais et pièges</h1>
          <p className="sub">
            En ligne, à 60 ans ou à la retraite : la démarche pas à pas, les pièces à fournir, les
            frais d'entrée et les erreurs à éviter. Mis à jour en {maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> ouvrir un plan d'épargne retraite (PER) se fait en une
              semaine ou deux, le plus souvent en ligne, avec une pièce d'identité, un justificatif
              de domicile, un RIB et un questionnaire de profil investisseur. Le choix qui compte
              n'est pas la paperasse, mais le type de PER (assurantiel ou compte-titres), les frais
              d'entrée et de gestion, et la certitude de ne pas avoir besoin de l'argent avant la
              retraite. Exemple illustratif : {euros(V)} versés avec une TMI de {pct(tmi)} génèrent
              environ {euros(economie)} d'économie d'impôt, mais cet avantage se paie plus tard
              par une imposition à la sortie.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#conditions">Quelles conditions pour ouvrir un PER, et à quel âge ?</a></li>
              <li><a href="#types">PER assurantiel ou PER compte-titres : lequel ouvrir ?</a></li>
              <li><a href="#etapes">Comment ouvrir un PER en ligne, étape par étape ?</a></li>
              <li><a href="#documents">Quels documents fournir pour ouvrir un PER ?</a></li>
              <li><a href="#delais">Combien de temps faut-il pour ouvrir un PER ?</a></li>
              <li><a href="#frais">Quels frais d'entrée et quel premier versement ?</a></li>
              <li><a href="#cas">Ouvrir un PER à 60 ans ou à la retraite : est-ce utile ?</a></li>
              <li><a href="#pieges">Quels pièges éviter à l'ouverture ?</a></li>
              <li><a href="#checklist">Check-list avant de signer</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Beaucoup de gens décident d'ouvrir un PER un soir de décembre, devant le simulateur
            d'une banque, sans avoir lu une seule ligne des conditions générales. Le bouton « souscrire »
            est à deux clics, la réduction d'impôt s'affiche en gros, et les questions pratiques
            (où va l'argent, quand peut-on le récupérer, combien cela coûte) arrivent après la
            signature. Ce guide inverse l'ordre : il décrit la démarche, puis les choix à faire
            avant de la lancer.
          </p>
          <p>
            Prenons un profil illustratif, sans lien avec un cas réel : un salarié de 52 ans,
            imposé dans la tranche à {pct(tmi)}, qui veut ouvrir un PER avant la fin de l'année.
            Il hésite entre le PER de sa banque et une offre en ligne, ne sait pas quelles pièces
            préparer et se demande s'il pourra récupérer l'argent en cas de coup dur. Ce guide
            répond à ces trois questions ; pour savoir <em>si</em> le PER est adapté à votre
            situation, voyez d'abord{" "}
            <a href="/guide/faut-il-ouvrir-un-per">notre guide « Faut-il ouvrir un PER ? »</a>.
          </p>

          <h2 id="conditions">Quelles conditions pour ouvrir un PER, et à quel âge ?</h2>
          <p>
            Il n'existe pas de condition d'âge minimal « de retraite » pour ouvrir un PER : toute
            personne majeure, salariée, indépendante, fonctionnaire ou sans emploi, peut en
            ouvrir un, et chacun peut en détenir plusieurs. Il n'y a pas non plus d'âge maximal
            d'ouverture, mais les versements volontaires cessent d'être déductibles à partir de{" "}
            {ageFinDeduction} ans depuis le 1er janvier 2026 (voir{" "}
            <a href="/guide/plafond-per-versement-avant-31-decembre-2026">
              notre guide sur le plafond de déduction
            </a>
            ). Les conditions pratiques sont celles de tout produit financier à distance : être
            majeur, résider fiscalement dans un pays accepté par l'organisme et disposer d'un
            compte bancaire à son nom.
          </p>
          <p>
            Le plafond de déduction des versements volontaires, lui, dépend de vos revenus
            d'activité : 10 % des revenus nets de l'année précédente, avec un plancher de{" "}
            {euros(plancher)} et un plafond de {euros(plafondMax)} pour les versements de 2026
            (calcul à partir du plafond annuel de la sécurité sociale 2025 de{" "}
            {euros(PER_PLAFOND.pass2025)}). Un retraité sans revenu d'activité ne dispose
            généralement que du plancher.
          </p>

          <h2 id="types">PER assurantiel ou PER compte-titres : lequel ouvrir ?</h2>
          <p>
            Le PER assurantiel est un contrat d'assurance, avec fonds en euros possible, le PER
            compte-titres est un compte investi en titres, souvent en ETF ou en fonds. Les deux
            partagent les mêmes règles de déduction, de blocage et de sortie ; ils diffèrent par
            les supports, la gestion et le traitement à l'ouverture.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>PER assurantiel</th>
                  <th>PER compte-titres</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nature</td>
                  <td>Contrat d'assurance (assureur)</td>
                  <td>Compte-titres dédié (établissement financier)</td>
                </tr>
                <tr>
                  <td>Supports</td>
                  <td>Fonds en euros (garantie du capital par l'assureur) et unités de compte</td>
                  <td>Titres et fonds, sans fonds en euros</td>
                </tr>
                <tr>
                  <td>Gestion</td>
                  <td>Libre ou pilotée, souvent avec désensibilisation progressive</td>
                  <td>Libre ou pilotée selon l'offre</td>
                </tr>
                <tr>
                  <td>Sortie en rente</td>
                  <td>Rente servie par l'assureur</td>
                  <td>Rente à souscrire auprès d'un assureur au moment de la sortie</td>
                </tr>
                <tr>
                  <td>Pour qui, en première lecture</td>
                  <td>Profil prudent ou souhaitant une part garantie</td>
                  <td>Profil à l'aise avec les marchés, horizon long</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Aucune de ces colonnes ne dit quel PER est « le meilleur » : cela dépend de votre
            horizon, de votre tolérance aux pertes et des frais réels. Pour comparer des critères
            plutôt que des noms, voyez{" "}
            <a href="/guide/quel-est-le-meilleur-per">notre guide sur le choix d'un PER</a>.
          </p>

          <h2 id="etapes">Comment ouvrir un PER en ligne, étape par étape ?</h2>
          <p>
            L'ouverture en ligne suit presque toujours le même parcours en sept étapes, que
            l'on peut boucler en une heure si les pièces sont prêtes.
          </p>
          <ol>
            <li>
              <strong>Définir l'objectif.</strong> Réduire l'impôt, préparer un complément de
              retraite, ou les deux : cela conditionne le montant et le type de PER.
            </li>
            <li>
              <strong>Comparer au moins deux offres</strong> sur les frais d'entrée, les frais de
              gestion, les supports et les conditions de transfert.
            </li>
            <li>
              <strong>Remplir le formulaire d'ouverture</strong> : identité, situation familiale
              et fiscale, résidence fiscale.
            </li>
            <li>
              <strong>Répondre au questionnaire de profil investisseur</strong> (connaissance des
              marchés, tolérance au risque, horizon). Répondez sincèrement : le questionnaire
              protège d'abord vous.
            </li>
            <li>
              <strong>Téléverser les pièces</strong> (voir la liste plus bas) et signer
              électroniquement.
            </li>
            <li>
              <strong>Effectuer le versement initial</strong> par virement depuis un compte à
              votre nom, puis choisir la répartition entre supports.
            </li>
            <li>
              <strong>Conserver la confirmation</strong> : numéro de contrat, conditions
              générales, document d'informations clés, date de l'ouverture.
            </li>
          </ol>
          <p>
            Après la signature, un délai de renonciation s'ouvre : de l'ordre de {renMin} à{" "}
            {renMax} jours calendaires selon le type de PER et le mode de souscription. Vérifiez
            la durée exacte et la procédure dans vos conditions générales.
          </p>

          <h2 id="documents">Quels documents fournir pour ouvrir un PER ?</h2>
          <p>Les pièces sont les mêmes pour la plupart des offres, avec de petites variantes.</p>
          <ul>
            <li>Une pièce d'identité en cours de validité (carte d'identité ou passeport).</li>
            <li>Un justificatif de domicile de moins de trois mois.</li>
            <li>Un RIB du compte qui servira aux virements, à votre nom.</li>
            <li>
              Votre dernier avis d'imposition, pour renseigner votre situation fiscale et
              estimer l'économie d'impôt attendue.
            </li>
            <li>
              Une déclaration de résidence fiscale (auto-certification) et, le cas échéant, un
              justificatif d'origine des fonds si le montant est élevé.
            </li>
            <li>
              Le questionnaire de profil investisseur et la signature électronique des documents
              contractuels.
            </li>
          </ul>

          <h2 id="delais">Combien de temps faut-il pour ouvrir un PER ?</h2>
          <p>
            Aucun délai légal d'ouverture n'est fixé : il dépend de l'organisme. Comptez en
            pratique quelques jours à quelques semaines, le temps de vérifier les pièces, de
            valider la conformité et de recevoir le premier virement. Si le versement doit être
            déduit de l'année en cours, ne vous y prenez pas à la dernière semaine de
            décembre : c'est la date d'encaissement du versement, et non celle de la demande,
            qui compte. Le détail du plafond et des échéances figure dans{" "}
            <a href="/guide/plafond-per-versement-avant-31-decembre-2026">
              notre guide sur le plafond avant le 31 décembre
            </a>
            .
          </p>

          <h2 id="frais">Quels frais d'entrée et quel premier versement ?</h2>
          <p>
            Les frais d'entrée sont prélevés sur chaque versement et varient fortement : de{" "}
            {pct(FRAIS_TYPES.contratInternet.entree.max)} sur certaines offres en ligne jusqu'à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.max)} dans les réseaux bancaires
            traditionnels (ordres de grandeur, à vérifier contrat par contrat). Le versement
            initial minimum est lui aussi propre à chaque offre : certains acceptent des
            montants modestes avec versements programmés. Pour la structure complète des
            coûts, voir{" "}
            <a href="/guide/combien-coute-un-per">le guide sur le coût d'un PER</a>.
          </p>
          <div className="note">
            <p>
              Exemple illustratif, sans lien avec une offre réelle : pour un versement initial de{" "}
              {euros(V)}, une TMI de {pct(tmi)}.
            </p>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Poste</th>
                  <th>Sans frais d'entrée</th>
                  <th>Frais d'entrée de {pct(fraisEntreeHaute)}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Versement</td>
                  <td>{euros(V)}</td>
                  <td>{euros(V)}</td>
                </tr>
                <tr>
                  <td>Frais d'entrée</td>
                  <td>{euros(fraisBasse)}</td>
                  <td>{euros(fraisHaute)}</td>
                </tr>
                <tr>
                  <td>Somme réellement investie</td>
                  <td>{euros(investiBasse)}</td>
                  <td>{euros(investiHaute)}</td>
                </tr>
                <tr>
                  <td>Économie d'impôt à la TMI de {pct(tmi)} (versement déductible)</td>
                  <td>{euros(economie)}</td>
                  <td>{euros(economie)}</td>
                </tr>
                <tr>
                  <td>Effort net après économie d'impôt</td>
                  <td>{euros(effortNet)}</td>
                  <td>{euros(effortNet)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les frais d'entrée de {pct(fraisEntreeHaute)} coûtent {euros(fraisHaute)} ici, soit{" "}
            {pct(r2((fraisHaute / economie) * 100))} de l'économie d'impôt. L'économie
            d'impôt n'est pas un gain : elle est compensée par l'imposition des versements
            déduits à la sortie, comme le détaille{" "}
            <a href="/guide/fiscalite-sortie-per">notre guide sur la fiscalité de la sortie</a>.
            Elle est donc à comparer à votre TMI à la retraite, pas à zéro.
          </p>

          <h2 id="cas">Ouvrir un PER à 60 ans ou à la retraite : est-ce utile ?</h2>
          <p>
            Ouvrir un PER à 60 ans reste possible, avec un horizon de blocage court, souvent de
            quatre à six ans. L'avantage dépend alors surtout de votre TMI actuelle comparée à
            celle que vous aurez à la retraite : s'il est élevé aujourd'hui et plus faible
            demain, la déduction a du sens ; sinon, d'autres enveloppes comme l'assurance-vie
            conservent plus de souplesse. Notre{" "}
            <a href="/guide/per-ou-assurance-vie-selon-age-et-tmi">comparaison PER ou assurance-vie selon l'âge et la TMI</a>{" "}
            donne la grille de lecture.
          </p>
          <p>
            Une fois à la retraite, vous pouvez toujours ouvrir un PER, mais le plafond de
            déduction se réduit en général au plancher, faute de revenus d'activité. L'intérêt
            tient alors à des cas précis : une TMI élevée liée à des revenus fonciers, des
            dividendes ou un cumul emploi-retraite, ou un versement exceptionnel (indemnité,
            vente). Le déblocage avant la sortie reste très encadré : voyez{" "}
            <a href="/guide/deblocage-anticipe-per">les cas de déblocage anticipé</a>.
          </p>

          <h2 id="pieges">Quels pièges éviter à l'ouverture ?</h2>
          <ul>
            <li>
              <strong>Confondre économie d'impôt et rendement.</strong> La déduction réduit
              l'impôt de l'année, elle ne garantit rien sur le capital.
            </li>
            <li>
              <strong>Ignorer le blocage.</strong> Hors cas prévus par la loi, l'argent est
              indisponible jusqu'à la retraite : n'y mettez que ce dont vous n'aurez pas besoin.
            </li>
            <li>
              <strong>Oublier les frais de gestion et les frais des supports</strong>, qui pèsent
              plus que les frais d'entrée sur vingt ans.
            </li>
            <li>
              <strong>Se laisser guider par le seul produit proposé par sa banque</strong> sans
              comparer, notamment sur les supports et sur les conditions de transfert.
            </li>
            <li>
              <strong>Répartir sans tenir compte de l'horizon.</strong> Les unités de compte
              présentent un risque de perte en capital, plus sensible à court terme.
            </li>
            <li>
              <strong>Ne pas déclarer le versement.</strong> L'économie d'impôt suppose de le
              reporter dans la déclaration : voir{" "}
              <a href="/guide/declarer-versements-per-impots-case-6ns">notre guide de déclaration</a>.
            </li>
          </ul>

          <h2 id="checklist">Check-list avant de signer</h2>
          <ol>
            <li>Mon horizon dépasse-t-il quelques années, sans besoin de liquidité ?</li>
            <li>Ma TMI actuelle est-elle plus élevée que celle que j'aurai à la retraite ?</li>
            <li>Ai-je lu les frais d'entrée, de gestion et de supports, en pourcentage annuel ?</li>
            <li>Ai-je choisi entre PER assurantiel et compte-titres en connaissance de cause ?</li>
            <li>Mon plafond de déduction couvre-t-il le versement prévu ?</li>
            <li>Ai-je les pièces demandées et un virement possible depuis un compte à mon nom ?</li>
          </ol>

          <h2 id="quand">Quand ouvrir un PER vaut-il le coup, et quand éviter ?</h2>
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
                  <td>TMI actuelle élevée, TMI de retraite attendue plus basse</td>
                  <td>Foyer non imposable ou TMI de {pct(tmiBasse)} : peu ou pas d'économie</td>
                </tr>
                <tr>
                  <td>Horizon d'une dizaine d'années ou plus avant la retraite</td>
                  <td>Besoin d'argent possible à court terme (projet, trésorerie)</td>
                </tr>
                <tr>
                  <td>Épargne de précaution déjà constituée</td>
                  <td>Pas d'épargne disponible en dehors du PER</td>
                </tr>
                <tr>
                  <td>Offre aux frais lisibles et supports adaptés</td>
                  <td>Offre aux frais élevés ou opaques</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Comment ouvrir un PER en ligne ?</h3>
          <p>
            Il suffit de choisir une offre, de remplir le formulaire d'ouverture, de répondre au
            questionnaire de profil, de téléverser vos pièces, de signer électroniquement et
            d'effectuer un premier virement. L'ensemble prend en général moins d'une heure si
            les documents sont prêts.
          </p>

          <h3>Peut-on ouvrir un PER à 60 ans ?</h3>
          <p>
            Oui, il n'y a pas d'âge limite pour ouvrir. À 60 ans, l'horizon de blocage est court
            et l'intérêt dépend de votre TMI actuelle et de celle attendue à la retraite. Les
            versements ne sont plus déductibles à partir de {ageFinDeduction} ans.
          </p>

          <h3>Peut-on ouvrir un PER à la retraite ?</h3>
          <p>
            Oui, mais le plafond de déduction se limite en général au plancher de{" "}
            {euros(plancher)} pour 2026, faute de revenus d'activité. Cela peut rester pertinent
            en cas de TMI élevée ou de versement exceptionnel, au cas par cas.
          </p>

          <h3>Quels documents faut-il pour ouvrir un PER ?</h3>
          <p>
            Une pièce d'identité, un justificatif de domicile, un RIB, votre avis d'imposition,
            une auto-certification de résidence fiscale et le questionnaire de profil
            investisseur. Un justificatif d'origine des fonds peut être demandé pour un montant
            élevé.
          </p>

          <h3>Combien de temps pour ouvrir un PER ?</h3>
          <p>
            Cela dépend de l'organisme, de quelques jours à quelques semaines. Anticipez si le
            versement doit être pris en compte pour l'année en cours.
          </p>

          <h3>Quels sont les frais d'entrée d'un PER ?</h3>
          <p>
            Ils vont de {pct(FRAIS_TYPES.contratInternet.entree.max)} sur certaines offres en
            ligne à {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.max)} dans certains
            réseaux traditionnels, hors frais de gestion annuels (ordres de grandeur, à
            vérifier).
          </p>

          <h3>PER assurantiel ou PER compte-titres : lequel choisir ?</h3>
          <p>
            L'assurantiel permet un fonds en euros, le compte-titres donne accès à des titres et
            des ETF sans garantie. Le choix dépend de votre tolérance au risque et de votre
            horizon.
          </p>

          <h3>Peut-on récupérer l'argent d'un PER avant la retraite ?</h3>
          <p>
            Seulement dans des cas prévus par la loi (achat de la résidence principale, décès du
            conjoint, invalidité, surendettement, fin de droits au chômage, cessation d'activité
            non salariée). Voyez{" "}
            <a href="/guide/deblocage-anticipe-per">notre guide sur le déblocage anticipé</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Ouvrir un PER est administrativement simple et, justement pour cela, souvent fait
            trop vite. La bonne séquence est : vérifier que l'argent peut rester bloqué, comparer
            la TMI d'aujourd'hui à celle de la retraite, choisir un type de PER cohérent avec son
            profil, puis comparer les frais. Dans l'exemple de ce guide, {euros(fraisHaute)} de
            frais d'entrée sur {euros(V)} n'annulent pas l'économie d'impôt de {euros(economie)},
            mais ils s'ajoutent à des frais de gestion qui se paient chaque année.
          </p>
          <p>
            Pour poursuivre : si vous détenez déjà un PER chez un autre organisme,{" "}
            <a href="/guide/transferer-son-per-frais-demarche">le guide sur le transfert</a>{" "}
            explique comment changer sans perdre vos droits ; pour planifier la sortie,{" "}
            <a href="/guide/liquider-son-per-a-la-retraite-demarche">celui sur la liquidation</a>{" "}
            décrit la démarche. Une vue d'ensemble du dispositif figure sur{" "}
            <a href="/strategies/per">notre page stratégie PER</a>, et le{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> aide à situer l'effort
            d'épargne. Pour poser le cadre global avec un interlocuteur,{" "}
            <a href="/bilan-retraite">le bilan retraite gratuit de 15 minutes</a> est un point de
            départ.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/faut-il-ouvrir-un-per">Faut-il ouvrir un PER ?</a></li>
            <li><a href="/guide/combien-coute-un-per">Combien coûte un PER ?</a></li>
            <li><a href="/guide/per-bancaire-frais-gestion-horizon">PER bancaire : frais, gestion, horizon</a></li>
            <li><a href="/guide/quel-est-le-meilleur-per">Comment choisir son PER</a></li>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : elle ne
              tient pas compte de votre situation et se limite à une piste de réflexion à
              examiner cas par cas. Les règles et ordres de grandeur cités sont ceux connus en{" "}
              {maj} ; la loi de finances pour 2027 n'étant pas adoptée à cette date, ils peuvent
              évoluer. Les exemples chiffrés sont des illustrations composites, sans promesse de
              rendement. Les supports en unités de compte présentent un risque de perte en
              capital, et les performances passées ne préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Ouvrir un PER est simple. Savoir s'il vous convient demande un vrai point d'ensemble." />
    </>
  );
}
