import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";

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
            épargne doit combler.
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
            que votre capital devra financer. Exemple purement illustratif : viser 4 000 € par mois
            avec 2 800 € de pensions estimées crée une lacune de 1 200 € par mois, soit 14 400 €
            par an.
          </p>
          <h3>3. Quel capital faut-il pour financer cette lacune ?</h3>
          <p>
            Ordre de grandeur usuel en conseil patrimonial : pour financer durablement un revenu
            annuel donné sur une retraite complète, il faut un capital représentant grosso modo
            20 à 30 fois ce revenu annuel, selon l'âge de départ, la part sécurisée du patrimoine
            et l'hypothèse de rendement — que nous ne fixerons pas ici, car elle n'est jamais
            garantie. Dans notre exemple illustratif, la lacune de 14 400 € par an appellerait donc
            un capital de l'ordre de 300 000 à 430 000 €. Ce n'est pas une promesse : c'est un
            cadre de raisonnement, à affiner avec vos données réelles.
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

          <div className="note">
            Piste de réflexion : le calcul complet — lacune réelle, capital cible, effort mensuel,
            répartition par enveloppe — est exactement ce que nous faisons pendant le bilan
            retraite gratuit, à partir de vos chiffres, pas de moyennes nationales.
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="Votre lacune, vos chiffres, votre plan : calculons-les ensemble." />
    </>
  );
}
