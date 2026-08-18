import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { SUSPENSION_REFORME_RETRAITES, HYPOTHESES_MAJ } from "../components/hypotheses.js";

export default function GuideSuspensionReformeRetraites() {
  const s = SUSPENSION_REFORME_RETRAITES;

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Ce qui change dès le {s.dateEffet}</span>
          <h1>
            Suspension de la réforme des retraites : ce qui change pour les générations{" "}
            {s.generationsConcernees}
          </h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> l'article 105 de la loi de financement de la Sécurité
              sociale (LFSS) pour 2026 — {s.loi} — gèle temporairement le calendrier de relèvement de
              l'âge légal et de la durée d'assurance requise instauré par la réforme des retraites de
              2023. Pour les pensions prenant effet à compter du {s.dateEffet}, les personnes des
              générations {s.generationsConcernees} peuvent partir jusqu'à un trimestre plus tôt que prévu par
              le calendrier de 2023, avec parfois un trimestre de moins à valider pour le taux plein.
              Les générations nées à partir de 1969 ne sont pas concernées : pour elles, le calendrier
              de la réforme de 2023 continue de s'appliquer sans changement, avec un âge légal de 64
              ans. La suspension est annoncée comme temporaire, jusqu'en {s.finSuspensionAnnoncee} —
              une échéance qui reste soumise à une nouvelle intervention du législateur, pas un fait
              acquis (barème {HYPOTHESES_MAJ}, à vérifier au moment de votre départ).
            </p>
          </div>

          <p>
            Si vous êtes né entre 1964 et 1968, ce texte concerne directement votre date de départ à
            la retraite et le nombre de trimestres qu'il vous reste à valider. Ce guide détaille ce que
            change réellement la suspension, génération par génération, ce qui ne change pas, et ce
            qu'il faut vérifier avant d'en tirer une décision — notamment sur le{" "}
            <a href="/guide/cumul-emploi-retraite-comment-ca-marche">cumul emploi-retraite</a> ou le{" "}
            <a href="/guide/combien-coute-rachat-trimestres-retraite">rachat de trimestres</a>, deux
            décisions que ce changement de calendrier peut remettre en cause.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#quest-ce-qui-est-suspendu">Qu'est-ce qui est exactement suspendu ?</a></li>
              <li><a href="#calendrier-par-generation">Le nouvel âge légal, génération par génération</a></li>
              <li><a href="#trimestres">Et le nombre de trimestres requis pour le taux plein ?</a></li>
              <li><a href="#carrieres-longues-fonctionnaires">Carrières longues, fonctionnaires, militaires : un champ élargi</a></li>
              <li><a href="#generations-1969">Les générations 1969 et suivantes : rien ne change</a></li>
              <li><a href="#jusquand">Jusqu'à quand la suspension s'applique-t-elle ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#a-verifier">Ce qu'il faut vérifier avant d'agir</a></li>
            </ol>
          </div>

          <h2 id="quest-ce-qui-est-suspendu">Qu'est-ce qui est exactement suspendu ?</h2>
          <p>
            La réforme des retraites de 2023 (loi n° 2023-270 du 14 avril 2023) avait accéléré deux
            paramètres du régime général : le relèvement progressif de l'âge légal de départ de 62 à 64
            ans, et l'atteinte anticipée de 172 trimestres requis pour le taux plein, génération après
            génération jusqu'en 2027. L'article 105 de la LFSS 2026 ne supprime pas cette réforme — il
            en gèle le calendrier pour les générations qui n'avaient pas encore atteint l'âge légal au
            moment du vote, à savoir les générations {s.generationsConcernees}. Concrètement, ces
            générations reviennent à un calendrier plus proche de celui qui prévalait avant 2023, avec
            un décret d'application ({s.decret}) qui en précise les modalités pratiques.
          </p>
          <p>
            Le mot « suspension » est important : le texte ne fixe pas de nouvel âge légal définitif à
            62 ou 63 ans. Il gèle la trajectoire pour une fenêtre de générations et de temps précise, ce
            qui laisse ouverte la question de ce qui se passera ensuite (voir la section{" "}
            <a href="#jusquand">jusqu'à quand la suspension s'applique</a>).
          </p>

          <h2 id="calendrier-par-generation">Le nouvel âge légal, génération par génération</h2>
          <p>
            Le tableau suivant compare l'âge légal de départ prévu par le calendrier de la réforme de
            2023 et celui applicable depuis la suspension, pour les pensions prenant effet à compter du{" "}
            {s.dateEffet}.
          </p>
          <table>
            <thead>
              <tr>
                <th>Génération</th>
                <th>Âge légal — calendrier 2023</th>
                <th>Âge légal — depuis la suspension</th>
              </tr>
            </thead>
            <tbody>
              {s.parGeneration.map((g) => (
                <tr key={g.generation}>
                  <td>{g.generation}</td>
                  <td>{g.ageAvant}</td>
                  <td>{g.ageApres}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            L'écart le plus favorable revient aux personnes nées en 1964 et au premier trimestre 1965 :
            jusqu'à 6 mois de moins à attendre avant l'âge légal. Pour les générations 1966 à 1968,
            l'avancée se limite à 3 mois. Ces chiffres reprennent le calendrier officiel connu à la date
            de rédaction — un décret ou une circulaire de la CNAV peut encore préciser certains cas
            particuliers, notamment les naissances à cheval sur deux trimestres civils.
          </p>

          <h2 id="trimestres">Et le nombre de trimestres requis pour le taux plein ?</h2>
          <p>
            Le second paramètre gelé est la durée d'assurance requise pour le taux plein, c'est-à-dire
            le nombre de trimestres cotisés (ou assimilés) à valider pour échapper à la{" "}
            <a href="/guide/surcote-decote-retraite">décote</a>. Là aussi, l'effet est concentré sur les
            premières générations concernées : les personnes nées en 1964 et au premier trimestre 1965
            voient leur durée requise reculer à 170 trimestres au lieu de 171 ou 172 selon le calendrier
            de 2023, et celles nées entre avril et décembre 1965 à 171 trimestres. À partir de la
            génération 1966, la durée requise reste fixée à 172 trimestres, seul l'âge légal étant
            avancé de 3 mois.
          </p>
          <p>
            Ce point compte particulièrement si vous envisagiez un{" "}
            <a href="/guide/combien-coute-rachat-trimestres-retraite">rachat de trimestres</a> pour
            atteindre le taux plein : un trimestre de moins à valider peut rendre l'opération inutile,
            ou au contraire libérer un trimestre à racheter pour un autre objectif (surcote, carrière
            longue). Le calcul mérite d'être refait avec le nouveau seuil avant tout versement.
          </p>

          <h2 id="carrieres-longues-fonctionnaires">
            Carrières longues, fonctionnaires, militaires : un champ élargi
          </h2>
          <p>
            La suspension ne se limite pas au régime général des salariés du privé. Le décret
            d'application ({s.decret}) étend le gel du calendrier aux dispositifs de départ anticipé
            pour carrière longue, aux catégories actives et super-actives de la fonction publique
            territoriale et hospitalière, ainsi qu'aux militaires et à certains corps d'infirmiers. Pour
            un lecteur fonctionnaire, cela signifie que l'âge d'ouverture des droits propre à sa
            catégorie recule lui aussi selon une logique comparable — voir notre guide sur la{" "}
            <a href="/guide/retraite-fonctionnaires-completer">retraite des fonctionnaires</a> pour le
            contexte plus large des règles spécifiques à la fonction publique. Les modalités précises
            par régime restent toutefois à vérifier auprès de votre caisse ou service RH, la
            transposition n'étant pas strictement identique à celle du régime général.
          </p>

          <h2 id="generations-1969">Les générations 1969 et suivantes : rien ne change</h2>
          <p>
            Point souvent mal compris : la suspension ne concerne que les générations{" "}
            {s.generationsConcernees}. Pour toute personne née en 1969 ou après, le calendrier de la
            réforme de 2023 continue de s'appliquer sans aucune modification, avec un âge légal cible de
            64 ans et une durée d'assurance de 172 trimestres. Si vous êtes né après 1968, cette mesure
            n'a donc aucun effet direct sur votre date de départ — sauf si le débat qui a produit cette
            suspension se poursuit d'ici là et aboutit à un nouveau texte, ce qui reste une hypothèse et
            non une certitude à ce stade.
          </p>

          <h2 id="jusquand">Jusqu'à quand la suspension s'applique-t-elle ?</h2>
          <p>
            Le texte présente la suspension comme temporaire, avec une reprise annoncée du calendrier
            initial de la réforme de 2023 en {s.finSuspensionAnnoncee}. En pratique, cela signifierait
            que les générations nées après la fenêtre {s.generationsConcernees} retrouveraient la
            trajectoire accélérée vers 64 ans, sauf nouvelle loi entre-temps. Cette échéance de{" "}
            {s.finSuspensionAnnoncee} est une date affichée dans le texte actuel, pas une garantie : une
            majorité parlementaire différente, une nouvelle négociation avec les partenaires sociaux ou
            un nouveau projet de loi de financement de la Sécurité sociale pourraient encore modifier ce
            calendrier avant cette date. Pour un lecteur de 45 à 55 ans aujourd'hui, c'est-à-dire né
            après 1968, la prudence consiste à ne pas figer ses projections sur un âge légal précis à
            plusieurs années d'échéance.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Dois-je faire une démarche pour bénéficier de la suspension ?</h3>
          <p>
            Non. L'ajustement de l'âge légal et de la durée d'assurance requise est automatique et
            s'applique à toute pension prenant effet à compter du {s.dateEffet}, sans démarche
            particulière. En revanche, il reste utile de vérifier votre relevé de carrière et votre
            date de départ estimée sur info-retraite.fr, qui doit intégrer ce nouveau calendrier.
          </p>
          <h3>Puis-je partir plus tôt si j'ai déjà atteint l'âge légal prévu par la réforme de 2023 ?</h3>
          <p>
            Si vous avez déjà liquidé votre pension avant le {s.dateEffet}, la suspension ne s'applique
            pas rétroactivement : les pensions déjà versées ne sont pas recalculées. Si vous n'avez pas
            encore liquidé votre pension, votre date de départ possible peut avancer selon le tableau
            ci-dessus — un point à vérifier précisément avec votre caisse de retraite avant toute
            décision.
          </p>
          <h3>Cela change-t-il le montant de ma pension ?</h3>
          <p>
            La suspension modifie la date à laquelle vous pouvez partir sans décote, pas le mode de
            calcul du montant de la pension lui-même. Si un départ plus précoce se traduit par moins de
            trimestres cotisés que dans votre projection initiale, cela peut avoir un effet indirect sur
            le montant si vous n'atteignez pas le taux plein — voir notre guide{" "}
            <a href="/guide/surcote-decote-retraite">surcote et décote</a> pour le détail du mécanisme.
          </p>
          <h3>Cette mesure concerne-t-elle aussi les régimes complémentaires (Agirc-Arrco) ?</h3>
          <p>
            L'article 105 de la LFSS 2026 porte sur l'âge légal et la durée d'assurance du régime de
            base. L'articulation avec l'Agirc-Arrco, notamment le système de coefficients de solidarité
            et l'âge du taux plein automatique à {" "}
            <a href="/guide/surcote-decote-retraite">67 ans</a>, n'est pas traitée en détail par ce
            texte et doit être vérifiée séparément auprès de votre caisse complémentaire.
          </p>

          <h2 id="a-verifier">Ce qu'il faut vérifier avant d'agir</h2>
          <ol>
            <li>
              <strong>Si vous êtes né entre 1964 et 1968</strong>, actualisez votre simulation sur
              info-retraite.fr pour connaître votre âge légal et votre durée d'assurance requise selon
              le nouveau calendrier, avant de figer un projet de départ ou de cumul emploi-retraite.
            </li>
            <li>
              <strong>Si vous envisagiez un rachat de trimestres</strong> pour atteindre le taux plein,
              recalculez le nombre de trimestres réellement manquants avec le nouveau seuil avant de
              verser quoi que ce soit.
            </li>
            <li>
              <strong>Si vous êtes fonctionnaire en catégorie active</strong> ou concerné par un
              dispositif de carrière longue, vérifiez auprès de votre service RH ou de votre caisse les
              modalités précises d'application, qui peuvent différer légèrement du régime général.
            </li>
            <li>
              <strong>Si vous êtes né après 1968</strong>, ne construisez pas votre projection sur une
              hypothèse de suspension prolongée au-delà de {s.finSuspensionAnnoncee} : à ce stade, c'est
              un objectif affiché par le texte actuel, pas une règle définitivement acquise.
            </li>
          </ol>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les éléments
              chiffrés proviennent de {s.loi} et de son décret d'application ({s.decret}), recoupés avec
              plusieurs sources spécialisées concordantes (barème {HYPOTHESES_MAJ}). Le détail par
              trimestre de naissance et les modalités propres à certains régimes spéciaux ou catégories
              de la fonction publique peuvent encore être précisés par circulaire — à reconfirmer auprès
              de votre caisse de retraite avant toute décision. Pour un point complet et chiffré sur
              votre situation personnelle, un{" "}
              <a href="/bilan-retraite">bilan retraite gratuit</a> permet d'intégrer ce nouveau
              calendrier à votre projection.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner
        title="Né entre 1964 et 1968 ? Faisons le point sur votre nouvelle date de départ"
        button="Réserver mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
