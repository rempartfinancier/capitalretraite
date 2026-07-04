import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { RENDEMENTS, FISCALITE, FRAIS_TYPES, pct } from "../components/hypotheses.js";

export default function StrategieImmobilier() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Stratégie 05</span>
          <h1>L'immobilier dans la stratégie retraite : le flux plutôt que la pierre</h1>
          <p className="sub">
            L'immobilier peut financer une retraite — à condition de le penser comme une source de
            revenus, pas comme une collection de biens.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>La SCPI à crédit : construire un revenu futur avec l'argent de la banque</h2>
          <p>
            Une SCPI (société civile de placement immobilier, souvent surnommée « pierre-papier »)
            met en commun l'épargne de nombreux investisseurs pour acheter et gérer un parc
            immobilier — bureaux, commerces, santé, logistique, résidentiel. En échange de ses
            parts, chaque associé perçoit sa quote-part des loyers, sans aucune gestion : la
            société de gestion s'occupe de tout, et se rémunère pour cela.
          </p>
          <p>
            Acheter des parts de SCPI à crédit à 48-52 ans, c'est faire financer par l'emprunt un
            revenu qui se libère au moment où le crédit s'éteint — idéalement autour du départ en
            retraite. Les loyers remboursent une partie des mensualités pendant la vie active, puis
            deviennent un complément de revenu. Le mécanisme est séduisant, mais il suppose de bien
            choisir ses SCPI, de comprendre leur fiscalité et d'accepter les risques propres à la
            pierre-papier (revenus et capital non garantis, liquidité limitée).
          </p>
          <p>
            Notre analyse : la SCPI est un véhicule pertinent pour un objectif précis — percevoir
            un revenu régulier sans s'imposer la moindre gestion locative —, et c'est d'ailleurs
            auprès des profils proches de la retraite qu'elle trouve le plus souvent sa place. À
            trois conditions : examiner de près les frais d'entrée (historiquement de l'ordre de{" "}
            {pct(FRAIS_TYPES.scpiEntree.min)} à {pct(FRAIS_TYPES.scpiEntree.max)} sur les SCPI
            classiques), juger la qualité réelle du patrimoine détenu, et ne
            jamais concentrer une part excessive de son épargne sur ce seul support. Les écarts de
            qualité entre SCPI sont majeurs : sur ce marché, la sélection fait presque tout —
            c'est précisément l'objet de{" "}
            <a href="https://scpirentable.fr" target="_blank" rel="noopener noreferrer">
              scpirentable.fr
            </a>
            , où vit notre analyse détaillée, véhicule par véhicule.
          </p>
          <p>
            Côté chiffres : le taux de distribution (le revenu annuel versé, rapporté au prix de la
            part) moyen des SCPI s'est établi à {pct(RENDEMENTS.scpi.moyen)} en{" "}
            {RENDEMENTS.scpi.periode}, la plupart des véhicules se situant entre{" "}
            {pct(RENDEMENTS.scpi.min)} et {pct(RENDEMENTS.scpi.max)} (source : ASPIM/IEIF). Ce
            constat passé ne préjuge en rien des distributions futures : ni le revenu ni le
            capital ne sont garantis, le prix des parts peut baisser — parfois fortement —, et la
            revente des parts n'est jamais assurée à tout moment (liquidité limitée).
          </p>
          <p>
            Nous ne développons pas ici l'analyse détaillée des SCPI : pour comparer les véhicules
            immobiliers entre eux, consultez{" "}
            <a href="https://immobilierpassif.com" target="_blank" rel="noopener noreferrer">
              immobilierpassif.com
            </a>{" "}
            ; pour souscrire une SCPI avec accompagnement, rendez-vous sur{" "}
            <a href="https://scpirentable.fr" target="_blank" rel="noopener noreferrer">
              scpirentable.fr
            </a>
            .
          </p>

          <h2>Le LMNP : des revenus locatifs à la fiscalité travaillée</h2>
          <p>
            Le LMNP (loueur en meublé non professionnel) est un statut fiscal, pas un produit : il
            s'applique dès lors que vous louez un logement meublé (équipé pour qu'un locataire
            puisse y vivre immédiatement) sans en faire votre activité principale. Les loyers ne
            relèvent alors pas des revenus fonciers (la catégorie d'imposition des loyers de
            locations nues) mais des bénéfices industriels et commerciaux (BIC), avec deux options
            déclaratives : le micro-BIC, qui applique un abattement forfaitaire sur les loyers
            sans rien déclarer d'autre, ou le régime réel, qui permet de déduire toutes les
            charges effectivement payées — intérêts d'emprunt, travaux, assurances, honoraires de
            comptabilité.
          </p>
          <p>
            L'atout du régime réel tient à l'amortissement comptable : chaque année, une fraction
            du prix du bien et du mobilier est comptée en charge, pour refléter leur usure
            théorique. Cette charge « sur le papier » ne coûte rien en trésorerie, mais elle vient
            réduire — parfois neutraliser pendant plusieurs années — le revenu imposable tiré des
            loyers.
          </p>
          <p>
            La location meublée non professionnelle permet, via le régime réel et l'amortissement
            du bien, de percevoir des loyers dont la part imposable est durablement réduite. En
            contrepartie : une gestion plus active qu'une SCPI, une comptabilité dédiée, et une
            dépendance au marché locatif local. Pour un futur retraité, la vraie question est
            souvent : « ai-je envie de gérer un bien à 70 ans ? »
          </p>
          <p>
            Notre analyse — formulée ici avec prudence, car le meublé en direct appelle plus que
            tout autre support une étude au cas par cas : le mécanisme de l'amortissement est
            réellement efficace, et c'est précisément pour cette raison que sa fiscalité évolue.
            La réforme adoptée en 2025, qui réintègre les amortissements déduits dans le calcul de
            la plus-value imposable à la revente, pénalise d'abord les investisseurs qui revendent
            tôt : sur une détention très longue, son impact relatif diminue, tandis qu'une revente
            précoce peut transformer une partie de l'avantage fiscal accumulé en supplément
            d'impôt. Quant au LMNP dit « géré » en résidences de services (étudiantes, seniors,
            tourisme), où un exploitant prend la gestion en charge via un bail commercial, il
            supprime la charge locative du quotidien mais déplace le risque : tout repose alors
            sur la solidité de l'exploitant, l'emplacement et le type de résidence — trois
            critères à examiner sans complaisance avant de signer. Notre guide{" "}
            <a href="/guide/lmnp-risques">les risques du LMNP</a> détaille chacun de ces points
            au-delà de l'argument de vente habituel, et{" "}
            <a href="/guide/lmnp-ou-locatif-nu">LMNP ou locatif nu</a> compare les deux régimes si
            vous hésitez encore sur le montage à privilégier.
          </p>
          <p>
            Côté rendement, la location meublée dégage un rendement locatif brut généralement
            compris entre {pct(RENDEMENTS.lmnp.min)} et {pct(RENDEMENTS.lmnp.max)} selon les
            villes (constats {RENDEMENTS.lmnp.periode}, observatoires des loyers). « Brut »
            signifie avant tout le reste : vacance locative (les périodes sans locataire),
            travaux, charges non récupérables, frais de gestion et fiscalité. Le flux net
            réellement encaissé est systématiquement inférieur, et ces constats passés ne
            préjugent ni des loyers ni des prix futurs.
          </p>
          <div className="note">
            Le cadre fiscal de la location meublée a évolué récemment et reste mouvant : les
            règles citées ici (régimes déclaratifs, amortissements, plus-values) sont à vérifier à
            la date de votre projet. Cette analyse est générale et ne constitue pas un conseil en
            investissement personnalisé.
          </div>

          <h2>L'immobilier locatif en direct : le levier pendant la vie active, la charge après</h2>
          <p>
            Le principe est le plus ancien qui soit : acheter un logement, le louer nu (non
            meublé) et percevoir des loyers. Ces loyers sont imposés en revenus fonciers, selon
            deux régimes : le micro-foncier, qui applique un abattement forfaitaire de 30 % sur
            les loyers déclarés (sous conditions de plafond), ou le régime réel, qui déduit les
            charges effectivement payées (intérêts d'emprunt, travaux, taxe foncière). Le solde
            s'ajoute à vos autres revenus et subit votre TMI (tranche marginale d'imposition — le
            taux qui frappe la dernière tranche de vos revenus), plus les prélèvements sociaux de{" "}
            {pct(FISCALITE.prelevementsSociaux.immobilier)} (taux applicable aux revenus fonciers,
            non concerné par la hausse LFSS 2026 réservée à d'autres enveloppes).
          </p>
          <p>
            Notre analyse : pendant la vie active, le locatif en direct dispose d'un atout que peu
            de placements financiers peuvent égaler — l'effet de levier du crédit, c'est-à-dire la
            possibilité d'investir l'argent de la banque avec un apport limité, pendant que les
            loyers remboursent une partie des mensualités. Ce crédit embarque une protection
            souvent sous-estimée : l'assurance emprunteur (l'assurance décès-invalidité exigée par
            la banque), qui solde le capital restant dû en cas de coup dur — une protection
            familiale intégrée au financement.
          </p>
          <p>
            À la retraite, en revanche, la question change de nature. Le levier s'éteint avec le
            crédit, et il reste la gestion : locataires, vacance, travaux, déclarations — une
            charge bien réelle à 75 ans —, ainsi qu'une fiscalité lourde, puisque les loyers
            s'ajoutent à la pension et sont imposés au barème, prélèvements sociaux en sus.
            Méfiez-vous aussi des fausses boussoles entretenues par certains contenus de
            vulgarisation : le prix au mètre carré ne dit rien de la rentabilité d'une opération,
            et la quête du « cash-flow positif » à tout prix (exiger que les loyers dépassent la
            mensualité dès le premier jour) conduit souvent à des choix contre-productifs — depuis
            les règles d'endettement du HCSF (Haut Conseil de stabilité financière — taux d'effort plafonné à 35 %), la stratégie
            d'accumulation de biens en série n'est de toute façon plus accessible au commun des
            épargnants — notre guide{" "}
            <a href="/guide/cinq-erreurs-investissement-locatif-retraite">
              les 5 erreurs les plus coûteuses de l'investissement locatif
            </a>{" "}
            revient en détail sur ces fausses boussoles. À titre d'illustration : un bien payé
            comptant qui affiche 5 % bruts peut, une fois déduits taxe foncière, charges, entretien
            et impôts, ne laisser que 2 à 3 % nets — ordre de grandeur constaté en cabinet, variable
            selon les villes et les situations ; notre guide{" "}
            <a href="/guide/combien-coute-un-investissement-locatif">
              combien coûte réellement un investissement locatif
            </a>{" "}
            détaille poste par poste ce calcul du brut au net. Notre grille de lecture : la pierre
            se juge en flux net d'impôt et de charges, rapporté à l'argent réellement sorti de sa
            poche — jamais en rendement brut affiché.
          </p>
          <p>
            Les rendements locatifs bruts constatés en location nue se situent, selon les villes,
            entre {pct(RENDEMENTS.locatifDirect.min)} et {pct(RENDEMENTS.locatifDirect.max)}{" "}
            (ordres de grandeur {RENDEMENTS.locatifDirect.periode}, observatoires des loyers) —
            avant vacance, travaux, charges et fiscalité. Ni les loyers ni la valeur du bien ne
            sont garantis, et ces constats passés ne préjugent pas des performances futures.
          </p>

          <h2>SCPI, LMNP, locatif direct : le comparatif</h2>
          <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Critère</th>
                <th>SCPI</th>
                <th>LMNP (meublé)</th>
                <th>Locatif nu en direct</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ticket d'entrée</td>
                <td>Faible : quelques centaines d'euros la part</td>
                <td>Élevé : le prix d'un logement (crédit possible)</td>
                <td>Élevé : le prix d'un logement (crédit possible)</td>
              </tr>
              <tr>
                <td>Gestion requise</td>
                <td>Aucune — déléguée à la société de gestion, qui se rémunère en frais</td>
                <td>Réelle : locataires, mobilier, comptabilité — délégable à un exploitant (résidences gérées)</td>
                <td>Réelle : locataires, travaux, déclarations — délégable à une agence, contre honoraires</td>
              </tr>
              <tr>
                <td>Liquidité</td>
                <td>Limitée : revente des parts non garantie, dépendante du marché</td>
                <td>Faible : vendre un bien prend des mois</td>
                <td>Faible : vendre un bien prend des mois</td>
              </tr>
              <tr>
                <td>Fiscalité des revenus</td>
                <td>Revenus fonciers : barème (TMI) + prélèvements sociaux de {pct(FISCALITE.prelevementsSociaux.immobilier)}</td>
                <td>BIC : l'amortissement du régime réel peut réduire fortement la part imposable</td>
                <td>Revenus fonciers : micro-foncier (abattement 30 %) ou régime réel</td>
              </tr>
              <tr>
                <td>Rendement indicatif (brut, non garanti)</td>
                <td>
                  {pct(RENDEMENTS.scpi.min)} à {pct(RENDEMENTS.scpi.max)} de taux de distribution
                  en {RENDEMENTS.scpi.periode} (ASPIM/IEIF)
                </td>
                <td>
                  {pct(RENDEMENTS.lmnp.min)} à {pct(RENDEMENTS.lmnp.max)} bruts selon les villes
                  ({RENDEMENTS.lmnp.periode})
                </td>
                <td>
                  {pct(RENDEMENTS.locatifDirect.min)} à {pct(RENDEMENTS.locatifDirect.max)} bruts
                  selon les villes ({RENDEMENTS.locatifDirect.periode})
                </td>
              </tr>
              <tr>
                <td>Risques principaux</td>
                <td>Baisse du prix de part, revenus non garantis, liquidité pouvant se gripper, frais d'entrée</td>
                <td>Vacance, défaillance de l'exploitant (en géré), évolution fiscale, revente longue</td>
                <td>Vacance, impayés, travaux, concentration du capital sur un seul bien</td>
              </tr>
              <tr>
                <td>Pour quel profil</td>
                <td>Recherche d'un revenu régulier sans gestion, en acceptant frais et liquidité limitée</td>
                <td>Investisseur prêt à s'impliquer — ou à sélectionner rigoureusement un exploitant — sur un horizon long</td>
                <td>Patrimoine en construction pendant la vie active, avec du temps et de l'énergie pour gérer</td>
              </tr>
            </tbody>
          </table>
          </div>
          <div className="note">
            Rendements bruts indicatifs, constatés sur les périodes citées : ils ne constituent ni
            une promesse ni une prévision. Les performances passées ne préjugent pas des
            performances futures, et aucun de ces supports ne garantit le capital investi.
          </div>
          <p>
            L'immobilier n'est pas la seule voie pour se constituer un capital pendant la vie
            active : notre guide{" "}
            <a href="/guide/immobilier-locatif-ou-assurance-vie">
              immobilier locatif ou assurance-vie
            </a>{" "}
            met en regard l'effet de levier du crédit et la polyvalence sans emprunt de
            l'assurance-vie, pour trancher selon votre goût pour la gestion et votre besoin de
            liquidité.
          </p>

          <h2>L'usufruit temporaire : acheter du revenu pour une durée choisie</h2>
          <p>
            Acquérir l'usufruit temporaire de parts de SCPI (5, 10, 15 ans), c'est acheter à prix
            décoté un flux de revenus pour une période définie — par exemple pour couvrir les
            années entre un départ anticipé et la liquidation des pensions. À l'échéance,
            l'usufruit s'éteint : le capital n'est pas récupéré. C'est un outil de flux pur, à
            manier avec un objectif précis.
          </p>

          <h2>Le démembrement : préparer la transmission en même temps que la retraite</h2>
          <p>
            À l'inverse, acheter la nue-propriété (d'un bien ou de parts de SCPI) permet de se
            constituer un capital à prix réduit, qui se reconstitue en pleine propriété à
            l'échéance — sans revenus pendant la période, donc sans fiscalité. Une brique
            pertinente pour qui n'a pas besoin de revenus immédiats et pense déjà à la transmission.
            Notre guide{" "}
            <a href="/guide/per-ou-immobilier-locatif">
              PER ou immobilier locatif pour transmettre
            </a>{" "}
            compare cette logique à l'abattement successoral du PER assurantiel, pour ceux qui
            hésitent entre les deux leviers de protection familiale.
          </p>

          <h2>Ce que l'immobilier ne fait pas</h2>
          <ul>
            <li>Il n'offre aucune garantie de revenu ni de valeur — vacance, impayés, cycles de marché existent ;</li>
            <li>Il est peu liquide : on ne vend pas un bien ou des parts de SCPI en quelques jours sans concession sur le prix ;</li>
            <li>Sa fiscalité (revenus fonciers, IFI — impôt sur la fortune immobilière) peut éroder fortement le rendement net selon votre situation.</li>
          </ul>

          <div className="note">
            Piste de réflexion : dans une stratégie retraite, l'immobilier se dose. La bonne
            question n'est pas « faut-il de l'immobilier ? » mais « quelle part de mes revenus
            futurs doit venir de la pierre, et sous quelle forme ? ».
          </div>

          <p>
            Enfin, posséder de la pierre n'est que la moitié du chemin : vendre, démembrer ou
            convertir l'immobilier en revenus réguliers au moment voulu est un arbitrage à part
            entière — nous le détaillons dans notre page consacrée à{" "}
            <a href="/strategies/decumulation">la décumulation</a> (l'organisation des retraits et
            de la consommation du patrimoine à la retraite).
          </p>

          <AuthorBox />
          <RiskNotice />
        </div>
      </section>

      <CtaBanner title="Quelle place pour la pierre dans vos revenus de retraite ?" button="Prendre rendez-vous" />
    </>
  );
}
