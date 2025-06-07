import "../styles/pageStyles/Home.css";
import Images from "../components/Images";
import Partenaires from "../components/Partenaires";
import { motion, AnimatePresence } from "framer-motion";
import ScrollUpButton from "../components/ScrollUpButton";
import { useState, useEffect } from "react";
import Hero from "../assets/4R5KFUBYIRD23OJOG4NCZ6FWEA.avif";

export default function Home() {
  const imageHome = Hero;

  const [showPartenaires, setShowPartenaires] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobileNow = window.innerWidth < 768;
    setIsMobile(isMobileNow);
    if (isMobileNow) {
      setShowPartenaires(false);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          Rejoignez-nous pour vivre le volley avec passion, camaraderie et
          esprit sportif.
        </p>
      </section>

      <section className="actus container">
        <h2>Actualités</h2>
        <ul>
          <li>
            📅 <strong>Tournoi régional</strong> prévu le 15 juin à 14h
          </li>
          <li>
            👟 <strong>Reprise des entraînements jeunes</strong> dès le 10 juin
          </li>
          <li>
            🎉 <strong>Soirée conviviale</strong> du club prévue le 30 juin
          </li>
        </ul>
      </section>

      <section className="schedule-preview container">
        <h2>Prochains créneaux</h2>
        <ul>
          <li>📅 Lundi 18h00-19h30 — Entraînement M13-M15 (Gymnase Arbent)</li>
          <li>
            📅 Mercredi 18h15-20h15 — Entraînement M18 féminine (Gymnase Jean
            Moulin)
          </li>
          <li>📅 Samedi 9h30-11h00 — École de volley (Gymnase Arbent)</li>
        </ul>
        <a href="/creneaux" className="btn-link">
          Voir tout le planning
        </a>
      </section>

      <section className="match container">
        <h2>Prochain match</h2>
        <p>
          🏐 <strong>Arbent VS Oyonnax</strong> — Samedi 22 juin à 18h (Salle
          Municipale)
        </p>
      </section>

      <section className="partenaires container">
        <h2>Nos partenaires</h2>

        {isMobile && (
          <button
            className="toggle-partenaires-btn"
            onClick={() => setShowPartenaires(!showPartenaires)}
          >
            {showPartenaires ? "Masquer" : "Afficher"} les partenaires
          </button>
        )}

        <AnimatePresence initial={false}>
          {showPartenaires && (
            <motion.div
              className="partenaires-content"
              key="partenaires"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{
                height: { duration: 0.6 },
                opacity: { duration: 0.9 },
              }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: "hidden" }}
            >
              <Partenaires />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <ScrollUpButton />
    </main>
  );
}
