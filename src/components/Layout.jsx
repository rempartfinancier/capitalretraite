import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getMeta } from "../routes.jsx";
import { CALENDLY_URL } from "./config.js";

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Capital Retraite — accueil">
          <span className="brand-name">
            Capital<em>Retraite</em>
          </span>
          <span className="brand-sub">Un service Le Rempart Financier</span>
        </Link>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
        <nav id="main-nav" className={`main-nav${open ? " open" : ""}`} onClick={() => setOpen(false)}>
          <Link to="/strategies">Stratégies</Link>
          <Link to="/guide/combien-faut-il-epargner-pour-la-retraite">Guides</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/bilan-retraite" className="btn btn-primary">
            Bilan retraite gratuit
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Breadcrumb() {
  const { pathname } = useLocation();
  const meta = getMeta(pathname);
  if (!meta.breadcrumb) return null;
  return (
    <nav className="breadcrumb container" aria-label="Fil d'Ariane">
      {meta.breadcrumb.map(([name, href], i) => (
        <span key={href}>
          {i > 0 && <span aria-hidden="true">›</span>}
          {i < meta.breadcrumb.length - 1 ? <Link to={href}>{name}</Link> : <span>{name}</span>}
        </span>
      ))}
    </nav>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="footer-brand">© {year} capitalretraite.com — Un service Le Rempart Financier</p>
        <p>EXP Capital, éditeur — ORIAS 25005915</p>
        <p>Conseil en investissement financier sous Épargne Plurielle, CIF — ORIAS 16003696</p>
        <p className="footer-legal">
          Les informations publiées sur ce site ont un caractère pédagogique général. Elles ne
          constituent pas un conseil personnalisé en investissement. Tout investissement comporte
          des risques, dont la perte partielle ou totale du capital investi.
        </p>
        <div className="footer-links">
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/confidentialite">Confidentialité</Link>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            Prendre RDV
          </a>
        </div>
      </div>
    </footer>
  );
}

export function AuthorBox() {
  return (
    <aside className="author-box" aria-label="À propos de l'auteure">
      <strong>Fabienne</strong> — Conseillère en gestion de patrimoine, EXP Capital.
      <br />
      Formation : EDHEC, finance de marché. Expérience en cabinets de conseil indépendants.
      Conseil en investissement financier délivré sous Épargne Plurielle, CIF — ORIAS 16003696.
    </aside>
  );
}

export function RiskNotice() {
  return (
    <p className="risk-notice">
      Contenu pédagogique général — il ne constitue pas un conseil personnalisé. Tout investissement
      comporte des risques, dont la perte partielle ou totale du capital investi. Les performances
      passées ne préjugent pas des performances futures.
    </p>
  );
}

export function CtaBanner({
  title = "Votre situation est unique. Votre stratégie devrait l'être aussi.",
  button = "Bilan retraite gratuit (15 min)",
  to = "/bilan-retraite",
}) {
  return (
    <section className="section-marine cta-banner">
      <h2>{title}</h2>
      <Link to={to} className="btn btn-light">
        {button}
      </Link>
    </section>
  );
}

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Breadcrumb />
      <main>{children}</main>
      <Footer />
    </>
  );
}
