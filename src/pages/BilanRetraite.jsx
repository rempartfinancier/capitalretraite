import { FormBilan } from "../components/Forms.jsx";

export default function BilanRetraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Lead magnet — sans engagement</span>
          <h1>Votre bilan retraite personnalisé — gratuit, sans engagement</h1>
          <p className="sub">
            Quinze minutes en visio pour auditer votre situation : où vous en êtes, ce qui vous
            manque, et ce qui peut être optimisé dès maintenant.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Ce que vous verrez pendant ces 15 minutes</h2>
          <ul>
            <li>
              <strong>Votre lacune de revenus projetée</strong> — l'écart entre votre niveau de vie
              actuel et ce que vos régimes obligatoires devraient couvrir, en ordre de grandeur.
            </li>
            <li>
              <strong>Vos enveloppes sous-utilisées</strong> — PER absent alors que votre TMI le
              justifierait, assurance-vie dormante, PEA jamais ouvert : ce qui manque à votre
              dispositif, et pourquoi.
            </li>
            <li>
              <strong>Les optimisations immédiates</strong> — les ajustements actionnables sans
              tout bouleverser : versements, clauses, arbitrages simples.
            </li>
          </ul>
          <p>
            Ce bilan est un audit de situation, pas un rendez-vous commercial. Vous repartez avec
            une vision claire — libre à vous, ensuite, de poursuivre avec nous ou non.
          </p>
        </div>
        <div className="container">
          <h2 style={{ marginTop: "2.5rem" }}>Demander mon bilan</h2>
          <FormBilan />
        </div>
      </section>
    </>
  );
}
