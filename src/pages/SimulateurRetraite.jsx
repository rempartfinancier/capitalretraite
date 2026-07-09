import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CtaBanner } from "../components/Layout.jsx";
import { capitaliser, simulerRetraite } from "../lib/simulateur-retraite/engine";
import {
  HORIZON_DECUMULATION_ANNEES,
  HYPOTHESES_MAJ,
  INCREMENT_EPARGNE_WHATIF,
  OBJECTIF_NIVEAU_VIE_RETRAITE,
  RENDEMENT_PORTEFEUILLE,
  SCENARIO_DEPART_AVANCE_ANS,
  SCENARIO_DEPART_RETARDE_ANS,
  SCORE_RETRAITE_SEUILS,
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

const ETAPES = [
  "Votre situation",
  "Votre retraite estimée",
  "Votre objectif",
  "Votre score retraite",
  "Les pistes",
  "Votre feuille de route",
];

const NIVEAUX_SCORE = {
  excellent: {
    emoji: "🟢",
    label: "Excellent",
    detail: "Votre trajectoire actuelle couvre l'essentiel du capital nécessaire. L'enjeu est de consolider, pas de rattraper.",
  },
  attention: {
    emoji: "🟠",
    label: "Attention",
    detail: "Un écart existe, mais vous avez des leviers : le temps qui reste travaille encore pour vous.",
  },
  critique: {
    emoji: "🔴",
    label: "Écart important",
    detail: "En l'état, la trajectoire ne couvre qu'une faible part du besoin. Plus vous agissez tôt, plus l'effort mensuel restera raisonnable.",
  },
};

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

// Barre horizontale pure CSS (pas de dépendance de charting, site léger).
function Barre({ label, valeur, max, variante }) {
  const pct = max > 0 && valeur > 0 ? Math.max(2, Math.round((valeur / max) * 100)) : 0;
  return (
    <div className="sim-barre-ligne">
      <span className="sim-barre-label">{label}</span>
      <span className="sim-barre-piste">
        <span className={`sim-barre sim-barre-${variante}`} style={{ width: `${pct}%` }} />
      </span>
      <span className="sim-barre-valeur">{euros(valeur)}/mois</span>
    </div>
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

// Les 5 stratégies du site, en orientation (pas en vente) : une ligne
// d'apport, une ligne de vigilance, un lien vers la page dédiée.
const PISTES = [
  {
    nom: "PER",
    to: "/strategies/per",
    apporte:
      "D'abord un outil de protection familiale et de transmission ; la déduction des versements est un report d'imposition, utile selon votre fiscalité.",
    vigilance: "Épargne bloquée jusqu'à la retraite (sauf cas légaux), frais du contrat, fiscalité à la sortie.",
  },
  {
    nom: "Assurance-vie",
    to: "/strategies/assurance-vie-retraite",
    apporte: "Souplesse des rachats à tout moment, fiscalité adoucie après 8 ans, atouts successoraux.",
    vigilance: "Frais d'entrée et de gestion très variables selon les contrats, fonds « maison » peu diversifiés.",
  },
  {
    nom: "PEA",
    to: "/strategies/pea-retraite",
    apporte: "Capitalisation actions de long terme, exonération d'impôt sur les plus-values après 5 ans.",
    vigilance: "Plafond de 150 000 €, univers restreint aux actions ; enveloppe à consommer de son vivant (clôturée au décès).",
  },
  {
    nom: "Immobilier",
    to: "/strategies/immobilier-retraite",
    apporte: "Effet de levier du crédit : le loyer et la banque financent une partie du capital.",
    vigilance: "Coûts complets souvent sous-estimés (notaire, gestion, vacance, fiscalité), liquidité faible.",
  },
  {
    nom: "Décumulation",
    to: "/strategies/decumulation",
    apporte: "L'ordre dans lequel vous puiserez dans vos enveloppes à la retraite pèse autant que leur remplissage.",
    vigilance: "Se prépare avant le départ : fiscalité de sortie et risque de longévité s'anticipent, au cas par cas.",
  },
];

// etapeInitiale : point d'entrée du parcours (1 en production ; les tests
// de rendu s'en servent pour couvrir chaque étape sans navigateur).
export default function SimulateurRetraite({ etapeInitiale = 1 }) {
  const [etape, setEtape] = useState(etapeInitiale);
  const [maxVisitee, setMaxVisitee] = useState(etapeInitiale);

  const [statut, setStatut] = useState("salarie");
  const [age, setAge] = useState(45);
  const [ageDepart, setAgeDepart] = useState(64);
  const [revenu, setRevenu] = useState(4000);
  const [patrimoine, setPatrimoine] = useState(60000);
  const [epargne, setEpargne] = useState(350);
  const [rendement, setRendement] = useState(RENDEMENT_PORTEFEUILLE.moyen);
  const [objectif, setObjectif] = useState(OBJECTIF_NIVEAU_VIE_RETRAITE.options[1]);

  const base = useMemo(
    () => ({
      statut,
      ageActuel: age,
      ageDepart,
      revenuNetMensuel: revenu,
      patrimoineActuel: patrimoine,
      epargneMensuelle: epargne,
      rendementAnnuelPct: rendement,
      objectifNiveauViePct: objectif,
    }),
    [statut, age, ageDepart, revenu, patrimoine, epargne, rendement, objectif]
  );

  const calc = useMemo(() => simulerRetraite(base), [base]);

  // Scénarios comparatifs : mêmes données, une seule hypothèse changée.
  const scenarios = useMemo(() => {
    const departAvance = Math.max(age, ageDepart - SCENARIO_DEPART_AVANCE_ANS);
    const departRetarde = ageDepart + SCENARIO_DEPART_RETARDE_ANS;
    return [
      {
        nom: `Marchés prudents (${RENDEMENT_PORTEFEUILLE.min} %/an)`,
        r: simulerRetraite({ ...base, rendementAnnuelPct: RENDEMENT_PORTEFEUILLE.min }),
      },
      { nom: `Hypothèse retenue (${rendement} %/an)`, r: calc, retenu: true },
      {
        nom: `Marchés porteurs (${RENDEMENT_PORTEFEUILLE.max} %/an)`,
        r: simulerRetraite({ ...base, rendementAnnuelPct: RENDEMENT_PORTEFEUILLE.max }),
      },
      {
        nom: `Départ ${SCENARIO_DEPART_AVANCE_ANS} ans plus tôt (${departAvance} ans)`,
        r: simulerRetraite({ ...base, ageDepart: departAvance }),
      },
      {
        nom: `Départ ${SCENARIO_DEPART_RETARDE_ANS} ans plus tard (${departRetarde} ans)`,
        r: simulerRetraite({ ...base, ageDepart: departRetarde }),
      },
    ];
  }, [base, calc, age, ageDepart, rendement]);

  const gainWhatIf = useMemo(
    () => capitaliser(0, INCREMENT_EPARGNE_WHATIF, calc.nbMoisAvantDepart, rendement / 100 / 12),
    [calc.nbMoisAvantDepart, rendement]
  );

  const jalons = jalonsTrajectoire(calc.trajectoire);
  const niveau = NIVEAUX_SCORE[calc.score.niveau];
  const objectifMensuel = revenu * objectif;
  const maxBarre = Math.max(revenu, calc.pensionEstimeeMensuelle, objectifMensuel, 1);
  const anneesRestantes = Math.max(0, ageDepart - age);

  const aller = (n) => {
    if (n >= 1 && n <= maxVisitee) setEtape(n);
  };
  const suivant = () => {
    const n = Math.min(etape + 1, ETAPES.length);
    setEtape(n);
    setMaxVisitee((m) => Math.max(m, n));
  };
  const precedent = () => setEtape((e) => Math.max(1, e - 1));

  const LABELS_SUIVANT = [
    "Estimer ma retraite →",
    "Choisir mon objectif →",
    "Voir mon score retraite →",
    "Explorer les pistes →",
    "Voir ma feuille de route →",
  ];

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Diagnostic gratuit</span>
          <h1>Votre retraite est-elle vraiment préparée ?</h1>
          <p className="sub">
            Un diagnostic en six étapes, trois minutes : votre score retraite sur 100, la baisse de
            revenus qui vous attend, le capital pour la combler et l'effort d'épargne correspondant.
            Sans compte, sans email obligatoire — toutes les hypothèses sont affichées.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="simulateur">
            <ol className="sim-stepper" aria-label="Étapes du diagnostic">
              {ETAPES.map((titre, i) => {
                const n = i + 1;
                const cls =
                  n === etape ? "est-active" : n <= maxVisitee ? "est-visitee" : "est-a-venir";
                return (
                  <li key={titre} className={`sim-etape-puce ${cls}`}>
                    <button type="button" onClick={() => aller(n)} disabled={n > maxVisitee}>
                      <span className="sim-etape-num">{n}</span>
                      <span className="sim-etape-titre">{titre}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {etape === 1 && (
              <div>
                <p className="sim-titre">Étape 1 — Votre situation</p>
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
                </div>
                <p className="sim-note">
                  Astuce : raisonnez aussi en événements. Une fin de crédit immobilier ou des enfants
                  devenus autonomes libèrent une capacité d'épargne — vous pourrez la tester à
                  l'étape 4 en ajustant l'épargne mensuelle.
                </p>
              </div>
            )}

            {etape === 2 && (
              <div>
                <p className="sim-titre">Étape 2 — Votre retraite estimée</p>
                <div className="sim-resultat">
                  <table>
                    <tbody>
                      <tr>
                        <td>Votre revenu net aujourd'hui</td>
                        <td className="sim-valeur">{euros(revenu)}/mois</td>
                      </tr>
                      <tr>
                        <td>
                          Pension estimée (statut {STATUTS.find((s) => s.value === statut)?.label},
                          taux de remplacement ≈ {Math.round(calc.tauxRemplacement * 100)} %)
                        </td>
                        <td className="sim-valeur">{euros(calc.pensionEstimeeMensuelle)}/mois</td>
                      </tr>
                      <tr>
                        <td>Baisse de revenus estimée</td>
                        <td className="sim-valeur">−{euros(calc.pertes.mensuelle)}/mois</td>
                      </tr>
                      <tr>
                        <td>Soit sur une année</td>
                        <td className="sim-valeur">−{euros(calc.pertes.annuelle)}</td>
                      </tr>
                      <tr>
                        <td>Soit sur {calc.pertes.horizonAnnees} ans de retraite (espérance de vie moyenne à 65 ans)</td>
                        <td className="sim-valeur">−{euros(calc.pertes.surHorizon)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="sim-barres">
                  <Barre label="Aujourd'hui" valeur={revenu} max={maxBarre} variante="revenu" />
                  <Barre label="À la retraite" valeur={calc.pensionEstimeeMensuelle} max={maxBarre} variante="pension" />
                </div>
                <p className="sim-note">
                  Le jour du départ, le revenu ne baisse pas progressivement : il décroche d'un coup.
                  C'est cet écart, cumulé sur toute la retraite, que le capital doit amortir.
                </p>
              </div>
            )}

            {etape === 3 && (
              <div>
                <p className="sim-titre">Étape 3 — Quel niveau de vie voulez-vous conserver ?</p>
                <div className="sim-objectifs" role="group" aria-label="Objectif de niveau de vie">
                  {OBJECTIF_NIVEAU_VIE_RETRAITE.options.map((o) => (
                    <button
                      key={o}
                      type="button"
                      className={`sim-objectif-btn ${o === objectif ? "est-choisi" : ""}`}
                      onClick={() => setObjectif(o)}
                    >
                      <strong>{Math.round(o * 100)} %</strong>
                      <span>{euros(revenu * o)}/mois</span>
                    </button>
                  ))}
                </div>
                <div className="sim-barres">
                  <Barre label="Aujourd'hui" valeur={revenu} max={maxBarre} variante="revenu" />
                  <Barre label="Votre objectif" valeur={objectifMensuel} max={maxBarre} variante="objectif" />
                  <Barre label="Pension estimée" valeur={calc.pensionEstimeeMensuelle} max={maxBarre} variante="pension" />
                  <Barre label="Écart à combler" valeur={calc.ecartMensuel} max={maxBarre} variante="ecart" />
                </div>
                <p className="sim-note">
                  La fourchette usuelle en conseil patrimonial va de 70 à 100 % du revenu d'activité :
                  certaines charges disparaissent à la retraite (trajets, cotisations, souvent le
                  crédit), d'autres augmentent (santé, loisirs). Hypothèse indicative, à ajuster à
                  votre situation.
                </p>
              </div>
            )}

            {etape === 4 && (
              <div>
                <p className="sim-titre">Étape 4 — Votre score retraite</p>
                <div className={`sim-score sim-score-${calc.score.niveau}`}>
                  <div className="sim-score-tete">
                    <span className="sim-score-valeur">
                      {calc.score.valeur}
                      <small>/100</small>
                    </span>
                    <span className="sim-score-niveau">
                      {niveau.emoji} {niveau.label}
                    </span>
                  </div>
                  <div className="sim-score-jauge" role="img" aria-label={`Score retraite : ${calc.score.valeur} sur 100`}>
                    <span style={{ width: `${calc.score.valeur}%` }} />
                  </div>
                  <p className="sim-score-detail">{niveau.detail}</p>
                </div>

                <div className="sim-resultat">
                  <table>
                    <tbody>
                      <tr>
                        <td>Capital nécessaire pour tenir votre objectif pendant {HORIZON_DECUMULATION_ANNEES} ans</td>
                        <td className="sim-valeur">{euros(calc.capitalNecessaire)}</td>
                      </tr>
                      <tr>
                        <td>Capital projeté à {ageDepart} ans avec votre épargne actuelle</td>
                        <td className="sim-valeur">{euros(calc.capitalProjete)}</td>
                      </tr>
                      {calc.capitalManquant > 0 ? (
                        <>
                          <tr>
                            <td>Capital manquant</td>
                            <td className="sim-valeur">{euros(calc.capitalManquant)}</td>
                          </tr>
                          <tr>
                            <td>
                              {calc.nbMoisAvantDepart > 0
                                ? `Effort d'épargne supplémentaire sur les ${anneesRestantes} ans restants`
                                : "Effort d'épargne supplémentaire"}
                            </td>
                            <td className="sim-valeur">
                              {calc.nbMoisAvantDepart > 0 ? `${euros(calc.effortMensuelSupplementaire)}/mois` : "—"}
                            </td>
                          </tr>
                        </>
                      ) : (
                        <tr>
                          <td colSpan={2}>🎉 Votre trajectoire actuelle couvre déjà le capital nécessaire.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {calc.nbMoisAvantDepart === 0 && calc.capitalManquant > 0 && (
                  <p className="sim-note">
                    À l'âge de départ choisi, l'épargne mensuelle n'a plus le temps d'agir : les
                    leviers restants sont le report du départ ou la mobilisation du patrimoine
                    existant — un sujet de bilan, pas de simulateur.
                  </p>
                )}

                <ChampNombre
                  label="Rendement annuel retenu (hypothèse ajustable)"
                  value={rendement}
                  onChange={setRendement}
                  min={RENDEMENT_PORTEFEUILLE.min}
                  max={RENDEMENT_PORTEFEUILLE.max}
                  step={0.5}
                  suffixe="%"
                />

                <p className="sim-titre" style={{ marginTop: "1.6rem", fontSize: "1rem" }}>
                  Et si… ? Cinq scénarios comparés
                </p>
                <div className="sim-resultat table-scroll sim-sans-accent">
                  <table>
                    <thead>
                      <tr>
                        <th>Scénario</th>
                        <th>Capital projeté</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scenarios.map((s) => (
                        <tr key={s.nom} className={s.retenu ? "sim-ligne-retenue" : undefined}>
                          <td>{s.nom}</td>
                          <td className="sim-valeur">{euros(s.r.capitalProjete)}</td>
                          <td className="sim-valeur">
                            {NIVEAUX_SCORE[s.r.score.niveau].emoji} {s.r.score.valeur}/100
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {calc.nbMoisAvantDepart > 0 && (
                  <p className="sim-whatif">
                    💡 {INCREMENT_EPARGNE_WHATIF} €/mois d'épargne en plus dès aujourd'hui, c'est
                    environ <strong>{euros(gainWhatIf)}</strong> de capital supplémentaire à{" "}
                    {ageDepart} ans (à {rendement} %/an — hypothèse, pas une promesse).
                  </p>
                )}

                <p className="sim-titre" style={{ marginTop: "1.6rem", fontSize: "1rem" }}>
                  Trajectoire du capital projeté
                </p>
                <div className="sim-resultat table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Âge</th>
                        <th>Capital projeté (actuel)</th>
                        <th>Capital projeté (optimisé, +1,5 pt)</th>
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
                <p className="sim-note">
                  Score et projections sont des indicateurs pédagogiques calculés à partir de vos
                  données déclaratives et des hypothèses affichées en bas de page — ni un audit, ni
                  un conseil personnalisé.
                </p>
              </div>
            )}

            {etape === 5 && (
              <div>
                <p className="sim-titre">Étape 5 — Les pistes pour combler l'écart</p>
                <p className="sim-note" style={{ marginBottom: "0.8rem" }}>
                  {calc.capitalManquant > 0 ? (
                    <>
                      Objectif : réunir environ <strong>{euros(calc.capitalManquant)}</strong> de plus
                      d'ici {ageDepart} ans.
                    </>
                  ) : (
                    <>Votre trajectoire couvre le besoin : ces pistes servent alors à consolider et à mieux répartir.</>
                  )}{" "}
                  Aucune enveloppe n'est « la meilleure » dans l'absolu — notre analyse : la bonne
                  répartition dépend de votre fiscalité, de votre horizon et de vos projets.
                </p>
                <div className="sim-resultat table-scroll sim-sans-accent">
                  <table>
                    <thead>
                      <tr>
                        <th>Piste</th>
                        <th>Ce que ça apporte</th>
                        <th>Points de vigilance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PISTES.map((p) => (
                        <tr key={p.nom}>
                          <td>
                            <Link to={p.to}>{p.nom}</Link>
                          </td>
                          <td>{p.apporte}</td>
                          <td>{p.vigilance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="sim-note">
                  Pour creuser : <Link to="/strategies">les 5 stratégies expliquées</Link> ou le guide{" "}
                  <Link to="/guide/meilleure-enveloppe-retraite">quelle enveloppe choisir selon votre profil</Link>.
                </p>
              </div>
            )}

            {etape === 6 && (
              <div>
                <p className="sim-titre">Étape 6 — Votre feuille de route</p>
                <ol className="sim-feuille-route">
                  <li>
                    <strong>Votre cap :</strong> conserver {Math.round(objectif * 100)} % de votre
                    niveau de vie, soit {euros(objectifMensuel)}/mois à partir de {ageDepart} ans.
                  </li>
                  <li>
                    <strong>Le chiffre à retenir :</strong> {euros(calc.capitalNecessaire)} de capital
                    nécessaire ; votre trajectoire actuelle en couvre {calc.score.valeur} % (score{" "}
                    {niveau.emoji} {calc.score.valeur}/100).
                  </li>
                  {calc.capitalManquant > 0 && calc.nbMoisAvantDepart > 0 && (
                    <li>
                      <strong>L'effort d'épargne :</strong> passer de {euros(epargne)}/mois à environ{" "}
                      {euros(epargne + calc.effortMensuelSupplementaire)}/mois, à {rendement} %/an
                      d'hypothèse de rendement — ou combiner avec un départ un peu plus tardif (voir
                      les scénarios de l'étape 4).
                    </li>
                  )}
                  {calc.capitalManquant === 0 && (
                    <li>
                      <strong>L'effort d'épargne :</strong> votre rythme actuel de {euros(epargne)}/mois
                      suffit dans les hypothèses retenues — l'enjeu devient la qualité des enveloppes
                      (frais, supports) plus que le montant.
                    </li>
                  )}
                  <li>
                    <strong>La répartition :</strong> ventiler cet effort entre{" "}
                    <Link to="/strategies">les enveloppes adaptées à votre situation</Link> — fiscalité,
                    horizon et projets de transmission se traitent au cas par cas.
                  </li>
                  <li>
                    <strong>Avant le départ :</strong> préparer{" "}
                    <Link to="/strategies/decumulation">l'ordre de décaissement</Link> — par quelle
                    enveloppe commencer à la retraite pèse autant que la constitution du capital.
                  </li>
                  <li>
                    <strong>Le suivi :</strong> refaire ce diagnostic tous les 3 à 5 ans, ou à chaque
                    événement (fin de crédit, évolution de revenus, héritage) — les hypothèses bougent,
                    votre trajectoire aussi.
                  </li>
                </ol>
                <p style={{ marginTop: "1rem" }}>
                  Cette feuille de route est un point de départ générique. Pour la transformer en plan
                  d'action adapté à votre dossier,{" "}
                  <Link to="/bilan-retraite">demandez votre bilan retraite personnalisé gratuit</Link>.
                </p>
              </div>
            )}

            <div className="sim-nav">
              {etape > 1 ? (
                <button type="button" className="btn btn-secondary" onClick={precedent}>
                  ← Précédent
                </button>
              ) : (
                <span />
              )}
              {etape < ETAPES.length && (
                <button type="button" className="btn btn-primary" onClick={suivant}>
                  {LABELS_SUIVANT[etape - 1]}
                </button>
              )}
            </div>

            <p className="maj-note">
              Hypothèses de simulation (revues en {HYPOTHESES_MAJ}) : taux de remplacement par statut —
              ordre de grandeur pédagogique inspiré des publications du COR (Conseil d'Orientation des
              Retraites), pas un taux garanti ; objectif de niveau de vie retenu {Math.round(objectif * 100)} %
              du revenu actuel (fourchette usuelle {Math.round(OBJECTIF_NIVEAU_VIE_RETRAITE.min * 100)}–
              {Math.round(OBJECTIF_NIVEAU_VIE_RETRAITE.max * 100)} %) ; horizon de décumulation retenu :{" "}
              {HORIZON_DECUMULATION_ANNEES} ans (espérance de vie moyenne à 65 ans, INSEE) ; rendement retenu{" "}
              {rendement} %/an (fourchette indicative {RENDEMENT_PORTEFEUILLE.min}–{RENDEMENT_PORTEFEUILLE.max} %,
              pas une performance promise) ; score retraite = part du capital nécessaire couverte par le
              capital projeté (lecture : ≥ {SCORE_RETRAITE_SEUILS.excellent} solide, {SCORE_RETRAITE_SEUILS.attention}–
              {SCORE_RETRAITE_SEUILS.excellent - 1} à surveiller, en dessous écart important — seuils
              pédagogiques, pas une norme). Votre situation réelle dépend de votre régime de retraite, de
              votre carrière et d'autres facteurs propres à votre dossier.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ce diagnostic vous a donné un score. Un bilan vous donnera un plan."
        button="Faire mon bilan retraite gratuit"
        to="/bilan-retraite"
      />
    </>
  );
}
