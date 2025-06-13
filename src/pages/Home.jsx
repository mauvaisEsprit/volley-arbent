import "../styles/pageStyles/Home.css";
import Images from "../components/Images";
import Partenaires from "../components/Partenaires";
import { motion, AnimatePresence } from "framer-motion";
import ScrollUpButton from "../components/ScrollUpButton";
import { useState, useEffect } from "react";
import Hero from "../assets/4R5KFUBYIRD23OJOG4NCZ6FWEA.avif";
import { Link } from "react-router-dom";

export default function Home() {
  const imageHome = Hero;

  const [showPartenaires, setShowPartenaires] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [news, setNews] = useState([]);
  const [nextMatch, setNextMatch] = useState(null);

  useEffect(() => {
    // небольшой таймер, чтобы дать анимации partenaires закончиться
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600); // 600 мс, т.к. height animation = 0.6s

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    async function fetchNextEvent() {
      try {
        const res = await fetch("https://volleyback.onrender.com/api/events");
        if (!res.ok) throw new Error("Erreur réseau");
        const data = await res.json();

        const upcomingEvent = data
          .filter(
            (ev) =>
              (ev.type === "match" || ev.type === "tournoi") &&
              new Date(ev.start) > new Date()
          )
          .sort((a, b) => new Date(a.start) - new Date(b.start))[0];

        setNextMatch(upcomingEvent || null);
      } catch (err) {
        console.error("Erreur lors du chargement du prochain événement :", err);
      }
    }

    fetchNextEvent();
  }, []);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("https://volleyback.onrender.com/api/news");
        if (!res.ok) throw new Error("Erreur réseau");

        const data = await res.json();

        // сортируем по createdAt (новее → старее) и берём первые 3
        const topThree = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);

        setNews(topThree);
      } catch (error) {
        console.error("Erreur lors du chargement des actualités :", error);
      }
    }

    fetchNews();
  }, []);

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
          {news.length === 0 ? (
            <li>Aucune actualité disponible.</li>
          ) : (
            news.map((item) => (
              <li key={item._id || item.id}>
                {/* Здесь предполагается, что item имеет поля: title, slug, date */}
                📅{" "}
                <Link to={`/news/${item.slug}`} className="link-actus">
                  <strong>{item.title}</strong>
                </Link>{" "}
                {item.date && (
                  <span>
                    {" "}
                    —{" "}
                    {new Date(item.date).toLocaleString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </li>
            ))
          )}
        </ul>
        <Link to="/news" className="btn-link">
          Voir toutes les actualités
        </Link>
      </section>

      <section className="schedule-preview container">
        <h2>Prochains créneaux</h2>
        <ul>
          <li>
            📅{" "}
            <Link to="/planning#lundi" className="link-schedule">
              Lundi 18h00-19h30 — Entraînement M13-M15 (Gymnase Arbent)
            </Link>
          </li>
          <li>
            📅{" "}
            <Link to="/planning#mercredi" className="link-schedule">
              Mercredi 18h15-20h15 — Entraînement M18 féminine (Gymnase Jean
              Moulin)
            </Link>
          </li>
          <li>
            📅{" "}
            <Link to="/planning#samedi" className="link-schedule">
              Samedi 9h30-11h00 — École de volley (Gymnase Arbent)
            </Link>
          </li>
        </ul>
        <Link to="/planning" className="btn-link">
          Voir tout le planning
        </Link>
      </section>

      <section className="match container">
        <h2>Prochain événement</h2>

        {!nextMatch ? (
          <p>Aucun match ou tournoi à venir.</p>
        ) : (
          <p>
            {nextMatch.type === "match" ? "🏐 Match :" : "🏆 Tournoi :"}{" "}
            <Link to={`/events/${nextMatch.slug}`} className="link-match">
              <strong>{nextMatch.title}</strong>
            </Link>{" "}
            —{" "}
            {new Date(nextMatch.start).toLocaleString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
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
