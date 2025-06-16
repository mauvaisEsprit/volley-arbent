
import Images from "../components/Images";
import "../styles/pageStyles/Inscription.css";


export default function Inscription() {
  const imageHome =
    "https://ca-times.brightspotcdn.com/dims4/default/2aaf5f0/2147483647/strip/true/crop/4256x2832+0+0/resize/1200x798!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F52%2Ff7%2F283a4f1343e19226def7445faf7d%2Fhttps-delivery.gettyimages.com%2Fdownloads%2F171247618.jpg";

  const docs = [
    { file: "/public/Fiche adhésion 2024-2025.pdf", label: "Fiche d'adhésion" },
    { file: "/public/FFvolley_qs_sport_sportifs_mineurs_2024-25 (2).pdf", label: " Formulaire d'inscription des mineurs" },
    { file: "/public/Formulaire_demande_licences_2024_2025 (1).pdf", label: "Formulaire de demande de licences"},
  ];


  


  return (
    <div className="page">
      <Images images={imageHome} text="Arbent Volley" buttonText="Découvrir" />

      <h2 className="title">Formulaires d'inscription</h2>

      {docs.map((doc) => (
        <details key={doc.file} className="card">
          <summary>
            <img src="/icons/pdf-icon.svg" alt="" width={24} height={24} />
            {doc.label}
          </summary>
          <embed
            src={`${doc.file}#toolbar=0&navpanes=0&page=1`}
            type="application/pdf"
            className="pdf-preview"
          />
        </details>
      ))}

    
    </div>
  );
}
