import { useState } from "react";
import {
  BREVO_FORM_ACTION_BILAN,
  BREVO_FORM_ACTION_CONTACT,
  CALENDLY_URL,
  CALENDLY_CONFIGURED,
} from "./config.js";

async function postToBrevo(actionUrl, data) {
  if (!actionUrl) {
    console.warn("URL de formulaire Brevo non configurée (voir src/components/config.js).");
    return false; // pas d'endpoint configuré : échec réel, pas de fausse confirmation
  }
  const body = new URLSearchParams(data);
  const res = await fetch(actionUrl, {
    method: "POST",
    mode: "no-cors", // les endpoints de formulaire Brevo ne renvoient pas de CORS
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  return res.ok || res.type === "opaque";
}

export function FormBilan() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const ok = await postToBrevo(BREVO_FORM_ACTION_BILAN, data);
      if (ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
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
        {CALENDLY_CONFIGURED ? (
          <p style={{ marginTop: "1rem" }}>
            <a className="btn btn-primary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Choisir mon créneau
            </a>
          </p>
        ) : (
          <p style={{ marginTop: "1rem" }}>Nous revenons vers vous rapidement pour convenir d'un créneau.</p>
        )}
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
        <input id="b-tel" name="SMS" type="tel" required autoComplete="tel" />
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
      <button type="submit" className="btn btn-primary">Demander mon bilan gratuit</button>
      {error && (
        <p role="alert">
          L'envoi n'a pas abouti. Réessayez, ou écrivez-nous via la page contact.
        </p>
      )}
      <p className="hint">
        Ces informations sont confidentielles et servent uniquement à préparer votre entretien.
      </p>
    </form>
  );
}

export function FormContact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const ok = await postToBrevo(BREVO_FORM_ACTION_CONTACT, data);
      if (ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
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
      <button type="submit" className="btn btn-primary">Envoyer</button>
      {error && (
        <p role="alert">L'envoi n'a pas abouti. Réessayez dans un instant.</p>
      )}
      <p className="hint">
        Ces informations sont confidentielles et servent uniquement à répondre à votre demande.
      </p>
    </form>
  );
}
