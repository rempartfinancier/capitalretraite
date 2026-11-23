import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { getMeta } from "./routes.jsx";
import Layout from "./components/Layout.jsx";

import Home from "./pages/Home.jsx";
import BilanRetraite from "./pages/BilanRetraite.jsx";
import LeadMagnetAuditAssuranceVie from "./pages/LeadMagnetAuditAssuranceVie.jsx";
import SimulateurRetraite from "./pages/SimulateurRetraite.jsx";
import Strategies from "./pages/Strategies.jsx";
import Guides from "./pages/Guides.jsx";
import StrategiePer from "./pages/StrategiePer.jsx";
import StrategieAssuranceVie from "./pages/StrategieAssuranceVie.jsx";
import StrategiePea from "./pages/StrategiePea.jsx";
import StrategieDecumulation from "./pages/StrategieDecumulation.jsx";
import StrategieImmobilier from "./pages/StrategieImmobilier.jsx";
import GuideCombienEpargner from "./pages/GuideCombienEpargner.jsx";
import GuidePerVsAv from "./pages/GuidePerVsAv.jsx";
import GuideFiscaliteSortiePer from "./pages/GuideFiscaliteSortiePer.jsx";
import GuideAgeCommencerPer from "./pages/GuideAgeCommencerPer.jsx";
import GuideDeblocageAnticipePer from "./pages/GuideDeblocageAnticipePer.jsx";
import GuideAvRapportePeu from "./pages/GuideAvRapportePeu.jsx";
import GuidePerBancaire from "./pages/GuidePerBancaire.jsx";
import GuidePeaBanqueCourtier from "./pages/GuidePeaBanqueCourtier.jsx";
import GuideMeilleureEnveloppe from "./pages/GuideMeilleureEnveloppe.jsx";
import GuideFautIlOuvrirPer from "./pages/GuideFautIlOuvrirPer.jsx";
import GuidePeaOuPer from "./pages/GuidePeaOuPer.jsx";
import GuidePeaOuAv from "./pages/GuidePeaOuAv.jsx";
import GuideInconvenientsPea from "./pages/GuideInconvenientsPea.jsx";
import GuideRisquesAv from "./pages/GuideRisquesAv.jsx";
import GuideCoutAssuranceVie from "./pages/GuideCoutAssuranceVie.jsx";
import GuideCoutConseiller from "./pages/GuideCoutConseiller.jsx";
import GuideMeilleurPer from "./pages/GuideMeilleurPer.jsx";
import GuideEtfOuFondsActifs from "./pages/GuideEtfOuFondsActifs.jsx";
import GuideLmnpRisques from "./pages/GuideLmnpRisques.jsx";
import GuideLmnpOuLocatifNu from "./pages/GuideLmnpOuLocatifNu.jsx";
import GuideCoutInvestissementLocatif from "./pages/GuideCoutInvestissementLocatif.jsx";
import GuideCinqErreursLocatif from "./pages/GuideCinqErreursLocatif.jsx";
import GuideImmobilierOuAv from "./pages/GuideImmobilierOuAv.jsx";
import GuidePerOuImmobilier from "./pages/GuidePerOuImmobilier.jsx";
import GuideCoutPer from "./pages/GuideCoutPer.jsx";
import GuidePlafondPerVersement2026 from "./pages/GuidePlafondPerVersement2026.jsx";
import GuideAgircArrcoCadres from "./pages/GuideAgircArrcoCadres.jsx";
import GuideInconvenientsRenteViagere from "./pages/GuideInconvenientsRenteViagere.jsx";
import GuideRenteOuRetraitsProgrammes from "./pages/GuideRenteOuRetraitsProgrammes.jsx";
import GuideOrdreDecaissement from "./pages/GuideOrdreDecaissement.jsx";
import GuideMeilleureAssuranceVie from "./pages/GuideMeilleureAssuranceVie.jsx";
import GuideIndependantsPerMadelin from "./pages/GuideIndependantsPerMadelin.jsx";
import GuideCoutRachatTrimestres from "./pages/GuideCoutRachatTrimestres.jsx";
import GuideCumulEmploiRetraite from "./pages/GuideCumulEmploiRetraite.jsx";
import GuideSurcoteDecote from "./pages/GuideSurcoteDecote.jsx";
import GuideVerifierReleveCarriere from "./pages/GuideVerifierReleveCarriere.jsx";
import GuideGestionPiloteeOuLibre from "./pages/GuideGestionPiloteeOuLibre.jsx";
import GuideConseillerOuSeul from "./pages/GuideConseillerOuSeul.jsx";
import GuideAssuranceVieLuxembourgeoise from "./pages/GuideAssuranceVieLuxembourgeoise.jsx";
import GuideDonationOuAssuranceVie from "./pages/GuideDonationOuAssuranceVie.jsx";
import GuideRetraiteFonctionnaires from "./pages/GuideRetraiteFonctionnaires.jsx";
import GuideRachatPartielAssuranceVie from "./pages/GuideRachatPartielAssuranceVie.jsx";
import GuideRetraiteProgressiveOuCumul from "./pages/GuideRetraiteProgressiveOuCumul.jsx";
import GuideCombienRetirerCapital from "./pages/GuideCombienRetirerCapital.jsx";
import GuideCapitalCompleterPension from "./pages/GuideCapitalCompleterPension.jsx";
import GuideRenteViagereCalcul from "./pages/GuideRenteViagereCalcul.jsx";
import GuideFiscaliteRenteViagere from "./pages/GuideFiscaliteRenteViagere.jsx";
import GuideRachatsProgrammesAv from "./pages/GuideRachatsProgrammesAv.jsx";
import GuideRecupererCapitalRetraite from "./pages/GuideRecupererCapitalRetraite.jsx";
import GuideCapitalRetraite from "./pages/GuideCapitalRetraite.jsx";
import GuideAvApres8Ans from "./pages/GuideAvApres8Ans.jsx";
import GuidePeaEnLigne from "./pages/GuidePeaEnLigne.jsx";
import GuideEpargneMensuelleSelonAge from "./pages/GuideEpargneMensuelleSelonAge.jsx";
import GuidePerOuAvSelonAgeTmi from "./pages/GuidePerOuAvSelonAgeTmi.jsx";
import GuideScpiRetraite from "./pages/GuideScpiRetraite.jsx";
import GuideScpiCreditOuComptant from "./pages/GuideScpiCreditOuComptant.jsx";
import GuideScpiAssuranceVieOuPer from "./pages/GuideScpiAssuranceVieOuPer.jsx";
import GuideScpiFiscalite from "./pages/GuideScpiFiscalite.jsx";
import GuideLmnpResidenceGeree from "./pages/GuideLmnpResidenceGeree.jsx";
import GuideLmnpReforme from "./pages/GuideLmnpReforme.jsx";
import GuideDemembrementRetraite from "./pages/GuideDemembrementRetraite.jsx";
import GuideImmobilierALaRetraite from "./pages/GuideImmobilierALaRetraite.jsx";
import GuideEstimerPensionRetraite from "./pages/GuideEstimerPensionRetraite.jsx";
import GuideAgeDepartTrimestres from "./pages/GuideAgeDepartTrimestres.jsx";
import GuidePreparerRetraite40Ans from "./pages/GuidePreparerRetraite40Ans.jsx";
import GuidePreparerRetraite50Ans from "./pages/GuidePreparerRetraite50Ans.jsx";
import GuideAvFondsEurosUc55Ans from "./pages/GuideAvFondsEurosUc55Ans.jsx";
import GuideCompleterRetraiteSansPer from "./pages/GuideCompleterRetraiteSansPer.jsx";
import GuideRetraiteCoupleTransmission from "./pages/GuideRetraiteCoupleTransmission.jsx";
import GuideRetraiteCadreOuFonctionnaire from "./pages/GuideRetraiteCadreOuFonctionnaire.jsx";
import GuidePilierPreparerRetraite from "./pages/GuidePilierPreparerRetraite.jsx";
import GuidePilierImmobilierRetraite from "./pages/GuidePilierImmobilierRetraite.jsx";
import Contact from "./pages/Contact.jsx";
import MentionsLegales from "./pages/MentionsLegales.jsx";
import Confidentialite from "./pages/Confidentialite.jsx";

// Met à jour <title> et meta description lors des navigations client (SPA).
// Au premier chargement, le HTML prerendu contient déjà les bonnes balises.
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = getMeta(pathname);
    document.title = meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", meta.description);
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bilan-retraite" element={<BilanRetraite />} />
          <Route path="/guide-audit-assurance-vie" element={<LeadMagnetAuditAssuranceVie />} />
          <Route path="/simulateur-retraite" element={<SimulateurRetraite />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/strategies/per" element={<StrategiePer />} />
          <Route path="/strategies/assurance-vie-retraite" element={<StrategieAssuranceVie />} />
          <Route path="/strategies/pea-retraite" element={<StrategiePea />} />
          <Route path="/strategies/decumulation" element={<StrategieDecumulation />} />
          <Route path="/strategies/immobilier-retraite" element={<StrategieImmobilier />} />
          <Route path="/guide/combien-faut-il-epargner-pour-la-retraite" element={<GuideCombienEpargner />} />
          <Route path="/guide/per-vs-assurance-vie-retraite" element={<GuidePerVsAv />} />
          <Route path="/guide/fiscalite-sortie-per" element={<GuideFiscaliteSortiePer />} />
          <Route path="/guide/a-quel-age-commencer-per" element={<GuideAgeCommencerPer />} />
          <Route path="/guide/deblocage-anticipe-per" element={<GuideDeblocageAnticipePer />} />
          <Route path="/guide/pourquoi-votre-assurance-vie-rapporte-peu" element={<GuideAvRapportePeu />} />
          <Route path="/guide/per-bancaire-frais-gestion-horizon" element={<GuidePerBancaire />} />
          <Route path="/guide/pea-banque-ou-courtier" element={<GuidePeaBanqueCourtier />} />
          <Route path="/guide/meilleure-enveloppe-retraite" element={<GuideMeilleureEnveloppe />} />
          <Route path="/guide/faut-il-ouvrir-un-per" element={<GuideFautIlOuvrirPer />} />
          <Route path="/guide/pea-ou-per-pour-la-retraite" element={<GuidePeaOuPer />} />
          <Route path="/guide/pea-ou-assurance-vie" element={<GuidePeaOuAv />} />
          <Route path="/guide/inconvenients-du-pea" element={<GuideInconvenientsPea />} />
          <Route path="/guide/risques-assurance-vie" element={<GuideRisquesAv />} />
          <Route path="/guide/combien-coute-une-assurance-vie" element={<GuideCoutAssuranceVie />} />
          <Route path="/guide/combien-coute-un-conseiller-en-gestion-de-patrimoine" element={<GuideCoutConseiller />} />
          <Route path="/guide/quel-est-le-meilleur-per" element={<GuideMeilleurPer />} />
          <Route path="/guide/etf-ou-fonds-actifs" element={<GuideEtfOuFondsActifs />} />
          <Route path="/guide/lmnp-risques" element={<GuideLmnpRisques />} />
          <Route path="/guide/lmnp-ou-locatif-nu" element={<GuideLmnpOuLocatifNu />} />
          <Route path="/guide/combien-coute-un-investissement-locatif" element={<GuideCoutInvestissementLocatif />} />
          <Route path="/guide/cinq-erreurs-investissement-locatif-retraite" element={<GuideCinqErreursLocatif />} />
          <Route path="/guide/immobilier-locatif-ou-assurance-vie" element={<GuideImmobilierOuAv />} />
          <Route path="/guide/per-ou-immobilier-locatif" element={<GuidePerOuImmobilier />} />
          <Route path="/guide/combien-coute-un-per" element={<GuideCoutPer />} />
          <Route path="/guide/inconvenients-rente-viagere" element={<GuideInconvenientsRenteViagere />} />
          <Route path="/guide/rente-viagere-ou-retraits-programmes" element={<GuideRenteOuRetraitsProgrammes />} />
          <Route path="/guide/ordre-de-decaissement-retraite" element={<GuideOrdreDecaissement />} />
          <Route path="/guide/meilleure-assurance-vie-retraite" element={<GuideMeilleureAssuranceVie />} />
          <Route path="/guide/retraite-independants-per-ou-madelin" element={<GuideIndependantsPerMadelin />} />
          <Route path="/guide/combien-coute-rachat-trimestres-retraite" element={<GuideCoutRachatTrimestres />} />
          <Route path="/guide/cumul-emploi-retraite-comment-ca-marche" element={<GuideCumulEmploiRetraite />} />
          <Route path="/guide/surcote-decote-retraite" element={<GuideSurcoteDecote />} />
          <Route path="/guide/verifier-releve-de-carriere-retraite" element={<GuideVerifierReleveCarriere />} />
          <Route path="/guide/gestion-pilotee-ou-gestion-libre" element={<GuideGestionPiloteeOuLibre />} />
          <Route path="/guide/conseiller-ou-gerer-seul-sa-retraite" element={<GuideConseillerOuSeul />} />
          <Route path="/guide/assurance-vie-luxembourgeoise" element={<GuideAssuranceVieLuxembourgeoise />} />
          <Route path="/guide/donation-ou-assurance-vie-transmission" element={<GuideDonationOuAssuranceVie />} />
          <Route path="/guide/retraite-fonctionnaires-completer" element={<GuideRetraiteFonctionnaires />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route
            path="/guide/plafond-per-versement-avant-31-decembre-2026"
            element={<GuidePlafondPerVersement2026 />}
          />
          <Route
            path="/guide/retraite-complementaire-agirc-arrco-cadres-calcul"
            element={<GuideAgircArrcoCadres />}
          />
          <Route
            path="/guide/rachat-partiel-assurance-vie-imposition"
            element={<GuideRachatPartielAssuranceVie />}
          />
          <Route
            path="/guide/retraite-progressive-ou-cumul-emploi-retraite"
            element={<GuideRetraiteProgressiveOuCumul />}
          />
          <Route path="/guide/combien-retirer-par-mois-capital-retraite" element={<GuideCombienRetirerCapital />} />
          <Route path="/guide/capital-necessaire-completer-pension-retraite-65-ans" element={<GuideCapitalCompleterPension />} />
          <Route path="/guide/rente-viagere-calcul-montant-taux-de-conversion" element={<GuideRenteViagereCalcul />} />
          <Route path="/guide/fiscalite-rente-viagere-titre-onereux" element={<GuideFiscaliteRenteViagere />} />
          <Route path="/guide/rachats-programmes-assurance-vie-retraite" element={<GuideRachatsProgrammesAv />} />
          <Route path="/guide/a-quel-age-recuperer-son-capital-retraite" element={<GuideRecupererCapitalRetraite />} />
          <Route path="/guide/per-ou-assurance-vie-selon-age-et-tmi" element={<GuidePerOuAvSelonAgeTmi />} />
          <Route path="/guide/combien-epargner-par-mois-pour-la-retraite-selon-age" element={<GuideEpargneMensuelleSelonAge />} />
          <Route path="/guide/pea-en-ligne-comment-choisir-pour-la-retraite" element={<GuidePeaEnLigne />} />
          <Route path="/guide/assurance-vie-apres-8-ans-fiscalite-et-rente" element={<GuideAvApres8Ans />} />
          <Route path="/guide/capital-retraite-objectif-et-construction" element={<GuideCapitalRetraite />} />
          <Route path="/guide/scpi-preparer-sa-retraite" element={<GuideScpiRetraite />} />
          <Route path="/guide/scpi-a-credit-ou-comptant" element={<GuideScpiCreditOuComptant />} />
          <Route path="/guide/scpi-assurance-vie-ou-per" element={<GuideScpiAssuranceVieOuPer />} />
          <Route path="/guide/scpi-fiscalite-revenus-plus-values" element={<GuideScpiFiscalite />} />
          <Route path="/guide/lmnp-residence-geree-retraite" element={<GuideLmnpResidenceGeree />} />
          <Route path="/guide/lmnp-reforme-amortissement-plus-value" element={<GuideLmnpReforme />} />
          <Route path="/guide/demembrement-nue-propriete-retraite" element={<GuideDemembrementRetraite />} />
          <Route path="/guide/immobilier-a-la-retraite-revenus-transmission" element={<GuideImmobilierALaRetraite />} />
          <Route path="/guide/estimer-sa-pension-retraite-taux-de-remplacement" element={<GuideEstimerPensionRetraite />} />
          <Route path="/guide/age-de-depart-retraite-trimestres-duree-assurance" element={<GuideAgeDepartTrimestres />} />
          <Route path="/guide/preparer-sa-retraite-a-40-ans" element={<GuidePreparerRetraite40Ans />} />
          <Route path="/guide/preparer-sa-retraite-a-50-ans" element={<GuidePreparerRetraite50Ans />} />
          <Route path="/guide/assurance-vie-fonds-euros-ou-uc-a-55-ans" element={<GuideAvFondsEurosUc55Ans />} />
          <Route path="/guide/completer-sa-retraite-sans-per" element={<GuideCompleterRetraiteSansPer />} />
          <Route path="/guide/epargne-retraite-en-couple-et-transmission" element={<GuideRetraiteCoupleTransmission />} />
          <Route path="/guide/retraite-cadre-ou-fonctionnaire-comparaison" element={<GuideRetraiteCadreOuFonctionnaire />} />
          <Route path="/guide/preparer-sa-retraite-guide-complet" element={<GuidePilierPreparerRetraite />} />
          <Route path="/guide/immobilier-et-retraite-guide-complet" element={<GuidePilierImmobilierRetraite />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </>
  );
}
