import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RENDEMENTS,
  FISCALITE,
  HYPOTHESES_MAJ,
  pct,
} from "../components/hypotheses.js";

export default function GuideLmnpRisques() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Transparence sur un statut populaire</span>
          <h1>LMNP : les risques que l'on vous cache</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le LMNP offre un avantage fiscal réel via l'amortissement,
              mais chacun de ses six risques principaux a une contrepartie concrète — dépendance à un
              exploitant, marché de revente plus étroit, vacance et coût comptable, et une réforme
              récente qui alourdit la fiscalité de la plus-value à la revente. Nous ne chiffrons
              volontairement pas l'ampleur exacte de cette réforme, faute de données fiables pour le
              faire sérieusement : mieux vaut cette prudence qu'un chiffre approximatif.
            </p>
          </div>
          <p>
            Le statut LMNP (loueur en meublé non professionnel) figure parmi les arguments
            commerciaux les plus utilisés du marché immobilier, résidences de services en tête.
            La brochure met en avant l'amortissement et la fiscalité allégée ; elle mentionne
            beaucoup plus rarement les risques qui vont avec. Ils ne sont pas rédhibitoires — mais
            les ignorer revient à acheter à moitié informé.
          </p>
          <p>
            Notre analyse : chaque avantage du LMNP a une contrepartie identifiable. La
            transparence commence par les nommer, mécanisme par mécanisme, sans dramatiser ni
            minimiser.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#amortissement">L'amortissement, le vrai argument de vente</a></li>
              <li><a href="#reforme">La réforme fiscale : ce qu'elle change à la revente</a></li>
              <li><a href="#exploitant">La dépendance à l'exploitant</a></li>
              <li><a href="#liquidite">La liquidité et la revente</a></li>
              <li><a href="#vacance">Vacance locative et comptabilité</a></li>
              <li><a href="#direct">Le LMNP en direct, hors résidence gérée</a></li>
              <li><a href="#tableau">Les six risques en un tableau</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="amortissement">L'amortissement, le vrai argument de vente</h2>
          <p>
            L'amortissement est le mécanisme comptable qui permet de déduire chaque année, du
            revenu locatif imposable, une fraction de la valeur du bien et du mobilier — sans
            qu'aucune somme ne sorte réellement de votre trésorerie cette année-là. C'est cet
            avantage, réel et parfaitement légal, qui explique la popularité du statut : il peut
            neutraliser une bonne partie, voire la totalité, de l'imposition des loyers pendant
            plusieurs années.
          </p>
          <p>
            Ce que l'argumentaire commercial détaille moins, c'est qu'il existe deux régimes
            fiscaux distincts, et qu'un seul donne accès à l'amortissement. Le micro-BIC (régime
            simplifié des bénéfices industriels et commerciaux) applique un abattement forfaitaire
            de 50 % sur les loyers perçus, sans aucune formalité comptable : simple, mais souvent
            moins avantageux dès que les charges réelles ou l'amortissement dépassent ce forfait.
            Le régime réel, lui, permet de déduire les charges effectives et de pratiquer
            l'amortissement — mais il exige une vraie tenue comptable, avec bilan et liasse
            fiscale, généralement confiée à un professionnel. L'avantage fiscal a donc un prix
            organisationnel qu'il faut intégrer dès le départ, pas découvrir après coup.
          </p>

          <h2 id="reforme">La réforme fiscale : ce qu'elle change à la revente</h2>
          <p>
            Un changement législatif est venu modifier le calcul de la plus-value à la revente des
            biens loués en LMNP au régime réel : les amortissements pratiqués pendant la durée de
            détention sont désormais réintégrés dans ce calcul, ce qui augmente la base taxable
            lors de la cession — alors qu'ils ne l'étaient pas auparavant. C'est un renversement
            réel de la mécanique, et il mérite d'être connu avant tout achat, pas découvert au
            moment de vendre.
          </p>
          <p>
            Sur l'ampleur de cet effet, nous resterons volontairement prudents. Les éléments dont
            nous disposons indiquent que cette réintégration pénalise avant tout les reventes
            précoces, c'est-à-dire avant vingt à trente ans de détention, et qu'elle pèse
            beaucoup moins sur un investissement conservé sur le très long terme. Nous ne
            disposons toutefois pas, à ce stade, d'un calcul détaillé et vérifié permettant de
            chiffrer précisément cet impact selon la durée de détention, le prix d'achat ou le
            taux d'amortissement retenu — et nous préférons ne publier aucun exemple chiffré
            plutôt qu'un exemple approximatif.
          </p>
          <div className="note">
            <p>
              Point de vigilance : cette réforme touche directement l'horizon de placement optimal
              d'un LMNP au régime réel. Avant toute décision d'achat ou d'arbitrage sur un bien
              déjà détenu, faites vérifier par un professionnel du chiffre (expert-comptable,
              conseiller en gestion de patrimoine) l'impact exact sur votre situation et sur la
              durée de détention envisagée. Un projet d'achat récent doit intégrer cette donnée
              dans le calcul de rentabilité dès le départ, et non l'découvrir à la revente.
            </p>
          </div>

          <h2 id="exploitant">La dépendance à l'exploitant</h2>
          <p>
            Dans une résidence de services gérée — étudiante, senior ou de tourisme —, vous ne
            louez pas directement à un occupant : vous signez un bail commercial avec un
            exploitant, qui sous-loue les logements et vous reverse un loyer, généralement garanti
            contractuellement pendant la durée du bail. C'est l'argument de tranquillité mis en
            avant : plus de recherche de locataire, plus de vacance à gérer soi-même.
          </p>
          <p>
            La contrepartie est une dépendance totale à un tiers. Si l'exploitant rencontre des
            difficultés financières, le versement du loyer peut être retardé, réduit, voire
            interrompu. Au renouvellement du bail commercial — échéance qui revient
            périodiquement —, l'exploitant est en position de force pour renégocier le loyer à la
            baisse, notamment si la résidence a mal vieilli ou si le marché local s'est dégradé.
            Changer d'exploitant en cours de bail, ou à son terme, est en pratique complexe :
            cela suppose de convaincre l'ensemble des copropriétaires-bailleurs de la résidence,
            pas seulement vous-même, ce qui peut prendre du temps et n'aboutit pas toujours.
          </p>

          <h2 id="liquidite">La liquidité et la revente</h2>
          <p>
            Un bien LMNP en résidence gérée se revend sur un marché plus étroit qu'un logement
            classique. L'acheteur potentiel n'est pas un futur habitant qui se projette dans les
            lieux, mais un autre investisseur, qui va scruter le bail commercial restant, le
            niveau de loyer, la solidité de l'exploitant et le rendement net avant de se
            positionner. Cela réduit mécaniquement le nombre d'acquéreurs possibles et peut
            allonger les délais de revente, particulièrement si le bail arrive à échéance ou si
            l'exploitant traverse une période difficile — deux situations qui coïncident souvent.
          </p>
          <p>
            Le LMNP en direct, hors résidence gérée, se revend en principe plus facilement,
            puisqu'il s'adresse aussi bien à un investisseur qu'à un futur occupant. Mais dans les
            deux cas, un bien loué reste moins liquide qu'un actif financier coté : la revente
            prend du temps, et ce délai doit être anticipé dans la construction de votre stratégie
            retraite, pas découvert au moment où vous avez besoin de liquidités.
          </p>

          <h2 id="vacance">Vacance locative et comptabilité</h2>
          <p>
            Même garanti par bail commercial, un loyer LMNP n'est jamais à l'abri d'un aléa :
            défaillance de l'exploitant, renégociation, ou simplement vacance en LMNP en direct. Ce
            risque doit être intégré au calcul de rentabilité dès l'achat, et non traité comme une
            hypothèse basse improbable.
          </p>
          <p>
            S'ajoute une contrainte plus discrète mais bien réelle : au régime réel, la tenue
            comptable n'est pas optionnelle. Bilan, compte de résultat, liasse fiscale — la
            plupart des propriétaires en LMNP au réel délèguent cette obligation à un
            expert-comptable, ce qui représente un coût récurrent à intégrer dans le calcul de
            rentabilité net. Ce coût varie sensiblement selon les cabinets et la complexité du
            dossier ; nous ne disposons pas, à ce stade, d'une fourchette vérifiée que nous
            pourrions publier de façon fiable, mais son existence doit être budgétée dès le
            départ, au même titre que la taxe foncière ou l'assurance du bien.
          </p>

          <h2 id="direct">Le LMNP en direct, hors résidence gérée</h2>
          <p>
            Le LMNP ne se limite pas aux résidences de services : il s'applique à tout logement
            meublé loué en direct, sans bail commercial ni exploitant intermédiaire. Cette version
            du statut élimine le risque de dépendance décrit plus haut, mais elle réintroduit tout
            ce que la résidence gérée était censée épargner à l'investisseur : recherche du
            locataire, états des lieux, gestion des impayés, entretien courant, remplacement du
            mobilier. Cette gestion locative réelle peut être assumée en direct ou déléguée à une
            agence moyennant des honoraires, mais elle ne disparaît dans aucun des deux cas — elle
            change seulement de main. C'est un arbitrage à part entière entre temps disponible,
            tolérance à la gestion et rendement net attendu, dont notre guide{" "}
            <a href="/guide/lmnp-ou-locatif-nu">LMNP ou locatif nu</a> détaille les termes.
          </p>
          <p>
            Sur le plan des ordres de grandeur, le rendement locatif brut constaté en meublé se
            situe, selon les villes, autour de {pct(RENDEMENTS.lmnp.moyen)} en moyenne
            (fourchette {pct(RENDEMENTS.lmnp.min)} à {pct(RENDEMENTS.lmnp.max)}, observatoires des
            loyers {RENDEMENTS.lmnp.periode}) — un ordre de grandeur brut, hors vacance, travaux et
            fiscalité, qui ne préjuge en rien du rendement net réel de votre projet ni des
            performances futures du marché locatif local.
          </p>

          <h2 id="tableau">Les six risques en un tableau</h2>
          <p>
            Voici la synthèse des six mécanismes détaillés ci-dessus, à garder comme grille de
            vigilance plutôt que comme motif d'écarter le statut par principe.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Risque</th>
                  <th>Mécanisme</th>
                  <th>Contre-mesure</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Charge comptable du régime réel</td>
                  <td>
                    Seul le régime réel donne accès à l'amortissement, mais il exige bilan et
                    liasse fiscale, généralement confiés à un expert-comptable
                  </td>
                  <td>Budgéter ce coût récurrent dès le calcul de rentabilité initial</td>
                </tr>
                <tr>
                  <td>Réforme fiscale sur la plus-value de revente</td>
                  <td>
                    Les amortissements pratiqués sont désormais réintégrés dans le calcul de la
                    plus-value imposable à la revente, ce qui alourdit la fiscalité, surtout en
                    cas de revente précoce
                  </td>
                  <td>
                    Faire vérifier l'impact exact par un professionnel du chiffre avant tout achat
                    ou arbitrage — nous ne publions volontairement aucun chiffre faute de données
                    fiables pour le faire sérieusement
                  </td>
                </tr>
                <tr>
                  <td>Dépendance à l'exploitant</td>
                  <td>
                    En résidence gérée, le loyer dépend de la solidité financière de l'exploitant
                    et de sa position de force au renouvellement du bail commercial
                  </td>
                  <td>
                    Étudier la solidité de l'exploitant avant achat ; savoir que changer
                    d'exploitant suppose l'accord de l'ensemble des copropriétaires-bailleurs
                  </td>
                </tr>
                <tr>
                  <td>Liquidité et étroitesse du marché de revente</td>
                  <td>
                    Un bien en résidence gérée se revend surtout à d'autres investisseurs, qui
                    scrutent le bail restant et la solidité de l'exploitant
                  </td>
                  <td>Anticiper un délai de revente plus long dans la construction de la stratégie</td>
                </tr>
                <tr>
                  <td>Vacance locative</td>
                  <td>
                    Même garanti par bail commercial, un loyer n'est jamais à l'abri d'une
                    défaillance, d'une renégociation ou d'une vacance en direct
                  </td>
                  <td>Intégrer une hypothèse de vacance réaliste au calcul de rentabilité dès l'achat</td>
                </tr>
                <tr>
                  <td>Gestion réelle en LMNP direct</td>
                  <td>
                    Hors résidence gérée, la recherche de locataire, les impayés et l'entretien
                    reviennent à l'investisseur ou à une agence rémunérée
                  </td>
                  <td>
                    Valoriser le temps passé ou le coût d'une délégation avant de choisir cette
                    voie par défaut
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Le LMNP est-il plus risqué que le locatif nu ?</h3>
          <p>
            Pas plus risqué dans l'absolu, mais différemment : le locatif nu n'a pas de dépendance
            à un exploitant ni la même charge comptable, mais il n'offre pas non plus
            l'amortissement. Notre guide{" "}
            <a href="/guide/lmnp-ou-locatif-nu">LMNP ou locatif nu</a> détaille cet arbitrage
            complet, au-delà des seuls risques traités ici.
          </p>
          <h3>Peut-on éviter tous ces risques en investissant en LMNP via une SCPI plutôt qu'en direct ?</h3>
          <p>
            Une SCPI mutualise le risque locatif et de gestion sur de nombreux biens, ce qui répond
            à certains des risques évoqués ici (vacance, gestion), mais elle en introduit d'autres,
            propres à ce véhicule (frais d'entrée, liquidité des parts). Le sujet mérite un examen
            à part entière, que nous ne développons pas ici : voir{" "}
            <a href="https://scpirentable.fr">scpirentable.fr</a>.
          </p>
          <h3>Faut-il éviter les résidences de services à cause du risque exploitant ?</h3>
          <p>
            Non, mais ce risque doit être étudié avant l'achat, pas découvert après : la solidité
            financière de l'exploitant, son ancienneté sur ce type de résidence et les conditions du
            bail commercial sont des points à vérifier systématiquement, pas des détails annexes.
          </p>
          <h3>La réintégration des amortissements à la revente s'applique-t-elle au micro-BIC ?</h3>
          <p>
            Non, cette réforme ne concerne que le régime réel, seul régime qui pratique
            l'amortissement. Le micro-BIC, avec son abattement forfaitaire, n'est pas affecté par ce
            mécanisme, mais il ne bénéficie pas non plus de l'avantage fiscal de l'amortissement en
            phase de détention.
          </p>
          <h3>Un bien LMNP mal choisi peut-il devenir invendable ?</h3>
          <p>
            Invendable serait excessif, mais un bien en résidence gérée dont l'exploitant est
            fragile ou le bail arrive à échéance peut voir son délai de revente s'allonger
            fortement et son prix se négocier nettement à la baisse — d'où l'importance d'étudier
            ces éléments avant l'achat plutôt qu'à la revente.
          </p>
          <h3>Faut-il renoncer au LMNP à cause de l'incertitude sur la réforme fiscale ?</h3>
          <p>
            Pas nécessairement : l'incertitude porte sur l'ampleur exacte de l'impact selon la durée
            de détention, pas sur l'existence même de l'avantage fiscal en phase de détention, qui
            reste réel. Elle justifie en revanche de faire vérifier l'impact par un professionnel
            avant de s'engager, et de privilégier un horizon de détention long plutôt qu'une
            revente rapide.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le LMNP n'est pas un dispositif à écarter par principe : l'amortissement reste un
            avantage fiscal réel, légal, et significatif pour qui investit dans la durée. Mais il
            se choisit en connaissance de six mécanismes précis — le régime fiscal retenu et sa
            charge comptable, la réforme sur la plus-value de revente, la dépendance contractuelle
            à un exploitant, l'étroitesse du marché de revente, le risque de vacance et le coût de
            la comptabilité, la réalité de la gestion en direct — et non sur le seul argument
            commercial de la brochure. Chacun de ces risques se pèse différemment selon votre
            horizon de détention, votre tolérance à la gestion et le reste de votre patrimoine.
          </p>
          <p>
            Pour resituer le LMNP dans une stratégie retraite plus large, nos guides{" "}
            <a href="/guide/combien-coute-un-investissement-locatif">
              combien coûte un investissement locatif
            </a>{" "}
            et <a href="/guide/cinq-erreurs-investissement-locatif-retraite">
              cinq erreurs sur l'investissement locatif à la retraite
            </a>{" "}
            complètent cette analyse, et notre page{" "}
            <a href="/strategies/immobilier-retraite">immobilier et retraite</a> replace le LMNP
            parmi les autres options patrimoniales.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle,
              idéalement avec un professionnel du chiffre pour les aspects comptables et fiscaux.
              Les montants et taux cités sont ceux en vigueur en {HYPOTHESES_MAJ} — notamment le
              taux de prélèvements sociaux applicable aux revenus immobiliers, maintenu à{" "}
              {pct(FISCALITE.prelevementsSociaux.immobilier)} — susceptibles d'évoluer à chaque
              loi de finances. Les rendements mentionnés sont des constats passés datés ; les
              performances passées ne préjugent pas des performances futures.
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
