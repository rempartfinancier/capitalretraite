import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import { FISCALITE, HYPOTHESES_MAJ, pct } from "../components/hypotheses.js";

// Les 6 cas de déblocage anticipé prévus par le Code monétaire et financier
// (art. L224-4, issu de la loi Pacte du 22 mai 2019) — utilisés dans le
// tableau de vue d'ensemble.
const CAS_DEBLOCAGE = [
  {
    situation: "Décès du conjoint marié ou du partenaire de Pacs",
    fiscalite: "Capital exonéré d'impôt, seuls les gains sont taxés",
    ancre: "#conjoint",
  },
  {
    situation: "Invalidité (2ᵉ ou 3ᵉ catégorie) du titulaire, du conjoint ou d'un enfant",
    fiscalite: "Capital exonéré d'impôt, seuls les gains sont taxés",
    ancre: "#invalidite",
  },
  {
    situation: "Situation de surendettement reconnue",
    fiscalite: "Capital exonéré d'impôt, seuls les gains sont taxés",
    ancre: "#surendettement",
  },
  {
    situation: "Expiration des droits à l'assurance chômage",
    fiscalite: "Capital exonéré d'impôt, seuls les gains sont taxés",
    ancre: "#chomage",
  },
  {
    situation: "Liquidation judiciaire de l'activité non salariée",
    fiscalite: "Capital exonéré d'impôt, seuls les gains sont taxés",
    ancre: "#liquidation-judiciaire",
  },
  {
    situation: "Achat de la résidence principale",
    fiscalite: "Versements déduits réintégrés au barème de l'impôt sur le revenu",
    ancre: "#residence-principale",
  },
];

export default function GuideDeblocageAnticipePer() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Guide — cas légaux et fiscalité</span>
          <h1>Déblocage anticipé du PER : les 6 cas pour récupérer votre épargne avant la retraite</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> un PER reste, par principe, bloqué jusqu'à la retraite.
              La loi Pacte prévoit toutefois six exceptions limitativement énumérées : cinq
              « accidents de la vie » (décès du conjoint ou du partenaire de Pacs, invalidité,
              surendettement, fin des droits au chômage, liquidation judiciaire de son activité) et
              l'achat de la résidence principale. Dans les cinq premiers cas, le capital débloqué est
              totalement exonéré d'impôt sur le revenu — seuls les gains restent taxés. Pour la
              résidence principale, en revanche, les versements déduits sont réintégrés au barème,
              comme pour une sortie classique à la retraite. Un compartiment échappe presque toujours
              à ce déblocage : les versements obligatoires (employeur ou salarié) d'un PER
              collectif d'entreprise, sauf pour les cinq accidents de la vie.
            </p>
          </div>
          <p>
            « Votre argent est bloqué jusqu'à la retraite » est l'objection la plus fréquente contre
            le PER — et elle n'est vraie qu'aux deux tiers. Elle décourage certains lecteurs
            d'ouvrir un PER par prudence légitime, alors que la loi a prévu, dès l'origine, des
            soupapes précises pour les coups durs de la vie et pour un projet immobilier. Notre
            analyse détaille les six cas, ce qu'ils couvrent réellement, ce qu'ils excluent, et la
            fiscalité qui s'applique à chacun — sans quoi la décision d'ouvrir ou non un PER reste
            prise sur une peur mal informée plutôt que sur les règles réelles.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#vue-ensemble">Les 6 cas en un coup d'œil</a></li>
              <li><a href="#conjoint">Décès du conjoint ou du partenaire de Pacs</a></li>
              <li><a href="#invalidite">Invalidité du titulaire, du conjoint ou d'un enfant</a></li>
              <li><a href="#surendettement">Situation de surendettement reconnue</a></li>
              <li><a href="#chomage">Expiration des droits à l'assurance chômage</a></li>
              <li><a href="#liquidation-judiciaire">Liquidation judiciaire de l'activité non salariée</a></li>
              <li><a href="#residence-principale">Achat de la résidence principale</a></li>
              <li><a href="#compartiments">Le compartiment qui échappe presque toujours au déblocage</a></li>
              <li><a href="#demarche">Comment faire la demande</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="vue-ensemble">Les 6 cas en un coup d'œil</h2>
          <p>
            Le Code monétaire et financier (art. L224-4, issu de la loi Pacte du 22 mai 2019) fixe
            une liste fermée : en dehors de ces six situations, aucun déblocage n'est possible avant
            la liquidation de vos droits à la retraite, quelle que soit l'urgence invoquée.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Cas de déblocage</th>
                  <th>Traitement fiscal du capital</th>
                  <th>Détail</th>
                </tr>
              </thead>
              <tbody>
                {CAS_DEBLOCAGE.map((cas) => (
                  <tr key={cas.ancre}>
                    <td>{cas.situation}</td>
                    <td>{cas.fiscalite}</td>
                    <td><a href={cas.ancre}>Voir la section</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="conjoint">1. Décès du conjoint marié ou du partenaire de Pacs</h2>
          <p>
            Le décès du conjoint marié ou du partenaire lié par un Pacs ouvre le droit à un
            déblocage total du PER. Le concubinage, en revanche, n'ouvre pas ce droit : seuls le
            mariage et le Pacs sont reconnus par le texte. La demande peut porter sur l'intégralité
            de l'épargne disponible, sans justificatif de besoin particulier autre que l'acte de
            décès.
          </p>

          <h2 id="invalidite">2. Invalidité du titulaire, du conjoint ou d'un enfant</h2>
          <p>
            L'invalidité de 2ᵉ ou 3ᵉ catégorie (au sens de la sécurité sociale, c'est-à-dire une
            incapacité de travail reconnue par la caisse d'assurance maladie) ouvre le droit au
            déblocage, qu'elle touche le titulaire du PER, son conjoint ou partenaire de Pacs, ou
            l'un de ses enfants. L'invalidité de 1ʳᵉ catégorie, moins sévère, n'est en revanche pas
            couverte par ce cas de déblocage.
          </p>

          <h2 id="surendettement">3. Situation de surendettement reconnue</h2>
          <p>
            Le déblocage pour surendettement suppose que la situation ait été formellement reconnue
            : la demande est adressée par le président de la commission de surendettement des
            particuliers, ou par le juge, directement à l'organisme gestionnaire du PER. Le titulaire
            ne déclenche donc pas ce cas seul, sur simple déclaration — c'est la procédure de
            surendettement elle-même qui l'active.
          </p>

          <h2 id="chomage">4. Expiration des droits à l'assurance chômage</h2>
          <p>
            Ce cas ne se déclenche pas dès la perte d'un emploi, mais seulement une fois les droits
            à l'assurance chômage totalement épuisés (fin d'indemnisation), ou pour un non-salarié en
            cessation d'activité qui n'a pas demandé le bénéfice des allocations chômage. C'est l'une
            des confusions les plus fréquentes chez les lecteurs qui pensent, à tort, pouvoir
            débloquer leur PER dès le début d'une période de chômage.
          </p>

          <h2 id="liquidation-judiciaire">5. Liquidation judiciaire de l'activité non salariée</h2>
          <p>
            La liquidation judiciaire de l'activité professionnelle non salariée du titulaire — un
            indépendant, un gérant majoritaire, un professionnel libéral — ouvre également le droit
            au déblocage. Une procédure de sauvegarde ou de redressement judiciaire, tant qu'elle
            n'aboutit pas à une liquidation, n'ouvre pas ce droit.
          </p>

          <h2 id="residence-principale">6. Achat de la résidence principale : le cas le plus utilisé, et le plus mal compris</h2>
          <p>
            Contrairement aux cinq cas précédents, l'achat de la résidence principale n'est pas un
            accident de la vie : c'est un projet choisi, et la fiscalité qui s'y applique reflète
            cette différence. Le déblocage porte uniquement sur les versements volontaires et
            l'épargne salariale (participation, intéressement, abondement) versés sur le PER ; le
            compartiment des versements obligatoires reste bloqué, y compris pour ce motif — nous
            détaillons ce point plus bas.
          </p>
          <p>
            Sur le plan fiscal, ce cas est traité comme une sortie anticipée « ordinaire » plutôt
            que comme une exonération : si vous avez déduit vos versements à l'entrée, la part
            correspondante est réintégrée au revenu imposable de l'année du déblocage, exactement
            comme lors d'une sortie en capital à la retraite. Les gains, eux, restent soumis au
            prélèvement forfaitaire unique (impôt sur le revenu au taux de {pct(FISCALITE.pfuIR)},
            plus prélèvements sociaux au taux de {pct(FISCALITE.prelevementsSociaux.per)} pour le
            PER en {HYPOTHESES_MAJ}). Un déblocage mal anticipé — par exemple juste avant un
            changement de tranche marginale — peut donc faire grimper sensiblement l'impôt de
            l'année, sans que le montant réellement disponible pour l'achat n'augmente d'autant.
            Notre guide <a href="/guide/fiscalite-sortie-per">fiscalité de sortie du PER</a>{" "}
            détaille ce mécanisme de réintégration au barème.
          </p>
          <p>
            Autre nuance à connaître avant de compter sur ce déblocage dans un plan de financement :
            l'organisme gestionnaire du PER exige des justificatifs précis (offre d'achat ou
            compromis de vente, plan de financement) et le montant débloqué ne peut, en pratique,
            pas excéder la part de l'acquisition financée sans emprunt bancaire. Ce n'est donc pas un
            apport « illimité » mobilisable du jour au lendemain — le délai de traitement par
            l'assureur ou le gestionnaire doit être intégré au calendrier de l'achat.
          </p>

          <h2 id="compartiments">Le compartiment qui échappe presque toujours au déblocage</h2>
          <p>
            Un PER n'est pas un bloc unique : il se compose de plusieurs compartiments (versements
            volontaires, épargne salariale, versements obligatoires issus d'un PER d'entreprise
            collectif ou catégoriel). Pour les cinq accidents de la vie, les six cas de déblocage
            s'appliquent à l'ensemble de ces compartiments, y compris les versements obligatoires.
            Pour l'achat de la résidence principale en revanche, seuls les versements volontaires et
            l'épargne salariale sont mobilisables : les sommes versées à titre obligatoire par
            l'employeur ou le salarié restent indisponibles jusqu'à la retraite, quel que soit le
            projet immobilier. Un salarié dont l'épargne PER provient majoritairement d'un
            compartiment obligatoire peut donc avoir moins de marge de manœuvre qu'il ne le pense
            pour ce motif précis — un point à vérifier auprès de son gestionnaire avant d'inclure
            cette somme dans un plan de financement.
          </p>

          <h2 id="demarche">Comment faire la demande de déblocage</h2>
          <p>
            La demande se fait directement auprès de l'organisme gestionnaire du PER (assureur,
            banque ou établissement teneur de compte), avec les justificatifs propres à chaque cas :
            acte de décès, notification d'invalidité, décision de la commission de surendettement,
            attestation de fin de droits Pôle emploi (France Travail), jugement de liquidation
            judiciaire, ou offre d'achat pour la résidence principale. Les délais de traitement
            varient selon les établissements — notre approche consiste à toujours anticiper ce délai
            dans un calendrier serré (achat immobilier notamment), plutôt que de le découvrir au
            moment de la demande.
          </p>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Peut-on débloquer son PER simplement en cas de difficultés financières passagères ?</h3>
          <p>
            Non. En dehors des six cas légaux, aucune difficulté financière, même réelle, n'ouvre
            droit à un déblocage anticipé. C'est précisément pour cette raison que notre guide{" "}
            <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER</a> recommande de disposer
            d'une épargne de précaution avant d'y verser des sommes importantes.
          </p>
          <h3>Le concubinage ouvre-t-il le droit au déblocage en cas de décès du partenaire ?</h3>
          <p>
            Non : seuls le mariage et le Pacs sont reconnus pour ce cas de déblocage. Le décès d'un
            concubin, même après de nombreuses années de vie commune, n'ouvre pas ce droit.
          </p>
          <h3>Peut-on débloquer son PER dès le début d'une période de chômage ?</h3>
          <p>
            Non : ce cas ne s'active qu'à l'expiration des droits à l'assurance chômage, c'est-à-dire
            une fois l'indemnisation totalement épuisée — pas au premier jour de la perte d'emploi.
          </p>
          <h3>Peut-on utiliser un déblocage résidence principale pour un investissement locatif ?</h3>
          <p>
            Non : ce cas de déblocage est strictement réservé à l'achat de la résidence principale
            du titulaire, pas à un investissement locatif ni à une résidence secondaire.
          </p>
          <h3>Le déblocage anticipé est-il possible sur tous les types de PER ?</h3>
          <p>
            Le principe des six cas est le même sur les trois types de PER (individuel, collectif,
            obligatoire/catégoriel), mais le compartiment des versements obligatoires reste exclu du
            déblocage pour l'achat de la résidence principale — voir le détail plus haut.
          </p>
          <h3>Faut-il éviter d'ouvrir un PER par crainte de ne jamais pouvoir en sortir ?</h3>
          <p>
            Ce n'est pas notre position : l'indisponibilité est réelle et doit être prise au
            sérieux, mais elle n'est pas absolue. Elle mérite d'être mise en balance avec les autres
            critères d'ouverture, détaillés dans notre guide{" "}
            <a href="/guide/faut-il-ouvrir-un-per">faut-il ouvrir un PER</a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Le PER n'est pas la « caisse fermée à double tour » que suggère parfois le raccourci
            marketing inverse (« votre argent, disponible à tout moment »). Il n'est pas non plus
            aussi rigide que le redoutent certains lecteurs qui renoncent à l'ouvrir par prudence
            excessive. Cinq accidents de la vie et un projet immobilier ouvrent des portes de sortie
            réelles, avec une fiscalité nettement plus favorable pour les accidents de la vie que
            pour la résidence principale. La décision d'ouvrir un PER — et le montant à y consacrer —
            gagne à intégrer ces six cas dans son horizon, plutôt qu'à les découvrir le jour où l'un
            d'eux survient. Notre guide{" "}
            <a href="/guide/combien-coute-un-per">combien coûte un PER</a> et notre page{" "}
            <a href="/strategies/per">stratégie PER</a> complètent cette lecture.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle auprès de
              l'organisme gestionnaire du PER concerné. Les taux et barèmes cités sont ceux en
              vigueur en {HYPOTHESES_MAJ}, susceptibles d'évoluer à chaque loi de finances.
            </p>
          </div>
          <AuthorBox />
          <RiskNotice />
        </div>
      </section>
      <CtaBanner title="Un projet, un accident de la vie, une question sur votre PER ? Parlons-en directement." />
    </>
  );
}
