import Images from "../components/Images";
export default function Contact() {
   const imageHome = "https://www.pa-sport.fr/wp-content/uploads/qrwjxvaqujmpykl5y3ws-4-scaled.jpg";
  return (
    <div>
      <Images images={imageHome} text="Contactez-nous" buttonText="Contacter" />
      <h2>Contact</h2>
      <p>Pour toute question, veuillez nous écrire à contact@clubvolley.fr</p>
    </div>
  );
}

