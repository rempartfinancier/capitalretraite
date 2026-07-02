import { FormContact } from "../components/Forms.jsx";
import { CALENDLY_URL } from "../components/config.js";

export default function Contact() {
  return (
    <>
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
          <h2>Réserver un créneau</h2>
          {/*
            PLACEHOLDER CALENDLY — remplacer par le widget officiel une fois l'URL connue :
            <div className="calendly-inline-widget" data-url={CALENDLY_URL} style={{ minWidth: "320px", height: "700px" }} />
            + <script src="https://assets.calendly.com/assets/external/widget.js" async />
          */}
          <div className="calendly-placeholder">
            <p>Le calendrier de réservation s'affichera ici.</p>
            <p style={{ marginTop: "0.8rem" }}>
              <a className="btn btn-primary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Ouvrir le calendrier de rendez-vous
              </a>
            </p>
          </div>

          <h2>Ou écrivez-nous</h2>
          <FormContact />
        </div>
      </section>
    </>
  );
}
