import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { getMeta } from "./routes.jsx";
import Layout from "./components/Layout.jsx";

import Home from "./pages/Home.jsx";
import BilanRetraite from "./pages/BilanRetraite.jsx";
import Strategies from "./pages/Strategies.jsx";
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </>
  );
}
