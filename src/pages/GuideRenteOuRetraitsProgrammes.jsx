import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { TableRenteVsRetraits } from "../components/Simulateurs.jsx";
import {
  DECUMULATION,
  HYPOTHESES_MAJ,
  pct,
} from "../components/hypotheses.js";

export default function GuideRenteOuRetraitsProgrammes() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Le duel de la décumulation</span>
          <h1>Rente viagère ou retraits programmés : comment choisir ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> la rente viagère cède le capital à un assureur en
              échange d'un revenu garanti jusqu'au décès — elle protège contre le risque de
              longévité, mais rien ne revient aux héritiers en cas de décès prématuré, sauf option
              de réversion ou d'annuités garanties. Les retraits programmés laissent le capital
              investi et transmissible, avec une souplesse totale, mais exposent au risque
              d'épuiser ce capital si le rythme de retrait est trop élevé ou si les marchés
              traversent une période défavorable en début de retraite. Le bon choix dépend de deux
              curseurs personnels — la tolérance au risque de longévité et le besoin de
              transmettre — pas d'une règle universelle.
            </p>
          </div>

          <p>
            Le jour où vous arrêtez de constituer votre capital pour commencer à en vivre, une
            question se pose — et elle ne se pose qu'une fois, car les deux réponses sont
            difficiles à annuler une fois engagées. Faut-il convertir tout ou partie de son
            épargne en rente viagère, un revenu garanti par un assureur jusqu'au décès ? Ou
            vaut-il mieux garder le capital investi et en retirer une fraction chaque année, au
            rythme choisi ? Les deux logiques opposent le même arbitrage sous deux formes : la
            sécurité d'un revenu à vie contre la conservation d'un capital transmissible. Notre
            analyse détaille le mécanisme de chaque voie, les compare chiffres à l'appui, puis
            explique pourquoi le choix se tranche au cas par cas.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#rente">La rente viagère : un revenu à vie contre un capital cédé</a></li>
              <li><a href="#retraits">Les retraits programmés : la souplesse contre la garantie</a></li>
              <li><a href="#comparatif-chiffre">Le comparatif chiffré selon votre longévité</a></li>
              <li><a href="#comparatif-qualitatif">Le comparatif qualitatif, critère par critère</a></li>
              <li><a href="#mix">Et si on combinait les deux ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#conclusion">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="rente">La rente viagère : un revenu à vie contre un capital cédé</h2>
          <p>
            Le mécanisme est simple à énoncer : vous cédez un capital à un assureur, qui
            s'engage en contrepartie à vous verser un revenu régulier jusqu'à votre décès,
            quelle que soit sa durée — dix ans ou quarante ans. Le montant de ce revenu dépend
            du <strong>taux de conversion</strong>, c'est-à-dire le pourcentage du capital que
            l'assureur transforme chaque année en rente. À 65 ans, sans option, l'ordre de
            grandeur constaté sur le marché va de {pct(DECUMULATION.tauxConversionRente65.min)}{" "}
            à {pct(DECUMULATION.tauxConversionRente65.max)} (barèmes de conversion des
            assureurs, fondés sur les tables de mortalité réglementaires — les statistiques de
            durée de vie utilisées pour calculer les rentes ; hypothèses révisées en{" "}
            {HYPOTHESES_MAJ}, à vérifier contrat par contrat, car le taux varie aussi selon
            l'âge et les options choisies). Pour fixer les idées, un capital de 100 000 €
            converti au taux médian de {pct(DECUMULATION.tauxConversionRente65.defaut)}{" "}
            produirait une rente théorique d'environ 4 500 € par an, avant fiscalité — un
            exemple purement illustratif, non une projection.
          </p>
          <p>
            Deux options viennent moduler ce mécanisme, chacune à un coût implicite : elles
            abaissent le taux de conversion de départ, puisque l'assureur prend un engagement
            supplémentaire. La <strong>réversion</strong> prévoit qu'après votre décès, tout ou
            partie de la rente continue d'être versée à un bénéficiaire désigné, le conjoint le
            plus souvent. Les <strong>annuités garanties</strong> assurent que la rente sera
            versée pendant un nombre minimal d'années même en cas de décès précoce, au profit de
            vos bénéficiaires.
          </p>
          <p>
            L'avantage de la rente viagère tient en une idée : elle protège contre le{" "}
            <strong>risque de longévité</strong>, c'est-à-dire le risque de vivre plus longtemps
            que ce pour quoi votre capital avait été dimensionné. Ce risque n'a rien de
            théorique. D'après l'INSEE, à 65 ans un homme peut encore espérer vivre en moyenne{" "}
            {DECUMULATION.esperanceVie65.hommes} ans et une femme{" "}
            {DECUMULATION.esperanceVie65.femmes} ans (espérance de vie à 65 ans, données INSEE
            2023-2024) — et ce sont des moyennes qu'une partie non négligeable des retraités
            dépassera largement. Une fois la rente mise en place, cette question cesse de se
            poser : le revenu continue, quel que soit l'âge atteint, tant que l'assureur reste
            solvable.
          </p>
          <p>
            L'inconvénient est à la mesure de cet avantage : le capital est aliéné, c'est-à-dire
            définitivement cédé à l'assureur en échange de la rente. Sauf option de réversion ou
            annuités garanties — qui, on l'a vu, réduisent le revenu perçu —, rien ne revient aux
            héritiers en cas de décès précoce, y compris le lendemain de la conversion. Nous
            détaillons l'ensemble de ces limites, notamment ce qui se passe en cas de décès
            rapide ou de besoin de liquidités imprévu, dans notre guide dédié{" "}
            <a href="/guide/inconvenients-rente-viagere">
              les inconvénients de la rente viagère
            </a>.
          </p>

          <h2 id="retraits">Les retraits programmés : la souplesse contre la garantie</h2>
          <p>
            Le principe inverse consiste à ne rien céder : le capital reste investi, et vous en
            retirez régulièrement un montant — mensuel, trimestriel ou annuel — pour financer
            votre train de vie. Le reste du capital continue de fructifier, exposé aux marchés
            selon les supports choisis (fonds en euros, unités de compte, ou un mélange des
            deux). C'est l'assureur ou le teneur de compte qui vend automatiquement la fraction
            de parts nécessaire à chaque retrait ; le solde demeure investi et continue de
            produire, ou non, un rendement.
          </p>
          <p>
            Cette mécanique introduit un risque spécifique, moins intuitif que celui de la
            rente : le <strong>risque de séquence des rendements</strong>. En clair, ce n'est pas
            seulement la performance moyenne de vos placements sur toute la durée de la retraite
            qui compte, mais l'ordre dans lequel les bonnes et les mauvaises années surviennent.
            Un krach boursier au tout début de la retraite fait beaucoup plus de dégâts que le
            même krach quinze ans plus tard, pour une raison purement mécanique : quand vous
            retirez de l'argent en période de baisse, vous vendez des parts dépréciées pour vivre
            — et ces parts vendues au plus bas ne pourront jamais profiter du rebond qui suit
            généralement un krach. À rendement moyen identique sur l'ensemble de la période, deux
            successions d'années différentes peuvent ainsi conduire l'une à un capital préservé
            jusqu'à un âge avancé, l'autre à un capital épuisé prématurément.
          </p>
          <p>
            L'avantage des retraits programmés est à l'exact opposé de celui de la rente : le
            capital reste transmissible à tout moment, selon les règles successorales propres à
            l'enveloppe qui le contient, et la flexibilité est totale — vous pouvez ajuster le
            montant retiré, faire une pause, ou tout arrêter. L'inconvénient est le miroir de cet
            avantage : le risque d'épuisement du capital repose entièrement sur vous. Si le
            rythme de retrait choisi est trop élevé, ou si les marchés traversent une période
            durablement défavorable, en particulier en début de retraite, le capital peut
            s'éteindre avant la fin de vie — laissant alors le seul filet des pensions de
            retraite obligatoires.
          </p>

          <h2 id="comparatif-chiffre">Le comparatif chiffré selon votre longévité</h2>
          <p>
            Ces deux logiques ne se départagent pas dans l'absolu : leur issue dépend d'une
            variable que personne ne connaît à l'avance, votre longévité réelle. Le simulateur
            ci-dessous pousse la comparaison plus loin qu'un simple choix de principe : à revenu
            annuel identique — la rente et les retraits programmés servent ici le même montant
            chaque année, tant que le capital le permet — il calcule, selon l'âge de décès
            simulé, ce que chaque voie aura versé au total sur toute la retraite, et ce qu'il
            reste à transmettre à ce moment-là. Modifiez le capital de départ, le taux de
            conversion ou le rythme de retrait pour visualiser votre propre point de bascule :
            l'âge à partir duquel la rente devient plus avantageuse en cumul, et celui en deçà
            duquel les retraits programmés l'emportent, capital transmissible inclus.
          </p>
          <TableRenteVsRetraits />
          <p>
            La lecture de ce tableau est toujours la même, quels que soient les paramètres
            choisis : plus la durée de vie simulée s'allonge, plus la rente viagère rattrape puis
            dépasse le cumul des retraits programmés en euros versés — c'est précisément sa
            fonction de protection contre la longévité. À l'inverse, en cas de décès prématuré,
            les retraits programmés laissent un capital transmissible substantiel, quand la
            rente ne laisse rien, sauf réversion ou annuités garanties actives. Les montants
            affichés restent bruts, avant fiscalité, et le taux de conversion réel d'une rente
            dépend toujours de votre âge, du contrat et des options retenues.
          </p>

          <h2 id="comparatif-qualitatif">Le comparatif qualitatif, critère par critère</h2>
          <p>
            Au-delà des seuls flux financiers, les deux logiques se distinguent aussi sur des
            critères qui ne se réduisent pas à un chiffre : la sécurité perçue, la souplesse
            d'usage, ou le profil d'épargnant auquel chacune s'adresse le mieux.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Rente viagère</th>
                  <th>Retraits programmés</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sécurité du revenu</td>
                  <td>
                    Maximale : versement à vie garanti par l'assureur, hors défaillance de
                    celui-ci
                  </td>
                  <td>
                    Non garantie : dépend du rythme de retrait choisi et de l'évolution des
                    marchés
                  </td>
                </tr>
                <tr>
                  <td>Capital transmissible</td>
                  <td>
                    Aucun, sauf option de réversion ou annuités garanties (qui réduisent la
                    rente perçue)
                  </td>
                  <td>Oui, le solde se transmet selon les règles de l'enveloppe qui le contient</td>
                </tr>
                <tr>
                  <td>Souplesse</td>
                  <td>Nulle : la conversion en rente est irréversible</td>
                  <td>Totale : montant, fréquence et arrêt restent modulables</td>
                </tr>
                <tr>
                  <td>Fiscalité</td>
                  <td>
                    Variable selon l'origine de la rente (PER, assurance-vie, PEA, capital à
                    titre onéreux) — voir notre page{" "}
                    <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a>
                  </td>
                  <td>
                    Variable selon l'enveloppe d'où proviennent les retraits — même renvoi utile
                    pour la sortie du PER
                  </td>
                </tr>
                <tr>
                  <td>Risque principal</td>
                  <td>Aliénation définitive du capital, taux figé à la conversion</td>
                  <td>Risque de séquence des rendements et d'épuisement du capital</td>
                </tr>
                <tr>
                  <td>Pour quel profil ? (repères généraux)</td>
                  <td>
                    Faible tolérance au risque de longévité, besoin d'un plancher de revenu
                    garanti par l'assureur
                  </td>
                  <td>
                    Pensions obligatoires couvrant l'essentiel du train de vie, priorité donnée
                    à la transmission
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            L'ordre dans lequel vous décaissez vos différentes enveloppes avant même d'arbitrer
            entre rente et retraits pèse lui aussi sur le résultat final : c'est l'objet de notre
            guide <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement à la retraite</a>,
            et plus largement de notre page{" "}
            <a href="/strategies/decumulation">stratégie de décumulation</a>.
          </p>

          <h2 id="mix">Et si on combinait les deux ?</h2>
          <p>
            Les deux logiques ne s'excluent pas techniquement : convertir une fraction du
            capital en rente viagère pour sécuriser un socle de revenus vitaux, tout en pilotant
            le reste en retraits programmés pour conserver de la souplesse et un capital
            transmissible, est une option qui existe et que certains contrats permettent de
            mettre en œuvre. Sur le papier, ce mix cumule un plancher de revenu garanti et une
            marge de manœuvre pour les dépenses variables ou les projets de transmission.
          </p>
          <p>
            Notre analyse : cette combinaison reste une option théorique parmi d'autres, pas une
            recommandation par défaut. Nous ne disposons pas, à ce jour, d'éléments suffisants
            pour affirmer qu'elle constitue une pratique répandue ni pour en documenter la
            fréquence réelle dans les stratégies de décaissement. Elle mérite d'être posée sur la
            table au moment d'un bilan retraite, au même titre que les deux logiques prises
            séparément — ni plus, ni moins.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on revenir sur son choix après avoir converti son capital en rente viagère ?</h3>
          <p>
            Non, la conversion en rente viagère est en principe irréversible : le capital est
            aliéné, c'est-à-dire définitivement cédé à l'assureur en échange du revenu. C'est
            précisément pour cette raison que la décision mérite d'être posée avec soin avant
            d'être prise, et non ajustée après coup.
          </p>
          <h3>Peut-on convertir seulement une partie de son capital en rente viagère ?</h3>
          <p>
            Oui, c'est le principe du mix évoqué plus haut : convertir une fraction du capital
            pour sécuriser un socle de revenu garanti, tout en laissant le reste en retraits
            programmés pour conserver souplesse et capital transmissible.
          </p>
          <h3>Les retraits programmés peuvent-ils s'épuiser avant la fin de vie ?</h3>
          <p>
            Oui, c'est le risque principal de cette option : si le rythme de retrait choisi est
            trop élevé, ou si les marchés traversent une période durablement défavorable, en
            particulier en début de retraite, le capital peut s'éteindre avant la fin de vie. C'est
            pour cette raison que le rythme de retrait doit être dimensionné avec prudence plutôt
            que fixé arbitrairement.
          </p>
          <h3>La rente viagère est-elle réversible au conjoint par défaut ?</h3>
          <p>
            Non, la réversion est une option à choisir explicitement à la conversion, et elle a un
            coût : elle abaisse le taux de conversion de départ puisque l'assureur prend un
            engagement supplémentaire envers un second bénéficiaire.
          </p>
          <h3>Toutes les enveloppes permettent-elles à la fois la rente et les retraits programmés ?</h3>
          <p>
            Cela dépend du contrat et de l'enveloppe : certains produits ne proposent qu'une sortie
            en rente, d'autres qu'en capital ou en retraits, et d'autres encore les deux options,
            voire un mix. Vérifier les modalités de sortie disponibles sur son propre contrat fait
            partie des points à contrôler avant même la phase de constitution.
          </p>
          <h3>Faut-il décider entre rente et retraits programmés dès l'ouverture du contrat ?</h3>
          <p>
            Non, cette décision se prend en principe au moment du départ à la retraite, quand la
            situation personnelle, familiale et patrimoniale est mieux connue qu'au moment de
            l'ouverture du contrat, parfois des décennies plus tôt.
          </p>

          <h2 id="conclusion">Notre analyse, en synthèse</h2>
          <p>
            Il n'existe pas de règle universelle entre rente viagère et retraits programmés, et
            se méfier de quiconque en annonce une. Le choix se joue sur deux curseurs personnels
            que seul le titulaire du capital peut positionner : sa tolérance au risque de
            longévité — l'inconfort, ou non, à l'idée de dépendre d'un revenu qui pourrait
            s'éteindre avant sa propre vie — et son besoin de transmettre un capital à ses
            proches. Plus le premier curseur pèse lourd, plus la rente viagère, ou une part
            significative de rente dans un mix, mérite l'étude. Plus le second l'emporte, plus
            les retraits programmés, correctement dimensionnés et sécurisés contre le risque de
            séquence des rendements, s'imposent naturellement. Entre ces deux pôles, la bonne
            réponse reste, comme souvent en décumulation, un calcul au cas par cas plutôt qu'un
            principe général.
          </p>
          <p>
            Ne pas trancher cette question a, lui aussi, un coût : reporter la décision au-delà du
            moment où elle doit être prise revient souvent à la subir plutôt qu'à la choisir — un
            contrat qui bascule par défaut en gestion prudente faute d'arbitrage, une conversion en
            rente précipitée à un âge ou dans des conditions de marché qui ne sont pas optimales,
            ou à l'inverse des retraits programmés fixés sans jamais être révisés à la lumière de
            l'évolution réelle des marchés. Le risque de séquence des rendements en particulier
            frappe plus durement ceux qui n'ont rien anticipé que ceux qui ont, au moins, posé la
            question à temps.
          </p>
          <p>
            Pour aller plus loin sur ce qui doit se décider avant même d'arbitrer entre rente et
            retraits, notre guide{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement à la retraite</a>{" "}
            détaille dans quel ordre puiser dans ses différentes enveloppes une fois ce choix posé.
          </p>
          <p>
            C'est très exactement ce que nous reprenons lors d'un{" "}
            <a href="/bilan-retraite">bilan retraite gratuit</a> : positionner ensemble vos deux
            curseurs personnels — tolérance au risque de longévité et besoin de transmission — sur
            vos propres chiffres, votre propre âge et la composition réelle de votre patrimoine,
            plutôt que sur les moyennes générales de cet article.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle. Les
              taux de conversion et hypothèses de rendement cités sont des ordres de grandeur en
              vigueur en {HYPOTHESES_MAJ}, susceptibles d'évoluer selon les contrats et les
              barèmes ; les performances passées ne préjugent pas des performances futures.
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
