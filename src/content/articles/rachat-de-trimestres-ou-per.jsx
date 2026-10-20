import { Link } from "react-router-dom";
import {
  DECUMULATION,
  REGIME_GENERAL,
  SIMU_DEFAUTS,
  euros,
} from "../../components/hypotheses.js";

export const meta = {
  slug: "rachat-de-trimestres-ou-per",
  type: "guide",
  big5: "versus",
  categorie: "mecanique-retraite",
  title: "Rachat de trimestres ou PER : lequel choisir ?",
  description:
    "Rachat de trimestres ou PER : ce que chacun apporte, un exemple chiffré avec hypothèses, les cas où l'un ou l'autre est préférable, et notre biais déclaré.",
  h1: "Rachat de trimestres ou PER : lequel choisir ?",
  resume:
    "Le rachat de trimestres finance un morceau de pension de base (parfois un départ sans décote), le PER constitue un capital personnel et libre de ses usages à la retraite : ils ne répondent pas à la même question, et le rachat l'emporte quand il comble une décote importante à un prix inférieur au gain attendu.",
  datePublication: "2026-10-20",
  dateMiseAJour: "2026-10-20",
  faq: [
    {
      q: "Le rachat de trimestres permet-il de partir plus tôt ?",
      a: "Pas toujours. Selon service-public, les trimestres rachetés ne comptent pas pour vérifier les conditions d'une retraite anticipée (carrière longue notamment). Ils peuvent en revanche réduire ou supprimer la décote.",
    },
    {
      q: "Combien de trimestres peut-on racheter ?",
      a: `Au total ${REGIME_GENERAL.rachatTrimestresPlafond} trimestres au maximum pour les années d'études, les années à trous et certaines autres périodes dans le régime général des salariés ; les stages obligatoires sont limités à 2 trimestres (service-public, fiche vérifiée le 1er janvier 2026).`,
    },
    {
      q: "Les sommes versées sont-elles déductibles des impôts ?",
      a: "Selon service-public, les cotisations versées pour les études, les années à trous et les stages sont déductibles du revenu imposable. Les versements volontaires sur un PER sont déductibles par défaut, dans la limite d'un plafond personnel, avec une imposition à la sortie.",
    },
    {
      q: "Peut-on faire les deux ?",
      a: "Oui, les deux démarches ne s'excluent pas : l'une agit sur la pension de base, l'autre sur l'épargne personnelle. La question est surtout celle de l'ordre dans lequel mobiliser son budget.",
    },
    {
      q: "Comment connaître le coût exact d'un rachat ?",
      a: "Il dépend de l'option choisie, de votre âge et de vos revenus récents. La caisse d'assurance retraite fournit un devis gratuit et un simulateur ; sa demande n'engage à rien.",
    },
  ],
  sources: [
    {
      label: "Service-public.gouv.fr : Retraite du salarié dans le secteur privé, rachat de trimestres (fiche vérifiée le 1er janvier 2026)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F15675",
    },
    {
      label: "Service-public.gouv.fr : Retraite du salarié, qu'est-ce que la décote ? (fiche vérifiée le 1er janvier 2026)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F19666",
    },
    {
      label: "Service-public.gouv.fr : Plan d'épargne retraite (PER), fiche vérifiée le 12 octobre 2026",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34982",
    },
  ],
  liens: [
    "/guide/combien-coute-rachat-trimestres-retraite",
    "/guide/surcote-decote-retraite",
    "/guide/faut-il-ouvrir-un-per",
    "/strategies/per",
    "/simulateur-retraite",
  ],
};

// Exemple illustratif construit sur le barème officiel de la décote (service-public F19666) :
// taux plein 50 %, 0,625 point par trimestre manquant. Aucun prix de rachat n'est supposé :
// le calcul donne le devis maximal à partir duquel l'opération cesse d'être intéressante.
const SAM = 30000;
const REQUIS = 170;
const VALIDES = 159;
const RACHETES = 4;
const tauxAvant = 50 - 0.625 * (REQUIS - VALIDES);
const tauxApres = 50 - 0.625 * (REQUIS - VALIDES - RACHETES);
const pensionAvant = SAM * (tauxAvant / 100) * (VALIDES / REQUIS);
const pensionTauxSeul = SAM * (tauxApres / 100) * (VALIDES / REQUIS);
const pensionTauxEtDuree = SAM * (tauxApres / 100) * ((VALIDES + RACHETES) / REQUIS);
const gainTauxSeul = pensionTauxSeul - pensionAvant;
const gainTauxEtDuree = pensionTauxEtDuree - pensionAvant;
const anneesFemmes = DECUMULATION.esperanceVie65.femmes;
const anneesHommes = DECUMULATION.esperanceVie65.hommes;
const tmi = SIMU_DEFAUTS.tmiActuelle;

export default function RachatOuPer() {
  return (
    <>
      <p>
        Biais déclaré : ce site traite l'épargne retraite et consacre une page entière au PER, ce
        qui peut nous rendre plus attentifs à cette solution qu'au rachat de trimestres, que nous ne
        vendons pas. Nous avons donc cherché à écrire chaque section comme si l'on devait défendre
        l'autre option. Cet article se limite au régime général de salariés.
      </p>

      <h2>Que fait le rachat de trimestres, exactement ?</h2>
      <p>
        <strong>
          Il fait compter des trimestres supplémentaires dans le calcul de la pension de base, soit
          pour le seul taux, soit pour le taux et la durée d'assurance.
        </strong>
      </p>
      <p>
        Selon service-public, on peut racheter des années d'études supérieures diplômantes, des
        années incomplètes (moins de quatre trimestres validés) et, dans une limite de 2 trimestres,
        des stages obligatoires, avec un maximum de {REGIME_GENERAL.rachatTrimestresPlafond}{" "}
        trimestres au total. Les trimestres rachetés ne comptent pas pour une retraite anticipée.
        Le coût dépend de l'option, de l'âge et des revenus récents : voir{" "}
        <Link to="/guide/combien-coute-rachat-trimestres-retraite">notre guide sur le coût du rachat</Link>.
      </p>

      <h2>Que fait le PER, exactement ?</h2>
      <p>
        <strong>
          Il constitue un capital personnel, bloqué jusqu'à la retraite sauf cas de déblocage
          anticipé, dont les versements sont en principe déductibles et la sortie imposable.
        </strong>
      </p>
      <p>
        Selon service-public (fiche vérifiée le 12 octobre 2026), les versements volontaires sont
        déductibles par défaut dans la limite d'un plafond personnel, et la sortie peut se faire en
        capital, en rente ou en combinaison. Le détail est dans{" "}
        <Link to="/strategies/per">notre page sur le PER</Link> et dans{" "}
        <Link to="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER</Link>.
      </p>

      <h2>Qu'obtient-on, chiffres à l'appui, avec un rachat ?</h2>
      <p>
        <strong>
          Sur l'exemple ci-dessous, quatre trimestres rachetés relèvent la pension brute d'environ{" "}
          {euros(gainTauxSeul)} à {euros(gainTauxEtDuree)} par an selon l'option.
        </strong>
      </p>
      <p>
        Hypothèses illustratives, sans lien avec un cas réel : salaire annuel moyen {euros(SAM)},{" "}
        {REQUIS} trimestres requis, {VALIDES} validés, départ avant 67 ans, rachat de {RACHETES}{" "}
        trimestres, formule officielle de la décote (0,625 point par trimestre manquant).
      </p>
      <table>
        <thead>
          <tr>
            <th>Situation</th>
            <th>Taux</th>
            <th>Pension brute annuelle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sans rachat</td>
            <td>{tauxAvant.toLocaleString("fr-FR")} %</td>
            <td>{euros(pensionAvant)}</td>
          </tr>
          <tr>
            <td>Rachat, option « taux seul »</td>
            <td>{tauxApres.toLocaleString("fr-FR")} %</td>
            <td>{euros(pensionTauxSeul)}</td>
          </tr>
          <tr>
            <td>Rachat, option « taux et durée »</td>
            <td>{tauxApres.toLocaleString("fr-FR")} %</td>
            <td>{euros(pensionTauxEtDuree)}</td>
          </tr>
        </tbody>
      </table>
      <p>
        Pour savoir si l'opération vaut son prix, multipliez le gain annuel par le nombre d'années
        de perception : l'espérance de vie à 65 ans est de l'ordre de {anneesHommes} ans pour les
        hommes et {anneesFemmes} ans pour les femmes (INSEE, ordre de grandeur révisé, à vérifier).
        Avec l'option « taux et durée », le gain cumulé brut représente environ{" "}
        {euros(gainTauxEtDuree * anneesHommes)} à {euros(gainTauxEtDuree * anneesFemmes)}, sans
        revalorisation ni fiscalité. Le devis de la caisse, diminué de l'économie d'impôt liée à la
        déductibilité (de l'ordre de {tmi} % pour une tranche marginale à {tmi} %), se compare à ce
        total. L'espérance de vie n'est qu'une moyenne : elle ne vaut pas pour une personne donnée.
      </p>

      <h2>Qu'obtient-on avec un PER, pour le même budget ?</h2>
      <p>
        <strong>
          Un capital dont le montant dépend des marchés et des frais, pas d'une formule : aucune
          somme n'est garantie, mais l'argent reste le vôtre.
        </strong>
      </p>
      <p>
        Un versement de même montant produit une réduction d'impôt immédiate de l'ordre de votre
        tranche marginale, qui est un report d'imposition (la sortie du capital sera imposée), puis
        un capital soumis aux fluctuations des supports et aux frais du contrat. Nous ne chiffrons
        pas de rendement : un chiffre de rendement serait une promesse que nous ne pouvons pas
        tenir. À la différence du rachat, ce capital peut être transmis en cas de décès et son usage
        à la retraite (capital, rente ou mix) reste ouvert.
      </p>

      <h2>Quand le rachat est-il préférable ?</h2>
      <p>
        <strong>
          Quand il comble une décote importante, qu'il évite une pension sous le niveau de vie
          visé, et que son devis reste inférieur au gain cumulé attendu.
        </strong>
      </p>
      <ul>
        <li>Les trimestres manquent peu et la décote est la cause principale d'une pension basse.</li>
        <li>Vous n'avez pas d'autre source d'épargne et cherchez un revenu à vie, même modeste.</li>
        <li>Le devis, net d'économie d'impôt, est inférieur au gain cumulé calculé ci-dessus.</li>
      </ul>

      <h2>Quand le PER est-il préférable ?</h2>
      <p>
        <strong>
          Quand l'horizon est long, que le rachat ne ferait pas gagner assez de trimestres, ou que
          vous souhaitez garder la main sur le capital et sa transmission.
        </strong>
      </p>
      <ul>
        <li>Le rachat ne ferait pas disparaître la décote ou ne permet pas le départ visé.</li>
        <li>Vous acceptez le blocage jusqu'à la retraite et un capital soumis à la fluctuation des marchés.</li>
        <li>Votre priorité est de disposer d'un capital flexible plutôt que d'un supplément de pension.</li>
      </ul>
      <p>
        Dans les deux cas, partez d'abord de votre{" "}
        <Link to="/guide/surcote-decote-retraite">décote réelle</Link>, qui oriente le choix.
      </p>

      <h2>En résumé</h2>
      <p>
        Le rachat achète une pension, le PER constitue un capital : l'un est une formule, l'autre un
        pari sur les marchés et les frais. Il est normal d'hésiter tant que le devis de la caisse
        n'est pas connu ; demandez-le, il est gratuit. Notre rédaction ne tranche pas à votre place,
        et publie ses hypothèses pour que vous puissiez refaire le calcul. Commencez par le{" "}
        <Link to="/simulateur-retraite">simulateur retraite</Link> pour situer l'écart à combler, puis
        parlons-en dans un <Link to="/bilan-retraite">bilan retraite</Link> si votre situation est
        particulière.
      </p>
    </>
  );
}
