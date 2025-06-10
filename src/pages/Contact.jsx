import React from "react";
import "../styles/pageStyles/Contact.css";
import Images from "../components/Images";
import Hero from "../assets/4R5KFUBYIRD23OJOG4NCZ6FWEA.avif";

const Contact = () => {
  return (
    <>
      <Images images={Hero} text="Contactez-nous" buttonText="Découvrir" />
    <section className="contact-section">
      <div className="contact-container">
        <h1 className="contact-title">Contactez-nous</h1>
        <p className="contact-intro">
          Vous avez une question, une demande d'information ou souhaitez rejoindre notre club ? Contactez-nous via le formulaire ci-dessous.
        </p>

        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input type="text" id="name" name="name" required placeholder="Votre nom" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <input type="email" id="email" name="email" required placeholder="Votre adresse email" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="6" required placeholder="Votre message..." />
          </div>

          <button type="submit" className="contact-button">Envoyer</button>
        </form>
      </div>
    </section>
    </>
  );
};

export default Contact;
