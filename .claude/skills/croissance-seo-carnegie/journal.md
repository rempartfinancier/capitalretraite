# Journal de la routine croissance SEO Carnegie — capitalretraite.com

Un bloc par cycle, le plus récent en haut. Le cycle suivant repart de ce fichier :
ne pas refaire une recherche déjà consignée ici, et reprendre les cibles de
netlinking à leur statut réel.

---

## Cycle 1 — clôturé le 2026-08-20

**Branche / PR :** `seo-cycle-2026-08-20`

### Phase 1 — Bilan
Premier cycle : aucun cycle antérieur à mesurer. **Aucun KPI n'a pu être relevé.**
Search Console, GA4 et Ahrefs ne sont accessibles depuis aucun connecteur autorisé
dans cette session ; aucun chiffre de trafic, de conversion `generate_lead` ni de
backlink n'est donc consigné ici. Point de départ officiel : 51 pages prerendues
avant ce cycle.

### Phase 2 — Recherche & angle
Gaps identifiés dans les 37 guides existants, catégorie par catégorie. Le sujet
« déblocage anticipé du PER » ressortait comme le manque le plus net : mentionné en
énumération dans 15 pages (`GuideFautIlOuvrirPer`, `GuideAgeCommencerPer`,
`GuideCoutPer`, `StrategiePer`…) mais sans jamais faire l'objet d'une page dédiée,
alors que c'est une requête Big 5 « problèmes » à fort volume et à intention haute
(un lecteur qui la tape a un projet immobilier ou un accident de la vie en cours).

Sujets candidats écartés ce cycle, à reprendre plus tard :
- Transfert d'un PER vers un autre PER (frais, délais) — catégorie PER.
- PER et succession du conjoint survivant — recoupe partiellement l'angle transmission
  déjà couvert par `GuideFautIlOuvrirPer`.
- Épargne salariale et retraite (PEE / abondement) — catégorie absente du site.

Sources tierces repérées pour la citation (Phase 3) et comme graines de netlinking :
Légifrance (art. L224-4 CMF), service-public.fr, info-retraite.fr. Aucune n'a pu être
lue directement (voir limites ci-dessous).

### Phase 3 — Production
**Guide publié (en attente de relecture) :** « Déblocage anticipé du PER : les 6 cas,
la fiscalité et les pièges » → `/guide/deblocage-anticipe-per`
(`src/pages/GuideDeblocageAnticipePer.jsx`), rangé dans la catégorie **per** de
`Guides.jsx`, juste après « Fiscalité de sortie du PER ».

Angle retenu : les six cas légaux ne se valent pas fiscalement (cinq accidents de la
vie protégés vs. l'achat de la résidence principale, seul cas coûteux), plus deux
pièges concrets rarement traités — les compartiments C3 jamais débloquables pour un
achat immobilier, et l'effet du retrait sur la tranche marginale de l'année.

Chiffres : exclusivement `FISCALITE.pfuIR`, `FISCALITE.prelevementsSociaux.per` et
`HYPOTHESES_MAJ`. Le total de 31,4 % est calculé dans le fichier, jamais écrit en dur.
Aucun taux nouveau introduit.

**Maillage interne ajouté (le point faible du site) :**
- Sortants du nouveau guide (6) : `/guide/faut-il-ouvrir-un-per` (×2),
  `/guide/fiscalite-sortie-per`, `/guide/a-quel-age-commencer-per`,
  `/guide/combien-coute-un-per`, `/strategies/per`,
  `/guide/immobilier-locatif-ou-assurance-vie`, `/guide/per-ou-immobilier-locatif`,
  `/guide/retraite-fonctionnaires-completer`, `/bilan-retraite`.
- Entrants vers le nouveau guide (2) : depuis `GuideFautIlOuvrirPer.jsx`
  (section « besoin des fonds avant la retraite ») et `GuideAgeCommencerPer.jsx`
  (FAQ « le PER est-il bloqué jusqu'à quel âge ? »).
- Sortants réseau : `immobilierpassif.com` et `scpirentable.fr` sur le passage
  « investissement locatif », conformément à la règle anti-cannibalisation.

**Câblage :** `routes.jsx`, `App.jsx`, `Guides.jsx`, `public/sitemap.xml` (priorité 0.8)
tous mis à jour à la main. Prerender : **51 → 52 pages**, nouvelle page à 26 Ko.
`bun run typecheck`, `bun run test` (36 tests) et `bun run build` passent.

**Écart de convention à trancher :** le skill demande des liens internes en
`<Link to="...">` (react-router-dom). Les 37 guides existants utilisent tous
`<a href="...">` sans exception. Convention locale suivie (`<a href>`) pour ne pas
introduire d'incohérence unilatérale — décision globale à prendre par Alexandre.

### Phase 4 — Netlinking
**Aucun contact rédigé, et c'est volontaire.** `WebFetch` est bloqué par le proxy
d'egress de l'environnement (`EGRESS_BLOCKED`) sur tous les domaines tiers testés
(`avenuedesinvestisseurs.fr`, `carnet-retraite.fr`) — la même limite que celle déjà
observée sur reitdividend.com. L'étape 1 de la Phase 4 (lire réellement 2–3 contenus
de la cible, identifier le prénom du rédacteur, complimenter un point précis et vrai)
est donc impossible à honorer. Fabriquer un compliment sans avoir lu violerait la
doctrine Carnegie elle-même.

Cibles pré-qualifiées par recherche (à vérifier par Alexandre avant tout contact) :
| Cible | Angle | Statut |
|---|---|---|
| carnet-retraite.fr | Blog retraite « en autonomie », pas d'offre de bilan visible | à qualifier — non lu |
| avenuedesinvestisseurs.fr | Média épargne indépendant, très fort en notoriété | à qualifier — non lu |
| epargne-finance-retraite.fr | Guide retraite se présentant comme indépendant | à qualifier — non lu |
| devenir-rentier.fr / investisseurs-heureux.fr | Communauté FIRE francophone | à qualifier — non lu |

Rappel doctrine : aucune de ces cibles n'a encore été citée dans un article Capital
Retraite. La règle « donner avant de demander » interdit tout contact tant que ce
n'est pas fait — le cycle 2 devrait donc d'abord citer honnêtement une ou deux
d'entre elles dans un guide, avant tout message.

### Phase 5 — Preuve sociale
Aucune action. Pas d'accès aux leads du cabinet, ni aux mentions reçues sur les
réseaux ou les forums depuis cette session. Suggestions transmises à Alexandre dans
le rapport de session.

### Positions éditoriales en attente
**Aucune touchée par ce guide.** Le sujet n'aborde ni la rente viagère hors PER, ni le
mix rente + retraits programmés, ni la nue-propriété de SCPI.

### Décisions pour le cycle 2 (à partir du 2026-09-03)
1. **Sujet pressenti :** « Transfert de PER : frais, délais, quand ça vaut le coup »
   (catégorie per) — ou « Épargne salariale et retraite » si Alexandre veut ouvrir une
   nouvelle catégorie. Y insérer une citation sincère d'une cible Phase 4.
2. **Netlinking :** ne rien tenter tant que le blocage egress n'est pas levé, OU
   procéder selon l'alternative prévue par le skill : Alexandre lit lui-même 2–3
   contenus d'une cible et transmet ses observations, à partir desquelles un brouillon
   authentique est rédigé.
3. **Maillage interne :** poursuivre l'effort au-delà du seul nouveau guide — les 37
   guides existants restent très peu maillés entre eux. Prévoir un passage dédié
   « 3 liens croisés par cycle » sur les guides les plus anciens.
