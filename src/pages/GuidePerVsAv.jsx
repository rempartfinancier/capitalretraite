import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";

export default function GuidePerVsAv() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide — comparatif</span>
          <h1>PER ou assurance-vie pour la retraite : le vrai comparatif</h1>
          <p className="sub">
            La question la plus posée en rendez-vous — et celle où les réponses toutes faites font
            le plus de dégâts. Voici le comparatif structuré, contreparties comprises.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>La différence fondamentale : quand payez-vous l'impôt ?</h2>
          <p>
            Le PER offre une déduction fiscale à l'entrée et une imposition à la sortie ;
            l'assurance-vie fait l'inverse : aucun avantage à l'entrée, mais une fiscalité de
            sortie douce (seuls les gains sont taxés, avec abattement après 8 ans). Tout le reste —
            liquidité, succession, cas d'usage — découle de ce choix de calendrier fiscal.
          </p>

          <h2>Le tableau comparatif</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>PER</th>
                <th>Assurance-vie</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Avantage à l'entrée</strong></td>
                <td>Versements déductibles du revenu imposable (dans un plafond)</td>
                <td>Aucun</td>
              </tr>
              <tr>
                <td><strong>Disponibilité</strong></td>
                <td>Bloqué jusqu'à la retraite (hors cas légaux, dont résidence principale)</td>
                <td>Rachat possible à tout moment</td>
              </tr>
              <tr>
                <td><strong>Fiscalité de sortie</strong></td>
                <td>Capital : versements déduits imposés au barème, gains au prélèvement forfaitaire</td>
                <td>Seuls les gains sont imposés ; abattement annuel après 8 ans</td>
              </tr>
              <tr>
                <td><strong>Sortie en rente</strong></td>
                <td>Possible, régime fiscal spécifique</td>
                <td>Possible, rente à titre onéreux (fraction imposable selon l'âge)</td>
              </tr>
              <tr>
                <td><strong>Succession</strong></td>
                <td>Cadre spécifique, moins favorable en cas de décès tardif</td>
                <td>Cadre privilégié pour les versements avant 70 ans</td>
              </tr>
              <tr>
                <td><strong>Profil type</strong></td>
                <td>TMI 30 % et plus, horizon long, épargne de précaution déjà constituée</td>
                <td>Tous profils ; indispensable si besoin de souplesse</td>
              </tr>
            </tbody>
          </table>

          <h2>Les cas d'usage typiques</h2>
          <h3>Le PER prend l'avantage quand…</h3>
          <ul>
            <li>Votre TMI actuelle est de 30 %, 41 % ou 45 %, et vous anticipez une TMI plus faible à la retraite ;</li>
            <li>Vous avez déjà une épargne disponible suffisante et pouvez immobiliser sans risque de regret ;</li>
            <li>Vous cherchez une discipline d'épargne « sanctuarisée » pour la retraite.</li>
          </ul>
          <h3>L'assurance-vie prend l'avantage quand…</h3>
          <ul>
            <li>Votre TMI est de 11 % (la déduction PER rapporte peu, et la fiscalité de sortie peut l'annuler) ;</li>
            <li>Votre horizon ou vos projets sont incertains — mobilité, aide aux enfants, travaux ;</li>
            <li>La transmission fait partie de vos objectifs ;</li>
            <li>Vous voulez pouvoir piloter vos revenus de retraite par rachats programmés, avec l'abattement annuel.</li>
          </ul>

          <h2>Le vrai réglage : le dosage, pas le duel</h2>
          <p>
            Dans la pratique, la plupart des stratégies solides combinent les deux : le PER pour
            capter la déduction à hauteur du plafond utile (et pas au-delà), l'assurance-vie pour
            la souplesse, la succession et la décumulation par rachats. La bonne répartition dépend
            de trois paramètres : votre TMI, votre horizon et votre besoin de liquidité.
          </p>

          <div className="note">
            Ça dépend de votre TMI, de votre horizon et de votre besoin de liquidité — c'est
            exactement ce qu'on regarde en bilan. Quinze minutes suffisent souvent à trancher.
          </div>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="PER, assurance-vie… ou les deux, dans quelles proportions ?" />
    </>
  );
}
