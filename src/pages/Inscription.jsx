import Hero from "../assets/photo.avif";
import PdfLogo from "../assets/pdfLogo.png";
import Images from "../components/Images";
import "../styles/pageStyles/Inscription.css";

export default function Inscription() {
  const docs = [
    { file: "/pdf/Fiche adhésion 2024-2025.pdf", label: "Fiche d'adhésion" },
    {
      file: "/pdf/FFvolley_qs_sport_sportifs_mineurs_2024-25 (2).pdf",
      label: "Formulaire d'inscription des mineurs",
    },
    {
      file: "/pdf/Formulaire_demande_licences_2024_2025 (1).pdf",
      label: "Formulaire de demande de licences",
    },
  ];

  return (
    <>
      <Images
        images={Hero}
        text="Formulaires d'inscription"
        buttonText="Découvrir"
      />
      <div className="page">
        <h2 className="title">Formulaires d'inscription</h2>

        {/* Блок с объяснением */}
        <div className="inscription-info">
          <h3>Pièces à fournir pour la saison 2025-2026 :</h3>
          <ul>
            <li>✔️ Remplir le formulaire de licence</li>
            <li>✔️ Fiche d'adhésion du club</li>
            <li>✔️ Photocopie d'une pièce d'identité</li>
            <li>✔️ Une photo d'identité</li>
            <li>✔️ Chèque de caution pour le maillot (M9-M18 si pass Bronze)</li>
            <li>
              ✔️ <strong>Certificat médical obligatoire</strong> si :
              <ul>
                <li>– Je suis ou je deviens majeur durant la saison</li>
                <li>– Je suis mineur avec un surclassement</li>
                <li>
                  – Je suis mineur et j'ai répondu <strong>« oui »</strong> au
                  questionnaire de santé
                </li>
              </ul>
            </li>
          </ul>
          <p className="note">
            🛈 <strong>Pas besoin de certificat médical</strong> si je suis
            mineur, que je joue dans ma catégorie d’âge et que j’ai répondu
            « non » au questionnaire de santé.
          </p>
        </div>

        {docs.map((doc) => (
  <details key={doc.file} className="card">
    <summary>
      <img src={PdfLogo} alt="" width={24} height={24} />
      {doc.label}
    </summary>
    <div className="pdf-container">
      <embed
        src={`${doc.file}#toolbar=0&navpanes=0&page=1`}
        type="application/pdf"
        className="pdf-preview"
      />
      <a
        href={doc.file}
        download
        className="download-btn small"
        target="_blank"
        rel="noopener noreferrer"
      >
        Télécharger
      </a>
    </div>
  </details>
))}

      </div>
    </>
  );
}
