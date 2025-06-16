import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/pageStyles/Planning.css";
import Images from "../components/Images";
import MatchCalendar from "../pages/Calendrier";
import Hero from '../assets/photo.avif'; // Assuming you have a photo.avif in the assets folder

const WEEKDAYS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export default function Planning() {
  const [activeDay, setActiveDay] = useState(null);
  const [groupedCreneaux, setGroupedCreneaux] = useState({});

const location = useLocation();

  const creneauxRef = useRef(null);
  const evenementsRef = useRef(null);

  const scrollWithOffset = (el) => {
  const y = el.getBoundingClientRect().top + window.pageYOffset - 150; 
  window.scrollTo({ top: y, behavior: "smooth" });
};

  useEffect(() => {
  const scrollTo = location.state?.scrollTo;

  if (scrollTo === "creneaux" && creneauxRef.current) {
    scrollWithOffset(creneauxRef.current);
  }
  if (scrollTo === "evenements" && evenementsRef.current) {
    scrollWithOffset(evenementsRef.current);
  }
}, [location.state]);

  useEffect(() => {
    fetch("https://volleyback.onrender.com/api/creneaux")
      .then((res) => res.json())
      .then((data) => {
        const grouped = {};
        for (const c of data) {
          if (!grouped[c.weekday]) grouped[c.weekday] = [];
          grouped[c.weekday].push(c);
        }
        setGroupedCreneaux(grouped);
      })
      .catch(() => {
        alert("Erreur lors du chargement des créneaux.");
      });
  }, []);

  const formatHeure = (value) => {
    if (!value) return "";
    if (/^\d{1,2}:\d{2}$/.test(value)) return value;
    const date = new Date(value);
    if (isNaN(date)) return value;
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="planning-container">
      <Images
        images={Hero}
        text="Créneaux d'entraînement et calendrier"
        buttonText="Découvrir"
      />

      <div ref={creneauxRef} id="creneaux" className="schedule-container">
        <h2 className="schedule-title"><span className="schedule-title-icon">📅</span> Créneaux d'entraînement</h2>

        <div className="cards-grid">
          {WEEKDAYS.map((day) => {
            const sessions = groupedCreneaux[day] || [];
            const isActive = activeDay === day;

            return (
              <motion.div
                layout
                key={day}
                className={`card ${isActive ? "active" : ""}`}
                onClick={() => setActiveDay(isActive ? null : day)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.h3 layout className="card-day">
                  {day}
                </motion.h3>

                <AnimatePresence>
                  {isActive && sessions.length > 0 && (
                    <motion.div
                      className="session-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <table className="creneaux-inner-table">
                        <thead>
                          <tr>
                            <th>Heure début</th>
                            <th>Heure fin</th>
                            <th>Concerné</th>
                            <th>Coach</th>
                            <th>Lieu</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sessions.map((s) => (
                            <tr key={s._id}>
                              <td  data-label="Heure début">
                                {formatHeure(s.startTime)}
                              </td>
                              <td data-label="Heure fin">
                                {formatHeure(s.endTime)}
                              </td>
                              <td data-label="Concerné">{s.concerned}</td>
                              <td data-label="Coach">{s.coachName}</td>
                              <td data-label="Lieu">{s.location}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <section ref={evenementsRef} id="evenements" className="schedule-events">
      <h2 className="schedule-title"><span className="schedule-title-icon">📅</span> Calendrier</h2>
      <MatchCalendar />*
      </section>
    </div>
  );
}
