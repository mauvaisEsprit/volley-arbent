import Images from "../components/Images";
function Schedule() {
  const imageHome = "https://ca-times.brightspotcdn.com/dims4/default/2aaf5f0/2147483647/strip/true/crop/4256x2832+0+0/resize/1200x798!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F52%2Ff7%2F283a4f1343e19226def7445faf7d%2Fhttps-delivery.gettyimages.com%2Fdownloads%2F171247618.jpg";
  return (
    <div>
      <Images images={imageHome} text="Arbent Volley" buttonText="Decouvrir" />
      <h2>Calendrier des matchs</h2>
      <p>Prochains matchs à venir...</p>
    </div>
  );
}

export default Schedule;
