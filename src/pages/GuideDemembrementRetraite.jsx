import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { IMMO, IMMO_EXEMPLES, FISCALITE, euros, pct } from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const D = IMMO.demembrement;
const F = IMMO.scpiFiscalite;
const E = IMMO_EXEMPLES.demembrement;

// Un usufruit temporaire se valorise par période de 10 ans entière, sans fraction (art. 669 II du CGI).
const PERIODE_ANS = 10;

// ---- Barème de l'article 669 : tranche d'âge correspondant à l'âge du donateur ----
const bornesSup = (libelle) => {
  const n = libelle.match(/\d+/g).map(Number);
  if (libelle.startsWith("moins")) return n[0] - 1;
  if (libelle.includes("et plus")) return Infinity;
  return n[1];
};
const tranche = D.bareme669.find((t) => E.ageDonateur <= bornesSup(t.age));
const partNuePropriete = tranche.nuePropriete;
const partUsufruit = tranche.usufruit;

// ---- Donation avec réserve d'usufruit, deux enfants, un seul parent donateur ----
const valeurNuePropriete = (E.valeurBien * partNuePropriete) / 100;
const valeurUsufruit = (E.valeurBien * partUsufruit) / 100;
const parEnfantNP = valeurNuePropriete / E.nombreEnfants;
const parEnfantPP = E.valeurBien / E.nombreEnfants;

// Droits en ligne directe : barème progressif appliqué à la part taxable de chaque enfant.
const droits = (base) =>
  D.baremeLigneDirecte.reduce((total, t, i) => {
    const plancher = i === 0 ? 0 : D.baremeLigneDirecte[i - 1].jusqua;
    return total + (Math.max(Math.min(base, t.jusqua) - plancher, 0) * t.taux) / 100;
  }, 0);
const eurosPrecis = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

const taxableNP = Math.max(parEnfantNP - D.abattementEnfant, 0);
const taxablePP = Math.max(parEnfantPP - D.abattementEnfant, 0);
const droitsNPParEnfant = droits(taxableNP);
const droitsPPParEnfant = droits(taxablePP);
const droitsNPTotal = droitsNPParEnfant * E.nombreEnfants;
const droitsPPTotal = droitsPPParEnfant * E.nombreEnfants;
const economie = droitsPPTotal - droitsNPTotal;

// ---- Usufruit temporaire ----
const periodes = Math.floor(E.dureeUsufruitTemporaire / PERIODE_ANS);
const valeurFiscaleUsufruitTemp = (E.prixUsufruitTemporaire * D.usufruitTemporairePar10Ans * periodes) / 100;
const exemplesDuree = [5, 10, 15, 20, 30].map((annees) => ({
  annees,
  periodes: Math.floor(annees / PERIODE_ANS),
  part: D.usufruitTemporairePar10Ans * Math.floor(annees / PERIODE_ANS),
}));

const sources = [
  {
    label: "Légifrance — Code général des impôts, article 669 (barème de l'usufruit et de la nue-propriété)",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006310173/",
  },
  {
    label: "Légifrance — Code général des impôts, article 1133 (extinction de l'usufruit)",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006305932",
  },
  {
    label: "Service-Public.gouv.fr — Abattements applicables aux donations, fiche F14203",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14203",
  },
  {
    label: "Service-Public.gouv.fr — Barème des droits de donation, fiche F14205",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14205",
  },
  {
    label: "Service-Public.gouv.fr — Prélèvements sociaux sur les revenus du patrimoine, fiche F2329",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2329",
  },
  {
    label: "impots.gouv.fr — Calcul de l'IFI",
    url: "https://www.impots.gouv.fr/particulier/calcul-de-lifi",
  },
  {
    label: "BOFiP — BOI-PAT-IFI-20-20-30-10 (IFI, patrimoine démembré), version du 8 juin 2018",
    url: "https://bofip.impots.gouv.fr/bofip/11310-PGP.html/identifiant=BOI-PAT-IFI-20-20-30-10-20180608",
  },
  {
    label: "BOFiP — BOI-RFPI-BASE-20-80 (revenus fonciers, charges déductibles), version du 1er septembre 2017",
    url: "https://bofip.impots.gouv.fr/bofip/5808-PGP.html/identifiant=BOI-RFPI-BASE-20-80-20170901",
  },
  {
    label: "AMF — Investir dans une SCPI (guide, 2023)",
    url: "https://www.amf-france.org/sites/institutionnel/files/private/2023-12/2023_investir_dans_une_scpi.pdf",
  },
];

export default function GuideDemembrementRetraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Immobilier · transmission</span>
          <h1>Démembrement et nue-propriété : comment s'en servir pour préparer sa retraite ?</h1>
          <p className="sub">
            Usufruit, nue-propriété, usufruit temporaire : ce que ces montages font, et ce qu'ils ne
            font pas. Mis à jour le {IMMO.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> démembrer un bien, c'est séparer le droit d'en
              profiter (l'usufruit) du droit d'en être propriétaire à terme (la nue-propriété).
              Le fisc valorise chaque part selon l'âge de l'usufruitier (article 669 du CGI). Pour un
              donateur de {E.ageDonateur} ans, la nue-propriété représente {partNuePropriete} % de la
              valeur du bien : c'est sur cette base que sont calculés les droits de donation. Dans
              l'exemple de cette page, la donation avec réserve d'usufruit d'un bien de{" "}
              {euros(E.valeurBien)} réduit les droits de {euros(droitsPPTotal)} à{" "}
              {euros(droitsNPTotal)}. Le démembrement organise surtout une transmission ; il ne crée
              ni revenu ni capital supplémentaire.
            </p>
          </div>

          <p>
            Le mot « démembrement » revient dans les brochures de gestion de patrimoine, souvent
            associé à des promesses de fiscalité allégée. Derrière lui, il y a pourtant une idée
            simple : un bien immobilier a deux « faces », et on peut les partager.
          </p>
          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel :
            Michel, {E.ageDonateur} ans, retraité, possède un bien locatif de {euros(E.valeurBien)}.
            Il a {E.nombreEnfants} enfants, ne veut pas se priver des loyers de son vivant, mais
            souhaite alléger la facture fiscale de sa transmission. Un autre lecteur, plus jeune,
            s'interroge sur l'achat de la nue-propriété de parts de SCPI pour se constituer un
            patrimoine sans revenu imposable pendant la durée du démembrement. Les deux utilisent le
            même mécanisme, avec des objectifs et des risques très différents.
          </p>
          <p>
            Cet article explique le principe, le barème, les deux usages les plus courants à
            l'approche de la retraite, et leurs limites. Il ne remplace pas l'avis d'un notaire,
            indispensable pour toute donation.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#principe">Qu'est-ce que l'usufruit et la nue-propriété ?</a></li>
              <li><a href="#bareme">Comment le fisc valorise-t-il l'usufruit et la nue-propriété ?</a></li>
              <li><a href="#donation">Que donne une donation avec réserve d'usufruit ?</a></li>
              <li><a href="#ifi-revenus">Qui perçoit les revenus et déclare le bien à l'IFI ?</a></li>
              <li><a href="#vigilance">Quels points de vigilance sur une donation de nue-propriété ?</a></li>
              <li><a href="#temporaire">Comment fonctionne l'usufruit temporaire ?</a></li>
              <li><a href="#scpi">Acheter la nue-propriété de SCPI : quel principe, quels risques ?</a></li>
              <li><a href="#limites">Que ne fait pas le démembrement ?</a></li>
              <li><a href="#erreurs">Quelles erreurs éviter ?</a></li>
              <li><a href="#sens">Dans quels cas le démembrement peut-il avoir du sens ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="principe">Qu'est-ce que l'usufruit et la nue-propriété ?</h2>
          <p>
            L'<strong>usufruit</strong> est le droit d'utiliser un bien et d'en percevoir les
            fruits : habiter le logement, ou encaisser les loyers. La <strong>nue-propriété</strong>{" "}
            est ce qui reste : le droit de disposer du bien, sans pouvoir en jouir tant que
            l'usufruit dure. Réunies, les deux forment la <strong>pleine propriété</strong>.
          </p>
          <p>
            Un démembrement peut naître de deux façons. Soit un propriétaire donne ou vend l'une
            des deux parts et garde l'autre (par exemple : il donne la nue-propriété à ses enfants et
            conserve l'usufruit). Soit un acheteur acquiert seulement l'une des deux parts. Dans les
            deux cas, l'usufruit s'éteint un jour, à une date fixée à l'avance ou au décès de
            l'usufruitier, et le nu-propriétaire retrouve alors la pleine propriété. L'
            <a href="#sources">article 1133 du CGI</a> prévoit que cette extinction ne donne pas
            lieu à une taxation supplémentaire : c'est le cœur de l'intérêt fiscal du dispositif.
          </p>

          <h2 id="bareme">Comment le fisc valorise-t-il l'usufruit et la nue-propriété ?</h2>
          <p>
            Pour calculer les droits de donation ou de succession, l'administration utilise le barème
            de l'article 669 du Code général des impôts. Il attribue à l'usufruit un pourcentage de la
            valeur en pleine propriété qui diminue avec l'âge de l'usufruitier : plus il est âgé,
            moins l'usufruit a de chances de durer longtemps. La nue-propriété vaut le complément à
            100 %.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Âge de l'usufruitier</th>
                  <th>Valeur de l'usufruit</th>
                  <th>Valeur de la nue-propriété</th>
                </tr>
              </thead>
              <tbody>
                {D.bareme669.map((t) => (
                  <tr key={t.age}>
                    <td>{t.age}</td>
                    <td>{pct(t.usufruit)}</td>
                    <td>{pct(t.nuePropriete)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Ce barème est forfaitaire : il ignore l'état de santé réel de l'usufruitier et la
            valeur de marché des deux parts. Il sert de base fiscale, pas de prix. Lors d'une vente
            de nue-propriété entre particuliers ou d'un achat en SCPI, le prix se négocie
            séparément, et peut s'écarter de ce barème.
          </p>

          <h2 id="donation">Que donne une donation avec réserve d'usufruit ?</h2>
          <p>
            Le donateur donne la nue-propriété à ses enfants et se réserve l'usufruit. Les droits de
            donation se calculent alors sur la seule valeur de la nue-propriété, appréciée au barème
            de l'article 669 le jour de la donation, et non sur la pleine propriété. À son décès,
            l'usufruit s'éteint et les enfants deviennent pleins propriétaires sans nouvelle taxation
            sur cette part.
          </p>
          <div className="note">
            <p>
              Exemple purement illustratif, composite, sans lien avec un cas réel. Hypothèses :
              bien de {euros(E.valeurBien)} en pleine propriété ; donateur de {E.ageDonateur} ans
              (tranche « {tranche.age} » : usufruit à {pct(partUsufruit)}, nue-propriété à{" "}
              {pct(partNuePropriete)}) ; {E.nombreEnfants} enfants, à parts égales ; un seul parent
              donateur ; abattement en ligne directe de {euros(D.abattementEnfant)} par parent et par
              enfant, entièrement disponible (aucune donation antérieure) ; barème des droits en
              ligne directe appliqué à la part taxable de chaque enfant.
            </p>
          </div>
          <ol>
            <li>
              Valeur de la nue-propriété : {euros(E.valeurBien)} × {pct(partNuePropriete)} ={" "}
              <strong>{euros(valeurNuePropriete)}</strong> (l'usufruit réservé est valorisé à{" "}
              {euros(valeurUsufruit)}).
            </li>
            <li>
              Part par enfant : {euros(valeurNuePropriete)} ÷ {E.nombreEnfants} ={" "}
              <strong>{euros(parEnfantNP)}</strong>.
            </li>
            <li>
              Après abattement de {euros(D.abattementEnfant)} : part taxable de{" "}
              <strong>{euros(taxableNP)}</strong> par enfant, soit des droits de{" "}
              <strong>{eurosPrecis(droitsNPParEnfant)}</strong> par enfant.
            </li>
          </ol>
          <p>
            Comparons avec la donation du même bien en pleine propriété, dans les mêmes conditions :
            chaque enfant reçoit {euros(parEnfantPP)}, soit {euros(taxablePP)} imposables après
            abattement, et {eurosPrecis(droitsPPParEnfant)} de droits.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Donation en pleine propriété</th>
                  <th>Donation de la nue-propriété (usufruit réservé)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Valeur donnée au total</td>
                  <td>{euros(E.valeurBien)}</td>
                  <td>{euros(valeurNuePropriete)}</td>
                </tr>
                <tr>
                  <td>Part par enfant</td>
                  <td>{euros(parEnfantPP)}</td>
                  <td>{euros(parEnfantNP)}</td>
                </tr>
                <tr>
                  <td>Part taxable par enfant (après abattement de {euros(D.abattementEnfant)})</td>
                  <td>{euros(taxablePP)}</td>
                  <td>{euros(taxableNP)}</td>
                </tr>
                <tr>
                  <td>Droits par enfant</td>
                  <td>{eurosPrecis(droitsPPParEnfant)}</td>
                  <td>{eurosPrecis(droitsNPParEnfant)}</td>
                </tr>
                <tr>
                  <td>Droits au total ({E.nombreEnfants} enfants)</td>
                  <td>{eurosPrecis(droitsPPTotal)}</td>
                  <td>{eurosPrecis(droitsNPTotal)}</td>
                </tr>
                <tr>
                  <td>Loyers pendant la vie du donateur</td>
                  <td>Reviennent aux enfants</td>
                  <td>Restent au donateur</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Dans cet exemple, l'écart est de <strong>{eurosPrecis(economie)}</strong> de droits.
            L'économie vient de deux effets cumulés : l'assiette est réduite par le barème, et
            l'abattement absorbe tout ou partie de ce qui reste. Elle n'a rien de systématique : avec
            une valeur plus faible, l'abattement seul peut déjà suffire en pleine propriété ; avec
            un donateur plus jeune, la nue-propriété vaut moins, mais l'usufruit réservé dure
            statistiquement plus longtemps.
          </p>
          <div className="note">
            <p>
              Cet exemple ignore volontairement les frais de notaire et les émoluments de la
              donation, l'évolution de la valeur du bien entre la donation et le décès (le barème
              fige la valeur au jour de l'acte), les donations antérieures qui auraient déjà
              consommé tout ou partie de l'abattement (renouvelable tous les {D.renouvellementAnnees}{" "}
              ans), la situation du second parent, et les cas où les enfants sont de rangs ou de
              situations différentes. Il s'agit d'un ordre de grandeur pédagogique, pas d'un devis.
              Les montants d'abattement et les tranches du barème sont ceux publiés au {IMMO.maj}
              (fiches F14203 et F14205 de Service-Public).
            </p>
          </div>
          <p>
            Pour replacer la donation parmi les autres outils de transmission (assurance-vie,
            don familial de sommes d'argent), voir notre guide{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">
              donation ou assurance-vie : quel dosage pour transmettre ?
            </a>
            . Pour l'articulation avec le PER, voir{" "}
            <a href="/guide/per-ou-immobilier-locatif">PER ou immobilier locatif</a>.
          </p>

          <h2 id="ifi-revenus">Qui perçoit les revenus et déclare le bien à l'IFI ?</h2>
          <p>
            Pendant le démembrement, l'<strong>usufruitier</strong> perçoit les loyers (ou habite le
            bien) et les déclare. C'est tout l'attrait de la donation avec réserve d'usufruit pour un
            retraité : il garde son revenu et son logement. Les charges d'entretien courant lui
            reviennent aussi, les grosses réparations relevant en principe du nu-propriétaire,
            sauf convention contraire à faire préciser dans l'acte.
          </p>
          <p>
            Côté impôt sur la fortune immobilière (IFI), le bien démembré par donation reste en
            principe déclaré <strong>en pleine propriété par l'usufruitier</strong> (article 968 du
            CGI), et le nu-propriétaire n'a en principe rien à déclarer, sauf cas particuliers. Cette
            règle n'a d'effet que si le patrimoine immobilier net du foyer franchit le seuil
            d'assujettissement, de {euros(F.ifiSeuilAssujettissement)} au 1er janvier, le barème ne
            commençant qu'au-delà de {euros(F.ifiSeuilBareme)}. Elle ne concerne donc qu'une minorité
            de lecteurs, mais elle compte : donner la nue-propriété ne retire pas le bien de
            l'assiette IFI du donateur tant qu'il en garde l'usufruit. Les exceptions prévues par
            le texte (certains usufruits légaux, par exemple) se vérifient dans la doctrine
            administrative (BOFiP) ou avec un notaire.
          </p>

          <h2 id="vigilance">Quels points de vigilance sur une donation de nue-propriété ?</h2>
          <ul>
            <li>
              <strong>Un acte irrévocable.</strong> Une donation ne se défait pas. Le donateur
              garde l'usufruit, mais ne peut plus vendre seul la pleine propriété : l'accord des
              nus-propriétaires est nécessaire.
            </li>
            <li>
              <strong>La présomption de fictivité.</strong> L'article 751 du CGI prévoit que, dans
              certaines conditions, une donation de nue-propriété consentie peu de temps avant le
              décès peut être regardée comme fictive, ce qui fait réintégrer le bien dans la
              succession. Selon les sources consultées, le délai en cause serait de{" "}
              {D.delaiPresomptionFictiviteMois} mois avant le décès ; les conditions exactes sont à
              faire confirmer par le notaire avant toute donation tardive ou en cas de maladie.
            </li>
            <li>
              <strong>Le besoin de revenus futur.</strong> Se dessaisir d'une part de sa
              pleine propriété réduit sa liberté de vendre. Un retraité qui devrait financer une
              dépendance ou un changement de vie aura besoin de l'accord de ses enfants.
            </li>
            <li>
              <strong>L'égalité entre enfants.</strong> Le barème fige la valeur au jour de la
              donation pour le calcul des droits : une hausse ultérieure n'est pas taxée. Sur le
              plan civil, en revanche, l'égalité entre enfants dépend de la forme de l'acte
              (donation simple ou donation-partage) et peut créer des déséquilibres si le bien
              n'est pas donné à tous : point à voir avec le notaire.
            </li>
          </ul>

          <h2 id="temporaire">Comment fonctionne l'usufruit temporaire ?</h2>
          <p>
            Un usufruit peut être limité à une durée fixe plutôt qu'à la vie de l'usufruitier. Le
            barème fiscal de l'article 669 le valorise alors à {pct(D.usufruitTemporairePar10Ans)} de
            la pleine propriété par période de {PERIODE_ANS} ans <em>entière</em>, sans prise en
            compte des fractions. À l'extinction de la durée prévue, le nu-propriétaire retrouve la
            pleine propriété sans qu'aucune somme ne soit due.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Durée de l'usufruit temporaire</th>
                  <th>Périodes de {PERIODE_ANS} ans entières</th>
                  <th>Valeur fiscale de l'usufruit</th>
                </tr>
              </thead>
              <tbody>
                {exemplesDuree.map((x) => (
                  <tr key={x.annees}>
                    <td>{x.annees} ans</td>
                    <td>{x.periodes}</td>
                    <td>{pct(x.part)} de la pleine propriété</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Application : pour un usufruit de {E.dureeUsufruitTemporaire} ans portant sur un bien
            valant {euros(E.prixUsufruitTemporaire)} en pleine propriété, il y a {periodes} période
            entière de {PERIODE_ANS} ans (les {E.dureeUsufruitTemporaire - periodes * PERIODE_ANS} ans
            restants ne comptent pas). La valeur fiscale de l'usufruit est donc{" "}
            {pct(D.usufruitTemporairePar10Ans)} × {euros(E.prixUsufruitTemporaire)} ={" "}
            <strong>{euros(valeurFiscaleUsufruitTemp)}</strong>.
          </p>
          <div className="note">
            <p>
              <strong>Valeur fiscale n'est pas prix de marché.</strong> Le barème sert à calculer
              des droits ; le prix auquel un usufruit temporaire s'achète ou se vend se négocie en
              fonction des revenus attendus, de la durée et des conditions de marché. Les deux
              peuvent différer sensiblement. Cette page ne chiffre volontairement aucun prix de
              marché.
            </p>
          </div>
          <p>
            Ce que cela signifie concrètement pour un épargnant : l'usufruit temporaire procure un{" "}
            <strong>revenu pour une période donnée</strong>, puis <strong>plus rien</strong>. Il n'y
            a pas de capital à récupérer à l'échéance : le prix payé se « consomme » au fil des
            loyers perçus. Un revenu qui s'arrête à date fixe ne remplace pas un capital.
          </p>

          <h2 id="scpi">Acheter la nue-propriété de SCPI : quel principe, quels risques ?</h2>
          <p>
            Une SCPI (société civile de placement immobilier) permet de détenir des parts d'un parc
            immobilier géré par une société de gestion. Certaines offres proposent de les acheter en
            démembrement : un investisseur achète l'usufruit temporaire, un autre la nue-propriété,
            à un prix décoté par rapport à la pleine propriété. Le principe général est le suivant.
          </p>
          <ul>
            <li>
              <strong>Le nu-propriétaire</strong> paie moins cher qu'en pleine propriété (le niveau
              de la décote dépend de l'offre et de la durée, nous ne le chiffrons pas), ne perçoit
              <em> aucun revenu</em> pendant le démembrement et n'est donc pas imposé sur des
              revenus qu'il ne touche pas. À l'échéance, il retrouve la pleine propriété des parts et
              recommence à percevoir les revenus.
            </li>
            <li>
              <strong>L'usufruitier</strong> perçoit les revenus pendant la durée convenue et les
              déclare. Les intérêts d'un éventuel emprunt contracté pour acheter l'usufruit sont, selon
              la doctrine administrative, admis en déduction ; nous ne traitons pas l'amortissement
              ni les cas particuliers.
            </li>
          </ul>
          <p>
            Pour un lecteur qui prépare sa retraite, l'attrait est de constituer un capital en
            immobilier sans augmenter son revenu imposable avant la retraite, la pleine propriété
            étant reconstituée à une date proche de la cessation d'activité. Les risques sont réels
            et se cumulent :
          </p>
          <ul>
            <li>
              <strong>Le capital n'est pas garanti.</strong> Le prix des parts peut baisser : en
              2025, le prix de part moyen pondéré des SCPI a varié de {pct(IMMO.scpiMarche.variationPrixPart2025)}
              selon l'ASPIM, et de {pct(IMMO.scpiMarche.variationPrixPartS12026)} au premier
              semestre 2026. Ces chiffres sont des moyennes : les écarts entre SCPI sont importants.
            </li>
            <li>
              <strong>La liquidité n'est pas garantie.</strong> Revendre une nue-propriété de SCPI
              avant l'échéance peut être long, voire impossible à un prix acceptable. Le marché
              secondaire du démembrement est étroit.
            </li>
            <li>
              <strong>Les revenus futurs ne sont pas garantis.</strong> Reconstituer la pleine
              propriété ne dit rien du niveau des loyers qui seront ensuite distribués.
            </li>
            <li>
              <strong>Les frais existent.</strong> L'AMF cite, pour les frais de souscription des
              SCPI, une fourchette de {IMMO.scpiMarche.fraisSouscriptionAmfMin} % à{" "}
              {IMMO.scpiMarche.fraisSouscriptionAmfMax} % du prix, à vérifier SCPI par SCPI ; leur
              traitement en démembrement est à lire dans la documentation de l'offre.
            </li>
            <li>
              <strong>Le document d'informations clés (DIC)</strong> est obligatoire avant toute
              souscription. Il fournit un indicateur de risque de 1 à {IMMO.scpiMarche.dicIndicateurRisqueEchelle}{" "}
              et une durée de détention recommandée, en pratique longue.
            </li>
          </ul>
          <p>
            Pour comprendre le fonctionnement, les frais et la liquidité des SCPI en général, voir
            notre guide{" "}
            <a href="/guide/scpi-preparer-sa-retraite">SCPI pour préparer sa retraite</a> et celui sur
            la <a href="/guide/scpi-fiscalite-revenus-plus-values">fiscalité des SCPI</a>. Si vous
            souhaitez approfondir une souscription accompagnée, vous pouvez consulter{" "}
            <a href="https://scpirentable.fr" target="_blank" rel="noopener noreferrer">scpirentable.fr</a>{" "}
            ; pour comparer les offres,{" "}
            <a href="https://immobilierpassif.com" target="_blank" rel="noopener noreferrer">immobilierpassif.com</a>.
            Ce ne sont pas des recommandations d'achat : l'adéquation d'un produit à votre
            situation relève d'un conseil personnalisé.
          </p>

          <h2 id="limites">Que ne fait pas le démembrement ?</h2>
          <ul>
            <li>
              <strong>Il ne crée pas de rendement.</strong> Il répartit entre deux personnes (ou
              deux périodes) des flux qui existaient déjà.
            </li>
            <li>
              <strong>Il ne complète pas une pension.</strong> Un usufruit temporaire finit ; une
              nue-propriété ne paie rien avant l'échéance. Aucun des deux ne remplace un revenu à vie.
              Pour cela, voir notre{" "}
              <a href="/strategies/decumulation">stratégie de décumulation</a>.
            </li>
            <li>
              <strong>Il n'efface pas l'impôt de façon automatique.</strong> L'économie dépend de
              l'âge, de la valeur, de l'abattement disponible et de la composition de la famille.
            </li>
            <li>
              <strong>Il ne garantit pas la liquidité.</strong> Un bien démembré se vend moins
              facilement.
            </li>
            <li>
              <strong>Il ne supprime pas le risque de marché</strong> sur l'immobilier ou les parts
              de SCPI détenues.
            </li>
          </ul>

          <h2 id="erreurs">Quelles erreurs éviter ?</h2>
          <ul>
            <li>
              <strong>Confondre valeur fiscale et valeur de marché.</strong> Le barème de
              l'article 669 sert aux droits, pas à fixer un prix.
            </li>
            <li>
              <strong>Donner la nue-propriété trop tard</strong>, sans regarder la présomption de
              fictivité de l'article 751 ni l'état de santé.
            </li>
            <li>
              <strong>Oublier que l'abattement se renouvelle seulement tous les {D.renouvellementAnnees}{" "}
              ans</strong> et que des donations antérieures peuvent déjà l'avoir consommé.
            </li>
            <li>
              <strong>Croire qu'une nue-propriété de SCPI est « sans risque »</strong> parce qu'elle ne
              verse rien : le prix des parts, lui, reste exposé au marché.
            </li>
            <li>
              <strong>Ignorer l'IFI</strong> quand le patrimoine immobilier est élevé : l'usufruitier
              déclare en principe la pleine propriété.
            </li>
            <li>
              <strong>Se dessaisir de tout.</strong> Garder une marge pour les besoins de revenus et
              de liquidité en fin de vie : voir notre guide sur l'
              <a href="/guide/ordre-de-decaissement-retraite">ordre de décaissement</a>.
            </li>
            <li>
              <strong>Monter l'opération sans notaire.</strong> Une donation de nue-propriété exige
              un acte notarié, avec clauses à rédiger (charges, grosses réparations, droit de
              retour éventuel).
            </li>
          </ul>

          <h2 id="sens">Dans quels cas le démembrement peut-il avoir du sens ?</h2>
          <p>
            Sans se substituer à un conseil, voici des pistes de réflexion, à discuter avec un notaire
            ou un conseiller.
          </p>
          <ul>
            <li>
              <strong>Un retraité propriétaire d'un bien locatif ou de sa résidence</strong>, qui
              souhaite transmettre à ses enfants à terme en gardant les revenus ou le logement, et
              dont le patrimoine ne dépend pas de ce bien pour vivre. La donation avec réserve
              d'usufruit est alors le montage le plus courant.
            </li>
            <li>
              <strong>Un actif en forte tranche d'imposition, sans besoin de revenus immobiliers à
              court terme</strong>, qui envisage la nue-propriété pour constituer un patrimoine
              reconstitué à la retraite. Le risque de prix et de liquidité reste entier, et la
              durée doit être choisie en fonction de la date de retraite visée.
            </li>
            <li>
              <strong>Un investisseur déjà imposé aux revenus fonciers</strong> et à la recherche de
              revenus temporaires peut s'intéresser à l'usufruit, en mesurant qu'il n'y a pas de
              capital à l'échéance.
            </li>
          </ul>
          <p>
            Avant d'aller plus loin, reprenez le cadre d'ensemble : notre page{" "}
            <a href="/strategies/immobilier-retraite">immobilier et retraite</a> compare les grandes
            voies, et l'article{" "}
            <a href="/guide/immobilier-a-la-retraite-revenus-transmission">
              immobilier à la retraite : revenus, vente et transmission
            </a>{" "}
            traite les arbitrages une fois la retraite engagée.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Le nu-propriétaire paie-t-il des impôts pendant le démembrement ?</h3>
          <p>
            Il ne perçoit pas de revenus tant que l'usufruit dure, donc il n'est pas imposé sur des
            loyers. Il peut rester concerné par certaines charges, notamment les grosses
            réparations selon l'acte ; la taxe foncière est en principe établie au nom de
            l'usufruitier. À faire préciser avec le notaire.
          </p>
          <h3>Que se passe-t-il au décès de l'usufruitier ?</h3>
          <p>
            L'usufruit s'éteint, et les nus-propriétaires deviennent pleins propriétaires. Selon
            l'article 1133 du CGI, cette extinction ne donne pas lieu à une imposition
            supplémentaire.
          </p>
          <h3>Peut-on vendre un bien démembré ?</h3>
          <p>
            Oui, mais en général avec l'accord de tous les titulaires de droits, usufruitier et
            nus-propriétaires, pour vendre la pleine propriété. Vendre seulement sa part est possible,
            mais le marché est étroit.
          </p>
          <h3>Un démembrement fait-il baisser la valeur imposable à l'IFI ?</h3>
          <p>
            Pas pour le donateur qui garde l'usufruit : il déclare en principe le bien en pleine
            propriété (article 968 du CGI). Les cas particuliers se vérifient dans le BOFiP.
          </p>
          <h3>L'usufruit temporaire rapporte-t-il plus qu'un placement classique ?</h3>
          <p>
            La comparaison n'a pas de sens sans tenir compte de l'absence de capital à l'échéance.
            Le prix payé est consommé par les revenus reçus. Ni le prix, ni le revenu futur ne
            sont garantis.
          </p>
          <h3>Le démembrement permet-il d'échapper aux droits de succession ?</h3>
          <p>
            Non : il en réduit l'assiette sous conditions, dans le cadre légal. Un montage dont le
            seul but serait d'éluder l'impôt peut être remis en cause par l'administration.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le démembrement est un outil de transmission avant d'être un outil de revenu. Pour un
            retraité qui possède un bien, la donation avec réserve d'usufruit permet de transmettre
            sur une base fiscale réduite sans perdre les loyers. Dans l'exemple de cette page, les
            droits passent de {euros(droitsPPTotal)} à {euros(droitsNPTotal)}, mais l'exemple
            ignore les frais, l'évolution de la valeur et les donations antérieures.
          </p>
          <p>
            Pour un épargnant plus jeune, la nue-propriété de SCPI ne produit aucun revenu et
            expose le capital au prix des parts et à l'illiquidité ; l'usufruit temporaire produit
            un revenu qui s'arrête. Aucun des deux n'est un complément de retraite à vie.
          </p>
          <p>
            La bonne démarche consiste à poser le besoin (revenu, transmission, ou les deux), à
            vérifier l'abattement disponible, puis à se faire accompagner par un notaire. Notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> aide à mesurer le revenu dont
            vous aurez besoin ; le <a href="/bilan-retraite">bilan retraite gratuit</a> permet de
            replacer le démembrement parmi les autres leviers.
          </p>

          <h2 id="lire-aussi">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/immobilier-et-retraite-guide-complet">Immobilier et retraite : le guide complet</a></li>
            <li><a href="/guide/epargne-retraite-en-couple-et-transmission">Épargne retraite en couple et transmission</a></li>
          </ul>

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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seul un
              notaire peut rédiger et chiffrer une donation. Les règles citées sont celles publiées
              au {IMMO.maj} et peuvent évoluer ; les exemples chiffrés sont des illustrations
              pédagogiques, composites, établies sur des hypothèses affichées, sans lien avec un cas
              réel. Les performances passées des SCPI ne préjugent pas de leurs performances
              futures ; le capital et les revenus ne sont pas garantis.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Transmettre sans se priver de revenus se prépare avec un notaire et un bilan d'ensemble." />
    </>
  );
}
