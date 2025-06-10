import React from 'react';
import '../styles/pageStyles/About.css'; // подключение кастомных стилей
import Images from '../components/Images';
import Hero from '../assets/4R5KFUBYIRD23OJOG4NCZ6FWEA.avif';

const About = () => {
  return (
    <>
    <Images images={Hero} text="À propos du Club" buttonText="Decouvrir" />
    <section className="about-club">
      <h1 className="about-title">À propos du Club</h1>

      <div className="about-content">
        <p>
          Le <strong>Volley Arbent</strong> est un club dynamique situé dans la commune d’Arbent, dédié à la
          promotion du volley-ball pour tous les âges et niveaux. Il vise à offrir un cadre sportif accessible,
          convivial et formateur à ses membres.
        </p>

        <h2 className="about-subtitle">Histoire du Club</h2>
        <p>
          Fondé il y a plusieurs décennies par des passionnés, le club a grandi au fil des années pour accueillir
          aujourd’hui plusieurs équipes allant des jeunes aux adultes. Grâce à l’implication des bénévoles et
          entraîneurs, le club participe régulièrement aux compétitions locales et organise des événements pour
          renforcer le lien avec la communauté.
        </p>

        <h2 className="about-subtitle">Nos valeurs</h2>
        <ul>
          <li>💪 Esprit d’équipe</li>
          <li>🏐 Plaisir du jeu</li>
          <li>📈 Développement des jeunes</li>
          <li>🌍 Ouverture à tous</li>
        </ul>

        <h2 className="about-subtitle">Ambitions</h2>
        <p>
          Le club souhaite continuer à se développer, accueillir de nouveaux membres, former des jeunes talents
          et organiser des événements qui rassemblent la communauté locale autour des valeurs du sport.
        </p>
      </div>
    </section>
    </>
  );
};

export default About;
