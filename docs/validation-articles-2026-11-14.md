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

### Relecture 2026-11-15

- **Vérifié** : Légifrance, CGI art. 163 quatervicies, en vigueur depuis le 21/02/2026, modifié par la loi n° 2026-103 du 19/02/2026, art. 10 : report sur « l'une des cinq années suivantes ». Service-Public F14709 (vérifiée le 15/04/2026) : 4 710 € / 37 680 € ; plafonds de 2024 et 2025 reportables 3 ans seulement (jusqu'en 2027 et 2028) ; plafond de 2026 reportable sur 2027-2031 ; 70 ans ; limite de 10 jours. impots.gouv.fr (FAQ) : ligne « plafond pour les cotisations versées en 2026 », « plafonds non utilisés des trois années précédentes », case 6QR. PASS 2026 = 48 060 € (F15396) : 4 806 € / 38 448 € sont arithmétiquement exacts et présentés « à législation constante », avec le PLF 2027 indiqué comme non voté. Reliquat de 2023 éteint après le 31/12/2026 : cohérent avec la règle des 3 ans (F14709) et la FAQ impots.gouv.fr ; conservé. Calculs des profils A/B/C refaits : exacts. Liens internes valides, aucune mention interdite.
- **Corrigé** : rien.
- **Reste à confirmer par l'éditeur** : libellés exacts des lignes de plafonds non utilisés sur un avis réel (la FAQ impots.gouv.fr ne cite que « plafond total 2024 » et « plafond pour les cotisations versées en 2026 ») ; cases 6NS/6NT/6NU (brochure 2026, non relue ici).

---

## 2. Retraite complémentaire Agirc-Arrco des cadres : comment est-elle calculée ?

- **Slug** : `/guide/retraite-complementaire-agirc-arrco-cadres-calcul` (pilier Problèmes, catégorie « Comprendre le système de retraite » de la bibliothèque)
- **Requête cible** : « Comment est calculée la retraite complémentaire Agirc-Arrco d'un cadre ? »
- **Longueur** : environ 3 700 mots de corps rendu, dont 6 tableaux, sommaire, FAQ (8 questions) et sources (au-dessus de la cible de 3 200 : les tableaux de paramètres pèsent lourd ; à élaguer si souhaité)
- **Niveau de risque : ÉLEVÉ — relecture experte requise avant publication.**
- **Auteur affiché** : `AuthorBox` du gabarit, inchangé (signature existante du site) — à confirmer par l'éditeur. L'encart « Épargne Plurielle / CIF » du SKILL du dépôt n'a pas été appliqué (règle réseau).
- **Fichiers**
  - créé : `src/pages/GuideAgircArrcoCadres.jsx`
  - modifiés : `src/components/hypotheses.js` (blocs `AGIRC_ARRCO` et `AGIRC_ARRCO_EXEMPLES`, ajoutés avant « Décumulation » ; aucun défaut existant modifié, décote 1,25 % non touchée), `src/routes.jsx`, `src/App.jsx`, `src/pages/Guides.jsx`, `public/sitemap.xml` (55 URL), `src/pages/GuideSurcoteDecote.jsx` et `src/pages/GuideCombienEpargner.jsx` (une phrase de lien entrant chacun)
- **Validations** : `bun run build` (55/55 pages prérendues, 1 seul `<h1>`), `bun run test` (36/36), `bun run typecheck` : OK. Aucune occurrence de Calendly, Épargne Plurielle, CIF, Uptimi, « vous conseillons », « nous recommandons », « À VÉRIFIER » dans la page rendue. Tous les montants des tableaux sont calculés depuis `hypotheses.js` et ont été recoupés par un script indépendant.

### Sources (consultées le 14/11/2026)

| Organisme | Document | Ce qui en est tiré | URL |
|---|---|---|---|
| Service-Public | Fiche F15396 « Retraite complémentaire du salarié du secteur privé (Agirc-Arrco) », vérifiée le 01/11/2026 | valeur de service 1,4587 € ; formule ; taux de calcul 6,20 % / 17 % ; tranches 48 060 € / 384 480 € ; salaire de référence 20,1877 € en 2026 ; conditions du taux plein ; liquidation dès 57 ans ; seuils 100 / 200 points ; versement mensuel ; non-cumul des majorations pour enfants | https://www.service-public.gouv.fr/particuliers/vosdroits/F15396 |
| Agirc-Arrco | Circulaire 2025-16-SG-DRJ du 30/10/2025 « Paramètres 2026 » (PDF lu page par page) | tranches ; taux de calcul des points ; taux d'appel 127 % ; taux de cotisation T1 7,87 % (3,15 / 4,72) et T2 21,59 % (8,64 / 12,95) ; CEG 2,15 % et 2,70 % ; CET 0,35 % ; Apec 0,06 % dans la limite de 4 PASS ; valeur d'achat 20,1877 € au 01/01/2026 ; valeur de service 1,4386 € au 01/11/2025 ; plafond de majoration familiale 2 367,48 € au 01/11/2025 | https://www.agirc-arrco.fr/storage/CirculaireAgircArrco2025-16sg-drj.pdf |
| Agirc-Arrco | Communiqué du 14/10/2026 | décision du conseil d'administration du 14/10/2026, +1,4 % au 01/11/2026 (la page ne donne pas la valeur du point en euros) | https://www.agirc-arrco.fr/nous-connaitre/nos-actualites/retraites-complementaires-agirc-arrco-une-revalorisation-de-14-au-1er-novembre-2026/ |
| Agirc-Arrco | « Les coefficients de minoration applicables à la retraite complémentaire », édition de septembre 2026 (PDF lu) | âge sans minoration 67 ans ; minoration définitive ; barème carrière courte (0,96 / 0,92 / 0,88 / 0,83 / 0,78 pour 4 / 8 / 12 / 16 / 20 trimestres) ; coefficient 0,78 à 62 ans ; règle « la plus faible minoration » ; 172 trimestres à partir de la génération 1966 | https://www.agirc-arrco.fr/storage/2024/10/Coefficients-de-minorations-AA.pdf |
| Agirc-Arrco | « Décrypter : la majoration pour enfants » (02-03/2025, PDF lu) | 10 % sur les points depuis 2012 pour 3 enfants ou plus ; 5 % par enfant à charge ; non-cumul ; existence d'un plafond | https://www.agirc-arrco.fr/storage/2025/03/Decrypter_Majoration-pour-enfants.pdf |
| Service-Public | Fiche F21552 « montant de la pension de base », vérifiée le 01/09/2026 | taux plein 50 % ; salaire annuel moyen plafonné au PASS ; maximum 2 002,50 € bruts par mois en 2026, hors surcote | https://www.service-public.gouv.fr/particuliers/vosdroits/F21552 |
| La finance pour tous (IEFP) | « Retraite complémentaire : fin du bonus-malus Agirc-Arrco », 12/04/2024 | suppression du coefficient de solidarité : 01/12/2023 (nouvelles retraites), 01/04/2024 (retraités en cours) | https://www.lafinancepourtous.com/2024/04/12/retraite-complementaire-fin-du-bonus-malus-agirc-arrco/ |

Recoupements secondaires (non cités dans l'article) : legisocial.fr (taux 2026, identiques à la circulaire), lafinancepourtous.com du 19/10/2026 (1,4587 € contre 1,4386 €, valeur d'achat 20,1877 € pour 2026).

### Données de la piste du scan : état

| Donnée | État |
|---|---|
| Valeur de service 1,4587 € au 01/11/2026 | **Confirmée** par Service-Public F15396 (vérifiée le 01/11/2026). Non lue en euros sur agirc-arrco.fr (le communiqué ne donne que +1,4 % ; la circulaire qui fixe la valeur n'a pas été retrouvée). |
| Valeur d'achat 20,1877 € | **Confirmée pour 2026** (circulaire 2025-16 et F15396). **Valeur 2027 non trouvée** : l'article dit seulement qu'elle n'était pas reprise dans les documents consultés. |
| PASS 2026 48 060 € | **Confirmé** (circulaire, F15396). |
| Taux de cotisation par tranche | **Confirmés** (circulaire). |
| Coefficients de solidarité | Suppression **confirmée par une seule source non administrative** (IEFP) ; aucune page service-public ou agirc-arrco.fr lue ne la décrit. À relire. |

### Chiffres et points à faire confirmer par un humain

1. **Valeur de service 1,4587 €** : retrouver la circulaire Agirc-Arrco d'octobre 2026 pour une source primaire.
2. **Plafond de la majoration pour 3 enfants** : l'article cite 2 367,48 € « dans les paramètres publiés pour 2026 » (valeur au 01/11/2025). Le plafond en vigueur depuis le 01/11/2026 n'a pas été trouvé ; si la revalorisation de 1,4 % s'y applique, le chiffre est périmé.
3. **Suppression du malus de 10 %** (dates du 01/12/2023 et du 01/04/2024, « pendant trois ans ») : la durée de trois ans vient de la connaissance générale du dispositif, pas d'une source lue aujourd'hui.
4. **Durée requise de 172 trimestres « pour les générations nées à partir de 1966 »** : tirée du tableau Agirc-Arrco de septembre 2026 (qui intègre la suspension de la réforme). Règles en mouvement.
5. **Colonne « Date d'effet » du tableau des paramètres** : les taux (6,20 %, 17 %, 127 %, 7,87 %, 21,59 %) sont présentés comme « paramètres au 1er janvier 2026 », sans date d'origine.
6. **Fusion du 01/01/2019 et reprise des points Agirc / Arrco** : affirmée sans coefficient de conversion ni source lue aujourd'hui (la circulaire renvoie à l'ANI du 17/11/2017).
7. **Taux dérogatoires d'entreprise** (« obligations anciennes ») : mention dérivée des notes de bas de page de la circulaire.

### Affirmations sensibles à relire

- **Tableau « taux de remplacement théorique »** (69,3 % / 66,0 % / 62,7 % / 59,4 % pour 40 000 / 60 000 / 80 000 / 120 000 €) : construction maison, à hypothèses fortes et affichées (43 ans à salaire constant en euros 2026, paramètres figés, salaire annuel moyen = salaire plafonné au PASS). Ce n'est pas une statistique officielle ; à valider ou à retirer.
- **« 7,23 € de pension par an pour 100 € de cotisation de référence, 5,69 € pour 100 € de cotisation de retraite »** : calcul mécanique aux paramètres 2026, pas un rendement garanti. Les « environ 12 854 € » de cotisations de l'exemple incluent retraite, CEG et CET, hors Apec.
- **« Intéressement, participation et abondement ne donnent pas de points »** : principe général (sommes exonérées de cotisations), non sourcé aujourd'hui.
- **« La pension est versée chaque mois, d'avance »** : F15396 indique un versement mensuel le 1er jour ouvré ; « d'avance » est une formulation de l'auteur.
- **Prélèvements sociaux sur les pensions** : décrits sans taux (le sujet n° 4 de la section 5.1 du scan les traitera).
- **Section « vérifier son relevé »** : les 5 contrôles sont des repères pratiques, pas une procédure officielle ; « compte retraite » d'info-retraite.fr et « espace personnel » d'agirc-arrco.fr cités sans lien.
- Le profil à 80 000 € et les grilles sont des illustrations signalées comme telles ; aucune préconisation d'épargne ni de produit.

### Point d'attention hors périmètre (non corrigé)

- `src/pages/GuideSurcoteDecote.jsx` écrit encore que les minorations des complémentaires sont « parfois temporaires » (texte et FAQ) : c'était le coefficient de solidarité, supprimé. Seule une phrase de lien a été ajoutée ; la décote à 1,25 % n'a pas été touchée, conformément à la consigne.
- `HYPOTHESES_MAJ` (« juillet 2026 ») inchangé : l'article se date lui-même par `AGIRC_ARRCO.maj`.
- Recouvrement à surveiller avec la PR #14 (`/actualites/agirc-arrco-revalorisation-1er-novembre-2026`, actualité, et `pourquoi-pension-retraite-plus-basse-que-prevu`, général) : angles distincts, mais maillage à poser à la fusion.

### Liens internes

- Sortants : `/guide/combien-faut-il-epargner-pour-la-retraite`, `/guide/surcote-decote-retraite`, `/guide/verifier-releve-de-carriere-retraite`, `/simulateur-retraite`, `/guide/meilleure-enveloppe-retraite`, `/guide/plafond-per-versement-avant-31-decembre-2026`, `/bilan-retraite`.
- Entrants ajoutés : `/guide/surcote-decote-retraite` (section décote, paragraphe sur les complémentaires), `/guide/combien-faut-il-epargner-pour-la-retraite` (section taux de remplacement), carte dans `/guides` (catégorie « Comprendre le système de retraite »).

### Visuels suggérés

- Schéma réutilisable « Salaire → Tranches → Points → Pension » (les 4 étapes, avec les valeurs 2026).
- Barres empilées base / complémentaire en part du salaire pour 40 000, 60 000, 80 000 et 120 000 € (tableau théorique).
- Fiche de paie annotée (anonymisée) : lignes retraite T1, T2, CEG, CET, Apec, avec « donne des points / ne donne pas de points ».
- Capture annotée d'un relevé de points Agirc-Arrco (anonymisée).

### Relecture 2026-11-15 (article 2, Agirc-Arrco)

- **Vérifié** : Service-Public F15396 (vérifiée le 01/11/2026) : valeur de service 1,4587 €, salaire de référence 20,1877 € en 2026, taux de calcul 6,20 % / 17 %, tranches 48 060 € / 384 480 €, coefficient le plus favorable retenu, 57 ans, seuils de 100 et 200 points, versement le 1er jour ouvré. Barème réglementaire Agirc-Arrco « Valeur de service du point » (reglementation.agirc-arrco.fr) : 1,4587 € au 01/11/2026 (+1,40 %, circulaire 2026-3-DT du 21/10/2026), 1,4386 € au 01/11/2025 (+0,00 %). Ce barème a été lu via l'index de recherche ; le site refuse la connexion directe (certificat). Absence de revalorisation au 01/11/2025 : confirmée par la circulaire 2025-16 (valeur « inchangée », 1,4386 €). Communiqué Agirc-Arrco du 14/10/2026 : +1,4 %. Malus : La finance pour tous (IEFP) confirme la suppression au 01/12/2023 et au 01/04/2024 et la durée de 3 ans. Des actualités Service-Public (A15237 « fin du malus de 10 % », A17234 « avril 2024 ») vont dans le même sens, mais leurs pages redirigent aujourd'hui et n'ont pas été relues : le texte attribue donc l'information à l'IEFP. Tableau « taux de remplacement théorique » : recalculé (69,3 / 66,0 / 62,7 / 59,4 %). La formule de base (50 % du SAM plafonné, maximum 24 030 €/an = 2 002,50 €/mois, F21552) est exacte et les hypothèses sont affichées et étiquetées comme théoriques : il est défendable comme illustration, donc conservé.
- **Corrigé** :
  - plafond de la majoration pour enfants : « 2 367,48 € bruts dans les paramètres publiés pour 2026 » → « fixé à 2 367,48 € bruts au 1er novembre 2025 par la circulaire 2025-16 ; montant applicable depuis le 1er novembre 2026 non publié dans les documents consultés » ;
  - « versée chaque mois, d'avance » → « versée chaque mois, le 1er jour ouvré du mois » (F15396) ;
  - suppression du malus : attribuée explicitement à La finance pour tous (IEFP) ;
  - source primaire ajoutée pour 1,4587 € (barème réglementaire Agirc-Arrco), avec la mention correspondante dans la section « paramètres ».
- **Reste à confirmer par l'éditeur** : plafond de la majoration pour 3 enfants au 01/11/2026 ; valeur d'achat 2027 (non publiée à ce jour) ; 172 trimestres pour les générations nées à partir de 1966 (règles en mouvement) ; relecture directe de la circulaire 2026-3-DT.
- Validations après correction : `bun run typecheck` OK, `bun run build` 55/55, `bun run test` 36/36.

---

## 3. Rachat partiel d'assurance-vie : comment est-il imposé ?

- **Slug** : `/guide/rachat-partiel-assurance-vie-imposition` (pilier Coûts & prix / Problèmes, catégorie « Décumulation » de la bibliothèque ; sujet n° 5 de la section 5.1 du scan)
- **Requête cible** : « Comment est imposé un rachat partiel d'assurance-vie ? exemple »
- **Longueur** : environ 3 400 mots de corps rendu (dont 8 tableaux, sommaire, FAQ de 8 questions et sources) ; légèrement au-dessus de la cible de 3 200, à élaguer si souhaité (candidats : section « versements avant le 27 septembre 2017 », checklist)
- **Niveau de risque** : moyen (règles stables ; un point 2026 sensible : prélèvements sociaux à 17,2 %)
- **Auteur affiché** : `AuthorBox` du gabarit, inchangé (signature existante du site) — à confirmer par l'éditeur. L'encart « Épargne Plurielle / CIF » du SKILL du dépôt n'a pas été appliqué (règle réseau).
- **Fichiers**
  - créé : `src/pages/GuideRachatPartielAssuranceVie.jsx`
  - modifiés : `src/components/hypotheses.js` (blocs `AV_RACHAT` et `AV_RACHAT_EXEMPLES`, ajoutés avant le bloc Agirc-Arrco ; aucune valeur existante modifiée, les taux 12,8 % / 7,5 % / 17,2 % et l'abattement restent lus dans `FISCALITE`), `src/routes.jsx`, `src/App.jsx`, `src/pages/Guides.jsx`, `public/sitemap.xml` (56 URL), `src/pages/StrategieAssuranceVie.jsx` et `src/pages/GuideOrdreDecaissement.jsx` (une phrase de lien entrant chacun)
- **Validations** (15/11/2026) : `bun run build` (56/56 pages prérendues, 1 seul `<h1>`), `bun run test` (36/36), `bun run typecheck` : OK. Aucune occurrence de Calendly, Épargne Plurielle, CIF, Uptimi, « vous conseillons », « nous recommandons », « À VÉRIFIER » dans la page rendue. Tous les montants sont calculés depuis `hypotheses.js` ; les 28 montants des trois cas, les pourcentages et la grille ont été recalculés par un script Python indépendant et retrouvés à l'identique dans le HTML prérendu.

### Sources officielles (consultées le 15/11/2026)

| Organisme | Document | Ce qui en est tiré | URL |
|---|---|---|---|
| Service-Public | Fiche F22414 « Impôt sur le revenu - Comment sont imposés les revenus d'un contrat d'assurance-vie ? », vérifiée le 15/04/2026 | prélèvements sociaux 17,2 % (18,6 % pour rente-survie et épargne handicap) ; primes depuis le 27/09/2017 : acompte non libératoire 12,8 % (< 8 ans) ou 7,5 % (≥ 8 ans), imposition définitive au taux forfaitaire ou au barème, restitution de l'excédent ; abattement 4 600 € / 9 200 € pour l'ensemble des contrats ; seuil de 150 000 € ; dispense d'acompte (RFR < 25 000 € / 50 000 €, demande avant le 30 novembre) ; régime des primes antérieures ; contrats d'avant le 26/09/1997 | https://www.service-public.gouv.fr/particuliers/vosdroits/F22414 |
| BOFiP | BOI-RPPM-RCM-20-10-20-50, version en vigueur depuis le 30/06/2022 | formule du produit imposable d'un rachat partiel (§ 80) ; primes non remboursées en cas de rachats successifs (§ 90) ; contrats en perte (§ 100 à 120) ; ancienneté décomptée depuis la souscription (§ 200) ; ordre d'imputation de l'abattement (§ 285 à 288) ; acompte calculé sur le brut et régularisation (§ 330 à 365) | https://bofip.impots.gouv.fr/bofip/3951-PGP.html |
| BOFiP | BOI-RPPM-RCM-20-15, version en vigueur depuis le 21/06/2021 | taux 12,8 % et 7,5 % (§ 100 à 130) ; seuil de 150 000 € : primes non remboursées, tous contrats, seuil personnel, au 31/12 de l'année précédente (§ 140 à 170) ; formule de la fraction à 7,5 % (§ 190) et exemples (§ 220 à 240) ; option globale pour le barème (§ 290 à 340) | https://bofip.impots.gouv.fr/bofip/11224-PGP.html |
| impots.gouv.fr | « Les revenus mobiliers », mise à jour du 08/04/2026 | prélèvements sociaux à 18,6 % depuis le 01/01/2026, sauf notamment les produits des contrats d'assurance-vie restés à 17,2 % ; 7,5 % pour les primes n'excédant pas 150 000 € ; abattement ; case 2OP | https://www.impots.gouv.fr/particulier/les-revenus-mobiliers |

Non lus (accès refusé ou identifiant introuvable) : Légifrance (CGI art. 125-0 A et 200 A ; CSS art. L. 136-8), economie.gouv.fr (403). L'article ne cite donc aucun article de code.

### Chiffres et points à faire confirmer par un humain

1. **Prélèvements sociaux de 17,2 % sur l'assurance-vie en 2026** : confirmés par deux sources administratives (F22414 vérifiée le 15/04/2026 ; impots.gouv.fr du 08/04/2026). Le texte de loi (LFSS 2026, CSS art. L. 136-8) n'a pas pu être relu sur Légifrance. `FISCALITE.prelevementsSociaux.source` garde son « — À VÉRIFIER » (chaîne non affichée par l'article).
2. **Prélèvement libératoire de 35 % (moins de 4 ans) et 15 % (4 à 8 ans) pour les primes d'avant le 27/09/2017** : valeurs de connaissance générale (CGI art. 125-0 A) ; la fiche F22414 lue aujourd'hui ne restitue que « 15 % » pour les contrats de moins de 8 ans. À relire sur la fiche ou sur Légifrance.
3. **Prélèvements sociaux prélevés chaque année sur les fonds en euros** (encadré) : affirmation de principe, non retrouvée dans les pages lues aujourd'hui.
4. **Calendrier « IFU en début d'année, déclaration au printemps, avis à l'été »** et préremplissage : description générale ; aucun numéro de case n'est cité hormis 2OP (impots.gouv.fr).
5. **Dispense d'acompte** : seuils et date du 30 novembre repris de F22414 ; « revenu fiscal de référence de l'avant-dernière année » est la formulation de la fiche.
6. **Acompte de 7,5 % après 8 ans même au-delà de 150 000 € de primes** : conforme à F22414 ; le cas 3 ne chiffre pas l'acompte.

### Affirmations sensibles à relire

- **Grille « rachat annuel dont les gains égalent l'abattement »** (46 000 / 23 000 / 15 333 / 9 200 € pour une personne seule) : simple division abattement ÷ part de gains, présentée comme repère mécanique et explicitement « pas un montant à retirer ». À valider en conformité (peut être lue comme une incitation) ou à retirer.
- « Le PFU d'un rachat d'assurance-vie de moins de 8 ans est de 30 %, et non de 31,4 % » : déduit de 12,8 % + 17,2 %.
- « Le calcul se fait au niveau du contrat entier, pas support par support » : déduit de la formule du BOFiP (valeur de rachat totale du contrat).
- « La moins-value n'est pas déductible de vos autres revenus » (FAQ contrat en perte) et « les gains imposables d'un rachat entrent dans le revenu fiscal de référence » (erreurs fréquentes) : principes généraux non sourcés aujourd'hui.
- « Un versement fait la neuvième année profite immédiatement du régime des contrats de plus de 8 ans » : découle du § 200 du BOFiP (ancienneté du contrat).
- FAQ « taux forfaitaire ou barème » : volontairement sans réponse tranchée ; ne mentionne pas la CSG déductible en cas d'option pour le barème.
- Rachat total : « un nouveau contrat repart de zéro pour le délai de 8 ans » ; exonérations (licenciement, invalidité, etc.) de F22414 non traitées.
- Le profil « cadre de 63 ans » et les trois cas sont des illustrations signalées comme telles ; aucun contrat ni assureur nommé ; aucune préconisation de montant.
- Mention finale : lois de finances et de financement de la sécurité sociale pour 2027 non adoptées au 15/11/2026.

### Point d'attention hors périmètre (non corrigé)

- `src/pages/StrategieAssuranceVie.jsx` et `GuideOrdreDecaissement.jsx` datent l'abattement par `HYPOTHESES_MAJ` (« juillet 2026 ») : valeurs toujours exactes. Seule une phrase de lien a été ajoutée à chacune.

### Liens internes

- Sortants : `/guide/ordre-de-decaissement-retraite`, `/guide/rente-viagere-ou-retraits-programmes`, `/strategies/assurance-vie-retraite`, `/bilan-retraite`.
- Entrants ajoutés : `/strategies/assurance-vie-retraite` (section « Les rachats programmés »), `/guide/ordre-de-decaissement-retraite` (fin de l'exemple sur les rachats étalés), carte dans `/guides` (catégorie « Décumulation »).

### Visuels suggérés

- Schéma réutilisable « Rachat → part de capital (non imposée) / part de gains (imposée) », avec le cas 1 (8 000 € = 6 400 € + 1 600 €).
- Frise « acompte au rachat → IFU → déclaration → avis d'impôt et restitution ».
- Arbre de décision : contrat de moins ou de plus de 8 ans → gains sous ou au-dessus de l'abattement → primes sous ou au-dessus de 150 000 €.

### Relecture 2026-11-16 (article 3, rachat partiel d'assurance-vie)

- **Vérifié sur source primaire (16/11/2026)**
  - Prélèvements sociaux 17,2 % : CSS art. L. 136-8 (version en vigueur depuis le 27/06/2026, modifiée par la loi n° 2026-534 du 25/06/2026, art. 65) : I, 2° porte la CSG à 10,6 % pour L. 136-6 et L. 136-7, mais IV, 4° maintient 9,2 % pour « les produits mentionnés au 3° du même II » de L. 136-7 (bons et contrats de capitalisation et placements de même nature) ; L. 136-7, II, 3° lu (version du 21/02/2026). Composantes CRDS / prélèvement de solidarité non relues (l'article ne les détaille pas).
  - Fonds en euros : prélèvement « lors de leur inscription au bon ou contrat » pour les droits exprimés en euros, y compris la part euros des contrats en unités de compte (L. 136-7, II, 3°, a).
  - 35 % / 15 % / 7,5 % (primes jusqu'au 26/09/2017) et acompte 12,8 % / 7,5 % : impots.gouv.fr, question « Comment sont imposés les produits des contrats d'assurance-vie depuis le 1er janvier 2018 ? » (modifiée le 20/03/2026). Légifrance CGI 125-0 A non lu.
  - 12,8 % / 7,5 %, 4 600 / 9 200 €, dispense (25 000 / 50 000 €, 30 novembre), 18,6 % rente-survie / épargne handicap : F22414 (vérifiée le 15/04/2026).
  - Seuil de 150 000 € (primes non remboursées au 31/12 N-1, tous contrats, seuil personnel) et formule § 190 : BOI-RPPM-RCM-20-15. Formule § 80, ancienneté § 200, ordre d'imputation § 285-288 : BOI-RPPM-RCM-20-10-20-50.
  - Les trois cas et la grille recalculés par script Python (Decimal) : 33 montants et taux identiques au HTML prérendu (cas 3 : 5,975 % affiché 5,98 %).
  - Cohérence : mêmes paramètres (`FISCALITE`) et même logique « abattement ÷ part de gains » que `/guide/ordre-de-decaissement-retraite` ; aucun écart avec `/strategies/assurance-vie-retraite` ni `/guide/rente-viagere-ou-retraits-programmes`. Aucun assureur nommé ; grep des mentions interdites : néant.
- **Corrigé**
  - Sources : ajout impots.gouv.fr (35 / 15 / 7,5 %) et Légifrance L. 136-8 IV 4° et L. 136-7 II 3° ; citations de ces articles dans le texte (encadré fonds en euros, paragraphe sur les 17,2 %, FAQ).
  - FAQ 18,6 % : « Seuls certains contrats particuliers… relèvent du taux de 18,6 % » → attribué à la fiche F22414 (« La fiche F22414 indique toutefois… »).
  - Tableau primes avant 2017, 8 ans et plus : « PFL 7,5 % sur option, après abattement » → « Barème après abattement, ou PFL 7,5 % sur option (calculé sur le brut, l'abattement donnant droit à un crédit d'impôt) » (BOFiP § 330-340).
  - Cas 3 : précision « versements non remboursés, montant supposé identique au 31 décembre de l'année précédente » (règle d'appréciation du seuil).
  - Ajout d'un paragraphe sur les rachats exonérés d'impôt sur le revenu (licenciement, retraite anticipée, invalidité 2e/3e catégorie, liquidation judiciaire ; F22414).
  - Formulations prudentes : « La moins-value n'est pas déductible » → « La perte n'est pas, en principe, déductible » ; gains « entrent dans » le RFR → « sont en principe pris en compte ».
  - `AV_RACHAT.source` complété.
- **Grille 46 000 / 23 000 / 15 333 / 9 200 €** : conservée. Calcul exact, repère mécanique non personnalisé, déjà assorti de « Ce n'est pas un montant à retirer », et identique à la logique publiée dans `/guide/ordre-de-decaissement-retraite`. Arbitrage final laissé à l'éditeur (conformité).
- **Reste à confirmer par l'éditeur** : CGI art. 125-0 A et 1417 (RFR) non lus sur Légifrance ; non-déductibilité de la perte sur rachat (BOFiP § 460 ne vise que la cession de contrats) ; maintien des prélèvements sociaux en cas de rachat exonéré d'IR (non affirmé dans le texte) ; calendrier IFU / déclaration / avis (description générale) ; auteur affiché.
- **Hors périmètre, non corrigé** : `FISCALITE.prelevementsSociaux.source` (hypotheses.js) cite « LFSS 2026, art. 12 — À VÉRIFIER » alors que la version en vigueur de L. 136-8 résulte aussi de la loi n° 2026-534 (art. 65) ; chaîne non affichée par cet article, à mettre à jour par l'éditeur.
- Validations après correction : `bun run build` 56/56, `bun run test` 36/36, `bun run typecheck` OK ; `src/routeTree.gen.ts` non modifié.

---

## 4. Retraite progressive ou cumul emploi-retraite : quelle différence à 60 ans ?

- **Slug** : `/guide/retraite-progressive-ou-cumul-emploi-retraite` (pilier Comparaisons, catégorie « Comprendre le système de retraite » de la bibliothèque ; sujet n° 3 de la section 5.1 du scan)
- **Requête cible** : « Retraite progressive ou cumul emploi-retraite, quelle différence à 60 ans ? »
- **Longueur** : environ 3 700 mots de corps rendu (sommaire, 3 tableaux, FAQ de 8 questions compris ; hors liste des sources). Au-dessus de la cible de 3 200 : candidats à l'élagage : paragraphe « Fonctionnaires et indépendants », liste des erreurs.
- **Niveau de risque : ÉLEVÉ — relecture experte requise avant publication** (règles de 2025 et 2026, décrets du 2 novembre 2026, sources administratives de dates différentes).
- **Auteur affiché** : `AuthorBox` du gabarit, inchangé (signature existante du site) — à confirmer par l'éditeur. L'encart « Épargne Plurielle / CIF » du SKILL du dépôt n'a pas été appliqué (règle réseau).
- **Fichiers**
  - créé : `src/pages/GuideRetraiteProgressiveOuCumul.jsx`
  - modifiés : `src/components/hypotheses.js` (blocs `RETRAITE_PROGRESSIVE_CUMUL` et `RETRAITE_PROGRESSIVE_CUMUL_EXEMPLES`, ajoutés avant « Décumulation » ; aucune valeur existante modifiée), `src/routes.jsx`, `src/App.jsx`, `src/pages/Guides.jsx`, `public/sitemap.xml` (57 URL), `src/pages/GuideCumulEmploiRetraite.jsx` et `src/pages/GuideSurcoteDecote.jsx` (une phrase de lien entrant chacun)
- **Validations** (18/11/2026) : `bun run build` (57/57 pages prérendues, 1 seul `<h1>`), `bun run test` (36/36), `bun run typecheck` : OK ; `src/routeTree.gen.ts` non modifié. Aucune occurrence de Calendly, Épargne Plurielle, CIF, Uptimi, « vous conseillons », « nous recommandons », « À VÉRIFIER », « À CONFIRMER » dans la page rendue. Tous les montants sont calculés depuis `hypotheses.js` ; les 36 montants et pourcentages des deux grilles, ainsi que 2 403 € et 2 916,85 €, ont été recalculés par un script Python indépendant (Decimal) et retrouvés à l'identique dans le HTML prérendu.

### Sources (consultées le 18/11/2026)

| Organisme | Document | Ce qui en est tiré | URL |
|---|---|---|---|
| Service-Public | Fiche F12842 « Retraite progressive du salarié », **vérifiée le 17/11/2025** | 60 ans, 150 trimestres, 40 à 80 % ; procédure employeur (LRAR, 2 mois, silence = accord, refus motivé) ; fraction = 100 % − quotité, exemple 60 % → 40 % ; pension provisoire « selon les droits acquis à la date de la demande » ; suspension / suppression définitive ; pension définitive « ne peut pas être inférieure au montant provisoire » ; surcotisation ; demande 5 mois avant ; activité après retraite définitive = cumul | https://www.service-public.gouv.fr/particuliers/vosdroits/F12842 |
| Service-Public | Fiche F13243 « Cumul emploi-retraite du salarié », vérifiée le 12/11/2026 | deux régimes (avant / à partir du 01/01/2027) ; cumul intégral et plafonné, 160 % du Smic = 2 916,85 € bruts/mois ou dernier salaire, 6 mois chez le dernier employeur, nouveaux droits depuis le 01/01/2023 plafonnés à 2 403 € bruts/an, aucun droit en cumul plafonné ; 2027 : trois tranches d'âge, 7 000 €, moitié du dépassement, 67 ans, déclaration dans le mois, suspension conservatoire | https://www.service-public.gouv.fr/particuliers/vosdroits/F13243 |
| Service-Public | Actualité A18914, publiée le 22/05/2026, mise à jour le 10/11/2026 | LFSS 2026 (loi n° 2025-1403 du 30/12/2025), art. 102 ; décrets n° 2026-1016 et n° 2026-1017 du 02/11/2026 (JO du 03/11/2026) ; « seul l'âge est pris en compte » ; personnes concernées (première pension à partir du 01/01/2027) | https://www.service-public.gouv.fr/particuliers/actualites/A18914 |
| Légifrance | Décret n° 2026-1017 du 02/11/2026 (lu en synthèse, texte intégral non restitué par l'outil) | D. 161-2-8 : seuil de sept mille euros « pour l'année 2027 », revalorisé comme le PASS ; D. 161-2-10 : retenue sur 12 mois, limite d'un tiers par échéance, base puis complémentaire ; D. 161-2-11 : revenus soumis à CSG ; D. 161-2-19 : proratisation | https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000055047344 |
| Légifrance | Décret n° 2025-681 du 15/07/2025 (JO du 23/07/2025) | D. 161-2-24 : âge « égal à soixante ans » (auparavant âge légal abaissé de deux ans) ; pensions prenant effet à compter du 01/09/2025 (lu via l'index de recherche et l'actualité Service-Public A18399) | https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000051942071 |
| Légifrance | CSS art. L. 161-22-1-5, version en vigueur depuis le 26/10/2025 (modifié par la loi n° 2025-989 du 24/10/2025, art. 6) | « liquidation provisoire et le service d'une même fraction de pension dans tous les régimes de retraite de base légalement obligatoires » ; âge et durée fixés par décret | https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048697292 |
| Ministère du Travail (Code du travail numérique) | Art. L. 3123-4-1 | accord réputé acquis à défaut de réponse écrite et motivée sous 2 mois ; refus justifié par l'incompatibilité avec l'activité économique | https://code.travail.gouv.fr/code-du-travail/l3123-4-1 |
| L'Assurance retraite | Page « Retraite progressive » (sans date) | trimestres retenus ; quotité par rapport à la durée légale ou conventionnelle ; forfait jours 87 à 174 jours sur 218 ; pas d'activité indépendante en parallèle ; surcotisation avec l'accord de l'employeur ; demande distincte pour la retraite définitive ; indépendants | https://www.lassuranceretraite.fr/portail-info/home/actif/je-souhaite-partir-plus-tot/retraite-progressive.html |
| L'Assurance retraite | Page « Cumuler emploi et retraite » (sans date) | seconde pension plafonnée à 5 % du PASS ; cumul plafonné ; règles 2027 (seuil encore présenté au conditionnel) | https://www.lassuranceretraite.fr/portail-info/home/actif/montant-retraite/cumuler-emploi-retraite.html |
| Service-Public | Fiche F37400 « Retraite progressive de l'agent public », vérifiée le 01/09/2025 | 60 ans, 150 trimestres, quotité de 50 à 90 %, exclusivité, contractuels | https://www.service-public.gouv.fr/particuliers/vosdroits/F37400 |
| Service-Public | Fiche F14043 (âge légal), vérifiée le 14/08/2026 | âge légal par génération (1966 : 63 ans et 3 mois) | https://www.service-public.gouv.fr/particuliers/vosdroits/F14043 |
| Agirc-Arrco | Circulaire 2023-8-DRJ du 15/09/2023 (PDF lu) | « coefficients d'abattement spécifiques » sur l'allocation servie pendant la retraite progressive, barème intitulé « coefficients temporaires » | https://www.agirc-arrco.fr/wp-content/uploads/2023/09/Circulaire_Agirc-Arrco_2023_8_DRJ-a1_RetraiteProgressive_bareme_sept2023.pdf |

Non lus : Cnav (circulaires sur le calcul de la pension provisoire : PDF illisibles par l'outil) ; barème Agirc-Arrco 2026 des coefficients de retraite progressive (reglementation.agirc-arrco.fr refuse la connexion, certificat) ; Légifrance, texte intégral de L. 3123-4-1 et du décret n° 2026-1016.

### Sources divergentes signalées au lecteur

1. **Accord de l'employeur** : l'actualité Service-Public A18399 (24/07/2025) range « l'accord de l'employeur » parmi les conditions ; la fiche F12842 et l'article L. 3123-4-1 actuel décrivent le silence de 2 mois valant accord et le refus motivé. L'article explique que la règle a changé.
2. **Seuil de 7 000 €** : fixé « pour l'année 2027 » par le décret n° 2026-1017 ; la page de l'Assurance retraite le présente encore au conditionnel. L'article dit que le décret fait foi.
3. **Quotités** : 40 à 80 % (privé) contre 50 à 90 % (fonctionnaires) : présenté comme deux règles distinctes.

### Chiffres et points à faire confirmer par un humain

1. **Fiche F12842 vérifiée le 17/11/2025** (un an) : la plus ancienne des sources centrales. À relire à sa prochaine mise à jour.
2. **Taux de la pension provisoire** (décote ou non quand le taux plein n'est pas atteint à 60 ans) : aucune source lue ne le détaille ; l'article le dit et renvoie à la caisse. Un index de recherche mentionne un exemple Cnav (circulaire 2025-19) à 37,50 % proratisé, non relu. Point important pour le lecteur de 60 ans : à compléter après lecture d'une circulaire Cnav.
3. **Coefficients Agirc-Arrco pendant la retraite progressive** : principe tiré de la circulaire de 2023 ; le barème 2026 n'a pas pu être ouvert. Caractère « temporaire » tiré de l'intitulé du barème de 2023.
4. **Seuil 2027 exactement égal à 7 000 €** : conforme au décret (« pour l'année 2027 ») ; la première revalorisation interviendrait donc au 01/01/2028 (déduction, non écrite dans l'article).
5. **Délai de 6 mois chez le dernier employeur** : cité uniquement pour les pensions d'avant 2027 ; son maintien dans le régime 2027 n'a pas été vérifié (l'article n'en dit rien).
6. **Loi n° 2025-989 du 24/10/2025** : identifiée par Légifrance comme texte modificateur de L. 161-22-1-5 (art. 6) ; pour L. 3123-4-1, l'attribution (art. 5) vient d'une source syndicale, donc l'article parle seulement de « rédaction actuelle ».
7. **Âge légal par génération** (suspension de la réforme) : repris de F14043 ; seul 1966 (63 ans et 3 mois) est cité dans le texte, la liste complète est dans `hypotheses.js` sans être affichée.
8. **Forfait jours 87 à 174 jours** : source Assurance retraite uniquement.
9. **2 916,85 € et 2 403 €** : valeurs 2026 de la fiche F13243 ; à réviser au 01/01/2027 (Smic, PASS).

### Affirmations sensibles à relire

- « À 60 ans, pour la plupart des salariés, seule la retraite progressive est accessible » : déduction logique (le cumul suppose une retraite obtenue), formulée avec la réserve des départs anticipés.
- Exemple à 60 % : la pension provisoire de 2 200 € est une **donnée posée**, non calculée (signalé dans l'encadré) ; salaire supposé proportionnel au temps de travail ; montants bruts. Le total de 82 % du salaire brut n'est pas un taux de maintien du revenu net.
- Grille « écrêtement 2027 » : application mécanique de la formule sur des revenus bruts annuels, sans la proratisation ni l'assiette CSG (98,25 %) ; signalé comme illustration.
- « Rien n'interdit au législateur de retoucher ces règles » (PLFSS 2027 non adopté au 18/11/2026) : formule de prudence, sans mesure précise citée.
- Arbre de décision : oriente vers des critères (droit ouvert, niveau de pension, volume d'activité), sans désigner de choix.
- « Salaire et pension s'additionnent dans le revenu imposable » : principe général non sourcé ici.

### Point d'attention hors périmètre (non corrigé) — IMPORTANT

- **`src/pages/GuideCumulEmploiRetraite.jsx` contredit la fiche F13243** : il affirme (résumé, section « nouveaux droits », FAQ, synthèse) que depuis la réforme de 2023 le cumul « ne crée plus de nouveaux droits ». La fiche F13243 (vérifiée le 12/11/2026) indique l'inverse : depuis le 1er janvier 2023, le cumul intégral ouvre de nouveaux droits (seconde pension plafonnée à 2 403 € bruts par an), seul le cumul plafonné n'en crée pas. Ce guide ne dit rien non plus des règles 2027. Seule une phrase de lien y a été ajoutée ; les deux pages se contredisent donc sur ce point tant que le guide existant n'est pas corrigé.
- `src/pages/GuideSurcoteDecote.jsx` décrit le cumul « sans plafond après le taux plein » : exact pour les pensions d'avant 2027 seulement.
- Recouvrement à surveiller avec la PR #14 (`pieges-du-cumul-emploi-retraite`, `/actualites/cumul-emploi-retraite-nouvelles-regles-2027`) : angle distinct (comparaison), section 2027 volontairement courte ; maillage à poser à la fusion.
- `HYPOTHESES_MAJ` inchangé : l'article se date par `RETRAITE_PROGRESSIVE_CUMUL.maj`.

### Liens internes

- Sortants : `/guide/cumul-emploi-retraite-comment-ca-marche`, `/guide/verifier-releve-de-carriere-retraite`, `/guide/retraite-fonctionnaires-completer`, `/guide/surcote-decote-retraite`, `/guide/retraite-complementaire-agirc-arrco-cadres-calcul`, `/simulateur-retraite`, `/bilan-retraite`.
- Entrants ajoutés : `/guide/cumul-emploi-retraite-comment-ca-marche` (section « Qu'est-ce que le cumul emploi-retraite ? », poursuite d'activité sans liquidation), `/guide/surcote-decote-retraite` (paragraphe sur le cumul), carte dans `/guides` (catégorie « Comprendre le système de retraite »).

### Visuels suggérés

- Frise « 60 ans → âge légal → 67 ans » : retraite progressive avant la retraite, cumul après, avec les trois tranches de 2027.
- Arbre de décision en 3 questions (droit ouvert ? pension au niveau visé ? volume d'activité ?).
- Barres empilées salaire + fraction de pension pour 40, 50, 60, 70 et 80 % de temps de travail.

### Relecture 2026-11-18 (article 4, retraite progressive ou cumul)

Relecteur indépendant (Opus). Sources primaires relues le 18/11/2026.

- **Vérifié (conforme)**
  - F12842 (vérifiée le 17/11/2025) : 60 ans, 150 trimestres, 40-80 % ; LRAR au moins 2 mois avant, silence de 2 mois = accord, refus motivé ; fraction = 100 % − quotité ; pension provisoire sur les droits à la date de la demande ; suspension / arrêt définitif ; pension définitive « ne peut pas être inférieure au montant provisoire » ; surcotisation ; demande possible si déjà à temps partiel. La fiche ne mentionne ni décote ni taux plein pour la pension provisoire : formulation prudente de l'article conservée.
  - F13243 (vérifiée le 12/11/2026) : 2 916,85 € bruts/mois (160 % du Smic) et 2 403 € bruts/an (= 5 % × PASS 2026 de 48 060 €) bien présentés comme valeurs du régime antérieur à 2027 ; délai de 6 mois chez le dernier employeur cité dans la seule section « avant 2027 » ; déclaration dans le mois (Carsat) ; règles 2027 par âge, 7 000 €, moitié du dépassement, retenue sur 12 mois limitée à un tiers, revenus soumis à CSG, proratisation, liste des activités non prises en compte.
  - Décret n° 2026-1017 du 02/11/2026 (JORF n° 0257 du 03/11/2026) : D. 161-2-8 « Pour l'année 2027, son montant est fixé à sept mille euros », revalorisation comme le plafond L. 241-3 ; D. 161-2-10 (12 mois, un tiers, base puis complémentaire, plafonnement au montant des pensions) ; D. 161-2-11 (CSG) ; D. 161-2-19 (prorata) ; D. 161-2-9 (activités de R. 161-19 exclues). Aucun délai de 6 mois chez le dernier employeur dans le décret.
  - A18914 (publiée le 22/05/2026, mise à jour le 10/11/2026) : LFSS 2026 art. 102, décrets 2026-1016/1017, « seul l'âge est pris en compte », retraités d'avant 2027 maintenus dans les anciennes règles même en cas de reprise en 2027, nouveaux droits à partir de 67 ans.
  - Décret n° 2025-681 du 15/07/2025 (JORF du 23/07/2025, n° 169) : D. 161-2-24 « est égal à soixante ans », pensions prenant effet à compter du 01/09/2025.
  - L. 3123-4-1 (Code du travail numérique, mis à jour le 26/10/2025) ; F37400 (50-90 %, exclusivité, contractuels) ; F14043 (1966 : 63 ans et 3 mois ; grille de `hypotheses.js` identique) ; Assurance retraite (trimestres retenus, 87-174 jours sur 218, pas d'activité indépendante parallèle, surcotisation avec accord de l'employeur, demande distincte de retraite définitive).
  - Grilles recalculées par script Python (Decimal) : quotités 40/50/60/70/80 % → totaux 2 920 / 3 100 / 3 280 / 3 460 / 3 640 € (73 / 77,5 / 82 / 86,5 / 91 %) ; écrêtement 2027 pour 7 000 / 12 000 / 20 000 / 28 800 € → 0 / 2 500 / 6 500 / 10 900 € par an (0 / 208 / 542 / 908 € par mois). Conformes. Pension provisoire de 2 200 € bien présentée comme donnée posée.
  - Conformité : aucune occurrence de Calendly, Épargne Plurielle, Uptimi, CIF, « vous conseillons », « nous recommandons », À VÉRIFIER, À CONFIRMER, TODO, « choisissez » ; aucun produit nommé ; PLFSS 2027 présenté comme non adopté.
- **Corrigé (avant → après)**
  - Demande aux caisses « 5 mois avant la date souhaitée » → « au plus tôt 5 mois avant » (F12842 : « au plus tôt 5 mois avant ») ; tableau, FAQ et commentaire de `delaiDemandeCaisseMois`.
  - Complémentaire : circulaire Agirc-Arrco 2023-8-DRJ (« coefficients d'abattement spécifiques », caractère temporaire déduit de l'intitulé du barème) → circulaire 2025-14-SG-DRJ du 25/08/2025, qui annule et remplace la précédente pour les départs à partir du 01/09/2025 : « coefficient d'anticipation spécifique temporaire » tenant compte des trimestres acquis, barème limité aux effets de septembre à décembre 2025 ; source mise à jour.
  - Tableau, colonne « à partir du 01/01/2027 », ligne Activité : « Libre » → précision que les sources consultées ne disent pas si le délai de 6 mois chez le dernier employeur est maintenu.
  - Grille 2027 : ajout que les revenus bruts y servent d'approximation de l'assiette CSG retenue.
  - Synthèse : « réduisent la pension dès 7 000 € » → « au-delà de 7 000 € ».
- **Reste à confirmer par l'éditeur**
  - Taux de la pension provisoire de base (décote ou non avant le taux plein) : non détaillé par F12842 ni par l'Assurance retraite ; circulaire Cnav dédiée non lue.
  - Barème Agirc-Arrco des coefficients pour les retraites progressives prenant effet en 2026 : non trouvé.
  - Maintien ou non du délai de 6 mois chez le dernier employeur pour les pensions de 2027 (silence de F13243, A18914 et du décret 2026-1017 ; D. 161-2-6 exige la rupture de tout lien avec l'employeur pour le service de la pension).
  - Divergence sur l'accord de l'employeur : l'Assurance retraite écrit encore « l'accord de l'employeur est nécessaire » tout en mentionnant le silence de 2 mois ; l'article présente la règle de L. 3123-4-1 (non modifié).
  - Demande unique valant pour toutes les caisses (FAQ) et mention A18399 : non relues.
  - 2 916,85 € et 2 403 € : valeurs 2026, à réviser au 01/01/2027.
