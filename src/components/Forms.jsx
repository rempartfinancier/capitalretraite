import { useRef, useState } from "react";
import { CALENDLY_URL, CALENDLY_CONFIGURED } from "./config.js";
import { pushEvent } from "./tracking.js";

// Envoi serveur (Vercel Function /api/send-lead-email.js) pour Contact et
// Bilan. La réponse HTTP reflète un vrai succès/échec.
async function envoyerLead(formulaire, data) {
  const res = await fetch("/api/send-lead-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, formulaire }),
  });
  return res.ok;
}

// Inscription à une liste Brevo via la fonction serveur /api/subscribe (clé API
// côté serveur uniquement). `source` choisit la liste (voir api/subscribe.js).
// Le code HTTP reflète un vrai succès/échec, contrairement à l'ancien envoi no-cors.
export async function inscrire(source, data) {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, source }),
  });
  return res.ok;
}

// CRM interne du groupe (rempart-crm), relayé par le proxy serverless
// /api/notifier-crm.js — tourne EN PLUS de Brevo, jamais à sa place. Erreur
// avalée en silence côté client : ne doit jamais affecter sent/error ci-dessus.
// `source` distingue l'origine du lead (bilan/contact vs lead magnet PDF) côté CRM.
function notifierCrmInterne(data, source = "site") {
  fetch("/api/notifier-crm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      SITE_WEB: data.SITE_WEB,
      _elapsed: data._elapsed,
      email: data.EMAIL,
      prenom: data.PRENOM,
      telephone: data.SMS,
      message: data.MESSAGE,
      source,
      pageUrl: window.location.href,
    }),
  }).catch(() => {});
}

// Anti-spam : champ piège invisible (SITE_WEB) + durée de remplissage, relus côté
// serveur par api/_antispam.js. Un humain ne remplit jamais le champ caché.
function ChampPiege() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", height: 0, overflow: "hidden" }}>
      <label htmlFor="site-web">Ne pas remplir</label>
      <input id="site-web" name="SITE_WEB" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

function lireFormulaire(e, debut) {
  return { ...Object.fromEntries(new FormData(e.target)), _elapsed: Date.now() - debut };
}

export function FormBilan() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const debut = useRef(Date.now());

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    const data = lireFormulaire(e, debut.current);
    try {
      const ok = await envoyerLead("bilan", data);
      if (ok) {
        notifierCrmInterne(data);
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
      <ChampPiege />
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

export function FormContact({ onSuccess }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const debut = useRef(Date.now());

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    const data = lireFormulaire(e, debut.current);
    try {
      const ok = await envoyerLead("contact", data);
      if (ok) {
        notifierCrmInterne(data);
        setSent(true);
        onSuccess?.(data);
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
      <ChampPiege />
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

// Porte d'entrée email des outils en libre-service : le résultat est déjà affiché
// à l'écran, l'email n'est demandé que pour recevoir le détail et la suite.
export function FormEmailOutil({ source, texteBouton = "Recevoir le détail par email", leadMagnet = false }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const debut = useRef(Date.now());

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    const data = lireFormulaire(e, debut.current);
    try {
      const ok = await inscrire(source, data);
      if (ok) {
        notifierCrmInterne(data, source);
        pushEvent("generate_lead", { lead_source: source });
        if (leadMagnet) pushEvent("lead_magnet_download", { lead_source: source });
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
        <h3>C'est noté</h3>
        <p>Merci. Vous recevrez un email avec le mode d'emploi et les articles associés. Votre résultat reste affiché ci-dessus.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <ChampPiege />
      <div>
        <label htmlFor="o-email">Email</label>
        <input id="o-email" name="EMAIL" type="email" required autoComplete="email" />
      </div>
      <button type="submit" className="btn btn-primary">{texteBouton}</button>
      {error && <p role="alert">L'envoi n'a pas abouti. Réessayez dans un instant.</p>}
      <p className="hint">Votre résultat est déjà affiché ci-dessus. Vos données restent confidentielles ; désinscription possible à tout moment.</p>
    </form>
  );
}

// Formulaire de capture pour un lead magnet PDF (guide téléchargeable).
// Le téléchargement immédiat s'affiche à l'état succès (le visiteur ne repart
// jamais les mains vides) ; l'inscription Brevo déclenche l'email J0 de la
// séquence (voir docs/emails/). `source` : clé de api/subscribe.js.
export function FormLeadMagnet({ pdfUrl, pdfNomFichier, guideTitre, source = "lead_magnet_av" }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const debut = useRef(Date.now());

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    const data = lireFormulaire(e, debut.current);
    try {
      const ok = await inscrire(source, data);
      if (ok) {
        notifierCrmInterne(data, source === "lead_magnet_av" ? "lead_magnet" : source);
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
      <ChampPiege />
      <div>
        <label htmlFor="g-email">Email</label>
        <input id="g-email" name="EMAIL" type="email" required autoComplete="email" />
      </div>
      <button type="submit" className="btn btn-primary">
        Recevoir {guideTitre ? `« ${guideTitre} »` : "le guide"}
      </button>
      {error && (
        <p role="alert">L'envoi n'a pas abouti. Réessayez dans un instant.</p>
      )}
      <p className="hint">Vos données restent confidentielles. Pas de spam.</p>
    </form>
  );
}
