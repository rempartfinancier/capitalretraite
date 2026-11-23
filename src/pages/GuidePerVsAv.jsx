import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RENDEMENTS,
  FRAIS_TYPES,
  FISCALITE,
  TRANSMISSION,
  HYPOTHESES_MAJ,
  PER_PLAFOND,
  PER_PLAFOND_EXEMPLES,
  EPARGNE_RETRAITE_EXEMPLES,
  ENVELOPPES_NOV2026,
  AV_RACHAT,
  ENRICH_AVPER_NOV2026,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Calculs illustratifs (aucun chiffre en dur : tout vient de hypotheses.js) ----
const E = ENRICH_AVPER_NOV2026;
const rendement = EPARGNE_RETRAITE_EXEMPLES.rendementsEpargneNets[E.indexRendement]; // %/an net de frais
const g = rendement / 100;
const psPer = FISCALITE.prelevementsSociaux.per;
const psAv = FISCALITE.prelevementsSociaux.assuranceVie;
const dureeAv = AV_RACHAT.dureeTauxReduitAnnees;

// À coût réel égal : le PER reçoit le versement brut V (coût réel V × (1 − TMI d'entrée),
// l'économie d'impôt finançant le reste) ; l'assurance-vie reçoit ce coût réel.
// Sortie supposée en une seule fois, en capital : PER = versements déduits au barème (TMI de
// sortie) + gains au PFU et prélèvements sociaux du PER ; AV = gains avec abattement annuel
// (personne seule) et taux réduit si l'horizon atteint 8 ans, sinon PFU.
function comparer(tmiEntree, tmiSortie, annees) {
  const v = E.versementPerBrut;
  const cout = (v * (100 - tmiEntree)) / 100;
  const capitalPer = v * (1 + g) ** annees;
  const gainsPer = capitalPer - v;
  const netPer =
    capitalPer - (v * tmiSortie) / 100 - (gainsPer * (FISCALITE.pfuIR + psPer)) / 100;
  const capitalAv = cout * (1 + g) ** annees;
  const gainsAv = capitalAv - cout;
  const impotAv =
    annees >= dureeAv
      ? (gainsAv * psAv) / 100 +
        (Math.max(gainsAv - FISCALITE.avAbattementAnnuelSeul, 0) * FISCALITE.avTauxReduitApres8Ans) / 100
      : (gainsAv * (FISCALITE.pfuIR + psAv)) / 100;
  const netAv = capitalAv - impotAv;
  return { economie: v - cout, cout, netPer, netAv, ecart: netPer - netAv };
}

const ageDepart = ENVELOPPES_NOV2026.ageDepartReference;

// Plafond de déduction PER (versements de l'année 2026, revenus 2025) : 10 % des revenus
// d'activité nets de frais professionnels (abattement forfaitaire appliqué au salaire net
// imposable, comme dans le guide plafond PER), retenus dans la limite de 8 PASS, avec un
// plancher de 10 % du PASS.
const plafondPer = (salaire) =>
  Math.max(
    (Math.min(
      salaire * (1 - PER_PLAFOND.tauxAbattementFraisProfessionnels / 100),
      PER_PLAFOND.multiplePassMaximum * PER_PLAFOND.pass2025
    ) *
      PER_PLAFOND.tauxRevenusActivite) /
      100,
    (PER_PLAFOND.pass2025 * PER_PLAFOND.tauxPlancherPass) / 100
  );
const profilsPlafond = [
  { id: "A", salaire: PER_PLAFOND_EXEMPLES.profilA.salaireNetImposable2025, tmi: E.tmiProfilsPlafond.profilA },
  { id: "B", salaire: PER_PLAFOND_EXEMPLES.profilB.salaireNetImposable2025, tmi: E.tmiProfilsPlafond.profilB },
  { id: "C", salaire: PER_PLAFOND_EXEMPLES.profilC.salaireNetImposable2025, tmi: E.tmiProfilsPlafond.profilC },
];
const profilsIllustratifs = E.profils.map((p) => {
  const horizon = ageDepart - p.age;
  return { ...p, horizon, ...comparer(p.tmi, p.tmiRetraite, horizon) };
});
const lecture = {
  jeune: "Écart faible : la déduction rapporte peu à ce niveau de TMI. L'assurance-vie, plus souple, est souvent le socle ; un PER reste possible en complément.",
  cadre: "La baisse de TMI attendue à la retraite joue en faveur du PER, pour la part de l'épargne réellement immobilisable ; l'assurance-vie garde son rôle de réserve souple.",
  cadreSup: "La déduction est à son maximum : le PER est le candidat naturel jusqu'au plafond, avec l'assurance-vie pour la liquidité et la transmission.",
  procheRetraite: "Horizon court : peu de gains en jeu, l'effet de calendrier fiscal domine ; la sortie en rente ou en capital et la transmission pèsent autant que le calcul.",
};

export default function GuidePerVsAv() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide — comparatif PER / assurance-vie</span>
          <h1>PER ou assurance-vie pour la retraite : lequel choisir selon votre TMI et votre horizon ?</h1>
          <p className="sub">
            La question la plus posée en rendez-vous — et celle où les réponses toutes faites font
            le plus de dégâts. Comparatif structuré, tableau chiffré selon la tranche d'imposition
            et la durée, contreparties comprises. Mis à jour en {E.maj}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>Réponse courte :</strong> à partir d'une TMI (tranche marginale d'imposition) de{" "}
              {pct(FISCALITE.tmiOptions[2])}, et plus encore si votre TMI à la retraite devrait
              être plus basse, le PER est souvent l'enveloppe fiscalement la plus avantageuse pour
              une épargne retraite que vous pouvez immobiliser ; à {pct(FISCALITE.tmiOptions[1])} ou si
              vous voulez garder l'accès à votre argent, l'assurance-vie est souvent plus adaptée.
              Beaucoup d'épargnants combinent les deux.
            </p>
            <p>
              <strong>L'essentiel :</strong> le PER et l'assurance-vie ne se distinguent pas par
              leur « performance », mais par le moment où vous payez l'impôt. Le PER déduit vos
              versements de votre revenu imposable aujourd'hui et taxe la sortie ; l'assurance-vie
              ne déduit rien à l'entrée mais offre une fiscalité de sortie allégée après 8 ans, avec
              un accès à votre argent à tout moment. En pratique, ni l'un ni l'autre ne « gagne » :
              le PER est le plus rentable pour une TMI (tranche marginale d'imposition) élevée avec
              un horizon bloqué jusqu'à la retraite, l'assurance-vie l'emporte dès que la liquidité
              ou la transmission comptent. La plupart des stratégies solides combinent les deux.
              Si vous hésitez entre plus de deux enveloppes (PER, assurance-vie, PEA, compte-titres),
              notre guide{" "}
              <a href="/guide/meilleure-enveloppe-retraite">quelle est la meilleure enveloppe pour
              préparer sa retraite ?</a> élargit la focale au-delà de ce seul duel.
            </p>
          </div>

          <p>
            Ce comparatif se concentre volontairement sur le duel PER contre assurance-vie, sans
            élargir au PEA : c'est le PER qui capte le plus de confusions en rendez-vous, parce
            qu'il joue sur un terrain — le calendrier fiscal, entrée contre sortie — que
            l'assurance-vie ne connaît pas. Notre guide{" "}
            <a href="/guide/pea-ou-per-pour-la-retraite">PEA ou PER pour la retraite</a> traite le
            duel PEA/PER si c'est plutôt cette comparaison qui vous intéresse.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#calendrier">La différence fondamentale : quand payez-vous l'impôt ?</a></li>
              <li><a href="#tableau">Le tableau comparatif</a></li>
              <li><a href="#tmi-horizon">PER ou assurance-vie selon la TMI et l'horizon : le calcul chiffré</a></li>
              <li><a href="#plafond">Combien le PER peut-il vous faire économiser ? Le plafond de déduction</a></li>
              <li><a href="#profils">Quatre profils illustratifs</a></li>
              <li><a href="#limites">Les limites de ce calcul</a></li>
              <li><a href="#cas-usage">Les cas d'usage typiques</a></li>
              <li><a href="#dosage">Le vrai réglage : le dosage, pas le duel</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
            </ol>
          </div>

          <h2 id="calendrier">La différence fondamentale : quand payez-vous l'impôt ?</h2>
          <p>
            Le PER offre une déduction fiscale à l'entrée et une imposition à la sortie ;
            l'assurance-vie fait l'inverse : aucun avantage à l'entrée, mais une fiscalité de
            sortie douce (seuls les gains sont taxés, avec abattement après 8 ans). Tout le reste —
            liquidité, succession, cas d'usage — découle de ce choix de calendrier fiscal.
          </p>
          <p>
            Sur les prélèvements sociaux, les deux enveloppes ne logent plus à la même enseigne
            depuis la LFSS 2026 : le PER supporte désormais {pct(FISCALITE.prelevementsSociaux.per)}{" "}
            (comme le PEA et le compte-titres), tandis que l'assurance-vie reste à{" "}
            {pct(FISCALITE.prelevementsSociaux.assuranceVie)}, taux que la réforme n'a pas touché
            (barèmes en vigueur en {HYPOTHESES_MAJ}). C'est un écart réel, mais secondaire face à
            l'effet de la déduction à l'entrée ou de l'abattement à la sortie, qui pèsent
            généralement bien plus lourd dans le calcul.
          </p>

          <h2 id="tableau">Le tableau comparatif</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>PER</th>
                  <th>Assurance-vie</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Avantage à l'entrée</strong></td>
                  <td>Versements déductibles du revenu imposable, dans la limite d'un plafond annuel propre à chaque épargnant</td>
                  <td>Aucun</td>
                </tr>
                <tr>
                  <td><strong>Disponibilité</strong></td>
                  <td>Bloqué jusqu'à la retraite (hors cas légaux de déblocage anticipé, dont l'achat de la résidence principale)</td>
                  <td>Rachat (retrait partiel ou total) possible à tout moment, quelle que soit l'ancienneté du contrat</td>
                </tr>
                <tr>
                  <td><strong>Fiscalité de sortie en capital</strong></td>
                  <td>
                    Part correspondant aux versements déduits : imposée au barème de l'IR. Part
                    correspondant aux gains : prélèvement forfaitaire unique de{" "}
                    {pct(FISCALITE.pfuIR)} au titre de l'IR, plus{" "}
                    {pct(FISCALITE.prelevementsSociaux.per)} de prélèvements sociaux
                  </td>
                  <td>
                    Avant 8 ans : gains au prélèvement forfaitaire unique ({pct(FISCALITE.pfuIR)}{" "}
                    d'IR) ou au barème sur option, plus {pct(FISCALITE.prelevementsSociaux.assuranceVie)}{" "}
                    de prélèvements sociaux. Après 8 ans : abattement annuel de{" "}
                    {euros(FISCALITE.avAbattementAnnuelSeul)} (personne seule) ou{" "}
                    {euros(FISCALITE.avAbattementAnnuelCouple)} (couple), puis taux réduit de{" "}
                    {pct(FISCALITE.avTauxReduitApres8Ans)} au-delà, sous conditions de versements
                  </td>
                </tr>
                <tr>
                  <td><strong>Prélèvements sociaux</strong></td>
                  <td>{pct(FISCALITE.prelevementsSociaux.per)} (LFSS 2026)</td>
                  <td>{pct(FISCALITE.prelevementsSociaux.assuranceVie)} (non concerné par la hausse LFSS 2026)</td>
                </tr>
                <tr>
                  <td><strong>Sortie en rente</strong></td>
                  <td>Possible, rente viagère imposée selon le régime des pensions (part correspondant aux versements déduits) ou des rentes viagères à titre onéreux (part correspondant aux versements non déduits et aux gains)</td>
                  <td>Possible, rente viagère à titre onéreux : seule une fraction est imposable, décroissante selon l'âge au premier versement de la rente</td>
                </tr>
                <tr>
                  <td><strong>Succession</strong></td>
                  <td>Intègre l'actif successoral selon des règles fiscales spécifiques à chaque compartiment (assurance ou compte-titres) du plan ; cadre généralement moins favorable qu'un décès en assurance-vie avant 70 ans</td>
                  <td>
                    Abattement de {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} par
                    bénéficiaire pour les versements effectués avant 70 ans (hors actif
                    successoral) ; abattement collectif de{" "}
                    {euros(TRANSMISSION.abattementSuccessionAvApres70Collectif)} pour l'ensemble
                    des bénéficiaires sur les versements après 70 ans
                  </td>
                </tr>
                <tr>
                  <td><strong>Frais typiques</strong></td>
                  <td>Frais de gestion annuels et frais des supports comparables à une assurance-vie, variables selon l'assureur et le contrat</td>
                  <td>
                    De l'ordre de {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)} de frais de
                    gestion annuels selon le distributeur, hors frais des supports
                  </td>
                </tr>
                <tr>
                  <td><strong>Profil type</strong></td>
                  <td>TMI de {pct(FISCALITE.tmiOptions[2])} et plus, horizon long jusqu'à la retraite, épargne de précaution déjà constituée</td>
                  <td>Tous profils ; indispensable dès qu'un besoin de souplesse ou un objectif de transmission existe</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les montants, abattements et taux de ce tableau sont ceux en vigueur en{" "}
            {HYPOTHESES_MAJ} ; chaque loi de finances peut les faire évoluer, et ils doivent être
            revérifiés avant toute décision.
          </p>

          <h2 id="tmi-horizon">PER ou assurance-vie selon la TMI et l'horizon : le calcul chiffré</h2>
          <p>
            Pour sortir du débat de principe, voici un calcul volontairement simple, à coût réel
            égal : {euros(E.versementPerBrut)} versés sur un PER, soit un effort réel diminué de
            l'économie d'impôt, comparés à un versement de même effort réel sur une assurance-vie.
            Hypothèse de croissance purement illustrative : {pct(rendement)} par an net de frais,
            identique dans les deux enveloppes, sortie en capital en une seule fois au terme de
            l'horizon, personne seule. Ce n'est ni une prévision ni un rendement garanti.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>TMI à l'entrée</th>
                  <th>TMI à la sortie</th>
                  <th>Économie d'impôt immédiate (PER)</th>
                  <th>Net après impôt, PER, à {E.horizonReference} ans</th>
                  <th>Net après impôt, assurance-vie, à {E.horizonReference} ans</th>
                  <th>Écart PER − AV</th>
                </tr>
              </thead>
              <tbody>
                {E.couplesTmi.map((c) => {
                  const r = comparer(c.entree, c.sortie, E.horizonReference);
                  return (
                    <tr key={`${c.entree}-${c.sortie}`}>
                      <td>{pct(c.entree)}</td>
                      <td>{pct(c.sortie)}</td>
                      <td>{euros(r.economie)}</td>
                      <td>{euros(r.netPer)}</td>
                      <td>{euros(r.netAv)}</td>
                      <td>{r.ecart >= 0 ? "+" : "−"}{euros(Math.abs(r.ecart))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p>
            Lecture : tout se joue sur l'écart entre la TMI d'entrée et la TMI de sortie. Quand les
            deux sont identiques et basses, le PER n'apporte rien de plus que l'assurance-vie,
            voire un peu moins sur les horizons courts, alors que celle-ci reste libre d'accès. Quand la TMI d'entrée est nettement supérieure
            à celle de sortie, le PER prend de l'avance. L'écart varie aussi avec la durée :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>TMI entrée → sortie</th>
                  {E.horizonsAnnees.map((n) => (
                    <th key={n}>Écart PER − AV à {n} ans</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {E.couplesTmi.map((c) => (
                  <tr key={`h-${c.entree}-${c.sortie}`}>
                    <td>{pct(c.entree)} → {pct(c.sortie)}</td>
                    {E.horizonsAnnees.map((n) => {
                      const r = comparer(c.entree, c.sortie, n);
                      return (
                        <td key={n}>{r.ecart >= 0 ? "+" : "−"}{euros(Math.abs(r.ecart))}</td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Avec des prélèvements sociaux de {pct(psPer)} pour le PER contre {pct(psAv)} pour
            l'assurance-vie sur les gains, une part de l'avantage du PER est rognée mais
            l'essentiel du résultat vient de la déduction. Pour affiner selon votre âge, notre guide{" "}
            <a href="/guide/per-ou-assurance-vie-selon-age-et-tmi">PER ou assurance-vie selon l'âge
            et la TMI</a> prolonge ce tableau.
          </p>

          <h2 id="plafond">Combien le PER peut-il vous faire économiser ? Le plafond de déduction</h2>
          <p>
            L'avantage du PER est borné : les versements volontaires sont déductibles dans la
            limite de {pct(PER_PLAFOND.tauxRevenusActivite)} des revenus d'activité de l'année
            précédente (retenus dans la limite de {PER_PLAFOND.multiplePassMaximum} fois le plafond
            annuel de la sécurité sociale), avec un plancher de {pct(PER_PLAFOND.tauxPlancherPass)}{" "}
            de ce plafond. Les versements ne sont plus déductibles à partir de{" "}
            {PER_PLAFOND.ageFinDeduction} ans (règle en vigueur depuis le 1er janvier 2026). Pour les
            versements de 2026, la base est le plafond de la sécurité sociale 2025
            ({euros(PER_PLAFOND.pass2025)}).
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Revenu net imposable 2025 (illustratif)</th>
                  <th>TMI supposée</th>
                  <th>Plafond de déduction, versements 2026</th>
                  <th>Économie d'impôt maximale</th>
                </tr>
              </thead>
              <tbody>
                {profilsPlafond.map((p) => (
                  <tr key={p.id}>
                    <td>{euros(p.salaire)}</td>
                    <td>{pct(p.tmi)}</td>
                    <td>{euros(plafondPer(p.salaire))}</td>
                    <td>{euros((plafondPer(p.salaire) * p.tmi) / 100)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Ces plafonds sont des ordres de grandeur pour un salarié sans autre élément venant
            les modifier (report des plafonds non utilisés, cotisations d'entreprise, etc.) : le
            détail est dans notre guide{" "}
            <a href="/guide/plafond-per-versement-avant-31-decembre-2026">plafond PER et versement
            avant le 31 décembre 2026</a>. Au-delà du plafond, l'assurance-vie prend le relais
            naturellement, sans limite de versement.
          </p>

          <h2 id="profils">Quatre profils illustratifs</h2>
          <p>
            Composites pédagogiques, qui ne décrivent aucun cas réel, avec un départ à{" "}
            {ageDepart} ans et la même hypothèse de {pct(rendement)} par an que ci-dessus. Pour le
            dernier profil, l'horizon étant inférieur à {dureeAv} ans, l'assurance-vie est supposée
            ouverte aujourd'hui : elle n'a donc pas encore l'abattement de l'après-{dureeAv} ans.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Profil</th>
                  <th>TMI actuelle → à la retraite</th>
                  <th>Horizon</th>
                  <th>Net PER</th>
                  <th>Net AV</th>
                  <th>Lecture</th>
                </tr>
              </thead>
              <tbody>
                {profilsIllustratifs.map((p) => (
                  <tr key={p.id}>
                    <td>{p.age} ans</td>
                    <td>{pct(p.tmi)} → {pct(p.tmiRetraite)}</td>
                    <td>{p.horizon} ans</td>
                    <td>{euros(p.netPer)}</td>
                    <td>{euros(p.netAv)}</td>
                    <td>{lecture[p.id]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Dans tous les cas, la question de la liquidité n'apparaît pas dans ces chiffres : un
            PER bloqué ne peut pas financer un projet imprévu, une assurance-vie le peut. C'est
            pourquoi la répartition entre les deux se décide au cas par cas, et pas sur le seul
            écart chiffré. Voir aussi{" "}
            <a href="/strategies/assurance-vie-retraite">la stratégie assurance-vie pour la
            retraite</a>.
          </p>

          <h2 id="limites">Les limites de ce calcul</h2>
          <ul>
            <li>Une sortie unique en capital : en réalité, des rachats étalés sur plusieurs années utilisent l'abattement annuel de l'assurance-vie à chaque fois ({euros(FISCALITE.avAbattementAnnuelSeul)} personne seule, {euros(FISCALITE.avAbattementAnnuelCouple)} couple), ce qui améliore le résultat de l'assurance-vie.</li>
            <li>Un capital PER retiré d'un coup s'ajoute aux autres revenus de l'année et peut faire monter la TMI de sortie : étaler les retraits ou choisir la rente change le résultat. Voir <a href="/guide/fiscalite-sortie-per">la fiscalité de sortie du PER</a>.</li>
            <li>Le rendement net est identique dans les deux enveloppes et n'est qu'une hypothèse ; frais, supports et années de marché baissier changeraient les montants.</li>
            <li>La TMI future est inconnue : barème, situation familiale et revenus de retraite évolueront. Pour l'enchaînement des retraits, voir <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement à la retraite</a>.</li>
            <li>Les règles de succession ne sont pas chiffrées ici : elles favorisent généralement l'assurance-vie.</li>
          </ul>

          <h2 id="cas-usage">Les cas d'usage typiques</h2>
          <h3>Le PER prend l'avantage quand…</h3>
          <ul>
            <li>Votre TMI actuelle est de {pct(FISCALITE.tmiOptions[2])}, {pct(FISCALITE.tmiOptions[3])} ou {pct(FISCALITE.tmiOptions[4])}, et vous anticipez une TMI plus faible à la retraite ;</li>
            <li>Vous avez déjà une épargne disponible suffisante et pouvez immobiliser sans risque de regret ;</li>
            <li>Vous cherchez une discipline d'épargne « sanctuarisée » pour la retraite.</li>
          </ul>
          <h3>L'assurance-vie prend l'avantage quand…</h3>
          <ul>
            <li>Votre TMI est de {pct(FISCALITE.tmiOptions[1])} (la déduction PER rapporte peu, et la fiscalité de sortie peut l'annuler) ;</li>
            <li>Votre horizon ou vos projets sont incertains — mobilité, aide aux enfants, travaux ;</li>
            <li>La transmission fait partie de vos objectifs, avec l'abattement de{" "}
              {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} par bénéficiaire pour les versements avant 70 ans ;</li>
            <li>Vous voulez pouvoir piloter vos revenus de retraite par rachats programmés, avec l'abattement annuel après 8 ans.</li>
          </ul>

          <h2 id="dosage">Le vrai réglage : le dosage, pas le duel</h2>
          <p>
            Dans la pratique, la plupart des stratégies solides combinent les deux : le PER pour
            capter la déduction à hauteur du plafond utile (et pas au-delà), l'assurance-vie pour
            la souplesse, la succession et la décumulation par rachats. La bonne répartition dépend
            de trois paramètres : votre TMI, votre horizon et votre besoin de liquidité. Le fonds
            en euros, disponible dans les deux enveloppes, a servi en moyenne{" "}
            {pct(RENDEMENTS.fondsEuros.moyen)} en {RENDEMENTS.fondsEuros.periode} (moyenne de
            marché France Assureurs / ACPR, avant prélèvements sociaux) — un repère de rendement
            prudent, à ne jamais confondre avec une promesse pour les années à venir.
          </p>

          <div className="note">
            Ça dépend de votre TMI, de votre horizon et de votre besoin de liquidité — c'est
            exactement ce qu'on regarde en bilan. Quinze minutes suffisent souvent à trancher.
          </div>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on avoir un PER et une assurance-vie en même temps ?</h3>
          <p>
            Oui, et c'est même la configuration la plus fréquente chez les épargnants qui ont
            construit une stratégie retraite réfléchie : le PER capte la déduction fiscale sur les
            versements les plus utiles compte tenu de la TMI, l'assurance-vie assure la souplesse
            et la transmission. Les deux enveloppes ne sont pas concurrentes, elles sont
            complémentaires.
          </p>
          <h3>Le PER est-il vraiment bloqué jusqu'à la retraite ?</h3>
          <p>
            Oui, sauf cas de déblocage anticipé prévus par la loi (achat de la résidence
            principale, invalidité, décès du conjoint, surendettement, expiration des droits au
            chômage, cessation d'activité non salariée à la suite d'une liquidation judiciaire,
            notamment). En dehors de ces cas, l'épargne reste immobilisée jusqu'à l'âge légal de
            départ à la retraite ou son équivalent.
          </p>
          <h3>Que se passe-t-il si je change de TMI entre le versement et la retraite ?</h3>
          <p>
            C'est précisément le pari implicite du PER : vous déduisez au taux de votre TMI
            actuelle, et vous êtes imposé au taux de votre TMI au moment du retrait. Si votre TMI
            baisse à la retraite (ce qui est fréquent, les revenus de remplacement étant souvent
            inférieurs aux revenus d'activité), l'opération est en général favorable ; si votre TMI reste
            identique ou grimpe, l'avantage se réduit, voire s'annule.
          </p>
          <h3>L'abattement de l'assurance-vie après 8 ans s'applique-t-il aussi au PER ?</h3>
          <p>
            Non. L'abattement annuel de {euros(FISCALITE.avAbattementAnnuelSeul)} (personne seule)
            ou {euros(FISCALITE.avAbattementAnnuelCouple)} (couple) après 8 ans est un mécanisme
            propre à l'assurance-vie. Le PER suit un régime fiscal de sortie différent, fondé sur
            la distinction entre versements déduits (imposés au barème) et gains (au prélèvement
            forfaitaire), sans notion d'ancienneté du contrat.
          </p>
          <h3>Peut-on transférer un PER vers une assurance-vie, ou l'inverse ?</h3>
          <p>
            Non, ce sont deux enveloppes juridiquement distinctes : on ne transfère pas l'épargne
            de l'une vers l'autre sans un rachat (PER : sortie anticipée dans les cas légaux
            uniquement) ou un retrait (assurance-vie), avec la fiscalité de sortie correspondante.
            En revanche, un PER peut être transféré vers un autre PER, alors qu'une assurance-vie
            ne peut pas, en principe, être transférée vers un autre assureur sans perdre
            l'antériorité fiscale (hors transfert « Fourgous » chez le même assureur).
          </p>
          <h3>Le PER est-il intéressant pour une TMI à {pct(FISCALITE.tmiOptions[1])} ?</h3>
          <p>
            Rarement de façon isolée : la déduction rapporte peu à ce niveau de TMI, et rien ne
            garantit que la TMI restera aussi basse au moment du retrait — auquel cas la fiscalité
            de sortie peut annuler l'avantage obtenu à l'entrée. L'assurance-vie, sans avantage à
            l'entrée mais avec une fiscalité de sortie prévisible et un abattement après 8 ans, est
            souvent plus adaptée à ce profil.
          </p>
          <h3>Le PER est-il plus avantageux que l'assurance-vie pour la retraite ?</h3>
          <p>
            Pas systématiquement. Il l'est quand votre TMI d'aujourd'hui est nettement supérieure à
            celle que vous aurez à la retraite et que vous pouvez immobiliser l'argent. Quand les
            deux TMI sont proches et basses, l'écart devient faible (voir le tableau ci-dessus) et la
            liquidité de l'assurance-vie pèse davantage.
          </p>
          <h3>Quel âge minimum ou maximum pour verser sur un PER avec déduction ?</h3>
          <p>
            Il n'y a pas d'âge minimum de versement, mais les versements ne sont plus déductibles à
            partir de {PER_PLAFOND.ageFinDeduction} ans (règle en vigueur depuis le 1er janvier 2026).
            L'assurance-vie, elle, n'a pas de limite d'âge pour les versements, avec une fiscalité
            successorale différente avant et après 70 ans.
          </p>
          <h3>Les prélèvements sociaux à {pct(psPer)} sur le PER changent-ils la réponse ?</h3>
          <p>
            Ils réduisent un peu l'avantage du PER sur les gains, face aux {pct(psAv)} de
            l'assurance-vie, mais sans inverser le résultat quand la déduction à l'entrée est
            significative. Ils pèsent davantage sur un profil à faible TMI, où la déduction est
            petite.
          </p>
          <h3>Combien de temps faut-il garder une assurance-vie pour qu'elle soit intéressante ?</h3>
          <p>
            Le cap fiscal est de {dureeAv} ans : après cette durée, les gains rachetés bénéficient
            d'un abattement annuel puis du taux réduit de {pct(FISCALITE.avTauxReduitApres8Ans)}.
            Mais l'argent reste disponible avant, avec un coût fiscal plus élevé sur les gains.
            D'où l'intérêt d'ouvrir un contrat tôt, même avec un petit versement.
          </p>
          <h3>Mon employeur propose un PER collectif : cela change-t-il le choix ?</h3>
          <p>
            Oui, parce que l'abondement de l'employeur est un apport que vous ne trouverez pas
            dans une assurance-vie. Il faut toutefois regarder les frais des supports proposés et
            les conditions de déblocage ; notre guide{" "}
            <a href="/guide/meilleure-assurance-vie-retraite">meilleure assurance-vie pour la
            retraite</a> détaille les critères de choix côté assurance-vie.
          </p>
          <h3>Où trouver d'autres comparatifs sur le calcul de l'épargne à constituer ?</h3>
          <p>
            Notre guide{" "}
            <a href="/guide/combien-epargner-par-mois-pour-la-retraite-selon-age">combien épargner
            par mois pour la retraite selon l'âge</a> chiffre l'effort mensuel, et{" "}
            <a href="/guide/capital-retraite-objectif-et-construction">le capital retraite :
            objectif et construction</a> montre comment fixer un objectif.
          </p>
          <h3>Faut-il privilégier la sortie en capital ou en rente ?</h3>
          <p>
            Cela dépend de votre besoin de disposer librement du capital, de votre situation de
            santé et de vos objectifs de transmission : la rente sécurise un revenu à vie mais
            fige le capital au profit de l'assureur au-delà de l'espérance de vie statistique,
            tandis que le capital reste disponible et transmissible mais expose au risque de
            l'épuiser trop tôt. C'est un arbitrage qui se travaille au cas par cas, pas une règle
            générale.
          </p>

          <h2>Notre analyse, en synthèse</h2>
          <p>
            Le duel PER contre assurance-vie n'a pas de vainqueur universel, et se méfier de toute
            réponse tranchée sur le sujet est un bon réflexe : le PER gagne sur la déduction à
            l'entrée pour une TMI élevée, l'assurance-vie gagne sur la disponibilité et la
            transmission. Aucune des deux enveloppes ne remplace l'autre — elles répondent à deux
            moments différents du calendrier fiscal.
          </p>
          <p>
            Ne pas trancher cette question a un coût réel : verser sur un PER sans avoir de
            visibilité sur sa TMI de sortie, ou l'inverse, négliger l'assurance-vie par
            méconnaissance de sa fiscalité de sortie réellement douce après 8 ans, peut coûter
            sensiblement sur la durée. Pour resituer ce duel dans le paysage
            complet des enveloppes retraite, au-delà du seul PER et de la seule assurance-vie,
            notre guide{" "}
            <a href="/guide/meilleure-enveloppe-retraite">quelle est la meilleure enveloppe pour
            préparer sa retraite ?</a> élargit la focale au PEA et au compte-titres. Côté
            assurance-vie, le{" "}
            <a href="/guide/assurance-vie-apres-8-ans-fiscalite-et-rente">guide de l'assurance-vie
            après 8 ans</a> et le{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">rachat partiel d'assurance-vie</a>{" "}
            détaillent la sortie ; et si c'est
            spécifiquement le duel PEA/PER qui vous intéresse, notre guide{" "}
            <a href="/guide/pea-ou-per-pour-la-retraite">PEA ou PER pour la retraite</a> le traite
            en détail.
          </p>
          <p>
            Notre rôle n'est pas de vous orienter par défaut vers l'une ou l'autre enveloppe, mais
            d'appliquer cette grille de lecture à votre situation réelle — votre TMI actuelle et
            anticipée, votre horizon, votre besoin de liquidité et vos objectifs de transmission —
            pour déterminer le bon dosage entre PER et assurance-vie. C'est ce que nous faisons
            lors d'un <a href="/bilan-retraite">bilan retraite gratuit</a> : quinze minutes
            suffisent souvent à trancher, chiffres en main.
          </p>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle. Les
              montants, abattements et taux cités sont les barèmes en vigueur en{" "}
              {HYPOTHESES_MAJ} (illustrations recalculées en {E.maj}), susceptibles d'évoluer à
              chaque loi de finances ; les calculs illustratifs reposent sur des hypothèses
              simplificatrices ; les rendements mentionnés sont des constats passés datés, et les performances passées ne préjugent
              pas des performances futures.
            </p>
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="PER, assurance-vie… ou les deux, dans quelles proportions ?" />
    </>
  );
}
