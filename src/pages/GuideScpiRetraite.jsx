import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { IMMO, FISCALITE, euros, pct } from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const M = IMMO.scpiMarche;
const F = IMMO.scpiFiscalite;

const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " %";

// ---- Illustration : que représentent 10 000 € de parts ? ----
const MISE = 10000;
// Valeur théorique de retrait si le prix de part n'a pas bougé : mise × (1 − frais de souscription).
const valeurRetrait = (fraisPct) => MISE * (1 - fraisPct / 100);
const revenuBrutAnnuel = (taux) => (MISE * taux) / 100;
const revenuBrutMensuel = (taux) => revenuBrutAnnuel(taux) / 12;
// Distribution 2025 rapportée à la mise nette de frais (même revenu, capital réellement investi plus bas).
const tauxSurCapitalInvestiMax = (fraisPct) => M.tauxDistribution2025 / (1 - fraisPct / 100);

const sources = [
  {
    label:
      "ASPIM — Communiqué de presse du 4e trimestre 2025 (marché des SCPI, 10 février 2026)",
    url: "https://www.aspim.fr/content/uploads/2026/02/ASPIM_CP-4T-2025_V4.pdf",
  },
  {
    label: "ASPIM — Communiqué de presse du 1er semestre 2026 (5 août 2026)",
    url: "https://www.aspim.fr/content/uploads/2026/08/ASPIM_CP-1S-2026_V7-def.pdf",
  },
  {
    label: "AMF — « Investir dans une SCPI » (guide, 2023)",
    url: "https://www.amf-france.org/sites/institutionnel/files/private/2023-12/2023_investir_dans_une_scpi.pdf",
  },
  {
    label:
      "Service-Public.gouv.fr — Prélèvements sociaux sur les revenus du patrimoine, fiche F2329",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2329",
  },
  {
    label:
      "Service-Public.gouv.fr — Plus-values immobilières, fiche F10864, vérifiée le 15 avril 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F10864",
  },
  {
    label: "impots.gouv.fr — Les régimes d'imposition (revenus fonciers)",
    url: "https://www.impots.gouv.fr/particulier/les-regimes-dimposition",
  },
  {
    label: "impots.gouv.fr — Calcul de l'IFI",
    url: "https://www.impots.gouv.fr/particulier/calcul-de-lifi",
  },
  {
    label: "Légifrance — Loi de financement de la sécurité sociale pour 2026",
    url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053226384",
  },
];

export default function GuideScpiRetraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Immobilier · revenus complémentaires</span>
          <h1>SCPI et retraite : comment s'en servir pour préparer ses revenus ?</h1>
          <p className="sub">
            Un revenu régulier, mais ni garanti ni facile à récupérer : ce qu'il faut comprendre
            avant de souscrire. Mis à jour le {IMMO.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> une SCPI (société civile de placement immobilier)
              collecte l'épargne de nombreux investisseurs pour acheter et louer des immeubles, puis
              leur reverse les loyers nets de frais. Le taux de distribution moyen du marché a été
              de {pct1(M.tauxDistribution2025)} en 2025, mais le prix de la part a varié de{" "}
              {pct1(M.variationPrixPart2025)} la même année : le rendement global moyen ressort à{" "}
              {pct1(M.performanceGlobale2025)}. Le capital n'est pas garanti, les revenus non plus,
              et la sortie peut prendre du temps. Utilisée avec mesure, la SCPI peut compléter un
              budget de retraite ; ce n'est ni un livret ni une rente.
            </p>
          </div>

          <p>
            À l'approche de la retraite, une question revient souvent : comment remplacer une
            partie du salaire par un revenu qui tombe tous les trimestres, sans gérer un
            appartement soi-même ? La SCPI est l'une des réponses les plus citées. Elle est aussi
            l'une des plus mal comprises.
          </p>
          <p>
            Prenons une situation illustrative et composite, sans lien avec un cas réel : Hélène,
            salariée proche de la retraite, hésite à placer une somme en SCPI pour s'assurer un
            complément de revenu une fois ses pensions liquidées. Elle ne sait pas si
            elle pourra récupérer son argent en cas d'imprévu, ni ce que les taux
            annoncés représentent vraiment. Cet article répond à ces questions de fond. Pour une
            vue d'ensemble de l'immobilier dans une stratégie de retraite, voir notre{" "}
            <a href="/strategies/immobilier-retraite">stratégie immobilier</a>.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#principe">Qu'est-ce qu'une SCPI et comment produit-elle un revenu ?</a></li>
              <li><a href="#rendement">Taux de distribution ou rendement global : que mesure-t-on ?</a></li>
              <li><a href="#marche">Que disent les chiffres du marché en 2025 et en 2026 ?</a></li>
              <li><a href="#frais">Quels frais faut-il payer ?</a></li>
              <li><a href="#exemple">Que représentent 10 000 € de parts ?</a></li>
              <li><a href="#risques">Quels sont les risques d'une SCPI ?</a></li>
              <li><a href="#budget">Quelle place dans un budget de retraite ?</a></li>
              <li><a href="#checklist">Huit questions à poser avant de souscrire</a></li>
              <li><a href="#erreurs">Quelles erreurs éviter ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="principe">Qu'est-ce qu'une SCPI et comment produit-elle un revenu ?</h2>
          <p>
            Une SCPI est une société gérée par un professionnel agréé, la société de gestion. Vous
            achetez des parts ; la société les utilise, avec celles des autres associés, pour
            acquérir des immeubles (bureaux, commerces, logements, santé, logistique, en France ou
            à l'étranger). Elle les loue, paie les charges et les frais, puis distribue le solde
            sous forme de revenus, en général chaque trimestre.
          </p>
          <p>
            Vous ne choisissez pas les immeubles et vous ne gérez aucun locataire. En échange, vous
            ne décidez de rien non plus : la stratégie appartient à la société de gestion,
            contrôlée dans le cadre fixé par l'AMF. Cette délégation est la raison d'être de la
            SCPI, et aussi l'une de ses limites : la qualité du placement dépend de la qualité de
            la gestion.
          </p>
          <p>
            Vos revenus proviennent de deux sources possibles : les loyers encaissés (la
            distribution), et, à la revente des parts, la différence entre le prix de sortie et le
            prix d'entrée. Seule la première est régulière ; la seconde peut être positive, nulle ou
            négative.
          </p>
          <p>
            Détenues en direct, les parts produisent des revenus imposés comme des revenus
            fonciers : barème de l'impôt sur le revenu, auxquels s'ajoutent{" "}
            {pct1(FISCALITE.prelevementsSociaux.immobilier)} de prélèvements sociaux. Le détail
            relève d'un autre guide, que nous publions dans ce même cluster :{" "}
            <a href="/guide/scpi-fiscalite-revenus-plus-values">
              fiscalité des SCPI, revenus et plus-values
            </a>
            . Le choix de l'enveloppe est traité dans{" "}
            <a href="/guide/scpi-assurance-vie-ou-per">SCPI en direct, en assurance-vie ou en PER</a>
            .
          </p>

          <h2 id="rendement">Taux de distribution ou rendement global : que mesure-t-on ?</h2>
          <p>
            Le chiffre mis en avant est presque toujours le <strong>taux de distribution</strong> :
            les revenus versés sur l'année, rapportés au prix de la part. Il dit ce que vous avez
            reçu, pas ce que votre capital est devenu.
          </p>
          <p>
            Le <strong>taux de rendement global</strong> ajoute à la distribution la variation du
            prix de la part sur la période. Si vous recevez {pct1(M.tauxDistribution2025)} mais que
            le prix de la part recule de {pct1(Math.abs(M.variationPrixPart2025))}, votre année est
            nettement moins bonne que ne le suggère le taux de distribution : c'est exactement
            l'écart observé en 2025 pour le marché pris dans son ensemble.
          </p>
          <div className="note">
            <p>
              Un taux de distribution n'est pas un rendement garanti. Les performances passées ne
              préjugent pas des performances futures, et la distribution d'une année peut aussi
              s'appuyer sur des réserves constituées les années précédentes, ce qui ne se renouvelle
              pas indéfiniment.
            </p>
          </div>

          <h2 id="marche">Que disent les chiffres du marché en 2025 et en 2026 ?</h2>
          <p>
            Les chiffres ci-dessous sont des moyennes publiées par l'ASPIM, l'association
            professionnelle du secteur (communiqués de février et d'août 2026). Ils décrivent le
            marché, pas une SCPI en particulier : l'écart entre véhicules est important.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Indicateur</th>
                  <th>Valeur</th>
                  <th>Période</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Taux de distribution moyen pondéré</td>
                  <td>{pct1(M.tauxDistribution2025)}</td>
                  <td>Année 2025</td>
                </tr>
                <tr>
                  <td>Écart selon les stratégies (du résidentiel à la diversifiée)</td>
                  <td>de {pct1(M.tauxDistributionStrategieMin)} à {pct1(M.tauxDistributionStrategieMax)}</td>
                  <td>Année 2025</td>
                </tr>
                <tr>
                  <td>Variation du prix de part moyen pondéré</td>
                  <td>{pct1(M.variationPrixPart2025)}</td>
                  <td>Année 2025</td>
                </tr>
                <tr>
                  <td>Taux de rendement global</td>
                  <td>{pct1(M.performanceGlobale2025)}</td>
                  <td>Année 2025</td>
                </tr>
                <tr>
                  <td>Capitalisation du marché</td>
                  <td>{M.capitalisation2025Md} Md€ puis {M.capitalisationS12026Md} Md€</td>
                  <td>Au 31 décembre 2025, puis au 30 juin 2026</td>
                </tr>
                <tr>
                  <td>Parts en attente de retrait</td>
                  <td>{M.partsEnAttente2025Md} Md€ ({pct1(M.partsEnAttente2025Pct)} de la capitalisation), puis {M.partsEnAttenteS12026Md} Md€ ({pct1(M.partsEnAttenteS12026Pct)})</td>
                  <td>Au 31 décembre 2025, puis au 30 juin 2026</td>
                </tr>
                <tr>
                  <td>Variation du prix de part moyen pondéré</td>
                  <td>{pct1(M.variationPrixPartS12026)}</td>
                  <td>Premier semestre 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Deux lectures s'imposent. D'abord, les revenus restent proches de ce que le marché
            distribue depuis plusieurs années, mais le prix des parts a reculé en 2025 puis encore
            au premier semestre 2026 : les investisseurs qui ont acheté plus tôt ont vu la valeur
            de leurs parts baisser. Ensuite, des parts en attente de retrait existent : cela
            signifie que des associés ont demandé à sortir et n'ont pas encore trouvé
            d'acheteur. D'après les sources consultées, le premier semestre 2026 a aussi vu la
            suspension temporaire de la variabilité du capital pour plusieurs SCPI, et une baisse
            marquée du prix des SCPI à capital fixe ; les chiffres par véhicule varient, à
            confirmer dans la documentation de chaque SCPI.
          </p>

          <h2 id="frais">Quels frais faut-il payer ?</h2>
          <p>
            Deux familles de frais pèsent sur le résultat. Leur niveau figure dans le document
            d'informations clés (DIC) et dans la note d'information de chaque SCPI.
          </p>
          <ul>
            <li>
              <strong>Les frais de souscription</strong>, prélevés une fois sur le prix d'achat. Le
              guide de l'AMF cite une fourchette de {M.fraisSouscriptionAmfMin} % à{" "}
              {M.fraisSouscriptionAmfMax} % du prix (niveau exact à lire dans chaque
              documentation). Ils servent notamment à rémunérer la commercialisation et la
              collecte. Ils ne se traduisent pas par des parts : une partie de votre mise ne
              travaille pas.
            </li>
            <li>
              <strong>Les frais de gestion</strong>, retenus chaque année sur les loyers avant
              distribution. Ils sont donc déjà déduits du taux de distribution affiché ; ils ne
              se voient pas sur votre relevé, mais réduisent le revenu reçu.
            </li>
          </ul>
          <p>
            Des frais peuvent aussi s'ajouter à la sortie ou lors de la cession, selon les
            véhicules. Pour situer l'ordre de grandeur des frais d'un placement immobilier face
            aux autres, voir{" "}
            <a href="/guide/combien-coute-un-investissement-locatif">
              combien coûte un investissement locatif
            </a>
            .
          </p>

          <h2 id="exemple">Que représentent 10 000 € de parts ?</h2>
          <p>
            Pour se représenter les ordres de grandeur, voici un calcul volontairement simple, à
            partir des données du marché ci-dessus. Il ne prédit rien : il montre l'effet mécanique
            des frais de souscription et du taux de distribution.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Hypothèse de frais de souscription</th>
                  <th>Valeur théorique de retrait, prix de part inchangé</th>
                  <th>Perte immédiate</th>
                  <th>Revenu brut annuel au taux {pct1(M.tauxDistribution2025)}</th>
                </tr>
              </thead>
              <tbody>
                {[M.fraisSouscriptionAmfMin, M.fraisSouscriptionAmfMax].map((frais) => (
                  <tr key={frais}>
                    <td>{pct(frais)} du prix</td>
                    <td>{euros(valeurRetrait(frais))}</td>
                    <td>{euros(MISE - valeurRetrait(frais))}</td>
                    <td>
                      {euros(revenuBrutAnnuel(M.tauxDistribution2025))} par an, soit environ{" "}
                      {euros(revenuBrutMensuel(M.tauxDistribution2025))} par mois
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Base : une mise de {euros(MISE)}, le taux de distribution moyen de {pct1(M.tauxDistribution2025)}{" "}
            publié pour 2025, et des frais de souscription pris aux deux extrémités de la
            fourchette citée par l'AMF. Les revenus sont bruts, avant impôt sur le revenu et
            prélèvements sociaux.
          </p>
          <p>
            Que retenir ? Si vous aviez besoin de récupérer votre mise le lendemain de la
            souscription, et à supposer que le prix de la part n'ait pas changé, vous récupéreriez
            la valeur de retrait, inférieure à ce que vous avez payé. Le revenu, lui, est calculé sur
            le prix payé : rapporté au capital réellement investi après frais, il correspond à un
            taux d'environ {pct1(tauxSurCapitalInvestiMax(M.fraisSouscriptionAmfMin))} à{" "}
            {pct1(tauxSurCapitalInvestiMax(M.fraisSouscriptionAmfMax))} selon les frais retenus.
            C'est l'une des raisons pour lesquelles la durée de détention recommandée est longue.
          </p>
          <div className="note">
            <p>
              Cet exemple est illustratif. Il suppose un prix de part inchangé et un taux de
              distribution identique à la moyenne 2025 : aucune de ces deux hypothèses n'est une
              prévision. Une SCPI réelle peut distribuer moins, ou plus, et son prix de part peut
              baisser comme monter.
            </p>
          </div>

          <h2 id="risques">Quels sont les risques d'une SCPI ?</h2>
          <p>
            Le DIC présente un indicateur de risque sur une échelle de 1 à{" "}
            {M.dicIndicateurRisqueEchelle}. Au-delà du chiffre, voici les risques à comprendre en
            clair.
          </p>
          <ul>
            <li>
              <strong>Risque de perte en capital.</strong> La valeur des parts varie avec la valeur
              des immeubles, qui dépend du marché, des taux d'intérêt et de l'état des
              locataires. Le capital n'est pas garanti.
            </li>
            <li>
              <strong>Risque sur les revenus.</strong> Les loyers peuvent baisser : départ de
              locataires, renégociations, immeubles vacants, travaux. La distribution n'est pas
              garantie, et peut être réduite d'une année à l'autre.
            </li>
            <li>
              <strong>Risque de liquidité.</strong> Une SCPI n'est pas cotée comme une action : pour
              sortir, il faut un acheteur. En cas de forte demande de retraits, des parts peuvent
              rester en attente, comme l'indiquent les chiffres du marché plus haut. Dans ce cas,
              l'attente peut durer, et la liquidité n'est pas garantie.
            </li>
            <li>
              <strong>Suspension de la variabilité du capital.</strong> Une SCPI à capital variable
              peut, dans certaines conditions, suspendre temporairement les souscriptions et les
              retraits. Pendant ce temps, vous ne pouvez plus sortir par le mécanisme habituel.
            </li>
            <li>
              <strong>Valeur de retrait inférieure au prix d'achat.</strong> Même sans baisse du
              prix de part, les frais de souscription creusent l'écart, comme le tableau
              précédent l'a montré.
            </li>
            <li>
              <strong>Risque de gestion et de concentration.</strong> Une SCPI peut concentrer ses
              immeubles sur un secteur, une région, des locataires ou un pays. L'endettement de la
              SCPI, quand il existe, amplifie les hausses comme les baisses.
            </li>
            <li>
              <strong>Risque fiscal et réglementaire.</strong> Les règles citées sont celles
              publiées au {IMMO.maj} et peuvent évoluer.
            </li>
          </ul>
          <p>
            Le risque change encore de nature si la souscription est financée à crédit : voir{" "}
            <a href="/guide/scpi-a-credit-ou-comptant">SCPI à crédit ou comptant</a>.
          </p>

          <h2 id="budget">Quelle place dans un budget de retraite ?</h2>
          <p>
            Il n'existe pas de pourcentage de patrimoine qui s'appliquerait à tous, et nous n'en
            proposons aucun : la bonne proportion dépend de vos pensions, de votre épargne
            disponible, de vos dépenses fixes et de votre tolérance à ne pas pouvoir récupérer une
            somme rapidement. Quelques repères de raisonnement :
          </p>
          <ul>
            <li>
              <strong>Un revenu complémentaire, pas le socle.</strong> Un revenu variable et peu
              liquide se rattache plutôt aux dépenses que l'on peut ajuster (loisirs, voyages,
              aide à la famille) qu'aux dépenses incompressibles (logement, santé, alimentation),
              que les pensions couvrent mieux.
            </li>
            <li>
              <strong>Une épargne de précaution intacte.</strong> L'argent placé en SCPI ne doit
              pas être celui dont vous pourriez avoir besoin dans les années qui viennent.
            </li>
            <li>
              <strong>Un horizon long.</strong> La durée de détention recommandée, à lire dans le
              DIC, est en pratique longue. Plus on s'approche de la retraite, moins il reste de
              temps pour absorber une baisse du prix de part.
            </li>
            <li>
              <strong>Des revenus imposés.</strong> Les revenus fonciers entrent dans le revenu
              imposable et peuvent peser sur d'autres éléments de la situation fiscale, par
              exemple le revenu fiscal de référence, dont dépend le taux de CSG sur les
              pensions (voir{" "}
              <a href="/guide/immobilier-a-la-retraite-revenus-transmission">
                immobilier à la retraite
              </a>
              ). Ils se comparent au net, pas au brut.
            </li>
          </ul>
          <p>
            Pour situer la SCPI parmi les autres solutions, voir{" "}
            <a href="/guide/per-ou-immobilier-locatif">PER ou immobilier locatif</a> et{" "}
            <a href="/guide/immobilier-locatif-ou-assurance-vie">
              immobilier locatif ou assurance-vie
            </a>
            . Pour l'ordre dans lequel mobiliser ses placements une fois à la retraite, voir{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a> et la{" "}
            <a href="/strategies/decumulation">stratégie de décumulation</a>.
          </p>

          <h2 id="checklist">Huit questions à poser avant de souscrire</h2>
          <p>
            La liste ci-dessous n'est pas une recommandation, mais une grille de lecture. Si l'une
            des réponses manque dans la documentation, c'est déjà une information.
          </p>
          <ol>
            <li>
              <strong>Ai-je lu le DIC en entier ?</strong> Document obligatoire avant toute
              souscription : indicateur de risque, scénarios de performance, coûts.
            </li>
            <li>
              <strong>Quelle est la durée de détention recommandée ?</strong> Et est-elle compatible
              avec mon âge et mes besoins de trésorerie ?
            </li>
            <li>
              <strong>Quels frais exactement ?</strong> Souscription, gestion, et éventuels frais à la
              sortie ou à la cession.
            </li>
            <li>
              <strong>Quel patrimoine, et dans quels secteurs ?</strong> Type d'immeubles,
              répartition géographique, nombre de locataires, importance des plus gros.
            </li>
            <li>
              <strong>Quel taux d'occupation ?</strong> Financier et physique, et son évolution sur
              plusieurs trimestres.
            </li>
            <li>
              <strong>La SCPI est-elle endettée ?</strong> Dans quelle proportion, à quel taux, avec
              quelles échéances de refinancement ?
            </li>
            <li>
              <strong>Comment sort-on ?</strong> Capital fixe ou variable, historique des parts en
              attente, conditions de retrait, risque de suspension.
            </li>
            <li>
              <strong>Quelle fiscalité pour moi ?</strong> Revenus fonciers, éventuels revenus de
              source étrangère, enveloppe choisie, et effet sur l'ensemble de mes revenus.
            </li>
          </ol>
          <p>
            Pour comparer les véhicules entre eux, consultez{" "}
            <a href="https://immobilierpassif.com" target="_blank" rel="noopener noreferrer">
              immobilierpassif.com
            </a>
            . Pour souscrire une SCPI avec un accompagnement, rendez-vous sur{" "}
            <a href="https://scpirentable.fr" target="_blank" rel="noopener noreferrer">
              scpirentable.fr
            </a>
            . Nous ne détaillons pas ici l'analyse véhicule par véhicule.
          </p>

          <h2 id="erreurs">Quelles erreurs éviter ?</h2>
          <ul>
            <li>
              <strong>Lire le taux de distribution comme un rendement garanti.</strong> Il ne dit
              rien du prix de la part ni de l'année suivante.
            </li>
            <li>
              <strong>Oublier les frais de souscription.</strong> Ils réduisent immédiatement la
              valeur de retrait.
            </li>
            <li>
              <strong>Placer l'argent dont on peut avoir besoin.</strong> La liquidité n'est pas
              garantie, et peut se dégrader dans les moments où l'on en a le plus besoin.
            </li>
            <li>
              <strong>Raisonner en brut.</strong> Impôt et prélèvements sociaux se déduisent du
              revenu affiché.
            </li>
            <li>
              <strong>Tout concentrer sur une seule SCPI.</strong> Une SCPI regroupe de nombreux
              immeubles, mais reste une seule société, avec une seule équipe de gestion.
            </li>
            <li>
              <strong>Se décider sur une publicité ou un classement.</strong> Seule la
              documentation officielle de la SCPI fait foi.
            </li>
            <li>
              <strong>Emprunter sans avoir mesuré l'effort.</strong> L'emprunt reste dû quoi que
              fasse le prix de la part, point détaillé dans{" "}
              <a href="/guide/scpi-a-credit-ou-comptant">SCPI à crédit ou comptant</a>. Voir aussi
              les{" "}
              <a href="/guide/cinq-erreurs-investissement-locatif-retraite">
                cinq erreurs de l'investissement locatif à l'approche de la retraite
              </a>
              .
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Une SCPI est-elle un placement sûr ?</h3>
          <p>
            Non au sens où le capital n'est pas garanti : la valeur des parts varie, les revenus ne
            sont pas garantis, et la liquidité non plus. La diversification entre plusieurs
            immeubles réduit certains risques, elle n'en supprime aucun.
          </p>
          <h3>Peut-on récupérer son argent à tout moment ?</h3>
          <p>
            Pas avec certitude. Le retrait suppose qu'un acheteur existe ou que la société puisse
            satisfaire la demande ; des parts en attente existent sur le marché, comme le montrent
            les chiffres de l'ASPIM.
          </p>
          <h3>Quel taux de distribution peut-on espérer ?</h3>
          <p>
            Le taux moyen du marché a été de {pct1(M.tauxDistribution2025)} en 2025, avec des
            écarts de {pct1(M.tauxDistributionStrategieMin)} à {pct1(M.tauxDistributionStrategieMax)}{" "}
            selon les stratégies. C'est un constat passé, pas une prévision, et le rendement global
            a été de {pct1(M.performanceGlobale2025)}.
          </p>
          <h3>Les revenus d'une SCPI sont-ils imposés ?</h3>
          <p>
            Oui. En détention directe, ils relèvent des revenus fonciers : barème de l'impôt sur le
            revenu plus {pct1(FISCALITE.prelevementsSociaux.immobilier)} de prélèvements sociaux.
            Les détails, y compris les revenus de source étrangère et les plus-values, sont dans
            notre guide sur{" "}
            <a href="/guide/scpi-fiscalite-revenus-plus-values">la fiscalité des SCPI</a>.
          </p>
          <h3>Vaut-il mieux une SCPI qu'un investissement locatif en direct ?</h3>
          <p>
            Les deux n'ont pas les mêmes contraintes : la SCPI demande moins de gestion et se
            souscrit par petites sommes, le locatif en direct laisse plus de maîtrise. Nous les
            comparons dans notre{" "}
            <a href="/strategies/immobilier-retraite">stratégie immobilier</a> et sur le LMNP dans{" "}
            <a href="/guide/lmnp-ou-locatif-nu">LMNP ou locatif nu</a>.
          </p>
          <h3>Quel rôle pour l'assurance-vie ou le PER ?</h3>
          <p>
            Certaines SCPI se détiennent aussi dans une enveloppe. La fiscalité et les frais
            changent alors ; nous les détaillons dans{" "}
            <a href="/guide/scpi-assurance-vie-ou-per">SCPI en direct, en assurance-vie ou en PER</a>
            . Pour choisir l'assurance-vie elle-même, voir{" "}
            <a href="/guide/meilleure-assurance-vie-retraite">notre guide sur les contrats</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La SCPI sert un besoin précis : toucher un revenu issu de l'immobilier sans le gérer.
            Elle ne garantit ni ce revenu ni le capital, et la sortie peut demander du temps. Les
            chiffres de 2025 et du premier semestre 2026 le rappellent : un taux de distribution
            honorable peut coexister avec un prix de part en baisse et un rendement global bien
            plus faible.
          </p>
          <p>
            Sa place dans un budget de retraite se juge donc à trois critères : l'horizon (long),
            la liquidité dont vous avez besoin (à garder ailleurs) et la part des dépenses que ce
            revenu aurait vocation à couvrir (plutôt les dépenses ajustables). Aucun pourcentage de
            patrimoine ne vaut pour tous.
          </p>
          <p>
            Pour replacer cette réflexion dans votre budget, l'ordre de grandeur de vos pensions se
            lit dans notre <a href="/simulateur-retraite">simulateur de retraite</a>. Si vous
            souhaitez ensuite situer l'immobilier parmi vos autres placements, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à poser ce
            cadre général.
          </p>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées le {IMMO.maj} :</p>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : elle ne
              tient pas compte de votre situation, de vos objectifs ni de votre tolérance au risque.
              Les règles citées sont celles publiées au {IMMO.maj} et peuvent évoluer ; les
              chiffres de marché sont des moyennes passées, qui ne préjugent pas des résultats
              futurs, et l'exemple chiffré est une illustration pédagogique sur hypothèses
              affichées. Le document d'informations clés de chaque SCPI fait foi.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Un revenu immobilier se place dans un budget, pas à côté." />
    </>
  );
}
