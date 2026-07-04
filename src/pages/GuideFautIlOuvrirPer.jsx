import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RENDEMENTS,
  FISCALITE,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

// Grille d'auto-diagnostic des 5 cas où ouvrir un PER est déconseillé —
// utilisée dans le tableau de la section 1-5.
const CAS_NON = [
  {
    situation: "Votre TMI est à 0 % ou 11 %",
    probleme: "La déduction à l'entrée est marginale ou nulle",
    ancre: "#tmi-faible",
  },
  {
    situation: "Vous n'avez pas d'épargne de précaution constituée",
    probleme: "L'argent versé sur un PER est bloqué jusqu'à la retraite",
    ancre: "#precaution",
  },
  {
    situation: "Vous pourriez avoir besoin de ces fonds avant la retraite",
    probleme: "Hors déblocage anticipé légal, l'argent reste indisponible",
    ancre: "#besoin-fonds",
  },
  {
    situation: "« Payer moins d'impôts » est votre seul motif",
    probleme: "La déduction est un report, pas un gain acquis",
    ancre: "#seul-motif",
  },
  {
    situation: "Le contrat proposé est un mauvais contrat",
    probleme: "Frais élevés, gestion pilotée coûteuse, fonds en euros pour seul support",
    ancre: "#mauvais-contrat",
  },
];

export default function GuideFautIlOuvrirPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Les cas où c'est non</span>
          <h1>Faut-il ouvrir un PER ? Les cas où la réponse est non</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> ouvrir un PER n'est pas toujours une bonne idée. La
              réponse est le plus souvent non si votre TMI est à 0 ou 11 %, si vous n'avez pas
              d'épargne de précaution constituée, si vous pourriez avoir besoin de ces fonds avant
              la retraite, si « payer moins d'impôts » est votre seul motif, ou si le contrat
              proposé est mauvais (frais élevés, gestion pilotée coûteuse, fonds en euros comme
              seul support). À l'inverse, le PER devient pertinent avec une TMI élevée amenée à
              baisser à la retraite, et surtout pour un objectif rarement mis en avant : protéger
              sa famille en cas de décès.
            </p>
          </div>
          <p>
            Un vendeur de PER (plan d'épargne retraite, l'enveloppe créée par la loi Pacte pour
            capitaliser en vue de la retraite) vous répondra toujours oui. C'est le produit qu'il
            a à proposer, et l'argument de la déduction fiscale se vend facilement en entretien.
            Notre analyse préfère commencer par l'autre bout : les situations où ouvrir un PER
            serait, très concrètement, une mauvaise décision. Elles sont plus nombreuses qu'on ne
            le pense.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#grille">La grille d'auto-diagnostic en un coup d'œil</a></li>
              <li><a href="#tmi-faible">TMI à 0 ou 11 % : la déduction pèse peu</a></li>
              <li><a href="#precaution">Pas d'épargne de précaution constituée</a></li>
              <li><a href="#besoin-fonds">Besoin des fonds avant la retraite</a></li>
              <li><a href="#seul-motif">« Pour payer moins d'impôts » comme seul motif</a></li>
              <li><a href="#mauvais-contrat">Le mauvais contrat</a></li>
              <li><a href="#quand-oui">Et les cas où le PER excelle ?</a></li>
              <li><a href="#transmission">L'angle le moins connu : protection familiale et transmission</a></li>
              <li><a href="#enfants">Le cas particulier des enfants majeurs rattachés</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="grille">La grille d'auto-diagnostic : les 5 signaux qui doivent faire hésiter</h2>
          <p>
            Avant le détail de chaque cas, voici la grille de lecture rapide. Si une seule de ces
            lignes correspond à votre situation, la section associée mérite d'être lue avant toute
            décision.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Votre situation</th>
                  <th>Pourquoi c'est un problème</th>
                  <th>Détail</th>
                </tr>
              </thead>
              <tbody>
                {CAS_NON.map((cas) => (
                  <tr key={cas.ancre}>
                    <td>{cas.situation}</td>
                    <td>{cas.probleme}</td>
                    <td><a href={cas.ancre}>Voir la section</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="tmi-faible">1. Votre TMI est à 0 ou 11 % : la déduction pèse peu</h2>
          <p>
            Le mécanisme du PER est simple : chaque versement volontaire se déduit du revenu
            imposable, dans la limite d'un plafond annuel. L'économie d'impôt immédiate dépend
            directement de votre TMI (tranche marginale d'imposition, le taux qui s'applique à
            votre dernière tranche de revenu) : elle est significative à 30, 41 ou 45 %, elle est
            marginale à 11 %, et elle est nulle si vous n'êtes pas imposable.
          </p>
          <p>
            Or cette déduction n'est pas un gain acquis : c'est un report d'imposition. Les
            sommes déduites à l'entrée sont réintégrées au revenu imposable le jour où vous les
            retirez, à la retraite ou lors d'un déblocage anticipé. Si votre TMI actuelle est déjà
            basse, le report ne rapporte quasiment rien à l'entrée — et rien ne garantit qu'elle
            sera plus basse encore à la sortie. Le calcul peut même devenir défavorable si vos
            revenus ou le barème évoluent d'ici là : vous aurez bloqué votre épargne pendant des
            années pour un avantage fiscal proche de zéro.
          </p>

          <h2 id="precaution">2. Vous n'avez pas d'épargne de précaution constituée</h2>
          <p>
            Le PER ne doit jamais être la seule épargne d'un foyer. Les sommes versées y sont
            indisponibles jusqu'à la retraite, hors cas de déblocage anticipé prévus par la loi
            (détaillés au point suivant). Avant d'envisager un PER, notre approche consiste à
            vérifier qu'une épargne de précaution mobilisable en quelques jours — plusieurs mois
            de dépenses courantes, sur un support liquide comme un livret — est déjà en place.
            Ouvrir un PER en l'absence de ce matelas, c'est s'exposer à devoir emprunter ou
            déclencher un déblocage anticipé au pire moment pour un imprévu qu'une épargne
            disponible aurait suffi à couvrir.
          </p>

          <h2 id="besoin-fonds">3. Vous pourriez avoir besoin de ces fonds avant la retraite</h2>
          <p>
            Hors les cas légaux ci-dessous, l'argent versé sur un PER est bloqué jusqu'à la
            liquidation de vos droits à la retraite. Ce n'est pas une nuance : c'est la
            contrepartie structurelle de l'avantage fiscal à l'entrée. Si un projet à moyen terme
            (dix, quinze ans) n'est pas encore défini, ou si votre situation professionnelle est
            instable, cette indisponibilité doit peser lourd dans la décision.
          </p>
          <p>
            La loi prévoit six cas de déblocage anticipé, tous liés à des accidents de la vie ou
            à l'achat de la résidence principale : le décès du conjoint ou du partenaire de
            Pacs, l'invalidité, le surendettement, la fin des droits au chômage, la liquidation
            judiciaire de son activité professionnelle, et l'achat de la résidence principale.
            Pour les cinq premiers cas, les versements débloqués ne sont pas réintégrés au revenu
            imposable — seuls les gains le sont. Pour l'achat de la résidence principale, en
            revanche, comme pour une sortie classique à la retraite, les versements déduits sont
            réintégrés au barème : un déblocage mal anticipé peut faire bondir l'impôt de l'année.
          </p>

          <h2 id="seul-motif">4. Ouvrir un PER « pour payer moins d'impôts » : un mauvais calcul, même à TMI élevée</h2>
          <p>
            C'est le cas le plus fréquent, et le plus mal posé. La déduction fiscale n'est pas
            supprimée, elle est reportée : les sommes versées seront imposées à la sortie, au
            barème alors en vigueur. Présenter le PER comme un placement qui « fait baisser vos
            impôts » revient à ne raconter que la moitié de l'histoire — l'autre moitié arrive
            quinze ou vingt ans plus tard, sous forme de facture.
          </p>
          <p>
            Notre analyse va plus loin qu'un simple rappel de mécanique : même à 30 % de TMI, le
            PER envisagé uniquement comme un placement retraite défiscalisé peut rester un
            mauvais calcul. Personne ne connaît le barème de l'impôt dans quinze ou vingt ans, ni
            son propre niveau de revenu à ce moment-là. Miser sur un différentiel de tranche
            marginale entre aujourd'hui et la retraite, c'est parier sur deux inconnues à la
            fois — pas exploiter une certitude. Et une sortie en capital trop massive, en une
            seule fois, peut faire remonter votre TMI l'année du retrait, annulant une partie du
            bénéfice construit pendant des décennies. Nous détaillons ce point dans notre guide{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a>.
          </p>
          <p>
            Cela ne veut pas dire que le PER est sans intérêt à cette TMI — cela veut dire que la
            réduction d'impôt ne doit jamais être, à elle seule, le motif d'ouverture. L'intérêt
            réel se loge ailleurs, comme nous le montrons plus bas.
          </p>

          <h2 id="mauvais-contrat">5. Le mauvais contrat annule l'avantage</h2>
          <p>
            Un PER n'est qu'une enveloppe : ce sont les frais et les supports qui déterminent la
            performance nette. Trois signaux doivent alerter. Des frais sur versements prélevés à
            chaque apport, qui amputent le capital investi avant même qu'il ne travaille. Une
            gestion pilotée (une allocation déléguée à l'assureur, qui évolue automatiquement
            selon l'horizon restant) chargée en frais supplémentaires, parfois peu justifiés au
            regard du service rendu. Et des supports pauvres : un choix restreint de fonds,
            souvent orientés vers le fonds en euros, dont le rendement moyen a été de{" "}
            {pct(RENDEMENTS.fondsEuros.moyen)} en {RENDEMENTS.fondsEuros.periode} (
            {RENDEMENTS.fondsEuros.source} ; un constat passé qui ne préjuge pas des rendements
            futurs). Sur un horizon aussi long que celui d'un PER, un fonds en euros pour seul
            support revient à immobiliser l'argent sur un support peu rémunérateur pendant des
            années, sans raison objective. Notre guide{" "}
            <a href="/guide/per-bancaire-frais-gestion-horizon">PER bancaire, frais de gestion et horizon</a>{" "}
            détaille ces pièges contrat par contrat.
          </p>

          <h2 id="quand-oui">Et les cas où le PER excelle ?</h2>
          <p>
            À ce stade, un lecteur pourrait conclure que le PER ne sert à rien. Ce serait
            inexact, et ce n'est pas notre position. L'honnêteté qui nous fait lister les cas où
            la réponse est non nous impose aussi de dire où le PER devient, à l'inverse, un outil
            pertinent.
          </p>
          <p>
            Premier cas : une TMI élevée aujourd'hui, avec une baisse anticipée à la retraite —
            typiquement un cadre ou un fonctionnaire en fin de carrière dont les revenus
            baisseront mécaniquement une fois les pensions liquidées. Le report d'imposition
            devient alors un vrai différentiel, pas un pari. Nous ne fixons volontairement aucun
            seuil de TMI universel à partir duquel « foncer » : une même TMI de 30 % peut justifier
            un PER dans une situation et le déconseiller dans une autre, selon le patrimoine
            global, l'âge, la carrière restante et les autres enveloppes déjà mobilisées.
            L'adéquation se juge stratégie par stratégie, jamais sur un seuil isolé — c'est
            l'objet d'un <a href="/bilan-retraite">bilan retraite</a> mené au cas par cas.
          </p>
          <p>
            Second cas, le plus structurant et le moins mis en avant par les discours généralistes
            sur le PER : la protection familiale et la transmission.
          </p>

          <h2 id="transmission">L'angle le moins connu : protection familiale et transmission via le PER assurantiel</h2>
          <p>
            Cet avantage est réservé au PER <strong>assurantiel</strong> (souscrit auprès d'un
            assureur, cas de la majorité des PER individuels) : un PER bancaire fonctionne comme
            un compte-titres et n'ouvre droit à aucun des mécanismes décrits ci-dessous.
          </p>
          <p>
            Si le titulaire décède avant d'avoir liquidé son PER, les sommes déduites à l'entrée
            ne sont jamais réintégrées au revenu imposable — le report d'imposition devient
            définitivement acquis, y compris pour des versements effectués après 70 ans. Les
            capitaux transmis bénéficient en outre d'un abattement de 152 500 € par bénéficiaire
            si le décès survient avant les 70 ans du titulaire (règles en vigueur en{" "}
            {HYPOTHESES_MAJ}) — et c'est bien l'âge au moment du décès qui compte, pas la date des
            versements, contrairement à une confusion fréquente avec l'assurance-vie. Passé 70
            ans, l'abattement retombe à 30 500 € pour l'ensemble des bénéficiaires. Dans les deux
            cas, les gains transmis échappent aux prélèvements sociaux, alors qu'ils s'appliquent
            au taux de {pct(FISCALITE.prelevementsSociaux.per)} sur une sortie classique du
            vivant du titulaire (barème {HYPOTHESES_MAJ}).
          </p>
          <div className="note">
            <p>
              Ce que cela change concrètement : un PER ouvert tôt, avec une plus-value
              importante au moment du décès, peut effacer une part significative de l'impôt sur
              le revenu qui aurait dû être payée sur les versements — sans jamais avoir supporté
              de prélèvements sociaux sur les gains. Vu sous cet angle, l'enveloppe présentée par
              beaucoup comme un simple outil de défiscalisation retraite est d'abord, dans notre
              analyse, un outil de protection du conjoint et des enfants.
            </p>
          </div>
          <p>
            Cette mécanique ne dispense pas d'un arbitrage : plus la part de plus-value latente
            est élevée, plus la base soumise aux droits de succession peut grossir sans abattement
            supplémentaire au-delà des seuils cités. La décision de conserver les sommes sur le
            PER ou de les faire transiter par une autre enveloppe avant 70 ans dépend du
            patrimoine global, du nombre de bénéficiaires et de leur lien de parenté — un calcul
            qui se fait au cas par cas, jamais sur une règle générale. Notre page{" "}
            <a href="/strategies/per">stratégie PER</a> et notre guide{" "}
            <a href="/guide/quel-est-le-meilleur-per">quel est le meilleur PER</a> approfondissent
            ce choix de contrat.
          </p>

          <h2 id="enfants">Le cas particulier des enfants majeurs rattachés</h2>
          <p>
            Un enfant majeur rattaché au foyer fiscal peut ouvrir son propre PER : chaque
            versement réduit alors le revenu imposable global du foyer, dans la limite du plafond
            de déduction propre à l'enfant — de l'ordre de{" "}
            {euros(FISCALITE.perPlafondEnfantRattache)} en {HYPOTHESES_MAJ} (montant à
            vérifier avant toute décision, les plafonds étant révisés chaque année). Ce levier
            suppose deux précautions : que les versements soient clairement identifiés — présent
            d'usage ou don déclaré — et que la sortie future soit anticipée, puisqu'un déblocage
            pour l'achat de la résidence principale de l'enfant sera réintégré à son revenu à lui,
            pas à celui des parents. L'intérêt est réel, mais ce n'est pas un mécanisme à activer
            sans réflexion sur la situation fiscale de l'enfant à moyen terme. Notre guide{" "}
            <a href="/guide/a-quel-age-commencer-per">à quel âge commencer un PER</a> revient sur
            ces questions de calendrier.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on retirer l'argent d'un PER avant la retraite en cas d'urgence ?</h3>
          <p>
            Seulement dans les six cas de déblocage anticipé prévus par la loi (décès du conjoint,
            invalidité, surendettement, fin des droits au chômage, liquidation judiciaire de son
            activité, achat de la résidence principale). En dehors de ces cas, l'argent reste
            bloqué jusqu'à la retraite.
          </p>
          <h3>Que se passe-t-il si je change d'avis après avoir ouvert un PER ?</h3>
          <p>
            Un délai de renonciation légal existe à la souscription, mais passé ce délai, il n'est
            pas possible de « fermer » un PER pour récupérer l'argent librement : seuls les cas de
            déblocage anticipé ou la liquidation à la retraite permettent une sortie.
          </p>
          <h3>Un PER ouvert « pour l'impôt » à 30 % de TMI est-il toujours une erreur ?</h3>
          <p>
            Non, pas toujours : mais ce n'est pas non plus automatiquement une bonne affaire.
            Tout dépend de l'écart réel entre votre TMI actuelle et votre TMI anticipée à la
            retraite, et de la qualité du contrat — un mauvais contrat peut annuler l'avantage
            fiscal.
          </p>
          <h3>Faut-il ouvrir un PER si on est proche de la retraite ?</h3>
          <p>
            Cela dépend surtout de l'horizon de placement restant et du mode de sortie envisagé,
            pas uniquement de l'âge : un versement juste avant la liquidation profite pleinement
            de la déduction, mais laisse peu de temps à l'épargne pour fructifier.
          </p>
          <h3>Le PER est-il plus intéressant que l'assurance-vie pour transmettre à mes enfants ?</h3>
          <p>
            Les deux offrent des abattements successoraux comparables dans certains cas, mais les
            règles diffèrent (âge au décès pour le PER, date des versements pour l'assurance-vie).
            Notre comparatif <a href="/guide/per-vs-assurance-vie-retraite">PER ou assurance-vie</a>{" "}
            détaille ces différences.
          </p>
          <h3>Dois-je verser le maximum déductible chaque année ?</h3>
          <p>
            Non, ce n'est pas une obligation ni toujours une bonne pratique : le montant versé
            doit rester cohérent avec votre épargne de précaution, vos autres projets et votre
            capacité à immobiliser cette somme jusqu'à la retraite.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le PER n'est ni un piège ni une solution magique : c'est un outil dont la pertinence
            dépend presque entièrement du motif d'ouverture. Ouvert pour « payer moins d'impôts »,
            sans épargne de précaution, sans certitude sur l'horizon, ou logé dans un mauvais
            contrat, il peut coûter plus qu'il ne rapporte. Ouvert en connaissance de ses deux
            vrais atouts — une TMI élevée avec baisse anticipée à la retraite, et surtout la
            protection familiale via le compartiment transmission — il devient l'un des outils
            patrimoniaux les plus sous-estimés du marché français. Entre ces deux extrêmes,
            aucune règle chiffrée ne remplace l'examen de votre stratégie patrimoniale
            d'ensemble, revue avec un{" "}
            <a href="/guide/meilleure-enveloppe-retraite">comparatif des enveloppes</a> et, si
            besoin, un professionnel.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle. Les
              montants, abattements et taux cités sont les barèmes en vigueur en{" "}
              {HYPOTHESES_MAJ}, susceptibles d'évoluer à chaque loi de finances, et certains
              restent à vérifier avant publication ; les rendements mentionnés sont des constats
              passés datés, et les performances passées ne préjugent pas des performances
              futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
