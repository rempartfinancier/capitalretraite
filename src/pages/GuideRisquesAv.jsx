import { AuthorBox, CtaBanner, RiskNotice } from "../components/Layout.jsx";
import {
  RENDEMENTS,
  FISCALITE,
  GARANTIES,
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
          <div className="resume-executif">
            <p>
              <strong>L'essentiel :</strong> l'assurance-vie n'est ni le placement sans risque que
              certaines plaquettes commerciales laissent croire, ni le piège que décrivent certains
              discours alarmistes. Votre épargne est une créance sur l'assureur, protégée jusqu'à{" "}
              {euros(GARANTIES.fgapPlafondParAssureParAssureur)} par le FGAP en cas de défaillance
              — un filet réel mais plafonné, qui
              justifie de répartir un patrimoine important entre plusieurs assureurs. La loi Sapin 2
              permet, en théorie, un blocage temporaire des rachats en cas de crise grave et avérée,
              mais ce pouvoir n'a jamais été activé à l'échelle du marché. Les unités de compte ne
              garantissent pas le capital, un rachat prend le plus souvent quelques jours à quelques
              semaines (deux mois maximum), et l'inflation érode silencieusement un fonds en euros
              trop prudent. Aucun de ces risques, correctement compris, ne disqualifie l'enveloppe —
              mais aucun ne doit être ignoré non plus.
            </p>
          </div>
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
              <li><a href="#tableau-risques">Le tableau récapitulatif des risques</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
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
            de {euros(GARANTIES.fgapPlafondParAssureParAssureur)} par assuré et par assureur
            (plafond à vérifier avant publication, barème en vigueur en {HYPOTHESES_MAJ}). C'est
            un filet de sécurité réel, mais un filet tout
            de même : il ne couvre pas l'intégralité d'un patrimoine important logé chez un seul
            assureur, d'où l'intérêt, au-delà de certains montants, de répartir ses contrats.
          </p>
          <p>
            À titre de contraste, une phrase suffit : le régime luxembourgeois fonctionne
            autrement, via un mécanisme dit du triangle de sécurité qui ségrègue les actifs des
            souscripteurs de ceux de l'assureur, sous le contrôle du Commissariat aux assurances
            luxembourgeois. Cette architecture ne change pas la nature juridique de créance de
            l'épargnant, mais elle en modifie la portée ; nous ne la développons pas ici — notre
            guide dédié{" "}
            <a href="/guide/assurance-vie-luxembourgeoise">l'assurance-vie luxembourgeoise</a>{" "}
            détaille ce régime spécifique, réservé à des situations patrimoniales particulières.
          </p>

          <h2 id="sapin2">La loi Sapin 2 : un blocage possible, jamais activé</h2>
          <p>
            La loi Sapin 2 (2016) a introduit une disposition précise, codifiée à l'article
            L631-2-1 du Code monétaire et financier : en cas de crise grave et avérée du système
            financier, le Haut Conseil de stabilité financière (HCSF) peut décider de limiter ou
            de bloquer temporairement les rachats sur les contrats d'assurance-vie, afin d'éviter
            qu'une fuite massive des capitaux ne mette en péril les assureurs — et, par ricochet,
            l'ensemble des épargnants restés dans le contrat. Il s'agit d'une possibilité légale,
            pas d'une pratique courante : selon les publications et rapports annuels du HCSF et de
            l'Autorité de contrôle prudentiel et de résolution (ACPR), qui suivent chaque année la
            situation du secteur de l'assurance-vie, ce pouvoir n'a, à ce jour, jamais été activé
            à l'échelle du marché depuis son entrée en vigueur.
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

          <h2 id="tableau-risques">Le tableau récapitulatif des risques</h2>
          <p>
            Une synthèse des risques développés plus haut, à conserver comme grille de lecture :
            aucun n'est théorique, mais aucun n'est non plus un motif suffisant pour écarter
            l'enveloppe dans son ensemble.
          </p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Risque</th>
                  <th>Probabilité / fréquence</th>
                  <th>Comment s'en protéger</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Défaillance de l'assureur (créance non honorée)</td>
                  <td>
                    Très rare en France ; le FGAP couvre jusqu'à{" "}
                    {euros(GARANTIES.fgapPlafondParAssureParAssureur)} par assuré et par assureur
                    en cas de défaillance
                  </td>
                  <td>
                    Choisir un assureur financièrement solide et, au-delà d'un certain montant,
                    répartir son épargne entre plusieurs assureurs
                  </td>
                </tr>
                <tr>
                  <td>Blocage temporaire des rachats (loi Sapin 2)</td>
                  <td>
                    Possibilité légale depuis 2016, jamais activée à ce jour à l'échelle du
                    marché selon les suivis du HCSF et de l'ACPR
                  </td>
                  <td>
                    Ne jamais loger son épargne de précaution exclusivement en assurance-vie ;
                    garder une réserve disponible sous quelques jours ailleurs
                  </td>
                </tr>
                <tr>
                  <td>Perte en capital sur les unités de compte</td>
                  <td>
                    Fréquent et normal : les UC fluctuent à la hausse comme à la baisse selon les
                    marchés, sans garantie de capital
                  </td>
                  <td>
                    Doser la part d'UC selon son horizon réel et sa tolérance au risque, jamais
                    par défaut ni sur la seule promesse de rendement
                  </td>
                </tr>
                <tr>
                  <td>Délai de traitement d'un rachat</td>
                  <td>
                    Systématique : quelques jours à quelques semaines en pratique, deux mois au
                    maximum légal
                  </td>
                  <td>
                    Ne pas compter sur l'assurance-vie pour une dépense imprévue à régler dans
                    l'heure ; prévoir une épargne de précaution sur un support plus liquide
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="faq">Questions fréquentes</h2>
          <h3>Et si mon assureur fait faillite, je perds tout ?</h3>
          <p>
            Non, dans l'immense majorité des cas. Le FGAP (Fonds de garantie des assurances de
            personnes) protège chaque assuré jusqu'à{" "}
            {euros(GARANTIES.fgapPlafondParAssureParAssureur)} par assureur en cas de défaillance
            avérée. Ce plafond est un filet de sécurité réel, mais il ne couvre pas l'intégralité
            d'un patrimoine important logé chez un seul assureur : c'est précisément la raison de
            répartir ses contrats au-delà d'un certain montant plutôt que de tout concentrer chez
            un unique assureur, même solide.
          </p>
          <h3>L'État peut-il bloquer mon argent du jour au lendemain ?</h3>
          <p>
            Un blocage n'est pas exclu par la loi, mais il n'a rien d'arbitraire ni d'immédiat.
            Seul le Haut Conseil de stabilité financière peut activer ce pouvoir, et seulement en
            cas de crise grave et avérée du système financier — pas sur simple décision politique
            ni du jour au lendemain sans justification. Ce pouvoir existe depuis 2016 et n'a, à ce
            jour, jamais été mis en œuvre à l'échelle du marché.
          </p>
          <h3>Le FGAP me protège-t-il complètement, quelle que soit la somme ?</h3>
          <p>
            Non. La protection est plafonnée à{" "}
            {euros(GARANTIES.fgapPlafondParAssureParAssureur)} par assuré et par assureur, pas par
            contrat ni sans limite. Au-delà de ce montant sur un même assureur, la part excédentaire
            ne bénéficie plus de cette garantie légale en cas de défaillance — d'où l'intérêt de
            diversifier les compagnies d'assurance pour un patrimoine conséquent.
          </p>
          <h3>Souscrire à l'étranger permet-il d'échapper à la loi Sapin 2 ?</h3>
          <p>
            Non, pas de façon fiable. Une bonne partie des fonds en euros commercialisés hors de
            France reste réassurée sur le marché français, ce qui expose indirectement au même
            risque réglementaire. Ce n'est donc pas un motif suffisant, à lui seul, pour préférer
            un contrat étranger à un contrat français.
          </p>
          <h3>Puis-je perdre de l'argent même sur un fonds en euros, réputé sans risque ?</h3>
          <p>
            Pas en capital nominal : le fonds en euros garantit que le solde affiché ne baisse
            jamais. Mais le pouvoir d'achat de ce capital peut s'éroder si le rendement net reste
            durablement inférieur à l'inflation, sans qu'aucune ligne du relevé ne le signale
            explicitement — un risque réel, mais silencieux, différent d'une perte en capital
            visible sur les unités de compte.
          </p>
          <h3>Si je dois récupérer mon argent en urgence, combien de temps cela prend-il vraiment ?</h3>
          <p>
            En pratique, le plus souvent de quelques jours à quelques semaines pour un virement
            effectif sur le compte bancaire, selon l'assureur et les supports concernés. Le délai
            légal maximal est de deux mois. Ce n'est jamais instantané : l'assurance-vie n'est pas
            conçue pour une dépense à régler dans l'heure, ce qui justifie de garder une épargne de
            précaution disponible ailleurs.
          </p>
          <h3>Les unités de compte peuvent-elles me faire perdre tout mon capital ?</h3>
          <p>
            Une perte totale est théoriquement possible mais extrêmement improbable pour un
            portefeuille diversifié sur des supports usuels (actions, obligations, immobilier) :
            la baisse porte alors sur la valeur des supports, pas sur une disparition brutale de
            la somme investie. Le risque réel est une baisse temporaire ou durable de la valeur du
            contrat, d'autant plus significative que la part d'UC est élevée et l'horizon de
            placement court.
          </p>
          <h3>Est-ce que je dois éviter l'assurance-vie à cause de ces risques ?</h3>
          <p>
            Pas nécessairement : chacun de ces risques, correctement compris, appelle une décision
            précise (répartir ses contrats, doser les UC, garder une épargne de précaution
            ailleurs) plutôt qu'un rejet de l'enveloppe dans son ensemble. L'assurance-vie reste,
            dans notre analyse, l'une des enveloppes les plus polyvalentes du droit français pour
            qui en maîtrise les mécanismes.
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
              hausse introduite par la LFSS 2026 n'a pas concerné. Pour les textes de référence sur
              la garantie des contrats et le mécanisme de la loi Sapin 2, voir les fiches officielles
              de{" "}
              <a
                href="https://www.service-public.fr/particuliers/vosdroits/F32888"
                target="_blank"
                rel="noopener noreferrer"
              >
                service-public.fr sur l'assurance-vie
              </a>{" "}
              et les publications de{" "}
              <a
                href="https://acpr.banque-france.fr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                l'ACPR
              </a>.
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
