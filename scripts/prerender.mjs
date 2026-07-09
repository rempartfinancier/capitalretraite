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
  name: "Capital Retraite — Le Rempart Financier",
  url: SITE_URL,
  sameAs: ["https://rempartfinancier.fr"],
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
  const jsonld = meta.path === "/" ? orgJsonLd : breadcrumbJsonLd(meta.breadcrumb);
  return [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${meta.description.replace(/"/g, "&quot;")}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${meta.title.replace(/"/g, "&quot;")}" />`,
    `<meta property="og:description" content="${meta.description.replace(/"/g, "&quot;")}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="fr_FR" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>`,
  ].join("\n    ");
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

// 404 : copie de la home rendue côté client (Hostinger sert 404.html si configuré)
fs.copyFileSync(path.join(dist, "index.html"), path.join(dist, "404.html"));

console.log(`\nPrerendering terminé : ${ok}/${routesMeta.length} pages générées.`);
console.log("Vérifiez : `grep -L 'app-html' dist/**/index.html` ne doit rien lister de vide.");
