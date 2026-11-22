import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  DECUMULATION,
  EPARGNE_RETRAITE_EXEMPLES,
  ENRICH_EPPEA_EPARGNE,
  ILLUSTRATIF,
  SIMU_DEFAUTS,
  euros,
  pct,
} from "../components/hypotheses.js";

// Bornes du multiple « capital cible / revenu annuel à financer », dérivées
// du taux de conversion en rente viagère à 65 ans (voir hypotheses.js) :
// multiple = 100 / taux de conversion. Bornes arrondies pour un repère lisible.
const multipleBas = Math.round(100 / DECUMULATION.tauxConversionRente65.max);
const multipleHaut = Math.round(100 / DECUMULATION.tauxConversionRente65.min);

// Exemple illustratif fil rouge (purement pédagogique, cf. règle du site).
const revenuCibleMensuelExemple = 4000;
const pensionsEstimeesMensuelExemple = 2800;
const lacuneMensuelleExemple = revenuCibleMensuelExemple - pensionsEstimeesMensuelExemple;
const lacuneAnnuelleExemple = lacuneMensuelleExemple * 12;
const capitalBasExemple = lacuneAnnuelleExemple * multipleBas;
const capitalHautExemple = lacuneAnnuelleExemple * multipleHaut;

// ------------------------------------------------------------------
// Calculs des nouvelles sections — tout vient de hypotheses.js.
// Tous les montants sont exprimés en euros d'aujourd'hui : versements
// et capitaux sont raisonnés en termes réels (rendement net déflaté de
// l'inflation). Illustrations pédagogiques, jamais des projections.
// ------------------------------------------------------------------
const EX = EPARGNE_RETRAITE_EXEMPLES;
const EP = ENRICH_EPPEA_EPARGNE;
const tauxReel = (rNetPct) => (1 + rNetPct / 100) / (1 + EX.inflationAnnuelle / 100) - 1;
const facteurRente = (i, n) => (i === 0 ? n : (1 - Math.pow(1 + i, -n)) / i);
// Capital (à l'âge de départ) finançant un complément mensuel indexé sur la durée de retraite retenue.
const capitalPourComplement = (complementMensuel) =>
  complementMensuel * 12 * facteurRente(tauxReel(EX.rendementDecaissementNet), EX.dureeRetraiteAnnees);
// Versement mensuel constant (versements en début de mois) pour atteindre un capital en euros constants.
const versementPourCapital = (capital, annees, rNetPct) => {
  const m = Math.pow(1 + tauxReel(rNetPct), 1 / 12) - 1;
  const n = annees * 12;
  if (Math.abs(m) < 1e-9) return capital / n; // rendement réel nul
  return capital / (((Math.pow(1 + m, n) - 1) / m) * (1 + m));
};
const rendementCentral = EX.rendementsEpargneNets[Math.floor(EX.rendementsEpargneNets.length / 2)];
const rendementBas = EX.rendementsEpargneNets[0];
const rendementHaut = EX.rendementsEpargneNets[EX.rendementsEpargneNets.length - 1];
const complementReference = EX.complementsMensuelsCibles[1];
const grilleAges = EX.agesActuels.map((age) => {
  const annees = EX.ageDepart - age;
  const parComplement = EX.complementsMensuelsCibles.map((c) => ({
    complement: c,
    central: versementPourCapital(capitalPourComplement(c), annees, rendementCentral),
    bas: versementPourCapital(capitalPourComplement(c), annees, rendementBas),
    haut: versementPourCapital(capitalPourComplement(c), annees, rendementHaut),
  }));
  return { age, annees, parComplement };
});
const partRevenu = (v) => Math.round((v / EP.revenuNetMensuelIllustratif) * 100);

// Grille capital -> complément mensuel (trois lectures du même capital).
const grilleCapital = EX.capitauxCiblesGrille.map((capital) => ({
  capital,
  regle4: (capital * EX.regleRetraitAnnuel) / 100 / 12,
  duree: capital / 12 / facteurRente(tauxReel(EX.rendementDecaissementNet), EX.dureeRetraiteAnnees),
  renteBas: (capital * DECUMULATION.tauxConversionRente65.min) / 100 / 12,
  renteHaut: (capital * DECUMULATION.tauxConversionRente65.max) / 100 / 12,
}));

// Effet des frais et de l'inflation sur l'horizon retenu.
const HORIZON = EP.horizonFraisAnnees;
const capitalise = (versement, annees, tauxPct) => {
  const i = Math.pow(1 + tauxPct / 100, 1 / 12) - 1;
  const n = annees * 12;
  return versement * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
};
const FI = (() => {
  const versement = SIMU_DEFAUTS.versementMensuel;
  const brut = SIMU_DEFAUTS.rendementAnnuel;
  const deflateur = Math.pow(1 + EX.inflationAnnuelle / 100, HORIZON);
  const arrondi = (n) => Math.round(n / 100) * 100;
  const calc = (frais) => {
    const nominal = capitalise(versement, HORIZON, brut - frais);
    return { frais, net: brut - frais, nominal: arrondi(nominal), reel: arrondi(nominal / deflateur) };
  };
  const etf = calc(ILLUSTRATIF.fraisSupportEtf);
  const maison = calc(ILLUSTRATIF.fraisSupportMaison);
  return {
    versement,
    brut,
    verse: versement * HORIZON * 12,
    etf,
    maison,
    ecartReel: etf.reel - maison.reel,
    deflateur,
    complementNominal: Math.round(complementReference * deflateur),
    pouvoirAchatPct: Math.round(100 / deflateur),
  };
})();

export default function GuideCombienEpargner() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide — la question n°1 · Mis à jour {EX.maj}</span>
          <h1>Combien épargner pour sa retraite ? Par mois, selon l'âge et le revenu</h1>
          <p className="sub">
            Il n'existe pas de montant unique : l'effort mensuel dépend du complément de revenu visé
            et du temps restant. Dans nos illustrations, viser {euros(complementReference)} de plus
            par mois à {EX.ageDepart} ans demande de l'ordre de {euros(grilleAges[0].parComplement[1].central)}{" "}
            par mois à {grilleAges[0].age} ans, mais {euros(grilleAges[2].parComplement[1].central)} à{" "}
            {grilleAges[2].age} ans.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> il n'existe pas de chiffre unique valable pour tout le
              monde, mais une méthode en trois étapes — revenu cible, lacune mensuelle, capital
              nécessaire pour la financer. Dans un exemple illustratif courant (une lacune de{" "}
              {euros(lacuneMensuelleExemple)} par mois face aux pensions estimées), le capital à
              constituer se situe grosso modo entre {euros(capitalBasExemple)} et{" "}
              {euros(capitalHautExemple)}. L'effort d'épargne mensuel qui en découle dépend ensuite
              presque entièrement de deux paramètres : le capital déjà constitué et le temps restant
              avant le départ.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#chiffre-magique">Pourquoi il n'existe pas de chiffre magique</a></li>
              <li><a href="#methode">La méthode en trois questions</a></li>
              <li><a href="#par-mois">Et donc, combien épargner chaque mois ?</a></li>
              <li><a href="#regle-age">Combien épargner par mois selon l'âge et la part du revenu ?</a></li>
              <li><a href="#capital-complement">Quel complément mensuel pour quel capital ?</a></li>
              <li><a href="#frais-inflation">Frais et inflation : que deviennent {euros(FI.versement)} par mois sur {HORIZON} ans ?</a></li>
              <li><a href="#ou-placer">Où placer cette épargne : PER, assurance-vie ou PEA ?</a></li>
              <li><a href="#erreurs">Les erreurs qui faussent tous les calculs</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
            </ol>
          </div>

          <h2 id="chiffre-magique">Pourquoi il n'existe pas de chiffre magique</h2>
          <p>
            Les articles qui annoncent « il vous faut X euros pour votre retraite » vendent une
            illusion : le bon montant dépend de votre niveau de vie cible, de votre âge de départ,
            de vos pensions futures, de votre situation immobilière (propriétaire ou locataire à la
            retraite, cela change tout) et de la durée que vous devrez financer. Deux voisins de
            palier au même salaire peuvent avoir besoin de capitaux du simple au triple.
          </p>

          <h2>Le point de départ : le taux de remplacement</h2>
          <p>
            Le taux de remplacement est le rapport entre votre première pension et votre dernier
            revenu d'activité. C'est la donnée qui structure tout le reste. Sa logique est
            connue : plus vos revenus sont élevés, plus ce taux diminue, car les régimes
            complémentaires couvrent proportionnellement moins bien les tranches hautes de salaire.
            Le mécanisme est chiffré, tranche par tranche, dans{" "}
            <a href="/guide/retraite-complementaire-agirc-arrco-cadres-calcul">
              notre guide sur le calcul de la retraite Agirc-Arrco des cadres
            </a>
            .
            Un cadre supérieur du privé doit donc s'attendre à un décrochage de revenus nettement
            plus marqué qu'un salarié au revenu médian — c'est précisément cet écart que votre
            épargne doit combler. Le choix de l'enveloppe qui accueillera cette épargne (PER,
            assurance-vie, PEA) a lui-même un effet sur le revenu net final : notre guide{" "}
            <a href="/guide/meilleure-enveloppe-retraite">quelle est la meilleure enveloppe pour préparer sa retraite</a>{" "}
            détaille comment choisir, une fois l'objectif chiffré ci-dessous posé.
          </p>
          <p>
            Première étape concrète : récupérer votre estimation personnalisée sur
            info-retraite.fr (le simulateur officiel M@rel, alimenté par vos droits réels). C'est
            la seule base sérieuse — toute projection qui ne part pas de vos droits réels est une
            spéculation.
          </p>

          <h2 id="methode">La méthode en trois questions</h2>
          <h3>1. Quel revenu mensuel voulez-vous à la retraite ?</h3>
          <p>
            Partez de votre budget actuel, retirez ce qui disparaîtra (crédit immobilier soldé,
            enfants autonomes, charges professionnelles), ajoutez ce qui apparaîtra (santé,
            loisirs, éventuellement un loyer). La plupart des personnes que nous recevons visent
            entre 70 % et 90 % de leur revenu net actuel.
          </p>
          <h3>2. Quelle sera votre lacune mensuelle ?</h3>
          <p>
            Revenu cible moins pensions estimées : c'est votre lacune. C'est elle — et elle seule —
            que votre capital devra financer. Exemple purement illustratif : viser{" "}
            {euros(revenuCibleMensuelExemple)} par mois avec {euros(pensionsEstimeesMensuelExemple)}{" "}
            de pensions estimées crée une lacune de {euros(lacuneMensuelleExemple)} par mois, soit{" "}
            {euros(lacuneAnnuelleExemple)} par an.
          </p>
          <h3>3. Quel capital faut-il pour financer cette lacune ?</h3>
          <p>
            Repère empirique de notre cabinet, et non un standard de marché : pour financer
            durablement un revenu annuel donné sur une retraite complète, il faut un capital
            représentant grosso modo {multipleBas} à {multipleHaut} fois ce revenu annuel. Ce
            multiple n'est pas arbitraire : il découle directement d'un taux de conversion en rente
            viagère à 65 ans de l'ordre de {pct(DECUMULATION.tauxConversionRente65.min)} à{" "}
            {pct(DECUMULATION.tauxConversionRente65.max)} (rente annuelle = capital × taux), les
            barèmes réels variant ensuite selon l'assureur, l'âge de départ, la part sécurisée du
            patrimoine et l'hypothèse de rendement retenue — que nous ne fixerons pas ici, car elle
            n'est jamais garantie. Dans notre exemple illustratif, la lacune de{" "}
            {euros(lacuneAnnuelleExemple)} par an appellerait donc un capital de l'ordre de{" "}
            {euros(capitalBasExemple)} à {euros(capitalHautExemple)}. Ce n'est pas une promesse :
            c'est un cadre de raisonnement, à affiner avec vos données réelles.
          </p>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Étape</th>
                  <th>Valeur illustrative</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Revenu mensuel cible à la retraite</td>
                  <td>{euros(revenuCibleMensuelExemple)}</td>
                </tr>
                <tr>
                  <td>Pensions mensuelles estimées (régimes obligatoires)</td>
                  <td>{euros(pensionsEstimeesMensuelExemple)}</td>
                </tr>
                <tr>
                  <td>Lacune mensuelle à financer par le capital</td>
                  <td>{euros(lacuneMensuelleExemple)}</td>
                </tr>
                <tr>
                  <td>Lacune annuelle à financer</td>
                  <td>{euros(lacuneAnnuelleExemple)}</td>
                </tr>
                <tr>
                  <td>
                    Capital cible (multiple {multipleBas} à {multipleHaut}× la lacune annuelle)
                  </td>
                  <td>
                    {euros(capitalBasExemple)} à {euros(capitalHautExemple)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Ce tableau reprend simplement, ligne par ligne, l'exemple illustratif détaillé ci-dessus
            — il ne remplace pas un calcul fait à partir de vos chiffres réels.
          </p>

          <h2 id="par-mois">Et donc, combien épargner chaque mois ?</h2>
          <p>
            Cela dépend du capital déjà constitué et du temps restant. À 45 ans avec 20 ans devant
            soi, l'effort mensuel pour atteindre un objectif donné est sans commune mesure avec le
            même objectif visé à 55 ans : le temps est votre principal allié, bien plus que la
            recherche de performance. C'est aussi pourquoi la question « quelle enveloppe ? » (PER,
            assurance-vie, PEA) vient <em>après</em> la question « quel objectif et quel effort ? »
            — jamais avant.
          </p>


          <h2 id="regle-age">Combien épargner par mois selon l'âge et la part du revenu ?</h2>
          <p>
            Voici la règle de pouce que nous utilisons pour cadrer la discussion : plus on démarre
            tard, plus la part du revenu à mettre de côté grimpe, et ce de façon non linéaire. Le
            tableau ci-dessous indique l'effort mensuel nécessaire pour financer un complément de
            revenu de {euros(EX.complementsMensuelsCibles[0])}, {euros(EX.complementsMensuelsCibles[1])}{" "}
            ou {euros(EX.complementsMensuelsCibles[2])} par mois pendant {EX.dureeRetraiteAnnees} ans
            de retraite à partir de {EX.ageDepart} ans, avec un rendement net de frais de{" "}
            {pct(rendementCentral)} par an. Il est exprimé en euros d'aujourd'hui, donc inflation
            incluse ({pct(EX.inflationAnnuelle)} par an), et la part du revenu se rapporte à un
            revenu net illustratif de {euros(EP.revenuNetMensuelIllustratif)} par mois.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Âge de départ de l'épargne</th>
                  {EX.complementsMensuelsCibles.map((c) => (
                    <th key={c}>Complément visé : {euros(c)}/mois</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grilleAges.map((g) => (
                  <tr key={g.age}>
                    <td>
                      {g.age} ans ({g.annees} ans d'épargne)
                    </td>
                    {g.parComplement.map((pc) => (
                      <td key={pc.complement}>
                        {euros(pc.central)}/mois, soit environ {partRevenu(pc.central)} % du revenu
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Le rendement change beaucoup le résultat. Pour un complément de{" "}
            {euros(complementReference)} par mois visé à partir de {grilleAges[1].age} ans, l'effort
            ressort à environ {euros(grilleAges[1].parComplement[1].haut)} par mois avec un
            rendement net hypothétique de {pct(rendementHaut)} et à environ{" "}
            {euros(grilleAges[1].parComplement[1].bas)} avec {pct(rendementBas)}. Ces hypothèses
            sont illustratives : aucun rendement n'est garanti, et un marché actions peut baisser
            durablement. À lire comme un ordre de grandeur, pas comme une prévision — et à
            confronter à vos pensions réelles, que vous pouvez estimer avec notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a>. Pour aller plus loin sur la
            logique par tranche d'âge, voyez le guide{" "}
            <a href="/guide/combien-epargner-par-mois-pour-la-retraite-selon-age">
              combien épargner par mois pour la retraite selon son âge
            </a>
            .
          </p>

          <h2 id="capital-complement">Quel complément mensuel pour quel capital ?</h2>
          <p>
            Lire la question à l'envers aide aussi : de combien de revenu mensuel un capital donné
            dispose-t-il ? Le tableau compare trois lectures du même capital constitué à l'âge de
            départ, avant impôt : la règle dite des {EX.regleRetraitAnnuel} % (un retrait annuel
            initial égal à {pct(EX.regleRetraitAnnuel)} du capital, ordre de grandeur non garanti),
            des retraits indexés sur l'inflation étalés sur {EX.dureeRetraiteAnnees} ans avec un
            rendement net de {pct(EX.rendementDecaissementNet)} pendant les retraits, et une rente
            viagère (non indexée) au taux de conversion indicatif de{" "}
            {pct(DECUMULATION.tauxConversionRente65.min)} à {pct(DECUMULATION.tauxConversionRente65.max)}.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Capital à l'âge de départ</th>
                  <th>Règle des {EX.regleRetraitAnnuel} %</th>
                  <th>Retraits indexés sur {EX.dureeRetraiteAnnees} ans</th>
                  <th>Rente viagère indicative</th>
                </tr>
              </thead>
              <tbody>
                {grilleCapital.map((g) => (
                  <tr key={g.capital}>
                    <td>{euros(g.capital)}</td>
                    <td>{euros(g.regle4)}/mois</td>
                    <td>{euros(g.duree)}/mois</td>
                    <td>
                      {euros(g.renteBas)} à {euros(g.renteHaut)}/mois
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Ces trois colonnes ne se valent pas : la rente viagère dure toute la vie mais n'est pas
            revalorisée comme les retraits indexés, et ces retraits s'arrêtent au bout de{" "}
            {EX.dureeRetraiteAnnees} ans alors que l'on peut vivre bien plus longtemps. Aucun de
            ces montants ne tient compte de la fiscalité de sortie, qui varie selon l'enveloppe. Pour
            construire un objectif de capital complet, consultez notre guide{" "}
            <a href="/guide/capital-retraite-objectif-et-construction">
              capital retraite : objectif et construction
            </a>
            .
          </p>

          <h2 id="frais-inflation">Frais et inflation : que deviennent {euros(FI.versement)} par mois sur {HORIZON} ans ?</h2>
          <p>
            Deux forces silencieuses rongent l'épargne retraite : les frais et l'inflation. Prenons{" "}
            {euros(FI.versement)} par mois pendant {HORIZON} ans ({euros(FI.verse)} versés) avec un
            rendement brut hypothétique de {pct(FI.brut)} par an. Avec des frais annuels de{" "}
            {pct(FI.etf.frais)} (type fonds indiciel), le rendement net est de {pct(FI.etf.net)} et
            le capital atteint environ {euros(FI.etf.nominal)}. Avec {pct(FI.maison.frais)} de frais
            (type fonds « maison »), le rendement net tombe à {pct(FI.maison.net)} et le capital à
            environ {euros(FI.maison.nominal)}.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Scénario (même effort, même rendement brut)</th>
                  <th>Capital en euros courants</th>
                  <th>Capital en euros d'aujourd'hui ({pct(EX.inflationAnnuelle)} d'inflation)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frais de {pct(FI.etf.frais)} par an</td>
                  <td>{euros(FI.etf.nominal)}</td>
                  <td>{euros(FI.etf.reel)}</td>
                </tr>
                <tr>
                  <td>Frais de {pct(FI.maison.frais)} par an</td>
                  <td>{euros(FI.maison.nominal)}</td>
                  <td>{euros(FI.maison.reel)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            L'écart dû aux frais atteint environ {euros(FI.ecartReel)} en euros d'aujourd'hui, pour
            exactement le même effort. Côté inflation : sur {HORIZON} ans, un complément de{" "}
            {euros(complementReference)} par mois d'aujourd'hui devra représenter environ{" "}
            {euros(FI.complementNominal)} par mois en euros courants pour conserver le même pouvoir
            d'achat ; sans revalorisation, {euros(complementReference)} ne vaudraient plus qu'environ{" "}
            {FI.pouvoirAchatPct} % de leur pouvoir d'achat actuel. Hypothèses illustratives : les
            frais réels dépendent du contrat et du support, et rien ne garantit un rendement.
          </p>

          <h2 id="ou-placer">Où placer cette épargne : PER, assurance-vie ou PEA ?</h2>
          <p>
            Une fois l'effort mensuel posé, reste la question du contenant. Le PER réduit l'impôt
            à l'entrée mais bloque l'épargne jusqu'à la retraite, avec une fiscalité à la sortie ;
            l'assurance-vie offre de la souplesse et une transmission avantageuse ; le PEA est
            ouvert aux actions européennes avec une fiscalité allégée après cinq ans. Il n'y a pas
            de meilleure enveloppe dans l'absolu, chacune répond à un besoin différent et beaucoup
            de dossiers en combinent plusieurs. Pour trancher, lisez{" "}
            <a href="/guide/meilleure-enveloppe-retraite">la meilleure enveloppe pour préparer sa retraite</a>,
            puis les comparatifs{" "}
            <a href="/guide/pea-ou-per-pour-la-retraite">PEA ou PER</a>,{" "}
            <a href="/guide/pea-ou-assurance-vie">PEA ou assurance-vie</a> et{" "}
            <a href="/guide/per-vs-assurance-vie-retraite">PER ou assurance-vie</a>. Si vous
            choisissez des fonds, le guide{" "}
            <a href="/guide/etf-ou-fonds-actifs">ETF ou fonds actifs</a> détaille l'effet des frais.
            Pour chiffrer votre cas, utilisez le <a href="/simulateur-retraite">simulateur de retraite</a>{" "}
            ou demandez un <a href="/bilan-retraite">bilan retraite</a>.
          </p>

          <h2 id="erreurs">Les erreurs qui faussent tous les calculs</h2>
          <ul>
            <li>Ignorer l'inflation : un revenu cible défini en euros d'aujourd'hui doit être revalorisé sur la durée ;</li>
            <li>Oublier la fiscalité de sortie : 300 000 € dans un PER et 300 000 € dans un PEA ne financent pas le même revenu net ;</li>
            <li>Sous-estimer la durée : planifier jusqu'à 82 ans quand on peut vivre jusqu'à 95, c'est planifier un problème ;</li>
            <li>Négliger les frais : quelques dixièmes de point par an, composés sur {HORIZON} ans, pèsent plusieurs milliers d'euros (voir le tableau ci-dessus) ;</li>
            <li>Raisonner en rendement garanti : les projections ci-dessus sont des hypothèses, et un marché actions peut décevoir longtemps, y compris juste avant le départ ;</li>
            <li>Attendre « d'avoir plus de revenus » pour commencer : retarder l'épargne coûte plus cher que de démarrer petit, comme le montre la progression du tableau selon l'âge.</li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Combien épargner par mois pour sa retraite à 30, 40 ou 50 ans ?</h3>
          <p>
            Dans nos hypothèses illustratives (complément de {euros(complementReference)} par mois,
            rendement net de {pct(rendementCentral)}), l'effort ressort à environ{" "}
            {euros(grilleAges[0].parComplement[1].central)} par mois à {grilleAges[0].age} ans,{" "}
            {euros(grilleAges[1].parComplement[1].central)} à {grilleAges[1].age} ans et{" "}
            {euros(grilleAges[2].parComplement[1].central)} à {grilleAges[2].age} ans. Ce sont des
            ordres de grandeur, pas une recommandation personnalisée : votre situation réelle
            change les montants.
          </p>
          <h3>Quelle part de son revenu faut-il mettre de côté pour la retraite ?</h3>
          <p>
            Sur un revenu net illustratif de {euros(EP.revenuNetMensuelIllustratif)} par mois,
            l'effort représente environ {partRevenu(grilleAges[0].parComplement[1].central)} % à{" "}
            {grilleAges[0].age} ans et {partRevenu(grilleAges[2].parComplement[1].central)} % à{" "}
            {grilleAges[2].age} ans pour le même complément visé. Plus on démarre tôt, plus
            la part du revenu nécessaire est faible.
          </p>
          <h3>Combien faut-il de capital pour toucher {euros(complementReference)} de plus par mois ?</h3>
          <p>
            Selon la lecture retenue, entre environ {euros(Math.round(capitalPourComplement(complementReference) / 1000) * 1000)}{" "}
            (retraits indexés sur {EX.dureeRetraiteAnnees} ans, rendement net de{" "}
            {pct(EX.rendementDecaissementNet)}) et {euros((complementReference * 12 * 100) / EX.regleRetraitAnnuel)}{" "}
            (règle des {EX.regleRetraitAnnuel} %), avant fiscalité de sortie. La fourchette est
            large car elle dépend de la durée à financer et du rendement, qui n'est jamais garanti.
          </p>
          <h3>Vaut-il mieux épargner dans un PER, une assurance-vie ou un PEA ?</h3>
          <p>
            Cela dépend de votre tranche d'imposition, de votre besoin de disponibilité et de
            votre horizon. Voir le guide{" "}
            <a href="/guide/meilleure-enveloppe-retraite">meilleure enveloppe retraite</a> et la
            comparaison <a href="/guide/pea-ou-per-pour-la-retraite">PEA ou PER</a>.
          </p>
          <h3>Comment tenir compte de l'inflation dans le calcul ?</h3>
          <p>
            Raisonnez en euros d'aujourd'hui, comme dans les tableaux de cette page : le rendement
            retenu est déflaté de l'inflation hypothétique de {pct(EX.inflationAnnuelle)} par an, ce
            qui évite de sous-estimer l'objectif. Un revenu cible exprimé en euros courants à une
            date lointaine donne une fausse impression de confort.
          </p>
          <h3>Peut-on rattraper son retard en épargnant davantage plus tard ?</h3>
          <p>
            En partie seulement : pour le même objectif, l'effort mensuel à {EX.agesActuels[2]} ans
            représente environ {(grilleAges[2].parComplement[1].central / grilleAges[0].parComplement[1].central).toLocaleString("fr-FR", { maximumFractionDigits: 1 })}{" "}
            fois celui demandé à {EX.agesActuels[0]} ans. Décaler l'âge de départ, ajuster le
            niveau de vie visé ou mobiliser un capital existant sont d'autres leviers.
          </p>
          <h3>Et si je suis fonctionnaire ?</h3>
          <p>
            La méthode reste la même, mais le calcul de la lacune change de nature : le taux de
            remplacement des fonctionnaires se calcule sur le seul traitement indiciaire des six
            derniers mois, primes exclues — ce qui crée souvent une lacune plus large qu'attendu
            pour les profils fortement primés. Notre guide{" "}
            <a href="/guide/retraite-fonctionnaires-completer">la retraite des fonctionnaires : comment la compléter</a>{" "}
            détaille ce mécanisme et les leviers propres à la fonction publique.
          </p>
          <h3>Et si je suis indépendant ou TNS ?</h3>
          <p>
            Le raisonnement lacune/capital s'applique à l'identique, mais les régimes obligatoires
            des travailleurs non salariés délivrent en général un taux de remplacement plus faible
            que celui d'un salarié à revenu équivalent, ce qui rend l'épargne complémentaire
            structurellement plus déterminante. Notre guide{" "}
            <a href="/guide/retraite-independants-per-ou-madelin">PER ou Madelin pour les indépendants</a>{" "}
            compare les enveloppes adaptées à ce statut pour combler cette lacune.
          </p>
          <h3>À partir de quel âge commencer à épargner pour la retraite ?</h3>
          <p>
            Le plus tôt possible, pour une raison arithmétique plus que psychologique : le temps
            permet de lisser les à-coups des marchés et démultiplie l'effet des intérêts composés,
            si bien qu'un effort mensuel modeste démarré tôt peut égaler un effort bien plus lourd
            démarré tard. Cela dit, « trop tôt » n'existe pas vraiment, alors que « trop tard »
            appelle simplement une méthode différente (voir question suivante).
          </p>
          <h3>Que faire si j'ai commencé à épargner trop tard ?</h3>
          <p>
            Recalculer honnêtement la lacune et le capital cible avec le temps réellement restant,
            puis ajuster les curseurs disponibles : augmenter l'effort mensuel, décaler l'âge de
            départ de quelques trimestres, revoir le niveau de vie cible à la baisse, ou mobiliser
            un capital existant (immobilier, épargne dormante) plutôt que de partir de zéro. Un
            départ tardif rend la méthode plus importante, pas moins pertinente.
          </p>
          <h3>Faut-il inclure la valeur de sa résidence principale dans le capital cible ?</h3>
          <p>
            Non, pas directement : une résidence principale que vous occupez ne génère pas de
            revenu pour combler votre lacune mensuelle, sauf à envisager un viager, une vente avec
            réemploi, ou une colocation d'une partie du bien. Elle reste un élément de patrimoine
            important, mais à traiter séparément du calcul du capital de complément de revenu.
          </p>
          <h3>Le capital cible doit-il être garanti ou peut-il rester investi en actions ?</h3>
          <p>
            Les deux approches coexistent, et le bon dosage dépend de votre horizon et de votre
            tolérance au risque : plus le départ est proche, plus la part sécurisée du capital cible
            tend logiquement à augmenter, afin de ne pas subir une baisse de marché juste avant d'en
            avoir besoin. C'est un arbitrage à revoir régulièrement, pas une décision figée une fois
            pour toutes.
          </p>
          <h3>Ce calcul suffit-il, ou faut-il aussi prévoir une épargne de précaution à part ?</h3>
          <p>
            Le capital cible calculé ici finance votre niveau de vie à la retraite ; il ne doit pas
            être confondu avec une épargne de précaution destinée aux imprévus (santé, dépendance,
            aléas familiaux), qui reste à constituer séparément et à ne pas intégrer dans le calcul
            de la lacune.
          </p>

          <div className="note">
            Piste de réflexion : le calcul complet — lacune réelle, capital cible, effort mensuel,
            répartition par enveloppe — est exactement ce que nous faisons pendant le bilan
            retraite gratuit, à partir de vos chiffres, pas de moyennes nationales.
          </div>

          <h2>En résumé</h2>
          <p>
            Il n'y a pas de chiffre magique, mais une méthode qui tient en trois questions : quel
            revenu voulez-vous, quelle lacune cela crée face à vos pensions futures, et quel capital
            cette lacune appelle. Ne pas faire ce calcul n'évite pas le problème : cela revient
            simplement à découvrir sa lacune réelle au moment du départ, quand il ne reste plus de
            levier temps pour la corriger — le coût de l'inaction se mesure justement en années
            perdues à ne pas capitaliser. Une fois l'objectif chiffré, l'étape suivante consiste à
            choisir l'enveloppe la plus adaptée pour l'atteindre, détaillée dans notre guide{" "}
            <a href="/guide/meilleure-enveloppe-retraite">quelle est la meilleure enveloppe pour préparer sa retraite</a>.
            C'est aussi précisément ce que nous reprenons, avec vos chiffres réels et non des
            moyennes nationales, lors d'un bilan retraite gratuit.
          </p>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="Votre lacune, vos chiffres, votre plan : calculons-les ensemble." />
    </>
  );
}
