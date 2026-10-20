// « Petit pas » proposé avant le bilan : l'outil ou le lead magnet le plus proche
// du thème de l'article. Chemins vérifiés par src/lib/outils/petitsPas.test.js.
export const PETITS_PAS = {
  frais: {
    title: "Combien vos frais vous coûtent-ils vraiment ? Estimez-le en une minute.",
    button: "Calculer l'effet de mes frais",
    to: "/outils/frais-per-assurance-vie",
  },
  trimestres: {
    title: "Quel effet aurait votre âge de départ sur votre pension de base ?",
    button: "Estimer décote et surcote",
    to: "/outils/decote-surcote-trimestres",
  },
  checklist: {
    title: "Où en êtes-vous à l'approche de la retraite ? Faites le point point par point.",
    button: "Parcourir la checklist (gratuite)",
    to: "/checklist-retraite-5-ans",
  },
};

// Choix selon la catégorie, le slug ou le titre de l'article (texte libre).
export function petitPasPour(meta = {}) {
  const t = `${meta.categorie || ""} ${meta.slug || ""} ${meta.title || ""}`.toLowerCase();
  if (/trimestre|décote|decote|surcote|carrière|carriere|pension|âge légal|age legal/.test(t)) return PETITS_PAS.trimestres;
  if (/frais|coût|cout|prix|per\b|assurance-vie|assurance vie|pea\b|enveloppe/.test(t)) return PETITS_PAS.frais;
  return PETITS_PAS.checklist;
}
