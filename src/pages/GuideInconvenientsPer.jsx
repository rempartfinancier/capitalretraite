import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { FISCALITE, HYPOTHESES_MAJ, pct } from "../components/hypotheses.js";

export default function GuideInconvenientsPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide risques</span>
          <h1>Les inconvénients du PER qu'on ne vous dit pas toujours</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le PER (plan d'épargne retraite) est un bon outil pour
              qui coche les bonnes cases — mais il a trois défauts structurels qu'un discours
              commercial centré sur l'avantage fiscal à l'entrée mentionne rarement en détail :
              l'épargne est bloquée jusqu'à la retraite (sauf cas de déblocage limités), l'avantage
              fiscal à l'entrée n'est qu'un report d'impôt dont le montant réel à la sortie dépend
              de règles fixées aujourd'hui pour une échéance dans 15, 20 ou 30 ans, et une déduction
              mal calibrée peut se retourner contre vous si votre tranche marginale d'imposition
              baisse moins que prévu à la retraite. Aucun de ces points ne rend le PER mauvais — ils
              rendent simplement indispensable de les regarder avant de signer, pas après.
            </p>
          </div>

          <p>
            Le PER est presque toujours présenté par son avantage le plus visible : chaque
            versement se déduit du revenu imposable, dans la limite d'un plafond annuel. C'est réel,
            et pour un contribuable fortement imposé, l'économie d'impôt immédiate peut être
            substantielle. Mais un avantage fiscal à l'entrée n'est jamais un cadeau définitif : c'est
            un report, avec des conditions de sortie qui ont leur propre mécanique, leurs propres
            contraintes, et leurs propres zones d'incertitude. Cet article ne dit pas que le PER est
            un mauvais produit — nos guides{" "}
            <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER</a> et{" "}
            <a href="/guide/quel-est-le-meilleur-per">quel est le meilleur PER</a> détaillent quand
            il est pertinent. Il liste, sans filtre commercial, ce qu'il faut avoir en tête avant de
            verser un euro.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#blocage">1. L'argent est bloqué jusqu'à la retraite</a></li>
              <li><a href="#report">2. L'avantage fiscal n'est qu'un report, pas un gain garanti</a></li>
              <li><a href="#tmi">3. Le pari sur la baisse de la tranche marginale peut échouer</a></li>
              <li><a href="#fiscalite-future">4. La fiscalité de sortie n'est pas figée pour les 20 prochaines années</a></li>
              <li><a href="#frais">5. Des frais qui s'ajoutent à ceux de tout support financier</a></li>
              <li><a href="#rigidite">6. Une rigidité de gestion, surtout en PER d'entreprise</a></li>
              <li><a href="#pas-mauvais">Ce que cette liste ne veut pas dire</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#checklist">Check-list avant d'ouvrir ou d'alimenter un PER</a></li>
            </ol>
          </div>

          <h2 id="blocage">1. L'argent est bloqué jusqu'à la retraite</h2>
          <p>
            C'est le point le plus structurant, et souvent le moins mis en avant : sauf cas de
            déblocage anticipé strictement encadrés par la loi (achat de la résidence principale,
            invalidité du titulaire ou d'un proche, décès du conjoint ou partenaire de PACS,
            surendettement, expiration des droits au chômage, cessation d'activité non salariée à la
            suite d'une liquidation judiciaire), l'épargne versée sur un PER n'est disponible qu'au
            moment du départ à la retraite. Contrairement à une assurance-vie ou un PEA, il n'existe
            pas de rachat libre « pour un imprévu » qui ne rentre pas dans ces cas légaux.
          </p>
          <p>
            Concrètement, cela signifie qu'un versement PER doit être une épargne dont vous êtes
            certain de ne pas avoir besoin avant la liquidation de vos droits à la retraite —
            potentiellement dans 15, 20 ou 30 ans selon votre âge. Pour une épargne de précaution,
            un projet dont la date n'est pas encore fixée, ou simplement une réserve de sécurité, le
            PER est le mauvais outil : mieux vaut une assurance-vie, disponible à tout moment moyennant
            fiscalité, ou un livret. Ce point est d'autant plus important qu'un versement PER n'est
            pas réversible : une fois déduit fiscalement, il ne peut pas être « annulé » si votre
            situation change l'année suivante.
          </p>

          <h2 id="report">2. L'avantage fiscal n'est qu'un report, pas un gain garanti</h2>
          <p>
            Un versement PER déduit du revenu imposable ne fait pas disparaître l'impôt : il le
            déplace dans le temps. À la sortie, le capital correspondant aux versements déduits est
            réintégré au revenu imposable (au barème progressif de l'impôt sur le revenu s'il sort en
            capital, ou soumis à un régime spécifique de rente), tandis que les plus-values générées
            supportent les prélèvements sociaux. Notre guide{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a> détaille ce
            mécanisme poste par poste.
          </p>
          <p>
            Ce report n'est avantageux que dans une configuration précise : une tranche marginale
            d'imposition (TMI) plus élevée au moment du versement qu'au moment de la sortie. Si cette
            hypothèse ne se vérifie pas — parce que vos revenus à la retraite restent élevés (pensions
            de cadre supérieur, revenus fonciers, autres rentes), ou parce que vous sortez tout le
            capital d'un coup et faites mécaniquement grimper votre TMI l'année de la sortie — le
            gain fiscal peut s'avérer beaucoup plus faible qu'espéré, voire nul.
          </p>

          <h2 id="tmi">3. Le pari sur la baisse de la tranche marginale peut échouer</h2>
          <p>
            C'est la nuance la plus sous-estimée du PER. Verser au taux marginal de{" "}
            {FISCALITE.tmiOptions[FISCALITE.tmiOptions.length - 1]} % pour ressortir, des années plus
            tard, à un taux de {FISCALITE.tmiOptions[1]} % ou {FISCALITE.tmiOptions[2]} % est une
            excellente opération. Mais rien ne garantit ce scénario : les barèmes de l'impôt sur le
            revenu évoluent d'ici la retraite, votre pension peut être plus élevée que prévu (carrière
            ascendante, cumul emploi-retraite, autres revenus), et sortir tout le capital en une seule
            fois plutôt qu'en fractionné peut, à elle seule, faire remonter la tranche applicable
            l'année de la sortie au même niveau qu'à l'entrée.
          </p>
          <p>
            La bonne pratique — que peu de souscripteurs anticipent au moment de l'ouverture — consiste
            à fractionner la sortie sur plusieurs années plutôt que de tout retirer en une fois, et à
            simuler sa TMI probable à la retraite avant de calibrer le montant des versements, pas
            après. Notre guide sur{" "}
            <a href="/guide/a-quel-age-commencer-per">à quel âge commencer un PER</a> revient sur cet
            arbitrage lié à l'âge et à la trajectoire de revenus.
          </p>

          <h2 id="fiscalite-future">4. La fiscalité de sortie n'est pas figée pour les 20 prochaines années</h2>
          <p>
            Un PER ouvert à 40 ans se dénoue en général autour de 62 à 67 ans — soit un horizon de
            deux à trois décennies pendant lequel les règles fiscales et sociales peuvent changer
            plusieurs fois. Un exemple récent et concret : la LFSS 2026 a relevé le taux des
            prélèvements sociaux applicable au PER de 17,2 % à {pct(FISCALITE.prelevementsSociaux.per)}{" "}
            au 1er janvier 2026 (barème {HYPOTHESES_MAJ}, à vérifier), tout en excluant l'assurance-vie
            de cette hausse. Ce type d'ajustement, mineur pris isolément, illustre un principe plus
            large : les règles en vigueur à l'ouverture d'un PER ne sont jamais une garantie contractuelle
            de ce qui s'appliquera à la sortie, plusieurs décennies plus tard.
          </p>
          <p>
            Ce n'est pas une raison pour renoncer au PER — aucune enveloppe d'épargne à si long terme
            n'échappe à ce risque réglementaire, y compris l'assurance-vie ou le PEA. C'est en revanche
            une raison de ne jamais construire une stratégie retraite reposant sur un seul chiffre
            projeté à 20 ans, et de diversifier les enveloppes plutôt que de tout miser sur le PER
            seul. Notre guide{" "}
            <a href="/guide/meilleure-enveloppe-retraite">quelle est la meilleure enveloppe retraite</a>{" "}
            développe cette logique de diversification.
          </p>

          <h2 id="frais">5. Des frais qui s'ajoutent à ceux de tout support financier</h2>
          <p>
            Le PER n'échappe à aucune des couches de frais qui existent sur une assurance-vie :
            frais de gestion annuels du contrat, frais des supports sous-jacents, éventuel surcoût de
            gestion pilotée. Sur un contrat bancaire traditionnel, ces frais cumulés peuvent réduire
            sensiblement le bénéfice de l'avantage fiscal à l'entrée sur la durée. Notre guide{" "}
            <a href="/guide/combien-coute-un-per">combien coûte un PER</a> détaille la grille poste
            par poste ; le point à retenir ici est que l'avantage fiscal ne compense jamais, à lui
            seul, des frais de gestion élevés maintenus pendant 20 ou 30 ans.
          </p>
          <p>
            Un piège fréquent, propre au PER : la gestion pilotée par défaut à l'horizon (une
            allocation qui sécurise progressivement l'épargne à mesure que la retraite approche) a un
            coût, et sécurise parfois trop tôt pour un profil qui pourrait supporter davantage de
            risque. Notre guide{" "}
            <a href="/guide/gestion-pilotee-ou-gestion-libre">gestion pilotée ou gestion libre</a>{" "}
            explique comment vérifier ce réglage plutôt que de le subir.
          </p>

          <h2 id="rigidite">6. Une rigidité de gestion, surtout en PER d'entreprise</h2>
          <p>
            Un PER individuel ouvert auprès d'un assureur ou d'un courtier en ligne offre un choix de
            supports comparable à une assurance-vie. Un PER d'entreprise (collectif ou obligatoire),
            lui, impose souvent une gamme de supports plus restreinte, choisie par l'employeur et son
            gestionnaire, avec une gestion pilotée par défaut peu modifiable. Un salarié qui change
            d'employeur peut transférer son PER d'entreprise vers un PER individuel, mais ce transfert
            a ses propres conditions et frais à vérifier — un sujet que nous traitons en détail dans
            notre guide sur{" "}
            <a href="/guide/pee-percol-retraite">l'épargne salariale (PEE, PERCOL) pour la retraite</a>.
          </p>

          <h2 id="pas-mauvais">Ce que cette liste ne veut pas dire</h2>
          <p>
            Aucun de ces six points ne signifie que le PER est un mauvais produit. Pour un
            contribuable fortement imposé, avec une visibilité raisonnable sur une baisse de TMI à la
            retraite, et une épargne dont il n'a structurellement pas besoin avant cette échéance, le
            PER reste l'un des outils les plus efficaces pour se constituer un capital retraite. Le
            problème n'est jamais le produit lui-même : c'est de le choisir sans avoir mesuré ces six
            points, ou de laisser un discours commercial centré sur la seule économie d'impôt de
            l'année en cours occulter ce qui se joue vingt ans plus tard.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on récupérer l'argent d'un PER avant la retraite en cas de besoin urgent ?</h3>
          <p>
            Uniquement dans les cas de déblocage anticipé prévus par la loi (résidence principale,
            invalidité, décès du conjoint, surendettement, fin de droits au chômage, liquidation
            judiciaire pour un indépendant). En dehors de ces cas, l'épargne reste bloquée jusqu'à la
            retraite.
          </p>
          <h3>L'avantage fiscal du PER est-il toujours annulé à la sortie ?</h3>
          <p>
            Non, pas annulé : reporté et recalculé selon votre situation à la sortie. Il reste
            avantageux si votre tranche marginale d'imposition est plus basse à la retraite qu'au
            moment des versements — ce qui est fréquent, mais pas garanti pour tous les profils.
          </p>
          <h3>Faut-il éviter le PER si on n'est pas sûr de sa TMI future ?</h3>
          <p>
            Pas nécessairement, mais cela justifie de ne pas y concentrer toute son épargne retraite,
            de fractionner les versements dans le temps, et de prévoir une sortie fractionnée plutôt
            qu'un retrait unique du capital pour limiter le risque de remontée de tranche l'année de
            la sortie.
          </p>
          <h3>Les frais d'un PER sont-ils plus élevés que ceux d'une assurance-vie ?</h3>
          <p>
            Pas structurellement : la structure de frais dépend du distributeur (banque, courtier en
            ligne), pas de la nature PER ou assurance-vie du contrat. Voir notre guide{" "}
            <a href="/guide/combien-coute-un-per">combien coûte un PER</a> pour le détail par poste.
          </p>
          <h3>Un PER d'entreprise a-t-il les mêmes inconvénients qu'un PER individuel ?</h3>
          <p>
            Le blocage et le mécanisme de report fiscal sont identiques. La différence porte sur le
            choix des supports, souvent plus restreint et imposé par l'employeur sur un PER
            d'entreprise, avec une gestion pilotée par défaut moins modifiable que sur un contrat
            individuel choisi librement.
          </p>

          <h2 id="checklist">Check-list avant d'ouvrir ou d'alimenter un PER</h2>
          <ol>
            <li>
              <strong>Vérifiez que cette épargne ne vous sera pas nécessaire avant la retraite.</strong>{" "}
              Si un doute existe, privilégiez une assurance-vie, disponible à tout moment.
            </li>
            <li>
              <strong>Estimez votre TMI probable à la retraite</strong>, pas seulement votre TMI
              actuelle, avant de calibrer le montant du versement.
            </li>
            <li>
              <strong>Vérifiez les frais du contrat</strong> — gestion annuelle, frais des supports,
              surcoût de gestion pilotée — plutôt que de vous arrêter à l'économie d'impôt affichée.
            </li>
            <li>
              <strong>Anticipez une sortie fractionnée</strong> plutôt qu'un retrait unique du capital,
              pour limiter le risque de remontée de tranche marginale l'année de la sortie.
            </li>
            <li>
              <strong>Diversifiez</strong> : le PER n'a pas vocation à être la seule enveloppe de votre
              stratégie retraite.
            </li>
          </ol>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil fiscal ou en investissement
              personnalisé : votre situation (TMI actuelle et future probable, autres enveloppes déjà
              détenues, horizon jusqu'à la retraite) doit être étudiée au cas par cas. Les barèmes
              fiscaux et sociaux cités sont ceux en vigueur en {HYPOTHESES_MAJ}, susceptibles d'évoluer
              à chaque loi de finances. Pour aller plus loin, nos guides{" "}
              <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER</a> et{" "}
              <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a> complètent cette
              analyse.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Avant d'ouvrir ou d'alimenter un PER, faisons le point sur votre situation"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
