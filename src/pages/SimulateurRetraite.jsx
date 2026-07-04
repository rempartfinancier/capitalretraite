import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CtaBanner } from "../components/Layout.jsx";
import { simulerRetraite } from "../lib/simulateur-retraite/engine";
import {
  HORIZON_DECUMULATION_ANNEES,
  HYPOTHESES_MAJ,
  OBJECTIF_NIVEAU_VIE_RETRAITE,
  RENDEMENT_PORTEFEUILLE,
} from "../lib/simulateur-retraite/hypotheses";

const euros = (n) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
    Math.round(n)
  );

const STATUTS = [
  { value: "salarie", label: "Salarié" },
  { value: "tns", label: "TNS / indépendant" },
  { value: "fonctionnaire", label: "Fonctionnaire" },
  { value: "expatrie", label: "Expatrié" },
];

function ChampNombre({ label, value, onChange, min, max, step = 1, suffixe }) {
  return (
    <label className="sim-champ">
      <span className="sim-label">{label}</span>
      <span className="sim-input-wrap">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          inputMode="decimal"
        />
        {suffixe && <span className="sim-suffixe">{suffixe}</span>}
      </span>
    </label>
  );
}

function ChampSelect({ label, value, onChange, options }) {
  return (
    <label className="sim-champ">
      <span className="sim-label">{label}</span>
      <span className="sim-input-wrap">
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}

// Milestones lisibles pour la table de trajectoire : âge de départ +
// quelques jalons intermédiaires tous les 5 ans, jamais plus de 6 lignes.
function jalonsTrajectoire(trajectoire) {
  if (trajectoire.length <= 6) return trajectoire;
  const dernier = trajectoire[trajectoire.length - 1];
  const pas = Math.ceil((trajectoire.length - 1) / 5);
  const jalons = trajectoire.filter((_, i) => i % pas === 0);
  if (jalons[jalons.length - 1]?.age !== dernier.age) jalons.push(dernier);
  return jalons;
}

export default function SimulateurRetraite() {
  const [statut, setStatut] = useState("salarie");
  const [age, setAge] = useState(45);
  const [ageDepart, setAgeDepart] = useState(64);
  const [revenu, setRevenu] = useState(4000);
  const [patrimoine, setPatrimoine] = useState(60000);
  const [epargne, setEpargne] = useState(350);
  const [rendement, setRendement] = useState(RENDEMENT_PORTEFEUILLE.moyen);

  const calc = useMemo(
    () =>
      simulerRetraite({
        statut,
        ageActuel: age,
        ageDepart,
        revenuNetMensuel: revenu,
        patrimoineActuel: patrimoine,
        epargneMensuelle: epargne,
        rendementAnnuelPct: rendement,
      }),
    [statut, age, ageDepart, revenu, patrimoine, epargne, rendement]
  );

  const jalons = jalonsTrajectoire(calc.trajectoire);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Simulateur gratuit</span>
          <h1>Combien vous manquera-t-il vraiment à la retraite ?</h1>
          <p className="sub">
            Trois minutes pour estimer votre écart de revenus à la retraite, le capital dont vous
            auriez besoin pour le combler, et l'effort d'épargne mensuel correspondant. Sans compte,
            sans email obligatoire.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="simulateur">
            <p className="sim-titre">Votre situation</p>
            <div className="sim-grille">
              <ChampSelect label="Votre statut" value={statut} onChange={setStatut} options={STATUTS} />
              <ChampNombre label="Âge actuel" value={age} onChange={setAge} min={20} max={65} suffixe="ans" />
              <ChampNombre
                label="Âge de départ souhaité"
                value={ageDepart}
                onChange={setAgeDepart}
                min={58}
                max={70}
                suffixe="ans"
              />
              <ChampNombre
                label="Revenu net mensuel"
                value={revenu}
                onChange={setRevenu}
                min={0}
                max={30000}
                step={100}
                suffixe="€"
              />
              <ChampNombre
                label="Patrimoine financier déjà constitué"
                value={patrimoine}
                onChange={setPatrimoine}
                min={0}
                max={2000000}
                step={1000}
                suffixe="€"
              />
              <ChampNombre
                label="Épargne mensuelle actuelle"
                value={epargne}
                onChange={setEpargne}
                min={0}
                max={10000}
                step={50}
                suffixe="€"
              />
              <ChampNombre
                label="Rendement annuel retenu (hypothèse)"
                value={rendement}
                onChange={setRendement}
                min={RENDEMENT_PORTEFEUILLE.min}
                max={RENDEMENT_PORTEFEUILLE.max}
                step={0.5}
                suffixe="%"
              />
            </div>

            <div className="sim-resultat">
              <table>
                <tbody>
                  <tr>
                    <td>Pension estimée à la retraite</td>
                    <td className="sim-valeur">{euros(calc.pensionEstimeeMensuelle)}/mois</td>
                  </tr>
                  <tr>
                    <td>Écart mensuel à combler</td>
                    <td className="sim-valeur">{euros(calc.ecartMensuel)}/mois</td>
                  </tr>
                  <tr>
                    <td>Capital nécessaire à la retraite</td>
                    <td className="sim-valeur">{euros(calc.capitalNecessaire)}</td>
                  </tr>
                  <tr>
                    <td>Capital projeté à l'âge de départ choisi</td>
                    <td className="sim-valeur">{euros(calc.capitalProjete)}</td>
                  </tr>
                  {calc.capitalManquant > 0 ? (
                    <tr>
                      <td>Effort mensuel supplémentaire pour combler l'écart</td>
                      <td className="sim-valeur">{euros(calc.effortMensuelSupplementaire)}/mois</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={2}>🎉 Votre trajectoire actuelle couvre déjà le capital nécessaire.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {calc.capitalManquant > 0 && (
                <p className="sim-note">
                  Avec une allocation optimisée (+1,5 pt de rendement, plafonnée à {RENDEMENT_PORTEFEUILLE.max + 1.5}{" "}
                  %), le capital projeté atteindrait <strong>{euros(calc.capitalProjeteOptimise)}</strong> au même
                  âge de départ.
                </p>
              )}
            </div>

            <p className="sim-titre" style={{ marginTop: "1.6rem", fontSize: "1rem" }}>
              Trajectoire du capital projeté
            </p>
            <div className="sim-resultat table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Âge</th>
                    <th>Capital projeté (actuel)</th>
                    <th>Capital projeté (optimisé)</th>
                  </tr>
                </thead>
                <tbody>
                  {jalons.map((p) => (
                    <tr key={p.age}>
                      <td>{p.age} ans</td>
                      <td className="sim-valeur">{euros(p.capitalActuel)}</td>
                      <td className="sim-valeur">{euros(p.capitalOptimise)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="maj-note">
              Hypothèses de simulation (revues en {HYPOTHESES_MAJ}) : taux de remplacement par statut — ordre de
              grandeur pédagogique inspiré des publications du COR (Conseil d'Orientation des Retraites), pas un
              taux garanti ; objectif de niveau de vie visé {Math.round(OBJECTIF_NIVEAU_VIE_RETRAITE.moyen * 100)} %
              du revenu actuel (fourchette usuelle {Math.round(OBJECTIF_NIVEAU_VIE_RETRAITE.min * 100)}–
              {Math.round(OBJECTIF_NIVEAU_VIE_RETRAITE.max * 100)} %) ; horizon de décumulation retenu :{" "}
              {HORIZON_DECUMULATION_ANNEES} ans (espérance de vie moyenne à 65 ans, INSEE) ; rendement retenu{" "}
              {rendement} %/an (fourchette indicative {RENDEMENT_PORTEFEUILLE.min}–{RENDEMENT_PORTEFEUILLE.max} %,
              pas une performance promise). Votre situation réelle dépend de votre régime de retraite, de votre
              carrière et d'autres facteurs propres à votre dossier.
            </p>
          </div>

          <p style={{ marginTop: "1rem" }}>
            Cette estimation est un point de départ. Pour aller plus loin,{" "}
            <Link to="/bilan-retraite">demandez votre bilan retraite personnalisé gratuit</Link>.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Cette estimation vous a donné un chiffre. Un bilan vous donnera un plan."
        button="Faire mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
