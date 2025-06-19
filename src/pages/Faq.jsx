import React, { useState } from "react";
import "../styles/pageStyles/Faq.css";
import Images from "../components/Images";
import Hero from '../assets/photo.avif'; // Assuming you have a photo.avif in the assets folder
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "Comment puis-je m'inscrire au club ?",
    answer:
      "Vous pouvez vous inscrire directement lors des entraînements. N'oubliez pas de fournir un certificat médical valide.",
  },
  {
    question: "Quels sont les créneaux d'entraînement ?",
    answer:
      "Les créneaux varient selon l'âge et le niveau. Consultez notre page Planning ou contactez-nous pour plus de détails personnalisés.",
  },
  {
    question: "Proposez-vous des entraînements pour les débutants ?",
    answer:
      "Absolument ! Nous accueillons tous les niveaux, y compris les débutants, dans un cadre bienveillant et formateur.",
  },
  {
    question: "Quel est le coût de l’adhésion annuelle ?",
    answer:
      "Le tarif dépend de l’âge et du niveau. En général, l’adhésion varie entre 80€ et 120€ par an, assurance comprise.",
  },
  {
    question: "Puis-je faire un essai avant de m’inscrire ?",
    answer:
      "Oui, vous pouvez faire jusqu'à deux séances d’essai gratuites avant de prendre votre décision.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
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

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Images images={Hero} text="Foire Aux Questions" buttonText="Découvrir" />
    <main className="faq-page">
      <div className="faq-container">
        <h1 className="faq-title">Foire Aux Questions</h1>
        <p className="faq-intro">
          Retrouvez ici les réponses aux questions les plus fréquentes. Si vous avez d'autres interrogations, n'hésitez pas à nous contacter.
        </p>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleIndex(index)}
            >
              <div className="faq-question">
                <span>{item.question}</span>
                <span className="arrow">{activeIndex === index ? "▲" : "▼"}</span>
              </div>
              <div className="faq-answer">{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="privacy-back">
                <Link to="/" onClick={(e) =>{
                  handleLinkClick(e, "/")} }>← Retour à l'accueil</Link>
                  
              </div>
    </main>
    </>
  );
}
