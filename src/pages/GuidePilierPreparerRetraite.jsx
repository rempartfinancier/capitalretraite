import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { RETRAITE_PROGRESSIVE_CUMUL } from "../components/hypotheses.js";

const R = RETRAITE_PROGRESSIVE_CUMUL;

// Aucun chiffre de cette page n'est en dur : les repères chiffrés sont dans les guides liés.
const sources = [
  {
    label: "Info-retraite.fr — Le portail officiel de l'information sur la retraite (relevé de carrière, estimation indicative globale)",
    url: "https://www.info-retraite.fr/",
  },
  {
    label: "L'Assurance retraite — Portail d'information (âge de départ, trimestres, montant de la retraite)",
    url: "https://www.lassuranceretraite.fr/",
  },
  {
    label: "Agirc-Arrco — Retraite complémentaire des salariés du privé",
    url: "https://www.agirc-arrco.fr/",
  },
  {
    label: "Service-Public.gouv.fr — Retraite : rubrique des fiches pratiques",
    url: "https://www.service-public.gouv.fr/",
  },
  {
    label: "Autorité des marchés financiers — Epargner et investir : informations pour les particuliers",
    url: "https://www.amf-france.org/",
  },
  {
    label: "Bofip-Impôts — Documentation fiscale officielle",
    url: "https://bofip.impots.gouv.fr/",
  },
];

export default function GuidePilierPreparerRetraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide complet · de la première estimation à la transmission</span>
          <h1>Préparer sa retraite : le guide complet</h1>
          <p className="sub">
            Sept étapes dans l'ordre, et pour chacune les guides qui la détaillent. Mis à jour le{" "}
            {R.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> préparer sa retraite n'est pas choisir un placement,
              c'est enchaîner sept décisions dans le bon ordre : connaître ses droits, estimer sa
              pension, fixer un objectif de revenu, choisir les enveloppes, épargner, décaisser,
              puis transmettre. Chaque étape ci-dessous est résumée en quelques lignes et renvoie
              vers les guides qui l'approfondissent. Rien n'y est un conseil personnalisé : la
              bonne réponse dépend de votre âge, de votre carrière, de votre fiscalité et de votre
              tolérance au risque.
            </p>
          </div>

          <p>
            Beaucoup de lecteurs commencent par la fin : quel est le meilleur placement ? Or la
            question utile vient plus tôt. Prenons une situation illustrative et composite, qui ne
            correspond à aucun cas réel : un couple de salariés autour de quarante-cinq ans, qui
            épargne un peu sans plan, a ouvert un contrat par-ci, un autre par-là, et ne sait ni
            ce que sera sa pension, ni de combien de capital il aura besoin, ni dans quel ordre
            utiliser ses comptes le moment venu.
          </p>
          <p>
            Ce guide fait office de carte. Il ne remplace pas les articles détaillés : il explique
            à quoi sert chaque étape, ce qui se passe quand on la saute, et où lire la suite. Vous
            pouvez le parcourir dans l'ordre ou aller directement à l'étape qui vous bloque.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#droits">Étape 1 : comment comprendre ses droits à la retraite ?</a></li>
              <li><a href="#estimer">Étape 2 : comment estimer sa future pension ?</a></li>
              <li><a href="#objectif">Étape 3 : comment fixer son objectif de capital et de revenu ?</a></li>
              <li><a href="#enveloppes">Étape 4 : comment choisir ses enveloppes d'épargne ?</a></li>
              <li><a href="#epargner">Étape 5 : comment épargner régulièrement et efficacement ?</a></li>
              <li><a href="#decaisser">Étape 6 : comment décaisser son capital à la retraite ?</a></li>
              <li><a href="#transmettre">Étape 7 : comment transmettre ce qui reste ?</a></li>
              <li><a href="#age">Que faire selon son âge : 40, 50, 55 ans et plus ?</a></li>
              <li><a href="#checklist">La checklist pour préparer sa retraite</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="droits">Étape 1 : comment comprendre ses droits à la retraite ?</h2>
          <p>
            Tout part du relevé de carrière : c'est sur lui que reposent la durée d'assurance, le
            salaire de référence et les points de retraite complémentaire. Une erreur ou un oubli
            se paie pendant toute la retraite, et se corrige d'autant plus facilement qu'on s'y
            prend tôt. Il faut ensuite situer l'âge légal de sa génération, le nombre de
            trimestres exigés, et mesurer ce que changent une décote ou une surcote.
          </p>
          <ul>
            <li><a href="/guide/verifier-releve-de-carriere-retraite">Relevé de carrière : comment le vérifier et faire corriger les erreurs</a></li>
            <li><a href="/guide/age-de-depart-retraite-trimestres-duree-assurance">Âge de départ, trimestres et durée d'assurance : à quelle date partir ?</a></li>
            <li><a href="/guide/surcote-decote-retraite">Surcote ou décote à la retraite : comment ça se calcule</a></li>
            <li><a href="/guide/combien-coute-rachat-trimestres-retraite">Combien coûte le rachat de trimestres ?</a></li>
            <li><a href="/guide/retraite-complementaire-agirc-arrco-cadres-calcul">Retraite complémentaire Agirc-Arrco des cadres</a></li>
            <li><a href="/guide/retraite-cadre-ou-fonctionnaire-comparaison">Retraite de cadre ou de fonctionnaire : deux logiques à comparer</a></li>
            <li><a href="/guide/retraite-fonctionnaires-completer">Retraite des fonctionnaires : comment la compléter</a></li>
            <li><a href="/guide/retraite-independants-per-ou-madelin">Retraite des indépendants : PER individuel ou contrat Madelin</a></li>
          </ul>

          <h2 id="estimer">Étape 2 : comment estimer sa future pension ?</h2>
          <p>
            Les caisses fournissent une estimation officielle, mais elle est exprimée en euros
            bruts, sans lien avec votre niveau de vie actuel. Le réflexe utile consiste à la
            comparer à ce que vous gagnez aujourd'hui : c'est le taux de remplacement, la mesure
            du « trou » à combler. Un simulateur donne un premier ordre de grandeur avant de
            solliciter les outils officiels.
          </p>
          <ul>
            <li><a href="/guide/estimer-sa-pension-retraite-taux-de-remplacement">Estimer sa pension de retraite et son taux de remplacement</a></li>
            <li><a href="/simulateur-retraite">Simulateur de retraite</a></li>
            <li><a href="/bilan-retraite">Bilan retraite gratuit de 15 minutes</a></li>
            <li><a href="/guide/retraite-progressive-ou-cumul-emploi-retraite">Retraite progressive ou cumul emploi-retraite</a></li>
            <li><a href="/guide/cumul-emploi-retraite-comment-ca-marche">Cumul emploi-retraite : comment ça marche</a></li>
          </ul>

          <h2 id="objectif">Étape 3 : comment fixer son objectif de capital et de revenu ?</h2>
          <p>
            L'objectif se formule en revenu mensuel complémentaire, puis se traduit en capital :
            c'est un ordre de grandeur, pas une cible précise. Plusieurs méthodes existent, et
            aucune n'est sûre, parce que la durée de la retraite, l'inflation et les marchés sont
            incertains. Cette étape sert surtout à savoir si l'effort demandé est réaliste.
          </p>
          <ul>
            <li><a href="/guide/capital-retraite-objectif-et-construction">Capital retraite : quel objectif viser et comment le construire</a></li>
            <li><a href="/guide/capital-necessaire-completer-pension-retraite-65-ans">De quel capital a-t-on besoin pour compléter sa pension ?</a></li>
            <li><a href="/guide/combien-faut-il-epargner-pour-la-retraite">Combien épargner pour sa retraite</a></li>
            <li><a href="/guide/combien-epargner-par-mois-pour-la-retraite-selon-age">Combien épargner par mois selon son âge</a></li>
            <li><a href="/guide/completer-sa-retraite-sans-per">Compléter sa retraite sans PER</a></li>
          </ul>

          <h2 id="enveloppes">Étape 4 : comment choisir ses enveloppes d'épargne ?</h2>
          <p>
            PER, assurance-vie, PEA, immobilier : chaque enveloppe répond à une contrainte
            différente (déduction à l'entrée, disponibilité, fiscalité de sortie, transmission).
            La plupart des épargnants gagnent à les combiner plutôt qu'à en choisir une seule.
            Le tableau comparatif d'une enveloppe n'a de sens qu'une fois connus votre tranche
            marginale d'imposition et votre horizon.
          </p>
          <p>
            <strong>Les trois enveloppes de base.</strong>
          </p>
          <ul>
            <li><a href="/strategies/per">Stratégie PER : puissant, mais pas pour tout le monde</a></li>
            <li><a href="/strategies/assurance-vie-retraite">Stratégie assurance-vie : la souplesse d'abord</a></li>
            <li><a href="/strategies/pea-retraite">Stratégie PEA : le levier sous-estimé</a></li>
            <li><a href="/guide/meilleure-enveloppe-retraite">Quelle est la meilleure enveloppe pour préparer sa retraite ?</a></li>
          </ul>
          <p>
            <strong>Les comparaisons qui reviennent le plus.</strong>
          </p>
          <ul>
            <li><a href="/guide/per-vs-assurance-vie-retraite">PER ou assurance-vie : selon la TMI et l'horizon</a></li>
            <li><a href="/guide/per-ou-assurance-vie-selon-age-et-tmi">PER ou assurance-vie selon l'âge et la TMI</a></li>
            <li><a href="/guide/pea-ou-assurance-vie">PEA ou assurance-vie</a></li>
            <li><a href="/guide/pea-ou-per-pour-la-retraite">PEA ou PER</a></li>
            <li><a href="/guide/faut-il-ouvrir-un-per">Faut-il ouvrir un PER ? Les cas où la réponse est non</a></li>
            <li><a href="/guide/immobilier-locatif-ou-assurance-vie">Immobilier locatif ou assurance-vie</a></li>
            <li><a href="/guide/per-ou-immobilier-locatif">PER ou immobilier locatif</a></li>
          </ul>
          <p>
            <strong>Choisir un contrat, des frais, un mode de gestion.</strong>
          </p>
          <ul>
            <li><a href="/guide/meilleure-assurance-vie-retraite">Assurance-vie pour la retraite : laquelle choisir</a></li>
            <li><a href="/guide/quel-est-le-meilleur-per">Quel est le meilleur PER ?</a></li>
            <li><a href="/guide/per-bancaire-frais-gestion-horizon">PER bancaire : frais, gestion à horizon, supports maison</a></li>
            <li><a href="/guide/combien-coute-un-per">Combien coûte un PER ?</a></li>
            <li><a href="/guide/combien-coute-une-assurance-vie">Combien coûte une assurance-vie ?</a></li>
            <li><a href="/guide/pea-banque-ou-courtier">PEA en ligne ou en banque</a></li>
            <li><a href="/guide/pea-en-ligne-comment-choisir-pour-la-retraite">PEA en ligne : comment choisir pour la retraite</a></li>
            <li><a href="/guide/gestion-pilotee-ou-gestion-libre">Gestion pilotée ou gestion libre</a></li>
            <li><a href="/guide/etf-ou-fonds-actifs">ETF ou fonds de gestion active</a></li>
            <li><a href="/guide/assurance-vie-luxembourgeoise">Assurance-vie luxembourgeoise : pour qui ?</a></li>
          </ul>
          <p>
            <strong>L'immobilier comme pilier.</strong> Le sujet est assez vaste pour avoir son
            propre guide complet :{" "}
            <a href="/guide/immobilier-et-retraite-guide-complet">immobilier et retraite</a>, avec
            la stratégie{" "}
            <a href="/strategies/immobilier-retraite">immobilier-retraite</a> comme point d'entrée.
          </p>

          <h2 id="epargner">Étape 5 : comment épargner régulièrement et efficacement ?</h2>
          <p>
            Une fois les enveloppes choisies, la régularité compte plus que le timing : un
            virement automatique, un plafond de versement connu, une date limite de déduction à
            ne pas manquer. C'est aussi à ce stade qu'on vérifie les frais et qu'on arbitre entre
            sécurité et croissance, en gardant à l'esprit que tout support risqué peut perdre de
            la valeur et que les performances passées ne préjugent pas des performances futures.
          </p>
          <ul>
            <li><a href="/guide/plafond-per-versement-avant-31-decembre-2026">PER : jusqu'à quand verser et dans quelle limite déduire</a></li>
            <li><a href="/guide/a-quel-age-commencer-per">À quel âge ouvrir un PER ?</a></li>
            <li><a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">Pourquoi votre assurance-vie rapporte si peu</a></li>
            <li><a href="/guide/risques-assurance-vie">Les risques réels de l'assurance-vie</a></li>
            <li><a href="/guide/inconvenients-du-pea">Les inconvénients du PEA</a></li>
            <li><a href="/guide/conseiller-ou-gerer-seul-sa-retraite">Conseiller ou gestion en solo ?</a></li>
            <li><a href="/guide/combien-coute-un-conseiller-en-gestion-de-patrimoine">Combien coûte un conseiller en gestion de patrimoine ?</a></li>
          </ul>

          <h2 id="decaisser">Étape 6 : comment décaisser son capital à la retraite ?</h2>
          <p>
            C'est l'étape la plus négligée, et pourtant celle où l'on peut perdre le plus : un
            capital bien constitué, mal retiré, génère plus d'impôt que nécessaire ou s'épuise
            trop vite. Il faut connaître les âges de disponibilité de chaque enveloppe, choisir
            entre capital, retraits programmés et rente, et déterminer l'ordre dans lequel on
            puise.
          </p>
          <ul>
            <li><a href="/strategies/decumulation">Stratégie de décumulation : convertir son capital en revenus</a></li>
            <li><a href="/guide/ordre-de-decaissement-retraite">L'ordre de décaissement</a></li>
            <li><a href="/guide/a-quel-age-recuperer-son-capital-retraite">À quel âge récupérer son capital retraite ?</a></li>
            <li><a href="/guide/combien-retirer-par-mois-capital-retraite">Combien retirer par mois d'un capital retraite ?</a></li>
            <li><a href="/guide/rente-viagere-ou-retraits-programmes">Rente viagère ou retraits programmés</a></li>
            <li><a href="/guide/rente-viagere-calcul-montant-taux-de-conversion">Rente viagère : calcul du montant et taux de conversion</a></li>
            <li><a href="/guide/inconvenients-rente-viagere">Les inconvénients de la rente viagère</a></li>
            <li><a href="/guide/fiscalite-rente-viagere-titre-onereux">Fiscalité de la rente viagère à titre onéreux</a></li>
            <li><a href="/guide/fiscalite-sortie-per">Fiscalité de sortie du PER</a></li>
            <li><a href="/guide/deblocage-anticipe-per">Déblocage anticipé du PER</a></li>
            <li><a href="/guide/assurance-vie-apres-8-ans-fiscalite-et-rente">Assurance-vie après 8 ans</a></li>
            <li><a href="/guide/rachat-partiel-assurance-vie-imposition">Rachat partiel d'assurance-vie : imposition</a></li>
            <li><a href="/guide/rachats-programmes-assurance-vie-retraite">Rachats programmés d'assurance-vie</a></li>
          </ul>

          <h2 id="transmettre">Étape 7 : comment transmettre ce qui reste ?</h2>
          <p>
            La transmission se prépare pendant la retraite, voire avant : elle influence le choix
            des enveloppes (clause bénéficiaire, donation, démembrement) autant que celui du mode
            de décaissement. Les règles diffèrent selon la situation familiale, d'où l'intérêt
            d'en parler tôt, en couple comme avec ses proches.
          </p>
          <ul>
            <li><a href="/guide/epargne-retraite-en-couple-et-transmission">Épargne retraite en couple et transmission</a></li>
            <li><a href="/guide/donation-ou-assurance-vie-transmission">Donation ou assurance-vie : transmettre à ses enfants</a></li>
            <li><a href="/guide/demembrement-nue-propriete-retraite">Démembrement et nue-propriété pour la retraite</a></li>
            <li><a href="/guide/immobilier-a-la-retraite-revenus-transmission">Immobilier à la retraite : revenus, vente et transmission</a></li>
          </ul>

          <h2 id="age">Que faire selon son âge : 40, 50, 55 ans et plus ?</h2>
          <p>
            L'âge ne change pas la méthode, il change les priorités : à quarante ans, c'est le
            temps qui travaille ; à cinquante, il faut arbitrer ; à cinquante-cinq et plus, on
            sécurise et on prépare la sortie. Ces repères sont des pistes de réflexion, à adapter
            cas par cas.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Tranche d'âge</th>
                  <th>Priorité</th>
                  <th>Guides à lire en premier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Autour de 40 ans</td>
                  <td>Vérifier ses droits, démarrer une épargne régulière, choisir des enveloppes adaptées à un horizon long</td>
                  <td>
                    <a href="/guide/preparer-sa-retraite-a-40-ans">Préparer sa retraite à 40 ans</a>,{" "}
                    <a href="/guide/combien-epargner-par-mois-pour-la-retraite-selon-age">épargne mensuelle selon l'âge</a>
                  </td>
                </tr>
                <tr>
                  <td>Autour de 50 ans</td>
                  <td>Chiffrer l'écart avec la pension, rattraper si besoin, optimiser l'impôt et réduire les erreurs de frais</td>
                  <td>
                    <a href="/guide/preparer-sa-retraite-a-50-ans">Préparer sa retraite à 50 ans</a>,{" "}
                    <a href="/guide/capital-necessaire-completer-pension-retraite-65-ans">capital pour compléter sa pension</a>
                  </td>
                </tr>
                <tr>
                  <td>55 ans et plus</td>
                  <td>Sécuriser progressivement, anticiper la date de départ, préparer le décaissement</td>
                  <td>
                    <a href="/guide/assurance-vie-fonds-euros-ou-uc-a-55-ans">Assurance-vie : fonds euros ou unités de compte à 55 ans</a>,{" "}
                    <a href="/guide/age-de-depart-retraite-trimestres-duree-assurance">âge de départ et trimestres</a>,{" "}
                    <a href="/guide/ordre-de-decaissement-retraite">ordre de décaissement</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="checklist">La checklist pour préparer sa retraite</h2>
          <ol>
            <li>Télécharger son relevé de carrière et signaler toute période manquante.</li>
            <li>Relever l'âge légal et le nombre de trimestres de sa génération.</li>
            <li>Obtenir l'estimation de pension de ses caisses et la comparer à son revenu actuel.</li>
            <li>Convertir l'écart en revenu mensuel cible, puis en ordre de grandeur de capital.</li>
            <li>Inventorier ses contrats existants : frais, supports, clauses bénéficiaires.</li>
            <li>Choisir une combinaison d'enveloppes en fonction de sa TMI et de son horizon.</li>
            <li>Automatiser un versement régulier et noter les dates limites de déduction.</li>
            <li>Revoir son allocation une fois par an, et la sécuriser à l'approche du départ.</li>
            <li>Définir l'ordre de décaissement et le mode de sortie (capital, retraits, rente).</li>
            <li>Mettre à jour les clauses bénéficiaires et discuter de la transmission en famille.</li>
          </ol>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Par où commencer pour préparer sa retraite ?</h3>
          <p>
            Par le relevé de carrière et l'estimation de pension : sans ces deux documents, tout
            objectif d'épargne reste une supposition. Les enveloppes viennent après.
          </p>
          <h3>À quel âge faut-il commencer à épargner pour la retraite ?</h3>
          <p>
            Le plus tôt possible est une règle de bon sens, mais il n'y a pas d'âge trop tardif
            pour s'y mettre : l'effort à fournir et les outils pertinents changent simplement avec
            l'horizon. Les guides par âge de la section dédiée détaillent ces différences.
          </p>
          <h3>Faut-il forcément un PER ?</h3>
          <p>
            Non. Le PER est utile surtout si votre tranche marginale d'imposition est élevée et si
            vous acceptez un capital bloqué jusqu'à la retraite, sauf cas de déblocage anticipé.
            Plusieurs alternatives existent, voir notre guide pour{" "}
            <a href="/guide/completer-sa-retraite-sans-per">compléter sa retraite sans PER</a>.
          </p>
          <h3>Peut-on cumuler plusieurs enveloppes ?</h3>
          <p>
            Oui, et c'est souvent pertinent : chaque enveloppe a son rôle (déduction, souplesse,
            transmission). L'enjeu est alors de prévoir l'ordre dans lequel on les utilisera.
          </p>
          <h3>Quand faut-il commencer à sécuriser son capital ?</h3>
          <p>
            Pas à une date unique : la bascule progressive, quelques années avant la sortie, est
            une piste courante, à moduler selon votre tolérance au risque et vos autres revenus.
            Aucun support risqué ne garantit le capital.
          </p>
          <h3>Un conseiller est-il indispensable ?</h3>
          <p>
            Non, mais l'avis d'un professionnel peut aider sur les arbitrages fiscaux et la
            transmission. Notre comparaison sur{" "}
            <a href="/guide/conseiller-ou-gerer-seul-sa-retraite">conseiller ou gestion en solo</a>{" "}
            en pèse les avantages et le coût.
          </p>
          <h3>Où trouver les informations officielles sur mes droits ?</h3>
          <p>
            Sur info-retraite.fr, sur le portail de l'Assurance retraite et sur le site de
            l'Agirc-Arrco. Ces sources figurent en fin de page.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Préparer sa retraite est un enchaînement, pas un produit. Comprendre ses droits,
            estimer sa pension et fixer un objectif viennent avant le choix des enveloppes ;
            l'épargne régulière nourrit le projet ; le décaissement et la transmission en
            déterminent le rendement réel après impôt. Sauter une étape se paie plus tard, et en
            général plus cher.
          </p>
          <p>
            Pour passer de la carte à votre cas, deux outils sont à votre disposition : le{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> pour un premier ordre de
            grandeur, et le <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a>{" "}
            pour poser l'ensemble à plat.
          </p>

          <h2>Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/ouvrir-un-per-etapes-documents-delais">Ouvrir un PER : étapes, documents, délais, frais</a></li>
            <li><a href="/guide/transferer-son-per-frais-demarche">Transférer son PER : frais, délais, démarche</a></li>
            <li><a href="/guide/liquider-son-per-a-la-retraite-demarche">Liquider son PER à la retraite : démarche</a></li>
            <li><a href="/guide/declarer-versements-per-impots-case-6ns">Déclarer ses versements PER aux impôts</a></li>
            <li><a href="/guide/comment-ouvrir-une-assurance-vie-etapes">Comment ouvrir une assurance-vie</a></li>
            <li><a href="/guide/transferer-assurance-vie-sans-perdre-anteriorite">Transférer son assurance-vie sans perdre l'antériorité ?</a></li>
            <li><a href="/guide/assurance-vie-a-60-ans-ou-a-la-retraite">Assurance-vie à 60 ans ou à la retraite : ouvrir ou garder ?</a></li>
            <li><a href="/guide/assurance-vie-apres-70-ans-fiscalite-succession">Assurance-vie après 70 ans : fiscalité et succession</a></li>
            <li><a href="/guide/clause-beneficiaire-assurance-vie-comment-la-rediger">Clause bénéficiaire : comment la rédiger</a></li>
            <li><a href="/guide/transferer-son-pea-procedure-frais">Transférer son PEA : procédure et frais</a></li>
            <li><a href="/guide/sortir-du-pea-a-la-retraite-retrait-rente">Sortir du PEA à la retraite</a></li>
            <li><a href="/guide/investir-100000-euros-pour-la-retraite">Investir 100 000 € pour la retraite</a></li>
            <li><a href="/guide/demande-de-retraite-demarches-calendrier">Demande de retraite : démarches et calendrier</a></li>
            <li><a href="/guide/retraite-anticipee-carriere-longue-conditions">Retraite anticipée carrière longue</a></li>
            <li><a href="/guide/pension-de-reversion-conditions-demarche">Pension de réversion : conditions et démarche</a></li>
            <li><a href="/guides">Tous nos guides retraite</a></li>
            <li><a href="/strategies">Les 5 stratégies pour construire son capital retraite</a></li>
            <li><a href="/guide/immobilier-et-retraite-guide-complet">Immobilier et retraite : le guide complet</a></li>
            <li><a href="/guide/meilleure-enveloppe-retraite">Quelle est la meilleure enveloppe pour préparer sa retraite ?</a></li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en novembre 2026 :</p>
          <ul>
            {sources.map((src) => (
              <li key={src.url}>
                <a href={src.url} target="_blank" rel="noopener noreferrer">
                  {src.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Ce guide est général et ne constitue pas un conseil personnalisé : seuls vos caisses
              de retraite et vos conseillers peuvent apprécier votre situation. Tout placement
              comporte un risque de perte en capital, et les performances passées ne préjugent pas
              des performances futures. Les règles fiscales et sociales évoluent : vérifiez-les
              auprès des sources officielles.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Une carte complète, puis votre propre plan : commencez par un bilan retraite." />
    </>
  );
}
