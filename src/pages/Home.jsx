import "../styles/pageStyles/Home.css";
import Images from "../components/Images";
import Partenaires from "../components/Partenaires";
import { motion, AnimatePresence } from "framer-motion";
import ScrollUpButton from "../components/ScrollUpButton";
import { useState, useEffect } from "react";
import Hero from '../assets/photo.avif'; // Assuming you have a photo.avif in the assets folder
import { Link } from "react-router-dom";

export default function Home() {
  const imageHome = Hero;

  const [showPartenaires, setShowPartenaires] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [news, setNews] = useState([]);
  const [nextMatch, setNextMatch] = useState(null);
  const [nextSlots, setNextSlots] = useState([]);

  // 💡 Получить ближайшую дату для дня недели + времени
  function getNextOccurrence({ weekday, startTime }) {
    const weekdayMap = {
      Dimanche: 0,
      Lundi: 1,
      Mardi: 2,
      Mercredi: 3,
      Jeudi: 4,
      Vendredi: 5,
      Samedi: 6,
    };

    const [hour, minute] = startTime.split(":").map(Number);
    const now = new Date();
    const currentDay = now.getDay();
    const targetDay = weekdayMap[weekday];

    let daysToAdd = (targetDay - currentDay + 7) % 7;
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + daysToAdd);
    targetDate.setHours(hour, minute, 0, 0);

    if (daysToAdd === 0 && targetDate <= now) {
      targetDate.setDate(targetDate.getDate() + 7);
    }

    return targetDate;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    async function fetchNextSlots() {
      try {
        const res = await fetch("https://volleyback.onrender.com/api/creneaux");
        if (!res.ok) throw new Error("Erreur réseau");

        const data = await res.json();

        const upcoming = data
          .map((slot) => ({
            ...slot,
            nextOccurrence: getNextOccurrence(slot),
          }))
          .sort((a, b) => a.nextOccurrence - b.nextOccurrence)
          .slice(0, 3);

        setNextSlots(upcoming);
      } catch (err) {
        console.error("Erreur lors du chargement des créneaux :", err);
      }
    }

    fetchNextSlots();
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
    className="home-hero"
/>

  <section className="home-section home-intro container">
    <h1 className="home-title">Bienvenue sur le site officiel du club !</h1>
    <p className="home-description">
      Rejoignez-nous pour vivre le volley avec passion, camaraderie et
      esprit sportif.
    </p>
  </section>

  <section className="home-section home-news container">
    <h2 className="home-subtitle">Actualités</h2>
    <ul className="home-news-list">
      {news.length === 0 ? (
        <li className="home-news-item">Aucune actualité disponible.</li>
      ) : (
        news.map((item) => (
          <li key={item._id || item.id} className="home-news-item">
            📅{" "}
            <Link to={`/news/${item.slug}`} className="home-news-link">
              <strong>{item.title}</strong>
            </Link>{" "}
            {item.date && (
              <span className="home-news-date">
                {" "}
                —{" "}
                {new Date(item.createdAt).toLocaleString("fr-FR", {
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
    <Link to="/news" className="home-btn-link">
      Voir toutes les actualités
    </Link>
  </section>

  <section className="home-section home-schedule container">
    <h2 className="home-subtitle">Prochains créneaux</h2>
    {nextSlots.length === 0 ? (
      <p className="home-empty-text">Aucun créneau à venir.</p>
    ) : (
      <ul className="home-schedule-list">
        {nextSlots.map((slot) => (
          <li key={slot._id || slot.id} className="home-schedule-item">
            📅{" "}
            <Link to="/planning" className="home-schedule-link">
              {slot.nextOccurrence.toLocaleString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              — {slot.concerned} ({slot.location})
            </Link>
          </li>
        ))}
      </ul>
    )}
    <Link to="/planning" className="home-btn-link">
      Voir tous les creneaux
    </Link>
  </section>

  <section className="home-section home-match container">
    <h2 className="home-subtitle">Prochain événement</h2>
    {!nextMatch ? (
      <p className="home-empty-text">Aucun match ou tournoi à venir.</p>
    ) : (
      <p className="home-match-info">
        {nextMatch.type === "match" ? "🏐 Match :" : "🏆 Tournoi :"}{" "}
        <Link to={`/events/${nextMatch.slug}`} className="home-match-link">
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
    <Link to="/planning" className="home-btn-link">
      Voir tous les evénements
    </Link>
  </section>

  <section className="home-section home-partenaires container">
    <h2 className="home-subtitle">Nos partenaires</h2>

    {isMobile && (
      <button
        className="home-btn-toggle-partenaires"
        onClick={() => setShowPartenaires(!showPartenaires)}
      >
        {showPartenaires ? "Masquer" : "Afficher"} les partenaires
      </button>
    )}

    <AnimatePresence initial={false}>
      {showPartenaires && (
        <motion.div
          className="home-partenaires-content"
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

  <ScrollUpButton className="home-scroll-up" />

</main>

  );
}