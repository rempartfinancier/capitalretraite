# Séquence email — lead magnet « Grille d'audit assurance-vie »

À configurer dans Brevo (Automations) : déclencheur = ajout du contact à la liste
`BREVO_LIST_ID_LEAD_MAGNET_AV` (voir `.env.example`). La même trame sert, en changeant
le contenu du J0, pour la checklist (`BREVO_LIST_ID_LEAD_MAGNET_CHECKLIST`).

Règles communes
- Expéditeur : « Capital Retraite » <contact@capitalretraite.com>. Aucune signature de personne, aucun visage.
- Vouvoiement. Aucun chiffre non sourcé ; renvoi vers les pages du site pour les chiffres.
- Pied de chaque email : lien de désinscription Brevo `{{ unsubscribe }}` + mention « Contenu pédagogique général, sans conseil personnalisé. Tout investissement comporte des risques, dont la perte partielle ou totale du capital. »
- Liens : adresses absolues en https://www.capitalretraite.com (chemins vérifiés par `src/lib/emails.test.js`).

---

## J0 — Livraison du guide (envoi immédiat)

**Objet** : Votre grille d'audit assurance-vie est prête
**Pré-en-tête** : Le PDF, et un article à lire avant de remplir la grille.

Bonjour {{ contact.PRENOM | default: "" }},

Voici la grille d'audit assurance-vie en 20 points que vous avez demandée :
https://www.capitalretraite.com/guides/grille-audit-assurance-vie.pdf

Prévoyez une vingtaine de minutes, votre relevé annuel et le document d'information clé (DIC) de chacun de vos supports.

Avant de remplir la grille, un article vous évitera une erreur fréquente : savoir où lire les frais réels de votre contrat.
https://www.capitalretraite.com/guide/combien-coute-une-assurance-vie

Dans les prochains jours, nous vous enverrons trois courts messages (coût, risques, comparaison avec le PER) pour aller plus loin. Vous pouvez vous désinscrire à tout moment.

La rédaction de Capital Retraite

---

## J2 — Coût (Big 5 : prix)

**Objet** : Combien coûte vraiment une assurance-vie ?
**Pré-en-tête** : Les quatre lignes de frais, et où les trouver.

Bonjour,

La question qui revient le plus : « Mon contrat est-il cher ? ». La réponse tient à quatre lignes de frais, dont deux n'apparaissent pas toujours clairement sur le relevé.

Notre article les détaille une à une, avec des ordres de grandeur datés et les hypothèses affichées :
https://www.capitalretraite.com/guide/combien-coute-une-assurance-vie

Si vous voulez estimer l'effet des frais sur votre propre cas, l'outil en libre-service est ici :
https://www.capitalretraite.com/outils/frais-per-assurance-vie

Désinscription : {{ unsubscribe }}

La rédaction de Capital Retraite

---

## J5 — Risques (Big 5 : problèmes)

**Objet** : Les risques d'une assurance-vie, sans jargon
**Pré-en-tête** : Ce qui peut mal tourner, et ce qui est protégé.

Bonjour,

Une assurance-vie n'est pas sans risque : tout dépend des supports choisis, du contrat et de l'assureur. Notre article distingue ce qui relève du marché, de l'assureur et de la fiscalité, et indique ce que la garantie des assureurs couvre ou non :
https://www.capitalretraite.com/guide/risques-assurance-vie

Désinscription : {{ unsubscribe }}

La rédaction de Capital Retraite

---

## J9 — Comparaison (Big 5 : versus)

**Objet** : PER ou assurance-vie pour préparer la retraite ?
**Pré-en-tête** : Les critères qui comptent, et pour qui l'un ou l'autre est moins adapté.

Bonjour,

Faut-il privilégier le PER ou l'assurance-vie ? Il n'y a pas de réponse universelle : cela dépend de votre taux marginal d'imposition, de votre horizon et de votre besoin de disponibilité. Notre comparatif indique aussi pour qui chacune des deux solutions n'est pas adaptée :
https://www.capitalretraite.com/guide/per-vs-assurance-vie-retraite

Désinscription : {{ unsubscribe }}

La rédaction de Capital Retraite

---

## J12 — Invitation douce au bilan

**Objet** : Un regard extérieur sur votre grille ?
**Pré-en-tête** : 15 minutes, gratuit, sans engagement.

Bonjour,

Si, en remplissant la grille, certains points vous ont laissé un doute, vous pouvez en parler lors d'un bilan retraite de 15 minutes en visioconférence. Il est gratuit et sans engagement : il sert à relire votre situation ligne à ligne, pas à vous vendre un produit.

Si vous préférez avancer seul, vous pouvez aussi tester votre trajectoire avec le simulateur :
https://www.capitalretraite.com/simulateur-retraite

Pour demander un bilan :
https://www.capitalretraite.com/bilan-retraite

Ce message est le dernier de la série. Désinscription : {{ unsubscribe }}

La rédaction de Capital Retraite
