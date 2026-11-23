import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  FISCALITE,
  IMMO,
  V3_REG_LOCATIFS,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const L = V3_REG_LOCATIFS;
const F = IMMO.scpiFiscalite;
const M = IMMO.lmnp;
const loyers = L.loyersBrutsAnnuelsExemple;
const [tmiBasse, tmiHaute] = L.tmiScenarios;
const psFoncier = FISCALITE.prelevementsSociaux.immobilier; // 17,2 %
const psMeuble = M.psMeuble; // 18,6 % — À VÉRIFIER (voir IMMO.lmnp)
const abattMicroFoncier = F.microFoncierAbattement; // 30 %
const plafondMicroFoncier = F.microFoncierPlafond; // 15 000 €
const abattMicroBic = M.microBicLongueDureeAbattement; // 50 %
const plafondMicroBic = M.microBicLongueDuree; // 77 700 €
const seuilLmp = M.seuilRecettesLmp; // 23 000 €

// Arrondi au centime pour éviter les artefacts de virgule flottante.
const r2 = (n) => Math.round(n * 100) / 100;
const part = (base, taux) => r2((base * taux) / 100);
const eur = (n) =>
  Number.isInteger(r2(n))
    ? euros(n)
    : new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(r2(n));

// ---- Exemple : mêmes loyers, deux régimes, deux TMI ----
const scenario = (abattement, ps, tmi) => {
  const base = r2(loyers - part(loyers, abattement));
  const impot = part(base, tmi);
  const prelevements = part(base, ps);
  const total = r2(impot + prelevements);
  return {
    base,
    impot,
    prelevements,
    total,
    pctLoyers: r2((total / loyers) * 100),
    net: r2(loyers - total),
  };
};
const foncierBas = scenario(abattMicroFoncier, psFoncier, tmiBasse);
const foncierHaut = scenario(abattMicroFoncier, psFoncier, tmiHaute);
const meubleBas = scenario(abattMicroBic, psMeuble, tmiBasse);
const meubleHaut = scenario(abattMicroBic, psMeuble, tmiHaute);
const ecartTmiFoncier = r2(foncierHaut.total - foncierBas.total);

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : revenus locatifs (location non meublée). Fiche F1991 : revenus fonciers, micro-foncier, régime réel",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1991",
  },
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : revenus d'une location meublée. Fiche F32744 : micro-BIC, régime réel, loueur meublé professionnel ou non professionnel",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F32744",
  },
  {
    label:
      "Service-Public.gouv.fr — Prélèvements sociaux (CSG, CRDS...) sur les revenus du patrimoine et de placements. Fiche F2329",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2329",
  },
  {
    label:
      "Service-Public.gouv.fr — Cumul emploi-retraite du salarié. Fiche F13243, vérifiée le 12 novembre 2026 : seuls les revenus d'activité sont concernés",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F13243",
  },
  {
    label:
      "impots.gouv.fr — Particulier : déclaration des revenus fonciers et des locations meublées",
    url: "https://www.impots.gouv.fr",
  },
  {
    label:
      "BOFiP-Impôts — Doctrine fiscale : revenus fonciers (BOI-RFPI) et bénéfices industriels et commerciaux (BOI-BIC)",
    url: "https://bofip.impots.gouv.fr",
  },
  {
    label:
      "L'Assurance retraite — cumul de la pension avec d'autres revenus",
    url: "https://www.lassuranceretraite.fr",
  },
];

export default function GuideRevenusLocatifsRetraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · Immobilier et retraite</span>
          <h1>Revenus locatifs et retraite : cumul, impôts et cotisations</h1>
          <p className="sub">
            Peut-on cumuler pension et loyers, que paie-t-on dessus, et que change la location sur
            l'impôt et les aides ? Un cas chiffré, du micro-foncier au meublé. Mis à jour le{" "}
            {L.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> les loyers se cumulent sans limite avec une pension de
              retraite : ils ne sont pas des revenus d'activité, donc aucun écrêtement ni condition
              de cumul ne s'applique. Pas non plus de cotisation retraite sur les loyers d'un
              particulier, mais ils sont soumis à l'impôt sur le revenu et aux prélèvements sociaux
              ({pct(psFoncier)} sur les revenus fonciers). Les loyers s'ajoutent à votre revenu
              imposable : ils peuvent faire monter la tranche marginale, et le revenu fiscal de
              référence dont dépendent plusieurs taux et aides. Le cas du loueur meublé
              professionnel est à part et se vérifie.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#cumul">Peut-on cumuler pension de retraite et loyers ?</a></li>
              <li><a href="#cotisations">Paie-t-on des cotisations retraite sur les loyers ?</a></li>
              <li><a href="#impots">Comment les loyers sont-ils imposés ?</a></li>
              <li><a href="#exemple">Exemple chiffré : mêmes loyers, quatre résultats</a></li>
              <li><a href="#tmi">Quel effet sur la tranche d'imposition et sur le revenu fiscal de référence ?</a></li>
              <li><a href="#aides">Et sur les aides sous condition de ressources ?</a></li>
              <li><a href="#lmp">Que change le statut de loueur meublé professionnel ?</a></li>
              <li><a href="#scpi">Et si les revenus viennent de parts de SCPI ?</a></li>
              <li><a href="#etapes">Comment déclarer ses loyers, étape par étape ?</a></li>
              <li><a href="#pieges">Quels pièges éviter ?</a></li>
              <li><a href="#quand">Quel régime choisir : quand ça vaut le coup, quand éviter</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Prenons Marc et Annie, 64 et 62 ans (cas composite, sans lien avec une situation réelle).
            Ils ont acheté un petit appartement qu'ils louent, et Marc vient de prendre sa retraite.
            Une collègue leur a dit que les loyers risquaient d'être « écrêtés », un voisin qu'ils
            allaient cotiser dessus : ils ne savent plus qui croire, ni combien il leur restera.
          </p>
          <p>
            Ce guide traite d'une seule question : ce que coûtent, en impôts et en cotisations, des
            loyers perçus pendant la retraite, et ce qu'ils changent à d'autres calculs. Il ne dit pas
            s'il faut investir dans l'immobilier (voir{" "}
            <a href="/guide/immobilier-a-la-retraite-revenus-transmission">immobilier à la retraite : revenus et transmission</a>),
            ni comment cumuler une pension avec un salaire (voir{" "}
            <a href="/guide/cumul-emploi-retraite-comment-ca-marche">le cumul emploi-retraite</a>).
          </p>

          <h2 id="cumul">Peut-on cumuler pension de retraite et loyers ?</h2>
          <p>
            Oui, sans aucune limite. Les règles de cumul emploi-retraite (plafond, écrêtement,
            délais) ne concernent que les revenus d'activité professionnelle. Pour un particulier qui
            loue un logement en gérant son propre patrimoine, les loyers sont des revenus du
            patrimoine : ils n'ont aucun effet sur le versement de la pension elle-même
            (service-public.gouv.fr, F13243, pour la définition du cumul emploi-retraite).
          </p>
          <p>
            La nuance vient du statut : un loueur meublé professionnel exerce une activité
            économique, ce qui peut changer le régime social (voir plus bas). Pour la location nue
            ou la location meublée non professionnelle, le principe reste simple : la pension est
            versée en entier, quel que soit le montant des loyers.
          </p>

          <h2 id="cotisations">Paie-t-on des cotisations retraite sur les loyers ?</h2>
          <p>
            Non, pour un particulier : les loyers fonciers et les revenus d'une location meublée non
            professionnelle ne donnent lieu à aucune cotisation de retraite, et n'ouvrent donc
            aucun droit à pension. Ils supportent en revanche des prélèvements sociaux, qui
            financent la protection sociale sans créer de droits à la retraite.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Type de revenu locatif</th>
                  <th>Prélèvements sociaux</th>
                  <th>Cotisations retraite</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Location nue (revenus fonciers)</td>
                  <td>{pct(psFoncier)}</td>
                  <td>Aucune</td>
                </tr>
                <tr>
                  <td>Location meublée non professionnelle (LMNP)</td>
                  <td>{pct(psMeuble)}, à vérifier selon la loi de financement de la sécurité sociale en vigueur</td>
                  <td>Aucune</td>
                </tr>
                <tr>
                  <td>Loueur meublé professionnel (LMP)</td>
                  <td>Régime social des indépendants possible, cotisations à vérifier</td>
                  <td>À vérifier auprès de l'administration</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les taux de prélèvements sociaux ont été modifiés en 2026 pour plusieurs revenus du
            capital : les revenus fonciers sont restés à {pct(psFoncier)} d'après les sources que
            nous avons retenues. Le taux applicable à la location meublée est plus difficile à
            fixer et reste à vérifier sur impots.gouv.fr avant de remplir votre déclaration.
          </p>

          <h2 id="impots">Comment les loyers sont-ils imposés ?</h2>
          <p>
            Les loyers s'ajoutent à vos autres revenus et sont imposés au barème progressif de
            l'impôt sur le revenu, après application du régime choisi : micro ou réel. Deux familles
            existent.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Régime</th>
                  <th>Plafond de loyers</th>
                  <th>Abattement forfaitaire</th>
                  <th>Pour qui ?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Micro-foncier (location nue)</td>
                  <td>{euros(plafondMicroFoncier)} par an</td>
                  <td>{pct(abattMicroFoncier)}</td>
                  <td>Loyers modestes et peu de charges</td>
                </tr>
                <tr>
                  <td>Régime réel foncier (location nue)</td>
                  <td>Aucun</td>
                  <td>Charges réelles déduites</td>
                  <td>Charges élevées, travaux, intérêts d'emprunt</td>
                </tr>
                <tr>
                  <td>Micro-BIC (meublé, longue durée)</td>
                  <td>{euros(plafondMicroBic)} de recettes</td>
                  <td>{pct(abattMicroBic)}</td>
                  <td>Meublé avec peu de charges réelles</td>
                </tr>
                <tr>
                  <td>Régime réel BIC (meublé)</td>
                  <td>Aucun</td>
                  <td>Charges et amortissements déduits</td>
                  <td>Meublé avec amortissement important</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Plafonds et abattements sont ceux en vigueur selon nos sources ; ils sont réajustés
            régulièrement, et le plafond du micro-BIC a connu plusieurs revalorisations ou
            réformes : vérifiez-les pour l'année de vos revenus. Pour choisir entre location nue et
            meublée, notre guide sur{" "}
            <a href="/guide/lmnp-ou-locatif-nu">LMNP ou location nue</a> détaille la comparaison, et
            celui sur <a href="/guide/lmnp-reforme-amortissement-plus-value">la réforme du LMNP</a>{" "}
            ses conséquences à la revente.
          </p>

          <h2 id="exemple">Exemple chiffré : mêmes loyers, quatre résultats</h2>
          <div className="note">
            <p>
              Hypothèses d'illustration, sans lien avec un cas réel : pensions de{" "}
              {euros(L.pensionAnnuelleExemple)} par an et loyers bruts de {euros(loyers)} par an.
              Aucune charge n'est déduite hors abattement forfaitaire. Les tranches de {pct(tmiBasse)}{" "}
              et {pct(tmiHaute)} servent de repères et sont à adapter à votre foyer. Ce n'est ni une
              prévision de rendement ni un conseil.
            </p>
          </div>
          <p>
            Le tableau applique le micro-foncier ({pct(abattMicroFoncier)} d'abattement, prélèvements
            sociaux à {pct(psFoncier)}) et le micro-BIC ({pct(abattMicroBic)} d'abattement, prélèvements
            sociaux à {pct(psMeuble)}, à vérifier) pour deux tranches marginales.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Sur {euros(loyers)} de loyers bruts</th>
                  <th>Micro-foncier, tranche {pct(tmiBasse)}</th>
                  <th>Micro-foncier, tranche {pct(tmiHaute)}</th>
                  <th>Micro-BIC, tranche {pct(tmiBasse)}</th>
                  <th>Micro-BIC, tranche {pct(tmiHaute)}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Revenu imposable après abattement</td>
                  <td>{eur(foncierBas.base)}</td>
                  <td>{eur(foncierHaut.base)}</td>
                  <td>{eur(meubleBas.base)}</td>
                  <td>{eur(meubleHaut.base)}</td>
                </tr>
                <tr>
                  <td>Impôt sur le revenu</td>
                  <td>{eur(foncierBas.impot)}</td>
                  <td>{eur(foncierHaut.impot)}</td>
                  <td>{eur(meubleBas.impot)}</td>
                  <td>{eur(meubleHaut.impot)}</td>
                </tr>
                <tr>
                  <td>Prélèvements sociaux</td>
                  <td>{eur(foncierBas.prelevements)}</td>
                  <td>{eur(foncierHaut.prelevements)}</td>
                  <td>{eur(meubleBas.prelevements)}</td>
                  <td>{eur(meubleHaut.prelevements)}</td>
                </tr>
                <tr>
                  <td>Total impôt et prélèvements</td>
                  <td>{eur(foncierBas.total)}</td>
                  <td>{eur(foncierHaut.total)}</td>
                  <td>{eur(meubleBas.total)}</td>
                  <td>{eur(meubleHaut.total)}</td>
                </tr>
                <tr>
                  <td>En % des loyers bruts</td>
                  <td>{pct(foncierBas.pctLoyers)}</td>
                  <td>{pct(foncierHaut.pctLoyers)}</td>
                  <td>{pct(meubleBas.pctLoyers)}</td>
                  <td>{pct(meubleHaut.pctLoyers)}</td>
                </tr>
                <tr>
                  <td>Reste avant charges réelles</td>
                  <td>{eur(foncierBas.net)}</td>
                  <td>{eur(foncierHaut.net)}</td>
                  <td>{eur(meubleBas.net)}</td>
                  <td>{eur(meubleHaut.net)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Deux lectures. D'abord, la tranche marginale pèse davantage que le régime : dans le
            micro-foncier, passer de {pct(tmiBasse)} à {pct(tmiHaute)} ajoute {eur(ecartTmiFoncier)}{" "}
            de prélèvements sur les mêmes loyers. Ensuite, le micro-BIC allège le prélèvement
            parce que l'abattement est plus élevé, mais il ne dit rien de la rentabilité réelle :
            charges, vacance locative, travaux, taxe foncière et, à la revente, la plus-value
            viennent s'y ajouter.
          </p>

          <h2 id="tmi">Quel effet sur la tranche d'imposition et sur le revenu fiscal de référence ?</h2>
          <p>
            Les loyers imposables s'ajoutent à vos pensions : la tranche marginale applicable à
            l'ensemble du revenu peut monter, et le revenu fiscal de référence (RFR) augmente du
            montant imposable des loyers. Dans l'exemple, le RFR monte de {eur(foncierBas.base)} en
            micro-foncier et de {eur(meubleBas.base)} en micro-BIC, avant toute autre variation.
          </p>
          <p>
            Le RFR ne sert pas qu'à l'impôt : plusieurs taux, comme la CSG sur les pensions de
            retraite, et certains seuils d'exonération ou d'aide en dépendent. Un RFR plus élevé peut
            donc relever le taux de CSG appliqué sur votre pension, sans que la pension elle-même ait
            changé. Les seuils exacts sont publiés chaque année : consultez votre avis d'impôt et
            impots.gouv.fr. L'effet se mesure par simulation sur votre situation, pas par
            une règle générale ; voir aussi{" "}
            <a href="/guide/estimer-sa-pension-retraite-taux-de-remplacement">notre guide sur l'estimation de la pension</a>.
          </p>

          <h2 id="aides">Et sur les aides sous condition de ressources ?</h2>
          <p>
            Les loyers sont comptés dans les ressources prises en compte pour plusieurs aides
            soumises à condition de ressources, notamment certaines aides de solidarité ou la
            complémentaire santé solidaire, selon des règles propres à chaque dispositif. Les
            retraités aux revenus modestes sont les premiers concernés : des loyers modestes peuvent
            suffire à franchir un seuil. Renseignez-vous auprès de l'organisme qui verse l'aide
            avant d'acquérir un bien destiné à la location.
          </p>

          <h2 id="lmp">Que change le statut de loueur meublé professionnel ?</h2>
          <p>
            Un loueur meublé est qualifié de professionnel (LMP) lorsque ses recettes annuelles
            dépassent {euros(seuilLmp)} et excèdent les autres revenus d'activité du foyer, et, en
            principe, qu'il est inscrit au registre du commerce comme loueur professionnel. Ce statut
            peut entraîner l'affiliation à la sécurité sociale des indépendants et le paiement de
            cotisations sociales sur les bénéfices, au lieu des seuls prélèvements sociaux du
            patrimoine. L'articulation avec le statut de retraité, notamment le lien avec le cumul
            emploi-retraite, est complexe.
          </p>
          <div className="note">
            <p>
              À vérifier : les conditions exactes du LMP et le régime de cotisations applicable
              à un retraité ne sont pas détaillés ici. Avant d'envisager une activité de loueur
              meublé professionnel pendant la retraite, demandez confirmation à l'administration
              fiscale et à votre caisse de retraite, et consultez un professionnel.
            </p>
          </div>
          <p>
            Pour les risques propres au meublé, voir{" "}
            <a href="/guide/lmnp-risques">les risques du LMNP</a>.
          </p>

          <h2 id="scpi">Et si les revenus viennent de parts de SCPI ?</h2>
          <p>
            Les parts de SCPI détenues en direct produisent des revenus fonciers : ils sont imposés
            comme des loyers, avec les mêmes prélèvements sociaux ({pct(psFoncier)}), et sans
            cotisation retraite. Une partie des revenus peut en outre provenir de produits de
            placement de la trésorerie, imposés différemment. Détenues dans un contrat d'assurance-vie
            ou un PER, les parts relèvent en revanche de la fiscalité de l'enveloppe. Sur ce point,
            voir <a href="/guide/scpi-fiscalite-revenus-plus-values">la fiscalité des revenus de SCPI</a>{" "}
            et <a href="/guide/scpi-assurance-vie-ou-per">SCPI, assurance-vie ou PER</a>. Les parts
            de SCPI comportent un risque de perte en capital, et les revenus distribués ne sont pas
            garantis.
          </p>

          <h2 id="etapes">Comment déclarer ses loyers, étape par étape ?</h2>
          <ol>
            <li>
              <strong>Totaliser les loyers encaissés dans l'année</strong>, par bien, charges
              récupérées comprises.
            </li>
            <li>
              <strong>Vérifier l'éligibilité au micro</strong> : plafond de loyers ({euros(plafondMicroFoncier)}{" "}
              en micro-foncier selon nos sources) et nature de la location.
            </li>
            <li>
              <strong>Comparer micro et réel</strong> si les charges (travaux, intérêts, taxe
              foncière) dépassent l'abattement.
            </li>
            <li>
              <strong>Reporter les montants</strong> dans les rubriques correspondantes de la
              déclaration de revenus (revenus fonciers ou revenus des locations meublées).
            </li>
            <li>
              <strong>Contrôler l'avis d'impôt</strong> : prélèvements sociaux, RFR, taux de CSG de
              la pension.
            </li>
            <li>
              <strong>Conserver les justificatifs</strong> (baux, quittances, factures) pendant le
              délai de contrôle.
            </li>
          </ol>

          <h2 id="pieges">Quels pièges éviter ?</h2>
          <ul>
            <li>
              <strong>Croire qu'il y a un plafond de cumul.</strong> Il n'existe pas pour les
              loyers de particuliers : le plafond du cumul emploi-retraite concerne l'activité.
            </li>
            <li>
              <strong>Oublier les prélèvements sociaux</strong>, dus même si l'impôt sur le revenu
              est nul.
            </li>
            <li>
              <strong>Ignorer l'effet sur le RFR</strong> et donc sur la CSG de la pension et les
              seuils d'aide.
            </li>
            <li>
              <strong>Choisir le micro par habitude</strong> alors que des charges réelles
              importantes pourraient justifier le réel.
            </li>
            <li>
              <strong>Basculer en LMP sans le savoir</strong> en dépassant les seuils de recettes.
            </li>
            <li>
              <strong>Compter les loyers comme une retraite garantie</strong> : vacance, impayés et
              travaux sont des risques réels.
            </li>
          </ul>

          <h2 id="quand">Quel régime choisir : quand ça vaut le coup, quand éviter</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Ça vaut le coup quand…</th>
                  <th>À éviter quand…</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Micro-foncier</td>
                  <td>Loyers sous le plafond et peu de charges réelles</td>
                  <td>Travaux importants ou intérêts d'emprunt supérieurs à l'abattement</td>
                </tr>
                <tr>
                  <td>Régime réel</td>
                  <td>Charges déductibles supérieures à l'abattement forfaitaire</td>
                  <td>Peu de charges et peu de temps pour la comptabilité</td>
                </tr>
                <tr>
                  <td>Meublé (micro-BIC)</td>
                  <td>Loyers sous le plafond et abattement plus favorable que les charges réelles</td>
                  <td>Statut LMP probable, ou aides sociales proches d'un seuil</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Peut-on cumuler retraite et revenu locatif ?</h3>
          <p>
            Oui, sans limite : les loyers d'un particulier ne sont pas des revenus d'activité, donc
            ne déclenchent ni plafond ni écrêtement de la pension.
          </p>

          <h3>Paie-t-on des cotisations retraite sur les revenus locatifs ?</h3>
          <p>
            Non pour un particulier : les loyers supportent des prélèvements sociaux, mais pas de
            cotisation retraite. Le cas du loueur meublé professionnel est à vérifier.
          </p>

          <h3>Les loyers font-ils baisser la pension de retraite ?</h3>
          <p>
            Non, la pension est versée en entier. Les loyers peuvent en revanche augmenter l'impôt
            et le revenu fiscal de référence, donc le taux de CSG de la pension et certains seuils
            d'aide.
          </p>

          <h3>Les revenus locatifs sont-ils soumis aux prélèvements sociaux de {pct(psFoncier)} ?</h3>
          <p>
            Les revenus fonciers, oui d'après nos sources de novembre 2026. Pour la location meublée,
            le taux est à vérifier ; l'exemple de ce guide retient {pct(psMeuble)}.
          </p>

          <h3>Faut-il déclarer ses loyers à la retraite ?</h3>
          <p>
            Oui, comme avant la retraite : les loyers se déclarent chaque année avec les autres
            revenus, en micro ou au réel selon les cas.
          </p>

          <h3>Les revenus locatifs sont-ils pris en compte pour les aides ?</h3>
          <p>
            Oui, dans la plupart des dispositifs soumis à condition de ressources. Les règles
            varient : renseignez-vous auprès de l'organisme concerné avant d'acheter pour louer.
          </p>

          <h3>Micro-foncier ou régime réel à la retraite ?</h3>
          <p>
            Le micro est simple, mais le réel est plus avantageux si les charges dépassent
            l'abattement. Le calcul se fait année par année ; voir{" "}
            <a href="/guide/cinq-erreurs-investissement-locatif-retraite">cinq erreurs à éviter en investissement locatif</a>.
          </p>

          <h3>Que devient le statut en cas de loueur meublé professionnel à la retraite ?</h3>
          <p>
            Il peut entraîner des cotisations sociales spécifiques et des interactions avec le
            statut de retraité. Ce point est à vérifier auprès de l'administration et d'un
            professionnel.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Les loyers se cumulent librement avec la pension et ne génèrent pas de cotisation
            retraite : la vraie question n'est donc pas « combien puis-je cumuler ? » mais « combien
            me restera-t-il après impôt, prélèvements sociaux et effet sur mon RFR ? ». Dans
            l'exemple, la fiscalité absorbe de {pct(meubleBas.pctLoyers)} à {pct(foncierHaut.pctLoyers)}{" "}
            des loyers bruts, selon le régime et la tranche, avant toute charge réelle.
          </p>
          <p>
            La décision utile se joue sur trois points : le régime (micro ou réel), la tranche
            d'imposition du foyer à la retraite et le statut (nue, meublée, professionnelle). Pour
            replacer les loyers dans un revenu de retraite complet, voir{" "}
            <a href="/guide/immobilier-et-retraite-guide-complet">notre guide complet immobilier et retraite</a>{" "}
            et <a href="/strategies/immobilier-retraite">notre page sur l'immobilier pour la
            retraite</a>.
          </p>
          <p>
            Pour situer vos loyers par rapport à votre pension et à votre épargne, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> permet de poser ce
            cadre avant toute décision d'achat.
          </p>

          <h2 id="lire-aussi">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/immobilier-a-la-retraite-revenus-transmission">Immobilier à la retraite : revenus et transmission</a></li>
            <li><a href="/guide/cumul-emploi-retraite-comment-ca-marche">Cumul emploi-retraite : comment ça marche</a></li>
            <li><a href="/guide/lmnp-ou-locatif-nu">LMNP ou location nue ?</a></li>
            <li><a href="/guide/scpi-ou-lmnp-pour-completer-sa-retraite">SCPI ou LMNP pour compléter sa retraite</a></li>
            <li><a href="/guide/comment-choisir-une-scpi-checklist">Comment choisir une SCPI : check-list</a></li>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : votre
              situation fiscale et sociale relève de l'administration et de vos conseils. Les taux,
              plafonds et abattements cités sont ceux retenus en novembre 2026 et peuvent évoluer ;
              plusieurs points (taux de prélèvements sociaux du meublé, statut LMP, cotisations)
              sont signalés comme à vérifier. Le cas chiffré est une illustration pédagogique. Un
              investissement immobilier ou en SCPI présente un risque de perte en capital, une
              liquidité limitée et des revenus non garantis ; les performances passées ne préjugent
              pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Les loyers se cumulent avec la pension. Ce qu'il en reste après impôt se calcule." />
    </>
  );
}
