import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RENDEMENTS,
  FISCALITE,
  FRAIS_TYPES,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

export default function GuidePeaOuAv() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Comparaison</span>
          <h1>PEA ou assurance-vie : lequel choisir pour la retraite ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le PEA et l'assurance-vie ne jouent pas le même
              rôle. Le PEA capitalise en actions à frais réduits mais ne se transmet pas : il se
              clôture au décès sans abattement. L'assurance-vie accepte davantage de types de
              supports, reste disponible à tout moment (contrairement à une idée reçue), et
              prévoit un abattement successoral dédié. Dans la plupart des stratégies, les deux
              enveloppes se complètent plutôt qu'elles ne s'excluent.
            </p>
          </div>

          <p>
            C'est l'un des duels préférés des réseaux sociaux : d'un côté ceux qui ne jurent que
            par le PEA (plan d'épargne en actions), de l'autre ceux qui défendent l'assurance-vie
            bec et ongles. Le problème, c'est que ce duel n'existe pas vraiment. Opposer les deux
            enveloppes fait de l'audience ; ça construit rarement une stratégie patrimoniale.
          </p>
          <p>
            Notre analyse part d'un constat simple : le PEA et l'assurance-vie ne jouent pas le
            même rôle. Le premier est une machine à capitaliser en actions, taillée pour être
            consommée à la retraite. La seconde est un couteau suisse patrimonial, capable de
            couvrir un projet à cinq ans comme une transmission à trois générations. Les
            comprendre comme complémentaires plutôt que rivales change toute la façon de les
            utiliser.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#pea">Le PEA : la machine à capitaliser en actions</a></li>
              <li><a href="#av">L'assurance-vie : le couteau suisse patrimonial</a></li>
              <li><a href="#idee-recue">L'argent de l'assurance-vie est-il vraiment bloqué ?</a></li>
              <li><a href="#tableau">Le comparatif en un tableau</a></li>
              <li><a href="#verdict">Notre verdict, par objectif</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
            </ol>
          </div>

          <h2 id="pea">Le PEA : la machine à capitaliser en actions</h2>
          <p>
            Le PEA est une enveloppe réservée aux actions européennes et aux fonds qui y sont
            éligibles. Son moteur fiscal est simple : une fois franchi le seuil des{" "}
            {FISCALITE.peaExonerationIRApres} ans de détention, les gains sortis du plan
            échappent totalement à l'impôt sur le revenu. Seuls demeurent dus les prélèvements
            sociaux (l'ensemble CSG-CRDS appliqué aux revenus du capital), au taux de{" "}
            {pct(FISCALITE.prelevementsSociaux.pea)} pour le PEA depuis la hausse introduite par
            la LFSS 2026 (barème en vigueur en {HYPOTHESES_MAJ}). Logé avec des supports peu
            coûteux — des ETF (fonds indiciels cotés) actions, par exemple, dont les frais
            courants peuvent être très bas — le PEA peut capitaliser avec une friction de frais
            minimale sur toute une carrière.
          </p>
          <p>
            Cette efficacité a un prix : un univers d'investissement restreint aux actions (pas
            de fonds euros, pas de poche obligataire, pas d'immobilier collectif logeable dans le
            plan), et un plafond de versements de 150 000 € qui n'est jamais reconstitué après un
            retrait — verser puis retirer ampute définitivement la capacité de versement (plafond
            légal en vigueur en {HYPOTHESES_MAJ}). Surtout, le PEA n'a aucune vocation successorale : sa
            clôture intervient de plein droit dès le décès du titulaire. L'impôt sur le revenu
            reste écarté, mais les prélèvements sociaux frappent alors la totalité des plus-values
            engrangées depuis l'ouverture, et ce qu'il en reste tombe dans la succession sans le
            moindre abattement dédié.
          </p>
          <p>
            Notre analyse : ces traits dessinent un usage précis. Le PEA récompense celui qui le
            remplit tôt, n'y touche pas pendant sa vie active, puis en fait sa première source de
            revenus à la retraite — précisément parce qu'il ne se transmet pas et qu'il n'a
            aucune vocation à le faire. Le cadre légal du PEA est fixé par le{" "}
            <a href="https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006168156/" target="_blank" rel="noopener noreferrer">
              Code monétaire et financier
            </a>{" "}
            (articles L221-30 et suivants). Notre page{" "}
            <a href="/strategies/pea-retraite">le PEA comme outil retraite</a> détaille cette
            mécanique. Reste une question pratique, celle du choix de l'établissement — un guide
            que nous consacrons entièrement à{" "}
            <a href="/guide/pea-banque-ou-courtier">PEA en banque ou chez un courtier</a>.
          </p>

          <h2 id="av">L'assurance-vie : le couteau suisse patrimonial</h2>
          <p>
            L'assurance-vie fonctionne à l'opposé du PEA sur presque tous les paramètres. Elle
            héberge deux familles de supports — le fonds en euros, dont le capital est garanti
            par l'assureur (une garantie réelle, mais portée par l'assureur lui-même, donc valable
            hors faillite de celui-ci), qui a servi en moyenne {pct(RENDEMENTS.fondsEuros.moyen)}
            {" "}en {RENDEMENTS.fondsEuros.periode} (moyenne de marché France Assureurs / ACPR,
            avant prélèvements sociaux — un constat passé qui ne préjuge en rien des rendements
            futurs), et les unités de compte (UC, des supports non garantis dont la valeur
            fluctue), qui donnent accès aux actions, à l'obligataire et à l'immobilier collectif
            (SCPI, notamment) — sans aucun plafond de versement.
          </p>
          <p>
            Sa fiscalité récompense la durée sans jamais enfermer le capital : après huit ans, les
            gains rachetés bénéficient d'un abattement annuel de{" "}
            {euros(FISCALITE.avAbattementAnnuelSeul)} pour une personne seule ou{" "}
            {euros(FISCALITE.avAbattementAnnuelCouple)} pour un couple soumis à imposition
            commune, puis d'un taux réduit de {pct(FISCALITE.avTauxReduitApres8Ans)} au-delà de
            cet abattement, sous conditions de versements (barème en vigueur en{" "}
            {HYPOTHESES_MAJ}). Les prélèvements sociaux y restent à{" "}
            {pct(FISCALITE.prelevementsSociaux.assuranceVie)} — un taux propre à cette enveloppe,
            que la hausse de la LFSS 2026 n'a pas concerné, contrairement au PEA. Et au décès, les
            capitaux issus de versements effectués avant 70 ans sont transmis avec un abattement
            de 152 500 € par bénéficiaire (barème en vigueur en {HYPOTHESES_MAJ}), via une clause
            bénéficiaire (le document qui désigne qui reçoit les capitaux) rédigée du vivant du
            souscripteur. Ce régime successoral spécifique est encadré par le{" "}
            <a href="https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006155868/" target="_blank" rel="noopener noreferrer">
              Code des assurances
            </a>{" "}
            (notamment son article L132-12 sur le principe hors succession).
          </p>
          <p>
            Notre page <a href="/strategies/assurance-vie-retraite">l'assurance-vie comme outil
            retraite</a> détaille comment articuler ces deux familles de supports selon
            l'horizon. Et si votre contrat actuel déçoit, la cause est presque toujours à chercher
            dans les supports logés dedans et les frais prélevés — c'est tout l'objet de notre
            guide{" "}
            <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">
              pourquoi votre assurance-vie rapporte peu
            </a>.
          </p>

          <h2 id="idee-recue">L'argent de l'assurance-vie est-il vraiment bloqué ?</h2>
          <p>
            C'est l'idée reçue la plus tenace du sujet, et elle mérite d'être démontée point par
            point. Non, l'argent placé en assurance-vie n'est pas bloqué huit ans. Un rachat (un
            retrait, partiel ou total) reste possible à tout moment, sauf en présence de supports
            illiquides. L'ancienneté du contrat ne conditionne que la fiscalité applicable aux
            gains retirés — jamais la disponibilité des fonds. Un contrat ouvert depuis deux ans
            se rachète exactement comme un contrat ouvert depuis vingt ans ; seule la note fiscale
            diffère.
          </p>
          <p>
            Le PEA, sur ce terrain précis, est en réalité plus contraignant : un retrait avant{" "}
            {FISCALITE.peaExonerationIRApres} ans referme purement et simplement le plan, et
            chaque retrait, même passé ce délai, ampute définitivement le plafond de versement.
            L'assurance-vie n'impose aucune de ces deux limites. Notre analyse : la vraie question
            à se poser
            n'est donc jamais « suis-je prisonnier de mon contrat ? », mais « à quel horizon
            vais-je avoir besoin de cet argent, et quelle fiscalité s'appliquera à ce moment-là ? ».
          </p>

          <h2 id="tableau">Le comparatif en un tableau</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>PEA</th>
                  <th>Assurance-vie</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Plafond de versements</td>
                  <td>150 000 € (non reconstituable après retrait)</td>
                  <td>Aucun</td>
                </tr>
                <tr>
                  <td>Supports disponibles</td>
                  <td>Actions européennes et fonds éligibles uniquement</td>
                  <td>Fonds euros sécurisé, unités de compte (actions, obligataire, immobilier collectif)</td>
                </tr>
                <tr>
                  <td>Disponibilité de l'argent</td>
                  <td>
                    Retraits libres après {FISCALITE.peaExonerationIRApres} ans ; avant, un
                    retrait clôture le plan
                  </td>
                  <td>Rachats à tout moment, quelle que soit l'ancienneté (sauf supports illiquides)</td>
                </tr>
                <tr>
                  <td>Fiscalité des retraits</td>
                  <td>
                    Exonération d'IR après {FISCALITE.peaExonerationIRApres} ans
                  </td>
                  <td>
                    Abattement annuel après 8 ans de {euros(FISCALITE.avAbattementAnnuelSeul)}/
                    {euros(FISCALITE.avAbattementAnnuelCouple)}, puis taux réduit de{" "}
                    {pct(FISCALITE.avTauxReduitApres8Ans)}
                  </td>
                </tr>
                <tr>
                  <td>Prélèvements sociaux</td>
                  <td>{pct(FISCALITE.prelevementsSociaux.pea)} (LFSS 2026)</td>
                  <td>{pct(FISCALITE.prelevementsSociaux.assuranceVie)} (non concerné par la hausse LFSS 2026)</td>
                </tr>
                <tr>
                  <td>Frais typiques</td>
                  <td>Potentiellement très bas sur des ETF, hors frais de courtage</td>
                  <td>
                    De {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.min)} à{" "}
                    {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.max)} de frais de gestion
                    annuels sur un contrat en ligne, à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)} sur un
                    contrat bancaire traditionnel, hors frais des supports (données{" "}
                    {HYPOTHESES_MAJ}, à vérifier contrat par contrat)
                  </td>
                </tr>
                <tr>
                  <td>Sort au décès</td>
                  <td>Clôture forcée ; PS sur tous les gains depuis l'origine ; aucun abattement</td>
                  <td>Abattement de 152 500 € par bénéficiaire (versements avant 70 ans)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les montants et taux de ce tableau sont ceux en vigueur en {HYPOTHESES_MAJ} ; chaque
            loi de finances peut les faire évoluer, et il faut les revérifier avant toute
            décision.
          </p>

          <h2 id="verdict">Notre verdict, par objectif</h2>
          <p>
            Vous comptez capitaliser en actions pendant votre vie active pour consommer ce
            capital à la retraite : le PEA est le meilleur point de départ, précisément parce
            qu'il n'a pas vocation à se transmettre et qu'il récompense celui qui ne le liquide
            qu'au moment de partir. Vous cherchez de la souplesse — pouvoir sécuriser une partie
            du capital dans un fonds euros, arbitrer entre supports, préparer une transmission
            sans renoncer à la disponibilité de l'argent : l'assurance-vie s'impose comme
            l'enveloppe pivot.
          </p>
          <p>
            Dans la plupart des situations que nous analysons, les deux enveloppes coexistent
            plutôt qu'elles ne s'excluent. La question qui compte n'est pas « PEA ou
            assurance-vie ? » mais « dans quel ordre les remplir, puis dans quel ordre les vider ? »
            — et cet ordre dépend de votre âge, de votre TMI (tranche marginale d'imposition, le
            taux qui frappe vos derniers euros de revenu) et de vos objectifs de transmission. Il
            n'existe pas de règle universelle sur ce point ; c'est ce qu'un{" "}
            <a href="/bilan-retraite">bilan retraite gratuit</a> permet de trancher, chiffres en
            main. Pour resituer ce duel dans le paysage complet des enveloppes retraite, notre
            guide{" "}
            <a href="/guide/meilleure-enveloppe-retraite">quelle est la meilleure enveloppe pour
            préparer sa retraite ?</a> élargit la focale au PER et au compte-titres.
          </p>
          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on avoir un PEA et une assurance-vie en même temps ?</h3>
          <p>
            Oui, sans restriction : ce sont deux enveloppes indépendantes, avec leurs propres
            plafonds et fiscalités, et il est courant de les faire coexister dans une même
            stratégie retraite plutôt que de choisir l'une contre l'autre.
          </p>
          <h3>L'assurance-vie est-elle vraiment bloquée pendant huit ans ?</h3>
          <p>
            Non, c'est l'idée reçue la plus répandue sur le sujet. Un rachat reste possible à
            tout moment, quelle que soit l'ancienneté du contrat. Les huit ans ne conditionnent
            que la fiscalité applicable aux gains retirés, jamais la disponibilité des fonds.
          </p>
          <h3>Le PEA permet-il d'investir hors d'Europe ?</h3>
          <p>
            Non, le PEA est réservé aux actions de sociétés européennes et à certains fonds
            éligibles qui respectent ce critère de composition. Pour une exposition aux marchés
            hors Europe, l'assurance-vie, via ses unités de compte, offre un univers
            d'investissement plus large.
          </p>
          <h3>Que se passe-t-il si je retire de l'argent du PEA avant les cinq ans ?</h3>
          <p>
            Un retrait avant ce délai entraîne en principe la clôture du plan, sauf exceptions
            légales limitées, et fait perdre l'avantage fiscal attaché à l'antériorité du plan.
            L'assurance-vie n'impose aucune contrainte de ce type : un rachat partiel ne clôture
            jamais le contrat.
          </p>
          <h3>Faut-il privilégier le PEA ou l'assurance-vie pour transmettre un capital ?</h3>
          <p>
            L'assurance-vie est structurellement plus adaptée à la transmission : elle prévoit
            un abattement dédié par bénéficiaire, alors que le PEA se clôture au décès sans
            aucun abattement propre et rejoint la succession selon les règles de droit commun.
          </p>
          <h3>Les frais d'un contrat d'assurance-vie sont-ils négociables ?</h3>
          <p>
            Les frais d'entrée le sont souvent, en particulier en réseau bancaire et à partir de
            montants versés significatifs. Les frais de gestion annuels du contrat le sont
            moins fréquemment, mais rien n'empêche de les questionner avant de signer.
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
