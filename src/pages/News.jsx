import React from 'react';
import Images from '../components/Images';
import Hero from '../assets/4R5KFUBYIRD23OJOG4NCZ6FWEA.avif';
import '../styles/pageStyles/News.css';

const newsList = [
  {
    title: "Ouverture de la saison 2025‑2026",
    date: "10 juin 2025",
    image: "https://lh6.googleusercontent.com/sTHQ-X5jbnZSdmLqkWysa_jBxQL99eHrT7aeZnsaJJRkLGLCiFRD9_xrMvAMvmpioHqNRDx_16y9SdJq95YXWNwdO2wVCV_wiWI91JDbHacZrLEvdHLrbCtst9xhrl_hIsvQbBpXvZU=w1280",
    excerpt:
      "Rejoignez-nous dès septembre : entraînements, tournois et bonne ambiance au rendez-vous !",
  },
  {
    title: "Tournoi de printemps – un franc succès",
    date: "25 mai 2025",
    image: "https://lh5.googleusercontent.com/ybtg6vSFEKLKkKGene3cgfwgo1aRtsd5Rmocg8qZp9xAn-qT2XFZWYbpu-f9BF8sGdyTurQWsp7bI2CPq0fI_2ksVoHQSJN0AEe4Dbe1lcpEbKAVKwFECHzodAqlW269nxPbtCyvkylfdTLjR_L126vnP2TokhZ8yxOCoJaJbGMOr5GoUP22SA=w1280",
    excerpt:
      "Plus de 150 joueurs, une atmosphère folle et des bénévoles formidables. Merci à tous !",
  },
  {
    title: "Le club cherche des bénévoles",
    date: "15 avril 2025",
    image: "https://lh5.googleusercontent.com/X6YbwgMQIPXDIav7aQawV3xXGFUpiwiSqH_15HS2YqR4yOhTSDkcs4ta8aCwjbNRAiCX_LAzIWDCqDpE-pRAPcWHNplzzRg1XPbGf2vv8CTJPbr0FP4wOm1sgPerMNHt8imffL6kOpO0PAAXJOtUNc6jd0DQaBeQNv8-YKLg-ZbAIpQaI-m8Nw=w1280",
    excerpt:
      "Envie de nous aider ? Encadrement des jeunes, accueil, buvette... toute aide est la bienvenue !",
  },
];

const Actualites = () => (
  <>
  <Images images={Hero} text="Actualités" buttonText="Découvrir" />
  <section className="actualites">
    <h1 className="actualites__title">Actualités</h1>
    <div className="actualites__grid">
      {newsList.map((n, i) => (
        <article key={i} className="card">
          <div className="card__image-wrapper">
            <img src={n.image} alt={n.title} className="card__image" />
            <div className="card__overlay">
              <span className="card__date">{n.date}</span>
            </div>
          </div>
          <div className="card__body">
            <h2 className="card__title">{n.title}</h2>
            <p className="card__excerpt">{n.excerpt}</p>
            <button className="card__btn">Lire la suite →</button>
          </div>
        </article>
      ))}
    </div>
  </section>
  </>
);

export default Actualites;
