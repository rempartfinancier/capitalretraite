import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { FRAIS_TYPES, FISCALITE, HYPOTHESES_MAJ, pct } from "../components/hypotheses.js";

export default function GuideMeilleurPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Notre position</span>
          <h1>Quel est le meilleur PER ? Pourquoi nous ne publions pas de classement</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> il n'existe pas de « meilleur PER » dans l'absolu — le bon
              contrat dépend de votre TMI, de votre horizon avant la retraite et de votre objectif
              (transmettre ou consommer ce capital). Nous ne publions donc pas de classement nommé ;
              à la place, cet article donne une grille de 8 critères vérifiables pour juger n'importe
              quel PER, le vôtre ou celui qu'on vous propose, par vous-même.
            </p>
          </div>

          <p>
            Vous cherchez « meilleur PER 2026 », ou une variante proche. C'est une recherche légitime :
            le PER (plan d'épargne retraite) engage votre épargne pour des années, et personne n'a envie
            de choisir au hasard. Voici ce que la plupart des classements en ligne ne vous diront pas — à
            commencer par la façon dont ils sont fabriqués. Et voici, à la place d'un nom de contrat, la
            grille qui permet de juger n'importe lequel par vous-même.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#fabrication">Comment naissent les classements « meilleur PER »</a></li>
              <li><a href="#nexiste-pas">Pourquoi « le meilleur PER » n'existe pas dans l'absolu</a></li>
              <li><a href="#grille">La grille : 8 critères pour juger n'importe quel PER vous-même</a></li>
              <li><a href="#position">Notre position assumée</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
            </ol>
          </div>

          <h2 id="fabrication">1. Comment naissent les classements « meilleur PER »</h2>
          <p>
            Un classement gratuit, accessible en deux clics, sans email ni rendez-vous, se finance
            rarement tout seul. Le modèle économique le plus répandu est le lien d'affiliation : le site
            qui publie le palmarès touche une commission lorsque vous souscrivez un contrat via son lien.
            Ce n'est pas nécessairement malhonnête — cela peut coexister avec un travail sérieux — mais
            cela oriente mécaniquement le résultat vers les contrats qui rémunèrent le mieux le site, pas
            nécessairement vers ceux qui conviennent le mieux à votre situation.
          </p>
          <p>
            Un deuxième mécanisme, moins visible, est le partenariat commercial direct entre l'éditeur du
            classement et un ou plusieurs distributeurs de PER : mise en avant contractuelle, encart
            sponsorisé présenté comme un article, place garantie dans le « top 3 ». Un troisième biais,
            plus subtil encore, tient à la méthode elle-même : beaucoup de classements réduisent la
            comparaison aux seuls frais affichés — souvent les frais de gestion annuels, parfois les
            frais sur versement — en ignorant la qualité des supports, la rigidité de la gestion pilotée
            par défaut, ou le régime successoral du contrat. Deux PER peuvent afficher les mêmes frais de
            gestion et produire, à l'arrivée, des résultats très différents.
          </p>
          <p>
            Nous ne visons personne nommément : ce mécanisme est général et documenté, pas propre à tel
            ou tel éditeur. Mais il justifie une règle de lecture simple, valable pour n'importe quel
            classement trouvé en ligne : demandez toujours comment il est financé et sur quels critères
            il est construit, avant de lui accorder votre confiance.
          </p>

          <h2 id="nexiste-pas">2. Pourquoi « le meilleur PER » n'existe pas dans l'absolu</h2>
          <p>
            Même construit sans le moindre conflit d'intérêts, un classement se heurterait à un obstacle
            plus fondamental : le bon contrat dépend de votre situation, pas d'un score agrégé. Votre TMI
            (tranche marginale d'imposition — le taux qui frappe vos derniers euros de revenu) détermine
            l'ampleur réelle de l'avantage fiscal à l'entrée. Votre horizon avant la retraite conditionne
            le niveau de risque que vous pouvez raisonnablement prendre sur les supports. Et votre
            objectif — transmettre un capital à vos proches, ou au contraire consommer cette épargne vous-
            même le moment venu — pointe souvent vers des contrats structurellement différents. Notre page{" "}
            <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER ?</a> aide à clarifier ce premier
            arbitrage, en amont même du choix d'un contrat.
          </p>
          <p>
            Un excellent PER pour transmettre — assurantiel, doté d'une clause bénéficiaire (la clause qui
            désigne qui recevra le capital en cas de décès) rédigée avec soin — n'est pas le même contrat
            qu'un excellent PER pour capitaliser à frais minimaux en vue d'une consommation personnelle à
            la retraite. Un classement unique, qui attribue une note globale et désigne un vainqueur,
            gomme nécessairement cette différence d'objectif. Il répond à une question qui n'est pas la
            vôtre.
          </p>
          <p>
            S'ajoute une raison qui nous concerne directement : nous exerçons un métier réglementé.
            Recommander un contrat précis à une personne précise relève d'un conseil personnalisé,
            adossé à l'analyse de sa situation patrimoniale et fiscale complète — pas d'un article
            accessible à tous, dans lequel nous ignorons tout de votre TMI, de votre âge, de votre
            patrimoine existant ou de vos objectifs de transmission. Publier malgré tout un palmarès
            reviendrait à donner un conseil sans connaître son destinataire.
          </p>

          <h2 id="grille">3. La grille : 8 critères pour juger n'importe quel PER vous-même</h2>
          <p>
            Voici, dans l'ordre où nous les vérifions lors d'un audit, les huit critères qui permettent de
            juger sérieusement un PER — le vôtre, ou celui qu'on vous propose — sans avoir besoin d'un
            nom de contrat pour trancher.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Où le vérifier</th>
                  <th>Pourquoi ça compte</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Assurantiel ou bancaire ?</td>
                  <td>Auprès de qui le contrat est ouvert (assureur ou établissement bancaire)</td>
                  <td>
                    Conditionne tout le régime successoral : un PER assurantiel ouvre droit, en cas de
                    décès avant 70 ans, à un abattement de 152 500 € par bénéficiaire désigné (barème
                    en vigueur en {HYPOTHESES_MAJ}), le même principe qu'en assurance-vie ; un PER
                    bancaire fonctionne comme un compte-titres, sans abattement propre à l'enveloppe.
                  </td>
                </tr>
                <tr>
                  <td>Frais sur versements</td>
                  <td>Grille tarifaire du contrat, à négocier notamment en réseau</td>
                  <td>
                    Couramment {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.max)} en réseau traditionnel,
                    contre {pct(FRAIS_TYPES.contratInternet.entree.max)} le plus souvent en ligne
                    (ordres de grandeur révisés en {HYPOTHESES_MAJ}) — un point de départ qui pèse sur
                    chaque versement, avant même toute performance.
                  </td>
                </tr>
                <tr>
                  <td>Frais de gestion annuels</td>
                  <td>Document d'informations clés (DIC) ou conditions générales</td>
                  <td>
                    De l'ordre de {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.min)} à{" "}
                    {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.max)} sur un contrat en ligne
                    compétitif, jusqu'à {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min)}{" "}
                    à {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)} en réseau
                    traditionnel (révisé en {HYPOTHESES_MAJ}) : prélevés chaque année sur tout l'encours,
                    l'écart pèse lourd sur quinze ou vingt ans de versements.
                  </td>
                </tr>
                <tr>
                  <td>Frais et qualité des supports</td>
                  <td>Liste des supports disponibles et leurs frais courants (DIC de chaque fonds)</td>
                  <td>
                    Un ETF affiche des frais courants de l'ordre de{" "}
                    {pct(FRAIS_TYPES.etf.fraisCourants.min)} à {pct(FRAIS_TYPES.etf.fraisCourants.max)}{" "}
                    par an, contre {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.min)} à{" "}
                    {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.max)} pour un fonds actions
                    classique de gestion active (révisé en {HYPOTHESES_MAJ}) : un univers limité à des
                    fonds « maison » chargés ferme la porte à une part importante de l'optimisation.
                  </td>
                </tr>
                <tr>
                  <td>Gestion pilotée par défaut et liberté d'en sortir</td>
                  <td>Convention de gestion pilotée annexée au contrat</td>
                  <td>
                    Sauf choix contraire, l'épargne est investie en gestion pilotée à horizon, avec un
                    surcoût de mandat de l'ordre de {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à{" "}
                    {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)} par an (révisé en {HYPOTHESES_MAJ}) :
                    ce n'est pas la sécurisation progressive qui pose question, mais sa standardisation,
                    son coût, et la facilité — ou non — d'en sortir.
                  </td>
                </tr>
                <tr>
                  <td>Modalités de sortie</td>
                  <td>Conditions générales, chapitre « dénouement » ou « sortie »</td>
                  <td>
                    Sortie en capital (en une fois ou fractionnée) ou rente viagère de fait imposée :
                    cela conditionne directement votre marge de manœuvre fiscale au moment du
                    déblocage.
                  </td>
                </tr>
                <tr>
                  <td>Clause bénéficiaire</td>
                  <td>Formulaire de clause bénéficiaire du contrat assurantiel</td>
                  <td>
                    Rédaction libre ou formule type imposée : une clause figée, jamais adaptée à
                    l'évolution de votre situation familiale, peut neutraliser une partie de l'avantage
                    successoral du premier critère.
                  </td>
                </tr>
                <tr>
                  <td>Solidité et service de l'assureur</td>
                  <td>Rapports de solvabilité publics, avis clients, réactivité du service en ligne</td>
                  <td>
                    Ne se lit sur aucune grille tarifaire, mais conditionne l'expérience réelle du
                    contrat sur plusieurs décennies.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Cette grille est aussi celle que nous appliquons dans notre analyse détaillée des frais et de
            la gestion pilotée d'un PER, à lire sur{" "}
            <a href="/guide/per-bancaire-frais-gestion-horizon">PER bancaire : frais, gestion à horizon, supports maison</a>{" "}
            si votre contrat a été ouvert en réseau et que vous voulez creuser les trois premiers
            critères ci-dessus en détail, et elle prolonge la réflexion posée dans notre page{" "}
            <a href="/strategies/per">la stratégie PER</a>, qui replace le choix d'un contrat dans la
            construction plus large de votre épargne retraite.
          </p>

          <div className="note">
            <p>
              Un dernier repère utile, valable pour tout type d'enveloppe et pas seulement le PER : les
              prélèvements sociaux (CSG, CRDS et contributions annexes appliqués aux revenus du capital)
              s'élèvent à {pct(FISCALITE.prelevementsSociaux.per)} sur les gains d'un PER depuis la LFSS
              2026 (barème en vigueur en {HYPOTHESES_MAJ}). Ce taux s'applique quel que soit le contrat
              choisi : il ne fait donc partie d'aucun critère de comparaison entre PER, mais il doit
              entrer dans tout calcul de rendement net.
            </p>
          </div>

          <h2 id="position">4. Notre position assumée</h2>
          <p>
            Nous ne publions pas de palmarès « meilleur PER ». Non par manque d'avis — nous analysons des
            contrats de PER chaque semaine — mais parce qu'un classement générique répondrait à une
            question que vous ne posez pas tout à fait : la vôtre porte sur le contrat qui convient à
            votre TMI, à votre horizon et à votre objectif de transmission ou de consommation, pas sur un
            score moyen valable pour tout le monde et personne en particulier.
          </p>
          <p>
            Ce que nous faisons à la place : nous analysons votre contrat existant, ou celui qu'on vous
            propose, critère par critère, à l'aide de la grille ci-dessus — et nous la confrontons à votre
            situation réelle. C'est exactement l'objet du{" "}
            <a href="/bilan-retraite">bilan retraite</a> que nous proposons : reprendre votre PER actuel
            (ou le projet de contrat qu'on vous soumet), point par point, plutôt que de vous renvoyer vers
            un nom tiré d'un classement dont vous ne connaîtrez jamais vraiment le mode de financement.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Existe-t-il quand même des labels ou certifications qui garantissent la qualité d'un PER ?</h3>
          <p>
            Il existe des labels professionnels et des certifications qui attestent du respect de
            certains critères (transparence des frais, qualité de l'information précontractuelle), mais
            aucun ne garantit une performance ni ne remplace l'examen des huit critères ci-dessus pour
            votre situation personnelle. Un label est un indice, pas une conclusion.
          </p>
          <h3>Un PER individuel et un PER d'entreprise s'évaluent-ils avec la même grille ?</h3>
          <p>
            Oui dans l'ensemble : les huit critères s'appliquent aux deux. La différence tient surtout à
            la marge de choix — un PER d'entreprise collectif propose souvent un nombre restreint de
            contrats négociés par l'employeur, ce qui limite la comparaison possible, alors qu'un PER
            individuel s'ouvre auprès de l'établissement de votre choix.
          </p>
          <h3>Peut-on changer de PER en cours de route si le contrat déçoit ?</h3>
          <p>
            Oui, un transfert vers un autre PER reste possible à tout moment, moyennant des frais de
            transfert encadrés qui diminuent avec l'ancienneté du contrat. Ce transfert conserve
            l'antériorité fiscale acquise ; il ne fait en revanche pas disparaître les frais de gestion
            déjà supportés jusque-là.
          </p>
          <h3>La grille de 8 critères s'applique-t-elle aussi bien à un PER bancaire qu'assurantiel ?</h3>
          <p>
            Oui, les huit critères s'appliquent aux deux familles de contrats. Le premier critère
            (assurantiel ou bancaire) détermine simplement lequel des sept autres pèse le plus : le
            régime successoral et la clause bénéficiaire ne concernent, par construction, que les PER
            assurantiels.
          </p>
          <h3>Un PER avec des frais de gestion plus élevés peut-il rester un bon choix ?</h3>
          <p>
            Oui, si ce qu'il finance en contrepartie — accompagnement, univers de supports plus large,
            options de sortie plus souples — apporte davantage de valeur que ce qu'il coûte pour votre
            situation. C'est précisément pour éviter de réduire la décision au seul niveau de frais que
            cette grille comporte huit critères, et non un seul.
          </p>
          <h3>Faut-il se méfier d'un PER qui n'a que quelques supports au catalogue ?</h3>
          <p>
            Un catalogue restreint n'est pas disqualifiant en soi si les quelques supports proposés sont
            de qualité et à frais raisonnables, mais il mérite une vigilance particulière : il ferme
            l'accès à une diversification plus fine et peut signaler un univers dominé par des fonds
            « maison » chargés, comme évoqué au quatrième critère du tableau.
          </p>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement personnalisé :
              chaque situation (TMI, horizon, objectifs de transmission ou de consommation) doit faire
              l'objet d'une étude individuelle. Les montants, abattements et taux cités sont les barèmes
              en vigueur en {HYPOTHESES_MAJ}, susceptibles d'évoluer à chaque loi de finances ; les frais
              indiqués sont des ordres de grandeur constatés sur le marché, à vérifier contrat par contrat.
            </p>
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
