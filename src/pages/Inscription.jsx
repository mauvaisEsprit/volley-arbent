import Hero from "../assets/photo.avif"; 
import Images from "../components/Images";
import "../styles/pageStyles/Inscription.css";


export default function Inscription() {
  const docs = [
    { file: "/public/Fiche adhésion 2024-2025.pdf", label: "Fiche d'adhésion" },
    { file: "/public/FFvolley_qs_sport_sportifs_mineurs_2024-25 (2).pdf", label: " Formulaire d'inscription des mineurs" },
    { file: "/public/Formulaire_demande_licences_2024_2025 (1).pdf", label: "Formulaire de demande de licences"},
  ];


  


  return (
    <>
    <Images images={Hero} text="Formulaires d'inscription" buttonText="Découvrir" />
    <div className="page">

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
    </>
  );
}
