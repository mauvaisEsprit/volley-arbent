import React, { useEffect, useState } from "react";
import "../../styles/componentStyles/EventList.css";
import { FaCalendarAlt } from "react-icons/fa";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editSlug, setEditSlug] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStart, setEditStart] = useState("");
  const [editEnd, setEditEnd] = useState("");
  const [editType, setEditType] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const typeColors = {
    match: "#4caf50", // Зеленый — матч
    tournoi: "#1976d2", // Синий — турнир
    soiree: "#e64a19", // Оранжево-красный — вечеринка
    autre: "#9e9e9e", // Серый — другое
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("http://localhost:3001/api/events");
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const handleDelete = async (slug) => {
    if (!window.confirm("Вы действительно хотите удалить это событие?")) return;
    try {
      const res = await fetch(`http://localhost:3001/api/events/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Ошибка удаления");
      setEvents(events.filter((event) => event.slug !== slug));
    } catch (err) {
      alert(err.message);
    }
  };

  const startEdit = (
    slug,
    currentTitle,
    currentStart,
    currentEnd,
    currentType,
    currentImage
  ) => {
    setEditSlug(slug);
    setEditTitle(currentTitle);
    setEditStart(formatDateForInput(currentStart));
    setEditEnd(formatDateForInput(currentEnd));
    setEditType(currentType);
    setEditImage(currentImage || "");
  };

  const formatDateForInput = (dateStr) => {
    const date = new Date(dateStr);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  const saveEdit = async (slug) => {
    try {
      const res = await fetch(`http://localhost:3001/api/events/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: editTitle,
          start: new Date(editStart).toISOString(),
          end: new Date(editEnd).toISOString(),
          type: editType,
          image: editImage,
          description: editDescription,
        }),
      });
      if (!res.ok) throw new Error("Ошибка обновления");
      const updatedEvent = await res.json();

      setEvents(events.map((ev) => (ev.slug === slug ? updatedEvent : ev)));
      setEditSlug(null);
      setEditTitle("");
      setEditStart("");
      setEditEnd("");
      setEditType("");
      setEditImage("");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Chargement des événements...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!events.length) return <p>Aucun événement disponible.</p>;

  return (
    <>
      <h2 className="section-title">
        <FaCalendarAlt className="section-icon" />
        Gestion des événements
      </h2>
    <div className="event-list">
      {events.map(({ slug, title, start, end, type, description, image }) => (
        <div
          key={slug}
          className="event-item"
          data-type={type}
          style={{ borderLeftColor: typeColors[type] || "#999" }}
        >
          {editSlug === slug ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Titre"
                className="input-title"
              />
              <input
                type="datetime-local"
                value={editStart}
                onChange={(e) => setEditStart(e.target.value)}
                className="input-datetime"
              />
              <input
                type="datetime-local"
                value={editEnd}
                onChange={(e) => setEditEnd(e.target.value)}
                className="input-datetime"
              />
              <select
                value={editType}
                onChange={(e) => setEditType(e.target.value)}
                className="select-type"
              >
                <option value="" disabled>
                  Choisir le type d'événement
                </option>
                <option value="match">Match</option>
                <option value="tournoi">Tournoi</option>
                <option value="soiree">Soirée</option>
                <option value="autre">Autre</option>
              </select>
              <input
                type="text"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
                placeholder="URL de l'image"
                className="input-image-url"
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
                className="input-image-url"
              />
              <div className="buttons-edit">
                <button onClick={() => saveEdit(slug)} className="btn-save">
                  Sauvegarder
                </button>
                <button
                  onClick={() => setEditSlug(null)}
                  className="btn-cancel"
                >
                  Annuler
                </button>
              </div>
            </>
          ) : (
            <>
              {image && (
                <div className="event-image-wrapper">
                  <img src={image} alt={title} className="event-image" />
                </div>
              )}
              <h3 className="event-title">{title}</h3>
              <p className="event-dates">
                {new Date(start).toLocaleString("fr-FR")} —{" "}
                {new Date(end).toLocaleString("fr-FR")}
              </p>
              <p className="event-type">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </p>
              <p className="event-desc">{description}</p>
              <div className="buttons-actions">
                <button
                  onClick={() =>
                    startEdit(slug, title, start, end, type, image, description)
                  }
                  className="btn-edit"
                >
                  Éditer
                </button>
                <button
                  onClick={() => handleDelete(slug)}
                  className="btn-delete"
                >
                  Supprimer
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
    </>
  );
}
