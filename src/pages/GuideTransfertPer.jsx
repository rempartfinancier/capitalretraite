import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { HYPOTHESES_MAJ } from "../components/hypotheses.js";

const TRANSFERTS = [
  {
    depart: "PER individuel (banque, assureur, courtier en ligne)",
    arrivee: "Autre PER individuel",
    point: "Le cas le plus simple : frais de transfert encadrés, antériorité du plan conservée.",
  },
  {
    depart: "Ancien contrat retraite (PERP, contrat Madelin, article 83)",
    arrivee: "PER individuel",
    point: "Possible, mais les garanties de l'ancien contrat (taux, rente, clauses) sont à comparer avant de les abandonner.",
  },
  {
    depart: "Plan d'épargne retraite collectif (ex-PERCO, PER d'entreprise)",
    arrivee: "PER individuel",
    point: "Les conditions dépendent du type de versements et de votre situation dans l'entreprise : à confirmer auprès du gestionnaire.",
  },
];

export default function GuideTransfertPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Changer de PER sans perdre son avantage</span>
          <h1>Transfert de PER : frais, délais et pièges avant de changer de contrat</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> un PER peut être transféré vers un autre PER, et ce
              transfert ne fait pas perdre l'ancienneté fiscale du plan : ce n'est ni un retrait ni
              un nouveau versement, il n'a donc pas de conséquence sur l'impôt de l'année. Les frais
              de transfert sont plafonnés par la loi et deviennent nuls après cinq ans de détention
              (règles en vigueur en {HYPOTHESES_MAJ}, à vérifier). Le coût réel d'un transfert est
              ailleurs : la vente des supports pendant le transit, la perte éventuelle de garanties
              sur un ancien contrat, et le risque de transférer vers un contrat qui n'est pas moins
              cher. La bonne question n'est donc pas « puis-je transférer ? » mais « qu'est-ce que
              je gagne, chiffres en main, en changeant ? ».
            </p>
          </div>

          <p>
            Beaucoup de détenteurs de PER découvrent, à la lecture de leur relevé annuel, des frais
            de gestion plus élevés qu'ils ne l'imaginaient, des supports maison peu convaincants ou
            une gestion pilotée qu'ils n'ont jamais choisie. L'idée de « changer de contrat » vient
            vite — et se heurte à une inquiétude tout aussi vite : va-t-on perdre l'avantage fiscal
            déjà acquis ?
          </p>
          <p>
            Notre analyse : le transfert est un outil légitime, et la loi le protège volontairement.
            Mais il ne vaut que s'il améliore réellement la situation, et plusieurs pièges, rarement
            évoqués par ceux qui ont intérêt à vous accueillir, peuvent transformer un transfert bien
            intentionné en mauvaise opération.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#cas">Quels transferts sont possibles ?</a></li>
              <li><a href="#conserve">Ce que le transfert conserve</a></li>
              <li><a href="#frais">Les frais de transfert</a></li>
              <li><a href="#pieges">Les pièges à vérifier avant de signer</a></li>
              <li><a href="#quand">Quand le transfert vaut-il la peine ?</a></li>
              <li><a href="#demarches">Les démarches et les délais</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="cas">Quels transferts sont possibles ?</h2>
          <p>
            Le plan d'épargne retraite (PER) a été conçu pour que l'épargnant ne soit pas prisonnier
            de son premier choix d'établissement. Le tableau ci-dessous résume les principaux cas.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Point de départ</th>
                  <th>Point d'arrivée</th>
                  <th>À retenir</th>
                </tr>
              </thead>
              <tbody>
                {TRANSFERTS.map((ligne) => (
                  <tr key={ligne.depart}>
                    <td>{ligne.depart}</td>
                    <td>{ligne.arrivee}</td>
                    <td>{ligne.point}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Dans tous les cas, c'est le gestionnaire du plan d'arrivée qui pilote la demande. Les
            modalités précises varient selon le type de plan et la nature des versements : elles
            doivent être confirmées par écrit avant d'engager l'opération.
          </p>

          <h2 id="conserve">Ce que le transfert conserve</h2>
          <p>
            Le transfert d'un PER vers un autre n'est pas fiscalement assimilé à un retrait : vous ne
            déclarez rien, et les versements que vous avez déduits de votre revenu imposable ne sont
            pas réintégrés. L'ancienneté du plan est conservée, de même que la ventilation de
            l'encours entre ses compartiments (versements volontaires, versements issus de
            l'épargne salariale, versements obligatoires). Cette ventilation compte pour la suite :
            c'est elle qui détermine ce qui sera débloquable en cas d'accident de la vie, comme nous
            l'expliquons dans notre guide sur le{" "}
            <a href="/guide/deblocage-anticipe-per">déblocage anticipé du PER</a>, et la fiscalité à
            la sortie, détaillée dans notre guide{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a>.
          </p>
          <p>
            Ce que le transfert ne conserve pas en revanche, c'est la position de votre épargne sur
            les marchés : le transfert s'effectue en pratique en numéraire, les supports du contrat
            de départ étant vendus avant que les sommes ne soient réinvesties sur le contrat
            d'arrivée.
          </p>

          <h2 id="frais">Les frais de transfert</h2>
          <p>
            Les frais prélevés par l'établissement de départ en cas de transfert sont plafonnés par
            la loi, et deviennent nuls au-delà de cinq ans de détention du plan (règles en vigueur
            en {HYPOTHESES_MAJ}, susceptibles d'évoluer et à vérifier dans les conditions générales
            de votre contrat). Ce plafond ne garantit pas pour autant que le transfert soit gratuit
            avant cette échéance, et il ne concerne que les frais de transfert eux-mêmes — pas les
            frais d'entrée ou de versement que pourrait appliquer le nouvel établissement.
          </p>
          <p>
            Pour mesurer ce que le changement peut rapporter, la comparaison utile n'est pas « frais
            de transfert contre rien », mais « frais de transfert plus frais futurs du nouveau
            contrat, contre frais futurs du contrat actuel ». Notre guide{" "}
            <a href="/guide/combien-coute-un-per">combien coûte un PER</a> détaille les quatre
            couches de frais à additionner pour faire cette comparaison honnêtement.
          </p>

          <h2 id="pieges">Les pièges à vérifier avant de signer</h2>
          <h3>1. Le temps passé hors marché</h3>
          <p>
            Entre la vente des supports du contrat de départ et le réinvestissement sur le nouveau,
            votre épargne n'est exposée ni à la hausse ni à la baisse. Selon les établissements, ce
            laps de temps peut aller de quelques jours à plusieurs semaines. Sur un encours investi
            en unités de compte, c'est un risque réel dans les deux sens, à intégrer à la décision.
          </p>
          <h3>2. Les garanties d'un ancien contrat</h3>
          <p>
            Un contrat ancien (PERP, contrat Madelin, article 83) peut comporter des garanties qui ne
            se retrouvent pas dans un PER actuel : conditions de conversion en rente, bonifications,
            clauses de revalorisation. Les abandonner pour gagner quelques dixièmes de point de
            frais peut être une mauvaise affaire. À examiner avant de signer, document contractuel
            en main.
          </p>
          <h3>3. Un transfert vers un contrat qui n'est pas moins cher</h3>
          <p>
            Le piège classique : un distributeur propose de « reprendre » votre PER et d'en réduire
            les frais, mais le contrat d'arrivée comporte des frais sur versements, une gestion
            pilotée par défaut ou une gamme de supports maison. La grille d'analyse de notre guide{" "}
            <a href="/guide/per-bancaire-frais-gestion-horizon">PER bancaire : frais, gestion à
            horizon, supports maison</a> s'applique tout autant au contrat d'arrivée qu'à celui de
            départ.
          </p>
          <h3>4. L'abondement de l'employeur sur un plan collectif</h3>
          <p>
            Si vous alimentez encore un plan collectif qui bénéficie d'un abondement de votre
            employeur, le quitter ou le laisser s'éteindre revient à renoncer à de l'argent que
            personne d'autre ne vous versera. Le transfert est alors rarement la bonne première
            étape.
          </p>
          <h3>5. Le fonds en euros qui disparaît</h3>
          <p>
            Certains contrats d'arrivée n'offrent pas de fonds en euros, ou l'assortissent de
            conditions d'accès. Si votre allocation actuelle en dépend, vérifiez que le nouveau
            contrat vous permet de la reproduire. Ne confondez pas supports garantis et unités de
            compte : leur régime de risque n'est pas le même.
          </p>

          <h2 id="quand">Quand le transfert vaut-il la peine ?</h2>
          <p>
            Notre analyse : un transfert se justifie en général lorsque trois conditions sont réunies.
            Les frais de gestion du contrat actuel sont clairement plus élevés que ceux d'une
            alternative comparable. Le contrat n'offre pas de garantie particulière que vous perdriez
            en le quittant. Et les frais de transfert — nuls ou faibles — sont rapidement amortis par
            l'économie de frais annuelle. À l'inverse, un contrat récent, en cours de période de frais
            de transfert, ou comportant des garanties anciennes, appelle à la prudence. Ces éléments
            sont des pistes de réflexion, pas une règle.
          </p>
          <p>
            Précisons aussi que changer de contrat ne règle pas la question de savoir si le PER
            reste adapté à votre situation : l'horizon, la liquidité et la transmission décident de
            cela, comme nous l'expliquons dans{" "}
            <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER</a>.
          </p>

          <h2 id="demarches">Les démarches et les délais</h2>
          <p>
            La demande de transfert se fait auprès du nouvel établissement, qui se charge de
            réclamer les fonds à l'ancien. Le dossier comprend généralement le formulaire du nouvel
            établissement, une pièce d'identité, les références du contrat de départ et, le cas
            échéant, la répartition de l'encours par compartiment. L'ancien gestionnaire dispose
            d'un délai réglementaire pour exécuter le transfert, de l'ordre de quelques semaines
            (délai précis à vérifier), auquel s'ajoute le temps de réinvestissement. Demandez à
            l'établissement d'arrivée de vous indiquer son calendrier prévisionnel par écrit.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Perd-on l'avantage fiscal déjà obtenu en transférant son PER ?</h3>
          <p>
            Non. Le transfert d'un PER vers un autre PER n'est pas un retrait : les versements déduits
            ne sont pas réintégrés au revenu imposable et l'ancienneté du plan est conservée.
          </p>
          <h3>Peut-on transférer un PER après la retraite ?</h3>
          <p>
            Le sujet dépend de la forme de sortie choisie et de l'avancement de la liquidation du
            plan. Une fois une rente mise en service, les possibilités sont très encadrées : la
            question doit être posée directement au gestionnaire.
          </p>
          <h3>Peut-on transférer un PER bancaire vers un PER assurantiel, et inversement ?</h3>
          <p>
            Oui, le transfert entre familles de PER est prévu par la loi. Comparez alors les frais et
            la gamme de supports des deux familles, détaillés dans notre guide{" "}
            <a href="/guide/quel-est-le-meilleur-per">quel est le meilleur PER</a>.
          </p>
          <h3>Le transfert est-il imposable ?</h3>
          <p>
            Le transfert lui-même ne déclenche pas d'impôt sur le revenu. Ce sont les retraits ou la
            sortie, ultérieurs, qui seront taxés selon les règles décrites dans notre guide sur la
            fiscalité de sortie.
          </p>
          <h3>Un indépendant peut-il transférer son contrat Madelin vers un PER ?</h3>
          <p>
            C'est possible. Les enjeux (garanties, déduction, régime social) sont traités dans notre
            guide{" "}
            <a href="/guide/retraite-independants-per-ou-madelin">retraite des indépendants : PER ou Madelin</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le transfert de PER est une soupape utile et protégée par la loi : il n'est ni imposable
            ni destructeur de l'ancienneté du plan. Mais il n'est pas une fin en soi. La décision se
            prend en comparant, chiffres en main, le coût total du contrat actuel et celui du contrat
            d'arrivée, en tenant compte du temps hors marché, des garanties éventuellement
            abandonnées et de l'abondement employeur. Un transfert décidé sur un argument commercial
            plutôt que sur cette comparaison peut coûter plus qu'il ne rapporte.
          </p>
          <p>
            C'est précisément l'exercice que nous menons dans un{" "}
            <a href="/bilan-retraite">bilan retraite</a> : relire les frais réels de vos contrats,
            repérer ceux qui méritent d'être revus, et vérifier que l'alternative envisagée tient
            réellement ses promesses. Notre page{" "}
            <a href="/strategies/per">stratégie PER</a> replace l'enveloppe dans une vue d'ensemble.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle, et les
              modalités de transfert varient d'un contrat à l'autre. Les règles citées sont celles
              en vigueur en {HYPOTHESES_MAJ}, susceptibles d'évoluer et à vérifier avant toute
              décision. Les performances passées ne préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Un PER à auditer avant de le transférer ?"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
