import { Link } from "react-router-dom";
import { CtaBanner } from "../components/Layout.jsx";
import { articles, cheminArticle } from "../content/articles.js";

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export default function Actualites() {
  const actus = articles.filter((a) => a.meta.type === "actualite");
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Actualités</span>
          <h1>L'actualité retraite, décryptée</h1>
          <p className="sub">
            Ce qui change, pour qui, et ce que cela ne change pas — chiffres sourcés et datés.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="card-grid">
            {actus.map(({ meta }) => (
              <Link key={meta.slug} to={cheminArticle(meta)} className="card">
                <h3>{meta.h1 || meta.title}</h3>
                <p>{meta.description}</p>
                <span className="card-more">{formatDate(meta.datePublication)} · Lire →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
