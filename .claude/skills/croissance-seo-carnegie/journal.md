# Journal — routine croissance SEO Carnegie (capitalretraite.com)

## Cycle 001 — 2026-08-21 → 2026-09-04 (14 jours)

Premier cycle : aucun journal préexistant, Phase 1 (bilan) sautée conformément au skill.
Session cloud automatisée (déclenchement planifié du vendredi), branche `claude/zen-fermi-bggcma`.

### Phase 2 — Recherche mots-clés & angle

- Gap identifié dans la catégorie PER (6 guides existants) : aucun contenu sur le
  **déblocage anticipé du PER**. Sujet à forte intention de recherche (confirmé par
  WebSearch : plusieurs cabinets concurrents — france-epargne.fr, altis-conseil.fr,
  avnear.fr, hagnere-patrimoine.fr, laplace-groupe.com, gps-patrimoine.fr,
  occitassur.fr, etsa-patrimoine.com — publient tous un article "6 cas de déblocage
  anticipé du PER" millésimé 2026, signe d'un volume de recherche réel).
  Angle Big 5 : "problèmes" (lever l'objection n°1 contre l'ouverture d'un PER —
  "mon argent est bloqué"). Complète naturellement `/guide/faut-il-ouvrir-un-per` et
  `/guide/fiscalite-sortie-per` sans les dupliquer (ceux-ci mentionnent les 6 cas en
  une phrase ; le nouveau guide les détaille un par un avec la fiscalité de chacun).
  Ne viole pas la règle anti-cannibalisation SCPI (sujet PER pur).
- Sources tierces candidates repérées pour citation (Phase 3) : **aucune n'a pu être
  citée avec un lien sortant ce cycle** — voir limite technique ci-dessous.

### Phase 3 — Production

- Guide publié (en attente de relecture Alexandre) :
  **"Déblocage anticipé du PER : les 6 cas pour récupérer son épargne"**
  — `/guide/deblocage-anticipe-per` — catégorie **PER** dans `src/pages/Guides.jsx`
  (7ᵉ guide de la catégorie).
- Câblage technique complet : `src/pages/GuideDeblocageAnticipePer.jsx` créé,
  enregistré dans `src/routes.jsx` (title/description/breadcrumb),
  importé et routé dans `src/App.jsx`, ajouté dans `src/pages/Guides.jsx`,
  ajouté dans `public/sitemap.xml` (priorité 0.7, cohérente avec les guides PER
  existants).
- Maillage interne :
  - **Sortant** (2 liens, depuis le nouveau guide) : `/guide/fiscalite-sortie-per`,
    `/guide/faut-il-ouvrir-un-per` (×2 occurrences dans le corps), plus
    `/guide/combien-coute-un-per` et `/strategies/per` en synthèse.
  - **Entrant** (2 liens, depuis des guides existants vers le nouveau) :
    - `src/pages/GuideFautIlOuvrirPer.jsx`, section "besoin-fonds" — phrase ajoutée
      renvoyant vers le guide de déblocage.
    - `src/pages/GuideFiscaliteSortiePer.jsx`, en tête d'article — paragraphe ajouté
      distinguant sortie à la retraite (ce guide) vs déblocage anticipé (nouveau
      guide).
  - Présence confirmée dans `public/sitemap.xml`.
- Vérifications techniques : `bun run typecheck` OK, `bun run test` OK (36/36),
  `bun run build` OK — 52/52 pages prerendues (51 → 52, +1 conforme à l'ajout d'un
  seul guide), page vérifiée non vide (19 614 octets, `<title>` correct).
- Grep des formules signature du corpus (Phase 3, étape 7) : **non exécuté** —
  `content-corpus/` est gitignoré et absent de cet environnement cloud. Vérification
  manuelle du ton effectuée à la place (comparaison directe avec les guides PER
  existants du dépôt) ; aucune reprise mot pour mot n'a été identifiée, mais la
  garantie du grep automatique n'a pas pu être apportée ce cycle.
- Chiffres utilisés : exclusivement `FISCALITE.pfuIR` et
  `FISCALITE.prelevementsSociaux.per` depuis `src/components/hypotheses.js` (aucun
  taux écrit en dur). Les mécaniques légales citées (les 6 cas de déblocage, art.
  L224-4 du Code monétaire et financier) sont des règles de droit stables, pas des
  taux de marché — cohérent avec le traitement des autres guides mécanique-retraite
  du site.
- **Positions éditoriales en attente** : non concernées par cet article (rente
  viagère hors PER, mix rente+retraits, nue-propriété SCPI n'y sont pas abordées).

### Phase 4 — Netlinking

- **Limite technique bloquante, comme anticipé par le skill** : `WebFetch` vers des
  domaines tiers renvoie systématiquement `EGRESS_BLOCKED` sur cet environnement
  (testé sur `www.hagnere-patrimoine.fr` et `www.service-public.fr`) — identique au
  comportement déjà observé sur reitdividend.com avec le même compte. `WebSearch`
  fonctionne (résultats + extraits), mais la lecture complète de 2-3 contenus
  récents d'un site cible (étape 1 obligatoire de la séquence Carnegie) est
  impossible depuis cette session.
- Conséquence directe sur la doctrine : impossible de citer honnêtement une source
  tierce dans l'article (Phase 3, étape 3) sans risquer une citation non vérifiée ou
  un lien mort — aucun lien sortant externe n'a donc été ajouté ce cycle. Impossible
  également de rédiger un brouillon d'outreach personnalisé et sincère (règle
  Carnegie "complimenter précisément, pas vaguement") sans avoir lu le contenu réel
  d'une cible.
- **Aucun brouillon d'outreach nominatif n'a donc été produit ce cycle** — en écrire
  un sans lecture réelle violerait la doctrine Carnegie elle-même (compliment vague
  ou inventé).
- Cibles candidates identifiées par WebSearch (non vérifiées, à trier par Alexandre
  avant tout contact — plusieurs semblent être des sites de contenu affiliés à des
  cabinets CGP ou des comparateurs de leads retraite, donc potentiellement
  concurrents directs sur "bilan retraite gratuit", à écarter si confirmé) :
  - **prismo-retraite.fr** ("Prismo, Cabinet d'Expertise Retraite") — angle
    spécialisé retraite plutôt que patrimoine généraliste, potentiellement
    complémentaire plutôt que concurrent direct — **candidat le plus prometteur**,
    mais à vérifier.
  - france-epargne.fr, altis-conseil.fr, avnear.fr, hagnere-patrimoine.fr,
    laplace-groupe.com, gps-patrimoine.fr, occitassur.fr, etsa-patrimoine.com —
    tous publient du contenu épargne/retraite comparable ; statut concurrent ou
    complémentaire non déterminable sans lecture directe.
- **Action recommandée pour débloquer la Phase 4 au prochain cycle** (reprise de
  l'alternative proposée par le skill) : Alexandre lit lui-même 2-3 articles récents
  de 2-3 cibles ci-dessus (en priorité prismo-retraite.fr) et transmet dans le chat
  ses observations (angle éditorial, prénom du rédacteur/fondateur, canal de contact
  nominatif) — un brouillon de message authentique pourra alors être rédigé au
  cycle suivant.

### Phase 5 — Preuve sociale

- Non actionnée ce cycle : aucun accès à Search Console/GA4/Ahrefs pour repérer des
  mentions ou commentaires récents, et aucune information transmise par Alexandre
  sur d'éventuels clients issus du site. Rien à suggérer de sincère sans ces
  données — mieux vaut ne rien produire que fabriquer une suggestion générique.

### KPIs

- **Non vérifiables ce cycle** : aucun accès Search Console, GA4/GTM (au-delà de la
  simple présence du tag GTM-5TFZ445H dans le code), ni Ahrefs (connecteur
  `marketing:ahrefs` non autorisé) depuis cette session. Aucun chiffre de trafic,
  conversion ou backlink n'a été inventé.

### Observation hors périmètre du cycle (à signaler, pas tranchée)

- Le composant partagé `AuthorBox` (`src/components/Layout.jsx`) affiche
  "Alexandre Pollet — Conseiller en gestion de patrimoine, EXP Capital." sur
  l'ensemble des 38 guides du site, **sans** la mention "Conseil en investissements
  financiers délivré via Épargne Plurielle, CIF — ORIAS n° 16003696" pourtant fixée
  comme formulation canonique par le garde-fou du skill. Ce n'est pas un accroc
  introduit ce cycle (le composant existait avant cette routine) mais un écart entre
  la doctrine du skill et l'état réel du site, à trancher par Alexandre : modifier le
  composant partagé impacterait les 38 guides existants, ce qui dépasse le périmètre
  d'un ajout de contenu et n'a donc pas été fait sans validation explicite.

### Décisions pour le cycle suivant

1. Prioriser le déblocage de la Phase 4 : obtenir soit l'autorisation d'un accès
   sortant plus large, soit les observations manuelles d'Alexandre sur
   prismo-retraite.fr (et 1-2 autres cibles) pour produire enfin un brouillon
   d'outreach conforme à la doctrine Carnegie.
2. Prochain sujet pressenti : la catégorie "Décumulation" ne compte que 3 guides
   (la plus fine du site) — creuser un gap Big 5 côté "quand commencer à retirer"
   ou "quel budget de retraits programmés", en neutralisant explicitement les
   positions éditoriales en attente (rente hors PER, mix rente+retraits) si le sujet
   les touche.
3. Demander à Alexandre s'il peut activer le connecteur `marketing:ahrefs` et/ou
   partager un accès Search Console/GA4, pour que la Phase 1 du prochain cycle
   dispose enfin de vrais KPIs plutôt que d'un constat d'indisponibilité.
