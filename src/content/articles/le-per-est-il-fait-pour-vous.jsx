import { Link } from "react-router-dom";
import { FISCALITE, HYPOTHESES_MAJ, euros, pct } from "../../components/hypotheses.js";

export const meta = {
  slug: "le-per-est-il-fait-pour-vous",
  type: "guide",
  big5: "avis",
  categorie: "per",
  title: "Le PER est-il fait pour vous ? Qui devrait s'en passer",
  description:
    "Le PER n'est pas adapté à tout le monde : horizon court, besoin de liquidité, faible imposition, frais élevés. Les cas où s'en passer, et ceux où l'étudier.",
  h1: "Le PER est-il fait pour vous ? Qui devrait s'en passer",
  resume:
    "Le PER convient surtout à qui peut immobiliser une épargne jusqu'à la retraite et a un impôt à reporter ; il convient mal à qui a besoin de liquidité, paie peu ou pas d'impôt, ou se voit proposer un contrat aux frais élevés.",
  datePublication: "2026-10-20",
  dateMiseAJour: "2026-10-20",
  faq: [
    {
      q: "Peut-on récupérer l'argent du PER avant la retraite ?",
      a: "Seulement dans des cas prévus : décès du conjoint, invalidité d'un enfant, surendettement, fin de droits au chômage, liquidation d'une activité non salariée, achat de la résidence principale. Hors de ces cas, l'épargne reste bloquée (service-public, fiche vérifiée le 12 octobre 2026).",
    },
    {
      q: "Le PER est-il utile si l'on ne paie pas d'impôt sur le revenu ?",
      a: "La déduction des versements n'apporte alors pas d'avantage immédiat, puisqu'il n'y a pas d'impôt à réduire. D'autres enveloppes, plus souples, méritent d'être comparées en priorité.",
    },
    {
      q: "Les versements restent-ils déductibles à tout âge ?",
      a: "Non : selon service-public, depuis le 1er janvier 2026, les versements effectués après 70 ans ne sont plus déductibles. Avant 70 ans, la déduction est la règle par défaut, avec une renonciation possible à chaque versement.",
    },
    {
      q: "Que devient la déduction fiscale à la sortie ?",
      a: "Elle se rattrape : en cas de sortie en capital, la part correspondant aux versements déduits est imposée au barème de l'impôt sur le revenu, sans abattement de 10 %, et les gains sont soumis au prélèvement forfaitaire. La déduction est donc un report, pas une exonération.",
    },
    {
      q: "Peut-on avoir un PER et une autre enveloppe ?",
      a: "Oui, et c'est fréquent. La question est la place du PER dans l'ensemble : combien y mettre, et combien garder disponible ailleurs.",
    },
  ],
  sources: [
    {
      label: "Service-public.gouv.fr : Plan d'épargne retraite (PER), fiche vérifiée le 12 octobre 2026",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34982",
    },
    {
      label: "Info Retraite : service public d'information sur la retraite",
      url: "https://www.info-retraite.fr/portail-services/",
    },
  ],
  liens: [
    "/guide/faut-il-ouvrir-un-per",
    "/guide/deblocage-anticipe-per",
    "/guide/combien-coute-un-per",
    "/guide/pea-ou-per-pour-la-retraite",
    "/strategies/per",
  ],
};

export default function PerFaitPourVous() {
  return (
    <>
      <p>
        Un PER ne se juge pas dans l'absolu, mais par rapport à votre situation : horizon, impôt,
        besoin de liquidité, frais du contrat. Cet article liste d'abord les cas où s'en passer ou
        attendre est raisonnable, puis ceux où il mérite examen. Nous parlons de ces cas en termes
        généraux, sans conseil personnalisé : votre dossier peut sortir de ces schémas.
      </p>

      <h2>Qui devrait s'en passer, ou attendre ?</h2>
      <p>
        <strong>
          Ceux qui peuvent avoir besoin de cet argent avant la retraite, qui paient peu ou pas
          d'impôt, ou qui n'ont pas encore constitué une épargne de précaution.
        </strong>
      </p>
      <ul>
        <li>
          Pas d'épargne de précaution : les cas de déblocage anticipé sont limités (décès du
          conjoint, invalidité d'un enfant, surendettement, fin de droits au chômage, liquidation
          d'une activité non salariée, achat de la résidence principale, selon service-public).
        </li>
        <li>Projet à moins de dix ans qui n'entre pas dans ces cas : le blocage serait pénalisant.</li>
        <li>
          Impôt sur le revenu nul ou très faible : la déduction n'apporte rien d'immédiat, alors
          que le blocage demeure.
        </li>
        <li>Contrat proposé aux frais élevés : le coût peut absorber l'avantage de la déduction.</li>
      </ul>

      <h2>Quels sont les vrais avantages du PER ?</h2>
      <p>
        <strong>
          La déduction des versements du revenu imposable, un blocage qui protège de la tentation de
          dépenser, et une sortie en capital, en rente ou en combinaison.
        </strong>
      </p>
      <p>
        Selon service-public, les versements volontaires effectués avant 70 ans sont déductibles par
        défaut, dans la limite d'un plafond personnel, qui est au minimum de {euros(4710)} pour une
        personne sans revenu professionnel (millésime 2026, fiche citée en sources). Ce plafond figure
        sur l'avis d'imposition. Ce n'est pas un gain net, mais un report d'imposition, comme nous
        l'expliquons plus bas.
      </p>

      <h2>Quel est le coût caché de la déduction ?</h2>
      <p>
        <strong>
          La déduction à l'entrée est rattrapée à la sortie : il s'agit d'un report d'imposition, pas
          d'une exonération.
        </strong>
      </p>
      <p>
        En cas de sortie en capital, la part correspondant aux versements déduits est imposée au
        barème de l'impôt sur le revenu, sans abattement de 10 %, et les gains supportent le
        prélèvement forfaitaire ({pct(FISCALITE.pfuIR)} d'impôt, plus {pct(FISCALITE.prelevementsSociaux.per)}{" "}
        de prélèvements sociaux selon nos hypothèses {HYPOTHESES_MAJ}). Plutôt que de chercher un
        seuil de tranche « magique », demandez-vous si l'impôt reporté pourra être payé sans gêne
        plus tard. Pour le coût annuel du contrat, voyez{" "}
        <Link to="/guide/combien-coute-un-per">combien coûte un PER</Link>.
      </p>

      <h2>Quand le PER mérite-t-il d'être étudié ?</h2>
      <p>
        <strong>
          Quand l'horizon dépasse une dizaine d'années, que la réserve de précaution existe et que
          l'impôt à reporter est réel.
        </strong>
      </p>
      <ul>
        <li>Réserve de précaution déjà constituée dans une enveloppe disponible.</li>
        <li>Horizon de retraite d'au moins une dizaine d'années.</li>
        <li>Contrat dont les frais sont connus et acceptés, comparés à ceux d'autres contrats.</li>
        <li>Capacité à supporter la fluctuation des supports choisis, sans garantie de résultat.</li>
      </ul>
      <p>
        Pour arbitrer avec d'autres enveloppes, consultez{" "}
        <Link to="/guide/pea-ou-per-pour-la-retraite">PEA ou PER pour la retraite</Link> et{" "}
        <Link to="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER</Link>.
      </p>

      <h2>Que faire si le déblocage devient nécessaire ?</h2>
      <p>
        <strong>
          Le déblocage anticipé est possible dans les seuls cas prévus, avec des justificatifs, et
          sa fiscalité dépend du motif.
        </strong>
      </p>
      <p>
        Selon service-public, pour les « accidents de la vie », la part des versements est exonérée
        d'impôt et de prélèvements sociaux, tandis que les gains supportent les prélèvements
        sociaux ; pour l'achat de la résidence principale, les versements déduits sont imposés. Notre
        guide sur{" "}
        <Link to="/guide/deblocage-anticipe-per">le déblocage anticipé du PER</Link> en détaille les
        conditions.
      </p>

      <h2>En résumé</h2>
      <p>
        Le PER est un outil de long terme et de report d'impôt : il sert mal ceux qui ont besoin de
        liquidité, paient peu d'impôt ou n'ont pas de réserve. Il est légitime de se demander s'il
        vous correspond, y compris pour répondre que non. Notre rédaction expose ses limites aussi
        clairement que ses avantages. Pour situer votre cas, commencez par le{" "}
        <Link to="/simulateur-retraite">simulateur retraite</Link>, puis le{" "}
        <Link to="/bilan-retraite">bilan retraite</Link> si vous souhaitez en discuter, y compris
        pour conclure que le PER n'est pas pour vous.
      </p>
    </>
  );
}
