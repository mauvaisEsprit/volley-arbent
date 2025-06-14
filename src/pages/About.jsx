import React from 'react';
import '../styles/pageStyles/About.css'; 
import Images from '../components/Images';
import Hero from '../assets/4R5KFUBYIRD23OJOG4NCZ6FWEA.avif';

const About = () => {
  return (
    <div className='about-container'>
      <Images images={Hero} text="À propos du Club" buttonText="Découvrir" />
      <section className="about-club">
        <h1 className="about-title">À propos du Club</h1>

        <div className="about-content">
          <p>
            Le <strong>Volley Arbent</strong> est bien plus qu’un simple club sportif. C’est une véritable famille où la passion du volley-ball se mêle à la volonté de partager des valeurs humaines fortes. Situé au cœur de la commune d’Arbent, notre club œuvre avec enthousiasme pour offrir un environnement stimulant, convivial et accessible à tous, quel que soit l’âge ou le niveau.
          </p>

          <h2 className="about-subtitle">Une histoire riche et engagée</h2>
          <p>
            Fondé il y a plusieurs années par un groupe de passionnés, le Volley Arbent a su évoluer et s’adapter aux défis du temps, tout en gardant son esprit d’origine. Grâce à l’engagement sans faille de ses bénévoles, entraîneurs et joueurs, le club s’est forgé une solide réputation sur le plan local et régional. Chaque saison, plusieurs équipes composées de jeunes talents et de joueurs expérimentés se mobilisent pour représenter fièrement nos couleurs lors de compétitions et tournois.
          </p>

          <h2 className="about-subtitle">Nos valeurs fondamentales</h2>
          <ul>
            <li>💪 <strong>Esprit d’équipe</strong> — La force collective est notre moteur. Ensemble, nous repoussons nos limites et célébrons nos réussites.</li>
            <li>🏐 <strong>Plaisir du jeu</strong> — Chaque entraînement et chaque match sont vécus avec passion et joie, car le sport est avant tout un moment de partage.</li>
            <li>📈 <strong>Développement des jeunes</strong> — Nous investissons dans la formation et l’accompagnement de nos jeunes pour construire les champions de demain, tant sur le terrain que dans la vie.</li>
            <li>🌍 <strong>Ouverture et inclusion</strong> — Le club est un lieu d’accueil où chacun trouve sa place, indépendamment de son origine, âge ou niveau sportif.</li>
          </ul>

          <h2 className="about-subtitle">Nos ambitions pour l’avenir</h2>
          <p>
            En regardant vers l’avenir, le Volley Arbent nourrit de grandes ambitions. Nous souhaitons renforcer notre ancrage local en multipliant les actions en faveur de la jeunesse et en organisant des événements fédérateurs. Notre objectif est de développer des partenariats solides, améliorer nos infrastructures et continuer à cultiver un esprit de compétition saine et respectueuse. Notre engagement est de faire grandir notre club en harmonie avec les attentes de notre communauté, toujours avec la même énergie et passion qui nous animent depuis nos débuts.
          </p>

          <p>
            Rejoignez-nous dans cette aventure sportive et humaine, et participez à l’écriture d’une histoire collective où chaque membre compte.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
