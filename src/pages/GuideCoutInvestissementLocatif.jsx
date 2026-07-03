import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RENDEMENTS,
  FRAIS_TYPES,
  FISCALITE,
  HYPOTHESES_MAJ,
  pct,
} from "../components/hypotheses.js";

export default function GuideCoutInvestissementLocatif() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Grille de coûts</span>
          <h1>Combien coûte réellement un investissement locatif ?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <p>
            Une annonce affichant {pct(RENDEMENTS.locatifDirect.max - 1.5)} à{" "}
            {pct(RENDEMENTS.locatifDirect.max)} de rendement brut fait naturellement de l'œil.
            Le problème n'est pas que ce chiffre soit faux : c'est qu'il ne mesure presque
            jamais ce que le propriétaire touchera vraiment. Entre le loyer annoncé et l'argent
            qui atterrit sur le compte, une succession de postes de coûts s'intercale — certains
            ponctuels, d'autres récurrents, certains visibles dès l'achat, d'autres qui
            n'apparaissent qu'à l'usage. Notre analyse détaille ici chacun d'entre eux, pour
            remplacer le rendement affiché par un ordre de grandeur du rendement réellement
            perçu.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#achat">Les coûts à l'achat</a></li>
              <li><a href="#credit">Le crédit et son assurance</a></li>
              <li><a href="#charges">Les charges récurrentes</a></li>
              <li><a href="#gestion">La gestion locative</a></li>
              <li><a href="#vacance">La vacance locative</a></li>
              <li><a href="#fiscalite">La fiscalité des loyers</a></li>
              <li><a href="#exemple">Un exemple chiffré, du brut au net</a></li>
              <li><a href="#tableau">Le récapitulatif en un tableau</a></li>
              <li><a href="#conclusion">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="achat">Les coûts à l'achat</h2>
          <p>
            Le premier prélèvement intervient avant même d'avoir touché un seul loyer. Dans
            l'ancien, les frais dits « de notaire » — qui recouvrent en réalité des droits
            d'enregistrement reversés au département et à l'État, la rémunération du notaire
            n'en représentant qu'une fraction — s'élèvent en ordre de grandeur à{" "}
            {pct(FRAIS_TYPES.immobilierLocatif.fraisNotaireAncien.min)}-
            {pct(FRAIS_TYPES.immobilierLocatif.fraisNotaireAncien.max)} du prix du bien (usages
            de marché en vigueur en {HYPOTHESES_MAJ}, à vérifier au cas par cas selon la
            localisation). Sur un achat à 200 000 €, cela représente déjà 14 000 à 16 000 €
            immobilisés dès le jour de la signature, avant tout rendement.
          </p>
          <p>
            S'y ajoutent, lorsque la transaction passe par un intermédiaire, des frais d'agence :
            leur montant varie fortement d'un mandat à l'autre et d'une région à l'autre, si bien
            qu'aucun ordre de grandeur national ne serait fiable ici — le montant exact figure
            systématiquement dans le mandat de vente et se négocie parfois. Ce qui compte, à ce
            stade, est de les intégrer au calcul de rentabilité au même titre que le prix du
            bien, et non de les traiter comme un détail annexe.
          </p>

          <h2 id="credit">Le crédit et son assurance</h2>
          <p>
            Quand l'achat est financé à crédit, deux lignes de coût s'ajoutent. Les intérêts
            d'abord, dont le montant total dépend du taux négocié et de la durée choisie — plus
            la durée s'allonge, plus la mensualité baisse mais plus le coût total du crédit
            augmente, un arbitrage qui se pose différemment selon qu'on cherche à maximiser le
            cash-flow mensuel ou à minimiser le coût final. L'assurance emprunteur ensuite,
            exigée par la banque pour garantir le remboursement en cas de décès ou d'invalidité
            de l'emprunteur (la garantie ADI, pour assurance décès-invalidité) : son taux dépend
            de l'âge, de l'état de santé et de la quotité assurée, si bien qu'aucun pourcentage
            générique ne serait honnête à afficher ici — seul un devis personnalisé le donne.
            Cette assurance protège d'abord la famille de l'emprunteur ; elle a aussi un coût
            réel, qui doit figurer dans le calcul du rendement net et non être oublié comme une
            simple formalité administrative.
          </p>

          <h2 id="charges">Les charges récurrentes</h2>
          <p>
            Une fois le bien acquis et loué, trois postes reviennent chaque année. La taxe
            foncière d'abord, dont le montant varie considérablement d'une commune à l'autre
            selon les taux votés localement — au point qu'un même bien peut supporter une taxe
            deux à trois fois supérieure selon sa ville, ce qui interdit tout chiffre national
            de référence : seul l'avis d'imposition du bien visé, ou celui d'un bien comparable
            dans le même secteur, donne une estimation fiable. Les charges de copropriété
            ensuite, lorsque le bien est en copropriété : une partie (les charges dites
            récupérables) peut être refacturée au locataire, l'autre reste définitivement à la
            charge du propriétaire. L'entretien et les travaux enfin — remise en état entre deux
            locataires, mise aux normes, rénovation énergétique — sont par nature irréguliers
            mais jamais nuls sur la durée de détention : un bien qui n'exige aucun entretien
            pendant dix ans finit presque toujours par en réclamer davantage l'année suivante.
          </p>

          <h2 id="gestion">La gestion locative</h2>
          <p>
            Deux options s'opposent ici, et aucune n'est gratuite. Confier la gestion à une
            agence — recherche de locataire, état des lieux, encaissement des loyers, suivi des
            travaux, gestion des impayés — coûte en ordre de grandeur{" "}
            {pct(FRAIS_TYPES.immobilierLocatif.fraisGestionLocative.min)}-
            {pct(FRAIS_TYPES.immobilierLocatif.fraisGestionLocative.max)} des loyers encaissés
            (usages de marché en vigueur en {HYPOTHESES_MAJ}, à vérifier selon le prestataire).
            Gérer soi-même évite cette ligne de frais, mais ne rend pas la gestion gratuite pour
            autant : elle se paie alors en temps et en disponibilité — répondre à un dégât des
            eaux un dimanche soir, relancer un loyer en retard, trouver un nouvel occupant —,
            une charge réelle qu'il est raisonnable de valoriser avant de la choisir par défaut.
          </p>

          <h2 id="vacance">La vacance locative</h2>
          <p>
            Entre le départ d'un locataire et l'entrée du suivant, le bien ne rapporte rien alors
            que la taxe foncière, d'éventuelles charges de copropriété et, le cas échéant, le
            crédit continuent de courir. C'est un coût invisible dans la plupart des simulations
            en ligne, qui raisonnent en général sur un taux d'occupation de 100 % — un scénario
            qui ne se vérifie presque jamais sur la durée complète d'une détention. Même un bien
            recherché, bien situé et correctement entretenu, connaît tôt ou tard une période sans
            occupant ; l'ignorer dans un calcul de rentabilité revient à présenter un rendement
            qui n'existera qu'une année sur plusieurs.
          </p>

          <h2 id="fiscalite">La fiscalité des loyers</h2>
          <p>
            Les loyers perçus sont imposés soit dans la catégorie des revenus fonciers (location
            nue), soit dans celle des bénéfices industriels et commerciaux ou BIC (location
            meublée), selon le régime choisi et ses règles propres d'abattement ou de charges
            déductibles — le comparatif entre les deux régimes mérite un examen à part entière,
            voir notre guide <a href="/guide/lmnp-ou-locatif-nu">LMNP ou locatif nu</a>. Dans les
            deux cas, l'impôt sur le revenu se double des prélèvements sociaux, au taux de{" "}
            {pct(FISCALITE.prelevementsSociaux.immobilier)} sur les revenus immobiliers (barème
            en vigueur en {HYPOTHESES_MAJ}). Pour un propriétaire déjà fortement imposé, la
            fiscalité peut ainsi absorber une part très significative du loyer perçu — c'est
            souvent le poste le plus sous-estimé par les simulateurs grand public, qui
            raisonnent en rendement brut et ne l'intègrent qu'en toute fin de calcul, quand ils
            l'intègrent.
          </p>

          <h2 id="exemple">Un exemple chiffré, du brut au net</h2>
          <p>
            Pour rendre ces postes concrets, prenons un cas d'école. Un bien acheté dans l'ancien
            affiche un rendement locatif brut nu de l'ordre de{" "}
            {pct(RENDEMENTS.locatifDirect.max)} — soit le haut de la fourchette{" "}
            {pct(RENDEMENTS.locatifDirect.min)}-{pct(RENDEMENTS.locatifDirect.max)} observée sur
            {" "}{RENDEMENTS.locatifDirect.periode} selon les villes ({RENDEMENTS.locatifDirect.source}
            ). Une fois déduits, dans l'ordre : l'amortissement des frais de notaire répartis sur
            la durée de détention, la gestion si elle est déléguée, une vacance locative même
            réduite, l'entretien courant, puis l'impôt sur le revenu et les prélèvements sociaux
            évoqués plus haut, ce même bien ne laisse plus, in fine, qu'un rendement net de
            l'ordre de {pct(RENDEMENTS.locatifDirect.min)} à {pct(RENDEMENTS.locatifDirect.moyen - 1)}
            . L'écart tient tout entier dans les postes détaillés ci-dessus : aucun d'eux n'est
            exceptionnel, et c'est justement leur addition silencieuse qui change la donne.
          </p>
          <div className="note">
            <p>
              Cet enchaînement est un ordre de grandeur illustratif construit à hypothèses
              fixées, pas une martingale ni une performance promise. L'écart réel entre brut et
              net varie fortement selon la ville, le régime fiscal retenu, le montant du crédit,
              la qualité de la gestion et la durée de détention : chaque situation doit être
              chiffrée individuellement, et les performances passées ne préjugent pas des
              performances futures.
            </p>
          </div>

          <h2 id="tableau">Le récapitulatif en un tableau</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Poste</th>
                  <th>Qui le paie</th>
                  <th>Ordre de grandeur</th>
                  <th>Au moment de quoi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frais de notaire (ancien)</td>
                  <td>Acquéreur</td>
                  <td>
                    {pct(FRAIS_TYPES.immobilierLocatif.fraisNotaireAncien.min)}-
                    {pct(FRAIS_TYPES.immobilierLocatif.fraisNotaireAncien.max)} du prix
                  </td>
                  <td>À la signature de l'achat</td>
                </tr>
                <tr>
                  <td>Frais d'agence</td>
                  <td>Acquéreur ou vendeur selon mandat</td>
                  <td>Variable, non chiffrable nationalement</td>
                  <td>À la signature de l'achat</td>
                </tr>
                <tr>
                  <td>Intérêts d'emprunt</td>
                  <td>Emprunteur</td>
                  <td>Fonction du taux et de la durée négociés</td>
                  <td>Chaque mensualité, sur la durée du crédit</td>
                </tr>
                <tr>
                  <td>Assurance emprunteur (ADI)</td>
                  <td>Emprunteur</td>
                  <td>Fonction de l'âge, de la santé, de la quotité</td>
                  <td>Chaque mensualité, sur la durée du crédit</td>
                </tr>
                <tr>
                  <td>Taxe foncière</td>
                  <td>Propriétaire</td>
                  <td>Variable selon la commune</td>
                  <td>Chaque année</td>
                </tr>
                <tr>
                  <td>Charges de copropriété non récupérables</td>
                  <td>Propriétaire</td>
                  <td>Variable selon l'immeuble</td>
                  <td>Chaque année</td>
                </tr>
                <tr>
                  <td>Entretien et travaux</td>
                  <td>Propriétaire</td>
                  <td>Irrégulier, jamais nul dans la durée</td>
                  <td>Selon l'usure et la réglementation (DPE...)</td>
                </tr>
                <tr>
                  <td>Gestion locative déléguée</td>
                  <td>Propriétaire</td>
                  <td>
                    {pct(FRAIS_TYPES.immobilierLocatif.fraisGestionLocative.min)}-
                    {pct(FRAIS_TYPES.immobilierLocatif.fraisGestionLocative.max)} des loyers
                  </td>
                  <td>Chaque mois, si gestion déléguée</td>
                </tr>
                <tr>
                  <td>Gestion locative directe</td>
                  <td>Propriétaire (en temps)</td>
                  <td>Non monétaire, à valoriser</td>
                  <td>En continu</td>
                </tr>
                <tr>
                  <td>Vacance locative</td>
                  <td>Propriétaire (loyer non perçu)</td>
                  <td>Variable, jamais nulle sur la durée</td>
                  <td>Entre deux locataires</td>
                </tr>
                <tr>
                  <td>Impôt sur le revenu (fonciers ou BIC)</td>
                  <td>Propriétaire</td>
                  <td>Fonction de la TMI et du régime choisi</td>
                  <td>Chaque année, à la déclaration</td>
                </tr>
                <tr>
                  <td>Prélèvements sociaux</td>
                  <td>Propriétaire</td>
                  <td>{pct(FISCALITE.prelevementsSociaux.immobilier)} des revenus nets</td>
                  <td>Chaque année, à la déclaration</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Les ordres de grandeur de ce tableau sont ceux en vigueur en {HYPOTHESES_MAJ} ; les
            usages de marché comme les barèmes fiscaux évoluent, et chaque ligne doit être
            revérifiée au moment du projet.
          </p>

          <h2 id="conclusion">Notre analyse, en synthèse</h2>
          <p>
            Le rendement brut affiché sur une annonce est un point de départ, jamais une
            conclusion. Il ignore par construction le notaire, le crédit et son assurance, les
            charges qui courent chaque année, la gestion — déléguée ou assumée soi-même —, la
            vacance qui s'invite tôt ou tard, et la fiscalité qui referme le calcul. Un bien ne
            se juge sérieusement qu'en flux net d'impôt et de charges, sur la durée réelle de
            détention — jamais sur le pourcentage annoncé en haut d'une annonce. C'est également
            ce qui explique pourquoi les mêmes fondamentaux, mal évalués, comptent parmi les
            erreurs les plus coûteuses du secteur : voir notre guide{" "}
            <a href="/guide/cinq-erreurs-investissement-locatif-retraite">
              les 5 erreurs de l'investissement locatif
            </a>
            , et, pour le cas spécifique de la location meublée, notre page{" "}
            <a href="/guide/lmnp-risques">les risques du LMNP</a>. Plus largement, la place de
            la pierre dans une stratégie de retraite se réfléchit dans son ensemble sur notre
            page <a href="/strategies/immobilier-retraite">immobilier et retraite</a>.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque projet locatif doit faire l'objet d'un chiffrage individuel.
              Les ordres de grandeur cités sont des usages de marché ou des barèmes en vigueur en{" "}
              {HYPOTHESES_MAJ}, susceptibles d'évoluer ; les rendements mentionnés sont des
              constats passés datés, et les performances passées ne préjugent pas des
              performances futures.
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
