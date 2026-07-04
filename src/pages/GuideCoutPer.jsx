import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  FRAIS_TYPES,
  FISCALITE,
  HYPOTHESES_MAJ,
  SIMU_DEFAUTS,
  euros,
  pct,
} from "../components/hypotheses.js";

// Moyenne d'une fourchette { min, max } de hypotheses.js.
const moy = (fourchette) => (fourchette.min + fourchette.max) / 2;

// Total annuel « tout compris » (frais de gestion + frais des supports +
// surcoût de gestion pilotée), milieu de fourchette — recalculé
// automatiquement depuis hypotheses.js, jamais écrit en dur.
const totalBancairePilote =
  moy(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle) +
  moy(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports) +
  moy(FRAIS_TYPES.gestionPiloteeSurcout);
const totalInternetEtf =
  moy(FRAIS_TYPES.contratInternet.gestionAnnuelle) +
  moy(FRAIS_TYPES.contratInternet.fraisSupports);

// Exemple illustratif unique du coût cumulé des frais, à hors performance :
// simule uniquement le montant prélevé par les frais annuels sur un
// versement mensuel constant, hors tout effet de rendement des marchés
// (qui viendrait s'ajouter ou se retrancher par ailleurs). Paramètres de
// durée et de versement issus de SIMU_DEFAUTS, jamais écrits en dur.
function fraisCumulesIllustratifs(tauxFraisAnnuel) {
  const versementAnnuel = SIMU_DEFAUTS.versementMensuel * 12;
  let encours = 0;
  let fraisCumules = 0;
  for (let annee = 0; annee < SIMU_DEFAUTS.dureeAnnees; annee += 1) {
    encours += versementAnnuel;
    const fraisAnnee = encours * (tauxFraisAnnuel / 100);
    fraisCumules += fraisAnnee;
    encours -= fraisAnnee;
  }
  return fraisCumules;
}

const fraisCumulesBancaire = fraisCumulesIllustratifs(totalBancairePilote);
const fraisCumulesInternet = fraisCumulesIllustratifs(totalInternetEtf);

export default function GuideCoutPer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide prix</span>
          <h1>Combien coûte un PER, vraiment ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> un PER coûte, tout compris (frais de gestion annuels,
              frais des supports et, le cas échéant, surcoût de gestion pilotée), de l'ordre de{" "}
              {pct(totalInternetEtf)} à {pct(totalBancairePilote)} par an selon le type de contrat
              et le mode de gestion — auxquels s'ajoutent des frais sur versement et des frais
              d'arbitrage variables selon le distributeur. Ce coût annuel, cumulé sur les dix,
              vingt ou trente ans que dure un PER, mérite au moins autant d'attention que la
              déduction fiscale obtenue à l'entrée.
            </p>
          </div>

          <p>
            La déduction fiscale à l'entrée occupe toute la place dans les discours sur le PER
            (Plan Épargne Retraite) : elle est visible, immédiate, facile à chiffrer sur un avis
            d'imposition. Ce qui l'est beaucoup moins, c'est ce que le contenant coûte chaque
            année, pendant les dix, vingt ou trente ans qui séparent l'ouverture du plan de son
            déblocage. Notre analyse : les deux se jugent séparément, et le second point mérite
            autant d'attention que le premier. Cet article ne revient pas sur le fonctionnement
            complet du PER, déjà traité sur <a href="/strategies/per">notre page dédiée</a> : il
            pose la seule grille de prix, poste par poste, chiffres à l'appui.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#entree">1. Les frais sur versement</a></li>
              <li><a href="#gestion">2. Les frais de gestion annuels du contrat</a></li>
              <li><a href="#supports">3. Les frais des supports</a></li>
              <li><a href="#arbitrage">4. Les frais d'arbitrage</a></li>
              <li><a href="#pilotee">5. Le surcoût de la gestion pilotée à horizon</a></li>
              <li><a href="#tableau">La grille récapitulative</a></li>
              <li><a href="#cumul">Le cumul : ce que ça change sur la durée</a></li>
              <li><a href="#checklist">Check-list : retrouver les frais réels de son PER</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
            </ol>
          </div>

          <h2 id="entree">1. Les frais sur versement</h2>
          <p>
            C'est le premier prélèvement, retenu sur chaque versement avant même qu'il ne soit
            investi. Dans les réseaux bancaires traditionnels, il se situe en ordre de grandeur
            entre {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.min)} et{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.max)} du montant versé (données{" "}
            {HYPOTHESES_MAJ}, à vérifier contrat par contrat) ; sur les contrats distribués en
            ligne, il est le plus souvent nul. Sur un versement programmé pendant vingt ou trente
            ans, ce premier étage — souvent négociable en agence, à condition de le demander — se
            paie une fois par euro versé, alors que les postes suivants se paient chaque année sur
            l'encours total.
          </p>

          <h2 id="gestion">2. Les frais de gestion annuels du contrat</h2>
          <p>
            Prélevés chaque année par l'assureur ou le teneur de compte sur l'encours total du
            plan — qu'il progresse, stagne ou recule. En réseau bancaire traditionnel, l'ordre de
            grandeur constaté est de{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)} par an ; sur un
            contrat internet, il descend à{" "}
            {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.min)} à{" "}
            {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.max)} (grilles tarifaires{" "}
            {HYPOTHESES_MAJ}, à vérifier). Sur un PER, l'écart pèse plus longtemps qu'ailleurs :
            l'enveloppe est bloquée jusqu'à la retraite, donc ce poste se paie sur l'intégralité de
            l'horizon de détention, sans possibilité de sortir plus tôt pour y échapper.
          </p>

          <h2 id="supports">3. Les frais des supports</h2>
          <p>
            Cet étage ne figure jamais dans la grille tarifaire du contrat, mais dans le{" "}
            <a href="https://www.amf-france.org/fr/espace-epargnants/comprendre-les-produits-financiers/document-dinformations-cles-dic" target="_blank" rel="noopener noreferrer">
              DIC (document d'informations clés)
            </a>
            , la fiche standardisée européenne de deux ou trois pages
            que chaque fonds doit publier — cherchez la ligne « frais courants ». Un fonds
            « maison » classique, proposé par la société de gestion du même groupe que
            l'établissement distributeur, facture en ordre de grandeur{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)} par an. Un ETF (un
            fonds coté en bourse qui réplique un indice plutôt que de tenter de le battre) facture
            un travail comparable pour {pct(FRAIS_TYPES.etf.fraisCourants.min)} à{" "}
            {pct(FRAIS_TYPES.etf.fraisCourants.max)}. L'écart ne se lit nulle part dans la
            documentation commerciale du plan : il faut ouvrir le DIC de chaque support détenu, un
            par un.
          </p>

          <h2 id="arbitrage">4. Les frais d'arbitrage</h2>
          <p>
            L'arbitrage, c'est le fait de déplacer une partie de l'épargne d'un support vers un
            autre à l'intérieur du même plan, sans rachat ni fiscalité au passage. En réseau
            bancaire traditionnel, ce mouvement coûte encore parfois de{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.arbitrage.min)} à{" "}
            {pct(FRAIS_TYPES.contratBancaireTraditionnel.arbitrage.max)} du montant déplacé ; en
            ligne, il est le plus souvent gratuit et illimité. Sur un plan bloqué plusieurs
            décennies, un frais d'arbitrage même modeste dissuade de rééquilibrer au bon moment —
            un frein comportemental autant que financier, alors que la désensibilisation
            progressive vers des supports plus prudents à l'approche de la retraite est, par
            construction, l'un des mouvements les plus fréquents d'un PER.
          </p>

          <h2 id="pilotee">5. Le surcoût de la gestion pilotée à horizon</h2>
          <p>
            Sauf choix contraire, la réglementation prévoit qu'un PER est investi par défaut en
            gestion pilotée à horizon : une allocation automatique qui se désensibilise
            progressivement vers des supports prudents à mesure que la retraite approche. Ce mode
            de gestion ajoute son propre surcoût de mandat, de l'ordre de{" "}
            {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)}{" "}
            par an (données {HYPOTHESES_MAJ}, à vérifier), en plus des frais des fonds de la ligne
            3 — il s'ajoute à la grille, il ne la remplace pas. Nous ne reprenons pas ici l'analyse
            de fond sur la rigidité de ce mode de gestion et sa pertinence à l'approche de la
            retraite : elle est développée dans{" "}
            <a href="/guide/per-bancaire-frais-gestion-horizon">
              notre article sur le PER bancaire, la gestion pilotée et les frais
            </a>
            .
          </p>

          <h2 id="tableau">La grille récapitulative</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Poste de frais</th>
                  <th>Réseau traditionnel</th>
                  <th>Contrat en ligne (ETF)</th>
                  <th>Où le vérifier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frais sur versement</td>
                  <td>
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.entree.max)} (souvent négociables)
                  </td>
                  <td>{pct(FRAIS_TYPES.contratInternet.entree.max)}</td>
                  <td>Conditions générales, bulletin de versement</td>
                </tr>
                <tr>
                  <td>Frais de gestion annuels du contrat</td>
                  <td>
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.gestionAnnuelle.max)}
                  </td>
                  <td>
                    {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.min)} à{" "}
                    {pct(FRAIS_TYPES.contratInternet.gestionAnnuelle.max)}
                  </td>
                  <td>Grille tarifaire du contrat, relevé annuel</td>
                </tr>
                <tr>
                  <td>Frais des supports (fonds / ETF)</td>
                  <td>
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.fraisSupports.max)}
                  </td>
                  <td>
                    {pct(FRAIS_TYPES.etf.fraisCourants.min)} à {pct(FRAIS_TYPES.etf.fraisCourants.max)}
                  </td>
                  <td>DIC de chaque fonds, ligne « frais courants »</td>
                </tr>
                <tr>
                  <td>Frais d'arbitrage (par mouvement)</td>
                  <td>
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.arbitrage.min)} à{" "}
                    {pct(FRAIS_TYPES.contratBancaireTraditionnel.arbitrage.max)}
                  </td>
                  <td>{pct(FRAIS_TYPES.contratInternet.arbitrage.max)}</td>
                  <td>Grille tarifaire du contrat</td>
                </tr>
                <tr>
                  <td>Surcoût de gestion pilotée à horizon (en plus des frais des fonds)</td>
                  <td>
                    {pct(FRAIS_TYPES.gestionPiloteeSurcout.min)} à {pct(FRAIS_TYPES.gestionPiloteeSurcout.max)}
                  </td>
                  <td>Généralement sans objet en gestion libre</td>
                  <td>Convention de gestion pilotée, notice du mandat</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Toutes ces fourchettes sont des ordres de grandeur de marché, révisés en{" "}
            {HYPOTHESES_MAJ} — à vérifier contrat par contrat, chaque assureur, banque et
            distributeur pratiquant sa propre grille.
          </p>

          <h2 id="cumul">Le cumul : ce que ça change sur la durée</h2>
          <p>
            Additionnez la gestion annuelle du contrat, les frais des supports, et le surcoût de
            gestion pilotée quand elle s'applique par défaut : un PER de réseau traditionnel investi
            en fonds maison et en gestion pilotée cumule couramment de l'ordre de{" "}
            {pct(totalBancairePilote)} de frais annuels tout compris, quand un PER en ligne investi
            en ETF, en gestion libre, revient autour de {pct(totalInternetEtf)}. L'écart ne change
            rien au risque pris ni à la qualité de l'allocation ; il change uniquement ce qui reste
            dans le plan chaque année, pendant toute la durée où l'argent y est bloqué.
          </p>
          <div className="note">
            <p>
              <strong>Avertissement :</strong> l'exemple qui suit est purement illustratif et
              pédagogique. Il isole le seul effet des frais annuels, à l'exclusion de tout
              rendement des supports (positif ou négatif), sur un versement mensuel constant de{" "}
              {euros(SIMU_DEFAUTS.versementMensuel)} pendant {SIMU_DEFAUTS.dureeAnnees} ans. Ce
              n'est ni une projection ni une promesse de performance : dans la réalité, le
              rendement des supports se cumule (ou se soustrait) à cet effet de frais, dans un sens
              qui ne peut pas être anticipé.
            </p>
          </div>
          <p>
            Sur cette base, un PER de réseau traditionnel investi en fonds maison et en gestion
            pilotée ({pct(totalBancairePilote)} de frais annuels tout compris) verrait environ{" "}
            {euros(fraisCumulesBancaire)} prélevés au titre des seuls frais sur la période, contre
            environ {euros(fraisCumulesInternet)} pour un PER en ligne investi en ETF, en gestion
            libre ({pct(totalInternetEtf)} de frais annuels). L'écart entre les deux, de l'ordre de{" "}
            {euros(fraisCumulesBancaire - fraisCumulesInternet)}, donne un ordre de grandeur de ce
            que représente un écart de frais de ce type une fois cumulé et composé chaque année —
            à comparer, au cas par cas, à l'avantage retiré de la déduction fiscale à l'entrée.
          </p>
          <p>
            Ce point mérite d'être approfondi avec ses propres chiffres plutôt qu'avec cet exemple
            générique — nos simulateurs dédiés sur <a href="/strategies/per">la page stratégie PER</a> et sur{" "}
            <a href="/guide/per-bancaire-frais-gestion-horizon">
              notre article sur le PER bancaire
            </a>{" "}
            permettent de tester son propre montant, sa propre durée et d'intégrer une hypothèse de
            rendement. Ce n'est pas un argument contre le PER ; c'est un rappel que la déduction et le
            contenant se jugent sur deux échelles différentes, et qu'aucune des deux ne dispense de
            regarder l'autre.
          </p>

          <h2 id="checklist">Check-list : où trouver les frais réels de son PER</h2>
          <ol>
            <li>
              <strong>Sortez le relevé annuel de situation.</strong> L'assureur ou le teneur de
              compte est tenu de l'adresser chaque année ; il détaille en principe les frais
              prélevés sur la période.
            </li>
            <li>
              <strong>Ouvrez les conditions générales du contrat.</strong> Les frais sur versement,
              de gestion annuelle et d'arbitrage y figurent noir sur blanc, dans un tableau dédié.
            </li>
            <li>
              <strong>Ouvrez le DIC de chaque support détenu.</strong> C'est le seul endroit où
              trouver les « frais courants » de chaque fonds — celui que la grille du contrat ne
              montre jamais.
            </li>
            <li>
              <strong>Vérifiez si le plan est en gestion pilotée ou en gestion libre.</strong> La
              convention de gestion pilotée à horizon, quand elle s'applique, mentionne son
              surcoût séparément.
            </li>
            <li>
              <strong>Additionnez les postes</strong> et comparez le total à la grille ci-dessus :
              c'est ce chiffre, et lui seul, qu'il faut mettre en face de la déduction obtenue à
              l'entrée.
            </li>
          </ol>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Le PER a-t-il des frais de sortie ou de transfert ?</h3>
          <p>
            Un transfert vers un autre PER peut être soumis à des frais, plafonnés par la loi et
            généralement nuls après cinq ans de détention ou lorsque le contrat a été ouvert
            depuis peu chez un même distributeur — les conditions précises figurent dans les
            conditions générales du contrat. La sortie en capital ou en rente à la retraite n'est,
            elle, pas un « frais » au sens de cet article : elle relève de la fiscalité de sortie,
            traitée sur <a href="/strategies/per">notre page dédiée au PER</a>.
          </p>
          <h3>Les frais d'un PER sont-ils négociables ?</h3>
          <p>
            Les frais sur versement le sont souvent, en particulier en réseau bancaire
            traditionnel, à condition de le demander. Les frais de gestion annuels du contrat et
            les frais des supports le sont beaucoup plus rarement, car ils relèvent de la grille
            tarifaire générale de l'assureur ou du distributeur.
          </p>
          <h3>Un PER moins cher est-il toujours préférable ?</h3>
          <p>
            Pas nécessairement : un contrat plus cher peut se justifier par un accompagnement ou
            une gestion pilotée dont la valeur ajoutée dépasse le surcoût facturé. Mais cela doit
            se vérifier au cas par cas, pas se présumer — c'est tout l'objet de la grille et de la
            check-list de cet article.
          </p>
          <h3>Comment savoir si mon PER est en gestion pilotée ou en gestion libre ?</h3>
          <p>
            La convention de gestion signée à l'ouverture du plan l'indique explicitement ; à
            défaut de choix contraire du souscripteur, la réglementation prévoit une gestion
            pilotée à horizon par défaut. Le relevé annuel de situation ou l'espace client en ligne
            du contrat permet également de le vérifier.
          </p>
          <h3>Les frais d'un PER sont-ils les mêmes pour tous les distributeurs ?</h3>
          <p>
            Non, chaque assureur, banque ou courtier applique sa propre grille tarifaire, ce qui
            justifie de comparer les postes un par un plutôt que de se fier à un seul chiffre
            affiché en tête de plaquette commerciale.
          </p>
          <h3>Où trouver la synthèse des frais réellement prélevés sur mon PER l'année passée ?</h3>
          <p>
            Sur le relevé annuel de situation, que l'assureur ou le teneur de compte est tenu
            d'adresser chaque année : il détaille en principe les frais prélevés sur la période,
            en complément des conditions générales et du DIC de chaque support.
          </p>

          <p>
            Un mauvais contrat déductible reste un mauvais contrat. La déduction fiscale à l'entrée
            ne compense pas des frais élevés sur la durée : elle allège la facture fiscale d'une
            année, quand les frais du contenant se paient chaque année suivante, jusqu'au
            déblocage. Juger un PER à sa seule ligne de déduction, c'est ne regarder qu'une moitié
            du prix. Notre guide sur{" "}
            <a href="/guide/quel-est-le-meilleur-per">quel est le meilleur PER</a> et notre article
            sur{" "}
            <a href="/guide/combien-coute-un-conseiller-en-gestion-de-patrimoine">
              le coût d'un conseiller en gestion de patrimoine
            </a>{" "}
            permettent d'aller plus loin sur les critères de choix et la valeur d'un accompagnement
            en face de ces frais.
          </p>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque contrat doit être vérifié individuellement. Les fourchettes de
              frais citées sont des ordres de grandeur de marché, révisés en {HYPOTHESES_MAJ}, à
              confirmer poste par poste sur les documents contractuels propres à chaque plan. Les
              prélèvements sociaux applicables aux sorties de PER (
              {pct(FISCALITE.prelevementsSociaux.per)}, barème en vigueur en juillet 2026) s'ajoutent
              à ces frais de gestion et n'en font pas partie ; ils sont traités dans{" "}
              <a href="/strategies/per">notre page dédiée au PER</a>. Pour le développement complet
              sur la gestion pilotée à horizon,{" "}
              <a href="/guide/per-bancaire-frais-gestion-horizon">notre article dédié</a> complète
              cette grille.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
