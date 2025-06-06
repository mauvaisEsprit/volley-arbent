import Images from "../components/Images";
export default function Home() {


  const imageHome = "https://ca-times.brightspotcdn.com/dims4/default/2aaf5f0/2147483647/strip/true/crop/4256x2832+0+0/resize/1200x798!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F52%2Ff7%2F283a4f1343e19226def7445faf7d%2Fhttps-delivery.gettyimages.com%2Fdownloads%2F171247618.jpg";
  return (
    <div>
      <Images images={imageHome} text="Bienvenue au Club de Volley d'Arbent" buttonText="Decouvrir" />
      <h1>Bienvenue sur le site du club de volley !</h1>
      <p>Suivez les dernières nouvelles, le calendrier des matchs et plus encore.</p>
    </div>
  );
}

