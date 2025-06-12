import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import momentPlugin from "@fullcalendar/moment";
import moment from "moment";
import fr from "moment/locale/fr"; // ⬅️ И импортируем как переменную
moment.updateLocale("fr", fr); // ⬅️ Применяем вручную
moment.locale("fr");

import frLocale from "@fullcalendar/core/locales/fr";
import "../styles/pageStyles/Calendrier.css";

export default function MatchCalendar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/events"); // адаптируй к своему API
        const data = await res.json();

        // Преобразуем при необходимости
        const formatted = data.map((event) => ({
          ...event,
          className: getEventClass(event.type),
        }));

        setEvents(formatted);
      } catch (err) {
        console.error("Erreur lors du chargement des événements :", err);
      }
    };

    fetchEvents();
  }, []);

  const getEventClass = (type) => {
    switch (type) {
      case "match":
        return "event-match";
      case "tournament":
        return "event-tournament";
      case "party":
        return "event-party";
      default:
        return "event-default";
    }
  };

  const handleEventClick = ({ event }) => {
  const clickedEvent = {
    title: event.title,
    start: event.start,
    end: event.end,
    type: event.extendedProps.type,
    description: event.extendedProps.description,
    content: event.extendedProps.content,
    image: event.extendedProps.image,
  };
  setSelectedEvent(clickedEvent);
  setModalIsOpen(true);
};


  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };


  return (
    <>
      <div className="calendar-container">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
            momentPlugin,
          ]}
          initialView="dayGridMonth"
          locale={frLocale}
          events={events} // ← теперь данные из бэка
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

     
     {modalIsOpen && selectedEvent && (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2>{selectedEvent.title}</h2>

      <p>
        <strong>Début :</strong>{" "}
        {new Date(selectedEvent.start).toLocaleString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <p>
        <strong>Fin :</strong>{" "}
        {new Date(selectedEvent.end).toLocaleString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <p>
        <strong>Type :</strong> {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
      </p>

      <p>
        <strong>Description :</strong> {selectedEvent.description}
      </p>

      {selectedEvent.content && (
        <p>
          <strong>Contenu :</strong> {selectedEvent.content}
        </p>
      )}

      {selectedEvent.image && (
        <div className="modal-image-wrapper">
          <img src={selectedEvent.image} alt={selectedEvent.title} className="modal-image" />
        </div>
      )}

      <button onClick={closeModal}>Fermer</button>
    </div>
  </div>
)}

      
    </>
  );
}
