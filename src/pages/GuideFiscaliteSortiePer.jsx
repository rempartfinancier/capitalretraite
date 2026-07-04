import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { FISCALITE, HYPOTHESES_MAJ, euros, pct } from "../components/hypotheses.js";

// Exemple illustratif de fractionnement : un même capital de versements déduits,
// retiré en une fois (dernière tranche du barème atteinte) ou fractionné sur
// plusieurs années (chaque tranche reste dans une tranche plus basse). Les taux
// utilisés sont ceux du barème IR listés dans FISCALITE.tmiOptions — aucun seuil
// de revenu "magique" n'est fixé, seul le mécanisme de progressivité est illustré.
const tmiBasse = FISCALITE.tmiOptions[1]; // tranche à 11 %
const tmiHaute = FISCALITE.tmiOptions[3]; // tranche à 41 %
const capitalIllustratif = 60000; // capital de versements déduits, purement illustratif
const impotUneFois = (capitalIllustratif * tmiHaute) / 100;
const impotFractionne = (capitalIllustratif * tmiBasse) / 100;
const ecartIllustratif = impotUneFois - impotFractionne;

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
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> si vous avez déduit vos versements PER à l'entrée, la
              sortie en capital est imposée en deux blocs — les versements au barème progressif de
              l'impôt sur le revenu, les gains au prélèvement forfaitaire unique — tandis que la
              rente est imposée selon le régime des rentes viagères à titre gratuit, avec
              abattement et prélèvements sociaux sur une fraction dépendant de l'âge. Un retrait en
              capital massif en une seule année peut faire grimper votre revenu imposable dans une
              tranche supérieure du barème ; fractionner ce même retrait sur plusieurs années lisse
              cet effet, souvent pour un gain net de plusieurs milliers d'euros, sans aucun produit
              financier supplémentaire.
            </p>
          </div>

          <h2>Comment est imposée la sortie en capital d'un PER ?</h2>
          <p>
            Si vous avez déduit vos versements à l'entrée (le cas général), l'administration se
            rattrape à la sortie. La règle se mémorise ainsi : ce qui a été déduit sera imposé, ce
            qui n'a pas été déduit ne le sera pas deux fois. Toute la stratégie de sortie consiste
            à choisir <em>quand</em> et <em>comment</em> cet impôt reporté sera payé. Le barème
            progressif de l'impôt sur le revenu applicable à la part des versements déduits est
            publié chaque année par l'administration fiscale — vous pouvez consulter les tranches
            en vigueur sur{" "}
            <a
              href="https://www.impots.gouv.fr/particulier/questions/comment-sont-determinees-mes-tranches-dimposition"
              target="_blank"
              rel="noopener noreferrer"
            >
              impots.gouv.fr
            </a>{" "}
            ou sur{" "}
            <a
              href="https://www.service-public.fr/particuliers/vosdroits/F1419"
              target="_blank"
              rel="noopener noreferrer"
            >
              service-public.fr
            </a>
            .
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

          <h2>Sortir en une fois ou fractionner : quelle différence sur l'impôt ?</h2>
          <p>
            La parade est connue : fractionner la sortie en capital sur plusieurs années, pour que
            chaque tranche de retrait reste dans une zone de barème raisonnable. Étaler un même
            capital sur cinq ou huit exercices fiscaux, plutôt qu'un seul, change matériellement le
            résultat net — sans aucun produit supplémentaire, juste du calendrier.
          </p>
          <div className="note">
            Avertissement : l'exemple ci-dessous est purement illustratif. Il ne décrit ni votre
            situation ni un cas réel documenté ; il sert uniquement à montrer le mécanisme de la
            progressivité de l'impôt sur le revenu. Les tranches utilisées sont celles du barème IR
            en vigueur (source : {" "}
            <a
              href="https://www.impots.gouv.fr/particulier/questions/comment-sont-determinees-mes-tranches-dimposition"
              target="_blank"
              rel="noopener noreferrer"
            >
              impots.gouv.fr
            </a>
            ), barème en vigueur en {HYPOTHESES_MAJ}, sans préjuger de votre tranche marginale
            réelle, qui dépend de l'ensemble de vos revenus et de votre foyer fiscal.
          </div>
          <p>
            Prenons un capital de versements déduits de {euros(capitalIllustratif)}, retiré en une
            seule fois. Si ce retrait pousse l'intégralité de la somme dans une tranche à{" "}
            {pct(tmiHaute)}, l'impôt sur le revenu dû sur cette part atteint{" "}
            <strong>{euros(impotUneFois)}</strong>. Le même capital, fractionné sur plusieurs
            années de façon à rester dans une tranche à {pct(tmiBasse)}, générerait un impôt total
            de l'ordre de <strong>{euros(impotFractionne)}</strong> — un écart illustratif de{" "}
            <strong>{euros(ecartIllustratif)}</strong>. Ce n'est pas une promesse de gain : c'est
            une démonstration de mécanisme. Le résultat réel dépend de vos autres revenus l'année du
            retrait, du nombre d'années sur lesquelles vous fractionnez, et de l'évolution du
            barème — à faire vérifier au cas par cas plutôt qu'à extrapoler tel quel.
          </p>

          <h2>Capital ou rente : quel régime fiscal pour la sortie en rente du PER ?</h2>
          <p>
            La rente issue d'un PER à versements déduits est imposée selon le régime des rentes
            viagères à titre gratuit : elle entre au barème de l'impôt sur le revenu après un
            abattement, et supporte des prélèvements sociaux sur une fraction dépendant de l'âge.
            La rente échange donc de la fiscalité et du capital transmissible contre une sécurité :
            un revenu garanti à vie. Ce n'est ni mieux ni moins bien que le capital — c'est un
            autre contrat avec l'avenir.
          </p>

          <h2>Quand sortir son PER pour payer le moins d'impôt possible ?</h2>
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

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Le PER est-il vraiment intéressant si on est imposé à la sortie ?</h3>
          <p>
            Oui dans la plupart des cas, car l'intérêt du PER ne repose pas sur une exonération à
            la sortie mais sur un décalage dans le temps : vous déduisez au moment où votre tranche
            d'imposition est généralement la plus haute (en activité) et vous êtes imposé au moment
            où elle est souvent plus basse (à la retraite). L'écart entre ces deux tranches, plus
            que l'imposition elle-même, détermine le gain net de l'opération — à vérifier au cas
            par cas plutôt qu'à présumer.
          </p>
          <h3>Peut-on éviter complètement l'impôt à la sortie du PER ?</h3>
          <p>
            Pas sur la part correspondant aux versements que vous avez déduits : cette part a
            vocation à être imposée un jour, c'est la contrepartie de l'avantage obtenu à l'entrée.
            En revanche, les versements que vous avez choisi de ne pas déduire à l'entrée (une
            option possible sur le PER) ressortent sans impôt sur le revenu, seuls les gains
            restant soumis au prélèvement forfaitaire unique.
          </p>
          <h3>Faut-il sortir en capital ou en rente ?</h3>
          <p>
            Il n'y a pas de réponse universelle : le capital offre de la souplesse et laisse un
            solde transmissible, la rente offre un revenu garanti à vie mais fige le choix une fois
            liquidée. La bonne réponse dépend de votre espérance de vie estimée, de vos autres
            sources de revenus à la retraite, et de votre tolérance à ne plus disposer du capital.
            Un mix des deux est également possible sur la plupart des contrats.
          </p>
          <h3>Peut-on changer d'avis après avoir choisi la sortie en rente ?</h3>
          <p>
            Non : la conversion en rente viagère est en principe irréversible une fois liquidée,
            contrairement à un retrait en capital qui peut être partiel et étalé selon votre
            calendrier. C'est l'une des raisons pour lesquelles ce choix mérite d'être posé bien
            avant l'échéance, plutôt que tranché dans la précipitation au moment du départ.
          </p>
          <h3>Le fractionnement du capital a-t-il un coût ou des contraintes pratiques ?</h3>
          <p>
            Le fractionnement lui-même n'a pas de coût direct, mais il suppose de laisser le solde
            non retiré investi sur le contrat, donc exposé aux mêmes aléas de marché que pendant la
            phase d'épargne si les supports ne sont pas sécurisés à l'approche des retraits. Il
            demande aussi une discipline de suivi année après année, ce qui est plus simple à tenir
            avec un accompagnement qu'en autonomie totale.
          </p>
          <h3>Les prélèvements sociaux s'appliquent-ils à la part des versements déduits ?</h3>
          <p>
            Non : la part correspondant aux versements déduits est imposée au seul barème
            progressif de l'impôt sur le revenu, sans prélèvements sociaux. Ce sont les gains
            (plus-values et intérêts accumulés) qui supportent à la fois l'impôt et les
            prélèvements sociaux, dans le cadre du prélèvement forfaitaire unique.
          </p>
          <h3>Que se passe-t-il si je sors mon PER l'année où je pars aussi en retraite ?</h3>
          <p>
            Cette année-là mêle souvent un dernier salaire (ou une prime de départ) et un premier
            trimestre de pension, ce qui peut déjà pousser votre revenu imposable vers le haut. Y
            superposer un retrait massif de PER la même année cumule les deux effets. C'est
            précisément le type de situation où décaler ou fractionner le retrait sur l'année
            suivante, une fois les revenus stabilisés, change souvent le résultat net.
          </p>

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
