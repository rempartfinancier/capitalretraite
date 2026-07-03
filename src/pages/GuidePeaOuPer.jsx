import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RENDEMENTS,
  FISCALITE,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

export default function GuidePeaOuPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Le match central</span>
          <h1>PEA ou PER pour préparer sa retraite ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <p>
            Le PEA (plan d'épargne en actions) et le PER (plan d'épargne retraite) sont
            régulièrement présentés comme deux candidats au même poste : « la » meilleure
            enveloppe pour préparer sa retraite. Le duel fait de l'audience sur les réseaux
            sociaux, mais il repose sur une question mal posée. Ces deux enveloppes n'ont
            presque rien en commun — ni la fiscalité, ni la disponibilité, ni surtout ce
            qu'il advient de l'argent au décès. Notre analyse : le bon choix ne se tranche
            pas en comparant des rendements, mais en répondant d'abord à une question que
            personne ne pose — voulez-vous consommer ce capital de votre vivant, ou le
            transmettre ?
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#question">La question que personne ne pose</a></li>
              <li><a href="#pea">Le PEA : l'enveloppe à vivre</a></li>
              <li><a href="#per">Le PER : l'enveloppe à transmettre</a></li>
              <li><a href="#tableau">Le comparatif point par point</a></li>
              <li><a href="#verdict">Notre verdict, nuancé</a></li>
            </ol>
          </div>

          <h2 id="question">La question que personne ne pose</h2>
          <p>
            Un discours répandu oppose le PEA et le PER sur le terrain de la performance ou
            des frais, comme s'il s'agissait de deux versions concurrentes du même produit.
            Cet argument est exact sur un point : les deux enveloppes permettent de loger des
            actions et de viser, sur le très long terme, des rendements du même ordre de
            grandeur. En revanche, il occulte l'essentiel — le PEA et le PER ne répondent pas
            au même besoin, et la différence se joue le jour où vous n'êtes plus là pour en
            profiter.
          </p>
          <p>
            Notre analyse : il n'existe pas de bonne ou de mauvaise enveloppe dans l'absolu,
            seulement des enveloppes adaptées ou non à un objectif. Le PEA est construit pour
            être vidé par son titulaire. Le PER assurantiel (souscrit auprès d'un assureur —
            c'est le cas de la majorité des PER individuels) est construit pour survivre à son
            titulaire dans de bonnes conditions fiscales. Poser la question « lequel est le
            meilleur ? » sans préciser « pour consommer ou pour transmettre ? », c'est confondre
            deux outils qui n'ont pas la même fonction.
          </p>

          <h2 id="pea">Le PEA : l'enveloppe à vivre</h2>
          <p>
            Le PEA est une enveloppe dédiée aux actions européennes et aux fonds éligibles
            (dont certains ETF — fonds indiciels cotés qui répliquent un indice boursier).
            Les versements y sont libres dans la limite d'un plafond de 150 000 € (plafond
            légal en vigueur en {HYPOTHESES_MAJ}), non reconstituable : un retrait ampute
            définitivement cette capacité, il ne « libère » pas de place pour de nouveaux
            versements.
          </p>
          <p>
            Sa mécanique de sortie est simple et généreuse. Passé un délai de{" "}
            {FISCALITE.peaExonerationIRApres} ans, les retraits sont libres et n'entraînent
            plus la clôture du plan ; les plus-values retirées sont exonérées d'impôt sur le
            revenu. Ne restent dus que les prélèvements sociaux (l'ensemble CSG-CRDS appliqué
            aux revenus du capital), au taux de {pct(FISCALITE.prelevementsSociaux.pea)} pour
            le PEA depuis la hausse introduite par la LFSS 2026 (barème en vigueur en{" "}
            {HYPOTHESES_MAJ}). Avant ce délai, un retrait clôture le plan et fait perdre
            l'avantage fiscal. Aucune sortie n'est jamais imposée au barème progressif de
            l'impôt sur le revenu : c'est la grande différence avec le PER.
          </p>
          <p>
            Mais cette générosité s'arrête net au décès. Le PEA ne se transmet pas : il est
            clôturé automatiquement le jour du décès de son titulaire, quelles que soient les
            conditions de marché à cet instant précis. Les prélèvements sociaux deviennent
            exigibles sur l'ensemble des plus-values accumulées depuis l'ouverture — pas
            seulement sur les gains récents — et le capital rejoint la succession sans le
            moindre abattement propre à l'enveloppe : il est traité comme n'importe quel autre
            actif, aux droits de succession de droit commun.
          </p>
          <div className="note">
            <p>
              Notre analyse : ce sort au décès n'est pas un détail technique, c'est la clé de
              lecture de toute la stratégie PEA. Une enveloppe qui n'offre aucun avantage
              successoral doit, par construction, être pensée pour être consommée du vivant
              de son titulaire — pas conservée « au cas où » jusqu'à un âge avancé.
            </p>
          </div>
          <p>
            Pour approfondir la mécanique complète, notre page{" "}
            <a href="/strategies/pea-retraite">le PEA comme outil retraite</a> détaille les
            usages et les pièges du plafond.
          </p>

          <h2 id="per">Le PER : l'enveloppe à transmettre</h2>
          <p>
            Le PER assurantiel obéit à une logique inverse. L'épargne y est bloquée jusqu'à la
            retraite, hors cas de déblocage anticipé prévus par la loi (accidents de la vie,
            achat de la résidence principale). Et sa fiscalité de sortie est réelle : les
            versements volontaires déduits à l'entrée sont réintégrés au barème progressif de
            l'impôt sur le revenu, et les gains générés supportent le PFU (prélèvement
            forfaitaire unique, taxation à taux fixe des revenus du capital) — soit{" "}
            {pct(FISCALITE.pfuIR)} d'impôt sur le revenu plus{" "}
            {pct(FISCALITE.prelevementsSociaux.per)} de prélèvements sociaux depuis la LFSS
            2026 (barème en vigueur en {HYPOTHESES_MAJ}). Sur le papier, le PER est donc
            nettement moins accueillant que le PEA pour qui veut simplement récupérer son
            argent à la retraite.
          </p>
          <p>
            Un discours fréquent s'arrête là et présente le PER comme l'enveloppe qui « fait
            baisser vos impôts ». C'est exact sur un point : la déduction des versements du
            revenu imposable procure une économie immédiate, proportionnelle à la TMI (tranche
            marginale d'imposition — le taux qui frappe vos derniers euros de revenu). Mais
            cette présentation omet l'essentiel : cette déduction est un report d'imposition,
            jamais un cadeau. Les sommes déduites seront réintégrées au barème le jour de la
            sortie, et personne ne connaît le barème qui s'appliquera dans quinze ou vingt ans.
            La déduction à l'entrée ne devrait donc jamais être le seul critère d'ouverture
            d'un PER.
          </p>
          <p>
            Là où le PER change de nature, c'est précisément sur le terrain où le PEA
            s'effondre : le décès avant la liquidation du plan. Dans ce cas, la déduction
            obtenue à l'entrée devient définitivement acquise — elle n'est jamais réintégrée,
            même après 70 ans. Les capitaux transmis bénéficient d'un abattement de
            152 500 € par bénéficiaire lorsque le titulaire décède avant 70 ans (règles en
            vigueur en {HYPOTHESES_MAJ}) — et c'est bien l'âge au moment du décès qui
            détermine l'abattement applicable, pas la date à laquelle les versements ont été
            effectués, contrairement à l'assurance-vie. Après 70 ans, un abattement global de
            30 500 € s'applique pour l'ensemble des bénéficiaires. Dans les deux cas, les
            gains transmis échappent aux prélèvements sociaux.
          </p>
          <div className="note">
            <p>
              Précision importante : ces avantages successoraux sont réservés au PER{" "}
              <strong>assurantiel</strong>. Un PER bancaire, ou la plupart des PER collectifs
              d'entreprise (issus d'anciens PERCO), fonctionnent comme un compte-titres : au
              décès, tout entre dans la masse successorale, sans abattement propre. Vérifier
              la nature de son contrat auprès de son assureur ou de sa banque est la première
              chose à faire avant de bâtir une stratégie de transmission autour du PER.
            </p>
          </div>
          <p>
            Notre page <a href="/strategies/per">la stratégie PER</a> détaille cette mécanique
            de transmission, et le guide{" "}
            <a href="/guide/fiscalite-sortie-per">la fiscalité de sortie du PER</a> explique
            comment est imposée une sortie en capital du vivant du titulaire.
          </p>

          <h2 id="tableau">Le comparatif point par point</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>PEA</th>
                  <th>PER assurantiel</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Versements</td>
                  <td>Libres, plafonnés à 150 000 € (non reconstituable après retrait)</td>
                  <td>Libres, sans plafond de versement (la déduction fiscale, elle, est plafonnée)</td>
                </tr>
                <tr>
                  <td>Disponibilité</td>
                  <td>
                    Retraits libres après {FISCALITE.peaExonerationIRApres} ans ; avant, un
                    retrait clôture le plan
                  </td>
                  <td>Bloqué jusqu'à la retraite, hors cas légaux de déblocage anticipé</td>
                </tr>
                <tr>
                  <td>Fiscalité à l'entrée</td>
                  <td>Aucun avantage : versements non déductibles</td>
                  <td>Versements volontaires déductibles du revenu imposable, dans la limite d'un plafond</td>
                </tr>
                <tr>
                  <td>Fiscalité à la sortie</td>
                  <td>
                    Exonération d'IR après {FISCALITE.peaExonerationIRApres} ans ; PS de{" "}
                    {pct(FISCALITE.prelevementsSociaux.pea)}
                  </td>
                  <td>
                    Versements déduits réintégrés au barème ; gains au PFU ({pct(FISCALITE.pfuIR)}{" "}
                    d'IR + {pct(FISCALITE.prelevementsSociaux.per)} de PS)
                  </td>
                </tr>
                <tr>
                  <td>Sort au décès</td>
                  <td>Clôture forcée ; PS dus sur tous les gains depuis l'origine ; aucun abattement</td>
                  <td>
                    Déduction à l'entrée définitivement acquise ; abattement de 152 500 € par
                    bénéficiaire (décès avant 70 ans, âge apprécié au décès) ou 30 500 € après ;
                    pas de PS sur les gains transmis
                  </td>
                </tr>
                <tr>
                  <td>Univers d'investissement</td>
                  <td>Actions européennes et fonds éligibles (dont certains ETF)</td>
                  <td>Multi-supports : fonds en euros et unités de compte (actions, obligations, immobilier, ETF)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les montants, taux et abattements de ce tableau sont ceux en vigueur en{" "}
            {HYPOTHESES_MAJ} ; chaque loi de finances peut les faire évoluer, et ils doivent
            être revérifiés avant toute décision. À titre d'illustration : sur une hypothèse de
            rendement actions long terme de l'ordre de {pct(RENDEMENTS.ucActionsLongTerme.moyen)}{" "}
            par an ({RENDEMENTS.ucActionsLongTerme.periode}, {RENDEMENTS.ucActionsLongTerme.source}),
            l'écart entre les deux enveloppes ne se joue pas sur la performance brute des
            supports — comparable dans les deux cas — mais sur ce qui reste net après
            fiscalité de sortie ou droits de succession. Ces performances passées ne préjugent
            en rien des performances futures.
          </p>

          <h2 id="verdict">Notre verdict, nuancé</h2>
          <p>
            Opposer le PEA et le PER comme deux concurrents pour le même trophée est, dans
            notre analyse, une fausse piste. Ce n'est pas l'un ou l'autre : les deux se
            complètent, précisément parce qu'ils excellent sur deux terrains différents. Le
            PEA est l'enveloppe à consommer en premier — il ne pardonne rien au décès, autant
            en profiter de son vivant. Le PER, lui, se garde plus volontiers en réserve, pour
            un objectif de transmission ou de protection de la famille.
          </p>
          <p>
            Un ordre de décaissement indicatif à la retraite consiste ainsi à puiser d'abord
            dans le PEA, et à garder le PER pour la fin — voire à ne jamais le liquider si
            l'objectif de transmission prime. Cette hiérarchie n'est toutefois pas une règle
            universelle : elle dépend de vos besoins de revenus, de votre TMI, de votre état de
            santé et de la composition de votre famille. Elle s'apprécie toujours au cas par
            cas, ce que détaille notre page sur{" "}
            <a href="/strategies/decumulation">l'ordre de décaissement à la retraite</a>.
          </p>
          <p>
            Un dernier point mérite d'être répété, car il est trop souvent passé sous silence :
            la déduction fiscale du PER ne doit jamais être le seul critère de décision.
            C'est un report d'imposition, pas un gain acquis — et un euro d'impôt reporté n'a
            de valeur que si la stratégie globale (objectif, horizon, situation familiale) le
            justifie. Le guide{" "}
            <a href="/guide/meilleure-enveloppe-retraite">quelle est la meilleure enveloppe pour la retraite ?</a>{" "}
            replace ce duel PEA/PER dans le paysage complet des enveloppes disponibles.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle. Les
              montants, abattements et taux cités sont les barèmes en vigueur en{" "}
              {HYPOTHESES_MAJ}, susceptibles d'évoluer à chaque loi de finances ; les
              rendements mentionnés sont des constats passés et datés, et les performances
              passées ne préjugent pas des performances futures.
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
