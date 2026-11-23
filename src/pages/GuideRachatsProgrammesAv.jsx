import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RACHATS_PROGRAMMES,
  FISCALITE,
  AV_RACHAT,
  euros,
  pct,
} from "../components/hypotheses.js";

// ---- Paramètres : tout vient de hypotheses.js ----
const R = RACHATS_PROGRAMMES;
const duree = AV_RACHAT.dureeTauxReduitAnnees;
const abattementSeul = FISCALITE.avAbattementAnnuelSeul;
const abattementCouple = FISCALITE.avAbattementAnnuelCouple;
const tauxPS = FISCALITE.prelevementsSociaux.assuranceVie;

const pct1 = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + " %";
const eurosPrecis = (n) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

// ---- Exemple : part de gains = rachat × (1 − primes non remboursées / valeur) ----
const valeur = R.valeurContratIllustrative;
const primes = R.primesNonRembourseesIllustratives;
const mensuel = R.montantMensuelIllustratif;
const nbRachats = 12;
const partGainsContrat = (1 - primes / valeur) * 100; // 28 %
const gainsParRachat = (montant) => (montant * (1 - primes / valeur));
const rachatAnnuel = (montant) => montant * nbRachats;
const gainsAnnuels = (montant) => gainsParRachat(montant) * nbRachats;
const psAnnuels = (montant) => (gainsAnnuels(montant) * tauxPS) / 100;
const depassementAbattement = (montant, abattement) =>
  Math.max(gainsAnnuels(montant) - abattement, 0);
const tauxRetraitAnnuel = (montant) => (rachatAnnuel(montant) / valeur) * 100;
const multiples = [0.5, 1, 1.5, 2];

const sources = [
  {
    label:
      "Service-Public.gouv.fr — Impôt sur le revenu : comment sont imposés les revenus d'un contrat d'assurance-vie ? Fiche F22414, vérifiée le 15 avril 2026 (acompte, dispense d'acompte, abattement)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F22414",
  },
  {
    label:
      "BOFiP — BOI-RPPM-RCM-20-10-20-50, produits des bons ou contrats de capitalisation et d'assurance-vie : calcul du produit imposable d'un rachat partiel (version en vigueur depuis le 30 juin 2022)",
    url: "https://bofip.impots.gouv.fr/bofip/3951-PGP.html",
  },
  {
    label:
      "BOFiP — BOI-RPPM-RCM-20-15, modalités d'imposition à l'impôt sur le revenu (version en vigueur depuis le 21 juin 2021)",
    url: "https://bofip.impots.gouv.fr/bofip/11224-PGP.html",
  },
  {
    label:
      "impots.gouv.fr — Les revenus mobiliers (mise à jour du 8 avril 2026) : prélèvements sociaux applicables aux produits d'assurance-vie",
    url: "https://www.impots.gouv.fr/particulier/les-revenus-mobiliers",
  },
  {
    label:
      "Légifrance — Code de la sécurité sociale, art. L. 136-8, IV, 4° (version en vigueur depuis le 27 juin 2026) : prélèvements sociaux sur les produits des contrats d'assurance-vie",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051287395",
  },
  {
    label: "AMF — Épargnants : assurance-vie et placements (rubrique grand public)",
    url: "https://www.amf-france.org",
  },
];

export default function GuideRachatsProgrammesAv() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Assurance-vie · revenu régulier</span>
          <h1>Rachats programmés d'assurance-vie : mettre en place un revenu régulier à la retraite</h1>
          <p className="sub">
            Un virement automatique depuis votre contrat, comme un complément de pension. Mis à jour
            en {R.maj}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> le rachat programmé est un ordre permanent donné à
              l'assureur : il prélève un montant (ou un pourcentage) sur le contrat à intervalles
              réguliers — {R.frequencesCourantes.join(", ")} selon les contrats — et le verse sur
              votre compte. Seule la part de gains de chaque rachat est imposée, pas le capital
              restitué. Le revenu n'est pas garanti : il s'épuise si le rythme dépasse ce que le
              contrat produit, et il réduit le capital transmis aux bénéficiaires.
            </p>
          </div>

          <p>
            Prenons une situation illustrative et composite, qui ne correspond à aucun cas réel :
            Hélène, 64 ans, vient de prendre sa retraite. Elle détient un contrat d'assurance-vie de{" "}
            {euros(valeur)}, ouvert depuis plus de {duree} ans, dont les primes non remboursées
            s'élèvent à {euros(primes)}. Sa pension couvre l'essentiel de ses dépenses, mais elle
            souhaiterait un complément de {euros(mensuel)} par mois, sans avoir à y penser chaque
            mois.
          </p>
          <p>
            Le rachat programmé répond à ce besoin d'organisation. Il ne répond pas, en revanche, à la
            question du bon niveau de retrait, ni à celle du bon support à vendre. Cet article
            explique le mécanisme, les réglages à vérifier dans votre contrat et les pièges. La
            fiscalité détaillée d'un rachat est traitée dans notre guide sur{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">
              l'imposition d'un rachat partiel d'assurance-vie
            </a>{" "}
            ; nous l'appliquons ici à un cas de revenu régulier.
          </p>

          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#principe">Qu'est-ce qu'un rachat programmé d'assurance-vie ?</a></li>
              <li><a href="#mise-en-place">Comment mettre en place des rachats programmés ?</a></li>
              <li><a href="#supports">Quels supports vendre, et que devient le fonds en euros ?</a></li>
              <li><a href="#exemple">Combien d'impôt sur {euros(mensuel)} de rachat programmé par mois ?</a></li>
              <li><a href="#acompte">Acompte et dispense d'acompte : que prévoit-on ?</a></li>
              <li><a href="#erreurs">Quelles erreurs éviter ?</a></li>
              <li><a href="#rente">Rachats programmés ou rente viagère ?</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
              <li><a href="#sources">Sources officielles</a></li>
            </ol>
          </div>

          <h2 id="principe">Qu'est-ce qu'un rachat programmé d'assurance-vie ?</h2>
          <p>
            Un rachat est le retrait d'une partie de l'épargne d'un contrat. Le rachat programmé
            automatise ce retrait : vous fixez une fois pour toutes un montant, une fréquence et un
            compte de destination, et l'assureur exécute l'ordre jusqu'à ce que vous le modifiiez
            ou l'arrêtiez. Les fréquences couramment proposées sont les suivantes : mensuelle,
            trimestrielle, semestrielle ou annuelle ; toutes ne sont pas offertes par chaque
            contrat, et les conditions générales font foi.
          </p>
          <p>
            Contrairement à une rente viagère, le contrat reste le vôtre : le capital demeure
            disponible, transmissible, et vous gardez la main sur le montant. L'envers de cette
            souplesse est que rien ne garantit que le revenu dure aussi longtemps que vous. Ce
            compromis est détaillé dans notre comparaison{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">rente viagère ou retraits programmés</a>.
            Le rachat programmé est l'une des briques de la phase de décaissement, présentée dans
            notre page{" "}
            <a href="/strategies/decumulation">stratégie de décumulation</a>, et se prête
            particulièrement à l'<a href="/strategies/assurance-vie-retraite">assurance-vie comme
            outil de retraite</a>.
          </p>

          <h2 id="mise-en-place">Comment mettre en place des rachats programmés ?</h2>
          <p>
            La démarche est généralement simple, mais les options varient d'un assureur à l'autre.
            Voici les points à régler, dans l'ordre.
          </p>
          <ol>
            <li>
              <strong>Choisir entre un montant fixe et un pourcentage.</strong> Un montant fixe
              donne un revenu prévisible, mais il pèse davantage si la valeur du contrat baisse.
              Un pourcentage de la valeur suit le contrat : le revenu varie, mais il se réduit
              automatiquement quand le contrat recule. Tous les contrats ne proposent pas les deux
              formules.
            </li>
            <li>
              <strong>Fixer la fréquence.</strong> Une fréquence plus élevée lisse le revenu ;
              une fréquence plus faible réduit le nombre d'opérations. Le choix tient d'abord à
              votre rythme de dépenses.
            </li>
            <li>
              <strong>Désigner les supports vendus</strong> (voir la section suivante) et le compte
              bancaire de destination, à votre nom.
            </li>
            <li>
              <strong>Vérifier les conditions du contrat</strong> : montant minimum par rachat,
              éventuels frais, préavis de modification, possibilité de suspendre sans frais. Ces
              éléments figurent dans les conditions générales ou la notice, ou se demandent à
              l'assureur.
            </li>
            <li>
              <strong>Prévoir une revue régulière</strong>, au moins chaque année : valeur du
              contrat, montant retiré, besoin réel. Un rachat programmé qui n'est jamais relu cesse
              vite d'être adapté.
            </li>
          </ol>

          <h2 id="supports">Quels supports vendre, et que devient le fonds en euros ?</h2>
          <p>
            Quand le contrat est investi à la fois en fonds en euros et en unités de compte,
            la question n'est pas seulement « combien retirer », mais aussi « sur quoi prélever ».
            Selon les contrats, le rachat programmé peut être réparti au prorata des supports, ou
            imputé sur un support désigné ; certains permettent de combiner l'ordre permanent avec
            des arbitrages automatiques. À vérifier dans les conditions générales.
          </p>
          <ul>
            <li>
              <strong>Prélèvement au prorata.</strong> Il conserve la répartition d'origine du
              contrat, mais vend aussi des unités de compte lors des périodes de baisse.
            </li>
            <li>
              <strong>Prélèvement sur le fonds en euros.</strong> Il évite de vendre des supports
              en baisse, mais l'épuise plus vite ; le fonds en euros bénéficie d'une garantie du
              capital par l'assureur, dont la portée dépend du contrat, et son rendement n'est pas
              garanti d'une année sur l'autre.
            </li>
            <li>
              <strong>Poche de sécurité alimentée par arbitrage.</strong> Certains épargnants
              conservent plusieurs années de retraits sur le fonds en euros et alimentent
              périodiquement cette poche par arbitrage depuis les unités de compte. C'est une piste
              de réflexion, pas une recommandation : les frais d'arbitrage éventuels, le risque de
              perte en capital sur les unités de compte et la fiscalité à chaque rachat restent à
              examiner cas par cas.
            </li>
          </ul>
          <p>
            Cette organisation s'inscrit dans la question plus large de l'ordre dans lequel on
            puise dans ses enveloppes, traitée dans notre guide sur{" "}
            <a href="/guide/ordre-de-decaissement-retraite">l'ordre de décaissement à la retraite</a>.
          </p>

          <h2 id="exemple">Combien d'impôt sur {euros(mensuel)} de rachat programmé par mois ?</h2>
          <p>
            Pour mesurer l'effet fiscal d'un rachat programmé, il faut appliquer au contrat la
            règle de la part de gains, développée dans notre{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">guide sur le rachat partiel</a>
            . Elle revient à ne taxer que la fraction du rachat qui correspond aux gains
            du contrat : <strong>rachat × (1 − primes non remboursées ÷ valeur du contrat)</strong>.
          </p>
          <div className="note">
            <p>
              Exemple purement illustratif. Hypothèses : contrat ouvert depuis plus de {duree} ans,
              valeur de {euros(valeur)}, primes non remboursées de {euros(primes)}, toutes versées à
              compter du {AV_RACHAT.datePivotPrimes} ; {nbRachats} rachats mensuels de{" "}
              {euros(mensuel)} ; prélèvements sociaux à {pct(tauxPS)}, supposés non encore prélevés
              sur ces gains ; contribuable sans autre produit d'assurance-vie dans l'année. En
              réalité, la valeur du contrat varie avec les marchés et les rachats, ce qui fait
              évoluer la part de gains d'un mois sur l'autre : l'exemple est volontairement
              simplifié à valeur constante.
            </p>
          </div>
          <ol>
            <li>
              Part de gains du contrat : 1 − {euros(primes)} ÷ {euros(valeur)} ={" "}
              <strong>{pct1(partGainsContrat)}</strong>.
            </li>
            <li>
              Gains inclus dans chaque rachat : {euros(mensuel)} × {pct1(partGainsContrat)} ={" "}
              <strong>{euros(gainsParRachat(mensuel))}</strong>.
            </li>
            <li>
              Sur {nbRachats} mois : {euros(rachatAnnuel(mensuel))} retirés, dont{" "}
              <strong>{euros(gainsAnnuels(mensuel))}</strong> de gains.
            </li>
            <li>
              Abattement annuel après {duree} ans : {euros(abattementSeul)} pour une personne seule,{" "}
              {euros(abattementCouple)} pour un couple soumis à imposition commune. Ici, les gains
              de {euros(gainsAnnuels(mensuel))} sont inférieurs à l'un comme à l'autre : aucun
              impôt sur le revenu sur cette part, sous les hypothèses posées.
            </li>
            <li>
              Les prélèvements sociaux, eux, ne bénéficient pas de l'abattement :{" "}
              {euros(gainsAnnuels(mensuel))} × {pct(tauxPS)} ={" "}
              <strong>{eurosPrecis(psAnnuels(mensuel))}</strong> sur l'année.
            </li>
          </ol>
          <p>
            Le seuil de {euros(AV_RACHAT.seuilPrimesTauxReduit)} de primes non remboursées, qui
            conditionne le taux d'impôt réduit, est ici dépassé ; il ne modifie pas ce résultat
            puisque l'abattement absorbe tous les gains, mais il compte dès que les gains dépassent
            l'abattement. Le détail est dans le guide sur le rachat partiel. Pour voir comment le
            résultat évolue avec le niveau de retrait, voici la même mécanique pour d'autres
            montants mensuels :
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Rachat mensuel</th>
                  <th>Retiré sur l'année</th>
                  <th>Part de la valeur du contrat</th>
                  <th>Gains de l'année</th>
                  <th>Prélèvements sociaux</th>
                  <th>Gains au-delà de l'abattement (personne seule)</th>
                  <th>Gains au-delà de l'abattement (couple)</th>
                </tr>
              </thead>
              <tbody>
                {multiples.map((m) => {
                  const montant = mensuel * m;
                  return (
                    <tr key={m}>
                      <td>{euros(montant)}</td>
                      <td>{euros(rachatAnnuel(montant))}</td>
                      <td>{pct1(tauxRetraitAnnuel(montant))}</td>
                      <td>{euros(gainsAnnuels(montant))}</td>
                      <td>{eurosPrecis(psAnnuels(montant))}</td>
                      <td>{euros(depassementAbattement(montant, abattementSeul))}</td>
                      <td>{euros(depassementAbattement(montant, abattementCouple))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p>
            La dernière colonne de chaque côté indique la part des gains qui serait soumise à
            l'impôt sur le revenu ; son taux (forfaitaire ou barème) se détermine selon l'ancienneté
            du contrat, les primes et votre situation, comme l'explique le guide sur le rachat
            partiel. Ces chiffres ne valent que pour l'exemple : un contrat dont les gains pèsent
            davantage verrait la part imposable augmenter à retrait égal.
          </p>

          <h2 id="acompte">Acompte et dispense d'acompte : que prévoit-on ?</h2>
          <p>
            À chaque rachat, l'assureur prélève les prélèvements sociaux et, en principe, un acompte
            d'impôt sur la part de gains. L'impôt définitif est calculé l'année suivante à partir de
            la déclaration de revenus, et c'est à ce moment que l'abattement intervient. Pour un
            revenu régulier, cela signifie que l'acompte prélevé chaque mois peut dépasser l'impôt
            final et être restitué ensuite.
          </p>
          <p>
            Il est possible de demander à être dispensé de l'acompte si le revenu fiscal de référence
            de l'avant-dernière année est inférieur à {euros(AV_RACHAT.rfrDispenseAcompteSeul)} pour
            une personne seule ou à {euros(AV_RACHAT.rfrDispenseAcompteCouple)} pour un couple soumis
            à imposition commune. La demande doit parvenir à l'assureur au plus tard le{" "}
            {AV_RACHAT.dateLimiteDemandeDispense} de l'année qui précède le rachat (fiche F22414 de
            Service-Public). La dispense n'efface pas l'impôt : elle évite seulement de
            l'avancer. Les conditions exactes se vérifient auprès de l'assureur et de l'administration
            fiscale.
          </p>

          <h2 id="erreurs">Quelles erreurs éviter ?</h2>
          <ul>
            <li>
              <strong>Un rythme trop élevé.</strong> Retirer chaque année une part importante de la
              valeur du contrat — dans notre exemple, {pct1(tauxRetraitAnnuel(mensuel))} avec{" "}
              {euros(mensuel)} par mois, et davantage avec des montants plus élevés — suppose que le
              contrat produise assez pour compenser. Sinon, le capital s'érode, et d'autant plus
              vite que les marchés reculent en début de période de retraits.
            </li>
            <li>
              <strong>Un rachat qui vide le contrat sans le dire.</strong> Un ordre permanent à
              montant fixe continue de s'exécuter tant que le contrat le permet ; quand la valeur
              devient insuffisante, le comportement dépend du contrat (rachat du solde, blocage,
              clôture). Il est prudent de savoir ce qui se passe, et de surveiller la valeur.
            </li>
            <li>
              <strong>Oublier la clause bénéficiaire.</strong> Les capitaux retirés ne seront pas
              transmis ; ce qui reste dans le contrat l'est selon la clause. Un contrat qui se vide
              progressivement change l'équation de la transmission, et la clause se relit à
              chaque évolution de situation familiale.
            </li>
            <li>
              <strong>Ignorer l'impôt prélevé en cours d'année.</strong> L'acompte et les
              prélèvements sociaux réduisent le montant net reçu. Un virement de {euros(mensuel)}{" "}
              brut ne se traduit pas par {euros(mensuel)} nets sur le compte.
            </li>
            <li>
              <strong>Croire que la part de gains reste fixe.</strong> Elle évolue avec la valeur du
              contrat : une bonne année la fait monter, une mauvaise la fait baisser, et les rachats
              réduisent peu à peu le poids des primes restantes.
            </li>
            <li>
              <strong>Ne pas relire les conditions du contrat.</strong> Frais, minimum, fréquences,
              suspension : chaque assureur a ses règles.
            </li>
          </ul>

          <h2 id="rente">Rachats programmés ou rente viagère ?</h2>
          <p>
            Les deux produisent un revenu régulier, mais ne répondent pas au même risque. La rente
            viagère garantit un revenu à vie en échange du capital ; le rachat programmé laisse le
            capital disponible mais fait porter à l'épargnant le risque de marché et le risque de
            longévité. Les arguments de chaque côté sont présentés dans notre guide sur{" "}
            <a href="/guide/rente-viagere-ou-retraits-programmes">rente viagère ou retraits programmés</a>{" "}
            et dans celui consacré aux{" "}
            <a href="/guide/inconvenients-rente-viagere">inconvénients de la rente viagère</a>. Pour
            évaluer le niveau de retrait compatible avec la durée de vie que vous envisagez, notre
            guide <a href="/guide/combien-retirer-par-mois-capital-retraite">combien retirer par mois de son capital retraite</a>{" "}
            propose une méthode.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Qu'est-ce qu'un rachat programmé en assurance-vie ?</h3>
          <p>
            C'est un ordre permanent par lequel l'assureur retire automatiquement un montant du
            contrat et le verse sur votre compte, à la fréquence choisie. Les fréquences courantes
            sont mensuelle, trimestrielle, semestrielle ou annuelle selon les contrats.
          </p>
          <h3>Un rachat programmé est-il imposé différemment d'un rachat ponctuel ?</h3>
          <p>
            Non. Chaque versement est un rachat partiel et suit les mêmes règles : seule la part de
            gains est imposée, après application éventuelle de l'abattement annuel. Voir notre
            guide sur{" "}
            <a href="/guide/rachat-partiel-assurance-vie-imposition">l'imposition d'un rachat partiel</a>.
          </p>
          <h3>Peut-on modifier ou arrêter un rachat programmé ?</h3>
          <p>
            En général oui, par demande à l'assureur, avec un éventuel délai de prise en compte
            prévu au contrat. Les conditions générales précisent les modalités.
          </p>
          <h3>Combien d'impôt sur un rachat programmé de {euros(mensuel)} par mois ?</h3>
          <p>
            Dans notre exemple simplifié, les gains de l'année ({euros(gainsAnnuels(mensuel))}) sont
            inférieurs à l'abattement de {euros(abattementSeul)} : pas d'impôt sur le revenu sur
            cette part, mais {eurosPrecis(psAnnuels(mensuel))} de prélèvements sociaux. Votre situation
            peut différer sensiblement.
          </p>
          <h3>Qu'est-ce que la dispense d'acompte ?</h3>
          <p>
            C'est la possibilité, sous condition de revenu fiscal de référence, de demander à
            l'assureur de ne pas prélever d'acompte d'impôt à chaque rachat. Le seuil est de{" "}
            {euros(AV_RACHAT.rfrDispenseAcompteSeul)} pour une personne seule et de{" "}
            {euros(AV_RACHAT.rfrDispenseAcompteCouple)} pour un couple ; la demande est à faire avant
            le {AV_RACHAT.dateLimiteDemandeDispense} de l'année précédente.
          </p>
          <h3>Que se passe-t-il quand le contrat est vide ?</h3>
          <p>
            Cela dépend du contrat : le dernier rachat peut solder le contrat, qui est alors
            clôturé. Le plus sûr est de lire les conditions générales avant de programmer des
            montants élevés.
          </p>
          <h3>Les rachats programmés réduisent-ils la somme transmise à mes héritiers ?</h3>
          <p>
            Oui : ce qui est retiré sort du contrat et n'est plus transmis par la clause
            bénéficiaire. La stratégie de retrait et la stratégie de transmission se pensent
            ensemble.
          </p>
          <h3>Vaut-il mieux retirer sur le fonds en euros ou sur les unités de compte ?</h3>
          <p>
            Il n'existe pas de réponse unique. Chaque option a ses avantages et ses risques ; elle
            dépend du contrat, de vos autres ressources et de votre tolérance à la baisse de valeur.
            C'est un point à examiner cas par cas.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le rachat programmé est un outil d'organisation avant d'être une stratégie : il rend
            régulier un revenu que l'on aurait sinon à retirer à la main. Il laisse le capital
            disponible et transmissible, et son régime fiscal profite de l'abattement annuel après{" "}
            {duree} ans de contrat. En contrepartie, le revenu n'est pas garanti, et le niveau de
            retrait reste de la responsabilité de l'épargnant.
          </p>
          <p>
            Avant de programmer, trois vérifications : la part de gains du contrat (pour évaluer
            l'impôt), le rythme annuel rapporté à la valeur (pour juger de la durabilité) et les
            règles du contrat (supports prélevés, frais, arrêt). Notre{" "}
            <a href="/simulateur-retraite">simulateur de retraite</a> permet d'estimer l'écart à
            combler entre pension et revenu visé, et le{" "}
            <a href="/bilan-retraite">bilan retraite gratuit de 15 minutes</a> sert à replacer ce
            choix dans l'ensemble de votre patrimoine.
          </p>

          <h2 id="sources">Sources officielles</h2>
          <p>Sources consultées en {R.maj} :</p>
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
              Cette analyse est générale et ne constitue pas un conseil personnalisé. Le placement
              en assurance-vie comporte un risque de perte en capital sur les unités de compte ; les
              performances passées ne préjugent pas des performances futures. Les règles fiscales
              citées sont celles publiées en {R.maj} et peuvent évoluer ; les exemples chiffrés sont
              des illustrations pédagogiques composites, établies sur des hypothèses affichées, qui
              ne correspondent à aucun cas réel. Les modalités des rachats programmés dépendent de
              chaque contrat : référez-vous à vos conditions générales et faites confirmer votre
              situation fiscale.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Un revenu régulier à la retraite se prépare contrat en main." />
    </>
  );
}
