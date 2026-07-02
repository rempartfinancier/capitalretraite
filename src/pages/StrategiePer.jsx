import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";

export default function StrategiePer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Stratégie 01</span>
          <h1>Le Plan Épargne Retraite : puissant, mais pas pour tout le monde</h1>
          <p className="sub">
            Le PER est l'enveloppe explicitement conçue pour la retraite. Son avantage fiscal est
            réel — ses contreparties aussi.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Comment fonctionne un PER</h2>
          <p>
            Le PER individuel est une enveloppe d'épargne bloquée jusqu'à la retraite (hors cas de
            déblocage anticipé prévus par la loi, dont l'achat de la résidence principale et les
            accidents de la vie). Vous y versez librement ; les sommes sont investies sur des
            supports allant du fonds en euros aux unités de compte, souvent via une gestion pilotée
            « à horizon » qui sécurise progressivement le capital à l'approche de la retraite.
          </p>

          <h2>L'avantage fiscal à l'entrée</h2>
          <p>
            Les versements volontaires sont déductibles de votre revenu imposable, dans la limite
            d'un plafond annuel indiqué sur votre avis d'imposition. Concrètement, l'économie
            d'impôt est proportionnelle à votre tranche marginale d'imposition : plus votre TMI est
            élevée, plus l'effort d'épargne réel est réduit. C'est ce mécanisme qui fait du PER un
            outil particulièrement étudié pour les contribuables à TMI de 30 % et au-delà — et
            nettement moins évident en deçà.
          </p>

          <h2>Les modes de sortie</h2>
          <p>À la retraite, trois options s'offrent à vous :</p>
          <ul>
            <li><strong>Sortie en capital</strong> — en une fois ou de manière fractionnée sur plusieurs années ;</li>
            <li><strong>Sortie en rente viagère</strong> — un revenu garanti à vie, en contrepartie de l'aliénation du capital ;</li>
            <li><strong>Sortie mixte</strong> — une partie en capital, une partie en rente.</li>
          </ul>
          <p>
            Le choix n'est pas anodin : il détermine la fiscalité applicable et la souplesse dont
            vous disposerez. Nous y consacrons un guide entier :{" "}
            <a href="/guide/fiscalite-sortie-per">la fiscalité de sortie du PER</a>.
          </p>

          <h2>La fiscalité à la sortie : la contrepartie de la déduction</h2>
          <p>
            Ce que le fisc vous accorde à l'entrée, il le reprend en partie à la sortie. Si vous
            avez déduit vos versements, le capital retiré est imposé au barème de l'impôt sur le
            revenu (pour la part correspondant aux versements) et les gains subissent le
            prélèvement forfaitaire. Le PER n'est donc pas une niche fiscale : c'est un
            <em> report</em> d'imposition. Il devient gagnant lorsque votre TMI à la retraite est
            inférieure à votre TMI pendant la vie active — ce qui est fréquent, mais pas
            systématique.
          </p>

          <h2>Pour qui le PER est-il adapté ?</h2>
          <ul>
            <li>Contribuables à TMI de 30 %, 41 % ou 45 %, avec un horizon d'au moins 5 à 10 ans ;</li>
            <li>Épargnants disposant déjà d'une réserve liquide (le PER ne doit jamais être la seule épargne) ;</li>
            <li>Profils qui anticipent une baisse de leur TMI à la retraite.</li>
          </ul>

          <h2>Les pièges à connaître</h2>
          <ul>
            <li>
              <strong>Le blocage</strong> — hors cas légaux, les fonds sont indisponibles jusqu'à
              la retraite. Verser au-delà de sa capacité d'épargne longue est l'erreur la plus courante.
            </li>
            <li>
              <strong>La fiscalité de sortie sous-estimée</strong> — une sortie en capital en une
              seule fois peut faire bondir votre TMI l'année du retrait.
            </li>
            <li>
              <strong>Le mauvais contrat</strong> — frais sur versements élevés, supports pauvres,
              gestion pilotée opaque : d'un contrat à l'autre, l'écart de résultat sur 15 ans peut
              être considérable.
            </li>
          </ul>

          <div className="note">
            Piste de réflexion, pas recommandation : l'intérêt du PER dépend entièrement de votre
            TMI actuelle, de votre TMI anticipée à la retraite et de votre besoin de liquidité.
            Votre situation mérite une analyse.
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="Votre situation mérite une analyse — pas une réponse générique." button="Prendre rendez-vous" />
    </>
  );
}
