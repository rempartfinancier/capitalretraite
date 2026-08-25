---
name: croissance-seo-carnegie
description: Routine bi-hebdomadaire pour faire de capitalretraite.com une référence SEO sur la préparation retraite (PER, assurance-vie, PEA, immobilier, décumulation), en appliquant les principes de "Comment se faire des amis" de Dale Carnegie au contenu et au netlinking. Déclencher sur "lance la routine SEO", "cycle croissance", "routine Carnegie", ou en tâche planifiée toutes les 2 semaines.
---

# Routine de croissance SEO Capital Retraite — méthode Carnegie

## Pourquoi cette routine existe

capitalretraite.com vise les cadres et fonctionnaires de 45 à 60 ans qui préparent leur retraite (PER, assurance-vie, PEA, décumulation, immobilier). Le site a déjà 37 guides + 5 pages stratégies + simulateur + lead magnet, mais le maillage interne entre guides est quasi inexistant (aucun `<Link>` vers un autre guide dans les pages inspectées à la création de cette routine) et le netlinking externe est à construire depuis zéro.

Dale Carnegie n'est pas un gadget ici : les CGP et sites patrimoniaux contactés pour un échange de lien ignorent les demandes génériques. Le seul levier qui marche à ce stade (audience et budget limités) est l'intérêt sincère et la valeur donnée en premier — c'est littéralement la thèse du livre. Chaque axe ci-dessous traduit un principe Carnegie en action SEO concrète.

## Garde-fous non négociables

- **Jamais d'envoi automatique.** Cette routine PRODUIT des brouillons (articles, emails, messages LinkedIn). Rien ne part sans validation explicite d'Alexandre dans le chat, à chaque envoi.
- **Jamais de push direct sur main.** Tout travail se fait sur une branche dédiée, suivie d'une pull request vers main via `gh pr create`. Jamais d'auto-merge, jamais de commit direct sur main/master. Nom de branche cible : `seo-cycle-AAAA-MM-JJ` — mais une session cloud (RemoteTrigger) démarre parfois déjà positionnée sur une branche assignée par la plateforme (ex. `claude/xxx-yyy`) qu'il n'est pas possible de renommer. Dans ce cas, rester sur cette branche : ce qui compte est l'intention du garde-fou (aucun commit direct sur main, PR ouverte, pas d'auto-merge), pas le nom littéral.
- **Une seule entité publiable comme conseil en investissement : Épargne Plurielle (CIF, ORIAS 16003696).** EXP Capital est l'éditeur légal (courtier/MIA/MIOBSP) mais n'est **jamais** CIF — ne jamais écrire « EXP Capital, CIF » ni qualifier Alexandre Pollet personnellement de CIF ou d'« indépendant ». Formulation canonique de l'encart auteur : « Alexandre Pollet — Conseiller en gestion de patrimoine, EXP Capital. Conseil en investissements financiers délivré via Épargne Plurielle, CIF — ORIAS n° 16003696. »
- **Anti-cannibalisation réseau.** Ne jamais produire de contenu profond sur les SCPI ni de comparateur multi-actifs sur ce site — survol seulement, avec lien sortant vers scpirentable.fr (souscription/analyse SCPI) et immobilierpassif.com (comparaison véhicules immobiliers) quand c'est pertinent. L'assurance-vie luxembourgeoise renvoie vers assurancevie.lu. Ces domaines du réseau (comme les autres sites listés dans `Documents/Sites Github Desktop/`) ne sont **pas** des cibles de netlinking Phase 4 — ce sont des sites sœurs du même propriétaire, pas des tiers indépendants.
- **Conformité éditoriale stricte.** Jamais de promesse de rendement, chiffres toujours datés/sourcés depuis `src/components/hypotheses.js` (jamais de taux inventé ou en dur ailleurs), avis cadrés « notre analyse » / « piste de réflexion », jamais de conseil personnalisé, rappel que les performances passées ne préjugent pas des futures, ne pas confondre supports garantis et unités de compte.
- **Positions éditoriales encore en attente de validation humaine.** Ne pas trancher fermement sur : la rente viagère hors PER, le mix rente + retraits programmés, la nue-propriété de SCPI. Si un article aborde ces sujets, les présenter comme option neutralisée (« combinaison possible », sans recommandation) et le signaler explicitement dans le rapport de clôture (Phase 6) pour validation par Alexandre — ne jamais lever ce flou soi-même.
- **Pas de seuil de TMI magique pour le PER**, présenté d'abord comme outil de protection familiale/transmission (la déduction fiscale = report d'imposition, pas un calcul d'optimisation par tranche).
- **Piège plagiat corpus.** `content-corpus/` (gitignoré) contient le corpus éditorial de calibrage — s'en servir pour le ton, jamais recopier une phrase. Formules signature à ne jamais reproduire telles quelles : « prix d'un expert/résultat d'un robot », « caisse automatique », « pour quel service payez-vous ? », triade « disponibilité, performance nette, sécurité successorale ». Après rédaction, `grep` ces expressions dans `content-corpus/` pour vérifier qu'aucune n'a été recopiée mot pour mot.

## Vue d'ensemble du cycle (14 jours)

| Phase | Jours | Axe | Principe Carnegie dominant |
|---|---|---|---|
| 1. Bilan | J1–2 | Mesure du cycle précédent | « Admettez vite et énergiquement vos erreurs » |
| 2. Recherche | J3–4 | Mots-clés & angle Big 5 | « Voyez les choses du point de vue de l'autre » (le lecteur) |
| 3. Production | J5–9 | Article + maillage interne | « Manifestez un intérêt sincère » (pour le problème du lecteur) |
| 4. Netlinking | J9–12 | Approche de sites complémentaires | Tous les principes relationnels (détail ci-dessous) |
| 5. Preuve sociale | J12–13 | Avis, témoignages, réseau | « Faites sentir à l'autre son importance » |
| 6. Clôture | J14 | Rapport + décisions GO/NO-GO | Boucle fermée |

---

## Phase 1 — Bilan (J1–2)

1. Relire le rapport de clôture du cycle précédent dans `.claude/skills/croissance-seo-carnegie/journal.md` (à la racine du repo). S'il n'existe pas, c'est le premier cycle — passer directement à la Phase 2.
2. Vérifier les KPIs disponibles :
   - Trafic organique par page `/guide/*` et `/strategies/*` (Search Console si connecté, sinon GA4/GTM — le site a déjà GTM installé, GTM-5TFZ445H).
   - Conversions `generate_lead` par `lead_source` (événement dataLayer déjà câblé sur les points de capture — bilan retraite, contact, guide-audit-assurance-vie).
   - Nouveaux backlinks obtenus depuis le dernier cycle (Ahrefs si le connecteur `marketing:ahrefs` est autorisé ; sinon recherche manuelle via `site:` + nom de domaine).
3. Statuer honnêtement sur ce qui n'a pas marché (message d'outreach sans réponse après 2 relances → abandonner cette cible ; sujet d'article sans trafic après 2 cycles → réévaluer l'angle). Carnegie : mieux vaut reconnaître vite un mauvais choix que le défendre.

## Phase 2 — Recherche mots-clés & angle (J3–4)

Utiliser le skill `endless-customers-article` (Big 5 : coût, problèmes, comparatifs, "meilleur de", avis) comme grille.

1. Identifier 3 à 5 candidats de sujets via :
   - Gaps dans les 37 guides existants (`src/routes.jsx` liste tous les guides avec title/description ; `src/pages/Guides.jsx` les classe par catégorie — vue-ensemble, comparatifs, per, assurance-vie, pea, immobilier, decumulation, mecanique-retraite, profils-specifiques). Repérer les sous-thèmes Big 5 encore absents dans chaque catégorie.
   - Recherche de mots-clés (Ahrefs si autorisé ; sinon WebSearch pour repérer les questions fréquentes, "PAA", forums, et les pages qui rankent aujourd'hui en France sur ces requêtes retraite/PER/assurance-vie).
   - Retours qualitatifs du cabinet si Alexandre en a (à demander).
2. Choisir UN sujet prioritaire pour ce cycle (mieux vaut un article profond que trois superficiels). Vérifier qu'il ne viole pas la règle anti-cannibalisation SCPI (survol seulement, jamais de comparateur SCPI profond).
3. Identifier, dans la même recherche, 3 à 5 sites tiers pertinents et complémentaires (pas concurrents directs sur « bilan retraite gratuit » ou la même requête de conversion) à citer honnêtement dans l'article s'ils apportent une vraie valeur : données officielles (DREES, COR, service-public.fr), analyses spécialisées, médias patrimoniaux avec un angle différent. Ce sont les graines du netlinking de la Phase 4 — on cite avant de demander, jamais l'inverse.

## Phase 3 — Production (J5–9)

1. Rédiger l'article/guide avec le skill `endless-customers-article`. Reprendre le style du site : synthèse « concession → nuance → contre-argument chiffré », voix « notre analyse », jamais « je ».
2. Chiffres : réutiliser exclusivement `src/components/hypotheses.js` (tous les blocs y sont marqués « À VÉRIFIER » — ne jamais inventer un nouveau taux ; si une donnée manque, la signaler en Phase 6 plutôt que l'inventer).
3. Citer sincèrement les 3–5 sources tierces identifiées en Phase 2 quand elles apportent une vraie valeur au lecteur — jamais une citation forcée juste pour amorcer un lien retour.
4. **Maillage interne (le point faible actuel du site — priorité réelle, pas cosmétique) :**
   - Ajouter 2 à 4 liens `<a href="/guide/...">` depuis le nouvel article vers des guides existants pertinents — convention réelle du site : les 37 guides utilisent tous `<a href>` dans le corps de texte, jamais le composant `<Link>` de react-router-dom (qui n'est utilisé que dans `Guides.jsx`, `Home.jsx` et quelques pages de navigation). Suivre la convention du code, pas `<Link>`.
   - Ajouter en retour 1 à 2 liens depuis des guides existants pertinents vers le nouvel article (édition manuelle de ces pages — il n'existe aucun composant « à lire ensuite » automatique sur ce site, contrairement à reitdividend.com ; chaque lien s'ajoute à la main dans le JSX).
   - Enregistrer le nouveau guide dans `src/pages/Guides.jsx`, dans la catégorie la plus pertinente (vue-ensemble / comparatifs / per / assurance-vie / pea / immobilier / decumulation / mecanique-retraite / profils-specifiques).
5. Câblage technique complet (aucune étape n'est automatique sur ce site) :
   - Créer `src/pages/GuideXxx.jsx`.
   - L'ajouter dans `src/routes.jsx` (title, description, breadcrumb — source de vérité SEO unique, consommée par l'app ET par `scripts/prerender.mjs`).
   - L'importer et l'enregistrer dans `src/App.jsx` (import + `<Route>`).
   - L'ajouter dans `src/pages/Guides.jsx` (étape 4 ci-dessus).
   - **Ajouter l'URL dans `public/sitemap.xml` manuellement** (pas de génération automatique sur ce site, à la différence de reitdividend.com — vérifier que l'entrée est bien présente avant de clore le cycle).
6. Vérifications techniques obligatoires avant de proposer à la relecture : `bun run typecheck`, `bun run test`, `bun run build` (le build enchaîne vite client + SSR + prerender — vérifier que le nombre de pages générées augmente bien de 1 et qu'aucune page ne sort vide).
7. `grep` les formules signature du corpus (voir garde-fous) dans le brouillon pour écarter tout plagiat accidentel.
8. Soumettre l'article à relecture d'Alexandre avant tout commit/déploiement — voir garde-fou branche dédiée + PR.

## Phase 4 — Netlinking façon Carnegie (J9–12)

C'est le cœur de la demande initiale. Chaque cible passe par cette séquence, jamais raccourcie :

1. **Intérêt sincère avant tout contact.** Lire réellement 2–3 contenus récents du site cible. Identifier le prénom du rédacteur/fondateur (jamais "cher partenaire", jamais de formulaire de contact générique si un email nominatif existe).
2. **Donner avant de demander.** Le contact n'a lieu qu'*après* que le site a été cité honnêtement dans un article Capital Retraite (Phase 3, ce cycle ou un cycle antérieur). On ne demande jamais un lien à un site qu'on n'a pas encore mentionné.
3. **Complimenter précisément, pas vaguement.** Le message d'ouverture cite un point concret et vrai de leur contenu — pas "super site !".
4. **Parler de leurs intérêts, pas des nôtres.** Le message explique ce que Capital Retraite apporte à EUX (audience cadres/fonctionnaires 45-60 ans, angle méthodique PER/assurance-vie/décumulation qui complète leur contenu, pas de concurrence directe) avant de mentionner un intérêt réciproque.
5. **Laisser l'idée venir d'eux.** Formuler comme une observation ("nos lecteurs se recoupent, une mention croisée aurait du sens pour les deux audiences") plutôt qu'une demande formelle de backlink. **Ne jamais utiliser le mot "backlink" ou "SEO" dans le message.**
6. **Poser une vraie question.** Terminer sur une question ouverte sur leur activité/contenu, pas sur un call-to-action.
7. **Aucun envoi sans validation.** Produire le brouillon dans la session, le présenter à Alexandre avec le nom du destinataire et la source de contact trouvée, attendre l'accord explicite avant tout envoi (email, LinkedIn, formulaire).
8. **Suivi, pas relance agressive.** Si pas de réponse sous 10–14 jours, une seule relance légère et brève au cycle suivant, puis abandon si silence (cf. Phase 1 — admettre l'échec vite).

Types de cibles à prioriser : médias/blogs patrimoniaux CGP indépendants sans offre concurrente de « bilan retraite gratuit » (angle complémentaire, pas concurrent direct sur la conversion), sites spécialisés retraite fonctionnaires (le site a un guide dédié), communautés patrimoniales/FIRE francophones (devenir-rentier.fr, forums PER/PEA), médias financiers (Investir, Le Revenu — peu réalistes à approcher directement mais à citer). À écarter : les sites qui vendent aussi un « bilan retraite » ou un audit patrimonial gratuit en lead gen (concurrents directs sur le mot-clé de conversion), et les sites du réseau Le Rempart Financier (scpirentable.fr, immobilierpassif.com, assurancevie.lu, placement-ethique, placement-halal, reitdividend.com, retraite-proflib, etc. — même propriétaire, pas des tiers).

## Phase 5 — Preuve sociale & réseau (J12–13)

Carnegie : "faites sentir à l'autre son importance — sincèrement."

1. Si des leads issus du site sont devenus clients du cabinet (à vérifier avec Alexandre, hors scope technique), suggérer une demande d'avis Google/Trustpilot personnalisée et sincère — jamais un email de masse.
2. Repérer les commentaires/mentions reçues (réseaux, forums) depuis le dernier cycle et y répondre individuellement et spécifiquement, jamais avec un template.
3. Une seule action réseau proactive par cycle maximum (ex. commentaire à valeur ajoutée sur un post LinkedIn d'une des cibles de la Phase 4, avant même le premier contact direct) — la qualité prime sur le volume.

## Phase 6 — Clôture & rapport (J14)

Produire un court rapport (dans la réponse finale de session, pas de document séparé si non demandé) :
- Guide publié (ou en attente de relecture) + sujet + emplacement dans la catégorie Guides.jsx.
- Liens de maillage interne ajoutés (dans les deux sens) et confirmation de la présence dans `public/sitemap.xml`.
- Positions éditoriales en attente touchées par l'article (rente hors PER / mix rente-retraits / nue-propriété SCPI), le cas échéant — à signaler explicitement pour validation d'Alexandre.
- Cibles de netlinking contactées ce cycle, statut de chacune (en attente / répondu / décliné / lien obtenu).
- KPIs du cycle si disponibles, ou mention explicite qu'ils n'ont pas pu être vérifiés (ne jamais inventer un chiffre de trafic/conversion).
- 1 à 3 décisions pour le cycle suivant (continuer/arrêter un axe, prochain sujet pressenti).
- Mettre à jour `.claude/skills/croissance-seo-carnegie/journal.md` (créer si absent, comme au premier cycle) avec ces éléments pour que le cycle suivant reparte du bon état — ne pas répéter une recherche déjà faite.

## Limites connues à rappeler à Alexandre si elles bloquent la routine

- Le connecteur `marketing:ahrefs` n'est pas encore autorisé dans cette session — sans lui, la recherche de mots-clés et le suivi de backlinks restent manuels (WebSearch + vérification visuelle). L'autoriser via les paramètres de connecteurs claude.ai accélérerait sensiblement les Phases 1 et 2.
- Sur reitdividend.com (même réseau, même compte), l'environnement cloud du premier cycle a bloqué tout `WebFetch`/`curl` sortant vers des domaines tiers (« policy denial »/EGRESS_BLOCKED), rendant impossible la lecture directe des sites cibles requise en Phase 4 étape 1. Si cette routine rencontre la même limite sur l'environnement de capitalretraite.com, le signaler explicitement dans le rapport de clôture plutôt que de fabriquer une citation personnalisée — cela violerait la doctrine Carnegie elle-même. Alternative : Alexandre lit lui-même 2-3 contenus des cibles identifiées et transmet ses observations dans le chat, à partir desquelles un brouillon de message authentique peut être rédigé.
