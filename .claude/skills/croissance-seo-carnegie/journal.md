# Journal des cycles — croissance SEO Carnegie

Un cycle dure 14 jours. Ce fichier est la mémoire de la routine : le cycle suivant
part de l'état décrit ici et ne refait pas une recherche déjà faite.

---

## Cycle 001 — clôturé le 2026-08-20

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
- Convention retenue : `<a href>` comme les 37 autres guides, **pas** `<Link to>` comme
  l'indique le SKILL — aucune page guide du site n'utilise `<Link>` dans le corps de texte.
  Point à trancher globalement (voir Décisions).
- Chiffres : uniquement `REGIME_GENERAL.decoteParTrimestre` (1,25 %),
  `decotePlafondTrimestres` (20), `ageTauxPleinAutomatique` (67),
  `rachatTrimestresPlafond` (12) et `ILLUSTRATIF.pensionMensuelleIllustrative` (1 800 €).
  Arithmétique revérifiée sur le HTML prerendu : 23 €/mois, 276 €/an, 90 €/mois pour
  4 trimestres — cohérent.
- Anti-plagiat : les formules signature du corpus sont absentes (grep sur le brouillon).
  **Réserve** : `content-corpus/` est gitignoré et **absent du clone**, le grep de contrôle
  n'a donc pas pu être joué contre le corpus lui-même.

### Phase 4 — Netlinking
**Aucun contact rédigé ni envoyé — c'est volontaire, deux raisons cumulées :**
1. L'accès réseau sortant vers les domaines tiers est **bloqué** (`EGRESS_BLOCKED` sur
   service-public.fr, blocage de vérification de domaine sur agirc-arrco.fr). Impossible
   donc de lire 2-3 contenus d'une cible, ce qu'exige l'étape 1 de la Phase 4. Fabriquer
   un compliment précis sans avoir lu violerait la doctrine elle-même.
2. Règle « donner avant de demander » : aucune de ces cibles n'a encore été citée dans un
   article Capital Retraite. Le contact ne peut donc pas avoir lieu à ce cycle, même si
   l'egress était ouvert.

Cibles **identifiées** (via WebSearch, qui fonctionne), à valider par Alexandre :
| Cible | Pourquoi elle est complémentaire | Réserve |
|---|---|---|
| jobpublic.fr | Audience fonctionnaires, contenu RH/statut, aucune offre patrimoniale | La plus prometteuse : recoupe le guide fonctionnaires sans concurrence |
| emploi-collectivites.fr | Même logique, fonction publique territoriale | À qualifier |
| aide-sociale.fr | Vulgarisation droits sociaux/RAFP, pas de lead gen patrimonial | À qualifier |
| previssima.fr | Média assurance/prévoyance, angle différent | Structure éditoriale à vérifier |
| devenir-rentier.fr | Communauté FIRE francophone citée par le SKILL | Forum : logique de contribution, pas de demande de lien |

Écartés d'emblée comme **concurrents directs sur la conversion** (ils vendent un bilan
patrimonial ou un audit gratuit) : hagnere-patrimoine.fr, auguste-patrimoine.fr.

### Phase 5 — Preuve sociale
Aucune action possible sans données : pas d'accès CRM/cabinet pour savoir si des leads du
site sont devenus clients, aucun connecteur réseau social ni email dans la session, egress
bloqué pour repérer d'éventuelles mentions. Suggestions formulées à Alexandre dans le
rapport de session, rien envoyé.

### Positions éditoriales en attente
**Aucune touchée par ce guide.** Le sujet (relevé de carrière, droits du régime général)
n'aborde ni la rente viagère hors PER, ni le mix rente + retraits, ni la nue-propriété de
SCPI. Les trois restent en attente de validation.

### Décisions pour le cycle 002
1. **Sujet pressenti : « Retraite des cadres — Agirc-Arrco et taux de remplacement »**,
   conditionné à la fourniture par Alexandre du PASS et de la valeur du point Agirc-Arrco
   (à ajouter dans `hypotheses.js`, marqués « À VÉRIFIER »). Sinon, repli sur un sujet
   sans chiffre nouveau.
2. **Phase 4 : citer d'abord.** Le prochain guide doit citer honnêtement 1-2 des cibles
   ci-dessus si elles apportent une vraie valeur au lecteur ; le premier contact
   n'interviendra qu'au cycle suivant, et seulement si Alexandre a lu les cibles lui-même
   (contournement de l'egress prévu par le SKILL).
3. **Trancher la convention de lien interne** (`<a href>` vs `<Link to>`) une fois pour
   toutes, et l'inscrire dans le SKILL — aujourd'hui SKILL et code se contredisent.

### Limites rencontrées (à lever pour accélérer)
- **Egress sortant bloqué** vers les domaines tiers : `EGRESS_BLOCKED` confirmé sur
  service-public.fr, échec de vérification de domaine sur agirc-arrco.fr. Même symptôme
  que celui déjà observé sur reitdividend.com avec le même compte. **WebSearch fonctionne**
  (titres + extraits), mais ne remplace pas la lecture d'une source primaire.
- Aucun connecteur analytics/SEO (Search Console, GA4, Ahrefs) : Phases 1 et 2 restent
  manuelles et aveugles sur les KPIs.
- `content-corpus/` absent du clone : contrôle anti-plagiat limité au grep des formules
  signature connues.
- Branche : le SKILL prévoit `seo-cycle-AAAA-MM-JJ`, mais la session est contrainte par sa
  configuration à publier sur `claude/zen-fermi-u6h7r7`. C'est cette dernière qui a été
  utilisée. Intention respectée (aucun commit sur main, PR ouverte, pas d'auto-merge).
