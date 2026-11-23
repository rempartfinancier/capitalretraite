import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  IMMO,
  IMMO_EXEMPLES,
  FISCALITE,
  RENDEMENTS,
  FRAIS_TYPES,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const L = IMMO.lmnp;
const E = IMMO_EXEMPLES.lmnpGere;

const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " %";

// ---- Scénario illustratif : loyer = prix × rendement ; baisse imposée à la renégociation ----
const loyerInitial = (E.prixAcquisitionHT * E.rendementBrutSuppose) / 100;
const loyerApresBaisse = (loyerInitial * (100 - E.baisseLoyer)) / 100;
const perteAnnuelle = loyerInitial - loyerApresBaisse;
const rendementApresBaisse = (loyerApresBaisse / E.prixAcquisitionHT) * 100;

// ---- Fiscalité courante au micro-BIC (loyer sous le plafond) ----
const microBicApplicable = loyerInitial <= L.microBicLongueDuree;
const baseImposableMicroBic = (loyerInitial * (100 - L.microBicLongueDureeAbattement)) / 100;
const psMicroBic = (baseImposableMicroBic * L.psMeuble) / 100;

// ---- Frais de notaire dans le neuf, sur le prix (ordre de grandeur) ----
const notaireNeufMinEuros = (E.prixAcquisitionHT * L.notaireNeufMin) / 100;
const notaireNeufMaxEuros = (E.prixAcquisitionHT * L.notaireNeufMax) / 100;

const sources = [
  {
    label: "Service-Public.gouv.fr — Location meublée : régime fiscal, fiche F32744",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F32744",
  },
  {
    label:
      "Service-Public.gouv.fr — Prélèvements sociaux sur les revenus du patrimoine, fiche F2329",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2329",
  },
  {
    label:
      "impots.gouv.fr — FAQ sur le régime fiscal des locations meublées (mars 2026)",
    url: "https://www.impots.gouv.fr/sites/default/files/media/1_metier/5_international/actualite/faq-lmnp-03_2026.pdf",
  },
  {
    label: "impots.gouv.fr — Les régimes d'imposition",
    url: "https://www.impots.gouv.fr/particulier/les-regimes-dimposition",
  },
  {
    label:
      "impots.gouv.fr — Je donne un bien en location, dois-je payer des prélèvements sociaux ?",
    url: "https://www.impots.gouv.fr/particulier/questions/je-donne-un-bien-en-location-dois-je-payer-des-prelevements-sociaux",
  },
  {
    label: "impots.gouv.fr — Achat dans le neuf",
    url: "https://www.impots.gouv.fr/particulier/achat-dans-le-neuf",
  },
  {
    label:
      "BOFiP — Bénéfices industriels et commerciaux : champ d'application, location meublée (BOI-BIC-CHAMP-40-20, version du 19 août 2026)",
    url: "https://bofip.impots.gouv.fr/bofip/3610-PGP.html/identifiant=BOI-BIC-CHAMP-40-20-20260819",
  },
];

export default function GuideLmnpResidenceGeree() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Immobilier meublé · revenu complémentaire</span>
          <h1>LMNP en résidence gérée : senior, EHPAD, étudiante, que vaut ce revenu pour la retraite ?</h1>
          <p className="sub">
            Un logement acheté, un exploitant qui s'occupe de tout, un loyer qui arrive : la
            promesse est simple, la réalité mérite d'être lue en détail. Mis à jour le {IMMO.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> en LMNP en résidence gérée, vous achetez un logement
              dans une résidence et le louez, par un bail commercial, à un exploitant qui vous
              verse un loyer. Vous êtes déchargé de la gestion, mais vous dépendez d'un tiers :
              le loyer n'est ni garanti à vie ni forcément maintenu au renouvellement du bail.
              Avec les hypothèses de cet article, un loyer annuel de {euros(loyerInitial)} sur un
              logement acheté {euros(E.prixAcquisitionHT)} hors taxes tomberait à{" "}
              {euros(loyerApresBaisse)} après une baisse de {E.baisseLoyer} %, soit un rendement
              brut de {pct1(rendementApresBaisse)} au lieu de {pct1(E.rendementBrutSuppose)}.
              Le rendement brut n'est de toute façon pas le revenu net.
            </p>
          </div>

          <p>
            À l'approche de la retraite, l'idée d'un loyer « sans souci » séduit : pas de
            locataire à trouver, pas de travaux à superviser, un revenu qui arrive chaque
            trimestre. C'est ce que propose, dans sa présentation commerciale, la résidence
            gérée. Reste à savoir ce que l'on achète exactement, et ce que ce revenu pèse
            vraiment à côté des pensions et de l'épargne.
          </p>
          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel :
            Hélène, 58 ans, cadre, a reçu une proposition pour un studio dans une résidence
            services pour seniors. On lui parle d'un loyer régulier et d'un « statut fiscal
            avantageux ». Elle voudrait comprendre le montage avant de rencontrer un
            commercial. Cet article suit ce qu'elle devrait vérifier, étape par étape.
          </p>
          <p>
            Nous ne redéveloppons pas ici la liste des risques du LMNP, traitée dans{" "}
            <a href="/guide/lmnp-risques">LMNP : les risques que l'on vous cache</a>, ni la
            comparaison avec la location nue, traitée dans{" "}
            <a href="/guide/lmnp-ou-locatif-nu">LMNP ou locatif nu</a>. Cet article se concentre
            sur la résidence gérée elle-même : comment elle fonctionne, ses variantes, le revenu
            net qu'on peut en attendre et les questions à poser avant de signer.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#fonctionnement">Comment fonctionne concrètement une résidence gérée ?</a></li>
              <li><a href="#types">Senior, EHPAD, étudiante, tourisme : en quoi les résidences diffèrent-elles ?</a></li>
              <li><a href="#fiscalite">Quelle fiscalité courante sur les loyers ?</a></li>
              <li><a href="#questions">Que demander avant d'acheter ?</a></li>
              <li><a href="#scenario">Que devient le rendement si le loyer baisse ?</a></li>
              <li><a href="#place">Quelle place dans un revenu de retraite ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="fonctionnement">Comment fonctionne concrètement une résidence gérée ?</h2>
          <p>
            Vous achetez un lot (un logement, parfois avec une cave ou un parking) dans une
            résidence qui comprend d'autres lots appartenant à d'autres investisseurs.
            Vous signez ensuite un bail commercial, en général de longue durée, avec une société
            exploitante : c'est elle qui loue les logements aux occupants (étudiants, seniors,
            vacanciers…), gère l'accueil et les services, et vous verse un loyer. Vous n'avez
            donc aucun contact avec l'occupant.
          </p>
          <p>
            Le loyer est en principe dû même si le logement est vide : c'est l'exploitant qui
            porte le risque d'occupation, tant qu'il reste solvable. Le revers est la dépendance
            à cet exploitant : vous n'avez pas de locataire final à qui vous adresser en cas de
            difficulté.
          </p>
          <p>
            Côté achat, plusieurs points se vérifient :
          </p>
          <ul>
            <li>
              <strong>Le prix et la TVA.</strong> Dans une résidence neuve, le prix est souvent
              présenté hors taxes. La TVA est en général récupérable par le bailleur, sous
              conditions ; les modalités précises, et un éventuel reversement en cas de revente
              ou de sortie du dispositif, sont à confirmer au contrat et auprès d'un
              professionnel (voir la page impots.gouv.fr sur l'achat dans le neuf).
            </li>
            <li>
              <strong>Les frais de notaire.</strong> Dans le neuf, ils représentent de l'ordre de{" "}
              {L.notaireNeufMin} % à {L.notaireNeufMax} % du prix, contre {FRAIS_TYPES.immobilierLocatif.fraisNotaireAncien.min} % à{" "}
              {FRAIS_TYPES.immobilierLocatif.fraisNotaireAncien.max} % dans l'ancien (ordres de grandeur). Sur{" "}
              {euros(E.prixAcquisitionHT)}, cela donne environ {euros(notaireNeufMinEuros)} à{" "}
              {euros(notaireNeufMaxEuros)}.
            </li>
            <li>
              <strong>Les charges propriétaire.</strong> La taxe foncière reste à votre charge ;
              une cotisation foncière des entreprises (CFE) peut aussi être due selon votre
              situation. Les charges de copropriété sont souvent refacturées à l'exploitant,
              mais cela dépend du bail.
            </li>
          </ul>
          <p>
            Rappelons que le dispositif de réduction d'impôt Censi-Bouvard, souvent cité dans
            les anciennes brochures, ne concerne plus les acquisitions réalisées après le{" "}
            {L.censiBouvardFin}.
          </p>

          <h2 id="types">Senior, EHPAD, étudiante, tourisme : en quoi les résidences diffèrent-elles ?</h2>
          <p>
            Le montage juridique ressemble d'un type de résidence à l'autre. Ce qui change, ce
            sont le public, le niveau de services, la sensibilité à la conjoncture et, selon les
            sources consultées, certaines règles fiscales. Le tableau ci-dessous donne une
            lecture d'ensemble, volontairement prudente : chaque contrat et chaque texte doivent
            être lus pour la résidence concernée.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Type de résidence</th>
                  <th>Logique propre</th>
                  <th>Point de vigilance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Résidence services pour seniors (non médicalisée)</td>
                  <td>Logements autonomes, services collectifs payés par les résidents</td>
                  <td>Niveau des charges de services supportées par les occupants ; conditions fiscales particulières à vérifier au cas par cas dans les textes</td>
                </tr>
                <tr>
                  <td>Résidence médicalisée (EHPAD)</td>
                  <td>Établissement autorisé et encadré, tarifs en partie réglementés</td>
                  <td>Dépendance à l'autorisation et à l'équilibre économique de l'établissement ; règles sectorielles propres</td>
                </tr>
                <tr>
                  <td>Résidence étudiante</td>
                  <td>Occupation liée au calendrier universitaire, localisation près des campus</td>
                  <td>Attractivité de la ville et de l'établissement dans la durée ; vétusté des petites surfaces</td>
                </tr>
                <tr>
                  <td>Résidence de tourisme ou d'affaires</td>
                  <td>Séjours courts, saisonnalité, clientèle touristique ou professionnelle</td>
                  <td>Sensibilité à la conjoncture et à la fréquentation ; traitement fiscal à la revente détaillé dans notre article sur la réforme</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Pourquoi ces distinctions comptent-elles pour un futur retraité ? D'abord parce que
            la solidité du revenu dépend de la demande réelle pour ce type de logement dans cette
            ville. Ensuite parce que le traitement fiscal à la revente n'est pas le même pour
            toutes les résidences : certaines catégories sont mentionnées comme exceptions par
            la loi, d'autres semblent a priori concernées. Le détail figure dans notre article{" "}
            <a href="/guide/lmnp-reforme-amortissement-plus-value">
              LMNP : amortissement et plus-value, ce que change la réintégration à la revente
            </a>
            .
          </p>

          <h2 id="fiscalite">Quelle fiscalité courante sur les loyers ?</h2>
          <p>
            Les loyers de location meublée sont imposés dans la catégorie des bénéfices
            industriels et commerciaux (BIC), non en revenus fonciers. Le loueur en meublé est
            dit non professionnel (LMNP) tant que ses recettes annuelles ne dépassent pas{" "}
            {euros(L.seuilRecettesLmp)}, ou ne dépassent pas ses autres revenus d'activité du
            foyer : la bascule en loueur professionnel suppose de dépasser ce seuil{" "}
            <em>et</em> ces autres revenus.
          </p>
          <p>Deux régimes s'offrent à vous :</p>
          <ul>
            <li>
              <strong>Le micro-BIC</strong> : un abattement forfaitaire de{" "}
              {L.microBicLongueDureeAbattement} % sur les recettes, avec un plafond de{" "}
              {euros(L.microBicLongueDuree)} de recettes pour les revenus 2025 (location
              longue durée, tourisme classé). Un abattement minimum de{" "}
              {euros(L.abattementMinimumMicroBic)} s'applique. Pour le tourisme non classé, le
              plafond est de {euros(L.microBicTourismeNonClasse)} avec un abattement de{" "}
              {L.microBicTourismeNonClasseAbattement} %. Pour 2026, des montants révisés
              existent : à confirmer sur impots.gouv.fr.
            </li>
            <li>
              <strong>Le régime réel</strong> : vous déduisez les charges réelles et
              l'amortissement du logement (hors terrain) et du mobilier. L'amortissement ne peut
              ni créer ni augmenter un déficit : l'éventuel surplus est reportable. Un déficit
              proprement dit ne s'impute que sur les revenus meublés, avec un report possible sur{" "}
              {L.deficitReportAnnees} ans.
            </li>
          </ul>
          <p>
            Les prélèvements sociaux sur les revenus meublés sont de {pct(L.psMeuble)} selon
            impots.gouv.fr, à la différence des revenus fonciers ({pct(FISCALITE.prelevementsSociaux.immobilier)}). L'impôt sur le revenu
            s'y ajoute au barème, selon votre tranche d'imposition.
          </p>
          <div className="note">
            <p>
              <strong>Ce que cela donne avec nos hypothèses.</strong> Un loyer annuel de{" "}
              {euros(loyerInitial)}
              {microBicApplicable
                ? " reste sous le plafond du micro-BIC cité ci-dessus"
                : " dépasse le plafond du micro-BIC cité ci-dessus"}
              . Au micro-BIC, l'abattement de {L.microBicLongueDureeAbattement} % laisse une base
              imposable de {euros(baseImposableMicroBic)} ; les prélèvements sociaux à{" "}
              {pct(L.psMeuble)} représentent alors environ {euros(psMicroBic)}, auxquels
              s'ajoute l'impôt sur le revenu à votre tranche. Ce calcul est simplifié : il ignore
              la taxe foncière, la CFE, les frais de comptabilité éventuels et le choix du
              régime réel.
            </p>
          </div>
          <p>
            Pour comparer ce régime au locatif nu, notre guide{" "}
            <a href="/guide/lmnp-ou-locatif-nu">LMNP ou locatif nu</a> détaille les deux
            fiscalités.
          </p>

          <h2 id="questions">Que demander avant d'acheter ?</h2>
          <p>
            Beaucoup de désillusions viennent de questions qui n'ont pas été posées. Voici une
            liste de contrôle, à compléter avec un professionnel indépendant de la vente :
          </p>
          <ul>
            <li>
              <strong>Le bail commercial.</strong> Quelle durée ? Quelles conditions de
              renouvellement ? Que dit-il d'une résiliation par l'exploitant ou par vous ?
              Le principe du statut des baux commerciaux prévoit en général une indemnité en cas
              de non-renouvellement par le bailleur ; à confirmer au contrat.
            </li>
            <li>
              <strong>Le loyer et son indexation.</strong> Le montant est-il fixe ou indexé ?
              Sur quel indice ? Existe-t-il une clause de révision à la baisse ?
            </li>
            <li>
              <strong>Les comptes de l'exploitant.</strong> Demandez ses derniers comptes
              publiés, son ancienneté, le nombre de résidences gérées. Des procédures
              collectives d'exploitants de résidences gérées ont été rendues publiques ces
              dernières années : ce n'est pas un jugement sur un acteur en particulier, mais un
              rappel que le risque est réel.
            </li>
            <li>
              <strong>Le taux d'occupation de la résidence.</strong> Sur plusieurs années, et pas
              seulement la dernière. Un taux d'occupation faible fragilise la capacité de
              l'exploitant à payer ses loyers.
            </li>
            <li>
              <strong>Les charges refacturées.</strong> Qu'est-ce qui reste à votre charge :
              taxe foncière, assurance, gros travaux, renouvellement du mobilier ? Qu'est-ce qui
              est refacturé à l'exploitant ?
            </li>
            <li>
              <strong>La revente.</strong> Combien de lots de la résidence sont-ils en vente
              aujourd'hui ? À quel prix ? La revente d'un lot dépend de la demande des autres
              investisseurs, pas d'un marché de résidents.
            </li>
            <li>
              <strong>Le coût total.</strong> Prix, frais de notaire, honoraires éventuels de
              commercialisation, frais d'un expert-comptable : voir notre guide sur{" "}
              <a href="/guide/combien-coute-un-investissement-locatif">
                le coût d'un investissement locatif
              </a>
              .
            </li>
          </ul>
          <p>
            Enfin, fiez-vous aux documents, pas à la présentation : une brochure n'est pas un
            engagement. Seuls le bail et les comptes font foi.
          </p>

          <h2 id="scenario">Que devient le rendement si le loyer baisse ?</h2>
          <p>
            Le rendement brut d'un logement meublé se situe typiquement entre{" "}
            {pct(RENDEMENTS.lmnp.min)} et {pct(RENDEMENTS.lmnp.max)} selon les villes
            (constats {RENDEMENTS.lmnp.periode}, ordre de grandeur). C'est un rapport entre le loyer
            annuel et le prix d'achat : il ne tient compte ni des frais, ni des charges, ni de
            l'impôt, ni de la vacance, ni de la revente. Ce n'est donc pas ce que vous touchez
            réellement.
          </p>
          <p>
            Voyons un scénario défavorable, purement illustratif. On suppose un logement acheté{" "}
            {euros(E.prixAcquisitionHT)} hors taxes avec un rendement brut de{" "}
            {pct1(E.rendementBrutSuppose)}, puis une renégociation qui impose une baisse de loyer de{" "}
            {E.baisseLoyer} %.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Situation</th>
                  <th>Loyer annuel</th>
                  <th>Rendement brut</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Au départ</td>
                  <td>{euros(loyerInitial)}</td>
                  <td>{pct1(E.rendementBrutSuppose)}</td>
                </tr>
                <tr>
                  <td>Après une baisse de {E.baisseLoyer} %</td>
                  <td>{euros(loyerApresBaisse)}</td>
                  <td>{pct1(rendementApresBaisse)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            La baisse représente {euros(perteAnnuelle)} par an, et elle porterait sur toute la
            durée du nouveau bail. À cela s'ajoutent les charges propriétaire et l'impôt, qui
            ne baissent pas en proportion. Ce scénario n'est pas une prévision : il montre
            seulement la sensibilité du revenu à la négociation du bail.
          </p>
          <div className="note">
            <p>
              <strong>« Revenu viager » : une expression à manier avec prudence.</strong> Un bail
              long peut donner l'impression d'une rente à vie. Ce n'est pas le cas : une rente
              viagère est un engagement d'un assureur qui verse un revenu jusqu'au décès. Un
              loyer de résidence gérée dure tant que l'exploitant est solvable et que le bail est
              maintenu ou renouvelé aux mêmes conditions, ce que rien ne garantit. Vos
              loyers ne s'arrêtent pas à votre décès : le logement fait partie de votre
              patrimoine et se transmet avec le contrat.
            </p>
          </div>

          <h2 id="place">Quelle place dans un revenu de retraite ?</h2>
          <p>
            Dans un revenu de retraite, il faut distinguer ce qui est garanti de ce qui ne l'est
            pas. Les pensions de base et complémentaires sont versées à vie. Un loyer de
            résidence gérée est un revenu non garanti : il peut être renégocié à la baisse,
            retardé ou interrompu. Il a toutefois un avantage réel sur la location directe : vous
            n'avez pas à gérer le logement, ce qui compte à l'âge où l'on veut réduire sa charge
            mentale.
          </p>
          <p>
            Mais « pas de gestion » ne veut pas dire « pas de risque » : on remplace une
            charge de gestion par une dépendance à un tiers. La question n'est donc pas
            seulement « combien rapporte-t-il ? », mais « de quelle part de mon revenu puis-je me
            permettre de dépendre d'un seul exploitant, dans un seul immeuble ? ». Une piste de
            réflexion consiste à regarder le montant du loyer net rapporté à l'ensemble de vos
            revenus de retraite, et à vous demander ce qui se passerait s'il baissait de moitié
            ou s'arrêtait pendant un an.
          </p>
          <p>
            Pour situer ce revenu dans l'ensemble, nos pages sur{" "}
            <a href="/strategies/immobilier-retraite">l'immobilier dans la stratégie retraite</a>{" "}
            et sur{" "}
            <a href="/guide/cinq-erreurs-investissement-locatif-retraite">
              les cinq erreurs de l'investissement locatif
            </a>{" "}
            donnent le cadre ; la logique d'une comparaison avec d'autres supports se lit dans{" "}
            <a href="/guide/per-ou-immobilier-locatif">PER ou immobilier locatif</a> et{" "}
            <a href="/guide/immobilier-locatif-ou-assurance-vie">
              immobilier locatif ou assurance-vie
            </a>
            .
          </p>
          <p>
            Pour ceux qui cherchent une exposition immobilière sans bail commercial ni exploitant
            unique, une autre famille de placements existe : voir notre guide sur{" "}
            <a href="/guide/scpi-preparer-sa-retraite">les SCPI pour préparer sa retraite</a>, qui
            a ses propres risques (revenus et capital non garantis, liquidité). Pour une
            souscription accompagnée ou une comparaison, vous pouvez consulter{" "}
            <a href="https://scpirentable.fr" target="_blank" rel="noopener noreferrer">
              scpirentable.fr
            </a>{" "}
            ou{" "}
            <a href="https://immobilierpassif.com" target="_blank" rel="noopener noreferrer">
              immobilierpassif.com
            </a>
            .
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Le loyer est-il vraiment garanti dans une résidence gérée ?</h3>
          <p>
            Il est dû contractuellement par l'exploitant, y compris si le logement est vide,
            tant que celui-ci est solvable. « Garanti » désigne l'engagement du bail, pas une
            protection contre la défaillance de l'exploitant ou une renégociation à la baisse.
          </p>
          <h3>Peut-on investir en résidence gérée au régime micro-BIC ?</h3>
          <p>
            Oui, si les recettes restent sous les plafonds ({euros(L.microBicLongueDuree)} pour
            les revenus 2025 en longue durée ou tourisme classé). Le choix du régime se discute
            avec un expert-comptable, car l'amortissement ne se déduit qu'au régime réel, et
            cet amortissement a des conséquences à la revente : voir{" "}
            <a href="/guide/lmnp-reforme-amortissement-plus-value">notre article sur la réforme</a>.
          </p>
          <h3>Une résidence pour seniors ou un EHPAD est-il plus sûr qu'une résidence étudiante ?</h3>
          <p>
            Nous ne pouvons pas l'affirmer. Chaque type de résidence a sa demande, ses règles et
            son exploitant. La question utile reste la même : quelle est la solidité de
            l'exploitant, et quel est l'équilibre économique de cette résidence-là ?
          </p>
          <h3>Que se passe-t-il si l'exploitant fait défaut ?</h3>
          <p>
            Selon les cas, les loyers peuvent être suspendus ou réduits, le temps de trouver
            un repreneur ou de renégocier avec d'autres exploitants. La situation dépend du bail
            et de la procédure éventuellement ouverte. Notre article{" "}
            <a href="/guide/lmnp-risques">LMNP : les risques que l'on vous cache</a> détaille
            cette dépendance.
          </p>
          <h3>Ce revenu est-il adapté à une transmission ?</h3>
          <p>
            Le logement se transmet comme un bien immobilier, avec le bail en cours. La
            question de la transmission est traitée plus largement dans{" "}
            <a href="/guide/donation-ou-assurance-vie-transmission">
              donation ou assurance-vie pour transmettre
            </a>
            .
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            La résidence gérée retire la gestion du quotidien mais pas le risque : vous remplacez
            un locataire par un exploitant unique, avec un revenu qui dépend de son équilibre
            économique et de la négociation du bail. À {pct1(E.rendementBrutSuppose)} de rendement
            brut, une baisse de loyer de {E.baisseLoyer} % ramène le rendement à{" "}
            {pct1(rendementApresBaisse)} : l'écart se paie en revenu de retraite. Le rendement
            brut n'est pas le net, et le revenu n'est pas viager.
          </p>
          <p>
            Si le sujet vous concerne, trois repères : lisez le bail et les comptes de
            l'exploitant avant tout ; ne dépendez pas d'une seule résidence pour une part
            importante de votre revenu ; regardez l'effet de la revente, détaillé dans notre
            article sur la réforme. Votre ordre de décaissement, c'est-à-dire la façon dont vous
            puiserez dans vos différents revenus et placements, se réfléchit avec l'ensemble de
            votre patrimoine : voir{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement à la retraite</a>
            . Pour estimer vos pensions, le <a href="/simulateur-retraite">simulateur retraite</a>{" "}
            donne un premier ordre de grandeur, et le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> permet de replacer
            ce projet dans une vue d'ensemble.
          </p>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées le {IMMO.maj} :</p>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Les règles
              citées sont celles publiées au {IMMO.maj} et peuvent évoluer. Les exemples chiffrés
              sont des illustrations pédagogiques, établies sur des hypothèses affichées,
              composites et sans lien avec un cas réel ; ils ne préjugent ni de votre situation,
              ni des loyers, ni des règles futures. Les rendements cités sont des ordres de
              grandeur passés, non garantis.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Un revenu complémentaire se pèse dans l'ensemble de votre retraite." />
    </>
  );
}
