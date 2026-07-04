import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { REGIME_GENERAL, ILLUSTRATIF, euros, pct } from "../components/hypotheses.js";

// Pension mensuelle après application d'une décote ou d'une surcote, en
// pourcentage du taux plein — calcul illustratif uniquement.
const pensionAvecCoefficient = (pensionTauxPlein, coefficientPct) =>
  pensionTauxPlein * (1 + coefficientPct / 100);

// Décote maximale possible, en pourcentage de la pension (plafonnée à
// REGIME_GENERAL.decotePlafondTrimestres trimestres).
const decoteMaximalePct =
  REGIME_GENERAL.decoteParTrimestre * REGIME_GENERAL.decotePlafondTrimestres;

export default function GuideSurcoteDecote() {
  // Exemple illustratif : trimestres manquants / trimestres travaillés en plus.
  const trimestresManquantsExemple = 6;
  const trimestresSurcoteExemple = 8;

  const decotePctExemple =
    REGIME_GENERAL.decoteParTrimestre * trimestresManquantsExemple;
  const surcotePctExemple =
    REGIME_GENERAL.surcoteParTrimestre * trimestresSurcoteExemple;

  const pensionAvecDecoteExemple = pensionAvecCoefficient(
    ILLUSTRATIF.pensionMensuelleIllustrative,
    -decotePctExemple
  );
  const pensionAvecSurcoteExemple = pensionAvecCoefficient(
    ILLUSTRATIF.pensionMensuelleIllustrative,
    surcotePctExemple
  );

  const ecartMensuelDecote =
    ILLUSTRATIF.pensionMensuelleIllustrative - pensionAvecDecoteExemple;
  const ecartMensuelSurcote =
    pensionAvecSurcoteExemple - ILLUSTRATIF.pensionMensuelleIllustrative;

  const pensionAvecDecoteMax = pensionAvecCoefficient(
    ILLUSTRATIF.pensionMensuelleIllustrative,
    -decoteMaximalePct
  );
  const ecartMensuelDecoteMax =
    ILLUSTRATIF.pensionMensuelleIllustrative - pensionAvecDecoteMax;

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Le mécanisme qui change le montant de votre pension</span>
          <h1>Surcote ou décote à la retraite : comment ça se calcule, et comment l'anticiper ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> la décote réduit votre pension de{" "}
              {pct(REGIME_GENERAL.decoteParTrimestre)} par trimestre manquant par rapport à la
              durée d'assurance requise pour le taux plein, avec un plafond de{" "}
              {REGIME_GENERAL.decotePlafondTrimestres} trimestres (soit {pct(decoteMaximalePct)}{" "}
              de réduction maximale). La surcote fait l'inverse : elle augmente la pension de{" "}
              {pct(REGIME_GENERAL.surcoteParTrimestre)} par trimestre travaillé au-delà du taux
              plein et de l'âge légal, sans plafond. Entre les deux, l'écart peut représenter
              plusieurs centaines d'euros par mois, sur toute la durée de la retraite — un enjeu
              qui se joue des années avant la liquidation, pas le jour du départ.
            </p>
          </div>
          <p>
            C'est souvent au moment de demander son relevé de situation individuelle, ou lors
            d'une simulation sur info-retraite.fr, que la découverte a lieu : « il vous manque
            sept trimestres pour le taux plein ». Beaucoup découvrent ce chiffre tard — parfois
            à un ou deux ans du départ souhaité — alors que la marge de manœuvre pour le corriger
            s'est déjà réduite.
          </p>
          <p>
            Prenons une situation composite, à but purement illustratif : une personne qui a
            commencé à travailler tardivement, connu une interruption de carrière, et qui envisage
            de partir à 63 ans alors que sa durée d'assurance ne sera complète qu'à 64 ans et demi.
            Sans action de sa part, sa pension sera calculée avec une décote. À l'inverse, quelqu'un
            qui a validé tous ses trimestres à 62 ans mais choisit de continuer à travailler
            jusqu'à 64 ans verra sa pension majorée par la surcote. Ce sont les deux faces d'un même
            mécanisme, et c'est précisément ce que cet article détaille.
          </p>
          <p>
            La décote (une minoration définitive du montant de la pension) et la surcote (une
            majoration définitive) ne sont pas des pénalités ou des primes arbitraires : ce sont
            des règles de calcul du régime général, prévisibles, qui se lisent sur un relevé de
            carrière avant même le départ. Notre objectif ici : vous donner la mécanique exacte,
            un exemple chiffré pour vous situer, et les leviers concrets pour l'anticiper plutôt
            que la subir.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#decote">Qu'est-ce que la décote, et comment se calcule-t-elle ?</a></li>
              <li><a href="#surcote">Qu'est-ce que la surcote, et comment se calcule-t-elle ?</a></li>
              <li><a href="#age-taux-plein">À partir de quel âge la décote disparaît-elle automatiquement ?</a></li>
              <li><a href="#exemple-chiffre">Quel est l'impact réel sur une pension ? Un exemple chiffré</a></li>
              <li><a href="#eviter-decote">Comment éviter ou limiter la décote ?</a></li>
              <li><a href="#viser-surcote">Faut-il viser la surcote ? Le calcul coût-bénéfice</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="decote">Qu'est-ce que la décote, et comment se calcule-t-elle ?</h2>
          <p>
            La décote s'applique quand vous partez à la retraite sans avoir réuni votre durée
            d'assurance (le nombre de trimestres nécessaires pour le taux plein, un chiffre qui
            dépend de votre année de naissance) et avant d'avoir atteint l'âge du taux plein
            automatique. Chaque trimestre manquant réduit alors votre pension de base de{" "}
            {pct(REGIME_GENERAL.decoteParTrimestre)}.
          </p>
          <p>
            Ce taux de {pct(REGIME_GENERAL.decoteParTrimestre)} par trimestre n'est pas plafonné
            dans son principe mais dans son application : le nombre de trimestres manquants pris
            en compte pour le calcul de la décote est plafonné à{" "}
            {REGIME_GENERAL.decotePlafondTrimestres} trimestres, soit une décote maximale de{" "}
            {pct(decoteMaximalePct)} de la pension de base — même si l'écart réel avec la durée
            requise est supérieur à {REGIME_GENERAL.decotePlafondTrimestres} trimestres.
          </p>
          <p>
            Deux nombres de trimestres manquants sont en réalité comparés, et c'est le plus
            favorable à l'assuré qui est retenu : les trimestres manquants pour atteindre la durée
            d'assurance requise, et ceux manquants pour atteindre l'âge du taux plein automatique
            (voir la section suivante). La décote se calcule sur celui des deux écarts qui est le
            plus petit.
          </p>
          <p>
            Point important : la décote ne s'applique qu'à la pension de base du régime général.
            Les régimes complémentaires (Agirc-Arrco pour les salariés du privé) appliquent leurs
            propres règles de minoration, parfois temporaires et distinctes de celles du régime
            général — un sujet qui dépasse le cadre de cet article et mérite d'être vérifié
            spécifiquement lors d'un bilan retraite.
          </p>

          <h2 id="surcote">Qu'est-ce que la surcote, et comment se calcule-t-elle ?</h2>
          <p>
            La surcote fonctionne à l'inverse de la décote : si vous continuez à travailler
            au-delà de l'âge légal de départ ET après avoir déjà validé tous les trimestres
            requis pour le taux plein, chaque trimestre supplémentaire cotisé majore votre
            pension de base de {pct(REGIME_GENERAL.surcoteParTrimestre)}.
          </p>
          <p>
            Contrairement à la décote, la surcote n'est pas plafonnée : chaque trimestre
            supplémentaire travaillé dans ces conditions continue de majorer la pension, sans
            limite de durée. Deux conditions cumulatives sont donc nécessaires pour qu'un
            trimestre travaillé génère de la surcote : avoir dépassé l'âge légal de départ, et
            avoir déjà atteint le nombre de trimestres requis pour le taux plein. Un trimestre
            cotisé avant l'âge légal, même si la durée d'assurance est déjà complète, ne génère
            pas de surcote.
          </p>
          <p>
            C'est un point souvent mal compris : la surcote récompense le report de la
            liquidation après le taux plein atteint, pas simplement le fait d'avoir « beaucoup »
            cotisé. Quelqu'un qui a commencé à travailler très jeune et validé tous ses
            trimestres dès 60 ans peut générer plusieurs trimestres de surcote s'il continue
            au-delà de l'âge légal, alors que quelqu'un qui n'atteint le taux plein qu'à l'âge
            légal lui-même ne génère aucune surcote avant d'avoir travaillé au-delà.
          </p>

          <h2 id="age-taux-plein">À partir de quel âge la décote disparaît-elle automatiquement ?</h2>
          <p>
            Quel que soit le nombre de trimestres validés, la décote disparaît automatiquement à
            partir de {REGIME_GENERAL.ageTauxPleinAutomatique} ans : c'est l'âge du taux plein
            automatique (parfois appelé « âge d'annulation de la décote »). À partir de cet âge,
            vous obtenez le taux plein sur votre pension de base même s'il vous manque des
            trimestres — la décote ne s'applique jamais au-delà.
          </p>
          <p>
            Cet âge constitue donc un filet de sécurité : même une carrière incomplète, marquée
            par des interruptions ou une entrée tardive sur le marché du travail, ne subit jamais
            de décote au-delà de {REGIME_GENERAL.ageTauxPleinAutomatique} ans. En contrepartie,
            attendre {REGIME_GENERAL.ageTauxPleinAutomatique} ans pour partir sans décote alors que
            l'âge légal est atteint plus tôt représente, pour beaucoup, plusieurs années de
            revenus d'activité ou de transition à couvrir autrement — c'est tout l'arbitrage
            détaillé plus bas.
          </p>
          <div className="note">
            <p>
              Cet âge de {REGIME_GENERAL.ageTauxPleinAutomatique} ans, comme les taux de{" "}
              {pct(REGIME_GENERAL.decoteParTrimestre)} et {pct(REGIME_GENERAL.surcoteParTrimestre)}{" "}
              par trimestre, correspond aux règles du régime général telles que publiées par
              service-public.fr et info-retraite.fr. Ces paramètres peuvent évoluer par la loi ;
              vérifiez toujours le chiffre applicable à votre génération sur votre relevé de
              situation individuelle ou auprès de votre caisse de retraite.
            </p>
          </div>

          <h2 id="exemple-chiffre">Quel est l'impact réel sur une pension ? Un exemple chiffré</h2>
          <p>
            Avant de continuer : l'exemple qui suit est purement illustratif, construit à partir
            d'une pension de référence fictive de {euros(ILLUSTRATIF.pensionMensuelleIllustrative)}{" "}
            par mois, choisie uniquement pour rendre le calcul lisible. Elle ne correspond à
            aucun cas réel et ne doit pas être prise comme un ordre de grandeur de votre propre
            pension — seul un relevé de carrière individuel permet ce calcul pour votre situation.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Situation</th>
                  <th>Trimestres concernés</th>
                  <th>Coefficient appliqué</th>
                  <th>Pension mensuelle illustrative</th>
                  <th>Écart mensuel</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pension à taux plein (référence)</td>
                  <td>—</td>
                  <td>0 %</td>
                  <td>{euros(ILLUSTRATIF.pensionMensuelleIllustrative)}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>Avec décote</td>
                  <td>{trimestresManquantsExemple} trimestres manquants</td>
                  <td>-{pct(decotePctExemple)}</td>
                  <td>{euros(pensionAvecDecoteExemple)}</td>
                  <td>-{euros(ecartMensuelDecote)} par mois</td>
                </tr>
                <tr>
                  <td>Avec décote maximale</td>
                  <td>{REGIME_GENERAL.decotePlafondTrimestres} trimestres manquants (plafond)</td>
                  <td>-{pct(decoteMaximalePct)}</td>
                  <td>{euros(pensionAvecDecoteMax)}</td>
                  <td>-{euros(ecartMensuelDecoteMax)} par mois</td>
                </tr>
                <tr>
                  <td>Avec surcote</td>
                  <td>{trimestresSurcoteExemple} trimestres travaillés en plus</td>
                  <td>+{pct(surcotePctExemple)}</td>
                  <td>{euros(pensionAvecSurcoteExemple)}</td>
                  <td>+{euros(ecartMensuelSurcote)} par mois</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Sur cet exemple illustratif, l'écart mensuel entre la situation décotée et la
            situation surcotée atteint{" "}
            {euros(ecartMensuelDecote + ecartMensuelSurcote)} — et cet écart mensuel se répète
            chaque mois, potentiellement pendant vingt à trente ans de retraite. C'est ce facteur
            de répétition, plus que le pourcentage lui-même, qui justifie d'anticiper le sujet
            plutôt que de le découvrir a posteriori. Nous insistons : ces montants ne sont qu'une
            démonstration du mécanisme de calcul, pas une projection de votre propre pension.
          </p>

          <h2 id="eviter-decote">Comment éviter ou limiter la décote ?</h2>
          <p>
            Trois leviers concrets permettent d'agir sur une décote anticipée, à des horizons de
            temps différents.
          </p>
          <p>
            <strong>Vérifier son relevé de carrière tôt.</strong> C'est le point de départ de
            tout le reste : un relevé de situation individuelle demandé à 50 ou 55 ans, plutôt
            qu'à 61 ou 62 ans, laisse le temps de corriger des anomalies (trimestres de stage non
            reportés, période d'apprentissage mal comptabilisée, erreur d'employeur) et de
            construire une stratégie sur plusieurs années. Découvrir un manque de trimestres à
            deux ans du départ souhaité laisse beaucoup moins d'options.
          </p>
          <p>
            <strong>Racheter des trimestres manquants.</strong> Le rachat de trimestres (verser
            une somme pour valider des trimestres au titre d'années d'études supérieures ou
            d'années incomplètes) est un des rares leviers directs pour combler un écart identifié
            avant la décote. Son coût varie fortement selon l'âge au moment du rachat et l'option
            choisie ; nous détaillons ce calcul dans notre guide dédié sur{" "}
            <a href="/guide/combien-coute-rachat-trimestres-retraite">le coût du rachat de trimestres</a>,
            qui permet de comparer ce coût au gain de pension évité par l'absence de décote.
          </p>
          <p>
            <strong>Décaler la date de départ.</strong> Travailler quelques trimestres de plus
            avant de liquider réduit mécaniquement, voire annule, l'écart à la durée requise. Ce
            levier n'a pas de coût financier direct au sens du rachat, mais un coût en temps de
            vie active — c'est précisément l'objet de l'arbitrage traité juste après, qui vaut
            aussi bien pour sortir d'une décote que pour entrer en surcote.
          </p>
          <p>
            Ces trois leviers ne sont pas exclusifs : un rachat partiel combiné à un report de
            quelques mois peut suffire à passer d'une décote significative à une pension à taux
            plein, sans attendre l'âge du taux plein automatique.
          </p>

          <h2 id="viser-surcote">Faut-il viser la surcote ? Le calcul coût-bénéfice</h2>
          <p>
            Une fois le taux plein atteint, la question s'inverse : faut-il liquider
            immédiatement, ou continuer pour engranger de la surcote ? Il n'y a pas de réponse
            universelle — notre analyse est qu'il s'agit d'un arbitrage personnel, pas d'une
            règle générale à appliquer systématiquement.
          </p>
          <p>
            Le côté « gain » est clair et se calcule facilement : {pct(REGIME_GENERAL.surcoteParTrimestre)}{" "}
            de plus par trimestre travaillé, sans plafond, appliqués à vie sur la pension. Sur
            plusieurs années de retraite, ce gain cumulé peut être substantiel, comme le montre
            l'exemple chiffré plus haut.
          </p>
          <p>
            Le côté « coût » est moins souvent chiffré, mais tout aussi réel : chaque trimestre
            travaillé en plus est un trimestre de retraite en moins, à un âge où la santé, la
            disponibilité pour les proches ou simplement l'envie de profiter du temps libre pèsent
            différemment selon les personnes. Il y a aussi un coût d'opportunité financier parfois
            négligé : les revenus d'activité pendant cette période sont souvent proches, voire
            supérieurs, à la pension qui serait perçue en cas de départ immédiat — mais ils sont
            fiscalisés et cotisés différemment, et ne remplacent pas le confort d'un temps
            entièrement disponible.
          </p>
          <p>
            Un paramètre à connaître si vous envisagez de continuer une activité après le taux
            plein sans forcément viser la surcote au sens strict : le cumul emploi-retraite
            (poursuivre ou reprendre une activité tout en percevant sa pension) n'est possible
            sans aucun plafond de revenu qu'après avoir atteint le taux plein — c'est-à-dire
            après avoir soit réuni la durée d'assurance requise, soit atteint l'âge du taux plein
            automatique, soit généré de la surcote. Avant le taux plein, le cumul reste possible
            mais plafonné. Les deux mécanismes — éviter la décote et accéder au cumul sans plafond
            — sont donc liés ; notre guide sur{" "}
            <a href="/guide/cumul-emploi-retraite-comment-ca-marche">le cumul emploi-retraite</a>{" "}
            détaille ce fonctionnement.
          </p>
          <p>
            Notre recommandation, si l'on peut en formuler une : faites le calcul avec vos propres
            chiffres — nombre de trimestres de surcote envisageables, pension de base réelle,
            horizon de vie estimé — avant de décider, plutôt que de vous fier à une intuition sur
            « travailler plus rapporte forcément plus ». C'est exactement le type de calcul que
            nous effectuons lors d'un bilan retraite.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>La décote s'applique-t-elle aussi aux régimes complémentaires (Agirc-Arrco) ?</h3>
          <p>
            Les régimes complémentaires appliquent des règles de minoration qui leur sont propres,
            distinctes de celles du régime général présentées ici, et parfois temporaires plutôt
            que définitives. Ce point mérite d'être vérifié spécifiquement pour votre situation,
            au-delà du cadre de cet article centré sur le régime général.
          </p>
          <h3>Peut-on cumuler décote et surcote sur une même carrière ?</h3>
          <p>
            Non, au sens où une même liquidation ne peut pas être à la fois décotée et surcotée :
            soit la durée d'assurance et l'âge de départ génèrent une décote, soit ils permettent
            une surcote, soit ni l'un ni l'autre (départ pile à taux plein, sans trimestre
            supplémentaire). Le calcul se fait au moment de la liquidation, sur la situation
            constatée à cette date précise.
          </p>
          <h3>La décote et la surcote s'appliquent-elles au montant brut ou net de la pension ?</h3>
          <p>
            Les coefficients de décote et de surcote s'appliquent au calcul de la pension de base
            avant les prélèvements sociaux (CSG, CRDS) qui interviennent ensuite sur le montant
            obtenu, comme sur toute pension de retraite.
          </p>
          <h3>Un trimestre « manquant » racheté efface-t-il totalement la décote correspondante ?</h3>
          <p>
            En principe oui : un trimestre racheté et validé compte comme un trimestre cotisé
            dans le calcul de la durée d'assurance, ce qui réduit d'autant le nombre de trimestres
            manquants retenus pour la décote. Le coût de ce rachat doit néanmoins être comparé au
            gain de pension obtenu — voir notre guide dédié sur{" "}
            <a href="/guide/combien-coute-rachat-trimestres-retraite">le coût du rachat de trimestres</a>.
          </p>
          <h3>La décote est-elle définitive, ou peut-elle être corrigée après la liquidation ?</h3>
          <p>
            Le coefficient de décote (ou de surcote) est en principe fixé définitivement au
            moment de la liquidation de la pension de base et ne se recalcule pas ensuite, sauf
            cas particuliers de révision liés à une erreur ou à un droit non pris en compte à
            tort. C'est une raison supplémentaire de vérifier sa situation avant de liquider,
            plutôt qu'après.
          </p>
          <h3>Les indépendants et les fonctionnaires sont-ils soumis aux mêmes règles de décote et de surcote ?</h3>
          <p>
            Le principe général — minoration en cas de trimestres manquants, majoration en cas de
            trimestres travaillés au-delà du taux plein — se retrouve dans plusieurs régimes,
            mais les paramètres précis (taux, plafonds, âges de référence) peuvent différer selon
            le régime d'affiliation. Les indépendants relèvent, pour leur retraite de base, de
            règles proches du régime général ; notre guide sur{" "}
            <a href="/guide/retraite-independants-per-ou-madelin">la retraite des indépendants</a>{" "}
            aborde leurs spécificités de préparation. Les fonctionnaires, eux, relèvent d'un
            régime distinct détaillé dans notre guide sur{" "}
            <a href="/guide/retraite-fonctionnaires-completer">compléter sa retraite de fonctionnaire</a>.
          </p>
          <h3>À quel âge dois-je commencer à me préoccuper de la décote ou de la surcote ?</h3>
          <p>
            Il n'y a pas d'âge trop tôt pour vérifier son relevé de carrière, mais en pratique,
            un premier contrôle sérieux entre 50 et 55 ans laisse le temps d'agir — racheter des
            trimestres, corriger une anomalie, ou simplement ajuster son projet de date de départ
            — avant que les options ne se réduisent à l'approche de l'âge légal.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La décote et la surcote ne sont ni des sanctions ni des récompenses au sens moral du
            terme : ce sont deux faces d'un même coefficient de calcul, entièrement prévisibles
            à partir du moment où l'on connaît sa durée d'assurance et son âge de départ envisagé.
            La décote retire jusqu'à {pct(decoteMaximalePct)} de la pension de base pour un
            départ trop précoce au regard des trimestres validés ; la surcote ajoute{" "}
            {pct(REGIME_GENERAL.surcoteParTrimestre)} par trimestre pour un départ différé après
            le taux plein, sans limite. Entre les deux se joue un écart qui, une fois répété
            chaque mois sur toute la durée de la retraite, dépasse largement l'intuition qu'on
            s'en fait au premier abord.
          </p>
          <p>
            Ce qui distingue une décote subie d'une décote évitée, ou une surcote maximisée d'une
            surcote laissée de côté, c'est presque toujours le moment où l'on s'est penché sur la
            question : un relevé de carrière vérifié à 52 ans laisse des options qu'un relevé
            découvert à 61 ans ne laisse plus. Le rachat de trimestres, le report de quelques
            mois, ou au contraire un départ dès le taux plein atteint sans chercher la surcote à
            tout prix, sont trois réponses légitimes selon les situations — aucune n'est
            supérieure dans l'absolu. C'est aussi ce qui relie ce sujet à des choix voisins : le{" "}
            <a href="/guide/cumul-emploi-retraite-comment-ca-marche">cumul emploi-retraite</a>{" "}
            une fois le taux plein atteint, ou la question plus large de{" "}
            <a href="/guide/combien-faut-il-epargner-pour-la-retraite">combien épargner pour la retraite</a>{" "}
            en complément d'une pension qui, elle, dépend de ces règles de calcul.
          </p>
          <div className="note">
            <p>
              Cette analyse décrit les règles de calcul du régime général telles que publiées par
              service-public.fr et info-retraite.fr ; elle ne constitue pas un conseil
              personnalisé et ne remplace pas un relevé de situation individuelle. Les exemples
              chiffrés de cet article sont purement illustratifs et pédagogiques, construits à
              partir d'une pension de référence fictive : ils ne préjugent en rien du montant de
              votre propre pension. Pour un calcul appliqué à votre carrière réelle, un{" "}
              <a href="/bilan-retraite">bilan retraite gratuit</a> permet de reprendre votre
              relevé de carrière et de chiffrer précisément vos options.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Vérifiez l'impact de la décote ou de la surcote sur votre propre pension"
        button="Demander mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
