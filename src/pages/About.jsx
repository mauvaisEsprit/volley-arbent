import Images from "../components/Images";
export default function About() {
   const imageHome = "https://letsgometz.com/wp-content/uploads/2023/06/IMG_0264-scaled.jpg";
  return (
    <div>
      <Images images={imageHome} text="À propos du club" buttonText="Decouvrir" />
      <h2>À propos du club</h2>
      <p>Notre club de volley accueille les passionnés de tous niveaux.</p>
    </div>
  );
}


