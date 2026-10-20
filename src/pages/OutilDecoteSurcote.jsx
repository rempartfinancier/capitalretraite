import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { ChampNombre, PorteEmail, useParcoursOutil } from "../components/ChampsOutil.jsx";
import { HYPOTHESES_MAJ, REGIME_GENERAL, euros, pct } from "../components/hypotheses.js";
import { DONNEES_A_VERIFIER, TRIMESTRES_PAR_AN, estimerDecoteSurcote, scenariosDepart } from "../lib/outils/decote.js";

// Valeurs d'exemple pour l'affichage initial : à remplacer par celles de votre relevé.
const DEFAUTS = { ageActuel: 58, trimestresValides: 150, trimestresRequis: 172, ageLegal: 64, ageDepart: 62 };

const libelleVariation = (v) => (v < 0 ? `décote de ${pct(-v)}` : v > 0 ? `surcote de ${pct(v)}` : "ni décote ni surcote");

export default function OutilDecoteSurcote() {
  const [p, setP] = useState(DEFAUTS);
  const [pensionBase, setPensionBase] = useState(0);
  const parcours = useParcoursOutil("decote_surcote");

  const maj = (cle) => (v) => {
    parcours.touche();
    setP((anc) => ({ ...anc, [cle]: v }));
  };

  const res = useMemo(() => estimerDecoteSurcote(p), [p]);
  const scenarios = useMemo(() => (res.erreur ? [] : scenariosDepart(p)), [p, res.erreur]);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Outil gratuit</span>
          <h1>Décote, surcote et trimestres manquants : estimez l'effet de votre âge de départ</h1>
          <p className="sub">
            Quatre données à reprendre de votre relevé de carrière. Le résultat s'affiche tout de
            suite, sans email, avec les hypothèses et ce que l'outil ne sait pas calculer.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="simulateur">
            <p className="sim-titre">Votre situation (régime général)</p>
            <div className="sim-grille">
              <ChampNombre label="Votre âge aujourd'hui" value={p.ageActuel} onChange={maj("ageActuel")} min={30} max={70} suffixe="ans" />
              <ChampNombre label="Trimestres validés à ce jour" value={p.trimestresValides} onChange={maj("trimestresValides")} min={0} max={250} suffixe="trim." aide="Sur votre relevé de carrière (info-retraite.fr)." />
              <ChampNombre label="Durée d'assurance requise (taux plein)" value={p.trimestresRequis} onChange={maj("trimestresRequis")} min={100} max={200} suffixe="trim." aide="Dépend de votre année de naissance : à lire sur votre relevé. À vérifier." />
              <ChampNombre label="Âge légal de départ" value={p.ageLegal} onChange={maj("ageLegal")} min={60} max={67} suffixe="ans" aide="Dépend de votre année de naissance. À vérifier sur info-retraite.fr." />
              <ChampNombre label="Âge de départ envisagé" value={p.ageDepart} onChange={maj("ageDepart")} min={55} max={70} suffixe="ans" />
              <ChampNombre label="Pension mensuelle à taux plein (facultatif)" value={pensionBase} onChange={setPensionBase} min={0} max={10000} step={50} suffixe="€" aide="Laissez 0 pour n'afficher que les pourcentages." />
            </div>

            {res.erreur ? (
              <p role="alert" className="sim-note">
                Vérifiez les valeurs saisies : l'âge de départ ne peut pas être antérieur à votre âge actuel.
              </p>
            ) : (
              <>
                <div className="sim-resultat" aria-live="polite">
                  <table>
                    <tbody>
                      <tr>
                        <td>Trimestres validés à votre départ (hypothèse : {TRIMESTRES_PAR_AN} par an d'activité)</td>
                        <td className="sim-valeur">{res.trimestresAuDepart}</td>
                      </tr>
                      <tr>
                        <td>Trimestres manquants pour le taux plein</td>
                        <td className="sim-valeur">{res.trimestresManquants}</td>
                      </tr>
                      <tr>
                        <td>Effet sur la pension de base</td>
                        <td className="sim-valeur">{libelleVariation(res.variationPct)}</td>
                      </tr>
                      {pensionBase > 0 && (
                        <tr>
                          <td>Pension de base ajustée (ordre de grandeur)</td>
                          <td className="sim-valeur">
                            environ {euros(pensionBase * (1 + res.variationPct / 100))} par mois
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <h3 style={{ marginTop: "1.5rem" }}>Et si vous partiez un an plus tôt ou un an plus tard ?</h3>
                <div className="sim-resultat table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Âge de départ</th>
                        <th>Trimestres manquants</th>
                        <th>Effet sur la pension de base</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scenarios.map((s) => (
                        <tr key={s.ageDepart}>
                          <td>{s.ageDepart} ans</td>
                          <td className="sim-valeur">{s.trimestresManquants}</td>
                          <td className="sim-valeur">{libelleVariation(s.variationPct)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {res.trimestresManquants > 0 && (
                  <p className="sim-note">
                    Il manque {res.trimestresManquants} trimestre(s) à l'âge de départ choisi. Un versement
                    pour la retraite peut compenser jusqu'à {res.plafondRachat} trimestres ; son coût dépend
                    de votre âge et de vos revenus et n'est pas chiffré ici (à vérifier sur le simulateur
                    officiel).
                  </p>
                )}
              </>
            )}
          </div>

          <div className="prose" style={{ marginTop: "2rem" }}>
            <h2>Hypothèses et limites</h2>
            <ul>
              <li>
                Paramètres légaux utilisés (révisés en {HYPOTHESES_MAJ}) : décote de {pct(REGIME_GENERAL.decoteParTrimestre)} par
                trimestre manquant (plafond de {REGIME_GENERAL.decotePlafondTrimestres} trimestres), surcote de {pct(REGIME_GENERAL.surcoteParTrimestre)} par
                trimestre au-delà de la durée requise et de l'âge légal, décote annulée à {REGIME_GENERAL.ageTauxPleinAutomatique} ans.
              </li>
              <li>L'estimation suppose que vous continuez à valider {TRIMESTRES_PAR_AN} trimestres par an jusqu'à votre départ.</li>
              {DONNEES_A_VERIFIER.map((d) => (
                <li key={d}>{d}.</li>
              ))}
              <li>Source des paramètres : {REGIME_GENERAL.source}.</li>
            </ul>
            <p>
              Pour comprendre le mécanisme : <Link to="/guide/surcote-decote-retraite">surcote et décote</Link>,{" "}
              <Link to="/guide/verifier-releve-de-carriere-retraite">vérifier son relevé de carrière</Link> et{" "}
              <Link to="/guide/combien-coute-rachat-trimestres-retraite">le coût d'un rachat de trimestres</Link>.
            </p>
          </div>

          <div className="container" style={{ maxWidth: "560px", padding: 0 }}>
            <PorteEmail source="outil_decote" parcours={parcours} />
          </div>

          <div className="prose">
            <RiskNotice />
          </div>
        </div>
      </section>

      <CtaBanner
        title="Un trimestre manquant change-t-il vraiment votre date de départ ?"
        button="Bilan retraite gratuit (15 min)"
        to="/bilan-retraite"
      />
    </>
  );
}
