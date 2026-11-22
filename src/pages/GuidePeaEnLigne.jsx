import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  ENVELOPPES_NOV2026,
  FISCALITE,
  FRAIS_TYPES,
  ILLUSTRATIF,
  PEA_LIGNE_NOV2026,
  RENDEMENTS,
  euros,
  pct,
} from "../components/hypotheses.js";

// ------------------------------------------------------------------
// Exemple chiffré : coût cumulé des frais de plateforme (courtage +
// droits de garde) sur la durée, pour deux grilles fictives.
// Simulation mensuelle : versement en début de mois, courtage prélevé
// sur chaque versement, droits de garde prélevés mensuellement (1/12
// du taux annuel) sur la valeur du plan, rendement brut hypothétique
// diminué des frais courants d'un ETF type. Illustratif, jamais une
// projection.
// ------------------------------------------------------------------
function simule(grille, fraisSupport) {
  const { versementMensuel: v, dureeAnnees, ordresParAn } = PEA_LIGNE_NOV2026;
  const brut = RENDEMENTS.ucActionsLongTerme.moyen;
  const net = (brut - fraisSupport) / 100;
  const i = Math.pow(1 + net, 1 / 12) - 1;
  const n = dureeAnnees * 12;
  const courtageParOrdre = grille.courtagePct / 100;
  const gardeMensuel = grille.droitsGardePct / 100 / 12;
  let valeur = 0;
  let courtageTotal = 0;
  let gardeTotal = 0;
  for (let m = 0; m < n; m++) {
    const c = v * courtageParOrdre;
    courtageTotal += c;
    valeur += v - c;
    valeur *= 1 + i;
    const g = valeur * gardeMensuel;
    gardeTotal += g;
    valeur -= g;
  }
  return { capital: valeur, courtageTotal, gardeTotal };
}

const EX = (() => {
  const fraisEtf = ILLUSTRATIF.fraisSupportEtf;
  const haute = simule(PEA_LIGNE_NOV2026.grilleHaute, fraisEtf);
  const basse = simule(PEA_LIGNE_NOV2026.grilleBasse, fraisEtf);
  const arrondi = (n) => Math.round(n / 100) * 100;
  const versements = PEA_LIGNE_NOV2026.versementMensuel * PEA_LIGNE_NOV2026.dureeAnnees * 12;
  return {
    fraisEtf,
    versements,
    haute: {
      capital: arrondi(haute.capital),
      courtage: Math.round(haute.courtageTotal),
      garde: arrondi(haute.gardeTotal),
    },
    basse: {
      capital: arrondi(basse.capital),
      courtage: Math.round(basse.courtageTotal),
      garde: arrondi(basse.gardeTotal),
    },
    ecart: arrondi(basse.capital - haute.capital),
  };
})();

const SOURCES = [
  {
    label: "AMF — Le plan d'épargne en actions (PEA)",
    url: "https://www.amf-france.org/fr/espace-epargnants/comprendre-les-produits-financiers/les-enveloppes-fiscales-et-sociales/le-plan-depargne-en-actions-pea",
  },
  {
    label: "Légifrance — décret d'application de la loi Pacte sur les frais du PEA",
    url: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000041660867/",
  },
];

export default function GuidePeaEnLigne() {
  const { grilleHaute, grilleBasse } = PEA_LIGNE_NOV2026;
  const maj = ENVELOPPES_NOV2026.maj;
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique</span>
          <h1>PEA en ligne : comment choisir et l'utiliser pour préparer sa retraite</h1>
          <p className="sub">
            Banque en ligne, courtier, néobanque : l'enveloppe fiscale est la même, l'expérience
            et la facture ne le sont pas. Voici une grille de choix, les étapes d'ouverture, et la
            place réaliste du PEA dans une stratégie retraite.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> un PEA en ligne s'ouvre en quelques jours, sans
              déplacement, et ses règles fiscales sont identiques chez tous les acteurs : plafond de
              versements de {euros(ENVELOPPES_NOV2026.peaPlafondVersements)}, exonération d'impôt
              sur le revenu des gains après {FISCALITE.peaExonerationIRApres} ans, prélèvements
              sociaux à {pct(FISCALITE.prelevementsSociaux.pea)} sur les gains, aucune déduction à
              l'entrée. Le choix se joue sur cinq critères : frais de courtage, droits de garde,
              accès aux ETF éligibles, conditions de transfert et solidité de l'acteur. Pour la
              retraite, le PEA est un outil de capitalisation en actions, à manier avec un horizon
              long — et sans garantie du capital.
            </p>
          </div>
          <p>
            Les requêtes « PEA en ligne » et « PEA banque en ligne » reviennent sans cesse, et pour
            cause : ouvrir son plan depuis un écran est devenu banal. Mais « en ligne » recouvre
            trois familles d'acteurs très différentes, et la facilité d'ouverture masque une
            question plus importante : à quoi servira ce PEA dans dix, vingt ou trente ans ? Cet
            article répond aux deux, sans comparer ligne à ligne les grilles tarifaires — c'est
            l'objet de notre <a href="/guide/pea-banque-ou-courtier">comparatif banque ou courtier
            en ligne</a>, à lire en complément.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#familles">Trois familles de PEA en ligne</a></li>
              <li><a href="#criteres">Les cinq critères de choix</a></li>
              <li><a href="#exemple">Courtage et droits de garde : l'effet cumulé sur {PEA_LIGNE_NOV2026.dureeAnnees} ans</a></li>
              <li><a href="#ouverture">Ouvrir un PEA en ligne : les étapes</a></li>
              <li><a href="#retraite">La place du PEA dans la préparation de la retraite</a></li>
              <li><a href="#sortie">Sortir du PEA : capital ou rente</a></li>
              <li><a href="#comparaison">PEA, PER, assurance-vie : où se situer</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Ce qu'il faut retenir</a></li>
              <li><a href="#sources">Sources</a></li>
            </ol>
          </div>

          <h2 id="familles">Trois familles de PEA en ligne</h2>
          <p>
            <strong>La banque en ligne</strong> propose le PEA comme un produit parmi d'autres,
            souvent adossé à un compte courant. Avantage : tout est au même endroit, et le service
            client est généralement joignable. Contrepartie : la gamme de fonds et d'ETF est
            parfois plus restreinte et la grille de frais n'est pas toujours la plus basse.
          </p>
          <p>
            <strong>Le courtier en ligne</strong> est spécialisé dans l'investissement. Il donne
            en général accès à un large catalogue d'ETF éligibles et à des frais de courtage
            réduits, mais en libre-service : aucun conseiller ne vous rappellera à l'ordre dans
            une phase de baisse.
          </p>
          <p>
            <strong>La néobanque ou l'application d'investissement</strong> met en avant la
            simplicité et des tarifs affichés très bas, voire nuls. Un tarif bas est une bonne
            nouvelle ; un « zéro frais » mérite en revanche d'être décortiqué (écart entre prix
            d'achat et de vente, services facturés à l'acte, catalogue restreint). Notre analyse :
            aucune famille n'est « la meilleure » en soi. La bonne est celle dont le coût, le
            catalogue et le niveau d'autonomie exigé correspondent à votre façon d'épargner.
          </p>

          <h2 id="criteres">Les cinq critères de choix</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Ce qu'il faut regarder</th>
                  <th>Piège fréquent</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frais de courtage</td>
                  <td>
                    Coût par ordre (pourcentage, forfait, minimum). Plafonné par la loi Pacte pour
                    un ordre passé en ligne ; barème à vérifier.
                  </td>
                  <td>Un minimum par ordre qui pénalise les petits versements mensuels</td>
                </tr>
                <tr>
                  <td>Droits de garde</td>
                  <td>
                    Frais de tenue de compte, en pourcentage annuel de la valeur du plan ou en
                    forfait par ligne. Plafonnés eux aussi.
                  </td>
                  <td>Un pourcentage annuel qui grossit avec le capital, année après année</td>
                </tr>
                <tr>
                  <td>Accès aux ETF éligibles</td>
                  <td>
                    Catalogue d'ETF éligibles au PEA, frais courants de chacun (de l'ordre de{" "}
                    {pct(FRAIS_TYPES.etf.fraisCourants.min)} à {pct(FRAIS_TYPES.etf.fraisCourants.max)}{" "}
                    par an pour les plus grands, à vérifier dans le DIC)
                  </td>
                  <td>Une gamme dominée par des fonds maison nettement plus chargés</td>
                </tr>
                <tr>
                  <td>Transfert</td>
                  <td>
                    Frais de transfert sortant, plafonnés par la loi (de l'ordre de{" "}
                    {euros(ENVELOPPES_NOV2026.peaFraisTransfertMax.parLigne)} par ligne, dans la limite
                    de {euros(ENVELOPPES_NOV2026.peaFraisTransfertMax.total)}) ; délais de traitement
                  </td>
                  <td>Choisir sans vérifier que l'on pourra repartir à un coût raisonnable</td>
                </tr>
                <tr>
                  <td>Fiabilité</td>
                  <td>
                    Statut réglementé de l'acteur (établissement agréé en France ou en Europe),
                    ancienneté, qualité du service client, disponibilité de la plateforme
                  </td>
                  <td>Se fier à la seule notoriété ou à une offre promotionnelle</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Deux précisions. D'abord, un transfert conserve la date d'ouverture du plan, donc
            l'antériorité fiscale : le choix n'est pas irréversible. Ne clôturez jamais un PEA
            pour en rouvrir un ailleurs, vous perdriez l'ancienneté. Ensuite, un seul PEA par
            personne est autorisé (un PEA-PME peut s'y ajouter, dans la limite d'un plafond cumulé de{" "}
            {euros(ENVELOPPES_NOV2026.peaPmePlafondCumule)}) : c'est un choix à faire sérieusement,
            mais pas à faire peur.
          </p>

          <h2 id="exemple">Courtage et droits de garde : l'effet cumulé sur {PEA_LIGNE_NOV2026.dureeAnnees} ans</h2>
          <p>
            Les frais de plateforme paraissent minuscules ordre par ordre. Cumulés sur des
            versements réguliers, ils comptent. Hypothèses d'illustration, deux grilles fictives :
          </p>
          <ul>
            <li>
              versement de {euros(PEA_LIGNE_NOV2026.versementMensuel)} par mois pendant{" "}
              {PEA_LIGNE_NOV2026.dureeAnnees} ans, soit {euros(EX.versements)} versés, un ordre
              d'achat par mois ;
            </li>
            <li>
              rendement brut hypothétique de {pct(RENDEMENTS.ucActionsLongTerme.moyen)} par an
              ({RENDEMENTS.ucActionsLongTerme.periode} des grands indices actions mondiaux, avant
              frais — les performances passées ne préjugent pas des performances futures), ETF à{" "}
              {pct(EX.fraisEtf)} de frais courants dans les deux cas ;
            </li>
            <li>
              grille A, proche des plafonds légaux : {pct(grilleHaute.courtagePct)} de courtage par
              ordre et {pct(grilleHaute.droitsGardePct)} de droits de garde par an ;
            </li>
            <li>
              grille B, tarif réduit : {pct(grilleBasse.courtagePct)} de courtage par ordre et{" "}
              {pct(grilleBasse.droitsGardePct)} de droits de garde.
            </li>
          </ul>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Grille A</th>
                  <th>Grille B</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Courtage cumulé</td>
                  <td>{euros(EX.haute.courtage)}</td>
                  <td>{euros(EX.basse.courtage)}</td>
                </tr>
                <tr>
                  <td>Droits de garde cumulés (environ)</td>
                  <td>{euros(EX.haute.garde)}</td>
                  <td>{euros(EX.basse.garde)}</td>
                </tr>
                <tr>
                  <td>Capital estimé au terme (brut de prélèvements sociaux)</td>
                  <td>{euros(EX.haute.capital)}</td>
                  <td>{euros(EX.basse.capital)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            L'écart final avoisine {euros(EX.ecart)} pour le même effort d'épargne, le même indice
            et la même enveloppe. On remarque que le poste le plus lourd n'est pas le courtage mais
            les droits de garde, parce qu'ils s'appliquent chaque année à un capital qui grossit.
            Ce calcul est une illustration et non une prévision : un PEA est investi en actions, le
            capital n'est pas garanti et peut être inférieur aux sommes versées. Pour tester vos
            propres montants, utilisez le simulateur de notre{" "}
            <a href="/guide/pea-banque-ou-courtier">comparatif des frais</a>.
          </p>

          <h2 id="ouverture">Ouvrir un PEA en ligne : les étapes</h2>
          <ol>
            <li>
              <strong>Vérifiez que vous n'en détenez pas déjà un.</strong> Un seul PEA par
              personne ; il faut être majeur ({ENVELOPPES_NOV2026.peaAgeMinimumOuverture} ans) et
              fiscalement domicilié en France.
            </li>
            <li>
              <strong>Comparez sur les cinq critères ci-dessus</strong>, grille tarifaire et
              catalogue d'ETF en main, plutôt que sur une offre de bienvenue.
            </li>
            <li>
              <strong>Constituez le dossier :</strong> formulaire d'ouverture, pièce d'identité,
              justificatif de domicile, informations fiscales, et en général un questionnaire sur
              vos connaissances financières, exigé par la réglementation.
            </li>
            <li>
              <strong>Signez électroniquement</strong> et attendez la validation : de quelques jours
              à quelques semaines selon l'acteur.
            </li>
            <li>
              <strong>Effectuez un premier versement</strong>, même modeste : l'ouverture « prend
              date » et fait courir le délai de {FISCALITE.peaExonerationIRApres} ans, un avantage
              précieux si vous n'envisagez d'utiliser le plan que bien plus tard.
            </li>
            <li>
              <strong>Mettez en place un versement programmé</strong> si vous le souhaitez, et
              choisissez vos supports en lisant le DIC (document d'informations clés) de chacun.
            </li>
          </ol>
          <div className="note">
            Un PEA ouvert chez un acteur en ligne se gère seul : pas de rendez-vous, mais pas de
            filet non plus. Avant de verser quoi que ce soit, assurez-vous de comprendre ce que
            vous achetez, et de pouvoir supporter une baisse temporaire de la valeur du plan.
          </div>

          <h2 id="retraite">La place du PEA dans la préparation de la retraite</h2>
          <p>
            Le PEA ne remplace ni les pensions de base et complémentaires, ni un PER, ni une
            assurance-vie : il s'y ajoute. Son intérêt pour la retraite tient à quatre
            caractéristiques.
          </p>
          <ul>
            <li>
              <strong>Le plafond :</strong> {euros(ENVELOPPES_NOV2026.peaPlafondVersements)} de
              versements par personne. Il porte sur les sommes versées, pas sur la valeur du plan,
              et ne se reconstitue pas après un retrait.
            </li>
            <li>
              <strong>Le délai de {FISCALITE.peaExonerationIRApres} ans :</strong> avant cette
              échéance, un retrait entraîne en principe la clôture du plan, sauf cas légaux. Au-delà,
              les retraits sont possibles sans clôture, et l'impôt sur le revenu ne frappe pas les
              gains.
            </li>
            <li>
              <strong>La fiscalité à la sortie :</strong> gains exonérés d'impôt sur le revenu après{" "}
              {FISCALITE.peaExonerationIRApres} ans, mais prélèvements sociaux de{" "}
              {pct(FISCALITE.prelevementsSociaux.pea)} sur la part de gains, au barème en vigueur
              en {maj}, qui peut évoluer.
            </li>
            <li>
              <strong>L'absence de déduction à l'entrée :</strong> contrairement au PER, un
              versement sur un PEA ne réduit pas votre impôt de l'année. L'avantage est donc
              concentré à la sortie, ce qui en fait un outil de patience.
            </li>
          </ul>
          <p>
            Notre analyse : le PEA est surtout précieux pour la souplesse qu'il procure à la
            retraite. Les retraits ne sont pas imposés comme un revenu et ne gonflent donc pas
            mécaniquement la tranche d'imposition sur les gains, ce qui donne une marge de manœuvre
            quand on combine plusieurs sources de revenus. En contrepartie, il est exposé aux
            actions du premier au dernier euro, sans compartiment sécurisé : un plan investi en
            actions peut perdre une part importante de sa valeur sur une période de marché
            difficile, au pire moment si l'on doit retirer. Les rendements de long terme des
            supports actions, de l'ordre de {pct(RENDEMENTS.ucActionsLongTerme.min)} à{" "}
            {pct(RENDEMENTS.ucActionsLongTerme.max)} par an en moyenne sur{" "}
            {RENDEMENTS.ucActionsLongTerme.periode}, sont un constat passé, avec de fortes
            variations annuelles et des années négatives. Rien ne garantit leur reproduction.
          </p>
          <p>
            Comment faire vivre cette enveloppe en pratique ? Plus l'échéance de départ approche,
            plus la question de la sécurisation se pose : réduire progressivement l'exposition
            actions, ou arbitrer ce qu'on retire en premier, relève d'une stratégie d'ensemble, pas
            d'une règle unique. Pour le contenu du plan (ETF ou fonds gérés activement), voyez notre
            guide <a href="/guide/etf-ou-fonds-actifs">ETF ou fonds actifs</a>, et pour le rôle de
            l'enveloppe dans une logique retraite la page{" "}
            <a href="/strategies/pea-retraite">PEA et retraite</a>. Les limites de l'enveloppe
            (plafond, clôture au décès, univers restreint) sont détaillées dans{" "}
            <a href="/guide/inconvenients-du-pea">les inconvénients du PEA</a>.
          </p>

          <h2 id="sortie">Sortir du PEA : capital ou rente</h2>
          <p>
            Après {FISCALITE.peaExonerationIRApres} ans, deux modes de sortie existent. Le retrait,
            partiel ou total, vous verse du capital : les gains sont exonérés d'impôt sur le
            revenu, les prélèvements sociaux étant dus sur leur part. Vous gardez la main sur le
            rythme, le montant et le moment, ce qui est utile pour piloter un budget de retraite.
          </p>
          <p>
            La seconde voie est la conversion en <strong>rente viagère</strong>, possible après{" "}
            {FISCALITE.peaExonerationIRApres} ans : le plan est clôturé et son capital sert à
            financer une rente versée à vie. Cette rente est exonérée d'impôt sur le revenu, sans
            être pour autant totalement exempte de prélèvements sociaux. Elle assure un revenu
            garanti tant que vous vivez, au prix de la disponibilité du capital, de sa
            transmissibilité, et d'un taux de conversion qui dépend de l'âge et des tables de
            mortalité de l'assureur. C'est en pratique une option peu utilisée : la rente
            fige une décision irréversible. Pour la comparer avec des retraits programmés, voyez
            notre <a href="/strategies/decumulation">page décumulation</a>.
          </p>
          <div className="note">
            Le PEA ne se transmet pas : au décès, le plan est clôturé et les titres rejoignent
            la succession. Si la transmission compte pour vous, ce point oriente l'ordre dans
            lequel vous utilisez vos enveloppes.
          </div>

          <h2 id="comparaison">PEA, PER, assurance-vie : où se situer</h2>
          <p>
            Le PEA n'est qu'une des enveloppes de la préparation. Pour y voir clair, partez de la
            question à laquelle chaque enveloppe répond :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Enveloppe</th>
                  <th>Avantage principal</th>
                  <th>Pour aller plus loin</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PEA</td>
                  <td>Gains non imposés à l'IR après {FISCALITE.peaExonerationIRApres} ans, disponibilité du capital</td>
                  <td><a href="/guide/inconvenients-du-pea">Les inconvénients du PEA</a></td>
                </tr>
                <tr>
                  <td>PER</td>
                  <td>Déduction à l'entrée (sous conditions), capital bloqué jusqu'à la retraite</td>
                  <td><a href="/guide/pea-ou-per-pour-la-retraite">PEA ou PER</a></td>
                </tr>
                <tr>
                  <td>Assurance-vie</td>
                  <td>Souplesse des supports (dont fonds en euros), transmission</td>
                  <td><a href="/guide/pea-ou-assurance-vie">PEA ou assurance-vie</a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Ces trois enveloppes ne s'excluent pas : leur ordre d'ouverture et d'alimentation
            dépend de votre tranche d'imposition, de votre horizon et de votre tolérance au risque.
            Nous ne pouvons pas répondre pour vous dans un article général, mais notre{" "}
            <a href="/bilan-retraite">bilan retraite gratuit</a> sert précisément à poser ce
            cadre.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on ouvrir un PEA en ligne entièrement à distance ?</h3>
          <p>
            Oui, la plupart des acteurs en ligne proposent une ouverture complète avec signature
            électronique et envoi de justificatifs numériques. Le délai de validation varie de
            quelques jours à quelques semaines.
          </p>
          <h3>Quel est le meilleur PEA en ligne ?</h3>
          <p>
            Il n'existe pas de réponse universelle : cela dépend de votre profil, du montant de vos
            versements, de votre appétence pour la gestion autonome et du catalogue dont vous avez
            besoin. Comparez sur les cinq critères de cet article, en lisant la grille tarifaire
            complète.
          </p>
          <h3>Faut-il privilégier une banque en ligne ou un courtier ?</h3>
          <p>
            La banque en ligne offre la simplicité d'un compte unique ; le courtier, souvent des
            frais plus bas et un catalogue plus large, mais sans accompagnement. Le détail est dans
            notre <a href="/guide/pea-banque-ou-courtier">comparatif banque ou courtier</a>.
          </p>
          <h3>Puis-je changer de PEA en ligne plus tard ?</h3>
          <p>
            Oui, par un transfert qui conserve la date d'ouverture, donc l'antériorité fiscale.
            Seuls des frais de transfert, plafonnés par la loi, s'appliquent. Ne clôturez pas votre
            plan pour en rouvrir un ailleurs.
          </p>
          <h3>Un PEA en ligne est-il sûr ?</h3>
          <p>
            La sûreté de l'établissement et celle de vos placements sont deux sujets distincts.
            Vérifiez que l'acteur est un établissement réglementé ; en revanche, la valeur d'un PEA
            investi en actions fluctue à la hausse comme à la baisse et le capital n'est pas
            garanti.
          </p>
          <h3>Que se passe-t-il si je retire de l'argent avant 5 ans ?</h3>
          <p>
            Sauf exception légale, un retrait avant le cinquième anniversaire clôture le plan et
            fait perdre l'avantage fiscal lié à son ancienneté.
          </p>
          <h3>Le PEA permet-il de déduire mes versements de mes impôts ?</h3>
          <p>
            Non. Contrairement au PER, un versement sur un PEA n'est pas déductible du revenu
            imposable. L'avantage fiscal intervient à la sortie, sur les gains.
          </p>
          <h3>Peut-on recevoir une rente depuis un PEA ?</h3>
          <p>
            Oui, après {FISCALITE.peaExonerationIRApres} ans, par conversion du capital en rente
            viagère, exonérée d'impôt sur le revenu. C'est un choix irréversible, qui fait perdre
            la disponibilité du capital : il demande réflexion.
          </p>

          <h2 id="synthese">Ce qu'il faut retenir</h2>
          <p>
            Un PEA en ligne est un bon moyen d'accéder à une enveloppe efficace pour préparer la
            retraite, à condition de le choisir pour ce qu'il coûte réellement et pour ce qu'il
            permet d'y loger, pas pour une offre de bienvenue. Les frais de plateforme, surtout les
            droits de garde, pèsent davantage dans la durée qu'on ne le croit. L'enveloppe est
            fiscalement avantageuse à la sortie, mais elle n'offre ni déduction à l'entrée, ni
            garantie du capital, ni transmission : elle s'inscrit dans un ensemble avec le PER et
            l'assurance-vie.
          </p>

          <h2 id="sources">Sources</h2>
          <p>Sources consultées en novembre 2026 :</p>
          <ul>
            {SOURCES.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            Cette analyse est générale et ne constitue pas un conseil en investissement
            personnalisé. Un PEA est investi en actions : le capital n'est pas garanti et sa
            valeur fluctue à la hausse comme à la baisse. Les règles et taux cités sont ceux en
            vigueur en {maj} et peuvent évoluer ; les exemples chiffrés sont des illustrations
            pédagogiques ; les performances passées ne préjugent pas des performances futures.
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Quelle place pour le PEA dans votre stratégie retraite ? Faites le point lors d'un bilan gratuit."
        button="Prendre rendez-vous"
      />
    </>
  );
}
