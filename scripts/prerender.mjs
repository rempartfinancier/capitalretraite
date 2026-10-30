// Prerendering SSG — génère un fichier HTML statique par route.
// Exécuté après `vite build` (client) + `vite build --ssr` (serveur).
// Vérification : le HTML produit dans dist/ contient le contenu rendu,
// pas un <div id="root"> vide.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

const { render, routesMeta, SITE_URL } = await import(
  path.join(root, "dist-server", "entry-server.js")
);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Capital Retraite",
  url: SITE_URL,
};

function breadcrumbJsonLd(breadcrumb) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumb.map(([name, href], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: SITE_URL + (href === "/" ? "/" : href),
    })),
  };
}

function buildHead(meta) {
  const canonical = SITE_URL + (meta.path === "/" ? "/" : meta.path);
  const jsonlds = [
    meta.path === "/" ? orgJsonLd : breadcrumbJsonLd(meta.breadcrumb),
    ...(meta.jsonld || []),
  ];
  return [
    meta.noindex ? `<meta name="robots" content="noindex, follow" />` : null,
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${meta.description.replace(/"/g, "&quot;")}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${meta.title.replace(/"/g, "&quot;")}" />`,
    `<meta property="og:description" content="${meta.description.replace(/"/g, "&quot;")}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:type" content="${meta.article ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="Capital Retraite" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta property="og:locale" content="fr_FR" />`,
    ...jsonlds.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`),
  ].filter(Boolean).join("\n    ");
}

let ok = 0;
for (const meta of routesMeta) {
  const appHtml = render(meta.path);
  if (!appHtml || appHtml.length < 200) {
    console.error(`✗ Rendu suspect (vide ?) pour ${meta.path}`);
    process.exitCode = 1;
    continue;
  }
  const html = template
    .replace("<!--app-head-->", buildHead(meta))
    .replace("<!--app-html-->", appHtml);

  const outDir = meta.path === "/" ? dist : path.join(dist, meta.path.slice(1));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
  ok++;
  console.log(`✓ ${meta.path} → ${path.relative(root, path.join(outDir, "index.html"))}`);
}

// Sitemap généré depuis routesMeta (pages noindex exclues), avec lastmod si connu.
const today = new Date().toISOString().slice(0, 10);
const urls = routesMeta
  .filter((m) => !m.noindex)
  .map((m) => {
    const loc = SITE_URL + (m.path === "/" ? "/" : m.path);
    const prio = m.path === "/" ? "1.0" : m.path === "/confidentialite" ? "0.3" : "0.7";
    return `  <url><loc>${loc}</loc><lastmod>${m.lastmod || today}</lastmod><priority>${prio}</priority></url>`;
  });
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
);

// Flux RSS des articles (les plus récents d'abord).
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const items = routesMeta
  .filter((m) => m.article)
  .sort((a, b) => b.datePublication.localeCompare(a.datePublication))
  .slice(0, 30)
  .map(
    (m) =>
      `    <item><title>${esc(m.h1)}</title><link>${SITE_URL}${m.path}</link><guid>${SITE_URL}${m.path}</guid><pubDate>${new Date(m.datePublication + "T12:00:00Z").toUTCString()}</pubDate><description>${esc(m.description)}</description></item>`
  );
fs.writeFileSync(
  path.join(dist, "feed.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Capital Retraite</title><link>${SITE_URL}</link><description>Guides et actualités retraite</description><language>fr-FR</language>\n${items.join("\n")}\n</channel></rss>\n`
);

// 404 : copie de la home rendue côté client (Hostinger sert 404.html si configuré)
fs.copyFileSync(path.join(dist, "index.html"), path.join(dist, "404.html"));

console.log(`\nPrerendering terminé : ${ok}/${routesMeta.length} pages générées.`);
console.log("Vérifiez : `grep -L 'app-html' dist/**/index.html` ne doit rien lister de vide.");
