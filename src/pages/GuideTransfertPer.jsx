import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { HYPOTHESES_MAJ, PER_TRANSFERT } from "../components/hypotheses.js";

export default function GuideTransfertPer() {
  const T = PER_TRANSFERT;
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Changer de PER sans perdre le fil</span>
          <h1>Transfert de PER : frais, délais et quand ça vaut le coup</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> un PER peut être transféré vers un autre PER sans
              fiscalité : l'opération n'est ni un retrait ni un rachat, et les versements gardent
              leur nature (volontaires déduits ou non, épargne salariale, versements obligatoires).
              Les frais de sortie sont encadrés : plafonnés à {T.plafondFraisPct} % de l'encours
              pendant les {T.anneesFraisPlafonnes} premières années du plan, puis gratuits. Le
              délai légal annoncé est de {T.delaiMoisIndividuel} mois pour un PER individuel. Notre
              analyse : le transfert vaut le coup quand l'écart de frais ou de supports est durable
              et supérieur au coût de l'opération — pas parce qu'une offre concurrente affiche un
              meilleur rendement de l'an dernier. Le vrai risque n'est pas la fiscalité, c'est le
              calendrier : l'argent est hors marché pendant le transfert, et certains avantages du
              contrat d'origine peuvent être perdus.
            </p>
          </div>

          <p>
            Beaucoup de détenteurs de PER ont ouvert leur contrat à la va-vite, en agence ou lors
            d'un changement d'emploi, puis découvrent des frais élevés ou une gamme de supports
            restreinte. La loi Pacte a rendu le changement de contrat possible, et l'a encadré. Cet
            article précise ce que coûte réellement un transfert, ce qu'il ne coûte pas, et les
            points à vérifier avant de signer.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#principe">Ce qu'est un transfert, et ce qu'il n'est pas</a></li>
              <li><a href="#frais">Les frais : un plafond, puis la gratuité</a></li>
              <li><a href="#delais">Les délais et le risque d'être hors marché</a></li>
              <li><a href="#perdre">Ce que l'on peut perdre en changeant</a></li>
              <li><a href="#valeur">Quand le transfert vaut le coup</a></li>
              <li><a href="#anciens">PERP, Madelin, article 83 : des règles à part</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="principe">Ce qu'est un transfert, et ce qu'il n'est pas</h2>
          <p>
            Un transfert déplace l'épargne d'un contrat PER vers un autre contrat PER, d'un
            gestionnaire à un autre, sans passer par vos comptes. Ce n'est pas un retrait : aucun
            impôt sur le revenu, aucun prélèvement social n'est dû au titre de l'opération, et vous
            ne perdez pas la déduction fiscale déjà obtenue. Le contrat d'arrivée reprend les
            compartiments du contrat d'origine, ce qui compte à la sortie : la fiscalité du capital
            dépend de la nature des versements. Pour mémoire, nous détaillons ces règles dans{" "}
            <a href="/guide/fiscalite-sortie-per">la fiscalité à la sortie du PER</a>.
          </p>
          <p>
            Un transfert n'est pas non plus un déblocage : l'argent reste soumis aux règles de
            sortie du PER, décrites dans notre guide sur{" "}
            <a href="/guide/deblocage-anticipe-per">le déblocage anticipé</a>.
          </p>

          <h2 id="frais">Les frais : un plafond, puis la gratuité</h2>
          <p>
            Pour un PER individuel, les frais de transfert sortant sont plafonnés à{" "}
            {T.plafondFraisPct} % de l'encours transféré pendant les {T.anneesFraisPlafonnes}{" "}
            premières années du plan ; au-delà, le transfert est gratuit. Autrement dit, ce plafond
            protège l'épargnant mais ne rend pas l'opération indolore : sur un contrat récent,
            {" "}{T.plafondFraisPct} % d'un encours est un coût réel, à comparer à l'économie de
            frais annuels attendue dans le nouveau contrat.
          </p>
          <p>
            Attention aux frais qui ne sont pas des frais de transfert : frais d'entrée sur les
            versements dans le contrat d'arrivée, frais de gestion annuels plus élevés, frais
            d'arbitrage, frais propres aux supports. Notre analyse : c'est le total qui compte,
            sur la durée restant avant la retraite. Nous avons détaillé cette logique dans{" "}
            <a href="/guide/combien-coute-un-per">le coût d'un PER</a> et dans{" "}
            <a href="/guide/per-bancaire-frais-gestion-horizon">l'effet des frais de gestion
            selon l'horizon</a>.
          </p>

          <h2 id="delais">Les délais et le risque d'être hors marché</h2>
          <p>
            Le délai annoncé pour exécuter le transfert est de {T.delaiMoisIndividuel} mois pour un
            PER individuel, à compter de la demande complète, et de {T.delaiMoisCollectif} mois pour
            un PER collectif. Les durées constatées varient selon les gestionnaires, et les sources
            que nous avons consultées ne s'accordent pas sur la sanction d'un éventuel retard :
            renseignez-vous auprès des deux gestionnaires avant de lancer l'opération.
          </p>
          <p>
            Le point souvent négligé : pendant le transfert, les unités de compte sont généralement
            vendues, puis l'argent est réinvesti à l'arrivée. L'épargne est donc hors marché
            quelques semaines, et peut manquer un rebond comme éviter une baisse. Ce n'est ni un
            gain ni une perte certains, mais un aléa à connaître. Ne confondez pas non plus supports
            garantis et unités de compte : sur ces dernières, la valeur dépend des marchés, et les
            performances passées ne préjugent pas des performances futures.
          </p>

          <h2 id="perdre">Ce que l'on peut perdre en changeant</h2>
          <ul>
            <li>
              <strong>La participation aux bénéfices de l'année :</strong> certains contrats ne la
              versent qu'aux épargnants présents au 31 décembre. Un transfert en fin d'année peut
              donc coûter plus que prévu — à vérifier dans les conditions générales.
            </li>
            <li>
              <strong>Un support que vous ne retrouverez pas :</strong> fonds euros avec une
              garantie particulière, fonds fermés à la souscription. Vérifiez l'équivalent dans le
              contrat d'arrivée.
            </li>
            <li>
              <strong>Des garanties de prévoyance ou d'options</strong> attachées à l'ancien
              contrat (garantie plancher, par exemple).
            </li>
            <li>
              <strong>Du temps :</strong> il faut comparer sérieusement les contrats, ce que ne fait
              pas une plaquette commerciale.
            </li>
          </ul>

          <h2 id="valeur">Quand le transfert vaut le coup</h2>
          <p>
            Notre analyse : trois situations justifient en général de regarder de près.
            D'abord, un écart de frais annuels durable et significatif, sur un horizon encore long
            avant la retraite. Ensuite, une gamme de supports trop étroite pour mettre en œuvre la
            stratégie d'allocation voulue — voir{" "}
            <a href="/guide/gestion-pilotee-ou-gestion-libre">gestion pilotée ou gestion libre</a>.
            Enfin, un contrat dont la qualité de service pose problème de manière répétée.
          </p>
          <p>
            À l'inverse, trois mauvaises raisons : un rendement passé flatteur sur la page d'une
            offre concurrente, une promotion temporaire, ou l'envie de « faire quelque chose ». Si
            l'écart de frais est faible ou l'horizon court, la prudence est de ne pas bouger. Pour
            comparer, voyez aussi{" "}
            <a href="/guide/quel-est-le-meilleur-per">quel est le meilleur PER</a>.
          </p>

          <h2 id="anciens">PERP, Madelin, article 83 : des règles à part</h2>
          <p>
            Les anciens contrats (PERP, contrats Madelin, contrats « article 83 ») peuvent aussi
            être transférés vers un PER, mais selon des règles distinctes, notamment sur les frais
            et les délais, qui ne sont pas celles d'un PER individuel : à vérifier contrat par
            contrat. Avant de transférer, examinez ce que le contrat d'origine garantit (conditions
            de sortie en rente, conditions de conversion) : une fois transféré, ce n'est plus
            forcément possible de les retrouver. Pour les indépendants, notre guide{" "}
            <a href="/guide/retraite-independants-per-ou-madelin">PER ou Madelin</a> détaille le
            sujet. La combinaison des modes de sortie (rente, retraits) est une option parmi
            d'autres que nous ne recommandons pas ici ; elle se traite en situation.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Le transfert fait-il perdre l'ancienneté fiscale ou la déduction déjà obtenue ?</h3>
          <p>
            Non, pas au titre du transfert lui-même : l'opération n'est pas un retrait. La nature
            des versements est conservée dans le contrat d'arrivée.
          </p>
          <h3>Mon gestionnaire peut-il refuser le transfert ?</h3>
          <p>
            Il ne doit pas s'y opposer pour un PER individuel dès lors que la demande est complète.
            Un refus ou un retard injustifié peut être signalé au médiateur de l'assurance ou à
            l'ACPR.
          </p>
          <h3>Peut-on transférer une partie seulement de son PER ?</h3>
          <p>
            Selon les contrats, un transfert partiel peut être possible ; ce n'est pas la règle
            générale et les conditions diffèrent. À vérifier auprès du gestionnaire d'origine.
          </p>
          <h3>Faut-il transférer en fin d'année ?</h3>
          <p>
            Pas sans avoir vérifié la règle de participation aux bénéfices de votre contrat.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le transfert est un droit, encadré et fiscalement neutre, mais pas un geste anodin. Les
            frais plafonnés puis supprimés réduisent le coût de sortie ; ils ne dispensent pas de
            comparer le coût total, les supports réellement accessibles et les avantages que l'on
            quitte. Un transfert se justifie par une économie durable, pas par un effet d'annonce.
            C'est le type de comparaison que nous menons dans un{" "}
            <a href="/bilan-retraite">bilan retraite</a> : frais réels de votre contrat actuel,
            alternatives, et coût de l'opération.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle. Les
              plafonds et délais cités sont ceux en vigueur en {HYPOTHESES_MAJ}, susceptibles
              d'évoluer, et à confirmer auprès du gestionnaire du contrat avant toute décision. Les
              performances passées ne préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Un transfert de PER à évaluer avant de signer ?"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
