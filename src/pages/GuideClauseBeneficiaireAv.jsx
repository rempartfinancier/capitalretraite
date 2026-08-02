import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { TRANSMISSION, HYPOTHESES_MAJ, euros } from "../components/hypotheses.js";

export default function GuideClauseBeneficiaireAv() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide risques</span>
          <h1>Clause bénéficiaire d'assurance-vie : les erreurs qui coûtent cher à la transmission</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> la clause bénéficiaire désigne qui touche le capital de
              votre assurance-vie à votre décès — mais une clause vague, jamais mise à jour, ou mal
              articulée avec le reste de votre situation familiale peut annuler l'avantage fiscal de
              l'article 990 I du Code général des impôts, retarder le versement de plusieurs mois, ou
              diriger les fonds vers une personne qui n'est plus celle que vous visiez. Cinq erreurs
              reviennent le plus souvent : la clause type « mon conjoint, à défaut mes enfants »
              jamais actualisée après un divorce ou un remariage, l'absence de répartition chiffrée
              entre plusieurs bénéficiaires, le démembrement mal rédigé sans convention de
              quasi-usufruit, l'oubli de mise à jour après un événement familial, et l'absence pure et
              simple de clause bénéficiaire désignée.
            </p>
          </div>

          <p>
            La clause bénéficiaire est probablement la partie la plus sous-estimée d'un contrat
            d'assurance-vie : on la remplit une fois, à l'ouverture, souvent sur une formule
            pré-imprimée proposée par le distributeur, et on l'oublie ensuite pendant des années,
            parfois des décennies — alors même que la situation familiale change (mariage, divorce,
            naissance, décès d'un bénéficiaire, remariage). Ce guide ne revient pas sur la mécanique
            générale de la transmission par assurance-vie, déjà détaillée dans notre guide{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">
              donation ou assurance-vie
            </a>
            : il se concentre spécifiquement sur les erreurs de rédaction de la clause bénéficiaire
            elle-même, celles qui peuvent faire perdre tout ou partie de l'avantage attendu.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#erreur1">Erreur 1 : la clause type jamais actualisée</a></li>
              <li><a href="#erreur2">Erreur 2 : pas de répartition chiffrée entre plusieurs bénéficiaires</a></li>
              <li><a href="#erreur3">Erreur 3 : le démembrement mal rédigé, sans convention de quasi-usufruit</a></li>
              <li><a href="#erreur4">Erreur 4 : oublier de mettre à jour après un événement familial</a></li>
              <li><a href="#erreur5">Erreur 5 : l'absence de clause bénéficiaire désignée</a></li>
              <li><a href="#bonnes-pratiques">Les bonnes pratiques de rédaction</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#checklist">Check-list : relire sa clause bénéficiaire en 10 minutes</a></li>
            </ol>
          </div>

          <h2 id="erreur1">Erreur 1 : la clause type jamais actualisée</h2>
          <p>
            La formule la plus répandue, encore aujourd'hui proposée par défaut par de nombreux
            contrats, est « mon conjoint, à défaut mes enfants nés ou à naître, vivants ou représentés,
            par parts égales entre eux ». Elle a un mérite : elle fonctionne sans qu'il soit nécessaire
            d'y revenir tant que la situation familiale ne change pas. Son défaut, c'est précisément
            que la situation familiale change souvent, et que le terme « conjoint » n'a pas la même
            portée juridique selon qu'il vise un époux, un partenaire de Pacs ou un concubin — une
            ambiguïté qui peut, en cas de litige, retarder considérablement le versement du capital.
          </p>
          <p>
            Le cas le plus fréquent que nous rencontrons est celui d'un divorce ou d'une séparation
            survenu après la souscription du contrat, sans que la clause n'ait jamais été mise à jour :
            l'ex-conjoint reste juridiquement désigné bénéficiaire tant que la clause n'a pas été
            explicitement modifiée, indépendamment du fait que le divorce soit prononcé par ailleurs.
            Un contrat d'assurance-vie est indépendant du droit de la famille sur ce point précis — le
            divorce civil ne modifie pas automatiquement la clause bénéficiaire d'un contrat.
          </p>

          <h2 id="erreur2">Erreur 2 : pas de répartition chiffrée entre plusieurs bénéficiaires</h2>
          <p>
            Lorsqu'une clause désigne plusieurs bénéficiaires sans préciser de quotité précise
            (« mes enfants », sans indiquer 50 %, 30 %, 20 % par exemple pour trois enfants d'un
            premier et d'un second lit), la répartition par défaut se fait en principe à parts égales
            — ce qui peut ne pas correspondre du tout à l'intention réelle du souscripteur, surtout
            dans une famille recomposée où les enfants ne sont pas dans la même situation patrimoniale
            ou n'ont pas le même lien avec le souscripteur. Chiffrer explicitement chaque part dans la
            clause évite toute contestation ultérieure sur l'interprétation d'une formule vague, et
            permet de moduler la répartition selon la situation réelle de chacun.
          </p>

          <h2 id="erreur3">Erreur 3 : le démembrement mal rédigé, sans convention de quasi-usufruit</h2>
          <p>
            Le démembrement de la clause bénéficiaire consiste à désigner le conjoint survivant comme
            bénéficiaire en usufruit du capital décès, et les enfants comme bénéficiaires en
            nue-propriété — une technique qui permet au conjoint de continuer à disposer des sommes de
            son vivant tout en préparant, en parallèle, la transmission aux enfants avec une base
            taxable réduite. C'est un montage efficace, mais qui exige une rédaction précise : sans
            convention de quasi-usufruit formalisée et enregistrée auprès de l'administration fiscale,
            les enfants nus-propriétaires risquent de ne pas pouvoir faire valoir leur créance de
            restitution lors de la liquidation de la succession du conjoint survivant, des années plus
            tard — ce qui peut, dans les faits, annuler l'avantage recherché par le démembrement.
          </p>
          <p>
            Ce point technique dépasse largement le cadre d'un article généraliste : un démembrement de
            clause bénéficiaire mal rédigé peut coûter, en pratique, plus cher qu'il ne rapporte. Il ne
            devrait jamais être mis en place sans l'accompagnement d'un notaire ou d'un conseiller
            spécialisé, capable de rédiger à la fois la clause et la convention de quasi-usufruit qui
            l'accompagne.
          </p>

          <h2 id="erreur4">Erreur 4 : oublier de mettre à jour après un événement familial</h2>
          <p>
            Naissance d'un enfant, décès d'un bénéficiaire déjà désigné, remariage, changement de
            régime matrimonial : chacun de ces événements devrait déclencher une relecture de la
            clause bénéficiaire, ce qui n'arrive presque jamais en pratique tant qu'aucun problème ne
            s'est manifesté. Un bénéficiaire décédé avant le souscripteur et jamais retiré de la
            clause, par exemple, peut créer une ambiguïté sur la répartition entre les bénéficiaires
            restants selon la formule exacte employée (« par parts égales entre eux » ne produit pas le
            même effet que « à défaut, ses propres enfants »).
          </p>

          <h2 id="erreur5">Erreur 5 : l'absence de clause bénéficiaire désignée</h2>
          <p>
            En l'absence de clause bénéficiaire ou si celle-ci est jugée invalide (formulation
            contradictoire, bénéficiaire non identifiable), le capital réintègre en principe la
            succession classique du souscripteur, avec application des droits de succession de droit
            commun — perdant ainsi l'abattement dédié de {euros(TRANSMISSION.abattementSuccessionAvParBeneficiaire)}{" "}
            par bénéficiaire prévu à l'article 990 I du Code général des impôts pour les versements
            avant 70 ans. C'est l'erreur la plus radicale et, paradoxalement, l'une des plus fréquentes
            chez des souscripteurs pressés à l'ouverture du contrat, qui reportent la rédaction de la
            clause « à plus tard » et ne le font jamais.
          </p>

          <h2 id="bonnes-pratiques">Les bonnes pratiques de rédaction</h2>
          <p>
            Quelques principes limitent l'essentiel de ces risques : nommer précisément les
            bénéficiaires par leur état civil complet plutôt que par une formule générique, chiffrer
            systématiquement les quotités quand plusieurs bénéficiaires sont désignés, prévoir des
            bénéficiaires de second rang (« à défaut de… ») pour couvrir le cas où le bénéficiaire
            principal décéderait avant le souscripteur, et relire la clause à chaque événement familial
            majeur — pas seulement à l'ouverture du contrat. Pour un démembrement, ne jamais rédiger la
            clause sans l'accompagnement d'un professionnel qui formalisera en parallèle la convention
            de quasi-usufruit.
          </p>
          <p>
            Un dernier point souvent ignoré : la clause bénéficiaire peut être rédigée directement dans
            le contrat ou sous la forme d'un document séparé, appelé avenant ou clause bénéficiaire
            testamentaire, déposé chez un notaire. Cette seconde option, plus formelle, offre une
            sécurité supplémentaire pour les clauses complexes (démembrement, répartitions inégales
            entre enfants de lits différents) car elle échappe au risque d'erreur de saisie ou de perte
            d'un formulaire papier chez l'assureur.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Un divorce modifie-t-il automatiquement ma clause bénéficiaire ?</h3>
          <p>
            Non. Tant que vous n'avez pas explicitement modifié la clause, un ex-conjoint désigné
            bénéficiaire par une formule type reste juridiquement bénéficiaire, indépendamment du
            divorce prononcé par ailleurs. C'est l'une des erreurs les plus fréquentes et les plus
            lourdes de conséquences.
          </p>
          <h3>Puis-je modifier ma clause bénéficiaire à tout moment ?</h3>
          <p>
            Oui, en principe librement et à tout moment de votre vivant, sans avoir à en informer ni à
            recueillir l'accord des bénéficiaires actuels ou futurs — sauf si vous avez expressément
            accepté qu'un bénéficiaire devienne « bénéficiaire acceptant », ce qui verrouille alors la
            clause et requiert son accord pour toute modification ultérieure.
          </p>
          <h3>Qu'est-ce qu'une convention de quasi-usufruit et pourquoi est-elle indispensable en cas de démembrement ?</h3>
          <p>
            C'est un document formalisant l'engagement du conjoint usufruitier à restituer, à son
            propre décès, une créance équivalente au capital reçu aux enfants nus-propriétaires. Sans
            cette convention, enregistrée auprès de l'administration fiscale, les enfants risquent de
            ne pas pouvoir faire valoir leur créance lors de la seconde succession, ce qui peut annuler
            l'avantage fiscal du démembrement.
          </p>
          <h3>Que se passe-t-il si un bénéficiaire désigné est décédé au moment de mon propre décès ?</h3>
          <p>
            Cela dépend de la formulation exacte de la clause : une formule prévoyant des bénéficiaires
            de second rang permet une transmission fluide vers eux ; en l'absence d'une telle
            prévision, la part revenant au bénéficiaire décédé peut se répartir entre les autres
            bénéficiaires désignés ou, à défaut, réintégrer la succession classique — d'où l'importance
            de toujours prévoir un « à défaut de… » dans la rédaction.
          </p>
          <h3>Faut-il faire relire sa clause bénéficiaire par un professionnel même sans démembrement ?</h3>
          <p>
            Pour une situation familiale simple et stable, une clause type bien rédigée peut suffire.
            Dès que la situation se complexifie — famille recomposée, démembrement, répartition
            inégale entre enfants, capitaux importants — l'avis d'un notaire ou d'un conseiller devient
            un vrai point de vigilance, le coût d'une erreur de rédaction étant sans commune mesure
            avec celui d'une relecture professionnelle.
          </p>

          <h2 id="checklist">Check-list : relire sa clause bénéficiaire en 10 minutes</h2>
          <ol>
            <li>
              <strong>Sortez le libellé exact de votre clause actuelle</strong> auprès de votre
              assureur, souvent consultable sur votre espace client.
            </li>
            <li>
              <strong>Vérifiez que les personnes nommées correspondent à votre situation actuelle</strong>,
              pas à celle du jour de la souscription.
            </li>
            <li>
              <strong>Contrôlez la présence de quotités chiffrées</strong> si plusieurs bénéficiaires
              sont désignés.
            </li>
            <li>
              <strong>Vérifiez qu'un « à défaut de… » couvre le décès prématuré d'un bénéficiaire</strong>.
            </li>
            <li>
              <strong>Si un démembrement est en place</strong>, vérifiez qu'une convention de
              quasi-usufruit existe et a été enregistrée.
            </li>
          </ol>
          <div className="note">
            <p>
              Cette analyse est générale et de nature pédagogique ; elle ne constitue pas un conseil
              juridique ou notarial personnalisé. La rédaction d'une clause bénéficiaire, et plus
              encore d'une clause démembrée avec convention de quasi-usufruit, dépend de votre
              situation familiale et patrimoniale précise et doit être validée avec un notaire. Les
              montants d'abattement cités sont les barèmes en vigueur en {HYPOTHESES_MAJ}, susceptibles
              d'évoluer à chaque loi de finances. Pour la mécanique générale de la transmission par
              assurance-vie, voir notre guide{" "}
              <a href="/guide/donation-ou-assurance-vie-transmission">
                donation ou assurance-vie
              </a>
              .
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Faisons le point sur votre clause bénéficiaire dans le cadre de votre stratégie retraite"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
