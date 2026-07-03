// ============================================================
// Simulateurs pédagogiques — rendus en SSG avec leurs valeurs
// par défaut (le HTML statique contient un résultat complet),
// puis interactifs après hydratation côté client.
// ------------------------------------------------------------
// Aucun taux en dur ici : toutes les valeurs par défaut, les
// barèmes et la date de révision viennent de hypotheses.js.
// API :
//   <SimulateurCapitalisation enveloppe="per" />   (per | av | pea)
//   <TableRenteVsRetraits />
// ============================================================

import { useState } from "react";
import {
  HYPOTHESES_MAJ,
  FISCALITE,
  DECUMULATION,
  SIMU_DEFAUTS,
  euros,
} from "./hypotheses.js";

function HypothesesBadge() {
  return (
    <p className="maj-note">
      Hypothèses par défaut révisées en <strong>{HYPOTHESES_MAJ}</strong> — modifiez-les librement
      ci-dessus. Simulation à visée pédagogique : ce n'est ni une promesse de rendement, ni un
      conseil personnalisé. Les performances passées ne préjugent pas des performances futures.
    </p>
  );
}

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

function ChampSelect({ label, value, onChange, options, suffixe }) {
  return (
    <label className="sim-champ">
      <span className="sim-label">{label}</span>
      <span className="sim-input-wrap">
        <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
              {suffixe || ""}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}

// Capital atteint par des versements mensuels constants (versements en début
// de mois), à taux annuel net constant. Hypothèse simplificatrice assumée :
// aucun rendement réel n'est linéaire.
function capitalise(versementMensuel, dureeAnnees, tauxAnnuelPct) {
  const n = Math.max(0, Math.round(dureeAnnees * 12));
  const taux = tauxAnnuelPct / 100;
  if (n === 0) return 0;
  if (Math.abs(taux) < 1e-9) return versementMensuel * n;
  const i = Math.pow(1 + taux, 1 / 12) - 1;
  return versementMensuel * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

export function SimulateurCapitalisation({ enveloppe = "av" }) {
  const [versement, setVersement] = useState(SIMU_DEFAUTS.versementMensuel);
  const [duree, setDuree] = useState(SIMU_DEFAUTS.dureeAnnees);
  const [rendement, setRendement] = useState(SIMU_DEFAUTS.rendementAnnuel);
  const [frais, setFrais] = useState(SIMU_DEFAUTS.fraisAnnuels);
  const [tmiActuelle, setTmiActuelle] = useState(SIMU_DEFAUTS.tmiActuelle);
  const [tmiRetraite, setTmiRetraite] = useState(SIMU_DEFAUTS.tmiRetraite);
  const [couple, setCouple] = useState(0);

  const rendementNet = rendement - frais;
  const capital = capitalise(versement, duree, rendementNet);
  const versements = versement * Math.round(duree * 12);
  const gains = Math.max(0, capital - versements);
  // Taux de prélèvements sociaux propre à l'enveloppe (LFSS 2026 : hausse à
  // 18,6 % pour PER/PEA/CTO, assurance-vie maintenue à 17,2 %).
  const psTaux =
    enveloppe === "per"
      ? FISCALITE.prelevementsSociaux.per
      : enveloppe === "av"
      ? FISCALITE.prelevementsSociaux.assuranceVie
      : FISCALITE.prelevementsSociaux.pea;
  const ps = psTaux / 100;

  let lignes = [];
  let noteFiscale = "";

  if (enveloppe === "per") {
    const economieEntree = versements * (tmiActuelle / 100);
    const effortReel = versements - economieEntree;
    const impotSortie = versements * (tmiRetraite / 100) + gains * (FISCALITE.pfuIR / 100 + ps);
    const net = capital - impotSortie;
    lignes = [
      ["Versements cumulés", euros(versements)],
      [`Économie d'impôt à l'entrée (TMI ${tmiActuelle} %)`, euros(economieEntree)],
      ["Effort d'épargne réel", euros(effortReel)],
      ["Capital brut à terme", euros(capital)],
      ["dont gains", euros(gains)],
      [`Fiscalité estimée à la sortie en capital (TMI retraite ${tmiRetraite} %)`, "− " + euros(impotSortie)],
      ["Capital net perçu (estimation)", euros(net)],
    ];
    noteFiscale =
      "Hypothèses : versements déduits à l'entrée ; sortie en capital en une seule fois — la part des versements est alors imposée au barème (TMI retraite choisie), les gains au prélèvement forfaitaire de " +
      (FISCALITE.pfuIR + psTaux).toFixed(1).replace(".", ",") +
      " % (dont " +
      psTaux +
      " % de prélèvements sociaux, taux PER). Un retrait fractionné sur plusieurs années peut sensiblement adoucir la note. Hors contribution exceptionnelle sur les hauts revenus.";
  } else if (enveloppe === "av") {
    const abattement = couple ? FISCALITE.avAbattementAnnuelCouple : FISCALITE.avAbattementAnnuelSeul;
    const gainsImposables = Math.max(0, gains - abattement);
    const impotSortie = gainsImposables * (FISCALITE.avTauxReduitApres8Ans / 100) + gains * ps;
    const net = capital - impotSortie;
    lignes = [
      ["Versements cumulés", euros(versements)],
      ["Capital brut à terme", euros(capital)],
      ["dont gains", euros(gains)],
      [`Abattement sur les gains (contrat > 8 ans, ${couple ? "couple" : "personne seule"})`, euros(abattement)],
      ["Fiscalité estimée au rachat total", "− " + euros(impotSortie)],
      ["Capital net perçu (estimation)", euros(net)],
    ];
    noteFiscale =
      "Hypothèses : contrat de plus de 8 ans, versements inférieurs à 150 000 €, rachat total en une seule fois (l'abattement ne joue donc qu'une année) — gains imposés à " +
      FISCALITE.avTauxReduitApres8Ans +
      " % après abattement, plus " +
      psTaux +
      " % de prélèvements sociaux (taux assurance-vie, non concerné par la hausse LFSS 2026). Des rachats étalés sur plusieurs années utilisent l'abattement chaque année et réduisent encore l'impôt.";
  } else {
    const impotSortie = gains * ps;
    const net = capital - impotSortie;
    lignes = [
      ["Versements cumulés", euros(versements)],
      ["Capital brut à terme", euros(capital)],
      ["dont gains", euros(gains)],
      ["Prélèvements sociaux au retrait (plan > 5 ans)", "− " + euros(impotSortie)],
      ["Capital net perçu (estimation)", euros(net)],
    ];
    noteFiscale =
      "Hypothèses : plan de plus de " +
      FISCALITE.peaExonerationIRApres +
      " ans — plus-values exonérées d'impôt sur le revenu, prélèvements sociaux de " +
      psTaux +
      " % dus sur les gains (taux PEA, LFSS 2026).";
  }

  return (
    <div className="simulateur" data-enveloppe={enveloppe}>
      <p className="sim-titre">
        Simulez votre capitalisation
        {enveloppe === "per" ? " sur un PER" : enveloppe === "av" ? " en assurance-vie" : " sur un PEA"}
      </p>
      <div className="sim-grille">
        <ChampNombre label="Versement mensuel" value={versement} onChange={setVersement} min={0} max={10000} step={50} suffixe="€" />
        <ChampNombre label="Durée" value={duree} onChange={setDuree} min={1} max={40} step={1} suffixe="ans" />
        <ChampNombre label="Rendement annuel moyen (hypothèse)" value={rendement} onChange={setRendement} min={0} max={12} step={0.5} suffixe="%" />
        <ChampNombre label="Frais annuels du contrat" value={frais} onChange={setFrais} min={0} max={4} step={0.1} suffixe="%" />
        {enveloppe === "per" && (
          <>
            <ChampSelect label="TMI pendant la vie active" value={tmiActuelle} onChange={setTmiActuelle} options={FISCALITE.tmiOptions} suffixe=" %" />
            <ChampSelect label="TMI anticipée à la retraite" value={tmiRetraite} onChange={setTmiRetraite} options={FISCALITE.tmiOptions} suffixe=" %" />
          </>
        )}
        {enveloppe === "av" && (
          <label className="sim-champ">
            <span className="sim-label">Situation fiscale</span>
            <span className="sim-input-wrap">
              <select value={couple} onChange={(e) => setCouple(Number(e.target.value))}>
                <option value={0}>Personne seule</option>
                <option value={1}>Couple (imposition commune)</option>
              </select>
            </span>
          </label>
        )}
      </div>
      <div className="sim-resultat">
        <table>
          <tbody>
            {lignes.map(([libelle, valeur]) => (
              <tr key={libelle}>
                <td>{libelle}</td>
                <td className="sim-valeur">{valeur}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="sim-note">{noteFiscale} Rendement net de frais retenu dans le calcul : {rendementNet.toFixed(1).replace(".", ",")} % par an.</p>
      </div>
      <HypothesesBadge />
    </div>
  );
}

// Simule l'épuisement d'un capital soumis à retraits annuels constants :
// retrait en début d'année, le solde restant est revalorisé au taux choisi.
function simuleRetraits(capitalInitial, retraitAnnuel, tauxPct, annees) {
  let cap = capitalInitial;
  let totalPercu = 0;
  const taux = tauxPct / 100;
  for (let a = 0; a < annees; a++) {
    if (cap <= 0) break;
    const retrait = Math.min(cap, retraitAnnuel);
    totalPercu += retrait;
    cap = (cap - retrait) * (1 + taux);
  }
  return { totalPercu, capitalRestant: Math.max(0, cap) };
}

function ageEpuisement(capitalInitial, retraitAnnuel, tauxPct, ageDepart) {
  let cap = capitalInitial;
  const taux = tauxPct / 100;
  for (let a = 0; a < 60; a++) {
    if (cap < retraitAnnuel) return ageDepart + a;
    cap = (cap - retraitAnnuel) * (1 + taux);
  }
  return null; // le capital n'est jamais épuisé sur 60 ans
}

export function TableRenteVsRetraits() {
  const [capital, setCapital] = useState(SIMU_DEFAUTS.capitalDecumulation);
  const [tauxRente, setTauxRente] = useState(DECUMULATION.tauxConversionRente65.defaut);
  const [rendement, setRendement] = useState(DECUMULATION.rendementCapitalPendantRetraits);
  const ageDepart = SIMU_DEFAUTS.ageDepart;

  const renteAnnuelle = capital * (tauxRente / 100);
  // Comparaison à revenu identique : les retraits programmés servent le même
  // montant annuel que la rente, tant que le capital le permet.
  const [retraitAnnuel, setRetraitAnnuel] = useState(() => Math.round(renteAnnuelle));

  const ages = [75, 80, 85, 90, 95, 100];
  const epuise = ageEpuisement(capital, retraitAnnuel, rendement, ageDepart);

  return (
    <div className="simulateur">
      <p className="sim-titre">Rente viagère ou retraits programmés : comparez selon la durée de vie</p>
      <div className="sim-grille">
        <ChampNombre label="Capital au départ en retraite" value={capital} onChange={setCapital} min={10000} max={2000000} step={10000} suffixe="€" />
        <ChampNombre label="Taux de conversion en rente (à 65 ans)" value={tauxRente} onChange={setTauxRente} min={2} max={8} step={0.1} suffixe="%" />
        <ChampNombre label="Retrait annuel programmé" value={retraitAnnuel} onChange={setRetraitAnnuel} min={1000} max={200000} step={500} suffixe="€" />
        <ChampNombre label="Rendement du capital pendant les retraits" value={rendement} onChange={setRendement} min={0} max={8} step={0.5} suffixe="%" />
      </div>
      <p className="sim-note">
        Rente annuelle correspondante : <strong>{euros(renteAnnuelle)}</strong> à vie (capital aliéné, avant
        fiscalité, sans option de réversion).{" "}
        {epuise
          ? `Au rythme de retrait choisi, le capital s'épuiserait vers ${epuise} ans.`
          : "Au rythme de retrait choisi, le capital n'est pas épuisé sur la durée simulée."}
      </p>
      <div className="sim-resultat table-scroll">
        <table>
          <thead>
            <tr>
              <th>Décès à…</th>
              <th>Rente : total perçu</th>
              <th>Rente : capital transmis</th>
              <th>Retraits : total perçu</th>
              <th>Retraits : capital transmis</th>
            </tr>
          </thead>
          <tbody>
            {ages.map((age) => {
              const annees = age - ageDepart;
              const r = simuleRetraits(capital, retraitAnnuel, rendement, annees);
              return (
                <tr key={age}>
                  <td>
                    {age} ans <span className="sim-detail">({annees} ans de retraite)</span>
                  </td>
                  <td className="sim-valeur">{euros(renteAnnuelle * annees)}</td>
                  <td className="sim-valeur">0 €</td>
                  <td className="sim-valeur">{euros(r.totalPercu)}</td>
                  <td className="sim-valeur">{euros(r.capitalRestant)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="sim-note">
        Montants bruts, avant fiscalité — le régime fiscal d'une rente viagère et celui de rachats
        diffèrent selon l'enveloppe d'origine (voir plus haut). Le taux de conversion réel dépend de
        votre âge, du contrat et des options choisies (réversion, annuités garanties).
      </p>
      <HypothesesBadge />
    </div>
  );
}
