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
