# capitalretraite.com

Site satellite retraite de l'écosystème Le Rempart Financier.
Éditeur : EXP Capital, SASU au capital de 1 000 €, RCS Versailles 987 986 247, ORIAS n° 25005915.

## Stack

- React 18 + Vite 5 + react-router 6
- **SSG par prerendering** : chaque route est rendue en HTML statique au build
  (`vite build` client → `vite build --ssr` → `scripts/prerender.mjs`).
  Le HTML servi aux crawlers est complet — pas de `<div id="root">` vide.
- Sortie : fichiers statiques dans `dist/`, déployables sur Hostinger tel quel.

## Build

```bash
npm install
npm run build        # génère dist/ avec une page HTML par route
npm run dev          # développement local
```

### Vérifier le prerendering après build

```bash
grep -c "Construisez votre capital retraite" dist/index.html          # doit être ≥ 1
grep -c "Plan Épargne Retraite" dist/strategies/per/index.html        # doit être ≥ 1
```

## Déploiement Hostinger

Uploader le contenu de `dist/` à la racine du domaine. Chaque route ayant son propre
`index.html`, aucune règle de réécriture n'est nécessaire pour le premier chargement.
Optionnel : configurer `404.html` comme page d'erreur pour couvrir les URL inconnues.

## Placeholders à compléter avant mise en ligne

| Élément | Fichier |
|---|---|
| URL Calendly | `src/components/config.js` (`CALENDLY_URL`) |
| Widget Calendly inline (optionnel) | `src/pages/Contact.jsx` (bloc commenté) |
| URLs d'action formulaires Brevo | `.env` (copier `.env.example`) |
| Adresse, SIRET, directeur de publication, hébergeur, médiateur | `src/pages/MentionsLegales.jsx` |
| Email contact RGPD | `src/pages/Confidentialite.jsx` |
| GTM (`GTM-XXXXXXX`) | `index.html` (bloc commenté) |

## ⚠️ Sécurité Brevo — important

Ce site est 100 % statique : **toute variable `VITE_*` finit dans le bundle JavaScript
livré au navigateur, donc publique**. Ne jamais y mettre la clé API Brevo (incident déjà
rencontré sur un autre site du réseau).

Solution implémentée : les formulaires POSTent vers l'**URL d'action d'un formulaire
Brevo** (Contacts → Formulaires → créer le formulaire → copier l'attribut `action`).
Cette URL ne contient aucun secret. Créer un formulaire Brevo pour le bilan (liste
dédiée) et un pour le contact, puis renseigner les deux URLs dans `.env`.

Champs attendus côté Brevo : `PRENOM`, `EMAIL`, `SMS`, `TRANCHE_AGE`,
`TRANCHE_PATRIMOINE`, `SITUATION` (bilan) ; `PRENOM`, `EMAIL`, `MESSAGE` (contact).
Adapter les attributs Brevo ou les `name` des champs dans `src/components/Forms.jsx`
pour qu'ils correspondent.

## Checklist livraison

- [x] `<title>` + `<meta description>` uniques par page (`src/routes.jsx`, injectés au prerender)
- [x] Canonicals absolus `https://capitalretraite.com/...`
- [x] JSON-LD Organization en homepage (sameAs → lerempartfinancier.fr)
- [x] JSON-LD BreadcrumbList sur chaque page intérieure
- [x] Seule l'identité EXP Capital (SASU au capital de 1 000 €, RCS Versailles 987 986 247, ORIAS n° 25005915) est utilisée — jamais Épargne Plurielle ni aucun statut CIF/mandat, aucun autre identifiant inventé, placeholders explicites pour adresse/SIRET
- [x] Aucune performance chiffrée ; aucun rendement promis ; mention de risque en pied de chaque contenu
- [x] Formulaires sans clé API en clair (URL de formulaire Brevo via variable d'environnement)
- [x] Prerendering SSG implémenté (`scripts/prerender.mjs`) — **à vérifier après `npm run build`** avec les commandes grep ci-dessus
- [x] `robots.txt` et `sitemap.xml` dans `public/`
- [ ] Placeholders complétés (tableau ci-dessus) — à faire avant mise en ligne
- [ ] `npm run build` exécuté et HTML vérifié — l'environnement de génération n'avait pas d'accès réseau, le build doit être lancé localement ou par Antigravity

## Règles éditoriales du site (rappel)

- Jamais de rendement promis ni de performance chiffrée sans mention de risque
- Jamais de conseil personnalisé — tout est « piste de réflexion », conclusion vers le RDV
- Contenu SCPI/REIT/Luxembourg : pointer vers immobilierpassif.com, scpirentable.fr,
  assurancevie.lu — ne pas dupliquer
- Pas de lien vers reitdividend.com depuis ce site
