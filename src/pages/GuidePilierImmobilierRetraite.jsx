import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { RETRAITE_PROGRESSIVE_CUMUL } from "../components/hypotheses.js";

const R = RETRAITE_PROGRESSIVE_CUMUL;

// Aucun chiffre de cette page n'est en dur : les repères chiffrés sont dans les guides liés.
const sources = [
  {
    label: "Service-Public.gouv.fr — Logement : rubrique des fiches pratiques",
    url: "https://www.service-public.gouv.fr/",
  },
  {
    label: "Impots.gouv.fr — Particulier : revenus fonciers, location meublée, impôt sur la fortune immobilière",
    url: "https://www.impots.gouv.fr/particulier",
  },
  {
    label: "Bofip-Impôts — Documentation fiscale officielle (revenus fonciers, BIC, plus-values immobilières)",
    url: "https://bofip.impots.gouv.fr/",
  },
  {
    label: "Légifrance — Code général des impôts et Code civil (usufruit, nue-propriété, succession)",
    url: "https://www.legifrance.gouv.fr/",
  },
  {
    label: "Autorité des marchés financiers — Placements immobiliers collectifs, dont les SCPI : informations pour les épargnants",
    url: "https://www.amf-france.org/",
  },
];

export default function GuidePilierImmobilierRetraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide complet · immobilier et revenus de retraite</span>
          <h1>Immobilier et retraite : le guide complet</h1>
          <p className="sub">
            Pourquoi, avec quel véhicule, comment le financer, à quelle fiscalité, et que faire du
            bien une fois à la retraite. Mis à jour le {R.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> l'immobilier peut financer une partie d'une retraite,
              mais il n'est ni simple ni liquide ni sans risque. Ce guide structure le sujet en six
              temps : pourquoi (et pourquoi pas), quel véhicule (location directe nue ou meublée,
              SCPI, démembrement), quel financement, quelle fiscalité, quels risques, et comment
              l'utiliser à la retraite. Chaque rubrique est résumée en quelques lignes et renvoie
              vers l'article qui la traite à fond. Il ne s'agit pas d'un conseil personnalisé.
            </p>
          </div>

          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel :
            un couple de cinquante ans, propriétaire de sa résidence principale, qui s'interroge
            sur un deuxième bien « pour la retraite ». Louer en direct, acheter des parts de
            SCPI, emprunter ou non, attendre la retraite ou agir maintenant : chaque réponse
            ouvre une dizaine de questions fiscales, financières et familiales.
          </p>
          <p>
            Ce guide pilier ne remplace pas les articles détaillés. Il en donne l'ordre de lecture
            et rappelle, pour chaque étape, ce qu'il faut avoir en tête avant d'approfondir.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#pourquoi">Pourquoi (ou pourquoi pas) de l'immobilier pour sa retraite ?</a></li>
              <li><a href="#vehicule">Quel véhicule choisir : location directe, SCPI ou démembrement ?</a></li>
              <li><a href="#financer">Comment financer : comptant ou à crédit ?</a></li>
              <li><a href="#fiscalite">Quelle fiscalité pour les revenus et la revente ?</a></li>
              <li><a href="#risques">Quels risques et quelle liquidité ?</a></li>
              <li><a href="#retraite">Et à la retraite : revenus, vente, transmission ?</a></li>
              <li><a href="#checklist">Les questions à se poser avant d'acheter</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="pourquoi">Pourquoi (ou pourquoi pas) de l'immobilier pour sa retraite ?</h2>
          <p>
            L'attrait est réel : un loyer ou un revenu de parts versé régulièrement ressemble à un
            complément de pension, et un bien se transmet. Mais cet attrait cache des coûts, de
            l'illiquidité et du temps de gestion. Avant de choisir un véhicule, il faut décider si
            l'immobilier mérite une place dans le patrimoine, et comment le comparer aux autres
            enveloppes.
          </p>
          <ul>
            <li><a href="/strategies/immobilier-retraite">Stratégie immobilier-retraite : le flux plutôt que la pierre</a></li>
            <li><a href="/guide/immobilier-locatif-ou-assurance-vie">Immobilier locatif ou assurance-vie pour préparer sa retraite</a></li>
            <li><a href="/guide/per-ou-immobilier-locatif">PER ou immobilier locatif : lequel privilégier pour transmettre</a></li>
            <li><a href="/guide/cinq-erreurs-investissement-locatif-retraite">Les 5 erreurs les plus coûteuses de l'investissement locatif retraite</a></li>
            <li><a href="/guide/combien-coute-un-investissement-locatif">Combien coûte réellement un investissement locatif</a></li>
            <li><a href="/guide/combien-faut-il-epargner-pour-la-retraite">Combien épargner pour sa retraite : la place de l'immobilier dans le total</a></li>
          </ul>

          <h2 id="vehicule">Quel véhicule choisir : location directe, SCPI ou démembrement ?</h2>
          <p>
            Trois grandes familles se distinguent par le degré d'implication demandé, le ticket
            d'entrée et la nature du revenu.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Véhicule</th>
                  <th>Principe</th>
                  <th>Implication</th>
                  <th>À lire</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Location nue ou meublée en direct</td>
                  <td>Vous achetez un logement et le louez vous-même</td>
                  <td>Forte (gestion, travaux, vacance)</td>
                  <td><a href="/guide/lmnp-ou-locatif-nu">LMNP ou locatif nu</a></td>
                </tr>
                <tr>
                  <td>SCPI</td>
                  <td>Vous détenez des parts d'un portefeuille immobilier géré par une société</td>
                  <td>Faible (délégation), mais revenu variable</td>
                  <td><a href="/guide/scpi-preparer-sa-retraite">SCPI et retraite</a></td>
                </tr>
                <tr>
                  <td>Démembrement (nue-propriété)</td>
                  <td>Vous achetez la nue-propriété, l'usufruit revenant à un tiers pour une durée</td>
                  <td>Très faible pendant le démembrement, pas de revenu avant la fin</td>
                  <td><a href="/guide/demembrement-nue-propriete-retraite">Démembrement et nue-propriété</a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Location meublée (LMNP).</strong> Le statut séduit par son régime fiscal, mais
            il a ses règles à la revente et ses pièges. Trois articles en détaillent les facettes :
          </p>
          <ul>
            <li><a href="/guide/lmnp-ou-locatif-nu">LMNP ou locatif nu : lequel choisir pour la retraite ?</a></li>
            <li><a href="/guide/lmnp-reforme-amortissement-plus-value">LMNP : amortissement et plus-value, réintégration à la revente</a></li>
            <li><a href="/guide/lmnp-residence-geree-retraite">LMNP en résidence gérée : senior, EHPAD, étudiante</a></li>
            <li><a href="/guide/lmnp-risques">LMNP : les risques que l'on vous cache</a></li>
          </ul>
          <p>
            <strong>SCPI.</strong> Elles externalisent la gestion mais pas le risque : revenu
            non garanti, valeur des parts variable, sortie parfois longue. On peut les détenir en
            direct, dans une assurance-vie ou dans un PER, avec des conséquences fiscales
            différentes.
          </p>
          <ul>
            <li><a href="/guide/scpi-preparer-sa-retraite">SCPI et retraite : comment s'en servir pour préparer ses revenus</a></li>
            <li><a href="/guide/scpi-assurance-vie-ou-per">SCPI en direct, en assurance-vie ou dans un PER</a></li>
            <li><a href="/guide/scpi-fiscalite-revenus-plus-values">Fiscalité des SCPI : revenus fonciers, revenus étrangers, plus-values, IFI</a></li>
          </ul>
          <p>
            Pour comparer des sociétés de gestion ou des SCPI précises, ce site n'est pas le bon
            endroit : des ressources spécialisées existent, comme{" "}
            <a href="https://immobilierpassif.com" target="_blank" rel="noopener noreferrer">immobilierpassif.com</a>{" "}
            ou{" "}
            <a href="https://scpirentable.fr" target="_blank" rel="noopener noreferrer">scpirentable.fr</a>.
          </p>
          <p>
            <strong>Démembrement.</strong> Utile pour bâtir un patrimoine sans revenus imposables
            pendant la phase de détention, il suppose de bloquer des fonds et d'accepter un
            rendement différé :{" "}
            <a href="/guide/demembrement-nue-propriete-retraite">démembrement et nue-propriété pour préparer sa retraite</a>.
          </p>

          <h2 id="financer">Comment financer : comptant ou à crédit ?</h2>
          <p>
            Le crédit permet d'acheter plus grand que ce que l'épargne autorise, mais il
            amplifie aussi les pertes si le revenu ou la valeur déçoivent, et la mensualité reste
            due quelle que soit la situation du bien. À l'approche de la retraite, l'horizon de
            remboursement doit être confronté à la baisse de revenus attendue.
          </p>
          <ul>
            <li><a href="/guide/scpi-a-credit-ou-comptant">SCPI à crédit ou au comptant : que change l'emprunt à l'approche de la retraite</a></li>
            <li><a href="/guide/combien-coute-un-investissement-locatif">Combien coûte un investissement locatif : frais, charges, fiscalité</a></li>
            <li><a href="/guide/cinq-erreurs-investissement-locatif-retraite">Les erreurs de financement à éviter</a></li>
          </ul>

          <h2 id="fiscalite">Quelle fiscalité pour les revenus et la revente ?</h2>
          <p>
            Revenus fonciers, bénéfices industriels et commerciaux (location meublée),
            plus-values de cession, impôt sur la fortune immobilière : la fiscalité immobilière
            se superpose à l'impôt sur le revenu, aux prélèvements sociaux et parfois à l'impôt
            sur la fortune immobilière. Les règles dépendent du véhicule, de la durée de
            détention et du statut du bien. Elles évoluent : à vérifier avant toute décision.
          </p>
          <ul>
            <li><a href="/guide/scpi-fiscalite-revenus-plus-values">Fiscalité des SCPI</a></li>
            <li><a href="/guide/lmnp-reforme-amortissement-plus-value">LMNP : amortissement et plus-value</a></li>
            <li><a href="/guide/lmnp-ou-locatif-nu">LMNP ou locatif nu : lecture fiscale comparée</a></li>
            <li><a href="/guide/per-ou-immobilier-locatif">PER ou immobilier locatif : lecture fiscale et transmission</a></li>
          </ul>

          <h2 id="risques">Quels risques et quelle liquidité ?</h2>
          <p>
            Un bien immobilier se vend en plusieurs mois, parfois avec une décote ; les loyers
            peuvent baisser ; la vacance locative et les travaux pèsent sur la rentabilité ; la
            concentration sur un seul actif ou une seule ville aggrave le risque. Les parts de
            SCPI sont moins liquides qu'un placement financier coté, et leur valeur peut baisser.
            Les performances passées ne préjugent pas des performances futures.
          </p>
          <ul>
            <li><a href="/guide/cinq-erreurs-investissement-locatif-retraite">Les 5 erreurs les plus coûteuses de l'investissement locatif</a></li>
            <li><a href="/guide/lmnp-risques">LMNP : les risques que l'on vous cache</a></li>
            <li><a href="/guide/lmnp-residence-geree-retraite">Résidence gérée : ce que vaut ce revenu pour la retraite</a></li>
            <li><a href="/guide/immobilier-locatif-ou-assurance-vie">Immobilier locatif ou assurance-vie : arbitrage de liquidité</a></li>
          </ul>

          <h2 id="retraite">Et à la retraite : revenus, vente, transmission ?</h2>
          <p>
            Une fois à la retraite, le bien devient une source de revenus à intégrer à la
            fiscalité des pensions, ou un capital à arbitrer : conserver, vendre en une fois,
            donner, démembrer. La transmission aux héritiers se prépare en amont, avec les autres
            enveloppes du patrimoine.
          </p>
          <ul>
            <li><a href="/guide/immobilier-a-la-retraite-revenus-transmission">Immobilier à la retraite : revenus complémentaires, vente et transmission</a></li>
            <li><a href="/guide/demembrement-nue-propriete-retraite">Démembrement et nue-propriété</a></li>
            <li><a href="/guide/donation-ou-assurance-vie-transmission">Donation ou assurance-vie : transmettre à ses enfants</a></li>
            <li><a href="/guide/epargne-retraite-en-couple-et-transmission">Épargne retraite en couple et transmission</a></li>
            <li><a href="/strategies/decumulation">Décumulation : convertir son capital en revenus</a></li>
            <li><a href="/guide/ordre-de-decaissement-retraite">Ordre de décaissement : où l'immobilier s'intègre</a></li>
          </ul>

          <h2 id="checklist">Les questions à se poser avant d'acheter</h2>
          <ol>
            <li>L'immobilier a-t-il sa place dans mon patrimoine, ou suis-je déjà concentré sur ma résidence principale ?</li>
            <li>Suis-je prêt à gérer un bien, ou vaut-il mieux déléguer ?</li>
            <li>Le revenu attendu couvre-t-il charges, impôts et vacance, avec une marge de prudence ?</li>
            <li>Que se passe-t-il si je dois vendre dans cinq ans ?</li>
            <li>Mon financement reste-t-il supportable si mes revenus baissent à la retraite ?</li>
            <li>Quelle fiscalité à l'entrée, en cours de détention et à la revente ?</li>
            <li>Comment le bien sera-t-il transmis, et à qui ?</li>
          </ol>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>L'immobilier est-il un bon placement pour la retraite ?</h3>
          <p>
            Cela dépend de votre situation, de votre horizon et de votre capacité à absorber un
            risque de vacance ou de baisse de valeur. Il peut compléter d'autres enveloppes, pas
            les remplacer systématiquement.
          </p>
          <h3>Vaut-il mieux investir en direct ou en SCPI ?</h3>
          <p>
            La location directe demande du temps et expose à un seul bien ; la SCPI mutualise
            et délègue, mais le revenu n'est pas garanti. Voir{" "}
            <a href="/guide/scpi-preparer-sa-retraite">SCPI et retraite</a> et{" "}
            <a href="/guide/lmnp-ou-locatif-nu">LMNP ou locatif nu</a>.
          </p>
          <h3>Peut-on investir à crédit juste avant la retraite ?</h3>
          <p>
            C'est possible, mais l'horizon de remboursement et la baisse de revenus à venir
            doivent être pris en compte, comme l'examine{" "}
            <a href="/guide/scpi-a-credit-ou-comptant">le guide sur la SCPI à crédit</a>.
          </p>
          <h3>Le LMNP est-il toujours avantageux ?</h3>
          <p>
            Pas toujours : le régime fiscal à la revente, les risques de résidence gérée et les
            règles récentes demandent un examen au cas par cas. Voir{" "}
            <a href="/guide/lmnp-reforme-amortissement-plus-value">LMNP : amortissement et plus-value</a>{" "}
            et <a href="/guide/lmnp-risques">LMNP : les risques</a>.
          </p>
          <h3>Immobilier ou assurance-vie : lequel choisir ?</h3>
          <p>
            Les deux répondent à des besoins différents (revenu, liquidité, transmission) et se
            combinent souvent. Notre comparaison{" "}
            <a href="/guide/immobilier-locatif-ou-assurance-vie">immobilier locatif ou assurance-vie</a>{" "}
            en détaille les critères.
          </p>
          <h3>Que faire du bien locatif à la retraite ?</h3>
          <p>
            Le conserver, le vendre, le donner ou le démembrer : chaque option a ses conséquences
            fiscales et familiales, traitées dans{" "}
            <a href="/guide/immobilier-a-la-retraite-revenus-transmission">immobilier à la retraite</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            L'immobilier n'est pas un raccourci vers la retraite, c'est un choix de véhicule, de
            financement et de fiscalité qui doit s'insérer dans un patrimoine plus large. Il
            demande de comparer, de chiffrer les coûts, d'anticiper la sortie et de rester lucide
            sur la liquidité. Les articles ci-dessus détaillent chaque maillon.
          </p>
          <p>
            Pour situer l'immobilier dans l'ensemble de vos projets, le{" "}
            <a href="/guide/preparer-sa-retraite-guide-complet">guide complet pour préparer sa retraite</a>{" "}
            donne la carte d'ensemble, le{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> un premier ordre de
            grandeur, et le <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a>{" "}
            permet de poser vos données à plat.
          </p>

          <h2>Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/preparer-sa-retraite-guide-complet">Préparer sa retraite : le guide complet</a></li>
            <li><a href="/strategies/immobilier-retraite">Stratégie immobilier-retraite</a></li>
            <li><a href="/guide/meilleure-enveloppe-retraite">Quelle est la meilleure enveloppe pour préparer sa retraite ?</a></li>
            <li><a href="/guides">Tous nos guides retraite</a></li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en novembre 2026 :</p>
          <ul>
            {sources.map((src) => (
              <li key={src.url}>
                <a href={src.url} target="_blank" rel="noopener noreferrer">
                  {src.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="note">
            <p>
              Ce guide est général et ne constitue pas un conseil personnalisé ni une
              recommandation d'investissement. L'immobilier, en direct comme via des parts de
              société, comporte un risque de perte en capital, de vacance et d'illiquidité ; les
              performances passées ne préjugent pas des performances futures. La fiscalité évolue
              : vérifiez-la auprès de l'administration ou d'un professionnel.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Avant d'acheter pour la retraite, situez l'immobilier dans l'ensemble de votre patrimoine." />
    </>
  );
}
