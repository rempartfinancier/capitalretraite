import { useState } from "react";
import { FormEmailOutil } from "./Forms.jsx";
import { pushEvent } from "./tracking.js";

export function ChampNombre({ label, value, onChange, min, max, step = 1, suffixe, aide }) {
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
      {aide && <span className="sim-detail">{aide}</span>}
    </label>
  );
}

export function ChampListe({ label, value, onChange, options }) {
  return (
    <label className="sim-champ">
      <span className="sim-label">{label}</span>
      <span className="sim-input-wrap">
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}

// Suivi du parcours d'un outil : simulateur_start au premier changement d'un champ,
// simulateur_complete quand le visiteur demande le détail par email (résultat déjà vu).
export function useParcoursOutil(outil) {
  const [demarre, setDemarre] = useState(false);
  return {
    touche() {
      if (!demarre) {
        setDemarre(true);
        pushEvent("simulateur_start", { outil });
      }
    },
    termine() {
      pushEvent("simulateur_complete", { outil });
    },
  };
}

// Bloc « recevoir le détail » : le résultat est affiché AVANT, l'email vient après.
export function PorteEmail({ source, parcours }) {
  const [ouvert, setOuvert] = useState(false);
  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Recevoir le détail par email</h2>
      {!ouvert ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            parcours?.termine();
            setOuvert(true);
          }}
        >
          Recevoir le détail par email
        </button>
      ) : (
        <FormEmailOutil source={source} />
      )}
    </div>
  );
}
