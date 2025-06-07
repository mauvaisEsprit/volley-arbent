import "../styles/pageStyles/Home.css";
import Images from "../components/Images";
import Partenaires from "../components/Partenaires";
import ScrollUpButton from "../components/ScrollUpButton";

export default function Home() {
  const imageHome =
    "https://www.lexpress.fr/resizer/ymRRXr6fSYpJ74FlTiOiwKrGRQc=/arc-photo-lexpress/eu-central-1-prod/public/4R5KFUBYIRD23OJOG4NCZ6FWEA.jpg";
  
  return (
    <main className="home">
      <Images
        images={imageHome}
        text="Bienvenue au Club de Volley d'Arbent"
        buttonText="Découvrir"
      />

      <section className="intro container">
        <h1>Bienvenue sur le site officiel du club !</h1>
        <p>
          Rejoignez-nous pour vivre le volley avec passion, camaraderie et esprit sportif.
        </p>
      </section>

      <section className="actus container">
        <h2>Actualités</h2>
        <ul>
          <li>📅 <strong>Tournoi régional</strong> prévu le 15 juin à 14h</li>
          <li>👟 <strong>Reprise des entraînements jeunes</strong> dès le 10 juin</li>
          <li>🎉 <strong>Soirée conviviale</strong> du club prévue le 30 juin</li>
        </ul>
      </section>

      <section className="match container">
        <h2>Prochain match</h2>
        <p>🏐 <strong>Arbent VS Oyonnax</strong> — Samedi 22 juin à 18h (Salle Municipale)</p>
      </section>

      <section className="partenaires container">
        <h2>Nos partenaires</h2>
        <Partenaires />
      </section>

      <ScrollUpButton />
    </main>
  );
}
