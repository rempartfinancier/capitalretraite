# Journal des cycles — croissance SEO Carnegie

Un cycle dure 14 jours. Ce fichier est la mémoire de la routine : le cycle suivant
part de l'état décrit ici et ne refait pas une recherche déjà faite.

---

## Note opérationnelle : incident de doublon du cycle 001 (résolu)

Le 2026-08-20, trois sessions cloud se sont déclenchées le même jour sur ce trigger
(une manuelle à 16h36 UTC, une manuelle à 19h07 UTC, une programmée le lendemain
21 août à 5h03 UTC) parce que la PR du premier cycle est restée **non mergée**
pendant plusieurs jours : chaque nouvelle session clonait `main`, n'y trouvait pas
encore `journal.md`, et exécutait donc un cycle complet — la garde anti-doublon
(« noop si <12 jours ») ne peut fonctionner que si le journal du cycle précédent est
bien sur `main` au moment du déclenchement suivant. Résultat : deux guides distincts
ont été produits (« relevé de carrière » et « déblocage anticipé du PER », ce dernier
en double via deux sessions différentes). Les trois PR ont été relues manuellement le
2026-08-25 : la PR « relevé de carrière » a été mergée telle quelle, une des deux PR
« déblocage anticipé du PER » a été mergée après y avoir porté à la main trois
nuances juridiques plus précises trouvées dans la version concurrente, et la seconde
a été fermée comme doublon. **Leçon retenue : merger (ou fermer) la PR d'un cycle
avant le déclenchement suivant, pour que la garde anti-doublon fonctionne.**

---

## Cycle 001 — clôturé le 2026-08-20 (guide 1/2 : relevé de carrière)

**Statut : cycle complet côté contenu, partiel côté netlinking (contact reporté, voir ci-dessous).**

### Phase 1 — Bilan
Premier cycle : aucun cycle antérieur, donc aucun bilan à faire.

KPIs **non vérifiables** dans cet environnement : pas de connecteur Search Console,
pas de GA4, pas de connecteur `marketing:ahrefs` autorisé. Aucun chiffre de trafic,
de conversion `generate_lead` ni de backlink n'a été relevé — et aucun n'a été inventé.
Point de départ du suivi : à renseigner manuellement par Alexandre au cycle 002.

### Phase 2 — Recherche & angle
Audit des 47 pages (37 guides + 5 stratégies + home/outils) via `src/routes.jsx` et
`src/pages/Guides.jsx`.

Candidats écartés, avec la raison — **ne pas les reproposer sans lever la raison** :
- « Combien coûte un PEA ? » (comblerait le trou Big 5 « coût » de la catégorie PEA,
  la plus mince du site avec 2 guides) — **écarté : cannibalisation interne**. Le guide
  `/guide/pea-banque-ou-courtier` traite déjà les plafonds loi Pacte, le coût des supports
  et un exemple chiffré 300 €/15 ans. Recouvrement estimé ~70 %.
- « Retraite des cadres : Agirc-Arrco et chute du taux de remplacement » — sujet à forte
  valeur (persona principal, aucune page dédiée alors que fonctionnaires et indépendants
  en ont une), **écarté ce cycle : impossible de sourcer le PASS et la valeur du point
  Agirc-Arrco** faute d'accès sortant aux sources officielles (voir Limites). À reprendre
  dès qu'Alexandre fournit ces valeurs pour `hypotheses.js`.
- « Préfon / PER des fonctionnaires » — **écarté : règle de neutralité** (pas de choix
  nominatif de contrat ou de distributeur sur le site).

**Sujet retenu : le relevé de carrière.** Motif décisif : l'expression « vérifier son
relevé de carrière » apparaît en clair dans au moins 6 guides existants (surcote-décote,
cumul emploi-retraite, combien épargner, PER bancaire, lead magnet) **sans aucune page de
destination**. C'était donc à la fois un trou de contenu et un trou de maillage interne.
Angle Big 5 : « problèmes ». Aucun chiffre nouveau requis — tout vient de
`REGIME_GENERAL` et `ILLUSTRATIF` dans `hypotheses.js`.

### Phase 3 — Production
- Nouveau guide : `/guide/verifier-releve-de-carriere-retraite`
  (`src/pages/GuideVerifierReleveCarriere.jsx`), catégorie **mecanique-retraite**.
- Câblage complet : `routes.jsx`, `App.jsx` (import + Route), `Guides.jsx`,
  `public/sitemap.xml` (priorité 0,7). Build : **52/52 pages** (51 avant), page non vide.
- Maillage sortant (5 liens) : surcote-decote-retraite, combien-coute-rachat-trimestres,
  combien-faut-il-epargner, cumul-emploi-retraite, retraite-fonctionnaires-completer,
  + simulateur-retraite.
- Maillage entrant (2 liens ajoutés à la main) : `GuideSurcoteDecote.jsx` (§ leviers) et
  `GuideCoutRachatTrimestres.jsx` (§ principe du rachat — angle « un trimestre manquant à
  tort se rétablit gratuitement, il ne se rachète pas »).
- Convention retenue : `<a href>` comme les 37 autres guides, **pas** `<Link to>` — ce
  point était encore à trancher à ce moment-là ; il l'a été depuis (voir SKILL.md,
  corrigé le 2026-08-20 après ce cycle).
- Chiffres : uniquement `REGIME_GENERAL.decoteParTrimestre` (1,25 %),
  `decotePlafondTrimestres` (20), `ageTauxPleinAutomatique` (67),
  `rachatTrimestresPlafond` (12) et `ILLUSTRATIF.pensionMensuelleIllustrative` (1 800 €).
  Arithmétique revérifiée sur le HTML prerendu : 23 €/mois, 276 €/an, 90 €/mois pour
  4 trimestres — cohérent.
- Anti-plagiat : les formules signature du corpus sont absentes (grep sur le brouillon).
  **Réserve** : `content-corpus/` est gitignoré et **absent du clone**, le grep de contrôle
  n'a donc pas pu être joué contre le corpus lui-même.

### Positions éditoriales en attente
**Aucune touchée par ce guide.** Le sujet (relevé de carrière, droits du régime général)
n'aborde ni la rente viagère hors PER, ni le mix rente + retraits, ni la nue-propriété de
SCPI. Les trois restent en attente de validation.

---

## Cycle 001 — clôturé le 2026-08-20 (guide 2/2 : déblocage anticipé du PER)

**Branche mergée : `seo-cycle-2026-08-20`.** Produit par une deuxième session du même
jour (voir note d'incident ci-dessus) ; patché manuellement le 2026-08-25 avec trois
nuances juridiques (concubinage exclu du cas décès, chômage = expiration des droits et
non perte d'emploi, liquidation judiciaire distincte d'une sauvegarde/redressement)
issues de la comparaison avec la version concurrente (PR fermée comme doublon).

### Phase 2 — Recherche & angle
Gap identifié : « déblocage anticipé du PER » mentionné en énumération dans 15 pages
(`GuideFautIlOuvrirPer`, `GuideAgeCommencerPer`, `GuideCoutPer`, `StrategiePer`…) mais
sans jamais faire l'objet d'une page dédiée — requête Big 5 « problèmes » à forte
intention (un lecteur qui la tape a un projet immobilier ou un accident de la vie en
cours).

Sujets candidats écartés ce cycle, à reprendre plus tard :
- Transfert d'un PER vers un autre PER (frais, délais) — catégorie PER.
- PER et succession du conjoint survivant — recoupe partiellement l'angle transmission
  déjà couvert par `GuideFautIlOuvrirPer`.
- Épargne salariale et retraite (PEE / abondement) — catégorie absente du site.

### Phase 3 — Production
**Guide publié :** « Déblocage anticipé du PER : les 6 cas, la fiscalité et les pièges »
→ `/guide/deblocage-anticipe-per` (`src/pages/GuideDeblocageAnticipePer.jsx`), catégorie
**per** de `Guides.jsx`, juste après « Fiscalité de sortie du PER ».

Angle retenu : les six cas légaux ne se valent pas fiscalement (cinq accidents de la
vie protégés vs. l'achat de la résidence principale, seul cas coûteux), plus deux
pièges concrets rarement traités — les compartiments C3 jamais débloquables pour un
achat immobilier, et l'effet du retrait sur la tranche marginale de l'année.

Chiffres : exclusivement `FISCALITE.pfuIR`, `FISCALITE.prelevementsSociaux.per` et
`HYPOTHESES_MAJ`. Aucun taux nouveau introduit.

**Maillage interne ajouté :**
- Sortants du nouveau guide : `/guide/faut-il-ouvrir-un-per` (×2),
  `/guide/fiscalite-sortie-per`, `/guide/a-quel-age-commencer-per`,
  `/guide/combien-coute-un-per`, `/strategies/per`,
  `/guide/immobilier-locatif-ou-assurance-vie`, `/guide/per-ou-immobilier-locatif`,
  `/guide/retraite-fonctionnaires-completer`, `/bilan-retraite`.
- Entrants vers le nouveau guide (2) : depuis `GuideFautIlOuvrirPer.jsx`
  (section « besoin des fonds avant la retraite ») et `GuideAgeCommencerPer.jsx`
  (FAQ « le PER est-il bloqué jusqu'à quel âge ? »).
- Sortants réseau : `immobilierpassif.com` et `scpirentable.fr` sur le passage
  « investissement locatif », conformément à la règle anti-cannibalisation — bon exemple
  concret de cette règle appliquée, à réutiliser comme modèle dans les cycles suivants.

**Câblage :** `routes.jsx`, `App.jsx`, `Guides.jsx`, `public/sitemap.xml` (priorité 0.8)
tous mis à jour à la main. `bun run typecheck`, `bun run test` (36 tests) et
`bun run build` passent (53/53 pages après merge avec le guide 1/2 ci-dessus).

### Positions éditoriales en attente
**Aucune touchée par ce guide.**

### Accroc signalé, hors périmètre de ce cycle (à trancher par Alexandre)
Le composant partagé `AuthorBox` (`src/components/Layout.jsx`), affiché sur les 38
guides du site, affiche seulement « Alexandre Pollet — Conseiller en gestion de
patrimoine, EXP Capital. » — **sans** la mention canonique « Conseil en investissements
financiers délivré via Épargne Plurielle, CIF — ORIAS n° 16003696 » pourtant fixée par
le garde-fou du skill. Écart préexistant (le composant n'a pas été créé par cette
routine), non corrigé car modifier un composant partagé impacterait les 38 guides
existants — décision à prendre par Alexandre, hors périmètre d'un ajout de contenu.

---

## Phase 4 — Netlinking (statut commun aux deux guides du cycle 001)

**Aucun contact rédigé ni envoyé — volontaire, deux raisons cumulées :**
1. L'accès réseau sortant vers les domaines tiers est **bloqué** (`EGRESS_BLOCKED`,
   confirmé sur service-public.fr, agirc-arrco.fr, hagnere-patrimoine.fr,
   avenuedesinvestisseurs.fr, carnet-retraite.fr — même symptôme que sur
   reitdividend.com avec le même compte). Impossible de lire 2-3 contenus d'une cible,
   ce qu'exige l'étape 1 de la séquence Carnegie. `WebSearch` fonctionne (titres +
   extraits), pas la lecture de source primaire.
2. Règle « donner avant de demander » : aucune de ces cibles n'a encore été citée dans
   un article Capital Retraite.

Cibles identifiées par les deux sessions (à qualifier par Alexandre avant tout
contact — fusion des deux listes, dédupliquée) :

| Cible | Angle | Statut |
|---|---|---|
| prismo-retraite.fr | Cabinet spécialisé retraite (pas généraliste patrimoine) | **Candidat le plus prometteur**, à vérifier |
| jobpublic.fr | Audience fonctionnaires, contenu RH/statut, pas d'offre patrimoniale | Prometteur, recoupe le guide fonctionnaires |
| emploi-collectivites.fr | Fonction publique territoriale | À qualifier |
| aide-sociale.fr | Vulgarisation droits sociaux/RAFP | À qualifier |
| previssima.fr | Média assurance/prévoyance | Structure éditoriale à vérifier |
| devenir-rentier.fr / investisseurs-heureux.fr | Communauté FIRE francophone | Forum : logique de contribution, pas de demande de lien |
| avenuedesinvestisseurs.fr | Média épargne indépendant, forte notoriété | À qualifier — non lu |
| carnet-retraite.fr | Blog retraite « en autonomie » | À qualifier — non lu |
| epargne-finance-retraite.fr | Guide retraite se présentant comme indépendant | À qualifier — non lu |

Écartés d'emblée comme **concurrents directs sur la conversion** (offre un bilan
patrimonial ou un audit gratuit) : hagnere-patrimoine.fr, auguste-patrimoine.fr, et
plus largement france-epargne.fr / altis-conseil.fr / avnear.fr / laplace-groupe.com /
gps-patrimoine.fr / occitassur.fr / etsa-patrimoine.com (comparateurs de leads retraite
— statut concurrent probable, à confirmer si approché un jour).

## Phase 5 — Preuve sociale (statut commun)
Aucune action possible sans données : pas d'accès CRM/cabinet, aucun connecteur réseau
social ni email dans la session, egress bloqué pour repérer d'éventuelles mentions.

## KPIs (statut commun)
**Non vérifiables** dans cet environnement : pas de connecteur Search Console, GA4 ni
`marketing:ahrefs`. Aucun chiffre inventé. Point de départ du suivi : 53 pages
prerendues après ce cycle (51 avant, +2 guides).

## Décisions pour le cycle 002 (à partir du 2026-09-03)
1. **Priorité : débloquer la Phase 4.** Soit un accès réseau sortant plus large est
   accordé à cet environnement, soit Alexandre lit lui-même 2-3 contenus de
   prismo-retraite.fr ou jobpublic.fr et transmet ses observations dans le chat — à
   partir de là seulement, un brouillon d'outreach authentique pourra être rédigé.
   Une fois l'un ou l'autre débloqué, citer d'abord honnêtement la cible dans un guide
   avant tout contact (règle Carnegie).
2. **Sujets pressentis pour le prochain guide** (à trancher en Phase 2 du cycle 002) :
   « Retraite des cadres — Agirc-Arrco et taux de remplacement » (conditionné à ce
   qu'Alexandre fournisse le PASS et la valeur du point Agirc-Arrco pour
   `hypotheses.js`), ou à défaut « Transfert de PER : frais, délais, quand ça vaut le
   coup » (catégorie per, aucun chiffre nouveau requis).
3. **Signaler à Alexandre l'écart `AuthorBox` / mention CIF** (voir ci-dessus) s'il n'a
   pas encore été traité.
4. **Maillage interne :** poursuivre au-delà des seuls nouveaux guides — beaucoup des
   37 guides plus anciens restent peu maillés entre eux. Prévoir un passage dédié
   « 3 liens croisés par cycle » sur les guides les plus anciens.
5. Demander à Alexandre s'il peut activer le connecteur `marketing:ahrefs` et/ou
   partager un accès Search Console/GA4, pour sortir la Phase 1 du mode aveugle.

## Limites rencontrées (à lever pour accélérer, communes aux deux guides)
- **Egress sortant bloqué** vers les domaines tiers (`EGRESS_BLOCKED`) — même symptôme
  que sur reitdividend.com avec le même compte. `WebSearch` fonctionne, pas la lecture
  de source primaire.
- Aucun connecteur analytics/SEO (Search Console, GA4, Ahrefs) : Phases 1 et 2 restent
  manuelles et aveugles sur les KPIs.
- `content-corpus/` absent du clone (gitignoré) : contrôle anti-plagiat limité au grep
  des formules signature connues sur le brouillon, pas contre le corpus lui-même.
- Nom de branche : une session cloud (RemoteTrigger) démarre parfois sur une branche
  déjà assignée par la plateforme, sans pouvoir la renommer — intention du garde-fou
  respectée (aucun commit direct sur main, PR, pas d'auto-merge) même quand le nom
  littéral `seo-cycle-AAAA-MM-JJ` n'est pas utilisé.

---

## Cycle 002 — clôturé le 2026-10-02

**Branche : `seo-cycle-2026-10-02` (PR vers main, non mergée au moment de la clôture).**
Écart avec le cycle précédent : 43 jours (le trigger hebdomadaire n'a pas produit de cycle
entre le 2026-08-20 et ce jour dans le dépôt).

### Phase 1 — Bilan
KPIs **non vérifiables** (pas de Search Console, GA4, Ahrefs ; egress tiers non testé à
nouveau, voir Phase 4). Aucun chiffre inventé. Aucun contact d'outreach n'ayant été envoyé
au cycle 001, rien à relancer ni à abandonner.

### Phase 2 — Recherche & angle
Sujet « Agirc-Arrco / taux de remplacement des cadres » toujours **bloqué** : `hypotheses.js`
ne contient ni PASS ni valeur du point Agirc-Arrco, et Alexandre ne les a pas fournis.
Sujet de repli retenu, comme prévu : **transfert de PER** (gap Big 5 « problèmes/coût » ;
`GuideCoutPer` et `GuidePerBancaire` n'en parlaient qu'en une phrase de FAQ).

### Phase 3 — Production
- Nouveau guide : `/guide/transfert-per` (`src/pages/GuideTransfertPer.jsx`), catégorie
  **per** de `Guides.jsx`, après « Déblocage anticipé du PER ». Sitemap priorité 0,8.
- Câblage : `routes.jsx`, `App.jsx`, `Guides.jsx`, `public/sitemap.xml`.
  Build **54/54 pages** (53 avant). Typecheck OK, 36 tests OK.
- Maillage sortant : fiscalite-sortie-per, deblocage-anticipe-per, combien-coute-un-per,
  retraite-independants-per-ou-madelin, per-bancaire-frais-gestion-horizon,
  per-vs-assurance-vie-retraite, quel-est-le-meilleur-per, bilan-retraite.
- Maillage entrant (2) : `GuideCoutPer.jsx` (FAQ transfert) et `GuidePerBancaire.jsx`
  (FAQ « change d'établissement »).
- Chiffres : **aucun taux nouveau**. Seules règles juridiques qualitatives reprises :
  gratuité après cinq ans (déjà sur le site), plafonnement légal sans valeur citée, délai
  « de l'ordre de deux mois » (**à vérifier par Alexandre**, absent de `hypotheses.js`).
- Anti-plagiat : `content-corpus/` absent du clone, grep contre le corpus impossible.

### Positions éditoriales en attente
Aucune touchée (rente hors PER, mix rente/retraits, nue-propriété SCPI).

### Phase 4 — Netlinking
Aucun brouillon rédigé : pas de lecture des sites cibles possible sans accès tiers, et aucune
cible n'a encore été citée dans un guide (règle « donner avant de demander »). Voir le
rapport de session pour la suite.

### Phase 5 — Preuve sociale
Aucune donnée disponible (pas de CRM, pas de connecteur).

### Décisions pour le cycle 003
1. Alexandre : fournir PASS + valeur du point Agirc-Arrco pour débloquer le guide cadres.
2. Alexandre : lire 2-3 contenus de prismo-retraite.fr / jobpublic.fr, ou autoriser l'egress.
3. Trancher l'écart `AuthorBox` (mention CIF / Épargne Plurielle absente), toujours ouvert.
4. **Merger la PR avant le prochain déclenchement** (garde anti-doublon).
