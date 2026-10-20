import { Link } from "react-router-dom";
import {
  FISCALITE,
  FRAIS_TYPES,
  HYPOTHESES_MAJ,
  ILLUSTRATIF,
  SIMU_DEFAUTS,
  euros,
  pct,
} from "../../components/hypotheses.js";

export const meta = {
  slug: "combien-coute-un-pea",
  type: "guide",
  big5: "prix",
  categorie: "pea",
  title: "Combien coûte un PEA ? Frais réels et exemple chiffré",
  description:
    "Frais d'un PEA : tenue de compte, ordres, supports, transfert. Exemple chiffré sur 15 ans, hypothèses explicites, questions à poser avant d'ouvrir.",
  h1: "Combien coûte un PEA ?",
  resume:
    "Le coût d'un PEA se décompose en trois lignes : la tenue de compte de l'établissement, les frais d'ordres de bourse et les frais courants des supports choisis ; ce dernier poste est le plus lourd sur la durée, car il est prélevé chaque année sur tout l'encours.",
  datePublication: "2026-10-20",
  dateMiseAJour: "2026-10-20",
  faq: [
    {
      q: "Un PEA est-il gratuit à l'ouverture ?",
      a: "Cela dépend de l'établissement : certains n'appliquent aucun frais d'ouverture, d'autres facturent la tenue de compte ou un forfait annuel. La brochure tarifaire de chaque établissement fait foi ; la fiche officielle de service-public ne donne aucun montant de frais.",
    },
    {
      q: "Quel est le prix d'un ordre de bourse sur un PEA ?",
      a: "Chaque achat ou vente de titres génère des frais de courtage fixés par l'établissement : proportionnels, forfaitaires ou dégressifs selon le volume. Comparez les grilles sur votre profil d'ordres réel (petits versements réguliers ou gros ordres espacés), car l'écart peut être important.",
    },
    {
      q: "Peut-on perdre le PEA si l'on retire de l'argent trop tôt ?",
      a: "Avant cinq ans, un retrait entraîne en principe la clôture du plan, sauf cas prévus (licenciement, invalidité, création d'entreprise notamment). Après cinq ans, les retraits partiels sont possibles sans clôture, selon service-public.",
    },
    {
      q: "Les ETF sont-ils moins chers que les fonds classiques dans un PEA ?",
      a: `Les frais courants usuels se situent autour de ${pct(FRAIS_TYPES.etf.fraisCourants.min)} à ${pct(FRAIS_TYPES.etf.fraisCourants.max)} par an pour un ETF actions de grande taille, contre ${pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.min)} à ${pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.max)} pour un fonds actif classique (ordres de grandeur, à vérifier fonds par fonds). Un frais plus bas ne dit rien de la performance future.`,
    },
    {
      q: "Y a-t-il des frais pour changer d'établissement ?",
      a: "Le transfert d'un PEA vers un autre établissement peut donner lieu à des frais côté établissement de départ. Ils figurent dans sa brochure tarifaire : demandez-les avant de choisir, puisqu'ils conditionnent votre liberté de changer plus tard.",
    },
  ],
  sources: [
    {
      label: "Service-public.gouv.fr : Plan d'épargne en actions (PEA), fiche vérifiée le 22 mai 2026",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2385",
    },
    {
      label: "Info Retraite : service public d'information sur la retraite",
      url: "https://www.info-retraite.fr/portail-services/",
    },
  ],
  liens: [
    "/guide/pea-banque-ou-courtier",
    "/guide/pea-ou-assurance-vie",
    "/guide/inconvenients-du-pea",
    "/strategies/pea-retraite",
    "/simulateur-retraite",
  ],
};

// Frais prélevés par les supports seuls (hors courtage), versement mensuel constant,
// sans effet de rendement : sert uniquement à comparer deux niveaux de frais.
function fraisCumules(taux) {
  const versementAnnuel = SIMU_DEFAUTS.versementMensuel * 12;
  let encours = 0;
  let cumul = 0;
  for (let a = 0; a < SIMU_DEFAUTS.dureeAnnees; a += 1) {
    encours += versementAnnuel;
    const f = encours * (taux / 100);
    cumul += f;
    encours -= f;
  }
  return cumul;
}
const cumulEtf = fraisCumules(ILLUSTRATIF.fraisSupportEtf);
const cumulMaison = fraisCumules(ILLUSTRATIF.fraisSupportMaison);

export default function CombienCouteUnPea() {
  return (
    <>
      <p>
        Pour savoir si un PEA est cher, il faut séparer trois couches de coûts qui n'ont ni le
        même bénéficiaire ni le même rythme : l'établissement qui tient le compte, la bourse qui
        exécute vos ordres, et les supports que vous achetez. Notre analyse : c'est la troisième
        qui pèse le plus sur quinze ou vingt ans.
      </p>

      <h2>Quels frais l'établissement facture-t-il pour tenir un PEA ?</h2>
      <p>
        <strong>
          Ils varient d'un établissement à l'autre et se lisent dans sa brochure tarifaire : la
          fiche officielle ne fixe aucun montant.
        </strong>
      </p>
      <p>
        Selon service-public, les frais de gestion sont habituellement débités du compte espèces
        associé au plan. Les postes à repérer : droits de garde ou frais de tenue de compte,
        éventuels frais d'inactivité, frais de transfert ou de clôture. Un PEA est plafonné à{" "}
        {euros(150000)} de versements (gains exclus) et un PEA-PME-ETI à {euros(225000)}, les deux
        plans réunis ne pouvant dépasser {euros(225000)} (service-public, fiche vérifiée le 22 mai
        2026). La comparaison entre réseaux traditionnels et courtiers en ligne est détaillée dans{" "}
        <Link to="/guide/pea-banque-ou-courtier">notre guide PEA en banque ou chez un courtier</Link>.
      </p>

      <h2>Combien coûtent les ordres de bourse ?</h2>
      <p>
        <strong>
          Chaque achat et chaque vente génèrent des frais de courtage, dont le poids dépend de la
          taille et de la fréquence de vos ordres.
        </strong>
      </p>
      <p>
        Les grilles sont proportionnelles, forfaitaires ou dégressives. Un épargnant qui verse{" "}
        {euros(SIMU_DEFAUTS.versementMensuel)} chaque mois n'est pas dans la même situation qu'un
        épargnant qui place {euros(10000)} deux fois par an : un minimum de perception par ordre
        pénalise les petits versements, alors qu'un pourcentage pèse davantage sur les gros ordres.
        Calculez le coût sur votre rythme réel plutôt que de vous fier à une mention « courtage
        réduit ».
      </p>

      <h2>Quels frais courants les supports ajoutent-ils ?</h2>
      <p>
        <strong>
          Les frais courants des fonds et ETF sont prélevés chaque année sur la totalité de
          l'encours : c'est le poste qui s'accumule le plus.
        </strong>
      </p>
      <table>
        <thead>
          <tr>
            <th>Type de support</th>
            <th>Frais courants indicatifs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ETF actions de grande taille</td>
            <td>
              {pct(FRAIS_TYPES.etf.fraisCourants.min)} à {pct(FRAIS_TYPES.etf.fraisCourants.max)} par an
            </td>
          </tr>
          <tr>
            <td>Fonds actions de gestion active</td>
            <td>
              {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.min)} à{" "}
              {pct(FRAIS_TYPES.fondsActionsClassiques.fraisCourants.max)} par an
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Ordres de grandeur révisés en {HYPOTHESES_MAJ}, à vérifier fonds par fonds dans le document
        d'informations clés. Un frais faible n'est ni une garantie de performance, ni un gage de
        qualité du support.
      </p>

      <h2>Que représentent ces frais sur quinze ans, sur un exemple ?</h2>
      <p>
        <strong>
          Sur les hypothèses ci-dessous, l'écart de frais courants représente environ{" "}
          {euros(cumulMaison - cumulEtf)} prélevés en plus sur {SIMU_DEFAUTS.dureeAnnees} ans.
        </strong>
      </p>
      <p>
        Hypothèses : versement de {euros(SIMU_DEFAUTS.versementMensuel)} par mois pendant{" "}
        {SIMU_DEFAUTS.dureeAnnees} ans, frais prélevés chaque année sur l'encours, rendement des
        marchés volontairement ignoré (il s'ajouterait ou se retrancherait au calcul), courtage
        exclu. Illustration pédagogique, pas une projection.
      </p>
      <table>
        <thead>
          <tr>
            <th>Support type</th>
            <th>Frais annuels supposés</th>
            <th>Frais cumulés sur {SIMU_DEFAUTS.dureeAnnees} ans</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ETF</td>
            <td>{pct(ILLUSTRATIF.fraisSupportEtf)}</td>
            <td>{euros(cumulEtf)}</td>
          </tr>
          <tr>
            <td>Fonds actif « maison »</td>
            <td>{pct(ILLUSTRATIF.fraisSupportMaison)}</td>
            <td>{euros(cumulMaison)}</td>
          </tr>
        </tbody>
      </table>

      <h2>Le PEA coûte-t-il quelque chose à la sortie ?</h2>
      <p>
        <strong>
          Après cinq ans, les gains sont exonérés d'impôt sur le revenu mais restent soumis aux
          prélèvements sociaux ; avant cinq ans, un retrait clôture en principe le plan.
        </strong>
      </p>
      <p>
        Selon service-public, après cinq ans les retraits partiels n'entraînent pas la clôture et
        les versements restent possibles. Les prélèvements sociaux sont de{" "}
        {pct(FISCALITE.prelevementsSociaux.pea)} dans nos hypothèses {HYPOTHESES_MAJ} ; la fiche
        officielle précise que l'administration fiscale doit encore détailler les règles applicables
        aux revenus de 2025 et 2026, à vérifier donc avant toute décision. Pour comparer avec une
        autre enveloppe, voyez <Link to="/guide/pea-ou-assurance-vie">PEA ou assurance-vie</Link>, et
        pour les limites du dispositif <Link to="/guide/inconvenients-du-pea">les inconvénients du PEA</Link>.
      </p>

      <h2>Quelles questions poser avant d'ouvrir ?</h2>
      <p>
        <strong>
          Cinq questions suffisent : frais de tenue, grille de courtage sur votre profil, frais de
          transfert, supports accessibles, conditions d'inactivité.
        </strong>
      </p>
      <ul>
        <li>Quels frais annuels de tenue de compte, et sous quelles conditions sont-ils supprimés ?</li>
        <li>Quel coût pour un ordre de {euros(SIMU_DEFAUTS.versementMensuel)} ?</li>
        <li>Quels frais en cas de transfert du plan plus tard ?</li>
        <li>Quels ETF et fonds sont accessibles, avec quels frais courants ?</li>
        <li>Existe-t-il des frais d'inactivité ou un minimum de versement ?</li>
      </ul>

      <h2>En résumé</h2>
      <p>
        Le PEA se juge sur trois lignes de frais, pas une seule : tenue du compte, ordres, supports.
        Le doute est légitime sur la ligne qui compte vraiment ; l'exemple ci-dessus montre que ce
        n'est pas forcément la plus visible. Notre rédaction publie ces repères avec leurs
        hypothèses pour que vous puissiez refaire le calcul. Pour situer le PEA dans une stratégie
        de retraite (<Link to="/strategies/pea-retraite">notre page dédiée</Link>), utilisez d'abord
        le <Link to="/simulateur-retraite">simulateur retraite</Link> ; si votre situation reste
        floue, le <Link to="/bilan-retraite">bilan retraite</Link> permet d'en parler.
      </p>
    </>
  );
}
