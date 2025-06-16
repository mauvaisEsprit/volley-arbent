import React, { useState } from "react";
import "../styles/pageStyles/Contact.css";
import Images from "../components/Images";
import Hero from '../assets/photo.avif'; // Assuming you have a photo.avif in the assets folder

const Contact = ({ initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    message: initialData.message || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    

    fetch("https://volleyback.onrender.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de l'envoi");
        return res.json();
      })
      .then((data) => {
        console.log("Message envoyé", data);
        setFormData({ name: "", email: "", message: "" }); // очистка формы
        alert("Votre message a été envoyé avec succès !");
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de l'envoi du message");
      });
  };

  return (
    <>
      <Images images={Hero} text="Contactez-nous" buttonText="Découvrir" />
      <section className="contact-section">
        <div className="contact-container">
          <h1 className="contact-title">Contactez-nous</h1>
          <p className="contact-intro">
            Vous avez une question, une demande d'information ou souhaitez rejoindre notre club ? Contactez-nous via le formulaire ci-dessous.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Votre nom"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Adresse email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Votre adresse email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                placeholder="Votre message..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="contact-button">
              Envoyer
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
