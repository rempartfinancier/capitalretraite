import { Link } from "react-router-dom";

export const meta = {
  slug: "agirc-arrco-revalorisation-1er-novembre-2026",
  type: "actualite",
  big5: "actu",
  categorie: "actu",
  title: "Agirc-Arrco : +1,4 % au 1er novembre 2026, ce que cela change",
  description:
    "Le conseil d'administration de l'Agirc-Arrco a décidé le 14 octobre 2026 une hausse de 1,4 % des retraites complémentaires du privé au 1er novembre 2026.",
  h1: "Agirc-Arrco : les retraites complémentaires revalorisées de 1,4 % au 1er novembre 2026",
  resume:
    "Le 14 octobre 2026, le conseil d'administration de l'Agirc-Arrco a décidé de revaloriser de 1,4 % les pensions complémentaires des retraités du secteur privé à compter du 1er novembre 2026, après une absence de revalorisation en novembre 2025.",
  datePublication: "2026-10-14",
  dateMiseAJour: "2026-10-20",
  faq: [
    {
      q: "Qui est concerné par cette revalorisation de 1,4 % ?",
      a: "Les retraités du secteur privé qui perçoivent une retraite complémentaire Agirc-Arrco, selon l'annonce de la fédération du 14 octobre 2026. Les retraites de base, versées par l'Assurance retraite, suivent leur propre calendrier de revalorisation, au 1er janvier.",
    },
    {
      q: "Quelle est la nouvelle valeur du point ?",
      a: "L'annonce de l'Agirc-Arrco consultée ne précise pas la nouvelle valeur de service du point. La dernière valeur publiée sur le site de réglementation de l'Agirc-Arrco est de 1,4386 euro, applicable depuis le 1er novembre 2024 et inchangée au 1er novembre 2025. La nouvelle valeur figurera dans la circulaire officielle correspondante.",
    },
    {
      q: "Pourquoi n'y avait-il pas eu de hausse en novembre 2025 ?",
      a: "Selon le communiqué de l'Agirc-Arrco du 17 octobre 2025, faute d'accord entre les représentants des organisations patronales et syndicales qui composent le conseil d'administration, les retraites complémentaires n'ont pas été revalorisées au 1er novembre 2025.",
    },
    {
      q: "Cette hausse change-t-elle les futurs droits à retraite complémentaire ?",
      a: "Elle porte sur les pensions déjà versées. Vos droits futurs dépendent notamment de la valeur d'achat du point, dont la valeur au 1er janvier 2027 n'est pas indiquée dans l'annonce du 14 octobre 2026.",
    },
  ],
  sources: [
    {
      label: "Agirc-Arrco : une revalorisation de +1,4 % au 1er novembre 2026 (14 octobre 2026)",
      url: "https://www.agirc-arrco.fr/nous-connaitre/nos-actualites/retraites-complementaires-agirc-arrco-une-revalorisation-de-14-au-1er-novembre-2026/",
    },
    {
      label: "info-retraite.fr : les retraites complémentaires Agirc-Arrco revalorisées de 1,4 % au 1er novembre 2026",
      url: "https://www.info-retraite.fr/portail-info/sites/PortailInformationnel/home/actualites-1/les-retraites-complementaires-agirc-arrco-revalorisees.html",
    },
    {
      label: "Agirc-Arrco : valeur de service du point depuis 2019",
      url: "https://reglementation.agirc-arrco.fr/home/baremes/listes-area/baremes-1/valeur-de-service-du-point-agirc-arrco.html",
    },
    {
      label: "Agirc-Arrco : communiqué du 17 octobre 2025 (pas de revalorisation en novembre 2025)",
      url: "https://www.agirc-arrco.fr/storage/20251017_CP_Revalorisation-valeur-du-point-Agirc-Arrco.pdf",
    },
  ],
  liens: [
    "/simulateur-retraite",
    "/guide/verifier-releve-de-carriere-retraite",
    "/guide/retraite-fonctionnaires-completer",
    "/actualites/pensions-2027-revalorisation-projet-plfss",
    "/bilan-retraite",
  ],
};

export default function ActuAgircArrcoNovembre2026() {
  return (
    <>
      <h2>1. Ce qui change</h2>
      <p>
        Réuni le 14 octobre 2026, le conseil d'administration de la fédération Agirc-Arrco, composé
        de représentants des organisations syndicales et patronales, a décidé de revaloriser de
        1,4 % les pensions des retraités du secteur privé à compter du 1er novembre 2026. Il s'agit d'une
        décision du régime, et non d'un projet de loi.
      </p>
      <p>
        L'Agirc-Arrco justifie ce niveau par la volonté de protéger le pouvoir d'achat des retraités
        tout en préservant l'équilibre financier du régime, sans faire peser la charge sur les
        générations futures.
      </p>

      <h2>2. Pour qui</h2>
      <p>
        La revalorisation concerne les retraités du secteur privé qui perçoivent une retraite
        complémentaire Agirc-Arrco. Elle ne s'applique pas à la retraite de base, qui suit son propre
        calendrier au 1er janvier (voir{" "}
        <Link to="/actualites/pensions-2027-revalorisation-projet-plfss">le projet de loi de
        financement de la Sécurité sociale pour 2027</Link>).
      </p>
      <p>
        Si vous avez entre 45 et 60 ans et que vous cotisez à l'Agirc-Arrco, vous n'êtes pas
        bénéficiaire de cette hausse aujourd'hui, mais la façon dont le régime fait évoluer la valeur
        du point détermine à terme le niveau de votre complémentaire. Les agents publics, qui
        relèvent d'autres régimes, ne sont pas concernés par cette décision.
      </p>

      <h2>3. Chiffres sourcés et datés</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Date d'effet</th>
              <th>Évolution de la valeur de service du point</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1er novembre 2023</td>
              <td>+ 4,90 % (1,4159 €)</td>
              <td>Agirc-Arrco, barème de la valeur de service du point</td>
            </tr>
            <tr>
              <td>1er novembre 2024</td>
              <td>+ 1,60 % (1,4386 €)</td>
              <td>Agirc-Arrco, barème de la valeur de service du point</td>
            </tr>
            <tr>
              <td>1er novembre 2025</td>
              <td>+ 0,00 % (1,4386 €), faute d'accord au conseil d'administration du 17 octobre 2025</td>
              <td>Agirc-Arrco, barème et communiqué du 17 octobre 2025</td>
            </tr>
            <tr>
              <td>1er novembre 2026</td>
              <td>+ 1,4 % (décision du 14 octobre 2026)</td>
              <td>Agirc-Arrco, annonce du 14 octobre 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Illustration arithmétique, sans lien avec un cas réel : une retraite complémentaire de
        10 000 euros par an serait augmentée de 140 euros par an par une revalorisation de 1,4 %
        (10 000 × 1,4 %), avant prélèvements sociaux et impôt.
      </p>
      <p>
        Contexte : selon l'exposé des motifs du projet de loi de financement de la Sécurité sociale
        pour 2027, l'accord national interprofessionnel du 5 octobre 2023 a fixé une cible de
        sous-indexation des pensions du régime de 0,4 point par rapport à l'inflation hors tabac pour
        les années 2024, 2025 et 2026. Le COR indique par ailleurs, dans son rapport de juin 2026,
        qu'à partir de 2038 la valeur de service et la valeur d'achat du point évolueraient
        conventionnellement comme le salaire moyen minoré de 0,86 % (hypothèse définie par la
        fédération Agirc-Arrco pour les projections).
      </p>

      <h2>4. Ce que cela ne change pas</h2>
      <ul>
        <li>
          <strong>La nouvelle valeur du point</strong> n'est pas indiquée dans l'annonce consultée :
          elle sera publiée par l'Agirc-Arrco. Aucun montant en euros n'est donc donné ici.
        </li>
        <li>
          <strong>La valeur d'achat du point</strong> au 1er janvier 2027, qui conditionne le
          nombre de points acquis avec vos cotisations, n'est pas précisée dans cette annonce.
        </li>
        <li>
          <strong>La retraite de base</strong> n'est pas concernée : son éventuelle modulation en
          2027 relève d'un projet de loi non adopté à ce jour.
        </li>
        <li>
          <strong>Le calcul de votre pension</strong> (durée d'assurance, décote, surcote) n'est pas
          modifié par cette décision.
        </li>
      </ul>

      <h2>5. Pour aller plus loin</h2>
      <ul>
        <li>
          <Link to="/guide/verifier-releve-de-carriere-retraite">Vérifier votre relevé de carrière</Link>,
          y compris les points de retraite complémentaire déjà acquis.
        </li>
        <li>
          <Link to="/simulateur-retraite">Le simulateur retraite</Link> pour situer votre besoin de
          revenu complémentaire.
        </li>
        <li>
          <Link to="/guide/retraite-fonctionnaires-completer">Compléter une retraite de fonctionnaire</Link>{" "}
          si vous ne relevez pas de l'Agirc-Arrco.
        </li>
      </ul>

      <h2>En résumé</h2>
      <p>
        Les pensions Agirc-Arrco du secteur privé augmentent de 1,4 % au 1er novembre 2026, après une
        année sans revalorisation. Cette hausse concerne les retraités actuels ; pour les actifs, elle
        illustre surtout que la complémentaire évolue chaque année selon des décisions des
        partenaires sociaux, sans automatisme. Un petit pas utile : ouvrir votre relevé de
        points et comparer avec <Link to="/simulateur-retraite">le simulateur retraite</Link>. Si vous
        souhaitez ensuite un regard extérieur, un{" "}
        <Link to="/bilan-retraite">bilan retraite gratuit de 15 minutes</Link> est possible. Cette
        page est informative et ne constitue pas un conseil personnalisé.
      </p>
    </>
  );
}
