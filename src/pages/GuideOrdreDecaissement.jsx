import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { FISCALITE, HYPOTHESES_MAJ, euros, pct } from "../components/hypotheses.js";

// ------------------------------------------------------------------
// Scénario chiffré de la section 3 — exemple pédagogique ORIGINAL,
// hypothèses explicites et arrondies, calculé ici (pas de valeur en
// dur ailleurs que ces constantes). Prorata gains/versements supposé
// constant sur les retraits et capital non réinvesti pendant la
// phase de décaissement : deux simplifications volontaires, non
// réalistes en toutes circonstances, assumées comme telles.
// ------------------------------------------------------------------
const SCENARIO = (() => {
  // Phase 1 — PEA, ouvert depuis plus de 5 ans (retraits exonérés d'IR).
  const peaTotal = 96000;
  const peaGainShare = 0.5; // 48 000 € de versements, 48 000 € de plus-values
  const psPea = FISCALITE.prelevementsSociaux.pea / 100;
  const retraitPea = 24000; // rythme de vie visé, années 1 à 4
  const gainsPea = retraitPea * peaGainShare;
  const psPeaMontant = gainsPea * psPea;
  const netPea = retraitPea - psPeaMontant;
  const dureePea = peaTotal / retraitPea; // exactement 4 ans avec ces hypothèses

  // Phase 2 — assurance-vie, contrat de plus de 8 ans.
  const avGainShare = 0.46; // contrat plus ancien et plus performant : 46 % de plus-values
  const psAv = FISCALITE.prelevementsSociaux.assuranceVie / 100;
  const abattementCouple = FISCALITE.avAbattementAnnuelCouple;
  // Retrait plafonné pour que la quote-part de gains colle exactement à l'abattement.
  const retraitAvOptimal = Math.round(abattementCouple / avGainShare);
  const gainsAvOptimal = retraitAvOptimal * avGainShare;
  const psAvOptimal = gainsAvOptimal * psAv;
  const netAvOptimal = retraitAvOptimal - psAvOptimal;

  // Contre-exemple : le couple garde par habitude le rythme de 24 000 € au lieu
  // de le réduire, et dépasse l'abattement.
  const retraitAvHabitude = 24000;
  const gainsAvHabitude = retraitAvHabitude * avGainShare;
  const excedent = gainsAvHabitude - abattementCouple;
  const tauxReduitAv = FISCALITE.avTauxReduitApres8Ans / 100;
  const irExcedent = excedent * tauxReduitAv;
  const psAvHabitude = gainsAvHabitude * psAv;
  const netAvHabitude = retraitAvHabitude - psAvHabitude - irExcedent;

  return {
    peaTotal,
    peaVersements: peaTotal * (1 - peaGainShare),
    peaGains: peaTotal * peaGainShare,
    retraitPea,
    gainsPea,
    psPeaMontant,
    netPea,
    dureePea,
    psPeaTotal4ans: psPeaMontant * dureePea,
    netPeaTotal4ans: netPea * dureePea,
    avGainSharePct: avGainShare * 100,
    abattementCouple,
    retraitAvOptimal,
    gainsAvOptimal,
    psAvOptimal,
    netAvOptimal,
    retraitAvHabitude,
    gainsAvHabitude,
    excedent,
    irExcedent,
    psAvHabitude,
    netAvHabitude,
  };
})();

export default function GuideOrdreDecaissement() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Le sujet le plus différenciant du site</span>
          <h1>L'ordre de décaissement : l'erreur qui coûte cher à la retraite</h1>
          <p className="sub">
            On demande beaucoup d'attention à la façon d'épargner et presque aucune à la façon de
            décaisser. C'est pourtant ce second choix qui décide, chiffre en main, combien il vous
            reste réellement chaque année — et combien vos héritiers recevront.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#pourquoi">Pourquoi l'ordre compte autant que le montant épargné</a></li>
              <li><a href="#principe">Le principe indicatif : PEA, puis assurance-vie, puis PER</a></li>
              <li><a href="#scenario">Un scénario chiffré sur cinq ans</a></li>
              <li><a href="#erreurs">Les erreurs dans le mauvais sens</a></li>
              <li><a href="#limites">Les limites de la règle</a></li>
            </ol>
          </div>

          <h2 id="pourquoi">Pourquoi l'ordre compte autant que le montant épargné</h2>
          <p>
            Deux couples arrivent à la retraite avec exactement le même patrimoine : un PEA (plan
            d'épargne en actions), une assurance-vie de plus de huit ans et un PER (plan d'épargne
            retraite). Le premier puise d'abord dans son PER « parce que c'est celui qui a le plus
            gros solde ». Le second commence par son PEA, bascule sur l'assurance-vie, et garde son
            PER pour la fin. Sur quinze ou vingt ans de retraite, ces deux couples ne paieront pas la
            même fiscalité, et ne transmettront pas la même chose à leurs enfants — alors qu'ils ont
            épargné, au centime près, la même somme.
          </p>
          <p>
            C'est le point aveugle de la préparation à la retraite : on optimise pendant trente ans
            l'ordre dans lequel on remplit ses enveloppes fiscales (le cadre juridique et fiscal qui
            contient les placements), et on ignore presque toujours l'ordre dans lequel on les vide.
            Chaque enveloppe a son propre traitement fiscal au retrait et son propre sort au décès.
            Puiser dans la mauvaise en premier peut, selon les cas, représenter plusieurs milliers
            d'euros d'impôt superflu sur l'ensemble de la retraite, et réduire ce qu'il restera à
            transmettre — pour un résultat identique en apparence, puisque le couple aura dépensé la
            même somme chaque année. Notre analyse : ce sujet mérite un calcul complet, pas un simple
            ordre de principe — c'est l'objet de cet article.
          </p>

          <h2 id="principe">Le principe indicatif : PEA, puis assurance-vie, puis PER</h2>
          <p>
            Notre page <a href="/strategies/decumulation">décumulation</a> pose déjà la logique en
            détail ; en voici le résumé strictement nécessaire pour comprendre le scénario qui suit.
            Un ordre revient fréquemment dans nos analyses lorsque les trois enveloppes sont
            disponibles au même moment, chacune pour une raison précise, jamais comme une recette
            universelle.
          </p>
          <p>
            Le <strong>PEA</strong> se clôture obligatoirement au décès de son titulaire, sans le
            moindre abattement successoral propre à l'enveloppe (
            <a href="/strategies/pea-retraite">détail sur notre page dédiée</a>) : il vaut donc mieux
            le vider soi-même, tant qu'il est exonéré d'impôt sur le revenu passé{" "}
            {FISCALITE.peaExonerationIRApres} ans. L'<strong>assurance-vie</strong> fonctionne à
            l'opposé : chaque année civile ouvre un nouveau droit à abattement sur la part de gains
            rachetée ({euros(FISCALITE.avAbattementAnnuelSeul)} seul, {euros(FISCALITE.avAbattementAnnuelCouple)}{" "}
            en couple, barème {HYPOTHESES_MAJ}) — un droit qui se perd s'il n'est pas utilisé, d'où
            l'intérêt de rachats réguliers plutôt que d'un seul gros retrait. Quant au{" "}
            <strong>PER</strong>, sa fiscalité de sortie ne s'use pas avec le temps : imposée au
            barème à 65 ans comme à 85, elle ne récompense pas l'attente — mais transmise avant
            liquidation, elle disparaît purement et simplement, laissant place aux avantages
            successoraux propres à l'enveloppe (<a href="/strategies/per">détail ici</a>). Repousser
            le PER ne coûte donc rien et peut rapporter beaucoup au moment de la transmission.
          </p>
          <div className="note">
            Cette hiérarchie n'est ni universelle ni automatique : c'est un point de départ, pas une
            règle. La suite en chiffre la mécanique sur cinq ans, avant d'en présenter les exceptions.
          </div>

          <h2 id="scenario">Un scénario chiffré sur cinq ans</h2>
          <p>
            Prenons un couple retraité fictif, aux revenus déjà couverts pour l'essentiel par ses
            pensions, qui souhaite un complément régulier pour financer voyages et loisirs pendant
            les premières années de sa retraite : {euros(SCENARIO.retraitPea)} bruts par an. Il
            détient un PEA ouvert depuis plus de {FISCALITE.peaExonerationIRApres} ans et un contrat
            d'assurance-vie de plus de huit ans. Toutes les hypothèses ci-dessous sont arrondies et
            simplifiées à des fins pédagogiques : elles ne décrivent aucun cas réel.
          </p>

          <h3>Années 1 à 4 : puiser dans le PEA</h3>
          <p>
            Le PEA vaut {euros(SCENARIO.peaTotal)}, composé pour moitié de versements (
            {euros(SCENARIO.peaVersements)}, jamais imposés au retrait) et pour moitié de
            plus-values ({euros(SCENARIO.peaGains)}). Hypothèse simplificatrice : cette proportion
            reste constante à chaque retrait, et le capital restant n'est pas réinvesti pendant la
            phase de retraits — deux simplifications volontaires pour garder un calcul lisible,
            rarement vérifiées à l'identique dans la réalité.
          </p>
          <p>
            Le couple retire {euros(SCENARIO.retraitPea)} bruts chaque année. Le plan ayant plus de
            {" "}{FISCALITE.peaExonerationIRApres} ans, aucun impôt sur le revenu n'est dû : seuls les
            prélèvements sociaux ({pct(FISCALITE.prelevementsSociaux.pea)} depuis la LFSS 2026)
            s'appliquent, et seulement sur la quote-part de plus-value comprise dans le retrait,
            soit {euros(SCENARIO.gainsPea)} par an. Le calcul, pas à pas :
          </p>
          <ul>
            <li>plus-value incluse dans le retrait : {euros(SCENARIO.gainsPea)} ;</li>
            <li>
              prélèvements sociaux dus : {euros(SCENARIO.gainsPea)} ×{" "}
              {pct(FISCALITE.prelevementsSociaux.pea)} = {euros(SCENARIO.psPeaMontant)} ;
            </li>
            <li>
              net perçu par le couple : {euros(SCENARIO.retraitPea)} − {euros(SCENARIO.psPeaMontant)}{" "}
              = {euros(SCENARIO.netPea)} par an.
            </li>
          </ul>
          <p>
            À ce rythme, le PEA est intégralement consommé au bout de {SCENARIO.dureePea} ans :{" "}
            {euros(SCENARIO.peaTotal)} ÷ {euros(SCENARIO.retraitPea)} = {SCENARIO.dureePea} — un
            chiffre rond par construction de l'exemple, la réalité tombant rarement pile. Sur ces
            quatre années, le couple aura perçu {euros(SCENARIO.netPeaTotal4ans)} nets au total, pour{" "}
            {euros(SCENARIO.psPeaTotal4ans)} de prélèvements sociaux cumulés et aucun impôt sur le
            revenu.
          </p>

          <h3>Année 5 et suivantes : basculer sur l'assurance-vie, en étalant les rachats</h3>
          <p>
            Le PEA épuisé, le couple bascule sur son contrat d'assurance-vie, plus ancien et mieux
            valorisé, composé à {pct(SCENARIO.avGainSharePct)} de plus-values (contre 50 % pour le
            PEA de l'exemple — deux contrats, deux proratas différents, le cas le plus fréquent en
            pratique). L'abattement annuel du couple est de {euros(SCENARIO.abattementCouple)} sur la
            part de gains des rachats.
          </p>
          <p>
            Pour rester intégralement sous cet abattement — donc payer zéro impôt sur le revenu —,
            le couple ajuste son rythme de retrait : il passe de {euros(SCENARIO.retraitPea)} (le
            rythme de la phase PEA) à {euros(SCENARIO.retraitAvOptimal)} bruts par an. Le calcul :
          </p>
          <ul>
            <li>
              plus-value incluse dans un retrait de {euros(SCENARIO.retraitAvOptimal)} :{" "}
              {euros(SCENARIO.retraitAvOptimal)} × {pct(SCENARIO.avGainSharePct)} ={" "}
              {euros(SCENARIO.gainsAvOptimal)} — soit très exactement l'abattement disponible ;
            </li>
            <li>impôt sur le revenu dû : 0 €, la totalité de la plus-value étant absorbée par l'abattement ;</li>
            <li>
              prélèvements sociaux dus (l'abattement ne joue que sur l'impôt sur le revenu, jamais
              sur les prélèvements sociaux) : {euros(SCENARIO.gainsAvOptimal)} ×{" "}
              {pct(FISCALITE.prelevementsSociaux.assuranceVie)} = {euros(SCENARIO.psAvOptimal)} ;
            </li>
            <li>
              net perçu : {euros(SCENARIO.retraitAvOptimal)} − {euros(SCENARIO.psAvOptimal)} ={" "}
              {euros(SCENARIO.netAvOptimal)} par an.
            </li>
          </ul>
          <p>
            Répétée chaque année, l'opération se renouvelle à l'identique : l'abattement se
            reconstitue au 1er janvier, et le couple peut de nouveau racheter{" "}
            {euros(SCENARIO.retraitAvOptimal)} en franchise totale d'impôt sur le revenu. C'est cela,
            concrètement, qu'« étaler ses rachats pour rester sous l'abattement annuel » signifie :
            ajuster le montant retiré à la composition du contrat, année après année.
          </p>
          <div className="note">
            Ce qui aurait changé sans cet ajustement : si le couple avait gardé, par habitude, son
            rythme de {euros(SCENARIO.retraitAvHabitude)} de la phase PEA, la plus-value incluse
            aurait atteint {euros(SCENARIO.gainsAvHabitude)} — soit {euros(SCENARIO.excedent)}{" "}
            au-dessus de l'abattement de {euros(SCENARIO.abattementCouple)}. Cet excédent aurait été
            imposé au taux réduit de {pct(FISCALITE.avTauxReduitApres8Ans)} applicable aux contrats
            de plus de huit ans (versements inférieurs à 150 000 €), soit {euros(SCENARIO.irExcedent)}{" "}
            d'impôt sur le revenu — limité dans cet exemple précis, mais strictement évitable en
            ajustant le montant retiré à la composition réelle du contrat.
          </div>
          <p>
            Ce scénario est un exemple pédagogique aux hypothèses volontairement simplifiées — deux
            enveloppes, un prorata gains/versements constant, aucune revalorisation du capital
            pendant les retraits. Il illustre un mécanisme, pas une martingale généralisable. Notre
            page <a href="/strategies/assurance-vie-retraite">assurance-vie et retraite</a>{" "}
            approfondit la stratégie de rachats étalés, et notre page{" "}
            <a href="/strategies/decumulation">décumulation</a> replace cet ordre dans une vision
            d'ensemble, aux côtés de la rente viagère et des retraits programmés (
            <a href="/guide/rente-viagere-ou-retraits-programmes">comment choisir entre les deux</a>).
          </p>

          <h2 id="erreurs">Les erreurs dans le mauvais sens</h2>
          <p>
            Deux erreurs symétriques reviennent souvent, et toutes deux vont à l'encontre du
            principe indicatif présenté plus haut.
          </p>
          <p>
            <strong>Consommer le PER en premier.</strong> C'est l'erreur la plus coûteuse en
            silence. Puiser d'abord dans le PER parce qu'il affiche le solde le plus élevé, ou parce
            qu'on veut « s'en débarrasser », revient à sacrifier sans raison son principal atout : la
            transmission. Un PER assurantiel non liquidé au décès transmet ses avantages successoraux
            intacts ; un PER vidé de son vivant ne transmet plus rien de spécifique. Sauf motif précis
            — un besoin de trésorerie ponctuel, une TMI (tranche marginale d'imposition : le taux qui
            frappe vos derniers euros de revenu) exceptionnellement basse une année donnée —
            commencer par le PER revient à utiliser en premier l'enveloppe qui avait le plus à offrir
            en dernier.
          </p>
          <p>
            <strong>Laisser le PEA intact jusqu'au décès.</strong> L'erreur inverse, tout aussi
            fréquente chez les épargnants habitués à ne jamais y toucher par réflexe de prudence. Or
            le PEA se clôture de toute façon au décès de son titulaire, sans qu'aucun abattement
            propre à l'enveloppe ne s'applique aux plus-values : le préserver jusqu'au bout ne lui
            ajoute aucun avantage successoral, et prive le couple, de son vivant, d'une enveloppe
            faiblement fiscalisée pour financer ses dépenses courantes. Transmettre un PEA intact
            revient, le plus souvent, à transmettre un impôt latent plutôt qu'un cadeau.
          </p>

          <h2 id="limites">Les limites de la règle</h2>
          <p>
            Ce principe indicatif change du tout au tout dans plusieurs situations, et doit à chaque
            fois être validé au cas par cas plutôt qu'appliqué comme une recette automatique.
          </p>
          <ul>
            <li>
              <strong>Quand la transmission prime sur la consommation.</strong> Si l'objectif
              premier est de transmettre plutôt que de dépenser, la hiérarchie s'inverse : on
              préserve les enveloppes les plus avantageuses au décès (assurance-vie, PER assurantiel)
              et on consomme en priorité ce qui rapporterait le moins aux héritiers.
            </li>
            <li>
              <strong>Quand la situation fiscale est atypique.</strong> Une TMI durablement basse,
              des revenus exceptionnels une année donnée ou tout autre paramètre hors norme peuvent
              justifier de sortir du PER plus tôt, ou de retarder l'usage de l'assurance-vie.
            </li>
            <li>
              <strong>Quand un besoin ponctuel important survient.</strong> Travaux, accident de la
              vie, soutien à un enfant : un besoin de trésorerie soudain peut justifier de puiser dans
              l'enveloppe la plus disponible, sans considération d'ordre théorique.
            </li>
          </ul>
          <div className="note">
            <p>
              Notre analyse : il n'existe pas de bon ordre de décaissement dans l'absolu, seulement
              un ordre adapté à une situation — ce que cet article présente est un point de départ à
              vérifier, jamais une conclusion à appliquer telle quelle. Cette analyse est générale et
              ne constitue pas un conseil en investissement personnalisé. Les montants et taux cités
              sont les barèmes en vigueur en {HYPOTHESES_MAJ}, susceptibles d'évoluer à chaque loi de
              finances ; le scénario chiffré est un exemple pédagogique à hypothèses simplifiées, non
              une projection ou une promesse de résultat.
            </p>
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner
        title="Dans quel ordre décaisser votre propre épargne ?"
        button="Bilan retraite gratuit (15 min)"
      />
    </>
  );
}
