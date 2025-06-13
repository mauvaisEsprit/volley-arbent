import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/pageStyles/Planning.css";
import Images from "../components/Images";
import MatchCalendar from "../pages/Calendrier";
import Hero from "../assets/4R5KFUBYIRD23OJOG4NCZ6FWEA.avif";

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
    <div>
      <Images
        images={Hero}
        text="Créneaux d'entraînement et calendrier"
        buttonText="Découvrir"
      />

      <div className="schedule-container">
        <h2 className="schedule-title">📅 Créneaux d'entraînement</h2>

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
                              <td data-label="Heure début">
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

      <h2 className="schedule-title">📅 Calendrier</h2>
      <MatchCalendar />
    </div>
  );
}
