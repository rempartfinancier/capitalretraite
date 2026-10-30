# Plan de refonte — capitalretraite.com en machine à leads autonome

> Document destiné à une session Claude (Sonnet) qui exécute le plan seule, sprint par sprint.
> Lire en entier avant de coder. Une PR par sprint, jamais de push direct sur `main`, jamais d'auto-merge.
> Voir aussi : `CLAUDE.md` du dossier parent (vouvoiement, ton oral), skill `endless-customers`, `.claude/skills/croissance-seo-carnegie/SKILL.md` (garde-fous conformité, à conserver).

## 0. Objectif et règles absolues

**Objectif** : un site indépendant qui capte des visiteurs qualifiés via des articles sur la retraite et son actualité, répond honnêtement à leurs questions (méthode Endless Customers), et les convertit en leads (simulateur, bilan, lead magnets, séquences email) sans intervention manuelle.

**Règle absolue n°1 — aucune trace de marque personnelle dans ce qui est indexable.**
Personne ne doit pouvoir arriver sur ce site en cherchant « Alexandre Pollet » ou « Le Rempart Financier » sur Google. Concrètement, ces deux chaînes (et variantes : « Pollet », « Rempart », « rempartfinancier ») sont **interdites** dans :
- toute `<meta name="description">`, `<title>`, balises Open Graph / Twitter ;
- tout JSON-LD (Organization, Person, Article `author`, `publisher`, `sameAs`…) ;
- le texte visible des pages indexables (en-tête, pied de page, encart auteur, corps d'article, FAQ, alt d'images) ;
- les liens sortants vers `rempartfinancier.fr` (un lien crée une association que Google exploite) ;
- les noms de fichiers publics (PDF, images), le sitemap, `robots.txt`, les flux.
Exception juridique : les mentions légales sont obligatoires (éditeur, directeur de publication). Elles restent, mais la page passe en `noindex` et n'est plus liée depuis le texte courant (seulement le lien discret du pied de page). À faire valider par Alexandre (voir §7, décision D1).

**Règle absolue n°2 — conformité** (reprise des garde-fous du skill SEO existant) : aucune promesse de rendement, chiffres uniquement via `src/components/hypotheses.js` (datés, sourcés), jamais de conseil personnalisé, rappel de risque, pas de contenu profond SCPI (survol + renvoi réseau interdit désormais, voir §7 D2). Une seule entité peut être citée comme conseil en investissement : Épargne Plurielle (CIF, ORIAS 16003696) ; EXP Capital n'est jamais présenté comme CIF.

**Règle absolue n°3 — vouvoiement** partout, y compris titres, CTA, FAQ, exemples chiffrés.

**Contrôle automatique obligatoire (à créer au Sprint 1, à lancer avant chaque commit)** : `scripts/check-marque.mjs` qui parcourt `dist/**/*.html`, `public/**/*` et `src/**` et échoue si `/pollet|rempart/i` apparaît hors `src/pages/MentionsLegales.jsx` et hors `api/` (code serveur non public). Brancher dans `package.json` : `"check:marque": "node scripts/check-marque.mjs"` et l'appeler dans `build`.

## 1. Revue de l'existant (état au 2026-10-20)

### Ce qui est solide (à conserver)
- 53 routes : 5 stratégies, ~40 guides au gabarit Endless Customers (coût, versus, risques, « meilleur »), simulateur retraite avec moteur testé (`src/lib/simulateur-retraite`), lead magnet PDF (grille d'audit assurance-vie), bilan, contact.
- SSG par prerender : HTML complet pour les crawlers.
- `hypotheses.js` comme source unique des chiffres, avec date de mise à jour (`HYPOTHESES_MAJ = "juillet 2026"`).
- Routine SEO existante (`croissance-seo-carnegie`) et journal de cycles.
- Fonctions serveur Vercel pour l'envoi des leads (Brevo + CRM), désormais protégées par un filtre anti-spam (branche `anti-spam-formulaires`).

### Problèmes constatés

**A. Marque personnelle partout (bloquant vis-à-vis de la règle n°1)**
| Fichier | Problème |
|---|---|
| `scripts/prerender.mjs:23-25` | JSON-LD Organization : `name: "Capital Retraite — Le Rempart Financier"` et `sameAs: ["https://rempartfinancier.fr"]` sur la page d'accueil |
| `src/components/Layout.jsx:6,18-21` | « Un service Le Rempart Financier » en en-tête de **toutes** les pages, lien vers rempartfinancier.fr |
| `src/components/Layout.jsx:68-72` | idem en pied de page |
| `src/components/Layout.jsx:99-102` | `AuthorBox` : « Alexandre Pollet — Conseiller en gestion de patrimoine » sur chaque guide |
| `src/pages/Home.jsx:225-235` | bloc « à propos » avec lien Le Rempart Financier |
| `src/pages/MentionsLegales.jsx` | « Directeur de la publication : Alexandre Pollet » (légalement requis, voir D1) |
| `README.md`, `docs/`, journal SEO | mentions internes : acceptables (non publiées, hors `dist/`) mais ne pas les copier dans `public/` |
Les `<meta description>` actuelles dans `src/routes.jsx` ne contiennent pas ces noms : le travail porte sur le JSON-LD, l'en-tête, le pied de page, l'encart auteur et la page d'accueil.

**B. Pas de couche « actualité »** : tout le contenu est evergreen. Aucun article daté, aucun `NewsArticle`/`Article` JSON-LD, aucune page d'archive. Le site ne capte donc aucune recherche liée à l'actualité (réforme, barèmes, seuils, annonces gouvernementales) — pourtant très forte en volume et en réseau de liens.

**C. Ajouter un article coûte 4 fichiers** : page JSX + entrée `routes.jsx` + entrée `Guides.jsx` + `App.jsx` (et `sitemap.xml` à la main). Frein à un rythme de plusieurs articles par semaine. À remplacer par un système data-driven (§3 Sprint 2).

**D. Entonnoir de leads incomplet**
- `CALENDLY_URL` contient encore `A-COMPLETER` (`src/components/config.js:6`) : la prise de rendez-vous n'est pas branchée ; le formulaire de bilan dit « nous revenons vers vous » sans créneau.
- Lead magnet : `BREVO_FORM_ACTION_GUIDE` (URL d'action Brevo, no-cors, pas de vérification de succès) et aucun email de livraison/confirmation ni séquence de relance : un visiteur qui laisse son email n'entend plus jamais parler du site.
- Un seul lead magnet (assurance-vie), un seul simulateur ; rien d'adapté aux autres grandes intentions (PER, transmission, cumul emploi-retraite, rachat de trimestres).
- Les pages guides renvoient presque toutes vers « Bilan retraite gratuit » (engagement élevé) ; pas de « petit pas » intermédiaire (calculateur, checklist, email de série).
- Pas de maillage interne systématique entre guides (constat déjà noté dans le skill SEO).
- Suivi : GTM installé, événement `generate_lead` posé seulement sur le contact ; pas d'événements pour simulateur démarré/terminé, lead magnet, clic RDV, scroll d'article.

**E. SEO technique**
- `public/sitemap.xml` maintenu à la main (53 URL) : le générer depuis `routesMeta` dans `scripts/prerender.mjs` avec `lastmod` réel.
- Pas de `og:image`, pas de `og:site_name`, pas de `twitter:card`.
- Pas de JSON-LD `Article`/`FAQPage`/`WebSite` (SearchAction inutile) ; seulement `BreadcrumbList` et `Organization` (accueil).
- Pas de date de publication / mise à jour visible sur les guides (signal de confiance, indispensable pour de l'actualité).
- Pas de page d'auteur ni d'identité éditoriale neutre (voir §2).
- Polices Google chargées à l'externe (RGPD, performance) : héberger en local.
- Aucun test de non-régression SEO (title ≤ 70, description ≤ 160, une seule `h1`, canonical, présence JSON-LD).

**F. Conformité / gouvernance** : positions éditoriales en attente de validation (rente viagère hors PER, mix rente + retraits, nue-propriété SCPI) — ne pas les trancher. Le bandeau de consentement cookies n'existe pas alors que GTM est chargé : à traiter avec Alexandre (D3) avant toute montée en trafic.

## 2. Identité éditoriale neutre

Le site devient une publication autonome : **« Capital Retraite »**, sans mention de personne ni de marque-mère.
- En-tête : retirer « Un service Le Rempart Financier » (`Layout.jsx`).
- Pied de page : `© {année} capitalretraite.com` + ligne légale obligatoire « EXP Capital, SASU… ORIAS n° 25005915 » (identification d'intermédiaire exigée) + mention CIF « Conseil en investissements financiers délivré via Épargne Plurielle, CIF — ORIAS n° 16003696 » si le contenu conseille. Aucune personne nommée.
- `AuthorBox` → « La rédaction de Capital Retraite — conseillers en gestion de patrimoine. Contenu pédagogique, relu avant publication. » (pas de nom). Ajouter « Dernière mise à jour : <date> » et « Sources » (liens vers DREES, COR, service-public, Legifrance, info-retraite.fr, impots.gouv.fr).
- JSON-LD : `Organization` `name: "Capital Retraite"`, `url`, **sans** `sameAs` vers la marque-mère ; `Article.author` = `Organization` Capital Retraite ; `publisher` idem.
- Page d'accueil : supprimer le bloc « à propos » qui cite la marque-mère ; garder une section « Qui publie ce site ? » factuelle (rédaction + mentions légales) sans noms propres.
- Vidéos/visages : le pilier « humain » d'Endless Customers passe ici par des **cas anonymisés**, des « questions entendues en rendez-vous » et la voix de la rédaction. Pas de visage, pas de nom, pas de signature.
- Hors site (à signaler, non automatisable) : fiche Google Business, comptes sociaux, WHOIS, signatures d'email, profils de netlinking. Vérifier qu'aucun ne relie le domaine à la marque personnelle.

## 3. Plan d'exécution par sprints

### Sprint 1 — Purge de marque + hygiène (1 PR, priorité absolue)
1. Appliquer §2 : `Layout.jsx`, `Home.jsx`, `scripts/prerender.mjs` (Organization sans sameAs ni marque), `MentionsLegales.jsx` en `noindex` (ajouter une propriété `noindex: true` dans `routesMeta` et la gérer dans `buildHead` → `<meta name="robots" content="noindex, follow">`).
2. Créer `scripts/check-marque.mjs` (voir §0) et le brancher sur `build`. Doit passer au vert.
3. Retirer la page mentions légales du sitemap.
4. Remplacer `HUB_URL` et tout lien `rempartfinancier.fr` ; supprimer les liens vers les sites sœurs (scpirentable.fr, immobilierpassif.com, assurancevie.lu) s'ils existent dans le contenu : ce sont des liens qui rattachent le site au réseau (voir D2).
5. Ajouter `og:site_name`, `og:image` (visuel neutre 1200×630 à générer), `twitter:card`.
6. Tests : `npm run build` puis `grep -rIiE "pollet|rempart" dist | grep -v mentions-legales` doit ne rien renvoyer.

### Sprint 2 — Socle « actualités » data-driven (1 PR)
Créer un système où un nouvel article = **un seul fichier Markdown/JSX + une entrée de données**.
1. `src/content/articles/` : un fichier par article avec frontmatter (`slug`, `type: "actualite" | "guide"`, `big5: "prix" | "problemes" | "versus" | "avis" | "meilleurs" | "actu"`, `title`, `description`, `datePublication`, `dateMiseAJour`, `categorie`, `liensInternes`, `faq`, `sources`). Choisir MDX ou JSX + un composant gabarit `ArticleLayout` (titre-question, réponse en une phrase en gras, sommaire, FAQ, conclusion « 4 R », dates, `RiskNotice`, `AuthorBox` neutre, CTA contextuel).
2. `routes.jsx` : générer automatiquement les routes et `routesMeta` à partir de ces fichiers ; idem `Guides.jsx` (catégories déduites) et le sitemap (`lastmod` = `dateMiseAJour`). Les 40 guides existants restent tels quels (ne pas migrer en bloc) ; seuls les nouveaux articles utilisent le système.
3. Nouvelles pages : `/actualites` (liste chronologique, filtres par thème), `/actualites/<slug>` ; conserver `/guide/<slug>` pour l'evergreen. JSON-LD `Article` (ou `NewsArticle` pour l'actu) avec `datePublished`, `dateModified`, `author` = organisation.
4. Bloc « À lire ensuite » généré automatiquement (3 liens internes par thème) + « Mis à jour le… » visible.
5. Test Vitest de cohérence : pour chaque article, title ≤ 70, description ≤ 160, slug unique, une seule `h1`, au moins 3 liens internes sortants, présence de `sources`, absence de « tu/ton/tes », absence des chaînes interdites.
6. Flux `feed.xml` (RSS) généré au build.

### Sprint 3 — Entonnoir de leads complet (1 à 2 PR)
Principe Endless Customers : donner le contrôle (outils), ne pas forcer le rendez-vous.
1. **Brancher la prise de rendez-vous** : renseigner `CALENDLY_URL` (ou le widget iClosed déjà présent dans `IClosedWidget.jsx`) ; vérifier que l'écran de confirmation du bilan affiche le calendrier. À fournir par Alexandre (D4).
2. **Remplacer les soumissions Brevo no-cors** (`postToBrevo`) par une fonction serveur `api/subscribe.js` qui crée/met à jour le contact via l'API Brevo (clé côté serveur uniquement), l'inscrit à une liste par source (`lead_magnet_av`, `simulateur`, `bilan`, `newsletter`) et renvoie un vrai succès/échec. Réutiliser `api/_antispam.js`.
3. **Séquences email (Assignment Selling)** configurées dans Brevo (documenter les textes dans `docs/emails/`, vouvoiement, aucune mention de marque personnelle, désinscription obligatoire) :
   - J0 : livraison du lead magnet + 1 article « à lire avant l'échange ».
   - J2 / J5 / J9 : un article Big 5 par jour correspondant à l'objection suivante (coût, risques, versus).
   - J12 : invitation douce au bilan de 15 minutes.
4. **Nouveaux lead magnets** (un par grande intention, PDF généré ou page dédiée) : « Checklist préparer sa retraite à 5 ans de l'échéance » ; « Grille de vérification de votre relevé de carrière » ; « Tableau des frais PER à comparer » ; chacun avec page d'atterrissage au gabarit existant (`LeadMagnetAuditAssuranceVie.jsx`). Aucun nom de personne dans les PDF ni leurs métadonnées (`/Author`, `/Creator` à nettoyer).
5. **Outils en libre-service** (pilier « vendre autrement ») : calculateur « combien coûte vraiment mon PER / mon assurance-vie » (fourchette + hypothèses visibles), calculateur de trimestres manquants / rachat, estimateur de décote-surcote, sélecteur « quelle enveloppe pour mon objectif ? » qui peut répondre « aucune de nos pistes ne vous correspond ». Chaque outil : résultat affiché d'abord, coordonnées demandées pour recevoir le détail par email.
6. **CTA contextuels** : chaque article propose le petit pas le plus proche (outil ou lead magnet lié au thème) avant le bilan.
7. **Suivi GTM** : événements `generate_lead` (avec `lead_source`), `simulateur_start`, `simulateur_complete`, `lead_magnet_download`, `rdv_click`, `article_read_75`. Tableau de bord = journal de cycle.
8. **Consentement cookies** (D3) avant de charger GTM.

### Sprint 4 — Production de contenu (en continu, rythme cible 2 à 3 articles par semaine, 5 à 10 en stock avant d'ouvrir `/actualites`)
Suivre le skill `endless-customers` : réponse en une phrase, titres-questions, sections modulaires, FAQ, conclusion « 4 R », tableaux, « pour qui ce n'est PAS adapté ». Le Big 5 doit représenter 60 à 70 % du contenu.

**Articles evergreen manquants (Big 5)**
- Prix : « Combien coûte un PEA ? », « Combien coûte un rachat de trimestres pour une carrière incomplète ? » (existe, à compléter en cas par cas), « Combien coûte un courtier en ligne pour un PER ? », « Quels frais sur un fonds euros ? », « Combien coûte la gestion sous mandat ? ».
- Problèmes : « Pourquoi ma pension est-elle plus basse que prévu ? », « Que se passe-t-il si je pars en retraite avec une carrière à trous ? », « Risques du fonds euros », « Pièges du cumul emploi-retraite », « Que devient mon PER à mon décès ? ».
- Versus : « Retraite par répartition ou capitalisation », « Rachat de trimestres ou PER », « Retraite progressive ou cumul emploi-retraite », « PEA ou compte-titres », « SCPI ou assurance-vie » → traiter uniquement comme survol, sans renvoi vers le réseau.
- Avis : « Avis sur les simulateurs retraite officiels (info-retraite.fr, M@rel) : ce qu'ils disent et ce qu'ils ne disent pas », « Le PER est-il fait pour vous ? (qui devrait s'en passer) ».
- Meilleurs : « Les meilleurs critères pour choisir un PER » (critères, méthode de classement, biais déclaré, aucun palmarès nominatif de produits sans divulgation).

**Actualités à surveiller (modèle : une page « Ce que ça change pour vous » dans les 48 h)**
Sources à interroger à chaque cycle (WebSearch) : service-public.fr, info-retraite.fr, Legifrance / Journal officiel, COR (Conseil d'orientation des retraites), DREES, Agirc-Arrco, CNAV, Les Échos Patrimoine, Le Monde Argent, Ministère de l'Économie.
Thèmes récurrents : revalorisation annuelle des pensions (janvier / novembre) ; âge légal et durée de cotisation (réforme en vigueur, évolutions annoncées) ; plafonds PER / PEA / assurance-vie ; barème de l'impôt et seuils ; Agirc-Arrco (valeur du point) ; réforme du minimum contributif ; loi de finances (octobre – décembre) ; fiscalité de l'assurance-vie et des successions ; rapports du COR (juin et novembre). Chaque article d'actualité : (1) ce qui change, (2) pour qui, (3) chiffres sourcés et datés, (4) ce que cela ne change pas, (5) lien vers l'outil ou l'article evergreen concerné, (6) mise à jour datée si le sujet évolue.
Règle éditoriale : on commente les faits, on ne spécule jamais sur une réforme non votée sans le dire ; chaque chiffre fiscal passe par `hypotheses.js` avec sa date.

### Sprint 5 — Autorité et distribution (sans marque personnelle)
- Netlinking par la valeur donnée (reprendre les principes de la routine Carnegie) : citer les sources officielles, proposer à des médias et blogs patrimoniaux des données chiffrées originales tirées des outils (« combien de trimestres manquent aux assurés nés en… »), sans jamais mentionner la marque personnelle dans les emails d'approche (signature « La rédaction de Capital Retraite »).
- Newsletter hebdomadaire « La semaine retraite » générée à partir des 3 meilleurs articles de la semaine.
- Visibilité IA (GEO) : réponses extractibles en tête d'article, FAQ balisée, sources et dates, signaux d'auteur neutres mais cohérents, `llms.txt` à la racine décrivant le site.

## 4. Gabarit d'article (à copier pour chaque contenu)

```
Titre (≤ 70 car., reprend la question) · méta (≤ 160 car., sans nom propre ni marque) · slug simple
Réponse en une phrase, en gras
Sommaire
H2 titre-question → réponse en une phrase → contexte court → tableau / calcul → lien interne
… (une section par facteur : ce qui fait monter, baisser, qui est concerné, qui ne l'est pas)
Exemple chiffré avec hypothèses (depuis hypotheses.js)
FAQ (4 à 6 questions réelles, balisage FAQPage)
Conclusion 4 R : Rappeler / Résoudre les doutes / Réintroduire (une ligne, rédaction) / Recommander (outil puis bilan)
Sources · Date de publication · Date de mise à jour · RiskNotice
```

## 5. Définition de « terminé » (par sprint)
- `npm run build` vert, `check:marque` vert, tests Vitest verts.
- Aucune occurrence de « Pollet » / « Rempart » hors `MentionsLegales.jsx` et `api/`.
- Chaque nouvelle page : 1 `h1`, canonical, description ≤ 160 car., JSON-LD valide, ≥ 3 liens internes, ≥ 1 CTA petit pas, `RiskNotice`, relecture vouvoiement (grep `\b(tu|ton|ta|tes|toi)\b`) et relecture conformité (skill `reel-relecture-cgp`).
- Rapport de fin de sprint dans `.claude/skills/croissance-seo-carnegie/journal.md` : ce qui est fait, mesures, décisions en attente.

## 6. Ordre recommandé
1. Merger la branche `anti-spam-formulaires` (déjà poussée).
2. Sprint 1 (purge de marque) — bloquant pour toute promotion du site.
3. Sprint 2 (socle articles) puis Sprint 3 (entonnoir) en parallèle d'un début de Sprint 4.
4. Ouvrir `/actualites` publiquement une fois 5 articles prêts.

## 7. Décisions à obtenir d'Alexandre (à poser avant d'exécuter, ne pas trancher seul)
- **D1** — Mentions légales : le nom du directeur de publication est obligatoire (LCEN). Option recommandée : page `noindex`, accessible depuis le pied de page uniquement. Alternative : désigner le représentant légal de la société sans le nommer ailleurs.
- **D2** — Faut-il couper tous les liens vers les sites sœurs (scpirentable.fr, immobilierpassif.com, assurancevie.lu) pour une indépendance totale ? Recommandé : oui.
- **D3** — Bandeau de consentement cookies (GTM chargé sans consentement) : choisir un outil (ex. Axeptio, Tarteaucitron) ; sans lui, ne pas lancer de campagne de trafic.
- **D4** — URL Calendly / iClosed et liste Brevo à utiliser par source de lead.
- **D5** — Positions éditoriales en attente (rente viagère hors PER, mix rente + retraits, nue-propriété SCPI).
- **D6** — Témoignages : l'AMF et les règles de démarchage encadrent les témoignages clients ; ne publier que des cas anonymisés après validation.
