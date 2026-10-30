import { Link } from "react-router-dom";
import { REGIME_GENERAL } from "../../components/hypotheses.js";

export const meta = {
  slug: "pensions-2027-revalorisation-projet-plfss",
  type: "actualite",
  big5: "actu",
  categorie: "actu",
  title: "Pensions 2027 : ce que prévoit le PLFSS pour la revalorisation",
  description:
    "Le PLFSS 2027 propose une revalorisation modulée des pensions de base. Ce que dit le projet, pour qui, et ce qui n'est pas voté à ce jour.",
  h1: "Revalorisation des pensions en 2027 : que prévoit le projet de loi de financement de la Sécurité sociale ?",
  resume:
    "Le projet de loi de financement de la Sécurité sociale pour 2027, déposé le 1er octobre 2026 et non adopté à la date de rédaction, propose de moduler la revalorisation des pensions de base selon leur montant total, avec un coefficient qui ne pourrait pas être inférieur à 1.",
  datePublication: "2026-10-01",
  dateMiseAJour: "2026-10-20",
  faq: [
    {
      q: "Ce texte est-il définitif ?",
      a: "Non. Il s'agit d'un projet de loi déposé à l'Assemblée nationale le 1er octobre 2026 : il peut être modifié, amendé ou supprimé au cours de la navette parlementaire. Seule la loi promulguée et publiée au Journal officiel fait foi.",
    },
    {
      q: "Le montant de la pension pourrait-il baisser en 2027 ?",
      a: "Selon l'exposé des motifs, les décrets successifs ne pourraient qu'ajuster les coefficients à la hausse, de sorte qu'aucune pension ne pourrait voir son montant baisser du fait de ces décrets. Le coefficient ne peut pas être inférieur à 1. En revanche, un coefficient de 1 signifie une pension stable en euros courants, donc une érosion face à l'inflation.",
    },
    {
      q: "Quel sera le taux de revalorisation au 1er janvier 2027 ?",
      a: "Le projet de loi ne chiffre pas ce taux. Il renvoie au coefficient légal prévu par l'article L. 161-23-1 du code de la sécurité sociale pour les pensions inférieures ou égales à 1 260 euros, et à un décret pour les pensions supérieures.",
    },
    {
      q: "Cela concerne-t-il la retraite complémentaire Agirc-Arrco ?",
      a: "L'article 35 vise les pensions servies par les régimes obligatoires de base. Le montant total pris en compte pour les seuils inclut, selon l'exposé des motifs, la base et la complémentaire. La revalorisation de l'Agirc-Arrco est décidée séparément par ses partenaires sociaux : +1,4 % au 1er novembre 2026.",
    },
  ],
  sources: [
    {
      label: "Assemblée nationale : projet de loi de financement de la sécurité sociale pour 2027 (n° 3211), article 35 et exposé des motifs",
      url: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3211_projet-loi",
    },
    {
      label: "Agirc-Arrco : revalorisation de +1,4 % au 1er novembre 2026 (annonce du 14 octobre 2026)",
      url: "https://www.agirc-arrco.fr/nous-connaitre/nos-actualites/retraites-complementaires-agirc-arrco-une-revalorisation-de-14-au-1er-novembre-2026/",
    },
    {
      label: "COR : rapport annuel de juin 2026",
      url: "https://www.cor-retraites.fr/rapports-du-cor/rapport-annuel-cor-juin-2026-evolutions-perspectives-retraites-france",
    },
  ],
  liens: [
    "/simulateur-retraite",
    "/guide/verifier-releve-de-carriere-retraite",
    "/guide/combien-faut-il-epargner-pour-la-retraite",
    "/actualites/agirc-arrco-revalorisation-1er-novembre-2026",
    "/bilan-retraite",
  ],
};

export default function ActuPensions2027Plfss() {
  return (
    <>
      <p>
        <em>Situation au 20 octobre 2026. Les dispositions décrites ci-dessous figurent dans un
        projet de loi : elles ne sont pas adoptées à la date de rédaction.</em>
      </p>

      <h2>1. Ce qui change (dans le projet)</h2>
      <p>
        Le projet de loi de financement de la sécurité sociale (PLFSS) pour 2027 a été enregistré à
        l'Assemblée nationale le 1er octobre 2026 (projet n° 3211). Son article 35 propose, « à
        titre exceptionnel, pour l'année 2027 », de déroger à la règle actuelle : aujourd'hui, la loi
        prévoit une revalorisation automatique des pensions de base au 1er janvier en fonction de
        l'inflation constatée sur douze mois (article L. 161-23-1 du code de la sécurité sociale).
      </p>
      <p>Le mécanisme proposé dépend du montant mensuel total des pensions au 31 décembre 2026 :</p>
      <ul>
        <li>
          jusqu'à 1 260 euros : revalorisation à hauteur du coefficient légal (l'inflation) ;
        </li>
        <li>
          de 1 260 à 1 281 euros : coefficient réduit, fixé par décret, sans pouvoir être inférieur à 1 ;
        </li>
        <li>
          au-delà de 1 281 euros : coefficients fixés par décret, sans pouvoir être inférieurs à 1 ni
          supérieurs au coefficient légal ; un second seuil à 2 034 euros permettrait une
          progressivité supplémentaire ;
        </li>
        <li>
          tant qu'aucun décret n'est publié (et au plus tard jusqu'au 31 octobre 2027), le
          coefficient applicable aux pensions concernées serait fixé à 1, c'est-à-dire sans
          hausse, à l'exception de la tranche de 1 260 à 1 281 euros traitée à part dans le texte.
        </li>
      </ul>
      <p>
        Le projet précise qu'un décret pourrait être pris plusieurs fois en 2027, avec un effet
        possible au 1er janvier 2027, et uniquement à la hausse d'un décret à l'autre.
      </p>

      <h2>2. Pour qui</h2>
      <p>
        Le texte vise les pensions de vieillesse servies par les régimes obligatoires de base, avec
        leurs majorations, accessoires et suppléments, déjà en paiement : le critère est le montant
        mensuel total au 31 décembre 2026. Selon l'exposé des motifs, ce montant total s'entend base
        et complémentaire cumulées.
      </p>
      <p>
        Si vous avez entre 45 et 60 ans, vous n'êtes pas directement visé en 2027 tant que vous n'êtes
        pas retraité. La règle d'indexation reste toutefois un paramètre central du niveau de vie à la
        retraite : le COR relève dans son rapport de juin 2026 que le recul de la pension moyenne par
        rapport aux revenus d'activité tient notamment à l'indexation sur les seuls prix des droits
        acquis au régime général et des pensions liquidées.
      </p>

      <h2>3. Chiffres sourcés et datés</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Donnée</th>
              <th>Valeur</th>
              <th>Source et date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Seuils de pension mensuelle totale du projet</td>
              <td>1 260 €, puis 1 281 € et 2 034 €</td>
              <td>PLFSS 2027, art. 35, enregistré le 1er octobre 2026</td>
            </tr>
            <tr>
              <td>Effet financier attendu en 2027 (si les pensions au-dessus du seuil étaient maintenues à leur montant de 2026)</td>
              <td>4,0 Md€, dont 3,0 Md€ de contribution au redressement de la branche vieillesse</td>
              <td>Exposé des motifs de l'art. 35, 1er octobre 2026</td>
            </tr>
            <tr>
              <td>Revalorisation des pensions au 1er janvier 2026</td>
              <td>0,9 %</td>
              <td>PLFSS 2027, présentation de l'équilibre 2026</td>
            </tr>
            <tr>
              <td>Déficit de la branche vieillesse</td>
              <td>-4,5 Md€ en 2024 ; -6,8 Md€ estimé pour 2025</td>
              <td>Exposé des motifs de l'art. 35, 1er octobre 2026</td>
            </tr>
            <tr>
              <td>Dépenses de retraite en part du PIB, 2025</td>
              <td>14,1 %</td>
              <td>COR, rapport annuel du 11 juin 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Le même projet de loi contient d'autres mesures retraite, par exemple la transformation de la
        majoration de pension pour enfants en montant forfaitaire pour les pensions liquidées à
        compter du 1er juillet 2027 (article 34, également non adopté à ce jour).
      </p>

      <h2>4. Ce que cela ne change pas</h2>
      <ul>
        <li>
          <strong>Rien n'est voté.</strong> Le texte peut être modifié ou supprimé ; seul le texte
          promulgué s'appliquera.
        </li>
        <li>
          <strong>Les règles d'acquisition de vos droits</strong> (trimestres, points, durée requise)
          ne sont pas modifiées par cet article. Voir <Link to="/guide/surcote-decote-retraite">surcote et
          décote</Link> : la décote reste de {REGIME_GENERAL.decoteParTrimestre.toLocaleString("fr-FR")} %
          par trimestre manquant dans le régime général, selon les paramètres légaux actuels.
        </li>
        <li>
          <strong>La revalorisation déjà appliquée en 2026</strong> (0,9 % au 1er janvier 2026) n'est
          pas remise en cause par le projet.
        </li>
        <li>
          <strong>L'Agirc-Arrco décide séparément</strong> : voir{" "}
          <Link to="/actualites/agirc-arrco-revalorisation-1er-novembre-2026">la revalorisation de
          +1,4 % au 1er novembre 2026</Link>.
        </li>
      </ul>

      <h2>5. Pour aller plus loin</h2>
      <ul>
        <li>
          <Link to="/simulateur-retraite">Le simulateur retraite</Link> : estimez le revenu
          complémentaire dont vous pourriez avoir besoin, avec des hypothèses visibles.
        </li>
        <li>
          <Link to="/guide/verifier-releve-de-carriere-retraite">Vérifier votre relevé de carrière</Link> :
          le préalable à toute estimation de pension.
        </li>
        <li>
          <Link to="/guide/combien-faut-il-epargner-pour-la-retraite">Combien faut-il épargner pour la retraite ?</Link>
        </li>
      </ul>

      <h2>En résumé</h2>
      <p>
        Le projet de loi de financement de la Sécurité sociale pour 2027 propose une revalorisation
        des pensions modulée selon leur montant, avec un plancher de 1 pour le coefficient. Ce n'est
        pas encore une règle : il s'agit d'un texte en discussion. Dans l'intervalle, un petit pas
        utile consiste à ouvrir <Link to="/simulateur-retraite">le simulateur retraite</Link> pour
        situer l'ordre de grandeur de votre besoin de revenu complémentaire ; si vous
        souhaitez ensuite un regard extérieur sur l'ensemble de votre situation, vous pouvez demander
        un <Link to="/bilan-retraite">bilan retraite gratuit de 15 minutes</Link>. Cette page est
        informative et ne constitue pas un conseil personnalisé.
      </p>
    </>
  );
}
