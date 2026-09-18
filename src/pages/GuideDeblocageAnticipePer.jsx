import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { FISCALITE, HYPOTHESES_MAJ, pct } from "../components/hypotheses.js";

// Taux global appliqué aux gains lors d'un déblocage pour résidence principale :
// PFU part IR + prélèvements sociaux applicables au PER. Jamais écrit en dur.
const pfuGlobalPer = FISCALITE.pfuIR + FISCALITE.prelevementsSociaux.per;

const CAS = [
  {
    cas: "Décès du conjoint ou du partenaire de Pacs",
    nature: "Accident de la vie",
    capital: "Exonéré d'impôt sur le revenu",
    gains: "Exonérés d'impôt sur le revenu, soumis aux prélèvements sociaux",
  },
  {
    cas: "Invalidité (titulaire, conjoint, partenaire de Pacs ou enfant)",
    nature: "Accident de la vie",
    capital: "Exonéré d'impôt sur le revenu",
    gains: "Exonérés d'impôt sur le revenu, soumis aux prélèvements sociaux",
  },
  {
    cas: "Situation de surendettement",
    nature: "Accident de la vie",
    capital: "Exonéré d'impôt sur le revenu",
    gains: "Exonérés d'impôt sur le revenu, soumis aux prélèvements sociaux",
  },
  {
    cas: "Expiration des droits à l'assurance chômage",
    nature: "Accident de la vie",
    capital: "Exonéré d'impôt sur le revenu",
    gains: "Exonérés d'impôt sur le revenu, soumis aux prélèvements sociaux",
  },
  {
    cas: "Cessation d'activité non salariée après liquidation judiciaire",
    nature: "Accident de la vie",
    capital: "Exonéré d'impôt sur le revenu",
    gains: "Exonérés d'impôt sur le revenu, soumis aux prélèvements sociaux",
  },
  {
    cas: "Acquisition de la résidence principale",
    nature: "Projet",
    capital: "Réintégré au revenu imposable si les versements ont été déduits",
    gains: "Imposés au prélèvement forfaitaire unique",
  },
];

export default function GuideDeblocageAnticipePer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Le PER n'est pas totalement bloqué</span>
          <h1>Déblocage anticipé du PER : les 6 cas, la fiscalité et les pièges</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> la loi prévoit six situations dans lesquelles un PER
              peut être débloqué avant la retraite. Cinq sont des accidents de la vie (décès du
              conjoint ou du partenaire de Pacs, invalidité, surendettement, fin des droits au
              chômage, liquidation judiciaire d'une activité non salariée) : dans ces cas, le
              capital sort sans impôt sur le revenu, seuls les gains supportent les prélèvements
              sociaux. La sixième est un projet, pas un accident : l'achat de la résidence
              principale — et c'est le seul cas où la facture fiscale peut être lourde, puisque les
              versements déduits à l'entrée sont réintégrés à votre revenu imposable l'année du
              retrait, en plus de l'imposition des gains. Deux points sont systématiquement mal
              compris : les versements obligatoires d'un PER d'entreprise ne sont jamais
              débloquables pour un achat immobilier, et un déblocage pour résidence principale mal
              calendé peut faire bondir votre tranche marginale l'année du retrait.
            </p>
          </div>

          <p>
            « Mon argent est bloqué jusqu'à la retraite » : c'est la première objection au PER (plan
            d'épargne retraite, l'enveloppe créée par la loi Pacte), et c'est aussi la formulation la
            plus imprécise qui circule à son sujet. Le blocage existe bien, il est la contrepartie
            structurelle de la déduction fiscale à l'entrée — mais il comporte six soupapes prévues
            par le législateur, à l'article L224-4 du Code monétaire et financier.
          </p>
          <p>
            Notre analyse : connaître ces six cas ne suffit pas. Ce qui décide réellement de
            l'opportunité d'un déblocage, c'est ce qui arrive ensuite sur votre avis d'imposition, et
            là, les six cas ne se ressemblent pas du tout. Cinq relèvent d'un traitement volontairement
            clément. Le sixième — celui que les épargnants envisagent le plus souvent de leur plein
            gré — est le seul qui peut coûter cher. Cet article détaille les deux régimes, puis les
            pièges de calendrier que nous voyons revenir le plus souvent.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#tableau">Les 6 cas et leur fiscalité, en un tableau</a></li>
              <li><a href="#accidents">Les 5 accidents de la vie : une sortie protégée</a></li>
              <li><a href="#residence">L'achat de la résidence principale : le cas à part</a></li>
              <li><a href="#compartiments">Le piège n° 1 : tous les compartiments ne se débloquent pas</a></li>
              <li><a href="#tmi">Le piège n° 2 : le retrait qui fait monter votre tranche</a></li>
              <li><a href="#demarches">Les démarches concrètes et les délais</a></li>
              <li><a href="#anticiper">Ce que cela change avant même d'ouvrir un PER</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="tableau">Les 6 cas de déblocage anticipé et leur fiscalité, en un tableau</h2>
          <p>
            Le tableau ci-dessous résume la logique d'ensemble. Deux régimes coexistent, et la
            colonne « capital » est celle qui fait la différence de facture.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Cas de déblocage</th>
                  <th>Nature</th>
                  <th>Traitement du capital (versements déduits)</th>
                  <th>Traitement des gains</th>
                </tr>
              </thead>
              <tbody>
                {CAS.map((ligne) => (
                  <tr key={ligne.cas}>
                    <td>{ligne.cas}</td>
                    <td>{ligne.nature}</td>
                    <td>{ligne.capital}</td>
                    <td>{ligne.gains}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Une septième situation existe, souvent oubliée parce qu'elle ne relève pas du même
            mécanisme : le décès du titulaire lui-même. Le plan est alors dénoué au profit des
            bénéficiaires désignés, avec ses propres règles fiscales — nous y revenons plus bas.
          </p>

          <h2 id="accidents">Les 5 accidents de la vie : une sortie volontairement protégée</h2>
          <p>
            Décès du conjoint ou du partenaire de Pacs, invalidité (celle du titulaire, de son
            conjoint ou partenaire de Pacs, ou d'un enfant), situation de surendettement, expiration
            des droits à l'assurance chômage, cessation d'une activité non salariée à la suite d'une
            liquidation judiciaire : ces cinq situations partagent une même logique. Le législateur a
            fait le choix de ne pas ajouter une facture fiscale à une situation déjà dégradée.
          </p>
          <p>
            Concrètement, les sommes correspondant à vos versements sortent sans être réintégrées à
            votre revenu imposable, y compris si ces versements avaient été déduits à l'entrée. Les
            gains accumulés, eux, échappent à l'impôt sur le revenu mais restent soumis aux
            prélèvements sociaux, au taux applicable au PER, soit{" "}
            {pct(FISCALITE.prelevementsSociaux.per)} (barème {HYPOTHESES_MAJ} —{" "}
            {FISCALITE.prelevementsSociaux.source}).
          </p>
          <div className="note">
            <p>
              Ce que cela révèle sur la nature du PER : l'enveloppe présentée comme un simple
              placement de défiscalisation retraite est aussi, dans notre analyse, un filet de
              sécurité familial. Le cas du décès du conjoint le montre bien — il ouvre un droit de
              retrait immédiat et fiscalement protégé au conjoint survivant, au moment précis où la
              trésorerie du foyer est la plus tendue. Cette dimension de protection rejoint celle
              que nous décrivons dans notre guide{" "}
              <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER</a>, où l'angle
              transmission pèse souvent plus lourd que l'argument fiscal mis en avant à la vente.
            </p>
          </div>
          <p>
            Une nuance importante sur l'invalidité : elle doit correspondre aux 2ᵉ ou 3ᵉ catégories
            de la Sécurité sociale, c'est-à-dire une invalidité empêchant l'exercice d'une activité
            professionnelle. Une invalidité de 1ʳᵉ catégorie n'ouvre pas ce droit. Le périmètre
            familial est en revanche large, puisqu'il couvre aussi les enfants — un point rarement
            mis en avant.
          </p>
          <p>
            Trois autres nuances sont fréquemment mal comprises. D'abord, le décès n'ouvre ce droit
            que pour le conjoint marié ou le partenaire de Pacs : un concubin, même après de
            nombreuses années de vie commune, n'y a pas droit — comme pour la pension de réversion,
            détaillée dans notre guide{" "}
            <a href="/guide/pacs-concubinage-retraite">
              couple pacsé ou en concubinage : ce qui change pour votre retraite
            </a>
            . Ensuite, le cas « chômage » ne se
            déclenche pas dès la perte d'un emploi, mais seulement une fois les droits à l'assurance
            chômage entièrement épuisés — une confusion fréquente qui conduit certains épargnants à
            solliciter un déblocage trop tôt, et à essuyer un refus du gestionnaire. Enfin, seule une
            liquidation judiciaire de l'activité non salariée ouvre ce droit ; une procédure de
            sauvegarde ou de redressement judiciaire, tant qu'elle n'a pas abouti à une liquidation,
            ne le permet pas.
          </p>

          <h2 id="residence">L'achat de la résidence principale : le seul cas où la facture peut être lourde</h2>
          <p>
            Le sixième cas est d'une autre nature : ce n'est pas un accident subi, c'est un projet
            choisi. Et le traitement fiscal s'aligne sur cette différence. Les versements déduits à
            l'entrée sont réintégrés à votre revenu imposable l'année du retrait, imposés au barème
            progressif ; les gains sont imposés au prélèvement forfaitaire unique, soit{" "}
            {pct(FISCALITE.pfuIR)} d'impôt sur le revenu et{" "}
            {pct(FISCALITE.prelevementsSociaux.per)} de prélèvements sociaux, {pct(pfuGlobalPer)} au
            total (barème {HYPOTHESES_MAJ}, à vérifier avant toute décision, les taux étant révisés
            à chaque loi de finances ou de financement de la Sécurité sociale).
          </p>
          <p>
            Contrairement à une idée répandue, la loi n'impose pas d'être primo-accédant : un
            propriétaire qui change de résidence principale peut également mobiliser ce cas de
            déblocage. En revanche, trois limites sont strictes. Le bien doit devenir votre
            résidence principale — ni résidence secondaire, ni investissement locatif. Les fonds
            servent à financer l'acquisition, pas à rembourser un crédit déjà en place sur un bien
            que vous détenez. Et le déblocage ne se répète pas indéfiniment : les contrats prévoient
            généralement une seule opération de ce type par plan, un point à faire confirmer par
            écrit à votre assureur avant d'engager quoi que ce soit.
          </p>
          <p>
            Si votre projet immobilier est au contraire un investissement destiné à produire des
            revenus, ce cas de déblocage ne s'applique pas — et la comparaison entre véhicules
            (locatif direct, SCPI, sociétés foncières) relève d'une autre analyse que celle de cette
            page. Nos guides{" "}
            <a href="/guide/immobilier-locatif-ou-assurance-vie">immobilier locatif ou assurance-vie</a>{" "}
            et{" "}
            <a href="/guide/per-ou-immobilier-locatif">PER ou immobilier locatif</a> posent le cadre
            côté retraite ; pour la comparaison détaillée des véhicules immobiliers eux-mêmes, nos
            sites partenaires{" "}
            <a href="https://immobilierpassif.com" target="_blank" rel="noopener noreferrer">
              immobilierpassif.com
            </a>{" "}
            et{" "}
            <a href="https://scpirentable.fr" target="_blank" rel="noopener noreferrer">
              scpirentable.fr
            </a>{" "}
            traitent le sujet en profondeur.
          </p>

          <h2 id="compartiments">Le piège n° 1 : tous les compartiments d'un PER ne se débloquent pas</h2>
          <p>
            C'est l'erreur la plus fréquente chez les cadres qui cumulent un PER individuel et un PER
            d'entreprise. Un PER se divise en trois compartiments, selon l'origine des sommes, et ils
            n'obéissent pas aux mêmes règles de sortie anticipée.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Compartiment</th>
                  <th>Origine des sommes</th>
                  <th>Débloquable pour la résidence principale ?</th>
                  <th>Débloquable pour un accident de la vie ?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>C1 — versements volontaires</td>
                  <td>Vos versements personnels, déduits ou non</td>
                  <td>Oui</td>
                  <td>Oui</td>
                </tr>
                <tr>
                  <td>C2 — épargne salariale</td>
                  <td>Participation, intéressement, abondement, jours de CET</td>
                  <td>Oui</td>
                  <td>Oui</td>
                </tr>
                <tr>
                  <td>C3 — versements obligatoires</td>
                  <td>Cotisations obligatoires salarié et employeur d'un PER d'entreprise</td>
                  <td><strong>Non, jamais</strong></td>
                  <td>Oui</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Autrement dit, un salarié qui a accumulé l'essentiel de son épargne retraite via des
            cotisations obligatoires d'entreprise peut découvrir, au moment de boucler son plan de
            financement immobilier, que la part réellement mobilisable est bien inférieure à
            l'encours affiché sur son relevé. Vérifiez la ventilation par compartiment sur votre
            relevé annuel avant d'inscrire un montant dans un plan de financement — pas après avoir
            signé un compromis.
          </p>

          <h2 id="tmi">Le piège n° 2 : le retrait qui fait monter votre tranche marginale</h2>
          <p>
            Ce piège ne concerne que le déblocage pour résidence principale, et il est purement
            arithmétique. Les versements déduits qui ressortent s'ajoutent à vos revenus de l'année.
            Un retrait significatif peut donc faire franchir une tranche du barème progressif à une
            partie de vos revenus : l'économie d'impôt patiemment construite sur dix ou quinze ans se
            retrouve partiellement reprise en une seule année.
          </p>
          <p>
            Notre analyse : c'est exactement le même mécanisme que celui d'une sortie en capital mal
            fractionnée au moment de la retraite, un sujet que nous détaillons dans notre guide{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a>. La logique de
            décision est identique dans les deux cas : le montant retiré et l'année du retrait sont
            des paramètres à part entière, pas des conséquences passives du projet. Un déblocage
            partiel, ou décalé sur une année de revenus plus faibles — un changement de poste, une
            période d'activité réduite, l'année suivant un départ à la retraite — n'a pas le même
            coût fiscal qu'un retrait total lors d'une année de prime exceptionnelle.
          </p>
          <p>
            Une piste de réflexion, à ne pas transformer en règle générale : sur un plan de
            financement où le PER n'est qu'une des sources d'apport possibles, comparer le coût
            fiscal réel du déblocage au coût d'un crédit légèrement supérieur mérite d'être fait
            avant de trancher. Selon la tranche marginale du foyer et les conditions de financement
            du moment, l'un peut coûter sensiblement plus que l'autre — dans un sens comme dans
            l'autre. C'est un calcul à mener sur votre situation réelle, avec les deux devis en
            main, jamais sur une règle empruntée à quelqu'un d'autre.
          </p>

          <h2 id="demarches">Les démarches concrètes et les délais</h2>
          <p>
            La demande se fait auprès du gestionnaire du plan (assureur ou teneur de compte), jamais
            auprès de l'administration fiscale. Le dossier comprend systématiquement un formulaire de
            demande de déblocage anticipé fourni par l'établissement, une pièce d'identité, un relevé
            d'identité bancaire, et le justificatif propre au cas invoqué : compromis ou acte
            authentique de vente pour la résidence principale, notification de la Sécurité sociale
            pour une invalidité, décision de la commission de surendettement, attestation de fin de
            droits France Travail, ou jugement de liquidation judiciaire selon la situation.
          </p>
          <p>
            Les délais de traitement varient fortement d'un établissement à l'autre, de quelques
            jours à plusieurs semaines une fois le dossier complet. Pour un achat immobilier, cette
            incertitude est un paramètre à intégrer très en amont : faire dépendre le versement de
            l'apport chez le notaire d'un déblocage de PER lancé trop tard est une source classique
            de tension de calendrier. Demandez à votre gestionnaire son délai contractuel par écrit
            au moment où le projet se précise, pas la semaine de la signature.
          </p>

          <h2 id="anticiper">Ce que cela change avant même d'ouvrir un PER</h2>
          <p>
            Ces six cas ne transforment pas le PER en produit liquide, et il serait malhonnête de le
            présenter ainsi. Ils bornent un risque : celui de voir une épargne entièrement immobilisée
            au moment où la vie impose un imprévu majeur. Ce n'est pas la même chose qu'une
            disponibilité réelle.
          </p>
          <p>
            La conséquence pratique reste donc celle que nous défendons dans tous nos guides
            consacrés au PER : le plan ne doit jamais tenir lieu d'épargne de précaution, ni recevoir
            des sommes dont vous pourriez avoir besoin à moyen terme. Nos guides{" "}
            <a href="/guide/a-quel-age-commencer-per">à quel âge ouvrir un PER</a> et{" "}
            <a href="/guide/combien-coute-un-per">combien coûte un PER</a> abordent les deux autres
            paramètres qui décident de la pertinence d'une ouverture — l'horizon et les frais —
            tandis que notre page{" "}
            <a href="/strategies/per">stratégie PER</a> replace l'enveloppe dans une architecture
            patrimoniale d'ensemble.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on débloquer un PER pour financer les études de ses enfants ou un mariage ?</h3>
          <p>
            Non. La liste des six cas est limitative : ni les dépenses d'éducation, ni un mariage, ni
            un projet professionnel, ni des travaux ne figurent parmi les motifs légaux de déblocage
            anticipé. Ces besoins doivent être couverts par une autre enveloppe, plus liquide.
          </p>
          <h3>Faut-il débloquer la totalité du PER, ou peut-on retirer une partie seulement ?</h3>
          <p>
            Un déblocage partiel est possible dans la plupart des contrats, et c'est souvent le
            choix le plus pertinent sur le plan fiscal dans le cas de la résidence principale — il
            limite la réintégration au revenu imposable de l'année. Les modalités exactes (montant
            minimum, nombre d'opérations autorisées) dépendent du contrat et doivent être vérifiées
            auprès de votre gestionnaire.
          </p>
          <h3>Que se passe-t-il si le titulaire décède avant la retraite ?</h3>
          <p>
            Le plan est dénoué au profit des bénéficiaires désignés, selon des règles propres au type
            de PER — assurantiel ou compte-titres. Ce n'est pas un déblocage anticipé au sens de
            l'article L224-4 : les sommes déduites à l'entrée ne sont pas réintégrées au revenu
            imposable du défunt. C'est l'un des atouts les moins connus du PER assurantiel, détaillé
            dans notre guide{" "}
            <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER</a>.
          </p>
          <h3>Un fonctionnaire dispose-t-il des mêmes cas de déblocage ?</h3>
          <p>
            Oui, dès lors qu'il s'agit d'un PER relevant de la loi Pacte : les six cas de l'article
            L224-4 s'appliquent quel que soit le statut professionnel du titulaire. Les régimes
            spécifiques à la fonction publique obéissent en revanche à leurs propres règles, que nous
            abordons dans notre guide{" "}
            <a href="/guide/retraite-fonctionnaires-completer">retraite des fonctionnaires</a>.
          </p>
          <h3>Le déblocage pour résidence principale est-il possible plusieurs fois ?</h3>
          <p>
            En pratique, les contrats limitent généralement cette opération à une fois par plan. Ce
            point n'étant pas uniforme d'un établissement à l'autre, il doit être confirmé par écrit
            par votre gestionnaire avant d'être intégré à un plan de financement.
          </p>
          <h3>Les sommes débloquées pour un accident de la vie sont-elles totalement exonérées ?</h3>
          <p>
            Le capital correspondant aux versements échappe à l'impôt sur le revenu. Les gains, eux,
            échappent à l'impôt sur le revenu mais restent soumis aux prélèvements sociaux, au taux
            applicable au PER en vigueur l'année du retrait. « Exonéré » ne signifie donc pas
            « sans aucun prélèvement ».
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le PER n'est ni le coffre-fort scellé que décrivent ses détracteurs, ni le produit souple
            que suggèrent certains argumentaires commerciaux. Six portes de sortie existent, et elles
            se répartissent en deux familles très différentes. Les cinq accidents de la vie
            constituent un vrai filet de sécurité, fiscalement protégé, qui borne le risque
            d'immobilisation totale de l'épargne — et qui, dans le cas du décès du conjoint, relève
            autant de la protection familiale que de la mécanique fiscale. L'achat de la résidence
            principale, lui, est un arbitrage à part entière : la réintégration des versements déduits
            au revenu de l'année peut reprendre une part significative de l'avantage fiscal accumulé,
            et le montant comme l'année du retrait sont des variables à piloter.
          </p>
          <p>
            Deux vérifications concrètes valent, à elles seules, la lecture de cet article : la
            ventilation par compartiment de votre encours — les versements obligatoires ne financeront
            jamais un achat immobilier — et le calcul de l'effet du retrait sur votre tranche
            marginale de l'année. Ces deux points se traitent avant la signature d'un compromis, pas
            après. C'est précisément ce que nous regardons dans un{" "}
            <a href="/bilan-retraite">bilan retraite</a> : la ventilation réelle de vos encours,
            l'année la moins coûteuse pour un retrait éventuel, et les alternatives à un déblocage
            quand il se révèle plus cher qu'un financement classique.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle, et les
              modalités précises de déblocage varient d'un contrat à l'autre. Les taux cités sont
              ceux en vigueur en {HYPOTHESES_MAJ}, susceptibles d'évoluer à chaque loi de finances ou
              de financement de la Sécurité sociale, et restent à vérifier avant toute décision. Ne
              confondez pas supports garantis et unités de compte : sur ces dernières, la valeur de
              l'épargne débloquée dépend des marchés au jour du retrait, et les performances passées
              ne préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Un déblocage de PER à arbitrer avant de signer ?"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
