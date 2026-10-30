// Garde-fou : aucune trace de la marque personnelle dans ce qui est indexable.
// Échoue si « pollet » ou « rempart » apparaît dans dist/ (hors page mentions
// légales, noindex) ou dans public/. Les mentions internes (api/, docs/, README)
// ne sont pas publiées et ne sont pas contrôlées.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INTERDIT = /pollet|rempart/i;
const EXTENSIONS = /\.(html|xml|txt|json|js|css|svg|webmanifest)$/;
// dist/assets : le bundle JS embarque le texte des mentions légales (page noindex) ;
// le JS n'est pas indexé comme contenu.
const EXCLUS = [path.join("dist", "mentions-legales"), path.join("dist", "assets")];

function* fichiers(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* fichiers(p);
    else if (EXTENSIONS.test(e.name)) yield p;
  }
}

const trouvailles = [];
for (const base of ["dist", "public"]) {
  for (const f of fichiers(path.join(root, base))) {
    const rel = path.relative(root, f);
    if (EXCLUS.some((x) => rel.startsWith(x))) continue;
    const m = fs.readFileSync(f, "utf-8").match(INTERDIT);
    if (m) trouvailles.push(`${rel} → « ${m[0]} »`);
  }
}

if (trouvailles.length) {
  console.error("✗ Marque personnelle détectée dans des fichiers publics :");
  trouvailles.forEach((t) => console.error("  - " + t));
  process.exit(1);
}
console.log("✓ check-marque : aucune trace de la marque personnelle dans dist/ et public/.");
