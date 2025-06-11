import React from "react";
import '../../styles/componentStyles/EventList.css';

export default function EventList({ events }) {
  if (!events || events.length === 0) {
    return <p>Aucun événement disponible.</p>;
  }

  const typeColors = {
    match: '#4caf50',      // зеленый
    tournament: '#2196f3', // синий
    party: '#ff5722',      // оранжевый
  };

  return (
    <div className="event-list">
      {events.map(({ id, title, start, end, type, desc }) => (
        <div key={id} className="event-item" style={{ borderLeftColor: typeColors[type] || '#999' }}>
          <h3 className="event-title">{title}</h3>
          <p className="event-dates">
            {new Date(start).toLocaleString("fr-FR")} — {new Date(end).toLocaleString("fr-FR")}
          </p>
          <p className="event-type" style={{ color: typeColors[type] || '#999' }}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </p>
          <p className="event-desc">{desc}</p>
        </div>
      ))}
    </div>
  );
}
