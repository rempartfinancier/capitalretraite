import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { EPARGNE_RETRAITE_EXEMPLES, euros, pct } from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const X = EPARGNE_RETRAITE_EXEMPLES;
const ages = X.agesActuels;
const ageDepart = X.ageDepart;
const complements = X.complementsMensuelsCibles;
const duree = X.dureeRetraiteAnnees;
const rendements = X.rendementsEpargneNets;
const rdNet = X.rendementDecaissementNet;
const inflation = X.inflationAnnuelle;
const regle = X.regleRetraitAnnuel;
const MOIS = 12; // mois par an (constante de calendrier)

// Taux réel = (1 + taux nominal) / (1 + inflation) − 1, en fraction.
const reel = (nominalPct) => (1 + nominalPct / 100) / (1 + inflation / 100) - 1;

// Facteur d'annuité : valeur actuelle de `n` versements unitaires au taux r.
const annuite = (r, n) => (r === 0 ? n : (1 - (1 + r) ** -n) / r);
// Valeur acquise de `n` versements unitaires au taux r (fin de période).
const valeurAcquise = (r, n) => (r === 0 ? n : ((1 + r) ** n - 1) / r);

// Taux réel de décaissement, annuités annuelles.
const rdReel = reel(rdNet);
const facteurCapital = annuite(rdReel, duree); // capital = complément annuel × facteur
const capitalCible = (complementMensuel) => complementMensuel * MOIS * facteurCapital;

// Épargne mensuelle : capital ÷ valeur acquise de 1 € versé chaque mois (taux réel mensuel équivalent).
const epargneMensuelle = (capital, age, rendementNetPct) => {
  const n = (ageDepart - age) * MOIS;
  const rm = (1 + reel(rendementNetPct)) ** (1 / MOIS) - 1;
  return capital / valeurAcquise(rm, n);
};
const arrondi = (n) => Math.round(n);

const grille = complements.map((c) => {
  const capital = capitalCible(c);
  return {
    complement: c,
    capital,
    lignes: ages.map((age) => ({
      age,
      annees: ageDepart - age,
      montants: rendements.map((rd) => arrondi(epargneMensuelle(capital, age, rd))),
    })),
  };
});

// ---- Exemple pas à pas : complément médian, âge médian, rendement médian ----
const iC = Math.floor(complements.length / 2);
const iA = Math.floor(ages.length / 2);
const iR = Math.floor(rendements.length / 2);
const exC = complements[iC];
const exAge = ages[iA];
const exRend = rendements[iR];
const exAnnuel = exC * MOIS;
const exCapital = capitalCible(exC);
const exNMois = (ageDepart - exAge) * MOIS;
const exReelEp = reel(exRend);
const exRm = (1 + exReelEp) ** (1 / MOIS) - 1;
const exVA = valeurAcquise(exRm, exNMois);
const exEpargne = exCapital / exVA;
const exTotalVerse = exEpargne * exNMois;
const exGains = exCapital - exTotalVerse;

const f1 = (n) => n.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const f2 = (n) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const f4 = (n) => n.toLocaleString("fr-FR", { minimumFractionDigits: 4, maximumFractionDigits: 4 });
const pc2 = (r) => f2(r * 100) + " %";

// Multiple capital / revenu annuel et comparaison avec la règle des 4 %.
const multipleReel = facteurCapital;
const multipleRegle = 100 / regle;

// ---- Effet du temps (rendement médian, complément médian) ----
const gap = ages[1] - ages[0];
const ligneMed = (age) => epargneMensuelle(capitalCible(exC), age, exRend);
const e0 = ligneMed(ages[0]);
const e1 = ligneMed(ages[1]);
const e2 = ligneMed(ages[2]);
const x01 = e1 / e0;
const x12 = e2 / e1;
const x02 = e2 / e0;
// Même exercice à rendement bas et haut, pour le complément médian.
const rapportAges = (rd) =>
  epargneMensuelle(capitalCible(exC), ages[2], rd) / epargneMensuelle(capitalCible(exC), ages[0], rd);
const rapportBas = rapportAges(rendements[0]);
const rapportHaut = rapportAges(rendements[rendements.length - 1]);
// Part du capital qui vient des versements, par âge (rendement médian).
const partVersements = (age) => {
  const n = (ageDepart - age) * MOIS;
  return ((epargneMensuelle(capitalCible(exC), age, exRend) * n) / capitalCible(exC)) * 100;
};

const sources = [
  {
    label:
      "info-retraite.fr — Groupement d'intérêt public Union Retraite : relevé de carrière, estimation indicative globale (EIG) et simulateur M@rel, pour connaître vos pensions futures avant de dimensionner l'épargne complémentaire",
    url: "https://www.info-retraite.fr",
  },
];

export default function GuideEpargneMensuelleSelonAge() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide · Combien épargner pour la retraite</span>
          <h1>Combien épargner par mois pour la retraite selon son âge ?</h1>
          <p className="sub">
            Un tableau d'épargne mensuelle à {ages[0]}, {ages[1]} et {ages[2]} ans pour viser un
            complément de {euros(complements[0])}, {euros(complements[1])} ou{" "}
            {euros(complements[2])} par mois à {ageDepart} ans, en euros d'aujourd'hui. Mis à jour
            en {X.maj}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> pour obtenir un complément de {euros(exC)} par mois
              pendant {duree} ans à partir de {ageDepart} ans, il faut un capital d'environ{" "}
              {euros(arrondi(exCapital))} en euros d'aujourd'hui. Avec un rendement net
              illustratif de {pct(exRend)} par an, cela représente environ{" "}
              {euros(arrondi(e0))} par mois à {ages[0]} ans, {euros(arrondi(e1))} à {ages[1]} ans
              et {euros(arrondi(e2))} à {ages[2]} ans : chaque décennie perdue multiplie l'effort
              par {f1(x01)} puis {f1(x12)}. Ces montants sont des hypothèses d'école, pas des
              promesses de rendement, et supposent que l'épargne suit l'inflation.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#tableau">Quelle épargne mensuelle selon l'âge et le rendement ?</a></li>
              <li><a href="#methode">Comment ces montants sont-ils calculés ?</a></li>
              <li><a href="#exemple">Un exemple pas à pas</a></li>
              <li><a href="#temps">Combien coûte dix ans de retard ?</a></li>
              <li><a href="#lecture">Comment lire ce tableau sans se tromper ?</a></li>
              <li><a href="#limites">Ce que le tableau ne dit pas</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources</a></li>
            </ol>
          </div>

          <p>
            « Combien dois-je mettre de côté chaque mois ? » est la question que l'on pose le plus
            souvent, et celle à laquelle les réponses toutes faites (« un dixième de vos revenus »)
            servent le moins. Elles ignorent deux choses qui pèsent plus lourd que le salaire :
            l'âge auquel on commence et le rendement que l'on suppose. Ce guide prend le problème
            par l'autre bout : on fixe un complément de revenu visé, on calcule le capital qu'il
            suppose, puis l'épargne mensuelle qui le construit, selon trois âges de départ et
            trois rendements.
          </p>
          <p>
            Ce n'est pas la méthode du guide{" "}
            <a href="/guide/combien-faut-il-epargner-pour-la-retraite">
              combien faut-il épargner pour la retraite
            </a>
            , qui part de votre taux de remplacement, c'est-à-dire de l'écart entre votre dernier
            revenu et votre future pension. Les deux se complètent : le premier dit quel complément
            viser, celui-ci dit ce que coûte, mois après mois, chaque niveau de complément.
          </p>
          <p>
            Prenons un profil illustratif, sans lien avec un cas réel : un salarié de {ages[1]}{" "}
            ans, qui sait qu'il lui manquera un complément à la retraite mais n'a jamais mis un
            ordre de grandeur sur l'effort. Il découvrira dans le tableau qui suit que la question
            n'est pas seulement « combien », mais « à partir de quand ».
          </p>

          <h2 id="tableau">Quelle épargne mensuelle selon l'âge et le rendement ?</h2>
          <p>
            Les montants ci-dessous sont l'épargne mensuelle à verser jusqu'à {ageDepart} ans pour
            financer, pendant {duree} ans, le complément indiqué. Ils sont exprimés en euros
            d'aujourd'hui : il s'agit d'un pouvoir d'achat, pas d'un chèque à écrire à
            l'identique pendant des décennies (voir la convention plus bas). Le rendement est un
            rendement annuel net de frais, retenu comme hypothèse d'illustration.
          </p>
          {grille.map((g) => (
            <div key={g.complement}>
              <h3>
                Complément visé : {euros(g.complement)} par mois (capital cible d'environ{" "}
                {euros(arrondi(g.capital))})
              </h3>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Âge actuel</th>
                      <th>Années avant {ageDepart} ans</th>
                      {rendements.map((rd) => (
                        <th key={rd}>Rendement net de {pct(rd)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {g.lignes.map((l) => (
                      <tr key={l.age}>
                        <td>{l.age} ans</td>
                        <td>{l.annees} ans</td>
                        {l.montants.map((m, i) => (
                          <td key={rendements[i]}>{euros(m)} par mois</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          <div className="note">
            <p>
              Hypothèses d'illustration ({X.maj}) : départ à {ageDepart} ans, retraits sur{" "}
              {duree} ans, rendement du capital de {pct(rdNet)} par an pendant les retraits,
              inflation de {pct(inflation)} par an, versements réguliers qui suivent l'inflation,
              sans fiscalité ni frais autres que ceux déjà déduits du rendement net, et sans
              pensions de base ou complémentaires, qui s'ajoutent au complément. Ces rendements
              ne sont ni prévus ni garantis ; la performance passée ne préjuge pas de la
              performance future.
            </p>
          </div>

          <h2 id="methode">Comment ces montants sont-ils calculés ?</h2>
          <p>
            Le calcul se fait en deux temps, d'abord à rebours depuis la retraite, puis vers
            l'avant depuis aujourd'hui. Chaque étape est une annuité, c'est-à-dire la somme
            actualisée d'une série de versements ou de retraits réguliers.
          </p>
          <ol>
            <li>
              <strong>Capital cible</strong> = complément annuel × [1 − (1 + r<sub>d</sub>)
              <sup>−{duree}</sup>] ÷ r<sub>d</sub>, où r<sub>d</sub> est le rendement <em>réel</em>{" "}
              du capital pendant les retraits et {duree} la durée de retraits en années. C'est le
              capital qui, placé à r<sub>d</sub>, permet de retirer le complément chaque année
              pendant {duree} ans jusqu'à épuisement.
            </li>
            <li>
              <strong>Épargne mensuelle</strong> = capital cible ÷ [((1 + r<sub>m</sub>)
              <sup>n</sup> − 1) ÷ r<sub>m</sub>], où r<sub>m</sub> est le rendement <em>réel</em>{" "}
              mensuel équivalent pendant l'épargne et n le nombre de mois jusqu'à {ageDepart} ans.
              Le diviseur est la valeur acquise de 1 € versé chaque mois.
            </li>
          </ol>
          <p>
            <strong>La convention « euros d'aujourd'hui ».</strong> Un complément de{" "}
            {euros(exC)} par mois dans {ageDepart - exAge} ans n'aura pas le pouvoir d'achat de{" "}
            {euros(exC)} aujourd'hui : avec {pct(inflation)} d'inflation par an, il en aurait bien
            moins. Pour éviter cette illusion, tous les montants sont raisonnés en pouvoir d'achat
            constant, ce qui revient à travailler avec des rendements réels :{" "}
            rendement réel = (1 + rendement net) ÷ (1 + inflation) − 1. Un rendement net de{" "}
            {pct(rendements[0])} avec {pct(inflation)} d'inflation donne ainsi un rendement réel de{" "}
            {pc2(reel(rendements[0]))}, un rendement net de {pct(rendements[1])} donne{" "}
            {pc2(reel(rendements[1]))}, un rendement net de {pct(rendements[2])} donne{" "}
            {pc2(reel(rendements[2]))}. On soustrait le rendement de l'inflation de façon
            exacte (par un quotient), pas par une simple différence.
          </p>
          <p>
            Cette convention a une contrepartie qu'il faut dire : l'épargne mensuelle du tableau
            est elle-même en euros d'aujourd'hui. Pour la tenir dans la durée, il faudrait
            l'augmenter chaque année du taux d'inflation, ce qui est raisonnable si le salaire
            suit, mais n'a rien d'automatique. À versement strictement fixe en euros courants,
            l'effort initial serait plus faible et le résultat final moins élevé en pouvoir
            d'achat.
          </p>
          <p>
            <strong>Pourquoi un rendement de retraits distinct.</strong> Pendant les retraits, le
            capital restant est en général investi plus prudemment : l'hypothèse retenue est{" "}
            {pct(rdNet)} net par an, soit {pc2(rdReel)} en réel. Le multiple obtenu (capital divisé
            par complément annuel) est de {f1(multipleReel)}, un peu en dessous du multiple de{" "}
            {f1(multipleRegle)} qu'implique la règle dite des {pct(regle)} (retrait annuel initial
            égal à {pct(regle)} du capital), qui n'est qu'un ordre de grandeur non garanti. Notre
            calcul, lui, épuise le capital au bout de {duree} ans : il ne dit rien de ce qui
            arrive si l'on vit plus longtemps, point repris plus bas.
          </p>

          <h2 id="exemple">Un exemple pas à pas</h2>
          <p>
            Reprenons la ligne du milieu : {exAge} ans aujourd'hui, un complément visé de{" "}
            {euros(exC)} par mois, un rendement net de {pct(exRend)} pendant l'épargne.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Étape</th>
                  <th>Calcul</th>
                  <th>Résultat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1. Complément annuel</td>
                  <td>{euros(exC)} × {MOIS}</td>
                  <td>{euros(exAnnuel)}</td>
                </tr>
                <tr>
                  <td>2. Rendement réel des retraits</td>
                  <td>(1 + {pct(rdNet)}) ÷ (1 + {pct(inflation)}) − 1</td>
                  <td>{pc2(rdReel)}</td>
                </tr>
                <tr>
                  <td>3. Facteur d'annuité sur {duree} ans</td>
                  <td>[1 − (1 + {f4(rdReel)})<sup>−{duree}</sup>] ÷ {f4(rdReel)}</td>
                  <td>{f2(facteurCapital)}</td>
                </tr>
                <tr>
                  <td>4. Capital cible</td>
                  <td>{euros(exAnnuel)} × {f2(facteurCapital)}</td>
                  <td>{euros(arrondi(exCapital))}</td>
                </tr>
                <tr>
                  <td>5. Rendement réel de l'épargne</td>
                  <td>(1 + {pct(exRend)}) ÷ (1 + {pct(inflation)}) − 1</td>
                  <td>{pc2(exReelEp)}, soit {pc2(exRm)} par mois</td>
                </tr>
                <tr>
                  <td>6. Nombre de mois jusqu'à {ageDepart} ans</td>
                  <td>({ageDepart} − {exAge}) × {MOIS}</td>
                  <td>{exNMois} mois</td>
                </tr>
                <tr>
                  <td>7. Valeur acquise de 1 € par mois</td>
                  <td>[(1 + {f4(exRm)})<sup>{exNMois}</sup> − 1] ÷ {f4(exRm)}</td>
                  <td>{f2(exVA)}</td>
                </tr>
                <tr>
                  <td>8. Épargne mensuelle</td>
                  <td>{euros(arrondi(exCapital))} ÷ {f2(exVA)}</td>
                  <td>{euros(arrondi(exEpargne))} par mois</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Sur {ageDepart - exAge} ans, les versements totalisent environ{" "}
            {euros(arrondi(exTotalVerse))} (en euros d'aujourd'hui). Les {euros(arrondi(exGains))}{" "}
            restants du capital viennent du rendement supposé, soit{" "}
            {pct(Math.round((exGains / exCapital) * 100))} de l'objectif : une part qui dépend
            entièrement d'une hypothèse que personne ne peut garantir. Si ce rendement n'est pas
            au rendez-vous, c'est l'épargne qu'il faut augmenter, ou l'objectif qu'il faut revoir.
          </p>

          <h2 id="temps">Combien coûte dix ans de retard ?</h2>
          <p>
            À rendement net de {pct(exRend)} et pour un complément de {euros(exC)} par mois,
            commencer à {ages[1]} ans au lieu de {ages[0]} ans, soit {gap} ans plus tard, multiplie
            l'épargne mensuelle par {f1(x01)} ({euros(arrondi(e0))}, puis {euros(arrondi(e1))}).
            Retarder encore de {ages[2] - ages[1]} ans, jusqu'à {ages[2]} ans, la multiplie à
            nouveau par {f1(x12)}, pour {euros(arrondi(e2))}. Entre {ages[0]} et {ages[2]} ans,
            l'effort est multiplié par {f1(x02)}.
          </p>
          <p>
            Pourquoi cet effet s'accélère-t-il ? Parce que chaque année de retard fait perdre deux
            choses à la fois : un versement de plus à financer et une année de rendement sur tout
            ce qui précède. À {ages[0]} ans, {pct(Math.round(100 - partVersements(ages[0])))} du
            capital vient du rendement supposé et {pct(Math.round(partVersements(ages[0])))} des
            versements ; à {ages[2]} ans, c'est {pct(Math.round(100 - partVersements(ages[2])))}{" "}
            contre {pct(Math.round(partVersements(ages[2])))}. Plus on commence tard, moins le
            temps travaille à votre place.
          </p>
          <p>
            Cet effet est d'autant plus marqué que le rendement supposé est élevé : à{" "}
            {ages[0]} ans contre {ages[2]} ans, l'écart est de {f1(rapportBas)} fois avec un
            rendement net de {pct(rendements[0])} et de {f1(rapportHaut)} fois avec{" "}
            {pct(rendements[rendements.length - 1])}. Un rendement élevé est donc le contraire d'un
            filet de sécurité pour qui commence tard : il corrige moins qu'on ne le croit ce que
            le calendrier a coûté. Le même raisonnement, appliqué à l'enveloppe PER, est détaillé
            dans notre guide{" "}
            <a href="/guide/a-quel-age-commencer-per">à quel âge commencer un PER</a>.
          </p>

          <h2 id="lecture">Comment lire ce tableau sans se tromper ?</h2>
          <p>
            Trois lectures évitent la plupart des contresens. D'abord, comparez les lignes entre
            elles plutôt que de chercher « votre » chiffre : l'enseignement du tableau est la
            pente selon l'âge, pas le montant exact. Ensuite, regardez l'écart entre colonnes :
            passer de {pct(rendements[0])} à {pct(rendements[2])} de rendement net réduit
            nettement l'effort, mais n'est pas un levier que vous contrôlez. Enfin, ces montants
            s'ajoutent à vos pensions : ils financent un complément, pas un revenu complet.
          </p>
          <p>
            Pour savoir quel complément viser, la seule base sérieuse est votre relevé de carrière
            et l'estimation de vos pensions futures, disponibles sur info-retraite.fr. Le{" "}
            <a href="/simulateur-retraite">simulateur retraite du site</a> permet ensuite
            d'estimer l'écart entre vos revenus actuels et vos pensions, et de tester un versement
            mensuel et une durée de votre choix : utilisez-le pour passer de ces ordres de grandeur
            à votre cas. Il fonctionne avec ses propres hypothèses, modifiables à l'écran, et ses
            résultats peuvent donc différer de ceux de ce tableau, qui repose sur les conventions
            décrites ci-dessus.
          </p>
          <p>
            Le tableau dit combien épargner, pas où. Le choix de l'enveloppe (PER, assurance-vie,
            PEA) change la fiscalité et la liquidité de l'argent ; notre guide{" "}
            <a href="/guide/meilleure-enveloppe-retraite">
              quelle est la meilleure enveloppe pour préparer sa retraite
            </a>{" "}
            en compare les logiques, et nos pages{" "}
            <a href="/strategies/per">PER</a>,{" "}
            <a href="/strategies/assurance-vie-retraite">assurance-vie</a> et{" "}
            <a href="/strategies/pea-retraite">PEA</a> détaillent chacune.
          </p>

          <h2 id="limites">Ce que le tableau ne dit pas</h2>
          <ul>
            <li>
              <strong>La fiscalité.</strong> Les rendements sont nets de frais, mais pas d'impôt.
              À la sortie, la fiscalité dépend de l'enveloppe, de la tranche marginale et du mode
              de retrait.
            </li>
            <li>
              <strong>La durée de vie.</strong> Le capital est calculé pour {duree} ans de
              retraits. Si vous vivez plus longtemps, il manque des années. C'est tout l'enjeu
              du choix entre revenus à durée limitée et revenu à vie, traité dans{" "}
              <a href="/guide/rente-viagere-ou-retraits-programmes">
                rente viagère ou retraits programmés
              </a>
              .
            </li>
            <li>
              <strong>La régularité du rendement.</strong> Un rendement moyen supposé constant
              ne dit rien de l'ordre des années. Un mauvais début de période de retraits pèse
              plus lourd qu'un mauvais début de période d'épargne.
            </li>
            <li>
              <strong>L'âge de départ.</strong> Le tableau retient {ageDepart} ans. Partir plus
              tôt ou plus tard modifie à la fois la durée d'épargne et celle des retraits ; la
              surcote et la décote jouent aussi sur la pension, comme l'explique{" "}
              <a href="/guide/surcote-decote-retraite">notre guide sur la surcote et la décote</a>.
            </li>
            <li>
              <strong>Les risques.</strong> Une épargne investie en unités de compte, en actions
              ou en ETF peut perdre de la valeur, y compris du capital investi.
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Combien faut-il épargner par mois pour sa retraite ?</h3>
          <p>
            Il n'y a pas de montant unique : cela dépend de l'âge de départ, du complément visé et
            du rendement supposé. Dans les hypothèses de ce guide, un complément de{" "}
            {euros(exC)} par mois à {ageDepart} ans demande entre {euros(arrondi(epargneMensuelle(capitalCible(exC), ages[0], rendements[2])))}{" "}
            par mois (à {ages[0]} ans, avec {pct(rendements[2])}) et{" "}
            {euros(arrondi(epargneMensuelle(capitalCible(exC), ages[2], rendements[0])))} par mois
            (à {ages[2]} ans, avec {pct(rendements[0])}).
          </p>

          <h3>Faut-il épargner un pourcentage de son revenu ou un montant fixe ?</h3>
          <p>
            Les deux approches se valent si elles sont suivies. Un pourcentage s'ajuste seul aux
            hausses de revenu et à l'inflation ; un montant fixe est plus simple à automatiser mais
            perd du pouvoir d'achat avec le temps. La convention de ce guide (versements qui
            suivent l'inflation) est plus proche du pourcentage.
          </p>

          <h3>Pourquoi raisonner en euros d'aujourd'hui ?</h3>
          <p>
            Parce que {euros(exC)} dans {ageDepart - exAge} ans n'achèteront pas ce que{" "}
            {euros(exC)} achètent aujourd'hui. En raisonnant en pouvoir d'achat constant, on
            compare des quantités qui ont un sens concret. Le coût est une hypothèse d'inflation
            ({pct(inflation)} par an ici), qui reste incertaine.
          </p>

          <h3>Les rendements du tableau sont-ils réalistes ?</h3>
          <p>
            Ce sont trois hypothèses d'école, ni des prévisions ni des promesses. Un rendement
            net de {pct(rendements[0])} évoque un placement très prudent ; {pct(rendements[2])} suppose une
            part importante de supports risqués, donc une possible perte en capital. La bonne
            pratique est de lire la ligne du milieu, puis de regarder ce que donnerait la colonne
            la plus basse.
          </p>

          <h3>Que faire si j'ai commencé tard ?</h3>
          <p>
            Trois leviers existent : augmenter l'effort mensuel, viser un complément plus modeste,
            ou repousser l'âge de départ, ce qui allonge la durée d'épargne et raccourcit celle des
            retraits à financer. Les trois peuvent se combiner. Le tableau permet de
            mesurer chacun : par exemple, passer d'un complément de {euros(complements[2])} à{" "}
            {euros(complements[1])} fait baisser l'effort dans la même proportion que l'objectif.
          </p>

          <h3>Ce calcul tient-il compte de mes pensions de retraite ?</h3>
          <p>
            Non. Il dimensionne uniquement le complément, qui s'ajoute à vos pensions de base et
            complémentaires. Pour estimer celles-ci, partez de votre relevé de carrière sur
            info-retraite.fr, puis utilisez le{" "}
            <a href="/simulateur-retraite">simulateur retraite</a> du site pour rapprocher pension
            estimée et besoin de revenu.
          </p>

          <h3>Vaut-il mieux un capital ou une rente à la retraite ?</h3>
          <p>
            Le tableau suppose des retraits programmés sur {duree} ans. Une rente viagère garantit
            un revenu à vie mais vous fait renoncer au capital. Le comparatif{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">
              rente viagère ou retraits programmés
            </a>{" "}
            détaille les compromis.
          </p>

          <h3>Ces montants sont-ils un conseil personnalisé ?</h3>
          <p>
            Non. Ce sont des illustrations pédagogiques, fondées sur des hypothèses uniformes,
            qui ne tiennent compte ni de votre situation familiale, ni de votre fiscalité, ni de
            vos autres actifs. Un échange avec un conseiller peut aider à les adapter.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Deux lectures s'imposent. La première : l'épargne mensuelle nécessaire est très
            sensible à l'âge de départ de l'effort, bien plus qu'au rendement que l'on espère. Dans
            nos hypothèses, l'écart entre {ages[0]} et {ages[2]} ans va de {f1(rapportBas)} à{" "}
            {f1(rapportHaut)} fois selon le rendement, quand le complément visé joue seulement
            proportionnellement. La seconde : un tableau n'est pas un plan. Il chiffre un ordre de
            grandeur à partir d'hypothèses connues, et son utilité est de faire comprendre à partir
            de quel moment l'effort devient lourd.
          </p>
          <p>
            Ne pas faire ce calcul a un coût : attendre « d'avoir les moyens » de commencer, c'est
            souvent renoncer à la période où l'effort est le plus léger. Commencer modestement
            et relever progressivement les versements vaut mieux qu'attendre le bon moment. Si
            vous voulez replacer ces ordres de grandeur dans votre propre situation (pensions
            attendues, épargne déjà constituée, âge de départ), le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à poser ce
            cadre avant toute décision.
          </p>

          <h2 id="lire-aussi">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/preparer-sa-retraite-a-40-ans">Préparer sa retraite à 40 ans</a></li>
            <li><a href="/guide/preparer-sa-retraite-a-50-ans">Préparer sa retraite à 50 ans</a></li>
            <li><a href="/guide/preparer-sa-retraite-guide-complet">Préparer sa retraite : le guide complet</a></li>
          </ul>

          <h2 id="sources">Sources</h2>
          <p>Sources consultées en novembre 2026 :</p>
          <ul>
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p>
            Les paramètres chiffrés (âges, rendements, durée de retraits, inflation) sont des
            hypothèses d'illustration pédagogique du site, datées de {X.maj} ; ils ne proviennent
            d'aucune source officielle et restent à réviser régulièrement.
          </p>

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les
              rendements utilisés sont des hypothèses illustratives, non des prévisions ni des
              garanties ; les performances passées ne préjugent pas des performances futures.
              Tout placement présente un risque de perte en capital, et la fiscalité dépend de
              votre situation et de l'enveloppe choisie.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Un ordre de grandeur se calcule. Votre plan d'épargne se construit." />
    </>
  );
}
