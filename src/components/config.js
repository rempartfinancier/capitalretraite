// ============================================================
// PLACEHOLDERS À COMPLÉTER AVANT MISE EN LIGNE
// ============================================================

// 1. Calendly — remplacer par l'URL réelle du type d'événement (bilan 15 min).
export const CALENDLY_URL = "https://calendly.com/A-COMPLETER/bilan-retraite-15min";

// Tant que l'URL ci-dessus n'a pas été remplacée par la vraie URL Calendly,
// on masque/désactive tout lien "Prendre RDV" plutôt que d'afficher un lien mort.
export const CALENDLY_CONFIGURED = !CALENDLY_URL.includes("A-COMPLETER");

// 2. Brevo — SÉCURITÉ : sur un site 100 % statique, toute clé API présente
//    dans une variable d'environnement Vite (VITE_*) finit dans le bundle
//    livré au navigateur, donc publique. Ne JAMAIS utiliser la clé API Brevo ici.
//    Utiliser à la place l'URL d'action d'un formulaire Brevo (Contacts →
//    Formulaires → créer un formulaire → récupérer l'attribut `action` du <form>).
//    Cette URL ne contient aucun secret et peut être exposée côté client.
//    À défaut, passer par un petit proxy serverless qui détient la clé.
export const BREVO_FORM_ACTION_BILAN = import.meta.env.VITE_BREVO_FORM_ACTION_BILAN || "";
export const BREVO_FORM_ACTION_CONTACT = import.meta.env.VITE_BREVO_FORM_ACTION_CONTACT || "";
