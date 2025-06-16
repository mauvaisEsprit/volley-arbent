import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
import { useNavigate } from "react-router-dom";      // ← обычный дефис
import "../styles/pageStyles/Calendrier.css";

export default function MatchCalendar() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const TYPE_COLORS = {
    match: "#4caf50",
    tournoi: "#1976d2",
    soiree: "#e64a19",
    autre: "#9e9e9e",
  };

  const TYPE_CLASS = {
    match: "event-match",
    tournoi: "event-tournament",
    soiree: "event-party",
    autre: "event-default",
  };

  // ─────────────────── загрузка событий
 // ─────────────────── загрузка событий
useEffect(() => {
  (async () => {
    try {
      const res  = await fetch(
        "https://volleyback.onrender.com/api/events"
      );
      const data = await res.json();

      const formatted = data.map((ev) => {
        // нормализуем на всякий случай
        const type  = (ev.type || "autre").toLowerCase();
        const color = TYPE_COLORS[type] || "#999";

        return {
          // стандартные поля FullCalendar
          id: ev._id,
          title: ev.title,
          start: ev.start,
          end:   ev.end,

          // короткий способ задать фон + бордер
          color,

          // если нужны кастомные классы
          classNames: [TYPE_CLASS[type] || "event-default"],

          // всё, что хотите видеть при клике
          extendedProps: {
            slug: ev.slug,
            type,          // ← теперь доступно как event.extendedProps.type
          },
        };
      });

      

      setEvents(formatted);
    } catch (err) {
      console.error("Erreur lors du chargement des événements :", err);
    }
  })();
}, []);


  // ─────────────────── переход на страницу события
  const handleEventClick = ({ event }) => {
    navigate(`/events/${event.extendedProps.slug}`);
  };

  

  return (
    <>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView="dayGridMonth"
          locale={frLocale}
          events={events}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          height="auto"
          eventClick={handleEventClick}
          buttonText={{
            today: "Aujourd’hui",
            month: "Mois",
            week: "Semaine",
            day: "Jour",
            list: "Agenda",
          }}
        />
      </div>

      {/* ──────────────── Легенда */}
      <div className="legend">
        <h3>Légende des événements</h3>
        <div className="legend-items">
          {Object.entries(TYPE_COLORS).map(([key, color]) => (
            <div className="legend-item" key={key}>
              <span className="legend-color" style={{ backgroundColor: color }} />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
