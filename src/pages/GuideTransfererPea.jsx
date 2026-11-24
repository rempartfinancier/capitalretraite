import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  ENRICH_EPPEA_PEA,
  ENVELOPPES_NOV2026,
  FISCALITE,
  PEA_LIGNE_NOV2026,
  V3_PEA_TRANSFERT,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const T = V3_PEA_TRANSFERT;
const haute = PEA_LIGNE_NOV2026.grilleHaute; // grille fictive proche des plafonds
const basse = PEA_LIGNE_NOV2026.grilleBasse; // grille fictive à tarif réduit
const ordresParAn = PEA_LIGNE_NOV2026.ordresParAn;
const plafondLigne = ENVELOPPES_NOV2026.peaFraisTransfertMax.parLigne;
const plafondTotal = ENVELOPPES_NOV2026.peaFraisTransfertMax.total;
const plafondVersements = ENVELOPPES_NOV2026.peaPlafondVersements;
const delaiAns = FISCALITE.peaExonerationIRApres;

const r2 = (n) => Math.round(n * 100) / 100;
const eur = (n) =>
  Number.isInteger(r2(n))
    ? euros(n)
    : new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(r2(n));

// ---- Exemple chiffré : coût annuel avant / après, frais de transfert, amortissement ----
const achatsAnnuels = ordresParAn * T.versementMensuel; // montant acheté chaque année (€)
const coutAnnuel = (g) =>
  r2((T.valeurPlan * g.droitsGardePct) / 100 + (achatsAnnuels * g.courtagePct) / 100);
const droitsGardeHaute = r2((T.valeurPlan * haute.droitsGardePct) / 100);
const courtageHaute = r2((achatsAnnuels * haute.courtagePct) / 100);
const droitsGardeBasse = r2((T.valeurPlan * basse.droitsGardePct) / 100);
const courtageBasse = r2((achatsAnnuels * basse.courtagePct) / 100);
const coutHaute = coutAnnuel(haute);
const coutBasse = coutAnnuel(basse);
const economieAnnuelle = r2(coutHaute - coutBasse);
const fraisTransfert = Math.min(T.nombreLignes * plafondLigne, plafondTotal);
const moisAmortissement = Math.round((fraisTransfert / economieAnnuelle) * 12);
const economie5Ans = r2(economieAnnuelle * 5 - fraisTransfert);

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Plan d'épargne en actions (PEA), fiche F2385, vérifiée le 22 mai 2026 : plafond de versements, date d'ouverture, interdiction de détenir plusieurs PEA classiques, titres éligibles",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2385",
  },
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : comment sont imposés les revenus d'un PEA ? Fiche F22449, vérifiée le 15 avril 2026 : retrait avant ou après 5 ans, clôture du plan",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22449",
  },
  {
    label:
      "AMF — Plafonnement des frais pour le PEA : que faut-il retenir ? (10 juillet 2020) : frais d'ouverture, droits de garde, transaction, transfert et clôture",
    url: "https://www.amf-france.org/fr/actualites-publications/actualites/plafonnement-des-frais-pour-le-pea-que-faut-il-retenir",
  },
  {
    label:
      "AMF — Espace épargnants : informations sur les frais, les intermédiaires et les réclamations (médiateur de l'AMF)",
    url: "https://www.amf-france.org/fr/espace-epargnants",
  },
  {
    label:
      "impots.gouv.fr — Les revenus mobiliers (mise à jour du 8 avril 2026) : imprimé fiscal unique et déclaration des revenus du PEA",
    url: "https://www.impots.gouv.fr/particulier/les-revenus-mobiliers",
  },
  {
    label:
      "Légifrance — Code monétaire et financier, art. L. 221-30 et suivants (régime du plan d'épargne en actions)",
    url: "https://www.legifrance.gouv.fr/",
  },
];

export default function GuideTransfererPea() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide action · PEA et retraite</span>
          <h1>Transférer son PEA : procédure, délais et frais à comparer</h1>
          <p className="sub">
            Comment changer d'établissement sans clôturer son plan ni perdre son ancienneté :
            étapes, documents, frais de transfert, pièges, et un calcul pour savoir si l'opération
            vaut son coût. Mis à jour en novembre 2026.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> transférer un PEA, ce n'est ni le clôturer ni le
              rouvrir. Le plan passe d'un établissement à l'autre avec ses titres, ses espèces et
              sa date d'ouverture, donc son ancienneté de {delaiAns} ans. La demande se fait
              auprès de l'établissement d'accueil, qui organise le transfert. Le coût propre à
              l'opération est un frais de transfert plafonné par la réglementation :{" "}
              {euros(plafondLigne)} par ligne de titres cotés ({euros(T.fraisTransfertParLigneNonCote)}{" "}
              pour un titre non coté), {euros(plafondTotal)} au total au maximum. Dans l'exemple chiffré de ce guide, ces frais sont amortis en
              environ {moisAmortissement} mois. Le principal piège est de clôturer ou de retirer
              avant l'arrivée du plan.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#principe">Peut-on transférer son PEA sans le clôturer ni perdre son ancienneté ?</a></li>
              <li><a href="#etapes">Quelles sont les étapes d'un transfert de PEA ?</a></li>
              <li><a href="#documents">Quels documents fournir et quels délais prévoir ?</a></li>
              <li><a href="#frais">Quels frais comparer : transfert, clôture, frais courants ?</a></li>
              <li><a href="#exemple">Le transfert vaut-il son coût ? Un exemple chiffré</a></li>
              <li><a href="#titres">Quels titres ne se transfèrent pas ?</a></li>
              <li><a href="#pieges">Quels pièges éviter ?</a></li>
              <li><a href="#tableau">Transférer ou rester : quand ça vaut le coup</a></li>
              <li><a href="#checklist">Check-list avant de lancer le transfert</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#aller-plus-loin">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Beaucoup de détenteurs de PEA découvrent leur grille tarifaire des années après
            l'ouverture : droits de garde annuels, courtage par ordre, fonds maison. Puis vient
            l'idée de changer d'établissement, et avec elle la peur de « tout perdre » : l'ancienneté
            de {delaiAns} ans, qui conditionne l'exonération d'impôt sur le revenu, et les
            gains accumulés.
          </p>
          <p>
            Prenons un profil illustratif, sans lien avec un cas réel : un cadre de 52 ans, PEA
            ouvert il y a neuf ans dans sa banque de détail, {euros(T.valeurPlan)} investis
            sur {T.nombreLignes} lignes. Il alimente son plan de {euros(T.versementMensuel)} par mois
            et vise la retraite dans une douzaine d'années. Sa question n'est pas « quel est le
            meilleur établissement ? » mais « comment déménager mon plan sans casser son
            ancienneté, et combien cela coûte-t-il ? ».
          </p>
          <p>
            Ce guide décrit la procédure, les frais à comparer et les pièges courants. Il ne
            recommande aucun établissement : comparer les offres relève d'un choix personnel, que
            notre guide{" "}
            <a href="/guide/pea-banque-ou-courtier">PEA : banque ou courtier</a> aide à structurer.
          </p>

          <h2 id="principe">Peut-on transférer son PEA sans le clôturer ni perdre son ancienneté ?</h2>
          <p>
            Oui : un PEA se transfère d'un établissement à un autre sans être clôturé, et conserve
            sa date d'ouverture. Le délai de {delaiAns} ans court à partir du premier versement
            (Service-Public.gouv.fr, fiche F2385) : c'est cette date qui voyage avec le plan, pas
            celle de l'arrivée chez le nouvel établissement.
          </p>
          <p>
            La nuance est importante. Le transfert déplace un plan existant ; il n'ouvre pas un
            second PEA. La loi interdit de détenir plusieurs PEA classiques (bancaire ou assurance)
            en même temps, ce qui explique pourquoi l'établissement d'accueil vous demande si vous
            en détenez déjà un. Si vous ouvrez un PEA neuf puis clôturez l'ancien, vous repartez à
            zéro pour l'ancienneté, et la clôture avant {delaiAns} ans déclenche l'imposition des
            gains au taux de {pct(FISCALITE.pfuIR)}, en plus des prélèvements sociaux (fiche F22449).
          </p>
          <p>
            Un PEA-PME-ETI, qui peut coexister avec un PEA classique, se transfère de la même façon,
            mais par une demande distincte. Les plafonds de versements ne changent pas :{" "}
            {euros(plafondVersements)} pour le PEA classique, quels que soient le nombre de transferts
            et l'établissement.
          </p>

          <h2 id="etapes">Quelles sont les étapes d'un transfert de PEA ?</h2>
          <p>
            Le transfert se pilote depuis l'établissement d'accueil, qui contacte lui-même
            l'établissement d'origine. Six étapes suffisent, dans cet ordre.
          </p>
          <ol>
            <li>
              <strong>Faire le point sur l'existant.</strong> Demandez à votre établissement actuel
              la liste de vos lignes, la valeur du plan, le total de vos versements et la date
              d'ouverture. Relevez aussi sa grille tarifaire : frais de transfert, frais de clôture,
              droits de garde.
            </li>
            <li>
              <strong>Vérifier l'éligibilité de vos lignes chez l'accueil.</strong> Une ligne que
              l'établissement d'accueil ne sait pas conserver ne pourra pas voyager (voir plus bas).
              Mieux vaut le savoir avant de commencer.
            </li>
            <li>
              <strong>Choisir l'établissement d'accueil et demander le transfert, pas l'ouverture.</strong>{" "}
              Précisez dans votre dossier que vous détenez déjà un PEA et que vous voulez le
              transférer. Selon les établissements, un formulaire de transfert se signe en ligne ou
              sur papier.
            </li>
            <li>
              <strong>Laisser l'accueil contacter l'établissement d'origine.</strong> Vous ne
              clôturez rien vous-même et ne retirez rien : le mandat de transfert que vous signez
              suffit.
            </li>
            <li>
              <strong>Attendre l'arrivée des titres et des espèces.</strong> Pendant ce temps, le
              plan est en principe gelé : ni ordre, ni versement. Vérifiez à l'arrivée que toutes les
              lignes, les espèces et la date d'ouverture sont conformes.
            </li>
            <li>
              <strong>Résilier ou solder l'ancien compte.</strong> Une fois le transfert confirmé,
              fermez les éventuels comptes annexes de l'ancien établissement, et vérifiez qu'aucun
              prélèvement résiduel ne subsiste.
            </li>
          </ol>

          <h2 id="documents">Quels documents fournir et quels délais prévoir ?</h2>
          <p>
            Le dossier d'un transfert est plus léger que celui d'une ouverture, mais l'établissement
            d'accueil applique malgré tout ses obligations de connaissance du client. En pratique,
            comptez sur les pièces suivantes.
          </p>
          <ul>
            <li>une pièce d'identité en cours de validité et un justificatif de domicile ;</li>
            <li>
              le dernier relevé du PEA (liste des lignes, espèces) et, s'il existe, l'avis d'ouverture
              précisant la date de premier versement ;
            </li>
            <li>
              les références du compte d'origine (établissement, numéro de plan), pour le formulaire
              de transfert ;
            </li>
            <li>un RIB du compte de rattachement, pour les versements futurs.</li>
          </ul>
          <p>
            Côté délais, la durée dépend de l'établissement d'origine, du nombre de lignes et de leur
            nature. L'ordre de grandeur courant est de {T.delaiIndicatifSemaines} semaines,
            davantage si une ligne pose problème (à confirmer auprès de vos deux établissements). Ne
            planifiez pas de transfert au moment où vous avez besoin de vendre : le plan est gelé le
            temps de l'opération.
          </p>

          <h2 id="frais">Quels frais comparer : transfert, clôture, frais courants ?</h2>
          <p>
            Trois catégories de frais se confondent souvent, alors qu'elles ne se déclenchent pas au
            même moment. Les distinguer évite de payer deux fois.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Type de frais</th>
                  <th>Quand ?</th>
                  <th>Ce qu'il faut savoir</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frais de transfert</td>
                  <td>Une fois, à la sortie du plan de l'établissement d'origine</td>
                  <td>
                    Plafonnés par la réglementation issue de la loi Pacte :{" "}
                    {euros(plafondLigne)} par ligne de titres cotés ({euros(T.fraisTransfertParLigneNonCote)}{" "}
                    par ligne non cotée), dans la limite de {euros(plafondTotal)} au total. Certains établissements d'accueil
                    remboursent tout ou partie de ces frais sous conditions : à demander.
                  </td>
                </tr>
                <tr>
                  <td>Frais de clôture</td>
                  <td>Si le plan est fermé définitivement (retrait total)</td>
                  <td>
                    Ne concernent pas un transfert ; ils sont plafonnés de la même façon que les frais
                    de transfert. Si l'on vous en réclame lors d'un transfert, demandez à quel titre.
                  </td>
                </tr>
                <tr>
                  <td>Frais courants</td>
                  <td>Chaque année et à chaque ordre</td>
                  <td>
                    Droits de garde (jusqu'à {pct(ENRICH_EPPEA_PEA.fraisTenueCompteMaxPct)} par an de
                    la valeur du plan, plus {euros(T.droitsGardeMajorationParLigneCote)} au plus par ligne
                    de titres cotés, selon le plafond de référence), courtage par ordre (jusqu'à{" "}
                    {pct(ENRICH_EPPEA_PEA.fraisOrdreEnLignePct)} en ligne), frais des supports. C'est
                    là que se joue la vraie économie.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Pour comparer, demandez à chaque établissement sa grille de tarifs sur trois lignes :
            droits de garde annuels, courtage selon le canal, et frais de transfert sortant. Un
            établissement qui affiche zéro frais de tenue de compte compense parfois sur le
            courtage ou sur les supports : comparez le coût total sur votre profil de versements,
            pas un tarif isolé.
          </p>

          <h2 id="exemple">Le transfert vaut-il son coût ? Un exemple chiffré</h2>
          <div className="note">
            <p>
              Les deux grilles ci-dessous sont fictives et ne correspondent à aucun établissement.
              Elles servent à illustrer la mécanique, pas à promettre une économie. Les frais de
              transfert retenus sont ceux du plafond de référence ; votre facture réelle peut être
              inférieure.
            </p>
          </div>
          <p>
            Reprenons le PEA illustratif de {euros(T.valeurPlan)} sur {T.nombreLignes} lignes, alimenté
            de {euros(T.versementMensuel)} par mois, soit {euros(achatsAnnuels)} d'achats par an. Une
            grille « haute » (proche des plafonds) est comparée à une grille « basse ».
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Coût annuel</th>
                  <th>Grille haute</th>
                  <th>Grille basse</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Droits de garde ({pct(haute.droitsGardePct)} ou {pct(basse.droitsGardePct)} de la valeur)</td>
                  <td>{eur(droitsGardeHaute)}</td>
                  <td>{eur(droitsGardeBasse)}</td>
                </tr>
                <tr>
                  <td>
                    Courtage ({pct(haute.courtagePct)} ou {pct(basse.courtagePct)} de {euros(achatsAnnuels)} d'achats)
                  </td>
                  <td>{eur(courtageHaute)}</td>
                  <td>{eur(courtageBasse)}</td>
                </tr>
                <tr>
                  <td>Total par an</td>
                  <td>{eur(coutHaute)}</td>
                  <td>{eur(coutBasse)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            L'écart est de {eur(economieAnnuelle)} par an. Les frais de transfert au plafond de
            référence représentent {T.nombreLignes} × {euros(plafondLigne)} ={" "}
            {euros(T.nombreLignes * plafondLigne)}, dans la limite de {euros(plafondTotal)} :{" "}
            {euros(fraisTransfert)} retenus. Ils sont donc amortis en environ{" "}
            {moisAmortissement} mois ({euros(fraisTransfert)} ÷ {eur(economieAnnuelle)} × 12) ; sur
            5 ans, l'écart net serait de {eur(economie5Ans)}.
          </p>
          <p>
            Limites du calcul : il suppose une valeur de plan et un rythme d'ordres constants, ignore
            les frais des supports (qui pèsent souvent davantage que les frais de l'enveloppe) et ne
            dit rien de la qualité du service. Sur un plan de petite taille, ou si votre grille
            actuelle est déjà basse, l'écart peut être trop mince pour justifier l'effort.
          </p>

          <h2 id="titres">Quels titres ne se transfèrent pas ?</h2>
          <p>
            Un PEA ne peut contenir que des titres éligibles, dont la liste est fixée par la loi
            (fiche F2385). Mais éligible au PEA ne veut pas dire conservable chez tous les
            établissements.
          </p>
          <ul>
            <li>
              <strong>Les fonds propres à votre établissement actuel.</strong> Un fonds distribué
              uniquement par votre banque n'est souvent pas accepté ailleurs. Il faut alors le
              vendre avant le transfert.
            </li>
            <li>
              <strong>Les titres non cotés ou au nominatif pur.</strong> Leur transfert suppose des
              formalités propres, parfois impossibles chez un intermédiaire en ligne.
            </li>
            <li>
              <strong>Les lignes que l'accueil ne couvre pas.</strong> Certains intermédiaires
              n'offrent pas toutes les places de cotation européennes.
            </li>
          </ul>
          <p>
            Bonne nouvelle : à l'intérieur du PEA, vendre un titre ne déclenche aucune imposition
            tant que l'argent reste dans le plan. Solder une ligne non transférable avant le
            transfert est donc fiscalement neutre ; l'espèce voyage avec le plan. Le risque est
            ailleurs : vendre un jour donné fige un prix de marché, et peut vous faire sortir du
            marché le temps du transfert. Un investissement en actions comporte un risque de perte
            en capital : un transfert ne le réduit pas.
          </p>

          <h2 id="pieges">Quels pièges éviter ?</h2>
          <ul>
            <li>
              <strong>Clôturer l'ancien PEA « pour le rouvrir ailleurs ».</strong> C'est l'erreur
              coûteuse : perte de l'ancienneté et, avant {delaiAns} ans, imposition des gains.
            </li>
            <li>
              <strong>Demander un retrait pendant le transfert.</strong> Un retrait avant {delaiAns}{" "}
              ans entraîne en principe la clôture du plan (fiche F22449).
            </li>
            <li>
              <strong>Ne pas déclarer le PEA existant.</strong> L'établissement d'accueil doit vous
              informer de l'interdiction de détenir deux PEA classiques et vous demander si vous en
              avez déjà un ; une réponse inexacte crée un risque de régularisation.
            </li>
            <li>
              <strong>Ignorer les frais des supports.</strong> Changer d'enveloppe sans changer de
              fonds laisse l'essentiel des coûts en place.
            </li>
            <li>
              <strong>Transférer en toute fin d'année sans vérifier les documents fiscaux.</strong>{" "}
              Demandez quel établissement édite l'imprimé fiscal unique de l'année, pour que votre
              déclaration reste cohérente.
            </li>
            <li>
              <strong>Oublier les versements programmés.</strong> Un versement automatique qui
              continue de partir pendant le gel du plan peut échouer ou créer un rejet.
            </li>
          </ul>

          <h2 id="tableau">Transférer ou rester : quand ça vaut le coup</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Situation</th>
                  <th>Piste de réflexion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Droits de garde et courtage élevés, plan de plusieurs dizaines de milliers d'euros, versements réguliers</td>
                  <td>Le transfert a de bonnes chances d'être amorti en quelques mois : à chiffrer sur vos propres montants.</td>
                </tr>
                <tr>
                  <td>Majorité des avoirs en fonds propres à votre banque</td>
                  <td>Le coût réel est celui des supports : un transfert sans arbitrage n'apporte presque rien.</td>
                </tr>
                <tr>
                  <td>Petit plan, grille déjà modérée</td>
                  <td>L'économie annuelle peut être inférieure aux frais de transfert : rester est défendable.</td>
                </tr>
                <tr>
                  <td>Besoin de vendre ou de retirer dans les semaines qui viennent</td>
                  <td>Reporter : le plan est gelé pendant l'opération.</td>
                </tr>
                <tr>
                  <td>Plan proche de {delaiAns} ans, envie d'un autre établissement</td>
                  <td>Transférer reste possible sans perdre l'ancienneté ; clôturer, non.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="checklist">Check-list avant de lancer le transfert</h2>
          <ol>
            <li>J'ai relevé la valeur du plan, mes versements totaux et la date d'ouverture.</li>
            <li>J'ai la grille tarifaire de l'établissement actuel et celle de l'accueil.</li>
            <li>J'ai vérifié que chacune de mes lignes est acceptée par l'accueil.</li>
            <li>J'ai demandé les frais de transfert exacts et les éventuels remboursements.</li>
            <li>J'ai prévenu l'accueil que je détiens déjà un PEA à transférer.</li>
            <li>J'ai suspendu mes versements programmés et reporté mes éventuels retraits.</li>
            <li>J'ai calculé la durée d'amortissement des frais sur mes propres chiffres.</li>
          </ol>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Peut-on transférer son PEA d'une banque vers un courtier en ligne ?</h3>
          <p>
            Oui, le sens du transfert n'a pas d'importance : banque vers courtier, courtier vers
            banque ou entre deux courtiers. La procédure est la même, et la date d'ouverture est
            conservée.
          </p>

          <h3>Transférer son PEA fait-il perdre l'antériorité de 5 ans ?</h3>
          <p>
            Non. Le délai court depuis la date d'ouverture, c'est-à-dire le premier versement
            (fiche F2385). Un transfert correctement réalisé ne la modifie pas. Seule la clôture
            suivie d'une réouverture la remet à zéro.
          </p>

          <h3>Combien coûte le transfert d'un PEA ?</h3>
          <p>
            Les frais sont plafonnés par la réglementation issue de la loi Pacte :{" "}
            {euros(plafondLigne)} par ligne de titres cotés ({euros(T.fraisTransfertParLigneNonCote)}{" "}
            par ligne non cotée) et {euros(plafondTotal)} au maximum. Selon
            les établissements, ces frais peuvent être remboursés par l'accueil sous conditions.
          </p>

          <h3>Combien de temps dure un transfert de PEA ?</h3>
          <p>
            Comptez en général {T.delaiIndicatifSemaines} semaines, parfois plus si certaines lignes
            demandent un traitement particulier. Ce n'est pas une durée garantie : demandez
            l'estimation à vos deux établissements.
          </p>

          <h3>Que devient le contenu de mon PEA pendant le transfert ?</h3>
          <p>
            Les titres restent détenus, mais le plan est en principe gelé : pas d'achat, pas de
            vente, pas de versement. Les cours continuent de varier, ce qui signifie que vous
            gardez le risque de marché sans pouvoir réagir.
          </p>

          <h3>Peut-on transférer un PEA-PME ?</h3>
          <p>
            Oui, par une demande distincte de celle du PEA classique. Les deux plans conservent
            chacun leur date d'ouverture.
          </p>

          <h3>Quelle différence entre transférer et clôturer son PEA ?</h3>
          <p>
            Le transfert déplace le plan intact, avec son ancienneté. La clôture met fin au plan :
            avant {delaiAns} ans, les gains sont imposés à {pct(FISCALITE.pfuIR)} en plus des
            prélèvements sociaux ; après {delaiAns} ans, l'impôt sur le revenu est nul, mais vous
            perdez l'enveloppe.
          </p>

          <h3>Peut-on transférer un PEA assurance vers un PEA bancaire ?</h3>
          <p>
            Les règles d'un PEA assurance (géré par un assureur) diffèrent de celles d'un PEA
            bancaire, et la faisabilité dépend des deux établissements. Renseignez-vous avant
            toute démarche et n'engagez aucune clôture tant que vous n'avez pas une confirmation
            écrite.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Transférer son PEA est une opération administrative, pas un arbitrage de placement :
            elle n'a d'intérêt que si elle réduit des frais qui pèsent chaque année, et elle ne
            doit jamais passer par une clôture. Dans le cas illustratif de ce guide, quelques
            mois suffisent à amortir le coût du transfert ; avec un petit plan ou une grille déjà
            basse, ce n'est pas garanti.
          </p>
          <p>
            Ne pas faire ce calcul a deux coûts opposés : rester des années sur une grille chère
            par inertie, ou payer un transfert pour une économie qui ne le justifie pas. Le calcul
            prend dix minutes avec vos relevés.
          </p>
          <p>
            Si le transfert est décidé, la question suivante est de savoir quoi mettre dans le PEA
            : voir <a href="/guide/etf-ou-fonds-actifs">ETF ou fonds actifs</a>. Et si vous
            hésitez sur le rôle du PEA dans votre retraite, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à poser ce
            cadre avant toute décision.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li>
              <a href="/guide/pea-banque-ou-courtier">PEA : banque ou courtier, comment choisir</a>
            </li>
            <li>
              <a href="/guide/pea-en-ligne-comment-choisir-pour-la-retraite">PEA en ligne : comment choisir pour la retraite</a>
            </li>
            <li>
              <a href="/guide/inconvenients-du-pea">Les inconvénients du PEA</a>
            </li>
            <li>
              <a href="/guide/sortir-du-pea-a-la-retraite-retrait-rente">Sortir du PEA à la retraite : retraits ou rente</a>
            </li>
            <li>
              <a href="/guide/investir-100000-euros-pour-la-retraite">Investir 100 000 € pour la retraite</a>
            </li>
            <li>
              <a href="/strategies/pea-retraite">Notre page stratégie : PEA et retraite</a>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seules les
              conditions communiquées par vos établissements font foi. Les plafonds de frais cités
              sont des maxima réglementaires et les délais des ordres de grandeur à confirmer ; les cas chiffrés sont des
              illustrations pédagogiques qui reposent sur des grilles fictives. Un PEA investi en
              actions présente un risque de perte en capital, et les performances passées ne
              préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Changer d'établissement se calcule. Bien placer son PEA se construit." />
    </>
  );
}
