import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";

export default function GuideFiscaliteSortiePer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide — technique, mais pédagogique</span>
          <h1>Fiscalité de sortie du PER : capital ou rente ?</h1>
          <p className="sub">
            La déduction à l'entrée fait signer beaucoup de PER. La fiscalité de sortie, elle, se
            découvre souvent trop tard. Remettons les choses dans l'ordre.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Le principe : un impôt reporté, pas effacé</h2>
          <p>
            Si vous avez déduit vos versements à l'entrée (le cas général), l'administration se
            rattrape à la sortie. La règle se mémorise ainsi : ce qui a été déduit sera imposé, ce
            qui n'a pas été déduit ne le sera pas deux fois. Toute la stratégie de sortie consiste
            à choisir <em>quand</em> et <em>comment</em> cet impôt reporté sera payé.
          </p>

          <h2>La sortie en capital, poste par poste</h2>
          <p>Un retrait en capital se décompose en deux parts, taxées différemment :</p>
          <ul>
            <li>
              <strong>La part correspondant aux versements déduits</strong> : imposée au barème
              progressif de l'impôt sur le revenu (sans prélèvements sociaux) ;
            </li>
            <li>
              <strong>La part correspondant aux gains</strong> : soumise au prélèvement forfaitaire
              unique (impôt + prélèvements sociaux).
            </li>
          </ul>
          <p>
            Conséquence directe : un retrait massif en une seule année gonfle votre revenu
            imposable et peut vous faire changer de tranche — l'avantage fiscal capté à 41 % peut
            alors être partiellement repris à 41 %… voire davantage si le retrait vous fait
            franchir un seuil.
          </p>

          <h2>Le fractionnement : l'outil le plus simple et le plus négligé</h2>
          <p>
            La parade est connue : fractionner la sortie en capital sur plusieurs années, pour que
            chaque tranche de retrait reste dans une zone de barème raisonnable. Étaler un même
            capital sur cinq ou huit exercices fiscaux, plutôt qu'un seul, change matériellement le
            résultat net — sans aucun produit supplémentaire, juste du calendrier.
          </p>

          <h2>La sortie en rente : un autre régime</h2>
          <p>
            La rente issue d'un PER à versements déduits est imposée selon le régime des rentes
            viagères à titre gratuit : elle entre au barème de l'impôt sur le revenu après un
            abattement, et supporte des prélèvements sociaux sur une fraction dépendant de l'âge.
            La rente échange donc de la fiscalité et du capital transmissible contre une sécurité :
            un revenu garanti à vie. Ce n'est ni mieux ni moins bien que le capital — c'est un
            autre contrat avec l'avenir.
          </p>

          <h2>Les leviers de timing à examiner avant de sortir</h2>
          <ul>
            <li>
              <strong>L'année de départ en retraite</strong> : vos revenus chutent souvent en cours
              d'année — parfois la pire année pour ajouter un gros retrait, parfois la meilleure
              pour commencer un fractionnement ;
            </li>
            <li>
              <strong>La coordination avec les autres enveloppes</strong> : utiliser d'abord
              l'abattement de l'assurance-vie ou les retraits de PEA peut laisser le PER se
              fractionner tranquillement ;
            </li>
            <li>
              <strong>Les années à revenus exceptionnels</strong> (prime de départ, vente d'un
              bien) : y superposer un retrait de PER est rarement une bonne idée ;
            </li>
            <li>
              <strong>La situation du foyer</strong> : mariage, décès, départ d'un enfant du foyer
              fiscal modifient le barème applicable.
            </li>
          </ul>

          <h2>Ce qu'il faut retenir</h2>
          <p>
            La fiscalité de sortie du PER ne se subit pas, elle se pilote. Entre une sortie
            improvisée et une sortie planifiée — fractionnée, coordonnée avec vos autres
            enveloppes, calée sur vos années de faible revenu — l'écart se chiffre souvent en
            milliers d'euros. Et ce pilotage se décide idéalement plusieurs années avant le départ.
          </p>

          <div className="note">
            Piste de réflexion : avant tout retrait, faites tourner le calcul sur au moins trois
            scénarios (tout en capital une année, fractionné, mixte capital-rente). C'est un
            exercice que nous menons systématiquement en rendez-vous.
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="Votre PER approche de la sortie ? Planifions-la avant qu'elle ne s'improvise." button="Prendre rendez-vous" />
    </>
  );
}
