import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { SimulateurCapitalisation } from "../components/Simulateurs.jsx";
import { RENDEMENTS, FRAIS_TYPES, FISCALITE, HYPOTHESES_MAJ, pct } from "../components/hypotheses.js";

export default function StrategiePea() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Stratégie 03</span>
          <h1>Le PEA dans une optique retraite : le levier sous-estimé</h1>
          <p className="sub">
            On présente rarement le PEA comme un outil retraite. C'est pourtant l'une des
            enveloppes les plus efficaces fiscalement pour capitaliser sur longue durée.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>La capitalisation longue durée</h2>
          <p>
            Le PEA permet d'investir en actions européennes (en direct ou via des fonds et ETF —
            fonds indiciels cotés en bourse — éligibles) dans une enveloppe où les gains se capitalisent sans frottement fiscal tant
            qu'aucun retrait n'est effectué. Sur un horizon de 10 à 20 ans — précisément l'horizon
            d'une préparation retraite entamée à 45-50 ans — cette capitalisation sans imposition
            intermédiaire est un moteur puissant.
          </p>

          <h2>L'exonération après 5 ans</h2>
          <p>
            Passé le cinquième anniversaire du plan, les retraits sont exonérés d'impôt sur le
            revenu sur les plus-values ; seuls les prélèvements sociaux restent dus. Autrement dit,
            un PEA ouvert à 47 ans est fiscalement mûr bien avant la retraite — et chaque année qui
            passe renforce l'intérêt de l'avoir ouvert tôt, ne serait-ce que pour « prendre date »
            (ouvrir le plan au plus tôt, même avec un versement modeste, pour faire courir le
            délai fiscal de cinq ans).
          </p>

          <h2>Comment investir à l'intérieur d'un PEA : deux grandes voies</h2>
          <p>
            Ouvrir un PEA n'est que la moitié du chemin : l'enveloppe ne produit rien par
            elle-même, tout dépend de ce que l'on y loge. Pour un particulier qui prépare sa
            retraite, deux grandes voies existent — acheter des actions une à une, ou passer par
            des ETF. Elles ne s'excluent pas : beaucoup de portefeuilles bien construits combinent
            les deux, dans des proportions qui dépendent du temps disponible et de l'expérience de
            chacun.
          </p>

          <h3>Voie n° 1 : les actions en direct</h3>
          <p>
            Le principe : acheter soi-même des titres d'entreprises européennes éligibles au plan
            — une action représente une fraction du capital d'une entreprise —, en choisissant
            chaque société une par une. Les dividendes (la part du bénéfice qu'une entreprise
            décide de verser à ses actionnaires) sont encaissés à l'intérieur du plan et peuvent y
            être réinvestis sans aucun frottement fiscal : tant que l'argent reste dans le PEA, ni
            impôt sur le revenu ni prélèvements sociaux ne viennent amputer la capitalisation. Un
            point de vigilance méconnu tempère ce tableau : certaines grandes valeurs cotées à
            Paris ont leur siège social à l'étranger, et leurs dividendes subissent alors une
            retenue à la source étrangère — souvent entre 15 et 35 % (ordre de grandeur, variable
            selon les conventions fiscales entre États) — définitivement perdue dans un PEA.
          </p>
          <p>
            Cette voie exige trois choses : du temps, régulier et non négociable (suivre les
            résultats des sociétés, leurs valorisations, leur actualité) ; une méthode d'analyse
            et de décision, définie avant d'acheter et non après ; et une diversification
            suffisante. En dessous d'une dizaine de positions, le portefeuille reste dominé par le
            risque spécifique (le risque propre à une entreprise donnée : une déconvenue sur un
            seul titre suffit à peser lourdement sur l'ensemble). Un ordre de grandeur couramment
            admis : dix à vingt lignes au minimum, réparties sur plusieurs secteurs d'activité.
          </p>
          <p>
            <strong>Notre analyse.</strong> Un discours répandu sur les réseaux affirme que la
            sélection de titres serait une pratique dépassée, condamnée d'avance face aux indices.
            Cet argument est exact sur un point : sans temps, sans méthode et sans diversification,
            acheter des actions une à une s'apparente moins à de l'investissement qu'à un passage
            au casino. En revanche, en conclure que la sélection de titres est « morte » est un
            raccourci : elle reste praticable, mais elle se mérite. Pour la plupart des épargnants
            qui préparent leur retraite, les titres en direct ont vocation à rester un satellite —
            une poche secondaire, de taille maîtrisée — et non le cœur du portefeuille. Dernière
            mise au point : les « actions de bon père de famille » n'existent pas au sens garanti
            du terme. Aussi ancienne et solide qu'une société paraisse, son cours peut baisser
            durablement, et un capital investi en actions n'est jamais garanti.
          </p>
          <p>
            Côté espérance de gain, le repère disponible est celui des marchés dans leur ensemble :
            les indices actions mondiaux ont historiquement dégagé entre{" "}
            {pct(RENDEMENTS.ucActionsLongTerme.min)} et {pct(RENDEMENTS.ucActionsLongTerme.max)} par
            an ({RENDEMENTS.ucActionsLongTerme.periode}, dividendes réinvestis, avant frais et
            fiscalité — constat passé, non une projection). Mais ce repère vaut pour un marché
            entier : un portefeuille concentré de quelques titres peut s'en écarter très fortement,
            à la hausse comme à la baisse. Le niveau de risque est élevé, et les performances
            passées ne préjugent pas des performances futures.
          </p>

          <h3>Voie n° 2 : les ETF actions</h3>
          <p>
            Un ETF est un fonds coté en bourse qui se contente de répliquer un indice —
            c'est-à-dire un panier d'actions représentatif d'un marché entier, à l'image du CAC 40
            pour les grandes valeurs françaises — au lieu de rémunérer une équipe de gérants pour
            sélectionner des titres. Deux conséquences directes : une diversification immédiate
            (des centaines d'entreprises en un seul achat) et des frais réduits, de l'ordre de{" "}
            {pct(FRAIS_TYPES.etf.fraisCourants.min)} à{" "}
            {pct(FRAIS_TYPES.etf.fraisCourants.max)} par an pour les ETF les plus
            courants, contre {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.min)} à{" "}
            {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.max)} par an pour les fonds
            d'actions classiques en gestion active (ordres de grandeur constatés à la date de
            révision de nos hypothèses, {HYPOTHESES_MAJ} — à comparer support par support). Des
            frais faibles sont un avantage structurel mesurable ; ils ne garantissent pas pour
            autant, à eux seuls, une meilleure performance nette.
          </p>
          <p>
            <strong>Notre analyse.</strong> Le point de départ est un accord franc : pour la
            plupart des épargnants qui préparent leur retraite, un ETF largement diversifié
            constitue un cœur de portefeuille pertinent — simple, peu coûteux, efficace sur longue
            durée. En revanche, « passif » ne veut pas dire « sans réflexion ». Choisir un ETF,
            c'est d'abord choisir un indice, et ce choix est une décision d'investissement à part
            entière. Le MSCI World, malgré son nom, ne couvre que les pays développés et est
            aujourd'hui composé d'environ 70 % d'actions américaines (composition constatée à la
            révision de {HYPOTHESES_MAJ} des hypothèses du site), avec une forte concentration sur
            quelques géants technologiques ; le S&P 500 est, lui, exclusivement américain. Empiler
            plusieurs de ces ETF en croyant se diversifier revient souvent à acheter plusieurs fois
            les mêmes actions.
          </p>
          <p>
            Second point de réflexion, propre au PEA : la réplication synthétique. La
            réglementation impose au plan un quota de 75 % de titres d'entreprises européennes.
            Les ETF « monde » ou américains éligibles au PEA respectent cette règle en détenant
            réellement un panier d'actions européennes, dont ils échangent la performance contre
            celle de l'indice visé grâce à un contrat conclu avec une banque (c'est la
            « réplication synthétique »). Le mécanisme est éprouvé et encadré, mais il appelle deux
            remarques, sans alarmisme : il introduit un risque de contrepartie (la défaillance de
            la banque partenaire du contrat — risque réel quoique limité et réglementé), et il
            repose sur une tolérance réglementaire qui pourrait, en théorie, évoluer. Une piste de
            réflexion prudente : ne pas bâtir la totalité de son PEA sur des indices non européens
            via ce mécanisme, et conserver une part investie sur un indice européen large —
            d'autant que la cote européenne compte ses propres leaders mondiaux.
          </p>
          <p>
            Côté rendement, le repère est le même que pour les actions en direct : entre{" "}
            {pct(RENDEMENTS.ucActionsLongTerme.min)} et {pct(RENDEMENTS.ucActionsLongTerme.max)} par
            an pour les indices actions mondiaux ({RENDEMENTS.ucActionsLongTerme.periode},
            dividendes réinvestis, avant frais et fiscalité). Cette moyenne lisse des années très
            contrastées, y compris des années fortement négatives : le capital n'est jamais
            garanti, il fluctue à la hausse comme à la baisse, et les performances passées ne
            préjugent pas des performances futures.
          </p>

          <h3>Mesurer l'effet de la capitalisation : le simulateur</h3>
          <p>
            La force du PEA se joue sur la durée : des versements réguliers, des gains qui se
            recapitalisent sans imposition intermédiaire, puis une sortie après 5 ans où les
            plus-values sont exonérées d'impôt sur le revenu — seuls les prélèvements sociaux
            ({pct(FISCALITE.prelevementsSociaux.pea)} sur les gains, taux applicable au PEA depuis
            la LFSS 2026, en vigueur en {HYPOTHESES_MAJ}) restent dus. Le simulateur ci-dessous
            permet de visualiser cette
            mécanique : modifiez le versement, la durée, l'hypothèse de rendement et surtout les
            frais annuels — c'est un bon moyen de mesurer ce que des supports chargés en frais
            coûtent réellement sur vingt ans.
          </p>
          <SimulateurCapitalisation enveloppe="pea" />

          <h3>Actions en direct ou ETF : le comparatif</h3>
          <table>
            <thead>
              <tr>
                <th>Critère</th>
                <th>Actions en direct</th>
                <th>ETF actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temps à y consacrer</td>
                <td>Important et régulier : suivi des sociétés, des résultats, arbitrages</td>
                <td>Réduit : quelques points de contrôle par an</td>
              </tr>
              <tr>
                <td>Diversification</td>
                <td>À construire soi-même — dix à vingt lignes au minimum</td>
                <td>Immédiate : des centaines de valeurs en un seul achat</td>
              </tr>
              <tr>
                <td>Frais des supports</td>
                <td>Pas de frais de gestion annuels ; frais de courtage à chaque ordre, droits de garde éventuels selon l'établissement</td>
                <td>
                  {pct(FRAIS_TYPES.etf.fraisCourants.min)} à{" "}
                  {pct(FRAIS_TYPES.etf.fraisCourants.max)} par an pour les ETF courants
                  (vs {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.min)} à{" "}
                  {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.max)} pour les fonds
                  classiques)
                </td>
              </tr>
              <tr>
                <td>Risque principal</td>
                <td>Risque spécifique à chaque entreprise, erreurs de sélection</td>
                <td>Risque de marché sur l'ensemble de l'indice, concentration de l'indice choisi</td>
              </tr>
              <tr>
                <td>Pour quel profil</td>
                <td>Épargnant impliqué et disponible, en poche satellite</td>
                <td>Cœur de portefeuille pour la plupart des profils de long terme</td>
              </tr>
            </tbody>
          </table>
          <p>
            Dans les deux cas, le capital investi n'est pas garanti. Et les deux voies se
            combinent : un cœur d'ETF diversifiés complété d'une poche de titres choisis est une
            architecture fréquente chez les épargnants qui veulent rester acteurs de leur plan.
          </p>

          <div className="note">
            Le contenant compte autant que le contenu : à supports identiques, le même PEA peut
            coûter plusieurs fois plus cher selon l'établissement où il est ouvert. Notre guide
            détaillé <a href="/guide/pea-banque-ou-courtier">PEA : banque ou courtier ?</a> passe
            ces écarts en revue, poste par poste.
          </div>

          <h2>La rente viagère défiscalisée : l'option méconnue</h2>
          <p>
            C'est le point que presque personne ne connaît : après 5 ans, un PEA peut être converti
            en rente viagère (un revenu versé jusqu'au décès, en contrepartie de l'abandon
            définitif du capital), <strong>exonérée d'impôt sur le revenu</strong> (les
            prélèvements sociaux s'appliquent sur une fraction de la rente, dégressive avec
            l'âge). Pour qui recherche un revenu à vie, c'est une sortie fiscalement très
            favorable sur le papier — à mettre en regard de la perte du capital transmissible. Ce
            choix, irréversible, se pèse au cas par cas.
          </p>

          <h2>Le PEA et la succession : le point que presque personne ne regarde</h2>
          <p>
            Au décès de son titulaire, le PEA est automatiquement clôturé — c'est la règle, sans
            option ni exception. Les titres ne sont pas vendus d'office : ils sont transférés sur
            un compte-titres ordinaire (un compte d'investissement classique, sans avantage
            fiscal) au profit des héritiers. Mais l'enveloppe fiscale, elle, s'éteint
            définitivement, avec deux conséquences concrètes. D'une part, les prélèvements
            sociaux ({pct(FISCALITE.prelevementsSociaux.pea)}, taux applicable au PEA, en vigueur
            en {HYPOTHESES_MAJ}) deviennent exigibles sur les gains accumulés depuis l'ouverture
            du plan. D'autre part,
            le capital entre dans la masse successorale et supporte les droits de succession dans
            les conditions de droit commun — sans abattement spécifique comparable à celui de
            l'assurance-vie (152 500 € par bénéficiaire pour les versements effectués avant
            70 ans, barème en vigueur en {HYPOTHESES_MAJ}).
          </p>
          <p>
            <strong>Notre analyse.</strong> L'exonération après 5 ans est réelle, la rente
            défiscalisée aussi — sur ce point, rien à retrancher. Mais ces atouts ont un
            périmètre précis : ils ne bénéficient qu'au titulaire, de son vivant. Pour transmettre
            un capital, le PEA est nettement moins bien traité fiscalement que d'autres
            enveloppes, et le retenir dans cet objectif serait un contresens. La conclusion n'est
            pas de s'en détourner, au contraire : elle clarifie son rôle. Le PEA est une enveloppe
            à consommer de son vivant — capitaliser pendant la vie active, puis puiser dedans pour
            générer des revenus de retraite, le terrain où son régime fiscal est le plus efficace.
            Une piste de réflexion fréquente consiste d'ailleurs à puiser d'abord dans le PEA une
            fois à la retraite, et à préserver plus longtemps les enveloppes mieux traitées à la
            transmission, comme l'<a href="/strategies/assurance-vie-retraite">assurance-vie</a> ;
            l'ordre pertinent dépend toutefois de chaque situation patrimoniale et se détermine au
            cas par cas.
          </p>

          <h2>Le plafond</h2>
          <p>
            Les versements sur un PEA sont plafonnés à 150 000 € par personne (300 000 € pour un
            couple avec deux plans, et davantage via le PEA-PME — plan jumeau réservé aux titres
            de petites et moyennes entreprises, avec son propre plafond). Le capital, lui, peut croître
            au-delà sans limite : le plafond porte sur les versements, pas sur la valeur du plan.
          </p>

          <h2>Pour qui est-ce pertinent ?</h2>
          <ul>
            <li>Épargnants à horizon long (8 ans et plus), capables de tolérer les fluctuations ;</li>
            <li>Profils déjà dotés d'une épargne de précaution et d'une base sécurisée ;</li>
            <li>
              Contribuables dont la TMI (tranche marginale d'imposition — le taux d'impôt qui
              s'applique à la dernière tranche de vos revenus) rend la déduction PER peu
              intéressante, et qui cherchent
              une alternative fiscalement efficace.
            </li>
          </ul>

          <h2>Les limites — et elles sont réelles</h2>
          <ul>
            <li>
              <strong>Aucune garantie du capital</strong> : un PEA est investi en actions ; sa
              valeur fluctue, parfois fortement, et peut être en baisse au moment où vous auriez
              besoin des fonds ;
            </li>
            <li>
              <strong>La volatilité impose une discipline de sortie</strong> : sécuriser
              progressivement à l'approche de la retraite, plutôt que vendre en urgence au pire moment ;
            </li>
            <li>L'univers d'investissement est restreint aux titres européens éligibles ;</li>
            <li>Un retrait avant 5 ans entraîne en principe la clôture du plan ;</li>
            <li>
              La clôture automatique au décès en fait un outil mal adapté à la transmission (voir
              la section consacrée à la succession, plus haut).
            </li>
          </ul>

          <div className="note">
            Piste de réflexion : le PEA se pense rarement seul. Sa place dépend de ce que vos
            autres enveloppes couvrent déjà — c'est une question d'architecture globale, pas de
            produit isolé.
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="Le PEA a-t-il sa place dans votre architecture retraite ?" button="Prendre rendez-vous" />
    </>
  );
}
