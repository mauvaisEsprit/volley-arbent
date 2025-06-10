import React from 'react';
import Images from '../components/Images';
import Hero from '../assets/4R5KFUBYIRD23OJOG4NCZ6FWEA.avif';
import '../styles/pageStyles/MentionsLegales.css'; // не забудь создать CSS-файл

const MentionsLegales = () => {
  return (
    <>
    <Images
        images={Hero}
        text="Mentions Legales"
        buttonText="Decouvrir"
      />
    <section className="legal-mentions">
      <h1 className="legal-title">Mentions légales</h1>

      <div className="legal-content">
        <h2>Éditeur du site</h2>
        <p>
          Ce site est édité par l'association <strong>Volley Arbent</strong>, régie par la loi 1901.
        </p>
        <ul>
          <li><strong>Nom complet :</strong> Volley Arbent</li>
          <li><strong>Numéro RNA :</strong> W014005200</li>
          <li><strong>Numéro de parution :</strong> 20230045</li>
          <li><strong>SIRET :</strong> 924 691 884 00010</li>
          <li><strong>Siège social :</strong> [à compléter avec l’adresse complète]</li>
          <li><strong>Email :</strong> [à compléter]</li>
        </ul>

        <h2>Hébergement</h2>
        <p>
          Ce site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
          <br />
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Tous les contenus (textes, images, logos, etc.) présents sur ce site sont la propriété de l'association
          Volley Arbent, sauf mention contraire, et ne peuvent être reproduits sans autorisation préalable.
        </p>

        <h2>Responsabilité</h2>
        <p>
          L'association Volley Arbent s'efforce d'assurer l'exactitude des informations diffusées sur le site, mais
          ne peut garantir l'absence d’erreurs ou d’omissions. Elle se réserve le droit de modifier le contenu à
          tout moment.
        </p>
      </div>
    </section>
    </>
  );
};

export default MentionsLegales;
