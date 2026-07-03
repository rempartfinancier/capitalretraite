import { useEffect } from "react";
import { FormContact } from "../components/Forms.jsx";

function IClosedWidget() {
  useEffect(() => {
    if (document.querySelector('script[src="https://app.iclosed.io/assets/widget.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://app.iclosed.io/assets/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="iclosed-widget"
      data-url="https://app.iclosed.io/e/EpargnePlurielleAJ/appel-decouverte-immobilierpassif"
      title="Appel découverte - Capital Retraite"
      style={{ width: "100%", height: "620px" }}
    />
  );
}

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
          <IClosedWidget />

          <h2>Ou écrivez-nous</h2>
          <FormContact />
        </div>
      </section>
    </>
  );
}
