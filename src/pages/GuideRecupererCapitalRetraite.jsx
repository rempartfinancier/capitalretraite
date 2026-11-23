import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { FISCALITE, AV_RACHAT, PER_PLAFOND, euros } from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const dureeAv = AV_RACHAT.dureeTauxReduitAnnees;
const peaAnnees = FISCALITE.peaExonerationIRApres;
const abattementSeul = FISCALITE.avAbattementAnnuelSeul;
const abattementCouple = FISCALITE.avAbattementAnnuelCouple;
const maj = "novembre 2026";

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Plan d'épargne retraite (PER), fiche F34982, vérifiée le 12 octobre 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34982",
  },
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : comment sont imposés les revenus d'un contrat d'assurance-vie ? Fiche F22414, vérifiée le 15 avril 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22414",
  },
  {
    label:
      "Légifrance — Code monétaire et financier, partie législative : plan d'épargne retraite (articles L. 224-1 et suivants) et plan d'épargne en actions (article L. 221-30 et suivants)",
    url: "https://www.legifrance.gouv.fr",
  },
  {
    label:
      "impots.gouv.fr — Les revenus mobiliers (mise à jour du 8 avril 2026) : régime des produits d'assurance-vie et des plus-values de PEA",
    url: "https://www.impots.gouv.fr/particulier/les-revenus-mobiliers",
  },
  {
    label: "AMF — Épargnants : plan d'épargne en actions et assurance-vie (rubrique grand public)",
    url: "https://www.amf-france.org",
  },
];

export default function GuideRecupererCapitalRetraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Décaissement · calendrier</span>
          <h1>À quel âge peut-on récupérer son capital retraite ? PER, assurance-vie, PEA</h1>
          <p className="sub">
            Chaque enveloppe a son propre calendrier : parfois aucun, parfois une condition d'âge,
            parfois un événement. Mis à jour en {maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> il n'existe pas d'« âge unique » pour récupérer son
              capital. L'assurance-vie est disponible à tout moment, avec une fiscalité plus
              douce après {dureeAv} ans. Le PEA se retire à tout moment, mais un retrait avant{" "}
              {peaAnnees} ans entraîne en principe la clôture du plan. Le PER est en principe
              bloqué jusqu'au départ à la retraite, sauf cas de déblocage anticipé prévus par la
              loi. La bonne question n'est donc pas « à quel âge », mais « dans quelle enveloppe, et
              avec quelle fiscalité ».
            </p>
          </div>

          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel :
            Marc, 61 ans, a constitué au fil des années un PER, une assurance-vie et un PEA. Il
            envisage de cesser son activité dans quelques années et se demande de quoi il pourra
            disposer, quand, et à quelles conditions. Sa question est celle de beaucoup de futurs
            retraités : le capital existe, mais chaque enveloppe a sa propre porte de sortie.
          </p>
          <p>
            Cet article dresse le calendrier de sortie enveloppe par enveloppe, explique comment
            déposer une demande, puis aborde le choix entre liquider en une fois et étaler. La
            fiscalité de chaque sortie est traitée dans d'autres pages auxquelles nous renvoyons.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#tableau">Le calendrier de sortie, enveloppe par enveloppe</a></li>
              <li><a href="#assurance-vie">Assurance-vie : disponible à tout moment ?</a></li>
              <li><a href="#pea">PEA : que se passe-t-il si l'on retire avant {peaAnnees} ans ?</a></li>
              <li><a href="#per">PER : à quel âge peut-on débloquer son épargne ?</a></li>
              <li><a href="#autres">Et l'épargne salariale, l'assurance-vie luxembourgeoise ?</a></li>
              <li><a href="#demande">Comment faire la demande ?</a></li>
              <li><a href="#une-fois-ou-etaler">Tout récupérer d'un coup ou étaler les retraits ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="tableau">Le calendrier de sortie, enveloppe par enveloppe</h2>
          <p>
            Le tableau résume la disponibilité de chaque enveloppe. Il décrit des principes
            généraux ; le règlement de votre plan ou les conditions générales de votre contrat
            peuvent comporter des particularités.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Enveloppe</th>
                  <th>Disponibilité</th>
                  <th>Ce qui change avec le temps</th>
                  <th>Forme de la sortie</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Assurance-vie</td>
                  <td>À tout moment, par rachat partiel ou total</td>
                  <td>Après {dureeAv} ans : taux d'impôt réduit et abattement annuel de {euros(abattementSeul)} (personne seule) ou {euros(abattementCouple)} (couple)</td>
                  <td>Capital, par rachats libres ou programmés ; rente possible sur option</td>
                </tr>
                <tr>
                  <td>PEA</td>
                  <td>À tout moment ; retrait avant {peaAnnees} ans : clôture en principe</td>
                  <td>Après {peaAnnees} ans : retraits sans clôture et exonération d'impôt sur le revenu des gains (prélèvements sociaux dus)</td>
                  <td>Capital ; rente viagère possible après {peaAnnees} ans</td>
                </tr>
                <tr>
                  <td>PER</td>
                  <td>En principe à l'âge de la retraite ou au départ en retraite ; déblocage anticipé dans des cas prévus par la loi</td>
                  <td>Le fait générateur est le départ à la retraite, non un âge fixe</td>
                  <td>Capital et/ou rente, selon l'origine des sommes (compartiments)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="assurance-vie">Assurance-vie : disponible à tout moment ?</h2>
          <p>
            Oui : il n'y a ni âge minimal, ni condition de départ à la retraite pour racheter un
            contrat d'assurance-vie. Le calendrier ne porte donc pas sur la disponibilité, mais sur
            la fiscalité. Le rachat est imposé sur la seule part de gains ; après {dureeAv} ans de
            contrat, un abattement annuel de {euros(abattementSeul)} pour une personne seule ou{" "}
            {euros(abattementCouple)} pour un couple soumis à imposition commune s'applique à cette
            part (fiche F22414 de Service-Public). Les prélèvements sociaux restent dus.
          </p>
          <p>
            Deux précisions pratiques : le délai de versement dépend de l'assureur, et certains
            contrats comportent des supports moins liquides ou des frais de sortie à vérifier.
            Notre guide sur{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">l'imposition d'un rachat partiel</a>{" "}
            détaille le calcul, et la page{" "}
            <a href="/strategies/assurance-vie-retraite">assurance-vie et retraite</a> en situe le
            rôle.
          </p>

          <h2 id="pea">PEA : que se passe-t-il si l'on retire avant {peaAnnees} ans ?</h2>
          <p>
            Le PEA est lui aussi disponible à tout moment, mais d'une manière plus contrainte : un
            retrait avant {peaAnnees} ans entraîne en principe la clôture du plan et la perte de
            ses avantages fiscaux. Après {peaAnnees} ans, les retraits partiels sont possibles sans
            clôture, et les gains échappent à l'impôt sur le revenu, les prélèvements sociaux
            restant dus. Ces règles se vérifient auprès de votre établissement teneur de compte ;
            d'autres conditions (versements après retrait, rente viagère) varient selon l'ancienneté
            du plan.
          </p>
          <p>
            La rigidité du PEA tient à sa clôture au retrait, tant que {peaAnnees} ans ne sont pas
            écoulés. Il s'étudie dans notre page{" "}
            <a href="/strategies/pea-retraite">PEA et retraite</a> ; ses limites sont présentées
            dans l'article sur les inconvénients du PEA.
          </p>

          <h2 id="per">PER : à quel âge peut-on débloquer son épargne ?</h2>
          <p>
            Le plan d'épargne retraite est conçu pour la retraite : selon la fiche F34982 de
            Service-Public, les sommes sont en principe disponibles à l'âge de la retraite (ou au
            départ en retraite), sous forme de capital ou de rente selon l'origine des versements.
            Le déclencheur n'est donc pas un âge fixe mais la liquidation de la retraite : un
            futur retraité qui retarde son départ retarde aussi, en principe, la sortie. Le plafond
            et la déductibilité des versements à l'entrée sont traités dans notre guide sur le
            plafond PER ; la déduction se poursuit jusqu'à {PER_PLAFOND.ageFinDeduction} ans.
          </p>
          <p>
            La forme de la sortie varie selon les compartiments du plan. Certaines sommes peuvent
            sortir en capital, d'autres en rente seulement, et le contrat comme le règlement du
            plan précisent ce qui s'applique à vous ; il est prudent de le faire confirmer avant de
            bâtir un calendrier de retraits. La fiscalité de cette sortie fait l'objet d'un guide
            à part : <a href="/guide/fiscalite-sortie-per">fiscalité de la sortie du PER</a>.
          </p>
          <p>
            Le PER peut aussi être débloqué avant la retraite dans des cas prévus par la loi, sans
            que nous les détaillions ici. Ils sont présentés, avec leurs conditions et leur
            fiscalité, dans notre guide sur le{" "}
            <a href="/guide/deblocage-anticipe-per">déblocage anticipé du PER</a>. Pour le cadre
            général, voir aussi la page <a href="/strategies/per">stratégie PER</a>.
          </p>

          <h2 id="autres">Et l'épargne salariale, l'assurance-vie luxembourgeoise ?</h2>
          <p>
            L'épargne salariale (plans d'épargne d'entreprise) obéit à ses propres périodes de
            blocage, fixées par le plan ou l'accord d'entreprise : cette durée est à lire dans les
            documents remis par votre employeur ou votre teneur de compte. Une partie peut aussi
            avoir été versée sur un PER d'entreprise, auquel cas les règles du PER s'appliquent.
          </p>
          <p>
            L'assurance-vie luxembourgeoise n'est pas traitée sur cette page ; son fonctionnement
            et sa fiscalité relèvent d'un site dédié : <a href="https://assurancevie.lu" target="_blank" rel="noopener noreferrer">assurancevie.lu</a>.
          </p>

          <h2 id="demande">Comment faire la demande ?</h2>
          <p>
            Les démarches se ressemblent d'une enveloppe à l'autre, sans être uniformes.
          </p>
          <ol>
            <li>
              <strong>Contacter l'assureur ou le teneur de compte</strong> (espace en ligne, courrier
              ou conseiller) pour demander la procédure de rachat, de retrait ou de liquidation.
            </li>
            <li>
              <strong>Rassembler les pièces</strong> habituelles : formulaire de demande, pièce
              d'identité, relevé d'identité bancaire. Pour un PER, un justificatif du départ à la
              retraite ou de l'événement invoqué peut être exigé.
            </li>
            <li>
              <strong>Préciser la forme de la sortie</strong> : total ou partiel, capital ou rente,
              et le cas échéant le choix fiscal proposé (par exemple pour un PER).
            </li>
            <li>
              <strong>Anticiper les délais.</strong> Ils varient selon l'établissement, la nature
              des supports vendus et la complétude du dossier ; mieux vaut demander à l'avance et ne
              pas planifier une dépense à la date théorique de versement.
            </li>
            <li>
              <strong>Déclarer ce qui doit l'être</strong> : les sommes retirées figurent sur les
              documents fiscaux transmis par l'établissement, à vérifier lors de la déclaration de
              revenus.
            </li>
          </ol>

          <h2 id="une-fois-ou-etaler">Tout récupérer d'un coup ou étaler les retraits ?</h2>
          <p>
            Rien n'oblige à récupérer son capital d'un seul bloc. Un retrait unique concentre
            l'imposition sur une seule année ; des retraits étalés permettent de répartir les
            gains et, pour l'assurance-vie, d'utiliser l'abattement annuel chaque année. À
            l'inverse, étaler maintient le capital exposé aux variations de marché, avec un
            risque de perte en capital. Le bon arbitrage dépend de la situation fiscale, des
            autres ressources du foyer et des besoins, cas par cas.
          </p>
          <p>
            Pour organiser des retraits réguliers depuis un contrat, voir{" "}
            <a href="/guide/rachats-programmes-assurance-vie-retraite">les rachats programmés d'assurance-vie</a>
            . Pour choisir dans quelle enveloppe puiser d'abord, notre guide sur l'
            <a href="/guide/ordre-de-decaissement-retraite">ordre de décaissement</a> propose une
            grille de lecture ; l'ensemble est replacé dans la page{" "}
            <a href="/strategies/decumulation">décumulation</a>. Si le revenu à vie est une
            priorité, la comparaison{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">rente viagère ou retraits programmés</a>{" "}
            complète la réflexion.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>À quel âge peut-on récupérer son capital retraite ?</h3>
          <p>
            Cela dépend de l'enveloppe. L'assurance-vie et le PEA sont disponibles à tout moment,
            avec des conséquences différentes (fiscalité pour l'une, clôture avant {peaAnnees} ans
            pour l'autre). Le PER n'est en principe disponible qu'au départ à la retraite, hors cas
            de déblocage anticipé.
          </p>
          <h3>Peut-on retirer son assurance-vie avant 8 ans ?</h3>
          <p>
            Oui, à tout moment. Ce qui change avant {dureeAv} ans, c'est la fiscalité de la part de
            gains : le taux réduit et l'abattement annuel ne s'appliquent qu'à partir de cette
            ancienneté.
          </p>
          <h3>Que se passe-t-il si je retire de l'argent de mon PEA avant {peaAnnees} ans ?</h3>
          <p>
            En principe, le plan est clôturé et ses avantages fiscaux sont perdus. Après{" "}
            {peaAnnees} ans, un retrait partiel est possible sans clôture. À confirmer auprès de
            votre établissement.
          </p>
          <h3>Peut-on récupérer son PER avant la retraite ?</h3>
          <p>
            Oui, mais seulement dans les cas de déblocage anticipé prévus par la loi, présentés dans
            notre guide sur le <a href="/guide/deblocage-anticipe-per">déblocage anticipé du PER</a>.
          </p>
          <h3>Le PER sort-il forcément en rente ?</h3>
          <p>
            Non, mais cela dépend de l'origine des sommes (compartiments) et du règlement du plan.
            Il faut le vérifier dans les documents du plan avant de planifier la sortie.
          </p>
          <h3>Faut-il attendre l'âge légal de la retraite pour sortir son PER ?</h3>
          <p>
            Le déclencheur est le départ à la retraite, qui peut intervenir à des âges différents
            selon les carrières. Pour comprendre l'âge de départ lui-même, voir notre guide sur la{" "}
            <a href="/guide/surcote-decote-retraite">surcote et la décote</a>.
          </p>
          <h3>Combien de temps faut-il pour récupérer son argent après la demande ?</h3>
          <p>
            Le délai varie selon l'assureur ou l'établissement et selon les supports vendus. Nous
            ne pouvons pas en donner un chiffre général : il se demande au gestionnaire.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Récupérer son capital retraite se règle enveloppe par enveloppe. Le PER est le plus
            contraint, car son horizon est la retraite ; l'assurance-vie et le PEA sont les plus
            souples, au prix d'une clôture pour le second avant {peaAnnees} ans. La fiscalité, plus
            que la disponibilité, guide ensuite le calendrier : ancienneté du contrat, année du
            retrait, tranche marginale.
          </p>
          <p>
            La suite logique consiste à lister ce que vous détenez, avec les dates d'ouverture et
            l'origine des sommes, puis à demander à chaque gestionnaire les conditions écrites de
            sortie. Notre <a href="/simulateur-retraite">simulateur de retraite</a> aide à chiffrer
            le revenu à compléter, et le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à construire ce
            calendrier avec vos relevés en main.
          </p>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en {maj} :</p>
          <ul>
            {sources.map((src) => (
              <li key={src.url}>
                <a href={src.url} target="_blank" rel="noopener noreferrer">
                  {src.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les placements
              en unités de compte, en actions ou via un PER comportent un risque de perte en
              capital ; les performances passées ne préjugent pas des performances futures. Les
              règles citées sont celles publiées en {maj} et peuvent évoluer ; la situation exacte de
              chaque plan ou contrat se vérifie dans ses documents contractuels. L'exemple présenté
              est une illustration pédagogique composite, qui ne correspond à aucun cas réel.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Savoir quand et comment sortir de chaque enveloppe se prépare avant la retraite." />
    </>
  );
}
