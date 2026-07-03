import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RENDEMENTS,
  FISCALITE,
  HYPOTHESES_MAJ,
  euros,
  pct,
} from "../components/hypotheses.js";

export default function GuideRisquesAv() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Les problèmes de l'assurance-vie</span>
          <h1>Les risques réels de l'assurance-vie, expliqués sans tabou</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <p>
            L'assurance-vie fait l'objet de deux discours qui se nourrissent l'un l'autre sans
            jamais se répondre. D'un côté, un catastrophisme qui fait de l'audience sur les
            réseaux sociaux : l'argent serait « bloqué », l'État pourrait « tout confisquer »,
            l'assureur pourrait « faire faillite du jour au lendemain ». De l'autre, un déni tout
            aussi problématique, celui de certaines plaquettes commerciales qui présentent
            l'enveloppe comme un long fleuve tranquille où le mot « risque » n'apparaît jamais.
            Aucun des deux ne rend service à l'épargnant. Notre analyse : chacun des risques
            suivants est réel, mais aucun ne se comprend sans son mécanisme, sa probabilité et sa
            parade.
          </p>
          <div className="sommaire">
            <strong>Sommaire</strong>
            <ol>
              <li><a href="#creance">Votre épargne est une créance sur l'assureur</a></li>
              <li><a href="#sapin2">La loi Sapin 2 : un blocage possible, jamais activé</a></li>
              <li><a href="#unites-de-compte">Les unités de compte : un capital qui n'est pas garanti</a></li>
              <li><a href="#delais">Les délais de rachat : l'assurance-vie n'est pas un compte courant</a></li>
              <li><a href="#risque-silencieux">Le risque silencieux : l'érosion par l'inflation</a></li>
              <li><a href="#gestion-pilotee">La gestion pilotée et les sorties au prorata</a></li>
              <li><a href="#synthese">Notre analyse, en synthèse</a></li>
            </ol>
          </div>

          <h2 id="creance">Votre épargne est une créance sur l'assureur</h2>
          <p>
            Premier point, souvent ignoré parce qu'il est technique : souscrire une
            assurance-vie ne revient pas à détenir directement les titres logés dans le contrat.
            Juridiquement, l'épargnant détient une créance sur l'assureur (une somme que
            l'assureur s'engage à lui devoir), qui lui-même détient les actifs sous-jacents à son
            bilan ou via des supports dédiés. En pratique, cette nuance ne change rien tant que
            l'assureur honore ses engagements — ce qui est le cas de l'écrasante majorité des
            contrats commercialisés en France. Mais elle explique pourquoi la solidité financière
            de l'assureur choisi n'est jamais un détail : c'est lui, et non le titre lui-même, qui
            garantit la valeur de votre contrat.
          </p>
          <p>
            En cas de défaillance d'un assureur, un dispositif légal existe : le FGAP (Fonds de
            garantie des assurances de personnes), qui protège les épargnants jusqu'à un plafond
            de 70 000 € par assuré et par assureur (plafond à vérifier avant publication, barème
            en vigueur en {HYPOTHESES_MAJ}). C'est un filet de sécurité réel, mais un filet tout
            de même : il ne couvre pas l'intégralité d'un patrimoine important logé chez un seul
            assureur, d'où l'intérêt, au-delà de certains montants, de répartir ses contrats.
          </p>
          <p>
            À titre de contraste, une phrase suffit : le régime luxembourgeois fonctionne
            autrement, via un mécanisme dit du triangle de sécurité qui ségrègue les actifs des
            souscripteurs de ceux de l'assureur. Cette architecture ne change pas la nature
            juridique de créance de l'épargnant, mais elle en modifie la portée ; nous ne la
            développons pas ici — voir{" "}
            <a href="https://assurancevie.lu" target="_blank" rel="noopener noreferrer">
              assurancevie.lu
            </a>{" "}
            pour le détail de ce régime spécifique, réservé à des situations patrimoniales
            particulières.
          </p>

          <h2 id="sapin2">La loi Sapin 2 : un blocage possible, jamais activé</h2>
          <p>
            La loi Sapin 2 (2016) a introduit une disposition précise : en cas de crise grave et
            avérée du système financier, le Haut Conseil de stabilité financière peut décider de
            limiter ou de bloquer temporairement les rachats sur les contrats d'assurance-vie,
            afin d'éviter qu'une fuite massive des capitaux ne mette en péril les assureurs — et,
            par ricochet, l'ensemble des épargnants restés dans le contrat. Il s'agit d'une
            possibilité légale, pas d'une pratique courante : ce mécanisme n'a, à ce jour, jamais
            été activé à l'échelle du marché.
          </p>
          <p>
            Deux précisions s'imposent. D'abord, ce risque n'est pas propre aux contrats
            français : chercher à l'éviter en souscrivant à l'étranger n'offre pas la protection
            qu'on lui prête souvent, une bonne partie des fonds euros commercialisés hors de
            France restant réassurés sur le marché français. Ensuite, et c'est le point pratique
            à retenir : ce blocage possible, même rare, est une raison suffisante pour ne jamais
            loger son épargne de précaution (celle qu'il faut pouvoir mobiliser sous quelques
            jours en cas d'imprévu) exclusivement en assurance-vie. Un fait à connaître avant de
            décider où placer ses réserves, pas un motif de fuir l'enveloppe.
          </p>

          <h2 id="unites-de-compte">Les unités de compte : un capital qui n'est pas garanti</h2>
          <p>
            C'est sans doute le risque le plus banal de l'assurance-vie — et paradoxalement le
            plus sous-estimé par les épargnants qui découvrent l'enveloppe. Un contrat
            d'assurance-vie héberge deux familles de supports, dont la logique de risque est
            opposée. Le fonds en euros : son capital est garanti par l'assureur (une garantie
            réelle, mais valable hors faillite de celui-ci) ; il a servi en moyenne{" "}
            {pct(RENDEMENTS.fondsEuros.moyen)} en {RENDEMENTS.fondsEuros.periode} (moyenne de
            marché France Assureurs / ACPR, avant prélèvements sociaux — un constat passé qui ne
            préjuge en rien des taux futurs), le plus souvent net de frais de gestion du contrat.
            Les unités de compte (UC), à l'inverse, ne bénéficient d'aucune garantie en capital :
            leur valeur fluctue à la hausse comme à la baisse, au gré des marchés financiers ou
            immobiliers sur lesquels elles sont investies, et l'épargnant peut récupérer moins
            que ce qu'il a versé.
          </p>
          <p>
            Cette distinction paraît évidente une fois énoncée. Elle l'est beaucoup moins pour un
            épargnant qui a signé une allocation en unités de compte lors de l'ouverture du
            contrat, sans toujours mesurer que le mot « assurance » du nom du produit ne protège
            en rien ces supports-là. Notre analyse : la bonne question n'est pas « faut-il des UC
            ou pas », mais « quelle proportion d'UC est compatible avec mon horizon de temps et
            ma capacité à tolérer une baisse temporaire » — une réponse qui se construit au cas
            par cas, jamais par défaut.
          </p>

          <h2 id="delais">Les délais de rachat : l'assurance-vie n'est pas un compte courant</h2>
          <p>
            Contrairement à une idée reçue tenace, l'argent placé en assurance-vie n'est pas
            bloqué : un rachat, partiel ou total, reste possible à tout moment, sauf en présence
            de supports illiquides. Mais disponible ne veut pas dire instantané. En pratique, un
            rachat prend le plus souvent de quelques jours à quelques semaines pour être
            crédité sur le compte bancaire de l'épargnant, le temps que l'assureur traite la
            demande et, le cas échéant, cède les supports concernés. Le délai légal maximal est
            fixé à deux mois. L'assurance-vie reste donc une enveloppe d'épargne, pas un compte
            courant : elle ne convient pas à une dépense imprévue à régler dans l'heure.
          </p>

          <h2 id="risque-silencieux">Le risque silencieux : l'érosion par l'inflation</h2>
          <p>
            C'est l'erreur la plus fréquente chez les épargnants les plus prudents, précisément
            parce qu'elle ne se voit pas sur un relevé de compte : un fonds en euros affiche
            toujours un solde stable ou croissant, jamais négatif. Mais un rendement moyen de{" "}
            {pct(RENDEMENTS.fondsEuros.moyen)} en {RENDEMENTS.fondsEuros.periode} (source France
            Assureurs / ACPR, avant prélèvements sociaux, performance passée qui ne préjuge pas
            des performances futures), comparé à une cible d'inflation de la Banque centrale
            européenne de l'ordre de {pct(RENDEMENTS.inflationLongTerme.moyen)} par an sur le
            long terme, ne laisse qu'une marge de progression réelle très mince, parfois nulle
            selon les années. Le pouvoir d'achat du capital peut ainsi s'éroder doucement, sans
            qu'aucune ligne du relevé n'indique de perte apparente.
          </p>
          <p>
            Ce risque touche en priorité les épargnants qui, par excès de prudence, laissent
            dormir un capital important sur un fonds en euros pendant de longues années, alors
            que leur horizon de placement aurait permis d'accueillir une part de supports plus
            dynamiques. La prudence a un coût, lui aussi réel — simplement moins visible que
            celui d'une baisse de marché.
          </p>

          <h2 id="gestion-pilotee">La gestion pilotée et les sorties au prorata</h2>
          <p>
            Un dernier point mérite d'être connu avant de déléguer la gestion de son contrat. En
            gestion pilotée, chaque rachat partiel est en principe exécuté au prorata de
            l'ensemble des supports du profil : l'assureur vend un peu de toutes les lignes à la
            fois, y compris les supports en actions au moment où ils sont au plus bas, sans
            distinction possible. Ce mécanisme mérite une vigilance particulière plutôt qu'un
            rejet de principe — nous détaillons son fonctionnement et ses alternatives dans notre
            guide{" "}
            <a href="/guide/pourquoi-votre-assurance-vie-rapporte-peu">
              pourquoi votre assurance-vie rapporte peu
            </a>.
          </p>

          <h2 id="synthese">Notre analyse, en synthèse</h2>
          <p>
            Aucun de ces risques, pris isolément, ne disqualifie l'assurance-vie. Elle demeure,
            dans notre analyse, l'une des enveloppes les plus polyvalentes du droit français —
            capable de servir un projet à dix ans, un complément de retraite et une transmission
            organisée, ce que nous détaillons dans notre page{" "}
            <a href="/strategies/assurance-vie-retraite">l'assurance-vie comme outil retraite</a>.
            Mais chacun de ces risques appelle une décision précise plutôt qu'une confiance
            aveugle : choisir un assureur solide et, au-delà d'un certain montant, répartir ses
            contrats ; doser la part d'unités de compte selon son horizon réel, pas selon la
            promesse de rendement du moment ; loger son épargne de précaution ailleurs qu'en
            fonds en euros, par exemple sur un support disponible sous 48 heures ; et comprendre
            précisément ce que coûte son contrat avant de le signer, ce que détaille notre guide{" "}
            <a href="/guide/combien-coute-une-assurance-vie">combien coûte une assurance-vie</a>.
            À l'heure de transformer ce capital en revenus, ces mêmes arbitrages se prolongent :
            notre page sur{" "}
            <a href="/strategies/decumulation">la décumulation</a> explique comment sécuriser
            progressivement l'allocation à l'approche de la retraite.
          </p>
          <div className="note">
            <p>
              Cette analyse est générale et ne constitue pas un conseil en investissement
              personnalisé : chaque situation doit faire l'objet d'une étude individuelle. Les
              montants, plafonds et taux cités (dont le plafond du FGAP) sont ceux en vigueur en{" "}
              {HYPOTHESES_MAJ}, à vérifier avant toute décision ; les rendements mentionnés sont
              des constats passés datés et sourcés, et les performances passées ne préjugent pas
              des performances futures. Les prélèvements sociaux applicables à l'assurance-vie
              restent fixés à {pct(FISCALITE.prelevementsSociaux.assuranceVie)}, un taux que la
              hausse introduite par la LFSS 2026 n'a pas concerné.
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
