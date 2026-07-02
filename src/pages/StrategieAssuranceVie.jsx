import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";

export default function StrategieAssuranceVie() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Stratégie 02</span>
          <h1>L'assurance-vie comme outil retraite : la souplesse d'abord</h1>
          <p className="sub">
            Moins « fléchée retraite » que le PER, l'assurance-vie est pourtant la colonne
            vertébrale de nombreuses stratégies — précisément parce qu'elle n'enferme pas.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Pourquoi l'assurance-vie a sa place dans une stratégie retraite</h2>
          <p>
            Contrairement au PER, l'assurance-vie reste disponible à tout moment : un rachat
            partiel est possible sans condition d'âge. Cette liquidité a un prix — pas de déduction
            fiscale à l'entrée — mais elle offre une liberté précieuse quand la vie ne suit pas le
            plan prévu.
          </p>

          <h2>Les rachats programmés : transformer un contrat en revenu</h2>
          <p>
            À la retraite, l'assurance-vie peut verser un complément de revenu régulier via des
            rachats partiels programmés : vous définissez un montant et une fréquence, l'assureur
            exécute. Chaque rachat n'est imposé que sur sa part de gains — la part de capital
            retiré n'est pas taxée. C'est l'un des mécanismes de décumulation les plus souples qui
            existent, et il se combine bien avec d'autres sources de revenus.
          </p>

          <h2>La fiscalité après 8 ans</h2>
          <p>
            Passé le huitième anniversaire du contrat, les rachats bénéficient d'un abattement
            annuel sur les gains (4 600 € pour une personne seule, 9 200 € pour un couple soumis à
            imposition commune, barème en vigueur à la date de rédaction — juillet 2026). Bien
            calibrés, des rachats programmés peuvent ainsi générer un revenu dont la part imposable
            est faible, voire nulle certaines années.
          </p>

          <h2>Les avantages successoraux</h2>
          <p>
            L'assurance-vie est aussi un outil de transmission : les capitaux versés avant 70 ans
            bénéficient d'un cadre successoral spécifique, avec un abattement par bénéficiaire
            désigné. Pour un patrimoine constitué, cette dimension pèse dans l'arbitrage entre
            enveloppes — un PER liquidé n'offre pas les mêmes possibilités.
          </p>

          <h2>La rente viagère optionnelle</h2>
          <p>
            Un contrat d'assurance-vie peut être converti en rente viagère : un revenu garanti à
            vie, en contrepartie de l'abandon du capital. Cette option est rarement le premier
            choix — elle prive vos héritiers du capital — mais elle répond à un vrai besoin : celui
            de ne jamais épuiser ses ressources, quel que soit son âge. Nous en parlons en détail
            dans la page <a href="/strategies/decumulation">décumulation</a>.
          </p>

          <h2>Et pour les patrimoines de 150 000 € et plus ?</h2>
          <p>
            À partir d'un certain encours, l'assurance-vie luxembourgeoise devient une option à
            étudier : protection renforcée du souscripteur (triangle de sécurité, super-privilège),
            univers d'investissement élargi, neutralité fiscale pour un résident français. C'est un
            sujet à part entière, que nous traitons sur notre site dédié :{" "}
            <a href="https://assurancevie.lu" target="_blank" rel="noopener noreferrer">
              assurancevie.lu
            </a>
            .
          </p>

          <h2>Les limites à garder en tête</h2>
          <ul>
            <li>Pas de déduction fiscale à l'entrée — le PER garde cet avantage pour les TMI élevées ;</li>
            <li>
              Le rendement des fonds en euros varie chaque année et n'est jamais garanti par
              avance — nous ne publions aucune projection de rendement ;
            </li>
            <li>Les unités de compte exposent le capital aux fluctuations des marchés ;</li>
            <li>Les frais (versement, gestion, arbitrage) diffèrent fortement d'un contrat à l'autre.</li>
          </ul>

          <div className="note">
            Piste de réflexion : pour beaucoup de profils, la vraie question n'est pas « PER ou
            assurance-vie ? » mais « quelle dose de chaque ? ». Voir notre comparatif complet :{" "}
            <a href="/guide/per-vs-assurance-vie-retraite">PER vs assurance-vie retraite</a>.
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="Votre contrat actuel travaille-t-il vraiment pour votre retraite ?" button="Prendre rendez-vous" />
    </>
  );
}
