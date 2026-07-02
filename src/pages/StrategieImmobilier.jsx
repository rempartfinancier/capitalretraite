import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";

export default function StrategieImmobilier() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Stratégie 05</span>
          <h1>L'immobilier dans la stratégie retraite : le flux plutôt que la pierre</h1>
          <p className="sub">
            L'immobilier peut financer une retraite — à condition de le penser comme une source de
            revenus, pas comme une collection de biens.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>La SCPI à crédit : construire un revenu futur avec l'argent de la banque</h2>
          <p>
            Acheter des parts de SCPI à crédit à 48-52 ans, c'est faire financer par l'emprunt un
            revenu qui se libère au moment où le crédit s'éteint — idéalement autour du départ en
            retraite. Les loyers remboursent une partie des mensualités pendant la vie active, puis
            deviennent un complément de revenu. Le mécanisme est séduisant, mais il suppose de bien
            choisir ses SCPI, de comprendre leur fiscalité et d'accepter les risques propres à la
            pierre-papier (revenus et capital non garantis, liquidité limitée).
          </p>
          <p>
            Nous ne développons pas ici l'analyse détaillée des SCPI : pour comparer les véhicules
            immobiliers entre eux, consultez{" "}
            <a href="https://immobilierpassif.com" target="_blank" rel="noopener noreferrer">
              immobilierpassif.com
            </a>{" "}
            ; pour souscrire une SCPI avec accompagnement, rendez-vous sur{" "}
            <a href="https://scpirentable.fr" target="_blank" rel="noopener noreferrer">
              scpirentable.fr
            </a>
            .
          </p>

          <h2>Le LMNP : des revenus locatifs à la fiscalité travaillée</h2>
          <p>
            La location meublée non professionnelle permet, via le régime réel et l'amortissement
            du bien, de percevoir des loyers dont la part imposable est durablement réduite. En
            contrepartie : une gestion plus active qu'une SCPI, une comptabilité dédiée, et une
            dépendance au marché locatif local. Pour un futur retraité, la vraie question est
            souvent : « ai-je envie de gérer un bien à 70 ans ? »
          </p>

          <h2>L'usufruit temporaire : acheter du revenu pour une durée choisie</h2>
          <p>
            Acquérir l'usufruit temporaire de parts de SCPI (5, 10, 15 ans), c'est acheter à prix
            décoté un flux de revenus pour une période définie — par exemple pour couvrir les
            années entre un départ anticipé et la liquidation des pensions. À l'échéance,
            l'usufruit s'éteint : le capital n'est pas récupéré. C'est un outil de flux pur, à
            manier avec un objectif précis.
          </p>

          <h2>Le démembrement : préparer la transmission en même temps que la retraite</h2>
          <p>
            À l'inverse, acheter la nue-propriété (d'un bien ou de parts de SCPI) permet de se
            constituer un capital à prix réduit, qui se reconstitue en pleine propriété à
            l'échéance — sans revenus pendant la période, donc sans fiscalité. Une brique
            pertinente pour qui n'a pas besoin de revenus immédiats et pense déjà à la transmission.
          </p>

          <h2>Ce que l'immobilier ne fait pas</h2>
          <ul>
            <li>Il n'offre aucune garantie de revenu ni de valeur — vacance, impayés, cycles de marché existent ;</li>
            <li>Il est peu liquide : on ne vend pas un bien ou des parts de SCPI en quelques jours sans concession sur le prix ;</li>
            <li>Sa fiscalité (revenus fonciers, IFI) peut éroder fortement le rendement net selon votre situation.</li>
          </ul>

          <div className="note">
            Piste de réflexion : dans une stratégie retraite, l'immobilier se dose. La bonne
            question n'est pas « faut-il de l'immobilier ? » mais « quelle part de mes revenus
            futurs doit venir de la pierre, et sous quelle forme ? ».
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="Quelle place pour la pierre dans vos revenus de retraite ?" button="Prendre rendez-vous" />
    </>
  );
}
