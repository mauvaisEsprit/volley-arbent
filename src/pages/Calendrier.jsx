import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
import "../styles/pageStyles/Calendrier.css";

export default function MatchCalendar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const TYPE_CLASS = {
    match: "event-match",
    tournoi: "event-tournament",
    soiree: "event-party",
    autre: "event-default",
  };

  const TYPE_COLORS = {
    match: "#4caf50",
    tournoi: "#1976d2",
    soiree: "#e64a19",
    autre: "#9e9e9e",
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://volleyback.onrender.com/api/events");
        const data = await res.json();

        const formatted = data.map((ev) => ({
          title: ev.title,
          start: ev.start,
          end: ev.end,
          className: TYPE_CLASS[ev.type] || "event-default",
          backgroundColor: TYPE_COLORS[ev.type] || "#999",
          borderColor: TYPE_COLORS[ev.type] || "#999",
          extendedProps: {
            description: ev.description,
            image: ev.image,
            type: ev.type,
          },
        }));

        setEvents(formatted);
      } catch (err) {
        console.error("Erreur lors du chargement des événements :", err);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = ({ event }) => {
    const clickedEvent = {
      title: event.title,
      start: event.start,
      end: event.end,
      type: event.extendedProps.type,
      description: event.extendedProps.description,
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
          ]}
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

       {/* Легенда с цветами */}
      <div className="legend">
        <h3>Légende des événements</h3>
        <div className="legend-items">
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: TYPE_COLORS.match }}
            ></span>
            Match
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: TYPE_COLORS.tournoi }}
            ></span>
            Tournoi
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: TYPE_COLORS.soiree }}
            ></span>
            Soirée
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: TYPE_COLORS.autre }}
            ></span>
            Autre
          </div>
        </div>
      </div>

      


      {modalIsOpen && selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedEvent.title}</h2>

            {selectedEvent.image && (
              <div className="modal-image-wrapper">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="modal-image"
                />
              </div>
            )}

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
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <p>
              <strong>Type:</strong>{" "}
              {selectedEvent.type.charAt(0).toUpperCase() +
                selectedEvent.type.slice(1)}
            </p>

            <p>
              <strong>Description:</strong> {selectedEvent.description}
            </p>

            <button onClick={closeModal}>Fermer</button>
          </div>
        </div>
      )}
    </>
  );
}
