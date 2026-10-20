import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { ChampNombre, PorteEmail, useParcoursOutil } from "../components/ChampsOutil.jsx";
import { FRAIS_TYPES, HYPOTHESES_MAJ, SIMU_DEFAUTS, euros, pct } from "../components/hypotheses.js";
import { TYPES_CONTRAT, comparerContrats } from "../lib/outils/frais.js";

const plage = (min, max, fmt) => (min === max ? fmt(min) : `${fmt(min)} à ${fmt(max)}`);

export default function OutilFrais() {
  const [capitalInitial, setCapitalInitial] = useState(10000);
  const [versementMensuel, setVersementMensuel] = useState(SIMU_DEFAUTS.versementMensuel);
  const [dureeAnnees, setDureeAnnees] = useState(SIMU_DEFAUTS.dureeAnnees);
  const [rendementBrutPct, setRendementBrutPct] = useState(SIMU_DEFAUTS.rendementAnnuel);
  const parcours = useParcoursOutil("frais");

  const maj = (setter) => (v) => {
    parcours.touche();
    setter(v);
  };

  const res = useMemo(
    () => comparerContrats({ capitalInitial, versementMensuel, dureeAnnees, rendementBrutPct }),
    [capitalInitial, versementMensuel, dureeAnnees, rendementBrutPct]
  );

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Outil gratuit</span>
          <h1>Combien vous coûtent vraiment les frais de votre PER ou de votre assurance-vie ?</h1>
          <p className="sub">
            Une fourchette, pas une promesse : l'effet cumulé des frais sur la durée, avec toutes
            les hypothèses affichées. Aucun email n'est demandé pour voir le résultat.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="simulateur">
            <p className="sim-titre">Vos paramètres</p>
            <div className="sim-grille">
              <ChampNombre label="Capital déjà placé" value={capitalInitial} onChange={maj(setCapitalInitial)} min={0} max={5000000} step={1000} suffixe="€" />
              <ChampNombre label="Versement mensuel" value={versementMensuel} onChange={maj(setVersementMensuel)} min={0} max={10000} step={50} suffixe="€" />
              <ChampNombre label="Durée" value={dureeAnnees} onChange={maj(setDureeAnnees)} min={1} max={40} suffixe="ans" />
              <ChampNombre
                label="Rendement brut annuel (hypothèse)"
                value={rendementBrutPct}
                onChange={maj(setRendementBrutPct)}
                min={0}
                max={12}
                step={0.5}
                suffixe="%"
                aide="Hypothèse de calcul avant frais, modifiable : ce n'est pas une prévision."
              />
            </div>

            <div className="sim-resultat table-scroll" aria-live="polite">
              <table>
                <thead>
                  <tr>
                    <th>Sur {dureeAnnees} ans</th>
                    {[res.a, res.b].map((r) => (
                      <th key={r.typeContrat}>{TYPES_CONTRAT[r.typeContrat]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Frais d'entrée sur les versements</td>
                    {[res.a, res.b].map((r) => (
                      <td key={r.typeContrat} className="sim-valeur">{plage(r.fraisEntreePct.min, r.fraisEntreePct.max, pct)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Frais annuels (gestion + supports)</td>
                    {[res.a, res.b].map((r) => (
                      <td key={r.typeContrat} className="sim-valeur">{plage(r.fraisAnnuelsPct.min, r.fraisAnnuelsPct.max, pct)} par an</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Capital à terme après frais</td>
                    {[res.a, res.b].map((r) => (
                      <td key={r.typeContrat} className="sim-valeur">{plage(r.capitalFinal.min, r.capitalFinal.max, euros)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Coût cumulé des frais</td>
                    {[res.a, res.b].map((r) => (
                      <td key={r.typeContrat} className="sim-valeur">{plage(r.coutTotal.min, r.coutTotal.max, euros)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="sim-note">
              Pour comparaison, le même placement sans aucun frais atteindrait {euros(res.a.sansFrais)}
              {" "}dans cette hypothèse. Ce chiffre est théorique : aucun contrat n'est gratuit.
            </p>
          </div>

          <div className="prose" style={{ marginTop: "2rem" }}>
            <h2>Hypothèses utilisées</h2>
            <ul>
              <li>
                Grilles de frais (révisées en {HYPOTHESES_MAJ}) : contrat traditionnel — entrée{" "}
                {plage(FRAIS_TYPES.contratBancaireTraditionnel.entree.min, FRAIS_TYPES.contratBancaireTraditionnel.entree.max, pct)},
                gestion {plage(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min, FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max, pct)} par an,
                supports {plage(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min, FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max, pct)} par an ;
                contrat en ligne — entrée {plage(FRAIS_TYPES.contratInternet.entree.min, FRAIS_TYPES.contratInternet.entree.max, pct)},
                gestion {plage(FRAIS_TYPES.contratInternet.gestionAnnuelle.min, FRAIS_TYPES.contratInternet.gestionAnnuelle.max, pct)} par an,
                supports {plage(FRAIS_TYPES.contratInternet.fraisSupports.min, FRAIS_TYPES.contratInternet.fraisSupports.max, pct)} par an.
              </li>
              <li>La fourchette va des frais les plus bas aux frais les plus hauts de chaque grille.</li>
              <li>Frais d'arbitrage, fiscalité et frais de mandat éventuels : non inclus.</li>
              <li>
                Ces grilles décrivent des contrats d'assurance-vie ; elles sont appliquées au PER par
                analogie. Les frais réels d'un PER donné sont à vérifier sur son document
                d'informations clés. Sources : {FRAIS_TYPES.contratBancaireTraditionnel.source}.
              </li>
              <li>Vos frais exacts figurent dans votre relevé annuel et dans le DIC de chaque support.</li>
            </ul>
            <p>
              Pour aller plus loin :{" "}
              <Link to="/guide/combien-coute-un-per">combien coûte un PER</Link>,{" "}
              <Link to="/guide/combien-coute-une-assurance-vie">combien coûte une assurance-vie</Link> et{" "}
              <Link to="/guide-audit-assurance-vie">la grille d'audit assurance-vie</Link>.
            </p>
          </div>

          <div className="container" style={{ maxWidth: "560px", padding: 0 }}>
            <PorteEmail source="outil_frais" parcours={parcours} />
          </div>

          <div className="prose">
            <RiskNotice />
          </div>
        </div>
      </section>

      <CtaBanner
        title="Un écart avec votre contrat ? Relisons-le ensemble."
        button="Bilan retraite gratuit (15 min)"
        to="/bilan-retraite"
      />
    </>
  );
}
