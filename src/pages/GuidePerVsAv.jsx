import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RENDEMENTS,
  FRAIS_TYPES,
  FISCALITE,
  TRANSMISSION,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

export default function GuidePerVsAv() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide — comparatif</span>
          <h1>PER ou assurance-vie pour la retraite : le vrai comparatif</h1>
          <p className="sub">
            La question la plus posée en rendez-vous — et celle où les réponses toutes faites font
            le plus de dégâts. Voici le comparatif structuré, contreparties comprises.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le PER et l'assurance-vie ne se distinguent pas par
              leur « performance », mais par le moment où vous payez l'impôt. Le PER déduit vos
              versements de votre revenu imposable aujourd'hui et taxe la sortie ; l'assurance-vie
              ne déduit rien à l'entrée mais offre une fiscalité de sortie allégée après 8 ans, avec
              un accès à votre argent à tout moment. En pratique, ni l'un ni l'autre ne « gagne » :
              le PER est le plus rentable pour une TMI (tranche marginale d'imposition) élevée avec
              un horizon bloqué jusqu'à la retraite, l'assurance-vie l'emporte dès que la liquidité
              ou la transmission comptent. La plupart des stratégies solides combinent les deux.
              Si vous hésitez entre plus de deux enveloppes (PER, assurance-vie, PEA, compte-titres),
              notre guide{" "}
              <a href="/guide/meilleure-enveloppe-retraite">quelle est la meilleure enveloppe pour
              préparer sa retraite ?</a> élargit la focale au-delà de ce seul duel.
            </p>
          </div>

          <p>
            Ce comparatif se concentre volontairement sur le duel PER contre assurance-vie, sans
            élargir au PEA : c'est le PER qui capte le plus de confusions en rendez-vous, parce
            qu'il joue sur un terrain — le calendrier fiscal, entrée contre sortie — que
            l'assurance-vie ne connaît pas. Notre guide{" "}
            <a href="/guide/pea-ou-per-pour-la-retraite">PEA ou PER pour la retraite</a> traite le
            duel PEA/PER si c'est plutôt cette comparaison qui vous intéresse.
          </p>

          <h2>La différence fondamentale : quand payez-vous l'impôt ?</h2>
          <p>
            Le PER offre une déduction fiscale à l'entrée et une imposition à la sortie ;
            l'assurance-vie fait l'inverse : aucun avantage à l'entrée, mais une fiscalité de
            sortie douce (seuls les gains sont taxés, avec abattement après 8 ans). Tout le reste —
            liquidité, succession, cas d'usage — découle de ce choix de calendrier fiscal.
          </p>
          <p>
            Sur les prélèvements sociaux, les deux enveloppes ne logent plus à la même enseigne
            depuis la LFSS 2026 : le PER supporte désormais {pct(FISCALITE.prelevementsSociaux.per)}{" "}
            (comme le PEA et le compte-titres), tandis que l'assurance-vie reste à{" "}
            {pct(FISCALITE.prelevementsSociaux.assuranceVie)}, taux que la réforme n'a pas touché
            (barèmes en vigueur en {HYPOTHESES_MAJ}). C'est un écart réel, mais secondaire face à
            l'effet de la déduction à l'entrée ou de l'abattement à la sortie, qui pèsent
            généralement bien plus lourd dans le calcul.
          </p>

          <h2>Le tableau comparatif</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>PER</th>
                  <th>Assurance-vie</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Avantage à l'entrée</strong></td>
                  <td>Versements déductibles du revenu imposable, dans la limite d'un plafond annuel propre à chaque épargnant</td>
                  <td>Aucun</td>
                </tr>
                <tr>
                  <td><strong>Disponibilité</strong></td>
                  <td>Bloqué jusqu'à la retraite (hors cas légaux de déblocage anticipé, dont l'achat de la résidence principale)</td>
                  <td>Rachat (retrait partiel ou total) possible à tout moment, quelle que soit l'ancienneté du contrat</td>
                </tr>
                <tr>
                  <td><strong>Fiscalité de sortie en capital</strong></td>
                  <td>
                    Part correspondant aux versements déduits : imposée au barème de l'IR. Part
                    correspondant aux gains : prélèvement forfaitaire unique de{" "}
                    {pct(FISCALITE.pfuIR)} au titre de l'IR, plus{" "}
                    {pct(FISCALITE.prelevementsSociaux.per)} de prélèvements sociaux
                  </td>
                  <td>
                    Avant 8 ans : gains au prélèvement forfaitaire unique ({pct(FISCALITE.pfuIR)}{" "}
                    d'IR) ou au barème sur option, plus {pct(FISCALITE.prelevementsSociaux.assuranceVie)}{" "}
                    de prélèvements sociaux. Après 8 ans : abattement annuel de{" "}
                    {euros(FISCALITE.avAbattementAnnuelSeul)} (personne seule) ou{" "}
                    {euros(FISCALITE.avAbattementAnnuelCouple)} (couple), puis taux réduit de{" "}
                    {pct(FISCALITE.avTauxReduitApres8Ans)} au-delà, sous conditions de versements
                  </td>
                </tr>
                <tr>
                  <td><strong>Prélèvements sociaux</strong></td>
                  <td>{pct(FISCALITE.prelevementsSociaux.per)} (LFSS 2026)</td>
                  <td>{pct(FISCALITE.prelevementsSociaux.assuranceVie)} (non concerné par la hausse LFSS 2026)</td>
                </tr>
                <tr>
                  <td><strong>Sortie en rente</strong></td>
                  <td>Possible, rente viagère imposée selon le régime des pensions (part correspondant aux versements déduits) ou des rentes viagères à titre onéreux (part correspondant aux versements non déduits et aux gains)</td>
                  <td>Possible, rente viagère à titre onéreux : seule une fraction est imposable, décroissante selon l'âge au premier versement de la rente</td>
                </tr>
                <tr>
                  <td><strong>Succession</strong></td>
                  <td>Intègre l'actif successoral selon des règles fiscales spécifiques à chaque compartiment (assurance ou compte-titres) du plan ; cadre généralement moins favorable qu'un décès en assurance-vie avant 70 ans</td>
                  <td>
                    Abattement de {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} par
                    bénéficiaire pour les versements effectués avant 70 ans (hors actif
                    successoral) ; abattement collectif de{" "}
                    {euros(TRANSMISSION.abattementSuccessionAvApres70Collectif)} pour l'ensemble
                    des bénéficiaires sur les versements après 70 ans
                  </td>
                </tr>
                <tr>
                  <td><strong>Frais typiques</strong></td>
                  <td>Frais de gestion annuels et frais des supports comparables à une assurance-vie, variables selon l'assureur et le contrat</td>
                  <td>
                    De l'ordre de {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)} de frais de
                    gestion annuels selon le distributeur, hors frais des supports
                  </td>
                </tr>
                <tr>
                  <td><strong>Profil type</strong></td>
                  <td>TMI de {pct(FISCALITE.tmiOptions[2])} et plus, horizon long jusqu'à la retraite, épargne de précaution déjà constituée</td>
                  <td>Tous profils ; indispensable dès qu'un besoin de souplesse ou un objectif de transmission existe</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les montants, abattements et taux de ce tableau sont ceux en vigueur en{" "}
            {HYPOTHESES_MAJ} ; chaque loi de finances peut les faire évoluer, et ils doivent être
            revérifiés avant toute décision.
          </p>

          <h2>Les cas d'usage typiques</h2>
          <h3>Le PER prend l'avantage quand…</h3>
          <ul>
            <li>Votre TMI actuelle est de {pct(FISCALITE.tmiOptions[2])}, {pct(FISCALITE.tmiOptions[3])} ou {pct(FISCALITE.tmiOptions[4])}, et vous anticipez une TMI plus faible à la retraite ;</li>
            <li>Vous avez déjà une épargne disponible suffisante et pouvez immobiliser sans risque de regret ;</li>
            <li>Vous cherchez une discipline d'épargne « sanctuarisée » pour la retraite.</li>
          </ul>
          <h3>L'assurance-vie prend l'avantage quand…</h3>
          <ul>
            <li>Votre TMI est de {pct(FISCALITE.tmiOptions[1])} (la déduction PER rapporte peu, et la fiscalité de sortie peut l'annuler) ;</li>
            <li>Votre horizon ou vos projets sont incertains — mobilité, aide aux enfants, travaux ;</li>
            <li>La transmission fait partie de vos objectifs, avec l'abattement de{" "}
              {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} par bénéficiaire pour les versements avant 70 ans ;</li>
            <li>Vous voulez pouvoir piloter vos revenus de retraite par rachats programmés, avec l'abattement annuel après 8 ans.</li>
          </ul>

          <h2>Le vrai réglage : le dosage, pas le duel</h2>
          <p>
            Dans la pratique, la plupart des stratégies solides combinent les deux : le PER pour
            capter la déduction à hauteur du plafond utile (et pas au-delà), l'assurance-vie pour
            la souplesse, la succession et la décumulation par rachats. La bonne répartition dépend
            de trois paramètres : votre TMI, votre horizon et votre besoin de liquidité. Le fonds
            en euros, disponible dans les deux enveloppes, a servi en moyenne{" "}
            {pct(RENDEMENTS.fondsEuros.moyen)} en {RENDEMENTS.fondsEuros.periode} (moyenne de
            marché France Assureurs / ACPR, avant prélèvements sociaux) — un repère de rendement
            prudent, à ne jamais confondre avec une promesse pour les années à venir.
          </p>

          <div className="note">
            Ça dépend de votre TMI, de votre horizon et de votre besoin de liquidité — c'est
            exactement ce qu'on regarde en bilan. Quinze minutes suffisent souvent à trancher.
          </div>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on avoir un PER et une assurance-vie en même temps ?</h3>
          <p>
            Oui, et c'est même la configuration la plus fréquente chez les épargnants qui ont
            construit une stratégie retraite réfléchie : le PER capte la déduction fiscale sur les
            versements les plus utiles compte tenu de la TMI, l'assurance-vie assure la souplesse
            et la transmission. Les deux enveloppes ne sont pas concurrentes, elles sont
            complémentaires.
          </p>
          <h3>Le PER est-il vraiment bloqué jusqu'à la retraite ?</h3>
          <p>
            Oui, sauf cas de déblocage anticipé prévus par la loi (achat de la résidence
            principale, invalidité, décès du conjoint, surendettement, expiration des droits au
            chômage, cessation d'activité non salariée à la suite d'une liquidation judiciaire,
            notamment). En dehors de ces cas, l'épargne reste immobilisée jusqu'à l'âge légal de
            départ à la retraite ou son équivalent.
          </p>
          <h3>Que se passe-t-il si je change de TMI entre le versement et la retraite ?</h3>
          <p>
            C'est précisément le pari implicite du PER : vous déduisez au taux de votre TMI
            actuelle, et vous êtes imposé au taux de votre TMI au moment du retrait. Si votre TMI
            baisse à la retraite (ce qui est fréquent, les revenus de remplacement étant souvent
            inférieurs aux revenus d'activité), l'opération est gagnante ; si votre TMI reste
            identique ou grimpe, l'avantage se réduit, voire s'annule.
          </p>
          <h3>L'abattement de l'assurance-vie après 8 ans s'applique-t-il aussi au PER ?</h3>
          <p>
            Non. L'abattement annuel de {euros(FISCALITE.avAbattementAnnuelSeul)} (personne seule)
            ou {euros(FISCALITE.avAbattementAnnuelCouple)} (couple) après 8 ans est un mécanisme
            propre à l'assurance-vie. Le PER suit un régime fiscal de sortie différent, fondé sur
            la distinction entre versements déduits (imposés au barème) et gains (au prélèvement
            forfaitaire), sans notion d'ancienneté du contrat.
          </p>
          <h3>Peut-on transférer un PER vers une assurance-vie, ou l'inverse ?</h3>
          <p>
            Non, ce sont deux enveloppes juridiquement distinctes : on ne transfère pas l'épargne
            de l'une vers l'autre sans un rachat (PER : sortie anticipée dans les cas légaux
            uniquement) ou un retrait (assurance-vie), avec la fiscalité de sortie correspondante.
            En revanche, un PER peut être transféré vers un autre PER, et une assurance-vie vers un
            autre contrat d'assurance-vie n'est pas possible sans perdre l'antériorité fiscale.
          </p>
          <h3>Le PER est-il intéressant pour une TMI à {pct(FISCALITE.tmiOptions[1])} ?</h3>
          <p>
            Rarement de façon isolée : la déduction rapporte peu à ce niveau de TMI, et rien ne
            garantit que la TMI restera aussi basse au moment du retrait — auquel cas la fiscalité
            de sortie peut annuler l'avantage obtenu à l'entrée. L'assurance-vie, sans avantage à
            l'entrée mais avec une fiscalité de sortie prévisible et un abattement après 8 ans, est
            souvent plus adaptée à ce profil.
          </p>
          <h3>Faut-il privilégier la sortie en capital ou en rente ?</h3>
          <p>
            Cela dépend de votre besoin de disposer librement du capital, de votre situation de
            santé et de vos objectifs de transmission : la rente sécurise un revenu à vie mais
            fige le capital au profit de l'assureur au-delà de l'espérance de vie statistique,
            tandis que le capital reste disponible et transmissible mais expose au risque de
            l'épuiser trop tôt. C'est un arbitrage qui se travaille au cas par cas, pas une règle
            générale.
          </p>

          <h2>Notre analyse, en synthèse</h2>
          <p>
            Le duel PER contre assurance-vie n'a pas de vainqueur universel, et se méfier de toute
            réponse tranchée sur le sujet est un bon réflexe : le PER gagne sur la déduction à
            l'entrée pour une TMI élevée, l'assurance-vie gagne sur la disponibilité et la
            transmission. Aucune des deux enveloppes ne remplace l'autre — elles répondent à deux
            moments différents du calendrier fiscal.
          </p>
          <p>
            Ne pas trancher cette question a un coût réel : verser sur un PER sans avoir de
            visibilité sur sa TMI de sortie, ou l'inverse, négliger l'assurance-vie par
            méconnaissance de sa fiscalité de sortie réellement douce après 8 ans, peut coûter
            plusieurs points de rendement net sur la durée. Pour resituer ce duel dans le paysage
            complet des enveloppes retraite, au-delà du seul PER et de la seule assurance-vie,
            notre guide{" "}
            <a href="/guide/meilleure-enveloppe-retraite">quelle est la meilleure enveloppe pour
            préparer sa retraite ?</a> élargit la focale au PEA et au compte-titres ; et si c'est
            spécifiquement le duel PEA/PER qui vous intéresse, notre guide{" "}
            <a href="/guide/pea-ou-per-pour-la-retraite">PEA ou PER pour la retraite</a> le traite
            en détail.
          </p>
          <p>
            Notre rôle n'est pas de vous orienter par défaut vers l'une ou l'autre enveloppe, mais
            d'appliquer cette grille de lecture à votre situation réelle — votre TMI actuelle et
            anticipée, votre horizon, votre besoin de liquidité et vos objectifs de transmission —
            pour déterminer le bon dosage entre PER et assurance-vie. C'est ce que nous faisons
            lors d'un <a href="/bilan-retraite">bilan retraite gratuit</a> : quinze minutes
            suffisent souvent à trancher, chiffres en main.
          </p>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle. Les
              montants, abattements et taux cités sont les barèmes en vigueur en{" "}
              {HYPOTHESES_MAJ}, susceptibles d'évoluer à chaque loi de finances ; les rendements
              mentionnés sont des constats passés datés, et les performances passées ne préjugent
              pas des performances futures.
            </p>
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="PER, assurance-vie… ou les deux, dans quelles proportions ?" />
    </>
  );
}
