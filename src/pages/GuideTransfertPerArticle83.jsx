import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { HYPOTHESES_MAJ } from "../components/hypotheses.js";

export default function GuideTransfertPerArticle83() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide coûts</span>
          <h1>Transférer un ancien contrat retraite d'entreprise (Article 83) vers un PER</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> l'article 83 (du nom de l'article du Code général des
              impôts qui l'encadre) est un ancien contrat de retraite collective d'entreprise,
              alimenté par des cotisations obligatoires de l'employeur et parfois du salarié, souvent
              « oublié » après un changement d'employeur. Depuis la loi PACTE, il peut être transféré
              vers un PER individuel ou collectif. Les frais de transfert sont désormais plafonnés à
              1 % du montant transféré pour un contrat de moins de cinq ans, et deviennent nuls
              au-delà de cinq ans d'ancienneté depuis le premier versement — un cadre nettement plus
              favorable qu'avant le 24 octobre 2024, où les frais pouvaient atteindre 5 % sur les
              contrats récents. Le transfert n'est pas automatiquement la bonne décision : il faut
              comparer les garanties, les frais annuels et les options de sortie de l'ancien contrat à
              ceux d'un PER avant de trancher.
            </p>
          </div>

          <p>
            Un scénario très fréquent chez les cadres que nous accompagnons : un ancien employeur, il
            y a dix ou quinze ans, cotisait pour eux sur un contrat de retraite collective « article
            83 » — un nom technique qui ne dit rien de ce qu'il recouvre. Depuis leur départ de
            l'entreprise, ce contrat n'a plus reçu aucun versement, dort chez un assureur dont ils ont
            parfois oublié jusqu'au nom, et personne ne les a jamais informés que la loi PACTE de 2019
            leur permet désormais de le transférer vers un PER, avec des règles de sortie beaucoup
            plus souples. Ce guide explique ce qu'est un article 83, ce qui a changé pour son
            transfert, et comment évaluer si l'opération est intéressante dans votre cas.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#article-83">Qu'est-ce qu'un contrat article 83 ?</a></li>
              <li><a href="#pourquoi-transferer">Pourquoi la loi PACTE a ouvert le transfert vers un PER</a></li>
              <li><a href="#frais">Les frais de transfert : ce qui a changé au 24 octobre 2024</a></li>
              <li><a href="#delais">Quel délai pour un transfert ?</a></li>
              <li><a href="#quand-transferer">Dans quels cas le transfert est-il intéressant ?</a></li>
              <li><a href="#quand-conserver">Dans quels cas vaut-il mieux conserver le contrat ?</a></li>
              <li><a href="#methode">La méthode pour trancher : l'audit avant la décision</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#checklist">Check-list avant de transférer un article 83</a></li>
            </ol>
          </div>

          <h2 id="article-83">Qu'est-ce qu'un contrat article 83 ?</h2>
          <p>
            Un contrat article 83 est un régime de retraite supplémentaire d'entreprise, à
            cotisations définies, mis en place par l'employeur pour tout ou partie de ses salariés
            (souvent les cadres, historiquement). Le nom vient de l'article 83 du Code général des
            impôts qui fixe le régime fiscal des cotisations, obligatoires pour l'employeur et parfois
            pour le salarié selon l'accord d'entreprise. Contrairement au PEE ou au PERCOL, l'adhésion
            n'est pas un choix du salarié : elle découle de son appartenance à la catégorie de
            personnel visée par l'accord, et les cotisations ne sont pas modulables librement.
          </p>
          <p>
            Historiquement, un contrat article 83 ne se dénouait, à la retraite, qu'en rente viagère —
            exactement comme le contrat Madelin pour les indépendants, décrit dans notre guide sur la{" "}
            <a href="/guide/retraite-independants-per-ou-madelin">
              retraite des indépendants (PER ou Madelin)
            </a>
            . C'est ce point, la rigidité de sortie, qui explique pourquoi la loi PACTE a ouvert la
            possibilité de le transférer vers un PER, plus souple.
          </p>

          <h2 id="pourquoi-transferer">Pourquoi la loi PACTE a ouvert le transfert vers un PER</h2>
          <p>
            Avant la loi PACTE, un salarié qui quittait l'entreprise ayant ouvert son article 83 se
            retrouvait avec un contrat figé : plus de nouveaux versements possibles (l'employeur
            n'étant plus le sien), une gamme de supports souvent datée, et une sortie imposée en rente
            viagère au moment de la retraite, sans possibilité de capital. La loi PACTE a changé cela
            en autorisant le transfert de ces anciens contrats vers un PER individuel ou vers le PER
            collectif d'un nouvel employeur, avec à la clé la possibilité d'une sortie en capital, en
            rente, ou en un mélange des deux — la même souplesse que celle offerte à tout titulaire de
            PER, détaillée dans notre guide{" "}
            <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a>.
          </p>

          <h2 id="frais">Les frais de transfert : ce qui a changé au 24 octobre 2024</h2>
          <p>
            C'est le point le plus concret de ce guide, et celui qui a le plus évolué récemment. Avant
            le 24 octobre 2024, les frais de transfert d'un ancien contrat de retraite d'entreprise
            pouvaient atteindre jusqu'à 5 % du montant transféré si le contrat avait moins de dix ans
            d'ancienneté — un niveau qui pouvait, à lui seul, dissuader l'opération. Depuis cette date,
            le cadre réglementaire a été resserré : les frais de transfert sont désormais plafonnés à
            1 % du montant transféré pour un contrat récent, et deviennent intégralement nuls dès lors
            que le premier versement sur le contrat remonte à plus de cinq ans — ce qui, pour la
            plupart des articles 83 « oubliés » depuis un précédent employeur, couvre la majorité des
            situations rencontrées en pratique (barème {HYPOTHESES_MAJ}, à vérifier au moment de
            l'opération, ce type de plafond réglementaire pouvant lui-même évoluer).
          </p>
          <p>
            Ce changement rend le transfert nettement plus accessible qu'il ne l'était avant fin 2024 :
            pour un contrat ouvert depuis plus de cinq ans — la situation la plus fréquente pour un
            article 83 issu d'un ancien employeur —, le transfert vers un PER peut désormais s'effectuer
            sans frais de sortie, seul le coût d'entrée éventuel du nouveau contrat restant à
            comparer.
          </p>

          <h2 id="delais">Quel délai pour un transfert ?</h2>
          <p>
            Le transfert d'un article 83 vers un PER prend, en pratique, de trois à cinq mois selon les
            assureurs concernés (l'ancien et le nouveau), le temps que l'assureur d'origine liquide le
            contrat et transfère les fonds. Pendant cette période, le capital reste investi selon
            l'allocation en vigueur sur l'ancien contrat, sans possibilité d'arbitrage entre les deux
            structures — un point à anticiper si le marché traverse une phase de forte volatilité au
            moment de la demande.
          </p>

          <h2 id="quand-transferer">Dans quels cas le transfert est-il intéressant ?</h2>
          <p>
            Le transfert présente en général un intérêt réel dans plusieurs configurations : un
            contrat article 83 ancien, investi sur des supports datés et peu diversifiés, avec des
            frais de gestion annuels plus élevés que ceux d'un PER individuel récent ; une volonté
            explicite de récupérer la possibilité d'une sortie en capital plutôt que la seule rente
            viagère imposée par le contrat d'origine ; ou simplement le souhait de regrouper plusieurs
            anciens contrats de retraite d'entreprise dispersés chez différents employeurs successifs
            au sein d'un seul PER, plus simple à suivre et à piloter dans la durée.
          </p>

          <h2 id="quand-conserver">Dans quels cas vaut-il mieux conserver le contrat ?</h2>
          <p>
            À l'inverse, conserver l'article 83 en l'état peut se justifier lorsque le contrat comporte
            une garantie de taux minimum sur son fonds en euros, plus favorable que celle des contrats
            actuellement commercialisés — un avantage acquis qui disparaît définitivement en cas de
            transfert. Certains anciens contrats article 83 comportent également des garanties
            annexes de prévoyance (capital décès, rente d'invalidité) qui ne se retrouvent pas
            automatiquement à l'identique sur un PER pur : un transfert peut faire perdre cette
            couverture sans que le souscripteur en ait toujours conscience au moment de la demande.
          </p>

          <h2 id="methode">La méthode pour trancher : l'audit avant la décision</h2>
          <p>
            Notre position est la même que pour l'arbitrage Madelin décrit dans notre guide{" "}
            <a href="/guide/retraite-independants-per-ou-madelin">
              retraite des indépendants
            </a>{" "}
            : il n'existe pas de règle générale « transférer est toujours préférable » ou l'inverse. La
            bonne méthode consiste à demander à l'assureur d'origine un relevé de situation détaillé
            (frais de gestion annuels réels, garantie de taux éventuelle sur le fonds en euros,
            garanties de prévoyance associées, mode de sortie prévu au contrat), puis à comparer ce
            relevé aux conditions réelles d'un PER individuel envisagé — frais, gamme de supports,
            souplesse de sortie — avant toute décision. C'est précisément l'un des points que nous
            vérifions systématiquement lors d'un{" "}
            <a href="/bilan-retraite">bilan retraite gratuit</a>, à partir de votre relevé de contrat.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Comment savoir si j'ai un ancien contrat article 83 chez un ex-employeur ?</h3>
          <p>
            Vérifiez vos relevés annuels de situation retraite, votre espace personnel sur{" "}
            <a href="https://www.info-retraite.fr" target="_blank" rel="noopener noreferrer">
              info-retraite.fr
            </a>
            , ou contactez directement le service RH ou l'assureur de votre ancien employeur si vous en
            gardez le souvenir. Un contrat article 83 continue de fructifier même après votre départ,
            il n'est jamais perdu.
          </p>
          <h3>Le transfert est-il obligatoire ?</h3>
          <p>
            Non. Un ancien contrat article 83 reste pleinement valable si vous ne le transférez pas ; il
            continuera de produire ses effets selon les conditions d'origine jusqu'à votre retraite.
          </p>
          <h3>Les frais de transfert sont-ils toujours de 1 % maximum ?</h3>
          <p>
            Ce plafond de 1 % s'applique depuis le 24 octobre 2024 pour les contrats de moins de cinq
            ans ; au-delà de cinq ans d'ancienneté depuis le premier versement, les frais de transfert
            sont nuls. Ces plafonds réglementaires sont à revérifier au moment de l'opération, la
            réglementation pouvant évoluer.
          </p>
          <h3>Puis-je transférer un article 83 vers le PER collectif de mon nouvel employeur ?</h3>
          <p>
            Oui, le transfert est possible aussi bien vers un PER individuel que vers le PER collectif
            ou obligatoire d'un nouvel employeur, selon les mêmes principes et le même cadre de frais.
          </p>
          <h3>Perd-on la garantie de taux de l'ancien contrat en transférant ?</h3>
          <p>
            Oui, en général : une garantie de taux minimum attachée au fonds en euros d'un ancien
            contrat ne se transfère pas vers le nouveau contrat, qui applique ses propres conditions.
            C'est l'un des points à vérifier avant toute décision de transfert.
          </p>

          <h2 id="checklist">Check-list avant de transférer un article 83</h2>
          <ol>
            <li>
              <strong>Demandez un relevé de situation détaillé</strong> à l'assureur d'origine : frais
              de gestion réels, garantie de taux, garanties de prévoyance associées.
            </li>
            <li>
              <strong>Vérifiez l'ancienneté du premier versement</strong> pour connaître les frais de
              transfert applicables (1 % maximum, ou nuls au-delà de cinq ans).
            </li>
            <li>
              <strong>Comparez les frais annuels et la gamme de supports</strong> du PER envisagé à ceux
              du contrat d'origine.
            </li>
            <li>
              <strong>Vérifiez qu'aucune garantie de prévoyance</strong> (décès, invalidité) attachée à
              l'ancien contrat ne serait perdue lors du transfert.
            </li>
            <li>
              <strong>Anticipez un délai de trois à cinq mois</strong> avant que les fonds ne soient
              effectivement disponibles sur le nouveau contrat.
            </li>
          </ol>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les plafonds de
              frais de transfert et les délais cités sont ceux en vigueur en {HYPOTHESES_MAJ},
              susceptibles d'évoluer par voie réglementaire : à vérifier avant toute opération, en
              même temps que les caractéristiques précises de votre contrat d'origine. Pour aller plus
              loin sur le PER de destination, voir nos guides{" "}
              <a href="/guide/combien-coute-un-per">combien coûte un PER</a> et{" "}
              <a href="/guide/quel-est-le-meilleur-per">quel est le meilleur PER</a>.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Un ancien contrat retraite dort peut-être chez un ex-employeur : faisons le point"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
