import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { FISCALITE, HYPOTHESES_MAJ, euros, pct } from "../components/hypotheses.js";

export default function GuidePerOuImmobilier() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Comparatif retraite</span>
          <h1>PER ou immobilier locatif : lequel privilégier pour transmettre ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le PER assurantiel offre une transmission simple et
              bornée par la loi — un abattement dédié par bénéficiaire, sans indivision ni acte
              notarié à prévoir. L'immobilier locatif à crédit offre, lui, un effet de levier
              puissant pendant la vie active, sécurisé par une assurance emprunteur qui solde tout
              ou partie du prêt en cas de décès — mais sa transmission est plus complexe à
              organiser, entre indivision entre héritiers, liquidité faible et fiscalité
              successorale classique. Les deux outils sont, dans la plupart des cas, complémentaires
              plutôt que concurrents.
            </p>
          </div>

          <p>
            La question revient souvent en rendez-vous, formulée presque toujours de la même
            façon : « Je peux ouvrir un PER ou investir dans un bien locatif, qu'est-ce qui
            protège le mieux ma famille ? » La question part d'une bonne intuition — les deux
            outils servent, entre autres choses, à transmettre — mais elle repose sur deux
            mécaniques presque opposées : l'une s'appuie sur un cadre fiscal fixé par la loi,
            l'autre sur un effet de levier bancaire. Notre analyse tient en une phrase : le PER
            (plan d'épargne retraite) assurantiel offre une transmission simple et bornée par la
            loi ; l'immobilier locatif offre un effet de levier puissant pendant la vie active,
            mais une transmission plus complexe à organiser. La suite détaille chaque mécanique,
            puis les compare chiffre par chiffre.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#per-transmission">Le PER assurantiel comme outil de transmission</a></li>
              <li><a href="#immo-transmission">L'immobilier comme outil de transmission</a></li>
              <li><a href="#tableau">Le comparatif en un tableau</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#analyse">Notre analyse : deux outils complémentaires, pas concurrents</a></li>
            </ol>
          </div>

          <h2 id="per-transmission">Le PER assurantiel comme outil de transmission</h2>
          <p>
            Le PER (plan d'épargne retraite) n'a pas été conçu au départ comme un outil de
            transmission — sa vocation première est de préparer un revenu à la retraite. Mais
            dans notre analyse, sa mécanique de décès est l'un des points les plus mal connus des
            épargnants, et l'un des plus favorables lorsqu'un titulaire disparaît avant d'avoir
            liquidé son plan.
          </p>
          <p>
            Trois règles gouvernent cette mécanique, réservée au PER <strong>assurantiel</strong>{" "}
            (souscrit auprès d'un assureur — c'est le cas de la majorité des PER individuels). La
            première : si le titulaire décède avant d'avoir liquidé son PER, la déduction fiscale
            obtenue à l'entrée sur ses versements devient définitivement acquise — elle n'est
            jamais réintégrée au revenu imposable, contrairement à ce qui se passe lors d'une
            sortie classique à la retraite. La deuxième : les capitaux transmis bénéficient d'un
            abattement de cent cinquante-deux mille cinq cents euros par bénéficiaire si le
            titulaire décède avant ses soixante-dix ans (barème en vigueur en{" "}
            {HYPOTHESES_MAJ}) — et c'est bien l'âge <strong>au moment du décès</strong> qui
            compte, pas la date à laquelle les versements ont été effectués. Passé ce seuil,
            l'abattement tombe à trente mille cinq cents euros pour l'ensemble des bénéficiaires
            (même référence). La troisième, plus discrète : les gains transmis échappent aux
            prélèvements sociaux (l'ensemble CSG-CRDS appliqué aux revenus du capital), avant
            comme après soixante-dix ans.
          </p>
          <div className="note">
            <p>
              Cette mécanique ne concerne que le PER assurantiel. Un PER bancaire — ou la plupart
              des PER collectifs d'entreprise — fonctionne comme un compte-titres : au décès, tout
              entre dans la masse successorale, sans abattement dédié. Vérifier la nature de son
              plan est la première chose à faire avant de raisonner en termes de transmission.
            </p>
          </div>
          <p>
            Ce qui rend le PER simple à activer comme outil de transmission, c'est qu'il ne
            demande aucune ingénierie particulière : verser sur le contrat et désigner des
            bénéficiaires dans la clause bénéficiaire suffit à enclencher ce cadre fiscal. Aucun
            acte notarié, aucune société à créer, aucune répartition à négocier entre héritiers —
            l'assureur applique le barème légal au moment du décès. Notre page{" "}
            <a href="/strategies/per">la stratégie PER</a> détaille l'ensemble de la mécanique,
            versements et sortie compris.
          </p>
          <p>
            La contrepartie est connue et ne concerne pas la transmission, mais la disponibilité :
            de son vivant, le titulaire ne peut pas reprendre la main sur ce capital avant la
            retraite, hors cas de déblocage anticipé prévus par la loi (accidents de la vie, achat
            de la résidence principale). Le PER protège la famille en cas de décès prématuré ;
            il n'offre en revanche aucune souplesse tant que le titulaire est vivant et actif. Le
            guide <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER ?</a> aide à
            évaluer si cette contrainte est compatible avec votre situation.
          </p>

          <h2 id="immo-transmission">L'immobilier comme outil de transmission</h2>
          <p>
            L'immobilier locatif emprunte un chemin radicalement différent. Sa force de
            transmission ne vient pas d'un abattement fiscal dédié, mais de l'effet de levier du
            crédit : lorsqu'un investisseur finance un bien à crédit, il souscrit presque toujours
            une assurance emprunteur qui solde tout ou partie du capital restant dû en cas de
            décès. Selon la quotité assurée retenue au moment de la souscription — un choix qui
            peut être inférieur à 100 % du capital emprunté, notamment entre coemprunteurs —, les
            héritiers reçoivent alors un bien immobilier partiellement ou intégralement financé,
            sans nécessairement avoir eu à en rembourser la part couverte. C'est, dans notre
            analyse, l'atout de transmission le plus sous-estimé de l'immobilier à crédit : la
            protection ne s'active pas au terme du prêt, elle joue précisément pendant la période
            où le titulaire est encore en train de rembourser. Cette protection n'est toutefois ni
            automatique ni illimitée : l'assurance emprunteur comporte des questionnaires
            médicaux, d'éventuelles exclusions de garantie selon l'état de santé ou l'âge à la
            souscription, et des plafonds de capital assurable au-delà desquels une surprime ou un
            refus d'assurance peuvent s'appliquer — des points à vérifier avant de considérer cette
            protection comme acquise dans tous les cas. Notre page{" "}
            <a href="/strategies/immobilier-retraite">l'immobilier dans la stratégie retraite</a>{" "}
            revient sur cet effet de levier en détail.
          </p>
          <p>
            Une autre voie existe pour préparer la transmission d'un bien immobilier : le
            démembrement de propriété, qui consiste à séparer la nue-propriété (le droit de
            disposer du bien, sans en percevoir les revenus) de l'usufruit (le droit d'en percevoir
            les loyers ou de l'occuper). En transmettant la nue-propriété d'un bien tout en
            conservant l'usufruit de son vivant, un propriétaire peut anticiper une transmission
            tout en gardant l'usage ou les revenus du bien. C'est une ingénierie patrimoniale
            réelle et fréquemment utilisée, mais sa mécanique fiscale précise — barème de l'usufruit
            selon l'âge, articulation avec les abattements de donation — dépend de nombreux
            paramètres propres à chaque situation ; elle s'étudie au cas par cas avec un
            professionnel, et nous nous garderons ici d'en détailler le calcul. Les fiches
            pratiques de{" "}
            <a href="https://www.notaires.fr/fr/donation-succession/succession/le-demembrement-de-propriete" target="_blank" rel="noopener noreferrer">
              notaires.fr sur le démembrement de propriété
            </a>{" "}
            posent les bases de ce mécanisme, à affiner ensuite avec un professionnel.
          </p>
          <p>
            Mais l'immobilier en direct porte aussi des contraintes que le PER ignore
            complètement. D'abord la gestion à plusieurs héritiers : un bien immobilier ne se
            partage pas aussi facilement qu'un capital financier. Lorsque plusieurs enfants
            héritent d'un même bien, ils se retrouvent en indivision (une situation juridique où
            plusieurs personnes détiennent ensemble un bien sans qu'aucune part ne soit
            physiquement délimitée) — chaque décision, de la vente à un simple ravalement de
            façade, doit alors faire l'objet d'un accord entre indivisaires, ce qui peut geler la
            situation pendant des années en cas de désaccord. La fiche{" "}
            <a href="https://www.service-public.fr/particuliers/vosdroits/F32744" target="_blank" rel="noopener noreferrer">
              service-public.fr sur l'indivision
            </a>{" "}
            détaille les règles de majorité applicables à ces décisions. Ensuite la liquidité : un bien
            immobilier ne se vend pas en quelques jours comme on solde un contrat d'assurance-vie
            ou de PER, ce qui peut poser problème si la succession a besoin de trésorerie rapide,
            pour régler des droits par exemple. Enfin la fiscalité successorale : un bien transmis
            en direct suit le régime classique des droits de succession, sans abattement dédié
            comparable à celui du PER — seuls les abattements généraux en ligne directe
            s'appliquent. Des structurations existent pour améliorer cette situation, notamment
            loger le bien dans une SCI (société civile immobilière, qui permet de transmettre des
            parts sociales plutôt qu'une quote-part physique du bien) ou recourir au démembrement
            évoqué plus haut — mais ce sont, encore une fois, des montages à construire avec un
            professionnel, pas des réflexes à appliquer sans étude préalable.
          </p>

          <h2 id="tableau">Le comparatif en un tableau</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>PER assurantiel</th>
                  <th>Immobilier locatif</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Simplicité de mise en place</td>
                  <td>Verser et désigner des bénéficiaires suffit</td>
                  <td>Financement, sélection du bien, gestion locative ; démembrement ou SCI si structuration recherchée</td>
                </tr>
                <tr>
                  <td>Montant transmissible</td>
                  <td>Plafonné par l'abattement (152 500 € ou 30 500 € par bénéficiaire selon l'âge au décès) puis droits classiques au-delà</td>
                  <td>Valeur du bien au jour du décès, potentiellement démultipliée par le crédit soldé par l'assurance emprunteur</td>
                </tr>
                <tr>
                  <td>Fiscalité successorale</td>
                  <td>Abattement dédié ; gains exonérés de prélèvements sociaux</td>
                  <td>Droits de succession classiques, sans abattement dédié (hors structuration spécifique)</td>
                </tr>
                <tr>
                  <td>Disponibilité pour le titulaire de son vivant</td>
                  <td>Capital bloqué jusqu'à la retraite, hors déblocages légaux</td>
                  <td>Bien disponible à la vente, mais liquidité faible et délais de cession longs</td>
                </tr>
                <tr>
                  <td>Complexité de gestion pour les héritiers</td>
                  <td>Faible : un capital se répartit sans indivision</td>
                  <td>Potentiellement élevée : indivision entre héritiers, décisions à l'unanimité ou à la majorité selon les actes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les montants et taux de ce tableau sont ceux en vigueur en {HYPOTHESES_MAJ} ; chaque
            loi de finances peut les faire évoluer, et il faut les revérifier avant toute décision.
            Les prélèvements sociaux mentionnés dans cet article renvoient au barème détaillé dans
            notre fichier d'hypothèses ({pct(FISCALITE.prelevementsSociaux.per)} sur les gains du
            PER en sortie standard, {pct(FISCALITE.prelevementsSociaux.immobilier)} sur les revenus
            fonciers) ; rappelons qu'aucun de ces deux taux ne s'applique aux gains transmis par
            décès dans le cadre décrit plus haut.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>L'assurance emprunteur couvre-t-elle toujours 100 % du capital restant dû ?</h3>
          <p>
            Pas nécessairement. La quotité assurée — la part du capital couverte par
            l'assurance — se choisit à la souscription, notamment entre coemprunteurs, où il est
            fréquent de répartir la couverture (par exemple 50 % chacun ou 100 % chacun selon les
            revenus respectifs). Une quotité inférieure à 100 % laisse une part du capital restant
            dû à la charge de la succession en cas de décès. C'est un point à vérifier sur son
            propre contrat, pas une garantie universelle.
          </p>
          <h3>Peut-on se voir refuser une assurance emprunteur, ou payer plus cher ?</h3>
          <p>
            Oui. Le questionnaire médical préalable peut conduire à des exclusions de garantie
            ciblées, une surprime, ou plus rarement un refus, selon l'état de santé et l'âge à la
            souscription. Des plafonds de capital assurable existent également au-delà d'un
            certain montant ou d'un certain âge. Le droit à l'oubli et la convention AERAS
            encadrent une partie de ces situations pour certaines pathologies, mais ne les
            suppriment pas toutes.
          </p>
          <h3>Un PER bancaire bénéficie-t-il du même abattement successoral qu'un PER assurantiel ?</h3>
          <p>
            Non. Seul le PER assurantiel profite de la mécanique de transmission décrite dans cet
            article. Un PER bancaire, ou la plupart des PER collectifs d'entreprise, fonctionne
            comme un compte-titres : au décès, le capital entre dans la masse successorale
            classique, sans abattement dédié.
          </p>
          <h3>L'indivision entre héritiers peut-elle bloquer la vente d'un bien transmis ?</h3>
          <p>
            Oui, potentiellement. Certains actes de disposition (vente du bien, par exemple)
            requièrent l'accord d'une majorité qualifiée des indivisaires, voire l'unanimité selon
            les cas, ce qui peut geler une décision pendant des années en cas de désaccord entre
            héritiers.
          </p>
          <h3>Le démembrement de propriété évite-t-il totalement les droits de succession ?</h3>
          <p>
            Non, il ne les évite pas totalement mais peut en réduire l'assiette : transmettre la
            nue-propriété de son vivant tout en conservant l'usufruit permet de calculer les droits
            sur une valeur réduite (celle de la nue-propriété, selon un barème fiscal fonction de
            l'âge de l'usufruitier), et non sur la pleine propriété. Le calcul précis dépend de
            nombreux paramètres et s'étudie au cas par cas.
          </p>
          <h3>Faut-il choisir entre PER et immobilier, ou peut-on faire les deux ?</h3>
          <p>
            Les deux se combinent fréquemment dans les patrimoines que nous accompagnons : chacun
            répond à un besoin différent, à des moments différents d'une même vie patrimoniale,
            plutôt qu'à un choix exclusif.
          </p>

          <h2 id="analyse">Notre analyse : deux outils complémentaires, pas concurrents</h2>
          <p>
            Opposer le PER et l'immobilier locatif comme s'il fallait trancher entre les deux est,
            dans notre analyse, une fausse question. Ce ne sont pas deux candidats au même poste :
            ce sont deux outils qui interviennent à des moments différents et pour des besoins
            différents. Le PER excelle pour transmettre un montant défini, dans un cadre fiscal
            simple, sans complexité de gestion pour les héritiers. L'immobilier excelle pour
            l'effet de levier pendant la vie active — il permet de constituer, avec un effort
            d'épargne modéré, un patrimoine que le crédit finance en grande partie, et que
            l'assurance emprunteur sécurise en cas de coup dur.
          </p>
          <p>
            Dans les patrimoines que nous accompagnons, les deux se retrouvent d'ailleurs souvent
            associés : l'immobilier à crédit pendant les années où le titulaire est en pleine
            activité et où le levier bancaire est le plus accessible, le PER en parallèle pour
            construire un capital dont la transmission sera simple et prévisible. Le premier
            protège la famille par le mécanisme de l'assurance emprunteur ; le second la protège
            par l'abattement successoral et l'acquisition définitive de la déduction fiscale en
            cas de décès avant liquidation.
          </p>
          <p>
            L'arbitrage — et plus encore le dosage entre les deux — dépend de paramètres qui n'ont
            rien d'universel : l'âge du titulaire et le temps restant avant la retraite, la
            composition du patrimoine déjà constitué, et surtout la composition familiale, qui
            détermine le nombre de bénéficiaires, leur lien de parenté et donc les abattements
            dont chacun peut profiter. Deux situations en apparence proches peuvent appeler des
            réponses opposées, ce qui explique pourquoi nous répétons, ici comme ailleurs,
            qu'aucune de ces pistes ne remplace une étude au cas par cas. Notre guide{" "}
            <a href="/guide/meilleure-enveloppe-retraite">
              quelle est la meilleure enveloppe pour préparer sa retraite ?
            </a>{" "}
            replace ce duel dans une vue d'ensemble par objectif.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement ou en
              gestion de patrimoine personnalisé : la pertinence d'une stratégie de transmission
              dépend fortement de la situation familiale, patrimoniale et fiscale de chacun, et
              chaque situation doit faire l'objet d'une étude individuelle. Les montants et
              abattements cités sont les barèmes en vigueur en {HYPOTHESES_MAJ}, susceptibles
              d'évoluer à chaque loi de finances.
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
