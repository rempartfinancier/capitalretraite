import { useState } from "react";
import { FormContact } from "../components/Forms.jsx";
import { IClosedWidget } from "../components/IClosedWidget.jsx";

export default function Contact() {
  const [rdvPret, setRdvPret] = useState(false);

  function handleBookingReady() {
    setRdvPret(true);
    // Le calendrier s'affiche tout en haut de page (cf. plus bas) — on y ramène
    // systématiquement le visiteur, où qu'il ait scrollé pendant la saisie,
    // pour qu'il ne puisse pas le manquer.
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <>
      {rdvPret && (
        <section className="section">
          <div className="container prose">
            <div className="booking-banner" role="status">
              <span className="eyebrow">Message reçu</span>
              <h2>Choisissez votre créneau</h2>
              <p>
                Votre message est bien parti. Si vous préférez fixer l'échange tout de suite
                plutôt que d'attendre notre retour, réservez directement ci-dessous.
              </p>
              <IClosedWidget height={720} />
            </div>
          </div>
        </section>
      )}

      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Parlons de votre retraite</h1>
          <p className="sub">
            Un entretien de 15 minutes pour faire le point — sans engagement, sans jargon.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Écrivez-nous</h2>
          <FormContact onSuccess={handleBookingReady} />
        </div>
      </section>
    </>
  );
}
