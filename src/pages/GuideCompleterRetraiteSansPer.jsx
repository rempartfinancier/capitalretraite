import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  COMPLETER_SANS_PER_NOV2026,
  ENVELOPPES_NOV2026,
  FISCALITE,
  ILLUSTRATIF,
  PER_PLAFOND,
  REGIME_GENERAL,
  RETRAITE_PROGRESSIVE_CUMUL,
  TRANSMISSION,
  euros,
} from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const C = COMPLETER_SANS_PER_NOV2026;
const R = RETRAITE_PROGRESSIVE_CUMUL;
const F = FISCALITE;

const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + " %";

// ---- Comparaison de fiscalité sur une même part de gains retirée ----
const gain = C.gainRetireIllustratif;
const part = (base, taux) => (base * taux) / 100;
const avPS = part(gain, F.prelevementsSociaux.assuranceVie);
const avIR = part(Math.max(gain - F.avAbattementAnnuelSeul, 0), F.avTauxReduitApres8Ans);
const peaPS = part(gain, F.prelevementsSociaux.pea);
const ctoIR = part(gain, F.pfuIR);
const ctoPS = part(gain, F.prelevementsSociaux.cto);
const lignesFiscalite = [
  { libelle: "Assurance-vie, contrat de plus de 8 ans (seul)", ir: avIR, ps: avPS },
  { libelle: "PEA, retrait après 5 ans", ir: 0, ps: peaPS },
  { libelle: "Compte-titres ordinaire (PFU)", ir: ctoIR, ps: ctoPS },
];

// ---- Report de départ : surcote ----
const pensionBase = ILLUSTRATIF.pensionMensuelleIllustrative;
const tauxSurcote = C.trimestresSurcoteExemple * REGIME_GENERAL.surcoteParTrimestre;
const pensionAvecSurcote = pensionBase * (1 + tauxSurcote / 100);

const sources = [
  {
    label: "Service-Public.gouv.fr — Assurance-vie : fiscalité des rachats, fiche F22414, vérifiée le 15 avril 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22414",
  },
  {
    label: "Service-Public.gouv.fr — Cumul emploi-retraite du salarié, fiche F13243, vérifiée le 12 novembre 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F13243",
  },
  {
    label: "Service-Public.gouv.fr — Âge légal de départ à la retraite, fiche F14043, vérifiée le 14 août 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14043",
  },
  {
    label: "Service-Public.gouv.fr — Plafond de déduction des versements sur un PER, fiche F34982, vérifiée le 12 octobre 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34982",
  },
  {
    label: "L'Assurance retraite — Surcote et décote",
    url: "https://www.lassuranceretraite.fr/",
  },
  {
    label: "Agirc-Arrco — Retraite complémentaire des salariés",
    url: "https://www.agirc-arrco.fr/",
  },
  {
    label: "impots.gouv.fr — Les revenus mobiliers et les plus-values (PEA, compte-titres, assurance-vie)",
    url: "https://www.impots.gouv.fr/",
  },
  {
    label: "Légifrance — Code monétaire et financier (art. L. 221-30 et suivants, PEA) ; Code du travail (épargne salariale)",
    url: "https://www.legifrance.gouv.fr/",
  },
  {
    label: "Autorité des marchés financiers (AMF) — Épargnants : placements et risques",
    url: "https://www.amf-france.org/fr",
  },
  {
    label: "Info-retraite.fr — Relevé de situation individuelle et simulateur de pension",
    url: "https://www.info-retraite.fr/",
  },
];

export default function GuideCompleterRetraiteSansPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Alternatives · enveloppes et leviers</span>
          <h1>Compléter sa retraite sans PER : quelles autres solutions ?</h1>
          <p className="sub">
            Assurance-vie, PEA, compte-titres, immobilier, épargne salariale, ou simplement travailler un peu
            plus : un panorama qualitatif pour comparer. Mis à jour en novembre 2026.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le PER n'est pas la seule façon de préparer sa retraite, et il
              n'est pas non plus un mauvais choix : il répond à un besoin précis (déduction à l'entrée, argent
              bloqué jusqu'à la retraite). Quand on le laisse de côté, d'autres enveloppes prennent le relais,
              avec chacune des compromis différents sur la liquidité, la fiscalité de sortie, les plafonds et la
              transmission. Et certains leviers n'ont rien d'une enveloppe : le report du départ ou le cumul
              emploi-retraite peuvent peser autant sur le niveau de vie futur.
            </p>
          </div>

          <p>
            Beaucoup de lecteurs arrivent ici après avoir entendu que le PER « bloque l'argent », ou parce que
            leur tranche d'imposition rend la déduction peu attractive. La question « que faire à la place ? »
            appelle une réponse nuancée : il n'y a pas de substitut universel, seulement des outils qui ne
            servent pas le même objectif.
          </p>
          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel : Marc, 48 ans,
            salarié, est peu imposé et souhaite garder la main sur son épargne. Il hésite entre une
            assurance-vie, un PEA et un projet immobilier, et se demande si un report de départ de quelques
            trimestres compterait autant qu'un versement mensuel. Cet article compare les pistes, sans en
            recommander une : le bon choix dépend de la situation de chacun.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#per">Le PER est-il à écarter ?</a></li>
              <li><a href="#tableau">Le tableau comparatif : liquidité, fiscalité de sortie, plafond, succession</a></li>
              <li><a href="#av-pea-cto">Assurance-vie, PEA ou compte-titres : que change la fiscalité ?</a></li>
              <li><a href="#immobilier">Et l'immobilier locatif ou la SCPI ?</a></li>
              <li><a href="#epargne-salariale">Que devient l'épargne salariale, PEE et PERCO ?</a></li>
              <li><a href="#cumul">Cumul emploi-retraite : un complément sans enveloppe</a></li>
              <li><a href="#report">Reporter son départ : combien peut rapporter la surcote ?</a></li>
              <li><a href="#choisir">Comment choisir sans PER ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#plus-loin">Pour aller plus loin</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="per">Le PER est-il à écarter ?</h2>
          <p>
            Non. Le PER a des atouts réels pour certains profils : déduction des versements du revenu imposable
            dans la limite d'un plafond ({pct1(PER_PLAFOND.tauxRevenusActivite)} des revenus d'activité de l'année
            précédente, retenus dans la limite de {PER_PLAFOND.multiplePassMaximum} fois le plafond annuel de la
            sécurité sociale), et discipline d'épargne puisque les fonds sont en principe disponibles à la
            retraite. Ses contraintes sont tout aussi réelles : blocage jusqu'à la retraite hors cas de
            déblocage anticipé, imposition à la sortie, avantage fiscal d'autant plus faible que la tranche
            marginale est basse.
          </p>
          <p>
            Ne pas ouvrir de PER est donc une décision légitime quand l'avantage fiscal est limité ou quand la
            disponibilité de l'argent prime. Le choix se fait au cas par cas : notre analyse{" "}
            <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER ?</a>{" "}
            détaille les situations où il se justifie, et celles où il se justifie moins. Notre comparatif{" "}
            <a href="/guide/per-ou-assurance-vie-selon-age-et-tmi">PER ou assurance-vie selon l'âge et la tranche d'imposition</a>{" "}
            complète cette lecture.
          </p>

          <h2 id="tableau">Le tableau comparatif : liquidité, fiscalité de sortie, plafond, succession</h2>
          <p>
            Le tableau ci-dessous est volontairement qualitatif. Il situe les solutions les unes par rapport
            aux autres ; les chiffres exacts (taux, plafonds) sont donnés plus bas ou dans les articles dédiés,
            et se vérifient avant toute décision. La dernière ligne rappelle le PER pour référence.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Solution</th>
                  <th>Liquidité</th>
                  <th>Fiscalité à la sortie</th>
                  <th>Plafond de versement</th>
                  <th>Succession</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Assurance-vie</td>
                  <td>Rachat possible à tout moment ; fiscalité plus douce après 8 ans</td>
                  <td>Seuls les gains sont imposés, avec abattement annuel après huit ans</td>
                  <td>Pas de plafond légal</td>
                  <td>Cadre spécifique : abattement par bénéficiaire sur les primes versées avant 70 ans</td>
                </tr>
                <tr>
                  <td>PEA</td>
                  <td>Disponible, mais un retrait avant {F.peaExonerationIRApres} ans entraîne en principe la clôture du plan</td>
                  <td>Gains soumis aux seuls prélèvements sociaux après {F.peaExonerationIRApres} ans</td>
                  <td>Plafonné ({euros(ENVELOPPES_NOV2026.peaPlafondVersements)} de versements pour le PEA classique)</td>
                  <td>Le plan est clôturé au décès, la valeur entre dans la succession</td>
                </tr>
                <tr>
                  <td>Compte-titres ordinaire</td>
                  <td>Très bonne : vente à tout moment</td>
                  <td>Plus-values et dividendes imposés chaque fois (prélèvement forfaitaire en principe)</td>
                  <td>Pas de plafond</td>
                  <td>Succession ordinaire</td>
                </tr>
                <tr>
                  <td>Immobilier locatif, SCPI</td>
                  <td>Faible à moyenne : délais de vente, parfois de retrait</td>
                  <td>Revenus fonciers et plus-values spécifiques, selon le régime</td>
                  <td>Pas de plafond, mais limité par la capacité d'emprunt</td>
                  <td>Succession ordinaire ; démembrement possible</td>
                </tr>
                <tr>
                  <td>Épargne salariale (PEE, PER collectif)</td>
                  <td>Bloquée selon les règles du plan, avec cas de déblocage</td>
                  <td>Dépend du dispositif et du mode de sortie</td>
                  <td>Plafonds légaux et règles de l'accord d'entreprise</td>
                  <td>Selon le plan et le mode de sortie</td>
                </tr>
                <tr>
                  <td>PER (pour référence)</td>
                  <td>Bloqué jusqu'à la retraite hors cas prévus</td>
                  <td>Capital ou rente imposés, selon l'origine des versements</td>
                  <td>Plafond de déduction annuel</td>
                  <td>Régime spécifique selon le type de PER</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="note">
            <p>
              Ce tableau simplifie volontairement. Les règles de succession, le traitement des retraits et les
              conditions de sortie varient selon les contrats et la situation familiale. Les revenus et capitaux
              de chaque colonne peuvent perdre de la valeur, sauf garantie contractuelle.
            </p>
          </div>

          <h2 id="av-pea-cto">Assurance-vie, PEA ou compte-titres : que change la fiscalité ?</h2>
          <p>
            Pour mesurer ce que la fiscalité de sortie change, comparons les trois enveloppes de marché sur une
            même base. Supposons que {euros(gain)} de gains soient compris dans un retrait. Calcul
            illustratif, avec les taux retenus sur ce site, pour une personne seule dont les primes
            non remboursées restent sous le seuil du taux réduit de l'assurance-vie.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Enveloppe</th>
                  <th>Impôt sur le revenu</th>
                  <th>Prélèvements sociaux</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {lignesFiscalite.map((l) => (
                  <tr key={l.libelle}>
                    <td>{l.libelle}</td>
                    <td>{euros(l.ir)}</td>
                    <td>{euros(l.ps)}</td>
                    <td>{euros(l.ir + l.ps)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Cette comparaison repose sur des taux de {pct1(F.avTauxReduitApres8Ans)} (assurance-vie après 8 ans,
            après abattement de {euros(F.avAbattementAnnuelSeul)}), {pct1(F.pfuIR)} (prélèvement forfaitaire) et
            sur des prélèvements sociaux de {pct1(F.prelevementsSociaux.assuranceVie)} pour l'assurance-vie,{" "}
            {pct1(F.prelevementsSociaux.pea)} pour le PEA et {pct1(F.prelevementsSociaux.cto)} pour le compte-titres,
            selon les hypothèses du site, à vérifier. Elle n'est qu'une photographie de la sortie : elle ne dit rien
            de la liquidité, des frais, des plafonds ni de la façon dont les gains se sont formés, et elle ne tient pas
            compte de l'option pour le barème progressif. Pour approfondir, voir{" "}
            <a href="/guide/pea-ou-assurance-vie">PEA ou assurance-vie</a>,{" "}
            <a href="/guide/meilleure-enveloppe-retraite">la meilleure enveloppe pour la retraite</a> et{" "}
            <a href="/strategies/pea-retraite">la stratégie PEA pour la retraite</a>. Les unités de compte,
            les actions et les ETF comportent un risque de perte en capital.
          </p>

          <h2 id="immobilier">Et l'immobilier locatif ou la SCPI ?</h2>
          <p>
            L'immobilier répond à une logique différente : il fabrique un revenu régulier, parfois financé à
            crédit, mais il immobilise du capital, suppose de gérer ou de déléguer, et se revend difficilement
            vite. La SCPI simplifie la gestion mais ne garantit ni les loyers ni la valeur des parts. Ce sujet
            demande des articles dédiés : nous renvoyons vers{" "}
            <a href="/strategies/immobilier-retraite">notre stratégie immobilier retraite</a>, vers{" "}
            <a href="/guide/scpi-preparer-sa-retraite">le guide SCPI pour préparer sa retraite</a> et vers{" "}
            <a href="/guide/per-ou-immobilier-locatif">PER ou immobilier locatif</a>. Pour des analyses
            détaillées du marché, les sites spécialisés{" "}
            <a href="https://immobilierpassif.com" target="_blank" rel="noopener noreferrer">immobilierpassif.com</a>{" "}
            et{" "}
            <a href="https://scpirentable.fr" target="_blank" rel="noopener noreferrer">scpirentable.fr</a>{" "}
            complètent ce panorama.
          </p>

          <h2 id="epargne-salariale">Que devient l'épargne salariale, PEE et PERCO ?</h2>
          <p>
            Si votre entreprise propose un plan d'épargne salariale, c'est souvent l'un des compléments les plus
            simples à activer : l'épargne peut être alimentée par la participation, l'intéressement ou des
            versements volontaires, avec une contribution possible de l'employeur (abondement) selon l'accord
            d'entreprise. Les règles précises, les plafonds et les cas de déblocage se lisent dans le règlement
            de votre plan ; nous ne les chiffrons pas ici.
          </p>
          <p>
            Depuis la loi Pacte, le PERCO a été remplacé par le PER collectif : les anciens plans ont vocation à
            y être transférés ou à y évoluer, avec des conditions de sortie qui peuvent différer de celles du
            PERCO d'origine. Avant tout transfert, demandez à votre teneur de compte et à votre employeur ce qui
            change pour les sommes déjà investies, notamment pour le mode de sortie (capital ou rente) et pour la
            fiscalité. Les frais des fonds d'épargne salariale sont parfois élevés : lisez le document
            d'information des supports proposés.
          </p>

          <h2 id="cumul">Cumul emploi-retraite : un complément sans enveloppe</h2>
          <p>
            Travailler après avoir liquidé sa retraite ajoute un revenu sans constituer de capital. Les règles
            dépendent de la date d'effet de la première pension. Pour une pension prenant effet à partir du
            1er janvier 2027, entre l'âge légal et {R.ageCumulLibre} ans, la pension n'est pas réduite tant que
            les revenus d'activité ne dépassent pas {euros(R.seuilCumul2027)} par an ; au-delà, elle est réduite
            de {R.tauxReductionAuDela} % du dépassement. À partir de {R.ageCumulLibre} ans, il n'y a plus de
            réduction. Notre guide{" "}
            <a href="/guide/cumul-emploi-retraite-comment-ca-marche">cumul emploi-retraite : comment ça marche</a>{" "}
            donne le détail, et notre comparatif{" "}
            <a href="/guide/retraite-progressive-ou-cumul-emploi-retraite">retraite progressive ou cumul emploi-retraite</a>{" "}
            explique quand l'un ou l'autre est accessible.
          </p>

          <h2 id="report">Reporter son départ : combien peut rapporter la surcote ?</h2>
          <p>
            Retarder son départ au-delà de l'âge légal et de la durée d'assurance requise peut ouvrir droit à une
            surcote : {pct1(REGIME_GENERAL.surcoteParTrimestre)} de majoration par trimestre cotisé supplémentaire
            dans le régime général. Pour une pension mensuelle illustrative de {euros(pensionBase)}, quatre
            trimestres de surcote donneraient {pct1(tauxSurcote)} de majoration, soit{" "}
            {euros(pensionBase * (tauxSurcote / 100))} de plus par mois et {euros(pensionAvecSurcote)} au total.
            Ce calcul est un exemple de mécanique, pas un résultat : il suppose que les conditions sont remplies et ne
            tient compte ni de la retraite complémentaire, ni de la fiscalité.
          </p>
          <p>
            Il faut aussi regarder ce qu'on renonce : une ou plusieurs années de pension non perçue, contre une
            pension plus élevée pendant toute la retraite. Le résultat dépend de la durée de vie, ce que personne
            ne peut prédire. Notre guide{" "}
            <a href="/guide/surcote-decote-retraite">surcote et décote</a> détaille les règles, et celui sur{" "}
            <a href="/guide/combien-coute-rachat-trimestres-retraite">le rachat de trimestres</a> traite l'autre
            sens, quand il manque des trimestres.
          </p>

          <h2 id="choisir">Comment choisir sans PER ?</h2>
          <p>
            Quatre questions suffisent pour orienter la réflexion ; elles ne désignent pas une solution.
          </p>
          <ol>
            <li>
              <strong>De quelle liquidité avez-vous besoin ?</strong> Plus la disponibilité compte, plus
              l'assurance-vie, le PEA ou le compte-titres se justifient par rapport à une épargne bloquée.
            </li>
            <li>
              <strong>Quelle sera votre imposition à la sortie ?</strong> Si elle est faible, l'avantage fiscal
              d'une enveloppe déductible diminue ; si elle est élevée, il pèse davantage.
            </li>
            <li>
              <strong>Quelle place pour la transmission ?</strong> L'assurance-vie bénéficie d'un cadre
              spécifique (abattement de {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} par bénéficiaire
              sur les primes versées avant 70 ans, à vérifier) ; ce n'est pas le cas des autres enveloppes.
            </li>
            <li>
              <strong>Quel effort de gestion acceptez-vous ?</strong> Un bien immobilier demande du temps ou une
              délégation payante ; une assurance-vie ou un PEA investis en fonds diversifiés en demandent moins.
            </li>
          </ol>
          <p>
            Pour un ordre de grandeur de l'effort à fournir, voir{" "}
            <a href="/guide/combien-faut-il-epargner-pour-la-retraite">combien faut-il épargner pour la retraite</a>{" "}
            et{" "}
            <a href="/guide/combien-epargner-par-mois-pour-la-retraite-selon-age">combien épargner par mois selon l'âge</a>.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Comment préparer sa retraite sans PER ?</h3>
          <p>
            En combinant plusieurs enveloppes (assurance-vie, PEA, compte-titres), éventuellement de
            l'immobilier ou de l'épargne salariale, et en agissant sur les leviers du système de retraite :
            vérification de la carrière, report de départ, activité réduite. Aucune combinaison n'est
            universelle.
          </p>
          <h3>Quelle est la meilleure alternative au PER ?</h3>
          <p>
            Il n'y en a pas de meilleure en soi. L'assurance-vie offre de la souplesse et un cadre de
            transmission, le PEA une fiscalité de sortie réduite sur les actions, le compte-titres une liberté
            totale, l'immobilier un revenu mais une liquidité moindre. Le choix dépend de vos priorités.
          </p>
          <h3>Le PER est-il une mauvaise idée ?</h3>
          <p>
            Non. C'est un outil dont l'intérêt dépend de la tranche d'imposition, de l'horizon et du besoin de
            disponibilité. Voir <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER ?</a>.
          </p>
          <h3>Assurance-vie ou PEA pour compléter sa retraite ?</h3>
          <p>
            Les deux peuvent coexister. Le PEA est plafonné et centré sur les actions européennes éligibles,
            l'assurance-vie est sans plafond légal et plus souple pour la transmission et pour sortir en rente.
            Notre comparatif <a href="/guide/pea-ou-assurance-vie">PEA ou assurance-vie</a> détaille les critères.
          </p>
          <h3>Que faire de son PERCO ?</h3>
          <p>
            Les anciens plans ont vocation à évoluer vers le PER collectif. Renseignez-vous auprès de votre
            employeur et de votre teneur de compte sur les conditions de sortie et le sort des sommes déjà
            investies avant tout transfert.
          </p>
          <h3>Peut-on compléter sa retraite en retravaillant ?</h3>
          <p>
            Oui, via le cumul emploi-retraite ou la retraite progressive, sous conditions d'âge et de
            trimestres. Les règles diffèrent selon la date d'effet de la pension.
          </p>
          <h3>Reporter son départ augmente-t-il vraiment la pension ?</h3>
          <p>
            Cela peut être le cas grâce à la surcote, à raison de {pct1(REGIME_GENERAL.surcoteParTrimestre)} par
            trimestre supplémentaire dans le régime général lorsque les conditions sont réunies. L'effet sur la
            retraite complémentaire se vérifie auprès de l'Agirc-Arrco.
          </p>
          <h3>Immobilier ou assurance-vie pour compléter sa retraite ?</h3>
          <p>
            Les deux n'ont ni la même liquidité ni la même fiscalité, et peuvent se compléter. Voir{" "}
            <a href="/guide/immobilier-locatif-ou-assurance-vie">immobilier locatif ou assurance-vie</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Compléter sa retraite sans PER est possible et parfois judicieux, mais cela ne revient pas à
            remplacer un outil par un autre : chaque solution déplace le compromis entre disponibilité, fiscalité
            de sortie, plafond et transmission. Le plus souvent, une combinaison de plusieurs d'entre elles,
            ajustée au fil de la vie, est plus robuste qu'une seule enveloppe. Les leviers du système (report,
            cumul, vérification de carrière) méritent d'être regardés avant ou en parallèle de l'épargne.
          </p>
          <p>
            Pour situer l'écart à combler, utilisez notre <a href="/simulateur-retraite">simulateur de retraite</a>,
            puis replacez les différentes pistes dans votre situation avec un{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a>. Vous pouvez aussi consulter nos{" "}
            <a href="/strategies/assurance-vie-retraite">stratégie assurance-vie</a> et{" "}
            <a href="/strategies/decumulation">stratégie de décumulation</a>.
          </p>

          <h2 id="plus-loin">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/faut-il-ouvrir-un-per">Faut-il ouvrir un PER ?</a></li>
            <li><a href="/guide/meilleure-enveloppe-retraite">Quelle est la meilleure enveloppe pour la retraite ?</a></li>
            <li><a href="/guide/ordre-de-decaissement-retraite">Dans quel ordre décaisser ses enveloppes à la retraite ?</a></li>
            <li><a href="/guide/cumul-emploi-retraite-comment-ca-marche">Cumul emploi-retraite : comment ça marche</a></li>
            <li><a href="/guide/capital-retraite-objectif-et-construction">Capital retraite : objectif et construction</a></li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en novembre 2026 :</p>
          <ul>
            {sources.map((src) => (
              <li key={src.url + src.label}>
                <a href={src.url} target="_blank" rel="noopener noreferrer">
                  {src.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé : seule une étude de votre
              situation peut déterminer la solution adaptée. Les placements en unités de compte, en actions, en
              SCPI ou en immobilier comportent un risque de perte en capital et ne garantissent aucun rendement ; les
              performances passées ne préjugent pas des performances futures. Les exemples chiffrés sont des
              illustrations pédagogiques établies sur des hypothèses affichées, qui ne préjugent ni de votre
              situation ni des règles futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Compléter sa retraite sans PER : comparez les pistes dans un bilan global." />
    </>
  );
}
