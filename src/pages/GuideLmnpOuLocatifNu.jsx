import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RENDEMENTS,
  FISCALITE,
  HYPOTHESES_MAJ,
  pct,
} from "../components/hypotheses.js";

export default function GuideLmnpOuLocatifNu() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Comparatif locatif direct</span>
          <h1>LMNP ou locatif nu : lequel choisir pour la retraite ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <p>
            Deux façons de louer un même logement, deux régimes fiscaux qui n'ont presque rien en
            commun. Meublé ou nu, un investissement locatif en direct partage la même mécanique de
            base — un bien, un locataire, des loyers — mais la catégorie fiscale dans laquelle ces
            loyers tombent change à peu près tout : le mode de calcul de l'impôt, la lourdeur de la
            gestion, et souvent le montant qui reste net en poche chaque année.
          </p>
          <p>
            Notre analyse : opposer les deux comme s'il existait un vainqueur universel serait
            aussi trompeur que de choisir un statut fiscal pour son affichage plutôt que pour ce
            qu'il produit une fois votre situation posée. Cet article compare les deux régimes de
            location en direct — nu et meublé — pour vous aider à situer votre propre projet, sans
            aborder ici les véhicules de type pierre-papier, qui répondent à une autre logique et
            méritent leur propre examen.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#locatif-nu">Le locatif nu : revenus fonciers et simplicité relative</a></li>
              <li><a href="#lmnp">Le LMNP : loyers en BIC et amortissement</a></li>
              <li><a href="#tableau">Le comparatif en un tableau</a></li>
              <li><a href="#trancher">Ce qui doit vraiment trancher</a></li>
              <li><a href="#conclusion">Notre analyse, cas par cas</a></li>
            </ol>
          </div>

          <h2 id="locatif-nu">Le locatif nu : revenus fonciers et simplicité relative</h2>
          <p>
            Louer un logement non meublé place les loyers perçus dans la catégorie des revenus
            fonciers — la case fiscale historique de l'immobilier locatif. Deux régimes
            déclaratifs s'offrent alors à vous. Le micro-foncier applique un abattement forfaitaire
            (une réduction automatique, sans justificatif) de 30 % sur les loyers déclarés, sous
            conditions de plafond de recettes ; le solde s'ajoute à vos autres revenus. Le régime
            réel, lui, permet de déduire les charges effectivement payées — intérêts d'emprunt,
            travaux, taxe foncière, primes d'assurance — ce qui devient nettement plus avantageux
            dès que ces charges dépassent 30 % des loyers perçus, ce qui est fréquent les premières
            années d'un crédit.
          </p>
          <p>
            Dans les deux cas, le revenu net imposable s'ajoute au barème de l'impôt sur le revenu
            (il subit votre TMI, la tranche marginale d'imposition — le taux qui frappe la dernière
            tranche de vos revenus), auquel s'ajoutent les prélèvements sociaux de{" "}
            {pct(FISCALITE.prelevementsSociaux.immobilier)} (taux applicable aux revenus fonciers,
            non concerné par la hausse relevant d'autres enveloppes à {pct(FISCALITE.prelevementsSociaux.per)}{" "}
            depuis la LFSS 2026, barème en vigueur en {HYPOTHESES_MAJ}). Pour un contribuable dans
            une tranche haute, la charge fiscale totale sur les loyers nets peut ainsi dépasser le
            tiers de la somme perçue — un point à chiffrer avant, jamais après, la signature.
          </p>
          <p>
            Côté rendement, la location nue affiche des taux bruts généralement compris entre{" "}
            {pct(RENDEMENTS.locatifDirect.min)} et {pct(RENDEMENTS.locatifDirect.max)} selon les
            villes (ordres de grandeur {RENDEMENTS.locatifDirect.periode}, observatoires des
            loyers). « Brut » signifie avant vacance locative, travaux, charges non récupérables et
            fiscalité : ce constat passé ne préjuge en rien des loyers ou des prix futurs. En
            contrepartie de cette fiscalité moins travaillée, la location nue conserve deux atouts
            réels : une gestion administrative plus légère (pas de mobilier à inventorier, pas de
            comptabilité BIC à tenir) et un marché locatif plus large, porté par les familles et les
            locations de longue durée — des profils de locataires souvent plus stables qu'en meublé
            de courte ou moyenne durée.
          </p>

          <h2 id="lmnp">Le LMNP : loyers en BIC et amortissement</h2>
          <p>
            Louer le même logement meublé (équipé pour qu'un locataire puisse y vivre
            immédiatement, sans y apporter ses propres meubles) fait basculer les loyers dans une
            tout autre catégorie fiscale : les BIC (bénéfices industriels et commerciaux), le
            régime normalement réservé aux activités commerciales. C'est cette bascule qui donne
            son nom au statut LMNP (loueur en meublé non professionnel) et qui change la donne
            fiscale. Deux options s'offrent ici aussi : le micro-BIC, qui applique un abattement
            forfaitaire de 50 % sur les loyers déclarés — nettement plus généreux que le micro-foncier
            — ou le régime réel, qui permet de déduire les charges réelles et, surtout,
            l'amortissement (une charge comptable qui étale le prix du bien et du mobilier sur
            plusieurs années, sans sortie d'argent réelle).
          </p>
          <p>
            C'est ce mécanisme d'amortissement qui fait la réputation du LMNP au régime réel : il
            peut neutraliser une bonne partie, parfois la totalité, du revenu locatif imposable
            pendant plusieurs années. Nous ne redéveloppons pas ici le détail de ce mécanisme ni ses
            limites — la réintégration des amortissements à la revente, la dépendance à un
            exploitant en résidence gérée, l'instabilité récente du cadre fiscal — que nous
            traitons en profondeur dans notre guide{" "}
            <a href="/guide/lmnp-risques">LMNP : les risques que l'on vous cache</a>.
          </p>
          <p>
            Le rendement locatif brut du meublé se situe généralement entre{" "}
            {pct(RENDEMENTS.lmnp.min)} et {pct(RENDEMENTS.lmnp.max)} selon les villes (constats{" "}
            {RENDEMENTS.lmnp.periode}, observatoires des loyers) — un ordre de grandeur proche de
            celui du nu, la différence se jouant surtout après impôt plutôt qu'avant. Ce chiffre
            reste un constat passé, non une projection : ni les loyers ni la revente ne sont
            garantis. Notre analyse : à loyers bruts comparables, le régime réel du LMNP est
            souvent plus favorable fiscalement que le régime réel du nu, précisément parce que
            l'amortissement s'ajoute aux charges déductibles — un avantage qui grandit avec votre
            TMI. La contrepartie est réelle : une comptabilité dédiée (bilan simplifié, souvent
            confié à un expert-comptable), du mobilier à gérer et renouveler, et un marché locatif
            parfois plus étroit ou plus rotatif selon le type de bien et la zone.
          </p>

          <h2 id="tableau">Le comparatif en un tableau</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Locatif nu</th>
                  <th>LMNP (meublé)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Régime fiscal des loyers</td>
                  <td>Revenus fonciers (barème + prélèvements sociaux)</td>
                  <td>BIC (bénéfices industriels et commerciaux)</td>
                </tr>
                <tr>
                  <td>Abattement forfaitaire</td>
                  <td>30 % (micro-foncier, sous plafond de recettes)</td>
                  <td>50 % (micro-BIC, sous plafond de recettes)</td>
                </tr>
                <tr>
                  <td>Atout du régime réel</td>
                  <td>Déduction des charges réelles (intérêts, travaux, taxe foncière)</td>
                  <td>Déduction des charges réelles + amortissement du bien et du mobilier</td>
                </tr>
                <tr>
                  <td>Gestion requise</td>
                  <td>Relativement légère : pas de mobilier, pas de comptabilité BIC</td>
                  <td>Plus lourde : mobilier, bilan simplifié, souvent un expert-comptable</td>
                </tr>
                <tr>
                  <td>Rendement brut indicatif</td>
                  <td>
                    {pct(RENDEMENTS.locatifDirect.min)} à {pct(RENDEMENTS.locatifDirect.max)} selon
                    les villes ({RENDEMENTS.locatifDirect.periode})
                  </td>
                  <td>
                    {pct(RENDEMENTS.lmnp.min)} à {pct(RENDEMENTS.lmnp.max)} selon les villes (
                    {RENDEMENTS.lmnp.periode})
                  </td>
                </tr>
                <tr>
                  <td>Marché locatif</td>
                  <td>Plus large : familles, locations de longue durée</td>
                  <td>Souvent plus étroit ou plus rotatif selon la zone et le type de bien</td>
                </tr>
                <tr>
                  <td>Pour quel profil</td>
                  <td>Recherche de simplicité, TMI modérée, marché familial local porteur</td>
                  <td>TMI élevée, appétence pour la gestion ou un exploitant fiable, horizon long</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="note">
            Rendements bruts indicatifs, constatés sur les périodes citées : ils ne constituent ni
            une promesse ni une prévision. Les performances passées ne préjugent pas des
            performances futures, et aucun de ces deux régimes ne garantit ni les loyers ni le
            capital investi.
          </div>

          <h2 id="trancher">Ce qui doit vraiment trancher</h2>
          <p>
            Le rendement brut affiché est rarement le bon critère de départ — nu et meublé
            affichent des fourchettes voisines, et l'écart se joue ailleurs. Trois éléments
            devraient peser davantage dans l'arbitrage.
          </p>
          <p>
            <strong>Votre TMI, d'abord.</strong> Plus elle est élevée, plus l'amortissement du LMNP
            au régime réel a de poids : il neutralise un revenu qui, sans lui, serait taxé à un
            taux marginal important. À TMI basse, l'écart entre les deux régimes se resserre
            fortement, et la simplicité du nu peut reprendre l'avantage.
          </p>
          <p>
            <strong>Votre appétence pour la gestion, ensuite.</strong> Tenir une comptabilité BIC,
            gérer du mobilier, produire un bilan simplifié chaque année : ce n'est ni compliqué ni
            anodin. Un investisseur qui n'a ni le temps ni le goût pour cette charge administrative
            paiera cet inconfort, d'une façon ou d'une autre — en frais d'expert-comptable, en
            erreurs déclaratives, ou en simple lassitude qui pousse à revendre au mauvais moment.
          </p>
          <p>
            <strong>L'horizon de détention, enfin.</strong> Le LMNP au régime réel se pense sur une
            durée longue : c'est sur plusieurs années que l'amortissement déploie son effet, et une
            revente précoce peut en amoindrir l'intérêt réel, pour des raisons détaillées dans notre
            guide sur{" "}
            <a href="/guide/lmnp-risques">les risques du LMNP</a>. Le locatif nu n'échappe pas
            davantage à la question de l'horizon, mais la mécanique fiscale y est plus stable dans
            le temps, donc moins sensible au moment de la sortie.
          </p>

          <h2 id="conclusion">Notre analyse, cas par cas</h2>
          <p>
            Il n'existe pas de régime supérieur dans l'absolu : il existe des régimes mieux ou
            moins bien adaptés à une TMI, à un goût pour la gestion et à un horizon de détention
            donnés. Un cadre fortement imposé, prêt à s'investir dans le suivi comptable ou à
            confier son bien à un exploitant sérieux, a statistiquement plus à gagner du LMNP au
            régime réel. Un épargnant qui privilégie la simplicité, dispose d'une TMI plus modérée
            ou vise un marché locatif familial peut légitimement préférer le nu — sans que ce choix
            soit un renoncement financier.
          </p>
          <p>
            Ce comparatif ne couvre qu'un pan de la question : combien coûte réellement un tel
            projet une fois les frais de notaire, la gestion et la vacance locative intégrés (notre
            guide{" "}
            <a href="/guide/combien-coute-un-investissement-locatif">
              combien coûte un investissement locatif
            </a>{" "}
            détaille ce calcul), et quelles erreurs de méthode faussent le plus souvent la décision
            (voir{" "}
            <a href="/guide/cinq-erreurs-investissement-locatif-retraite">
              les 5 erreurs les plus coûteuses de l'investissement locatif retraite
            </a>
            ). Pour resituer nu et meublé dans l'ensemble des solutions immobilières envisageables
            à l'approche de la retraite, notre page{" "}
            <a href="/strategies/immobilier-retraite">l'immobilier dans la stratégie retraite</a>{" "}
            reprend la vue d'ensemble.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle. Les
              taux et abattements cités sont les barèmes en vigueur en {HYPOTHESES_MAJ},
              susceptibles d'évoluer à chaque loi de finances ; les rendements mentionnés sont des
              constats passés datés, et les performances passées ne préjugent pas des performances
              futures.
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
