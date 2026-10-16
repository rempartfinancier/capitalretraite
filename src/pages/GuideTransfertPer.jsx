import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { HYPOTHESES_MAJ } from "../components/hypotheses.js";

const SITUATIONS = [
  {
    cas: "Un PER individuel vers un autre PER individuel",
    quand: "Contrat décevant (frais, supports), changement d'établissement",
    point: "Le cas le plus simple : le seul vrai sujet est le coût du transfert et ce que vous perdez en route",
  },
  {
    cas: "Un ancien contrat (PERP, Madelin, article 83, Préfon) vers un PER",
    quand: "Vous souhaitez moderniser un contrat d'avant la loi Pacte",
    point: "Les anciens contrats portent parfois des garanties de rente que le PER n'offre pas : à vérifier avant de signer",
  },
  {
    cas: "Un PER d'entreprise (ex-PERCO, PERECO) vers un PER individuel",
    quand: "Départ de l'entreprise, ou plan collectif jugé trop cher",
    point: "Les règles dépendent du compartiment (versements volontaires, épargne salariale, obligatoires) et de votre situation",
  },
  {
    cas: "Un PER assurantiel vers un PER compte-titres (ou l'inverse)",
    quand: "Vous voulez changer de logique de gestion (supports en unités de compte, gestion directe)",
    point: "Possible en principe, mais les supports sont vendus : voir « Les pièges » plus bas",
  },
];

export default function GuideTransfertPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Changer de PER sans perdre l'essentiel</span>
          <h1>Transférer son PER : frais, délais et pièges avant de changer de contrat</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> un PER peut être transféré vers un autre PER, et ce
              transfert est neutre fiscalement : il ne déclenche ni impôt ni perte de l'antériorité
              fiscale. Les frais de transfert sont plafonnés par la loi avant cinq ans de détention
              et interdits au-delà ; l'ancien gestionnaire dispose d'un délai légal de deux mois
              pour transférer les fonds. Le vrai coût d'un transfert se situe ailleurs : dans les
              supports vendus puis rachetés (le temps passé hors marché), dans les garanties
              abandonnées sur un contrat ancien, et dans les frais du nouveau contrat, qui peuvent
              dépasser ceux de l'ancien. Notre analyse : un transfert se justifie quand l'écart de
              frais annuels est durable et mesurable, jamais pour un argument commercial.
            </p>
          </div>

          <p>
            Vous détenez un PER depuis plusieurs années, et un doute s'installe : les frais sont-ils
            raisonnables, les supports adaptés, le gestionnaire à la hauteur ? La loi Pacte a créé
            en 2019 une vraie portabilité : le plan se transfère, et ce transfert est encadré.
            Beaucoup d'épargnants l'ignorent et restent par défaut dans un contrat qu'ils ne
            choisiraient plus aujourd'hui.
          </p>
          <p>
            Notre analyse : la possibilité de transférer est une bonne nouvelle, mais elle crée un
            nouveau risque, celui de changer par réflexe. Un transfert est une décision à part
            entière, avec un coût, un délai et des effets de bord. Cet article détaille ces trois
            éléments, puis les questions à poser avant de signer.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#situations">Ce qui peut être transféré, et vers quoi</a></li>
              <li><a href="#frais">Les frais de transfert : le plafond et la règle des cinq ans</a></li>
              <li><a href="#delais">Les délais et la marche à suivre</a></li>
              <li><a href="#fiscalite">Ce que le transfert ne change pas</a></li>
              <li><a href="#pieges">Les pièges : ce que coûte vraiment un transfert</a></li>
              <li><a href="#quand">Quand cela vaut le coup, quand mieux vaut rester</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="situations">Ce qui peut être transféré, et vers quoi</h2>
          <p>
            Le tableau ci-dessous résume les situations les plus courantes chez les cadres et les
            fonctionnaires qui cumulent plusieurs contrats retraite au fil de leur carrière.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Transfert</th>
                  <th>Déclencheur habituel</th>
                  <th>Point d'attention</th>
                </tr>
              </thead>
              <tbody>
                {SITUATIONS.map((ligne) => (
                  <tr key={ligne.cas}>
                    <td>{ligne.cas}</td>
                    <td>{ligne.quand}</td>
                    <td>{ligne.point}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Les conditions précises (compartiments concernés, transfert d'un plan collectif vers un
            plan individuel pendant l'activité) varient selon la nature du plan et sont fixées par
            la loi et par le règlement du contrat. Elles se vérifient dans les conditions générales
            et auprès du gestionnaire, pas à partir d'une règle générale : c'est l'un des éléments
            que nous contrôlons systématiquement dans un{" "}
            <a href="/bilan-retraite">bilan retraite</a>. Pour les plans d'entreprise, notre guide{" "}
            <a href="/guide/per-bancaire-frais-gestion-horizon">PER bancaire : frais, gestion et horizon</a>{" "}
            détaille le cas du transfert d'un plan collectif.
          </p>

          <h2 id="frais">Les frais de transfert : le plafond et la règle des cinq ans</h2>
          <p>
            Le principe posé par la loi est simple. Avant cinq ans de détention du plan, l'ancien
            gestionnaire peut facturer des frais de transfert, dans la limite de 1 % des droits
            transférés. Une fois les cinq ans écoulés, tout frais de transfert est interdit. La
            durée se compte selon les règles du contrat : faites confirmer par écrit la date retenue
            par votre gestionnaire, car c'est elle qui détermine si vous payez ou non.
          </p>
          <div className="note">
            <p>
              Ordre de grandeur, sans valeur de promesse : sur un encours de 40 000 €, un plafond de
              1 % représente au maximum 400 € de frais ponctuels. C'est modeste face à un écart de
              frais annuels qui, lui, se répète chaque année et se compose avec le rendement. C'est
              pourquoi le plafond légal est rarement le sujet principal : la question à poser est
              celle des frais courants des deux contrats, détaillés dans notre guide{" "}
              <a href="/guide/combien-coute-un-per">combien coûte un PER</a>.
            </p>
          </div>
          <p>
            Le plafond légal ne couvre que les frais de transfert proprement dits. Il ne dit rien
            des frais d'entrée éventuels du nouveau contrat, ni des frais d'arbitrage lorsque vous
            réorientez votre épargne vers de nouveaux supports. Demandez au nouvel établissement une
            simulation écrite de l'ensemble des frais d'entrée, de gestion et de supports, à
            comparer à ceux de l'ancien contrat.
          </p>

          <h2 id="delais">Les délais et la marche à suivre</h2>
          <p>
            Le transfert est demandé auprès du <strong>nouveau</strong> gestionnaire, pas de
            l'ancien : vous ouvrez le nouveau PER, vous signez la demande de transfert, et c'est lui
            qui sollicite l'ancien établissement. Ce dernier dispose d'un délai légal de deux mois
            pour virer les fonds. Au-delà, le retard n'est pas anodin : l'épargne reste immobilisée
            sans être investie comme vous le souhaitiez.
          </p>
          <p>
            Trois conseils pratiques. Ne clôturez jamais l'ancien PER avant d'avoir confirmation de
            la réception des fonds. Conservez les relevés de versements déduits : le nouveau
            gestionnaire doit en reprendre l'historique fiscal, et vous en aurez besoin à la
            retraite. Enfin, signalez à l'ancien établissement que vous contestez toute retenue au-delà
            du plafond légal si l'on vous en réclame une.
          </p>

          <h2 id="fiscalite">Ce que le transfert ne change pas</h2>
          <p>
            Le transfert d'un PER vers un autre PER n'est ni un rachat, ni un retrait : il ne
            déclenche aucune imposition. Les versements déduits à l'entrée restent traités comme tels
            à la sortie, et l'antériorité du plan est conservée. Il ne fait pas non plus disparaître
            les frais déjà supportés, ni ne vous redonne de la déduction : il déplace une épargne,
            il ne la recrée pas.
          </p>
          <p>
            Cette neutralité fiscale est précisément ce qui rend le transfert tentant. Elle ne doit
            pas le faire passer pour une décision sans conséquence : la fiscalité de sortie, elle,
            dépend toujours du choix capital ou rente que vous ferez plus tard, comme nous le
            détaillons dans notre guide{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a>.
          </p>

          <h2 id="pieges">Les pièges : ce que coûte vraiment un transfert</h2>
          <h3>Piège n° 1 : les supports vendus, puis rachetés</h3>
          <p>
            Dans la plupart des transferts entre contrats, les unités de compte sont vendues avant
            le virement, puis le nouveau contrat réinvestit à réception. Pendant ce délai, l'épargne
            est hors marché : le résultat peut jouer en votre faveur comme contre vous, mais il
            constitue un risque que le discours commercial du nouvel établissement mentionne rarement.
            Les performances passées ne préjugent pas des performances futures, dans un sens comme
            dans l'autre.
          </p>
          <h3>Piège n° 2 : les garanties d'un contrat ancien</h3>
          <p>
            Certains contrats d'avant 2019 (PERP, contrats Madelin, article 83) contiennent des
            garanties que les PER récents ne reproduisent pas, par exemple des conditions de
            conversion en rente fixées à l'ouverture. Avant de signer, demandez à l'ancien
            gestionnaire la liste de ce qui serait perdu. Si vous ne pouvez pas l'obtenir, c'est
            déjà un signal.
          </p>
          <h3>Piège n° 3 : un nouveau contrat plus cher que l'ancien</h3>
          <p>
            C'est le piège le plus fréquent, et le plus injuste : un transfert déclenché par une
            promotion commerciale ou une offre en ligne aboutit parfois à un contrat dont les frais
            de gestion sont comparables, voire supérieurs, une fois les frais de supports ajoutés.
            Ne comparez que des frais annuels totaux, supports compris, sur la même base. Notre
            guide <a href="/guide/quel-est-le-meilleur-per">quel est le meilleur PER</a> propose la
            grille de lecture que nous appliquons.
          </p>
          <h3>Piège n° 4 : le compartiment ou le plan collectif encore actif</h3>
          <p>
            Si votre employeur abonde encore un plan collectif, le transférer en cours d'activité
            peut vous priver de cet abondement ou compliquer les versements futurs. Le sujet se
            traite avec le service ressources humaines et le teneur de compte du plan avant
            toute démarche.
          </p>

          <h2 id="quand">Quand cela vaut le coup, quand mieux vaut rester</h2>
          <p>
            Notre analyse, à titre de piste de réflexion et non de règle : un transfert mérite d'être
            étudié lorsque l'écart de frais courants entre les deux contrats est significatif,
            durable, et vérifié sur des documents écrits ; lorsque le contrat actuel n'offre pas de
            supports adaptés à votre horizon ; ou lorsque vous consolidez plusieurs plans éparpillés
            pour en simplifier le suivi. À l'inverse, rester en place se défend lorsque le contrat
            détient une garantie rare, lorsque l'horizon est court, ou lorsque l'économie attendue
            est du même ordre que les frais et les risques de l'opération.
          </p>
          <p>
            Dans tous les cas, la décision se prend en comparant deux documents, pas deux
            argumentaires. Si le transfert implique un arbitrage de supports, il s'inscrit dans une
            réflexion plus large sur l'horizon et le risque que vous acceptez : voir{" "}
            <a href="/guide/a-quel-age-commencer-per">à quel âge ouvrir un PER</a> et notre page{" "}
            <a href="/strategies/per">stratégie PER</a>.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Le transfert d'un PER est-il imposable ?</h3>
          <p>
            Non. Un transfert entre PER n'est pas un retrait : il ne génère ni impôt sur le revenu
            ni prélèvements sociaux, et conserve l'antériorité fiscale du plan.
          </p>
          <h3>Peut-on transférer une partie seulement de son PER ?</h3>
          <p>
            Cela dépend du contrat et de l'établissement. Beaucoup de contrats prévoient un
            transfert total ; vérifiez les conditions générales avant d'envisager un transfert
            partiel, notamment si plusieurs compartiments sont concernés.
          </p>
          <h3>Un transfert peut-il être refusé ?</h3>
          <p>
            L'ancien gestionnaire ne peut pas s'opposer au transfert vers un PER, mais il peut en
            vérifier les conditions (compartiments, plan collectif). En cas de retard au-delà de
            deux mois, ou de frais contestés, un courrier écrit en recommandé avec le détail de la
            demande est la première étape, avant de saisir le médiateur de l'assurance ou de
            l'AMF selon la nature du plan.
          </p>
          <h3>Un fonctionnaire est-il concerné ?</h3>
          <p>
            Oui, pour un PER relevant de la loi Pacte. Les contrats spécifiques à la fonction
            publique obéissent en partie à leurs propres règles : voir notre guide{" "}
            <a href="/guide/retraite-fonctionnaires-completer">retraite des fonctionnaires</a>.
          </p>
          <h3>Où vérifier les règles en vigueur ?</h3>
          <p>
            Les textes figurent dans le Code monétaire et financier, consultables sur{" "}
            <a href="https://www.legifrance.gouv.fr" target="_blank" rel="noopener noreferrer">
              legifrance.gouv.fr
            </a>
            , et la synthèse pratique pour les particuliers sur{" "}
            <a href="https://www.service-public.fr" target="_blank" rel="noopener noreferrer">
              service-public.fr
            </a>
            . Le plafond et les délais cités ici sont ceux en vigueur en {HYPOTHESES_MAJ}, à
            vérifier avant toute décision.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le transfert est un droit réel et utile, mais ce n'est ni un acte de gestion neutre ni un
            réflexe à encourager. Sa fiscalité est neutre, son coût direct est plafonné, puis nul
            après cinq ans ; ses coûts réels sont ailleurs : supports vendus, garanties abandonnées,
            frais du nouveau contrat. La bonne question n'est pas « puis-je transférer ? » mais
            « quel écart de frais annuels, durable et documenté, justifie de le faire ? ».
          </p>
          <p>
            C'est précisément ce que nous regardons dans un{" "}
            <a href="/bilan-retraite">bilan retraite</a> : les frais réels de vos contrats, ce qu'un
            transfert ferait perdre ou gagner, et le cas échéant l'ordre dans lequel mener les
            opérations.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle, et les
              modalités de transfert varient d'un contrat à l'autre. Les règles citées sont celles
              en vigueur en {HYPOTHESES_MAJ}, susceptibles d'évoluer, et restent à vérifier avant
              toute décision. Ne confondez pas supports garantis et unités de compte : sur ces
              dernières, la valeur de l'épargne dépend des marchés, et les performances passées ne
              préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Un transfert de PER à comparer avant de signer ?"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
