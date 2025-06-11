import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import momentPlugin from "@fullcalendar/moment";
import moment from "moment";
import frLocale from "@fullcalendar/core/locales/fr";
import "../styles/pageStyles/Calendrier.css";

export default function MatchCalendar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      title: "Match Arbent VS Oyonnax",
      start: "2025-06-22T18:00:00",
      end: "2025-06-22T20:00:00",
      description: "Salle Municipale",
      type: "match",
    },
    {
      title: "Tournoi régional",
      start: "2025-06-15T14:00:00",
      end: "2025-06-15T18:00:00",
      type: "tournament",
    },
    {
      title: "Soirée conviviale",
      start: "2025-06-30T19:00:00",
      end: "2025-06-30T23:00:00",
      type: "party",
    },
  ];

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
    setSelectedEvent(event);
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
          events={events.map((e) => ({
            ...e,
            className: getEventClass(e.type),
          }))}
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
              <strong>Date:</strong>{" "}
              {moment(selectedEvent.start).format("dddd D MMMM YYYY, HH:mm")} –{" "}
              {moment(selectedEvent.end).format("HH:mm")}
            </p>
            {selectedEvent.extendedProps.description && (
              <p>
                <strong>Lieu:</strong>{" "}
                {selectedEvent.extendedProps.description}
              </p>
            )}
            <button onClick={closeModal}>Fermer</button>
          </div>
        </div>
      )}
    </>
  );
}
