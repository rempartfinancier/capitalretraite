import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RENDEMENTS,
  FISCALITE,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

export default function GuideMeilleureEnveloppe() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Comparatif de référence</span>
          <h1>Quelle est la meilleure enveloppe pour préparer sa retraite ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> il n'existe pas de meilleure enveloppe dans l'absolu —
              tout dépend de votre objectif. Pour consommer un capital de son vivant à la retraite,
              le PEA est le mieux placé grâce à son exonération d'impôt sur le revenu après cinq
              ans. Pour la polyvalence — garder la main sur un projet non défini, avec une
              fiscalité douce à tout horizon — l'assurance-vie est l'enveloppe pivot. Pour
              transmettre et protéger sa famille, le PER assurantiel offre un report d'imposition
              qui devient définitif en cas de décès, assorti d'un abattement successoral. Le
              détail de chaque ligne, et de leurs limites, suit ci-dessous.
            </p>
          </div>
          <p>
            C'est sans doute la question qu'on nous pose le plus souvent en premier rendez-vous.
            Et la réponse honnête commence par un aveu : formulée ainsi, elle n'a pas de réponse.
            Demander quelle est la meilleure enveloppe, c'est demander quel est le meilleur outil
            d'une boîte à outils — tout dépend de ce que vous comptez faire.
          </p>
          <p>
            Une enveloppe fiscale (le cadre juridique et fiscal qui contient vos placements : PEA,
            assurance-vie, PER, compte-titres) ne rapporte rien par elle-même. Ce sont les
            supports logés dedans qui produisent — ou non. L'enveloppe, elle, détermine trois
            choses : la fiscalité de vos retraits, la disponibilité de votre argent, et ce qui se
            passe le jour de votre décès. La bonne question n'est donc pas « quelle est la
            meilleure enveloppe ? », mais « la meilleure pour quel objectif ? ».
          </p>
          <p>
            À cette question-là, il existe des réponses argumentées — et certaines vont à rebours
            du discours dominant. Notre classement tient en trois lignes : pour consommer un
            capital à la retraite, le PEA ; pour la polyvalence, l'assurance-vie ; pour
            transmettre et protéger sa famille, le PER assurantiel. La suite justifie chaque
            ligne, puis explique pourquoi tout classement — y compris le nôtre — doit s'effacer
            devant votre situation.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#question">Pourquoi la question est-elle mal posée ?</a></li>
              <li><a href="#pea">Pour consommer un capital à la retraite : le PEA</a></li>
              <li><a href="#assurance-vie">Pour la polyvalence : l'assurance-vie</a></li>
              <li><a href="#per">Pour transmettre et protéger sa famille : le PER assurantiel</a></li>
              <li><a href="#complements">Compte-titres et immobilier : les compléments</a></li>
              <li><a href="#tableau">Le comparatif en un tableau</a></li>
              <li><a href="#erreurs">Les erreurs du classement unique</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="question">Pourquoi la question est-elle mal posée ?</h2>
          <p>
            Un capital retraite peut servir trois desseins qui n'ont presque rien en commun. Le
            consommer : transformer l'épargne accumulée en revenus que vous dépenserez vous-même.
            Garder la main : financer un projet à dix ans sans savoir encore lequel — retraite,
            travaux, coup de pouce aux enfants. Le transmettre : faire en sorte qu'il arrive à
            vos proches dans les meilleures conditions fiscales. Chaque enveloppe excelle sur
            l'un de ces terrains et paie cette spécialisation sur les autres. D'où la règle qui
            structure tout cet article : on choisit d'abord l'objectif, ensuite l'enveloppe —
            jamais l'inverse.
          </p>

          <h2 id="pea">Pour consommer un capital à la retraite : le PEA</h2>
          <p>
            Le PEA (plan d'épargne en actions) est une enveloppe dédiée aux actions européennes
            et aux fonds qui y sont éligibles. Son atout fiscal est simple et puissant : passé
            le cap des {FISCALITE.peaExonerationIRApres} ans, les gains retirés sont exonérés
            d'impôt sur le revenu. Ne restent que les prélèvements sociaux (l'ensemble CSG-CRDS
            appliqué aux revenus du capital), au taux de{" "}
            {pct(FISCALITE.prelevementsSociaux.pea)} pour le PEA depuis la hausse introduite par
            la LFSS 2026 (barème en vigueur en {HYPOTHESES_MAJ}). Et, après ces cinq ans, les
            retraits sont libres : ils ne ferment pas le plan.
          </p>
          <p>
            Deux contraintes dessinent son usage. D'abord le plafond : 150 000 € de versements
            au maximum (plafond légal en vigueur en {HYPOTHESES_MAJ}), et chaque retrait ampute
            définitivement cette capacité — l'argent retiré ne « libère » pas de place pour de
            nouveaux versements. Ensuite le sort au décès, qui est la vraie ligne de partage :
            le PEA est automatiquement clôturé au décès de son titulaire, comme le rappelle{" "}
            <a
              href="https://www.service-public.fr/particuliers/vosdroits/F2385"
              target="_blank"
              rel="noopener noreferrer"
            >
              service-public.fr
            </a>
            . Les gains échappent
            alors à l'impôt sur le revenu, mais les prélèvements sociaux sont dus sur l'ensemble
            des plus-values (les gains de valeur accumulés depuis l'ouverture), et les titres
            rejoignent la succession sans aucun abattement propre à l'enveloppe.
          </p>
          <p>
            Notre analyse : ces deux traits font du PEA l'enveloppe à consommer de son vivant.
            Il récompense celui qui le remplit tôt, n'y touche pas pendant sa vie active, puis
            en fait sa première source de revenus à la retraite — précisément parce qu'il ne se
            transmet pas. Dans le cas général, c'est le meilleur véhicule pour l'objectif
            « transformer mon épargne en revenus que j'utiliserai moi-même » ; cet arbitrage se
            confirme toutefois au cas par cas. Pour approfondir, notre page{" "}
            <a href="/strategies/pea-retraite">le PEA comme outil retraite</a> détaille la
            mécanique, et le comparatif{" "}
            <a href="/guide/pea-ou-per-pour-la-retraite">PEA ou PER pour la retraite</a> pose le
            duel le plus fréquent.
          </p>

          <h2 id="assurance-vie">Pour la polyvalence : l'assurance-vie</h2>
          <p>
            L'assurance-vie est l'enveloppe de celui qui ne veut — ou ne peut — pas encore
            choisir entre les trois objectifs. Contrairement à une idée reçue tenace, l'argent
            n'y est jamais bloqué : un rachat (un retrait, partiel ou total) reste possible à
            tout moment, sauf supports illiquides ; le cap des huit ans ne conditionne que la
            fiscalité. Elle héberge deux familles de supports : le fonds en euros, dont le
            capital est garanti par l'assureur — une garantie réelle, mais portée par l'assureur
            lui-même, donc valable hors faillite de celui-ci, sous le contrôle prudentiel de l'
            <a href="https://acpr.banque-france.fr/" target="_blank" rel="noopener noreferrer">
              ACPR
            </a>{" "}
            — et qui a servi en moyenne{" "}
            {pct(RENDEMENTS.fondsEuros.moyen)} en {RENDEMENTS.fondsEuros.periode} (moyenne de
            marché France Assureurs / ACPR, avant prélèvements sociaux — un constat passé qui ne
            préjuge en rien des taux futurs) ; et les unités de compte (UC), des supports non
            garantis dont la valeur fluctue, en contrepartie d'une espérance de gain supérieure
            sur la durée, jamais assurée.
          </p>
          <p>
            Sa fiscalité couvre tous les horizons. Après huit ans, les gains rachetés
            bénéficient d'un abattement annuel (une fraction de gains exonérée d'impôt chaque
            année) de {euros(FISCALITE.avAbattementAnnuelSeul)} pour une personne seule ou{" "}
            {euros(FISCALITE.avAbattementAnnuelCouple)} pour un couple soumis à imposition
            commune, et d'un taux réduit de {pct(FISCALITE.avTauxReduitApres8Ans)} sous
            conditions de versements (barème en vigueur en {HYPOTHESES_MAJ}). Les prélèvements
            sociaux y restent à {pct(FISCALITE.prelevementsSociaux.assuranceVie)} — un taux
            propre à cette enveloppe, que la hausse de la LFSS 2026 n'a pas concernée (le détail
            de cette hausse, réservée à d'autres enveloppes, est expliqué sur{" "}
            <a
              href="https://www.service-public.fr/particuliers/actualites"
              target="_blank"
              rel="noopener noreferrer"
            >
              service-public.fr
            </a>
            ). Aucun
            plafond de versement. Et au décès, les capitaux issus des versements effectués avant
            70 ans sont transmis avec un abattement de 152 500 € par bénéficiaire, fixé par
            l'article 990 I du{" "}
            <a
              href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000041471365"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code général des impôts
            </a>{" "}
            (barème en vigueur en {HYPOTHESES_MAJ}).
          </p>
          <p>
            Projet à dix ans, revenus complémentaires à la retraite, transmission : la même
            enveloppe couvre les trois. Le prix de cette polyvalence, c'est qu'elle ne domine
            aucun terrain face au spécialiste — le PEA la devance pour consommer, le PER
            assurantiel pour transmettre à conditions comparables. Notre page{" "}
            <a href="/strategies/assurance-vie-retraite">l'assurance-vie comme outil retraite</a>{" "}
            examine comment en tirer le meilleur.
          </p>

          <h2 id="per">Pour transmettre et protéger sa famille : le PER assurantiel</h2>
          <p>
            Un discours répandu présente le PER (plan d'épargne retraite) comme « l'enveloppe
            retraite qui fait baisser vos impôts ». Ce discours est exact sur un point : les
            versements sont déductibles du revenu imposable, et l'économie immédiate est
            proportionnelle à votre TMI (tranche marginale d'imposition — le taux qui frappe
            vos derniers euros de revenu). En revanche, il omet l'essentiel : cette déduction
            est un report d'imposition, pas un cadeau. À la sortie, les versements déduits sont
            réintégrés au barème, et personne ne connaît le barème qui s'appliquera dans quinze
            ou vingt ans. Présenter la déduction comme un gain acquis, c'est raconter la moitié
            de l'histoire.
          </p>
          <p>
            Là où le PER devient réellement puissant, c'est sur un terrain dont ce même discours
            ne parle presque jamais : le décès. Si le titulaire d'un PER assurantiel décède
            avant d'avoir liquidé son plan, les sommes déduites à l'entrée ne sont jamais
            réintégrées — le report d'imposition devient définitivement acquis. Les capitaux
            transmis bénéficient, en cas de décès avant 70 ans, du même abattement de 152 500 €
            par bénéficiaire que l'assurance-vie (règles en vigueur en {HYPOTHESES_MAJ}), et les
            gains transmis échappent aux prélèvements sociaux. Autrement dit : l'enveloppe
            vendue comme une machine à défiscaliser est d'abord, dans notre analyse, un outil de
            protection familiale et de transmission.
          </p>
          <div className="note">
            <p>
              Précision décisive : ces avantages successoraux sont réservés au PER{" "}
              <strong>assurantiel</strong>, souscrit auprès d'un assureur — la majorité des PER
              individuels. Un PER bancaire (ou la plupart des PER collectifs d'entreprise)
              fonctionne comme un compte-titres : au décès, tout entre dans la masse
              successorale, sans abattement. Vérifier la nature de son plan est la première
              chose à faire.
            </p>
          </div>
          <p>
            La contrepartie est connue : l'épargne est indisponible jusqu'à la retraite, hors
            cas de déblocage anticipé prévus par la loi (accidents de la vie, achat de la
            résidence principale). Et à la sortie en capital, outre la réintégration des
            versements, les gains supportent {pct(FISCALITE.prelevementsSociaux.per)} de
            prélèvements sociaux depuis la LFSS 2026. Le PER se destine donc à l'épargnant
            imposé dans les tranches hautes qui poursuit un objectif de protection ou de
            transmission — pas à celui qui aura besoin de cet argent pour vivre. Notre page{" "}
            <a href="/strategies/per">la stratégie PER</a> déroule la mécanique complète, et le
            guide <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER ?</a> aide à
            trancher votre cas.
          </p>

          <h2 id="complements">Compte-titres et immobilier : les compléments</h2>
          <p>
            Le CTO (compte-titres ordinaire) n'offre aucun avantage fiscal en cours de route :
            les gains y subissent le prélèvement forfaitaire unique ({pct(FISCALITE.pfuIR)}{" "}
            d'impôt plus {pct(FISCALITE.prelevementsSociaux.cto)} de prélèvements sociaux, barème{" "}
            {HYPOTHESES_MAJ}). En échange, aucune contrainte : ni plafond, ni univers
            d'investissement restreint. Il prend tout son sens sur l'ultra long terme et dans
            une optique de transmission préparée, notamment par démembrement — donner la
            nue-propriété (la propriété sans la jouissance) de ses titres à ses enfants tout en
            conservant l'usufruit (les revenus) de son vivant, une ingénierie qui s'étudie avec
            un professionnel. Quant à l'immobilier, il joue dans une autre catégorie — celle du
            crédit et de l'effet de levier — et mérite son propre examen : c'est l'objet de
            notre page <a href="/strategies/immobilier-retraite">immobilier et retraite</a>.
          </p>

          <h2 id="tableau">Le comparatif en un tableau</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Enveloppe</th>
                  <th>Disponibilité</th>
                  <th>Fiscalité à la sortie</th>
                  <th>Plafond de versements</th>
                  <th>Sort au décès</th>
                  <th>Objectif de prédilection</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PEA</td>
                  <td>Retraits libres après {FISCALITE.peaExonerationIRApres} ans (avant : retrait = clôture)</td>
                  <td>Exonération d'IR après {FISCALITE.peaExonerationIRApres} ans ; PS de {pct(FISCALITE.prelevementsSociaux.pea)}</td>
                  <td>150 000 € (non reconstituable après retrait)</td>
                  <td>Clôture forcée ; PS sur tous les gains ; aucun abattement</td>
                  <td>Consommer son capital de son vivant</td>
                </tr>
                <tr>
                  <td>Assurance-vie</td>
                  <td>Rachats à tout moment (sauf supports illiquides)</td>
                  <td>Après 8 ans : abattement annuel {euros(FISCALITE.avAbattementAnnuelSeul)}/{euros(FISCALITE.avAbattementAnnuelCouple)} ; PS de {pct(FISCALITE.prelevementsSociaux.assuranceVie)}</td>
                  <td>Aucun</td>
                  <td>Abattement de 152 500 € par bénéficiaire (versements avant 70 ans)</td>
                  <td>Polyvalence : projet, retraite et transmission</td>
                </tr>
                <tr>
                  <td>PER assurantiel</td>
                  <td>Bloqué jusqu'à la retraite (hors déblocages légaux)</td>
                  <td>Versements déduits réintégrés au barème ; gains imposés, PS de {pct(FISCALITE.prelevementsSociaux.per)}</td>
                  <td>Aucun sur les versements (la déduction, elle, est plafonnée)</td>
                  <td>Abattement de 152 500 € par bénéficiaire (décès avant 70 ans) ; déduction définitivement acquise si décès avant liquidation</td>
                  <td>Transmettre et protéger sa famille</td>
                </tr>
                <tr>
                  <td>CTO</td>
                  <td>Disponible à tout moment</td>
                  <td>PFU : {pct(FISCALITE.pfuIR)} d'IR + {pct(FISCALITE.prelevementsSociaux.cto)} de PS</td>
                  <td>Aucun</td>
                  <td>Pas d'abattement propre, mais transmission sans liquidation forcée ; démembrement possible</td>
                  <td>Ultra long terme, transmission préparée</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les montants et taux de ce tableau sont ceux en vigueur en {HYPOTHESES_MAJ} ; chaque
            loi de finances peut les faire évoluer, et il faut les revérifier avant toute
            décision.
          </p>

          <h2 id="erreurs">Les erreurs du classement unique</h2>
          <p>
            <strong>Première erreur : chercher un vainqueur absolu.</strong> Les enveloppes ne
            sont pas concurrentes, elles sont complémentaires. Les palmarès qui sacrent l'une et
            enterrent les autres génèrent de l'audience sur les réseaux sociaux ; ils
            construisent rarement une stratégie patrimoniale. Une préparation de retraite solide
            en combine le plus souvent deux ou trois, remplies dans un ordre réfléchi — et
            vidées dans un autre.
          </p>
          <p>
            <strong>Deuxième erreur : choisir l'enveloppe avant l'objectif.</strong> Le cas type
            est celui de l'épargnant qui ouvre un PER « pour les impôts », puis découvre à 58
            ans que cet argent est indisponible et sera réimposé à la sortie — alors qu'il en
            aura besoin pour vivre. L'outil n'était pas mauvais ; il était affecté au mauvais
            usage.
          </p>
          <p>
            <strong>Troisième erreur : confondre l'enveloppe et son contenu.</strong> Une même
            allocation d'actifs peut se loger dans les quatre enveloppes. Quand un contrat
            déçoit, la cause est presque toujours dans les supports choisis et les frais
            prélevés, pas dans le cadre fiscal qui les contient.
          </p>
          <p>
            <strong>Quatrième erreur : raisonner accumulation et ignorer la sortie.</strong>{" "}
            L'ordre dans lequel on puise dans ses enveloppes à la retraite — dicté notamment par
            le sort successoral de chacune — pèse autant que l'ordre dans lequel on les a
            remplies, et il s'apprécie au cas par cas. C'est tout l'objet de notre page sur{" "}
            <a href="/strategies/decumulation">la décumulation</a>.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Faut-il choisir une seule enveloppe ou plusieurs à la fois ?</h3>
          <p>
            Plusieurs, dans la grande majorité des cas. Les enveloppes ne sont pas concurrentes :
            une stratégie retraite solide combine le plus souvent un PEA, une assurance-vie et,
            selon la situation fiscale, un PER — chacune affectée à l'objectif où elle excelle.
          </p>
          <h3>Par quelle enveloppe commencer si on débute ?</h3>
          <p>
            Il n'y a pas d'ordre universel, mais un principe utile : ouvrir tôt le PEA et
            l'assurance-vie fait courir leur antériorité fiscale (les cinq ans du PEA, les huit
            ans de l'assurance-vie) même avec de petits versements, ce qui laisse plus d'options
            ouvertes plus tard.
          </p>
          <h3>Le PER est-il vraiment utile si je ne suis pas fortement imposé ?</h3>
          <p>
            Son intérêt fiscal immédiat est plus faible à TMI basse, mais son atout de protection
            familiale en cas de décès — report d'imposition définitivement acquis, abattement
            successoral — reste valable quelle que soit la TMI. Notre guide{" "}
            <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER ?</a> détaille les cas où
            la réponse est non.
          </p>
          <h3>Peut-on changer d'avis et transférer son épargne d'une enveloppe à l'autre ?</h3>
          <p>
            Pas directement d'une enveloppe à l'autre par un simple virement fiscalement neutre :
            chaque enveloppe a ses propres règles de transfert ou de clôture. On peut en revanche
            réorienter les nouveaux versements vers une autre enveloppe sans toucher à l'existant.
          </p>
          <h3>L'immobilier ne devrait-il pas figurer dans ce classement ?</h3>
          <p>
            L'immobilier obéit à une logique différente, fondée sur le crédit et l'effet de
            levier, plutôt que sur une enveloppe fiscale au sens strict — c'est pourquoi il fait
            l'objet d'un examen séparé sur notre page{" "}
            <a href="/strategies/immobilier-retraite">immobilier et retraite</a>.
          </p>
          <h3>Que se passe-t-il si je dépasse le plafond de versement du PEA ou du PER ?</h3>
          <p>
            Le PEA refuse simplement tout versement au-delà de 150 000 € : l'excédent n'est pas
            accepté. Sur le PER, le dépassement du plafond de déduction n'empêche pas le
            versement, mais la part excédentaire n'est alors plus déductible du revenu imposable.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Il n'existe pas d'enveloppe miracle ; il existe des enveloppes bien ou mal affectées
            à un objectif. Vous comptez dépenser ce capital vous-même : le PEA est le meilleur
            point de départ. Vous voulez préserver toutes les options — projet, retraite,
            transmission : l'assurance-vie est l'enveloppe pivot. Vous êtes fortement imposé et
            votre priorité est de protéger les vôtres : le PER assurantiel mérite l'étude,
            précisément pour ce qu'on ne vous en dit pas. Et si ces enveloppes sont déjà
            pleines, le compte-titres prend le relais pour le très long terme.
          </p>
          <p>
            Ces lignes tracent des directions, pas des décisions. Votre TMI, votre âge, votre
            situation familiale et vos autres actifs peuvent inverser le classement — c'est
            exactement ce qu'un <a href="/bilan-retraite">bilan retraite gratuit</a> permet de
            poser, chiffres en main.
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
