import "../styles/pageStyles/Schedule.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";
import Modal from "react-modal";

import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaStream,
  FaHome,
} from "react-icons/fa";

// Устанавливаем французскую локаль для moment
moment.locale("fr");


// Обновляем локаль, чтобы неделя начиналась с понедельника и форматы даты под франц.
moment.updateLocale("fr", {
  week: {
    dow: 1, // Понедельник - первый день недели
  },
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
})





const localizer = momentLocalizer(moment);

const eventColors = {
  match: "#FF6B6B",
  tournament: "#4ECDC4",
  party: "#556270",
};

function CustomToolbar({ label, onNavigate, onView, view }) {
  return (
    <div className="calendar-toolbar">
      <div className="calendar-toolbar-nav">
        <button onClick={() => onNavigate("TODAY")} title="Aujourd’hui">
          <FaHome />
        </button>
        <button onClick={() => onNavigate("PREV")} title="Précédent">
          <FaChevronLeft />
        </button>
        <span className="calendar-toolbar-label">{label}</span>
        <button onClick={() => onNavigate("NEXT")} title="Suivant">
          <FaChevronRight />
        </button>
      </div>
      <div className="calendar-toolbar-views">
        <button
          onClick={() => onView("month")}
          className={view === "month" ? "active" : ""}
          title="Mois"
        >
          <FaCalendarAlt />
        </button>
        <button
          onClick={() => onView("week")}
          className={view === "week" ? "active" : ""}
          title="Semaine"
        >
          <FaCalendarWeek />
        </button>
        <button
          onClick={() => onView("day")}
          className={view === "day" ? "active" : ""}
          title="Jour"
        >
          <FaCalendarDay />
        </button>
        <button
          onClick={() => onView("agenda")}
          className={view === "agenda" ? "active" : ""}
          title="Agenda"
        >
          <FaStream />
        </button>
      </div>
    </div>
  );
}

function Event({ event }) {
  const color = eventColors[event.type] || "#333";
  return (
    <div
      style={{
        backgroundColor: color,
        padding: "6px 10px",
        borderRadius: 8,
        color: "white",
        fontWeight: "600",
        boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
      className="rbc-event-content"
    >
      {event.title}
    </div>
  );
}

export default function MatchCalendar() {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      title: "Match Arbent VS Oyonnax",
      start: new Date(2025, 5, 22, 18, 0),
      end: new Date(2025, 5, 22, 20, 0),
      desc: "Salle Municipale",
      type: "match",
    },
    {
      title: "Tournoi régional",
      start: new Date(2025, 5, 15, 14, 0),
      end: new Date(2025, 5, 15, 18, 0),
      type: "tournament",
    },
    {
      title: "Soirée conviviale",
      start: new Date(2025, 5, 30, 19, 0),
      end: new Date(2025, 5, 30, 23, 0),
      type: "party",
    },
  ];

  const messages = {
    allDay: "Toute la journée",
    previous: "Précédent",
    next: "Suivant",
    today: "Aujourd'hui",
    month: "Mois",
    week: "Semaine",
    day: "Jour",
    agenda: "Agenda",
    noEventsInRange: "Pas d'événements dans cette période.",
    showMore: (total) => `+ ${total} de plus`,
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  // Форматы дат для отображения на французском
  const formats = {
    dayFormat: (date) => moment(date).format("ddd DD/MM"),       // lun. 22/06
    weekdayFormat: (date) => moment(date).format("dddd"),        // lundi, mardi...
    monthHeaderFormat: (date) => moment(date).format("MMMM YYYY"),  // juin 2025
    dayHeaderFormat: (date) => moment(date).format("dddd D MMMM"),   // lundi 22 juin
    agendaDateFormat: (date) => moment(date).format("dddd D MMMM"),  // lundi 22 juin
  };





  return (
    <>
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          popup={true}
          culture="fr"
          view={view}
          date={date}
          onView={(v) => setView(v)}
          onNavigate={(date) => setDate(date)}
          messages={messages}
          formats={formats} // <- тут formats для французского
          components={{
            toolbar: (props) => (
              <CustomToolbar {...props} view={view} onView={(v) => setView(v)} />
            ),
            event: Event,
          }}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Détails de l'événement"
        className="modal"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        {selectedEvent && (
          <>
            <h2>{selectedEvent.title}</h2>
            <p>
              <strong>Date :</strong>{" "}
              {moment(selectedEvent.start).format("dddd D MMMM YYYY, HH:mm")} -{" "}
              {moment(selectedEvent.end).format("HH:mm")}
            </p>
            {selectedEvent.desc && (
              <p>
                <strong>Description :</strong> {selectedEvent.desc}
              </p>
            )}
            <button onClick={closeModal} className="close-btn">
              Fermer
            </button>
          </>
        )}
      </Modal>
    </>
  );
}

