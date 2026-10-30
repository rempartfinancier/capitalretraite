// Registre des articles : un article = UN fichier dans src/content/articles/.
// Chaque fichier exporte `meta` (données SEO/éditoriales) et un composant par défaut
// (le corps de l'article, sans titre ni résumé : ArticleLayout les affiche).
//
// meta : { slug, type: "guide" | "actualite", big5: "prix" | "problemes" | "versus" |
//   "avis" | "meilleurs" | "actu", categorie, title (≤ 70 car.), description (≤ 160 car.),
//   h1, resume (réponse en une phrase), datePublication, dateMiseAJour (AAAA-MM-JJ),
//   faq: [{ q, a }], sources: [{ label, url }], liens: [chemins internes] }

const modules = import.meta.glob("./articles/*.jsx", { eager: true });

export const articles = Object.values(modules)
  .map((m) => ({ meta: m.meta, Composant: m.default }))
  .filter((a) => a.meta)
  .sort((a, b) => b.meta.datePublication.localeCompare(a.meta.datePublication));

export const cheminArticle = (meta) =>
  meta.type === "actualite" ? `/actualites/${meta.slug}` : `/guide/${meta.slug}`;
