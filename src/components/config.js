// ============================================================
// PLACEHOLDERS À COMPLÉTER AVANT MISE EN LIGNE
// ============================================================

// 1. Brevo — SÉCURITÉ : sur un site 100 % statique, toute clé API présente
//    dans une variable d'environnement Vite (VITE_*) finit dans le bundle
//    livré au navigateur, donc publique. Ne JAMAIS utiliser la clé API Brevo ici.
//    Utiliser à la place l'URL d'action d'un formulaire Brevo (Contacts →
//    Formulaires → créer un formulaire → récupérer l'attribut `action` du <form>).
//    Cette URL ne contient aucun secret et peut être exposée côté client.
//    À défaut, passer par un petit proxy serverless qui détient la clé.
export const BREVO_FORM_ACTION_BILAN = import.meta.env.VITE_BREVO_FORM_ACTION_BILAN || "";
export const BREVO_FORM_ACTION_CONTACT = import.meta.env.VITE_BREVO_FORM_ACTION_CONTACT || "";
// Formulaire dédié au lead magnet PDF (liste Brevo distincte des deux ci-dessus,
// pour tracer l'origine "guide téléchargeable" séparément du bilan et du contact).
export const BREVO_FORM_ACTION_GUIDE = import.meta.env.VITE_BREVO_FORM_ACTION_GUIDE || "";
