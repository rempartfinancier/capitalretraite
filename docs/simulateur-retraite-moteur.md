# Moteur du simulateur retraite — formules, sources et conventions

Document de revue avant mise en production. Chaque règle ci-dessous correspond
à du code dans `src/lib/simulateur-retraite/` (moteur pur, sans UI) et à un ou
plusieurs tests dans `engine.test.ts` (`npx vitest run src/lib/simulateur-retraite`).
Gabarit repris de `docs/simulateur-moteur.md` (loi Malraux, rempartfinancier.fr).

Ce moteur a été extrait et testé une première fois dans le hub
rempartfinancier.fr (`docs/simulateur-retraite-moteur.md`, historique complet
dans `git log`), puis migré ici tel quel — c'est désormais la version de
référence. Le hub ne garde qu'un résumé et un lien externe vers
`capitalretraite.com/simulateur-retraite` (pas de duplication de contenu).

| Fichier          | Rôle                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------- |
| `hypotheses.ts`  | Toutes les hypothèses chiffrées (taux de remplacement, objectif de niveau de vie, rendement, horizon de décumulation), sourcées et datées — seul fichier à actualiser à chaque révision |
| `engine.ts`      | Fonctions pures : pension estimée, écart de revenu, capital nécessaire/projeté, effort mensuel, scénario optimisé |
| `engine.test.ts` | 20 tests, vecteurs calculés à la main                                                    |

## 1. Pension estimée à la retraite (`hypotheses.ts` → `TAUX_REMPLACEMENT_PAR_STATUT`, `engine.ts` → `calculerPensionEstimee`)

- `pension = revenu net mensuel actuel × taux de remplacement du statut`.
- Taux retenus : salarié 55 %, TNS 42 %, fonctionnaire 75 %, expatrié 50 %.
- **Ce sont des ordres de grandeur pédagogiques**, inspirés des publications
  annuelles du COR (Conseil d'Orientation des Retraites) qui suivent le taux
  de remplacement net moyen par génération et catégorie socio-professionnelle
  — **pas des taux garantis**. La pension réelle dépend du régime
  d'affiliation, de la carrière complète (durée cotisée, salaires portés au
  compte) et de la génération de l'assuré. Valeurs à actualiser sur le
  dernier rapport annuel du COR — À VÉRIFIER avant publication.
- Le statut « expatrié » est la catégorie la plus approximative (dépend
  fortement du pays d'expatriation et des régimes de retraite locaux/CFE) —
  affiché comme tel, aucune source COR ne le documente précisément.

## 2. Écart de revenu et objectif de niveau de vie (`hypotheses.ts` → `OBJECTIF_NIVEAU_VIE_RETRAITE`, `engine.ts` → `calculerEcartMensuel`)

- `écart = max(0, revenu net mensuel actuel × objectif − pension estimée)`.
- Objectif retenu par défaut : **85 %** du revenu actuel (fourchette usuelle
  70–100 % selon les charges de vie, la fiscalité et le statut du logement à
  la retraite) — hypothèse de conseil patrimonial, pas une norme légale.
  Affichée explicitement en UI (note de bas de simulateur), pas un multiple
  caché dans le calcul.
- Paramètre `objectifNiveauViePct` du moteur : optionnel, permet à l'UI de le
  rendre ajustable sans modifier `engine.ts` (non exposé comme curseur dans
  la version actuelle du composant — seul le rendement l'est).

## 3. Capital nécessaire et horizon de décumulation (`hypotheses.ts` → `ESPERANCE_VIE_65`, `HORIZON_DECUMULATION_ANNEES`, `engine.ts` → `calculerCapitalNecessaire`)

- `capital nécessaire = écart mensuel × 12 × horizon de décumulation (années)`.
- **Horizon retenu : 21 ans** — moyenne de l'espérance de vie à 65 ans
  (INSEE, données 2023-2024 : 23 ans pour les femmes, 19 ans pour les
  hommes). Remplace l'ancienne constante « 22 ans » du composant d'origine,
  qui n'était pas sourcée.
- Même structure et même source que
  `capitalretraite.com/src/components/hypotheses.js` →
  `DECUMULATION.esperanceVie65` (pas d'import cross-repo, les deux sites
  étant déployés séparément — les deux fichiers doivent être révisés
  ensemble à chaque millésime).
- **Limite documentée** : le moteur n'a pas de champ « sexe » (simplification
  volontaire) ; il retient donc la moyenne femmes/hommes plutôt qu'une valeur
  différenciée. L'horizon est aussi retenu **indépendamment de l'âge de
  départ choisi** par l'utilisateur (58 à 70 ans) : c'est une approximation
  valable surtout autour de l'âge légal (65 ans), pas recalculée selon l'âge
  de départ simulé. Aucune approximation silencieuse : les deux limites sont
  listées ici et dans la note d'hypothèses affichée sous le simulateur.

## 4. Capital projeté (`engine.ts` → `capitaliser`)

- Capitalisation d'un patrimoine initial + versements mensuels constants, à
  taux mensuel constant : `capitalᵢ₊₁ = capitalᵢ × (1+i) + versement`, soit en
  forme fermée `capital = principal×(1+i)ⁿ + versement×((1+i)ⁿ−1)/i`.
- **Convention : versements en fin de mois** (pas de facteur `(1+i)`
  supplémentaire, à la différence de
  `capitalretraite.com/src/components/Simulateurs.jsx` → `capitalise()` qui
  suppose des versements en début de mois). Conservé tel quel lors de
  l'extraction pour ne pas changer le résultat affiché aux utilisateurs du
  hub ; les deux conventions sont documentées ici pour éviter toute
  confusion si les moteurs sont un jour unifiés.
- `i = 0` traité à part (somme simple) pour éviter une division par zéro.
- `nbMois = 0` (départ immédiat) : le capital projeté vaut exactement le
  patrimoine de départ, quel que soit le taux — testé.

## 5. Effort mensuel supplémentaire (`engine.ts` → `calculerEffortMensuelSupplementaire`)

- Résolution de l'équation de capitalisation pour le versement : si
  `capital manquant = versement × ((1+i)ⁿ−1)/i` (ou `versement × n` si
  `i = 0`), alors `versement = capital manquant / facteur`.
- Effort nul si le capital manquant est nul ou négatif (le capital projeté
  couvre déjà le capital nécessaire) — testé, y compris le cas défensif d'un
  capital manquant négatif (ne devrait pas se produire en pratique, `capital
  manquant` étant déjà plafonné à 0 en amont).

## 6. Scénario optimisé (`hypotheses.ts` → `MAJORATION_SCENARIO_OPTIMISE_PTS`, `REND_OPTIMISE_PLAFOND_PCT`, `engine.ts` → `calculerRendementOptimise`)

- Rendement optimisé = `min(rendement choisi + 1,5 pt, 9 %)` — présenté comme
  une comparaison à titre indicatif (allocation mieux diversifiée), jamais
  comme une promesse de performance.
- Le plafond à 9 % évite d'afficher un scénario optimisé irréaliste quand
  l'utilisateur choisit déjà un rendement élevé sur le curseur.

## 7. Ce que le simulateur ne fait volontairement pas

Pas de fiscalité sur la pension ou les rachats (contrairement aux
simulateurs `SimulateurCapitalisation`/`TableRenteVsRetraits` de
capitalretraite.com, qui eux modélisent la fiscalité par enveloppe) ; pas de
différenciation homme/femme sur l'espérance de vie (cf. §3) ; horizon de
décumulation fixe indépendant de l'âge de départ choisi (cf. §3) ; pas
d'inflation sur le revenu ou les charges pendant la phase d'épargne ; pas de
revalorisation de la pension une fois liquidée. Chaque limite est soit
affichée dans l'UI (note d'hypothèses), soit listée ici — aucune
approximation silencieuse.

## 8. Sources officielles (à vérifier avant publication)

| Règle du moteur                                                         | Source                                                                                                  |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Taux de remplacement par statut (55/42/75/50 %)                          | Ordre de grandeur pédagogique inspiré des publications annuelles du COR (Conseil d'Orientation des Retraites) — À VÉRIFIER, aucun rapport COR précis cité à ce stade |
| Objectif de niveau de vie visé (85 %, fourchette 70–100 %)               | Usage courant en conseil patrimonial — pas une norme légale, À VÉRIFIER                                    |
| Rendement portefeuille (2–8 %, défaut 5 %)                               | Fourchette indicative selon profil de risque — hypothèse de simulation, À VÉRIFIER                         |
| Espérance de vie à 65 ans (23 ans femmes / 19 ans hommes, moyenne 21 ans) | INSEE, données 2023-2024 — À VÉRIFIER (même source que `capitalretraite.com/src/components/hypotheses.js`) |

## 9. Historique

- **Juillet 2026** — extraction du moteur depuis `src/components/simulators/Retraite.tsx`
  du hub rempartfinancier.fr (logique auparavant inline, sans tests).
  Remplacement de l'horizon de décumulation « 22 ans » (non sourcé) par la
  moyenne de l'espérance de vie à 65 ans INSEE (21 ans), sur demande explicite
  d'Alexandre. Ajout du sourcing COR pour les taux de remplacement et
  présentation explicite en UI de l'objectif de niveau de vie et du rendement
  comme hypothèses indicatives plutôt que des valeurs implicites.
- **Juillet 2026** — migration vers capitalretraite.com (`/simulateur-retraite`),
  tests portés de `bun:test` vers `vitest`. Le hub ne conserve plus qu'un
  résumé et un lien externe vers cette page ; le moteur et sa documentation
  n'existent plus que dans ce repo (suppression du doublon côté hub).
