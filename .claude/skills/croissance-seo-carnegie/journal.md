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

## Cycle 002 — clôturé le 2026-09-18 (guide : couple pacsé / concubinage et retraite)

**Statut : cycle complet côté contenu et maillage, partiel côté vérification technique
locale (registre npm inaccessible cette session, voir Limites) et côté netlinking
(inchangé, toujours bloqué).**

### Phase 1 — Bilan
Cycle 001 bien mergé sur `main` avant ce déclenchement (commit `3b27ae5`, PR #5) — la
leçon de l'incident de doublon a été respectée, la garde anti-doublon a donc fonctionné
normalement (29 jours écoulés depuis la clôture du 2026-08-20, cycle dû).

KPIs **toujours non vérifiables** : `ListConnectors` ne renvoie aucun connecteur
`marketing:ahrefs`/Search Console/GA4 pour ce compte (liste vide). Aucun chiffre de
trafic, conversion ou backlink n'a été relevé ni inventé — décision n°5 du cycle 001
(activer un connecteur analytics) toujours sans suite à ce jour, à reposer à Alexandre.

Accroc `AuthorBox` / mention CIF (signalé au cycle 001) : **toujours non corrigé** dans
`src/components/Layout.jsx` — deuxième cycle consécutif où ce guard-rail éditorial reste
non appliqué sur les désormais 39 guides du site. Toujours hors périmètre d'un ajout de
contenu ; remonté une nouvelle fois ci-dessous pour arbitrage par Alexandre.

### Phase 2 — Recherche & angle
Sujets pressentis par le cycle 001 réexaminés en premier :
- **« Retraite des cadres — Agirc-Arrco »** : toujours écarté. `hypotheses.js` ne
  contient toujours aucune donnée Agirc-Arrco (PASS, valeur du point) — vérifié par
  `grep` avant de commencer. Reste conditionné à ce qu'Alexandre fournisse ces valeurs.
- **« Transfert de PER »** : écarté cette fois pour une raison différente de la simple
  disponibilité des cibles. `hypotheses.js` ne contient aucun paramètre de frais de
  transfert de PER (plafond légal, seuil des 5 ans) ; le seul mention existante sur le
  site (`GuideMeilleurPer.jsx`, FAQ) reste volontairement vague (« frais de transfert
  encadrés qui diminuent avec l'ancienneté », sans taux). Écrire l'article aurait donc
  nécessité soit d'inventer un chiffre non sourcé (interdit par le garde-fou), soit de
  se limiter à la même comparaison de frais banque/internet déjà traitée en profondeur
  dans `per-bancaire-frais-gestion-horizon` et `combien-coute-un-per` — risque de
  cannibalisation élevé, du même ordre que celui qui avait fait écarter « combien coûte
  un PEA » au cycle 001. **Écarté : donnée manquante + cannibalisation probable.**
- Autre candidat écarté : **« Quel est le meilleur PEA ? »** (calquer l'angle « grille de
  critères, pas de classement » de `GuideMeilleurPer.jsx` sur le PEA, catégorie la plus
  mince du site). Écarté ce cycle : le PEA a déjà deux check-lists d'audit existantes
  (`GuidePeaBanqueCourtier.jsx` § « check-list d'audit », `GuideInconvenientsPea.jsx`
  § « tableau de synthèse ») — un troisième article de type grille risquait de
  cannibaliser les deux à la fois. À reprendre seulement avec un angle clairement
  distinct des deux grilles existantes.

**Sujet retenu : couple pacsé ou en concubinage et retraite.** Gap identifié dans la
catégorie **profils-specifiques** (la plus mince du site avec seulement 2 guides,
indépendants et fonctionnaires — aucun guide organisé autour du statut marital). Motif
décisif, trouvé via `WebSearch` (queries : réversion Agirc-Arrco pacsé/concubin,
succession PACS/concubinage, donation entre pacsés) : la pension de réversion est
réservée aux couples mariés dans **tous** les régimes de retraite français (régime
général, Agirc-Arrco, fonction publique) — aucun droit pour le PACS ni le concubinage,
même après des décennies de vie commune. Ce point n'était mentionné nulle part sur le
site (le mot « réversion » n'apparaissait que pour la réversion contractuelle d'une
rente viagère, un mécanisme différent). Angle Big 5 : « problèmes ». Aucune
cannibalisation SCPI.

### Phase 3 — Production
- Nouveau guide : `/guide/pacs-concubinage-retraite`
  (`src/pages/GuidePacsConcubinageRetraite.jsx`), catégorie **profils-specifiques**,
  juste après « Retraite des fonctionnaires ».
- Câblage complet : `routes.jsx`, `App.jsx` (import + Route), `Guides.jsx`,
  `public/sitemap.xml` (priorité 0,7).
- Maillage sortant (5 liens) : `donation-ou-assurance-vie-transmission`,
  `risques-assurance-vie`, `deblocage-anticipe-per`, `rente-viagere-ou-retraits-programmes`,
  `inconvenients-rente-viagere`, + `/bilan-retraite`. Légèrement au-dessus de la
  fourchette « 2 à 4 » du skill (page à vocation de hub de profil, jugé justifié).
- Maillage entrant (2 liens ajoutés à la main) : `GuideDeblocageAnticipePer.jsx` (§ les
  trois nuances, à l'endroit exact où le cas « concubin exclu » était déjà mentionné) et
  `GuideDonationOuAssuranceVie.jsx` (FAQ « petits-enfants, neveux, concubin »).
- Chiffres : exclusivement `TRANSMISSION.abattementSuccessionAvParBeneficiaire`
  (152 500 €) déjà présent dans `hypotheses.js`, réutilisé tel quel. **Aucun chiffre
  nouveau introduit** : le taux de taxation successorale entre concubins et l'abattement
  de donation spécifique aux partenaires de PACS (trouvés via `WebSearch`, avec une
  confiance raisonnable, mais non vérifiables contre une source primaire à cause de
  l'egress bloqué) ont été **volontairement omis de l'article** plutôt qu'ajoutés en dur
  — conformément au garde-fou « si une donnée manque, la signaler en Phase 6 plutôt que
  l'inventer ». Voir « Données à ajouter à hypotheses.js » ci-dessous.
- Anti-plagiat : grep des formules signature du corpus sur le brouillon — aucune trouvée.
  Même réserve que le cycle 001 : `content-corpus/` absent du clone, grep de contrôle non
  joué contre le corpus lui-même.

### Données à ajouter à `hypotheses.js` (à vérifier par Alexandre avant tout cycle futur)
Trouvées via `WebSearch` cette session (sources secondaires, non vérifiées contre
Légifrance/BOFiP faute d'egress) — **ne pas les considérer comme fiables sans
vérification** :
- Taux de taxation des successions entre concubins non pacsés (barème le plus lourd du
  CGI, hors ligne directe).
- Abattement de donation entre partenaires de PACS (article 790 F du CGI, distinct de
  l'abattement en ligne directe parent-enfant déjà dans `TRANSMISSION`).

### Positions éditoriales en attente
**Touchée légèrement : rente viagère hors PER.** La section « Pourquoi la capitalisation
compte double sans réversion » mentionne, comme option possible parmi d'autres, une
rente viagère avec option de réversion contractuelle pour un couple non marié — présentée
explicitement comme neutre (« sans recommandation de notre part »), avec renvoi vers les
deux guides existants déjà neutralisés sur le sujet. **Aucune position tranchée n'a été
prise.** Signalé ici pour validation d'Alexandre, conformément au garde-fou. Le mix
rente + retraits programmés et la nue-propriété de SCPI ne sont pas abordés dans ce
guide.

## Phase 4 — Netlinking (cycle 002)
**Statut inchangé : toujours bloqué.** Re-testé explicitement ce cycle : `curl` vers
`service-public.fr` renvoie une erreur de tunnel CONNECT (403, « policy denial or
upstream failure » selon `/__agentproxy/status`, `recentRelayFailures` horodaté
2026-09-18T05:01Z) — symptôme identique à celui documenté au cycle 001 et sur
reitdividend.com. Aucune cible n'a été lue ni contactée. Le nouveau guide de ce cycle ne
cite aucun site tiers (voir Phase 3) : la liste de cibles à qualifier reste donc
strictement celle du cycle 001, inchangée et toujours non fusionnée par Alexandre :

| Cible | Statut |
|---|---|
| prismo-retraite.fr | Candidat le plus prometteur, à vérifier |
| jobpublic.fr | Prometteur, recoupe le guide fonctionnaires |
| emploi-collectivites.fr | À qualifier |
| aide-sociale.fr | À qualifier |
| previssima.fr | À qualifier |
| devenir-rentier.fr / investisseurs-heureux.fr | Forum, logique de contribution |
| avenuedesinvestisseurs.fr | À qualifier — non lu |
| carnet-retraite.fr | À qualifier — non lu |
| epargne-finance-retraite.fr | À qualifier — non lu |

Rien n'a été envoyé, aucun brouillon d'outreach n'a été rédigé cette session faute de
cible déjà citée honnêtement (règle Carnegie « donner avant de demander »).

## Phase 5 — Preuve sociale (cycle 002)
Statut inchangé : aucune action possible sans accès CRM/réseaux sociaux/email dans cette
session.

## KPIs (cycle 002)
**Non vérifiables**, mêmes raisons qu'au cycle 001 (`ListConnectors` vide). Point de
suivi : 54 pages attendues après ce cycle (53 avant, +1 guide) — **non confirmé par un
build local** cette fois, voir Limites ci-dessous.

## Décisions pour le cycle 003 (à partir du 2026-10-02)
1. **Toujours débloquer la Phase 4** — inchangé depuis le cycle 001, priorité n°1.
2. **Ajouter à `hypotheses.js`** les deux données identifiées ci-dessus (taxation
   concubinage, abattement donation PACS) une fois vérifiées par Alexandre, pour
   permettre un futur approfondissement chiffré de ce guide ou un guide dédié à la
   transmission entre partenaires non mariés.
3. **Sujets pressentis** : « Transfert de PER » redevient possible dès que le plafond
   légal de frais de transfert est ajouté à `hypotheses.js` ; sinon, explorer la
   catégorie **immobilier** (seulement 4 guides) ou **décumulation** (3 guides) pour le
   prochain gap.
4. **Toujours signaler l'écart `AuthorBox` / mention CIF** — deux cycles consécutifs sans
   correction.
5. **Maillage interne « 3 liens croisés »** (décision n°4 du cycle 001) : toujours pas
   fait en tant que passage dédié — reporté une nouvelle fois faute de temps ce cycle-ci,
   à prioriser au cycle 003 si aucun nouveau guide urgent ne s'impose.
6. **Vérifier que `bun install` fonctionne** au démarrage du cycle 003 avant toute
   production de contenu (voir Limites) — si le registre npm est de nouveau inaccessible,
   le signaler immédiatement plutôt que de découvrir le problème en fin de cycle.

## Limites rencontrées (cycle 002)
- **Egress sortant bloqué** vers les domaines tiers — inchangé, re-confirmé (voir Phase 4).
- **Registre npm inaccessible cette session** (nouveau) : `registry.npmjs.org` figure
  dans la liste `noProxy` de l'agent-proxy (routage direct, hors politique d'egress) mais
  répond par un timeout puis un statut 503 sur toutes les tentatives (3 essais espacés).
  `node_modules/` était vide au démarrage de la session (aucune dépendance pré-installée)
  et `bun install` a échoué intégralement. Conséquence concrète : **`bun run test` et
  `bun run build` n'ont pas pu être exécutés localement** cette session — seul
  `bun run typecheck` a pu tourner (une erreur préexistante et sans rapport avec ce
  cycle : module `vitest` introuvable, confirmée présente aussi sur `main` non modifié
  via `git stash`). À défaut, chaque fichier modifié a été passé individuellement dans
  `bun build --target=browser` : tous échouent uniquement à la résolution de `react`/
  `react-router-dom` (dépendances non installées), pas à l'analyse syntaxique JSX — signe
  que la syntaxe est valide, mais **ce n'est pas un substitut à un build complet
  (vite + SSR + prerender) ni à la suite de tests**. La CI GitHub Actions de la PR, qui
  dispose probablement d'un accès registre normal, devra donc servir de première
  vérification réelle avant toute fusion — à surveiller en priorité sur cette PR.
- Aucun connecteur analytics/SEO — inchangé.
- `content-corpus/` absent du clone — inchangé.
