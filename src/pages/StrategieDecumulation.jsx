import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { TableRenteVsRetraits } from "../components/Simulateurs.jsx";
import {
  HYPOTHESES_MAJ,
  RENDEMENTS,
  FISCALITE,
  DECUMULATION,
  euros,
  pct,
} from "../components/hypotheses.js";

export default function StrategieDecumulation() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Stratégie 04 — notre angle différenciant</span>
          <h1>La décumulation : convertir son capital en revenus sans se tromper</h1>
          <p className="sub">
            On passe trente ans à apprendre à épargner, et personne ne nous apprend à décaisser.
            C'est pourtant là que se gagnent — ou se perdent — les dernières années d'efforts.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Qu'est-ce que la décumulation ?</h2>
          <p>
            La décumulation est la phase où votre patrimoine cesse de croître pour financer votre
            vie : vous transformez un stock (le capital constitué) en flux (des revenus réguliers).
            Cette phase obéit à des règles différentes de la constitution : la fiscalité des
            retraits, l'ordre dans lequel on puise dans les enveloppes et le rythme de décaissement
            comptent souvent plus que la performance des placements eux-mêmes.
          </p>

          <h2>Trois grandes voies pour créer un revenu</h2>
          <h3>La rente viagère</h3>
          <p>
            Vous cédez votre capital à un assureur en échange d'un revenu garanti jusqu'à votre
            décès. Avantage : le risque de longévité disparaît — vous ne pouvez pas « survivre à
            votre argent ». Contreparties : le capital est aliéné (rien ne revient aux héritiers,
            sauf option de réversion, c'est-à-dire le versement de tout ou partie de la rente au
            conjoint survivant) et le montant dépend de l'âge de conversion et des tables de
            mortalité — les statistiques de durée de vie utilisées par les assureurs pour calculer
            les rentes.
          </p>
          <p>
            Le mécanisme tient en un chiffre : le <strong>taux de conversion</strong>, c'est-à-dire le pourcentage du capital cédé que l'assureur s'engage à verser chaque année sous forme de rente — autrement dit, combien de rente annuelle pour 100 € de capital confié. À 65 ans, sans option, l'ordre de grandeur constaté va de {pct(DECUMULATION.tauxConversionRente65.min)} à {pct(DECUMULATION.tauxConversionRente65.max)} selon les contrats (barèmes de conversion des assureurs, fondés sur ces tables de mortalité ; hypothèses révisées en {HYPOTHESES_MAJ}, à vérifier contrat par contrat). Pour un capital de 100 000 € converti à 65 ans au taux médian de {pct(DECUMULATION.tauxConversionRente65.defaut)}, la rente serait ainsi d'environ {euros((100000 * DECUMULATION.tauxConversionRente65.defaut) / 100)} par an, avant impôt. Plus la conversion intervient tard, plus le taux est élevé : l'assureur s'attend à verser moins longtemps.
          </p>
          <p>
            Deux options viennent moduler le contrat. La <strong>réversion</strong>, déjà évoquée, se paramètre ici : vous désignez le bénéficiaire — le conjoint le plus souvent — et la part de la rente qui lui sera reversée après votre décès. Les <strong>annuités garanties</strong> : l'assureur s'engage à verser la rente pendant un nombre minimal d'années, à vos bénéficiaires si vous décédez avant ce terme. Ces protections ont un coût implicite : à capital égal, elles abaissent le taux de conversion de départ. Quant à la fiscalité de la rente, elle dépend entièrement de son origine (PER, assurance-vie, PEA, capital personnel) — les régimes sont récapitulés plus bas dans la fiscalité comparative des sorties.
          </p>
          <div className="note">
            Notre analyse : sur le PER, la sortie en rente est rarement la meilleure option dans les situations que nous rencontrons — la sortie en capital, le plus souvent fractionnée sur plusieurs années pour éviter de faire grimper la TMI (tranche marginale d'imposition : le taux d'impôt qui s'applique à la dernière partie de vos revenus), garde la main sur le capital et laisse subsister, pour la part non retirée, les atouts successoraux de l'enveloppe. Conclusion à réexaminer au cas par cas, jamais un automatisme. Pour une rente issue d'une assurance-vie ou d'un PEA, en revanche, il n'existe pas de verdict général : revenu à vie et simplicité d'un côté, capital aliéné et taux figé de l'autre — l'arbitrage se pèse situation par situation.
          </div>
          <h3>Le rachat progressif</h3>
          <p>
            Vous conservez votre capital investi et en retirez régulièrement une fraction (rachats
            programmés d'assurance-vie, retraits fractionnés de PER, ventes partielles sur PEA).
            Avantage : souplesse totale et capital transmissible. Contrepartie : le risque de
            longévité reste à votre charge — décaisser trop vite ou subir un marché baissier en
            début de retraite peut épuiser le capital prématurément.
          </p>
          <p>
            En pratique, vous fixez un montant et une fréquence, et l'assureur ou le teneur de compte vend automatiquement la fraction de parts nécessaire ; le reste du capital demeure investi. C'est ici qu'intervient le <strong>risque de séquence des rendements</strong> — l'ordre dans lequel les bonnes et les mauvaises années de marché se succèdent. Un krach survenant au tout début de la retraite fait beaucoup plus de dégâts que le même krach quinze ans plus tard, pour une raison mécanique : quand on décaisse, on vend des parts dépréciées pour financer son train de vie, et ces parts vendues au plus bas ne participeront jamais au rebond. À performance moyenne identique sur l'ensemble de la retraite, deux ordres d'années différents peuvent conduire l'un à un capital préservé, l'autre à un capital épuisé.
          </p>
          <p>
            La parade la plus simple est une poche sécurisée : conserver l'équivalent de deux à trois ans de retraits sur des supports garantis — typiquement le fonds en euros (support d'assurance-vie dont le capital est garanti par l'assureur, hors faillite de celui-ci), dont le rendement moyen a été de {pct(RENDEMENTS.fondsEuros.moyen)} (moyenne de marché France Assureurs / ACPR pour {RENDEMENTS.fondsEuros.periode}, nette de frais de gestion) — un constat passé qui ne préjuge pas des rendements futurs. Le reste du capital demeure en unités de compte (supports non garantis, dont la valeur fluctue à la hausse comme à la baisse), seuls capables de viser un rendement supérieur sur la durée — sans aucune certitude. En marché baissier, on puise dans la poche sécurisée au lieu de vendre des parts au pire moment, puis on la reconstitue une fois les marchés repris.
          </p>
          <p>
            Reste le rythme. Il n'existe aucun taux de retrait universel : le bon niveau dépend de l'âge, des pensions, de la composition du capital et des objectifs de transmission — il se calcule au cas par cas. Dans les simulations ci-dessous, l'hypothèse par défaut retenue pour un capital resté investi prudemment pendant les retraits est de {pct(DECUMULATION.rendementCapitalPendantRetraits)} par an : une hypothèse illustrative, révisée en {HYPOTHESES_MAJ}, en aucun cas une promesse de rendement.
          </p>
          <p>
            Pour visualiser l'arbitrage entre ces deux premières voies, le simulateur ci-dessous compare, à revenu annuel identique, ce que la rente viagère et les retraits programmés versent au total selon votre longévité — et ce qu'il reste à transmettre dans chaque scénario. La grille de lecture est simple : la rente protège contre la longévité extrême, les retraits préservent le capital transmissible.
          </p>
          <TableRenteVsRetraits />

          <h3>Rente, retraits programmés ou une combinaison des deux ?</h3>
          <p>
            Les deux logiques ne s'excluent pas : convertir une fraction du capital en rente pour sécuriser un socle de revenus, et piloter le reste en retraits programmés, est une combinaison possible, dont la pertinence s'évalue au cas par cas. Le tableau suivant résume l'arbitrage.
          </p>
          <table>
            <thead>
              <tr>
                <th>Critère</th>
                <th>Rente viagère</th>
                <th>Retraits programmés</th>
                <th>Approche mixte</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sécurité du revenu à vie</td>
                <td>Maximale : rente versée jusqu'au décès — engagement de l'assureur, hors défaillance de celui-ci</td>
                <td>Non garantie : dépend du rythme choisi et des marchés ; le capital peut s'épuiser</td>
                <td>Socle viager assuré (mêmes limites), complément flexible</td>
              </tr>
              <tr>
                <td>Capital transmis au décès</td>
                <td>Aucun : capital aliéné, sauf réversion ou annuités garanties (qui réduisent la rente)</td>
                <td>Le capital restant se transmet, selon les règles de l'enveloppe</td>
                <td>Partiel : seule la part non convertie se transmet</td>
              </tr>
              <tr>
                <td>Souplesse</td>
                <td>Nulle : la conversion est irréversible</td>
                <td>Totale : montant modulable, pause ou arrêt possibles</td>
                <td>Intermédiaire : seule la part en retraits reste pilotable</td>
              </tr>
              <tr>
                <td>Fiscalité</td>
                <td>Selon l'origine de la rente (voir la fiscalité comparative plus bas)</td>
                <td>Selon l'enveloppe : assurance-vie, PEA ou PER</td>
                <td>Les deux régimes coexistent</td>
              </tr>
              <tr>
                <td>Pour quel profil ? (repères généraux)</td>
                <td>Recherche d'un plancher de revenu à vie, faible tolérance au risque de longévité</td>
                <td>Pensions couvrant l'essentiel, volonté de transmettre</td>
                <td>Situation intermédiaire — dosage à calculer au cas par cas</td>
              </tr>
            </tbody>
          </table>
          <h3>Le viager et la monétisation de l'immobilier</h3>
          <p>
            Vendre en viager, vendre la nue-propriété (détenir les murs sans en percevoir les
            revenus) en conservant l'usufruit (percevoir les revenus sans détenir les murs), ou
            arbitrer un bien locatif : l'immobilier peut lui aussi devenir un flux. Ces opérations sont lourdes et
            irréversibles — elles se préparent des années à l'avance, pas dans l'urgence.
          </p>

          <h2>Le timing de sortie selon les enveloppes</h2>
          <p>
            Chaque enveloppe a son propre calendrier fiscal optimal : l'assurance-vie après 8 ans
            avec son abattement annuel (la fraction de revenus exonérée d'impôt), le PEA après{" "}
            {FISCALITE.peaExonerationIRApres} ans, le PER dont la sortie en capital peut
            se fractionner sur plusieurs années pour lisser l'impôt. Sortir de la mauvaise
            enveloppe en premier, ou tout sortir la même année, peut coûter plusieurs points de
            fiscalité — de manière parfaitement évitable.
          </p>

          <h2>La fiscalité comparative des sorties</h2>
          <ul>
            <li><strong>Assurance-vie (rachats)</strong> : seuls les gains sont imposés, abattement annuel après 8 ans ;</li>
            <li><strong>PEA (retraits)</strong> : plus-values exonérées d'IR après {FISCALITE.peaExonerationIRApres} ans, prélèvements sociaux (CSG, CRDS et contributions annexes sur les revenus du capital) dus ;</li>
            <li><strong>PER (capital)</strong> : part des versements déduits imposée au barème, gains au prélèvement forfaitaire (le PFU, taux global impôt + prélèvements sociaux) ;</li>
            <li><strong>Rentes viagères</strong> : régimes distincts selon l'origine (à titre onéreux, PER, PEA) — du plus taxé au totalement exonéré d'IR.</li>
          </ul>

          <h2>L'ordre de décaissement : par quelle enveloppe commencer ?</h2>
          <p>
            C'est la question la plus structurante de la décumulation — et la moins souvent posée. À patrimoine identique, l'ordre dans lequel on puise dans ses enveloppes peut sensiblement alourdir ou alléger la facture fiscale d'une retraite entière, et changer ce qui restera aux héritiers. Un ordre revient fréquemment dans nos analyses ; il est indicatif, jamais universel, et se vérifie au cas par cas.
          </p>
          <h3>1. Le PEA d'abord : une enveloppe à consommer de son vivant</h3>
          <p>
            Le PEA ne survit pas à son titulaire : au décès, il est clôturé d'office, les prélèvements sociaux (prélevés au taux applicable au PEA, {pct(FISCALITE.prelevementsSociaux.pea)} depuis la LFSS 2026, en vigueur en {HYPOTHESES_MAJ}) sont dus sur l'ensemble des plus-values, et les titres entrent dans la succession sans abattement propre à l'enveloppe. Un plan patiemment rempli pendant vingt ans ne transmet donc aucun avantage. Notre analyse : autant le consommer soi-même, en premier, pour financer les premières années de retraite — d'autant que ses retraits sont exonérés d'impôt sur le revenu après {FISCALITE.peaExonerationIRApres} ans. Nous détaillons cette mécanique dans notre page <a href="/strategies/pea-retraite">PEA et retraite</a>.
          </p>
          <h3>2. L'assurance-vie ensuite : utiliser l'abattement annuel, chaque année</h3>
          <p>
            Après 8 ans, les gains compris dans vos rachats bénéficient chaque année d'un abattement de {euros(FISCALITE.avAbattementAnnuelSeul)} pour une personne seule et {euros(FISCALITE.avAbattementAnnuelCouple)} pour un couple soumis à imposition commune (barème en vigueur en {HYPOTHESES_MAJ}). Ce droit se renouvelle chaque année civile : étaler ses rachats sur dix ans, c'est utiliser l'abattement dix fois, là où un rachat unique ne le mobilise qu'une seule fois.
          </p>
          <p>
            Illustration : un couple retire 15 000 € par an d'un contrat de plus de 8 ans, dont 9 000 € de gains — le reste correspond aux versements, qui ne sont jamais imposés au rachat. Ces 9 000 € de gains tiennent sous l'abattement de {euros(FISCALITE.avAbattementAnnuelCouple)} : zéro impôt sur le revenu ; seuls les prélèvements sociaux restent dus sur les gains, au taux de {pct(FISCALITE.prelevementsSociaux.assuranceVie)} propre à l'assurance-vie (non concerné par la hausse LFSS 2026), soit {euros((9000 * FISCALITE.prelevementsSociaux.assuranceVie) / 100)} dans cet exemple. Répétée chaque année, l'opération produit un revenu régulier très faiblement fiscalisé. Notre page <a href="/strategies/assurance-vie-retraite">assurance-vie et retraite</a> approfondit cette stratégie de rachats étalés.
          </p>
          <h3>3. Le PER en dernier : une fiscalité qui n'expire pas, une transmission qui reste avantageuse</h3>
          <p>
            La fiscalité de sortie du PER ne s'éteint jamais : la part correspondant aux versements déduits reste imposée au barème de l'impôt sur le revenu, que vous sortiez à 65, 75 ou 85 ans — attendre ne coûte donc rien fiscalement. Sortir une somme importante en une seule année peut au contraire faire grimper la TMI et annuler une partie du bénéfice du report d'imposition (la déduction obtenue à l'entrée n'est pas un cadeau, mais un impôt différé). Au décès, en revanche, un PER assurantiel — souscrit auprès d'un assureur, par opposition au PER bancaire, simple compte-titres — se transmet avec des abattements successoraux comparables à ceux de l'assurance-vie, sans que la déduction d'entrée soit reprise. Notre analyse : le PER se garde volontiers pour la fin — il continue de faire travailler le capital, et c'est au décès qu'il déploie ses atouts successoraux. Le détail figure dans nos pages <a href="/strategies/per">PER</a> et <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a>.
          </p>
          <div className="note">
            Cet ordre — PEA, puis assurance-vie, puis PER — est un ordre indicatif, fréquent dans nos analyses, jamais une règle. Une année de revenus exceptionnellement bas, un projet ponctuel, une succession à préparer ou une TMI durablement faible peuvent l'inverser en tout ou partie. Il n'existe pas de bon ordre dans l'absolu, seulement un ordre adapté à une situation : c'est précisément l'objet d'un calcul au cas par cas.
          </div>

          <h2>Le risque de longévité</h2>
          <p>
            Une retraite peut durer trente ans. Le vrai risque n'est pas de mourir trop tôt, c'est
            de vivre longtemps avec un capital dimensionné pour quinze ans. Toute stratégie de
            décumulation sérieuse commence par cette question : quel socle de revenus doit être
            assuré à vie (pensions, ou rente portée par un assureur — hors défaillance de
            celui-ci), et quelle part peut rester flexible ?
          </p>
          <p>
            Les données de l'INSEE ancrent ce risque : à 65 ans, un homme a encore {DECUMULATION.esperanceVie65.hommes} ans devant lui en moyenne, une femme {DECUMULATION.esperanceVie65.femmes} ans (espérance de vie à 65 ans, INSEE, données 2023-2024) — et ce sont des moyennes, qu'une partie des retraités dépassera largement. Dimensionner son capital sur quinze ans, c'est parier contre la statistique.
          </p>

          <h2>Les erreurs fréquentes</h2>
          <ul>
            <li><strong>Décapitaliser trop vite</strong> les premières années, quand tout va bien ;</li>
            <li><strong>Puiser dans la mauvaise enveloppe en premier</strong> et gaspiller des abattements fiscaux ;</li>
            <li>Ignorer l'effet d'un marché baissier en début de retraite sur un capital en cours de retrait ;</li>
            <li>Convertir tout son capital en rente — ou refuser toute rente — par principe plutôt que par calcul ;</li>
            <li>Ne penser la décumulation qu'à 64 ans, alors qu'elle se prépare dès 55.</li>
          </ul>

          <div className="note">
            Piste de réflexion : une stratégie de décaissement articule typiquement un socle de
            revenus sûrs (pensions, éventuellement une rente d'assureur — hors défaillance de
            celui-ci) et une part investie, décaissée avec souplesse. Le bon dosage dépend de votre
            espérance de dépenses, de votre patrimoine et de votre rapport au risque — c'est
            exactement ce qu'on regarde en bilan.
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="À quoi ressemblerait votre plan de décaissement ?" button="Bilan retraite gratuit (15 min)" />
    </>
  );
}
