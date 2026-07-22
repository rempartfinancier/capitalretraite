import { Link } from "react-router-dom";
import { FormLeadMagnet } from "../components/Forms.jsx";
import { CtaBanner } from "../components/Layout.jsx";

const PDF_URL = "/guides/grille-audit-assurance-vie.pdf";
const PDF_NOM_FICHIER = "grille-audit-assurance-vie.pdf";

export default function LeadMagnetAuditAssuranceVie() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide gratuit</span>
          <h1>Assurance-vie : la grille d'audit en 20 points</h1>
          <p className="sub">
            Pour savoir en 20 minutes si votre contrat vous coûte cher — avec votre relevé annuel
            en main, sans jargon ni rendez-vous.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Ce que vous allez recevoir</h2>
          <ul>
            <li>
              Les 4 lignes de frais d'une assurance-vie et où les trouver exactement — sur votre
              relevé annuel ou dans le DIC de chaque support.
            </li>
            <li>
              Une checklist notée en 4 blocs : frais du contrat, frais des supports et allocation,
              fiscalité de sortie, protection et clause bénéficiaire.
            </li>
            <li>
              Un barème de référence (seuil « normal » vs « élevé ») sur chaque poste de frais, à
              garder comme fiche de poche.
            </li>
            <li>
              Un score sur 20 signaux avec 3 zones — vert, orange, rouge — pour savoir si un audit
              approfondi s'impose.
            </li>
            <li>
              Les 5 questions à poser mot pour mot à votre conseiller ou à votre banque si le score
              est orange ou rouge.
            </li>
          </ul>
        </div>

        <div className="container" style={{ maxWidth: "560px" }}>
          <h2 style={{ marginTop: "2.5rem" }}>Recevoir le guide</h2>
          <FormLeadMagnet
            pdfUrl={PDF_URL}
            pdfNomFichier={PDF_NOM_FICHIER}
            guideTitre="la grille d'audit assurance-vie"
          />
        </div>
      </section>

      <section className="section section-ivoire">
        <div className="container prose">
          <h2>Questions fréquentes</h2>
          <h3>Ce guide remplace-t-il un rendez-vous avec un conseiller ?</h3>
          <p>
            Non. C'est un auto-diagnostic : un score et des points de vigilance, jamais une
            recommandation d'action. Si votre score est orange ou rouge, l'étape suivante logique
            est un <Link to="/bilan-retraite">bilan retraite gratuit</Link> pour reprendre le
            diagnostic ligne à ligne avec un conseiller.
          </p>
          <h3>Ai-je besoin de connaissances financières pour l'utiliser ?</h3>
          <p>
            Non. Deux documents suffisent — votre relevé de situation annuel et le DIC de chaque
            support en unités de compte — et 20 minutes pour cocher les cases dans l'ordre.
          </p>
          <h3>Vais-je être démarché après le téléchargement ?</h3>
          <p>
            Non. Vos données restent confidentielles et ne servent qu'à vous envoyer le guide —
            pas de spam, pas d'appel commercial.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Score orange ou rouge ? Reprenons ce diagnostic ligne à ligne."
        button="Bilan retraite gratuit (15 min)"
        to="/bilan-retraite"
      />
    </>
  );
}
