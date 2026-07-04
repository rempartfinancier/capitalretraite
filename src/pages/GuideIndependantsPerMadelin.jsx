import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { RENDEMENTS, FRAIS_TYPES, pct } from "../components/hypotheses.js";

export default function GuideIndependantsPerMadelin() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Profils spécifiques</span>
          <h1>Retraite des indépendants : PER individuel ou contrat Madelin ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> depuis la loi PACTE (2019), le PER individuel (plan
              d'épargne retraite) a largement remplacé le contrat Madelin pour les nouvelles
              souscriptions, car il offre plus de souplesse à la sortie — un capital est possible,
              pas seulement une rente viagère. Les contrats Madelin déjà ouverts restent valables :
              rien n'oblige à les fermer, et ils peuvent être conservés ou transférés vers un PER
              selon la situation. La vraie question n'est donc pas « lequel est le meilleur produit
              dans l'absolu », mais « ouvrez-vous un nouveau contrat, ou gérez-vous un Madelin déjà
              existant ? » — les deux réponses divergent.
            </p>
          </div>
          <p>
            Vous êtes indépendant, en profession libérale, artisan, commerçant, ou gérant
            majoritaire de société — et un point revient sans cesse dans vos échanges avec votre
            expert-comptable ou votre entourage professionnel : votre pension de retraite future
            sera nettement plus faible que celle d'un salarié à revenu comparable. Vous avez
            entendu parler du contrat Madelin, que votre prédécesseur ou votre associé plus âgé
            détient peut-être encore, et du PER, dont tout le monde parle depuis quelques années
            sans que la différence entre les deux soit toujours claire.
          </p>
          <p>
            Prenons une situation composite et illustrative, sans lien avec un cas réel : un
            consultant indépendant en profession libérale, la quarantaine, qui a ouvert un contrat
            Madelin au début de son activité sur les conseils de son assureur, et qui se demande
            aujourd'hui s'il doit continuer à y verser, en ouvrir un second à côté, ou tout
            transférer vers un PER individuel qu'il vient de découvrir. C'est une question que se
            posent des milliers d'indépendants chaque année, souvent au moment d'un changement de
            statut, d'un pic de revenu, ou simplement d'un rendez-vous chez l'expert-comptable qui
            évoque « la loi PACTE » sans plus de détail.
          </p>
          <p>
            Le contrat Madelin (du nom de la loi de 1994 qui l'a créé) est un produit d'épargne
            retraite réservé aux travailleurs non-salariés (TNS), permettant de déduire les
            cotisations du revenu professionnel imposable en contrepartie d'une épargne bloquée
            jusqu'à la retraite. Le PER individuel (créé par la loi PACTE de 2019, entré en vigueur
            en 2019-2020) reprend le même principe de déduction fiscale à l'entrée, mais avec des
            règles de sortie et de transfert plus souples. Cet article détaille ce qui distingue
            réellement les deux enveloppes, ce qu'il advient d'un Madelin ancien, et comment
            raisonner le plafond de déduction propre aux indépendants — sans magie ni promesse de
            performance, mais avec la mécanique complète.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#pourquoi">Pourquoi un indépendant a-t-il besoin d'une épargne retraite dédiée ?</a></li>
              <li><a href="#madelin">Le contrat Madelin : ce qu'il reste après la loi PACTE</a></li>
              <li><a href="#per-tns">Le PER individuel pour un indépendant : ce qui a changé</a></li>
              <li><a href="#comparatif">Madelin ou PER : le tableau comparatif</a></li>
              <li><a href="#transfert">Faut-il transférer un ancien contrat Madelin vers un PER ?</a></li>
              <li><a href="#plafond">Quel plafond de déduction fiscale pour un indépendant ?</a></li>
              <li><a href="#gerant-majoritaire">Le cas du gérant majoritaire assimilé TNS</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="pourquoi">Pourquoi un indépendant a-t-il besoin d'une épargne retraite dédiée ?</h2>
          <p>
            Un salarié cumule, sans y penser, plusieurs strates de retraite : le régime de base, un
            régime complémentaire obligatoire (Agirc-Arrco), et souvent un dispositif d'épargne
            retraite d'entreprise (PER collectif ou ancien Perco) alimenté en partie par
            l'employeur, parfois complété par un abondement. L'indépendant, lui, cotise sur une
            assiette généralement plus étroite, à des taux et des plafonds différents selon son
            régime d'affiliation (Sécurité sociale des indépendants pour les artisans-commerçants,
            caisses spécifiques pour certaines professions libérales), et surtout sans aucun
            « troisième étage » automatique : personne ne verse un abondement à sa place.
          </p>
          <p>
            S'ajoute une seconde réalité, propre à l'activité indépendante : des revenus
            professionnels souvent variables d'une année sur l'autre, ce qui complique la
            projection de la pension future et rend d'autant plus utile un outil d'épargne que l'on
            peut moduler — verser davantage une bonne année, réduire ou suspendre les versements
            une année plus difficile. Le régime de base des indépendants suit des règles de calcul
            proches de celles du régime général (trimestres requis, mécanique de
            surcote/décote) ; pour comprendre cette mécanique en détail, notre guide sur la{" "}
            <a href="/guide/surcote-decote-retraite">surcote et la décote à la retraite</a> reste
            valable, avec les spécificités de caisse à vérifier au cas par cas.
          </p>
          <p>
            C'est cette absence de filet automatique qui explique pourquoi le législateur a créé,
            dès 1994, un dispositif fiscal dédié aux indépendants : le contrat Madelin. L'idée de
            fond n'a pas changé depuis : encourager l'épargne retraite volontaire des TNS en
            échange d'une déduction fiscale, exactement comme un salarié bénéficie indirectement
            des cotisations patronales versées sans figurer sur son revenu imposable.
          </p>

          <h2 id="madelin">Le contrat Madelin : ce qu'il reste après la loi PACTE</h2>
          <p>
            Le contrat Madelin fonctionne sur un principe simple : chaque année, l'indépendant
            verse des cotisations (souvent avec un engagement de régularité, contractuel à
            l'origine), déductibles de son revenu professionnel imposable dans la limite d'un
            plafond propre au statut TNS (voir plus bas). En contrepartie de cet avantage fiscal à
            l'entrée, deux contraintes structurent le produit.
          </p>
          <p>
            La première est la rigidité de sortie : un contrat Madelin classique ne se dénoue, à la
            retraite, qu'en rente viagère (un revenu régulier versé jusqu'au décès du souscripteur,
            calculé à partir du capital constitué et d'un taux de conversion qui dépend de l'âge de
            liquidation). La sortie en capital y est, sauf exceptions limitées prévues par la
            réglementation (invalidité, cessation d'activité à la suite d'une liquidation
            judiciaire, par exemple), pratiquement fermée. C'est la différence la plus commentée
            avec le PER, et celle qui explique l'essentiel du désamour progressif pour ce produit
            depuis 2019.
          </p>
          <p>
            La seconde contrainte, moins connue, concerne les versements : les contrats Madelin
            d'origine imposaient une cotisation minimale régulière, sous peine de pénalités ou de
            réduction de garanties — une rigidité mal adaptée à des revenus d'indépendant
            fluctuants. Les contrats plus récents ont assoupli cette clause, mais l'esprit du
            produit reste celui d'un engagement de long terme, pensé avant l'exigence de souplesse
            qui a inspiré la réforme de 2019.
          </p>
          <p>
            Un point mérite d'être clarifié, car il inquiète souvent à tort : depuis la loi PACTE,
            plus aucun nouveau contrat Madelin n'est commercialisé — l'offre s'est reportée sur le
            PER individuel. Mais les contrats Madelin ouverts avant cette bascule restent
            pleinement valables. Rien n'oblige leur titulaire à les liquider ni à les transférer :
            un Madelin ancien peut continuer à recevoir des versements et à produire ses effets
            jusqu'à la retraite, exactement selon les conditions prévues au contrat d'origine.
          </p>

          <h2 id="per-tns">Le PER individuel pour un indépendant : ce qui a changé</h2>
          <p>
            Le PER individuel reprend l'architecture générale du Madelin — versements déductibles
            du revenu professionnel imposable, épargne bloquée jusqu'à la retraite sauf cas de
            déblocage anticipé prévus par la loi (acquisition de la résidence principale,
            invalidité, décès du conjoint, surendettement, expiration des droits au chômage,
            cessation d'activité à la suite d'une liquidation judiciaire) — mais lève la principale
            contrainte du Madelin sur deux points.
          </p>
          <p>
            D'abord la sortie : à la retraite, un PER individuel peut se dénouer en capital, en
            rente viagère, ou en un mélange des deux, au choix du titulaire au moment du départ.
            Cette liberté change concrètement la donne pour un indépendant qui, par exemple,
            envisage de solder un emprunt professionnel, d'aider un enfant, ou simplement de piloter
            lui-même la vitesse à laquelle il consomme son épargne plutôt que de se voir imposer une
            rente calculée une fois pour toutes. Notre page sur la{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a> détaille le
            traitement fiscal différencié entre capital et rente selon que les versements ont été
            déduits ou non à l'entrée.
          </p>
          <p>
            Ensuite la portabilité : un PER individuel peut être transféré vers un autre PER
            individuel ou vers un PER d'entreprise si l'indépendant change de statut (par exemple
            en devenant salarié), avec des frais de transfert encadrés par la réglementation et
            généralement dégressifs avec l'ancienneté du contrat. Le Madelin, lui, ne bénéficiait
            pas d'un cadre de transférabilité aussi structuré à l'origine.
          </p>
          <p>
            Sur le fonctionnement courant — gestion pilotée par défaut à l'ouverture (une allocation
            qui sécurise progressivement l'épargne à mesure que l'échéance de la retraite
            approche), choix possible d'une gestion libre, éventail de supports en unités de
            compte —, un PER individuel récent ressemble largement à une assurance-vie sur le plan
            de la mécanique d'investissement. Notre comparatif{" "}
            <a href="/guide/gestion-pilotee-ou-gestion-libre">gestion pilotée ou gestion libre</a>{" "}
            s'applique donc presque à l'identique à un PER de travailleur indépendant. Les mêmes
            familles de supports coexistent : fonds en euros (capital garanti par l'assureur, hors
            faillite de celui-ci, pour un rendement modeste — de l'ordre de {pct(RENDEMENTS.fondsEuros.moyen)}{" "}
            en moyenne de marché en {RENDEMENTS.fondsEuros.periode}, un constat passé qui ne
            préjuge pas de l'avenir) et unités de compte (capital non garanti, en contrepartie d'une
            espérance de rendement supérieure sur longue durée — les grands indices actions
            mondiaux ont délivré, historiquement et sur 20 à 30 ans, des moyennes annualisées de
            l'ordre de {pct(RENDEMENTS.ucActionsLongTerme.min)} à {pct(RENDEMENTS.ucActionsLongTerme.max)},
            les performances passées ne préjugeant jamais des performances futures).
          </p>
          <p>
            Comme pour tout PER, les frais varient fortement selon le distributeur : un contrat
            proposé par un réseau bancaire traditionnel cumule souvent des frais de gestion annuels
            plus élevés — de l'ordre de {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min)}{" "}
            à {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)} — qu'un contrat
            distribué en ligne, davantage orienté vers des supports indiciels (ETF) à frais
            réduits. Notre guide{" "}
            <a href="/guide/combien-coute-un-per">combien coûte un PER</a> détaille l'ensemble des
            étages de frais à vérifier avant de signer, qu'il s'agisse d'un PER pour indépendant ou
            pour salarié.
          </p>

          <h2 id="comparatif">Madelin ou PER : le tableau comparatif</h2>
          <p>
            Voici, critère par critère, ce qui distingue un contrat Madelin d'un PER individuel
            pour un travailleur non salarié. Ce tableau compare des catégories de produits, jamais
            des contrats commerciaux nommés.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Contrat Madelin</th>
                  <th>PER individuel</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Commercialisation</td>
                  <td>Fermée aux nouvelles souscriptions depuis la bascule PACTE ; les contrats existants restent valables</td>
                  <td>Seul produit de ce type ouvert à la souscription pour un TNS aujourd'hui</td>
                </tr>
                <tr>
                  <td>Sortie à la retraite</td>
                  <td>Rente viagère, sauf cas de déblocage anticipé exceptionnels</td>
                  <td>Capital, rente viagère, ou un mélange des deux, au choix du titulaire</td>
                </tr>
                <tr>
                  <td>Déduction fiscale à l'entrée</td>
                  <td>Oui, plafond propre au statut TNS</td>
                  <td>Oui, plafond de même nature (voir section dédiée ci-dessous)</td>
                </tr>
                <tr>
                  <td>Cas de déblocage anticipé</td>
                  <td>Limités (invalidité, cessation d'activité par liquidation judiciaire notamment)</td>
                  <td>Plus nombreux, incluant l'achat de la résidence principale</td>
                </tr>
                <tr>
                  <td>Transfert vers un autre contrat</td>
                  <td>Possible vers un PER, conditions et frais à étudier au cas par cas</td>
                  <td>Cadre de transfert encadré par la réglementation, frais dégressifs avec l'ancienneté</td>
                </tr>
                <tr>
                  <td>Gestion par défaut</td>
                  <td>Variable selon le contrat d'origine, souvent une gestion libre historique</td>
                  <td>Gestion pilotée par défaut à l'ouverture, sauf option contraire du souscripteur</td>
                </tr>
                <tr>
                  <td>Régularité des versements</td>
                  <td>Historiquement plus contraignante (cotisation régulière attendue)</td>
                  <td>Versements libres, sans engagement de régularité</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            La ligne la plus structurante reste la sortie. Pour approfondir l'arbitrage entre
            capital et rente au moment de la retraite, au-delà du seul cas des indépendants, nos
            guides sur les{" "}
            <a href="/guide/inconvenients-rente-viagere">inconvénients de la rente viagère</a> et
            sur le choix entre{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">rente ou retraits programmés</a>{" "}
            détaillent les deux options en profondeur.
          </p>

          <h2 id="transfert">Faut-il transférer un ancien contrat Madelin vers un PER ?</h2>
          <p>
            C'est la question la plus fréquente des indépendants qui détiennent déjà un Madelin.
            Notre réponse, honnête : il n'existe pas de règle générale, et se méfier de quiconque en
            propose une sans avoir regardé le contrat. Le transfert présente un intérêt réel dans
            certaines configurations — récupérer la liberté de sortie en capital, simplifier une
            épargne retraite dispersée sur plusieurs anciens contrats, ou accéder à une gamme de
            supports plus large et moins coûteuse que celle d'un vieux contrat Madelin resté figé
            sur des fonds datés.
          </p>
          <p>
            Mais il présente aussi des inconvénients potentiels, propres à chaque situation : frais
            de transfert (les conditions et frais applicables varient sensiblement d'un assureur à
            l'autre, à étudier au cas par cas avec un professionnel, sans montant générique fiable à
            citer ici), perte éventuelle d'une garantie de taux minimum attachée à l'ancien
            contrat, ou encore antériorité contractuelle à ne pas casser sans raison. Un Madelin
            ancien peut aussi comporter des garanties de prévoyance associées (invalidité, décès)
            qu'un transfert vers un PER pur ne reproduit pas forcément à l'identique.
          </p>
          <p>
            Notre analyse : la bonne méthode n'est jamais « Madelin toujours mauvais, PER toujours
            meilleur » — c'est un audit ligne à ligne de l'ancien contrat (frais réels, garantie de
            taux éventuelle, clause bénéficiaire, options de sortie effectivement proposées par
            l'assureur) mis en face des conditions de transfert réellement applicables. C'est
            exactement l'objet d'un{" "}
            <a href="/bilan-retraite">bilan retraite gratuit</a> : venir avec son relevé de contrat
            Madelin et faire ce comparatif concret, plutôt que de trancher sur une généralité.
          </p>

          <h2 id="plafond">Quel plafond de déduction fiscale pour un indépendant ?</h2>
          <p>
            C'est le point le plus mal compris, et celui sur lequel il faut être le plus rigoureux :
            le plafond de déduction fiscale d'un indépendant ne se limite pas au plafond dit
            « salarié », plus étroit. Un travailleur non salarié bénéficie d'un plafond de
            déduction spécifique, calculé selon un mécanisme propre à son statut — nous décrivons
            ce mécanisme ici sans en donner le montant en euros, ce chiffre étant révisé chaque
            année et devant être vérifié au moment de la décision.
          </p>
          <p>
            Le mécanisme fonctionne en deux temps. D'une part, le plafond est exprimé comme un
            pourcentage du bénéfice professionnel imposable (le revenu que dégage l'activité
            indépendante avant impôt sur le revenu), avec une quotité renforcée sur la tranche de
            revenu la plus élevée. D'autre part, ce pourcentage est borné par référence au plafond
            annuel de la sécurité sociale (le PASS, un montant de référence fixé chaque année par
            arrêté et utilisé pour calculer de nombreux plafonds sociaux et fiscaux) : le calcul
            combine un multiple du PASS et une fraction du revenu professionnel, ce qui rend le
            plafond réel dépendant à la fois du niveau de revenu de l'indépendant et de la valeur
            du PASS pour l'année considérée.
          </p>
          <p>
            Concrètement, cela signifie que plus le revenu professionnel est élevé, plus le plafond
            de déduction en euros augmente — dans la limite du plafond global fixé par la loi — ce
            qui explique pourquoi deux indépendants aux revenus très différents peuvent déduire des
            montants très éloignés l'un de l'autre pour un même taux de cotisation. Le calcul exact
            dépend aussi de l'éventuelle déduction déjà utilisée au titre d'un contrat d'entreprise
            si l'indépendant cumule plusieurs statuts dans l'année.
          </p>
          <div className="note">
            <p>
              Nous ne donnons volontairement aucun montant précis en euros pour ce plafond : il est
              recalculé chaque année en fonction du PASS et évolue avec la réglementation. Pour le
              chiffre exact applicable à l'année en cours, consultez{" "}
              <a href="https://www.urssaf.fr" target="_blank" rel="noopener noreferrer">urssaf.fr</a>{" "}
              ou{" "}
              <a href="https://www.service-public.fr" target="_blank" rel="noopener noreferrer">service-public.fr</a>,
              ou faites calculer votre plafond exact par votre expert-comptable à partir de votre
              revenu professionnel de l'année de référence.
            </p>
          </div>
          <p>
            Un point utile à connaître : le plafond de déduction Madelin/PER-TNS non utilisé une
            année ne se reporte pas automatiquement sur les années suivantes de la même manière que
            le plafond PER d'un salarié, dont les reliquats des trois années précédentes restent
            mobilisables. C'est une raison supplémentaire, pour un indépendant à revenu variable,
            de raisonner le montant du versement chaque année plutôt que de reconduire mécaniquement
            le même chiffre.
          </p>

          <h2 id="gerant-majoritaire">Le cas du gérant majoritaire assimilé TNS</h2>
          <p>
            Le gérant majoritaire de SARL (ou de société assimilée), affilié au régime des
            travailleurs non-salariés au même titre qu'un artisan ou un commerçant, suit des règles
            de calcul de plafond proches de celles décrites plus haut, avec des particularités
            propres à la rémunération de gérance qui ne relèvent pas toujours du même traitement
            qu'un bénéfice professionnel classique. Ce point technique dépasse le cadre général de
            cet article : il mérite d'être vérifié spécifiquement avec un expert-comptable ou un
            conseiller, car la nature exacte de l'assiette de calcul (rémunération, dividendes
            éventuels, charges sociales afférentes) peut faire varier sensiblement le plafond
            réellement mobilisable.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Puis-je encore ouvrir un contrat Madelin aujourd'hui ?</h3>
          <p>
            Non : depuis la bascule liée à la loi PACTE, plus aucun nouveau contrat Madelin n'est
            commercialisé. Un indépendant qui souhaite ouvrir une épargne retraite déductible pour
            la première fois se tourne nécessairement vers un PER individuel.
          </p>
          <h3>Mon contrat Madelin va-t-il disparaître ou devenir obligatoire à transférer ?</h3>
          <p>
            Non, un Madelin déjà ouvert reste pleinement valable et continue de produire ses effets
            selon les conditions d'origine. Rien n'oblige son titulaire à le transférer vers un PER.
          </p>
          <h3>Puis-je sortir en capital d'un vieux contrat Madelin ?</h3>
          <p>
            En principe non, sauf cas de déblocage anticipé prévus par la réglementation
            (invalidité, cessation d'activité par liquidation judiciaire, notamment). La sortie
            normale à la retraite d'un Madelin classique se fait en rente viagère ; c'est
            précisément ce qui pousse certains indépendants à envisager un transfert vers un PER.
          </p>
          <h3>Le plafond de déduction d'un indépendant est-il plus élevé que celui d'un salarié ?</h3>
          <p>
            Il suit un calcul différent, combinant un pourcentage du revenu professionnel et une
            référence au plafond annuel de la sécurité sociale (PASS) ; selon le niveau de revenu,
            il peut être plus favorable ou plus proche de celui d'un salarié. Il n'existe pas de
            règle simple valable pour tous les niveaux de revenu — le calcul doit être fait
            individuellement, idéalement avec un expert-comptable.
          </p>
          <h3>Un PER individuel pour indépendant a-t-il les mêmes frais qu'un PER pour salarié ?</h3>
          <p>
            La structure de frais dépend du distributeur (banque traditionnelle, courtier en ligne,
            assureur), pas du statut du souscripteur. Un indépendant a donc tout intérêt à comparer
            les grilles tarifaires exactement comme le ferait un salarié — voir notre guide{" "}
            <a href="/guide/combien-coute-un-per">combien coûte un PER</a>.
          </p>
          <h3>Que se passe-t-il pour mon PER-TNS si je cesse mon activité indépendante ?</h3>
          <p>
            Le capital reste acquis et continue de fructifier ; il peut être transféré vers un
            autre PER (individuel ou d'entreprise, si vous devenez salarié) dans le cadre de
            transfert prévu par la réglementation. La sortie à la retraite obéit ensuite aux mêmes
            règles que pour tout PER individuel.
          </p>
          <h3>Un gérant majoritaire doit-il choisir un PER-TNS ou un PER classique ?</h3>
          <p>
            Un gérant majoritaire assimilé TNS relève du même régime de déduction que les autres
            indépendants pour son PER individuel ; le calcul du plafond suit des règles proches,
            avec des particularités liées à l'assiette de sa rémunération de gérance à faire
            vérifier au cas par cas.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Reprenons le fil. Si vous êtes indépendant et que vous n'avez encore rien ouvert, la
            question Madelin contre PER ne se pose plus vraiment : le Madelin n'étant plus
            commercialisé, le PER individuel est le véhicule à examiner, avec les mêmes questions
            que pour tout PER — faut-il seulement le déduire, ou aussi comprendre ce qu'on y met et
            à quel prix ? Nos guides{" "}
            <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER</a> et{" "}
            <a href="/guide/a-quel-age-commencer-per">à quel âge commencer un PER</a> répondent à
            ces deux questions en détail, indépendamment du statut professionnel.
          </p>
          <p>
            Si vous détenez déjà un Madelin, l'urgence n'est pas de le fermer par principe : c'est
            de l'auditer — frais réels, garanties associées, options de sortie effectivement
            proposées — avant de décider de le conserver tel quel, d'ouvrir un PER à côté pour
            profiter de sa souplesse de sortie, ou de le transférer selon des conditions à vérifier
            au cas par cas. Le plafond de déduction propre aux indépendants, lui, se calcule chaque
            année à partir de votre revenu professionnel et du plafond annuel de la sécurité
            sociale : un chiffre à faire recalculer annuellement, jamais à reconduire à l'aveugle.
            Pour situer ce PER-TNS au sein d'une stratégie retraite plus large, y compris la
            question du meilleur véhicule global, notre guide{" "}
            <a href="/guide/meilleure-enveloppe-retraite">la meilleure enveloppe retraite</a> élargit
            la focale au-delà du seul cas des indépendants — et pour un profil symétrique, celui
            des fonctionnaires, qui affrontent des questions tout aussi spécifiques sur leur propre
            régime, notre guide sur la{" "}
            <a href="/guide/retraite-fonctionnaires-completer">retraite des fonctionnaires</a> suit
            la même logique de statut particulier.
          </p>
          <p>
            Un mot enfin sur la diversification : un PER-TNS ne doit pas concentrer toute votre
            préparation retraite. Une partie des indépendants complète leur épargne par de
            l'immobilier locatif ou des SCPI (sociétés civiles de placement immobilier) — un sujet
            que nous ne développons pas ici et pour lequel{" "}
            <a href="https://www.scpirentable.fr" target="_blank" rel="noopener noreferrer">scpirentable.fr</a>{" "}
            propose une analyse dédiée.
          </p>
          <div className="note">
            <p>
              Cet article décrit des mécanismes généraux applicables aux travailleurs non-salariés ;
              il ne constitue pas un conseil en investissement personnalisé ni un conseil fiscal ou
              social individualisé. Le plafond de déduction exact, les conditions de transfert d'un
              contrat Madelin et le traitement du statut de gérant majoritaire dépendent de votre
              situation précise et doivent être vérifiés avec votre expert-comptable et, pour la
              partie investissement, lors d'un{" "}
              <a href="/bilan-retraite">bilan retraite gratuit</a>. Les chiffres de rendement et de
              frais cités sont des constats passés datés ou des ordres de grandeur — les
              performances passées ne préjugent pas des performances futures, et tout capital
              garanti l'est par l'assureur, hors faillite de celui-ci.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Indépendant : faites le point sur votre retraite avec un professionnel"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
