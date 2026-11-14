# Validation des articles — lot du 14 novembre 2026 (capitalretraite.com)

Rien n'est poussé ni publié : chaque article ci-dessous attend une relecture humaine.

## 1. PER : jusqu'à quand verser en 2026, et dans quelle limite déduire ?

- **Slug** : `/guide/plafond-per-versement-avant-31-decembre-2026` (pilier Coûts & prix, catégorie « PER » de la bibliothèque)
- **Requête cible** : « Jusqu'à quand puis-je verser sur mon PER pour déduire mes impôts de 2026 et de combien ? »
- **Longueur** : environ 3 100 mots (corps rendu, tableaux et FAQ compris)
- **Fichiers**
  - créé : `src/pages/GuidePlafondPerVersement2026.jsx`
  - modifiés : `src/components/hypotheses.js` (blocs `PER_PLAFOND` et `PER_PLAFOND_EXEMPLES`), `src/routes.jsx`, `src/App.jsx`, `src/pages/Guides.jsx`, `public/sitemap.xml` (54 URL), `src/pages/GuideAgeCommencerPer.jsx` et `src/pages/StrategiePer.jsx` (un lien entrant chacun)
- **Validations** : `bun run build` (54/54 pages prérendues, 1 seul `<h1>`), `bun run test` (36/36), `bun run typecheck` : OK. Aucune occurrence de Calendly, Épargne Plurielle, CIF, Uptimi, « À VÉRIFIER » dans la page rendue.

### Sources officielles (consultées le 14/11/2026)

| Organisme | Document | URL |
|---|---|---|
| Légifrance | CGI, art. 163 quatervicies, version en vigueur depuis le 21/02/2026 (modifié par la loi n° 2026-103 du 19/02/2026, art. 10) : formule 10 % / 8 PASS / plancher 10 % PASS, report « cinq années suivantes », addition des plafonds du couple | https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038836248/ |
| Service-Public | Fiche F14709 « Cotisations d'épargne retraite (déduction) », vérifiée le 15/04/2026 : 4 710 € / 37 680 €, sommes à retrancher, report 3 ans (2024 → 2027, 2025 → 2028) puis 5 ans (2026 → 2031), ordre d'imputation, 70 ans | https://www.service-public.gouv.fr/particuliers/vosdroits/F14709 |
| Service-Public | Fiche F34982 « PER individuel », vérifiée le 12/10/2026 : mêmes montants, 70 ans depuis le 01/01/2026 | https://www.service-public.gouv.fr/particuliers/vosdroits/F34982 |
| impots.gouv.fr | « Que signifie la somme imprimée dans la rubrique Plafond épargne retraite… » : ligne « Plafond pour les cotisations versées en 2026 », trois années de reports, case 6QR | https://www.impots.gouv.fr/portail/particulier/questions/que-signifie-la-somme-imprimee-dans-la-rubrique-plafond-epargne-retraite-de |
| impots.gouv.fr | Brochure pratique 2026 (revenus 2025), rubrique Épargne retraite : imprimé n° 2561 ter, cases 6NS/6NT/6NU, sommes réduisant le plafond | https://www.impots.gouv.fr/www2/fichiers/documentation/brochure/ir_2026/pdf_som/12-charges_ded_rev_225a236.pdf |
| Service-Public | Actualité A15386 : PASS 2026 = 48 060 € (arrêté du 22/12/2025) | https://www.service-public.gouv.fr/particuliers/actualites/A15386 |

### Chiffres à faire confirmer par un humain

1. **Report : 3 ans puis 5 ans.** Le titre de travail parlait de « reports sur 3 ans » ; la loi de finances pour 2026 a porté le délai à 5 ans pour les plafonds à partir de 2026 (sans rétroactivité). L'article présente les deux régimes. À relire sur Légifrance.
2. **Reliquat de 2023 utilisable jusqu'au 31/12/2026** : déduit de la règle des 3 ans et de la phrase d'impots.gouv.fr (« trois années précédentes ») ; Service-Public ne cite explicitement que 2024 (→ 2027) et 2025 (→ 2028).
3. **Plancher 4 806 € et plafond 38 448 € pour les versements 2027** : calculés à partir du PASS 2026 (48 060 €), présentés « à législation constante » ; non lus tels quels sur une source officielle. Le PASS 2027 (48 900 € annoncé par le BOSS, arrêté non vérifié) n'est pas cité dans l'article.
4. **Libellés exacts de l'avis d'impôt** : seule la ligne « Plafond pour les cotisations versées en 2026 » et le nom de la rubrique sont cités mot pour mot (source impots.gouv.fr) ; les lignes de plafonds non utilisés sont décrites sans libellé. À comparer avec un avis 2026 réel.
5. **Cases 6NS/6NT/6NU et 6QR, imprimé n° 2561 ter** : valables pour la déclaration 2026 (revenus 2025) ; la déclaration 2027 peut les modifier (l'article le signale).
6. **Limite de 10 jours** pour les jours de repos monétisés : tirée de la brochure pratique et de F14709.

### Affirmations sensibles à relire

- « La fraction excédentaire n'est pas déduite » (dépassement du plafond) : formulation volontairement limitée ; le sort exact de l'excédent (pas de report de la cotisation) n'est pas détaillé.
- FAQ « plafond de 10 000 € des niches fiscales » : affirmation de principe (déduction du revenu ≠ réduction d'impôt), non rattachée à une source dans le texte.
- FAQ « prélèvement à la source » : description générale du calendrier (solde à l'été 2027, taux ajusté ensuite).
- FAQ « renoncer à la déduction » : mention courte de l'option de non-déduction, sans détail de la fiscalité de sortie.
- Dates limites des gestionnaires « souvent plusieurs jours avant la fin décembre » : constat général non sourcé, aucun établissement nommé.
- Mention des 70 ans : une phrase seulement, pour ne pas dupliquer la PR #2 (`per-loi-de-finances-2026`).
- Section 2027 : le PLF 2027 est présenté comme non voté ; à mettre à jour après promulgation.
- Les trois profils (38 000 €, 72 000 €, 130 000 € de salaire net imposable) sont des composites illustratifs signalés comme tels ; aucun montant de versement n'est préconisé (le versement de 9 000 € du profil B illustre uniquement l'ordre d'imputation).
- `AuthorBox` du gabarit inchangé (signature existante du site) ; l'encart « Épargne Plurielle / CIF » demandé par le SKILL du dépôt n'a pas été appliqué (règle réseau).

### Point d'attention hors périmètre (non corrigé)

- `src/pages/GuideAgeCommencerPer.jsx` indique encore que les plafonds non utilisés « des trois années précédentes » restent mobilisables : exact pour 2026, à actualiser quand le report sur 5 ans produira ses effets. `FISCALITE.perPlafondEnfantRattache` (4 710 €) garde son commentaire « À VÉRIFIER » : valeur désormais confirmée pour les versements 2026.

### Liens internes

- Sortants : `/guide/retraite-independants-per-ou-madelin`, `/guide/fiscalite-sortie-per`, `/guide/combien-coute-un-per`, `/guide/deblocage-anticipe-per`, `/guide/faut-il-ouvrir-un-per`, `/strategies/per`, `/guide/a-quel-age-commencer-per`, `/bilan-retraite`.
- Entrants ajoutés : `/guide/a-quel-age-commencer-per` (section « Pourquoi le temps joue double »), `/strategies/per` (section « L'avantage fiscal à l'entrée »), carte dans `/guides` (catégorie PER).

### Visuels suggérés

- Capture annotée (anonymisée) de la rubrique « Plafond épargne retraite » d'un avis d'impôt 2026, avec la ligne à lire entourée.
- Frise 2023 → 2031 montrant la durée de vie de chaque plafond (3 ans puis 5 ans).
- Schéma « ordre d'imputation » : plafond de l'année, puis reliquats du plus ancien au plus récent.
