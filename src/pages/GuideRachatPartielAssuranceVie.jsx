import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  AV_RACHAT,
  AV_RACHAT_EXEMPLES,
  FISCALITE,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const tauxIR = FISCALITE.pfuIR; // 12,8 %
const tauxReduit = FISCALITE.avTauxReduitApres8Ans; // 7,5 %
const tauxPS = FISCALITE.prelevementsSociaux.assuranceVie; // 17,2 %
const tauxPSAutres = FISCALITE.prelevementsSociaux.cto; // 18,6 %
const abattementSeul = FISCALITE.avAbattementAnnuelSeul;
const abattementCouple = FISCALITE.avAbattementAnnuelCouple;
const seuil = AV_RACHAT.seuilPrimesTauxReduit;
const duree = AV_RACHAT.dureeTauxReduitAnnees;

// Arrondi au centime pour éviter les artefacts de virgule flottante.
const r2 = (n) => Math.round(n * 100) / 100;
const de = (base, taux) => r2((base * taux) / 100);

// Montants en euros avec centimes uniquement quand ils existent.
const eur = (n) =>
  Number.isInteger(r2(n))
    ? euros(n)
    : new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(r2(n));

// ---- Mécanique du rachat partiel (BOI-RPPM-RCM-20-10-20-50, § 80) ----
// Part de primes remboursée = primes non remboursées × rachat ÷ valeur du contrat.
// Part de gains = rachat − part de primes remboursée.
const decompose = ({ valeurContrat, primesNonRemboursees, rachat }) => {
  const primesRemboursees = r2((primesNonRemboursees * rachat) / valeurContrat);
  const gains = r2(rachat - primesRemboursees);
  return {
    valeurContrat,
    primesNonRemboursees,
    rachat,
    gainsContrat: valeurContrat - primesNonRemboursees,
    primesRemboursees,
    gains,
    partGainsPct: r2(((valeurContrat - primesNonRemboursees) / valeurContrat) * 100),
    ps: de(gains, tauxPS),
  };
};

// ---- Cas 1 : petit rachat, avant puis après 8 ans ----
const c1 = decompose(AV_RACHAT_EXEMPLES.cas1);
const c1IRAvant = de(c1.gains, tauxIR);
const c1TotalAvant = r2(c1IRAvant + c1.ps);
const c1NetAvant = r2(c1.rachat - c1TotalAvant);
const c1AcompteApres = de(c1.gains, tauxReduit);
const c1IRApres = de(Math.max(c1.gains - abattementSeul, 0), tauxReduit);
const c1NetApres = r2(c1.rachat - c1.ps - c1IRApres);
// État du contrat après ce premier rachat (pour le rachat suivant).
const c1ValeurApres = c1.valeurContrat - c1.rachat;
const c1PrimesApres = r2(c1.primesNonRemboursees - c1.primesRemboursees);

// ---- Cas 2 : contrat de plus de 8 ans, gains supérieurs à l'abattement ----
const c2 = decompose(AV_RACHAT_EXEMPLES.cas2);
const c2BaseCouple = Math.max(c2.gains - abattementCouple, 0);
const c2IRCouple = de(c2BaseCouple, tauxReduit);
const c2TotalCouple = r2(c2IRCouple + c2.ps);
const c2BaseSeul = Math.max(c2.gains - abattementSeul, 0);
const c2IRSeul = de(c2BaseSeul, tauxReduit);
const c2TotalSeul = r2(c2IRSeul + c2.ps);
const c2Acompte = de(c2.gains, tauxReduit);

// ---- Cas 3 : plus de 150 000 € de primes (toutes versées depuis le 27/09/2017) ----
// Fraction des gains au taux réduit = gains × seuil ÷ primes non remboursées
// (BOI-RPPM-RCM-20-15, § 190) ; l'abattement s'impute d'abord sur cette fraction
// (BOI-RPPM-RCM-20-10-20-50, § 288).
const c3 = decompose(AV_RACHAT_EXEMPLES.cas3);
const c3FractionReduite = r2((c3.gains * Math.min(seuil, c3.primesNonRemboursees)) / c3.primesNonRemboursees);
const c3FractionPleine = r2(c3.gains - c3FractionReduite);
const c3AbattSurReduite = Math.min(abattementSeul, c3FractionReduite);
const c3AbattSurPleine = Math.min(abattementSeul - c3AbattSurReduite, c3FractionPleine);
const c3BaseReduite = r2(c3FractionReduite - c3AbattSurReduite);
const c3BasePleine = r2(c3FractionPleine - c3AbattSurPleine);
const c3IRReduit = de(c3BaseReduite, tauxReduit);
const c3IRPlein = de(c3BasePleine, tauxIR);
const c3IR = r2(c3IRReduit + c3IRPlein);
const c3Total = r2(c3IR + c3.ps);

// ---- Grille de lecture : poids de la fiscalité selon la part de gains du contrat ----
const tauxGlobalAvant = r2(tauxIR + tauxPS); // 30 %
const tauxGlobalApres = r2(tauxReduit + tauxPS); // 24,7 %
const grille = AV_RACHAT_EXEMPLES.partsDeGainsGrille.map((part) => ({
  part,
  avant: r2((part * tauxGlobalAvant) / 100),
  apresSousAbattement: r2((part * tauxPS) / 100),
  rachatSeul: Math.round((abattementSeul * 100) / part),
  rachatCouple: Math.round((abattementCouple * 100) / part),
}));

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : comment sont imposés les revenus d'un contrat d'assurance-vie ? Fiche F22414, vérifiée le 15 avril 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22414",
  },
  {
    label:
      "BOFiP — BOI-RPPM-RCM-20-10-20-50, produits des bons ou contrats de capitalisation et d'assurance-vie (version en vigueur depuis le 30 juin 2022) : calcul du produit imposable d'un rachat partiel, abattement annuel et ordre d'imputation",
    url: "https://bofip.impots.gouv.fr/bofip/3951-PGP.html",
  },
  {
    label:
      "BOFiP — BOI-RPPM-RCM-20-15, modalités d'imposition à l'impôt sur le revenu (version en vigueur depuis le 21 juin 2021) : taux de 12,8 % et de 7,5 %, seuil de 150 000 €, option pour le barème",
    url: "https://bofip.impots.gouv.fr/bofip/11224-PGP.html",
  },
  {
    label:
      "impots.gouv.fr — Les revenus mobiliers (mise à jour du 8 avril 2026) : prélèvements sociaux à 18,6 % depuis le 1er janvier 2026, produits restant à 17,2 %, case 2OP",
    url: "https://www.impots.gouv.fr/particulier/les-revenus-mobiliers",
  },
  {
    label:
      "impots.gouv.fr — Comment sont imposés les produits des contrats d'assurance-vie depuis le 1er janvier 2018 ? (page modifiée le 20 mars 2026, consultée le 16 novembre 2026) : prélèvement libératoire de 35 %, 15 % ou 7,5 % pour les primes versées jusqu'au 26 septembre 2017, acompte de 12,8 % ou 7,5 % pour les primes ultérieures",
    url: "https://www.impots.gouv.fr/particulier/questions/jai-effectue-des-retraits-sur-mon-contrat-dassurance-vie-quelles-sont-les",
  },
  {
    label:
      "Légifrance — Code de la sécurité sociale, art. L. 136-8, IV, 4° (version en vigueur depuis le 27 juin 2026, consultée le 16 novembre 2026) : CSG maintenue à 9,2 % sur les produits des contrats d'assurance-vie et de capitalisation",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051287395",
  },
  {
    label:
      "Légifrance — Code de la sécurité sociale, art. L. 136-7, II, 3° (version en vigueur depuis le 21 février 2026, consultée le 16 novembre 2026) : prélèvement lors de l'inscription au contrat pour les droits exprimés en euros",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053584839",
  },
];

export default function GuideRachatPartielAssuranceVie() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide prix · Assurance-vie et décaissement</span>
          <h1>Rachat partiel d'assurance-vie : comment est-il imposé ?</h1>
          <p className="sub">
            Part de gains, avant et après {duree} ans, abattement, prélèvements sociaux : la
            mécanique et trois cas chiffrés. Mis à jour le {AV_RACHAT.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> un rachat partiel d'assurance-vie n'est imposé que sur
              sa part de gains, jamais sur le capital que vous récupérez. Cette part se calcule
              ainsi : rachat × gains du contrat ÷ valeur du contrat. Exemple illustratif : un
              rachat de {euros(c1.rachat)} sur un contrat de {euros(c1.valeurContrat)} dont{" "}
              {euros(c1.gainsContrat)} de gains contient {euros(c1.gains)} de gains imposables. En
              2026, ces gains supportent {pct(tauxPS)} de prélèvements sociaux, plus l'impôt sur le
              revenu : {pct(tauxIR)} avant {duree} ans, {pct(tauxReduit)} après {duree} ans au-delà
              d'un abattement annuel de {euros(abattementSeul)} (personne seule) ou{" "}
              {euros(abattementCouple)} (couple).
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#part-de-gains">Comment calculer la part de gains d'un rachat partiel d'assurance-vie ?</a></li>
              <li><a href="#tableau">Quel impôt sur un rachat d'assurance-vie avant et après {duree} ans ?</a></li>
              <li><a href="#exemples">Combien d'impôt sur un rachat partiel ? Trois cas chiffrés</a></li>
              <li><a href="#grille">Quel pourcentage du rachat part réellement en impôt ?</a></li>
              <li><a href="#prelevement">Comment l'impôt est-il prélevé puis régularisé ?</a></li>
              <li><a href="#150000">Que change le seuil de {euros(seuil)} de primes versées ?</a></li>
              <li><a href="#avant-2017">Et pour les versements effectués avant le {AV_RACHAT.datePivotPrimes} ?</a></li>
              <li><a href="#erreurs">Quelles erreurs faussent le calcul d'un rachat partiel ?</a></li>
              <li><a href="#checklist">Que vérifier avant de demander un rachat partiel ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Le moment où l'on commence à puiser dans son assurance-vie est souvent celui où l'on
            découvre que l'on n'a jamais vraiment compris sa fiscalité. On a entendu « après huit
            ans, c'est exonéré », on a lu « 30 % de taxes », et l'on se retrouve devant un
            formulaire de rachat sans savoir si retirer {euros(c1.rachat)} coûtera{" "}
            {euros(c1TotalAvant)} ou {euros(de(c1.rachat, tauxGlobalAvant))}. L'écart entre les
            deux n'est pas un détail : il tient entièrement à une notion que les relevés
            n'expliquent presque jamais, la part de gains.
          </p>
          <p>
            Prenons un profil illustratif, sans lien avec un cas réel : une cadre de 63 ans qui
            prépare son départ et veut compléter sa pension par des retraits réguliers sur un
            contrat ouvert il y a une dizaine d'années. Sa question n'est pas « combien rapporte
            mon contrat ? » mais « sur ce que je retire, combien me reste-t-il vraiment ? ».
          </p>
          <p>
            Un rachat partiel est un retrait d'une partie de l'épargne d'un contrat
            d'assurance-vie, qui reste ouvert et conserve sa date de souscription. Ce guide décrit
            la règle en vigueur au {AV_RACHAT.maj} : la formule de la part de gains, le tableau
            d'imposition avant et après {duree} ans, puis trois cas chiffrés que vous pouvez
            refaire avec vos propres montants. Il ne dit pas s'il faut racheter, ni combien : cela
            dépend de votre situation d'ensemble.
          </p>

          <h2 id="part-de-gains">Comment calculer la part de gains d'un rachat partiel d'assurance-vie ?</h2>
          <p>
            La part de gains d'un rachat partiel est proportionnelle au poids des gains dans le
            contrat le jour du rachat : part de gains = montant du rachat × gains du contrat ÷
            valeur du contrat. Seule cette part est soumise à l'impôt sur le revenu et aux
            prélèvements sociaux ; le reste est un remboursement de vos propres versements, non
            imposé.
          </p>
          <p>
            L'administration fiscale formule la même règle dans l'autre sens (BOFiP,
            BOI-RPPM-RCM-20-10-20-50, § 80) : le produit imposable est égal au montant du rachat,
            diminué des primes versées retenues au prorata du rachat sur la valeur totale du
            contrat. Les deux écritures donnent le même résultat.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Étape</th>
                  <th>Calcul</th>
                  <th>Exemple illustratif</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1. Gains du contrat</td>
                  <td>Valeur du contrat − versements non encore remboursés</td>
                  <td>
                    {euros(c1.valeurContrat)} − {euros(c1.primesNonRemboursees)} ={" "}
                    {euros(c1.gainsContrat)}
                  </td>
                </tr>
                <tr>
                  <td>2. Poids des gains</td>
                  <td>Gains du contrat ÷ valeur du contrat</td>
                  <td>
                    {euros(c1.gainsContrat)} ÷ {euros(c1.valeurContrat)} = {pct(c1.partGainsPct)}
                  </td>
                </tr>
                <tr>
                  <td>3. Part de gains du rachat</td>
                  <td>Rachat × poids des gains</td>
                  <td>
                    {euros(c1.rachat)} × {pct(c1.partGainsPct)} = {euros(c1.gains)}
                  </td>
                </tr>
                <tr>
                  <td>4. Part de capital du rachat</td>
                  <td>Rachat − part de gains</td>
                  <td>
                    {euros(c1.rachat)} − {euros(c1.gains)} = {euros(c1.primesRemboursees)}, non
                    imposés
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Trois précisions évitent la plupart des contresens. D'abord, le calcul se fait au
            niveau du contrat entier, pas support par support : retirer sur le fonds en euros d'un
            contrat multisupport ne permet pas de « laisser » les gains des unités de compte de
            côté. Ensuite, chaque rachat réduit le stock de versements non remboursés : après le
            rachat de l'exemple, le contrat vaut {euros(c1ValeurApres)} pour{" "}
            {euros(c1PrimesApres)} de versements restants, et c'est sur cette nouvelle base que se
            calculera le rachat suivant. Enfin, un contrat dont la valeur est inférieure aux
            versements ne dégage aucun gain : le rachat n'est alors pas imposé.
          </p>

          <h2 id="tableau">Quel impôt sur un rachat d'assurance-vie avant et après {duree} ans ?</h2>
          <p>
            Pour les versements effectués depuis le {AV_RACHAT.datePivotPrimes}, la part de gains
            d'un rachat est imposée à {pct(tauxIR)} si le contrat a moins de {duree} ans, et à{" "}
            {pct(tauxReduit)} après un abattement annuel de {euros(abattementSeul)} ou{" "}
            {euros(abattementCouple)} s'il a {duree} ans ou plus. Dans les deux cas s'ajoutent{" "}
            {pct(tauxPS)} de prélèvements sociaux, sans abattement.
          </p>
          <p>
            L'ancienneté retenue est celle du contrat, comptée depuis sa souscription, et non
            celle de chaque versement : un versement fait la neuvième année profite immédiatement
            du régime des contrats de plus de {duree} ans.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Sur la part de gains du rachat</th>
                  <th>Contrat de moins de {duree} ans</th>
                  <th>Contrat de {duree} ans ou plus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Abattement annuel sur les gains</td>
                  <td>Aucun</td>
                  <td>
                    {euros(abattementSeul)} (personne seule) ou {euros(abattementCouple)} (couple
                    soumis à imposition commune), tous contrats confondus
                  </td>
                </tr>
                <tr>
                  <td>Impôt sur le revenu, taux forfaitaire</td>
                  <td>{pct(tauxIR)}</td>
                  <td>
                    {pct(tauxReduit)} pour les gains correspondant aux primes n'excédant pas{" "}
                    {euros(seuil)} ; {pct(tauxIR)} au-delà
                  </td>
                </tr>
                <tr>
                  <td>Option possible</td>
                  <td>Barème progressif de l'impôt sur le revenu</td>
                  <td>Barème progressif, après abattement</td>
                </tr>
                <tr>
                  <td>Acompte prélevé par l'assureur au moment du rachat</td>
                  <td>{pct(tauxIR)}</td>
                  <td>{pct(tauxReduit)}, calculé avant abattement</td>
                </tr>
                <tr>
                  <td>Prélèvements sociaux</td>
                  <td>{pct(tauxPS)}</td>
                  <td>{pct(tauxPS)}, l'abattement ne s'y applique pas</td>
                </tr>
                <tr>
                  <td>Taux global au taux forfaitaire</td>
                  <td>{pct(tauxGlobalAvant)} des gains</td>
                  <td>
                    {pct(tauxPS)} des gains sous l'abattement, {pct(tauxGlobalApres)} au-delà
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Source : Service-Public.gouv.fr, fiche F22414 (vérifiée le 15 avril 2026), et BOFiP.
            Le taux de {pct(tauxPS)} mérite une attention particulière en 2026 : depuis le 1er
            janvier 2026, les prélèvements sociaux sont passés à {pct(tauxPSAutres)} sur la
            plupart des revenus du capital, mais les produits des contrats d'assurance-vie font
            partie des exceptions restées à {pct(tauxPS)} (impots.gouv.fr, page « Les revenus
            mobiliers », mise à jour du 8 avril 2026) ; le code de la sécurité sociale maintient
            en effet la CSG à 9,2 % sur ces produits (art. L. 136-8, IV, 4°, version en vigueur
            depuis le 27 juin 2026). Le « prélèvement forfaitaire unique » d'un
            rachat d'assurance-vie de moins de {duree} ans est donc de {pct(tauxGlobalAvant)}, et
            non de {pct(r2(tauxIR + tauxPSAutres))} comme pour des dividendes ou un compte-titres.
          </p>
          <div className="note">
            <p>
              Sur les fonds en euros, les prélèvements sociaux sont en principe prélevés chaque
              année, au moment où les intérêts sont inscrits au contrat (code de la sécurité
              sociale, art. L. 136-7, II, 3°). Au rachat, seuls les
              gains qui ne les ont pas encore supportés y sont soumis : la retenue réelle peut
              donc être inférieure à {pct(tauxPS)} de la part de gains. Les exemples ci-dessous
              supposent, par simplicité, qu'aucun prélèvement social n'a encore été acquitté.
            </p>
          </div>
          <p>
            Certains rachats sont exonérés d'impôt sur le revenu sur leur part de gains : selon
            la fiche F22414 de Service-Public.gouv.fr, lorsqu'ils font suite au licenciement, à
            la mise à la retraite anticipée, à une invalidité de 2e ou 3e catégorie ou à la
            liquidation judiciaire de l'activité non salariée du souscripteur ou de son conjoint
            ou partenaire de Pacs, et interviennent avant la fin de l'année qui suit
            l'événement.
          </p>

          <h2 id="exemples">Combien d'impôt sur un rachat partiel ? Trois cas chiffrés</h2>
          <p>
            Sur les trois cas ci-dessous, la fiscalité totale représente entre{" "}
            {pct(r2((c1.ps / c1.rachat) * 100))} et {pct(r2((c2TotalSeul / c2.rachat) * 100))} du
            montant retiré, très loin des {pct(tauxGlobalAvant)} que l'on applique parfois, à
            tort, à l'ensemble du rachat.
          </p>
          <div className="note">
            <p>
              Les montants, la part de gains et la situation familiale de ces cas sont fournis à
              titre illustratif. Ils supposent des versements tous postérieurs au{" "}
              {AV_RACHAT.datePivotPrimes}, l'imposition au taux forfaitaire (sans option pour le
              barème), un seul rachat dans l'année et aucun prélèvement social déjà acquitté. Ils
              ne constituent ni une préconisation de montant ni une garantie, et doivent être
              adaptés à votre situation.
            </p>
          </div>

          <h3>Cas 1 : {euros(c1.rachat)} rachetés sur un contrat de {euros(c1.valeurContrat)}</h3>
          <p>
            Le contrat vaut {euros(c1.valeurContrat)}, dont {euros(c1.gainsContrat)} de gains (
            {pct(c1.partGainsPct)} de sa valeur). Le rachat de {euros(c1.rachat)} contient donc{" "}
            {euros(c1.gains)} de gains et {euros(c1.primesRemboursees)} de capital.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Personne seule</th>
                  <th>Contrat de moins de {duree} ans</th>
                  <th>Contrat de {duree} ans ou plus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Part de gains imposable</td>
                  <td>{eur(c1.gains)}</td>
                  <td>{eur(c1.gains)}</td>
                </tr>
                <tr>
                  <td>Abattement utilisé</td>
                  <td>Aucun</td>
                  <td>
                    {eur(Math.min(c1.gains, abattementSeul))} sur {euros(abattementSeul)}
                  </td>
                </tr>
                <tr>
                  <td>Impôt sur le revenu</td>
                  <td>
                    {eur(c1.gains)} × {pct(tauxIR)} = {eur(c1IRAvant)}
                  </td>
                  <td>{eur(c1IRApres)}</td>
                </tr>
                <tr>
                  <td>Prélèvements sociaux ({pct(tauxPS)})</td>
                  <td>{eur(c1.ps)}</td>
                  <td>{eur(c1.ps)}</td>
                </tr>
                <tr>
                  <td>Fiscalité totale</td>
                  <td>
                    {eur(c1TotalAvant)}, soit {pct(r2((c1TotalAvant / c1.rachat) * 100))} du
                    rachat
                  </td>
                  <td>
                    {eur(r2(c1.ps + c1IRApres))}, soit{" "}
                    {pct(r2(((c1.ps + c1IRApres) / c1.rachat) * 100))} du rachat
                  </td>
                </tr>
                <tr>
                  <td>Somme nette</td>
                  <td>{eur(c1NetAvant)}</td>
                  <td>{eur(c1NetApres)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Après {duree} ans, l'assureur retient tout de même un acompte de {pct(tauxReduit)} sur
            les gains, soit {eur(c1AcompteApres)} ici, car il ne connaît pas vos autres rachats de
            l'année. Les gains étant inférieurs à l'abattement, cet acompte est restitué par
            l'administration fiscale après la déclaration de revenus.
          </p>

          <h3>Cas 2 : {euros(c2.rachat)} rachetés sur un contrat de plus de {duree} ans de {euros(c2.valeurContrat)}</h3>
          <p>
            Le contrat vaut {euros(c2.valeurContrat)} pour {euros(c2.primesNonRemboursees)} de
            versements : les gains pèsent {pct(c2.partGainsPct)}. Le rachat de {euros(c2.rachat)}{" "}
            contient {euros(c2.gains)} de gains, davantage que l'abattement.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Contrat de {duree} ans ou plus</th>
                  <th>Couple soumis à imposition commune</th>
                  <th>Personne seule</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Part de gains du rachat</td>
                  <td>{eur(c2.gains)}</td>
                  <td>{eur(c2.gains)}</td>
                </tr>
                <tr>
                  <td>Abattement annuel</td>
                  <td>{eur(abattementCouple)}</td>
                  <td>{eur(abattementSeul)}</td>
                </tr>
                <tr>
                  <td>Gains imposés à {pct(tauxReduit)}</td>
                  <td>{eur(c2BaseCouple)}</td>
                  <td>{eur(c2BaseSeul)}</td>
                </tr>
                <tr>
                  <td>Impôt sur le revenu</td>
                  <td>{eur(c2IRCouple)}</td>
                  <td>{eur(c2IRSeul)}</td>
                </tr>
                <tr>
                  <td>Prélèvements sociaux ({pct(tauxPS)} des gains)</td>
                  <td>{eur(c2.ps)}</td>
                  <td>{eur(c2.ps)}</td>
                </tr>
                <tr>
                  <td>Fiscalité totale</td>
                  <td>
                    {eur(c2TotalCouple)}, soit {pct(r2((c2TotalCouple / c2.rachat) * 100))} du
                    rachat
                  </td>
                  <td>
                    {eur(c2TotalSeul)}, soit {pct(r2((c2TotalSeul / c2.rachat) * 100))} du rachat
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            L'acompte retenu par l'assureur au moment du rachat est de {eur(c2Acompte)} (
            {pct(tauxReduit)} de {eur(c2.gains)}) dans les deux situations ; la différence avec
            l'impôt réellement dû est restituée l'année suivante. On voit aussi que, dans ce cas,
            les prélèvements sociaux pèsent bien plus lourd que l'impôt sur le revenu : c'est la
            règle dès que l'abattement absorbe l'essentiel des gains.
          </p>

          <h3>Cas 3 : plus de {euros(seuil)} de versements, {euros(c3.rachat)} rachetés</h3>
          <p>
            Une personne seule détient un unique contrat de plus de {duree} ans valant{" "}
            {euros(c3.valeurContrat)}, pour {euros(c3.primesNonRemboursees)} de versements non
            remboursés, montant supposé identique au 31 décembre de l'année précédente. Le
            rachat de {euros(c3.rachat)} contient {euros(c3.gains)} de gains. Comme les versements
            dépassent {euros(seuil)}, seule une fraction des gains a droit au taux de{" "}
            {pct(tauxReduit)} : {euros(c3.gains)} × {euros(seuil)} ÷{" "}
            {euros(c3.primesNonRemboursees)} = {euros(c3FractionReduite)}. Le reste, soit{" "}
            {euros(c3FractionPleine)}, relève du taux de {pct(tauxIR)}.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Personne seule, contrat de {duree} ans ou plus</th>
                  <th>Fraction à {pct(tauxReduit)}</th>
                  <th>Fraction à {pct(tauxIR)}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gains avant abattement</td>
                  <td>{eur(c3FractionReduite)}</td>
                  <td>{eur(c3FractionPleine)}</td>
                </tr>
                <tr>
                  <td>Abattement de {euros(abattementSeul)}, imputé d'abord sur la fraction à {pct(tauxReduit)}</td>
                  <td>− {eur(c3AbattSurReduite)}</td>
                  <td>− {eur(c3AbattSurPleine)}</td>
                </tr>
                <tr>
                  <td>Gains imposés</td>
                  <td>{eur(c3BaseReduite)}</td>
                  <td>{eur(c3BasePleine)}</td>
                </tr>
                <tr>
                  <td>Impôt sur le revenu</td>
                  <td>{eur(c3IRReduit)}</td>
                  <td>{eur(c3IRPlein)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            L'impôt sur le revenu s'élève à {eur(c3IR)}, les prélèvements sociaux à {eur(c3.ps)} (
            {pct(tauxPS)} de {eur(c3.gains)}), soit {eur(c3Total)} au total :{" "}
            {pct(r2((c3Total / c3.rachat) * 100))} du rachat. L'ordre d'imputation de l'abattement
            (d'abord sur les gains à {pct(tauxReduit)}, puis sur ceux à {pct(tauxIR)}) est celui
            que fixe le BOFiP (BOI-RPPM-RCM-20-10-20-50, § 288).
          </p>

          <h2 id="grille">Quel pourcentage du rachat part réellement en impôt ?</h2>
          <p>
            Le poids de la fiscalité sur un rachat est égal à la part de gains du contrat
            multipliée par le taux applicable : avec {pct(grille[1].part)} de gains, un rachat
            avant {duree} ans supporte {pct(grille[1].avant)} de fiscalité, pas{" "}
            {pct(tauxGlobalAvant)}. Plus un contrat est ancien et a progressé, plus chaque euro
            retiré contient de gains.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Part de gains dans le contrat</th>
                  <th>Fiscalité en % du rachat, avant {duree} ans ({pct(tauxGlobalAvant)} des gains)</th>
                  <th>Fiscalité en % du rachat, après {duree} ans sous l'abattement ({pct(tauxPS)} des gains)</th>
                  <th>Rachat annuel dont les gains égalent l'abattement, personne seule</th>
                  <th>Idem, couple</th>
                </tr>
              </thead>
              <tbody>
                {grille.map((g) => (
                  <tr key={g.part}>
                    <td>{pct(g.part)}</td>
                    <td>{pct(g.avant)}</td>
                    <td>{pct(g.apresSousAbattement)}</td>
                    <td>{euros(g.rachatSeul)}</td>
                    <td>{euros(g.rachatCouple)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Les deux dernières colonnes se lisent comme un repère mécanique (abattement ÷ part de
            gains), calculé pour un contrat de plus de {duree} ans et pour l'ensemble des rachats
            d'une même année civile, tous contrats confondus. Ce n'est pas un montant à retirer :
            le bon niveau de retrait dépend d'abord de vos besoins, de vos autres revenus et de la
            durée sur laquelle le capital doit tenir. Sous ce repère, l'impôt sur le revenu est
            nul, mais les prélèvements sociaux restent dus.
          </p>

          <h2 id="prelevement">Comment l'impôt est-il prélevé puis régularisé ?</h2>
          <p>
            L'imposition d'un rachat se fait en deux temps : l'assureur retient un acompte au
            moment du versement, puis l'administration calcule l'impôt définitif l'année suivante,
            à partir de la déclaration de revenus. L'abattement de {euros(abattementSeul)} ou{" "}
            {euros(abattementCouple)} n'intervient qu'à cette seconde étape.
          </p>
          <ol>
            <li>
              <strong>Au rachat.</strong> L'assureur prélève les prélèvements sociaux dus et un
              prélèvement forfaitaire non libératoire sur la part de gains : {pct(tauxIR)} pour un
              contrat de moins de {duree} ans, {pct(tauxReduit)} à partir de {duree} ans. Vous
              recevez le montant net.
            </li>
            <li>
              <strong>Au début de l'année suivante.</strong> L'assureur vous adresse un imprimé
              fiscal unique (IFU) et transmet les mêmes informations à l'administration ; les
              montants sont en principe préremplis dans votre déclaration.
            </li>
            <li>
              <strong>À la déclaration, au printemps.</strong> Vous vérifiez les montants et
              choisissez entre le taux forfaitaire et le barème progressif. L'option pour le
              barème (case 2OP) est globale : elle s'applique à l'ensemble de vos revenus
              mobiliers et plus-values de l'année, pas au seul rachat.
            </li>
            <li>
              <strong>À l'avis d'impôt, à l'été.</strong> L'abattement est appliqué, l'impôt
              définitif est calculé et l'acompte en est déduit. S'il dépasse l'impôt dû,
              l'excédent vous est restitué.
            </li>
          </ol>
          <p>
            Il est possible d'être dispensé de l'acompte si le revenu fiscal de référence de
            l'avant-dernière année est inférieur à {euros(AV_RACHAT.rfrDispenseAcompteSeul)} pour
            une personne seule ou à {euros(AV_RACHAT.rfrDispenseAcompteCouple)} pour un couple
            soumis à imposition commune. La demande doit parvenir à l'établissement au plus tard
            le {AV_RACHAT.dateLimiteDemandeDispense} de l'année qui précède le rachat
            (Service-Public.gouv.fr, fiche F22414). La dispense ne supprime pas l'impôt : elle
            évite seulement de l'avancer.
          </p>

          <h2 id="150000">Que change le seuil de {euros(seuil)} de primes versées ?</h2>
          <p>
            Au-delà de {euros(seuil)} de versements, le taux de {pct(tauxReduit)} après {duree}{" "}
            ans ne s'applique plus qu'à une fraction des gains ; le reste est imposé à{" "}
            {pct(tauxIR)}. L'abattement annuel, lui, reste acquis quel que soit le montant versé.
          </p>
          <p>
            Selon le BOFiP (BOI-RPPM-RCM-20-15, § 140 à 190), ce seuil s'apprécie :
          </p>
          <ul>
            <li>
              sur les primes versées et non encore remboursées, c'est-à-dire les versements
              diminués de la part de capital des rachats antérieurs, et non sur la valeur du
              contrat ;
            </li>
            <li>
              sur l'ensemble des contrats d'assurance-vie et de capitalisation d'une même
              personne, quel que soit l'établissement ;
            </li>
            <li>
              par personne : c'est un seuil personnel, les versements du conjoint ne sont pas
              additionnés ;
            </li>
            <li>au 31 décembre de l'année qui précède le rachat.</li>
          </ul>
          <p>
            Lorsque le seuil est dépassé, la fraction des gains au taux de {pct(tauxReduit)} est
            égale aux gains multipliés par ({euros(seuil)} − primes versées avant le{" "}
            {AV_RACHAT.datePivotPrimes} non remboursées) ÷ primes versées depuis cette date non
            remboursées. Le cas 3 ci-dessus applique cette formule à un contrat entièrement
            alimenté après 2017.
          </p>

          <h2 id="avant-2017">Et pour les versements effectués avant le {AV_RACHAT.datePivotPrimes} ?</h2>
          <p>
            Les gains attachés aux versements antérieurs au {AV_RACHAT.datePivotPrimes} conservent
            l'ancien régime : ils sont imposés au barème progressif, sauf option pour un
            prélèvement forfaitaire libératoire exercée auprès de l'assureur au moment du rachat.
            L'abattement de {euros(abattementSeul)} ou {euros(abattementCouple)} et les
            prélèvements sociaux de {pct(tauxPS)} s'appliquent de la même manière.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Ancienneté du contrat</th>
                  <th>Versements avant le {AV_RACHAT.datePivotPrimes}</th>
                  <th>Versements depuis le {AV_RACHAT.datePivotPrimes}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Moins de 4 ans</td>
                  <td>Barème, ou prélèvement libératoire de {pct(AV_RACHAT.pflAvant2017Moins4Ans)} sur option</td>
                  <td>{pct(tauxIR)}, ou barème sur option globale</td>
                </tr>
                <tr>
                  <td>De 4 à {duree} ans</td>
                  <td>Barème, ou prélèvement libératoire de {pct(AV_RACHAT.pflAvant2017De4A8Ans)} sur option</td>
                  <td>{pct(tauxIR)}, ou barème sur option globale</td>
                </tr>
                <tr>
                  <td>{duree} ans ou plus</td>
                  <td>
                    Barème après abattement, ou prélèvement libératoire de {pct(tauxReduit)} sur
                    option (calculé sur le montant brut, l'abattement donnant alors droit à un
                    crédit d'impôt)
                  </td>
                  <td>
                    {pct(tauxReduit)} jusqu'à {euros(seuil)} de primes, {pct(tauxIR)} au-delà, ou
                    barème sur option globale, après abattement
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Un contrat alimenté avant et après cette date contient donc deux compartiments, et
            chaque rachat puise dans les deux. L'abattement s'impute d'abord sur les gains des
            versements les plus anciens, puis sur ceux des versements récents. C'est l'assureur
            qui tient cette comptabilité : le détail figure sur l'IFU et peut lui être demandé
            avant le rachat. Les contrats souscrits avant le 26 septembre 1997 obéissent en outre
            à des règles particulières, décrites dans la fiche F22414.
          </p>

          <h2 id="erreurs">Quelles erreurs faussent le calcul d'un rachat partiel ?</h2>
          <p>
            Les erreurs les plus fréquentes viennent d'une confusion entre le montant retiré et la
            part de gains, et entre l'acompte prélevé et l'impôt final.
          </p>
          <ul>
            <li>
              <strong>Appliquer {pct(tauxGlobalAvant)} à tout le rachat.</strong> Le taux ne
              frappe que les gains : dans le cas 1, {eur(c1TotalAvant)} et non{" "}
              {euros(de(c1.rachat, tauxGlobalAvant))}.
            </li>
            <li>
              <strong>Croire qu'après {duree} ans tout est exonéré.</strong> L'abattement efface
              l'impôt sur le revenu dans sa limite, jamais les prélèvements sociaux.
            </li>
            <li>
              <strong>Compter un abattement par contrat.</strong> Il est annuel et vaut pour
              l'ensemble des contrats du foyer fiscal ; la fraction non utilisée une année n'est
              pas reportée sur la suivante.
            </li>
            <li>
              <strong>Prendre l'acompte pour l'impôt définitif.</strong> Après {duree} ans,
              l'assureur retient {pct(tauxReduit)} avant abattement ; le trop-versé revient à
              l'été suivant, ce qui crée un décalage de trésorerie.
            </li>
            <li>
              <strong>Opter pour le barème à cause du seul rachat.</strong> L'option est globale
              et entraîne tous les autres revenus mobiliers et plus-values de l'année.
            </li>
            <li>
              <strong>Oublier le revenu fiscal de référence.</strong> Les gains imposables d'un
              rachat sont en principe pris en compte pour le calculer, et celui-ci conditionne
              plusieurs seuils (dispense d'acompte, taux de CSG sur les pensions notamment).
            </li>
            <li>
              <strong>Clôturer un vieux contrat par un rachat total.</strong> Le calcul de l'impôt
              est le même que pour un rachat partiel, mais le contrat disparaît avec sa date de
              souscription : un nouveau contrat repart de zéro pour le délai de {duree} ans.
            </li>
          </ul>

          <h2 id="checklist">Que vérifier avant de demander un rachat partiel ?</h2>
          <p>
            Six informations suffisent pour estimer, avant de signer, ce qu'un rachat laissera
            réellement sur votre compte.
          </p>
          <ol>
            <li>La date de souscription du contrat : moins de {duree} ans, ou {duree} ans et plus.</li>
            <li>
              La valeur de rachat du jour et le cumul des versements non remboursés, pour en
              déduire la part de gains (l'assureur peut fournir une simulation fiscale).
            </li>
            <li>
              La répartition des versements avant et depuis le {AV_RACHAT.datePivotPrimes}.
            </li>
            <li>
              Les rachats déjà effectués dans l'année civile sur tous vos contrats, pour savoir ce
              qu'il reste de l'abattement.
            </li>
            <li>
              Le total de vos versements non remboursés, tous contrats confondus, au regard du
              seuil de {euros(seuil)}.
            </li>
            <li>
              Les frais et délais prévus par le contrat, et les supports sur lesquels le rachat
              sera prélevé : vendre des unités de compte après une baisse fige la perte sur ces
              supports.
            </li>
          </ol>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Est-ce que je paie des impôts sur tout l'argent que je retire de mon assurance-vie ?</h3>
          <p>
            Non. Seule la part de gains comprise dans le retrait est imposée. La part qui
            correspond à vos propres versements vous revient sans impôt ni prélèvements sociaux.
            Pour un contrat dont les gains représentent {pct(c1.partGainsPct)} de la valeur,{" "}
            {pct(c1.partGainsPct)} du rachat est imposable.
          </p>

          <h3>Après {duree} ans, mon assurance-vie est-elle exonérée d'impôt ?</h3>
          <p>
            Pas entièrement. Après {duree} ans, les gains retirés dans l'année sont exonérés
            d'impôt sur le revenu jusqu'à {euros(abattementSeul)} pour une personne seule et{" "}
            {euros(abattementCouple)} pour un couple soumis à imposition commune. Au-delà, ils
            sont imposés à {pct(tauxReduit)} ou {pct(tauxIR)}. Les prélèvements sociaux de{" "}
            {pct(tauxPS)} restent dus dans tous les cas.
          </p>

          <h3>L'abattement de {euros(abattementSeul)} s'applique-t-il au montant retiré ou aux gains ?</h3>
          <p>
            Aux gains. C'est la raison pour laquelle un rachat bien supérieur à{" "}
            {euros(abattementSeul)} peut ne supporter aucun impôt sur le revenu : dans le cas 1,
            un rachat de {euros(c1.rachat)} ne contient que {euros(c1.gains)} de gains.
          </p>

          <h3>Les prélèvements sociaux de l'assurance-vie sont-ils passés à {pct(tauxPSAutres)} en 2026 ?</h3>
          <p>
            Non. La hausse à {pct(tauxPSAutres)} entrée en vigueur le 1er janvier 2026 ne concerne
            pas les produits des contrats d'assurance-vie, qui restent soumis à {pct(tauxPS)}{" "}
            selon impots.gouv.fr, Service-Public.gouv.fr et le code de la sécurité sociale (art.
            L. 136-8, IV, 4°). La fiche F22414 de Service-Public.gouv.fr indique toutefois un
            taux de {pct(tauxPSAutres)} pour certains contrats particuliers (rente-survie,
            épargne handicap).
          </p>

          <h3>Dois-je déclarer un rachat partiel aux impôts ?</h3>
          <p>
            Oui, pour sa part de gains. L'assureur la communique à l'administration et vous envoie
            un imprimé fiscal unique ; les montants sont en principe préremplis dans la
            déclaration de l'année suivante. Il vous revient de les vérifier, même lorsque
            l'abattement annule l'impôt.
          </p>

          <h3>Vaut-il mieux le taux forfaitaire ou le barème progressif ?</h3>
          <p>
            Il n'existe pas de réponse générale. Le barème peut être plus léger pour un foyer non
            imposable ou faiblement imposé, le taux forfaitaire pour un foyer dont le taux
            marginal dépasse {pct(tauxIR)} (ou {pct(tauxReduit)} après {duree} ans). Comme
            l'option pour le barème vaut pour tous les revenus mobiliers et plus-values de
            l'année, la comparaison se fait sur l'ensemble de la déclaration.
          </p>

          <h3>Que se passe-t-il si mon contrat est en perte ?</h3>
          <p>
            Si la valeur du contrat est inférieure aux versements non remboursés, le rachat ne
            contient aucun gain : il n'y a ni impôt sur le revenu ni prélèvements sociaux à
            régler. La perte n'est en revanche pas, en principe, déductible de vos autres
            revenus.
          </p>

          <h3>Les rachats programmés sont-ils imposés différemment ?</h3>
          <p>
            Non. Un rachat partiel programmé (mensuel, trimestriel) est une suite de rachats
            partiels : chacun est imposé sur sa part de gains, recalculée à sa date, et
            l'abattement s'apprécie sur le total des gains retirés dans l'année civile.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La fiscalité d'un rachat partiel se résume à une multiplication : montant retiré ×
            part de gains du contrat × taux applicable. Une fois la part de gains connue, la
            plupart des idées reçues tombent : ni « {pct(tauxGlobalAvant)} de taxes » sur ce que
            l'on retire, ni exonération totale après {duree} ans, mais un coût qui, dans les trois
            cas illustratifs de ce guide, reste compris entre{" "}
            {pct(r2((c1.ps / c1.rachat) * 100))} et {pct(r2((c2TotalSeul / c2.rachat) * 100))} du
            rachat.
          </p>
          <p>
            Ne pas faire ce calcul a un coût précis. On peut retarder un retrait utile par crainte
            d'un impôt largement surestimé, concentrer sur une seule année des gains qu'un
            abattement non reportable aurait pu absorber sur plusieurs, ou découvrir à l'été
            suivant un revenu fiscal de référence plus élevé que prévu.
          </p>
          <p>
            La suite logique dépend de votre question. Si vous détenez aussi un PER ou un PEA,{" "}
            <a href="/guide/ordre-de-decaissement-retraite">
              notre guide sur l'ordre de décaissement
            </a>{" "}
            explique par quelle enveloppe commencer, ce que le présent calcul ne dit pas. Si vous
            hésitez entre des retraits et un revenu garanti à vie,{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">
              le comparatif rente viagère ou retraits programmés
            </a>{" "}
            met les deux logiques côte à côte. Et pour replacer le contrat dans une stratégie
            complète (supports, rachats programmés, transmission),{" "}
            <a href="/strategies/assurance-vie-retraite">
              notre page consacrée à l'assurance-vie pour la retraite
            </a>{" "}
            en donne la vue d'ensemble.
          </p>
          <p>
            Si vous souhaitez situer ces mécanismes dans votre trajectoire de retraite (pension
            attendue, épargne existante, rythme de retraits envisagé), le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à poser ce
            cadre général avant toute décision.
          </p>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées le {AV_RACHAT.maj}, sauf date contraire indiquée :</p>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seuls les
              montants communiqués par votre assureur et votre avis d'impôt font foi. Les règles
              et taux cités sont ceux en vigueur au {AV_RACHAT.maj} ; la loi de finances et la loi
              de financement de la sécurité sociale pour 2027 n'étant pas adoptées à cette date,
              ils peuvent évoluer. Les cas chiffrés sont des illustrations pédagogiques. Les
              supports en unités de compte d'un contrat d'assurance-vie présentent un risque de
              perte en capital.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="L'impôt d'un rachat se calcule. Le bon rythme de retraits se construit." />
    </>
  );
}
