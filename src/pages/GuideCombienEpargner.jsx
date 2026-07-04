import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { DECUMULATION, euros, pct } from "../components/hypotheses.js";

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

export default function GuideCombienEpargner() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide — la question n°1</span>
          <h1>Combien faut-il vraiment épargner pour la retraite ?</h1>
          <p className="sub">
            Tout le monde pose cette question. Presque personne n'y répond honnêtement — parce que
            la réponse honnête commence par « ça dépend », puis donne quand même des ordres de grandeur.
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

          <h2>Pourquoi il n'existe pas de chiffre magique</h2>
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

          <h2>La méthode en trois questions</h2>
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

          <h2>Et donc, combien épargner chaque mois ?</h2>
          <p>
            Cela dépend du capital déjà constitué et du temps restant. À 45 ans avec 20 ans devant
            soi, l'effort mensuel pour atteindre un objectif donné est sans commune mesure avec le
            même objectif visé à 55 ans : le temps est votre principal allié, bien plus que la
            recherche de performance. C'est aussi pourquoi la question « quelle enveloppe ? » (PER,
            assurance-vie, PEA) vient <em>après</em> la question « quel objectif et quel effort ? »
            — jamais avant.
          </p>

          <h2>Les trois erreurs qui faussent tous les calculs</h2>
          <ul>
            <li>Ignorer l'inflation : un revenu cible défini en euros d'aujourd'hui doit être revalorisé sur la durée ;</li>
            <li>Oublier la fiscalité de sortie : 300 000 € dans un PER et 300 000 € dans un PEA ne financent pas le même revenu net ;</li>
            <li>Sous-estimer la durée : planifier jusqu'à 82 ans quand on peut vivre jusqu'à 95, c'est planifier un problème.</li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>
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
