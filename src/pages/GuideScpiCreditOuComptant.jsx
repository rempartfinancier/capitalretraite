import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  IMMO,
  IMMO_EXEMPLES,
  FISCALITE,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const M = IMMO.scpiMarche;
const F = IMMO.scpiFiscalite;
const D = IMMO.demembrement;
const E = IMMO_EXEMPLES.scpiCredit;

const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " %";
const eurosPrecis = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

// ---- Crédit amortissable à mensualités constantes, formule standard ----
const tauxMensuel = E.tauxCredit / 100 / 12;
const nbMensualites = E.dureeAnnees * 12;
const mensualite =
  (E.montant * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -nbMensualites));

// Échéancier annuel : intérêts, capital remboursé, capital restant dû en fin d'année.
const echeancier = (() => {
  let k = E.montant;
  const lignes = [];
  for (let annee = 1; annee <= E.dureeAnnees; annee++) {
    let interets = 0;
    for (let mois = 0; mois < 12; mois++) {
      const i = k * tauxMensuel;
      interets += i;
      k -= mensualite - i;
    }
    lignes.push({ annee, interets, capitalRestant: Math.max(k, 0) });
  }
  return lignes;
})();

// Capital restant dû après un nombre donné de mensualités payées.
const capitalRestantApres = (nbMois) => {
  let k = E.montant;
  for (let mois = 0; mois < nbMois; mois++) k -= mensualite - k * tauxMensuel;
  return Math.max(k, 0);
};

// ---- Revenus, impôt, effort : l'année 1 puis l'ensemble de la durée ----
const revenusBrutsAnnuels = (E.montant * E.tauxDistribution) / 100; // taux supposé constant
const tauxImpositionMarginal = E.tmi + FISCALITE.prelevementsSociaux.immobilier; // en %
// Revenu foncier imposable = loyers − intérêts (régime réel). Les intérêts ne s'imputent pas
// sur le revenu global : la base ne descend pas sous zéro dans cet exemple.
const impotAnnee = (interets) =>
  (Math.max(revenusBrutsAnnuels - interets, 0) * tauxImpositionMarginal) / 100;
const mensualitesAnnuelles = mensualite * 12;
const effortAnnee = (interets) => mensualitesAnnuelles - revenusBrutsAnnuels + impotAnnee(interets);

const an1 = echeancier[0];
const effortAn1 = effortAnnee(an1.interets);
const effortTotal = echeancier.reduce((s, l) => s + effortAnnee(l.interets), 0);

// ---- Achat comptant du même montant, même taux de distribution, même fiscalité ----
const impotComptant = (revenusBrutsAnnuels * tauxImpositionMarginal) / 100;
const revenuNetComptantAnnuel = revenusBrutsAnnuels - impotComptant;
const revenuNetComptantTotal = revenuNetComptantAnnuel * E.dureeAnnees;

// ---- Valeur théorique des parts : frais de souscription absorbés, puis baisse du prix de part ----
const valeurRetraitSansBaisse = (E.montant * (100 - E.fraisSouscriptionPct)) / 100;
const valeurRetraitApresBaisse = (valeurRetraitSansBaisse * (100 - E.baissePrixPart)) / 100;
// Comparaison au bout d'un an de remboursement (12 mensualités payées).
const moisMiParcours = 12;
const capitalRestantMi = capitalRestantApres(moisMiParcours);
const ecartMi = valeurRetraitApresBaisse - capitalRestantMi;
// Premier mois où le capital restant dû passe sous la valeur théorique de retrait après baisse.
const moisCroisement = (() => {
  for (let mois = 1; mois <= nbMensualites; mois++) {
    if (capitalRestantApres(mois) <= valeurRetraitApresBaisse) return mois;
  }
  return nbMensualites;
})();

// Taux de distribution qui couvrirait à lui seul les mensualités (avant impôt).
const tauxCouvertureMensualites = (mensualitesAnnuelles / E.montant) * 100;
// Revenu mensuel à partir duquel la mensualité seule reste sous le taux d'effort maximal.
const revenuMiniTauxEffort = mensualite / (F.hcsfTauxEffortMax / 100);

const sources = [
  {
    label: "AMF — « Investir dans une SCPI » (guide, 2023)",
    url: "https://www.amf-france.org/sites/institutionnel/files/private/2023-12/2023_investir_dans_une_scpi.pdf",
  },
  {
    label: "ASPIM — Communiqué de presse du 1er semestre 2026 (5 août 2026)",
    url: "https://www.aspim.fr/content/uploads/2026/08/ASPIM_CP-1S-2026_V7-def.pdf",
  },
  {
    label: "ASPIM — Communiqué de presse du 4e trimestre 2025 (10 février 2026)",
    url: "https://www.aspim.fr/content/uploads/2026/02/ASPIM_CP-4T-2025_V4.pdf",
  },
  {
    label: "Haut Conseil de stabilité financière — Mesure relative à l'octroi de crédits immobiliers",
    url: "https://www.economie.gouv.fr/hcsf/mesures/mesure-relative-loctroi-de-credits-immobiliers",
  },
  {
    label:
      "Légifrance — Code des assurances, article L. 113-2-1 (assurance emprunteur, loi Lemoine)",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045271000/2026-08-15",
  },
  {
    label:
      "economie.gouv.fr — Assurance emprunteur : questionnaire de santé, quand est-il obligatoire ?",
    url: "https://www.economie.gouv.fr/particuliers/gerer-mon-argent/emprunter-et-sassurer/assurance-emprunteur-questionnaire-de-sante-quand-est-ce-obligatoire",
  },
  {
    label:
      "Service-Public.gouv.fr — Prélèvements sociaux sur les revenus du patrimoine, fiche F2329",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2329",
  },
  {
    label: "impots.gouv.fr — Les régimes d'imposition (revenus fonciers)",
    url: "https://www.impots.gouv.fr/particulier/les-regimes-dimposition",
  },
  {
    label: "BOFiP — Revenus fonciers : charges déductibles et déficit (BOI-RFPI-BASE-30-20)",
    url: "https://bofip.impots.gouv.fr/bofip/4142-PGP.html/identifiant=BOI-RFPI-BASE-30-20-20250916",
  },
];

export default function GuideScpiCreditOuComptant() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Immobilier · financement</span>
          <h1>SCPI à crédit ou au comptant : que change l'emprunt à l'approche de la retraite ?</h1>
          <p className="sub">
            Le levier amplifie le revenu espéré, mais aussi l'effort mensuel et la perte possible.
            Calcul pas à pas. Mis à jour le {IMMO.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> acheter des parts de SCPI à crédit revient à
              emprunter pour toucher des revenus qui ne sont pas garantis, alors que l'emprunt, lui,
              reste dû quoi que fasse le prix de la part. Dans l'exemple chiffré de cette page,
              un emprunt de {euros(E.montant)} sur {E.dureeAnnees} ans à {pct1(E.tauxCredit)} coûte{" "}
              {euros(mensualite)} par mois, quand les parts distribuent, par hypothèse,{" "}
              {euros(revenusBrutsAnnuels / 12)} bruts par mois : l'épargne mensuelle à apporter
              est d'environ {euros(effortAn1 / 12)} la première année. À l'approche de la retraite,
              la durée du crédit, l'assurance et la baisse possible des revenus pèsent davantage.
              Ce guide n'est pas un conseil personnalisé.
            </p>
          </div>

          <p>
            À l'approche de la retraite, le raisonnement est tentant : « J'emprunte maintenant, les loyers de la
            SCPI paieront une partie du crédit, et à la retraite je détiens des parts
            remboursées. » Il tient parfois sur le papier. Il suppose pourtant que trois choses
            se passent comme prévu pendant la durée du crédit : le revenu des parts, leur prix, et
            votre propre capacité à rembourser.
          </p>
          <p>
            Prenons une situation illustrative et composite, sans lien avec un cas réel : Marc,
            salarié, envisage de souscrire des parts de SCPI pour {euros(E.montant)} en finançant
            la totalité par un crédit, plutôt que de mobiliser son épargne. Que gagne-t-il, que
            risque-t-il, et que changerait un achat au comptant ? Pour le fonctionnement général
            d'une SCPI, voir d'abord{" "}
            <a href="/guide/scpi-preparer-sa-retraite">SCPI et retraite</a> ; ici, on se concentre
            sur l'effet de l'emprunt.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#levier">Comment fonctionne le levier du crédit ?</a></li>
              <li><a href="#calcul">Combien coûte vraiment l'emprunt, année après année ?</a></li>
              <li><a href="#comptant">Et si le même montant était payé comptant ?</a></li>
              <li><a href="#defavorable">Que se passe-t-il si le prix de la part baisse ?</a></li>
              <li><a href="#risques">Quels risques propres au crédit ?</a></li>
              <li><a href="#assurance">Assurance emprunteur : que change l'âge ?</a></li>
              <li><a href="#arbre">Comment s'orienter ? Trois questions à se poser</a></li>
              <li><a href="#erreurs">Quelles erreurs éviter ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="levier">Comment fonctionne le levier du crédit ?</h2>
          <p>
            Le levier consiste à investir plus que son apport, en espérant que ce que rapporte
            le placement dépasse ce que coûte l'emprunt. Avec une SCPI, deux sources de gain sont
            possibles : les revenus distribués et, à la revente, une éventuelle hausse du prix de la
            part. Le coût, lui, est certain : les intérêts du crédit, plus l'assurance
            emprunteur.
          </p>
          <p>
            Tant que la SCPI distribue plus que les intérêts, le crédit paraît « s'autofinancer »
            en partie. Mais le capital emprunté doit aussi être remboursé : la mensualité
            comprend des intérêts et du capital, et le capital remboursé ne vient pas des
            loyers. C'est l'écart entre la mensualité et les revenus perçus qui constitue
            l'effort d'épargne réel.
          </p>
          <p>
            Rappel important : le crédit reste dû quelle que soit l'évolution du prix de la
            part. Une baisse du prix des parts ne diminue pas la dette. Les chiffres du marché
            montrent que cette baisse n'a rien d'hypothétique : le prix de part moyen a varié de{" "}
            {pct1(M.variationPrixPart2025)} en 2025 et de {pct1(M.variationPrixPartS12026)} au
            premier semestre 2026.
          </p>

          <h2 id="calcul">Combien coûte vraiment l'emprunt, année après année ?</h2>
          <div className="note">
            <p>
              Exemple purement illustratif, qui ne correspond à aucun cas réel. Hypothèses :
              souscription de {euros(E.montant)} financée à 100 % par emprunt (frais de souscription
              inclus dans ce prix) ; crédit à mensualités constantes sur {E.dureeAnnees} ans à{" "}
              {pct1(E.tauxCredit)} par an, hors assurance emprunteur, qui s'ajouterait et dont le
              coût n'est pas pris en compte ici ; taux de distribution brut supposé constant à{" "}
              {pct1(E.tauxDistribution)} ; tranche marginale d'imposition de {pct(E.tmi)} ;
              revenus fonciers imposés au régime réel avec déduction des intérêts, plus{" "}
              {pct1(FISCALITE.prelevementsSociaux.immobilier)} de prélèvements sociaux. Rien de
              cela n'est une prévision.
            </p>
          </div>
          <p>Le calcul, étape par étape :</p>
          <ol>
            <li>
              Mensualité : capital × taux mensuel / (1 − (1 + taux mensuel)<sup>−nombre de
              mois</sup>), avec un taux mensuel de {pct1(E.tauxCredit)} / 12 et {nbMensualites} mois,
              soit <strong>{eurosPrecis(mensualite)}</strong> par mois, ou{" "}
              {euros(mensualitesAnnuelles)} par an.
            </li>
            <li>
              Revenus bruts de la SCPI : {euros(E.montant)} × {pct1(E.tauxDistribution)} ={" "}
              <strong>{euros(revenusBrutsAnnuels)}</strong> par an, soit{" "}
              {euros(revenusBrutsAnnuels / 12)} par mois.
            </li>
            <li>
              Intérêts de la première année : <strong>{euros(an1.interets)}</strong> (le reste de
              la mensualité rembourse le capital).
            </li>
            <li>
              Revenu foncier imposable la première année : {euros(revenusBrutsAnnuels)} −{" "}
              {euros(an1.interets)} = {euros(revenusBrutsAnnuels - an1.interets)}.
            </li>
            <li>
              Impôt et prélèvements sociaux de la première année : {euros(revenusBrutsAnnuels - an1.interets)} ×{" "}
              ({pct(E.tmi)} + {pct1(FISCALITE.prelevementsSociaux.immobilier)}) ={" "}
              <strong>{euros(impotAnnee(an1.interets))}</strong>.
            </li>
            <li>
              Effort d'épargne réel de la première année : mensualités ({euros(mensualitesAnnuelles)}) −
              revenus bruts ({euros(revenusBrutsAnnuels)}) + impôt ({euros(impotAnnee(an1.interets))}) ={" "}
              <strong>{euros(effortAn1)}</strong> par an, soit environ{" "}
              <strong>{euros(effortAn1 / 12)}</strong> par mois à sortir de sa poche.
            </li>
          </ol>
          <p>
            Les intérêts ne s'imputent pas sur le revenu global : ils viennent seulement en
            déduction des revenus fonciers, et l'excédent éventuel se reporte sur les revenus
            fonciers des {F.deficitFoncierReportAnnees} années suivantes. Ici, la base reste
            positive : il n'y a pas de déficit à reporter. Avec le temps, les intérêts diminuent, la
            base imposable augmente, donc l'impôt aussi :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Année</th>
                  <th>Intérêts payés</th>
                  <th>Revenus fonciers imposables</th>
                  <th>Impôt et prélèvements sociaux</th>
                  <th>Effort d'épargne annuel</th>
                  <th>Capital restant dû en fin d'année</th>
                </tr>
              </thead>
              <tbody>
                {echeancier
                  .filter((l) => [1, 5, 10, E.dureeAnnees].includes(l.annee))
                  .map((l) => (
                    <tr key={l.annee}>
                      <td>{l.annee}</td>
                      <td>{euros(l.interets)}</td>
                      <td>{euros(Math.max(revenusBrutsAnnuels - l.interets, 0))}</td>
                      <td>{euros(impotAnnee(l.interets))}</td>
                      <td>{euros(effortAnnee(l.interets))}</td>
                      <td>{euros(l.capitalRestant)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <p>
            Sur {E.dureeAnnees} ans, l'effort d'épargne cumulé s'élève à{" "}
            <strong>{euros(effortTotal)}</strong>, dans l'hypothèse où le taux de distribution
            reste constant. Pour que les revenus couvrent à eux seuls les mensualités, avant tout
            impôt, il faudrait un taux de distribution de {pct1(tauxCouvertureMensualites)} : bien
            au-dessus de la moyenne du marché de {pct1(M.tauxDistribution2025)} en 2025, et de la
            fourchette de {pct1(M.tauxDistributionStrategieMin)} à{" "}
            {pct1(M.tauxDistributionStrategieMax)} selon les stratégies. Autrement dit : à ces
            conditions, un crédit sur {E.dureeAnnees} ans ne s'autofinance pas.
          </p>

          <h2 id="comptant">Et si le même montant était payé comptant ?</h2>
          <p>
            Avec la même hypothèse de taux de distribution, un achat comptant de {euros(E.montant)}{" "}
            donne {euros(revenusBrutsAnnuels)} bruts par an. Sans intérêts à déduire, la base
            imposable est le revenu entier : impôt et prélèvements sociaux de{" "}
            {euros(impotComptant)}, soit un revenu net de {euros(revenuNetComptantAnnuel)} par an.
            Aucun effort mensuel, mais {euros(E.montant)} d'épargne immobilisée.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Sur {E.dureeAnnees} ans, prix de part inchangé</th>
                  <th>À crédit</th>
                  <th>Comptant</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Épargne sortie au départ</td>
                  <td>0 €</td>
                  <td>{euros(E.montant)}</td>
                </tr>
                <tr>
                  <td>Mensualité du crédit</td>
                  <td>{eurosPrecis(mensualite)}</td>
                  <td>Aucune</td>
                </tr>
                <tr>
                  <td>Effort d'épargne la première année</td>
                  <td>{euros(effortAn1)}</td>
                  <td>Aucun</td>
                </tr>
                <tr>
                  <td>Revenu net par an, après impôt</td>
                  <td>Absorbé par le crédit (voir effort)</td>
                  <td>{euros(revenuNetComptantAnnuel)}</td>
                </tr>
                <tr>
                  <td>Flux cumulé sur {E.dureeAnnees} ans (effort ou revenu net)</td>
                  <td>− {euros(effortTotal)}</td>
                  <td>+ {euros(revenuNetComptantTotal)}</td>
                </tr>
                <tr>
                  <td>Parts en fin de crédit</td>
                  <td>Détenues sans dette</td>
                  <td>Détenues sans dette</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Ce tableau ne donne pas de vainqueur. À crédit, vous ne sortez pas {euros(E.montant)} au
            départ, mais vous supportez un effort mensuel pendant {E.dureeAnnees} ans ; au comptant,
            vous touchez un revenu net mais vous immobilisez l'épargne, qui ne peut plus servir
            ailleurs. Pour comparer vraiment, il faudrait chiffrer ce que cette épargne aurait
            rapporté si elle était restée disponible, et ce chiffre dépend de ce que vous en
            auriez fait. Si la disponibilité de l'épargne compte pour vous, voir aussi{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a> une fois à
            la retraite.
          </p>

          <h2 id="defavorable">Que se passe-t-il si le prix de la part baisse ?</h2>
          <p>
            Le scénario défavorable ci-dessous n'est ni le pire ni le plus probable : c'est un
            exercice de lecture. Deux effets s'enchaînent. Le premier est mécanique : les frais de
            souscription, supposés ici à {pct(E.fraisSouscriptionPct)} du prix, ne se traduisent pas
            par des parts. Le second est un recul du prix de la part, supposé à{" "}
            {pct(E.baissePrixPart)}.
          </p>
          <ul>
            <li>
              Valeur théorique de retrait, prix de part inchangé : {euros(E.montant)} ×{" "}
              (100 % − {pct(E.fraisSouscriptionPct)}) = {euros(valeurRetraitSansBaisse)}.
            </li>
            <li>
              Après une baisse de {pct(E.baissePrixPart)} du prix de la part :{" "}
              {euros(valeurRetraitSansBaisse)} × (100 % − {pct(E.baissePrixPart)}) ={" "}
              <strong>{euros(valeurRetraitApresBaisse)}</strong>.
            </li>
            <li>
              Capital restant dû au bout d'un an, après {moisMiParcours} mensualités :{" "}
              <strong>{euros(capitalRestantMi)}</strong>.
            </li>
          </ul>
          <p>
            Au bout d'un an, revendre les parts à cette valeur théorique{" "}
            {ecartMi >= 0 ? "couvrirait" : "ne couvrirait pas"} le crédit :{" "}
            {euros(valeurRetraitApresBaisse)} contre {euros(capitalRestantMi)} dus, soit{" "}
            {ecartMi >= 0 ? "un excédent" : "un manque"} de {euros(Math.abs(ecartMi))}
            {ecartMi >= 0 ? "" : " à financer sur d'autres ressources"}. Dans cet exemple, il faut
            attendre environ {moisCroisement} mensualités pour que le capital restant dû repasse
            sous cette valeur : pendant les premières années, une revente forcée laisserait une
            dette à solder. Le raisonnement ne tient pas compte des revenus
            reçus, ni de l'impôt, ni d'éventuels frais de sortie, ni des délais pour trouver un
            acheteur ; c'est une lecture volontairement simple.
          </p>
          <div className="note">
            <p>
              Ce scénario est une illustration pédagogique, pas une prévision : une SCPI peut
              baisser davantage, moins, ou monter. Le point à retenir est l'asymétrie : le prix de la
              part varie, la dette reste fixée.
            </p>
          </div>

          <h2 id="risques">Quels risques propres au crédit ?</h2>
          <ul>
            <li>
              <strong>Le taux.</strong> Un taux variable ou révisable peut faire augmenter la
              mensualité. À taux fixe, la mensualité ne bouge pas, mais le taux obtenu dépend des
              conditions du moment ; celui de l'exemple, {pct1(E.tauxCredit)}, n'est qu'une
              hypothèse.
            </li>
            <li>
              <strong>Le taux d'effort.</strong> Selon la recommandation du Haut Conseil de
              stabilité financière, le taux d'effort maximal est de {pct(F.hcsfTauxEffortMax)} des
              revenus, assurance comprise (à confirmer pour un crédit finançant des parts de SCPI).
              Dans l'exemple, la mensualité seule, hors autres charges, exigerait des revenus
              mensuels d'environ {euros(revenuMiniTauxEffort)} pour rester sous ce seuil. Les
              banques apprécient aussi la baisse de revenus à la retraite.
            </li>
            <li>
              <strong>L'assurance emprunteur.</strong> Elle ajoute un coût qui augmente avec l'âge
              et peut être refusée ou surprimée en cas de risque de santé aggravé.
            </li>
            <li>
              <strong>L'âge et la durée.</strong> Plus on emprunte tard, plus le remboursement
              chevauche la retraite, c'est-à-dire la période où les revenus sont les plus faibles et
              où l'on dispose de moins de temps pour absorber un choc.
            </li>
            <li>
              <strong>Une distribution inférieure aux prévisions.</strong> Les loyers peuvent
              baisser et la société de gestion réduire la distribution ; l'effort mensuel augmente
              alors d'autant.
            </li>
            <li>
              <strong>La revente forcée.</strong> Si l'effort devient intenable, vendre les parts
              suppose un acheteur, ce qui peut prendre du temps, notamment lorsque des parts sont en
              attente de retrait ({pct1(M.partsEnAttenteS12026Pct)} de la capitalisation au 30 juin
              2026). La vente peut se faire à un moment défavorable.
            </li>
          </ul>
          <p>
            Le cadre général des risques de l'immobilier à la retraite est dans{" "}
            <a href="/guide/cinq-erreurs-investissement-locatif-retraite">
              les cinq erreurs de l'investissement locatif
            </a>{" "}
            et, pour les autres véhicules, dans{" "}
            <a href="/guide/lmnp-risques">les risques du LMNP</a>.
          </p>

          <h2 id="assurance">Assurance emprunteur : que change l'âge ?</h2>
          <p>
            Les banques exigent presque toujours une assurance emprunteur pour un crédit
            immobilier : elle rembourse tout ou partie du capital restant dû en cas de décès ou
            d'invalidité, selon les garanties choisies. Son coût dépend de l'âge, de l'état de santé
            et des garanties retenues. Il n'est pas inclus dans les calculs de cette page : il
            s'ajouterait à la mensualité.
          </p>
          <p>
            La loi Lemoine (article L. 113-2-1 du code des assurances) a supprimé le questionnaire
            de santé dans un cas précis : lorsque le montant assuré, tous crédits cumulés, ne
            dépasse pas {euros(D.lemoineMontantMax)} par assuré et que le remboursement s'achève
            avant le {D.lemoineAgeFinRemboursement}e anniversaire de l'emprunteur. Pour un
            emprunteur qui approche ou dépasse la soixantaine, un crédit de {E.dureeAnnees} ans se
            termine très probablement après cet âge : la condition n'est alors pas remplie, et le
            questionnaire de santé s'applique. La loi autorise aussi à changer d'assurance en cours
            de contrat, ce qui permet de comparer ; les conditions exactes sont à confirmer sur
            economie.gouv.fr.
          </p>

          <h2 id="arbre">Comment s'orienter ? Trois questions à se poser</h2>
          <p>
            Ces trois questions n'indiquent pas une solution : elles ordonnent ce qu'il faut
            vérifier avant de s'engager.
          </p>
          <ol>
            <li>
              <strong>Pouvez-vous payer la mensualité même si la SCPI ne distribue plus rien
              pendant un an ?</strong>
              <br />
              Si la réponse est non, le crédit repose sur un revenu que personne ne garantit.
              Calculez la mensualité entière, assurance comprise, avec vos revenus de retraite
              prévisibles, pas seulement vos revenus actuels.
            </li>
            <li>
              <strong>Le crédit se termine-t-il avant ou après votre départ à la retraite ?</strong>
              <br />
              Un crédit qui s'arrête avant la retraite se rembourse sur des salaires. Un crédit qui
              chevauche la retraite se rembourse sur des pensions plus faibles, à une période où
              l'assurance coûte plus cher et où le recours aux banques est plus difficile.
            </li>
            <li>
              <strong>Pouvez-vous supporter une valeur de retrait inférieure au capital restant dû ?</strong>
              <br />
              Si une vente forcée à perte rendait la situation intenable, le comptant, ou une somme
              plus modeste, est une piste de réflexion plus cohérente avec votre tolérance au risque.
            </li>
          </ol>

          <h2 id="erreurs">Quelles erreurs éviter ?</h2>
          <ul>
            <li>
              <strong>Compter sur les revenus de la SCPI pour rembourser.</strong> Ils ne sont pas
              garantis ; la mensualité, elle, l'est.
            </li>
            <li>
              <strong>Oublier l'assurance emprunteur.</strong> Elle augmente le coût et peut
              modifier l'accès au crédit selon l'âge et la santé.
            </li>
            <li>
              <strong>Calculer l'effort en brut.</strong> L'impôt s'ajoute, et il augmente à mesure
              que les intérêts diminuent.
            </li>
            <li>
              <strong>Emprunter sur une durée qui dépasse la vie active.</strong> La mensualité
              pèsera alors sur une pension, pas sur un salaire.
            </li>
            <li>
              <strong>Ignorer les frais de souscription.</strong> Ils réduisent la valeur de retrait
              dès le premier jour, et le crédit finance aussi cette partie.
            </li>
            <li>
              <strong>Négliger la liquidité.</strong> Une SCPI ne se revend pas à volonté, alors que
              les échéances du crédit tombent chaque mois.
            </li>
            <li>
              <strong>Oublier d'autres usages possibles de l'argent.</strong> Comparez toujours avec
              un autre placement ou, par exemple, avec{" "}
              <a href="/guide/per-ou-immobilier-locatif">un versement sur un PER</a>, et avec la{" "}
              <a href="/guide/immobilier-locatif-ou-assurance-vie">
                comparaison immobilier locatif et assurance-vie
              </a>
              .
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Les intérêts du crédit sont-ils déductibles ?</h3>
          <p>
            Oui, des revenus fonciers, au régime réel. Ils ne s'imputent pas sur le revenu global.
            L'excédent éventuel se reporte sur les revenus fonciers des{" "}
            {F.deficitFoncierReportAnnees} années suivantes. Le détail de la fiscalité est dans{" "}
            <a href="/guide/scpi-fiscalite-revenus-plus-values">
              fiscalité des SCPI : revenus et plus-values
            </a>
            .
          </p>
          <h3>Une SCPI à crédit s'autofinance-t-elle ?</h3>
          <p>
            Dans l'exemple de cette page, non : il faudrait un taux de distribution de{" "}
            {pct1(tauxCouvertureMensualites)} pour couvrir les mensualités avant impôt, contre{" "}
            {pct1(M.tauxDistribution2025)} en moyenne en 2025. Cela dépend de la durée du crédit et
            du taux : sur une durée plus longue ou un taux plus bas, l'écart se réduirait.
          </p>
          <h3>Peut-on emprunter pour une SCPI à plus de 60 ans ?</h3>
          <p>
            Cela dépend de chaque banque : revenus, patrimoine, assurance emprunteur, durée. Nous
            n'avons pas de règle générale à donner ; l'âge pèse surtout via l'assurance et la durée
            raisonnable du prêt.
          </p>
          <h3>Qu'est-ce que la loi Lemoine change pour un emprunteur proche de la retraite ?</h3>
          <p>
            Elle supprime le questionnaire de santé sous {euros(D.lemoineMontantMax)} assurés par
            personne si le remboursement s'achève avant {D.lemoineAgeFinRemboursement} ans. Au-delà,
            le questionnaire reste en principe exigé.
          </p>
          <h3>Vaut-il mieux emprunter ou payer comptant ?</h3>
          <p>
            Il n'y a pas de réponse générale. Le comptant évite l'effort mensuel et le risque de
            revente forcée, mais mobilise l'épargne. Le crédit conserve l'épargne, mais engage
            pendant {E.dureeAnnees} ans sur un revenu qui n'est pas garanti.
          </p>
          <h3>Où comparer les SCPI avant de souscrire ?</h3>
          <p>
            Pour comparer les véhicules entre eux, consultez{" "}
            <a href="https://immobilierpassif.com" target="_blank" rel="noopener noreferrer">
              immobilierpassif.com
            </a>
            ; pour souscrire avec accompagnement, rendez-vous sur{" "}
            <a href="https://scpirentable.fr" target="_blank" rel="noopener noreferrer">
              scpirentable.fr
            </a>
            . Voir aussi notre{" "}
            <a href="/strategies/immobilier-retraite">stratégie immobilier</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            L'emprunt n'améliore pas le placement : il en amplifie les résultats, dans les deux
            sens. Il permet d'investir sans mobiliser d'épargne, mais il transforme un revenu
            incertain en dette certaine. Dans l'exemple, l'effort d'épargne réel est d'environ{" "}
            {euros(effortAn1 / 12)} par mois au départ, et, pendant les premières années, les frais
            de souscription ajoutés à un recul du prix de part suffisent à rendre la valeur de
            retrait inférieure au capital restant dû.
          </p>
          <p>
            À l'approche de la retraite, trois critères pèsent plus lourd : la durée du crédit au
            regard de la date de départ, le coût et l'accessibilité de l'assurance, et la
            capacité à payer les échéances si les revenus de la SCPI baissent. Ces critères se
            jugent sur votre situation, pas sur un exemple.
          </p>
          <p>
            Pour tester la cohérence avec vos futurs revenus, notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> donne un premier ordre de
            grandeur de pension. Si vous souhaitez ensuite replacer cette décision dans votre
            budget et votre patrimoine, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à poser le
            cadre général.
          </p>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées le {IMMO.maj} :</p>
          <ul>
            {sources.map((src) => (
              <li key={src.url}>
                <a href={src.url} target="_blank" rel="noopener noreferrer">
                  {src.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé : elle ne
              tient pas compte de votre situation, de vos objectifs ni de votre capacité de
              remboursement. Les règles citées sont celles publiées au {IMMO.maj} et peuvent
              évoluer. Les exemples chiffrés sont des illustrations pédagogiques sur hypothèses
              affichées (hors assurance emprunteur), sans lien avec un cas réel, qui ne préjugent
              ni des résultats futurs ni des conditions de financement que vous obtiendrez.
              Emprunter pour investir comporte un risque de perte supérieur au capital investi.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Emprunter pour investir se décide mensualité en main, retraite comprise." />
    </>
  );
}
