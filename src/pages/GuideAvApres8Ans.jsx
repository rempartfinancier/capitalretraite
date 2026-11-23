import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RENTE_VIAGERE,
  AV_8ANS_NOV2026,
  AV_RACHAT,
  DECUMULATION,
  ENVELOPPES_NOV2026,
  FISCALITE,
  TRANSMISSION,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const duree = AV_RACHAT.dureeTauxReduitAnnees; // 8
const seuil = AV_RACHAT.seuilPrimesTauxReduit; // 150 000 €
const tauxIR = FISCALITE.pfuIR;
const tauxReduit = FISCALITE.avTauxReduitApres8Ans;
const tauxPS = FISCALITE.prelevementsSociaux.assuranceVie;
const tauxPSRente = RENTE_VIAGERE.prelevementsSociauxRvto; // rente viagère à titre onéreux (18,6 % depuis la LFSS 2026, à vérifier)
const abattSeul = FISCALITE.avAbattementAnnuelSeul;
const abattCouple = FISCALITE.avAbattementAnnuelCouple;
const ex = AV_8ANS_NOV2026;
const tauxConv = DECUMULATION.tauxConversionRente65;
const rendRetraits = DECUMULATION.rendementCapitalPendantRetraits;
const evF = DECUMULATION.esperanceVie65.femmes;
const evH = DECUMULATION.esperanceVie65.hommes;
const tranches = ENVELOPPES_NOV2026.avRenteFractionImposable;
const fractionExemple = tranches.find((t) => t.ages === ex.trancheAge).pct;

// Arrondi au centime, puis formatage avec centimes seulement s'ils existent.
const r2 = (n) => Math.round(n * 100) / 100;
const de = (base, taux) => r2((base * taux) / 100);
const eur = (n) =>
  Number.isInteger(r2(n))
    ? euros(n)
    : new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(r2(n));

// ---- Rente viagère à titre onéreux : trois taux de conversion ----
// Rente annuelle = capital × taux de conversion ; fraction imposable = rente × fraction (selon l'âge) ;
// prélèvements sociaux supposés assis sur la fraction imposable (hypothèse À VÉRIFIER).
const rentes = [tauxConv.min, tauxConv.defaut, tauxConv.max].map((taux) => {
  const rente = de(ex.capitalConverti, taux);
  const imposable = de(rente, fractionExemple);
  return { taux, rente, imposable, ps: de(imposable, tauxPSRente) };
});
const rDef = rentes[1];
const parTmi = ex.tmisExemple.map((tmi) => {
  const ir = de(rDef.imposable, tmi);
  return { tmi, ir, net: r2(rDef.rente - ir - rDef.ps) };
});

// ---- Rachats : même montant annuel prélevé sur le même contrat (année 1) ----
const gainsContrat = ex.capitalConverti - ex.primesNonRemboursees;
const partGainsPct = r2((gainsContrat / ex.capitalConverti) * 100);
const rachat = rDef.rente;
const gainsRachat = de(rachat, partGainsPct);
const psRachat = de(gainsRachat, tauxPS);
const irRachatSeul = de(Math.max(gainsRachat - abattSeul, 0), tauxReduit);
const netRachat = r2(rachat - psRachat - irRachatSeul);

// Capital restant après n années de retraits annuels (retrait en début d'année, rendement brut de frais
// et d'impôt, hypothèse non garantie).
const capitalApres = (n) => {
  let cap = ex.capitalConverti;
  for (let i = 0; i < n; i += 1) cap = Math.max((cap - rachat) * (1 + rendRetraits / 100), 0);
  return Math.round(cap);
};
let anneesEpuisement = 0;
{
  let cap = ex.capitalConverti;
  while (cap > 0 && anneesEpuisement < 80) {
    cap = Math.max((cap - rachat) * (1 + rendRetraits / 100), 0);
    anneesEpuisement += 1;
  }
}
const capH = capitalApres(evH);
const capF = capitalApres(evF);

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : comment sont imposés les revenus d'un contrat d'assurance-vie ? Fiche F22414, vérifiée le 15 avril 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22414",
  },
  {
    label:
      "BOFiP — BOI-RPPM-RCM-20-10-20-50, produits des bons ou contrats de capitalisation et d'assurance-vie (version en vigueur depuis le 30 juin 2022) : rachats, abattement annuel, rentes viagères",
    url: "https://bofip.impots.gouv.fr/bofip/3951-PGP.html",
  },
  {
    label:
      "BOFiP — BOI-RPPM-RCM-20-15, modalités d'imposition à l'impôt sur le revenu (version en vigueur depuis le 21 juin 2021) : taux de 12,8 % et de 7,5 %, seuil de 150 000 €",
    url: "https://bofip.impots.gouv.fr/bofip/11224-PGP.html",
  },
  {
    label:
      "impots.gouv.fr — Les revenus mobiliers (mise à jour du 8 avril 2026) : prélèvements sociaux, produits d'assurance-vie restant à 17,2 %",
    url: "https://www.impots.gouv.fr/particulier/les-revenus-mobiliers",
  },
  {
    label:
      "Légifrance — Code de la sécurité sociale, art. L. 136-8, IV, 4° (version en vigueur depuis le 27 juin 2026, consultée le 16 novembre 2026) : CSG maintenue à 9,2 % sur les produits des contrats d'assurance-vie",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051287395",
  },
];

export default function GuideAvApres8Ans() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide prix · Assurance-vie et décaissement</span>
          <h1>Assurance-vie après {duree} ans : fiscalité, abattement et sortie en rente</h1>
          <p className="sub">
            Ce qui change au {duree}e anniversaire, les trois façons de sortir à la retraite et la
            fiscalité, souvent mal connue, de la rente viagère. Mis à jour en {ex.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> au {duree}e anniversaire du contrat, l'impôt sur le
              revenu des gains passe de {pct(tauxIR)} à {pct(tauxReduit)} (jusqu'à {euros(seuil)}{" "}
              de primes) et un abattement annuel de {euros(abattSeul)} (personne seule) ou{" "}
              {euros(abattCouple)} (couple) apparaît ; les prélèvements sociaux de {pct(tauxPS)}{" "}
              restent dus. Si vous convertissez en rente viagère, seule une fraction de la rente,
              fixée par votre âge à l'entrée en jouissance ({pct(fractionExemple)} à{" "}
              {ex.ageEntreeRente} ans), est imposable. Exemple illustratif : {euros(ex.capitalConverti)}{" "}
              convertis à {pct(tauxConv.defaut)} donnent {euros(rDef.rente)} de rente par an, dont{" "}
              {euros(rDef.imposable)} seulement entrent dans l'assiette.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#huitieme-anniversaire">Que change le {duree}e anniversaire d'un contrat d'assurance-vie ?</a></li>
              <li><a href="#trois-sorties">Trois façons de sortir à la retraite</a></li>
              <li><a href="#rente-fiscalite">Comment est imposée une rente viagère issue d'une assurance-vie ?</a></li>
              <li><a href="#exemple-rente">Exemple chiffré : {euros(ex.capitalConverti)} convertis en rente à {ex.ageEntreeRente} ans</a></li>
              <li><a href="#comparaison">Rente ou rachats : la comparaison chiffrée</a></li>
              <li><a href="#transmission">Et la transmission ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            « Après huit ans, l'assurance-vie devient avantageuse » : la formule est exacte, mais
            elle cache deux erreurs de lecture. La première consiste à y voir une exonération. La
            seconde, plus fréquente chez les futurs retraités, est d'ignorer que la fiscalité
            change complètement de nature selon la façon dont on sort : un rachat est imposé sur sa
            part de gains, une rente sur une fraction forfaitaire de son montant.
          </p>
          <p>
            Prenons un profil illustratif, sans lien avec un cas réel : une personne seule proche
            de la retraite dont le contrat, ouvert il y a une dizaine d'années, doit servir de
            complément à la pension. Sa question n'est pas « combien rapporte-t-il ? » mais « sous
            quelle forme le récupérer, et à quel coût fiscal ? ». Ce guide répond à la fiscalité ; les calculs sont
            à refaire avec vos chiffres.
          </p>

          <h2 id="huitieme-anniversaire">Que change le {duree}e anniversaire d'un contrat d'assurance-vie ?</h2>
          <p>
            À partir de {duree} ans, la part de gains d'un rachat bénéficie d'un taux d'impôt sur le
            revenu réduit à {pct(tauxReduit)} (au lieu de {pct(tauxIR)}) et d'un abattement annuel
            de {euros(abattSeul)} pour une personne seule ou {euros(abattCouple)} pour un couple
            soumis à imposition commune. Les prélèvements sociaux de {pct(tauxPS)} s'appliquent
            toujours, sans abattement.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Sur les gains du rachat</th>
                  <th>Avant {duree} ans</th>
                  <th>À partir de {duree} ans</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Impôt sur le revenu (taux forfaitaire)</td>
                  <td>{pct(tauxIR)}</td>
                  <td>
                    {pct(tauxReduit)} si les primes n'excèdent pas {euros(seuil)} ; {pct(tauxIR)}{" "}
                    sur la fraction au-delà
                  </td>
                </tr>
                <tr>
                  <td>Abattement annuel</td>
                  <td>Aucun</td>
                  <td>{euros(abattSeul)} / {euros(abattCouple)}</td>
                </tr>
                <tr>
                  <td>Prélèvements sociaux</td>
                  <td>{pct(tauxPS)}</td>
                  <td>{pct(tauxPS)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Le seuil de {euros(seuil)} s'apprécie sur les primes non remboursées, tous contrats
            confondus, par personne. L'ancienneté se compte depuis la souscription du contrat, pas
            depuis chaque versement. La mécanique détaillée (formule de la part de gains, trois
            cas chiffrés, versements antérieurs à {AV_RACHAT.datePivotPrimes}) est dans{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">
              notre guide sur l'imposition du rachat partiel
            </a>
            , que nous ne reprenons pas ici.
          </p>

          <h2 id="trois-sorties">Trois façons de sortir à la retraite</h2>
          <p>
            Une fois le contrat éligible, trois modes de sortie coexistent, et ils peuvent se
            combiner : chacun a sa propre fiscalité.
          </p>
          <ul>
            <li>
              <strong>Les rachats partiels, à la demande.</strong> Vous retirez ce dont vous avez
              besoin, quand vous en avez besoin. Chaque rachat est imposé sur sa part de gains. La
              souplesse est maximale et le capital reste transmissible.
            </li>
            <li>
              <strong>Les rachats programmés.</strong> Le même mécanisme, mais un virement régulier
              (mensuel, trimestriel) fixé par contrat : il imite une pension, sans la garantir. Le
              capital continue d'être exposé aux marchés, donc au risque de perte en capital sur
              les unités de compte.
            </li>
            <li>
              <strong>La conversion en rente viagère.</strong> L'assureur verse un revenu à vie
              contre l'abandon, définitif, du capital converti. Le montant ne dépend plus des
              marchés, mais l'opération est irréversible. C'est le seul mode dont la fiscalité ne
              repose pas sur la part de gains.
            </li>
          </ul>
          <p>
            Pour arbitrer entre les deux dernières logiques,{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">
              notre comparatif rente viagère ou retraits programmés
            </a>{" "}
            et{" "}
            <a href="/guide/inconvenients-rente-viagere">
              notre guide sur les inconvénients de la rente viagère
            </a>{" "}
            traitent le fond (longévité, réversion, irréversibilité). Ici, nous nous limitons à la
            facture fiscale.
          </p>

          <h2 id="rente-fiscalite">Comment est imposée une rente viagère issue d'une assurance-vie ?</h2>
          <p>
            Une rente viagère issue d'une assurance-vie relève du régime des rentes viagères à
            titre onéreux (CGI, art. 158, 6) : seule une fraction de son montant est soumise à
            l'impôt sur le revenu, au barème progressif. Cette fraction est forfaitaire,
            déterminée une fois pour toutes par l'âge du crédirentier à la date d'entrée en
            jouissance de la rente.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Âge à l'entrée en jouissance</th>
                  <th>Fraction de la rente imposable</th>
                </tr>
              </thead>
              <tbody>
                {tranches.map((t) => (
                  <tr key={t.ages}>
                    <td>{t.ages}</td>
                    <td>{pct(t.pct)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Deux conséquences pratiques. D'abord, plus la rente démarre tard, plus la fraction
            imposable est faible : c'est la logique du barème, qui anticipe une durée de service
            plus courte. Ensuite, la fraction reste la même toute la vie de la rente, même si
            celle-ci est revalorisée ou si vous vieillissez : l'âge retenu est celui du premier
            jour, non celui de l'année d'imposition.
          </p>
          <p>
            Cette fraction est un abattement implicite, mais elle remplace le calcul de la part de
            gains : ni le taux de {pct(tauxReduit)} ni l'abattement annuel de {euros(abattSeul)}{" "}
            ne s'appliquent à la rente. Selon notre lecture des textes, les gains accumulés dans le
            contrat ne sont pas soumis à l'impôt sur le revenu au moment de la conversion. Les
            prélèvements sociaux sur ces gains, en revanche, peuvent être dus à cette date s'ils
            n'ont pas déjà été prélevés (cas des unités de compte notamment) : dans l'exemple
            ci-dessous, {euros(gainsContrat)} de gains représenteraient jusqu'à{" "}
            {euros(de(gainsContrat, tauxPS))} au taux de {pct(tauxPS)}, montant que la comparaison
            avec les rachats ne retient pas. Ces deux points sont à faire confirmer par écrit par
            votre assureur avant l'opération.
          </p>
          <div className="note">
            <p>
              Prélèvements sociaux sur la rente : à notre connaissance, ils sont calculés sur la
              même fraction imposable que l'impôt, et non sur le montant total de la rente. Le
              taux de {pct(tauxPSRente)} retenu ci-dessous est celui des rentes viagères à titre
              onéreux depuis la loi de financement de la sécurité sociale pour 2026 (le taux de{" "}
              {pct(tauxPS)} restant celui des gains de rachat d'assurance-vie). Ce point, comme la possibilité de déduire une partie de la CSG l'année suivante,
              est à vérifier auprès de l'assureur ou de l'administration fiscale. Les exemples
              qui suivent posent cette hypothèse et la signalent comme telle.
            </p>
          </div>

          <h2 id="exemple-rente">Exemple chiffré : {euros(ex.capitalConverti)} convertis en rente à {ex.ageEntreeRente} ans</h2>
          <p>
            Un contrat de plus de {duree} ans vaut {euros(ex.capitalConverti)}. À{" "}
            {ex.ageEntreeRente} ans, la fraction imposable de la rente est de{" "}
            {pct(fractionExemple)}. Le taux de conversion varie d'un assureur et d'un contrat à
            l'autre : le tableau retient trois valeurs indicatives, sans option de réversion.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Taux de conversion (indicatif)</th>
                  <th>Rente annuelle</th>
                  <th>Fraction imposable ({pct(fractionExemple)})</th>
                  {/* À VÉRIFIER : 18,6 % retenu pour la RVTO (Service-Public F2329 : 17,2 % maintenu seulement pour foncier, PV immobilières, AV, PEL, CEL, PEP) ; confirmer pour une rente issue d'AV */}
                  <th>Prélèvements sociaux ({pct(tauxPSRente)}, hypothèse)</th>
                </tr>
              </thead>
              <tbody>
                {rentes.map((r) => (
                  <tr key={r.taux}>
                    <td>{pct(r.taux)}</td>
                    <td>{eur(r.rente)}</td>
                    <td>{eur(r.imposable)}</td>
                    <td>{eur(r.ps)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Prenons le taux de {pct(tauxConv.defaut)} : la rente annuelle est de {eur(rDef.rente)}{" "}
            ({euros(ex.capitalConverti)} × {pct(tauxConv.defaut)}). La fraction imposable est de{" "}
            {eur(rDef.imposable)}, et les prélèvements sociaux, dans l'hypothèse posée, de{" "}
            {eur(rDef.ps)}. L'impôt sur le revenu dépend ensuite de votre tranche marginale :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Tranche marginale d'imposition</th>
                  <th>Impôt sur {eur(rDef.imposable)}</th>
                  <th>Rente nette après impôt et prélèvements sociaux</th>
                  <th>Fiscalité en % de la rente</th>
                </tr>
              </thead>
              <tbody>
                {parTmi.map((t) => (
                  <tr key={t.tmi}>
                    <td>{pct(t.tmi)}</td>
                    <td>{eur(t.ir)}</td>
                    <td>{eur(t.net)}</td>
                    <td>{pct(r2(((rDef.rente - t.net) / rDef.rente) * 100))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Ces montants ignorent d'éventuelles déductions et le détail de votre foyer fiscal :
            ils servent à situer un ordre de grandeur, pas à calculer votre impôt. Retenez
            surtout l'effet de structure : la fiscalité pèse sur {pct(fractionExemple)} de la
            rente, et non sur la totalité.
          </p>

          <h2 id="comparaison">Rente ou rachats : la comparaison chiffrée</h2>
          <p>
            Comparons, sur le même contrat, la rente de {eur(rDef.rente)} par an et un rachat
            annuel du même montant. Le contrat de {euros(ex.capitalConverti)} contient{" "}
            {euros(ex.primesNonRemboursees)} de versements non remboursés, donc{" "}
            {euros(gainsContrat)} de gains ({pct(partGainsPct)} de sa valeur). Hypothèses : versements
            postérieurs au {AV_RACHAT.datePivotPrimes}, personne seule, aucun autre rachat dans
            l'année, prélèvements sociaux non encore acquittés.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Première année, {eur(rachat)} reçus</th>
                  <th>Rente viagère</th>
                  <th>Rachat partiel</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Base imposable</td>
                  <td>{eur(rDef.imposable)} (fraction forfaitaire)</td>
                  <td>{eur(gainsRachat)} (part de gains)</td>
                </tr>
                <tr>
                  <td>Impôt sur le revenu</td>
                  <td>
                    {eur(parTmi[0].ir)} à {pct(parTmi[0].tmi)} ; {eur(parTmi[1].ir)} à{" "}
                    {pct(parTmi[1].tmi)}
                  </td>
                  <td>{eur(irRachatSeul)} (gains sous l'abattement de {euros(abattSeul)})</td>
                </tr>
                <tr>
                  <td>Prélèvements sociaux</td>
                  <td>{eur(rDef.ps)} (hypothèse)</td>
                  <td>{eur(psRachat)}</td>
                </tr>
                <tr>
                  <td>Net reçu</td>
                  <td>
                    {eur(parTmi[0].net)} à {pct(parTmi[0].tmi)} ; {eur(parTmi[1].net)} à{" "}
                    {pct(parTmi[1].tmi)}
                  </td>
                  <td>{eur(netRachat)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Sur la première année, le rachat est moins taxé : ses gains restent sous l'abattement,
            alors que la fraction imposable de la rente subit le barème. L'écart est réel mais
            trompeur si on le lit seul, pour trois raisons.
          </p>
          <ul>
            <li>
              <strong>La part de gains évolue.</strong> À chaque rachat, le contrat se vide de ses
              versements et de ses gains dans la même proportion ; si le contrat gagne du terrain
              sur ses versements, la part de gains d'un rachat peut grimper et dépasser l'abattement.
              La fraction de la rente, elle, ne bouge pas.
            </li>
            <li>
              <strong>Les deux ne durent pas pareil.</strong> En supposant, hypothèse non
              garantie, un rendement net de {pct(rendRetraits)} par an sur le capital restant et
              des rachats en début d'année, le capital de {euros(ex.capitalConverti)} se serait
              épuisé en {anneesEpuisement} ans environ. Après {evH} ans (espérance de vie à{" "}
              {ex.ageEntreeRente} ans d'un homme) il resterait environ {euros(capH)} ; après {evF}{" "}
              ans (une femme), environ {euros(capF)}. Ces valeurs sont brutes de frais et d'impôt,
              et valent pour une hypothèse de rendement, jamais pour une promesse.
            </li>
            <li>
              <strong>Ce n'est pas le même contrat de risque.</strong> La rente couvre la
              longévité mais abandonne le capital ; les rachats gardent le capital transmissible mais
              exposent à un épuisement si les marchés déçoivent ou si l'on vit très vieux.
            </li>
          </ul>
          <p>
            La fiscalité n'est donc qu'un critère parmi d'autres, rarement le premier. Pour
            situer l'assurance-vie parmi vos autres enveloppes, voyez{" "}
            <a href="/guide/ordre-de-decaissement-retraite">
              notre guide sur l'ordre de décaissement
            </a>{" "}
            ; pour le choix du contrat lui-même,{" "}
            <a href="/guide/meilleure-assurance-vie-retraite">
              notre comparatif des assurances-vie pour la retraite
            </a>
            . La vue d'ensemble est sur{" "}
            <a href="/strategies/assurance-vie-retraite">
              notre page stratégie assurance-vie pour la retraite
            </a>
            .
          </p>

          <h2 id="transmission">Et la transmission ?</h2>
          <p>
            L'autre avantage fiscal de l'assurance-vie se joue au décès, indépendamment de la règle
            des {duree} ans. Pour les primes versées avant 70 ans, chaque bénéficiaire profite d'un
            abattement de {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} (art. 990 I
            du CGI) ; pour les primes versées après 70 ans, un abattement global de{" "}
            {euros(TRANSMISSION.abattementSuccessionAvApres70Collectif)} s'applique pour
            l'ensemble des bénéficiaires, hors les gains (art. 757 B). Une rente sans option de
            réversion ne laisse en revanche aucun capital à transmettre. Le détail est dans{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">
              notre guide donation ou assurance-vie
            </a>
            .
          </p>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Que se passe-t-il exactement au {duree}e anniversaire de mon contrat ?</h3>
          <p>
            Rien d'automatique : le contrat ne change pas. Ce sont les règles fiscales des rachats
            qui s'améliorent : taux de {pct(tauxReduit)} sur les gains jusqu'à {euros(seuil)} de
            primes, et abattement annuel de {euros(abattSeul)} ou {euros(abattCouple)}. Les
            prélèvements sociaux de {pct(tauxPS)} restent dus.
          </p>

          <h3>Faut-il attendre le {duree}e anniversaire pour sortir en rente ?</h3>
          <p>
            Non, la conversion en rente est possible avant, selon les conditions du contrat. Mais
            la rente à titre onéreux est imposée selon la fraction liée à votre âge, quelle que
            soit l'ancienneté : la règle des {duree} ans concerne les rachats, pas la rente.
          </p>

          <h3>La fraction imposable de la rente change-t-elle avec l'âge ?</h3>
          <p>
            Non. Elle est fixée à la date d'entrée en jouissance et reste identique ensuite, même
            si la rente est revalorisée. Pour {ex.ageEntreeRente} ans, elle est de{" "}
            {pct(fractionExemple)} dans l'exemple de ce guide.
          </p>

          <h3>Les prélèvements sociaux s'appliquent-ils sur toute la rente ?</h3>
          <p>
            À notre connaissance, ils sont assis sur la fraction imposable et non sur le montant
            total, au taux de {pct(tauxPSRente)} retenu pour les rentes viagères à titre onéreux. Ce point est à confirmer
            auprès de l'assureur ou de l'administration fiscale avant toute décision.
          </p>

          <h3>L'abattement de {euros(abattSeul)} joue-t-il pour la rente ?</h3>
          <p>
            Non : l'abattement annuel concerne les gains des rachats. La rente suit son propre
            mécanisme, la fraction forfaitaire.
          </p>

          <h3>Peut-on convertir une partie seulement du contrat en rente ?</h3>
          <p>
            Selon les contrats, oui : certains assureurs permettent une conversion partielle, le
            reste demeurant disponible pour des rachats. C'est souvent la solution retenue par les
            épargnants qui veulent un socle de revenu sans tout verrouiller. Les conditions
            figurent dans la notice du contrat.
          </p>

          <h3>Les rachats programmés sont-ils imposés comme les rachats ponctuels ?</h3>
          <p>
            Oui : chaque virement est un rachat partiel imposé sur sa part de gains, et
            l'abattement s'apprécie sur le total des gains retirés dans l'année civile.
          </p>

          <h3>Les unités de compte peuvent-elles perdre de la valeur avant la sortie ?</h3>
          <p>
            Oui. Les supports en unités de compte présentent un risque de perte en capital, que
            la fiscalité ne compense pas : une moins-value réduit simplement la part de gains,
            sans être déductible de vos autres revenus.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le {duree}e anniversaire ouvre un régime plus doux pour les rachats, sans effacer les
            prélèvements sociaux. La rente viagère obéit à une autre logique : une fraction
            forfaitaire de {pct(fractionExemple)} à {ex.ageEntreeRente} ans, imposée au barème, qui
            fait peser sur la rente de l'exemple entre{" "}
            {pct(r2(((rDef.rente - parTmi[0].net) / rDef.rente) * 100))} et{" "}
            {pct(r2(((rDef.rente - parTmi[1].net) / rDef.rente) * 100))} de son montant selon la
            tranche, dans l'hypothèse de prélèvements sociaux posée plus haut.
          </p>
          <p>
            Ce que le calcul ne dit pas : si vous avez besoin d'un revenu garanti ou de souplesse,
            de transmettre ou non, et quelle part du contrat convertir. C'est cette question, bien
            plus que l'écart d'impôt d'une année donnée, qui décide du bon mode de
            sortie. Si vous souhaitez la poser dans votre trajectoire complète (pensions
            attendues, autres enveloppes, rythme de retraits), le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à fixer ce cadre
            avant toute décision.
          </p>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en {ex.maj} :</p>
          <ul>
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
            <li>Code général des impôts, art. 158, 6 (rentes viagères à titre onéreux), 990 I et 757 B (transmission).</li>
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seuls les
              documents de votre assureur et votre avis d'impôt font foi. Les règles et taux cités
              sont ceux connus en {ex.maj} et peuvent évoluer avec les lois de finances. Les taux
              de conversion, les rendements et les durées sont des hypothèses pédagogiques, non
              garanties. Les supports en unités de compte présentent un risque de perte en capital.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="La fiscalité d'une sortie se calcule. Le bon mode de sortie se construit." />
    </>
  );
}
