import { Link } from "react-router-dom";
import { euros } from "../../components/hypotheses.js";

export const meta = {
  slug: "pieges-du-cumul-emploi-retraite",
  type: "guide",
  big5: "problemes",
  categorie: "mecanique-retraite",
  title: "Les pièges du cumul emploi-retraite : ce qu'il faut vérifier",
  description:
    "Cumul intégral ou plafonné, pension réduite ou suspendue, nouveaux droits limités, règles modifiées en 2027 : les pièges du cumul emploi-retraite.",
  h1: "Les pièges du cumul emploi-retraite",
  resume:
    "Les principaux pièges du cumul emploi-retraite sont de confondre cumul intégral et plafonné (au-delà du plafond, la pension de base est réduite, voire suspendue), d'attendre de nouveaux droits qui sont limités, d'oublier de déclarer la reprise d'activité, et d'ignorer que les règles changent au 1er janvier 2027.",
  datePublication: "2026-10-20",
  dateMiseAJour: "2026-10-20",
  faq: [
    {
      q: "Peut-on reprendre une activité chez son ancien employeur ?",
      a: "Oui, mais selon service-public, une reprise chez le dernier employeur ne donne droit à un supplément de pension en cumul intégral que si elle intervient au moins 6 mois après le départ en retraite.",
    },
    {
      q: "Faut-il prévenir la caisse de retraite ?",
      a: "Oui. En cumul plafonné, la reprise d'activité doit être déclarée à la Carsat dans le mois (service-public, fiche vérifiée le 1er janvier 2026). Une absence de déclaration expose à des régularisations.",
    },
    {
      q: "Une nouvelle activité fait-elle augmenter la pension ?",
      a: "Non. En cumul plafonné, elle n'ouvre aucun nouveau droit. En cumul intégral, elle peut en ouvrir sous conditions, avec une pension supplémentaire plafonnée et accordée une fois par caisse de base.",
    },
    {
      q: "Le cumul est-il possible avant l'âge légal ?",
      a: "Cela dépend de votre situation (départ anticipé, carrière longue, etc.) et du régime. Le téléservice de l'Assurance retraite indique les conditions applicables à votre dossier.",
    },
    {
      q: "Les règles de 2026 vont-elles changer ?",
      a: "Oui : selon service-public, la loi de financement de la sécurité sociale pour 2026 modifie les conditions de cumul emploi-retraite à compter du 1er janvier 2027. La fiche sera mise à jour à cette date, et nous la suivrons.",
    },
  ],
  sources: [
    {
      label: "Service-public.gouv.fr : Cumul emploi-retraite du salarié (fiche vérifiée le 1er janvier 2026)",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F13243",
    },
    {
      label: "Info Retraite : service public d'information sur la retraite",
      url: "https://www.info-retraite.fr/portail-services/",
    },
  ],
  liens: [
    "/guide/cumul-emploi-retraite-comment-ca-marche",
    "/guide/surcote-decote-retraite",
    "/guide/verifier-releve-de-carriere-retraite",
    "/simulateur-retraite",
  ],
};

export default function PiegesCumulEmploiRetraite() {
  return (
    <>
      <p>
        Le cumul emploi-retraite séduit parce qu'il promet de toucher une pension tout en gardant
        un revenu d'activité. Les règles ci-dessous concernent les salariés du régime général, selon
        la fiche officielle vérifiée le 1er janvier 2026. Le fonctionnement général est expliqué
        dans <Link to="/guide/cumul-emploi-retraite-comment-ca-marche">notre guide du cumul emploi-retraite</Link> ;
        ici, nous nous limitons aux pièges.
      </p>

      <h2>Piège n° 1 : croire que tout le monde bénéficie du cumul intégral ?</h2>
      <p>
        <strong>
          Le cumul intégral suppose le taux plein et la liquidation de toutes les pensions, de base
          et complémentaires, françaises et étrangères.
        </strong>
      </p>
      <p>
        Selon service-public, le taux plein doit être obtenu entre 62 et 67 ans avec la durée
        requise, ou à 67 ans et plus. Sans ces conditions, c'est le cumul plafonné qui s'applique.
        Un départ avec décote, pour cette raison, ne donne pas droit au cumul intégral ; notre guide
        sur <Link to="/guide/surcote-decote-retraite">la surcote et la décote</Link> détaille
        pourquoi la décote apparaît.
      </p>

      <h2>Piège n° 2 : dépasser le plafond du cumul plafonné ?</h2>
      <p>
        <strong>
          Au-delà du plafond, la pension de base est réduite du montant excédentaire, et suspendue
          si la réduction dépasse la pension.
        </strong>
      </p>
      <p>
        Pour 2026, le plafond est égal à 160 % du Smic ({euros(2916.85)} brut par mois) ou au
        dernier salaire d'activité mensuel brut s'il est plus avantageux, selon service-public. Il
        s'applique au total des pensions (base et complémentaires, brutes) et des revenus d'activité.
      </p>
      <table>
        <thead>
          <tr>
            <th>Cas</th>
            <th>Conséquence</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total sous le plafond</td>
            <td>Aucune réduction de la pension de base</td>
          </tr>
          <tr>
            <td>Total au-dessus du plafond</td>
            <td>Pension de base réduite de l'excédent</td>
          </tr>
          <tr>
            <td>Excédent supérieur à la pension de base</td>
            <td>Pension de base suspendue</td>
          </tr>
        </tbody>
      </table>

      <h2>Piège n° 3 : attendre de nouveaux droits qui n'arrivent pas ?</h2>
      <p>
        <strong>
          En cumul plafonné, la reprise d'activité n'ouvre aucun nouveau droit ; en cumul intégral,
          les nouveaux droits sont plafonnés.
        </strong>
      </p>
      <p>
        Selon service-public, depuis le 1er janvier 2023, une activité en cumul intégral peut
        ouvrir des droits auprès de la caisse de base : la nouvelle pension est plafonnée à{" "}
        {euros(2403)} brut par an, ne peut pas être majorée et n'est accordée qu'une fois par caisse
        de base. Des droits Agirc-Arrco sont aussi possibles. En pratique, le cumul augmente peu la
        retraite : il augmente surtout le revenu courant.
      </p>

      <h2>Piège n° 4 : oublier les démarches et les délais ?</h2>
      <p>
        <strong>
          La reprise d'activité doit être déclarée à la caisse dans le mois en cumul plafonné, et un
          retour chez l'ancien employeur obéit à un délai de 6 mois pour un supplément.
        </strong>
      </p>
      <p>
        Avant de reprendre, vérifiez la situation de votre dossier : relevé de carrière complet et
        pensions toutes liquidées. Notre guide pour{" "}
        <Link to="/guide/verifier-releve-de-carriere-retraite">vérifier le relevé de carrière</Link>{" "}
        peut y aider.
      </p>

      <h2>Piège n° 5 : s'appuyer sur des règles qui vont changer ?</h2>
      <p>
        <strong>
          Selon service-public, les conditions de cumul sont modifiées à compter du 1er janvier
          2027 par la loi de financement de la sécurité sociale pour 2026.
        </strong>
      </p>
      <p>
        La fiche officielle ne détaille pas encore les nouvelles règles : tout plan fondé sur le
        cumul pour 2027 et au-delà doit être revalidé. Le téléservice de l'Assurance retraite
        indique les conditions applicables à votre dossier.
      </p>

      <h2>En résumé</h2>
      <p>
        Le cumul emploi-retraite fonctionne, mais il n'est ni universel (conditions de taux plein et
        de liquidation), ni neutre (plafond, pension réduite), ni stable (règles modifiées en 2027).
        Il est normal d'hésiter avant de reprendre une activité : demandez à la caisse les conditions
        de votre dossier. Notre rédaction suit ces évolutions et met ses chiffres à jour avec leurs
        sources. Pour mesurer ce que le cumul changerait à votre budget, essayez le{" "}
        <Link to="/simulateur-retraite">simulateur retraite</Link>, puis le{" "}
        <Link to="/bilan-retraite">bilan retraite</Link> si vous souhaitez un regard extérieur.
      </p>
    </>
  );
}
