import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { HYPOTHESES_MAJ, TRANSFERT_PER, pct } from "../components/hypotheses.js";

const POINTS = [
  {
    point: "Frais de transfert",
    verifier: "Ancienneté du plan et montant exact facturé, par écrit",
    pourquoi: "Plafonnés par la loi, nuls au-delà d'un certain nombre d'années de détention",
  },
  {
    point: "Fonds euros et supports en cours",
    verifier: "Sort de chaque support au moment de la vente : date de valorisation, éventuels avantages propres au contrat d'origine",
    pourquoi: "Un contrat ancien peut porter une garantie ou un support que le contrat d'arrivée n'offre plus",
  },
  {
    point: "Compartiments (versements volontaires, épargne salariale, obligatoires)",
    verifier: "Ventilation de l'encours avant et après le transfert",
    pourquoi: "Les compartiments suivent le plan et gardent leurs règles de sortie",
  },
  {
    point: "Frais du contrat d'arrivée",
    verifier: "Frais sur versements, gestion annuelle, supports, gestion pilotée",
    pourquoi: "Un transfert n'a de sens que si le total de frais baisse ou si le service s'améliore",
  },
  {
    point: "Délai de traitement",
    verifier: "Délai annoncé par l'établissement cédant, et recours en cas de retard",
    pourquoi: "Pendant le transfert, l'épargne n'est pas investie comme vous l'entendez",
  },
];

export default function GuideTransfertPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Changer de PER sans perdre son antériorité</span>
          <h1>Transférer son PER : frais, délais et quand cela vaut le coup</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> un PER n'est pas une prison contractuelle. Il peut être
              transféré vers un autre PER, et cette opération n'est pas un rachat : elle ne déclenche
              ni imposition ni remise à zéro de l'antériorité fiscale du plan. Les frais de transfert
              sont plafonnés par la loi à {pct(TRANSFERT_PER.plafondFraisPct)} des droits acquis, et
              ils s'éteignent {TRANSFERT_PER.gratuitApresAnnees} ans après le premier versement dans
              le plan. Mais « possible » ne veut pas dire « utile » : un transfert ne vaut le coup que
              si l'écart de frais entre les deux contrats, cumulé jusqu'à votre départ à la retraite,
              dépasse nettement le coût de l'opération et la valeur de ce que l'ancien contrat avait de
              particulier. Trois vérifications décident de tout : l'ancienneté du plan, le sort des
              supports en cours, et le total de frais du contrat d'arrivée.
            </p>
          </div>

          <p>
            Beaucoup d'épargnants découvrent, des années après l'ouverture, que leur PER est cher ou
            peu adapté : frais sur versements élevés, gamme de supports étroite, gestion pilotée
            imposée par défaut. La réponse spontanée est « je suis coincé ». Elle est le plus souvent
            fausse sur le plan juridique, et incomplète sur le plan financier.
          </p>
          <p>
            Notre analyse : la vraie question n'est pas « peut-on transférer ? » — oui — mais « que
            gagne-t-on, et que laisse-t-on derrière soi ? ». Cet article donne le cadre légal, la
            check-list à parcourir avant de signer une demande, et les situations où nous conseillons
            plutôt de ne rien faire.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#principe">Ce que le transfert est — et n'est pas</a></li>
              <li><a href="#frais">Les frais de transfert : le plafond légal et la règle des cinq ans</a></li>
              <li><a href="#verifier">Les cinq points à vérifier avant de demander</a></li>
              <li><a href="#ancien">Les anciens contrats (PERP, Madelin, article 83)</a></li>
              <li><a href="#demarche">La démarche, étape par étape</a></li>
              <li><a href="#quand">Quand cela vaut le coup, et quand mieux vaut rester</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="principe">Ce que le transfert est — et n'est pas</h2>
          <p>
            Un transfert déplace l'intégralité de l'encours d'un plan d'épargne retraite vers un autre
            plan d'épargne retraite, chez un autre gestionnaire. C'est une opération entre
            établissements : vous ne percevez rien, vous n'êtes donc pas imposé, et les règles de
            sortie du plan restent celles d'un PER. L'antériorité du plan est conservée, ce qui compte
            pour la gratuité de futurs transferts et pour les compartiments d'origine.
          </p>
          <p>
            Ce n'est pas, en revanche, un déblocage : l'argent reste bloqué jusqu'à la retraite, aux
            exceptions décrites dans notre guide sur le{" "}
            <a href="/guide/deblocage-anticipe-per">déblocage anticipé du PER</a>. Et ce n'est pas
            davantage un moyen de « rattraper » une performance décevante : un transfert change le
            contenant, pas la qualité de ce qu'il y a dedans.
          </p>

          <h2 id="frais">Les frais de transfert : le plafond légal et la règle des cinq ans</h2>
          <p>
            Pour un PER, la loi borne ce que le gestionnaire cédant peut facturer : les frais de
            transfert ne peuvent pas dépasser {pct(TRANSFERT_PER.plafondFraisPct)} des droits acquis,
            et ils sont nuls une fois passés {TRANSFERT_PER.gratuitApresAnnees} ans depuis le premier
            versement dans le plan (article L224-6 du Code monétaire et financier). Concrètement, deux
            situations très différentes :
          </p>
          <ul>
            <li>
              <strong>Plan de plus de {TRANSFERT_PER.gratuitApresAnnees} ans :</strong> le transfert
              est gratuit. Le seul coût est alors de second ordre — supports vendus puis rachetés, délai
              de traitement.
            </li>
            <li>
              <strong>Plan plus récent :</strong> les frais peuvent atteindre{" "}
              {pct(TRANSFERT_PER.plafondFraisPct)} de l'encours. Ce n'est pas anodin à rapprocher de
              l'écart de frais annuel que vous espérez gagner : si le nouveau contrat économise une
              fraction de point par an, la période de récupération se compte en années.
            </li>
          </ul>
          <p>
            Nuance utile : certains établissements renoncent à ces frais pour attirer l'encours, et
            certains les prennent en charge dans une offre d'accueil. Cela se demande, et cela se
            vérifie par écrit — mais une offre d'accueil ne change pas la structure de frais du contrat
            d'arrivée, qui pèsera sur toute la durée de détention.
          </p>

          <h2 id="verifier">Les cinq points à vérifier avant de demander</h2>
          <p>
            Le tableau ci-dessous résume les cinq contrôles que nous recommandons avant toute demande.
            Les frais de transfert ne sont que le premier : le sort des supports en cours et le total de
            frais du contrat d'arrivée pèsent généralement davantage sur le résultat final.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Point</th>
                  <th>Que vérifier</th>
                  <th>Pourquoi</th>
                </tr>
              </thead>
              <tbody>
                {POINTS.map((ligne) => (
                  <tr key={ligne.point}>
                    <td>{ligne.point}</td>
                    <td>{ligne.verifier}</td>
                    <td>{ligne.pourquoi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Pour le quatrième point, la méthode est celle de notre guide{" "}
            <a href="/guide/combien-coute-un-per">combien coûte un PER</a> : additionner tous les
            postes, puis comparer le total — et lui seul — entre l'ancien et le nouveau contrat. Pour
            juger la qualité du contrat d'arrivée lui-même, la grille de{" "}
            <a href="/guide/quel-est-le-meilleur-per">quel est le meilleur PER</a> s'applique sans
            changement.
          </p>
          <p>
            Sur le deuxième point, soyez particulièrement attentif si votre PER est adossé à un fonds
            en euros : le capital y est garanti dans les conditions du contrat, ce qui n'est pas le
            cas des unités de compte, dont la valeur varie avec les marchés. Le transfert implique de
            liquider les supports de l'ancien plan avant de réinvestir dans le nouveau : la valeur
            transférée est celle du jour de la valorisation, et non celle que vous aviez en tête.
          </p>

          <h2 id="ancien">Les anciens contrats (PERP, Madelin, article 83)</h2>
          <p>
            Les contrats d'épargne retraite antérieurs à la loi Pacte peuvent eux aussi être
            transférés vers un PER, et c'est même l'une des principales raisons pour lesquelles ce
            sujet revient dans nos échanges avec des cadres de 50 ans et plus : ils détiennent souvent
            un article 83 d'un ancien employeur, ou un contrat Madelin ouvert quand ils étaient
            indépendants. Un décret de juillet 2024 a précisé les modalités et le plafond de frais
            applicables à ces transferts, avec une gratuité qui intervient après une durée de détention
            différente de celle d'un PER ({TRANSFERT_PER.anciensContratsGratuitApresAnnees} ans pour ce régime, selon le texte).
          </p>
          <p>
            Ce régime est plus technique et plus sensible aux particularités de chaque contrat : un
            ancien contrat peut offrir une garantie de rente, un taux technique ou un mode de sortie
            que le PER d'arrivée n'offre pas, et ces avantages disparaissent avec le transfert. Avant
            toute demande, obtenez le décompte exact des droits, la nature de chaque compartiment, et
            faites la liste de ce qui est perdu. Notre guide sur la{" "}
            <a href="/guide/retraite-independants-per-ou-madelin">retraite des indépendants : PER ou
            Madelin</a> détaille les spécificités du second cas.
          </p>

          <h2 id="demarche">La démarche, étape par étape</h2>
          <ol>
            <li>
              <strong>Choisissez d'abord le contrat d'arrivée</strong> et obtenez sa grille de frais
              complète. La demande de transfert s'adresse au nouveau gestionnaire, pas à l'ancien.
            </li>
            <li>
              <strong>Demandez par écrit à l'ancien gestionnaire</strong> le montant exact des frais de
              transfert, la date d'effet de la valorisation et le sort de chaque support.
            </li>
            <li>
              <strong>Déposez la demande</strong> auprès du nouveau gestionnaire, avec les pièces
              qu'il exige (identité, références du contrat d'origine, éventuelle autorisation de
              prélèvement des frais).
            </li>
            <li>
              <strong>Suivez le délai.</strong> La réglementation encadre le délai de traitement, mais
              les retards demeurent possibles : conservez la date de votre demande complète, et sachez
              que le médiateur de l'AMF peut être saisi après une réclamation restée sans réponse.
            </li>
            <li>
              <strong>Contrôlez le résultat :</strong> encours reçu, ventilation par compartiment,
              investissement effectif selon vos choix. Une erreur de ventilation se corrige bien plus
              facilement dans les semaines qui suivent que des années plus tard.
            </li>
          </ol>

          <h2 id="quand">Quand cela vaut le coup, et quand mieux vaut rester</h2>
          <p>
            Notre analyse distingue deux familles de situations, et la seconde est plus fréquente que
            ce que laissent croire les argumentaires de transfert.
          </p>
          <p>
            <strong>Le transfert se défend généralement quand :</strong> le plan a plus de{" "}
            {TRANSFERT_PER.gratuitApresAnnees} ans (donc gratuit), le total de frais du contrat actuel
            est nettement supérieur à celui du contrat d'arrivée, la gamme de supports est trop étroite
            pour votre allocation, ou vous souhaitez regrouper plusieurs plans dispersés pour en
            simplifier le suivi et la succession.
          </p>
          <p>
            <strong>Mieux vaut généralement rester quand :</strong> le plan est récent et le gain de
            frais attendu ne couvre pas le coût de sortie, votre horizon est court (peu d'années pour
            amortir l'opération), ou l'ancien contrat porte une garantie ou un avantage que le nouveau
            n'aura pas. Le premier réflexe, avant même de comparer des contrats, est donc de mesurer
            l'écart de frais réel — c'est le chiffre qui tranche, pas la promesse d'un meilleur
            service.
          </p>
          <p>
            Et si la vraie question est de savoir si un PER est la bonne enveloppe tout court, elle se
            traite en amont : voir <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER</a> et
            la page <a href="/strategies/per">stratégie PER</a>.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Un transfert de PER est-il imposable ?</h3>
          <p>
            Non. Un transfert d'un plan d'épargne retraite vers un autre ne constitue pas une sortie :
            il ne déclenche ni impôt sur le revenu ni prélèvements sociaux, et l'antériorité fiscale
            du plan est conservée. L'imposition n'intervient qu'à la sortie du nouveau plan, selon les
            règles décrites dans notre guide sur la{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a>.
          </p>
          <h3>Peut-on transférer une assurance-vie vers un PER ?</h3>
          <p>
            Non, pas directement : ce sont deux enveloppes distinctes, et le transfert ne concerne que
            des plans d'épargne retraite ou des contrats d'épargne retraite anciens. Pour arbitrer
            entre les deux enveloppes avant de déplacer de l'argent, voir{" "}
            <a href="/guide/per-vs-assurance-vie-retraite">PER ou assurance-vie</a>.
          </p>
          <h3>Le transfert fait-il perdre le bénéfice des versements déjà déduits ?</h3>
          <p>
            Non : la déduction obtenue à l'entrée est déjà acquise et n'est pas remise en cause par le
            transfert. La réintégration éventuelle ne se produit qu'à la sortie, dans les conditions
            propres à chaque cas.
          </p>
          <h3>Peut-on transférer seulement une partie de l'encours ?</h3>
          <p>
            Les modalités dépendent du contrat et du gestionnaire. Le cas général est le transfert de
            l'ensemble des droits ; si vous envisagez un transfert partiel, demandez la condition par
            écrit avant de monter le dossier.
          </p>
          <h3>L'ancien gestionnaire peut-il refuser ou retarder le transfert ?</h3>
          <p>
            Il ne peut pas s'y opposer si les conditions sont remplies, mais les retards existent. En
            cas de blocage, adressez une réclamation écrite, puis saisissez le médiateur de l'AMF si
            la réponse n'arrive pas.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le transfert est un droit réel et protecteur : il évite qu'une mauvaise décision
            d'ouverture ne devienne définitive. Mais il ne doit pas devenir un réflexe. Les frais de
            sortie sont plafonnés et disparaissent avec le temps ; ce qui coûte réellement, c'est
            l'écart de frais annuel entre les deux contrats et ce que l'ancien contrat portait de
            spécifique. Mesurez ces deux éléments, par écrit, avant de signer quoi que ce soit.
          </p>
          <p>
            C'est exactement la lecture que nous faisons dans un{" "}
            <a href="/bilan-retraite">bilan retraite</a> : l'inventaire de vos plans, leur ancienneté,
            leur total de frais réel et la valeur de ce que chacun a de particulier, pour dire s'il y
            a un gain à transférer, ou s'il vaut mieux ne rien toucher.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle. Les plafonds
              et durées cités sont ceux en vigueur en {HYPOTHESES_MAJ}, susceptibles d'évoluer, et
              restent à vérifier auprès de votre gestionnaire avant toute décision ; le régime des
              anciens contrats est particulièrement dépendant des conditions de chaque contrat. Ne
              confondez pas supports garantis et unités de compte : sur ces dernières, la valeur de
              l'épargne transférée dépend des marchés au jour de la valorisation, et les performances
              passées ne préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Un PER à transférer, ou à garder tel quel ?"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
