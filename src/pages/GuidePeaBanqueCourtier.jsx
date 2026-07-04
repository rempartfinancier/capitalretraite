import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { SimulateurCapitalisation } from "../components/Simulateurs.jsx";
import {
  RENDEMENTS,
  FRAIS_TYPES,
  FISCALITE,
  ILLUSTRATIF,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

// ------------------------------------------------------------------
// Exemple chiffré de la section 3 — calculé au build à partir des
// hypothèses centralisées (même formule que Simulateurs.jsx :
// versements en début de mois, taux annuel net constant).
// Hypothèses illustratives, jamais des projections promises.
// ------------------------------------------------------------------
function capitalise(versementMensuel, dureeAnnees, tauxAnnuelPct) {
  const n = Math.round(dureeAnnees * 12);
  const taux = tauxAnnuelPct / 100;
  if (Math.abs(taux) < 1e-9) return versementMensuel * n;
  const i = Math.pow(1 + taux, 1 / 12) - 1;
  return versementMensuel * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

const EX = (() => {
  const versement = 300;
  const duree = 15;
  const brut = RENDEMENTS.ucActionsLongTerme.moyen; // hypothèse illustrative
  const fraisMaison = ILLUSTRATIF.fraisSupportMaison; // dans la fourchette FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports
  const fraisEtf = ILLUSTRATIF.fraisSupportEtf; // dans la fourchette FRAIS_TYPES.contratInternet.fraisSupports
  const arrondiCent = (n) => Math.round(n / 100) * 100;
  const versements = versement * duree * 12;
  const capMaison = arrondiCent(capitalise(versement, duree, brut - fraisMaison));
  const capEtf = arrondiCent(capitalise(versement, duree, brut - fraisEtf));
  return {
    versement,
    duree,
    brut,
    fraisMaison,
    fraisEtf,
    versements,
    capMaison,
    capEtf,
    gainsMaison: capMaison - versements,
    gainsEtf: capEtf - versements,
    ecart: capEtf - capMaison,
    ecartPct: Math.round(((capEtf - capMaison) / versements) * 100),
  };
})();

export default function GuidePeaBanqueCourtier() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Article phare</span>
          <h1>PEA : banque ou courtier en ligne ? Frais, fonds maison et vraie diversification</h1>
          <p className="sub">
            Le PEA est défini par la loi : même plafond, même fiscalité, mêmes règles du jeu
            partout. Ce qui change d'un établissement à l'autre, c'est ce qu'il vous coûte — et ce
            qu'on y loge.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> un PEA ouvert en banque ou chez un courtier en ligne
              donne accès au même avantage fiscal et au même plafond légal — la loi ne fait aucune
              différence. Ce qui varie, c'est le coût : frais de tenue de compte et de courtage
              plafonnés par la loi Pacte, mais surtout frais des fonds logés dans le plan, qui
              peuvent aller de moins de {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} pour
              un ETF à plus de {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)}{" "}
              pour un fonds maison. Le courtier en ligne gagne presque toujours le match des coûts
              ; la banque, celui de l'accompagnement de proximité.
            </p>
          </div>
          <p>
            Ouvrir un PEA dans votre agence bancaire ou chez un courtier en ligne donne accès à
            exactement le même avantage fiscal. Beaucoup d'épargnants en concluent que le choix de
            l'établissement est un détail. Notre analyse : c'est presque l'inverse. L'enveloppe est
            identique partout, mais son coût de fonctionnement et surtout le coût des supports
            qu'on y place peuvent varier de quelques dixièmes de pour cent à plus de 2 % par an —
            et cet écart représente plus de dix mille euros dans notre exemple, davantage encore
            pour des versements supérieurs ou une durée plus longue. Voici comment
            lire les lignes de frais, ce que dit la loi, et un exemple chiffré pas à pas.
          </p>
          <ul>
            <li><a href="#definition">Le PEA en deux phrases</a></li>
            <li><a href="#frais">Les frais d'un PEA : ce que la loi encadre, ce qui reste variable</a></li>
            <li><a href="#exemple">300 € par mois pendant 15 ans : l'écart chiffré</a></li>
            <li><a href="#banque-ou-courtier">Banque ou courtier en ligne : le vrai match</a></li>
            <li><a href="#contenu">Ce que vous y mettez compte plus que l'endroit où vous l'ouvrez</a></li>
            <li><a href="#checklist">La check-list d'audit de votre PEA</a></li>
            <li><a href="#faq">Questions fréquentes</a></li>
            <li><a href="#retenir">Ce qu'il faut retenir</a></li>
          </ul>

          <h2 id="definition">Le PEA en deux phrases</h2>
          <p>
            Le PEA (plan d'épargne en actions) est une enveloppe fiscale : un cadre juridique dans
            lequel vous achetez des actions européennes, en direct ou via des fonds éligibles, et
            où les gains ne sont pas imposés tant qu'ils restent à l'intérieur du plan. Passé le
            cinquième anniversaire ({FISCALITE.peaExonerationIRApres} ans), les retraits sont
            exonérés d'impôt sur le revenu sur les plus-values ; seuls les prélèvements sociaux
            (contributions prélevées sur les revenus du capital, {pct(FISCALITE.prelevementsSociaux.pea)}{" "}
            pour le PEA depuis la LFSS 2026, au barème en vigueur en {HYPOTHESES_MAJ}) restent dus
            sur les gains.
          </p>
          <p>
            Les versements sont plafonnés à 150 000 € par personne (plafond légal en vigueur en
            juillet 2026, publié par l'
            <a
              href="https://www.amf-france.org/fr/espace-epargnants/comprendre-les-produits-financiers/les-enveloppes-fiscales-et-sociales/le-plan-depargne-en-actions-pea"
              target="_blank"
              rel="noopener noreferrer"
            >
              AMF
            </a>
            ), et ce plafond ne se recharge pas après un retrait : c'est ce qui fait du
            PEA une enveloppe de long terme, pertinente d'abord pour la retraite — nous détaillons
            cette logique dans notre page <a href="/strategies/pea-retraite">le PEA dans une
            optique retraite</a>. Le point essentiel de cet article tient en une phrase : la loi
            définit l'enveloppe, pas son prix. Le « produit » que vous achetez réellement, c'est ce
            que votre établissement met autour du cadre (ses frais) et dedans (ses supports).
          </p>

          <h2 id="frais">Les frais d'un PEA : ce que la loi encadre, ce qui reste variable</h2>
          <h3>Les frais plafonnés depuis la loi Pacte</h3>
          <p>
            Trois familles de frais rythment la vie d'un PEA : les frais de tenue de compte et
            droits de garde (facturés pour la conservation de vos titres), les frais de courtage
            (prélevés à chaque ordre d'achat ou de vente en bourse) et les frais de transfert.
            Depuis un{" "}
            <a
              href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000041660867/"
              target="_blank"
              rel="noopener noreferrer"
            >
              décret d'application de la loi Pacte
            </a>{" "}
            entré en vigueur en 2020, ils sont
            plafonnés — sous réserve des barèmes en vigueur en juillet 2026, à vérifier auprès de
            votre établissement : environ 10 € pour l'ouverture, 0,4 % par an de la valeur du plan
            pour la tenue de compte et les droits de garde (plus un petit forfait par ligne
            détenue), 0,5 % du montant par ordre passé en ligne (1,2 % par un autre canal), et
            15 € par ligne transférée dans la limite de 150 € au total. Ces plafonds ont assaini
            les excès historiques — mais un plan peut rester nettement plus cher qu'un autre tout
            en respectant la loi.
          </p>
          <h3>Le coût des supports : là où tout se joue</h3>
          <p>
            Le vrai poste de coût est ailleurs, et il n'apparaît sur aucun relevé bancaire : ce
            sont les frais courants des fonds logés dans le plan, prélevés chaque année à
            l'intérieur du fonds lui-même. Les fonds actions « maison » (gérés par la société de
            gestion du groupe bancaire, souvent proposés par défaut) affichent des frais courants
            constatés de l'ordre de {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)} par an. Un ETF (fonds
            indiciel coté : un fonds qui se contente de répliquer un indice boursier, comme le CAC
            40 ou le STOXX Europe 600) éligible au PEA coûte de l'ordre de{" "}
            {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} à{" "}
            {pct(FRAIS_TYPES.contratInternet.fraisSupports.max)} par an — ordres de grandeur
            constatés sur les grilles publiques, révisés en {HYPOTHESES_MAJ}, à vérifier fonds par
            fonds dans le DIC (document d'informations clés).
          </p>
          <p>
            Notre analyse, en deux temps. Le discours anti-frais très répandu sur les réseaux a
            raison sur l'arithmétique : à rendement brut identique, un écart de 3 points de frais
            annuels réduit le capital final d'environ 50 % au bout de 25 ans, mais ce résultat ne
            vaut que dans un cas précis — un versement initial unique, sans apport ultérieur, avec
            un rendement brut constant chaque année (aucune trajectoire réelle n'est linéaire).
            Exemple de calcul : à {pct(RENDEMENTS.ucActionsLongTerme.moyen)} brut par an, un
            capital initial croît d'un facteur{" "}
            {Math.round(Math.pow(1 + RENDEMENTS.ucActionsLongTerme.moyen / 100, 25) * 10) / 10}{" "}
            sur 25 ans ; au même rendement brut diminué de 3 points de frais, il ne croît plus que
            d'un facteur{" "}
            {Math.round(Math.pow(1 + (RENDEMENTS.ucActionsLongTerme.moyen - 3) / 100, 25) * 10) /
              10}
            , soit environ la moitié. Sur des versements réguliers (le cas le plus fréquent),
            l'effet est réel mais moindre, car chaque versement n'est exposé aux frais que sur sa
            propre durée restante — c'est précisément ce que simule l'outil ci-dessous avec vos
            propres montants et durée, plutôt que sur un cas type. En revanche, faire du niveau de
            frais l'unique critère est l'erreur symétrique : la
            seule variable qui compte est la performance nette de frais et de fiscalité. Il existe
            des fonds de conviction (fonds gérés activement, dont le portefeuille s'écarte
            volontairement de l'indice) chargés à près de 2 % qui ont historiquement battu leur
            indice net de frais — rares, mais documentés, et il s'agit d'un constat passé, qui ne
            préjuge en rien de leurs performances futures —, et un support bon marché mal choisi
            coûte plus cher qu'il n'économise. Ce que notre analyse condamne sans nuance, c'est le
            cas le plus fréquent : environ 2 % par an pour une gestion qui suit peu ou prou son
            indice, sans aucun conseil en face. C'est régler l'addition d'un menu gastronomique
            pour un plat réchauffé au micro-ondes : l'étiquette promet un savoir-faire, l'assiette
            raconte autre chose.
          </p>

          <h2 id="exemple">300 € par mois pendant 15 ans : l'écart chiffré, pas à pas</h2>
          <p>Posons le calcul avec des hypothèses explicites, purement illustratives :</p>
          <ul>
            <li>
              versement de {euros(EX.versement)} par mois pendant {EX.duree} ans, soit{" "}
              {euros(EX.versements)} versés au total ;
            </li>
            <li>
              même indice sous-jacent dans les deux cas, avec un rendement brut hypothétique de{" "}
              {pct(EX.brut)} par an ({RENDEMENTS.ucActionsLongTerme.periode} des grands indices
              actions mondiaux, type MSCI World, dividendes réinvestis, avant frais — les performances passées ne
              préjugent pas des performances futures, et aucune trajectoire réelle n'est linéaire) ;
            </li>
            <li>
              une seule différence : {pct(EX.fraisMaison)} de frais annuels de support (fonds
              maison) contre {pct(EX.fraisEtf)} (ETF indiciel).
            </li>
          </ul>
          <p>
            À {pct(EX.fraisMaison)} de frais, le rendement net tombe à {pct(EX.brut - EX.fraisMaison)}{" "}
            par an : le plan atteindrait environ {euros(EX.capMaison)}, dont {euros(EX.gainsMaison)}{" "}
            de gains. À {pct(EX.fraisEtf)} de frais, le rendement net ressort à{" "}
            {pct(EX.brut - EX.fraisEtf)} : environ {euros(EX.capEtf)}, dont {euros(EX.gainsEtf)} de
            gains. L'écart final approche {euros(EX.ecart)}, soit environ {EX.ecartPct} % de la
            totalité des sommes versées — pour le même indice, le même effort d'épargne, la même
            enveloppe. Autrement dit, les gains sont environ une fois et demie plus élevés dans le
            second scénario. Montants bruts, avant prélèvements sociaux au retrait ; un PEA est
            investi en actions et le capital n'est pas garanti : il fluctue à la hausse comme à la
            baisse, et peut être en perte au moment où vous avez besoin des fonds.
          </p>
          <SimulateurCapitalisation enveloppe="pea" />

          <h2 id="banque-ou-courtier">Banque ou courtier en ligne : le vrai match</h2>
          <p>
            Rappelons l'essentiel : l'avantage fiscal est rigoureusement le même partout. Ce qui
            diffère, c'est le modèle. La banque traditionnelle offre un interlocuteur physique et
            la simplicité de tout centraliser, mais son catalogue oriente naturellement vers les
            fonds du groupe et ses frais de fonctionnement se situent historiquement en haut des
            plafonds. Le courtier en ligne casse les coûts et ouvre un large accès aux ETF, mais en
            libre-service intégral : personne ne vous rappellera qu'un ordre passé dans la panique
            d'une baisse de 30 % peut ruiner quinze ans de discipline.
          </p>
          <p>
            Notre analyse suit sa structure habituelle : concession d'abord. Sur le seul terrain
            des frais, le courtier en ligne gagne le match, souvent nettement — le nier serait
            malhonnête. Deux nuances ensuite. La première : la « gratuité » mise en avant par
            certaines plateformes récentes est un argument marketing, pas une réalité économique.
            Ces acteurs se rémunèrent autrement — écart entre prix d'achat et prix de vente (le
            spread), frais de change sur les titres cotés en devise étrangère, services annexes
            facturés à l'acte. Un tarif bas, lisible et affiché vaut mieux qu'un « zéro frais »
            opaque. La seconde : le libre-service, c'est la logique de la station-service —
            moins cher au litre, mais personne ne vérifie votre niveau d'huile : l'économie est
            réelle, le service en moins aussi. Sélection des supports, discipline dans les baisses, sécurisation progressive à
            l'approche de la retraite : si personne ne s'en charge, ce n'est pas économisé, c'est
            simplement non fait. La vraie question n'est donc pas « qui est le moins cher ? » mais
            « suis-je prêt à faire seul ce travail, durablement ? ». Il n'y a pas de bonne réponse
            universelle — cela s'évalue au cas par cas.
          </p>
          <div className="note">
            Bon à savoir : un PEA se transfère d'un établissement à l'autre en conservant son
            antériorité fiscale — la date d'ouverture du plan, qui commande le délai de cinq ans,
            est préservée. Les frais de transfert sont plafonnés par la loi Pacte (de l'ordre de
            15 € par ligne, 150 € au maximum — barème en vigueur en juillet 2026, à vérifier).
            Ne clôturez jamais un PEA pour en rouvrir un ailleurs : la clôture remet le compteur
            fiscal à zéro. Prévoyez en revanche un délai de plusieurs semaines, pendant lequel les
            arbitrages — les ventes et achats de supports à l'intérieur du plan — sont
            généralement gelés.
          </div>

          <h2 id="contenu">Ce que vous y mettez compte plus que l'endroit où vous l'ouvrez</h2>
          <p>
            Le choix de l'établissement optimise le contenant. La performance, elle, viendra du
            contenu — l'allocation, c'est-à-dire la répartition de votre épargne entre les
            supports — et de votre comportement dans la durée. Une architecture fréquente et
            robuste consiste à bâtir un cœur de portefeuille en ETF largement diversifié, complété
            le cas échéant par une poche « satellite » plus ciblée (fonds de conviction, titres en
            direct) selon votre profil et le temps que vous pouvez y consacrer. Notre analyse
            invite toutefois à ne pas confondre ETF et absence de réflexion : un fonds indiciel
            achète tout son indice, les réussites comme les entreprises en déclin, et le choix de
            l'indice répliqué reste la décision la plus structurante. Un point de vigilance
            spécifique au PEA : les ETF dits synthétiques, qui répliquent un indice mondial ou
            américain via un contrat d'échange avec une banque plutôt qu'en détenant les titres,
            rendent ces indices accessibles dans le plan — mais ils reposent sur une tolérance
            réglementaire qui pourrait évoluer. Bâtir toute sa stratégie sur ce mécanisme expose à
            devoir la défaire au mauvais moment. Enfin, la gestion sous mandat proposée sur
            certains PEA (vous déléguez les décisions à l'établissement, moyennant un surcoût
            annuel de l'ordre de {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à{" "}
            {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)}, qui s'ajoute aux frais des fonds) cumule
            des couches de frais que notre analyse juge rarement justifiées au regard du service
            rendu.
          </p>
          <p>
            Pour cadrer les attentes : les grands indices actions mondiaux (type MSCI World,
            dividendes réinvestis) ont dégagé des{" "}
            {RENDEMENTS.ucActionsLongTerme.periode} de l'ordre de{" "}
            {pct(RENDEMENTS.ucActionsLongTerme.min)} à {pct(RENDEMENTS.ucActionsLongTerme.max)} par
            an (avant frais et fiscalité — constat passé, révisé en{" "}
            {HYPOTHESES_MAJ}). Ces moyennes masquent de fortes variations annuelles, années
            négatives comprises : le niveau de risque est élevé, le capital n'est jamais garanti,
            et les performances passées ne préjugent pas des performances futures. La place du PEA
            dans votre stratégie d'ensemble — et ce qu'il doit contenir compte tenu de vos autres
            enveloppes — se raisonne globalement : voyez notre page{" "}
            <a href="/strategies/pea-retraite">PEA et retraite</a>, et pour la même grille de
            lecture appliquée à l'assurance-vie,{" "}
            <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">pourquoi votre
            assurance-vie rapporte si peu</a>.
          </p>
          <table>
            <thead>
              <tr>
                <th>Support logeable dans un PEA</th>
                <th>Frais annuels constatés</th>
                <th>Points de vigilance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Actions européennes en direct</td>
                <td>Pas de frais de support (courtage à chaque ordre)</td>
                <td>Concentration du risque, temps et compétence exigés ; dividendes de sociétés à siège étranger amputés d'une retenue à la source</td>
              </tr>
              <tr>
                <td>Fonds actions « maison »</td>
                <td>
                  {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min)} à{" "}
                  {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)}
                </td>
                <td>Comparer la performance nette de frais à celle de l'indice de référence, sur longue durée</td>
              </tr>
              <tr>
                <td>ETF éligibles (fonds indiciels)</td>
                <td>
                  {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} à{" "}
                  {pct(FRAIS_TYPES.contratInternet.fraisSupports.max)}
                </td>
                <td>Choix de l'indice déterminant ; réplication synthétique = dépendance à une tolérance réglementaire</td>
              </tr>
              <tr>
                <td>Gestion sous mandat</td>
                <td>
                  Surcoût de {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à{" "}
                  {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)} + frais des fonds sous-jacents
                </td>
                <td>Cumul de couches de frais ; rigidité des profils packagés</td>
              </tr>
            </tbody>
          </table>
          <p>
            Fourchettes de frais : ordres de grandeur constatés sur les grilles publiques, révisés
            en {HYPOTHESES_MAJ}, à vérifier support par support. Dans tous les cas, capital investi
            en actions, non garanti.
          </p>

          <h2 id="checklist">La check-list d'audit de votre PEA</h2>
          <p>Une heure suffit, relevés en main :</p>
          <ol>
            <li>
              <strong>Sortez le récapitulatif annuel des frais.</strong> Votre établissement a
              l'obligation réglementaire (issue des règles européennes d'information des
              investisseurs) de vous adresser chaque année le total des frais prélevés, en euros.
              C'est le document le plus honnête de votre dossier — commencez par lui.
            </li>
            <li>
              <strong>Listez vos lignes.</strong> Actions en direct, fonds, ETF : identifiez qui
              gère chaque fonds. Une majorité de fonds du groupe bancaire mérite un examen serré.
            </li>
            <li>
              <strong>Lisez les « frais courants » dans le DIC de chaque fonds.</strong> C'est là,
              et non sur votre relevé, que se cache le principal poste de coût.
            </li>
            <li>
              <strong>Regardez l'activité du compte.</strong> Des ordres fréquents empilent du
              courtage ; à l'inverse, des liquidités durablement non investies ne produisent rien
              dans une enveloppe conçue pour capitaliser.
            </li>
            <li>
              <strong>Additionnez le tout</strong> (tenue de compte + courtage annuel + frais
              courants pondérés par ligne) et rapportez-le à la valeur du plan. Si les frais
              cumulés de votre plan se rapprochent des niveaux bancaires décrits plus haut sans
              aucun service identifiable en contrepartie, la question du transfert mérite d'être
              posée — notre grille de lecture tient en une question : à quel service,
              concrètement, ces frais correspondent-ils ?
            </li>
          </ol>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on ouvrir un PEA à la fois en banque et chez un courtier en ligne ?</h3>
          <p>
            Non : un même contribuable ne peut détenir qu'un seul PEA (et, le cas échéant, un PEA-PME
            en complément). Il faut donc choisir un établissement, quitte à en changer plus tard
            par un transfert conservant l'antériorité fiscale.
          </p>
          <h3>Le PEA en ligne est-il vraiment gratuit ?</h3>
          <p>
            Rarement totalement. Un tarif affiché à 0 € se rémunère généralement ailleurs — écart
            entre prix d'achat et de vente, frais de change sur les titres en devise étrangère, ou
            services annexes facturés à l'acte. Un tarif bas et lisible vaut mieux qu'un « gratuit »
            opaque.
          </p>
          <h3>Que se passe-t-il si je retire de l'argent avant 5 ans ?</h3>
          <p>
            Un retrait avant le cinquième anniversaire du plan entraîne, sauf exception légale
            (comme la création d'entreprise), la clôture du PEA et la perte de l'antériorité
            fiscale acquise.
          </p>
          <h3>Puis-je transférer mon PEA sans perdre son ancienneté ?</h3>
          <p>
            Oui : le transfert d'un établissement à l'autre conserve la date d'ouverture initiale,
            qui commande le délai de cinq ans. Seuls des frais de transfert plafonnés par la loi
            Pacte s'appliquent.
          </p>
          <h3>Dois-je choisir uniquement des ETF pour mon PEA ?</h3>
          <p>
            Ce n'est pas une obligation, mais les ETF (fonds indiciels à bas coût) constituent
            souvent un socle robuste et peu coûteux. Une poche satellite en fonds de conviction ou
            titres en direct peut compléter ce socle selon votre profil et le temps que vous
            pouvez y consacrer.
          </p>
          <h3>La gestion sous mandat sur un PEA vaut-elle le coût qu'elle facture ?</h3>
          <p>
            Cela dépend du service réellement rendu derrière le surcoût annuel facturé. Notre
            analyse invite à vérifier ce que cette délégation apporte concrètement — allocation
            réellement suivie et ajustée dans le temps — plutôt que de la retenir par défaut.
          </p>

          <h2 id="retenir">Ce qu'il faut retenir</h2>
          <p>
            Le PEA est la même enveloppe fiscale partout — mais pas le même produit. Les frais de
            fonctionnement sont désormais plafonnés par la loi ; le coût des supports, lui, reste
            libre et peut varier de {pct(FRAIS_TYPES.contratInternet.fraisSupports.min)} à plus de{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)} par an, avec un impact
            de plus de dix mille euros dans notre exemple — davantage encore pour des versements
            supérieurs ou une durée plus longue. Le courtier en ligne
            gagne le match des coûts, la banque celui de l'accompagnement de proximité — et aucun
            des deux ne répond à la seule question qui crée la performance : que mettre dans le
            plan, et comment s'y tenir. Un PEA existant ne se clôture pas, il s'audite — et, le
            cas échéant, se transfère en conservant son antériorité fiscale.
          </p>
          <div className="note">
            Cette analyse est générale et ne constitue pas un conseil en investissement
            personnalisé ; chaque situation doit faire l'objet d'une étude individuelle. Un PEA est
            investi en actions : le capital n'est pas garanti et sa valeur fluctue à la hausse
            comme à la baisse. Les chiffres cités sont des constats passés ou des hypothèses
            illustratives, datés et révisés en {HYPOTHESES_MAJ} ; les performances passées ne
            préjugent pas des performances futures.
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Un doute sur ce que votre PEA vous coûte vraiment ? Apportez votre récapitulatif de frais au bilan retraite gratuit."
        button="Prendre rendez-vous"
      />
    </>
  );
}
