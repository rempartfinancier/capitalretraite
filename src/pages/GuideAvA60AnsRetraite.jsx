import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  AV_RACHAT,
  FISCALITE,
  FRAIS_TYPES,
  GARANTIES,
  TRANSMISSION,
  V3_AVB_60,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const tauxIR = FISCALITE.pfuIR; // 12,8 %
const tauxReduit = FISCALITE.avTauxReduitApres8Ans; // 7,5 %
const tauxPS = FISCALITE.prelevementsSociaux.assuranceVie; // 17,2 %
const abattementSeul = FISCALITE.avAbattementAnnuelSeul;
const abattementCouple = FISCALITE.avAbattementAnnuelCouple;
const duree = AV_RACHAT.dureeTauxReduitAnnees;
const seuil = AV_RACHAT.seuilPrimesTauxReduit;
const ageOuv = V3_AVB_60.ageOuverture;
const agePivot = V3_AVB_60.ageLimitePrimesAvantage;
const fgap = GARANTIES.fgapPlafondParAssureParAssureur;
const abattement990I = TRANSMISSION.abattementSuccessionAvParBeneficiaire;
const maj = V3_AVB_60.maj;

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

// ---- Exemple chiffré : même contrat, même part de gains, rachat avant ou après 8 ans ----
const versement = V3_AVB_60.versementInitial; // 100 000 €
const gainsContrat = de(versement, V3_AVB_60.gainsPctDuVersement); // 30 000 €
const valeurContrat = versement + gainsContrat; // 130 000 €
const rachat = V3_AVB_60.rachatExemple; // 15 000 €
const gainsDuRachat = r2((rachat * gainsContrat) / valeurContrat); // 3 461,54 €
const partGainsPct = r2((gainsContrat / valeurContrat) * 100); // 23,08 %
const capitalDuRachat = r2(rachat - gainsDuRachat);
const psRachat = de(gainsDuRachat, tauxPS); // 595,38 €
// Avant 8 ans : 12,8 % + prélèvements sociaux, sans abattement
const irAvant = de(gainsDuRachat, tauxIR); // 443,08 €
const totalAvant = r2(irAvant + psRachat);
// Après 8 ans : abattement annuel (personne seule) puis 7,5 %
const baseApres = Math.max(gainsDuRachat - abattementSeul, 0);
const irApres = de(baseApres, tauxReduit);
const totalApres = r2(irApres + psRachat);
const ecart = r2(totalAvant - totalApres);
const ageAu8Ans = ageOuv + duree;

// ---- Frais : ordres de grandeur sur le versement initial, à chiffrer contrat par contrat ----
const fb = FRAIS_TYPES.contratBancaireTraditionnel;
const fi = FRAIS_TYPES.contratInternet;
const fraisEntreeBancaireMin = de(versement, fb.entree.min);
const fraisEntreeBancaireMax = de(versement, fb.entree.max);
const gestionBancaireMin = de(versement, fb.gestionAnnuelle.min);
const gestionBancaireMax = de(versement, fb.gestionAnnuelle.max);
const gestionInternetMin = de(versement, fi.gestionAnnuelle.min);
const gestionInternetMax = de(versement, fi.gestionAnnuelle.max);

const [h1, h2] = V3_AVB_60.horizonsAnnees;

const sources = [
  {
    label:
      "Service-Public.gouv.fr, fiche F22414 : comment sont imposés les revenus d'un contrat d'assurance-vie ? (vérifiée le 15 avril 2026)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22414",
  },
  {
    label:
      "BOFiP, BOI-RPPM-RCM-20-15 : modalités d'imposition à l'impôt sur le revenu des produits de l'assurance-vie (taux de 12,8 % et de 7,5 %, seuil de 150 000 €)",
    url: "https://bofip.impots.gouv.fr/bofip/11224-PGP.html",
  },
  {
    label:
      "BOFiP, BOI-RPPM-RCM-20-10-20-50 : calcul du produit imposable d'un rachat, abattement annuel",
    url: "https://bofip.impots.gouv.fr/bofip/3951-PGP.html",
  },
  {
    label:
      "impots.gouv.fr, « Les revenus mobiliers » (mise à jour du 8 avril 2026) : prélèvements sociaux, option pour le barème",
    url: "https://www.impots.gouv.fr/particulier/les-revenus-mobiliers",
  },
  {
    label:
      "Service-Public.gouv.fr, fiche F14198 : droits de succession, évaluation de la succession et calcul des droits",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14198",
  },
  {
    label:
      "AMF, espace épargnants : comprendre les risques et les frais des placements financiers",
    url: "https://www.amf-france.org/fr/espace-epargnants",
  },
  {
    label:
      "Légifrance, Code général des impôts (art. 990 I, assurance-vie et transmission) et Code des assurances (garantie des assurances de personnes) : accès par la racine du site",
    url: "https://www.legifrance.gouv.fr",
  },
];

export default function GuideAvA60AnsRetraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · Assurance-vie et retraite</span>
          <h1>Assurance-vie à 60 ans ou à la retraite : ouvrir, garder ou racheter ?</h1>
          <p className="sub">
            Horizon, liquidité, fiscalité avant et après {duree} ans, transmission, frais : la
            démarche pas à pas et un exemple chiffré. Mis à jour en {maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> à {ageOuv} ans ou à la retraite, l'assurance-vie reste
              un outil utile, mais la bonne question n'est plus « quel rendement ? » : c'est « à
              quelle date aurai-je besoin de cet argent, et que se passera-t-il pour mes
              proches ? ». Un contrat ouvert à {ageOuv} ans atteint {duree} ans à {ageAu8Ans} ans :
              dans l'exemple de ce guide, le même rachat de {euros(rachat)} coûte{" "}
              {eur(totalAvant)} d'impôt et de prélèvements avant {duree} ans, et {eur(totalApres)}{" "}
              après. Et pour un contrat alimenté avant {agePivot} ans, chaque bénéficiaire profite
              d'un abattement de {euros(abattement990I)} sur le capital transmis. Ces repères
              n'ont de sens qu'avec vos propres dates et montants.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#interet">Est-il encore intéressant d'ouvrir une assurance-vie à {ageOuv} ans ?</a></li>
              <li><a href="#decision">Ouvrir, garder, racheter ou alimenter : comment trancher ?</a></li>
              <li><a href="#horizon">Fonds en euros ou unités de compte : que change l'horizon ?</a></li>
              <li><a href="#fiscalite">Quelle fiscalité avant et après {duree} ans ? Un exemple chiffré</a></li>
              <li><a href="#transmission">Et la transmission : pourquoi le cap des {agePivot} ans compte</a></li>
              <li><a href="#frais">Quels frais regarder avant de signer ?</a></li>
              <li><a href="#etapes">Quelle démarche suivre, étape par étape ?</a></li>
              <li><a href="#documents">Quels documents et quels délais prévoir ?</a></li>
              <li><a href="#checklist">Check-list avant de signer</a></li>
              <li><a href="#tableau">Quand ça vaut le coup, quand éviter</a></li>
              <li><a href="#pieges">Quels pièges éviter ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Prenons un cas composite, sans lien avec une personne réelle : un couple de {ageOuv}{" "}
            ans qui vient de vendre un bien et dispose de {euros(versement)} disponibles. Ils
            songent à partir à la retraite dans quelques années, ont déjà un contrat ouvert il y a
            longtemps, et hésitent : en ouvrir un second, alimenter l'ancien, ou tout laisser sur
            un compte courant « par prudence » ? Chacune de ces options a un coût caché ou un
            bénéfice que les brochures ne détaillent pas.
          </p>
          <p>
            Ce guide traite la décision et la démarche. Il ne dit pas dans quel support investir :
            sur ce point,{" "}
            <a href="/guide/assurance-vie-fonds-euros-ou-uc-a-55-ans">
              notre guide fonds en euros ou unités de compte à 55 ans
            </a>{" "}
            détaille le raisonnement par poche d'épargne. Il ne refait pas non plus le calcul d'un
            rachat partiel, que{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">
              le guide dédié
            </a>{" "}
            explique en détail.
          </p>

          <h2 id="interet">Est-il encore intéressant d'ouvrir une assurance-vie à {ageOuv} ans ?</h2>
          <p>
            Oui dans bien des situations, car l'assurance-vie combine trois propriétés que peu
            d'enveloppes réunissent : une épargne disponible à tout moment (le contrat peut être
            racheté en totalité ou en partie), une fiscalité qui s'allège avec l'ancienneté du
            contrat, et un cadre de transmission spécifique en cas de décès. Elle n'a toutefois
            rien de magique : ses supports en unités de compte exposent à une perte en capital, et
            les frais rognent le résultat année après année.
          </p>
          <p>
            L'argument de l'âge est souvent mal posé. Ouvrir à {ageOuv} ans ne « rate » pas le coche :
            l'horloge fiscale démarre à l'ouverture et non à l'âge de l'assuré. Un contrat ouvert
            aujourd'hui sera fiscalement mûr dans {duree} ans, soit à {ageAu8Ans} ans, c'est-à-dire
            en pleine retraite, à un moment où l'on commence souvent à puiser dans son épargne. La
            vraie question est plutôt : cette somme servira-t-elle dans moins de {duree} ans ? Si
            oui, le régime de faveur ne jouera pas pour elle, et d'autres solutions de liquidité
            méritent d'être comparées.
          </p>

          <h2 id="decision">Ouvrir, garder, racheter ou alimenter : comment trancher ?</h2>
          <p>
            Quatre gestes sont possibles, et le bon dépend de l'ancienneté du contrat existant, de
            la date probable des retraits et de la place des proches dans le dossier.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Votre situation</th>
                  <th>Geste à étudier en premier</th>
                  <th>Point de vigilance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Contrat existant de {duree} ans ou plus, de bonnes conditions</td>
                  <td>Garder et alimenter</td>
                  <td>
                    Chaque nouveau versement profite de l'ancienneté acquise ; vérifier les frais et
                    le choix de supports.
                  </td>
                </tr>
                <tr>
                  <td>Contrat ancien mais coûteux ou peu flexible</td>
                  <td>Comparer avant de fermer</td>
                  <td>
                    Un rachat total met fin à la date de souscription : le nouveau contrat repart à
                    zéro pour le délai de {duree} ans.
                  </td>
                </tr>
                <tr>
                  <td>Pas de contrat, argent disponible, besoin à plus de {duree} ans</td>
                  <td>Ouvrir un contrat</td>
                  <td>
                    Comparer frais d'entrée, frais de gestion et supports disponibles, voir{" "}
                    <a href="/guide/comment-ouvrir-une-assurance-vie-etapes">
                      comment ouvrir une assurance-vie
                    </a>
                    .
                  </td>
                </tr>
                <tr>
                  <td>Besoin d'un retrait important dans les prochaines années</td>
                  <td>Racheter, au moindre coût fiscal</td>
                  <td>
                    Mesurer la part de gains, répartir les retraits sur plusieurs années civiles,
                    voir{" "}
                    <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a>.
                  </td>
                </tr>
                <tr>
                  <td>Plus de {euros(fgap)} chez un même assureur</td>
                  <td>Étudier une répartition</td>
                  <td>
                    La garantie des assurances de personnes est plafonnée à {euros(fgap)} par
                    assuré et par assureur, voir{" "}
                    <a href="/guide/assurance-vie-garantie-repartir-plusieurs-contrats">
                      la répartition entre plusieurs contrats
                    </a>
                    .
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Ce tableau est une grille de lecture, pas une prescription : la décision se prend cas
            par cas, après avoir regardé l'ensemble de votre patrimoine.
          </p>

          <h2 id="horizon">Fonds en euros ou unités de compte : que change l'horizon ?</h2>
          <p>
            Plus la date des retraits est proche, moins la part de supports exposés aux marchés est
            défendable, et inversement. Le fonds en euros garantit en principe le capital (hors
            frais de gestion, et dans la limite de la solidité de l'assureur) ; les unités de
            compte, elles, ne garantissent rien : leur valeur fluctue et la perte en capital est
            possible. Les performances passées ne préjugent pas des performances futures.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Date probable des retraits</th>
                  <th>Piste de réflexion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dans moins de {h1} ans</td>
                  <td>
                    Privilégier la disponibilité et la sécurité du capital ; une baisse de marché
                    laisserait peu de temps pour se redresser.
                  </td>
                </tr>
                <tr>
                  <td>Entre {h1} et {h2} ans</td>
                  <td>
                    Panacher selon votre tolérance au risque, en distinguant l'argent déjà affecté
                    à des dépenses prévues de celui qui ne servira que plus tard.
                  </td>
                </tr>
                <tr>
                  <td>Dans plus de {h2} ans (ou transmission à des enfants)</td>
                  <td>
                    Une part plus importante de supports de croissance peut se discuter, avec
                    l'acceptation de variations parfois fortes et de pertes temporaires.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            À la retraite, on ne raisonne plus sur un seul horizon : une partie du capital servira
            dans {h1} ans, une autre dans vingt ans, une autre n'est destinée qu'à la transmission.
            Découper le contrat en poches, plutôt qu'en un portefeuille unique, rend le choix de
            supports plus lisible. La gestion pilotée peut simplifier cette tâche, mais son
            surcoût est à comparer aux frais de gestion libre (voir{" "}
            <a href="/guide/gestion-pilotee-ou-gestion-libre">gestion pilotée ou gestion libre</a>
            ).
          </p>

          <h2 id="fiscalite">Quelle fiscalité avant et après {duree} ans ? Un exemple chiffré</h2>
          <p>
            Pour les primes versées depuis le {AV_RACHAT.datePivotPrimes}, la part de gains d'un
            rachat est imposée à {pct(tauxIR)} avant {duree} ans. À partir de {duree} ans, elle est
            imposée à {pct(tauxReduit)} après un abattement annuel de {euros(abattementSeul)}{" "}
            (personne seule) ou {euros(abattementCouple)} (couple soumis à imposition commune),
            dans la limite de {euros(seuil)} de primes versées, au-delà desquels le taux
            de {pct(tauxIR)} s'applique à la fraction correspondante. Dans tous les cas, les
            prélèvements sociaux de {pct(tauxPS)} frappent la part de gains, sans abattement.
          </p>
          <div className="note">
            <p>
              Exemple illustratif, sans lien avec un cas réel : un contrat ouvert avec{" "}
              {euros(versement)} de primes vaut {euros(valeurContrat)}, soit {euros(gainsContrat)} de
              gains (hypothèse de calcul, pas un rendement attendu). Le titulaire, seul, rachète{" "}
              {euros(rachat)}. Ce rachat contient {euros(rachat)} × {euros(gainsContrat)} ÷{" "}
              {euros(valeurContrat)} = {eur(gainsDuRachat)} de gains ({pct(partGainsPct)} du
              rachat) et {eur(capitalDuRachat)} de capital non imposé. Aucun prélèvement social
              n'est supposé déjà acquitté.
            </p>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Rachat de {euros(rachat)}</th>
                  <th>Contrat de moins de {duree} ans</th>
                  <th>Contrat de {duree} ans ou plus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Part de gains</td>
                  <td>{eur(gainsDuRachat)}</td>
                  <td>{eur(gainsDuRachat)}</td>
                </tr>
                <tr>
                  <td>Impôt sur le revenu</td>
                  <td>{eur(irAvant)} (à {pct(tauxIR)})</td>
                  <td>
                    {eur(irApres)}, car les gains sont sous l'abattement de {euros(abattementSeul)}
                  </td>
                </tr>
                <tr>
                  <td>Prélèvements sociaux ({pct(tauxPS)})</td>
                  <td>{eur(psRachat)}</td>
                  <td>{eur(psRachat)}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>
                    {eur(totalAvant)}, soit {pct(r2((totalAvant / rachat) * 100))} du rachat
                  </td>
                  <td>
                    {eur(totalApres)}, soit {pct(r2((totalApres / rachat) * 100))} du rachat
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            L'écart est de {eur(ecart)} sur ce retrait : réel, mais plus modeste que ne le laisse
            croire l'idée reçue d'une assurance-vie « exonérée après {duree} ans ». Les
            prélèvements sociaux restent dus, et l'avantage fiscal ne se joue vraiment que sur les
            retraits répétés ou volumineux. Pour reproduire le calcul avec vos chiffres, suivez{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">le guide du rachat partiel</a>
            ; pour la suite de la vie du contrat,{" "}
            <a href="/guide/assurance-vie-apres-8-ans-fiscalite-et-rente">
              le guide après {duree} ans
            </a>{" "}
            traite la sortie en rente.
          </p>

          <h2 id="transmission">Et la transmission : pourquoi le cap des {agePivot} ans compte</h2>
          <p>
            Pour les primes versées avant les {agePivot} ans du souscripteur, le capital transmis
            à chaque bénéficiaire désigné est taxé selon l'article 990 I du Code général des impôts,
            après un abattement de {euros(abattement990I)} par bénéficiaire, tous contrats
            confondus. Les primes versées après {agePivot} ans relèvent d'un autre régime, avec un
            abattement global bien plus faible, que{" "}
            <a href="/guide/assurance-vie-apres-70-ans-fiscalite-succession">
              notre guide sur l'assurance-vie après {agePivot} ans
            </a>{" "}
            détaille.
          </p>
          <p>
            Concrètement, à {ageOuv} ans, il reste environ {agePivot - ageOuv} ans pour verser les
            primes qui profiteront du régime le plus favorable. Cela ne signifie pas qu'il faut
            verser en hâte : un versement qui prive de liquidités utiles serait une mauvaise
            affaire. Cela justifie en revanche de ne pas reporter indéfiniment la décision, et
            de relire dès maintenant la clause bénéficiaire (voir{" "}
            <a href="/guide/clause-beneficiaire-assurance-vie-comment-la-rediger">
              comment la rédiger
            </a>
            ). Selon les cas, une donation peut être comparée à ce dispositif :{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">
              donation ou assurance-vie
            </a>
            .
          </p>

          <h2 id="frais">Quels frais regarder avant de signer ?</h2>
          <p>
            Quatre lignes de frais comptent : les frais d'entrée sur chaque versement, les frais de
            gestion annuels du contrat, les frais propres aux supports choisis, et les éventuels
            frais d'arbitrage. Les ordres de grandeur constatés (à vérifier contrat par contrat)
            appliqués à {euros(versement)} donnent :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Sur {euros(versement)}</th>
                  <th>Contrat bancaire traditionnel</th>
                  <th>Contrat en ligne</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frais d'entrée (une fois)</td>
                  <td>
                    {euros(fraisEntreeBancaireMin)} à {euros(fraisEntreeBancaireMax)}
                  </td>
                  <td>{euros(0)}</td>
                </tr>
                <tr>
                  <td>Frais de gestion du contrat (par an)</td>
                  <td>
                    {euros(gestionBancaireMin)} à {euros(gestionBancaireMax)}
                  </td>
                  <td>
                    {euros(gestionInternetMin)} à {euros(gestionInternetMax)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Ces montants ne comprennent pas les frais courants des supports, qui peuvent être
            sensiblement plus lourds que les frais de contrat. Sur {h2} ans, quelques dixièmes de
            point d'écart représentent plusieurs milliers d'euros : c'est le poste que l'on peut le
            plus facilement réduire. Voir aussi{" "}
            <a href="/guide/combien-coute-une-assurance-vie">le coût d'une assurance-vie</a> et{" "}
            <a href="/guide/meilleure-assurance-vie-retraite">
              les critères de choix d'un contrat pour la retraite
            </a>
            .
          </p>

          <h2 id="etapes">Quelle démarche suivre, étape par étape ?</h2>
          <ol>
            <li>
              <strong>Dresser l'inventaire.</strong> Listez vos contrats existants : date de
              souscription, versements non remboursés, valeur de rachat, frais, supports, clause
              bénéficiaire. Le relevé annuel ou l'espace client suffit.
            </li>
            <li>
              <strong>Fixer les dates.</strong> Pour chaque somme, indiquez quand elle servira : dans
              moins de {h1} ans, entre {h1} et {h2} ans, plus tard, ou jamais (transmission).
            </li>
            <li>
              <strong>Garder un matelas de liquidités.</strong> Avant tout versement, conservez
              hors contrat une réserve pour les imprévus ; l'assurance-vie n'est pas un compte
              courant.
            </li>
            <li>
              <strong>Choisir le geste.</strong> Alimenter un contrat ancien, en ouvrir un nouveau,
              racheter ou ne rien faire : consultez le tableau de décision ci-dessus et simulez
              l'impôt d'un éventuel rachat.
            </li>
            <li>
              <strong>Comparer deux ou trois offres.</strong> Frais, supports, qualité du service,
              solidité de l'assureur, plafond de garantie. Le dossier d'information précontractuel
              (document d'informations clés) fournit les chiffres à comparer.
            </li>
            <li>
              <strong>Signer, verser, puis rédiger la clause.</strong> Après la signature, vous
              disposez d'un délai de renonciation de trente jours calendaires (à vérifier dans les
              conditions générales de votre contrat). Rédigez ensuite la clause bénéficiaire avec
              soin.
            </li>
            <li>
              <strong>Programmer une revue annuelle.</strong> Une fois par an, comparez la
              répartition par poche à vos besoins et vérifiez que la clause reste d'actualité.
            </li>
          </ol>

          <h2 id="documents">Quels documents et quels délais prévoir ?</h2>
          <p>
            Pour ouvrir un contrat, l'assureur demande en général une pièce d'identité, un
            justificatif de domicile, un relevé d'identité bancaire, des informations sur votre
            situation (patrimoine, profession, origine des fonds) et, pour un versement important,
            un justificatif de l'origine des fonds. La mise en place demande de quelques jours à
            quelques semaines selon que la souscription est en ligne ou en agence ; le premier
            versement est ensuite investi selon les délais de l'assureur. Pour un rachat, comptez la
            demande, la validation par l'assureur puis le virement : prévoyez plusieurs jours
            ouvrés, davantage si des unités de compte doivent être vendues.
          </p>

          <h2 id="checklist">Check-list avant de signer</h2>
          <ul>
            <li>Un matelas de liquidités est conservé hors contrat.</li>
            <li>La date probable des retraits a été fixée, somme par somme.</li>
            <li>Les frais d'entrée, de gestion et des supports ont été chiffrés pour {euros(versement)} (ou votre montant).</li>
            <li>Le plafond de {euros(fgap)} par assureur est respecté, ou le dépassement assumé.</li>
            <li>L'impôt d'un éventuel premier rachat a été simulé.</li>
            <li>La clause bénéficiaire est rédigée, avec un ou plusieurs bénéficiaires de second rang.</li>
            <li>Le risque de perte en capital sur les unités de compte a été lu et compris.</li>
          </ul>

          <h2 id="tableau">Quand ça vaut le coup, quand éviter</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>L'assurance-vie à {ageOuv} ans vaut le coup si…</th>
                  <th>Mieux vaut y réfléchir à deux fois si…</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>vous n'aurez pas besoin de cette somme avant {duree} ans</td>
                  <td>vous en aurez besoin dans moins de deux ou trois ans</td>
                </tr>
                <tr>
                  <td>vous voulez désigner librement des bénéficiaires</td>
                  <td>votre priorité est une donation immédiate à des enfants</td>
                </tr>
                <tr>
                  <td>vous comparez frais et supports avant de signer</td>
                  <td>on vous propose un contrat unique, sans comparaison, avec des frais élevés</td>
                </tr>
                <tr>
                  <td>vous gardez des liquidités hors contrat</td>
                  <td>vous placeriez tout votre capital disponible</td>
                </tr>
                <tr>
                  <td>vous supportez de voir la valeur des unités de compte baisser</td>
                  <td>une forte baisse temporaire vous ferait vendre dans la panique</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="pieges">Quels pièges éviter ?</h2>
          <ul>
            <li>
              <strong>Racheter un vieux contrat pour en ouvrir un autre :</strong> on perd la date
              de souscription et, avec elle, l'abattement annuel et le taux réduit.
            </li>
            <li>
              <strong>Confondre « après {duree} ans » et « sans impôt » :</strong> les prélèvements
              sociaux de {pct(tauxPS)} restent dus sur les gains.
            </li>
            <li>
              <strong>Oublier la garantie par assureur :</strong> au-delà de {euros(fgap)} chez un
              même assureur, le surplus n'est pas couvert.
            </li>
            <li>
              <strong>Laisser une clause standard :</strong> elle peut ne plus correspondre à votre
              famille.
            </li>
            <li>
              <strong>Verser sous la pression :</strong> aucune offre ne justifie de signer avant
              d'avoir comparé.
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Peut-on ouvrir une assurance-vie à 60 ans ?</h3>
          <p>
            Oui. Il n'existe pas de limite d'âge légale pour souscrire. Certains assureurs
            plafonnent l'âge à l'ouverture ou aux versements, mais la plupart des contrats
            acceptent un souscripteur de {ageOuv} ans. C'est la date d'ouverture, non l'âge, qui
            fait courir le délai de {duree} ans.
          </p>

          <h3>Faut-il ouvrir une assurance-vie à la retraite ?</h3>
          <p>
            Cela dépend du besoin : disponibilité, transmission, complément de revenus. Si vous
            disposez déjà d'un contrat ancien et de bonnes conditions, alimenter celui-ci évite de
            repartir de zéro. Sinon, en ouvrir un permet de lancer l'horloge fiscale, à condition
            de ne pas y placer d'argent dont vous aurez besoin à court terme.
          </p>

          <h3>Quel montant maximum peut-on verser sur une assurance-vie ?</h3>
          <p>
            Il n'existe pas de plafond légal de versement. Le plafond de garantie de {euros(fgap)}
            par assuré et par assureur ne limite pas les versements : il borne seulement
            l'indemnisation en cas de défaillance de l'assureur. Au-delà de {euros(seuil)} de
            primes non remboursées, le taux réduit après {duree} ans ne s'applique plus qu'à une
            fraction des gains.
          </p>

          <h3>Que devient mon assurance-vie si je ne fais rien à la retraite ?</h3>
          <p>
            Elle continue de vivre. Ses gains restent capitalisés, sans impôt tant que vous ne
            rachetez pas (hors prélèvements sociaux annuels sur les fonds en euros). Il vaut mieux
            relire vos supports et votre clause bénéficiaire que laisser le contrat en pilote
            automatique pendant dix ans.
          </p>

          <h3>Vaut-il mieux garder ou racheter son assurance-vie à la retraite ?</h3>
          <p>
            Garder évite de payer l'impôt sur les gains et préserve l'ancienneté ; racheter apporte
            de la liquidité. Un rachat partiel, mesuré et réparti sur plusieurs années civiles,
            permet de profiter plusieurs fois de l'abattement annuel. Le choix dépend de vos
            besoins, pas d'une règle universelle.
          </p>

          <h3>L'assurance-vie est-elle meilleure que le PER à 60 ans ?</h3>
          <p>
            Elles ne servent pas le même objectif. Le PER déduit les versements du revenu
            imposable mais bloque l'épargne jusqu'à la retraite (sauf cas de déblocage), tandis que
            l'assurance-vie reste disponible. Notre guide{" "}
            <a href="/guide/per-ou-assurance-vie-selon-age-et-tmi">
              PER ou assurance-vie selon l'âge et la TMI
            </a>{" "}
            compare les deux avec cinq tranches d'imposition.
          </p>

          <h3>Mes enfants paieront-ils des droits sur mon assurance-vie ?</h3>
          <p>
            Pour les primes versées avant {agePivot} ans, chaque bénéficiaire profite d'un
            abattement de {euros(abattement990I)} sur les capitaux reçus, tous contrats confondus.
            Au-delà de cet abattement, une taxation spécifique s'applique. Le conjoint ou
            partenaire de Pacs survivant est exonéré. Pour les primes versées après {agePivot}{" "}
            ans, voir le guide dédié.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            À {ageOuv} ans, l'assurance-vie demande moins de talent qu'une bonne organisation :
            savoir quand chaque somme servira, choisir un contrat aux frais maîtrisés, rédiger une
            clause à jour, et garder des liquidités ailleurs. Le calcul fiscal, lui, est moins
            spectaculaire qu'on le dit : dans notre exemple, la différence entre un rachat avant et
            après {duree} ans tient à {eur(ecart)}, car les prélèvements sociaux pèsent dans les
            deux cas.
          </p>
          <p>
            Si vous hésitez encore, trois pistes selon votre point de départ :{" "}
            <a href="/guide/comment-ouvrir-une-assurance-vie-etapes">
              ouvrir un contrat, étape par étape
            </a>
            ,{" "}
            <a href="/strategies/assurance-vie-retraite">
              la vue d'ensemble de l'assurance-vie pour la retraite
            </a>{" "}
            ou le{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> pour situer l'épargne dans
            votre trajectoire. Pour un regard extérieur sur l'ensemble de votre situation, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à poser le
            cadre avant toute décision.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li>
              <a href="/guide/assurance-vie-fonds-euros-ou-uc-a-55-ans">
                Assurance-vie à 55 ans : fonds euros ou UC
              </a>
            </li>
            <li>
              <a href="/guide/rachat-partiel-assurance-vie-imposition">
                Rachat partiel d'assurance-vie : comment est-il imposé ?
              </a>
            </li>
            <li>
              <a href="/guide/assurance-vie-apres-70-ans-fiscalite-succession">
                Assurance-vie après 70 ans : fiscalité et succession
              </a>
            </li>
            <li>
              <a href="/guide/preparer-sa-retraite-guide-complet">
                Préparer sa retraite : le guide complet
              </a>
            </li>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : la décision
              se prend cas par cas, au vu de votre situation. Les règles et taux cités sont ceux en
              vigueur en novembre 2026 et peuvent évoluer. L'exemple chiffré est une illustration
              pédagogique sans lien avec un cas réel ; la part de gains retenue est une hypothèse de
              calcul et non un rendement attendu. Les supports en unités de compte d'un contrat
              d'assurance-vie présentent un risque de perte en capital ; les performances passées ne
              préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Ouvrir, garder ou racheter : la décision se prépare avant la signature." />
    </>
  );
}
