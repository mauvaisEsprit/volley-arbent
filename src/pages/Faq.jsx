import React, { useState } from "react";
import "../styles/pageStyles/Faq.css";
import Images from "../components/Images";
import Hero from "../assets/4R5KFUBYIRD23OJOG4NCZ6FWEA.avif";

const faqData = [
  {
    question: "Comment puis-je m'inscrire au club ?",
    answer:
      "Vous pouvez vous inscrire directement lors des entraînements ou via notre formulaire d’inscription en ligne. N'oubliez pas de fournir un certificat médical valide.",
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
    </main>
    </>
  );
}
