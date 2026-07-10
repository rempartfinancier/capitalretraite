import { useEffect } from "react";

const SCRIPT_SRC = "https://app.iclosed.io/assets/widget.js";
// NOTE : slug non vérifié — voir README / rapport de mission pour le contexte.
// "appel-decouverte-capitalretraite" suit la convention du groupe (finance-halal,
// immobilierpassif, chef-entreprise) mais n'a pas été confirmé côté compte iClosed.
const WIDGET_URL = "https://app.iclosed.io/e/EpargnePlurielleAJ/appel-decouverte-capitalretraite";

export function IClosedWidget({ height = 720 }) {
  useEffect(() => {
    // Charge le script iClosed une seule fois.
    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      document.body.appendChild(s);
    } else {
      // Re-déclenche l'hydratation du widget si le script est déjà chargé
      // (navigation SPA vers une page qui l'affiche à nouveau).
      const w = window;
      if (w.iClosed?.reload) {
        try {
          w.iClosed.reload();
        } catch {
          /* noop */
        }
      }
    }
  }, []);

  return (
    <div
      className="iclosed-widget"
      data-url={WIDGET_URL}
      title="Appel découverte — Capital Retraite"
      style={{ width: "100%", height: `${height}px` }}
    />
  );
}
