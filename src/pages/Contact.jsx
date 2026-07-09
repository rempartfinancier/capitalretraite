import { FormContact } from "../components/Forms.jsx";

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
          <h2>Écrivez-nous</h2>
          <FormContact />
        </div>
      </section>
    </>
  );
}
