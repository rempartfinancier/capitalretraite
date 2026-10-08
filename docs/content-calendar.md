# Calendrier éditorial — Guides Capital Retraite

Ce document pilote la routine automatique de publication d'articles (2x/semaine, voir la tâche
planifiée `capitalretraite-content-routine`). Il sert de mémoire persistante entre les exécutions :
chaque run n'a pas accès aux runs précédents, seul ce fichier et `src/routes.jsx` (liste des routes
et métadonnées) font foi, complétés par la liste des fichiers `src/pages/Guide*.jsx`.

## Contexte légal verrouillé — à ne jamais réinventer

- Éditeur : **EXP Capital**, SASU au capital de 1 000 €, RCS Versailles n° 987 986 247, siège social
  25 bis rue de la Côte, 78220 Viroflay. ORIAS n° 25005915.
- Directeur de la publication : **Alexandre Pollet**, conseiller en gestion de patrimoine.
- Hébergeur : Hostinger International Ltd.
- Téléphone affiché : 01 84 16 37 91. CTA principal : `/bilan-retraite` (bilan retraite gratuit de
  15 minutes). CTA secondaire lead magnet : `/guide-audit-assurance-vie` (PDF gratuit).
- Ce site (`capitalretraite.com`) est un site satellite de l'écosystème **Le Rempart Financier**
  (hub : rempartfinancier.fr). Ne jamais réutiliser par défaut l'identité légale d'un autre site du
  réseau (placertresorerie, placement-ethique.fr, placement-halal.fr ont chacun leur propre entité
  éditrice) — toujours relire `src/pages/MentionsLegales.jsx` avant de publier.
- Toutes les hypothèses chiffrées (rendements, frais, barèmes fiscaux, plafonds) vivent dans
  `src/components/hypotheses.js`, daté et sourcé. **Aucun chiffre ne doit être écrit en dur dans un
  article** : toujours importer depuis ce fichier, et le mettre à jour en premier si un chiffre a
  changé depuis la dernière révision (`HYPOTHESES_MAJ`).

## Méthodologie : Big 5 (Marcus Sheridan / They Ask You Answer)

Chaque article doit répondre à une vraie question à forte intention commerciale, en priorité dans
l'un des 5 axes qui génèrent le trafic le plus qualifié pour un public de cadres et fonctionnaires
de 45 à 60 ans préparant leur retraite :

1. **Coûts** — combien ça coûte vraiment (frais, fiscalité, coût de l'inaction).
2. **Risques / Problèmes** — ce qui peut mal tourner, les pièges, les inconvénients tus.
3. **Comparatifs** — X vs Y, chiffré, sans favoriser artificiellement une solution.
4. **Avis** — prise de position assumée, y compris contre un produit tendance ou contre l'intérêt
   commercial à court terme du cabinet.
5. **Best of** — la meilleure option par profil/situation, cadres de décision.

Une 6e catégorie technique, **Mécanique du système de retraite** (surcote/décote, rachat de
trimestres, cumul emploi-retraite), est utilisée pour les sujets structurants qui ne rentrent pas
proprement dans les 5 axes ci-dessus.

### Règles de fond non négociables

- Aucun chiffre de marché volatil (taux actuel précis, rendement récent d'un fonds) présenté comme
  un fait figé — utiliser des ordres de grandeur, des mécaniques et des seuils réglementaires
  stables, toujours via `hypotheses.js`.
- Toute règle fiscale ou légale citée doit être vérifiée par recherche web au moment de la
  rédaction (les seuils changent — ex. LFSS 2026 sur les prélèvements sociaux, plafonds de frais de
  transfert PER modifiés au 24/10/2024) et sourcée.
- Le ton reste direct, chiffré quand c'est défendable, et accepte de nuancer ou de déconseiller un
  produit si c'est justifié (voir les guides « inconvénients » déjà publiés) — jamais de storytelling
  promotionnel creux.
- Aucun conseil personnalisé : contenu éditorial générique, jamais adressé à un cas individuel.
  Chaque article se termine par un encart `RiskNotice` et un renvoi vers `/bilan-retraite` pour la
  mise en œuvre individuelle.
- Format natif du site : chaque guide est un composant React (`src/pages/Guide*.jsx`) suivant
  exactement le schéma des guides existants — `page-header` avec eyebrow, `resume-executif`,
  `sommaire` ancré, sections `<h2 id="...">`, tableau comparatif si pertinent, section FAQ en `<h3>`,
  `AuthorBox`, `RiskNotice`, `CtaBanner`. Ajouter la route dans `src/routes.jsx` (meta SEO +
  breadcrumb) ET dans `src/App.jsx` (import + `<Route>`) ET une entrée dans `src/pages/Guides.jsx`
  (bibliothèque, catégorie la plus pertinente).

## Sujets déjà publiés

La liste exhaustive et à jour est `src/routes.jsx` (chemins commençant par `/guide/` ou
`/strategies/`). Avant de choisir un sujet, **toujours lire ce fichier en premier** pour éviter tout
doublon thématique, même avec un angle différent.

### Run du 2026-10-08 — 1 article ajouté (actualité prioritaire sur le backlog)

- `/guide/abattement-10-pourcent-retraites-plf-2027` — Coûts / Mécanique retraite : l'article 3 du
  PLF 2027 (déposé début octobre 2026) abaisse le plafond de l'abattement de 10 % sur les pensions de
  retraite de 4 439 € à 3 000 € par foyer, dès les revenus 2026. Article supprimé en commission des
  finances le 7 octobre 2026 mais rediscuté en séance sur le texte du gouvernement : **page à mettre
  à jour après le vote définitif de la loi de finances 2027**. Ajout des blocs `ABATTEMENT_PENSIONS`
  et `REVALORISATION_PENSIONS_2027` dans `hypotheses.js` (`HYPOTHESES_MAJ` volontairement laissé à
  « juillet 2026 », les autres hypothèses n'ayant pas été revues). Sujet choisi lors de la veille de
  tendances (budget 2027 visant directement les retraités aux pensions moyennes et élevées) plutôt
  que le premier item du backlog.

### Run du 2026-08-18 — 1 article ajouté (actualité prioritaire sur le backlog)

- `/guide/suspension-reforme-retraites-2026` — Mécanique retraite : l'article 105 de la LFSS 2026 (loi
  n° 2025-1403 du 30 décembre 2025) suspend le calendrier de relèvement de l'âge légal et de la durée
  d'assurance de la réforme de 2023, pour les pensions à effet du 1er septembre 2026, générations 1964
  à 1968. Ajout du bloc `SUSPENSION_REFORME_RETRAITES` dans `hypotheses.js` (calendrier par génération,
  loi, décret d'application n° 2026-345 du 7 mai 2026). Sujet choisi lors de la veille de tendances
  (actualité réelle, imminente — 13 jours avant l'entrée en vigueur au moment de la rédaction — et
  directement pertinente pour l'audience 45-60 ans) plutôt que le premier item du backlog.

### Run du 2026-08-08 — 1 article ajouté (actualité prioritaire sur le backlog)

- `/guide/per-loi-de-finances-2026` — Coûts / Mécanique retraite : la LFSS 2026 (hausse des
  prélèvements sociaux du PER à 18,6 %, assurance-vie et immobilier épargnés à 17,2 %) et la loi de
  finances 2026 (fin de la déductibilité des versements PER après 70 ans), entrées en vigueur au 1er
  janvier 2026. Ajout du champ `perAgeLimiteDeductibiliteVersements` dans `hypotheses.js`. Sujet
  choisi lors de la veille de tendances (actualité réelle et récente, vérifiée par plusieurs sources
  concordantes) plutôt que le premier item du backlog, conformément à la règle de priorité.

### Run du 2026-08-02 — 6 articles ajoutés

- `/guide/inconvenients-du-per` — Risques : les inconvénients du PER (blocage, report fiscal, pari
  sur la TMI future).
- `/guide/pee-percol-retraite` — Comparatif/Coûts : PEE et PERCOL, l'abondement employeur, comment
  les articuler avec un PER individuel.
- `/guide/scpi-ou-locatif-direct` — Comparatif : SCPI vs investissement locatif direct, avec le point
  sur la crise de liquidité des SCPI (2023-2025).
- `/guide/transfert-per-article-83` — Coûts : transférer un ancien contrat article 83 vers un PER,
  frais de transfert plafonnés à 1 % depuis le 24/10/2024 (nuls après 5 ans).
- `/guide/clause-beneficiaire-assurance-vie` — Risques : les cinq erreurs de rédaction de la clause
  bénéficiaire qui coûtent cher à la transmission.
- `/guide/strategie-retraite-par-age` — Best of : cadre de décision retraite par tranche d'âge (45,
  50, 55, 60 ans).

## Backlog priorisé (à consommer dans cet ordre, sauf actualité plus pertinente)

1. **Avis** — Faut-il sortir son PER en capital ou en rente ? Notre avis tranché (distinct de
   `/guide/fiscalite-sortie-per`, qui reste un article de mécanique fiscale — celui-ci est un
   article de décision, façon « Avis » Big 5).
2. **Comparatif** — Compte-titres ordinaire (CTO) ou PEA : que faire au-delà du plafond de
   150 000 € ? (gap identifié, non traité même dans `/guide/inconvenients-du-pea`).
3. **Risques** — Les pièges d'un rachat partiel d'assurance-vie avant 8 ans : fiscalité et mauvais
   timing.
4. **Comparatif** — PER individuel ou PER d'entreprise obligatoire (ex-« article 83 nouvelle
   formule ») pour un dirigeant qui peut choisir : lequel privilégier.
5. **Coûts** — Combien coûte un changement de régime matrimonial pour protéger son conjoint à la
   retraite (angle patrimonial connexe, à vérifier avec un notaire avant publication).
6. **Avis** — Faut-il consolider tous ses vieux contrats retraite en un seul PER, ou les garder
   séparés ? Angle pratique, complémentaire à `/guide/transfert-per-article-83`.
7. **Best of** — Quelle allocation d'actifs pour un PER selon son profil de risque (au-delà de la
   seule gestion pilotée par défaut).
8. **Risques** — Les pièges de la donation-partage entre enfants de lits différents (famille
   recomposée), en complément de `/guide/donation-ou-assurance-vie-transmission`.
9. **Comparatif** — Rente Madelin/article 83 déjà liquidée vs capital d'un PER : peut-on encore
   arbitrer une fois la rente commencée ?
10. **Mécanique retraite** — Trimestres validés à l'étranger et retraite en France : ce qui compte,
    ce qui ne compte pas (profils expatriés/frontaliers, audience potentiellement présente sur ce
    site).
11. **Mécanique retraite (actualité)** — PLFSS 2027, art. 35 : revalorisation différenciée des
    pensions de base au 1er janvier 2027 (pleine sous ~1 260 € bruts/mois, réduite puis gel au-delà
    par paliers). À traiter une fois les paliers stabilisés (les sources divergent à 2 000 € ou
    2 034 € en octobre 2026) — idéalement après le vote de la LFSS 2027.
12. **Mécanique retraite (actualité)** — PLFSS 2027, art. 34 : passage de la majoration de pension
    pour enfants d'un système proportionnel à un forfait (prévu en juillet 2027) — qui gagne, qui
    perd parmi les cadres parents de 3 enfants et plus.
13. **Transmission (actualité)** — PLF 2027, art. 4 : dispositif temporaire de dons exonérés
    (premier semestre 2027) annoncé dans le budget — à vérifier précisément avant rédaction.

Quand un sujet de ce backlog est traité, le retirer de cette liste. Quand la veille de tendances
(étape de la routine) fait émerger une actualité plus porteuse (changement réglementaire, LFSS,
actualité fiscale), la traiter en priorité sur le backlog et ajouter les idées connexes découvertes
en bas de cette liste pour les runs suivants.

## Historique des runs de la routine

_(Ajouté automatiquement par chaque exécution : date, sujet traité, lien PR.)_

- **2026-08-02** — Rédaction initiale : 6 articles (voir liste ci-dessus). PR de mise en place de la
  routine automatique bihebdomadaire (mardi/vendredi 8h, mode PR systématique).
- **2026-08-08** — 1 article : `/guide/per-loi-de-finances-2026` (voir « Sujets déjà publiés »
  ci-dessus pour le détail). PR : https://github.com/rempartfinancier/capitalretraite/pull/2
  (empilée sur la PR #1, `content/seo-batch-2026-08-02`, non encore mergée).
- **2026-08-18** — 1 article : `/guide/suspension-reforme-retraites-2026` (voir « Sujets déjà
  publiés » ci-dessus pour le détail). PR : https://github.com/rempartfinancier/capitalretraite/pull/3
  (empilée sur la PR #2, `content/per-loi-de-finances-2026-2026-08-08`, elle-même non encore mergée).
- **2026-10-08** — 1 article : `/guide/abattement-10-pourcent-retraites-plf-2027` (voir « Sujets déjà
  publiés » ci-dessus pour le détail). PR : lien à venir (empilée sur la PR #3,
  `content/suspension-reforme-retraites-2026-08-18`, non encore mergée).
