import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  AV_RACHAT,
  ENVELOPPES_NOV2026,
  FISCALITE,
  PER_AV_AGE_TMI,
  PER_PLAFOND,
  PER_PLAFOND_EXEMPLES,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const tmis = FISCALITE.tmiOptions;
const tmiSorties = [tmis[1], tmis[2]]; // TMI de retraite comparées
const tmiBasse = tmis[1];
const tmiMoyenne = tmis[2];
const tmiHaute = tmis[3];
const tauxPFU = FISCALITE.pfuIR;
const psPer = FISCALITE.prelevementsSociaux.per;
const psAv = FISCALITE.prelevementsSociaux.assuranceVie;
const tauxReduit = FISCALITE.avTauxReduitApres8Ans;
const abattement = FISCALITE.avAbattementAnnuelSeul;
const duree = AV_RACHAT.dureeTauxReduitAnnees;
const ageDepart = ENVELOPPES_NOV2026.ageDepartReference;
const ageFinDeduction = PER_PLAFOND.ageFinDeduction;
const V = PER_PLAFOND_EXEMPLES.versementUnitaire; // 1 000 €
const maj = PER_AV_AGE_TMI.maj;

const r2 = (n) => Math.round(n * 100) / 100;
const part = (base, taux) => r2((base * taux) / 100);

// ---- Hypothèse de calcul : gains à la sortie, en % du versement (non un rendement attendu) ----
const G = part(V, PER_AV_AGE_TMI.gainsIllustratifsPct);
const capitalSortie = V + G;

// Impôt sur les gains à la sortie
const gainsPer = part(G, tauxPFU + psPer);
// AV, contrat d'au moins 8 ans : gains sous l'abattement annuel → IR nul si gains <= abattement
const baseIrAv8 = Math.max(G - abattement, 0);
const gainsAv8 = r2(part(baseIrAv8, tauxReduit) + part(G, psAv));
// AV, contrat de moins de 8 ans : 12,8 % + prélèvements sociaux
const gainsAvMoins8 = part(G, tauxPFU + psAv);

// Avantage net du PER sur l'AV pour V versés, à TMI d'entrée t et TMI de sortie y :
// économie à l'entrée − impôt de sortie sur les versements − surcoût fiscal sur les gains.
const economieEntree = (t) => part(V, t);
const impotSortieVersements = (y) => part(V, y);
const avantage = (t, y, gainsAv) => r2(economieEntree(t) - impotSortieVersements(y) - (gainsPer - gainsAv));

// Détail d'un cas médian : entrée à TMI moyenne, sortie à TMI basse
const casEntree = tmiMoyenne;
const casSortie = tmiBasse;
const casEco = economieEntree(casEntree);
const casImpotVers = impotSortieVersements(casSortie);
const casSurcout = r2(gainsPer - gainsAv8);
const casAvantage = avantage(casEntree, casSortie, gainsAv8);
const casNetPer = r2(capitalSortie - casImpotVers - gainsPer + casEco);
const casNetAv = r2(capitalSortie - gainsAv8);

// Point mort : TMI de sortie pour laquelle l'avantage s'annule (à TMI d'entrée donnée)
const pointMort = (t) => r2(t - ((gainsPer - gainsAv8) / V) * 100);

// Variante : l'économie d'impôt d'entrée est elle-même placée sur une assurance-vie de plus de
// 8 ans, avec la même hypothèse de gains (sous l'abattement : seuls les prélèvements sociaux).
const gainEconomieReplacee = (t) => {
  const gainsEco = part(economieEntree(t), PER_AV_AGE_TMI.gainsIllustratifsPct);
  return r2(gainsEco - part(gainsEco, psAv));
};
const avantageReplace = (t, y) => r2(avantage(t, y, gainsAv8) + gainEconomieReplacee(t));

// Lecture par âge
const profils = PER_AV_AGE_TMI.agesProfils.map((age) => {
  const horizon = Math.max(ageDepart - age, 0);
  const avAnciennete = horizon >= duree;
  return {
    age,
    horizon,
    avAnciennete,
    gainsAv: avAnciennete ? gainsAv8 : gainsAvMoins8,
    anneesDeduction: Math.max(ageFinDeduction - age, 0),
  };
});

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : cotisations d'épargne retraite (déduction), fiche F14709, vérifiée le 15 avril 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14709",
  },
  {
    label:
      "Légifrance — Code général des impôts, article 163 quatervicies (version en vigueur depuis le 21 février 2026)",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038836248/",
  },
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : comment sont imposés les revenus d'un contrat d'assurance-vie ? Fiche F22414, vérifiée le 15 avril 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22414",
  },
  {
    label:
      "Service-Public.fr — Sortie du plan d'épargne retraite, fiche F1419",
    url: "https://www.service-public.fr/particuliers/vosdroits/F1419",
  },
  {
    label:
      "BOFiP — BOI-RPPM-RCM-20-15, modalités d'imposition à l'impôt sur le revenu (version en vigueur depuis le 21 juin 2021) : taux de 12,8 % et de 7,5 %, seuil de 150 000 €",
    url: "https://bofip.impots.gouv.fr/bofip/11224-PGP.html",
  },
  {
    label:
      "impots.gouv.fr — Les revenus mobiliers (mise à jour du 8 avril 2026) : prélèvements sociaux à 18,6 % depuis le 1er janvier 2026, produits d'assurance-vie restant à 17,2 %",
    url: "https://www.impots.gouv.fr/particulier/les-revenus-mobiliers",
  },
  {
    label:
      "impots.gouv.fr — Comment sont déterminées mes tranches d'imposition ?",
    url: "https://www.impots.gouv.fr/particulier/questions/comment-sont-determinees-mes-tranches-dimposition",
  },
];

export default function GuidePerOuAvSelonAgeTmi() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide prix · PER et assurance-vie</span>
          <h1>PER ou assurance-vie : que choisir selon votre âge et votre TMI ?</h1>
          <p className="sub">
            Économie d'impôt à l'entrée, impôt à la sortie, ancienneté du contrat : une grille de
            lecture chiffrée pour {profils.map((p) => p.age).join(", ")} ans, avec cinq TMI.
            Mis à jour en {maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le PER ne « rapporte » vraiment que si votre tranche
              marginale d'imposition (TMI) à l'entrée dépasse celle que vous aurez à la sortie. Pour {euros(V)} versés, la déduction vaut {euros(economieEntree(tmiMoyenne))} à{" "}
              {pct(tmiMoyenne)} et {euros(economieEntree(tmiHaute))} à {pct(tmiHaute)}, mais
              ces versements seront imposés au barème à la retraite et les gains du PER
              supportent {pct(tauxPFU)} d'impôt et {pct(psPer)} de prélèvements sociaux. Dans
              l'illustration de ce guide, l'avantage du PER sur l'assurance-vie ouverte depuis{" "}
              {duree} ans va de {euros(avantage(tmis[0], tmiMoyenne, gainsAv8))} à{" "}
              {euros(avantage(tmis[4], tmiBasse, gainsAv8))} selon les TMI. L'âge intervient
              surtout par la durée de détention : elle conditionne le régime de l'assurance-vie
              et le temps pendant lequel l'épargne est bloquée.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#principe">Pourquoi l'âge et la TMI décident-ils plus que le produit ?</a></li>
              <li><a href="#tableau">Combien le PER fait-il économiser selon la TMI d'entrée et de sortie ?</a></li>
              <li><a href="#exemple">Un cas détaillé, ligne par ligne</a></li>
              <li><a href="#ages">Que change l'âge : 35, 45, 55 ou 60 ans ?</a></li>
              <li><a href="#tmi">Que faire selon votre TMI ?</a></li>
              <li><a href="#limites">Ce que ce calcul ne dit pas</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            « PER ou assurance-vie ? » est une question qui se pose presque toujours mal. On la
            formule comme un match entre deux produits, alors que les deux enveloppes servent des
            logiques fiscales différentes : l'un accorde un avantage tout de suite et le reprend
            plus tard, l'autre n'offre rien à l'entrée mais traite plutôt bien les gains après{" "}
            {duree} ans. Le résultat dépend donc de deux nombres que vous connaissez déjà, ou
            que vous pouvez estimer : votre TMI aujourd'hui et votre TMI probable à la retraite.
          </p>
          <p>
            Ce guide ne refait pas le{" "}
            <a href="/guide/per-vs-assurance-vie-retraite">comparatif général PER et assurance-vie</a>,
            ni l'analyse de la{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a>. Il isole une
            seule question : à quel âge, et avec quelle TMI, l'écart devient-il favorable à
            l'un ou à l'autre ? Les chiffres sont calculés pour {euros(V)} versés, ce qui permet
            de les mettre à l'échelle de votre propre versement. Ce sont des illustrations,
            sans lien avec un cas réel, et pas des prévisions.
          </p>

          <h2 id="principe">Pourquoi l'âge et la TMI décident-ils plus que le produit ?</h2>
          <p>
            Le PER déplace l'impôt dans le temps. Les versements volontaires sont déductibles du
            revenu imposable dans la limite de votre plafond (voir le{" "}
            <a href="/guide/plafond-per-versement-avant-31-decembre-2026">guide sur le plafond de déduction</a>),
            à la condition de ne pas dépasser {ageFinDeduction} ans : depuis le 1er janvier
            2026, ils ne sont plus déductibles au-delà. Vous économisez donc votre TMI sur chaque
            euro versé. À la sortie en capital, la part correspondant à ces versements entre dans
            le revenu imposable de l'année, au barème, sans prélèvements sociaux ; la part de
            gains est soumise au prélèvement forfaitaire, soit {pct(tauxPFU)} d'impôt, plus{" "}
            {pct(psPer)} de prélèvements sociaux depuis 2026.
          </p>
          <p>
            L'assurance-vie fonctionne à l'inverse : aucun avantage à l'entrée, mais seule la
            part de gains d'un rachat est imposée. Pour les versements effectués depuis le{" "}
            {AV_RACHAT.datePivotPrimes}, le taux d'impôt est de {pct(tauxPFU)} avant {duree} ans,
            puis de {pct(tauxReduit)} après {duree} ans, au-delà d'un abattement annuel de{" "}
            {euros(abattement)} de gains pour une personne seule. Les prélèvements sociaux de{" "}
            {pct(psAv)} restent dus. Le détail est dans notre guide sur le{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">rachat partiel d'assurance-vie</a>.
          </p>
          <p>
            Deux notions suffisent donc : l'écart entre TMI d'entrée et TMI de sortie pour le PER,
            et l'ancienneté du contrat à la date des retraits pour l'assurance-vie. L'âge agit
            sur les deux, mais indirectement.
          </p>

          <h2 id="tableau">Combien le PER fait-il économiser selon la TMI d'entrée et de sortie ?</h2>
          <p>
            Le tableau compare {euros(V)} versés sur un PER avec {euros(V)} placés sur une
            assurance-vie ouverte depuis au moins {duree} ans à la sortie. Hypothèse de calcul,
            identique pour les deux enveloppes : les gains représentent {pct(PER_AV_AGE_TMI.gainsIllustratifsPct)} du
            versement à la sortie, soit {euros(G)} de gains. Ce n'est pas un rendement attendu ni
            garanti : le résultat réel peut être très différent, y compris négatif. La colonne
            « avantage » se lit ainsi : économie d'impôt à l'entrée, moins l'impôt de sortie sur
            les {euros(V)} de versements, moins le surcoût fiscal des gains du PER par rapport à
            l'assurance-vie.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>TMI à l'entrée</th>
                  <th>Économie d'impôt à l'entrée</th>
                  {tmiSorties.map((y) => (
                    <th key={y}>Impôt de sortie sur les versements, TMI {pct(y)}</th>
                  ))}
                  {tmiSorties.map((y) => (
                    <th key={"a" + y}>Avantage net du PER, sortie à {pct(y)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tmis.map((t) => (
                  <tr key={t}>
                    <td>{pct(t)}</td>
                    <td>{euros(economieEntree(t))}</td>
                    {tmiSorties.map((y) => (
                      <td key={y}>{euros(impotSortieVersements(y))}</td>
                    ))}
                    {tmiSorties.map((y) => (
                      <td key={"a" + y}>
                        <strong>{euros(avantage(t, y, gainsAv8))}</strong>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Un avantage négatif ne signifie pas que le PER est « mauvais » : il indique que
            l'économie d'impôt ne compense pas, dans ce scénario, le coût fiscal de sortie. Trois
            lectures ressortent. À une TMI d'entrée de {pct(tmis[0])}, la déduction ne rapporte
            rien : le PER est fiscalement perdant dans toutes les colonnes. À {pct(tmiBasse)}, il
            est perdant dans les deux colonnes ; il ne s'en sortirait qu'avec une sortie à {pct(tmis[0])}
            (cas non reproduit dans le tableau). À {pct(tmiMoyenne)} et au-dessus, le
            PER reste favorable tant que la TMI de retraite est inférieure d'environ{" "}
            {r2(tmiMoyenne - pointMort(tmiMoyenne)).toLocaleString("fr-FR")} points au moins à
            celle de l'entrée ; en deçà de cet écart, c'est l'assurance-vie qui l'emporte, dans
            cette convention de calcul.
          </p>
          <div className="note">
            <p>
              Convention à garder en tête : ce tableau compte l'économie d'impôt d'entrée pour sa
              valeur nominale, sans la faire fructifier, ce qui désavantage le PER. Si cette
              économie était elle-même placée sur une assurance-vie de plus de {duree} ans avec la
              même hypothèse de gains, l'avantage du PER augmenterait de{" "}
              {euros(gainEconomieReplacee(tmiMoyenne))} à {pct(tmiMoyenne)} et de{" "}
              {euros(gainEconomieReplacee(tmiHaute))} à {pct(tmiHaute)} : à TMI égale de{" "}
              {pct(tmiMoyenne)} à l'entrée et à la sortie, il passerait de{" "}
              {euros(avantage(tmiMoyenne, tmiMoyenne, gainsAv8))} à{" "}
              {euros(avantageReplace(tmiMoyenne, tmiMoyenne))}. Notre{" "}
              <a href="/guide/per-vs-assurance-vie-retraite">comparatif PER ou assurance-vie</a>{" "}
              raisonne, lui, à effort réel égal : ses écarts sont plus favorables au PER.
            </p>
          </div>
          <p>
            Si l'assurance-vie a moins de {duree} ans au moment des retraits, ses gains sont
            taxés à {pct(r2(tauxPFU + psAv))} au total ({euros(gainsAvMoins8)} sur {euros(G)} de
            gains) au lieu de {euros(gainsAv8)} : l'avantage du PER s'améliore alors de{" "}
            {euros(r2(gainsAv8 - gainsAvMoins8) * -1)} par {euros(V)} dans toutes les cases. C'est
            un point important pour les épargnants qui ouvrent un contrat tard.
          </p>

          <h2 id="exemple">Un cas détaillé, ligne par ligne</h2>
          <p>
            Profil illustratif : un cadre imposé à {pct(casEntree)} pendant sa vie active, qui
            anticipe une TMI de {pct(casSortie)} à la retraite. Il compare {euros(V)} versés sur
            un PER et {euros(V)} placés sur une assurance-vie de plus de {duree} ans.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Poste</th>
                  <th>PER</th>
                  <th>Assurance-vie (plus de {duree} ans)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Effort d'épargne</td>
                  <td>{euros(V)}</td>
                  <td>{euros(V)}</td>
                </tr>
                <tr>
                  <td>Économie d'impôt à l'entrée ({pct(casEntree)})</td>
                  <td>+ {euros(casEco)}</td>
                  <td>0 €</td>
                </tr>
                <tr>
                  <td>Capital à la sortie, avant impôt (hypothèse : {euros(G)} de gains)</td>
                  <td>{euros(capitalSortie)}</td>
                  <td>{euros(capitalSortie)}</td>
                </tr>
                <tr>
                  <td>Impôt sur la part « versements » (barème, {pct(casSortie)})</td>
                  <td>− {euros(casImpotVers)}</td>
                  <td>Non imposée</td>
                </tr>
                <tr>
                  <td>Impôt et prélèvements sociaux sur les gains</td>
                  <td>
                    − {euros(gainsPer)} ({pct(tauxPFU)} + {pct(psPer)})
                  </td>
                  <td>
                    − {euros(gainsAv8)} ({pct(psAv)} de prélèvements sociaux, impôt nul sous
                    l'abattement de {euros(abattement)})
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Résultat net (capital − impôts + économie d'entrée)</strong>
                  </td>
                  <td>
                    <strong>{euros(casNetPer)}</strong>
                  </td>
                  <td>
                    <strong>{euros(casNetAv)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            L'écart de {euros(casAvantage)} en faveur du PER vient presque entièrement de
            l'écart de TMI : {euros(casEco)} économisés au départ, {euros(casImpotVers)} repris à
            la sortie, dont il faut encore retrancher {euros(casSurcout)} de fiscalité
            supplémentaire sur les gains. Si la TMI de retraite était identique à celle de
            l'entrée, l'avantage deviendrait négatif de {euros(casSurcout)} dans cette convention
            (économie d'impôt non replacée), et légèrement positif si l'économie était placée :
            l'écart serait alors trop mince pour justifier à lui seul une épargne bloquée. Les montants ci-dessus ne tiennent
            pas compte du fractionnement de la sortie, de l'option pour le barème sur les gains, ni
            des frais propres à chaque contrat.
          </p>

          <h2 id="ages">Que change l'âge : 35, 45, 55 ou 60 ans ?</h2>
          <p>
            L'âge ne modifie ni les taux ni les barèmes. Il joue sur quatre points : le temps
            avant la retraite (retenue ici à {ageDepart} ans pour simplifier), l'ancienneté que
            l'assurance-vie aura à la sortie, le nombre d'années pendant lesquelles les versements
            restent déductibles, et la probabilité que votre TMI de retraite soit très inférieure
            à celle d'aujourd'hui.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Âge d'ouverture</th>
                  <th>Années avant {ageDepart} ans</th>
                  <th>Assurance-vie à {ageDepart} ans</th>
                  <th>Fiscalité des gains retirés à {ageDepart} ans ({euros(G)} de gains)</th>
                  <th>Piste de réflexion</th>
                </tr>
              </thead>
              <tbody>
                {profils.map((p) => (
                  <tr key={p.age}>
                    <td>{p.age} ans</td>
                    <td>{p.horizon} ans</td>
                    <td>
                      {p.avAnciennete
                        ? `Plus de ${duree} ans : taux réduit et abattement`
                        : `Moins de ${duree} ans : taux de ${pct(tauxPFU)}`}
                    </td>
                    <td>{euros(p.gainsAv)}</td>
                    <td>
                      {p.age <= profils[1].age
                        ? "Le temps joue pour l'assurance-vie, souple et débloquable ; le PER se justifie surtout si la TMI est élevée."
                        : p.avAnciennete
                        ? "Les deux enveloppes sont envisageables ; la TMI de sortie compte davantage que l'âge."
                        : "L'assurance-vie ouverte tard est moins bien traitée : l'écart en faveur du PER se creuse."}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Pour un profil de {profils[0].age} ans, l'enjeu n'est pas le choix de l'enveloppe mais
            la liquidité : {profils[0].horizon} ans d'épargne bloquée, hors cas de déblocage
            anticipé, sont une contrainte réelle, alors que les carrières évoluent et que la TMI
            de retraite est très incertaine. La section de notre guide sur{" "}
            <a href="/guide/a-quel-age-commencer-per">l'âge pour commencer un PER</a> détaille ce
            point.
          </p>
          <p>
            À {profils[1].age} ans, l'horizon permet encore aux deux enveloppes de produire leurs
            effets. Si la TMI est de {pct(tmiHaute)} ou plus, la déduction pèse lourd ; elle pèse
            peu si elle est de {pct(tmiBasse)}.
          </p>
          <p>
            À {profils[2].age} ans, une assurance-vie ouverte maintenant aura{" "}
            {profils[2].horizon >= duree ? `plus de ${duree} ans` : `moins de ${duree} ans`} à{" "}
            {ageDepart} ans. Si vous avez déjà un contrat ancien, il garde son ancienneté : c'est
            souvent l'atout le plus sous-estimé à cet âge. Le PER reste utile en fin de carrière,
            car c'est souvent à ce moment que les revenus et la TMI sont les plus élevés.
          </p>
          <p>
            À {profils[3].age} ans, un contrat ouvert aujourd'hui aura seulement {profils[3].horizon} ans
            d'ancienneté au départ : sans contrat plus ancien, retirer des gains avant {duree} ans
            les expose à {pct(tauxPFU)} d'impôt. Le PER peut alors se défendre avec une TMI haute,
            à condition d'accepter l'indisponibilité de l'épargne jusqu'à la liquidation et de
            vérifier que la sortie ne sera pas imposée à une TMI équivalente. Autre repère : les
            versements cessent d'être déductibles à {ageFinDeduction} ans, soit{" "}
            {profils[3].anneesDeduction} ans de marge à partir de {profils[3].age} ans.
          </p>

          <h2 id="tmi">Que faire selon votre TMI ?</h2>
          <p>
            Ces pistes de réflexion sont générales ; elles ne constituent pas un conseil
            personnalisé.
          </p>
          <ul>
            <li>
              <strong>TMI de {pct(tmis[0])}</strong> : la déduction ne rapporte rien. L'assurance-vie
              (ou un PEA) est en général plus cohérente, sauf objectif spécifique.
            </li>
            <li>
              <strong>TMI de {pct(tmiBasse)}</strong> : l'économie ({euros(economieEntree(tmiBasse))} pour{" "}
              {euros(V)}) reste inférieure au surcoût de sortie dès que la TMI de retraite est
              équivalente. Le PER n'a de sens que dans des cas particuliers, par exemple un pic
              de revenu ponctuel.
            </li>
            <li>
              <strong>TMI de {pct(tmiMoyenne)}</strong> : zone charnière. Tout dépend de la TMI
              anticipée à la retraite : si elle est de {pct(tmiBasse)}, le PER l'emporte ; si
              elle reste proche de {pct(tmiMoyenne)}, l'assurance-vie fait jeu égal ou mieux.
            </li>
            <li>
              <strong>TMI de {pct(tmiHaute)} ou {pct(tmis[4])}</strong> : l'économie d'entrée
              ({euros(economieEntree(tmiHaute))} à {euros(economieEntree(tmis[4]))}) laisse une
              marge importante, même avec une sortie à {pct(tmiMoyenne)}. C'est le cas où le PER
              est le plus souvent étudié, dans la limite du plafond et en gardant une épargne
              disponible à côté.
            </li>
          </ul>
          <p>
            Pour choisir parmi toutes les enveloppes (PEA, immobilier, etc.), consultez{" "}
            <a href="/guide/meilleure-enveloppe-retraite">le guide sur la meilleure enveloppe pour la retraite</a>.
            Une fois constituées, l'ordre de retrait compte aussi :{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement à la retraite</a> explique
            comment éviter de cumuler les deux fiscalités la même année.
          </p>

          <h2 id="limites">Ce que ce calcul ne dit pas</h2>
          <ul>
            <li>
              <strong>Le rendement</strong> : il est supposé identique pour les deux enveloppes,
              ce qui ne dit rien de leurs supports. Les unités de compte présentent un risque de
              perte en capital, et un fonds en euros ne protège pas contre l'inflation.
            </li>
            <li>
              <strong>La liquidité</strong> : l'assurance-vie reste disponible à tout moment,
              l'épargne d'un PER est bloquée jusqu'à la retraite, hors cas de déblocage
              anticipé prévus par la loi.
            </li>
            <li>
              <strong>La transmission</strong> : le traitement successoral diffère entre les
              deux enveloppes et n'est pas couvert ici.
            </li>
            <li>
              <strong>La TMI réelle de sortie</strong> : une sortie en capital massive peut
              changer de tranche ; fractionner la sortie ou choisir la rente modifie le résultat.
              Le guide sur la{" "}
              <a href="/guide/fiscalite-sortie-per">sortie du PER</a> développe cet aspect.
            </li>
            <li>
              <strong>L'évolution des règles</strong> : barèmes, taux de prélèvements sociaux et
              plafonds peuvent changer d'ici votre retraite.
            </li>
          </ul>
          <p>
            Pour approfondir les deux stratégies, voir nos pages{" "}
            <a href="/strategies/per">stratégie PER</a> et{" "}
            <a href="/strategies/assurance-vie-retraite">stratégie assurance-vie pour la retraite</a>.
          </p>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>PER ou assurance-vie : lequel choisir à 35 ans ?</h3>
          <p>
            Il n'y a pas de réponse générale. À {profils[0].age} ans, la contrainte principale du
            PER est le blocage de l'épargne pendant {profils[0].horizon} ans environ. Si votre
            TMI est basse ou si vous n'avez pas encore d'épargne de précaution, l'assurance-vie
            reste plus souple. Avec une TMI de {pct(tmiHaute)} ou plus, l'avantage d'entrée peut
            justifier un PER pour une partie de l'épargne.
          </p>

          <h3>Vaut-il mieux un PER ou une assurance-vie à 55 ans ?</h3>
          <p>
            À {profils[2].age} ans, la durée avant la retraite est courte mais les revenus sont
            souvent élevés. Un PER ouvert à cet âge peut se justifier si la TMI est haute et si
            la TMI de retraite doit baisser nettement. Une assurance-vie déjà ouverte depuis{" "}
            {duree} ans ou plus garde, elle, un traitement favorable des gains.
          </p>

          <h3>À quelle TMI le PER devient-il intéressant ?</h3>
          <p>
            Dans l'illustration de ce guide, avec une sortie à {pct(tmiBasse)}, le PER devient
            favorable à partir d'une TMI d'entrée de {pct(tmiMoyenne)}. À {pct(tmiBasse)}, il ne l'est
            pas, sauf sortie à {pct(tmis[0])}. Ces résultats dépendent des hypothèses retenues
            et ne remplacent pas un calcul sur votre situation.
          </p>

          <h3>Que se passe-t-il si ma TMI ne baisse pas à la retraite ?</h3>
          <p>
            Le PER perd alors l'essentiel de son avantage : l'économie d'entrée est reprise à la
            sortie, et le surcoût fiscal sur les gains ({euros(casSurcout)} dans notre exemple)
            reste à votre charge ; seul le placement de l'économie d'impôt dans l'intervalle peut
            compenser une partie de cet écart. L'épargne est de plus bloquée pendant la durée du plan. Dans ce cas,
            l'assurance-vie est souvent plus cohérente.
          </p>

          <h3>L'assurance-vie est-elle toujours exonérée après {duree} ans ?</h3>
          <p>
            Non. Après {duree} ans, les gains retirés sont exonérés d'impôt sur le revenu
            jusqu'à {euros(abattement)} par an pour une personne seule, mais supportent{" "}
            {pct(psAv)} de prélèvements sociaux. Au-delà de l'abattement, le taux est de{" "}
            {pct(tauxReduit)} ou de {pct(tauxPFU)}, selon le montant des versements.
          </p>

          <h3>Peut-on combiner PER et assurance-vie ?</h3>
          <p>
            Oui, et c'est fréquent : le PER peut capter la déduction sur la partie de revenus
            imposée à la TMI la plus haute, tandis que l'assurance-vie garde la souplesse et une
            fiscalité de sortie lissable. La répartition dépend de votre situation ; le{" "}
            <a href="/bilan-retraite">bilan retraite</a> sert à la situer.
          </p>

          <h3>Jusqu'à quel âge peut-on déduire ses versements PER ?</h3>
          <p>
            Selon les règles en vigueur au {PER_PLAFOND.maj}, les versements volontaires ne sont
            plus déductibles à partir de {ageFinDeduction} ans (depuis le 1er janvier 2026). Le
            plafond annuel dépend de vos revenus d'activité ; voir notre{" "}
            <a href="/guide/plafond-per-versement-avant-31-decembre-2026">guide sur le plafond de déduction</a>.
          </p>

          <h3>Les gains du PER sont-ils taxés comme ceux de l'assurance-vie ?</h3>
          <p>
            Non. À la sortie en capital, les gains d'un PER supportent {pct(tauxPFU)} d'impôt et{" "}
            {pct(psPer)} de prélèvements sociaux, soit {pct(r2(tauxPFU + psPer))}. Ceux d'une
            assurance-vie supportent {pct(psAv)} de prélèvements sociaux, et un impôt de{" "}
            {pct(tauxPFU)} avant {duree} ans ou de {pct(tauxReduit)} après {duree} ans, après
            abattement.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La décision tient en une soustraction : TMI d'entrée moins TMI de sortie, avec un
            seuil à dépasser pour couvrir le surcoût fiscal des gains du PER. À {pct(tmiHaute)}{" "}
            ou {pct(tmis[4])} à l'entrée et une sortie à {pct(tmiBasse)}, l'économie
            est nette ; à {pct(tmis[0])} ou {pct(tmiBasse)}, elle est faible ou nulle. L'âge, lui,
            détermine surtout combien de temps l'épargne restera bloquée et quelle ancienneté
            l'assurance-vie aura au moment des retraits.
          </p>
          <p>
            L'erreur la plus fréquente est de choisir sur la seule économie d'impôt de l'année,
            sans estimer la TMI de retraite ni garder une épargne disponible. L'autre est
            d'écarter l'assurance-vie sans voir qu'un contrat ancien offre un régime de sortie
            favorable.
          </p>
          <p>
            Pour replacer ce raisonnement dans votre trajectoire (pensions attendues, épargne
            existante, TMI projetée), le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> permet de poser le
            cadre avant toute décision.
          </p>

          <h2 id="lire-aussi">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/preparer-sa-retraite-a-50-ans">Préparer sa retraite à 50 ans</a></li>
            <li><a href="/guide/assurance-vie-fonds-euros-ou-uc-a-55-ans">Assurance-vie à 55 ans : fonds euros ou UC ?</a></li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en {maj}, sauf date contraire indiquée :</p>
          <ul>
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les règles
              et taux cités sont ceux en vigueur en {maj} et peuvent évoluer. Les montants sont des
              illustrations pédagogiques sans lien avec un cas réel, fondées sur une hypothèse de
              gains qui n'est pas un rendement attendu. Les supports en unités de compte d'un PER
              ou d'une assurance-vie présentent un risque de perte en capital.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="L'écart de TMI se calcule. Le bon dosage entre PER et assurance-vie se construit." />
    </>
  );
}
