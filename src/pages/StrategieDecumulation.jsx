import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";

export default function StrategieDecumulation() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Stratégie 04 — notre angle différenciant</span>
          <h1>La décumulation : convertir son capital en revenus sans se tromper</h1>
          <p className="sub">
            On passe trente ans à apprendre à épargner, et personne ne nous apprend à décaisser.
            C'est pourtant là que se gagnent — ou se perdent — les dernières années d'efforts.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Qu'est-ce que la décumulation ?</h2>
          <p>
            La décumulation est la phase où votre patrimoine cesse de croître pour financer votre
            vie : vous transformez un stock (le capital constitué) en flux (des revenus réguliers).
            Cette phase obéit à des règles différentes de la constitution : la fiscalité des
            retraits, l'ordre dans lequel on puise dans les enveloppes et le rythme de décaissement
            comptent souvent plus que la performance des placements eux-mêmes.
          </p>

          <h2>Trois grandes voies pour créer un revenu</h2>
          <h3>La rente viagère</h3>
          <p>
            Vous cédez votre capital à un assureur en échange d'un revenu garanti jusqu'à votre
            décès. Avantage : le risque de longévité disparaît — vous ne pouvez pas « survivre à
            votre argent ». Contreparties : le capital est aliéné (rien ne revient aux héritiers,
            sauf option de réversion) et le montant dépend de l'âge de conversion et des tables de
            mortalité.
          </p>
          <h3>Le rachat progressif</h3>
          <p>
            Vous conservez votre capital investi et en retirez régulièrement une fraction (rachats
            programmés d'assurance-vie, retraits fractionnés de PER, ventes partielles sur PEA).
            Avantage : souplesse totale et capital transmissible. Contrepartie : le risque de
            longévité reste à votre charge — décaisser trop vite ou subir un marché baissier en
            début de retraite peut épuiser le capital prématurément.
          </p>
          <h3>Le viager et la monétisation de l'immobilier</h3>
          <p>
            Vendre en viager, vendre la nue-propriété en conservant l'usufruit, ou arbitrer un bien
            locatif : l'immobilier peut lui aussi devenir un flux. Ces opérations sont lourdes et
            irréversibles — elles se préparent des années à l'avance, pas dans l'urgence.
          </p>

          <h2>Le timing de sortie selon les enveloppes</h2>
          <p>
            Chaque enveloppe a son propre calendrier fiscal optimal : l'assurance-vie après 8 ans
            avec son abattement annuel, le PEA après 5 ans, le PER dont la sortie en capital peut
            se fractionner sur plusieurs années pour lisser l'impôt. Sortir de la mauvaise
            enveloppe en premier, ou tout sortir la même année, peut coûter plusieurs points de
            fiscalité — de manière parfaitement évitable.
          </p>

          <h2>La fiscalité comparative des sorties</h2>
          <ul>
            <li><strong>Assurance-vie (rachats)</strong> : seuls les gains sont imposés, abattement annuel après 8 ans ;</li>
            <li><strong>PEA (retraits)</strong> : plus-values exonérées d'IR après 5 ans, prélèvements sociaux dus ;</li>
            <li><strong>PER (capital)</strong> : part des versements déduits imposée au barème, gains au prélèvement forfaitaire ;</li>
            <li><strong>Rentes viagères</strong> : régimes distincts selon l'origine (à titre onéreux, PER, PEA) — du plus taxé au totalement exonéré d'IR.</li>
          </ul>

          <h2>Le risque de longévité</h2>
          <p>
            Une retraite peut durer trente ans. Le vrai risque n'est pas de mourir trop tôt, c'est
            de vivre longtemps avec un capital dimensionné pour quinze ans. Toute stratégie de
            décumulation sérieuse commence par cette question : quel socle de revenus doit être
            garanti à vie, et quelle part peut rester flexible ?
          </p>

          <h2>Les erreurs fréquentes</h2>
          <ul>
            <li><strong>Décapitaliser trop vite</strong> les premières années, quand tout va bien ;</li>
            <li><strong>Puiser dans la mauvaise enveloppe en premier</strong> et gaspiller des abattements fiscaux ;</li>
            <li>Ignorer l'effet d'un marché baissier en début de retraite sur un capital en cours de retrait ;</li>
            <li>Convertir tout son capital en rente — ou refuser toute rente — par principe plutôt que par calcul ;</li>
            <li>Ne penser la décumulation qu'à 64 ans, alors qu'elle se prépare dès 55.</li>
          </ul>

          <div className="note">
            Piste de réflexion : la bonne stratégie de décumulation combine généralement un socle
            garanti (pensions, éventuellement une part de rente) et des retraits flexibles. Le bon
            dosage dépend de votre espérance de dépenses, de votre patrimoine et de votre rapport
            au risque — c'est exactement ce qu'on regarde en bilan.
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="À quoi ressemblerait votre plan de décaissement ?" button="Bilan retraite gratuit (15 min)" />
    </>
  );
}
