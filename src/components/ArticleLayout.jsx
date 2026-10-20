import { Link } from "react-router-dom";
import { AuthorBox, CtaBanner, RiskNotice } from "./Layout.jsx";
import { articles, cheminArticle } from "../content/articles.js";

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

// Gabarit commun des nouveaux articles (guides et actualités) : réponse en tête,
// dates visibles, FAQ, sources, mention de risque, « à lire ensuite », CTA petit pas.
export default function ArticleLayout({ meta, children }) {
  const lies = articles
    .filter((a) => a.meta.slug !== meta.slug && a.meta.categorie === meta.categorie)
    .slice(0, 3);
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">{meta.type === "actualite" ? "Actualité retraite" : "Guide"}</span>
          <h1>{meta.h1 || meta.title}</h1>
          <p className="sub">
            Publié le {formatDate(meta.datePublication)}
            {meta.dateMiseAJour !== meta.datePublication && (
              <> · Mis à jour le {formatDate(meta.dateMiseAJour)}</>
            )}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> {meta.resume}
            </p>
          </div>
          {children}
          {meta.faq?.length > 0 && (
            <>
              <h2>Questions fréquentes</h2>
              {meta.faq.map((f) => (
                <div key={f.q}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </>
          )}
          {meta.sources?.length > 0 && (
            <>
              <h2>Sources</h2>
              <ul>
                {meta.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
          {lies.length > 0 && (
            <>
              <h2>À lire ensuite</h2>
              <ul>
                {lies.map((a) => (
                  <li key={a.meta.slug}>
                    <Link to={cheminArticle(a.meta)}>{a.meta.h1 || a.meta.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <RiskNotice />
          <AuthorBox />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
