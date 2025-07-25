import React from "react";
import { Link } from "react-router-dom";
import "../styles/pageStyles/PrivacyPolicy.css";
import Images from "../components/Images";
import Hero from '../assets/photo.avif'; // Assuming you have a photo.avif in the assets folder
import { useLocation } from "react-router-dom";

export default function PrivacyPolicy() {
  const location = useLocation();
  const handleLinkClick = (e, path) => {
  if (location.pathname === path) {
    e.preventDefault();
    // отложим скролл, чтобы partenaires успел прогрузиться
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500); // можно поиграться с задержкой (зависит от анимации)
  }
};

  return (
    <>
      <Images images={Hero} text="Politique de confidentialité" buttonText="Découvrir" />
    <main className="privacy-policy">
      <div className="privacy-container">
        <h1 className="privacy-title">Politique de confidentialité</h1>

        <p>
          Le Club de Volley d’Arbent attache une grande importance à la protection de vos données personnelles.
          Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
        </p>

        <h2>1. Collecte des informations</h2>
        <p>
          Nous collectons des données lorsque vous vous inscrivez à une activité, remplissez un formulaire ou naviguez sur notre site.
          Les types de données collectées peuvent inclure : nom, prénom, adresse e-mail, numéro de téléphone, etc.
        </p>

        <h2>2. Utilisation des données</h2>
        <p>
          Vos données sont utilisées uniquement pour gérer les inscriptions, vous contacter, envoyer des informations liées au club
          et améliorer notre site.
        </p>

        <h2>3. Partage des données</h2>
        <p>
          Aucune donnée personnelle n’est vendue ni partagée avec des tiers, sauf obligation légale ou consentement explicite.
        </p>

        <h2>4. Sécurité</h2>
        <p>
          Nous mettons en œuvre toutes les mesures nécessaires pour assurer la sécurité de vos données (cryptage, accès restreint, etc.).
        </p>

        <h2>5. Vos droits</h2>
        <p>
          Vous disposez d’un droit d’accès, de rectification, de suppression ou d’opposition concernant vos données personnelles.
          Pour exercer ce droit, contactez-nous à l’adresse suivante :{" "}
          <a href="mailto:contact@arbentvolley.fr">contact@arbentvolley.fr</a>.
        </p>

        <h2>6. Cookies</h2>
        <p>
          Ce site utilise des cookies pour améliorer votre expérience utilisateur. Vous pouvez les accepter ou les refuser via votre navigateur.
        </p>

        <h2>7. Modifications</h2>
        <p>
          Cette politique peut être modifiée à tout moment. Dernière mise à jour : 10 juin 2025.
        </p>

        <div className="privacy-back">
          <Link to="/" onClick={(e) =>{
            handleLinkClick(e, "/")} }>← Retour à l'accueil</Link>
            
        </div>
      </div>
    </main>
    </>
  );
}
