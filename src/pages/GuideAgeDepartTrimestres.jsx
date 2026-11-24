import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  AGE_DEPART_TRIMESTRES_EXEMPLE_NOV2026,
  AGIRC_ARRCO,
  AGIRC_ARRCO_EXEMPLES,
  ESTIMATION_PENSION_NOV2026,
  REGIME_GENERAL,
  RETRAITE_PROGRESSIVE_CUMUL,
} from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const R = RETRAITE_PROGRESSIVE_CUMUL;
const G = REGIME_GENERAL;
const P = ESTIMATION_PENSION_NOV2026;
const X = AGE_DEPART_TRIMESTRES_EXEMPLE_NOV2026;
const A = AGIRC_ARRCO;

const dureeRequise = P.dureeReferenceTrimestres;
const dureeAnnees = AGIRC_ARRCO_EXEMPLES.dureeCarriereAnnees;

// ---- Exemple : décompte de trimestres d'une carrière type ----
const trimestresCotises = X.anneesCotisees * P.trimestresMaxParAn;
const trimestresMajoration = X.nombreEnfants * (P.majorationEnfantTrimestres.maternite + P.majorationEnfantTrimestres.education);
const totalTrimestres = trimestresCotises + X.trimestresAssimiles + trimestresMajoration;
const trimestresManquants = Math.max(dureeRequise - totalTrimestres, 0);
const trimestresDecoteRetenus = Math.min(trimestresManquants, G.decotePlafondTrimestres);
const decoteTotale = trimestresDecoteRetenus * G.decoteParTrimestre;
const nb = (n, d = 2) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });

const sources = [
  {
    label:
      "Service-Public.gouv.fr — À partir de quel âge un salarié peut-il partir en retraite ?, fiche F14043, vérifiée le 14 août 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14043",
  },
  {
    label: "L'Assurance retraite — Trimestres : validation, périodes assimilées et majorations",
    url: "https://www.lassuranceretraite.fr",
  },
  {
    label: "Info-retraite.fr — Relevé de carrière et estimation indicative globale",
    url: "https://www.info-retraite.fr",
  },
  {
    label:
      "Service-Public.gouv.fr — Retraite complémentaire du salarié du secteur privé (Agirc-Arrco), fiche F15396, vérifiée le 1er novembre 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F15396",
  },
  {
    label: "Agirc-Arrco — Âge de départ et coefficients de minoration de la retraite complémentaire",
    url: "https://www.agirc-arrco.fr",
  },
];

export default function GuideAgeDepartTrimestres() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Repères · âge et durée d'assurance</span>
          <h1>Âge de départ à la retraite, trimestres et durée d'assurance : les repères</h1>
          <p className="sub">
            À quel âge partir, combien de trimestres il faut, et ce qui compte vraiment dans le
            décompte. Mis à jour le {R.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> deux repères commandent la date de départ. L'âge
              légal, qui dépend de la génération (de 62 ans et 9 mois à 64 ans pour les
              générations 1964 et suivantes), et la durée d'assurance requise (
              {dureeRequise} trimestres, soit {dureeAnnees} ans, pour les générations nées à partir
              de 1966). Partir à l'âge légal sans la durée requise entraîne une décote, qui
              disparaît automatiquement à {G.ageTauxPleinAutomatique} ans. Les trimestres ne
              viennent pas uniquement du travail : certaines périodes et les enfants comptent
              aussi.
            </p>
          </div>

          <p>
            Prenons une situation illustrative et composite, sans lien avec un cas réel : Marc,
            né en 1968, a commencé à travailler à la fin de ses études, a connu une période de
            chômage indemnisé et a un enfant. Il lit tantôt « 64 ans », tantôt « 172 trimestres »,
            tantôt « 67 ans », et ne sait pas lequel de ces chiffres s'applique à lui, ni dans
            quel ordre.
          </p>
          <p>
            Cet article remet ces notions à plat : l'âge légal selon la génération, la durée
            requise, l'âge du taux plein automatique, les différentes catégories de trimestres.
            Il ne détaille ni le calcul de la décote et de la surcote, ni le rachat de
            trimestres, ni la vérification du relevé : ces sujets ont leurs propres guides, vers
            lesquels il renvoie.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#age-legal">Quel est l'âge légal de départ selon votre génération ?</a></li>
              <li><a href="#duree">Combien de trimestres faut-il pour le taux plein ?</a></li>
              <li><a href="#age-taux-plein">À quel âge le taux plein est-il automatique ?</a></li>
              <li><a href="#trimestres">Quels trimestres comptent : cotisés, assimilés, majorations ?</a></li>
              <li><a href="#exemple">Exemple : décompter les trimestres d'une carrière type</a></li>
              <li><a href="#carriere-longue">Et la carrière longue ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#aller-plus-loin">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="age-legal">Quel est l'âge légal de départ selon votre génération ?</h2>
          <p>
            L'âge légal est l'âge à partir duquel on peut demander sa retraite, hors dispositifs
            de départ anticipé. Il augmente progressivement selon l'année de naissance. Le tableau
            reprend les repères de la fiche F14043 de Service-Public (vérifiée le 14 août 2026) :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Génération</th>
                  <th>Âge légal</th>
                </tr>
              </thead>
              <tbody>
                {R.ageLegalParGeneration.map((l) => (
                  <tr key={l.generation}>
                    <td>{l.generation}</td>
                    <td>{l.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Ces âges concernent les salariés du privé affiliés au régime général. Les
            fonctionnaires, certains régimes spéciaux et les situations de carrière longue,
            d'invalidité ou d'incapacité obéissent à d'autres règles : notre guide sur{" "}
            <a href="/guide/retraite-fonctionnaires-completer">la retraite des fonctionnaires</a>{" "}
            en situe quelques-unes.
          </p>

          <h2 id="duree">Combien de trimestres faut-il pour le taux plein ?</h2>
          <p>
            La durée d'assurance requise pour obtenir le taux plein sans décote est de{" "}
            {dureeRequise} trimestres, soit {dureeAnnees} ans, pour les générations nées à partir
            de 1966. Pour les générations plus anciennes, elle augmente par paliers selon l'année
            de naissance ; la valeur applicable à votre cas figure sur votre relevé de carrière
            et sur le simulateur officiel.
          </p>
          <p>
            Cette durée est une condition pour éviter la décote, pas pour partir : l'âge légal
            ouvre le droit de demander sa retraite. Avec moins de trimestres, la pension est
            proratisée et peut être minorée. Le mécanisme est détaillé dans notre guide{" "}
            <a href="/guide/surcote-decote-retraite">surcote et décote</a>, qui chiffre les
            effets de {G.decoteParTrimestre.toLocaleString("fr-FR")} % par trimestre manquant
            (dans la limite de {G.decotePlafondTrimestres} trimestres) ou de surcote au-delà.
          </p>

          <h2 id="age-taux-plein">À quel âge le taux plein est-il automatique ?</h2>
          <p>
            Quelle que soit la durée d'assurance, la décote du régime général disparaît à{" "}
            {G.ageTauxPleinAutomatique} ans, âge du taux plein automatique. De même, la retraite
            complémentaire Agirc-Arrco est versée sans minoration, quelle que soit la durée,
            à partir de {A.ageSansMinoration} ans. Ces deux repères sont des plafonds d'attente :
            nul n'a à patienter au-delà pour obtenir le taux plein.
          </p>
          <div className="note">
            <p>
              Attention à ne pas confondre les trois âges : l'âge légal (ouverture du droit),
              l'âge auquel on a la durée requise (condition du taux plein) et l'âge du taux plein
              automatique. Une personne née en 1968 peut, par exemple, demander sa retraite à 63
              ans et 9 mois, mais l'obtenir à taux plein sans condition de durée seulement à{" "}
              {G.ageTauxPleinAutomatique} ans.
            </p>
          </div>

          <h2 id="trimestres">Quels trimestres comptent : cotisés, assimilés, majorations ?</h2>
          <p>
            Le relevé de carrière distingue plusieurs catégories de trimestres. Toutes ne
            comptent pas de la même façon pour tous les dispositifs.
          </p>
          <ul>
            <li>
              <strong>Les trimestres cotisés</strong> sont validés par vos salaires : un trimestre
              s'obtient avec une rémunération équivalente à {P.heuresSmicParTrimestre} heures de
              Smic, dans la limite de {P.trimestresMaxParAn} trimestres par an. Une année très
              partielle peut donc ne pas valider quatre trimestres.
            </li>
            <li>
              <strong>Les trimestres assimilés</strong> correspondent à des périodes non
              cotisées mais reconnues : chômage indemnisé, maladie, maternité, invalidité,
              service national, notamment. Ils comptent dans la durée d'assurance, mais pas
              toujours dans la durée « cotisée » exigée pour une carrière longue.
            </li>
            <li>
              <strong>Les majorations de durée d'assurance</strong> pour enfants : jusqu'à{" "}
              {P.majorationEnfantTrimestres.maternite} trimestres au titre de la maternité et{" "}
              {P.majorationEnfantTrimestres.education} au titre de l'éducation par enfant, selon
              la situation et la répartition entre les parents. Les règles varient selon les
              régimes.
            </li>
            <li>
              <strong>Les trimestres rachetés ou validés ailleurs</strong> (versement pour la
              retraite, autres régimes, étranger) s'ajoutent sous conditions.
            </li>
          </ul>
          <p>
            Les années à l'étranger ou dans plusieurs régimes ne s'additionnent pas toujours de
            façon intuitive. La seule référence fiable est le relevé de carrière, que notre guide{" "}
            <a href="/guide/verifier-releve-de-carriere-retraite">
              vérifier son relevé de carrière
            </a>{" "}
            explique à lire et à corriger.
          </p>

          <h2 id="exemple">Exemple : décompter les trimestres d'une carrière type</h2>
          <div className="note">
            <p>
              Exemple purement illustratif, qui ne correspond à aucun cas réel. Hypothèses :{" "}
              {X.anneesCotisees} années d'activité à {P.trimestresMaxParAn} trimestres,{" "}
              {X.trimestresAssimiles} trimestres assimilés, {X.nombreEnfants} enfant avec
              l'ensemble des majorations ci-dessus. Les majorations dépendent en pratique de la
              situation familiale ; elles sont ici supposées acquises en totalité.
            </p>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Catégorie</th>
                  <th>Trimestres</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cotisés ({X.anneesCotisees} × {P.trimestresMaxParAn})</td>
                  <td>{trimestresCotises}</td>
                </tr>
                <tr>
                  <td>Assimilés</td>
                  <td>{X.trimestresAssimiles}</td>
                </tr>
                <tr>
                  <td>Majorations enfant</td>
                  <td>{trimestresMajoration}</td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>{totalTrimestres}</strong></td>
                </tr>
                <tr>
                  <td>Durée requise</td>
                  <td>{dureeRequise}</td>
                </tr>
                <tr>
                  <td>Trimestres manquants</td>
                  <td>{trimestresManquants}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {trimestresManquants > 0 ? (
            <p>
              Il manquerait {trimestresManquants} trimestre{trimestresManquants > 1 ? "s" : ""} :
              un départ à l'âge légal s'accompagnerait d'une décote d'environ{" "}
              {trimestresDecoteRetenus} × {nb(G.decoteParTrimestre)} % ={" "}
              {nb(decoteTotale)} points de taux, sur une base de calcul qui reste à confirmer par
              la caisse. Les options pour réduire cet écart (travailler quelques trimestres de
              plus, rachat, départ à {G.ageTauxPleinAutomatique} ans) sont comparées dans nos
              guides sur{" "}
              <a href="/guide/surcote-decote-retraite">la décote</a> et sur{" "}
              <a href="/guide/combien-coute-rachat-trimestres-retraite">le rachat de trimestres</a>.
            </p>
          ) : (
            <p>
              La durée requise est atteinte dans cet exemple : aucune décote ne s'appliquerait à
              l'âge légal, et les trimestres supplémentaires ouvriraient droit à une surcote selon
              les conditions détaillées dans notre guide sur{" "}
              <a href="/guide/surcote-decote-retraite">la surcote et la décote</a>.
            </p>
          )}

          <h2 id="carriere-longue">Et la carrière longue ?</h2>
          <p>
            Le dispositif « carrière longue » permet, sous conditions, de partir avant l'âge
            légal lorsqu'on a commencé à travailler très jeune et validé une durée suffisante de
            trimestres cotisés (et non simplement assimilés). Les seuils d'âge de début
            d'activité, de départ et de durée varient selon l'année de naissance et sont fixés
            par la réglementation ; nous ne les reproduisons pas ici faute de pouvoir garantir
            leur actualité. La fiche F14043 de Service-Public et l'estimation de votre caisse
            indiquent si vous êtes concerné. Dans tous les cas, la demande de carrière longue se
            fait avant la liquidation, et l'accord de la caisse est nécessaire.
          </p>
          <p>
            Pour poursuivre une activité en fin de carrière sans tout arrêter, voir aussi notre
            comparaison de{" "}
            <a href="/guide/retraite-progressive-ou-cumul-emploi-retraite">
              la retraite progressive et du cumul emploi-retraite
            </a>
            .
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>À quel âge peut-on partir à la retraite si l'on est né en 1969 ?</h3>
          <p>
            L'âge légal est de 64 ans pour la génération 1969 et les suivantes, d'après la fiche
            F14043 de Service-Public. Des dispositifs particuliers (carrière longue,
            invalidité, incapacité) peuvent modifier cette date.
          </p>
          <h3>Combien de trimestres faut-il pour partir à taux plein ?</h3>
          <p>
            {dureeRequise} trimestres pour les générations nées à partir de 1966. Sans cette
            durée, le taux plein est obtenu automatiquement à {G.ageTauxPleinAutomatique} ans.
          </p>
          <h3>Un trimestre de chômage compte-t-il pour la retraite ?</h3>
          <p>
            Les périodes de chômage indemnisé sont en général assimilées et comptent dans la
            durée d'assurance. Elles ne sont pas toujours prises en compte pour la durée cotisée
            exigée en carrière longue. Vérifiez le détail sur votre relevé.
          </p>
          <h3>Combien de trimestres valide-t-on par an ?</h3>
          <p>
            Au plus {P.trimestresMaxParAn} : chaque trimestre exige une rémunération équivalente
            à {P.heuresSmicParTrimestre} heures de Smic. Un salaire faible ou une année
            incomplète peut valider moins de {P.trimestresMaxParAn} trimestres.
          </p>
          <h3>Les enfants donnent-ils des trimestres ?</h3>
          <p>
            Oui, sous conditions : des majorations de durée d'assurance sont prévues au titre de
            la maternité et de l'éducation, jusqu'à {P.majorationEnfantTrimestres.maternite} puis{" "}
            {P.majorationEnfantTrimestres.education} trimestres par enfant. Leur attribution
            dépend de la situation et de la répartition entre les parents ; elle se lit sur le
            relevé de carrière.
          </p>
          <h3>Peut-on partir à l'âge légal sans avoir tous ses trimestres ?</h3>
          <p>
            Oui, mais avec une décote sur la retraite de base, et parfois une minoration de la
            complémentaire avant {A.ageSansMinoration} ans. L'effet exact se chiffre cas par
            cas avec l'estimation de la caisse.
          </p>
          <h3>Où connaître son nombre de trimestres ?</h3>
          <p>
            Sur info-retraite.fr, dans le relevé de carrière : trimestres cotisés, assimilés et
            majorations y sont distingués. En cas d'erreur, la rectification passe par la caisse
            concernée.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Trois repères, trois fonctions : l'âge légal ouvre le droit, la durée requise évite la
            décote, l'âge du taux plein automatique la supprime. Les trimestres se décomptent par
            catégories, et ce décompte ne s'improvise pas : c'est le relevé de carrière qui fait
            foi.
          </p>
          <p>
            Avant d'arbitrer entre travailler plus longtemps, racheter des trimestres ou
            épargner davantage, une étape s'impose : connaître sa situation exacte. Notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> et le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> aident à
            replacer ces repères dans une vue d'ensemble. Les placements comportent un risque de
            perte en capital, et les performances passées ne préjugent pas des performances
            futures.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/estimer-sa-pension-retraite-taux-de-remplacement">Estimer sa pension et son taux de remplacement</a></li>
            <li><a href="/guide/surcote-decote-retraite">Surcote et décote : le calcul détaillé</a></li>
            <li><a href="/guide/combien-coute-rachat-trimestres-retraite">Combien coûte le rachat de trimestres ?</a></li>
            <li><a href="/guide/verifier-releve-de-carriere-retraite">Vérifier son relevé de carrière</a></li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en novembre 2026 :</p>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seules vos
              caisses de retraite peuvent confirmer votre âge de départ, vos trimestres et vos
              droits. Les règles citées sont celles publiées en novembre 2026 ; l'exemple chiffré
              est une illustration pédagogique établie sur des hypothèses affichées, qui ne
              préjuge ni de votre situation ni des règles futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Connaître son âge de départ et ses trimestres, c'est le point de départ de tout plan." />
    </>
  );
}
