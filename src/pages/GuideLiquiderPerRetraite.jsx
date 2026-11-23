import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  FISCALITE,
  V3_PER_LIQUIDATION,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres lus dans hypotheses.js (aucun chiffre en dur) ----
const maj = V3_PER_LIQUIDATION.maj;
const V = V3_PER_LIQUIDATION.versementsExemple;
const G = V3_PER_LIQUIDATION.gainsExemple;
const annees = V3_PER_LIQUIDATION.anneesFractionnement;
const tauxPFU = FISCALITE.pfuIR;
const psPer = FISCALITE.prelevementsSociaux.per;
const tmiHaute = FISCALITE.tmiOptions[2]; // 30 %
const tmiBasse = FISCALITE.tmiOptions[1]; // 11 %

const r2 = (n) => Math.round(n * 100) / 100;
const part = (base, taux) => r2((base * taux) / 100);

// Exemple : PER de V + G, trois façons de sortir en capital
const capital = V + G;
const impotGains = part(G, tauxPFU + psPer);
const irA = part(V, tmiHaute); // capital en une fois, TMI haute supposée
const totalA = r2(irA + impotGains);
const netA = r2(capital - totalA);
const irB = part(V, tmiBasse); // fractionné, TMI basse supposée
const totalB = r2(irB + impotGains);
const netB = r2(capital - totalB);
const totalC = impotGains; // versements non déduits : capital exonéré
const netC = r2(capital - totalC);
const capitalAnnuelB = r2(capital / annees);
const versementsAnnuelB = r2(V / annees);
const gainsAnnuelB = r2(G / annees);

const sources = [
  {
    label: "Service-Public.gouv.fr — Plan d'épargne retraite (PER), fiche F34982",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34982",
  },
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : cotisations d'épargne retraite (déduction), fiche F14709",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14709",
  },
  {
    label: "Service-Public.gouv.fr — Barème de l'impôt sur le revenu, fiche F1419",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1419",
  },
  {
    label:
      "impots.gouv.fr — Les revenus mobiliers : prélèvements sociaux à 18,6 % depuis le 1er janvier 2026 (mise à jour du 8 avril 2026)",
    url: "https://www.impots.gouv.fr/particulier/les-revenus-mobiliers",
  },
  {
    label: "info-retraite.fr — Le droit à l'information sur la retraite (GIP Union Retraite)",
    url: "https://www.info-retraite.fr",
  },
  {
    label: "Légifrance — Code monétaire et financier, articles L. 224-1 et suivants (plan d'épargne retraite)",
    url: "https://www.legifrance.gouv.fr",
  },
];

export default function GuideLiquiderPerRetraite() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide pratique · PER et retraite</span>
          <h1>Liquider son PER à la retraite : démarche, options et fiscalité</h1>
          <p className="sub">
            Demande de liquidation, documents, capital, rente, sortie mixte ou fractionnée :
            comment procéder et les pièges à éviter. Mis à jour en {maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> liquider un PER se fait par une demande écrite à
              l'organisme, accompagnée d'un justificatif de départ à la retraite et du choix de
              sortie : capital en une fois, capital fractionné, rente ou combinaison. La
              fiscalité dépend de l'origine des sommes : les versements déduits sont imposés au
              barème de l'impôt sur le revenu, les versements non déduits sont exonérés, et les
              gains supportent {pct(tauxPFU)} de prélèvement forfaitaire et {pct(psPer)} de
              prélèvements sociaux. Exemple illustratif : sur un PER de {euros(capital)}, la
              fiscalité va de {euros(totalC)} à {euros(totalA)} selon l'origine des versements et
              la manière de sortir.
            </p>
          </div>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#quand">Quand peut-on liquider son PER ?</a></li>
              <li><a href="#etapes">Comment liquider son PER, étape par étape ?</a></li>
              <li><a href="#documents">Quels documents fournir ?</a></li>
              <li><a href="#options">Capital, rente, mixte ou fractionné : que choisir ?</a></li>
              <li><a href="#fiscalite">Quelle fiscalité selon les versements ?</a></li>
              <li><a href="#exemple">Combien d'impôt ? Un exemple chiffré</a></li>
              <li><a href="#delais">Quels délais et quels coûts ?</a></li>
              <li><a href="#pieges">Quels pièges éviter ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <p>
            Après des années de versements, l'idée de « sortir » son PER est souvent abordée
            comme une formalité, jusqu'à ce que l'on lise le détail : plusieurs compartiments,
            des options de sortie, une fiscalité différente selon que les versements ont été
            déduits ou non. Le formulaire est court ; ce qui le précède est la partie importante.
          </p>
          <p>
            Prenons un profil illustratif, sans lien avec un cas réel : un couple de 64 ans, dont
            l'un des conjoints liquide sa pension de base le mois prochain et détient un PER de{" "}
            {euros(capital)} alimenté de versements déduits. Il se demande s'il vaut mieux tout
            retirer, étaler la sortie ou choisir une rente. Ce guide décrit la démarche et les
            conséquences de chaque option ; le détail des règles fiscales est dans{" "}
            <a href="/guide/fiscalite-sortie-per">notre guide sur la fiscalité de la sortie du PER</a>{" "}
            et les cas de déblocage avant la retraite dans{" "}
            <a href="/guide/deblocage-anticipe-per">celui sur le déblocage anticipé</a>.
          </p>

          <h2 id="quand">Quand peut-on liquider son PER ?</h2>
          <p>
            La sortie « à la retraite » est possible à la liquidation de la pension d'un régime
            obligatoire de retraite ou à l'âge légal de départ, selon la formulation du contrat.
            Avant, les cas de déblocage anticipé sont limitativement énumérés par la loi. La
            demande ne peut donc pas précéder la liquidation de vos pensions : calez les deux
            démarches, en lien avec{" "}
            <a href="/guide/demande-de-retraite-demarches-calendrier">
              notre guide sur le calendrier de la demande de retraite
            </a>
            .
          </p>

          <h2 id="etapes">Comment liquider son PER, étape par étape ?</h2>
          <ol>
            <li>
              <strong>Faire le point sur les compartiments</strong> : versements volontaires,
              épargne salariale et cotisations obligatoires. Chacun a ses options de sortie.
            </li>
            <li>
              <strong>Estimer la fiscalité de chaque scénario</strong> (capital, fractionné,
              rente) avec vos autres revenus de l'année de sortie.
            </li>
            <li>
              <strong>Demander la liquidation par écrit</strong> à l'organisme, avec les pièces
              demandées, en précisant l'option choisie.
            </li>
            <li>
              <strong>Recevoir et vérifier le décompte</strong> : montant brut, part de
              versements, part de gains, retenues.
            </li>
            <li>
              <strong>Autoriser le virement</strong> sur un compte à votre nom, après
              l'éventuel désinvestissement des supports.
            </li>
            <li>
              <strong>Recevoir l'attestation fiscale</strong> de la sortie, nécessaire à la
              déclaration de revenus.
            </li>
            <li>
              <strong>Déclarer la sortie</strong> au printemps suivant : voir{" "}
              <a href="/guide/declarer-rachat-assurance-vie-sortie-per">
                notre guide sur la déclaration d'une sortie de PER
              </a>
              .
            </li>
          </ol>

          <h2 id="documents">Quels documents fournir ?</h2>
          <ul>
            <li>La demande de liquidation signée, sur le formulaire de l'organisme.</li>
            <li>
              Un justificatif de départ à la retraite : notification de pension ou attestation
              de liquidation du régime de base.
            </li>
            <li>Une pièce d'identité et un RIB à votre nom.</li>
            <li>
              Pour une rente : les informations sur le bénéficiaire en cas de réversion et la
              date d'effet souhaitée.
            </li>
            <li>
              Les justificatifs de versements non déduits, s'ils existent : ils conditionnent
              l'exonération de ces sommes.
            </li>
          </ul>

          <h2 id="options">Capital, rente, mixte ou fractionné : que choisir ?</h2>
          <p>
            La sortie en capital remet l'épargne en une fois, le capital fractionné l'étale en
            plusieurs retraits, la rente la transforme en revenu régulier, et la sortie mixte
            combine les deux. Selon les compartiments, certaines options peuvent être limitées
            par la loi ou le règlement du plan : les cotisations obligatoires, notamment, sortent
            en principe en rente.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Principe</th>
                  <th>Plutôt adaptée si</th>
                  <th>Point d'attention</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Capital en une fois</td>
                  <td>Tout est versé immédiatement</td>
                  <td>Besoin ponctuel ou capital faible</td>
                  <td>Impôt concentré sur une seule année</td>
                </tr>
                <tr>
                  <td>Capital fractionné</td>
                  <td>Plusieurs retraits, sur plusieurs années</td>
                  <td>Souhait de lisser l'impôt</td>
                  <td>Capital restant exposé aux marchés</td>
                </tr>
                <tr>
                  <td>Rente viagère</td>
                  <td>Revenu régulier, souvent à vie</td>
                  <td>Besoin de revenu stable à vie</td>
                  <td>Choix en général irréversible, capital non transmis</td>
                </tr>
                <tr>
                  <td>Sortie mixte</td>
                  <td>Part en capital, part en rente</td>
                  <td>Besoin de liquidités et de revenu régulier</td>
                  <td>Arbitrage à calibrer</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Pour arbitrer entre un revenu garanti et des retraits, voyez{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">notre comparatif rente viagère ou retraits programmés</a>
            , et pour l'enchaînement avec vos autres enveloppes{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement</a>.
          </p>

          <h2 id="fiscalite">Quelle fiscalité selon les versements ?</h2>
          <p>
            La fiscalité à la sortie dépend de la nature des sommes : versements déduits,
            versements non déduits, épargne salariale, gains. Les ordres de grandeur ci-dessous
            sont ceux de la sortie en capital ; la rente suit un régime distinct, détaillé dans
            notre guide de référence.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Origine des sommes</th>
                  <th>Impôt sur le revenu</th>
                  <th>Prélèvements sociaux</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Versements déduits du revenu imposable</td>
                  <td>Barème progressif, sans abattement de 10 %</td>
                  <td>Non, sur le capital</td>
                </tr>
                <tr>
                  <td>Versements non déduits</td>
                  <td>Exonérés</td>
                  <td>Non, sur le capital</td>
                </tr>
                <tr>
                  <td>Épargne salariale (participation, intéressement, abondement)</td>
                  <td>Capital exonéré</td>
                  <td>Non, sur le capital</td>
                </tr>
                <tr>
                  <td>Gains (dans tous les cas)</td>
                  <td>{pct(tauxPFU)} (prélèvement forfaitaire) ou barème sur option</td>
                  <td>{pct(psPer)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="exemple">Combien d'impôt ? Un exemple chiffré</h2>
          <div className="note">
            <p>
              Exemple illustratif, composite pédagogique : un PER de {euros(capital)}, dont{" "}
              {euros(V)} de versements et {euros(G)} de gains. La TMI à la sortie est supposée
              à {pct(tmiHaute)} en cas de retrait en une fois, à {pct(tmiBasse)} si le capital est
              étalé sur {annees} ans ({euros(capitalAnnuelB)} par an, dont {euros(versementsAnnuelB)}{" "}
              de versements et {euros(gainsAnnuelB)} de gains). Ces TMI sont des hypothèses : en
              réalité, l'impôt dépend du barème et de l'ensemble de vos revenus.
            </p>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Poste</th>
                  <th>Capital en une fois, versements déduits</th>
                  <th>Capital fractionné, versements déduits</th>
                  <th>Capital en une fois, versements non déduits</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Impôt sur les versements</td>
                  <td>{euros(V)} × {pct(tmiHaute)} = {euros(irA)}</td>
                  <td>{euros(V)} × {pct(tmiBasse)} = {euros(irB)}</td>
                  <td>0 €</td>
                </tr>
                <tr>
                  <td>Impôt et prélèvements sociaux sur les gains</td>
                  <td>{euros(G)} × {pct(r2(tauxPFU + psPer))} = {euros(impotGains)}</td>
                  <td>{euros(impotGains)}</td>
                  <td>{euros(impotGains)}</td>
                </tr>
                <tr>
                  <td>Fiscalité totale</td>
                  <td>{euros(totalA)}</td>
                  <td>{euros(totalB)}</td>
                  <td>{euros(totalC)}</td>
                </tr>
                <tr>
                  <td>Somme nette perçue</td>
                  <td>{euros(netA)}</td>
                  <td>{euros(netB)}</td>
                  <td>{euros(netC)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            L'écart entre la première et la deuxième colonne, soit {euros(r2(totalA - totalB))},
            vient uniquement de la TMI supposée : il illustre pourquoi le fractionnement peut
            être intéressant, mais il n'est ni garanti ni acquis. Le capital qui reste investi
            pendant le fractionnement reste exposé aux fluctuations des marchés, avec un
            risque de perte en capital.
          </p>

          <h2 id="quand-ou-eviter">Quand une sortie en capital vaut-elle le coup, et quand éviter ?</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Plutôt utile</th>
                  <th>À éviter ou à reporter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TMI de l'année de sortie basse, par exemple après la fin de l'activité</td>
                  <td>Année de sortie où d'autres revenus exceptionnels font monter la TMI</td>
                </tr>
                <tr>
                  <td>Capital étalé sur plusieurs années pour lisser l'impôt</td>
                  <td>Besoin de tout débloquer, sans marge de manœuvre</td>
                </tr>
                <tr>
                  <td>Projet précis financé par le capital (travaux, transmission)</td>
                  <td>Capital qui devrait durer toute la retraite, sans autre revenu</td>
                </tr>
                <tr>
                  <td>Combinaison avec une rente pour couvrir les charges fixes</td>
                  <td>Choix d'une rente sans avoir comparé le taux de conversion</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="delais">Quels délais et quels coûts ?</h2>
          <p>
            Les délais dépendent de l'organisme : la demande est en général traitée en quelques
            semaines, le temps de vérifier les pièces, de désinvestir les supports et de
            calculer les retenues. Prévoyez une marge si vous avez un besoin précis de
            trésorerie. Les frais de sortie sont en principe nuls ou très limités ; les frais de
            gestion courent jusqu'à la clôture ou jusqu'au dernier retrait en cas de
            fractionnement. Pour la rente, les frais et le taux de conversion figurent dans le
            barème de l'assureur : comparez avant de choisir.
          </p>

          <h2 id="pieges">Quels pièges éviter ?</h2>
          <ul>
            <li>
              <strong>Tout retirer en une fois sans simuler</strong> : un capital imposé la même
              année peut faire monter la tranche marginale.
            </li>
            <li>
              <strong>Oublier de prouver les versements non déduits</strong> : sans justificatif,
              ils risquent d'être traités comme déduits.
            </li>
            <li>
              <strong>Choisir la rente par défaut</strong> sans comparer son niveau et le
              caractère généralement irréversible du choix.
            </li>
            <li>
              <strong>Ignorer l'effet sur le revenu fiscal de référence</strong>, qui conditionne
              d'autres seuils (CSG sur les pensions, avantages sous conditions de ressources).
            </li>
            <li>
              <strong>Confondre sortie à la retraite et déblocage anticipé</strong> : les
              conditions et la fiscalité ne sont pas les mêmes.
            </li>
            <li>
              <strong>Laisser le capital sans pilotage pendant le fractionnement</strong> :
              l'allocation d'un PER à la retraite doit rester cohérente avec le calendrier des
              retraits.
            </li>
          </ul>

          <h2 id="faq">Questions fréquentes</h2>

          <h3>Comment liquider son PER à la retraite ?</h3>
          <p>
            Adressez une demande écrite à l'organisme, avec un justificatif de départ à la
            retraite, une pièce d'identité, un RIB et le choix de l'option de sortie (capital,
            fractionné, rente ou mixte).
          </p>

          <h3>Quels documents faut-il pour liquider un PER ?</h3>
          <p>
            La demande signée, la notification de pension ou l'attestation de liquidation du
            régime de base, une pièce d'identité, un RIB, et les justificatifs de versements non
            déduits s'il y en a.
          </p>

          <h3>Peut-on sortir son PER en capital ?</h3>
          <p>
            Oui pour les versements volontaires et l'épargne salariale, en une fois ou de
            manière fractionnée. Les cotisations obligatoires sortent en principe en rente, selon
            le règlement du plan.
          </p>

          <h3>Qu'est-ce que la sortie en capital fractionnée ?</h3>
          <p>
            C'est une sortie en plusieurs retraits successifs, à des dates et pour des montants
            que vous choisissez dans les limites du plan. Elle permet d'étaler l'impôt sur
            plusieurs années ; le capital restant reste exposé aux marchés.
          </p>

          <h3>Quelle est la fiscalité d'un PER à la sortie ?</h3>
          <p>
            Les versements déduits sont imposés au barème, les versements non déduits sont
            exonérés, et les gains supportent {pct(tauxPFU)} de prélèvement forfaitaire et{" "}
            {pct(psPer)} de prélèvements sociaux. Voyez{" "}
            <a href="/guide/fiscalite-sortie-per">le guide sur la fiscalité de la sortie</a> pour
            le détail.
          </p>

          <h3>Quels prélèvements sociaux sur la sortie d'un PER ?</h3>
          <p>
            {pct(psPer)} sur les gains depuis le 1er janvier 2026. Le capital correspondant aux
            versements n'est pas soumis aux prélèvements sociaux.
          </p>

          <h3>Rente ou capital : que choisir pour un PER ?</h3>
          <p>
            Cela dépend de votre besoin de revenu à vie, de vos autres ressources et de votre
            souhait de transmettre. La rente apporte un revenu régulier, le capital de la
            souplesse. Un arbitrage mixte est possible, au cas par cas.
          </p>

          <h3>Combien de temps pour récupérer son PER ?</h3>
          <p>
            Quelques semaines en général après une demande complète ; le délai exact dépend de
            l'organisme et des supports à désinvestir.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Liquider un PER n'est pas un geste administratif mais un choix fiscal et patrimonial :
            le formulaire est court, la décision ne l'est pas. Dans l'exemple de ce guide, la
            fiscalité d'un même capital de {euros(capital)} va de {euros(totalC)} à{" "}
            {euros(totalA)} selon l'origine des versements et le rythme de sortie. Simuler avant
            de signer coûte une heure ; l'omettre peut coûter plusieurs milliers d'euros.
          </p>
          <p>
            Pour poursuivre : la{" "}
            <a href="/guide/a-quel-age-recuperer-son-capital-retraite">
              page sur l'âge de récupération du capital retraite
            </a>{" "}
            précise le calendrier, la{" "}
            <a href="/strategies/decumulation">stratégie de décumulation</a> replace le PER dans
            l'ensemble de vos revenus, et si votre retraite approche, le{" "}
            <a href="/guide/preparer-sa-retraite-guide-complet">guide complet de préparation</a>{" "}
            donne le cadre global. Pour examiner votre situation avec un interlocuteur,{" "}
            <a href="/bilan-retraite">le bilan retraite gratuit de 15 minutes</a> est un point de
            départ.
          </p>

          <h2 id="aller-plus-loin">Pour aller plus loin</h2>
          <ul>
            <li><a href="/guide/fiscalite-sortie-per">Fiscalité de la sortie du PER</a></li>
            <li><a href="/guide/deblocage-anticipe-per">Déblocage anticipé du PER</a></li>
            <li><a href="/guide/rente-viagere-ou-retraits-programmes">Rente viagère ou retraits programmés</a></li>
            <li><a href="/guide/ordre-de-decaissement-retraite">Ordre de décaissement à la retraite</a></li>
            <li><a href="/guide/combien-retirer-par-mois-capital-retraite">Combien retirer par mois de son capital retraite</a></li>
          </ul>

          <h2 id="sources">Sources officielles</h2>
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

          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil personnalisé : elle se
              limite à une piste de réflexion à examiner cas par cas. Les règles fiscales et les
              taux cités sont ceux connus en {maj} ; la loi de finances et la loi de financement
              de la sécurité sociale pour 2027 n'étant pas adoptées à cette date, ils peuvent
              évoluer. Les exemples chiffrés sont des illustrations composites, sans promesse de
              rendement. Les supports en unités de compte présentent un risque de perte en
              capital, et les performances passées ne préjugent pas des performances futures.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Liquider un PER est une décision fiscale. Elle se simule avant de se signer." />
    </>
  );
}
