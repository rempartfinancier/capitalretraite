import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RENDEMENTS,
  FISCALITE,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

// Taux marginal combiné le plus élevé (TMI la plus haute du barème + prélèvements
// sociaux sur les revenus fonciers), calculé depuis les hypothèses centralisées —
// jamais écrit en dur.
const tmiLaPlusHaute = Math.max(...FISCALITE.tmiOptions);
const tauxMarginalImmobilierMax = tmiLaPlusHaute + FISCALITE.prelevementsSociaux.immobilier;

export default function GuideImmobilierOuAv() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Comparatif de référence</span>
          <h1>Immobilier locatif ou assurance-vie pour préparer sa retraite ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> l'immobilier locatif à crédit et l'assurance-vie ne
              répondent pas à la même mécanique et ne devraient pas être comparés comme deux
              candidats au même poste. L'immobilier permet un effet de levier bancaire — investir
              avec l'argent de la banque — sécurisé par une assurance emprunteur, au prix d'une
              gestion active et d'une faible liquidité. L'assurance-vie n'offre aucun levier mais
              une disponibilité totale et une grande souplesse de versement. Le rendement affiché
              d'un bien locatif (brut, avant charges et fiscalité) et celui d'un fonds euros (net
              de frais de gestion) ne se comparent d'ailleurs pas directement — voir le tableau
              plus bas. Dans la plupart des patrimoines que nous accompagnons, les deux
              coexistent plutôt qu'ils ne s'excluent.
            </p>
          </div>

          <p>
            Les deux solutions reviennent dans presque tous nos premiers rendez-vous, souvent
            opposées comme s'il fallait trancher une bonne fois pour toutes. Ce n'est pourtant
            pas le bon cadre : l'investissement locatif direct et l'assurance-vie ne répondent
            pas à la même mécanique. L'un fonctionne à crédit, avec un effet de levier (la
            capacité d'investir avec l'argent d'un tiers — ici la banque — pour démultiplier la
            taille de l'actif financé par rapport à l'apport réellement sorti de sa poche).
            L'autre fonctionne par capitalisation directe, sans emprunt, mais avec une souplesse
            que le crédit immobilier n'offre pas.
          </p>
          <p>
            Notre analyse : la question n'est pas laquelle des deux est la meilleure, mais
            laquelle correspond à votre moment de vie, à votre goût pour la gestion et à votre
            besoin de disponibilité. Ce guide déroule les deux logiques, un tableau comparatif,
            puis le critère qui devrait réellement guider votre choix.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#immobilier">L'immobilier locatif à crédit : le levier et son revers</a></li>
              <li><a href="#assurance-vie">L'assurance-vie : la polyvalence sans levier</a></li>
              <li><a href="#tableau">Le comparatif en un tableau</a></li>
              <li><a href="#critere">Le vrai critère de choix</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#conclusion">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="immobilier">L'immobilier locatif à crédit : le levier et son revers</h2>
          <p>
            Le mécanisme est connu mais mérite d'être posé simplement : vous empruntez pour
            acheter un bien, et ce sont les loyers perçus qui remboursent tout ou partie du
            crédit. Avec un apport de quelques dizaines de milliers d'euros, vous devenez
            propriétaire d'un actif qui peut en valoir plusieurs centaines de milliers. Aucune
            autre enveloppe patrimoniale courante ne permet cela : ni l'assurance-vie, ni le
            PEA, ni le PER n'autorisent d'investir avec l'argent d'une banque de cette manière.
            C'est l'atout structurel de l'immobilier pendant la vie active, et lui seul.
          </p>
          <p>
            Un point souvent minimisé mérite d'être développé, tant il change la nature du
            projet : l'assurance emprunteur, exigée par la banque pour accorder le crédit,
            fonctionne comme une protection familiale intégrée à l'opération. En cas de décès
            de l'emprunteur avant la fin du remboursement, le capital restant dû est soldé par
            l'assurance, selon la quotité assurée retenue à la souscription — les proches héritent
            du bien libre de crédit pour la part couverte, sans avoir nécessairement à financer
            le reste. Ce mécanisme n'est pas une option accessoire : il transforme un
            projet d'accumulation en outil de protection dès le premier jour, dès la signature
            du prêt. C'est un argument que l'on oublie souvent de mettre en balance quand on
            compare crédit immobilier et épargne financière. La fiche{" "}
            <a href="https://www.service-public.fr/particuliers/vosdroits/F2469" target="_blank" rel="noopener noreferrer">
              service-public.fr sur l'assurance emprunteur
            </a>{" "}
            détaille les garanties, exclusions et plafonds propres à ce type de contrat.
          </p>
          <p>
            Le rendement, lui, doit être regardé avec discernement. Le rendement locatif direct
            brut nu s'établit, selon les villes, entre {pct(RENDEMENTS.locatifDirect.min)} et{" "}
            {pct(RENDEMENTS.locatifDirect.max)} (ordre de grandeur {RENDEMENTS.locatifDirect.periode},
            hors vacance locative, travaux et fiscalité — {RENDEMENTS.locatifDirect.source}). Ce
            chiffre brut ne dit rien du rendement réellement perçu, ni de l'effet du levier sur
            la rentabilité des fonds propres engagés, qui dépend elle-même du taux d'emprunt et
            de la durée retenue. Ces performances passées et ces ordres de grandeur ne préjugent
            en rien des rendements futurs.
          </p>
          <p>
            Trois contreparties structurent l'exercice. D'abord, la gestion active qu'il exige :
            trouver le bien, sélectionner le locataire, suivre les travaux, gérer les incidents
            — un rôle, voire un métier, que l'on peut déléguer contre rémunération mais qui ne
            disparaît jamais complètement. Ensuite, l'illiquidité : revendre un bien immobilier
            prend, dans le meilleur des cas, plusieurs mois — recherche d'acquéreur, diagnostics,
            délais notariés — contre un rachat en quelques jours sur un contrat financier. Enfin,
            la fiscalité des revenus fonciers (les loyers perçus au titre d'une location nue,
            imposés au barème progressif de l'impôt sur le revenu) est lourde : à la tranche
            marginale d'imposition (TMI) s'ajoutent {pct(FISCALITE.prelevementsSociaux.immobilier)}{" "}
            de prélèvements sociaux — un taux propre aux revenus immobiliers, que la hausse de la
            LFSS 2026 n'a pas concerné, contrairement au PER, au PEA et au compte-titres. Pour un
            contribuable à la tranche marginale la plus élevée du barème ({pct(tmiLaPlusHaute)}),
            le taux combiné atteint {pct(tauxMarginalImmobilierMax)} sur les loyers nets de
            charges. La fiche{" "}
            <a href="https://www.anil.org/lois-fiscalite/fiscalite-du-logement/imposition-des-revenus-fonciers/" target="_blank" rel="noopener noreferrer">
              ANIL sur l'imposition des revenus fonciers
            </a>{" "}
            détaille les régimes d'imposition applicables (micro-foncier ou réel). Notre page{" "}
            <a href="/guide/combien-coute-un-investissement-locatif">
              combien coûte réellement un investissement locatif
            </a>{" "}
            détaille poste par poste ce qui sépare le rendement affiché du rendement net perçu.
          </p>

          <h2 id="assurance-vie">L'assurance-vie : la polyvalence sans levier</h2>
          <p>
            L'assurance-vie suit une logique inverse. Les versements sont libres, dans leur
            montant comme dans leur rythme : rien n'oblige à s'engager sur une mensualité fixe
            pendant vingt ans, contrairement au crédit immobilier. Aucun effet de levier n'est
            possible — vous n'investissez que ce que vous versez, jamais l'argent d'un tiers —,
            mais en échange, la disponibilité est totale. Contrairement à une idée reçue tenace,
            les fonds ne sont jamais bloqués : un rachat, partiel ou total, reste possible à tout
            moment, sauf en présence de supports illiquides. L'ancienneté du contrat ne
            conditionne que la fiscalité applicable, jamais l'accès à l'épargne.
          </p>
          <p>
            Deux familles de supports cohabitent dans un contrat. Le fonds en euros, dont le
            capital est garanti par l'assureur — une garantie réelle, mais valable hors faillite
            de celui-ci — et qui offre un rendement borné, de l'ordre de {pct(RENDEMENTS.fondsEuros.min)}{" "}
            à {pct(RENDEMENTS.fondsEuros.max)} selon les contrats ({pct(RENDEMENTS.fondsEuros.moyen)}{" "}
            en moyenne en {RENDEMENTS.fondsEuros.periode}, avant prélèvements sociaux —{" "}
            {RENDEMENTS.fondsEuros.source}). Et les unités de compte (UC), des supports non
            garantis dont la valeur fluctue avec les marchés, en contrepartie d'une espérance de
            gain supérieure sur la durée — jamais assurée, et susceptible de baisser comme de
            monter.
          </p>
          <p>
            Après huit ans, la fiscalité devient nettement plus douce : un abattement annuel de{" "}
            {euros(FISCALITE.avAbattementAnnuelSeul)} pour une personne seule ou{" "}
            {euros(FISCALITE.avAbattementAnnuelCouple)} pour un couple soumis à imposition
            commune s'applique sur les gains rachetés, avant un taux réduit sous conditions de
            versements (barème en vigueur en {HYPOTHESES_MAJ}). Les prélèvements sociaux, eux,
            restent à {pct(FISCALITE.prelevementsSociaux.assuranceVie)} — un taux que la hausse
            de la LFSS 2026 n'a pas touché non plus, exactement comme pour l'immobilier, alors
            qu'elle a porté celui du PER, du PEA et du compte-titres à{" "}
            {pct(FISCALITE.prelevementsSociaux.per)}. Au décès, les capitaux issus des versements
            effectués avant 70 ans sont transmis à chaque bénéficiaire désigné avec un abattement
            de 152 500 €, hors droits de succession classiques.
          </p>
          <p>
            La contrepartie de cette polyvalence est simple à formuler : sans effet de levier, la
            performance dépend entièrement de ce qui est logé dans le contrat — des marchés pour
            les UC, du rendement de l'assureur pour le fonds en euros. Il n'existe pas d'équivalent
            au mécanisme qui permet, en immobilier, de faire travailler un capital plus important
            que celui réellement apporté. Notre page{" "}
            <a href="/strategies/assurance-vie-retraite">l'assurance-vie comme outil retraite</a>{" "}
            approfondit son usage dans une stratégie de préparation à la retraite.
          </p>

          <h2 id="tableau">Le comparatif en un tableau</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Immobilier locatif à crédit</th>
                  <th>Assurance-vie</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Financement</td>
                  <td>Effet de levier possible : emprunt bancaire remboursé par les loyers</td>
                  <td>Aucun levier : capitalisation sur les seuls versements effectués</td>
                </tr>
                <tr>
                  <td>Liquidité</td>
                  <td>Faible : une revente prend généralement plusieurs mois</td>
                  <td>Élevée : rachat partiel ou total possible à tout moment</td>
                </tr>
                <tr>
                  <td>Gestion requise</td>
                  <td>Active : recherche du bien, locataire, travaux, suivi (délégable contre rémunération)</td>
                  <td>Faible à modérée : choix des supports et arbitrages ponctuels</td>
                </tr>
                <tr>
                  <td>Fiscalité des revenus</td>
                  <td>
                    Revenus fonciers au barème de l'IR + {pct(FISCALITE.prelevementsSociaux.immobilier)} de
                    prélèvements sociaux
                  </td>
                  <td>
                    Après 8 ans : abattement annuel puis taux réduit + {pct(FISCALITE.prelevementsSociaux.assuranceVie)}{" "}
                    de prélèvements sociaux
                  </td>
                </tr>
                <tr>
                  <td>Protection familiale intégrée</td>
                  <td>Assurance emprunteur : le capital restant dû est soldé en cas de décès</td>
                  <td>Aucune protection automatique liée au versement lui-même</td>
                </tr>
                <tr>
                  <td>Rendement indicatif (non comparable terme à terme — natures différentes)</td>
                  <td>
                    {pct(RENDEMENTS.locatifDirect.min)} à {pct(RENDEMENTS.locatifDirect.max)}{" "}
                    <strong>brut</strong>, avant charges, vacance locative et fiscalité (
                    {RENDEMENTS.locatifDirect.periode})
                  </td>
                  <td>
                    {pct(RENDEMENTS.fondsEuros.min)} à {pct(RENDEMENTS.fondsEuros.max)}{" "}
                    <strong>net</strong> de frais de gestion sur fonds euros (
                    {RENDEMENTS.fondsEuros.periode}), avant prélèvements sociaux ; UC sans
                    rendement garanti
                  </td>
                </tr>
                <tr>
                  <td>Transmission</td>
                  <td>Succession classique ; anticipation possible par société civile ou démembrement</td>
                  <td>Abattement de 152 500 € par bénéficiaire (versements avant 70 ans)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les montants, taux et rendements de ce tableau sont ceux en vigueur ou constatés en{" "}
            {HYPOTHESES_MAJ} ; les performances passées ne préjugent pas des performances
            futures, et chaque loi de finances peut faire évoluer les barèmes fiscaux cités.
            Rappel important : la ligne « rendement indicatif » met en regard deux natures de
            chiffres différentes — un rendement locatif brut, avant charges et fiscalité, contre un
            rendement de fonds euros net de frais de gestion — et ne doit pas être lue comme un
            classement direct entre les deux supports.
          </p>

          <h2 id="critere">Le vrai critère de choix</h2>
          <p>
            Pendant la vie active, l'immobilier dispose d'un atout que l'assurance-vie ne peut
            pas reproduire : le levier du crédit démultiplie la portée d'un apport limité, tout
            en offrant, via l'assurance emprunteur, une protection familiale qui joue dès la
            signature. C'est précisément la période où emprunter reste possible — capacité
            d'endettement intacte, revenus d'activité stables — et où ce levier a le plus de
            temps pour produire ses effets.
          </p>
          <p>
            À la retraite, la question s'inverse souvent. Les revenus d'activité disparaissent,
            ce qui complique l'accès à un nouveau crédit ; la gestion locative devient une charge
            que l'on souhaite alléger plutôt qu'assumer davantage ; et le besoin de liquidité pour
            ajuster ses revenus au fil des années prend le pas sur la recherche de levier. C'est
            tout l'objet de notre page sur{" "}
            <a href="/strategies/decumulation">la décumulation</a>, qui détaille comment
            transformer un capital, quelle que soit l'enveloppe qui le porte, en revenus réguliers
            une fois la phase d'accumulation terminée. Notre page{" "}
            <a href="/strategies/immobilier-retraite">l'immobilier dans la stratégie retraite</a>{" "}
            complète cette analyse côté immobilier.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on comparer directement le rendement locatif et celui du fonds euros ?</h3>
          <p>
            Non, pas sans ajustement. Le rendement locatif habituellement cité est brut, avant
            charges, vacance locative et fiscalité, quand le rendement du fonds euros est net des
            frais de gestion (mais avant prélèvements sociaux). Pour comparer utilement les deux,
            il faut ramener le rendement locatif à un chiffre net de charges et de fiscalité, ce
            que notre page{" "}
            <a href="/guide/combien-coute-un-investissement-locatif">
              combien coûte réellement un investissement locatif
            </a>{" "}
            permet de faire.
          </p>
          <h3>L'assurance emprunteur couvre-t-elle toujours 100 % du capital restant dû ?</h3>
          <p>
            Pas nécessairement : la quotité assurée se choisit à la souscription, en particulier
            entre coemprunteurs, et peut être inférieure à 100 % du capital emprunté. Des
            exclusions médicales et des plafonds de capital assurable existent également selon
            l'âge et l'état de santé au moment de la souscription.
          </p>
          <h3>Peut-on retirer de l'argent d'une assurance-vie avant huit ans ?</h3>
          <p>
            Oui, un rachat partiel ou total reste possible à tout moment, quel que soit
            l'ancienneté du contrat. Le cap des huit ans ne conditionne que le régime fiscal
            applicable aux gains rachetés, jamais la disponibilité de l'épargne elle-même.
          </p>
          <h3>Un effet de levier est-il possible sur une assurance-vie ?</h3>
          <p>
            Non, pas directement au sein du contrat : vous n'investissez que ce que vous avez
            versé. Certains investisseurs empruntent par ailleurs pour alimenter un contrat
            (crédit lombard ou prêt personnel), mais ce montage sort du cadre de l'assurance-vie
            elle-même et comporte ses propres risques, distincts du levier immobilier.
          </p>
          <h3>Faut-il choisir entre immobilier locatif et assurance-vie, ou les deux ?</h3>
          <p>
            Dans la majorité des patrimoines que nous accompagnons, les deux coexistent plutôt
            qu'ils ne s'excluent, à des moments différents d'une même stratégie retraite : le
            levier immobilier pendant la vie active, la polyvalence et la liquidité de
            l'assurance-vie en complément ou à l'approche de la retraite.
          </p>
          <h3>Que se passe-t-il si je revends mon bien locatif avant la fin du crédit ?</h3>
          <p>
            Le capital restant dû est remboursé par le produit de la vente, et l'assurance
            emprunteur cesse de s'appliquer puisque le prêt est soldé. D'éventuelles pénalités de
            remboursement anticipé peuvent s'ajouter, encadrées par la loi et généralement
            plafonnées.
          </p>

          <h2 id="conclusion">Notre analyse, en synthèse</h2>
          <p>
            Il existe peu de situations où le choix se pose vraiment en des termes exclusifs. La
            plupart des patrimoines que nous accompagnons combinent les deux : l'immobilier
            pendant les années où le crédit est accessible et où le levier a le temps de jouer,
            l'assurance-vie pour la polyvalence, la disponibilité et une transmission organisée
            en parallèle — à des moments différents d'une même vie patrimoniale, plutôt qu'en
            opposition l'un à l'autre.
          </p>
          <p>
            Ce que ces lignes ne peuvent pas faire, c'est trancher à votre place. Votre capacité
            d'emprunt, votre TMI, votre appétence pour la gestion et votre horizon avant la
            retraite pèsent chacun sur l'arbitrage. Si vous voulez resituer ce duel dans le
            panorama complet des enveloppes retraite, notre guide{" "}
            <a href="/guide/meilleure-enveloppe-retraite">
              quelle est la meilleure enveloppe pour préparer sa retraite ?
            </a>{" "}
            l'aborde par objectif plutôt que par produit. Et c'est précisément ce qu'un{" "}
            <a href="/bilan-retraite">bilan retraite gratuit</a> permet de poser, chiffres en
            main.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle. Les
              montants, abattements et taux cités sont les barèmes en vigueur en{" "}
              {HYPOTHESES_MAJ}, susceptibles d'évoluer à chaque loi de finances ; les rendements
              mentionnés sont des constats passés datés, et les performances passées ne
              préjugent pas des performances futures.
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
