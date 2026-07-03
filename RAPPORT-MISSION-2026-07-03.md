# Rapport de fin de mission — Enrichissement des pages stratégies (3 juillet 2026)

Mission : descendre au niveau des supports concrets sur les 5 pages stratégies pour un public
débutant, avec l'avis de Fabienne (reformulé depuis le corpus Notion) et des repères chiffrés
datés/sourcés, plus des articles phares « à la une » de type assignment selling.

---

## 1. Ce qui a été créé ou modifié

### Infrastructure (nouveaux fichiers)
| Fichier | Rôle |
|---|---|
| `src/components/hypotheses.js` | **Source de vérité unique de tous les chiffres** : rendements (fonds euros, obligataires, actions, SCPI, LMNP, locatif), frais types (bancaire vs internet, gestion pilotée, SCPI, ETF vs fonds actifs), fiscalité, décumulation, valeurs d'illustration. Chaque bloc daté et sourcé, tout marqué « À VÉRIFIER ». `HYPOTHESES_MAJ = "juillet 2026"` affiché à l'écran partout. |
| `src/components/Simulateurs.jsx` | `SimulateurCapitalisation` (enveloppes per/av/pea : versement, durée, rendement et frais paramétrables, comparaison brut/net selon la fiscalité de sortie de l'enveloppe, effort réel après déduction selon TMI pour le PER) et `TableRenteVsRetraits` (rente viagère vs retraits programmés sur 6 durées de vie, paramétrable). Rendus dans le HTML statique (SSG), interactifs après hydratation. Aucun taux en dur : tout vient de hypotheses.js. |

### Pages stratégies enrichies (+ ~1 080 lignes)
| Page | Ajouts |
|---|---|
| `StrategiePer.jsx` | Chapitre « les trois supports » (fonds euros / UC / gestion pilotée à horizon), simulateur PER, tableau comparatif des supports, section « protection familiale et transmission » (152 500 €/bénéf. avant 70 ans, 30 500 € après, déduction jamais reprise si décès avant liquidation, pas de PS sur les gains transmis), encadré PER assurantiel vs bancaire. |
| `StrategieAssuranceVie.jsx` | Chapitre supports (fonds euros avec Sapin 2 sobre / UC / gestion libre vs pilotée), simulateur AV (angle frais 0,6 % vs 2 %), tableau comparatif 4 supports, renvoi visible vers l'article phare. |
| `StrategiePea.jsx` | Chapitre « deux grandes voies » (actions en direct / ETF, y c. réplication synthétique expliquée), simulateur PEA, tableau comparatif, section « PEA et succession » (clôture au décès → enveloppe à consommer de son vivant), renvoi article phare. |
| `StrategieImmobilier.jsx` | SCPI enrichie en **survol** (taux de distribution ASPIM daté, frais d'entrée centralisés, renvoi scpirentable.fr), LMNP détaillé (amortissement expliqué, prudence réforme), **nouvelle section locatif direct** (effet de levier vs charge mentale à la retraite, fausses boussoles), tableau comparatif SCPI/LMNP/locatif. |
| `StrategieDecumulation.jsx` | Rente viagère approfondie (taux de conversion défini et daté), retraits programmés avec **risque de séquence des rendements** expliqué, **ordre de décaissement PEA → AV (abattement annuel) → PER en dernier** (toujours « au cas par cas »), `TableRenteVsRetraits`, tableau comparatif rente/retraits/mix, espérance de vie à 65 ans (INSEE). |

### Articles phares (nouvelles pages, liées depuis la Home « À la une », routes + sitemap à jour)
| Page | URL | Contenu |
|---|---|---|
| `GuideAvRapportePeu.jsx` | `/guide/pourquoi-votre-assurance-vie-rapporte-peu` | **L'article à envoyer aux prospects avant RDV.** Fonds euros vs fonds actions vs obligataires, les 3 étages de frais, fonds maison et closet indexing, gestion pilotée (piège structurel des rachats au prorata), simulateur intégré « jouez sur les frais », check-list d'audit de son contrat en 20 min (DIC, taux servi, clause bénéficiaire), garde-fou « ne fermez pas un contrat de plus de 8 ans sur un coup de tête ». |
| `GuidePerBancaire.jsx` | `/guide/per-bancaire-frais-gestion-horizon` | Les 3 familles de PER, gestion à horizon = réglage par défaut que personne ne remet en question, empilement de frais, cas PERCO (fonds ≈ 3 %, simulation 5 000 €/an/20 ans : 173 596 € à 5 % vs 247 115 € à 8 % net, écart 73 518 € — dynamique), transfert tous les 3 ans, check-list d'audit en 15 min. |
| `GuidePeaBanqueCourtier.jsx` | `/guide/pea-banque-ou-courtier` | Frais encadrés (loi Pacte) vs coût des supports, exemple 300 €/mois/15 ans fonds maison vs ETF, néo-courtiers « gratuits » et coûts déplacés, transfert avec antériorité fiscale, check-list d'audit. |

### Process qualité appliqué
Corpus Notion intégralement dépouillé (7 agents, 209 fichiers → positions/chiffres/gaps par thème
+ synthèse de style oral→écrit). Rédaction par 8 agents. **Audit adversarial systématique** de
chaque fichier : conformité AMF, recherche de plagiat par grep dans le corpus, recalcul de chaque
exemple chiffré, respect des règles réseau. 8 problèmes critiques détectés et corrigés (4 copies
quasi verbatim du corpus reformulées, 2 défauts de sourçage AMF, 2 avis dépassant le corpus
neutralisés), ~25 corrections importantes/mineures appliquées. Build SSG final : 18/18 pages,
tout le contenu (simulateurs compris) présent dans le HTML statique.

### Choix de modèle (demandé dans le brief)
Toute la mission — rédaction éditoriale longue, audits et code des composants — a tourné sur
**claude-fable-5** (les agents héritent du modèle de la session, pilotée par claude-fable-5).
La consigne « fable-5 pour l'éditorial, modèle par défaut acceptable pour le code » est donc
respectée par excès : le code a lui aussi bénéficié du modèle éditorial.

---

## 2. Chiffres à faire vérifier par Fabienne avant publication

### ✅ Arbitrage tranché (mise à jour du 3 juillet 2026, après-midi)
- **Prélèvements sociaux différenciés par enveloppe** : confirmé — la LFSS 2026 (art. 12) relève
  le taux de 17,2 % à 18,6 % pour le **PER, le PEA et le CTO**, mais **exclut explicitement
  l'assurance-vie et les revenus fonciers/immobiliers**, qui restent à 17,2 %.
  `FISCALITE.prelevementsSociaux` dans `hypotheses.js` est désormais un objet
  `{ per: 18.6, pea: 18.6, cto: 18.6, assuranceVie: 17.2, immobilier: 17.2 }` (source documentée
  en commentaire, encore marquée « À VÉRIFIER » pour la référence légale précise). Toutes les
  pages et les simulateurs (`SimulateurCapitalisation`, page décumulation, article PEA/AV) ont
  été mis à jour pour consommer le taux de la bonne enveloppe ; le passage de la page PER qui
  compare AV (17,2 %, prélevé chaque année) et PER (18,6 %, prélevé à la sortie) affiche
  désormais les deux taux distinctement. Build et arithmétique revérifiés (ex. : exemple
  décumulation 9 000 € de gains AV × 17,2 % = 1 548 €, exact).

### Hypothèses centralisées (`src/components/hypotheses.js` — tout est marqué « À VÉRIFIER »)
- Fonds euros : 1,5–4,0 %, moyenne 2,6 % (2024, France Assureurs/ACPR, net de gestion, avant PS)
- Fonds obligataires : 2,0–4,5 % (2024-2025, investment grade euro)
- Actions long terme : 5,0–8,0 %, moyenne 6,5 % (annualisé 20-30 ans, type MSCI World, avant frais)
- SCPI : 4,0–6,0 %, moyenne 4,7 % (taux de distribution 2024, ASPIM/IEIF) ; frais d'entrée 8–12 %
- LMNP : 3,0–6,0 % brut ; locatif direct : 2,5–6,5 % brut (2024-2025)
- Frais bancaires : entrée 1–3 %, gestion 0,6–1 %, supports 1,5–2,2 %, arbitrage 0,5–1 % ;
  contrats internet : 0 / 0,5–0,6 / 0,2–0,4 / 0 ; surcoût gestion pilotée 0,2–1 %
- ETF : TER 0,2–0,4 % ; fonds actions classiques : 1,5–2,2 %
- Taux de conversion rente à 65 ans : 4,0–5,5 %, défaut 4,5 % ; espérance de vie à 65 ans :
  23 ans (femmes) / 19 ans (hommes) (INSEE 2023-2024)
- Valeurs d'illustration : 5 %/an « dynamique », frais fonds maison 2 %, ETF 0,3 %,
  fonds épargne salariale 3 %/an

### Montants légaux cités (datés « juillet 2026 » dans les pages)
- Abattements décès PER assurantiel/AV : **152 500 €**/bénéficiaire avant 70 ans (art. 990 I),
  **30 500 €** global après 70 ans (art. 757 B) — et la règle spécifique PER « c'est l'âge au
  décès qui compte, pas la date des versements »
- **Sommes déduites jamais réintégrées à l'IR si décès avant liquidation du PER** + absence de
  PS sur les gains transmis — fait juridique central de l'argumentaire transmission, à valider
- Abattements AV après 8 ans : 4 600 / 9 200 € ; taux réduit 7,5 % ; PFU 12,8 % ; plafond PEA
  150 000 € ; exonération IR PEA après 5 ans ; barème TMI 0/11/30/41/45 %
- Transfert PERCO → PER : possible tous les 3 ans en poste, frais ≤ 1 % si plan < 5 ans, 0 après
- Plafonds loi Pacte sur frais de transfert PEA ; retenue à la source dividendes étrangers
  15–35 % selon conventions ; délais de rachat AV (jours à semaines, délai légal 2 mois)
- Illustration transmission PER : 300 000 € déduits → 90 000 à 135 000 € d'impôt définitivement
  écartés selon TMI (à barème constant — issue du corpus)
- Nuance technique à valider juridiquement : **PS du fonds euros prélevés à la sortie sur un PER
  assurantiel** (vs chaque année en AV) — formulé au conditionnel dans la page PER
- Garantie du fonds euros « le plus souvent brute de frais de gestion » — varie selon contrats

### Exemples calculés (arithmétique revérifiée par les auditeurs — recalcul indépendant exact)
Tous dérivés dynamiquement de hypotheses.js (ils se mettront à jour si tu révises les valeurs) :
10 000 € à 2,6 % vs 5 % sur 10-15 ans ; 50 000 € sur 15 ans à 6,5 % brut moins 2,65 % vs 0,85 %
de frais (écart ≈ 25 910 €) ; 300 €/mois/15 ans fonds maison vs ETF (écart ≈ 14 000 €) ;
PERCO 5 000 €/an/20 ans (écart 73 518 €) ; « 3 points de frais ÷ capital par 2 sur 25 ans »
(borné aux versements uniques).

---

## 3. Zones où le corpus ne permettait pas d'avis tranché (signalées, pas inventées)

Positions **neutralisées en description factuelle** (à faire valider si tu veux les assumer) :
1. **Rente viagère hors PER** : ton corpus est muet (aucune occurrence de « viager/viagère » hors
   sortie PER). Les pages AV/PEA/décumulation présentent la rente factuellement ; seule la
   position « sortie en rente du PER rarement optimale » est reprise, prudemment.
2. **Mix rente + retraits** : présenté comme « combinaison possible », pas comme pratique du
   cabinet (le corpus ne la documente pas).
3. **Nue-propriété de SCPI** (page immobilier, § démembrement préexistant) : le corpus est en
   tension (« tous les risques concentrés dans la nue-pro » vs « c'est le TRI qui compte ») —
   le paragraphe reste positif générique, **à nuancer ou valider**.
4. **Taux de retrait soutenable** : aucune « règle des 4 % » dans le corpus → la page décumulation
   dit explicitement qu'aucun taux universel n'existe.
5. **Seuil de TMI d'opportunité du PER** : le corpus interdit toute grille positive (« risqué même
   à 30 % vu comme placement retraite ») → aucune règle chiffrée publiée ; la déduction est
   présentée comme proportionnalité arithmétique, jamais comme critère suffisant.
6. **Désensibilisation à horizon du PER** : le corpus critique la gestion pilotée en général
   (packagée, frais, rachats au prorata) mais pas le mécanisme de glide path lui-même → la
   critique publiée est strictement bornée à ce que le corpus soutient.
7. **LMNP en direct** : position corpus seulement esquissée (réforme des amortissements pénalisant
   les revendeurs précoces) → analyse prudente et générale.
8. Non traités faute de corpus : viager immobilier, PERO/article 83, plafonds de déduction 10 %
   PASS (renvoi à l'avis d'imposition), allocation type en UC, choix nominatif de
   contrats/courtiers (aussi une règle de neutralité), FGAP/faillite d'assureur, sécurisation
   progressive pré-retraite (méthode), PEA-PME au-delà d'une mention.

---

## 4. Reliquats mineurs assumés
- « après 8 ans » (maturité fiscale AV) en dur dans quelques pages — durée légale stable, pas de
  constante dédiée.
- Sources de hypotheses.js affichées à l'écran sur les chiffres majeurs (France Assureurs/ACPR,
  ASPIM/IEIF, MSCI World, INSEE) ; les fourchettes secondaires renvoient à « hypothèses du site
  révisées en juillet 2026 ».
- `content-corpus/` reste gitignoré ; les notes de dépouillement (positions par thème + synthèse
  de style) sont dans le scratchpad de session — me les redemander avant qu'elles n'expirent si
  tu veux les archiver.

## 5. Pour publier
1. Trancher le 17,2/18,6 % + valider les blocs « À VÉRIFIER » de hypotheses.js (un seul fichier).
2. Relire les 3 positions à valider (rente, mix décumulation, nue-pro SCPI).
3. `bun run build` puis déployer `dist/` (18 pages, sitemap à jour).
