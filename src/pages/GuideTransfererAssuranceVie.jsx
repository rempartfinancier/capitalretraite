import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  AV_RACHAT,
  FISCALITE,
  V3_AVA_TRANSFERT,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const duree = AV_RACHAT.dureeTauxReduitAnnees; // 8 ans
const tauxIR = FISCALITE.pfuIR; // 12,8 %
const tauxReduit = FISCALITE.avTauxReduitApres8Ans; // 7,5 %
const tauxPS = FISCALITE.prelevementsSociaux.assuranceVie; // 17,2 %
const abattement = FISCALITE.avAbattementAnnuelSeul;
const r2 = (n) => Math.round(n * 100) / 100;
const de = (base, taux) => r2((base * taux) / 100);

// ---- Exemple : rachat total d'un contrat pour en ouvrir un autre ----
// Gains = valeur − versements non remboursés ; en rachat total, toute la part de gains est taxée.
const valeur = V3_AVA_TRANSFERT.valeurContrat;
const primes = V3_AVA_TRANSFERT.primesNonRemboursees;
const gains = valeur - primes;
const psTotal = de(gains, tauxPS);
// Contrat de moins de 8 ans : taux forfaitaire de 12,8 %, pas d'abattement.
const irAvant = de(gains, tauxIR);
const totalAvant = r2(irAvant + psTotal);
const netAvant = r2(valeur - totalAvant);
// Contrat de 8 ans ou plus : abattement de 4 600 €, puis 7,5 % (primes sous le seuil de 150 000 €).
const baseApres = Math.max(gains - abattement, 0);
const irApres = de(baseApres, tauxReduit);
const totalApres = r2(irApres + psTotal);
const netApres = r2(valeur - totalApres);
const partGains = r2((gains / valeur) * 100);

const eur = (n) =>
  Number.isInteger(r2(n))
    ? euros(n)
    : new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(r2(n));

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Contrat d'assurance-vie : fonctionnement (fiche F15274) : rachat, transfert, renonciation",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F15274",
  },
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : comment sont imposés les revenus d'un contrat d'assurance-vie ? (fiche F22414)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22414",
  },
  {
    label:
      "BOFiP — BOI-RPPM-RCM-20-10-20-50 : produits des contrats d'assurance-vie, calcul du produit imposable d'un rachat",
    url: "https://bofip.impots.gouv.fr/bofip/3951-PGP.html",
  },
  {
    label:
      "impots.gouv.fr — Les revenus mobiliers : prélèvements sociaux, taux forfaitaire, option pour le barème",
    url: "https://www.impots.gouv.fr/particulier/les-revenus-mobiliers",
  },
  {
    label:
      "Légifrance — Code général des impôts, art. 125-0 A (régime des produits d'assurance-vie, y compris les transferts prévus par la loi) ; Code des assurances",
    url: "https://www.legifrance.gouv.fr",
  },
  {
    label:
      "FGAP — Fonds de garantie des assurances de personnes",
    url: "https://www.fgap.fr",
  },
];

export default function GuideTransfererAssuranceVie() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · Assurance-vie</span>
          <h1>Transférer son assurance-vie sans perdre l'antériorité fiscale ?</h1>
          <p className="sub">
            Ce qui est possible (même assureur), ce qui ne l'est pas (changer d'assureur) et les
            alternatives, avec un exemple chiffré. Mis à jour en {V3_AVA_TRANSFERT.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> en règle générale, on ne peut pas transférer une
              assurance-vie d'un assureur à un autre en gardant son antériorité fiscale : pour
              changer de compagnie, il faut racheter le contrat (avec la fiscalité des gains),
              puis en ouvrir un nouveau, dont l'ancienneté de {duree} ans repart de zéro. Des
              transferts prévus par la loi existent, mais au sein du même assureur (transfert
              « Fourgous », transfert vers un contrat plus récent). Avant toute décision, comparez
              le coût de la sortie au gain attendu du changement.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#possible">Peut-on transférer une assurance-vie vers un autre assureur ?</a></li>
              <li><a href="#anteriorite">Pourquoi l'antériorité fiscale compte-t-elle ?</a></li>
              <li><a href="#memeassureur">Quels transferts restent possibles chez le même assureur ?</a></li>
              <li><a href="#etapes">Comment procéder pour changer de contrat ? Étapes</a></li>
              <li><a href="#exemple">Que coûte un rachat total pour changer de contrat ? Exemple chiffré</a></li>
              <li><a href="#alternatives">Quelles alternatives à la clôture ?</a></li>
              <li><a href="#frais">Frais de clôture, de transfert et délais</a></li>
              <li><a href="#tableau">Changer de contrat : quand ça vaut le coup, quand éviter</a></li>
              <li><a href="#pieges">Quels pièges éviter ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#lire-aussi">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Prenons Marc, 58 ans, qui détient depuis dix ans un contrat bancaire dont les frais
            lui paraissent élevés et dont le fonds en euros rapporte peu. Il a repéré un contrat
            en ligne moins cher et se demande s'il peut y « transférer » son épargne, comme on
            change d'opérateur téléphonique. Profil composite, sans lien avec une personne
            réelle : sa question est celle de nombreux épargnants. La réponse tient en une
            phrase gênante : changer d'assureur n'est pas un simple déménagement, car le contrat
            lui-même, avec sa date de souscription, ne se déplace pas.
          </p>
          <p>
            Ce guide présente ce que dit la règle générale, les transferts prévus par la loi,
            puis les alternatives pratiques. Les règles évoluent et chaque contrat a ses
            conditions : vérifiez auprès de votre assureur et, pour une situation importante,
            avec un professionnel.
          </p>

          <h2 id="possible">Peut-on transférer une assurance-vie vers un autre assureur ?</h2>
          <p>
            En l'état du droit au {V3_AVA_TRANSFERT.maj}, un contrat d'assurance-vie ne peut pas,
            en règle générale, être transféré chez un autre assureur avec conservation de son
            antériorité fiscale. Les épargnants qui veulent quitter une compagnie rachètent
            leur contrat, puis réinvestissent dans un nouveau contrat auprès d'un autre
            assureur. Les transferts organisés par la loi se font au sein d'un même assureur.
          </p>
          <p>
            Cette règle étant sensible, nous la formulons avec prudence : les textes évoluent
            (la loi Pacte a modifié le régime des transferts) et les assureurs appliquent leurs
            propres conditions. Vérifiez donc le point précis qui vous concerne dans l'article
            125-0 A du code général des impôts, sur Légifrance, et auprès de votre assureur.
          </p>

          <h2 id="anteriorite">Pourquoi l'antériorité fiscale compte-t-elle ?</h2>
          <p>
            L'antériorité d'un contrat est le temps écoulé depuis sa souscription. À partir de{" "}
            {duree} ans, les gains retirés bénéficient d'un abattement annuel de{" "}
            {euros(abattement)} pour une personne seule (et {euros(FISCALITE.avAbattementAnnuelCouple)} pour
            un couple) et d'un taux d'impôt réduit à {pct(tauxReduit)} dans la limite des primes
            de {euros(AV_RACHAT.seuilPrimesTauxReduit)} (BOFiP, BOI-RPPM-RCM-20-15). Un nouveau
            contrat repart de zéro pour ce délai : pendant {duree} ans, les gains retirés sont
            taxés à {pct(tauxIR)} (taux forfaitaire), sans abattement.
          </p>
          <p>
            Cette ancienneté est un capital en soi, d'autant plus utile que l'on envisage des
            retraits réguliers (voir notre guide sur le{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">rachat partiel d'assurance-vie</a>
            ). Elle ne doit toutefois pas conduire à garder à tout prix un contrat dont les frais
            coûtent cher chaque année.
          </p>

          <h2 id="memeassureur">Quels transferts restent possibles chez le même assureur ?</h2>
          <p>
            Trois mécanismes permettent d'améliorer un contrat sans repartir de zéro, tous au
            sein de la même compagnie :
          </p>
          <ul>
            <li>
              <strong>Le transfert « Fourgous ».</strong> Il permet de transformer un contrat
              monosupport en euros en contrat multisupport (donc d'accéder aux unités de compte),
              chez le même assureur, avec conservation de l'antériorité fiscale (CGI, art.
              125-0 A). Il ne s'agit pas d'un changement de compagnie.
            </li>
            <li>
              <strong>Le transfert vers un contrat plus récent du même assureur</strong>, prévu
              par la loi Pacte : l'assureur peut proposer de basculer vers un contrat plus
              moderne, l'antériorité fiscale étant conservée, sous conditions (par exemple un
              contrat d'arrivée investi au moins en partie en unités de compte ou en
              euro-croissance). L'assureur n'est pas toujours tenu d'accepter la demande :
              renseignez-vous sur sa politique.
            </li>
            <li>
              <strong>Un simple changement de distributeur</strong> (courtier, conseiller) qui
              gère le même contrat : l'assureur reste identique, l'ancienneté est conservée,
              mais les conditions de frais du distributeur peuvent changer.
            </li>
          </ul>
          <p>
            Ces mécanismes ne règlent pas tous les cas. Si le problème est la solidité de
            l'assureur ou la qualité de son fonds en euros, rester chez lui ne résout pas
            grand-chose, et il faut regarder la sortie.
          </p>

          <h2 id="etapes">Comment procéder pour changer de contrat ? Étapes</h2>
          <ol>
            <li>
              <strong>Faire le diagnostic.</strong> Notez la date de souscription, la valeur de
              rachat, les versements non remboursés (donc les gains), les frais courants et le
              rendement net du fonds en euros des dernières années.
            </li>
            <li>
              <strong>Demander une simulation fiscale à l'assureur.</strong> Elle donne le montant
              net après impôt d'un rachat total ou partiel.
            </li>
            <li>
              <strong>Comparer au contrat visé.</strong> Frais d'entrée, de gestion, des
              supports, qualité du fonds en euros et de l'assureur.
            </li>
            <li>
              <strong>Ouvrir d'abord le nouveau contrat.</strong> Cela évite de rester sans
              contrat et permet de commencer à faire courir l'ancienneté. Voir{" "}
              <a href="/guide/comment-ouvrir-une-assurance-vie-etapes">comment ouvrir une assurance-vie</a>.
            </li>
            <li>
              <strong>Décider du rachat : total ou partiel.</strong> Le rachat est imposé sur la
              part de gains, pas sur le capital.
            </li>
            <li>
              <strong>Effectuer le rachat puis le versement.</strong> Demande écrite à
              l'assureur, délai de règlement, puis virement vers le nouveau contrat.
            </li>
            <li>
              <strong>Déclarer l'opération.</strong> Les gains figurent sur l'imprimé fiscal
              unique et dans votre déclaration de revenus de l'année suivante.
            </li>
          </ol>

          <h2 id="exemple">Que coûte un rachat total pour changer de contrat ? Exemple chiffré</h2>
          <p>
            Reprenons un exemple illustratif : un contrat de {euros(valeur)} pour{" "}
            {euros(primes)} de versements non remboursés, donc {euros(gains)} de gains (
            {pct(partGains)} de la valeur), racheté en totalité par une personne seule, avec des
            versements tous postérieurs au {AV_RACHAT.datePivotPrimes} et sans prélèvements
            sociaux déjà acquittés (hypothèse de simplification). Les prélèvements sociaux
            ({pct(tauxPS)}) pèsent {eur(psTotal)} dans les deux cas.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Contrat racheté</th>
                  <th>Contrat de moins de {duree} ans ({V3_AVA_TRANSFERT.ancienneteAvantAnnees} ans)</th>
                  <th>Contrat de {duree} ans ou plus ({V3_AVA_TRANSFERT.ancienneteApresAnnees} ans)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gains imposables</td>
                  <td>{euros(gains)}</td>
                  <td>{euros(gains)}</td>
                </tr>
                <tr>
                  <td>Abattement annuel</td>
                  <td>Aucun</td>
                  <td>{euros(Math.min(gains, abattement))}</td>
                </tr>
                <tr>
                  <td>Impôt sur le revenu</td>
                  <td>{euros(gains)} × {pct(tauxIR)} = {eur(irAvant)}</td>
                  <td>{eur(baseApres)} × {pct(tauxReduit)} = {eur(irApres)}</td>
                </tr>
                <tr>
                  <td>Prélèvements sociaux ({pct(tauxPS)})</td>
                  <td>{eur(psTotal)}</td>
                  <td>{eur(psTotal)}</td>
                </tr>
                <tr>
                  <td>Fiscalité totale</td>
                  <td>{eur(totalAvant)}</td>
                  <td>{eur(totalApres)}</td>
                </tr>
                <tr>
                  <td>Somme nette réinvestissable</td>
                  <td>{eur(netAvant)}</td>
                  <td>{eur(netApres)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Le coût du changement se mesure donc en milliers d'euros : {eur(totalApres)} à{" "}
            {eur(totalAvant)} ici, auxquels s'ajoute la perte de l'antériorité du contrat
            racheté. Pour que l'opération soit rentable, l'économie de frais ou la meilleure
            qualité du nouveau contrat doit couvrir ce coût sur la durée. Ce calcul est
            indicatif : il ne tient pas compte d'éventuelles pénalités de rachat, de
            prélèvements sociaux déjà acquittés sur le fonds en euros (qui réduisent la base),
            ni de vos autres revenus.
          </p>

          <h2 id="alternatives">Quelles alternatives à la clôture ?</h2>
          <ul>
            <li>
              <strong>Garder le contrat sans l'alimenter.</strong> Le contrat conserve son
              ancienneté et ses gains continuent de courir ; on ouvre un second contrat pour les
              nouveaux versements. Les frais de gestion annuels continuent toutefois, à mettre
              en regard de leur montant.
            </li>
            <li>
              <strong>Arbitrer au sein du contrat.</strong> Si le problème vient des supports,
              l'arbitrage vers des unités de compte moins chères est parfois possible sans
              clôture, avec des frais d'arbitrage éventuels.
            </li>
            <li>
              <strong>Un transfert Fourgous ou « Pacte » chez le même assureur</strong> si le
              contrat est monosupport ou ancien.
            </li>
            <li>
              <strong>Un rachat partiel progressif</strong> pour étaler l'imposition des gains
              sur plusieurs années et profiter de l'abattement annuel après {duree} ans, plutôt
              que de tout racheter d'un coup (voir{" "}
              <a href="/guide/rachats-programmes-assurance-vie-retraite">les rachats programmés</a>
              ).
            </li>
            <li>
              <strong>Renégocier ou demander les frais réels</strong> à son conseiller ou
              assureur : certains acceptent d'ajuster leurs conditions pour garder un client.
            </li>
          </ul>

          <h2 id="frais">Frais de clôture, de transfert et délais</h2>
          <p>
            Beaucoup de contrats ne prélèvent pas de frais de sortie sur un rachat, mais ce
            n'est pas universel : certains contrats prévoient des frais de transfert ou de
            clôture, notamment pour un transfert Fourgous ou Pacte. Ces frais sont fixés par la
            notice du contrat et plafonnés selon les cas par la réglementation. Demandez-les par
            écrit avant de lancer la demande.
          </p>
          <p>
            Côté délais, le règlement d'un rachat prend en général quelques jours à quelques
            semaines, selon les pièces et les supports à vendre. Pendant cette période, la
            somme n'est pas investie : en cas de marchés agités, ce délai est un risque en
            soi (le prix de vente des unités de compte est fixé à la date de traitement, qui
            peut différer de celle de votre demande).
          </p>

          <h2 id="tableau">Changer de contrat : quand ça vaut le coup, quand éviter</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Changer peut se justifier si…</th>
                  <th>Mieux vaut éviter si…</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Le contrat a moins de {duree} ans et peu de gains : le coût fiscal est faible</td>
                  <td>Le contrat approche de ses {duree} ans ou les a dépassés avec de lourds gains</td>
                </tr>
                <tr>
                  <td>Les frais cumulés dépassent nettement ceux d'un contrat comparable, sur longue durée</td>
                  <td>L'écart de frais est faible ou l'horizon court</td>
                </tr>
                <tr>
                  <td>Le fonds en euros est durablement faible et la gamme de supports pauvre</td>
                  <td>Le problème se règle par un arbitrage ou un transfert chez le même assureur</td>
                </tr>
                <tr>
                  <td>La solidité de l'assureur vous inquiète vraiment (voir la{" "}
                    <a href="/guide/assurance-vie-garantie-repartir-plusieurs-contrats">garantie et la répartition</a>)</td>
                  <td>Vous cherchez à poursuivre un rendement passé sans en comprendre l'origine</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="pieges">Quels pièges éviter ?</h2>
          <ul>
            <li>
              <strong>Clôturer avant d'avoir ouvert le nouveau contrat</strong> et rester
              plusieurs semaines sans exposition.
            </li>
            <li>
              <strong>Ignorer l'imposition du rachat total</strong> : tous les gains sont
              imposés la même année, ce qui peut dépasser l'abattement et peser sur le revenu
              fiscal de référence.
            </li>
            <li>
              <strong>Croire qu'un « transfert » proposé par un conseiller préserve toujours
              l'ancienneté.</strong> Demandez par écrit si le changement s'opère par rachat ou par
              transfert légal chez le même assureur.
            </li>
            <li>
              <strong>Se laisser séduire par une prime de bienvenue</strong> ou un bonus
              temporaire qui masque des frais plus élevés.
            </li>
            <li>
              <strong>Oublier la clause bénéficiaire</strong> du nouveau contrat : elle
              n'est pas reprise automatiquement (voir{" "}
              <a href="/guide/clause-beneficiaire-assurance-vie-comment-la-rediger">comment la rédiger</a>
              ).
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Peut-on transférer une assurance-vie d'une banque à une autre ?</h3>
          <p>
            Pas en conservant l'antériorité fiscale, en règle générale : le contrat est lié à un
            assureur et non à une banque. Si votre banque distribue simplement le contrat d'un
            assureur et que ce même contrat peut être géré ailleurs, l'ancienneté reste
            attachée au contrat. Demandez à l'assureur ce qui est possible.
          </p>

          <h3>Que devient mon antériorité fiscale si je change de contrat ?</h3>
          <p>
            En cas de rachat suivi d'un nouveau contrat chez un autre assureur, l'ancienneté de
            l'ancien contrat est perdue et celle du nouveau commence à la souscription. En cas
            de transfert légal chez le même assureur (Fourgous ou « Pacte »), elle est conservée.
          </p>

          <h3>Y a-t-il des frais de clôture sur une assurance-vie ?</h3>
          <p>
            Cela dépend du contrat. Beaucoup n'en prévoient pas pour un rachat, mais certains
            facturent un transfert. Les frais sont indiqués dans la notice et dans la grille
            tarifaire de l'assureur : demandez-les avant toute décision.
          </p>

          <h3>Comment récupérer l'argent d'une assurance-vie sans trop d'impôt ?</h3>
          <p>
            En étalant les rachats sur plusieurs années pour utiliser chaque année l'abattement de{" "}
            {euros(abattement)} (personne seule) ou {euros(FISCALITE.avAbattementAnnuelCouple)} (couple)
            après {duree} ans. Voir{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">notre guide sur l'imposition d'un rachat partiel</a>.
          </p>

          <h3>Vaut-il mieux garder un vieux contrat ou en ouvrir un nouveau ?</h3>
          <p>
            Il n'y a pas de règle générale. Un contrat ancien conserve son avantage fiscal ;
            un nouveau peut offrir de meilleurs frais. Une solution fréquente consiste à
            conserver l'ancien sans nouveaux versements et à alimenter le nouveau, à condition
            que les frais de l'ancien restent supportables.
          </p>

          <h3>Que se passe-t-il pour la clause bénéficiaire en cas de changement de contrat ?</h3>
          <p>
            Chaque contrat a sa propre clause. En cas de rachat total, la clause de l'ancien
            contrat disparaît avec lui ; il faut en rédiger une nouvelle pour le contrat suivant.
          </p>

          <h3>Un rachat total est-il toujours imposé ?</h3>
          <p>
            Il l'est sur la part de gains. Si le contrat est en perte ou sans gain, aucun impôt
            sur le revenu n'est dû. Les cas particuliers (licenciement, invalidité,
            liquidation judiciaire) peuvent exonérer d'impôt sur le revenu dans les conditions
            de la fiche F22414 de Service-Public.gouv.fr.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Changer d'assurance-vie est rarement un « transfert » au sens courant : c'est
            presque toujours un rachat suivi d'une nouvelle souscription, avec un coût fiscal
            et la perte de l'antériorité. L'exemple de ce guide montre que ce coût se compte en
            milliers d'euros pour {euros(gains)} de gains. La décision se prend donc en comparant
            ce coût aux économies de frais attendues sur la durée, et en examinant d'abord les
            solutions moins radicales : arbitrage, transfert chez le même assureur, ou
            conservation du contrat sans nouveaux versements.
          </p>
          <p>
            Pour approfondir : l'angle des frais est traité dans{" "}
            <a href="/guide/combien-coute-une-assurance-vie">notre guide sur le prix d'une assurance-vie</a>{" "}
            et{" "}
            <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">celui sur les contrats qui rapportent peu</a>
            ; pour un contrat de droit luxembourgeois, voyez{" "}
            <a href="/guide/assurance-vie-luxembourgeoise">notre présentation neutre</a> et le
            site partenaire du réseau{" "}
            <a href="https://assurancevie.lu" target="_blank" rel="noopener noreferrer">assurancevie.lu</a>.
            Le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> permet de replacer
            cette décision dans l'ensemble de votre stratégie.
          </p>

          <h2 id="lire-aussi">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/comment-ouvrir-une-assurance-vie-etapes">Comment ouvrir une assurance-vie : les étapes</a></li>
            <li><a href="/guide/rachat-partiel-assurance-vie-imposition">Rachat partiel : comment est-il imposé ?</a></li>
            <li><a href="/guide/rachats-programmes-assurance-vie-retraite">Rachats programmés d'assurance-vie</a></li>
            <li><a href="/guide/assurance-vie-apres-8-ans-fiscalite-et-rente">Assurance-vie après 8 ans : fiscalité et rente</a></li>
            <li><a href="/guide/assurance-vie-garantie-repartir-plusieurs-contrats">Garantie et répartition entre plusieurs contrats</a></li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en novembre 2026 :</p>
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
              documents de l'assureur et votre avis d'impôt font foi. Les règles de transfert
              évoluent et dépendent de chaque contrat ; elles sont citées ici en l'état du
              droit en {V3_AVA_TRANSFERT.maj}. Le profil de Marc et les montants sont des
              illustrations pédagogiques. Les supports en unités de compte présentent un risque
              de perte en capital.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Changer de contrat coûte cher quand on s'y prend sans cadre." />
    </>
  );
}
