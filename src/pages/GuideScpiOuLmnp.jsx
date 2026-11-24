import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  FISCALITE,
  IMMO,
  IMMO_EXEMPLES,
  V3_IMM_COMPARATIF,
  V3_REG_LOCATIFS,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const C = V3_IMM_COMPARATIF;
const M = IMMO.scpiMarche;
const SF = IMMO.scpiFiscalite;
const L = IMMO.lmnp;
const psFoncier = FISCALITE.prelevementsSociaux.immobilier; // 17,2 %
const psMeuble = L.psMeuble; // 18,6 % (LFSS 2026 ; service-public F2329)
const microBic2026 = V3_REG_LOCATIFS.microBicLongueDureeRevenus2026; // 83 600 €

const r2 = (n) => Math.round(n * 100) / 100;
const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " %";
const eur = (n) =>
  Number.isInteger(r2(n))
    ? euros(n)
    : new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(r2(n));

// ---- Exemple composite : même capital engagé, deux solutions ----
const K = C.capitalEngage;

// SCPI en direct, détention au comptant : revenus fonciers, sans abattement (hypothèse prudente).
const scpiBrut = r2((K * C.scpi.tauxDistribution) / 100);
const scpiTauxImpo = r2(C.tmi + psFoncier);
const scpiImpot = r2((scpiBrut * scpiTauxImpo) / 100);
const scpiNet = r2(scpiBrut - scpiImpot);
const scpiNetMois = r2(scpiNet / 12);
const scpiValeurRevente = r2(K * (1 - C.scpi.baissePrixPartPct / 100));
const scpiMoinsValue = r2(K - scpiValeurRevente);

// LMNP en résidence gérée, micro-BIC supposé : base imposable = loyers après abattement forfaitaire.
const lmnpLoyers = r2((K * C.lmnp.rendementBrut) / 100);
const lmnpCharges = r2((lmnpLoyers * C.lmnp.chargesNonRecuperablesPct) / 100);
const lmnpBase = r2(lmnpLoyers * (1 - L.microBicLongueDureeAbattement / 100));
const lmnpTauxImpo = r2(C.tmi + psMeuble);
const lmnpImpot = r2((lmnpBase * lmnpTauxImpo) / 100);
const lmnpNet = r2(lmnpLoyers - lmnpCharges - lmnpImpot);
const lmnpNetMois = r2(lmnpNet / 12);

// Scénario défavorable LMNP : loyer renégocié à la baisse, charges inchangées.
const lmnpLoyersBaisse = r2(lmnpLoyers * (1 - C.lmnp.baisseLoyerPct / 100));
const lmnpBaseBaisse = r2(lmnpLoyersBaisse * (1 - L.microBicLongueDureeAbattement / 100));
const lmnpImpotBaisse = r2((lmnpBaseBaisse * lmnpTauxImpo) / 100);
const lmnpNetBaisse = r2(lmnpLoyersBaisse - lmnpCharges - lmnpImpotBaisse);
const lmnpNetBaisseMois = r2(lmnpNetBaisse / 12);

const sources = [
  {
    label:
      "AMF — Guide « Investir dans une SCPI » (décembre 2023) : fonctionnement, frais, risques, liquidité, document d'informations clés",
    url: "https://www.amf-france.org/sites/institutionnel/files/private/2023-12/2023_investir_dans_une_scpi.pdf",
  },
  {
    label:
      "ASPIM — Communiqué du 1er semestre 2026 (5 août 2026) : taux de distribution, prix de part, capitalisation, parts en attente de retrait",
    url: "https://www.aspim.fr/content/uploads/2026/08/ASPIM_CP-1S-2026_V7-def.pdf",
  },
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : revenus d'une location meublée, fiche F32744",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F32744",
  },
  {
    label:
      "Service-Public.gouv.fr — Prélèvements sociaux (CSG, CRDS) sur les revenus du patrimoine et de placements, fiche F2329",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2329",
  },
  {
    label:
      "Service-Public.gouv.fr — Plus-values immobilières des particuliers, fiche F10864",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F10864",
  },
  {
    label:
      "impots.gouv.fr — Les régimes d'imposition : micro-foncier, micro-BIC et régime réel",
    url: "https://www.impots.gouv.fr/particulier/les-regimes-dimposition",
  },
];

export default function GuideScpiOuLmnp() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide décision · Immobilier et retraite</span>
          <h1>SCPI ou LMNP pour compléter sa retraite : comment choisir ?</h1>
          <p className="sub">
            Gestion, ticket d'entrée, liquidité, fiscalité, risques propres à chacun : un
            comparatif pour décider, avec un exemple chiffré composite. Mis à jour en novembre
            2026.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> la SCPI est un placement délégué, accessible dès un
              ticket modeste, mais peu liquide et dont le prix de part peut baisser. Le LMNP en
              résidence gérée est un investissement immobilier direct, au ticket élevé, dont le
              revenu dépend d'un exploitant. Aucun des deux ne garantit de revenu ni de capital.
              Dans l'exemple chiffré de ce guide, pour {euros(C.capitalEngage)} engagés, le revenu
              net d'impôt s'établit autour de {eur(scpiNetMois)} par mois pour la SCPI et de{" "}
              {eur(lmnpNetMois)} par mois pour le LMNP, selon des hypothèses fragiles qui montrent
              surtout que la comparaison se joue sur les risques, pas sur le rendement affiché.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#fond">SCPI ou LMNP : quelle différence de fond pour un futur retraité ?</a></li>
              <li><a href="#gestion">Quelle gestion, et combien de temps faut-il y consacrer ?</a></li>
              <li><a href="#ticket">Quel ticket d'entrée pour chacun ?</a></li>
              <li><a href="#liquidite">Quelle liquidité, et que vaut une sortie ?</a></li>
              <li><a href="#fiscalite">Comment sont imposés les revenus de chacun ?</a></li>
              <li><a href="#risques">Quels risques propres à chacun, résidence gérée comprise ?</a></li>
              <li><a href="#exemple">Un exemple chiffré composite, sans promesse</a></li>
              <li><a href="#tableau">Quand l'un, quand l'autre : le tableau de décision</a></li>
              <li><a href="#demarche">Comment décider, étape par étape ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#aller-plus-loin">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Quand on cherche un revenu complémentaire pour la retraite, l'immobilier vient vite à
            l'esprit. Puis viennent deux visages très différents : des parts de SCPI, que l'on
            souscrit en quelques clics, ou un appartement meublé en résidence gérée, acheté devant
            notaire. Les deux promettent un revenu « sans gestion ». Mais la ressemblance s'arrête
            là.
          </p>
          <p>
            Prenons un profil illustratif, sans lien avec un cas réel : un couple de 58 et 60 ans,
            propriétaire de sa résidence principale, qui dispose de {euros(K)} à placer et veut
            préparer un complément de revenus pour dans cinq à sept ans. Sa question : « SCPI ou
            LMNP ? ». Ce guide donne les critères pour décider, sans désigner de produit. Pour
            situer l'immobilier dans l'ensemble d'une stratégie, notre{" "}
            <a href="/guide/immobilier-et-retraite-guide-complet">guide complet sur l'immobilier et la retraite</a>{" "}
            en pose le cadre.
          </p>

          <h2 id="fond">SCPI ou LMNP : quelle différence de fond pour un futur retraité ?</h2>
          <p>
            Une SCPI est une société qui détient un parc immobilier mutualisé, dont vous achetez des
            parts ; vous êtes associé, sans propriété d'un bien précis. Le LMNP est un statut
            fiscal : vous achetez un bien meublé (souvent en résidence gérée, avec un exploitant) et
            en percevez les loyers. La première est un placement financier à sous-jacent immobilier,
            le second un investissement immobilier direct.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>SCPI</th>
                  <th>LMNP en résidence gérée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nature</td>
                  <td>Parts d'une société, parc diversifié</td>
                  <td>Un lot meublé, loué à un exploitant</td>
                </tr>
                <tr>
                  <td>Gestion</td>
                  <td>Déléguée à la société de gestion</td>
                  <td>Déléguée à l'exploitant, mais vous restez propriétaire</td>
                </tr>
                <tr>
                  <td>Ticket d'entrée</td>
                  <td>Quelques centaines d'euros pour une part, selon la SCPI</td>
                  <td>Plusieurs dizaines à plusieurs centaines de milliers d'euros</td>
                </tr>
                <tr>
                  <td>Diversification</td>
                  <td>Nombreux locataires et immeubles</td>
                  <td>Un seul bien, un seul exploitant</td>
                </tr>
                <tr>
                  <td>Liquidité</td>
                  <td>Variable : retrait ou marché secondaire, sans garantie</td>
                  <td>Revente d'un bien, délai long et décote possible</td>
                </tr>
                <tr>
                  <td>Fiscalité des revenus</td>
                  <td>Revenus fonciers : barème + {pct(psFoncier)} de prélèvements sociaux</td>
                  <td>Micro-BIC ou réel ; prélèvements sociaux à {pct(psMeuble)}</td>
                </tr>
                <tr>
                  <td>Risque principal</td>
                  <td>Baisse du prix de part, parts difficiles à vendre</td>
                  <td>Défaillance ou renégociation du loyer par l'exploitant, revente difficile</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="gestion">Quelle gestion, et combien de temps faut-il y consacrer ?</h2>
          <p>
            Dans les deux cas, le quotidien est délégué : la SCPI n'exige que le suivi de ses
            comptes rendus et de son assemblée générale ; le LMNP en résidence gérée confie
            l'exploitation à un gestionnaire lié par un bail commercial. La différence est ce que
            vous restez à supporter.
          </p>
          <p>
            En SCPI, vous ne gérez ni locataires ni travaux, mais vous ne décidez de rien non plus :
            le choix des immeubles appartient à la société de gestion. En LMNP, vous êtes propriétaire
            d'un lot : taxe foncière, charges de copropriété non récupérables, gros travaux et
            déclarations annuelles (liasse fiscale au réel, ou case dédiée en micro-BIC) restent de
            votre côté. Le gain de temps n'est donc pas équivalent.
          </p>

          <h2 id="ticket">Quel ticket d'entrée pour chacun ?</h2>
          <p>
            La SCPI permet de commencer petit et de lisser ses souscriptions dans le temps, ce qui
            convient à un capital qui se libère par morceaux. Le LMNP exige un capital d'un seul
            tenant ou un crédit : l'exemple de référence de ce site retient{" "}
            {euros(IMMO_EXEMPLES.lmnpGere.prixAcquisitionHT)} hors taxes pour un lot neuf en résidence
            gérée, avec {L.notaireNeufMin} à {L.notaireNeufMax} % de frais de notaire dans le neuf
            (ordre de grandeur, à vérifier).
          </p>
          <p>
            Le financement par crédit change la nature du risque dans les deux cas : l'effort mensuel
            reste dû même si le revenu baisse. Les subtilités sont traitées dans{" "}
            <a href="/guide/scpi-a-credit-ou-comptant">notre guide sur la SCPI à crédit ou comptant</a>{" "}
            et <a href="/guide/combien-coute-un-investissement-locatif">celui sur le coût d'un investissement locatif</a>.
          </p>

          <h2 id="liquidite">Quelle liquidité, et que vaut une sortie ?</h2>
          <p>
            La liquidité est le point faible commun, sous des formes différentes. Pour les SCPI,
            l'ASPIM relève, pour le 1<sup>er</sup> semestre 2026, un prix de part moyen pondéré en
            baisse de {pct1(Math.abs(M.variationPrixPartS12026))} et {pct1(M.partsEnAttenteS12026Pct)}{" "}
            de la capitalisation en attente de retrait ({M.partsEnAttenteS12026Md.toLocaleString("fr-FR")} milliards d'euros) ; en
            2025, le prix de part moyen avait déjà reculé de {pct1(Math.abs(M.variationPrixPart2025))}.
            Un retrait n'est pas garanti : il dépend de la présence d'acheteurs.
          </p>
          <p>
            Pour le LMNP en résidence gérée, la sortie est une vente immobilière : délai de plusieurs
            mois, frais, et un marché de seconde main où les acquéreurs paient moins cher que le
            neuf. Les deux se pensent donc comme des placements à horizon long, que l'on ne
            sollicite pas pour un besoin court. À la retraite, c'est un point d'attention : un
            capital immobilisé ne peut pas servir à un imprévu.
          </p>

          <h2 id="fiscalite">Comment sont imposés les revenus de chacun ?</h2>
          <p>
            Les revenus d'une SCPI détenue en direct sont des revenus fonciers : ajoutés à vos
            autres revenus, imposés à votre tranche marginale, avec {pct(psFoncier)} de prélèvements
            sociaux. Un abattement de {SF.microFoncierAbattement} % existe en micro-foncier sous{" "}
            {euros(SF.microFoncierPlafond)} de recettes, mais il n'est ouvert au porteur de parts que
            s'il loue aussi un bien nu en direct (CGI, art. 32) ; à défaut, c'est le régime réel. À la revente, la plus-value suit le régime des plus-values
            immobilières (impôt de {SF.pvIR} % avant abattements pour durée de détention, plus
            prélèvements sociaux).
          </p>
          <p>
            Les loyers du LMNP relèvent des bénéfices industriels et commerciaux. Au micro-BIC, un
            abattement forfaitaire de {L.microBicLongueDureeAbattement} % s'applique sous{" "}
            {euros(L.microBicLongueDuree)} de recettes pour les revenus 2025 ({euros(microBic2026)}{" "}
            pour les revenus 2026) ; au réel, l'amortissement du bien peut
            réduire fortement le résultat imposable. Depuis la loi de finances pour 2025, les
            amortissements déduits sont réintégrés dans le calcul de la plus-value à la revente (
            {L.texteReintegration}). Le projet de loi de finances pour 2027 (article 7) prévoyait
            en outre de plafonner l'amortissement en LMNP ; toujours en discussion au Parlement et
            non adopté au 23 novembre 2026, il montre que ce terrain reste mouvant : surveillez-le
            avant de décider.
          </p>
          <p>
            Dans les deux cas, ces revenus entrent dans votre revenu fiscal de référence, qui
            conditionne notamment le taux de CSG sur les pensions : voir{" "}
            <a href="/guide/revenus-locatifs-et-retraite-cumul-impots-cotisations">revenus locatifs et retraite : cumul, impôts, cotisations</a>.
            Pour le détail SCPI, <a href="/guide/scpi-fiscalite-revenus-plus-values">notre guide sur la fiscalité des SCPI</a>.
          </p>

          <h2 id="risques">Quels risques propres à chacun, résidence gérée comprise ?</h2>
          <h3>Les risques de la SCPI</h3>
          <ul>
            <li>
              <strong>Baisse de la valeur de la part.</strong> Le prix de part n'est pas garanti et
              les frais de souscription pèsent dès l'entrée.
            </li>
            <li>
              <strong>Revenu variable.</strong> Les distributions dépendent des loyers encaissés
              et du taux d'occupation ; elles peuvent baisser.
            </li>
            <li>
              <strong>Liquidité limitée.</strong> Les parts en attente de retrait montrent que la
              sortie peut prendre du temps.
            </li>
            <li>
              <strong>Dépendance à la société de gestion.</strong> Stratégie, endettement et frais
              relèvent de ses décisions.
            </li>
          </ul>
          <h3>Les risques du LMNP en résidence gérée</h3>
          <ul>
            <li>
              <strong>Dépendance à un exploitant unique.</strong> Si l'exploitant est défaillant ou
              obtient une renégociation du bail, le loyer baisse ou s'interrompt.
            </li>
            <li>
              <strong>Concentration.</strong> Un seul lot, un seul emplacement, un seul secteur
              (étudiant, senior, tourisme, santé).
            </li>
            <li>
              <strong>Décote à la revente.</strong> Le neuf achète une partie de services et de
              mobilier qui se déprécie.
            </li>
            <li>
              <strong>Réforme fiscale.</strong> L'avantage de l'amortissement a déjà été réduit
              pour les cessions ; les règles peuvent encore évoluer.
            </li>
            <li>
              <strong>Charges et vacance.</strong> Taxe foncière et charges non récupérables
              restent dues, loyer ou non.
            </li>
          </ul>
          <p>
            Pour approfondir : <a href="/guide/lmnp-residence-geree-retraite">LMNP en résidence gérée</a>,{" "}
            <a href="/guide/lmnp-risques">les risques du LMNP</a> et{" "}
            <a href="/guide/lmnp-reforme-amortissement-plus-value">la réforme de l'amortissement</a>.
          </p>

          <h2 id="exemple">Un exemple chiffré composite, sans promesse</h2>
          <div className="note">
            <p>
              Cas purement illustratif, sans lien avec un cas réel et sans projection. Les taux de
              distribution et de rendement sont des hypothèses de calcul : ils ne sont ni observés ni
              garantis. Le calcul suppose un foyer à {pct(C.tmi)} de tranche marginale, aucun
              crédit, des revenus constants, un micro-BIC pour le LMNP et l'absence d'abattement en
              SCPI. Vacance locative, frais de revente, frais de notaire et mobilier ne sont pas
              pris en compte.
            </p>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Pour {euros(K)} engagés</th>
                  <th>SCPI</th>
                  <th>LMNP en résidence gérée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Revenu brut annuel</td>
                  <td>{euros(K)} × {pct1(C.scpi.tauxDistribution)} = {eur(scpiBrut)}</td>
                  <td>{euros(K)} × {pct1(C.lmnp.rendementBrut)} = {eur(lmnpLoyers)}</td>
                </tr>
                <tr>
                  <td>Charges non récupérables</td>
                  <td>Déjà déduites de la distribution</td>
                  <td>{pct1(C.lmnp.chargesNonRecuperablesPct)} des loyers : {eur(lmnpCharges)}</td>
                </tr>
                <tr>
                  <td>Base imposable</td>
                  <td>{eur(scpiBrut)} (sans abattement)</td>
                  <td>{eur(lmnpLoyers)} − {pct1(L.microBicLongueDureeAbattement)} = {eur(lmnpBase)}</td>
                </tr>
                <tr>
                  <td>Impôt et prélèvements sociaux</td>
                  <td>{pct1(scpiTauxImpo)} : {eur(scpiImpot)}</td>
                  <td>{pct1(lmnpTauxImpo)} : {eur(lmnpImpot)}</td>
                </tr>
                <tr>
                  <td>Revenu net annuel</td>
                  <td>{eur(scpiNet)} ({eur(scpiNetMois)} par mois)</td>
                  <td>{eur(lmnpNet)} ({eur(lmnpNetMois)} par mois)</td>
                </tr>
                <tr>
                  <td>Scénario défavorable</td>
                  <td>
                    Prix de part en baisse de {pct1(C.scpi.baissePrixPartPct)} : le capital vaut{" "}
                    {eur(scpiValeurRevente)}, soit {eur(scpiMoinsValue)} de moins
                  </td>
                  <td>
                    Loyer renégocié à la baisse de {pct1(C.lmnp.baisseLoyerPct)} : revenu net de{" "}
                    {eur(lmnpNetBaisse)} par an ({eur(lmnpNetBaisseMois)} par mois)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Ce tableau ne dit pas que le LMNP « rapporte plus ». L'écart de revenu net dépend
            presque entièrement de l'abattement micro-BIC, de l'absence de vacance et de frais
            d'acquisition ignorés ; et surtout, il masque le risque : le LMNP concentre ces {euros(K)}{" "}
            sur un seul exploitant, la SCPI les répartit sur un portefeuille mais expose le capital
            à la baisse du prix de part. Pour juger de l'adéquation à votre situation, comparez
            les <em>deux</em> colonnes de scénario défavorable, pas la ligne « revenu net ».
          </p>

          <h2 id="tableau">Quand l'un, quand l'autre : le tableau de décision</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Votre situation</th>
                  <th>Piste de réflexion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Capital qui se libère par étapes, besoin de souplesse</td>
                  <td>La SCPI permet des souscriptions progressives ; le LMNP, non.</td>
                </tr>
                <tr>
                  <td>Capital important disponible d'un seul tenant, horizon long, goût pour la détention directe</td>
                  <td>Le LMNP est envisageable, en acceptant la concentration sur un exploitant.</td>
                </tr>
                <tr>
                  <td>Crainte de l'exploitant unique</td>
                  <td>La SCPI mutualise ; le LMNP, non.</td>
                </tr>
                <tr>
                  <td>Imposition élevée aujourd'hui, revenus futurs moins taxés</td>
                  <td>Le LMNP au réel peut atténuer l'impôt, avec la réintégration des amortissements à la revente.</td>
                </tr>
                <tr>
                  <td>Besoin possible de capital à court terme</td>
                  <td>Ni l'un ni l'autre : conserver une réserve liquide hors immobilier.</td>
                </tr>
                <tr>
                  <td>Aucun goût pour le suivi d'un bien</td>
                  <td>La SCPI limite la charge administrative ; le LMNP en laisse davantage.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="demarche">Comment décider, étape par étape ?</h2>
          <ol>
            <li>
              <strong>Fixer le rôle de l'immobilier.</strong> Quelle part de vos revenus futurs
              voulez-vous lui confier, et que se passe-t-il si elle baisse de {pct1(C.lmnp.baisseLoyerPct)} ?
            </li>
            <li>
              <strong>Constituer d'abord une réserve et regarder les autres enveloppes.</strong>{" "}
              Comparez avec <a href="/guide/immobilier-locatif-ou-assurance-vie">l'assurance-vie</a>{" "}
              et <a href="/guide/per-ou-immobilier-locatif">le PER</a> avant de choisir l'immobilier.
            </li>
            <li>
              <strong>Choisir le mode de détention.</strong> Direct, assurance-vie ou PER pour
              les SCPI : voir <a href="/guide/scpi-assurance-vie-ou-per">notre comparatif</a>.
            </li>
            <li>
              <strong>Lire les documents.</strong> Pour une SCPI, le document d'informations clés et
              le bulletin trimestriel ; pour un LMNP, le bail commercial, les comptes de
              l'exploitant et la notice du programme.
            </li>
            <li>
              <strong>Chiffrer deux scénarios.</strong> Un central, un défavorable, avec votre
              tranche marginale, comme dans l'exemple ci-dessus.
            </li>
            <li>
              <strong>Faire valider par un professionnel indépendant.</strong> Fiscalité,
              succession, financement : un avis personnalisé s'impose avant tout engagement.
            </li>
          </ol>
          <p>
            Check-list de départ : durée d'immobilisation acceptée ; part du patrimoine concernée ;
            tolérance à une baisse de revenu ; besoin de capital éventuel ; frais d'entrée et de
            sortie lus ; fiscalité chiffrée ; solution de repli si l'exploitant ou la société de
            gestion change de stratégie.
          </p>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Vaut-il mieux investir en SCPI ou en LMNP ?</h3>
          <p>
            Il n'y a pas de réponse générale : la SCPI mutualise le risque et demande peu de
            capital, le LMNP est un bien unique, plus engageant et plus concentré. Le choix dépend
            de votre capital, de votre horizon, de votre fiscalité et de votre tolérance au risque.
          </p>

          <h3>Quels sont les inconvénients du LMNP ?</h3>
          <p>
            Dépendance à un exploitant, ticket élevé, charges non récupérables, décote possible à
            la revente et évolution de la fiscalité des amortissements. Détail dans{" "}
            <a href="/guide/lmnp-risques">notre guide des risques du LMNP</a>.
          </p>

          <h3>Le LMNP est-il vraiment rentable ?</h3>
          <p>
            Le rendement dépend du prix d'achat, du loyer et de l'exploitant. Un rendement brut
            affiché ne dit rien de la vacance, des charges ni de la fiscalité : calculez le net sur
            deux scénarios plutôt que de vous fier à une brochure.
          </p>

          <h3>Une SCPI est-elle un placement sûr ?</h3>
          <p>
            Non, au sens où ni le capital ni le revenu ne sont garantis. Le prix de part peut
            baisser, les distributions varier et la sortie prendre du temps. Les sociétés sont
            encadrées par l'AMF, ce qui n'élimine pas le risque économique.
          </p>

          <h3>Peut-on cumuler SCPI et LMNP ?</h3>
          <p>
            Oui, rien ne l'interdit, mais le cumul concentre une part importante du patrimoine
            sur l'immobilier. Pensez à la diversification vers d'autres actifs avant de multiplier
            les lignes immobilières.
          </p>

          <h3>Quelle fiscalité à la revente ?</h3>
          <p>
            Dans les deux cas, la plus-value suit le régime des plus-values immobilières, avec des
            abattements selon la durée de détention. En LMNP au réel, les amortissements déduits
            sont réintégrés pour les cessions concernées par la loi de finances pour 2025 : la
            plus-value imposable peut donc être plus élevée.
          </p>

          <h3>LMNP ou location nue pour la retraite ?</h3>
          <p>
            La location nue relève des revenus fonciers, le LMNP des bénéfices industriels et
            commerciaux. Le comparatif est dans{" "}
            <a href="/guide/lmnp-ou-locatif-nu">notre guide LMNP ou location nue</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            SCPI et LMNP ne sont pas deux façons d'obtenir le même revenu : l'une achète une part de
            portefeuille, l'autre un lot unique. Le critère de choix n'est pas le rendement affiché,
            mais ce que vous acceptez de risquer et de bloquer. Dans l'exemple composite, l'écart
            de revenu net s'efface devant l'écart de risque.
          </p>
          <p>
            Ne pas mener cette comparaison a un coût : confier à l'immobilier une part du revenu de
            retraite qu'une baisse de loyer ou de prix de part rendrait inconfortable, ou
            immobiliser un capital dont on aurait eu besoin.
          </p>
          <p>
            Si la SCPI vous semble la piste la plus adaptée, la suite logique est la méthode pour la
            choisir : <a href="/guide/comment-choisir-une-scpi-checklist">notre check-list avant de souscrire</a>.
            Pour replacer l'immobilier dans votre trajectoire, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à poser le
            cadre.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li>
              <a href="/guide/comment-choisir-une-scpi-checklist">Comment choisir une SCPI : la check-list</a>
            </li>
            <li>
              <a href="/guide/scpi-preparer-sa-retraite">SCPI pour préparer sa retraite</a>
            </li>
            <li>
              <a href="/guide/lmnp-residence-geree-retraite">LMNP en résidence gérée et retraite</a>
            </li>
            <li>
              <a href="/guide/revenus-locatifs-et-retraite-cumul-impots-cotisations">Revenus locatifs et retraite : cumul, impôts, cotisations</a>
            </li>
            <li>
              <a href="/guide/investir-100000-euros-pour-la-retraite">Investir 100 000 € pour la retraite</a>
            </li>
            <li>
              <a href="/strategies/immobilier-retraite">Notre page stratégie : immobilier et retraite</a>
            </li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en novembre 2026, sauf date contraire indiquée :</p>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les règles et
              taux cités sont ceux en vigueur en novembre 2026 ; le projet de loi de finances pour
              2027 n'étant pas adopté à cette date, la fiscalité du LMNP peut évoluer. Les cas
              chiffrés sont des illustrations pédagogiques sans valeur de promesse. Un
              investissement immobilier, en direct ou via une SCPI, présente un risque de perte en
              capital, une liquidité limitée, et les performances passées ne préjugent pas des
              performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="SCPI ou LMNP se compare. La bonne part d'immobilier se construit." />
    </>
  );
}
