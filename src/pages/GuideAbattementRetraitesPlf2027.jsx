import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { ABATTEMENT_PENSIONS, FISCALITE, euros, pct } from "../components/hypotheses.js";

export default function GuideAbattementRetraitesPlf2027() {
  const a = ABATTEMENT_PENSIONS;
  const tmiBas = FISCALITE.tmiOptions[1];
  const tmiHaut = FISCALITE.tmiOptions[2];
  // Niveau de pensions du foyer à partir duquel chaque plafond « mord ».
  const seuilNouveau = a.sousPlafondPlf2027 / (a.taux / 100);
  const seuilActuel = a.plafondFoyerActuel / (a.taux / 100);
  const pertePlafond = a.plafondFoyerActuel - a.sousPlafondPlf2027;

  // Illustrations : abattement perdu selon le total des pensions du foyer,
  // à barème et TMI inchangés (approximation pédagogique, hors effets de seuil).
  const abattement = (pensions, plafond) => Math.min((pensions * a.taux) / 100, plafond);
  const exemples = [seuilNouveau, 35000, 40000, seuilActuel, 60000].map((pensions) => {
    const perdu = abattement(pensions, a.plafondFoyerActuel) - abattement(pensions, a.sousPlafondPlf2027);
    return {
      pensions,
      actuel: abattement(pensions, a.plafondFoyerActuel),
      projete: abattement(pensions, a.sousPlafondPlf2027),
      perdu,
      impotBas: (perdu * tmiBas) / 100,
      impotHaut: (perdu * tmiHaut) / 100,
    };
  });

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Budget 2027 — mesure en débat au Parlement</span>
          <h1>
            Abattement de 10 % des retraités plafonné à {euros(a.sousPlafondPlf2027)} : qui paierait
            plus d'impôt ?
          </h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> l'article 3 du projet de loi de finances (PLF) pour 2027
              propose de ramener le plafond de l'abattement de {pct(a.taux)} sur les pensions de
              retraite de {euros(a.plafondFoyerActuel)} à {euros(a.sousPlafondPlf2027)} par foyer
              fiscal, dès l'imposition des {a.revenusConcernesPlf2027}. Seuls les foyers dont les
              pensions cumulées dépassent {euros(seuilNouveau)} par an seraient touchés, avec une
              hausse de revenu imposable d'au plus {euros(pertePlafond)} — soit environ{" "}
              {euros((pertePlafond * tmiHaut) / 100)} d'impôt en plus par an pour un foyer imposé à{" "}
              {pct(tmiHaut)}. Rien n'est acquis : la commission des finances de l'Assemblée a supprimé
              l'article le {a.dateSuppressionCommission}, mais le débat en séance repart du texte du
              gouvernement. Il n'y a donc aucune décision à prendre dans l'urgence — en revanche, la
              mesure mérite d'être intégrée comme un scénario dans toute projection de revenus à la
              retraite.
            </p>
          </div>

          <p>
            Vous êtes cadre ou fonctionnaire et vous approchez de la retraite, ou vous venez de la
            prendre : la mesure fait partie des rares dispositions du budget 2027 qui visent
            spécifiquement les retraités aux pensions moyennes et élevées. Ce guide explique comment
            fonctionne l'abattement aujourd'hui, ce que changerait exactement le texte, combien cela
            coûterait selon le niveau de pensions du foyer, et pourquoi la mesure touche aussi, par
            ricochet, la sortie en rente d'un PER. Il complète notre guide sur la{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a> et celui sur{" "}
            <a href="/guide/per-loi-de-finances-2026">ce que la loi de finances 2026 a changé pour le
            PER</a>.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#abattement-aujourdhui">Comment fonctionne l'abattement de 10 % aujourd'hui ?</a></li>
              <li><a href="#ce-que-change-le-plf">Ce que changerait l'article 3 du PLF 2027</a></li>
              <li><a href="#qui-est-concerne">Qui serait concerné, et à partir de quel montant de pensions ?</a></li>
              <li><a href="#combien">Combien d'impôt en plus ? Le tableau chiffré</a></li>
              <li><a href="#effets-indirects">Les effets indirects : revenu fiscal de référence, CSG, rentes de PER</a></li>
              <li><a href="#calendrier">Où en est le texte, et quand serait-il appliqué ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#a-verifier">Ce qu'il faut faire (et ne pas faire) d'ici le vote</a></li>
            </ol>
          </div>

          <h2 id="abattement-aujourdhui">Comment fonctionne l'abattement de 10 % aujourd'hui ?</h2>
          <p>
            Les pensions de retraite déclarées à l'impôt sur le revenu bénéficient automatiquement
            d'un abattement de {pct(a.taux)}, prévu par l'article 158 du Code général des impôts. C'est
            l'équivalent, pour les retraités, de la déduction forfaitaire de {pct(a.taux)} pour frais
            professionnels des salariés — même si aucun frais professionnel ne le justifie plus
            vraiment. Aucune démarche n'est nécessaire : l'administration l'applique d'office.
          </p>
          <p>
            Cet abattement est encadré par deux bornes, indexées chaque année. Pour les revenus 2025
            (déclarés au printemps 2026), il ne peut être inférieur à {euros(a.plancherParPensionne)}{" "}
            <strong>par pensionné</strong> — ce qui protège les petites pensions — ni dépasser{" "}
            {euros(a.plafondFoyerActuel)} <strong>pour l'ensemble du foyer fiscal</strong>. Ce plafond
            commence donc à jouer dès que les pensions cumulées du foyer dépassent{" "}
            {euros(seuilActuel)} par an. Point souvent ignoré : il s'agit d'un plafond par foyer, pas
            par personne — un couple marié ou pacsé se partage une seule enveloppe.
          </p>

          <h2 id="ce-que-change-le-plf">Ce que changerait l'article 3 du PLF 2027</h2>
          <p>
            Le texte déposé par le gouvernement début octobre 2026 ne supprime pas l'abattement et ne
            touche pas au plancher par pensionné. Il crée un <strong>sous-plafond de{" "}
            {euros(a.sousPlafondPlf2027)}</strong> réservé aux pensions de retraite, qui
            s'appliquerait au lieu du plafond actuel de {euros(a.plafondFoyerActuel)}. Les pensions
            alimentaires et d'invalidité, qui partagent aujourd'hui le même abattement, resteraient
            soumises au plafond général. Les deux plafonds continueraient d'être indexés chaque année
            sur la première tranche du barème de l'impôt sur le revenu.
          </p>
          <table>
            <thead>
              <tr>
                <th>Paramètre</th>
                <th>Droit actuel (revenus 2025)</th>
                <th>PLF 2027, art. 3 (texte déposé)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Taux de l'abattement</td>
                <td>{pct(a.taux)}</td>
                <td>{pct(a.taux)} (inchangé)</td>
              </tr>
              <tr>
                <td>Plancher par pensionné</td>
                <td>{euros(a.plancherParPensionne)}</td>
                <td>{euros(a.plancherParPensionne)} (inchangé, hors indexation)</td>
              </tr>
              <tr>
                <td>Plafond par foyer — pensions de retraite</td>
                <td>{euros(a.plafondFoyerActuel)}</td>
                <td>{euros(a.sousPlafondPlf2027)}</td>
              </tr>
              <tr>
                <td>Plafond par foyer — pensions alimentaires et d'invalidité</td>
                <td>{euros(a.plafondFoyerActuel)}</td>
                <td>{euros(a.plafondFoyerActuel)} (inchangé, hors indexation)</td>
              </tr>
              <tr>
                <td>Pensions du foyer à partir desquelles le plafond s'applique</td>
                <td>{euros(seuilActuel)}</td>
                <td>{euros(seuilNouveau)}</td>
              </tr>
            </tbody>
          </table>

          <h2 id="qui-est-concerne">
            Qui serait concerné, et à partir de quel montant de pensions ?
          </h2>
          <p>
            Le raisonnement est simple : tant que {pct(a.taux)} des pensions du foyer restent
            inférieurs à {euros(a.sousPlafondPlf2027)}, rien ne change. La mesure ne mord donc qu'au-delà
            de {euros(seuilNouveau)} de pensions annuelles cumulées, soit environ{" "}
            {euros(seuilNouveau / 12)} par mois pour le foyer. Entre {euros(seuilNouveau)} et{" "}
            {euros(seuilActuel)}, la perte d'abattement augmente progressivement ; au-delà de{" "}
            {euros(seuilActuel)}, elle atteint son maximum de {euros(pertePlafond)} de revenu
            imposable supplémentaire.
          </p>
          <p>
            Selon les estimations gouvernementales reprises par la presse, environ{" "}
            {a.foyersConcernesPlf2027} de foyers seraient concernés, pour un rendement attendu de{" "}
            {a.rendementPlf2027}. Le profil type est précisément celui de ce site : un couple d'anciens
            cadres ou de fonctionnaires de catégorie A ou B, ou un retraité seul avec une carrière
            complète bien rémunérée. Parce que le plafond s'applique au foyer, <strong>un couple dont
            chaque membre perçoit {euros(seuilNouveau / 24)} de pension mensuelle</strong> atteint déjà le
            seuil de {euros(seuilNouveau)} — ce qui n'a rien d'une « grosse retraite » individuelle.
          </p>

          <h2 id="combien">Combien d'impôt en plus ? Le tableau chiffré</h2>
          <p>
            Le tableau ci-dessous calcule l'abattement perdu et l'impôt supplémentaire correspondant,
            selon le total annuel des pensions du foyer et sa tranche marginale d'imposition (TMI). Il
            s'agit d'une approximation pédagogique : elle suppose que la TMI ne change pas et ignore
            les éventuels effets de seuil (décote, passage de tranche), et utilise les montants du
            texte déposé avant toute indexation.
          </p>
          <table>
            <thead>
              <tr>
                <th>Pensions annuelles du foyer</th>
                <th>Abattement actuel</th>
                <th>Abattement projeté</th>
                <th>Revenu imposable en plus</th>
                <th>Impôt en plus (TMI {pct(tmiBas)})</th>
                <th>Impôt en plus (TMI {pct(tmiHaut)})</th>
              </tr>
            </thead>
            <tbody>
              {exemples.map((e) => (
                <tr key={e.pensions}>
                  <td>{euros(e.pensions)}</td>
                  <td>{euros(e.actuel)}</td>
                  <td>{euros(e.projete)}</td>
                  <td>{euros(e.perdu)}</td>
                  <td>{euros(e.impotBas)}</td>
                  <td>{euros(e.impotHaut)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Deux lectures s'imposent. D'abord, l'effort est plafonné : même pour un foyer aux pensions
            très élevées, la hausse ne dépasse pas {euros(pertePlafond)} de revenu imposable, soit au
            plus {euros((pertePlafond * FISCALITE.tmiOptions[4]) / 100)} d'impôt pour un foyer à la
            tranche de {pct(FISCALITE.tmiOptions[4])}. Ensuite, en proportion, ce sont les foyers situés
            juste au-dessus du seuil de {euros(seuilActuel)} qui perdent le plus par rapport à leur
            revenu. Pour un couple de retraités, le quotient familial à deux parts maintient souvent la
            TMI à {pct(tmiBas)} jusqu'à des niveaux de pensions confortables : c'est alors la colonne de
            gauche qui s'applique. Pour situer votre propre tranche, reportez-vous à votre dernier avis
            d'imposition.
          </p>

          <h2 id="effets-indirects">
            Les effets indirects : revenu fiscal de référence, CSG, rentes de PER
          </h2>
          <p>
            L'impôt supplémentaire n'est pas le seul effet. Le revenu fiscal de référence (RFR) est
            calculé après abattement : si l'abattement baisse, le RFR monte d'autant. Or le RFR
            détermine notamment le taux de CSG appliqué aux pensions (exonération, taux réduit, taux
            médian ou taux plein) et l'accès à certains dégrèvements locaux. Pour la grande majorité des
            foyers concernés, déjà au taux plein de CSG, l'effet sera nul ; pour un foyer situé
            juste sous l'un de ces seuils, la hausse du RFR peut en revanche faire basculer le taux de
            CSG deux ans plus tard. C'est un point à vérifier au cas par cas, pas une généralité.
          </p>
          <p>
            Deuxième effet, moins visible : l'abattement de {pct(a.taux)} s'applique aussi aux{" "}
            <strong>rentes viagères issues de versements déduits sur un PER</strong>, ainsi qu'aux
            rentes des anciens contrats Madelin et article 83, imposées comme des pensions. Pour un
            foyer dont les pensions de base et complémentaires dépassent déjà le seuil, une rente de PER
            supplémentaire ne bénéficierait plus d'aucun abattement. La mesure renforce donc
            l'intérêt de comparer sérieusement la sortie en rente et la sortie en capital (fractionnée)
            — voir notre guide{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">rente viagère ou retraits
            programmés</a> et celui sur l'<a href="/guide/ordre-de-decaissement-retraite">ordre de
            décaissement</a> à la retraite.
          </p>
          <p>
            Ce que la mesure ne change pas : les prélèvements sociaux sur les pensions (CSG, CRDS,
            Casa) ne sont pas calculés après l'abattement fiscal, et les revenus de l'épargne
            (assurance-vie, PEA, compte-titres) ont leur propre fiscalité, sans lien avec ce plafond.
          </p>

          <h2 id="calendrier">Où en est le texte, et quand serait-il appliqué ?</h2>
          <p>
            Le PLF 2027 a été déposé à l'Assemblée nationale au tout début d'octobre 2026. Le{" "}
            {a.dateSuppressionCommission}, la commission des finances a adopté des amendements
            transpartisans supprimant l'article 3. Cela ne signe pas la fin de la mesure : pour les
            lois de finances, la discussion en séance publique porte en première lecture sur le texte
            du gouvernement, et non sur celui adopté en commission. L'article 3 sera donc rediscuté en
            séance, puis au Sénat, avec un vote définitif attendu en fin d'année. Le gouvernement peut
            le défendre, l'amender (par exemple en relevant le sous-plafond) ou y renoncer.
          </p>
          <p>
            Si la mesure était adoptée en l'état, elle s'appliquerait à l'imposition des{" "}
            {a.revenusConcernesPlf2027}. Concrètement, la hausse apparaîtrait sur l'avis d'impôt de
            l'été 2027 sous forme de solde à payer, puis le taux du prélèvement à la source serait
            ajusté à la hausse pour les mois suivants. Cette page sera mise à jour après le vote
            définitif.
          </p>
          <p>
            Ce même budget contient une autre mesure visant les retraités, côté Sécurité sociale :
            le projet de loi de financement (PLFSS) pour 2027 prévoit une revalorisation différenciée
            des pensions de base au 1er janvier 2027, pleine pour les petites pensions, réduite puis
            gelée au-delà de certains seuils. Les paliers exacts étant encore discutés et diversement
            rapportés, nous ne les détaillons pas ici.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>L'abattement de 10 % est-il supprimé ?</h3>
          <p>
            Non. Le texte maintient le taux de {pct(a.taux)} et le plancher par pensionné ; il abaisse
            seulement le plafond applicable aux pensions de retraite de {euros(a.plafondFoyerActuel)}{" "}
            à {euros(a.sousPlafondPlf2027)} par foyer. Un foyer dont les pensions cumulées restent sous{" "}
            {euros(seuilNouveau)} par an ne verrait aucune différence.
          </p>
          <h3>Le plafond s'applique-t-il par personne ou par couple ?</h3>
          <p>
            Par foyer fiscal, comme aujourd'hui. Un couple marié ou pacsé soumis à imposition commune
            additionne ses deux pensions et se partage un seul plafond. C'est ce qui explique que des
            pensions individuelles moyennes puissent être concernées.
          </p>
          <h3>Je suis encore en activité : suis-je concerné ?</h3>
          <p>
            Pas sur vos salaires, qui conservent la déduction forfaitaire de {pct(a.taux)} pour frais
            professionnels selon ses propres règles. En revanche, si vous partez à la retraite en 2026
            ou 2027, vos premières pensions entreraient dans le champ de la mesure — et le plafond
            réduit serait indexé ensuite, sans retour annoncé au niveau antérieur.
          </p>
          <h3>Faut-il anticiper la sortie de mon PER ou retarder mon départ à cause de cette mesure ?</h3>
          <p>
            Non, pas sur la base d'un texte non voté et dont l'enjeu maximal est de{" "}
            {euros(pertePlafond)} de revenu imposable par an. Une date de départ ou une stratégie de
            sortie du PER se décident sur des montants bien plus importants (trimestres, décote,
            fiscalité du capital, besoins de revenus). La mesure est un paramètre à intégrer dans la
            comparaison rente/capital, pas un motif de décision à lui seul.
          </p>
          <h3>Les pensions de réversion sont-elles concernées ?</h3>
          <p>
            Les pensions de réversion sont des pensions de retraite au sens fiscal et bénéficient du
            même abattement ; elles seraient donc soumises au même sous-plafond. Les pensions
            d'invalidité, elles, resteraient au plafond général selon le texte déposé.
          </p>

          <h2 id="a-verifier">Ce qu'il faut faire (et ne pas faire) d'ici le vote</h2>
          <ol>
            <li>
              <strong>Repérez votre position par rapport aux deux seuils</strong> : additionnez les
              pensions annuelles imposables du foyer (base et complémentaires, avant abattement).
              Sous {euros(seuilNouveau)}, vous n'êtes pas concerné ; au-delà de {euros(seuilActuel)},
              l'effet est maximal.
            </li>
            <li>
              <strong>Vérifiez votre TMI et votre RFR</strong> sur votre dernier avis d'imposition,
              notamment si vous êtes proche d'un seuil de taux de CSG ou d'un changement de tranche.
            </li>
            <li>
              <strong>Si vous préparez la sortie d'un PER</strong>, intégrez la mesure comme un
              scénario dans la comparaison entre rente et capital, sans précipiter de décision.
            </li>
            <li>
              <strong>Attendez le texte définitif</strong> avant toute action irréversible : la
              mesure a déjà été supprimée une fois en commission et peut encore être modifiée ou
              abandonnée.
            </li>
          </ol>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Elle porte sur
              un projet de loi en cours de discussion (PLF 2027, article 3, dans sa version déposée
              par le gouvernement) et sur le droit en vigueur pour les revenus 2025 ; les montants
              peuvent évoluer d'ici le vote définitif et seront indexés. Sources : {a.source} Pour
              mesurer l'effet sur votre propre situation, un{" "}
              <a href="/bilan-retraite">bilan retraite gratuit</a> permet d'intégrer ce scénario à
              votre projection de revenus.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Budget 2027 : mesurez l'effet sur vos revenus de retraite"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
