import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { DECUMULATION, RENTE_VIAGERE, euros, pct } from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const R = RENTE_VIAGERE;
const T = DECUMULATION.tauxConversionRente65;
const CAPITAL = R.capitalIllustratif;
const AGE = R.ageConversionIllustratif;
const TMI = R.tauxMarginalIllustratif;
const PS = R.prelevementsSociauxRvto;

const eurosPrecis = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

// ---- Fraction imposable selon l'âge au premier versement ----
const tranche = (age) =>
  R.fractionImposableRvto.find((t) => age >= t.ageMin && age <= t.ageMax);
const partImposable = (age) => tranche(age).partImposable;

// ---- Calcul de l'exemple ----
const renteBrute = (CAPITAL * T.defaut) / 100;
const calcul = (rente, age) => {
  const part = partImposable(age);
  const imposable = (rente * part) / 100;
  const impot = (imposable * TMI) / 100;
  const ps = (imposable * PS) / 100;
  return { part, imposable, impot, ps, net: rente - impot - ps };
};
const ex = calcul(renteBrute, AGE);

// Âges illustratifs du tableau : un par tranche du barème.
const agesTableau = [45, 55, AGE, 75];

const sources = [
  {
    label: "Légifrance — Code général des impôts, article 158 (rentes viagères à titre onéreux, fraction imposable)",
    url: "https://www.legifrance.gouv.fr/",
  },
  {
    label: "BOFiP-Impôts — Pensions et rentes viagères, BOI-RSA-PENS-30-20 (rubrique officielle)",
    url: "https://bofip.impots.gouv.fr/",
  },
  {
    label: "Service-Public.gouv.fr — « Impôt sur le revenu : déclarer les rentes viagères » (rubrique Impôts, mise à jour d'avril 2026)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits",
  },
  {
    label: "Service-Public.gouv.fr — Prélèvements sociaux sur les revenus du patrimoine et de placement, fiche F2329 (taux 2026)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2329",
  },
  {
    label: "Impots.gouv.fr — Particuliers, déclaration de revenus (pensions et rentes)",
    url: "https://www.impots.gouv.fr/particulier",
  },
  {
    label: "AMF — Épargnants : assurance-vie et produits d'épargne",
    url: "https://www.amf-france.org/fr/espace-epargnants",
  },
];

export default function GuideFiscaliteRenteViagere() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Décumulation · fiscalité de la rente</span>
          <h1>Fiscalité de la rente viagère à titre onéreux : la fraction imposable</h1>
          <p className="sub">
            Seule une partie de la rente est imposée, et cette part est fixée une fois pour toutes
            selon l'âge au premier versement. Mis à jour en {R.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> une rente viagère à titre onéreux (RVTO), par exemple
              issue de la conversion d'un capital d'assurance-vie, n'est imposable à l'impôt sur le
              revenu que sur une fraction : {R.fractionImposableRvto[0].partImposable} % avant 50
              ans, {R.fractionImposableRvto[1].partImposable} % de 50 à 59 ans,{" "}
              {R.fractionImposableRvto[2].partImposable} % de 60 à 69 ans et{" "}
              {R.fractionImposableRvto[3].partImposable} % à partir de 70 ans, selon l'âge au premier
              versement. Cette fraction ne change plus ensuite. Des prélèvements sociaux
              s'ajoutent sur la même base ({pct(PS)}, taux à confirmer). Cette fraction imposable
              entre dans le revenu fiscal de référence.
            </p>
          </div>

          <p>
            Jean, 65 ans, retraité composite et illustratif qui ne correspond à aucun cas réel, a
            converti {euros(CAPITAL)} issus d'un contrat d'assurance-vie en rente viagère. Il
            s'attend à ce que la rente soit imposée comme une pension, au barème de l'impôt sur la
            totalité. Or, pour ce type de rente, le régime est différent : la loi fiscale ne retient
            qu'une part de la rente, d'autant plus faible que le premier versement est tardif.
          </p>
          <p>
            Cet article explique ce régime, avec un exemple calculé, un tableau par âge, et les
            précautions à prendre pour ne pas le confondre avec celui des rentes issues d'un PER.
            Les caractéristiques de la rente elle-même, notamment son calcul, sont dans notre guide
            sur{" "}
            <a href="/guide/rente-viagere-calcul-montant-taux-de-conversion">
              le montant et le taux de conversion d'une rente viagère
            </a>
            .
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#fraction">Quelle fraction de la rente est imposable ?</a></li>
              <li><a href="#sociaux">Quels prélèvements sociaux sur la rente ?</a></li>
              <li><a href="#exemple">Exemple : combien d'impôt sur une rente issue de {euros(CAPITAL)} ?</a></li>
              <li><a href="#par-age">Comment la fiscalité varie-t-elle selon l'âge au premier versement ?</a></li>
              <li><a href="#rfr">La rente entre-t-elle dans le revenu fiscal de référence ?</a></li>
              <li><a href="#reversion">Et en cas de réversion ?</a></li>
              <li><a href="#distinguer">Rente de PER, de PEA, d'assurance-vie : ne pas tout confondre</a></li>
              <li><a href="#declaration">Comment déclarer sa rente viagère ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="fraction">Quelle fraction de la rente est imposable ?</h2>
          <p>
            Pour une rente viagère à titre onéreux, le code général des impôts (article 158, 6)
            n'impose qu'une fraction de la rente reçue. Cette fraction dépend de l'âge du
            crédirentier lorsqu'il perçoit la rente pour la première fois, et reste la même pendant
            toute la durée de la rente, sans être recalculée avec l'âge. Elle s'applique au montant
            brut annuel de la rente :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Âge au premier versement</th>
                  <th>Fraction imposable de la rente</th>
                </tr>
              </thead>
              <tbody>
                {R.fractionImposableRvto.map((t) => (
                  <tr key={t.libelle}>
                    <td>{t.libelle}</td>
                    <td>{pct(t.partImposable)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Le raisonnement est que la rente rembourse en partie le capital converti, dont une
            partie n'est pas un revenu. Plus on commence tard, plus la rente est supposée
            correspondre à ce remboursement, d'où une fraction imposable plus faible. L'âge à retenir
            est celui de l'entrée en jouissance de la rente, c'est-à-dire en pratique du premier
            versement : se renseigner précisément sur la date retenue par l'assureur, car elle fixe
            le barème pour la suite.
          </p>

          <h2 id="sociaux">Quels prélèvements sociaux sur la rente ?</h2>
          <p>
            Les prélèvements sociaux se calculent sur la même fraction imposable, et non sur la
            rente entière. Le taux de {pct(PS)} figure dans nos données en {R.maj}, à la suite de la
            loi de financement de la sécurité sociale pour 2026.
          </p>
          <div className="note">
            <p>
              Point à confirmer : la LFSS 2026 a porté le taux de 17,2 % à 18,6 % pour le cas
              général des revenus du patrimoine. Selon Service-Public (fiche F2329), le taux de
              17,2 % n'est maintenu que pour les revenus fonciers, les plus-values immobilières,
              l'assurance-vie, le PEL, le CEL et le PEP ; les rentes viagères à titre onéreux n'y
              figurent pas, d'où le taux de {pct(PS)} retenu ici. Le cas d'une rente issue de la
              conversion d'un contrat d'assurance-vie n'est toutefois pas détaillé : vérifiez le
              taux appliqué à votre rente auprès de votre assureur ou de l'administration.
            </p>
          </div>
          {/* À VÉRIFIER : taux des prélèvements sociaux d'une RVTO issue d'une assurance-vie (18,6 % cas général vs 17,2 % assurance-vie) — texte LFSS 2026 art. 12 / CSS L. 136-8 non lu directement ; GuideAvApres8Ans retient 17,2 % pour la même rente. */}

          <h2 id="exemple">Exemple : combien d'impôt sur une rente issue de {euros(CAPITAL)} ?</h2>
          <p>
            Reprenons le cas de Jean. Hypothèses illustratives : capital converti de {euros(CAPITAL)}
            , âge de {AGE} ans au premier versement, taux de conversion de {pct(T.defaut)} sans
            réversion, tranche marginale d'imposition (TMI) de {pct(TMI)}, prélèvements sociaux
            de {pct(PS)} (à confirmer). Le calcul :
          </p>
          <ol>
            <li>
              Rente brute annuelle : {euros(CAPITAL)} × {pct(T.defaut)} = <strong>{euros(renteBrute)}</strong>
              {" "}(soit {eurosPrecis(renteBrute / 12)} par mois).
            </li>
            <li>
              Fraction imposable à {AGE} ans : {pct(ex.part)}, soit {euros(renteBrute)} × {pct(ex.part)}
              {" "}= <strong>{euros(ex.imposable)}</strong>.
            </li>
            <li>
              Impôt sur le revenu : {euros(ex.imposable)} × {pct(TMI)} = <strong>{euros(ex.impot)}</strong>.
            </li>
            <li>
              Prélèvements sociaux : {euros(ex.imposable)} × {pct(PS)} = <strong>{eurosPrecis(ex.ps)}</strong>.
            </li>
            <li>
              Rente nette de ces prélèvements : {euros(renteBrute)} − {euros(ex.impot)} −{" "}
              {eurosPrecis(ex.ps)} = <strong>{eurosPrecis(ex.net)}</strong> par an, soit{" "}
              {eurosPrecis(ex.net / 12)} par mois.
            </li>
          </ol>
          <p>
            Les prélèvements totaux représentent donc {eurosPrecis(ex.impot + ex.ps)} sur une rente
            de {euros(renteBrute)}, soit environ{" "}
            {((100 * (ex.impot + ex.ps)) / renteBrute).toLocaleString("fr-FR", { maximumFractionDigits: 1 })}{" "}
            % de la rente brute. Ce calcul est une simplification : il suppose que la totalité de la
            fraction imposable est taxée à la TMI, alors que l'impôt réel dépend de l'ensemble des
            revenus du foyer, de ses parts et d'éventuels abattements ou crédits.
          </p>

          <h2 id="par-age">Comment la fiscalité varie-t-elle selon l'âge au premier versement ?</h2>
          <p>
            Pour la même rente de {euros(renteBrute)}, la fraction imposable, et donc les
            prélèvements, varient selon l'âge au premier versement. Les mêmes hypothèses de TMI et de
            prélèvements sociaux sont appliquées :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Âge au premier versement</th>
                  <th>Fraction imposable</th>
                  <th>Montant imposable</th>
                  <th>Impôt (TMI {pct(TMI)})</th>
                  <th>Prélèvements sociaux ({pct(PS)})</th>
                  <th>Rente nette de prélèvements</th>
                </tr>
              </thead>
              <tbody>
                {agesTableau.map((age) => {
                  const c = calcul(renteBrute, age);
                  return (
                    <tr key={age}>
                      <td>{age} ans</td>
                      <td>{pct(c.part)}</td>
                      <td>{euros(c.imposable)}</td>
                      <td>{euros(c.impot)}</td>
                      <td>{eurosPrecis(c.ps)}</td>
                      <td>{eurosPrecis(c.net)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p>
            La comparaison est pédagogique : à capital et taux identiques, la rente ne serait pas la
            même à des âges différents, puisque le taux de conversion varie avec l'âge (voir notre
            article sur{" "}
            <a href="/guide/rente-viagere-calcul-montant-taux-de-conversion">le calcul du montant</a>
            ). Le tableau isole seulement l'effet de la fraction imposable.
          </p>

          <h2 id="rfr">La rente entre-t-elle dans le revenu fiscal de référence ?</h2>
          <p>
            {R.rvtoDansRfr
              ? "Oui, d'après nos données : la fraction imposable de la rente entre dans le revenu fiscal de référence (RFR)."
              : "Non, d'après nos données."}{" "}
            Le RFR sert de base à de nombreux critères (exonérations, plafonds de ressources, taux de
            certains prélèvements), si bien qu'une rente peut avoir des effets au-delà de l'impôt sur le
            revenu lui-même. La façon exacte dont la rente y est prise en compte est à vérifier sur
            l'avis d'imposition ou auprès de l'administration.
          </p>

          <h2 id="reversion">Et en cas de réversion ?</h2>
          <p>
            Lorsque la rente est réversible au profit d'un conjoint, la question est de savoir quel
            âge retenir pour fixer la fraction imposable de celui qui la perçoit après le décès du
            premier bénéficiaire. Nous n'avons pas de source suffisamment certaine pour trancher ce
            point : il est prudent de se renseigner auprès de l'assureur et de l'administration
            fiscale avant de souscrire, et de faire confirmer le régime applicable à la rente
            reversée. Les options de réversion sont présentées dans notre guide sur{" "}
            <a href="/guide/inconvenients-rente-viagere">les inconvénients de la rente viagère</a>.
          </p>
          {/* À VÉRIFIER : âge retenu pour la fraction imposable d'une rente réversible (BOI-RSA-PENS-30-20 non lu directement) ; une source secondaire évoque l'âge du plus âgé des bénéficiaires. */}

          <h2 id="distinguer">Rente de PER, de PEA, d'assurance-vie : ne pas tout confondre</h2>
          <p>
            Les règles de cette page concernent la rente viagère à titre onéreux, par exemple issue de
            la conversion d'un capital d'assurance-vie. D'autres rentes relèvent d'un autre régime.
          </p>
          <ul>
            <li>
              <strong>La rente d'un PER.</strong> Son régime fiscal n'est pas celui des RVTO :
              il dépend notamment de l'origine des versements. Nous ne détaillons pas ici des règles
              que nous ne pouvons pas sourcer pour chaque cas ; notre guide sur{" "}
              <a href="/guide/fiscalite-sortie-per">la fiscalité de la sortie du PER</a> y est
              consacré, et la page{" "}
              <a href="/strategies/per">PER</a> en donne le cadre général.
            </li>
            <li>
              <strong>La rente issue d'un PEA.</strong> La sortie en rente d'un PEA obéit à ses
              propres règles ; voir la page{" "}
              <a href="/strategies/pea-retraite">PEA et retraite</a> et faire confirmer le régime
              applicable à votre situation.
            </li>
            <li>
              <strong>Une rente issue d'un contrat d'assurance-vie.</strong> Selon le contrat et la
              façon dont la rente est constituée, le régime peut varier. En cas de doute, demandez à
              l'assureur de qualifier la rente et de vous indiquer le traitement fiscal retenu. La
              page <a href="/strategies/assurance-vie-retraite">assurance-vie et retraite</a>{" "}
              présente le contrat ; l'imposition des rachats, qui est un autre sujet, est détaillée
              dans notre guide sur{" "}
              <a href="/guide/rachat-partiel-assurance-vie-imposition">le rachat partiel</a>.
            </li>
          </ul>

          <h2 id="declaration">Comment déclarer sa rente viagère ?</h2>
          <p>
            Le montant brut de la rente est à reporter dans la déclaration de revenus, dans la
            rubrique des rentes viagères à titre onéreux, sur la ligne correspondant à l'âge à
            l'entrée en jouissance (cases 1AW à 1DW de la déclaration n° 2042). L'administration se
            charge ensuite d'appliquer la fraction imposable : il n'est pas nécessaire de la
            calculer soi-même. Il reste utile de conserver l'attestation de l'assureur et de
            vérifier le montant déclaré. En cas de doute sur la case à utiliser, se reporter aux
            notices de l'administration.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Quelle part d'une rente viagère à titre onéreux est imposable ?</h3>
          <p>
            Une fraction fixée par l'âge au premier versement : {R.fractionImposableRvto[0].partImposable}{" "}
            % avant 50 ans, {R.fractionImposableRvto[1].partImposable} % de 50 à 59 ans,{" "}
            {R.fractionImposableRvto[2].partImposable} % de 60 à 69 ans, {R.fractionImposableRvto[3].partImposable}{" "}
            % à 70 ans et plus (CGI, art. 158, 6).
          </p>
          <h3>La fraction imposable change-t-elle avec l'âge ?</h3>
          <p>
            Non. Elle est déterminée une fois pour toutes à la date du premier versement et reste la
            même pendant toute la durée de la rente.
          </p>
          <h3>Y a-t-il des prélèvements sociaux sur une rente viagère ?</h3>
          <p>
            Oui, sur la fraction imposable, au taux de {pct(PS)} dans nos données de {R.maj}. Ce taux
            a été modifié par la LFSS 2026 et reste à confirmer.
          </p>
          <h3>La rente viagère est-elle comprise dans le revenu fiscal de référence ?</h3>
          <p>
            D'après nos données, oui, pour sa fraction imposable. Le RFR conditionne des avantages ou prélèvements ailleurs :
            voir l'avis d'imposition pour le montant retenu.
          </p>
          <h3>La fiscalité est-elle la même pour une rente de PER ?</h3>
          <p>
            Non. La rente d'un PER relève d'un régime distinct, qui dépend notamment de l'origine
            des versements. Voir{" "}
            <a href="/guide/fiscalite-sortie-per">notre guide sur la sortie du PER</a>.
          </p>
          <h3>Dois-je calculer moi-même la part imposable ?</h3>
          <p>
            Non. Vous déclarez le montant brut de la rente sur la ligne correspondant à votre âge à
            l'entrée en jouissance ; l'administration applique la fraction imposable. Il reste utile de comprendre le mécanisme pour anticiper l'impôt.
          </p>
          <h3>Une rente est-elle plus avantageuse fiscalement qu'un retrait ?</h3>
          <p>
            Cela dépend du cas : de l'âge, des gains du contrat, de la TMI et de l'horizon. Il
            s'agit de deux régimes différents, à comparer sur vos chiffres. Voir{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">rente ou retraits programmés</a>{" "}
            et{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            L'intérêt fiscal d'une RVTO tient à la fraction imposable : plus le premier versement
            intervient tard, plus elle est faible, et elle reste figée ensuite. Dans l'exemple, une
            rente de {euros(renteBrute)} à {AGE} ans ne donne lieu à impôt et prélèvements que sur{" "}
            {euros(ex.imposable)}. Ce résultat illustre un mécanisme ; il ne dit pas si une rente est
            souhaitable, ce que l'on décide sur l'ensemble de sa situation.
          </p>
          <p>
            Les points à confirmer sont le taux des prélèvements sociaux, l'âge retenu en cas de
            réversion et la qualification d'une rente issue d'un autre contrat que l'assurance-vie.
            Pour replacer ces éléments dans l'ensemble de vos revenus de retraite, le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> ou le{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> offrent un premier cadre.
            Voir aussi notre page <a href="/strategies/decumulation">décumulation</a>.
          </p>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en {R.maj} :</p>
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
              Cette analyse est générale et ne constitue pas un conseil fiscal personnalisé. Les
              règles citées sont celles que nous avons consultées en {R.maj} et sont à faire
              confirmer, notamment le taux des prélèvements sociaux. Les exemples chiffrés sont des
              illustrations pédagogiques composites, établies sur des hypothèses affichées ; ils ne
              préjugent ni de votre situation ni des règles futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Une rente se juge aussi sur ce qu'il en reste après impôt." />
    </>
  );
}
