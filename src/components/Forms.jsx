import { useState } from "react";
import { envoyerFiable } from "../lib/envoi-fiable.js";

// Envoi serveur (Vercel Function /api/send-lead-email) : relaie vers Brevo (email) ET
// le CRM interne, répond 200 si au moins un canal a confirmé. envoyerFiable garde la
// saisie en localStorage et la rejoue tant que le serveur n'a pas confirmé.
async function envoyerLead(formulaire, data) {
  return envoyerFiable("/api/send-lead-email", { ...data, formulaire, pageUrl: window.location.href });
}

export function FormBilan() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [envoi, setEnvoi] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (envoi) return; // évite le double envoi
    setError(false);
    setEnvoi(true);
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const ok = await envoyerLead("bilan", data);
      if (ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setEnvoi(false);
    }
  }

  if (sent) {
    return (
      <div className="form-confirm" role="status">
        <h3>Demande bien reçue</h3>
        <p>
          Merci. Il ne reste qu'une étape : choisissez le créneau qui vous convient pour votre
          bilan de 15 minutes.
        </p>
        <p style={{ marginTop: "1rem" }}>
          <a className="btn btn-primary" href="https://cal.com/rempartfinancier/30min" target="_blank" rel="noopener noreferrer">
            Choisir mon créneau
          </a>
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="b-prenom">Prénom</label>
        <input id="b-prenom" name="PRENOM" type="text" required autoComplete="given-name" />
      </div>
      <div>
        <label htmlFor="b-email">Email</label>
        <input id="b-email" name="EMAIL" type="email" required autoComplete="email" />
      </div>
      <div>
        <label htmlFor="b-tel">Téléphone</label>
        <input id="b-tel" name="SMS" type="tel" inputMode="tel" required autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="b-age">Âge approximatif</label>
        <select id="b-age" name="TRANCHE_AGE" required defaultValue="">
          <option value="" disabled>Sélectionner</option>
          <option>Moins de 45 ans</option>
          <option>45 – 50 ans</option>
          <option>50 – 55 ans</option>
          <option>55 – 60 ans</option>
          <option>60 – 65 ans</option>
          <option>Plus de 65 ans</option>
        </select>
      </div>
      <div>
        <label htmlFor="b-patrimoine">Patrimoine financier estimé</label>
        <select id="b-patrimoine" name="TRANCHE_PATRIMOINE" required defaultValue="">
          <option value="" disabled>Sélectionner</option>
          <option>Moins de 50 000 €</option>
          <option>50 000 – 150 000 €</option>
          <option>150 000 – 300 000 €</option>
          <option>300 000 – 500 000 €</option>
          <option>Plus de 500 000 €</option>
        </select>
        <p className="hint">Une fourchette suffit — elle sert uniquement à préparer l'entretien.</p>
      </div>
      <div>
        <label htmlFor="b-situation">Situation</label>
        <select id="b-situation" name="SITUATION" required defaultValue="">
          <option value="" disabled>Sélectionner</option>
          <option>Salarié(e) du privé</option>
          <option>Fonctionnaire</option>
          <option>En transition (départ proche, rupture, reconversion)</option>
          <option>Autre</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary" disabled={envoi} aria-busy={envoi}>Demander mon bilan gratuit</button>
      {error && (
        <p role="alert">
          L'envoi n'a pas abouti pour le moment. Votre demande est conservée sur cet appareil et sera renvoyée automatiquement ; vous pouvez aussi nous appeler au 01 84 16 37 91.
        </p>
      )}
      <p className="hint">
        Ces informations sont confidentielles et servent uniquement à préparer votre entretien.
      </p>
    </form>
  );
}

export function FormContact({ onSuccess }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [envoi, setEnvoi] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (envoi) return; // évite le double envoi
    setError(false);
    setEnvoi(true);
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const ok = await envoyerLead("contact", data);
      if (ok) {
        setSent(true);
        onSuccess?.(data);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setEnvoi(false);
    }
  }

  if (sent) {
    return (
      <div className="form-confirm" role="status">
        <h3>Message envoyé</h3>
        <p>Merci pour votre message. Nous revenons vers vous rapidement, en général sous 48 h ouvrées.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="c-prenom">Prénom</label>
        <input id="c-prenom" name="PRENOM" type="text" required autoComplete="given-name" />
      </div>
      <div>
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="EMAIL" type="email" required autoComplete="email" />
      </div>
      <div>
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" name="MESSAGE" required />
      </div>
      <button type="submit" className="btn btn-primary" disabled={envoi} aria-busy={envoi}>Envoyer</button>
      {error && (
        <p role="alert">L'envoi n'a pas abouti pour le moment. Votre demande est conservée et sera renvoyée automatiquement ; vous pouvez aussi nous appeler au 01 84 16 37 91.</p>
      )}
      <p className="hint">
        Ces informations sont confidentielles et servent uniquement à répondre à votre demande.
      </p>
    </form>
  );
}

// Formulaire de capture pour un lead magnet PDF (guide téléchargeable).
// Livraison double : téléchargement immédiat affiché ici à l'état succès
// (le visiteur ne repart jamais les mains vides) — ce site n'envoie pas
// d'email de confirmation (aucune API transactionnelle configurée), donc
// cet écran de succès est le seul canal de livraison.
export function FormLeadMagnet({ pdfUrl, pdfNomFichier, guideTitre }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [envoi, setEnvoi] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (envoi) return; // évite le double envoi
    setError(false);
    setEnvoi(true);
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const ok = await envoyerLead("lead_magnet", data);
      if (ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setEnvoi(false);
    }
  }

  if (sent) {
    return (
      <div className="form-confirm" role="status">
        <h3>Votre guide est prêt</h3>
        <p>Merci. Téléchargez-le dès maintenant — ce lien reste valable, vous pouvez le reprendre à tout moment.</p>
        <p style={{ marginTop: "1rem" }}>
          <a className="btn btn-primary" href={pdfUrl} download={pdfNomFichier}>
            Télécharger le guide (PDF)
          </a>
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="g-email">Email</label>
        <input id="g-email" name="EMAIL" type="email" required autoComplete="email" />
      </div>
      <button type="submit" className="btn btn-primary" disabled={envoi} aria-busy={envoi}>
        Recevoir {guideTitre ? `« ${guideTitre} »` : "le guide"}
      </button>
      {error && (
        <p role="alert">L'envoi n'a pas abouti pour le moment. Votre demande est conservée et sera renvoyée automatiquement ; vous pouvez aussi nous appeler au 01 84 16 37 91.</p>
      )}
      <p className="hint">Vos données restent confidentielles. Pas de spam.</p>
    </form>
  );
}
