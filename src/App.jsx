import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { getMeta } from "./routes.jsx";
import Layout from "./components/Layout.jsx";

import Home from "./pages/Home.jsx";
import BilanRetraite from "./pages/BilanRetraite.jsx";
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
import GuideInconvenientsRenteViagere from "./pages/GuideInconvenientsRenteViagere.jsx";
import GuideRenteOuRetraitsProgrammes from "./pages/GuideRenteOuRetraitsProgrammes.jsx";
import GuideOrdreDecaissement from "./pages/GuideOrdreDecaissement.jsx";
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </>
  );
}
