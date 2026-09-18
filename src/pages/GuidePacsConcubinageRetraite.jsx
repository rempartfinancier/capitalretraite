import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { TRANSMISSION, HYPOTHESES_MAJ, euros } from "../components/hypotheses.js";

export default function GuidePacsConcubinageRetraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Profil spécifique</span>
          <h1>Couple pacsé ou en concubinage : ce qui change pour votre retraite</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le PACS protège presque comme le mariage sur le plan
              fiscal (donation, succession avec testament), mais pas du tout sur un point précis et
              rarement anticipé : la pension de réversion, réservée aux seuls couples mariés dans
              tous les régimes de retraite français. Le concubinage, lui, n'ouvre quasiment aucun
              droit automatique — ni réversion, ni héritage sans testament, ni déblocage anticipé du
              PER en cas de décès du partenaire. Dans les deux cas, l'assurance-vie et le PER
              assurantiel restent les seuls outils qui traitent un partenaire non marié comme un
              bénéficiaire à part entière, à condition que la clause bénéficiaire soit rédigée
              correctement.
            </p>
          </div>
          <p>
            « Mon conjoint », « mon partenaire », « mon compagnon » : dans la conversation courante,
            ces mots désignent la même réalité — la personne avec qui l'on construit sa vie et,
            souvent, sa retraite. En droit, ce sont trois statuts très différents, et l'écart entre
            eux se paie le plus cher précisément au moment où l'on ne peut plus le corriger : au
            décès de l'un des deux partenaires. Ce guide fait le point sur ce qui change concrètement
            pour un couple pacsé ou en concubinage — par contraste avec le mariage — sur les sujets
            qui touchent directement la préparation de la retraite : la pension de réversion, la
            succession, la clause bénéficiaire de l'assurance-vie et du PER, et le déblocage anticipé
            du PER.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#trois-statuts">Trois statuts, trois niveaux de protection</a></li>
              <li><a href="#reversion">La pension de réversion : réservée au mariage, dans tous les régimes</a></li>
              <li><a href="#succession">Sans testament, le partenaire pacsé et le concubin n'héritent de rien</a></li>
              <li><a href="#clause-beneficiaire">La clause bénéficiaire : l'outil qui met tout le monde à égalité</a></li>
              <li><a href="#per-deces">Le déblocage anticipé du PER en cas de décès du partenaire</a></li>
              <li><a href="#pourquoi-capitaliser">Pourquoi la capitalisation compte double sans réversion</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
            </ol>
          </div>

          <h2 id="trois-statuts">Trois statuts, trois niveaux de protection</h2>
          <p>
            Le mariage, le PACS (pacte civil de solidarité) et le concubinage (l'union libre, sans
            aucun contrat) ne sont pas trois variantes d'une même protection — ce sont trois régimes
            juridiques distincts, avec des conséquences très inégales sur la retraite et la
            transmission. Notre analyse, résumée avant le détail : le PACS se rapproche du mariage
            sur le terrain fiscal (donation, succession avec testament), mais s'en écarte nettement
            sur le terrain social, notamment la réversion. Le concubinage, lui, ne bénéficie d'aucune
            présomption de protection : tout ce qui doit exister entre les deux partenaires doit être
            organisé explicitement, par contrat ou par testament, faute de quoi le droit commun
            s'applique comme s'ils étaient des étrangers l'un pour l'autre.
          </p>

          <h2 id="reversion">La pension de réversion : réservée au mariage, dans tous les régimes</h2>
          <p>
            C'est le point le moins connu, et le plus structurant pour la retraite : la pension de
            réversion — la part de la pension du défunt reversée à son partenaire survivant — n'existe,
            dans tous les régimes de retraite français (régime général, Agirc-Arrco pour le privé,
            régimes de la fonction publique), que pour le conjoint marié. Ni le partenaire de PACS, ni
            le concubin n'y ont droit, quelle que soit la durée de la vie commune ou l'existence
            d'enfants communs. Ce n'est pas un oubli administratif ni une question de dossier mal
            rempli : c'est une condition d'accès posée par les textes eux-mêmes, identique d'un régime
            à l'autre.
          </p>
          <p>
            Pour un couple marié, la réversion n'est ni automatique ni universelle non plus — elle
            répond à ses propres conditions selon le régime concerné (âge, ressources selon les cas) —
            mais elle existe au moins par principe. Pour un couple pacsé ou en concubinage, elle
            n'existe tout simplement pas : au décès de l'un, l'autre ne percevra jamais un centime au
            titre de la réversion, aussi longtemps la vie commune ait-elle duré. C'est ce vide, plus
            que tout autre, qui justifie de construire soi-même, par la capitalisation, la protection
            qu'un couple marié reçoit en partie du système par répartition — voir la section{" "}
            <a href="#pourquoi-capitaliser">pourquoi la capitalisation compte double</a> plus bas.
          </p>
          <div className="note">
            <p>
              Une proposition de loi visant à étendre la réversion aux partenaires de PACS a été
              déposée à l'Assemblée nationale ; à la date de révision de cet article ({HYPOTHESES_MAJ}
              ), elle n'a pas été adoptée et ne crée aucun droit nouveau. Nous ne l'anticipons pas dans
              cette analyse — seul le droit en vigueur compte pour une décision aujourd'hui.
            </p>
          </div>

          <h2 id="succession">Sans testament, le partenaire pacsé et le concubin n'héritent de rien</h2>
          <p>
            Deuxième écart, tout aussi structurant : en l'absence de testament, seuls les parents par
            le sang (enfants, à défaut parents, frères et sœurs, etc.) sont héritiers légaux. Le
            conjoint marié bénéficie d'un statut d'héritier protégé par la loi elle-même. Le partenaire
            de PACS et le concubin, eux, n'ont légalement droit à rien — même après des décennies de
            vie commune, même avec des enfants ensemble, même si le logement a été payé à deux. Un
            testament n'est donc pas une option de confort pour un couple pacsé ou en concubinage :
            c'est la seule façon de transmettre quoi que ce soit à l'autre.
          </p>
          <p>
            Une fois le testament rédigé, le PACS et le mariage se rejoignent en grande partie sur le
            plan fiscal : les sommes transmises entre partenaires pacsés ou entre époux échappent aux
            droits de succession. Le concubinage reste, là encore, le statut le moins protecteur :
            même avec un testament, un concubin reste taxé selon le barème le plus lourd du droit des
            successions — le même qui s'applique entre deux personnes sans lien de parenté. Nous ne
            citons volontairement aucun taux précis dans cet article : ce barème n'a pas pu être
            revérifié ce cycle-ci (voir nos limites en fin d'article) et nous préférons signaler le
            principe plutôt qu'avancer un chiffre non vérifié.
          </p>
          <p>
            Un mécanisme similaire existe pour les donations de son vivant, avec un abattement propre
            aux partenaires de PACS distinct de celui applicable en ligne directe (parent-enfant) que
            nous détaillons dans notre guide{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">
              donation ou assurance-vie : comment transmettre à ses enfants
            </a>
            . Son montant exact n'est pas repris ici pour la même raison de prudence — à vérifier
            auprès d'un notaire avant toute opération.
          </p>

          <h2 id="clause-beneficiaire">La clause bénéficiaire : l'outil qui met tout le monde à égalité</h2>
          <p>
            Voici la bonne nouvelle de cet article : sur l'assurance-vie et le PER assurantiel, le
            statut marital ne joue quasiment aucun rôle. L'abattement de{" "}
            {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)} pour les versements effectués
            avant les 70 ans du souscripteur (barème en vigueur en {HYPOTHESES_MAJ}) s'apprécie{" "}
            <strong>par bénéficiaire désigné</strong>, pas selon le lien de parenté ou le statut marital
            avec le souscripteur. Un partenaire de PACS ou un concubin désigné dans la clause
            bénéficiaire profite exactement du même abattement qu'un conjoint marié — ce qui fait de
            l'assurance-vie et du PER assurantiel les deux seuls outils patrimoniaux réellement
            neutres sur ce plan.
          </p>
          <p>
            Une condition, en revanche, ne souffre aucune approximation : la rédaction de la clause.
            Une clause type « mon conjoint » ne couvre, juridiquement, que l'époux ou l'épouse — elle
            ne désigne ni un partenaire de PACS, ni un concubin, même nommément présenté comme tel
            depuis des années. Pour un partenaire pacsé, la clause doit soit le nommer précisément
            (nom, prénoms, date de naissance), soit mentionner explicitement sa qualité de partenaire
            de PACS. Pour un concubin, seule une rédaction « libre », qui identifie sans ambiguïté la
            personne (état civil complet, date et lieu de naissance), permet d'éviter toute contestation
            au moment du décès. Notre guide sur les{" "}
            <a href="/guide/risques-assurance-vie">risques réels de l'assurance-vie</a> revient plus
            largement sur les conséquences d'une clause bénéficiaire mal rédigée ou jamais actualisée.
          </p>
          <p>
            Dernier point de vigilance : une clause bénéficiaire se met à jour à chaque changement de
            situation — début de vie commune, PACS, mariage, séparation. Une clause rédigée avant la
            mise en couple, ou jamais relue depuis, ne protège personne : elle protège la situation
            qui existait au moment de sa rédaction.
          </p>

          <h2 id="per-deces">Le déblocage anticipé du PER en cas de décès du partenaire</h2>
          <p>
            Le PER prévoit un cas de déblocage anticipé pour décès — du titulaire lui-même, ou de son
            conjoint ou partenaire de PACS. Ce cas suit exactement la même logique que la réversion :
            il joue pour le conjoint marié et pour le partenaire de PACS, mais pas pour le concubin,
            même après de nombreuses années de vie commune, comme nous le détaillons dans notre guide{" "}
            <a href="/guide/deblocage-anticipe-per">
              déblocage anticipé du PER : les 6 cas, la fiscalité et les pièges
            </a>
            . C'est l'un des rares points, avec la clause bénéficiaire, où le PACS est traité à égalité
            avec le mariage plutôt que comme le concubinage.
          </p>

          <h2 id="pourquoi-capitaliser">Pourquoi la capitalisation compte double sans réversion</h2>
          <p>
            Reprenons le fil : un couple marié bénéficie, au décès de l'un des deux, d'un filet
            construit par le système par répartition lui-même — la réversion — même s'il reste
            partiel et soumis à conditions. Un couple pacsé ou en concubinage n'a, par construction,
            aucun filet de ce type : tout ce qui protégera le survivant devra avoir été construit de
            son vivant, par capitalisation (PER, assurance-vie) et par les bons documents juridiques
            (clause bénéficiaire, testament). Ce n'est pas une case à cocher parmi d'autres dans une
            stratégie retraite : pour un couple non marié, c'est la stratégie de protection du
            survivant tout court.
          </p>
          <p>
            Concrètement, cela renforce l'intérêt d'alimenter une assurance-vie ou un PER avec une
            clause bénéficiaire correctement rédigée en faveur du partenaire, plutôt que de compter sur
            un filet qui, pour ce type de couple, n'existe pas. Certains couples envisagent aussi,
            au moment de la conversion de leur épargne en revenus, une rente viagère avec option de
            réversion contractuelle (à ne pas confondre avec la réversion de la pension de retraite
            évoquée plus haut : ici, c'est l'assureur qui s'engage, pas la sécurité sociale) — une
            option possible parmi d'autres, sans recommandation de notre part dans cet article ; notre
            guide{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">
              rente viagère ou retraits programmés
            </a>{" "}
            et notre page{" "}
            <a href="/guide/inconvenients-rente-viagere">
              les inconvénients de la rente viagère
            </a>{" "}
            détaillent ce mécanisme et son coût. La bonne combinaison dépend entièrement de votre
            situation et mérite d'être posée lors d'un{" "}
            <a href="/bilan-retraite">bilan retraite</a>, où la question du statut marital fait partie
            des tout premiers points que nous vérifions.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Le PACS donne-t-il les mêmes droits que le mariage à la retraite ?</h3>
          <p>
            Non, pas entièrement. Sur le plan fiscal (donation, succession une fois un testament
            rédigé), le PACS se rapproche fortement du mariage. Mais sur la pension de réversion, il
            n'ouvre aucun droit, dans aucun régime — c'est la différence la plus importante à
            connaître pour préparer sa retraite en couple pacsé.
          </p>
          <h3>Un concubin peut-il hériter automatiquement de son partenaire ?</h3>
          <p>
            Non. Sans testament, un concubin n'est pas héritier légal et ne reçoit rien au décès de
            son partenaire, quelle que soit la durée de la vie commune. Un testament est la seule
            façon de lui transmettre quoi que ce soit.
          </p>
          <h3>La clause bénéficiaire « mon conjoint » couvre-t-elle mon partenaire de PACS ?</h3>
          <p>
            Non, juridiquement ce terme ne vise que l'époux ou l'épouse. Il faut désigner le partenaire
            de PACS nommément ou mentionner explicitement sa qualité, faute de quoi la clause pourrait
            être jugée inapplicable à son égard.
          </p>
          <h3>Se marier tardivement, uniquement pour la réversion, a-t-il un sens ?</h3>
          <p>
            C'est une question personnelle et patrimoniale qui dépasse le cadre de cet article : le
            mariage emporte des conséquences bien au-delà de la réversion (régime matrimonial,
            fiscalité du vivant, divorce éventuel). Ce point mérite d'être posé avec un professionnel
            plutôt que tranché à partir du seul critère de la réversion.
          </p>
          <h3>Le PACS protège-t-il mon partenaire si je décède avant la retraite ?</h3>
          <p>
            Sur la réversion, non — cette absence de droit ne dépend pas de l'âge au décès. Sur le
            reste (succession avec testament, clause bénéficiaire d'une assurance-vie ou d'un PER,
            déblocage anticipé du PER pour décès), le PACS protège de la même façon quel que soit
            l'âge auquel survient le décès.
          </p>

          <div className="note">
            <p>
              Cette analyse est générale et de nature pédagogique ; elle ne constitue pas un conseil
              juridique, fiscal ou notarial personnalisé. Le droit de la succession, des donations et
              du PACS dépend de règles précises qui évoluent avec chaque loi de finances et chaque
              réforme : elles doivent être vérifiées avec un notaire avant toute décision. Les montants
              cités sont les barèmes en vigueur en {HYPOTHESES_MAJ}, issus de{" "}
              <em>src/components/hypotheses.js</em> ; plusieurs chiffres évoqués dans cet article (taux
              de taxation des successions entre concubins, abattement de donation entre partenaires de
              PACS) n'ont volontairement pas été précisés faute de vérification possible ce cycle — voir
              nos limites ci-dessous.
            </p>
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Pacsés, en concubinage : parlons de la protection de votre partenaire dans votre stratégie retraite."
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
