import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { TRANSFERT_PER, pct } from "../components/hypotheses.js";

export default function GuideTransfertPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Un droit méconnu, rarement exercé</span>
          <h1>Transférer son PER : frais, délais, et quand ça vaut vraiment le coup</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> tout titulaire d'un PER peut le transférer vers un
              autre PER, et toute personne détenant un ancien contrat retraite (PERP, Madelin,
              article 83, PERCO) peut le transférer vers un PER. Les frais de transfert sont
              plafonnés par la loi à {pct(TRANSFERT_PER.fraisPlafondAvant5Ans)} de l'épargne
              transférée, et deviennent nuls après{" "}
              {TRANSFERT_PER.delaiGratuiteAnneesPerVersPer} ans de détention pour un transfert PER
              vers PER, ou {TRANSFERT_PER.delaiGratuiteAnneesAncienContrat} ans pour un ancien
              contrat retraite. Le transfert n'est pas un retrait : il ne déclenche aucune fiscalité,
              ne remet pas en cause les déductions déjà obtenues, et conserve l'ancienneté fiscale du
              plan d'origine. Mais deux réflexes ruinent régulièrement l'opération : transférer un
              contrat juste avant son anniversaire de gratuité par impatience, et abandonner un
              ancien contrat qui portait des garanties (taux garantis historiques, garanties
              plancher) qu'aucun PER récent ne propose plus.
            </p>
          </div>

          <p>
            « Mon PER est cher, mes fonds sont mauvais » : c'est une plainte fréquente, et la
            réponse la plus commune qu'on lui oppose est de rouvrir un nouveau contrat ailleurs — en
            laissant l'ancien immobilisé, oublié, à continuer de facturer ses frais dans un coin.
            C'est presque toujours une erreur : la loi Pacte a créé un droit de transfert, encadré et
            plafonné, spécifiquement pour éviter ce gaspillage.
          </p>
          <p>
            Notre analyse : le transfert est un outil utile, pas un réflexe automatique. Il a un
            coût potentiel, un délai réel, et il fait parfois perdre des avantages que le contrat
            d'origine avait accumulés avec le temps. Cet article détaille ce qui se transfère, ce
            que ça coûte, combien de temps ça prend, et les deux situations où mieux vaut ne rien
            transférer du tout.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#deux-cas">Deux transferts différents : PER vers PER, ou ancien contrat vers PER</a></li>
              <li><a href="#frais">Les frais : plafonnés, mais pas toujours nuls</a></li>
              <li><a href="#delais">Les délais : ce que dit la loi, ce que vivent les épargnants</a></li>
              <li><a href="#quoi">Ce qui se transfère — et ce qui ne se perd pas au passage</a></li>
              <li><a href="#piege-anniversaire">Le piège n° 1 : transférer trop tôt, juste avant la gratuité</a></li>
              <li><a href="#piege-garanties">Le piège n° 2 : perdre des garanties que plus aucun contrat récent n'offre</a></li>
              <li><a href="#quand">Quand transférer a du sens — et quand s'abstenir</a></li>
              <li><a href="#procedure">Comment procéder concrètement</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="deux-cas">Deux transferts différents : PER vers PER, ou ancien contrat vers PER</h2>
          <p>
            Le cadre légal distingue deux situations, avec des délais de gratuité différents. Le
            premier cas, le plus simple, est le transfert d'un PER vers un autre PER — par exemple
            un PER individuel ouvert dans une banque vers un PER en ligne, ou un PER d'entreprise
            d'un ancien employeur vers un PER individuel après un changement de poste. Le second cas
            concerne les anciens produits retraite antérieurs à la loi Pacte : PERP, contrat Madelin
            pour les indépendants, article 83 d'entreprise, PERCO. Ces contrats peuvent eux aussi
            être transférés vers un PER, sous le même régime de plafonnement des frais mais avec un
            délai de gratuité plus long.
          </p>
          <p>
            Un point mérite d'être clarifié d'emblée : ce n'est jamais un retrait. L'épargne quitte
            un contrat pour arriver, intacte, dans un autre, sans passer par votre compte bancaire
            personnel et sans déclencher la moindre imposition. C'est le gestionnaire d'origine qui
            transfère directement les fonds au nouveau gestionnaire.
          </p>

          <h2 id="frais">Les frais de transfert : plafonnés par la loi, mais pas toujours nuls</h2>
          <p>
            La loi plafonne les frais de transfert à {pct(TRANSFERT_PER.fraisPlafondAvant5Ans)} de
            l'épargne transférée. Pour un transfert PER vers PER, ce plafond ne s'applique que dans
            les {TRANSFERT_PER.delaiGratuiteAnneesPerVersPer} premières années de détention du
            plan : passé ce délai, le transfert est gratuit. Pour un ancien contrat retraite (PERP,
            Madelin, article 83, PERCO) transféré vers un PER, le même plafond s'applique, mais la
            gratuité n'intervient qu'après {TRANSFERT_PER.delaiGratuiteAnneesAncienContrat} ans
            (barème {TRANSFERT_PER.source}).
          </p>
          <p>
            En pratique, beaucoup de distributeurs — en particulier les contrats en ligne récents —
            n'appliquent aucun frais de transfert entrant, quel que soit l'ancienneté du plan
            d'origine, pour attirer de nouveaux clients. Le frais à surveiller de près est donc
            surtout celui du contrat que vous quittez, pas celui du contrat que vous rejoignez :
            demandez-le par écrit avant d'engager la démarche, il figure dans les conditions
            générales de l'ancien contrat.
          </p>

          <h2 id="delais">Les délais : ce que dit la loi, ce que vivent les épargnants</h2>
          <p>
            Le gestionnaire du contrat d'origine dispose d'un délai légal maximal de{" "}
            {TRANSFERT_PER.delaiLegalReponseValeurMois} mois pour communiquer la valeur de transfert
            une fois la demande reçue. En pratique, la durée totale de l'opération — de la demande
            initiale au versement effectif sur le nouveau contrat — est généralement de l'ordre de{" "}
            {TRANSFERT_PER.delaiUsuelPerVersPerMois} mois pour un transfert PER vers PER, et peut
            atteindre {TRANSFERT_PER.delaiUsuelAncienContratMois} mois pour un ancien contrat
            retraite, selon la réactivité des deux établissements. Ces durées varient sensiblement
            d'un couple d'établissements à l'autre : demandez une estimation écrite avant de vous
            engager plutôt que de vous fier à une moyenne de marché.
          </p>
          <p>
            Notre analyse : ce délai n'est pas anodin si votre projet a une échéance — un départ à
            la retraite programmé, ou un déblocage anticipé envisagé peu après le transfert (voir
            notre guide <a href="/guide/deblocage-anticipe-per">déblocage anticipé du PER</a>).
            Lancer un transfert quelques semaines avant une opération qui en dépend est une source
            classique de tension de calendrier, au même titre que ce que nous décrivons pour les
            démarches de déblocage.
          </p>

          <h2 id="quoi">Ce qui se transfère — et ce qui ne se perd pas au passage</h2>
          <p>
            Le transfert ne remet rien en cause de ce qui a été acquis sur le plan d'origine. Les
            versements déjà déduits de votre revenu imposable le restent : le transfert n'est pas un
            fait générateur d'imposition, contrairement à un retrait. L'ancienneté fiscale du plan
            d'origine — utile notamment pour le décompte des délais de blocage et, sur un PER
            assurantiel, pour la fiscalité successorale en cas de décès — est conservée, elle n'est
            pas remise à zéro à la date du transfert.
          </p>
          <p>
            La répartition entre les trois compartiments (versements volontaires, épargne salariale,
            versements obligatoires) est également reportée telle quelle sur le nouveau plan. Un
            compartiment de versements obligatoires jamais débloquable pour l'achat de la résidence
            principale — un point que nous détaillons dans notre guide{" "}
            <a href="/guide/deblocage-anticipe-per">déblocage anticipé du PER</a> — le reste après
            transfert, il ne devient pas plus disponible en changeant de contrat.
          </p>

          <h2 id="piege-anniversaire">Le piège n° 1 : transférer trop tôt, juste avant la gratuité</h2>
          <p>
            C'est l'erreur la plus simple à éviter, et pourtant l'une des plus fréquentes : lancer un
            transfert quelques mois avant la date anniversaire qui l'aurait rendu gratuit. Un contrat
            ouvert il y a quatre ans et demi, transféré par impatience, peut coûter jusqu'à{" "}
            {pct(TRANSFERT_PER.fraisPlafondAvant5Ans)} de l'encours transféré — une somme qui,
            rapportée à un encours de plusieurs dizaines de milliers d'euros, dépasse largement ce
            que l'attente de quelques mois aurait coûté en frais de gestion supplémentaires.
          </p>
          <p>
            Avant tout transfert, vérifiez la date exacte d'ouverture du plan sur votre relevé annuel
            et calculez la date d'anniversaire pertinente ({TRANSFERT_PER.delaiGratuiteAnneesPerVersPer}{" "}
            ans pour un PER, {TRANSFERT_PER.delaiGratuiteAnneesAncienContrat} ans pour un ancien
            contrat retraite). Si l'écart est de quelques mois seulement, patienter coûte
            généralement moins cher que transférer immédiatement.
          </p>

          <h2 id="piege-garanties">Le piège n° 2 : perdre des garanties que plus aucun contrat récent n'offre</h2>
          <p>
            Un vieux PERP ou un ancien contrat Madelin ouvert il y a quinze ou vingt ans peut porter
            des caractéristiques que les contrats récents ne proposent plus : un taux garanti
            historiquement élevé sur le fonds euros, une garantie plancher en cas de décès, ou des
            conditions de rente viagère plus favorables. Ces avantages sont attachés au contrat, pas
            à l'épargnant : ils disparaissent au moment du transfert et ne se retrouvent pas à
            l'identique sur le nouveau plan.
          </p>
          <p>
            Notre analyse : avant tout transfert d'un ancien contrat, demandez par écrit au
            gestionnaire actuel le détail des garanties spécifiques attachées au contrat — pas
            seulement son taux de rendement de l'année, qui ne dit rien des clauses contractuelles
            sous-jacentes. Un contrat au rendement apparent modeste peut malgré tout valoir la peine
            d'être conservé s'il porte une garantie qu'aucune offre actuelle ne reproduit.
          </p>

          <h2 id="quand">Quand transférer a du sens — et quand s'abstenir</h2>
          <p>
            Le transfert se justifie le plus souvent lorsque le contrat d'origine cumule des frais
            de gestion annuels nettement supérieurs à ceux du marché, des supports d'investissement
            limités (pas d'accès aux ETF, gamme de fonds étroite), ou une gestion pilotée par défaut
            au surcoût mal justifié — des points que nous détaillons dans nos guides{" "}
            <a href="/guide/combien-coute-un-per">combien coûte un PER</a> et{" "}
            <a href="/guide/per-bancaire-frais-gestion-horizon">PER bancaire : frais, gestion à
            horizon</a>. Le regroupement de plusieurs anciens contrats dispersés en un seul plan est
            également une motivation légitime, ne serait-ce que pour la lisibilité du suivi.
          </p>
          <p>
            À l'inverse, mieux vaut s'abstenir — ou au moins temporiser — dans trois cas : à quelques
            mois d'une date anniversaire de gratuité (piège n° 1 ci-dessus), en présence de garanties
            spécifiques non reproductibles (piège n° 2), ou lorsque le départ à la retraite est
            suffisamment proche pour que le gain de frais sur la durée résiduelle ne compense pas le
            délai et l'incertitude de l'opération. Une piste de réflexion, à ne pas transformer en
            règle générale : plus l'horizon restant est court, plus le seuil de frais à économiser
            pour justifier un transfert doit être élevé.
          </p>

          <h2 id="procedure">Comment procéder concrètement</h2>
          <p>
            La démarche s'engage auprès du nouveau gestionnaire, jamais auprès de l'ancien : c'est
            lui qui se charge de solliciter le transfert pour votre compte, une fois le nouveau plan
            ouvert. Le dossier comprend une pièce d'identité, un relevé d'identité bancaire, et une
            demande de transfert signée mentionnant les références du contrat d'origine. Le nouveau
            gestionnaire interroge alors l'ancien sur la valeur de transfert, dans le délai légal
            rappelé plus haut.
          </p>
          <p>
            Un point pratique à vérifier avant de signer : certains distributeurs prennent en charge
            les éventuels frais de transfert facturés par l'ancien contrat, dans une certaine limite,
            pour faciliter l'arrivée de nouveaux clients. Cette prise en charge n'est ni systématique
            ni garantie — demandez-la explicitement, par écrit, avant d'engager la démarche.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on transférer seulement une partie de son PER ?</h3>
          <p>
            Non : le transfert porte sur la totalité de l'encours d'un contrat donné. Si vous
            détenez plusieurs PER distincts, vous pouvez en revanche choisir de n'en transférer
            qu'un seul et de conserver les autres.
          </p>
          <h3>Le transfert déclenche-t-il une imposition ?</h3>
          <p>
            Non. Un transfert n'est pas un retrait : aucune somme ne sort de l'enveloppe retraite,
            aucune fiscalité n'est due, et les versements déjà déduits ne sont pas réintégrés à votre
            revenu imposable. La fiscalité ne s'applique qu'au moment d'une sortie effective, en
            capital ou en rente, à la retraite ou lors d'un déblocage anticipé.
          </p>
          <h3>Peut-on transférer un PER d'entreprise obligatoire vers un PER individuel ?</h3>
          <p>
            Oui, y compris en cours d'activité dans l'entreprise, sauf clause contraire fixée par
            l'accord collectif qui a créé le plan — un point à vérifier auprès du service RH ou des
            conditions générales du plan d'entreprise avant d'engager la démarche.
          </p>
          <h3>Faut-il clôturer soi-même l'ancien contrat avant de transférer ?</h3>
          <p>
            Non : c'est le nouveau gestionnaire qui pilote l'ensemble de l'opération auprès de
            l'ancien, y compris la clôture du contrat d'origine une fois les fonds reçus. Il n'y a
            aucune démarche de clôture à engager de votre côté en parallèle.
          </p>
          <h3>Le transfert d'un ancien contrat vers un PER change-t-il ses conditions de sortie ?</h3>
          <p>
            Les six cas de déblocage anticipé propres au PER (voir notre guide{" "}
            <a href="/guide/deblocage-anticipe-per">déblocage anticipé du PER</a>) s'appliquent au
            plan d'arrivée. Les conditions de sortie du contrat d'origine, lorsqu'elles étaient plus
            restrictives ou au contraire plus souples, ne se prolongent pas après le transfert.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le transfert de PER est un droit utile, encadré par un plafond de frais et des délais de
            gratuité qui protègent l'épargnant contre l'immobilisme facturé — mais ce n'est pas un
            geste anodin ni systématiquement gagnant. La question à se poser n'est jamais « puis-je
            transférer ? », presque toujours oui, mais « ce transfert précis, à ce moment précis,
            m'apporte-t-il plus qu'il ne me coûte ? ». Le calcul dépend de trois paramètres : la date
            d'anniversaire de gratuité du contrat d'origine, les garanties spécifiques qu'il porte
            éventuellement, et l'horizon restant avant que l'épargne ne soit mobilisée.
          </p>
          <p>
            C'est précisément ce que nous examinons dans un{" "}
            <a href="/bilan-retraite">bilan retraite</a> : la ventilation réelle de vos contrats
            existants, le calcul du seuil de frais qui justifie ou non un transfert dans votre
            situation, et la vérification des garanties contractuelles que certains anciens contrats
            portent encore.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : les frais et délais réels dépendent des conditions générales de chaque
              contrat, à vérifier auprès de vos gestionnaires actuel et futur avant toute décision.
              Les plafonds et délais cités proviennent de sources spécialisées concordantes, non
              vérifiées directement sur une source légale primaire dans cet environnement — à
              confirmer avant publication. Ne confondez pas supports garantis et unités de compte :
              sur ces dernières, la valeur transférée dépend des marchés au jour de l'opération, et
              les performances passées ne préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Plusieurs contrats retraite dispersés, un transfert à évaluer ?"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
