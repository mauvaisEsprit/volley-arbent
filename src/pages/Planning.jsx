import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/pageStyles/Planning.css";
import scheduleData from "../data/scheduleData";
import Images from "../components/Images";
import Schedule from "./Schedule";
import Hero from "../assets/4R5KFUBYIRD23OJOG4NCZ6FWEA.avif";




export default function Planning() {
  const [activeDay, setActiveDay] = useState(null);

  return (
    <div>
        <Images images={Hero} text="Créneaux d'entraînement et calendrier" buttonText="Découvrir" />
        <div className="schedule-container">
      <h2 className="schedule-title">📅 Créneaux d'entraînement</h2>
      <div className="cards-grid">
        {scheduleData.map(({ day, sessions }) => {
          const isActive = activeDay === day;
          return (
            <motion.div
              layout
              key={day}
              className={`card ${isActive ? "active" : ""}`}
              onClick={() => setActiveDay(isActive ? null : day)}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.h3 layout className="card-day">{day}</motion.h3>
              <AnimatePresence>
                {isActive && (
                  <motion.ul
                    className="sessions-list"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {sessions.map(({ time, activity }) => (
                      <li key={time} className="session-item">
                        <span className="session-time">{time}</span>
                        <span className="session-activity">{activity}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
    <h2 className="schedule-title">📅 Calendrier</h2>
    <Schedule />  
    </div>
  );
}
